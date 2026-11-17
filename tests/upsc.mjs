/* UPSC CSE Economics: the pathways on the ecosystem home page, the eight tabs,
   the Indian Economy Collection, its filters and its eight-page preview viewer,
   enquiries that use only the published
   contact details, the syllabus explorer, the resource library, the connector,
   no exposed handbook file, widths, reduced motion and axe. */
import fs from 'node:fs';
import path from 'node:path';
import { serve, browser, open, check, done, ROOT } from './lib.mjs';
const { srv, base } = await serve();
const b = await browser();
const st = p => p.evaluate(() => ({ v: VIEW, t: TAB, a: ARG, h: location.hash }));
const go = async (p, h) => { await p.evaluate(h => { location.hash = h }, h); await p.waitForTimeout(350) };
const TABS = ['#/upsc', '#/upsc/syllabus', '#/upsc/economics-resources', '#/upsc/economics-handbooks', '#/upsc/current-affairs', '#/upsc/upsc-economics-course', '#/upsc/about-the-educator', '#/upsc/contact-enrolment'];
const COURSE_MSG = 'Hello Arjun, I am interested in enrolling in your 3-month UPSC CSE Economics Intensive Programme priced at ₹9,999. Please share the course details and upcoming batch information.';
const PAGES = [41, 43, 49, 49, 49, 50, 49, 55, 43, 45, 50];

/* no handbook file is in the repository or reachable from the site */
{
  const bad = [];
  const walk = d => { for (const n of fs.readdirSync(d)) { if (n === 'node_modules' || n === '.git') continue; const f = path.join(d, n); const s = fs.statSync(f);
    if (s.isDirectory()) walk(f); else if (/\.(pdf|docx|doc|odt|epub)$/i.test(n) && !/assets[\\/]carousels[\\/]economics-in-60-seconds-\d{3}\.pdf$/.test(f)) bad.push(path.relative(ROOT, f)); } };
  walk(ROOT);
  check(bad.length === 0, 'no handbook document (PDF, Word or e-book) is stored in the repository', bad.join(', '));
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  check(!/Platinum[^"']*\.(pdf|docx)/i.test(html) && !/handbooks?\/[^"']*\.pdf/i.test(html), 'the page names no handbook file');
  const imgs = fs.readdirSync(path.join(ROOT, 'assets/upsc/handbooks')).flatMap(d => fs.readdirSync(path.join(ROOT, 'assets/upsc/handbooks', d)).map(f => d + '/' + f));
  check(imgs.length === 198 && imgs.every(f => /\.webp$/.test(f)), `the previews are 198 WebP images: per volume a cover in two sizes, eight pages and eight thumbnails (${imgs.length})`);
  const perVol = fs.readdirSync(path.join(ROOT, 'assets/upsc/handbooks')).map(d => fs.readdirSync(path.join(ROOT, 'assets/upsc/handbooks', d)).filter(f => /^page-\d\d\.webp$/.test(f)).length);
  check(perVol.length === 11 && perVol.every(n => n === 8), 'every volume has exactly eight preview pages', perVol.join(','));
  const big = imgs.filter(f => fs.statSync(path.join(ROOT, 'assets/upsc/handbooks', f)).size > (/thumb-/.test(f) ? 24000 : 260000));
  check(big.length === 0, 'pages stay under 260 KB and thumbnails under 24 KB, so the viewer loads progressively', big.join(', '));
  const src = fs.readFileSync(path.join(ROOT, 'tools/upsc/build_upsc.py'), 'utf8');
  check(!/def watermark|Preview Only|alpha_composite/.test(src), 'the build draws nothing over a page: no watermark step remains');
  for (const u of ['assets/upsc/handbooks/volume-iii/volume-iii.pdf', 'assets/upsc/volume-i.pdf', 'content/upsc/handbooks.pdf']) {
    const r = await fetch(base + u); check(r.status === 404, `${u} is not served`);
  }
}

/* desktop */
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const { p, errors } = await open(ctx, base);
  await p.evaluate(() => document.fonts.ready);
  const home = await p.evaluate(() => {
    const h1 = [...document.querySelectorAll('#view h1')].map(x => x.textContent.replace(/\s+/g, ' ').trim());
    const ib = document.querySelector('.sy-pp-ib'), up = document.querySelector('.sy-pp-up');
    return { h1, ib: ib && ib.getBoundingClientRect().top < innerHeight, up: up && up.getBoundingClientRect().top < innerHeight,
      ibT: ib && ib.querySelector('.sy-ppt').textContent, upT: up && up.querySelector('.sy-ppt').textContent, title: document.title };
  });
  check(home.h1.length === 1 && home.h1[0] === 'Economics is not just a subject to study. It is a way to understand the world.', 'the home page has one heading, as briefed', JSON.stringify(home.h1));
  check(home.ib && home.up, 'both pathways begin on the first screen');
  check(home.ibT === 'Think like an economist.' && home.upT === 'Understand the Indian economy. Prepare with clarity.', 'each pathway carries its own line');
  await p.locator('.sy-pp-ib .sy-cta').click(); await p.waitForTimeout(700);
  check((await st(p)).v === 'ib' && await p.locator('#cv-h').count() === 1, 'Explore IB DP Economics opens the IB landing page, with the IB cover on it');
  await p.evaluate(() => nav('home')); await p.waitForTimeout(300);
  await p.locator('.sy-pp-up .sy-cta').click(); await p.waitForTimeout(400);
  check((await st(p)).v === 'upsc', 'Explore UPSC Economics opens the UPSC section');

  /* the pathway strip */
  const pb = await p.evaluate(() => { const n = document.getElementById('pathbar'); const t = document.querySelector('header.top');
    return { before: !!(n && n.compareDocumentPosition(t) & 4), on: n.querySelector('.pb-a.on').dataset.p, ab: n.querySelector('[data-u="about"]').getAttribute('href'), ct: n.querySelector('[data-u="contact"]').getAttribute('href') } });
  check(pb.before && pb.on === 'upsc', 'the pathway strip sits above the header and marks UPSC CSE Economics as current');
  check(pb.ab === '#/upsc/about-the-educator' && pb.ct === '#/upsc/contact-enrolment', 'inside the section, About and Contact lead to its own pages');
  await p.locator('#pathbar .pb-a[data-p="ib"]').click(); await p.waitForTimeout(400);
  check((await st(p)).v === 'ib', 'IB DP Economics in the strip opens the IB landing page');

  /* the eight tabs */
  for (const [i, h] of TABS.entries()) {
    await go(p, h);
    const s = await p.evaluate(() => ({ v: VIEW, t: TAB, h1: document.querySelectorAll('#view h1').length, title: document.title, sub: document.querySelector('#subnavin button.on')?.textContent, over: document.documentElement.scrollWidth - innerWidth }));
    check(s.v === 'upsc' && s.t === i && s.h1 === 1 && /UPSC CSE Economics · Arjun Agrawal$/.test(s.title) && s.over <= 0, `${h} opens tab ${i + 1} (${s.sub}) with one heading and its own title`, JSON.stringify(s));
  }
  check(await p.locator('#subnavin button').count() === 8 && await p.evaluate(() => document.body.classList.contains('up-on')), 'the sub-navigation lists the eight tabs, in the UPSC palette');

  /* the collection */
  await go(p, '#/upsc/economics-handbooks');
  check(/^The Indian Economy Collection$/.test((await p.locator('#view h1').innerText()).replace(/\s+/g, ' ').trim()) && /Eleven carefully structured volumes covering essential dimensions of Indian and international Economics for UPSC CSE preparation\./.test(await p.locator('.up-lede').innerText()),
    'the library is titled THE INDIAN ECONOMY COLLECTION, with the briefed subtitle');
  const cards = await p.evaluate(() => [...document.querySelectorAll('.hl-card')].map(c => ({ k: c.querySelector('.hl-vn').textContent, pp: c.querySelector('.hl-pp').textContent, t: c.querySelector('.hl-t').textContent, cat: c.querySelector('.hl-cat').textContent,
    price: c.querySelector('.hl-price').textContent.replace(/\s+/g, ' ').trim(), buy: c.querySelector('a.up-buy').href, ex: c.querySelector('.hl-b a.up-gh').getAttribute('href'), topics: c.querySelectorAll('.up-chips li').length, rel: c.querySelectorAll('.hl-rel dd').length,
    pv: !!c.querySelector('button.hl-pv'), inside: !!c.querySelector('img.hl-in') })));
  check(cards.length === 11, 'eleven handbook cards');
  check(cards.every((c, i) => c.pp.includes(PAGES[i] + ' pages') && c.k === 'Volume ' + ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI'][i]), 'each card shows its volume number and the page count from its PDF', cards.map(c => c.pp).join(' | '));
  check(cards.every(c => c.price === '₹99 per soft copy' && c.cat && c.pv && c.inside), 'each card shows ₹99 per soft copy, its category, an inside page and a preview button');
  check(cards.every(c => c.topics >= 4 && c.rel === 2), 'each card lists major topics and its Prelims and Mains relevance');
  const msgs = cards.map(c => decodeURIComponent(new URL(c.buy).searchParams.get('text') || ''));
  check(cards.every(c => c.buy.startsWith('https://wa.me/917092844945?text=')) && msgs.every((m, i) => m.includes('₹99') && /digital copy \(PDF\)/.test(m) && m.includes(cards[i].t)),
    'each enquiry opens WhatsApp to the published number with a message naming the volume, its title, ₹99 and the digital copy');
  const imgsOk = await p.evaluate(async () => { const im = [...document.querySelectorAll('.hl-card img')]; for (const i of im) { i.loading = 'eager'; if (!i.complete) await new Promise(r => { i.onload = i.onerror = r }) }
    return im.length === 22 && im.every(i => i.naturalWidth > 0 && Math.abs(i.naturalWidth / i.naturalHeight - i.offsetWidth / i.offsetHeight) < 0.03) });   /* the layout box: the cards tilt their covers */
  check(imgsOk, 'every cover and inside page loads and is shown in its own proportions');
  await p.locator('.hl-chip[data-cat="external"]').click(); await p.waitForTimeout(150);
  let shown = await p.evaluate(() => [...document.querySelectorAll('.hl-card')].filter(c => !c.hidden).map(c => c.id));
  check(shown.join() === 'card-volume-viii,card-volume-ix' && /Showing 2 of 11/.test(await p.locator('#hl-count').innerText()), 'a category filter narrows the grid to its volumes', shown.join());
  await p.locator('.hl-chip[data-cat="all"]').click(); await p.locator('.hl-vs select').selectOption('volume-iv'); await p.waitForTimeout(150);
  shown = await p.evaluate(() => [...document.querySelectorAll('.hl-card')].filter(c => !c.hidden).map(c => c.id));
  check(shown.join() === 'card-volume-iv', 'the volume filter shows one volume');
  await p.locator('.hl-vs select').selectOption('all'); await p.waitForTimeout(100);
  /* the preview, opened from a card */
  await p.locator('#card-volume-vi .hl-pv').click(); await p.waitForTimeout(600);
  const dlg = await p.evaluate(() => { const d = document.getElementById('hv-dlg'); const v = d && d.querySelector('.hv'); return d && d.open && v ? { th: v.querySelectorAll('.hv-t').length, n: v.querySelector('.hv-n').textContent, note: v.querySelector('.hv-note').textContent, img: v.querySelector('.hv-img').getAttribute('src') } : null });
  check(!!dlg && dlg.th === 8 && dlg.n === '1' && /Selected preview\. 8 of the 50 pages/.test(dlg.note) && /volume-vi\/page-02\.webp$/.test(dlg.img), 'Preview 8 pages opens the viewer on page 1 of 8, with eight thumbnails and the selected-preview notice', JSON.stringify(dlg));
  await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(500);
  const k3 = await p.evaluate(async () => { const v = document.querySelector('#hv-dlg .hv'), im = v.querySelector('.hv-img'); if (!im.complete) await new Promise(r => { im.onload = im.onerror = r }); return { n: v.querySelector('.hv-n').textContent, w: im.naturalWidth, cur: v.querySelector('.hv-t[aria-current="true"] span').textContent } });
  check(k3.n === '3' && k3.w >= 1000 && k3.cur === 'p. 4', 'the arrow keys turn the pages; each page is a full-width image (at least 1000 px), and its thumbnail is marked current', JSON.stringify(k3));
  await p.keyboard.press('Escape'); await p.waitForTimeout(250);
  check(await p.evaluate(() => !document.getElementById('hv-dlg').open), 'Escape closes the preview');
  /* a volume */
  await p.locator('#card-volume-iii .hl-b a.up-gh').click(); await p.waitForTimeout(500);
  const vol = await p.evaluate(() => ({ s: { v: VIEW, t: TAB, a: ARG }, h1: document.querySelector('#view h1').textContent, parts: document.querySelectorAll('.up-toc li').length, map: document.querySelectorAll('.up-tbl.map tbody tr').length,
    th: document.querySelectorAll('.hv-inline .hv-t').length, side: !!document.querySelector('.hl-side .up-cv') && /49/.test(document.querySelector('.hl-sf').textContent), mail: document.querySelector('.hl-buy a[href^="mailto:"]').getAttribute('href'),
    order: (() => { const a = document.querySelector('.hl-side'), b = document.querySelector('.hl-main'); return a.getBoundingClientRect().left < b.getBoundingClientRect().left })() }));
  check(vol.s.a === 'volume-iii' && vol.h1 === 'Inflation and Price Stability' && vol.parts === 11 && vol.map === 10, 'View volume opens Volume III with its parts and its syllabus map', JSON.stringify(vol));
  check(vol.side && vol.order && vol.th === 8 && /^mailto:arjun1agr@gmail\.com\?subject=/.test(vol.mail) && decodeURIComponent(vol.mail).includes('Volume III'), 'the cover, facts and enquiry sit on the left, the preview of eight pages on the right, with an email enquiry to the published address');
  await p.locator('.hv-inline .hv-t').nth(5).click(); await p.waitForTimeout(300);
  await p.locator('.hv-inline [aria-label="Zoom in"]').click(); await p.locator('.hv-inline [aria-label="Zoom in"]').click(); await p.waitForTimeout(300);
  const z = await p.evaluate(() => { const v = document.querySelector('.hv-inline'); const s = v.querySelector('.hv-stage'); return { n: v.querySelector('.hv-n').textContent, zl: v.querySelector('.hv-zl').textContent, wide: s.scrollWidth > s.clientWidth, dis: v.querySelector('[aria-label="Zoom in"]').disabled } });
  check(z.n === '6' && z.zl === '200%' && z.wide && z.dis, 'a thumbnail jumps to its page; zoom goes to 200% and the page can be panned', JSON.stringify(z));
  await p.locator('.hv-inline [aria-label="Full screen"]').click(); await p.waitForTimeout(500);
  check(await p.evaluate(() => { const v = document.querySelector('.hv-inline'); return document.fullscreenElement === v || v.classList.contains('hv-fs') }), 'Full screen shows the viewer alone');
  await p.evaluate(() => { if (document.fullscreenElement) return document.exitFullscreen(); hvFull(document.querySelector('.hv-inline').id) }); await p.waitForTimeout(300);
  check(!/cannot be (copied|downloaded)|DRM|copy-protected|screenshots? (are|is) (blocked|disabled)/i.test(await p.locator('#view').innerText()), 'nothing claims that the preview cannot be copied or screenshotted');

  /* the programme */
  await go(p, '#/upsc/upsc-economics-course');
  const c = await p.evaluate(() => ({ t: document.getElementById('view').innerText, enq: [...document.querySelectorAll('#view a')].filter(a => /Enquire About Enrolment/.test(a.textContent)).map(a => a.href),
    tel: [...document.querySelectorAll('#view a')].filter(a => /Speak to Arjun/.test(a.textContent)).map(a => a.getAttribute('href')) }));
  check(/₹9,999/.test(c.t) && /for the complete 3-month programme/.test(c.t) && !/₹4,999|per month/i.test(c.t), 'the fee reads ₹9,999 for the complete 3-month programme, never per month');
  check(/3 months/.test(c.t) && /100% online/.test(c.t) && /Maximum 25 students/.test(c.t) && /Prelims \+ Mains/.test(c.t), 'duration, mode, batch size and coverage are stated');
  check(c.enq.length === 2 && c.enq.every(h => decodeURIComponent(new URL(h).searchParams.get('text')) === COURSE_MSG), 'Enquire About Enrolment opens WhatsApp with the exact enrolment message');
  check(c.tel.length === 2 && c.tel.every(h => h === 'tel:+917092844945'), 'Speak to Arjun calls the published number');
  check(!/\b\d+\s+(lectures|classes|sessions|tests|hours)\b/i.test(c.t) && !/guarantee|refund|instalment|discount/i.test(c.t), 'no invented lecture counts, guarantees, refunds, instalments or discounts');

  /* contact */
  await go(p, '#/upsc/contact-enrolment');
  await p.locator('#up-ct-vol').selectOption('volume-viii');
  let wa = await p.locator('#up-ct-wa').getAttribute('href');
  check(decodeURIComponent(new URL(wa).searchParams.get('text')).includes('Volume VIII: Balance of Payments and International Trade'), 'choosing a volume rewrites the purchase message');
  await p.locator('input[name="up-ct"][value="course"]').check(); await p.waitForTimeout(100);
  wa = await p.locator('#up-ct-wa').getAttribute('href');
  check(decodeURIComponent(new URL(wa).searchParams.get('text')) === COURSE_MSG && await p.locator('#up-ct-v').isHidden(), 'an enrolment enquiry carries the course message, separate from handbook enquiries');
  await p.locator('input[name="up-ct"][value="general"]').check(); await p.waitForTimeout(100);
  check(/question about UPSC CSE Economics/.test(await p.locator('#up-ct-m').innerText()), 'a general question has its own message');

  /* syllabus */
  await go(p, '#/upsc/syllabus');
  check(await p.locator('#ups-panel details.up-acc').count() === 14 && /Economic and Social Development-Sustainable Development, Poverty, Inclusion, Demographics, Social Sector Initiatives, etc\./.test(await p.locator('.up-off').first().innerText()),
    'Prelims shows the official Paper I line and fourteen explained themes');
  await p.locator('#ups-mains').click(); await p.waitForTimeout(200);
  const mains = await p.evaluate(() => [...document.querySelectorAll('#ups-panel details.up-acc summary q')].map(q => q.textContent));
  check(mains.length === 10 && mains[2] === 'Government Budgeting.' && mains[9] === 'Investment models.' && await p.locator('#ups-mains[aria-selected="true"]').count() === 1, 'Mains shows the ten official GS III lines, quoted');
  await p.locator('.up-acc-tools button', { hasText: 'Expand all' }).click();
  check(await p.evaluate(() => [...document.querySelectorAll('#ups-panel details.up-acc')].every(d => d.open)), 'Expand all opens every line');
  check(await p.evaluate(() => [...document.querySelectorAll('#ups-panel .up-vl')].every(a => routeParse(a.getAttribute('href')))), 'every volume link in the syllabus is a real address');

  /* resources */
  await go(p, '#/upsc/economics-resources');
  await p.locator('#up-q').fill('MSP'); await p.waitForTimeout(150);
  const vis = () => p.evaluate(() => [...document.querySelectorAll('#up-tgrid .up-tc')].filter(li => !li.hidden).map(li => li.querySelector('b').textContent));
  let v = await vis(); check(v.length === 1 && v[0] === 'MSP Is Not Procurement', `search finds MSP (${v.join(', ')})`);
  await p.locator('#up-q').fill(''); await p.locator('.up-cat', { hasText: 'External Sector' }).click(); await p.waitForTimeout(150);
  v = await vis(); check(v.length === 1 && /Balance of Payments/.test(v[0]), 'a category filter narrows the list');
  await p.locator('.up-cat', { hasText: 'All' }).first().click(); await p.waitForTimeout(100);
  check((await vis()).length === 11, 'All shows the eleven topics again');
  await go(p, '#/upsc/economics-resources/labour');
  await p.locator('.up-opt input').nth(1).check(); await p.locator('.up-mcq button').click();
  check(/Not quite/.test(await p.locator('.up-fb').innerText()), 'a wrong answer is marked, with the explanation');
  await p.locator('.up-opt input').nth(0).check(); await p.locator('.up-mcq button').click();
  check(/Correct/.test(await p.locator('.up-fb').innerText()), 'the right answer is confirmed');
  check(await p.locator('.up-tp-fig svg').count() === 1 && await p.locator('.up-glimpse a[href="#/upsc/economics-handbooks/volume-xi"]').count() === 1, 'the topic has its figure and a glimpse of its volume');

  /* the connector */
  await go(p, '#/upsc/economics-resources');
  const ib = await p.evaluate(() => [...document.querySelectorAll('#connector .up-ibl:not(.u)')].map(a => a.getAttribute('href')));
  check(ib.length >= 8, `the connector links to existing IB resources (${ib.length})`);
  check(await p.evaluate(hs => hs.every(h => { const r = routeParse(h); return r && typeof VIEWS[r.v] === 'function' }), ib), 'every IB link resolves to a live page');
  await p.locator('#connector .up-ibl:not(.u)').first().click(); await p.waitForTimeout(400);
  check((await st(p)).v !== 'upsc', 'an IB link opens the IB resource itself');

  /* current affairs */
  await go(p, '#/upsc/current-affairs');
  const n0 = await p.locator('#up-ca .up-ca-i:visible').count();
  await p.locator('.up-th', { hasText: 'Taxation' }).click(); await p.waitForTimeout(100);
  const ca = await p.evaluate(() => [...document.querySelectorAll('#up-ca .up-ca-i')].filter(li => !li.hidden).map(li => li.dataset.t));
  check(n0 >= 15 && ca.length >= 2 && ca.every(t => t === 'Taxation'), 'a theme filter shows only its entries');
  check(await p.evaluate(() => [...document.querySelectorAll('#up-ca .up-ca-i')].every(li => li.querySelector('time') && /Source/.test(li.textContent))), 'every entry has a date and a source');

  /* search */
  await p.evaluate(() => nav('home'));
  const found = await p.evaluate(() => { try { return buildIndex().filter(r => r.k === 'UPSC CSE Economics').length } catch (e) { return 0 } });
  check(found >= 8 + 11 + 11, `search indexes the UPSC pages, volumes and topics (${found})`);
  check(errors.length === 0, 'no page errors on desktop', errors.join(' | '));
  await ctx.close();
}

/* widths: no sideways scroll, the strip whole */
for (const w of [1024, 768, 390, 360, 320]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 844 } });
  const { p, errors } = await open(ctx, base);
  await p.evaluate(() => document.fonts.ready);
  const bad = [];
  for (const h of ['#/', ...TABS, '#/upsc/economics-handbooks/volume-viii', '#/upsc/economics-resources/bop']) {
    if (h === '#/') await p.evaluate(() => nav('home')); else await go(p, h);
    const o = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    if (o > 0) bad.push(h + ' +' + o);
  }
  check(bad.length === 0, `${w}px: nothing scrolls sideways on the home page or any UPSC page`, bad.join(', '));
  const pb = await p.evaluate(() => [...document.querySelectorAll('#pathbar .pb-a')].map(a => { const r = a.getBoundingClientRect(); return { w: a.scrollWidth <= a.clientWidth + 1, in: r.left >= 0 && r.right <= innerWidth + 0.5, vis: r.width > 0 } }));
  check(pb.length === 2 && pb.every(x => x.w && x.in && x.vis), `${w}px: both pathways are whole in the strip`, JSON.stringify(pb));
  if (w === 390) {
    await p.locator('#burger').click(); await p.waitForTimeout(300);
    const items = await p.locator('#mob button, #mob a').evaluateAll(xs => xs.filter(x => x.offsetParent).map(x => x.textContent.trim()).filter(Boolean).slice(0, 4));
    check(items.some(t => /UPSC CSE Economics/.test(t)), `the drawer lists UPSC CSE Economics near its top (${items.join(' | ')})`);
  }
  check(errors.length === 0, `${w}px: no page errors`, errors.join(' | '));
  await ctx.close();
}

/* reduced motion: nothing waits to be revealed */
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const { p } = await open(ctx, base);
  for (const h of ['#/upsc', '#/upsc/economics-handbooks', '#/upsc/upsc-economics-course']) {
    await go(p, h);
    const hidden = await p.evaluate(() => [...document.querySelectorAll('#view .up-pl, #view .hl-card, #view .up-feat li, #view .up-rm')].filter(e => getComputedStyle(e).opacity !== '1' || e.classList.contains('rv-wait')).length);
    check(hidden === 0, `reduced motion: every block on ${h} is visible`);
  }
  await ctx.close();
}

/* accessibility */
{
  const axe = fs.readFileSync(path.join(ROOT, 'tests/node_modules/axe-core/axe.min.js'), 'utf8');
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const { p } = await open(ctx, base);
  for (const w of [1440, 390]) {
    await p.setViewportSize({ width: w, height: 900 }); const viol = [];
    for (const h of ['#/', '#/upsc', '#/upsc/syllabus', '#/upsc/economics-resources', '#/upsc/economics-resources/inflation', '#/upsc/economics-handbooks', '#/upsc/economics-handbooks/volume-v', '#/upsc/current-affairs', '#/upsc/upsc-economics-course', '#/upsc/about-the-educator', '#/upsc/contact-enrolment']) {
      if (h === '#/') await p.evaluate(() => nav('home')); else await go(p, h);
      if (h === '#/upsc/syllabus') await p.evaluate(() => upAccAll(true));
      if (!(await p.evaluate(() => typeof axe !== 'undefined'))) await p.addScriptTag({ content: axe });
      const sel = h === '#/' ? '.sy-home' : '#view';
      const r = await p.evaluate(async s => (await axe.run(document.querySelector(s), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations.map(x => x.id + ':' + x.nodes.length + ' ' + x.nodes.slice(0, 2).map(n => n.target.join(' ')).join(' ; ')), sel);
      if (r.length) viol.push(h + ' ' + r.join(','));
    }
    const pbv = await p.evaluate(async () => (await axe.run(document.getElementById('pathbar'), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] } })).violations.map(x => x.id));
    if (pbv.length) viol.push('pathbar ' + pbv.join(','));
    check(!viol.length, `${w}px: axe finds no WCAG A/AA violation on the pathways or any UPSC page`, viol.join(' | '));
  }
  /* keyboard: the seven steps move with the arrow keys */
  await p.setViewportSize({ width: 1440, height: 900 }); await go(p, '#/upsc');
  await p.locator('#upf-t0').focus(); await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight');
  check(await p.evaluate(() => document.activeElement.id === 'upf-t2' && /Visualisation/.test(document.getElementById('upf-p').textContent) && !!document.querySelector('#upf-p svg')), 'the approach steps follow the arrow keys, and step 3 draws the LAF corridor');
  await ctx.close();
}
await b.close(); srv.close(); done();
