/* The Economics EE Studio, the video studio (against a stubbed /api/youtube
   in every state), the Educator Studio and the pathways, driven the way a
   user drives them: typing, clicking, reloading. */
import { serve, browser, open, check, done } from './lib.mjs';
const { srv, base } = await serve();
const b = await browser();

/* ── EE Studio ─────────────────────────────────────────────────────────── */
const ctx = await b.newContext({ viewport: { width: 1366, height: 900 } });
let { p, errors } = await open(ctx, base + '#/ees/research-question-lab');
await p.fill('#es-rq-f-rq', 'What are the effects of minimum wage laws?');
await p.getByRole('button', { name: 'Diagnose' }).click(); await p.waitForTimeout(200);
const rep = await p.locator('.es-diag').innerText();
check(/Risk of becoming descriptive\s*High risk/i.test(rep) && /Time and place boundaries\s*Needs work/i.test(rep), 'the research question lab diagnoses a broad descriptive question', rep.slice(0, 300));
check(await p.locator('text=Questions to improve it').count() === 1, 'the diagnosis is followed by questions for the student');
await p.fill('#es-rq-f-rq', 'To what extent did the 2019 rise in the minimum wage reduce employment in restaurants in Pune between 2019 and 2023?');
await p.getByRole('button', { name: 'Diagnose' }).click(); await p.waitForTimeout(200);
check(await p.locator('.es-hist li').count() === 2, 'each diagnosis is kept as a version, so the student can compare');
await p.reload({ waitUntil: 'load' }); await p.waitForTimeout(400);
check((await p.inputValue('#es-rq-f-rq')).startsWith('To what extent'), 'the question survives a reload (stored on this device)');

/* evidence matrix: add, filter, persist */
await p.evaluate(() => nav('ees', 8)); await p.waitForTimeout(200);
await p.fill('#es-ev-src', 'Labour force survey, 2023'); await p.fill('#es-ev-claim', 'Restaurant employment fell after the rise');
await p.selectOption('#es-ev-dir', 'Supports');
await p.getByRole('button', { name: 'Add to matrix' }).click(); await p.waitForTimeout(200);
check(await p.locator('.es-evt tbody tr').count() === 1, 'a source can be added to the evidence matrix');
check(/No challenging evidence yet/.test(await p.locator('.es').innerText()), 'the matrix points out when nothing challenges the argument');
await p.reload({ waitUntil: 'load' }); await p.waitForTimeout(400);
check(await p.locator('.es-evt tbody tr').count() === 1, 'the matrix survives a reload');

/* argument map */
await p.evaluate(() => nav('ees', 9)); await p.waitForTimeout(200);
await p.getByRole('button', { name: '+ Claim' }).click(); await p.getByRole('button', { name: '+ Evidence' }).click(); await p.waitForTimeout(150);
check(await p.locator('.es-node').count() === 2, 'nodes can be added to the argument map');
await p.locator('.es-node').nth(1).getByRole('button', { name: 'Move up' }).click(); await p.waitForTimeout(150);
check(/Evidence/.test(await p.locator('.es-node').first().innerText()), 'nodes can be reordered');

/* data lab */
await p.evaluate(() => nav('ees', 7)); await p.waitForTimeout(200);
await p.getByRole('button', { name: 'Load constructed practice data' }).click(); await p.waitForTimeout(200);
await p.getByRole('button', { name: 'Correlation and scatter' }).click(); await p.waitForTimeout(200);
const dl = await p.locator('.es').innerText();
check(/What the data shows/.test(dl) && /What the data suggests/.test(dl) && /Correlation does not establish causation/.test(dl), 'the data lab separates what data show, suggest and do not establish');
check(await p.locator('.es-chart svg').count() === 1, 'the data lab draws the chart');

/* quality check */
await p.evaluate(() => nav('ees', 17)); await p.waitForTimeout(200);
/* answer the first section: No to its first (essential) item, Yes to the rest */
const n0 = await p.locator('.es-qc section').first().locator('fieldset').count();
for (let i = 0; i < n0; i++) { await p.locator('.es-qc section').first().locator('fieldset').nth(i).locator('label').nth(i === 0 ? 2 : 0).click(); await p.waitForTimeout(80); }
check(/High risk/.test(await p.locator('.es-qc section').first().innerText()), 'a No on an essential item reads High risk, in words');
for (let i = 0; i < n0; i++) { await p.locator('.es-qc section').first().locator('fieldset').nth(i).locator('label').nth(0).click(); await p.waitForTimeout(80); }
check(/Ready/.test(await p.locator('.es-qc section').first().innerText()), 'all Yes reads Ready');
check(!/\b\d+\s*\/\s*30\b/.test(await p.locator('.es').innerText()), 'no mark out of 30 appears');
check(errors.length === 0, 'no page errors in the EE Studio', errors.join(' | '));

/* ── the video studio, against every state of the endpoint ───────────────── */
const vids = { ok: true, status: 'ok', source: 'youtube-data-api', fetchedAt: '2026-09-26T10:00:00Z', stale: false,
  categories: [{ key: 'economics', label: 'Economics' }, { key: 'international-relations', label: 'International Relations' }, { key: 'other', label: 'Other' }],
  channel: { id: 'UCaaaaaaaaaaaaaaaaaaaaaa', title: 'Arjun Agrawal', url: 'https://www.youtube.com/channel/UCaaaaaaaaaaaaaaaaaaaaaa', subscribeUrl: 'https://www.youtube.com/channel/UCaaaaaaaaaaaaaaaaaaaaaa?sub_confirmation=1' },
  videos: [
    { id: 'aaaaaaaaaaa', title: 'Why inflation hurts savers', description: 'Real rates.', publishedAt: '2026-09-20T10:00:00Z', thumbnail: 'https://i.ytimg.com/vi/aaaaaaaaaaa/hqdefault.jpg', url: 'https://www.youtube.com/watch?v=aaaaaaaaaaa', isShort: false, categories: ['economics'] },
    { id: 'bbbbbbbbbbb', title: 'NATO at seventy-five', publishedAt: '2026-09-10T10:00:00Z', thumbnail: 'https://i.ytimg.com/vi/bbbbbbbbbbb/hqdefault.jpg', url: 'https://www.youtube.com/watch?v=bbbbbbbbbbb', isShort: false, categories: ['international-relations'] },
    { id: 'ccccccccccc', title: 'One idea in a minute', publishedAt: '2026-09-15T10:00:00Z', thumbnail: 'https://i.ytimg.com/vi/ccccccccccc/hqdefault.jpg', url: 'https://www.youtube.com/watch?v=ccccccccccc', isShort: true, categories: ['economics'] }],
  playlists: [{ id: 'PL1', title: 'Economics explained', count: 12, url: 'https://www.youtube.com/playlist?list=PL1' }] };
async function studio(body, status = 200) {
  const c = await b.newContext({ viewport: { width: 1366, height: 900 } });
  await c.route('**/api/youtube', r => body === 'offline' ? r.abort() : r.fulfill({ status, contentType: body === 'html' ? 'text/html' : 'application/json', body: body === 'html' ? '<html>error</html>' : JSON.stringify(body) }));
  await c.route('https://i.ytimg.com/**', r => r.fulfill({ status: 200, contentType: 'image/png', body: Buffer.alloc(0) }));
  const o = await open(c, base + '#/arjun'); await o.p.waitForTimeout(700);
  const t = await o.p.locator('#view').innerText(); const e = o.errors.slice(); await c.close(); return { t, e };
}
let r = await studio(vids);
check(/Featured/.test(r.t) && /Why inflation hurts savers/.test(r.t) && /Latest from Arjun/.test(r.t) && /International Relations/.test(r.t) && /Shorts/.test(r.t) && /Playlists/.test(r.t) && /Subscribe on YouTube/.test(r.t),
  'with a working feed the studio shows featured, latest, categories, Shorts, playlists and subscribe', r.t.slice(0, 400));
check(r.e.length === 0, 'no page errors with a working feed', r.e.join(' | '));
r = await studio({ ok: false, status: 'not-configured', message: 'The YouTube feed is not configured. Set YOUTUBE_API_KEY.', categories: [] });
check(/once the channel feed is connected/i.test(r.t) && /Subscribe on YouTube/.test(r.t) && r.e.length === 0, 'with no credentials the studio explains itself and still links to the channel');
r = await studio({ ok: false, status: 'unavailable', message: 'YouTube responded 500', categories: [] }, 200);
check(/could not be loaded/i.test(r.t) && r.e.length === 0, 'with YouTube failing the studio says so and does not break');
r = await studio('html', 500);
check(/could not be loaded/i.test(r.t) && r.e.length === 0, 'with the endpoint returning an error page the studio does not break');
r = await studio('offline');
check(/could not be loaded/i.test(r.t) && r.e.length === 0, 'with no network the studio does not break');
r = await studio({ ok: true, videos: [], categories: [], channel: {} });
check(/Subscribe on YouTube/.test(r.t) && r.e.length === 0, 'with an empty channel the studio still renders');
r = await studio({ ok: true, videos: 'not a list', channel: null, playlists: 5 });
check(/Subscribe on YouTube/.test(r.t) && r.e.length === 0, 'with a malformed response the studio still renders');

/* the last good list is kept on the device and used when the feed later fails */
{ const c = await b.newContext({ viewport: { width: 1366, height: 900 } });
  let mode = 'ok';
  await c.route('**/api/youtube', r2 => mode === 'ok' ? r2.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(vids) }) : r2.abort());
  await c.route('https://i.ytimg.com/**', r2 => r2.fulfill({ status: 200, contentType: 'image/png', body: Buffer.alloc(0) }));
  const o = await open(c, base + '#/arjun'); await o.p.waitForTimeout(600);
  mode = 'down'; await o.p.reload({ waitUntil: 'load' }); await o.p.waitForTimeout(800);
  const t = await o.p.locator('#view').innerText();
  check(/Why inflation hurts savers/.test(t) && /last list saved on this device/i.test(t), 'when the feed fails later, the last list saved on this device is shown and labelled');
  await o.p.evaluate(() => nav('home')); await o.p.waitForTimeout(300);
  check(/Latest from Arjun/.test(await o.p.locator('#view').innerText()), 'the home page shows the latest video once a list is stored');
  await c.close(); }

/* ── Educator Studio and pathways ─────────────────────────────────────── */
({ p, errors } = await open(ctx, base + '#/educator'));
await p.getByRole('button', { name: 'I’m a DP coordinator' }).first().click().catch(async () => {
  await p.locator('.tag', { hasText: 'coordinat' }).first().click(); });
await p.waitForTimeout(200);
check(await p.locator('.ee-steps li').count() >= 5, 'choosing a role shows its pathway');
await p.locator('.ee-steps li').first().locator('button').first().click(); await p.waitForTimeout(250);
check(await p.evaluate(() => VIEW !== 'educator' || TAB !== 0), 'a pathway step opens existing content');
await p.evaluate(() => nav('home')); await p.waitForTimeout(200);
await p.getByRole('button', { name: 'I’m a student' }).click(); await p.waitForTimeout(200);
check(await p.locator('.pw-card').count() >= 5, 'the home page’s journey band offers the student pathways');
await p.locator('.pw-card', { hasText: 'start my EE' }).locator('button').first().click(); await p.waitForTimeout(250);
check(await p.evaluate(() => VIEW === 'ees'), 'a pathway leads into the EE Studio');
check(errors.length === 0, 'no page errors in the Educator Studio or the pathways', errors.join(' | '));

await b.close(); srv.close(); done();
