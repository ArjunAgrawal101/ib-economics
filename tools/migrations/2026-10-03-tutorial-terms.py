"""Tutorial terms, as supplied for the final release.

Regular sessions are US$20 for one hour (previously stated as 90 minutes),
and four packages exist: IA support, EE supervision support, Marathon
Revision and Exam Practice. Group discounts are not part of the supplied
structure and are no longer stated. The Tutorials page itself is rebuilt in
src/modules/35-tutorials.js; this migration updates the mentions and checks
that live in the base script."""
import pathlib
p = pathlib.Path(__file__).resolve().parents[2] / "index.html"
s = p.read_text(encoding="utf-8")
PAIRS = [
 ("One-to-one IB DP Economics sessions of 90 minutes, across the full syllabus,",
  "One-to-one IB DP Economics sessions of one hour, from US$20, across the full syllabus,"),
 ('<p class="xs mt3">US$20 per 90-minute one-to-one online session. Group discounts available.</p></div>`;',
  '<p class="xs mt3">US$20 per one-hour one-to-one online session, any topic. IA, EE, Marathon Revision and Exam Practice packages are on the Tutorials page.</p></div>`;'),
 ('<p class="xs mt3">US$20 per 90-minute one-to-one online session. Group discounts available.</p>\n',
  '<p class="xs mt3">US$20 per one-hour one-to-one online session, any topic. IA, EE, Marathon Revision and Exam Practice packages are on the Tutorials page.</p>\n'),
 ("That the tutorial terms are stated exactly as supplied (US$20 per 90-minute one-to-one online session, with group discounts),",
  "That the tutorial terms are stated exactly as supplied (a US$20 one-hour session; IA support US$100 for six one-hour sessions; EE supervision support US$150; Marathon Revision US$300 for twenty one-hour sessions; Exam Practice US$200 for twelve one-hour sessions),"),
 ('/>20</.test(h)&&/90-minute/.test(h)&&!new RegExp("\\\\u20B9|60[- ]min").test(h)',
  '/>20</.test(h)&&/1 hour|one-hour/.test(h)&&!/90[- ]min/.test(h)&&!new RegExp("\\\\u20B9").test(h)'),
 ('"90 min","One-to-one","Group discounts","arjun1agr@gmail.com"].every(x=>h.includes(x))',
  '"One-to-one","arjun1agr@gmail.com"].every(x=>h.includes(x))'),
]
for old, new in PAIRS:
    if old in s: s = s.replace(old, new, 1); print("applied")
    elif new in s: print("already applied")
    else: raise SystemExit("anchor not found: " + old[:70])
p.write_text(s, encoding="utf-8")
