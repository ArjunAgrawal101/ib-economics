"""Flagship shell: the header carries the platform's identity, ARJUN AGRAWAL · ECONOMICS.

The brand no longer reads IB DP ECONOMICS, because the platform now serves two
pathways; IB DP Economics and UPSC CSE Economics sit beside it as a switcher in the
global navigation (src/modules/47-shell.js). The older primary bar stays in the page,
hidden, so the checks that measured it now measure the global navigation as well.
Idempotent: each step checks for its own result first."""
import pathlib
p = pathlib.Path(__file__).resolve().parents[2] / "index.html"
s = p.read_text(encoding="utf-8")
steps = [
    # the brand, as the page first paints it
    ('''<a class="brand" href="#" onclick="nav('home');return false" aria-label="Arjun Agrawal: IB DP Economics, home">''',
     '''<a class="brand" href="#/" onclick="nav('home');return false" aria-label="Arjun Agrawal · Economics, home">'''),
    ('<span class="wm"><b>Arjun Agrawal</b><span>IB DP ECONOMICS</span></span></a>',
     '<span class="wm"><b>Arjun Agrawal</b><span>ECONOMICS</span></span></a>'),
    # the link audit's wordmark check reads the platform's name
    ('''return !!e&&/Arjun Agrawal/.test(e.textContent)&&/IB DP ECONOMICS/i.test(e.textContent)})()},''',
     '''return !!e&&/Arjun Agrawal/.test(e.textContent)&&/ECONOMICS/i.test(e.textContent)})()},'''),
    # the branding check: personalisation still sits beneath the identity
    ('''return /Arjun Agrawal/.test(h)&&/IB DP ECONOMICS/i.test(document.querySelector(".brand").innerHTML)})());''',
     '''return /Arjun Agrawal/.test(h)&&/ECONOMICS/i.test(document.querySelector(".brand").innerHTML)})());'''),
    # the responsive checks count the global navigation as the primary navigation
    ('''const navBtns=[...document.querySelectorAll("#mainnav button")].filter(b=>b.offsetParent);''',
     '''const navBtns=[...document.querySelectorAll("#gnav a,#gnav button,#mainnav button")].filter(b=>b.offsetParent);'''),
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
