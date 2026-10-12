"""YED deck: technical diagrams (exact functions; key values asserted).

Colour code: blue = normal, income elastic; green = normal, income inelastic; terracotta = inferior;
gold = key insight; navy = axes, original curves, text. Labels always carry the meaning in words.
Engel curves: income on the VERTICAL axis, quantity demanded on the HORIZONTAL axis.
"""
import os, sys, math
import numpy as np
from scipy.interpolate import PchipInterpolator
sys.path.insert(0, "/home/claude/work/diagrams")
import econsvg as E
E.PANEL = "#FFFDFA"
from econsvg import Canvas, INK, NAVY, GOLD, GOLD_TXT, GUIDE, MUTED

BLUE, GREEN, TERRA = "#2F5D8C", "#2E7D5B", "#B0412E"
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "svg")
os.makedirs(OUT, exist_ok=True)


def bare_svg(self):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{self.w}" height="{self.h}" viewBox="0 0 {self.w} {self.h}">'
            f'<defs>{"".join(self.defs)}</defs>{"".join(self.els)}</svg>')


Canvas.svg = bare_svg


class Ax:
    def __init__(self, cv, X0, Y0, X1, Y1, xmin=0, xmax=100, ymin=0, ymax=100, ylab="", xlab="", size=36):
        self.cv, self.X0, self.Y0, self.X1, self.Y1 = cv, X0, Y0, X1, Y1
        self.xmin, self.xmax, self.ymin, self.ymax = xmin, xmax, ymin, ymax
        self.ylab, self.xlab, self.size = ylab, xlab, size
        self.xtitle_dy = 104

    def px(self, x, y):
        return (self.X0 + (self.X1 - self.X0) * (x - self.xmin) / (self.xmax - self.xmin),
                self.Y0 - (self.Y0 - self.Y1) * (y - self.ymin) / (self.ymax - self.ymin))

    def axes(self, origin_label=True):
        cv = self.cv
        cv.line(self.X0, self.Y0, self.X0, self.Y1 - 30, INK, 4.5, arrow_end=True, cap="butt")
        cv.line(self.X0, self.Y0, self.X1 + 30, self.Y0, INK, 4.5, arrow_end=True, cap="butt")
        if origin_label:
            cv.text(self.X0 - 16, self.Y0 + 30, "0", size=30, color=MUTED, anchor="end")
        cv.text(self.X0 - 4, self.Y1 - 70, self.ylab, size=self.size, color=INK, anchor="start", weight=700)
        cv.text(self.X1 + 30, self.Y0 + self.xtitle_dy, self.xlab, size=self.size, color=INK, anchor="end", weight=700)

    def poly(self, f, x0, x1, color=NAVY, w=8, n=300, dash=None, param_y=False):
        """param_y=True: f maps y -> x (used for Engel curves, where income is on the vertical axis)."""
        if param_y:
            pts = [self.px(f(y), y) for y in np.linspace(x0, x1, n)]
        else:
            pts = [self.px(x, f(x)) for x in np.linspace(x0, x1, n)]
        self.cv.path("M" + " L".join(f"{a:.1f},{b:.1f}" for a, b in pts), color=color, w=w, dash=dash)

    def seg(self, x0, y0, x1, y1, color=NAVY, w=7, dash=None, arrow_end=False):
        a, b = self.px(x0, y0); c, d = self.px(x1, y1)
        self.cv.line(a, b, c, d, color, w, dash=dash, arrow_end=arrow_end)

    def hguide(self, y, x_to, label, color=INK, size=34, ldy=0):
        a, b = self.px(self.xmin, y); c, _ = self.px(x_to, y)
        self.cv.line(a, b, c, b, GUIDE, 3, dash="10 10", cap="butt")
        if label:
            self.cv.text(self.X0 - 16, b + ldy, label, size=size, color=color, anchor="end", weight=700)

    def vguide(self, x, y_to, label, color=INK, size=34, dy=42):
        a, b = self.px(x, self.ymin); _, d = self.px(x, y_to)
        self.cv.line(a, b, a, d, GUIDE, 3, dash="10 10", cap="butt")
        if label:
            self.cv.text(a, b + dy, label, size=size, color=color, anchor="middle", weight=700)

    def dot(self, x, y, fill=INK, r=13):
        a, b = self.px(x, y)
        self.cv.circle(a, b, r, fill)

    def label(self, x, y, s, size=32, color=INK, anchor="start", weight=700, dx=0, dy=0, halo=True):
        a, b = self.px(x, y)
        self.cv.text(a + dx, b + dy, s, size=size, color=color, anchor=anchor, weight=weight, halo=halo)


def save(name, cv):
    with open(os.path.join(OUT, name + ".svg"), "w") as f:
        f.write(cv.svg())
    print("saved", name)


def pct(a, b):
    return (b - a) / a * 100


# =============================================================== A: the YED response fan
cv = Canvas(1200, 980)
ax = Ax(cv, 170, 860, 890, 140, xmin=-10, xmax=10, ymin=-20, ymax=20,
        ylab="% change in quantity demanded", xlab="% change in income")
# quadrant tints
ax.cv.rect(*ax.px(0, 20), ax.px(10, 0)[0] - ax.px(0, 20)[0], ax.px(10, 0)[1] - ax.px(0, 20)[1], fill=BLUE, opacity=0.06)
ax.cv.rect(*ax.px(0, 0), ax.px(10, -20)[0] - ax.px(0, 0)[0], ax.px(10, -20)[1] - ax.px(0, 0)[1], fill=TERRA, opacity=0.06)
# centred axes through the origin
x0, y0 = ax.px(0, 0)
cv.line(ax.X0, y0, ax.X1 + 24, y0, INK, 4.5, arrow_end=True, cap="butt")
cv.line(x0, ax.Y0, x0, ax.Y1 - 24, INK, 4.5, arrow_end=True, cap="butt")
cv.text(x0 + 14, ax.Y1 - 50, "% change in quantity demanded", size=32, color=INK, anchor="start", weight=700)
cv.text((ax.X0 + ax.X1) / 2, ax.Y0 + 86, "% change in income", size=32, color=INK, anchor="middle", weight=700)
for v in (-10, -5, 5, 10):
    a, b = ax.px(v, 0); cv.line(a, b - 8, a, b + 8, INK, 3); cv.text(a, ax.Y0 + 36, f"{v:+d}%".replace("-", "−"), size=27, color=MUTED, anchor="middle", weight=600)
    cv.line(a, b + 10, a, ax.Y0 + 14, GUIDE, 1.5, dash="4 8", cap="butt")
for v in (-20, -10, 10, 20):
    a, b = ax.px(0, v); cv.line(a - 8, b, a + 8, b, INK, 3); cv.text(a - 16, b, f"{v:+d}%".replace("-", "−"), size=27, color=MUTED, anchor="end", weight=600)
ax.seg(-10, -10, 10, 10, GUIDE, 4, dash="12 10")
lines = [(2.0, BLUE, "+2.0"), (0.5, GREEN, "+0.5"), (-0.4, TERRA, "−0.4")]
for k, col, lab in lines:
    ax.seg(-10, -10 * k, 10, 10 * k, col, 8)
    ax.dot(10, 10 * k, col, 12)
assert [10 * k for k, _, _ in lines] == [20.0, 5.0, -4.0]
ax.label(10, 20, "YED = +2.0", size=34, color=BLUE, dx=22, dy=0)
ax.label(10, 20, "income elastic", size=28, color=BLUE, dx=22, dy=36, weight=600)
ax.label(10, 10, "YED = +1 (reference)", size=28, color=MUTED, dx=22, dy=0, weight=700)
ax.label(10, 5, "YED = +0.5", size=34, color=GREEN, dx=22, dy=-2)
ax.label(10, 5, "income inelastic", size=28, color=GREEN, dx=22, dy=34, weight=600)
ax.label(10, -4, "YED = −0.4", size=34, color=TERRA, dx=22, dy=6)
ax.label(10, -4, "inferior", size=28, color=TERRA, dx=22, dy=40, weight=600)
ax.label(1.0, 17, "income up, QD up:", size=27, color=BLUE, weight=700)
ax.label(1.0, 17, "normal good", size=27, color=BLUE, dy=34, weight=700)
ax.label(1.0, -14, "income up, QD down:", size=27, color=TERRA, weight=700)
ax.label(1.0, -14, "inferior good", size=27, color=TERRA, dy=34, weight=700)
cv.badge(1190, 46, "Both axes in %: slope = YED", INK, size=28, anchor="end")
save("YED_A_Response_Fan", cv)


# =============================================================== B + C: demand shifts (2 x 2)
def shift_panel(cv, ox, oy, direction, col, row_lab):
    """One P-Q panel; direction +1 shifts D right, -1 left. Linear D: P = a - Q (data 0..100)."""
    ax = Ax(cv, ox + 90, oy + 380, ox + 520, oy + 110, xmax=100, ymax=100, ylab="Price", xlab="Quantity", size=30)
    ax.xtitle_dy = 70
    d1 = lambda q: 80 - q
    d2 = lambda q: 80 - (q - 22 * direction)
    p1 = 40
    q1, q2 = 40, 40 + 22 * direction
    assert d1(q1) == p1 and d2(q2) == p1
    ax.hguide(p1, max(q1, q2), "P₁", size=32)
    ax.vguide(q1, p1, "Q₁", size=30, dy=36); ax.vguide(q2, p1, "Q₂", size=30, dy=36)
    ax.poly(d1, 5, 75, NAVY, 7)
    lo = max(5, 5 + 22 * direction); hi = min(97, 75 + 22 * direction)
    ax.poly(d2, lo, hi, col, 7)
    ax.axes(origin_label=False)
    ax.label(75, d1(75), "D₁", size=36, color=NAVY, dx=8, dy=-6)
    ax.label(hi, d2(hi), "D₂", size=36, color=col, dx=8, dy=-6)
    ax.dot(q1, p1, NAVY, 11); ax.dot(q2, p1, col, 11)
    a, b = ax.px(q1, 64); c, _ = ax.px(q2, 64)
    if direction > 0:
        a, c = a + 30, c + 30
    else:
        a, c = a - 30, c - 30
    cv.line(a, b, c, b, col, 6, arrow_end=True)
    return ax


cv = Canvas(1420, 1130)
cv.text(470, 40, "Income rises", size=38, color=INK, anchor="middle", weight=800)
cv.text(1050, 40, "Income falls", size=38, color=INK, anchor="middle", weight=800)
rows = [("Normal good", "YED > 0", BLUE, (+1, -1)), ("Inferior good", "YED < 0", TERRA, (-1, +1))]
for i, (name, sign, col, dirs) in enumerate(rows):
    oy = 40 + i * 540
    cv.text(18, oy + 230, name, size=34, color=col, anchor="start", weight=800)
    cv.text(18, oy + 274, sign, size=32, color=col, anchor="start", weight=700)
    for j, d in enumerate(dirs):
        shift_panel(cv, 230 + j * 580, oy, d, col, name)
        cap = "D shifts right" if d > 0 else "D shifts left"
        cv.text(230 + j * 580 + 305, oy + 505, f"{cap}: Q₁ → Q₂ at P₁", size=28, color=col, anchor="middle", weight=700)
save("YED_BC_Demand_Shifts", cv)


# =============================================================== D: Engel curves (income vertical, quantity horizontal)
Y_A, Y_B = 2000, 2500


def engel(name, qa, qb, unit, col, verdict, yrange, xmax=14):
    e = math.log(qb / qa) / math.log(Y_B / Y_A)
    q = lambda y: qa * (y / Y_A) ** e
    assert abs(q(Y_A) - qa) < 1e-9 and abs(q(Y_B) - qb) < 1e-9
    yed = pct(qa, qb) / pct(Y_A, Y_B)
    cv = Canvas(820, 820)
    ax = Ax(cv, 175, 650, 740, 150, xmin=0, xmax=xmax, ymin=0, ymax=3200,
            ylab="Income ($ per month)", xlab=f"Quantity ({unit})", size=32)
    ax.xtitle_dy = 98
    ax.hguide(Y_A, qa, "$2,000", size=30); ax.hguide(Y_B, qb, "$2,500", size=30, ldy=0)
    ax.vguide(qa, Y_A, f"{qa:g}", size=30, dy=40); ax.vguide(qb, Y_B, f"{qb:g}", size=30, dy=40)
    ax.poly(q, yrange[0], yrange[1], col, 9, param_y=True)
    ax.axes()
    ax.dot(qa, Y_A, INK, 13); ax.dot(qb, Y_B, col, 13)
    side = 1 if qb >= qa else -1
    ax.label(qa, Y_A, "A", size=36, color=INK, dx=-24 * side, dy=34, anchor="end" if side > 0 else "start")
    ax.label(qb, Y_B, "B", size=36, color=col, dx=22 * side, dy=-26, anchor="start" if side > 0 else "end")
    cv.badge(810, 44, verdict.format(yed=yed).replace("-", "−"), col, size=30, anchor="end")
    save(name, cv)
    return yed


r1 = engel("YED_D1_Engel_Inelastic", 10, 11, "kg of staple food a month", GREEN, "YED = +{yed:.1f}: income inelastic", (300, 3150))
r2 = engel("YED_D2_Engel_Elastic", 4, 6, "cinema tickets a month", BLUE, "YED = +{yed:.1f}: income elastic", (500, 3150))
r3 = engel("YED_D3_Engel_Inferior", 10, 8, "packs of value pasta a month", TERRA, "YED = {yed:.1f}: inferior", (1450, 3150))
assert round(r1, 2) == 0.40 and round(r2, 2) == 2.00 and round(r3, 2) == -0.80

# =============================================================== D0: single annotated Engel curve (slide 9, cinema)
e = math.log(6 / 4) / math.log(1.25)
qc = lambda y: 4 * (y / 2000) ** e
cv = Canvas(1180, 940)
ax = Ax(cv, 230, 780, 1040, 150, xmin=0, xmax=10, ymin=0, ymax=3200,
        ylab="Income ($ per month)", xlab="Cinema tickets a month", size=36)
ax.hguide(2000, 4, "$2,000"); ax.hguide(2500, 6, "$2,500")
ax.vguide(4, 2000, "4"); ax.vguide(6, 2500, "6")
ax.poly(qc, 400, 3150, BLUE, 10, param_y=True)
ax.axes()
ax.dot(4, 2000, INK, 15); ax.dot(6, 2500, BLUE, 15)
ax.label(4, 2000, "A", size=42, color=INK, dx=-26, dy=40, anchor="end")
ax.label(6, 2500, "B", size=42, color=BLUE, dx=24, dy=-28)
ax.label(qc(3150), 3150, "Engel curve", size=36, color=BLUE, dx=-20, dy=-30, anchor="end")
# step annotations
a, b = ax.px(7.2, 2000); c, d = ax.px(7.2, 2500)
cv.line(a, b - 4, a, d + 8, GOLD_TXT, 6, arrow_end=True)
cv.text(a + 18, (b + d) / 2, "income +25%", size=32, color=GOLD_TXT, anchor="start", weight=800)
a, b = ax.px(4.1, 600); c, _ = ax.px(5.9, 600)
cv.line(a, b, c, b, GOLD_TXT, 6, arrow_end=True)
cv.text((a + c) / 2, b - 30, "QD +50%", size=32, color=GOLD_TXT, anchor="middle", weight=800)
cv.badge(1170, 46, "YED = +50% ÷ +25% = +2.0", BLUE, size=32, anchor="end")
assert round(pct(4, 6) / pct(2000, 2500), 6) == 2.0
save("YED_D0_Engel_Cinema", cv)

# =============================================================== E: Engel curve movement and demand-curve shift
cv = Canvas(1720, 1000)
axL = Ax(cv, 190, 840, 700, 260, xmin=0, xmax=10, ymin=0, ymax=3200, ylab="Income ($ per month)", xlab="Quantity demanded", size=32)
axR = Ax(cv, 1100, 840, 1610, 260, xmin=0, xmax=10, ymin=0, ymax=20, ylab="Price ($)", xlab="Quantity demanded", size=32)
axL.xtitle_dy = axR.xtitle_dy = 100
axL.hguide(2000, 4, "$2,000", size=30); axL.hguide(2500, 6, "$2,500", size=30)
axL.vguide(4, 2000, "4", size=30); axL.vguide(6, 2500, "6", size=30)
axL.poly(qc, 400, 3150, BLUE, 9, param_y=True)
axL.axes()
axL.dot(4, 2000, INK, 13); axL.dot(6, 2500, BLUE, 13)
axL.label(4, 2000, "A", size=38, dx=-24, dy=36, anchor="end"); axL.label(6, 2500, "B", size=38, color=BLUE, dx=22, dy=-24)
axL.label(qc(3150), 3150, "Engel curve", size=32, color=BLUE, dx=-16, dy=-24, anchor="end")
cv.text(445, 50, "Movement along the Engel curve", size=36, color=INK, anchor="middle", weight=800)
cv.text(445, 96, "income $2,000 → $2,500: A → B", size=30, color=MUTED, anchor="middle", weight=600)
D1 = lambda qq: 16 - 1.5 * qq
D2 = lambda qq: 19 - 1.5 * qq
assert D1(4) == 10 and D2(6) == 10
axR.hguide(10, 6, "P₁ $10", size=30)
axR.vguide(4, 10, "4", size=30); axR.vguide(6, 10, "6", size=30)
axR.poly(D1, 0.6, 8, NAVY, 8); axR.poly(D2, 2.6, 10, BLUE, 8)
axR.axes()
axR.label(8, D1(8), "D₁", size=36, color=NAVY, dx=10, dy=8)
axR.label(10, D2(10), "D₂", size=36, color=BLUE, dx=10, dy=8)
axR.dot(4, 10, INK, 13); axR.dot(6, 10, BLUE, 13)
a, b = axR.px(4.2, 13.8); c, _ = axR.px(6.2, 13.8)
cv.line(a, b, c, b, BLUE, 6, arrow_end=True)
cv.text(1355, 50, "Shift of the demand curve", size=36, color=INK, anchor="middle", weight=800)
cv.text(1355, 96, "D₁ at income $2,000 · D₂ at income $2,500", size=30, color=MUTED, anchor="middle", weight=600)
cv.text(1355, 136, "same price P₁: quantity demanded 4 → 6", size=30, color=MUTED, anchor="middle", weight=600)
cv.line(790, 330, 950, 330, GOLD_TXT, 7, arrow_end=True)
cv.text(870, 290, "same income rise", size=26, color=GOLD_TXT, anchor="middle", weight=800)
save("YED_E_Engel_and_Demand_Shift", cv)

# =============================================================== F: bus journeys, normal then inferior
knots_y = np.array([600, 1000, 2000, 2500, 3200, 4000, 5000, 5800])
knots_q = np.array([15, 20, 30, 33, 35, 30, 24, 19])
bus = PchipInterpolator(knots_y, knots_q)
assert float(bus(2000)) == 30 and float(bus(2500)) == 33 and float(bus(4000)) == 30 and float(bus(5000)) == 24
ys = np.linspace(600, 5800, 2000); peak_y = ys[np.argmax(bus(ys))]
assert abs(peak_y - 3200) < 5
yed_low = pct(30, 33) / pct(2000, 2500); yed_high = pct(30, 24) / pct(4000, 5000)
assert round(yed_low, 2) == 0.40 and round(yed_high, 2) == -0.80
cv = Canvas(1240, 980)
ax = Ax(cv, 230, 820, 1080, 150, xmin=0, xmax=40, ymin=0, ymax=6200,
        ylab="Household income ($ per month)", xlab="Bus journeys a month", size=34)
ax.cv.rect(ax.X0, ax.px(0, 3200)[1], ax.X1 - ax.X0, ax.Y0 - ax.px(0, 3200)[1], fill=BLUE, opacity=0.06)
ax.cv.rect(ax.X0, ax.px(0, 6200)[1], ax.X1 - ax.X0, ax.px(0, 3200)[1] - ax.px(0, 6200)[1], fill=TERRA, opacity=0.07)
for yv, lab in [(2000, "$2,000"), (2500, "$2,500"), (4000, "$4,000"), (5000, "$5,000")]:
    ax.hguide(yv, float(bus(yv)), lab, size=29)
ax.hguide(3200, 35, "", size=29)
ax.vguide(24, 5000, "24", size=29, dy=40); ax.vguide(30, 4000, "30", size=29, dy=40); ax.vguide(33, 2500, "33", size=29, dy=40)
ax.poly(lambda y: float(bus(y)), 600, 5800, NAVY, 9, param_y=True)
ax.axes()
for (qq, yv, nm, col, dx, dy, anc) in [(30, 2000, "A", BLUE, -22, 34, "end"), (33, 2500, "B", BLUE, -22, -20, "end"),
                                         (30, 4000, "C", TERRA, -22, 34, "end"), (24, 5000, "D", TERRA, -22, 0, "end")]:
    ax.dot(qq, yv, col, 13); ax.label(qq, yv, nm, size=36, color=col, dx=dx, dy=dy, anchor=anc)
ax.dot(35, 3200, GOLD_TXT, 14)
ax.label(35, 3200, "turning point", size=30, color=GOLD_TXT, dx=24, dy=-6)
ax.label(35, 3200, "about $3,200", size=28, color=GOLD_TXT, dx=24, dy=30, weight=600)
ax.label(2, 1300, "normal over this range:", size=30, color=BLUE)
ax.label(2, 1300, "A → B, YED = +0.4", size=30, color=BLUE, dy=38)
ax.label(2, 5700, "inferior over this range:", size=30, color=TERRA)
ax.label(2, 5700, "C → D, YED = −0.8", size=30, color=TERRA, dy=38)
cv.badge(1230, 46, "Illustrative household data", INK, size=28, anchor="end")
save("YED_F_Bus_Engel", cv)

# =============================================================== H2: stylised sector shares as income per head rises
cv = Canvas(1360, 900)
ax = Ax(cv, 160, 740, 1060, 170, xmin=0, xmax=10, ymin=0, ymax=100,
        ylab="Share of output or employment", xlab="Income per head rises over time", size=32)
t = np.linspace(0, 10, 300)
prim = lambda x: 62 * np.exp(-x / 3.2) + 6
manu = lambda x: 16 + 18 * np.exp(-((x - 5.0) / 2.6) ** 2)
serv = lambda x: 100 - prim(x) - manu(x)
assert all(abs(prim(x) + manu(x) + serv(x) - 100) < 1e-9 for x in t)
assert all(np.diff(serv(t)) > 0) and all(np.diff(prim(t)) < 0)
ax.poly(lambda x: float(prim(x)), 0, 10, GREEN, 9)
ax.poly(lambda x: float(manu(x)), 0, 10, GOLD, 9)
ax.poly(lambda x: float(serv(x)), 0, 10, BLUE, 9)
ax.axes(origin_label=False)
ax.label(10, float(prim(10)), "Primary", size=34, color=GREEN, dx=14, dy=16)
ax.label(10, float(manu(10)), "Manufacturing", size=34, color=GOLD_TXT, dx=14, dy=-16)
ax.label(10, float(serv(10)), "Services", size=34, color=BLUE, dx=14, dy=0)
ax.label(0.3, float(prim(0.3)) + 6, "share often falls", size=28, color=GREEN, weight=700)
ax.label(5.0, float(manu(5.0)) + 6, "may rise, then fall", size=28, color=GOLD_TXT, anchor="middle", weight=700)
ax.label(2.4, float(serv(2.4)) + 11, "share often rises", size=28, color=BLUE, weight=700)
cv.badge(1350, 46, "Stylised pattern, not data", INK, size=28, anchor="end")
save("YED_H_Sector_Shares_Stylised", cv)
