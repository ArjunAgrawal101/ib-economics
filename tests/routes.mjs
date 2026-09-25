/* Every section and tab, opened cold as a deep link, at a phone width and a
   desktop width: it must open, render, pass the self-tests and not overflow. */
import { serve, browser, check, done } from './lib.mjs';
const { srv, base } = await serve();
const b = await browser();
const p0 = await b.newPage(); await p0.goto(base, { waitUntil: 'load' });
const routes = await p0.evaluate(() => SECTIONS.flatMap(s => (s.tabs || [null]).map((_, i) => [s.v, i, routeFormat(s.v, i, null)])));
await p0.close();
for (const [label, vp] of [['375px', { width: 375, height: 740 }], ['1366px', { width: 1366, height: 900 }]]) {
  const queue = [...routes], bad = [];
  await Promise.all([0, 1, 2, 3].map(async () => {
    const ctx = await b.newContext({ viewport: vp });
    while (queue.length) {
      const [v, t, h] = queue.shift();
      const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
      await p.goto(base + h, { waitUntil: 'load' }); await p.waitForTimeout(200);
      const r = await p.evaluate(() => ({ v: VIEW, t: TAB, f: window.__failed || ['no qa'],
        ov: document.documentElement.scrollWidth - innerWidth, len: document.getElementById('view').innerHTML.length }));
      if (!(r.v === v && r.t === t && r.f.length === 0 && !errs.length && r.ov <= 1 && r.len > 300)) bad.push(`${h} ${JSON.stringify(r)} ${errs.join(' ')}`);
      await p.close();
    }
    await ctx.close();
  }));
  check(bad.length === 0, `${routes.length} routes open cold at ${label}`, bad.slice(0, 5).join('\n     '));
}
await b.close(); srv.close(); done();
