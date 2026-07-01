'use strict';
const https = require('https');
const fs = require('fs');

const token = JSON.parse(fs.readFileSync('C:\\Users\\KillerGrowth\\.openclaw\\workspace\\google-token.json', 'utf8'));
const at = token.access_token;
const FILE_ID = '1N7PdPj2-Nkdy8DVMC9ErcGsNISS8Gys5';
const OUT = 'C:\\Users\\KillerGrowth\\.openclaw\\workspace\\sites\\sunflower\\images\\sunflower-1-3.jpg';

function download(fileId, outPath) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({ alt: 'media', supportsAllDrives: 'true' });
    const req = https.get({
      hostname: 'www.googleapis.com',
      path: '/drive/v3/files/' + fileId + '?' + params.toString(),
      headers: { Authorization: 'Bearer ' + at }
    }, res => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        // Follow redirect
        const loc = res.headers.location;
        console.log('Redirect to:', loc.substring(0, 80));
        https.get(loc, res2 => {
          const chunks = [];
          res2.on('data', c => chunks.push(c));
          res2.on('end', () => { fs.writeFileSync(outPath, Buffer.concat(chunks)); resolve(res2.statusCode); });
        }).on('error', reject);
        return;
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        if (res.statusCode === 200) {
          fs.writeFileSync(outPath, buf);
          console.log('Downloaded', buf.length, 'bytes to', outPath);
          resolve(res.statusCode);
        } else {
          console.log('Failed:', res.statusCode, buf.toString().substring(0, 300));
          resolve(res.statusCode);
        }
      });
    });
    req.on('error', reject);
  });
}

download(FILE_ID, OUT).catch(console.error);
