"""Build the Resource Studio from its public manifest.

  python3 tools/studio/build_studio.py          # validate, then write everything
  python3 tools/studio/build_studio.py --check  # validate only

Reads content/studio/showcase.json and writes:
  * src/modules/37-studio-data.js  the manifest the app reads (STUDIO), with each
                                   preview's real pixel size so nothing shifts as
                                   it loads;
  * studio/index.html and studio/<id>/index.html
                                   plain HTML pages a search engine or a link
                                   preview can read without running the app;
  * sitemap.xml                    the home page and every Studio page.
Run tools/build/splice.py afterwards to put the module into index.html.

The manifest is public by definition, so validation is strict. The build stops if
an item asks for disclosure level 3, names a file that is not a preview in
assets/studio/, links to a document or archive, carries a key that sounds like a
private location, or points at a platform route that does not exist.
"""
import html, json, os, re, sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MANIFEST = os.path.join(ROOT, 'content', 'studio', 'showcase.json')
ASSETS = os.path.join(ROOT, 'assets', 'studio')
MODULE = os.path.join(ROOT, 'src', 'modules', '37-studio-data.js')
PAGES = os.path.join(ROOT, 'studio')
SITEMAP = os.path.join(ROOT, 'sitemap.xml')
INDEX = os.path.join(ROOT, 'index.html')

FORBIDDEN_KEYS = {'source', 'src_master', 'master', 'masters', 'path', 'file', 'files', 'private', 'download', 'internal', 'notes', 'risk'}
FORBIDDEN_VALUE = re.compile(r'(\.(pdf|pptx?|docx?|key|zip|psd|ai|indd|html?)\b)|uploads|presentation-assets|/root/|/home/|[A-Z]:\\\\|file://|drive\.google', re.I)
TYPES = {'visual', 'guide', 'interactive', 'collection'}
TREATMENTS = {'A', 'B', 'C'}
STATUSES = {'published', 'draft', 'retired'}
REQUIRED = ['id', 'status', 'disclosure', 'type', 'treatment', 'title', 'kicker', 'topics', 'level', 'audience', 'format',
            'previewFormat', 'summary', 'objectives', 'approach', 'previews', 'related', 'enquiry']


def fail(msg):
    sys.exit('studio manifest: ' + msg)


def walk(o, where):
    """Reject private-sounding keys and file-like values anywhere in the manifest."""
    if isinstance(o, dict):
        for k, v in o.items():
            if k.lower() in FORBIDDEN_KEYS:
                fail(f'{where}: the key "{k}" is not allowed in a public manifest')
            walk(v, f'{where}.{k}')
    elif isinstance(o, list):
        for i, v in enumerate(o):
            walk(v, f'{where}[{i}]')
    elif isinstance(o, str) and not where.endswith('.src') and not where.startswith('$._about'):
        if FORBIDDEN_VALUE.search(o):
            fail(f'{where}: "{o[:60]}" looks like a private file or location')


def platform_facts():
    """Facts the pages share with the app, read from the app rather than repeated."""
    s = open(INDEX, encoding='utf-8').read()
    email = re.search(r'const TUT=\{\s*email:"([^"]+)"', s)
    wa = re.search(r'https://wa\.me/(\d+)', s)
    c60 = re.findall(r'\{id:"(\d{3})",t:"([^"]+)",topic:"([^"]+)"', s)
    if not email or not wa or not c60:
        fail('could not read the contact details or the carousel registry from index.html')
    return {'email': email.group(1), 'whatsapp': 'https://wa.me/' + wa.group(1), 'c60': [{'id': a, 't': b, 'topic': c} for a, b, c in c60]}


def validate(m):
    walk(m, '$')
    ids, enq = set(), {e['k'] for e in m['enquiries']}
    if {t['k'] for t in m['types']} != TYPES:
        fail('types must be exactly ' + ', '.join(sorted(TYPES)))
    for it in m['items']:
        w = it.get('id', '?')
        for k in REQUIRED:
            if k not in it:
                fail(f'{w}: missing "{k}"')
        if not re.fullmatch(r'[a-z0-9]+(-[a-z0-9]+)*', it['id']):
            fail(f'{w}: the id must be lower-case words joined by hyphens')
        if it['id'] in ids:
            fail(f'{w}: duplicate id')
        ids.add(it['id'])
        if it['status'] not in STATUSES:
            fail(f'{w}: status must be one of {sorted(STATUSES)}')
        if it['disclosure'] not in (1, 2):
            fail(f'{w}: disclosure {it["disclosure"]} cannot be published (only levels 1 and 2 are public)')
        if it['type'] not in TYPES or it['treatment'] not in TREATMENTS:
            fail(f'{w}: unknown type or treatment')
        if it['enquiry'] not in enq:
            fail(f'{w}: unknown enquiry category "{it["enquiry"]}"')
        for r in it['related'] + ([{'route': it['interaction']['live']}] if it.get('interaction', {}).get('live') else []):
            if not r['route'].startswith('#/'):
                fail(f'{w}: related routes must be app routes beginning "#/"')
        for p in it['previews']:
            f = os.path.join(ASSETS, p['src'])
            if not os.path.isfile(f) or not p['src'].endswith('.webp'):
                fail(f'{w}: preview {p["src"]} is not a WebP file in assets/studio/')
            if len(p.get('alt', '')) < 40:
                fail(f'{w}: preview {p["src"]} needs alternative text that describes the economics it shows')
            with Image.open(f) as im:
                if max(im.size) > 1200:
                    fail(f'{w}: preview {p["src"]} is {im.size}; previews are limited to 1200 px')
                p['w'], p['h'] = im.size
        if it['treatment'] == 'A' and not it['previews']:
            fail(f'{w}: a visual treatment needs at least one preview')
    return m


LAZY = ' loading="lazy"'


def esc(s):
    return html.escape(str(s), quote=True)


def mailto(facts, cat, title=None):
    subj = cat['subject'] + (': ' + title if title else '')
    body = ('Hello Arjun,\n\n' + (f'I would like to know more about: {title}.\n\n' if title else '') +
            'I am a (student / teacher / school leader / other): \nSchool or organisation (optional): \nMy question: \n\nThank you.')
    from urllib.parse import quote
    return f'mailto:{facts["email"]}?subject={quote(subj)}&body={quote(body)}'


CSS = """:root{--bur:#7A2436;--bur-d:#5B1826;--obs:#16181C;--tx:#1A1C20;--tx-2:#43484F;--chalk:#F8F6F1;--chalk-2:#F1EDE5;--line:#DDD6C8;--gold:#C9A866}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}body{margin:0;background:var(--chalk);color:var(--tx);font:17px/1.6 "Source Serif 4",Georgia,serif}
a{color:var(--bur)}a:focus-visible{outline:3px solid var(--bur);outline-offset:3px}
.top{background:var(--obs);color:#F4EFE4}.top .in{display:flex;flex-wrap:wrap;gap:12px 24px;align-items:center;justify-content:space-between}
.in{max-width:1080px;margin:0 auto;padding:16px 20px}.brand{display:flex;gap:10px;align-items:center;color:#F4EFE4;text-decoration:none;font:600 15px/1.2 Manrope,system-ui,sans-serif}
.brand img{width:34px;height:34px}.top nav{display:flex;flex-wrap:wrap;gap:6px 18px;font:500 14px/1.4 Manrope,system-ui,sans-serif}.top nav a{color:#F4EFE4;text-decoration:none}.top nav a:hover{text-decoration:underline}
.crumb{font:500 13px/1.4 Manrope,system-ui,sans-serif;color:var(--tx-2);margin:28px 0 0}.crumb a{color:var(--tx-2)}
.kicker{font:600 12px/1.4 Manrope,system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--bur);margin:22px 0 6px}
h1{font:500 clamp(30px,5vw,46px)/1.1 "Bodoni Moda",Didot,Georgia,serif;margin:0 0 14px;max-width:22ch}
h2{font:600 13px/1.4 Manrope,system-ui,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:var(--bur);margin:40px 0 10px;padding-top:16px;border-top:1px solid var(--line)}
.lede{font-size:20px;max-width:60ch;margin:0}.facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px 24px;margin:24px 0 0;font:14px/1.45 Manrope,system-ui,sans-serif}
.facts dt{font-weight:700;color:var(--tx-2)}.facts dd{margin:2px 0 0}
figure{margin:28px 0 0}figure img{display:block;width:100%;height:auto;border-radius:8px;border:1px solid var(--line);background:#fff}
figcaption{font:14px/1.45 Manrope,system-ui,sans-serif;color:var(--tx-2);margin-top:8px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}
ul{padding-left:1.2em}li{margin:4px 0}.cards{list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px}
.cards li{margin:0}.card{display:block;height:100%;padding:18px;border:1px solid var(--line);border-radius:10px;background:#fff;color:var(--tx);text-decoration:none}
.card:hover{border-color:var(--bur)}.card b{display:block;font:500 22px/1.2 "Bodoni Moda",Georgia,serif;margin:4px 0 6px}.card span{font:13px/1.45 Manrope,system-ui,sans-serif;color:var(--tx-2)}
.access{background:var(--obs);color:#F4EFE4;border-radius:12px;padding:22px 24px;margin-top:40px}.access h2{color:var(--gold);border:0;margin-top:0;padding-top:0}
.btn{display:inline-block;margin:10px 12px 0 0;padding:11px 18px;border-radius:999px;background:var(--bur);color:#fff;text-decoration:none;font:600 14px/1.2 Manrope,system-ui,sans-serif}
.btn.gh{background:transparent;border:1px solid rgba(244,239,228,.5)}.note{font:13px/1.5 Manrope,system-ui,sans-serif;color:var(--tx-2);margin-top:32px}
footer{border-top:1px solid var(--line);margin-top:48px}footer .in{font:14px/1.6 Manrope,system-ui,sans-serif;color:var(--tx-2)}
@media (max-width:600px){body{font-size:16px}.lede{font-size:18px}}"""

FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,500&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&family=Manrope:wght@500;600;700&display=swap" rel="stylesheet">'


def page(m, facts, *, title, desc, canonical, up, body, image=None, ld=None):
    site = m['site']
    og_img = site + 'assets/studio/' + image if image else site + 'assets/brand/social-card.png'
    ldjs = ('<script type="application/ld+json">' + json.dumps(ld, ensure_ascii=False).replace('</', '<\\/') + '</script>') if ld else ''
    return f"""<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<link rel="canonical" href="{esc(canonical)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Arjun Agrawal · IB DP Economics">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:url" content="{esc(canonical)}">
<meta property="og:image" content="{esc(og_img)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#16181C">
<link rel="icon" href="{up}favicon.svg" type="image/svg+xml">
{FONTS}
<style>{CSS}</style>
{ldjs}
</head>
<body>
<header class="top"><div class="in"><a class="brand" href="{up}"><img src="{up}assets/brand/monogram-reversed.svg" alt="" width="34" height="34">IB DP Economics · Arjun Agrawal</a>
<nav aria-label="Site"><a href="{up}#/">Explore Economics</a><a href="{up}studio/">Resource Studio</a><a href="{up}#/design">Learning design</a><a href="{up}#/about">About</a><a href="{up}#/contact">Contact</a></nav></div></header>
<main class="in">
{body}
<p class="note">Independent resources by Arjun Agrawal. They are not produced or endorsed by the International Baccalaureate Organization, and none of the questions shown is an IB examination question.</p>
</main>
<footer><div class="in">For more resources: <a href="{esc(site)}">{esc(site)}</a> · <a href="mailto:{esc(facts['email'])}">{esc(facts['email'])}</a></div></footer>
</body>
</html>
"""


def item_page(m, facts, it, tmap):
    site, up = m['site'], '../../'
    cat = next(e for e in m['enquiries'] if e['k'] == it['enquiry'])
    figs = ''.join(
        f'<figure><img src="{up}assets/studio/{esc(p["src"])}" alt="{esc(p["alt"])}" width="{p["w"]}" height="{p["h"]}"'
        f'{LAZY if i else ""} decoding="async"><figcaption>{esc(p.get("cap", ""))}</figcaption></figure>'
        for i, p in enumerate(it['previews']))
    inside = it.get('inside') or []
    if it.get('collection', {}).get('from') == 'c60':
        inside = [f'Issue {c["id"]}: {c["t"]} ({c["topic"]})' for c in facts['c60']]
    members = f'<h2>What the complete resource contains</h2><ul>{"".join(f"<li>{esc(x)}</li>" for x in inside)}</ul>' if inside else ''
    rel = ''.join(f'<li><a href="{up}{esc(r["route"])}">{esc(r["label"])}</a></li>' for r in it['related'])
    if it['disclosure'] == 1:
        access = ('This page shows a small selection of excerpts. The complete resource is not published online. '
                  'If you are a teacher, a student or a school interested in it, please get in touch, and I will reply personally.')
    else:
        access = 'This part of the work is open on the platform: use the links below to explore it in full.'
    note = it.get('interaction', {}).get('note')
    body = f"""<p class="crumb"><a href="{up}">Home</a> / <a href="{up}studio/">Resource Studio</a> / {esc(it['title'])}</p>
<p class="kicker">{esc(it['kicker'])}</p>
<h1>{esc(it['title'])}</h1>
<p class="lede">{esc(it['summary'])}</p>
<dl class="facts"><div><dt>Type</dt><dd>{esc(tmap[it['type']]['n'])}</dd></div><div><dt>Format</dt><dd>{esc(it['format'])}</dd></div>
<div><dt>Level</dt><dd>{esc(it['level'])}</dd></div><div><dt>For</dt><dd>{esc(', '.join(it['audience']))}</dd></div><div><dt>Topics</dt><dd>{esc(', '.join(it['topics']))}</dd></div></dl>
{figs}
<h2>What it helps learners do</h2><ul>{''.join(f'<li>{esc(o)}</li>' for o in it['objectives'])}</ul>
<h2>The thinking behind it</h2><p>{esc(it['approach'])}</p>
{members}
{f'<p>{esc(note)}</p>' if note else ''}
<section class="access" aria-labelledby="acc-h"><h2 id="acc-h">Interested in exploring more?</h2><p>{esc(access)}</p>
<a class="btn" href="{esc(mailto(facts, cat, it['title']))}">Ask about this resource</a><a class="btn gh" href="{up}#/studio/{esc(slug(tmap[it['type']]['n']))}/{esc(it['id'])}">Open it in the Studio</a></section>
<h2>On the platform</h2><ul>{rel}</ul>"""
    ld = {'@context': 'https://schema.org', '@type': 'LearningResource', 'name': it['title'], 'description': it['summary'],
          'url': f'{site}studio/{it["id"]}/', 'inLanguage': 'en-GB', 'learningResourceType': it['format'],
          'educationalLevel': 'IB Diploma Programme Economics' + (' (' + it['level'] + ')' if it['level'] else ''),
          'audience': [{'@type': 'EducationalAudience', 'educationalRole': a} for a in it['audience']],
          'teaches': it['objectives'], 'keywords': ', '.join(it['topics']),
          'author': {'@type': 'Person', 'name': 'Arjun Agrawal', 'url': site + '#/about'}}
    if it['previews']:
        ld['image'] = site + 'assets/studio/' + it['previews'][0]['src']
    return page(m, facts, title=f'{it["title"]} · Resource Studio · Arjun Agrawal', desc=trim(it['summary']),
                canonical=f'{site}studio/{it["id"]}/', up=up, body=body,
                image=it['previews'][0]['src'] if it['previews'] else None, ld=ld)


def slug(t):
    return re.sub(r'^-+|-+$', '', re.sub(r'[^a-z0-9]+', '-', t.lower().replace('&', ' and ')))


def trim(s, n=158):
    return s if len(s) <= n else s[:s.rfind(' ', 0, n - 1)] + '…'


def index_page(m, facts, items, tmap):
    site, up = m['site'], '../'
    secs = ''
    for t in m['types']:
        its = [i for i in items if i['type'] == t['k']]
        if not its:
            continue
        secs += f'<h2>{esc(t["n"])}</h2><p>{esc(t["d"])}</p><ul class="cards">' + ''.join(
            f'<li><a class="card" href="{esc(i["id"])}/"><span>{esc(i["kicker"])}</span><b>{esc(i["title"])}</b><span>{esc(trim(i["summary"], 170))}</span></a></li>'
            for i in its) + '</ul>'
    body = f"""<p class="crumb"><a href="{up}">Home</a> / Resource Studio</p>
<p class="kicker">Resource Studio</p>
<h1>A glimpse of a wider body of work</h1>
<p class="lede">Original IB DP Economics resources by Arjun Agrawal: visual explainers, guides for students and teachers, interactive applications and series. Each is shown through a few real excerpts and an explanation of how it teaches; the complete resources are not published here.</p>
{secs}
<section class="access" aria-labelledby="acc-h"><h2 id="acc-h">Interested in exploring more?</h2>
<p>The website offers a glimpse of a wider collection of Economics learning resources and interactive experiences. If you are an educator, student or school interested in learning more or exploring a possible collaboration, I would be happy to hear from you.</p>
<a class="btn" href="{up}#/contact">Get in touch</a><a class="btn gh" href="{up}#/studio">Open the Studio</a></section>"""
    ld = {'@context': 'https://schema.org', '@type': 'CollectionPage', 'name': 'Resource Studio · Arjun Agrawal', 'url': site + 'studio/',
          'about': 'IB Diploma Programme Economics', 'author': {'@type': 'Person', 'name': 'Arjun Agrawal'},
          'hasPart': [{'@type': 'LearningResource', 'name': i['title'], 'url': f'{site}studio/{i["id"]}/'} for i in items]}
    return page(m, facts, title='Resource Studio · IB DP Economics · Arjun Agrawal',
                desc='Original IB DP Economics resources by Arjun Agrawal: visual explainers, guides, interactive applications and series, shown through real excerpts.',
                canonical=site + 'studio/', up=up, body=body, ld=ld)


def main():
    m = json.load(open(MANIFEST, encoding='utf-8'))
    validate(m)
    facts = platform_facts()
    items = [i for i in m['items'] if i['status'] == 'published']
    if '--check' in sys.argv:
        print('studio manifest ok:', len(items), 'published of', len(m['items']))
        return
    tmap = {t['k']: t for t in m['types']}
    data = {'site': m['site'], 'types': m['types'], 'enquiries': m['enquiries'], 'items': items}
    js = ('/* ═══════════════════════════════════════════════════════════════════════════\n'
          '   RESOURCE STUDIO · the public manifest (GENERATED: do not edit by hand)\n'
          '   Written by tools/studio/build_studio.py from content/studio/showcase.json.\n'
          '   Titles, descriptions and preview paths only: no private file is named here.\n'
          '   ═══════════════════════════════════════════════════════════════════════════ */\n'
          'const STUDIO=' + json.dumps(data, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/') + ';\n')
    open(MODULE, 'w', encoding='utf-8').write(js)
    # static pages: remove pages of items no longer published, then write the current ones
    os.makedirs(PAGES, exist_ok=True)
    keep = {i['id'] for i in items}
    for d in os.listdir(PAGES):
        p = os.path.join(PAGES, d)
        if os.path.isdir(p) and d not in keep and os.path.isfile(os.path.join(p, 'index.html')):
            os.remove(os.path.join(p, 'index.html'))
            os.rmdir(p)
    open(os.path.join(PAGES, 'index.html'), 'w', encoding='utf-8').write(index_page(m, facts, items, tmap))
    for it in items:
        os.makedirs(os.path.join(PAGES, it['id']), exist_ok=True)
        open(os.path.join(PAGES, it['id'], 'index.html'), 'w', encoding='utf-8').write(item_page(m, facts, it, tmap))
    urls = [m['site'], m['site'] + 'studio/'] + [f'{m["site"]}studio/{i["id"]}/' for i in items]
    open(SITEMAP, 'w', encoding='utf-8').write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
                                               + ''.join(f'  <url><loc>{esc(u)}</loc></url>\n' for u in urls) + '</urlset>\n')
    print('studio: %d items, %d pages, module %.1f KB' % (len(items), len(items) + 1, len(js) / 1024))


if __name__ == '__main__':
    main()
