import { readFileSync, writeFileSync } from 'fs';

const path = 'C:\\Users\\KillerGrowth\\.openclaw\\workspace\\sites\\sunflower\\css\\styles.css';
const buf = readFileSync(path);
const start = (buf[0]===0xEF&&buf[1]===0xBB&&buf[2]===0xBF)?3:0;
let css = buf.slice(start).toString('utf8');

const anchors = [
  '.main-nav a:hover,\r\n.main-nav a.active { color: var(--yellow); }',
  '.main-nav a:hover,\n.main-nav a.active { color: var(--yellow); }'
];

const dropdownCSS = `

/* =============== NAV DROPDOWNS =============== */
.nav-dropdown {
  position: relative;
}
.nav-dropdown .nav-parent {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}
.nav-chevron {
  font-size: 10px;
  transition: transform 0.2s;
}
.nav-dropdown:hover .nav-chevron {
  transform: rotate(180deg);
}
.dropdown-menu {
  display: none;
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--white);
  border: 1px solid var(--divider);
  border-top: 3px solid var(--yellow);
  min-width: 230px;
  z-index: 200;
  box-shadow: 0 8px 24px rgba(0,0,0,0.10);
}
.nav-dropdown:hover .dropdown-menu {
  display: block;
}
.dropdown-menu a {
  display: block;
  padding: 11px 18px;
  color: var(--black);
  font-size: 13px;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0;
  border-bottom: 1px solid var(--divider);
  transition: background 0.15s, color 0.15s;
}
.dropdown-menu a:last-child {
  border-bottom: none;
}
.dropdown-menu a:hover {
  background: var(--yellow);
  color: var(--white);
}

/* =============== MOBILE DROPDOWNS =============== */
.mobile-dropdown-toggle {
  width: 100%;
  background: none;
  border: none;
  border-bottom: 1px solid rgba(255,255,255,0.15);
  color: inherit;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 16px 20px;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.mobile-dropdown-toggle .fa-chevron-down {
  font-size: 11px;
  transition: transform 0.2s;
}
.mobile-dropdown-toggle[aria-expanded="true"] .fa-chevron-down {
  transform: rotate(180deg);
}
.mobile-dropdown-menu {
  display: none;
  background: rgba(0,0,0,0.15);
}
.mobile-dropdown-menu.open {
  display: block;
}
.mobile-dropdown-menu a {
  padding: 12px 28px;
  font-size: 13px;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}`;

let found = false;
for (const anchor of anchors) {
  if (css.includes(anchor)) {
    css = css.replace(anchor, anchor + dropdownCSS);
    found = true;
    console.log('Anchor found and replaced');
    break;
  }
}

if (!found) {
  console.log('ERROR: anchor not found');
  process.exit(1);
}

writeFileSync(path, css, 'utf8');
console.log('styles.css updated OK');
