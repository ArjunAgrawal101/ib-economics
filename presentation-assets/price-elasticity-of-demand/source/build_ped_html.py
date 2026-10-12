"""PED deck infographics (HTML rendered to transparent PNG). Brand: navy #0E1E3A, antique gold #B08A47."""
import os
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "html")
os.makedirs(OUT, exist_ok=True)

CSS = """
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:transparent}
body{position:relative;font-family:Inter,'Helvetica Neue',Arial,sans-serif;color:#0E1E3A}
.serif{font-family:Lora,Georgia,serif}
.k{font-size:21px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase}
.muted{color:#5B6577}.gold{color:#8A6A2E}.app{color:#2E7D5B}.dep{color:#B0412E}.cb{color:#2F5D8C}
.tile{background:#FFFFFF;border:3px solid #1B3460;border-radius:18px;padding:14px 18px}
.pill{display:inline-block;border-radius:999px;padding:5px 16px;font-weight:800;color:#fff;font-size:20px;letter-spacing:1px}
.xs{font-size:21px;line-height:1.3}
.s{font-size:23px;line-height:1.3}
"""


def page(name, w, h, body, extra=""):
    html = (f'<!doctype html><html data-size="{w}x{h}"><head><meta charset="utf-8"><style>{CSS}'
            f'body{{width:{w}px;height:{h}px}}{extra}</style></head><body>{body}</body></html>')
    with open(os.path.join(OUT, name + ".html"), "w") as f:
        f.write(html)
    print("wrote", name)


# ------------------------------------------------------------------ spectrum (slide 6)
zones = [
    ("0", "Perfectly price inelastic", "%ΔQD = 0: quantity demanded does not respond", "#1B3460"),
    ("0 to 1", "Price inelastic", "%ΔQD is smaller than %ΔP", "#2F5D8C"),
    ("1", "Unitary price elastic", "%ΔQD equals %ΔP", "#8A6A2E"),
    ("1 to ∞", "Price elastic", "%ΔQD is larger than %ΔP", "#B0412E"),
    ("→ ∞", "Perfectly price elastic", "any price rise: quantity demanded falls to zero", "#7A2A1F"),
]
cells = "".join(f'<div class="z"><div class="zv" style="color:{c}">{v}</div><div class="zn">{n}</div><div class="zm xs muted">{m}</div></div>'
                for v, n, m, c in zones)
body = f"""
<div class="lab k gold">Magnitude |PED|: this is what you compare with 1</div>
<div class="bar"><div class="seg s1"></div><div class="seg s2"></div><div class="tick t0"><span>0</span></div><div class="tick t1"><span>1</span></div><div class="tick t2"><span>∞</span></div></div>
<div class="zones">{cells}</div>
<div class="coef"><span class="k muted">Coefficient (usually negative)</span>
<span class="cv">0</span><span class="arr">→</span><span class="cv">−0.5</span><span class="arr">→</span><span class="cv">−1</span><span class="arr">→</span><span class="cv">−2.0</span><span class="arr">→</span><span class="cv">−∞</span></div>
<div class="ex"><b>Theatre tickets:</b> coefficient −0.50, magnitude 0.50 → price inelastic &nbsp;·&nbsp; <b>Streaming service:</b> coefficient −2.0, magnitude 2.0 → price elastic</div>
"""
page("PED_06_Spectrum", 1500, 560, body, """
.lab{position:relative;margin:4px 6px 14px}
.bar{position:relative;height:28px;margin:74px 60px 0;display:flex}
.seg{height:28px}.s1{flex:1;background:linear-gradient(90deg,#1B3460,#2F5D8C);border-radius:14px 0 0 14px}
.s2{flex:1.6;background:linear-gradient(90deg,#B08A47,#B0412E,#7A2A1F);border-radius:0 14px 14px 0}
.tick{position:absolute;top:-16px;width:6px;height:60px;background:#0E1E3A;border-radius:3px}
.tick span{position:absolute;top:-44px;left:50%;transform:translateX(-50%);font-size:34px;font-weight:800}
.t0{left:0}.t1{left:38.4%}.t2{right:0}
.zones{position:relative;display:grid;grid-template-columns:1fr 1.25fr 1fr 1.25fr 1.15fr;gap:14px;margin:42px 4px 0}
.z{background:#fff;border:3px solid #E2D6BC;border-radius:16px;padding:12px 14px}
.zv{font-size:30px;font-weight:800}.zn{font-size:23px;font-weight:800;margin:4px 0}
.coef{position:relative;margin:22px 6px 0;display:flex;align-items:center;gap:16px;flex-wrap:wrap}
.cv{font-size:28px;font-weight:800;background:#0E1E3A;color:#fff;border-radius:10px;padding:4px 14px}
.arr{font-size:26px;color:#B08A47;font-weight:800}
.ex{position:relative;margin:18px 6px 4px;font-size:22px}
""")

# ------------------------------------------------------------------ TINS (slide 11)
def sat(letter, name, mech, rule, cls):
    return (f'<div class="sat {cls}"><div class="sl">{letter}</div><div class="sb"><div class="sn">{name}</div>'
            f'<div class="xs">{mech}</div><div class="rule">{rule}</div></div></div>')
body = f"""
<div class="grid">
 {sat("T", "Time period", "More time turns unavailable substitutes into available ones: habits change, equipment is replaced.", "Longer period → more price elastic", "t")}
 {sat("I", "Income proportion", "A large share of the budget forces buyers to look for alternatives; a trivial purchase does not.", "Larger share → more price elastic", "i")}
 {sat("N", "Necessity", "If the buyer cannot do without it, quantity demanded barely falls when the price rises.", "More necessary → more price inelastic", "n")}
 <div class="core">
  <div class="cl">S</div>
  <div class="cn">Substitutes</div>
  <div class="cq">Can buyers switch?</div>
  <div class="cx">Number and closeness of alternatives, minus the cost of switching (contracts, loyalty schemes, ecosystems)</div>
  <div class="cr">More and closer substitutes → more price elastic</div>
 </div>
</div>
<div class="out"><span class="pill" style="background:#0E1E3A">Determinant</span><span class="ar">→</span><span class="pill" style="background:#1B3460">ability or willingness to switch</span><span class="ar">→</span><span class="pill" style="background:#8A6A2E">size of % response in QD</span><span class="ar">→</span><span class="pill" style="background:#B0412E">|PED|</span></div>
"""
page("PED_11_TINS", 1500, 760, body, """
.grid{position:relative;display:grid;grid-template-columns:1fr 1.15fr;grid-template-rows:auto auto auto;gap:16px 26px;margin:4px}
.sat{display:flex;gap:14px;align-items:stretch;background:#fff;border:3px solid #1B3460;border-radius:18px;padding:12px 16px;grid-column:1}
.sl{flex:none;width:62px;height:62px;border-radius:14px;background:#1B3460;color:#fff;font-size:38px;font-weight:800;display:flex;align-items:center;justify-content:center;font-family:Lora,Georgia,serif}
.sn{font-size:25px;font-weight:800}
.rule{margin-top:6px;font-size:20px;font-weight:800;color:#8A6A2E}
.core{grid-column:2;grid-row:1 / span 3;background:#0E1E3A;color:#fff;border:5px solid #B08A47;border-radius:28px;padding:26px 30px;display:flex;flex-direction:column;justify-content:center;position:relative}
.core:before{content:'feeds into';position:absolute;left:-26px;top:50%;transform:translate(-100%,-50%) rotate(-90deg);transform-origin:right center;font-size:16px;color:#8A6A2E;font-weight:800;letter-spacing:2px;text-transform:uppercase}
.cl{font-family:Lora,Georgia,serif;font-size:96px;font-weight:700;color:#E2C98F;line-height:1}
.cn{font-size:40px;font-weight:800;margin-top:4px}
.cq{font-size:30px;color:#E2C98F;font-weight:700;margin-top:6px}
.cx{font-size:23px;line-height:1.35;margin-top:14px;opacity:.95}
.cr{margin-top:16px;font-size:24px;font-weight:800;background:#B08A47;color:#0E1E3A;border-radius:12px;padding:8px 14px;align-self:flex-start}
.out{position:relative;display:flex;align-items:center;justify-content:center;gap:12px;margin:22px 4px 4px;flex-wrap:wrap}
.out .pill{font-size:22px;padding:8px 18px}
.ar{font-size:30px;color:#B08A47;font-weight:900}
""")

# ------------------------------------------------------------------ primary vs manufactured (slide 25)
rows = [
    ("S", "Substitutes", "Very few: little replaces crude oil, iron ore or rice as an input", "Many: rival makes and models compete closely"),
    ("N", "Necessity", "Essential inputs: production stops without them", "Lower: an old laptop or car can be kept longer"),
    ("I", "Share of spending", "Often a small share of the buyer's total production cost", "Often a large share of a household's income"),
    ("T", "Time to adjust", "Buyers need years to redesign processes or switch inputs", "Durable: replacement can simply be postponed"),
]
rr = "".join(f'<div class="dl"><span class="lt">{l}</span><span>{n}</span></div><div class="pc xs">{a}</div><div class="mc xs">{b}</div>' for l, n, a, b in rows)
body = f"""
<div class="g">
 <div></div>
 <div class="hp"><div class="ht">Primary commodity</div><div class="hs">crude oil · iron ore · rice<br>buyer: usually a firm buying an input</div></div>
 <div class="hm"><div class="ht">Manufactured product</div><div class="hs">laptop · car · watch<br>buyer: usually a household</div></div>
 {rr}
 <div class="dl res"><span>Result</span></div>
 <div class="rp">PED generally below 1: price inelastic</div>
 <div class="rm">PED generally above 1: price elastic</div>
</div>
<div class="note xs"><b>A tendency, not a rule:</b> medicines are manufactured yet usually face price inelastic demand; one brand of rice faces close substitutes on the same shelf.</div>
"""
page("PED_25_Primary_vs_Manufactured", 1500, 760, body, """
.g{position:relative;display:grid;grid-template-columns:270px 1fr 1fr;gap:10px 16px;margin:4px}
.hp,.hm{border-radius:16px;padding:12px 18px;color:#fff}
.hp{background:#1B3460}.hm{background:#8A6A2E}
.ht{font-size:28px;font-weight:800}.hs{font-size:19px;opacity:.95;margin-top:2px;line-height:1.3}
.dl{display:flex;align-items:center;gap:12px;font-size:23px;font-weight:800}
.lt{flex:none;width:46px;height:46px;border-radius:12px;background:#0E1E3A;color:#E2C98F;display:flex;align-items:center;justify-content:center;font-family:Lora,Georgia,serif;font-size:28px}
.pc,.mc{background:#fff;border-radius:14px;padding:12px 16px;border:3px solid}
.pc{border-color:#1B3460}.mc{border-color:#B08A47}
.res{font-size:23px}
.rp,.rm{border-radius:14px;padding:12px 16px;font-size:23px;font-weight:800;color:#fff}
.rp{background:#2F5D8C}.rm{background:#B0412E}
.note{position:relative;margin:16px 6px 4px;font-size:21px}
""")

# ------------------------------------------------------------------ errors that cost marks (slide 27)
errs = [
    ("Writing %ΔP on top", "Quantity is always the numerator: PED = %ΔQD ÷ %ΔP"),
    ("\"Elastic means QD falls when price rises\"", "That is the law of demand. Elastic means %ΔQD is larger than %ΔP"),
    ("Dropping the sign without comment", "\"PED = −0.5; using its magnitude of 0.5, demand is price inelastic\""),
    ("\"The product is elastic\"", "\"Demand for the product is price elastic\", in a stated market and period"),
    ("Mixing up shifts and movements", "A price change moves along D (quantity demanded); other factors shift D (demand)"),
    ("\"A steep curve is inelastic\"", "Compare slopes only on the same axes and scale; PED changes along a straight line"),
    ("\"A price cut always raises revenue\"", "Only if demand is price elastic over that range"),
    ("Treating revenue as profit", "TR = P × Q. Profit also depends on costs"),
    ("\"PED decides who pays a tax\"", "Incidence depends on PED relative to PES"),
    ("Quoting one permanent PED", "PED depends on the buyer, the definition of the market and the time period"),
]
tiles = "".join(f'<div class="e"><div class="en">{i:02d}</div><div><div class="ew">✗ {w}</div><div class="er">✓ {r}</div></div></div>'
                for i, (w, r) in enumerate(errs, 1))
body = f'<div class="grid">{tiles}</div>'
page("PED_27_Errors", 1500, 760, body, """
.grid{position:relative;display:grid;grid-template-columns:1fr 1fr;gap:12px 18px;margin:4px}
.e{display:flex;gap:14px;align-items:flex-start;background:#fff;border:3px solid #E2D6BC;border-radius:16px;padding:12px 16px}
.en{flex:none;font-family:Lora,Georgia,serif;font-size:30px;font-weight:700;color:#B08A47;width:44px}
.ew{font-size:22px;font-weight:800;color:#B0412E;line-height:1.25}
.er{font-size:21px;color:#0E1E3A;line-height:1.3;margin-top:4px}
""")

# ------------------------------------------------------------------ revision map (slide 28)
top = [
    (1, "Concept and formula", "Responsiveness of QD to own price; PED = %ΔQD ÷ %ΔP; %Δ = (new − old) ÷ old × 100", "Cards 2 to 5"),
    (2, "Coefficient and degrees", "Coefficient negative; classify by magnitude: 0, 0 to 1, 1, above 1, → ∞", "Card 6"),
    (3, "Diagrams", "Elastic vs inelastic on the same axes; horizontal, vertical, rectangular hyperbola", "Cards 7, 8"),
    (4, "TINS determinants", "Time, Income share, Necessity, Substitutes (the key one, minus switching costs)", "Cards 11 to 15"),
]
bottom = [
    (5, "PED and total revenue", "Inelastic: P and TR move together; elastic: opposite; gain vs loss areas", "Cards 16 to 18"),
    (6, "Firms and government", "Price discrimination vs dynamic pricing; tax revenue vs incidence", "Cards 19 to 21"),
    (7, "Calculations and errors", "%ΔQD = PED × %ΔP; new Q and TR; ten errors that cost marks", "Cards 22 to 24, 27"),
    (8, "HL extensions", "Linear D: |PED| = (1/b)(P/Q), 1 at the midpoint; primary vs manufactured", "Cards 9, 10, 25"),
]
def node(n, label, text, cards):
    return (f'<div class="node"><div class="head"><span class="num">{n}</span><span class="label">{label}</span></div>'
            f'<div class="text">{text}</div><div class="cards">{cards}</div></div>')
body = f"""
<svg id="lines" width="1500" height="900" style="position:absolute;left:0;top:0"></svg>
<div class="row" id="top">{"".join(node(*t) for t in top)}</div>
<div class="band"><div class="hub" id="hub"><div class="t1 serif">Price elasticity of demand</div><div class="s1">IB 2.5 · SL AND HL</div></div></div>
<div class="row" id="bottom">{"".join(node(*b) for b in bottom)}</div>
<script>
const svg=document.getElementById('lines'), hub=document.getElementById('hub').getBoundingClientRect();
const cx=hub.left+hub.width/2; let out='';
function link(el, fromTop){{
  const r=el.getBoundingClientRect(), x=r.left+r.width/2, y=fromTop? r.bottom : r.top;
  const hx=cx+(x-cx)*0.36, hy=fromTop? hub.top : hub.bottom;
  out+=`<line x1="${{x}}" y1="${{y}}" x2="${{hx}}" y2="${{hy}}" stroke="#B08A47" stroke-width="4" stroke-linecap="round"/>`+
       `<circle cx="${{x}}" cy="${{y}}" r="7" fill="#B08A47"/>`;
}}
document.querySelectorAll('#top .node').forEach(n=>link(n,true));
document.querySelectorAll('#bottom .node').forEach(n=>link(n,false));
svg.innerHTML=out;
</script>
"""
page("PED_28_Revision_Map", 1500, 900, body, """
.row{position:relative;z-index:1;display:flex;gap:22px;align-items:stretch;padding:4px}
.node{flex:1;background:#FFFFFF;border:3px solid #1B3460;border-radius:18px;padding:14px 16px;display:flex;flex-direction:column}
.head{display:flex;align-items:center;gap:10px}
.num{flex:none;width:36px;height:36px;border-radius:50%;background:#B08A47;color:#fff;font-weight:700;font-size:21px;display:flex;align-items:center;justify-content:center}
.label{font-weight:800;font-size:25px;line-height:1.1}
.text{font-size:21px;line-height:1.28;margin-top:8px;flex:1}
.cards{font-size:18px;font-weight:700;color:#8A6A2E;margin-top:8px}
.band{position:relative;z-index:1;height:140px;display:flex;align-items:center;justify-content:center}
.hub{width:520px;height:88px;border-radius:44px;background:#0E1E3A;border:4px solid #B08A47;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center}
.hub .t1{font-size:32px;font-weight:700;line-height:1}
.hub .s1{font-size:16px;letter-spacing:3px;color:#E2C98F;margin-top:6px;font-weight:700}
""")
