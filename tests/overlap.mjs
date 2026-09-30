/* The overlap audit. Every visible atomic element on a route (a run of text,
   an image, a figure, a control) is measured from its rendered box, clipped to
   any scrolling or clipping container it sits in, and compared with every
   other: two elements whose boxes intersect, where neither contains the
   other, are reported. Inside each figure, text labels are compared with one
   another the same way. The portraits are compared with everything. It runs
   across the key routes at the fifteen widths the brief names.
   An element is reported once per pair; a small tolerance absorbs
   sub-pixel antialiasing and the one-pixel borders that touch by design. */
import { serve, browser, open, check, done } from './lib.mjs';
import fs from 'node:fs';
const { srv, base } = await serve();
const b = await browser();
const WIDTHS = (process.env.WIDTHS || '320,360,375,390,414,430,768,834,1024,1280,1366,1440,1600,1920,2560').split(',').map(Number);
const ROUTES = (process.env.ROUTES ? process.env.ROUTES.split(',') : ['', '#/about', '#/world', '#/world/real-world-economics/MIC-001', '#/mind/market',
  '#/lab', '#/lab/elasticity-lab', '#/lab/diagram-atlas/tax', '#/examiner', '#/papers', '#/dna', '#/learn/concept-spine/c-ped', '#/everywhere',
  '#/ees', '#/videos', '#/educator', '#/think/economist-s-toolkit', '#/calculate', '#/course', '#/tutorials',
  '#/course/topics/2.5', '#/course/topics/unit-3', '#/course/dictionary', '#/course/command-terms', '#/learn/misconception-lab',
  '#/think/inquiry-tools', '#/mind/mindmaps/snap-2.8', '#/papers/paper-2-data-lab', '#/papers/paper-3-recommendation-lab']);

function audit() {
  const TOL = 3;
  const vis = e => { const s = getComputedStyle(e); return s.display !== 'none' && s.visibility !== 'hidden' && +s.opacity > 0.05 };
  /* a closed <details> shows only its own summary: a summary nested deeper inside it is hidden too */
  const shown = e => { const sm = e.closest('summary'); for (let x = e; x && x !== document.body; x = x.parentElement) { if (!vis(x)) return false; if (x.tagName === 'DETAILS' && !x.open && x !== e && !(sm && sm.parentElement === x)) return false } return true };
  /* the part of an element's box that can actually be seen, after every clipping ancestor */
  const clip = e => {
    let r = e.getBoundingClientRect(); r = { l: r.left, t: r.top, r: r.right, b: r.bottom };
    for (let x = e.parentElement; x && x !== document.documentElement; x = x.parentElement) {
      const s = getComputedStyle(x);
      if (/(hidden|auto|scroll|clip)/.test(s.overflowX + s.overflowY)) { const c = x.getBoundingClientRect();
        r = { l: Math.max(r.l, c.left), t: Math.max(r.t, c.top), r: Math.min(r.r, c.right), b: Math.min(r.b, c.bottom) } }
      if (s.position === 'fixed') break }
    return r.r - r.l > 1 && r.b - r.t > 1 ? { l: r.l, t: r.t + scrollY, r: r.r, b: r.b + scrollY } : null };
  const name = e => { const c = (e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className) || '';
    const t = (e.textContent || e.getAttribute('aria-label') || e.alt || '').trim().replace(/\s+/g, ' ').slice(0, 40);
    return `${e.tagName.toLowerCase()}${e.id ? '#' + e.id : ''}${c ? '.' + String(c).trim().split(/\s+/).slice(0, 2).join('.') : ''}${t ? ` "${t}"` : ''}` };
  const root = document.body;
  const atoms = [];
  const walker = root.querySelectorAll('*');
  for (const e of walker) {
    if (e.closest('svg') && e.tagName.toLowerCase() !== 'svg') continue;       /* figures are one atom; their text is checked below */
    if (e.closest('#drawer:not(.on), .sr, .sr-only, [hidden], template, script, style, noscript, .skip')) continue;
    const tag = e.tagName.toLowerCase();
    const own = [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
    const atom = own || ['img', 'svg', 'input', 'select', 'textarea', 'video', 'iframe', 'canvas'].includes(tag);
    if (!atom || !shown(e)) continue;
    if (tag === 'svg' && e.closest('button, a') && e.getBoundingClientRect().width < 40) continue; /* an icon inside its own control */
    const r = clip(e); if (!r) continue;
    /* text is measured by its line boxes, not its block: a heading that fills a row
       only occupies the width its words take */
    let rs = [r];
    if (own && !['input', 'select', 'textarea'].includes(tag)) { const g = document.createRange(); g.selectNodeContents(e);
      rs = [...g.getClientRects()].map(q => ({ l: Math.max(q.left, r.l), t: Math.max(q.top + scrollY, r.t), r: Math.min(q.right, r.r), b: Math.min(q.bottom + scrollY, r.b) }))
        .filter(q => q.r - q.l > 1 && q.b - q.t > 1); if (!rs.length) continue }
    const deco = e.getAttribute('aria-hidden') === 'true' || !!e.closest('[aria-hidden="true"]');
    atoms.push({ e, r, rs, deco, tag, fixed: !!e.closest('.top, header, #splash, .toast, dialog') });
  }
  const hit = (a, c) => Math.min(a.r, c.r) - Math.max(a.l, c.l) > TOL && Math.min(a.b, c.b) - Math.max(a.t, c.t) > TOL;
  atoms.sort((a, c) => a.r.t - c.r.t);
  const found = [];
  for (let i = 0; i < atoms.length; i++) {
    const A = atoms[i];
    for (let j = i + 1; j < atoms.length && atoms[j].r.t < A.r.b - TOL; j++) {
      const C = atoms[j];
      if (!hit(A.r, C.r) || !A.rs.some(x => C.rs.some(y => hit(x, y)))) continue;
      if (A.e.contains(C.e) || C.e.contains(A.e)) continue;
      if (A.fixed !== C.fixed) continue;                                /* the sticky header is layered by design */
      /* a connector layer (the lines between a map's nodes) is drawn under its nodes by design */
      if ([A, C].some(x => x.tag === 'svg' && /edges|links|wires/.test(x.e.getAttribute('class') || ''))) continue;
      const kind = (A.deco || C.deco) ? 'decorative figure under content' : 'content over content';
      found.push({ kind, a: name(A.e), c: name(C.e) });
    }
  }
  /* text inside each figure */
  for (const s of document.querySelectorAll('svg')) {
    if (!shown(s) || !s.getBoundingClientRect().width) continue;
    const t = [...s.querySelectorAll('text')].filter(x => x.textContent.trim() && vis(x)).map(x => { const r = x.getBoundingClientRect(); return { x, r: { l: r.left, t: r.top, r: r.right, b: r.bottom } } });
    /* a caption drawn by CSS (its text is generated content, so it has no text node) counts as a label of the figure beside it */
    const cap = s.parentElement && s.parentElement.querySelector(':scope > .rn-cap');
    if (cap && vis(cap) && getComputedStyle(cap, '::after').content.length > 2) { const r = cap.getBoundingClientRect(); const g = document.createElement('canvas').getContext('2d'); const cs = getComputedStyle(cap);
      g.font = `${cs.fontSize} ${cs.fontFamily}`; const w = Math.min(r.width, g.measureText(getComputedStyle(cap, '::after').content.slice(1, -1)).width);
      const l = cs.textAlign === 'right' ? r.right - w : r.left; if (r.height) t.push({ x: cap, r: { l, t: r.top, r: l + w, b: r.bottom } }) }
    for (let i = 0; i < t.length; i++) for (let j = i + 1; j < t.length; j++)
      if (Math.min(t[i].r.r, t[j].r.r) - Math.max(t[i].r.l, t[j].r.l) > 1 && Math.min(t[i].r.b, t[j].r.b) - Math.max(t[i].r.t, t[j].r.t) > 1)
        found.push({ kind: 'figure labels collide', a: name(t[i].x), c: name(t[j].x) + ' in ' + name(s) });
  }
  /* a figure label that runs past the edge of its own figure (an SVG clips what falls outside its box) */
  for (const s of document.querySelectorAll('svg')) {
    if (!shown(s) || getComputedStyle(s).overflow === 'visible') continue;
    const k = s.getBoundingClientRect(); if (!k.width) continue;
    for (const x of s.querySelectorAll('text')) { if (!x.textContent.trim() || !vis(x)) continue; const r = x.getBoundingClientRect();
      if (r.width && (r.left < k.left - 1 || r.right > k.right + 1 || r.top < k.top - 1 || r.bottom > k.bottom + 1)) found.push({ kind: 'figure label clipped', a: name(x), c: 'by its own figure ' + name(s) }) }
  }
  /* a figure label cut off by a container that clips without scrolling */
  for (const s of document.querySelectorAll('svg')) {
    if (!shown(s) || !s.getBoundingClientRect().width) continue;
    let c = s.parentElement; while (c && c !== document.body && !/(hidden|clip)/.test(getComputedStyle(c).overflowX + getComputedStyle(c).overflowY)) c = c.parentElement;
    if (!c || c === document.body) continue;
    const cs = getComputedStyle(c); if (/(auto|scroll)/.test(cs.overflowX + cs.overflowY)) continue;
    const k = c.getBoundingClientRect();
    for (const x of s.querySelectorAll('text')) { if (!x.textContent.trim() || !vis(x)) continue; const r = x.getBoundingClientRect();
      if (r.top < k.top - 1 || r.bottom > k.bottom + 1 || r.left < k.left - 1 || r.right > k.right + 1) found.push({ kind: 'figure label clipped', a: name(x), c: 'by ' + name(c) }) }
    const cap = s.parentElement && s.parentElement.querySelector(':scope > .rn-cap');
    if (cap && vis(cap)) { const r = cap.getBoundingClientRect(); if (r.width && (r.top < k.top - 1 || r.bottom > k.bottom + 1)) found.push({ kind: 'figure label clipped', a: 'figure caption', c: 'by ' + name(c) }) }
  }
  return { n: atoms.length, found, ov: document.documentElement.scrollWidth - innerWidth };
}

const report = [];
for (const w of WIDTHS) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
  const { p, errors } = await open(ctx, base);
  for (const r of ROUTES) {
    await p.evaluate(h => { location.hash = h || '#/'; }, r); await p.waitForTimeout(350);
    await p.evaluate(async () => { /* fill lazy figures the way scrolling would */ for (let y = 0; y < document.body.scrollHeight; y += innerHeight) { scrollTo(0, y); await new Promise(f => setTimeout(f, 30)) } scrollTo(0, 0); await new Promise(f => setTimeout(f, 120)) });
    const m = await p.evaluate(audit);
    report.push({ w, route: r || 'home', atoms: m.n, overflow: m.ov, found: m.found });
  }
  report.push({ w, errors });
  await ctx.close();
}
/* every opener figure and every diagram plate, drawn on its own at three sizes: labels must not collide or run past the figure */
const figs = [];
{
  const ctx = await b.newContext({ viewport: { width: 1200, height: 900 } });
  const { p } = await open(ctx, base);
  for (const wpx of [620, 420, 300]) {
    const r = await p.evaluate(async (wpx) => {
      const host = document.createElement('div'); host.style.cssText = `position:fixed;left:0;top:0;width:${wpx}px;z-index:99999;background:#fff`; document.body.appendChild(host);
      const out = []; const hit = (a, c) => Math.min(a.right, c.right) - Math.max(a.left, c.left) > 1 && Math.min(a.bottom, c.bottom) - Math.max(a.top, c.top) > 1;
      const check = (label, html) => { host.innerHTML = html; const s = host.querySelector('svg'); if (!s) return; const k = s.getBoundingClientRect();
        const t = [...s.querySelectorAll('text')].filter(x => x.textContent.trim()).map(x => [x, x.getBoundingClientRect()]);
        for (const [x, r] of t) if (getComputedStyle(s).overflow !== 'visible' && (r.left < k.left - 1 || r.right > k.right + 1 || r.top < k.top - 1 || r.bottom > k.bottom + 1)) out.push(`${label}: "${x.textContent.trim()}" runs past the figure`);
        for (let i = 0; i < t.length; i++) for (let j = i + 1; j < t.length; j++) if (hit(t[i][1], t[j][1])) out.push(`${label}: "${t[i][0].textContent.trim()}" ∩ "${t[j][0].textContent.trim()}"`); };
      for (const k of Object.keys(MOTIFS)) check('motif ' + k, motifSVG(k, { cls: 'on-paper' }));
      for (const k of DGKEYS) { try { const d = DG[k](); check('plate ' + k, frame(d.b, d.x, d.y, { alt: d.alt })) } catch (e) { out.push('plate ' + k + ' failed to draw') } }
      host.remove(); return out }, wpx);
    figs.push(...r.map(x => `${wpx}px ${x}`));
  }
  await ctx.close();
}
check(figs.length === 0, 'every opener figure and diagram plate, drawn alone at 620, 420 and 300 px, keeps its labels apart and inside the figure', figs.slice(0, 40).join('\n     '));
const out = process.env.OUT || 'overlap-report.json';
fs.writeFileSync(out, JSON.stringify(report, null, 1));
const rows = report.filter(x => x.found);
const by = k => rows.reduce((n, x) => n + x.found.filter(f => f.kind === k).length, 0);
console.log(`atoms measured: ${rows.reduce((n, x) => n + x.atoms, 0)} over ${rows.length} route-widths`);
for (const k of ['content over content', 'figure labels collide', 'figure label clipped', 'decorative figure under content']) console.log(`${k}: ${by(k)}`);
check(by('content over content') === 0, 'no two pieces of content overlap on any audited route at any width',
  rows.flatMap(x => x.found.filter(f => f.kind === 'content over content').map(f => `${x.w} ${x.route}: ${f.a} ∩ ${f.c}`)).slice(0, 40).join('\n     '));
check(by('figure labels collide') === 0, 'no labels collide inside any figure',
  rows.flatMap(x => x.found.filter(f => f.kind === 'figure labels collide').map(f => `${x.w} ${x.route}: ${f.a} ∩ ${f.c}`)).slice(0, 40).join('\n     '));
check(by('figure label clipped') === 0, 'no figure label is cut off by the band it sits in',
  rows.flatMap(x => x.found.filter(f => f.kind === 'figure label clipped').map(f => `${x.w} ${x.route}: ${f.a} ${f.c}`)).slice(0, 40).join('\n     '));
check(by('decorative figure under content') === 0, 'no figure is drawn under text or controls',
  rows.flatMap(x => x.found.filter(f => f.kind === 'decorative figure under content').map(f => `${x.w} ${x.route}: ${f.a} ∩ ${f.c}`)).slice(0, 40).join('\n     '));
check(rows.every(x => x.overflow <= 1), 'no audited route scrolls sideways at any width', rows.filter(x => x.overflow > 1).map(x => `${x.w} ${x.route} +${x.overflow}`).join(', '));
check(report.filter(x => x.errors).every(x => !x.errors.length), 'no page errors during the audit');
await b.close(); srv.close(); done();
