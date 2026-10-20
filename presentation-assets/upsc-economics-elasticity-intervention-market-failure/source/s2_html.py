"""Section II infographics (HTML rendered to PNG): Elasticity, Government Intervention and Market Failure.

Brand: navy #0E1E3A, antique gold #B08A47, ivory; Inter for text, Lora for display numerals and headlines.
Canvas 1600 px wide for full-width slide images (about 900 pt on the slide), so 32 px text projects at about 18 pt.
All numerical examples are hypothetical.
"""
import os, base64

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "html")
PNG = os.path.join(HERE, "..", "png")
os.makedirs(OUT, exist_ok=True)

CSS = """
:root{--ink:#0E1E3A;--navy:#1B3460;--gold:#B08A47;--goldt:#8A6A2E;--gl:#E2C98F;--green:#2E7D5B;--red:#B0412E;--blue:#2F5D8C;
--ivory:#FBF9F3;--soft:#F6EFDF;--edge:#E2D6BC;--muted:#5B6577;--white:#FFFFFF;}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:transparent}
body{font-family:Inter,'DejaVu Sans',sans-serif;color:var(--ink);-webkit-font-smoothing:antialiased;line-height:1.25}
.wrap{position:relative;overflow:hidden;padding:8px}
.cap{font-weight:800;letter-spacing:.11em;text-transform:uppercase;color:var(--goldt);font-size:24px}
.serif{font-family:Lora,Georgia,serif}
.card{background:#fff;border:3px solid var(--edge);border-radius:22px}
.navy{background:var(--ink);color:#fff;border-radius:22px}
.soft{background:var(--soft);border-radius:22px}
.muted{color:var(--muted)}
.tag{font-style:italic;color:var(--muted);font-weight:600;font-size:22px}
.row{display:flex;align-items:center}
.col{display:flex;flex-direction:column}
.chip{display:inline-block;border-radius:999px;padding:6px 18px;font-weight:800;font-size:22px;letter-spacing:.06em}
b{font-weight:800}
"""


def page(name, w, h, body, extra=""):
    html = (f'<!doctype html><html><head><meta charset="utf-8"><style>{CSS}{extra}</style></head>'
            f'<body data-size="{w}x{h}"><div class="wrap" style="width:{w}px;height:{h}px">{body}</div></body></html>')
    with open(os.path.join(OUT, name + ".html"), "w") as f:
        f.write(html)
    print("html", name)


def img64(name):
    with open(os.path.join(PNG, name + ".png"), "rb") as f:
        return "data:image/png;base64," + base64.b64encode(f.read()).decode()


def arrow(w=70, c="#B08A47", h=34):
    x2 = w - 22
    return (f'<svg width="{w}" height="{h}" viewBox="0 0 {w} {h}" style="flex-shrink:0"><line x1="3" y1="{h/2}" x2="{x2}" y2="{h/2}" '
            f'stroke="{c}" stroke-width="6" stroke-linecap="round"/><path d="M{x2-2},{h/2-13} L{w},{h/2} L{x2-2},{h/2+13} z" fill="{c}"/></svg>')


def darrow(h=60, c="#B08A47", w=34):
    y2 = h - 22
    return (f'<svg width="{w}" height="{h}" viewBox="0 0 {w} {h}"><line x1="{w/2}" y1="3" x2="{w/2}" y2="{y2}" stroke="{c}" '
            f'stroke-width="6" stroke-linecap="round"/><path d="M{w/2-13},{y2-2} L{w/2},{h} L{w/2+13},{y2-2} z" fill="{c}"/></svg>')


def num(n, c="#0E1E3A", s=56):
    return (f'<div style="width:{s}px;height:{s}px;border-radius:50%;background:{c};color:#fff;display:flex;align-items:center;'
            f'justify-content:center;font-weight:850;font-size:{int(s*0.5)}px;flex-shrink:0">{n}</div>')


# ================================================================ C01 cover motif (navy, abstract economics lines)
svg = ['<svg width="900" height="1000" viewBox="0 0 900 1000" xmlns="http://www.w3.org/2000/svg">',
       '<rect width="900" height="1000" fill="#0E1E3A"/>']
for i in range(1, 10):
    svg.append(f'<line x1="{i*100}" y1="0" x2="{i*100}" y2="1000" stroke="#B08A47" stroke-width="1.2" opacity="0.12"/>')
for j in range(1, 10):
    svg.append(f'<line x1="0" y1="{j*100}" x2="900" y2="{j*100}" stroke="#B08A47" stroke-width="1.2" opacity="0.12"/>')
svg += ['<line x1="130" y1="860" x2="130" y2="150" stroke="#E2C98F" stroke-width="3" opacity="0.8"/>',
        '<line x1="130" y1="860" x2="800" y2="860" stroke="#E2C98F" stroke-width="3" opacity="0.8"/>',
        # steep and flat demand (elasticity)
        '<line x1="470" y1="180" x2="580" y2="655" stroke="#FBF9F3" stroke-width="4" opacity="0.5"/>',
        '<line x1="200" y1="275" x2="780" y2="494" stroke="#FBF9F3" stroke-width="5" opacity="0.7"/>',
        '<circle cx="520" cy="396" r="12" fill="#FBF9F3" stroke="#0E1E3A" stroke-width="4"/>',
        # supply and supply plus tax (wedge)
        '<line x1="160" y1="760" x2="740" y2="330" stroke="#B08A47" stroke-width="6"/>',
        '<line x1="160" y1="660" x2="660" y2="290" stroke="#B08A47" stroke-width="4" stroke-dasharray="14 12"/>',
        '<line x1="520" y1="404" x2="520" y2="494" stroke="#E2C98F" stroke-width="4"/>',
        '<path d="M508,416 L520,396 L532,416" fill="none" stroke="#E2C98F" stroke-width="4"/>',
        # price ceiling line
        '<line x1="130" y1="600" x2="800" y2="600" stroke="#E2C98F" stroke-width="3" stroke-dasharray="6 10" opacity="0.8"/>',
        '<circle cx="520" cy="494" r="12" fill="#E2C98F" stroke="#0E1E3A" stroke-width="4"/>',
        '<circle cx="740" cy="200" r="120" fill="none" stroke="#E2C98F" stroke-width="3" opacity="0.35"/>',
        '<circle cx="740" cy="200" r="70" fill="none" stroke="#E2C98F" stroke-width="2" opacity="0.25"/>',
        '</svg>']
os.makedirs(os.path.join(HERE, "..", "svg"), exist_ok=True)
with open(os.path.join(HERE, "..", "svg", "C01_Cover_Motif.svg"), "w") as f:
    f.write("".join(svg))
print("svg C01_Cover_Motif")


# ================================================================ S02 from Section I to Section II
qs = [("1", "How strongly do buyers and sellers respond to price or income changes?", "Part I · Elasticity"),
      ("2", "Why and how does government intervene in markets?", "Part II · Intervention"),
      ("3", "When do market outcomes create wider economic or social problems?", "Part III · Market failure")]
body = ('<div class="row" style="gap:26px;height:560px">'
        '<div class="navy col" style="width:430px;height:540px;padding:40px;justify-content:center">'
        '<div class="cap" style="color:var(--gl)">Section I established</div>'
        '<div class="serif" style="font-size:44px;font-weight:700;line-height:1.15;margin:16px 0 26px">How markets set prices</div>'
        + "".join(f'<div style="font-size:30px;font-weight:600;margin:8px 0;color:#F7F3E8">{t}</div>' for t in
                  ["Demand and supply", "Shifts and equilibrium", "Shortage and surplus"])
        + '</div>' + arrow(80) + '<div class="col" style="flex:1;gap:20px">'
        '<div class="cap">Section II asks three new questions</div>'
        + "".join(f'<div class="card row" style="height:150px;padding:0 30px;gap:26px">{num(n, "#B08A47", 64)}'
                  f'<div style="flex:1"><div style="font-size:33px;font-weight:750;line-height:1.25">{q}</div>'
                  f'<div class="cap" style="margin-top:8px;color:var(--muted);font-size:20px">{t}</div></div></div>' for n, q, t in qs)
        + '</div></div>')
page("S02_Bridge", 1600, 580, body)


# ================================================================ S03 three questions that guide this section
node = lambda cap, title, q, c: (f'<div class="col" style="width:440px;height:330px;border-radius:26px;background:{c};color:#fff;padding:34px 36px;justify-content:center">'
                                 f'<div class="cap" style="color:var(--gl)">{cap}</div>'
                                 f'<div class="serif" style="font-size:46px;font-weight:700;margin:12px 0 14px">{title}</div>'
                                 f'<div style="font-size:30px;font-weight:550;line-height:1.3;color:#F7F3E8">{q}</div></div>')
body = ('<div class="row" style="justify-content:space-between">'
        + node("Part I", "Elasticity", "How responsive are buyers and sellers?", "#0E1E3A") + arrow(80)
        + node("Part II", "Intervention", "Which policy instrument can change the outcome?", "#1B3460") + arrow(80)
        + node("Part III", "Market failure", "When do private incentives miss the social optimum?", "#7A5A24")
        + '</div>'
        '<div class="row" style="margin-top:26px;gap:0;height:76px;border-radius:38px;overflow:hidden;font-size:30px;font-weight:800">'
        '<div style="flex:1;background:#E9E2D2;height:100%;display:flex;align-items:center;justify-content:center">Understand behaviour</div>'
        '<div style="flex:1;background:#E2C98F;height:100%;display:flex;align-items:center;justify-content:center">Choose policy</div>'
        '<div style="flex:1;background:#B08A47;color:#fff;height:100%;display:flex;align-items:center;justify-content:center">Evaluate results</div></div>'
        '<div class="row" style="margin-top:22px;justify-content:space-between">'
        '<div style="font-size:28px;font-weight:650" class="muted">Diagnosing the failure (Part III) tells us which instrument (Part II) fits.</div>'
        '<div class="chip" style="background:#0E1E3A;color:#fff">Part IV · Synthesis and practice</div></div>')
page("S03_Map", 1600, 560, body)


# ================================================================ S04 same price rise, different responses
bar = lambda label, pct, c, w: (f'<div class="row" style="gap:16px;margin:8px 0"><div style="width:220px;font-size:28px;font-weight:650" class="muted">{label}</div>'
                                f'<div style="height:52px;width:{w}px;background:{c};border-radius:10px"></div>'
                                f'<div style="font-size:34px;font-weight:850;color:{c}">{pct}</div></div>')
good = lambda name, q, c, w, verdict: (f'<div class="card" style="padding:26px 30px;margin-bottom:22px">'
                                       f'<div style="font-size:34px;font-weight:800;margin-bottom:10px">{name}</div>'
                                       + bar("Price", "+10%", "#2F5D8C", 160) + bar("Quantity bought", q, c, w)
                                       + f'<div style="font-size:28px;font-weight:750;color:{c};margin-top:8px">{verdict}</div></div>')
chip = lambda t, s: (f'<div class="soft" style="padding:16px 22px;flex:1"><div style="font-size:30px;font-weight:850">{t}</div>'
                     f'<div style="font-size:24px;font-weight:600;margin-top:4px" class="muted">{s}</div></div>')
body = ('<div class="cap" style="margin-bottom:14px">Same 10% price rise, very different responses (hypothetical)</div>'
        + good("Table salt", "-2%", "#B0412E", 32, "Barely responsive: inelastic")
        + good("One brand of soft drink", "-25%", "#B0412E", 400, "Highly responsive: elastic")
        + '<div class="row" style="gap:14px">' + chip("PED", "price → quantity demanded") + chip("YED", "income → quantity demanded")
        + chip("PES", "price → quantity supplied") + '</div>')
page("S04_Responsiveness", 1000, 900, body)


# ================================================================ S05 PED calculation
step = lambda k, txt, val, c="#0E1E3A": (f'<div class="row" style="gap:18px;margin:12px 0">{num(k, "#B08A47", 50)}'
                                        f'<div style="flex:1;font-size:30px;font-weight:650">{txt}</div>'
                                        f'<div class="serif" style="font-size:40px;font-weight:700;color:{c};white-space:nowrap">{val}</div></div>')
body = ('<div class="col" style="gap:22px">'
        '<div class="navy" style="padding:26px 34px"><div class="cap" style="color:var(--gl)">Formula</div>'
        '<div class="serif" style="font-size:42px;font-weight:700;margin-top:8px">PED = % change in Qd ÷ % change in P</div></div>'
        '<div class="card" style="padding:16px 30px">'
        + step(1, "Price ₹50 to ₹45", "-10%", "#B0412E") + step(2, "Quantity 100 to 120", "+20%", "#2E7D5B")
        + step(3, "Divide", "+20 ÷ -10 = -2")
        + '</div>'
        '<div class="row" style="gap:20px">'
        '<div class="soft" style="flex:1;padding:20px 26px"><div class="cap">The sign (-)</div><div style="font-size:28px;font-weight:650;margin-top:6px">Price and quantity move in opposite directions, as the law of demand predicts.</div></div>'
        '<div class="soft" style="flex:1;padding:20px 26px"><div class="cap">The size |PED| = 2</div><div style="font-size:28px;font-weight:650;margin-top:6px">Greater than 1, so demand is price elastic. Classification uses the absolute value.</div></div>'
        '</div></div>')
page("S05_PED_Calculation", 1000, 700, body)


# ================================================================ S07 determinants of PED
dets = [("Substitutes", "close substitutes exist", "One brand of tea, not tea in general"),
        ("Necessity", "the good is discretionary", "Restaurant meals, not cooking gas"),
        ("Budget share", "it takes a large share of income", "A two-wheeler, not a box of matches"),
        ("Time", "buyers have longer to adjust", "Petrol over several years, not this week"),
        ("Market definition", "the market is narrowly defined", "One rice brand, not food as a whole")]
body = ('<div class="row" style="gap:18px;align-items:stretch;height:500px">'
        + "".join(f'<div class="card col" style="flex:1 1 0;min-width:0;padding:26px 24px;border-top:14px solid {c}">'
                  f'<div class="serif" style="font-size:35px;font-weight:700;min-height:86px;line-height:1.2">{t}</div>'
                  f'<div class="cap" style="margin-top:10px;font-size:22px">More elastic when</div>'
                  f'<div style="font-size:29px;font-weight:700;margin-top:6px;line-height:1.25">{w}</div>'
                  f'<div style="flex:1"></div><div style="height:3px;background:var(--edge);margin:14px 0"></div>'
                  f'<div class="cap" style="font-size:22px;color:var(--muted)">For example</div>'
                  f'<div style="font-size:27px;font-weight:600;margin-top:6px;line-height:1.25" class="muted">{e}</div></div>'
                  for (t, w, e), c in zip(dets, ["#0E1E3A", "#1B3460", "#2F5D8C", "#8A6A2E", "#B08A47"]))
        + '</div><div style="font-size:28px;font-weight:700;color:var(--goldt);margin-top:20px">These are tendencies, not rules: the same good can be more elastic for some households, places and periods than for others.</div>')
page("S07_PED_Determinants", 1600, 600, body)


# ================================================================ S09 YED calculation
body = ('<div class="row" style="gap:30px;align-items:stretch;height:560px">'
        '<div class="col" style="flex:1.15;gap:20px">'
        '<div class="navy" style="padding:26px 34px"><div class="cap" style="color:var(--gl)">Formula</div>'
        '<div class="serif" style="font-size:42px;font-weight:700;margin-top:8px">YED = % change in Qd ÷ % change in income</div></div>'
        '<div class="card" style="padding:16px 30px">'
        + step(1, "Average household income ₹50,000 to ₹55,000 a month", "+10%", "#2E7D5B")
        + step(2, "Air tickets bought in the town 2,000 to 2,300 a month", "+15%", "#2E7D5B")
        + step(3, "Divide", "+15 ÷ +10 = 1.5")
        + '</div><div class="tag">Hypothetical town; prices held constant</div></div>'
        '<div class="col" style="flex:0.85;gap:20px">'
        '<div class="soft" style="padding:26px 30px;flex:1"><div class="cap">Positive sign</div><div style="font-size:31px;font-weight:700;margin-top:8px">Demand rises with income: a normal good.</div></div>'
        '<div class="soft" style="padding:26px 30px;flex:1"><div class="cap">Size above 1</div><div style="font-size:31px;font-weight:700;margin-top:8px">Demand rises proportionately more than income: income elastic.</div></div>'
        '<div class="card" style="padding:22px 30px;border-left:12px solid #B0412E"><div style="font-size:28px;font-weight:700">YED measures response to <b>income</b>, not to price.</div></div>'
        '</div></div>')
page("S09_YED_Calculation", 1600, 590, body)


# ================================================================ S10 interpreting YED: number line
zone = lambda w, c, t1, t2, ex, rng: (f'<div class="col" style="width:{w}px"><div style="font-size:30px;font-weight:800;margin-bottom:8px">{rng}</div><div style="height:24px;background:{c};border-radius:12px"></div>'
                                 f'<div style="font-size:34px;font-weight:850;color:{c};margin-top:20px">{t1}</div>'
                                 f'<div style="font-size:28px;font-weight:700;margin-top:4px">{t2}</div>'
                                 f'<div class="card" style="padding:18px 22px;margin-top:16px;font-size:27px;font-weight:600;line-height:1.3">{ex}</div></div>')
body = ('<div class="row" style="gap:20px;align-items:flex-start">'
        + zone(460, "#B0412E", "Inferior good", "Demand falls as income rises",
               "Bus trips for a household that switches to its own two-wheeler as income rises", "YED below 0")
        + zone(520, "#2F5D8C", "Normal, income inelastic", "Often called a necessity",
               "Staple cereals for many households: demand rises, but by less than income", "YED from 0 to 1")
        + zone(520, "#2E7D5B", "Normal, income elastic", "Often called a luxury",
               "Air travel or dining out: demand rises by more than income", "YED above 1")
        + '</div>'
        '<div class="soft row" style="margin-top:22px;padding:18px 28px;gap:18px">'
        '<div style="font-size:30px;font-weight:850;color:#B0412E;white-space:nowrap">Not "cheap"</div>'
        '<div style="font-size:28px;font-weight:650">Inferior describes how demand responds to income. Values differ across goods, households and income levels.</div></div>')
page("S10_YED_Line", 1600, 600, body)


# ================================================================ S11 YED and changing consumption (stacked budget bars)
# income 100 -> 120 (+20%); staples YED 0.25: 40 -> 42; others 60 -> 78 (+30%, YED 1.5)
assert abs((42 / 40 - 1) / 0.2 - 0.25) < 1e-9 and abs((78 / 60 - 1) / 0.2 - 1.5) < 1e-9 and 42 + 78 == 120
def stack(label, staples, other, total, h):
    sh = staples / total * 100
    return (f'<div class="col" style="align-items:center;width:240px"><div style="font-size:30px;font-weight:800;margin-bottom:10px">{label}</div>'
            f'<div style="width:200px;height:{h}px;display:flex;flex-direction:column;border-radius:14px;overflow:hidden">'
            f'<div style="flex:{other};background:#2E7D5B;color:#fff;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:800">{100-sh:.0f}%</div>'
            f'<div style="flex:{staples};background:#2F5D8C;color:#fff;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:800">{sh:.0f}%</div></div>'
            f'<div style="font-size:26px;font-weight:650;margin-top:10px" class="muted">Budget {total}</div></div>')
body = ('<div class="row" style="gap:40px;align-items:stretch;height:620px">'
        '<div class="card col" style="width:640px;padding:30px 34px">'
        '<div class="cap">Household income rises 20%</div>'
        '<div style="margin-top:22px">'
        '<div style="font-size:30px;font-weight:800">Staple foods (YED 0.25)</div>'
        '<div class="row" style="gap:16px;margin:10px 0 26px"><div style="height:56px;width:60px;background:#2F5D8C;border-radius:10px"></div><div class="serif" style="font-size:40px;font-weight:700;color:#2F5D8C">+5%</div></div>'
        '<div style="font-size:30px;font-weight:800">Other goods and services (YED 1.5)</div>'
        '<div class="row" style="gap:16px;margin:10px 0 0"><div style="height:56px;width:360px;background:#2E7D5B;border-radius:10px"></div><div class="serif" style="font-size:40px;font-weight:700;color:#2E7D5B">+30%</div></div>'
        '</div><div style="font-size:28px;font-weight:650;margin-top:26px;line-height:1.3" class="muted">Spending on staples still rises, but more slowly than income.</div>'
        '<div style="flex:1"></div><div class="tag">All values hypothetical; prices held constant</div></div>'
        '<div class="col" style="flex:1"><div class="cap">Share of the household budget</div>'
        '<div class="row" style="gap:20px;margin-top:16px;align-items:flex-end">'
        + stack("Before", 40, 60, 100, 290) + arrow(70) + stack("After", 42, 78, 120, 348)
        + '<div class="col" style="gap:14px;margin-left:10px;margin-bottom:60px">'
        '<div class="row" style="gap:10px"><div style="width:26px;height:26px;background:#2E7D5B;border-radius:6px"></div><span style="font-size:26px;font-weight:700">Other goods</span></div>'
        '<div class="row" style="gap:10px"><div style="width:26px;height:26px;background:#2F5D8C;border-radius:6px"></div><span style="font-size:26px;font-weight:700">Staples</span></div></div>'
        '</div><div style="font-size:28px;font-weight:700;margin-top:18px;line-height:1.3">Goods with YED below 1 take a smaller share of a growing budget. '
        'This changes the composition of demand: what farms, factories and services are asked to produce.</div></div></div>')
page("S11_YED_India", 1600, 660, body)


# ================================================================ S12 PES calculation
body = ('<div class="col" style="gap:22px">'
        '<div class="navy" style="padding:26px 34px"><div class="cap" style="color:var(--gl)">Formula</div>'
        '<div class="serif" style="font-size:42px;font-weight:700;margin-top:8px">PES = % change in Qs ÷ % change in P</div></div>'
        '<div class="card" style="padding:16px 30px">'
        + step(1, "Milk price ₹50 to ₹55 a litre", "+10%", "#2E7D5B") + step(2, "Milk supplied 10,000 to 10,500 litres a day", "+5%", "#2E7D5B")
        + step(3, "Divide", "+5 ÷ +10 = 0.5")
        + '</div>'
        '<div class="row" style="gap:20px">'
        '<div class="soft" style="flex:1;padding:20px 26px"><div class="cap">Below 1</div><div style="font-size:28px;font-weight:650;margin-top:6px">Supply is price inelastic in this example.</div></div>'
        '<div class="soft" style="flex:1.4;padding:20px 26px"><div class="cap">Ability, not just willingness</div><div style="font-size:28px;font-weight:650;margin-top:6px">Farmers would sell more, but herds and fodder take time to expand.</div></div>'
        '</div></div>')
page("S12_PES_Calculation", 1000, 700, body)


# ================================================================ S15 elasticity diagnostic matrix
rows = [("PED", "The good's own price", "Quantity demanded", "Usually negative; |PED| above 1 is elastic", "Reading a steep curve as always inelastic"),
        ("YED", "Income", "Quantity demanded", "Sign: normal (+) or inferior (-); size: necessity or luxury", "Calling every cheap good inferior"),
        ("PES", "The good's own price", "Quantity supplied", "Usually positive; above 1 is elastic", "Assuming farms can raise output at once"),
        ("XED", "Price of another good", "Quantity demanded", "+ substitutes, - complements, near 0 unrelated", "Confusing XED with the good's own PED")]
head = ["Measure", "What changes", "What responds", "Reading the coefficient", "Common mistake"]
widths = [150, 260, 250, 500, 420]
body = ('<div class="card" style="overflow:hidden">'
        '<div class="row" style="background:#0E1E3A;color:#fff;height:70px;font-size:24px;font-weight:800;letter-spacing:.06em">'
        + "".join(f'<div style="width:{w}px;padding:0 22px">{h.upper()}</div>' for h, w in zip(head, widths)) + '</div>'
        + "".join('<div class="row" style="min-height:118px;border-top:3px solid #E2D6BC;' + ('background:#FCFAF4;' if i % 2 else '') + '">'
                  + "".join(f'<div style="width:{w}px;padding:14px 22px;font-size:{36 if j == 0 else 28}px;font-weight:{850 if j == 0 else (650 if j < 4 else 650)};'
                            f'color:{"#8A6A2E" if j == 0 else ("#B0412E" if j == 4 else "#0E1E3A")};line-height:1.25">{c}</div>'
                            for j, (c, w) in enumerate(zip(r, widths))) + '</div>' for i, r in enumerate(rows))
        + '</div>')
page("S15_Elasticity_Diagnostic", 1600, 570, body)


# ================================================================ S16 why governments intervene
grp = lambda cap, title, items, c, fill: (f'<div class="card" style="padding:24px 30px;border-left:14px solid {c};background:{fill}">'
                                          f'<div class="cap" style="color:{c}">{cap}</div><div class="serif" style="font-size:36px;font-weight:700;margin:6px 0 10px">{title}</div>'
                                          + "".join(f'<div style="font-size:28px;font-weight:600;margin:6px 0">{t}</div>' for t in items) + '</div>')
body = ('<div class="col" style="gap:20px">'
        + grp("Efficiency", "When markets fail", ["Externalities, public goods, market power, information gaps"], "#2F5D8C", "#F5F8FB")
        + grp("Equity and social goals", "Even when markets work", ["Reduce poverty and inequality", "Ensure access to food, health and education"], "#2E7D5B", "#F4FAF6")
        + grp("Rules of the game", "Every market needs them", ["Property rights, contracts, standards, enforcement"], "#8A6A2E", "#FBF5E8")
        + '<div style="font-size:28px;font-weight:750;color:#B0412E">Not every intervention is a response to market failure.</div></div>')
page("S16_Why_Intervene", 1000, 880, body)


# ================================================================ S17 diagnose first: decision tree
leaf = lambda prob, tool, c: (f'<div class="card row" style="height:88px;padding:0 22px;gap:16px;border-left:12px solid {c}">'
                              f'<div style="width:300px;font-size:28px;font-weight:800">{prob}</div>{arrow(50, c)}'
                              f'<div style="flex:1;font-size:27px;font-weight:650">{tool}</div></div>')
branch = lambda chip, c, q: (f'<div class="row" style="gap:14px;width:330px;flex-shrink:0"><span class="chip" style="background:{c};color:#fff;font-size:26px">{chip}</span>'
                             f'<span style="font-size:27px;font-weight:750;line-height:1.25">{q}</span></div>')
body = ('<div class="row" style="gap:22px;align-items:center">'
        '<div class="col" style="width:330px;gap:16px;flex-shrink:0">'
        '<div class="navy" style="padding:26px 28px;font-size:33px;font-weight:800;line-height:1.25">What is the underlying problem?</div>'
        '<div class="soft" style="padding:20px 24px;font-size:28px;font-weight:750;line-height:1.25">Is the market outcome inefficient?</div></div>'
        '<div class="col" style="flex:1;gap:16px">'
        '<div class="row" style="gap:18px;align-items:center">' + branch("Yes", "#2F5D8C", "Which market failure?") + arrow(56)
        + '<div class="col" style="flex:1;gap:12px">'
        + leaf("Negative externality", "Corrective tax, regulation, tradable permits", "#B0412E")
        + leaf("Positive externality", "Subsidy or public support", "#2E7D5B")
        + leaf("Market power", "Competition enforcement or regulation", "#2F5D8C")
        + leaf("Public good", "Collective financing or provision", "#8A6A2E")
        + '</div></div>'
        '<div style="height:3px;background:#E2D6BC;margin:4px 0"></div>'
        '<div class="row" style="gap:18px;align-items:center">' + branch("Also", "#2E7D5B", "Is access or fairness a concern?") + arrow(56)
        + '<div class="col" style="flex:1">' + leaf("Affordability or access", "Targeted transfers, well-designed support", "#5B6577") + '</div></div>'
        '</div></div><div style="font-size:28px;font-weight:750;color:var(--goldt);margin-top:20px">Each is a possible response, not a universal answer: the instrument must fit the problem.</div>')
page("S17_Decision_Tree", 1600, 660, body)


# ================================================================ S22 who gains, who loses under a binding ceiling
cons = [("Non-price rationing", "Queues, first come first served, or allocation by connections"),
        ("Weaker supply incentives", "Some sellers produce less or cut quality"),
        ("Informal markets", "Resale above the ceiling where enforcement is weak"),
        ("Uneven access", "A low legal price helps only those who actually obtain the good")]
body = ('<div class="row" style="gap:22px;align-items:stretch;height:430px">'
        '<div class="navy col" style="width:330px;padding:30px;justify-content:center"><div class="cap" style="color:var(--gl)">Binding ceiling</div>'
        '<div class="serif" style="font-size:38px;font-weight:700;margin-top:10px;line-height:1.2">Price held below equilibrium</div>'
        f'<div style="margin-top:20px">{darrow(60, "#E2C98F")}</div><div style="font-size:32px;font-weight:800;color:#E2C98F;margin-top:6px">Excess demand</div></div>'
        + '<div style="align-self:center">' + arrow(60) + '</div><div style="flex:1;display:grid;grid-template-columns:1fr 1fr;gap:18px">'
        + "".join(f'<div class="card" style="padding:22px 26px"><div style="font-size:31px;font-weight:850;color:#B0412E">{t}</div>'
                  f'<div style="font-size:27px;font-weight:600;margin-top:8px;line-height:1.3">{s}</div></div>' for t, s in cons)
        + '</div></div>'
        '<div class="row" style="gap:20px;margin-top:22px">'
        '<div class="soft" style="flex:1;padding:20px 26px"><div class="cap" style="color:#2E7D5B">Gain</div><div style="font-size:28px;font-weight:700;margin-top:6px">Buyers who obtain the good pay less</div></div>'
        '<div class="soft" style="flex:1;padding:20px 26px"><div class="cap" style="color:#B0412E">Lose</div><div style="font-size:28px;font-weight:700;margin-top:6px">Buyers who miss out; sellers</div></div>'
        '<div class="soft" style="flex:1.6;padding:20px 26px"><div class="cap">Alternatives to compare</div><div style="font-size:28px;font-weight:700;margin-top:6px">Targeted support, rationing with clear eligibility, measures that expand supply</div></div>'
        '</div>')
page("S22_Ceiling_Effects", 1600, 640, body)


# ================================================================ S26 regulation, standards and enforcement
pairs = [("Unsafe products", "Safety and quality standards", "Food safety and product standards"),
         ("Pollution", "Environmental regulation", "Emission and effluent limits"),
         ("Unqualified providers", "Licensing and compliance", "Registration of doctors and pharmacies"),
         ("Hidden information", "Disclosure and reporting", "Labels, published accounts")]
body = ('<div class="row" style="gap:20px;align-items:stretch;height:450px">'
        + "".join(f'<div class="card col" style="flex:1;padding:26px 26px"><div class="cap" style="color:#B0412E">Problem</div>'
                  f'<div style="font-size:32px;font-weight:800;margin-top:6px">{p}</div><div style="margin:12px 0">{darrow(54)}</div>'
                  f'<div class="cap">Tool</div><div class="serif" style="font-size:34px;font-weight:700;margin-top:6px;line-height:1.2">{t}</div>'
                  f'<div style="flex:1"></div><div style="font-size:26px;font-weight:600;margin-top:12px" class="muted">{e}</div></div>' for p, t, e in pairs)
        + '</div><div class="navy row" style="margin-top:22px;padding:24px 32px;gap:22px">'
        '<div class="cap" style="color:var(--gl);white-space:nowrap">Monitoring and enforcement</div>'
        '<div style="font-size:30px;font-weight:700">Rules change behaviour only when they are monitored and breaches carry penalties.</div></div>')
page("S26_Regulation", 1600, 620, body)


# ================================================================ S27 financing versus delivery
cell = lambda title, ex, c: (f'<div class="card" style="padding:24px 28px;border-top:12px solid {c}"><div style="font-size:30px;font-weight:850">{title}</div>'
                             f'<div style="font-size:27px;font-weight:600;margin-top:10px;line-height:1.3" class="muted">{ex}</div></div>')
body = ('<div style="display:grid;grid-template-columns:270px 1fr 1fr;gap:18px;align-items:stretch">'
        '<div></div><div class="cap" style="text-align:center;font-size:24px">Delivered by government</div><div class="cap" style="text-align:center;font-size:24px">Delivered by private providers</div>'
        '<div class="navy" style="display:flex;align-items:center;justify-content:center;padding:20px;font-size:30px;font-weight:800;text-align:center">Publicly financed</div>'
        + cell("Public provision", "Government school; government hospital", "#0E1E3A")
        + cell("Public finance, private delivery", "Publicly funded insurance at empanelled private hospitals; reimbursed seats in private schools", "#B08A47")
        + '<div class="navy" style="display:flex;align-items:center;justify-content:center;padding:20px;font-size:30px;font-weight:800;text-align:center;background:#5B6577">Privately financed</div>'
        + cell("User charges at public facilities", "Fees for some services at a public hospital", "#2F5D8C")
        + cell("Private market", "Private school fees; paying a private clinic", "#5B6577")
        + '</div><div style="font-size:28px;font-weight:750;color:var(--goldt);margin-top:20px">Public support does not make a service a pure public good: school seats and hospital beds are rival and excludable.</div>')
page("S27_Finance_Delivery", 1600, 600, body)


# ================================================================ S28 targeted transfers versus general subsidies
side = lambda title, items, c: (f'<div class="card" style="flex:1;padding:24px 28px;border-top:12px solid {c}"><div class="serif" style="font-size:34px;font-weight:700">{title}</div>'
                                + "".join(f'<div class="row" style="gap:12px;margin-top:12px;align-items:flex-start"><span style="font-size:28px;font-weight:850;color:{cc}">{sym}</span>'
                                          f'<span style="font-size:27px;font-weight:600;line-height:1.3">{t}</span></div>' for sym, cc, t in items) + '</div>')
mat = lambda t, s, c, fill: (f'<div style="background:{fill};border-radius:16px;padding:16px 18px;display:flex;flex-direction:column;justify-content:center">'
                             f'<div style="font-size:27px;font-weight:850;color:{c}">{t}</div><div style="font-size:25px;font-weight:600;margin-top:4px" class="muted">{s}</div></div>')
body = ('<div class="row" style="gap:22px;align-items:stretch;height:410px">'
        + side("General price subsidy", [("+", "#2E7D5B", "Simple to run; reaches all buyers"), ("-", "#B0412E", "Richer, heavier users gain most"),
                                         ("-", "#B0412E", "Can encourage overuse; high fiscal cost")], "#2F5D8C")
        + side("Targeted transfer", [("+", "#2E7D5B", "Support goes to eligible households"), ("+", "#2E7D5B", "Lower cost per person helped"),
                                     ("-", "#B0412E", "Needs identification and delivery systems")], "#2E7D5B")
        + '<div class="card col" style="width:540px;padding:22px 24px"><div class="cap">Two targeting errors</div>'
        '<div style="display:grid;grid-template-columns:120px 1fr 1fr;gap:10px;margin-top:12px;flex:1">'
        '<div></div><div style="font-size:24px;font-weight:800;text-align:center" class="muted">Receives</div><div style="font-size:24px;font-weight:800;text-align:center" class="muted">Does not</div>'
        '<div style="font-size:24px;font-weight:800;display:flex;align-items:center" class="muted">Eligible</div>'
        + mat("Correct", "intended", "#2E7D5B", "#F4FAF6") + mat("Exclusion error", "left out", "#B0412E", "#FBEDEA")
        + '<div style="font-size:24px;font-weight:800;display:flex;align-items:center" class="muted">Not eligible</div>'
        + mat("Inclusion error", "leakage", "#B0412E", "#FBEDEA") + mat("Correct", "not covered", "#2E7D5B", "#F4FAF6")
        + '</div></div></div>'
        '<div style="font-size:28px;font-weight:750;color:var(--goldt);margin-top:18px">These trade-offs reappear in Indian debates on food, fuel and fertiliser support.</div>')
page("S28_Targeting", 1600, 500, body)


# ================================================================ S29 information policies and behavioural measures
cards = [("Disclosure and labelling", "Nutrition facts on packaged food; energy-efficiency star labels on appliances"),
         ("Transparency", "Published prices and quality ratings that let buyers compare"),
         ("Public communication", "Health campaigns on vaccination, hygiene or road safety"),
         ("Choice design", "Simple forms, reminders and sensible default options")]
body = ('<div class="row" style="gap:20px;align-items:stretch;height:400px">'
        + "".join(f'<div class="card col" style="flex:1;padding:28px 26px">{num(i+1, "#B08A47", 54)}'
                  f'<div class="serif" style="font-size:34px;font-weight:700;margin-top:18px;line-height:1.2">{t}</div>'
                  f'<div style="font-size:27px;font-weight:600;margin-top:12px;line-height:1.32" class="muted">{s}</div></div>' for i, (t, s) in enumerate(cards))
        + '</div><div class="row" style="gap:20px;margin-top:22px">'
        '<div class="soft" style="flex:1;padding:20px 26px"><div class="cap" style="color:#2E7D5B">Works best when</div><div style="font-size:28px;font-weight:700;margin-top:6px">the problem is missing or hard-to-use information</div></div>'
        '<div class="soft" style="flex:1;padding:20px 26px"><div class="cap" style="color:#B0412E">Less useful when</div><div style="font-size:28px;font-weight:700;margin-top:6px">price or physical access is the real barrier</div></div></div>')
page("S29_Information_Policy", 1600, 560, body)


# ================================================================ S30 government failure
stages = ["Objective", "Design", "Targeting", "Delivery", "Outcome"]
fails = [("Information limits", "Planners may misjudge costs, needs or responses"),
         ("Poor targeting", "Benefits miss the intended group or leak"),
         ("Weak implementation", "Rules not enforced; delays and corruption"),
         ("Unintended distortions", "New shortages, surpluses or overuse"),
         ("Capture", "Organised interests shape policy for their own gain"),
         ("Fiscal and opportunity cost", "Money spent here cannot fund other priorities")]
body = ('<div class="row" style="gap:0;height:84px;border-radius:42px;overflow:hidden;margin-bottom:24px">'
        + "".join(f'<div style="flex:1;height:100%;background:{c};color:#fff;display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:800">{s}</div>'
                  for s, c in zip(stages, ["#0E1E3A", "#1B3460", "#2F5D8C", "#8A6A2E", "#B08A47"]))
        + '</div><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px">'
        + "".join(f'<div class="card" style="padding:22px 26px;border-left:12px solid #B0412E"><div style="font-size:30px;font-weight:850">{t}</div>'
                  f'<div style="font-size:27px;font-weight:600;margin-top:6px;line-height:1.3" class="muted">{s}</div></div>' for t, s in fails)
        + '</div><div style="font-size:28px;font-weight:750;color:var(--goldt);margin-top:22px">Government failure does not prove that markets do better: compare realistic alternatives, not ideal ones.</div>')
page("S30_Government_Failure", 1600, 600, body)


# ================================================================ S31 Mains framework with a hypothetical illustration
steps = [("Problem and objective", "Patients cannot afford an essential medicine"),
         ("Mechanism", "A binding ceiling creates excess demand"),
         ("Who gains, who pays", "Buyers who get it gain; producers and unserved buyers lose"),
         ("Efficiency, equity, fiscal", "Lower supply; fairer prices for some; little budget cost"),
         ("Implementation", "Shortages, quality cuts, informal sales"),
         ("Balanced judgement", "Pair with supply support or targeted aid; review regularly")]
body = ('<div class="row" style="gap:12px;align-items:stretch;height:390px">'
        + "".join(f'<div class="col" style="flex:1">'
                  f'<div class="navy col" style="padding:20px 20px;height:170px;justify-content:space-between;background:{c}">{num(i+1, "#B08A47", 50)}'
                  f'<div style="font-size:27px;font-weight:800;line-height:1.2">{t}</div></div>'
                  f'<div class="card" style="flex:1;margin-top:12px;padding:20px 20px;font-size:26px;font-weight:600;line-height:1.3">{s}</div></div>'
                  for i, ((t, s), c) in enumerate(zip(steps, ["#0E1E3A", "#14264A", "#1B3460", "#24406F", "#2F5D8C", "#7A5A24"])))
        + '</div><div class="row" style="margin-top:20px;justify-content:space-between">'
        '<div style="font-size:28px;font-weight:750">Case: a state caps the price of a medicine below its market price.</div>'
        '<div class="tag">Hypothetical illustration</div></div>')
page("S31_Mains_Framework", 1600, 540, body)


# ================================================================ S32 market failure map
branches = [("Externalities", "Costs or benefits fall on others", "#B0412E"), ("Public goods", "Free riding weakens private funding", "#8A6A2E"),
            ("Common-pool resources", "Shared resources are overused", "#2E7D5B"), ("Market power", "Few sellers can raise prices", "#2F5D8C"),
            ("Information asymmetry", "One side knows more", "#5B6577")]
body = ('<div class="navy" style="padding:26px 30px;margin-bottom:18px"><div class="cap" style="color:var(--gl)">Market failure</div>'
        '<div style="font-size:30px;font-weight:700;margin-top:8px;line-height:1.3">The market outcome does not allocate resources efficiently</div></div>'
        + "".join(f'<div class="card row" style="padding:14px 22px;margin-bottom:12px;gap:16px;border-left:12px solid {c}">'
                  f'<div style="width:330px;font-size:29px;font-weight:850">{t}</div><div style="flex:1;font-size:25px;font-weight:600" class="muted">{s}</div></div>' for t, s, c in branches)
        + '<div class="soft" style="padding:18px 24px;margin-top:6px;font-size:26px;font-weight:700">Equity concerns can justify action even without a market failure.</div>')
page("S32_Market_Failure_Map", 1000, 860, body)


# ================================================================ S33 private and social costs and benefits
assert 70 + 30 == 100 and 300 + 200 == 500
def sbar(parts, total, unit):
    seg = "".join(f'<div style="flex:{v};background:{c};color:#fff;display:flex;align-items:center;justify-content:center;font-size:27px;font-weight:800;padding:0 10px;text-align:center">{t} ₹{v}</div>' for t, v, c in parts)
    return (f'<div class="row" style="height:100px;flex-shrink:0;border-radius:14px;overflow:hidden;align-items:stretch">{seg}</div>'
            f'<div class="row" style="justify-content:space-between;margin-top:10px"><span class="muted" style="font-size:24px;font-weight:650">{unit}</span>'
            f'<span class="serif" style="font-size:34px;font-weight:700">{total}</span></div>')
body = ('<div class="row" style="gap:34px;align-items:stretch;height:430px">'
        '<div class="card col" style="flex:1;padding:28px 32px"><div class="cap" style="color:#B0412E">External cost</div>'
        '<div class="serif" style="font-size:36px;font-weight:700;margin:6px 0 20px">A factory that pollutes</div>'
        + sbar([("Private cost", 70, "#1B3460"), ("External cost", 30, "#B0412E")], "Social cost ₹100", "per unit of output")
        + '<div style="font-size:28px;font-weight:650;margin-top:22px;line-height:1.3">The firm pays for inputs, not for the health costs its smoke imposes on residents.</div></div>'
        '<div class="card col" style="flex:1;padding:28px 32px"><div class="cap" style="color:#2E7D5B">External benefit</div>'
        '<div class="serif" style="font-size:36px;font-weight:700;margin:6px 0 20px">A person who gets vaccinated</div>'
        + sbar([("Private benefit", 300, "#1B3460"), ("External benefit", 200, "#2E7D5B")], "Social benefit ₹500", "per dose")
        + '<div style="font-size:28px;font-weight:650;margin-top:22px;line-height:1.3">The person weighs their own protection, not the lower risk for people around them.</div></div>'
        '</div><div class="row" style="justify-content:space-between;margin-top:20px">'
        '<div style="font-size:30px;font-weight:800;color:var(--goldt)">Decision-makers weigh only the private part, so private and social optimum diverge.</div>'
        '<div class="tag">Hypothetical values</div></div>')
page("S33_Private_Social", 1600, 600, body)


# ================================================================ S37 public goods matrix
q = lambda t, ex, c, fill, sub: (f'<div style="background:{fill};border-radius:22px;padding:26px 30px;border:4px solid {c}">'
                                 f'<div class="serif" style="font-size:38px;font-weight:700;color:{c}">{t}</div>'
                                 f'<div class="cap" style="margin-top:4px;color:var(--muted);font-size:20px">{sub}</div>'
                                 f'<div style="font-size:28px;font-weight:650;margin-top:12px;line-height:1.3">{ex}</div></div>')
body = ('<div style="display:grid;grid-template-columns:200px 1fr 1fr;grid-template-rows:56px 1fr 1fr;gap:16px;height:600px">'
        '<div></div><div class="cap" style="text-align:center;font-size:24px;align-self:center">Excludable</div><div class="cap" style="text-align:center;font-size:24px;align-self:center">Non-excludable</div>'
        '<div class="navy" style="display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:800">Rival</div>'
        + q("Private goods", "Rice, a mobile phone", "#1B3460", "#F5F8FB", "rival and excludable")
        + q("Common-pool resources", "Groundwater, fish stocks, common grazing land", "#2E7D5B", "#F4FAF6", "rival, hard to exclude")
        + '<div class="navy" style="display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:800">Non-rival</div>'
        + q("Club goods", "An uncongested toll road, a streaming service", "#5B6577", "#F7F7F8", "excludable, non-rival up to capacity")
        + q("Public goods", "National defence, street lighting, flood warnings", "#8A6A2E", "#FBF5E8", "non-rival and non-excludable")
        + '</div><div style="font-size:27px;font-weight:700;color:var(--goldt);margin-top:16px">Congestion and technology can move a good between boxes. Government provision does not make a good public.</div>')
page("S37_Goods_Matrix", 1600, 680, body)


# ================================================================ S38 free-rider problem
v, c_, g = 500000, 200000, 60000
assert 200 * 2500 == v
def hbar(label, val, color, maxv=500000, txt=None):
    w = max(14, int(val / maxv * 520))
    return (f'<div class="row" style="gap:18px;margin:14px 0"><div style="width:300px;font-size:29px;font-weight:750;flex-shrink:0">{label}</div>'
            f'<div style="height:66px;width:{w}px;background:{color};border-radius:12px"></div>'
            f'<div class="serif" style="font-size:38px;font-weight:700;color:{color}">{txt}</div></div>')
body = ('<div class="row" style="gap:30px;align-items:stretch">'
        '<div class="card" style="flex:1;padding:26px 34px"><div class="cap">200 households, one set of street lights (hypothetical)</div>'
        + hbar("Total value to residents", v, "#2E7D5B", txt="₹5 lakh") + hbar("Cost of the lights", c_, "#1B3460", txt="₹2 lakh")
        + hbar("Raised voluntarily", g, "#B0412E", txt="₹0.6 lakh")
        + '<div style="font-size:28px;font-weight:650;margin-top:10px" class="muted">Each household values the lights at ₹2,500.</div></div>'
        '<div class="col" style="width:420px;gap:18px">'
        '<div class="navy" style="padding:26px 28px;font-size:30px;font-weight:700;line-height:1.3">"The lights will reach my street whether or not I pay."</div>'
        '<div class="soft" style="padding:22px 26px;font-size:28px;font-weight:700;line-height:1.3">Worth providing, yet not funded: the case for collective financing such as local taxes.</div>'
        '</div></div>')
page("S38_Free_Rider", 1600, 520, body)


# ================================================================ S39 commons: groundwater
aq = ['<svg width="900" height="520" viewBox="0 0 900 520">',
      '<rect x="0" y="120" width="900" height="400" fill="#E9DFC9"/>',
      '<rect x="0" y="300" width="900" height="220" fill="#BBD3E6"/>',
      '<line x1="0" y1="300" x2="900" y2="300" stroke="#2F5D8C" stroke-width="4" stroke-dasharray="14 10"/>',
      '<path d="M0,380 Q620,470 900,410 L900,520 L0,520 Z" fill="#7FA9CC"/>',
      '<path d="M0,380 Q620,470 900,410" fill="none" stroke="#1B3460" stroke-width="5"/>',
      '<rect x="0" y="100" width="900" height="24" fill="#8C9A5B"/>',
      '<text x="18" y="284" font-size="24" font-weight="800" fill="#2F5D8C" font-family="Inter">Water table before</text>',
      '<text x="18" y="350" font-size="24" font-weight="800" fill="#1B3460" font-family="Inter">After heavy pumping</text>',
      '<path d="M288,308 L288,372" stroke="#1B3460" stroke-width="4"/>',
      '<path d="M278,360 L288,378 L298,360" fill="#1B3460"/>']
for i, x in enumerate([340, 465, 590, 715, 840]):
    aq.append(f'<rect x="{x-16}" y="56" width="32" height="48" rx="4" fill="#0E1E3A"/>')
    aq.append(f'<line x1="{x}" y1="104" x2="{x}" y2="440" stroke="#0E1E3A" stroke-width="7"/>')
    aq.append(f'<path d="M{x-14},440 L{x},462 L{x+14},440" fill="#0E1E3A"/>')
    aq.append(f'<text x="{x}" y="40" font-size="24" font-weight="800" fill="#0E1E3A" text-anchor="middle" font-family="Inter">Farm {i+1}</text>')
aq.append('</svg>')
row = lambda a, b, c: (f'<div class="row" style="border-top:3px solid #E2D6BC;min-height:74px"><div style="width:170px;font-size:24px;font-weight:800" class="muted">{a}</div>'
                       f'<div style="flex:1;font-size:27px;font-weight:700">{b}</div><div style="flex:1;font-size:27px;font-weight:700;color:#2E7D5B">{c}</div></div>')
body = ('<div class="row" style="gap:30px;align-items:stretch">'
        '<div class="col" style="width:900px">' + "".join(aq)
        + '<div style="font-size:28px;font-weight:700;margin-top:14px;line-height:1.3">Each farmer gains the full benefit of pumping more but shares the cost of the falling water table with everyone.</div></div>'
        '<div class="card col" style="flex:1;padding:22px 26px;align-self:flex-start"><div class="row" style="min-height:50px"><div style="width:170px"></div>'
        '<div style="flex:1" class="cap">Public good</div><div style="flex:1;color:#2E7D5B" class="cap">Common-pool</div></div>'
        + row("Rival?", "No", "Yes") + row("Excludable?", "No", "Hard to exclude") + row("Main risk", "Under-provision", "Overuse and depletion")
        + row("Example", "Flood warning", "Shared aquifer") + '</div></div>')
page("S39_Commons", 1600, 640, body)


# ================================================================ S40 managing common-pool resources
tools = [("Clear access rules", "Who may draw water, when and how much"), ("Monitoring", "Metering wells, tracking water levels"),
         ("Community management", "User groups that set and enforce local rules"), ("Limits and charges", "Permits, pumping caps or user charges"),
         ("Public coordination", "Resolving disputes and linking villages that share an aquifer")]
body = ('<div class="row" style="gap:16px;align-items:stretch;height:360px">'
        + "".join(f'<div class="card col" style="flex:1;padding:24px 22px;border-top:12px solid #2E7D5B">{num(i+1, "#2E7D5B", 50)}'
                  f'<div style="font-size:30px;font-weight:850;margin-top:16px;line-height:1.2">{t}</div>'
                  f'<div style="font-size:26px;font-weight:600;margin-top:10px;line-height:1.3" class="muted">{s}</div></div>' for i, (t, s) in enumerate(tools))
        + '</div><div class="soft" style="margin-top:22px;padding:22px 30px;font-size:28px;font-weight:700;line-height:1.35">'
        'Research on the commons, notably by Elinor Ostrom, found that communities can manage shared resources well when rules are clear, monitored and seen as fair. '
        'No single model works everywhere: success depends on the resource and its institutions.</div>')
page("S40_Managing_Commons", 1600, 560, body)


# ================================================================ S41 market power
src = [("Barriers to entry", "Licences, high set-up costs"), ("Essential inputs", "Control of infrastructure others need"),
       ("Network effects", "A platform grows more valuable with users"), ("Economies of scale", "Average cost falls with size"),
       ("Few substitutes", "Buyers have little choice")]
body = ('<div class="row" style="justify-content:space-between;font-size:28px;font-weight:800;margin-bottom:10px">'
        '<span>Many sellers</span><span>Few large sellers (oligopoly)</span><span>One seller (monopoly)</span></div>'
        '<div style="height:30px;border-radius:15px;background:linear-gradient(90deg,#E9E2D2,#B08A47 55%,#0E1E3A);margin-bottom:12px"></div>'
        '<div class="row" style="justify-content:space-between;font-size:24px;font-weight:700;margin-bottom:26px" class="muted"><span>prices close to cost</span><span>more power to set prices</span></div>'
        '<div class="cap" style="margin-bottom:12px">Sources of market power</div>'
        '<div class="row" style="gap:16px;align-items:stretch">'
        + "".join(f'<div class="card" style="flex:1;padding:22px 22px"><div style="font-size:29px;font-weight:850">{t}</div>'
                  f'<div style="font-size:26px;font-weight:600;margin-top:8px" class="muted">{s}</div></div>' for t, s in src)
        + '</div><div style="font-size:28px;font-weight:750;color:var(--goldt);margin-top:22px">Size alone is not misconduct: large firms can be efficient. The concern is power to raise prices, cut quality or exclude rivals.</div>')
page("S41_Market_Power", 1600, 560, body)


# ================================================================ S43 competition policy in India
pillars = [("Anti-competitive agreements", "Agreements that harm competition, including cartels that fix prices, share markets or rig bids", "#B0412E"),
           ("Abuse of dominance", "Being dominant is not illegal. Abusing that position is: for example, unfair prices or shutting out rivals", "#2F5D8C"),
           ("Combinations", "Certain mergers and acquisitions above set thresholds are reviewed before they take effect", "#8A6A2E"),
           ("Competition advocacy", "Promoting awareness of competition and pro-competitive policy", "#2E7D5B")]
body = ('<div class="row" style="gap:20px;margin-bottom:22px">'
        '<div class="navy" style="padding:22px 30px;font-size:32px;font-weight:800">Competition Act, 2002</div>' + arrow(70)
        + '<div class="navy" style="padding:22px 30px;font-size:32px;font-weight:800;background:#7A5A24">Competition Commission of India (CCI)</div></div>'
        '<div class="row" style="gap:16px;align-items:stretch;height:330px">'
        + "".join(f'<div class="card col" style="flex:1;padding:24px 24px;border-top:12px solid {c}"><div class="serif" style="font-size:31px;font-weight:700;line-height:1.2">{t}</div>'
                  f'<div style="font-size:26px;font-weight:600;margin-top:12px;line-height:1.32" class="muted">{s}</div></div>' for t, s, c in pillars)
        + '</div><div class="soft row" style="margin-top:22px;padding:20px 28px;gap:20px"><div class="cap" style="white-space:nowrap">Purpose</div>'
        '<div style="font-size:28px;font-weight:700">Prevent practices that harm competition, promote competition, protect consumer interests and keep markets open to other participants.</div></div>')
page("S43_CCI", 1600, 620, body)


# ================================================================ S44 information asymmetry
sc = lambda t, knows, unsure, eff: (f'<div class="card col" style="flex:1;padding:26px 30px"><div class="serif" style="font-size:36px;font-weight:700">{t}</div>'
                                    f'<div class="row" style="gap:16px;margin-top:20px;align-items:stretch">'
                                    f'<div class="navy" style="flex:1;padding:18px 20px"><div class="cap" style="color:var(--gl)">Knows more</div><div style="font-size:27px;font-weight:700;margin-top:6px">{knows}</div></div>'
                                    f'<div class="soft" style="flex:1;padding:18px 20px"><div class="cap">Knows less</div><div style="font-size:27px;font-weight:700;margin-top:6px">{unsure}</div></div></div>'
                                    f'<div style="font-size:27px;font-weight:600;margin-top:18px;line-height:1.3">{eff}</div></div>')
body = ('<div class="row" style="gap:26px;align-items:stretch;height:350px">'
        + sc("Second-hand two-wheeler", "Seller: accident history, upkeep", "Buyer: sees only the outside",
             "Buyers offer an average price, so owners of good vehicles may not sell.")
        + sc("Vehicle repair or medical advice", "Mechanic or doctor: what is really needed", "Customer: cannot judge the advice",
             "Customers may pay for more work than they need, or distrust honest advice.")
        + '</div><div class="row" style="gap:16px;margin-top:22px">'
        + "".join(f'<div class="chip" style="background:#F6EFDF;color:#0E1E3A;font-size:26px;padding:12px 24px">{t}</div>'
                  for t in ["Poorer choices", "Mispricing", "Loss of trust", "Markets can shrink"])
        + '</div>')
page("S44_Information_Asymmetry", 1600, 540, body)


# ================================================================ S45 adverse selection versus moral hazard
body = ('<div class="row" style="align-items:center;height:70px;margin-bottom:20px">'
        '<div style="flex:1;height:10px;background:#2F5D8C;border-radius:5px"></div>'
        '<div class="navy" style="padding:14px 28px;font-size:28px;font-weight:800;margin:0 14px;white-space:nowrap">Contract signed</div>'
        '<div style="flex:1;height:10px;background:#8A6A2E;border-radius:5px"></div></div>'
        '<div class="row" style="gap:26px;align-items:stretch;height:410px">'
        '<div class="card col" style="flex:1;padding:26px 30px;border-top:14px solid #2F5D8C"><div class="cap" style="color:#2F5D8C">Before: hidden information</div>'
        '<div class="serif" style="font-size:40px;font-weight:700;margin-top:6px">Adverse selection</div>'
        '<div style="font-size:28px;font-weight:600;margin-top:14px;line-height:1.32">People who expect high medical bills are keener to buy insurance. If the insurer cannot tell them apart, premiums rise and low-risk buyers leave.</div>'
        '<div style="flex:1"></div><div style="font-size:26px;font-weight:700;color:#2F5D8C">Responses: screening, medical checks, pooled group cover</div></div>'
        '<div class="card col" style="flex:1;padding:26px 30px;border-top:14px solid #8A6A2E"><div class="cap">After: hidden action</div>'
        '<div class="serif" style="font-size:40px;font-weight:700;margin-top:6px">Moral hazard</div>'
        '<div style="font-size:28px;font-weight:600;margin-top:14px;line-height:1.32">Once insured, an owner may take less care of a vehicle; a borrower whose losses are covered may take bigger risks.</div>'
        '<div style="flex:1"></div><div style="font-size:26px;font-weight:700;color:var(--goldt)">Responses: deductibles, co-payments, monitoring</div></div></div>')
page("S45_AS_vs_MH", 1600, 540, body)


# ================================================================ S46 merit goods, demerit goods and public goods
colm = lambda t, defn, ex, note, c, fill: (f'<div class="col" style="flex:1;background:{fill};border-radius:22px;padding:26px 28px;border:4px solid {c}">'
                                           f'<div class="serif" style="font-size:38px;font-weight:700;color:{c}">{t}</div>'
                                           f'<div class="cap" style="margin-top:14px;font-size:20px">Defined by</div><div style="font-size:28px;font-weight:700;margin-top:6px;line-height:1.3">{defn}</div>'
                                           f'<div class="cap" style="margin-top:14px;font-size:20px">Examples</div><div style="font-size:28px;font-weight:650;margin-top:6px">{ex}</div>'
                                           f'<div style="flex:1"></div><div style="font-size:25px;font-weight:600;margin-top:12px;line-height:1.3" class="muted">{note}</div></div>')
body = ('<div class="row" style="gap:20px;align-items:stretch;height:470px">'
        + colm("Public good", "Its characteristics: non-rival and non-excludable", "Street lighting, flood warnings", "A technical classification", "#8A6A2E", "#FBF5E8")
        + colm("Merit good", "A judgement that it is under-consumed if left to private choice", "Education, preventive healthcare", "Reasons: information gaps, long-term benefits, externalities", "#2E7D5B", "#F4FAF6")
        + colm("Demerit good", "A judgement that it is over-consumed if left to private choice", "Tobacco, alcohol", "Reasons: harm to the user or to others", "#B0412E", "#FBEDEA")
        + '</div><div style="font-size:28px;font-weight:750;color:var(--goldt);margin-top:18px">Education is a merit good, not a pure public good: classroom seats are rival and fees can exclude.</div>')
page("S46_Merit_Goods", 1600, 590, body)


# ================================================================ S47 urban air pollution case
panels = [("1", "Activity", ["Vehicle use", "Industry and power", "Construction dust", "Burning of waste and crop residue"], "Sources vary by city and season"),
          ("2", "Private vs social", ["Drivers and firms pay fuel and production costs", "Health and productivity costs fall on others"], "MSC above MPC: overproduction"),
          ("3", "Possible policy mix", ["Emission and fuel standards", "Pricing: fuel taxes, parking or congestion charges", "Public transport", "Monitoring and public air-quality information"], "Combine tools, not one silver bullet"),
          ("4", "Practical limits", ["Measuring and attributing pollution", "Enforcement capacity", "Coordination across states and agencies", "Burden on poorer households and small firms"], "Unintended effects need watching")]
body = ('<div class="row" style="gap:10px;align-items:stretch;height:530px">')
for i, (n, t, items, note) in enumerate(panels):
    c = ["#0E1E3A", "#B0412E", "#2E7D5B", "#8A6A2E"][i]
    body += (f'<div class="card col" style="flex:1;padding:24px 22px;border-top:14px solid {c}"><div class="row" style="gap:14px">{num(n, c, 50)}'
             f'<div class="serif" style="font-size:32px;font-weight:700">{t}</div></div>'
             + "".join(f'<div style="font-size:26px;font-weight:650;margin-top:14px;line-height:1.28">{x}</div>' for x in items)
             + f'<div style="flex:1"></div><div style="font-size:24px;font-weight:750;color:{c};margin-top:12px">{note}</div></div>')
    if i < 3:
        body += arrow(40)
body += '</div><div class="tag" style="margin-top:12px">A framework for analysis, not a policy report</div>'
page("S47_Air_Pollution_Case", 1600, 620, body)


# ================================================================ S48 synthesis matrix
rows = [("Negative externality", "Corrective tax, regulation or a suitable alternative", "Measurement and enforcement", "#B0412E"),
        ("Positive externality", "Subsidy or public support", "Targeting and fiscal cost", "#2E7D5B"),
        ("Public good", "Collective financing or provision where appropriate", "Funding and governance", "#8A6A2E"),
        ("Common-pool depletion", "Access rules, monitoring and resource management", "Enforcement and coordination", "#2E7D5B"),
        ("Market power", "Competition enforcement or suitable regulation", "Market definition and implementation", "#2F5D8C"),
        ("Information asymmetry", "Disclosure, transparency or other safeguards", "Information quality and compliance", "#5B6577"),
        ("Affordability or distribution", "Targeted assistance or well-designed support", "Exclusion, leakage and fiscal cost", "#1B3460")]
body = ('<div class="card" style="overflow:hidden">'
        '<div class="row" style="background:#0E1E3A;color:#fff;height:62px;font-size:23px;font-weight:800;letter-spacing:.08em">'
        '<div style="width:440px;padding:0 26px">PROBLEM</div><div style="width:620px;padding:0 26px">POTENTIAL RESPONSE</div><div style="flex:1;padding:0 26px">KEY LIMITATION</div></div>'
        + "".join(f'<div class="row" style="height:78px;border-top:3px solid #E2D6BC;{"background:#FCFAF4;" if i % 2 else ""}">'
                  f'<div class="row" style="width:440px;padding:0 26px;gap:14px"><div style="width:14px;height:44px;border-radius:7px;background:{c}"></div>'
                  f'<div style="font-size:28px;font-weight:850">{p}</div></div>'
                  f'<div style="width:620px;padding:0 26px;font-size:27px;font-weight:650">{r}</div>'
                  f'<div style="flex:1;padding:0 26px;font-size:27px;font-weight:650;color:#8A6A2E">{l}</div></div>' for i, (p, r, l, c) in enumerate(rows))
        + '</div>')
page("S48_Synthesis_Matrix", 1600, 640, body)


# ================================================================ S50 policy lens strip
lens = ["Diagnose the problem", "Explain the mechanism", "Select an instrument", "Assess benefits, costs and implementation", "Reach a balanced judgement"]
body = ('<div class="row" style="gap:10px;align-items:stretch;height:150px">')
for i, t in enumerate(lens):
    body += (f'<div class="navy row" style="flex:1;padding:0 20px;gap:14px;background:{["#0E1E3A","#14264A","#1B3460","#24406F","#7A5A24"][i]}">'
             f'{num(i+1, "#B08A47", 48)}<div style="font-size:26px;font-weight:800;line-height:1.2">{t}</div></div>')
    if i < 4:
        body += arrow(36)
body += ('</div><div class="row" style="gap:16px;margin-top:20px;align-items:stretch">'
         '<div class="soft" style="flex:1;padding:18px 24px;font-size:26px;font-weight:700;line-height:1.3"><span class="cap">Elasticity</span><br>tells who responds and who bears costs</div>'
         '<div class="soft" style="flex:1;padding:18px 24px;font-size:26px;font-weight:700;line-height:1.3"><span class="cap">Intervention</span><br>changes incentives and outcomes</div>'
         '<div class="soft" style="flex:1;padding:18px 24px;font-size:26px;font-weight:700;line-height:1.3"><span class="cap">Market failure</span><br>explains when action may be needed</div></div>')
page("S50_Policy_Lens", 1600, 330, body)
