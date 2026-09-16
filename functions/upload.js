/**
 * Cloudflare Pages Function -- /upload
 * Sunflower Plumbing & Excavation
 * Handles multipart photo uploads → R2 + Gmail notification
 *
 * R2 binding:  SUNFLOWER_UPLOADS  (bucket: sunflower-uploads)
 * Env vars:    GMAIL_SERVICE_EMAIL, GMAIL_PRIVATE_KEY, GMAIL_FROM, GMAIL_TO
 */

// ── JWT / Gmail helpers (shared pattern with submit.js) ──────────────────────

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

async function getGmailAccessToken(serviceEmail, privateKeyPem, impersonateEmail) {
  const now = Math.floor(Date.now() / 1000);
  const headerB64 = objToB64url({ alg: 'RS256', typ: 'JWT' });
  const claimB64  = objToB64url({
    iss: serviceEmail, sub: impersonateEmail,
    scope: 'https://www.googleapis.com/auth/gmail.send',
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

// ── Email builder ─────────────────────────────────────────────────────────────

function buildNotificationEmail(techName, services, description, fileName, fileSize, r2Key) {
  const fileSizeKB = fileSize ? Math.round(fileSize / 1024) : null;
  const uploadedAt = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago', dateStyle: 'medium', timeStyle: 'short' });

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f0eb;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f0eb;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <tr><td style="background:#121315;padding:36px 40px;text-align:center;border-radius:8px 8px 0 0;">
          <div style="color:#FCAF18;font-size:22px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Sunflower Plumbing &amp; Excavation</div>
          <div style="color:rgba(255,255,255,0.6);font-size:13px;margin-top:8px;letter-spacing:2px;text-transform:uppercase;">📷 New Photo Upload</div>
        </td></tr>

        <tr><td style="background:#ffffff;padding:36px 40px;">
          <p style="margin:0 0 24px;color:#121315;font-size:15px;line-height:1.6;">
            A new photo was uploaded through the Sunflower Plumbing photo portal.
          </p>

          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            <tr>
              <td style="padding:12px 16px;background:#f9f5f0;border-left:3px solid #FCAF18;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;width:130px;">Uploaded By</td>
              <td style="padding:12px 16px;background:#f9f5f0;font-size:15px;color:#121315;font-weight:bold;">${techName}</td>
            </tr>
            <tr>
              <td style="padding:12px 16px;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">Service(s)</td>
              <td style="padding:12px 16px;font-size:15px;color:#121315;">${services}</td>
            </tr>
            <tr>
              <td style="padding:12px 16px;background:#f9f5f0;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">File</td>
              <td style="padding:12px 16px;background:#f9f5f0;font-size:15px;color:#121315;">${fileName}${fileSizeKB ? ` (${fileSizeKB} KB)` : ''}</td>
            </tr>
            <tr>
              <td style="padding:12px 16px;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">Uploaded At</td>
              <td style="padding:12px 16px;font-size:15px;color:#121315;">${uploadedAt} CT</td>
            </tr>
            ${r2Key ? `<tr>
              <td style="padding:12px 16px;background:#f9f5f0;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">R2 Key</td>
              <td style="padding:12px 16px;background:#f9f5f0;font-size:13px;color:#666;word-break:break-all;">${r2Key}</td>
            </tr>` : ''}
          </table>

          ${description ? `
          <div style="margin-top:24px;">
            <div style="font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Description</div>
            <div style="background:#f9f5f0;border-left:3px solid #FCAF18;padding:16px;font-size:15px;color:#121315;line-height:1.7;">${description.replace(/\n/g, '<br>').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
          </div>` : ''}

        </td></tr>

        <tr><td style="background:#121315;padding:24px 40px;text-align:center;border-radius:0 0 8px 8px;">
          <p style="margin:0;color:#666;font-size:12px;">
            Sunflower Plumbing &amp; Excavation &bull; 3910 W. Central Ave, El Dorado, KS 67042 &bull; (316) 333-6326
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── CORS headers ──────────────────────────────────────────────────────────────

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'https://www.sunflowerplumbing.com',
};

// ── Main handler ──────────────────────────────────────────────────────────────

export async function onRequestPost({ request, env }) {
  try {
    const form = await request.formData();

    const service     = (form.get('service')     || '').trim();
    const description = (form.get('description') || '').trim();
    const techName    = (form.get('tech_name')   || 'Unknown Tech').trim();
    const photo       = form.get('photo');

    // Basic validation
    if (!photo || typeof photo === 'string') {
      return new Response(JSON.stringify({ ok: false, error: 'No photo file received.' }), { status: 400, headers: CORS_HEADERS });
    }

    const rawName = photo.name || 'photo.jpg';
    const safeFileName = rawName.replace(/[^a-zA-Z0-9._-]/g, '_');
    const date = new Date();
    const datePath = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
    const r2Key = `uploads/${datePath}/${Date.now()}_${safeFileName}`;

    // Upload to R2
    const arrayBuffer = await photo.arrayBuffer();
    const contentType = photo.type || 'image/jpeg';

    if (!env.SUNFLOWER_UPLOADS) {
      throw new Error('R2 binding SUNFLOWER_UPLOADS not configured.');
    }

    await env.SUNFLOWER_UPLOADS.put(r2Key, arrayBuffer, {
      httpMetadata: { contentType },
      customMetadata: {
        techName,
        service,
        uploadedAt: date.toISOString(),
        originalName: rawName,
      },
    });

    // Send email notification (non-blocking on failure)
    try {
      const accessToken = await getGmailAccessToken(
        env.GMAIL_SERVICE_EMAIL,
        env.GMAIL_PRIVATE_KEY,
        env.GMAIL_FROM
      );

      const subject  = `📷 New Photo Upload — ${techName} — Sunflower Plumbing`;
      const htmlBody = buildNotificationEmail(
        techName,
        service || 'Not specified',
        description,
        rawName,
        arrayBuffer.byteLength,
        r2Key
      );

      const mimeLines = [
        `From: Sunflower Plumbing <${env.GMAIL_FROM}>`,
        `To: ${env.GMAIL_TO}`,
        `Subject: ${subject}`,
        `MIME-Version: 1.0`,
        `Content-Type: text/html; charset=UTF-8`,
        '',
        htmlBody,
      ].join('\r\n');

      const emailBytes = new TextEncoder().encode(mimeLines);
      let emailBinary = '';
      for (let i = 0; i < emailBytes.length; i++) emailBinary += String.fromCharCode(emailBytes[i]);
      const encoded = btoa(emailBinary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

      await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/${encodeURIComponent(env.GMAIL_FROM)}/messages/send`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ raw: encoded }),
        }
      );
    } catch (emailErr) {
      // Email failure doesn't fail the upload
      console.error('Email notification failed:', emailErr.message);
    }

    return new Response(JSON.stringify({ ok: true, key: r2Key }), { headers: CORS_HEADERS });

  } catch (err) {
    console.error('upload error:', err.message);
    return new Response(JSON.stringify({ ok: false, error: err.message.slice(0, 200) }), {
      status: 500,
      headers: CORS_HEADERS,
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': 'https://www.sunflowerplumbing.com',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
