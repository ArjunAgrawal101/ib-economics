"""PED deck v2 (visual redesign): technical diagrams with classroom-size type.

Same economics as v1 (every curve exact, key values asserted); larger type, tighter canvases,
PED_09 rebuilt as ONE line with coloured segments, PED_10 shows the $10 steps.
Axes: price ($) vertical, quantity demanded horizontal.
"""
import os, sys, math
sys.path.insert(0, "/home/claude/work/diagrams")
import econsvg as E
E.PANEL = "#FFFDFA"
from econsvg import Canvas, INK, NAVY, GOLD, GOLD_TXT, APP, DEP, CB, GUIDE, MUTED

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "svg")
os.makedirs(OUT, exist_ok=True)


def bare_svg(self):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{self.w}" height="{self.h}" viewBox="0 0 {self.w} {self.h}">'
            f'<defs>{"".join(self.defs)}</defs>{"".join(self.els)}</svg>')


Canvas.svg = bare_svg
CURVE, AXIS, TICK, NOTE = 44, 36, 36, 32


class Ax:
    def __init__(self, cv, X0, Y0, X1, Y1, xmax=100, ymax=100, ylab="Price ($)", xlab="Quantity demanded"):
        self.cv, self.X0, self.Y0, self.X1, self.Y1, self.xmax, self.ymax = cv, X0, Y0, X1, Y1, xmax, ymax
        self.ylab, self.xlab = ylab, xlab
        self.xtitle_dy = 116

    def px(self, x, y):
        return (self.X0 + (self.X1 - self.X0) * x / self.xmax, self.Y0 - (self.Y0 - self.Y1) * y / self.ymax)

    def axes(self, size=AXIS):
        cv = self.cv
        cv.line(self.X0, self.Y0, self.X0, self.Y1 - 30, INK, 4.5, arrow_end=True, cap="butt")
        cv.line(self.X0, self.Y0, self.X1 + 30, self.Y0, INK, 4.5, arrow_end=True, cap="butt")
        cv.text(self.X0 - 16, self.Y0 + 30, "0", size=30, color=MUTED, anchor="end")
        cv.text(self.X0 - 4, self.Y1 - 70, self.ylab, size=size, color=INK, anchor="start", weight=700)
        cv.text(self.X1 + 30, self.Y0 + self.xtitle_dy, self.xlab, size=size, color=INK, anchor="end", weight=700)

    def poly(self, f, x0, x1, color=NAVY, w=7, n=240, dash=None):
        pts = [self.px(x0 + (x1 - x0) * i / n, f(x0 + (x1 - x0) * i / n)) for i in range(n + 1)]
        self.cv.path("M" + " L".join(f"{a:.1f},{b:.1f}" for a, b in pts), color=color, w=w, dash=dash)

    def seg(self, x0, y0, x1, y1, color=NAVY, w=7, dash=None, arrow_end=False, arrow_start=False):
        a, b = self.px(x0, y0); c, d = self.px(x1, y1)
        self.cv.line(a, b, c, d, color, w, dash=dash, arrow_end=arrow_end, arrow_start=arrow_start)

    def rect(self, x0, y0, x1, y1, fill, opacity=0.85, stroke=None, dash=None):
        a, b = self.px(x0, y1); c, d = self.px(x1, y0)
        self.cv.rect(a, b, c - a, d - b, fill=fill, opacity=opacity, stroke=stroke, sw=3, dash=dash)

    def hguide(self, y, x_to, label, color=INK, size=TICK, ldy=0):
        a, b = self.px(0, y); c, _ = self.px(x_to, y)
        self.cv.line(a, b, c, b, GUIDE, 3, dash="10 10", cap="butt")
        if label:
            self.cv.text(self.X0 - 16, b + ldy, label, size=size, color=color, anchor="end", weight=700)

    def vguide(self, x, y_to, label, color=INK, size=TICK, dy=42):
        a, b = self.px(x, 0); _, d = self.px(x, y_to)
        self.cv.line(a, b, a, d, GUIDE, 3, dash="10 10", cap="butt")
        if label:
            self.cv.text(a, b + dy, label, size=size, color=color, anchor="middle", weight=700)

    def dot(self, x, y, fill=INK, r=13):
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


# ================================================================ PED_07: relatively elastic vs inelastic
cv = Canvas(1180, 980); ax = Ax(cv, 250, 800, 1030, 150)
Dinel = lambda q: 140 - 2 * q
Del = lambda q: 60 - 0.4 * q
assert Dinel(50) == 40 and Dinel(55) == 30 and Del(50) == 40 and Del(75) == 30
assert round(pct(50, 55)) == 10 and round(pct(50, 75)) == 50 and round(pct(40, 30)) == -25
ax.hguide(40, 50, "P₁ $40"); ax.hguide(30, 75, "P₂ $30")
ax.vguide(50, 40, "50"); ax.vguide(55, 30, "55", dy=84); ax.vguide(75, 30, "75")
ax.poly(Dinel, 20, 70, NAVY, 8); ax.poly(Del, 0, 100, GOLD, 8)
ax.axes()
ax.label(43, 63, "D relatively", size=36, color=NAVY, dx=14)
ax.label(43, 63, "price inelastic", size=36, color=NAVY, dx=14, dy=42)
ax.label(2, 80, "D relatively", size=36, color=GOLD_TXT, dx=8)
ax.label(2, 80, "price elastic", size=36, color=GOLD_TXT, dx=8, dy=42)
ax.dot(50, 40); ax.dot(55, 30, NAVY); ax.dot(75, 30, GOLD_TXT)
a, b = ax.px(50, 19); c, _ = ax.px(55, 19)
cv.line(a + 4, b, c - 4, b, NAVY, 6, arrow_end=True)
cv.text(a - 14, b, "+10%", size=40, color=NAVY, anchor="end", weight=800)
a, b = ax.px(50, 8); c, _ = ax.px(75, 8)
cv.line(a + 4, b, c - 4, b, GOLD_TXT, 6, arrow_end=True)
cv.text(c + 16, b, "+50%", size=40, color=GOLD_TXT, anchor="start", weight=800)
a, b = ax.px(7, 39); _, d = ax.px(7, 31)
cv.line(a, b, a, d, DEP, 7, arrow_end=True)
cv.text(a + 18, (b + d) / 2, "−25%", size=36, color=DEP, anchor="start", weight=800)
cv.badge(1170, 48, "Same axes, same scale", INK, size=30, anchor="end")
save("PED_07_Elastic_vs_Inelastic", cv)


# ================================================================ PED_08a/b/c: special cases (compact, large type)
def special(name, kind):
    cv = Canvas(800, 780); ax = Ax(cv, 120, 610, 720, 140, ylab="Price ($)", xlab="Quantity")
    ax.xtitle_dy = 104
    if kind == "elastic":
        ax.hguide(50, 0, "P", size=42)
        ax.seg(0, 50, 94, 50, NAVY, 10); ax.label(94, 50, "D", size=56, color=NAVY, dy=-40, anchor="end")
        ax.axes(size=42)
        ax.label(48, 78, "above P:", size=38, color=DEP, anchor="middle")
        ax.label(48, 78, "QD falls to zero", size=38, color=DEP, anchor="middle", dy=46)
        ax.label(48, 24, "at P: buyers take", size=38, color=INK, anchor="middle")
        ax.label(48, 24, "any quantity", size=38, color=INK, anchor="middle", dy=46)
        cv.badge(790, 44, "|PED| → ∞", NAVY, size=38, anchor="end")
    elif kind == "inelastic":
        ax.hguide(30, 45, "P₁", size=42); ax.hguide(72, 45, "P₂", size=42)
        ax.vguide(45, 0, "Q", size=42, dy=46)
        ax.seg(45, 0, 45, 96, NAVY, 10); ax.label(45, 96, "D", size=56, color=NAVY, dx=22, dy=10)
        ax.axes(size=42)
        ax.dot(45, 30, INK, 15); ax.dot(45, 72, DEP, 15)
        a, b = ax.px(45, 33); _, d = ax.px(45, 69)
        cv.line(a - 44, b, a - 44, d, DEP, 7, arrow_end=True)
        ax.label(51, 56, "price rises,", size=38, color=DEP)
        ax.label(51, 56, "QD unchanged", size=38, color=DEP, dy=46)
        cv.badge(790, 44, "PED = 0", NAVY, size=38, anchor="end")
    else:
        k = 1800
        f = lambda q: k / q
        assert abs(30 * f(30) - 1800) < 1e-9 and abs(60 * f(60) - 1800) < 1e-9
        ax.rect(0, 30, 30, 60, fill=DEP, opacity=0.24)
        ax.rect(30, 0, 60, 30, fill=APP, opacity=0.26)
        ax.rect(0, 0, 30, 30, fill="#C9CED6", opacity=0.5)
        ax.hguide(60, 30, "60", size=40); ax.hguide(30, 60, "30", size=40)
        ax.vguide(30, 60, "30", size=40); ax.vguide(60, 30, "60", size=40)
        ax.rect(0, 0, 30, 60, fill="none", opacity=1, stroke=NAVY)
        ax.rect(0, 0, 60, 30, fill="none", opacity=1, stroke=GOLD_TXT, dash="12 9")
        ax.poly(f, 18.8, 100, NAVY, 10)
        ax.axes(size=42)
        ax.label(100, f(100), "D", size=56, color=NAVY, dx=-4, dy=-44, anchor="end")
        ax.dot(30, 60, INK, 15); ax.dot(60, 30, GOLD_TXT, 15)
        ax.label(15, 45, "−900", size=40, color=DEP, anchor="middle", dy=4)
        ax.label(45, 15, "+900", size=40, color=APP, anchor="middle", dy=4)
        ax.label(57, 74, "P × Q = 1,800", size=38, color=INK)
        ax.label(57, 74, "at every point", size=34, color=MUTED, dy=44, weight=600)
        cv.badge(790, 44, "|PED| = 1", NAVY, size=38, anchor="end")
    save(name, cv)


special("PED_08a_Perfectly_Elastic", "elastic")
special("PED_08b_Perfectly_Inelastic", "inelastic")
special("PED_08c_Unitary", "unit")

# ================================================================ PED_09: one straight line, segments coloured on it
L = lambda q: 90 - q
cv = Canvas(1180, 980); ax = Ax(cv, 210, 800, 1010, 150)
ax.hguide(45, 45, "$45"); ax.vguide(45, 45, "45")
ax.poly(L, 0, 45, DEP, 12); ax.poly(L, 45, 90, APP, 12)
ax.axes()
ax.label(0, 90, "$90", size=TICK, anchor="end", dx=-16)
ax.label(90, 0, "90", size=TICK, anchor="middle", dy=42)
ax.dot(0, 90, DEP, 14); ax.dot(90, 0, APP, 14); ax.dot(45, 45, INK, 17)
ax.label(3, 90, "|PED| → ∞ as Q → 0", size=34, color=DEP, dx=12, dy=-40)
ax.label(24, 66, "elastic: |PED| > 1", size=38, color=DEP, dx=34, dy=-10, weight=800)
ax.label(45, 45, "|PED| = 1", size=40, color=INK, dx=-26, dy=60, anchor="end", weight=800)
ax.label(45, 45, "at the midpoint", size=32, color=MUTED, dx=-26, dy=102, anchor="end", weight=700)
ax.label(68, 22, "inelastic: |PED| < 1", size=38, color=APP, dx=34, dy=-12, weight=800)
ax.label(90, 0, "|PED| → 0", size=34, color=APP, dx=22, dy=-82)
ax.label(90, 0, "as P → 0", size=34, color=APP, dx=22, dy=-42)
ax.label(52, 88, "one demand curve: P = 90 − Q", size=32, color=INK, weight=700)
ax.label(52, 88, "constant slope, changing |PED|", size=30, color=MUTED, dy=42, weight=600)
save("PED_09_HL_Linear_Curve", cv)

# ================================================================ PED_10: four points, each with the same $10 step
cv = Canvas(1180, 980); ax = Ax(cv, 210, 800, 1010, 150)
ax.poly(L, 0, 90, NAVY, 6)
ax.axes()
cols = {"A": DEP, "B": INK, "C": APP, "D": APP}
pts = [("A", 20), ("B", 45), ("C", 70), ("D", 80)]
for name, q in pts:
    p = L(q)
    assert L(q - 10) == p + 10
    ax.seg(q, p + 0.8, q, p + 9.2, GOLD_TXT, 5, arrow_end=True)
    ax.seg(q - 0.6, p + 10, q - 9.4, p + 10, GOLD_TXT, 5, arrow_end=True)
    ax.dot(q, p, cols[name], 14)
    ax.dot(q - 10, p + 10, "#FFFDFA", 9)
    a, b = ax.px(q - 10, p + 10); cv.circle(a, b, 9, "#FFFDFA", stroke=NAVY, sw=4)
vals = {n: L(q) / q for n, q in pts}
assert [round(v, 3) for v in vals.values()] == [3.5, 1.0, 0.286, 0.125]
ax.label(20, 70, "A (20, $70)", size=34, color=DEP, dx=24, dy=4)
ax.label(20, 70, "|PED| 3.50", size=34, color=DEP, dx=24, dy=44, weight=800)
ax.label(45, 45, "B (45, $45)", size=34, color=INK, dx=24, dy=4)
ax.label(45, 45, "|PED| 1.00", size=34, color=INK, dx=24, dy=44, weight=800)
ax.label(70, 20, "C (70, $20)", size=34, color=APP, dx=-30, dy=40, anchor="end")
ax.label(70, 20, "|PED| 0.29", size=34, color=APP, dx=-30, dy=80, anchor="end", weight=800)
ax.label(80, 10, "D (80, $10)", size=34, color=APP, dx=26, dy=-30)
ax.label(80, 10, "|PED| 0.13", size=34, color=APP, dx=26, dy=8, weight=800)
a, b = ax.px(33, 92)
cv.line(a, b, a, b - 52, GOLD_TXT, 5, arrow_end=True); cv.line(a + 10, b - 62, a - 46, b - 62, GOLD_TXT, 5, arrow_end=True)
cv.text(a + 26, b - 40, "each step: price +$10, quantity −10", size=30, color=GOLD_TXT, anchor="start", weight=700)
cv.text(a + 26, b + 2, "|PED| = P ÷ Q at each start point", size=30, color=MUTED, anchor="start", weight=700)
cv.badge(1170, 48, "P = 90 − Q", INK, size=30, anchor="end")
save("PED_10_HL_Four_Points", cv)


# ================================================================ PED_17a/b: revenue gain and loss for a price rise
def revenue(name, f, x_range, p1, q1, p2, q2, title, good):
    cv = Canvas(1120, 980); ax = Ax(cv, 220, 800, 960, 160)
    gain = (p2 - p1) * q2; loss = p1 * (q1 - q2)
    ax.rect(0, 0, q2, p1, fill="#C9CED6", opacity=0.55)
    ax.rect(0, p1, q2, p2, fill=APP, opacity=0.82)
    ax.rect(q2, 0, q1, p1, fill=DEP, opacity=0.82)
    ax.hguide(p1, q1, f"P₁ ${p1}"); ax.hguide(p2, q2, f"P₂ ${p2}")
    ax.vguide(q2, p2, f"Q₂ {q2}"); ax.vguide(q1, p1, f"Q₁ {q1}", dy=86 if q1 - q2 < 12 else 42)
    ax.poly(f, *x_range, color=NAVY, w=8)
    if q1 - q2 < 12:
        ax.xtitle_dy = 156
    ax.axes()
    if f(x_range[1]) < 8:
        ax.label(x_range[0], f(x_range[0]), "D", size=CURVE, color=NAVY, dx=-18, dy=28, anchor="end")
    else:
        ax.label(x_range[1], f(x_range[1]), "D", size=CURVE, color=NAVY, dx=12, dy=-8)
    ax.dot(q1, p1); ax.dot(q2, p2, NAVY)
    def boxlabel(x0, x1, y0, y1, word, num):
        (a0, b1), (a1, b0) = ax.px(x0, y1), ax.px(x1, y0)
        w, h = a1 - a0, b0 - b1
        cx, cy = (a0 + a1) / 2, (b0 + b1) / 2
        one = f"{word} {num}"
        for size in (38, 34, 32, 30):
            if size * 0.6 * len(one) < w - 24:
                cv.text(cx, cy, one, size=size, color="#FFFFFF", anchor="middle", weight=800, halo=False)
                return
            if h > 2.8 * size and size * 0.6 * max(len(word), len(num)) < w - 24:
                cv.text(cx, cy - size * 0.6, word, size=size, color="#FFFFFF", anchor="middle", weight=800, halo=False)
                cv.text(cx, cy + size * 0.6, num, size=size, color="#FFFFFF", anchor="middle", weight=800, halo=False)
                return
        raise SystemExit(f"label does not fit: {one}")
    boxlabel(0, q2, p1, p2, "gain", f"+${gain:,.0f}")
    if q1 - q2 >= 20:
        boxlabel(q2, q1, 0, p1, "loss", f"−${loss:,.0f}")
    else:
        yl = p1 * 0.45
        a, b = ax.px((q1 + q2) / 2, yl)
        qd = next(q for q in [x_range[0] + i * 0.05 for i in range(4000)] if f(q) <= yl)
        c, _ = ax.px(qd, yl)
        cv.line(a + 6, b, c + 24, b, DEP, 5)
        cv.text(c + 34, b, f"loss −${loss:,.0f}", size=38, color=DEP, anchor="start", weight=800)
    tr1, tr2 = p1 * q1, p2 * q2
    assert tr2 - tr1 == gain - loss
    cv.badge(1110, 48, title.format(tr1=tr1, tr2=tr2), APP if good else DEP, size=32, anchor="end")
    save(name, cv)
    return gain, loss, tr1, tr2


fi = lambda q: 40 - (20 / 7) * (q - 70)
assert abs(fi(63) - 60) < 1e-9
print(revenue("PED_17a_Revenue_Inelastic_Rise", fi, (49, 84), 40, 70, 60, 63, "TR rises: ${tr1:,} → ${tr2:,}", True))
fe = lambda q: 60 - q / 3
assert fe(60) == 40 and fe(30) == 50
print(revenue("PED_17b_Revenue_Elastic_Rise", fe, (0, 100), 40, 60, 50, 30, "TR falls: ${tr1:,} → ${tr2:,}", False))

# ================================================================ PED_18: TR along P = 90 - Q (this straight line only)
cv = Canvas(1180, 900); ax = Ax(cv, 240, 720, 1030, 170, xmax=90, ymax=2200, ylab="Total revenue ($)", xlab="Quantity demanded")
ax.xtitle_dy = 110
TR = lambda q: (90 - q) * q
ax.rect(0, 0, 45, 2200, fill=DEP, opacity=0.08); ax.rect(45, 0, 90, 2200, fill=APP, opacity=0.09)
ax.hguide(2025, 45, "$2,025"); ax.vguide(45, 2025, "45")
ax.poly(TR, 0, 90, NAVY, 8)
ax.axes()
ax.dot(45, 2025, INK, 15)
for q in (20, 70):
    ax.dot(q, TR(q), NAVY, 12); ax.label(q, TR(q), f"${TR(q):,.0f}", size=32, color=NAVY, anchor="middle", dy=50)
assert TR(45) == 2025 and TR(20) == TR(70) == 1400
ax.label(45, 2025, "peak where |PED| = 1", size=34, color=INK, dx=28, dy=-34)
ax.label(24.5, 560, "elastic range:", size=32, color=DEP, anchor="middle")
ax.label(24.5, 560, "a price cut raises TR", size=32, color=DEP, anchor="middle", dy=42)
ax.label(65.5, 560, "inelastic range:", size=32, color=APP, anchor="middle")
ax.label(65.5, 560, "a price cut lowers TR", size=32, color=APP, anchor="middle", dy=42)
a, b = ax.px(12, 160); c, _ = ax.px(33, 160)
cv.line(a, b, c, b, MUTED, 5, arrow_end=True); cv.text(c + 14, b, "price falls, Q rises", size=30, color=MUTED, anchor="start", weight=600)
cv.badge(1170, 48, "HL · on P = 90 − Q, TR = (90 − Q) × Q", INK, size=28, anchor="end")
save("PED_18_TR_Curve", cv)

# ================================================================ PED_20/21: indirect tax diagrams
S = lambda q: 10 + 0.5 * q
St = lambda q: 37 + 0.5 * q
Da = lambda q: 280 - 4 * q
Db = lambda q: 70 - 0.5 * q
Sb = lambda q: 4 * q - 200
Sbt = lambda q: 4 * q - 173
assert Da(60) == S(60) == 40 and Da(54) == St(54) == 64 and S(54) == 37
assert Db(60) == S(60) == 40 and Db(33) == St(33) == 53.5 and S(33) == 26.5
assert Db(60) == Sb(60) == 40 and Db(54) == Sbt(54) == 43 and Sb(54) == 16


def taxplot(name, D, Dr, Sf, Sr, Stf, Str, qt, pc, pp, mode, badge, badgecol, sl_left=False, rev_at=None):
    cv = Canvas(1120, 980); ax = Ax(cv, 220, 800, 960, 160, xlab="Quantity")
    late = []
    if mode == "revenue":
        ax.rect(0, pp, qt, pc, fill=CB, opacity=0.70)
        def _rev():
            q_, p_, s1, s2 = rev_at
            a, b = ax.px(q_, p_)
            cv.text(a, b - s1 * 0.7, "tax revenue", size=s1, color="#FFFFFF", anchor="middle", weight=700, halo=False)
            cv.text(a, b + s2 * 0.6, f"${27 * qt:,.0f}", size=s2, color="#FFFFFF", anchor="middle", weight=800, halo=False)
        late.append(_rev)
    else:
        ax.rect(0, 40, qt, pc, fill=NAVY, opacity=0.78)
        ax.rect(0, pp, qt, 40, fill=GOLD, opacity=0.85)
        cons, prod = pc - 40, 40 - pp
        if cons >= 10:
            late.append(lambda: cv.badge(*ax.px(qt / 2, (40 + pc) / 2), f"consumers ${cons:g}", NAVY, size=32, anchor="middle"))
            late.append(lambda: ax.label(qt / 2, pp, f"producers ${prod:g}", size=32, color=GOLD_TXT, anchor="middle", dy=34))
        else:
            late.append(lambda: cv.badge(*ax.px(qt / 2, (pp + 40) / 2), f"producers ${prod:g}", GOLD_TXT, size=32, anchor="middle"))
            late.append(lambda: ax.label(qt / 2 - 7, pc, f"consumers ${cons:g}", size=32, color=NAVY, anchor="middle", dy=-34))
    gap_hi, gap_lo = pc - 40, 40 - pp
    ax.hguide(pc, qt, f"${pc:g}", ldy=-16 if gap_hi < 6 else 0)
    ax.hguide(40, 60, "$40", ldy=(16 if gap_hi < 6 else (-16 if gap_lo < 6 else 0)))
    ax.hguide(pp, qt, f"${pp:g}", ldy=16 if gap_lo < 6 else 0)
    ax.vguide(qt, pc, f"{qt}"); ax.vguide(60, 40, "60", dy=86 if abs(60 - qt) < 10 else 42)
    ax.poly(Sf, *Sr, color=NAVY, w=7); ax.poly(Stf, *Str, color=GOLD, w=7)
    ax.poly(D, *Dr, color=INK, w=8)
    ax.axes()
    ax.label(Sr[1], Sf(Sr[1]), "S", size=40, color=NAVY, dx=12, dy=10)
    if sl_left:
        ax.label(Str[1], Stf(Str[1]), "S + tax", size=40, color=GOLD_TXT, dx=-16, dy=10, anchor="end")
    else:
        ax.label(Str[1], Stf(Str[1]), "S + tax", size=40, color=GOLD_TXT, dx=12, dy=-8)
    if D(Dr[1]) < 8:
        ax.label(Dr[0], D(Dr[0]), "D", size=42, color=INK, dx=-18, dy=28, anchor="end")
    else:
        ax.label(Dr[1], D(Dr[1]), "D", size=42, color=INK, dx=12, dy=-16)
    ax.dot(60, 40); ax.dot(qt, pc, INK); ax.dot(qt, pp, GOLD_TXT, r=11)
    for f in late:
        f()
    cv.badge(1110, 48, badge, badgecol, size=32, anchor="end")
    save(name, cv)


taxplot("PED_20a_Tax_Revenue_Inelastic", Da, (45, 70), S, (0, 98), St, (0, 98), 54, 64, 37, "revenue",
        "Q −10% · tax revenue $1,458", CB, rev_at=(16, 56, 30, 36))
taxplot("PED_20b_Tax_Revenue_Elastic", Db, (0, 100), S, (0, 98), St, (0, 98), 33, 53.5, 26.5, "revenue",
        "Q −45% · tax revenue $891", CB, rev_at=(18, 32, 28, 34))
taxplot("PED_21a_Incidence_Consumers", Da, (45, 70), S, (0, 98), St, (0, 98), 54, 64, 37, "incidence",
        "Consumers bear $24 of $27", NAVY)
taxplot("PED_21b_Incidence_Producers", Db, (0, 100), Sb, (50.5, 75), Sbt, (43.5, 68.25), 54, 43, 16, "incidence",
        "Producers bear $24 of $27", GOLD_TXT, sl_left=True)
