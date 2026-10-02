"""Reword one examiner-guidance line in the exam builder's question bank.

The Exam builder (Teacher tab) was unreachable until the tab repair; once
reachable, the language self-test swept it and read "'Always' should be
attacked directly." as an absolute stated in the platform's own voice. The
guidance means the opposite, so it is reworded without the trigger word; a second line with the same wording is changed too."""
import pathlib
p = pathlib.Path(__file__).resolve().parents[2] / "index.html"
s = p.read_text(encoding="utf-8")
PAIRS = [("gd:\"'Always' should be attacked directly. Natural monopoly", "gd:\"Attack the absolute in the question directly. Natural monopoly"),
         ("The word 'always' should be directly attacked.\"", "Attack the absolute in the question directly.\"")]
for old, new in PAIRS:
    if old in s: s = s.replace(old, new, 1); print("applied")
    elif new in s: print("already applied")
    else: raise SystemExit("anchor not found: " + old)
p.write_text(s, encoding="utf-8")
