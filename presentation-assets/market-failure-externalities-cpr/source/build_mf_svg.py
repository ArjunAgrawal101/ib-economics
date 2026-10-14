"""Market Failure deck: technical diagrams. Exact linear models; key values asserted.

Standard model used for the four externality diagrams (illustrative values, not shown on axes):
MPB = 130 - Q, MPC = 20 + Q  ->  market outcome Qe = 55, Pe = 75.
External effect per unit = 30 (parallel curves).
"""
import os, sys, math
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from mfsvg import *

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "svg")

MPB = lambda q: 130 - q
MPC = lambda q: 20 + q
E = 30
QE, PE = 55, 75
assert MPB(QE) == MPC(QE) == PE

KINDS = {
    # kind: (social fn, side, label of social curve, Qopt, Popt)
    "negprod": (lambda q: MPC(q) + E, "cost", 40, 90),
    "negcons": (lambda q: MPB(q) - E, "benefit", 40, 60),
    "posprod": (lambda q: MPC(q) - E, "cost", 70, 60),
    "poscons": (lambda q: MPB(q) + E, "benefit", 70, 90),
}
for k, (f, side, qo, po) in KINDS.items():
    other = MPB if side == "cost" else MPC
    assert abs(f(qo) - po) < 1e-9 and abs(other(qo) - po) < 1e-9, k


def ext_panel(cv, X0, Y0, X1, Y1, kind, s=1.0, legend_terms=True, arrow_q=None, show_title=None, wl_label=True,
              outcome_label=True, guides=True, ext_label=False, plabels=True, xlab_dy=None):
    """Draw one externality diagram. s scales fonts/strokes."""
    soc, side, QO, PO = KINDS[kind]
    col = RED if side == "cost" else BLUE
    ax = Ax(cv, X0, Y0, X1, Y1, xmax=100, ymax=150)
    fs = 36 * s
    # welfare loss first (under curves)
    if kind == "negprod":
        tri = [(QO, PO), (QE, soc(QE)), (QE, MPB(QE))]
    elif kind == "negcons":
        tri = [(QO, PO), (QE, MPC(QE)), (QE, soc(QE))]
    elif kind == "posprod":
        tri = [(QE, MPB(QE)), (QE, soc(QE)), (QO, PO)]
    else:
        tri = [(QE, soc(QE)), (QE, MPC(QE)), (QO, PO)]
    ax.area(tri, WL, 0.30)
    # guides
    if guides:
        lo, hi = (QO, QE) if QO < QE else (QE, QO)
        ax.vguide(QE, PE, "Q_{e}", size=fs, color=NAVY)
        ax.vguide(QO, PO, "Q_{opt}", size=fs, color=GOLDD)
        ax.hguide(QE, PE, "P_{e}" if plabels else None, size=fs, color=NAVY)
        ax.hguide(QO, PO, "P_{opt}" if plabels else None, size=fs, color=GOLDD)
    # curves
    w = 7 * s
    if side == "cost":
        ax.fn(MPC, 5, 95, NAVY, w)
        q0 = 5 if kind == "negprod" else 15
        q1 = 90 if kind == "negprod" else 95
        ax.fn(soc, q0, q1, col, w)
        ax.fn(MPB, 10, 95, NAVY, w)
        ax.label(95, MPC(95), "MPC", size=fs * 1.08, color=NAVY, dx=16 * s, dy=0)
        ax.label(q1, soc(q1), "MSC", size=fs * 1.08, color=col, dx=16 * s, dy=0)
        ax.label(95, MPB(95), "MPB = MSB", size=fs * 1.08, color=NAVY, dx=16 * s, dy=0)
    else:
        ax.fn(MPC, 5, 95, NAVY, w)
        ax.fn(MPB, 10, 95, NAVY, w)
        q0 = 15 if kind == "poscons" else 10
        q1 = 88 if kind == "negcons" else 95
        ax.fn(soc, q0, q1, col, w)
        ax.label(95, MPC(95), "MPC = MSC", size=fs * 1.08, color=NAVY, dx=16 * s)
        ax.label(95, MPB(95), "MPB", size=fs * 1.08, color=NAVY, dx=22 * s, dy=(-6 if kind == "negcons" else 10) * s)
        ax.label(q1, soc(q1), "MSB", size=fs * 1.08, color=col, dx=22 * s, dy=(6 if kind == "negcons" else -6) * s)
    ax.axes(size=fs * 0.92, xlab_dy=xlab_dy)
    # external effect double arrow
    aq = arrow_q if arrow_q is not None else {"negprod": 18, "negcons": 20, "posprod": 86, "poscons": 20}[kind]
    if side == "cost":
        y0, y1 = MPC(aq), soc(aq)
    else:
        y0, y1 = MPB(aq), soc(aq)
    ax.darrow(aq, y0, y1, col, 5 * s)
    if ext_label:
        word = {"negprod": "external cost", "negcons": "external cost", "posprod": "external benefit", "poscons": "external benefit"}[kind]
        if kind == "negprod":
            ax.label(aq, (y0 + y1) / 2, word, size=fs * 0.74, color=col, dx=-18 * s, anchor="end", weight=700)
            ax.label(aq, (y0 + y1) / 2, "per unit", size=fs * 0.74, color=col, dx=-18 * s, dy=fs * 0.86, anchor="end", weight=600)
        elif kind == "negcons":
            ax.label(aq, (y0 + y1) / 2 + 4, word, size=fs * 0.74, color=col, dx=16 * s, anchor="start")
            ax.label(aq, (y0 + y1) / 2 + 4, "per unit", size=fs * 0.74, color=col, dx=16 * s, dy=fs * 0.86, anchor="start", weight=600)
        elif kind == "posprod":
            ax.label(aq, (y0 + y1) / 2, word, size=fs * 0.74, color=col, dx=16 * s, anchor="start")
            ax.label(aq, (y0 + y1) / 2, "per unit", size=fs * 0.74, color=col, dx=16 * s, dy=fs * 0.86, anchor="start", weight=600)
        else:
            ax.label(aq, (y0 + y1) / 2, word, size=fs * 0.74, color=col, dx=-18 * s, anchor="end")
            ax.label(aq, (y0 + y1) / 2, "per unit", size=fs * 0.74, color=col, dx=-18 * s, dy=fs * 0.86, anchor="end", weight=600)
    # points
    ax.dot(QE, PE, 13 * s, NAVY)
    ax.ring(QO, PO, 15 * s, GOLDD)
    # quantity gap
    if outcome_label:
        word = {"negprod": "overproduction", "negcons": "overconsumption", "posprod": "underproduction", "poscons": "underconsumption"}[kind]
        a, _ = ax.px(QO, 0)
        b, _ = ax.px(QE, 0)
        yy = Y0 + fs * 2.2
        cv.line(a, yy, b, yy, col, 5 * s, end=True, head=20)
        cv.text((a + b) / 2, yy + fs * 0.95, word, size=fs * 0.78, color=col, anchor="middle", weight=700)
    if wl_label:
        cx = sum(p[0] for p in tri) / 3
        cy = sum(p[1] for p in tri) / 3
        tx, ty = {"negprod": (70, 52), "negcons": (46, 14), "posprod": (63, 16), "poscons": (31, 139)}[kind]
        a, b = ax.px(cx, cy)
        c, d = ax.px(tx, ty)
        cv.line(c, d, a, b, WL, 3 * s, end=True, head=16)
        anchor = "start" if tx > cx else "end"
        cv.text(c + (8 if anchor == "start" else -8), d + (14 if ty < cy else -14), "welfare loss", size=fs * 0.78, color=WL, anchor=anchor, weight=700)
    return ax


def legend(cv, x, y, s=1.0, side="cost", rows=2, gap=None):
    """Two-row legend matching the atlas: market, optimum / welfare loss, external effect per unit."""
    fs = 28 * s
    col = RED if side == "cost" else BLUE
    lh = gap or fs * 1.6
    cv.circle(x + 12 * s, y, 11 * s, NAVY)
    cv.text(x + 34 * s, y, "Market outcome: MPB = MPC", size=fs, color=NAVY, weight=600)
    x2 = x + 34 * s + 26 * fs * 0.56 + 40 * s
    cv.ring(x2 + 12 * s, y, 13 * s, GOLDD)
    cv.text(x2 + 36 * s, y, "Social optimum: MSB = MSC", size=fs, color=GOLDD, weight=600)
    y2 = y + lh
    cv.poly([(x, y2 + 13 * s), (x + 28 * s, y2 + 13 * s), (x + 28 * s, y2 - 13 * s)], WL, 0.45)
    cv.text(x + 40 * s, y2, "Welfare loss", size=fs, color=WL, weight=600)
    cv.line(x2 + 12 * s, y2 - 15 * s, x2 + 12 * s, y2 + 15 * s, col, 4 * s, end=True, start=True, head=12 * s)
    word = "cost" if side == "cost" else "benefit"
    cv.text(x2 + 36 * s, y2, "External effect per unit", size=fs, color=col, weight=600)


# ===================================================== single externality diagrams (slides 8, 10, 12, 14)
TITLES = {"negprod": "MF_08_Negative_Production_Externality", "negcons": "MF_10_Negative_Consumption_Externality",
          "posprod": "MF_12_Positive_Production_Externality", "poscons": "MF_14_Positive_Consumption_Externality"}
for kind, name in TITLES.items():
    cv = Canvas(1180, 1050)
    ext_panel(cv, 230, 760, 880, 170, kind)
    legend(cv, 60, 965, side=KINDS[kind][1])
    cv.save(OUT, name)


# ===================================================== MF_05 allocative efficiency (no externality)
cv = Canvas(1180, 1000)
ax = Ax(cv, 230, 760, 880, 170, xmax=100, ymax=150)
ax.area([(0, MPB(0)), (QE, PE), (0, PE)], BLUE, 0.16)
ax.area([(0, MPC(0)), (QE, PE), (0, PE)], RED, 0.14)
ax.vguide(QE, PE, "Q_{e} = Q_{opt}", size=36)
ax.hguide(QE, PE, "P_{e}", size=36)
ax.fn(MPC, 0, 95, NAVY, 7)
ax.fn(MPB, 0, 95, NAVY, 7)
ax.label(95, MPC(95), "MPC = MSC", size=38, dx=18)
ax.label(95, MPB(95), "MPB = MSB", size=38, dx=18)
ax.axes(size=33)
ax.label(14, 103, "Consumer", size=31, color=BLUE, weight=700)
ax.label(14, 103, "surplus", size=31, color=BLUE, dy=36, weight=700)
ax.label(14, 54, "Producer", size=31, color=RED, weight=700)
ax.label(14, 54, "surplus", size=31, color=RED, dy=36, weight=700)
ax.ring(QE, PE, 22, GOLDD)
ax.dot(QE, PE, 10, NAVY)
cv.text(60, 905, "Community surplus = consumer + producer surplus,", size=30, color=GOLDD, weight=700)
cv.text(60, 950, "maximised where MSB = MSC.", size=30, color=GOLDD, weight=700)
cv.save(OUT, "MF_05_Allocative_Efficiency")

# ===================================================== MF_15 four-panel atlas
cv = Canvas(2440, 1420)
panels = [("negprod", 0, 0, "Negative production", "MSC > MPC", "MPB = MSB", "Q_{e} > Q_{opt}", "power-station pollution"),
          ("negcons", 1, 0, "Negative consumption", "MSB < MPB", "MPC = MSC", "Q_{e} > Q_{opt}", "second-hand smoke"),
          ("posprod", 0, 1, "Positive production", "MSC < MPC", "MPB = MSB", "Q_{e} < Q_{opt}", "R&D spillovers"),
          ("poscons", 1, 1, "Positive consumption", "MSB > MPB", "MPC = MSC", "Q_{e} < Q_{opt}", "vaccination")]
cv.text(30, 34, "PRODUCTION: THE COST SIDE DIVERGES", size=30, color=RED, weight=700, family=MONO, spacing=2)
cv.text(1250, 34, "CONSUMPTION: THE BENEFIT SIDE DIVERGES", size=30, color=BLUE, weight=700, family=MONO, spacing=2)
for kind, col_i, row_i, title, r1, r2, r3, ex in panels:
    ox, oy = 20 + col_i * 1220, 70 + row_i * 630
    side = KINDS[kind][1]
    c = RED if side == "cost" else BLUE
    cv.rect(ox, oy, 1180, 600, fill="#F7F2E8", rx=18)
    cv.rect(ox, oy, 12, 600, fill=c, rx=4)
    ext_panel(cv, ox + 130, oy + 465, ox + 520, oy + 95, kind, s=0.82, wl_label=False, outcome_label=False, plabels=False, xlab_dy=92)
    tx = ox + 720
    cv.text(tx, oy + 70, title, size=39, color=NAVY, weight=600, family=SERIF)
    cv.text(tx, oy + 150, r1, size=40, color=c, weight=800)
    cv.text(tx, oy + 215, r2, size=40, color=NAVY, weight=700)
    cv.text(tx, oy + 290, r3, size=48, color=GOLDD, weight=800)
    word = {"negprod": "overproduction", "negcons": "overconsumption", "posprod": "underproduction", "poscons": "underconsumption"}[kind]
    cv.text(tx, oy + 355, word, size=34, color=c, weight=700)
    cv.text(tx, oy + 450, "Example:", size=30, color=GREY, weight=600)
    cv.text(tx, oy + 495, ex, size=30, color=GREY, weight=600)
legend(cv, 560, 1340, s=1.0)
cv.save(OUT, "MF_15_Four_Externalities_Atlas")

# ===================================================== MF_16 HL welfare loss calculation (atlas E07 values)
B = lambda q: 120 - q
C = lambda q: 20 + q
SC = lambda q: 40 + q
qe, pe, qo, po = 50, 70, 40, 80
assert B(qe) == C(qe) == pe and B(qo) == SC(qo) == po
height, base = SC(qe) - B(qe), qe - qo
wl = 0.5 * base * height
assert (height, base, wl) == (20, 10, 100.0)
cv = Canvas(1200, 980)
ax = Ax(cv, 240, 790, 880, 170, xmax=100, ymax=130)
ax.area([(qo, po), (qe, SC(qe)), (qe, B(qe))], WL, 0.32)
for q, lab, col in [(qo, "40", GOLDD), (qe, "50", NAVY)]:
    pass
ax.vguide(qe, SC(qe), None)
ax.vguide(qo, po, None)
ax.hguide(qe, SC(qe), "90", size=34)
ax.hguide(qo, po, "80", size=34, color=GOLDD)
ax.hguide(qe, pe, "70", size=34)
ax.fn(C, 0, 95, NAVY, 7)
ax.fn(SC, 0, 85, RED, 7)
ax.fn(B, 0, 95, NAVY, 7)
ax.label(95, C(95), "MPC = 20 + Q", size=33, dx=16)
ax.label(85, SC(85), "MSC = 40 + Q", size=33, color=RED, dx=16)
ax.label(95, B(95), "MPB = MSB = 120 − Q", size=33, dx=-150, dy=46)
ax.axes(ylab="Costs and benefits ($ per unit)", xlab="Quantity (units)", size=31)
a, _ = ax.px(qo, 0); b, _ = ax.px(qe, 0)
cv.text(a, 790 + 38, "40", size=34, color=GOLDD, anchor="middle", weight=700)
cv.text(b, 790 + 38, "50", size=34, color=NAVY, anchor="middle", weight=700)
cv.text(a, 790 + 78, "Q_{opt}", size=30, color=GOLDD, anchor="middle", weight=700)
cv.text(b, 790 + 78, "Q_{e}", size=30, color=NAVY, anchor="middle", weight=700)
# base bracket (horizontal) and height bracket (vertical)
x1, y1 = ax.px(qo, 132 - 2)
_, ytop = ax.px(qe, SC(qe))
_, ybot = ax.px(qe, B(qe))
xa, _ = ax.px(qo, 0); xb, _ = ax.px(qe, 0)
yb = ytop - 70
cv.line(xa, yb, xb, yb, PURPLE, 4, end=True, start=True, head=16)
cv.text((xa + xb) / 2, yb - 30, "base = 50 − 40 = 10", size=31, color=PURPLE, anchor="middle", weight=700)
xh = xb + 46
cv.line(xh, ytop, xh, ybot, PURPLE, 4, end=True, start=True, head=16)
cv.text(xh + 18, (ytop + ybot) / 2 - 18, "height = 90 − 70", size=31, color=PURPLE, weight=700)
cv.text(xh + 18, (ytop + ybot) / 2 + 20, "= $20", size=31, color=PURPLE, weight=700)
ax.dot(qe, pe, 12, NAVY)
ax.ring(qo, po, 14, GOLDD)
cv.pill(1180, 40, "Illustrative values", GREY, size=26, anchor="end")
cv.text(80, 940, "Welfare loss = ½ × base × height = ½ × 10 × $20 = $100", size=36, color=WL, weight=800)
cv.save(OUT, "MF_16_HL_Welfare_Loss_Calculation")

# ===================================================== MF_20 Pigouvian tax on a negative production externality
cv = Canvas(1240, 930)
ax = Ax(cv, 230, 760, 880, 170, xmax=100, ymax=150)
QO, PO = 40, 90
PP = MPC(QO)
assert PP == 60 and MPB(QO) == PO
ax.area([(0, PO), (QO, PO), (QO, PP), (0, PP)], GOLD, 0.22)
ax.vguide(QE, PE, "Q_{e}", size=36)
ax.vguide(QO, PO, "Q_{opt}", size=36, color=GOLDD)
ax.hguide(QO, PO, "P_{c} = P_{opt}", size=33, color=GOLDD)
ax.hguide(QE, PE, "P_{e}", size=33)
ax.hguide(QO, PP, "P_{p}", size=33)
ax.fn(MPC, 5, 95, NAVY, 7)
ax.fn(lambda q: MPC(q) + E, 5, 90, RED, 7)
ax.fn(MPB, 10, 95, NAVY, 7)
ax.label(95, MPC(95), "MPC", size=38, dx=16)
ax.label(90, MPC(90) + E, "MSC = MPC + tax", size=36, color=RED, dx=16)
ax.label(95, MPB(95), "MPB = MSB", size=38, dx=16)
ax.axes(size=33)
# tax arrow at Qopt
a, b = ax.px(QO + 0.01, PP)
_, d = ax.px(QO, PO)
ax.seg(62, MPC(62) + 3, 62, MPC(62) + E - 3, RED, 6, end=True, head=22)
ax.label(60, 127, "tax per unit =", size=29, color=RED, anchor="end")
ax.label(60, 127, "external cost", size=29, color=RED, anchor="end", dy=34)
ax.label(15, 84, "tax revenue", size=29, color=GOLDD, anchor="middle")
ax.dot(QE, PE, 12, NAVY)
ax.ring(QO, PO, 15, GOLDD)
a, _ = ax.px(QE, 0); b, _ = ax.px(QO, 0)
cv.line(a, 760 + 80, b, 760 + 80, RED, 5, end=True, head=20)
cv.text((a + b) / 2, 760 + 115, "output falls to Q_{opt}", size=29, color=RED, anchor="middle", weight=700)
cv.save(OUT, "MF_20_Pigouvian_Tax")

# ===================================================== MF_19 carbon tax on a polluting industry (two panels)
cv = Canvas(1250, 1110)
# (a) market for electricity from coal
axa = Ax(cv, 200, 780, 840, 190, xmax=100, ymax=150)
S1 = MPC
S2 = lambda q: MPC(q) + 20
q1, p1 = QE, PE
q2 = 45; p2 = MPB(q2)
assert S2(q2) == p2 == 85
axa.vguide(q1, p1, "Q_{1}", size=34); axa.vguide(q2, p2, "Q_{2}", size=34, color=RED)
axa.hguide(q1, p1, "P_{1}", size=34); axa.hguide(q2, p2, "P_{2}", size=34, color=RED)
axa.fn(S1, 5, 95, NAVY, 7); axa.fn(S2, 5, 92, RED, 7); axa.fn(MPB, 10, 95, NAVY, 7)
axa.label(95, S1(95), "S_{1} = MPC", size=34, dx=14)
axa.label(92, S2(92), "S_{2} = MPC + carbon tax", size=34, color=RED, dx=-8, dy=-40, anchor="end")
axa.label(95, MPB(95), "D", size=36, dx=14)
axa.axes(ylab="Price of electricity ($ per MWh)", xlab="Quantity of electricity (MWh)", size=30, xlab_dy=110)
axa.seg(75, S1(75) + 3, 75, S2(75) - 3, RED, 6, end=True, head=20)
axa.dot(q1, p1, 12, NAVY); axa.dot(q2, p2, 12, RED)
cv.text(200, 60, "The market for coal-fired electricity", size=38, color=NAVY, weight=600, family=SERIF)
cv.text(200, 975, "Tax per MWh = carbon tax per tonne × tonnes of CO_{2} per MWh", size=30, color=RED, weight=700)
cv.text(200, 1025, "Price rises from P_{1} to P_{2}; output falls from Q_{1} to Q_{2}.", size=30, color=NAVY, weight=600)
cv.save(OUT, "MF_19_Carbon_Tax_Polluting_Industry")
# (b) over time: lower emissions per unit lowers MSC (optional asset)
cv = Canvas(1250, 1110)
axb = Ax(cv, 200, 780, 840, 190, xmax=100, ymax=150)
M1 = lambda q: MPC(q) + 50
M2 = lambda q: MPC(q) + 20
qo1 = 30; qo2 = 45
assert M1(qo1) == MPB(qo1) and M2(qo2) == MPB(qo2)
axb.vguide(qo1, MPB(qo1), "Q_{opt1}", size=32, color=RED)
axb.vguide(qo2, MPB(qo2), "Q_{opt2}", size=32, color=GOLDD)
axb.vguide(QE, PE, "Q_{e}", size=32)
axb.fn(MPC, 5, 95, NAVY, 7)
axb.fn(M1, 5, 75, RED, 7)
axb.fn(M2, 5, 92, RED, 5)
axb.fn(MPB, 10, 95, NAVY, 7)
axb.label(95, MPC(95), "MPC", size=34, dx=14, dy=34)
axb.label(75, M1(75), "MSC_{1}: high-carbon", size=30, color=RED, dx=14, dy=-4)
axb.label(92, M2(92), "MSC_{2}: cleaner", size=30, color=RED, dx=14, dy=0)
axb.label(95, MPB(95), "MPB = MSB", size=34, dx=14)
axb.axes(ylab="Costs and benefits ($ per MWh)", xlab="Quantity of electricity (MWh)", size=30, xlab_dy=125)
axb.seg(20, M1(20) - 3, 20, M2(20) + 3, RED, 6, end=True, head=20)
axb.ring(qo1, MPB(qo1), 13, RED); axb.ring(qo2, MPB(qo2), 13, GOLDD)
axb.dot(QE, PE, 11, NAVY)
cv.text(200, 60, "Over time: cleaner methods", size=38, color=NAVY, weight=600, family=SERIF)
cv.text(200, 975, "Lower emissions per MWh shrink the external cost:", size=30, color=RED, weight=700)
cv.text(200, 1025, "MSC falls, so the optimum rises from Q_{opt1} to Q_{opt2}.", size=30, color=NAVY, weight=600)
cv.save(OUT, "MF_19b_Carbon_Tax_Cleaner_Methods")

# ===================================================== MF_22 tradable permits market
cv = Canvas(1180, 1010)
ax = Ax(cv, 240, 770, 880, 180, xmax=100, ymax=150)
Dp = lambda q: 135 - 1.2 * q
c1, c2 = 70, 50
pp1, pp2 = Dp(c1), Dp(c2)
assert round(pp1, 6) == 51 and round(pp2, 6) == 75
ax.vguide(c2, pp2, "Q_{2}", size=34, color=GREEN); ax.vguide(c1, pp1, "Q_{1}", size=34)
ax.hguide(c2, pp2, "P_{2}", size=34, color=GREEN); ax.hguide(c1, pp1, "P_{1}", size=34)
ax.seg(c1, 0, c1, 140, NAVY, 7); ax.seg(c2, 0, c2, 140, GREEN, 7)
ax.fn(Dp, 5, 100, NAVY, 7)
ax.label(c1, 140, "S_{1}: cap", size=34, dx=14, dy=6)
ax.label(c2, 140, "S_{2}: tighter cap", size=34, color=GREEN, dx=-14, dy=6, anchor="end")
ax.label(100, Dp(100), "D", size=36, dx=14)
ax.axes(ylab="Price of a permit ($ per tonne of CO_{2})", xlab="Quantity of permits (tonnes of CO_{2})", size=30, xlab_dy=100)
a, b = ax.px(c1, 112); c, _ = ax.px(c2, 112)
cv.line(a - 10, b, c + 12, b, GREEN, 6, end=True, head=22)
ax.dot(c1, pp1, 12, NAVY); ax.dot(c2, pp2, 12, GREEN)
cv.text(60, 930, "The cap fixes the quantity of emissions allowed: supply is perfectly inelastic.", size=29, color=NAVY, weight=600)
cv.text(60, 975, "Trading sets the permit price; a tighter cap (or higher demand) raises it.", size=29, color=GREEN, weight=700)
cv.save(OUT, "MF_22_Tradable_Permits_Market")

# ===================================================== MF_23 legislation: a legal limit on output
cv = Canvas(1220, 930)
ax = Ax(cv, 230, 760, 880, 170, xmax=100, ymax=150)
soc = lambda q: MPC(q) + E
ax.vguide(QE, PE, "Q_{e}", size=36)
ax.hguide(QE, PE, "P_{e}", size=33)
ax.hguide(40, 90, "P_{opt}", size=33, color=GOLDD)
ax.fn(MPC, 5, 95, NAVY, 7); ax.fn(soc, 5, 90, RED, 7); ax.fn(MPB, 10, 95, NAVY, 7)
ax.seg(40, 0, 40, 138, GREEN, 8, dash="22 14")
ax.label(40, 138, "legal limit", size=33, color=GREEN, dx=-14, dy=8, anchor="end")
ax.label(95, MPC(95), "MPC", size=38, dx=16)
ax.label(90, soc(90), "MSC", size=38, color=RED, dx=16)
ax.label(95, MPB(95), "MPB = MSB", size=38, dx=16)
ax.axes(size=33)
a, _ = ax.px(40, 0)
cv.text(a, 760 + 38, "Q_{opt}", size=36, color=GREEN, anchor="middle", weight=700)
b, _ = ax.px(QE, 0)
cv.line(b, 760 + 85, a, 760 + 85, GREEN, 5, end=True, head=20)
cv.text((a + b) / 2, 760 + 122, "output capped", size=29, color=GREEN, anchor="middle", weight=700)
ax.dot(QE, PE, 12, NAVY); ax.ring(40, 90, 15, GOLDD)
cv.save(OUT, "MF_23_Legislation_Output_Limit")

# ===================================================== MF_24 education on a negative consumption externality
cv = Canvas(1240, 930)
ax = Ax(cv, 230, 760, 880, 170, xmax=100, ymax=150)
MSBc = lambda q: MPB(q) - E
ax.vguide(QE, PE, "Q_{e}", size=36); ax.vguide(40, 60, "Q_{opt}", size=36, color=GOLDD)
ax.hguide(QE, PE, "P_{e}", size=33); ax.hguide(40, 60, "P_{opt}", size=33, color=GOLDD)
ax.fn(MPC, 5, 95, NAVY, 7); ax.fn(MPB, 10, 95, NAVY, 7); ax.fn(MSBc, 10, 88, BLUE, 7)
ax.label(95, MPC(95), "MPC = MSC", size=38, dx=16)
ax.label(95, MPB(95), "MPB_{1}", size=38, dx=22, dy=-8)
ax.label(88, MSBc(88), "MPB_{2} = MSB", size=36, color=BLUE, dx=22, dy=6)
ax.axes(size=33)
ax.seg(24, MPB(24) - 4, 24, MSBc(24) + 4, BLUE, 6, end=True, head=22)
ax.label(14, 132, "campaign lowers perceived benefit", size=28, color=BLUE)
ax.dot(QE, PE, 12, NAVY); ax.ring(40, 60, 15, GOLDD)
a, _ = ax.px(QE, 0); b, _ = ax.px(40, 0)
cv.line(a, 760 + 85, b, 760 + 85, BLUE, 5, end=True, head=20)
cv.text((a + b) / 2, 760 + 122, "consumption falls", size=29, color=BLUE, anchor="middle", weight=700)
cv.save(OUT, "MF_24_Education_Negative_Consumption")

# ===================================================== MF_25 producer and consumer subsidies (two panels)
cv = Canvas(2300, 1090)
# (a) producer subsidy, positive production externality: MPC - s = MSC
axa = Ax(cv, 200, 780, 840, 190, xmax=100, ymax=150)
sP = lambda q: MPC(q) - E
axa.vguide(QE, PE, "Q_{e}", size=34); axa.vguide(70, 60, "Q_{opt}", size=34, color=GOLDD)
axa.hguide(QE, PE, "P_{e}", size=34); axa.hguide(70, 60, "P_{opt}", size=34, color=GOLDD)
axa.fn(MPC, 5, 95, NAVY, 7); axa.fn(sP, 15, 95, RED, 7); axa.fn(MPB, 10, 95, NAVY, 7)
axa.label(95, MPC(95), "MPC", size=36, dx=14)
axa.label(95, sP(95), "MPC − s = MSC", size=34, color=RED, dx=14)
axa.label(95, MPB(95), "MPB = MSB", size=36, dx=14)
axa.axes(size=30)
axa.seg(84, MPC(84) - 3, 84, sP(84) + 3, RED, 6, end=True, head=20)
axa.label(84, MPC(84) - E / 2, "s", size=36, color=RED, dx=-18, anchor="end", weight=800)
axa.dot(QE, PE, 12, NAVY); axa.ring(70, 60, 14, GOLDD)
cv.text(200, 60, "(a) Producer subsidy: paid to firms", size=38, color=NAVY, weight=600, family=SERIF)
cv.text(200, 925, "Supply shifts down by s: the price falls and output rises to Q_{opt}.", size=30, color=NAVY, weight=600)
cv.text(200, 975, "Example: R&D tax credits for firms.", size=30, color=GREY, weight=600)
# (b) consumer subsidy (voucher), positive consumption externality: MPB + s = MSB
axb = Ax(cv, 1380, 780, 2020, 190, xmax=100, ymax=150)
sC = lambda q: MPB(q) + E
pnet = 90 - E
axb.vguide(QE, PE, "Q_{e}", size=34); axb.vguide(70, 90, "Q_{opt}", size=34, color=GOLDD)
axb.hguide(70, 90, "P_{opt}", size=34, color=GOLDD); axb.hguide(QE, PE, "P_{e}", size=34)
axb.hguide(70, pnet, "P_{net}", size=34, color=BLUE)
axb.fn(MPC, 5, 95, NAVY, 7); axb.fn(MPB, 10, 95, NAVY, 7); axb.fn(sC, 15, 95, BLUE, 7)
axb.label(95, MPC(95), "MPC = MSC", size=34, dx=14)
axb.label(95, MPB(95), "MPB", size=36, dx=14)
axb.label(95, sC(95), "MPB + s = MSB", size=34, color=BLUE, dx=14)
axb.axes(size=30)
axb.seg(24, MPB(24) + 3, 24, sC(24) - 3, BLUE, 6, end=True, head=20)
axb.label(24, MPB(24) + E / 2, "s", size=36, color=BLUE, dx=-18, anchor="end", weight=800)
axb.dot(QE, PE, 12, NAVY); axb.ring(70, 90, 14, GOLDD)
assert pnet == 60
cv.text(1380, 60, "(b) Consumer subsidy: paid to buyers (voucher)", size=38, color=NAVY, weight=600, family=SERIF)
cv.text(1380, 925, "Demand shifts up by s: the shelf price rises, but buyers pay", size=30, color=NAVY, weight=600)
cv.text(1380, 975, "only P_{net} = P_{opt} − s, and use rises to Q_{opt}.", size=30, color=BLUE, weight=700)
cv.save(OUT, "MF_25_Subsidies_Producer_and_Consumer")

# ===================================================== MF_34 common pool resource: one-season extraction model
cv = Canvas(1180, 1110)
ax = Ax(cv, 230, 760, 880, 170, xmax=100, ymax=150)
DEP = lambda q: MPC(q) + E
ax.area([(40, 90), (QE, DEP(QE)), (QE, MPB(QE))], WL, 0.30)
ax.vguide(QE, PE, "Q_{e}", size=36); ax.vguide(40, 90, "Q_{opt}", size=36, color=GOLDD)
ax.fn(MPC, 5, 95, NAVY, 7); ax.fn(DEP, 5, 90, GREEN, 7); ax.fn(MPB, 10, 95, NAVY, 7)
ax.label(95, MPC(95), "MPC", size=36, dx=16)
ax.label(95, MPC(95), "fuel, crew, gear", size=26, color=GREY, dx=16, dy=36, weight=600)
ax.label(90, DEP(90), "MSC = MPC + depletion cost", size=33, color=GREEN, dx=-6, dy=-40, anchor="end")
ax.label(95, MPB(95), "MPB = MSB", size=36, dx=16)
ax.label(95, MPB(95), "value of the catch", size=26, color=GREY, dx=16, dy=36, weight=600)
ax.axes(ylab="Costs and benefits ($ per tonne)", xlab="Catch this season (tonnes)", size=31, xlab_dy=190)
ax.seg(18, MPC(18) + 3, 18, DEP(18) - 3, GREEN, 5, end=True, start=True, head=18)
ax.dot(QE, PE, 12, NAVY); ax.ring(40, 90, 15, GOLDD)
a, _ = ax.px(40, 0); b, _ = ax.px(QE, 0)
cv.line(a, 760 + 85, b, 760 + 85, GREEN, 5, end=True, head=20)
cv.text((a + b) / 2, 760 + 122, "overfishing", size=29, color=GREEN, anchor="middle", weight=700)
cv.text(60, 1020, "Depletion cost: a smaller stock raises other fishers' costs", size=29, color=GREEN, weight=700)
cv.text(60, 1064, "and lowers future catches. Simplified: one season only.", size=29, color=GREY, weight=600)
cv.pill(1170, 40, "Simplified model", GREY, size=26, anchor="end")
cv.save(OUT, "MF_34_CPR_Extraction_Model")

# ===================================================== MF_33 stock, extraction and regeneration
cv = Canvas(2400, 1050)

def tank(cx, top, w, h, level, inflow, label, sub, col):
    x0 = cx - w / 2
    cv.rect(x0, top, w, h, fill="#FFFFFF", stroke=NAVY, sw=5, rx=18)
    lh = h * level
    cv.rect(x0 + 6, top + h - lh, w - 12, lh - 6, fill=col, op=0.28, rx=12)
    cv.text(cx, top + h - lh / 2, "STOCK", size=34, color=NAVY, anchor="middle", weight=800, family=MONO, spacing=3)
    cv.text(cx, top - 95, label, size=40, color=NAVY, anchor="middle", weight=600, family=SERIF, halo=False)
    cv.text(cx, top - 45, sub, size=28, color=GREY, anchor="middle", weight=600, halo=False)
    # outflow
    cv.line(x0 + w, top + h - 60, x0 + w + 200, top + h - 60, RED, 18, end=True, head=46, cap="butt")
    cv.text(x0 + w + 110, top + h - 10, "Extraction", size=31, color=RED, anchor="middle", weight=800)
    if inflow:
        cv.line(x0 - 200, top + 60, x0, top + 60, GREEN, 18, end=True, head=46, cap="butt")
        cv.text(x0 - 110, top + 10, "Regeneration", size=31, color=GREEN, anchor="middle", weight=800)
        cv.text(x0 - 110, top + 118, "natural growth", size=26, color=GREEN, anchor="middle", weight=600)
    else:
        cv.text(x0 - 110, top + 60, "no inflow", size=29, color=GREY, anchor="middle", weight=700)
        cv.text(x0 - 110, top + 100, "(or negligible)", size=26, color=GREY, anchor="middle", weight=600)

tank(520, 230, 360, 340, 0.62, True, "Renewable resource", "fish, groundwater, forests", GREEN)
cv.text(80, 680, "Extraction ≤ regeneration", size=31, color=GREEN, weight=800)
cv.text(80, 722, "→ stock is maintained: sustainable use", size=29, color=NAVY, weight=600)
cv.text(80, 790, "Extraction > regeneration, year after year", size=31, color=RED, weight=800)
cv.text(80, 832, "→ stock falls: depletion; past a threshold,", size=29, color=NAVY, weight=600)
cv.text(80, 872, "    regeneration itself can collapse", size=29, color=NAVY, weight=600)
tank(1300, 230, 300, 340, 0.45, False, "Non-renewable resource", "coal, oil, minerals", GREY)
cv.text(980, 680, "Any extraction depletes a", size=31, color=RED, weight=800)
cv.text(980, 722, "finite stock over the relevant period", size=29, color=NAVY, weight=600)
cv.text(980, 790, "Sustainability question: the rate of use,", size=29, color=NAVY, weight=600)
cv.text(980, 832, "substitutes, and external costs of use", size=29, color=NAVY, weight=600)
# growth curve panel
ax = Ax(cv, 1760, 760, 2280, 250, xmax=100, ymax=30)
G = lambda S: 0.4 * S * (1 - S / 100) / 1.0
assert abs(G(50) - 10) < 1e-9
pts = [ax.px(S, G(S)) for S in [i for i in range(0, 101, 2)]]
cv.path("M" + " L".join(f"{a:.1f},{b:.1f}" for a, b in pts), GREEN, 7)
ax.seg(0, 10, 100, 10, GUIDE, 3, dash="10 9")
ax.ring(50, 10, 14, GOLDD)
ax.label(50, 10, "MSY", size=34, color=GOLDD, dy=-40, anchor="middle")
ax.seg(0, 6.4, 100, 6.4, RED, 4)
ax.label(100, 6.4, "catch h", size=28, color=RED, dx=-4, dy=-24, anchor="end")
ax.axes(ylab="Natural growth per year", xlab="Stock size", size=28, xlab_dy=60, origin=True)
cv.text(1700, 70, "Maximum sustainable yield", size=36, color=NAVY, weight=600, family=SERIF)
cv.pill(1700, 130, "Supplementary · simplified model", GREY, size=24)
cv.text(1700, 880, "Growth is largest at a middle stock size.", size=27, color=NAVY, weight=600)
cv.text(1700, 922, "Real ecosystems: uncertain, shifting, with", size=27, color=GREY, weight=600)
cv.text(1700, 962, "tipping points; MSY is hard to know.", size=27, color=GREY, weight=600)
cv.save(OUT, "MF_33_Stock_Extraction_Regeneration")
