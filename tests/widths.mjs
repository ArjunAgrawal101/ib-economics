/* The major routes and every kind of Economics, Everywhere page at eight
   widths: no horizontal overflow, no page errors, no control smaller than a
   usable touch target in the new section, and no sideways-scrolling table a
   keyboard cannot reach. */
import { serve, browser, open, check, done } from './lib.mjs';
const { srv, base } = await serve();
const b = await browser();
const WIDTHS = [320, 375, 390, 412, 768, 1024, 1280, 1440];
const ROUTES = ['', '#/course', '#/learn', '#/world', '#/mind', '#/lab/diagram-atlas', '#/practise', '#/examiner', '#/calculate', '#/tools',
  '#/everywhere', '#/everywhere/big-questions', '#/everywhere/big-questions/q-flights', '#/everywhere/big-questions/q-unemployment',
  '#/everywhere/in-real-life/r-surge', '#/everywhere/one-idea/i-externality', '#/everywhere/labs/trade', '#/everywhere/labs/adas',
  '#/everywhere/labs/game', '#/everywhere/economist-s-eye', '#/everywhere/where-the-numbers-live'];
for (const w of WIDTHS) {
  const ctx = await b.newContext({ viewport: { width: w, height: 800 } });
  const bad = [];
  for (const r of ROUTES) {
    const { p, errors } = await open(ctx, base + r);
    const m = await p.evaluate(() => {
      const ov = document.documentElement.scrollWidth - innerWidth;
      const small = [...document.querySelectorAll('#view .ee-lab button, #view .ee-opt, #view .ee-chip, #view .ee-card')]
        .filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.height < 28 || r.width < 28); }).length;
      /* a table that scrolls sideways must be reachable from the keyboard */
      const unreach = [...document.querySelectorAll('#view .scrollx')]
        .filter(e => e.scrollWidth > e.clientWidth + 1 && e.tabIndex < 0 && !e.querySelector('a[href],button,input,select,textarea,[tabindex]')).length;
      return { ov, small, unreach };
    });
    if (m.ov > 1 || m.small || m.unreach || errors.length) bad.push(`${r || 'home'} ${JSON.stringify(m)} ${errors.join(' ')}`);
    await p.close();
  }
  check(bad.length === 0, `${ROUTES.length} routes at ${w}px: no overflow, no errors, usable targets, scrolling tables reachable`, bad.join('\n     '));
  await ctx.close();
}
await b.close(); srv.close(); done();
