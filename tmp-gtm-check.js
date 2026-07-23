const fs = require('fs');
const tokenData = JSON.parse(fs.readFileSync('C:/Users/KillerGrowth/.openclaw/workspace/google-token.json', 'utf8'));
const creds = JSON.parse(fs.readFileSync('C:/Users/KillerGrowth/.openclaw/workspace/google-oauth-creds.json', 'utf8'));

async function refreshToken() {
  const params = new URLSearchParams({
    client_id: creds.client_id,
    client_secret: creds.client_secret,
    refresh_token: tokenData.refresh_token,
    grant_type: 'refresh_token'
  });
  const r = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', body: params });
  const d = await r.json();
  if (d.error) throw new Error('refresh failed: ' + d.error + ' - ' + d.error_description);
  return d.access_token;
}

async function main() {
  const token = await refreshToken();
  console.log('Token refreshed ok');

  // List GTM accounts
  const r = await fetch('https://tagmanager.googleapis.com/tagmanager/v2/accounts', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const d = await r.json();
  if (d.error) { console.log('GTM accounts error:', d.error.message, '| code:', d.error.code, '| status:', d.error.status); return; }
  console.log('Accounts found:', (d.account||[]).length);
  (d.account || []).forEach(a => console.log(' -', a.accountId, '|', a.name));
}

main().catch(e => console.error('FATAL:', e.message));
