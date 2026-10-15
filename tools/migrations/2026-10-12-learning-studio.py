"""The Learning Studio: the base page's share of it.

1. Resource Studio joins the primary bar, after Economics, Everywhere, and is
   kept late when the bar narrows (everything withdrawn stays in More).
2. The drawer's About group gains the Studio, Learning design and Contact.
3. The footer carries the established resource link, and the Studio,
   Learning design and Contact beside Tutorials.
4. The head gains a canonical address, og:url, a preview image and a large
   card for shared links, all on the public Vercel address.
5. The self-tests in the base page that pin the primary bar's order expect
   the Studio after Economics, Everywhere. (The More menu and the nine-item
   check live in src/modules/27-wire-t6.js and 28-tests-t6.js.)
Idempotent: each step checks for its own result first."""
import pathlib
p = pathlib.Path(__file__).resolve().parents[2] / "index.html"
s = p.read_text(encoding="utf-8")
SITE = "https://ib-economics-pi.vercel.app/"
steps = [
 ('const ORDER=["course","learn","lab","world","practise","examiner","mind","everywhere","tutorials"];',
  'const ORDER=["course","learn","lab","world","practise","examiner","mind","everywhere","studio","tutorials"];'),
 ('const NAVKEEP={world:100,mind:96,course:95,examiner:94,learn:93,practise:92,lab:91,everywhere:90,ees:89,arjun:86,',
  'const NAVKEEP={world:100,mind:96,course:95,examiner:94,learn:93,practise:92,lab:91,everywhere:90,studio:89.5,ees:89,arjun:86,'),
 (' ["About",[["about","About"],["tutorials","Tutorials"],["settings","Settings"]]]].forEach(g=>MOBGROUPS.push(g));',
  ' ["About",[["about","About"],["studio","Resource Studio"],["design","Learning design"],["contact","Contact and collaboration"],["tutorials","Tutorials"],["settings","Settings"]]]].forEach(g=>MOBGROUPS.push(g));'),
 ('''    <button class="lnk" onclick="nav('tutorials')">Economics tutorials</button>''',
  '''    <button class="lnk" onclick="nav('tutorials')">Economics tutorials</button>
    <button class="lnk" onclick="nav('studio')">Resource Studio</button>
    <button class="lnk" onclick="nav('design')">Learning design</button>
    <button class="lnk" onclick="nav('contact')">Contact and collaboration</button>'''),
 ('''<div class="wrap full ft-base"><span>© Arjun Agrawal.''',
  f'''<div class="wrap full ft-res"><span>For more resources: <a class="ft-reslink" href="{SITE}">{SITE}</a></span></div><div class="wrap full ft-base"><span>© Arjun Agrawal.'''),
 ('''<!-- How a shared link previews in messaging apps and social feeds. No image is
     declared: a preview image needs an absolute URL, and that depends on the
     domain the site is published under. -->
<meta property="og:type" content="website">''',
  f'''<!-- How a shared link previews in messaging apps and social feeds, on the public
     address. The Studio's pages under studio/ carry their own. -->
<link rel="canonical" href="{SITE}">
<meta property="og:url" content="{SITE}">
<meta property="og:image" content="{SITE}assets/brand/social-card.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Arjun Agrawal · IB DP Economics. Economics is not just a subject to study. It is a way to think.">
<meta property="og:type" content="website">'''),
 ('<meta name="twitter:card" content="summary">', '<meta name="twitter:card" content="summary_large_image">'),
]
WANT_OLD = 'const want=["course","learn","lab","world","practise","examiner","mind","everywhere"];'
WANT_NEW = 'const want=["course","learn","lab","world","practise","examiner","mind","everywhere","studio"];'

done = 0
for old, new in steps:
    if new in s:
        continue
    if old not in s:
        raise SystemExit("anchor not found: " + old[:70])
    s = s.replace(old, new, 1); done += 1
if WANT_OLD in s:
    s = s.replace(WANT_OLD, WANT_NEW); done += 1
p.write_text(s, encoding="utf-8")
print("applied", done, "of", len(steps), "steps")
