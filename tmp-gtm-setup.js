const { GoogleAuth } = require('C:/Users/KillerGrowth/.openclaw/workspace/node_modules/google-auth-library');

const auth = new GoogleAuth({
  keyFile: 'C:/Users/KillerGrowth/.openclaw/credentials/google-service-account.json',
  scopes: ['https://www.googleapis.com/auth/tagmanager.edit.containers',
           'https://www.googleapis.com/auth/tagmanager.manage.accounts',
           'https://www.googleapis.com/auth/tagmanager.publish'],
  clientOptions: { subject: 'tylerbrickley@killergrowth.com' }
});

async function api(token, path, method = 'GET', body = null) {
  const opts = { method, headers: { Authorization: '***' + token, 'Content-Type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  const r = await fetch('https://tagmanager.googleapis.com/tagmanager/v2' + path, opts);
  const d = await r.json();
  if (d.error) throw new Error(`GTM API error: ${d.error.message} (${d.error.code})`);
  return d;
}

async function main() {
  const token = await auth.getAccessToken();
  console.log('Auth ok');

  // Find accounts
  const accounts = await api(token, '/accounts');
  console.log('Accounts:', (accounts.account||[]).map(a => a.accountId + ':' + a.name).join(', '));

  // Find the container GTM-P52V4GWP
  let targetAccount = null, targetContainer = null;
  for (const acct of (accounts.account || [])) {
    const containers = await api(token, `/accounts/${acct.accountId}/containers`);
    for (const c of (containers.container || [])) {
      if (c.publicId === 'GTM-P52V4GWP') {
        targetAccount = acct.accountId;
        targetContainer = c.containerId;
        console.log('Found container:', c.publicId, '| acctId:', acct.accountId, '| containerId:', c.containerId);
      }
    }
  }

  if (!targetContainer) { console.log('Container GTM-P52V4GWP not found'); return; }

  // Get workspaces
  const ws = await api(token, `/accounts/${targetAccount}/containers/${targetContainer}/workspaces`);
  const workspace = ws.workspace[0];
  const wsPath = workspace.path;
  console.log('Workspace:', workspace.workspaceId, workspace.name);

  // List existing tags
  const tags = await api(token, `/${wsPath}/tags`);
  console.log('\nExisting tags:');
  (tags.tag || []).forEach(t => console.log(' -', t.tagId, t.name, '| type:', t.type));

  // List existing triggers
  const triggers = await api(token, `/${wsPath}/triggers`);
  console.log('\nExisting triggers:');
  (triggers.trigger || []).forEach(t => console.log(' -', t.triggerId, t.name, '| type:', t.type));
}

main().catch(e => console.error('FATAL:', e.message));
