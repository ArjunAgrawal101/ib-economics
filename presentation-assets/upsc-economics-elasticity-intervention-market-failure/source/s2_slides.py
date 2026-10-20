"""Section II: the 50 slides as Gamma card markup (used for layout edits) plus a markdown version (used for generation)."""
import json, re, os

B = "https://raw.githubusercontent.com/ArjunAgrawal101/ib-economics/presentation-assets/presentation-assets/upsc-economics-elasticity-intervention-market-failure"
LOGO = B + "/brand/AA_Logo_trimmed_transparent.png"
PAD = "48pt 44pt 40pt 44pt"
E1, E2, E3, E4 = "PART I · ELASTICITY", "PART II · GOVERNMENT INTERVENTION", "PART III · MARKET FAILURE", "PART IV · SYNTHESIS AND PRACTICE"
E0 = "SECTION II · OVERVIEW"


def img(name, alt, h, w=None):
    ws = f' width="{w}pt"' if w else ""
    return f'<img alt="{alt}" fit="contain" sizing="fixed" height="{h}pt"{ws} src="{B}/png/{name}.png">'


def head(eye, title, size=30):
    return f'<p role="eyebrow">{eye}</p><h2 font-size="{size}pt">{title}</h2>'


def card(inner, va=None):
    v = f' vertical-align="{va}"' if va else ""
    return f'<section background-color="#FBF9F3"{v} image-layout="blank"><grid spacing="none"><grid-item padding="{PAD}">{inner}</grid-item></grid></section>'


def cols(*items, spacing="medium"):
    """items: (colspan, html, extra_attrs)"""
    assert sum(c for c, *_ in items) == 60, [c for c, *_ in items]
    out = f'<grid spacing="{spacing}">'
    for it in items:
        c, h = it[0], it[1]
        extra = (" " + it[2]) if len(it) > 2 and it[2] else ""
        out += f'<grid-item colspan="{c}"{extra}>{h}</grid-item>'
    return out + "</grid>"


def cells(texts, style='cell-style="subtle" padding="10pt 14pt"'):
    n = len(texts)
    spans = {1: [60], 2: [30, 30], 3: [20, 20, 20], 4: [15, 15, 15, 15]}[n]
    return cols(*[(s, f"<p>{t}</p>", style) for s, t in zip(spans, texts)], spacing="small")


def opener(eye, title, paras, image, alt):
    left = (f'<p role="eyebrow"><span text-color="#D4AF6A">{eye}</span></p>'
            f'<h2 font-size="32pt"><span text-color="#FBF9F3">{title}</span></h2>'
            + "".join(f'<p><span text-color="#F7F3E8">{p}</span></p>' for p in paras))
    return ('<section background-color="#FBF9F3" image-layout="blank"><grid spacing="none"><grid-item padding="50pt 36pt 52pt 36pt">'
            '<grid spacing="medium" vertical-sizing="fill">'
            f'<grid-item colspan="22" style="border-radius: 14pt" padding="36pt 28pt 32pt 30pt" background-color="#0E1E3A" vertical-align="center">{left}</grid-item>'
            f'<grid-item colspan="38" padding="8pt 4pt 0pt 8pt"><img alt="{alt}" fit="contain" fill="true" src="{B}/png/{image}.png"></grid-item>'
            '</grid></grid-item></grid></section>')


S = []

# 1 Cover
S.append('<section background-color="#FBF9F3" image-layout="blank"><grid spacing="none"><grid-item padding="50pt 36pt 54pt 36pt"><grid spacing="large" vertical-sizing="fill">'
         f'<grid-item colspan="35" padding="18pt 8pt 8pt 20pt" vertical-align="center"><img alt="Arjun Agrawal logo" fit="contain" height="92pt" src="{LOGO}">'
         '<p role="eyebrow">UPSC CSE ECONOMICS · SECTION II</p>'
         '<h1 font-size="44pt">Elasticity, Government Intervention and Market Failure</h1>'
         '<h3 role="subheading">Understanding Economic Behaviour, Policy Instruments and Market Outcomes</h3>'
         '<hr horizontalAlign="left" width="xs" thickness="md" color="#B08A47"><p><b>Arjun Agrawal | UPSC CSE Economics</b></p></grid-item>'
         f'<grid-item colspan="25" padding="0" style="border-radius: 14pt" background-color="#0E1E3A"><img alt="Abstract demand, supply and tax lines" fit="cover" fill="true" src="{B}/png/C01_Cover_Motif.png"></grid-item>'
         '</grid></grid-item></grid></section>')

# 2 Bridge
S.append(card(head(E0, "From Market Mechanisms to Economic Policy") + img("S02_Bridge", "Section I foundations lead to three new questions", 292)
              + '<p>Section II uses demand and supply as working tools. It does not reteach them.</p>'))

# 3 Map
S.append(card(head(E0, "Three Questions That Guide This Section") + img("S03_Map", "Elasticity, intervention and market failure map", 270)
              + '<p>Behaviour shapes how policies work; diagnosing the problem decides which policy fits.</p>'))

# 4 Opener I
S.append(opener("PART I · ELASTICITY AND ECONOMIC RESPONSIVENESS", "Elasticity: Measuring Responsiveness",
                ["Elasticity measures how strongly one variable responds to a change in another, in percentage terms.",
                 "A price change tells us that price moved. Elasticity tells us how far quantity moved in response."],
                "S04_Responsiveness", "Same price rise, different responses"))

# 5 PED calculation
S.append(card(head(E1, "Price Elasticity of Demand: Calculation")
              + cols((25, img("G05_PED_Mini", "PED worked example on a demand curve", 330)),
                     (35, img("S05_PED_Calculation", "PED calculation steps", 318)))))

# 6 Interpreting PED
S.append(card(head(E1, "How to Interpret PED: Five Standard Categories")
              + img("G06_PED_Spectrum_v2", "Five PED categories", 270)
              + cols(*[(12, f'<p>{t}</p>', 'cell-style="subtle" padding="8pt 10pt"') for t in
                       ["Quantity does not respond to price", "Quantity changes by a smaller % than price", "Quantity changes by the same % as price",
                        "Quantity changes by a larger % than price", "Limiting case: any price rise loses all sales"]], spacing="small")))

# 7 Determinants of PED
S.append(card(head(E1, "Why Does PED Differ Across Goods?") + img("S07_PED_Determinants_v2", "Five determinants of PED", 372)))

# 8 PED and spending
S.append(card(head(E1, "PED and Total Expenditure") + img("G08_PED_Expenditure_v2", "Price cuts with elastic and inelastic demand", 314)
              + '<p><b>Unit elastic:</b> spending stays the same. Elastic: price and spending move in opposite directions; inelastic: in the same direction. Sellers and governments need to know which case they face.</p>'))

# 9 YED calculation
S.append(card(head(E1, "Income Elasticity of Demand: Calculation") + img("S09_YED_Calculation", "YED calculation", 318)))

# 10 Interpreting YED
S.append(card(head(E1, "Interpreting YED: Normal, Inferior, Necessity, Luxury") + img("S10_YED_Line_v2", "YED number line", 318)
              + '<p>Necessity and luxury are common introductory labels. The same good can have different YED values for different households and income levels.</p>'))

# 11 YED and India
S.append(card(head(E1, "Why YED Matters for the Indian Economy") + img("S11_YED_India", "Rising income changes budget shares", 318)
              + '<p>As incomes rise across many households, demand tilts towards higher-YED goods, reshaping what the economy produces.</p>'))

# 12 PES
S.append(card(head(E1, "Price Elasticity of Supply")
              + cols((25, img("G12_PES_Mini", "PES worked example on a supply curve", 330)),
                     (35, img("S12_PES_Calculation", "PES calculation steps", 300)))))

# 13 Determinants of PES
S.append(card(head(E1, "What Determines PES?")
              + cols((32, '<ul><li><b>Time</b> to adjust production</li><li><b>Spare capacity</b> in existing plants or farms</li>'
                          '<li><b>Inputs</b> that can be obtained quickly</li><li><b>Storage:</b> stocks can be released</li>'
                          '<li><b>Mobility</b> of land, labour and machines</li><li><b>Length</b> of the production process</li></ul>'
                          '<p>A higher crop price does little for this season\'s harvest: output was largely fixed at sowing, and weather and inputs also matter. Over later seasons farmers can shift crops, expand area and invest.</p>'),
                     (28, img("G13_PES_Time_v2", "Short-run and long-run supply", 372)))))

# 14 XED
S.append(card(head(E1, "Cross-Price Elasticity: The Essential Link")
              + '<p><b>XED</b> = % change in quantity demanded of one good ÷ % change in the price of another good</p>'
              + img("G14_XED", "Substitutes and complements", 290)
              + '<p>A value near zero suggests the two goods are largely unrelated in that context.</p>'))

# 15 Diagnostic
def table(head_row, rows, widths, first_bold=True):
    h = "<tr>" + "".join(f"<td><p><b>{c}</b></p></td>" for c in head_row) + "</tr>"
    body = "".join("<tr>" + "".join(f"<td><p>{'<b>' + c + '</b>' if (j == 0 and first_bold) else c}</p></td>" for j, c in enumerate(r)) + "</tr>" for r in rows)
    return f'<table borders="rows" header-row="true" striped="true" col-widths="{widths}"><tbody>{h}{body}</tbody></table>'


S.append(card(head(E1, "Elasticity Diagnostic: Which Measure, Which Mistake?")
              + table(["Measure", "What changes", "What responds", "Reading the coefficient", "Common mistake"],
                      [["PED", "The good's own price", "Quantity demanded", "Usually negative; |PED| above 1 is elastic", "Reading a steep curve as always inelastic"],
                       ["YED", "Income", "Quantity demanded", "Sign: normal (+) or inferior (-); size: necessity or luxury", "Calling every cheap good inferior"],
                       ["PES", "The good's own price", "Quantity supplied", "Usually positive; above 1 is elastic", "Assuming farms can raise output at once"],
                       ["XED", "Price of another good", "Quantity demanded", "+ substitutes, - complements, near 0 unrelated", "Confusing XED with the good's own PED"]],
                      "[10,18,18,28,26]")
              + cells(["<b>Try it:</b> income rises 10%, demand falls 4%. <i>YED = -0.4: inferior good.</i>",
                       "<b>Try it:</b> coffee price rises 20%, tea demand rises 6%. <i>XED = +0.3: substitutes.</i>",
                       "<b>Try it:</b> is a steep demand curve always inelastic? <i>No: elasticity depends on the point and the scale.</i>"])))

# 16 Opener II
S.append(opener("PART II · GOVERNMENT INTERVENTION AND PRICE CONTROLS", "Why Does Government Intervene in Markets?",
                ["Some interventions aim at efficiency, others at fairness or access to essentials, and some set the rules that let markets work.",
                 "Each motive calls for different tools."],
                "S16_Why_Intervene", "Three reasons for intervention"))

# 17 Decision tree
S.append(card(head(E2, "Diagnose the Problem Before Choosing the Instrument") + img("S17_Decision_Tree_v2", "Policy decision map", 372)))

# 18 Indirect tax
S.append(card(head(E2, "Indirect Taxes: How They Affect a Market")
              + cols((27, img("G18_Tax_Wedge", "Tax wedge diagram", 340)),
                     (33, '<p>A per-unit tax drives a <b>wedge</b> between the price buyers pay and the price sellers keep.</p>'
                          '<ul><li><b>Legal incidence:</b> who must pay the tax to the government (here, sellers)</li>'
                          '<li><b>Economic incidence:</b> who actually bears it through prices: buyers ₹6, sellers ₹4</li>'
                          '<li>Quantity traded falls from 60 to 48 thousand units</li>'
                          '<li>Revenue: ₹10 × 48,000 = ₹4.8 lakh a week</li></ul>'
                          '<p>Indirect taxes raise revenue and, in suitable cases, discourage activities with wider social costs.</p>'))))

# 19 Tax incidence
S.append(card(head(E2, "Who Bears the Burden of a Tax?") + img("G19_Tax_Incidence_v2", "Tax incidence under different elasticities", 318)
              + '<p><b>The less elastic side of the market bears more of the tax</b>, in this basic model. Who hands the money to the government does not decide the burden.</p>'))

# 20 Subsidies
S.append(card(head(E2, "Subsidies: Benefits, Costs and Incentives")
              + cols((26, img("G20_Subsidy_v2", "Producer subsidy diagram", 372)),
                     (34, cols((30, '<p><b>Benefits</b><br>Buyers pay less, sellers receive more, output rises from 60 to 72</p>', 'cell-style="subtle" padding="8pt 12pt"'),
                               (30, '<p><b>Who gains</b><br>The ₹10 splits ₹6 to buyers and ₹4 to sellers, mirroring the tax</p>', 'cell-style="subtle" padding="8pt 12pt"'), spacing="small")
                          + cols((30, '<p><b>Fiscal cost</b><br>₹7.2 lakh a week that cannot fund other priorities</p>', 'cell-style="subtle" padding="8pt 12pt"'),
                                 (30, '<p><b>Targeting and leakage</b><br>Support can reach unintended users or be diverted</p>', 'cell-style="subtle" padding="8pt 12pt"'), spacing="small")
                          + '<p><b>Incentives:</b> cheaper inputs can encourage overuse or excess production. Indian debates on fertiliser and farm power support often turn on this.</p>'
                          '<p><i>A general subsidy lowers the price for every buyer; a targeted transfer supports only eligible households.</i></p>'))))

# 21 Ceilings
S.append(card(head(E2, "Price Ceilings: Binding versus Non-Binding") + img("G21_Price_Ceilings_v2", "Non-binding and binding price ceilings", 336)
              + '<p>In the basic model, a ceiling creates a shortage <b>only when it is binding</b>, that is, set below the equilibrium price.</p>'))

# 22 Ceiling effects
S.append(card(head(E2, "Price Ceilings: Who Gains, Who Loses?")
              + '<p><b>Objective:</b> make an essential good affordable. A binding ceiling delivers a low legal price, not guaranteed access.</p>'
              + img("S22_Ceiling_Effects", "Consequences of a binding ceiling", 300)))

# 23 Floors
S.append(card(head(E2, "Price Floors: Binding versus Non-Binding") + img("G23_Price_Floors_v2", "Non-binding and binding price floors", 330)
              + '<p>This is the competitive-market model. Real crop and labour markets add procurement, enforcement and bargaining power.</p>'))

# 24 MSP
S.append(card(head(E2, "Minimum Support Price: An Applied Market Example")
              + cols((27, img("G24_MSP_Floor", "MSP as a price floor", 340)),
                     (33, '<p><b>MSP:</b> a support price announced by the central government for selected crops, on the recommendation of the Commission for Agricultural Costs and Prices (CACP).</p>'
                          '<p><b>Analogy:</b> if MSP is above the market price and the surplus is bought at MSP, it works like a binding floor.</p>'
                          '<p><b>Qualification:</b> an announced MSP is not automatically a binding floor in every transaction, crop, region or market. Outcomes depend on procurement, market access, crop coverage and implementation.</p>'
                          '<p><i>Where purchase at MSP is limited, market prices can stay below it.</i></p>'))))

# 25 Minimum wage
S.append(card(head(E2, "Minimum Wages: Applying a Price-Floor Framework")
              + cols((27, img("G25_Minimum_Wage_v2", "Minimum wage in a competitive labour market", 372)),
                     (33, '<p><b>Simplest competitive model:</b> a minimum wage of ₹500 above the ₹400 equilibrium raises labour supplied to 60 thousand and cuts labour demanded to 20 thousand: excess supply of 40 thousand.</p>'
                          '<p><b>Real outcomes depend on:</b></p><ul><li>Enforcement and coverage, since many workers are informal</li>'
                          '<li>Employer wage-setting power: a moderate minimum wage need not reduce employment</li>'
                          '<li>Productivity and local labour conditions</li></ul>'
                          '<p><i>The model shows a pressure, not a certainty: evidence differs by context.</i></p>'))))

# 26 Regulation
S.append(card(head(E2, "Regulation, Standards and Enforcement") + img("S26_Regulation_v2", "Problems matched to regulatory tools", 336)
              + '<p>These tools change behaviour without fixing prices.</p>'))

# 27 Provision vs finance
S.append(card(head(E2, "Public Provision, Public Financing and Private Delivery")
              + cells(["<b>Provision:</b> government runs the service itself", "<b>Financing:</b> government pays for access",
                       "<b>Delivery:</b> who actually supplies it, public or private"])
              + img("S27_Finance_Delivery", "Financing versus delivery grid", 262)))

# 28 Targeting
S.append(card(head(E2, "Targeted Transfers versus General Subsidies") + img("S28_Targeting", "General subsidy versus targeted transfer", 262)
              + '<p>Tighter eligibility cuts inclusion errors but can raise exclusion errors and administrative cost. Good design balances access, fiscal cost and incentives.</p>'))

# 29 Information policy
S.append(card(head(E2, "Information Policies and Behavioural Measures") + img("S29_Information_Policy", "Four information measures", 300)))

# 30 Government failure
S.append(card(head(E2, "When Government Intervention Can Fail") + img("S30_Government_Failure", "Government failure along the policy chain", 288)
              + '<p>Government action can improve an outcome, but it can also create new costs or miss the underlying problem.</p>'))

# 31 Mains framework
S.append(card(head(E2, "A Framework for Evaluating Intervention in GS Mains") + img("S31_Mains_Framework_v2", "Six-step policy evaluation framework", 316)
              + '<p>Use the six steps as the skeleton of an answer: each step is one short paragraph, ending with a qualified judgement.</p>'))

# 32 Opener III
S.append(opener("PART III · MARKET FAILURE", "Market Failure: What Does It Actually Mean?",
                ["The market outcome fails to allocate resources efficiently, judged by standard welfare criteria.",
                 "This part examines the five sources on the right."],
                "S32_Market_Failure_Map", "Five categories of market failure"))

# 33 Private vs social
S.append(card(head(E3, "Private Costs, Social Costs and External Benefits")
              + cells(["<b>Private:</b> costs and benefits to the decision-maker",
                       "<b>External:</b> effects on others not represented in the transaction",
                       "<b>Social</b> = private + external"])
              + img("S33_Private_Social", "Private and external parts of social cost and benefit", 270)))

# 34 Negative externality
S.append(card(head(E3, "Negative Externalities: The Cost of Pollution")
              + cols((29, '<ul><li><b>MPC</b>: the cost the producer pays for one more unit</li>'
                          '<li><b>MSC</b> = MPC + external cost (₹10 a unit here), so MSC lies above MPC</li>'
                          '<li>The market produces where MPB = MPC: <b>Q<sub>m</sub> = 60</b> at ₹30</li>'
                          '<li>Efficiency needs MSB = MSC: <b>Q* = 48</b> at ₹36</li>'
                          '<li>Units 48 to 60 cost society more than they are worth (shaded)</li></ul>'
                          '<p><i>Application: emissions from factories or vehicles in a city.</i></p>'),
                     (31, img("G34_Negative_Externality_v2", "Negative production externality", 372)))))

# 35 Positive externality
S.append(card(head(E3, "Positive Externalities: Benefits Beyond the Consumer")
              + cols((29, '<ul><li><b>MPB</b>: the benefit to the person vaccinated</li>'
                          '<li><b>MSB</b> = MPB + external benefit (₹10 a dose here), so MSB lies above MPB</li>'
                          '<li>The market settles where MPB = MPC: <b>Q<sub>m</sub> = 60</b> thousand</li>'
                          '<li>Efficiency needs MSB = MSC: <b>Q* = 72</b> thousand</li>'
                          '<li>Doses 60 to 72 are worth more to society than they cost (shaded)</li></ul>'
                          '<p><i>Education and healthcare can create such benefits too, yet they are rival and excludable, so not pure public goods.</i></p>'),
                     (31, img("G35_Positive_Externality_v2", "Positive consumption externality", 372)))))

# 36 Correcting externalities
S.append(card(head(E3, "Correcting Externalities: Match the Tool to the Problem") + img("G36_Correction_v3", "Tax and subsidy corrections", 236)
              + cols((20, '<p><b>Corrective tax:</b> raises private cost to social cost</p><p><b>Subsidy:</b> raises private benefit to social benefit</p>', 'cell-style="subtle" padding="8pt 12pt"'),
                     (20, '<p><b>Regulation:</b> limits the harmful activity directly</p><p><b>Tradable permits:</b> cap emissions and allow trading</p>', 'cell-style="subtle" padding="8pt 12pt"'),
                     (20, '<p><b>Public provision:</b> fills gaps in private supply</p><p><b>Information:</b> corrects misjudged costs or benefits</p>', 'cell-style="subtle" padding="8pt 12pt"'), spacing="small")))

# 37 Public goods
S.append(card(head(E3, "Public Goods: Two Defining Characteristics")
              + cells(["<b>Non-rival:</b> one person's use does not reduce what others can use, within capacity",
                       "<b>Non-excludable:</b> non-payers cannot easily be kept from benefiting"])
              + cols((12, ""), (24, '<p><b>EXCLUDABLE</b></p>', 'padding="2pt 14pt"'), (24, '<p><b>NON-EXCLUDABLE</b></p>', 'padding="2pt 14pt"'), spacing="small")
              + cols((12, '<p><b><span text-color="#FBF9F3">Rival</span></b></p>', 'background-color="#0E1E3A" padding="10pt 14pt" vertical-align="center" style="border-radius: 10pt"'),
                     (24, '<p><b><span text-color="#1B3460">Private goods</span></b><br>Rice, a mobile phone</p>', 'background-color="#EEF2F7" padding="10pt 16pt" style="border-radius: 10pt"'),
                     (24, '<p><b><span text-color="#2E7D5B">Common-pool resources</span></b><br>Groundwater, fish stocks, common grazing land</p>', 'background-color="#ECF5F0" padding="10pt 16pt" style="border-radius: 10pt"'), spacing="small")
              + cols((12, '<p><b><span text-color="#FBF9F3">Non-rival</span></b></p>', 'background-color="#0E1E3A" padding="10pt 14pt" vertical-align="center" style="border-radius: 10pt"'),
                     (24, '<p><b><span text-color="#5B6577">Club goods</span></b><br>An uncongested toll road, a streaming service</p>', 'background-color="#F1F1F3" padding="10pt 16pt" style="border-radius: 10pt"'),
                     (24, '<p><b><span text-color="#8A6A2E">Public goods</span></b><br>National defence, street lighting, flood warnings</p>', 'background-color="#F8F0DE" padding="10pt 16pt" style="border-radius: 10pt"'), spacing="small")
              + '<p><i>Congestion and technology can move a good between boxes. Government provision does not make a good public.</i></p>'))

# 38 Free rider
S.append(card(head(E3, "The Free-Rider Problem") + img("S38_Free_Rider", "Street lights worth more than they cost but unfunded", 200)
              + '<p>A <b>free rider</b> benefits from a non-excludable good without paying for it. If many reason this way, voluntary contributions fall short even when the good is worth more than it costs.</p>'
              + '<p>This is the case for collective financing, such as local taxes. It does not mean every government-provided good would be underprovided by markets for this reason.</p>'))

# 39 Commons
S.append(card(head(E3, "Common-Pool Resources and the Tragedy of the Commons") + img("S39_Commons", "Shared aquifer and comparison", 310)
              + '<p><b>Tragedy of the commons:</b> each user\'s extra extraction is individually rational, yet together they deplete the shared resource.</p>'))

# 40 Managing commons
S.append(card(head(E3, "Managing Common-Pool Resources") + img("S40_Managing_Commons", "Five tools for managing a shared resource", 304)))

# 41 Market power
S.append(card(head(E3, "Market Power: When Competition Is Limited")
              + '<p><b>Market power</b> is the ability of a seller, or a group of sellers, to influence price, output or terms of sale. <b>Monopoly:</b> one seller. <b>Oligopoly:</b> a few large sellers whose decisions affect one another.</p>'
              + img("S41_Market_Power", "Market structure spectrum and sources of power", 262)))

# 42 Natural monopoly
S.append(card(head(E3, "Monopoly, Natural Monopoly and Consumer Welfare")
              + cols((32, '<p><b>Weak competition</b> can mean higher prices, lower output, poorer quality, slower innovation and less choice.</p>'
                          '<p><b>Natural monopoly:</b> when large fixed costs make average cost fall across the market\'s output, one provider can serve everyone more cheaply than several (₹20 versus ₹30 a household here).</p>'
                          '<p>Common in network infrastructure: water pipes, power transmission lines, rail track.</p>'
                          '<p><b>Hence</b> the case for regulating prices or quality, or other arrangements, so that cost savings reach consumers.</p>'),
                     (28, img("G42_Natural_Monopoly_v2", "Natural monopoly average cost", 372)))))

# 43 CCI
S.append(card(head(E3, "Competition Policy in India") + img("S43_CCI", "Competition Act and the CCI's four functions", 318)
              + '<p><i>Based on the Competition Act, 2002 and the CCI\'s published framework.</i></p>'))

# 44 Information asymmetry
S.append(card(head(E3, "Information Asymmetry")
              + '<p><b>Information asymmetry:</b> one party to a transaction has materially better information than the other. It is one form of the broader <b>information failure</b>, where information is missing, costly or hard to interpret.</p>'
              + img("S44_Information_Asymmetry_v2", "Two information mismatches", 288)))

# 45 AS vs MH
S.append(card(head(E3, "Adverse Selection versus Moral Hazard") + img("S45_AS_vs_MH", "Timeline: before and after the contract", 290)
              + '<p><b>Timing is the test:</b> hidden information before the contract, hidden action after it.</p>'))

# 46 Merit goods
S.append(card(head(E3, "Merit Goods and Demerit Goods") + img("S46_Merit_Goods", "Public, merit and demerit goods compared", 296)
              + '<p>Merit and public goods are different classifications: one rests on a judgement about consumption, the other on rivalry and excludability.</p>'))

# 47 Air pollution case
S.append(card(head(E3, "Indian Application: Diagnosing Urban Air Pollution") + img("S47_Air_Pollution_Case", "Four-part case framework", 310)
              + '<p><b>GS Mains use:</b> activity, mechanism, policy mix, limits: four short paragraphs and a balanced conclusion.</p>'))

# 48 Synthesis
S.append(card(head(E4, "Which Policy Instrument Fits Which Problem?")
              + '<p><b>Identify the underlying economic problem first; the instrument follows.</b></p>'
              + table(["Problem", "Potential response", "Key limitation to consider"],
                      [["Negative externality", "Corrective tax, regulation or a suitable alternative", "Measurement and enforcement"],
                       ["Positive externality", "Subsidy or public support", "Targeting and fiscal cost"],
                       ["Public good", "Collective financing or provision", "Funding and governance"],
                       ["Common-pool depletion", "Access rules, monitoring, management", "Enforcement and coordination"],
                       ["Market power", "Competition enforcement or regulation", "Market definition and implementation"],
                       ["Information asymmetry", "Disclosure, transparency, safeguards", "Information quality and compliance"],
                       ["Affordability concern", "Targeted assistance or well-designed support", "Exclusion, leakage and fiscal cost"]],
                      "[27,40,33]")))

# 49 Prelims questions
q = lambda n, t: f'<p><b>Q{n}.</b> {t}</p>'
S.append(card(head(E4, "UPSC Prelims Concept Check")
              + cols((30, q(1, "A 10% fall in a good's price raises total spending on it. Over this range, demand is:<br>(a) price elastic (b) price inelastic (c) unit elastic (d) perfectly inelastic")
                          + q(2, "Consider a per-unit indirect tax in a competitive market:<br>1. Its burden always falls wholly on whoever must legally pay it.<br>2. If demand is less elastic than supply, buyers bear more of it.<br>Which is/are correct? (a) 1 only (b) 2 only (c) Both (d) Neither")
                          + q(3, "A maximum price is fixed above the equilibrium price. In the basic model, the result is:<br>(a) a shortage (b) a surplus (c) no change in price or quantity (d) price falls to the maximum")),
                     (30, q(4, "A factory's smoke harms nearby residents, who are not compensated. In the standard model:<br>(a) MSC is below MPC, so output is too low<br>(b) MSB is above MPB, so consumption is too low<br>(c) market output is efficient, as the firm pays for its inputs<br>(d) MSC is above MPC, so market output exceeds the efficient level")
                          + q(5, "Consider:<br>1. A pure public good is non-rival and non-excludable.<br>2. Groundwater shared through private wells is a pure public good.<br>3. A good becomes a public good when government provides it.<br>Which is/are correct? (a) 1 and 2 only (b) 1 only (c) 2 and 3 only (d) 1, 2 and 3")
                          + '<p><i>Original practice questions. Answers on the next slide.</i></p>'))))

# 50 Answers and lens
S.append(card(head(E4, "Answer Key and the GS Mains Policy Lens")
              + '<table borders="rows" header-row="false" col-widths="[9,91]"><tbody>'
                '<tr><td><p><b>1 (a)</b></p></td><td><p>Spending rose, so quantity rose proportionately more than price fell (strictly, by more than about 11%): |PED| &gt; 1.</p></td></tr>'
                '<tr><td><p><b>2 (b)</b></p></td><td><p>Legal liability does not decide incidence; the less elastic side bears more.</p></td></tr>'
                '<tr><td><p><b>3 (c)</b></p></td><td><p>A ceiling above equilibrium does not bind.</p></td></tr>'
                '<tr><td><p><b>4 (d)</b></p></td><td><p>The unpaid external cost puts MSC above MPC, so the market overproduces.</p></td></tr>'
                '<tr><td><p><b>5 (b)</b></p></td><td><p>Groundwater is rival (a common-pool resource); provision by government does not define a public good.</p></td></tr></tbody></table>'
              + img("S50_Policy_Lens", "Five-step policy lens and how the three parts connect", 170)
              + '<p><b>Next:</b> taxation, subsidies, agricultural markets, environmental policy and regulation in the Indian Economy.</p>'))

assert len(S) == 50, len(S)

# ---------------------------------------------------------------- checks
banned = re.compile(r"(\bAI\b|Claude|Gamma|placeholder|prompt|—|–|−)")
for i, s in enumerate(S, 1):
    plain = re.sub(r"<[^>]+>", " ", s)
    m = banned.search(plain)
    assert not m, (i, m.group(0))
    assert "colspan" not in s or all(True for _ in [0])

# ---------------------------------------------------------------- markdown for generation
def to_md(s):
    t = s
    t = re.sub(r'<img alt="([^"]*)"[^>]*src="([^"]+)"[^>]*>', lambda m: f'\n\n![{m.group(1)}]({m.group(2)})\n\n', t)
    t = re.sub(r'<p role="eyebrow">(.*?)</p>', lambda m: re.sub(r"<[^>]+>", "", m.group(1)) + "\n\n", t)
    t = re.sub(r'<h1[^>]*>(.*?)</h1>', r'\n# \1\n\n', t)
    t = re.sub(r'<h2[^>]*>(.*?)</h2>', r'\n# \1\n\n', t)
    t = re.sub(r'<h3[^>]*>(.*?)</h3>', r'\n### \1\n\n', t)
    t = re.sub(r'<li>(.*?)</li>', r'\n- \1', t)
    t = re.sub(r'<tr>(.*?)</tr>', lambda m: "\n| " + " | ".join(re.sub(r"<[^>]+>", "", c) for c in re.findall(r"<td>(.*?)</td>", m.group(1))) + " |", t)
    t = t.replace("<br>", "\n").replace("</ul>", "\n\n").replace("</table>", "\n\n")
    t = re.sub(r"\|PED\|", "absolute PED", t) if "<table" in s else t
    t = re.sub(r'</p>', "\n\n", t)
    t = re.sub(r'<b>(.*?)</b>', r'**\1**', t)
    t = re.sub(r'<i>(.*?)</i>', r'*\1*', t)
    t = re.sub(r'<sub>(.*?)</sub>', r'\1', t)
    t = re.sub(r"<[^>]+>", "", t)
    t = t.replace("&gt;", ">")
    return re.sub(r"\n{3,}", "\n\n", t).strip()


md = "\n\n---\n\n".join(to_md(s) for s in S)
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "build")
os.makedirs(out, exist_ok=True)
open(os.path.join(out, "s2_input.md"), "w").write(md)
json.dump(S, open(os.path.join(out, "s2_cards.json"), "w"), ensure_ascii=False, indent=0)
print("cards", len(S), "md chars", len(md), "max card markup", max(len(s) for s in S))
for i, s in enumerate(S, 1):
    print(i, len(s), end="; ")
