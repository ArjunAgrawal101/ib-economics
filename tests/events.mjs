/* The economic events archive and the pathways, in a real browser: lazy
   loading, every event's charts, the predict gate, the timeline stepper,
   what-if, compare, the history timeline, the Indian economy hub, the error
   state, deep links, refresh, Back/Forward, and no sideways scrolling. */
import { serve, browser, open, check, done } from './lib.mjs';
const { srv, base } = await serve();
const b = await browser();
const ctx = await b.newContext({ viewport: { width: 1366, height: 900 } });
const req = [];
ctx.on('request', r => { if (/assets\/data\/(events|history)\.js/.test(r.url())) req.push(r.url().split('/').pop()) });
const { p, errors } = await open(ctx, base);
check(req.length === 0, 'neither events file is fetched until a page needs it');

/* reaching it */
await p.locator('#moreBtn').click();
check(/Economic events/.test(await p.locator('#menu').innerText()) && /Pathways/.test(await p.locator('#menu').innerText()), 'the More menu reaches the events archive and the pathways');
await p.locator('#menu button', { hasText: 'Economic events' }).click(); await p.waitForTimeout(300);

/* archive */
check(await p.evaluate(() => location.hash) === '#/events', 'the archive has its own address');
check(await p.locator('.ev-card').count() === 12, 'the archive lists twelve events');
check(await p.locator('.ev-axis .ev-ax-b').count() === 12, 'the axis draws twelve events');
const overlaps = await p.evaluate(() => { const t = [...document.querySelectorAll('.ev-axis .ev-ax-t')].map(e => e.getBBox()); let o = 0;
  for (let i = 0; i < t.length; i++) for (let j = i + 1; j < t.length; j++) { const a = t[i], c = t[j]; if (a.x < c.x + c.width && c.x < a.x + a.width && a.y < c.y + c.height && c.y < a.y + a.height) o++ } return o });
check(overlaps === 0, `no two labels on the axis overlap (${overlaps})`);
const years = await p.locator('.ev-card .ev-yr').allInnerTexts();
check(years.map(y => +y.slice(0, 4)).every((y, i, a) => !i || y >= a[i - 1]), 'the cards run in date order');
await p.selectOption('.dl-filters select >> nth=0', 'crisis'); await p.waitForTimeout(150);
const crises = await p.locator('.ev-card').count();
check(crises > 0 && crises < 12, `the kind filter narrows the list (${crises})`);
await p.selectOption('.dl-filters select >> nth=0', ''); await p.waitForTimeout(150);

/* one event, end to end */
await p.locator('.ev-card', { hasText: '1991' }).first().click();
await p.waitForSelector('#ev-before', { timeout: 10000 });
check(req.includes('events.js'), 'opening an event loads the events file');
check(await p.evaluate(() => location.hash) === '#/events/archive/india-1991', 'an event has its own address');
check(await p.locator('.ev-rail a').count() === 14, 'the chapter rail lists fourteen chapters');
const pad = await p.evaluate(() => getComputedStyle(document.querySelector('.ev-rail a')).paddingTop);
check(pad === '12px', `the rail links keep their own spacing (${pad})`);
check(await p.locator('#ev-mechanism .ev-chain').count() === 0 && await p.locator('#ev-mechanism .ev-opts button').count() >= 3, 'the mechanism waits for a prediction');
await p.locator('#ev-mechanism .ev-opts button').first().click(); await p.waitForTimeout(200);
check(await p.locator('#ev-mechanism .ev-chain').count() === 1 && await p.locator('#ev-mechanism .ev-verdict').count() === 1, 'predicting opens the mechanism with a verdict');
const t0 = await p.locator('.ev-tlbody').innerText();
await p.locator('.ev-tlnav button[aria-label="Later"]').click(); await p.waitForTimeout(150);
check(await p.locator('.ev-tlbody').innerText() !== t0 && await p.locator('.ev-tl button[aria-selected="true"]').count() === 1, 'the timeline steps forward and marks one step');
await p.waitForSelector('#ev-data figure.ev-chart svg', { timeout: 10000 });
check(req.includes('history.js'), 'the data chapter loads the history series');
check(await p.locator('#ev-data .dl-mark').count() >= 1, 'the charts mark the event on the time axis');
check(await p.locator('#ev-data .dl-src').count() === await p.locator('#ev-data figure.ev-chart').count(), 'every chart names its source');
await p.locator('#ev-whatif .ev-opts button').first().click(); await p.waitForTimeout(200);
check(await p.locator('#ev-whatif .ev-verdict').count() === 1, 'choosing a what-if opens the discussion');
check(await p.locator('.ev-st').count() > 10, 'statements carry fact, interpretation, inference or controversy labels');

/* every event: its page renders and every chart it promises draws */
const all = await p.evaluate(() => window.__EVENTS__.events.map(e => [e.id, e.charts.length]));
for (const [id, n] of all) {
  await p.evaluate(id => nav('events', 0, id), id); await p.waitForTimeout(250);
  const figs = await p.locator('#ev-data figure.ev-chart').count();
  const secs = await p.locator('.ev-sec, section[id^="ev-"]').count();
  check(figs === n && secs >= 14, `${id}: ${figs} of ${n} charts draw, ${secs} chapters`);
}

/* refresh and Back/Forward */
await p.evaluate(() => nav('events', 0, 'gfc-2008')); await p.waitForTimeout(200);
await p.reload(); await p.evaluate(() => { try { splashEnd(true) } catch (e) {} }); await p.waitForSelector('#ev-before', { timeout: 10000 });
check(/financial/i.test(await p.locator('.ev-h1').innerText()), 'refreshing an event keeps it');
await p.evaluate(() => nav('events', 1)); await p.waitForTimeout(250);
await p.goBack(); await p.waitForTimeout(400);
check(await p.evaluate(() => location.hash) === '#/events/archive/gfc-2008', 'Back returns to the event');
await p.goForward(); await p.waitForTimeout(400);
check(await p.evaluate(() => location.hash) === '#/events/compare-events', 'Forward returns to the comparison');

/* compare and history */
check(await p.locator('.ev-ctab tbody tr').count() >= 8, 'the comparison sets the events side by side');
await p.selectOption('.dl-filters select >> nth=1', 'oil-1979'); await p.waitForTimeout(200);
check(/second oil/i.test(await p.locator('.ev-ctab thead').innerText()), 'changing an event changes the comparison');
await p.evaluate(() => nav('events', 2)); await p.waitForTimeout(250);
check(await p.locator('.ev-hist .id-tl-n').count() >= 16 && await p.locator('.ev-hist .ev-ax-b').count() === 12, 'the history timeline shows the economists and the twelve events');
const clipped = await p.evaluate(() => [...document.querySelectorAll('.ev-hist .id-tl-n')].some(t => t.getBBox().x < 0));
check(!clipped, 'no economist name is cut off on the left');

/* pathways */
await p.evaluate(() => nav('paths', 0)); await p.waitForTimeout(250);
check(await p.locator('.pa-card').count() === 6, 'six pathways');
await p.locator('.pa-card', { hasText: 'Civil services' }).getByRole('button', { name: 'Make this my path' }).click(); await p.waitForTimeout(200);
check(await p.evaluate(() => S.path) === 'civil', 'choosing a path is kept');
await p.evaluate(() => nav('home')); await p.waitForTimeout(300);
check(/Your path: Civil services/.test(await p.locator('.pa-band').innerText()), 'the home page leads with the chosen path');
await p.evaluate(() => { S.path = ''; save(); nav('paths', 1) }); await p.waitForTimeout(400);
await p.waitForSelector('.dl-stack svg', { timeout: 10000 });
check(await p.locator('.dl-stack .dl-card').count() >= 2, 'the Indian economy hub charts India against the world');
check(await p.locator('.in-themes li').count() >= 25, 'the hub lists the India cases by theme');

/* search */
await p.evaluate(() => { SIDX = null });
const found = await p.evaluate(() => cpMatch('plaza accord').slice(0, 3).map(x => x.k + ':' + x.t));
check(found.some(f => /^Economic event:/.test(f)), `search finds an event by name (${found[0]})`);

/* the error state: a fresh page whose events file fails */
const ctx2 = await b.newContext({ viewport: { width: 390, height: 844 } });
await ctx2.route(/assets\/data\/events\.js/, r => r.abort());
const { p: q, errors: e2 } = await open(ctx2, base + '#/events/archive/asia-1997');
await q.waitForTimeout(1500);
check(/could not be loaded/.test(await q.locator('main').innerText()) && await q.getByRole('button', { name: 'Try again' }).count() >= 1, 'a missing events file says so and offers to try again');
check(e2.length === 0, `no page errors when the file fails (${e2.join(' | ')})`);

/* widths */
for (const w of [320, 390, 768, 1024, 1440]) {
  await p.setViewportSize({ width: w, height: 900 });
  for (const r of ['#/events', '#/events/archive/india-1991', '#/events/compare-events', '#/events/economics-through-time', '#/paths', '#/paths/the-indian-economy']) {
    await p.evaluate(r => location.hash = r, r); await p.waitForTimeout(350);
    const ov = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    if (ov > 1) check(false, `${r} at ${w}px scrolls sideways by ${ov}px`);
  }
}
check(true, 'no route scrolls sideways at 320, 390, 768, 1024 or 1440px');
check(errors.length === 0, `no page errors (${errors.join(' | ')})`);
await b.close(); srv.close(); done();
