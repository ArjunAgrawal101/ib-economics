/* The major routes and every kind of Economics, Everywhere page at the
   fifteen widths the brief names, four widths at a time: no horizontal overflow, no page errors, no control smaller than a
   usable touch target in the new section, and no sideways-scrolling table a
   keyboard cannot reach. */
import { serve, browser, open, check, done } from './lib.mjs';
const { srv, base } = await serve();
const b = await browser();
const WIDTHS = [320, 360, 375, 390, 414, 430, 768, 834, 1024, 1280, 1366, 1440, 1600, 1920, 2560];
const ROUTES = ['', '#/course', '#/learn', '#/world', '#/mind', '#/lab/diagram-atlas', '#/practise', '#/examiner', '#/calculate', '#/tools',
  '#/everywhere', '#/everywhere/big-questions', '#/everywhere/big-questions/q-flights', '#/everywhere/big-questions/q-unemployment',
  '#/everywhere/in-real-life/r-surge', '#/everywhere/one-idea/i-externality', '#/everywhere/labs/trade', '#/everywhere/labs/adas',
  '#/everywhere/labs/game', '#/everywhere/economist-s-eye', '#/everywhere/where-the-numbers-live',
  '#/ees', '#/ees/research-question-lab', '#/ees/find-your-topic/microeconomics', '#/ees/theory-and-models/fx', '#/ees/data-lab', '#/ees/evidence-matrix',
  '#/ees/academic-integrity-and-ai', '#/ees/quality-check', '#/ees/supervisor-mode', '#/arjun', '#/educator', '#/educator/handbook',
  '#/think/economist-s-toolkit', '#/lab/diagram-atlas/tax', '#/learn/concept-spine/c-cadv', '#/world/real-world-economics/MIC-001',
  '#/about', '#/lab/elasticity-lab', '#/papers', '#/dna', '#/mind/market', '#/ideas', '#/think/why-did-this-happen', '#/data'];
const results = {};
const queue = [...WIDTHS];
await Promise.all([0, 1, 2, 3].map(async () => { for (let w; (w = queue.shift()) !== undefined;) {
  const ctx = await b.newContext({ viewport: { width: w, height: 800 } });
  const bad = [];
  for (const r of ROUTES) {
    const { p, errors } = await open(ctx, base + r);
    const m = await p.evaluate(() => {
      const ov = document.documentElement.scrollWidth - innerWidth;
      const small = [...document.querySelectorAll('#view .ee-lab button, #view .ee-opt, #view .ee-chip, #view .ee-card, #view .es-tile, #view .es-opt, #view .pw-w, #view .edu-toc button, #view .atl, #view .atx, #view .tk-lens, #view .td-card .lnk, #view .mn-node')]
        .filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.height < 28 || r.width < 28); }).length;
      /* a table that scrolls sideways must be reachable from the keyboard */
      const unreach = [...document.querySelectorAll('#view .scrollx')]
        .filter(e => e.scrollWidth > e.clientWidth + 1 && e.tabIndex < 0 && !e.querySelector('a[href],button,input,select,textarea,[tabindex]')).length;
      return { ov, small, unreach };
    });
    if (m.ov > 1 || m.small || m.unreach || errors.length) bad.push(`${r || 'home'} ${JSON.stringify(m)} ${errors.join(' ')}`);
    await p.close();
  }
  results[w] = bad;
  await ctx.close();
} }));
for (const w of WIDTHS) check(results[w].length === 0, `${ROUTES.length} routes at ${w}px: no overflow, no errors, usable targets, scrolling tables reachable`, results[w].join('\n     '));
await b.close(); srv.close(); done();
