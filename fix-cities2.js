const fs = require('fs');
const f = 'C:\\Users\\KillerGrowth\\.openclaw\\workspace\\sites\\sunflower\\_data\\cities.js';
let c = fs.readFileSync(f, 'utf8');

// The PowerShell replacements left \\' (literal backslash + apostrophe) in JS string literals.
// In a JS single-quoted string, \' is a valid escape. But \\' means backslash then end-of-string.
// Fix: replace all \\' sequences inside the problematic strings with just \'

// Strategy: replace all occurrences of \\' that appear inside JS string content with \'
// We can do this safely by replacing \\\' -> \'  (the file bytes are: backslash backslash apostrophe)
c = c.replace(/\\\\'/g, "\\'");

// Also fix the El Dorado entry which had similar issues from the regex replace
// Check if El Dorado's localDetail is clean now
const elDCheck = c.match(/slug: 'el-dorado'[^}]*localDetail: '([^]*?)(?<!\\)',/);
if (elDCheck) {
  console.log('El Dorado localDetail excerpt:', elDCheck[1].substring(0, 100));
}

// Write back
fs.writeFileSync(f, c, 'utf8');

// Validate
try {
  delete require.cache[require.resolve('./_data/cities.js')];
  const cities = require('./_data/cities.js');
  console.log('Parse OK —', cities.length, 'cities');
  const ed = cities.find(c => c.slug === 'el-dorado');
  const cas = cities.find(c => c.slug === 'cassoday');
  console.log('El Dorado localDetail:', ed ? ed.localDetail.substring(0, 80) + '...' : 'NOT FOUND');
  console.log('Cassoday localDetail:', cas ? cas.localDetail.substring(0, 80) + '...' : 'NOT FOUND');
} catch(e) {
  console.error('STILL BROKEN:', e.message);
}
