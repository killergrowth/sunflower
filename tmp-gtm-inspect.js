fetch('https://www.googletagmanager.com/gtm.js?id=GTM-P52V4GWP')
  .then(r => r.text())
  .then(js => {
    console.log('Container size:', js.length, 'bytes');
    console.log('Has phone_click:', js.includes('phone_click'));
    console.log('Has generate_lead:', js.includes('generate_lead'));
    console.log('Has GA4 G-JXZJM5L4H5:', js.includes('G-JXZJM5L4H5'));
    console.log('Has cta_click:', js.includes('cta_click'));
    console.log('Has scroll_depth:', js.includes('scroll_depth'));
    // Look for event names in the container payload
    const eventNames = [];
    let match;
    const re = /"event_name":"([^"]+)"/g;
    while ((match = re.exec(js)) !== null) eventNames.push(match[1]);
    console.log('Custom event names:', eventNames.length ? eventNames.join(', ') : 'none');
    // Count tags
    const tagCount = (js.match(/"tag_id"/g) || []).length;
    console.log('Approx tag count:', tagCount);
  }).catch(e => console.log('error:', e.message));
