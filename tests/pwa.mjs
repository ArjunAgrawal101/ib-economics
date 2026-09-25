/* Installable and offline: the service worker registers, precaches the
   platform's own files, and a deep link opens with the network switched off. */
import { serve, browser, check, done } from './lib.mjs';
const { srv, base } = await serve();
const b = await browser();
const ctx = await b.newContext();
const p = await ctx.newPage();
await p.goto(base, { waitUntil: 'load' }); await p.waitForTimeout(2500);
const reg = await p.evaluate(async () => { const r = await navigator.serviceWorker.getRegistration(); return !!(r && (r.active || r.installing || r.waiting)); });
check(reg, 'the service worker registers on a secure origin');
const cached = await p.evaluate(async () => { const k = await caches.keys(); const c = await caches.open(k[0]); return (await c.keys()).map(r => new URL(r.url).pathname); });
check(cached.some(u => /exam-dna\.js$/.test(u)) && cached.some(u => /icon-512\.png$/.test(u)), `the platform's own files are precached (${cached.length})`);
const man = await p.evaluate(async () => { const m = await (await fetch('manifest.webmanifest')).json();
  const ok = await Promise.all(m.icons.map(async i => (await fetch(i.src)).ok)); return ok.every(Boolean); });
check(man, 'every manifest icon resolves');
await ctx.setOffline(true);
await p.goto(base + '#/everywhere/big-questions/q-queues', { waitUntil: 'load' }); await p.waitForTimeout(600);
check(await p.evaluate(() => VIEW === 'everywhere' && ARG === 'q-queues'), 'a deep link opens offline once the platform has been visited');
await b.close(); srv.close(); done();
