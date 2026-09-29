/* The cover-and-composition release, driven the way a reader uses it: the
   cover's movable market, the portrait's clearance on the home and About
   pages, case links, case intelligence, mindmap connections, the exam rooms
   and the elasticity lab. Overlap is measured from rendered boxes. */
import { serve, browser, open, check, done } from './lib.mjs';
const { srv, base } = await serve();
const b = await browser();
const st = p => p.evaluate(() => ({ v: VIEW, t: TAB, a: ARG }));
const box = (p, sel) => p.locator(sel).first().boundingBox();
const meet = (a, c) => a && c && a.x < c.x + c.width && c.x < a.x + a.width && a.y < c.y + c.height && c.y < a.y + a.height;
const allErrors = [];

for (const [w, h] of [[1440, 900], [1024, 768], [390, 844], [320, 640]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } });
  const { p, errors } = await open(ctx, base);
  const plate = await box(p, '.cv-plate'), por = await box(p, '.cv-portrait');
  check(plate && por && !meet(plate, por), `${w}px · the cover's portrait and its model never overlap`);
  const txt = await p.evaluate(() => [...document.querySelectorAll('.cv-copy h1, .cv-copy p, .cv-cta .btn')].map(e => e.getBoundingClientRect().toJSON()));
  check(!txt.some(r => meet(r, por)), `${w}px · no cover text runs over the portrait`);
  check(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${w}px · the cover causes no sideways scroll`);
  await p.goto(base + '#/about'); await p.waitForTimeout(400);
  const ap = await box(p, '.ab-portrait'), pn = await box(p, '.ab-panel');
  check(ap && pn && !meet(ap, pn), `${w}px · on About, the portrait and the economics panel never overlap`);
  check(await p.evaluate(() => { const f = document.querySelector('.ab-portrait').getBoundingClientRect();
    return ![...document.querySelectorAll('#view svg')].some(s => { const r = s.getBoundingClientRect(); return r.width > 0 && r.x < f.right && f.x < r.right && r.y < f.bottom && f.y < r.bottom }) }),
    `${w}px · no figure is drawn over or under the About portrait`);
  allErrors.push(...errors); await ctx.close();
}

const ctx = await b.newContext({ viewport: { width: 1366, height: 900 } });
const { p, errors } = await open(ctx, base);
/* the movable market */
const r0 = await p.textContent('#cv-read');
await p.locator('#cv-shift').fill('2'); await p.dispatchEvent('#cv-shift', 'input');
const r1 = await p.textContent('#cv-read');
check(r0 !== r1 && /shortage/.test(r1), 'moving demand on the cover redraws the market and explains the shortage', r1);
await p.locator('#cv-shift').fill('-2'); await p.dispatchEvent('#cv-shift', 'input');
check(/surplus/.test(await p.textContent('#cv-read')), 'moving demand down explains the surplus');
await p.locator('.cv-sig').first().click(); await p.waitForTimeout(200);
check((await st(p)).v === 'world', 'a scale signal opens what it counts');
await p.evaluate(() => nav('home')); await p.waitForTimeout(200);
await p.locator('.cv-cta .btn').first().click(); await p.waitForTimeout(200);
check((await st(p)).v !== 'home', 'Start learning leaves the cover');
await p.evaluate(() => nav('home')); await p.waitForTimeout(200);
check(await p.locator('.rn-hinge').count() === 1 && await p.locator('.rn-final').count() === 1, 'the home page runs from the hinge to the closing invitation');
const order = await p.evaluate(() => [...document.querySelectorAll('.rn-chap .ch-t, .rn-hinge .ch-t')].map(e => e.textContent.trim()));
check(order.join('|').startsWith('The platform|The world|The theory|The lab|The exam|The research|The media|The educator|The creator'), 'the chapters run in the narrative order', order.join('|'));
/* case links */
const id = await p.evaluate(() => RW_CASES[3].id);
await p.evaluate(i => nav('world', 0, i), id); await p.waitForTimeout(300);
check(await p.locator('section.ci').count() === 1, 'a case link opens the case, led by its case intelligence');
/* mindmap */
await p.evaluate(() => nav('mind')); await p.waitForTimeout(300);
await p.evaluate(() => nav('mind', 0, 'market')); await p.waitForTimeout(300);
const hasFurther = await p.evaluate(async () => { const n = document.querySelector('#view [onclick*="mmTap(\'market\',\'dem\')"]'); if (!n) return 'no node'; n.dispatchEvent(new MouseEvent('click', { bubbles: true })); await new Promise(r => setTimeout(r, 300)); return !!document.querySelector('.mm-further') });
check(hasFurther === true, 'a mindmap node offers ways to go further', String(hasFurther));
/* exam rooms */
await p.evaluate(() => nav('examiner', 0)); await p.waitForTimeout(300);
check(await p.locator('.rooms .room').count() === 10 && await p.locator('.rooms .room[aria-current="page"]').count() === 1, 'the exam area names its rooms and marks the current one');
await p.locator('.rooms .room', { hasText: 'Paper 2 room' }).click(); await p.waitForTimeout(300);
check(await p.evaluate(() => VIEW === 'papers' && SECTIONS.find(s => s.v === 'papers').tabs[TAB] === 'Paper 2 data lab'), 'a room opens its tab');
/* the elasticity lab */
await p.evaluate(() => nav('lab', SECTIONS.find(s => s.v === 'lab').tabs.indexOf('Elasticity lab'))); await p.waitForTimeout(300);
await p.locator('#el-q').fill('20'); await p.dispatchEvent('#el-q', 'input');
const out = await p.textContent('#el-out');
check(/-2\.00/.test(out) && /price elastic/.test(out) && /falls/.test(out), 'the elasticity lab computes PED and the revenue change', out);
await p.getByRole('button', { name: 'Price falls' }).click(); await p.waitForTimeout(200);
check(/rises/.test(await p.textContent('#el-out')), 'with elastic demand, a price cut raises revenue');
allErrors.push(...errors);
check(allErrors.length === 0, 'no page errors across these journeys', allErrors.join(' | '));
await b.close(); srv.close(); done();
