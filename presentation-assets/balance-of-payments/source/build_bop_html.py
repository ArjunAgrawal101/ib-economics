"""Balance of Payments deck: infographics as HTML (rendered to transparent PNG by Chromium).
Brand: navy #0E1E3A / antique gold #B08A47 on the Dune ivory card. Account colour code is always
paired with the account name, so colour is never the only cue."""
import os
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "html")
os.makedirs(OUT, exist_ok=True)

CSS = """
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:transparent}
body{position:relative;font-family:Inter,'Helvetica Neue',Arial,sans-serif;color:#0E1E3A}
.serif{font-family:Lora,Georgia,serif}
.k{font-size:22px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase}
.muted{color:#5B6577}.gold{color:#8A6A2E}.app{color:#2E7D5B}.dep{color:#B0412E}.cb{color:#2F5D8C}.navy{color:#1B3460}
.tile{background:#FFFFFF;border:3px solid #1B3460;border-radius:18px;padding:14px 18px}
.pill{display:inline-block;border-radius:999px;padding:5px 16px;font-weight:800;color:#fff;font-size:20px;letter-spacing:1px}
.bg-cur{background:#1B3460}.bg-cap{background:#8A6A2E}.bg-fin{background:#2F5D8C}.bg-app{background:#2E7D5B}.bg-dep{background:#B0412E}.bg-ink{background:#0E1E3A}
.b-cur{border-color:#1B3460}.b-cap{border-color:#8A6A2E}.b-fin{border-color:#2F5D8C}.b-app{border-color:#2E7D5B}.b-dep{border-color:#B0412E}.b-gold{border-color:#B08A47}
.t{font-size:26px;font-weight:800;line-height:1.15}
.s{font-size:23px;line-height:1.3}
.xs{font-size:20px;line-height:1.3}
.arrow{color:#B08A47;font-weight:900}
"""


def page(name, w, h, body, extra=""):
    html = (f'<!doctype html><html data-size="{w}x{h}"><head><meta charset="utf-8"><style>{CSS}'
            f'body{{width:{w}px;height:{h}px}}{extra}</style></head><body>{body}</body></html>')
    with open(os.path.join(OUT, name + ".html"), "w") as f:
        f.write(html)
    print("wrote", name)


# ------------------------------------------------------------------ B01 transaction map (card 3)
lanes = [
    ("cur", "Current", "Goods", "exports and imports of physical products"),
    ("cur", "Current", "Services", "tourism, transport, IT, insurance, education"),
    ("cur", "Current", "Income", "wages, interest, profits, dividends"),
    ("cur", "Current", "Current transfers", "remittances, gifts, aid for current use"),
    ("cap", "Capital", "Capital transfers and non-produced assets", "debt forgiveness, investment grants, land, rights, licences"),
    ("fin", "Financial", "Financial assets", "FDI, portfolio investment, reserve assets, official borrowing"),
]
rows = "".join(
    f'<div class="lane"><span class="pill bg-{c}">{acc}</span>'
    f'<div class="lt"><b>{t}</b><span class="muted"> · {d}</span></div></div>' for c, acc, t, d in lanes)
body = f"""
<div class="side left tile b-gold"><div class="k gold">India's residents</div>
<div class="s" style="margin-top:12px">Households<br>Firms<br>Government<br>Reserve Bank of India</div></div>
<div class="mid">
 <div class="dir"><span>◀ money into India: <b class="app">credit (+)</b></span></div>
 {rows}
 <div class="dir" style="justify-content:flex-end"><span>money out of India: <b class="dep">debit (−)</b> ▶</span></div>
</div>
<div class="side right tile b-gold"><div class="k gold">Rest of the world</div>
<div class="s" style="margin-top:12px">Non-resident households, firms, governments and institutions</div></div>
<div class="foot xs muted">Recorded for a period, usually a year (also quarterly). A resident lives or operates in the economy, usually for a year or more.</div>
"""
page("BoP_03_Transaction_Map", 1500, 700, body, """
.side{position:absolute;top:70px;width:250px;height:500px;display:flex;flex-direction:column;justify-content:center}
.left{left:4px}.right{right:4px}
.mid{position:absolute;left:280px;right:280px;top:20px}
.lane{display:flex;align-items:center;gap:16px;margin:12px 0;padding:12px 16px;border-top:3px solid #B08A47;border-bottom:3px solid #B08A47;position:relative}
.lane:before,.lane:after{content:'';position:absolute;top:50%;width:0;height:0;border-top:14px solid transparent;border-bottom:14px solid transparent;transform:translateY(-50%)}
.lane:before{left:-22px;border-right:20px solid #B08A47}.lane:after{right:-22px;border-left:20px solid #B08A47}
.lane .pill{flex:none;width:130px;text-align:center;font-size:18px}
.lt{font-size:23px;line-height:1.25}
.dir{display:flex;justify-content:space-between;font-size:22px;font-weight:600;padding:2px 6px}
.foot{position:absolute;left:280px;right:280px;bottom:8px;text-align:center}
""")

# ------------------------------------------------------------------ B02 credits and debits ledger (card 4)
pairs = [
    ("Goods", "Basmati rice exported to Saudi Arabia", "Crude oil imported from the UAE"),
    ("Services", "A US bank buys IT services from a Bengaluru firm", "An Indian student pays university fees in Australia"),
    ("Income", "A UK company pays dividends to an Indian shareholder", "A foreign carmaker in Chennai sends profits home"),
    ("Current transfers", "A nurse in Dubai sends money to her family in Kerala", "A foreign worker in Mumbai sends money home"),
    ("FDI", "A Japanese firm builds a factory in Gujarat", "An Indian firm buys a company in the UK"),
    ("Reserve assets", "The RBI sells US$ from its reserves (it buys ₹)", "The RBI buys US$ for its reserves (it sells ₹)"),
]
rr = "".join(f'<div class="c s">{a}</div><div class="tag">{k}</div><div class="d s">{b}</div>' for k, a, b in pairs)
body = f"""
<div class="grid">
 <div class="h hc"><div class="t app">CREDIT (+)</div><div class="xs">Money flows <b>into</b> India · creates <b>demand for ₹</b></div></div>
 <div></div>
 <div class="h hd"><div class="t dep">DEBIT (−)</div><div class="xs">Money flows <b>out of</b> India · creates <b>supply of ₹</b></div></div>
 {rr}
</div>
<div class="foot"><b>Balance on an account = credits − debits</b> &nbsp;·&nbsp; positive = <b class="app">surplus</b> &nbsp;·&nbsp; negative = <b class="dep">deficit</b></div>
"""
page("BoP_04_Credits_Debits", 1500, 760, body, """
.grid{position:relative;margin:4px;display:grid;grid-template-columns:1fr 200px 1fr;column-gap:16px;row-gap:12px;align-items:stretch}
.h{padding:12px 20px;border-radius:16px;background:#FFFFFF;border:3px solid}
.hc{border-color:#2E7D5B}.hd{border-color:#B0412E}
.c{border-left:8px solid #2E7D5B;padding:10px 18px;background:#FFFFFF;border-radius:10px}
.d{border-right:8px solid #B0412E;padding:10px 18px;background:#FFFFFF;border-radius:10px;text-align:right}
.tag{display:flex;align-items:center;justify-content:center;text-align:center;font-weight:800;font-size:21px;color:#8A6A2E;letter-spacing:.5px}
.foot{position:relative;margin-top:20px;text-align:center;font-size:25px}
""")

# ------------------------------------------------------------------ B03 classification decision tree (card 5)
def comp(name, rule):
    return f'<div class="comp"><div class="cn">{name}</div><div class="cr">{rule}</div></div>'
branches = [
    ("cur", "Current account", "Something produced or earned, or a one-way gift for current use",
     [comp("Goods", "a physical product"), comp("Services", "an activity: travel, transport, IT, insurance"),
      comp("Income", "a return on labour or capital: wages, interest, profits, dividends"),
      comp("Current transfers", "nothing given in return: remittances, gifts, aid")]),
    ("cap", "Capital account", "A one-off capital gift, or a right to something never produced",
     [comp("Capital transfers", "debt forgiveness, investment grants"),
      comp("Non-produced, non-financial assets", "land, natural-resource rights, licences, brand names")]),
    ("fin", "Financial account", "Ownership of a financial asset, or a loan",
     [comp("FDI", "a lasting stake with influence or control (10%+ of voting shares)"),
      comp("Portfolio investment", "shares or bonds: under 10%, no lasting interest"),
      comp("Reserve assets", "the central bank's foreign currency and gold"),
      comp("Official borrowing", "loans to or from a government")]),
]
cols = "".join(
    f'<div class="col"><div class="q xs">{q}</div><div class="down arrow">▼</div>'
    f'<div class="acc bg-{c}">{a}</div><div class="comps b-{c}">{"".join(items)}</div></div>'
    for c, a, q, items in branches)
body = f"""
<div class="step1"><span class="pill bg-ink">STEP 1</span> <b>What is being exchanged?</b></div>
<div class="cols">{cols}</div>
<div class="step2"><span class="pill bg-ink">STEP 2</span> <b>Which way does the money go?</b> &nbsp; Into India → <b class="app">credit (+)</b> &nbsp;·&nbsp; Out of India → <b class="dep">debit (−)</b></div>
"""
page("BoP_05_Classify_Tree", 1500, 860, body, """
.step1,.step2{position:relative;text-align:center;font-size:27px}
.step1{margin-top:4px}.step2{margin-top:18px}
.cols{position:relative;margin:14px 4px 0;display:grid;grid-template-columns:1fr 1fr 1fr;gap:22px}
.col{display:flex;flex-direction:column}
.q{text-align:center;font-size:22px;font-weight:600;min-height:58px;display:flex;align-items:flex-end;justify-content:center;padding:0 8px}
.down{text-align:center;font-size:26px;line-height:1.1}
.acc{color:#fff;font-weight:800;font-size:27px;text-align:center;padding:10px;border-radius:14px 14px 0 0;letter-spacing:.5px}
.comps{flex:1;border:3px solid;border-top:none;border-radius:0 0 14px 14px;background:#fff;padding:6px 16px}
.comp{padding:9px 0;border-bottom:2px solid #EEE6D6}.comp:last-child{border-bottom:none}
.cn{font-weight:800;font-size:23px}.cr{font-size:21px;color:#5B6577;line-height:1.25;margin-top:2px}
""")

# ------------------------------------------------------------------ B04 three-account architecture (card 6)
def acc_col(c, name, what, size, comps):
    items = "".join(f'<div class="row"><div class="rn">{n}</div><div class="re">{e}</div></div>' for n, e in comps)
    return (f'<div class="acol b-{c}"><div class="ah bg-{c}"><div class="an">{name}</div><div class="aw">{what}</div></div>'
            f'<div class="sz">{size}</div>{items}</div>')
body = f"""
<div class="top"><div class="tt serif">Balance of payments</div>
<div class="ts">every transaction between residents and the rest of the world in a period</div></div>
<div class="stem"></div>
<div class="cols">
{acc_col("cur", "Current account", "trade and income flows", "Usually the largest account",
         [("Trade in goods", "merchandise exports and imports"), ("Trade in services", "IT, travel, transport, insurance"),
          ("Income", "wages, interest, profits, dividends"), ("Current transfers", "remittances, aid, gifts")])}
{acc_col("cap", "Capital account", "capital transfers and non-produced assets", "Usually very small",
         [("Capital transfers", "debt forgiveness, investment grants"),
          ("Non-produced, non-financial assets", "embassy land, resource rights, licences, brands")])}
{acc_col("fin", "Financial account", "changes in who owns assets", "Can be large and volatile",
         [("Foreign direct investment", "lasting stakes with influence or control"), ("Portfolio investment", "shares and bonds"),
          ("Reserve assets", "central bank's foreign currency and gold"), ("Official borrowing", "government loans from or to abroad")])}
</div>
<div class="eo">+ <b>Errors and omissions</b>: a balancing item &nbsp;·&nbsp; <b>Current + Capital + Financial + Errors and omissions = 0</b></div>
"""
page("BoP_06_Architecture", 1500, 820, body, """
.top{position:relative;margin:0 330px;background:#0E1E3A;color:#fff;border-radius:18px;padding:12px 20px;text-align:center;border:4px solid #B08A47}
.tt{font-size:36px;font-weight:700}.ts{font-size:20px;color:#E2C98F;margin-top:4px}
.stem{position:relative;margin:0 250px;height:28px;border:4px solid #B08A47;border-bottom:none;border-radius:14px 14px 0 0}

.cols{position:relative;margin:0 4px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:22px}
.acol{border:3px solid;border-radius:18px;background:#fff;overflow:hidden;display:flex;flex-direction:column}
.ah{color:#fff;padding:12px 18px}.an{font-size:29px;font-weight:800}.aw{font-size:20px;opacity:.92;margin-top:2px}
.sz{font-size:19px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:#8A6A2E;padding:10px 18px 2px}
.row{padding:9px 18px;border-top:2px solid #EEE6D6}.row:first-of-type{border-top:none}
.rn{font-size:23px;font-weight:800}.re{font-size:20px;color:#5B6577;margin-top:2px}
.eo{position:relative;margin-top:16px;text-align:center;font-size:24px}
""")

# ------------------------------------------------------------------ B06 why the accounts reconcile (card 22)
scale_svg = """
<svg width="640" height="440" viewBox="0 0 640 440" xmlns="http://www.w3.org/2000/svg">
 <polygon points="320,170 270,400 370,400" fill="#0E1E3A"/>
 <rect x="230" y="398" width="180" height="16" rx="6" fill="#0E1E3A"/>
 <line x1="60" y1="150" x2="580" y2="150" stroke="#B08A47" stroke-width="12" stroke-linecap="round"/>
 <circle cx="320" cy="150" r="16" fill="#B08A47" stroke="#FFFDFA" stroke-width="5"/>
 <line x1="100" y1="150" x2="40" y2="290" stroke="#8A6A2E" stroke-width="4"/><line x1="100" y1="150" x2="160" y2="290" stroke="#8A6A2E" stroke-width="4"/>
 <line x1="540" y1="150" x2="480" y2="290" stroke="#8A6A2E" stroke-width="4"/><line x1="540" y1="150" x2="600" y2="290" stroke="#8A6A2E" stroke-width="4"/>
 <path d="M10,290 Q100,350 190,290 Z" fill="#2E7D5B"/><path d="M450,290 Q540,350 630,290 Z" fill="#B0412E"/>
</svg>"""
body = f"""
<div class="scale">{scale_svg}
 <div class="lp"><div class="t app">All credits (+)</div><div class="xs">= demand for ₹</div></div>
 <div class="rp"><div class="t dep">All debits (−)</div><div class="xs">= supply of ₹</div></div>
 <div class="fl xs">held level by the exchange rate,<br>or by the central bank's reserve assets</div>
</div>
<div class="right">
 <div class="k gold">The identity</div>
 <div class="eq">Current account + Capital account + Financial account + Errors and omissions <b>= 0</b></div>
 <div class="k gold" style="margin-top:22px">Check it: Country X</div>
 <div class="nums"><span>(+5)</span><span>+</span><span>(+2)</span><span>+</span><span>(−8)</span><span>+</span><span>(+1)</span><span>=</span><b>0</b></div>
 <div class="lab xs muted"><span>current</span><span></span><span>capital</span><span></span><span>financial</span><span></span><span>E and O</span></div>
 <div class="three">
  <div><b>Credits matched by debits</b></div><div><b>Deficits matched by surpluses</b></div><div><b>Zero overall balance</b></div>
 </div>
</div>
"""
page("BoP_22_Reconcile", 1500, 640, body, """
.scale{position:absolute;left:0;top:40px;width:640px;height:520px}
.scale svg{position:absolute;left:0;top:60px}
.lp,.rp{position:absolute;top:30px;width:240px;text-align:center}.lp{left:-20px}.rp{left:420px}
.fl{position:absolute;left:150px;width:340px;top:490px;text-align:center;font-weight:600}
.right{position:absolute;left:690px;right:4px;top:40px}
.eq{font-size:31px;font-weight:600;line-height:1.3;margin-top:8px;padding:16px 20px;border:3px solid #B08A47;border-radius:16px;background:#fff}
.nums{display:grid;grid-template-columns:repeat(9,auto);justify-content:start;gap:14px;font-size:40px;font-weight:800;margin-top:10px;align-items:end}
.lab{display:grid;grid-template-columns:repeat(9,auto);justify-content:start;gap:14px;margin-top:2px}
.three{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-top:26px}
.three div{background:#0E1E3A;color:#fff;border-radius:14px;padding:12px 14px;font-size:22px;text-align:center}
""")

# ------------------------------------------------------------------ B07 interdependence flow (card 24)
def flow(cls, items):
    out = []
    for i, (h, s) in enumerate(items):
        out.append(f'<div class="fb tile b-{cls}"><div class="fh">{h}</div><div class="xs">{s}</div></div>')
        if i < len(items) - 1:
            out.append('<div class="fa arrow">▶</div>')
    return "".join(out)
body = f"""
<div class="rowlab dep">IF THE CURRENT ACCOUNT IS IN DEFICIT</div>
<div class="flow">{flow("dep", [("Current account deficit", "India spends more abroad than it earns: it uses more output than it produces"),
                               ("Extra foreign currency needed", "to pay for the excess of imports"),
                               ("Financial account surplus", "FDI and portfolio inflows, official borrowing, or reserves run down"),
                               ("More foreign claims on India", "foreign-owned assets and external debt rise")])}</div>
<div class="rowlab app">IF THE CURRENT ACCOUNT IS IN SURPLUS</div>
<div class="flow">{flow("app", [("Current account surplus", "earns more abroad than it spends: produces more than it uses"),
                               ("Extra foreign currency earned", "from the excess of exports"),
                               ("Financial account deficit", "investing and lending abroad, or adding to reserves"),
                               ("More claims on the rest of the world", "assets owned abroad rise")])}</div>
<div class="note"><b>Identity, not a cause.</b> The identity says the totals must match. It does not say which comes first: a deficit can attract financing, and strong capital inflows can raise the ₹ and widen the deficit.</div>
"""
page("BoP_24_Interdependence", 1500, 760, body, """
.rowlab{position:relative;margin:0 4px 8px;font-size:21px;font-weight:800;letter-spacing:2px}
.flow{position:relative;margin:0 4px 24px;display:grid;grid-template-columns:1fr 46px 1fr 46px 1fr 46px 1fr;align-items:stretch}
.fb{display:flex;flex-direction:column;gap:6px;padding:14px 16px}
.fh{font-size:24px;font-weight:800;line-height:1.15}
.fa{display:flex;align-items:center;justify-content:center;font-size:30px}
.note{position:relative;margin:4px;background:#0E1E3A;color:#fff;border-radius:16px;padding:16px 22px;font-size:23px;line-height:1.35;border-left:10px solid #B08A47}
""")

# ------------------------------------------------------------------ B11 persistent deficit map (card 27)
tiles = [
    ("Exchange rate", "More ₹ supplied to pay for imports → downward pressure → dearer imports and imported inflation"),
    ("Interest rates", "The central bank may raise rates to attract inflows → dearer borrowing, slower AD"),
    ("Foreign ownership", "Assets sold to foreigners to finance it → future profits flow out as income debits"),
    ("Debt", "Borrowing from abroad → interest payments (income debits) → debt can snowball"),
    ("Credit ratings", "Rising external debt can lower ratings → higher interest on future loans"),
    ("Demand management", "Pressure for contractionary fiscal or monetary policy to cut imports"),
    ("Economic growth", "Slower if policy tightens or confidence falls; can be faster if the deficit funds productive investment"),
]
tt = "".join(f'<div class="tl tile b-cur"><div class="th">{h}</div><div class="xs">{s}</div></div>' for h, s in tiles)
body = f"""
<div class="hub">Persistent current account deficit <span class="hs">possible implications</span></div>
<div class="tiles">{tt}</div>
<div class="bar"><div class="lw"><b>Less worrying when</b> it is small and stable, financed by long-term FDI, and funds investment in capacity</div>
<div class="mw"><b>More worrying when</b> it is large and rising, financed by short-term borrowing or 'hot money', and funds consumption</div></div>
"""
page("BoP_27_Persistent_Deficit", 1500, 780, body, """
.hub{position:relative;margin:0 300px;text-align:center;background:#0E1E3A;color:#fff;border:4px solid #B08A47;border-radius:40px;padding:12px;font-size:28px;font-weight:800}
.hs{display:block;font-size:18px;color:#E2C98F;letter-spacing:2px;text-transform:uppercase;margin-top:2px}
.tiles{position:relative;margin:22px 4px 0;display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.tl{padding:12px 16px}.th{font-size:24px;font-weight:800;margin-bottom:6px}
.tiles .tl:nth-child(n+5){transform:translateX(50%)}
.bar{position:relative;margin:22px 4px 4px;display:grid;grid-template-columns:1fr 1fr;gap:16px}
.lw,.mw{border-radius:14px;padding:14px 18px;font-size:22px;line-height:1.3;background:#fff;border:3px solid}
.lw{border-color:#2E7D5B}.mw{border-color:#B0412E}
.lw b{color:#2E7D5B}.mw b{color:#B0412E}
""")

# ------------------------------------------------------------------ B12 policy decision framework (card 32)
routes = [
    ("dep", "Spending is outrunning output", "boom, demand-pull inflation, high imports of consumer goods",
     "Expenditure reducing", "the economy is overheating, so cutting AD costs little output",
     "slower growth and job losses if there is no excess demand"),
    ("cap", "Exports and imports are uncompetitive on price", "costs or the exchange rate are too high",
     "Expenditure switching", "|PEDx| + |PEDm| > 1 and domestic substitutes exist",
     "imported inflation, retaliation, a J‑curve delay"),
    ("fin", "Productivity and quality are weak", "structural reliance on imported goods and inputs",
     "Supply-side policies", "the government can fund them and wait for results",
     "slow, costly and uncertain; opportunity cost of public money"),
]
rc = "".join(
    f'<div class="rt"><div class="cause tile b-{c}"><div class="cl k muted">If the cause is</div><div class="ct">{a}</div><div class="xs muted">{b}</div></div>'
    f'<div class="dn arrow">▼</div><div class="pol bg-{c}">{p}</div>'
    f'<div class="wk tile b-{c}"><div class="xs"><b class="app">Works best when</b> {w}</div>'
    f'<div class="xs" style="margin-top:8px"><b class="dep">Main risk:</b> {r}</div></div></div>'
    for c, a, b, p, w, r in routes)
body = f"""
<div class="start"><span class="pill bg-ink">START</span> <b>What is causing the deficit?</b></div>
<div class="routes">{rc}</div>
<div class="also"><b>Then check:</b> imported raw materials and capital goods · spare capacity · fiscal space · time lags · retaliation · who bears the cost</div>
"""
page("BoP_32_Policy_Choice", 1500, 800, body, """
.start{position:relative;text-align:center;font-size:28px}
.routes{position:relative;margin:16px 4px 0;display:grid;grid-template-columns:1fr 1fr 1fr;gap:22px}
.rt{display:flex;flex-direction:column}
.cause{padding:12px 16px;min-height:150px}.ct{font-size:25px;font-weight:800;margin:4px 0}
.cl{font-size:17px}
.dn{text-align:center;font-size:26px;line-height:1.2}
.pol{color:#fff;font-weight:800;font-size:27px;text-align:center;padding:12px;border-radius:14px}
.wk{margin-top:12px;flex:1;padding:12px 16px}
.also{position:relative;margin:18px 4px 4px;text-align:center;font-size:23px;border-top:3px solid #B08A47;padding-top:14px}
""")

# ------------------------------------------------------------------ B13 Marshall-Lerner illustration (card 33)
def panel(title, sub, x_after, m_after, tb, good, pedx, pedm):
    mx = 112.0
    def bar(lbl, before, after, col, work):
        return (f'<div class="br"><div class="bl">{lbl}</div>'
                f'<div class="track"><div class="b0" style="width:{before/mx*100:.1f}%"></div><span class="v0">₹{before:.0f}</span></div>'
                f'<div class="track"><div class="b1" style="width:{after/mx*100:.1f}%;background:{col}"></div><span class="v1">₹{after:.1f}</span></div>'
                f'<div class="wkx xs muted">{work}</div></div>')
    col = "#2E7D5B" if good else "#B0412E"
    return (f'<div class="pn" style="border-color:{col}"><div class="pt" style="color:{col}">{title}</div><div class="ps xs">{sub}</div>'
            + bar("Export revenue", 100, x_after, "#1B3460", f"volume +{pedx*10:.0f}%, ₹ price unchanged")
            + bar("Import spending", 100, m_after, "#8A6A2E", f"₹ price +10%, volume −{pedm*10:.0f}%: 100 × 1.10 × {1-pedm/10:.2f}")
            + f'<div class="res" style="background:{col}">Balance of trade: 0 → {("+" if tb > 0 else "−") + format(abs(tb), ".1f")} &nbsp;{"improves" if good else "worsens"}</div></div>')
x1, m1 = 100 * (1 + 0.08), 100 * 1.10 * (1 - 0.06)
x2, m2 = 100 * (1 + 0.03), 100 * 1.10 * (1 - 0.04)
assert round(x1 - m1, 1) == 4.6 and round(x2 - m2, 1) == -2.6
body = f"""
<div class="hdr xs"><b>Illustrative, small-change approximation:</b> after a 10% depreciation, exports cost about 10% less abroad and imports about 10% more in ₹. Trade starts balanced at ₹100 each. Grey bar = before, coloured bar = after.</div>
<div class="pns">
{panel("Elastic: 0.8 + 0.6 = 1.4 > 1", "|PEDx| = 0.8, |PEDm| = 0.6", x1, m1, x1 - m1, True, 0.8, 0.6)}
{panel("Inelastic: 0.3 + 0.4 = 0.7 < 1", "|PEDx| = 0.3, |PEDm| = 0.4", x2, m2, x2 - m2, False, 0.3, 0.4)}
</div>
"""
page("BoP_33_Marshall_Lerner", 1500, 640, body, """
.hdr{position:relative;margin:0 4px;text-align:center;font-size:22px}
.pns{position:relative;margin:16px 4px 4px;display:grid;grid-template-columns:1fr 1fr;gap:26px}
.pn{background:#fff;border:3px solid;border-radius:18px;padding:16px 22px;display:flex;flex-direction:column}
.pt{font-size:29px;font-weight:800}.ps{color:#5B6577;margin:2px 0 8px}
.br{margin-top:10px}.bl{font-size:22px;font-weight:800;margin-bottom:4px}
.track{position:relative;height:30px;margin:4px 0;width:80%;background:transparent}
.b0{height:100%;background:#C9CED6;border-radius:6px}.b1{height:100%;border-radius:6px}
.v0,.v1{position:absolute;left:100%;margin-left:14px;top:0;font-size:22px;font-weight:800;line-height:30px;white-space:nowrap}
.wkx{margin-top:2px}
.res{margin-top:18px;color:#fff;border-radius:12px;padding:12px 16px;font-size:25px;font-weight:800;text-align:center}
""")

# ------------------------------------------------------------------ B38 revision map (card 38)
top = [
    (1, "Records and signs", "Residents vs rest of the world; credits (+) and debits (−); credits = demand for ₹", "Cards 2 to 5"),
    (2, "Three accounts", "Current, capital and financial accounts and their ten components", "Card 6"),
    (3, "Current account", "Goods + services + income + current transfers", "Cards 7 to 12"),
    (4, "Capital and financial", "Capital transfers, non-produced assets; FDI, portfolio, reserves, official borrowing", "Cards 13 to 18"),
]
bottom = [
    (5, "Calculate and reconcile", "CA + KA + FA + E&O = 0; deficits matched by surpluses", "Cards 19 to 24"),
    (6, "Exchange rates", "CA deficit → downward pressure on ₹; financial flows can offset it", "Cards 25 and 26 · HL"),
    (7, "Persistent deficit and policy", "Implications; switching, reducing, supply-side; Marshall-Lerner; J-curve", "Cards 27 to 34 · HL"),
    (8, "Surpluses and India's data", "Surplus implications; India's current account since 2011-12", "Cards 35 and 36"),
]
def node(n, label, text, cards):
    return (f'<div class="node"><div class="head"><span class="num">{n}</span><span class="label">{label}</span></div>'
            f'<div class="text">{text}</div><div class="cards">{cards}</div></div>')
body = f"""
<svg id="lines" width="1500" height="900" style="position:absolute;left:0;top:0"></svg>
<div class="row" id="top">{"".join(node(*t) for t in top)}</div>
<div class="band"><div class="hub" id="hub"><div class="t1 serif">Balance of payments</div><div class="s1">IB UNIT 4.6</div></div></div>
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
page("BoP_38_Revision_Map", 1500, 900, body, """
.row{position:relative;z-index:1;display:flex;gap:24px;align-items:stretch;padding:4px}
.node{flex:1;background:#FFFFFF;border:3px solid #1B3460;border-radius:18px;padding:14px 16px;display:flex;flex-direction:column}
.head{display:flex;align-items:center;gap:10px}
.num{flex:none;width:36px;height:36px;border-radius:50%;background:#B08A47;color:#fff;font-weight:700;font-size:21px;display:flex;align-items:center;justify-content:center}
.label{font-weight:800;font-size:25px;line-height:1.1}
.text{font-size:21px;line-height:1.28;margin-top:8px;flex:1}
.cards{font-size:18px;font-weight:700;color:#8A6A2E;margin-top:8px}
.band{position:relative;z-index:1;height:140px;display:flex;align-items:center;justify-content:center}
.hub{width:400px;height:88px;border-radius:44px;background:#0E1E3A;border:4px solid #B08A47;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center}
.hub .t1{font-size:34px;font-weight:700;line-height:1}
.hub .s1{font-size:16px;letter-spacing:3px;color:#E2C98F;margin-top:6px;font-weight:700}
""")
