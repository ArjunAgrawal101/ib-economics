# R2 · Definition de-duplication audit (IB DP Economics site)

Scope: `index.html` (36,463 lines) and `assets/data/real-world.js` / `exam-dna.js`. Read-only; nothing in the repo was edited.

Method:
1. The live app at http://localhost:8765/ was loaded in Playwright (`splashEnd(true)`), and GLOSS, DEFS, CONCEPTS, MODELS, EES_MODELS, MIND_MAPS (762 nodes), EEID ("One idea"), EECON, CALC/NEWCALC, POLICIES, KCX (the nine key concepts), MISC and TOKKC were dumped as JSON. The temp script was deleted.
2. For every concept, a regex scan pulled each definitional use ("X is…", `["X","sub","def"…]`, `N(…,"X","…")`, `def:`, `idea:`, `watch:`) out of the raw source with line numbers. This also covered surfaces outside the dumped arrays: the Economics Everywhere questions (EEQ), C60 ("Economics in 60 Seconds"), TOPICS quizzes, exemplar answers and real-world cases.
3. I compared each concept's definitions against each other, against the site's own language-lint rules (index.html:34193-34245) and against the 2022 IB guide.

Note: the site keeps two parallel dictionaries. `DEFS` (index.html:2533-2586, 54 entries, columns term/sub/def/weak-answer/note) and `GLOSS` (index.html:8729-8886, 157 entries, columns term/sub/def/misconception) overlap on 45 terms. Most of the drift below is between these two.

## Summary counts (77 concepts audited)

| Classification | Count | Concepts |
|---|---|---|
| CONSISTENT | 56 | (see appendix; no section below) |
| MINOR VARIATION | 16 | PED, merit good, demerit good, common pool resource, consumer surplus, allocative efficiency, productive efficiency, welfare loss, monopoly, price ceiling, price floor, SRAS, depreciation/devaluation, current account, Marshall-Lerner, nudge |
| INCONSISTENT | 3 | subsidy, LRAS / Keynesian AS, choice architecture |
| CONTRADICTORY | 2 | economic development (growth as necessary?), supply-side policies ("only supply-side raises capacity") |
| WRONG | 0 as a whole concept | Two individual snippets are wrong or incomplete: index.html:5961 and index.html:1994. They are listed under allocative efficiency and LRAS. |

Syllabus-status notes, not definition conflicts:
- XED and terms of trade are correctly and consistently flagged as outside the current guide or as enrichment.
- Price discrimination (index.html:32042, 32053; EES topic at 34497) is taught with no such flag. Check it against the 2022 guide, which I believe no longer names it.

---

## CONTRADICTORY

### Economic development: is growth necessary for it?
The site's own lint (index.html:34257) whitelists "Growth is usually necessary for sustained development" as the house position, but other surfaces say the opposite.
- index.html:13346 (MODELS `dev`.nochange): "Growth is neither necessary nor sufficient for every dimension of development."
- index.html:32285 (EE "watch"): "Economic growth is an increase in real output. Economic development is an improvement in wellbeing. Either can happen without the other."
- These three agree with the house position:
  - index.html:2098 (CONCEPTS c-dev.err): "Growth is necessary for sustained development in most contexts, but it is not sufficient"
  - index.html:18188 / 18481 (mind-map errors): "Growth is usually necessary for sustained development and is not sufficient."
  - index.html:18474: "Necessary but not sufficient … Sustained development without growth is rare"
- index.html:2448 (MISC m6): "Growth may be necessary but is not sufficient". This one is softer again.

**Canonical:** "Economic development is a multidimensional improvement in living standards, covering income, health, education, equity and freedom of choice. Economic growth is usually necessary for sustained development but never sufficient, so the two can diverge."
Fix: reword 13346 and 32285 to "usually necessary, not sufficient".

### Supply-side policies: only supply-side raises capacity?
- index.html:13045 (policy lab quiz feedback): "Only supply-side measures raise productive capacity."
- index.html:17820 (mind map `fsupply`): "Capital spending on infrastructure, education and health raises capacity as well as demand, which is why the two categories overlap."
- The site's own lint R4 (index.html:34202) bans "the only … policy/instrument" scoping. Line 13045 slips past it because of its wording.

**Canonical:** "Supply-side policies are market-based or interventionist measures intended to increase the economy's productive capacity (shift LRAS right) by raising the quantity or quality of factors of production or the efficiency of markets."
Fix: 13045 should say "Supply-side measures are the family aimed directly at productive capacity; some fiscal spending also raises it."

---

## INCONSISTENT

### LRAS / Keynesian AS
- index.html:1994 (CONCEPTS c-as.def): "…the Keynesian AS is flat with spare capacity and becomes vertical once capacity binds." This is **incomplete**: it omits the upward-sloping intermediate range.
- These all give three ranges:
  - index.html:17600: "Three ranges: horizontal with deep spare capacity, upward sloping as capacity is approached, vertical at full capacity."
  - index.html:18685: "Vertical in the monetarist view; the Keynesian curve has three ranges."
  - index.html:34498 (EES `adas`): "Keynesian AS has horizontal, upward-sloping and vertical sections"
- index.html:8814 (GLOSS LRAS): "The long-run aggregate supply curve in the monetarist/new classical model, vertical at potential output." Correct, but it has no Keynesian counterpart entry.
- index.html:3069 and 12662 (diagram alt text): "long-run aggregate supply is vertical at potential output". This is unqualified: it drops the "monetarist/new classical" qualifier.

**Canonical:** "In the monetarist/new classical model, LRAS is vertical at potential (full-employment) output, which is set by the quantity and quality of resources and technology. In the Keynesian model, AS is horizontal with deep spare capacity, slopes upward as capacity is approached and becomes vertical at full capacity."

### Subsidy
- index.html:8869 (GLOSS): "A payment by government to producers to lower costs and raise output."
- index.html:2547 (DEFS): "A payment made by government to firms per unit of output, reducing costs of production and increasing supply."
- index.html:16870 (mind map): "A payment per unit that lowers the cost of supply, used where the market under-provides."
- Site lint R10 (index.html:34236, 34235): "a subsidy is not said to be paid to producers as a rule". The poscons repair explicitly uses a subsidy "paid to consumers". GLOSS 8869 states the producer-only form as the definition, and it omits "per unit".

**Canonical:** "A subsidy is a payment by government, usually per unit of output, that lowers firms' costs of production and so shifts supply right. It can also be paid to consumers, which raises demand."

### Choice architecture
- index.html:8749 (GLOSS): "The design of the context in which a decision is presented, which alters the choice made without changing the options." Misconception column: "Conflated with regulation, which removes options."
- index.html:18221 (mind map bh8): "Default, restricted and mandated choices. How options are presented changes what is chosen, without changing the options." This is self-inconsistent: *restricted* choice (an IB-named form) narrows the option set, and mandated choice forces a decision.
- index.html:9751 (POLICIES nudge.mech): "Choice architecture is altered without removing options or changing prices." This is fine for a *nudge*, but it is used interchangeably with the broader term.

**Canonical:** "Choice architecture is the deliberate design of how choices are presented (for example default, restricted or mandated choice) in order to influence the decision made. A nudge is the subset that leaves all options available and prices materially unchanged."

---

## MINOR VARIATION

### Price elasticity of demand (sign convention)
- index.html:19885 (TOPICS 2.5 objective): "Calculate PED and YED from data, retaining the sign."
- index.html:19894 (the same page's quiz): "Price rises 10%, quantity demanded falls 4%. PED is" → correct option "0.4, inelastic". The sign is silently dropped.
- index.html:16761: "Negative by the law of demand; usually quoted as a magnitude."
- index.html:1949 (c-ped.ex): "Either report PED as a negative value or state that the negative sign is ignored … do not silently drop it."
- The definitions agree: DEFS 2543, GLOSS 8847, CONCEPTS c-ped, CALC ped, mind map 17231 and EEID all give %ΔQd ÷ %ΔP.

**Canonical:** "PED measures the responsiveness of quantity demanded to a change in the good's own price, calculated as %ΔQd ÷ %ΔP. It is negative by the law of demand and classified by its absolute value." Fix 19894 to "−0.4 (|PED| = 0.4), inelastic".

### Merit good
- index.html:8821 (GLOSS, sub **2.8**): "…under-consumed relative to the social optimum because consumption generates positive externalities or consumers underestimate the private benefit."
- index.html:2554 (DEFS, sub **2.9**): "…under-consumed relative to the social optimum, typically because of positive externalities or imperfect information."
- The subtopic codes conflict. The syllabus table (index.html:1610-1611) makes 2.9 public goods only, so DEFS is wrong to file merit goods there.

**Canonical:** "A merit good is a good that is under-consumed in a free market relative to the social optimum, because its consumption generates positive externalities and/or consumers underestimate its private benefit (imperfect information)." Sub 2.8.

### Demerit good
- index.html:8770 (GLOSS): "…because consumption generates negative externalities or consumers misjudge the private benefit."
- index.html:2750 (exemplar): "…negative externalities of consumption or because consumers under-estimate the private harm."
- index.html:5654 and index.html:36279 (SAMPLE exemplar): "…because consumption generates negative externalities." These drop the information-failure limb.

**Canonical:** "A demerit good is a good that is over-consumed in a free market relative to the social optimum, because its consumption generates negative externalities and/or consumers underestimate its private harm."

### Common pool resource (naming)
- index.html:8752 (GLOSS headword "**Common access resource**") vs index.html:2552 (DEFS "**Common pool resource**"). The mind maps (16962, 17447) and C60 (30545) also use "common pool".
- index.html:30545 then contrasts "common pool" with "open access". The GLOSS headword "common access" blurs that distinction.
- The definitions themselves are identical: rivalrous and non-excludable.

**Canonical:** "A common pool resource is a resource that is rivalrous in consumption but non-excludable, so each user's private incentive leads to overuse and depletion." Keep "common access" only as a synonym.

### Consumer surplus
- index.html:2540 (DEFS): "The difference between the **price** consumers are willing to pay and the price they actually pay." This is per-unit wording.
- index.html:8757 (GLOSS): "The difference between the **total amount** consumers are willing to pay and the amount they actually pay."
- index.html:5945 (CALC m): "The total benefit consumers receive above what they actually pay."
- index.html:16687: "…what buyers would have paid and what they did pay"

**Canonical:** "Consumer surplus is the difference between the maximum consumers are willing to pay for each unit and the price they actually pay, summed over all units bought. It is the area below the demand curve and above the price."

### Allocative efficiency
- The canonical MSB = MSC form appears at DEFS 2542, GLOSS 8735, KCX 8066 and index.html:13038 ("always where MSB = MSC").
- index.html:16689 (mind map ae): "Where marginal benefit equals marginal cost…". This drops "social".
- index.html:5961 (CALC cs.ib): "Community surplus is CS + PS, and it is maximised at the free-market equilibrium." **Wrong as a general statement**: it holds only in the absence of externalities, as index.html:32657 correctly says ("In a competitive market with no externalities…").
- Naming drifts between "community surplus" (2542, 8735, 5961, 12180) and "social surplus" (GLOSS headword 8866).

**Canonical:** "Allocative efficiency is the output at which marginal social benefit equals marginal social cost (MSB = MSC), so community (social) surplus is maximised."

### Productive efficiency
- index.html:8066 (KCX Efficiency): "productive efficiency is producing at the lowest possible cost."
- index.html:16602: "On the curve is productively efficient" (PPC sense).
- index.html:17091: "delivers allocative and productive efficiency in the long run" (the firm sense, with no condition stated).
- There is no GLOSS or DEFS entry.

**Canonical:** "Productive efficiency is producing output at the lowest possible average cost (at the minimum of the ATC curve). For the whole economy, it means producing on the production possibilities curve."

### Welfare loss / deadweight loss
- There are two GLOSS headwords for one idea, in different subtopics:
  - index.html:8765 "Deadweight loss" (2.3): "…the term is used interchangeably with welfare loss."
  - index.html:8884 "Welfare loss" (2.8): "The loss of community surplus arising when output differs from the allocatively efficient level."
- These agree in substance: MISC m12 (2517-2522), c-ext.err (1968), EE watch 32193.

**Canonical:** "Welfare (deadweight) loss is the loss of community surplus when output differs from the allocatively efficient level: the area between MSB and MSC over the units over- or under-produced." Merge the two GLOSS entries.

### Monopoly
- index.html:8825 (GLOSS): "A market supplied by a **single or dominant** firm protected by high barriers to entry."
- index.html:2556 (DEFS): "…a **single supplier, no close substitutes** and high barriers to entry, in which the firm is a price maker." Its note says "Three conditions, not one."
- The single-firm form also appears at index.html:2134 (c-mono), 17058, 17490 and MODELS mono.

**Canonical:** "A monopoly is a market structure with a single (or overwhelmingly dominant) seller of a good with no close substitutes, protected by high barriers to entry, so the firm is a price maker."

### Price ceiling
- index.html:2548 (DEFS): "A maximum price set by government **below** the market equilibrium price…". Here "below" is part of the definition, and the note says it is "essential".
- index.html:8846 (GLOSS): "A legally imposed maximum price, which creates a shortage **if** set below equilibrium."
- index.html:1974 (c-pmax): "…set below the equilibrium price, usually to improve affordability". index.html:17339: "A legal maximum, set below equilibrium to protect buyers."

**Canonical:** "A price ceiling is a legal maximum price, set below the equilibrium price to be binding, usually to make a good more affordable. It creates excess demand (a shortage)."

### Price floor
The same pattern as the ceiling. index.html:2549 (DEFS, "above equilibrium is essential") vs index.html:8849 (GLOSS, "creates a surplus **if** set above equilibrium").

**Canonical:** "A price floor is a legal minimum price, set above the equilibrium price to be binding, usually to support producer incomes or low wages. It creates excess supply (a surplus)."

### SRAS
- index.html:1994 (c-as): "…when **resource prices are fixed**"
- index.html:8867 (GLOSS), 17596 and 18683: "…while **at least one input price/cost is fixed**"
- index.html:34498 (EES): "…because some input costs, such as wages, adjust slowly"

**Canonical:** "SRAS shows the planned real output firms supply at each price level in the short run, when money wages and some other input prices are fixed. It slopes upward."

### Depreciation / devaluation
- index.html:8771 and 8772 (GLOSS): depreciation is market-driven under a **floating** rate; devaluation is by authorities under a **fixed** rate.
- index.html:32147 (EE watch): "a devaluation is a deliberate decision under a fixed **or managed** rate."
- Consistent elsewhere: DEFS 2581, c-fx 2044-2050, 17954, 17976.

**Canonical:** "Depreciation is a fall in the value of a currency against another under a floating exchange rate, caused by market forces. The deliberate equivalent under a fixed or managed rate is a devaluation."

### Current account (terminology)
- These use BPM5-style wording:
  - index.html:8761 (GLOSS): "trade in goods and services, **income and current transfers**"
  - index.html:2044 (c-ca.def): "…income paid abroad and current transfers out…"
- These use the current guide's wording:
  - index.html:2582 (DEFS): "trade in goods and services, **primary income and secondary income**". Its note says "Four components, not one."
  - index.html:6089 (CALC ca), 18059, 18888 and 34498 (EES bop).

**Canonical:** "The current account is the part of the balance of payments recording trade in goods, trade in services, primary income (net income from abroad) and secondary income (current transfers)."

### Marshall-Lerner condition (what improves)
- **Current account**: index.html:8820 (GLOSS), 9842 (POLICIES fx), 17960, 18070, 18886.
- **Trade balance**: index.html:2583 (DEFS), 2457/2463 (MISC m7), 32134 (EE idea), 34498 (EES fx), 7154.
- **Net exports**: index.html:18430.
- All of them correctly use absolute values, so lint R1 passes. Only index.html:32134 carries the "starting from balanced trade" qualifier.

**Canonical:** "The Marshall-Lerner condition states that a depreciation improves the trade balance (and so the current account) only if the sum of the absolute values of the price elasticities of demand for exports and imports exceeds one: |PEDx| + |PEDm| > 1."

### Nudge (subtopic code)
- index.html:8835 (GLOSS, sub 2.7, HL) and 9749 (POLICIES nudge, sub 2.7, HL) vs mind-map nodes 18221-18223 (sub 2.4, HL).
- The definition text is consistent.

**Canonical:** "A nudge is a change to choice architecture (for example a default or framing) that predictably alters behaviour without forbidding any option or significantly changing economic incentives."

---

## Consistent concepts, spot-notes (no action needed)
- **Opportunity cost** is identical in DEFS 2534, GLOSS 8838, mind maps 16593/18622, EEID 32587, C60 30563 and TOPICS 19818.
- **Public good** "under-provides, not never provides" is enforced by lint R5 and holds everywhere.
- **Inflation/disinflation/deflation** are consistent across DEFS 2561-2563, GLOSS 8766/8774/8803, c-inf 2024, 17646-17647, 18765, 21234 and 32028.
- **Multiplier** is consistent: 1/(1−MPC) = 1/(MPS+MPT+MPM) everywhere (CALC, MODELS, EES, POLICIES, c-mult).
- **Gini** is consistent everywhere: A/(A+B), range 0 to 1. GLOSS 8795 omits the endpoint meanings that DEFS 2568 includes.
- **GNI**: "net property income" (GLOSS, DEFS, CALC) vs "net income" (18670). This is acceptable.

---

## Appendix: canonical definitions (all 77 concepts)

```json
{
  "Opportunity cost": "The value of the next best alternative forgone when a choice is made.",
  "Scarcity": "The condition in which resources are limited relative to unlimited wants, which forces every society to choose what to produce, how and for whom.",
  "Price elasticity of demand (PED)": "A measure of the responsiveness of quantity demanded to a change in the good's own price, calculated as %ΔQd ÷ %ΔP; it is negative by the law of demand and classified by its absolute value.",
  "Price elasticity of supply (PES)": "A measure of the responsiveness of quantity supplied to a change in the good's price, calculated as %ΔQs ÷ %ΔP; it is normally positive and rises as the time allowed for adjustment lengthens.",
  "Income elasticity of demand (YED)": "A measure of the responsiveness of quantity demanded to a change in consumer income, calculated as %ΔQd ÷ %ΔY; its sign classifies the good (positive normal, negative inferior) and a value above one indicates a luxury.",
  "Cross-price elasticity of demand (XED)": "A measure of the responsiveness of quantity demanded of one good to a change in the price of another, calculated as %ΔQd(A) ÷ %ΔP(B); positive for substitutes, negative for complements (not named in the current IB guide).",
  "Market failure": "A situation in which the free market fails to allocate resources efficiently, so that at the market outcome marginal social benefit does not equal marginal social cost.",
  "Externality": "A cost or benefit of production or consumption that falls on a third party not involved in the transaction and is not reflected in the market price.",
  "Merit good": "A good that is under-consumed in a free market relative to the social optimum, because its consumption generates positive externalities and/or consumers underestimate its private benefit.",
  "Demerit good": "A good that is over-consumed in a free market relative to the social optimum, because its consumption generates negative externalities and/or consumers underestimate its private harm.",
  "Public good": "A good that is non-rivalrous and non-excludable, so the free-rider problem weakens the incentive to pay and a private market tends to under-provide it.",
  "Common pool resource": "A resource that is rivalrous in consumption but non-excludable, so each user's private incentive leads to overuse and depletion (also called a common access resource).",
  "Consumer surplus": "The difference between the maximum consumers are willing to pay for each unit and the price they actually pay, summed over all units bought: the area below demand and above the price.",
  "Producer surplus": "The difference between the price producers receive and the minimum price they would accept for each unit, summed over all units sold: the area above supply and below the price; it is not profit.",
  "Allocative efficiency": "The output at which marginal social benefit equals marginal social cost (MSB = MSC), so community surplus is maximised.",
  "Productive efficiency": "Producing output at the lowest possible average cost (the minimum of the ATC curve); for the whole economy, producing on the production possibilities curve.",
  "Welfare loss (deadweight loss)": "The loss of community surplus that arises when output differs from the allocatively efficient level, measured by the area between MSB and MSC over the units over- or under-produced.",
  "Monopoly": "A market structure with a single (or overwhelmingly dominant) seller of a good with no close substitutes, protected by high barriers to entry, so the firm is a price maker.",
  "Natural monopoly": "A market in which economies of scale are so large that one firm can supply the whole market at a lower average cost than two or more firms could.",
  "Oligopoly": "A market dominated by a few large firms whose decisions are interdependent, so each must anticipate rivals' reactions and may compete or collude.",
  "Price ceiling": "A legal maximum price, set below the equilibrium price to be binding, usually to make a good more affordable; it creates excess demand (a shortage).",
  "Price floor": "A legal minimum price, set above the equilibrium price to be binding, usually to support producer incomes or low wages; it creates excess supply (a surplus).",
  "Subsidy": "A payment by government, usually per unit of output, that lowers firms' costs of production and so shifts supply right; it can also be paid to consumers, raising demand.",
  "Indirect tax": "A tax on expenditure on goods and services, levied on producers, who may pass part of it on to consumers through a higher price; specific if a fixed amount per unit, ad valorem if a percentage.",
  "Tax incidence": "The distribution of the burden of an indirect tax between consumers (the rise in price paid) and producers (the fall in price received), determined by the relative elasticities of demand and supply rather than by who is legally liable.",
  "Aggregate demand": "The total planned spending on domestic goods and services at each price level in a given period, equal to C + I + G + (X − M).",
  "Short-run aggregate supply (SRAS)": "The planned real output firms supply at each price level in the short run, when money wages and some other input prices are fixed; it slopes upward.",
  "Long-run aggregate supply (LRAS)": "In the monetarist/new classical model, LRAS is vertical at potential (full-employment) output, set by the quantity and quality of resources and technology; in the Keynesian model AS is horizontal with deep spare capacity, upward-sloping as capacity is approached and vertical at full capacity.",
  "Inflation": "A sustained increase in the general price level, measured as the percentage change in a price index such as the CPI.",
  "Deflation": "A sustained decrease in the general price level, that is, a negative rate of inflation.",
  "Disinflation": "A fall in the rate of inflation while it remains positive, so the general price level continues to rise but more slowly.",
  "Demand-pull inflation": "Inflation caused by aggregate demand growing faster than productive capacity, shown as a rightward shift of AD as the economy approaches full-employment output.",
  "Cost-push inflation": "Inflation caused by rising costs of production, such as wages, energy or imported inputs, shown as a leftward shift of SRAS that raises the price level while lowering output.",
  "Cyclical unemployment": "Unemployment caused by a fall in aggregate demand during a downturn in the business cycle; also called demand-deficient unemployment.",
  "Structural unemployment": "Unemployment arising from a mismatch between the skills or location of the unemployed and the requirements of the jobs available.",
  "Frictional unemployment": "Short-term unemployment while workers search for or move between jobs.",
  "Seasonal unemployment": "Unemployment caused by predictable variation in the demand for labour across the year.",
  "Natural rate of unemployment": "The rate of unemployment that remains when the labour market is in equilibrium at full-employment output, comprising structural, frictional and seasonal unemployment but no cyclical unemployment.",
  "GDP": "The total market value of all final goods and services produced within a country's borders in a given period.",
  "Real vs nominal GDP": "Nominal GDP values output at current prices; real GDP values it at constant (base-year) prices, obtained by dividing nominal GDP by a price deflator and multiplying by 100, so it measures changes in the volume of output.",
  "GNI": "The total income earned by a country's residents wherever it is earned, equal to GDP plus net income (property income) from abroad.",
  "Economic growth": "An increase in real output (real GDP) over time; actual growth moves the economy towards its productive capacity, while growth in potential output shifts the PPC outward and LRAS to the right.",
  "Economic development": "A multidimensional improvement in living standards, covering income, health, education, equity and freedom of choice; economic growth is usually necessary for sustained development but never sufficient.",
  "Multiplier": "The ratio of the final change in real GDP to the initial change in an injection, k = 1 ÷ (1 − MPC) = 1 ÷ (MPS + MPT + MPM), assuming spare capacity.",
  "Fiscal policy": "The government's use of taxation and government spending to influence aggregate demand and achieve macroeconomic objectives.",
  "Monetary policy": "Central bank action on interest rates and the money supply to influence aggregate demand and achieve macroeconomic objectives, especially a low and stable inflation rate.",
  "Crowding out": "The reduction in private investment that can result when government borrowing raises interest rates; it is most likely near full capacity and least likely in a deep recession.",
  "Supply-side policies": "Market-based or interventionist measures intended to increase the economy's productive capacity (shift LRAS right) by raising the quantity or quality of factors of production or the efficiency of markets.",
  "Comparative advantage": "A country has a comparative advantage in a good if it can produce it at a lower opportunity cost than another country.",
  "Absolute advantage": "A country has an absolute advantage in a good if it can produce more of it than another country using the same resources.",
  "Terms of trade": "The ratio of an index of export prices to an index of import prices, multiplied by 100 (enrichment: not named in the current IB guide).",
  "Tariff": "A tax on imported goods, which raises their domestic price above the world price and reduces the quantity imported.",
  "Quota": "A physical limit on the quantity of a good that may be imported over a given period; the resulting price gap accrues as quota rent to licence holders rather than as government revenue.",
  "Exchange rate": "The price (value) of one currency expressed in terms of another currency.",
  "Appreciation": "A rise in the value of a currency against another under a floating exchange rate, caused by market forces; the deliberate equivalent under a fixed rate is a revaluation.",
  "Depreciation": "A fall in the value of a currency against another under a floating exchange rate, caused by market forces; the deliberate equivalent under a fixed or managed rate is a devaluation.",
  "Current account": "The part of the balance of payments recording trade in goods, trade in services, primary income (net income from abroad) and secondary income (current transfers).",
  "Marshall-Lerner condition": "A depreciation improves the trade balance (and so the current account) only if the sum of the absolute values of the price elasticities of demand for exports and imports exceeds one: |PEDx| + |PEDm| > 1.",
  "J-curve": "The path by which the current account worsens immediately after a depreciation and then improves, because prices adjust at once while trade volumes respond with a lag.",
  "Lorenz curve": "A curve plotting the cumulative share of income against the cumulative share of the population, ranked from poorest to richest, compared with a 45-degree line of perfect equality.",
  "Gini coefficient": "A summary measure of income inequality derived from the Lorenz curve, equal to the area between the line of equality and the Lorenz curve divided by the whole area under the line of equality, ranging from 0 (perfect equality) to 1 (perfect inequality).",
  "Poverty (absolute and relative)": "Absolute poverty is income insufficient to meet basic needs, measured against a fixed line; relative poverty is income below a threshold set relative to the distribution in a particular society.",
  "HDI": "The Human Development Index: a composite index of development combining health (life expectancy), education (years of schooling) and income (GNI per capita, PPP) with equal weights.",
  "Sustainable development": "Development that meets the needs of the present without compromising the ability of future generations to meet their own needs.",
  "Equity vs equality (inequality)": "Equality describes how evenly income, wealth or opportunity is distributed and can be measured; equity is a normative judgement about whether that distribution is fair.",
  "Asymmetric information": "A situation in which one party to a transaction has more or better information than the other, leading to market failure through adverse selection or moral hazard.",
  "Moral hazard": "A change in behaviour after a transaction, because a party that is protected from a risk no longer bears the full consequences of its actions and the other party cannot fully observe them (hidden action).",
  "Adverse selection": "A market outcome in which asymmetric information before a transaction causes lower-quality goods or higher-risk customers to be disproportionately represented (hidden information).",
  "Nudge": "A change to choice architecture, such as a default or framing, that predictably alters behaviour without forbidding any option or significantly changing economic incentives.",
  "Choice architecture": "The deliberate design of how choices are presented (for example default, restricted or mandated choice) in order to influence the decision made; a nudge is the subset that leaves all options available.",
  "Bounded rationality": "The idea that decision-makers have limited time, information and cognitive capacity, so they use rules of thumb and satisfice rather than optimise.",
  "Game theory": "The analysis of strategic interaction in which each player's best choice depends on what the other players do, used in the course mainly to explain oligopoly behaviour.",
  "Nash equilibrium": "An outcome in which no player can improve its pay-off by changing strategy alone, given the strategies of the others; it need not be the best outcome for the players jointly.",
  "Price discrimination": "Charging different prices to different groups of buyers for the same product for reasons unrelated to cost, which requires market power, the ability to separate buyers with different price elasticities of demand, and the prevention of resale.",
  "Consumer price index (CPI)": "A weighted index of the prices of a basket of goods and services representing typical household consumption, priced against a base year set to 100; its percentage change measures inflation.",
  "Phillips curve": "The short-run inverse relationship between the inflation rate and the unemployment rate; in the long run, once inflation expectations adjust, the curve is vertical at the natural rate of unemployment.",
  "Market equilibrium": "The price and quantity at which quantity demanded equals quantity supplied, so there is no tendency for price to change."
}
```
