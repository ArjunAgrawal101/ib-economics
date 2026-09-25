/* Shared helpers: a static server for the repository root, a browser, and a
   page opener that clears the opening sequence and the first-visit welcome. */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TYPES = { '.html':'text/html; charset=utf-8', '.js':'text/javascript', '.json':'application/json',
  '.webmanifest':'application/manifest+json', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg',
  '.pdf':'application/pdf', '.txt':'text/plain', '.md':'text/plain' };

export function serve(port = 0) {
  return new Promise(resolve => {
    const srv = http.createServer((req, res) => {
      let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      if (p.endsWith('/')) p += 'index.html';
      const f = path.join(ROOT, p);
      if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end('not found'); return; }
      res.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' });
      fs.createReadStream(f).pipe(res);
    });
    srv.listen(port, '127.0.0.1', () => resolve({ srv, base: `http://127.0.0.1:${srv.address().port}/` }));
  });
}

export async function browser() {
  const opts = {};
  if (process.env.PW_CHROMIUM) opts.executablePath = process.env.PW_CHROMIUM;
  return chromium.launch(opts);
}

/* Open a route and return the page with its console errors collected. The
   opening sequence and the welcome dialogue are dismissed the way a user would. */
export async function open(ctx, url) {
  const p = await ctx.newPage();
  const errors = [];
  p.on('pageerror', e => errors.push(e.message));
  await p.goto(url, { waitUntil: 'load' });
  await p.evaluate(() => { try { splashEnd(true); } catch (e) {} });
  await p.waitForTimeout(250);
  const skip = p.getByRole('button', { name: 'Skip for now' });
  if (await skip.count()) await skip.first().click().catch(() => {});
  return { p, errors };
}

let failures = 0;
export function check(ok, name, detail) {
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${!ok && detail ? '\n     ' + detail : ''}`);
  if (!ok) failures++;
}
export function done() {
  console.log(failures ? `\n${failures} failure(s)` : '\nall passed');
  process.exitCode = failures ? 1 : 0;
}
