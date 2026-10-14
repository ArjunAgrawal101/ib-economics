"""Market Failure deck: infographics (HTML rendered to transparent PNG at 2x).
Palette follows the Market Failure Revision Atlas. Text sizes are set for projection:
canvases are about 1600 to 1800 px wide and shown at 750 to 860 pt, so 34 to 40 px text is about 17 to 21 pt.
"""
import os
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "html")
os.makedirs(OUT, exist_ok=True)
NAVY, RED, BLUE, GOLD, GOLDD, WL, PURPLE, GREEN, GREY = "#01132C", "#A3402B", "#1F5F99", "#B5934D", "#86662B", "#C0533E", "#5B4B8A", "#2F6B4F", "#5A6372"

CSS = """
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:transparent}
body{position:relative;font-family:Inter,'Helvetica Neue',Arial,sans-serif;color:#01132C}
.serif{font-family:Fraunces,Georgia,serif;font-weight:600}
.mono{font-family:'IBM Plex Mono',monospace;font-weight:500;letter-spacing:3px;text-transform:uppercase}
.card{background:#F7F2E8;border-radius:22px}
.muted{color:#5A6372}
sub{font-size:68%;vertical-align:-0.25em;line-height:0}
svg.links{position:absolute;left:0;top:0;pointer-events:none;overflow:visible}
"""


def page(name, w, h, body, extra="", script=""):
    html = (f'<!doctype html><html data-size="{w}x{h}"><head><meta charset="utf-8"><style>{CSS}'
            f'body{{width:{w}px;height:{h}px}}{extra}</style></head><body>{body}<script>{script}</script></body></html>')
    with open(os.path.join(OUT, name + ".html"), "w") as f:
        f.write(html)
    print("wrote", name)


# ============================================================ MF_03 market failure pathway
steps = [("Private incentives", "Buyers weigh MPB; sellers weigh MPC", NAVY),
         ("Market outcome", "Q<sub>e</sub>, where MPB = MPC", NAVY),
         ("Wider social effects", "Third parties gain or lose", PURPLE),
         ("Potential divergence", "MSB ≠ MPB or MSC ≠ MPC", RED),
         ("Allocative inefficiency", "Q<sub>e</sub> ≠ Q<sub>opt</sub>: welfare loss", WL),
         ("Policy or institutional response", "Taxes, rules, subsidies, provision, agreements, community rules", GREEN)]
cells = ""
for i, (t, d, c) in enumerate(steps, 1):
    cells += (f'<div class="st"><div class="num" style="background:{c}">{i}</div><div class="tt" style="color:{c}">{t}</div>'
              f'<div class="dd">{d}</div></div>')
    if i < len(steps):
        cells += '<div class="ar">→</div>'
body = f'<div class="row">{cells}</div>'
page("MF_03_Market_Failure_Pathway", 1840, 520, body, """
.row{display:flex;align-items:stretch;gap:0;padding:10px}
.st{flex:1;background:#F7F2E8;border-radius:22px;padding:26px 22px 24px;display:flex;flex-direction:column;gap:14px;min-width:0}
.num{width:58px;height:58px;border-radius:50%;color:#fff;font-weight:800;font-size:30px;display:flex;align-items:center;justify-content:center}
.tt{font-family:Fraunces,Georgia,serif;font-weight:600;font-size:36px;line-height:1.12}
.dd{font-size:28px;line-height:1.3;color:#22304A}
.ar{display:flex;align-items:center;font-size:48px;color:#B5934D;font-weight:800;padding:0 8px}
""")

# ============================================================ MF_04 the transaction and the third party
body = f"""
<div class="wrap">
 <div class="deal card">
  <div class="mono lab">The market transaction</div>
  <div class="pair">
   <div class="who"><div class="ic">Buyer</div><div class="s">weighs private benefit</div></div>
   <div class="mid">
     <div class="flow">good or service →</div>
     <div class="flow">← payment</div>
   </div>
   <div class="who"><div class="ic">Seller</div><div class="s">weighs private cost</div></div>
  </div>
 </div>
 <div class="spill">
  <div class="arrows">
   <div class="sp cost">external cost →</div>
   <div class="sp ben">external benefit →</div>
  </div>
  <div class="third card"><div class="ic">Third party</div><div class="s">not in the deal, no say in price or quantity</div></div>
 </div>
</div>
<div class="eqs">
 <div class="eq"><span class="k" style="color:{RED}">Social cost</span> = private cost + external cost</div>
 <div class="eq"><span class="k" style="color:{BLUE}">Social benefit</span> = private benefit + external benefit</div>
</div>
"""
page("MF_04_Transaction_and_Third_Party", 1760, 760, body, f"""
.wrap{{display:flex;gap:34px;align-items:center;padding:10px}}
.deal{{flex:1.25;padding:28px 34px 34px;border:4px solid {NAVY}}}
.lab{{font-size:24px;color:{GOLDD};margin-bottom:22px}}
.pair{{display:flex;align-items:center;gap:20px}}
.who{{flex:1;background:#fff;border-radius:18px;padding:26px 18px;text-align:center;border:3px solid #E6DCC6}}
.ic{{font-family:Fraunces,Georgia,serif;font-weight:600;font-size:44px}}
.s{{font-size:27px;color:{GREY};margin-top:8px;line-height:1.25}}
.mid{{display:flex;flex-direction:column;gap:18px;font-size:28px;font-weight:700;color:{NAVY};text-align:center}}
.spill{{flex:1;display:flex;align-items:center;gap:22px}}
.arrows{{display:flex;flex-direction:column;gap:22px}}
.sp{{font-size:30px;font-weight:800;padding:12px 20px;border-radius:999px;border:3px dashed;white-space:nowrap}}
.cost{{color:{RED};border-color:{RED}}}.ben{{color:{GREEN};border-color:{GREEN}}}
.third{{flex:1;padding:30px 24px;text-align:center;border:4px solid {PURPLE}}}
.third .ic{{color:{PURPLE}}}
.eqs{{display:flex;gap:30px;margin:34px 10px 0}}
.eq{{flex:1;background:#fff;border:3px solid #E6DCC6;border-radius:18px;padding:22px 26px;font-size:32px;font-weight:600}}
.k{{font-weight:800}}
""")

# ============================================================ MF_06 four types of externality
cells = [("Negative production", "MSC > MPC", "factory pollution harms nearby residents", "Q<sub>e</sub> > Q<sub>opt</sub>: overproduction", RED),
         ("Negative consumption", "MSB < MPB", "second-hand smoke harms non-smokers", "Q<sub>e</sub> > Q<sub>opt</sub>: overconsumption", BLUE),
         ("Positive production", "MSC < MPC", "a firm's research is used by other firms", "Q<sub>e</sub> < Q<sub>opt</sub>: underproduction", RED),
         ("Positive consumption", "MSB > MPB", "vaccination protects other people", "Q<sub>e</sub> < Q<sub>opt</sub>: underconsumption", BLUE)]
G = [(f'<div class="cell" style="border-top:10px solid {c}"><div class="t">{t}</div><div class="rel" style="color:{c}">{rel}</div>'
      f'<div class="ex">{ex}</div><div class="out">{out}</div></div>') for t, rel, ex, out, c in cells]
body = f"""
<div class="grid">
 <div></div>
 <div class="ch" style="color:{RED}"><span class="mono q">Who creates it?</span><b>Producers</b><span>the cost side splits: MSC ≠ MPC</span></div>
 <div class="ch" style="color:{BLUE}"><span class="mono q">Who creates it?</span><b>Consumers</b><span>the benefit side splits: MSB ≠ MPB</span></div>
 <div class="rh"><span class="mono q">Cost or benefit?</span><b>Cost to others</b><span>negative</span></div>
 {G[0]}{G[1]}
 <div class="rh"><span class="mono q">Cost or benefit?</span><b>Benefit to others</b><span>positive</span></div>
 {G[2]}{G[3]}
</div>"""
page("MF_06_Four_Types_of_Externality", 1760, 900, body, f"""
.grid{{display:grid;grid-template-columns:300px 1fr 1fr;grid-template-rows:auto 1fr 1fr;gap:20px;padding:10px;height:100%}}
.ch{{display:flex;flex-direction:column;gap:4px;padding:6px 10px}}
.ch b{{font-family:Fraunces,Georgia,serif;font-weight:600;font-size:42px}}
.ch span:last-child{{font-size:28px;font-weight:700}}
.q{{font-size:21px;color:{GOLDD}}}
.rh{{display:flex;flex-direction:column;justify-content:center;gap:6px;padding:10px;color:{NAVY}}}
.rh b{{font-family:Fraunces,Georgia,serif;font-weight:600;font-size:38px;line-height:1.1}}
.rh span:last-child{{font-size:28px;color:{GREY};font-weight:600}}
.cell{{background:#F7F2E8;border-radius:20px;padding:22px 28px;display:flex;flex-direction:column;gap:10px}}
.cell .t{{font-family:Fraunces,Georgia,serif;font-weight:600;font-size:38px}}
.cell .rel{{font-size:36px;font-weight:800}}
.cell .ex{{font-size:28px;color:#22304A;line-height:1.3}}
.cell .out{{font-size:30px;font-weight:800;color:{GOLDD};margin-top:auto}}
""")

# ============================================================ MF_13 who gains from one vaccination
rings = [("Health system", "fewer cases to treat", "#E3ECF5", 700),
         ("Community", "herd protection, including people who cannot be vaccinated", "#CFDDEC", 520),
         ("Contacts", "less exposure to infection", "#B6CCE2", 350),
         ("Person vaccinated", "private benefit: protection", "#1F5F99", 180)]
body = f"""
<div class="wrap">
 <div class="rings">
  <div class="r r4"></div><div class="r r3"></div><div class="r r2"></div><div class="r r1"></div>
  <div class="lab l1"><b>Person vaccinated</b><span>private benefit</span></div>
  <div class="lab l2"><b>Contacts</b><span>less exposure</span></div>
  <div class="lab l3"><b>Community</b><span>herd protection, including people who cannot be vaccinated</span></div>
  <div class="lab l4"><b>Health system</b><span>fewer cases to treat</span></div>
 </div>
 <div class="side">
  <div class="mono k">External benefits</div>
  <div class="big">95%</div>
  <div class="t">two-dose measles coverage needed to stop transmission and protect communities</div>
  <div class="rule"></div>
  <div class="row"><div class="n">84%</div><div class="d">first dose, worldwide, 2024</div></div>
  <div class="row"><div class="n">76%</div><div class="d">second dose, worldwide, 2024</div></div>
  <div class="src">Source: WHO, news release, 28 November 2025</div>
 </div>
</div>"""
page("MF_13_Vaccination_External_Benefits", 1700, 860, body, f"""
.wrap{{display:flex;gap:40px;align-items:center;padding:10px}}
.rings{{position:relative;width:820px;height:820px;flex:none}}
.r{{position:absolute;border-radius:50%;left:50%;top:50%;transform:translate(-50%,-50%)}}
.r4{{width:820px;height:820px;background:#EEF3F9;border:3px solid #C9D7E8}}
.r3{{width:620px;height:620px;background:#DCE7F2}}
.r2{{width:420px;height:420px;background:#C3D5E8}}
.r1{{width:230px;height:230px;background:{BLUE}}}
.lab{{position:absolute;left:50%;transform:translateX(-50%);text-align:center;display:flex;flex-direction:column;gap:2px}}
.lab b{{font-family:Fraunces,Georgia,serif;font-weight:600;font-size:34px}}
.lab span{{font-size:25px;color:#22304A;font-weight:600}}
.l1{{top:362px;width:200px;color:#fff}}.l1 b{{font-size:30px}}.l1 span{{color:#E8F0F8}}
.l2{{top:228px;width:300px;color:{BLUE}}}
.l3{{top:118px;width:420px;color:{BLUE}}}
.l4{{top:22px;width:420px;color:{BLUE}}}
.side{{flex:1;display:flex;flex-direction:column;gap:12px}}
.k{{font-size:24px;color:{GOLDD}}}
.big{{font-family:Fraunces,Georgia,serif;font-weight:600;font-size:130px;color:{BLUE};line-height:1}}
.t{{font-size:33px;font-weight:600;line-height:1.3}}
.rule{{height:4px;background:{GOLD};margin:14px 0;border-radius:2px;width:120px}}
.row{{display:flex;align-items:baseline;gap:18px}}
.n{{font-size:54px;font-weight:800;color:{NAVY};min-width:120px}}
.d{{font-size:30px;color:#22304A;font-weight:600}}
.src{{font-size:22px;color:{GREY};margin-top:14px}}
""")

# ============================================================ MF_18 choosing a policy
body = f"""
<div class="tree">
 <div class="root card"><div class="mono k">Start here</div><div class="rt">Which externality, and who creates it?</div></div>
 <div class="branches">
  <div class="br neg">
   <div class="bh" style="background:{RED}">External cost: reduce the activity</div>
   <div class="opt"><b>Price the harm</b><span>Pigouvian tax, carbon tax, tradable permits</span></div>
   <div class="opt"><b>Set rules</b><span>legislation and regulation: limits, standards, bans</span></div>
   <div class="opt"><b>Change perceptions</b><span>education and awareness</span></div>
   <div class="opt"><b>Cooperate</b><span>international agreements, collective self-governance</span></div>
  </div>
  <div class="br pos">
   <div class="bh" style="background:{GREEN}">External benefit: expand the activity</div>
   <div class="opt"><b>Lower the price</b><span>subsidies to producers or consumers</span></div>
   <div class="opt"><b>Provide it</b><span>government provision, free at the point of use</span></div>
   <div class="opt"><b>Require or inform</b><span>legislation (e.g. compulsory schooling), education</span></div>
  </div>
 </div>
 <div class="test card"><div class="mono k">Then test the fit</div>
  <div class="chips"><span>Can the harm be measured?</span><span>How many sources?</span><span>How elastic is demand?</span><span>Can it be monitored and enforced?</span><span>Does it cross borders?</span><span>Who bears the cost?</span></div></div>
</div>"""
page("MF_18_Policy_Selector", 1760, 960, body, f"""
.tree{{display:flex;flex-direction:column;gap:22px;padding:10px}}
.root{{padding:22px 30px;border:4px solid {NAVY};text-align:center}}
.k{{font-size:23px;color:{GOLDD}}}
.rt{{font-family:Fraunces,Georgia,serif;font-weight:600;font-size:42px;margin-top:6px}}
.branches{{display:flex;gap:26px}}
.br{{flex:1;display:flex;flex-direction:column;gap:12px}}
.bh{{color:#fff;font-weight:800;font-size:32px;border-radius:16px;padding:16px 22px}}
.opt{{background:#F7F2E8;border-radius:16px;padding:16px 22px;display:flex;flex-direction:column;gap:4px}}
.opt b{{font-size:31px}}.opt span{{font-size:27px;color:#22304A}}
.neg .opt b{{color:{RED}}}.pos .opt b{{color:{GREEN}}}
.test{{padding:20px 26px}}
.chips{{display:flex;flex-wrap:wrap;gap:12px;margin-top:12px}}
.chips span{{background:#fff;border:3px solid #E6DCC6;border-radius:999px;padding:10px 20px;font-size:27px;font-weight:600}}
""")

# ============================================================ MF_21 Sweden's carbon tax: policy, incentive, evidence
body = f"""
<div class="cols">
 <div class="c card"><div class="mono k">Policy</div>
  <div class="h">Carbon tax on fossil fuels since 1991</div>
  <div class="bars">
   <div class="bar"><div class="v" style="height:{250/1520*300:.0f}px"></div><b>SEK 250</b><span>1991</span></div>
   <div class="bar"><div class="v" style="height:300px"></div><b>SEK 1,520</b><span>2026 (EUR 138)</span></div>
  </div>
  <div class="sm">per tonne of CO<sub>2</sub>; 2026 rate for natural gas and coal. Industry in the EU ETS is exempt.</div>
 </div>
 <div class="ar">→</div>
 <div class="c card"><div class="mono k">Incentive</div>
  <div class="h">High-carbon fuels cost more than low-carbon alternatives</div>
  <div class="p">Households and firms switch fuels, cut use and invest in cleaner heating and transport.</div>
  <div class="mech"><span class="mono">Tax on a unit of fuel</span>= tax per tonne of CO<sub>2</sub> × tonnes of CO<sub>2</sub> released by that fuel</div>
 </div>
 <div class="ar">→</div>
 <div class="c card"><div class="mono k">Evidence</div>
  <div class="stat"><b>−33%</b><span>domestic emissions, 1990 to 2021, while real GDP rose 92%</span></div>
  <div class="stat"><b>about −11%</b><span>transport CO<sub>2</sub> versus a comparison group, mostly due to the tax (peer-reviewed study, 2019)</span></div>
 </div>
</div>
<div class="caution"><b>What the evidence cannot show:</b> the tax did not cause the whole fall in emissions. Nuclear and hydro power, district heating and the EU ETS also played a part.</div>
<div class="src">Sources: Government Offices of Sweden (2026); Ministry of Finance (2023); Andersson, American Economic Journal: Economic Policy (2019)</div>
"""
page("MF_21_Sweden_Carbon_Tax_Evidence", 1800, 900, body, f"""
.cols{{display:flex;gap:16px;align-items:stretch;padding:10px}}
.c{{flex:1;padding:24px 28px;display:flex;flex-direction:column;gap:14px}}
.k{{font-size:23px;color:{GOLDD}}}
.h{{font-family:Fraunces,Georgia,serif;font-weight:600;font-size:36px;line-height:1.15}}
.p{{font-size:30px;line-height:1.35;color:#22304A}}
.ar{{display:flex;align-items:center;font-size:52px;color:{GOLD};font-weight:800}}
.bars{{display:flex;gap:40px;align-items:flex-end;height:390px;padding:10px 10px 0}}
.bar{{display:flex;flex-direction:column;align-items:center;gap:6px;flex:1}}
.v{{width:110px;background:{RED};border-radius:10px 10px 0 0}}
.bar b{{font-size:32px}}.bar span{{font-size:25px;color:{GREY}}}
.sm{{font-size:24px;color:{GREY};line-height:1.3}}
.mech{{margin-top:auto;background:#fff;border:3px solid #E6DCC6;border-radius:14px;padding:16px 18px;font-size:27px;line-height:1.35;font-weight:600}}
.mech .mono{{display:block;font-size:20px;color:{GOLDD};margin-bottom:4px}}
.stat{{display:flex;flex-direction:column;gap:4px;border-left:6px solid {GREEN};padding-left:18px}}
.stat b{{font-size:54px;color:{GREEN};font-weight:800}}
.stat span{{font-size:28px;line-height:1.3;color:#22304A}}
.caution{{margin:18px 10px 0;background:#FBF1EE;border-radius:16px;padding:18px 24px;font-size:28px;line-height:1.35}}
.caution b{{color:{RED}}}
.src{{margin:12px 12px 0;font-size:21px;color:{GREY}}}
""")

# ============================================================ MF_31 goods by rivalry and excludability
body = f"""
<div class="m">
 <div></div><div class="colh">Excludable</div><div class="colh">Non-excludable</div>
 <div class="rowh">Rivalrous</div>
 <div class="q"><b>Private goods</b><span>food, clothing, a phone</span></div>
 <div class="q cpr"><b>Common pool resources</b><span>ocean fish, groundwater, forests, grazing land, clean air</span></div>
 <div class="rowh">Non-rivalrous</div>
 <div class="q dim"><b>Club goods</b><span>a streaming service, an uncrowded toll road</span><i>for comparison: not in the IB guide</i></div>
 <div class="q"><b>Public goods</b><span>street lighting, flood defences, national defence</span></div>
</div>
<div class="note">Exclusion may be <b>difficult or costly</b> rather than impossible, and shared rules can still govern access.</div>
"""
page("MF_31_Goods_Classification", 1700, 860, body, f"""
.m{{display:grid;grid-template-columns:250px 1fr 1fr;grid-template-rows:70px 1fr 1fr;gap:18px;padding:10px;height:740px}}
.colh,.rowh{{font-family:'IBM Plex Mono',monospace;font-weight:500;letter-spacing:3px;text-transform:uppercase;font-size:26px;color:{GOLDD};display:flex;align-items:center}}
.colh{{justify-content:center}}
.q{{background:#F7F2E8;border-radius:20px;padding:26px 30px;display:flex;flex-direction:column;gap:10px;justify-content:center}}
.q b{{font-family:Fraunces,Georgia,serif;font-weight:600;font-size:42px}}
.q span{{font-size:30px;color:#22304A;line-height:1.3}}
.q i{{font-size:24px;color:{GREY};font-style:normal;font-weight:600}}
.cpr{{background:{GREEN};}}.cpr b,.cpr span{{color:#fff}}
.dim{{opacity:0.75}}
.note{{margin:16px 12px 0;font-size:30px;line-height:1.35}}
.note b{{color:{GREEN}}}
""")

# ============================================================ MF_32 tragedy of the commons
chain = [("Private benefit", "Each fisher keeps all the revenue from one more tonne"),
         ("Individual decision", "Catch more while the fish are there"),
         ("Costs shared", "The smaller stock lowers catches and raises costs for everyone, now and later"),
         ("Aggregate overuse", "Every user faces the same incentive"),
         ("Depletion or degradation", "Extraction outruns regeneration")]
cc = ""
cols = [NAVY, NAVY, RED, RED, WL]
for i, ((t, d), c) in enumerate(zip(chain, cols), 1):
    cc += f'<div class="n"><div class="t" style="color:{c}">{t}</div><div class="d">{d}</div></div>'
    if i < len(chain):
        cc += '<div class="ar">→</div>'
body = f"""
<div class="chain">{cc}</div>
<div class="loop">↺ <b>Race to extract:</b> if I leave fish in the sea, someone else may catch them.</div>
<div class="cond"><span class="mono">A risk, not a destiny</span> It arises with <b>open access and no effective rules</b>. Communities and governments can change the incentives.</div>
"""
page("MF_32_Tragedy_of_the_Commons", 1840, 700, body, f"""
.chain{{display:flex;align-items:stretch;padding:10px}}
.n{{flex:1;background:#F7F2E8;border-radius:20px;padding:24px 22px;display:flex;flex-direction:column;gap:12px}}
.t{{font-family:Fraunces,Georgia,serif;font-weight:600;font-size:36px;line-height:1.1}}
.d{{font-size:28px;line-height:1.3;color:#22304A}}
.ar{{display:flex;align-items:center;font-size:48px;color:{GOLD};font-weight:800;padding:0 8px}}
.loop{{margin:18px 10px 0;font-size:31px;color:{RED};font-weight:600}}
.loop b{{font-weight:800}}
.cond{{margin:18px 10px 0;background:#E8F0EC;border-left:8px solid {GREEN};border-radius:14px;padding:20px 24px;font-size:30px;line-height:1.35}}
.cond .mono{{display:block;font-size:22px;color:{GREEN};margin-bottom:6px}}
.cond b{{color:{GREEN}}}
""")

# ============================================================ MF_35 India groundwater assessment 2025
cats = [("Safe", 4946, 73.14, "#2F6B4F"), ("Semi-critical", 758, 11.21, "#C9A227"), ("Critical", 201, 2.97, "#D9772B"),
        ("Over-exploited", 730, 10.80, "#A3402B"), ("Saline", 127, 1.88, "#8C93A0")]
assert sum(c[1] for c in cats) == 6762 and abs(sum(c[2] for c in cats) - 100) < 0.01
seg = "".join(f'<div class="sg" style="width:{p}%;background:{c}"></div>' for n, k, p, c in cats)
rows = "".join(f'<div class="lg"><i style="background:{c}"></i><b>{n}</b><span>{k:,} units · {p:.2f}%</span></div>' for n, k, p, c in cats)
ce = 730 + 201
assert round(ce / 6762 * 100, 1) == 13.8
body = f"""
<div class="top">
 <div class="kpi"><b>6,762</b><span>assessment units (blocks, taluks, mandals), 2025</span></div>
 <div class="kpi"><b>60.6%</b><span>national stage of extraction: 247.22 of 407.75 bcm extractable each year</span></div>
 <div class="kpi red"><b>931</b><span>units critical or over-exploited (13.8%)</span></div>
</div>
<div class="bar">{seg}</div>
<div class="legend">{rows}</div>
<div class="def"><span class="mono">Stage of extraction</span> = annual extraction ÷ annual extractable resource. Safe: up to 70% · Semi-critical: 70 to 90% · Critical: 90 to 100% · Over-exploited: above 100%, checked against long-term water-level trends.</div>
<div class="src">Source: Central Ground Water Board and Ministry of Jal Shakti, Dynamic Ground Water Resources Assessment 2025 (PIB, 18 December 2025). Saline: mostly brackish or saline shallow groundwater.</div>
"""
page("MF_35_India_Groundwater_2025", 1800, 840, body, f"""
.top{{display:flex;gap:20px;padding:10px}}
.kpi{{flex:1;background:#F7F2E8;border-radius:20px;padding:22px 26px;display:flex;flex-direction:column;gap:6px}}
.kpi b{{font-size:66px;font-weight:800;color:{NAVY};line-height:1}}
.kpi span{{font-size:27px;line-height:1.3;color:#22304A}}
.kpi.red b{{color:{RED}}}
.bar{{display:flex;height:92px;margin:24px 10px 0;border-radius:14px;overflow:hidden}}
.sg{{height:100%}}
.legend{{display:flex;flex-wrap:wrap;gap:12px 34px;margin:18px 12px 0}}
.lg{{display:flex;align-items:center;gap:10px;font-size:28px}}
.lg i{{width:26px;height:26px;border-radius:6px;display:inline-block}}
.lg span{{color:{GREY};font-weight:600}}
.def{{margin:22px 10px 0;background:#fff;border:3px solid #E6DCC6;border-radius:16px;padding:18px 24px;font-size:27px;line-height:1.4}}
.def .mono{{font-size:22px;color:{GOLDD}}}
.src{{margin:14px 12px 0;font-size:21px;color:{GREY}}}
""")

# ============================================================ MF_36 Northern cod timeline
ev = [("1992", "Moratorium", "Commercial fishery closed on 2 July; about 30,000 jobs lost in Newfoundland and Labrador", RED),
      ("2005", "Low point", "Spawning stock about 3% of its 1980s average (earlier assessment model)", RED),
      ("2024", "Reopened", "New assessment model and reference point; stock judged out of the critical zone. Canadian TAC 18,000 t", GOLDD),
      ("2025", "Quota raised", "TAC 38,000 t", GOLDD),
      ("2026", "“Healthy zone”", "TAC 59,000 t; first healthy-zone assessment since 1992", GREEN)]
items = "".join(f'<div class="ev"><div class="yr" style="color:{c}">{y}</div><div class="dot" style="background:{c}"></div><div class="tt">{t}</div><div class="dd">{d}</div></div>' for y, t, d, c in ev)
body = f"""
<div class="line"></div>
<div class="evs">{items}</div>
<div class="warn"><b>A policy decision is not proof of recovery.</b> The zone changed mainly because the reference point was redefined, not because fish numbers suddenly jumped. “Healthy zone” is a model-based category, not a return to pre-collapse abundance.</div>
<div class="src">Sources: Fisheries and Oceans Canada (science advisory reports 2022/041, 2024/046; news releases June 2024 and June 2026; 2025 management decision); The Canadian Encyclopedia</div>
"""
page("MF_36_Northern_Cod_Timeline", 1840, 780, body, f"""
.line{{position:absolute;left:60px;right:60px;top:139px;height:6px;background:#E6DCC6;border-radius:3px}}
.evs{{display:flex;gap:18px;padding:10px 20px;position:relative}}
.ev{{flex:1;display:flex;flex-direction:column;gap:10px}}
.yr{{font-family:Fraunces,Georgia,serif;font-weight:600;font-size:56px;line-height:1}}
.dot{{width:30px;height:30px;border-radius:50%;border:6px solid #FFFDFA;margin:30px 0 4px}}
.tt{{font-size:32px;font-weight:800}}
.dd{{font-size:27px;line-height:1.32;color:#22304A}}
.warn{{margin:26px 20px 0;background:#FBF1EE;border-left:8px solid {RED};border-radius:14px;padding:20px 26px;font-size:29px;line-height:1.35}}
.warn b{{color:{RED}}}
.src{{margin:12px 22px 0;font-size:21px;color:{GREY}}}
""")

# ============================================================ MF_38 Ostrom's design principles
pr = [("Clear boundaries", "who may use the resource, and where it ends"),
      ("Rules fit local conditions", "costs in proportion to benefits"),
      ("Users help make the rules", "participation in collective choices"),
      ("Monitoring", "by users, or monitors accountable to them"),
      ("Graduated sanctions", "penalties start small and rise for repeat breaches"),
      ("Conflict resolution", "quick, cheap and local"),
      ("Rights recognised", "government accepts users' right to organise"),
      ("Nested layers", "larger systems governed at several linked levels")]
cells = "".join(f'<div class="p"><div class="n">{i}</div><div><b>{t}</b><span>{d}</span></div></div>' for i, (t, d) in enumerate(pr, 1))
body = f"""<div class="g">{cells}</div>
<div class="foot"><span class="mono">Elinor Ostrom</span> Governing the Commons (1990); Nobel Memorial Prize in Economic Sciences 2009 “for her analysis of economic governance, especially the commons”.</div>"""
page("MF_38_Ostrom_Design_Principles", 1800, 760, body, f"""
.g{{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;padding:10px}}
.p{{background:#F7F2E8;border-radius:18px;padding:20px 20px;display:flex;gap:14px;align-items:flex-start;min-height:176px}}
.n{{flex:none;width:52px;height:52px;border-radius:50%;background:{GREEN};color:#fff;font-weight:800;font-size:27px;display:flex;align-items:center;justify-content:center}}
.p b{{display:block;font-family:Fraunces,Georgia,serif;font-weight:600;font-size:32px;line-height:1.12;margin-bottom:8px}}
.p span{{font-size:26px;line-height:1.3;color:#22304A}}
.foot{{margin:18px 12px 0;font-size:26px;line-height:1.4;color:{GREY}}}
.foot .mono{{color:{GREEN};font-size:22px;margin-right:10px}}
""")

# ============================================================ MF_40 the whole economic story
body = f"""
<div class="rows">
 <div class="lane"><div class="tag" style="background:{RED}">Externalities</div>
  <div class="nd"><div>Private decisions</div><span>MPB = MPC</span></div><div class="ar">→</div>
  <div class="nd"><div>Third-party effects</div><span>MSB ≠ MPB or MSC ≠ MPC</span></div><div class="ar">→</div>
  <div class="nd"><div>Q<sub>e</sub> ≠ Q<sub>opt</sub></div><span>allocative inefficiency, welfare loss</span></div><div class="ar">→</div>
  <div class="nd"><div>Government intervention</div><span>taxes, permits, rules, education, subsidies, provision</span></div>
 </div>
 <div class="lane"><div class="tag" style="background:{GREEN}">CPRs</div>
  <div class="nd"><div>Rivalry + hard to exclude</div><span>open access to a shared stock</span></div><div class="ar">→</div>
  <div class="nd"><div>Individual extraction</div><span>depletion costs fall on others</span></div><div class="ar">→</div>
  <div class="nd"><div>Tragedy of the commons</div><span>a risk of overuse and depletion</span></div><div class="ar">→</div>
  <div class="nd"><div>Governance</div><span>regulation, community rules, agreements</span></div>
 </div>
</div>
<div class="merge">
 <div class="mm"><span class="mono">Evaluate every response</span>effectiveness · measurement · enforcement · stakeholders and equity · <b>sustainability</b></div>
</div>"""
page("MF_40_Whole_Economic_Story", 1840, 760, body, f"""
.rows{{display:flex;flex-direction:column;gap:22px;padding:10px}}
.lane{{display:flex;align-items:stretch;gap:0;height:236px}}
.tag{{writing-mode:vertical-rl;transform:rotate(180deg);color:#fff;font-weight:800;font-size:25px;border-radius:14px;padding:14px 10px;margin-right:14px;text-align:center}}
.nd{{flex:1;background:#F7F2E8;border-radius:18px;padding:20px 20px;font-family:Fraunces,Georgia,serif;font-weight:600;font-size:33px;line-height:1.15;display:flex;flex-direction:column;gap:8px}}
.nd span{{font-family:Inter,sans-serif;font-weight:500;font-size:26px;color:#22304A;line-height:1.28}}
.ar{{display:flex;align-items:center;font-size:44px;color:{GOLD};font-weight:800;padding:0 6px}}
.merge{{margin:22px 10px 0}}
.mm{{background:{NAVY};color:#fff;border-radius:18px;padding:22px 28px;font-size:31px;line-height:1.35}}
.mm .mono{{display:block;font-size:22px;color:#E2C98F;margin-bottom:6px}}
.mm b{{color:#E2C98F}}
""")
