import { readFileSync, writeFileSync } from 'fs';

const path = 'C:\\Users\\KillerGrowth\\.openclaw\\workspace\\sites\\sunflower\\css\\styles.css';
const buf = readFileSync(path);
const start = (buf[0]===0xEF&&buf[1]===0xBB&&buf[2]===0xBF)?3:0;
let css = buf.slice(start).toString('utf8');

// Fix: close the gap between nav item and dropdown
// Replace top: calc(100% + 12px) with top: 100%, add padding-top to create invisible hover bridge
const oldDropdownMenu = `.dropdown-menu {
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
}`;

const newDropdownMenu = `.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding-top: 12px;
  background: transparent;
  min-width: 230px;
  z-index: 200;
}
.dropdown-menu::before {
  content: '';
  display: block;
  position: absolute;
  top: 12px;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--white);
  border: 1px solid var(--divider);
  border-top: 3px solid var(--yellow);
  box-shadow: 0 8px 24px rgba(0,0,0,0.10);
  z-index: -1;
}`;

if (css.includes(oldDropdownMenu)) {
  css = css.replace(oldDropdownMenu, newDropdownMenu);
  console.log('Dropdown menu gap fix applied OK');
} else {
  // Try with CRLF
  const oldCRLF = oldDropdownMenu.replace(/\n/g, '\r\n');
  if (css.includes(oldCRLF)) {
    css = css.replace(oldCRLF, newDropdownMenu);
    console.log('Dropdown menu gap fix applied OK (CRLF)');
  } else {
    console.log('ERROR: could not find dropdown-menu block');
    process.exit(1);
  }
}

writeFileSync(path, css, 'utf8');
console.log('styles.css written OK');
