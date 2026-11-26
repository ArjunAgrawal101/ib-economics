/* The definitive release's search-engine landing pages (tools/seo/build_landing.py):
   /ib-economics/, /upsc-economics/ and /the-indian-economy/. Each must stand on its own as
   a plain page (title, description, canonical address, preview card, valid structured data),
   open the application at an address that exists, scroll no sideways on a phone, pass axe,
   state no price, publisher or ISBN for the book, and be listed once in the sitemap. The
   main page's own structured data for the author and the book is checked too. */
import fs from 'node:fs';
import path from 'node:path';
import { serve, browser, open, check, done, ROOT } from './lib.mjs';

const axeSrc = (() => { try { return fs.readFileSync(path.join(ROOT, 'tests/node_modules/axe-core/axe.min.js'), 'utf8'); } catch (e) { return null; } })();
const { srv, base } = await serve();
const b = await browser();
const PAGES = [['ib-economics', 'IB DP Economics · Arjun Agrawal'], ['upsc-economics', 'UPSC CSE Economics · Arjun Agrawal'],
  ['the-indian-economy', 'The Indian Economy · A Comprehensive Academic and Examination Reference · Arjun Agrawal']];
const SITE = 'https://ib-economics-pi.vercel.app/';

/* every in-app address the landing pages use, resolved by the application itself */
const ctx0 = await b.newContext({ viewport: { width: 1440, height: 900 } });
const { p: app } = await open(ctx0, base);
const sm = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');

for (const [slug, title] of PAGES) {
  for (const w of [1440, 390, 320]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
    const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await p.goto(`${base}${slug}/`, { waitUntil: 'load' });
    const g = await p.evaluate(() => ({
      title: document.title, desc: (document.querySelector('meta[name=description]') || {}).content || '',
      canon: (document.querySelector('link[rel=canonical]') || {}).href || '', og: (document.querySelector('meta[property="og:image"]') || {}).content || '',
      ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => { try { return JSON.parse(s.textContent); } catch (e) { return null; } }),
      h1: document.querySelectorAll('h1').length, over: document.documentElement.scrollWidth - innerWidth, scripts: document.querySelectorAll('script:not([type="application/ld+json"])').length,
      app: [...document.querySelectorAll('a[href^="../#/"]')].map(a => a.getAttribute('href').slice(3)),
      imgs: [...document.querySelectorAll('img')].map(i => ({ ok: i.complete && i.naturalWidth > 0, w: i.getAttribute('width'), h: i.getAttribute('height') })),
      text: document.body.innerText }));
    if (w === 1440) {
      check(g.title === title && g.desc.length > 60 && g.canon === `${SITE}${slug}/` && /^https:\/\//.test(g.og), `${slug}: its own title, description, canonical address and preview image`, JSON.stringify({ title: g.title, canon: g.canon }));
      check(g.ld.length === 1 && g.ld[0] && g.ld[0]['@context'] === 'https://schema.org' && g.ld[0].author && g.ld[0].author.name === 'Arjun Agrawal', `${slug}: valid structured data naming its author`);
      check(g.h1 === 1 && g.scripts === 0, `${slug}: one heading, and no script: a plain page that stores nothing`);
      const bad = await app.evaluate(hs => hs.filter(h => routeParse(h) === null), g.app);
      check(g.app.length >= 6 && bad.length === 0, `${slug}: every link into the application opens an address that exists (${g.app.length} links)`, bad.join(' '));
      check(g.imgs.every(i => i.ok && i.w && i.h), `${slug}: every image loads and has its size`);
      check(sm.split(`<loc>${SITE}${slug}/</loc>`).length === 2, `${slug}: listed once in the sitemap`);
      if (slug === 'the-indian-economy') check(!/₹|\bISBN\b|publisher|\bprice\s*:|\bRs\.?\s?\d|\bINR\b/i.test(g.text) && /641/.test(g.text) && /153 chapters/.test(g.text) && /not their complete syllabi/.test(g.text), 'the book page states the book\'s own facts and scope, and no price, publisher or ISBN');
      if (axeSrc) {
        await p.addScriptTag({ content: axeSrc });
        const v = await p.evaluate(async () => (await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations.map(x => x.id + ':' + x.nodes.length));
        check(!v.length, `${slug}: axe finds no WCAG A/AA violation`, v.join(' | '));
      }
    }
    check(g.over <= 0, `${slug} at ${w}px: nothing scrolls sideways`, String(g.over));
    check(errs.length === 0, `${slug} at ${w}px: no errors`, errs.join(' | '));
    await ctx.close();
  }
}

/* the main page: the author and the book as structured data, with nothing unconfirmed */
const ld = await app.evaluate(() => [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => JSON.parse(s.textContent)));
const person = ld.find(x => x['@type'] === 'Person'), book = ld.find(x => x['@type'] === 'Book');
check(!!person && person.name === 'Arjun Agrawal' && person.sameAs.length === 3 && !person.worksFor && !person.affiliation, 'the main page describes the author, with the three profiles the site links and no employer');
check(!!book && book.name === 'The Indian Economy' && book.numberOfPages === 641 && book.author['@id'] === person['@id'] && !book.isbn && !book.publisher && !book.offers, 'and the book, with its own facts and no ISBN, publisher or price');
await ctx0.close();
await b.close(); srv.close();
done();
