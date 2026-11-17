/* The two-pathway shell and the shared home, driven the way a reader uses them:
   the statement and the two pathway cards, the header's pathway menus from the
   mouse and the keyboard, the context bars, the drawer, the live model, the
   enquiry links and their wording, search labelled by pathway, the deferred
   welcome, reduced motion, accessibility, and no sideways scroll at any width. */
import fs from 'node:fs';
import path from 'node:path';
import { serve, browser, open, check, done, ROOT } from './lib.mjs';
const { srv, base } = await serve();
const b = await browser();
const st = p => p.evaluate(() => ({ v: VIEW, t: TAB, h: location.hash, path: document.body.dataset.pathway }));
const allErrors = [];

/* ── the home page ─────────────────────────────────────────────────────── */
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const { p, errors } = await open(ctx, base);
  check((await st(p)).path === 'shared', 'the home page belongs to both pathways');
  check(await p.locator('#view h1').count() === 1 && /Economics is not just a subject to study\.\s*It is a way to think\./.test(await p.locator('#view h1').innerText()), 'one h1, and it is the statement');
  const cards = await p.evaluate(() => [...document.querySelectorAll('.hx-paths .pc')].map(c => { const r = c.getBoundingClientRect(); return { top: Math.round(r.top), w: Math.round(r.width), f: c.querySelectorAll('.pc-f li').length, cta: c.querySelector('.pc-cta').textContent.trim(), href: c.querySelector('.pc-cta').getAttribute('href') }; }));
  check(cards.length === 2 && cards.every(c => c.f === 8) && Math.abs(cards[0].w - cards[1].w) <= 1, 'two pathway cards of equal width, eight features each', JSON.stringify(cards));
  check(cards.every(c => c.top < 900), 'both pathway cards begin within the first screen', JSON.stringify(cards.map(c => c.top)));
  check(/Explore IB Economics/i.test(cards[0].cta) && cards[0].href === '#/ib' && /Explore UPSC Economics/i.test(cards[1].cta) && cards[1].href === '#/upsc', 'each card leads into its own pathway');
  await p.locator('.pc-ib .pc-cta').click(); await p.waitForTimeout(300);
  let s = await st(p);
  check(s.v === 'ib' && s.path === 'ib' && await p.locator('#ibl-h').count() === 1 && await p.locator('#cv-h').count() === 1, 'Explore IB Economics opens the IB DP landing, with the IB DP home page beneath it');
  await p.evaluate(() => nav('home')); await p.waitForTimeout(250);
  await p.locator('.pc-up .pc-cta').click(); await p.waitForTimeout(300);
  s = await st(p);
  check(s.v === 'upsc' && s.path === 'upsc', 'Explore UPSC Economics opens the UPSC environment');
  await p.evaluate(() => nav('home')); await p.waitForTimeout(250);

  /* the live model in Think like an economist */
  const r0 = await p.textContent('#cv-read');
  await p.locator('#th-shift').fill('2'); await p.dispatchEvent('#th-shift', 'input'); await p.waitForTimeout(100);
  const r1 = await p.textContent('#cv-read');
  check(r0 !== r1 && /shortage/i.test(r1), 'moving demand redraws the market and explains the shortage', r1);
  await p.locator('#th-shift').fill('0'); await p.dispatchEvent('#th-shift', 'input');

  /* the enquiry links carry the owner's wording, to the owner's own number and address */
  const enq = await p.evaluate(() => [...document.querySelectorAll('.cnx-col a[href^="https://wa.me/"]')].map(a => decodeURIComponent(a.getAttribute('href'))));
  check(enq.length === 9 && enq.every(h => h.startsWith('https://wa.me/917092844945?text=')), 'nine enquiries, each opening WhatsApp to the published number', enq.length);
  check(enq.some(h => h.endsWith('Hello, I am interested in joining the three-month UPSC CSE Economics Intensive Online Programme priced at ₹9,999. Please share the upcoming batch schedule and enrolment details.')), 'the course enquiry is in the owner\'s words');
  const mails = await p.evaluate(() => [...document.querySelectorAll('.cnx-col a[href^="mailto:"]')].map(a => a.getAttribute('href')));
  check(mails.length === 9 && mails.every(h => h.startsWith('mailto:arjun1agr@gmail.com?subject=')), 'each enquiry can also be emailed to the published address');
  check(!/(pay now|buy now|add to cart|checkout|seats left|hurry)/i.test(await p.locator('#view').innerText()), 'nothing on the home page asks for payment or pressures a decision');

  /* every link on the home page resolves to a route, an address, a phone or an outside page */
  const bad = await p.evaluate(() => [...document.querySelectorAll('#view a[href]')].map(a => a.getAttribute('href'))
    .filter(h => !(h.startsWith('#') ? routeParse(h) : /^(mailto:|tel:|https:\/\/)/.test(h))));
  check(bad.length === 0, 'every link on the home page leads somewhere real', bad.slice(0, 5).join(' '));
  allErrors.push(...errors); await ctx.close();
}

/* ── the header's pathway menus, from the mouse and the keyboard ─────────── */
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const { p, errors } = await open(ctx, base);
  const dd = p.locator('#gnav .gn-ib .gn-dd');
  await dd.click(); await p.waitForTimeout(250);
  check(await dd.getAttribute('aria-expanded') === 'true' && await p.locator('#fxpanel').isVisible(), 'the IB DP menu opens and says so');
  const groups = await p.locator('#fxpanel .fxp-h').allInnerTexts();
  check(groups.map(x => x.trim().toLowerCase()).join(',') === 'learn,explore,practise,research,resources', `it holds the five groups of the brief (${groups.join(', ')})`);
  check(await p.locator('#fxpanel a').count() >= 35, 'and every IB DP destination');
  await p.keyboard.press('Escape'); await p.waitForTimeout(150);
  check(!(await p.locator('#fxpanel').isVisible()) && await dd.getAttribute('aria-expanded') === 'false' && await p.evaluate(() => document.activeElement && document.activeElement.classList.contains('gn-dd')), 'Escape closes it and returns focus to its button');
  await p.locator('#gnav .gn-upsc .gn-dd').focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(250);
  const up = await p.locator('#fxpanel .fxp-list a').allInnerTexts();
  check(up.length >= 8, `the UPSC menu opens from the keyboard and lists the UPSC destinations (${up.length})`);
  await p.locator('#fxpanel .fxp-list a').nth(1).click(); await p.waitForTimeout(300);
  const s = await st(p);
  check(s.v === 'upsc' && s.t === 1 && s.path === 'upsc' && !(await p.locator('#fxpanel').isVisible()), 'choosing a destination opens it and closes the menu');
  const cx = await p.locator('#ctxbar .cx-items a').allInnerTexts();
  check(cx.length === 8 && /UPSC Home/.test(cx[0]), `the UPSC context bar carries the eight destinations (${cx.join(' | ')})`);
  check(await p.locator('#ctxbar .cx-items a.on[aria-current="page"]').count() === 1, 'and marks the current one');
  await p.mouse.click(5, 600); await p.locator('#gnav .gn-ib .gn-dd').click(); await p.waitForTimeout(200);
  await p.mouse.click(700, 880); await p.waitForTimeout(200);
  check(!(await p.locator('#fxpanel').isVisible()), 'a click outside closes the menu');
  allErrors.push(...errors); await ctx.close();
}

/* ── the drawer on a phone ─────────────────────────────────────────────── */
{
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  const { p, errors } = await open(ctx, base);
  check(await p.locator('#ctxbar .cx-sw a').count() === 2 && await p.locator('#ctxbar .cx-sw').isVisible(), 'the pathway switcher sits under the header on a phone');
  await p.locator('#burger').click(); await p.waitForTimeout(300);
  check(await p.locator('#mob').isVisible() && await p.locator('#burger').getAttribute('aria-expanded') === 'true', 'the menu opens and says so');
  const main = await p.locator('#mob .dw-main').allInnerTexts();
  check(['Home', 'IB DP Economics', 'UPSC CSE Economics', 'About', 'Contact'].every(n => main.includes(n)), `it holds both pathways and the shared pages (${main.join(' | ')})`);
  check(await p.locator('#mob details.dw-g').count() >= 6, 'the IB DP groups fold, so the menu stays short');
  await p.keyboard.press('Escape'); await p.waitForTimeout(200);
  check(!(await p.locator('#mob').count()) && await p.evaluate(() => document.activeElement && document.activeElement.id === 'burger'), 'Escape closes it and returns focus to the menu button');
  await p.locator('#burger').click(); await p.waitForTimeout(250);
  await p.locator('#mob .dw-main', { hasText: 'UPSC CSE Economics' }).click(); await p.waitForTimeout(300);
  check((await st(p)).v === 'upsc' && !(await p.locator('#mob').count()), 'a destination opens and the menu closes behind it');
  allErrors.push(...errors); await ctx.close();
}

/* ── search, labelled by pathway ───────────────────────────────────────── */
{
  const ctx = await b.newContext({ viewport: { width: 1280, height: 860 } });
  const { p, errors } = await open(ctx, base);
  await p.evaluate(() => openSearch()); await p.waitForTimeout(150);
  await p.keyboard.type('inflation'); await p.waitForTimeout(250);
  const tags = await p.locator('#cpres .cprow .cp-p').allInnerTexts();
  const rows = await p.locator('#cpres .cprow').count();
  check(rows > 0 && tags.length === rows, `every result names its pathway (${rows} results)`);
  check(tags.includes('IB DP') && tags.includes('UPSC CSE'), `a shared idea finds both pathways (${[...new Set(tags)].join(', ')})`);
  const same = await p.evaluate(() => [...document.querySelectorAll('#cpres .cprow')].every((r, i) => r.querySelector('.k').textContent === CP.items[i].k && !r.querySelector('.k .cp-p')));
  check(same, 'the kind label is left as it was');
  await p.keyboard.press('Escape');
  allErrors.push(...errors); await ctx.close();
}

/* ── the welcome waits for the IB DP environment ───────────────────────── */
{
  const ctx = await b.newContext({ viewport: { width: 1280, height: 860 } });
  const p = await ctx.newPage(); const errors = []; p.on('pageerror', e => errors.push(e.message));
  await p.goto(base, { waitUntil: 'load' });
  await p.evaluate(() => { try { splashEnd(true) } catch (e) {} }); await p.waitForTimeout(600);
  const skip = p.getByRole('button', { name: 'Skip for now' });
  check(await skip.count() === 0, 'the welcome, which asks for an IB DP level, does not open over the shared home');
  await p.evaluate(() => nav('upsc')); await p.waitForTimeout(600);
  check(await skip.count() === 0, 'nor over the UPSC pages');
  await p.evaluate(() => nav('ib')); await p.waitForTimeout(700);
  check(await skip.count() === 1, 'it opens on the first visit to the IB DP environment');
  await skip.first().click(); await p.waitForTimeout(200);
  await p.evaluate(() => { nav('home'); nav('ib') }); await p.waitForTimeout(700);
  check(await skip.count() === 0, 'and, once skipped, does not return');
  allErrors.push(...errors); await ctx.close();
}

/* ── reduced motion ────────────────────────────────────────────────────── */
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const { p } = await open(ctx, base);
  const anim = await p.evaluate(() => [...document.querySelectorAll('.hx-d, .hx-s, .hx-e, .hx-r')].map(e => getComputedStyle(e).animationName));
  check(anim.length === 4 && anim.every(a => a === 'none'), 'with reduced motion the hero\'s lines are simply there', anim.join(','));
  await ctx.close();
}

/* ── widths: nothing scrolls sideways ──────────────────────────────────── */
for (const w of [320, 360, 390, 768, 1024, 1280, 1440, 1920]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
  const { p, errors } = await open(ctx, base);
  const over = [];
  for (const h of ['#/', '#/ib', '#/upsc', '#/about', '#/contact']) {
    await p.evaluate(h => { location.hash = h }, h); await p.waitForTimeout(350);
    const o = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    if (o > 1) over.push(`${h} (${o}px)`);
  }
  check(over.length === 0, `${w}px · no sideways scroll on the home, the two landings, About or Contact`, over.join(', '));
  allErrors.push(...errors); await ctx.close();
}

/* ── accessibility: axe on the home page and the shell ─────────────────── */
{
  const axe = fs.readFileSync(path.join(ROOT, 'tests/node_modules/axe-core/axe.min.js'), 'utf8');
  const viol = [];
  for (const w of [1440, 390]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
    const { p } = await open(ctx, base);
    await p.addScriptTag({ content: axe });
    for (const h of ['#/', '#/contact']) {
      await p.evaluate(h => { location.hash = h }, h); await p.waitForTimeout(500);
      const v = await p.evaluate(async () => (await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations.map(x => x.id + ':' + x.nodes.length + ' ' + x.nodes.slice(0, 2).map(n => n.target.join(' ')).join(' ; ')));
      if (v.length) viol.push(`${w}px ${h} ${v.join(' | ')}`);
    }
    await ctx.close();
  }
  check(viol.length === 0, 'axe finds no WCAG A or AA violation on the home page or Contact, at 1440 and 390 px', viol.join('\n     '));
}

check(allErrors.length === 0, 'no page errors', allErrors.slice(0, 5).join(' | '));
await b.close(); srv.close(); done();
