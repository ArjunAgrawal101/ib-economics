/* The data lab, economists and ideas, Why did this happen?, and the simpler
   navigation, in a real browser: interactions, lazy loading, the error state,
   deep links, refresh, Back/Forward, and no sideways scrolling at three widths. */
import { serve, browser, open, check, done } from './lib.mjs';
const { srv, base } = await serve();
const b = await browser();
const ctx = await b.newContext({ viewport: { width: 1366, height: 900 } });
const req = [];
ctx.on('request', r => { if (/assets\/data\/(econ-data|ideas)\.js/.test(r.url())) req.push(r.url().split('/').pop()) });
const { p, errors } = await open(ctx, base);
check(req.length === 0, 'neither new data file is fetched until a page needs it');

/* navigation */
const bar = await p.evaluate(() => SECTIONS.filter(s => s.pri).map(s => s.v));
check(bar.length === 8 && bar[0] === 'course', `the bar keeps eight items (${bar.join(', ')})`);
await p.locator('#moreBtn').click();
const menu = await p.locator('#menu').innerText();
check(/Economic data/.test(menu) && /Economists and ideas/.test(menu) && /Why did this happen\?/.test(menu) && /EE Studio/.test(menu), 'the More menu groups the new surfaces with the studios');
await p.locator('#menu button', { hasText: 'Economic data' }).click(); await p.waitForTimeout(300);

/* data explorer */
await p.waitForSelector('#dl-main svg', { timeout: 10000 });
check(req.includes('econ-data.js'), 'opening a data page loads the data file');
check(await p.evaluate(() => location.hash) === '#/data/data-explorer' || await p.evaluate(() => location.hash) === '#/data', 'the explorer has its own address');
const lines = await p.locator('#dl-main path').count();
check(lines >= 3, `the default chart draws a line per economy (${lines} paths)`);
await p.selectOption('#dl-add', 'BRA'); await p.waitForTimeout(200);
check(await p.locator('.dl-chip').count() === 4, 'adding an economy adds its chip and line');
const colours = await p.evaluate(() => [...document.querySelectorAll('.dl-chip i')].map(i => i.style.background));
await p.locator('.dl-chip button').first().click(); await p.waitForTimeout(200);
const after = await p.evaluate(() => [...document.querySelectorAll('.dl-chip i')].map(i => i.style.background));
check(after.join() === colours.slice(1).join(), 'removing an economy leaves the others their colours');
await p.selectOption('#dl-ind', 'gdppc'); await p.waitForTimeout(200);
check(/GDP per capita/.test(await p.locator('.dl-t').innerText()) && /Computed by this platform/.test(await p.locator('.dl-src').innerText()), 'a computed series says it was computed');
const box = await p.locator('#dl-main-hit').boundingBox();
await p.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.5); await p.waitForTimeout(100);
check(await p.locator('#dl-main-tip').isVisible() && /\d{4}/.test(await p.locator('#dl-main-tip').innerText()), 'hovering shows the year and every value');
await p.locator('#dl-main-hit').focus(); await p.keyboard.press('Home'); await p.waitForTimeout(80);
const first = await p.locator('#dl-main-tip .dl-tip-h').innerText();
await p.keyboard.press('ArrowRight'); await p.waitForTimeout(80);
check(+await p.locator('#dl-main-tip .dl-tip-h').innerText() === +first + 1, 'the arrow keys move along the chart a year at a time');
await p.locator('.dl-tbl summary').first().click();
check(await p.locator('.dl-tbl table tbody tr').count() > 10, 'the numbers behind the chart open as a table');
check(/World Bank/.test(await p.locator('.dl-src').innerText()) && /Retrieved 2026-10-01/.test(await p.locator('.dl-src').innerText()), 'every chart names its source and the retrieval date');

/* profiles, markets, sources */
await p.evaluate(() => nav('data', 1)); await p.waitForTimeout(300);
await p.selectOption('.dl-filters select', 'KEN'); await p.waitForTimeout(300);
check(await p.locator('.dl-mini').count() >= 5 && /Kenya/.test(await p.locator('h2.mt4').innerText()), 'a country profile shows every indicator for the economy chosen');
await p.evaluate(() => nav('data', 2)); await p.waitForTimeout(300);
check(await p.locator('.dl-chart svg').count() >= 4, 'markets and prices draws oil, yields, unemployment and an exchange rate');
await p.evaluate(() => nav('data', 3)); await p.waitForTimeout(300);
check((await p.locator('tbody tr').count()) >= 10 && /mislabels|labels this column/.test(await p.locator('main, #view').first().innerText()), 'sources and method lists every series and records the package that mislabels inflation');

/* economists and ideas */
await p.evaluate(() => nav('ideas', 0)); await p.waitForTimeout(200);
check(await p.locator('.id-card').count() === 16, 'all sixteen economists are listed');
await p.locator('.id-card', { hasText: 'Elinor Ostrom' }).click(); await p.waitForSelector('.id-ideas', { timeout: 10000 });
check(req.includes('ideas.js') && await p.locator('.id-ideas li').count() >= 3 && /Criticisms and limits/i.test(await p.locator('#view').innerText()), 'a profile loads its full text: ideas, criticisms and limits');
check(await p.evaluate(() => location.hash) === '#/ideas/economists/ostrom', 'a profile has its own address');
await p.locator('.id-side .kcchip').first().click(); await p.waitForTimeout(300);
check(await p.evaluate(() => VIEW) === 'course', 'a profile links straight into the lesson that uses the idea');
await p.goBack(); await p.waitForTimeout(400);
check(await p.evaluate(() => VIEW === 'ideas' && ARG === 'ostrom'), 'Back returns to the profile');
await p.goForward(); await p.waitForTimeout(400);
check(await p.evaluate(() => VIEW) === 'course', 'Forward returns to the lesson');
await p.evaluate(() => nav('ideas', 1)); await p.waitForTimeout(200);
check(await p.locator('.id-tl rect').count() === 16, 'the timeline draws a lifespan for each economist');

/* why did this happen? */
await p.evaluate(() => { delete (S.why || {}).currency; nav('think', WHYTAB(), 'currency') }); await p.waitForTimeout(300);
check(await p.locator('.why-st').count() === 1 && await p.locator('.why-pred fieldset').count() >= 4, 'a pathway opens on its first step with a prediction to commit to');
const nvar = await p.locator('.why-pred fieldset').count();
for (let i = 0; i < nvar; i++) await p.locator(`.why-pred fieldset:nth-of-type(${i + 1}) input[value="up"]`).check();
for (let s = 2; s <= 6; s++) { await p.locator('button', { hasText: /^Next:/ }).click(); await p.waitForTimeout(120) }
check(await p.locator('.why-st').count() === 6 && await p.locator('.why-vars .why-ok, .why-vars .why-no').count() === nvar, 'stepping on reaches the variables, where every prediction is marked');
await p.locator('button', { hasText: 'Show every step' }).click(); await p.waitForTimeout(150);
check(await p.locator('.why-st').count() === 11 && await p.locator('.why-alt').count() >= 2, 'all eleven steps, ending with the explanations to rule out');

/* deep link and refresh */
const p2 = await ctx.newPage(); const e2 = [];
p2.on('pageerror', e => e2.push(e.message));
await p2.goto(base + '#/ideas/economists/sen', { waitUntil: 'load' });
await p2.waitForFunction(() => window.__APP_READY === true, null, { timeout: 60000 });
await p2.waitForSelector('.id-ideas', { timeout: 15000 });
check(/Amartya Sen/.test(await p2.locator('h1').first().innerText()), 'a cold deep link opens the profile');
await p2.reload({ waitUntil: 'load' }); await p2.waitForFunction(() => window.__APP_READY === true, null, { timeout: 60000 });
await p2.waitForSelector('.id-ideas', { timeout: 15000 });
check(/Amartya Sen/.test(await p2.locator('h1').first().innerText()) && e2.length === 0, 'a refresh keeps the profile');
await p2.close();

/* the error state */
const c3 = await b.newContext({ viewport: { width: 1366, height: 900 } });
await c3.route('**/assets/data/econ-data.js', r => r.abort());
const { p: p3 } = await open(c3, base + '#/data');
await p3.waitForTimeout(800);
check(/could not be loaded/.test(await p3.locator('#view').innerText()) && await p3.locator('button', { hasText: 'Try again' }).count() === 1, 'if the data file fails, the page says so and offers a retry, showing no numbers');
await c3.close();

/* widths */
const routes = [['data', 0], ['data', 1], ['data', 2], ['data', 3], ['ideas', 0], ['ideas', 1], ['ideas', 0, 'keynes'], ['think', 'why'], ['think', 'why', 'inflation']];
for (const w of [360, 768, 1440]) {
  await p.setViewportSize({ width: w, height: 900 });
  const bad = [];
  for (const [v, t, a] of routes) {
    await p.evaluate(([v, t, a]) => { if (a === 'inflation') whyS('inflation').step = 11; nav(v, t === 'why' ? WHYTAB() : t, a) }, [v, t, a || null]); await p.waitForTimeout(250);
    const o = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (o > 1) bad.push(`${v}/${t}/${a || ''}: ${o}px`);
  }
  check(bad.length === 0, `${w}px · no new page scrolls sideways`, bad.join(' | '));
}
check(errors.length === 0, 'no page errors', errors.join(' | '));
await b.close(); srv.close(); done();
