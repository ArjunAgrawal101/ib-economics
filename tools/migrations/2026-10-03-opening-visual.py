"""The opening, elevated visually: same five seconds, same clock, same stages.

The background now tells a short economic story in layers, each animated
only with opacity and transform (so the compositor keeps time):
  0.1-0.9 s  axes rule themselves in from their origins (emergence)
  0.9-1.9 s  a data series appears beneath the monogram (data and graphs)
  1.3-3.4 s  market supply and demand and a frontier (micro), brightened
             2.2-3.5 s as before, then giving way to
  3.0-4.7 s  a growth path with its business cycle (macro) and
  3.4-4.7 s  a faint network of trade between economies (global),
before the identity resolves and the page appears at 5.0 s. The required
stages (monogram 0.7 s, name 1.4 s, IB DP Economics 2.2 s, tagline 3.1 s,
verbs 4.0 s) and the exit are untouched. Reduced motion shows one still
frame of the axes, the market and the data, without the macro and network
layers."""
import pathlib, math
p = pathlib.Path(__file__).resolve().parents[2] / "index.html"
s = p.read_text(encoding="utf-8")
if 'class="if if-net"' in s:
    print("already applied"); raise SystemExit(0)
i = s.index('<svg class="if if-lines"'); j = s.index('<svg class="if if-focus"')
dots = ''.join(f'<circle cx="{x}" cy="{y}" r="3.5"/>' for x, y in [(880,930),(960,900),(1040,915),(1120,870),(1200,880),(1280,835),(1360,850),(1440,800),(1520,815)])
SV = '<svg class="if {c}" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">{b}</svg>'
axes = SV.format(c='if-ax', b='<path class="ax1" d="M170 170V800H790"/><path class="ax2" d="M1010 190V660H1460"/>')
micro = SV.format(c='if-lines', b='<path d="M230 240L750 730M230 730L750 240"/><path d="M1010 250C1250 250 1400 420 1420 660"/><circle class="e" cx="490" cy="485" r="5"/>')
data = SV.format(c='if-data', b='<path d="M880 930L960 900 1040 915 1120 870 1200 880 1280 835 1360 850 1440 800 1520 815"/><g class="d">' + dots + '</g>')
# macro: a rising growth path with its cycle, and the trend it moves around
pts = []
for k in range(0, 35):
    x = 120 + k * 40; y = 900 - (x - 120) * 0.17 - 30 * math.sin((x - 120) / 105)
    pts.append(f'{x} {y:.0f}')
trend = f'M120 900L{120+34*40} {900-34*40*0.17:.0f}'
macro = SV.format(c='if-macro', b=f'<path class="tr" d="{trend}"/><path class="cy" d="M{" L".join(pts)}"/><g class="l"><text x="128" y="940">real GDP over time</text></g>')
# global: stylised economies joined by trade
N = {'na':(330,300),'sa':(430,560),'eu':(800,250),'af':(820,500),'me':(950,370),'in':(1060,430),'cn':(1180,320),'se':(1240,500),'jp':(1330,290),'au':(1340,650)}
E = [('na','eu'),('na','cn'),('na','sa'),('eu','af'),('eu','me'),('me','in'),('in','cn'),('cn','jp'),('cn','se'),('se','au'),('eu','cn'),('na','jp'),('af','in')]
arcs = ''.join(f'<path d="M{N[a][0]} {N[a][1]} Q{(N[a][0]+N[b][0])/2:.0f} {min(N[a][1],N[b][1])-90} {N[b][0]} {N[b][1]}"/>' for a, b in E)
nodes = ''.join(f'<circle cx="{x}" cy="{y}" r="4"/>' for x, y in N.values())
net = SV.format(c='if-net', b=f'<g class="a">{arcs}</g><g class="n">{nodes}</g>')
s = s[:i] + axes + micro + data + macro + net + s[j:]
# the plan: new layers, existing stages unchanged
old_plan = '''  [".if-grid",0,800,[[0,{opacity:0}],[800,{opacity:1}]]],
  [".if-lines",120,800,[[120,{opacity:0}],[800,{opacity:1}]]],'''
new_plan = '''  [".if-grid",0,800,[[0,{opacity:0}],[800,{opacity:1}]]],
  [".if-ax",100,3600,[[100,{opacity:0,transform:"scale(.0001)"}],[900,{opacity:1,transform:"scale(1)"}],[3000,{opacity:1,transform:"scale(1)"}],[3600,{opacity:.35,transform:"scale(1)"}]]],
  [".if-data",900,1900,[[900,{opacity:0,transform:"translateX(-36px)"}],[1500,{opacity:1,transform:"translateX(0)"}],[1900,{opacity:1,transform:"translateX(0)"}]]],
  [".if-lines",1300,3400,[[1300,{opacity:0}],[1800,{opacity:1}],[3000,{opacity:1}],[3400,{opacity:.25}]]],
  [".if-macro",3000,4700,[[3000,{opacity:0,transform:"translateY(18px)"}],[3600,{opacity:1,transform:"translateY(0)"}],[4700,{opacity:1,transform:"translateY(0)"}]]],
  [".if-net",3400,4700,[[3400,{opacity:0,transform:"scale(.97)"}],[4000,{opacity:1,transform:"scale(1)"}],[4700,{opacity:1,transform:"scale(1)"}]]],'''
assert old_plan in s
s = s.replace(old_plan, new_plan, 1)
old_css = '#splash .if-grid path{stroke:rgba(244,239,228,.05);stroke-width:1}'
new_css = old_css + '''
#splash .if-ax{transform-box:view-box;transform-origin:10.6% 80%}
#splash .if-ax path{stroke:rgba(244,239,228,.2)}
#splash .if-data path{stroke:rgba(201,168,102,.34)}#splash .if-data .d circle{fill:rgba(201,168,102,.5)}
#splash .if-macro path.cy{stroke:rgba(244,239,228,.22);stroke-width:1.4}#splash .if-macro path.tr{stroke:rgba(201,168,102,.3);stroke-dasharray:5 8}
#splash .if-macro .l text{fill:rgba(244,239,228,.36);font-family:var(--mono);font-size:18px;letter-spacing:.08em}
#splash .if-net{transform-box:view-box;transform-origin:50% 45%}
#splash .if-net .a path{stroke:rgba(201,168,102,.15);stroke-width:1}#splash .if-net .n circle{fill:rgba(244,239,228,.24)}'''
assert old_css in s
s = s.replace(old_css, new_css, 1)
old_still = '#splash.still .sc,#splash.still .ia-wm,#splash.still .ia-tl,#splash.still .ia-vb,#splash.still .if-grid,#splash.still .if-lines{opacity:1}'
new_still = '#splash.still .sc,#splash.still .ia-wm,#splash.still .ia-tl,#splash.still .ia-vb,#splash.still .if-grid,#splash.still .if-lines,#splash.still .if-ax,#splash.still .if-data{opacity:1}\n#splash.still .if-macro,#splash.still .if-net{display:none}'
assert old_still in s
s = s.replace(old_still, new_still, 1)
p.write_text(s, encoding="utf-8"); print("applied")
