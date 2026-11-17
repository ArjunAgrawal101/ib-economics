"""Flagship About: the profile speaks for both pathways.

The owner positions the platform's author as an IB DP Economics Educator, an
Economics Resource Designer and a UPSC Economics Mentor. The lede now names
the UPSC mentoring beside the IB teaching. Every supplied professional
detail (the education, the experience, the role and the subjects) is kept
exactly as it was. Idempotent: each step checks for its own result first."""
import pathlib
p = pathlib.Path(__file__).resolve().parents[2] / "index.html"
s = p.read_text(encoding="utf-8")
steps = [
    (''' lede:"I teach IB Diploma Programme Economics, and I build the resources my own classroom needs. This system is one of them.",''',
     ''' lede:"I teach IB Diploma Programme Economics, mentor UPSC Civil Services aspirants in the Economics of General Studies, and build the resources both need. This platform is one of them.",'''),
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
