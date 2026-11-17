"""Flagship footer: the colophon now speaks for both pathways.

The footer that earlier releases built is kept whole: the proposition, the
Explore index, the four columns, the independence statement and the line on
local storage. What changes:
  - the brand line names the platform, Arjun Agrawal · Economics, and its two
    pathways, in the positioning the owner supplied;
  - a second, separate statement says the UPSC pathway is independent of the
    Union Public Service Commission, and that its handbooks and course cover
    Economics within General Studies, not the Economics Optional. The IB
    statement is not altered;
  - the dark proposition band carries the platform's idea and the two pathways,
    side by side and of equal weight.
Idempotent: each step checks for its own result first."""
import pathlib
p = pathlib.Path(__file__).resolve().parents[2] / "index.html"
s = p.read_text(encoding="utf-8")
steps = [
    # the brand line
    ('''<p class="ed mt3" style="max-width:48ch;font-size:16px">Arjun Agrawal · IB DP Economics. An independent learning environment for IB Diploma Programme Economics, built by an IB DP Economics teacher and resource creator.</p>''',
     '''<p class="ed mt3" style="max-width:48ch;font-size:16px">Arjun Agrawal · Economics. An independent Economics learning platform with two pathways, IB DP Economics and UPSC CSE Economics, built by an IB DP Economics educator, Economics resource designer and UPSC Economics mentor.</p>'''),
    # the UPSC statement, beside the IB statement and separate from it
    ('''are registered trademarks of the International Baccalaureate Organization.</p>
   <p class="xs mt3">Everything you record stays on this device. Nothing is transmitted.</p>''',
     '''are registered trademarks of the International Baccalaureate Organization.</p>
   <p class="xs mt2 ft-upsc-ind" style="max-width:52ch"><b>The UPSC CSE Economics pathway is independent too.</b> It is not affiliated with or endorsed by the Union Public Service Commission. Its handbooks and its course cover the Economics within the General Studies papers; they are not a preparation for the Economics Optional.</p>
   <p class="xs mt3">Everything you record stays on this device. Nothing is transmitted.</p>'''),
    # the idea, under the proposition
    ('''<p class="ft-ideas">Economics is about ideas, evidence, models, people, choices, trade-offs and the world.</p></div>''',
     '''<p class="ft-ideas">Economics is about ideas, evidence, models, people, choices, trade-offs and the world.</p>
   <p class="ft-idea">One discipline. Two pathways. A shared understanding of Economics.</p></div>'''),
    # the two pathways, of equal weight, closing the dark band
    ('''<button class="lnk" onclick="randomOpen('')">Random Economics</button><button class="lnk" onclick="nav('about')">About</button></nav>
 </div></div>''',
     '''<button class="lnk" onclick="randomOpen('')">Random Economics</button><button class="lnk" onclick="nav('about')">About</button></nav>
 </div><nav class="wrap full ft-paths" aria-label="The two pathways">
  <a class="ft-path p-ib" href="#/ib"><span class="ft-pn">Pathway 01</span><b>IB DP Economics</b><span>The course, the models, the real world, the examinations, the IA and the EE.</span></a>
  <a class="ft-path p-up" href="#/upsc"><span class="ft-pn">Pathway 02</span><b>UPSC CSE Economics</b><span>The syllabus, the handbooks, current affairs, a preparation strategy and the three-month course.</span></a>
 </nav></div>'''),
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
