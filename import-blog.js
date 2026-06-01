/**
 * import-blog.js — Sunflower Plumbing blog import
 * Fetches all 45 real blog posts and saves to blog-posts/
 * Run: node import-blog.js
 */

const fs   = require('fs');
const path = require('path');
const https = require('https');
const http  = require('http');
const sharp = require('C:\\Users\\KillerGrowth\\.openclaw\\workspace\\tools\\kg-site-builder\\node_modules\\sharp');
const cheerio = require('C:\\Users\\KillerGrowth\\.openclaw\\workspace\\tools\\kg-site-builder\\node_modules\\cheerio');
const TurndownService = require('C:\\Users\\KillerGrowth\\.openclaw\\workspace\\tools\\kg-site-builder\\node_modules\\turndown');
const matter = require('C:\\Users\\KillerGrowth\\.openclaw\\workspace\\tools\\kg-site-builder\\node_modules\\gray-matter');

const BLOG_DIR  = path.join(__dirname, 'blog-posts');
const INDEX_FILE = path.join(BLOG_DIR, 'blog-index.json');

// All 45 real post URLs extracted from blog listing pages
const POST_URLS = [
  'https://www.sunflowerplumbing.com/24-hour-plumber-el-dorado-for-emergencies/',
  'https://www.sunflowerplumbing.com/5-common-signs-of-a-hidden-water-leak/',
  'https://www.sunflowerplumbing.com/affordable-plumber-el-dorado-for-every-plumbing-need/',
  'https://www.sunflowerplumbing.com/affordable-plumber-el-dorado-homeowners-trust/',
  'https://www.sunflowerplumbing.com/common-septic-problems-a-licensed-septic-professional-can-fix/',
  'https://www.sunflowerplumbing.com/do-i-need-a-plumber-or-can-i-diy/',
  'https://www.sunflowerplumbing.com/el-dorado-septic-care-tips-every-homeowner-needs/',
  'https://www.sunflowerplumbing.com/emergency-plumber-when-to-call-one/',
  'https://www.sunflowerplumbing.com/expert-plumber-el-dorado-for-any-plumbing-job/',
  'https://www.sunflowerplumbing.com/expert-plumber-el-dorado-for-homes-businesses/',
  'https://www.sunflowerplumbing.com/fast-friendly-service-from-a-trusted-local-plumber/',
  'https://www.sunflowerplumbing.com/how-a-plumber-can-help-with-home-renovations/',
  'https://www.sunflowerplumbing.com/how-plumbing-maintenance-prevents-costly-repairs/',
  'https://www.sunflowerplumbing.com/how-to-choose-the-right-septic-service-provider-for-your-home/',
  'https://www.sunflowerplumbing.com/how-to-find-the-best-plumber-near-me-in-minutes/',
  'https://www.sunflowerplumbing.com/how-to-prevent-a-drain-clog-in-your-home/',
  'https://www.sunflowerplumbing.com/plumber-el-dorado-services-for-drain-and-sewer-problems/',
  'https://www.sunflowerplumbing.com/plumber-near-me-what-to-expect-and-what-to-pay/',
  'https://www.sunflowerplumbing.com/professional-plumber-serving-homes-and-businesses/',
  'https://www.sunflowerplumbing.com/protecting-groundwater-with-proper-el-dorado-septic-care/',
  'https://www.sunflowerplumbing.com/quick-fixes-with-a-reliable-plumber-el-dorado-near-you/',
  'https://www.sunflowerplumbing.com/reliable-plumber-el-dorado-fast-service-you-can-trust/',
  'https://www.sunflowerplumbing.com/reliable-plumber-for-emergency-and-routine-plumbing/',
  'https://www.sunflowerplumbing.com/remodel-needs-an-experienced-plumber/',
  'https://www.sunflowerplumbing.com/sewer-line-repair-made-easy-for/',
  'https://www.sunflowerplumbing.com/sewer-line-repair-what-every-homeowner-should-know/',
  'https://www.sunflowerplumbing.com/should-know-before-hiring-a-plumber/',
  'https://www.sunflowerplumbing.com/signs-you-need-a-professional-plumber-immediately-today/',
  'https://www.sunflowerplumbing.com/signs-your-el-dorado-septic-system-needs-professional-care/',
  'https://www.sunflowerplumbing.com/top-benefits-of-timely-sewer-line-repair/',
  'https://www.sunflowerplumbing.com/top-plumber-el-dorado-services-near-you/',
  'https://www.sunflowerplumbing.com/top-plumbing-solutions-from-plumber-el-dorado/',
  'https://www.sunflowerplumbing.com/trusted-local-plumber-for-fast-residential-repairs/',
  'https://www.sunflowerplumbing.com/trusted-plumber-el-dorado-for-fast-repairs/',
  'https://www.sunflowerplumbing.com/water-heater-repair-signs-you-shouldnt-ignore/',
  'https://www.sunflowerplumbing.com/why-hiring-a-certified-septic-professional-saves-you-money-long-term/',
  'https://www.sunflowerplumbing.com/why-you-should-never-ignore-a-slow-drain/',
  'https://www.sunflowerplumbing.com/experienced-plumber-offering-complete-plumbing-services/',
  'https://www.sunflowerplumbing.com/budget-friendly-plumber-solutions-for/',
  'https://www.sunflowerplumbing.com/essential-plumber-services-that-protect/',
  'https://www.sunflowerplumbing.com/how-sewer-line-repair-saves-you-money/',
  'https://www.sunflowerplumbing.com/avoid-emergencies-with-sewer-line-repair/',
  'https://www.sunflowerplumbing.com/finding-the-right-plumber-el-dorado-for-your-needs/',
  'https://www.sunflowerplumbing.com/affordable-services-from-a-plumber-el-dorado/',
  'https://www.sunflowerplumbing.com/benefits-of-scheduling-routine-el-dorado-septic-pumping/',
  'https://www.sunflowerplumbing.com/how-regular-el-dorado-septic-cleaning-protects-your-property/',
  'https://www.sunflowerplumbing.com/how-sewer-line-repair-protects-your-property/',
  'https://www.sunflowerplumbing.com/el-dorado-septic-cleaning-and-repair-guide/',
  'https://www.sunflowerplumbing.com/affordable-plumbing-services-for-all-repairs/',
  'https://www.sunflowerplumbing.com/expert-plumber-el-dorado-for-fast-reliable-repairs/',
  'https://www.sunflowerplumbing.com/how-often-should-you-pump-your-septic-tank/',
];

// Junk slugs to remove (service pages, nav pages, etc.)
const JUNK_SLUGS = [
  '#', '#hcpro', 'about-us', 'areas-served', 'blog', 'plumbing',
  'privacy-policy', 'septic-services', 'sunflowerplumbing.com', 'terms-of-use',
  'drain-cleaning-clog-removal', 'fixture-replacement-repair', 'gas-line-services',
  'kitchen-bathroom-plumbing', 'lateral-field-installation', 'leak-detection-repair',
  'sewer-line-replacement-repair', 'toilet-faucet-repair',
  'water-heater-repair-and-installation', 'water-softener-installation',
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { headers: { 'User-Agent': 'KillerGrowth-BlogImporter/1.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve({ body: Buffer.concat(chunks), statusCode: res.statusCode }));
      res.on('error', reject);
    });
    req.on('error', reject);
  });
}

async function run() {
  const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
  fs.mkdirSync(path.join(BLOG_DIR, 'images'), { recursive: true });

  // Load existing index
  let index = { siteId: 'sunflower', posts: [] };
  if (fs.existsSync(INDEX_FILE)) {
    index = JSON.parse(fs.readFileSync(INDEX_FILE, 'utf8'));
  }

  // Remove junk posts
  const before = index.posts.length;
  index.posts = index.posts.filter(p => !JUNK_SLUGS.includes(p.slug));
  console.log(`Removed ${before - index.posts.length} junk posts. ${index.posts.length} remain.`);

  // Also delete junk .md files
  for (const slug of JUNK_SLUGS) {
    const mdPath = path.join(BLOG_DIR, `${slug}.md`);
    if (fs.existsSync(mdPath)) { fs.unlinkSync(mdPath); console.log(`Deleted ${slug}.md`); }
  }

  let imported = 0;
  let skipped = 0;

  for (const postUrl of POST_URLS) {
    const slug = postUrl.replace(/\/$/, '').split('/').pop();
    if (!slug) { skipped++; continue; }

    // Skip if already imported
    if (index.posts.find(p => p.slug === slug)) {
      console.log(`Skip (exists): ${slug}`);
      skipped++;
      continue;
    }

    try {
      const { body } = await fetchUrl(postUrl);
      const $ = cheerio.load(body.toString('utf8'));

      const title = $('h1').first().text().trim()
        || $('title').text().replace(/ \|.*/, '').trim()
        || slug.replace(/-/g, ' ');

      // WP content selectors
      const contentEl = $('.entry-content, .post-content, article .content, .wp-block-group__inner-container, .wp-block-post-content').first();
      const bodyHtml = contentEl.length ? contentEl.html() : $('article').html() || $('main').html() || '';
      const bodyMd = td.turndown(bodyHtml || '');

      const excerpt = $('meta[name="description"]').attr('content')
        || $('meta[property="og:description"]').attr('content')
        || bodyMd.split('\n').find(l => l.trim().length > 60)?.slice(0, 200) || '';

      const pubDate = $('meta[property="article:published_time"]').attr('content')
        || $('time[datetime]').first().attr('datetime')
        || null;

      // Featured image
      let featuredImage = null;
      const ogImage = $('meta[property="og:image"]').attr('content');
      if (ogImage && !ogImage.includes('gravatar')) {
        try {
          const imgRes = await fetchUrl(ogImage);
          if (imgRes.statusCode < 400) {
            const imgPath = path.join(BLOG_DIR, 'images', `${slug}.jpg`);
            await sharp(imgRes.body)
              .resize({ width: 1200, withoutEnlargement: true })
              .jpeg({ quality: 82 })
              .toFile(imgPath);
            featuredImage = `blog-posts/images/${slug}.jpg`;
          }
        } catch (imgErr) {
          console.warn(`  Image failed for ${slug}: ${imgErr.message}`);
        }
      }

      const now = new Date().toISOString();
      const entry = {
        slug, title, status: 'published',
        publishDate: pubDate || now,
        scheduledDate: null,
        excerpt, featuredImage,
        tags: [], author: 'Sunflower Plumbing',
        createdAt: now, updatedAt: now
      };

      fs.writeFileSync(path.join(BLOG_DIR, `${slug}.md`), matter.stringify(bodyMd, entry), 'utf8');
      index.posts.push(entry);
      imported++;
      console.log(`✓ ${slug}`);
    } catch (err) {
      console.warn(`✗ ${slug}: ${err.message}`);
    }
  }

  fs.writeFileSync(INDEX_FILE, JSON.stringify(index, null, 2), 'utf8');
  console.log(`\nDone. Imported: ${imported} | Skipped: ${skipped} | Total in index: ${index.posts.length}`);
}

run().catch(console.error);

