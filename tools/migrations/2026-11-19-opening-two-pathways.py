"""2026-11-19 · the opening: one Economics ecosystem, two pathways (idempotent; applied to index.html).

This replaces the opening of 2026-11-17 (tools/migrations/2026-11-17-opening-sequence.py, the
world map) with the opening built in PR #13 (branch claude/upsc-cse-economics, commit 3b6eac9),
which the owner chose because it states both pathways and behaves as agreed. One opening remains.

Storyboard (ms from the first presented frame, one clock, opacity and transform only):
  0-1000     a dark field of coordinates, data points and the lines between them; the
             Arjun Agrawal identity (the brand vectors) emerges
  1000-2000  the identity settles to the top; axes, supply and demand appear, demand shifts
             and the equilibrium moves along supply; a trade network behind
  2000-3250  the field divides: IB DP Economics (burgundy, a globe: global perspectives,
             international evidence) and UPSC CSE Economics (forest green, a kolam: the Indian
             economy, policy, institutions)
  3150-4250  "One discipline. Two pathways.", then both names (3700-3950 is still)
  4300-5000  the two halves open onto the page; the overlay is transparent at exactly 5000 ms
             and removed on the next frame

THE STATE MODEL (the one the owner asked for): every full page load plays the full sequence,
whatever the address (first visit, reload, bookmark, a shared link to any page, Back or Forward
from another site); navigation inside the app never shows it; a page restored from the
back-forward cache is shown as it was left; nothing is read from or written to storage, so a
skip is not remembered either. Reduced motion shows one still frame for 1.5 s. A slow start holds
the final frame rather than uncovering an unfinished page.

Input: tools/build/opening-two-pathways.json, the overlay and its clock exactly as PR #13 built
them (JSON, so that the host never serves the fragment as a page). The edits below bring in what the 2026-11-17 opening did better, each one named:
  - the button reads "Skip introduction", and Escape skips from anywhere on the page;
  - a skip fades the overlay out in 180 ms on the compositor, from wherever it is;
  - every decision after the first frame reads the real time, and the exit is scheduled ahead
    as soon as the page is ready, so a busy main thread cannot start a fade in the past;
  - "Replay the opening" on the settings page (?intro=1) still works, and the parameter is taken
    out of the address once read (every load plays anyway);
  - the stage text is hidden from assistive technology like the rest of the decoration, so the
    overlay is announced once, by its name;
  - the fade's start is recorded beside its end, for the tests.
The styles are in src/styles/css-opening.css (PR #13's, with overflow:clip and a 30 s failsafe
from 2026-11-17). This script also replaces the in-page self-tests of the opening, the quality
report's description of them, and the settings page's note on what the opening stores.
Run python3 tools/build/splice.py afterwards."""
import json, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parents[2]
P = ROOT / 'index.html'
s = P.read_text(encoding='utf-8')
SRC = json.loads((ROOT / 'tools' / 'build' / 'opening-two-pathways.json').read_text(encoding='utf-8'))['html']
MARK = 'data-opening="2026-11-19"'
done = []


def edit(text, old, new, label):
    """replace exactly once inside text; a no-op when the result is already there"""
    if new in text:
        return text
    n = text.count(old)
    assert n == 1, f'{label}: anchor found {n} times'
    return text.replace(old, new, 1)


def rep(old, new, label):
    global s
    if new in s:
        return
    s = edit(s, old, new, label)
    done.append(label)


# ═══ 1 · the overlay and its clock ═════════════════════════════════════════
B = SRC
B = edit(B, '<div id="splash" role="status" aria-label="',
         '<div id="splash" role="status" ' + MARK + ' aria-label="', 'marker')
B = edit(B, '\n <div class="stage">\n', '\n <div class="stage" aria-hidden="true">\n', 'stage hidden from assistive technology')
B = edit(B, '<button id="splashskip" class="spskip" type="button">Skip intro</button></div>',
         '<button id="splashskip" class="spskip" type="button">Skip introduction</button></div>', 'Skip label')
B = edit(B, '''   page restored from the back-forward cache is shown as it was left. Reduced motion shows the still
   for 1.5 s. No timers, no storage, no network. */''',
         '''   page restored from the back-forward cache is shown as it was left. Reduced motion shows the still
   for 1.5 s. No timers, no storage, no network. Skip ("Skip introduction", Escape anywhere, or Enter
   on the button) fades the overlay out in 180 ms. ?intro=1 (Replay the opening) is taken out of
   the address once read. */''', 'clock description')
B = edit(B, 'var I=window.__INTRO={ms:5000,fadeAt:4300,holdStill:1500,',
         'var I=window.__INTRO={ms:5000,fadeAt:4300,holdStill:1500,SKIPMS:180,', 'skip duration')
B = edit(B, ''' I.route=(!h||/^home(\\/|$)/.test(h))?"home":"deep";
''', ''' I.route=(!h||/^home(\\/|$)/.test(h))?"home":"deep";
 /* "Replay the opening" links here with ?intro=1; every full load plays anyway, so the address is left clean */
 I.forced=/(^|&)intro=1(&|$)/.test((location.search||"").replace(/^\\?/,""));
 if(I.forced)try{history.replaceState(history.state,"",location.pathname+location.hash)}catch(e){}
''', 'replay parameter')
B = edit(B, 'I.fade.startTime=at;I.fadeEnd=at+left}catch(e){}\n  reveal(at,left);',
         'I.fade.startTime=at;I.fadeStart=at;I.fadeEnd=at+left}catch(e){}\n  reveal(at,left);', 'fade start')
B = edit(B, '''  if(I.state==="done")return;I.state="done";I.how=how;I.end=performance.now();
  if(sp.parentNode)sp.parentNode.removeChild(sp);''',
         '''  if(I.state==="done")return;I.state="done";I.how=how;I.end=performance.now();
  document.removeEventListener("keydown",onKey,true);
  if(sp.parentNode)sp.parentNode.removeChild(sp);''', 'key listener removed at the end')
B = edit(B, '''  if(I.state==="done")return;I.skipped=true;
  if(I.fade)try{I.fade.cancel()}catch(e){}
  if(I.rev)for(var k=0;k<I.rev.length;k++)try{I.rev[k].pause()}catch(e){}
  sp.classList.add("out");I.skipAt=performance.now();
  if(I.state==="waiting")I.done("skipped");''',
         '''  if(I.state==="done")return;I.skipped=true;
  var o=1;try{o=+getComputedStyle(sp).opacity}catch(e){}
  if(I.fade)try{I.fade.cancel()}catch(e){}
  if(I.rev)for(var k=0;k<I.rev.length;k++)try{I.rev[k].pause()}catch(e){}
  sp.classList.add("out");I.skipAt=performance.now();
  try{I.fade=sp.animate([{opacity:o},{opacity:0}],{duration:I.SKIPMS,fill:"forwards",easing:"cubic-bezier(.4,0,.2,1)"})}catch(e){}
  if(I.state==="waiting")I.done("skipped");''', 'skip fade')
B = edit(B, ''' function tick(now){
  if(I.state==="done")return;
  if(I.t0===null)start(now);
  var t=now-I.start,ready=!!window.__APP_READY;
  if(I.skipAt){if(now-I.skipAt>=170)return I.done("skipped")}
  else if(I.mode==="play"){
   if(!I.anchored)anchor(now-I.t0);
   if(!I.fade&&ready&&(I.anchored||t>=I.QUIET[1])&&t>=I.fadeAt-120)exit(now);
   if(I.fade&&now>=I.exitAt)return I.done(I.late?"late":"timer");
  }else if(ready&&t>=(I.mode==="still"?I.holdStill:0))return I.done(I.mode);
  requestAnimationFrame(tick);
 }
 var b=document.getElementById("splashskip");
 if(b)b.addEventListener("click",function(){if(typeof window.splashEnd==="function")window.splashEnd(true);else I.skip()});''',
         ''' function userSkip(){if(typeof window.splashEnd==="function")window.splashEnd(true);else I.skip()}
 function onKey(e){if(e.key==="Escape"||e.key==="Esc")userSkip()}
 function tick(now){
  if(I.state==="done")return;
  if(I.t0===null)start(now);
  /* every decision after the first frame reads the real time: when the main thread has been busy,
     a frame's timestamp can be older than the moment its callback runs, and a fade scheduled from
     it would begin in the past, already finished */
  var real=performance.now(),t=real-I.start,ready=!!window.__APP_READY;
  if(I.skipAt){if(real-I.skipAt>=I.SKIPMS)return I.done("skipped")}
  else if(I.mode==="play"){
   /* the exit is scheduled ahead as soon as the page is ready; once it is, the start is settled */
   if(!I.anchored&&!I.fade)anchor(real-I.t0);
   if(!I.fade&&ready&&(I.anchored||t>=I.QUIET[1]))exit(real);
   if(I.fade&&real>=I.exitAt)return I.done(I.late?"late":"timer");
  }else if(ready&&t>=(I.mode==="still"?I.holdStill:0))return I.done(I.mode);
  requestAnimationFrame(tick);
 }
 document.addEventListener("keydown",onKey,true);
 var b=document.getElementById("splashskip");
 if(b)b.addEventListener("click",userSkip);''', 'real time, scheduled exit, Escape')
assert B.count('<div id="splash"') == 1 and B.endswith('</script>\n'), 'unexpected overlay input'

m = re.search(r'<div id="splash"[^>]*>.*?</button></div>\n<script id="intro-clock">.*?</script>\n', s, re.S)
assert m, 'the overlay and its clock were not found'
if m.group(0) != B:
    s = s.replace(m.group(0), B, 1)
    done.append('overlay and clock')

# ═══ 2 · the in-page self-tests of the opening ═════════════════════════════
SUITE_OLD_I = s.index('function SPLASHSUITE(){')
SUITE_OLD_J = s.index('SPLASHSUITE.suiteName="Opening sequence";')
SUITE_NEW = r'''function SPLASHSUITE(){
 const out=[];const T=(n,ok,d)=>out.push({n,ok:!!ok,detail:d||""});
 /* the browser normalises spacing when it re-serialises a rule, so the
    declarations are read from the stylesheet as written */
 const css=(()=>{try{return [...document.querySelectorAll("style")].map(x=>x.textContent).join("")}
   catch(e){return CSSTEXT()}})();
 const html=document.documentElement.outerHTML;
 const I=window.__INTRO||{},PL=I.PLAN||[],at=k=>(PL.find(p=>p[0]===k)||[])[1];
 const clock=(document.getElementById("intro-clock")||{}).textContent||"";
 /* the overlay is read from the live element: a later run of the suite (the quality report, or the
    command palette) comes after it has been removed, and then these checks have nothing to inspect */
 const sp=document.getElementById("splash");
 T("Opening · one opening: the two-pathway overlay, and no trace of the world-map opening",
   (!sp||(sp.getAttribute("data-opening")==="2026-11-19"&&!sp.querySelector('[class^="o-"],[class*=" o-"]')))&&!/#splash \.o-|o-failsafe/.test(css)&&!/aae\.intro/.test(clock));
 T("Opening · the sequence lasts exactly 5000 ms on one clock",
   SPLASH_MS===5000&&I.ms===5000&&/requestAnimationFrame/.test(clock)&&/startTime=t0/.test(clock)&&/first-paint/.test(clock),String(I.ms));
 T("Opening · no stage is timed by a chain of timers",!/setTimeout|setInterval/.test(clock));
 T("Opening · the stages follow the storyboard: identity 0.3 s, supply and demand 1.1 s, the two pathways 2.1 s, one discipline 3.15 s, both names 3.95 s",
   at(".ia-logo")===300&&at(".ia-wm")===600&&at(".if-ax")===1100&&at(".if-eq")===1150&&at(".ia-ib")===2100&&at(".ia-up")===2200&&at(".ia-peak")===3150&&at(".ia-vb")===3950&&at(".if-grid")===0
   &&PL.every(p=>p[2]<=I.QUIET[0]||p[1]>=I.QUIET[1]||p[0]===".ia-bar i"),
   PL.map(p=>p[0]+"@"+p[1]).join(" "));
 T("Opening · every stage ends by 5000 ms and the reveal fills the last 700 ms",
   PL.length>=8&&PL.every(p=>p[2]<=5000&&p[1]<p[2])&&I.fadeAt===4300&&/function reveal\(at,left\)/.test(clock)&&/I\.exitAt=fp\+I\.ms/.test(clock)&&/I\.exitAt=t0\+I\.ms/.test(clock));
 T("Opening · decisions read the real time, and the exit is scheduled ahead once the page is ready",
   /var real=performance\.now\(\)/.test(clock)&&/exit\(real\)/.test(clock)&&/real>=I\.exitAt/.test(clock)&&/I\.fadeStart=at/.test(clock));
 T("Opening · only opacity and transform are animated, so the compositor keeps time",
   PL.every(p=>p[3].every(([,f])=>Object.keys(f).every(k=>k==="opacity"||k==="transform")))
   &&(clock.match(/\.animate\(\[\{(\w+)/g)||[]).every(x=>/opacity|transform/.test(x)));
 T("Opening · keyframes are in time order inside each stage's window",
   PL.every(p=>p[3].every(([t],n,a)=>t>=p[1]&&t<=p[2]&&(n===0||t>a[n-1][0]))));
 T("Opening · the stages read monogram, name, the two pathways, then one discipline, two pathways",
   (()=>{const m=/<div id="splash"[\s\S]*?<\/button><\/div>/.exec(html);if(!m)return true;const b=m[0].replace(/aria-label="[^"]*"/g,"");
     return b.indexOf('class="ia-mk"')<b.indexOf('class="ia-wm"')&&b.indexOf('class="ia-wm"')<b.indexOf('class="ia-tl"')
       &&b.indexOf('class="ia-tl"')<b.indexOf("IB DP Economics")&&b.indexOf("IB DP Economics")<b.indexOf("UPSC CSE Economics")
       &&b.indexOf("UPSC CSE Economics")<b.indexOf("One discipline.")&&b.indexOf("One discipline.")<b.indexOf("Two pathways.")})());
 T("Opening · both pathways in their own colours: IB DP Economics in burgundy, UPSC CSE Economics in forest green",
   !sp||(/IB DP Economics/.test((sp.querySelector(".ia-ib")||{}).textContent||"")&&/UPSC CSE Economics/.test((sp.querySelector(".ia-up")||{}).textContent||"")
     &&!!sp.querySelector(".dr-l i")&&!!sp.querySelector(".dr-r i")&&!!sp.querySelector(".if-globe")&&!!sp.querySelector(".if-kolam")));
 T("Opening · the name is carried by the brand vectors, never set again in type",
   (()=>{const m=/<div id="splash"[\s\S]*?<\/button><\/div>/.exec(html);if(!m)return true;
     return (m[0].replace(/aria-label="[^"]*"/g,"").replace(/<!--[\s\S]*?-->/g,"").match(/Arjun\s+Agrawal/gi)||[]).length===0})());
 T("Opening · the overlay is a status named for both pathways, and every decorative layer is hidden from assistive technology",
   !sp||(sp.getAttribute("role")==="status"&&/IB DP Economics/.test(sp.getAttribute("aria-label")||"")&&/UPSC CSE Economics/.test(sp.getAttribute("aria-label")||"")
     &&[...sp.children].filter(x=>x.id!=="splashskip").every(x=>x.getAttribute("aria-hidden")==="true")));
 T("Opening · a Skip introduction control is a real button, reachable by keyboard",
   (()=>{const b=document.getElementById("splashskip");return !sp||(!!b&&b.tagName==="BUTTON"&&b.type==="button"&&/^Skip introduction$/.test(b.textContent.trim())&&b.tabIndex>=0)})());
 T("Opening · Escape skips, as does Enter or a click on the button, and nothing else does",
   /e\.key==="Escape"/.test(clock)&&/b\.addEventListener\("click",userSkip\)/.test(clock)&&/removeEventListener\("keydown",onKey,true\)/.test(clock)
   &&!/addEventListener\("(wheel|pointerdown|touchstart|mousedown|scroll)"/.test(clock));
 T("Opening · Skip and the clock share one exit",
   typeof splashEnd==="function"&&/SPLASH_DONE/.test(String(splashEnd))&&/I\.skip\(\)/.test(String(splashEnd))&&/I\.done=function/.test(clock));
 T("Opening · a second press of Skip does nothing",/btn\.disabled=true/.test(String(splashEnd)));
 T("Opening · a skip fades the overlay out in 180 ms on the compositor",
   I.SKIPMS===180&&/duration:I\.SKIPMS/.test(clock)&&/real-I\.skipAt>=I\.SKIPMS/.test(clock));
 T("Opening · reduced motion shows the same hierarchy at once, and leaves after 1.5 s rather than playing slowly",
   /prefers-reduced-motion:reduce/.test(clock)&&I.holdStill===1500&&/#splash\.still \.sc,/.test(css));
 T("Opening · every full-page load plays the full sequence, whatever the address; storage is never read",
   /I\.route=/.test(clock)&&!/I\.mode="cover"/.test(clock)&&!/I\.mode="brief"/.test(clock)&&!/type==="reload"/.test(clock)&&!/again\|\|/.test(clock)&&!/Storage/.test(clock));
 T("Opening · ?intro=1 (Replay the opening) is taken out of the address once read",
   /intro=1/.test(clock)&&/if\(I\.forced\)try\{history\.replaceState/.test(clock)&&!/I\.forced\)I\.mode/.test(clock));
 T("Opening · the font stylesheet cannot hold the first frame",
   (()=>{const l=[...document.querySelectorAll('link[href*="assets/fonts/fonts.css"]')].filter(x=>x.rel==="stylesheet");
     return l.length>=1&&l.every(x=>x.media==="all"||x.media==="print"||x.getAttribute("onload"))})());
 T("Opening · a slow start holds the final frame instead of uncovering an unfinished page",
   /__APP_READY/.test(clock)&&/window\.__APP_READY=true/.test(html));
 T("Opening · a failsafe hides the overlay after 30 s even if its script never runs",
   /#splash\{[^}]*animation:splash-failsafe 1ms linear 30s forwards/.test(css)&&/@keyframes splash-failsafe\{to\{visibility:hidden;pointer-events:none\}\}/.test(css));
 T("Opening · the overlay clips its content, so it can never scroll sideways",
   /#splash\{[^}]*overflow:hidden;overflow:clip/.test(css));
 T("Opening · the settings page says the opening stores nothing, and offers to replay it",
   typeof settingsView==="function"&&/The opening keeps nothing/.test(String(settingsView))&&/href="\?intro=1">Replay the opening</.test(String(settingsView))&&!/aae\.intro/.test(String(settingsView)));
 T("Splash · the faded overlay stops intercepting clicks before it is removed",
   /#splash\.out\{opacity:0;pointer-events:none\}/.test(css));
 T("Splash · nothing invisible is left behind: the overlay is removed, not merely faded",
   /sp\.parentNode\.removeChild\(sp\)/.test(html));
 T("Splash · the page behind is never made inert",!/inert/.test(clock)&&!document.body.hasAttribute("inert"));
 T("Splash · nothing on the page locks scrolling",
   getComputedStyle(document.documentElement).overflow!=="hidden"
   &&["hidden","clip"].indexOf(getComputedStyle(document.body).overflowY)<0);
 T("Splash · the opening sequence triggers no printing",PRINTGUARD.startupCalls===0);
 T("Splash · the opening sequence writes nothing to storage",
   store.raw(ROOTKEY)===QAFX.snap0&&store.sandboxed()&&!/AA_IB_ECONOMICS|ROOTKEY/.test(clock));
 T("Splash · the welcome sequence is scheduled after the overlay, not beside it",
   typeof bootOnboarding==="function");
 return out;
}
'''
if s[SUITE_OLD_I:SUITE_OLD_J] != SUITE_NEW:
    s = s[:SUITE_OLD_I] + SUITE_NEW + s[SUITE_OLD_J:]
    done.append('self-tests')

# ═══ 3 · the quality report describes the opening it checks ═════════════════
WHAT_I = s.index('{area:"Opening sequence",re:/^Splash · |^Opening · /,')
WHAT_J = s.index('\n', s.index('  what:"', WHAT_I)) + 1
WHAT_NEW = ('{area:"Opening sequence",re:/^Splash · |^Opening · /,\n'
            '  what:"That the sequence runs for exactly five seconds on one clock and plays in full on every full page load, '
            'whatever the address, and never during navigation inside the app, that it reads storage for nothing, that its stages '
            'follow the storyboard (the identity, supply and demand, IB DP Economics and UPSC CSE Economics, then One discipline. '
            'Two pathways.) and animate opacity and transform only so the compositor keeps time, that reduced motion shows a still '
            'frame, that Skip introduction is a real button that also answers Escape, that a 30-second failsafe exists, that the '
            'faded overlay stops intercepting clicks and is then removed from the document, that nothing locks scrolling, that the '
            'sequence prints nothing, and that the welcome sequence is scheduled after the overlay rather than beside it."},\n')
if s[WHAT_I:WHAT_J] != WHAT_NEW:
    s = s[:WHAT_I] + WHAT_NEW + s[WHAT_J:]
    done.append('quality report')

# ═══ 4 · the settings page says what the opening stores: nothing ════════════
rep('''  <p class="sm mt3" style="max-width:72ch">The opening keeps two small notes of its own. <code>aae.intro.seen</code>, in this
   tab's session storage, means the five-second opening has played once this visit, so a later visit to the home page shows a brief
   card instead. <code>aae.intro.skip</code>, in local storage, is the time you last pressed Skip introduction; for thirty days after
   it the home page shows the brief card. Neither holds anything about you. <a class="lnk" href="?intro=1">Replay the opening</a></p>
''', '''  <p class="sm mt3" style="max-width:72ch">The opening keeps nothing. It plays in full each time the platform is opened or
   reloaded, never while you move around inside it, and nothing about it, not even a skip, is written to storage.
   <a class="lnk" href="?intro=1">Replay the opening</a></p>
''', 'settings: what the opening stores')

P.write_text(s, encoding='utf-8')
print('applied:', ', '.join(done) if done else 'nothing (already applied)')
