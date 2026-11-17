/* One Concept. Two Perspectives.: the index lists every shared concept; each
   concept opens by its address with one heading and its shared foundation; the
   perspective switch works by mouse and by keyboard without replacing or moving
   the foundation, rewrites the address in place and survives a refresh; every
   IB link resolves to a real item and every handbook link to an existing
   volume; the teaser and its switch; search; reduced motion; axe; and no
   sideways scroll at 320, 390, 768 and 1440 px.
   SHOTS=<folder> also saves screenshots of the index, one concept in each
   perspective and the teaser at 1440x900 and 390x844. */
import fs from 'node:fs';
import path from 'node:path';
import { serve, browser, open, check, done, ROOT } from './lib.mjs';
const { srv, base } = await serve();
const b = await browser();
const KIND = 'Shared concept · IB and UPSC';
const GROUPS = 'Foundations|Markets|Macroeconomy|Policy|The global economy|Development';
const SHOTS = process.env.SHOTS || '';
if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true });
const st = p => p.evaluate(() => ({ v: VIEW, t: TAB, a: ARG, h: location.hash }));
const go = async (p, h) => { await p.evaluate(h => { location.hash = h }, h); await p.waitForTimeout(320) };
const settle = async p => { await p.evaluate(() => { try { splashEnd(true) } catch (e) {} }); await p.waitForTimeout(250);
  const skip = p.getByRole('button', { name: 'Skip for now' }); if (await skip.count()) await skip.first().click().catch(() => {}) };
/* overflow is measured with the page's own overflow-x clip lifted, so it cannot
   hide anything; then every box and every line of text in the layer's own markup
   (the page, or a teaser placed on another page) must end inside the screen */
const overflow = (p, root) => p.evaluate(root => {
  const de = document.documentElement, bd = document.body, a = de.style.overflowX, c = bd.style.overflowX;
  de.style.overflowX = 'visible'; bd.style.overflowX = 'visible';
  const over = de.scrollWidth - innerWidth, R = document.querySelector(root), wide = [];
  if (R) {
    for (const e of R.querySelectorAll('*')) { const r = e.getBoundingClientRect(); if (r.width > 0 && r.height > 0 && r.right > innerWidth + 1) wide.push((typeof e.className === 'string' ? e.className : e.tagName) + ' ' + Math.round(r.right)) }
    const clipped = e => { for (let x = e; x && x !== R; x = x.parentElement) if (getComputedStyle(x).overflowX !== 'visible') return true; return false };
    const it = document.createTreeWalker(R, NodeFilter.SHOW_TEXT); let n;
    while ((n = it.nextNode())) { if (!n.textContent.trim() || clipped(n.parentElement)) continue; const g = document.createRange(); g.selectNodeContents(n); for (const rc of g.getClientRects()) if (rc.width > 0 && rc.right > innerWidth + 1) { wide.push('text "' + n.textContent.trim().slice(0, 30) + '" ' + Math.round(rc.right)); break } }
  }
  de.style.overflowX = a; bd.style.overflowX = c; return { over, wide: wide.slice(0, 4) } }, root || '#view .cc');
/* does an internal address open something that exists? */
const RESOLVE = () => {
  window.__ccExists = h => {
    const r = routeParse(h); if (!r || typeof VIEWS[r.v] !== 'function') return 'does not parse: ' + h;
    const s = SECTIONS.find(x => x.v === r.v), tab = s && s.tabs ? s.tabs[r.t] : null, a = r.a;
    if (a === null) return '';
    const ok = r.v === 'course' && tab === 'Topics' ? !!SPINE[a]
      : r.v === 'learn' && tab === 'Concept spine' ? !!CMAP[a]
      : r.v === 'lab' && tab === 'Diagram atlas' ? DGKEYS.includes(a)
      : r.v === 'mind' ? !!mmGet(a)
      : r.v === 'calculate' ? !!CMAPC[a]
      : r.v === 'world' ? !!rwById(a)
      : r.v === 'studio' ? !!stItem(a)
      : r.v === 'concepts' ? !!ccGet(ccArg(a).id)
      : r.v === 'upsc' && r.t === UP_T.handbooks ? UPSC_HB.volumes.some(v => v.id === a)
      : r.v === 'upsc' && r.t === UP_T.resources ? UP_TOPICS.some(t => t.id === a)
      : r.v === 'upsc' && r.t === UP_T.syllabus ? a === 'mains'
      : false;
    return ok ? '' : 'names nothing that exists: ' + h };
};

/* ── desktop: the index, every concept, the switch, links, teaser, search ── */
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const { p, errors } = await open(ctx, base);
  await p.evaluate(() => document.fonts.ready);
  await p.evaluate(RESOLVE);
  const ids = await p.evaluate(() => CC_ORDER.map(c => c.id));
  const titles = await p.evaluate(() => Object.fromEntries(CC_ORDER.map(c => [c.id, c.t])));
  check(ids.length >= 18 && ids.length <= 19, `${ids.length} shared concepts are on record`);

  /* the index */
  await go(p, '#/concepts');
  const hub = await p.evaluate(() => ({ h1: [...document.querySelectorAll('#view h1')].map(x => x.textContent.trim()),
    rows: [...document.querySelectorAll('#view .cc-row a.cc-rt')].map(a => a.dataset.cc),
    groups: [...document.querySelectorAll('#view .cc-group h3')].map(h => h.textContent.trim()),
    tags: [...document.querySelectorAll('#view .cc-row')].every(r => r.querySelector('a.cc-tag.ib') && r.querySelector('a.cc-tag.upsc')),
    title: document.title, s: { v: VIEW, a: ARG } }));
  check(hub.s.v === 'concepts' && hub.s.a === null && hub.h1.length === 1 && hub.h1[0] === 'One Concept. Two Perspectives.', '#/concepts opens the index under one heading, One Concept. Two Perspectives.', JSON.stringify(hub.h1));
  check(hub.rows.length === ids.length && ids.every(id => hub.rows.filter(x => x === id).length === 1), `the index lists every concept exactly once (${hub.rows.length})`);
  check(hub.groups.join('|') === GROUPS, 'the concepts are grouped: ' + hub.groups.join(', '));
  check(hub.tags, 'every row carries its two perspective tags, IB DP and UPSC');
  check(/^One Concept\. Two Perspectives\. · Arjun Agrawal · Economics$/.test(hub.title), 'the index has its own title', hub.title);
  await p.locator('.cc-lens .cc-lb[data-lens="upsc"]').click();
  let lens = await p.evaluate(() => ({ vis: [...document.querySelectorAll('#cc-groups .cc-x')].filter(x => x.offsetParent).map(x => x.dataset.l),
    hrefs: [...document.querySelectorAll('#cc-groups a.cc-rt')].map(a => a.getAttribute('href')), pressed: document.querySelector('.cc-lb[data-lens="upsc"]').getAttribute('aria-pressed') }));
  check(lens.vis.length === ids.length && lens.vis.every(l => l === 'upsc') && lens.hrefs.every(h => /\/upsc$/.test(h)) && lens.pressed === 'true',
    'reading the index as UPSC CSE shows each concept\'s UPSC line, and its titles open the UPSC perspective');
  await p.locator('.cc-lens .cc-lb[data-lens="shared"]').click();
  lens = await p.evaluate(() => [...document.querySelectorAll('#cc-groups a.cc-rt')].every(a => /^#\/concepts\/[a-z-]+$/.test(a.getAttribute('href'))));
  check(lens, 'back on the concept lens, titles open the concept without a perspective');
  await p.locator('.cc-row a.cc-tag.ib').nth(10).click(); await p.waitForTimeout(300);
  let s = await st(p);
  check(s.v === 'concepts' && s.a === ids[10] + '/ib' && s.h === '#/concepts/' + ids[10] + '/ib', 'an IB DP tag opens that concept in the IB DP perspective', JSON.stringify(s));

  /* every concept, by address, in each form */
  const pageBad = [];
  for (const id of ids) for (const pth of ['', '/ib', '/upsc']) {
    await go(p, '#/concepts/' + id + pth);
    const r = await p.evaluate(() => {
      const f = document.querySelector('#view .cc-found'), tabs = [...document.querySelectorAll('#cc-tabs [role="tab"]')];
      const vis = [...document.querySelectorAll('#view .cc-panel')].filter(x => !x.hidden && x.offsetParent).map(x => x.dataset.p);
      return { s: { v: VIEW, a: ARG }, h1: [...document.querySelectorAll('#view h1')].map(x => x.textContent.trim()),
        found: !!f && !!f.offsetParent && f.querySelector('.cc-text').innerText.trim().split(/\s+/).length,
        terms: f ? f.querySelectorAll('.cc-terms dt').length : 0, list: document.querySelector('#cc-tabs').getAttribute('role'),
        sel: tabs.filter(t => t.getAttribute('aria-selected') === 'true').map(t => t.dataset.p), vis, title: document.title } });
    const want = pth ? pth.slice(1) : null;
    const ok = r.s.v === 'concepts' && r.h1.length === 1 && r.h1[0] === titles[id] && r.found >= 150 && r.found <= 250 && r.terms >= 4 && r.list === 'tablist'
      && r.sel.length === 1 && r.vis.length === 1 && r.sel[0] === r.vis[0] && (!want || r.sel[0] === want) && r.title.startsWith(titles[id] + ' · ');
    if (!ok) pageBad.push(id + pth + ' ' + JSON.stringify(r));
  }
  check(pageBad.length === 0, `every concept opens by its address, with one heading, its foundation and one perspective showing (${ids.length * 3} addresses)`, pageBad.slice(0, 3).join(' | '));

  /* links: every IB link resolves, every handbook link opens a volume */
  const linkBad = [], volBad = [];let nIb = 0, nVol = 0, nUp = 0;
  for (const id of ids) {
    await go(p, '#/concepts/' + id);
    const r = await p.evaluate(() => {
      const ib = [...document.querySelectorAll('#cc-p-ib a[href^="#/"], #view .cc-fig a[href^="#/"]')].map(a => a.getAttribute('href'));
      const up = [...document.querySelectorAll('#cc-p-upsc a[href^="#/"]')].map(a => a.getAttribute('href'));
      const vols = [...document.querySelectorAll('#cc-p-upsc .cc-vol a')].map(a => a.getAttribute('href'));
      const more = [...document.querySelectorAll('#view .cc-more a[href^="#/"], #view .cc-mast a[href^="#/"]')].map(a => a.getAttribute('href'));
      return { ib, up, vols, bad: [...ib, ...up, ...more].map(h => __ccExists(h)).filter(Boolean),
        volBad: vols.filter(h => { const x = routeParse(h); return !(x && x.v === 'upsc' && x.t === UP_T.handbooks && UPSC_HB.volumes.some(v => v.id === x.a)) }) } });
    nIb += r.ib.length; nUp += r.up.length; nVol += r.vols.length;
    linkBad.push(...r.bad.map(x => id + ': ' + x)); volBad.push(...r.volBad.map(x => id + ': ' + x));
    if (!r.ib.length || !r.vols.length) linkBad.push(id + ': ' + (r.ib.length ? 'no handbook volume' : 'no IB link'));
  }
  check(linkBad.length === 0, `every IB link resolves with routeParse to an item that exists (${nIb} IB links), and so does every UPSC and related link (${nUp})`, linkBad.slice(0, 5).join(' | '));
  check(volBad.length === 0 && nVol >= ids.length, `every handbook link opens an existing volume (${nVol})`, volBad.join(' | '));
  const audit = await p.evaluate(() => ccAudit());
  console.log(`     links specified in the records: ${audit.kept.length} kept, ${audit.dropped.length} dropped${audit.dropped.length ? ': ' + audit.dropped.map(x => x.id + ' ' + x.spec).join(', ') : ''}`);
  check(audit.dropped.length === 0, 'no link specified in the records had to be dropped', audit.dropped.map(x => x.id + ' ' + x.spec).join(', '));
  await go(p, '#/concepts/inflation/ib');
  await p.locator('#cc-p-ib .cc-ll a').first().click(); await p.waitForTimeout(400);
  s = await p.evaluate(() => ({ v: VIEW, a: ARG, h1: document.querySelectorAll('#view h1').length }));
  check(s.v === 'course' && s.a === '3.3' && s.h1 === 1, 'an IB link opens the IB lesson itself (3.3)', JSON.stringify(s));
  await go(p, '#/concepts/inflation/upsc');
  await p.locator('#cc-p-upsc .cc-vol a').first().click(); await p.waitForTimeout(400);
  s = await p.evaluate(() => ({ v: VIEW, a: ARG, h1: (document.querySelector('#view h1') || {}).textContent }));
  check(s.v === 'upsc' && s.a === 'volume-iii' && s.h1 === 'Inflation and Price Stability', 'a handbook link opens that volume\'s page (Volume III)', JSON.stringify(s));

  /* the switch: mouse, keyboard, the foundation untouched, the address in place */
  await go(p, '#/concepts');
  await go(p, '#/concepts/inflation/ib');
  await p.evaluate(() => { const sw = document.querySelector('#view .cc-switch'); scrollTo(0, sw.getBoundingClientRect().top + scrollY - 420);
    window.__f = document.querySelector('#view .cc-found'); window.__ft = __f.innerText; window.__h0 = history.length });
  await p.waitForTimeout(150);
  const y0 = await p.evaluate(() => ({ y: scrollY, ft: __f.getBoundingClientRect().top }));
  await p.locator('#cc-t-upsc').click(); await p.waitForTimeout(250);
  let sw = await p.evaluate(() => ({ same: document.querySelector('#view .cc-found') === __f && __f.isConnected && __f.innerText === __ft, y: scrollY, ft: __f.getBoundingClientRect().top,
    sel: document.querySelector('#cc-t-upsc').getAttribute('aria-selected'), up: !document.getElementById('cc-p-upsc').hidden, ib: document.getElementById('cc-p-ib').hidden,
    h: location.hash, a: ARG, hl: history.length - __h0, rel: [...document.querySelectorAll('#view .cc-more a[data-cc]')].every(a => /\/upsc$/.test(a.getAttribute('href'))) }));
  check(sw.sel === 'true' && sw.up && sw.ib, 'a click on UPSC Perspective selects its tab and shows only the UPSC panel');
  check(sw.same && Math.abs(sw.y - y0.y) < 1 && Math.abs(sw.ft - y0.ft) < 1, 'the shared foundation is the same, unmoved element and the page does not scroll', JSON.stringify({ y0, sw }));
  check(sw.h === '#/concepts/inflation/upsc' && sw.a === 'inflation/upsc' && sw.hl === 0, 'the address follows the switch in place, adding no history entry');
  check(sw.rel, 'related and neighbouring concepts now open in the UPSC perspective');
  await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(200);
  sw = await p.evaluate(() => ({ f: document.activeElement.id, sel: document.querySelector('#cc-t-ib').getAttribute('aria-selected'), ib: !document.getElementById('cc-p-ib').hidden, same: document.querySelector('#view .cc-found') === __f, h: location.hash }));
  check(sw.f === 'cc-t-ib' && sw.sel === 'true' && sw.ib && sw.same && sw.h === '#/concepts/inflation/ib', 'ArrowLeft moves focus to IB DP Perspective and selects it, the foundation untouched');
  await p.keyboard.press('End'); await p.waitForTimeout(150);
  const end = await p.evaluate(() => document.activeElement.id);
  await p.keyboard.press('Home'); await p.waitForTimeout(150);
  const home = await p.evaluate(() => document.activeElement.id);
  await p.keyboard.press('ArrowRight'); await p.waitForTimeout(150);
  const right = await p.evaluate(() => ({ f: document.activeElement.id, sel: document.querySelector('#cc-t-upsc').getAttribute('aria-selected') }));
  check(end === 'cc-t-upsc' && home === 'cc-t-ib' && right.f === 'cc-t-upsc' && right.sel === 'true', 'End, Home and ArrowRight move along the tabs and select them');
  await p.keyboard.press('Tab');
  check(await p.evaluate(() => document.activeElement.id === 'cc-p-upsc'), 'Tab leaves the tablist for the selected panel');
  /* a reader deep in a panel switches: the new panel starts under the switch, nothing else moves */
  await p.evaluate(() => { const pn = document.querySelector('#view .cc-panels'); scrollTo(0, pn.getBoundingClientRect().top + scrollY + 700) });
  await p.waitForTimeout(150);
  await p.locator('#cc-t-ib').focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(250);
  sw = await p.evaluate(() => { const sb = document.querySelector('#view .cc-switch').getBoundingClientRect(), pt = document.querySelector('#view .cc-panels').getBoundingClientRect().top;
    return { gap: pt - sb.bottom, stuck: sb.top <= parseFloat(getComputedStyle(document.querySelector('#view .cc-switch')).top) + 1, ib: !document.getElementById('cc-p-ib').hidden, same: document.querySelector('#view .cc-found') === __f, y: scrollY } });
  check(sw.ib && sw.same && sw.stuck && Math.abs(sw.gap) < 2, 'switching from deep inside a panel keeps the switch in view and brings the new panel\'s start up to it', JSON.stringify(sw));
  /* the masthead chips open a perspective in place */
  await p.evaluate(() => scrollTo(0, 0));
  await p.locator('.cc-anchors .cc-chip.upsc').click(); await p.waitForTimeout(900);
  sw = await p.evaluate(() => ({ up: !document.getElementById('cc-p-upsc').hidden, f: document.activeElement.id, top: document.getElementById('cc-applied').getBoundingClientRect().top, h: location.hash, same: document.querySelector('#view .cc-found') === __f }));
  check(sw.up && sw.f === 'cc-t-upsc' && sw.top < 200 && sw.h === '#/concepts/inflation/upsc' && sw.same, 'the UPSC CSE chip under the title switches in place and brings the switch into view', JSON.stringify(sw));
  /* Back leaves the page; a refresh keeps the perspective */
  await p.goBack(); await p.waitForTimeout(400);
  s = await st(p);
  check(s.v === 'concepts' && s.a === null, 'Back returns to the index: switching added no history', JSON.stringify(s));
  await p.goForward(); await p.waitForTimeout(400);
  s = await st(p);
  check(s.a === 'inflation/upsc', 'Forward returns to the concept in the perspective last chosen', JSON.stringify(s));
  await p.reload({ waitUntil: 'load' }); await settle(p); await p.waitForTimeout(300);
  s = await p.evaluate(() => ({ a: ARG, sel: document.querySelector('#cc-t-upsc') && document.querySelector('#cc-t-upsc').getAttribute('aria-selected') }));
  check(s.a === 'inflation/upsc' && s.sel === 'true', 'a refresh keeps the concept and its perspective');
  await go(p, '#/concepts/taxation');
  s = await p.evaluate(() => document.querySelector('#cc-t-upsc').getAttribute('aria-selected'));
  check(s === 'true', 'a concept opened without a perspective uses the one the reader chose last');
  await go(p, '#/concepts/not-a-concept');
  s = await p.evaluate(() => ({ v: VIEW, h1: document.querySelectorAll('#view h1').length, miss: !!document.querySelector('#view .cc-miss'), rows: document.querySelectorAll('#view .cc-row').length }));
  check(s.v === 'concepts' && s.h1 === 1 && s.miss && s.rows === ids.length, 'an unknown concept opens the index with a notice');
  check(await p.evaluate(() => ccLink('inflation') === '#/concepts/inflation' && ccLink('inflation', 'upsc') === '#/concepts/inflation/upsc' && ccLink('inflation', 'ib') === '#/concepts/inflation/ib' && ccLink('nope') === '#/concepts' && routeParse(ccLink('elasticity', 'ib')).a === 'elasticity/ib'),
    'ccLink gives a concept\'s address, with or without a perspective');

  /* the teaser */
  await p.evaluate(() => nav('home')); await p.waitForTimeout(300);
  await p.evaluate(() => { const d = document.createElement('div'); d.id = 'tz-host'; d.className = 'wrap full'; d.style.margin = '24px auto';
    d.innerHTML = ccTeaser({ path: 'upsc' }); document.getElementById('view').prepend(d) });
  let tz = await p.evaluate(() => { const t = document.querySelector('#tz-host .cc-tz');
    return { n: t.querySelectorAll('.cc-tz-c').length, sel: t.querySelector('[role="tab"][aria-selected="true"]').dataset.l, hrefs: [...t.querySelectorAll('.cc-tz-c')].map(a => a.getAttribute('href')),
      vis: [...t.querySelectorAll('.cc-tz-x')].filter(x => x.offsetParent).map(x => x.dataset.l), all: t.querySelector('.cc-tz-all').getAttribute('href'), h: t.querySelector('h2') && t.querySelector('h2').textContent } });
  check(tz.n === 4 && tz.sel === 'upsc' && tz.hrefs.every(h => /^#\/concepts\/[a-z-]+\/upsc$/.test(h)) && tz.vis.length === 4 && tz.vis.every(l => l === 'upsc') && tz.all === '#/concepts',
    'ccTeaser({path:"upsc"}) renders four concepts in the UPSC perspective, with a link to the index', JSON.stringify(tz));
  await p.locator('#tz-host [role="tab"][data-l="ib"]').click(); await p.waitForTimeout(150);
  tz = await p.evaluate(() => { const t = document.querySelector('#tz-host .cc-tz');
    return { hrefs: [...t.querySelectorAll('.cc-tz-c')].map(a => a.getAttribute('href')), vis: [...t.querySelectorAll('.cc-tz-x')].filter(x => x.offsetParent).map(x => x.dataset.l), lab: t.querySelector('[role="tabpanel"]').getAttribute('aria-labelledby') } });
  check(tz.hrefs.every(h => /\/ib$/.test(h)) && tz.vis.every(l => l === 'ib') && /-t-ib$/.test(tz.lab), 'the teaser\'s switch changes every line and link to the IB DP perspective');
  await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(150);
  tz = await p.evaluate(() => ({ f: document.activeElement.dataset.l, vis: [...document.querySelectorAll('#tz-host .cc-tz-x')].filter(x => x.offsetParent).map(x => x.dataset.l), hrefs: [...document.querySelectorAll('#tz-host .cc-tz-c')].map(a => a.getAttribute('href')) }));
  check(tz.f === 'shared' && tz.vis.every(l => l === 'shared') && tz.hrefs.every(h => /^#\/concepts\/[a-z-]+$/.test(h)), 'the teaser\'s switch follows the arrow keys, here to the shared concept');
  check(await p.evaluate(() => ['shared', 'ib', 'upsc'].every(x => { const h = ccTeaser({ path: x }); return (h.match(/class="cc-tz-c"/g) || []).length === 4 && h.includes(`data-l="${x}" aria-controls`) })
    && (ccTeaser({ path: 'ib', n: 3, ids: ['taxation', 'elasticity', 'inflation'] }).match(/class="cc-tz-c"/g) || []).length === 3), 'every default perspective renders, and opts.ids and opts.n choose the concepts');
  if (SHOTS) {
    await p.evaluate(() => scrollTo(0, 0));
    await p.locator('#tz-host .cc-tz').screenshot({ path: path.join(SHOTS, 'teaser-element-1440.png') });
  }
  await p.locator('#tz-host .cc-tz-c').first().click(); await p.waitForTimeout(300);
  s = await st(p);
  check(s.v === 'concepts' && s.a === 'inflation', 'a teaser card opens its concept', JSON.stringify(s));

  /* search: the palette lists concepts under a kind that says they are shared */
  await p.evaluate(() => openSearch()); await p.waitForTimeout(200);
  await p.locator('#cpin').fill('inflation'); await p.waitForTimeout(300);
  let rows = await p.evaluate(() => [...document.querySelectorAll('#cpres .cprow')].map(r => ({ k: r.querySelector('.k').textContent, t: r.querySelector('.t').textContent })));
  const hit = rows.findIndex(r => r.k === KIND && r.t === 'Inflation');
  check(hit >= 0, `search for "inflation" lists the shared concept, labelled "${KIND}"`, JSON.stringify(rows.slice(0, 6)));
  if (hit >= 0) { await p.locator('#cpres .cprow').nth(hit).click(); await p.waitForTimeout(400); }
  s = await st(p);
  check(s.v === 'concepts' && /^inflation/.test(s.a || ''), 'choosing it opens the concept', JSON.stringify(s));
  await p.evaluate(() => openSearch()); await p.waitForTimeout(200);
  await p.locator('#cpin').fill('opportunity cost'); await p.waitForTimeout(300);
  rows = await p.evaluate(() => [...document.querySelectorAll('#cpres .cprow')].map(r => ({ k: r.querySelector('.k').textContent, t: r.querySelector('.t').textContent })));
  check(rows.some(r => r.k === KIND && r.t === 'Scarcity and opportunity cost'), 'search for "opportunity cost" finds Scarcity and opportunity cost');
  await p.keyboard.press('Escape'); await p.waitForTimeout(150);
  check(await p.evaluate(K => { const g = CPGROUPS.find(x => x[0] === 'concepts'); return g && cpGroupItems(g, 'balance of payments').some(x => x.k === K) }, KIND), 'the Concepts filter of the search includes the shared concepts');
  check(await p.evaluate(K => buildIndex().filter(x => x.k === K).length, KIND) >= ids.length + 1, 'the search index holds every concept and the index page');
  check(errors.length === 0, 'no page errors on desktop', errors.join(' | '));
  await ctx.close();
}

/* ── reduced motion: the new panel appears without animation ──────────── */
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const { p } = await open(ctx, base + '#/concepts/elasticity/ib');
  await p.waitForTimeout(300);
  await p.locator('#cc-t-upsc').click(); await p.waitForTimeout(80);
  const r = await p.evaluate(() => { const e = document.getElementById('cc-p-upsc'), cs = getComputedStyle(e); return { anim: cs.animationName, op: cs.opacity } });
  check(r.anim === 'none' && r.op === '1', 'under reduced motion the panel appears at once, with no animation', JSON.stringify(r));
  await ctx.close();
}

/* ── accessibility: axe on the index, two concepts in each perspective, the teaser ── */
{
  const axe = fs.readFileSync(path.join(ROOT, 'tests/node_modules/axe-core/axe.min.js'), 'utf8');
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const { p } = await open(ctx, base);
  const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
  for (const w of [1440, 390]) {
    await p.setViewportSize({ width: w, height: 900 });const viol = [];let runs = 0;
    for (const h of ['#/concepts', '#/concepts/inflation/ib', '#/concepts/inflation/upsc', '#/concepts/balance-of-payments/ib', '#/concepts/balance-of-payments/upsc', '#/concepts/public-goods/upsc']) {
      await go(p, h);
      if (!(await p.evaluate(() => typeof axe !== 'undefined'))) await p.addScriptTag({ content: axe });
      const r = await p.evaluate(async T => (await axe.run(document.querySelector('#view'), { runOnly: { type: 'tag', values: T } })).violations.map(x => x.id + ':' + x.nodes.length + ' ' + x.nodes.slice(0, 2).map(n => n.target.join(' ')).join(' ; ')), TAGS);
      runs++;if (r.length) viol.push(h + ' ' + r.join(','));
    }
    await p.evaluate(() => nav('home')); await p.waitForTimeout(250);
    await p.evaluate(() => { const d = document.createElement('div'); d.id = 'tz-host'; d.className = 'wrap full'; d.innerHTML = ccTeaser({ path: 'shared' }); document.getElementById('view').prepend(d) });
    const r = await p.evaluate(async T => (await axe.run(document.querySelector('#tz-host'), { runOnly: { type: 'tag', values: T } })).violations.map(x => x.id + ':' + x.nodes.length), TAGS);
    runs++;if (r.length) viol.push('teaser ' + r.join(','));
    check(!viol.length, `${w}px: axe (WCAG 2.2 A and AA) finds no violation on the index, two concepts in each perspective and the teaser (${runs} pages)`, viol.join(' | '));
  }
  await ctx.close();
}

/* ── widths: nothing scrolls sideways ─────────────────────────────────── */
for (const w of [320, 390, 768, 1440]) {
  const ctx = await b.newContext({ viewport: { width: w, height: w < 500 ? 844 : 900 } });
  const { p, errors } = await open(ctx, base);
  await p.evaluate(() => document.fonts.ready);
  const bad = [];
  for (const h of ['#/concepts', '#/concepts/inflation/ib', '#/concepts/inflation/upsc', '#/concepts/balance-of-payments/upsc', '#/concepts/taxation/ib', '#/concepts/economic-development/upsc', '#/concepts/market-failure/ib']) {
    await go(p, h);
    for (const lens of h === '#/concepts' ? ['shared', 'ib', 'upsc'] : [null]) {
      if (lens) await p.evaluate(l => ccLens(l), lens);
      const o = await overflow(p); if (o.over > 0 || o.wide.length) bad.push(h + (lens ? ' (' + lens + ')' : '') + ' +' + o.over + ' ' + o.wide.join(', '));
    }
    if (h !== '#/concepts') { /* the panel that is not showing gets measured too */
      await p.evaluate(() => { const t = document.querySelector('#cc-tabs [aria-selected="false"]'); if (t) t.click() }); await p.waitForTimeout(80);
      const o = await overflow(p); if (o.over > 0 || o.wide.length) bad.push(h + ' (other panel) +' + o.over + ' ' + o.wide.join(', '));
    }
  }
  await p.evaluate(() => nav('home')); await p.waitForTimeout(250);
  for (const path_ of ['shared', 'ib', 'upsc']) {
    await p.evaluate(x => { document.getElementById('tz-host')?.remove(); const d = document.createElement('div'); d.id = 'tz-host'; d.className = 'wrap full'; d.innerHTML = ccTeaser({ path: x }); document.getElementById('view').prepend(d) }, path_);
    const o = await overflow(p, '#tz-host'); if (o.over > 0 || o.wide.length) bad.push('teaser ' + path_ + ' +' + o.over + ' ' + o.wide.join(', '));
  }
  check(bad.length === 0, `${w}px: nothing scrolls sideways on the index, the concept pages (both panels) or the teaser`, bad.join(' | '));
  if (w <= 390) {
    await go(p, '#/concepts/inflation/ib');
    const t = await p.evaluate(() => [...document.querySelectorAll('#cc-tabs [role="tab"]')].map(e => { const r = e.getBoundingClientRect(); return { w: r.width, h: r.height, fit: e.scrollWidth <= e.clientWidth + 1, in: r.left >= 0 && r.right <= innerWidth } }));
    check(t.length === 2 && t.every(x => x.fit && x.in && x.h >= 44), `${w}px: both perspective tabs fit, whole and at least 44 px tall`, JSON.stringify(t));
  }
  check(errors.length === 0, `${w}px: no page errors`, errors.join(' | '));
  await ctx.close();
}

/* ── screenshots for review (SHOTS=<folder>) ─────────────────────────── */
if (SHOTS) {
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } });
    const { p } = await open(ctx, base);
    await p.evaluate(() => document.fonts.ready);
    for (const [hash, n] of [['#/concepts', 'hub'], ['#/concepts/inflation/ib', 'inflation-ib'], ['#/concepts/inflation/upsc', 'inflation-upsc']]) {
      await go(p, hash); await p.waitForTimeout(500);
      await p.screenshot({ path: path.join(SHOTS, `${n}-${w}.png`) });
      if (n !== 'hub') { await p.evaluate(() => { const s = document.getElementById('cc-applied'); scrollTo(0, s.getBoundingClientRect().top + scrollY - 70) }); await p.waitForTimeout(300);
        await p.screenshot({ path: path.join(SHOTS, `${n}-panel-${w}.png`) }); }
    }
    await p.evaluate(() => nav('home')); await p.waitForTimeout(300);
    await p.evaluate(() => { const d = document.createElement('div'); d.id = 'tz-host'; d.className = 'wrap full'; d.style.margin = '24px auto'; d.innerHTML = ccTeaser({ path: 'shared' }); document.getElementById('view').prepend(d) });
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(200);
    await p.screenshot({ path: path.join(SHOTS, `teaser-${w}.png`) });
    await ctx.close();
  }
  console.log('     screenshots saved in ' + SHOTS);
}
await b.close(); srv.close(); done();
