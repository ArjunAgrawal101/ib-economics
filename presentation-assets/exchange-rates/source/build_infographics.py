"""Infographics for the Exchange Rates deck, authored as HTML and rendered by Chromium."""
import os

OUT = os.path.join(os.path.dirname(__file__), "html")
os.makedirs(OUT, exist_ok=True)

CSS = """
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:transparent}
body{font-family:Inter,'Helvetica Neue',Arial,sans-serif;color:#0E1E3A}
.card{position:absolute;inset:2px;border:3px solid #E2D6BC;border-radius:28px;background:#FFFDF8;padding:46px 56px}
.kicker{font-size:25px;font-weight:700;letter-spacing:3px;color:#8A6A2E;text-transform:uppercase}
.sub{font-size:22px;color:#5B6577;margin-top:8px}
.serif{font-family:Lora,Georgia,serif}
.app{color:#2E7D5B}.dep{color:#B0412E}.cb{color:#2F5D8C}.gold{color:#8A6A2E}.muted{color:#5B6577}
.pill{display:inline-block;border-radius:999px;padding:6px 18px;font-weight:700;color:#fff;font-size:22px}
.pill.app{background:#2E7D5B;color:#fff}.pill.dep{background:#B0412E;color:#fff}.pill.navy{background:#1B3460;color:#fff}
.box{border:3px solid #1B3460;border-radius:18px;background:#fff;padding:16px 20px}
.box.gold{border-color:#B08A47}.box.dep{border-color:#B0412E}.box.app{border-color:#2E7D5B}.box.cb{border-color:#2F5D8C}
.arrow{color:#B08A47;font-size:40px;font-weight:700;line-height:1}
"""


def page(name, w, h, body):
    html = f"""<!doctype html><html data-size="{w}x{h}"><head><meta charset="utf-8"><style>{CSS}
body{{width:{w}px;height:{h}px;position:relative}}</style></head><body><div class="card">{body}</div></body></html>"""
    with open(os.path.join(OUT, name + ".html"), "w") as f:
        f.write(html)


# ------------------------------------------------------------------ 1. quote anatomy
page("ER_00_Quote_Anatomy", 1600, 660, """
<div class="kicker">Reading an exchange-rate quote</div>
<div class="sub">Every quote prices ONE currency in units of ANOTHER (illustrative rate)</div>
<div style="display:flex;gap:56px;margin-top:44px;align-items:stretch">
 <div style="flex:1.25">
  <div style="display:flex;align-items:flex-end;gap:26px;justify-content:center">
   <div style="text-align:center"><div class="serif" style="font-size:118px;font-weight:600;line-height:1">US$1</div>
     <div style="margin-top:14px;font-size:24px;font-weight:700" class="gold">the currency being priced</div></div>
   <div class="serif" style="font-size:118px;line-height:1;color:#8C93A0">=</div>
   <div style="text-align:center"><div class="serif" style="font-size:118px;font-weight:600;line-height:1">₹80</div>
     <div style="margin-top:14px;font-size:24px;font-weight:700" class="gold">its price, in rupees</div></div>
  </div>
  <div class="box" style="margin-top:44px;display:flex;align-items:center;gap:24px;border-color:#B08A47">
   <div style="font-size:24px;font-weight:700;white-space:nowrap" class="gold">Flip it:</div>
   <div class="serif" style="font-size:48px;font-weight:600;white-space:nowrap">₹1 = US$0.0125</div>
   <div style="font-size:23px;white-space:nowrap" class="muted">(1 ÷ 80)</div>
  </div>
 </div>
 <div style="flex:1;border-left:3px solid #E2D6BC;padding-left:48px">
  <div style="font-size:27px;font-weight:700">If the quote moves from ₹80 to ₹88 per US$</div>
  <div style="margin-top:26px;display:flex;flex-direction:column;gap:20px;font-size:26px">
   <div><span class="pill app">US$ appreciates</span><div style="margin-top:10px">One dollar now buys <b>more</b> rupees.</div></div>
   <div><span class="pill dep">₹ depreciates</span><div style="margin-top:10px">One rupee now buys <b>less</b>: US$0.0125 → US$0.0114</div></div>
  </div>
  <div style="margin-top:30px;font-size:24px;line-height:1.4" class="muted">A <b style="color:#0E1E3A">higher number</b> is not automatically a stronger currency. First ask: <b style="color:#0E1E3A">which currency is the “1”?</b></div>
 </div>
</div>
""")

# ------------------------------------------------------------------ 2. forex flows
def col(items, side):
    rows = "".join(
        f'<div class="box" style="display:flex;gap:16px;align-items:center;padding:14px 18px;border-color:{"#2E7D5B" if side=="L" else "#B0412E"}">'
        f'<div style="font-size:23px;font-weight:700;min-width:30px;color:{"#2E7D5B" if side=="L" else "#B0412E"}">{i+1}</div>'
        f'<div style="font-size:23px;line-height:1.25">{t}</div></div>' for i, t in enumerate(items))
    return f'<div style="display:flex;flex-direction:column;gap:14px">{rows}</div>'


left = ["Foreigners buy Indian <b>exports</b> (goods and services)", "<b>Inward FDI</b>: foreign firms build or buy in India",
        "<b>Inward portfolio</b>: foreigners buy Indian shares and bonds", "<b>Remittances</b> sent home to India",
        "<b>Speculators</b> buy ₹ expecting it to rise", "<b>RBI buys ₹</b> using its US$ reserves"]
right = ["Indians buy <b>imports</b> (goods and services)", "<b>Outward FDI</b>: Indian firms invest abroad",
         "<b>Outward portfolio</b>: Indians buy foreign shares and bonds", "<b>Remittances</b> sent out of India",
         "<b>Speculators</b> sell ₹ expecting it to fall", "<b>RBI sells ₹</b> to buy US$"]
page("ER_01_Forex_Flows", 1600, 880, f"""
<div class="kicker">Who buys and who sells rupees?</div>
<div class="sub">The foreign exchange market links every cross-border transaction to the demand for, or supply of, a currency</div>
<div style="display:grid;grid-template-columns:1fr 300px 1fr;gap:34px;margin-top:36px;align-items:start">
 <div><div style="font-size:26px;font-weight:800" class="app">DEMAND for ₹</div>
  <div style="font-size:21px;margin:4px 0 16px;min-height:54px" class="muted">money flowing <b>into</b> India: someone sells foreign currency to get ₹</div>{col(left,'L')}</div>
 <div style="text-align:center;padding-top:150px">
  <div style="font-size:52px;color:#2E7D5B;font-weight:700">→</div>
  <div class="box" style="background:#1B3460;color:#fff;border-color:#1B3460;padding:30px 18px">
   <div class="serif" style="font-size:31px;font-weight:600;line-height:1.2">Foreign exchange market</div>
   <div style="font-size:40px;margin-top:14px;font-weight:700">₹ ⇄ US$</div>
   <div style="font-size:19px;margin-top:12px;opacity:.85">price = exchange rate</div></div>
  <div style="font-size:52px;color:#B0412E;font-weight:700">←</div>
 </div>
 <div><div style="font-size:26px;font-weight:800" class="dep">SUPPLY of ₹</div>
  <div style="font-size:21px;margin:4px 0 16px;min-height:54px" class="muted">money flowing <b>out of</b> India: someone sells ₹ to get foreign currency</div>{col(right,'R')}</div>
</div>
""")

# ------------------------------------------------------------------ 3. speculation loop
node = lambda t, c, extra="": f'<div class="box {c}" style="position:absolute;{extra};width:380px;text-align:center;font-size:26px;font-weight:600;line-height:1.3">{t}</div>'
page("ER_14_Speculation_Loop", 1200, 860, f"""
<div class="kicker">Speculation and expectations</div>
<div class="sub">When enough traders act on the same expectation, they can cause the change they expect</div>
<div style="position:absolute;left:56px;right:56px;top:165px;height:540px">
 {node("Traders <b>expect</b> the ₹ to appreciate", "gold", "left:0;top:0")}
 {node("They <b>buy ₹ now</b> to sell later at a profit", "", "right:0;top:0")}
 {node("<b>Demand for ₹ rises</b>: D shifts right", "", "right:0;bottom:60px")}
 {node("The ₹ <b>appreciates</b>, confirming the expectation", "app", "left:0;bottom:60px")}
 <div style="position:absolute;left:400px;top:34px;width:290px;text-align:center" class="arrow">⟶</div>
 <div style="position:absolute;right:170px;top:130px;height:250px;display:flex;align-items:center" class="arrow">↓</div>
 <div style="position:absolute;left:400px;bottom:96px;width:290px;text-align:center" class="arrow">⟵</div>
 <div style="position:absolute;left:170px;top:130px;height:250px;display:flex;align-items:center" class="arrow">↑</div>
 <div style="position:absolute;left:300px;right:300px;top:185px;text-align:center">
  <div class="serif" style="font-size:36px;font-weight:600;line-height:1.15">Self-fulfilling<br>prophecy</div></div>
</div>
<div style="position:absolute;left:56px;right:56px;bottom:44px;font-size:24px;border-top:3px solid #E2D6BC;padding-top:18px">
 <b class="dep">In reverse:</b> expect a fall → sell ₹ → <b>supply of ₹ rises</b> → ₹ depreciates. Large, fast flows can make rates volatile.</div>
""")

# ------------------------------------------------------------------ 4. depreciation transmission
def chain(steps, colour):
    parts = []
    for i, (t, c) in enumerate(steps):
        parts.append(f'<div class="box {c}" style="flex:1 1 0;min-width:0;font-size:22px;line-height:1.3;padding:14px 14px;text-align:center;display:flex;align-items:center;justify-content:center"><div>{t}</div></div>')
        if i < len(steps) - 1:
            parts.append(f'<div style="font-size:34px;font-weight:700;color:{colour};align-self:center">→</div>')
    return '<div style="display:flex;gap:12px;align-items:stretch">' + "".join(parts) + "</div>"


page("ER_15_Depreciation_Transmission", 1600, 870, f"""
<div class="kicker">How a rupee depreciation spreads through the economy</div>
<div class="sub">Two channels work at once; the arrows show likely effects, ceteris paribus</div>
<div style="display:flex;gap:30px;margin-top:34px">
 <div style="width:250px;display:flex;align-items:center">
  <div class="box dep" style="background:#B0412E;color:#fff;text-align:center;padding:30px 16px;width:100%">
   <div class="serif" style="font-size:34px;font-weight:600;line-height:1.15">The rupee<br>depreciates</div>
   <div style="font-size:20px;margin-top:10px">fewer US$ per ₹</div></div></div>
 <div style="flex:1;display:flex;flex-direction:column;gap:22px">
  <div style="font-size:24px;font-weight:800" class="gold">1 · DEMAND CHANNEL</div>
  {chain([("Indian exports cheaper in foreign currency; imports dearer in ₹", ""),
          ("Exports rise, imports fall <span class='muted'>(if demand is price elastic)</span>", ""),
          ("Net exports (X&nbsp;−&nbsp;M) rise", ""),
          ("<b>AD shifts right</b>", "gold"),
          ("Real GDP ↑, unemployment ↓; <b class='dep'>demand-pull inflation</b> near full capacity", "app")], "#B08A47")}
  <div style="font-size:24px;font-weight:800;margin-top:14px" class="dep">2 · COST CHANNEL</div>
  {chain([("Imported inputs (crude oil, components) cost more in ₹", ""),
          ("Firms' costs of production rise", ""),
          ("<b>SRAS shifts left</b>", "dep"),
          ("<b class='dep'>Cost-push inflation</b>; real GDP ↓", "dep")], "#B0412E")}
  <div style="display:flex;gap:20px;margin-top:14px">
   <div class="box cb" style="flex:1;font-size:22px;line-height:1.35"><b class="cb">Also:</b> debts owed in US$ cost more rupees to repay; households receiving remittances get more ₹ per US$.</div>
   <div class="box gold" style="flex:1.15;font-size:22px;line-height:1.35;background:#FBF4E6"><b>Net effect:</b> inflation rises through both channels. Growth and jobs depend on which channel is stronger.</div>
  </div>
 </div>
</div>
""")

# ------------------------------------------------------------------ 5. systems spectrum
rows = [("Who sets the rate?", "Government or central bank sets a fixed rate (FR)", "Market forces, with the central bank stepping in when it chooses", "Market forces of demand and supply only"),
        ("Central bank role", "Buys and sells currency continuously to hold FR", "Intervenes periodically: smooths swings or keeps the rate inside a band", "No intervention to influence the rate"),
        ("A fall in value is called", "<b class='dep'>Devaluation</b> (official decision)", "<b class='dep'>Depreciation</b> (a peg can also be devalued)", "<b class='dep'>Depreciation</b>"),
        ("A rise in value is called", "<b class='app'>Revaluation</b> (official decision)", "<b class='app'>Appreciation</b> (a peg can also be revalued)", "<b class='app'>Appreciation</b>"),
        ("Real-world example", "Hong Kong dollar: held at HK$7.75 to 7.85 per US$ (hard peg)", "Indian rupee: market-led, RBI acts to curb excessive volatility", "US dollar, euro: free floats")]
grid = "".join(
    f'<div style="font-size:22px;font-weight:700;padding:14px 10px;border-top:2px solid #E2D6BC">{r[0]}</div>'
    + "".join(f'<div style="font-size:22px;line-height:1.3;padding:14px 16px;border-top:2px solid #E2D6BC">{c}</div>' for c in r[1:])
    for r in rows)
page("ER_23_Systems_Spectrum", 1600, 800, f"""
<div class="kicker">Three exchange-rate systems</div>
<div class="sub">A spectrum from government control to market control</div>
<div style="margin-top:30px;display:grid;grid-template-columns:270px 1fr 1fr 1fr">
 <div></div>
 <div style="padding:0 16px"><span class="pill navy" style="font-size:26px">Fixed</span></div>
 <div style="padding:0 16px"><span class="pill" style="background:#8A6A2E;font-size:26px">Managed</span></div>
 <div style="padding:0 16px"><span class="pill" style="background:#5B6577;font-size:26px">Floating</span></div>
 <div></div>
 <div style="grid-column:2 / span 3;margin:14px 16px 10px;height:14px;border-radius:7px;background:linear-gradient(90deg,#1B3460,#B08A47,#C9CED6)"></div>
 <div></div><div style="grid-column:2 / span 3;display:flex;justify-content:space-between;margin:0 16px 12px;font-size:19px" class="muted"><span>more government control</span><span>more market control</span></div>
 {grid}
</div>
""")
print("written", sorted(os.listdir(OUT)))
