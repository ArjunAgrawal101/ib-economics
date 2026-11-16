"""UPSC CSE Economics: the section joins the phone drawer, second only to Resources.

The pathway strip above the header (src/modules/43-upsc.js) carries
"IB DP Economics | UPSC CSE Economics | About | Contact" at every width; the drawer
also lists the UPSC section near its top, so an aspirant on a phone reaches it from
the menu as well as from the strip and the home page. The IB primary bar is not
changed. The page's title and description now name both pathways.
Idempotent: each step checks for its own result first."""
import pathlib
p = pathlib.Path(__file__).resolve().parents[2] / "index.html"
s = p.read_text(encoding="utf-8")
T_OLD = "Arjun Agrawal · IB DP Economics: Think like an economist"
T_NEW = "Arjun Agrawal · Economics: IB DP and UPSC CSE"
D_NEW = ("Economics by Arjun Agrawal for IB Diploma Programme students and UPSC CSE aspirants: conceptual "
         "understanding, visual learning, real-world applications and examination-focused preparation.")
steps = [
    # the page's own title and description name both pathways (a shared link is often the first thing an aspirant sees)
    ('<title>' + T_OLD + '</title>', '<title>' + T_NEW + '</title>'),
    ('<meta name="description" content="A learning environment for IB Diploma Programme Economics by Arjun Agrawal, IB DP Facilitator. Learn the concepts, see the model, build the chain, stress-test the argument, make the judgement.">',
     '<meta name="description" content="' + D_NEW + '">'),
    ('<meta property="og:title" content="' + T_OLD + '">', '<meta property="og:title" content="' + T_NEW + '">'),
    ('<meta property="og:description" content="A free learning environment for IB Diploma Programme Economics. Learn the concepts, see the model, build the chain, stress-test the argument, make the judgement.">',
     '<meta property="og:description" content="' + D_NEW + '">'),
    ('<meta name="twitter:title" content="' + T_OLD + '">', '<meta name="twitter:title" content="' + T_NEW + '">'),
    ('<meta name="twitter:description" content="A free learning environment for IB Diploma Programme Economics. Learn the concepts, see the model, build the chain, stress-test the argument, make the judgement.">',
     '<meta name="twitter:description" content="' + D_NEW + '">'),
    (' document.title=(VIEW==="home"?"' + T_OLD + '"', ' document.title=(VIEW==="home"?"' + T_NEW + '"'),
    ('''[["Start",[["resources","Resources"],["course","Course"],''',
     '''[["Start",[["resources","Resources"],["upsc","UPSC CSE Economics"],["course","Course"],'''),
]
done = 0
for old, new in steps:
    if new in s:
        continue
    if s.count(old) != 1:
        raise SystemExit(f"anchor found {s.count(old)} times: " + old[:90])
    s = s.replace(old, new, 1); done += 1
p.write_text(s, encoding="utf-8")
print("applied", done, "of", len(steps), "steps")
