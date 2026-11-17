/* UPSC CSE Economics: the eight tabs and their addresses, the first section's
   addresses as aliases, one heading per page, the syllabus and its four layers,
   the course facts, enquiries that use only the published contact details, the
   current-affairs register, the preparation strategy, no handbook file anywhere,
   axe on every page, no sideways scroll at 320, 390, 768 and 1440 px, motion
   and reduced motion. The home page and the header belong to the shell's suites. */
import fs from 'node:fs';
import path from 'node:path';
import { serve, browser, open, check, done, ROOT } from './lib.mjs';
const { srv, base } = await serve();
const b = await browser();
const st = p => p.evaluate(() => ({ v: VIEW, t: TAB, a: ARG, h: location.hash }));
const go = async (p, h, ms = 450) => { await p.evaluate(h => { location.hash = h }, h); await p.waitForTimeout(ms) };
const TABS = [
  ['UPSC Home', '#/upsc', 'Understand the Indian economy. Master the economic dimension of UPSC.'],
  ['Syllabus', '#/upsc/syllabus', 'The Economics syllabus, line by line'],
  ['Economics Resources', '#/upsc/economics-resources', 'The UPSC Economics resource library'],
  ['Handbook Library', '#/upsc/handbook-library', null],
  ['Current Affairs', '#/upsc/current-affairs', 'Current Affairs and Economics'],
  ['Preparation Strategy', '#/upsc/preparation-strategy', 'A strategy for the Economics of the Civil Services Examination'],
  ['Online Course', '#/upsc/online-course', 'Master Economics for UPSC. Build the understanding to answer with confidence.'],
  ['Contact / Enrol', '#/upsc/contact-enrol', 'Contact and enrolment']];
const PAGES = [...TABS.map(t => t[1]), '#/upsc/economics-resources/inflation', '#/upsc/handbook-library/volume-v', '#/upsc/syllabus/m-budget', '#/upsc/current-affairs/bop-sep-2026'];
const COURSE_MSG = 'Hello, I am interested in joining the three-month UPSC CSE Economics Intensive Online Programme priced at ₹9,999. Please share the upcoming batch schedule and enrolment details.';
const WA = 'https://wa.me/917092844945', MAIL = 'mailto:arjun1agr@gmail.com', TEL = 'tel:+917092844945';
const text = u => decodeURIComponent(new URL(u).searchParams.get('text') || '');

/* no handbook document is in the repository or reachable from the site */
{
  const bad = [];
  const walk = d => { for (const n of fs.readdirSync(d)) { if (n === 'node_modules' || n === '.git') continue; const f = path.join(d, n); const s = fs.statSync(f);
    if (s.isDirectory()) walk(f); else if (/\.(pdf|docx?|odt|epub)$/i.test(n) && !/assets[\\/]carousels[\\/]economics-in-60-seconds-\d{3}\.pdf$/.test(f)) bad.push(path.relative(ROOT, f)); } };
  walk(ROOT);
  check(bad.length === 0, 'no handbook PDF, Word file or e-book is stored anywhere in the repository (the public carousel PDFs apart)', bad.join(', '));
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  check(!/Platinum[^"'`]*\.(pdf|docx)/i.test(html) && !/handbooks?\/[^"'`]*\.(pdf|docx)/i.test(html), 'the page names no handbook file');
  const dir = path.join(ROOT, 'assets/upsc/handbooks');
  const imgs = fs.readdirSync(dir).flatMap(d => fs.readdirSync(path.join(dir, d)).map(f => d + '/' + f));
  check(imgs.length >= 11 && imgs.every(f => /\.webp$/.test(f)) && imgs.every(f => fs.statSync(path.join(dir, f)).size <= 120000), `the handbook previews are small WebP images (${imgs.length})`);
  for (const u of ['assets/upsc/handbooks/volume-iii/volume-iii.pdf', 'assets/upsc/volume-i.pdf', 'content/upsc/handbooks.pdf']) {
    const r = await fetch(base + u); check(r.status === 404, `${u} is not served`);
  }
}

/* desktop */
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const { p, errors } = await open(ctx, base);
  await p.evaluate(() => document.fonts.ready);

  /* the eight tabs, their addresses, one heading each, and no tab bar of their own */
  check(await p.evaluate(() => UP_TABS.join('|')) === TABS.map(t => t[0]).join('|') && await p.evaluate(() => SECTIONS.find(s => s.v === 'upsc').tabs === UP_TABS), 'the eight tabs, in order: ' + TABS.map(t => t[0]).join(' · '));
  check(await p.evaluate(() => JSON.stringify(UP_T)) === JSON.stringify({ overview: 0, syllabus: 1, resources: 2, handbooks: 3, current: 4, strategy: 5, course: 6, contact: 7 }), 'UP_T maps the eight keys to the tabs');
  for (const [i, [lab, h, h1]] of TABS.entries()) {
    check(await p.evaluate(i => routeFormat('upsc', i), i) === h, `${lab} has the address ${h}`);
    await go(p, h);
    const s = await p.evaluate(() => ({ v: VIEW, t: TAB, h1: [...document.querySelectorAll('#view h1')].map(x => x.textContent.replace(/\s+/g, ' ').trim()), title: document.title,
      /* the shared concept teaser's "read as" switch is a tablist inside its own panel, not a tab bar for the page */
      bars: [...document.querySelectorAll('#view [role="tablist"], #view #subnav')].filter(e => !e.closest('.cc-tz')).length, over: document.documentElement.scrollWidth - innerWidth }));
    check(s.v === 'upsc' && s.t === i && s.h1.length === 1 && (h1 === null ? s.h1[0].length > 3 : s.h1[0] === h1) && s.bars === 0 && /UPSC CSE Economics · Arjun Agrawal$/.test(s.title) && s.over <= 0,
      `${h} opens ${lab} with one heading${h1 ? ': ' + h1 : ''}`, JSON.stringify(s));
  }

  /* the first section's addresses still work, and the address bar is set to the page's own */
  for (const [from, want] of [['#/upsc/economics-handbooks', { v: 'upsc', t: 3, a: null, h: '#/upsc/handbook-library' }], ['#/upsc/economics-handbooks/volume-iii', { v: 'upsc', t: 3, a: 'volume-iii', h: '#/upsc/handbook-library/volume-iii' }],
    ['#/upsc/upsc-economics-course', { v: 'upsc', t: 6, a: null, h: '#/upsc/online-course' }], ['#/upsc/contact-enrolment', { v: 'upsc', t: 7, a: null, h: '#/upsc/contact-enrol' }], ['#/upsc/about-the-educator', { v: 'about', t: 0, a: null, h: '#/about' }]]) {
    await go(p, from, 600); const s = await st(p);
    check(s.v === want.v && s.t === want.t && s.a === want.a && s.h === want.h, `${from} opens ${want.h}`, JSON.stringify(s));
  }
  /* a cold deep link to an alias */
  {
    const p2 = await ctx.newPage(); const e2 = []; p2.on('pageerror', e => e2.push(e.message));
    await p2.goto(base + '#/upsc/upsc-economics-course', { waitUntil: 'load' }); await p2.waitForTimeout(600);
    const s = await st(p2); check(s.v === 'upsc' && s.t === 6 && s.h === '#/upsc/online-course' && !e2.length, 'a cold deep link to an old address opens the page and settles on its new address', JSON.stringify(s) + e2.join(' '));
    await p2.close();
  }

  /* UPSC Home */
  await go(p, '#/upsc');
  const home = await p.evaluate(() => {
    const steps = [...document.querySelectorAll('#view ol.up-flow8 > li')];
    return { cta: [...document.querySelectorAll('.up-hero .up-cta a')].map(a => [a.textContent.trim().replace(/\s*→$/, ''), a.getAttribute('href')]),
      steps: steps.map(li => li.querySelector('.up-f8-t').textContent.trim().toUpperCase()), stepIcons: steps.every(li => li.querySelector('svg[aria-hidden="true"]')),
      why: !!document.getElementById('up-why-h') && /Why Economics matters for UPSC/.test(document.getElementById('up-why-h').textContent),
      shelf: [...document.querySelectorAll('.up-shelf a')].map(a => [a.getAttribute('href'), a.querySelector('img').getAttribute('src')]),
      ca: [...document.querySelectorAll('.up-prev-ca a')].map(a => a.getAttribute('href')), hl: [...document.querySelectorAll('.up-cband .up-hl b')].map(x => x.textContent),
      about: !!document.querySelector('#view a[href="#/about"]'), syl: document.querySelectorAll('.up-prev-lines a').length };
  });
  check(home.cta.length === 2 && /^EXPLORE UPSC RESOURCES$/i.test(home.cta[0][0]) && home.cta[0][1] === '#/upsc/economics-resources' && /^EXPLORE THE 3-MONTH COURSE$/i.test(home.cta[1][0]) && home.cta[1][1] === '#/upsc/online-course',
    'the hero offers EXPLORE UPSC RESOURCES and EXPLORE THE 3-MONTH COURSE', JSON.stringify(home.cta));
  check(home.why, 'the home page explains why Economics matters for UPSC');
  check(home.steps.join(' → ') === 'UNDERSTAND THE CONCEPT → BUILD ECONOMIC FOUNDATIONS → CONNECT WITH INDIAN ECONOMY → STUDY GOVERNMENT POLICY → INTEGRATE CURRENT AFFAIRS → APPLY THROUGH PRELIMS QUESTIONS → DEVELOP MAINS ANSWERS → REVISE AND EVALUATE' && home.stepIcons,
    'the preparation system is an ordered list of eight steps, each with its own line icon', home.steps.join(' | '));
  check(home.shelf.length === 11 && home.shelf.every(([h, src], i) => h === `#/upsc/handbook-library/volume-${['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x', 'xi'][i]}` && /^assets\/upsc\/handbooks\/volume-[ivx]+\/cover\.webp$/.test(src)),
    'the shelf holds the eleven real covers, each opening its volume in the Handbook Library');
  const latest = await p.evaluate(() => [...UP_CA].sort((a, b) => b.d.localeCompare(a.d)).slice(0, 3).map(c => '#/upsc/current-affairs/' + c.id));
  check(JSON.stringify(home.ca) === JSON.stringify(latest), 'the current-affairs preview shows the latest three entries', JSON.stringify(home.ca));
  check(home.hl.join('|') === '3 months|Online only|₹9,999|Maximum 25 students|Prelims + Mains|Static + Current Affairs' && home.about && home.syl >= 4, 'the course preview shows its six highlight cards, and About is one link to the shared page');

  /* the syllabus */
  await go(p, '#/upsc/syllabus');
  const syl = await p.evaluate(() => {
    const lines = [...document.querySelectorAll('#view details.up-line:not(.up-th14)')];
    return { n: lines.length, official: lines.every(d => { const q = d.querySelector('summary q'); return q && d.querySelector('summary .up-lab.o') && q.textContent.length > 10 }),
      layers: lines.every(d => ['b', 'c', 'd'].every(k => d.querySelector('.up-layer-' + k))), bmark: lines.every(d => /platform's explanation/i.test(d.querySelector('.up-layer-b').textContent)),
      pre: !!document.querySelector('#syl-prelims h2') && /Prelims: General Studies Paper I/.test(document.querySelector('#syl-prelims h2').textContent),
      mains: !!document.querySelector('#syl-mains h2') && /Mains: General Studies Paper III/.test(document.querySelector('#syl-mains h2').textContent),
      quotes: [...document.querySelectorAll('#syl-mains details.up-line summary q')].map(q => q.textContent),
      esd: document.querySelector('#syl-p-esd summary q').textContent, subs: [...document.querySelectorAll('#syl-p-esd .up-subs b')].map(b => b.textContent),
      src: document.querySelector('.up-src').textContent.replace(/\s+/g, ' '), srcHref: document.querySelector('.up-src a').getAttribute('href'),
      scope: document.querySelector('.up-scope').textContent, tbc: document.querySelectorAll('#view summary .up-tbc').length,
      hb: [...document.querySelectorAll('#view .up-hbl-v')].map(a => a.getAttribute('href')), idx: document.querySelectorAll('.up-idx a.up-idx-a').length,
      print: !!document.querySelector('#view button[onclick="upPrintSyllabus()"]') };
  });
  check(syl.n === 14 && syl.official && syl.layers && syl.bmark, `every line shows the official wording, marked Official, and three further layers, the explanation marked as the platform's (${syl.n} lines)`);
  check(syl.pre && syl.mains && syl.esd === 'Economic and Social Development-Sustainable Development, Poverty, Inclusion, Demographics, Social Sector Initiatives, etc.' && syl.subs.join('|') === 'Sustainable development|Poverty|Inclusion|Demographics|Social sector initiatives',
    'Prelims GS Paper I and Mains GS Paper III are separate; the economic and social development line carries its five themes');
  check(syl.quotes.length === 10 && syl.quotes[2] === 'Government Budgeting.' && syl.quotes[9] === 'Investment models.' && syl.quotes[0] === 'Indian Economy and issues relating to planning, mobilization of resources, growth, development and employment.' && await p.evaluate(() => { const q = document.querySelector('#syl-mains summary q'); return getComputedStyle(q, '::before').content === 'open-quote' && getComputedStyle(q).quotes.includes('“') }), 'Mains shows the ten Economy lines of GS Paper III, each in quotation marks', JSON.stringify(syl.quotes.slice(0, 3)));
  check(/UPSC Examination Notice No\. 05\/2026-CSE/.test(syl.src) && /4 February 2026/.test(syl.src) && /^https:\/\/www\.upsc\.gov\.in\/sites\/default\/files\/Notif-CSP-2026-Engl-060226Rev\.pdf$/.test(syl.srcHref) && syl.tbc === 5,
    'the notice is named with its date and link, and the five lines still to confirm are flagged', syl.tbc);
  check(/not presented as preparation for the Economics Optional paper/.test(syl.scope), 'the page says the course and handbooks address Economics within General Studies, not the Optional');
  check(syl.hb.length > 40 && await p.evaluate(hs => hs.every(h => { const r = routeParse(h); return r && r.v === 'upsc' && r.t === 3 && /^volume-[ivx]+$/.test(r.a) }), syl.hb), `every handbook reference opens a volume in the Handbook Library (${syl.hb.length})`);
  await p.locator('.up-syl-tools button', { hasText: 'Expand all' }).click();
  check(await p.evaluate(() => [...document.querySelectorAll('.up-syl details.up-line')].every(d => d.open)), 'Expand all opens every line and theme');
  await p.locator('.up-syl-tools button', { hasText: 'Collapse all' }).click();
  await p.locator('.up-idx a', { hasText: 'Land reforms' }).click(); await p.waitForTimeout(900);
  const jump = await p.evaluate(() => { const d = document.getElementById('syl-m-land'); const r = d.getBoundingClientRect(); return { open: d.open, top: r.top, focus: document.activeElement === d.querySelector('summary'), h: location.hash } });
  check(jump.open && jump.top >= 0 && jump.top < 300 && jump.focus && jump.h === '#/upsc/syllabus', 'the sticky index opens a line, brings it into view and moves focus to it', JSON.stringify(jump));
  const sticky = await p.evaluate(() => { const r = document.querySelector('.up-idx').getBoundingClientRect(); return r.top >= 0 && r.top < 260 });
  check(sticky, 'the index stays in view while the lines scroll');
  await p.keyboard.press('Enter'); await p.waitForTimeout(150);
  check(await p.evaluate(() => !document.getElementById('syl-m-land').open), 'a line opens and closes from the keyboard');
  const pr = await p.evaluate(() => { const before = PRINTGUARD.totalCalls, h = upSylPrintHtml(); return { calls: PRINTGUARD.totalCalls - before, lines: [...UP_PRE_LINES, ...UP_MAINS, ...UP_GS2].every(L => h.includes('“' + esc(L.o) + '”')), optional: /Optional/.test(h), off: /Official/.test(h) } });
  check(pr.calls === 0 && pr.lines && pr.optional && pr.off && syl.print, 'Print the syllabus prepares a document with every official line, marked, and prints nothing until asked');
  await go(p, '#/upsc/syllabus/m-subsidies', 900);
  check(await p.evaluate(() => { const d = document.getElementById('syl-m-subsidies'); const r = d.getBoundingClientRect(); return d.open && r.top >= 0 && r.top < 320 }), 'a syllabus address opens its line');
  await go(p, '#/upsc/syllabus/mains', 900);
  check(await p.evaluate(() => { const r = document.getElementById('syl-mains').getBoundingClientRect(); return r.top >= 0 && r.top < 320 }), 'the first section\'s #/upsc/syllabus/mains still lands on Mains');

  /* the course */
  await go(p, '#/upsc/online-course');
  const c = await p.evaluate(() => ({ t: document.getElementById('view').innerText, run: [...document.querySelectorAll('.up-hero .up-run > span')].map(x => x.textContent.trim().toUpperCase()).join(' / '),
    enq: [...document.querySelectorAll('#view a')].filter(a => /Enquire about the next batch/i.test(a.textContent)).map(a => a.href),
    mail: [...document.querySelectorAll('#view a[href^="mailto:"]')].map(a => a.getAttribute('href')), tel: [...document.querySelectorAll('#view a[href^="tel:"]')].map(a => a.getAttribute('href')),
    mods: document.querySelectorAll('.up-mod').length, months: [...document.querySelectorAll('.up-jm')].map(m => [...m.querySelectorAll('.up-jm-v a')].map(a => a.getAttribute('href').split('/').pop()).join(',')),
    meth: [...document.querySelectorAll('.up-meth b')].map(b => b.textContent), who: document.querySelectorAll('.up-who li').length, ld: typeof UP_COURSE === 'object' && UP_COURSE.price === 9999 && UP_COURSE.maxStudents === 25 && UP_COURSE.durationISO === 'P3M' }));
  check(c.run === 'ARJUN AGRAWAL / UPSC CSE ECONOMICS / 3-MONTH INTENSIVE ONLINE PROGRAMME', 'the course opens ARJUN AGRAWAL / UPSC CSE ECONOMICS / 3-MONTH INTENSIVE ONLINE PROGRAMME', c.run);
  check(/₹9,999/.test(c.t) && /for the complete three-month programme/i.test(c.t) && !/₹4,999|per month|\/ ?month/i.test(c.t), 'the fee reads ₹9,999 for the complete three-month programme, never per month');
  check(/3 months/i.test(c.t) && /online only/i.test(c.t) && /Maximum 25 students per batch/i.test(c.t) && /Prelims \+ Mains/i.test(c.t) && /Static \+ Current Affairs/i.test(c.t) && /General Studies syllabus/i.test(c.t), 'three months, online only, at most 25 per batch, Prelims and Mains within General Studies, static and current');
  check(/intentionally limited to a maximum of 25 students, to support more focused interaction and personalised attention/i.test(c.t) && !/seats? (left|remaining)|hurry|last few|filling fast|countdown|only \d+ (seats|places)/i.test(c.t), 'the batch limit of 25 is explained, with no countdown or scarcity claim');
  check(c.enq.length >= 2 && c.enq.every(h => h.startsWith(WA + '?text=') && text(h) === COURSE_MSG), 'ENQUIRE ABOUT THE NEXT BATCH opens WhatsApp with the exact course message');
  check(c.mail.length >= 2 && c.mail.every(h => h.startsWith(MAIL + '?') && decodeURIComponent(h).includes(COURSE_MSG)) && c.tel.length >= 2 && c.tel.every(h => h === TEL), 'the same enquiry goes by email to the published address, and the phone link calls the published number');
  check(c.mods === 12 && c.months.join(' | ') === 'volume-i,volume-ii,volume-iii,volume-vi | volume-iv,volume-v,volume-vii,volume-viii,volume-ix | volume-x,volume-xi' && /Indicative/.test(c.t) && /No volume treats national income accounting as a subject of its own/.test(c.t),
    'twelve modules mapped to the volumes, the indicative three months (I, II, III, VI · IV, V, VII, VIII, IX · X, XI), and the national-income gap stated');
  check(c.meth.join('|') === 'Conceptual teaching|Visual explanations and diagrams|Topic-wise structured notes|Indian economic examples|Current-affairs integration|Prelims-oriented practice|Mains-oriented analytical discussion|Answer-writing guidance|Revision and consolidation' && c.who === 4, 'the nine elements of the methodology, and the four audiences');
  check(!/recording|mock test|unlimited doubt|one-to-one|personal evaluation|individual mentoring|guarantee|refund|instalment|discount|\b\d+\s+(lectures|classes|sessions|hours)\b/i.test(c.t) && !/razorpay|paypal|checkout|pay now|batch starts|starts on \d/i.test(c.t), 'no recordings, mock tests, evaluation, guarantees, payment links or invented batch dates');
  check(c.ld, 'UP_COURSE exposes the facts for structured data: ₹9,999 (9999 INR), P3M, at most 25');

  /* contact / enrol */
  await go(p, '#/upsc/contact-enrol');
  const ct = await p.evaluate(() => ['upHandbooks', 'upCourse', 'upMentor', 'upResources'].map(k => { const c = document.getElementById('enq-' + k); const a = [...c.querySelectorAll('.up-acts a')];
    return { k, wa: a.find(x => x.href.startsWith('https://wa.me/'))?.href, mail: a.find(x => x.href.startsWith('mailto:'))?.getAttribute('href'), tel: a.find(x => x.href.startsWith('tel:'))?.getAttribute('href'), msg: FX_ENQ[k].msg, shown: c.querySelector('blockquote').textContent } }));
  check(ct.every(x => x.wa && x.wa.startsWith(WA + '?text=') && text(x.wa) === x.msg && x.shown === x.msg && x.mail.startsWith(MAIL + '?') && x.tel === TEL), 'handbooks, the course, mentorship and resources each have WhatsApp, email and phone with their own message', JSON.stringify(ct.map(x => x.k)));
  await p.locator('#up-ct-vol').selectOption('volume-viii'); await p.waitForTimeout(100);
  const hv = await p.evaluate(() => ({ wa: document.querySelector('#enq-upHandbooks .up-acts a').href, msg: document.getElementById('msg-upHandbooks').textContent, want: fxHandbookMsg(upVol('volume-viii')) }));
  check(text(hv.wa) === hv.want && hv.msg === hv.want && /Volume VIII, Balance of Payments and International Trade/.test(hv.want), 'choosing a volume rewrites the handbook message in the shared wording');
  const contacts = await p.evaluate(() => { const h = document.getElementById('view').innerHTML; return { wa: [...new Set(h.match(/https:\/\/wa\.me\/[^"?]+/g) || [])], ml: [...new Set(h.match(/mailto:[^"?]+/g) || [])], tl: [...new Set(h.match(/tel:[^"]+/g) || [])] } });
  check(contacts.wa.join() === WA && contacts.ml.join() === MAIL && contacts.tl.join() === TEL, 'the page uses no contact detail other than the published ones', JSON.stringify(contacts));

  /* current affairs */
  await go(p, '#/upsc/current-affairs');
  const ca = await p.evaluate(() => ({ items: [...document.querySelectorAll('#up-ca .up-ca-e')].map(e => ({ d: e.querySelector('time').getAttribute('datetime'), src: e.querySelector('.up-ca-src dd')?.textContent.trim(), dl: [...e.querySelectorAll('.up-ca-dl dt')].map(x => x.textContent).join('|'), link: !!e.querySelector('.up-ca-links a') })),
    themes: [...document.querySelectorAll('.up-ca-page .up-chip')].map(x => x.dataset.t || ''), note: document.querySelector('.up-ca-note').textContent }));
  check(ca.items.length >= 19 && ca.items.every(x => /^\d{4}-\d{2}-\d{2}$/.test(x.d) && x.src && x.src.length > 10), `every entry carries its source and its date (${ca.items.length})`);
  check(ca.items.every(x => x.dl === 'Economic concept|Why it matters|Prelims relevance|Mains relevance' && x.link), 'every entry gives the concept, why it matters, its Prelims and Mains relevance and a link to the handbook part');
  check(ca.items.every((x, i) => i === 0 || ca.items[i - 1].d >= x.d), 'entries run newest first');
  check(/not a live feed/.test(ca.note) && /Last compiled on 17 November 2026/.test(ca.note), 'the register says it is edited by hand and when it was last compiled');
  const allowed = ['Union Budget', 'Economic Survey', 'RBI and monetary policy', 'Inflation and price stability', 'Agriculture', 'Industry and manufacturing', 'Employment', 'Banking and financial markets', 'External sector', 'International economic institutions', 'Government schemes', 'Fiscal federalism', 'Infrastructure', 'Poverty and inclusive growth'];
  const shown = ca.themes.filter(Boolean);
  check(shown.every(t => allowed.includes(t)) && shown.every((t, i) => i === 0 || allowed.indexOf(shown[i - 1]) < allowed.indexOf(t)) && await p.evaluate(sh => sh.every(t => UP_CA.some(c => c.th === t)) && UP_CA_THEMES.filter(t => UP_CA.some(c => c.th === t)).length === sh.length, shown),
    `only themes with entries are offered, in the set order (${shown.length})`);
  await p.locator('.up-ca-page .up-chip', { hasText: 'External sector' }).click(); await p.waitForTimeout(150);
  const f = await p.evaluate(() => ({ vis: [...document.querySelectorAll('#up-ca .up-ca-e')].filter(e => !e.hidden).map(e => e.dataset.t), months: [...document.querySelectorAll('#up-ca .up-reg-m')].filter(s => !s.hidden).length, pressed: document.querySelector('.up-ca-page .up-chip.on').getAttribute('aria-pressed') }));
  check(f.vis.length >= 2 && f.vis.every(t => t === 'External sector') && f.pressed === 'true', 'a theme filter shows only its entries, and empty months are hidden', JSON.stringify(f));
  await p.locator('.up-ca-page .up-chip', { hasText: 'All themes' }).click();
  const checked = await p.evaluate(() => UP_CA.filter(c => c.v).map(c => [c.id, c.url, c.d]));
  check(checked.length === 8 && checked.every(([, u]) => /^https:\/\/(rbi\.org\.in|www\.indiabudget\.gov\.in)\//.test(u)), 'the eight entries added in this release name the official document they were checked in', JSON.stringify(checked.map(x => x[0])));
  await go(p, '#/upsc/current-affairs/bop-sep-2026', 900);
  check(await p.evaluate(() => { const e = document.getElementById('ca-bop-sep-2026'); const r = e.getBoundingClientRect(); return r.top >= 0 && r.top < 320 && e.classList.contains('hl') }), 'an entry\'s address brings it into view');

  /* preparation strategy */
  await go(p, '#/upsc/preparation-strategy');
  const sg = await p.evaluate(() => ({ t: document.getElementById('view').innerText, h2: [...document.querySelectorAll('#view h2')].map(x => x.textContent), pyq: document.querySelector('#view a[href="https://www.upsc.gov.in/examinations/previous-question-papers"]') !== null, week: document.querySelectorAll('.up-week tbody tr').length, phases: document.querySelectorAll('.up-ph').length }));
  check(sg.phases === 4 && sg.week === 7 && ['Prepare in four phases', 'A week of preparation', 'Join static concepts to current affairs', 'Use previous-year questions well', 'Structure a GS III Economy answer', 'A revision cycle'].every(h => sg.h2.includes(h)),
    'the strategy sets out phases, a weekly rhythm, static and current, previous-year questions, an answer structure and a revision cycle');
  check(sg.pyq && /does not reproduce UPSC questions/.test(sg.t) && /not a promise of results/i.test(sg.t) && !/guarantee/i.test(sg.t), 'it points to the official papers, reproduces none, and promises no result');

  /* resources and the connector */
  await go(p, '#/upsc/economics-resources');
  await p.locator('#up-q').fill('MSP'); await p.waitForTimeout(150);
  const vis = () => p.evaluate(() => [...document.querySelectorAll('#up-tgrid .up-tc')].filter(li => !li.hidden).map(li => li.querySelector('b').textContent));
  let v = await vis(); check(v.length === 1 && v[0] === 'MSP Is Not Procurement', `search finds MSP (${v.join(', ')})`);
  await p.locator('#up-q').fill(''); await p.locator('.up-res-page .up-chip', { hasText: 'External Sector' }).click(); await p.waitForTimeout(150);
  v = await vis(); check(v.length === 1 && /Balance of Payments/.test(v[0]), 'a category filter narrows the list');
  await p.locator('.up-res-page .up-chip', { hasText: 'All' }).first().click(); await p.waitForTimeout(100);
  check((await vis()).length === 11 && await p.locator('#up-tgrid svg').count() === 11, 'All shows the eleven topic previews, each with its diagram');
  const conn = await p.evaluate(() => typeof ccTeaser === 'function' ? { teaser: true } : { teaser: false, ib: [...document.querySelectorAll('#connector .up-ibl:not(.u)')].map(a => [a.textContent, a.getAttribute('href')]) });
  if (conn.teaser) check(true, 'the concept layer\'s teaser stands in for the connector');
  else {
    check(conn.ib.length >= 8 && await p.evaluate(hs => hs.every(([, h]) => { const r = routeParse(h); return r && typeof VIEWS[r.v] === 'function' }), conn.ib), `the connector links to live IB pages (${conn.ib.length})`);
    const atlas = conn.ib.filter(([t]) => t === 'Diagram atlas');
    check(atlas.length === 2 && atlas.every(([, h]) => h === '#/lab/diagram-atlas'), 'the connector\'s diagram links reach the Lab\'s Diagram atlas', JSON.stringify(atlas));
  }
  await go(p, '#/upsc/economics-resources/labour');
  await p.locator('.up-opt input').nth(1).check(); await p.locator('.up-mcq button').click();
  check(/Not quite/.test(await p.locator('.up-fb').innerText()), 'a wrong answer is marked, with the explanation');
  await p.locator('.up-opt input').nth(0).check(); await p.locator('.up-mcq button').click();
  check(/Correct/.test(await p.locator('.up-fb').innerText()), 'the right answer is confirmed');
  check(await p.locator('.up-glimpse a[href="#/upsc/handbook-library/volume-xi"]').count() === 1, 'a topic links to its volume in the Handbook Library');

  /* the Handbook Library tab: the library's renderer when present, the catalogue otherwise */
  await go(p, '#/upsc/handbook-library');
  const lib = await p.evaluate(() => ({ hl: typeof hlRender === 'function', cards: document.querySelectorAll('#view .up-hb').length, h1: document.querySelectorAll('#view h1').length }));
  check(lib.h1 === 1 && (lib.hl || lib.cards === 11), lib.hl ? 'the Handbook Library tab is drawn by the library' : 'until the library lands, the tab keeps the eleven-volume catalogue', JSON.stringify(lib));

  /* search and footer */
  await p.evaluate(() => nav('home'));
  const found = await p.evaluate(() => { try { SIDX = null; const I = buildIndex().filter(r => r.k === 'UPSC CSE Economics'); return { tabs: UP_TABS.every(t => I.some(r => r.t === t)), n: I.length } } catch (e) { return { tabs: false, n: 0 } } });
  check(found.tabs && found.n >= 8 + 12 + 11 + 11, `search indexes the eight tabs, the syllabus lines, the volumes and the topics (${found.n})`);
  const ft = await p.evaluate(() => [...document.querySelectorAll('#ft-upsc button')].map(x => x.textContent));
  check(ft.join('|') === 'UPSC Home|Syllabus|Handbook Library|Current Affairs|Online Course', 'the footer keeps its UPSC column, with the new names', ft.join('|'));
  check(errors.length === 0, 'no page errors on desktop', errors.join(' | '));
  await ctx.close();
}

/* widths: nothing scrolls sideways */
for (const w of [1440, 768, 390, 320]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 844 } });
  const { p, errors } = await open(ctx, base);
  await p.evaluate(() => document.fonts.ready);
  const bad = [];
  for (const h of PAGES) {
    await go(p, h);
    if (h === '#/upsc/syllabus') await p.evaluate(() => upAccAll(true));
    const o = await p.evaluate(() => ({ doc: document.documentElement.scrollWidth - innerWidth, wide: [...document.querySelectorAll('#view *')].filter(e => { const r = e.getBoundingClientRect(); return r.width && r.right > innerWidth + 1 && getComputedStyle(e).position !== 'fixed' && !e.closest('.up-tw,.up-conn-t') && !(() => { for (let a = e.parentElement; a && a !== document.body; a = a.parentElement) { const c = getComputedStyle(a).overflowX; if (c === 'auto' || c === 'scroll') return true; } return false; })() }).slice(0, 3).map(e => e.className || e.tagName) }));
    if (o.doc > 0 || o.wide.length) bad.push(`${h} +${o.doc} ${o.wide.join(',')}`);
  }
  check(bad.length === 0, `${w}px: no UPSC page scrolls sideways, and nothing reaches past the edge`, bad.join(' | '));
  check(errors.length === 0, `${w}px: no page errors`, errors.join(' | '));
  await ctx.close();
}

/* motion: the eight steps reveal once, and every block ends visible; reduced motion shows everything at once */
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const { p } = await open(ctx, base);
  await go(p, '#/upsc');
  const anim = await p.evaluate(() => document.body.classList.contains('rn-anim'));
  await p.evaluate(() => document.querySelector('.up-flow8').scrollIntoView({ block: 'center' })); await p.waitForTimeout(2200);
  const m = await p.evaluate(() => { const ol = document.querySelector('.up-flow8'); return { cls: ol.className, op: [...ol.children].map(li => +getComputedStyle(li).opacity), anim: getComputedStyle(ol.children[3]).animationName } });
  check(m.op.every(o => o === 1) && (!anim || /up-rise|none/.test(m.anim)), `the eight steps end fully visible after their reveal (motion layer ${anim ? 'on' : 'off'}, ${m.anim})`, JSON.stringify(m));
  await ctx.close();
  const ctx2 = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const { p: p2 } = await open(ctx2, base);
  for (const h of ['#/upsc', '#/upsc/economics-resources', '#/upsc/online-course', '#/upsc/preparation-strategy']) {
    await go(p2, h);
    const hidden = await p2.evaluate(() => [...document.querySelectorAll('#view .rv, #view .up-flow8 li, #view .up-jm, #view .up-25-g i')].filter(e => getComputedStyle(e).opacity !== '1' || getComputedStyle(e).animationName !== 'none').length);
    check(hidden === 0, `reduced motion: nothing on ${h} waits or animates`);
  }
  await ctx2.close();
}

/* accessibility: axe on every UPSC page, at a desktop and a phone width */
{
  const axe = fs.readFileSync(path.join(ROOT, 'tests/node_modules/axe-core/axe.min.js'), 'utf8');
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const { p } = await open(ctx, base);
  for (const w of [1440, 390]) {
    await p.setViewportSize({ width: w, height: 900 }); const viol = []; let n = 0;
    for (const h of [...PAGES, '#/upsc/handbook-library/volume-iii']) {
      await go(p, h);
      if (/#\/upsc\/syllabus/.test(h)) await p.evaluate(() => upAccAll(true));
      if (!(await p.evaluate(() => typeof axe !== 'undefined'))) await p.addScriptTag({ content: axe });
      const r = await p.evaluate(async () => (await axe.run(document.getElementById('view'), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] } })).violations.map(x => x.id + ':' + x.nodes.length + ' ' + x.nodes.slice(0, 2).map(n => n.target.join(' ')).join(' ; ')));
      n++; if (r.length) viol.push(h + ' ' + r.join(','));
    }
    check(!viol.length, `${w}px: axe finds no WCAG A or AA violation on any of the ${n} UPSC pages`, viol.join(' | '));
  }
  await ctx.close();
}
await b.close(); srv.close(); done();
