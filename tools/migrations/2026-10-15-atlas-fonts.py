"""Project Atlas: the typefaces are served by the site itself, and the showcase is named the Learning Studio.

Bodoni Moda, Source Serif 4, Manrope and JetBrains Mono (all SIL Open Font
License 1.1, licences in assets/fonts/) were loaded from Google Fonts. They
now come from assets/fonts/, so the design no longer depends on a third-party
URL, works offline once cached, and sends no request to another server. The
stylesheet keeps the non-blocking pattern the opening sequence relies on, and
the three faces the first screen uses are preloaded.
Idempotent: each step checks for its own result first."""
import pathlib
p = pathlib.Path(__file__).resolve().parents[2] / "index.html"
s = p.read_text(encoding="utf-8")
GF = ("https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400"
      "&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,300;1,8..60,400"
      "&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap")
OLD_HEAD = ('<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
            f'<link rel="preload" as="style" href="{GF}"><link href="{GF}" rel="stylesheet" media="print" onload="this.media=\'all\'">'
            f'<noscript><link href="{GF}" rel="stylesheet"></noscript>')
NEW_HEAD = ('<!-- Typefaces served by the site itself (SIL Open Font License 1.1; see assets/fonts/). The stylesheet\n'
            '     never blocks the first frame; the three faces the first screen uses are preloaded. -->\n'
            '<link rel="preload" as="font" type="font/woff2" href="assets/fonts/bodoni-moda-latin-7.woff2" crossorigin>'
            '<link rel="preload" as="font" type="font/woff2" href="assets/fonts/source-serif-4-latin-5.woff2" crossorigin>'
            '<link rel="preload" as="font" type="font/woff2" href="assets/fonts/manrope-latin-2.woff2" crossorigin>\n'
            '<link href="assets/fonts/fonts.css" rel="stylesheet" media="print" onload="this.media=\'all\'">'
            '<noscript><link href="assets/fonts/fonts.css" rel="stylesheet"></noscript>')
steps = [
    (OLD_HEAD, NEW_HEAD),
    # the showcase takes the brief's name, Learning Studio, in the drawer and the footer (its address stays #/studio)
    ('["studio","Resource Studio"],["design","Learning design"],["contact","Contact and collaboration"],["tutorials","Tutorials"],["settings","Settings"]]]].forEach',
     '["studio","Learning Studio"],["design","Learning design"],["contact","Contact and collaboration"],["tutorials","Tutorials"],["settings","Settings"]]]].forEach'),
    ("<button class=\"lnk\" onclick=\"nav('studio')\">Resource Studio</button>",
     "<button class=\"lnk\" onclick=\"nav('studio')\">Learning Studio</button>"),
    ('''const l=[...document.querySelectorAll('link[href*="fonts.googleapis.com/css2"]')].filter(x=>x.rel==="stylesheet");''',
     '''const l=[...document.querySelectorAll('link[href*="assets/fonts/fonts.css"]')].filter(x=>x.rel==="stylesheet");'''),
]
done = 0
for old, new in steps:
    if new in s:
        continue
    if old not in s:
        raise SystemExit("anchor not found: " + old[:80])
    s = s.replace(old, new, 1); done += 1
p.write_text(s, encoding="utf-8")
print("applied", done, "of", len(steps), "steps")
