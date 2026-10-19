"""PPC and demand-supply graphs for UPSC Economics from First Principles (Section I).

Every curve is defined in data space and every labelled value is asserted, so the pictures
cannot drift from the numbers quoted on the slides.
PPC schedule (hypothetical): A(0,100) B(10,95) C(20,85) D(30,70) E(40,50) F(50,20); the generic
frontier on unnumbered slides continues the same shape to the food axis at 55.
Market (hypothetical tomatoes / onions): D: Qd = 120 - 2P, S: Qs = 3P - 30, equilibrium P = 30, Q = 60.
"""
import math
from ufp import (Canvas, Ax, monotone, INK, NAVY, GOLD, GOLD_TXT, GREEN, RED, BLUE, GUIDE, MUTED, IVORY, EDGE,
                 SERIF, FONT, tw)

GRID = "#E7E0D0"
REGION = "#EFE6D2"

# ------------------------------------------------------------------ PPC data
PX = [0, 10, 20, 30, 40, 50]
PY = [100, 95, 85, 70, 50, 20]
sched = monotone(PX, PY)
ppc = monotone(PX + [55], PY + [0])
for x, y in zip(PX, PY):
    assert abs(sched(x) - y) < 1e-9 and abs(ppc(x) - y) < 1e-9
steps = [PY[i] - PY[i + 1] for i in range(5)]
assert steps == [5, 10, 15, 20, 30]


def ray_point(f, theta, xmax=55):
    lo, hi = 0.0, xmax
    for _ in range(80):
        mid = (lo + hi) / 2
        if f(mid) > mid * math.tan(theta):
            lo = mid
        else:
            hi = mid
    return lo, f(lo)


def grid(ax, xs, ys):
    for v in xs:
        a, b = ax.px(v, 0); _, d = ax.px(v, ax.ymax * 0.97)
        ax.cv.line(a, b, a, d, GRID, 2, cap="butt")
    for v in ys:
        a, b = ax.px(0, v); c, _ = ax.px(ax.xmax * 0.97, v)
        ax.cv.line(a, b, c, b, GRID, 2, cap="butt")


def panel_title(cv, x, y, n, s, size=34):
    cv.step(x + 26, y, n)
    cv.text(x + 66, y + 1, s, size=size, color=INK, weight=750)


# ================================================================ UFP_17 PPC introduced
cv = Canvas(1200, 960)
ax = Ax(cv, 210, 800, 1060, 170, xmax=62, ymax=112, ylab="Textiles (units)", xlab="Food (units)")
ax.fill_under(ppc, 0, 55, REGION, 0.85)
ax.poly(ppc, 0, 55, NAVY, 8)
ax.axes()
ax.dot(0, 100, NAVY); ax.dot(55, 0, NAVY)
ax.label(0, 100, "All resources in textiles", size=28, color=MUTED, dx=26, dy=-34, weight=600)
ax.label(55, 0, "All resources in food", size=28, color=MUTED, anchor="end", dx=-14, dy=40, weight=600)
ax.label(17, 40, "Attainable", size=36, color=INK, weight=750)
ax.label(17, 40, "combinations", size=36, color=INK, weight=750, dy=44)
ax.label(37, 96, "Unattainable with", size=30, color=GOLD_TXT, weight=700)
ax.label(37, 96, "current resources", size=30, color=GOLD_TXT, weight=700, dy=38)
ax.label(37, 96, "and technology", size=30, color=GOLD_TXT, weight=700, dy=76)
ax.label(45, ppc(45), "PPC", size=44, color=NAVY, weight=800, dx=30, dy=-6)
cv.save("UFP_17_PPC_Introduced")


# ================================================================ UFP_18 schedule to curve
cv = Canvas(1200, 980)
ax = Ax(cv, 210, 820, 1060, 180, xmax=60, ymax=110, ylab="Textiles (units)", xlab="Food (units)")
grid(ax, range(10, 60, 10), range(10, 110, 10))
ax.poly(sched, 0, 50, NAVY, 8)
ax.axes()
ax.xticks(range(10, 60, 10)); ax.yticks(range(20, 110, 20))
offs = {"A": (24, -30), "B": (8, -40), "C": (16, -38), "D": (20, -30), "E": (24, -18), "F": (24, -16)}
for (x, y), k in zip(zip(PX, PY), "ABCDEF"):
    ax.dot(x, y, GOLD, 14)
    ax.label(x, y, k, size=40, color=INK, weight=800, dx=offs[k][0], dy=offs[k][1])
cv.text(1150, 120, "Hypothetical schedule", size=28, color=MUTED, anchor="end", weight=600, italic=True)
cv.save("UFP_18_Schedule_To_Curve")


# ================================================================ UFP_19 three types of points
cv = Canvas(1200, 960)
ax = Ax(cv, 210, 800, 1060, 170, xmax=62, ymax=112, ylab="Textiles", xlab="Food")
ax.poly(ppc, 0, 55, NAVY, 8)
ax.axes()
ax.label(50, ppc(50), "PPC", size=40, color=NAVY, weight=800, dx=26, dy=-8)
ON, IN, OUT = (30, 70), (20, 42), (46, 82)
assert IN[1] < ppc(IN[0]) and OUT[1] > ppc(OUT[0])
ax.dot(*ON, GREEN, 16); ax.dot(*IN, RED, 16); ax.dot(*OUT, GOLD, 16)
ax.label(*ON, "On the curve", size=32, color=GREEN, dx=-30, dy=44, anchor="end")
ax.label(*ON, "productively efficient", size=27, color=GREEN, weight=600, dx=-30, dy=80, anchor="end")
ax.label(*IN, "Inside the curve", size=32, color=RED, dx=-6, dy=66, anchor="middle")
ax.label(*IN, "resources underused", size=27, color=RED, weight=600, dx=-6, dy=102, anchor="middle")
ax.label(*OUT, "Outside the curve", size=32, color=GOLD_TXT, dx=26, dy=-34)
ax.label(*OUT, "unattainable for now", size=27, color=GOLD_TXT, weight=600, dx=26, dy=2)
cv.save("UFP_19_Three_Points")


# ================================================================ UFP_20 productive vs allocative efficiency
cv = Canvas(1200, 960)
ax = Ax(cv, 210, 800, 1060, 170, xmax=62, ymax=112, ylab="Textiles", xlab="Food")
ax.poly(ppc, 0, 55, NAVY, 8)
ax.axes()
P, Q, R = (10, ppc(10)), (30, ppc(30)), (46, ppc(46))
U = (18, 45)
assert U[1] < ppc(U[0])
for pt, k in ((P, "P"), (Q, "Q"), (R, "R")):
    ax.dot(*pt, GREEN, 15)
ax.label(*P, "P", size=40, color=GREEN, weight=800, dx=8, dy=-42)
ax.label(*Q, "Q", size=40, color=GREEN, weight=800, dx=22, dy=-36)
ax.label(*R, "R", size=40, color=GREEN, weight=800, dx=24, dy=-26)
a, b = ax.px(*Q)
cv.add(f'<circle cx="{a:.1f}" cy="{b:.1f}" r="34" fill="none" stroke="{GOLD}" stroke-width="6"/>')
ax.dot(*U, RED, 15)
ax.label(*U, "U", size=40, color=RED, weight=800, dx=24, dy=-4)
ax.label(*U, "inside: not productively efficient", size=26, color=RED, weight=600, dx=0, dy=62, anchor="middle")
# callouts
cv.rect(690, 96, 480, 120, fill="#EEF5F1", rx=16)
cv.lines(930, 156, ["P, Q and R are all", "productively efficient"], size=29, color=GREEN, weight=750)
cv.rect(690, 232, 480, 178, fill="#F6EFDF", rx=16)
cv.lines(930, 321, ["Q is allocatively efficient", "only if society values", "that mix most"],
         size=28, color=GOLD_TXT, weight=700)
cv.save("UFP_20_Efficiency")


# ================================================================ UFP_21 opportunity cost on the PPC
cv = Canvas(1200, 980)
ax = Ax(cv, 210, 820, 1060, 180, xmax=60, ymax=110, ylab="Textiles (units)", xlab="Food (units)")
grid(ax, range(10, 60, 10), range(10, 110, 10))
ax.poly(sched, 0, 50, NAVY, 7)
ax.axes()
ax.xticks(range(10, 60, 10)); ax.yticks(range(20, 110, 20))
for (x, y), k in zip(zip(PX, PY), "ABCDEF"):
    ax.dot(x, y, NAVY if k not in "CD" else GOLD, 11 if k not in "CD" else 15)
ax.label(20, 85, "C", size=40, color=INK, weight=800, dx=-20, dy=-40, anchor="end")
ax.label(30, 70, "D", size=40, color=INK, weight=800, dx=-18, dy=36, anchor="end")
ax.seg(20, 85, 30, 85, GREEN, 7, arrow_end=True, gap=16)
ax.seg(30, 85, 30, 70, RED, 7, arrow_end=True, gap=8)
ax.label(25, 85, "+10 food", size=34, color=GREEN, weight=800, dy=-38, anchor="middle")
ax.label(30, 77.5, "15 textiles", size=32, color=RED, weight=800, dx=26, dy=-18)
ax.label(30, 77.5, "given up", size=32, color=RED, weight=800, dx=26, dy=20)
cv.rect(232, 578, 560, 124, fill="#F6EFDF", rx=16)
cv.lines(512, 640, ["Opportunity cost of 10 more", "food = 15 textiles forgone"], size=30, color=GOLD_TXT, weight=750)
cv.text(1150, 120, "Hypothetical schedule", size=28, color=MUTED, anchor="end", weight=600, italic=True)
cv.save("UFP_21_Opportunity_Cost_PPC")


# ================================================================ UFP_22 why bowed out
cv = Canvas(1900, 980)
ax = Ax(cv, 210, 820, 1060, 180, xmax=60, ymax=110, ylab="Textiles (units)", xlab="Food (units)")
grid(ax, range(10, 60, 10), range(10, 110, 10))
ax.poly(sched, 0, 50, NAVY, 7)
ax.axes()
ax.xticks(range(10, 60, 10)); ax.yticks(range(20, 110, 20))
for i in range(5):
    x0, y0, x1, y1 = PX[i], PY[i], PX[i + 1], PY[i + 1]
    ax.seg(x0, y0, x1, y0, GREEN, 5, gap=6)
    ax.seg(x1, y0, x1, y1, RED, 6, arrow_end=True, gap=4)
    ax.label(x1, (y0 + y1) / 2, str(steps[i]), size=34, color=RED, weight=800, dx=18)
for (x, y), k in zip(zip(PX, PY), "ABCDEF"):
    ax.dot(x, y, NAVY, 11)
    ax.label(x, y, k, size=30, color=INK, weight=800, dx=-14 if k != "A" else 22, dy=30 if k != "A" else -30, anchor="end" if k != "A" else "start")
# bar panel
bx, by, bw, bh = 1230, 230, 600, 560
cv.text(bx, by - 70, "Textiles given up for each", size=31, color=INK, weight=750)
cv.text(bx, by - 32, "extra 10 units of food", size=31, color=INK, weight=750)
labels = ["A to B", "B to C", "C to D", "D to E", "E to F"]
for i, s in enumerate(steps):
    y = by + 30 + i * 108
    L = s / 30 * (bw - 150)
    cv.rect(bx + 130, y, L, 66, fill=RED, rx=8, opacity=0.25 + 0.15 * i)
    cv.text(bx + 112, y + 33, labels[i], size=28, color=MUTED, anchor="end", weight=600)
    cv.text(bx + 130 + L + 14, y + 33, str(s), size=34, color=RED, weight=800)
cv.text(bx + 130, by + 590, "Each step costs more than the last", size=29, color=INK, weight=700, italic=True)
cv.text(1850, 120, "Hypothetical schedule", size=28, color=MUTED, anchor="end", weight=600, italic=True)
cv.save("UFP_22_Bowed_Out")


# ================================================================ UFP_23 movement vs shifts
cv = Canvas(2400, 830)
titles = ["Movement along the PPC", "Outward shift", "Inward shift"]
caps = [["Existing resources are", "reallocated between goods"],
        ["More resources, better", "technology or skills"],
        ["Major loss of capacity,", "e.g. war or disaster"]]
for p in range(3):
    ox = 30 + p * 800
    panel_title(cv, ox, 52, p + 1, titles[p])
    ax = Ax(cv, ox + 130, 640, ox + 690, 190, xmax=75, ymax=135, ylab="Textiles", xlab="Food", size=30)
    ax.xtitle_dy = 54
    if p == 0:
        ax.poly(ppc, 0, 55, NAVY, 7)
        pts = [ax.px(x, ppc(x)) for x in [12 + i * 0.25 for i in range(0, 101)]]
        cv.path("M" + " L".join(f"{a:.1f},{b:.1f}" for a, b in pts), color=GOLD, w=9, arrow_end=True, head=34)
        ax.dot(12, ppc(12), INK, 13); ax.dot(37, ppc(37), INK, 13)
        ax.label(12, ppc(12), "X", size=32, color=INK, weight=800, dx=-4, dy=-36, anchor="middle")
        ax.label(37, ppc(37), "Y", size=32, color=INK, weight=800, dx=30, dy=-10)
        ax.label(55, 0, "PPC", size=34, color=NAVY, weight=800, dx=10, dy=-50)
    else:
        k = 1.28 if p == 1 else 0.68
        g = (lambda f, k: (lambda x: k * f(x / k)))(ppc, k)
        ax.poly(ppc, 0, 55, NAVY, 7)
        ax.poly(g, 0, 55 * k, GOLD, 7)
        for th in (0.55, 1.05):
            x, y = ray_point(ppc, th)
            a, b = (x, y), (k * x, k * y)
            ax.seg(*a, *b, GOLD_TXT, 6, arrow_end=True, gap=16)
        ax.label(55, 0, "PPC_{1}", size=32, color=NAVY, weight=800, dx=-4 if p == 1 else 22, dy=-46)
        if p == 1:
            ax.label(55 * k, 0, "PPC_{2}", size=32, color=GOLD_TXT, weight=800, dx=8, dy=-46)
        else:
            ax.label(2, 100 * k, "PPC_{2}", size=32, color=GOLD_TXT, weight=800, dx=6, dy=-34)
    ax.axes()
    cv.lines(ox + 410, 770, caps[p], size=30, color=MUTED, weight=600)
    if p < 2:
        cv.line(ox + 785, 120, ox + 785, 800, EDGE, 3)
cv.save("UFP_23_Movement_vs_Shift_v2")


# ================================================================ UFP_24 PPC and growth
cv = Canvas(1800, 960)
ax = Ax(cv, 210, 800, 1060, 170, xmax=72, ymax=135, ylab="Textiles", xlab="Food")
K = 1.25
fut = lambda x: K * ppc(x / K)
ax.fill_under(fut, 0, 55 * K, "#F6EFDF", 0.9)
ax.fill_under(ppc, 0, 55, REGION, 1)
ax.poly(ppc, 0, 55, NAVY, 8)
ax.poly(fut, 0, 55 * K, GOLD, 8)
ax.axes()
X = (28, ppc(28)); Y = (K * 33, K * ppc(33))
assert Y[1] > ppc(Y[0])
ax.dot(*X, NAVY, 14); ax.dot(*Y, GOLD_TXT, 14)
ax.seg(*X, *Y, GOLD_TXT, 6, arrow_end=True, gap=20)
ax.label(*X, "X", size=36, color=NAVY, weight=800, dx=-16, dy=36, anchor="end")
ax.label(*Y, "Y", size=36, color=GOLD_TXT, weight=800, dx=24, dy=-20)
ax.label(49, ppc(49), "Today", size=32, color=NAVY, weight=800, dx=24, dy=-6)
ax.label(55 * K, 0, "Future", size=32, color=GOLD_TXT, weight=800, dx=6, dy=-50)
cv.text(1240, 220, "Capacity grows through", size=32, color=INK, weight=750)
drivers = [("Investment", "in machines and equipment"), ("Skills", "education and health"),
           ("Infrastructure", "power, roads, ports, digital"), ("Technology", "better methods and ideas")]
for i, (h, s) in enumerate(drivers):
    y = 290 + i * 138
    cv.rect(1240, y, 520, 116, fill="#FFFFFF", stroke=EDGE, sw=3, rx=16)
    cv.rect(1240, y, 12, 116, fill=GOLD, rx=4)
    cv.text(1280, y + 40, h, size=32, color=INK, weight=750)
    cv.text(1280, y + 80, s, size=26, color=MUTED, weight=500)
cv.text(1240, 870, "Y is unattainable today, attainable later", size=28, color=GOLD_TXT, weight=700, italic=True)
cv.save("UFP_24_PPC_Growth")


# ------------------------------------------------------------------ market data
Dp = lambda q: 60 - q / 2          # inverse demand: Qd = 120 - 2P
Sp = lambda q: 10 + q / 3          # inverse supply: Qs = 3P - 30
Qd = lambda p: 120 - 2 * p
Qs = lambda p: 3 * p - 30
assert Qd(30) == Qs(30) == 60
sched_d = [(50, 20), (40, 40), (30, 60), (20, 80), (10, 100)]
sched_s = [(50, 120), (40, 90), (30, 60), (20, 30), (10, 0)]
for p, q in sched_d:
    assert Qd(p) == q and Dp(q) == p
for p, q in sched_s:
    assert Qs(p) == q and abs(Sp(q) - p) < 1e-9
YL, XL = "Price (₹ per kg)", "Quantity (tonnes per week)"


def market_ax(cv, X0, Y0, X1, Y1, xlab=XL, size=32, xmax=140, ymax=70):
    ax = Ax(cv, X0, Y0, X1, Y1, xmax=xmax, ymax=ymax, ylab=YL, xlab=xlab, size=size)
    return ax


# ================================================================ UFP_32 demand curve
cv = Canvas(1200, 980)
ax = market_ax(cv, 200, 820, 1050, 190, xlab="Quantity demanded (tonnes per week)")
grid(ax, range(20, 140, 20), range(10, 70, 10))
ax.poly(Dp, 6, 114, NAVY, 8)
ax.axes()
ax.xticks(range(20, 140, 20)); ax.yticks(range(10, 70, 10), "₹{}")
for p, q in sched_d:
    ax.dot(q, p, GOLD, 13)
ax.label(114, Dp(114), "D", size=48, color=NAVY, weight=800, dx=18, dy=-26)
cv.text(1150, 120, "Hypothetical market for tomatoes", size=28, color=MUTED, anchor="end", weight=600, italic=True)
cv.save("UFP_32_Demand_Curve")


# ================================================================ UFP_34 movement along vs shift of demand
cv = Canvas(2240, 860)
for p in range(2):
    ox = 20 + p * 1120
    panel_title(cv, ox, 52, p + 1, ["Own price falls: movement along D", "Income rises: demand shifts right"][p])
    ax = market_ax(cv, ox + 190, 690, ox + 1000, 175, xlab="Quantity of tomatoes", size=30)
    ax.xtitle_dy = 84
    if p == 0:
        ax.hguide(40, 40, "₹40"); ax.hguide(30, 60, "₹30")
        ax.vguide(40, 40, "40"); ax.vguide(60, 30, "60")
        ax.poly(Dp, 6, 114, NAVY, 8)
        ax.seg(40, 40, 60, 30, GOLD_TXT, 8, arrow_end=True, gap=22)
        ax.dot(40, 40, INK, 13); ax.dot(60, 30, INK, 13)
        ax.label(40, 40, "a", size=36, color=INK, weight=800, dx=10, dy=-36)
        ax.label(60, 30, "b", size=36, color=INK, weight=800, dx=14, dy=-34)
        ax.label(114, Dp(114), "D", size=44, color=NAVY, weight=800, dx=16, dy=-24)
        cv.lines(ox + 700, 265, ["Change in quantity", "demanded (40 to 60)"], size=30, color=GOLD_TXT, weight=750)
    else:
        D2 = lambda q: 60 - (q - 30) / 2   # Qd = 150 - 2P
        assert D2(70) == 40
        ax.hguide(40, 70, "₹40")
        ax.vguide(40, 40, "40"); ax.vguide(70, 40, "70")
        ax.poly(Dp, 6, 114, NAVY, 8)
        ax.poly(D2, 36, 136, GOLD, 8)
        ax.seg(40, 40, 70, 40, GOLD_TXT, 7, arrow_end=True, gap=22)
        ax.seg(22, Dp(22), 52, D2(52), GOLD_TXT, 6, arrow_end=True, gap=24)
        ax.dot(40, 40, INK, 13); ax.dot(70, 40, INK, 13)
        ax.label(114, Dp(114), "D_{1}", size=40, color=NAVY, weight=800, dx=10, dy=-30)
        ax.label(126, D2(126), "D_{2}", size=40, color=GOLD_TXT, weight=800, dx=18, dy=-30)
        cv.lines(ox + 700, 265, ["Increase in demand at", "every price (40 to 70)"], size=30, color=GOLD_TXT, weight=750)
    ax.axes()
    if p == 0:
        cv.line(ox + 1110, 110, ox + 1110, 820, EDGE, 3)
cv.save("UFP_34_Movement_vs_Shift_Demand_v2")


# ================================================================ UFP_36 supply curve
cv = Canvas(1200, 980)
ax = market_ax(cv, 200, 820, 1050, 190, xlab="Quantity supplied (tonnes per week)")
grid(ax, range(20, 140, 20), range(10, 70, 10))
ax.poly(Sp, 0, 130, NAVY, 8)
ax.axes()
ax.xticks(range(20, 140, 20)); ax.yticks(range(10, 70, 10), "₹{}")
for p, q in sched_s:
    ax.dot(q, p, GOLD, 13)
ax.label(130, Sp(130), "S", size=48, color=NAVY, weight=800, dx=14, dy=-30)
cv.text(1150, 120, "Hypothetical market for tomatoes", size=28, color=MUTED, anchor="end", weight=600, italic=True)
cv.save("UFP_36_Supply_Curve")


# ================================================================ UFP_37 movement along vs shift of supply
cv = Canvas(2240, 860)
for p in range(2):
    ox = 20 + p * 1120
    panel_title(cv, ox, 52, p + 1, ["Own price rises: movement along S", "Better seeds: supply shifts right"][p])
    ax = market_ax(cv, ox + 190, 690, ox + 1000, 175, xlab="Quantity of rice", size=30)
    ax.xtitle_dy = 84
    if p == 0:
        ax.hguide(30, 60, "₹30"); ax.hguide(40, 90, "₹40")
        ax.vguide(60, 30, "60"); ax.vguide(90, 40, "90")
        ax.poly(Sp, 0, 130, NAVY, 8)
        ax.seg(60, 30, 90, 40, GOLD_TXT, 8, arrow_end=True, gap=22)
        ax.dot(60, 30, INK, 13); ax.dot(90, 40, INK, 13)
        ax.label(60, 30, "a", size=36, color=INK, weight=800, dx=14, dy=34)
        ax.label(90, 40, "b", size=36, color=INK, weight=800, dx=14, dy=34)
        ax.label(130, Sp(130), "S", size=44, color=NAVY, weight=800, dx=12, dy=-26)
        cv.lines(ox + 520, 265, ["Change in quantity", "supplied (60 to 90)"], size=30, color=GOLD_TXT, weight=750)
    else:
        S2 = lambda q: (q / 3)            # Qs = 3P
        assert S2(90) == 30
        ax.hguide(30, 90, "₹30")
        ax.vguide(60, 30, "60"); ax.vguide(90, 30, "90")
        ax.poly(Sp, 0, 130, NAVY, 8)
        ax.poly(S2, 0, 136, GOLD, 8)
        ax.seg(60, 30, 90, 30, GOLD_TXT, 7, arrow_end=True, gap=22)
        ax.seg(80, Sp(80), 110, S2(110), GOLD_TXT, 6, arrow_end=True, gap=24)
        ax.dot(60, 30, INK, 13); ax.dot(90, 30, INK, 13)
        ax.label(130, Sp(130), "S_{1}", size=40, color=NAVY, weight=800, dx=-10, dy=-34, anchor="end")
        ax.label(136, S2(136), "S_{2}", size=40, color=GOLD_TXT, weight=800, dx=14, dy=-12)
        cv.lines(ox + 520, 265, ["Increase in supply at", "every price (60 to 90)"], size=30, color=GOLD_TXT, weight=750)
    ax.axes()
    if p == 0:
        cv.line(ox + 1110, 110, ox + 1110, 820, EDGE, 3)
cv.save("UFP_37_Movement_vs_Shift_Supply_v2")


# ================================================================ UFP_38 equilibrium and a change in demand
cv = Canvas(2240, 860)
D2 = lambda q: 60 - (q - 30) / 2       # Qd = 150 - 2P
P2 = 36; Q2 = 78
assert 150 - 2 * P2 == Q2 == 3 * P2 - 30
for p in range(2):
    ox = 20 + p * 1120
    panel_title(cv, ox, 52, p + 1, ["Market equilibrium", "Demand rises: new equilibrium"][p])
    ax = market_ax(cv, ox + 190, 690, ox + 1000, 175, xlab="Quantity (tonnes per week)", size=30)
    ax.xtitle_dy = 84
    if p == 0:
        ax.hguide(30, 60, "₹30"); ax.vguide(60, 30, "60")
        ax.poly(Dp, 6, 114, NAVY, 8); ax.poly(Sp, 0, 130, NAVY, 8)
        ax.dot(60, 30, GOLD, 17)
        ax.label(60, 30, "E", size=44, color=GOLD_TXT, weight=800, dx=-4, dy=-48, anchor="middle")
        ax.label(114, Dp(114), "D", size=44, color=NAVY, weight=800, dx=16, dy=-24)
        ax.label(130, Sp(130), "S", size=44, color=NAVY, weight=800, dx=12, dy=-26)
        cv.lines(ox + 560, 255, ["Quantity demanded =", "quantity supplied = 60"], size=30, color=GOLD_TXT, weight=750)
    else:
        ax.hguide(30, 60, "₹30"); ax.vguide(60, 30, "60")
        ax.hguide(P2, Q2, "₹36", color=GOLD_TXT); ax.vguide(Q2, P2, "78", color=GOLD_TXT)
        ax.poly(Dp, 6, 114, NAVY, 8); ax.poly(D2, 36, 136, GOLD, 8); ax.poly(Sp, 0, 130, NAVY, 8)
        ax.seg(20, Dp(20), 50, D2(50), GOLD_TXT, 6, arrow_end=True, gap=24)
        ax.dot(60, 30, INK, 14); ax.dot(Q2, P2, GOLD, 17)
        ax.label(60, 30, "E_{1}", size=36, color=INK, weight=800, dx=-12, dy=40, anchor="end")
        ax.label(Q2, P2, "E_{2}", size=38, color=GOLD_TXT, weight=800, dx=0, dy=-48, anchor="middle")
        ax.label(114, Dp(114), "D_{1}", size=38, color=NAVY, weight=800, dx=10, dy=-30)
        ax.label(126, D2(126), "D_{2}", size=38, color=GOLD_TXT, weight=800, dx=18, dy=-30)
        ax.label(130, Sp(130), "S", size=40, color=NAVY, weight=800, dx=12, dy=-26)
        cv.lines(ox + 760, 205, ["Price rises (₹30 to ₹36)", "Quantity rises (60 to 78)"], size=30, color=GOLD_TXT, weight=750)
    ax.axes()
    if p == 0:
        cv.line(ox + 1110, 110, ox + 1110, 820, EDGE, 3)
cv.save("UFP_38_Equilibrium_v2")


# ================================================================ UFP_39 shortage and surplus
cv = Canvas(2240, 860)
for p in range(2):
    ox = 20 + p * 1120
    low = p == 0
    price = 20 if low else 40
    qd, qs = Qd(price), Qs(price)
    assert (qd, qs) == ((80, 30) if low else (40, 90))
    panel_title(cv, ox, 52, p + 1, ["Price below equilibrium: shortage", "Price above equilibrium: surplus"][p])
    ax = market_ax(cv, ox + 190, 690, ox + 1000, 175, xlab="Quantity (tonnes per week)", size=30)
    ax.xtitle_dy = 84
    ax.hguide(30, 60, "₹30", color=MUTED)
    ax.poly(Dp, 6, 114, NAVY, 8); ax.poly(Sp, 0, 130, NAVY, 8)
    col = RED if low else BLUE
    a, b = ax.px(0, price); c, _ = ax.px(max(qd, qs) + 6, price)
    cv.line(a, b, c, b, col, 5, cap="butt")
    cv.text(a - 16, b, f"₹{price}", size=32, color=col, anchor="end", weight=800)
    ax.vguide(qs, price, str(qs), color=INK); ax.vguide(qd, price, str(qd), color=INK)
    ax.dot(qs, price, INK, 13); ax.dot(qd, price, INK, 13)
    ax.dot(60, 30, GOLD, 13)
    ax.label(60, 30, "E", size=34, color=GOLD_TXT, weight=800, dx=0, dy=-42, anchor="middle")
    ax.label(114, Dp(114), "D", size=40, color=NAVY, weight=800, dx=16, dy=-24)
    ax.label(130, Sp(130), "S", size=40, color=NAVY, weight=800, dx=12, dy=-26)
    lo, hi = min(qd, qs), max(qd, qs)
    yb = price - 7 if low else price + 7
    ax.seg(lo, yb, hi, yb, col, 5, arrow_end=True, arrow_start=True, gap=4)
    ax.label((lo + hi) / 2, yb, ("Shortage = " if low else "Surplus = ") + str(hi - lo), size=32, color=col,
             weight=800, anchor="middle", dy=34 if low else -34)
    # pressure on price
    xa, _ = ax.px(0, 0)
    _, y1 = ax.px(0, price); _, y2 = ax.px(0, 30)
    cv.line(xa + 34, y1 - (10 if low else -10), xa + 34, y2 + (14 if low else -14), GOLD_TXT, 7, arrow_end=True)
    cv.lines(ox + 600, 205, (["Qd 80 > Qs 30:", "price tends to rise"] if low else ["Qs 90 > Qd 40:", "price tends to fall"]),
             size=30, color=col, weight=750)
    ax.axes()
    if p == 0:
        cv.line(ox + 1110, 110, ox + 1110, 820, EDGE, 3)
cv.save("UFP_39_Shortage_Surplus_v2")


# ================================================================ UFP_40 onion supply falls
cv = Canvas(1300, 1000)
S2 = lambda q: 20 + q / 3              # Qs = 3P - 60
P2, Q2 = 36, 48
assert 120 - 2 * P2 == Q2 == 3 * P2 - 60
ax = market_ax(cv, 220, 800, 1090, 200, xlab="Quantity of onions (tonnes per week)", size=30)
ax.hguide(30, 60, "₹30"); ax.vguide(60, 30, "60")
ax.hguide(P2, Q2, "₹36", color=RED); ax.vguide(Q2, P2, "48", color=RED)
ax.poly(Dp, 6, 114, NAVY, 8); ax.poly(Sp, 0, 130, NAVY, 8); ax.poly(S2, 0, 120, GOLD, 8)
ax.seg(100, Sp(100), 70, S2(70), GOLD_TXT, 6, arrow_end=True, gap=24)
ax.dot(60, 30, INK, 14); ax.dot(Q2, P2, GOLD, 17)
ax.label(60, 30, "E_{1}", size=36, color=INK, weight=800, dx=22, dy=24)
ax.label(Q2, P2, "E_{2}", size=38, color=GOLD_TXT, weight=800, dx=0, dy=-50, anchor="middle")
ax.label(114, Dp(114), "D", size=42, color=NAVY, weight=800, dx=16, dy=-24)
ax.label(130, Sp(130), "S_{1}", size=38, color=NAVY, weight=800, dx=12, dy=-24)
ax.label(120, S2(120), "S_{2}", size=38, color=GOLD_TXT, weight=800, dx=12, dy=-24)
a, b = ax.px(100, Sp(100))
cv.step(a + 44, b + 4, 1, GOLD_TXT)
ax.axes()
# price up arrow on the y axis
xa = ax.X0 - 120
_, y30 = ax.px(0, 30); _, y36 = ax.px(0, 36)
cv.line(xa, y30 + 4, xa, y36 - 4, RED, 7, arrow_end=True)
cv.step(xa - 44, (y30 + y36) / 2, 2, RED)
# quantity left arrow under the x axis
_, yq = ax.px(0, 0)
xa60, _ = ax.px(60, 0); xa48, _ = ax.px(48, 0)
cv.line(xa60 - 4, yq + 136, xa48 + 4, yq + 136, RED, 7, arrow_end=True)
cv.step(xa60 + 40, yq + 136, 3, RED)
cv.text(1250, 110, "Hypothetical onion market", size=28, color=MUTED, anchor="end", weight=600, italic=True)
cv.save("UFP_40_Onion_Supply_Falls")
