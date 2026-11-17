"""The IB front page moved from #/ to #/ib: the base page's self-tests follow it.

The home page (#/) is now the ecosystem of both pathways; the IB front page that it
used to carry, every band unchanged, is the IB DP Economics landing page (VIEWS.ib).
The checks that read that front page now read it where it is.
Idempotent: each step checks for its own result first."""
import pathlib
p = pathlib.Path(__file__).resolve().parents[2] / "index.html"
s = p.read_text(encoding="utf-8")
steps = [
    ('const bk=JSON.stringify(S);S=blank("Student");const h=[VIEWS.master(),VIEWS.home()].join(" ");',
     'const bk=JSON.stringify(S);S=blank("Student");const h=[VIEWS.master(),VIEWS.ib()].join(" ");'),
    (''' T("Chain · the home page features one case rather than a wall of them",
   (()=>{const k=[VIEW,TAB];VIEW="home";TAB=0;const h=VIEWS.home();VIEW=k[0];TAB=k[1];''',
     ''' T("Chain · the IB front page features one case rather than a wall of them",
   (()=>{const k=[VIEW,TAB];VIEW="ib";TAB=0;const h=VIEWS.ib();VIEW=k[0];TAB=k[1];'''),
    (''' T("Everywhere · the section sits in the More menu and the drawer, and the home page opens a door to it",''',
     ''' T("Everywhere · the section sits in the More menu and the drawer, and the IB front page opens a door to it",'''),
    ('''flat.includes("everywhere")&&/Economics, Everywhere/.test(VIEWS.home())})());''',
     '''flat.includes("everywhere")&&/Economics, Everywhere/.test(VIEWS.ib())})());'''),
    # the masthead's finder above it names Economics, Everywhere too: the order is read from the front page itself
    ([''' T("Ecosystem · the home page opens with the journey band",()=>{const h=VIEWS.home();''',
      ''' T("Ecosystem · the IB front page opens with the journey band",()=>{const h=VIEWS.ib();'''],
     ''' T("Ecosystem · the IB front page opens with the journey band",()=>{const f=VIEWS.ib(),h=f.slice(f.indexOf('class="hero rn-home'));'''),
]
done = 0
for old, new in steps:
    if new in s:
        continue
    olds = old if isinstance(old, list) else [old]   # a step may start from either of two earlier wordings
    hit = next((o for o in olds if s.count(o) == 1), None)
    if hit is None:
        raise SystemExit("anchor not found once: " + olds[0][:110])
    s = s.replace(hit, new, 1); done += 1
p.write_text(s, encoding="utf-8")
print("applied", done, "of", len(steps), "steps")
