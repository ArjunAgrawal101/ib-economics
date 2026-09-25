/* The platform's own self-test suite, run in a real browser, plus the
   startup facts it cannot check from inside itself. */
import { serve, browser, open, check, done } from './lib.mjs';
const { srv, base } = await serve();
const b = await browser();
const ctx = await b.newContext({ viewport: { width: 1366, height: 900 } });
const { p, errors } = await open(ctx, base);
const r = await p.evaluate(() => ({ failed: window.__failed, total: (window.__qa || []).length, report: window.__report,
  src: window.__DATA_SOURCE__, text: document.getElementById('view').innerText }));
check(r.total > 1500, `the self-test suite ran (${r.total} checks)`);
check(r.failed && r.failed.length === 0, 'every built-in self-test passes', (r.failed || []).join(' | '));
for (const c of r.report || []) check(!c.failed, `area: ${c.category} (${c.tests})`);
check(/assets folder/.test(r.src || ''), 'the external data corpora load from assets/data', r.src);
check(!/QA task|Paper 1 draft/.test(r.text), 'a first visit shows no self-test fixture data');
check(errors.length === 0, 'no page errors on load', errors.join(' | '));
await b.close(); srv.close(); done();
