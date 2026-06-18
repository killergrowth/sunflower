#!/usr/bin/env node
/** gen-sitemap.js - sunflower */
const path = require('path');
const { generateSitemap } = require('C:\\\\Users\\\\KillerGrowth\\\\.openclaw\\\\workspace\\\\tools\\\\kg-site-builder\\\\lib\\\\gen-sitemap');
const result = generateSitemap({ distDir: path.join(__dirname, 'dist'), siteRoot: __dirname, domain: 'sunflowerplumbing.com' });
console.log('sitemap.xml generated — ' + result.count + ' URLs (sunflowerplumbing.com)');
