"""v3 infographics (HTML rendered to PNG) for UPSC Economics from First Principles.

Brand: navy #0E1E3A, antique gold #B08A47, ivory #F7F3E8; Inter only. Transparent page background.
All figures on these panels are illustrative; numbers that also appear on graphs match build_graphs_v3.py.
"""
import os, base64

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "html")
PNG = os.path.join(HERE, "..", "png")
os.makedirs(OUT, exist_ok=True)

CSS = """
:root{--ink:#0E1E3A;--navy:#1B3460;--gold:#B08A47;--goldt:#8A6A2E;--green:#2E7D5B;--red:#B0412E;--blue:#2F5D8C;
--ivory:#F7F3E8;--soft:#FBF7EE;--edge:#E2D6BC;--muted:#5B6577;}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:transparent}
body{font-family:Inter,'DejaVu Sans',sans-serif;color:var(--ink);-webkit-font-smoothing:antialiased}
.wrap{position:relative;overflow:hidden}
.cap{font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--goldt)}
.card{background:#fff;border:3px solid var(--edge);border-radius:24px}
.navy{background:var(--ink);color:#fff;border-radius:24px}
.muted{color:var(--muted)}
.tag{font-style:italic;color:var(--muted);font-weight:600}
"""


def page(name, w, h, body, extra=""):
    html = (f'<!doctype html><html><head><meta charset="utf-8"><style>{CSS}{extra}</style></head>'
            f'<body data-size="{w}x{h}"><div class="wrap" style="width:{w}px;height:{h}px;padding:10px">{body}</div></body></html>')
    with open(os.path.join(OUT, name + ".html"), "w") as f:
        f.write(html)
    print("html", name)


def img64(name):
    with open(os.path.join(PNG, name + ".png"), "rb") as f:
        return "data:image/png;base64," + base64.b64encode(f.read()).decode()


ARROW = ('<svg width="{w}" height="40" viewBox="0 0 {w} 40"><line x1="4" y1="20" x2="{x2}" y2="20" stroke="{c}" '
         'stroke-width="7" stroke-linecap="round"/><path d="M{x2},6 L{w},20 L{x2},34 z" fill="{c}"/></svg>')


def arrow(w=90, c="#B08A47"):
    return ARROW.format(w=w, x2=w - 26, c=c)


LOCK = ('<svg width="44" height="52" viewBox="0 0 44 52"><path d="M10 22 V14 a12 12 0 0 1 24 0 V22" fill="none" '
        'stroke="{c}" stroke-width="5"/><rect x="3" y="22" width="38" height="28" rx="6" fill="{c}"/></svg>')
UNLOCK = ('<svg width="44" height="52" viewBox="0 0 44 52"><path d="M10 22 V14 a12 12 0 0 1 23 -4" fill="none" '
          'stroke="{c}" stroke-width="5"/><rect x="3" y="22" width="38" height="28" rx="6" fill="{c}"/></svg>')


# ================================================================ V02 everyday questions (2x2)
spark = ('<svg width="560" height="184" viewBox="0 0 560 184"><line x1="20" y1="150" x2="545" y2="150" stroke="#0E1E3A" stroke-width="4"/>'
         '<line x1="20" y1="150" x2="20" y2="12" stroke="#0E1E3A" stroke-width="4"/>'
         '<polyline points="30,118 85,112 140,120 195,96 250,40 305,28 360,84 415,116 470,122 530,100" fill="none" stroke="#B0412E" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>'
         '<text x="34" y="26" font-size="22" font-weight="700" fill="#5B6577">price</text>'
         '<text x="545" y="176" font-size="22" font-weight="700" fill="#5B6577" text-anchor="end">months</text></svg>')
budget = ('<div style="display:flex;height:84px;border-radius:14px;overflow:hidden;font-weight:750;font-size:24px;color:#fff;margin:34px 0 18px">'
          '<div style="flex:40;background:#0E1E3A;display:flex;align-items:center;justify-content:center">Rent</div>'
          '<div style="flex:25;background:#1B3460;display:flex;align-items:center;justify-content:center">Fees</div>'
          '<div style="flex:23;background:#B08A47;display:flex;align-items:center;justify-content:center">Food</div>'
          '<div style="flex:12;background:#2E7D5B;display:flex;align-items:center;justify-content:center">Save</div></div>'
          '<div class="muted" style="font-size:22px;font-weight:600;margin-bottom:12px">One fixed income, many claims on it</div>')
people = "".join(f'<svg width="46" height="70" viewBox="0 0 46 70"><circle cx="23" cy="14" r="12" fill="{c}"/><path d="M4 70 V44 a19 19 0 0 1 38 0 V70z" fill="{c}"/></svg>'
                 for c in ["#0E1E3A"] * 7 + ["#B08A47"] * 2)
jobs = (f'<div style="display:flex;gap:10px;align-items:flex-end;margin:40px 0 12px">{people}</div>'
        '<div class="muted" style="font-size:22px;font-weight:600;margin-bottom:12px">More job seekers than suitable openings</div>')
fork = ('<svg width="560" height="186" viewBox="0 0 560 186"><rect x="10" y="62" width="150" height="54" rx="12" fill="#0E1E3A"/>'
        '<text x="85" y="97" font-size="24" font-weight="800" fill="#fff" text-anchor="middle">Budget</text>'
        '<path d="M160 89 C 250 89 250 30 330 30" fill="none" stroke="#B08A47" stroke-width="7"/>'
        '<path d="M160 89 C 250 89 250 148 330 148" fill="none" stroke="#B08A47" stroke-width="7"/>'
        '<rect x="334" y="6" width="214" height="50" rx="12" fill="#fff" stroke="#B08A47" stroke-width="4"/>'
        '<text x="441" y="39" font-size="23" font-weight="750" fill="#0E1E3A" text-anchor="middle">Hospital wing</text>'
        '<rect x="334" y="122" width="214" height="50" rx="12" fill="#fff" stroke="#B08A47" stroke-width="4"/>'
        '<text x="441" y="155" font-size="23" font-weight="750" fill="#0E1E3A" text-anchor="middle">Rural roads</text></svg>')
tiles = [("Food prices", spark, "Why can onion prices swing sharply from one month to the next?"),
         ("Household budgets", budget, "How does a family on a fixed income choose between rent, fees and savings?"),
         ("Jobs", jobs, "Why do some graduates find work quickly while others keep searching?"),
         ("Public resources", fork, "Should a district fund a hospital wing or rural roads?")]
body = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:30px;padding:6px">'
for cap, vis, q in tiles:
    body += (f'<div class="card" style="padding:30px 34px;height:510px;display:flex;flex-direction:column">'
             f'<div class="cap" style="font-size:24px">{cap}</div>'
             f'<div style="flex:1;display:flex;flex-direction:column;justify-content:center">{vis}</div>'
             f'<div style="font-size:34px;font-weight:700;line-height:1.25">{q}</div></div>')
body += '</div><div class="tag" style="position:absolute;right:16px;bottom:-2px;font-size:20px">Illustrative visuals</div>'
page("V02_Everyday_Questions", 1400, 1080, body)


# ================================================================ V03 foundations to Indian Economy
pairs = [("Scarcity and opportunity cost", "Public expenditure choices and resource allocation"),
         ("Production possibility curve", "Growth, productive capacity and employment"),
         ("Circular flow of income", "National income accounting"),
         ("Demand, supply and equilibrium", "Food prices and agricultural supply shocks"),
         ("Positive and normative reasoning", "Interpreting government policy")]
rows = ""
for i, (a, b) in enumerate(pairs):
    rows += (f'<div style="display:grid;grid-template-columns:760px 1fr 980px;align-items:center;height:136px">'
             f'<div class="navy" style="height:112px;display:flex;align-items:center;padding:0 36px;font-size:36px;font-weight:750">'
             f'<span style="color:#E2C98F;font-weight:800;margin-right:22px">{i+1}</span>{a}</div>'
             f'<div style="display:flex;justify-content:center">{arrow(260)}</div>'
             f'<div class="card" style="height:112px;display:flex;align-items:center;padding:0 36px;font-size:35px;font-weight:650">{b}</div></div>')
body = (f'<div style="display:grid;grid-template-columns:760px 1fr 980px;margin-bottom:10px">'
        f'<div class="cap" style="font-size:26px">Foundations in this section</div><div></div>'
        f'<div class="cap" style="font-size:26px">What they help you analyse in Indian Economy</div></div>{rows}')
page("V03_Foundations_Bridge", 2400, 780, body)


# ================================================================ V04 scarcity, choice, allocation chain
node = lambda t, s, c: (f'<div style="width:470px;height:300px;border-radius:30px;background:{c};color:#fff;display:flex;flex-direction:column;'
                        f'justify-content:center;padding:0 36px"><div style="font-size:46px;font-weight:850;letter-spacing:.06em">{t}</div>'
                        f'<div style="font-size:29px;font-weight:550;margin-top:12px;line-height:1.3;color:#F7F3E8">{s}</div></div>')
inputs = ('<div style="display:flex;flex-direction:column;gap:24px;width:500px">'
          '<div class="card" style="height:138px;display:flex;flex-direction:column;justify-content:center;padding:0 30px">'
          '<div class="cap" style="font-size:22px">Limited</div><div style="font-size:31px;font-weight:700">land, labour, capital, time</div></div>'
          '<div class="card" style="height:138px;display:flex;flex-direction:column;justify-content:center;padding:0 30px">'
          '<div class="cap" style="font-size:22px">Unlimited</div><div style="font-size:31px;font-weight:700">wants that keep growing</div></div></div>')
body = (f'<div style="display:flex;align-items:center;gap:22px;height:320px">{inputs}{arrow(110)}'
        f'{node("SCARCITY", "Resources fall short of wants", "#0E1E3A")}{arrow(80)}'
        f'{node("CHOICE", "Using a resource one way rules out another", "#1B3460")}{arrow(80)}'
        f'{node("ALLOCATION", "Deciding what, how and for whom", "#8A6A2E")}</div>'
        '<div style="margin-top:36px;background:#F6EFDF;border-radius:22px;padding:26px 40px;display:flex;align-items:center;gap:26px">'
        '<div style="font-size:32px;font-weight:850;color:#B0412E;white-space:nowrap">Not just money</div>'
        '<div style="font-size:31px;font-weight:600;line-height:1.3">A farmer dividing land between crops, a student dividing time between subjects '
        'and a state dividing its budget between schools and roads are all economic choices.</div></div>')
page("V04_Scarcity_Choice_Allocation", 2400, 520, body)


# ================================================================ V05 three central questions
card = lambda q, s, ex, c: (f'<div class="card" style="width:700px;height:470px;padding:40px 44px;display:flex;flex-direction:column;border-top:16px solid {c}">'
                            f'<div style="font-size:64px;font-weight:850;color:{c}">{q}</div>'
                            f'<div style="font-size:34px;font-weight:700;margin-top:14px;line-height:1.3">{s}</div>'
                            f'<div style="flex:1"></div><div class="cap" style="font-size:22px;margin-bottom:10px">In the village</div>'
                            f'<div style="font-size:32px;font-weight:600;line-height:1.32">{ex}</div></div>')
body = ('<div style="display:flex;justify-content:space-between;align-items:center">'
        + card("What?", "Which goods and services, and how much of each", "More rice, and so less cotton?", "#0E1E3A")
        + arrow(110, "#B08A47")
        + card("How?", "Which techniques: more labour, more machines, or a mix", "Tractors or hired farm workers?", "#1B3460")
        + arrow(110, "#B08A47")
        + card("For whom?", "How the output is shared among people", "Who earns the wages, and so who can afford the rice?", "#8A6A2E")
        + '</div><div style="margin-top:30px;display:flex;justify-content:space-between;align-items:center">'
        '<div style="font-size:31px;font-weight:750;color:#8A6A2E">Change one answer and the others change too.</div>'
        '<div class="tag" style="font-size:24px">Hypothetical village with limited land and labour</div></div>')
page("V05_Three_Questions", 2400, 590, body)


# ================================================================ V06 micro vs macro
mini_ds = ('<svg width="300" height="240" viewBox="0 0 300 240"><line x1="30" y1="210" x2="290" y2="210" stroke="#0E1E3A" stroke-width="5"/>'
           '<line x1="30" y1="210" x2="30" y2="10" stroke="#0E1E3A" stroke-width="5"/>'
           '<line x1="50" y1="40" x2="270" y2="190" stroke="#1B3460" stroke-width="7"/><line x1="50" y1="185" x2="270" y2="45" stroke="#B08A47" stroke-width="7"/>'
           '<circle cx="158" cy="114" r="11" fill="#0E1E3A" stroke="#fff" stroke-width="4"/>'
           '<text x="276" y="200" font-size="26" font-weight="800" fill="#1B3460">D</text><text x="276" y="50" font-size="26" font-weight="800" fill="#8A6A2E">S</text></svg>')
gauge = lambda t, s: (f'<div class="card" style="padding:22px 28px;height:142px;display:flex;flex-direction:column;justify-content:center">'
                      f'<div style="font-size:33px;font-weight:800">{t}</div><div class="muted" style="font-size:26px;font-weight:600;margin-top:6px">{s}</div></div>')
chip = lambda t: f'<div style="background:#F7F3E8;border:3px solid #E2D6BC;border-radius:999px;padding:12px 26px;font-size:28px;font-weight:700">{t}</div>'
body = ('<div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;height:540px">'
        '<div class="card" style="padding:34px 40px;display:flex;flex-direction:column">'
        '<div class="cap" style="font-size:26px">Microeconomics · zoom in</div>'
        '<div style="font-size:36px;font-weight:800;margin:10px 0 14px">Individual agents and specific markets</div>'
        f'<div style="display:flex;gap:30px;align-items:center;flex:1"><div style="border:8px solid #B08A47;border-radius:50%;width:330px;height:330px;display:flex;align-items:center;justify-content:center;flex-shrink:0">{mini_ds}</div>'
        '<div style="display:flex;flex-direction:column;gap:16px;font-size:30px;font-weight:600;line-height:1.3">'
        '<div>Price of wheat in one mandi</div><div>Output of one textile mill</div><div>Wages in one industry</div>'
        f'<div style="display:flex;gap:12px;margin-top:6px">{chip("Households")}{chip("Firms")}</div></div></div></div>'
        '<div class="card" style="padding:34px 40px;display:flex;flex-direction:column">'
        '<div class="cap" style="font-size:26px">Macroeconomics · zoom out</div>'
        '<div style="font-size:36px;font-weight:800;margin:10px 0 18px">The economy as a whole: aggregates</div>'
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">'
        + gauge("Total output", "GDP") + gauge("General price level", "inflation")
        + gauge("Unemployment", "the share of the labour force without work") + gauge("Economic growth", "change in output over time")
        + '</div></div></div>'
        '<div style="margin-top:30px;display:flex;align-items:center;gap:20px;background:#F6EFDF;border-radius:22px;padding:22px 34px">'
        '<div class="cap" style="font-size:24px;white-space:nowrap">Connecting the two</div>'
        f'<div style="font-size:30px;font-weight:700">Diesel prices rise in one market</div>{arrow(70)}'
        f'<div style="font-size:30px;font-weight:700">transport costs rise for many firms</div>{arrow(70)}'
        '<div style="font-size:30px;font-weight:700">the general price level may rise</div></div>')
page("V06_Micro_Macro", 2400, 700, body)


# ================================================================ V09 economic systems spectrum
col = lambda name, who, own, plus, minus, hi=False: (
    f'<div class="card" style="padding:30px 34px;{"border:5px solid #B08A47;background:#FFFCF4;" if hi else ""}">'
    f'<div style="font-size:38px;font-weight:850;margin-bottom:16px">{name}</div>'
    f'<div class="cap" style="font-size:20px">Who decides</div><div style="font-size:29px;font-weight:600;margin:4px 0 14px">{who}</div>'
    f'<div class="cap" style="font-size:20px">Ownership</div><div style="font-size:29px;font-weight:600;margin:4px 0 14px">{own}</div>'
    f'<div class="cap" style="font-size:20px;color:#2E7D5B">Strength</div><div style="font-size:29px;font-weight:600;margin:4px 0 14px">{plus}</div>'
    f'<div class="cap" style="font-size:20px;color:#B0412E">Risk</div><div style="font-size:29px;font-weight:600;margin-top:4px">{minus}</div></div>')
body = ('<div style="display:flex;justify-content:space-between;font-size:26px;font-weight:800;letter-spacing:.12em;color:#5B6577;margin-bottom:10px">'
        '<span>MARKETS DECIDE MORE</span><span>THE STATE DECIDES MORE</span></div>'
        '<div style="height:26px;border-radius:13px;background:linear-gradient(90deg,#E2C98F,#B08A47 45%,#1B3460 75%,#0E1E3A);position:relative;margin-bottom:34px">'
        '<div style="position:absolute;left:48.5%;top:-14px;width:54px;height:54px;border-radius:50%;background:#fff;border:7px solid #B08A47"></div></div>'
        '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:30px">'
        + col("Market economy", "Buyers and sellers, through prices", "Mostly private", "Responds quickly to what buyers want", "Needs of people with little purchasing power may be neglected")
        + col("Mixed economy", "Markets and government together", "Private and public", "Market incentives plus public provision", "Striking the right balance is difficult", hi=True)
        + col("Centrally planned", "A central planning authority", "Mostly state", "Can direct resources to national priorities", "Weak incentives and slow information")
        + '</div><div style="display:flex;justify-content:space-between;align-items:center;margin-top:24px">'
        '<div style="font-size:30px;font-weight:750;color:#8A6A2E">Real economies sit along this spectrum: none is purely one type.</div>'
        '<div style="background:#0E1E3A;color:#fff;border-radius:999px;padding:12px 30px;font-size:28px;font-weight:800">India: a mixed economy</div></div>')
page("V09_Economic_Systems", 2400, 700, body)


# ================================================================ V10 positive vs normative, ceteris paribus
stmt = lambda cap, q, badge, c: (f'<div class="card" style="padding:28px 34px;border-left:16px solid {c}">'
                                 f'<div style="display:flex;justify-content:space-between;align-items:center"><div class="cap" style="font-size:24px;color:{c}">{cap}</div>'
                                 f'<div style="background:{c};color:#fff;border-radius:999px;padding:8px 22px;font-size:24px;font-weight:800">{badge}</div></div>'
                                 f'<div style="font-size:35px;font-weight:700;line-height:1.3;margin-top:16px">{q}</div></div>')
lockrow = lambda t, locked: (f'<div style="display:flex;align-items:center;gap:22px;padding:16px 24px;border-radius:18px;'
                             f'background:{"#F2F3F5" if locked else "#F6EFDF"};{"" if locked else "border:4px solid #B08A47;"}">'
                             f'{(LOCK if locked else UNLOCK).format(c="#5B6577" if locked else "#B08A47")}'
                             f'<div style="font-size:32px;font-weight:{650 if locked else 850};color:{"#5B6577" if locked else "#0E1E3A"}">{t}</div>'
                             f'<div style="margin-left:auto;font-size:26px;font-weight:700;color:{"#5B6577" if locked else "#8A6A2E"}">{"held constant" if locked else "allowed to change"}</div></div>')
body = ('<div style="display:grid;grid-template-columns:1.15fr 1fr;gap:40px">'
        '<div style="display:flex;flex-direction:column;gap:26px">'
        + stmt("Positive statement: what is", "“If bus fares rise, the number of daily bus passengers will fall.”", "Testable with evidence", "#1B3460")
        + stmt("Normative statement: what ought to be", "“Bus fares should be kept low so that everyone can afford to travel.”", "Value judgement", "#8A6A2E")
        + '<div style="background:#F6EFDF;border-radius:20px;padding:22px 30px;font-size:30px;font-weight:650;line-height:1.3">'
        'Signal words such as <b>should</b>, <b>ought</b> and <b>fair</b> usually mark a normative claim.</div>'
        + '</div><div class="card" style="padding:28px 32px;display:flex;flex-direction:column;gap:16px">'
        '<div class="cap" style="font-size:24px">Ceteris paribus: other things being equal</div>'
        '<div style="font-size:30px;font-weight:700;margin-bottom:6px">Effect of the price of tea on tea purchases</div>'
        + lockrow("Price of tea", False) + lockrow("Household income", True) + lockrow("Tastes", True) + lockrow("Price of coffee", True)
        + '</div></div>')
page("V10_Facts_Values_Ceteris", 2400, 600, body)


# ================================================================ V12 scarcity vs shortage
seg = lambda t, f, c: f'<div style="flex:{f};background:{c};display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:750;color:#fff">{t}</div>'
body = ('<div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;height:880px">'
        '<div class="card" style="padding:38px 42px;display:flex;flex-direction:column">'
        '<div class="cap" style="font-size:26px">Scarcity · everywhere, always</div>'
        '<div style="font-size:38px;font-weight:800;margin:10px 0 30px">Resources are limited relative to wants, at any price</div>'
        '<div style="font-size:28px;font-weight:700;margin-bottom:10px">Water wanted in a district</div>'
        '<div style="display:flex;height:90px;border-radius:14px;overflow:hidden">'
        + seg("Farms", 38, "#1B3460") + seg("Homes", 22, "#2F5D8C") + seg("Industry", 22, "#8A6A2E") + seg("Power", 18, "#B08A47")
        + '</div><div style="font-size:28px;font-weight:700;margin:30px 0 10px">Water available</div>'
        '<div style="display:flex;height:90px;width:64%;border-radius:14px;background:#0E1E3A;color:#fff;align-items:center;justify-content:center;font-size:26px;font-weight:750">Limited supply</div>'
        '<div style="flex:1"></div><div style="font-size:31px;font-weight:650;line-height:1.35;margin-bottom:22px">Rich economies face it too: as incomes grow, wants grow with them.</div>'
        '<div style="font-size:31px;font-weight:750;color:#8A6A2E;line-height:1.3">Equilibrium in a market removes a shortage, not scarcity. Choices remain.</div>'
        '<div class="tag" style="font-size:22px;margin-top:12px">Illustrative proportions</div></div>'
        '<div class="card" style="padding:38px 42px 10px;display:flex;flex-direction:column">'
        '<div class="cap" style="font-size:26px">Shortage · one market, one price</div>'
        '<div style="font-size:38px;font-weight:800;margin:10px 0 6px">At ₹20, quantity demanded exceeds quantity supplied</div>'
        f'<img src="{img64("G12_Shortage_Mini")}" style="width:100%;height:730px;object-fit:contain"></div></div>')
page("V12_Scarcity_vs_Shortage", 2400, 900, body)


# ================================================================ V15 marginal thinking: two balance scales
def scale(title, ben, cost, verdict, good):
    tilt = -8 if good else 8
    c = "#2E7D5B" if good else "#B0412E"
    return (f'<div class="card" style="padding:30px 40px;display:flex;flex-direction:column;align-items:center">'
            f'<div style="font-size:36px;font-weight:850;align-self:flex-start">{title}</div>'
            f'<svg width="900" height="330" viewBox="0 0 900 330"><polygon points="450,120 410,300 490,300" fill="#0E1E3A"/>'
            f'<g transform="rotate({tilt} 450 120)"><line x1="120" y1="120" x2="780" y2="120" stroke="#0E1E3A" stroke-width="12" stroke-linecap="round"/>'
            f'<line x1="170" y1="120" x2="170" y2="170" stroke="#0E1E3A" stroke-width="5"/><line x1="730" y1="120" x2="730" y2="170" stroke="#0E1E3A" stroke-width="5"/>'
            f'<rect x="60" y="170" width="220" height="96" rx="18" fill="#2E7D5B"/><text x="170" y="214" font-size="28" font-weight="700" fill="#fff" text-anchor="middle">extra revenue</text>'
            f'<text x="170" y="252" font-size="38" font-weight="850" fill="#fff" text-anchor="middle">₹{ben}</text>'
            f'<rect x="620" y="170" width="220" height="96" rx="18" fill="#B0412E"/><text x="730" y="214" font-size="28" font-weight="700" fill="#fff" text-anchor="middle">extra cost</text>'
            f'<text x="730" y="252" font-size="38" font-weight="850" fill="#fff" text-anchor="middle">₹{cost}</text></g></svg>'
            f'<div style="background:{c};color:#fff;border-radius:999px;padding:14px 36px;font-size:34px;font-weight:850">{verdict}</div></div>')
body = ('<div style="display:grid;grid-template-columns:1fr 1fr;gap:40px">'
        + scale("Weekday evening: one more hour?", 800, 500, "Stay open: gain ₹300", True)
        + scale("Late Sunday night: one more hour?", 300, 500, "Close: would lose ₹200", False)
        + '</div><div class="tag" style="font-size:22px;margin-top:12px;text-align:right">Hypothetical shop; extra cost covers power and staff</div>')
page("V15_Margin_Scales", 2400, 640, body)


# ================================================================ V16 one budget, three projects, ranked
opt = lambda rank, t, rows, c, label, fill: (
    f'<div style="display:grid;grid-template-columns:90px 1fr 430px;align-items:center;gap:26px;height:220px">'
    f'<div style="width:84px;height:84px;border-radius:50%;background:{c};color:#fff;display:flex;align-items:center;justify-content:center;font-size:44px;font-weight:850">{rank}</div>'
    f'<div class="card" style="height:200px;padding:26px 34px;border-left:14px solid {c};background:{fill}">'
    f'<div style="font-size:38px;font-weight:850">{t}</div>'
    f'<div class="muted" style="font-size:29px;font-weight:600;margin-top:10px;line-height:1.35">{rows}</div></div>'
    f'<div style="font-size:31px;font-weight:800;color:{c};line-height:1.3">{label}</div></div>')
body = ('<div style="display:grid;grid-template-columns:430px 110px 1fr;align-items:center">'
        '<div class="navy" style="height:340px;padding:36px;display:flex;flex-direction:column;justify-content:center">'
        '<div style="font-size:58px;font-weight:850">₹500 crore</div><div style="font-size:31px;font-weight:600;margin-top:10px">for one new project this year</div>'
        '<div style="font-size:26px;font-style:italic;color:#E2C98F;margin-top:14px">hypothetical state budget</div></div>'
        f'<div style="display:flex;justify-content:center">{arrow(90)}</div><div>'
        + opt(1, "Irrigation canals", "Assured water for drought-prone farms", "#2E7D5B", "Chosen", "#F4FAF6")
        + opt(2, "District hospital upgrade", "More beds and specialist care", "#8A6A2E", "Next-best: its benefits are the opportunity cost", "#FBF5E8")
        + opt(3, "Electric buses", "Cleaner, faster city commuting", "#8C93A0", "Also forgone, but not counted", "#F7F7F8")
        + '</div></div><div style="display:flex;justify-content:space-between;margin-top:20px">'
        '<div style="font-size:30px;font-weight:750;color:#8A6A2E">Ranking by one hypothetical decision-maker; another district could rank them differently.</div></div>')
page("V16_Budget_Ranking", 2400, 760, body)


# ================================================================ V26 two roles each (households and firms in two markets)
cell = lambda t, s, c: (f'<div class="card" style="padding:26px 32px;height:206px;display:flex;flex-direction:column;justify-content:center;border-top:10px solid {c}">'
                        f'<div style="font-size:35px;font-weight:850">{t}</div><div class="muted" style="font-size:29px;font-weight:600;margin-top:8px;line-height:1.3">{s}</div></div>')
head = lambda t: f'<div class="cap" style="font-size:26px;text-align:center">{t}</div>'
rowh = lambda t: f'<div class="navy" style="height:206px;display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:850;letter-spacing:.06em">{t}</div>'
body = ('<div style="display:grid;grid-template-columns:360px 1fr 1fr;gap:24px;align-items:center">'
        '<div></div>' + head("In the factor market") + head("In the product market")
        + rowh("HOUSEHOLDS") + cell("Sell factor services", "labour, land, capital and enterprise, and earn factor incomes", "#B08A47")
        + cell("Buy goods and services", "their spending becomes firms' revenue", "#B08A47")
        + rowh("FIRMS") + cell("Hire factor services", "and pay wages, rent, interest and profit", "#B08A47")
        + cell("Produce and sell", "goods and services to households", "#B08A47")
        + '</div><div style="margin-top:26px;background:#F6EFDF;border-radius:22px;padding:22px 34px;font-size:31px;font-weight:700">'
        'One person, two roles: a mill worker earns wages from one firm and spends them in other firms\' shops.</div>')
page("V26_Two_Roles", 2400, 700, body)
