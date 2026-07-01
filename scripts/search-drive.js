'use strict';
const https = require('https');
const fs = require('fs');

const token = JSON.parse(fs.readFileSync('C:\\Users\\KillerGrowth\\.openclaw\\workspace\\google-token.json', 'utf8'));
const at = token.access_token;

function get(url) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    https.get({ hostname: u.hostname, path: u.pathname + u.search, headers: { Authorization: 'Bearer ' + at } }, res => {
      let d = ''; res.on('data', c => d += c); res.on('end', () => resolve({ status: res.statusCode, body: d }));
    }).on('error', reject);
  });
}

async function main() {
  // Search all drives including shared
  const params = new URLSearchParams({
    q: "name contains 'sunflower-1' and mimeType contains 'image'",
    fields: 'files(id,name,mimeType,size)',
    includeItemsFromAllDrives: 'true',
    supportsAllDrives: 'true',
    pageSize: '20'
  });
  const url = 'https://www.googleapis.com/drive/v3/files?' + params.toString();
  const r = await get(url);
  const data = JSON.parse(r.body);
  console.log('Image files matching sunflower-1:', JSON.stringify(data, null, 2));

  if (!data.files || data.files.length === 0) {
    // Try without image filter
    const params2 = new URLSearchParams({
      q: "name contains 'sunflower-1'",
      fields: 'files(id,name,mimeType,size)',
      includeItemsFromAllDrives: 'true',
      supportsAllDrives: 'true',
      pageSize: '20'
    });
    const r2 = await get('https://www.googleapis.com/drive/v3/files?' + params2.toString());
    console.log('Any files matching sunflower-1:', r2.body);
  }
}
main().catch(console.error);
