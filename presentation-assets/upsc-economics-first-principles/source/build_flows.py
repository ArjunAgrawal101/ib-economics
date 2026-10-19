"""Concept diagrams and flow diagrams for UPSC Economics from First Principles (Section I).

Circular flow convention (as in the earlier Measuring Economic Activity deck): real flows green and
clockwise, money flows gold and anticlockwise; households left, firms right, factor market on top,
product market at the bottom. All numbers are hypothetical and labelled as such.
"""
import math
from ufp import (Canvas, INK, NAVY, GOLD, GOLD_TXT, GREEN, RED, BLUE, GUIDE, MUTED, IVORY, EDGE, HALO, SERIF, FONT, tw)

WHITE = "#FFFFFF"
SOFT = "#FBF7EE"


def elbow(cv, pts, color, w=6, arrow=True, head=30):
    d = "M" + " L".join(f"{x:.1f},{y:.1f}" for x, y in pts)
    cv.path(d, color=color, w=w, arrow_end=arrow, head=head, join="miter")


def card(cv, x, y, w, h, title, rows, accent=GOLD, tsize=32, rsize=26, fill=WHITE, tcol=INK):
    cv.rect(x, y, w, h, fill=fill, stroke=EDGE, sw=3, rx=16)
    cv.rect(x, y, 12, h, fill=accent, rx=4)
    block = tsize * 1.3 + len(rows) * rsize * 1.4
    top = y + h / 2 - block / 2
    cv.text(x + 36, top + tsize * 0.65, title, size=tsize, color=tcol, weight=750, halo=False)
    for i, r in enumerate(rows):
        cv.text(x + 36, top + tsize * 1.3 + rsize * 1.4 * (i + 0.5), r, size=rsize, color=MUTED, weight=500, halo=False)


# ================================================================ UFP_01 cover motif (navy, restrained)
cv = Canvas(1200, 1350)
cv.rect(0, 0, 1200, 1350, fill="#0E1E3A")
for i in range(1, 12):
    cv.line(i * 100, 0, i * 100, 1350, "#B08A47", 1.2, opacity=0.13, cap="butt")
for j in range(1, 14):
    cv.line(0, j * 100, 1200, j * 100, "#B08A47", 1.2, opacity=0.13, cap="butt")
# axes
cv.line(170, 1130, 170, 260, "#E2C98F", 3, opacity=0.8, cap="butt")
cv.line(170, 1130, 1050, 1130, "#E2C98F", 3, opacity=0.8, cap="butt")
# PPC
pts = []
for i in range(0, 401):
    t = i / 400
    x = 170 + 800 * t
    y = 1130 - 760 * math.sqrt(max(0, 1 - t ** 2))
    pts.append((x, y))
cv.path("M" + " L".join(f"{a:.1f},{b:.1f}" for a, b in pts), color="#B08A47", w=6)
# demand and supply
cv.line(260, 420, 900, 1020, "#F7F3E8", 4, opacity=0.55)
cv.line(260, 980, 940, 470, "#F7F3E8", 4, opacity=0.55)
xi = 260 + (640) * ((980 - 420) / ((1020 - 420) + (980 - 470)))
yi = 420 + (1020 - 420) * ((xi - 260) / 640)
cv.circle(xi, yi, 14, "#E2C98F", "#0E1E3A", 5)
cv.line(xi, yi, xi, 1130, "#E2C98F", 2, dash="8 10", opacity=0.6, cap="butt")
cv.line(170, yi, xi, yi, "#E2C98F", 2, dash="8 10", opacity=0.6, cap="butt")
# circular-flow arc
cv.add('<circle cx="930" cy="330" r="140" fill="none" stroke="#E2C98F" stroke-width="3" opacity="0.45"/>')
cv.circle(930, 190, 9, "#E2C98F", "#0E1E3A", 3)
cv.circle(930, 470, 9, "#E2C98F", "#0E1E3A", 3)
cv.save("UFP_01_Cover_Motif")


# ================================================================ UFP_07 factors of production
cv = Canvas(2160, 1000)
L, C0, CW, G = 30, 450, 540, 18
sectors = [("Agriculture", "Rice farm"), ("Manufacturing", "Textile mill"), ("Services", "Hospital")]
factors = [("LAND", "Natural resources"), ("LABOUR", "Human effort"), ("PHYSICAL CAPITAL", "Produced tools and machines"),
           ("ENTREPRENEURSHIP", "Organises and bears risk")]
cells = [
    [["Paddy fields,", "canal water"], ["Factory site,", "groundwater"], ["Building plot"]],
    [["Farmer and", "farm workers"], ["Machine operators,", "supervisors"], ["Doctors, nurses,", "technicians"]],
    [["Tractor, pump set,", "storage shed"], ["Looms, spinning", "machines, factory shed"], ["Scanners, beds,", "ambulances"]],
    [["Farmer choosing the", "crop and bearing risk"], ["Mill owner organising", "production"], ["Founder starting and", "running the hospital"]],
]
outputs = ["Rice", "Cotton fabric", "Medical care"]
for j, (s, sub) in enumerate(sectors):
    x = C0 + j * (CW + G)
    cv.text(x + CW / 2, 52, s.upper(), size=30, color=GOLD_TXT, anchor="middle", weight=750, spacing="2", halo=False)
    cv.text(x + CW / 2, 96, sub, size=30, color=INK, anchor="middle", weight=650, halo=False)
RH, Y0 = 138, 130
for i, (f, d) in enumerate(factors):
    y = Y0 + i * (RH + G)
    cv.rect(L, y, 400, RH, fill=INK, rx=14)
    cv.text(L + 28, y + 50, f, size=29, color=WHITE, weight=750, spacing="1.5", halo=False)
    cv.text(L + 28, y + 96, d, size=24, color="#E2C98F", weight=500, halo=False)
    for j in range(3):
        x = C0 + j * (CW + G)
        cv.rect(x, y, CW, RH, fill=SOFT, stroke=EDGE, sw=2, rx=14)
        cv.lines(x + CW / 2, y + RH / 2, cells[i][j], size=29, color=INK, weight=550, halo=False)
yb = Y0 + 4 * (RH + G)
for j, o in enumerate(outputs):
    x = C0 + j * (CW + G)
    cv.line(x + CW / 2, yb + 4, x + CW / 2, yb + 74, GOLD, 7, arrow_end=True, head=30)
    cv.rect(x + 60, yb + 88, CW - 120, 96, fill=WHITE, stroke=GOLD, sw=4, rx=48)
    cv.text(x + CW / 2, yb + 136, o, size=34, color=INK, anchor="middle", weight=750, halo=False)
cv.text(L + 200, yb + 136, "OUTPUT", size=30, color=GOLD_TXT, anchor="middle", weight=800, spacing="3", halo=False)
cv.save("UFP_07_Factors_of_Production")


# ================================================================ UFP_08 factor incomes
cv = Canvas(2000, 900)
pairs = [("Land", "Rent"), ("Labour", "Wages"), ("Physical capital", "Interest"), ("Entrepreneurship", "Profit")]
subs = ["", "", "return to capital", "reward for risk"]
for i, (f, inc) in enumerate(pairs):
    y = 40 + i * 150
    cv.rect(40, y, 440, 120, fill=INK, rx=16)
    cv.text(260, y + 61, f, size=36, color=WHITE, anchor="middle", weight=750, halo=False)
    cv.line(500, y + 60, 690, y + 60, GOLD, 7, arrow_end=True, head=30)
    cv.text(595, y + 30, "earns", size=24, color=MUTED, anchor="middle", weight=600, italic=True, halo=False)
    cv.rect(710, y, 440, 120, fill=WHITE, stroke=GOLD, sw=4, rx=16)
    if subs[i]:
        cv.text(930, y + 46, inc, size=38, color=GOLD_TXT, anchor="middle", weight=800, halo=False)
        cv.text(930, y + 88, subs[i], size=24, color=MUTED, anchor="middle", weight=500, halo=False)
    else:
        cv.text(930, y + 61, inc, size=38, color=GOLD_TXT, anchor="middle", weight=800, halo=False)
# bracket and bridge
cv.path("M 1185,60 Q 1215,60 1215,100 L 1215,290 Q 1215,320 1245,320 Q 1215,320 1215,350 L 1215,540 Q 1215,580 1185,580",
        color=GOLD, w=5)
cv.line(1260, 320, 1360, 320, GOLD, 7, arrow_end=True, head=30)
cv.rect(1380, 190, 580, 260, fill=INK, rx=20)
cv.lines(1670, 320, ["Factor incomes flow to the", "households that own", "the factors"], size=32, color=WHITE, weight=650,
         halo=False)
cv.text(1670, 490, "The first link in the circular flow", size=27, color=GOLD_TXT, anchor="middle", weight=700, italic=True,
        halo=False)
# misconception strip
cv.rect(40, 660, 1920, 200, fill="#F6EFDF", rx=20)
cv.rect(40, 660, 14, 200, fill=RED, rx=6)
cv.text(90, 715, "Capital is not the same as money", size=34, color=RED, weight=800, halo=False)
cv.text(90, 770, "A ₹10 lakh bank loan is finance. The tractor that the loan buys is physical capital:", size=30,
        color=INK, weight=550, halo=False)
cv.text(90, 815, "a produced asset used to produce other goods.", size=30, color=INK, weight=550, halo=False)
cv.save("UFP_08_Factor_Incomes")


# ================================================================ UFP_11 one resource, competing uses
cv = Canvas(1600, 1000)
cx, cy = 800, 470
uses = [("Rice", "cultivation"), ("Sugarcane", "cultivation"), ("Primary", "school"), ("Housing", "colony"),
        ("Solar", "power park")]
angs = [-90, -18, 54, 126, 198]
for (a, b), ang in zip(uses, angs):
    r = math.radians(ang)
    bx, by = cx + 560 * math.cos(r) * 0.95, cy + 330 * math.sin(r) * 1.05
    sx, sy = cx + 205 * math.cos(r), cy + 205 * math.sin(r)
    dx, dy = bx - sx, by - sy
    L = math.hypot(dx, dy); ux, uy = dx / L, dy / L
    k = min(150 / abs(ux) if abs(ux) > 1e-6 else 1e9, 64 / abs(uy) if abs(uy) > 1e-6 else 1e9)
    ex, ey = bx - ux * (k + 12), by - uy * (k + 12)
    cv.line(sx + ux * 10, sy + uy * 10, ex, ey, GOLD, 5, arrow_end=True, head=26)
    cv.rect(bx - 150, by - 64, 300, 128, fill=WHITE, stroke=GOLD, sw=4, rx=20)
    cv.lines(bx, by, [(a, dict(weight=750, size=33)), (b, dict(weight=500, size=27, color=MUTED))], size=30, color=INK,
             halo=False)
cv.circle(cx, cy, 190, INK, HALO, 6)
cv.lines(cx, cy - 6, [("100 hectares", dict(size=44, weight=800, color=WHITE)),
                      ("of village land", dict(size=32, weight=600, color=WHITE)),
                      ("(hypothetical)", dict(size=25, weight=500, color="#E2C98F", italic=True))], halo=False)
cv.text(800, 955, "A hectare given to one use cannot be used for the others at the same time", size=31,
        color=INK, anchor="middle", weight=650, italic=True)
cv.save("UFP_11_Competing_Uses")


# ================================================================ UFP_14 opportunity cost decision tree
cv = Canvas(1900, 980)
cv.rect(40, 360, 440, 220, fill=INK, rx=20)
cv.lines(260, 470, [("3 free hours", dict(size=40, weight=800)), ("this evening", dict(size=32, weight=600))],
         color=WHITE, halo=False)
opts = [("Take a full Prelims mock test", "CHOSEN", GREEN, "#EEF5F1"),
        ("Revise Polity notes", "NEXT-BEST ALTERNATIVE", GOLD_TXT, "#F6EFDF"),
        ("Watch a film", "ANOTHER ALTERNATIVE", GUIDE, "#F2F3F5")]
ys = [150, 470, 790]
for (t, tag, col, fill), y in zip(opts, ys):
    cv.path(f"M 480,470 C 600,470 600,{y} 720,{y}", color=col, w=6, arrow_end=True, head=28)
    cv.rect(740, y - 95, 700, 190, fill=fill, stroke=col, sw=4, rx=20)
    cv.text(780, y - 36, tag, size=25, color=col, weight=800, spacing="2", halo=False)
    cv.text(780, y + 22, t, size=36, color=INK, weight=750, halo=False)
cv.text(780, 470 + 70, "This is the opportunity cost", size=29, color=GOLD_TXT, weight=700, italic=True, halo=False)
cv.text(780, 790 + 70, "Not counted in the opportunity cost", size=27, color=MUTED, weight=600, italic=True, halo=False)
cv.text(1480, 150, "1st choice", size=30, color=GREEN, weight=750, halo=False)
cv.text(1480, 470, "2nd choice", size=30, color=GOLD_TXT, weight=750, halo=False)
cv.text(1480, 790, "3rd choice", size=30, color=MUTED, weight=750, halo=False)
cv.text(1480, 300, "Ranked by the", size=25, color=MUTED, weight=500, italic=True, halo=False)
cv.text(1480, 334, "student's own priorities", size=25, color=MUTED, weight=500, italic=True, halo=False)
cv.save("UFP_14_Decision_Tree")


# ================================================================ UFP_16 public budget pathways
cv = Canvas(2000, 1000)
cv.rect(40, 360, 440, 260, fill=INK, rx=20)
cv.lines(260, 490, [("₹500 crore", dict(size=46, weight=800)), ("for one new project", dict(size=28, weight=550)),
                    ("(hypothetical)", dict(size=25, weight=500, color="#E2C98F", italic=True))], color=WHITE, halo=False)
projects = [("Irrigation canals", ["Assured water for dry farms", "More stable farm output"]),
            ("Electric buses", ["Faster, cleaner commuting", "Less urban air pollution"]),
            ("District hospital upgrade", ["More beds and specialists", "Shorter travel for treatment"])]
ys = [160, 490, 820]
for (t, rows), y in zip(projects, ys):
    cv.path(f"M 480,490 C 610,490 610,{y} 740,{y}", color=NAVY, w=6, arrow_end=True, head=28)
    card(cv, 760, y - 130, 640, 260, t, rows, accent=NAVY, tsize=36, rsize=28)
cv.rect(1460, 230, 500, 520, fill="#F6EFDF", rx=22)
cv.lines(1710, 380, [("Choose one.", dict(size=36, weight=800, color=INK)),
                     ("Its opportunity cost", dict(size=30, weight=600)),
                     ("= benefits of the", dict(size=30, weight=600)),
                     ("next-best project", dict(size=30, weight=600)),
                     ("forgone", dict(size=30, weight=600))], color=GOLD_TXT, halo=False)
cv.lines(1710, 640, ["No option is always best:", "it depends on local needs,", "evidence and objectives"], size=25,
         color=MUTED, weight=600, italic=True, halo=False)
cv.save("UFP_16_Budget_Choice")


# ================================================================ UFP_25 simple income loop
cv = Canvas(1800, 940)
cv.rect(60, 330, 420, 230, fill=INK, rx=22)
cv.text(270, 446, "HOUSEHOLDS", size=40, color=WHITE, anchor="middle", weight=750, spacing="2", halo=False)
cv.rect(1320, 330, 420, 230, fill=INK, rx=22)
cv.text(1530, 446, "FIRMS", size=40, color=WHITE, anchor="middle", weight=750, spacing="2", halo=False)
cv.path("M 1470,320 C 1350,40 450,40 330,312", color=GOLD, w=9, arrow_end=True, head=40)
cv.path("M 330,570 C 450,860 1350,860 1470,588", color=GOLD, w=9, arrow_end=True, head=40)
cv.text(900, 205, "Factor incomes", size=38, color=GOLD_TXT, anchor="middle", weight=800)
cv.text(900, 252, "wages, rent, interest, profit", size=30, color=MUTED, anchor="middle", weight=600)
cv.text(900, 640, "Consumption spending", size=38, color=GOLD_TXT, anchor="middle", weight=800)
cv.text(900, 690, "on goods and services", size=30, color=MUTED, anchor="middle", weight=600)
cv.text(900, 425, "Income flows", size=48, color=INK, anchor="middle", weight=700, family=SERIF, halo=False)
cv.text(900, 485, "in a circle", size=48, color=INK, anchor="middle", weight=700, family=SERIF, halo=False)
cv.text(900, 905, "Simplest model: two sectors, all income spent, no government, no saving, no foreign trade",
        size=27, color=MUTED, anchor="middle", weight=500, italic=True)
cv.save("UFP_25_Income_Loop")


# ================================================================ UFP_27 / UFP_28 four-box circular flow
def four_box(name, money):
    cv = Canvas(2040, 1000)
    H = (40, 390, 420, 220); F = (1580, 390, 420, 220)
    FM = (720, 90, 600, 160); PM = (720, 750, 600, 160)
    for (x, y, w, h), t in ((H, "HOUSEHOLDS"), (F, "FIRMS")):
        cv.rect(x, y, w, h, fill=INK, rx=22)
        cv.text(x + w / 2, y + h / 2 + 2, t, size=40, color=WHITE, anchor="middle", weight=750, spacing="2", halo=False)
    for (x, y, w, h), t, s in ((FM, "FACTOR MARKET", "firms hire factor services"),
                               (PM, "PRODUCT MARKET", "households buy goods and services")):
        cv.rect(x, y, w, h, fill=IVORY, stroke=INK, sw=3, rx=10)
        cv.text(x + w / 2, y + 62, t, size=36, color=INK, anchor="middle", weight=800, spacing="3", halo=False)
        cv.text(x + w / 2, y + 112, s, size=26, color=MUTED, anchor="middle", weight=550, halo=False)
    # real flows: clockwise, outer
    g = GREEN
    elbow(cv, [(140, 390), (140, 150), (712, 150)], g, 7)
    elbow(cv, [(1320, 150), (1900, 150), (1900, 382)], g, 7)
    elbow(cv, [(1900, 610), (1900, 850), (1328, 850)], g, 7)
    elbow(cv, [(720, 850), (140, 850), (140, 618)], g, 7)
    cv.text(426, 112, "Factor services", size=32, color=GREEN, anchor="middle", weight=800)
    cv.text(1610, 112, "land, labour, capital, entrepreneurship", size=26, color=GREEN, anchor="middle", weight=600)
    cv.text(1610, 890, "Goods and services", size=32, color=GREEN, anchor="middle", weight=800)
    if money:
        m = GOLD
        elbow(cv, [(1700, 390), (1700, 210), (1328, 210)], m, 7)
        elbow(cv, [(720, 210), (340, 210), (340, 382)], m, 7)
        elbow(cv, [(340, 610), (340, 790), (712, 790)], m, 7)
        elbow(cv, [(1320, 790), (1700, 790), (1700, 618)], m, 7)
        cv.text(530, 262, "Factor incomes", size=32, color=GOLD_TXT, anchor="middle", weight=800)
        cv.text(530, 302, "rent, wages, interest, profit", size=25, color=GOLD_TXT, anchor="middle", weight=600)
        cv.text(1510, 700, "Spending", size=32, color=GOLD_TXT, anchor="middle", weight=800)
        cv.text(1510, 740, "= firms' sales revenue", size=25, color=GOLD_TXT, anchor="middle", weight=600)
        # legend
        cv.line(800, 455, 900, 455, GREEN, 7, arrow_end=True, head=28)
        cv.text(925, 456, "Real flows: clockwise", size=32, color=GREEN, weight=750)
        cv.line(800, 535, 900, 535, GOLD, 7, arrow_end=True, head=28)
        cv.text(925, 536, "Money flows: anticlockwise", size=32, color=GOLD_TXT, weight=750)
    else:
        cv.line(800, 495, 900, 495, GREEN, 7, arrow_end=True, head=28)
        cv.text(925, 496, "Real flows: what is exchanged", size=32, color=GREEN, weight=750)
    cv.save(name)


four_box("UFP_27_Product_Factor_Markets", money=False)
four_box("UFP_28_Real_vs_Money_Flows", money=True)


# ================================================================ UFP_29 expanded model (ladder layout, no crossings)
cv = Canvas(2040, 1080)
H = (40, 60, 360, 960); F = (1640, 60, 360, 960)
for (x, y, w, h), t in ((H, "HOUSEHOLDS"), (F, "FIRMS")):
    cv.rect(x, y, w, h, fill=INK, rx=24)
    cv.text(x + w / 2, y + h / 2, t, size=40, color=WHITE, anchor="middle", weight=750, spacing="2", halo=False)
# core loop
cv.line(1632, 130, 410, 130, GOLD, 7, arrow_end=True, head=30)
cv.text(1020, 96, "Factor incomes", size=31, color=GOLD_TXT, anchor="middle", weight=800)
cv.line(408, 250, 1630, 250, GOLD, 7, arrow_end=True, head=30)
cv.text(1020, 216, "Consumption spending", size=31, color=GOLD_TXT, anchor="middle", weight=800)
cv.text(1020, 300, "THE BASIC TWO-SECTOR LOOP", size=24, color=MUTED, anchor="middle", weight=700, spacing="2",
        halo=False)
cv.line(420, 336, 1620, 336, EDGE, 3, cap="butt")
sectors = [("FINANCIAL SYSTEM", "Banks and markets turn savings into loans", "Savings", "Investment"),
           ("GOVERNMENT", "Collects taxes and buys goods and services", "Taxes", "Government purchases"),
           ("REST OF THE WORLD", "Sells us goods; buys goods from us", "Imports", "Exports")]
for i, (t, role, a, b) in enumerate(sectors):
    y = 390 + i * 220
    cv.rect(700, y, 640, 170, fill=IVORY, stroke=INK, sw=3, rx=14)
    cv.text(1020, y + 58, t, size=33, color=INK, anchor="middle", weight=800, spacing="2", halo=False)
    cv.text(1020, y + 112, role, size=24, color=MUTED, anchor="middle", weight=550, halo=False)
    cv.line(408, y + 85, 690, y + 85, NAVY, 6, arrow_end=True, head=28)
    cv.text(549, y + 52, a, size=29, color=NAVY, anchor="middle", weight=750)
    cv.line(1350, y + 85, 1630, y + 85, NAVY, 6, arrow_end=True, head=28)
    if " " in b:
        w1, w2 = b.split(" ", 1)
        cv.text(1490, y + 18, w1, size=29, color=NAVY, anchor="middle", weight=750)
        cv.text(1490, y + 52, w2, size=29, color=NAVY, anchor="middle", weight=750)
    else:
        cv.text(1490, y + 52, b, size=29, color=NAVY, anchor="middle", weight=750)
cv.save("UFP_29_Expanded_Model")


# ================================================================ UFP_30 leakages and injections (stream)
cv = Canvas(2040, 940)
# income stream band
cv.rect(60, 400, 1920, 140, fill="#F6EFDF", stroke=GOLD, sw=4, rx=70)
cv.text(1020, 471, "THE CIRCULAR FLOW OF INCOME AND SPENDING", size=32, color=GOLD_TXT, anchor="middle", weight=800,
        spacing="3", halo=False)
cv.line(1880, 471, 1950, 471, GOLD, 7, arrow_end=True, head=30)
inj = [("Investment", "I", 330), ("Government purchases", "G", 1020), ("Exports", "X", 1710)]
lea = [("Savings", "S", 330), ("Taxes", "T", 1020), ("Imports", "M", 1710)]
cv.text(60, 60, "INJECTIONS: spending added to the flow", size=30, color=GREEN, weight=800, spacing="1.5")
cv.text(60, 900, "LEAKAGES: income withdrawn from the flow", size=30, color=RED, weight=800, spacing="1.5")
for name, sym, x in inj:
    cv.circle(x, 175, 54, GREEN, HALO, 5)
    cv.text(x, 177, sym, size=46, color=WHITE, anchor="middle", weight=800, halo=False)
    cv.text(x + 78, 175, name, size=32, color=GREEN, weight=750)
    cv.line(x, 236, x, 388, GREEN, 9, arrow_end=True, head=38)
for name, sym, x in lea:
    cv.line(x, 552, x, 700, RED, 9, arrow_end=True, head=38)
    cv.circle(x, 765, 54, RED, HALO, 5)
    cv.text(x, 767, sym, size=46, color=WHITE, anchor="middle", weight=800, halo=False)
    cv.text(x + 78, 765, name, size=32, color=RED, weight=750)
cv.save("UFP_30_Leakages_Injections")


# ================================================================ UFP_31 three views of one flow
cv = Canvas(1800, 1060)
cx, cy, R = 900, 500, 390
BW, BH = 440, 176
nodes = [(-90, "PRODUCTION", "Firms produce goods", "and services (output)"),
         (30, "INCOME", "Production generates", "factor incomes"),
         (150, "EXPENDITURE", "Incomes are spent", "on the output")]
centres = [(cx + R * math.cos(math.radians(a)), cy + R * math.sin(math.radians(a))) for a, *_ in nodes]


def outside(ang, k, m=22):
    x, y = cx + R * math.cos(math.radians(ang)), cy + R * math.sin(math.radians(ang))
    bx, by = centres[k]
    return abs(x - bx) > BW / 2 + m or abs(y - by) > BH / 2 + m


for k in range(3):
    a_start = nodes[k][0]
    a_end = nodes[(k + 1) % 3][0]
    if a_end <= a_start:
        a_end += 360
    a0 = a_start
    while not outside(a0, k):
        a0 += 0.25
    a1 = a_end
    while not outside(a1, (k + 1) % 3, 30):
        a1 -= 0.25
    x0, y0 = cx + R * math.cos(math.radians(a0)), cy + R * math.sin(math.radians(a0))
    x1, y1 = cx + R * math.cos(math.radians(a1)), cy + R * math.sin(math.radians(a1))
    cv.path(f"M {x0:.1f},{y0:.1f} A {R} {R} 0 0 1 {x1:.1f},{y1:.1f}", color=GOLD, w=10, arrow_end=True, head=44)
for (ang, t, s1, s2), (x, y) in zip(nodes, centres):
    cv.rect(x - BW / 2, y - BH / 2, BW, BH, fill=INK, rx=22)
    cv.text(x, y - 40, t, size=34, color=WHITE, anchor="middle", weight=800, spacing="3", halo=False)
    cv.text(x, y + 12, s1, size=27, color="#E2C98F", anchor="middle", weight=550, halo=False)
    cv.text(x, y + 50, s2, size=27, color="#E2C98F", anchor="middle", weight=550, halo=False)
cv.text(cx, cy - 30, "Output", size=44, color=INK, anchor="middle", weight=700, family=SERIF, halo=False)
cv.text(cx, cy + 26, "= Income", size=44, color=INK, anchor="middle", weight=700, family=SERIF, halo=False)
cv.text(cx, cy + 82, "= Expenditure", size=44, color=INK, anchor="middle", weight=700, family=SERIF, halo=False)
cv.text(cx, 1030, "In the basic model: three ways of measuring the same flow of economic activity", size=28,
        color=MUTED, anchor="middle", weight=600, italic=True)
cv.save("UFP_31_Three_Views")
