/* The opening sequence: exactly five seconds from the first frame the reader
   sees, at the six widths the brief names, plus Skip, reduced motion, and the
   state model: every kind of home-page load plays in full; a deep link does not. Timing is read from the overlay's own record
   (window.__INTRO), which the browser fills from requestAnimationFrame and
   Paint Timing, both on the performance.now() timeline. */
import { serve, browser, check, done } from './lib.mjs';
const { srv, base } = await serve();
const b = await browser();
const SIZES = [[360, 780], [390, 844], [768, 1024], [1024, 768], [1440, 900], [1920, 1080]];
const FRAME = 50;                      /* the node is removed on the first frame at or after the exit: up to three frames at 60 Hz */
const rec = () => { const I = window.__INTRO; return { mode: I.mode, how: I.how, late: I.late, t0: I.t0, start: I.start, fp: I.fp,
  end: I.end, exitAt: I.exitAt, fadeEnd: I.fadeEnd, state: I.state, skipAt: I.skipAt || null, plan: I.PLAN.map(p => [p[0], p[1], p[2]]) }; };
const finished = p => p.waitForFunction(() => window.__INTRO && window.__INTRO.state === 'done', null, { timeout: 40000 });

for (const [w, h] of SIZES) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(base, { waitUntil: 'commit' });
  await finished(p);
  const r = await p.evaluate(rec);
  check(r.mode === 'play' && r.how === 'timer' && !r.late, `${w}px · the sequence plays in full and ends on its own clock`, JSON.stringify({ mode: r.mode, how: r.how, late: r.late }));
  check(Math.abs(r.exitAt - r.start - 5000) < 0.5, `${w}px · the exit is scheduled at exactly start + 5000 ms`, (r.exitAt - r.start).toFixed(2));
  check(Math.abs(r.fadeEnd - r.start - 5000) < 0.5, `${w}px · the exit fade reaches full transparency at exactly start + 5000 ms`, String(r.fadeEnd - r.start));
  const vis = r.end - r.start;
  check(vis >= 5000 - 0.5 && vis <= 5000 + FRAME, `${w}px · the overlay node leaves ${vis.toFixed(1)} ms after the start (invisible from 5000 ms, removed on the next frame)`);
  check(r.fp === null || Math.abs(r.start - r.fp) < 0.5 || Math.abs(r.fp - r.t0) <= 4, `${w}px · the start is the first presented frame`, JSON.stringify({ t0: r.t0, fp: r.fp, start: r.start }));
  check(errs.length === 0, `${w}px · no page errors during the opening`, errs.join(' | '));
  await ctx.close();

  /* geometry: hold the overlay, set every stage to its steady moment, measure */
  const c2 = await b.newContext({ viewport: { width: w, height: h } });
  const q = await c2.newPage();
  await q.goto(base, { waitUntil: 'commit' });
  await q.waitForFunction(() => window.__APP_READY === true && window.__INTRO && window.__INTRO.anims.length > 5, null, { timeout: 40000 });
  await q.evaluate(() => { window.__APP_READY = false; window.__INTRO.anchored = true; });   /* hold, and keep the clock from re-anchoring what the test pauses */
  const bad = [];
  for (const [t, sel] of [[1250, '.ia-logo'], [2000, '.ia-logo'], [2800, '.ia-ib'], [3800, '.ia-tg'], [4600, '.ia-vb']]) {
    await q.evaluate(t => __INTRO.anims.forEach(a => { a.pause(); a.currentTime = t; }), t);
    await q.waitForTimeout(60);
    const g = await q.evaluate(sel => {
      const e = document.querySelector('#splash ' + sel), r = e.getBoundingClientRect(), k = document.getElementById('splashskip').getBoundingClientRect();
      const o = +getComputedStyle(sel === '.ia-tg' ? e.parentElement : e).opacity;
      const hit = !(r.right <= k.left || r.left >= k.right || r.bottom <= k.top || r.top >= k.bottom);
      return { l: r.left, r: r.right, t: r.top, b: r.bottom, vw: innerWidth, vh: innerHeight, o, hit, sw: document.getElementById('splash').scrollWidth };
    }, sel);
    if (g.l < 0 || g.r > g.vw || g.t < 0 || g.b > g.vh || g.hit || g.o < 0.95 || g.sw > g.vw) bad.push(`${sel}@${t}: ${JSON.stringify(g)}`);
  }
  check(bad.length === 0, `${w}px · every stage sits inside the screen, clear of Skip, fully visible at its moment`, bad.join(' | '));
  await c2.close();
}

/* Skip: one press, a clean exit */
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(base, { waitUntil: 'commit' });
  await p.waitForFunction(() => window.__INTRO && window.__INTRO.state === 'playing', null, { timeout: 20000 });
  await p.click('#splashskip');
  await finished(p);
  const r = await p.evaluate(rec);
  check(r.how === 'skipped' && r.end - r.skipAt <= 260, `Skip leaves within ${Math.round(r.end - r.skipAt)} ms of the press`);
  await p.waitForTimeout(300);
  check(await p.evaluate(() => !document.getElementById('splash') && typeof bootOnboarding === 'function'), 'after Skip the overlay is gone from the document');
  await ctx.close();
}
/* reduced motion: the same hierarchy at once, no five-second hold */
{
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const p = await ctx.newPage();
  await p.goto(base, { waitUntil: 'commit' });
  /* measured inside the page on the first frame the clock runs, before the overlay can leave */
  await p.waitForFunction(() => { const I = window.__INTRO; if (!I || I.state === 'waiting') return false;
    window.__RM = ['.ia-logo', '.ia-ib', '.ia-tg', '.ia-vb'].every(s => { const e = document.querySelector('#splash ' + s); return !!e && +getComputedStyle(e).opacity === 1 && e.getBoundingClientRect().height > 0; });
    return true; }, null, { timeout: 20000, polling: 'raf' });
  const still = await p.evaluate(() => window.__RM);
  await finished(p);
  const r = await p.evaluate(rec);
  check(r.mode === 'still' && still, 'reduced motion shows the monogram, name, course, tagline and verbs at once');
  check(r.how === 'still' && r.end - r.start >= 1500 - 0.5 && r.end - r.start < 5000, `reduced motion leaves after ${Math.round(r.end - r.start)} ms, without the five-second hold`);
  await ctx.close();
}
/* the state model: the home page plays in full on every kind of load; a deep link does not */
{
  const ctx = await b.newContext({ viewport: { width: 1024, height: 768 } });
  const p = await ctx.newPage();
  const full = async (label) => { await finished(p); const r = await p.evaluate(rec);
    check(r.mode === 'play' && Math.abs(r.exitAt - r.start - 5000) < 0.5 && r.end - r.start >= 4999.5 && r.end - r.start <= 5000 + FRAME,
      `${label}: the full sequence plays (${Math.round(r.end - r.start)} ms, navigation type ${await p.evaluate(() => window.__INTRO.nav)})`, JSON.stringify({ mode: r.mode, how: r.how })); };
  await p.goto(base + '#/course', { waitUntil: 'commit' });
  await finished(p);
  let r = await p.evaluate(rec);
  check(r.mode === 'cover' && r.how === 'cover' && r.end - r.start < 5000, `a deep link to another page skips the sequence and leaves when ready (${Math.round(r.end - r.start)} ms)`);
  await p.goto(base, { waitUntil: 'commit' }); await full('the home page after a deep link');
  await p.reload({ waitUntil: 'commit' }); await full('a reload of the home page');
  const cdp = await ctx.newCDPSession(p); await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  await p.reload({ waitUntil: 'commit' }); await full('a hard reload with the cache disabled');
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: false });
  /* a hash change alone is a same-document navigation: leave the document first so each address is a real load */
  await p.goto('about:blank'); await p.goto(base + '#/home', { waitUntil: 'commit' }); await full('a direct #/home address');
  await p.goto('about:blank'); await p.goto(base + '#/learn', { waitUntil: 'commit' }); await finished(p);
  check((await p.evaluate(rec)).mode === 'cover', 'a second deep link still skips it');
  await p.evaluate(() => nav('home')); await p.waitForTimeout(150);
  check(await p.locator('#splash').count() === 0, 'navigating to home inside the app does not show the opening');
  await p.evaluate(() => nav('course')); await p.waitForTimeout(150); await p.goBack(); await p.waitForTimeout(250);
  check(await p.evaluate(() => VIEW) === 'home' && await p.locator('#splash').count() === 0, 'Back inside the app returns without the opening');
  await p.goto('about:blank'); await p.goBack({ waitUntil: 'commit' });
  const restored = await p.evaluate(() => !!(window.__INTRO && window.__INTRO.restored));
  if (restored) check(await p.locator('#splash').count() === 0, 'Back from another site restores the page from the back-forward cache, as it was left');
  else await full('Back from another site to the home page (a full load)');
  await ctx.close();
}
/* a warm service worker and a populated cache do not shorten the sequence */
{
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage();
  await p.goto(base, { waitUntil: 'load' }); await finished(p);
  await p.waitForFunction(() => navigator.serviceWorker && navigator.serviceWorker.controller !== null || !('serviceWorker' in navigator), null, { timeout: 20000 }).catch(() => {});
  const ctl = await p.evaluate(() => !!(navigator.serviceWorker && navigator.serviceWorker.controller));
  await p.goto(base + '?again', { waitUntil: 'commit' }); await finished(p);
  const r = await p.evaluate(rec);
  check(r.mode === 'play' && r.end - r.start >= 4999.5 && r.end - r.start <= 5000 + FRAME, `a revisit ${ctl ? 'controlled by the service worker' : 'with a warm cache'} plays the same 5000 ms (${Math.round(r.end - r.start)} ms)`);
  await ctx.close();
}
await b.close(); srv.close(); done();
