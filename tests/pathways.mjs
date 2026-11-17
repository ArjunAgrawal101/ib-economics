/* The ecosystem, in a real browser: the home page's seven sections and its map, the
   main navigation and its mega menus (pointer, click and keyboard), the IB landing
   page's journey and finder, shared concepts in both readings, The Business Brief in
   the bar, on the home page and in the footer, the phone drawer, no sideways scroll
   at seven widths, reduced motion and axe. */
import fs from 'node:fs';
import path from 'node:path';
import { serve, browser, open, check, done, ROOT } from './lib.mjs';
const { srv, base } = await serve();
const b = await browser();
const st = p => p.evaluate(() => ({ v: VIEW, t: TAB, a: ARG, h: location.hash }));
const BB = 'https://the-business-brief-dun.vercel.app/';

/* desktop */
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const { p, errors } = await open(ctx, base);
  await p.evaluate(() => document.fonts.ready);
  /* the home page */
  const home = await p.evaluate(() => ({ h1: [...document.querySelectorAll('#view h1')].map(h => h.textContent.replace(/\s+/g, ' ').trim()),
    secs: ['sy-hero', 'sy-map', 'sy-exp', 'sy-work', 'sy-bb', 'sy-ed', 'sy-begin'].map(c => !!document.querySelector('#view .' + c)),
    lede: document.querySelector('.sy-hl').textContent.trim(), ctas: [...document.querySelectorAll('.sy-cta')].map(a => [a.textContent.trim().toUpperCase(), a.getAttribute('href'), getComputedStyle(a).textTransform]) }));
  check(home.h1.length === 1 && home.h1[0] === 'Economics is not just a subject to study. It is a way to understand the world.', 'the home page has the briefed headline as its one heading');
  check(home.lede === 'An integrated Economics learning ecosystem connecting international academic study, Indian economic policy, real-world evidence and applied understanding.', 'the supporting line is as briefed');
  check(home.secs.every(Boolean), 'all seven sections are present: pathways, map, experience, work, The Business Brief, educator, beginning');
  check(home.ctas.length === 2 && /^EXPLORE IB DP ECONOMICS/.test(home.ctas[0][0]) && home.ctas[0][1] === '#/ib' && /^EXPLORE UPSC ECONOMICS/.test(home.ctas[1][0]) && home.ctas[1][1] === '#/upsc' && home.ctas.every(c => c[2] === 'uppercase'),
    'the two calls read EXPLORE IB DP ECONOMICS and EXPLORE UPSC ECONOMICS and lead to the two pathways', JSON.stringify(home.ctas));
  /* the map */
  await p.locator('.sy-node[data-k="pf"]').click(); await p.waitForTimeout(150);
  const fp = await p.evaluate(() => ({ t: document.querySelector('.sy-ft').textContent, ib: [...document.querySelectorAll('.sy-fc-ib a')].map(a => a.getAttribute('href')), up: [...document.querySelectorAll('.sy-fc-up a')].map(a => a.getAttribute('href')),
    pressed: document.querySelector('.sy-node[data-k="pf"]').getAttribute('aria-pressed'), edges: document.querySelectorAll('.sy-edge.on').length }));
  check(fp.t === 'Public finance' && fp.pressed === 'true' && fp.edges >= 2 && fp.up.includes('#/upsc/economics-handbooks/volume-iv'), 'selecting a field on the map shows where each pathway meets it, and lights its connections', JSON.stringify(fp));
  check(await p.evaluate(hs => hs.every(h => routeParse(h)), fp.ib.concat(fp.up)), 'every link the map offers is a real address');
  /* the screenshots and portrait load at their declared sizes */
  const imgs = await p.evaluate(async () => { const im = [...document.querySelectorAll('.sy-home img')]; for (const i of im) { i.loading = 'eager'; if (!i.complete) await new Promise(r => { i.onload = i.onerror = r }) } return im.map(i => [i.getAttribute('src'), i.naturalWidth]) });
  check(imgs.length >= 11 && imgs.every(([, w]) => w > 0), `every image on the home page loads (${imgs.length})`, imgs.filter(([, w]) => !w).map(x => x[0]).join(' '));
  check(imgs.filter(([s]) => /^assets\/home\//.test(s)).every(([s]) => fs.existsSync(path.join(ROOT, s))), 'the learning-experience screens are real files of the platform');
  /* The Business Brief, three places */
  const bb = await p.evaluate(u => [...document.querySelectorAll(`a[href="${u}"]`)].map(a => ({ where: a.closest('#synav') ? 'bar' : a.closest('.sy-bb') ? 'home' : a.closest('#sy-fe') ? 'footer' : a.closest('.sy-p') ? 'menu' : 'other', t: a.target, r: a.rel })), BB);
  check(['bar', 'home', 'footer'].every(w => bb.some(x => x.where === w)) && bb.every(x => x.t === '_blank' && /noopener/.test(x.r)), 'The Business Brief is linked from the bar, the home page and the footer, each in a new tab with rel noopener', JSON.stringify(bb));
  check(await p.locator('#sy-fe').innerText().then(t => /Explore the academic ecosystem/i.test(t) && /IB DP Economics/.test(t) && /UPSC CSE Economics/.test(t) && /IB DP Business Management/.test(t)), 'the footer opens with Explore the academic ecosystem: IB DP Economics, UPSC CSE Economics, IB DP Business Management');
  /* the mega menus: pointer, click and keyboard */
  await p.hover('#sy-t-ib'); await p.waitForTimeout(350);
  check(await p.evaluate(() => !document.getElementById('sy-p-ib').hidden && document.getElementById('sy-t-ib').getAttribute('aria-expanded') === 'true'), 'pointing at IB DP Economics opens its menu');
  const groups = await p.evaluate(() => [...document.querySelectorAll('#sy-p-ib .sy-gh')].map(x => x.textContent.trim().toUpperCase()));
  check(groups.join(',') === 'LEARN,VISUALISE,APPLY,PRACTISE,ADVANCE', 'the IB menu is grouped LEARN, VISUALISE, APPLY, PRACTISE, ADVANCE', groups.join(','));
  await p.mouse.move(700, 880); await p.waitForTimeout(400);
  check(await p.evaluate(() => document.getElementById('sy-p-ib').hidden), 'moving away closes it');
  await p.focus('#sy-t-up'); await p.keyboard.press('ArrowDown'); await p.waitForTimeout(200);
  const kb = await p.evaluate(() => ({ open: !document.getElementById('sy-p-up').hidden, inPanel: !!document.activeElement.closest('#sy-p-up'), groups: [...document.querySelectorAll('#sy-p-up .sy-gh')].map(x => x.textContent.trim().toUpperCase()).join(',') }));
  check(kb.open && kb.inPanel && kb.groups === 'START HERE,LEARN,HANDBOOK LIBRARY,PREPARE,COACHING', 'ArrowDown opens the UPSC menu and moves focus into it; it is grouped START HERE, LEARN, HANDBOOK LIBRARY, PREPARE, COACHING', JSON.stringify(kb));
  await p.keyboard.press('Escape'); await p.waitForTimeout(150);
  check(await p.evaluate(() => document.getElementById('sy-p-up').hidden && document.activeElement.id === 'sy-t-up'), 'Escape closes it and returns focus to its button');
  const all = await p.evaluate(() => [...document.querySelectorAll('#synav .sy-p a')].map(a => a.getAttribute('href')).filter(h => h.startsWith('#')));
  check(await p.evaluate(hs => hs.every(h => { const r = routeParse(h); return r && (r.v === 'home' || typeof VIEWS[r.v] === 'function') }), all), `every destination in the three menus is a real address (${all.length})`);
  await p.locator('#sy-t-up').click(); await p.locator('#sy-p-up a.sy-i', { hasText: 'Syllabus explorer' }).click(); await p.waitForTimeout(300);
  check((await st(p)).h === '#/upsc/syllabus' && await p.locator('#sy-t-up.cur').count() === 1, 'a menu link opens its page and the bar marks the pathway as current');
  await p.locator('#sy-t-tools').click(); await p.locator('#sy-p-tools button[data-tool="calc"]').click(); await p.waitForTimeout(250);
  check(await p.locator('#pop').count() === 1, 'Learning Tools opens the calculator');
  await p.keyboard.press('Escape');
  /* the IB landing page */
  await p.evaluate(() => nav('ib')); await p.waitForTimeout(500);
  const ib = await p.evaluate(() => ({ h1: document.querySelector('#view h1').textContent.trim(), stages: [...document.querySelectorAll('.ibl-j b')].map(x => x.textContent.trim().toUpperCase()).join(' → '), cover: !!document.querySelector('#view section.hero.rn-home'),
    n: document.querySelectorAll('#ibl-fl a.ibl-fi').length, title: document.title }));
  check(ib.h1 === 'IB DP Economics' && ib.stages === 'UNDERSTAND → VISUALISE → APPLY → PRACTISE → EVALUATE' && ib.cover && /^IB DP Economics/.test(ib.title), 'the IB landing page has its own heading, the five-stage journey and the IB front page below', JSON.stringify(ib));
  await p.locator('.ibl-j button').nth(3).click(); await p.waitForTimeout(150);
  check(/Practise/.test(await p.locator('#ibl-jp h3').innerText()) && await p.locator('#ibl-jp a').count() >= 5, 'choosing a stage shows its destinations');
  await p.locator('#ibl-find button[data-f="st"][data-val="Visualise"]').click(); await p.waitForTimeout(100);
  const n1 = await p.locator('#ibl-fl a.ibl-fi').count();
  await p.locator('#ibl-find button[data-f="k"][data-val="Model"]').click(); await p.waitForTimeout(100);
  const n2 = await p.locator('#ibl-fl a.ibl-fi').count();
  check(n1 > 0 && n1 < ib.n && n2 > 0 && n2 <= n1 && /destination/.test(await p.locator('#ibl-fc').innerText()), `the finder narrows by stage and kind (${ib.n} → ${n1} → ${n2})`);
  await p.locator('.ibl-lv button[data-l="SL"]').click(); await p.waitForTimeout(100);
  check(await p.evaluate(() => S.lvl === 'SL' && document.querySelector('#lvlseg button.on').dataset.l === 'SL'), 'the level switch sets the platform to SL, and the header agrees');
  await p.locator('.ibl-lv button[data-l="HL"]').click();
  /* shared concepts */
  await p.evaluate(() => { location.hash = '#/concepts/upsc-cse/inflation' }); await p.waitForTimeout(500);
  const cx = await p.evaluate(() => ({ s: { v: VIEW, t: TAB, a: ARG }, h1: document.querySelector('#view h1').textContent, main: document.querySelector('.cx-main').innerText, fig: !!document.querySelector('.cx-fig svg'), mcq: !!document.querySelector('.cx-main .up-mcq') }));
  check(cx.s.v === 'concepts' && cx.s.t === 1 && cx.s.a === 'inflation' && cx.h1 === 'Inflation' && /Mains GS III/.test(cx.main) && /not a previous year's question/.test(cx.main) && cx.fig && cx.mcq, 'a shared concept opens in its UPSC CSE reading, with the Indian application, a figure, an MCQ and a labelled practice question', JSON.stringify(cx.s));
  await p.locator('.cx-mode-ib').click(); await p.waitForTimeout(300);
  const cx2 = await p.evaluate(() => ({ s: { v: VIEW, t: TAB, a: ARG }, main: document.querySelector('.cx-main').innerText }));
  check(cx2.s.t === 0 && cx2.s.a === 'inflation' && /\[10\]/.test(cx2.main) && !/Mains|Prelims/.test(cx2.main), 'switching to the IB DP reading keeps the concept and drops the UPSC material', JSON.stringify(cx2.s));
  check(errors.length === 0, 'no page errors on desktop', errors.join(' | '));
  await ctx.close();
}

/* widths: no sideways scroll on the new pages; the bar or the drawer, never both missing */
for (const w of [1920, 1280, 1181, 1024, 768, 390, 320]) {
  const ctx = await b.newContext({ viewport: { width: w, height: w < 700 ? 844 : 900 } });
  const { p, errors } = await open(ctx, base);
  await p.evaluate(() => document.fonts.ready);
  const bad = [];
  for (const h of ['#/', '#/ib', '#/concepts', '#/concepts/ib-dp/elasticity', '#/concepts/upsc-cse/balance-of-payments', '#/upsc', '#/upsc/economics-handbooks', '#/upsc/economics-handbooks/volume-xi']) {
    if (h === '#/') await p.evaluate(() => nav('home')); else { await p.evaluate(h => { location.hash = h }, h); await p.waitForTimeout(350) }
    const o = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    if (o > 0) bad.push(h + ' +' + o);
  }
  check(bad.length === 0, `${w}px: nothing scrolls sideways on the ecosystem pages`, bad.join(', '));
  const hdr = await p.evaluate(() => { const n = document.getElementById('synav'), bu = document.getElementById('burger'); return { nav: !!n && getComputedStyle(n).display !== 'none' && n.getBoundingClientRect().width > 0, burger: getComputedStyle(bu).display !== 'none',
    clash: !!n && getComputedStyle(n).display !== 'none' && (() => { const u = n.firstElementChild.getBoundingClientRect(), br = document.querySelector('.brand').getBoundingClientRect(); return u.left < br.right - 1 })() } });
  check((hdr.nav || hdr.burger) && !hdr.clash, `${w}px: the main navigation fits beside the brand, or the menu button offers the drawer`, JSON.stringify(hdr));
  if (w === 390) {
    await p.locator('#burger').click(); await p.waitForTimeout(300);
    const d = await p.evaluate(u => ({ paths: [...document.querySelectorAll('#mob .mobpaths .mobitem')].map(x => x.textContent.trim()), bb: (() => { const a = document.querySelector(`#mob a[href="${u}"]`); return a && a.target === '_blank' && /noopener/.test(a.rel) })(),
      head: document.querySelector('#mob .mobhead').innerText }), BB);
    check(d.paths.join('|') === 'IB DP Economics|UPSC CSE Economics|Shared concepts' && d.bb && /Economics/.test(d.head), 'the phone drawer opens with the two pathways and shared concepts, and ends with The Business Brief in a new tab', JSON.stringify(d));
    await p.locator('#mob .mobpaths .mobitem', { hasText: 'IB DP Economics' }).click(); await p.waitForTimeout(400);
    check((await st(p)).v === 'ib' && !(await p.locator('#mob').count()), 'a pathway in the drawer opens its landing page and closes the drawer');
  }
  check(errors.length === 0, `${w}px: no page errors`, errors.join(' | '));
  await ctx.close();
}

/* reduced motion: nothing on the new pages waits to be revealed */
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const { p } = await open(ctx, base);
  for (const h of ['#/', '#/ib', '#/concepts']) {
    if (h === '#/') await p.evaluate(() => nav('home')); else { await p.evaluate(h => { location.hash = h }, h); await p.waitForTimeout(350) }
    const hidden = await p.evaluate(() => [...document.querySelectorAll('#view .rv, #view .sy-pp, #view .sy-shot, #view .cx-card')].filter(e => getComputedStyle(e).opacity !== '1' || e.classList.contains('rv-wait')).length);
    check(hidden === 0, `reduced motion: every block on ${h} is visible`);
  }
  await ctx.close();
}

/* accessibility */
{
  const axe = fs.readFileSync(path.join(ROOT, 'tests/node_modules/axe-core/axe.min.js'), 'utf8');
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const { p } = await open(ctx, base);
  for (const w of [1440, 390]) {
    await p.setViewportSize({ width: w, height: 900 }); const viol = [];
    for (const h of ['#/', '#/ib', '#/concepts', '#/concepts/ib-dp/inflation', '#/concepts/upsc-cse/inflation']) {
      if (h === '#/') await p.evaluate(() => nav('home')); else { await p.evaluate(h => { location.hash = h }, h); await p.waitForTimeout(400) }
      if (!(await p.evaluate(() => typeof axe !== 'undefined'))) await p.addScriptTag({ content: axe });
      const sel = h === '#/ib' ? '.ibl' : '#view';
      const r = await p.evaluate(async s => (await axe.run(document.querySelector(s), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations.map(x => x.id + ':' + x.nodes.length + ' ' + x.nodes.slice(0, 2).map(n => n.target.join(' ')).join(' ; ')), sel);
      if (r.length) viol.push(h + ' ' + r.join(','));
    }
    if (w === 1440) {
      for (const k of ['ib', 'up', 'tools']) {
        await p.locator('#sy-t-' + k).click(); await p.waitForTimeout(150);
        const r = await p.evaluate(async k => (await axe.run(document.getElementById('sy-p-' + k), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] } })).violations.map(x => x.id), k);
        if (r.length) viol.push('menu ' + k + ' ' + r.join(','));
        await p.keyboard.press('Escape');
      }
      const f = await p.evaluate(async () => (await axe.run(document.getElementById('sy-fe'), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] } })).violations.map(x => x.id));
      if (f.length) viol.push('footer ' + f.join(','));
    }
    check(!viol.length, `${w}px: axe finds no WCAG A/AA violation on the home page, the IB landing page, the shared concepts${w === 1440 ? ', the three menus and the footer' : ''}`, viol.join(' | '));
  }
  await ctx.close();
}
await b.close(); srv.close(); done();
