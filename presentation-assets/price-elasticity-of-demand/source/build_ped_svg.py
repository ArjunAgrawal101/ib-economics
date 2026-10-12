"""PED deck: technical diagrams (v3 family: borderless, transparent, large type).

Every curve is an exact function; every labelled point, rectangle and area is computed from it,
and the key numbers are asserted so a wrong geometry fails the build.
Axes: price ($) vertical, quantity demanded horizontal.
"""
import os, sys, math
sys.path.insert(0, "/home/claude/work/diagrams")
import econsvg as E
E.PANEL = "#FFFDFA"
from econsvg import Canvas, INK, NAVY, GOLD, GOLD_TXT, APP, DEP, CB, GUIDE, MUTED, FONT

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "svg")
os.makedirs(OUT, exist_ok=True)


def bare_svg(self):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{self.w}" height="{self.h}" viewBox="0 0 {self.w} {self.h}">'
            f'<defs>{"".join(self.defs)}</defs>{"".join(self.els)}</svg>')


Canvas.svg = bare_svg
CURVE, AXIS, TICK, NOTE, BADGE = 40, 32, 32, 27, 30


class Ax:
    """Data box [0,xmax] x [0,ymax] mapped to pixels; origin bottom-left at (X0,Y0)."""

    def __init__(self, cv, X0, Y0, X1, Y1, xmax=100, ymax=100, ylab=("Price ($)",), xlab=("Quantity demanded",)):
        self.cv, self.X0, self.Y0, self.X1, self.Y1, self.xmax, self.ymax = cv, X0, Y0, X1, Y1, xmax, ymax
        self.ylab, self.xlab = ylab, xlab
        self.xtitle_dy = 112

    def px(self, x, y):
        return (self.X0 + (self.X1 - self.X0) * x / self.xmax, self.Y0 - (self.Y0 - self.Y1) * y / self.ymax)

    def axes(self, size=AXIS):
        cv = self.cv
        cv.line(self.X0, self.Y0, self.X0, self.Y1 - 26, INK, 4, arrow_end=True, cap="butt")
        cv.line(self.X0, self.Y0, self.X1 + 26, self.Y0, INK, 4, arrow_end=True, cap="butt")
        cv.text(self.X0 - 14, self.Y0 + 26, "0", size=26, color=MUTED, anchor="end")
        for i, s in enumerate(self.ylab):
            cv.text(self.X0 - 4, self.Y1 - 64 + i * 32, s, size=size if i == 0 else size - 4,
                    color=INK if i == 0 else MUTED, anchor="start", weight=700 if i == 0 else 500)
        for i, s in enumerate(self.xlab):
            cv.text(self.X1 + 26, self.Y0 + self.xtitle_dy + i * 30, s, size=size if i == 0 else size - 4,
                    color=INK if i == 0 else MUTED, anchor="end", weight=700 if i == 0 else 500)

    def poly(self, f, x0, x1, color=NAVY, w=6, n=200, dash=None):
        pts = [self.px(x0 + (x1 - x0) * i / n, f(x0 + (x1 - x0) * i / n)) for i in range(n + 1)]
        self.cv.path("M" + " L".join(f"{a:.1f},{b:.1f}" for a, b in pts), color=color, w=w, dash=dash)

    def seg(self, x0, y0, x1, y1, color=NAVY, w=6, dash=None):
        a, b = self.px(x0, y0); c, d = self.px(x1, y1)
        self.cv.line(a, b, c, d, color, w, dash=dash)

    def rect(self, x0, y0, x1, y1, fill, opacity=0.85, stroke=None, dash=None):
        a, b = self.px(x0, y1); c, d = self.px(x1, y0)
        self.cv.rect(a, b, c - a, d - b, fill=fill, opacity=opacity, stroke=stroke, sw=3, dash=dash)

    def hguide(self, y, x_to, label, color=INK, size=TICK, ldy=0):
        a, b = self.px(0, y); c, _ = self.px(x_to, y)
        self.cv.line(a, b, c, b, GUIDE, 2.5, dash="9 9", cap="butt")
        if label:
            self.cv.text(self.X0 - 14, b + ldy, label, size=size, color=color, anchor="end", weight=700)

    def vguide(self, x, y_to, label, color=INK, size=TICK, dy=38):
        a, b = self.px(x, 0); _, d = self.px(x, y_to)
        self.cv.line(a, b, a, d, GUIDE, 2.5, dash="9 9", cap="butt")
        if label:
            self.cv.text(a, b + dy, label, size=size, color=color, anchor="middle", weight=700)

    def dot(self, x, y, fill=INK, r=11):
        a, b = self.px(x, y)
        self.cv.circle(a, b, r, fill)

    def label(self, x, y, s, size=NOTE, color=INK, anchor="start", weight=700, dx=0, dy=0, halo=True):
        a, b = self.px(x, y)
        self.cv.text(a + dx, b + dy, s, size=size, color=color, anchor=anchor, weight=weight, halo=halo)


def save(name, cv):
    with open(os.path.join(OUT, name + ".svg"), "w") as f:
        f.write(cv.svg())
    print("saved", name)


def pct(a, b):
    return (b - a) / a * 100


# =========================================================== PED_07: elastic vs inelastic, same axes
cv = Canvas(1150, 960); ax = Ax(cv, 230, 790, 1000, 140)
ax.axes()
Dinel = lambda q: 140 - 2 * q          # through (50,40) and (55,30)
Del = lambda q: 60 - 0.4 * q           # through (50,40) and (75,30)
assert Dinel(50) == 40 and Dinel(55) == 30 and Del(50) == 40 and Del(75) == 30
assert round(pct(50, 55)) == 10 and round(pct(50, 75)) == 50 and round(pct(40, 30)) == -25
ax.poly(Dinel, 20, 70, NAVY); ax.poly(Del, 0, 100, GOLD)
ax.label(42, 62, "D relatively", size=32, color=NAVY, dx=14)
ax.label(42, 62, "price inelastic", size=32, color=NAVY, dx=14, dy=38)
ax.label(2, 78, "D relatively", size=32, color=GOLD_TXT, dx=8)
ax.label(2, 78, "price elastic", size=32, color=GOLD_TXT, dx=8, dy=38)
ax.hguide(40, 50, "P₁ $40"); ax.hguide(30, 75, "P₂ $30")
ax.vguide(50, 40, "Q₁ 50"); ax.vguide(55, 30, "55", dy=76); ax.vguide(75, 30, "75")
ax.dot(50, 40); ax.dot(55, 30, NAVY); ax.dot(75, 30, GOLD_TXT)
a, b = ax.px(50, 20); c, _ = ax.px(55, 20)
cv.line(a + 4, b, c - 4, b, NAVY, 5, arrow_end=True)
cv.text(a - 12, b, "+10%", size=34, color=NAVY, anchor="end", weight=800)
a, b = ax.px(50, 10); c, _ = ax.px(75, 10)
cv.line(a + 4, b, c - 4, b, GOLD_TXT, 5, arrow_end=True)
cv.text(c + 14, b, "+50%", size=34, color=GOLD_TXT, anchor="start", weight=800)
a, b = ax.px(6, 39); _, d = ax.px(6, 31)
cv.line(a, b, a, d, DEP, 6, arrow_end=True)
cv.text(a + 16, (b + d) / 2, "−25%", size=30, color=DEP, anchor="start", weight=800)
cv.badge(1140, 46, "Same axes, same scale", INK, size=28, anchor="end")
save("PED_07_Elastic_vs_Inelastic", cv)

# =========================================================== PED_08a/b/c: three special cases
def special(name, kind):
    cv = Canvas(900, 880); ax = Ax(cv, 150, 700, 820, 150, ylab=("Price ($)",), xlab=("Quantity",))
    ax.axes(size=38)
    if kind == "elastic":
        ax.seg(0, 50, 96, 50, NAVY, 8); ax.label(96, 50, "D", size=48, color=NAVY, dx=8, dy=-30, anchor="end")
        ax.hguide(50, 0, "P");
        ax.label(48, 72, "price above P:", size=34, color=DEP, anchor="middle")
        ax.label(48, 72, "quantity → 0", size=34, color=DEP, anchor="middle", dy=42)
        ax.label(48, 28, "at P: any quantity", size=34, color=INK, anchor="middle")
        cv.badge(890, 46, "|PED| → ∞", NAVY, size=36, anchor="end")
    elif kind == "inelastic":
        ax.seg(50, 0, 50, 96, NAVY, 8); ax.label(50, 96, "D", size=48, color=NAVY, dx=18, dy=8)
        ax.hguide(35, 50, "P₁"); ax.hguide(70, 50, "P₂")
        ax.vguide(50, 0, "Q", dy=40)
        ax.dot(50, 35); ax.dot(50, 70, DEP)
        a, b = ax.px(50, 37); _, d = ax.px(50, 68)
        cv.line(a - 40, b, a - 40, d, DEP, 6, arrow_end=True)
        ax.label(56, 52, "price rises,", size=34, color=DEP)
        ax.label(56, 52, "quantity unchanged", size=34, color=DEP, dy=42)
        cv.badge(890, 46, "PED = 0", NAVY, size=36, anchor="end")
    else:
        k = 1800
        f = lambda q: k / q
        ax.rect(0, 30, 30, 60, fill=DEP, opacity=0.22)          # revenue lost when P falls 60 -> 30
        ax.rect(30, 0, 60, 30, fill=APP, opacity=0.22)          # revenue gained
        ax.rect(0, 0, 30, 30, fill="#C9CED6", opacity=0.45)           # revenue kept
        ax.poly(f, 18.5, 100, NAVY, 8)
        assert abs(30 * f(30) - 1800) < 1e-9 and abs(60 * f(60) - 1800) < 1e-9
        ax.label(100, f(100), "D", size=48, color=NAVY, dx=-6, dy=-36, anchor="end")
        ax.hguide(60, 30, "60"); ax.hguide(30, 60, "30")
        ax.vguide(30, 60, "30"); ax.vguide(60, 30, "60")
        ax.dot(30, 60); ax.dot(60, 30, GOLD_TXT)
        ax.rect(0, 0, 30, 60, fill="none", opacity=1, stroke=NAVY)
        ax.rect(0, 0, 60, 30, fill="none", opacity=1, stroke=GOLD_TXT, dash="10 8")
        ax.label(15, 45, "−900", size=34, color=DEP, anchor="middle", dy=12)
        ax.label(45, 15, "+900", size=34, color=APP, anchor="middle", dy=12)
        ax.label(64, 66, "P × Q = 1,800", size=34, color=INK)
        ax.label(64, 66, "at every point", size=30, color=MUTED, dy=40, weight=600)
        ax.label(64, 66, "−900 + 900 = 0", size=28, color=MUTED, dy=80, weight=600)
        cv.badge(890, 46, "|PED| = 1", NAVY, size=36, anchor="end")
    save(name, cv)

special("PED_08a_Perfectly_Elastic", "elastic")
special("PED_08b_Perfectly_Inelastic", "inelastic")
special("PED_08c_Unitary", "unit")

# =========================================================== PED_09: HL PED along P = 90 - Q
L = lambda q: 90 - q
cv = Canvas(1150, 960); ax = Ax(cv, 200, 790, 980, 140)
ax.axes()
ax.poly(L, 0, 90, NAVY, 7)
ax.hguide(45, 45, "$45"); ax.vguide(45, 45, "45")
ax.label(0, 90, "$90", size=TICK, color=INK, anchor="end", dx=-14)
ax.label(90, 0, "90", size=TICK, color=INK, anchor="middle", dy=36)
ax.dot(0, 90, DEP, r=12); ax.dot(45, 45, INK, r=13); ax.dot(90, 0, APP, r=12)
ax.label(3, 90, "|PED| → ∞ as Q → 0", size=30, color=DEP, dx=10, dy=-34)
ax.label(45, 45, "|PED| = 1 (midpoint)", size=32, color=INK, dx=-22, dy=52, anchor="end")
ax.label(90, 0, "|PED| → 0", size=30, color=APP, dx=14, dy=-62)
ax.label(90, 0, "as P → 0", size=30, color=APP, dx=14, dy=-26)
# zone brackets parallel to the line, offset outward
def zone(q0, q1, text, col, off=56):
    a, b = ax.px(q0, L(q0)); c, d = ax.px(q1, L(q1))
    nx, ny = (d - b), -(c - a); n = math.hypot(nx, ny); nx, ny = nx / n * off, ny / n * off
    cv.line(a + nx, b + ny, c + nx, d + ny, col, 5, arrow_end=True, arrow_start=True)
    mx, my = (a + c) / 2 + nx * 1.7, (b + d) / 2 + ny * 1.7
    cv.text(mx, my, text, size=30, color=col, anchor="start", weight=800)
zone(9, 41, "elastic: |PED| > 1", DEP)
zone(49, 81, "inelastic: |PED| < 1", APP)
ax.label(62, 62, "constant slope:", size=28, color=MUTED, weight=600)
ax.label(62, 62, "each $1 fall adds 1 unit", size=28, color=MUTED, dy=36, weight=600)
cv.badge(1140, 46, "P = 90 − Q", INK, size=28, anchor="end")
save("PED_09_HL_Linear_Curve", cv)

# =========================================================== PED_10: four points on P = 90 - Q
cv = Canvas(1150, 960); ax = Ax(cv, 200, 790, 980, 140)
ax.axes()
ax.poly(L, 0, 90, NAVY, 6)
pts = [("A", 20), ("B", 45), ("C", 70), ("D", 80)]
for name, q in pts:
    p = L(q); ped = p / q
    ax.dot(q, p, INK, r=12)
    txt = f"{name} ({q}, ${p:.0f}): |PED| = {ped:.2f}"
    if name == "D":
        txt = "D (80, $10): |PED| = 0.13"
    dx, dy, anc = (26, -20, "start") if name in ("A", "B") else (20, -34, "start")
    if name in ("C", "D"):
        dx, dy, anc = -26, 12, "end"
    ax.label(q, p, txt, size=32, color=INK, dx=dx, dy=dy, anchor=anc)
assert [round(L(q) / q, 3) for _, q in pts] == [3.5, 1.0, 0.286, 0.125]
ax.label(46, 90, "|PED| = P ÷ Q at each point here (b = 1)", size=30, color=MUTED, anchor="middle", weight=700)
cv.badge(1140, 46, "P = 90 − Q", INK, size=28, anchor="end")
save("PED_10_HL_Four_Points", cv)

# =========================================================== PED_17a/b: revenue gain and loss for a price rise
def revenue(name, f, x_range, p1, q1, p2, q2, title, good):
    cv = Canvas(1100, 960); ax = Ax(cv, 200, 790, 940, 150)
    gain = (p2 - p1) * q2; loss = p1 * (q1 - q2)
    ax.rect(0, 0, q2, p1, fill="#C9CED6", opacity=0.55)
    ax.rect(0, p1, q2, p2, fill=APP, opacity=0.78)
    ax.rect(q2, 0, q1, p1, fill=DEP, opacity=0.78)
    ax.poly(f, *x_range, color=NAVY, w=7)
    if f(x_range[1]) < 8:
        ax.label(x_range[0], f(x_range[0]), "D", size=CURVE, color=NAVY, dx=-16, dy=26, anchor="end")
    else:
        ax.label(x_range[1], f(x_range[1]), "D", size=CURVE, color=NAVY, dx=10, dy=-6)
    if q1 - q2 < 12:
        ax.xtitle_dy = 150
    ax.hguide(p1, q1, f"P₁ ${p1}"); ax.hguide(p2, q2, f"P₂ ${p2}")
    ax.vguide(q2, p2, f"Q₂ {q2}"); ax.vguide(q1, p1, f"Q₁ {q1}", dy=76 if q1 - q2 < 12 else 38)
    ax.dot(q1, p1); ax.dot(q2, p2, NAVY)
    ax.axes()
    ax.label(q2 / 2, (p1 + p2) / 2, f"gain +${gain:,.0f}", size=32, color="#FFFFFF", anchor="middle", halo=False)
    if q1 - q2 >= 20:
        ax.label((q1 + q2) / 2, p1 / 2, f"loss −${loss:,.0f}", size=32, color="#FFFFFF", anchor="middle", halo=False)
    else:
        yl = p1 * 0.45
        a, b = ax.px((q1 + q2) / 2, yl)
        qd = next(q for q in [x_range[0] + i * 0.05 for i in range(4000)] if f(q) <= yl)   # where D crosses this height
        c, _ = ax.px(qd, yl)
        cv.line(a + 6, b, c + 22, b, DEP, 4)
        cv.text(c + 32, b, f"loss −${loss:,.0f}", size=32, color=DEP, anchor="start", weight=800)
    tr1, tr2 = p1 * q1, p2 * q2
    assert tr2 - tr1 == gain - loss
    cv.badge(1090, 46, title.format(tr1=tr1, tr2=tr2), APP if good else DEP, size=28, anchor="end")
    save(name, cv)
    return gain, loss, tr1, tr2

fi = lambda q: 40 - (20 / 7) * (q - 70)        # inelastic: (70,40) and (63,60)
assert abs(fi(63) - 60) < 1e-9
print(revenue("PED_17a_Revenue_Inelastic_Rise", fi, (49, 84), 40, 70, 60, 63, "TR rises: ${tr1:,} → ${tr2:,}", True))
fe = lambda q: 60 - q / 3                      # elastic: (60,40) and (30,50)
assert fe(60) == 40 and fe(30) == 50
print(revenue("PED_17b_Revenue_Elastic_Rise", fe, (0, 100), 40, 60, 50, 30, "TR falls: ${tr1:,} → ${tr2:,}", False))

# =========================================================== PED_18: total revenue along P = 90 - Q
cv = Canvas(1150, 880); ax = Ax(cv, 220, 700, 1000, 150, xmax=90, ymax=2200, ylab=("Total revenue ($)",), xlab=("Quantity demanded",))
ax.axes()
TR = lambda q: (90 - q) * q
ax.rect(0, 0, 45, 2200, fill=DEP, opacity=0.07); ax.rect(45, 0, 90, 2200, fill=APP, opacity=0.08)
ax.poly(TR, 0, 90, NAVY, 7)
ax.hguide(2025, 45, "$2,025"); ax.vguide(45, 2025, "45")
ax.dot(45, 2025, INK, r=13)
for q in (20, 70):
    ax.dot(q, TR(q), NAVY, r=10); ax.label(q, TR(q), f"${TR(q):,.0f}", size=28, color=NAVY, anchor="middle", dy=44)
assert TR(45) == 2025 and TR(20) == TR(70) == 1400
ax.label(45, 2025, "TR is highest where |PED| = 1", size=30, color=INK, dx=26, dy=-30)
ax.label(24.5, 520, "elastic range:", size=28, color=DEP, anchor="middle")
ax.label(24.5, 520, "a price cut raises TR", size=28, color=DEP, anchor="middle", dy=38)
ax.label(65.5, 520, "inelastic range:", size=28, color=APP, anchor="middle")
ax.label(65.5, 520, "a price cut lowers TR", size=28, color=APP, anchor="middle", dy=38)
a, b = ax.px(12, 150); c, _ = ax.px(34, 150)
cv.line(a, b, c, b, MUTED, 4, arrow_end=True); cv.text(c + 12, b, "price falls, Q rises", size=26, color=MUTED, anchor="start", weight=600)
cv.badge(1140, 46, "HL · P = 90 − Q, so TR = (90 − Q) × Q", INK, size=26, anchor="end")
save("PED_18_TR_Curve", cv)

# =========================================================== PED_20/21: indirect tax diagrams
S = lambda q: 10 + 0.5 * q
St = lambda q: 37 + 0.5 * q
Da = lambda q: 280 - 4 * q
Db = lambda q: 70 - 0.5 * q
Sb = lambda q: 4 * q - 200
Sbt = lambda q: 4 * q - 173
assert Da(60) == S(60) == 40 and Da(54) == St(54) == 64 and S(54) == 37
assert Db(60) == S(60) == 40 and Db(33) == St(33) == 53.5 and S(33) == 26.5
assert Db(60) == Sb(60) == 40 and Db(54) == Sbt(54) == 43 and Sb(54) == 16


def taxplot(name, D, Dr, Sf, Sr, Stf, Str, qt, pc, pp, mode, badge, badgecol, dlab, slab, sl_left=False):
    cv = Canvas(1100, 960); ax = Ax(cv, 200, 790, 940, 150, ylab=("Price ($)",), xlab=("Quantity",))
    ax.axes()
    late = []
    if mode == "revenue":
        ax.rect(0, pp, qt, pc, fill=CB, opacity=0.70)
        late.append(lambda: cv.badge(*ax.px(qt / 2, (pp + pc) / 2), f"tax revenue ${27 * qt:,.0f}", CB, size=26, anchor="middle"))
    else:
        ax.rect(0, 40, qt, pc, fill=NAVY, opacity=0.78)
        ax.rect(0, pp, qt, 40, fill=GOLD, opacity=0.85)
        cons, prod = pc - 40, 40 - pp
        if cons >= 10:
            late.append(lambda: cv.badge(*ax.px(qt / 2, (40 + pc) / 2), f"consumers ${cons:g}", NAVY, size=28, anchor="middle"))
            late.append(lambda: ax.label(qt / 2, pp, f"producers ${prod:g}", size=28, color=GOLD_TXT, anchor="middle", dy=30))
        else:
            late.append(lambda: cv.badge(*ax.px(qt / 2, (pp + 40) / 2), f"producers ${prod:g}", GOLD_TXT, size=28, anchor="middle"))
            late.append(lambda: ax.label(qt / 2 - 6, pc, f"consumers ${cons:g}", size=28, color=NAVY, anchor="middle", dy=-30))
    ax.poly(Sf, *Sr, color=NAVY, w=6); ax.poly(Stf, *Str, color=GOLD, w=6)
    ax.poly(D, *Dr, color=INK, w=7)
    ax.label(Sr[1], Sf(Sr[1]), slab[0], size=34, color=NAVY, dx=10, dy=10)
    if sl_left:
        ax.label(Str[1], Stf(Str[1]), slab[1], size=34, color=GOLD_TXT, dx=-14, dy=10, anchor="end")
    else:
        ax.label(Str[1], Stf(Str[1]), slab[1], size=34, color=GOLD_TXT, dx=10, dy=-6)
    if D(Dr[1]) < 8:
        ax.label(Dr[0], D(Dr[0]), dlab, size=36, color=INK, dx=-16, dy=26, anchor="end")
    else:
        ax.label(Dr[1], D(Dr[1]), dlab, size=36, color=INK, dx=10, dy=-14)
    gap_hi, gap_lo = pc - 40, 40 - pp
    ax.hguide(pc, qt, f"${pc:g}", ldy=-14 if gap_hi < 6 else 0)
    ax.hguide(40, 60, "$40", ldy=(14 if gap_hi < 6 else (-14 if gap_lo < 6 else 0)))
    ax.hguide(pp, qt, f"${pp:g}", ldy=14 if gap_lo < 6 else 0)
    ax.vguide(qt, pc, f"{qt}"); ax.vguide(60, 40, "60", dy=76 if abs(60 - qt) < 10 else 38)
    ax.dot(60, 40); ax.dot(qt, pc, INK); ax.dot(qt, pp, GOLD_TXT, r=9)
    for f in late:
        f()
    cv.badge(1090, 46, badge, badgecol, size=28, anchor="end")
    save(name, cv)

taxplot("PED_20a_Tax_Revenue_Inelastic", Da, (45, 70), S, (0, 100), St, (0, 100), 54, 64, 37, "revenue",
        "Q −10% · tax revenue $1,458", CB, "D", ("S", "S + tax"))
taxplot("PED_20b_Tax_Revenue_Elastic", Db, (0, 100), S, (0, 100), St, (0, 100), 33, 53.5, 26.5, "revenue",
        "Q −45% · tax revenue $891", CB, "D", ("S", "S + tax"))
taxplot("PED_21a_Incidence_Consumers", Da, (45, 70), S, (0, 100), St, (0, 100), 54, 64, 37, "incidence",
        "Consumers bear $24 of $27", NAVY, "D", ("S", "S + tax"))
taxplot("PED_21b_Incidence_Producers", Db, (0, 100), Sb, (50.5, 75), Sbt, (43.5, 68.25), 54, 43, 16, "incidence",
        "Producers bear $24 of $27", GOLD_TXT, "D", ("S", "S + tax"), sl_left=True)
