/* The renaissance release, driven the way a reader uses it: the home page's
   gateway, daily page and folded desk; Random Economics; the economist's
   toolkit; section openers and their figures; the diagram reading guide;
   search ranking; the footer; and reduced motion. */
import { serve, browser, open, check, done } from './lib.mjs';
const { srv, base } = await serve();
const b = await browser();
const ctx = await b.newContext({ viewport: { width: 1366, height: 900 } });
let { p, errors } = await open(ctx, base);
const st = () => p.evaluate(() => ({ v: VIEW, t: TAB, a: ARG }));

/* the home page */
/* the desk first, while the visit is still a first visit: opening the idea of the day can record activity, which opens the desk (on some dates) */
check(await p.locator('details.rn-desk').count() === 1 && !(await p.locator('details.rn-desk').evaluate(d => d.open)), 'on a first visit the desk is folded');
await p.locator('details.rn-desk > summary').click(); await p.waitForTimeout(150);
check(await p.locator('details.rn-desk').evaluate(d => d.open), 'the desk opens on request');
await p.evaluate(() => nav('course')); await p.evaluate(() => nav('home')); await p.waitForTimeout(200);
check(await p.locator('details.rn-desk').evaluate(d => d.open), 'the desk stays as the reader left it');
check(/One next step/.test(await p.locator('details.rn-desk').innerText()), 'the folded desk still holds the existing bands');
check(await p.locator('.rn-home.cv svg.cv-svg').count() === 1, 'the home opener draws its model');
check(await p.locator('.cv-sig').count() >= 5, 'the opener shows the platform\'s scale, counted from its data');
check(await p.locator('.rn-atlas .atl').count() >= 4 && await p.locator('.atl-index .atx').count() >= 5, 'the gateway offers every major destination in two tiers');
await p.locator('.rn-atlas .atl', { hasText: 'Real World' }).first().click(); await p.waitForTimeout(200);
check((await st()).v === 'world', 'a gateway card opens its section');
await p.evaluate(() => nav('home')); await p.waitForTimeout(200);
check(await p.locator('.td-card').count() === 4, 'Today in Economics shows an idea, a case, a question and a word');
await p.locator('.td-card').first().getByRole('button', { name: /Read it/ }).click(); await p.waitForTimeout(200);
check(['learn', 'everywhere'].includes((await st()).v), 'the idea of the day opens its page');
await p.evaluate(() => nav('home')); await p.waitForTimeout(200);

/* Random Economics */
await p.getByRole('button', { name: /Surprise me/ }).first().click(); await p.waitForTimeout(200);
check(await p.locator('#drawer .rnd-card').count() === 1, 'Random Economics opens a card');
await p.locator('#drawer .chip', { hasText: 'Diagram' }).click(); await p.waitForTimeout(150);
check(/^Diagram/.test(await p.locator('#drawer .rnd-k').innerText()), 'Random Economics can be narrowed to one kind');
await p.locator('#drawer').getByRole('button', { name: /Open it/ }).click(); await p.waitForTimeout(250);
check((await st()).v !== 'home' && !(await p.locator('#drawer.on').count()), 'opening a random item goes there and closes the drawer');

/* the toolkit */
await p.goto(base + '#/think/economist-s-toolkit', { waitUntil: 'load' }); await p.waitForTimeout(300);
check((await st()).v === 'think' && await p.locator('.tk-lens').count() === 18, 'the toolkit has its own address and eighteen lenses');
await p.locator('.tk-lens', { hasText: 'Externalities' }).click(); await p.waitForTimeout(150);
check(/Externalities/.test(await p.locator('.tk-card h2').innerText()) && await p.locator('.tk-links .lnk').count() >= 1, 'choosing a lens shows its questions and links into the platform');
await p.locator('.tk-links .lnk').first().click(); await p.waitForTimeout(250);
check((await st()).v !== 'think' || (await st()).t !== 6, 'a lens link opens existing content');

/* openers and identities */
await p.goto(base + '#/course', { waitUntil: 'load' }); await p.waitForTimeout(300);
check(await p.evaluate(() => document.body.dataset.sec === 'course' && !!document.querySelector('#view section.hero.paper .motif')), 'the course opens on paper, with a figure');
await p.goto(base + '#/learn/concept-spine/c-cadv', { waitUntil: 'load' }); await p.waitForTimeout(300);
check(await p.locator('#view section.hero .motif.mf-cadv').count() === 1, 'the comparative advantage page draws comparative advantage');
check(await p.locator('.rn-tlae .kc-tlae').count() === 1, 'a concept page carries the lens questions');
await p.goto(base + '#/lab/diagram-atlas/tax', { waitUntil: 'load' }); await p.waitForTimeout(300);
check(await p.locator('.dg-read .kc').count() === 4, 'a diagram plate carries its reading guide');

/* search */
await p.evaluate(() => openSearch()); await p.waitForTimeout(100); await p.keyboard.type('ped'); await p.waitForTimeout(200);
const top = await p.evaluate(() => [...document.querySelectorAll('.cprow')].slice(0, 5).map(r => r.innerText));
check(top.some(t => /CONCEPT/i.test(t) && /Price elasticity of demand/i.test(t)), 'searching an abbreviation finds the concept near the top', top.join(' | ').slice(0, 300));
await p.keyboard.press('Escape');

/* footer */
await p.locator('nav.ft-explore button', { hasText: 'Mindmaps' }).click(); await p.waitForTimeout(200);
check((await st()).v === 'mind', 'the footer index opens a section');
check(errors.length === 0, 'no page errors across the renaissance journeys', errors.join(' | '));

/* reduced motion: nothing animates */
const rm = await b.newContext({ viewport: { width: 1366, height: 900 }, reducedMotion: 'reduce' });
const o = await open(rm, base);
const anim = await o.p.evaluate(() => { const c = document.querySelector('.rn-home .motif .m-c, #view .motif .m-c'); return c ? getComputedStyle(c).animationName : 'none' });
check(anim === 'none', 'with reduced motion the figures do not animate', anim);
check(await o.p.evaluate(() => !document.body.classList.contains('rn-anim')), 'reduced motion switches the motion layer off');
await rm.close();

await b.close(); srv.close(); done();
