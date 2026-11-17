"""The ecosystem's navigation: one identity, Arjun Agrawal | Economics, for both pathways.

The header's main navigation (Home, IB DP Economics, UPSC CSE Economics, Learning
Tools, About Arjun, The Business Brief) is built by src/modules/44-ecosystem.js. This
migration changes the parts of the shell that live in the base page:
  · the wordmark reads ECONOMICS rather than IB DP ECONOMICS, and the brand's
    accessible name says so; the brand self-tests read the new identity;
  · the phone drawer opens with the two pathways and the shared concepts, keeps
    every group it had (Resources still leads Start), and ends with The Business
    Brief, which opens in a new tab;
  · the IB landing page and the shared concepts are placed in the drawer, so every
    section stays reachable from it.
Idempotent: each step checks for its own result first."""
import pathlib
p = pathlib.Path(__file__).resolve().parents[2] / "index.html"
s = p.read_text(encoding="utf-8")
steps = [
    ('<a class="brand" href="#" onclick="nav(\'home\');return false" aria-label="Arjun Agrawal: IB DP Economics, home">',
     '<a class="brand" href="#" onclick="nav(\'home\');return false" aria-label="Arjun Agrawal | Economics, home">'),
    ('<span class="wm"><b>Arjun Agrawal</b><span>IB DP ECONOMICS</span></span></a>',
     '<span class="wm"><b>Arjun Agrawal</b><span>ECONOMICS</span></span></a>'),
    ('return !!e&&/Arjun Agrawal/.test(e.textContent)&&/IB DP ECONOMICS/i.test(e.textContent)})()},',
     'return !!e&&/Arjun Agrawal/.test(e.textContent)&&/^\\s*ECONOMICS\\s*$/.test((e.querySelector("span")||{}).textContent||"")})()},'),
    ('A("Brand · IB DP Economics naming used in the shell",/IB DP ECONOMICS/.test(document.body.innerHTML));',
     'A("Brand · one identity, Arjun Agrawal | Economics, and both pathways named in the shell",/>ECONOMICS</.test(document.querySelector(".brand").innerHTML)&&/IB DP Economics/.test(document.body.innerHTML)&&/UPSC CSE Economics/.test(document.body.innerHTML));'),
    ('return /Arjun Agrawal/.test(h)&&/IB DP ECONOMICS/i.test(document.querySelector(".brand").innerHTML)})());',
     'return /Arjun Agrawal/.test(h)&&/>ECONOMICS</.test(document.querySelector(".brand").innerHTML)})());'),
    # the drawer: both pathways and the shared concepts are placed, Resources still leads
    ('[["Start",[["resources","Resources"],["upsc","UPSC CSE Economics"],["course","Course"],',
     '[["Start",[["resources","Resources"],["ib","IB DP Economics"],["upsc","UPSC CSE Economics"],["concepts","Shared concepts"],["course","Course"],'),
    ('''   <div><div class="eb">Arjun Agrawal</div><div class="xs mt1">IB DP Economics</div></div>''',
     '''   <div><div class="eb">Arjun Agrawal</div><div class="xs mt1">Economics</div></div>'''),
    (''' const item=([v,n])=>{const s=SECTIONS.find(x=>x.v===v);if(!s)return "";
  return `<button class="mobitem ${VIEW===v?"on":""}" onclick="nav('${v}')">${esc(n)}</button>`};''',
     ''' const PW=["ib","upsc","concepts"];   /* the pathways lead the drawer in their own block */
 const item=([v,n])=>{const s=SECTIONS.find(x=>x.v===v);if(!s||PW.includes(v))return "";
  return `<button class="mobitem ${VIEW===v?"on":""}" onclick="nav('${v}')">${esc(n)}</button>`};
 const pw=PW.filter(v=>SECTIONS.some(x=>x.v===v)).map(v=>`<button class="mobitem mobpath mobpath-${v} ${VIEW===v?"on":""}" onclick="nav('${v}')">${esc(({ib:"IB DP Economics",upsc:"UPSC CSE Economics",concepts:"Shared concepts"})[v])}</button>`).join("");'''),
    ('''  <button class="mobhome ${VIEW==="home"?"on":""}" onclick="nav('home')">Home</button>
  ${mobSections().map(''',
     '''  <button class="mobhome ${VIEW==="home"?"on":""}" onclick="nav('home')">Home</button>
  <div class="mobgroup mobpaths"><div class="moblab">Pathways</div>${pw}</div>
  ${mobSections().map('''),
    ('''  <p class="xs mt4" style="color:var(--tx-4)">Everything you record stays on this device.</p>`;
 document.body.appendChild(d);''',
     '''  <div class="mobgroup"><div class="moblab">Beyond Economics</div>
   <a class="mobitem mobext" href="https://the-business-brief-dun.vercel.app/" target="_blank" rel="noopener noreferrer">The Business Brief · IB DP Business Management <span aria-hidden="true">↗</span><span class="sy-vh"> (opens in a new tab)</span></a></div>
  <p class="xs mt4" style="color:var(--tx-4)">Everything you record stays on this device.</p>`;
 document.body.appendChild(d);'''),
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
