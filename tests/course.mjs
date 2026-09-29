/* The course layer in a real browser: a lesson from end to end, the glossary,
   command terms, snapshot maps and their print output, search, revision mode,
   and every new page at phone and desktop widths without horizontal overflow. */
import { serve, browser, open, check, done } from './lib.mjs';
const { srv, base } = await serve();
const b = await browser();
const ctx = await b.newContext({ viewport: { width: 1366, height: 900 } });
const { p, errors } = await open(ctx, base);
const T = n => p.evaluate(n => SECTIONS.find(s => s.v === 'course').tabs.indexOf(n), n);

/* a lesson, end to end */
const topics = await T('Topics');
check(topics >= 0 && (await T('Topic dossier')) < 0, 'Course › Topics has replaced the topic dossier');
await p.evaluate(t => nav('course', t, '2.5'), topics); await p.waitForTimeout(200);
check(await p.locator('#ls-h').innerText() === 'Elasticities of demand', 'a lesson opens from its address');
check(await p.evaluate(() => location.hash) === '#/course/topics/2.5', 'the lesson has its own address');
for (const k of ['learn', 'see', 'try', 'explain', 'apply', 'evaluate', 'exam', 'retrieve', 'connect'])
  check(await p.locator(`#ls-${k}`).count() === 1, `the lesson has its ${k} section`);
check(await p.locator('.ls-model figure svg').count() >= 1, 'a model card draws its diagram');
await p.locator('#lsq-0 .ls-mo button').first().click();
check(await p.locator('#lsq-0 .ls-mf').count() === 1, 'a misconception check gives feedback after an answer');
await p.locator('#lsr-0 button').first().click();
check(await p.locator('#lsr-0 .ls-ra').count() === 1, 'a retrieval question reveals its answer on request');
await p.locator('#lsse-0 textarea').fill('A price rise lowers quantity demanded; the size of the fall relative to the price change decides revenue.');
await p.locator('#lsse-0 textarea').dispatchEvent('change');
await p.locator('#lsse-0 button').first().click();
check(await p.locator('#lsse-0 .ls-sec-ck li').count() >= 3, 'Can I explain it? shows its checklist after writing');
await p.locator('.ls-exp [role=tab]').nth(2).click();
check(/Deep/.test(await p.locator('#ls-expx').innerText()), 'Explain it to me switches to the deep explanation');
const need = await p.evaluate(() => lsNeeds('2.5'));
for (const k of need) await p.locator(`#ls-rate input[onchange*="'${k}'"]`).check();
check(await p.evaluate(() => lsDone('2.5')), 'ticking every applicable check marks the lesson secure');
const nx = await p.evaluate(() => lsNext());
check(nx && (nx.c === '2.6' || ['2.2', '2.3', '1.2'].includes(nx.c)) && !!nx.why, `what to study next follows the written links (${nx && nx.c})`);
await p.evaluate(() => { LS.depth = 'foundation'; render(); });
check(await p.locator('#ls-exam').count() === 0 && await p.locator('#ls-learn').count() === 1, 'Foundation keeps the core and leaves the exam detail for later');
await p.evaluate(() => { LS.depth = 'core'; LS.teacher = true; render(); });
check(await p.locator('.ls-teach').count() === 1 && await p.locator('.ls-diag').count() >= 1, 'Teach it adds the teacher layer and the diagnostic view');
await p.evaluate(() => { LS.teacher = false; render(); });
await p.evaluate(() => { location.hash = '#/course/topic-dossier/2.7'; }); await p.waitForTimeout(300);
check(await p.evaluate(() => VIEW === 'course' && ARG === '2.7'), 'the old dossier address still opens the lesson');

/* glossary, command terms */
await p.evaluate(() => nav('course', SECTIONS.find(s => s.v === 'course').tabs.indexOf('Dictionary'))); await p.waitForTimeout(200);
const all = await p.locator('#gllist .gl-card').count();
await p.selectOption('#glu', '4'); await p.waitForTimeout(150);
const u4 = await p.locator('#gllist .gl-card').count();
check(all >= 240 && u4 > 10 && u4 < all, `the glossary filters by unit (${u4} of ${all})`);
await p.locator('#gllist .gl-t').first().click();
check(await p.locator('.gl-card.open .gl-body').count() === 1, 'a glossary card opens to its full entry');
await p.locator('.gl-sets button').first().click();
check(await p.locator('#glcset table').count() === 1, 'a comparison opens as a table');
await p.evaluate(() => nav('course', SECTIONS.find(s => s.v === 'course').tabs.indexOf('Command terms'), 'evaluate')); await p.waitForTimeout(200);
check(/IB OFFICIAL/.test(await p.locator('.ct-off').innerText()) && await p.locator('.ct-tg').count() === 1, 'a command term separates the official definition from teacher guidance');

/* snapshots and print */
await p.evaluate(() => snapOpen('2.8')); await p.waitForTimeout(200);
check(await p.locator('.snap-sub .snap-b').count() === 6 && await p.locator('.snap-sub .snap-c').count() === 1, 'a subtopic snapshot has the question in the centre and six branches');
const before = await p.evaluate(() => ({ calls: PRINTGUARD.totalCalls, v: PRINTGUARD.violations.length }));
for (const id of ['2.8', 'u3', 'course']) await p.evaluate(id => printDoc('t', snapHtml(id, {}), 's', { landscape: true, kind: 'map', autoPrint: false }), id);
check(await p.evaluate(b => PRINTGUARD.totalCalls === b.calls && PRINTGUARD.violations.length === b.v, before), 'preparing every map opened no print dialogue');
await p.evaluate(() => { const r = document.getElementById('printroot'); r.innerHTML = ''; r.className = ''; document.getElementById('pgsz').textContent = ''; PRINTOPT = {}; });
/* page count and orientation are read by pymupdf in the release checks; here, the page rule the browser receives */
for (const id of ['2.8', 'u3', 'course']) {
  const r = await p.evaluate(id => { printDoc('t', snapHtml(id, {}), 's', { landscape: true, kind: 'map', autoPrint: false }); const st = document.getElementById('pgsz').textContent;
    const r = document.getElementById('printroot'); const ok = /A4 landscape/.test(st) && r.className === 'p-map' && /Arjun Agrawal \| IB DP Economics/.test(r.innerText);
    r.innerHTML = ''; r.className = ''; document.getElementById('pgsz').textContent = ''; PRINTOPT = {}; return ok }, id);
  check(r, `the ${id} map is laid out for A4 landscape with the restrained footer`);
}
await p.emulateMedia({ media: 'print' });
await p.evaluate(() => printDoc('t', snapHtml('2.8', {}), 's', { landscape: true, kind: 'map', autoPrint: false }));
const pdf = await p.pdf({ preferCSSPageSize: true, printBackground: true });
await p.emulateMedia({ media: 'screen' });
check(pdf.length > 5000, 'the 2.8 map renders to a PDF');
/* search, revision */
const hits = await p.evaluate(() => { SIDX = null; return { l: cpMatch('externalities').filter(x => x.k === 'Lesson').map(x => x.t), t: cpMatch('externality').filter(x => x.k === 'Dictionary').map(x => x.t) } });
check(hits.l.some(x => /^2\.8 /.test(x)) && hits.t.includes('Externality'), 'search finds the lesson and the glossary term', JSON.stringify(hits));
await p.evaluate(() => nav('practise', SECTIONS.find(s => s.v === 'practise').tabs.indexOf('Ten-minute revision'))); await p.waitForTimeout(150);
await p.getByRole('button', { name: '30 minutes' }).click(); await p.waitForTimeout(150);
check(await p.locator('.rv-t').count() === 2, 'a 30-minute review builds two lessons');

/* every new page at phone and desktop widths */
const pages = [['course', 'Topics', null], ['course', 'Topics', '2.11'], ['course', 'Topics', 'unit-4'], ['course', 'Dictionary', null], ['course', 'Command terms', null],
  ['course', 'Checklists', null], ['course', 'Key concepts', 'Equity'], ['learn', 'Misconception lab', null], ['mind', 0, 'snap-4.6'], ['ia', 'Academic integrity', null], ['papers', 1, null]];
for (const w of [360, 390, 768, 1440]) {
  await p.setViewportSize({ width: w, height: 900 });
  const bad = [];
  for (const [v, t, a] of pages) {
    const over = await p.evaluate(([v, t, a]) => { const s = SECTIONS.find(x => x.v === v); nav(v, typeof t === 'number' ? t : s.tabs.indexOf(t), a);
      return document.documentElement.scrollWidth - document.documentElement.clientWidth }, [v, t, a]);
    if (over > 1) bad.push(`${v}/${t}/${a}: ${over}px`);
  }
  check(bad.length === 0, `${w}px · no new page scrolls sideways`, bad.join(' | '));
}
check(errors.length === 0, 'no page errors', errors.join(' | '));
await b.close(); srv.close(); done();
