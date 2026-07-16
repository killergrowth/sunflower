// build.js -- Sunflower Plumbing Main Site
// Assembles dist/ from source HTML + _partials.
// Per SOP-WEB-BUILD: strips UTF-8 BOMs, writes UTF-8 without BOM.

const { generateSitemap } = require('C:\\\\Users\\\\KillerGrowth\\\\.openclaw\\\\workspace\\\\tools\\\\kg-site-builder\\\\lib\\\\gen-sitemap');
const { injectScripts, loadSiteScripts } = require('C:\\\\Users\\\\KillerGrowth\\\\.openclaw\\\\workspace\\\\tools\\\\kg-site-builder\\\\lib\\\\inject-scripts');
const SITE_DOMAIN = 'sunflowerplumbing.com';
const SITE_ID     = 'sunflower';
const fs = require('fs');
const path = require('path');
const { buildBlog } = require('C:\\Users\\KillerGrowth\\.openclaw\\workspace\\tools\\kg-site-builder\\lib\\blog-build');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');

// SOP-mandated read function: strips UTF-8 BOM
function read(p) {
  const buf = fs.readFileSync(p);
  const start = (buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) ? 3 : 0;
  return buf.slice(start).toString('utf8');
}

function write(p, content) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, 'utf8');
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function injectPartials(html, header, footer) {
  return html
    .replace('<!-- HEADER -->', header)
    .replace('<!-- FOOTER -->', footer);
}

// Reviews data (from Google Places API cache)
const reviewsFile = path.join(ROOT, 'data', 'reviews.json');
const reviewData = fs.existsSync(reviewsFile)
  ? JSON.parse(fs.readFileSync(reviewsFile, 'utf8'))
  : { rating: 4.8, userRatingCount: 0, reviews: [] };

const ratingStr = reviewData.rating !== null ? Number(reviewData.rating).toFixed(1) : '4.8';
const countStr = reviewData.userRatingCount ? reviewData.userRatingCount.toString() : '0';

const reviewCards = (reviewData.reviews || []).map(r => {
  const esc = t => (t || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const initial = (r.author || 'G').charAt(0).toUpperCase();
  return `<div class="review-card">
  <div class="review-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
  <p class="review-text">&ldquo;${esc(r.text)}&rdquo;</p>
  <div class="review-author">${esc(r.author)} &bull; <span style="font-weight:400;opacity:0.75;">${esc(r.relativeTime)}</span></div>
</div>`;
}).join('\n');

// 1. Wipe dist/
if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST);

// 2. Read partials
const header = read(path.join(ROOT, '_partials', 'header.html'));
const footer = read(path.join(ROOT, '_partials', 'footer.html'));

// 3. Pages to build: [sourcePath, distPath]
const pages = [
  ['index.html',                      'index.html'],
  ['about/index.html',               'about/index.html'],
  ['plumbing/index.html',                                        'plumbing/index.html'],
  ['plumbing/water-heater-repair/index.html',                    'plumbing/water-heater-repair/index.html'],
  ['plumbing/drain-cleaning/index.html',                         'plumbing/drain-cleaning/index.html'],
  ['plumbing/leak-detection/index.html',                         'plumbing/leak-detection/index.html'],
  ['plumbing/toilet-faucet-repair/index.html',                   'plumbing/toilet-faucet-repair/index.html'],
  ['plumbing/fixture-replacement/index.html',                    'plumbing/fixture-replacement/index.html'],
  ['plumbing/gas-line-services/index.html',                      'plumbing/gas-line-services/index.html'],
  ['plumbing/kitchen-bathroom-plumbing/index.html',              'plumbing/kitchen-bathroom-plumbing/index.html'],
  ['plumbing/water-softener-installation/index.html',            'plumbing/water-softener-installation/index.html'],
  ['plumbing/sewer-line-repair/index.html',                      'plumbing/sewer-line-repair/index.html'],
  ['septic/index.html',                                          'septic/index.html'],
  ['septic/lateral-field-installation/index.html',               'septic/lateral-field-installation/index.html'],
  ['excavation/index.html',                                      'excavation/index.html'],
  ['excavation/sewer-water-line-excavation/index.html',          'excavation/sewer-water-line-excavation/index.html'],
  ['excavation/septic-system-excavation/index.html',             'excavation/septic-system-excavation/index.html'],
  ['excavation/trenching/index.html',                            'excavation/trenching/index.html'],
  ['excavation/site-preparation/index.html',                     'excavation/site-preparation/index.html'],
  ['excavation/backfill-grading/index.html',                     'excavation/backfill-grading/index.html'],
  ['excavation/emergency-excavation/index.html',                 'excavation/emergency-excavation/index.html'],
  ['areas-served/index.html',        'areas-served/index.html'],
  ['financing/index.html',           'financing/index.html'],
  ['blog/index.html',                'blog/index.html'],
  ['contact/index.html',             'contact/index.html'],
  ['404.html',                       '404.html']];

for (const [src, dest] of pages) {
  const srcPath = path.join(ROOT, src);
  const destPath = path.join(DIST, dest);
  if (!fs.existsSync(srcPath)) {
    console.warn(`WARN: ${src} not found -- skipping`);
    continue;
  }
  let html = read(srcPath);
  html = injectPartials(html, header, footer);
  // Inject live review data into homepage
  if (src === 'index.html') {
    html = html
      .replace(/<!-- RATING_VALUE -->/g, ratingStr)
      .replace(/<!-- REVIEW_COUNT -->/g, countStr)
      .replace(/<!-- SCHEMA_RATING -->/g, ratingStr)
      .replace(/<!-- SCHEMA_COUNT -->/g, countStr)
      .replace('<!-- REVIEW_CARDS -->', reviewCards);
  }
  html = injectScripts(html, loadSiteScripts(SITE_ID));
  write(destPath, html);
  console.log(`Built: ${dest}`);
}

// 4. Copy asset folders
copyDir(path.join(ROOT, 'css'),    path.join(DIST, 'css'));
copyDir(path.join(ROOT, 'js'),     path.join(DIST, 'js'));
copyDir(path.join(ROOT, 'images'), path.join(DIST, 'images'));

// 5. Copy required deploy-root files (per SOP)
const rootFiles = ['robots.txt', '_worker.js', '_routes.json', '_redirects'];
for (const f of rootFiles) {
  const src = path.join(ROOT, f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(DIST, f));
  } else {
    console.warn(`WARN: ${f} not found -- skipping`);
  }
}

// 6. Encoding diagnostic per SOP
const filesToCheck = [
  path.join(DIST, 'index.html'),
  path.join(DIST, 'about', 'index.html'),
  path.join(DIST, 'contact', 'index.html'),
  path.join(DIST, 'css', 'styles.css'),
  path.join(DIST, 'js', 'main.js')];
let problems = 0;
for (const f of filesToCheck) {
  if (!fs.existsSync(f)) { console.warn(`CHECK: ${f} not found`); continue; }
  const c = fs.readFileSync(f).toString('utf8');
  const boms = (c.match(/\uFEFF/g) || []).length;
  const repl = (c.match(/\uFFFD/g) || []).length;
  if (boms || repl) {
    console.error(`FAIL: ${path.relative(ROOT, f)}  BOMs=${boms}  Replacement=${repl}`);
    problems++;
  } else {
    console.log(`OK:   ${path.relative(ROOT, f)}`);
  }
}

if (problems > 0) {
  console.error(`\nBuild completed with ${problems} encoding problem(s). Do NOT deploy.`);
  process.exit(1);
}
console.log('\nBuild OK. Deploy ./dist');

// Blog build step â€” runs if blogEnabled in sites.json
try {
  const sitesPath = 'C:\\Users\\KillerGrowth\\.openclaw\\workspace\\References\\sites.json';
  const sites = JSON.parse(fs.readFileSync(sitesPath, 'utf8').replace(/^\uFEFF/, ''));
  const site  = sites.sites.find(s => s.id === 'sunflower');
  if (site && site.blogEnabled) {
    const postsPerPage = site.blogPostsPerPage || 10;
    buildBlog({ srcDir: ROOT, distDir: DIST, siteId: 'sunflower', postsPerPage, domain: 'sunflowerplumbing.com', siteName: 'Sunflower Plumbing' });
  }
} catch (err) {
  console.warn('[Blog] Build step skipped:', err.message);
}

// 7. Generate city pages
try {
  const cities = require(path.join(ROOT, '_data', 'cities.js'));
  const cityTemplate = read(path.join(ROOT, '_partials', 'city-page.html'));
  for (const city of cities) {
    let html = cityTemplate
      .replace(/{{CITY_NAME}}/g, city.name)
      .replace(/{{CITY_SLUG}}/g, city.slug)
      .replace(/{{CITY_COUNTY}}/g, city.county)
      .replace(/{{META_DESC}}/g, city.metaDesc)
      .replace(/{{HERO_SUB}}/g, city.heroSub)
      .replace(/{{INTRO}}/g, city.intro)
      .replace(/{{LOCAL_DETAIL}}/g, city.localDetail)
      .replace(/{{CALLOUT}}/g, city.callout);
    html = injectPartials(html, header, footer);
    html = injectScripts(html, loadSiteScripts(SITE_ID));
    const destPath = path.join(DIST, 'areas-served', city.slug, 'index.html');
    write(destPath, html);
    console.log(`Built: areas-served/${city.slug}/index.html`);
  }
  console.log(`[Cities] Built ${cities.length} city pages.`);
} catch (err) {
  console.warn('[Cities] Skipped:', err.message);
}

// Generate sitemap from actual dist/ contents
generateSitemap({ distDir: DIST, siteRoot: ROOT, domain: SITE_DOMAIN });
