"""YED deck infographics (HTML rendered to transparent PNG).
Brand: navy #0E1E3A, curve navy #1B3460, gold #B08A47 (text #8A6A2E).
YED colour code: blue #2F5D8C normal and income elastic; green #2E7D5B normal and income inelastic;
terracotta #B0412E inferior; gold for key insights. Meaning is always also given in words.
"""
import os
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "html")
os.makedirs(OUT, exist_ok=True)
BLUE, GREEN, TERRA, GOLD, GOLDT, NAVY, INK = "#2F5D8C", "#2E7D5B", "#B0412E", "#B08A47", "#8A6A2E", "#1B3460", "#0E1E3A"

CSS = """
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:transparent}
body{position:relative;font-family:Inter,'Helvetica Neue',Arial,sans-serif;color:#0E1E3A}
.serif{font-family:Lora,Georgia,serif}
.k{font-weight:800;letter-spacing:3px;text-transform:uppercase}
.muted{color:#5B6577}
svg.links{position:absolute;left:0;top:0;pointer-events:none;overflow:visible}
"""
LINKS_JS = """<script>
function c(el){const r=el.getBoundingClientRect();return {l:r.left,r:r.right,t:r.top,b:r.bottom,x:(r.left+r.right)/2,y:(r.top+r.bottom)/2};}
</script>"""


def page(name, w, h, body, extra="", script=""):
    html = (f'<!doctype html><html data-size="{w}x{h}"><head><meta charset="utf-8"><style>{CSS}'
            f'body{{width:{w}px;height:{h}px}}{extra}</style>{LINKS_JS}</head><body>{body}<script>{script}</script></body></html>')
    with open(os.path.join(OUT, name + ".html"), "w") as f:
        f.write(html)
    print("wrote", name)


# ============================================================ YED_04: formula as centrepiece
body = """
<div class="wrap">
 <div class="eq">
  <div class="lhs serif">YED<span class="eqs">=</span></div>
  <div class="frac"><div class="num"><span class="mk">1</span>%ΔQd</div><div class="bar"></div><div class="den">%ΔY</div></div>
  <div class="pct"><span class="mk">2</span><span class="serif">%Δ = </span><span class="f2"><span>new − original</span><span class="b2"></span><span>original</span></span><span class="serif">× 100</span></div>
 </div>
 <div class="rules">
  <div class="r"><span class="n">1</span><div><div class="h">Quantity demanded on top</div><div class="t">The response (Qd) is divided by the cause (income, Y).</div></div></div>
  <div class="r"><span class="n">2</span><div><div class="h">Measure from the original value</div><div class="t">Each percentage uses the starting value as its base.</div></div></div>
  <div class="r"><span class="n">3</span><div><div class="h">A coefficient, not a percentage</div><div class="t">The % signs cancel, so YED has no units: +2.0, never 2.0%.</div></div></div>
  <div class="r"><span class="n">4</span><div><div class="h">Keep the sign</div><div class="t">Positive means normal; negative means inferior.</div></div></div>
 </div>
</div>"""
page("YED_04_Formula", 1500, 660, body, """
.wrap{position:relative;display:flex;align-items:center;gap:50px;padding:6px 14px}
.eq{position:relative;width:800px;height:620px}
.lhs{position:absolute;left:0;top:96px;font-size:118px;font-weight:700}
.eqs{margin-left:26px;color:#B08A47}
.frac{position:absolute;left:390px;top:40px;width:410px;text-align:center}
.num,.den{font-size:104px;font-weight:800;line-height:1.05}
.num{color:#1B3460}.den{color:#8A6A2E}
.bar{height:12px;background:#0E1E3A;border-radius:6px;margin:14px 0}
.pct{position:absolute;left:20px;top:400px;display:flex;align-items:center;gap:18px;font-size:46px;font-weight:700;background:#F4EDDF;border-radius:22px;padding:18px 30px}
.f2{display:inline-flex;flex-direction:column;align-items:center;font-size:34px;font-weight:700}
.b2{display:block;width:100%;height:5px;background:#0E1E3A;border-radius:3px;margin:6px 0}
.mk{display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:50%;background:#B08A47;color:#fff;font-size:26px;font-weight:800;font-family:Inter,sans-serif;vertical-align:middle;margin-right:14px;position:relative;top:-6px}
.pct .mk{top:0;margin-right:6px}
.rules{display:flex;flex-direction:column;gap:22px;width:600px}
.r{display:flex;gap:20px;align-items:flex-start;border-left:6px solid #B08A47;padding:4px 0 4px 20px}
.n{flex:none;display:inline-flex;align-items:center;justify-content:center;width:50px;height:50px;border-radius:50%;background:#0E1E3A;color:#fff;font-size:27px;font-weight:800}
.h{font-size:32px;font-weight:800;margin-bottom:4px}
.t{font-size:27px;line-height:1.32;color:#3A4558}
""")

# ============================================================ YED_07: sign first, then magnitude
cols = [("−0.5", "Inferior good", "Qd moves opposite to income", TERRA),
        ("0", "Zero", "no measured Qd response over this range", "#5B6577"),
        ("+0.2", "Normal, income inelastic", "Qd rises proportionately less than income; often necessities", GREEN),
        ("+1.0", "Unitary", "Qd rises in the same proportion as income", GOLDT),
        ("+2.5", "Normal, income elastic", "Qd rises proportionately more than income; often luxuries and services", BLUE)]
vals = "".join(f'<div class="v" style="color:{c}">{v}</div>' for v, n, m, c in cols)
names = "".join(f'<div class="nm" style="color:{c}">{n}</div>' for v, n, m, c in cols)
means = "".join(f'<div class="me">{m}</div>' for v, n, m, c in cols)
body = f"""
<div class="grid">
 <div class="s1 neg"><span class="k">Step 1 · sign</span>negative: an inferior good</div>
 <div class="s1 zer"><span class="k">&nbsp;</span>zero</div>
 <div class="s1 pos"><span class="k">Step 1 · sign</span>positive: a normal good</div>
 {vals}
 <div class="barrow"><div class="bar"></div>{''.join(f'<div class="dot" style="left:{x}%"></div>' for x in (10.5, 28, 46, 64.5, 86))}</div>
 {names}
 {means}
 <div class="s2n">Keep the minus sign. Its size shows how strongly Qd falls; the elastic and inelastic labels are for normal goods.</div>
 <div class="s2z"></div>
 <div class="s2p"><span class="k">Step 2 · magnitude</span>for normal goods, compare YED with 1</div>
</div>
<div class="foot">Illustrative values. A classification holds for particular households, an income range and a period.</div>
"""
assert [c[0] for c in cols] == ["−0.5", "0", "+0.2", "+1.0", "+2.5"]
page("YED_07_Spectrum", 1600, 760, body, """
.grid{position:relative;display:grid;grid-template-columns:1.25fr 0.8fr 1.25fr 0.85fr 1.35fr;row-gap:12px;column-gap:0;margin:4px}
.s1{border-radius:16px;padding:10px 14px;font-size:27px;font-weight:800;text-align:center;margin:0 6px}
.s1 .k{display:block;font-size:19px;margin-bottom:2px}
.neg{background:#F6E3DE;color:#B0412E}.zer{background:#ECEEF1;color:#5B6577}
.pos{grid-column:3 / span 3;background:#E4ECF5;color:#1B3460}
.v{font-size:52px;font-weight:800;text-align:center;margin-top:6px}
.barrow{grid-column:1 / span 5;position:relative;height:64px}
.bar{position:absolute;left:3%;right:3%;top:16px;height:32px;border-radius:16px;
     background:linear-gradient(90deg,#B0412E 0%,#D9A79B 22%,#AEB4BE 28%,#2E7D5B 36%,#2E7D5B 52%,#B08A47 64%,#2F5D8C 76%,#2F5D8C 100%)}
.dot{position:absolute;top:2px;width:60px;height:60px;border-radius:50%;background:#FFFDFA;border:8px solid #0E1E3A;transform:translateX(-50%)}
.nm{font-size:29px;font-weight:800;text-align:center;line-height:1.15;padding:0 10px}
.me{font-size:25px;line-height:1.3;text-align:center;color:#3A4558;padding:0 12px}
.s2n{font-size:23px;line-height:1.3;color:#B0412E;font-weight:700;text-align:center;padding:10px 10px;border-top:4px solid #B0412E;margin:8px 6px 0}
.s2z{margin:8px 6px 0}
.s2p{grid-column:3 / span 3;font-size:27px;font-weight:800;color:#1B3460;text-align:center;border-top:4px solid #1B3460;padding-top:10px;margin:8px 6px 0}
.s2p .k{display:block;font-size:19px;margin-bottom:2px}
.foot{position:relative;font-size:23px;color:#5B6577;text-align:center;margin-top:20px}
""")

# ============================================================ YED_G: Meadowgate Foods, same income change, three responses
prods = [("Bread", "+0.3", 0.3, GREEN, "normal, income inelastic"),
         ("Chef-prepared meal kits", "+1.6", 1.6, BLUE, "normal, income elastic"),
         ("Value-range pasta", "−0.6", -0.6, TERRA, "inferior")]
dy = 5.0
res = [round(k * dy, 1) for _, _, k, _, _ in prods]
assert res == [1.5, 8.0, -3.0]
lanes = ""
for (n, ks, k, col, cl), r in zip(prods, res):
    w = abs(r) / 8.0 * 34  # % of track width (half-width is 50)
    side = "right" if r > 0 else "left"
    bar = (f'<div class="track"><div class="zero"></div><div class="b" style="background:{col};{"left:50%" if r > 0 else "right:50%"};width:{w}%"></div>'
           f'<div class="bl" style="color:{col};{"left:calc(50% + " + str(w) + "% + 12px)" if r > 0 else "right:calc(50% + " + str(w) + "% + 12px)"}">{("+" if r > 0 else "−")}{abs(r):.1f}%</div></div>')
    lanes += (f'<div class="lane"><div class="pn"><div class="pt">{n}</div><div class="pc" style="color:{col}">{cl}</div></div>'
              f'<div class="op">× <span class="chip" style="background:{col}">YED {ks}</span></div><div class="eqs">=</div>{bar}</div>')
body = f"""
<div class="top"><div class="inc"><div class="k">Household incomes</div><div class="big">+5%</div></div>
<div class="hd"><div class="k gold2">Meadowgate Foods · hypothetical firm</div><div class="hl">One income change, three different responses</div><div class="sub">Predicted % change in quantity demanded = YED × % change in income</div></div></div>
<div class="lanes">{lanes}</div>
<div class="foot">Illustrative coefficients. Predictions assume prices, tastes and rival products stay the same.</div>
"""
page("YED_G_Meadowgate_Forecast", 1600, 760, body, """
.top{display:flex;gap:30px;align-items:center;margin:6px 10px 18px}
.inc{background:#B08A47;color:#fff;border-radius:24px;padding:14px 30px;text-align:center}
.inc .k{font-size:20px}.big{font-size:74px;font-weight:800;line-height:1}
.gold2{color:#8A6A2E;font-size:21px}
.hl{font-family:Lora,Georgia,serif;font-size:44px;font-weight:700;margin:4px 0}
.sub{font-size:27px;color:#3A4558}
.lanes{display:flex;flex-direction:column;gap:18px;margin:0 10px}
.lane{display:grid;grid-template-columns:420px 230px 50px 1fr;align-items:center;background:#fff;border:3px solid #E7DCC4;border-radius:20px;padding:16px 22px}
.pt{font-size:34px;font-weight:800}.pc{font-size:25px;font-weight:700;margin-top:2px}
.op{font-size:34px;font-weight:800;color:#5B6577}
.chip{display:inline-block;color:#fff;border-radius:999px;padding:6px 18px;font-size:28px;margin-left:6px}
.eqs{font-size:40px;font-weight:800;color:#5B6577;text-align:center}
.track{position:relative;height:64px}
.zero{position:absolute;left:50%;top:-6px;bottom:-6px;width:4px;background:#0E1E3A;border-radius:2px}
.b{position:absolute;top:10px;height:44px;border-radius:8px}
.bl{position:absolute;top:6px;font-size:42px;font-weight:800}
.foot{font-size:24px;color:#5B6577;margin:18px 12px 0}
""")

# ============================================================ YED_25: illustrative application map
goods = [("Value-range pasta", -0.6, TERRA, "inferior"),
         ("Staple foods", 0.2, GREEN, "normal, income inelastic"),
         ("Branded clothing", 1.2, BLUE, "normal, income elastic"),
         ("Private cars", 1.5, BLUE, "normal, income elastic"),
         ("Restaurant meals", 1.8, BLUE, "normal, income elastic"),
         ("Holidays abroad", 2.2, BLUE, "normal, income elastic")]
rows = ""
for n, k, col, cl in goods:
    up, dn = round(k * 10, 1), round(k * -10, 1)
    def bar(v):
        w = abs(v) / 22 * 28
        lab = ("+" if v > 0 else "−") + f"{abs(v):g}%"
        pos = f"left:50%;width:{w}%" if v > 0 else f"right:50%;width:{w}%"
        lpos = f"left:calc(50% + {w}% + 10px)" if v > 0 else f"right:calc(50% + {w}% + 10px)"
        return f'<div class="track"><div class="zero"></div><div class="b" style="background:{col};{pos}"></div><div class="bl" style="color:{col};{lpos}">{lab}</div></div>'
    ks = ("+" if k > 0 else "−") + f"{abs(k):.1f}"
    rows += f'<div class="gn"><div class="g1">{n}</div><div class="g2" style="color:{col}">{cl}</div></div><div class="kc"><span style="background:{col}">{ks}</span></div>{bar(up)}{bar(dn)}'
assert [round(k * 10, 1) for _, k, _, _ in goods] == [-6.0, 2.0, 12.0, 15.0, 18.0, 22.0]
body = f"""
<div class="tb">
 <div class="h0"></div><div class="h1 k">Illustrative YED</div><div class="h2"><b>Income rises 10%</b><span>predicted % change in Qd</span></div><div class="h2"><b>Income falls 10%</b><span>predicted % change in Qd</span></div>
 {rows}
</div>
<div class="foot">Illustrative coefficients for teaching, not measured estimates. Real values depend on the households, the income range and the period.</div>
"""
page("YED_25_Application_Map", 1700, 820, body, """
.tb{position:relative;display:grid;grid-template-columns:400px 190px 1fr 1fr;column-gap:18px;row-gap:12px;align-items:center;margin:4px 8px}
.h1{font-size:20px;color:#8A6A2E;text-align:center}
.h2{text-align:center;font-size:28px}.h2 b{display:block;font-weight:800}.h2 span{font-size:21px;color:#5B6577}
.g1{font-size:32px;font-weight:800}.g2{font-size:23px;font-weight:700}
.kc{text-align:center}.kc span{display:inline-block;color:#fff;border-radius:999px;padding:6px 18px;font-size:30px;font-weight:800}
.track{position:relative;height:58px;background:#F7F2E6;border-radius:12px}
.zero{position:absolute;left:50%;top:-4px;bottom:-4px;width:4px;background:#0E1E3A;border-radius:2px}
.b{position:absolute;top:10px;height:38px;border-radius:7px}
.bl{position:absolute;top:8px;font-size:32px;font-weight:800}
.foot{font-size:24px;color:#5B6577;margin:18px 10px 0;text-align:center}
""")

# ============================================================ YED_26: diagnostic list of eleven errors
groups = [
    ("Calculating", [
        ("Reversing the formula", "Quantity demanded on top: YED = %ΔQd ÷ %ΔY"),
        ("Dividing by the new value", "Use the original value as the base of each % change"),
        ("Writing YED as a percentage", "It is a coefficient: +2.0, not 2.0%"),
        ("Using spending instead of quantity", "YED uses quantity demanded unless spending is properly derived"),
    ]),
    ("Classifying", [
        ("Dropping the minus sign", "Keep it: YED = −0.5 identifies an inferior good"),
        ("\"Inferior means poor quality\"", "It describes how demand responds to income, not quality"),
        ("Treating YED as a permanent label", "It depends on the household, income range, market and period"),
        ("Presenting illustrative YEDs as data", "Call a value measured only if a source measured it"),
    ]),
    ("Diagrams", [
        ("Calling an Engel curve a demand curve", "Engel curve: income vs Qd. Demand curve: price vs Qd"),
        ("Putting price on the Engel curve's vertical axis", "The vertical axis shows income"),
        ("Reading YED from steepness", "Compare the percentage changes between two points"),
    ]),
]
rows, k = [], 0
for g, items in groups:
    rows.append(f'<div class="cat" style="grid-row:span {len(items)}"><span>{g}</span></div>')
    for err, fix in items:
        k += 1
        rows.append(f'<div class="no">{k:02d}</div><div class="er"><span class="x">✗</span>{err}</div><div class="fx"><span class="ok">✓</span>{fix}</div>')
assert k == 11
body = f"""<div class="hdr"><div></div><div></div><div class="h1">The error</div><div class="h2">What earns the mark</div></div>
<div class="tb">{''.join(rows)}</div>"""
page("YED_26_Errors", 1760, 960, body, """
.hdr,.tb{position:relative;display:grid;grid-template-columns:170px 66px 640px 1fr;column-gap:12px;margin:0 4px}
.hdr{margin-bottom:8px}
.h1,.h2{font-size:23px;font-weight:800;letter-spacing:3px;text-transform:uppercase}.h1{color:#B0412E}.h2{color:#2E7D5B}
.tb{row-gap:9px}
.cat{display:flex;align-items:center;justify-content:center;background:#0E1E3A;border-radius:16px;color:#E2C98F;font-size:25px;font-weight:800;text-align:center;padding:8px}
.no{font-family:Lora,Georgia,serif;font-size:32px;font-weight:700;color:#B08A47;display:flex;align-items:center;justify-content:center}
.er,.fx{font-size:26px;line-height:1.25;border-radius:14px;padding:10px 16px;display:flex;align-items:center;gap:12px}
.er{background:#F8E7E3;color:#7A2A1F;font-weight:700}
.fx{background:#E5F1EA;color:#163F2E;font-weight:600}
.x{font-size:27px;color:#B0412E;font-weight:900;flex:none}.ok{font-size:27px;color:#2E7D5B;font-weight:900;flex:none}
""")

# ============================================================ YED_27: exam method with a worked example
steps = [("Identify", "Pick out income and quantity demanded, old and new.",
          "Income $3,000 → $3,300 a month; bus journeys 40 → 38 a month"),
         ("Calculate", "Find each % change from the original value.",
          "%ΔY = (3,300 − 3,000) ÷ 3,000 × 100 = +10%; %ΔQd = (38 − 40) ÷ 40 × 100 = −5%"),
         ("Compute", "Divide: quantity demanded on top.", "YED = −5% ÷ +10% = <b>−0.5</b>"),
         ("Sign", "Positive: normal. Negative: inferior.", "Negative, so bus travel is an <b>inferior good</b> for this household"),
         ("Magnitude", "Say how strong the response is.", "Qd falls by about 0.5% for each 1% rise in income"),
         ("Mechanism", "Explain why buyers respond.", "Higher income lets the household switch to cars or ride-hailing"),
         ("Qualify", "State the assumptions and limits.", "For this household, over this income range, ceteris paribus; YED may differ at other incomes")]
assert round((38 - 40) / 40 * 100, 6) == -5 and round((3300 - 3000) / 3000 * 100, 6) == 10
srows = "".join(f'<div class="sn"><span>{i}</span></div><div class="sv"><b>{v}</b><div>{d}</div></div><div class="ar">→</div><div class="ex"><span>{e}</span></div>'
                for i, (v, d, e) in enumerate(steps, 1))
body = f"""<div class="hdr"><div></div><div class="h1">The method</div><div></div><div class="h2">Worked example</div></div>
<div class="tb">{srows}</div>"""
page("YED_27_Exam_Method", 1760, 960, body, """
.hdr,.tb{position:relative;display:grid;grid-template-columns:70px 560px 50px 1fr;column-gap:14px;margin:0 6px}
.hdr{margin-bottom:10px}
.h1,.h2{font-size:23px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:#8A6A2E}
.tb{row-gap:12px;align-items:stretch}
.sn{display:flex;align-items:center;justify-content:center}
.sn span{width:60px;height:60px;border-radius:50%;background:#0E1E3A;color:#fff;font-size:30px;font-weight:800;display:flex;align-items:center;justify-content:center}
.sv{background:#F4EDDF;border-radius:16px;padding:10px 18px;font-size:24px;color:#3A4558;line-height:1.25}
.sv b{display:block;font-size:30px;color:#0E1E3A;font-weight:800}
.ar{display:flex;align-items:center;justify-content:center;font-size:34px;color:#B08A47;font-weight:900}
.ex{background:#fff;border:3px solid #E7DCC4;border-radius:16px;padding:10px 18px;font-size:26px;line-height:1.3;display:flex;align-items:center}
.ex b{color:#B0412E}
""")

# ============================================================ YED_28: revision master map (10 branches)
clusters = [
    ("c1", "Definition and formula", "3, 4", ["YED = %ΔQd ÷ %ΔY", "a coefficient with no units"]),
    ("c2", "% change calculations", "4, 5, 17", ["original value as the base", "%ΔQd ≈ YED × %ΔY"]),
    ("c3", "Sign and magnitude", "6, 7", ["sign first: normal or inferior", "then size for normal goods: below, at or above 1"]),
    ("c4", "Normal and inferior goods", "8, 13", ["normal: Qd moves with income", "inferior: Qd moves against income"]),
    ("c5", "Engel curves", "9 to 11", ["income on the vertical axis", "compare % changes between A and B"]),
    ("c6", "Demand shifts", "8, 11, 12", ["income shifts the demand curve", "price moves along it"]),
    ("c7", "Households and income ranges", "14, 15", ["normal at one income, inferior at another", "tendencies, not labels"]),
    ("c8", "HL · Business forecasting", "18 to 20, 24", ["predict sales from YED", "portfolio, capacity, recession risk"]),
    ("c9", "HL · Sectoral change", "21 to 23", ["services grow faster than primary", "a falling share is not falling output"]),
    ("c10", "Errors and exam reasoning", "26, 27", ["keep the sign, quantity on top", "identify, calculate, classify, explain, qualify"]),
]
pos = {"c1": (10, 10), "c2": (10, 245), "c3": (10, 480), "c4": (10, 715),
       "c5": (1310, 10), "c6": (1310, 245), "c7": (1310, 480), "c8": (1310, 715),
       "c9": (655, 30), "c10": (655, 715)}
cl_html = ""
for cid, name, sl, leaves in clusters:
    x, y = pos[cid]
    hl = ' hl' if name.startswith("HL") else ''
    cl_html += (f'<div class="cl" id="{cid}" style="left:{x}px;top:{y}px"><div class="ch{hl}" id="{cid}h"><span class="cn">{name}</span><span class="cs">{sl}</span></div>'
                + "".join(f'<div class="lf">{t}</div>' for t in leaves) + '</div>')
body = f"""{cl_html}
<div class="hub" id="hub"><div class="hk k">IB 2.5 · SL and HL</div><div class="ht serif">Income elasticity of demand</div><div class="hf">YED = %ΔQd ÷ %ΔY</div></div>
<svg class="links" id="lk" width="1760" height="960"></svg>"""
script = """
const s=document.getElementById('lk');const H=c(document.getElementById('hub'));const rx=(H.r-H.l)/2, ry=(H.b-H.t)/2;
for(const id of ['c1','c2','c3','c4','c5','c6','c7','c8','c9','c10']){const h=c(document.getElementById(id+'h'));
  let x2,y2;const cl=c(document.getElementById(id));
  if(h.r<H.l){x2=h.r;y2=h.y;}else if(h.l>H.r){x2=h.l;y2=h.y;}else if(cl.b<H.t){x2=cl.x;y2=cl.b+6;}else{x2=h.x;y2=h.t;}
  const th=Math.atan2((y2-H.y)/ry,(x2-H.x)/rx);const x1=H.x+rx*Math.cos(th),y1=H.y+ry*Math.sin(th);
  const vert=Math.abs(x2-x1)<Math.abs(y2-y1);const mx=(x1+x2)/2,my=(y1+y2)/2;
  const d=vert?`M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`:`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
  s.insertAdjacentHTML('beforeend',`<path d="${d}" fill="none" stroke="#B08A47" stroke-width="6" stroke-linecap="round"/>`);
  s.insertAdjacentHTML('beforeend',`<circle cx="${x2}" cy="${y2}" r="8" fill="#B08A47"/>`);}
"""
page("YED_28_Revision_Map", 1760, 960, body, """
.cl{position:absolute;width:440px}
.ch{display:flex;align-items:baseline;justify-content:space-between;gap:10px;background:#1B3460;color:#fff;border-radius:16px;padding:9px 16px;margin-bottom:6px}
.ch.hl{background:#B0412E}
.cn{font-size:28px;font-weight:800}
.cs{font-size:23px;font-weight:700;color:#E2C98F;white-space:nowrap}
.lf{font-size:25px;line-height:1.25;padding:4px 4px 4px 16px;border-left:5px solid #E2D6BC;margin-left:12px;color:#22304A}
.hub{position:absolute;left:640px;top:330px;width:480px;height:260px;border-radius:130px;background:#0E1E3A;border:7px solid #B08A47;color:#fff;
     display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:10px 30px}
.hk{font-size:21px;color:#E2C98F}
.ht{font-size:40px;font-weight:700;line-height:1.1;margin:8px 0}
.hf{font-size:28px;font-weight:700;color:#E2C98F}
""", script)
