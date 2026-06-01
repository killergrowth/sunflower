// build.js -- Sunflower Plumbing Main Site
// Assembles dist/ from source HTML + _partials.
// Per SOP-WEB-BUILD: strips UTF-8 BOMs, writes UTF-8 without BOM.

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
  ['plumbing/index.html',            'plumbing/index.html'],
  ['septic/index.html',              'septic/index.html'],
  ['areas-served/index.html',        'areas-served/index.html'],
  ['financing/index.html',           'financing/index.html'],
  ['blog/index.html',                'blog/index.html'],
  ['contact/index.html',             'contact/index.html'],
  ['404.html',                       '404.html'],
];

for (const [src, dest] of pages) {
  const srcPath = path.join(ROOT, src);
  const destPath = path.join(DIST, dest);
  if (!fs.existsSync(srcPath)) {
    console.warn(`WARN: ${src} not found -- skipping`);
    continue;
  }
  let html = read(srcPath);
  html = injectPartials(html, header, footer);
  write(destPath, html);
  console.log(`Built: ${dest}`);
}

// 4. Copy asset folders
copyDir(path.join(ROOT, 'css'),    path.join(DIST, 'css'));
copyDir(path.join(ROOT, 'js'),     path.join(DIST, 'js'));
copyDir(path.join(ROOT, 'images'), path.join(DIST, 'images'));

// 5. Copy required deploy-root files (per SOP)
const rootFiles = ['robots.txt', 'sitemap.xml', '_worker.js', '_routes.json', '_redirects'];
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
  path.join(DIST, 'js', 'main.js'),
];
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

// Blog build step — runs if blogEnabled in sites.json
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
