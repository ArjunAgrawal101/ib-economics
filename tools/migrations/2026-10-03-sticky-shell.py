"""Let sticky elements stick.

Since the first upload, body carried overflow-x:hidden. With html set to
overflow-x:clip, body's overflow is not propagated to the viewport, so body
became a scroll container (overflow-y computes to auto) that never scrolls.
Every position:sticky element (the top bar, the section tabs, lesson rails,
the events chapter rail) was therefore positioned against body's scrollport
and never stuck. overflow-x:clip prevents sideways scrolling in the same way
without creating a scroll container."""
import pathlib
p = pathlib.Path(__file__).resolve().parents[2] / "index.html"
s = p.read_text(encoding="utf-8")
old = '-webkit-font-smoothing:antialiased;font-feature-settings:"kern" 1,"liga" 1;overflow-x:hidden}'
new = '-webkit-font-smoothing:antialiased;font-feature-settings:"kern" 1,"liga" 1;overflow-x:clip}'
if old in s: p.write_text(s.replace(old, new, 1), encoding="utf-8"); print("applied")
elif new in s: print("already applied")
else: raise SystemExit("anchor not found")
