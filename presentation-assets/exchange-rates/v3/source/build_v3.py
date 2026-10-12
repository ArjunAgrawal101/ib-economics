"""v3 diagram family for the redesigned deck (Dune theme, warm-white cards #FFFDFA).

Changes from v1/v2: no boxed panel, transparent background, no in-image header (the slide
title does that job), larger type, tighter canvas so the graph fills the slide area.
Convention unchanged: vertical axis = price of the currency studied in US$ (US$ per unit).
"""
import os, sys, json
sys.path.insert(0, os.path.dirname(__file__))
import econsvg as E
E.PANEL = "#FFFDFA"                     # halo colour = Dune card background
from econsvg import Canvas, Plot, Line, intersect, INK, NAVY, GOLD, GOLD_TXT, APP, DEP, CB, GUIDE, MUTED

OUT = os.path.join(os.path.dirname(__file__), "svg3")
os.makedirs(OUT, exist_ok=True)
REG = []


def bare_svg(self):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{self.w}" height="{self.h}" viewBox="0 0 {self.w} {self.h}">'
            f'<defs>{"".join(self.defs)}</defs>{"".join(self.els)}</svg>')


Canvas.svg = bare_svg

# type scale (px on the canvas)
CURVE, AXIS, AXIS2, TICK, NOTE, BADGE = 40, 32, 27, 36, 27, 30
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


def plot(cv, generic=False, ylab=None, xlab=None, x0=X0, y0=Y0, x1=X1, y1=Y1):
    if ylab is None:
        ylab = ("Price of DC", "(US$ per unit of DC)") if generic else ("Price of the rupee", "(US$ per ₹)")
    if xlab is None:
        xlab = ("Quantity of DC",) if generic else ("Quantity of ₹",)
    p = Plot(cv, x0, y0, x1, y1, ylab=ylab, xlab=xlab)
    p.axes(ylab_size=AXIS)
    return p


def save(name, cv, **meta):
    with open(os.path.join(OUT, name + ".svg"), "w") as f:
        f.write(cv.svg())
    REG.append(dict(file=name, w=cv.w, h=cv.h, **{k: str(v) for k, v in meta.items()}))


def bracket(cv, p, xa, xb, y, label, color, above=True, size=NOTE):
    a, py = p.px(xa, y); b, _ = p.px(xb, y)
    yy = py + (-28 if above else 28)
    cv.line(a, yy, b, yy, color, 4.5, arrow_end=True, arrow_start=True)
    cv.line(a, py - 11, a, py + 11, color, 3.5); cv.line(b, py - 11, b, py + 11, color, 3.5)
    cv.text((a + b) / 2, yy + (-27 if above else 29), label, size=size, color=color, anchor="middle", weight=700)


D1 = L(-1, 9.6); S1 = L(1, 0.6)
D_up = L(-1, 12.0); D_dn = L(-1, 7.2); S_dn = L(1, 3.0); S_up = L(1, -1.8)

# ---------------------------------------------------------------- floating equilibrium
cv = Canvas(W, H); p = plot(cv)
p.curve(D1, NAVY, label="D", dx=14, dy=6, size=CURVE); p.curve(S1, NAVY, label="S", dx=14, dy=-10, size=CURVE)
e = intersect(D1, S1); p.guides(*e, "ER_{e}", "Q_{e}", size=TICK); p.point(*e, INK, r=12, label="e", ldx=24, ldy=0, lsize=TICK)
save("v3_02_Floating_Equilibrium", cv, eq=e)

# ---------------------------------------------------------------- disequilibrium
cv = Canvas(W, H); p = plot(cv)
p.curve(D1, NAVY, label="D", dx=14, dy=6, size=CURVE); p.curve(S1, NAVY, label="S", dx=14, dy=-10, size=CURVE)
e = intersect(D1, S1); p.guides(e[0], e[1], "ER_{e}", None, size=TICK); p.point(*e, INK, r=12)
yh, yl = 7.0, 3.2
p.hguide(yh, "ER_{H}", color=DEP, xend=9.0, lcol=DEP, w=3.5, dash="2 0", size=TICK)
p.hguide(yl, "ER_{L}", color=APP, xend=9.0, lcol=APP, w=3.5, dash="2 0", size=TICK)
bracket(cv, p, D1.x_at(yh), S1.x_at(yh), yh, "Excess supply of ₹", DEP, True)
bracket(cv, p, S1.x_at(yl), D1.x_at(yl), yl, "Excess demand for ₹", APP, False)
p.yaxis_arrow(yh, e[1] + 0.3, DEP, x_off=-150); p.yaxis_arrow(yl, e[1] - 0.3, APP, x_off=-150)
save("v3_03_Disequilibrium", cv)

# ---------------------------------------------------------------- movement vs shift (single panel)
cv = Canvas(W, 900); p = plot(cv)
Dm, D2m = L(-1, 9.6), L(-1, 11.6)
p.curve(Dm, NAVY, label="D_{1}", dx=14, dy=6, size=CURVE); p.curve(D2m, GOLD, label="D_{2}", dx=14, dy=6, size=CURVE, label_color=GOLD_TXT)
ya, yb = 6.6, 3.6
pa, pb, pc = (Dm.x_at(ya), ya), (Dm.x_at(yb), yb), (D2m.x_at(ya), ya)
p.hguide(ya, "ER_{1}", xend=pc[0], size=TICK); p.hguide(yb, "ER_{2}", xend=pb[0], size=TICK)
p.point(*pa, INK, r=12, label="a", ldx=-24, ldy=-26, lsize=TICK)
p.point(*pb, INK, r=12, label="b", ldx=-26, ldy=30, lsize=TICK)
p.point(*pc, GOLD, r=12, label="c", ldx=22, ldy=-28, lsize=TICK, lcol=GOLD_TXT)
dxp = (X1 - X0) / 10; dyp = (Y0 - Y1) / 10
import math
nx, ny = dyp / math.hypot(dxp, dyp), -dxp / math.hypot(dxp, dyp)   # unit normal (up-right)
a1, b1 = p.px(pa[0] + 0.45, ya - 0.45); a2, b2 = p.px(pb[0] - 0.45, yb + 0.45)
off = 34
cv.line(a1 + nx * off, b1 + ny * off, a2 + nx * off, b2 + ny * off, INK, 6, arrow_end=True)
cv.step((a1 + a2) / 2 + nx * 78, (b1 + b2) / 2 + ny * 78, 1, INK, r=24)
c1, d1 = p.px(pa[0] + 0.25, ya); c2, d2 = p.px(pc[0] - 0.25, ya)
cv.line(c1, d1 - 26, c2, d2 - 26, GOLD, 6, arrow_end=True)
cv.step((c1 + c2) / 2, d1 - 68, 2, GOLD_TXT, r=24)
save("v3_04_Shift_vs_Movement", cv)


# ---------------------------------------------------------------- four shifts (compact, for side-by-side pairs)
def shift(name, Dfrom, Dto, Sfrom, Sto, appreciate, which):
    cv = Canvas(W, H); p = plot(cv)
    col = APP if appreciate else DEP
    e1, e2 = intersect(Dfrom, Sfrom), intersect(Dto, Sto)
    if which == "D":
        p.curve(Dfrom, NAVY, label="D_{1}", dx=14, dy=6, size=CURVE)
        p.curve(Dto, GOLD, label="D_{2}", dx=14, dy=6, size=CURVE, label_color=GOLD_TXT)
        p.curve(Sfrom, NAVY, label="S", dx=14, dy=-10, size=CURVE)
        p.shift_arrow(Dfrom, Dto, y=2.4, w=6)
    else:
        p.curve(Dfrom, NAVY, label="D", dx=14, dy=6, size=CURVE)
        p.curve(Sfrom, NAVY, label="S_{1}", dx=14, dy=-10, size=CURVE)
        p.curve(Sto, GOLD, label="S_{2}", dx=14, dy=-10, size=CURVE, label_color=GOLD_TXT)
        p.shift_arrow(Sfrom, Sto, y=7.6, w=6)
    p.guides(*e1, "ER_{1}", "Q_{1}", size=TICK)
    p.guides(*e2, "ER_{2}", "Q_{2}", ycol=col, size=TICK)
    p.point(*e1, INK, r=12); p.point(*e2, col, r=12)
    p.yaxis_arrow(e1[1], e2[1], col, x_off=-150, w=7)
    cv.badge(1080, 50, "₹ appreciates" if appreciate else "₹ depreciates", col, size=BADGE, anchor="end")
    save(name, cv, eq1=e1, eq2=e2)


shift("v3_06_Appreciation_Demand_Increase", D1, D_up, S1, S1, True, "D")
shift("v3_07_Appreciation_Supply_Decrease", D1, D1, S1, S_dn, True, "S")
shift("v3_08_Depreciation_Demand_Decrease", D1, D_dn, S1, S1, False, "D")
shift("v3_09_Depreciation_Supply_Increase", D1, D1, S1, S_up, False, "S")


def both(name, Dto, Sto, appreciate):
    cv = Canvas(W, H); p = plot(cv)
    col = APP if appreciate else DEP
    p.curve(D1, NAVY, label="D_{1}", dx=14, dy=6, size=CURVE); p.curve(Dto, GOLD, label="D_{2}", dx=14, dy=6, size=CURVE, label_color=GOLD_TXT)
    p.curve(S1, NAVY, label="S_{1}", dx=14, dy=-10, size=CURVE); p.curve(Sto, GOLD, label="S_{2}", dx=14, dy=-10, size=CURVE, label_color=GOLD_TXT)
    p.shift_arrow(D1, Dto, y=1.8 if Dto is D_dn else 2.4, w=6); p.shift_arrow(S1, Sto, y=8.5 if Sto is S_dn else 7.6, w=6)
    e1, e2 = intersect(D1, S1), intersect(Dto, Sto)
    p.guides(e1[0], e1[1], "ER_{1}", None, size=TICK); p.guides(*e2, "ER_{2}", "Q_{1} = Q_{2}", ycol=col, size=TICK)
    p.point(*e1, INK, r=12); p.point(*e2, col, r=12)
    p.yaxis_arrow(e1[1], e2[1], col, x_off=-150, w=7)
    cv.badge(1080, 50, "₹ appreciates" if appreciate else "₹ depreciates", col, size=BADGE, anchor="end")
    save(name, cv, eq1=e1, eq2=e2)


both("v3_12_Inflation_Both_Curves", D_dn, S_up, False)
both("v3_13_Interest_Both_Curves", D_up, S_dn, True)


# ---------------------------------------------------------------- AD-AS
def adas(name, AD1, AD2, SR1, SR2, yp, note):
    cv = Canvas(W, H)
    p = plot(cv, ylab=("Average price level",), xlab=("Real GDP",))
    a, b = p.px(yp, 1.0); c, d = p.px(yp, 9.3)
    cv.line(a, b, c, d, INK, 6); cv.text(c, d - 30, "LRAS", size=AXIS, color=INK, anchor="middle", weight=700)
    p.curve(SR1, NAVY, label="SRAS_{1}" if SR2 else "SRAS", dx=14, dy=-10, size=AXIS + 2)
    if SR2:
        p.curve(SR2, GOLD, label="SRAS_{2}", dx=14, dy=-10, size=AXIS + 2, label_color=GOLD_TXT); p.shift_arrow(SR1, SR2, y=7.9, w=6)
    p.curve(AD1, NAVY, label="AD_{1}" if AD2 else "AD", dx=14, dy=8, size=AXIS + 2)
    if AD2:
        p.curve(AD2, GOLD, label="AD_{2}", dx=14, dy=8, size=AXIS + 2, label_color=GOLD_TXT); p.shift_arrow(AD1, AD2, y=2.6, w=6)
    e1, e2 = intersect(AD1, SR1), intersect(AD2 or AD1, SR2 or SR1)
    up, right = e2[1] > e1[1], e2[0] > e1[0]
    p.guides(e1[0], e1[1], "PL_{1}", None, size=TICK); p.guides(e2[0], e2[1], "PL_{2}", None, ycol=DEP if up else APP, size=TICK)
    yl = p.Y0 + 38
    x1p, x2p, xpp = p.px(e1[0], 0)[0], p.px(e2[0], 0)[0], p.px(yp, 0)[0]
    if abs(e1[0] - yp) < 1e-6:
        cv.text(x1p - 4, yl, "Y_{1} = Y_{p}", size=TICK, anchor="start", weight=700)
        cv.text(x2p + 4, yl, "Y_{2}", size=TICK, anchor="end", weight=700)
    else:
        for xx, s in ((x1p, "Y_{1}"), (x2p, "Y_{2}"), (xpp, "Y_{p}")):
            cv.text(xx, yl, s, size=TICK, anchor="middle", weight=700)
    p.point(*e1, INK, r=12); p.point(*e2, GOLD, r=12)
    p.yaxis_arrow(e1[1], e2[1], DEP if up else APP, x_off=-160, w=7)
    p.xaxis_arrow(e1[0], e2[0], APP if right else DEP, y_off=84, w=6)
    cv.badge(1080, 50, note[0], note[1], size=BADGE - 2, anchor="end")
    save(name, cv, eq1=e1, eq2=e2)


SR = L(1.0, 0.0)
adas("v3_16_ADAS_Depreciation_AD", L(-1, 9.0), L(-1, 11.0), SR, None, 6.6, ("Demand-pull pressure", GOLD_TXT))
adas("v3_17_ADAS_Depreciation_SRAS", L(-1, 12.4), None, SR, L(1.0, 1.6), 6.2, ("Cost-push inflation", DEP))
adas("v3_18_ADAS_Appreciation_AD", L(-1, 12.4), L(-1, 10.8), SR, None, 6.2, ("AD falls", GOLD_TXT))

# ---------------------------------------------------------------- fixed rate maintained
cv = Canvas(W, H); p = plot(cv, generic=True)
p.curve(D1, NAVY, label="D_{1}", dx=14, dy=6, size=CURVE); p.curve(D_dn, GOLD, label="D_{2}", dx=14, dy=6, size=CURVE, label_color=GOLD_TXT)
p.curve(S1, NAVY, label="S", dx=14, dy=-10, size=CURVE)
fr = intersect(D1, S1)[1]
p.hguide(fr, "FR", color=INK, xend=9.6, w=4, dash="18 9", size=TICK)
qd, qs = D_dn.x_at(fr), S1.x_at(fr)
bracket(cv, p, qd, qs, fr, "Excess supply", DEP, True)
mk = intersect(D_dn, S1)
p.guides(*mk, "ER_{2}", None, ycol=DEP, size=TICK)
a, b = p.px(*mk); cv.add(f'<circle cx="{a:.1f}" cy="{b:.1f}" r="12" fill="#FFFDFA" stroke="{DEP}" stroke-width="5"/>')
cv.text(a - 22, b + 34, "if left to float", size=NOTE - 2, color=DEP, anchor="end", weight=600)
p.point(*intersect(D1, S1), INK, r=12, label="A", ldx=26, ldy=2, lsize=TICK)
p.point(qd, fr, GOLD, r=12, label="B", ldx=-22, ldy=36, lsize=TICK, lcol=GOLD_TXT)
p.shift_arrow(D1, D_dn, y=1.9, w=6); p.shift_arrow(D_dn, D1, y=3.0, color=CB, w=7)
g = p.px(D1.x_at(1.9), 1.9); cv.step(g[0] + 38, g[1], 1, GOLD_TXT, r=24)
bl = p.px(D1.x_at(3.0), 3.0); cv.step(bl[0] + 38, bl[1], 3, CB, r=24)
lx, ly = p.px((qd + qs) / 2, fr); cv.step(lx - 128, ly - 55, 2, DEP, r=24)
save("v3_19_Fixed_Rate_Maintained", cv)

# ---------------------------------------------------------------- devaluation
cv = Canvas(W, H); p = plot(cv, generic=True)
p.curve(D_dn, NAVY, label="D", dx=14, dy=6, size=CURVE); p.curve(S1, NAVY, label="S", dx=14, dy=-10, size=CURVE)
fr1, fr2 = intersect(D1, S1)[1], intersect(D_dn, S1)[1]
p.hguide(fr1, "FR_{1}", color=GUIDE, xend=9.6, w=4, dash="18 9", lcol=MUTED, size=TICK)
p.hguide(fr2, "FR_{2}", color=INK, xend=9.6, w=4, dash="18 9", size=TICK)
cv.text(p.px(9.6, 0)[0], p.px(0, fr1)[1] - 26, "old fixed rate", size=NOTE, color=MUTED, anchor="end", weight=600)
cv.text(p.px(9.6, 0)[0], p.px(0, fr2)[1] - 26, "new fixed rate", size=NOTE, color=INK, anchor="end", weight=600)
bracket(cv, p, D_dn.x_at(fr1), S1.x_at(fr1), fr1, "Excess supply", DEP, True)
p.point(*intersect(D_dn, S1), DEP, r=12)
p.yaxis_arrow(fr1, fr2, DEP, x_off=-160, w=7)
cv.badge(1080, 50, "Devaluation", DEP, size=BADGE, anchor="end")
save("v3_20_Devaluation", cv)

# ---------------------------------------------------------------- managed band
cv = Canvas(W, H); p = plot(cv, generic=True)
up_, tg, lo_ = 6.1, 5.1, 4.1
a, b = p.px(0, up_); c, d = p.px(9.6, lo_)
cv.rect(a, b, c - a, d - b, fill=GOLD, opacity=0.12)
p.hguide(up_, "Upper", color=GOLD, xend=9.6, w=3.5, dash="14 8", lcol=GOLD_TXT, size=AXIS2 + 3)
p.hguide(tg, "Target", color=GUIDE, xend=9.6, w=3, dash="6 8", lcol=MUTED, size=AXIS2 + 3)
p.hguide(lo_, "Lower", color=GOLD, xend=9.6, w=3.5, dash="14 8", lcol=GOLD_TXT, size=AXIS2 + 3)
cv.text(p.px(9.6, 0)[0], p.px(0, (up_ + tg) / 2)[1], "band", size=NOTE, color=GOLD_TXT, anchor="end", weight=700)
D2b, D3b = L(-1, 7.6), L(-1, 11.6)
p.curve(D1, NAVY, label="D_{1}", dx=14, dy=6, size=CURVE)
p.curve(D2b, GOLD, label="D_{2}", dx=14, dy=6, size=CURVE, label_color=GOLD_TXT)
p.curve(D3b, GOLD, label="D_{3}", dx=14, dy=6, size=CURVE, label_color=GOLD_TXT)
p.curve(S1, NAVY, label="S", dx=14, dy=-10, size=CURVE)
e1, e2, e3 = intersect(D1, S1), intersect(D2b, S1), intersect(D3b, S1)
p.point(*e1, INK, r=12); p.point(*e2, GOLD, r=12); p.point(*e3, GOLD, r=12)
x2, y2 = p.px(*e2); x3, y3 = p.px(*e3)
cv.line(x2, y2 + 86, x2, y2 + 22, CB, 7, arrow_end=True)
cv.text(p.px(0.05, 0)[0], y2 + 62, "CB buys DC", size=NOTE, color=CB, anchor="start", weight=700)
cv.line(x3, y3 - 86, x3, y3 - 22, CB, 7, arrow_end=True)
cv.text(p.px(6.2, 0)[0], y3 - 66, "CB sells DC", size=NOTE, color=CB, anchor="start", weight=700)
save("v3_21_Managed_Band", cv)

# ---------------------------------------------------------------- over/undervalued (single panel)
cv = Canvas(W, H); p = plot(cv, generic=True)
p.curve(D1, NAVY, label="D", dx=14, dy=6, size=CURVE); p.curve(S1, NAVY, label="S", dx=14, dy=-10, size=CURVE)
e = intersect(D1, S1); p.hguide(e[1], "ER_{e}", xend=e[0], size=TICK); p.point(*e, INK, r=12)
for rate, lab, col, txt, cbt, above in [(7.0, "OR", DEP, "Excess supply of DC", "CB buys DC", True),
                                         (3.2, "UR", APP, "Excess demand for DC", "CB sells DC", False)]:
    p.hguide(rate, lab, color=col, xend=9.6, w=4, dash="18 9", lcol=col, size=TICK)
    xa, xb = sorted([D1.x_at(rate), S1.x_at(rate)])
    bracket(cv, p, xa, xb, rate, txt, col, above)
    tx, ty = p.px(9.6, rate)
    cv.text(tx, ty + (-28 if above else 30), cbt, size=NOTE, color=CB, anchor="end", weight=700)
save("v3_22_Over_Undervalued", cv)

with open(os.path.join(os.path.dirname(__file__), "register_v3.json"), "w") as f:
    json.dump(REG, f, indent=1)
print("\n".join(r["file"] for r in REG))
