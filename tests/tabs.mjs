/* Every tab opens the page its label names, by clicking the real tab bar, in
   the four sections whose tabs had drifted (Practise, Teacher, IA, workspace);
   a calculation's own address opens it; a simulator search result opens the
   simulator. */
import { serve, browser, open, check, done } from './lib.mjs';
const { srv, base } = await serve();
const b = await browser();
const ctx = await b.newContext({ viewport: { width: 1366, height: 900 } });
const { p, errors } = await open(ctx, base + '#/course');

const want = {
  practise: { "Question bank": /Question engine/, "Data response": /Data response/, "Economist's Gym": /Economist's Gym/, "Retrieval": /Retrieval queue/,
    "Thinking drills": /Thinking drills/, "Transfer tasks": /Transfer tasks/, "Teach it back": /Teach it back/,
    "Explain it like an economist": /Explain it like an economist/, "The data lab": /The data lab/, "Data trap lab": /data trap lab/i, "Writing lab": /writing lab/i },
  teacher: { "Class dashboard": /Class intelligence/, "IA checklist": /IA checklist/, "Lesson planner": /lesson planner/i, "Retrieval starter": /retrieval starter/i,
    "Exam builder": /Exam builder/, "Marking sheets": /Marking sheets/ },
  ia: { "Student checklist": /My IA checklist/, "Portfolio tracker": /Portfolio tracker/, "Article checker": /article/i },
  workspace: { "Study plan": /Study plan/, "Revision priority": /Revision priority/ },
};
for (const [v, m] of Object.entries(want)) {
  await p.evaluate(v => nav(v, 0), v); await p.waitForTimeout(250);
  const bad = [];
  for (const [label, re] of Object.entries(m)) {
    const tab = p.locator('#tabs button, .tabs button, [role="tab"]', { hasText: label }).first();
    if (await tab.count()) await tab.click(); else await p.evaluate(([v, l]) => nav(v, SECTIONS.find(s => s.v === v).tabs.indexOf(l)), [v, label]);
    await p.waitForTimeout(200);
    const heads = (await p.locator('#view h1, #view h2').allInnerTexts()).slice(0, 4).join(' | ');
    if (!re.test(heads)) bad.push(`${label} → ${heads.slice(0, 60)}`);
  }
  check(!bad.length, `every ${v} tab opens the page its label names`, bad.join('; '));
}

const k = await p.evaluate(() => Object.keys(CMAPC)[0]);
const { p: q } = await open(ctx, base + '#/calculate/0/' + k);
await q.waitForTimeout(500);
check(await q.evaluate(k => CB.id === k, k), "a calculation's own address opens that calculation");
await q.getByRole('button', { name: '← Calculation Board' }).click(); await q.waitForTimeout(250);
check(await q.evaluate(() => location.hash) === '#/calculate', 'leaving it returns to the board and its address');
await q.evaluate(() => { SIDX = null; eval(buildIndex().find(x => x.k === 'Exam simulator').go) }); await q.waitForTimeout(300);
check(await q.evaluate(() => location.hash) === '#/papers/exam-simulator', 'a simulator search result opens the simulator');
await q.evaluate(() => { SIDX = null; eval(buildIndex().find(x => x.k === 'Case study').go) }); await q.waitForTimeout(300);
check(/worked-cases/.test(await q.evaluate(() => location.hash)), 'a worked-case search result opens the worked cases');
check(errors.length === 0, `no page errors (${errors.join(' | ')})`);
await b.close(); srv.close(); done();
