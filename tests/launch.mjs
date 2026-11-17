/* The pre-launch pass, on the ecosystem's header: the main navigation measured and
   clear on desktop, Resources one step away in the IB menu and a door on tablets and
   phones, the header's tools folded without losing them, the IB front page's
   Explore Economics Resources band (at #/ib), the
   reveal under reduced motion, and no sideways scroll at the widths it touches. */
import { serve, browser, open, check, done } from './lib.mjs';
const { srv, base } = await serve();
const b = await browser();
const st = p => p.evaluate(() => ({ v: VIEW, t: TAB, h: location.hash }));

/* desktop: one main navigation, measured, clear of the brand and the tools; Resources one step away in the IB menu */
const MAIN = ['Home', 'IB DP Economics', 'UPSC CSE Economics', 'Learning Tools', 'About Arjun', 'The Business Brief'];
for (const w of [1920, 1440, 1280]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
  const { p, errors } = await open(ctx, base);
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  const g = await p.evaluate(() => {
    const vis = [...document.querySelectorAll('#synav .sy-a')].filter(x => x.offsetParent && getComputedStyle(x).display !== 'none');
    const br = document.querySelector('.brand').getBoundingClientRect(), tr = document.querySelector('.topR').getBoundingClientRect();
    return { names: vis.map(x => x.textContent.replace(/\(opens in a new tab\)/, '').replace(/[↗]/g, '').trim()), left: Math.min(...vis.map(x => x.getBoundingClientRect().left)), right: Math.max(...vis.map(x => x.getBoundingClientRect().right)), br: br.right, tl: tr.left,
      ib: getComputedStyle(document.getElementById('mainnav')).display };
  });
  check(MAIN.every((n, i) => g.names[i] === n), `${w}px: the main navigation reads ${MAIN.join(' | ')}`, g.names.join(' | '));
  check(g.left >= g.br + 8 && g.right <= g.tl + 1, `${w}px: the bar sits clear of the brand and the tools`, JSON.stringify(g));
  if (w === 1440) {
    await p.locator('#sy-t-ib').click(); await p.waitForTimeout(250);
    await p.locator('#sy-p-ib a.sy-i', { hasText: 'Resource hub' }).click(); await p.waitForTimeout(300);
    const s = await st(p);
    check(s.v === 'resources' && s.h === '#/resources', 'the IB menu opens the Resource hub at its own address', JSON.stringify(s));
    check(await p.locator('#sy-t-ib.cur').count() === 1 && await p.evaluate(() => document.getElementById('sy-p-ib').hidden), 'the menu closes and IB DP Economics is marked as the current pathway');
    check(/Economics resources/i.test(await p.locator('#view').innerText()), 'the Resource hub is the existing library page');
  }
  if (w === 1920) {
    /* the folded timer keeps every control */
    await p.evaluate(() => nav('home')); await p.waitForTimeout(200);
    check(await p.locator('#tmr.idle').count() === 1 && await p.locator('#tmrOpen').getAttribute('aria-label') === 'Exam timer: choose a paper or a time', 'the idle timer is one labelled control');
    await p.locator('#tmrOpen').click(); await p.waitForTimeout(200);
    check(await p.locator('#pop').count() === 1 && /Paper 1/.test(await p.locator('#pop').innerText()), 'it opens the paper presets');
    await p.locator('#pop button', { hasText: 'Paper 1' }).click(); await p.waitForTimeout(1300);
    const run = await p.evaluate(() => ({ idle: document.getElementById('tmr').classList.contains('idle'), run: document.getElementById('tmr').classList.contains('run'), rd: document.getElementById('tmrRead').textContent, vis: !!document.getElementById('tmrRead').offsetParent }))
    check(!run.idle && run.run && run.vis && /^7[45]:\d\d$/.test(run.rd), `a preset starts the timer and the readout returns (${run.rd})`);
    const g2 = await p.evaluate(() => { const vis = [...document.querySelectorAll('#synav .sy-a')].filter(x => x.offsetParent); return Math.max(...vis.map(x => x.getBoundingClientRect().right)) <= document.querySelector('.topR').getBoundingClientRect().left + 1 });
    check(g2, 'the running timer never runs into the bar');
    await p.locator('#tmrToggle').click(); await p.waitForTimeout(150);
    await p.evaluate(() => tmrReset()); await p.waitForTimeout(150);
    check(await p.locator('#tmr.idle').count() === 1, 'reset folds it again');
    check(await p.locator('#whobtn').getAttribute('title') === 'Your dashboard' && /Student|\w/.test(await p.locator('#whobtn').innerText()), 'the profile keeps a name for assistive technology');
  }
  if (w === 1280) {
    /* where the header folds the timer away, Learning Tools still opens it */
    await p.locator('#sy-t-tools').click(); await p.waitForTimeout(200);
    await p.locator('#sy-p-tools button[data-tool="timer"]').click(); await p.waitForTimeout(250);
    check(await p.locator('#pop').count() === 1 && /Paper 1/.test(await p.locator('#pop').innerText()), 'Learning Tools opens the exam timer');
    await p.keyboard.press('Escape');
  }
  check(errors.length === 0, `${w}px: no page errors`, errors.join(' | '));
  await ctx.close();
}

/* tablet and phone: a Resources door in the header, and Resources first in the drawer */
for (const w of [1024, 768, 390, 375, 360]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 844 } });
  const { p, errors } = await open(ctx, base);
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  const g = await p.evaluate(() => {
    const d = document.getElementById('resdoor'), br = document.querySelector('.brand'), bu = document.getElementById('burger');
    const r = d.getBoundingClientRect(), b = br.getBoundingClientRect(), m = bu.getBoundingClientRect();
    const wm = document.querySelector('.brand .wm b');
    return { shown: !!d.offsetParent, after: r.left >= b.right - 1, beforeMenu: r.right <= m.left, inside: r.right <= innerWidth, clipped: wm.scrollWidth > wm.clientWidth + 1, over: document.documentElement.scrollWidth - innerWidth };
  });
  check(g.shown && g.after && g.beforeMenu && g.inside, `${w}px: Resources sits in the header between the brand and the menu`, JSON.stringify(g));
  check(!g.clipped && g.over <= 0, `${w}px: the wordmark is whole and nothing scrolls sideways`, JSON.stringify(g));
  if (w === 390) {
    await p.locator('#resdoor').click(); await p.waitForTimeout(300);
    check((await st(p)).v === 'resources', 'the header door opens the Resource hub');
    check(await p.locator('#resdoor[aria-current="page"]').count() === 1, 'and shows that it is open');
    await p.locator('#burger').click(); await p.waitForTimeout(300);
    const first = await p.evaluate(() => { const g = document.querySelector('#mob .mobgroup:not(.mobpaths)'); return { paths: [...document.querySelectorAll('#mob .mobpaths .mobitem')].map(x => x.textContent.trim()), group: g ? [...g.querySelectorAll('.mobitem')].map(x => x.textContent.trim()).slice(0, 3) : [] } });
    check(first.paths.length === 3 && /^Resources/.test(first.group[0] || ''), `after Home and the pathways, Resources leads the drawer's first group (${first.group.join(' | ')})`);
  }
  check(errors.length === 0, `${w}px: no page errors`, errors.join(' | '));
  await ctx.close();
}
{
  const ctx = await b.newContext({ viewport: { width: 320, height: 640 } });
  const { p } = await open(ctx, base);
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  const g = await p.evaluate(() => { const wm = document.querySelector('.brand .wm b'); return { clipped: wm.scrollWidth > wm.clientWidth + 1, over: document.documentElement.scrollWidth - innerWidth } });
  check(!g.clipped && g.over <= 0, '320px: the wordmark keeps its room; Resources is reached from the drawer and the home page', JSON.stringify(g));
  await ctx.close();
}

/* the IB front page's band (at #/ib) */
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const { p, errors } = await open(ctx, base + '#/ib');
  const order = await p.evaluate(() => { const v = document.getElementById('view'); const hero = v.querySelector('section.hero.rn-home'), r = document.getElementById('explore'), s = document.getElementById('selected-work');
    return { afterHero: !!(hero.compareDocumentPosition(r) & 4), beforeStudio: !!(r.compareDocumentPosition(s) & 4), gap: Math.round(r.getBoundingClientRect().top - hero.getBoundingClientRect().bottom) } });
  check(order.afterHero && order.beforeStudio, 'Explore Economics Resources follows the IB cover and comes before the Learning Studio');
  check(order.gap >= 0 && order.gap < 160, `it comes directly after the IB cover (${order.gap}px below it)`);
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
