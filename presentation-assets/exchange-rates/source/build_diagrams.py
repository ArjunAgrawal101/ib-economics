"""Build every technical diagram for the Exchange Rates deck as SVG.

Convention used throughout the deck: the vertical axis shows the PRICE OF THE CURRENCY
BEING STUDIED expressed in US dollars (US$ per unit). A rise on this axis = appreciation.
Floating diagrams study the Indian rupee (₹). Fixed/managed diagrams study a generic
domestic currency (DC) because India does not fix its exchange rate.
"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from econsvg import *

OUT = os.path.join(os.path.dirname(__file__), "svg")
os.makedirs(OUT, exist_ok=True)
REG = []  # diagram register rows


def L(m, c, xmin=0.5, xmax=9.8, ymin=1.3, ymax=9.0):
    """Infinite line y = m x + c clipped to the drawing window -> Line segment (left to right)."""
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


def end_label_pos(Lseg, kind):
    # demand labels at the lower-right end, supply labels at the upper-right end
    return "end"


def save(name, cv, meta):
    path = os.path.join(OUT, name + ".svg")
    with open(path, "w") as f:
        f.write(cv.svg())
    REG.append(dict(file=name, **meta))


def std_plot(cv, cur="₹", generic=False, x0=230, y0=880, x1=990, y1=210):
    if generic:
        ylab, xlab = ("Price of DC", "(US$ per unit of DC)"), ("Quantity of DC",)
    else:
        ylab, xlab = ("Price of the rupee", "(US$ per ₹)"), ("Quantity of ₹",)
    p = Plot(cv, x0, y0, x1, y1, ylab=ylab, xlab=xlab)
    p.axes()
    return p


def bracket(cv, p, xa, xb, y, label, color, above=True, size=24):
    a, py = p.px(xa, y)
    b, _ = p.px(xb, y)
    off = -26 if above else 26
    yy = py + off
    cv.line(a, yy, b, yy, color, 4, arrow_end=True, arrow_start=True)
    cv.line(a, py - 10, a, py + 10, color, 3)
    cv.line(b, py - 10, b, py + 10, color, 3)
    cv.text((a + b) / 2, yy + (-24 if above else 26), label, size=size, color=color, anchor="middle", weight=700)


# Standard lines (slope +/-1 in data space)
D1 = L(-1, 9.6); S1 = L(1, 0.6)        # equilibrium (4.5, 5.1)
D_up = L(-1, 12.0)                      # D shifts right -> (5.7, 6.3)
D_dn = L(-1, 7.2)                       # D shifts left  -> (3.3, 3.9)
S_dn = L(1, 3.0)                        # S shifts left  -> (3.3, 6.3)
S_up = L(1, -1.8)                       # S shifts right -> (5.7, 3.9)

# ============================================================== A: floating equilibrium
cv = Canvas(1200, 1000, header="Market for the Indian rupee", sub="Floating system: no central-bank intervention")
p = std_plot(cv)
p.curve(D1, NAVY, label="D", dx=12, dy=4)
p.curve(S1, NAVY, label="S", dx=12, dy=-8)
x, y = intersect(D1, S1)
p.guides(x, y, "ER_{e}", "Q_{e}")
p.point(x, y, INK, label="e", ldx=22, ldy=0)
save("ER_02_Floating_Equilibrium", cv, dict(title="Floating exchange-rate determination",
     labels="D, S, ERe, Qe; y = US$ per ₹; x = quantity of ₹", eq=(x, y)))

# ============================================================== A2: disequilibrium
cv = Canvas(1200, 1000, header="Market for the Indian rupee", sub="How the market removes a surplus or shortage of rupees")
p = std_plot(cv)
p.curve(D1, NAVY, label="D", dx=12, dy=4)
p.curve(S1, NAVY, label="S", dx=12, dy=-8)
x, y = intersect(D1, S1)
p.guides(x, y, "ER_{e}", None)
p.point(x, y, INK)
yh, yl = 6.9, 3.3
p.hguide(yh, "ER_{H}", color=DEP, xend=9.0, lcol=DEP, w=3, dash="2 0")
p.hguide(yl, "ER_{L}", color=APP, xend=9.0, lcol=APP, w=3, dash="2 0")
bracket(cv, p, D1.x_at(yh), S1.x_at(yh), yh, "Excess supply of ₹", DEP, above=True)
bracket(cv, p, S1.x_at(yl), D1.x_at(yl), yl, "Excess demand for ₹", APP, above=False)
p.yaxis_arrow(yh, y + 0.25, DEP, x_off=-112)
p.yaxis_arrow(yl, y - 0.25, APP, x_off=-112)
save("ER_03_Disequilibrium", cv, dict(title="Disequilibrium and the price mechanism",
     labels="ER_H above ERe -> excess supply; ER_L below -> excess demand", eq=(x, y)))

# ============================================================== A3: movement vs shift
cv = Canvas(1600, 1000, header="Movement along a curve vs shift of a curve", sub="Same logic for the supply of rupees")
pl = Plot(cv, 200, 840, 700, 230, ylab=("Price of the rupee", "(US$ per ₹)"), xlab=("Quantity of ₹",)); pl.axes()
Dm = L(-1, 9.6)
pl.curve(Dm, NAVY, label="D", dx=12, dy=4)
ya, yb = 6.6, 3.6
pl.guides(Dm.x_at(ya), ya, "ER_{1}", "Q_{1}")
pl.guides(Dm.x_at(yb), yb, "ER_{2}", "Q_{2}")
pl.point(Dm.x_at(ya), ya, INK, label="a", ldx=20, ldy=-20)
pl.point(Dm.x_at(yb), yb, INK, label="b", ldx=20, ldy=-20)
a1, b1 = pl.px(Dm.x_at(ya) + 0.35, ya - 0.35)
a2, b2 = pl.px(Dm.x_at(yb) - 0.35, yb + 0.35)
cv.line(a1 + 14, b1 + 4, a2 + 14, b2 + 4, GOLD, 5, arrow_end=True)
cv.text(450, 960, "Movement along D: caused by a change in the exchange rate", size=25, color=INK, anchor="middle", weight=600)
pr = Plot(cv, 960, 840, 1460, 230, ylab=("Price of the rupee", "(US$ per ₹)"), xlab=("Quantity of ₹",)); pr.axes()
pr.curve(Dm, NAVY, label="D_{1}", dx=12, dy=4)
D2m = L(-1, 11.6)
pr.curve(D2m, GOLD, label="D_{2}", dx=12, dy=4)
ye = 5.1
pr.guides(Dm.x_at(ye), ye, "ER_{1}", "Q_{1}")
pr.guides(D2m.x_at(ye), ye, None, "Q_{2}")
pr.point(Dm.x_at(ye), ye, INK); pr.point(D2m.x_at(ye), ye, GOLD)
pr.shift_arrow(Dm, D2m, t=0.30)
cv.text(1210, 960, "Shift of D: caused by a change in a determinant", size=25, color=INK, anchor="middle", weight=600)
save("ER_04_Shift_vs_Movement", cv, dict(title="Movement along vs shift of the demand-for-rupee curve",
     labels="left: a->b along D; right: D1->D2 at constant ER1"))


# ============================================================== B-E: four shifts
def shift_diagram(name, title, sub, Dfrom, Dto, Sfrom, Sto, appreciate, shift_which):
    cv = Canvas(1200, 1000, header="Market for the Indian rupee", sub=sub)
    p = std_plot(cv)
    e1 = intersect(Dfrom, Sfrom)
    e2 = intersect(Dto, Sto)
    col = APP if appreciate else DEP
    if shift_which == "D":
        p.curve(Dfrom, NAVY, label="D_{1}", dx=12, dy=4)
        p.curve(Dto, GOLD, label="D_{2}", dx=12, dy=4)
        p.curve(Sfrom, NAVY, label="S", dx=12, dy=-8)
        p.shift_arrow(Dfrom, Dto, y=2.4)
    else:
        p.curve(Dfrom, NAVY, label="D", dx=12, dy=4)
        p.curve(Sfrom, NAVY, label="S_{1}", dx=12, dy=-8)
        p.curve(Sto, GOLD, label="S_{2}", dx=12, dy=-8)
        p.shift_arrow(Sfrom, Sto, y=7.6)
    hi, lo = (e2, e1) if e2[1] > e1[1] else (e1, e2)
    p.guides(*e1, "ER_{1}", "Q_{1}")
    p.guides(*e2, "ER_{2}", "Q_{2}", ycol=col)
    p.point(*e1, INK)
    p.point(*e2, col)
    p.yaxis_arrow(e1[1], e2[1], col, x_off=-112)
    p.xaxis_arrow(e1[0], e2[0], MUTED, y_off=70, w=4)
    cv.badge(1150, 60, "₹ appreciates" if appreciate else "₹ depreciates", col, size=26, anchor="end")
    save(name, cv, dict(title=title, labels=f"{shift_which} shift; ER {e1[1]:.1f}->{e2[1]:.1f}; Q {e1[0]:.1f}->{e2[0]:.1f}",
                        eq1=e1, eq2=e2))
    return e1, e2


shift_diagram("ER_06_Appreciation_Demand_Increase", "Appreciation: demand for ₹ increases",
              "Demand for rupees increases: D shifts right", D1, D_up, S1, S1, True, "D")
shift_diagram("ER_07_Appreciation_Supply_Decrease", "Appreciation: supply of ₹ decreases",
              "Supply of rupees decreases: S shifts left", D1, D1, S1, S_dn, True, "S")
shift_diagram("ER_08_Depreciation_Demand_Decrease", "Depreciation: demand for ₹ decreases",
              "Demand for rupees decreases: D shifts left", D1, D_dn, S1, S1, False, "D")
shift_diagram("ER_09_Depreciation_Supply_Increase", "Depreciation: supply of ₹ increases",
              "Supply of rupees increases: S shifts right", D1, D1, S1, S_up, False, "S")


# ============================================================== F1/F2: both curves shift
def both_diagram(name, title, sub, Dto, Sto, appreciate):
    cv = Canvas(1200, 1000, header="Market for the Indian rupee", sub=sub)
    p = std_plot(cv)
    col = APP if appreciate else DEP
    p.curve(D1, NAVY, label="D_{1}", dx=12, dy=4)
    p.curve(Dto, GOLD, label="D_{2}", dx=12, dy=4)
    p.curve(S1, NAVY, label="S_{1}", dx=12, dy=-8)
    p.curve(Sto, GOLD, label="S_{2}", dx=12, dy=-8)
    p.shift_arrow(D1, Dto, y=1.8 if Dto is D_dn else 2.4)
    p.shift_arrow(S1, Sto, y=7.6)
    e1 = intersect(D1, S1); e2 = intersect(Dto, Sto)
    p.guides(*e1, "ER_{1}", None)
    p.guides(*e2, "ER_{2}", "Q_{1} = Q_{2}", ycol=col)
    p.point(*e1, INK); p.point(*e2, col)
    p.yaxis_arrow(e1[1], e2[1], col, x_off=-112)
    cv.badge(1150, 60, "₹ appreciates" if appreciate else "₹ depreciates", col, size=26, anchor="end")
    save(name, cv, dict(title=title, labels=f"both shift; ER {e1[1]:.1f}->{e2[1]:.1f}; Q unchanged (equal shifts)",
                        eq1=e1, eq2=e2))


both_diagram("ER_12_Inflation_Both_Curves", "Higher relative inflation: D falls and S rises",
             "India's inflation rises relative to trading partners", D_dn, S_up, False)
both_diagram("ER_13_Interest_Both_Curves", "Higher relative interest rates: D rises and S falls",
             "India's interest rates rise relative to other countries", D_up, S_dn, True)


# ============================================================== G: AD-AS
def adas(name, title, sub, AD1, AD2, SR1, SR2, yp, note):
    cv = Canvas(1200, 1000, header="AD-AS model", sub=sub)
    p = Plot(cv, 230, 880, 990, 210, ylab=("Average price level",), xlab=("Real GDP",))
    p.axes()
    a, b = p.px(yp, 1.0); c, d = p.px(yp, 9.3)
    cv.line(a, b, c, d, INK, 5)
    cv.text(c, d - 26, "LRAS", size=28, color=INK, anchor="middle", weight=700)
    p.curve(SR1, NAVY, label="SRAS_{1}" if SR2 else "SRAS", dx=12, dy=-8, size=28)
    if SR2:
        p.curve(SR2, GOLD, label="SRAS_{2}", dx=12, dy=-8, size=28, label_color=GOLD_TXT)
        p.shift_arrow(SR1, SR2, y=7.9)
    p.curve(AD1, NAVY, label="AD_{1}" if AD2 else "AD", dx=12, dy=6, size=28)
    if AD2:
        p.curve(AD2, GOLD, label="AD_{2}", dx=12, dy=6, size=28, label_color=GOLD_TXT)
        p.shift_arrow(AD1, AD2, y=2.6)
    e1 = intersect(AD1, SR1)
    e2 = intersect(AD2 or AD1, SR2 or SR1)
    up = e2[1] > e1[1]
    right = e2[0] > e1[0]
    p.guides(*e1, "PL_{1}", None)
    p.guides(*e2, "PL_{2}", None, ycol=DEP if up else APP)
    yl = p.Y0 + 34
    x1p, x2p, xpp = p.px(e1[0], 0)[0], p.px(e2[0], 0)[0], p.px(yp, 0)[0]
    if abs(e1[0] - yp) < 1e-6:   # starts at potential output
        cv.text(x1p - 4, yl, "Y_{1} = Y_{p}", size=28, color=INK, anchor="start", weight=700)
        cv.text(x2p + 4, yl, "Y_{2}", size=28, color=INK, anchor="end", weight=700)
    else:
        cv.text(x1p, yl, "Y_{1}", size=28, color=INK, anchor="middle", weight=700)
        cv.text(x2p, yl, "Y_{2}", size=28, color=INK, anchor="middle", weight=700)
        cv.text(xpp, yl, "Y_{p}", size=28, color=INK, anchor="middle", weight=700)
    p.point(*e1, INK); p.point(*e2, GOLD)
    p.yaxis_arrow(e1[1], e2[1], DEP if up else APP, x_off=-118)
    p.xaxis_arrow(e1[0], e2[0], APP if right else DEP, y_off=76, w=5)
    cv.badge(1150, 60, note[0], note[1], size=24, anchor="end")
    save(name, cv, dict(title=title, labels=f"Y {e1[0]:.2f}->{e2[0]:.2f}, PL {e1[1]:.2f}->{e2[1]:.2f}, Yp={yp}",
                        eq1=e1, eq2=e2))


SR = L(1.0, 0.0)
adas("ER_16_ADAS_Depreciation_AD", "Depreciation raises AD (from a recessionary gap)",
     "₹ depreciates: net exports (X - M) rise, AD shifts right", L(-1, 9.0), L(-1, 11.0), SR, None, 6.2,
     ("Demand-pull pressure", GOLD_TXT))
adas("ER_17_ADAS_Depreciation_SRAS", "Depreciation raises costs: SRAS shifts left",
     "₹ depreciates: imported inputs cost more, SRAS shifts left", L(-1, 12.4), None, SR, L(1.0, 1.6), 6.2,
     ("Cost-push inflation", DEP))
adas("ER_18_ADAS_Appreciation_AD", "Appreciation lowers AD",
     "₹ appreciates: net exports (X - M) fall, AD shifts left", L(-1, 12.4), L(-1, 10.8), SR, None, 6.2,
     ("AD falls", GOLD_TXT))


# ============================================================== H: fixed rate maintained
cv = Canvas(1200, 1000, header="Fixed exchange rate", sub="Central bank defends the fixed rate (FR) against a fall in demand")
p = std_plot(cv, generic=True)
p.curve(D1, NAVY, label="D_{1}", dx=12, dy=4)
p.curve(D_dn, GOLD, label="D_{2}", dx=12, dy=4, label_color=GOLD_TXT)
p.curve(S1, NAVY, label="S", dx=12, dy=-8)
fr = intersect(D1, S1)[1]
p.hguide(fr, "FR", color=INK, xend=9.6, w=3.5, dash="16 8")
qd, qs = D_dn.x_at(fr), S1.x_at(fr)
bracket(cv, p, qd, qs, fr, "Excess supply", DEP, above=True, size=23)
mk = intersect(D_dn, S1)
p.guides(*mk, "ER_{2}", None, ycol=DEP)
a, b = p.px(*mk); cv.add(f'<circle cx="{a:.1f}" cy="{b:.1f}" r="10" fill="{PANEL}" stroke="{DEP}" stroke-width="4"/>')
cv.text(a - 20, b + 30, "if left to float", size=22, color=DEP, anchor="end", weight=600)
p.point(*intersect(D1, S1), INK, label="A", ldx=24, ldy=2)
p.point(qd, fr, GOLD, label="B", ldx=-20, ldy=32, lcol=GOLD_TXT)
# (1) demand falls: gold arrow D1 -> D2 low on the chart; (3) CB buys DC: blue arrow D2 -> D1 a little higher
p.shift_arrow(D1, D_dn, y=1.9)
p.shift_arrow(D_dn, D1, y=3.0, color=CB, w=6)
g = p.px(D1.x_at(1.9), 1.9); cv.step(g[0] + 34, g[1], 1, GOLD_TXT)
bl = p.px(D1.x_at(3.0), 3.0); cv.step(bl[0] + 34, bl[1], 3, CB)
lx, ly = p.px((qd + qs) / 2, fr)
cv.step(lx - 112, ly - 50, 2, DEP)
save("ER_19_Fixed_Rate_Maintained", cv, dict(title="Maintaining a fixed exchange rate",
     labels="FR fixed; D1->D2 creates excess supply B-A; CB buys DC with reserves shifting D back to D1"))

# ============================================================== H2: devaluation
cv = Canvas(1200, 1000, header="Fixed exchange rate", sub="Devaluation: the official fixed rate is lowered")
p = std_plot(cv, generic=True)
p.curve(D_dn, NAVY, label="D", dx=12, dy=4)
p.curve(S1, NAVY, label="S", dx=12, dy=-8)
fr1 = intersect(D1, S1)[1]
fr2 = intersect(D_dn, S1)[1]
p.hguide(fr1, "FR_{1}", color=GUIDE, xend=9.6, w=3.5, dash="16 8", lcol=MUTED)
p.hguide(fr2, "FR_{2}", color=INK, xend=9.6, w=3.5, dash="16 8")
cv.text(p.px(9.6, fr1)[0], p.px(0, fr1)[1] - 24, "old fixed rate", size=22, color=MUTED, anchor="end", weight=600)
cv.text(p.px(9.6, fr2)[0], p.px(0, fr2)[1] - 24, "new fixed rate", size=22, color=INK, anchor="end", weight=600)
bracket(cv, p, D_dn.x_at(fr1), S1.x_at(fr1), fr1, "Excess supply", DEP, above=True, size=23)
e2 = intersect(D_dn, S1)
p.point(*e2, DEP)
p.yaxis_arrow(fr1, fr2, DEP, x_off=-118)
cv.badge(1150, 60, "Devaluation", DEP, size=26, anchor="end")
save("ER_20_Devaluation", cv, dict(title="Devaluation of a fixed exchange rate",
     labels="FR1 unsustainable with persistent excess supply; authorities set lower FR2"))

# ============================================================== I: managed band
cv = Canvas(1200, 1000, header="Managed exchange rate (peg with a band)", sub="Rate floats inside the band; the central bank intervenes at the limits")
p = std_plot(cv, generic=True)
up_, tg, lo_ = 6.1, 5.1, 4.1
a, b = p.px(0, up_); c, d = p.px(9.6, lo_)
cv.rect(a, b, c - a, d - b, fill=GOLD, opacity=0.10)
p.hguide(up_, "Upper", color=GOLD, xend=9.6, w=3, dash="12 8", lcol=GOLD_TXT, size=24)
p.hguide(tg, "Target", color=GUIDE, xend=9.6, w=2.5, dash="6 8", lcol=MUTED, size=24)
p.hguide(lo_, "Lower", color=GOLD, xend=9.6, w=3, dash="12 8", lcol=GOLD_TXT, size=24)
cv.text(p.px(9.6, 0)[0], p.px(0, (up_ + tg) / 2)[1], "band", size=22, color=GOLD_TXT, anchor="end", weight=700)
D2b = L(-1, 7.6); D3b = L(-1, 11.6)
p.curve(D1, NAVY, label="D_{1}", dx=12, dy=4)
p.curve(D2b, GOLD, label="D_{2}", dx=12, dy=4, label_color=GOLD_TXT)
p.curve(D3b, GOLD, label="D_{3}", dx=12, dy=4, label_color=GOLD_TXT)
p.curve(S1, NAVY, label="S", dx=12, dy=-8)
e1 = intersect(D1, S1); e2 = intersect(D2b, S1); e3 = intersect(D3b, S1)
p.point(*e1, INK); p.point(*e2, GOLD); p.point(*e3, GOLD)
# CB buys at the lower limit (arrow up), sells at the upper limit (arrow down)
x2, y2 = p.px(*e2); x3, y3 = p.px(*e3)
cv.line(x2, y2 + 78, x2, y2 + 20, CB, 6, arrow_end=True)
cv.text(p.px(0.25, 0)[0], y2 + 66, "CB buys DC", size=24, color=CB, anchor="start", weight=700)
cv.line(x3, y3 - 78, x3, y3 - 20, CB, 6, arrow_end=True)
cv.text(p.px(6.3, 0)[0], y3 - 62, "CB sells DC", size=24, color=CB, anchor="start", weight=700)
save("ER_21_Managed_Band", cv, dict(title="Managed exchange rate within a band",
     labels="band 4.1-6.1 around target 5.1; D2 hits lower limit -> CB buys DC; D3 hits upper limit -> CB sells DC",
     e2=e2, e3=e3))

# ============================================================== J: over/undervalued
cv = Canvas(1600, 1000, header="Overvalued and undervalued currencies", sub="Official rate held away from the free-market equilibrium (ER_{e})")
for k, (x0, title, rate, lab, col, txt1, txt2) in enumerate([
        (200, "Overvalued", 6.9, "OR", DEP, "Excess supply of DC", "CB buys DC, sells reserves"),
        (960, "Undervalued", 3.3, "UR", APP, "Excess demand for DC", "CB sells DC, buys reserves")]):
    pp = Plot(cv, x0, 840, x0 + 500, 230, ylab=("Price of DC", "(US$ per DC)"), xlab=("Quantity of DC",)); pp.axes()
    pp.curve(D1, NAVY, label="D", dx=12, dy=4)
    pp.curve(S1, NAVY, label="S", dx=12, dy=-8)
    e = intersect(D1, S1)
    pp.guides(*e, "ER_{e}", None)
    pp.point(*e, INK)
    pp.hguide(rate, lab, color=col, xend=9.6, w=3.5, dash="16 8", lcol=col)
    xa, xb = sorted([D1.x_at(rate), S1.x_at(rate)])
    bracket(cv, pp, xa, xb, rate, txt1, col, above=(rate > e[1]), size=22)
    cv.text(x0 + 250, 960, f"{title}: {txt2}", size=24, color=INK, anchor="middle", weight=600)
save("ER_22_Over_Undervalued", cv, dict(title="Overvalued vs undervalued currency",
     labels="OR above ERe -> excess supply; UR below ERe -> excess demand"))

if __name__ == "__main__":
    import json
    with open(os.path.join(os.path.dirname(__file__), "register.json"), "w") as f:
        json.dump(REG, f, indent=1, default=str)
    for r in REG:
        print(r["file"], "|", r.get("labels"), "|", {k: v for k, v in r.items() if k.startswith("eq") or k.startswith("e")})
