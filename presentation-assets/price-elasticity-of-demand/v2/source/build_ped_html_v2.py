"""PED deck v2 infographics (HTML rendered to transparent PNG).
Brand: navy #0E1E3A, curve navy #1B3460, antique gold #B08A47 (text #8A6A2E), elastic red #B0412E, inelastic green #2E7D5B.
Type is sized for a full-width slide image (about 880 pt for a 1500 px canvas), so body text is 26 px or more.
"""
import os
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "html")
os.makedirs(OUT, exist_ok=True)

CSS = """
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:transparent}
body{position:relative;font-family:Inter,'Helvetica Neue',Arial,sans-serif;color:#0E1E3A}
.serif{font-family:Lora,Georgia,serif}
.k{font-weight:800;letter-spacing:3px;text-transform:uppercase}
.muted{color:#5B6577}.gold{color:#8A6A2E}.app{color:#2E7D5B}.dep{color:#B0412E}
svg.links{position:absolute;left:0;top:0;pointer-events:none;overflow:visible}
"""

LINKS_JS = """
<script>
function c(el){const r=el.getBoundingClientRect();return {l:r.left,r:r.right,t:r.top,b:r.bottom,x:(r.left+r.right)/2,y:(r.top+r.bottom)/2};}
function arrowDefs(svg,col,id){svg.insertAdjacentHTML('beforeend',`<defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${col}"/></marker></defs>`);}
</script>
"""


def page(name, w, h, body, extra="", script=""):
    html = (f'<!doctype html><html data-size="{w}x{h}"><head><meta charset="utf-8"><style>{CSS}'
            f'body{{width:{w}px;height:{h}px}}{extra}</style>{LINKS_JS}</head><body>{body}'
            f'<script>{script}</script></body></html>')
    with open(os.path.join(OUT, name + ".html"), "w") as f:
        f.write(html)
    print("wrote", name)


# ============================================================ PED_04: the formula as a mathematical centrepiece
body = """
<div class="wrap">
 <div class="eq">
  <div class="lhs serif">PED<span class="eqs">=</span></div>
  <div class="frac">
    <div class="num"><span class="mk">1</span>%ΔQD</div>
    <div class="bar"></div>
    <div class="den">%ΔP</div>
  </div>
  <div class="cap c1">percentage change in<br><b>quantity demanded</b></div>
  <div class="cap c2">percentage change in<br>the good's <b>own price</b></div>
  <div class="pct"><span class="mk">2</span><span class="serif">%Δ = </span><span class="f2"><span>new − old</span><span class="b2"></span><span>old</span></span><span class="serif">× 100</span></div>
 </div>
 <div class="rules">
  <div class="r"><span class="n">1</span><div><div class="h">Quantity on top, always</div><div class="t">Work out both percentages first, then divide.</div></div></div>
  <div class="r"><span class="n">2</span><div><div class="h">Measure from the initial value</div><div class="t">Each percentage uses the old value as its base.</div></div></div>
  <div class="r"><span class="n">3</span><div><div class="h">Sign: normally negative</div><div class="t">Price and quantity demanded move in opposite directions. Classify by the magnitude, <b>|PED|</b>.</div></div></div>
 </div>
</div>
"""
page("PED_04_Formula", 1500, 640, body, """
.wrap{position:relative;display:flex;align-items:center;gap:56px;padding:10px 16px}
.eq{position:relative;width:810px;height:600px}
.lhs{position:absolute;left:0;top:98px;font-size:118px;font-weight:700;color:#0E1E3A}
.eqs{margin-left:26px;color:#B08A47}
.frac{position:absolute;left:372px;top:40px;width:430px;text-align:center}
.num,.den{font-size:104px;font-weight:800;line-height:1.05;position:relative}
.num{color:#1B3460}.den{color:#8A6A2E}
.bar{height:12px;background:#0E1E3A;border-radius:6px;margin:14px 0}
.cap{position:absolute;font-size:27px;line-height:1.3;color:#5B6577;width:320px}
.cap b{color:#0E1E3A}
.c1{left:-10px;top:30px;display:none}
.c2{display:none}
.pct{position:absolute;left:30px;top:390px;display:flex;align-items:center;gap:18px;font-size:46px;font-weight:700;color:#0E1E3A;
     background:#F4EDDF;border-radius:22px;padding:18px 30px}
.f2{display:inline-flex;flex-direction:column;align-items:center;font-size:36px;font-weight:700}
.b2{display:block;width:100%;height:5px;background:#0E1E3A;border-radius:3px;margin:6px 0}
.mk{display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:50%;background:#B08A47;color:#fff;
    font-size:26px;font-weight:800;font-family:Inter,sans-serif;vertical-align:middle;margin-right:14px;position:relative;top:-6px}
.pct .mk{top:0;margin-right:6px}
.rules{display:flex;flex-direction:column;gap:30px;width:600px}
.r{display:flex;gap:22px;align-items:flex-start;border-left:6px solid #B08A47;padding:6px 0 6px 22px}
.n{flex:none;display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;border-radius:50%;background:#0E1E3A;color:#fff;font-size:28px;font-weight:800}
.h{font-size:34px;font-weight:800;margin-bottom:6px}
.t{font-size:28px;line-height:1.35;color:#3A4558}
""")

# ============================================================ PED_06: the spectrum, large and legible
cols = [
    ("0", "Perfectly price inelastic", "QD does not respond at all", "vertical D", "#1B3460", "pt"),
    ("0 to 1", "Price inelastic", "%ΔQD is proportionately smaller than %ΔP", "", "#2F5D8C", "rg"),
    ("1", "Unitary", "%ΔQD and %ΔP are equal in magnitude", "rectangular hyperbola", "#8A6A2E", "pt"),
    ("1 to ∞", "Price elastic", "%ΔQD is proportionately larger than %ΔP", "", "#B0412E", "rg"),
    ("∞", "Perfectly price elastic", "any price rise: QD falls to zero", "horizontal D", "#7A2A1F", "pt"),
]
vals = "".join(f'<div class="v {k}" style="color:{c}">{v}</div>' for v, n, m, s, c, k in cols)
names = "".join(f'<div class="nm {k}" style="color:{c}">{n}</div>' for v, n, m, s, c, k in cols)
means = "".join(f'<div class="me {k}">{m}{("<div class=sh>" + s + "</div>") if s else ""}</div>' for v, n, m, s, c, k in cols)
body = f"""
<div class="top"><span class="k gold">Magnitude |PED|</span><span class="muted">: this is what you compare with 1</span></div>
<div class="grid">
 {vals}
 <div class="barrow"><div class="bar"></div>
   <div class="dot d0"></div><div class="dot d1"></div><div class="dot d2"></div>
   <div class="lbl l1">PRICE INELASTIC</div><div class="lbl l2">PRICE ELASTIC</div></div>
 {names}
 {means}
</div>
<div class="coef"><span class="k muted ck">Coefficient</span>
 <span class="cv">0</span><span class="arr">→</span><span class="cv">−0.50</span><span class="arr">→</span><span class="cv">−1</span><span class="arr">→</span><span class="cv">−2.0</span><span class="arr">→</span><span class="cv">−∞</span>
 <span class="ex">Theatre tickets: −0.50, magnitude 0.50 → price inelastic</span></div>
"""
page("PED_06_Spectrum", 1500, 660, body, """
.top{position:relative;font-size:28px;margin:4px 8px 10px}
.top .k{font-size:28px}
.grid{position:relative;display:grid;grid-template-columns:250px 1fr 250px 1fr 250px;column-gap:0;row-gap:12px;margin:0 4px}
.v{font-size:52px;font-weight:800;text-align:center}
.v.rg{font-size:36px;align-self:end;opacity:.9}
.barrow{grid-column:1 / span 5;position:relative;height:76px}
.bar{position:absolute;left:125px;right:125px;top:14px;height:48px;border-radius:24px;
     background:linear-gradient(90deg,#1B3460 0%,#2F5D8C 30%,#B08A47 50%,#B0412E 72%,#7A2A1F 100%)}
.dot{position:absolute;top:2px;width:72px;height:72px;border-radius:50%;background:#FFFDFA;border:9px solid #0E1E3A;transform:translateX(-50%)}
.d0{left:125px}.d1{left:50%}.d2{left:calc(100% - 125px)}
.lbl{position:absolute;top:22px;font-size:28px;font-weight:800;color:#fff;letter-spacing:3px;transform:translateX(-50%)}
.l1{left:25.5%}.l2{left:74.5%}
.nm{font-size:30px;font-weight:800;text-align:center;line-height:1.15;padding:0 10px}
.me{font-size:26px;line-height:1.3;text-align:center;color:#3A4558;padding:0 14px}
.sh{margin-top:8px;display:inline-block;font-size:23px;font-weight:700;color:#8A6A2E;border-top:3px solid #E2D6BC;padding-top:6px}
.coef{position:relative;display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin:34px 8px 0}
.ck{font-size:24px}
.cv{font-size:30px;font-weight:800;background:#0E1E3A;color:#fff;border-radius:10px;padding:4px 16px}
.arr{font-size:28px;color:#B08A47;font-weight:900}
.ex{font-size:26px;margin-left:22px;color:#3A4558}
""")

# ============================================================ PED_11: TINS, with substitutes as the hub
body = """
<div class="sat" id="T"><div class="L serif">T</div><div><div class="nm">Time period</div><div class="tx">More time turns unavailable substitutes into available ones.</div><div class="ru">Longer period → more price elastic</div></div></div>
<div class="sat" id="I"><div class="L serif">I</div><div><div class="nm">Income proportion</div><div class="tx">A large share of the budget makes buyers search harder or cut back.</div><div class="ru">Larger share → more price elastic</div></div></div>
<div class="sat" id="N"><div class="L serif">N</div><div><div class="nm">Necessity</div><div class="tx">If buyers cannot do without it, they keep buying when the price rises.</div><div class="ru">More necessary → more price inelastic</div></div></div>
<div class="core" id="S"><div class="kk k">Key determinant</div><div class="SL serif">S</div><div class="cn">Substitutes</div><div class="cq">Can buyers switch?</div>
 <div class="cx">Number and closeness of alternatives, minus the cost of switching</div><div class="cr">More and closer substitutes → more price elastic</div></div>
<div class="out" id="o1">How easily buyers can <b>switch, delay or do without</b></div>
<div class="out" id="o2">Size of the <b>% response</b> in quantity demanded</div>
<div class="out fin" id="o3">|PED|</div>
<svg class="links" id="lk" width="1500" height="820"></svg>
"""
script = """
const s=document.getElementById('lk');arrowDefs(s,'#B08A47','ag');arrowDefs(s,'#0E1E3A','an');
const S=c(document.getElementById('S'));
for(const id of ['T','I','N']){const a=c(document.getElementById(id));
  const ang=Math.atan2(a.y-S.y,a.r-S.x);const ex=S.x+Math.cos(ang)*(S.r-S.x+6),ey=S.y+Math.sin(ang)*(S.r-S.x+6);
  s.insertAdjacentHTML('beforeend',`<line x1="${a.r+6}" y1="${a.y}" x2="${ex}" y2="${ey}" stroke="#B08A47" stroke-width="6" marker-end="url(#ag)"/>`);}
const o1=c(document.getElementById('o1')),o2=c(document.getElementById('o2')),o3=c(document.getElementById('o3'));
s.insertAdjacentHTML('beforeend',`<line x1="${S.r+6}" y1="${S.y}" x2="${o1.l-8}" y2="${o1.y}" stroke="#0E1E3A" stroke-width="6" marker-end="url(#an)"/>`);
s.insertAdjacentHTML('beforeend',`<line x1="${o1.x}" y1="${o1.b+4}" x2="${o2.x}" y2="${o2.t-8}" stroke="#0E1E3A" stroke-width="6" marker-end="url(#an)"/>`);
s.insertAdjacentHTML('beforeend',`<line x1="${o2.x}" y1="${o2.b+4}" x2="${o3.x}" y2="${o3.t-8}" stroke="#0E1E3A" stroke-width="6" marker-end="url(#an)"/>`);
"""
page("PED_11_TINS", 1500, 820, body, """
.sat{position:absolute;left:10px;width:470px;display:flex;gap:18px;background:#fff;border:3px solid #D9CCB0;border-radius:20px;padding:16px 18px}
#T{top:20px}#I{top:285px}#N{top:550px}
.L{flex:none;width:70px;height:70px;border-radius:16px;background:#1B3460;color:#fff;font-size:46px;font-weight:700;display:flex;align-items:center;justify-content:center}
.nm{font-size:31px;font-weight:800}
.tx{font-size:25px;line-height:1.3;color:#3A4558;margin-top:4px}
.ru{font-size:24px;font-weight:800;color:#8A6A2E;margin-top:8px}
.core{position:absolute;left:560px;top:120px;width:500px;height:580px;border-radius:250px;background:#0E1E3A;color:#fff;border:8px solid #B08A47;
      display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:30px 54px}
.kk{font-size:20px;color:#E2C98F}
.SL{font-size:130px;line-height:1;color:#E2C98F;font-weight:700}
.cn{font-size:44px;font-weight:800}
.cq{font-size:32px;color:#E2C98F;font-weight:700;margin-top:4px}
.cx{font-size:25px;line-height:1.35;margin-top:14px;opacity:.95}
.cr{margin-top:16px;font-size:24px;font-weight:800;background:#B08A47;color:#0E1E3A;border-radius:14px;padding:8px 16px}
.out{position:absolute;left:1130px;width:360px;font-size:27px;line-height:1.3;text-align:center;background:#F4EDDF;border-radius:18px;padding:16px 18px}
#o1{top:345px}#o2{top:525px}
.fin{top:690px;left:1210px;width:200px;font-size:44px;font-weight:800;background:#B0412E;color:#fff;padding:12px}
""", script)

# ============================================================ PED_16: TR is the area P x Q (25% price rise)
def panel(title, sub, q2, col, gain, loss, tr2, verdict, show_numbers=True):
    W0, H0 = 300, 210            # Q = 100, P = $40  ->  width 300 px, height 210 px
    w2 = W0 * q2 / 100; h2 = H0 * 1.25
    pad_l, base = 26, 330
    svg = [f'<svg width="450" height="350" viewBox="0 0 450 350">']
    svg.append(f'<rect x="{pad_l}" y="{base-h2:.1f}" width="{w2:.1f}" height="{h2-H0:.1f}" fill="#2E7D5B" opacity=".85"/>')
    svg.append(f'<rect x="{pad_l}" y="{base-H0}" width="{w2:.1f}" height="{H0}" fill="#C9CED6" opacity=".7"/>')
    if q2 < 100:
        svg.append(f'<rect x="{pad_l+w2:.1f}" y="{base-H0}" width="{W0-w2:.1f}" height="{H0}" fill="#B0412E" opacity=".85"/>')
    svg.append(f'<rect x="{pad_l}" y="{base-H0}" width="{W0}" height="{H0}" fill="none" stroke="#0E1E3A" stroke-width="4" stroke-dasharray="12 8"/>')
    svg.append(f'<rect x="{pad_l}" y="{base-h2:.1f}" width="{w2:.1f}" height="{h2:.1f}" fill="none" stroke="#0E1E3A" stroke-width="4"/>')
    if show_numbers:
        svg.append(f'<text x="{pad_l+w2/2:.1f}" y="{base-H0-(h2-H0)/2+10:.1f}" text-anchor="middle" font-size="27" font-weight="800" fill="#fff">+${gain:,}</text>')
        if q2 < 100:
            lx = pad_l + w2 + (W0 - w2) / 2
            if W0 - w2 > 110:
                svg.append(f'<text x="{lx:.1f}" y="{base-H0/2+10}" text-anchor="middle" font-size="27" font-weight="800" fill="#fff">−${loss:,}</text>')
            else:
                svg.append(f'<text x="{pad_l+W0+14}" y="{base-H0/2+10}" text-anchor="start" font-size="27" font-weight="800" fill="#B0412E">−${loss:,}</text>')
    else:
        svg.append(f'<text x="{pad_l+w2/2:.1f}" y="{base-H0-(h2-H0)/2+10:.1f}" text-anchor="middle" font-size="25" font-weight="800" fill="#fff">gain</text>')
        svg.append(f'<text x="{pad_l+w2+(W0-w2)/2:.1f}" y="{base-H0/2+10}" text-anchor="middle" font-size="25" font-weight="800" fill="#fff">loss</text>')
    svg.append('</svg>')
    nums = (f'<div class="pq"><span>P $40 → $50 <b class="g">+25%</b></span><span>QD 100 → {q2} <b class="r">−{100-q2}%</b></span></div>'
            if show_numbers else '<div class="pq"><span>price up, quantity down</span></div>')
    return (f'<div class="pan"><div class="pt" style="color:{col}">{title}</div><div class="ps">{sub}</div>{"".join(svg)}{nums}'
            f'<div class="tr" style="color:{col}">{tr2}</div><div class="vd">{verdict}</div></div>')

for g, l, t in [(10 * 90, 40 * 10, 4500), (10 * 50, 40 * 50, 2500)]:
    assert 4000 + g - l == t
assert round(-10 / 25, 2) == -0.40 and round(-50 / 25, 2) == -2.0
body = f"""
<div class="hd"><span class="k gold">TR = P × Q</span><span class="hdt">is the area of the rectangle. Dashed: before. Solid: after the price rise.</span></div>
<div class="row">
 {panel("Price inelastic", "PED = −10% ÷ +25% = −0.40", 90, "#2E7D5B", 900, 400, "TR $4,000 → $4,500", "gain &gt; loss: TR rises")}
 {panel("Unit elastic", "along a unit-elastic curve", 80, "#8A6A2E", 0, 0, "TR unchanged", "gain = loss: the effects offset", show_numbers=False)}
 {panel("Price elastic", "PED = −50% ÷ +25% = −2.0", 50, "#B0412E", 500, 2000, "TR $4,000 → $2,500", "loss &gt; gain: TR falls")}
</div>
<div class="key"><span class="sw g"></span>revenue gained on units still sold <span class="sw gr"></span>revenue kept <span class="sw r"></span>revenue lost on units no longer sold</div>
"""
page("PED_16_TR_Area", 1500, 760, body, """
.hd{position:relative;display:flex;align-items:baseline;gap:16px;margin:4px 10px 10px}
.hd .k{font-size:34px}.hdt{font-size:28px;color:#3A4558}
.row{position:relative;display:grid;grid-template-columns:1fr 1fr 1fr;gap:26px;margin:0 6px}
.pan{background:#fff;border-radius:22px;border:3px solid #E7DCC4;padding:16px 18px 18px;text-align:center}
.pt{font-size:36px;font-weight:800}
.ps{font-size:24px;color:#5B6577;font-weight:600;margin-top:2px}
.pq{display:flex;justify-content:center;gap:24px;font-size:25px;font-weight:600;color:#3A4558;margin-top:-6px}
.pq b{font-weight:800}.pq .g{color:#2E7D5B}.pq .r{color:#B0412E}
.tr{font-size:32px;font-weight:800;margin-top:10px}
.vd{font-size:25px;color:#3A4558;font-weight:600;margin-top:2px}
.key{position:relative;display:flex;align-items:center;gap:12px;justify-content:center;font-size:24px;color:#3A4558;margin-top:18px}
.sw{display:inline-block;width:30px;height:20px;border-radius:5px;margin-left:18px}
.sw.g{background:#2E7D5B}.sw.gr{background:#C9CED6}.sw.r{background:#B0412E}
""")

# ============================================================ PED_25: primary commodities vs manufactured products (HL)
rows = [
    ("T", "Time to adjust", "Years to redesign processes or switch inputs", "Purchase can simply be postponed"),
    ("I", "Share of spending", "Often a small share of the firm's total costs", "Often a large share of household income"),
    ("N", "Necessity", "Essential input: production stops without it", "An old laptop or car can be kept longer"),
    ("S", "Substitutes", "Few: little replaces crude oil, iron ore or copper", "Many rival makes and models"),
]
rws = "".join(f'<div class="cl">{p}</div><div class="mid"><div class="ml serif">{L}</div><div class="mn">{n}</div></div><div class="cr2">{m}</div>'
              for L, n, p, m in rows)
body = f"""
<div class="g">
 <div class="hp"><div class="ht">Primary commodity</div><div class="hb">Buyer: a <b>firm</b> buying an <b>input</b></div><div class="he">crude oil · iron ore · copper</div></div>
 <div class="hl"><span>HL</span></div>
 <div class="hm"><div class="ht">Manufactured product</div><div class="hb">Buyer: usually a <b>household</b></div><div class="he">laptop · car · watch</div></div>
 {rws}
 <div class="rp">|PED| generally <b>below 1</b><br>price inelastic</div>
 <div class="mid2">→ result ←</div>
 <div class="rm">|PED| generally <b>above 1</b><br>price elastic</div>
</div>
<div class="note"><b>A tendency, not a rule:</b> medicines are manufactured yet usually face price inelastic demand; one brand of rice faces close substitutes on the same shelf.</div>
"""
page("PED_25_Primary_vs_Manufactured", 1400, 980, body, """
.g{position:relative;display:grid;grid-template-columns:1fr 250px 1fr;column-gap:0;row-gap:14px;margin:4px}
.hp,.hm{border-radius:22px;padding:18px 24px;color:#fff}
.hp{background:#1B3460;text-align:right}.hm{background:#8A6A2E}
.ht{font-size:38px;font-weight:800}
.hb{font-size:27px;margin-top:4px;opacity:.95}
.he{font-size:24px;margin-top:6px;opacity:.85;letter-spacing:.5px}
.hl{display:flex;align-items:center;justify-content:center}
.hl span{font-size:34px;font-weight:800;color:#fff;background:#B0412E;border-radius:999px;padding:10px 26px;letter-spacing:2px}
.cl,.cr2{font-size:29px;line-height:1.3;padding:20px 26px;display:flex;align-items:center;border-radius:18px}
.cl{justify-content:flex-end;text-align:right;background:#EEF1F6;border-right:8px solid #1B3460}
.cr2{background:#F6EFE2;border-left:8px solid #B08A47}
.mid{display:flex;flex-direction:column;align-items:center;justify-content:center}
.ml{width:74px;height:74px;border-radius:50%;background:#0E1E3A;color:#E2C98F;font-size:44px;font-weight:700;display:flex;align-items:center;justify-content:center}
.mn{font-size:22px;font-weight:800;margin-top:6px;text-align:center;color:#0E1E3A}
.rp,.rm{font-size:31px;line-height:1.25;color:#fff;border-radius:20px;padding:18px 24px;margin-top:6px}
.rp{background:#2F5D8C;text-align:right}.rm{background:#B0412E}
.mid2{display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:800;color:#5B6577;margin-top:6px}
.note{position:relative;font-size:24px;line-height:1.35;color:#3A4558;margin:22px 8px 0}
""")

# ============================================================ PED_27: diagnostic list of ten errors
groups = [
    ("Calculating", [
        ("01", "Writing %ΔP on top", "Quantity is the numerator: PED = %ΔQD ÷ %ΔP"),
        ("03", "Dropping the sign without comment", "\"PED = −0.5; using its magnitude of 0.5, demand is price inelastic\""),
    ]),
    ("Wording", [
        ("02", "\"Elastic means QD falls when price rises\"", "That is the law of demand. Elastic means %ΔQD is proportionately larger than %ΔP"),
        ("04", "\"The product is elastic\"", "\"Demand for the product is price elastic\", in a stated market and period"),
        ("10", "Quoting one permanent PED", "PED depends on the buyer, the definition of the market and the time period"),
    ]),
    ("Diagrams", [
        ("05", "Mixing up shifts and movements", "A price change moves along D (quantity demanded); other factors shift D (demand)"),
        ("06", "\"A steep curve is inelastic\"", "Compare slopes only on the same axes and scale; PED changes along a straight line"),
    ]),
    ("Revenue and tax", [
        ("07", "\"A price cut always raises revenue\"", "Only if demand is price elastic over that range"),
        ("08", "Treating revenue as profit", "TR = P × Q. Profit also depends on costs"),
        ("09", "\"PED decides who pays a tax\"", "Incidence depends on PED relative to PES"),
    ]),
]
assert sorted(n for _, items in groups for n, _, _ in items) == [f"{i:02d}" for i in range(1, 11)]
html_rows = []
for gname, items in groups:
    html_rows.append(f'<div class="cat" style="grid-row:span {len(items)}"><span>{gname}</span></div>')
    for n, err, fix in items:
        html_rows.append(f'<div class="no">{n}</div><div class="er"><span class="x">✗</span>{err}</div><div class="fx"><span class="ok">✓</span>{fix}</div>')
body = f"""
<div class="hdr"><div></div><div></div><div class="h1 dep">The error</div><div class="h2 app">What earns the mark</div></div>
<div class="tb">{''.join(html_rows)}</div>
"""
page("PED_27_Errors", 1760, 900, body, """
.hdr,.tb{position:relative;display:grid;grid-template-columns:170px 66px 600px 1fr;column-gap:12px;margin:0 4px}
.hdr{margin-bottom:8px}
.h1,.h2{font-size:24px;font-weight:800;letter-spacing:3px;text-transform:uppercase}
.tb{row-gap:10px}
.cat{display:flex;align-items:center;justify-content:center;background:#0E1E3A;border-radius:16px;color:#E2C98F;font-size:25px;font-weight:800;text-align:center;padding:8px;line-height:1.2}
.no{font-family:Lora,Georgia,serif;font-size:34px;font-weight:700;color:#B08A47;display:flex;align-items:center;justify-content:center}
.er,.fx{font-size:27px;line-height:1.25;border-radius:14px;padding:11px 16px;display:flex;align-items:center;gap:12px}
.er{background:#F8E7E3;color:#7A2A1F;font-weight:700}
.fx{background:#E5F1EA;color:#163F2E;font-weight:600}
.x{font-size:28px;color:#B0412E;font-weight:900;flex:none}
.ok{font-size:28px;color:#2E7D5B;font-weight:900;flex:none}
""")

# ============================================================ PED_28: radial revision map
clusters = [
    ("c1", "Measure", "4, 5, 22", ["PED = %ΔQD ÷ %ΔP", "%Δ from the initial value", "negative coefficient, classify by |PED|"]),
    ("c2", "Degrees and diagrams", "6 to 8", ["0 · below 1 · 1 · above 1 · ∞", "relatively elastic vs inelastic", "vertical · hyperbola · horizontal"]),
    ("c3", "TINS determinants", "11 to 15, 26", ["Time · Income share · Necessity", "Substitutes: the key one", "switching costs: less elastic"]),
    ("c4", "Total revenue", "16 to 18", ["inelastic: P and TR move together", "elastic: they move in opposite directions", "unit elastic: TR unchanged"]),
    ("c5", "Firms", "19, 26", ["price discrimination: groups", "dynamic pricing: times", "revenue is not profit"]),
    ("c6", "Government", "20, 21", ["tax revenue = tax × Q traded", "incidence: PED relative to PES"]),
    ("c7", "HL extensions", "9, 10, 25", ["linear D: |PED| = (1/b)(P/Q)", "|PED| = 1 at the midpoint", "primary vs manufactured"]),
]
cl_html = "".join(
    f'<div class="cl" id="{cid}"><div class="ch" id="{cid}h"><span class="cn">{name}</span><span class="cs">{sl}</span></div>'
    + "".join(f'<div class="lf">{x}</div>' for x in leaves) + '</div>'
    for cid, name, sl, leaves in clusters)
body = f"""
{cl_html}
<div class="hub" id="hub"><div class="hk k">IB 2.5 · SL and HL</div><div class="ht serif">Price elasticity of demand</div><div class="hf">PED = %ΔQD ÷ %ΔP</div></div>
<div class="key"><div class="kk2 k">Key relationships</div><div class="kf">%ΔQD = PED × %ΔP</div><div class="kf">TR = P × Q</div></div>
<div class="foot">Numbers in each branch show the slides to revisit.</div>
<svg class="links" id="lk" width="1760" height="900"></svg>
"""
script = """
const s=document.getElementById('lk');const H=c(document.getElementById('hub'));
const rx=(H.r-H.l)/2, ry=(H.b-H.t)/2;
for(const id of ['c1','c2','c3','c4','c5','c6','c7']){const h=c(document.getElementById(id+'h'));
  let x1,y1,x2,y2;
  if(h.x<H.l){x2=h.r;y2=h.y;}else if(h.x>H.r){x2=h.l;y2=h.y;}else{x2=h.x;y2=h.t;}
  const th=Math.atan2((y2-H.y)/ry,(x2-H.x)/rx);x1=H.x+rx*Math.cos(th);y1=H.y+ry*Math.sin(th);
  const mx=(x1+x2)/2;
  const d=(Math.abs(x2-x1)>Math.abs(y2-y1))?`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`:`M${x1},${y1} C${x1},${(y1+y2)/2} ${x2},${(y1+y2)/2} ${x2},${y2}`;
  s.insertAdjacentHTML('beforeend',`<path d="${d}" fill="none" stroke="#B08A47" stroke-width="6" stroke-linecap="round"/>`);
  s.insertAdjacentHTML('beforeend',`<circle cx="${x2}" cy="${y2}" r="8" fill="#B08A47"/>`);}
"""
page("PED_28_Revision_Map", 1760, 900, body, """
.cl{position:absolute;width:470px}
.ch{display:flex;align-items:baseline;justify-content:space-between;gap:10px;background:#1B3460;color:#fff;border-radius:16px;padding:10px 18px;margin-bottom:8px}
.cn{font-size:31px;font-weight:800}
.cs{font-size:21px;font-weight:700;color:#E2C98F;white-space:nowrap}
.lf{font-size:27px;line-height:1.25;padding:5px 4px 5px 18px;border-left:5px solid #E2D6BC;margin-left:12px;color:#22304A}
#c1{left:10px;top:10px}#c2{left:10px;top:315px}#c3{left:10px;top:620px}
#c4{left:1280px;top:10px}#c5{left:1280px;top:315px}#c6{left:1280px;top:620px}
#c7{left:645px;top:600px}
#c7 .ch{background:#B0412E}
.hub{position:absolute;left:640px;top:290px;width:480px;height:250px;border-radius:125px;background:#0E1E3A;border:7px solid #B08A47;color:#fff;
     display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:10px 30px}
.hk{font-size:19px;color:#E2C98F}
.ht{font-size:40px;font-weight:700;line-height:1.1;margin:8px 0}
.hf{font-size:26px;font-weight:700;color:#E2C98F}
.foot{position:absolute;left:630px;top:858px;width:500px;text-align:center;font-size:21px;color:#5B6577}
.key{position:absolute;left:690px;top:40px;width:380px;border:3px dashed #D9CCB0;border-radius:20px;padding:16px 20px;text-align:center}
.kk2{font-size:19px;color:#8A6A2E;margin-bottom:8px}
.kf{font-size:30px;font-weight:800;margin:4px 0}
""", script)
