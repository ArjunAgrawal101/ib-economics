"""Flagship IB DP landing: what the IB DP home page did on its own route, it now does at #/ib.

The IB DP home page moved from #/ to #/ib intact. One behaviour in the older
base code was keyed to the home route by name: when the video list arrives for
the first time, the page repaints so the Latest from Arjun band appears. That
band is on the IB DP landing now, so the repaint follows it there.
Idempotent: each step checks for its own result first."""
import pathlib
p = pathlib.Path(__file__).resolve().parents[2] / "index.html"
s = p.read_text(encoding="utf-8")
steps = [
    ('''if(VIEW==="arjun"||(VIEW==="home"&&!had&&YT.data))try{render()}catch(e){}''',
     '''if(VIEW==="arjun"||(VIEW==="ib"&&!had&&YT.data))try{render()}catch(e){}'''),
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
