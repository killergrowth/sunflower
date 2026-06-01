const https = require('https');
const fs = require('fs');
const cheerio = require('C:\\Users\\KillerGrowth\\.openclaw\\workspace\\tools\\kg-site-builder\\node_modules\\cheerio');

const slugs = [
  'do-i-need-a-plumber-or-can-i-diy',
  'el-dorado-septic-care-tips-every-homeowner-needs',
  'emergency-plumber-when-to-call-one',
  'fast-friendly-service-from-a-trusted-local-plumber',
  'how-a-plumber-can-help-with-home-renovations',
  'how-plumbing-maintenance-prevents-costly-repairs'
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location)
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve({ body: Buffer.concat(chunks).toString('utf8'), statusCode: res.statusCode }));
      res.on('error', reject);
    });
    req.on('error', reject);
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function run() {
  const results = {};
  for (const slug of slugs) {
    await sleep(3000);
    const url = 'https://www.sunflowerplumbing.com/' + slug + '/';
    try {
      const { body, statusCode } = await fetchUrl(url);
      const $ = cheerio.load(body);
      const title = $('h1').first().text().trim() || $('title').text().replace(/ \|.*/, '').trim();
      console.log(slug + ' => ' + statusCode + ' | ' + title);
      results[slug] = title && title !== '404 Error' ? title : null;
    } catch(e) {
      console.log(slug + ' => ERR: ' + e.message);
    }
  }

  const idxPath = 'blog-posts/blog-index.json';
  const idx = JSON.parse(fs.readFileSync(idxPath, 'utf8'));
  let patched = 0;
  for (const post of idx.posts) {
    if (results[post.slug]) {
      console.log('Patching: ' + post.slug + ' => ' + results[post.slug]);
      post.title = results[post.slug];
      patched++;
    }
  }
  fs.writeFileSync(idxPath, JSON.stringify(idx, null, 2));
  console.log('Done. Patched ' + patched + ' titles.');
}

run().catch(console.error);
