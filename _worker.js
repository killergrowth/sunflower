// KillerGrowth -- Sunflower Plumbing Pages Worker
// Handles:
//   POST /api/contact  -- form submission -> GHL contacts API
//   POST /submit       -- sign-up LP form -> Gmail via service account JWT
//   POST /upload       -- tech photo upload -> Google Drive + Gmail notification
//   GET  /robots.txt   -- crawler block on *.pages.dev

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

async function handleContact(request, env) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
    });
  }

  let body;
  try { body = await request.json(); } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
    });
  }

  const { firstName, lastName, phone, email, service, message } = body;
  if (!firstName || !phone) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
    });
  }

  const GHL_API_KEY = env.GHL_API_KEY;
  const LOCATION_ID = 'D7hKz0cgJ5MpjIAtajBg';

  const noteLines = [];
  if (service) noteLines.push(`Service Requested: ${service}`);
  if (message) noteLines.push(`Message: ${message}`);
  noteLines.push(`Source: sunflowerplumbing.com/contact-us/`);

  const contactPayload = {
    locationId: LOCATION_ID,
    firstName,
    lastName: lastName || '',
    phone,
    email: email || '',
    source: 'Website Contact Form',
    tags: ['website-lead', 'contact-form'],
    customFields: [],
  };

  const ghlRes = await fetch('https://services.leadconnectorhq.com/contacts/', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GHL_API_KEY}`,
      'Version': '2021-07-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contactPayload),
  });

  const ghlData = await ghlRes.json();

  if (!ghlRes.ok) {
    console.error('GHL error:', JSON.stringify(ghlData));
    // Still return success to user -- don't expose internal errors
    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
    });
  }

  // Add note to contact if we have one
  if (noteLines.length && ghlData.contact?.id) {
    await fetch(`https://services.leadconnectorhq.com/contacts/${ghlData.contact.id}/notes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: ghlData.contact.id, body: noteLines.join('\n') }),
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
  });
}

// ── Sign-Up LP Form Handler (Gmail via Service Account JWT) ──────────────

function objToB64url(obj) {
  const json = JSON.stringify(obj);
  let binary = '';
  for (let i = 0; i < json.length; i++) binary += String.fromCharCode(json.charCodeAt(i) & 0xff);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function bufToB64url(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function getGmailAccessToken(serviceEmail, privateKeyPem, impersonateEmail, scope) {
  scope = scope || 'https://www.googleapis.com/auth/gmail.send';
  const now = Math.floor(Date.now() / 1000);
  const headerB64 = objToB64url({ alg: 'RS256', typ: 'JWT' });
  const claimB64  = objToB64url({
    iss: serviceEmail, sub: impersonateEmail,
    scope,
    aud: 'https://oauth2.googleapis.com/token',
    iat: now, exp: now + 3600,
  });
  const signingInput = `${headerB64}.${claimB64}`;
  const normalizedKey = privateKeyPem.replace(/\\n/g, '\n');
  const b64 = normalizedKey.replace(/-----[A-Z ]+-----/g, '').replace(/\s+/g, '');
  const decoded = atob(b64);
  const keyBuffer = new Uint8Array(decoded.length);
  for (let i = 0; i < decoded.length; i++) keyBuffer[i] = decoded.charCodeAt(i);
  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8', keyBuffer.buffer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false, ['sign']
  );
  const sigBytes = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5', cryptoKey,
    new TextEncoder().encode(signingInput)
  );
  const jwt = `${signingInput}.${bufToB64url(sigBytes)}`;
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${encodeURIComponent(jwt)}`,
  });
  const data = await tokenRes.json();
  if (!data.access_token) throw new Error('Token error ' + tokenRes.status + ': ' + JSON.stringify(data));
  return data.access_token;
}

function buildSignUpEmail(name, email, phone, address, service, message) {
  const serviceLabel = service ? service.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Not specified';
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f0eb;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f0eb;padding:40px 0;">
    <tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
      <tr><td style="background:#121315;padding:36px 40px;text-align:center;border-radius:8px 8px 0 0;">
        <img src="https://sunflowerplumbing.com/images/logo-white-email.png" alt="Sunflower Plumbing &amp; Excavation" style="height:192px;width:auto;display:block;margin:0 auto;">
        <div style="color:rgba(255,255,255,0.6);font-size:13px;margin-top:12px;letter-spacing:2px;text-transform:uppercase;">New Service Request</div>
      </td></tr>
      <tr><td style="background:#ffffff;padding:36px 40px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="padding:12px 16px;background:#f9f5f0;border-left:3px solid #FCAF18;font-size:12px;color:#888;text-transform:uppercase;width:120px;">Name</td><td style="padding:12px 16px;background:#f9f5f0;font-size:15px;color:#121315;font-weight:bold;">${name}</td></tr>
          <tr><td style="padding:12px 16px;font-size:12px;color:#888;text-transform:uppercase;">Email</td><td style="padding:12px 16px;font-size:15px;">${email ? `<a href="mailto:${email}" style="color:#FCAF18;">${email}</a>` : 'Not provided'}</td></tr>
          <tr><td style="padding:12px 16px;background:#f9f5f0;font-size:12px;color:#888;text-transform:uppercase;">Phone</td><td style="padding:12px 16px;background:#f9f5f0;font-size:15px;">${phone || 'Not provided'}</td></tr>
          <tr><td style="padding:12px 16px;font-size:12px;color:#888;text-transform:uppercase;">Address</td><td style="padding:12px 16px;font-size:15px;">${address || 'Not provided'}</td></tr>
          <tr><td style="padding:12px 16px;background:#f9f5f0;font-size:12px;color:#888;text-transform:uppercase;">Service</td><td style="padding:12px 16px;background:#f9f5f0;font-size:15px;">${serviceLabel}</td></tr>
        </table>
        ${message ? `<div style="margin-top:24px;"><div style="font-size:12px;color:#888;text-transform:uppercase;margin-bottom:8px;">Message</div><div style="background:#f9f5f0;border-left:3px solid #FCAF18;padding:16px;font-size:15px;">${message.replace(/\n/g,'<br>')}</div></div>` : ''}
        ${phone ? `<div style="margin-top:32px;text-align:center;"><a href="tel:${phone.replace(/\D/g,'')}" style="display:inline-block;background:#FCAF18;color:#121315;font-size:16px;font-weight:700;padding:14px 36px;border-radius:4px;text-decoration:none;">Call ${phone}</a></div>` : ''}
      </td></tr>
      <tr><td style="background:#121315;padding:24px 40px;text-align:center;border-radius:0 0 8px 8px;">
        <p style="margin:0;color:#666;font-size:12px;">Sunflower Plumbing &amp; Excavation &bull; 3910 W. Central Ave, El Dorado, KS 67042 &bull; (316) 333-6326</p>
      </td></tr>
    </table></td></tr>
  </table>
</body></html>`;
}

async function handleSignUpSubmit(request, env) {
  const JSON_HEADERS = { 'Content-Type': 'application/json' };
  try {
    const form    = await request.formData();
    const name    = form.get('name')    || '(no name)';
    const email   = form.get('email')   || '';
    const phone   = form.get('phone')   || '';
    const address = form.get('address') || '';
    const service = form.get('service') || '';
    const message = form.get('message') || '';

    // Turnstile verification
    const turnstileToken  = form.get('cf-turnstile-response') || '';
    const turnstileSecret = env.TURNSTILE_SECRET || '1x0000000000000000000000000000000AA';
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${encodeURIComponent(turnstileSecret)}&response=${encodeURIComponent(turnstileToken)}`,
    });
    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      return new Response(JSON.stringify({ ok: false, error: 'Bot check failed. Please try again.' }), { status: 400, headers: JSON_HEADERS });
    }

    const accessToken = await getGmailAccessToken(env.GMAIL_SERVICE_EMAIL, env.GMAIL_PRIVATE_KEY, env.GMAIL_FROM);
    const htmlBody    = buildSignUpEmail(name, email, phone, address, service, message);
    const replyToHeader = email ? `Reply-To: ${name} <${email}>\r\n` : '';
    const mimeHeaders = [
      `From: Sunflower Plumbing <${env.GMAIL_FROM}>`,
      `To: ${env.GMAIL_TO}`,
      `Subject: New Service Request - Sunflower Plumbing`,
      `MIME-Version: 1.0`,
      `Content-Type: text/html; charset=UTF-8`,
    ];
    if (replyToHeader.trim()) mimeHeaders.push(replyToHeader.trim());
    const mimeLines = mimeHeaders.join('\r\n') + '\r\n\r\n' + htmlBody;

    const emailBytes = new TextEncoder().encode(mimeLines);
    let emailBinary = '';
    for (let i = 0; i < emailBytes.length; i++) emailBinary += String.fromCharCode(emailBytes[i]);
    const encoded = btoa(emailBinary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    const sendRes = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/${encodeURIComponent(env.GMAIL_FROM)}/messages/send`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ raw: encoded }),
      }
    );
    if (!sendRes.ok) {
      const err = await sendRes.text();
      throw new Error('Gmail send ' + sendRes.status + ': ' + err.slice(0, 200));
    }
    return new Response(JSON.stringify({ ok: true }), { headers: JSON_HEADERS });
  } catch (err) {
    console.error('submit error:', err.message);
    return new Response(JSON.stringify({ ok: false, error: err.message.slice(0, 200) }), { status: 500, headers: JSON_HEADERS });
  }
}

// ── Photo Upload Handler (Google Drive) ─────────────────────────────────────

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
const PHOTOS_ROOT_FOLDER = '1M1dd9Zssg0Fz16uSA-fCRomdBbRm-QES';

function resolveFolders(serviceStr) {
  if (!serviceStr || !serviceStr.trim()) return [PHOTOS_ROOT_FOLDER];
  const services = serviceStr.split(',').map(s => s.trim()).filter(Boolean);
  const ids = [];
  for (const svc of services) {
    const id = DRIVE_FOLDERS[svc];
    if (id && !ids.includes(id)) ids.push(id);
  }
  return ids.length > 0 ? ids : [PHOTOS_ROOT_FOLDER];
}

async function uploadToDrive(token, fileName, mimeType, bytes, folderId) {
  const boundary = '-------314159265358979323846';
  const meta = JSON.stringify({ name: fileName, parents: [folderId] });
  const encoder = new TextEncoder();
  const metaPart = encoder.encode(`--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${meta}\r\n`);
  const filePart = encoder.encode(`--${boundary}\r\nContent-Type: ${mimeType}\r\n\r\n`);
  const closing  = encoder.encode(`\r\n--${boundary}--`);
  const body = new Uint8Array(metaPart.length + filePart.length + bytes.byteLength + closing.length);
  body.set(metaPart, 0);
  body.set(filePart, metaPart.length);
  body.set(new Uint8Array(bytes), metaPart.length + filePart.length);
  body.set(closing, metaPart.length + filePart.length + bytes.byteLength);
  const res = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true&fields=id,name,webViewLink',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': `multipart/related; boundary="${boundary}"` },
      body: body.buffer,
    }
  );
  const result = await res.json();
  if (!result.id) throw new Error('Drive upload failed: ' + JSON.stringify(result));
  return result;
}

function buildUploadEmail(techName, services, description, fileName, fileSize, driveLinks) {
  const kb = fileSize ? Math.round(fileSize / 1024) : null;
  const ts = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago', dateStyle: 'medium', timeStyle: 'short' });
  const linksHtml = driveLinks.map(l => `<a href="${l.webViewLink}" style="color:#FCAF18;">${l.name}</a>`).join('<br>');
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f0eb;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f0eb;padding:40px 0;">
<tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
  <tr><td style="background:#121315;padding:36px 40px;text-align:center;border-radius:8px 8px 0 0;">
    <div style="color:#FCAF18;font-size:22px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Sunflower Plumbing &amp; Excavation</div>
    <div style="color:rgba(255,255,255,0.6);font-size:13px;margin-top:8px;letter-spacing:2px;text-transform:uppercase;">&#128247; New Photo Upload</div>
  </td></tr>
  <tr><td style="background:#fff;padding:36px 40px;">
    <p style="margin:0 0 24px;color:#121315;font-size:15px;">A new photo was uploaded through the Sunflower Plumbing photo portal.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      <tr><td style="padding:12px 16px;background:#f9f5f0;border-left:3px solid #FCAF18;font-size:12px;color:#888;text-transform:uppercase;width:130px;">Uploaded By</td><td style="padding:12px 16px;background:#f9f5f0;font-size:15px;color:#121315;font-weight:bold;">${techName}</td></tr>
      <tr><td style="padding:12px 16px;font-size:12px;color:#888;text-transform:uppercase;">Service(s)</td><td style="padding:12px 16px;font-size:15px;color:#121315;">${services || 'Not specified'}</td></tr>
      <tr><td style="padding:12px 16px;background:#f9f5f0;font-size:12px;color:#888;text-transform:uppercase;">File</td><td style="padding:12px 16px;background:#f9f5f0;font-size:15px;color:#121315;">${fileName}${kb ? ` (${kb} KB)` : ''}</td></tr>
      <tr><td style="padding:12px 16px;font-size:12px;color:#888;text-transform:uppercase;">Uploaded At</td><td style="padding:12px 16px;font-size:15px;color:#121315;">${ts} CT</td></tr>
      ${driveLinks.length ? `<tr><td style="padding:12px 16px;background:#f9f5f0;font-size:12px;color:#888;text-transform:uppercase;">Drive Link</td><td style="padding:12px 16px;background:#f9f5f0;font-size:15px;">${linksHtml}</td></tr>` : ''}
    </table>
    ${description ? `<div style="margin-top:24px;"><div style="font-size:12px;color:#888;text-transform:uppercase;margin-bottom:8px;">Description</div><div style="background:#f9f5f0;border-left:3px solid #FCAF18;padding:16px;font-size:15px;color:#121315;line-height:1.7;">${description.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>')}</div></div>` : ''}
  </td></tr>
  <tr><td style="background:#121315;padding:24px 40px;text-align:center;border-radius:0 0 8px 8px;">
    <p style="margin:0;color:#666;font-size:12px;">Sunflower Plumbing &amp; Excavation &bull; 3910 W. Central Ave, El Dorado, KS 67042 &bull; (316) 333-6326</p>
  </td></tr>
</table></td></tr></table></body></html>`;
}

async function handleUpload(request, env) {
  const UPLOAD_CORS = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
  try {
    const form        = await request.formData();
    const service     = (form.get('service')     || '').trim();
    const description = (form.get('description') || '').trim();
    const techName    = (form.get('tech_name')   || 'Unknown Tech').trim();
    const photo       = form.get('photo');

    if (!photo || typeof photo === 'string') {
      return new Response(JSON.stringify({ ok: false, error: 'No photo received.' }), { status: 400, headers: UPLOAD_CORS });
    }

    const rawName     = photo.name || 'photo.jpg';
    const mimeType    = photo.type || 'image/jpeg';
    const arrayBuffer = await photo.arrayBuffer();

    const now      = new Date();
    const stamp    = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}_${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}${String(now.getSeconds()).padStart(2,'0')}`;
    const safeTech = techName.replace(/[^a-zA-Z0-9]/g, '-').slice(0, 20);
    const safeRaw  = rawName.replace(/[^a-zA-Z0-9._-]/g, '_');
    const safeDesc = description ? description.replace(/[^a-zA-Z0-9 ]/g, '').trim().replace(/\s+/g, '-').slice(0, 60) : '';
    const fileName = safeDesc ? `${stamp}_${safeTech}_${safeDesc}_${safeRaw}` : `${stamp}_${safeTech}_${safeRaw}`;

    // Get Drive token using the same JWT helper, drive scope
    const driveAccessToken = await getGmailAccessToken(
      env.GMAIL_SERVICE_EMAIL,
      env.GMAIL_PRIVATE_KEY,
      env.GMAIL_FROM,
      'https://www.googleapis.com/auth/drive'
    );

    const folderIds = resolveFolders(service);
    const driveResults = [];
    for (const folderId of folderIds) {
      const result = await uploadToDrive(driveAccessToken, fileName, mimeType, arrayBuffer, folderId);
      driveResults.push(result);
    }

    // Email notification (non-fatal)
    try {
      const gmailToken = await getGmailAccessToken(env.GMAIL_SERVICE_EMAIL, env.GMAIL_PRIVATE_KEY, env.GMAIL_FROM);
      const subject  = `\u{1F4F7} New Photo \u2014 ${techName} \u2014 ${service || 'Sunflower Plumbing'}`;
      const htmlBody = buildUploadEmail(techName, service, description, rawName, arrayBuffer.byteLength, driveResults);
      const mime = [`From: Sunflower Plumbing <${env.GMAIL_FROM}>`, `To: ${env.GMAIL_TO}`, `Subject: ${subject}`, 'MIME-Version: 1.0', 'Content-Type: text/html; charset=UTF-8', '', htmlBody].join('\r\n');
      const eb = new TextEncoder().encode(mime);
      let bin = ''; for (let i = 0; i < eb.length; i++) bin += String.fromCharCode(eb[i]);
      const raw = btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      await fetch(`https://gmail.googleapis.com/gmail/v1/users/${encodeURIComponent(env.GMAIL_FROM)}/messages/send`, { method: 'POST', headers: { Authorization: `Bearer ${gmailToken}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ raw }) });
    } catch (emailErr) { console.error('Email failed:', emailErr.message); }

    return new Response(JSON.stringify({ ok: true, files: driveResults.map(r => r.id) }), { headers: UPLOAD_CORS });
  } catch (err) {
    console.error('upload error:', err.message);
    return new Response(JSON.stringify({ ok: false, error: err.message.slice(0, 300) }), { status: 500, headers: UPLOAD_CORS });
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // OPTIONS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } });
    }

    // Photo upload handler
    if (url.pathname === '/upload' && request.method === 'POST') {
      return handleUpload(request, env);
    }

    // Sign-up LP form handler
    if (url.pathname === '/submit' && request.method === 'POST') {
      return handleSignUpSubmit(request, env);
    }

    // Contact form handler
    if (url.pathname === '/api/contact') {
      return handleContact(request, env);
    }

    // Crawler block
    if (url.pathname === '/robots.txt') {
      if (url.hostname.endsWith('.pages.dev')) {
        return new Response('User-agent: *\nDisallow: /\n', {
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
      }
    }

    return env.ASSETS.fetch(request);
  }
};
