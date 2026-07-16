const fs = require('fs');
const path = 'C:/Users/KillerGrowth/.openclaw/workspace/sites/sunflower/about/index.html';
let content = fs.readFileSync(path, 'utf8');

// Fix mojibake em dash: the sequence â€" is the UTF-8 bytes for — read as Latin-1
content = content.replace(/â€"/g, '\u2014');
content = content.replace(/â€™/g, '\u2019');
content = content.replace(/â€œ/g, '\u201C');
content = content.replace(/â€/g, '\u201D');

// Log remaining suspicious chars
const remaining = (content.match(/[âÂ][€\u0080]/g) || []);
console.log('Remaining mojibake sequences:', remaining.length);

// Show context around the known bad spot
const idx = content.indexOf('Butler County \u2014');
if (idx >= 0) console.log('Fixed em dash found at:', idx);

fs.writeFileSync(path, content, 'utf8');
console.log('Done');
