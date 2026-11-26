"""Search-engine landing pages for the three major destinations (idempotent).

The platform is a single page addressed by the hash (#/ib, #/upsc, #/book), which a search
engine sees as one page. The definitive brief (2026-11-26) suggests descriptive titles,
canonical addresses and landing pages for the major IB and UPSC destinations, without
compromising the application. These pages are that, and nothing more: plain HTML at
/ib-economics/, /upsc-economics/ and /the-indian-economy/, each with its own title,
description, canonical address, preview card and structured data, a short accurate account
of what is there, and links that open the application at the right place. They load no
script, store nothing and are never part of the application's own routes; the Learning
Studio's pages under studio/ are the precedent.

Every link below was read from the running application (routeFormat) and is checked by
tests/landing.mjs. The book's facts are the book's own (51-book.js); no price, publisher or
ISBN is stated, because none has been confirmed.

Run: python3 tools/seo/build_landing.py   (then add nothing by hand to the generated pages)"""
import html, json, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]
SITE = 'https://ib-economics-pi.vercel.app/'
e = html.escape

PERSON = {"@type": "Person", "name": "Arjun Agrawal", "url": SITE + "#/about",
          "jobTitle": "Economics educator, academic resource creator and author",
          "sameAs": ["https://www.linkedin.com/in/arjun-agrawal-560405310/", "https://instagram.com/imarjun101",
                     "https://www.youtube.com/@arjunagrawal5724"]}

CSS = """:root{--obs:#16181C;--char:#1A1D22;--ivory:#F7F3EA;--paper:#FBF9F4;--tx:#1C1F24;--tx2:#4A4F57;--line:#E2DBCB;--gold:#B08A47;--goldt:#7A5E26;--bur:#7A2436;--forest:#1F4434}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}body{margin:0;background:var(--paper);color:var(--tx);font:400 17px/1.65 "Source Serif 4",Georgia,serif}
a{color:inherit}.w{max-width:1080px;margin:0 auto;padding:0 clamp(16px,4vw,40px)}
header{background:var(--paper);border-bottom:1px solid var(--line)}.top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px 24px;min-height:68px}
.brand{display:flex;align-items:center;gap:12px;text-decoration:none}.brand img{width:40px;height:40px}.brand b{font:400 21px/1 "Bodoni Moda",Georgia,serif}.brand span{display:block;font:700 10px/1.4 Manrope,system-ui,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:var(--bur)}
nav.m{display:flex;flex-wrap:wrap;gap:4px 18px}nav.m a{font:600 12px/1 Manrope,system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;padding:12px 0}nav.m a:hover,nav.m a:focus-visible{text-decoration:underline}
.hero{background:var(--obs);color:#F4EFE4;padding:clamp(40px,7vw,88px) 0}.k{font:600 11px/1.4 Manrope,system-ui,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#D9C28F;margin:0}
h1{font:400 clamp(36px,5.6vw,64px)/1.05 "Bodoni Moda",Georgia,serif;margin:14px 0 0;max-width:18ch}.lede{font-size:clamp(18px,1.7vw,21px);max-width:62ch;color:rgba(244,239,228,.84);margin:18px 0 0}
.tag{font:italic 400 19px/1.4 "Source Serif 4",Georgia,serif;color:#D9C28F;margin:14px 0 0}
.cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:26px}.btn{display:inline-flex;align-items:center;min-height:46px;padding:0 20px;border:1px solid #D9C28F;font:700 12px/1 Manrope,system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;color:#16181C;background:#D9C28F}.btn.g{background:transparent;color:#F4EFE4}
section.s{padding:clamp(36px,6vw,72px) 0;border-bottom:1px solid var(--line)}h2{font:400 clamp(26px,3vw,36px)/1.15 "Bodoni Moda",Georgia,serif;margin:0 0 8px}
.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px;margin:22px 0 0;padding:0;list-style:none}
.g a{display:block;height:100%;padding:16px 18px;border:1px solid var(--line);border-left:3px solid var(--acc,var(--gold));background:#fff;text-decoration:none}.g a:hover,.g a:focus-visible{border-color:var(--gold)}
.g b{display:block;font:600 15px/1.35 Manrope,system-ui,sans-serif}.g span{display:block;font-size:15px;line-height:1.5;color:var(--tx2);margin-top:4px}
.facts{display:flex;flex-wrap:wrap;gap:10px 28px;margin:20px 0 0;padding:0;list-style:none;font:600 13px/1.4 Manrope,system-ui,sans-serif;color:rgba(244,239,228,.8)}.facts b{display:block;font:400 30px/1.1 "Bodoni Moda",Georgia,serif;color:#F4EFE4}
.cover{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,.7fr);gap:clamp(24px,5vw,64px);align-items:center}.cover img{display:block;width:100%;max-width:300px;height:auto;justify-self:center;box-shadow:0 30px 60px -28px rgba(0,0,0,.7)}
ol.parts{margin:18px 0 0;padding-left:22px}ol.parts li{margin:6px 0}
footer{padding:36px 0 48px;color:var(--tx2);font-size:15px}footer .close{font:italic 400 22px/1.35 "Bodoni Moda",Georgia,serif;color:var(--tx);margin:0 0 12px}footer ul{list-style:none;padding:0;display:flex;flex-wrap:wrap;gap:6px 22px;margin:10px 0}
:focus-visible{outline:2px solid var(--goldt);outline-offset:3px}
@media (max-width:720px){.cover{grid-template-columns:1fr}.cover img{max-width:220px}}"""


def page(slug, title, desc, kicker, h1, lede, tag, ctas, body, ld, img=None, acc=None):
    url = SITE + slug + '/'
    ogimg = img or (SITE + 'assets/brand/social-card.png')
    nav = ''.join(f'<a href="{h}">{e(n)}</a>' for n, h in [
        ('Home', '../'), ('IB DP Economics', '../ib-economics/'), ('UPSC CSE Economics', '../upsc-economics/'),
        ('The Indian Economy', '../the-indian-economy/'), ('About', '../#/about')])
    cta = ''.join(f'<a class="btn{" g" if i else ""}" href="{h}">{e(n)}</a>' for i, (n, h) in enumerate(ctas))
    return f"""<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<meta name="author" content="Arjun Agrawal">
<link rel="canonical" href="{url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Arjun Agrawal · Economics">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{ogimg}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#16181C">
<link rel="icon" href="../favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="../assets/fonts/fonts.css">
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
<style>{CSS}{'.g a{--acc:' + acc + '}' if acc else ''}</style>
</head>
<body>
<header><div class="w top"><a class="brand" href="../"><img src="../assets/brand/monogram.svg" width="40" height="40" alt=""><span><b>Arjun Agrawal</b><span>Economics</span></span></a>
<nav class="m" aria-label="Platform">{nav}</nav></div></header>
<main>
<section class="hero"><div class="w">{body.get('hero_wrap_open','')}<p class="k">{e(kicker)}</p><h1>{h1}</h1><p class="lede">{e(lede)}</p>{f'<p class="tag">{e(tag)}</p>' if tag else ''}{body.get('facts','')}<div class="cta">{cta}</div>{body.get('hero_wrap_close','')}</div></section>
{body['sections']}
</main>
<footer><div class="w"><p class="close">Think deeply. Understand clearly. Connect ideas.</p>
<p>Arjun Agrawal | Academic Ecosystem · Think. Understand. Connect.</p>
<ul><li><a href="../">Economics</a></li><li><a href="https://arjun-agrawal-political-studies.vercel.app/" rel="noopener noreferrer">Political Studies ↗</a></li><li><a href="https://the-business-brief-dun.vercel.app/" rel="noopener noreferrer">The Business Brief ↗</a></li></ul>
<p>An independent educational platform. It is not affiliated with or endorsed by the International Baccalaureate Organization or the Union Public Service Commission.</p></div></footer>
</body>
</html>
"""


def grid(items):
    return '<ul class="g">' + ''.join(f'<li><a href="{h}"><b>{e(n)}</b><span>{e(d)}</span></a></li>' for n, h, d in items) + '</ul>'


def sec(h, p, items):
    return f'<section class="s"><div class="w"><h2>{e(h)}</h2><p>{e(p)}</p>{grid(items)}</div></section>'


A = '../#/'
ib_sections = ''.join([
    sec('Learn', 'The course in the order of the syllabus, with the concepts, the diagrams and the mindmaps that carry it.', [
        ('Course and syllabus', A + 'course', 'Every unit and subtopic of the IB DP Economics guide, SL and HL'),
        ('Concepts and theories', A + 'learn', 'Explanations that build from the concept to the evaluation'),
        ('Diagram atlas', A + 'lab/diagram-atlas', 'Every diagram drawn exactly, layer by layer, with what an examiner looks for'),
        ('Mindmaps', A + 'mind', 'How the ideas of each unit connect'),
        ('Thinking like an economist', A + 'think', 'The habits of economic reasoning, practised')]),
    sec('Explore', 'Theory where it meets the world: cases, data and the Indian economy.', [
        ('Real World Economics', A + 'world', 'Cases filed by syllabus topic, each with its theory, diagram, stakeholders and evaluation'),
        ('Economic data', A + 'data', 'Reading data the way the examination asks'),
        ('Economics in 60 Seconds', A + 'learn/economics-in-60-seconds', 'Ten-page visual issues on one idea at a time'),
        ('Economics, Everywhere', A + 'everywhere', 'Big questions, everyday cases and interactive labs')]),
    sec('Practise and prepare', 'Interactive models, calculation tools, questions and examination preparation.', [
        ('Interactive diagrams', A + 'lab', 'Move a curve and watch the equilibrium respond'),
        ('Calculation tools', A + 'calculate', 'The calculations of the guide, each with a live check'),
        ('Practice questions', A + 'practise', 'By unit, command term and paper'),
        ('Examination preparation', A + 'examiner', 'What the papers reward, and how to write it'),
        ('Internal Assessment support', A + 'ia', 'From choosing an article to the commentary'),
        ('TOK connections', A + 'tok', 'Where Economics meets the Theory of Knowledge')]),
    sec('Resources', 'Resources for students and teachers, and the Learning Studio.', [
        ('Resource hub', A + 'resources', 'Handbooks, question banks and revision'),
        ('Learning Studio', A + 'studio', 'Visual explainers, guides and collections'),
        ('Teacher tools', A + 'teacher', 'Lesson planning, exam building and marking sheets'),
        ('Tutorials', A + 'tutorials', 'Learn with Arjun Agrawal')])])

up_sections = ''.join([
    sec('The preparation environment', 'Each part of the UPSC CSE Economics pathway, kept to the Economics of the General Studies papers.', [
        ('Syllabus', A + 'upsc/syllabus', 'The Economics lines of Prelims GS Paper I and Mains GS Paper III, quoted exactly, then explained'),
        ('Economics resources', A + 'upsc/economics-resources', 'Free topic previews from concept to the Indian evidence, with diagrams and MCQs'),
        ('Handbook Library', A + 'upsc/handbook-library', 'Eleven topic volumes, each previewed before purchase'),
        ('Current Affairs', A + 'upsc/current-affairs', 'Economic developments with their Prelims and Mains angles and official sources'),
        ('Preparation Strategy', A + 'upsc/preparation-strategy', 'Phases, a weekly rhythm and an answer-writing structure'),
        ('Online Course', A + 'upsc/online-course', 'The 3-month intensive online programme')]),
    sec('Books', 'A comprehensive reference and its free revision companion, for the Economics components of the examination.', [
        ('The Indian Economy', A + 'book', 'A Comprehensive Academic and Examination Reference · First Edition, 2026-27'),
        ('Digital Revision Companion', A + 'book/digital-revision-companion', 'Free with the book: revision and practice for thirteen units')])])

PARTS = ["Foundations and Measurement of the Economy", "The Indian Economy: Structure, Evolution and Development Strategy",
         "Money, Monetary Policy and Price Stability", "India's Financial System", "Public Finance and Fiscal Governance",
         "The External Sector and Global Economic Architecture", "Indian Agriculture and Allied Sectors",
         "Industry, Manufacturing, Services, Trade and Labour Markets"]
book_sections = (
    '<section class="s"><div class="w"><h2>Eight Parts, 153 chapters</h2><p>The book follows India\'s economy from the foundations of economic '
    'reasoning and national income measurement through money, the financial system, public finance and the external sector to agriculture, '
    'industry, services and labour. It covers the Economics components of the examinations and courses it serves, not their complete syllabi.</p>'
    '<ol class="parts">' + ''.join(f'<li>{e(p)}</li>' for p in PARTS) + '</ol></div></section>'
    + sec('On the platform', 'Look inside the book, read about its companion, or write to enquire about purchasing.', [
        ('Look inside', A + 'book', 'The cover and ten selected pages, each with its printed page number'),
        ('Digital Revision Companion', A + 'book/digital-revision-companion', 'Free: mindmaps, rapid revision, PYQ linkage, Mains frameworks and more'),
        ('Enquire about purchasing', 'mailto:arjun1agr@gmail.com?subject=' + 'The%20Indian%20Economy%3A%20purchasing%20enquiry',
         'Write to enquire about availability and purchasing details'),
        ('About the author', A + 'about', 'Arjun Agrawal: educator, academic resource creator and author')]))

BOOK_FACTS = ('<ul class="facts"><li><b>641</b>numbered pages</li><li><b>8</b>Parts</li><li><b>153</b>chapters</li>'
              '<li><b>13</b>units</li></ul>')

pages = {
    'ib-economics': page(
        'ib-economics', 'IB DP Economics · Arjun Agrawal',
        'IB DP Economics by Arjun Agrawal: concepts, exact diagrams, real-world cases, calculations, practice and examination preparation for SL and HL students and teachers.',
        'Pathway 01 · IB DP Economics', 'IB DP Economics',
        'An interactive learning environment for IB Diploma Programme Economics students and teachers: the course, the models, the real world, the examinations and the research.',
        'Concepts. Diagrams. Real-world applications. Examination thinking.',
        [('Open IB DP Economics', A + 'ib'), ('Course at a glance', A + 'course')],
        {'sections': ib_sections},
        {"@context": "https://schema.org", "@type": "WebPage", "name": "IB DP Economics · Arjun Agrawal", "url": SITE + "ib-economics/",
         "inLanguage": "en-GB", "isPartOf": {"@type": "WebSite", "name": "Arjun Agrawal · Economics", "url": SITE}, "author": PERSON,
         "about": "IB Diploma Programme Economics"}, acc='#7A2436'),
    'upsc-economics': page(
        'upsc-economics', 'UPSC CSE Economics · Arjun Agrawal',
        'UPSC CSE Economics by Arjun Agrawal: the Economics of Prelims GS Paper I and Mains GS Paper III, with topic previews, handbooks, current affairs, strategy and an online course.',
        'Pathway 02 · UPSC CSE Economics', 'UPSC CSE Economics',
        'A structured Economics learning environment for Civil Services aspirants, built around conceptual foundations, Indian institutions, public policy and examination-oriented application.',
        'Economic foundations. Indian institutions. Public policy. Prelims and Mains.',
        [('Open UPSC CSE Economics', A + 'upsc'), ('Read the syllabus', A + 'upsc/syllabus')],
        {'sections': up_sections},
        {"@context": "https://schema.org", "@type": "WebPage", "name": "UPSC CSE Economics · Arjun Agrawal", "url": SITE + "upsc-economics/",
         "inLanguage": "en-GB", "isPartOf": {"@type": "WebSite", "name": "Arjun Agrawal · Economics", "url": SITE}, "author": PERSON,
         "about": "The Economics of the UPSC Civil Services Examination"}, acc='#1F4434'),
    'the-indian-economy': page(
        'the-indian-economy', 'The Indian Economy · A Comprehensive Academic and Examination Reference · Arjun Agrawal',
        'The Indian Economy: A Comprehensive Academic and Examination Reference, First Edition 2026-27, by Arjun Agrawal, for UPSC CSE, State PCS, RBI Grade B (General), undergraduate and postgraduate study, with a free Digital Revision Companion.',
        'A new academic publication', '<i>The Indian Economy</i>',
        'A Comprehensive Academic and Examination Reference. First Edition, 2026-27. Author: Arjun Agrawal. For the Economics components of UPSC CSE, State PCS and RBI Grade B (General), and for undergraduate and postgraduate study.',
        'Concepts | Institutions | Policies | Sectors',
        [('Look inside', A + 'book'), ('The free companion', A + 'book/digital-revision-companion')],
        {'sections': book_sections, 'facts': BOOK_FACTS,
         'hero_wrap_open': '<div class="cover"><div>', 'hero_wrap_close': '</div><img src="../assets/book/the-indian-economy/cover.webp" width="1000" height="1414" alt="The Indian Economy, First Edition 2026-27: the front cover"></div>'},
        {"@context": "https://schema.org", "@type": "Book", "name": "The Indian Economy",
         "alternativeHeadline": "A Comprehensive Academic and Examination Reference", "bookEdition": "First Edition, 2026-27",
         "numberOfPages": 641, "inLanguage": "en", "author": PERSON, "url": SITE + "the-indian-economy/",
         "image": SITE + "assets/book/the-indian-economy/cover.webp",
         "audience": {"@type": "Audience", "audienceType": "UPSC CSE, State PCS, RBI Grade B (General), undergraduate and postgraduate"}},
        img=SITE + 'assets/book/the-indian-economy/cover.webp', acc='#16274A'),
}

for slug, h in pages.items():
    d = ROOT / slug
    d.mkdir(exist_ok=True)
    (d / 'index.html').write_text(h, encoding='utf-8')
    print('wrote', slug + '/index.html', len(h), 'bytes')

# the sitemap lists them, once each
sm = ROOT / 'sitemap.xml'
s = sm.read_text(encoding='utf-8')
for slug in pages:
    loc = f'  <url><loc>{SITE}{slug}/</loc></url>\n'
    if loc not in s:
        s = s.replace('</urlset>', loc + '</urlset>')
sm.write_text(s, encoding='utf-8')
print('sitemap:', s.count('<url>'), 'addresses')
