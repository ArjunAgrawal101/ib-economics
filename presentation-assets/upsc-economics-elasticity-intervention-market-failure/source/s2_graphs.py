"""Section II graphs: Elasticity, Government Intervention and Market Failure (Arjun Agrawal | UPSC CSE Economics).

Every line is defined in data space; every quoted value is asserted so captions cannot drift from the picture.
Notation: price on the vertical axis, quantity on the horizontal; original curves navy, new or social curves gold.
All numbers are hypothetical teaching values.
"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import ufp
from ufp import Canvas, Ax, INK, NAVY, GOLD, GOLD_TXT, GREEN, RED, BLUE, GUIDE, MUTED, IVORY, EDGE, SERIF

ufp.HALO = "#FBF9F3"
GRID = "#E9E2D2"
CW = 9          # curve width
LBL = 50        # curve label size
AXS = 40        # axis title size
TICK = 34       # tick / guide label size
NOTE = 36       # annotation size


def axes(ax, origin=True):
    cv = ax.cv
    cv.line(ax.X0, ax.Y0, ax.X0, ax.Y1 - 40, INK, 6, arrow_end=True, cap="butt", head=28)
    cv.line(ax.X0, ax.Y0, ax.X1 + 40, ax.Y0, INK, 6, arrow_end=True, cap="butt", head=28)
    if origin:
        cv.text(ax.X0 - 18, ax.Y0 + 34, "0", size=30, color=MUTED, anchor="end")
    cv.text(ax.X0 - 8, ax.Y1 - 82, ax.ylab, size=ax.size, color=INK, anchor="start", weight=750)
    cv.text(ax.X1 + 40, ax.Y0 + ax.xtitle_dy, ax.xlab, size=ax.size, color=INK, anchor="end", weight=750)


def dot(ax, x, y, fill=INK, r=17, ring=False):
    a, b = ax.px(x, y)
    if ring:
        ax.cv.add(f'<circle cx="{a:.1f}" cy="{b:.1f}" r="{r + 13}" fill="none" stroke="{GOLD}" stroke-width="6"/>')
    ax.cv.circle(a, b, r, fill, "#FBF9F3", 5)


def lab(ax, x, y, s, col, dx=18, dy=-30, size=LBL, anchor="start", weight=850):
    ax.label(x, y, s, size=size, color=col, weight=weight, dx=dx, dy=dy, anchor=anchor)


def hg(ax, y, x_to, label=None, color=INK, size=TICK, gcol=GUIDE, ldy=0):
    ax.hguide(y, x_to, label, color=color, size=size, gcol=gcol, ldy=ldy)


def vg(ax, x, y_to, label=None, color=INK, size=TICK, dy=44):
    ax.vguide(x, y_to, label, color=color, size=size, dy=dy)


def box(ax, x0, y0, x1, y1, fill, opacity=0.5):
    a, b = ax.px(x0, y1); c, d = ax.px(x1, y0)
    ax.cv.rect(a, b, c - a, d - b, fill=fill, opacity=opacity)


def tri(ax, pts, fill, opacity=0.45):
    p = " ".join("%.1f,%.1f" % ax.px(x, y) for x, y in pts)
    ax.cv.add(f'<polygon points="{p}" fill="{fill}" opacity="{opacity}"/>')


def title(cv, x, y, n, s, size=44):
    cv.step(x + 30, y, n, r=30, size=34)
    cv.text(x + 78, y + 1, s, size=size, color=INK, weight=800)


def tag(cv, x, y, s, anchor="end", size=30):
    cv.text(x, y, s, size=size, color=MUTED, anchor=anchor, weight=600, italic=True)


def eq(a, b, tol=1e-9):
    assert abs(a - b) < tol, (a, b)


# ---------------------------------------------------------------- shared hypothetical market
D = lambda q: 60 - q / 2           # Qd = 120 - 2P
S = lambda q: 10 + q / 3           # Qs = 3P - 30
Qd = lambda p: 120 - 2 * p
Qs = lambda p: 3 * p - 30
eq(Qd(30), 60); eq(Qs(30), 60)


def market_ax(cv, X0, Y0, X1, Y1, ylab="P (₹ per unit)", xlab="Q (thousand units per week)", xmax=130, ymax=70, size=AXS):
    ax = Ax(cv, X0, Y0, X1, Y1, xmax=xmax, ymax=ymax, ylab=ylab, xlab=xlab, size=size)
    ax.xtitle_dy = 100
    return ax


# ================================================================ G05 PED worked example (mini graph)
cv = Canvas(1100, 1000)
Dm = lambda q: 75 - q / 4          # through (100, 50) and (120, 45)
eq(Dm(100), 50); eq(Dm(120), 45)
assert (45 - 50) / 50 * 100 == -10 and (120 - 100) / 100 * 100 == 20
ax = Ax(cv, 210, 800, 1000, 190, xmax=180, ymax=70, ylab="P (₹ per unit)", xlab="Qd (units per day)", size=AXS)
ax.xtitle_dy = 100
hg(ax, 50, 100, "₹50", size=32); hg(ax, 45, 120, "₹45", size=32)
vg(ax, 100, 50, "100"); vg(ax, 120, 45, "120")
ax.poly(Dm, 40, 172, NAVY, CW)
ax.seg(100, 50, 120, 45, GOLD_TXT, 10, arrow_end=True, gap=24)
dot(ax, 100, 50); dot(ax, 120, 45)
lab(ax, 172, Dm(172), "D", NAVY, dx=10, dy=-36)
axes(ax)
cv.rect(260, 600, 420, 140, fill="#FBF9F3", stroke=EDGE, sw=3, rx=16)
cv.lines(470, 670, [("Price: -10%", dict(color=RED)), ("Quantity: +20%", dict(color=GREEN))], size=36, weight=850)
tag(cv, 1080, 70, "Hypothetical good")
cv.save("G05_PED_Mini")


# ================================================================ G06 PED spectrum (five panels)
cv = Canvas(2400, 760)
names = [("Perfectly inelastic", "|PED| = 0"), ("Relatively inelastic", "0 < |PED| < 1"), ("Unit elastic", "|PED| = 1"),
         ("Relatively elastic", "|PED| > 1"), ("Perfectly elastic", "|PED| → ∞")]
cols = [NAVY, NAVY, GOLD_TXT, NAVY, NAVY]
for i in range(5):
    ox = 20 + i * 476
    ax = Ax(cv, ox + 90, 470, ox + 420, 120, xmax=10, ymax=10, ylab="P", xlab="Q", size=36)
    ax.xtitle_dy = 54
    if i == 0:
        ax.seg(5, 0.6, 5, 9.4, NAVY, CW)
    elif i == 1:
        ax.poly(lambda q: 23 - 4 * q, 3.4, 5.6, NAVY, CW)
    elif i == 2:
        ax.poly(lambda q: 20 / q, 2.1, 9.5, GOLD, CW)
    elif i == 3:
        ax.poly(lambda q: 6.4 - 0.25 * q, 0.6, 9.4, NAVY, CW)
    else:
        ax.seg(0.4, 5, 9.6, 5, NAVY, CW)
    axes(ax, origin=False)
    cv.text(ox + 240, 600, names[i][0], size=36, color=INK, anchor="middle", weight=800)
    cv.text(ox + 240, 662, names[i][1], size=40, color=cols[i], anchor="middle", weight=850)
    if i < 4:
        cv.line(ox + 466, 110, ox + 466, 700, EDGE, 3)
cv.text(1200, 738, "Shapes compare responsiveness at the same point on the same scales; along a straight line, elasticity changes from point to point.",
        size=28, color=MUTED, anchor="middle", weight=600, italic=True)
cv.save("G06_PED_Spectrum")


# ================================================================ G08 PED and total expenditure (two panels)
cv = Canvas(2400, 1000)
# elastic: biscuits brand, P 10 -> 8 (-20%), Q 1000 -> 1500 (+50%), PED -2.5, TE 10000 -> 12000
De = lambda q: 14 - q / 250
eq(De(1000), 10); eq(De(1500), 8)
# inelastic: salt, P 20 -> 16 (-20%), Q 1000 -> 1100 (+10%), PED -0.5, TE 20000 -> 17600
Di = lambda q: 60 - q / 25
eq(Di(1000), 20); eq(Di(1100), 16)
assert 10 * 1000 == 10000 and 8 * 1500 == 12000 and 20 * 1000 == 20000 and 16 * 1100 == 17600
panels = [("Elastic: one brand of biscuits", De, (1000, 10), (1500, 8), 2000, 14, "packets per week", (300, 2000),
           "PED = +50% ÷ -20% = -2.5", "Spending rises: ₹10,000 to ₹12,000", GREEN),
          ("Inelastic: table salt", Di, (1000, 20), (1100, 16), 1400, 28, "kg per week", (900, 1320),
           "PED = +10% ÷ -20% = -0.5", "Spending falls: ₹20,000 to ₹17,600", RED)]
for p, (ttl, f, A, B, xm, ym, ql, rng, ped, res, rc) in enumerate(panels):
    ox = 10 + p * 1200
    title(cv, ox, 52, p + 1, ttl, size=40)
    ax = Ax(cv, ox + 200, 720, ox + 1090, 200, xmax=xm, ymax=ym, ylab="P (₹)", xlab="Q (" + ql + ")", size=36)
    ax.xtitle_dy = 92
    box(ax, 0, B[1], A[0], A[1], RED, 0.32)
    box(ax, A[0], 0, B[0], B[1], GREEN, 0.32)
    box(ax, 0, 0, A[0], B[1], "#E9E2D2", 0.55)
    hg(ax, A[1], A[0], "₹%d" % A[1]); hg(ax, B[1], B[0], "₹%d" % B[1])
    vg(ax, A[0], A[1], "{:,}".format(A[0])); vg(ax, B[0], B[1], "{:,}".format(B[0]), dy=44 if p == 0 else 86)
    if p == 1:
        ax.xtitle_dy = 136
    ax.poly(f, rng[0], rng[1], NAVY, CW)
    dot(ax, *A); dot(ax, *B)
    if p == 0:
        lab(ax, rng[1], f(rng[1]), "D", NAVY, dx=14, dy=-34)
    else:
        lab(ax, rng[0], f(rng[0]), "D", NAVY, dx=-26, dy=6, anchor="end")
    axes(ax)
    lost = (A[1] - B[1]) * A[0]; gained = B[1] * (B[0] - A[0])
    a, b = ax.px(A[0] * 0.5, (A[1] + B[1]) / 2)
    cv.text(a, b, "Lost ₹{:,}".format(lost), size=34, color=RED, anchor="middle", weight=850)
    gx, gy = ax.px((A[0] + B[0]) / 2, B[1] * 0.5)
    if p == 0:
        cv.text(gx, gy, "Gained ₹{:,}".format(gained), size=34, color=GREEN, anchor="middle", weight=850)
    else:
        gx2, gy2 = ax.px(B[0], 3)
        cv.text(gx2 + 22, gy2, "Gained ₹{:,}".format(gained), size=34, color=GREEN, anchor="start", weight=850)
    cv.text(ox + 1090, 124, ped, size=34, color=INK, anchor="end", weight=800)
    cv.text(ox + 1090, 170, res, size=34, color=rc, anchor="end", weight=850)
cv.line(1205, 100, 1205, 940, EDGE, 3)
tag(cv, 2390, 982, "Hypothetical markets; other things held constant")
cv.save("G08_PED_Expenditure")


# ================================================================ G12 PES worked example (mini graph)
cv = Canvas(1100, 1000)
Sm = lambda q: 10 * q - 50        # Q in thousand litres a day; through (10, 50), (10.5, 55)
eq(Sm(10), 50); eq(Sm(10.5), 55)
assert round((55 - 50) / 50 * 100, 9) == 10 and round((10.5 - 10) / 10 * 100, 9) == 5
ax = Ax(cv, 210, 800, 1000, 190, xmax=14, ymax=80, ylab="P (₹ per litre)", xlab="Qs (thousand litres a day)", size=AXS)
ax.xtitle_dy = 100
hg(ax, 55, 10.5, "₹55", size=32, ldy=-10); hg(ax, 50, 10, "₹50", size=32, ldy=12)
vg(ax, 10, 50); vg(ax, 10.5, 55)
ax.poly(Sm, 6, 12.6, NAVY, CW)
ax.seg(10, 50, 10.5, 55, GOLD_TXT, 10, arrow_end=True, gap=20)
dot(ax, 10, 50); dot(ax, 10.5, 55)
lab(ax, 12.6, Sm(12.6), "S", NAVY, dx=16, dy=10)
ax.label(10, 50, "10,000 litres", size=32, color=INK, weight=800, dx=24, dy=34)
ax.label(10.5, 55, "10,500 litres", size=32, color=INK, weight=800, dx=-26, dy=-34, anchor="end")
axes(ax)
cv.rect(640, 600, 420, 140, fill="#FBF9F3", stroke=EDGE, sw=3, rx=16)
cv.lines(850, 670, [("Price: +10%", dict(color=GREEN)), ("Quantity: +5%", dict(color=GREEN))], size=36, weight=850)
tag(cv, 1080, 70, "Hypothetical dairy district")
cv.save("G12_PES_Mini")


# ================================================================ G13 short run versus long run supply
cv = Canvas(1200, 1040)
Ssr = lambda q: 30 + (q - 60) * 2      # Q = 60 + 0.5(P - 30)
Slr = lambda q: 30 + (q - 60) / 3      # Q = 60 + 3(P - 30)
eq(Ssr(65), 40); eq(Slr(90), 40)
ax = Ax(cv, 220, 840, 1080, 200, xmax=130, ymax=70, ylab="P (₹ per kg)", xlab="Q (thousand tonnes)", size=AXS)
ax.xtitle_dy = 100
hg(ax, 40, 90, "₹40"); hg(ax, 30, 60, "₹30")
vg(ax, 60, 30, "60"); vg(ax, 65, 40, "65", dy=88); vg(ax, 90, 40, "90")
ax.poly(Ssr, 47, 74, NAVY, CW)
ax.poly(Slr, 0, 120, GOLD, CW)
dot(ax, 60, 30); dot(ax, 65, 40, NAVY); dot(ax, 90, 40, GOLD_TXT)
ax.seg(60, 30, 65, 40, NAVY, 7, arrow_end=True, gap=22)
ax.seg(65, 40, 90, 40, GOLD_TXT, 7, arrow_end=True, gap=22)
lab(ax, 47, Ssr(47), "S_{short run}", NAVY, dx=18, dy=8, size=40)
lab(ax, 120, Slr(120), "S_{long run}", GOLD_TXT, dx=-10, dy=-48, size=42, anchor="end")
axes(ax)
cv.rect(660, 600, 420, 140, fill="#F6EFDF", rx=18)
cv.lines(870, 670, [("This season: 60 to 65", dict(color=NAVY)), ("Later seasons: 60 to 90", dict(color=GOLD_TXT))], size=34, weight=850)
tag(cv, 1180, 70, "Hypothetical crop; price rises ₹30 to ₹40")
cv.save("G13_PES_Time")


# ================================================================ G14 cross price elasticity (two panels)
cv = Canvas(2400, 900)
for p in range(2):
    ox = 10 + p * 1200
    sub = p == 0
    title(cv, ox, 52, p + 1, "Substitutes: coffee price rises 10%" if sub else "Complements: petrol price rises 10%", size=40)
    ax = Ax(cv, ox + 180, 690, ox + 1060, 200, xmax=130, ymax=70, ylab="P of tea" if sub else "P of petrol cars",
            xlab="Q of tea" if sub else "Q of petrol cars", size=36)
    ax.xtitle_dy = 84
    ax.poly(D, 6, 114, NAVY, CW)
    k = 24 if sub else -24
    D2 = (lambda k: (lambda q: 60 - (q - k) / 2))(k)
    lo, hi = (30, 138) if sub else (0, 90)
    ax.poly(D2, max(lo, 6 + k), min(hi, 114 + k), GOLD, CW)
    ax.seg(40, D(40), 40 + k, D2(40 + k), GOLD_TXT, 8, arrow_end=True, gap=24)
    ax.seg(80, D(80), 80 + k, D2(80 + k), GOLD_TXT, 8, arrow_end=True, gap=24)
    lab(ax, 114, D(114), "D_{1}", NAVY, dx=10, dy=-34, size=42)
    if sub:
        lab(ax, 130, D2(130), "D_{2}", GOLD_TXT, dx=8, dy=-38, size=42)
    else:
        lab(ax, 88, D2(88), "D_{2}", GOLD_TXT, dx=10, dy=-34, size=42)
    axes(ax, origin=False)
    col = GREEN if sub else RED
    cv.text(ox + 1090, 240, ("Tea demand +4%" if sub else "Petrol-car demand -3%"), size=36, color=col, anchor="end", weight=850)
    cv.text(ox + 1090, 292, ("XED = +4% ÷ +10% = +0.4" if sub else "XED = -3% ÷ +10% = -0.3"), size=36, color=INK, anchor="end", weight=800)
    cv.text(ox + 620, 860, ("Positive: demand shifts right" if sub else "Negative: demand shifts left"), size=34, color=col, anchor="middle", weight=800)
cv.line(1205, 100, 1205, 880, EDGE, 3)
cv.save("G14_XED")


# ================================================================ G18 indirect tax wedge
St = lambda q: 20 + q / 3          # supply plus ₹10 per-unit tax
eq(D(48), 36); eq(St(48), 36); eq(S(48), 26)
cv = Canvas(1200, 1040)
ax = market_ax(cv, 230, 840, 1080, 200, ymax=60)
box(ax, 0, 30, 48, 36, GOLD, 0.45)
box(ax, 0, 26, 48, 30, BLUE, 0.35)
hg(ax, 36, 48, "₹36", color=GOLD_TXT); hg(ax, 30, 60, "₹30", ldy=-6); hg(ax, 26, 48, "₹26", color=BLUE, ldy=8)
vg(ax, 48, 36, "48"); vg(ax, 60, 30, "60")
ax.poly(D, 6, 114, NAVY, CW); ax.poly(S, 0, 124, NAVY, CW); ax.poly(St, 0, 114, GOLD, CW)
ax.seg(48, 26.6, 48, 35.4, RED, 7, arrow_end=True, arrow_start=True)
dot(ax, 60, 30, INK, 14); dot(ax, 48, 36, GOLD, 17, ring=True); dot(ax, 48, 26, BLUE, 14)
lab(ax, 114, D(114), "D", NAVY, dx=16, dy=-28)
lab(ax, 124, S(124), "S", NAVY, dx=12, dy=-26)
lab(ax, 114, St(114), "S + tax", GOLD_TXT, dx=-20, dy=-46, anchor="end", size=42)
axes(ax)
cv.lines(1165, 596, [("Tax wedge: ₹10", dict(color=RED)), ("Buyers pay ₹6 more", dict(color=GOLD_TXT)), ("Sellers keep ₹4 less", dict(color=BLUE))], size=34, weight=850, anchor="end")
tag(cv, 1180, 70, "Hypothetical ₹10 per-unit tax collected from sellers")
cv.save("G18_Tax_Wedge")


# ================================================================ G19 tax incidence: two elasticity cases
cv = Canvas(2400, 960)
cases = [("Inelastic demand, elastic supply", lambda q: 160 - 2 * q, lambda q: 10 + q / 2, lambda q: 20 + q / 2, (45, 75), (0, 104), (0, 96),
          48, 38, "Buyers bear ₹8 of the ₹10", GOLD_TXT),
         ("Elastic demand, inelastic supply", lambda q: 70 - q / 2, lambda q: 2 * q - 80, lambda q: 2 * q - 70, (0, 120), (45, 72), (40, 70),
          42, 32, "Sellers bear ₹8 of the ₹10", BLUE)]
for p, (ttl, d, s, st, dr, sr, str_, pc, pp, msg, mc) in enumerate(cases):
    eq(d(60), 40); eq(s(60), 40); eq(d(56), pc); eq(st(56), pc); eq(s(56), pp)
    ox = 10 + p * 1200
    title(cv, ox, 52, p + 1, ttl, size=40)
    ax = market_ax(cv, ox + 200, 730, ox + 1060, 190, xmax=120, ymax=70, xlab="Q (thousand units)", size=36)
    ax.xtitle_dy = 90
    box(ax, 0, 40, 56, pc, GOLD, 0.45)
    box(ax, 0, pp, 56, 40, BLUE, 0.35)
    if p == 0:
        hg(ax, pc, 56, "₹%d" % pc, color=GOLD_TXT); hg(ax, 40, 60, "₹40", ldy=-12); hg(ax, pp, 56, "₹%d" % pp, color=BLUE, ldy=14)
    else:
        hg(ax, pc, 56, "₹%d" % pc, color=GOLD_TXT, ldy=-14); hg(ax, 40, 60, "₹40", ldy=12); hg(ax, pp, 56, "₹%d" % pp, color=BLUE)
    vg(ax, 56, pc, "56"); vg(ax, 60, 40, "60", dy=84)
    ax.poly(d, *dr, NAVY, CW); ax.poly(s, *sr, NAVY, CW); ax.poly(st, *str_, GOLD, CW)
    dot(ax, 60, 40, INK, 13); dot(ax, 56, pc, GOLD, 16); dot(ax, 56, pp, BLUE, 13)
    if p == 0:
        lab(ax, 75, d(75), "D", NAVY, dx=14, dy=6, size=44)
        lab(ax, 104, s(104), "S", NAVY, dx=14, dy=12, size=44)
        lab(ax, 96, st(96), "S + tax", GOLD_TXT, dx=-14, dy=-40, anchor="end", size=38)
        bx, by = ax.px(80, 26)
    else:
        lab(ax, 120, d(120), "D", NAVY, dx=12, dy=-30, size=44)
        lab(ax, 45, s(45), "S", NAVY, dx=18, dy=4, size=44)
        lab(ax, 70, st(70), "S + tax", GOLD_TXT, dx=-14, dy=-6, anchor="end", size=38)
        bx, by = ax.px(77, 66)
    axes(ax)
    cv.rect(bx, by, 300, 120, fill="#FBF9F3", stroke=EDGE, sw=3, rx=16)
    w1, w2 = msg.split(" ₹8 ")
    cv.lines(bx + 150, by + 60, [w1, "₹8 " + w2], size=32, color=mc, weight=850)
cv.line(1205, 100, 1205, 930, EDGE, 3)
tag(cv, 2390, 945, "Hypothetical markets, same starting point (₹40, 60) and the same ₹10 tax")
cv.save("G19_Tax_Incidence")


# ================================================================ G20 producer subsidy
Ssub = lambda q: 5 + q / 3
eq(D(66), 27); eq(Ssub(66), 27); eq(S(66), 32)
cv = Canvas(1200, 1040)
ax = market_ax(cv, 230, 840, 1080, 200)
box(ax, 0, 27, 66, 32, GREEN, 0.30)
hg(ax, 32, 66, "₹32", color=BLUE, ldy=-16); hg(ax, 30, 60, "₹30", size=30, ldy=4); hg(ax, 27, 66, "₹27", color=GOLD_TXT, ldy=20)
vg(ax, 60, 30); vg(ax, 66, 27, "66")
ax.poly(D, 6, 114, NAVY, CW); ax.poly(S, 0, 100, NAVY, CW); ax.poly(Ssub, 0, 100, GOLD, CW)
dot(ax, 60, 30, INK, 14); dot(ax, 66, 27, GOLD, 17, ring=True); dot(ax, 66, 32, BLUE, 14)
lab(ax, 114, D(114), "D", NAVY, dx=16, dy=-28)
lab(ax, 100, S(100), "S", NAVY, dx=14, dy=-24)
lab(ax, 100, Ssub(100), "S_{2}", GOLD_TXT, dx=14, dy=18, size=46)
axes(ax)
assert abs(5 * 66000 - 330000) < 1e-9
cv.rect(615, 104, 560, 236, fill="#FBF9F3", stroke=EDGE, sw=3, rx=16)
cv.lines(895, 222, [("S_{2} = S shifted down by ₹5", dict(color=GOLD_TXT, weight=750)), ("Buyers pay ₹27 (₹3 less)", dict(color=GOLD_TXT)), ("Sellers receive ₹32 (₹2 more)", dict(color=BLUE)),
                    ("Fiscal cost a week:", dict(color=GREEN)), ("₹5 × 66,000 = ₹3.3 lakh", dict(color=GREEN))], size=30, weight=850)
tag(cv, 1180, 70, "Hypothetical ₹5 per-unit subsidy paid to producers")
cv.save("G20_Subsidy")


# ================================================================ G21 price ceilings / G23 price floors
def control(name, kind):
    cv = Canvas(2400, 920)
    for p in range(2):
        ox = 10 + p * 1200
        binding = p == 1
        if kind == "ceiling":
            price = 24 if binding else 36
            ttl = ("Binding: ceiling ₹24, below equilibrium" if binding else "Non-binding: ceiling ₹36, above equilibrium")
        else:
            price = 36 if binding else 24
            ttl = ("Binding: floor ₹36, above equilibrium" if binding else "Non-binding: floor ₹24, below equilibrium")
        title(cv, ox, 52, p + 1, ttl, size=38)
        ax = market_ax(cv, ox + 200, 700, ox + 1060, 190, xmax=130, ymax=70, xlab="Q (thousand units)", size=36)
        ax.xtitle_dy = 88
        col = RED if kind == "ceiling" else BLUE
        a, b = ax.px(0, price); c, _ = ax.px(124, price)
        cv.line(a, b, c, b, col, 7, cap="butt", dash=None if binding else "22 14")
        cv.text(c + 4, b - 30, ("Ceiling" if kind == "ceiling" else "Floor"), size=34, color=col, anchor="end", weight=850)
        cv.text(a - 18, b, "₹%d" % price, size=36, color=col, anchor="end", weight=850)
        hg(ax, 30, 60, "₹30", color=MUTED)
        ax.poly(D, 6, 114, NAVY, CW); ax.poly(S, 0, 124, NAVY, CW)
        lab(ax, 114, D(114), "D", NAVY, dx=16, dy=-28, size=46)
        lab(ax, 124, S(124), "S", NAVY, dx=10, dy=-24, size=46)
        if not binding:
            dot(ax, 60, 30, GOLD, 17, ring=True)
            vg(ax, 60, 30, "60")
            lab(ax, 60, 30, "E", GOLD_TXT, dx=0, dy=-62, size=42, anchor="middle")
            cv.text(ox + 1080, 136, "No effect: market stays at ₹30 and 60", size=34, color=INK, anchor="end", weight=850)
        else:
            qd, qs = Qd(price), Qs(price)
            lo, hi = min(qd, qs), max(qd, qs)
            dot(ax, qs, price, INK, 15); dot(ax, qd, price, INK, 15); dot(ax, 60, 30, GOLD, 13)
            vg(ax, qs, price, str(qs)); vg(ax, qd, price, str(qd))
            yb = price - 8 if kind == "ceiling" else price + 8
            ax.seg(lo, yb, hi, yb, col, 7, arrow_end=True, arrow_start=True, gap=4)
            ax.label((lo + hi) / 2, yb, ("Shortage = %d" if kind == "ceiling" else "Surplus = %d") % (hi - lo), size=36,
                     color=col, weight=850, anchor="middle", dy=40 if kind == "ceiling" else -40)
            if kind == "ceiling":
                assert (qd, qs) == (72, 42)
                cv.text(ox + 1080, 136, "Qd 72 > Qs 42: excess demand", size=34, color=col, anchor="end", weight=850)
            else:
                assert (qd, qs) == (48, 78)
                cv.text(ox + 1080, 136, "Qs 78 > Qd 48: excess supply", size=34, color=col, anchor="end", weight=850)
        axes(ax)
    cv.line(1205, 100, 1205, 890, EDGE, 3)
    tag(cv, 2390, 905, "Hypothetical market: equilibrium ₹30 and 60 thousand units")
    cv.save(name)


control("G21_Price_Ceilings", "ceiling")
control("G23_Price_Floors", "floor")


# ================================================================ G24 MSP as a price floor (crop market)
Dc = lambda q: 3200 - 20 * q            # Qd = 160 - 0.05P
Sc = lambda q: 1000 + q / 0.06          # Qs = 0.06P - 60
eq(Dc(60), 2000); eq(Sc(60), 2000, 1e-6); eq(Dc(45), 2300); eq(Sc(78), 2300, 1e-6)
cv = Canvas(1200, 1040)
ax = Ax(cv, 250, 840, 1080, 200, xmax=110, ymax=3200, ylab="P (₹ per quintal)", xlab="Q (lakh tonnes)", size=AXS)
ax.xtitle_dy = 100
a, b = ax.px(0, 2300); c, _ = ax.px(104, 2300)
cv.line(a, b, c, b, BLUE, 7, cap="butt")
cv.text(a + 20, b - 30, "MSP", size=36, color=BLUE, anchor="start", weight=850)
cv.text(a - 18, b, "₹2,300", size=34, color=BLUE, anchor="end", weight=850)
hg(ax, 2000, 60, "₹2,000", color=MUTED)
vg(ax, 45, 2300, "45"); vg(ax, 78, 2300, "78"); vg(ax, 60, 2000, "60", dy=88)
ax.poly(Dc, 15, 100, NAVY, CW); ax.poly(Sc, 0, 104, NAVY, CW)
dot(ax, 45, 2300, INK, 15); dot(ax, 78, 2300, INK, 15); dot(ax, 60, 2000, GOLD, 13)
ax.seg(45, 2540, 78, 2540, BLUE, 7, arrow_end=True, arrow_start=True, gap=4)
ax.label(61.5, 2540, "Surplus = 33", size=36, color=BLUE, weight=850, anchor="middle", dy=-40)
lab(ax, 100, Dc(100), "D", NAVY, dx=16, dy=-10, size=46)
lab(ax, 104, Sc(104), "S", NAVY, dx=-10, dy=-40, size=46, anchor="end")
axes(ax)
cv.rect(270, 640, 520, 120, fill="#FBF9F3", stroke=EDGE, sw=3, rx=16)
cv.lines(530, 700, ["The floor holds only if the surplus", "is bought at MSP"], size=30, color=BLUE, weight=800)
tag(cv, 1180, 70, "Hypothetical crop market")
cv.save("G24_MSP_Floor")


# ================================================================ G25 minimum wage in the simplest competitive model
DL = lambda l: 600 - 5 * l      # L = 120 - 0.2W
SL = lambda l: 200 + 5 * l      # L = 0.2W - 40
eq(DL(40), 400); eq(SL(40), 400); eq(DL(20), 500); eq(SL(60), 500)
cv = Canvas(1200, 1040)
ax = Ax(cv, 250, 840, 1080, 200, xmax=110, ymax=680, ylab="W (₹ per day)", xlab="L (thousand workers)", size=AXS)
ax.xtitle_dy = 100
a, b = ax.px(0, 500); c, _ = ax.px(100, 500)
cv.line(a, b, c, b, BLUE, 7, cap="butt")
cv.text(c, b + 34, "Minimum wage", size=34, color=BLUE, anchor="end", weight=850)
cv.text(a - 18, b, "₹500", size=34, color=BLUE, anchor="end", weight=850)
hg(ax, 400, 40, "₹400", color=MUTED)
vg(ax, 20, 500, "20"); vg(ax, 60, 500, "60"); vg(ax, 40, 400, "40", dy=88)
ax.poly(DL, 10, 104, NAVY, CW); ax.poly(SL, 0, 92, NAVY, CW)
dot(ax, 20, 500, INK, 15); dot(ax, 60, 500, INK, 15); dot(ax, 40, 400, GOLD, 13)
ax.seg(20, 560, 60, 560, BLUE, 7, arrow_end=True, arrow_start=True, gap=4)
ax.label(40, 560, "Excess supply = 40", size=34, color=BLUE, weight=850, anchor="middle", dy=-40)
lab(ax, 104, DL(104), "D_{L}", NAVY, dx=-6, dy=-40, size=44, anchor="end")
lab(ax, 92, SL(92), "S_{L}", NAVY, dx=14, dy=10, size=44)
axes(ax)
tag(cv, 1180, 70, "Hypothetical labour market")
cv.save("G25_Minimum_Wage")


# ================================================================ G34 negative production externality
MSC = lambda q: 20 + q / 3
eq(D(60), 30); eq(S(60), 30); eq(D(48), 36); eq(MSC(48), 36); eq(MSC(60), 40)
cv = Canvas(1200, 1040)
ax = market_ax(cv, 230, 840, 1080, 200, ylab="Cost, benefit (₹)", xlab="Q (units of output)")
tri(ax, [(48, 36), (60, 40), (60, 30)], RED, 0.35)
hg(ax, 36, 48, "₹36", color=GOLD_TXT); hg(ax, 30, 60, "₹30")
vg(ax, 48, 36, "Q*", color=GOLD_TXT); vg(ax, 60, 40, "Q_{m}")
ax.poly(D, 6, 114, NAVY, CW); ax.poly(S, 0, 124, NAVY, CW); ax.poly(MSC, 0, 120, GOLD, CW)
ax.seg(60, 30.8, 60, 39.2, RED, 6, arrow_end=True, arrow_start=True)
dot(ax, 60, 30, INK, 15); dot(ax, 48, 36, GOLD, 17, ring=True)
lab(ax, 114, D(114), "MPB = MSB", NAVY, dx=-4, dy=-44, size=40, anchor="end")
lab(ax, 124, S(124), "MPC", NAVY, dx=-6, dy=40, size=42, anchor="end")
lab(ax, 120, MSC(120), "MSC", GOLD_TXT, dx=-12, dy=-40, size=42, anchor="end")
axes(ax)
cv.text(1180, 128, "Q_{m} = 60, Q* = 48", size=36, color=INK, anchor="end", weight=850)
cv.text(1180, 172, "External cost ₹10 a unit leads to overproduction", size=30, color=RED, anchor="end", weight=800)
tag(cv, 1180, 62, "Hypothetical polluting industry")
cv.save("G34_Negative_Externality")


# ================================================================ G35 positive consumption externality
MSB = lambda q: 70 - q / 2
eq(MSB(72), 34); eq(S(72), 34); eq(MSB(60), 40)
cv = Canvas(1200, 1040)
ax = market_ax(cv, 230, 840, 1080, 200, ylab="Cost, benefit (₹)", xlab="Q (vaccinations, thousand)")
tri(ax, [(60, 30), (60, 40), (72, 34)], GREEN, 0.35)
hg(ax, 34, 72, "₹34", color=GOLD_TXT); hg(ax, 30, 60, "₹30")
vg(ax, 60, 40, "Q_{m}"); vg(ax, 72, 34, "Q*", color=GOLD_TXT)
ax.poly(D, 6, 114, NAVY, CW); ax.poly(MSB, 26, 126, GOLD, CW); ax.poly(S, 0, 124, NAVY, CW)
ax.seg(60, 30.8, 60, 39.2, GREEN, 6, arrow_end=True, arrow_start=True)
dot(ax, 60, 30, INK, 15); dot(ax, 72, 34, GOLD, 17, ring=True)
lab(ax, 114, D(114), "MPB", NAVY, dx=12, dy=-28, size=42)
lab(ax, 126, MSB(126), "MSB", GOLD_TXT, dx=-6, dy=-42, size=42, anchor="end")
lab(ax, 124, S(124), "MPC = MSC", NAVY, dx=-6, dy=-44, size=40, anchor="end")
axes(ax)
cv.text(1180, 128, "Q_{m} = 60, Q* = 72", size=36, color=INK, anchor="end", weight=850)
cv.text(1180, 172, "External benefit ₹10 a unit leads to underconsumption", size=30, color=GREEN, anchor="end", weight=800)
tag(cv, 1180, 62, "Hypothetical vaccination market")
cv.save("G35_Positive_Externality")


# ================================================================ G36 corrective tax and subsidy
cv = Canvas(2400, 920)
for p in range(2):
    ox = 10 + p * 1200
    neg = p == 0
    title(cv, ox, 52, p + 1, "Tax equal to the external cost" if neg else "Subsidy equal to the external benefit", size=40)
    ax = market_ax(cv, ox + 200, 700, ox + 1060, 190, ylab="₹", xlab="Q", size=36)
    ax.xtitle_dy = 84
    ax.poly(D, 6, 114, NAVY, CW); ax.poly(S, 0, 124, NAVY, CW)
    if neg:
        ax.poly(MSC, 0, 120, GOLD, CW)
        ax.seg(80, S(80), 80, MSC(80), GOLD_TXT, 7, arrow_end=True, gap=8)
        ax.seg(60, 18, 48, 18, GOLD_TXT, 8, arrow_end=True, gap=6)
        ax.label(54, 18, "60 to 48", size=34, color=GOLD_TXT, weight=850, dy=40, anchor="middle")
        dot(ax, 60, 30, INK, 13); dot(ax, 48, 36, GOLD, 16, ring=True)
        vg(ax, 48, 36, "Q*", color=GOLD_TXT, size=32); vg(ax, 60, 30, "Q_{m}", size=32)
        lab(ax, 120, MSC(120), "MPC + tax = MSC", GOLD_TXT, dx=-10, dy=-44, size=36, anchor="end")
        lab(ax, 124, S(124), "MPC", NAVY, dx=-6, dy=42, size=38, anchor="end")
        lab(ax, 114, D(114), "MPB", NAVY, dx=10, dy=-28, size=38)
    else:
        ax.poly(MSB, 26, 126, GOLD, CW)
        ax.seg(30, D(30), 30, MSB(30), GOLD_TXT, 7, arrow_end=True, gap=8)
        ax.seg(60, 18, 72, 18, GOLD_TXT, 8, arrow_end=True, gap=6)
        ax.label(66, 18, "60 to 72", size=34, color=GOLD_TXT, weight=850, dy=40, anchor="middle")
        dot(ax, 60, 30, INK, 13); dot(ax, 72, 34, GOLD, 16, ring=True)
        vg(ax, 60, 30, "Q_{m}", size=32); vg(ax, 72, 34, "Q*", color=GOLD_TXT, size=32)
        lab(ax, 26, MSB(26), "MPB + subsidy = MSB", GOLD_TXT, dx=10, dy=-40, size=36)
        lab(ax, 114, D(114), "MPB", NAVY, dx=12, dy=-28, size=38)
        lab(ax, 124, S(124), "MPC", NAVY, dx=-6, dy=-44, size=38, anchor="end")
    axes(ax, origin=False)
cv.line(1205, 100, 1205, 890, EDGE, 3)
tag(cv, 2390, 905, "Same hypothetical markets as the two previous slides")
cv.save("G36_Correction")


# ================================================================ G42 natural monopoly (falling average cost)
AC = lambda q: 600 / q + 10
eq(AC(60), 20); eq(AC(30), 30)
Dn = lambda q: 44 - 0.4 * q
eq(Dn(60), 20)
cv = Canvas(1200, 1040)
ax = Ax(cv, 230, 840, 1080, 200, xmax=110, ymax=50, ylab="₹ per unit", xlab="Q (households served, thousand)", size=AXS)
ax.xtitle_dy = 100
hg(ax, 30, 30, "₹30", color=RED); hg(ax, 20, 60, "₹20", color=GREEN)
vg(ax, 30, 30, "30"); vg(ax, 60, 20, "60")
ax.poly(AC, 16, 106, NAVY, CW)
ax.poly(Dn, 0, 104, GOLD, CW - 2, dash="20 12")
dot(ax, 60, 20, GREEN, 17); dot(ax, 30, 30, RED, 17)
lab(ax, 106, AC(106), "Average cost", NAVY, dx=-6, dy=-40, size=38, anchor="end")
lab(ax, 104, Dn(104), "Market demand", GOLD_TXT, dx=-10, dy=-34, size=36, anchor="end")
cv.rect(620, 230, 540, 170, fill="#FBF9F3", stroke=EDGE, sw=3, rx=16)
cv.lines(890, 315, [("Two networks, half each: ₹30", dict(color=RED)), ("One network for all: ₹20", dict(color=GREEN))], size=34, weight=850)
axes(ax)
tag(cv, 1180, 70, "Hypothetical piped-water network")
cv.save("G42_Natural_Monopoly")
