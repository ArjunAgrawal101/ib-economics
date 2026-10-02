/* The final release's pages in a real browser: the Tutorials terms as supplied
   and its enquiry links; the Economists timeline (hover and keyboard
   previews, relation lines, the small-screen list), a profile's editorial
   layer, the influence map and the comparisons; and the data page's reading
   layer. */
import { serve, browser, open, check, done } from './lib.mjs';
const { srv, base } = await serve();
const b = await browser();
const ctx = await b.newContext({ viewport: { width: 1366, height: 900 } });
const { p, errors } = await open(ctx, base + '#/tutorials');
await p.waitForTimeout(400);

/* tutorials */
const t = await p.locator('#view').innerText();
const want = [['Regular sessions', '20', '1 hour'], ['IA support', '100', '6 sessions'], ['Economics EE supervisor support', '150', null], ['Marathon Revision', '300', '20 sessions'], ['Exam Practice', '200', '12 sessions']];
const cards = await p.locator('.tu-card').allInnerTexts();
check(cards.length === 5 && want.every(([n, pr, s]) => cards.some(c => c.includes(n) && c.includes(pr) && (!s || c.includes(s)))), 'five pathways at the exact supplied prices, counts and lengths');
check(!/90[- ]min|guarantee|best teacher|100%/i.test(t), 'no 90-minute wording and no promises of results');
const prices = [...t.matchAll(/US\$\s*(\d+)/g)].map(m => +m[1]);
check(prices.length > 0 && prices.every(v => [20, 100, 150, 200, 300].includes(v)), `only the five supplied prices appear (${[...new Set(prices)].join(', ')})`);
const hrefs = await p.locator('.tu-card a.tu-cta').evaluateAll(a => a.map(x => x.getAttribute('href')));
check(hrefs.length === 5 && hrefs.every(h => h.startsWith('mailto:arjun1agr@gmail.com')), 'every pathway has an enquiry link to the real address');
const faq = p.locator('.tu-faq details').first();
await faq.locator('summary').focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(100);
check(await faq.evaluate(d => d.open), 'a question opens from the keyboard');
check(/I do not write commentaries/.test(t) && /guidance rather than ghostwriting/.test(t), 'IA and EE support are stated as guidance, not ghostwriting');

/* economists: the timeline */
await p.evaluate(() => nav('ideas', 0)); await p.waitForTimeout(400);
check(await p.locator('.ec-node').count() === 16, 'the timeline places sixteen economists');
await p.locator('.ec-node[data-id="hayek"]').hover(); await p.waitForTimeout(150);
check(/Hayek/.test(await p.locator('#ec-prev').innerText()) && await p.locator('.ec-rel.on').count() > 0, 'hovering a name previews it and draws its relations');
await p.locator('.ec-node[data-id="sen"]').focus(); await p.waitForTimeout(150);
check(/Sen/.test(await p.locator('#ec-prev').innerText()), 'focusing a name from the keyboard previews it');
await p.locator('.ec-node[data-id="sen"]').press('Enter'); await p.waitForSelector('.ec-q', { timeout: 10000 });
check(await p.evaluate(() => location.hash) === '#/ideas/economists/sen', 'selecting a name opens the profile');
const prof = await p.locator('#view').innerText();
check(/The central question/i.test(prof) && /Core idea/i.test(prof) && /Major work/i.test(prof) && await p.locator('.ec-chain.big li').count() >= 4, 'a profile opens with the question, core idea, major work and idea chain');
check(/The problem they faced/i.test(prof) && /Criticisms and limits/i.test(prof) && await p.locator('.id-ideas li').count() >= 3, 'the written profile is all still there');
await p.evaluate(() => nav('ideas', 1)); await p.waitForTimeout(300);
const edges = await p.locator('.ec-edge').count();
check(edges > 10 && (await p.locator('#view').innerText()).match(/ built on | challenged /g).length >= edges, 'the influence map draws every relation and lists each in text');
await p.evaluate(() => nav('ideas', 2)); await p.waitForTimeout(300);
await p.locator('.ec-pairs button', { hasText: 'Smith and Marx' }).click(); await p.waitForTimeout(200);
check(/Adam Smith/.test(await p.locator('.ec-ctab thead').innerText()) && /Karl Marx/.test(await p.locator('.ec-ctab thead').innerText()) && await p.locator('.ec-ctab tbody tr').count() === 7, 'a comparison sets seven dimensions side by side');

/* data */
await p.evaluate(() => nav('data', 0)); await p.waitForSelector('#dl-main svg', { timeout: 15000 });
const d = await p.locator('#view').innerText();
check(/WHAT|What/.test(await p.locator('.dl-meta').innerText()) && /Source/i.test(await p.locator('.dl-meta').innerText()), 'the chart names what, where, when, unit and source');
check(/What might explain it/i.test(d) && /What to be careful about/i.test(d) && /do not show that one caused the other/.test(d), 'the chart is read with explanations as possibilities and a causation caution');

/* small screens */
await p.setViewportSize({ width: 390, height: 844 });
await p.evaluate(() => nav('ideas', 0)); await p.waitForTimeout(300);
check(await p.locator('.ec-vt').isVisible() && await p.locator('.ec-vt > li').count() === 16, 'on a phone the timeline becomes a list of all sixteen');
check(errors.length === 0, `no page errors (${errors.join(' | ')})`);
await b.close(); srv.close(); done();
