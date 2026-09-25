/* What a user actually does: navigate, go back, reload, share a link, search,
   and use Economics, Everywhere's interactions, including what persists. */
import { serve, browser, open, check, done } from './lib.mjs';
const { srv, base } = await serve();
const b = await browser();
const ctx = await b.newContext({ viewport: { width: 1366, height: 900 } });
const { p, errors } = await open(ctx, base);
const st = () => p.evaluate(() => ({ v: VIEW, t: TAB, a: ARG, h: location.hash }));

/* routing */
await p.locator('#mainnav button', { hasText: 'Real World' }).first().click();
check((await st()).h === '#/world', 'a primary navigation click writes an address');
await p.locator('#subnavin button').nth(2).click();
const tabHash = (await st()).h;
await p.evaluate(() => nav('lab', 3, 'ped'));
check((await st()).h === '#/lab/diagram-atlas/ped', 'an opened item has its own address');
await p.goBack(); await p.waitForTimeout(150);
check((await st()).h === tabHash, 'Back returns to the previous tab');
await p.goBack(); await p.waitForTimeout(150); await p.goBack(); await p.waitForTimeout(150);
check((await st()).v === 'home', 'Back returns home rather than leaving the site');
await p.evaluate(() => nav('lab', 3, 'ped')); await p.reload({ waitUntil: 'load' });
await p.waitForFunction(() => !document.getElementById('splash'), null, { timeout: 4000 }).catch(() => {});
const s1 = await st();
check(s1.v === 'lab' && s1.t === 3 && s1.a === 'ped', 'a reload keeps the reader in place');

/* search: palette, filters, and the two buttons that used to do nothing */
await p.evaluate(() => nav('home')); await p.waitForTimeout(100);
await p.evaluate(() => openSearch()); await p.waitForTimeout(100);
check(await p.locator('#cpal').count() === 1, 'openSearch() opens the search');
await p.keyboard.type('flight'); await p.waitForTimeout(100);
await p.locator('.cpchip', { hasText: 'Economics, Everywhere' }).click(); await p.waitForTimeout(100);
const kinds = await p.evaluate(() => [...document.querySelectorAll('.cprow .k')].map(x => x.textContent));
check(kinds.length > 0 && kinds.every(k => /^Everywhere/.test(k)), 'a search filter returns only its own kind', kinds.join(', '));
await p.keyboard.press('Enter'); await p.waitForTimeout(250);
check((await st()).v === 'everywhere', 'Enter opens the chosen result');

/* Economics, Everywhere */
await p.evaluate(() => nav('everywhere', 1, 'q-who-pays-tax')); await p.waitForTimeout(200);
check(/Who really pays a tax/.test(await p.locator('#eelab-tax').innerText()), 'an explainer embeds its lab');
const before = await p.locator('#eeout-tax .ee-read').innerText();
const slider = await p.$('#ee-tax-b');
await slider.focus();
await slider.evaluate(e => { e.value = '6'; e.dispatchEvent(new Event('input', { bubbles: true })); }); await p.waitForTimeout(100);
const after = await p.locator('#eeout-tax .ee-read').innerText();
check(before !== after, 'moving a lab control changes the result without reloading the page');
check(await slider.evaluate(e => e.isConnected && document.activeElement === e),
  'the slider is not replaced while the result redraws, so it keeps focus and can be dragged');
await p.getByRole('button', { name: /Show me why: step 2/ }).click();
check(await p.locator('#ee-steps li').count() === 2, 'Show me why reveals the mechanism one step at a time');
await p.locator('#ee-think .ee-opt').first().click();
check(await p.locator('#ee-think .ee-fb').count() === 1, 'a prediction is followed by the reasoning');
await p.locator('#ee-lv button', { hasText: 'Advanced' }).click();
check(/Pass-through|pass-through/.test(await p.locator('#ee-lv').innerText()), 'the level control switches the explanation');
await p.getByRole('button', { name: /Save/ }).first().click(); await p.waitForTimeout(100);
await p.reload({ waitUntil: 'load' }); await p.waitForTimeout(300);
const saved = await p.evaluate(() => svList().some(x => x.k === 'ee' && x.id === 'q-who-pays-tax'));
check(saved, 'a saved explainer survives a reload (stored on this device)');
const lvl = await p.evaluate(() => S.ee && S.ee.lvl);
check(lvl === 3, 'the chosen explanation level is remembered');
await p.evaluate(() => nav('everywhere')); await p.waitForTimeout(150);
check(/Continue exploring/.test(await p.locator('#view').innerText()), 'recently opened pieces appear under Continue exploring');
check(await p.evaluate(() => (S.activity || []).some(a => a.kind === 'Economics, Everywhere')), 'opening a piece joins the platform-wide continue-learning record');
await p.evaluate(() => nav('everywhere', 5)); await p.waitForTimeout(100);
await p.locator('.ee-opt').first().click(); await p.waitForTimeout(100);
check(await p.locator('.ee-fb').count() === 1, "the Economist's Eye marks an answer and explains it");
await p.evaluate(() => nav('everywhere', 4, 'game')); await p.waitForTimeout(100);
for (let i = 0; i < 8; i++) await p.getByRole('button', { name: 'Keep price high' }).click();
check(/Final score/.test(await p.locator('#eelab-game').innerText()), 'the pricing game plays eight rounds to a debrief');

/* assignment links are never rewritten */
const payload = Buffer.from(JSON.stringify({ t: 'Week 3', i: [['q', 'x']] })).toString('base64');
const a = await open(ctx, base + '#assign=' + payload);
await a.p.locator('button[onclick="assignOpen()"]').click(); await a.p.waitForTimeout(150);
check((await a.p.evaluate(() => location.hash)).startsWith('#assign='), 'an assignment link survives opening the assignment');
check(errors.length === 0 && a.errors.length === 0, 'no page errors during the journey', errors.concat(a.errors).join(' | '));
await b.close(); srv.close(); done();
