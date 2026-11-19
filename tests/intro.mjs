/* The opening sequence (the two-pathway opening, tools/migrations/2026-11-19-opening-two-pathways.py):
   exactly five seconds from the first frame the reader sees, at the six widths the brief names; what
   it says (both pathways) and how it is announced; Skip by mouse and keyboard, and Escape; the state
   model the owner asked for (every full page load of any address plays in full, navigation inside
   the app never does, nothing is stored, so a skip is not remembered); reduced motion; no horizontal
   scroll at 320 px; a warm service worker; and, under a four-times CPU slowdown, that the stages
   still land on time. Timing is read from the overlay's own record (window.__INTRO), filled from
   requestAnimationFrame and Paint Timing on the performance.now() timeline; the slowed run is read
   from the compositor's own frames (a DevTools screencast), because the main thread is busy then.
   The structure, the busy-machine handling and the keyboard, 320 px and slow-CPU checks are those
   of the 2026-11-17 opening's suite; the state-model checks are PR #13's. */
import { serve, browser, check, done } from './lib.mjs';
const { srv, base } = await serve();
const b = await browser();
const SIZES = [[360, 780], [390, 844], [768, 1024], [1024, 768], [1440, 900], [1920, 1080]];
const FRAME = 50;                      /* the node is removed on the first frame at or after the exit: up to three frames at 60 Hz */
const REVEAL = 700;                    /* the halves open over the last 700 ms (fadeAt 4300) */
const LABEL = 'Arjun Agrawal | Economics. One discipline, two pathways: IB DP Economics and UPSC CSE Economics.';
const rec = () => { const I = window.__INTRO; return { mode: I.mode, how: I.how, late: I.late, t0: I.t0, start: I.start, fp: I.fp,
  end: I.end, exitAt: I.exitAt, fadeStart: I.fadeStart, fadeEnd: I.fadeEnd, state: I.state, skipAt: I.skipAt || null,
  forced: I.forced, route: I.route, nav: I.nav, ready: window.__READY_AT || null }; };
const finished = p => p.waitForFunction(() => window.__INTRO && window.__INTRO.state === 'done', null, { timeout: 60000 });
/* records the moment the platform says it is ready, without changing what it does */
const readyClock = () => { let v; Object.defineProperty(window, '__APP_READY', { configurable: true,
  get() { return v; }, set(x) { v = x; if (x && !window.__READY_AT) window.__READY_AT = performance.now(); } }); };
/* holds the overlay: the platform never reports ready, so nothing leaves */
const holdReady = () => { Object.defineProperty(window, '__APP_READY', { configurable: true, get() { return false; }, set(x) { window.__R = x; } }); };
/* the full sequence: on its own clock (the exit fade ending at exactly 5000 ms, the node removed
   promptly; section 1 holds the removal to 50 ms), or held until the page was ready when it was not */
const fullOK = r => r.mode === 'play' && (r.how === 'timer'
  ? Math.abs(r.exitAt - r.start - 5000) < 0.5 && Math.abs(r.fadeEnd - r.start - 5000) < 0.5 && r.end - r.start >= 4999.5 && r.end - r.start <= 5000 + 250
  : r.how === 'late' && r.ready !== null && r.ready - r.start > 4400 && r.fadeStart >= r.ready - 0.5 && r.fadeEnd - r.fadeStart >= 119.5 && r.end - r.ready <= 1250);
const ctxWith = async (opts = {}, ...scripts) => { const c = await b.newContext({ viewport: { width: 1024, height: 768 }, ...opts }); for (const s of scripts) await c.addInitScript(s); return c; };
const afterward = p => p.evaluate(() => ({ inert: !!document.querySelector('[inert]'), hidden: document.body.getAttribute('aria-hidden') === 'true' || !!document.querySelector('main[aria-hidden="true"]'),
  gone: !document.getElementById('splash') }));
const noOpeningStorage = p => p.evaluate(() => { try { return Object.keys(localStorage).every(k => !/intro|splash|opening/i.test(k)) && Object.keys(sessionStorage).every(k => !/intro|splash|opening/i.test(k)); } catch (e) { return true; } });

/* ── 1 · five seconds, on one clock, at six widths ───────────────────────── */
for (const [w, h] of SIZES) {
  const ctx = await ctxWith({ viewport: { width: w, height: h } }, readyClock);
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(base, { waitUntil: 'commit' });
  await finished(p);
  const r = await p.evaluate(rec);
  const vis = r.end - r.start;
  if (!r.late) {
    /* the page was ready in time: the clock alone decides */
    check(r.mode === 'play' && r.how === 'timer', `${w}px · a full page load plays the full sequence and ends on its own clock`, JSON.stringify({ mode: r.mode, how: r.how, late: r.late }));
    check(Math.abs(r.exitAt - r.start - 5000) < 0.5, `${w}px · the exit is scheduled at exactly start + 5000 ms`, (r.exitAt - r.start).toFixed(2));
    check(Math.abs(r.fadeEnd - r.start - 5000) < 0.5, `${w}px · the exit reaches full transparency at exactly start + 5000 ms`, String(r.fadeEnd - r.start));
    check(vis >= 5000 - 0.5 && vis <= 5000 + FRAME, `${w}px · the overlay node leaves ${vis.toFixed(1)} ms after the start (invisible from 5000 ms, removed on the next frame)`);
  } else {
    /* the machine was too busy for the page to be ready in time: the final frame must hold, then leave promptly */
    console.log(`     (${w}px: the page was not ready until ${Math.round(r.ready - r.start)} ms, so the five-second exit could not be measured on this run)`);
    check(r.mode === 'play' && r.how === 'late' && r.fadeStart >= r.ready - 0.5 && r.fadeStart - r.ready <= 1000 && r.fadeEnd - r.fadeStart >= 119.5 && r.fadeEnd - r.fadeStart <= REVEAL + 0.5
      && r.end >= r.fadeEnd - 0.5 && r.end - r.fadeEnd <= 600,
      `${w}px · a page not ready in time keeps the final frame until it is, then opens (${Math.round(vis)} ms)`, JSON.stringify({ how: r.how, ready: r.ready - r.start, fadeStart: r.fadeStart - r.start, fadeEnd: r.fadeEnd - r.start, end: vis }));
  }
  check(r.fp === null || Math.abs(r.start - r.fp) < 0.5 || (r.fp - r.t0 <= 4 && r.start === r.t0), `${w}px · the start is the first presented frame of the opening`, JSON.stringify({ t0: r.t0, fp: r.fp, start: r.start }));
  check(r.ready !== null && r.ready <= r.end, `${w}px · the page was ready before it was uncovered (ready ${Math.round(r.ready - r.start)} ms after the start)`);
  const a = await afterward(p);
  check(a.gone && !a.inert && !a.hidden, `${w}px · afterwards the overlay is gone and nothing behind it is inert or hidden`, JSON.stringify(a));
  check(errs.length === 0, `${w}px · no page errors during the opening`, errs.join(' | '));
  await ctx.close();

  /* geometry: hold the overlay, set every stage to its steady moment, measure */
  const c2 = await ctxWith({ viewport: { width: w, height: h } }, holdReady);
  const q = await c2.newPage();
  await q.goto(base, { waitUntil: 'commit' });
  await q.waitForFunction(() => window.__R === true && window.__INTRO && window.__INTRO.anims.length > 20, null, { timeout: 60000 });
  await q.evaluate(() => { const I = window.__INTRO; I.anchored = true; I.state = 'done'; });   /* stop the clock so nothing re-anchors what the test pauses */
  const bad = [], seen = {};
  const STAGES = [[1150, ['.ia-logo']], [1700, ['.ia-logo', '.if-ax']], [2800, ['.ia-logo', '.ia-ib', '.ia-up']],
    [3800, ['.ia-logo', '.ia-tg']], [4280, ['.ia-logo', '.ia-tg', '.ia-vb']]];
  for (const [t, sels] of STAGES) {
    await q.evaluate(t => __INTRO.anims.forEach(a => { a.pause(); a.currentTime = t; }), t);
    await q.waitForTimeout(60);
    const g = await q.evaluate(sels => {
      const sp = document.getElementById('splash'), k = document.getElementById('splashskip').getBoundingClientRect();
      const op = e => { let o = 1; for (let n = e; n && n !== document; n = n.parentElement) o *= +getComputedStyle(n).opacity; return o; };
      const out = [];
      for (const sel of sels) for (const e of sp.querySelectorAll(sel)) {
        const r = e.getBoundingClientRect();
        out.push({ sel, l: r.left, r: r.right, t: r.top, b: r.bottom, o: op(e), hit: !(r.right <= k.left || r.left >= k.right || r.bottom <= k.top || r.top >= k.bottom) });
      }
      sp.scrollLeft = 80;   /* the overlay clips; it can never scroll sideways */
      return { out, vw: innerWidth, vh: innerHeight, sl: sp.scrollLeft, clip: getComputedStyle(sp).overflowX, dw: document.documentElement.scrollWidth };
    }, sels);
    for (const e of g.out) {
      seen[e.sel] = 1;
      if (e.l < -0.5 || e.r > g.vw + 0.5 || e.t < -0.5 || e.b > g.vh + 0.5 || e.hit || e.o < 0.95) bad.push(`${e.sel}@${t}: ${JSON.stringify(e)}`);
    }
    if (g.sl !== 0 || g.clip !== 'clip' || g.dw > g.vw) bad.push(`@${t}: horizontal scroll ${JSON.stringify({ sl: g.sl, clip: g.clip, dw: g.dw, vw: g.vw })}`);
  }
  check(bad.length === 0 && Object.keys(seen).length === 6, `${w}px · every stage sits inside the screen, clear of Skip, fully visible at its moment`, bad.slice(0, 6).join(' | '));
  await c2.close();
}

/* ── 2 · what it says, and how it says it ────────────────────────────────── */
{
  const ctx = await ctxWith({ viewport: { width: 1440, height: 900 } }, holdReady);
  const p = await ctx.newPage();
  await p.goto(base, { waitUntil: 'commit' });
  await p.waitForFunction(() => window.__INTRO && window.__INTRO.state === 'playing', null, { timeout: 30000 });
  const id = await p.evaluate(() => { const sp = document.getElementById('splash'), tx = s => (sp.querySelector(s) || {}).textContent || '';
    return { label: sp.getAttribute('aria-label'), role: sp.getAttribute('role'), ib: tx('.ia-ib b'), up: tx('.ia-up b'), tg: tx('.ia-tg'), vb: tx('.ia-vb'),
      deco: [...sp.children].filter(e => e.id !== 'splashskip').every(e => e.getAttribute('aria-hidden') === 'true'),
      old: !!sp.querySelector('.o-band, .o-mk, .o-ec'), media: sp.querySelectorAll('img,video,canvas,iframe').length,
      doors: !!sp.querySelector('.dr-l') && !!sp.querySelector('.dr-r'), motifs: !!sp.querySelector('.if-globe') && !!sp.querySelector('.if-kolam'),
      tint: [getComputedStyle(sp.querySelector('.dr-l i')).backgroundImage, getComputedStyle(sp.querySelector('.dr-r i')).backgroundImage] }; });
  check(id.ib === 'IB DP Economics' && id.up === 'UPSC CSE Economics', 'the field divides into IB DP Economics and UPSC CSE Economics', JSON.stringify([id.ib, id.up]));
  check(/^One discipline\.\s*Two pathways\.$/.test(id.tg.trim()) && /IB DP Economics/.test(id.vb) && /UPSC CSE Economics/.test(id.vb), 'then "One discipline. Two pathways." and both names', JSON.stringify([id.tg, id.vb]));
  check(id.doors && id.motifs && /gradient/.test(id.tint[0]) && /gradient/.test(id.tint[1]) && id.tint[0] !== id.tint[1], 'each pathway has its own half, colour and motif (a globe, a kolam)', JSON.stringify(id.tint).slice(0, 160));
  check(id.role === 'status' && id.label === LABEL, `the overlay is a status with the accessible name "${LABEL}"`, JSON.stringify({ role: id.role, label: id.label }));
  check(id.deco, 'every decorative layer, the stage text included, is hidden from assistive technology; only Skip is exposed');
  check(!id.old, 'the world-map opening of 2026-11-17 is gone: one opening remains');
  check(id.media === 0, 'the opening is inline vector art and type: no image, video, canvas or frame');
  const name = await p.getByRole('button', { name: 'Skip introduction' }).count();
  check(name === 1, 'Skip is a button named "Skip introduction"');
  await ctx.close();
}

/* ── 3 · Skip: by keyboard and mouse, at once, and not remembered ────────── */
{
  /* the overlay is held (the platform never reports ready), so the keyboard meets it however busy the machine is */
  const ctx = await ctxWith({ viewport: { width: 1440, height: 900 } }, holdReady);
  const p = await ctx.newPage();
  await p.goto(base, { waitUntil: 'commit' });
  await p.waitForFunction(() => window.__R === true && window.__INTRO && window.__INTRO.state === 'playing', null, { timeout: 60000 });
  await p.waitForTimeout(600);   /* let the page settle, as a reader would meet it */
  await p.keyboard.press('Tab');
  const focused = await p.evaluate(() => document.activeElement && document.activeElement.id);
  check(focused === 'splashskip', 'Skip is the first stop for the keyboard', String(focused));
  const vis = await p.evaluate(() => { const e = document.getElementById('splashskip'), r = e.getBoundingClientRect(), s = getComputedStyle(e);
    return { w: r.width, h: r.height, o: +s.opacity, outline: s.outlineStyle, inView: r.right <= innerWidth && r.bottom <= innerHeight && r.left >= 0 }; });
  check(vis.w > 60 && vis.h >= 36 && vis.o > 0.9 && vis.inView && vis.outline !== 'none', 'Skip is visible in its corner, with a visible focus ring', JSON.stringify(vis));
  await p.evaluate(() => { window.__K = null; document.addEventListener('keydown', e => { if (!window.__K) window.__K = performance.now(); }, { capture: true, once: true }); });
  await p.evaluate(() => { document.addEventListener('click', () => { const sp = document.getElementById('splash'), f = window.__INTRO.fade;
    window.__AFTER = { pe: sp && getComputedStyle(sp).pointerEvents, d: f && f.effect.getTiming().duration }; }, { once: true }); });
  await p.keyboard.press('Enter');
  await finished(p);
  const r = await p.evaluate(rec);
  const k = await p.evaluate(() => window.__K), after = await p.evaluate(() => window.__AFTER);
  check(r.how === 'skipped' && r.skipAt - k < 17, `Enter on Skip starts the exit within one frame (${(r.skipAt - k).toFixed(1)} ms)`);
  check(after && after.pe === 'none' && after.d === 180, 'at the press the overlay stops taking clicks and fades out in 180 ms on the compositor', JSON.stringify(after));
  check(r.end - r.skipAt <= 180 + 400, `and it is gone from the document ${Math.round(r.end - r.skipAt)} ms after the press`);
  check(await noOpeningStorage(p), 'the skip is not remembered: nothing about the opening is written to storage');
  /* the next load, in a new tab, plays the full sequence all the same */
  const p2 = await ctx.newPage(); await p2.addInitScript(readyClock);
  await p2.goto(base, { waitUntil: 'commit' }); await finished(p2);
  const r2 = await p2.evaluate(rec);
  check(fullOK(r2), 'after a skip, the next load plays the full sequence', JSON.stringify({ mode: r2.mode, how: r2.how }));
  /* Replay the opening (?intro=1) plays it, and leaves the address clean */
  await p2.goto(base + '?intro=1', { waitUntil: 'commit' }); await finished(p2);
  const r3 = await p2.evaluate(rec);
  check(fullOK(r3) && r3.forced, `Replay the opening (?intro=1) plays the full sequence (${Math.round(r3.end - r3.start)} ms)`);
  check(await p2.evaluate(() => location.search === ''), '?intro=1 is taken out of the address once read, so a reload or a shared link does not carry it');
  await ctx.close();
}
{
  const ctx = await ctxWith({ viewport: { width: 1440, height: 900 } }, holdReady);
  const p = await ctx.newPage();
  await p.goto(base, { waitUntil: 'commit' });
  await p.waitForFunction(() => window.__R === true && window.__INTRO && window.__INTRO.state === 'playing', null, { timeout: 60000 });
  await p.click('#splashskip');
  await finished(p);
  const r = await p.evaluate(rec);
  check(r.how === 'skipped' && r.end - r.skipAt <= 180 + 400, `a click on Skip leaves within ${Math.round(r.end - r.skipAt)} ms of the press`);
  await ctx.close();
}
{
  const ctx = await ctxWith({ viewport: { width: 390, height: 844 } }, holdReady);
  const p = await ctx.newPage();
  await p.goto(base, { waitUntil: 'commit' });
  await p.waitForFunction(() => window.__R === true && window.__INTRO && window.__INTRO.state === 'playing', null, { timeout: 60000 });
  await p.keyboard.press('Escape');
  await finished(p);
  const r = await p.evaluate(rec);
  check(r.how === 'skipped', 'Escape skips the opening from anywhere on the page');
  await p.waitForTimeout(300);
  check(await p.evaluate(() => !document.getElementById('splash') && typeof bootOnboarding === 'function'), 'after Skip the overlay is gone from the document');
  const a = await afterward(p);
  check(!a.inert && !a.hidden, 'after Skip nothing behind it is inert or hidden', JSON.stringify(a));
  await ctx.close();
}
{
  /* a click elsewhere or a scroll does not skip */
  const ctx = await ctxWith({ viewport: { width: 1024, height: 768 } }, holdReady);
  const p = await ctx.newPage();
  await p.goto(base, { waitUntil: 'commit' });
  await p.waitForFunction(() => window.__R === true && window.__INTRO && window.__INTRO.state === 'playing', null, { timeout: 30000 });
  await p.mouse.click(300, 300); await p.mouse.wheel(0, 400); await p.keyboard.press('ArrowDown'); await p.waitForTimeout(250);
  check(await p.evaluate(() => window.__INTRO.state === 'playing' && !window.__INTRO.skipped), 'a stray click, a scroll or another key does not skip it');
  await ctx.close();
}

/* ── 4 · the state model: every full page load plays; the app's own navigation never does ── */
{
  const ctx = await ctxWith({}, readyClock);
  const p = await ctx.newPage();
  const full = async (label) => { await finished(p); const r = await p.evaluate(rec);
    const timed = r.how === 'timer' ? Math.abs(r.exitAt - r.start - 5000) < 0.5 && r.end - r.start >= 4999.5 && r.end - r.start <= 5000 + FRAME
      : r.how === 'late' && r.ready - r.start > 4400 && r.fadeStart >= r.ready - 0.5 && r.end - r.ready <= 1250;
    check(r.mode === 'play' && timed, `${label}: the full sequence plays (${Math.round(r.end - r.start)} ms${r.how === 'late' ? ', held until the page was ready' : ''}, navigation type ${r.nav})`,
      JSON.stringify({ mode: r.mode, how: r.how, ready: r.ready - r.start })); return r; };
  await p.goto(base + '#/course', { waitUntil: 'commit' }); await full('a shared link to another page');
  await p.goto(base, { waitUntil: 'commit' }); await full('the home page after a shared link');
  await p.reload({ waitUntil: 'commit' }); await full('a reload of the home page');
  const cdp = await ctx.newCDPSession(p); await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  await p.reload({ waitUntil: 'commit' }); await full('a hard reload with the cache disabled');
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: false });
  /* a hash change alone is a same-document navigation: leave the document first so each address is a real load */
  await p.goto('about:blank'); await p.goto(base + '#/home', { waitUntil: 'commit' }); await full('a direct #/home address');
  await p.goto('about:blank'); await p.goto(base + '#/upsc/handbook-library', { waitUntil: 'commit' }); await full('a shared link into the UPSC Handbook Library');
  await p.goto('about:blank'); await p.goto(base + '#/ib', { waitUntil: 'commit' }); await full('a shared link to the IB DP Economics home');
  check(await noOpeningStorage(p), 'nothing about the opening is kept in local or session storage');
  await p.evaluate(() => nav('home')); await p.waitForTimeout(150);
  check(await p.locator('#splash').count() === 0, 'navigating to home inside the app does not show the opening');
  await p.evaluate(() => nav('course')); await p.waitForTimeout(150); await p.goBack(); await p.waitForTimeout(250);
  check(await p.locator('#splash').count() === 0, 'Back inside the app returns without the opening');
  await p.goto('about:blank'); await p.goBack({ waitUntil: 'commit' });
  const restored = await p.evaluate(() => !!(window.__INTRO && window.__INTRO.restored));
  if (restored) check(await p.locator('#splash').count() === 0, 'Back from another site restores the page from the back-forward cache, as it was left');
  else await full('Back from another site (a full load)');
  /* Forward into the home page from another site: history is [about:blank, home]; step back, then forward */
  await p.goto('about:blank'); await p.goto(base + '#/home', { waitUntil: 'commit' }); await full('the home page before a Forward step');
  await p.goBack({ waitUntil: 'commit' }); await p.waitForURL('about:blank');
  await p.goForward({ waitUntil: 'commit', timeout: 15000 }).catch(() => {}); await p.waitForURL(u => u.href.startsWith(base), { timeout: 15000 });
  const restoredF = await p.evaluate(() => !!(window.__INTRO && window.__INTRO.restored));
  if (restoredF) check(await p.locator('#splash').count() === 0, 'Forward from another site restores the page from the back-forward cache, as it was left');
  else await full('Forward from another site (a full load)');
  /* a new tab plays the full sequence too */
  const p2 = await ctx.newPage();
  await p2.goto(base, { waitUntil: 'commit' }); await finished(p2);
  const r2 = await p2.evaluate(rec);
  check(fullOK(r2), 'a new tab plays the full sequence', JSON.stringify({ mode: r2.mode, how: r2.how }));
  await ctx.close();
}
{
  /* a private window whose storage refuses: the full sequence, no errors */
  const ctx = await ctxWith({}, readyClock, () => { const no = () => { throw new DOMException('denied', 'SecurityError'); };
    for (const k of ['localStorage', 'sessionStorage']) Object.defineProperty(window, k, { configurable: true, get: no }); });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(base, { waitUntil: 'commit' }); await finished(p);
  const r = await p.evaluate(rec);
  await p.reload({ waitUntil: 'commit' }); await finished(p);
  const r2 = await p.evaluate(rec);
  check(fullOK(r) && fullOK(r2) && errs.length === 0,
    'when storage is refused (a private window) the opening still plays in full and nothing throws', JSON.stringify({ a: r.mode, b: r2.mode, errs }));
  await ctx.close();
}

/* ── 5 · reduced motion: the same hierarchy at once, a still frame of 1.5 s ── */
{
  const ctx = await ctxWith({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' }, readyClock);
  const p = await ctx.newPage();
  await p.goto(base, { waitUntil: 'commit' });
  /* measured inside the page on the first frame the clock runs, before the overlay can leave */
  await p.waitForFunction(() => { const I = window.__INTRO; if (!I || I.state === 'waiting') return false;
    window.__RM = ['.ia-logo', '.ia-ib', '.ia-up', '.ia-tg'].every(s => { const e = document.querySelector('#splash ' + s); return !!e && +getComputedStyle(e).opacity === 1 && e.getBoundingClientRect().height > 0; })
      && document.getAnimations().filter(a => a.effect && a.effect.target && a.effect.target.closest && a.effect.target.closest('#splash') && a.effect.target.id !== 'splash').length === 0;
    return true; }, null, { timeout: 30000, polling: 'raf' });
  const still = await p.evaluate(() => window.__RM);
  await finished(p);
  const r = await p.evaluate(rec);
  check(r.mode === 'still' && still, 'reduced motion shows the identity, the line and both pathways at once, with nothing moving');
  check(r.how === 'still' && r.end - r.start >= 1500 - 0.5 && r.end >= r.ready && (r.ready - r.start <= 1450 ? r.end - r.start <= 1500 + FRAME : r.end - r.ready <= 1250),
    `reduced motion leaves after ${Math.round(r.end - r.start)} ms (1.5 s, or as soon after as the page is ready at ${Math.round(r.ready - r.start)} ms), without the five-second sequence`);
  await ctx.close();
}

/* ── 6 · no horizontal scroll at 320 px, in every state ──────────────────── */
{
  const bad = [];
  for (const kind of ['play', 'deep', 'still']) {
    const ctx = await ctxWith({ viewport: { width: 320, height: 640 }, reducedMotion: kind === 'still' ? 'reduce' : 'no-preference' }, holdReady);
    const p = await ctx.newPage();
    await p.goto(base + (kind === 'deep' ? '#/course' : ''), { waitUntil: 'commit' });
    await p.waitForFunction(() => window.__R === true && window.__INTRO && window.__INTRO.state === 'playing', null, { timeout: 60000 });
    for (const t of kind === 'still' ? [0] : [600, 1150, 1700, 2800, 3800, 4280]) {
      if (kind !== 'still') { await p.evaluate(t => { __INTRO.state = 'done'; __INTRO.anims.forEach(a => { a.pause(); a.currentTime = t; }); }, t); await p.waitForTimeout(50); }
      const g = await p.evaluate(() => { const sp = document.getElementById('splash'), k = document.getElementById('splashskip').getBoundingClientRect();
        const op = e => { let o = 1; for (let n = e; n && n !== document; n = n.parentElement) o *= +getComputedStyle(n).opacity; return o; };
        const shown = [...sp.querySelectorAll('.ia-logo, .ia-ib b, .ia-ib span, .ia-up b, .ia-up span, .ia-tg, .ia-vb span, #splashskip')].filter(e => op(e) > 0.05);
        const rs = shown.map(e => e.getBoundingClientRect()).filter(r => r.width);
        sp.scrollLeft = 80;
        return { sl: sp.scrollLeft, clip: getComputedStyle(sp).overflowX, dw: document.documentElement.scrollWidth, out: rs.filter(r => r.left < -0.5 || r.right > innerWidth + 0.5).length,
          hit: shown.filter(e => e.id !== 'splashskip').map(e => e.getBoundingClientRect()).filter(r => r.width && !(r.right <= k.left || r.left >= k.right || r.bottom <= k.top || r.top >= k.bottom)).length }; });
      if (g.sl !== 0 || g.clip !== 'clip' || g.dw > 320 || g.out || g.hit) bad.push(`${kind}@${t}: ${JSON.stringify(g)}`);
    }
    await ctx.close();
  }
  check(bad.length === 0, 'no horizontal overflow at 320 px, and no text off the screen or under Skip, in every state of the opening', bad.join(' | '));
}

/* ── 7 · a warm service worker and a populated cache do not shorten the sequence ── */
{
  const ctx = await ctxWith({ viewport: { width: 390, height: 844 } }, readyClock);
  const p = await ctx.newPage();
  await p.goto(base, { waitUntil: 'load' }); await finished(p);
  await p.waitForFunction(() => navigator.serviceWorker && navigator.serviceWorker.controller !== null || !('serviceWorker' in navigator), null, { timeout: 20000 }).catch(() => {});
  await p.goto(base + '?again', { waitUntil: 'commit' }); await finished(p);
  const ctl = await p.evaluate(() => !!(navigator.serviceWorker && navigator.serviceWorker.controller));
  const r = await p.evaluate(rec);
  check(fullOK(r), `a revisit ${ctl ? 'controlled by the service worker' : 'with a warm cache'} plays the same full sequence (${Math.round(r.end - r.start)} ms, ${r.how})`);
  await ctx.close();
}

/* ── 8 · four times slower: the stages still land on time ──────────────────
   The main thread is busy for most of the five seconds (start-up and the
   self-test), so the overlay is read from what the compositor drew: a
   screencast of every frame. The progress bar is a linear compositor
   animation from the first frame, so its length in a frame says which
   moment of the sequence that frame shows; that is compared with when the
   frame was drawn, and each stage's arrival is located on it. */
{
  const W = 390, H = 844;
  const runOne = async (rate) => {
    const ctx = await b.newContext({ viewport: { width: W, height: H } }); await ctx.addInitScript(readyClock);
    const p = await ctx.newPage(); const cdp = await ctx.newCDPSession(p);
    if (rate > 1) await cdp.send('Emulation.setCPUThrottlingRate', { rate });
    const frames = [];
    cdp.on('Page.screencastFrame', f => { frames.push({ ts: f.metadata.timestamp * 1000, data: f.data }); cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {}); });
    await cdp.send('Page.startScreencast', { format: 'png', everyNthFrame: 1 });
    await p.goto(base, { waitUntil: 'commit' });
    await p.waitForFunction(() => window.__INTRO && window.__INTRO.state === 'playing', null, { timeout: 60000 });
    const R = await p.evaluate(() => { const r = s => { const b = document.querySelector('#splash ' + s).getBoundingClientRect(); return [b.left, b.top, b.width, b.height]; };
      return { bar: r('.ia-bar'), logo: r('.ia-logo'), ax: r('.if-ax'), ib: r('.ia-ib b'), tg: r('.ia-tg'), vb: r('.ia-vb') }; });
    await finished(p);
    await cdp.send('Page.stopScreencast');
    const I = await p.evaluate(() => { const I = window.__INTRO;
      return { origin: performance.timeOrigin + I.t0, shift: I.anims.find(a => a).startTime - I.t0, end: I.end - I.start, how: I.how, mode: I.mode,
        ready: window.__READY_AT - I.start }; });
    await ctx.close();
    const an = await (await b.newContext()).newPage();
    const S = [];
    for (const f of frames) {
      const t = f.ts - I.origin; if (t < 150 || t > 4250) continue;
      S.push({ t, ...await an.evaluate(async ({ data, R }) => {
        const img = new Image(); img.src = 'data:image/png;base64,' + data; await img.decode();
        const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const g = c.getContext('2d'); g.drawImage(img, 0, 0);
        /* the bar: 2 px tall; read the row through its middle, from its left end to its right */
        const [bx, by, bw, bh] = R.bar, row = g.getImageData(Math.round(bx), Math.floor(by + bh / 2), Math.round(bw), 1).data; let lit = 0;
        for (let x = 0; x < Math.round(bw); x++) { const r = row[x * 4], bb = row[x * 4 + 2]; if (r > 80 && r - bb > 30) lit = x + 1; }
        const part = ([x, y, w, h], gold) => { const d = g.getImageData(Math.max(0, x | 0), Math.max(0, y | 0), Math.max(1, w | 0), Math.max(1, h | 0)).data; let n = 0;
          for (let i = 0; i < d.length; i += 4) { const r = d[i], gg = d[i + 1], bb = d[i + 2];
            if (gold ? r > 90 && r - bb > 35 && gg - bb > 20 : (r + gg + bb) / 3 > 150) n++; } return n / (d.length / 4); };
        return { bar: lit / Math.round(bw) * 5000, px: 5000 / Math.round(bw), logo: part(R.logo, true), ax: part(R.ax), ib: part(R.ib), tg: part(R.tg), vb: part(R.vb) }; }, { data: f.data, R }) });
    }
    await an.context().close();
    S.sort((a, b) => a.t - b.t);
    const lags = S.map(x => x.t - x.bar), lag = [...lags].sort((a, b) => a - b), q = f => lag[Math.min(lag.length - 1, Math.floor(f * lag.length))];
    const third = Math.floor(lags.length / 3), mid = a => [...a].sort((x, y) => x - y)[a.length >> 1];
    const drift = mid(lags.slice(-third)) - mid(lags.slice(0, third));   /* a clock that falls behind drifts; this one must not */
    /* a stage's arrival: the first frame at half its full presence, read on the bar's clock;
       stages after the still passage (3700-3950) run on the re-anchored start */
    const WIN = { logo: [150, 1100], ax: [1000, 1900], ib: [2000, 3000], tg: [3050, 3690], vb: [3900, 4250] }, LATE = { vb: 1 };
    const land = {};
    for (const k of Object.keys(WIN)) {
      const w = S.filter(x => x.bar >= WIN[k][0] && x.bar <= WIN[k][1]), mx = Math.max(...w.map(x => x[k]));
      const i = w.findIndex(x => x[k] >= mx / 2);
      /* resolved only when two frames close together bracket the arrival (a busy machine drops frames) */
      land[k] = i > 0 && w[i].bar - w[i - 1].bar <= 120 ? [w[i - 1].bar, w[i].bar].map(v => Math.round(v - (LATE[k] ? I.shift : 0))) : null;
    }
    return { land, frames: S.length, px: S.length ? S[0].px : 0, lagMed: q(.5), lagBand: q(.9) - q(.1), drift, gap: Math.max(...S.slice(1).map((x, i) => x.t - S[i].t)), I };
  };
  const base1 = await runOne(1), slow = await runOne(4);
  const fmt = r => Object.entries(r.land).map(([k, v]) => `${k} ${v ? v[1] : '?'}`).join(', ');
  const desc = r => `bar lag ${Math.round(r.lagMed)} ms (10-90%: ${Math.round(r.lagBand)} ms), drift ${Math.round(r.drift)} ms`;
  console.log(`     unthrottled: ${fmt(base1)} ms; ${desc(base1)}; one bar pixel is ${Math.round(base1.px)} ms`);
  console.log(`     4x slower:   ${fmt(slow)} ms; ${desc(slow)}; ${slow.frames} frames, longest gap ${Math.round(slow.gap)} ms`);
  console.log(`     the page was ready ${Math.round(base1.I.ready)} ms after the start unthrottled and ${Math.round(slow.I.ready)} ms four times slower; the overlay left at ${Math.round(base1.I.end)} and ${Math.round(slow.I.end)} ms`);
  check(slow.I.ready > Math.max(4700, 1.8 * base1.I.ready), 'the slowed run really was slowed: its start-up took far longer than the unthrottled one', JSON.stringify({ base: base1.I.ready, slow: slow.I.ready }));
  /* the bar is 156 px for 5000 ms here, so a reading is good to one bar pixel (about 32 ms) */
  const PX = Math.max(base1.px, slow.px);
  check(slow.frames > 60 && Math.abs(slow.lagMed - base1.lagMed) <= 34 + PX && slow.lagBand <= 70 + PX && Math.abs(slow.drift) <= 34 + PX,
    'four times slower, the compositor keeps the sequence\'s time: frame by frame the bar reads the moment the frame was drawn, without drifting',
    JSON.stringify({ base: [base1.lagMed, base1.lagBand, base1.drift], slow: [slow.lagMed, slow.lagBand, slow.drift], px: PX }));
  /* the brackets of each arrival, slowed and unslowed, meet within two frames and a bar pixel */
  const TOL = 34 + PX;
  const both = Object.keys(base1.land).filter(k => slow.land[k] && base1.land[k]);
  const ok = both.length >= 3 && both.every(k => Math.max(slow.land[k][0], base1.land[k][0]) <= Math.min(slow.land[k][1], base1.land[k][1]) + TOL);
  check(ok, `four times slower, every stage still lands on schedule (${both.length} of 5 arrivals resolved in both runs: ${both.join(', ')})`, JSON.stringify({ base: base1.land, slow: slow.land }));
  check(slow.I.mode === 'play' && slow.I.how === 'late' && slow.I.end >= slow.I.ready, `four times slower, the final frame holds until the page is ready (${Math.round(slow.I.ready)} ms) rather than uncovering it unfinished`);
}
await b.close(); srv.close(); done();
