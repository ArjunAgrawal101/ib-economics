/* An event page can be traversed from top to bottom by every means a reader
   uses: wheel, keyboard (Page Down, End, Home), touch, after a prediction,
   after refresh, Back/Forward, a cold deep link, and on returning from
   another route. The fault this guards: the chapter rail used to call
   scrollIntoView on its sticky links, which pulled the window back up every
   time a chapter came into view. */
import { serve, browser, check, done } from './lib.mjs';
const { srv, base } = await serve();
const b = await browser();

async function cold(ctx, hash) {
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(base + hash, { waitUntil: 'load' });
  await p.waitForFunction(() => window.__INTRO && window.__INTRO.state === 'done', null, { timeout: 20000 }).catch(() => {});
  const skip = p.getByRole('button', { name: 'Skip for now' }); if (await skip.count()) await skip.first().click().catch(() => {});
  await p.waitForSelector('#ev-practise', { timeout: 15000 }); await p.waitForTimeout(400);
  return { p, errs };
}
const bottom = p => p.evaluate(() => Math.ceil(scrollY + innerHeight) >= document.documentElement.scrollHeight - 2);
const y = p => p.evaluate(() => Math.round(scrollY));
async function wheelDown(p, vp) {
  await p.mouse.move(vp.width / 2, vp.height / 2);
  let last = -1, still = 0;
  for (let i = 0; i < 120 && still < 6; i++) { await p.mouse.wheel(0, 700); await p.waitForTimeout(60); const v = await y(p); still = v === last ? still + 1 : 0; last = v; }
  return bottom(p);
}
async function monotonic(p, step) {           /* every step moves down; nothing pulls the page back */
  const ys = []; for (let i = 0; i < 25; i++) { await step(); await p.waitForTimeout(90); ys.push(await y(p)); }
  return ys.every((v, i) => !i || v >= ys[i - 1]) && ys[ys.length - 1] > ys[0];
}

for (const vp of [{ width: 1366, height: 900 }, { width: 390, height: 844 }]) {
  const W = vp.width + 'px';
  const ctx = await b.newContext({ viewport: vp, hasTouch: vp.width < 500, isMobile: vp.width < 500 });

  /* wheel, from a cold deep link */
  let { p, errs } = await cold(ctx, '#/events/archive/india-1991');
  check(await monotonic(p, () => p.mouse.wheel(0, 500)), `${W} · wheel: each step moves down and nothing pulls the page back`);
  check(await wheelDown(p, vp), `${W} · wheel reaches the end of the event`);

  /* keyboard */
  await p.keyboard.press('Home'); await p.waitForTimeout(300);
  check(await y(p) === 0, `${W} · Home returns to the top`);
  await p.locator('body').click({ position: { x: 5, y: vp.height - 5 } }).catch(() => {});
  await p.keyboard.press('Home'); await p.waitForTimeout(200);
  check(await monotonic(p, () => p.keyboard.press('PageDown')), `${W} · Page Down moves steadily down`);
  await p.keyboard.press('End'); await p.waitForTimeout(500);
  check(await bottom(p), `${W} · End reaches the end of the event`);

  /* after a prediction and a re-render, mid-page */
  await p.keyboard.press('Home'); await p.waitForTimeout(200);
  await p.locator('#ev-mechanism .ev-opts button').first().click(); await p.waitForTimeout(400);
  check(await wheelDown(p, vp), `${W} · after predicting, the rest of the event still scrolls to the end`);

  /* touch (synthesised swipes) */
  if (vp.width < 500) {
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(200);
    const cdp = await ctx.newCDPSession(p); const start = await y(p);
    /* real touch sequences: synthesizeScrollGesture does not scroll in headless Chromium on any page */
    for (let k = 0; k < 4; k++) {
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 195, y: 700 }] });
      for (let i = 1; i <= 10; i++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 195, y: 700 - i * 50 }] }); await p.waitForTimeout(16); }
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await p.waitForTimeout(250);
    }
    check(await y(p) > start + 1200, `${W} · touch swipes scroll the page (${start} → ${await y(p)})`);
  }

  /* refresh, then Back/Forward, then a return from another route */
  await p.reload(); await p.waitForSelector('#ev-practise'); await p.waitForTimeout(400);
  check(await wheelDown(p, vp), `${W} · after a refresh the event scrolls to the end`);
  await p.evaluate(() => nav('data', 0)); await p.waitForTimeout(400);
  await p.goBack(); await p.waitForSelector('#ev-practise'); await p.waitForTimeout(400);
  check(await wheelDown(p, vp), `${W} · after Back from another page the event scrolls to the end`);
  await p.goForward(); await p.waitForTimeout(400); await p.goBack(); await p.waitForSelector('#ev-practise'); await p.waitForTimeout(400);
  check(await wheelDown(p, vp), `${W} · after Forward and Back again the event scrolls to the end`);
  await p.evaluate(() => nav('events', 0)); await p.waitForTimeout(300);
  await p.locator('.ev-card', { hasText: 'Great Depression' }).first().click(); await p.waitForSelector('#ev-practise'); await p.waitForTimeout(400);
  check(await wheelDown(p, vp), `${W} · opening another event from the archive scrolls to the end`);
  check(await p.evaluate(() => document.querySelector('.ev-rail a.on') !== null), `${W} · the rail marks the current chapter`);
  check(!errs.length, `${W} · no page errors (${errs.join(' | ')})`);
  await ctx.close();
}

/* every event, desktop: the end is reachable by wheel */
const ctx = await b.newContext({ viewport: { width: 1366, height: 900 } });
const { p } = await cold(ctx, '#/events/archive/great-depression');
const ids = await p.evaluate(() => EVENTSIDX.events.map(e => e.id)); const stuck = [];
for (const id of ids) { await p.evaluate(id => nav('events', 0, id), id); await p.waitForSelector('#ev-practise'); await p.waitForTimeout(250); if (!(await wheelDown(p, { width: 1366, height: 900 }))) stuck.push(id); }
check(!stuck.length, `all ${ids.length} events scroll from top to bottom by wheel`, stuck.join(', '));
await b.close(); srv.close(); done();
