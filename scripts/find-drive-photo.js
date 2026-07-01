'use strict';
const https = require('https');
const fs = require('fs');
const qs = require('querystring');

const credsRaw = fs.readFileSync('C:\\Users\\KillerGrowth\\.openclaw\\workspace\\google-oauth-creds.json', 'utf8');
const creds = JSON.parse(credsRaw);
const tokenPath = 'C:\\Users\\KillerGrowth\\.openclaw\\workspace\\google-token.json';
const token = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));

function httpsGet(url, headers) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request({ hostname: u.hostname, path: u.pathname + u.search, headers }, res => {
      let d = ''; res.on('data', c => d += c); res.on('end', () => resolve({ status: res.statusCode, body: d }));
    });
    req.on('error', reject); req.end();
  });
}

function httpsPost(hostname, path, body, headers) {
  return new Promise((resolve, reject) => {
    const req = https.request({ hostname, path, method: 'POST', headers }, res => {
      let d = ''; res.on('data', c => d += c); res.on('end', () => resolve({ status: res.statusCode, body: d }));
    });
    req.on('error', reject); req.write(body); req.end();
  });
}

async function refreshToken() {
  const clientId = creds.client_id || (creds.installed ? creds.installed.client_id : creds.web.client_id);
  const clientSecret = creds.client_secret || (creds.installed ? creds.installed.client_secret : creds.web.client_secret);
  const body = qs.stringify({ client_id: clientId, client_secret: clientSecret, refresh_token: token.refresh_token, grant_type: 'refresh_token' });
  const res = await httpsPost('oauth2.googleapis.com', '/token', body, { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(body) });
  const parsed = JSON.parse(res.body);
  if (!parsed.access_token) throw new Error('Refresh failed: ' + res.body);
  token.access_token = parsed.access_token;
  fs.writeFileSync(tokenPath, JSON.stringify(token, null, 2));
  console.log('Token refreshed');
  return parsed.access_token;
}

async function main() {
  const at = await refreshToken();
  const searchUrl = "https://www.googleapis.com/drive/v3/files?q=name+contains+'sunflower-1-3'&fields=files(id,name,mimeType,size)&spaces=drive&pageSize=10";
  const res = await httpsGet(searchUrl, { Authorization: 'Bearer ' + at });
  console.log('Search result:', res.status, res.body);

  const files = JSON.parse(res.body).files || [];
  if (files.length === 0) {
    console.log('File not found — trying broader search...');
    const res2 = await httpsGet("https://www.googleapis.com/drive/v3/files?q=name+contains+'sunflower'&fields=files(id,name,mimeType)&spaces=drive&pageSize=20", { Authorization: 'Bearer ' + at });
    console.log('Broader search:', res2.body);
  } else {
    // Download the first match
    const file = files[0];
    console.log('Found:', file.name, file.id);
    const dlRes = await httpsGet('https://www.googleapis.com/drive/v3/files/' + file.id + '?alt=media', { Authorization: 'Bearer ' + at });
    if (dlRes.status === 200) {
      const outPath = 'C:\\Users\\KillerGrowth\\.openclaw\\workspace\\sites\\sunflower\\images\\' + file.name;
      fs.writeFileSync(outPath, Buffer.from(dlRes.body, 'binary'));
      console.log('Downloaded to:', outPath);
    } else {
      console.log('Download failed:', dlRes.status, dlRes.body.substring(0, 200));
    }
  }
}
main().catch(console.error);
