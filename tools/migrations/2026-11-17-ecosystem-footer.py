"""The footer speaks for the whole ecosystem, not only the IB pathway.

The footer opens with "Explore the academic ecosystem" (built by 44-ecosystem.js);
this migration changes the parts that live in the base page: the motto band reads
"One discipline. Two pathways.", the brand paragraph names both pathways, and the
first column is headed IB DP Economics. The IB independence statement is unchanged.
Idempotent: each step checks for its own result first."""
import pathlib
p = pathlib.Path(__file__).resolve().parents[2] / "index.html"
s = p.read_text(encoding="utf-8")
steps = [
    ('<div class="ft-prop"><div class="ft-word">Think like an economist.</div>',
     '<div class="ft-prop"><div class="ft-word">One discipline. Two pathways.</div>'),
    ('<p class="ed mt3" style="max-width:48ch;font-size:16px">Arjun Agrawal · IB DP Economics. An independent learning environment for IB Diploma Programme Economics, built by an IB DP Economics teacher and resource creator.</p>',
     '<p class="ed mt3" style="max-width:48ch;font-size:16px">Arjun Agrawal | Economics. An independent learning environment for IB Diploma Programme Economics and UPSC CSE Economics, built by an Economics educator and resource creator.</p>'),
    ('''   <div><div class="kicker">Platform</div>
    <button class="lnk" onclick="nav('course')">Course at a glance</button>''',
     '''   <div><div class="kicker">IB DP Economics</div>
    <button class="lnk" onclick="nav('ib')">The IB pathway</button>
    <button class="lnk" onclick="nav('course')">Course at a glance</button>'''),
]
done = 0
for old, new in steps:
    if new in s:
        continue
    if s.count(old) != 1:
        raise SystemExit(f"anchor found {s.count(old)} times: " + old[:110])
    s = s.replace(old, new, 1); done += 1
p.write_text(s, encoding="utf-8")
print("applied", done, "of", len(steps), "steps")
