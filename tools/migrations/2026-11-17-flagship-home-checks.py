"""Flagship home: the checks that describe the IB DP home page now read the IB DP landing.

The shared home page (#/) introduces both pathways; the IB DP home page that
earlier releases built, with its cover, chapters and bands, is kept intact as
the IB DP landing (#/ib, VIEWS.ib, src/modules/48-home.js). The checks below
assert what that page holds, so they now render it rather than the shared home.
No check is removed or weakened: each asserts exactly what it asserted before.
Idempotent: each step checks for its own result first."""
import pathlib
p = pathlib.Path(__file__).resolve().parents[2] / "index.html"
s = p.read_text(encoding="utf-8")
steps = [
    ('''const bk=JSON.stringify(S);S=blank("Student");const h=[VIEWS.master(),VIEWS.home()].join(" ");''',
     '''const bk=JSON.stringify(S);S=blank("Student");const h=[VIEWS.master(),VIEWS.ib()].join(" ");'''),
    ('''(()=>{const k=[VIEW,TAB];VIEW="home";TAB=0;const h=VIEWS.home();VIEW=k[0];TAB=k[1];
     return h.includes("Real world now")''',
     '''(()=>{const k=[VIEW,TAB];VIEW="ib";TAB=0;const h=VIEWS.ib();VIEW=k[0];TAB=k[1];
     return h.includes("Real world now")'''),
    ('''flat.includes("everywhere")&&/Economics, Everywhere/.test(VIEWS.home())})());''',
     '''flat.includes("everywhere")&&/Economics, Everywhere/.test(VIEWS.ib())})());'''),
    ('''T("Ecosystem · the home page opens with the journey band",()=>{const h=VIEWS.home();''',
     '''T("Ecosystem · the home page opens with the journey band",()=>{const h=VIEWS.ib();'''),
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
