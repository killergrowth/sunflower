'use strict';
// Adds GOOGLE_SA_JSON and CLOUDFLARE_API_TOKEN secrets to the GitHub repo
// Uses libsodium-wrappers for nacl encryption required by GitHub
const https = require('https');

const REPO = 'killergrowth/sunflower';
const GH_TOKEN = process.env.GITHUB_TOKEN;
const CF_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

// Build SA JSON string
// SA JSON removed from source — load from env / References/credentials.md (Google Service Account)
const SA = JSON.parse(process.env.GOOGLE_SA_JSON || '{}');

function ghRequest(path, method, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: 'api.github.com', path, method,
      headers: {
        Authorization: 'Bearer ' + GH_TOKEN,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'KillerGrowth-Agent',
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {})
      }
    }, res => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, body: d ? JSON.parse(d) : {} }));
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function encryptSecret(publicKeyB64, secretValue) {
  // GitHub uses libsodium sealed box (X25519 + XSalsa20-Poly1305)
  // We'll use the sodium-native or libsodium-wrappers npm package
  const sodium = require('libsodium-wrappers');
  await sodium.ready;
  const keyBytes = Buffer.from(publicKeyB64, 'base64');
  const messageBytes = Buffer.from(secretValue, 'utf8');
  const encryptedBytes = sodium.crypto_box_seal(messageBytes, keyBytes);
  return Buffer.from(encryptedBytes).toString('base64');
}

async function setSecret(keyId, publicKey, secretName, secretValue) {
  const encryptedValue = await encryptSecret(publicKey, secretValue);
  const res = await ghRequest(
    `/repos/${REPO}/actions/secrets/${secretName}`,
    'PUT',
    { encrypted_value: encryptedValue, key_id: keyId }
  );
  console.log(`Set ${secretName}: ${res.status === 204 || res.status === 201 ? 'OK' : 'FAILED ' + JSON.stringify(res.body)}`);
}

async function main() {
  // Get repo public key
  const keyRes = await ghRequest(`/repos/${REPO}/actions/secrets/public-key`, 'GET');
  const { key_id, key } = keyRes.body;
  console.log('Got public key, id:', key_id);

  await setSecret(key_id, key, 'GOOGLE_SA_JSON', JSON.stringify(SA));
  await setSecret(key_id, key, 'CLOUDFLARE_API_TOKEN', CF_TOKEN);
}

main().catch(e => console.error(e));
