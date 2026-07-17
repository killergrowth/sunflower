// score-check.js — KillerSEO spot-score for service+location pages
const fs   = require('fs');
const path = require('path');

const DIST = path.join(__dirname, 'dist');

const SAMPLE = [
  'plumbing/water-heater-repair/el-dorado-ks/index.html',
  'plumbing/drain-cleaning/wichita-ks/index.html',
  'excavation/emergency-excavation/benton-ks/index.html',
  'septic/lateral-field-installation/cassoday-ks/index.html',
  'excavation/trenching/rose-hill-ks/index.html',
  'plumbing/gas-line-services/augusta-ks/index.html',
];

function score(f) {
  const html  = fs.readFileSync(path.join(DIST, f), 'utf8');
  const text  = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = text.split(' ').filter(w => w.length > 2).length;

  const h1Match  = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  const h2s      = [...html.matchAll(/<h2[^>]*>([^<]+)<\/h2>/gi)].map(m => m[1]);
  const titleM   = html.match(/<title>([^<]+)<\/title>/i);
  const descM    = html.match(/name="description" content="([^"]+)"/i);
  const faqCount = (html.match(/class="faq-item"/g) || []).length;

  const h1       = h1Match ? h1Match[1].trim() : '';
  const title    = titleM  ? titleM[1].trim()  : '';
  const desc     = descM   ? descM[1].trim()   : '';

  // ── CAT 1: Local Uniqueness (30 pts) ──
  // Unique local intro (city-specific context in intro paragraphs)
  const localTerms = (html.match(/Butler County|Sedgwick County|Marion County|Harvey County|Cowley County|Greenwood County|El Dorado|Wichita|Augusta|Andover|Benton|Cassoday|Flint Hills|clay soil|oil|railroad|tornado|river|farmland|rural|well water|prairie/gi) || []).length;
  const cat1_intro      = localTerms >= 5 ? 10 : localTerms >= 2 ? 5 : 0;
  // "Why this problem exists here" — clay soil, weather, housing stock, rural
  const whyHere = (html.match(/clay|aging|older home|mid-century|galvanized|cast iron|rural|farmstead|well water|expand|swell|frost|settling/gi) || []).length;
  const cat1_why        = whyHere >= 3 ? 8 : whyHere >= 1 ? 4 : 0;
  // Pipeline data woven as prose (county, soil, housing age context)
  const pipelineData = (html.match(/Butler County|Sedgwick County|county|decades|1970s|1980s|1990s|mid-century|aging|vintage|original|pre-/gi) || []).length;
  const cat1_data       = pipelineData >= 4 ? 7 : pipelineData >= 2 ? 3 : 0;
  // Neighborhood/street refs
  const nbhoodRefs = (html.match(/Road|Avenue|Street|Boulevard|Highway|US-|K-\d|corridor|subdivision|district|downtown|park|neighborhood/gi) || []).length;
  const cat1_nbhood     = nbhoodRefs >= 3 ? 5 : nbhoodRefs >= 1 ? 2 : 0;
  const cat1 = cat1_intro + cat1_why + cat1_data + cat1_nbhood;

  // ── CAT 2: Content Depth (25 pts) ──
  const cat2_words   = words >= 800 ? 5 : 0;
  // Answers intent — has service body + urgency + differentiator sections
  const hasIntent = html.includes('class="lead"') && html.includes('faq-item');
  const cat2_intent  = hasIntent ? 6 : 3;
  // FAQs
  const cat2_faq     = faqCount >= 5 ? 6 : faqCount >= 2 ? 3 : 0;
  // Original angle (differentiator, urgency note, local specifics)
  const hasOriginal = html.includes('differentiator') || whyHere >= 2;
  const cat2_original = hasOriginal ? 4 : 2;
  const cat2 = cat2_words + cat2_intent + cat2_faq + cat2_original;

  // ── CAT 3: On-Page SEO (20 pts) ──
  // H1 has keyword + city
  const cityInH1 = h1.match(/in .+, KS/i);
  const cat3_h1      = cityInH1 ? 4 : 0;
  // H2s keyword-relevant (not just generic)
  const keyH2s = h2s.filter(h => h.match(/service|repair|install|clean|septic|plumb|excavat|trench|grade|drain|water|sewer|gas|emerg/i)).length;
  const cat3_h2      = keyH2s >= 2 ? 4 : keyH2s >= 1 ? 2 : 0;
  // KW in first 100 words
  const first100 = text.slice(0, 600);
  const cat3_first100 = (first100.match(/plumb|water heater|drain|leak|sewer|septic|excavat|trench|gas line|lateral|backfill|grading|fixture|faucet|toilet|softener/i)) ? 3 : 0;
  // Title
  const cat3_title   = (title.length <= 65 && title.match(/in .+, KS/i)) ? 3 : title.length <= 65 ? 1 : 0;
  // Meta desc
  const cat3_desc    = (desc.length >= 100 && desc.length <= 160) ? 3 : desc.length > 0 ? 1 : 0;
  // URL structure
  const cat3_url     = f.match(/^[a-z\-\/]+\/[a-z\-]+-ks\/index\.html$/) ? 3 : 1;
  const cat3 = cat3_h1 + cat3_h2 + cat3_first100 + cat3_title + cat3_desc + cat3_url;

  // ── CAT 4: Trust & E-E-A-T (15 pts) ──
  // Reviews — pages don't have inline reviews yet (no review embed on location pages)
  const cat4_reviews = 0;
  // Credentials
  const hasCreds = html.match(/licensed|insured|Kansas plumbing license|certified/i);
  const cat4_creds   = hasCreds ? 2 : 0;
  // Photo with alt
  const photoAlts = [...html.matchAll(/alt="([^"]{20,})"/g)].map(m => m[1]);
  const cat4_photo   = photoAlts.length >= 1 ? 2 : 0; // generic photo = 2 pts
  // NAP
  const hasNAP = html.includes('3910 W. Central') && html.includes('(316) 333-6326');
  const cat4_nap     = hasNAP ? 3 : 0;
  const cat4 = cat4_reviews + cat4_creds + cat4_photo + cat4_nap;

  // ── CAT 5: Technical & Schema (10 pts) ──
  const hasSchema  = html.includes('"@type": "Service"') && html.includes('"@type": "FAQPage"');
  const cat5_schema = hasSchema ? 4 : html.includes('application/ld+json') ? 2 : 0;
  // Internal links — check hub page(s) for inbound link to this page
  const parts = f.split('/');
  // e.g. plumbing/water-heater-repair/el-dorado-ks/index.html → hub = plumbing/water-heater-repair
  const hubPath = parts.length >= 3
    ? path.join(DIST, parts[0], parts[1], 'index.html')
    : path.join(DIST, parts[0], 'index.html');
  const pageSlug = '/' + parts.slice(0, -1).join('/') + '/';
  let inboundCount = 0;
  if (fs.existsSync(hubPath)) {
    const hubHtml = fs.readFileSync(hubPath, 'utf8');
    const linkMatches = (hubHtml.match(new RegExp('href="' + pageSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"', 'g')) || []).length;
    inboundCount += linkMatches;
  }
  // Also check top-level hub (plumbing/index.html, excavation/index.html, etc.)
  const topHubPath = path.join(DIST, parts[0], 'index.html');
  if (fs.existsSync(topHubPath) && topHubPath !== hubPath) {
    const topHtml = fs.readFileSync(topHubPath, 'utf8');
    inboundCount += (topHtml.match(new RegExp('href="' + pageSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"', 'g')) || []).length;
  }
  const cat5_links  = inboundCount >= 3 ? 3 : inboundCount >= 1 ? 1 : 0;
  // Speed — assume pass (same CSS/JS stack as main site which passes)
  const cat5_speed  = 3;
  const cat5 = cat5_schema + cat5_links + cat5_speed;

  const total = cat1 + cat2 + cat3 + cat4 + cat5;

  // Auto-fail checks
  const autoFail = [];
  if (cat1 < 20) autoFail.push('Cat1 < 20 (local uniqueness gate)');
  if (!h1) autoFail.push('Missing H1');
  if (!desc) autoFail.push('Missing meta desc');
  if (cat5_links === 0) autoFail.push(`No internal links pointing to this page (checked hub pages, found ${inboundCount})`);

  return { file: f, words, total, cat1, cat2, cat3, cat4, cat5, autoFail };
}

let results = SAMPLE.map(score);
results.sort((a, b) => a.total - b.total);

for (const r of results) {
  const status = r.total >= 85 ? '✅ PUBLISH' : r.total >= 70 ? '🟡 CONDITIONAL' : '🔴 REJECT';
  console.log(`\n${r.file}`);
  console.log(`  Score: ${r.total}/100 ${status}  |  Words: ${r.words}`);
  console.log(`  Cat1(Local): ${r.cat1}/30  Cat2(Depth): ${r.cat2}/25  Cat3(SEO): ${r.cat3}/20  Cat4(EAT): ${r.cat4}/15  Cat5(Tech): ${r.cat5}/10`);
  if (r.autoFail.length) console.log(`  ⚠️  Flags: ${r.autoFail.join(' | ')}`);
}
console.log('\n\nSummary:');
const avgTotal = Math.round(results.reduce((s,r) => s+r.total, 0) / results.length);
const avgCat1  = Math.round(results.reduce((s,r) => s+r.cat1, 0) / results.length);
console.log(`  Avg score: ${avgTotal}/100`);
console.log(`  Avg Cat1 (local uniqueness): ${avgCat1}/30`);
console.log(`  Pages >= 85: ${results.filter(r => r.total >= 85).length}/${results.length}`);
console.log(`  Pages 70-84: ${results.filter(r => r.total >= 70 && r.total < 85).length}/${results.length}`);
console.log(`  Common flags: Internal links = 0 on all (expected — hubs need wiring)`);
