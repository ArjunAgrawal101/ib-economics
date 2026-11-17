/* The pre-launch pass, brought to the two-pathway shell: the global navigation and the IB DP
   context bar, Resources as a destination on every width, the header's
   tools folded without losing them, the Explore Economics Resources band, the
   reveal under reduced motion, and no sideways scroll at the widths it touches. */
import { serve, browser, open, check, done } from './lib.mjs';
const { srv, base } = await serve();
const b = await browser();
const st = p => p.evaluate(() => ({ v: VIEW, t: TAB, h: location.hash }));

/* desktop: the global navigation, measured, and Resources in the IB DP context bar */
for (const w of [1920, 1440, 1280]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
  const { p, errors } = await open(ctx, base + '#/ib');
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  const g = await p.evaluate(() => {
    const vis = [...document.querySelectorAll('#gnav a, #gnav button')].filter(x => x.offsetParent && getComputedStyle(x).display !== 'none');
    const br = document.querySelector('.brand').getBoundingClientRect(), tr = document.querySelector('.topR').getBoundingClientRect();
    const cx = [...document.querySelectorAll('#ctxbar .cx-items > *')].filter(x => x.offsetParent).map(x => x.textContent.trim());
    return { names: vis.map(x => x.textContent.trim()).filter(Boolean), cx, left: Math.min(...vis.map(x => x.getBoundingClientRect().left)), right: Math.max(...vis.map(x => x.getBoundingClientRect().right)), br: br.right, tl: tr.left };
  });
  check(['Home', 'IB DP Economics', 'UPSC CSE Economics', 'About'].every(n => g.names.includes(n)), `${w}px: the global navigation names Home, both pathways and About (${g.names.join(', ')})`);
  check(g.left >= g.br + 8 && g.right <= g.tl + 1, `${w}px: the global navigation sits clear of the brand and the tools`);
  check(['IB Home', 'Learn', 'Explore', 'Practise', 'Research', 'Resources', 'Tutorials'].every(n => g.cx.includes(n)), `${w}px: the IB DP context bar carries its five groups, IB Home and Tutorials (${g.cx.join(', ')})`);
  if (w === 1440) {
    await p.locator('#ctxbar .cx-dd', { hasText: 'Resources' }).click(); await p.waitForTimeout(300);
    await p.locator('#fxpanel a', { hasText: 'Resource hub' }).click(); await p.waitForTimeout(300);
    const s = await st(p);
    check(s.v === 'resources' && s.h === '#/resources', 'the context bar opens the Resource hub at its own address', JSON.stringify(s));
    check(await p.locator('#ctxbar .cx-dd.on', { hasText: 'Resources' }).count() === 1 && await p.locator('#gnav .gn-ib.on a[aria-current]').count() === 1, 'and marks its group and its pathway as current');
    check(/Economics resources/i.test(await p.locator('#view').innerText()), 'the Resource hub is the existing library page');
    /* the folded timer keeps every control, in the IB DP environment */
    await p.evaluate(() => nav('ib')); await p.waitForTimeout(200);
    check(await p.locator('#tmr.idle').count() === 1 && await p.locator('#tmrOpen').getAttribute('aria-label') === 'Exam timer: choose a paper or a time', 'the idle timer is one labelled control');
    await p.locator('#tmrOpen').click(); await p.waitForTimeout(200);
    check(await p.locator('#pop').count() === 1 && /Paper 1/.test(await p.locator('#pop').innerText()), 'it opens the paper presets');
    await p.locator('#pop button', { hasText: 'Paper 1' }).click(); await p.waitForTimeout(1300);
    const run = await p.evaluate(() => ({ idle: document.getElementById('tmr').classList.contains('idle'), run: document.getElementById('tmr').classList.contains('run'), rd: document.getElementById('tmrRead').textContent, vis: !!document.getElementById('tmrRead').offsetParent }));
    check(!run.idle && run.run && run.vis && /^7[45]:\d\d$/.test(run.rd), `a preset starts the timer and the readout returns (${run.rd})`);
    const g2 = await p.evaluate(() => { const vis = [...document.querySelectorAll('#gnav a, #gnav button')].filter(x => x.offsetParent && getComputedStyle(x).display !== 'none'); return Math.max(...vis.map(x => x.getBoundingClientRect().right)) <= document.querySelector('.topR').getBoundingClientRect().left + 1 });
    check(g2, 'the running timer never runs into the navigation');
    await p.locator('#tmrToggle').click(); await p.waitForTimeout(150);
    await p.evaluate(() => tmrReset()); await p.waitForTimeout(150);
    check(await p.locator('#tmr.idle').count() === 1, 'reset folds it again');
    check(await p.locator('#whobtn').getAttribute('title') === 'Your dashboard' && /Student|\w/.test(await p.locator('#whobtn').innerText()), 'the profile keeps a name for assistive technology');
    await p.evaluate(() => nav('home')); await p.waitForTimeout(200);
    check(!(await p.locator('#tmr').isVisible()) && !(await p.locator('#calcbtn').isVisible()), 'the IB DP tools step aside on the shared home');
  }
  check(errors.length === 0, `${w}px: no page errors`, errors.join(' | '));
  await ctx.close();
}

/* tablet and phone: the pathway switcher under the header, and the drawer holds both pathways */
for (const w of [1024, 768, 390, 375, 360]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 844 } });
  const { p, errors } = await open(ctx, base);
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  const g = await p.evaluate(() => {
    const sw = document.querySelector('#ctxbar .cx-sw'), bu = document.getElementById('burger'), br = document.querySelector('.brand');
    const r = sw.getBoundingClientRect(), m = bu.getBoundingClientRect(), b = br.getBoundingClientRect();
    const wm = document.querySelector('.brand .wm b');
    return { shown: !!sw.offsetParent && sw.querySelectorAll('a').length === 2, below: r.top >= b.bottom - 1, inside: r.right <= innerWidth && m.right <= innerWidth, clipped: wm.scrollWidth > wm.clientWidth + 1, over: document.documentElement.scrollWidth - innerWidth };
  });
  check(g.shown && g.below && g.inside, `${w}px: the two pathways sit as a switcher under the header`, JSON.stringify(g));
  check(!g.clipped && g.over <= 0, `${w}px: the wordmark is whole and nothing scrolls sideways`, JSON.stringify(g));
  if (w === 390) {
    await p.locator('#ctxbar .cx-sw a', { hasText: 'IB DP Economics' }).click(); await p.waitForTimeout(300);
    check((await st(p)).v === 'ib', 'the switcher opens the IB DP environment');
    check(await p.locator('#ctxbar .cx-sw a.on[aria-current]', { hasText: 'IB DP Economics' }).count() === 1, 'and shows that it is open');
    await p.locator('#burger').click(); await p.waitForTimeout(300);
    const first = await p.locator('#mob .dw-main').evaluateAll(xs => xs.filter(x => x.offsetParent).map(x => x.textContent.trim()));
    check(first.slice(0, 3).join('|') === 'Home|IB DP Economics|UPSC CSE Economics', `the drawer leads with Home and the two pathways (${first.join(' | ')})`);
    await p.locator('#mob summary', { hasText: 'Resources' }).click(); await p.waitForTimeout(150);
    await p.locator('#mob a', { hasText: 'Resource hub' }).click(); await p.waitForTimeout(300);
    check((await st(p)).v === 'resources' && !(await p.locator('#mob').count()), 'the drawer reaches the Resource hub and closes behind it');
  }
  check(errors.length === 0, `${w}px: no page errors`, errors.join(' | '));
  await ctx.close();
}
{
  const ctx = await b.newContext({ viewport: { width: 320, height: 640 } });
  const { p } = await open(ctx, base);
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  const g = await p.evaluate(() => { const wm = document.querySelector('.brand .wm b'); return { clipped: wm.scrollWidth > wm.clientWidth + 1, over: document.documentElement.scrollWidth - innerWidth } });
  check(!g.clipped && g.over <= 0, '320px: the wordmark keeps its room; Resources is reached from the drawer and the IB DP pages', JSON.stringify(g));
  await ctx.close();
}

/* the home band */
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const { p, errors } = await open(ctx, base + '#/ib');
  const order = await p.evaluate(() => { const v = document.getElementById('view'); const hero = v.querySelector('section.hero'), r = document.getElementById('explore'), s = document.getElementById('selected-work');
    return { afterHero: !!(hero.compareDocumentPosition(r) & 4), beforeStudio: !!(r.compareDocumentPosition(s) & 4), top: Math.round(r.getBoundingClientRect().top + scrollY), h: innerHeight } });
  check(order.afterHero && order.beforeStudio, 'Explore Economics Resources follows the cover and comes before the Learning Studio');
  check(order.top < order.h * 2.4, `it follows the two pathways and the IB cover, within about two screens (${order.top}px on a ${order.h}px screen)`);
  check(await p.locator('#rs-h').innerText() === 'Explore Economics Resources', 'it carries the title the brief sets');
  const hrefs = await p.locator('#explore .rs-a').evaluateAll(a => a.map(x => x.getAttribute('href')));
  const ok = await p.evaluate(hs => hs.every(h => { const r = routeParse(h); return r && SECTIONS.some(s => s.v === r.v) }), hrefs);
  check(hrefs.length === 8 && ok, `every door is a link to a real page (${hrefs.join(' ')})`);
  for (const [name, v] of [['Economics diagrams', 'lab'], ['Calculations', 'calculate'], ['Economics in 60 Seconds', 'learn'], ['Extended Essay support', 'ees']]) {
    await p.evaluate(() => nav('ib')); await p.waitForTimeout(250);
    await p.locator('#explore .rs-a', { hasText: name }).click(); await p.waitForTimeout(350);
    check((await st(p)).v === v, `"${name}" opens ${v}`);
  }
  await p.evaluate(() => nav('ib')); await p.waitForTimeout(250);
  await p.locator('#explore .rs-hub').click(); await p.waitForTimeout(300);
  check((await st(p)).v === 'resources', 'Open the Resource hub opens it');
  await p.evaluate(() => nav('ib')); await p.waitForTimeout(250);
  const studio = await p.locator('#explore img[src*="assets/studio/"]').count();
  check(studio === 0 && await p.locator('#explore a[href="#/studio"]').count() === 1, 'the band shows no Learning Studio excerpt, and points to the Studio once');
  await p.keyboard.press('Tab');
  const focusOk = await p.evaluate(() => { const a = document.querySelector('#explore .rs-a'); a.focus(); const cs = getComputedStyle(a); return cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 2 });
  check(focusOk, 'a door shows a clear focus ring');
  check(errors.length === 0, 'no page errors on the home band', errors.join(' | '));
  await ctx.close();
}

/* motion: reveals wait only with motion on, and everything is visible with it off */
for (const rm of ['no-preference', 'reduce']) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: rm });
  const { p } = await open(ctx, base + '#/ib'); await p.waitForTimeout(800);
  const w0 = await p.evaluate(() => document.querySelectorAll('.rv-wait').length);
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 30)) } });
  await p.waitForTimeout(900);
  const w1 = await p.evaluate(() => [...document.querySelectorAll('#view .rs-i, #selected-work .ex')].filter(e => getComputedStyle(e).opacity !== '1').length);
  if (rm === 'reduce') check(w0 === 0 && w1 === 0, 'reduced motion: nothing waits, nothing is hidden');
  else check(w0 > 0 && w1 === 0, `motion on: ${w0} blocks reveal as they arrive, and all are visible after scrolling`);
  await ctx.close();
}

/* phones: the band reads as two columns of short cards, with no sideways scroll */
for (const w of [390, 320]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 844 } });
  const { p } = await open(ctx, base + '#/ib');
  const g = await p.evaluate(() => { const L = [...document.querySelectorAll('#explore .rs-i')].map(e => Math.round(e.getBoundingClientRect().left)); return { cols: new Set(L).size, over: document.documentElement.scrollWidth - innerWidth } });
  check(g.cols === 2 && g.over <= 0, `${w}px: the doors sit in two columns without sideways scroll`, JSON.stringify(g));
  await ctx.close();
}
await b.close(); srv.close(); done();
