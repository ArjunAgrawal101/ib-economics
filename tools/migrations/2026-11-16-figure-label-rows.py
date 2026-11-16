"""Figure labels: guide labels that drop to a second row no longer touch the first.

A guide's x-axis label moves to a second row when it would collide with its
neighbour. The rows were 13 units apart and the labels are set at 10 units, whose
line box is about 13 units tall, so two labels in neighbouring rows could touch
once the figure is drawn larger than its viewBox (the overlap audit found "Q
elastic" and "Q inelastic" touching on #/course/topics/2.5 at 1440 px). The rows
are now 14 units apart. Idempotent: the step checks for its own result first."""
import pathlib
p = pathlib.Path(__file__).resolve().parents[2] / "index.html"
s = p.read_text(encoding="utf-8")
steps = [
    ('b+=P.t(px,Y(0)+15+row*13,g.xLab,{a:"middle",sz:10,c:g.lc||G.C.ink,mono:1});',
     'b+=P.t(px,Y(0)+15+row*14,g.xLab,{a:"middle",sz:10,c:g.lc||G.C.ink,mono:1});'),
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
