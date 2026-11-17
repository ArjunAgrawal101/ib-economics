/* The Economics Handbook Library: the catalogue (eleven volumes, each with ₹99, its
   page count, topic, Prelims and Mains relevance, a preview and the purchase
   enquiry), its search and filters, the volume pages, the preview viewer (pages,
   keyboard, zoom, full screen, swipe, focus, Escape), enquiry links that carry the
   owner's exact message, no handbook document tracked or served, the service
   worker, axe, widths, and the preview pipeline on synthetic PDFs.
   Addresses are built with routeFormat("upsc", 3, ...), so the suite follows the
   tab's slug whatever the UPSC section calls it. SKIP_PIPELINE=1 skips the
   pipeline run (about a minute). */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { serve, browser, open, check, done, ROOT } from './lib.mjs';

const CAT = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/upsc/handbooks.json'), 'utf8'));
const SEL = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/upsc/preview-pages.json'), 'utf8'));
const V = CAT.volumes;
const CATS = ['Macroeconomic Foundations', 'Money and Banking', 'Inflation', 'Public Finance', 'Fiscal Policy', 'Financial Markets', 'External Sector', 'International Institutions', 'Agriculture', 'Industry and Employment'];
/* the owner's wording, written out here so that a change to it anywhere is caught */
const MSG = v => `Hello, I am interested in purchasing Volume ${v.n}, ${v.title}, of the Arjun Agrawal Economics Handbook Series. Please share the payment and delivery details.`;
const WA = 'https://wa.me/917092844945?text=';
const CTA = 'GET THIS HANDBOOK · ₹99';
const DOC = /\.(pdf|docx?|odt|epub)$/i, CAROUSEL = /^assets\/carousels\/economics-in-60-seconds-\d{3}\.pdf$/;
const git = (...a) => spawnSync('git', a, { cwd: ROOT, encoding: 'utf8' });

/* ── the repository: no handbook file, the selection on disk, the service worker ── */
{
  const tracked = git('ls-files', '-z').stdout.split('\0').filter(Boolean);
  const bad = tracked.filter(f => DOC.test(f) && !CAROUSEL.test(f));
  check(tracked.length > 100 && bad.length === 0, `no PDF other than the carousels, and no Word or e-book file, is tracked (${tracked.filter(f => DOC.test(f)).length} PDFs, all carousels)`, bad.join(', '));
  const ign = f => git('check-ignore', '-q', '--no-index', f).status === 0;
  const refuse = ['Volume_III_Platinum.pdf', 'handbooks/volume-iv.PDF', 'assets/upsc/handbooks/volume-iii/volume-iii.pdf', 'content/upsc/Inflation.docx', 'private/notes.doc', 'tools/upsc/x.epub'];
  check(refuse.every(ign) && !ign('assets/carousels/economics-in-60-seconds-011.pdf'), '.gitignore refuses a handbook PDF, Word or e-book file anywhere, and still admits the carousels', refuse.filter(f => !ign(f)).join(', '));
  const dir = path.join(ROOT, 'assets/upsc/handbooks');
  const files = fs.readdirSync(dir).flatMap(d => fs.readdirSync(path.join(dir, d)).map(f => d + '/' + f));
  const want = new Set(V.flatMap(v => ['cover.webp', 'cover-sm.webp', ...SEL[v.id].flatMap(s => [`page-${String(s.p).padStart(2, '0')}.webp`, `page-${String(s.p).padStart(2, '0')}-sm.webp`])].map(f => v.id + '/' + f)));
  check(files.every(f => want.has(f) && /\.webp$/.test(f)), `the preview folder holds only covers and chosen pages, as WebP (${files.length} files)`, files.filter(f => !want.has(f)).join(', '));
  check(V.every(v => SEL[v.id].every(s => fs.existsSync(path.join(dir, v.id, `page-${String(s.p).padStart(2, '0')}.webp`)))), 'every chosen preview page has its image');
  const mb = files.reduce((a, f) => a + fs.statSync(path.join(dir, f)).size, 0) / 1e6;
  check(mb < 20, `the preview images weigh ${mb.toFixed(2)} MB in all (budget 20 MB)`);
  check(V.every(v => CATS.includes(v.category)) && CATS.every(c => V.some(v => v.category === c)), 'every volume is filed under one of the ten topics, and every topic is used');
  const mod = fs.readFileSync(path.join(ROOT, 'src/modules/41-upsc-data.js'), 'utf8');
  const data = JSON.parse(mod.slice(mod.indexOf('const UPSC_HB=') + 14, mod.lastIndexOf(';')));
  const strip = x => { const { img, pv, samples, ...r } = x; return r; };
  check(JSON.stringify(data.volumes.map(strip)) === JSON.stringify(V) && data.volumes.every(v => v.pv.length === SEL[v.id].length),
    'the data module matches content/upsc/handbooks.json and the selection (rebuild with tools/upsc/build_upsc.py --data-only)');
  const sw = fs.readFileSync(path.join(ROOT, 'service-worker.js'), 'utf8');
  const pre = (sw.match(/const PRECACHE = \[([\s\S]*?)\];/) || [])[1] || '';
  check(pre.length > 0 && !/assets\/upsc|handbooks?\//i.test(pre) && !/upsc|handbook/i.test(sw.replace(/\/\*[\s\S]*?\*\//g, '')), 'the service worker precaches no preview image and names none');
}

const { srv, base } = await serve();
const b = await browser();
const errorsAll = [];
const go = async (p, h) => { await p.evaluate(h => { location.hash = h }, h); await p.waitForTimeout(350) };
const addr = (p, id) => p.evaluate(id => routeFormat('upsc', 3, id || undefined), id);
const visible = p => p.evaluate(() => [...document.querySelectorAll('#hl-list > li')].filter(li => !li.hidden).map(li => li.id.replace('hl-c-', '')));
const vw = p => p.evaluate(() => { const d = document.getElementById('hl-viewer'); const sh = d && d.querySelector('#hl-vw-sheet'); const im = sh && sh.querySelector('img.on');
  return { open: !!(d && (d.open || d.hasAttribute('open'))), i: HLV.i, z: HLV.z, pos: d ? d.querySelector('#hl-vw-pos').textContent : '', cap: d ? d.querySelector('#hl-vw-c').textContent : '',
    src: im ? im.getAttribute('src') : '', w: sh ? sh.getBoundingClientRect().width : 0, h: sh ? sh.getBoundingClientRect().height : 0, inside: !!(d && d.contains(document.activeElement)),
    full: !!(d && (d.contains(document.fullscreenElement) || d.classList.contains('is-imm'))), pressed: d ? d.querySelector('[data-a="full"]').getAttribute('aria-pressed') : '' } });

/* served: nothing that looks like a handbook file answers */
for (const u of ['assets/upsc/handbooks/volume-iii/volume-iii.pdf', 'assets/upsc/handbooks/volume-iii.pdf', 'content/upsc/handbooks.pdf', 'private/Volume_III.pdf', 'assets/upsc/volume-iii.docx']) {
  const r = await fetch(base + u); check(r.status === 404, `${u} is not served`);
}

/* ── desktop: the catalogue ─────────────────────────────────────────────── */
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const { p, errors } = await open(ctx, base);
  await p.evaluate(() => document.fonts.ready);
  const home = await addr(p);
  await go(p, home);
  const st = await p.evaluate(() => ({ v: VIEW, t: TAB, h1: [...document.querySelectorAll('#view h1')].map(h => h.textContent), html: document.getElementById('view').innerHTML }));
  check(st.v === 'upsc' && st.t === 3 && st.h1.length === 1 && st.h1[0] === 'The Economics Handbook Library', `${home} opens the Handbook Library with one heading`, JSON.stringify(st.h1));
  const cards = await p.evaluate(() => [...document.querySelectorAll('#hl-list > li')].map(li => ({ id: li.id.replace('hl-c-', ''), t: li.querySelector('.hl-card-t').textContent, kick: li.querySelector('.hl-kick').textContent,
    text: li.innerText, pages: li.querySelector('.hl-meta dd').textContent, rel: [...li.querySelectorAll('.hl-rel dt')].map(d => d.firstChild.textContent.trim()),
    cta: [...li.querySelectorAll('a.hl-buy')].map(a => ({ t: a.textContent, h: a.href })), mail: [...li.querySelectorAll('a.hl-mail')].map(a => a.getAttribute('href')),
    pv: li.querySelector('button.hl-btn') ? li.querySelector('button.hl-btn').textContent : '', cover: !!li.querySelector('img.hl-cv'), topics: li.querySelectorAll('.hl-topics li').length })));
  check(cards.length === 11 && cards.every((c, i) => c.id === V[i].id && c.t === V[i].title), 'all eleven volumes appear, in order, under their recorded titles');
  check(cards.every((c, i) => c.kick.includes('Volume ' + V[i].n) && c.kick.includes(V[i].category)), 'each card shows its volume number and topic category');
  check(cards.every((c, i) => c.pages === String(V[i].pages)), 'each card shows the page count recorded for its volume', cards.map(c => c.pages).join(','));
  check(cards.every(c => /₹99/.test(c.text) && c.text.includes('Digital soft copy. Individual volume pricing.')), 'each card shows ₹99 with "Digital soft copy. Individual volume pricing."');
  check(cards.every(c => c.rel.join() === 'Prelims,Mains'), 'each card shows its Prelims and its Mains relevance');
  check(cards.every(c => c.cover && c.topics >= 4 && /Preview\s*\d+ pages?/.test(c.pv)), 'each card has its cover, its main topics and a Preview button');
  check(cards.every((c, i) => c.cta.length === 1 && c.cta[0].t === CTA && c.cta[0].h === WA + encodeURIComponent(MSG(V[i]))), `each "${CTA}" opens WhatsApp on +91 7092844945 with the owner's message for that volume`);
  check(cards.every((c, i) => c.mail.length && c.mail.every(m => m.startsWith('mailto:arjun1agr@gmail.com?') && decodeURIComponent(m).includes(MSG(V[i])))), 'each card offers the same enquiry by email to arjun1agr@gmail.com');
  const tel = await p.evaluate(() => [...document.querySelectorAll('#view a[href^="tel:"]')].map(a => [a.getAttribute('href'), a.textContent]));
  check(tel.length >= 1 && tel.every(([h, t]) => h === 'tel:+917092844945' && t === '+91 7092844945'), 'the phone number is on the page, as a call link');
  check(!/\.pdf\b/i.test(st.html) && !/payment (?:is )?(?:successful|complete)|order (?:placed|confirmed)|shipping|courier|hard ?copy/i.test(st.html), 'the page names no PDF file, and claims no payment, order or physical delivery');
  check(/cannot|can be saved or photographed/.test(st.html) && !/\bDRM\b|cannot be copied|copy-protected/i.test(st.html), 'the page says plainly that a browser preview can be copied, and claims no DRM');
  check((await p.locator('.hl-shelf a').count()) === 11, 'the shelf lists the eleven volumes');

  /* filters and search */
  const count = () => p.locator('#hl-count').textContent();
  check(await p.locator('#hl-count[role="status"][aria-live="polite"]').count() === 1 && /All 11 volumes/.test(await count()), 'the result count is announced in a live region');
  await p.locator('.hl-cats label', { hasText: 'Money and Banking' }).click();
  check((await visible(p)).join() === 'volume-ii,volume-vi' && /2 of 11 volumes in Money and Banking/.test(await count()), 'the Money and Banking topic shows Volumes II and VI', await count());
  const topicBad = [];
  for (const c of CATS) {
    await p.locator('.hl-cats label', { hasText: new RegExp('^' + c + '\\s*\\d') }).click();
    const want = V.filter(v => v.category === c).map(v => v.id).join(), got = (await visible(p)).join();
    if (got !== want || !(await count()).includes('in ' + c)) topicBad.push(`${c}: ${got}`);
  }
  check(topicBad.length === 0, 'each of the ten topics shows exactly its volumes', topicBad.join(' | '));
  await p.locator('.hl-cats label', { hasText: 'All topics' }).click();
  for (const [k, l] of [['pre', 'Prelims'], ['mains', 'Mains'], ['both', 'Both']]) {
    await p.locator('.hl-seg label', { hasText: new RegExp('^' + l + '$') }).click();
    const n = (await visible(p)).length;
    const want = V.filter(v => (k !== 'mains' ? v.pre && v.map.some(r => r[1]) : true) && (k !== 'pre' ? v.mains && v.map.some(r => r[2]) : true)).length;
    check(n === want && (n < 11 || /Every volume maps its parts to both the Prelims and the Mains syllabus/.test(await count())), `${l}: ${n} volumes, as their own syllabus maps say, and the count says why none drop out`, await count());
  }
  await p.locator('.hl-seg label', { hasText: /^All$/ }).click();
  await p.locator('#hl-vol').selectOption('volume-vii');
  check((await visible(p)).join() === 'volume-vii' && /1 of 11 volumes \(Volume VII\)/.test(await count()), 'the volume filter shows one volume', await count());
  await p.locator('#hl-vol').selectOption('');
  const norm = s => ' ' + String(s).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, ' ').trim();
  const hay = v => norm([v.title, v.sub, v.desc, v.category, 'volume ' + v.n, 'vol ' + v.num, ...v.parts.map(x => 'part ' + x.l + ' ' + x.t + ' ' + x.d), ...v.concepts, ...v.inst].join(' | '));
  for (const q of ['buffer stocks', 'GST Council', 'Phillips curve', 'repo', 'SEBI', 'labour codes', 'inflation']) {
    await p.locator('#hl-q').fill(q); await p.waitForTimeout(80);
    const want = V.filter(v => norm(q).trim().split(' ').every(t => hay(v).includes(' ' + t))).map(v => v.id).join();
    const got = (await visible(p)).join();
    check(got === want && got.length > 0, `search "${q}" finds ${got.split(',').length} volume(s): ${got.replace(/volume-/g, '').toUpperCase()}`, `want ${want}`);
  }
  await p.locator('#hl-q').fill('buffer stocks'); await p.waitForTimeout(80);
  check(/Found in Part I: Food Security, PDS and Buffer Stocks/.test(await p.locator('#hl-c-volume-x .hl-hit').textContent()), 'a match inside a volume says where it was found');
  await p.locator('#hl-q').fill('zzqx nothing'); await p.waitForTimeout(80);
  check((await visible(p)).length === 0 && await p.locator('#hl-empty').isVisible() && /^No volume matching “zzqx nothing”/.test(await count()), 'a search with no match says so and offers to clear', await count());
  await p.locator('#hl-empty button').click();
  check((await visible(p)).length === 11 && (await p.locator('#hl-q').inputValue()) === '' && /All 11 volumes/.test(await count()), 'Clear search and filters brings back all eleven');

  /* a volume from its card, and by address */
  await p.locator('#hl-c-volume-iii .hl-card-t a').click(); await p.waitForTimeout(400);
  let s = await p.evaluate(() => ({ a: ARG, h1: document.querySelector('#view h1').textContent, hash: location.hash }));
  check(s.a === 'volume-iii' && s.h1 === 'Inflation and Price Stability' && s.hash === await addr(p, 'volume-iii'), 'a card\'s title opens its volume page at its own address', JSON.stringify(s));
  await go(p, await addr(p));
  await p.locator('#hl-c-volume-v .hl-go').click(); await p.waitForTimeout(400);
  check((await p.evaluate(() => ARG)) === 'volume-v', 'Explore Volume V opens Volume V');
  for (const v of [V[0], V[7], V[10]]) {
    await go(p, await addr(p, v.id));
    const r = await p.evaluate(() => ({ h1: [...document.querySelectorAll('#view h1')].map(h => h.textContent), toc: document.querySelectorAll('.hl-toc > li').length, map: document.querySelectorAll('.hl-map tbody tr').length,
      tocp: [...document.querySelectorAll('.hl-toc-p')].map(x => x.textContent.replace(/\D/g, '')), concepts: document.querySelectorAll('.hl-tags:not(.g) li').length, inst: document.querySelectorAll('.hl-tags.g li').length,
      boxes: document.querySelectorAll('.hl-boxes li').length, related: [...document.querySelectorAll('.hl-relv a')].map(a => a.getAttribute('href')), learn: document.querySelectorAll('.hl-ticks li').length,
      pv: document.querySelectorAll('.hl-pvs a').length, title: document.title,
      cta: [...document.querySelectorAll('#view a.hl-buy')].map(a => [a.textContent, a.href]), mail: [...document.querySelectorAll('#view a.hl-mail')].map(a => a.getAttribute('href')) }));
    check(r.h1.length === 1 && r.h1[0] === v.title && r.title.startsWith(`Volume ${v.n}: ${v.title}`), `Volume ${v.n} opens by address with its title as the one heading`);
    check(r.toc === v.parts.length && r.tocp.join() === v.parts.map(x => x.p).join() && r.map === v.map.length && r.learn === v.learn.length, `Volume ${v.n}: contents with page numbers, what you will learn and the syllabus map`);
    check(r.concepts === v.concepts.length && r.inst === v.inst.length && r.boxes === v.boxes.length && r.pv === SEL[v.id].length, `Volume ${v.n}: concepts, institutions, boxes and ${r.pv} preview pages`);
    check(r.related.length >= 2 && r.related.every(h => h.startsWith('#/upsc/') && !h.endsWith(v.id)), `Volume ${v.n}: ${r.related.length} related volumes`);
    check(r.cta.length >= 3 && r.cta.every(([t, h]) => t === CTA && h === WA + encodeURIComponent(MSG(v))) && r.mail.length >= 2 && r.mail.every(m => m.startsWith('mailto:arjun1agr@gmail.com?') && decodeURIComponent(m).includes(MSG(v))),
      `Volume ${v.n}: every purchase link carries its own message, on WhatsApp and by email`);
  }
  await go(p, (await addr(p)) + '/volume-xx');
  check(await p.evaluate(() => document.querySelectorAll('#hl-list > li').length === 11 && /no volume called/i.test(document.querySelector('.hl-notice').textContent)), 'an unknown volume address shows the library with a note');

  /* the viewer */
  const v3 = V[2], pv3 = SEL['volume-iii'];
  await go(p, await addr(p, 'volume-iii'));
  const opener = p.locator('.hl-vbuy button.hl-btn');
  await opener.click(); await p.waitForTimeout(500);
  let w = await vw(p);
  check(w.open && w.inside && w.i === 0 && w.src.endsWith('page-02.webp') && w.pos.includes(`Page ${pv3[0].p} of ${v3.pages}`) && w.cap.includes(pv3[0].cap) && w.cap.includes('Contents'),
    'Preview opens the viewer on the contents page, with its page number and caption, focus inside', JSON.stringify(w));
  check(Math.abs(w.h / w.w - Math.SQRT2) < 0.01, `the page keeps A4 proportions (${Math.round(w.w)} x ${Math.round(w.h)})`);
  const box0 = [w.w, w.h];
  const over = await p.evaluate(() => { const sh = document.getElementById('hl-vw-sheet'); const r = sh.getBoundingClientRect(); const pts = [[.5, .5], [.2, .2], [.8, .8], [.5, .95], [.1, .6]];
    return { kids: [...sh.children].every(c => c.tagName === 'IMG'), hit: pts.every(([x, y]) => { const e = document.elementFromPoint(r.left + r.width * x, r.top + r.height * y); return e && e.tagName === 'IMG' && sh.contains(e) }) } });
  check(over.kids && over.hit, 'nothing is drawn over the page: no watermark, stamp or overlay element');
  check(await p.evaluate(() => Object.keys(HLV.pre).length) >= 1 && await p.evaluate(s => !!HLV.pre[s], SEL['volume-iii'][1] && `assets/upsc/handbooks/volume-iii/page-${String(SEL['volume-iii'][1].p).padStart(2, '0')}.webp`)
    && await p.evaluate(() => document.querySelectorAll('#hl-vw-sheet img').length) === 1, 'only the current page is placed, and the next one is fetched in advance');
  await p.keyboard.press('ArrowRight'); await p.waitForTimeout(450);
  w = await vw(p);
  check(w.i === 1 && w.pos.includes(`Page ${pv3[1].p} of`) && w.cap.includes(pv3[1].cap) && Math.abs(w.w - box0[0]) < 1 && Math.abs(w.h - box0[1]) < 1, 'the right arrow turns to the next page, at the same size', JSON.stringify(w));
  await p.locator('#hl-viewer [data-a="next"]').click(); await p.waitForTimeout(450);
  check((await vw(p)).i === 2, 'the Next button turns the page');
  check(await p.locator('#hl-viewer [data-a="next"]').isDisabled(), 'Next is disabled on the last page');
  await p.locator('#hl-viewer [data-a="prev"]').click(); await p.waitForTimeout(450);
  check((await vw(p)).i === 1, 'the Previous button turns back');
  await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(450);
  check((await vw(p)).i === 0, 'the left arrow turns back');
  await p.keyboard.press('End'); await p.waitForTimeout(450);
  check((await vw(p)).i === pv3.length - 1, 'End goes to the last preview page');
  await p.keyboard.press('Home'); await p.waitForTimeout(450);
  check((await vw(p)).i === 0, 'Home goes to the first');
  await p.locator('#hl-vw-strip button').nth(2).click(); await p.waitForTimeout(450);
  check((await vw(p)).i === 2 && await p.locator('#hl-vw-strip button[aria-current="page"]').getAttribute('data-i') === '2', 'a thumbnail opens its page and is marked current');
  const z0 = (await vw(p)).w;
  await p.locator('#hl-viewer [data-a="in"]').click(); await p.waitForTimeout(150);
  const z1 = await vw(p);
  check(z1.z === 1 && Math.abs(z1.w / z0 - 1.25) < 0.02 && /125%/.test(await p.locator('#hl-vw-zv').textContent()), 'Zoom in enlarges the page by a quarter and shows the level');
  await p.keyboard.press('+'); await p.waitForTimeout(150);
  const z2 = await vw(p);
  check(z2.z === 2 && z2.w > z1.w, 'the + key zooms in further');
  check(await p.evaluate(() => { const s = document.getElementById('hl-vw-stage'); return s.scrollHeight > s.clientHeight && getComputedStyle(s).overflow !== 'hidden' }), 'a zoomed page can be scrolled');
  await p.keyboard.press('-'); await p.waitForTimeout(150);
  check((await vw(p)).z === 1, 'the - key zooms out');
  await p.keyboard.press('0'); await p.waitForTimeout(150);
  check((await vw(p)).z === 0 && Math.abs((await vw(p)).w - z0) < 1, '0 fits the page again');
  check(await p.locator('#hl-viewer [data-a="out"]').isDisabled(), 'Zoom out is disabled when the page fits');
  await p.keyboard.press('f'); await p.waitForTimeout(500);
  w = await vw(p);
  const how = await p.evaluate(() => document.fullscreenElement ? 'the Fullscreen API' : 'the immersive layout, as this browser refused full screen');
  check(w.full && w.pressed === 'true', `F enters full screen (${how})`);
  await p.keyboard.press('f'); await p.waitForTimeout(500);
  w = await vw(p);
  check(!w.full && w.pressed === 'false' && w.open, 'F again leaves full screen and keeps the viewer open');
  const fb = await p.evaluate(async () => { const d = document.getElementById('hl-viewer'), t = d.querySelector('.hl-vw-in'); t.requestFullscreen = undefined; t.webkitRequestFullscreen = undefined;
    hlvFull(); await new Promise(r => setTimeout(r, 100)); const on = d.classList.contains('is-imm') && !document.fullscreenElement && d.querySelector('[data-a="full"]').getAttribute('aria-pressed') === 'true';
    hlvFull(); await new Promise(r => setTimeout(r, 100)); const off = !d.classList.contains('is-imm'); delete t.requestFullscreen; delete t.webkitRequestFullscreen; return on && off && typeof t.requestFullscreen === 'function' });
  check(fb, 'without the Fullscreen API, full screen falls back to an immersive layout and back');
  const trap = [];
  for (let k = 0; k < 16; k++) { await p.keyboard.press(k % 5 === 4 ? 'Shift+Tab' : 'Tab'); trap.push(await p.evaluate(() => document.getElementById('hl-viewer').contains(document.activeElement))); }
  check(trap.every(Boolean), 'Tab and Shift+Tab stay inside the viewer');
  await p.keyboard.press('Escape'); await p.waitForTimeout(300);
  w = await vw(p);
  check(!w.open && await p.evaluate(() => document.activeElement && document.activeElement.matches('.hl-vbuy button.hl-btn')), 'Escape closes the viewer and returns focus to the Preview button');
  check(await p.evaluate(() => !document.documentElement.classList.contains('hl-vw-on')), 'the page scrolls again once the viewer closes');
  await go(p, await addr(p));
  await p.locator('#hl-c-volume-viii button.hl-btn').click(); await p.waitForTimeout(400);
  w = await vw(p);
  check(w.open && w.src.includes('volume-viii/page-02') && await p.evaluate(() => [...document.querySelectorAll('#hl-vw-buy a.hl-buy')].every(a => a.href === 'https://wa.me/917092844945?text=' + encodeURIComponent(fxHandbookMsg(hlVol('volume-viii'))))),
    'a card\'s Preview opens that volume, and the viewer\'s own purchase link names it');
  await p.locator('#hl-viewer [data-a="close"]').click(); await p.waitForTimeout(300);
  check(!(await vw(p)).open && await p.evaluate(() => document.activeElement && document.activeElement.closest('#hl-c-volume-viii') !== null), 'the Close button closes it and returns focus to the card');
  check(await p.evaluate(() => hlOpenViewer('volume-zz', 0) === false), 'hlOpenViewer refuses a volume it does not know');
  await p.evaluate(() => hlOpenViewer('volume-ii', 99)); await p.waitForTimeout(300);
  check((await vw(p)).i === SEL['volume-ii'].length - 1, 'a page index beyond the end opens the last preview page');
  await p.evaluate(() => history.back()); await p.waitForTimeout(400);
  check(!(await vw(p)).open, 'Back closes the viewer');
  errorsAll.push(...errors);
  await ctx.close();
}

/* ── a phone: swipe, layout, reduced motion ─────────────────────────────── */
{
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, reducedMotion: 'reduce' });
  const { p, errors } = await open(ctx, base);
  await go(p, await addr(p, 'volume-x'));
  await p.locator('.hl-vbuy button.hl-btn').click(); await p.waitForTimeout(400);
  const swipe = (x0, x1) => p.evaluate(([x0, x1]) => { const s = document.getElementById('hl-vw-stage'), r = s.getBoundingClientRect(), y = r.top + r.height / 2;
    s.dispatchEvent(new PointerEvent('pointerdown', { pointerType: 'touch', clientX: r.left + x0, clientY: y, bubbles: true, isPrimary: true }));
    s.dispatchEvent(new PointerEvent('pointerup', { pointerType: 'touch', clientX: r.left + x1, clientY: y + 6, bubbles: true, isPrimary: true })) }, [x0, x1]);
  await swipe(300, 80); await p.waitForTimeout(200);
  let w = await vw(p);
  check(w.i === 1, 'swiping left turns to the next page');
  check(await p.evaluate(() => document.querySelectorAll('#hl-vw-sheet img').length === 1 && document.querySelector('#hl-vw-sheet img').className.trim() === 'hl-vw-img on'), 'with reduced motion the page changes at once, without a slide');
  await swipe(80, 300); await p.waitForTimeout(200);
  check((await vw(p)).i === 0, 'swiping right turns back');
  await swipe(200, 180); await p.waitForTimeout(200);
  check((await vw(p)).i === 0, 'a short movement does not turn the page');
  const lay = await p.evaluate(() => { const sh = document.getElementById('hl-vw-sheet').getBoundingClientRect(); const t = document.querySelector('.hl-vw-top').getBoundingClientRect();
    const nav = [...document.querySelectorAll('.hl-vw-nav')].map(n => n.getBoundingClientRect()); return { w: sh.width, inView: sh.left >= 0 && sh.right <= innerWidth, below: sh.top >= t.bottom,
      navClear: nav.every(n => n.top >= sh.bottom - 1 || n.bottom <= sh.top + 1 || n.right <= sh.left || n.left >= sh.right) } });
  check(lay.w > 300 && lay.inView && lay.below && lay.navClear, `on a phone the page fills the width (${Math.round(lay.w)} px) and no control covers it`, JSON.stringify(lay));
  await p.keyboard.press('Escape'); await p.waitForTimeout(250);
  await go(p, await addr(p));
  const order = await p.evaluate(() => { const li = document.querySelector('#hl-c-volume-i'); const y = s => li.querySelector(s).getBoundingClientRect().top; return y('.hl-buybox') < y('.hl-topics') && y('.hl-meta') < y('.hl-card-d') });
  check(order, 'on a phone each card puts the price and the purchase before the long lists');
  errorsAll.push(...errors);
  await ctx.close();
}

/* ── the pipeline's output needs no change of code: thumbnails become srcsets,
   and a volume with one preview page, or none, still works ─────────────── */
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const { p, errors } = await open(ctx, base);
  const reqs = [];
  p.on('request', r => { if (/assets\/upsc\/handbooks\//.test(r.url())) reqs.push(r.url().replace(/^.*assets\/upsc\/handbooks\//, '')) });
  /* the shape build_upsc.py writes after a run: each image with a 400 px "sm" version (the
     existing files stand in for it here, so nothing extra is fetched from the network) */
  await p.evaluate(() => { const v = hlVol('volume-iv'); v.img.cover.sm = { src: v.img.cover.src, w: 400, h: 566 }; v.pv.forEach(x => { x.sm = { src: x.src, w: 400, h: 566 } }) });
  await go(p, await addr(p));
  const card = await p.evaluate(() => { const i = document.querySelector('#hl-c-volume-iv img.hl-cv'); return { ss: i.getAttribute('srcset') || '', sz: i.getAttribute('sizes') || '' } });
  check(/ 400w, .* \d+w$/.test(card.ss) && /\(max-width: 640px\)/.test(card.sz), 'with thumbnails on record, the cover has a srcset and sizes for phone and desktop', JSON.stringify(card));
  await go(p, await addr(p, 'volume-iv'));
  check(await p.evaluate(() => [...document.querySelectorAll('.hl-pvs img')].every(i => /-?\d*\.webp$/.test(i.getAttribute('src')))), 'the look-inside strip shows the thumbnails');
  reqs.length = 0;
  await p.evaluate(() => hlOpenViewer('volume-iv', 0)); await p.waitForTimeout(600);
  const img = await p.evaluate(() => { const i = document.querySelector('#hl-vw-sheet img.on'), sh = document.getElementById('hl-vw-sheet');
    return { ss: i.getAttribute('srcset') || '', sz: i.getAttribute('sizes') || '', w: Math.round(sh.getBoundingClientRect().width), bg: sh.style.backgroundImage } });
  check(/ 400w, .* \d+w$/.test(img.ss) && img.sz === img.w + 'px' && /url\(/.test(img.bg), `in the viewer the page has a srcset sized to the page (${img.sz}) and its thumbnail shows while it loads`, JSON.stringify(img));
  await p.keyboard.press('+'); await p.waitForTimeout(200);
  check(await p.evaluate(() => { const i = document.querySelector('#hl-vw-sheet img.on'); return i.getAttribute('sizes') === Math.round(document.getElementById('hl-vw-sheet').getBoundingClientRect().width) + 'px' }), 'zooming in asks for the larger image');
  await p.keyboard.press('Escape'); await p.waitForTimeout(200);
  /* lazy loading: with thumbnails that are separate files, opening the viewer fetches the page
     shown and the next one, and none of the others until they are needed */
  await p.evaluate(() => { const v = hlVol('volume-viii'); v.pv.forEach(x => { x.sm = { src: v.img.cover.src, w: 400, h: 566 } }) });
  await go(p, await addr(p));
  await p.waitForTimeout(300);
  reqs.length = 0;
  await p.evaluate(() => hlOpenViewer('volume-viii', 0)); await p.waitForTimeout(900);
  const pv8 = SEL['volume-viii'].map(s => `volume-viii/page-${String(s.p).padStart(2, '0')}.webp`);
  const got = [...new Set(reqs)];
  check(got.includes(pv8[0]) && got.includes(pv8[1]) && !got.includes(pv8[2]), `opening the viewer fetches the page shown and the next one only (${got.join(', ')})`);
  await p.keyboard.press('ArrowRight'); await p.waitForTimeout(900);
  check([...new Set(reqs)].includes(pv8[2]), 'turning the page fetches the one after it');
  await p.keyboard.press('Escape'); await p.waitForTimeout(200);
  /* one preview page */
  await p.evaluate(() => { const v = hlVol('volume-vi'); v.pv = v.pv.slice(0, 1) });
  await go(p, await addr(p, 'volume-vi'));
  await p.evaluate(() => hlOpenViewer('volume-vi', 0)); await p.waitForTimeout(400);
  const one = await p.evaluate(() => { const d = document.getElementById('hl-viewer'); return { open: d.open, cls: d.classList.contains('is-one'), prev: d.querySelector('[data-a="prev"]').disabled, next: d.querySelector('[data-a="next"]').disabled, pos: d.querySelector('#hl-vw-pos').textContent } });
  await p.keyboard.press('ArrowRight'); await p.waitForTimeout(200);
  check(one.open && one.cls && one.prev && one.next && /preview 1 of 1/.test(one.pos) && (await vw(p)).i === 0, 'a volume with one preview page opens it, with nowhere to turn', JSON.stringify(one));
  await p.keyboard.press('Escape'); await p.waitForTimeout(200);
  /* none */
  await p.evaluate(() => { const v = hlVol('volume-vii'); v.pv = [] });
  await go(p, await addr(p));
  const none = await p.evaluate(() => ({ btn: !!document.querySelector('#hl-c-volume-vii button.hl-btn'), buy: !!document.querySelector('#hl-c-volume-vii a.hl-buy'), open: hlOpenViewer('volume-vii', 0) }));
  await go(p, await addr(p, 'volume-vii'));
  const nonev = await p.evaluate(() => ({ look: !!document.querySelector('.hl-look-s'), cover: document.querySelector('.hl-vcover .hl-book').tagName, h1: document.querySelector('#view h1').textContent }));
  check(!none.btn && none.buy && none.open === false && !nonev.look && nonev.cover === 'SPAN' && nonev.h1 === V[6].title, 'a volume with no preview pages drops Preview and Look inside, and keeps its page and purchase link', JSON.stringify([none, nonev]));
  errorsAll.push(...errors);
  await ctx.close();
}

/* ── widths: no sideways scroll on the catalogue, a volume or the open viewer ── */
for (const width of [320, 390, 768, 1440]) {
  const ctx = await b.newContext({ viewport: { width, height: width < 700 ? 800 : 900 } });
  const { p, errors } = await open(ctx, base);
  await p.evaluate(() => document.fonts.ready);
  const bad = [];
  for (const id of [null, 'volume-iii', 'volume-xi']) {
    await go(p, await addr(p, id));
    const o = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    if (o > 0) bad.push((id || 'catalogue') + ' +' + o);
    const wide = await p.evaluate(() => [...document.querySelectorAll('#view .hl *')].filter(e => { const r = e.getBoundingClientRect(); return r.width && (r.right > innerWidth + 1 || r.left < -1) && !e.closest('.hl-chips') }).slice(0, 3).map(e => e.className + ' ' + Math.round(e.getBoundingClientRect().right)));
    if (wide.length) bad.push((id || 'catalogue') + ': ' + wide.join(' | '));
  }
  await go(p, await addr(p, 'volume-iii'));
  await p.evaluate(() => hlOpenViewer('volume-iii', 1)); await p.waitForTimeout(400);
  const vo = await p.evaluate(() => { const d = document.getElementById('hl-viewer'); return { o: document.documentElement.scrollWidth - innerWidth, d: d.scrollWidth - d.clientWidth } });
  if (vo.o > 0 || vo.d > 0) bad.push('viewer ' + JSON.stringify(vo));
  check(bad.length === 0, `${width}px: nothing scrolls sideways on the catalogue, two volume pages or the open viewer`, bad.join(', '));
  errorsAll.push(...errors);
  await ctx.close();
}

/* ── accessibility ──────────────────────────────────────────────────────── */
{
  const axe = fs.readFileSync(path.join(ROOT, 'tests/node_modules/axe-core/axe.min.js'), 'utf8');
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const { p, errors } = await open(ctx, base);
  const run = sel => p.evaluate(async s => (await axe.run(document.querySelector(s), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations.map(x => x.id + ':' + x.nodes.length + ' ' + x.nodes.slice(0, 2).map(n => n.target.join(' ')).join(' ; ')), sel);
  for (const width of [1440, 390]) {
    await p.setViewportSize({ width, height: 900 });
    const viol = [];
    for (const id of [null, 'volume-v']) {
      await go(p, await addr(p, id));
      if (!(await p.evaluate(() => typeof axe !== 'undefined'))) await p.addScriptTag({ content: axe });
      const r = await run('#view'); if (r.length) viol.push((id || 'catalogue') + ' ' + r.join(','));
    }
    await p.evaluate(() => hlOpenViewer('volume-v', 1)); await p.waitForTimeout(400);
    const r = await run('#hl-viewer'); if (r.length) viol.push('viewer ' + r.join(','));
    await p.keyboard.press('Escape'); await p.waitForTimeout(200);
    check(!viol.length, `${width}px: axe finds no WCAG A/AA violation on the catalogue, a volume page or the open viewer`, viol.join(' | '));
  }
  errorsAll.push(...errors);
  await ctx.close();
}
check(errorsAll.length === 0, 'no page errors', errorsAll.join(' | '));
await b.close(); srv.close();

/* ── the preview pipeline, end to end, on synthetic PDFs outside the repository ── */
if (process.env.SKIP_PIPELINE) console.log('skip the pipeline run (SKIP_PIPELINE is set)');
else {
  const have = ['python3', 'pdftoppm', 'pdfinfo', 'pdftotext'].every(t => spawnSync('sh', ['-c', 'command -v ' + t]).status === 0);
  if (!have) console.log('skip the pipeline run: python3 or poppler-utils is not installed');
  else {
    const r = spawnSync('python3', [path.join(ROOT, 'tools/upsc/test_pipeline.py')], { encoding: 'utf8', timeout: 600000 });
    const lines = (r.stdout || '').split('\n').filter(l => /^(ok|FAIL)/.test(l));
    check(r.status === 0 && lines.length > 20 && lines.every(l => l.startsWith('ok')), `the preview pipeline passes its ${lines.length} checks on synthetic PDFs`, (r.stdout || '').split('\n').filter(l => /FAIL/.test(l)).join(' | ') + (r.stderr || '').slice(-400));
  }
}
done();
