"""Launch: Resources becomes a first-class destination on the primary bar.

The pre-launch brief makes the Resource hub (#/resources) a direct destination:
it joins the primary bar, is the last item the bar gives up on a narrow screen,
and leads the phone drawer. To keep the bar to the places most visits start
from, Economics, Everywhere and the Learning Studio move to the More menu, which
lists every section; both are still in the drawer, the footer and search, and
the home page opens a door to each.

The self-tests that froze the earlier order are updated to the new one, with
the same strictness. Idempotent: each step checks for its own result first."""
import pathlib
p = pathlib.Path(__file__).resolve().parents[2] / "index.html"
s = p.read_text(encoding="utf-8")
steps = [
    # the primary bar
    (''' /* PART 2 · Mindmaps is a primary item. Resources sits in the More menu,
    because Real World and Mindmaps are more central to the learning itself. */''',
     ''' /* PART 2 · Mindmaps is a primary item. The launch brief adds Resources to the bar as a
    first-class destination; Economics, Everywhere and the Learning Studio move to the
    More menu, which lists every section. */'''),
    (''' const ORDER=["course","learn","lab","world","practise","examiner","mind","everywhere","studio","tutorials"];''',
     ''' const ORDER=["course","learn","lab","world","practise","examiner","mind","resources","tutorials"];'''),
    # what the bar gives up last: Resources, then Real World and Mindmaps
    ('''const NAVKEEP={world:100,mind:96,''', '''const NAVKEEP={resources:101,world:100,mind:96,'''),
    # the phone drawer opens with Resources
    ('''[["Start",[["course","Course"],["learn","Learn"],["think","Think"],["lab","Lab"]]],
 ["Explore",[["everywhere","Economics, Everywhere"],["world","Real World"],["mind","Mindmaps"],["resources","Resources"],["arjun",''',
     '''[["Start",[["resources","Resources"],["course","Course"],["learn","Learn"],["think","Think"],["lab","Lab"]]],
 ["Explore",[["everywhere","Economics, Everywhere"],["world","Real World"],["mind","Mindmaps"],["arjun",'''),
    # self-tests: the frozen order, updated to the launch order
    ('''   (()=>{ const want=["course","learn","lab","world","practise","examiner","mind","everywhere","studio"];
     const got=SECTIONS.filter(s=>s.pri).map(s=>s.v);
     return JSON.stringify(got)===JSON.stringify(want)})());''',
     '''   (()=>{ const want=["course","learn","lab","world","practise","examiner","mind","resources"];
     const got=SECTIONS.filter(s=>s.pri).map(s=>s.v);
     return JSON.stringify(got)===JSON.stringify(want)})());'''),
    (''' T("Navigation · Mindmaps and Real World are primary, Resources is not",
   (()=>{const pri=SECTIONS.filter(s=>s.pri).map(s=>s.v);
     return pri.includes("mind")&&pri.includes("world")&&!pri.includes("resources")})());''',
     ''' T("Navigation · Mindmaps, Real World and Resources are primary",
   (()=>{const pri=SECTIONS.filter(s=>s.pri).map(s=>s.v);
     return pri.includes("mind")&&pri.includes("world")&&pri.includes("resources")})());'''),
    (''' T("Navigation · Economics, Everywhere, Real World, Mindmaps and Resources lead the drawer's second group",
   (()=>{const g=MOBGROUPS.find(x=>x[0]==="Explore");
     if(!g)return false;const keys=g[1].map(i=>i[0]);
     return keys.indexOf("everywhere")===0&&keys.indexOf("world")===1&&keys.indexOf("mind")===2&&keys.indexOf("resources")===3})());''',
     ''' T("Navigation · Resources leads the drawer; Economics, Everywhere, Real World and Mindmaps lead its second group",
   (()=>{const g=MOBGROUPS.find(x=>x[0]==="Explore");
     if(!g)return false;const keys=g[1].map(i=>i[0]);
     return MOBGROUPS[0][1][0][0]==="resources"&&keys.indexOf("everywhere")===0&&keys.indexOf("world")===1&&keys.indexOf("mind")===2})());'''),
    (''' T("Navigation · Real World and Mindmaps are the last two items the bar gives up",
   (()=>{const ranks=Object.entries(NAVKEEP).sort((a,b)=>b[1]-a[1]).map(x=>x[0]);
     return ranks[0]==="world"&&ranks[1]==="mind"})());''',
     ''' T("Navigation · Resources, Real World and Mindmaps are the last three items the bar gives up",
   (()=>{const ranks=Object.entries(NAVKEEP).sort((a,b)=>b[1]-a[1]).map(x=>x[0]);
     return ranks[0]==="resources"&&ranks[1]==="world"&&ranks[2]==="mind"})());'''),
    (''' T("Navigation · Resources is off the bar but first in the More menu and high in the drawer",
   (()=>{const r=SECTIONS.find(x=>x.v==="resources");
     const flat=MOBGROUPS.flatMap(([,i])=>i.map(x=>x[0]));
     return r&&!r.pri&&flat.indexOf("resources")>=0&&flat.indexOf("resources")<10''',
     ''' T("Navigation · Resources is on the bar, first in the More menu and first in the drawer",
   (()=>{const r=SECTIONS.find(x=>x.v==="resources");
     const flat=MOBGROUPS.flatMap(([,i])=>i.map(x=>x[0]));
     return r&&r.pri&&flat.indexOf("resources")===0'''),
    ('''   (()=>{ const want=["course","learn","lab","world","practise","examiner","mind","everywhere","studio"];
     const got=SECTIONS.filter(s=>s.pri).map(s=>s.v);
     /* Tutorials closes the bar''',
     '''   (()=>{ const want=["course","learn","lab","world","practise","examiner","mind","resources"];
     const got=SECTIONS.filter(s=>s.pri).map(s=>s.v);
     /* Tutorials closes the bar'''),
    (''' T("Everywhere · the section sits on the bar, in the drawer and in the More menu, and the home page opens a door to it",
   (()=>{const s=SECTIONS.find(x=>x.v==="everywhere");const flat=MOBGROUPS.flatMap(([,i])=>i.map(x=>x[0]));
    return s&&s.pri&&flat.includes("everywhere")''',
     ''' T("Everywhere · the section sits in the More menu and the drawer, and the home page opens a door to it",
   (()=>{const s=SECTIONS.find(x=>x.v==="everywhere");const flat=MOBGROUPS.flatMap(([,i])=>i.map(x=>x[0]));
    return s&&/\\["everywhere",/.test(String(moreMenu))&&flat.includes("everywhere")'''),
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
