"""THE OPENING, second edition: one Economics ecosystem, two pathways, five seconds.

Storyboard (ms from the first presented frame, one clock, opacity and transform only):
  0-1000     a dark field of coordinates, data points and the lines between them;
             the Arjun Agrawal identity (the supplied brand vectors) emerges
  1000-2000  the identity settles to the top; axes, supply and demand appear, demand
             shifts and the equilibrium moves along supply; a trade network behind
  2000-3200  the field divides: IB DP Economics (international, global evidence) on
             one side, UPSC CSE Economics (the Indian economy, policy, institutions)
             on the other, each with its own colour and motif
  3200-4300  the two converge: "One discipline. Two pathways." (3700-3950 is still)
  4300-5000  the two halves of the field open onto the page underneath; the overlay
             is transparent at exactly 5000 ms and removed on the next frame

It plays on every full-page load of any address (first visit, reload, bookmark,
shared link, Back/Forward from another site), and never on navigation inside the
app. No storage is read or written. Reduced motion shows one still frame for 1.5 s.
If the platform behind is not ready, the last frame holds instead of uncovering an
unfinished page. Idempotent: each step checks for its own result first."""
import pathlib, re
p = pathlib.Path(__file__).resolve().parents[2] / "index.html"
s = p.read_text(encoding="utf-8")
MARK = 'class="dr dr-l"'
done = 0

# ── 1. the markup ────────────────────────────────────────────────────────
if MARK not in s:
    a = s.index('<div id="splash" role="status"')
    endtag = '<button id="splashskip" class="spskip" type="button">Skip intro</button></div>'
    b = s.index(endtag, a) + len(endtag)
    old = s[a:b]
    logo = re.search(r'<div class="sc ia-logo" aria-hidden="true">.*?</svg></div>', old, re.S).group(0)
    V = 'viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"'
    F = 'viewBox="0 0 1600 1000" aria-hidden="true" focusable="false"'
    # data field: scattered observations with coordinate labels
    import random
    rnd = random.Random(7)
    pts = []
    for i in range(46):
        x = rnd.randint(60, 1540); y = rnd.randint(70, 940)
        if 560 < x < 1040 and 300 < y < 700:   # keep the centre clear for the type
            continue
        pts.append((x, y))
    dots = "".join(f'<circle cx="{x}" cy="{y}" r="{2.6 if i % 5 else 4}"/>' for i, (x, y) in enumerate(pts))
    labs = "".join(f'<text x="{x+10}" y="{y-8}">({x/100:.1f}, {(1000-y)/100:.1f})</text>' for i, (x, y) in enumerate(pts) if i % 9 == 2)
    trend = [(80, 860), (260, 812), (430, 830), (610, 760), (800, 742), (980, 690), (1150, 704), (1330, 640), (1520, 612)]
    poly = "M" + " L".join(f"{x} {y}" for x, y in trend)
    tdots = "".join(f'<circle cx="{x}" cy="{y}" r="3.4"/>' for x, y in trend)
    links = "M150 200 L330 150 L520 236 M1080 170 L1260 236 L1450 160 M1180 880 L1340 820 L1500 870 M120 520 L240 610"
    # the figure: axes, supply, demand, the shift and the moving equilibrium (user units; 1:1)
    fig = (f'<div class="if-fig" aria-hidden="true">'
           f'<svg class="if-f if-ax" {F}><path d="M560 230V780H1100"/><g class="l"><text x="532" y="246">P</text><text x="1086" y="822">Q</text></g></svg>'
           f'<svg class="if-f if-sd" {F}><path class="s" d="M620 740L1020 340"/><path class="d" d="M620 340L1020 740"/>'
           f'<path class="g" d="M820 540H560M820 540V780"/><circle class="e0" cx="820" cy="540" r="6"/>'
           f'<g class="l"><text x="1030" y="336">S</text><text x="990" y="776">D₁</text><text x="836" y="530">E₁</text></g></svg>'
           f'<svg class="if-f if-d2" {F}><path d="M620 340L1020 740"/><g class="l"><text x="966" y="776">D₂</text></g></svg>'
           f'<svg class="if-f if-eq" {F}><circle class="r" cx="820" cy="540" r="16"/><circle class="e" cx="820" cy="540" r="7"/>'
           f'<g class="l"><text x="840" y="528">E₂</text></g></svg></div>')
    net = ('<g class="a"><path d="M120 300 Q300 150 470 260"/><path d="M470 260 Q560 120 700 150"/><path d="M120 300 Q190 470 300 640"/>'
           '<path d="M1130 140 Q1300 90 1460 230"/><path d="M1460 230 Q1540 420 1420 640"/><path d="M1130 140 Q1220 300 1300 430"/>'
           '<path d="M300 640 Q560 980 900 900"/><path d="M900 900 Q1200 990 1420 640"/><path d="M700 150 Q920 40 1130 140"/></g>'
           '<g class="n"><circle cx="120" cy="300" r="4"/><circle cx="470" cy="260" r="4"/><circle cx="700" cy="150" r="4"/><circle cx="300" cy="640" r="4"/>'
           '<circle cx="1130" cy="140" r="4"/><circle cx="1460" cy="230" r="4"/><circle cx="1300" cy="430" r="4"/><circle cx="1420" cy="640" r="4"/><circle cx="900" cy="900" r="4"/></g>')
    # IB motif: a globe of meridians and parallels; UPSC motif: a kolam, the dot grid (pulli) and its loop
    globe = ('<svg class="if-m if-globe" viewBox="0 0 400 400" aria-hidden="true" focusable="false"><circle cx="200" cy="200" r="176"/>'
             '<ellipse cx="200" cy="200" rx="64" ry="176"/><ellipse cx="200" cy="200" rx="126" ry="176"/><path d="M200 24V376"/>'
             '<path d="M24 200H376M48 112H352M48 288H352"/><path class="t" d="M84 150 Q200 70 316 168"/><circle class="n" cx="84" cy="150" r="4"/><circle class="n" cx="316" cy="168" r="4"/></svg>')
    kd = []
    for i in range(-3, 4):
        for j in range(-3, 4):
            if abs(i) + abs(j) <= 3:
                kd.append(f'<circle cx="{200+i*42}" cy="{200+j*42}" r="3.2"/>')
    kolam = ('<svg class="if-m if-kolam" viewBox="0 0 400 400" aria-hidden="true" focusable="false"><g class="d">' + "".join(kd) + '</g>'
             '<path d="M200 46 Q263 137 354 200 Q263 263 200 354 Q137 263 46 200 Q137 137 200 46Z"/>'
             '<path d="M200 116 Q221 179 284 200 Q221 221 200 284 Q179 221 116 200 Q179 179 200 116Z"/>'
             '<circle cx="200" cy="200" r="22"/></svg>')
    conv = (f'<svg class="if if-conv" {V}><path d="M-40 360 C 300 380, 560 640, 800 820"/><path d="M1640 360 C 1300 380, 1040 640, 800 820"/>'
            '<circle class="e" cx="800" cy="820" r="6"/><circle class="r" cx="800" cy="820" r="18"/></svg>')
    new = ('<div id="splash" role="status" aria-label="Arjun Agrawal | Economics. One discipline, two pathways: IB DP Economics and UPSC CSE Economics.">\n'
           ' <!-- THE OPENING · the name is carried by the brand vectors, never set again in type -->\n'
           ' <div class="dr dr-l" aria-hidden="true"><i></i></div><div class="dr dr-r" aria-hidden="true"><i></i></div>\n'
           ' <div class="ifs" aria-hidden="true">'
           '<svg class="if if-grid" ' + V + '><defs><pattern id="ifg" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40"/></pattern></defs><rect width="1600" height="1000" fill="url(#ifg)"/></svg>'
           f'<svg class="if if-data" {V}><g class="d">{dots}</g><g class="l">{labs}</g></svg>'
           f'<svg class="if if-lines" {V}><path d="{poly}"/><path class="k" d="{links}"/><g class="d">{tdots}</g></svg>'
           f'<svg class="if if-net" {V}>{net}</svg>'
           + fig + globe + kolam + '<div class="if-seam"></div>' + conv + '</div>\n'
           ' <div class="stage">\n'
           '  ' + logo + '\n'
           '  <div class="ia-path"><div class="sc ia-ib"><b>IB DP Economics</b><span>Global perspectives · International evidence</span></div>'
           '<div class="sc ia-up"><b>UPSC CSE Economics</b><span>The Indian economy · Policy · Institutions</span></div></div>\n'
           '  <div class="sc ia-peak"><div class="ia-tg">One discipline.<em>Two pathways.</em></div>'
           '<div class="ia-vb"><span class="v-ib">IB DP Economics</span><i aria-hidden="true"></i><span class="v-up">UPSC CSE Economics</span></div></div>\n'
           ' </div>\n'
           ' <div class="ia-bar" aria-hidden="true"><i></i></div>\n'
           ' ' + endtag)
    s = s[:a] + new + s[b:]
    done += 1

# ── 2. the timeline, the state model and the reveal ─────────────────────
PLAN_NEW = '''I.PLAN=[
  [".if-grid",0,700,[[0,{opacity:0}],[700,{opacity:1}]]],
  [".if-data",100,2400,[[100,{opacity:0,transform:"translateY(14px)"}],[800,{opacity:1,transform:"translateY(0)"}],[2000,{opacity:1,transform:"translateY(0)"}],[2400,{opacity:.35,transform:"translateY(0)"}]]],
  [".if-lines",350,2400,[[350,{opacity:0}],[1000,{opacity:1}],[2000,{opacity:1}],[2400,{opacity:.3}]]],
  [".ia-logo",300,1500,[[300,{opacity:0,transform:"translateY(0) scale(.96)"}],[800,{opacity:1,transform:"translateY(0) scale(1)"}],
    [1150,{opacity:1,transform:"translateY(0) scale(1)"}],[1500,{opacity:1,transform:"translateY(-33vh) scale(.5)"}]]],
  [".ia-wm",600,900,[[600,{opacity:0}],[900,{opacity:1}]]],
  [".ia-tl",750,1050,[[750,{opacity:0}],[1050,{opacity:1}]]],
  [".if-ax",1100,2250,[[1100,{opacity:0,transform:"scale(.96)"}],[1400,{opacity:1,transform:"scale(1)"}],[1950,{opacity:1,transform:"scale(1)"}],[2250,{opacity:0,transform:"scale(1)"}]]],
  [".if-sd",1150,2250,[[1150,{opacity:0}],[1450,{opacity:1}],[1950,{opacity:1}],[2250,{opacity:0}]]],
  [".if-d2",1450,2250,[[1450,{opacity:0,transform:"translateX(0)"}],[1520,{opacity:1,transform:"translateX(0)"}],[1900,{opacity:1,transform:"translateX(18.75%)"}],
    [1950,{opacity:1,transform:"translateX(18.75%)"}],[2250,{opacity:0,transform:"translateX(18.75%)"}]]],
  [".if-eq",1150,2250,[[1150,{opacity:0,transform:"translate(0,0)"}],[1450,{opacity:1,transform:"translate(0,0)"}],[1520,{opacity:1,transform:"translate(0,0)"}],
    [1900,{opacity:1,transform:"translate(9.375%,-9.375%)"}],[1950,{opacity:1,transform:"translate(9.375%,-9.375%)"}],[2250,{opacity:0,transform:"translate(9.375%,-9.375%)"}]]],
  [".if-net",1200,2500,[[1200,{opacity:0,transform:"scale(.97)"}],[1700,{opacity:1,transform:"scale(1)"}],[2100,{opacity:1,transform:"scale(1)"}],[2500,{opacity:0,transform:"scale(1)"}]]],
  [".dr-l i",2000,2500,[[2000,{opacity:0}],[2500,{opacity:1}]]],
  [".dr-r i",2050,2550,[[2050,{opacity:0}],[2550,{opacity:1}]]],
  [".if-seam",2000,3300,[[2000,{opacity:0,transform:"scale(0)"}],[2400,{opacity:1,transform:"scale(1)"}],[3000,{opacity:1,transform:"scale(1)"}],[3300,{opacity:0,transform:"scale(.2)"}]]],
  [".if-globe",2100,3300,[[2100,{opacity:0,transform:"translateX(-20px)"}],[2600,{opacity:1,transform:"translateX(0)"}],[3000,{opacity:1,transform:"translateX(0)"}],[3300,{opacity:0,transform:"translateX(24px)"}]]],
  [".if-kolam",2150,3300,[[2150,{opacity:0,transform:"translateX(20px)"}],[2650,{opacity:1,transform:"translateX(0)"}],[3000,{opacity:1,transform:"translateX(0)"}],[3300,{opacity:0,transform:"translateX(-24px)"}]]],
  [".ia-ib",2100,3250,[[2100,{opacity:0,transform:"translateX(-28px)"}],[2450,{opacity:1,transform:"translateX(0)"}],[3000,{opacity:1,transform:"translateX(0)"}],[3250,{opacity:0,transform:"translateX(40px) scale(.96)"}]]],
  [".ia-up",2200,3250,[[2200,{opacity:0,transform:"translateX(28px)"}],[2550,{opacity:1,transform:"translateX(0)"}],[3000,{opacity:1,transform:"translateX(0)"}],[3250,{opacity:0,transform:"translateX(-40px) scale(.96)"}]]],
  [".if-conv",3000,3600,[[3000,{opacity:0}],[3500,{opacity:1}],[3600,{opacity:1}]]],
  [".ia-peak",3150,3600,[[3150,{opacity:0,transform:"translateY(14px) scale(.985)"}],[3600,{opacity:1,transform:"translateY(0) scale(1)"}]]],
  [".ia-vb",3950,4250,[[3950,{opacity:0,transform:"translateY(8px)"}],[4250,{opacity:1,transform:"translateY(0)"}]]],
  [".ia-bar i",0,5000,[[0,{transform:"scaleX(0)"}],[5000,{transform:"scaleX(1)"}]],"linear"]];'''
if '[".if-conv",3000,3600' not in s:
    a = s.index(' I.PLAN=[\n  [".if-grid",0,800')
    b = s.index('"linear"]];', a) + len('"linear"]];')
    s = s[:a] + ' ' + PLAN_NEW + s[b:]
    done += 1
steps = [
    ('var I=window.__INTRO={ms:5000,fadeAt:4700,', 'var I=window.__INTRO={ms:5000,fadeAt:4300,'),
    # every full-page load plays, whatever the address; reduced motion still shows the still frame
    (' if(I.route!=="home")I.mode="cover";\n else if(reduced||typeof sp.animate!=="function")I.mode="still";',
     ' if(reduced||typeof sp.animate!=="function")I.mode="still";   /* every full-page load plays, whatever the address */'),
    # the reveal: the two halves open while the type and the field leave; the overlay is transparent at start + 5000
    ('''  if(at>I.start+I.fadeAt+1)I.late=true;
  if(left<120){left=300;I.exitAt=at+left;I.late=true}
  try{I.fade=sp.animate([{opacity:1},{opacity:0}],{duration:left,fill:"forwards",easing:"cubic-bezier(.4,0,.2,1)"});I.fade.startTime=at;I.fadeEnd=at+left}catch(e){}
 }''',
     '''  if(at>I.start+I.fadeAt+1)I.short=true;                 /* begun late: the reveal is quicker, and still ends at start + 5000 */
  if(left<120){left=300;I.exitAt=at+left;I.late=true}
  try{I.fade=sp.animate([{opacity:1},{opacity:1,offset:.55},{opacity:0}],{duration:left,fill:"forwards",easing:"linear"});I.fade.startTime=at;I.fadeEnd=at+left}catch(e){}
  reveal(at,left);
 }
 function reveal(at,left){
  var tall=sp.clientWidth<=640,ez="cubic-bezier(.65,0,.35,1)",R=[
   [".dr-l",[{transform:"translate(0,0)"},{transform:tall?"translate(0,-101%)":"translate(-101%,0)"}],1],
   [".dr-r",[{transform:"translate(0,0)"},{transform:tall?"translate(0,101%)":"translate(101%,0)"}],1],
   [".stage",[{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(1.03)"}],.42],
   [".ifs",[{opacity:1},{opacity:0}],.36],[".ia-bar",[{opacity:1},{opacity:0}],.3]];
  I.rev=[];
  for(var k=0;k<R.length;k++){var el=sp.querySelector(R[k][0]);if(!el)continue;
   try{var a=el.animate(R[k][1],{duration:left*R[k][2],fill:"forwards",easing:ez});a.startTime=at;I.rev.push(a)}catch(e){}}
 }'''),
    ('''  if(I.fade)try{I.fade.cancel()}catch(e){}
  sp.classList.add("out");''', '''  if(I.fade)try{I.fade.cancel()}catch(e){}
  if(I.rev)for(var k=0;k<I.rev.length;k++)try{I.rev[k].pause()}catch(e){}
  sp.classList.add("out");'''),
    # the record's own description
    ('''   says so. THE STATE MODEL: loading the home page plays the full sequence
   every time (first visit, revisit, reload, bookmark, direct URL, a full-page
   Back/Forward), whatever is cached, because nothing here waits on the network.
   A deep link to another page shows the identity still only until the platform
   is ready. Navigation inside the app never shows it, and a page restored from
   the back-forward cache is shown as it was left.''',
     '''   says so. THE STATE MODEL: every full-page load plays the full sequence
   (first visit, revisit, reload, bookmark, a shared link to any page, a
   full-page Back/Forward), whatever is cached, because nothing here waits on the
   network or reads storage. Navigation inside the app never shows it, and a
   page restored from the back-forward cache is shown as it was left.'''),
    # self-tests in the base page follow the new storyboard
    ('PL.length>=8&&PL.every(p=>p[2]<=5000&&p[1]<p[2])&&I.fadeAt===4700&&',
     'PL.length>=8&&PL.every(p=>p[2]<=5000&&p[1]<p[2])&&I.fadeAt===4300&&/function reveal\\(at,left\\)/.test(clock)&&'),
    (''' T("Opening · every stage ends by 5000 ms and the exit fade fills the last 300 ms",''',
     ''' T("Opening · every stage ends by 5000 ms and the reveal fills the last 700 ms",'''),
    (''' T("Opening · the stages read monogram, name, IB DP Economics, the tagline, then the verbs",
   (()=>{const m=/<div id="splash"[\\s\\S]*?<\\/button><\\/div>/.exec(html);if(!m)return true;const b=m[0];
     return b.indexOf('class="ia-mk"')<b.indexOf('class="ia-wm"')&&b.indexOf('class="ia-wm"')<b.indexOf('class="ia-tl"')
       &&b.indexOf("IB DP Economics")<b.indexOf("Think like an economist.")&&b.indexOf("Think like an economist.")<b.indexOf("Learn. Think. Calculate.")})());''',
     ''' T("Opening · the stages read monogram, name, the two pathways, then one discipline, two pathways",
   (()=>{const m=/<div id="splash"[\\s\\S]*?<\\/button><\\/div>/.exec(html);if(!m)return true;const b=m[0];
     return b.indexOf('class="ia-mk"')<b.indexOf('class="ia-wm"')&&b.indexOf('class="ia-wm"')<b.indexOf('class="ia-tl"')
       &&b.indexOf('class="ia-tl"')<b.indexOf("IB DP Economics")&&b.indexOf("IB DP Economics")<b.indexOf("UPSC CSE Economics")
       &&b.indexOf("UPSC CSE Economics")<b.indexOf("One discipline.")&&b.indexOf("One discipline.")<b.indexOf("Two pathways.")})());'''),
    (''' T("Opening · the home page plays the full sequence on every kind of load; only a deep link to another page skips it",
   /I\\.route=/.test(clock)&&/if\\(I\\.route!=="home"\\)I\\.mode="cover"/.test(clock)&&!/type==="reload"/.test(clock)&&!/again\\|\\|/.test(clock));''',
     ''' T("Opening · every full-page load plays the full sequence, whatever the address; storage is never read",
   /I\\.route=/.test(clock)&&!/I\\.mode="cover"/.test(clock)&&!/type==="reload"/.test(clock)&&!/again\\|\\|/.test(clock)&&!/Storage/.test(clock));'''),
]
for old, new in steps:
    if new in s:
        continue
    if s.count(old) != 1:
        raise SystemExit(f"anchor found {s.count(old)} times: " + old[:120])
    s = s.replace(old, new, 1); done += 1

# ── 3. the stylesheet ───────────────────────────────────────────────────
CSS_NEW = """/* ── THE OPENING · five seconds: one Economics ecosystem, two pathways ───
   One clock drives every stage (see the script beside the overlay). The
   stages share one centred cell and cross-fade, so nothing moves the layout;
   every stage animates opacity and transform only, which run on the
   compositor. Timeline, in ms from the first presented frame: the field of
   coordinates, data and lines 0-1000 with the identity emerging 300-1150; the
   identity settles to the top 1150-1500 while supply and demand appear and
   demand shifts, moving the equilibrium along supply (1520-1900), a trade
   network behind; the field divides into IB DP Economics and UPSC CSE
   Economics 2000-3250; "One discipline. Two pathways." 3150-3600, still
   3700-3950, the two names 3950-4250; the halves open onto the page 4300-5000.
   The overlay is fixed, locks nothing, writes nothing, and is removed at 5000.
   Reduced motion shows one still frame and leaves after 1.5 s. */
#splash{position:fixed;inset:0;z-index:999;background:transparent;color:#fff;overflow:hidden;contain:layout paint;
 display:grid;place-items:center;padding:24px;transition:opacity .16s linear}
#splash.out{opacity:0;pointer-events:none}
#splash .dr{position:absolute;top:0;bottom:0;width:50.5%;background:var(--obs);overflow:hidden}
#splash .dr-l{left:0}#splash .dr-r{right:0}
#splash .dr i{position:absolute;inset:0;opacity:0}
#splash .dr-l i{background:radial-gradient(110% 80% at 72% 50%,#33141D 0%,#22141A 58%,#16181C 100%)}
#splash .dr-r i{background:radial-gradient(110% 80% at 28% 50%,#0F2C20 0%,#12201A 58%,#16181C 100%)}
#splash .ifs{position:absolute;inset:0;pointer-events:none;overflow:hidden}
#splash .if{position:absolute;inset:0;width:100%;height:100%;opacity:0}
#splash .if path{fill:none;stroke:rgba(244,239,228,.1);stroke-width:1.2;vector-effect:non-scaling-stroke}
#splash .if-grid path{stroke:rgba(244,239,228,.05);stroke-width:1}
#splash .if-data .d circle{fill:rgba(244,239,228,.32)}
#splash .if-data .l text{fill:rgba(244,239,228,.3);font-family:var(--mono);font-size:15px;letter-spacing:.04em}
#splash .if-lines path{stroke:rgba(201,168,102,.42);stroke-width:1.3}
#splash .if-lines path.k{stroke:rgba(244,239,228,.14);stroke-dasharray:4 7}
#splash .if-lines .d circle{fill:rgba(201,168,102,.75)}
#splash .if-net{transform-origin:50% 50%}
#splash .if-net .a path{stroke:rgba(201,168,102,.2);stroke-width:1}
#splash .if-net .n circle{fill:rgba(244,239,228,.32)}
#splash .if-fig{position:absolute;left:50%;top:54%;width:min(520px,84vw,56vh);aspect-ratio:1;transform:translate(-50%,-50%);overflow:hidden}
#splash .if-f{position:absolute;inset:0;width:100%;height:100%;opacity:0;overflow:visible}
#splash .if-f path{fill:none;stroke-width:2.4;vector-effect:non-scaling-stroke}
#splash .if-ax path{stroke:rgba(244,239,228,.5);stroke-width:1.6}
#splash .if-sd path.s{stroke:#C9A866}
#splash .if-sd path.d{stroke:rgba(244,239,228,.45);stroke-dasharray:7 7}
#splash .if-sd path.g{stroke:rgba(244,239,228,.22);stroke-dasharray:4 6;stroke-width:1.2}
#splash .if-sd .e0{fill:rgba(244,239,228,.5)}
#splash .if-d2 path{stroke:#F4EFE4}
#splash .if-eq .e{fill:#C9A866}#splash .if-eq .r{fill:none;stroke:rgba(201,168,102,.55);stroke-width:1.5}
#splash .if-f .l text{fill:rgba(244,239,228,.66);font-family:var(--mono);font-size:22px}
#splash .if-m{position:absolute;--g:min(46vmin,420px);width:var(--g);height:var(--g);top:calc(50% - var(--g)/2);opacity:0;overflow:visible}
#splash .if-globe{left:calc(50% - min(880px,100vw - 48px)/4 - var(--g)/2)}
#splash .if-kolam{left:calc(50% + min(880px,100vw - 48px)/4 - var(--g)/2)}
#splash .if-m path,#splash .if-m circle,#splash .if-m ellipse{fill:none;stroke-width:1.3;vector-effect:non-scaling-stroke}
#splash .if-globe *{stroke:rgba(214,140,156,.32)}
#splash .if-globe .t{stroke:rgba(201,168,102,.6);stroke-dasharray:5 6}
#splash .if-globe .n{fill:#C9A866;stroke:none}
#splash .if-kolam *{stroke:rgba(126,190,150,.34)}
#splash .if-kolam .d circle{fill:rgba(201,168,102,.62);stroke:none}
#splash .if-seam{position:absolute;left:50%;top:16%;bottom:16%;width:1px;margin-left:-.5px;opacity:0;
 background:linear-gradient(transparent,rgba(201,168,102,.75) 30%,rgba(201,168,102,.75) 70%,transparent)}
#splash .if-conv path{stroke:rgba(201,168,102,.46);stroke-width:1.4}
#splash .if-conv .e{fill:#C9A866}#splash .if-conv .r{fill:none;stroke:rgba(201,168,102,.4);stroke-width:1.2}
#splash .stage{position:relative;display:grid;place-items:center;width:100%;max-width:880px;text-align:center;overflow-x:clip}
#splash .stage>*{grid-area:1/1}
#splash .sc{opacity:0}
#splash .ia-logo{position:relative;width:min(360px,68vw);aspect-ratio:760/462}
#splash .ia-logo svg{position:absolute;inset:0;width:100%;height:100%;display:block}
#splash .ia-wm,#splash .ia-tl{opacity:0}
#splash .ia-path{display:grid;grid-template-columns:1fr 1fr;width:100%;align-items:start}
#splash .ia-ib,#splash .ia-up{display:flex;flex-direction:column;align-items:center;gap:12px;padding:0 clamp(12px,3vw,36px)}
#splash .ia-ib::before,#splash .ia-up::before{content:"";width:44px;height:2px;margin-bottom:4px}
#splash .ia-ib::before{background:#C8697B}#splash .ia-up::before{background:#5FA37F}
#splash .ia-path b{font-family:var(--ui);font-weight:700;font-size:clamp(15px,2vw,22px);letter-spacing:.2em;text-transform:uppercase;color:#F4EFE4;white-space:nowrap}
#splash .ia-path span{font-family:var(--ui);font-weight:500;font-size:clamp(13px,1.5vw,16px);line-height:1.45;color:rgba(244,239,228,.74);max-width:26ch;text-wrap:balance}
#splash .ia-peak{display:flex;flex-direction:column;align-items:center}
#splash .ia-tg{font-family:var(--dsp);font-weight:400;font-size:clamp(36px,7vw,80px);line-height:1.04;letter-spacing:-.02em;color:#fff;text-wrap:balance}
#splash .ia-tg em{display:block;font-style:italic;color:#D9BE7C}
#splash .ia-vb{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:10px 14px;margin-top:clamp(18px,3vw,28px);
 font-family:var(--ui);font-weight:700;font-size:clamp(12px,1.6vw,15px);letter-spacing:.2em;text-transform:uppercase;opacity:0}
#splash .ia-vb .v-ib{color:#E7B4BD}#splash .ia-vb .v-up{color:#9FD0B3}
#splash .ia-vb i{flex:none;width:6px;height:6px;border-radius:50%;background:#C9A866}
#splash .ia-bar{position:absolute;left:50%;bottom:max(30px,env(safe-area-inset-bottom));width:min(180px,40vw);height:2px;
 transform:translateX(-50%);background:rgba(255,255,255,.14);overflow:hidden}
#splash .ia-bar i{display:block;height:100%;background:#C9A866;transform:scaleX(0);transform-origin:left center}
.spskip{position:absolute;right:max(18px,env(safe-area-inset-right));bottom:max(18px,env(safe-area-inset-bottom));
  padding:10px 18px;border:1px solid rgba(255,255,255,.34);border-radius:2px;background:rgba(22,24,28,.5);color:rgba(255,255,255,.86);
  font-family:var(--ui);font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;
  opacity:0;animation:spst .4s var(--ez) .3s forwards;transition:border-color .2s,color .2s}
.spskip:hover,.spskip:focus-visible{border-color:rgba(255,255,255,.8);color:#fff;outline:2px solid #C9A866;outline-offset:2px}
@keyframes spst{from{opacity:0;transform:translateY(9px)}to{opacity:1;transform:none}}
@media (max-width:640px){
 #splash .dr{top:auto;bottom:auto;left:0;right:0;width:auto;height:50.5%}
 #splash .dr-l{top:0}#splash .dr-r{bottom:0}
 #splash .dr-l i{background:radial-gradient(90% 110% at 50% 74%,#33141D 0%,#22141A 58%,#16181C 100%)}
 #splash .dr-r i{background:radial-gradient(90% 110% at 50% 26%,#0F2C20 0%,#12201A 58%,#16181C 100%)}
 #splash .ia-path{grid-template-columns:1fr;gap:clamp(48px,10vh,80px)}
 #splash .if-m{--g:min(40vmin,170px)}
 #splash .ia-vb{flex-direction:column;gap:8px}#splash .ia-vb i{display:none}
 #splash .if-globe{left:calc(50% - var(--g)/2);top:calc(50% - 84px - var(--g)/2)}
 #splash .if-kolam{left:calc(50% - var(--g)/2);top:calc(50% + 84px - var(--g)/2)}
 #splash .if-seam{left:14%;right:14%;top:50%;bottom:auto;width:auto;height:1px;margin:0;
  background:linear-gradient(90deg,transparent,rgba(201,168,102,.75) 30%,rgba(201,168,102,.75) 70%,transparent)}}
/* still: reduced motion shows one frame, the identity, the line and both pathways */
#splash.still .stage{display:flex;flex-direction:column;gap:clamp(18px,3vw,30px)}
#splash.still .sc,#splash.still .ia-wm,#splash.still .ia-tl,#splash.still .if-grid,#splash.still .dr i{opacity:1}
#splash.still .if-data,#splash.still .if-lines{opacity:.5}
#splash.still .if-net,#splash.still .if-fig,#splash.still .if-m,#splash.still .if-conv,#splash.still .if-seam,#splash.still .ia-vb,#splash.still .ia-bar{display:none}
#splash.still .ia-logo{width:min(230px,52vw)}
#splash.still .ia-peak{order:1}#splash.still .ia-path{order:2;gap:28px}
#splash.still .ia-tg{font-size:clamp(28px,5vw,52px)}
@media (max-height:520px){#splash .ia-logo{width:min(220px,38vw)}#splash .ia-tg{font-size:clamp(26px,7vh,44px)}#splash .if-fig{width:min(520px,84vw,50vh)}
 #splash.still .ia-logo{width:min(140px,28vw)}#splash.still .ia-tg{font-size:clamp(22px,5vh,34px)}#splash .ia-bar{display:none}}
@media (prefers-reduced-motion:reduce){.spskip{animation:none;opacity:1}}"""
if "#splash .dr{position:absolute" not in s:
    a = s.index("/* ── THE OPENING · exactly five seconds")
    tail = "@media (prefers-reduced-motion:reduce){.spskip{animation:none;opacity:1}}"
    b = s.index(tail, a) + len(tail)
    s = s[:a] + CSS_NEW + s[b:]
    done += 1
# the figure's own frame: the axes, curves and labels, cropped so it reads at phone width
FIG_OLD = 'viewBox="0 0 1600 1000" aria-hidden="true" focusable="false"'
if s.count('class="if-f ') and FIG_OLD in s:
    s = s.replace('<svg class="if-f if-ax" ' + FIG_OLD, '<svg class="if-f if-ax" viewBox="500 200 640 640" aria-hidden="true" focusable="false"')
    for k in ("if-sd", "if-d2", "if-eq"):
        s = s.replace('<svg class="if-f ' + k + '" ' + FIG_OLD, '<svg class="if-f ' + k + '" viewBox="500 200 640 640" aria-hidden="true" focusable="false"')
    done += 1

# ── 4. the self-tests that read the timeline ────────────────────────────
steps2 = [
    (''' T("Opening · the stages follow the timeline: monogram 0.7 s, name 1.4 s, IB DP Economics 2.2 s, the tagline 3.1 s, the verbs 4.0 s",
   at(".ia-logo")===700&&at(".ia-wm")===1400&&at(".ia-ib")===2200&&at(".ia-peak")===3100&&at(".ia-vb")===4000&&at(".if-grid")===0,''',
     ''' T("Opening · the stages follow the storyboard: identity 0.3 s, supply and demand 1.1 s, the two pathways 2.1 s, one discipline 3.15 s, both names 3.95 s",
   at(".ia-logo")===300&&at(".ia-wm")===600&&at(".if-ax")===1100&&at(".if-eq")===1150&&at(".ia-ib")===2100&&at(".ia-up")===2200&&at(".ia-peak")===3150&&at(".ia-vb")===3950&&at(".if-grid")===0
   &&PL.every(p=>p[2]<=I.QUIET[0]||p[1]>=I.QUIET[1]||p[0]===".ia-bar i"),'''),
    ('''   (()=>{const m=/<div id="splash"[\\s\\S]*?<\\/button><\\/div>/.exec(html);if(!m)return true;const b=m[0];
     return b.indexOf('class="ia-mk"')<b.indexOf('class="ia-wm"')&&b.indexOf('class="ia-wm"')<b.indexOf('class="ia-tl"')
       &&b.indexOf('class="ia-tl"')<b.indexOf("IB DP Economics")''',
     '''   (()=>{const m=/<div id="splash"[\\s\\S]*?<\\/button><\\/div>/.exec(html);if(!m)return true;const b=m[0].replace(/aria-label="[^"]*"/g,"");
     return b.indexOf('class="ia-mk"')<b.indexOf('class="ia-wm"')&&b.indexOf('class="ia-wm"')<b.indexOf('class="ia-tl"')
       &&b.indexOf('class="ia-tl"')<b.indexOf("IB DP Economics")'''),
]
for old, new in steps2:
    if new in s:
        continue
    if s.count(old) != 1:
        raise SystemExit(f"anchor found {s.count(old)} times: " + old[:120])
    s = s.replace(old, new, 1); done += 1
p.write_text(s, encoding="utf-8")
print("applied", done, "steps")
