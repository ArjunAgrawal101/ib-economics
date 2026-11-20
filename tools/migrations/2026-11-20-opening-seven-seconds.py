"""2026-11-20 · the opening: seven seconds, from economic thought to real-world understanding
(idempotent; applied to index.html).

The owner's final brief asks for a cinematic seven-second opening in place of the five-second
two-pathway opening of 2026-11-19 (tools/migrations/2026-11-19-opening-two-pathways.py). The
engine that keeps time is kept exactly as it was (one clock on the first presented frame, Web
Animations with a shared startTime, Paint Timing re-anchoring during a still passage, a reveal that
ends at exactly start + ms, Skip and Escape, reduced motion, no storage, no timers); the storyboard,
the overlay's markup and its duration change.

Storyboard (ms from the first presented frame, one clock, opacity and transform only):
  0-700      a midnight field lit from the seam, and a fine-line economic grid
  250-1650   price and quantity axes; demand draws itself (450-1350), then supply (650-1550);
             the equilibrium, with its price and quantity (1350-1650)
  1750-3400  the market gives way to the macroeconomy: aggregate demand shifts right along
             short-run aggregate supply (2300-2900) and the equilibrium moves with it; long-run
             supply stays where it is. The dot's path is the intersection's: with SRAS of slope
             -0.75 and AD of slope 1 (in the drawing's units, y downwards), a shift of d moves the
             intersection by (d/1.75, -0.75d/1.75); for d = 48 (12% of the figure), (6.857%, -5.143%)
  3000-4400  a network joins concepts, evidence, policy and outcomes, then recedes behind
  3950-4750  the monogram, then the name, ARJUN AGRAWAL (the brand vectors, never type)
  4800-5250  ECONOMICS · POLITICS · BUSINESS
  5300-5750  THINK LIKE AN ECONOMIST.                     (5800-6050 is still)
  6200-7000  the two halves open onto the page like the covers of a book; the overlay is
             transparent at exactly 7000 ms and removed on the next frame

The state model is unchanged and is the one the owner asked for: every full page load plays the
full sequence, whatever the address (first visit, reload, refresh, bookmark, a shared link, Back or
Forward from another site); navigation inside the app never shows it; nothing is read from or
written to storage, so a skip is not remembered either. Reduced motion shows one still frame for
1.5 s. A slow start holds the final frame rather than uncovering an unfinished page. "Replay the
opening" (?intro=1) is on the settings page and, from this release, in the footer.

The styles are in src/styles/css-opening.css. This script also replaces the in-page self-tests of
the opening, the quality report's description of it, the platform-side duration (SPLASH_MS) and the
feature list's line. Run python3 tools/build/splice.py afterwards."""
import pathlib, re

ROOT = pathlib.Path(__file__).resolve().parents[2]
P = ROOT / 'index.html'
s = P.read_text(encoding='utf-8')
MARK = 'data-opening="2026-11-20"'
done = []


def rep(old, new, label):
    global s
    if new in s:
        return
    n = s.count(old)
    assert n == 1, f'{label}: anchor found {n} times'
    s = s.replace(old, new, 1)
    done.append(label)


# ═══ 1 · the overlay and its clock ═════════════════════════════════════════
if MARK not in s:
    i = s.index('<div id="splash"')
    j = s.index('</script>', s.index('<script id="intro-clock">')) + len('</script>')
    old = s[i:j]
    def vec(cls):
        m = re.search(r'<svg class="' + cls + r'"[\s\S]*?</svg>', old)
        assert m, f'brand vector {cls} not found'
        return m.group(0).replace('viewBox="0 0 760 462"', 'viewBox="0 0 760 392"')
    MK, WM = vec('ia-mk'), vec('ia-wm')
    GRID = ('<svg class="if if-grid" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">'
            '<defs><pattern id="ifg" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40"/></pattern>'
            '<pattern id="ifg5" width="200" height="200" patternUnits="userSpaceOnUse"><path class="mj" d="M200 0H0V200"/></pattern></defs>'
            '<rect width="1600" height="1000" fill="url(#ifg)"/><rect width="1600" height="1000" fill="url(#ifg5)"/></svg>')
    SV = 'viewBox="0 0 400 400" aria-hidden="true" focusable="false"'
    MICRO = (
        '<div class="if-grp if-mic">'
        f'<svg class="if-f if-ax" {SV}><path class="ax" d="M50 30V350H380"/><text x="58" y="40">Price</text><text x="378" y="374" text-anchor="end">Quantity</text></svg>'
        f'<div class="if-w if-wd"><div class="if-wi"><svg class="if-f if-d" {SV}><path d="M80 80L340 330"/><text class="k" x="346" y="340">D</text></svg></div></div>'
        f'<div class="if-w if-ws"><div class="if-wi"><svg class="if-f if-s" {SV}><path d="M80 330L340 80"/><text class="k" x="346" y="84">S</text></svg></div></div>'
        f'<svg class="if-f if-eq" {SV}><path class="gd" d="M210 205V350M210 205H50"/><circle class="r" cx="210" cy="205" r="14"/><circle class="e" cx="210" cy="205" r="6"/>'
        '<text x="42" y="210" text-anchor="end">P*</text><text x="210" y="374" text-anchor="middle">Q*</text></svg>'
        '</div>')
    MACRO = (
        '<div class="if-grp if-mac">'
        f'<svg class="if-f" {SV}><path class="ax" d="M50 30V350H380"/><text x="58" y="40">Price level</text><text x="378" y="374" text-anchor="end">Real GDP</text>'
        '<path class="lr" d="M270 50V350"/><text x="276" y="62">LRAS</text><path class="sr" d="M90 320L370 110"/><text class="k" x="384" y="100" text-anchor="end">SRAS</text></svg>'
        f'<svg class="if-f if-ad" {SV}><path d="M90 110L330 350"/><text class="k" x="318" y="318">AD</text></svg>'
        f'<svg class="if-f if-eq2" {SV}><circle class="r" cx="210" cy="230" r="14"/><circle class="e" cx="210" cy="230" r="6"/></svg>'
        '</div>')
    NODES = [('Concepts', 300, 330, 290), ('Evidence', 700, 330, 290), ('Policy', 700, 670, 744), ('Outcomes', 300, 670, 744)]
    SAT = [(150, 190), (500, 150), (850, 200), (880, 500), (830, 840), (500, 860), (160, 820), (110, 500)]
    NEAR = [0, 0, 1, 1, 2, 2, 3, 3]
    net = ['<svg class="if if-net" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">',
           '<g class="if-e e">',
           '<path d="M300 330H700V670H300Z"/>',
           '<path class="x" d="M300 330L700 670M700 330L300 670"/>']
    for k, (x, y) in enumerate(SAT):
        nx, ny = NODES[NEAR[k]][1], NODES[NEAR[k]][2]
        net.append(f'<path class="x" d="M{x} {y}L{nx} {ny}"/>')
    net.append('</g><g class="s">' + ''.join(f'<circle cx="{x}" cy="{y}" r="4"/>' for x, y in SAT) + '</g>')
    for k, (name, x, y, ty) in enumerate(NODES):
        net.append(f'<g class="if-n if-n{k + 1} n"><circle cx="{x}" cy="{y}" r="15"/><circle class="c" cx="{x}" cy="{y}" r="5"/>'
                   f'<text x="{x}" y="{ty}">{name.upper()}</text></g>')
    net.append('</svg>')
    NET = ''.join(net)
    OVERLAY = (
        '<div id="splash" role="status" ' + MARK + ' aria-label="Arjun Agrawal. Economics, Politics, Business. Think like an economist.">\n'
        ' <!-- THE OPENING · seven seconds; the name is carried by the brand vectors, never set again in type -->\n'
        ' <div class="dr dr-l" aria-hidden="true"><i></i></div><div class="dr dr-r" aria-hidden="true"><i></i></div>\n'
        ' <div class="ifs" aria-hidden="true">' + GRID + '<div class="if-fig">' + MICRO + MACRO + '</div>' + NET + '</div>\n'
        ' <div class="stage" aria-hidden="true">\n'
        '  <div class="sc ia-logo" aria-hidden="true">' + MK + WM + '</div>\n'
        '  <div class="sc ia-pos"><span>Economics</span> <i aria-hidden="true"></i> <span>Politics</span> <i aria-hidden="true"></i> <span>Business</span></div>\n'
        '  <div class="sc ia-tg">Think like an economist.</div>\n'
        ' </div>\n'
        ' <div class="ia-bar" aria-hidden="true"><i></i></div>\n'
        ' <button id="splashskip" class="spskip" type="button">Skip introduction</button></div>')
    CLOCK = r'''<script id="intro-clock">
/* THE OPENING · exactly seven seconds, on one clock.
   The start is the first frame the reader sees. The script takes the first
   animation frame (requestAnimationFrame, on the monotonic timeline that
   performance.now() reads) and schedules every stage as a Web Animation with
   that startTime, so no stage can drift from another and nothing waits on a
   font, an image or the start-up self-test: opacity and transform run on the
   compositor while the main thread is busy. The browser may present that
   first frame a little later than it drew it. When it reports the moment
   (Paint Timing, "first-paint"), that moment becomes the authoritative start:
   the stages are re-anchored to it during a still passage of the sequence
   (5.80–6.05 s, when nothing is moving), and the exit fade finishes at exactly
   start + 7000 ms. The overlay is removed on the first frame at or after
   that. If the platform behind it is not ready by then (a slow device), the
   final frame holds rather than uncovering an unfinished page, and the record
   says so. THE STATE MODEL: every full-page load plays the full sequence
   (first visit, revisit, reload, refresh, bookmark, a shared link to any page, a
   full-page Back/Forward), whatever is cached, because nothing here waits on the
   network or reads storage. Navigation inside the app never shows it, and a
   page restored from the back-forward cache is shown as it was left. Reduced motion shows the still
   for 1.5 s. No timers, no storage, no network. Skip ("Skip introduction", Escape anywhere, or Enter
   on the button) fades the overlay out in 180 ms. ?intro=1 (Replay the opening) is taken out of
   the address once read. */
(function(){
 var sp=document.getElementById("splash");if(!sp)return;
 var I=window.__INTRO={ms:7000,fadeAt:6200,holdStill:1500,SKIPMS:180,t0:null,start:null,fp:null,anchored:false,mode:"play",state:"waiting",how:null,end:null,exitAt:null,late:false,anims:[]};
 I.PLAN=[
  [".dr-l i",0,1200,[[0,{opacity:0}],[1200,{opacity:1}]]],
  [".dr-r i",0,1200,[[0,{opacity:0}],[1200,{opacity:1}]]],
  [".if-grid",0,700,[[0,{opacity:0}],[700,{opacity:1}]]],
  [".if-ax",250,650,[[250,{opacity:0}],[650,{opacity:1}]]],
  [".if-wd",450,1350,[[450,{transform:"translateX(-101%)"}],[1350,{transform:"translateX(0)"}]],"cubic-bezier(.55,.06,.35,.98)"],
  [".if-wd .if-wi",450,1350,[[450,{transform:"translateX(101%)"}],[1350,{transform:"translateX(0)"}]],"cubic-bezier(.55,.06,.35,.98)"],
  [".if-ws",650,1550,[[650,{transform:"translateX(-101%)"}],[1550,{transform:"translateX(0)"}]],"cubic-bezier(.55,.06,.35,.98)"],
  [".if-ws .if-wi",650,1550,[[650,{transform:"translateX(101%)"}],[1550,{transform:"translateX(0)"}]],"cubic-bezier(.55,.06,.35,.98)"],
  [".if-eq",1350,1650,[[1350,{opacity:0,transform:"scale(.6)"}],[1650,{opacity:1,transform:"scale(1)"}]]],
  [".if-mic",1750,2150,[[1750,{opacity:1,transform:"scale(1)"}],[2150,{opacity:0,transform:"scale(.97)"}]]],
  [".if-mac",1850,3400,[[1850,{opacity:0,transform:"scale(1.03)"}],[2250,{opacity:1,transform:"scale(1)"}],[3050,{opacity:1,transform:"scale(1)"}],[3400,{opacity:0,transform:"scale(.97)"}]]],
  [".if-ad",1850,2900,[[1850,{opacity:1,transform:"translateX(0)"}],[2300,{opacity:1,transform:"translateX(0)"}],[2900,{opacity:1,transform:"translateX(12%)"}]]],
  [".if-eq2",1850,2900,[[1850,{opacity:1,transform:"translate(0,0)"}],[2300,{opacity:1,transform:"translate(0,0)"}],[2900,{opacity:1,transform:"translate(6.857%,-5.143%)"}]]],
  [".if-net",3000,4400,[[3000,{opacity:0,transform:"scale(.96)"}],[3450,{opacity:1,transform:"scale(1)"}],[4000,{opacity:1,transform:"scale(1)"}],[4400,{opacity:.1,transform:"scale(1.02)"}]]],
  [".if-net .if-e",3150,3800,[[3150,{opacity:0}],[3800,{opacity:1}]]],
  [".if-n1",3100,3400,[[3100,{opacity:0,transform:"translateY(8px)"}],[3400,{opacity:1,transform:"translateY(0)"}]]],
  [".if-n2",3250,3550,[[3250,{opacity:0,transform:"translateY(8px)"}],[3550,{opacity:1,transform:"translateY(0)"}]]],
  [".if-n3",3400,3700,[[3400,{opacity:0,transform:"translateY(8px)"}],[3700,{opacity:1,transform:"translateY(0)"}]]],
  [".if-n4",3550,3850,[[3550,{opacity:0,transform:"translateY(8px)"}],[3850,{opacity:1,transform:"translateY(0)"}]]],
  [".ia-logo",3950,4500,[[3950,{opacity:0,transform:"scale(.94)"}],[4500,{opacity:1,transform:"scale(1)"}]]],
  [".ia-wm",4350,4750,[[4350,{opacity:0}],[4750,{opacity:1}]]],
  [".ia-pos",4800,5250,[[4800,{opacity:0,transform:"translateY(8px)"}],[5250,{opacity:1,transform:"translateY(0)"}]]],
  [".ia-tg",5300,5750,[[5300,{opacity:0,transform:"translateY(10px)"}],[5750,{opacity:1,transform:"translateY(0)"}]]],
  [".ia-bar i",0,7000,[[0,{transform:"scaleX(0)"}],[7000,{transform:"scaleX(1)"}]],"linear"]];
 I.QUIET=[5800,6050];
 I.nav="navigate";try{var n=performance.getEntriesByType("navigation")[0];if(n)I.nav=n.type}catch(e){}
 var h=(location.hash||"").replace(/^#\/?/,"");
 I.route=(!h||/^home(\/|$)/.test(h))?"home":"deep";
 /* "Replay the opening" links here with ?intro=1; every full load plays anyway, so the address is left clean */
 I.forced=/(^|&)intro=1(&|$)/.test((location.search||"").replace(/^\?/,""));
 if(I.forced)try{history.replaceState(history.state,"",location.pathname+location.hash)}catch(e){}
 var reduced=false;try{reduced=!!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion:reduce)").matches)}catch(e){}
 window.addEventListener("pageshow",function(e){if(e.persisted)I.restored=true});
 if(reduced||typeof sp.animate!=="function")I.mode="still";   /* every full-page load plays, whatever the address */
 if(I.mode!=="play"){sp.classList.add("still");sp.classList.add(I.mode)}
 function firstPaint(){try{var e=performance.getEntriesByType("paint");for(var i=0;i<e.length;i++)if(e[i].name==="first-paint")return e[i].startTime}catch(x){}return null}
 function start(t0){
  I.t0=I.start=t0;I.state="playing";I.exitAt=t0+I.ms;
  if(I.mode!=="play")return;
  for(var k=0;k<I.PLAN.length;k++){var p=I.PLAN[k],el=sp.querySelector(p[0]);if(!el)continue;
   var d=p[2]-p[1],fr=[];
   for(var j=0;j<p[3].length;j++){var f={},src=p[3][j][1];for(var q in src)f[q]=src[q];
    f.offset=(p[3][j][0]-p[1])/d;f.easing=p[4]||"cubic-bezier(.2,.7,.2,1)";fr.push(f)}
   try{var a=el.animate(fr,{duration:d,delay:p[1],fill:"both"});a.startTime=t0;I.anims.push(a)}catch(e){}}
 }
 function anchor(t){
  /* move the start to the presented first frame; quietly if the passage allows */
  var fp=firstPaint();if(fp===null)return;
  I.fp=fp;
  if(Math.abs(fp-I.t0)<=4||fp>I.t0+1000||fp<I.t0-1000){I.anchored=true;return}
  if(t>=I.QUIET[0]&&t<I.QUIET[1]){for(var k=0;k<I.anims.length;k++)try{I.anims[k].startTime=fp}catch(e){}I.start=fp;I.exitAt=fp+I.ms;I.anchored=true}
  else if(t>=I.QUIET[1]){I.start=fp;I.exitAt=fp+I.ms;I.anchored=true;I.split=true}
 }
 function exit(now){
  /* the fade ends at start + 7000 exactly; begun late, it still ends there if 120 ms remain */
  var at=Math.max(I.start+I.fadeAt,now),left=I.exitAt-at;
  if(at>I.start+I.fadeAt+1)I.short=true;                 /* begun late: the reveal is quicker, and still ends at start + 7000 */
  if(left<120){left=300;I.exitAt=at+left;I.late=true}
  try{I.fade=sp.animate([{opacity:1},{opacity:1,offset:.55},{opacity:0}],{duration:left,fill:"forwards",easing:"linear"});I.fade.startTime=at;I.fadeStart=at;I.fadeEnd=at+left}catch(e){}
  reveal(at,left);
 }
 function reveal(at,left){
  /* the halves part like the covers of a book; the identity lifts and fades */
  var tall=sp.clientWidth<=640,ez="cubic-bezier(.65,0,.35,1)",R=[
   [".dr-l",[{transform:"translate(0,0)"},{transform:tall?"translate(0,-101%)":"translate(-101%,0)"}],1],
   [".dr-r",[{transform:"translate(0,0)"},{transform:tall?"translate(0,101%)":"translate(101%,0)"}],1],
   [".stage",[{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(1.03)"}],.42],
   [".ifs",[{opacity:1},{opacity:0}],.36],[".ia-bar",[{opacity:1},{opacity:0}],.3]];
  I.rev=[];
  for(var k=0;k<R.length;k++){var el=sp.querySelector(R[k][0]);if(!el)continue;
   try{var a=el.animate(R[k][1],{duration:left*R[k][2],fill:"forwards",easing:ez});a.startTime=at;I.rev.push(a)}catch(e){}}
 }
 I.done=function(how){
  if(I.state==="done")return;I.state="done";I.how=how;I.end=performance.now();
  document.removeEventListener("keydown",onKey,true);
  if(sp.parentNode)sp.parentNode.removeChild(sp);
  try{document.dispatchEvent(new CustomEvent("intro:done",{detail:how}))}catch(e){}
 };
 I.skip=function(){
  if(I.state==="done")return;I.skipped=true;
  var o=1;try{o=+getComputedStyle(sp).opacity}catch(e){}
  if(I.fade)try{I.fade.cancel()}catch(e){}
  if(I.rev)for(var k=0;k<I.rev.length;k++)try{I.rev[k].pause()}catch(e){}
  sp.classList.add("out");I.skipAt=performance.now();
  try{I.fade=sp.animate([{opacity:o},{opacity:0}],{duration:I.SKIPMS,fill:"forwards",easing:"cubic-bezier(.4,0,.2,1)"})}catch(e){}
  if(I.state==="waiting")I.done("skipped");
 };
 function userSkip(){if(typeof window.splashEnd==="function")window.splashEnd(true);else I.skip()}
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
 if(b)b.addEventListener("click",userSkip);
 requestAnimationFrame(tick);
})();
</script>'''
    s = s[:i] + OVERLAY + '\n' + CLOCK + s[j:]
    done.append('overlay and clock')

# ═══ 2 · the in-page self-tests of the opening ═════════════════════════════
rep('''T("Opening · one opening: the two-pathway overlay, and no trace of the world-map opening",
   (!sp||(sp.getAttribute("data-opening")==="2026-11-19"&&!sp.querySelector('[class^="o-"],[class*=" o-"]')))&&!/#splash \\.o-|o-failsafe/.test(css)&&!/aae\\.intro/.test(clock));''',
    '''T("Opening · one opening: the seven-second overlay, and no trace of the earlier openings",
   (!sp||(sp.getAttribute("data-opening")==="2026-11-20"&&!sp.querySelector('[class^="o-"],[class*=" o-"],.ia-ib,.ia-up,.if-globe,.if-kolam')))&&!/#splash \\.o-|o-failsafe/.test(css)&&!/aae\\.intro/.test(clock));''',
    'test: one opening')
rep('''T("Opening · the sequence lasts exactly 5000 ms on one clock",
   SPLASH_MS===5000&&I.ms===5000&&''',
    '''T("Opening · the sequence lasts exactly 7000 ms on one clock",
   SPLASH_MS===7000&&I.ms===7000&&''', 'test: duration')
rep('''T("Opening · the stages follow the storyboard: identity 0.3 s, supply and demand 1.1 s, the two pathways 2.1 s, one discipline 3.15 s, both names 3.95 s",
   at(".ia-logo")===300&&at(".ia-wm")===600&&at(".if-ax")===1100&&at(".if-eq")===1150&&at(".ia-ib")===2100&&at(".ia-up")===2200&&at(".ia-peak")===3150&&at(".ia-vb")===3950&&at(".if-grid")===0''',
    '''T("Opening · the stages follow the storyboard: grid 0 s, demand 0.45 s, supply 0.65 s, equilibrium 1.35 s, AD-AS 1.85 s, the network 3 s, monogram 3.95 s, name 4.35 s, positioning 4.8 s, the line 5.3 s",
   at(".if-grid")===0&&at(".if-wd")===450&&at(".if-ws")===650&&at(".if-eq")===1350&&at(".if-mac")===1850&&at(".if-ad")===1850&&at(".if-net")===3000
   &&at(".ia-logo")===3950&&at(".ia-wm")===4350&&at(".ia-pos")===4800&&at(".ia-tg")===5300''', 'test: storyboard')
rep('''T("Opening · every stage ends by 5000 ms and the reveal fills the last 700 ms",
   PL.length>=8&&PL.every(p=>p[2]<=5000&&p[1]<p[2])&&I.fadeAt===4300&&''',
    '''T("Opening · every stage ends by 7000 ms and the reveal fills the last 800 ms",
   PL.length>=8&&PL.every(p=>p[2]<=7000&&p[1]<p[2])&&I.fadeAt===6200&&''', 'test: reveal')
rep('''T("Opening · the stages read monogram, name, the two pathways, then one discipline, two pathways",
   (()=>{const m=/<div id="splash"[\\s\\S]*?<\\/button><\\/div>/.exec(html);if(!m)return true;const b=m[0].replace(/aria-label="[^"]*"/g,"");
     return b.indexOf('class="ia-mk"')<b.indexOf('class="ia-wm"')&&b.indexOf('class="ia-wm"')<b.indexOf('class="ia-tl"')
       &&b.indexOf('class="ia-tl"')<b.indexOf("IB DP Economics")&&b.indexOf("IB DP Economics")<b.indexOf("UPSC CSE Economics")
       &&b.indexOf("UPSC CSE Economics")<b.indexOf("One discipline.")&&b.indexOf("One discipline.")<b.indexOf("Two pathways.")})());''',
    '''T("Opening · the overlay reads demand, supply, AD-AS, the network, then the monogram, the name, Economics · Politics · Business and Think like an economist.",
   (()=>{const m=/<div id="splash"[\\s\\S]*?<\\/button><\\/div>/.exec(html);if(!m)return true;const b=m[0].replace(/aria-label="[^"]*"/g,"");
     const o=['class="if-w if-wd"','class="if-w if-ws"','class="if-grp if-mac"','class="if if-net"','class="ia-mk"','class="ia-wm"',">Economics<",">Politics<",">Business<","Think like an economist."].map(x=>b.indexOf(x));
     return o.every((x,k)=>x>=0&&(k===0||x>o[k-1]))&&!/One discipline\\.|class="ia-tl"/.test(b)})());''', 'test: order')
rep('''T("Opening · both pathways in their own colours: IB DP Economics in burgundy, UPSC CSE Economics in forest green",
   !sp||(/IB DP Economics/.test((sp.querySelector(".ia-ib")||{}).textContent||"")&&/UPSC CSE Economics/.test((sp.querySelector(".ia-up")||{}).textContent||"")
     &&!!sp.querySelector(".dr-l i")&&!!sp.querySelector(".dr-r i")&&!!sp.querySelector(".if-globe")&&!!sp.querySelector(".if-kolam")));''',
    '''T("Opening · the figures are economically exact: demand falls and supply rises to one equilibrium; AD shifts along SRAS and the equilibrium stays on both",
   (()=>{const f=k=>(PL.find(p=>p[0]===k)||[,,,[]])[3];const last=k=>{const a=f(k);return a.length?a[a.length-1][1].transform:""};
     const dx=parseFloat((/translateX\\(([-\\d.]+)%\\)/.exec(last(".if-ad"))||[])[1]),m=/translate\\(([-\\d.]+)%,([-\\d.]+)%\\)/.exec(last(".if-eq2"))||[];
     const ex=parseFloat(m[1]),ey=parseFloat(m[2]);
     /* in the 400-unit figure: SRAS y = 320 - 0.75(x - 90), AD y = 110 + (x - 90); a shift d moves the intersection by (d/1.75, -0.75 d/1.75) */
     const okMacro=Math.abs(ex-dx/1.75)<0.01&&Math.abs(ey+0.75*dx/1.75)<0.01&&dx>0;
     if(!sp)return okMacro;
     const d=sp.querySelector(".if-d path"),s=sp.querySelector(".if-s path"),sr=sp.querySelector(".if-mac .sr"),ad=sp.querySelector(".if-ad path"),lr=sp.querySelector(".if-mac .lr");
     return okMacro&&!!d&&d.getAttribute("d")==="M80 80L340 330"&&!!s&&s.getAttribute("d")==="M80 330L340 80"&&!!sr&&sr.getAttribute("d")==="M90 320L370 110"
      &&!!ad&&ad.getAttribute("d")==="M90 110L330 350"&&!!lr&&lr.getAttribute("d")==="M270 50V350"
      &&/Concepts/i.test(sp.textContent)&&/Evidence/i.test(sp.textContent)&&/Policy/i.test(sp.textContent)&&/Outcomes/i.test(sp.textContent)})());''', 'test: exact figures')
rep('''T("Opening · the overlay is a status named for both pathways, and every decorative layer is hidden from assistive technology",
   !sp||(sp.getAttribute("role")==="status"&&/IB DP Economics/.test(sp.getAttribute("aria-label")||"")&&/UPSC CSE Economics/.test(sp.getAttribute("aria-label")||"")''',
    '''T("Opening · the overlay is a status named for the identity and its line, and every decorative layer is hidden from assistive technology",
   !sp||(sp.getAttribute("role")==="status"&&sp.getAttribute("aria-label")==="Arjun Agrawal. Economics, Politics, Business. Think like an economist."''', 'test: status')

# ═══ 3 · the platform side, the quality report and the feature list ════════
rep('const SPLASH_MS=5000;', 'const SPLASH_MS=7000;', 'SPLASH_MS')
rep('/* THE OPENING · the platform\'s side of the five-second clock.', '/* THE OPENING · the platform\'s side of the seven-second clock.', 'platform comment')
rep('["A five-second opening sequence, skipped under a reduced-motion preference","home",0]',
    '["A seven-second opening sequence, shortened under a reduced-motion preference","home",0]', 'feature line')
rep('SPLASH_REDUCED?"shortened: reduced motion is preferred":"five stages, one per second")',
    'SPLASH_REDUCED?"shortened: reduced motion is preferred":"seven seconds on one clock")', 'quality figure')
rep('''what:"That the sequence runs for exactly five seconds on one clock and plays in full on every full page load, whatever the address, and never during navigation inside the app, that it reads storage for nothing, that its stages follow the storyboard (the identity, supply and demand, IB DP Economics and UPSC CSE Economics, then One discipline. Two pathways.) and animate opacity and transform only''',
    '''what:"That the sequence runs for exactly seven seconds on one clock and plays in full on every full page load, whatever the address, and never during navigation inside the app, that it reads storage for nothing, that its stages follow the storyboard (demand and supply drawing themselves, the macroeconomy, a network of concepts, evidence, policy and outcomes, the monogram and the name, Economics · Politics · Business, then Think like an economist.), that its figures are economically exact, and that it animates opacity and transform only''',
    'quality description')
rep('/* the opening overlay is fixed, clips its own field and leaves after five seconds */',
    '/* the opening overlay is fixed, clips its own field and leaves after seven seconds */', 'overflow comment')

P.write_text(s, encoding='utf-8')
print(f'applied {len(done)} steps' if done else 'already applied')
for d in done:
    print(' -', d)
