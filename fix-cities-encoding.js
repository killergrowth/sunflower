const fs = require('fs');

const files = [
  '_data/cities.js',
  '_data/services.js',
  '_data/service-faqs.js',
  '_data/services-end.js',
  '_data/services-remainder.js'
];

// The file contains UTF-8 text that was double-encoded.
// Actual bytes: â (U+00E2) + € (U+20AC) + " (U+201D) = garbled em dash
// These are the Unicode codepoints as they appear when read as UTF-8:
const replacements = [
  // â€" = em dash (most common) - U+00E2 U+20AC U+201D followed by space
  [/\u00e2\u20ac\u201d/g, '--'],
  // â€™ = right single quote - U+00E2 U+20AC U+2122
  [/\u00e2\u20ac\u2122/g, "'"],
  // â€œ = left double quote - U+00E2 U+20AC U+0153
  [/\u00e2\u20ac\u0153/g, '"'],
  // â€" = en dash - U+00E2 U+20AC U+201C
  [/\u00e2\u20ac\u201c/g, '-'],
  // â€¦ = ellipsis - U+00E2 U+20AC U+00A6  
  [/\u00e2\u20ac\u00a6/g, '...'],
  // Catch-all: any â followed by euro sign
  [/\u00e2\u20ac[\u0080-\u02ff]/g, '--'],
];

files.forEach(file => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    let count = 0;
    replacements.forEach(([pattern, replacement]) => {
      const before = content;
      content = content.replace(pattern, replacement);
      if (content !== before) count++;
    });
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed ${file} (${count} pattern types replaced)`);

    // Verify
    if (content.includes('\u00e2\u20ac')) {
      console.log(`  WARNING: still has garbled chars in ${file}`);
    } else {
      console.log(`  Clean!`);
    }
  } catch(e) {
    console.log(`Skipped ${file}: ${e.message}`);
  }
});

console.log('All done');
