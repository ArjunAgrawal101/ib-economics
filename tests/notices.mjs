/* Every Exam DNA page says, once, that it is historical and not a prediction
   tool; every economist profile shows its inquiry question. */
import { serve, browser, open, check, done } from './lib.mjs';
const { srv, base } = await serve();
const b = await browser();
const ctx = await b.newContext({ viewport: { width: 1366, height: 900 } });
const { p, errors } = await open(ctx, base + '#/dna');

const tabs = await p.evaluate(() => SECTIONS.find(s => s.v === 'dna').tabs);
const dnaBad = [];
for (let i = 0; i < tabs.length; i++) {
  await p.evaluate(i => nav('dna', i), i); await p.waitForTimeout(200);
  const n = await p.evaluate(() => (document.getElementById('view').innerText.match(/not a prediction tool/g) || []).length);
  if (n !== 1) dnaBad.push(`${tabs[i]}: ${n}`);
}
check(!dnaBad.length, `all ${tabs.length} Exam DNA pages say once that they are not a prediction tool`, dnaBad.join('; '));
check(!/(these topics are likely|likely to (appear|come up)|expect this topic to|we predict)/i.test(await p.evaluate(() => document.body.innerText)), 'no DNA page predicts what will be asked');

await p.evaluate(() => nav('ideas', 0, 'smith')); await p.waitForFunction(() => !!window.__IDEAS__, null, { timeout: 10000 });
const ids = await p.evaluate(() => __IDEAS__.economists.map(e => e.id));
const prBad = [];
for (const id of ids) {
  await p.evaluate(id => nav('ideas', 0, id), id); await p.waitForTimeout(150);
  const ok = await p.evaluate(id => { const e = __IDEAS__.economists.find(x => x.id === id), t = document.getElementById('view').innerText;
    return /An inquiry question/i.test(t) && t.includes(e.question.slice(0, 50)) }, id);
  if (!ok) prBad.push(id);
}
check(ids.length === 16 && !prBad.length, `every one of the ${ids.length} economist profiles shows its inquiry question`, prBad.join(', '));
check(errors.length === 0, `no page errors (${errors.join(' | ')})`);
await b.close(); srv.close(); done();
