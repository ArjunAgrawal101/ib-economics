/* THE INDIAN ECONOMY · the book, its preview and the Digital Revision Companion, driven the way a
   reader drives them: the header and the Resources menu, the book page, the look-inside preview and
   its reading view (zoom, keyboard, Escape, focus), the home page's feature, the companion page,
   the purchase enquiry, search, phone and desktop widths, axe, and the guarantees that matter most
   for a commercial book: no PDF is requested, linked or stored, and only the chosen pages exist. */
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { serve, browser, open, check, done, ROOT } from './lib.mjs';
const { srv, base } = await serve();
const b = await browser();
const axeSrc = (() => { try { return fs.readFileSync(path.join(ROOT, 'tests/node_modules/axe-core/axe.min.js'), 'utf8'); } catch (e) { return null; } })();

/* ── 1 · the repository holds images of the chosen pages only, never the book ── */
{
  const dir = path.join(ROOT, 'assets/book');
  const files = [];
  const walk = d => fs.readdirSync(d, { withFileTypes: true }).forEach(e => e.isDirectory() ? walk(path.join(d, e.name)) : files.push(path.join(d, e.name)));
  walk(dir);
  const bytes = files.reduce((a, f) => a + fs.statSync(f).size, 0);
  check(files.length > 0 && files.every(f => /\.webp$/.test(f)), `assets/book holds only WebP images (${files.length} files)`, files.filter(f => !/\.webp$/.test(f)).join(', '));
  check(bytes <= 6 * 1048576, `the book's preview images weigh ${(bytes / 1048576).toFixed(2)} MB, inside the 6 MB budget`);
  const tracked = execSync('git ls-files', { cwd: ROOT, encoding: 'utf8' }).split('\n').filter(Boolean);
  const pdfs = tracked.filter(f => /\.(pdf|docx?|epub)$/i.test(f) && !/^assets\/carousels\/economics-in-60-seconds-\d{3}\.pdf$/.test(f));
  check(pdfs.length === 0, 'no book, companion or handbook file is tracked in the repository (only the ten public carousel PDFs)', pdfs.join(', '));
  const sel = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/book/preview-pages.json'), 'utf8'));
  const want = new Set(['cover.webp', 'cover-sm.webp', ...sel.book.pages.flatMap(p => [`page-${p.p}.webp`, `page-${p.p}-sm.webp`])]);
  const have = fs.readdirSync(path.join(dir, 'the-indian-economy'));
  check(have.length === want.size && have.every(f => want.has(f)), `exactly the chosen pages are published: the cover and ${sel.book.pages.length} pages, each with a thumbnail`, have.filter(f => !want.has(f)).join(', '));
  check(!fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8').match(/The_Indian_Economy[^"']*\.pdf|Revision_Companion[^"']*\.pdf/i), 'index.html names no PDF of the book or the companion');
}

/* ── 2 · the header, the Resources menu and the book page ─────────────── */
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const { p, errors } = await open(ctx, base);
  const pdfReq = []; const bad = [];
  p.on('request', r => { if (/\.pdf(\?|$)/i.test(r.url())) pdfReq.push(r.url()); });
  p.on('response', r => { if (/assets\/book\//.test(r.url()) && r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });
  await p.locator('#gnav a.gn-book').click(); await p.waitForTimeout(400);
  check(await p.evaluate(() => VIEW === 'book' && TAB === 0 && location.hash === '#/book'), 'The Indian Economy in the header opens #/book');
  check(/^The Indian Economy$/.test((await p.locator('#view h1').innerText()).trim()), 'the book page has one h1: the title');
  const cover = await p.evaluate(() => { const i = document.querySelector('.bk-hero .bk3d-f'); return i && { w: i.naturalWidth, ok: i.complete, alt: i.alt }; });
  check(cover && cover.ok && cover.w >= 300 && /front cover/.test(cover.alt), 'the cover is the book\'s own, loaded and described', JSON.stringify(cover));
  const t = await p.locator('#view').innerText();
  check(/641 numbered pages/.test(t) && /PDF edition has 706 pages/.test(t), 'numbered pages (641) and PDF pages (706) are stated separately');
  check(/UPSC CSE/.test(t) && /STATE PCS/i.test(t) && /RBI GRADE B \(GENERAL\)/i.test(t) && /UNDERGRADUATE/i.test(t) && /POSTGRADUATE/i.test(t), 'the five readers are labelled');
  check(await p.locator('.bk-map-sec .bk-part').count() === 8, 'the contents map shows the eight Parts');
  check(/To be confirmed by the publisher/.test(t) && /To be assigned at publication/.test(t) && !/₹/.test(t), 'price, publisher and ISBN are not invented, and no price is shown');

  /* look inside: previous and next, thumbnails, the printed page number */
  const read = () => p.evaluate(() => ({ cap: document.querySelector('#bk-lk-cap b').textContent, src: document.getElementById('bk-lk-img').currentSrc || document.getElementById('bk-lk-img').src, pos: document.getElementById('bk-lk-pos').textContent }));
  await p.locator('#bk-look-h').scrollIntoViewIfNeeded();
  const r0 = await read();
  await p.locator('.bk-lk-nav.next').click(); await p.waitForTimeout(250);
  const r1 = await read();
  check(r0.cap === 'Page xxi' && r1.cap === 'Page xxii' && r0.src !== r1.src && r1.pos === '3 of 11', 'Next turns to the next chosen page, with its printed number (xxi, then xxii)', JSON.stringify([r0, r1]));
  await p.locator('.bk-lk-strip li').nth(8).locator('button').click(); await p.waitForTimeout(250);
  const r2 = await read();
  check(r2.cap === 'Page 40' && await p.locator('.bk-lk-strip button[aria-current="page"]').count() === 1, 'a thumbnail opens its page and is marked as current', JSON.stringify(r2));
  await p.locator('.bk-lk-nav.prev').click(); await p.waitForTimeout(250);
  check((await read()).cap === 'Page 39', 'Previous turns back');
  const big = await p.evaluate(() => new Promise(res => { const i = new Image(); i.onload = () => res(i.naturalWidth); i.onerror = () => res(0); i.src = BOOK_PV.book.pv[0].src; }));
  check(big >= 1600, `each page is published at a width that can be read (${big} px), with no watermark or overlay`);
  check(await p.evaluate(() => !document.querySelector('.bk-lk-fig .watermark, .bk-lk-fig [class*="overlay"]')), 'nothing is drawn over the page');

  /* the reading view: zoom, keyboard, Escape, focus back where it was */
  await p.locator('.bk-lk-tools .fx-btn').first().focus();
  await p.keyboard.press('Enter'); await p.waitForTimeout(600);
  const v = await p.evaluate(() => { const d = document.getElementById('hl-viewer'); return { open: !!(d && d.open), z: d && d.querySelector('#hl-vw-zv').textContent, k: d && d.querySelector('#hl-vw-k').textContent, pos: d && d.querySelector('#hl-vw-pos').textContent, buy: d && d.querySelector('#hl-vw-buy').textContent }; });
  check(v.open && v.z === '125%' && /First Edition \| 2026-27 · Look inside/.test(v.k), 'Zoom in to read opens the reading view already magnified', JSON.stringify(v));
  check(/Page 39 of 641 numbered pages/.test(v.pos) && /Enquire about purchasing/.test(v.buy) && !/₹/.test(v.buy), 'the reading view names the printed page and invites an enquiry, never a price', JSON.stringify(v));
  await p.keyboard.press('ArrowRight'); await p.waitForTimeout(400);
  check(/Page 40 of 641/.test(await p.locator('#hl-vw-pos').innerText()), 'the arrow keys turn the pages in the reading view');
  await p.keyboard.press('+'); await p.waitForTimeout(250);
  check(await p.locator('#hl-vw-zv').innerText() !== 'Fit', 'plus zooms in');
  await p.keyboard.press('Escape'); await p.waitForTimeout(400);
  const after = await p.evaluate(() => ({ open: !!(document.getElementById('hl-viewer') || {}).open, f: document.activeElement && document.activeElement.textContent }));
  check(!after.open && /Zoom in to read/.test(after.f || ''), 'Escape closes the reading view and returns focus to the control that opened it', JSON.stringify(after));

  /* the companion and the purchase enquiry */
  const comp = await p.evaluate(() => { const a = document.querySelector('.bk-comp a[href="https://q.me-qr.com/48usv7rt"]'); return a && { t: a.target, rel: a.rel, txt: a.textContent }; });
  check(comp && comp.t === '_blank' && comp.rel === 'noopener noreferrer' && /opens in a new tab/.test(comp.txt), 'the companion opens the free resource library printed in the book, in a new tab', JSON.stringify(comp));
  const enq = await p.evaluate(() => [...document.querySelectorAll('.bk-enq-a a')].map(a => a.getAttribute('href')));
  check(enq.some(h => /^mailto:arjun1agr@gmail\.com\?subject=The%20Indian%20Economy/.test(h)) && enq.some(h => /^https:\/\/wa\.me\/917092844945\?text=Hello%20Arjun%2C%20I%20am%20interested%20in%20purchasing%20The%20Indian%20Economy/.test(h)) && enq.some(h => h === 'tel:+917092844945'),
    'Enquire by email, WhatsApp and the phone use only the published address and number, with the message written', JSON.stringify(enq));
  check(pdfReq.length === 0 && bad.length === 0, 'no PDF was requested and every book image loaded', JSON.stringify({ pdfReq, bad }));
  check(errors.length === 0, 'no page errors on the book page', errors.join(' | '));

  /* the Resources menu */
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.locator('#gnav button.gn-res').click(); await p.waitForTimeout(300);
  const menu = await p.evaluate(() => { const m = document.getElementById('fxpanel'); return { open: !m.hidden, hrefs: [...m.querySelectorAll('a')].map(a => a.getAttribute('href')), exp: document.querySelector('#gnav button.gn-res').getAttribute('aria-expanded') }; });
  check(menu.open && menu.exp === 'true' && menu.hrefs.includes('#/book') && menu.hrefs.includes('#/book/digital-revision-companion') && menu.hrefs.some(h => /handbook-library/.test(h)), 'Resources opens a menu with the book, the companion and the handbooks', JSON.stringify(menu));
  await p.keyboard.press('Escape'); await p.waitForTimeout(200);
  check(await p.evaluate(() => document.getElementById('fxpanel').hidden && document.activeElement && document.activeElement.classList.contains('gn-res')), 'Escape closes the menu and returns focus to Resources');

  /* search */
  await p.evaluate(() => cpOpen()); await p.waitForTimeout(300);
  await p.keyboard.type('digital revision companion'); await p.waitForTimeout(500);
  const hit = await p.evaluate(() => [...document.querySelectorAll('#cpres .cprow')].slice(0, 6).map(r => r.textContent).join(' | '));
  check(/Digital Revision Companion/.test(hit), 'search finds the companion', hit.slice(0, 200));
  await p.keyboard.press('Escape');
  await ctx.close();
}

/* ── 3 · the home page's feature leads into the book ──────────────────── */
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const { p, errors } = await open(ctx, base);
  const order = await p.evaluate(() => ['pc-up-h', 'bk-h', 'dc-h', 'th-h'].map(id => { const e = document.getElementById(id); return e ? Math.round(e.getBoundingClientRect().top + scrollY) : -1; }));
  check(order.every((y, i) => y > 0 && (i === 0 || y > order[i - 1])), 'the book follows the two pathways on the home page, then the companion', JSON.stringify(order));
  await p.locator('.bk-thumbs li').nth(2).locator('button').click(); await p.waitForTimeout(600);
  check(/Page 39 of 641/.test(await p.locator('#hl-vw-pos').innerText()), 'a page on the home page opens the reading view at that page');
  await p.keyboard.press('Escape'); await p.waitForTimeout(300);
  await p.locator('.bk-home a.fx-btn.primary').click(); await p.waitForTimeout(400);
  check(await p.evaluate(() => VIEW === 'book'), 'Explore the book opens the book page');
  await p.evaluate(() => nav('book', 1)); await p.waitForTimeout(400);
  check(await p.evaluate(() => location.hash === '#/book/digital-revision-companion') && /Digital Revision Companion/.test(await p.locator('#view h1').innerText()), 'the companion has its own page and address');
  const ct = await p.locator('#view').innerText();
  check(['Integrated mindmaps', 'One-page rapid revision', 'Master comparison tables', 'Formula sheets', 'High-yield Prelims facts', 'Common Prelims traps', 'Glossaries', 'PYQ linkage', 'Original practice MCQs', 'Mains answer frameworks', 'Model answers', 'Diagrams for Mains answers', 'Current developments trackers', 'University Study Extensions'].every(x => ct.includes(x))
    && /13/.test(ct) && /254/.test(ct) && /without a login/.test(ct), 'the companion page lists its fourteen kinds of material, its 13 units and 254 pages, and says it is free without a login');
  check(errors.length === 0, 'no page errors on the home page and the companion page', errors.join(' | '));
  await ctx.close();
}

/* ── 4 · phones and tablets: nothing scrolls sideways, the preview still works ── */
for (const [w, h] of [[320, 640], [390, 844], [768, 1024]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, hasTouch: w < 768 });
  const { p, errors } = await open(ctx, base + '#/book');
  await p.waitForTimeout(400);
  const g = await p.evaluate(() => ({ dw: document.documentElement.scrollWidth, vw: innerWidth, img: document.getElementById('bk-lk-img').getBoundingClientRect().width,
    nav: [...document.querySelectorAll('.bk-lk-nav')].map(b => Math.round(b.getBoundingClientRect().width)) }));
  check(g.dw <= g.vw && g.img > w * 0.5 && g.nav.every(x => x >= 40), `${w}px · the book page fits, the page is shown large and the turn buttons are at least 40 px`, JSON.stringify(g));
  await p.locator('.bk-lk-nav.next').click(); await p.waitForTimeout(250);
  await p.locator('.bk-lk-open').click(); await p.waitForTimeout(600);
  check(await p.evaluate(() => !!document.getElementById('hl-viewer').open), `${w}px · the reading view opens`);
  await p.keyboard.press('Escape'); await p.waitForTimeout(300);
  await p.evaluate(() => nav('home')); await p.waitForTimeout(400);
  check(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${w}px · the home page, with the new hero and the book, does not scroll sideways`);
  check(errors.length === 0, `${w}px · no page errors`, errors.join(' | '));
  await ctx.close();
}

/* ── 5 · axe on the book, the companion and the open reading view ─────── */
if (axeSrc) {
  for (const w of [1440, 390]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
    const { p } = await open(ctx, base + '#/book');
    await p.waitForTimeout(1200);   /* the page's own entrance (a short fade) settles before contrast is measured */
    await p.addScriptTag({ content: axeSrc });
    const run = sel => p.evaluate(async s => (await axe.run(document.querySelector(s), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations.map(x => x.id + ':' + x.nodes.length + ' ' + x.nodes.slice(0, 2).map(n => n.target.join(' ')).join(', ')), sel);
    const v1 = await run('#view');
    await p.evaluate(() => nav('book', 1)); await p.waitForTimeout(1200);
    const v2 = await run('#view');
    await p.evaluate(() => nav('book', 0)); await p.waitForTimeout(400);
    await p.evaluate(() => bkOpen('book', 3)); await p.waitForTimeout(600);
    const v3 = await run('#hl-viewer');
    const viol = [...v1, ...v2, ...v3];
    check(!viol.length, `${w}px · axe finds no WCAG A/AA violation on the book page, the companion page or the open reading view`, viol.join(' | '));
    await ctx.close();
  }
  {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    const { p } = await open(ctx, base);
    await p.waitForTimeout(1200);
    await p.addScriptTag({ content: axeSrc });
    const viol = await p.evaluate(async () => (await axe.run(document.querySelector('#view'), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations.map(x => x.id + ':' + x.nodes.length + ' ' + x.nodes.slice(0, 2).map(n => n.target.join(' ')).join(', ')));
    check(!viol.length, 'axe finds no WCAG A/AA violation on the home page, with its new hero, book and companion', viol.join(' | '));
    await ctx.close();
  }
} else check(false, 'axe-core is installed in tests/node_modules (needed for the accessibility checks)');

/* ── 6 · reduced motion: the book stands still and the hero's chart does not move ── */
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const { p } = await open(ctx, base);
  const a = await p.evaluate(() => [...document.querySelectorAll('.hm-adg, .hm-e')].map(e => getComputedStyle(e).animationName));
  const tr = await p.evaluate(() => getComputedStyle(document.querySelector('.bk3d-b')).transitionDuration);
  check(a.length === 2 && a.every(x => x === 'none') && parseFloat(tr) < 0.01, 'with reduced motion the hero\'s AD-AS chart is still and the book does not turn', JSON.stringify({ a, tr }));
  await ctx.close();
}
await b.close(); srv.close(); done();
