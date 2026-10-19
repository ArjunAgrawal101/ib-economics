"""v3 graphs for UPSC Economics from First Principles: larger type, heavier lines, one recurring market.

Every curve is defined in data space and every quoted value is asserted.
PPC schedule (hypothetical): A(0,100) B(10,95) C(20,85) D(30,70) E(40,50) F(50,20); the generic frontier
continues the same shape to the food axis at 55.
Recurring hypothetical onion market: D: Qd = 120 - 2P, S: Qs = 3P - 30, equilibrium P = 30, Q = 60.
Demand rise D2: Qd = 150 - 2P (E2 = 36, 78). Supply rise S3: Qs = 3P. Supply fall S2: Qs = 3P - 60 (E2 = 36, 48).
"""
import math
import ufp
from ufp import Canvas, Ax, monotone, INK, NAVY, GOLD, GOLD_TXT, GREEN, RED, BLUE, GUIDE, MUTED, IVORY, EDGE, tw

GRID = "#E9E2D2"
REGION = "#EFE6D2"
CW, DOT, LBL, AXS, TICK, NOTE = 9, 16, 44, 36, 30, 34

# heavier default axes
def axes(ax, origin=True):
    cv = ax.cv
    cv.line(ax.X0, ax.Y0, ax.X0, ax.Y1 - 36, INK, 5.5, arrow_end=True, cap="butt", head=26)
    cv.line(ax.X0, ax.Y0, ax.X1 + 36, ax.Y0, INK, 5.5, arrow_end=True, cap="butt", head=26)
    if origin:
        cv.text(ax.X0 - 16, ax.Y0 + 30, "0", size=28, color=MUTED, anchor="end")
    cv.text(ax.X0 - 6, ax.Y1 - 74, ax.ylab, size=ax.size, color=INK, anchor="start", weight=750)
    cv.text(ax.X1 + 36, ax.Y0 + ax.xtitle_dy, ax.xlab, size=ax.size, color=INK, anchor="end", weight=750)


def grid(ax, xs, ys):
    for v in xs:
        a, b = ax.px(v, 0); _, d = ax.px(v, ax.ymax * 0.96)
        ax.cv.line(a, b, a, d, GRID, 2.2, cap="butt")
    for v in ys:
        a, b = ax.px(0, v); c, _ = ax.px(ax.xmax * 0.96, v)
        ax.cv.line(a, b, c, b, GRID, 2.2, cap="butt")


def dot(ax, x, y, fill=INK, r=DOT, ring=False):
    a, b = ax.px(x, y)
    if ring:
        ax.cv.add(f'<circle cx="{a:.1f}" cy="{b:.1f}" r="{r + 12}" fill="none" stroke="{GOLD}" stroke-width="5"/>')
    ax.cv.circle(a, b, r, fill, "#FFFDFA", 5)


def tag(cv, x, y, s, anchor="end"):
    cv.text(x, y, s, size=28, color=MUTED, anchor=anchor, weight=600, italic=True)


def panel_title(cv, x, y, n, s, size=38):
    cv.step(x + 28, y, n, r=28, size=32)
    cv.text(x + 72, y + 1, s, size=size, color=INK, weight=750)


def ray_point(f, theta, xmax=55):
    lo, hi = 0.0, xmax
    for _ in range(80):
        mid = (lo + hi) / 2
        if f(mid) > mid * math.tan(theta):
            lo = mid
        else:
            hi = mid
    return lo, f(lo)


# ------------------------------------------------------------------ PPC data
PX = [0, 10, 20, 30, 40, 50]
PY = [100, 95, 85, 70, 50, 20]
sched = monotone(PX, PY)
ppc = monotone(PX + [55], PY + [0])
for x, y in zip(PX, PY):
    assert abs(sched(x) - y) < 1e-9 and abs(ppc(x) - y) < 1e-9
steps = [PY[i] - PY[i + 1] for i in range(5)]
assert steps == [5, 10, 15, 20, 30]


def ppc_ax(cv, numbered=False):
    ax = Ax(cv, 220, 840, 1080, 190, xmax=60 if numbered else 62, ymax=110 if numbered else 112,
            ylab="Textiles (units)" if numbered else "Textiles", xlab="Food (units)" if numbered else "Food", size=AXS)
    ax.xtitle_dy = 96
    return ax


# ================================================================ G17 PPC introduced
cv = Canvas(1200, 1040)
ax = ppc_ax(cv)
ax.fill_under(ppc, 0, 55, REGION, 0.95)
ax.poly(ppc, 0, 55, NAVY, CW)
axes(ax)
dot(ax, 0, 100, NAVY, 13); dot(ax, 55, 0, NAVY, 13)
ax.label(0, 100, "All resources in textiles", size=30, color=MUTED, dx=28, dy=-38, weight=650)
ax.label(55, 0, "All resources in food", size=30, color=MUTED, anchor="end", dx=-16, dy=44, weight=650)
ax.label(16, 40, "Attainable", size=40, color=INK, weight=800)
ax.label(16, 40, "combinations", size=40, color=INK, weight=800, dy=48)
ax.label(36, 98, "Unattainable with", size=33, color=GOLD_TXT, weight=750)
ax.label(36, 98, "today's resources", size=33, color=GOLD_TXT, weight=750, dy=42)
ax.label(36, 98, "and technology", size=33, color=GOLD_TXT, weight=750, dy=84)
ax.label(45, ppc(45), "PPC", size=50, color=NAVY, weight=850, dx=32, dy=-8)
cv.save("G17_PPC_Introduced")


# ================================================================ G18 schedule to curve
cv = Canvas(1200, 1040)
ax = ppc_ax(cv, numbered=True)
grid(ax, range(10, 60, 10), range(10, 110, 10))
ax.poly(sched, 0, 50, NAVY, CW)
axes(ax)
ax.xticks(range(10, 60, 10), size=TICK); ax.yticks(range(20, 110, 20), size=TICK)
offs = {"A": (26, -34), "B": (10, -44), "C": (18, -42), "D": (24, -32), "E": (26, -20), "F": (26, -18)}
for (x, y), k in zip(zip(PX, PY), "ABCDEF"):
    dot(ax, x, y, GOLD, 17)
    ax.label(x, y, k, size=44, color=INK, weight=850, dx=offs[k][0], dy=offs[k][1])
tag(cv, 1170, 120, "Hypothetical schedule")
cv.save("G18_Schedule_To_Curve")


# ================================================================ G19 classify the points (letters only)
cv = Canvas(1200, 1040)
ax = ppc_ax(cv)
ax.poly(ppc, 0, 55, NAVY, CW)
axes(ax)
ax.label(50, ppc(50), "PPC", size=46, color=NAVY, weight=850, dx=28, dy=-8)
E, U, Z = (30, 70), (20, 42), (46, 82)
assert U[1] < ppc(U[0]) and Z[1] > ppc(Z[0])
for p, k, dx, dy in ((E, "E", -30, 44), (U, "U", 30, -6), (Z, "Z", 30, -6)):
    dot(ax, *p, INK, 19)
    ax.label(*p, k, size=52, color=INK, weight=850, dx=dx, dy=dy, anchor="end" if dx < 0 else "start")
cv.save("G19_Classify_Points")


# ================================================================ G20 productive vs allocative
cv = Canvas(1200, 1040)
ax = ppc_ax(cv)
ax.poly(ppc, 0, 55, NAVY, CW)
axes(ax)
P, Q, R = (10, ppc(10)), (30, ppc(30)), (46, ppc(46))
U = (18, 45)
assert U[1] < ppc(U[0])
for pt in (P, Q, R):
    dot(ax, *pt, GREEN, 17)
a, b = ax.px(*Q)
cv.add(f'<circle cx="{a:.1f}" cy="{b:.1f}" r="38" fill="none" stroke="{GOLD}" stroke-width="7"/>')
ax.label(*P, "P", size=46, color=GREEN, weight=850, dx=6, dy=-46)
ax.label(*Q, "Q", size=46, color=GREEN, weight=850, dx=-48, dy=40, anchor="end")
ax.label(*R, "R", size=46, color=GREEN, weight=850, dx=28, dy=-24)
dot(ax, *U, RED, 17)
ax.label(*U, "U", size=46, color=RED, weight=850, dx=28, dy=-4)
ax.label(*U, "inside: not productively efficient", size=29, color=RED, weight=650, dx=0, dy=64, anchor="middle")
cv.rect(690, 92, 490, 128, fill="#EEF5F1", rx=18)
cv.lines(935, 156, ["P, Q and R: all", "productively efficient"], size=31, color=GREEN, weight=800)
cv.rect(690, 238, 490, 186, fill="#F6EFDF", rx=18)
cv.lines(935, 331, ["Q is allocatively efficient", "only if society values", "that mix most"], size=30, color=GOLD_TXT, weight=750)
cv.save("G20_Efficiency")


# ================================================================ G21 opportunity cost on the PPC
cv = Canvas(1200, 1040)
ax = ppc_ax(cv, numbered=True)
grid(ax, range(10, 60, 10), range(10, 110, 10))
ax.poly(sched, 0, 50, NAVY, CW)
axes(ax)
ax.xticks(range(10, 60, 10), size=TICK); ax.yticks(range(20, 110, 20), size=TICK)
for (x, y), k in zip(zip(PX, PY), "ABCDEF"):
    dot(ax, x, y, GOLD if k in "CD" else NAVY, 17 if k in "CD" else 12)
ax.label(20, 85, "C", size=46, color=INK, weight=850, dx=-22, dy=-42, anchor="end")
ax.label(30, 70, "D", size=46, color=INK, weight=850, dx=-20, dy=40, anchor="end")
ax.seg(20, 85, 30, 85, GREEN, 9, arrow_end=True, gap=18)
ax.seg(30, 85, 30, 70, RED, 9, arrow_end=True, gap=8)
ax.label(25, 85, "+10 food", size=38, color=GREEN, weight=850, dy=-42, anchor="middle")
ax.label(30, 77.5, "15 textiles", size=36, color=RED, weight=850, dx=30, dy=-20)
ax.label(30, 77.5, "given up", size=36, color=RED, weight=850, dx=30, dy=22)
cv.rect(240, 600, 560, 132, fill="#F6EFDF", rx=18)
cv.lines(520, 666, ["Opportunity cost of 10 more", "food = 15 textiles forgone"], size=32, color=GOLD_TXT, weight=800)
tag(cv, 1170, 120, "Hypothetical schedule")
cv.save("G21_Opportunity_Cost_PPC")


# ================================================================ G22 why bowed out
cv = Canvas(2400, 1040)
ax = ppc_ax(cv, numbered=True)
grid(ax, range(10, 60, 10), range(10, 110, 10))
ax.poly(sched, 0, 50, NAVY, CW)
axes(ax)
ax.xticks(range(10, 60, 10), size=TICK); ax.yticks(range(20, 110, 20), size=TICK)
for i in range(5):
    x0, y0, x1, y1 = PX[i], PY[i], PX[i + 1], PY[i + 1]
    ax.seg(x0, y0, x1, y0, GREEN, 6, gap=6)
    ax.seg(x1, y0, x1, y1, RED, 8, arrow_end=True, gap=4)
    ax.label(x1, (y0 + y1) / 2, str(steps[i]), size=40, color=RED, weight=850, dx=20)
for (x, y), k in zip(zip(PX, PY), "ABCDEF"):
    dot(ax, x, y, NAVY, 12)
    ax.label(x, y, k, size=34, color=INK, weight=850, dx=-16 if k != "A" else 24, dy=34 if k != "A" else -34,
             anchor="end" if k != "A" else "start")
bx, by, bw = 1340, 250, 960
cv.text(bx, by - 96, "Textiles given up for each", size=38, color=INK, weight=800)
cv.text(bx, by - 50, "extra 10 units of food", size=38, color=INK, weight=800)
labels = ["A to B", "B to C", "C to D", "D to E", "E to F"]
for i, s in enumerate(steps):
    y = by + 22 + i * 120
    L = s / 30 * (bw - 260)
    cv.rect(bx + 150, y, L, 80, fill=RED, rx=10, opacity=0.28 + 0.16 * i)
    cv.text(bx + 130, y + 40, labels[i], size=32, color=MUTED, anchor="end", weight=650)
    cv.text(bx + 150 + L + 16, y + 40, str(s), size=42, color=RED, weight=850)
cv.text(bx + 150, by + 650, "Each step costs more than the last", size=34, color=INK, weight=750, italic=True)
tag(cv, 2370, 70, "Hypothetical schedule")
cv.save("G22_Bowed_Out")


# ================================================================ G23 movement vs shifts (three panels)
cv = Canvas(2400, 820)
titles = ["Movement along the PPC", "Outward shift", "Inward shift"]
for p in range(3):
    ox = 20 + p * 800
    panel_title(cv, ox, 50, p + 1, titles[p], size=36)
    ax = Ax(cv, ox + 120, 690, ox + 700, 170, xmax=75, ymax=135, ylab="Textiles", xlab="Food", size=32)
    ax.xtitle_dy = 64
    if p == 0:
        ax.poly(ppc, 0, 55, NAVY, CW)
        pts = [ax.px(x, ppc(x)) for x in [12 + i * 0.25 for i in range(0, 101)]]
        cv.path("M" + " L".join(f"{a:.1f},{b:.1f}" for a, b in pts), color=GOLD, w=11, arrow_end=True, head=38)
        dot(ax, 12, ppc(12), INK, 15); dot(ax, 37, ppc(37), INK, 15)
        ax.label(12, ppc(12), "X", size=36, color=INK, weight=850, dx=-4, dy=-40, anchor="middle")
        ax.label(37, ppc(37), "Y", size=36, color=INK, weight=850, dx=32, dy=-10)
        ax.label(55, 0, "PPC", size=36, color=NAVY, weight=850, dx=12, dy=-54)
    else:
        k = 1.28 if p == 1 else 0.68
        g = (lambda f, k: (lambda x: k * f(x / k)))(ppc, k)
        ax.poly(ppc, 0, 55, NAVY, CW)
        ax.poly(g, 0, 55 * k, GOLD, CW)
        for th in (0.55, 1.05):
            x, y = ray_point(ppc, th)
            ax.seg(x, y, k * x, k * y, GOLD_TXT, 7, arrow_end=True, gap=18)
        if p == 1:
            ax.label(55, 0, "PPC_{1}", size=34, color=NAVY, weight=850, dx=-6, dy=-50)
            ax.label(55 * k, 0, "PPC_{2}", size=34, color=GOLD_TXT, weight=850, dx=8, dy=-50)
        else:
            ax.label(55, 0, "PPC_{1}", size=34, color=NAVY, weight=850, dx=14, dy=-50)
            ax.label(2, 100 * k, "PPC_{2}", size=34, color=GOLD_TXT, weight=850, dx=8, dy=-38)
    axes(ax)
    if p < 2:
        cv.line(ox + 790, 110, ox + 790, 780, EDGE, 3)
cv.save("G23_Movement_vs_Shift")


# ================================================================ G24 PPC and growth
cv = Canvas(1200, 1040)
ax = Ax(cv, 220, 840, 1080, 190, xmax=72, ymax=135, ylab="Textiles", xlab="Food", size=AXS)
ax.xtitle_dy = 96
K = 1.25
fut = lambda x: K * ppc(x / K)
ax.fill_under(fut, 0, 55 * K, "#F6EFDF", 0.95)
ax.fill_under(ppc, 0, 55, REGION, 1)
ax.poly(ppc, 0, 55, NAVY, CW)
ax.poly(fut, 0, 55 * K, GOLD, CW)
axes(ax)
X = (28, ppc(28)); Y = (K * 33, K * ppc(33))
assert Y[1] > ppc(Y[0])
dot(ax, *X, NAVY, 17); dot(ax, *Y, GOLD_TXT, 17)
ax.seg(*X, *Y, GOLD_TXT, 8, arrow_end=True, gap=24)
ax.label(*X, "X", size=44, color=NAVY, weight=850, dx=-18, dy=40, anchor="end")
ax.label(*Y, "Y", size=44, color=GOLD_TXT, weight=850, dx=26, dy=-24)
ax.label(49, ppc(49), "Today", size=36, color=NAVY, weight=850, dx=26, dy=-6)
ax.label(55 * K, 0, "Future", size=36, color=GOLD_TXT, weight=850, dx=6, dy=-54, anchor="end")
cv.save("G24_PPC_Growth")


# ================================================================ G13 time trade-off (straight-line frontier)
cv = Canvas(1200, 1040)
ax = Ax(cv, 220, 840, 1060, 200, xmax=7, ymax=7, ylab="Answer writing (hours)", xlab="Mock tests (hours)", size=AXS)
ax.xtitle_dy = 96
grid(ax, range(1, 7), range(1, 7))
ax.poly(lambda x: 6 - x, 0, 6, NAVY, CW)
axes(ax)
ax.xticks(range(2, 7, 2), size=TICK); ax.yticks(range(2, 7, 2), size=TICK)
for x in (0, 2, 4, 6):
    dot(ax, x, 6 - x, GOLD, 17)
ax.label(0, 6, "(0, 6)", size=32, color=INK, weight=800, dx=30, dy=-26)
ax.label(2, 4, "(2, 4)", size=32, color=INK, weight=800, dx=-26, dy=38, anchor="end")
ax.label(4, 2, "(4, 2)", size=32, color=INK, weight=800, dx=-26, dy=38, anchor="end")
ax.label(6, 0, "(6, 0)", size=32, color=INK, weight=800, dx=0, dy=-46, anchor="middle")
ax.seg(2, 4, 3, 4, GREEN, 8, arrow_end=True, gap=18)
ax.seg(3, 4, 3, 3, RED, 8, arrow_end=True, gap=6)
ax.label(2.15, 4, "+1 hour of tests", size=30, color=GREEN, weight=800, dy=-42, anchor="start")
ax.label(3, 3.5, "1 hour of writing", size=30, color=RED, weight=800, dx=22, dy=-18)
ax.label(3, 3.5, "given up", size=30, color=RED, weight=800, dx=22, dy=18)
cv.save("G13_Time_Tradeoff")


# ------------------------------------------------------------------ market data
Dp = lambda q: 60 - q / 2          # Qd = 120 - 2P
Sp = lambda q: 10 + q / 3          # Qs = 3P - 30
Qd = lambda p: 120 - 2 * p
Qs = lambda p: 3 * p - 30
assert Qd(30) == Qs(30) == 60
sched_d = [(50, 20), (40, 40), (30, 60), (20, 80), (10, 100)]
sched_s = [(50, 120), (40, 90), (30, 60), (20, 30), (10, 0)]
for p, q in sched_d:
    assert Qd(p) == q
for p, q in sched_s:
    assert Qs(p) == q
D2 = lambda q: 60 - (q - 30) / 2   # Qd = 150 - 2P
S3 = lambda q: q / 3               # Qs = 3P
S2 = lambda q: 20 + q / 3          # Qs = 3P - 60
assert 150 - 2 * 36 == 78 == 3 * 36 - 30
assert 120 - 2 * 36 == 48 == 3 * 36 - 60
YL = "P: price (₹ per kg)"
TAG = "Hypothetical onion market"


def single_ax(cv, xlab="Q: quantity (tonnes per week)"):
    ax = Ax(cv, 220, 840, 1080, 200, xmax=140, ymax=70, ylab=YL, xlab=xlab, size=AXS)
    ax.xtitle_dy = 96
    return ax


def panel_ax(cv, ox, xlab="Q: tonnes per week"):
    ax = Ax(cv, ox + 200, 670, ox + 1090, 170, xmax=140, ymax=70, ylab=YL, xlab=xlab, size=32)
    ax.xtitle_dy = 84
    return ax


def lab(ax, x, y, s, col, dx=16, dy=-26, size=LBL, anchor="start"):
    ax.label(x, y, s, size=size, color=col, weight=850, dx=dx, dy=dy, anchor=anchor)


# ================================================================ G32 demand curve
cv = Canvas(1200, 1040)
ax = single_ax(cv, "Q: quantity demanded (tonnes per week)")
grid(ax, range(20, 140, 20), range(10, 70, 10))
ax.poly(Dp, 6, 114, NAVY, CW)
axes(ax)
ax.xticks(range(20, 140, 20), size=TICK); ax.yticks(range(10, 70, 10), "₹{}", size=TICK)
for p, q in sched_d:
    dot(ax, q, p, GOLD, 15)
lab(ax, 114, Dp(114), "D", NAVY, dx=18, dy=-30, size=54)
tag(cv, 1170, 120, TAG)
cv.save("G32_Demand_Curve")


# ================================================================ G33 law of demand: movement along D
cv = Canvas(1200, 1040)
ax = single_ax(cv, "Q: quantity demanded (tonnes per week)")
ax.hguide(40, 40, "₹40", size=TICK + 2); ax.hguide(30, 60, "₹30", size=TICK + 2)
ax.vguide(40, 40, "40", size=TICK + 2); ax.vguide(60, 30, "60", size=TICK + 2)
ax.poly(Dp, 6, 114, NAVY, CW)
ax.seg(40, 40, 60, 30, GOLD_TXT, 10, arrow_end=True, gap=24)
dot(ax, 40, 40, INK, 16); dot(ax, 60, 30, INK, 16)
lab(ax, 40, 40, "a", INK, dx=12, dy=-40, size=44)
lab(ax, 60, 30, "b", INK, dx=18, dy=-38, size=44)
lab(ax, 114, Dp(114), "D", NAVY, dx=18, dy=-30, size=54)
cv.rect(600, 250, 540, 150, fill="#F6EFDF", rx=18)
cv.lines(870, 325, ["Price falls ₹40 to ₹30:", "quantity demanded rises 40 to 60"], size=30, color=GOLD_TXT, weight=800)
cv.text(870, 450, "Same curve, so demand itself is unchanged", size=27, color=MUTED, anchor="middle", weight=650, italic=True)
axes(ax)
tag(cv, 1170, 120, TAG)
cv.save("G33_Law_of_Demand")


# ================================================================ G34 movement vs shift of demand
cv = Canvas(2400, 830)
for p in range(2):
    ox = 10 + p * 1200
    panel_title(cv, ox, 52, p + 1, ["Own price falls: movement along D", "Income rises: demand shifts right"][p])
    ax = panel_ax(cv, ox)
    if p == 0:
        ax.hguide(40, 40, "₹40", size=TICK); ax.hguide(30, 60, "₹30", size=TICK)
        ax.vguide(40, 40, "40", size=TICK); ax.vguide(60, 30, "60", size=TICK)
        ax.poly(Dp, 6, 114, NAVY, CW)
        ax.seg(40, 40, 60, 30, GOLD_TXT, 9, arrow_end=True, gap=24)
        dot(ax, 40, 40, INK, 15); dot(ax, 60, 30, INK, 15)
        lab(ax, 40, 40, "a", INK, dx=12, dy=-38, size=40); lab(ax, 60, 30, "b", INK, dx=16, dy=-36, size=40)
        lab(ax, 114, Dp(114), "D", NAVY, dx=16, dy=-28, size=48)
        cv.lines(ox + 820, 250, ["Change in quantity", "demanded (40 to 60)"], size=32, color=GOLD_TXT, weight=800)
    else:
        assert D2(70) == 40
        ax.hguide(40, 70, "₹40", size=TICK)
        ax.vguide(40, 40, "40", size=TICK); ax.vguide(70, 40, "70", size=TICK)
        ax.poly(Dp, 6, 114, NAVY, CW); ax.poly(D2, 36, 136, GOLD, CW)
        ax.seg(40, 40, 70, 40, GOLD_TXT, 8, arrow_end=True, gap=24)
        ax.seg(20, Dp(20), 50, D2(50), GOLD_TXT, 7, arrow_end=True, gap=26)
        dot(ax, 40, 40, INK, 15); dot(ax, 70, 40, INK, 15)
        lab(ax, 114, Dp(114), "D_{1}", NAVY, dx=10, dy=-32, size=42)
        lab(ax, 126, D2(126), "D_{2}", GOLD_TXT, dx=18, dy=-30, size=42)
        cv.lines(ox + 820, 250, ["Increase in demand at", "every price (40 to 70)"], size=32, color=GOLD_TXT, weight=800)
    axes(ax)
cv.line(1205, 110, 1205, 800, EDGE, 3)
tag(cv, 2390, 800, TAG)
cv.save("G34_Movement_vs_Shift_Demand")


# ================================================================ G35 shifts of demand: right vs left
cv = Canvas(1200, 1040)
ax = single_ax(cv)
Dl = lambda q: 60 - (q + 30) / 2   # decrease: Qd = 90 - 2P
ax.poly(Dl, 0, 84, RED, CW - 1, dash="18 12")
ax.poly(Dp, 6, 114, NAVY, CW)
ax.poly(D2, 36, 136, GREEN, CW - 1, dash="18 12")
ax.seg(60, 30, 90, 30, GREEN, 9, arrow_end=True, gap=20)
ax.seg(60, 30, 30, 30, RED, 9, arrow_end=True, gap=20)
dot(ax, 60, 30, INK, 14)
axes(ax, origin=True)
lab(ax, 114, Dp(114), "D", NAVY, dx=16, dy=-30, size=50)
lab(ax, 126, D2(126), "D_{up}", GREEN, dx=10, dy=-36, size=40)
lab(ax, 84, Dl(84), "D_{down}", RED, dx=10, dy=-32, size=40)
cv.lines(905, 320, ["Increase in demand:", "curve shifts right"], size=31, color=GREEN, weight=800)
cv.lines(905, 440, ["Decrease in demand:", "curve shifts left"], size=31, color=RED, weight=800)
cv.save("G35_Demand_Shifts")


# ================================================================ G36 supply curve
cv = Canvas(1200, 1040)
ax = single_ax(cv, "Q: quantity supplied (tonnes per week)")
grid(ax, range(20, 140, 20), range(10, 70, 10))
ax.poly(Sp, 0, 130, NAVY, CW)
axes(ax)
ax.xticks(range(20, 140, 20), size=TICK); ax.yticks(range(10, 70, 10), "₹{}", size=TICK)
for p, q in sched_s:
    dot(ax, q, p, GOLD, 15)
lab(ax, 130, Sp(130), "S", NAVY, dx=14, dy=-34, size=54)
tag(cv, 1170, 120, TAG)
cv.save("G36_Supply_Curve")


# ================================================================ G37 movement along vs shift of supply
cv = Canvas(2400, 830)
for p in range(2):
    ox = 10 + p * 1200
    panel_title(cv, ox, 52, p + 1, ["Own price rises: movement along S", "Better seeds: supply shifts right"][p])
    ax = panel_ax(cv, ox)
    if p == 0:
        ax.hguide(30, 60, "₹30", size=TICK); ax.hguide(40, 90, "₹40", size=TICK)
        ax.vguide(60, 30, "60", size=TICK); ax.vguide(90, 40, "90", size=TICK)
        ax.poly(Sp, 0, 130, NAVY, CW)
        ax.seg(60, 30, 90, 40, GOLD_TXT, 9, arrow_end=True, gap=24)
        dot(ax, 60, 30, INK, 15); dot(ax, 90, 40, INK, 15)
        lab(ax, 60, 30, "a", INK, dx=16, dy=38, size=40); lab(ax, 90, 40, "b", INK, dx=16, dy=38, size=40)
        lab(ax, 130, Sp(130), "S", NAVY, dx=12, dy=-30, size=48)
        cv.lines(ox + 580, 250, ["Change in quantity", "supplied (60 to 90)"], size=32, color=GOLD_TXT, weight=800)
    else:
        assert S3(90) == 30
        ax.hguide(30, 90, "₹30", size=TICK)
        ax.vguide(60, 30, "60", size=TICK); ax.vguide(90, 30, "90", size=TICK)
        ax.poly(Sp, 0, 130, NAVY, CW); ax.poly(S3, 0, 136, GOLD, CW)
        ax.seg(60, 30, 90, 30, GOLD_TXT, 8, arrow_end=True, gap=24)
        ax.seg(80, Sp(80), 110, S3(110), GOLD_TXT, 7, arrow_end=True, gap=26)
        dot(ax, 60, 30, INK, 15); dot(ax, 90, 30, INK, 15)
        lab(ax, 130, Sp(130), "S_{1}", NAVY, dx=-10, dy=-38, size=42, anchor="end")
        lab(ax, 136, S3(136), "S_{2}", GOLD_TXT, dx=14, dy=-14, size=42)
        cv.lines(ox + 580, 250, ["Increase in supply at", "every price (60 to 90)"], size=32, color=GOLD_TXT, weight=800)
    axes(ax)
cv.line(1205, 110, 1205, 800, EDGE, 3)
tag(cv, 2390, 800, TAG)
cv.save("G37_Movement_vs_Shift_Supply")


# ================================================================ G38 equilibrium and a rise in demand
cv = Canvas(2400, 830)
for p in range(2):
    ox = 10 + p * 1200
    panel_title(cv, ox, 52, p + 1, ["Market equilibrium", "Festival demand rises: new equilibrium"][p])
    ax = panel_ax(cv, ox)
    if p == 0:
        ax.hguide(30, 60, "₹30", size=TICK); ax.vguide(60, 30, "60", size=TICK)
        ax.poly(Dp, 6, 114, NAVY, CW); ax.poly(Sp, 0, 130, NAVY, CW)
        dot(ax, 60, 30, GOLD, 19, ring=True)
        lab(ax, 60, 30, "E", GOLD_TXT, dx=0, dy=-62, size=46, anchor="middle")
        lab(ax, 114, Dp(114), "D", NAVY, dx=16, dy=-28, size=48)
        lab(ax, 130, Sp(130), "S", NAVY, dx=12, dy=-30, size=48)
        cv.lines(ox + 640, 250, ["Quantity demanded =", "quantity supplied = 60"], size=32, color=GOLD_TXT, weight=800)
    else:
        ax.hguide(30, 60, "₹30", size=TICK); ax.vguide(60, 30, "60", size=TICK)
        ax.hguide(36, 78, "₹36", color=GOLD_TXT, size=TICK); ax.vguide(78, 36, "78", color=GOLD_TXT, size=TICK)
        ax.poly(Dp, 6, 114, NAVY, CW); ax.poly(D2, 36, 136, GOLD, CW); ax.poly(Sp, 0, 130, NAVY, CW)
        ax.seg(20, Dp(20), 50, D2(50), GOLD_TXT, 7, arrow_end=True, gap=26)
        dot(ax, 60, 30, INK, 15); dot(ax, 78, 36, GOLD, 19, ring=True)
        lab(ax, 60, 30, "E_{1}", INK, dx=-14, dy=44, size=38, anchor="end")
        lab(ax, 78, 36, "E_{2}", GOLD_TXT, dx=0, dy=-60, size=40, anchor="middle")
        lab(ax, 114, Dp(114), "D_{1}", NAVY, dx=10, dy=-32, size=40)
        lab(ax, 126, D2(126), "D_{2}", GOLD_TXT, dx=18, dy=-30, size=40)
        lab(ax, 130, Sp(130), "S", NAVY, dx=12, dy=-30, size=44)
        cv.lines(ox + 860, 220, ["Price rises ₹30 to ₹36", "Quantity rises 60 to 78"], size=30, color=GOLD_TXT, weight=800)
    axes(ax)
cv.line(1205, 110, 1205, 800, EDGE, 3)
tag(cv, 2390, 800, TAG)
cv.save("G38_Equilibrium")


# ================================================================ G39 shortage and surplus
cv = Canvas(2400, 830)
for p in range(2):
    ox = 10 + p * 1200
    low = p == 0
    price = 20 if low else 40
    qd, qs = Qd(price), Qs(price)
    assert (qd, qs) == ((80, 30) if low else (40, 90))
    panel_title(cv, ox, 52, p + 1, ["Price below equilibrium: shortage", "Price above equilibrium: surplus"][p])
    ax = panel_ax(cv, ox)
    ax.hguide(30, 60, "₹30", color=MUTED, size=TICK)
    ax.poly(Dp, 6, 114, NAVY, CW); ax.poly(Sp, 0, 130, NAVY, CW)
    col = RED if low else BLUE
    a, b = ax.px(0, price); c, _ = ax.px(max(qd, qs) + 6, price)
    cv.line(a, b, c, b, col, 6, cap="butt")
    cv.text(a - 16, b, f"₹{price}", size=34, color=col, anchor="end", weight=850)
    ax.vguide(qs, price, str(qs), size=TICK); ax.vguide(qd, price, str(qd), size=TICK)
    dot(ax, qs, price, INK, 15); dot(ax, qd, price, INK, 15)
    dot(ax, 60, 30, GOLD, 15)
    lab(ax, 60, 30, "E", GOLD_TXT, dx=0, dy=-44, size=38, anchor="middle")
    lab(ax, 114, Dp(114), "D", NAVY, dx=16, dy=-26, size=44)
    lab(ax, 130, Sp(130), "S", NAVY, dx=12, dy=-28, size=44)
    lo, hi = min(qd, qs), max(qd, qs)
    yb = price - 7.5 if low else price + 7.5
    ax.seg(lo, yb, hi, yb, col, 6, arrow_end=True, arrow_start=True, gap=4)
    ax.label((lo + hi) / 2, yb, ("Shortage = " if low else "Surplus = ") + str(hi - lo), size=34, color=col,
             weight=850, anchor="middle", dy=36 if low else -36)
    xa, _ = ax.px(0, 0)
    _, y1 = ax.px(0, price); _, y2 = ax.px(0, 30)
    cv.line(xa + 36, y1 - (12 if low else -12), xa + 36, y2 + (16 if low else -16), GOLD_TXT, 8, arrow_end=True)
    cv.lines(ox + 700, 200, (["Qd 80 > Qs 30:", "price tends to rise"] if low else ["Qs 90 > Qd 40:", "price tends to fall"]),
             size=32, color=col, weight=800)
    axes(ax)
cv.line(1205, 110, 1205, 800, EDGE, 3)
tag(cv, 2390, 800, TAG)
cv.save("G39_Shortage_Surplus")


# ================================================================ G40 onion supply falls
cv = Canvas(1300, 1040)
ax = Ax(cv, 240, 820, 1120, 210, xmax=140, ymax=70, ylab=YL, xlab="Q: tonnes per week", size=AXS)
ax.xtitle_dy = 92
ax.hguide(30, 60, "₹30", size=TICK + 2); ax.vguide(60, 30, "60", size=TICK + 2)
ax.hguide(36, 48, "₹36", color=RED, size=TICK + 2); ax.vguide(48, 36, "48", color=RED, size=TICK + 2)
ax.poly(Dp, 6, 114, NAVY, CW); ax.poly(Sp, 0, 130, NAVY, CW); ax.poly(S2, 0, 120, GOLD, CW)
ax.seg(100, Sp(100), 70, S2(70), GOLD_TXT, 8, arrow_end=True, gap=26)
dot(ax, 60, 30, INK, 15); dot(ax, 48, 36, GOLD, 19, ring=True)
lab(ax, 60, 30, "E_{1}", INK, dx=26, dy=28, size=40)
lab(ax, 48, 36, "E_{2}", GOLD_TXT, dx=0, dy=-62, size=42, anchor="middle")
lab(ax, 114, Dp(114), "D", NAVY, dx=16, dy=-26, size=46)
lab(ax, 130, Sp(130), "S_{1}", NAVY, dx=12, dy=-26, size=42)
lab(ax, 120, S2(120), "S_{2}", GOLD_TXT, dx=12, dy=-26, size=42)
a, b = ax.px(100, Sp(100))
cv.step(a + 48, b + 6, 1, GOLD_TXT, r=30, size=34)
axes(ax)
xa = ax.X0 - 132
_, y30 = ax.px(0, 30); _, y36 = ax.px(0, 36)
cv.line(xa, y30 + 4, xa, y36 - 4, RED, 9, arrow_end=True)
cv.step(xa - 48, (y30 + y36) / 2, 2, RED, r=30, size=34)
_, yq = ax.px(0, 0)
xa60, _ = ax.px(60, 0); xa48, _ = ax.px(48, 0)
cv.line(xa60 - 4, yq + 150, xa48 + 4, yq + 150, RED, 9, arrow_end=True)
cv.step(xa60 + 46, yq + 150, 3, RED, r=30, size=34)
tag(cv, 1270, 110, TAG)
cv.save("G40_Onion_Supply_Falls")


# ================================================================ G12 shortage mini graph (right half of slide 12 composite)
cv = Canvas(1200, 1040)
ax = single_ax(cv)
ax.hguide(30, 60, "₹30", color=MUTED, size=TICK)
ax.poly(Dp, 6, 114, NAVY, CW); ax.poly(Sp, 0, 130, NAVY, CW)
a, b = ax.px(0, 20); c, _ = ax.px(86, 20)
cv.line(a, b, c, b, RED, 6, cap="butt")
cv.text(a - 16, b, "₹20", size=34, color=RED, anchor="end", weight=850)
ax.vguide(30, 20, "30", size=TICK); ax.vguide(80, 20, "80", size=TICK)
dot(ax, 30, 20, INK, 15); dot(ax, 80, 20, INK, 15); dot(ax, 60, 30, GOLD, 15)
ax.seg(30, 12.5, 80, 12.5, RED, 6, arrow_end=True, arrow_start=True, gap=4)
ax.label(55, 12.5, "Shortage = 50", size=34, color=RED, weight=850, anchor="middle", dy=36)
lab(ax, 60, 30, "E", GOLD_TXT, dx=0, dy=-44, size=38, anchor="middle")
lab(ax, 114, Dp(114), "D", NAVY, dx=16, dy=-26, size=46)
lab(ax, 130, Sp(130), "S", NAVY, dx=12, dy=-28, size=46)
axes(ax)
tag(cv, 1170, 120, TAG)
cv.save("G12_Shortage_Mini")


# ================================================================ G22b why bowed out, shorter (2400x860)
cv = Canvas(2400, 860)
ax = Ax(cv, 220, 690, 1120, 160, xmax=60, ymax=110, ylab="Textiles (units)", xlab="Food (units)", size=AXS)
ax.xtitle_dy = 92
grid(ax, range(10, 60, 10), range(10, 110, 10))
ax.poly(sched, 0, 50, NAVY, CW)
axes(ax)
ax.xticks(range(10, 60, 10), size=TICK); ax.yticks(range(20, 110, 20), size=TICK)
for i in range(5):
    x0, y0, x1, y1 = PX[i], PY[i], PX[i + 1], PY[i + 1]
    ax.seg(x0, y0, x1, y0, GREEN, 6, gap=6)
    ax.seg(x1, y0, x1, y1, RED, 8, arrow_end=True, gap=4)
    ax.label(x1, (y0 + y1) / 2, str(steps[i]), size=42, color=RED, weight=850, dx=20)
for (x, y), k in zip(zip(PX, PY), "ABCDEF"):
    dot(ax, x, y, NAVY, 12)
    ax.label(x, y, k, size=36, color=INK, weight=850, dx=-16 if k != "A" else 24, dy=34 if k != "A" else -34,
             anchor="end" if k != "A" else "start")
bx, by, bw = 1380, 190, 960
cv.text(bx, by - 96, "Textiles given up for each", size=42, color=INK, weight=800)
cv.text(bx, by - 46, "extra 10 units of food", size=42, color=INK, weight=800)
labels = ["A to B", "B to C", "C to D", "D to E", "E to F"]
for i, s in enumerate(steps):
    y = by + 10 + i * 104
    L = s / 30 * (bw - 280)
    cv.rect(bx + 160, y, L, 78, fill=RED, rx=10, opacity=0.28 + 0.16 * i)
    cv.text(bx + 140, y + 39, labels[i], size=36, color=MUTED, anchor="end", weight=650)
    cv.text(bx + 160 + L + 16, y + 39, str(s), size=46, color=RED, weight=850)
cv.text(bx + 160, by + 570, "Each step costs more than the last", size=38, color=INK, weight=750, italic=True)
tag(cv, 2380, 830, "Hypothetical schedule")
cv.save("G22b_Bowed_Out")
