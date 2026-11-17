/* Builds assets/brand/social-card.png, the 1200 × 630 image a shared link shows.
   It is drawn from the platform's own parts: the reversed logo, the self-hosted
   typefaces, the platform's statement and its two pathways. Nothing is fetched
   from the network.

   Run from the repository root, with the test dependencies installed
   (cd tests && PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install --no-save playwright):
     node tools/build/build_social_card.mjs                                      */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const require = createRequire(path.join(ROOT, 'tests', 'package.json'));
const { chromium } = require('playwright');

const font = f => 'data:font/woff2;base64,' + fs.readFileSync(path.join(ROOT, 'assets/fonts', f)).toString('base64');
const logo = 'data:image/svg+xml;base64,' + fs.readFileSync(path.join(ROOT, 'assets/brand/logo-reversed.svg')).toString('base64');

const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:"Bodoni Moda";src:url(${font('bodoni-moda-latin-7.woff2')}) format("woff2");font-style:normal;font-weight:400 900}
@font-face{font-family:"Bodoni Moda";src:url(${font('bodoni-moda-latin-3.woff2')}) format("woff2");font-style:italic;font-weight:400 900}
@font-face{font-family:Manrope;src:url(${font('manrope-latin-2.woff2')}) format("woff2");font-weight:200 800}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;overflow:hidden;background:#1A1D22;color:#F4EFE4;font-family:Manrope,sans-serif;position:relative;
 background-image:linear-gradient(rgba(244,239,228,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(244,239,228,.045) 1px,transparent 1px);background-size:60px 60px}
.logo{position:absolute;left:84px;top:66px;width:170px;height:70px;background:url(${logo}) left center/contain no-repeat}
.k{position:absolute;left:84px;top:178px;font-size:15px;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:#D9C28F;display:flex;align-items:center;gap:14px}
.k:before{content:"";width:34px;height:1px;background:#B08A47}
h1{position:absolute;left:84px;top:214px;width:760px;font-family:"Bodoni Moda",serif;font-weight:400;font-size:66px;line-height:1.04;letter-spacing:-.015em;color:#fff}
h1 em{display:block;font-style:italic;color:#D9C28F}
.paths{position:absolute;left:84px;right:84px;bottom:62px;display:grid;grid-template-columns:1fr 1fr;gap:18px}
.p{padding:18px 22px;border-radius:4px;display:flex;align-items:baseline;justify-content:space-between}
.p b{font-family:"Bodoni Moda",serif;font-weight:400;font-size:30px;color:#fff}
.p span{font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#D9C28F}
.ib{background:#5B1826}.up{background:#14301F}
svg{position:absolute;right:84px;top:92px;width:240px;height:170px}
</style>
<div class="logo" role="img" aria-label="Arjun Agrawal"></div>
<svg viewBox="0 0 160 112" aria-hidden="true"><path d="M10 4V104H156" fill="none" stroke="rgba(244,239,228,.38)" stroke-width="1.2"/>
 <path d="M22 12L150 96" stroke="#8FB6DE" stroke-width="2.4" fill="none"/><path d="M22 96L150 12" stroke="#E3A778" stroke-width="2.4" fill="none"/>
 <circle cx="86" cy="54" r="10" fill="none" stroke="rgba(217,194,143,.6)"/><circle cx="86" cy="54" r="4.2" fill="#D9C28F"/></svg>
<div class="k">Arjun Agrawal · Economics</div>
<h1>Economics is not just a subject to study. <em>It is a way to think.</em></h1>
<div class="paths"><div class="p ib"><b>IB DP Economics</b><span>Pathway 01</span></div><div class="p up"><b>UPSC CSE Economics</b><span>Pathway 02</span></div></div>`;

const opts = {};
if (process.env.PW_CHROMIUM) opts.executablePath = process.env.PW_CHROMIUM;
const b = await chromium.launch(opts);
const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await p.setContent(html, { waitUntil: 'load' });
await p.evaluate(() => document.fonts.ready);
const out = path.join(ROOT, 'assets/brand/social-card.png');
await p.screenshot({ path: out, type: 'png' });
await b.close();
console.log('wrote', path.relative(ROOT, out));
