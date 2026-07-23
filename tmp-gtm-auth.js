const { GoogleAuth } = require('C:/Users/KillerGrowth/.openclaw/workspace/node_modules/google-auth-library');

// Try each scope variation to find what works
const scopeVariants = [
  'https://www.googleapis.com/auth/tagmanager.edit.containers',
  'https://www.googleapis.com/auth/tagmanager.readonly',
  'https://www.googleapis.com/auth/tagmanager.manage.accounts',
];

async function tryAuth(scope) {
  try {
    const auth = new GoogleAuth({
      keyFile: 'C:/Users/KillerGrowth/.openclaw/credentials/google-service-account.json',
      scopes: [scope],
      clientOptions: { subject: 'tylerbrickley@killergrowth.com' }
    });
    const token = await auth.getAccessToken();
    const r = await fetch('https://tagmanager.googleapis.com/tagmanager/v2/accounts', {
      headers: { Authorization: '***' + token }
    });
    const d = await r.json();
    if (d.error) return { scope, result: 'API error: ' + d.error.message + ' (' + d.error.code + ')' };
    return { scope, result: 'OK - accounts: ' + (d.account||[]).map(a=>a.name).join(', ') };
  } catch(e) {
    return { scope, result: 'auth error: ' + e.message };
  }
}

Promise.all(scopeVariants.map(tryAuth)).then(results => {
  results.forEach(r => console.log(r.scope.split('/').pop() + ':', r.result));
}).catch(console.error);
