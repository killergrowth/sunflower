import { readFileSync, writeFileSync } from 'fs';

const path = 'C:\\Users\\KillerGrowth\\.openclaw\\workspace\\sites\\sunflower\\_partials\\header.html';
const buf = readFileSync(path);
const start = (buf[0]===0xEF&&buf[1]===0xBB&&buf[2]===0xBF)?3:0;
const original = buf.slice(start).toString('utf8');

// Desktop nav — match the remote version exactly
const oldDesktopNav = `<nav class="main-nav" id="main-nav">\r\n      <a href="/plumbing/">Plumbing</a>\r\n      <a href="/septic/">Septic</a>\r\n      <a href="/excavation/">Excavation</a>\r\n      <a href="/areas-served/">Areas Served</a>\r\n      <a href="/financing/">Financing</a>\r\n      <a href="/blog/">Blog</a>\r\n      <a href="/about-us/">About</a>\r\n      <a href="/contact-us/">Contact</a>\r\n    </nav>`;

const newDesktopNav = `<nav class="main-nav" id="main-nav">
      <div class="nav-dropdown">
        <a href="/plumbing/" class="nav-parent">Plumbing <i class="fas fa-chevron-down nav-chevron"></i></a>
        <div class="dropdown-menu">
          <a href="/plumbing/drain-cleaning/">Drain Cleaning</a>
          <a href="/plumbing/fixture-replacement/">Fixture Replacement</a>
          <a href="/plumbing/gas-line-services/">Gas Line Services</a>
          <a href="/plumbing/kitchen-bathroom-plumbing/">Kitchen &amp; Bathroom Plumbing</a>
          <a href="/plumbing/leak-detection/">Leak Detection</a>
          <a href="/plumbing/sewer-line-repair/">Sewer Line Repair</a>
          <a href="/plumbing/toilet-faucet-repair/">Toilet &amp; Faucet Repair</a>
          <a href="/plumbing/water-heater-repair/">Water Heater Repair</a>
          <a href="/plumbing/water-softener-installation/">Water Softener Installation</a>
        </div>
      </div>
      <div class="nav-dropdown">
        <a href="/septic/" class="nav-parent">Septic <i class="fas fa-chevron-down nav-chevron"></i></a>
        <div class="dropdown-menu">
          <a href="/septic/lateral-field-installation/">Lateral Field Installation</a>
        </div>
      </div>
      <div class="nav-dropdown">
        <a href="/excavation/" class="nav-parent">Excavation <i class="fas fa-chevron-down nav-chevron"></i></a>
        <div class="dropdown-menu">
          <a href="/excavation/backfill-grading/">Backfill &amp; Grading</a>
          <a href="/excavation/emergency-excavation/">Emergency Excavation</a>
          <a href="/excavation/septic-system-excavation/">Septic System Excavation</a>
          <a href="/excavation/sewer-water-line-excavation/">Sewer &amp; Water Line Excavation</a>
          <a href="/excavation/site-preparation/">Site Preparation</a>
          <a href="/excavation/trenching/">Trenching</a>
        </div>
      </div>
      <a href="/areas-served/">Areas Served</a>
      <a href="/financing/">Financing</a>
      <a href="/blog/">Blog</a>
      <a href="/about-us/">About</a>
      <a href="/contact-us/">Contact</a>
    </nav>`;

// Mobile nav
const oldMobileNav = `  <!-- Mobile nav drawer -->\r\n  <div class="mobile-nav" id="mobile-nav">\r\n    <a href="/plumbing/">Plumbing</a>\r\n    <a href="/septic/">Septic</a>\r\n    <a href="/excavation/">Excavation</a>\r\n    <a href="/areas-served/">Areas Served</a>\r\n    <a href="/financing/">Financing</a>\r\n    <a href="/blog/">Blog</a>\r\n    <a href="/about-us/">About</a>\r\n    <a href="/contact-us/">Contact</a>\r\n    <a href="tel:+13163336326" class="mobile-cta"><i class="fas fa-phone"></i> (316) 333-6326</a>\r\n  </div>`;

const newMobileNav = `  <!-- Mobile nav drawer -->
  <div class="mobile-nav" id="mobile-nav">
    <div class="mobile-dropdown">
      <button class="mobile-dropdown-toggle" aria-expanded="false">Plumbing <i class="fas fa-chevron-down"></i></button>
      <div class="mobile-dropdown-menu">
        <a href="/plumbing/">All Plumbing Services</a>
        <a href="/plumbing/drain-cleaning/">Drain Cleaning</a>
        <a href="/plumbing/fixture-replacement/">Fixture Replacement</a>
        <a href="/plumbing/gas-line-services/">Gas Line Services</a>
        <a href="/plumbing/kitchen-bathroom-plumbing/">Kitchen &amp; Bathroom Plumbing</a>
        <a href="/plumbing/leak-detection/">Leak Detection</a>
        <a href="/plumbing/sewer-line-repair/">Sewer Line Repair</a>
        <a href="/plumbing/toilet-faucet-repair/">Toilet &amp; Faucet Repair</a>
        <a href="/plumbing/water-heater-repair/">Water Heater Repair</a>
        <a href="/plumbing/water-softener-installation/">Water Softener Installation</a>
      </div>
    </div>
    <div class="mobile-dropdown">
      <button class="mobile-dropdown-toggle" aria-expanded="false">Septic <i class="fas fa-chevron-down"></i></button>
      <div class="mobile-dropdown-menu">
        <a href="/septic/">All Septic Services</a>
        <a href="/septic/lateral-field-installation/">Lateral Field Installation</a>
      </div>
    </div>
    <div class="mobile-dropdown">
      <button class="mobile-dropdown-toggle" aria-expanded="false">Excavation <i class="fas fa-chevron-down"></i></button>
      <div class="mobile-dropdown-menu">
        <a href="/excavation/">All Excavation Services</a>
        <a href="/excavation/backfill-grading/">Backfill &amp; Grading</a>
        <a href="/excavation/emergency-excavation/">Emergency Excavation</a>
        <a href="/excavation/septic-system-excavation/">Septic System Excavation</a>
        <a href="/excavation/sewer-water-line-excavation/">Sewer &amp; Water Line Excavation</a>
        <a href="/excavation/site-preparation/">Site Preparation</a>
        <a href="/excavation/trenching/">Trenching</a>
      </div>
    </div>
    <a href="/areas-served/">Areas Served</a>
    <a href="/financing/">Financing</a>
    <a href="/blog/">Blog</a>
    <a href="/about-us/">About</a>
    <a href="/contact-us/">Contact</a>
    <a href="tel:+13163336326" class="mobile-cta"><i class="fas fa-phone"></i> (316) 333-6326</a>
  </div>`;

let updated = original;

if (updated.includes(oldDesktopNav)) {
  updated = updated.replace(oldDesktopNav, newDesktopNav);
  console.log('Desktop nav replaced OK');
} else {
  // Try LF only version
  const oldDesktopNavLF = oldDesktopNav.replace(/\r\n/g, '\n');
  if (updated.includes(oldDesktopNavLF)) {
    updated = updated.replace(oldDesktopNavLF, newDesktopNav);
    console.log('Desktop nav replaced OK (LF)');
  } else {
    console.log('ERROR: desktop nav string not found');
    // Debug — show what we have
    const idx = updated.indexOf('<nav class="main-nav"');
    console.log('Nav section found at:', idx);
    if (idx > -1) console.log('Raw nav content:', JSON.stringify(updated.substring(idx, idx+400)));
    process.exit(1);
  }
}

if (updated.includes(oldMobileNav)) {
  updated = updated.replace(oldMobileNav, newMobileNav);
  console.log('Mobile nav replaced OK');
} else {
  const oldMobileNavLF = oldMobileNav.replace(/\r\n/g, '\n');
  if (updated.includes(oldMobileNavLF)) {
    updated = updated.replace(oldMobileNavLF, newMobileNav);
    console.log('Mobile nav replaced OK (LF)');
  } else {
    console.log('ERROR: mobile nav string not found');
    const idx = updated.indexOf('<!-- Mobile nav drawer -->');
    if (idx > -1) console.log('Raw mobile nav:', JSON.stringify(updated.substring(idx, idx+400)));
    process.exit(1);
  }
}

writeFileSync(path, updated, 'utf8');
console.log('header.html written successfully');
