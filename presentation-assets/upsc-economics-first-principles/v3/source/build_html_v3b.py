"""v3b: re-proportioned infographics sized to the space each slide actually gives them (larger type).

Same content as build_html_v3.py; only proportions and type sizes change. Output names end in _b.
"""
from build_html_v3 import page, arrow, LOCK, UNLOCK, img64

# ================================================================ V04b scarcity, choice, allocation chain (2400x720)
node = lambda t, s, c: (f'<div style="width:500px;height:440px;border-radius:34px;background:{c};color:#fff;display:flex;flex-direction:column;'
                        f'justify-content:center;padding:0 40px"><div style="font-size:60px;font-weight:850;letter-spacing:.05em">{t}</div>'
                        f'<div style="font-size:38px;font-weight:550;margin-top:16px;line-height:1.3;color:#F7F3E8">{s}</div></div>')
inputs = ('<div style="display:flex;flex-direction:column;gap:28px;width:470px">'
          '<div class="card" style="height:206px;display:flex;flex-direction:column;justify-content:center;padding:0 32px">'
          '<div class="cap" style="font-size:28px">Limited</div><div style="font-size:40px;font-weight:750;line-height:1.25;margin-top:8px">land, labour, capital, time</div></div>'
          '<div class="card" style="height:206px;display:flex;flex-direction:column;justify-content:center;padding:0 32px">'
          '<div class="cap" style="font-size:28px">Unlimited</div><div style="font-size:40px;font-weight:750;line-height:1.25;margin-top:8px">wants that keep growing</div></div></div>')
body = (f'<div style="display:flex;align-items:center;gap:20px;height:450px">{inputs}{arrow(90)}'
        f'{node("SCARCITY", "Resources fall short of wants", "#0E1E3A")}{arrow(70)}'
        f'{node("CHOICE", "Using a resource one way rules out another", "#1B3460")}{arrow(70)}'
        f'{node("ALLOCATION", "Deciding what, how and for whom", "#8A6A2E")}</div>'
        '<div style="margin-top:30px;background:#F6EFDF;border-radius:24px;padding:26px 40px;display:flex;align-items:center;gap:30px">'
        '<div style="font-size:40px;font-weight:850;color:#B0412E;white-space:nowrap">Not just money</div>'
        '<div style="font-size:36px;font-weight:600;line-height:1.3">A farmer dividing land between crops, a student dividing time between subjects '
        'and a state dividing its budget between schools and roads are all economic choices.</div></div>')
page("V04b_Scarcity_Choice_Allocation", 2400, 720, body)


# ================================================================ V05b three central questions (2400x960)
card = lambda q, s, ex, c: (f'<div class="card" style="width:710px;height:720px;padding:50px 50px;display:flex;flex-direction:column;border-top:20px solid {c}">'
                            f'<div style="font-size:92px;font-weight:850;color:{c};line-height:1">{q}</div>'
                            f'<div style="font-size:52px;font-weight:700;margin-top:28px;line-height:1.25">{s}</div>'
                            f'<div style="flex:1"></div><div style="height:4px;background:#E2D6BC;margin-bottom:26px"></div>'
                            f'<div class="cap" style="font-size:28px;margin-bottom:12px">In the village</div>'
                            f'<div style="font-size:50px;font-weight:650;line-height:1.25;height:190px">{ex}</div></div>')
body = ('<div style="display:flex;justify-content:space-between;align-items:center">'
        + card("What?", "Which goods and services, and how much of each", "More rice, and so less cotton?", "#0E1E3A")
        + arrow(90, "#B08A47")
        + card("How?", "Which techniques: more labour, more machines, or a mix", "Tractors or hired farm workers?", "#1B3460")
        + arrow(90, "#B08A47")
        + card("For whom?", "How the output is shared among people", "Who earns wages, and so who can buy the rice?", "#8A6A2E")
        + '</div><div style="margin-top:28px;display:flex;justify-content:space-between;align-items:center">'
        '<div style="font-size:40px;font-weight:800;color:#8A6A2E">Change one answer and the others change too.</div>'
        '<div class="tag" style="font-size:28px">Hypothetical village with limited land and labour</div></div>')
page("V05b_Three_Questions", 2400, 860, body)


# ================================================================ V06b micro vs macro (2400x860)
mini_ds = ('<svg width="330" height="270" viewBox="0 0 300 240"><line x1="30" y1="210" x2="290" y2="210" stroke="#0E1E3A" stroke-width="6"/>'
           '<line x1="30" y1="210" x2="30" y2="10" stroke="#0E1E3A" stroke-width="6"/>'
           '<line x1="50" y1="40" x2="270" y2="190" stroke="#1B3460" stroke-width="8"/><line x1="50" y1="185" x2="270" y2="45" stroke="#B08A47" stroke-width="8"/>'
           '<circle cx="158" cy="114" r="12" fill="#0E1E3A" stroke="#fff" stroke-width="4"/>'
           '<text x="272" y="205" font-size="28" font-weight="800" fill="#1B3460">D</text><text x="272" y="44" font-size="28" font-weight="800" fill="#8A6A2E">S</text></svg>')
gauge = lambda t, s: (f'<div class="card" style="padding:24px 30px;height:200px;display:flex;flex-direction:column;justify-content:center">'
                      f'<div style="font-size:42px;font-weight:800">{t}</div><div class="muted" style="font-size:32px;font-weight:600;margin-top:8px;line-height:1.25">{s}</div></div>')
chip = lambda t: f'<div style="background:#F7F3E8;border:3px solid #E2D6BC;border-radius:999px;padding:12px 28px;font-size:34px;font-weight:700">{t}</div>'
body = ('<div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;height:640px">'
        '<div class="card" style="padding:36px 42px;display:flex;flex-direction:column">'
        '<div class="cap" style="font-size:30px">Microeconomics · zoom in</div>'
        '<div style="font-size:44px;font-weight:800;margin:12px 0 10px">Individual agents and specific markets</div>'
        f'<div style="display:flex;gap:34px;align-items:center;flex:1"><div style="border:9px solid #B08A47;border-radius:50%;width:370px;height:370px;display:flex;align-items:center;justify-content:center;flex-shrink:0">{mini_ds}</div>'
        '<div style="display:flex;flex-direction:column;gap:18px;font-size:38px;font-weight:650;line-height:1.25">'
        '<div>Price of wheat in one mandi</div><div>Output of one textile mill</div><div>Wages in one industry</div>'
        f'<div style="display:flex;gap:14px;margin-top:6px">{chip("Households")}{chip("Firms")}</div></div></div></div>'
        '<div class="card" style="padding:36px 42px;display:flex;flex-direction:column">'
        '<div class="cap" style="font-size:30px">Macroeconomics · zoom out</div>'
        '<div style="font-size:44px;font-weight:800;margin:12px 0 22px">The economy as a whole: aggregates</div>'
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:22px">'
        + gauge("Total output", "GDP") + gauge("Price level", "inflation")
        + gauge("Unemployment", "share of the labour force without work") + gauge("Growth", "change in output over time")
        + '</div></div></div>'
        '<div style="margin-top:28px;display:flex;align-items:center;gap:20px;background:#F6EFDF;border-radius:24px;padding:24px 34px">'
        '<div class="cap" style="font-size:28px;white-space:nowrap">Connecting the two</div>'
        f'<div style="font-size:36px;font-weight:750">Diesel prices rise in one market</div>{arrow(70)}'
        f'<div style="font-size:36px;font-weight:750">transport costs rise for many firms</div>{arrow(70)}'
        '<div style="font-size:36px;font-weight:750">the price level may rise</div></div>')
page("V06b_Micro_Macro", 2400, 860, body)


# ================================================================ V09b economic systems spectrum (2400x860)
col = lambda name, who, own, plus, minus, hi=False: (
    f'<div class="card" style="padding:30px 36px;{"border:6px solid #B08A47;background:#FFFCF4;" if hi else ""}">'
    f'<div style="font-size:48px;font-weight:850;margin-bottom:14px">{name}</div>'
    f'<div class="cap" style="font-size:24px">Who decides</div><div style="font-size:36px;font-weight:600;margin:2px 0 14px;line-height:1.25">{who}</div>'
    f'<div class="cap" style="font-size:24px">Ownership</div><div style="font-size:36px;font-weight:600;margin:2px 0 14px">{own}</div>'
    f'<div class="cap" style="font-size:24px;color:#2E7D5B">Strength</div><div style="font-size:36px;font-weight:600;margin:2px 0 14px;line-height:1.25">{plus}</div>'
    f'<div class="cap" style="font-size:24px;color:#B0412E">Risk</div><div style="font-size:36px;font-weight:600;margin-top:2px;line-height:1.25">{minus}</div></div>')
body = ('<div style="display:flex;justify-content:space-between;font-size:30px;font-weight:800;letter-spacing:.12em;color:#5B6577;margin-bottom:12px">'
        '<span>MARKETS DECIDE MORE</span><span>THE STATE DECIDES MORE</span></div>'
        '<div style="height:30px;border-radius:15px;background:linear-gradient(90deg,#E2C98F,#B08A47 45%,#1B3460 75%,#0E1E3A);position:relative;margin-bottom:34px">'
        '<div style="position:absolute;left:48.3%;top:-15px;width:60px;height:60px;border-radius:50%;background:#fff;border:8px solid #B08A47"></div></div>'
        '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:30px">'
        + col("Market economy", "Buyers and sellers, through prices", "Mostly private", "Responds quickly to what buyers want", "Needs of people with little purchasing power may be neglected")
        + col("Mixed economy", "Markets and government together", "Private and public", "Market incentives plus public provision", "Striking the right balance is difficult", hi=True)
        + col("Centrally planned", "A central planning authority", "Mostly state", "Can direct resources to national priorities", "Weak incentives and slow information")
        + '</div><div style="display:flex;justify-content:space-between;align-items:center;margin-top:22px">'
        '<div style="font-size:36px;font-weight:750;color:#8A6A2E">Real economies sit along this spectrum: none is purely one type.</div>'
        '<div style="background:#0E1E3A;color:#fff;border-radius:999px;padding:14px 32px;font-size:34px;font-weight:800">India: a mixed economy</div></div>')
page("V09b_Economic_Systems", 2400, 860, body)


# ================================================================ V10b facts, values, ceteris paribus (2400x860)
stmt = lambda cap, q, badge, c: (f'<div class="card" style="padding:30px 36px;border-left:18px solid {c}">'
                                 f'<div style="display:flex;justify-content:space-between;align-items:center"><div class="cap" style="font-size:28px;color:{c}">{cap}</div>'
                                 f'<div style="background:{c};color:#fff;border-radius:999px;padding:10px 26px;font-size:28px;font-weight:800">{badge}</div></div>'
                                 f'<div style="font-size:44px;font-weight:700;line-height:1.28;margin-top:16px">{q}</div></div>')
lockrow = lambda t, locked: (f'<div style="display:flex;align-items:center;gap:24px;padding:20px 28px;border-radius:20px;'
                             f'background:{"#F2F3F5" if locked else "#F6EFDF"};{"" if locked else "border:5px solid #B08A47;"}">'
                             f'{(LOCK if locked else UNLOCK).format(c="#5B6577" if locked else "#B08A47")}'
                             f'<div style="font-size:40px;font-weight:{650 if locked else 850};color:{"#5B6577" if locked else "#0E1E3A"}">{t}</div>'
                             f'<div style="margin-left:auto;font-size:30px;font-weight:700;color:{"#5B6577" if locked else "#8A6A2E"}">{"held constant" if locked else "allowed to change"}</div></div>')
body = ('<div style="display:grid;grid-template-columns:1.2fr 1fr;gap:40px">'
        '<div style="display:flex;flex-direction:column;gap:26px">'
        + stmt("Positive: what is", "“If bus fares rise, the number of daily bus passengers will fall.”", "Testable with evidence", "#1B3460")
        + stmt("Normative: what ought to be", "“Bus fares should be kept low so that everyone can afford to travel.”", "Value judgement", "#8A6A2E")
        + '<div style="background:#F6EFDF;border-radius:22px;padding:24px 32px;font-size:36px;font-weight:650;line-height:1.3">'
        'Signal words such as <b>should</b>, <b>ought</b> and <b>fair</b> usually mark a normative claim.</div></div>'
        '<div class="card" style="padding:30px 34px;display:flex;flex-direction:column;gap:18px">'
        '<div class="cap" style="font-size:28px">Ceteris paribus: other things being equal</div>'
        '<div style="font-size:38px;font-weight:750;margin-bottom:4px">Effect of the price of tea on tea purchases</div>'
        + lockrow("Price of tea", False) + lockrow("Household income", True) + lockrow("Tastes", True) + lockrow("Price of coffee", True)
        + '</div></div>')
page("V10b_Facts_Values_Ceteris", 2400, 860, body)


# ================================================================ V15b marginal thinking scales (2400x860)
def scale(title, ben, cost, verdict, good):
    tilt = -8 if good else 8
    c = "#2E7D5B" if good else "#B0412E"
    return (f'<div class="card" style="padding:34px 40px;display:flex;flex-direction:column;align-items:center;height:800px">'
            f'<div style="font-size:46px;font-weight:850;align-self:flex-start">{title}</div>'
            f'<svg width="1020" height="470" viewBox="0 0 900 400"><polygon points="450,150 400,370 500,370" fill="#0E1E3A"/>'
            f'<g transform="rotate({tilt} 450 150)"><line x1="100" y1="150" x2="800" y2="150" stroke="#0E1E3A" stroke-width="13" stroke-linecap="round"/>'
            f'<line x1="170" y1="150" x2="170" y2="200" stroke="#0E1E3A" stroke-width="6"/><line x1="730" y1="150" x2="730" y2="200" stroke="#0E1E3A" stroke-width="6"/>'
            f'<rect x="50" y="200" width="240" height="110" rx="20" fill="#2E7D5B"/><text x="170" y="246" font-size="30" font-weight="700" fill="#fff" text-anchor="middle">extra revenue</text>'
            f'<text x="170" y="292" font-size="44" font-weight="850" fill="#fff" text-anchor="middle">₹{ben}</text>'
            f'<rect x="610" y="200" width="240" height="110" rx="20" fill="#B0412E"/><text x="730" y="246" font-size="30" font-weight="700" fill="#fff" text-anchor="middle">extra cost</text>'
            f'<text x="730" y="292" font-size="44" font-weight="850" fill="#fff" text-anchor="middle">₹{cost}</text></g></svg>'
            f'<div style="background:{c};color:#fff;border-radius:999px;padding:16px 40px;font-size:42px;font-weight:850;margin-top:6px">{verdict}</div></div>')
body = ('<div style="display:grid;grid-template-columns:1fr 1fr;gap:40px">'
        + scale("Weekday evening: one more hour?", 800, 500, "Stay open: gain ₹300", True)
        + scale("Late Sunday night: one more hour?", 300, 500, "Close: would lose ₹200", False)
        + '</div><div class="tag" style="font-size:26px;margin-top:8px;text-align:right">Hypothetical shop; extra cost covers power and staff</div>')
page("V15b_Margin_Scales", 2400, 880, body)


# ================================================================ V26b two roles each (2400x860)
cell = lambda t, s: (f'<div class="card" style="padding:28px 36px;height:270px;display:flex;flex-direction:column;justify-content:center;border-top:12px solid #B08A47">'
                     f'<div style="font-size:46px;font-weight:850">{t}</div><div class="muted" style="font-size:37px;font-weight:600;margin-top:10px;line-height:1.28">{s}</div></div>')
head = lambda t: f'<div class="cap" style="font-size:30px;text-align:center">{t}</div>'
rowh = lambda t: f'<div class="navy" style="height:270px;display:flex;align-items:center;justify-content:center;font-size:42px;font-weight:850;letter-spacing:.06em">{t}</div>'
body = ('<div style="display:grid;grid-template-columns:380px 1fr 1fr;gap:26px;align-items:center">'
        '<div></div>' + head("In the factor market") + head("In the product market")
        + rowh("HOUSEHOLDS") + cell("Sell factor services", "labour, land, capital and enterprise, and earn factor incomes")
        + cell("Buy goods and services", "their spending becomes firms' revenue")
        + rowh("FIRMS") + cell("Hire factor services", "and pay wages, rent, interest and profit")
        + cell("Produce and sell", "goods and services to households")
        + '</div><div style="margin-top:28px;background:#F6EFDF;border-radius:24px;padding:24px 36px;font-size:38px;font-weight:700">'
        'One person, two roles: a mill worker earns wages from one firm and spends them in other firms\' shops.</div>')
page("V26b_Two_Roles", 2400, 860, body)


# ================================================================ V16c one budget, three projects, ranked (wide and short)
opt = lambda rank, t, ben, c, label, fill: (
    f'<div class="card" style="width:600px;height:430px;padding:30px 34px;display:flex;flex-direction:column;border-top:16px solid {c};background:{fill}">'
    f'<div style="display:flex;align-items:center;gap:20px"><div style="width:76px;height:76px;border-radius:50%;background:{c};color:#fff;display:flex;'
    f'align-items:center;justify-content:center;font-size:42px;font-weight:850;flex-shrink:0">{rank}</div>'
    f'<div style="font-size:44px;font-weight:850;line-height:1.1">{t}</div></div>'
    f'<div class="muted" style="font-size:36px;font-weight:600;margin-top:22px;line-height:1.3">{ben}</div>'
    f'<div style="flex:1"></div><div style="font-size:36px;font-weight:850;color:{c};line-height:1.25">{label}</div></div>')
body = ('<div style="display:flex;align-items:center;gap:18px">'
        '<div class="navy" style="width:400px;height:430px;padding:34px;display:flex;flex-direction:column;justify-content:center;flex-shrink:0">'
        '<div style="font-size:64px;font-weight:850;line-height:1.05">₹500 crore</div><div style="font-size:36px;font-weight:600;margin-top:14px;line-height:1.25">for one new project this year</div>'
        '<div style="font-size:30px;font-style:italic;color:#E2C98F;margin-top:18px">hypothetical state budget</div></div>'
        f'{arrow(70)}'
        + opt(1, "Irrigation canals", "Assured water for drought-prone farms", "#2E7D5B", "Chosen", "#F4FAF6")
        + opt(2, "Hospital upgrade", "More beds and specialist care in the district", "#8A6A2E", "Next-best: its benefits are the opportunity cost", "#FBF5E8")
        + opt(3, "Electric buses", "Cleaner, faster city commuting", "#8C93A0", "Also forgone, but not counted", "#F7F7F8")
        + '</div><div style="font-size:32px;font-weight:750;color:#8A6A2E;margin-top:18px">Ranking by one hypothetical decision-maker; another district could rank them differently.</div>')
page("V16c_Budget_Ranking", 2400, 560, body)
