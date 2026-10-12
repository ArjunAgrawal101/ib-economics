"""Revision map infographic for card 38 (v3 family, borderless, transparent).
Rows use flexbox so each row's boxes share a height; connector lines are drawn after layout."""
import os
W, H = 1300, 760   # H is generous; the PNG is autocropped after rendering
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "html4", "v3_38_Revision_Map.html")

top = [
    (1, "Determination", "Demand for and supply of ₹ set a floating rate; the price mechanism removes surpluses and shortages", "Cards 4 to 6"),
    (2, "Changes", "Appreciation and depreciation; four curve shifts; movement along versus shift", "Cards 7 to 9 and 12"),
    (3, "Calculations", "Convert prices between currencies; percentage change (flip the quote for the other currency)", "Cards 10 and 11"),
]
bottom = [
    (4, "Determinants", "Trade, investment, remittances, speculation, relative inflation, interest and growth rates, intervention", "Cards 13 to 22"),
    (5, "Consequences", "Demand and cost channels; inflation, growth, jobs, current account; winners and losers", "Cards 23 to 29"),
    (6, "Systems", "Fixed (reserves, devaluation, revaluation); managed (bands, over and undervaluation); floating", "Cards 30 to 35"),
    (7, "Fixed or floating?", "The trade-offs of each system, and which system suits which economy", "Cards 36 and 37 · HL only"),
]

def node(n, label, text, cards):
    return (f'<div class="node"><div class="head"><span class="num">{n}</span><span class="label">{label}</span></div>'
            f'<div class="text">{text}</div><div class="cards">{cards}</div></div>')

html = f'''<!doctype html><html data-size="{W}x{H}"><head><meta charset="utf-8"><style>
*{{box-sizing:border-box;margin:0;padding:0}}
html,body{{background:transparent}}
body{{width:{W}px;height:{H}px;position:relative;font-family:Inter,'Helvetica Neue',Arial,sans-serif;color:#0E1E3A}}
svg{{position:absolute;left:0;top:0;z-index:0}}
.row{{position:relative;z-index:1;display:flex;gap:28px;align-items:stretch;padding:4px}}
.node{{flex:1;background:#FFFFFF;border:3px solid #1B3460;border-radius:18px;padding:14px 18px 14px;display:flex;flex-direction:column}}
.head{{display:flex;align-items:center;gap:12px}}
.num{{flex:none;width:36px;height:36px;border-radius:50%;background:#B08A47;color:#fff;font-weight:700;font-size:21px;display:flex;align-items:center;justify-content:center}}
.label{{font-weight:700;font-size:27px;line-height:1.1;white-space:nowrap}}
.text{{font-size:22px;line-height:1.27;margin-top:9px;flex:1}}
.cards{{font-size:18px;font-weight:700;color:#8A6A2E;letter-spacing:.4px;margin-top:8px}}
.band{{position:relative;z-index:1;height:150px;display:flex;align-items:center;justify-content:center}}
.hub{{width:330px;height:88px;border-radius:44px;background:#0E1E3A;border:4px solid #B08A47;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center}}
.hub .t{{font-family:Lora,Georgia,serif;font-size:37px;font-weight:700;line-height:1}}
.hub .s{{font-size:16px;letter-spacing:3px;color:#E2C98F;margin-top:6px;font-weight:700}}
</style></head><body>
<svg id="lines" width="{W}" height="{H}"></svg>
<div class="row" id="top">{"".join(node(*t) for t in top)}</div>
<div class="band"><div class="hub" id="hub"><div class="t">Exchange rates</div><div class="s">IB UNIT 4.5</div></div></div>
<div class="row" id="bottom">{"".join(node(*b) for b in bottom)}</div>
<script>
const svg=document.getElementById('lines'), hub=document.getElementById('hub').getBoundingClientRect();
const cx=hub.left+hub.width/2; let out='';
function link(el, fromTop){{
  const r=el.getBoundingClientRect(), x=r.left+r.width/2, y=fromTop? r.bottom : r.top;
  const hx=cx+(x-cx)*0.38, hy=fromTop? hub.top : hub.bottom;
  out+=`<line x1="${{x}}" y1="${{y}}" x2="${{hx}}" y2="${{hy}}" stroke="#B08A47" stroke-width="4" stroke-linecap="round"/>`+
       `<circle cx="${{x}}" cy="${{y}}" r="7" fill="#B08A47"/>`;
}}
document.querySelectorAll('#top .node').forEach(n=>link(n,true));
document.querySelectorAll('#bottom .node').forEach(n=>link(n,false));
svg.innerHTML=out;
</script>
</body></html>'''
open(OUT, "w").write(html)
print("wrote", OUT)
