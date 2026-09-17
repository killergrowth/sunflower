/**
 * Cloudflare Pages Function -- /upload v2
 * Sunflower Plumbing & Excavation
 * Handles multipart photo uploads → Google Drive (by service folder) + Gmail notification
 *
 * Env vars (CF Pages secrets):
 *   GMAIL_SERVICE_EMAIL  — openclaw-agent@killergrowth.iam.gserviceaccount.com
 *   GMAIL_PRIVATE_KEY    — SA private key (\\n escaped)
 *   GMAIL_FROM           — tylerbrickley@killergrowth.com
 *   GMAIL_TO             — notification recipient
 */

// ── Drive folder map (KG Clients Shared Drive > Sunflower Plumbing > Photos > <service>) ──
// Folder IDs created 2026-09-16 in KG Clients Shared Drive (driveId: 0AChAr9NNNH3kUk9PVA)
const WORKER_VERSION = '20260917143639'; const CACHE_BUST = '202609171436392026091714363920260917143639';
const SHARED_DRIVE_ID = '0AChAr9NNNH3kUk9PVA';
const DRIVE_FOLDERS = {
  'Drain Cleaning':                '1YudaaB80M8PJoSNamRFQGmlh2zrN0tks',
  'Fixture Replacement':           '1p4XsyVtnjFcj-e3Gn-2W-nm-_4mF-15u',
  'Gas Line Services':             '1CcciHGzKvYgm1YQcWkTsrqmxZT3n6rZe',
  'Kitchen & Bathroom Plumbing':   '1IL_R8VlrSSQQNvlIumaXCDcKX8r-DcNZ',
  'Leak Detection':                '1V7wfujmz-KDQmsEph3GtMbCsAI7Qrh4q',
  'Sewer Line Repair':             '14DdiU-V4d09pC0TcHsVr_JTF-b11gG8A',
  'Toilet & Faucet Repair':        '1ajVRen5a5O5lKyzVME9B0b3cGg2AZSCO',
  'Water Heater Repair':           '15LwvIV9FR-ljuuWTzDhBGGjb9XueqOXG',
  'Water Softener Installation':   '1ga3Ovh69qD03MuvR2H5WLx4PXePMy5pJ',
  'Lateral Field Installation':    '1tX3_y3aV8d2jI-1gqBlYapf2caMEbhjL',
  'Backfill & Grading':            '1xCytHN43r8f8pTUwmItzZkeHsBNZAoB-',
  'Emergency Excavation':          '1pxR0qMUVbPZoxz59MANiSH31ExFHHlFm',
  'Septic System Excavation':      '1TejmBV4DE-ctLS7T2UaYlm9h_-2rWHT-',
  'Sewer & Water Line Excavation': '1vB4wTB6S21-vguG1hc8JCVvF0V-gr3Pc',
  'Site Preparation':              '1gfkxorgZDHXV5nv9BHnoxDS7zdLjwU7d',
  'Trenching':                     '18eiEgTlx07ROnGz1oMhoBxDfl95q_Uqs',
  'Other':                         '1M7QEay-qFKnXcHP5zpyaQpoH57rCqVBq',
};
const FALLBACK_FOLDER = '1M1dd9Zssg0Fz16uSA-fCRomdBbRm-QES'; // Photos root in Shared Drive

// ── JWT / token helpers ───────────────────────────────────────────────────────

function objToB64url(obj) {
  const json = JSON.stringify(obj);
  let b = '';
  for (let i = 0; i < json.length; i++) b += String.fromCharCode(json.charCodeAt(i) & 0xff);
  return btoa(b).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function bufToB64url(buf) {
  const bytes = new Uint8Array(buf);
  let b = '';
  for (let i = 0; i < bytes.length; i++) b += String.fromCharCode(bytes[i]);
  return btoa(b).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function importPrivateKey(pem) {
  // Handle both literal \n (escaped) and real newlines
  const normalized = pem.replace(/\\n/g, '\n');
  const b64 = normalized
    .replace(/-----BEGIN PRIVATE KEY-----/g, '')
    .replace(/-----END PRIVATE KEY-----/g, '')
    .replace(/\s+/g, '');
  const decoded = atob(b64);
  const buf = new Uint8Array(decoded.length);
  for (let i = 0; i < decoded.length; i++) buf[i] = decoded.charCodeAt(i);
  return crypto.subtle.importKey(
    'pkcs8', buf.buffer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false, ['sign']
  );
}

async function getAccessToken(serviceEmail, privateKeyPem, impersonate, scope) {
  const now = Math.floor(Date.now() / 1000);
  const h = objToB64url({ alg: 'RS256', typ: 'JWT' });
  const c = objToB64url({ iss: serviceEmail, sub: impersonate, scope, aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 });
  const input = `${h}.${c}`;
  const key = await importPrivateKey(privateKeyPem);
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(input));
  const jwt = `${input}.${bufToB64url(sig)}`;
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${encodeURIComponent(jwt)}`,
  });
  const data = await res.json();
  if (!data.access_token) throw new Error('Token error: ' + JSON.stringify(data));
  return data.access_token;
}

// ── Google Drive upload (multipart) ──────────────────────────────────────────

async function uploadToDrive(token, fileName, mimeType, bytes, folderId) {
  const boundary = '-------314159265358979323846';
  // supportsAllDrives=true required for Shared Drive uploads
  const meta = JSON.stringify({ name: fileName, parents: [folderId] });

  // Build multipart body
  const encoder = new TextEncoder();
  const metaPart = encoder.encode(
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${meta}\r\n`
  );
  const filePart = encoder.encode(
    `--${boundary}\r\nContent-Type: ${mimeType}\r\n\r\n`
  );
  const closing = encoder.encode(`\r\n--${boundary}--`);

  const body = new Uint8Array(metaPart.length + filePart.length + bytes.byteLength + closing.length);
  body.set(metaPart, 0);
  body.set(filePart, metaPart.length);
  body.set(new Uint8Array(bytes), metaPart.length + filePart.length);
  body.set(closing, metaPart.length + filePart.length + bytes.byteLength);

  const res = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true&fields=id,name,webViewLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': `multipart/related; boundary="${boundary}"`,
      },
      body: body.buffer,
    }
  );

  const result = await res.json();
  if (!result.id) throw new Error('Drive upload failed: ' + JSON.stringify(result));
  return result; // { id, name, webViewLink }
}

// ── Resolve service → folder IDs ──────────────────────────────────────────────

function resolveFolders(serviceStr) {
  if (!serviceStr || !serviceStr.trim()) return [FALLBACK_FOLDER];
  const services = serviceStr.split(',').map(s => s.trim()).filter(Boolean);
  const ids = [];
  for (const svc of services) {
    const id = DRIVE_FOLDERS[svc];
    if (id && !ids.includes(id)) ids.push(id);
  }
  return ids.length > 0 ? ids : [FALLBACK_FOLDER];
}

// ── Gmail notification ────────────────────────────────────────────────────────

function buildEmail(techName, services, description, fileName, fileSize, driveLinks) {
  const kb = fileSize ? Math.round(fileSize / 1024) : null;
  const ts = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago', dateStyle: 'medium', timeStyle: 'short' });
  const linksHtml = driveLinks.map(l =>
    `<a href="${l.webViewLink}" style="color:#FCAF18;">${l.name}</a>`
  ).join('<br>');

  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f0eb;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f0eb;padding:40px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
  <tr><td style="background:#121315;padding:36px 40px;text-align:center;border-radius:8px 8px 0 0;">
    <div style="color:#FCAF18;font-size:22px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Sunflower Plumbing &amp; Excavation</div>
    <div style="color:rgba(255,255,255,0.6);font-size:13px;margin-top:8px;letter-spacing:2px;text-transform:uppercase;">📷 New Photo Upload</div>
  </td></tr>
  <tr><td style="background:#fff;padding:36px 40px;">
    <p style="margin:0 0 24px;color:#121315;font-size:15px;line-height:1.6;">A new photo was uploaded through the Sunflower Plumbing photo portal.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      <tr>
        <td style="padding:12px 16px;background:#f9f5f0;border-left:3px solid #FCAF18;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;width:130px;">Uploaded By</td>
        <td style="padding:12px 16px;background:#f9f5f0;font-size:15px;color:#121315;font-weight:bold;">${techName}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">Service(s)</td>
        <td style="padding:12px 16px;font-size:15px;color:#121315;">${services || 'Not specified'}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;background:#f9f5f0;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">File</td>
        <td style="padding:12px 16px;background:#f9f5f0;font-size:15px;color:#121315;">${fileName}${kb ? ` (${kb} KB)` : ''}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">Uploaded At</td>
        <td style="padding:12px 16px;font-size:15px;color:#121315;">${ts} CT</td>
      </tr>
      ${driveLinks.length ? `<tr>
        <td style="padding:12px 16px;background:#f9f5f0;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">Drive Link</td>
        <td style="padding:12px 16px;background:#f9f5f0;font-size:15px;">${linksHtml}</td>
      </tr>` : ''}
    </table>
    ${description ? `<div style="margin-top:24px;">
      <div style="font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Description</div>
      <div style="background:#f9f5f0;border-left:3px solid #FCAF18;padding:16px;font-size:15px;color:#121315;line-height:1.7;">${description.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>')}</div>
    </div>` : ''}
  </td></tr>
  <tr><td style="background:#121315;padding:24px 40px;text-align:center;border-radius:0 0 8px 8px;">
    <p style="margin:0;color:#666;font-size:12px;">Sunflower Plumbing &amp; Excavation &bull; 3910 W. Central Ave, El Dorado, KS 67042 &bull; (316) 333-6326</p>
  </td></tr>
</table>
</td></tr>
</table></body></html>`;
}

async function sendEmail(env, subject, htmlBody) {
  const token = await getAccessToken(env.GMAIL_SERVICE_EMAIL, env.GMAIL_PRIVATE_KEY, env.GMAIL_FROM, 'https://www.googleapis.com/auth/gmail.send');
  const mime = [
    `From: Sunflower Plumbing <${env.GMAIL_FROM}>`,
    `To: ${env.GMAIL_TO}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    '',
    htmlBody,
  ].join('\r\n');
  const bytes = new TextEncoder().encode(mime);
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  const raw = btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  await fetch(`https://gmail.googleapis.com/gmail/v1/users/${encodeURIComponent(env.GMAIL_FROM)}/messages/send`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ raw }),
  });
}

// ── CORS ─────────────────────────────────────────────────────────────────────

const CORS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

// ── Main handler ──────────────────────────────────────────────────────────────

export async function onRequestPost({ request, env }) {
  try {
    const form        = await request.formData();
    const service     = (form.get('service')     || '').trim();
    const description = (form.get('description') || '').trim();
    const techName    = (form.get('tech_name')   || 'Unknown Tech').trim();
    const photo       = form.get('photo');

    if (!photo || typeof photo === 'string') {
      return new Response(JSON.stringify({ ok: false, error: 'No photo file received.' }), { status: 400, headers: CORS });
    }

    const rawName     = (photo.name && typeof photo.name === 'string') ? photo.name : 'photo.jpg';
    const mimeType    = (photo.type && typeof photo.type === 'string' && photo.type) ? photo.type : 'image/jpeg';
    const arrayBuffer = await photo.arrayBuffer();

    // Stamp filename: YYYYMMDD_HHMMSS_techname_originalname
    const now    = new Date();
    const stamp  = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}_${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}${String(now.getSeconds()).padStart(2,'0')}`;
    const safeTech = techName.replace(/[^a-zA-Z0-9]/g, '-').slice(0, 20);
    const safeRaw  = String(rawName).replace(/[^a-zA-Z0-9._-]/g, '_');
    console.log('DEBUG description:', JSON.stringify(description), 'length:', description.length);
    const safeDesc = description
      ? description.replace(/[^a-zA-Z0-9 ]/g, '').trim().replace(/\s+/g, '-').slice(0, 60)
      : '';
    console.log('DEBUG safeDesc:', JSON.stringify(safeDesc));
    const fileName = safeDesc
      ? `${stamp}_${safeTech}_${safeDesc}_${safeRaw}`
      : `${stamp}_${safeTech}_${safeRaw}`;
    console.log('DEBUG fileName:', fileName);

    // Get Drive token (Drive scope)
    const driveToken = await getAccessToken(
      env.GMAIL_SERVICE_EMAIL,
      env.GMAIL_PRIVATE_KEY,
      env.GMAIL_FROM,
      'https://www.googleapis.com/auth/drive'
    );

    // Resolve which folder(s) to upload to
    const folderIds = resolveFolders(service);

    // Upload to each matching folder
    const driveResults = [];
    for (const folderId of folderIds) {
      const result = await uploadToDrive(driveToken, fileName, mimeType, arrayBuffer, folderId);
      driveResults.push(result);
    }

    // Email notification (non-fatal)
    try {
      await sendEmail(
        env,
        `📷 New Photo — ${techName} — ${service || 'Sunflower Plumbing'}`,
        buildEmail(techName, service, description, rawName, arrayBuffer.byteLength, driveResults)
      );
    } catch (emailErr) {
      console.error('Email failed:', emailErr.message);
    }

    return new Response(JSON.stringify({ ok: true, files: driveResults.map(r => r.id) }), { headers: CORS });

  } catch (err) {
    const msg = (err && err.message) ? err.message : String(err);
    const stack = (err && err.stack) ? err.stack : '';
    console.error('upload error:', msg, stack);
    return new Response(JSON.stringify({ ok: false, error: msg.slice(0, 500) }), { status: 500, headers: CORS });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}



