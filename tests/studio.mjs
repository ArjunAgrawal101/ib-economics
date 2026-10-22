/* The Learning Studio release in a real browser: the Learning Studio (filters,
   the three treatments, the excerpt viewer by mouse and keyboard, enquiry
   links), the home page's new bands, the lab miniature, Learning design,
   Contact, the crawlable studio/ pages, the sitemap, search, widths and axe.
   It ends with a privacy scan of everything the host would serve: no master
   resource, document or private file may be retrievable from the site. */
import fs from 'node:fs';
import path from 'node:path';
import { serve, browser, open, check, done, ROOT } from './lib.mjs';
const { srv, base } = await serve();
const b = await browser();
const ctx = await b.newContext({ viewport: { width: 1366, height: 900 } });
const { p, errors } = await open(ctx, base + '#/studio');
await p.waitForTimeout(500);
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/studio/showcase.json'), 'utf8'));
const items = manifest.items.filter(i => i.status === 'published');
const requests = []; p.on('request', r => { if (!r.url().startsWith(base)) requests.push(r.url()); });

/* the Studio index */
check(await p.locator('.st-card').count() === items.length, `the Studio shows every published item (${items.length})`);
check(await p.locator('.st-group h2').allInnerTexts().then(t => t.join('|')) === 'Visual explainers|Guides|Interactive|Collections', 'four groups, each backed by real resources');
await p.locator('#subnavin button', { hasText: 'Guides' }).click(); await p.waitForTimeout(300);
check(await p.locator('.st-card').count() === items.filter(i => i.type === 'guide').length && await p.evaluate(() => location.hash) === '#/studio/guides', 'a type tab filters the Studio and has its own address');
await p.locator('#subnavin button', { hasText: 'All work' }).click(); await p.waitForTimeout(300);
await p.locator('.st-chip', { hasText: 'For teachers' }).click(); await p.waitForTimeout(300);
const teach = items.filter(i => i.audience.some(a => /teacher|supervisor|coordinator|head/i.test(a))).length;
check(await p.locator('.st-card').count() === teach && await p.locator('.st-chip[aria-pressed="true"]').innerText() === 'For teachers', `the audience filter keeps what is for teachers (${teach}) and says which is pressed`);
await p.locator('.st-chip', { hasText: 'Everyone' }).click(); await p.waitForTimeout(200);

/* an item page, treatment A: the viewer by mouse and keyboard */
await p.locator('.st-card', { hasText: 'Price elasticity of demand' }).click(); await p.waitForTimeout(400);
check(await p.evaluate(() => location.hash) === '#/studio/visual-explainers/price-elasticity-of-demand', 'a card opens the item at a stable address');
check(await p.locator('h1').innerText() === 'Price elasticity of demand' && await p.locator('.st-strip .st-th').count() === 4, 'the item shows its lead excerpt and four more');
const lead = p.locator('.st-lead'); await lead.focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(300);
check(await p.locator('#st-dlg[open]').count() === 1 && /excerpt 1 of 5/.test(await p.locator('#st-dlg-t').innerText()), 'the lead excerpt opens in the viewer from the keyboard');
await p.keyboard.press('ArrowRight'); await p.waitForTimeout(200);
check(/excerpt 2 of 5/.test(await p.locator('#st-dlg-t').innerText()), 'the arrow keys move through the excerpts');
await p.keyboard.press('Escape'); await p.waitForTimeout(200);
check(await p.locator('#st-dlg[open]').count() === 0 && await p.evaluate(() => document.activeElement && document.activeElement.classList.contains('st-lead')), 'Escape closes the viewer and returns focus to the excerpt');
const mail = await p.locator('a.st-cta', { hasText: 'Ask about this resource' }).getAttribute('href');
check(mail.startsWith('mailto:arjun1agr@gmail.com?subject=') && decodeURIComponent(mail).includes('Price elasticity of demand'), 'the enquiry is an email to the published address, naming the resource');
check((await p.locator('a.st-cta', { hasText: 'WhatsApp' }).getAttribute('href')).startsWith('https://wa.me/917092844945?text='), 'WhatsApp opens with a message started');
check(/Not produced or endorsed by the International Baccalaureate/i.test(await p.locator('#view').innerText()), 'the item says it is independent of the IB');

/* every item: renders, its images load and are excerpts, its platform links resolve */
for (const it of items) {
  const tab = manifest.types.findIndex(t => t.k === it.type) + 1;
  await p.evaluate(([t, id]) => nav('studio', t, id), [tab, it.id]); await p.waitForTimeout(350);
  const imgs = await p.evaluate(async () => { const L = [...document.querySelectorAll('#view img')]; L.forEach(i => { i.loading = 'eager' });
    await Promise.all(L.map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; setTimeout(r, 4000) })));
    return L.map(i => [i.currentSrc || i.src, i.naturalWidth, i.naturalHeight]) });
  const bad = imgs.filter(([s, w, h]) => !w || Math.max(w, h) > 1200);
  check(await p.locator('h1').innerText() === it.title && !bad.length, `${it.id}: renders with ${imgs.length} images, none broken or above 1200 px`, bad.map(x => x[0].slice(-60)).join(', '));
  const routes = await p.locator('.st-rels a').evaluateAll(a => a.map(x => x.getAttribute('href')));
  const ok = await p.evaluate(rs => rs.every(r => !!routeParse(r)), routes);
  check(routes.length === it.related.length && ok, `${it.id}: every link to the platform resolves`);
}

/* treatment C: a collection opens the platform's own reader */
await p.evaluate(() => nav('studio', 4, 'economics-in-60-seconds')); await p.waitForTimeout(300);
check(await p.locator('.st-cov').count() === 10, 'Economics in 60 Seconds shows all ten issues');
await p.locator('.st-cov').nth(2).click(); await p.waitForTimeout(400);
check(await p.evaluate(() => VIEW === 'learn' && TAB === 3 && C60V.open === '003'), 'an issue opens in the platform reader');
await p.evaluate(() => nav('studio', 4, 'mindmaps')); await p.waitForTimeout(300);
check(await p.locator('.st-jn').count() === 4, 'the mindmaps collection shows a four-step journey');

/* treatment B: the lab miniature */
await p.evaluate(() => nav('studio', 3, 'learning-lab')); await p.waitForTimeout(300);
await p.locator('.pd-gs button', { hasText: 'It will rise' }).click(); await p.waitForTimeout(150);
check(/Right/.test(await p.locator('#pd-fb').innerText()) && /\$1,800 to \$1,925/.test(await p.locator('#pd-fb').innerText()), 'predicting a revenue rise at $30 is confirmed with the numbers');
await p.locator('#pd-p').fill('60'); await p.dispatchEvent('#pd-p', 'input'); await p.waitForTimeout(150);
check(/\|PED\| = 60 ÷ 30 = 2\.00: demand is price elastic/.test(await p.locator('#pd-read').innerText()) && await p.locator('[data-pd="tr"]').innerText() === '$1,800', 'at $60 the miniature reads |PED| = 2 and the same revenue');
await p.locator('#pd-p').fill('45'); await p.dispatchEvent('#pd-p', 'input'); await p.waitForTimeout(150);
check(/unit elastic/.test(await p.locator('#pd-read').innerText()) && await p.locator('[data-pd="tr"]').innerText() === '$2,025', 'at the midpoint it is unit elastic and revenue is at its peak');

/* Learning design */
await p.evaluate(() => nav('design')); await p.waitForTimeout(400);
check(await p.locator('.ld-step').count() === 9 && (await p.locator('.ld-step h2').allInnerTexts()).join('|') === 'Concept|Model|Diagram|Evidence|Quantitative reasoning|Stakeholder perspectives|Analysis|Evaluation|Judgement', 'Learning design walks the nine steps in order');
check(/consumers bear most of a \$27 tax[^.]*\$24 of the \$27/.test(await p.locator('.ld-stake').innerText()) && /\$1,458/.test(await p.locator('.ld-stake').innerText()), 'the stakeholder step carries the explainer\'s incidence and revenue figures');
await p.locator('.ld-plan summary').first().click(); await p.waitForTimeout(100);
check(await p.locator('.ld-plan').first().evaluate(d => d.open) && /not an IB examination question/.test(await p.locator('#view').innerText()), 'the answer plan opens, and the question is labelled as original');
check(/PED = -10% ÷ 50% = -0\.2/.test(await p.locator('.ld-work').first().innerText()), 'the worked calculation shows PED = -0.2');

/* Contact */
await p.evaluate(() => nav('contact')); await p.waitForTimeout(400);
check(await p.locator('.ct-cat input').count() === 6 && await p.locator('#view form').count() === 0, 'six enquiry categories and no form that pretends to send');
await p.locator('.ct-cat', { hasText: 'Workshops' }).click(); await p.waitForTimeout(100);
check(decodeURIComponent(await p.locator('#ct-mail').getAttribute('href')).includes('subject=Workshop or professional learning'), 'choosing a category rewrites the email subject');
await p.locator('.ct-cat', { hasText: 'Economics resource' }).click(); await p.locator('#ct-item').selectOption('examiner-guide'); await p.waitForTimeout(100);
check(decodeURIComponent(await p.locator('#ct-mail').getAttribute('href')).includes('Resource enquiry: How to Think Like an IB Economics Examiner'), 'choosing a resource names it in the subject');
check(requests.length === 0, 'nothing on these pages contacts another server', requests.slice(0, 3).join(', '));

/* the home page */
await p.evaluate(() => nav('home')); await p.waitForTimeout(600);
check((await p.locator('#cv-h').innerText()).replace(/\s+/g, ' ').trim() === 'Think like an economist.' && (await p.locator('.at-head').innerText()).replace(/\s+/g, ' ').trim() === 'Economics is not just a subject to study. It is a way to understand the world.', 'the cover leads with Think like an economist., then the headline');
check(await p.locator('.cv-lede').innerText() === 'An interactive IB DP Economics learning ecosystem connecting economic concepts, visual understanding, real-world evidence and exam thinking.' && /IB DP Economics/.test(await p.locator('.at-copy .eb').innerText()), 'and the supporting line, with IB DP Economics named above it');
check(await p.locator('#explore .rs-a').count() === 8 && await p.locator('#selected-work .ex').count() === 5, 'eight resource doors, and an exhibition of five pieces');
check(await p.locator('#selected-work .ex-shelf .ex-issue').count() === 10, 'the series shelf holds all ten issues');
check((await p.locator('.at-fig a.at-fl').evaluateAll(a => a.map(x => x.getAttribute('href')))).every(h => h.startsWith('#/studio/')), 'the cover\'s excerpts open their Learning Studio item');
await p.locator('.ex-feature .ex-main').click(); await p.waitForTimeout(300);
check(await p.locator('#st-dlg[open]').count() === 1 && /Exchange rates/.test(await p.locator('#st-dlg-t').innerText()), 'the featured exhibit opens in the viewer');
await p.keyboard.press('Escape'); await p.waitForTimeout(200);
/* the journey: tabs on a vertical rail, moved by the arrow keys */
await p.locator('#aj-t-visualise').click(); await p.waitForTimeout(150); await p.keyboard.press('ArrowDown'); await p.waitForTimeout(200);
check(await p.locator('#aj-t-apply').getAttribute('aria-selected') === 'true' && await p.evaluate(() => document.activeElement.id) === 'aj-t-apply', 'the six perspectives are tabs that the arrow keys move between');
check(/Petrol and diesel excise duties/.test(await p.locator('#aj-panel').innerText()), 'the Apply stage names a dated case from the platform');
await p.locator('#aj-t-interact').click(); await p.waitForTimeout(200);
check(await p.locator('#aj-panel #pd-p').count() === 1 && /\|PED\|/.test(await p.locator('#aj-panel').innerText()), 'the Interact stage holds the working PED model');
/* the lab: five predictions from the platform's own data, then the model */
const preds = await p.evaluate(() => DMPREDICT.tax.map(q => q[3]));
for (let i = 0; i < 5; i++) { await p.locator('#al-body .al-o').nth(preds[i]).click(); await p.waitForTimeout(80);
  if (i === 0) check(/That is what the model does/.test(await p.locator('#al-body .al-fb').innerText()) && await p.evaluate(() => document.activeElement.classList.contains('al-next')), 'a prediction gets immediate feedback, and focus moves to the next step');
  await p.locator('#al-body .al-next').click(); await p.waitForTimeout(80) }
check(/5\s*of 5/.test(await p.locator('#al-body .al-score').innerText()) && await p.locator('#al-body .al-fig svg').count() === 1, 'five correct predictions end with the model\'s own diagram');
check((await p.locator('#al-body .al-act a').getAttribute('href')) === '#/lab/predict-a-diagram', 'the lab leads on to the full Predict-a-diagram lab');
/* the enquiry names the resource the visitor chose */
await p.locator('#st-enq-r').selectOption('examiner-guide'); await p.waitForTimeout(100);
check(decodeURIComponent(await p.locator('#st-enq-m').getAttribute('href')).includes('Resource enquiry: How to Think Like an IB Economics Examiner'), 'the enquiry band names the chosen resource in the email');
check(await p.locator('.st-enq h2').innerText() === 'Interested in exploring more?', 'the home page closes with the invitation');
check(await p.locator('footer .ft-reslink').getAttribute('href') === 'https://ib-economics-pi.vercel.app/' && /For more resources:/.test(await p.locator('footer').innerText()), 'the footer carries the resource link');

/* search */
const found = await p.evaluate(() => { SIDX = null; return cpMatch('extended essay navigator').slice(0, 6).map(x => x.k + ':' + x.t) });
check(found.some(x => x === 'Learning Studio:The Extended Essay Navigator'), 'search finds a Studio item by name', found.join(' | '));

/* widths: nothing scrolls sideways on the new pages */
for (const w of [320, 390, 768, 1024, 1920]) {
  await p.setViewportSize({ width: w, height: 900 }); const over = [];
  for (const h of ['#/studio', '#/studio/visual-explainers/price-elasticity-of-demand', '#/studio/interactive/learning-lab', '#/design', '#/contact', '#/']) {
    await p.evaluate(h => { location.hash = h }, h); await p.waitForTimeout(350);
    if (await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)) over.push(h);
  }
  check(!over.length, `${w}px · no sideways scroll on the new pages`, over.join(', '));
}
await p.setViewportSize({ width: 1366, height: 900 });

/* accessibility: axe on the new pages, at two widths */
const axe = fs.readFileSync(path.join(ROOT, 'tests/node_modules/axe-core/axe.min.js'), 'utf8');
for (const w of [1366, 390]) {
  await p.setViewportSize({ width: w, height: 900 }); const viol = [];
  for (const h of ['#/studio', '#/studio/visual-explainers/price-elasticity-of-demand', '#/studio/interactive/learning-lab', '#/studio/collections/economics-in-60-seconds', '#/design', '#/contact']) {
    await p.evaluate(h => { location.hash = h }, h); await p.waitForTimeout(400);
    if (!(await p.evaluate(() => typeof axe !== 'undefined'))) await p.addScriptTag({ content: axe });
    const v = await p.evaluate(async () => (await axe.run('#view', { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations.map(x => x.id + ':' + x.nodes.length));
    if (v.length) viol.push(h + ' ' + v.join(','));
  }
  check(!viol.length, `${w}px · axe finds no WCAG A/AA violation on the new pages`, viol.join(' | '));
}
/* the home page's new sections, including every journey stage and the lab's finished state */
for (const w of [1440, 390]) {
  /* the cover's entrance (about 0.56 s on a return to home) has finished before the scan reads contrast */
  await p.setViewportSize({ width: w, height: 900 }); await p.evaluate(() => nav('home')); await p.waitForTimeout(900);
  if (!(await p.evaluate(() => typeof axe !== 'undefined'))) await p.addScriptTag({ content: axe });
  const run = sel => p.evaluate(async s => (await axe.run(document.querySelector(s), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations.map(x => s + ' ' + x.id + ':' + x.nodes.length), sel);
  let viol = [];
  for (const s of ['section.at-hero', '#explore', '#selected-work', '#at-journey', '.al-band', '.at-phil', '.st-enq']) viol = viol.concat(await run(s));
  for (let i = 0; i < 6; i++) { await p.evaluate(i => atJGo(i), i); viol = viol.concat(await run('#at-journey')) }
  await p.evaluate(() => { AL.i = 5; AL.ans = DMPREDICT.tax.map(q => q[3]); alPaint() }); viol = viol.concat(await run('.al-band'));
  check(!viol.length, `${w}px · axe finds no WCAG A/AA violation in the home page's new sections`, [...new Set(viol)].join(' | '));
}
await p.setViewportSize({ width: 1366, height: 900 });
check(errors.length === 0, `no page errors (${errors.join(' | ')})`);

/* the crawlable pages and the sitemap */
const get = async u => { const r = await fetch(base + u); return { s: r.status, t: r.status === 200 ? await r.text() : '' } };
for (const u of ['studio/'].concat(items.map(i => `studio/${i.id}/`))) {
  const { s, t } = await get(u);
  const ld = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(t);
  let ldOk = false; try { ldOk = !!JSON.parse(ld[1])['@type'] } catch (e) {}
  const imgs = [...t.matchAll(/<img[^>]+src="([^"]+)"/g)].map(m => new URL(m[1], base + u).pathname.slice(1));
  const missing = []; for (const i of imgs) { if ((await fetch(base + i)).status !== 200) missing.push(i) }
  check(s === 200 && /<link rel="canonical" href="https:\/\/ib-economics-pi\.vercel\.app\//.test(t) && /property="og:image"/.test(t) && /<h1>/.test(t) && ldOk && !missing.length,
    `${u} is a complete page: canonical, preview image, heading, structured data and images that load`, missing.join(', '));
}
const sm = (await get('sitemap.xml')).t;
check(items.every(i => sm.includes(`/studio/${i.id}/</loc>`)) && sm.includes('<loc>https://ib-economics-pi.vercel.app/</loc>'), 'the sitemap lists the home page and every Studio page');
check(/Sitemap: https:\/\/ib-economics-pi\.vercel\.app\/sitemap\.xml/.test((await get('robots.txt')).t), 'robots.txt names the sitemap');
const home = (await get('')).t;
check(/<link rel="canonical" href="https:\/\/ib-economics-pi\.vercel\.app\/">/.test(home) && /og:image" content="https:\/\/ib-economics-pi\.vercel\.app\/assets\/brand\/social-card\.png"/.test(home) && (await fetch(base + 'assets/brand/social-card.png')).status === 200, 'the home page has a canonical address and a preview image that exists');

/* privacy: everything the host would serve */
const served = []; const skip = new Set(['.git', 'node_modules']);
(function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { if (skip.has(e.name)) continue; const f = path.join(d, e.name); e.isDirectory() ? walk(f) : served.push(path.relative(ROOT, f)) } })(ROOT);
const docs = served.filter(f => /\.(pdf|pptx?|docx?|key|zip|psd|ai|indd)$/i.test(f));
check(docs.every(f => /^assets\/carousels\/economics-in-60-seconds-\d{3}\.pdf$/.test(f)), 'the only documents served are the ten public carousels', docs.filter(f => !/carousels/.test(f)).join(', '));
const htmls = served.filter(f => /\.html?$/i.test(f));
check(htmls.every(f => f === 'index.html' || f === '404.html' || /^studio\/([a-z0-9-]+\/)?index\.html$/.test(f)), 'no other application or page is served (the EE Navigator is not in the site)', htmls.filter(f => !/^(index|404)\.html$|^studio\//.test(f)).join(', '));
const studioFiles = served.filter(f => f.startsWith('assets/studio/'));
check(studioFiles.length > 0 && studioFiles.every(f => /\.webp$/.test(f)), `the Studio's images are WebP excerpts only (${studioFiles.length})`);
check(!served.some(f => /previews\.json$|inventory|masters?\//i.test(f)), 'neither the preview recipes nor an inventory nor a masters folder is served');
const text = ['index.html', 'sitemap.xml', 'content/studio/showcase.json', 'src/modules/37-studio-data.js'].concat(htmls.filter(f => f.startsWith('studio/'))).map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n');
check(!/presentation-assets|claude\/uploads|\/root\/|Misconception Database|ee_nav_seen|PED_\d\d_|v3_\d\d_|BoP_\d\d_/.test(text), 'no master file name, private path, held resource or application source appears in what is served');
check(fs.readFileSync(path.join(ROOT, 'service-worker.js'), 'utf8').includes('cache.put(shell ? "./index.html" : req'), 'the service worker never stores a Studio page as the offline app');

await b.close(); srv.close(); done();
