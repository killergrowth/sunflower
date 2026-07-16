const https = require('https');
const qs = require('querystring');
const fs = require('fs');

const creds = fs.readFileSync('C:/Users/KillerGrowth/.openclaw/workspace/References/credentials.md', 'utf8');
const CLIENT_ID = creds.match(/GBP OAuth Client ID[^\n]*\n([^\n]+)/)?.[1]?.trim();
const CLIENT_SECRET = creds.match(/GBP OAuth Client Secret[^\n]*\n([^\n]+)/)?.[1]?.trim();
const REFRESH_TOKEN = creds.match(/GBP OAuth Token[\s\S]{0,200}?Refresh Token[^\n]*\n([^\n]+)/)?.[1]?.trim();

console.log('Refresh token found:', !!REFRESH_TOKEN);

function post(hostname, path, body) {
  return new Promise((resolve, reject) => {
    const data = typeof body === 'string' ? body : qs.stringify(body);
    const req = https.request({ hostname, path, method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(data) }
    }, res => { let d = ''; res.on('data', c => d += c); res.on('end', () => resolve(JSON.parse(d))); });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function get(hostname, path, token) {
  return new Promise((resolve, reject) => {
    const req = https.request({ hostname, path, headers: { Authorization: 'Bearer ' + token } },
      res => { let d = ''; res.on('data', c => d += c); res.on('end', () => resolve(JSON.parse(d))); });
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  const tokenResp = await post('oauth2.googleapis.com', '/token', {
    client_id: CLIENT_ID, client_secret: CLIENT_SECRET,
    refresh_token: REFRESH_TOKEN, grant_type: 'refresh_token'
  });
  
  if (!tokenResp.access_token) {
    console.log('Token error:', JSON.stringify(tokenResp));
    return;
  }
  
  const token = tokenResp.access_token;
  console.log('Token OK');
  
  const reviews = await get('mybusiness.googleapis.com',
    '/v4/accounts/109505611731588119771/locations/15983736476187035394/reviews?pageSize=10',
    token);
  
  console.log(JSON.stringify(reviews, null, 2));
}

main().catch(console.error);
