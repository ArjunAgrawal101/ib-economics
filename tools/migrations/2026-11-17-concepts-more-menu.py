"""One Concept. Two Perspectives.: the concept layer joins the More menu's Pathways group.

The section `concepts` (src/modules/46-concepts.js) is registered without a place on
the primary bar; the shell's new header will place it. Until then the desktop More
menu names it beside UPSC CSE Economics, the two pathways it joins, so it is
reachable by name there (the phone drawer already lists any unplaced section under
More). The menu is built in an older module, src/modules/27-wire-t6.js, and its own
self-test reads the menu's source for every section's name, so the entry is written
into that module's list rather than added at run time. Run
`python3 tools/build/splice.py` afterwards.
Idempotent: the step checks for its own result first, and stops with a message if
the menu it edits has been rebuilt, so the new menu can place the section itself."""
import pathlib
p = pathlib.Path(__file__).resolve().parents[2] / "src" / "modules" / "27-wire-t6.js"
s = p.read_text(encoding="utf-8")
OLD = 'const G=[["Pathways",[["upsc","UPSC CSE Economics"]]],'
NEW = 'const G=[["Pathways",[["upsc","UPSC CSE Economics"],["concepts","One Concept. Two Perspectives."]]],'
if NEW in s:
    print("applied 0 of 1 steps (already in place)")
elif s.count(OLD) == 1:
    p.write_text(s.replace(OLD, NEW, 1), encoding="utf-8")
    print("applied 1 of 1 steps")
else:
    raise SystemExit(f"anchor found {s.count(OLD)} times: the More menu has been rebuilt; place the concepts section in it there")
