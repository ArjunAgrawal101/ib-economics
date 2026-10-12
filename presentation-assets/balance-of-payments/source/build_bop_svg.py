"""Balance of Payments deck: technical diagrams (v3 family: borderless, transparent, large type).

Convention (same as the Exchange Rates deck): vertical axis = price of the rupee in US$ (US$ per ₹),
so up = appreciation. Sign convention for BoP data: credit (+), debit (-); balance = credits - debits.
"""
import os, sys, math
sys.path.insert(0, "/home/claude/work/diagrams")
import econsvg as E
E.PANEL = "#FFFDFA"
from econsvg import Canvas, Plot, Line, intersect, INK, NAVY, GOLD, GOLD_TXT, APP, DEP, CB, GUIDE, MUTED, FONT

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "svg")
os.makedirs(OUT, exist_ok=True)


def bare_svg(self):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{self.w}" height="{self.h}" viewBox="0 0 {self.w} {self.h}">'
            f'<defs>{"".join(self.defs)}</defs>{"".join(self.els)}</svg>')


Canvas.svg = bare_svg
CURVE, AXIS, TICK, NOTE, BADGE = 40, 32, 36, 27, 30
W, H = 1100, 900
X0, Y0, X1, Y1 = 200, 790, 900, 150


def L(m, c, xmin=0.5, xmax=9.8, ymin=1.3, ymax=9.0):
    pts = []
    for x in (xmin, xmax):
        y = m * x + c
        if ymin - 1e-9 <= y <= ymax + 1e-9:
            pts.append((x, y))
    for y in (ymin, ymax):
        x = (y - c) / m
        if xmin - 1e-9 <= x <= xmax + 1e-9:
            pts.append((x, y))
    pts = sorted(set((round(a, 6), round(b, 6)) for a, b in pts))
    (x1, y1), (x2, y2) = pts[0], pts[-1]
    return Line(x1, y1, x2, y2)


def plot(cv):
    p = Plot(cv, X0, Y0, X1, Y1, ylab=("Price of the rupee", "(US$ per ₹)"), xlab=("Quantity of ₹",))
    p.axes(ylab_size=AXIS)
    return p


def save(name, cv):
    with open(os.path.join(OUT, name + ".svg"), "w") as f:
        f.write(cv.svg())
    print("saved", name)


def bracket(cv, p, xa, xb, y, label, color, above=True, size=NOTE, lab_xy=None, anchor="middle"):
    a, py = p.px(xa, y); b, _ = p.px(xb, y)
    yy = py + (-28 if above else 28)
    cv.line(a, yy, b, yy, color, 4.5, arrow_end=True, arrow_start=True)
    cv.line(a, py - 11, a, py + 11, color, 3.5); cv.line(b, py - 11, b, py + 11, color, 3.5)
    lines = label if isinstance(label, (list, tuple)) else [label]
    if lab_xy is None:
        lx, ly = (a + b) / 2, yy + (-27 if above else 29)
    else:
        lx, ly = lab_xy
    for i, t in enumerate(lines):
        cv.text(lx, ly + i * (size + 6), t, size=size, color=color, anchor=anchor, weight=700)


D1 = L(-1, 9.6); S1 = L(1, 0.6)
D_up = L(-1, 12.0); S_up = L(1, -1.8)

# ------------------------------------------------ HL: current account deficit -> depreciation
cv = Canvas(W, H); p = plot(cv)
p.curve(D1, NAVY, label="D", dx=14, dy=6, size=CURVE)
p.curve(S1, NAVY, label="S_{1}", dx=14, dy=-10, size=CURVE)
p.curve(S_up, GOLD, label="S_{2}", dx=14, dy=-10, size=CURVE, label_color=GOLD_TXT)
p.shift_arrow(S1, S_up, y=7.6, w=6)
e1, e2 = intersect(D1, S1), intersect(D1, S_up)
p.guides(*e1, "ER_{1}", "Q_{1}", size=TICK)
p.guides(*e2, "ER_{2}", "Q_{2}", ycol=DEP, size=TICK)
_bx = p.px(S_up.x_at(e1[1]), e1[1])
bracket(cv, p, D1.x_at(e1[1]), S_up.x_at(e1[1]), e1[1], ["Excess supply", "of ₹ at ER₁"], DEP, True,
        lab_xy=(_bx[0] + 26, _bx[1] + 34), anchor="start")
p.point(*e1, INK, r=12); p.point(*e2, DEP, r=12)
p.yaxis_arrow(e1[1], e2[1], DEP, x_off=-150, w=7)
cv.badge(1080, 50, "₹ depreciates", DEP, size=BADGE, anchor="end")
save("BoP_25a_CA_Deficit_Depreciation", cv)

# ------------------------------------------------ HL: current account surplus -> appreciation
cv = Canvas(W, H); p = plot(cv)
p.curve(D1, NAVY, label="D_{1}", dx=14, dy=6, size=CURVE)
p.curve(D_up, GOLD, label="D_{2}", dx=14, dy=6, size=CURVE, label_color=GOLD_TXT)
p.curve(S1, NAVY, label="S", dx=14, dy=-10, size=CURVE)
p.shift_arrow(D1, D_up, y=2.4, w=6)
e1, e2 = intersect(D1, S1), intersect(D_up, S1)
p.guides(*e1, "ER_{1}", "Q_{1}", size=TICK)
p.guides(*e2, "ER_{2}", "Q_{2}", ycol=APP, size=TICK)
_bx = p.px(D_up.x_at(e1[1]), e1[1])
bracket(cv, p, S1.x_at(e1[1]), D_up.x_at(e1[1]), e1[1], ["Excess demand", "for ₹ at ER₁"], APP, False,
        lab_xy=(_bx[0] + 26, _bx[1] - 70), anchor="start")
p.point(*e1, INK, r=12); p.point(*e2, APP, r=12)
p.yaxis_arrow(e1[1], e2[1], APP, x_off=-150, w=7)
cv.badge(1080, 50, "₹ appreciates", APP, size=BADGE, anchor="end")
save("BoP_25b_CA_Surplus_Appreciation", cv)

# ------------------------------------------------ HL: financial inflows offset current-account pressure
cv = Canvas(W, H); p = plot(cv)
p.curve(D1, NAVY, label="D_{1}", dx=14, dy=6, size=CURVE)
p.curve(D_up, GOLD, label="D_{2}", dx=14, dy=6, size=CURVE, label_color=GOLD_TXT)
p.curve(S1, NAVY, label="S_{1}", dx=-14, dy=-24, size=CURVE)
p.curve(S_up, GOLD, label="S_{2}", dx=14, dy=-10, size=CURVE, label_color=GOLD_TXT)
p.shift_arrow(S1, S_up, y=7.9, w=6)
p.shift_arrow(D1, D_up, y=2.2, w=6)
e1, e2 = intersect(D1, S1), intersect(D_up, S_up)
assert abs(e1[1] - e2[1]) < 1e-9
p.hguide(e1[1], "ER_{1}", xend=e2[0], size=TICK)
for (x, y), lab in ((e1, "Q_{1}"), (e2, "Q_{2}")):
    px, py = p.px(x, y)
    cv.line(px, py, px, Y0, GUIDE, 2.5, dash="9 9", cap="butt")
    cv.text(px, Y0 + 34, lab, size=TICK, color=INK, anchor="middle", weight=700)
p.point(*e1, INK, r=12); p.point(*e2, CB, r=12)
for (x, y), lab, col in ((e1, "e₁", INK), (e2, "e₂", CB)):
    px, py = p.px(x, y)
    cv.text(px, py - 46, lab, size=TICK, color=col, anchor="middle", weight=700)
# labels for the two causes, placed beside each shift arrow
sx, sy = p.px(S1.x_at(7.9) + 0.25, 7.9)
cv.step(sx - 2, sy - 52, 1, GOLD_TXT, r=22)
dx_, dy_ = p.px(D1.x_at(2.2) + 0.2, 2.2)
cv.step(dx_ - 4, dy_ + 52, 2, GOLD_TXT, r=22)
cv.badge(1080, 50, "Rate unchanged", CB, size=BADGE, anchor="end")
save("BoP_26_Financial_Inflow_Offsets", cv)

# ------------------------------------------------ current account waterfall (worked example 1)
WW, HH = 1400, 760
cv = Canvas(WW, HH)
ax0, ax1 = 150, 1360            # x range
vmin, vmax = -75, 30            # data range (US$ bn)
top, bot = 70, 650
def vy(v):
    return top + (vmax - v) / (vmax - vmin) * (bot - top)
zero = vy(0)
# gridlines
for v in (-75, -60, -45, -30, -15, 0, 15, 30):
    y = vy(v)
    cv.line(ax0, y, ax1, y, "#E6DFD0" if v else INK, 2 if v else 3.5, cap="butt")
    cv.text(ax0 - 16, y, (f"+{v}" if v > 0 else f"−{abs(v)}") if v else "0", size=24, color=MUTED if v else INK, anchor="end", weight=600)
cv.text(ax0 - 120, top - 40, "US$ billion", size=24, color=MUTED, anchor="start", weight=600)
steps = [("Trade in goods", -60), ("Trade in services", +60), ("Income", -15), ("Current transfers", +20)]
bw, gap = 190, 52
x = ax0 + 60
run = 0
for i, (lab, v) in enumerate(steps):
    a, b = run, run + v
    col = APP if v > 0 else DEP
    y1, y2 = vy(max(a, b)), vy(min(a, b))
    cv.rect(x, y1, bw, y2 - y1, fill=col, rx=6)
    sign = f"+{v}" if v > 0 else f"−{abs(v)}"
    word = "surplus" if v > 0 else "deficit"
    ty = y1 - 30 if v > 0 else y2 + 30
    cv.text(x + bw / 2, ty, sign, size=34, color=col, anchor="middle", weight=800)
    cv.text(x + bw / 2, ty + (36 if v < 0 else -36), word, size=22, color=col, anchor="middle", weight=600)
    cv.text(x + bw / 2, bot + 44, lab, size=24, color=INK, anchor="middle", weight=700)
    # connector to next bar
    if i < len(steps):
        cv.line(x + bw, vy(b), x + bw + gap, vy(b), GUIDE, 2.5, dash="7 7", cap="butt")
    run = b
    x += bw + gap
# final bar
y1, y2 = vy(run), vy(0)
cv.rect(x, y1, bw, y2 - y1, fill=INK, rx=6)
cv.text(x + bw / 2, y1 - 30, f"+{run}", size=38, color=INK, anchor="middle", weight=800)
cv.text(x + bw / 2, y1 - 68, "surplus", size=22, color=INK, anchor="middle", weight=600)
cv.text(x + bw / 2, bot + 44, "Current account", size=24, color=INK, anchor="middle", weight=800)
cv.text(x + bw / 2, bot + 74, "balance", size=24, color=INK, anchor="middle", weight=800)
assert run == 5
save("BoP_12_CA_Waterfall", cv)

# ------------------------------------------------ J-curve
WJ, HJ = 1400, 900
cv = Canvas(WJ, HJ)
jx0, jx1 = 190, 1330
ymin, ymax = -5.6, 4.2
jt, jb = 110, 800
def jx(t):
    return jx0 + (jx1 - jx0) * t / 10.0
def jy(v):
    return jt + (ymax - v) / (ymax - ymin) * (jb - jt)
# axes
cv.line(jx0, jb, jx0, jt - 30, INK, 4, arrow_end=True, cap="butt")
cv.line(jx0, jy(0), jx1 + 20, jy(0), INK, 4, arrow_end=True, cap="butt")
cv.text(jx0 - 18, jy(0), "0", size=28, color=INK, anchor="end", weight=700)
cv.text(jx0 - 18, jt + 10, "Surplus (+)", size=26, color=MUTED, anchor="end", weight=700)
cv.text(jx0 - 18, jb - 10, "Deficit (−)", size=26, color=MUTED, anchor="end", weight=700)
cv.add(f'<text x="{jx0-110}" y="{(jt+jb)/2}" font-family="{FONT}" font-size="30" font-weight="700" fill="{INK}" '
       f'text-anchor="middle" dominant-baseline="middle" transform="rotate(-90 {jx0-110} {(jt+jb)/2})">Balance of trade (X − M)</text>')
cv.text(jx1 + 10, jy(0) + 44, "Time", size=30, color=INK, anchor="end", weight=700)
# trade-balance path
t0, base = 1.0, -2.0
_A, _s1, _R, _m, _k = 2.4, 1.6, 5.0, 4.4, 1.0
_off = _R / (1 + math.exp(_m / _k))
def tb(t):
    s = t - t0
    return base - _A * (s / _s1) * math.exp(1 - s / _s1) + _R / (1 + math.exp(-(s - _m) / _k)) - _off
ts = [t0 + i * (9.2 - t0) / 400 for i in range(401)]
vals = [tb(t) for t in ts]
# initial level guide and depreciation marker
cv.line(jx0, jy(base), jx(9.7), jy(base), GUIDE, 2.5, dash="9 9", cap="butt")
cv.text(jx(9.7), jy(base) + 30, "initial deficit", size=24, color=MUTED, anchor="end", weight=600)
cv.line(jx(t0), jy(0) - 4, jx(t0), jy(-5.4), GUIDE, 2.5, dash="9 9", cap="butt")
cv.text(jx(t0), jy(0) - 58, "Depreciation", size=24, color=DEP, anchor="middle", weight=700)
cv.text(jx(t0), jy(0) - 28, "or devaluation", size=24, color=DEP, anchor="middle", weight=700)
d = "M" + " L".join(f"{jx(t):.1f},{jy(v):.1f}" for t, v in zip(ts, vals))
cv.path(d, color=NAVY, w=7)
imin = min(range(len(vals)), key=lambda i: vals[i])
tB, vB = ts[imin], vals[imin]
# recovery to initial level and crossing zero
t_back = next(t for t, v in zip(ts, vals) if t > tB and v >= base)
t_zero = next(t for t, v in zip(ts, vals) if t > tB and v >= 0)
tC = 8.6; vC = tb(tC)
cv.circle(jx(t0), jy(tb(t0)), 12, INK); cv.text(jx(t0) - 22, jy(tb(t0)) - 4, "A", size=34, color=INK, anchor="end", weight=800)
cv.circle(jx(tB), jy(vB), 12, DEP); cv.text(jx(tB), jy(vB) + 44, "B", size=34, color=DEP, anchor="middle", weight=800)
cv.circle(jx(tC), jy(vC), 12, APP); cv.text(jx(tC) - 26, jy(vC) - 30, "C", size=34, color=APP, anchor="end", weight=800)
# phase annotations
cv.text(jx(3.25), jy(-4.95) + 2, "Short run: |PEDx| + |PEDm| < 1", size=25, color=DEP, anchor="start", weight=700)
cv.text(jx(3.25), jy(-4.95) + 34, "contracts, habits, slow information", size=23, color=MUTED, anchor="start", weight=600)
cv.text(jx(6.3), jy(2.9), "Long run: |PEDx| + |PEDm| > 1", size=25, color=APP, anchor="end", weight=700)
cv.text(jx(6.3), jy(2.9) + 32, "Marshall-Lerner condition holds", size=23, color=MUTED, anchor="end", weight=600)
save("BoP_34_J_Curve", cv)
print("J-curve: trough t=%.2f v=%.2f, back to initial t=%.2f, zero t=%.2f, C=%.2f" % (tB, vB, t_back, t_zero, vC))
