"""Flagship head: the page, the share card and the installed app name both pathways.

Pull request #11 already gave the title, the description and the Open Graph
and Twitter text both pathways. This finishes the job for what still said IB
DP Economics alone: the site name a shared link shows, the share image's
description, the structured data, and the names an installed app uses. The
structured data states only what the page itself states: who wrote it, what
it is about, the language, and that it is free to use. As before, it claims
no URL, because the same file is served from Vercel, from GitHub Pages and
from a disk; the address lives in the canonical link alone. The course is
described with the facts the owner supplied (online, three months, at most 25
students, ₹9,999). The share image is rebuilt by tools/build/build_social_card.mjs.
Idempotent: each step checks for its own result first."""
import json
import pathlib
p = pathlib.Path(__file__).resolve().parents[2] / "index.html"
s = p.read_text(encoding="utf-8")

website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Arjun Agrawal · Economics",
    "alternateName": "Think like an economist",
    "inLanguage": "en-GB",
    "description": "An interactive Economics learning platform with two pathways, IB DP Economics and UPSC CSE Economics: concepts, visual models, real-world evidence and examination preparation.",
    "isAccessibleForFree": True,
    "audience": [{"@type": "EducationalAudience", "educationalRole": "student"},
                 {"@type": "EducationalAudience", "educationalRole": "teacher"}],
    "author": {"@type": "Person", "name": "Arjun Agrawal"},
    "about": {"@type": "Thing", "name": "Economics"},
}
course = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Arjun Agrawal UPSC CSE Economics 3-Month Intensive Online Programme",
    "description": "A three-month online programme on the Economics within the UPSC Civil Services General Studies papers, for Prelims and Mains, covering static concepts and current affairs. At most 25 students in a batch.",
    "inLanguage": "en",
    "provider": {"@type": "Person", "name": "Arjun Agrawal"},
    "offers": {"@type": "Offer", "price": "9999", "priceCurrency": "INR", "category": "Paid"},
    "hasCourseInstance": {"@type": "CourseInstance", "courseMode": "Online", "courseWorkload": "P3M"},
}
ld_new = ('<script type="application/ld+json">' + json.dumps(website, ensure_ascii=False) + '</script>\n'
          '<script type="application/ld+json">' + json.dumps(course, ensure_ascii=False) + '</script>')

steps = [
    ('<meta property="og:site_name" content="Arjun Agrawal · IB DP Economics">',
     '<meta property="og:site_name" content="Arjun Agrawal · Economics">'),
    ('<meta property="og:image:alt" content="Arjun Agrawal · IB DP Economics. Economics is not just a subject to study. It is a way to think.">',
     '<meta property="og:image:alt" content="Arjun Agrawal · Economics. Economics is not just a subject to study. It is a way to think. IB DP Economics and UPSC CSE Economics.">'),
    ('<meta name="apple-mobile-web-app-title" content="IB DP Economics">',
     '<meta name="apple-mobile-web-app-title" content="AA Economics">'),
    ('<meta name="application-name" content="Arjun Agrawal · IB DP Economics">',
     '<meta name="application-name" content="Arjun Agrawal · Economics">'),
]
done = 0
for old, new in steps:
    if new in s:
        continue
    if s.count(old) != 1:
        raise SystemExit(f"anchor found {s.count(old)} times: " + old[:90])
    s = s.replace(old, new, 1); done += 1

# the structured data: the WebSite block (and a Course block an earlier run wrote) is replaced whole
if ld_new not in s:
    i = s.find('<script type="application/ld+json">{"@context": "https://schema.org", "@type": "WebSite"')
    if i < 0:
        raise SystemExit("structured data anchor not found")
    j = s.index("</script>", i) + len("</script>")
    nxt = '\n<script type="application/ld+json">{"@context": "https://schema.org", "@type": "Course"'
    if s.startswith(nxt, j):
        j = s.index("</script>", j + 1) + len("</script>")
    s = s[:i] + ld_new + s[j:]
    done += 1
p.write_text(s, encoding="utf-8")

# the installed app
m = pathlib.Path(__file__).resolve().parents[2] / "manifest.webmanifest"
man = json.loads(m.read_text(encoding="utf-8"))
want = {
    "name": "Arjun Agrawal · Economics",
    "short_name": "AA Economics",
    "description": "Economics with two pathways, IB DP Economics and UPSC CSE Economics: learn the concepts, see the model, test it against the evidence, make the judgement.",
    "background_color": "#16181C",
    "theme_color": "#16181C",
}
shortcuts = [
    {"name": "IB DP Economics", "short_name": "IB DP", "url": "./#/ib", "description": "Open the IB DP Economics pathway"},
    {"name": "UPSC CSE Economics", "short_name": "UPSC CSE", "url": "./#/upsc", "description": "Open the UPSC CSE Economics pathway"},
]
changed = False
for k, v in want.items():
    if man.get(k) != v:
        man[k] = v; changed = True
have = [x.get("url") for x in man.get("shortcuts", [])]
add = [x for x in shortcuts if x["url"] not in have]
if add:
    man["shortcuts"] = add + man.get("shortcuts", []); changed = True
if changed:
    m.write_text(json.dumps(man, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"); done += 1
print("applied", done, "steps")
