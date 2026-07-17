const fs = require('fs');
const f = 'C:\\Users\\KillerGrowth\\.openclaw\\workspace\\sites\\sunflower\\_data\\cities.js';
let c = fs.readFileSync(f, 'utf8');

// Fix Cassoday localDetail — replace the whole thing cleanly
const oldCassoday = /localDetail: '(Properties in the Cassoday area[^]*?)(?<!\\)',/;
const newCassoday = `localDetail: 'Properties in the Cassoday area often have older septic systems and rely on well water — common in eastern Butler County where municipal water service does not reach. Many farmsteads and rural homes in this area have aging galvanized supply lines, undersized or failing lateral fields, and water heaters past their service life. The Flint Hills clay-limestone soil mix affects septic absorption and buried utility line behavior differently than Butler County\'s western corridors. We\'re experienced with rural setups, perform honest inspections, and handle septic repairs, lateral field installation, and plumbing service for homes and ranch properties throughout the area.',`;

c = c.replace(oldCassoday, newCassoday);

// Fix El Dorado localDetail — ensure proper escaping
const oldElDorado = /localDetail: 'El Dorado was built on oil money[^]*?(?<!\\)',/;
const newElDorado = `localDetail: 'El Dorado was built on oil money and has the character to prove it — from the historic homes near 8th Avenue and Emporia Street to the newer developments west of Main Street. Many of El Dorado\'s older homes still have galvanized or cast iron supply lines past their service life, and Butler County\'s hard water accelerates wear on water heaters, fixtures, and softener systems. Clay-heavy soils in the area also affect septic systems and buried line longevity. We know this city\'s plumbing quirks and the issues that come with aging housing stock and Kansas weather.',`;

c = c.replace(oldElDorado, newElDorado);

// Validate it parses
try {
  require.extensions['.js'];
  const tmp = require('vm').runInNewContext('(' + c.replace(/^module\.exports\s*=\s*/, '') + ')', {});
  console.log('Parse OK — ' + tmp.length + ' cities');
} catch(e) {
  console.error('PARSE ERROR:', e.message);
  process.exit(1);
}

fs.writeFileSync(f, c, 'utf8');
console.log('cities.js updated');
