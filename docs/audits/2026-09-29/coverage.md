# Curriculum coverage matrix: IB DP Economics site against the Economics guide (first assessment 2022)

Report r2, generated 29 September 2026. Read-only audit: nothing in `/home/user/ib-economics` was changed. The temporary probe `tests/_tmp_cov.mjs` was created and then deleted.

## Source and caveats

- **Guide used:** *Economics guide, First assessment 2022*, published February 2020 (text in `scratchpad/guide.txt`; PDF page = printed page + 6). Page numbers below are **printed** guide pages. HL-only items are the ones the guide sets in bold or labels "(HL only)". They were cross-checked against `scratchpad/bold.txt`.
- **Possible newer edition:** this guide may have been replaced. Sources online refer to an edition for first assessment 2024, which could not be accessed for this audit. Anything that edition added, removed or moved is **not** reflected here, so treat the matrix as coverage against the 2022 guide only.
- **Only what the guide says:** the requirements come only from the syllabus tables (pp. 22–53), the key concepts and real-world issues (pp. 7, 22, 25, 29, 35, 41, 45, 50–51), the command-term glossary (pp. 18–19, 74–75) and the TOK sections (pp. 7–8 and each unit's TOK box). The TSM was not used as a source of requirements.
- **Site data:** the site was loaded from http://localhost:8765/ with Playwright (`splashEnd(true)`). All counts come from `page.evaluate` over the live globals: SUBTOPICS, GLOSS, DEFS, CALC, DG/DGSUB/M2, RW_CASES, CASES, RW, MIND_MAPS, MODELS, EES_MODELS (via KG.esm), POLICIES, QB and the other practice banks, KG, EXAM_DNA, VIDEO_LIBRARY, KCX, RWI, CTLAB and the TOK* objects.

### How the checks were done

- **Concepts:** each guide bullet or sub-bullet group became one item with a keyword pattern. The pattern was searched across the site's content objects, which exclude `SUBMETA`, `GUIDE` and `IBREF`, because those only restate the syllabus.
  - COVERED means the item was found in at least two content objects, at least one of them a teaching object (glossary, mind map, concept card, model, policy, calculator, diagram text, EES or C60 dossier).
  - PARTIALLY COVERED means it was found in only one object, or only in cases, practice items or videos.
  - MISSING means it was found nowhere, or only in the syllabus checklist (`SUBMETA`).
  - Items with thin or doubtful matches were read by hand and overridden; the evidence column says why. NEEDS VERIFICATION means the keyword match could not confirm the content either way.
- **Diagrams and calculations:** each was checked by hand against the site objects that render diagrams (`DG` static SVGs, the `M2` solved-model versions, the tools) and the `CALC` calculators.
- **Subtopic status:**
  - COVERED: no MISSING item, every required diagram and calculation COVERED, and at most one PARTIAL or NEEDS VERIFICATION concept.
  - PARTIALLY COVERED: some content is present but gaps remain.
  - MISSING: none of the subtopic's content was found.

### Count definitions

These counts apply to the per-subtopic table and the JSON block.

| Count | What it counts |
|---|---|
| glossary | `GLOSS` entries whose `g[1]` is the subtopic code (the `DEFS` count is shown separately) |
| calc | `CALC` calculators with `.sub` equal to the code (`CALC` already includes the 14 `NEWCALC` entries; the enrichment calculator "tot" has no subtopic) |
| diagrams | `DG` keys with `DGSUB` equal to the code |
| cases | `RW_CASES` records whose primary `.sub` is the code, plus curated `CASES`/`RW` cards whose `.subs` include it |
| mindmaps | `MIND_MAPS` whose `.subs` include the code |
| questions | site-authored practice items tagged to the code: QB question parts, P1TASKS, DATA, DSETS questions, DETECTIVE, MISC, CHAINS, MEMOCASES, DEBATES, REPAIRS, BUILDS and TOPICS quiz items. P2SETS and P3CASES are not tagged by subtopic and are not counted |
| models | `MODELS` with `.sub` equal to the code, plus `EES_MODELS` linked through `KG[code].esm` |
| dna | past-paper part metadata in `EXAM_DNA` (212 questions, 990 parts, 13 sessions). This is metadata only, with no question text |

## Summary

- **Subtopics (31):** PARTIALLY COVERED 21, COVERED 10
- **Guide items checked:** 410, of which 300 are concepts, 80 diagrams and 30 calculations. Overall status: COVERED 336, PARTIALLY COVERED 46, MISSING 27, NEEDS VERIFICATION 1
  - Diagrams: COVERED 51, MISSING 17, PARTIALLY COVERED 12
  - Calculations: COVERED 28, PARTIALLY COVERED 2
  - Concepts: COVERED 257, PARTIALLY COVERED 32, MISSING 10, NEEDS VERIFICATION 1
- **Structural coverage is complete:** the site's `SUBTOPICS` list has all 31 guide subtopics, 1.1 to 4.10, with the guide's titles. 2.4 and 2.10–2.12 are flagged HL. `SUBMETA` restates each subtopic's guide diagrams, calculations and HL items, which is a syllabus checklist and not teaching content.
- **Biggest gaps:**
  - HL 2.11 market-structure diagrams: of the 11 required, 6 are missing (perfect competition firm as price taker, perfect competition firm with profit/loss, natural monopoly, collusive oligopoly, and both monopolistic competition diagrams) and 3 are partial. Only the monopoly-vs-competition welfare-loss diagram and the payoff matrix exist.
  - Other missing elasticity diagrams: constant PED, revenue, Engel curve.
  - Other missing diagrams: the money market (HL 3.5), crowding out (HL 3.6), the free-trade export diagram, fixed and managed exchange rates, the J-curve (HL 4.6), the poverty cycle (4.9) and the structural-unemployment labour diagram.
  - The 1.2 history of economic thought is almost entirely absent.
  - Thin teaching depth in 2.12, 4.3, 4.4 and 4.7–4.10. These have 0 site diagrams and 0 calculators and rely mainly on RW cases and mind maps. The guide requires only the poverty-cycle diagram there, and HL 2.12 has just one mind map and no glossary entry.
- **Calculations are strong:** 28 of the 30 guide-required calculations have a dedicated calculator. The 2 partial ones are the HL tariff and trade-subsidy stakeholder calculations.

## Per-subtopic matrix

| Code | Guide title (pp.) | Level | Status | glossary (+DEFS) | calc | diagrams | cases (RW + curated) | mindmaps | questions | models | videos | exam DNA parts |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1.1 | What is economics? (p. 22–23) | SL | **PARTIALLY COVERED** | 7 (+1) | 0 | 2 | 0 + 0 | 2 | 5 | 0 | 1 | 21 |
| 1.2 | How do economists approach the world? (p. 23–24) | SL | **PARTIALLY COVERED** | 3 (+1) | 1 | 0 | 0 + 0 | 3 | 0 | 0 | 0 | 1 |
| 2.1 | Demand (p. 25–26) | SL | **COVERED** | 6 (+2) | 0 | 1 | 1 + 0 | 2 | 5 | 1 | 0 | 4 |
| 2.2 | Supply (p. 26) | SL | **PARTIALLY COVERED** | 2 (+1) | 0 | 1 | 0 + 0 | 2 | 0 | 0 | 0 | 1 |
| 2.3 | Competitive market equilibrium (p. 26–27) | SL | **COVERED** | 7 (+4) | 2 | 1 | 1 + 0 | 1 | 6 | 1 | 2 | 22 |
| 2.4 | Critique of the maximizing behaviour of consumers and producers (p. 27) | HL | **COVERED** | 4 (+0) | 0 | 0 | 2 + 0 | 1 | 0 | 0 | 0 | 2 |
| 2.5 | Elasticity of demand (p. 27–28) | SL | **PARTIALLY COVERED** | 5 (+2) | 3 | 1 | 0 + 1 | 4 | 13 | 2 | 4 | 40 |
| 2.6 | Elasticity of supply (p. 28) | SL | **PARTIALLY COVERED** | 1 (+1) | 1 | 1 | 3 + 0 | 2 | 1 | 0 | 0 | 0 |
| 2.7 | Role of government in microeconomics (p. 29–30) | SL | **COVERED** | 5 (+4) | 5 | 4 | 16 + 4 | 6 | 23 | 2 | 2 | 74 |
| 2.8 | Market failure—externalities and common pool or common access resources (p. 30–31) | SL | **PARTIALLY COVERED** | 14 (+3) | 1 | 5 | 21 + 3 | 4 | 16 | 3 | 2 | 62 |
| 2.9 | Market failure—public goods (p. 31) | SL | **COVERED** | 2 (+2) | 0 | 1 | 1 + 0 | 2 | 3 | 0 | 0 | 4 |
| 2.10 | Market failure—asymmetric information (HL only) (p. 31) | HL | **COVERED** | 4 (+1) | 0 | 1 | 1 + 1 | 1 | 4 | 1 | 0 | 3 |
| 2.11 | Market failure—market power (HL only) (p. 31–33) | HL | **PARTIALLY COVERED** | 13 (+1) | 2 | 1 | 8 + 1 | 3 | 5 | 2 | 4 | 49 |
| 2.12 | The market's inability to achieve equity (HL only) (p. 33) | HL | **PARTIALLY COVERED** | 0 (+0) | 0 | 0 | 0 + 1 | 1 | 0 | 0 | 0 | 0 |
| 3.1 | Measuring economic activity and illustrating its variations (p. 35–36) | SL | **PARTIALLY COVERED** | 4 (+2) | 5 | 1 | 0 + 0 | 2 | 7 | 1 | 1 | 63 |
| 3.2 | Variations in economic activity—aggregate demand and aggregate supply (p. 36–37) | SL | **COVERED** | 7 (+2) | 0 | 4 | 6 + 1 | 4 | 11 | 3 | 3 | 25 |
| 3.3 | Macroeconomic objectives (p. 37–39) | SL | **PARTIALLY COVERED** | 14 (+7) | 4 | 4 | 14 + 6 | 6 | 17 | 3 | 2 | 136 |
| 3.4 | Economics of inequality and poverty (p. 39–40) | SL | **PARTIALLY COVERED** | 12 (+2) | 2 | 1 | 0 + 3 | 5 | 8 | 2 | 1 | 63 |
| 3.5 | Demand management (demand-side policies)—monetary policy (p. 41–42) | SL | **PARTIALLY COVERED** | 4 (+1) | 1 | 0 | 11 + 2 | 3 | 8 | 0 | 1 | 44 |
| 3.6 | Demand management—fiscal policy (p. 42–43) | SL | **PARTIALLY COVERED** | 5 (+3) | 1 | 1 | 14 + 0 | 3 | 8 | 2 | 1 | 29 |
| 3.7 | Supply-side policies (p. 43–44) | SL | **COVERED** | 2 (+1) | 0 | 0 | 5 + 0 | 2 | 2 | 0 | 2 | 11 |
| 4.1 | Benefits of international trade (p. 45–46) | SL | **PARTIALLY COVERED** | 2 (+1) | 2 | 1 | 7 + 2 | 2 | 1 | 1 | 1 | 15 |
| 4.2 | Types of trade protection (p. 46) | SL | **PARTIALLY COVERED** | 3 (+2) | 2 | 2 | 9 + 2 | 2 | 9 | 2 | 3 | 48 |
| 4.3 | Arguments for and against trade control/protection (p. 46–47) | SL | **COVERED** | 1 (+1) | 0 | 0 | 2 + 2 | 2 | 1 | 0 | 0 | 1 |
| 4.4 | Economic integration (p. 47–48) | SL | **PARTIALLY COVERED** | 6 (+1) | 0 | 0 | 13 + 0 | 1 | 1 | 0 | 0 | 29 |
| 4.5 | Exchange rates (p. 48–49) | SL | **PARTIALLY COVERED** | 6 (+2) | 2 | 1 | 13 + 4 | 4 | 14 | 2 | 1 | 79 |
| 4.6 | Balance of payments (p. 49–50) | SL | **PARTIALLY COVERED** | 9 (+2) | 1 | 1 | 6 + 3 | 3 | 5 | 0 | 1 | 57 |
| 4.7 | Sustainable development (p. 51) | SL | **COVERED** | 1 (+1) | 0 | 0 | 2 + 2 | 4 | 2 | 0 | 1 | 4 |
| 4.8 | Measuring development (p. 51) | SL | **PARTIALLY COVERED** | 3 (+1) | 0 | 0 | 3 + 0 | 3 | 2 | 1 | 1 | 4 |
| 4.9 | Barriers to economic growth and/or economic development (p. 51–52) | SL | **PARTIALLY COVERED** | 2 (+1) | 0 | 0 | 11 + 1 | 1 | 0 | 0 | 0 | 6 |
| 4.10 | Economic growth and/or economic development strategies (p. 52–53) | SL | **PARTIALLY COVERED** | 2 (+1) | 0 | 0 | 33 + 1 | 1 | 6 | 0 | 0 | 90 |

The site also has cross-cutting objects that are not tagged to a single subtopic: P2SETS (4 data-response sets), P3CASES (4 HL Paper 3 cases), 11 tools, TRANSFER (6), DECIDE (3), EXEMPLARS (2), ARCHETYPES (11), C60 dossiers, EEQ explainers (19) and EES_TOPICS (20).

## Required diagrams (guide "Diagrams" columns)

| Code | p. | HL | Guide-required diagram | Status | Site object / evidence |
|---|---|---|---|---|---|
| 1.1 | 23 |  | PPC illustrating choice and opportunity cost, unemployment of resources, actual growth and growth in production possibilities | **COVERED** | DG/M2 "ppc" (points A/B/C and outward shift) |
| 1.1 | 23 |  | PPC showing increasing versus constant opportunity cost | **PARTIALLY COVERED** | "ppc" shows only the concave (increasing) case; a linear PPC exists only inside "compadv" (4.1) |
| 1.1 | 23 |  | Circular flow of income model with leakages and injections | **COVERED** | DG "circular" |
| 2.1 | 25 |  | Downward-sloping demand curve | **COVERED** | DG/M2 "dshift", "ds" |
| 2.1 | 26 |  | Movements along the demand curve and shifts of the demand curve | **COVERED** | "dshift" (shifts); "sshift" shows movement along demand |
| 2.2 | 26 |  | Upward-sloping supply curve | **COVERED** | "sshift", "ds" |
| 2.2 | 26 |  | Movements along and shifts of the supply curve | **COVERED** | "sshift"; "dshift" shows movement along supply |
| 2.3 | 26 |  | Market equilibrium | **COVERED** | "ds" |
| 2.3 | 26 |  | Changes in equilibrium / role of price mechanism | **COVERED** | "dshift", "sshift" |
| 2.3 | 26 |  | Consumer surplus and producer surplus (social/community surplus) maximized at equilibrium | **COVERED** | "ds" (shaded CS and PS) |
| 2.5 | 27 |  | Relatively elastic and inelastic demand | **COVERED** | "ped" (two demand curves through a common point) |
| 2.5 | 27 |  | Constant PED: perfectly elastic, perfectly inelastic and unitary PED along a demand curve | **MISSING** | no diagram; only text mentions |
| 2.5 | 27 | HL | HL: PED along the straight-line demand curve | **PARTIALLY COVERED** | no diagram; DGQ question on where TR is maximised on a straight-line demand curve, attached to "ped" |
| 2.5 | 28 |  | Changes in revenue from price changes when demand is price elastic and price inelastic | **MISSING** | no diagram (TR covered only by calculator "tr" and DATA d2) |
| 2.5 | 28 |  | Engel curve: income elastic, income inelastic and inferior goods | **MISSING** | no diagram |
| 2.6 | 28 |  | Relatively elastic and inelastic supply | **COVERED** | "pes" |
| 2.6 | 28 |  | Constant PES: perfectly elastic, perfectly inelastic and unitary PES along a supply curve | **PARTIALLY COVERED** | "pes" note explains that a line through the origin has PES = 1, but perfectly elastic/inelastic/unitary supply are not drawn |
| 2.7 | 29 |  | Price ceiling (maximum price) with effects on markets and stakeholders | **COVERED** | "ceiling"; lab mode "ceil"; MKTSCEN housing |
| 2.7 | 29 |  | Price floor (minimum price) | **COVERED** | "floor"; lab mode "floor" |
| 2.7 | 29 |  | Indirect tax | **COVERED** | "tax"; lab mode "tax"; BUILDS; REPAIRS |
| 2.7 | 29 |  | Subsidy | **COVERED** | "subsidy"; lab mode "sub" |
| 2.8 | 30 |  | Allocative efficiency (MSB = MSC) | **COVERED** | "ds" (community surplus maximised) and the social optimum marked on each externality diagram |
| 2.8 | 30 |  | Negative externalities of production | **COVERED** | "negprod" |
| 2.8 | 30 |  | Negative externalities of consumption | **COVERED** | "negcons" |
| 2.8 | 30 |  | Positive externalities of production | **COVERED** | "posprod" |
| 2.8 | 30 |  | Positive externalities of consumption | **COVERED** | "poscons" |
| 2.8 | 30 |  | Government responses: indirect (Pigouvian) tax; carbon tax on a polluting industry; subsidies; legislation and regulation; education | **PARTIALLY COVERED** | no policy-applied externality diagrams; POLICIES tax/permit/regulation/education/subsidy point to the base externality diagrams; DMPREDICT "negcons" |
| 2.11 | 32 | HL | HL: Perfectly competitive firm as price taker (P = D = AR = MR) | **MISSING** | no diagram |
| 2.11 | 32 | HL | HL: Perfectly competitive firm showing abnormal profit, normal profit, losses | **MISSING** | no diagram |
| 2.11 | 32 | HL | HL: Equilibrium in perfectly competitive market with allocative efficiency (P = MC, max social surplus) | **PARTIALLY COVERED** | "ds" shows max community surplus at market level; no firm/industry pair |
| 2.11 | 32 | HL | HL: Market power where AR > MC | **PARTIALLY COVERED** | "monopoly" shows P above MC but is not framed as the general market-power diagram |
| 2.11 | 32 | HL | HL: Monopolist showing abnormal profit, normal profit, losses | **PARTIALLY COVERED** | "monopoly" shows abnormal profit only |
| 2.11 | 32 | HL | HL: Monopoly vs perfect competition price/quantity comparison with welfare loss | **COVERED** | "monopoly" (welfare loss against allocatively efficient output) |
| 2.11 | 32 | HL | HL: Natural monopoly | **MISSING** | no diagram (text and GLOSS only) |
| 2.11 | 32 | HL | HL: Collusive oligopoly acting as a monopoly | **MISSING** | no diagram |
| 2.11 | 33 | HL | HL: Simple game theory payoff matrix | **COVERED** | C60 dossier 003 "The Prisoner's Dilemma" (page "The payoff matrix"); GLOSS "Game theory" |
| 2.11 | 33 | HL | HL: Monopolistically competitive firm showing abnormal profit, normal profit, losses | **MISSING** | no diagram |
| 2.11 | 33 | HL | HL: Monopolistic competition with more elastic demand than monopoly | **MISSING** | no diagram |
| 2.12 | 33 | HL | HL: Circular flow model illustrating why the free market results in inequalities | **PARTIALLY COVERED** | generic "circular" only; nothing drawn for inequality |
| 3.1 | 35 |  | Circular flow of income model showing decision makers, leakages and injections | **COVERED** | "circular" |
| 3.1 | 36 |  | Business cycle: short-term fluctuations and long-term growth trend | **COVERED** | "cycle" |
| 3.2 | 36 |  | AD curve | **COVERED** | "adas" |
| 3.2 | 36 |  | Shifts of the AD curve | **COVERED** | "defgap", "infgap" |
| 3.2 | 36 |  | SRAS curve | **COVERED** | "adas" |
| 3.2 | 37 |  | Shifts of the SRAS curve | **COVERED** | "costpush" |
| 3.2 | 37 |  | Alternative views of the AS curve | **COVERED** | "adas" (vertical LRAS, monetarist/new classical) and "lras" (Keynesian AS) |
| 3.2 | 37 |  | Shifts of the LRAS or Keynesian AS | **COVERED** | "growth" (LRAS shift); a Keynesian AS shift is not drawn |
| 3.2 | 37 |  | Macroeconomic equilibrium in the short run and long run | **COVERED** | "adas", "infgap" note on adjustment, "defgap" |
| 3.3 | 37 |  | PPC model showing actual growth and growth in production possibilities | **COVERED** | "ppc" |
| 3.3 | 37 |  | AD increases showing increases in real output | **COVERED** | "lras" (Keynesian ranges), "infgap" |
| 3.3 | 37 |  | LRAS increases showing increases in full employment output | **COVERED** | "growth" |
| 3.3 | 38 |  | Minimum wage to show unemployment | **COVERED** | "labour" |
| 3.3 | 38 |  | Fall in the demand for labour for a particular market or geographical area (structural unemployment) | **MISSING** | no diagram ("labour" shows only a wage floor) |
| 3.3 | 38 |  | Deflationary gap to show cyclical unemployment | **COVERED** | "defgap" |
| 3.3 | 38 |  | Demand-pull inflation | **COVERED** | "infgap" |
| 3.3 | 38 |  | Cost-push inflation | **COVERED** | "costpush" |
| 3.3 | 38 |  | Deflation | **COVERED** | "defgap" (AD fall lowers price level) and "growth" (supply-driven fall in price level) |
| 3.3 | 38 | HL | HL: AD/AS curves (inflation/unemployment trade-off) | **COVERED** | "infgap", "defgap" |
| 3.3 | 38 | HL | HL: Phillips curve short-run and long-run | **COVERED** | "phillips" |
| 3.4 | 39 |  | Lorenz curve showing income distribution and changes in it | **COVERED** | "lorenz"; Lorenz curve builder tool |
| 3.5 | 41 | HL | HL: Determination of equilibrium interest rates (money market) | **MISSING** | no diagram (mind-map node "The money market" only) |
| 3.5 | 42 |  | AD/AS curves showing expansionary and contractionary monetary policy | **COVERED** | AD/AS family ("adas", "defgap", "infgap"); POLICIES "monetary" links to "adas" |
| 3.6 | 42 |  | AD/AS showing expansionary and contractionary fiscal policy (Keynesian and monetarist/new classical) | **COVERED** | "lras" (Keynesian), "infgap"/"defgap" (vertical LRAS); BUILDS fiscal expansion |
| 3.6 | 43 | HL | HL: Crowding-out effect | **MISSING** | no diagram (text in mind map "fiscal", GLOSS) |
| 3.7 | 43 |  | AD/AS model and LRAS showing effect of supply-side policies | **COVERED** | "growth" |
| 3.7 | 43 |  | Minimum wage | **COVERED** | "labour" |
| 4.1 | 45 |  | Free trade: exports when world price is above domestic price | **MISSING** | no diagram |
| 4.1 | 45 |  | Free trade: imports when world price is below domestic price | **PARTIALLY COVERED** | free-trade import position appears only as the pre-tariff state inside "tariff"/"quota" |
| 4.1 | 45 | HL | HL: Linear PPC showing differing opportunity costs and gains from specialisation and trade | **COVERED** | "compadv"; comparative advantage game tool |
| 4.2 | 46 |  | Tariff: effects on price, production, consumption, expenditures, revenues, welfare | **COVERED** | "tariff" |
| 4.2 | 46 |  | Quota: same effects | **COVERED** | "quota" |
| 4.2 | 46 |  | Subsidy/export subsidy: same effects (world-price diagram) | **PARTIALLY COVERED** | only the closed-market "subsidy" diagram; POLICIES "exportsub" points to it |
| 4.5 | 48 |  | Exchange rate determination and changes in equilibrium, floating system | **COVERED** | "fx"; exchange rate lab tool |
| 4.5 | 48 |  | AD/AS curves showing consequences of exchange rate changes | **PARTIALLY COVERED** | no dedicated diagram; generic AD/AS diagrams, used together with "fx" in P2/P3 sets |
| 4.5 | 48 |  | How a fixed exchange rate is maintained | **MISSING** | no diagram (text only; exchange rate lab is floating only) |
| 4.5 | 49 |  | Exchange rate determination under a managed exchange rate system | **MISSING** | no diagram |
| 4.6 | 49 | HL | HL: Exchange rate diagram showing current account balance and exchange rate relationship | **PARTIALLY COVERED** | "fx" demand shift from exports (FXSHIFTS) can be read this way; not presented as a current account diagram |
| 4.6 | 50 | HL | HL: J-curve with reference to the Marshall-Lerner condition | **MISSING** | no diagram (text in mind maps "bop"/"global", EES "fx", P3 "velisk") |
| 4.9 | 51 |  | Poverty cycle showing linked factors that perpetuate poverty | **MISSING** | no diagram (mind-map node "The poverty trap", RW DEV cases) |
| 4.10 | 52 |  | Draw from diagrams in other sections | **COVERED** | no separate requirement; the existing diagram set applies |

The site also has diagrams the guide does not require: `cpr` (common pool resource), `pubgood`, `asym` (adverse selection schematic), `multiplier` (spending rounds), `bop` (accounts schematic) and `infgap`/`defgap` as separate gap diagrams. The `DG` set has 35 diagrams, 28 of which have solved-model versions in `M2`.

## Required calculations (guide "Calculations" columns)

| Code | p. | HL | Guide-required calculation | Status | Site object |
|---|---|---|---|---|---|
| 2.3 | 27 | HL | HL: Consumer surplus and producer surplus from a diagram | **COVERED** | CALC "cs", "ps" |
| 2.5 | 28 |  | PED, change in price, quantity demanded or total revenue from data | **COVERED** | CALC "ped", "tr"; DATA d2 |
| 2.5 | 28 |  | YED, change in income, quantity demanded from data | **COVERED** | CALC "yed" |
| 2.6 | 28 |  | PES, change in price or quantity supplied from data | **COVERED** | CALC "pes"; DATA d6 |
| 2.7 | 30 | HL | HL: Effects on markets and stakeholders of price ceilings and price floors | **COVERED** | CALC "ceilshort", "floorsur" |
| 2.7 | 30 | HL | HL: Effects on markets and stakeholders of indirect taxes and subsidies | **COVERED** | CALC "taxrev", "subcost", "dwl"; DATA d8 |
| 2.8 | 30 | HL | HL: Welfare loss from a diagram | **COVERED** | CALC "extwl" |
| 2.11 | 32 | HL | HL: Profit, MC, MR, AC, AR from data | **COVERED** | CALC "profit", "mcmr" |
| 3.1 | 35 |  | Nominal GDP from national income data (expenditure approach) | **COVERED** | CALC "gdpexp" |
| 3.1 | 35 |  | Nominal GNI from data | **COVERED** | CALC "gni" |
| 3.1 | 35 |  | Real GDP and real GNI using a price deflator | **COVERED** | CALC "realgdp", "realval"; DATA d1; DSETS |
| 3.1 | 36 |  | Real GDP per capita and real GNI per capita | **COVERED** | CALC "gdppc" (GDP); real GNI per capita via "gni" + "realval" (no single calculator) |
| 3.3 | 37 |  | Rate of economic growth from data | **COVERED** | CALC "growth" |
| 3.3 | 38 |  | Unemployment rate from data | **COVERED** | CALC "unemp" |
| 3.3 | 38 | HL | HL: Weighted price index from data | **COVERED** | CALC "wpi"; CPI basket builder tool |
| 3.3 | 38 |  | Inflation rate from data using quantities purchased as weights in the CPI | **COVERED** | CALC "infl" + "wpi"; CPI basket builder; DATA d4 |
| 3.4 | 39 | HL | HL (construction): Lorenz curve from income quintile data | **COVERED** | Lorenz curve builder tool; DATA d7 |
| 3.4 | 40 | HL | HL: Indirect tax paid from a given expenditure and rate | **COVERED** | CALC "indtax" |
| 3.4 | 40 | HL | HL: Total tax and average tax rates from data | **COVERED** | CALC "avgtax" |
| 3.5 | 42 |  | Real interest rates from data | **COVERED** | CALC "realint" |
| 3.6 | 42 | HL | HL: Keynesian multiplier | **COVERED** | CALC "mult"; multiplier lab; DATA d3 |
| 3.6 | 42 | HL | HL: Effect on GDP of a change in an injection using the multiplier | **COVERED** | CALC "mult" (input: injection) |
| 4.1 | 45 | HL | HL: From a diagram, quantity of exports/imports, import expenditure, export revenue | **COVERED** | CALC "tradeflow" |
| 4.1 | 45 | HL | HL: Opportunity costs from data to identify comparative advantage | **COVERED** | CALC "compadv"; comparative advantage game |
| 4.2 | 46 | HL | HL: From a diagram, effects on stakeholders of tariffs | **PARTIALLY COVERED** | CALC "tariffrev" covers government revenue only; consumer/producer/welfare effects are worked only in the "tariff" diagram text |
| 4.2 | 46 | HL | HL: From a diagram, effects on stakeholders of quotas | **COVERED** | CALC "quotaeff" |
| 4.2 | 46 | HL | HL: From a diagram, effects on stakeholders of (export) subsidies | **PARTIALLY COVERED** | only the domestic-market "subcost" calculator (2.7); no trade-subsidy calculator |
| 4.5 | 48 |  | Price of a good in different currencies using exchange rates | **COVERED** | CALC "fx" |
| 4.5 | 48 |  | Changes in the value of a currency from data | **COVERED** | CALC "appdep" |
| 4.6 | 49 |  | Elements of the balance of payments from data | **COVERED** | CALC "ca"; BoP ledger tool; DATA d5 |

The site also has calculators the guide does not require: `pct` (percentage change, core skill) and `tot` (terms of trade). The site itself flags `tot` as enrichment in `ENRICHMENT_TOPICS`, which matches the guide: terms of trade is not a named requirement.

## Content items by subtopic

The evidence column gives the site objects that matched, with hit counts. "syllabus checklist only" means the item appears only in `SUBMETA`.

### 1.1 What is economics? (guide p. 22–23): PARTIALLY COVERED

Linked objects: diagrams ['circular', 'ppc']; calculators —; mind maps ['foundations', 'syn-scarcity']; models —; policies —; concept cards —; key concepts tagged ['Scarcity', 'Choice', 'Sustainability', 'Interdependence'].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept |  | Economics as a social science; micro vs macro | 22 | COVERED | RW_CASES 54, CALC 14, EES_TOPICS 6, NEWCALC 5, EDU_MODULES 1, TOKDOM 1 |
| Concept |  | Nine central concepts introduced | 22 | COVERED | KCX/KCMAP: 9 key-concept objects (Course > Key concepts tab); GUIDE.kc lists all nine; TOKKC has a TOK entry for each |
| Concept |  | Factors of production: land, labour, capital, entrepreneurship | 22 | COVERED | MIND_MAPS 4, GLOSS 1, DEFS 1, CONCEPTS 1, EES_MODELS 1, TOPICS 1 |
| Concept |  | Scarcity: unlimited wants vs limited resources | 22 | COVERED | RW_CASES 23, MIND_MAPS 18, TOPICS 6, TOKKC 4, C60 3, EEQ 2 |
| Concept |  | Scarcity and sustainability | 22 | COVERED | RW_CASES 5, EDU_MODULES 1 |
| Concept |  | Opportunity cost (cost of choice) | 23 | COVERED | MIND_MAPS 59, EEQ 14, C60 11, CALC 8, CONCEPTS 7, EES_MODELS 7 |
| Concept |  | Free goods | 23 | COVERED | MIND_MAPS 5, GLOSS 1 |
| Concept |  | Basic economic questions: what/how/for whom | 23 | COVERED | MIND_MAPS 3, RW 2, EEQ 1 |
| Concept |  | Market versus government intervention | 23 | COVERED | MIND_MAPS 3, EES_MODELS 3, RW_CASES 3, QB 2, MODELS 1, EES_TOPICS 1 |
| Concept |  | Economic systems: free market, planned, mixed economy | 23 | PARTIALLY COVERED | one mind-map node only (foundations > "Economic systems: market, planned and mixed"); no glossary entry or teaching page |
| Concept |  | PPC: assumptions of the model | 23 | NEEDS VERIFICATION | keyword hits are generic ("assumption"); no clearly identified statement of PPC assumptions (fixed resources/technology, two goods) was found |
| Concept |  | PPC: increasing versus constant opportunity cost | 23 | COVERED | MIND_MAPS 2, TOKMOD 2, EES_MODELS 1, C60 1, EEQ 1, TOKLENS 1 |
| Concept |  | PPC features: unemployment of resources, efficiency, actual growth, growth in production possibilities | 23 | COVERED | MIND_MAPS 3, GLOSS 2, DGTEXT 2, DEFS 1, EES_MODELS 1 |
| Concept |  | Circular flow of income model | 23 | COVERED | MIND_MAPS 4, DGTEXT 2, VIDEO_LIBRARY 2, GLOSS 1, EES_MODELS 1, SCHEMATIC 1 |
| Concept |  | Interdependence of households, firms, government, banks/financial sector, foreign sector | 23 | COVERED | GLOSS 2, TOKMOD 1 |
| Concept |  | Leakages and injections | 23 | COVERED | RW_CASES 17, MIND_MAPS 12, RW_DEEP 11, CONCEPTS 6, MODELS 6, REPAIRS 6 |
| Diagram |  | PPC illustrating choice and opportunity cost, unemployment of resources, actual growth and growth in production possibilities | 23 | COVERED | DG/M2 "ppc" (points A/B/C and outward shift) |
| Diagram |  | PPC showing increasing versus constant opportunity cost | 23 | PARTIALLY COVERED | "ppc" shows only the concave (increasing) case; a linear PPC exists only inside "compadv" (4.1) |
| Diagram |  | Circular flow of income model with leakages and injections | 23 | COVERED | DG "circular" |

### 1.2 How do economists approach the world? (guide p. 23–24): PARTIALLY COVERED

Linked objects: diagrams —; calculators ['pct']; mind maps ['foundations', 'syn-effeq', 'syn-scarcity']; models —; policies —; concept cards —; key concepts tagged [].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept |  | Positive economics (logic, hypotheses, models, theories) | 23 | PARTIALLY COVERED | GLOSS "Positive economics" and "Normative economics" entries only; hypotheses/models/theories/refutation method not taught as a unit |
| Concept |  | Ceteris paribus assumption | 23 | COVERED | GLOSS 5, TOKMOD 3, DEFS 2, MODELS 2, EDU_MODULES 2, EES_MODELS 1 |
| Concept |  | Empirical evidence and refutation | 23 | COVERED | RW_DEEP 2, TOKACT 2, GLOSS 1, MIND_MAPS 1, TOKQ 1 |
| Concept |  | Normative economics; value judgments in policy making | 23 | COVERED | MIND_MAPS 7, TOKKC 3, TOKVAL 3, TOKACT 3, GLOSS 2, EDU_MODULES 2 |
| Concept |  | Meaning of equity and equality | 23 | COVERED | MIND_MAPS 8, RW_CASES 3, KCX 2, MISC 2, POLICIES 1, EES_TOPICS 1 |
| Concept |  | 18th century: Adam Smith and laissez faire | 23 | MISSING | not found |
| Concept |  | 19th century: classical micro (utility), the margin, Say's law, Marxist critique | 24 | MISSING | not found (the margin appears in mind map "foundations", but Say's law and the Marxist critique do not) |
| Concept |  | 20th century: Keynesian revolution, rise of macro policy, monetarist/new classical counter-revolution | 24 | PARTIALLY COVERED | Keynesian and monetarist/new classical views are taught as AS models in 3.2, but not as the history of economic thought |
| Concept |  | 21st century: behavioural economics, dialogue with other disciplines | 24 | COVERED | mind map "behavioural", EES "behav", C60 dossiers |
| Concept |  | 21st century: circular economy | 24 | MISSING | not found |

### 2.1 Demand (guide p. 25–26): COVERED

Linked objects: diagrams ['dshift']; calculators —; mind maps ['market', 'demand']; models ['ees:ds']; policies —; concept cards —; key concepts tagged ['Change'].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept | HL | Assumptions underlying law of demand: income and substitution effects | 25 | COVERED | MIND_MAPS 10, TOPICS 6, RW_CASES 4, MISC 2 |
| Concept | HL | Law of diminishing marginal utility | 25 | COVERED | MIND_MAPS 5, GLOSS 1, TOPICS 1 |
| Concept |  | Law of demand | 25 | COVERED | MIND_MAPS 6, TOPICS 2, GLOSS 1, DEFS 1, RW_CASES 1 |
| Concept |  | Individual vs market demand | 25 | COVERED | MIND_MAPS 6, MISC 3, TOPICS 2, C60 2, TOKLENS 2, CONCEPTS 1 |
| Concept |  | Non-price determinants of demand (income, tastes, expectations, related goods, number of consumers) | 25 | COVERED | EES_MODELS 3, MIND_MAPS 2, MODELS 2, TOPICS 1 |
| Concept |  | Substitutes and complements | 25 | COVERED | MIND_MAPS 3, EES_TOPICS 3, RW_CASES 3, EES_MODELS 2, TOPICS 2, GLOSS 1 |
| Concept |  | Movements along vs shifts of demand curve | 25 | COVERED | RW_DEEP 13, MIND_MAPS 11, CHAINS 5, TOPICS 4, EDU_MODULES 3, CONCEPTS 2 |
| Diagram |  | Downward-sloping demand curve | 25 | COVERED | DG/M2 "dshift", "ds" |
| Diagram |  | Movements along the demand curve and shifts of the demand curve | 26 | COVERED | "dshift" (shifts); "sshift" shows movement along demand |

### 2.2 Supply (guide p. 26): PARTIALLY COVERED

Linked objects: diagrams ['sshift']; calculators —; mind maps ['market', 'supply']; models —; policies —; concept cards —; key concepts tagged [].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept | HL | Law of diminishing marginal returns | 26 | COVERED | RW_CASES 2, GLOSS 1 |
| Concept | HL | Increasing marginal costs | 26 | COVERED | MIND_MAPS 1, TOPICS 1 |
| Concept |  | Law of supply | 26 | PARTIALLY COVERED | mind map "supply" (node "Why it slopes up") and GLOSS "Supply"; the phrase "law of supply" is not defined anywhere outside the syllabus checklist |
| Concept |  | Individual vs market supply | 26 | PARTIALLY COVERED | one mind-map mention |
| Concept |  | Non-price determinants of supply | 26 | COVERED | MODELS 2, MIND_MAPS 1, EEQ 1, CHAINS 1 |
| Concept |  | Joint and competitive supply | 26 | PARTIALLY COVERED | mind map "supply" node "Price of related goods" only |
| Concept |  | Movements along and shifts of supply curve | 26 | COVERED | MIND_MAPS 21, DGTEXT 6, CHAINS 3, POLICIES 2, EES_MODELS 2, EEQ 2 |
| Diagram |  | Upward-sloping supply curve | 26 | COVERED | "sshift", "ds" |
| Diagram |  | Movements along and shifts of the supply curve | 26 | COVERED | "sshift"; "dshift" shows movement along supply |

### 2.3 Competitive market equilibrium (guide p. 26–27): COVERED

Linked objects: diagrams ['ds']; calculators ['cs', 'ps']; mind maps ['market']; models ['market']; policies —; concept cards —; key concepts tagged ['Scarcity', 'Efficiency', 'Change'].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept |  | Market equilibrium | 26 | COVERED | MIND_MAPS 11, TOPICS 6, REPAIRS 6, DGTEXT 4, DEFS 3, CALC 3 |
| Concept |  | Excess demand (shortage) and excess supply (surplus) | 26 | COVERED | EES_MODELS 5, CHAINS 3, QB 3, MIND_MAPS 2, MODELS 2, CALC 2 |
| Concept |  | Functions of price mechanism: signalling, incentive, rationing | 26 | COVERED | MIND_MAPS 12, C60 10, RW_CASES 9, EES_MODELS 4, EEQ 4, QB 4 |
| Concept |  | Consumer and producer surplus | 26 | COVERED | MIND_MAPS 2, CONCEPTS 2, CALC 2, CHAINS 2, GLOSS 1, DEFS 1 |
| Concept |  | Social/community surplus | 26 | COVERED | GLOSS 4, DMPREDICT 3, DEFS 1, CALC 1, TOPICS 1, DGTEXT 1 |
| Concept |  | Allocative efficiency at competitive equilibrium; MB = MC | 26 | COVERED | MIND_MAPS 4, GLOSS 3, RW_DEEP 2, DMPREDICT 2, DEFS 1, CONCEPTS 1 |
| Diagram |  | Market equilibrium | 26 | COVERED | "ds" |
| Diagram |  | Changes in equilibrium / role of price mechanism | 26 | COVERED | "dshift", "sshift" |
| Diagram |  | Consumer surplus and producer surplus (social/community surplus) maximized at equilibrium | 26 | COVERED | "ds" (shaded CS and PS) |
| Calculation | HL | Consumer surplus and producer surplus from a diagram | 27 | COVERED | CALC "cs", "ps" |

### 2.4 Critique of the maximizing behaviour of consumers and producers (guide p. 27): COVERED

Linked objects: diagrams —; calculators —; mind maps ['behavioural']; models —; policies —; concept cards —; key concepts tagged ['Choice'].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept | HL | Rational consumer choice assumptions (rationality, utility maximization, perfect information) | 27 | COVERED | MIND_MAPS 3, EES_MODELS 1, EES_TOPICS 1 |
| Concept | HL | Biases: rule of thumb, anchoring and framing, availability | 27 | COVERED | RW_CASES 14, EES_TOPICS 5, EES_MODELS 4, POLICIES 3, C60 3, EEQ 3 |
| Concept | HL | Bounded rationality | 27 | COVERED | MIND_MAPS 1, EES_MODELS 1, EES_TOPICS 1, EEQ 1 |
| Concept | HL | Bounded self-control | 27 | COVERED | MIND_MAPS 1, EES_TOPICS 1, EEQ 1 |
| Concept | HL | Bounded selfishness | 27 | COVERED | MIND_MAPS 1, EES_TOPICS 1, EEQ 1 |
| Concept | HL | Imperfect information | 27 | COVERED | MIND_MAPS 3, DEFS 1 |
| Concept | HL | Choice architecture: default, restricted, mandated choices | 27 | COVERED | EES_TOPICS 7, MIND_MAPS 4, EEQ 3, GLOSS 2, EES_MODELS 2, RW_DEEP 2 |
| Concept | HL | Nudge theory | 27 | COVERED | MIND_MAPS 5, RW_CASES 4, RW_DEEP 4, POLICIES 3, EES_MODELS 3, EES_TOPICS 3 |
| Concept | HL | Profit maximization as business objective | 27 | COVERED | MIND_MAPS 5, MODELS 2, CONCEPTS 1, C60 1, TOKMOD 1 |
| Concept | HL | Alternative objectives: CSR, market share, satisficing, growth | 27 | COVERED | MIND_MAPS 7, GLOSS 1 |

### 2.5 Elasticity of demand (guide p. 27–28): PARTIALLY COVERED

Linked objects: diagrams ['ped']; calculators ['ped', 'yed', 'tr']; mind maps ['elasticity', 'ped', 'syn-elastax', 'syn-elasgov']; models ['elas', 'ees:ped']; policies —; concept cards ['c-ped']; key concepts tagged [].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept |  | Price elasticity of demand (formula, degrees) | 27 | COVERED | MIND_MAPS 9, QB 4, VIDEO_LIBRARY 4, CONCEPTS 2, EES_MODELS 2, EES_TOPICS 2 |
| Concept | HL | Changing PED along a straight-line demand curve | 27 | COVERED | MISC 4, MIND_MAPS 2, DEFS 1, CONCEPTS 1, MODELS 1, REPAIRS 1 |
| Concept |  | Determinants of PED | 28 | COVERED | MIND_MAPS 3, MODELS 2, TOPICS 2, C60 2, EXEMPLARS 1 |
| Concept |  | PED and total revenue | 28 | COVERED | MIND_MAPS 9, CALC 5, QB 3, DATA 3, EES_MODELS 2, NEWCALC 2 |
| Concept |  | Importance of PED for firms and government | 28 | COVERED | MIND_MAPS 8, TOPICS 3, RW_CASES 2, MODELS 1, EES_TOPICS 1, CHAINS 1 |
| Concept | HL | Why PED for primary commodities is lower than for manufactured products | 28 | COVERED | MIND_MAPS 4, EES_MODELS 1, CASES 1, RW 1, DEBATES 1, TRANSFER 1 |
| Concept |  | Income elasticity of demand; normal/inferior; necessities/luxuries | 28 | COVERED | MIND_MAPS 14, GLOSS 5, CALC 5, TOPICS 5, EES_MODELS 3, DEFS 1 |
| Concept |  | Inferior goods | 28 | COVERED | MIND_MAPS 6, GLOSS 1, EES_MODELS 1, TOPICS 1 |
| Concept | HL | Importance of YED for firms and sectoral structure of the economy | 28 | PARTIALLY COVERED | mentioned in the YED calculator notes and an EEQ explainer only |
| Diagram |  | Relatively elastic and inelastic demand | 27 | COVERED | "ped" (two demand curves through a common point) |
| Diagram |  | Constant PED: perfectly elastic, perfectly inelastic and unitary PED along a demand curve | 27 | MISSING | no diagram; only text mentions |
| Diagram | HL | PED along the straight-line demand curve | 27 | PARTIALLY COVERED | no diagram; DGQ question on where TR is maximised on a straight-line demand curve, attached to "ped" |
| Diagram |  | Changes in revenue from price changes when demand is price elastic and price inelastic | 28 | MISSING | no diagram (TR covered only by calculator "tr" and DATA d2) |
| Diagram |  | Engel curve: income elastic, income inelastic and inferior goods | 28 | MISSING | no diagram |
| Calculation |  | PED, change in price, quantity demanded or total revenue from data | 28 | COVERED | CALC "ped", "tr"; DATA d2 |
| Calculation |  | YED, change in income, quantity demanded from data | 28 | COVERED | CALC "yed" |

### 2.6 Elasticity of supply (guide p. 28): PARTIALLY COVERED

Linked objects: diagrams ['pes']; calculators ['pes']; mind maps ['elasticity', 'syn-elasgov']; models —; policies —; concept cards —; key concepts tagged [].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept |  | Price elasticity of supply (formula, degrees) | 28 | COVERED | MIND_MAPS 14, EEQ 11, RW_CASES 8, DGTEXT 6, CALC 5, DATA 4 |
| Concept |  | Determinants of PES (time, mobility of FOPs, unused capacity, storage, cost increases) | 28 | COVERED | MIND_MAPS 23, QB 5, EES_MODELS 3, CHAINS 3, CONCEPTS 2, MODELS 2 |
| Concept | HL | Why PES for primary commodities is lower | 28 | COVERED | MIND_MAPS 4, EES_MODELS 1, CASES 1, RW 1, DEBATES 1, TRANSFER 1 |
| Diagram |  | Relatively elastic and inelastic supply | 28 | COVERED | "pes" |
| Diagram |  | Constant PES: perfectly elastic, perfectly inelastic and unitary PES along a supply curve | 28 | PARTIALLY COVERED | "pes" note explains that a line through the origin has PES = 1, but perfectly elastic/inelastic/unitary supply are not drawn |
| Calculation |  | PES, change in price or quantity supplied from data | 28 | COVERED | CALC "pes"; DATA d6 |

### 2.7 Role of government in microeconomics (guide p. 29–30): COVERED

Linked objects: diagrams ['tax', 'subsidy', 'ceiling', 'floor']; calculators ['taxrev', 'subcost', 'dwl', 'ceilshort', 'floorsur']; mind maps ['intervene', 'tax', 'controls', 'syn-elastax', 'syn-elasgov', 'syn-effeq']; models ['interv', 'ees:gov']; policies ['tax', 'subsidy', 'ceiling', 'floor', 'nudge']; concept cards ['c-inc', 'c-pmax']; key concepts tagged ['Equity', 'Intervention'].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept |  | Reasons for intervention (revenue, support firms/households, production, consumption, market failure, equity) | 29 | PARTIALLY COVERED | no object sets out the seven guide reasons; only scattered mentions (QB question on intervening for equity, mind-map nodes) |
| Concept |  | Price ceilings (maximum prices) | 29 | COVERED | MIND_MAPS 19, RW_CASES 7, TOPICS 5, EEQ 5, CALC 4, NEWCALC 4 |
| Concept |  | Price floors (minimum prices) | 29 | COVERED | RW_CASES 13, MIND_MAPS 7, CALC 6, DEFS 4, NEWCALC 4, GLOSS 3 |
| Concept |  | Indirect taxes and subsidies | 30 | COVERED | MIND_MAPS 38, RW_CASES 7, TOPICS 6, GLOSS 4, EES_TOPICS 4, CALC 4 |
| Concept |  | Direct provision of services | 30 | COVERED | MIND_MAPS 3, CONCEPTS 1, POLICIES 1, DGTEXT 1, EEQ 1, KCX 1 |
| Concept |  | Command and control regulation and legislation | 30 | COVERED | RW 2, POLICIES 1, WRITING 1 |
| Concept | HL | Consumer nudges | 30 | COVERED | MIND_MAPS 5, RW_CASES 4, RW_DEEP 4, POLICIES 3, EES_MODELS 3, EES_TOPICS 3 |
| Concept |  | Consequences for markets and stakeholders | 30 | COVERED | MIND_MAPS 39, RW_DEEP 14, ARCHETYPES 4, CALC 3, NEWCALC 3, EDU_MODULES 3 |
| Diagram |  | Price ceiling (maximum price) with effects on markets and stakeholders | 29 | COVERED | "ceiling"; lab mode "ceil"; MKTSCEN housing |
| Diagram |  | Price floor (minimum price) | 29 | COVERED | "floor"; lab mode "floor" |
| Diagram |  | Indirect tax | 29 | COVERED | "tax"; lab mode "tax"; BUILDS; REPAIRS |
| Diagram |  | Subsidy | 29 | COVERED | "subsidy"; lab mode "sub" |
| Calculation | HL | Effects on markets and stakeholders of price ceilings and price floors | 30 | COVERED | CALC "ceilshort", "floorsur" |
| Calculation | HL | Effects on markets and stakeholders of indirect taxes and subsidies | 30 | COVERED | CALC "taxrev", "subcost", "dwl"; DATA d8 |

### 2.8 Market failure—externalities and common pool or common access resources (guide p. 30–31): PARTIALLY COVERED

Linked objects: diagrams ['negprod', 'negcons', 'poscons', 'cpr', 'posprod']; calculators ['extwl']; mind maps ['failure', 'extern', 'publicgoods', 'syn-extsust']; models ['ext', 'ees:mf', 'ees:ext']; policies ['permit', 'regulation', 'education', 'international']; concept cards ['c-ext']; key concepts tagged ['Scarcity', 'Efficiency', 'Sustainability', 'Intervention'].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept |  | Socially optimum output MSB = MSC | 30 | COVERED | MIND_MAPS 19, DGTEXT 9, C60 6, REPAIRS 5, GLOSS 4, EEQ 4 |
| Concept |  | Positive externalities of production and consumption | 30 | COVERED | RW_CASES 15, MIND_MAPS 3, DGTEXT 3, GLOSS 2, DEFS 1, POLICIES 1 |
| Concept |  | Merit goods | 30 | COVERED | RW_CASES 20, MIND_MAPS 12, EXEMPLARS 5, MISC 3, GLOSS 2, POLICIES 2 |
| Concept |  | Negative externalities of production and consumption | 30 | COVERED | RW_CASES 15, MIND_MAPS 7, DGTEXT 3, GLOSS 2, TOPICS 2, EEQ 2 |
| Concept |  | Demerit goods | 30 | COVERED | RW_CASES 14, EXEMPLARS 5, MIND_MAPS 2, GLOSS 1, EES_TOPICS 1, DGTEXT 1 |
| Concept |  | Common pool resources; tragedy of the commons; rivalrous but non-excludable | 30 | COVERED | MIND_MAPS 15, C60 10, EES_TOPICS 4, CASES 2, RW_CASES 2, MISC 2 |
| Concept |  | Unsustainable production creating negative externalities | 30 | COVERED | MIND_MAPS 3, RW_CASES 1, DECIDE 1, TOKACT 1 |
| Concept |  | Pigouvian taxes | 30 | COVERED | EEQ 3, MODELS 2, RW_CASES 2, RW_DEEP 2, GLOSS 1, POLICIES 1 |
| Concept |  | Carbon taxes | 30 | COVERED | RW_CASES 7, MIND_MAPS 3, EES_TOPICS 3, EEQ 2, RW 2, QB 2 |
| Concept |  | Education / awareness creation | 30 | COVERED | RW_DEEP 2, BUILDS 2, POLICIES 1, EES_TOPICS 1, DGTEXT 1, RW_CASES 1 |
| Concept |  | Tradable permits | 30 | COVERED | RW_CASES 8, MIND_MAPS 5, EEQ 3, RW 3, EES_TOPICS 2, QB 2 |
| Concept |  | International agreements | 30 | COVERED | POLICIES "international" (International agreement) object with mechanism, limits and alternatives |
| Concept |  | Collective self-governance | 31 | COVERED | C60 1, EEQ 1, CASES 1 |
| Concept |  | Challenges in measuring externalities | 31 | PARTIALLY COVERED | one MISC item plus TOKLENS prompt on locating the MSC curve |
| Concept |  | International cooperation: global nature, challenges, monitoring, enforcement | 31 | COVERED | RW_CASES 8, POLICIES 5, MIND_MAPS 3, QB 3, EES_MODELS 2, C60 2 |
| Diagram |  | Allocative efficiency (MSB = MSC) | 30 | COVERED | "ds" (community surplus maximised) and the social optimum marked on each externality diagram |
| Diagram |  | Negative externalities of production | 30 | COVERED | "negprod" |
| Diagram |  | Negative externalities of consumption | 30 | COVERED | "negcons" |
| Diagram |  | Positive externalities of production | 30 | COVERED | "posprod" |
| Diagram |  | Positive externalities of consumption | 30 | COVERED | "poscons" |
| Diagram |  | Government responses: indirect (Pigouvian) tax; carbon tax on a polluting industry; subsidies; legislation and regulation; education | 30 | PARTIALLY COVERED | no policy-applied externality diagrams; POLICIES tax/permit/regulation/education/subsidy point to the base externality diagrams; DMPREDICT "negcons" |
| Calculation | HL | Welfare loss from a diagram | 30 | COVERED | CALC "extwl" |

### 2.9 Market failure—public goods (guide p. 31): COVERED

Linked objects: diagrams ['pubgood']; calculators —; mind maps ['failure', 'publicgoods']; models —; policies ['provision']; concept cards ['c-pgood']; key concepts tagged [].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept |  | Public goods: non-rivalrous, non-excludable | 31 | COVERED | MIND_MAPS 8, EEQ 5, GLOSS 2, DEFS 2, CONCEPTS 2, MISC 2 |
| Concept |  | Free rider problem | 31 | COVERED | MIND_MAPS 8, EEQ 3, DGTEXT 2, REPAIRS 2, GLOSS 1, DEFS 1 |
| Concept |  | Direct provision of public goods | 31 | COVERED | MIND_MAPS 3, CONCEPTS 1, POLICIES 1, DGTEXT 1, EEQ 1, KCX 1 |
| Concept |  | Contracting out to the private sector | 31 | PARTIALLY COVERED | one EEQ explainer sentence |

### 2.10 Market failure—asymmetric information (HL only) (guide p. 31): COVERED

Linked objects: diagrams ['asym']; calculators —; mind maps ['failure']; models ['ees:info']; policies —; concept cards ['c-asym']; key concepts tagged [].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept | HL | Asymmetric information | 31 | COVERED | EES_TOPICS 6, QB 4, EES_MODELS 3, RW_CASES 3, MIND_MAPS 2, C60 2 |
| Concept | HL | Adverse selection | 31 | COVERED | C60 5, CONCEPTS 4, MIND_MAPS 3, GLOSS 2, DEFS 1, EES_MODELS 1 |
| Concept | HL | Moral hazard | 31 | COVERED | CONCEPTS 4, C60 3, GLOSS 2, MIND_MAPS 2, RW_CASES 2, DEFS 1 |
| Concept | HL | Government responses: legislation/regulation, provision of information | 31 | COVERED | CONCEPTS 3, RW_CASES 3, EES_TOPICS 2, P3CASES 2, QB 2, MODELS 1 |
| Concept | HL | Private responses: signalling and screening | 31 | COVERED | C60 3, GLOSS 2, EES_MODELS 2, QB 2, CONCEPTS 1 |

### 2.11 Market failure—market power (HL only) (guide p. 31–33): PARTIALLY COVERED

Linked objects: diagrams ['monopoly']; calculators ['profit', 'mcmr']; mind maps ['failure', 'structure', 'monopoly']; models ['mono', 'ees:mstr']; policies —; concept cards ['c-mono']; key concepts tagged ['Efficiency', 'Interdependence'].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept | HL | Perfect competition characteristics | 31 | COVERED | MIND_MAPS 6, GLOSS 1, MODELS 1, EES_MODELS 1, EES_TOPICS 1, EEQ 1 |
| Concept | HL | Monopoly characteristics (barriers to entry) | 31 | COVERED | MIND_MAPS 7, EES_TOPICS 4, GLOSS 2, EES_MODELS 2, EEQ 2, RW_CASES 2 |
| Concept | HL | Oligopoly characteristics (interdependence) | 32 | COVERED | RW_CASES 9, MIND_MAPS 5, EES_TOPICS 5, EES_MODELS 4, GLOSS 2, EEQ 2 |
| Concept | HL | Monopolistic competition characteristics (product differentiation) | 32 | COVERED | GLOSS 1, MIND_MAPS 1, EES_MODELS 1, EES_TOPICS 1, C60 1, EEQ 1 |
| Concept | HL | Profit maximization MC = MR | 32 | COVERED | CONCEPTS 3, MODELS 2, EES_MODELS 1, DGTEXT 1, QB 1, DGQ 1 |
| Concept | HL | Abnormal profit, normal profit, losses (AR vs AC) | 32 | COVERED | GLOSS 2, MODELS 2, MIND_MAPS 1, CALC 1, NEWCALC 1, DGTEXT 1 |
| Concept | HL | Normal profit | 32 | COVERED | MIND_MAPS 8, GLOSS 3, CALC 3, NEWCALC 3, MODELS 2, CONCEPTS 1 |
| Concept | HL | Market power; firm as price taker vs price maker | 32 | COVERED | GLOSS 2, MIND_MAPS 2, CHAINS 2, DEFS 1, CONCEPTS 1, MODELS 1 |
| Concept | HL | Perfect competition short run vs long run | 32 | COVERED | MIND_MAPS 3, QB 1 |
| Concept | HL | Monopoly allocative inefficiency and welfare loss vs perfect competition | 32 | COVERED | MIND_MAPS 7, QB 3, CONCEPTS 2, DGTEXT 2, MODELS 1, RW_CASES 1 |
| Concept | HL | Natural monopoly | 32 | COVERED | MIND_MAPS 2, CONCEPTS 2, QB 2, GLOSS 1, CASES 1, MEMOCASES 1 |
| Concept | HL | Collusive vs non-collusive oligopoly; cartels | 32 | COVERED | EEQ 8, RW_CASES 8, EES_TOPICS 4, C60 2, GLOSS 1, MIND_MAPS 1 |
| Concept | HL | Risk of price war, incentive to collude/cheat | 32 | COVERED | RW_CASES 4, RW_DEEP 3, GLOSS 1, EES_MODELS 1, EES_TOPICS 1, EEQ 1 |
| Concept | HL | Simple game theory payoff matrix | 33 | COVERED | EES_MODELS 11, C60 8, EEQ 8, GLOSS 2, RW_DEEP 1 |
| Concept | HL | Price and non-price competition | 33 | MISSING | syllabus checklist only |
| Concept | HL | Concentration ratios | 33 | COVERED | EES_TOPICS 2, GLOSS 1, EES_MODELS 1 |
| Concept | HL | Monopolistic competition SR/LR profit, more elastic demand, less inefficiency, more variety | 33 | PARTIALLY COVERED | MIND_MAPS 1 |
| Concept | HL | Economies of scale | 33 | COVERED | MIND_MAPS 5, GLOSS 2, EES_MODELS 2, QB 2, CONCEPTS 1, MODELS 1 |
| Concept | HL | Abnormal profits financing R&D and innovation | 33 | COVERED | RW_CASES 8, MIND_MAPS 5, EES_MODELS 2, EEQ 2, CONCEPTS 1, MODELS 1 |
| Concept | HL | Risks of markets dominated by few very large firms | 33 | PARTIALLY COVERED | RW_CASES 2 |
| Concept | HL | Intervention vs abuse of market power: legislation/regulation, government ownership, fines | 33 | COVERED | MIND_MAPS 44, EES_TOPICS 30, RW_CASES 13, GLOSS 11, EEQ 11, TOPICS 9 |
| Diagram | HL | Perfectly competitive firm as price taker (P = D = AR = MR) | 32 | MISSING | no diagram |
| Diagram | HL | Perfectly competitive firm showing abnormal profit, normal profit, losses | 32 | MISSING | no diagram |
| Diagram | HL | Equilibrium in perfectly competitive market with allocative efficiency (P = MC, max social surplus) | 32 | PARTIALLY COVERED | "ds" shows max community surplus at market level; no firm/industry pair |
| Diagram | HL | Market power where AR > MC | 32 | PARTIALLY COVERED | "monopoly" shows P above MC but is not framed as the general market-power diagram |
| Diagram | HL | Monopolist showing abnormal profit, normal profit, losses | 32 | PARTIALLY COVERED | "monopoly" shows abnormal profit only |
| Diagram | HL | Monopoly vs perfect competition price/quantity comparison with welfare loss | 32 | COVERED | "monopoly" (welfare loss against allocatively efficient output) |
| Diagram | HL | Natural monopoly | 32 | MISSING | no diagram (text and GLOSS only) |
| Diagram | HL | Collusive oligopoly acting as a monopoly | 32 | MISSING | no diagram |
| Diagram | HL | Simple game theory payoff matrix | 33 | COVERED | C60 dossier 003 "The Prisoner's Dilemma" (page "The payoff matrix"); GLOSS "Game theory" |
| Diagram | HL | Monopolistically competitive firm showing abnormal profit, normal profit, losses | 33 | MISSING | no diagram |
| Diagram | HL | Monopolistic competition with more elastic demand than monopoly | 33 | MISSING | no diagram |
| Calculation | HL | Profit, MC, MR, AC, AR from data | 32 | COVERED | CALC "profit", "mcmr" |

### 2.12 The market's inability to achieve equity (HL only) (guide p. 33): PARTIALLY COVERED

Linked objects: diagrams —; calculators —; mind maps ['failure']; models —; policies —; concept cards —; key concepts tagged ['Equity'].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept | HL | Free market may result in unequal distribution of income and wealth | 33 | COVERED | RW_CASES 3, EES_MODELS 2, MIND_MAPS 1, POLICIES 1, KCX 1 |
| Diagram | HL | Circular flow model illustrating why the free market results in inequalities | 33 | PARTIALLY COVERED | generic "circular" only; nothing drawn for inequality |

### 3.1 Measuring economic activity and illustrating its variations (guide p. 35–36): PARTIALLY COVERED

Linked objects: diagrams ['cycle']; calculators ['realgdp', 'realval', 'gdpexp', 'gni', 'gdppc']; mind maps ['gdp', 'activity']; models ['ees:unemp']; policies —; concept cards —; key concepts tagged ['Economic well-being', 'Change'].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept |  | National income accounting as a measure of economic activity | 35 | COVERED | GLOSS 2, P2SETS 2, VIDEO_LIBRARY 2, DEFS 1, EES_MODELS 1, EES_TOPICS 1 |
| Concept |  | Equivalence of income, output and expenditure approaches | 35 | COVERED | MIND_MAPS 1, CALC 1, NEWCALC 1, VIDEO_LIBRARY 1 |
| Concept |  | Nominal GDP as a measure of national output | 35 | COVERED | MIND_MAPS 65, CALC 23, EEQ 22, EES_TOPICS 18, NEWCALC 15, P2SETS 15 |
| Concept |  | Nominal GNI | 35 | COVERED | MIND_MAPS 13, CALC 7, NEWCALC 7, P2SETS 4, GLOSS 3, DEFS 2 |
| Concept |  | Real GDP and real GNI | 35 | COVERED | MIND_MAPS 13, CALC 11, EEQ 8, EES_MODELS 5, EES_TOPICS 5, DETECTIVE 5 |
| Concept |  | GDP/GNI per capita | 36 | COVERED | MIND_MAPS 24, EEQ 11, CALC 6, NEWCALC 6, TRAPS 5, P2SETS 4 |
| Concept |  | Purchasing power parity (PPP) | 36 | COVERED | GLOSS 2, P2SETS 2, EES_MODELS 1, EES_TOPICS 1, CALC 1, NEWCALC 1 |
| Concept |  | Business cycle; short-term fluctuations and long-term trend (potential output) | 36 | COVERED | MIND_MAPS 5, EES_TOPICS 2, GLOSS 1, DEFS 1, DGTEXT 1, EEQ 1 |
| Concept |  | Appropriateness of GDP/GNI to measure well-being (over time, between countries) | 36 | COVERED | MIND_MAPS 3, EES_MODELS 1, KCX 1, TOKKC 1 |
| Concept |  | OECD Better Life Index | 36 | PARTIALLY COVERED | named in mind-map nodes ("Alternative measures") only |
| Concept |  | Happiness Index (World Happiness Report) | 36 | MISSING | only an incidental TOK mention of "self-reported life satisfaction"; the index itself is not described |
| Concept |  | Happy Planet Index | 36 | PARTIALLY COVERED | named in a mind-map node only |
| Diagram |  | Circular flow of income model showing decision makers, leakages and injections | 35 | COVERED | "circular" |
| Diagram |  | Business cycle: short-term fluctuations and long-term growth trend | 36 | COVERED | "cycle" |
| Calculation |  | Nominal GDP from national income data (expenditure approach) | 35 | COVERED | CALC "gdpexp" |
| Calculation |  | Nominal GNI from data | 35 | COVERED | CALC "gni" |
| Calculation |  | Real GDP and real GNI using a price deflator | 35 | COVERED | CALC "realgdp", "realval"; DATA d1; DSETS |
| Calculation |  | Real GDP per capita and real GNI per capita | 36 | COVERED | CALC "gdppc" (GDP); real GNI per capita via "gni" + "realval" (no single calculator) |

### 3.2 Variations in economic activity—aggregate demand and aggregate supply (guide p. 36–37): COVERED

Linked objects: diagrams ['adas', 'defgap', 'infgap', 'lras']; calculators —; mind maps ['adas2', 'syn-intrate', 'syn-fxtrade', 'activity']; models ['adas', 'ees:adas', 'ees:mon']; policies —; concept cards ['c-ad', 'c-as']; key concepts tagged ['Change'].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept |  | Aggregate demand and AD curve | 36 | COVERED | MIND_MAPS 21, EES_MODELS 8, CHAINS 7, GLOSS 6, DEFS 6, EES_TOPICS 6 |
| Concept |  | Components of AD: C + I + G + (X - M) | 36 | COVERED | MIND_MAPS 4, GLOSS 1, DEFS 1, CONCEPTS 1, EES_MODELS 1, CALC 1 |
| Concept |  | Determinants of consumption (confidence, interest, wealth, taxes, indebtedness, expectations) | 36 | COVERED | MIND_MAPS 1, EES_TOPICS 1, TOPICS 1, EEQ 1, CHAINS 1, TOKHERO 1 |
| Concept |  | Determinants of investment (interest, business confidence, technology, taxes, corporate debt) | 36 | COVERED | MIND_MAPS 2, POLICIES 1, P2SETS 1 |
| Concept |  | Determinants of net exports (partner incomes, exchange rates, trade policy) | 36 | COVERED | MIND_MAPS 21, CHAINS 4, CONCEPTS 3, EEQ 3, RW_CASES 2, RW_DEEP 2 |
| Concept |  | SRAS and determinants (factor costs, indirect taxes) | 36 | COVERED | MIND_MAPS 30, RW_CASES 12, CONCEPTS 4, DGTEXT 4, QB 4, GLOSS 3 |
| Concept |  | Monetarist/new classical LRAS | 37 | COVERED | MIND_MAPS 4, CONCEPTS 4, GLOSS 2, MODELS 2, EES_MODELS 2, TOPICS 2 |
| Concept |  | Keynesian AS curve | 37 | COVERED | CONCEPTS 3, QB 2, MODELS 1, POLICIES 1, EES_MODELS 1, DGTEXT 1 |
| Concept |  | Inflationary and deflationary/recessionary gaps | 37 | COVERED | MIND_MAPS 10, DGTEXT 4, RW_CASES 3, GLOSS 2, TOPICS 2, BUILDS 2 |
| Concept |  | LRAS shifts: quantity/quality of FOPs, technology, efficiency, institutions | 37 | COVERED | RW_CASES 6, MIND_MAPS 2, EEQ 2, EES_MODELS 1, EES_TOPICS 1, DGTEXT 1 |
| Concept |  | Automatic adjustment to full employment; natural rate of unemployment at LR equilibrium | 37 | COVERED | MODELS 1, DGTEXT 1, RW_CASES 1, WHATIF 1, DECIDE 1 |
| Concept |  | Keynesian persistence of deflationary gaps | 37 | COVERED | RW_CASES 2, CONCEPTS 1, EES_MODELS 1, EES_TOPICS 1, P1TASKS 1, P3CASES 1 |
| Concept |  | Assumptions and implications of monetarist vs Keynesian models | 37 | COVERED | MIND_MAPS 3, CONCEPTS 2, VIDEO_LIBRARY 2, MODELS 1, EES_MODELS 1, TOPICS 1 |
| Diagram |  | AD curve | 36 | COVERED | "adas" |
| Diagram |  | Shifts of the AD curve | 36 | COVERED | "defgap", "infgap" |
| Diagram |  | SRAS curve | 36 | COVERED | "adas" |
| Diagram |  | Shifts of the SRAS curve | 37 | COVERED | "costpush" |
| Diagram |  | Alternative views of the AS curve | 37 | COVERED | "adas" (vertical LRAS, monetarist/new classical) and "lras" (Keynesian AS) |
| Diagram |  | Shifts of the LRAS or Keynesian AS | 37 | COVERED | "growth" (LRAS shift); a Keynesian AS shift is not drawn |
| Diagram |  | Macroeconomic equilibrium in the short run and long run | 37 | COVERED | "adas", "infgap" note on adjustment, "defgap" |

### 3.3 Macroeconomic objectives (guide p. 37–39): PARTIALLY COVERED

Linked objects: diagrams ['labour', 'growth', 'phillips', 'costpush']; calculators ['growth', 'infl', 'unemp', 'wpi']; mind maps ['inflation', 'unemployment', 'syn-growthdev', 'syn-growthineq', 'syn-growthsust', 'policy']; models ['ees:lab', 'ees:infl', 'ees:growth']; policies —; concept cards ['c-inf', 'c-phil']; key concepts tagged ['Scarcity', 'Choice', 'Economic well-being', 'Sustainability'].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept |  | Short-term vs long-term growth | 37 | COVERED | MIND_MAPS 8, GLOSS 3, EES_MODELS 3, DEFS 1, EES_TOPICS 1, DGTEXT 1 |
| Concept |  | Measurement of economic growth | 37 | COVERED | MIND_MAPS 10, CALC 3, EEQ 2, TRAPS 2, DETECTIVE 1, TOKCLAIMS 1 |
| Concept |  | Consequences of growth: living standards, environment, income distribution | 37 | COVERED | MIND_MAPS 27, EEQ 5, RW_CASES 5, EES_MODELS 4, CONCEPTS 2, MODELS 2 |
| Concept |  | Unemployment measurement and rate | 38 | COVERED | MIND_MAPS 11, EEQ 3, P3CASES 3, GLOSS 2, EES_MODELS 2, EES_TOPICS 2 |
| Concept |  | Difficulties of measuring unemployment (hidden, underemployment) | 38 | COVERED | EES_MODELS 5, MIND_MAPS 4, CALC 2, EEQ 2, RW_CASES 2, TOKDOM 2 |
| Concept |  | Causes: cyclical, structural, seasonal, frictional | 38 | COVERED | EEQ 13, MIND_MAPS 8, RW_CASES 5, CHAINS 5, GLOSS 3, DEFS 3 |
| Concept |  | Natural rate of unemployment | 38 | COVERED | GLOSS 2, CONCEPTS 2, DGTEXT 2, DGQ 2, DEFS 1, MIND_MAPS 1 |
| Concept |  | Costs of unemployment (personal, social, economic) | 38 | PARTIALLY COVERED | one mind-map node ("Costs of unemployment: personal, social, economic") plus GLOSS/DEFS unemployment types |
| Concept |  | Measuring inflation with CPI; limitations of CPI | 38 | COVERED | MIND_MAPS 8, EEQ 6, EES_TOPICS 5, RW_CASES 5, EES_MODELS 4, RW_DEEP 3 |
| Concept |  | Demand-pull and cost-push inflation | 38 | COVERED | MIND_MAPS 24, RW_DEEP 11, RW_CASES 9, EEQ 5, EES_MODELS 4, EES_TOPICS 4 |
| Concept |  | Costs of high inflation | 38 | COVERED | MIND_MAPS 2, EEQ 1, KCX 1, QB 1 |
| Concept |  | Causes of deflation; disinflation vs deflation | 38 | COVERED | MIND_MAPS 9, RW_CASES 6, RW_DEEP 4, GLOSS 2, DEFS 2, CONCEPTS 2 |
| Concept |  | Costs of deflation (deferred consumption, real debt burden) | 38 | PARTIALLY COVERED | mind-map node "Costs of deflation" and RW deflation cases |
| Concept |  | Relative costs of unemployment vs inflation | 38 | PARTIALLY COVERED | RW cases and a video only; no teaching node |
| Concept | HL | Government (national) debt as % of GDP; deficit-debt relationship | 38 | COVERED | P2SETS 7, MIND_MAPS 4, EES_TOPICS 4, P3CASES 3, QB 3, GLOSS 2 |
| Concept | HL | Costs of high government debt: debt servicing, credit ratings, future taxation | 38 | COVERED | DECIDE 2, MIND_MAPS 1, POLICIES 1, RW 1, CHAINS 1 |
| Concept |  | Conflict: low unemployment vs low inflation | 38 | COVERED | MIND_MAPS 32, RW_CASES 29, RW_DEEP 8, CONCEPTS 5, QB 5, CHAINS 3 |
| Concept | HL | Short-run and long-run Phillips curve | 38 | COVERED | RW_CASES 7, MIND_MAPS 6, DGTEXT 3, TOKMOD 3, DGQ 2, GLOSS 1 |
| Concept |  | Conflict: growth vs inflation, growth vs sustainability, growth vs equity | 39 | COVERED | MIND_MAPS 23, RW_CASES 19, RW_DEEP 3, P1TASKS 3, EEQ 1, KCX 1 |
| Diagram |  | PPC model showing actual growth and growth in production possibilities | 37 | COVERED | "ppc" |
| Diagram |  | AD increases showing increases in real output | 37 | COVERED | "lras" (Keynesian ranges), "infgap" |
| Diagram |  | LRAS increases showing increases in full employment output | 37 | COVERED | "growth" |
| Diagram |  | Minimum wage to show unemployment | 38 | COVERED | "labour" |
| Diagram |  | Fall in the demand for labour for a particular market or geographical area (structural unemployment) | 38 | MISSING | no diagram ("labour" shows only a wage floor) |
| Diagram |  | Deflationary gap to show cyclical unemployment | 38 | COVERED | "defgap" |
| Diagram |  | Demand-pull inflation | 38 | COVERED | "infgap" |
| Diagram |  | Cost-push inflation | 38 | COVERED | "costpush" |
| Diagram |  | Deflation | 38 | COVERED | "defgap" (AD fall lowers price level) and "growth" (supply-driven fall in price level) |
| Diagram | HL | AD/AS curves (inflation/unemployment trade-off) | 38 | COVERED | "infgap", "defgap" |
| Diagram | HL | Phillips curve short-run and long-run | 38 | COVERED | "phillips" |
| Calculation |  | Rate of economic growth from data | 37 | COVERED | CALC "growth" |
| Calculation |  | Unemployment rate from data | 38 | COVERED | CALC "unemp" |
| Calculation | HL | Weighted price index from data | 38 | COVERED | CALC "wpi"; CPI basket builder tool |
| Calculation |  | Inflation rate from data using quantities purchased as weights in the CPI | 38 | COVERED | CALC "infl" + "wpi"; CPI basket builder; DATA d4 |

### 3.4 Economics of inequality and poverty (guide p. 39–40): PARTIALLY COVERED

Linked objects: diagrams ['lorenz']; calculators ['avgtax', 'indtax']; mind maps ['inequality', 'syn-growthineq', 'syn-effeq', 'policy', 'develop']; models ['ineq', 'ees:ineq']; policies ['transfer']; concept cards ['c-gini']; key concepts tagged ['Equity', 'Economic well-being'].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept |  | Equality vs equity | 39 | COVERED | MIND_MAPS 8, RW_CASES 3, KCX 2, MISC 2, POLICIES 1, EES_TOPICS 1 |
| Concept |  | Income vs wealth inequality | 39 | COVERED | EES_TOPICS 2, MODELS 1, EES_MODELS 1 |
| Concept |  | Lorenz curve and Gini coefficient | 39 | COVERED | MIND_MAPS 38, CONCEPTS 7, MISC 6, MODELS 5, EES_MODELS 5, EES_TOPICS 4 |
| Concept |  | Absolute vs relative poverty | 39 | COVERED | MIND_MAPS 13, P1TASKS 4, GLOSS 2, EES_TOPICS 2, DGQ 1, TOKCLAIMS 1 |
| Concept |  | International poverty lines | 39 | COVERED | RW_DEEP 7, MIND_MAPS 1, RW_CASES 1 |
| Concept |  | Minimum income standards | 39 | PARTIALLY COVERED | named in one mind-map node only |
| Concept |  | Multidimensional Poverty Index (MPI) | 39 | COVERED | MIND_MAPS 7, RW_CASES 6, EES_MODELS 2, EES_TOPICS 2, GLOSS 1, RW_DEEP 1 |
| Concept |  | Difficulties in measuring poverty | 39 | PARTIALLY COVERED | mind-map poverty nodes cover absolute vs relative lines; no treatment of the measurement difficulties the guide lists |
| Concept |  | Causes of inequality/poverty (opportunity, resources, human capital, discrimination, power, tax, globalisation/technology, market-based SSP) | 39 | COVERED | EEQ 4, MIND_MAPS 3, EES_MODELS 2, EES_TOPICS 2, CONCEPTS 1, RW_CASES 1 |
| Concept |  | Impact of inequality on growth, living standards, social stability | 39 | COVERED | MIND_MAPS 9, RW_CASES 2, RW_DEEP 2, EES_MODELS 1, EEQ 1, P1TASKS 1 |
| Concept |  | Progressive, regressive, proportional taxes | 40 | COVERED | MIND_MAPS 8, POLICIES 5, RW_CASES 5, GLOSS 3, RW_DEEP 3, EEQ 2 |
| Concept |  | Average and marginal tax rates | 40 | COVERED | CALC 2, NEWCALC 2, GLOSS 1, DEBATES 1 |
| Concept |  | Direct taxes: personal income, corporate, wealth | 40 | COVERED | MIND_MAPS 38, RW_CASES 7, TOPICS 6, GLOSS 5, EES_TOPICS 4, CALC 4 |
| Concept |  | Transfer payments | 40 | COVERED | MIND_MAPS 3, GLOSS 1, POLICIES 1, CALC 1, NEWCALC 1, KCX 1 |
| Concept |  | Targeted spending on goods and services | 40 | COVERED | RW_DEEP 7, RW_CASES 5, CHAINS 4, DECIDE 2, POLICIES 1, RW 1 |
| Concept |  | Universal basic income | 40 | COVERED | GLOSS 1, DEBATES 1 |
| Concept |  | Policies to reduce discrimination | 40 | MISSING | discrimination appears only as a cause of inequality; no policy content |
| Concept |  | Minimum wages (as redistribution) | 40 | COVERED | EEQ 16, MIND_MAPS 10, EES_MODELS 8, RW 7, EES_TOPICS 6, CHAINS 6 |
| Concept |  | Investment in human capital / equality of opportunity | 40 | COVERED | RW_CASES 12, MIND_MAPS 3, EES_TOPICS 3, EEQ 3, EES_MODELS 2, MODELS 1 |
| Diagram |  | Lorenz curve showing income distribution and changes in it | 39 | COVERED | "lorenz"; Lorenz curve builder tool |
| Calculation | HL | HL (construction): Lorenz curve from income quintile data | 39 | COVERED | Lorenz curve builder tool; DATA d7 |
| Calculation | HL | Indirect tax paid from a given expenditure and rate | 40 | COVERED | CALC "indtax" |
| Calculation | HL | Total tax and average tax rates from data | 40 | COVERED | CALC "avgtax" |

### 3.5 Demand management (demand-side policies)—monetary policy (guide p. 41–42): PARTIALLY COVERED

Linked objects: diagrams —; calculators ['realint']; mind maps ['monpol', 'syn-intrate', 'policy']; models —; policies ['monetary']; concept cards ['c-mon']; key concepts tagged ['Intervention'].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept |  | Monetary policy; central bank control of money supply and interest rates | 41 | COVERED | RW_CASES 41, MIND_MAPS 20, QB 6, EES_TOPICS 5, CONDITIONS 4, RW_DEEP 4 |
| Concept |  | Goals incl. inflation targeting | 41 | COVERED | RW_CASES 12, EEQ 4, POLICIES 1, EES_TOPICS 1, CHAINS 1, MEMOCASES 1 |
| Concept | HL | Money creation by commercial banks | 41 | MISSING | not found outside the syllabus checklist (SUBMETA) |
| Concept | HL | Open market operations | 41 | PARTIALLY COVERED | listed in one mind-map node ("Tools") with the other three tools; no explanation |
| Concept | HL | Minimum reserve requirements | 41 | PARTIALLY COVERED | listed in the same mind-map "Tools" node; one QB guidance line |
| Concept | HL | Changes in central bank minimum lending rate | 41 | COVERED | MIND_MAPS 41, EES_TOPICS 6, EEQ 6, RW_DEEP 4, EES_MODELS 3, CASES 3 |
| Concept | HL | Quantitative easing | 41 | COVERED | RW_CASES 6, MIND_MAPS 2, GLOSS 1, EES_TOPICS 1, EEQ 1, DGQ 1 |
| Concept | HL | Demand and supply of money; equilibrium interest rate | 41 | COVERED | MIND_MAPS 2, EES_TOPICS 1, P1TASKS 1 |
| Concept |  | Real vs nominal interest rates | 42 | COVERED | MIND_MAPS 3, CALC 2, NEWCALC 2, RW_DEEP 2, GLOSS 1, EEQ 1 |
| Concept |  | Expansionary/contractionary monetary policy to close gaps | 42 | COVERED | MIND_MAPS 4, RW_DEEP 2, RW_CASES 1, TOKCLAIMS 1 |
| Concept |  | Constraints: zero lower bound, low confidence | 42 | COVERED | RW_CASES 4, QB 3, P2SETS 2, EEQ 1 |
| Concept |  | Strengths: incremental, reversible, short time lags | 42 | COVERED | RW_DEEP 6, MIND_MAPS 4, POLICIES 1, EES_MODELS 1, P3CASES 1, TOKQ 1 |
| Diagram | HL | Determination of equilibrium interest rates (money market) | 41 | MISSING | no diagram (mind-map node "The money market" only) |
| Diagram |  | AD/AS curves showing expansionary and contractionary monetary policy | 42 | COVERED | AD/AS family ("adas", "defgap", "infgap"); POLICIES "monetary" links to "adas" |
| Calculation |  | Real interest rates from data | 42 | COVERED | CALC "realint" |

### 3.6 Demand management—fiscal policy (guide p. 42–43): PARTIALLY COVERED

Linked objects: diagrams ['multiplier']; calculators ['mult']; mind maps ['fiscal', 'syn-scarcity', 'policy']; models ['mult', 'ees:fisc']; policies ['fiscal']; concept cards ['c-mult']; key concepts tagged ['Interdependence', 'Intervention'].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept |  | Fiscal policy; sources of revenue | 42 | COVERED | RW_CASES 53, MIND_MAPS 17, QB 6, EES_TOPICS 3, DRILLS 3, WRITING 3 |
| Concept |  | Government expenditure: current, capital, transfer payments | 42 | COVERED | MIND_MAPS 3, GLOSS 1, POLICIES 1, EES_TOPICS 1, CALC 1, NEWCALC 1 |
| Concept |  | Revenue: SOE sales, sale of government assets | 42 | COVERED | MIND_MAPS 1, MEMOCASES 1 |
| Concept |  | Expansionary/contractionary fiscal policy (Keynesian and monetarist views) | 42 | COVERED | mind map "fiscal" (Closing a gap), BUILDS "deflationary gap closed by fiscal expansion", P3/QB/DECIDE items, lras + infgap diagrams |
| Concept | HL | Keynesian multiplier 1/(1-MPC), 1/(MPS+MPT+MPM) | 42 | COVERED | MIND_MAPS 29, CHAINS 15, RW_CASES 11, EES_MODELS 6, CONCEPTS 5, REPAIRS 5 |
| Concept |  | Constraints: political pressure, time lags, sustainable debt | 43 | COVERED | MIND_MAPS 2, EES_TOPICS 2, EEQ 2, CONCEPTS 1, EES_MODELS 1, RW_DEEP 1 |
| Concept | HL | Crowding out | 43 | COVERED | RW_CASES 12, MIND_MAPS 4, POLICIES 2, EES_MODELS 2, CHAINS 2, QB 2 |
| Concept |  | Strengths: sector targeting; effective in deep recession | 43 | COVERED | RW_CASES 7, CHAINS 3, MIND_MAPS 2, POLICIES 1, CONDITIONS 1, WRITING 1 |
| Concept | HL | Automatic stabilizers | 43 | COVERED | RW_CASES 4, MIND_MAPS 2, QB 2, GLOSS 1, DEFS 1, EES_MODELS 1 |
| Diagram |  | AD/AS showing expansionary and contractionary fiscal policy (Keynesian and monetarist/new classical) | 42 | COVERED | "lras" (Keynesian), "infgap"/"defgap" (vertical LRAS); BUILDS fiscal expansion |
| Diagram | HL | Crowding-out effect | 43 | MISSING | no diagram (text in mind map "fiscal", GLOSS) |
| Calculation | HL | Keynesian multiplier | 42 | COVERED | CALC "mult"; multiplier lab; DATA d3 |
| Calculation | HL | Effect on GDP of a change in an injection using the multiplier | 42 | COVERED | CALC "mult" (input: injection) |

### 3.7 Supply-side policies (guide p. 43–44): COVERED

Linked objects: diagrams —; calculators —; mind maps ['supplyside', 'policy']; models —; policies ['supplyside']; concept cards ['c-supp']; key concepts tagged ['Choice', 'Efficiency'].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept |  | Goals of supply-side policies | 43 | COVERED | MIND_MAPS 16, RW_CASES 8, P1TASKS 5, RW_DEEP 3, CONCEPTS 2, EEQ 2 |
| Concept |  | Market-based: deregulation, privatization, trade liberalization, anti-monopoly | 43 | COVERED | MIND_MAPS 5, RW_CASES 3, CASES 2, POLICIES 1, RW_DEEP 1, TOKCAUSE 1 |
| Concept |  | Labour market policies: union power, unemployment benefits, minimum wage abolition | 43 | COVERED | MIND_MAPS 2, GLOSS 1, EES_TOPICS 1, RW_CASES 1, CHAINS 1 |
| Concept |  | Incentive-related: income tax cuts, business and capital gains tax cuts | 44 | COVERED | RW_CASES 9, MIND_MAPS 8, CONCEPTS 2, EES_TOPICS 1 |
| Concept |  | Interventionist: education/training, health, R&D, infrastructure, industrial policy | 44 | COVERED | RW_CASES 27, MIND_MAPS 11, RW_DEEP 7, EES_TOPICS 5, CHAINS 4, CONCEPTS 3 |
| Concept |  | Demand-side effects of supply-side policies / supply-side effects of fiscal policy | 44 | COVERED | MIND_MAPS 2, RW_DEEP 1, CHAINS 1, BUILDS 1 |
| Concept |  | Effectiveness: equity issues, time lags, vested interests, environment, costs | 44 | COVERED | MIND_MAPS 2, CONCEPTS 1 |
| Diagram |  | AD/AS model and LRAS showing effect of supply-side policies | 43 | COVERED | "growth" |
| Diagram |  | Minimum wage | 43 | COVERED | "labour" |

### 4.1 Benefits of international trade (guide p. 45–46): PARTIALLY COVERED

Linked objects: diagrams ['compadv']; calculators ['compadv', 'tradeflow']; mind maps ['compadv2', 'global']; models ['ees:cadv']; policies —; concept cards ['c-cadv']; key concepts tagged ['Efficiency'].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept |  | Benefits of international trade | 45 | COVERED | EEQ 5, MIND_MAPS 4, EES_MODELS 1, C60 1, CONDITIONS 1, KCX 1 |
| Concept | HL | Absolute advantage | 45 | COVERED | EEQ 5, MIND_MAPS 4, C60 3, CONCEPTS 2, MISC 2, DRILLS 2 |
| Concept | HL | Comparative advantage; gains from trade; sources | 45 | COVERED | MIND_MAPS 17, RW_CASES 12, EEQ 9, C60 7, CONCEPTS 4, EES_MODELS 3 |
| Concept | HL | Limitations of the theory of comparative advantage | 46 | COVERED | MIND_MAPS 3, EES_MODELS 2, CONCEPTS 1, EEQ 1, TOKLENS 1, TOKMOD 1 |
| Diagram |  | Free trade: exports when world price is above domestic price | 45 | MISSING | no diagram |
| Diagram |  | Free trade: imports when world price is below domestic price | 45 | PARTIALLY COVERED | free-trade import position appears only as the pre-tariff state inside "tariff"/"quota" |
| Diagram | HL | Linear PPC showing differing opportunity costs and gains from specialisation and trade | 45 | COVERED | "compadv"; comparative advantage game tool |
| Calculation | HL | From a diagram, quantity of exports/imports, import expenditure, export revenue | 45 | COVERED | CALC "tradeflow" |
| Calculation | HL | Opportunity costs from data to identify comparative advantage | 45 | COVERED | CALC "compadv"; comparative advantage game |

### 4.2 Types of trade protection (guide p. 46): PARTIALLY COVERED

Linked objects: diagrams ['tariff', 'quota']; calculators ['tariffrev', 'quotaeff']; mind maps ['protection', 'global']; models ['trade', 'ees:trade']; policies ['tariff', 'quota', 'exportsub']; concept cards ['c-prot']; key concepts tagged ['Intervention'].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept |  | Tariffs: effects on markets and stakeholders | 46 | COVERED | MIND_MAPS 67, RW_CASES 65, RW_DEEP 50, CHAINS 16, BUILDS 12, POLICIES 11 |
| Concept |  | Quotas | 46 | COVERED | MIND_MAPS 33, RW_CASES 22, CALC 13, NEWCALC 11, QB 6, DGTEXT 5 |
| Concept |  | Production / export subsidies | 46 | COVERED | MIND_MAPS 3, POLICIES 2, DGTEXT 1, RW_CASES 1, RW_DEEP 1, DRILLS 1 |
| Concept |  | Administrative barriers: standards and regulations | 46 | COVERED | MIND_MAPS 4, RW_CASES 4, RW_DEEP 3 |
| Diagram |  | Tariff: effects on price, production, consumption, expenditures, revenues, welfare | 46 | COVERED | "tariff" |
| Diagram |  | Quota: same effects | 46 | COVERED | "quota" |
| Diagram |  | Subsidy/export subsidy: same effects (world-price diagram) | 46 | PARTIALLY COVERED | only the closed-market "subsidy" diagram; POLICIES "exportsub" points to it |
| Calculation | HL | From a diagram, effects on stakeholders of tariffs | 46 | PARTIALLY COVERED | CALC "tariffrev" covers government revenue only; consumer/producer/welfare effects are worked only in the "tariff" diagram text |
| Calculation | HL | From a diagram, effects on stakeholders of quotas | 46 | COVERED | CALC "quotaeff" |
| Calculation | HL | From a diagram, effects on stakeholders of (export) subsidies | 46 | PARTIALLY COVERED | only the domestic-market "subcost" calculator (2.7); no trade-subsidy calculator |

### 4.3 Arguments for and against trade control/protection (guide p. 46–47): COVERED

Linked objects: diagrams —; calculators —; mind maps ['protection', 'global']; models —; policies —; concept cards —; key concepts tagged [].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept |  | Infant (sunrise) industry argument | 46 | COVERED | MIND_MAPS 4, P1TASKS 2, QB 2, GLOSS 1, POLICIES 1, EES_MODELS 1 |
| Concept |  | National security; health and safety; environmental standards | 46 | COVERED | RW_CASES 4, MIND_MAPS 2 |
| Concept |  | Anti-dumping; unfair competition | 46 | COVERED | RW_CASES 4, MIND_MAPS 2, DEFS 1, EES_TOPICS 1, CASES 1 |
| Concept |  | Balance of payments correction; government revenue; protection of jobs | 46 | COVERED | MIND_MAPS 2, RW_CASES 2, POLICIES 1, EES_TOPICS 1, P1TASKS 1 |
| Concept |  | ELDC diversification | 46 | COVERED | RW_CASES 22, EES_TOPICS 3, RW_DEEP 3, MIND_MAPS 2, P2SETS 2, QB 2 |
| Concept |  | Arguments against: misallocation, retaliation, higher prices, less choice, inefficiency, reduced export competitiveness | 47 | COVERED | RW_DEEP 7, RW_CASES 6, MIND_MAPS 5, CONDITIONS 3, CASES 3, MODELS 2 |
| Concept |  | Free trade versus protection | 47 | COVERED | GLOSS 2, EES_TOPICS 2, RW_CASES 2, RW_DEEP 2, DEFS 1, MIND_MAPS 1 |

### 4.4 Economic integration (guide p. 47–48): PARTIALLY COVERED

Linked objects: diagrams —; calculators —; mind maps ['global']; models —; policies ['integration']; concept cards —; key concepts tagged ['Interdependence'].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept |  | Preferential trade agreements: bilateral, regional, multilateral | 47 | COVERED | RW_CASES 10, MIND_MAPS 2, RW_DEEP 2, GLOSS 1, DEBATES 1 |
| Concept |  | Trading blocs: FTA, customs union, common market | 47 | COVERED | RW_CASES 11, RW_DEEP 8, GLOSS 4, EES_TOPICS 4, MIND_MAPS 3, DEFS 2 |
| Concept | HL | Trade creation | 47 | COVERED | RW_CASES 8, RW_DEEP 3, EES_TOPICS 2, GLOSS 1, MIND_MAPS 1, POLICIES 1 |
| Concept | HL | Trade diversion | 47 | COVERED | EES_TOPICS 3, RW_CASES 3, GLOSS 2, MIND_MAPS 1, POLICIES 1 |
| Concept |  | Advantages: economies of scale, labour mobility, bargaining power, political stability | 47 | COVERED | MIND_MAPS 1, EES_MODELS 1, RW_CASES 1, DEBATES 1 |
| Concept |  | Disadvantages: loss of sovereignty, challenge to multilateral negotiations | 47 | COVERED | RW_DEEP 4, RW_CASES 2, POLICIES 1 |
| Concept |  | Monetary union | 47 | COVERED | RW_CASES 13, GLOSS 2, MIND_MAPS 1, POLICIES 1, EES_TOPICS 1, KCX 1 |
| Concept | HL | Advantages and disadvantages of monetary union | 47 | PARTIALLY COVERED | monetary union is defined and appears in RW eurozone cases; the HL advantages/disadvantages evaluation is not set out |
| Concept |  | WTO objectives and functions | 47 | COVERED | RW_CASES 10, MIND_MAPS 6, EEQ 3, CASES 2, RW 2, GLOSS 1 |
| Concept |  | Factors affecting WTO influence (services/primary products, unequal bargaining power) | 48 | PARTIALLY COVERED | WTO covered in GLOSS/mind map "global"; the influence factors appear only in CASES/RW cases |

### 4.5 Exchange rates (guide p. 48–49): PARTIALLY COVERED

Linked objects: diagrams ['fx']; calculators ['fx', 'appdep']; mind maps ['fx2', 'syn-intrate', 'syn-fxtrade', 'global']; models ['fx', 'ees:fx']; policies ['fx']; concept cards ['c-fx']; key concepts tagged ['Change'].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept |  | Floating exchange rates; depreciation and appreciation | 48 | COVERED | MIND_MAPS 42, RW_CASES 11, RW_DEEP 11, TOPICS 10, EEQ 10, CHAINS 9 |
| Concept |  | Factors changing currency demand/supply (FDI, portfolio, remittances, speculation, inflation, interest, growth, central bank) | 48 | COVERED | RW_CASES 14, MIND_MAPS 6, RW_DEEP 6, EES_TOPICS 4, P2SETS 3, GLOSS 2 |
| Concept |  | Consequences of exchange rate changes (inflation, growth, unemployment, current account, living standards) | 48 | COVERED | MIND_MAPS 16, RW_CASES 7, RW_DEEP 6, TOPICS 4, MODELS 2, EES_MODELS 2 |
| Concept |  | Fixed exchange rate; devaluation and revaluation; how maintained | 48 | COVERED | RW_CASES 24, MIND_MAPS 7, GLOSS 5, P3CASES 5, EEQ 3, CONDITIONS 2 |
| Concept |  | Managed exchange rates; overvalued and undervalued currencies | 48 | COVERED | RW_CASES 7, EES_TOPICS 2, RW_DEEP 2, P3CASES 1, DEBATES 1 |
| Concept | HL | Fixed versus floating systems | 49 | COVERED | GLOSS 2, MIND_MAPS 1, RW_CASES 1 |
| Diagram |  | Exchange rate determination and changes in equilibrium, floating system | 48 | COVERED | "fx"; exchange rate lab tool |
| Diagram |  | AD/AS curves showing consequences of exchange rate changes | 48 | PARTIALLY COVERED | no dedicated diagram; generic AD/AS diagrams, used together with "fx" in P2/P3 sets |
| Diagram |  | How a fixed exchange rate is maintained | 48 | MISSING | no diagram (text only; exchange rate lab is floating only) |
| Diagram |  | Exchange rate determination under a managed exchange rate system | 49 | MISSING | no diagram |
| Calculation |  | Price of a good in different currencies using exchange rates | 48 | COVERED | CALC "fx" |
| Calculation |  | Changes in the value of a currency from data | 48 | COVERED | CALC "appdep" |

### 4.6 Balance of payments (guide p. 49–50): PARTIALLY COVERED

Linked objects: diagrams ['bop']; calculators ['ca']; mind maps ['bop', 'syn-fxtrade', 'global']; models —; policies —; concept cards ['c-ca']; key concepts tagged ['Interdependence'].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept |  | Balance of payments; credit and debit items | 49 | COVERED | RW_CASES 15, MIND_MAPS 12, GLOSS 5, EES_MODELS 2, DGTEXT 2, DSETS 2 |
| Concept |  | Current account components (goods, services, income, current transfers) | 49 | COVERED | MIND_MAPS 44, GLOSS 6, EES_MODELS 6, EES_TOPICS 5, P3CASES 5, DATA 5 |
| Concept |  | Capital account (capital transfers, non-produced non-financial assets) | 49 | COVERED | GLOSS 2, EES_MODELS 1, DGTEXT 1, RW_CASES 1 |
| Concept |  | Financial account (FDI, portfolio, reserve assets, official borrowing) | 49 | COVERED | MIND_MAPS 24, GLOSS 5, DETECTIVE 2, CONCEPTS 1, EES_MODELS 1, EES_TOPICS 1 |
| Concept |  | Interdependence between accounts; BoP sums to zero | 49 | COVERED | DSETS 2, EES_MODELS 1, EES_TOPICS 1, DGTEXT 1 |
| Concept | HL | Current account and exchange rate relationship | 49 | COVERED | MIND_MAPS 7, EES_MODELS 2, POLICIES 1, EES_TOPICS 1, TOPICS 1, RW_CASES 1 |
| Concept | HL | Financial account and exchange rate relationship | 49 | COVERED | MIND_MAPS 6, RW_CASES 3, EES_MODELS 1, EES_TOPICS 1, TOPICS 1, P3CASES 1 |
| Concept | HL | Implications of persistent current account deficit | 49 | COVERED | MIND_MAPS 16, EES_MODELS 4, EES_TOPICS 3, P3CASES 3, CONCEPTS 2, DETECTIVE 2 |
| Concept | HL | Expenditure switching and expenditure reducing | 50 | COVERED | GLOSS 2, MIND_MAPS 2, EES_MODELS 2 |
| Concept | HL | Marshall-Lerner condition | 50 | COVERED | MIND_MAPS 8, RW_DEEP 5, EEQ 4, EES_MODELS 3, GLOSS 2, CONCEPTS 2 |
| Concept | HL | J-curve effect | 50 | COVERED | MIND_MAPS 8, RW_DEEP 7, EES_MODELS 4, RW_CASES 3, EES_TOPICS 2, EEQ 2 |
| Concept | HL | Implications of persistent current account surplus | 50 | PARTIALLY COVERED | one mind-map node ("A persistent surplus" in mind map "bop"); no glossary or case support |
| Diagram | HL | Exchange rate diagram showing current account balance and exchange rate relationship | 49 | PARTIALLY COVERED | "fx" demand shift from exports (FXSHIFTS) can be read this way; not presented as a current account diagram |
| Diagram | HL | J-curve with reference to the Marshall-Lerner condition | 50 | MISSING | no diagram (text in mind maps "bop"/"global", EES "fx", P3 "velisk") |
| Calculation |  | Elements of the balance of payments from data | 49 | COVERED | CALC "ca"; BoP ledger tool; DATA d5 |

### 4.7 Sustainable development (guide p. 51): COVERED

Linked objects: diagrams —; calculators —; mind maps ['development', 'syn-extsust', 'syn-growthsust', 'develop']; models —; policies —; concept cards —; key concepts tagged ['Scarcity', 'Economic well-being', 'Sustainability'].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept |  | Meaning of sustainable development | 51 | COVERED | MIND_MAPS 5, GLOSS 1, DEFS 1, EES_TOPICS 1, KCX 1, RW_CASES 1 |
| Concept |  | Sustainable Development Goals | 51 | COVERED | MIND_MAPS 3, RW_CASES 3, KCX 1 |
| Concept | HL | Relationship between sustainability and poverty | 51 | COVERED | RW_CASES 6, RW_DEEP 5, MIND_MAPS 2, KCX 1 |

### 4.8 Measuring development (guide p. 51): PARTIALLY COVERED

Linked objects: diagrams —; calculators —; mind maps ['development', 'syn-growthdev', 'develop']; models ['dev']; policies —; concept cards ['c-dev']; key concepts tagged ['Equity', 'Economic well-being'].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept |  | Multidimensional nature of development | 51 | COVERED | MIND_MAPS 7, RW_CASES 6, EES_TOPICS 4, EES_MODELS 3, GLOSS 2, RW_DEEP 2 |
| Concept |  | Single indicators: GDP/GNI per capita PPP, health, education, inequality, energy, environment | 51 | COVERED | MIND_MAPS 7, EES_TOPICS 6, P2SETS 5, EES_MODELS 3, DETECTIVE 3, EDU_MODULES 2 |
| Concept |  | Human Development Index (HDI) | 51 | COVERED | MIND_MAPS 21, DETECTIVE 7, EEQ 6, RW_CASES 4, EES_MODELS 3, EES_TOPICS 3 |
| Concept |  | Gender Inequality Index (GII) | 51 | PARTIALLY COVERED | only a generic "gender indices" phrase in a mind-map node; the GII is not named or explained |
| Concept |  | Inequality-adjusted HDI (IHDI) | 51 | COVERED | DETECTIVE 2, MIND_MAPS 1, EES_TOPICS 1, DEBATES 1 |
| Concept |  | Happy Planet Index | 51 | PARTIALLY COVERED | MIND_MAPS 1 |
| Concept |  | Strengths/limitations of development measures | 51 | COVERED | MIND_MAPS 14, MODELS 1, TOKQ 1, TOKRWI 1, TOKLENS 1, TOKDOM 1 |
| Concept |  | Relationship between growth and development | 51 | COVERED | MIND_MAPS 11, RW_CASES 2, MISC 2, CONCEPTS 1, MODELS 1, EES_MODELS 1 |

### 4.9 Barriers to economic growth and/or economic development (guide p. 51–52): PARTIALLY COVERED

Linked objects: diagrams —; calculators —; mind maps ['develop']; models —; policies —; concept cards —; key concepts tagged ['Equity', 'Sustainability'].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept |  | Poverty traps / poverty cycles | 51 | COVERED | RW_CASES 5, MIND_MAPS 3, DEFS 1, EES_TOPICS 1, EEQ 1, CASES 1 |
| Concept |  | Rising economic inequality as barrier | 51 | COVERED | MIND_MAPS 50, RW_CASES 22, EES_TOPICS 16, RW_DEEP 8, EES_MODELS 5, DEFS 4 |
| Concept |  | Lack of infrastructure and appropriate technology | 52 | COVERED | RW_CASES 15, MIND_MAPS 9, EES_TOPICS 5, CHAINS 4, CONCEPTS 3, RW_DEEP 3 |
| Concept |  | Low human capital: health care and education access | 52 | COVERED | RW_CASES 12, MIND_MAPS 3, EES_TOPICS 3, EEQ 3, EES_MODELS 2, MODELS 1 |
| Concept |  | Dependence on primary sector | 52 | COVERED | MIND_MAPS 4, EES_MODELS 1, CASES 1, RW 1, DEBATES 1, TRANSFER 1 |
| Concept |  | Lack of access to international markets | 52 | PARTIALLY COVERED | one line in MODELS "dev" |
| Concept |  | Informal economy | 52 | COVERED | RW_CASES 8, RW_DEEP 8, MIND_MAPS 4, P2SETS 3, EES_MODELS 2, P1TASKS 2 |
| Concept |  | Capital flight | 52 | COVERED | RW_CASES 2, GLOSS 1 |
| Concept |  | Indebtedness | 52 | COVERED | RW_CASES 9, MIND_MAPS 2, EES_MODELS 2 |
| Concept |  | Geography incl. landlocked countries | 52 | COVERED | EEQ 5, EES_TOPICS 2, MIND_MAPS 1, CASES 1, RW_CASES 1, CHAINS 1 |
| Concept |  | Tropical climates and endemic diseases | 52 | MISSING | not found |
| Concept |  | Weak institutions: legal system, taxation structures, banking system, property rights | 52 | COVERED | RW_CASES 41, MIND_MAPS 18, RW_DEEP 15, EEQ 12, EES_TOPICS 6, MODELS 5 |
| Concept |  | Gender inequality | 52 | PARTIALLY COVERED | RW case on girls' education only; not presented as a barrier |
| Concept |  | Lack of good governance / corruption | 52 | COVERED | RW_CASES 21, RW_DEEP 12, MIND_MAPS 2, CASES 2, POLICIES 1, EEQ 1 |
| Concept |  | Unequal political power and status | 52 | MISSING | not found (one incidental "political elites" line in a resource-curse deep case) |
| Diagram |  | Poverty cycle showing linked factors that perpetuate poverty | 51 | MISSING | no diagram (mind-map node "The poverty trap", RW DEV cases) |

### 4.10 Economic growth and/or economic development strategies (guide p. 52–53): PARTIALLY COVERED

Linked objects: diagrams —; calculators —; mind maps ['develop']; models —; policies ['aid']; concept cards —; key concepts tagged ['Choice'].

| Type | HL | Guide item | p. | Status | Evidence |
|---|---|---|---|---|---|
| Concept |  | Import substitution | 52 | COVERED | GLOSS 1, EES_TOPICS 1 |
| Concept |  | Export promotion | 52 | COVERED | RW_CASES 8, MIND_MAPS 1, EES_TOPICS 1, DRILLS 1 |
| Concept |  | Economic integration as strategy | 52 | COVERED | RW_CASES 10, MIND_MAPS 1, POLICIES 1, EES_TOPICS 1, RW_DEEP 1 |
| Concept |  | Diversification | 52 | COVERED | RW_CASES 22, EES_TOPICS 3, RW_DEEP 3, MIND_MAPS 2, P2SETS 2, QB 2 |
| Concept |  | Social enterprise | 52 | MISSING | not found outside the syllabus checklist (SUBMETA) |
| Concept |  | Market-based: trade liberalization, privatization, deregulation | 52 | COVERED | MIND_MAPS 6, RW_CASES 5, CASES 2, TOKCAUSE 2, POLICIES 1, RW_DEEP 1 |
| Concept |  | Interventionist: redistribution, tax policies, transfers, minimum wage | 52 | COVERED | MIND_MAPS 5, RW_DEEP 4, EES_MODELS 3, MODELS 2, EES_TOPICS 2, P1TASKS 2 |
| Concept |  | Merit goods provision: education, health programmes, infrastructure (energy, transport, telecom, water/sanitation) | 52 | PARTIALLY COVERED | mind map "develop" has "Interventionist policies" node and RW cases on education/health; the guide list is not set out |
| Concept |  | Inward FDI | 53 | COVERED | RW_CASES 27, CHAINS 9, EES_TOPICS 5, QB 4, DEFS 3, MIND_MAPS 3 |
| Concept |  | Foreign aid: humanitarian/development aid, debt relief, ODA, NGOs | 53 | COVERED | GLOSS 3, RW_CASES 3, P2SETS 2, MIND_MAPS 1, POLICIES 1 |
| Concept |  | Debt relief | 53 | COVERED | RW_CASES 3, POLICIES 1 |
| Concept |  | NGOs | 53 | PARTIALLY COVERED | 2 RW cases mention NGOs; no teaching object |
| Concept |  | Multilateral development assistance: World Bank, IMF | 53 | COVERED | RW_CASES 19, EES_TOPICS 11, MIND_MAPS 8, RW 3, CASES 2, EEQ 1 |
| Concept |  | Institutional change: banking access, microfinance, mobile banking | 53 | COVERED | RW_CASES 21, EES_TOPICS 7 |
| Concept |  | Women's empowerment | 53 | PARTIALLY COVERED | 4 RW cases (girls' education etc.); no teaching object |
| Concept |  | Reducing corruption; property rights; land rights | 53 | COVERED | MIND_MAPS 4, EEQ 4, RW_DEEP 3, MODELS 2, RW_CASES 2, EES_TOPICS 1 |
| Concept |  | Strengths/limitations of strategies; intervention vs market-oriented | 53 | COVERED | RW_CASES 12, MIND_MAPS 6, EES_MODELS 5, CONCEPTS 2, MODELS 2, RW_DEEP 2 |
| Concept |  | Progress toward selected SDGs in two or more countries | 53 | PARTIALLY COVERED | SDGs are covered, but no two-country progress comparison exists |
| Diagram |  | Draw from diagrams in other sections | 52 | COVERED | no separate requirement; the existing diagram set applies |

## Nine key concepts (guide pp. 7, 9–11, 22)

| Key concept | Status | Evidence |
|---|---|---|
| Scarcity | **COVERED** | KCX/KCMAP entry, tagged to 5 subtopics; 4 mind maps; 10 RW cases carry the tag; 0 curated cases; TOKKC entry: yes; GUIDE.kc definition |
| Choice | **COVERED** | KCX/KCMAP entry, tagged to 5 subtopics; 10 mind maps; 4 RW cases carry the tag; 0 curated cases; TOKKC entry: yes; GUIDE.kc definition |
| Efficiency | **COVERED** | KCX/KCMAP entry, tagged to 5 subtopics; 18 mind maps; 34 RW cases carry the tag; 1 curated cases; TOKKC entry: yes; GUIDE.kc definition |
| Equity | **COVERED** | KCX/KCMAP entry, tagged to 5 subtopics; 21 mind maps; 63 RW cases carry the tag; 2 curated cases; TOKKC entry: yes; GUIDE.kc definition |
| Economic well-being | **COVERED** | KCX/KCMAP entry, tagged to 5 subtopics; 12 mind maps; 76 RW cases carry the tag; 0 curated cases; TOKKC entry: yes; GUIDE.kc definition |
| Sustainability | **COVERED** | KCX/KCMAP entry, tagged to 5 subtopics; 10 mind maps; 55 RW cases carry the tag; 1 curated cases; TOKKC entry: yes; GUIDE.kc definition |
| Change | **COVERED** | KCX/KCMAP entry, tagged to 5 subtopics; 14 mind maps; 132 RW cases carry the tag; 1 curated cases; TOKKC entry: yes; GUIDE.kc definition |
| Interdependence | **COVERED** | KCX/KCMAP entry, tagged to 5 subtopics; 11 mind maps; 96 RW cases carry the tag; 1 curated cases; TOKKC entry: yes; GUIDE.kc definition |
| Intervention | **COVERED** | KCX/KCMAP entry, tagged to 5 subtopics; 18 mind maps; 139 RW cases carry the tag; 2 curated cases; TOKKC entry: yes; GUIDE.kc definition |

All nine concepts are named exactly as in the guide. `SUBMETA.kc` tags 2 to 4 concepts per subtopic. The IA rule that each commentary uses a different key concept (guide p. 65) is covered in GUIDE.ia and the IA tools.

## Six real-world issues (guide pp. 7, 25, 29, 35, 41, 45, 50)

| Issue | Site object | Subtopics linked | Status |
|---|---|---|---|
| How do consumers and producers make choices in trying to meet their economic objectives? | RWI `rw1`, TOKRWI `rw1` | 2.1, 2.2, 2.3, 2.4, 2.5, 2.6 | **COVERED** (wording identical to the guide; subtopic grouping matches the guide's unit sections) |
| When are markets unable to satisfy important economic objectives—and does government intervention help? | RWI `rw2`, TOKRWI `rw2` | 2.7, 2.8, 2.9, 2.10, 2.11, 2.12 | **COVERED** (wording identical to the guide; subtopic grouping matches the guide's unit sections) |
| Why does economic activity vary over time and why does this matter? | RWI `rw3`, TOKRWI `rw3` | 3.1, 3.2, 3.3, 3.4 | **COVERED** (wording identical to the guide; subtopic grouping matches the guide's unit sections) |
| How do governments manage their economy and how effective are their policies? | RWI `rw4`, TOKRWI `rw4` | 3.5, 3.6, 3.7 | **COVERED** (wording identical to the guide; subtopic grouping matches the guide's unit sections) |
| Who are the winners and losers of the integration of the world’s economies? | RWI `rw5`, TOKRWI `rw5` | 4.1, 4.2, 4.3, 4.4, 4.5, 4.6 | **COVERED** (wording identical to the guide; subtopic grouping matches the guide's unit sections) |
| Why is economic development uneven? | RWI `rw6`, TOKRWI `rw6` | 4.7, 4.8, 4.9, 4.10 | **COVERED** (wording identical to the guide; subtopic grouping matches the guide's unit sections) |

## Command terms (guide pp. 18–19, 74–75)

**COVERED.** The guide glossary has 33 command terms. The site's `GUIDE.ct` has the same 33, with AO level and the guide definition, and `CTLAB` has a practice entry for each of the 33. The difference between the two sets is {} (empty). The site's `EXAM_DNA` also tags every past-paper part with its command term.

## Theory of knowledge links (guide pp. 7–8 and the TOK box in each unit: pp. 24, 34, 40–41, 44, 50, 53–54)

- **Status: PARTIALLY COVERED.** The site has a large TOK area of its own: TOKQ (12 question sets), TOKKC (one entry per key concept), TOKRWI (one per real-world issue), TOKLENS, TOKDOM, TOKMOD, TOKACT, TOKEVID and TOKCAUSE.
- **Guide questions not reproduced:** none of the guide's 29 unit TOK questions or 7 core knowledge questions appears verbatim or closely paraphrased (checked by exact-phrase search). Only one core theme ("reliability and validity of economic models") and one Unit 2 theme ("same status as laws in the natural sciences") appear, and only in `EDU_MODULES`. This may be deliberate, since the guide calls them suggestions, but a teacher cannot find the guide's own list on the site.
- **Themes covered by keyword:** most guide TOK themes have site equivalents: model realism and assumptions, prediction, positive vs normative, natural-science comparisons, evidence, policy criteria, the future and sustainability, language, statistics, moral responsibility in trade, composite indicators, aid and experiments.
- **Themes with no site equivalent:**
  - reason and emotion, and collective self-governance (p. 34)
  - political ideology and preference for schools of thought or policies (pp. 40, 44)
  - cultural differences in evaluating policy (p. 44)
  - whether development values and the SDGs are universal (p. 53)
  - Goulet's development values (p. 53): one weak hit only
  - paradigm shifts by individuals (p. 24): one weak hit only

## All MISSING and PARTIALLY COVERED items

- **1.1** (PARTIALLY COVERED): Concept: Economic systems: free market, planned, mixed economy (PARTIAL); Concept: PPC: assumptions of the model (VERIFY); Diagram: PPC showing increasing versus constant opportunity cost (PARTIAL)
- **1.2** (PARTIALLY COVERED): Concept: Positive economics (logic, hypotheses, models, theories) (PARTIAL); Concept: 18th century: Adam Smith and laissez faire (MISSING); Concept: 19th century: classical micro (utility), the margin, Say's law, Marxist critique (MISSING); Concept: 20th century: Keynesian revolution, rise of macro policy, monetarist/new classical counter-revolution (PARTIAL); Concept: 21st century: circular economy (MISSING)
- **2.2** (PARTIALLY COVERED): Concept: Law of supply (PARTIAL); Concept: Individual vs market supply (PARTIAL); Concept: Joint and competitive supply (PARTIAL)
- **2.5** (PARTIALLY COVERED): Concept: HL: Importance of YED for firms and sectoral structure of the economy (PARTIAL); Diagram: Constant PED: perfectly elastic, perfectly inelastic and unitary PED along a demand curve (MISSING); Diagram: HL: PED along the straight-line demand curve (PARTIAL); Diagram: Changes in revenue from price changes when demand is price elastic and price inelastic (MISSING); Diagram: Engel curve: income elastic, income inelastic and inferior goods (MISSING)
- **2.6** (PARTIALLY COVERED): Diagram: Constant PES: perfectly elastic, perfectly inelastic and unitary PES along a supply curve (PARTIAL)
- **2.7** (COVERED): Concept: Reasons for intervention (revenue, support firms/households, production, consumption, market failure, equity) (PARTIAL)
- **2.8** (PARTIALLY COVERED): Concept: Challenges in measuring externalities (PARTIAL); Diagram: Government responses: indirect (Pigouvian) tax; carbon tax on a polluting industry; subsidies; legislation and regulation; education (PARTIAL)
- **2.9** (COVERED): Concept: Contracting out to the private sector (PARTIAL)
- **2.11** (PARTIALLY COVERED): Concept: Price and non-price competition (MISSING); Concept: Monopolistic competition SR/LR profit, more elastic demand, less inefficiency, more variety (PARTIAL); Concept: Risks of markets dominated by few very large firms (PARTIAL); Diagram: HL: Perfectly competitive firm as price taker (P = D = AR = MR) (MISSING); Diagram: HL: Perfectly competitive firm showing abnormal profit, normal profit, losses (MISSING); Diagram: HL: Equilibrium in perfectly competitive market with allocative efficiency (P = MC, max social surplus) (PARTIAL); Diagram: HL: Market power where AR > MC (PARTIAL); Diagram: HL: Monopolist showing abnormal profit, normal profit, losses (PARTIAL); Diagram: HL: Natural monopoly (MISSING); Diagram: HL: Collusive oligopoly acting as a monopoly (MISSING); Diagram: HL: Monopolistically competitive firm showing abnormal profit, normal profit, losses (MISSING); Diagram: HL: Monopolistic competition with more elastic demand than monopoly (MISSING)
- **2.12** (PARTIALLY COVERED): Diagram: HL: Circular flow model illustrating why the free market results in inequalities (PARTIAL)
- **3.1** (PARTIALLY COVERED): Concept: OECD Better Life Index (PARTIAL); Concept: Happiness Index (World Happiness Report) (MISSING); Concept: Happy Planet Index (PARTIAL)
- **3.3** (PARTIALLY COVERED): Concept: Costs of unemployment (personal, social, economic) (PARTIAL); Concept: Costs of deflation (deferred consumption, real debt burden) (PARTIAL); Concept: Relative costs of unemployment vs inflation (PARTIAL); Diagram: Fall in the demand for labour for a particular market or geographical area (structural unemployment) (MISSING)
- **3.4** (PARTIALLY COVERED): Concept: Minimum income standards (PARTIAL); Concept: Difficulties in measuring poverty (PARTIAL); Concept: Policies to reduce discrimination (MISSING)
- **3.5** (PARTIALLY COVERED): Concept: HL: Money creation by commercial banks (MISSING); Concept: HL: Open market operations (PARTIAL); Concept: HL: Minimum reserve requirements (PARTIAL); Diagram: HL: Determination of equilibrium interest rates (money market) (MISSING)
- **3.6** (PARTIALLY COVERED): Diagram: HL: Crowding-out effect (MISSING)
- **4.1** (PARTIALLY COVERED): Diagram: Free trade: exports when world price is above domestic price (MISSING); Diagram: Free trade: imports when world price is below domestic price (PARTIAL)
- **4.2** (PARTIALLY COVERED): Diagram: Subsidy/export subsidy: same effects (world-price diagram) (PARTIAL); Calculation: HL: From a diagram, effects on stakeholders of tariffs (PARTIAL); Calculation: HL: From a diagram, effects on stakeholders of (export) subsidies (PARTIAL)
- **4.4** (PARTIALLY COVERED): Concept: HL: Advantages and disadvantages of monetary union (PARTIAL); Concept: Factors affecting WTO influence (services/primary products, unequal bargaining power) (PARTIAL)
- **4.5** (PARTIALLY COVERED): Diagram: AD/AS curves showing consequences of exchange rate changes (PARTIAL); Diagram: How a fixed exchange rate is maintained (MISSING); Diagram: Exchange rate determination under a managed exchange rate system (MISSING)
- **4.6** (PARTIALLY COVERED): Concept: HL: Implications of persistent current account surplus (PARTIAL); Diagram: HL: Exchange rate diagram showing current account balance and exchange rate relationship (PARTIAL); Diagram: HL: J-curve with reference to the Marshall-Lerner condition (MISSING)
- **4.8** (PARTIALLY COVERED): Concept: Gender Inequality Index (GII) (PARTIAL); Concept: Happy Planet Index (PARTIAL)
- **4.9** (PARTIALLY COVERED): Concept: Lack of access to international markets (PARTIAL); Concept: Tropical climates and endemic diseases (MISSING); Concept: Gender inequality (PARTIAL); Concept: Unequal political power and status (MISSING); Diagram: Poverty cycle showing linked factors that perpetuate poverty (MISSING)
- **4.10** (PARTIALLY COVERED): Concept: Social enterprise (MISSING); Concept: Merit goods provision: education, health programmes, infrastructure (energy, transport, telecom, water/sanitation) (PARTIAL); Concept: NGOs (PARTIAL); Concept: Women's empowerment (PARTIAL); Concept: Progress toward selected SDGs in two or more countries (PARTIAL)

## JSON

```json
[
 {
  "code": "1.1",
  "title": "What is economics?",
  "status": "PARTIALLY COVERED",
  "counts": {
   "glossary": 7,
   "calc": 0,
   "diagrams": 2,
   "cases": 0,
   "mindmaps": 2,
   "questions": 5,
   "models": 0
  },
  "gaps": [
   "Concept: Economic systems: free market, planned, mixed economy (PARTIAL)",
   "Concept: PPC: assumptions of the model (VERIFY)",
   "Diagram: PPC showing increasing versus constant opportunity cost (PARTIAL)"
  ]
 },
 {
  "code": "1.2",
  "title": "How do economists approach the world?",
  "status": "PARTIALLY COVERED",
  "counts": {
   "glossary": 3,
   "calc": 1,
   "diagrams": 0,
   "cases": 0,
   "mindmaps": 3,
   "questions": 0,
   "models": 0
  },
  "gaps": [
   "Concept: Positive economics (logic, hypotheses, models, theories) (PARTIAL)",
   "Concept: 18th century: Adam Smith and laissez faire (MISSING)",
   "Concept: 19th century: classical micro (utility), the margin, Say's law, Marxist critique (MISSING)",
   "Concept: 20th century: Keynesian revolution, rise of macro policy, monetarist/new classical counter-revolution (PARTIAL)",
   "Concept: 21st century: circular economy (MISSING)"
  ]
 },
 {
  "code": "2.1",
  "title": "Demand",
  "status": "COVERED",
  "counts": {
   "glossary": 6,
   "calc": 0,
   "diagrams": 1,
   "cases": 1,
   "mindmaps": 2,
   "questions": 5,
   "models": 1
  },
  "gaps": []
 },
 {
  "code": "2.2",
  "title": "Supply",
  "status": "PARTIALLY COVERED",
  "counts": {
   "glossary": 2,
   "calc": 0,
   "diagrams": 1,
   "cases": 0,
   "mindmaps": 2,
   "questions": 0,
   "models": 0
  },
  "gaps": [
   "Concept: Law of supply (PARTIAL)",
   "Concept: Individual vs market supply (PARTIAL)",
   "Concept: Joint and competitive supply (PARTIAL)"
  ]
 },
 {
  "code": "2.3",
  "title": "Competitive market equilibrium",
  "status": "COVERED",
  "counts": {
   "glossary": 7,
   "calc": 2,
   "diagrams": 1,
   "cases": 1,
   "mindmaps": 1,
   "questions": 6,
   "models": 1
  },
  "gaps": []
 },
 {
  "code": "2.4",
  "title": "Critique of the maximizing behaviour of consumers and producers",
  "status": "COVERED",
  "counts": {
   "glossary": 4,
   "calc": 0,
   "diagrams": 0,
   "cases": 2,
   "mindmaps": 1,
   "questions": 0,
   "models": 0
  },
  "gaps": []
 },
 {
  "code": "2.5",
  "title": "Elasticity of demand",
  "status": "PARTIALLY COVERED",
  "counts": {
   "glossary": 5,
   "calc": 3,
   "diagrams": 1,
   "cases": 1,
   "mindmaps": 4,
   "questions": 13,
   "models": 2
  },
  "gaps": [
   "Concept: HL: Importance of YED for firms and sectoral structure of the economy (PARTIAL)",
   "Diagram: Constant PED: perfectly elastic, perfectly inelastic and unitary PED along a demand curve (MISSING)",
   "Diagram: HL: PED along the straight-line demand curve (PARTIAL)",
   "Diagram: Changes in revenue from price changes when demand is price elastic and price inelastic (MISSING)",
   "Diagram: Engel curve: income elastic, income inelastic and inferior goods (MISSING)"
  ]
 },
 {
  "code": "2.6",
  "title": "Elasticity of supply",
  "status": "PARTIALLY COVERED",
  "counts": {
   "glossary": 1,
   "calc": 1,
   "diagrams": 1,
   "cases": 3,
   "mindmaps": 2,
   "questions": 1,
   "models": 0
  },
  "gaps": [
   "Diagram: Constant PES: perfectly elastic, perfectly inelastic and unitary PES along a supply curve (PARTIAL)"
  ]
 },
 {
  "code": "2.7",
  "title": "Role of government in microeconomics",
  "status": "COVERED",
  "counts": {
   "glossary": 5,
   "calc": 5,
   "diagrams": 4,
   "cases": 20,
   "mindmaps": 6,
   "questions": 23,
   "models": 2
  },
  "gaps": [
   "Concept: Reasons for intervention (revenue, support firms/households, production, consumption, market failure, equity) (PARTIAL)"
  ]
 },
 {
  "code": "2.8",
  "title": "Market failure—externalities and common pool or common access resources",
  "status": "PARTIALLY COVERED",
  "counts": {
   "glossary": 14,
   "calc": 1,
   "diagrams": 5,
   "cases": 24,
   "mindmaps": 4,
   "questions": 16,
   "models": 3
  },
  "gaps": [
   "Concept: Challenges in measuring externalities (PARTIAL)",
   "Diagram: Government responses: indirect (Pigouvian) tax; carbon tax on a polluting industry; subsidies; legislation and regulation; education (PARTIAL)"
  ]
 },
 {
  "code": "2.9",
  "title": "Market failure—public goods",
  "status": "COVERED",
  "counts": {
   "glossary": 2,
   "calc": 0,
   "diagrams": 1,
   "cases": 1,
   "mindmaps": 2,
   "questions": 3,
   "models": 0
  },
  "gaps": [
   "Concept: Contracting out to the private sector (PARTIAL)"
  ]
 },
 {
  "code": "2.10",
  "title": "Market failure—asymmetric information (HL only)",
  "status": "COVERED",
  "counts": {
   "glossary": 4,
   "calc": 0,
   "diagrams": 1,
   "cases": 2,
   "mindmaps": 1,
   "questions": 4,
   "models": 1
  },
  "gaps": []
 },
 {
  "code": "2.11",
  "title": "Market failure—market power (HL only)",
  "status": "PARTIALLY COVERED",
  "counts": {
   "glossary": 13,
   "calc": 2,
   "diagrams": 1,
   "cases": 9,
   "mindmaps": 3,
   "questions": 5,
   "models": 2
  },
  "gaps": [
   "Concept: Price and non-price competition (MISSING)",
   "Concept: Monopolistic competition SR/LR profit, more elastic demand, less inefficiency, more variety (PARTIAL)",
   "Concept: Risks of markets dominated by few very large firms (PARTIAL)",
   "Diagram: HL: Perfectly competitive firm as price taker (P = D = AR = MR) (MISSING)",
   "Diagram: HL: Perfectly competitive firm showing abnormal profit, normal profit, losses (MISSING)",
   "Diagram: HL: Equilibrium in perfectly competitive market with allocative efficiency (P = MC, max social surplus) (PARTIAL)",
   "Diagram: HL: Market power where AR > MC (PARTIAL)",
   "Diagram: HL: Monopolist showing abnormal profit, normal profit, losses (PARTIAL)",
   "Diagram: HL: Natural monopoly (MISSING)",
   "Diagram: HL: Collusive oligopoly acting as a monopoly (MISSING)",
   "Diagram: HL: Monopolistically competitive firm showing abnormal profit, normal profit, losses (MISSING)",
   "Diagram: HL: Monopolistic competition with more elastic demand than monopoly (MISSING)"
  ]
 },
 {
  "code": "2.12",
  "title": "The market's inability to achieve equity (HL only)",
  "status": "PARTIALLY COVERED",
  "counts": {
   "glossary": 0,
   "calc": 0,
   "diagrams": 0,
   "cases": 1,
   "mindmaps": 1,
   "questions": 0,
   "models": 0
  },
  "gaps": [
   "Diagram: HL: Circular flow model illustrating why the free market results in inequalities (PARTIAL)"
  ]
 },
 {
  "code": "3.1",
  "title": "Measuring economic activity and illustrating its variations",
  "status": "PARTIALLY COVERED",
  "counts": {
   "glossary": 4,
   "calc": 5,
   "diagrams": 1,
   "cases": 0,
   "mindmaps": 2,
   "questions": 7,
   "models": 1
  },
  "gaps": [
   "Concept: OECD Better Life Index (PARTIAL)",
   "Concept: Happiness Index (World Happiness Report) (MISSING)",
   "Concept: Happy Planet Index (PARTIAL)"
  ]
 },
 {
  "code": "3.2",
  "title": "Variations in economic activity—aggregate demand and aggregate supply",
  "status": "COVERED",
  "counts": {
   "glossary": 7,
   "calc": 0,
   "diagrams": 4,
   "cases": 7,
   "mindmaps": 4,
   "questions": 11,
   "models": 3
  },
  "gaps": []
 },
 {
  "code": "3.3",
  "title": "Macroeconomic objectives",
  "status": "PARTIALLY COVERED",
  "counts": {
   "glossary": 14,
   "calc": 4,
   "diagrams": 4,
   "cases": 20,
   "mindmaps": 6,
   "questions": 17,
   "models": 3
  },
  "gaps": [
   "Concept: Costs of unemployment (personal, social, economic) (PARTIAL)",
   "Concept: Costs of deflation (deferred consumption, real debt burden) (PARTIAL)",
   "Concept: Relative costs of unemployment vs inflation (PARTIAL)",
   "Diagram: Fall in the demand for labour for a particular market or geographical area (structural unemployment) (MISSING)"
  ]
 },
 {
  "code": "3.4",
  "title": "Economics of inequality and poverty",
  "status": "PARTIALLY COVERED",
  "counts": {
   "glossary": 12,
   "calc": 2,
   "diagrams": 1,
   "cases": 3,
   "mindmaps": 5,
   "questions": 8,
   "models": 2
  },
  "gaps": [
   "Concept: Minimum income standards (PARTIAL)",
   "Concept: Difficulties in measuring poverty (PARTIAL)",
   "Concept: Policies to reduce discrimination (MISSING)"
  ]
 },
 {
  "code": "3.5",
  "title": "Demand management (demand-side policies)—monetary policy",
  "status": "PARTIALLY COVERED",
  "counts": {
   "glossary": 4,
   "calc": 1,
   "diagrams": 0,
   "cases": 13,
   "mindmaps": 3,
   "questions": 8,
   "models": 0
  },
  "gaps": [
   "Concept: HL: Money creation by commercial banks (MISSING)",
   "Concept: HL: Open market operations (PARTIAL)",
   "Concept: HL: Minimum reserve requirements (PARTIAL)",
   "Diagram: HL: Determination of equilibrium interest rates (money market) (MISSING)"
  ]
 },
 {
  "code": "3.6",
  "title": "Demand management—fiscal policy",
  "status": "PARTIALLY COVERED",
  "counts": {
   "glossary": 5,
   "calc": 1,
   "diagrams": 1,
   "cases": 14,
   "mindmaps": 3,
   "questions": 8,
   "models": 2
  },
  "gaps": [
   "Diagram: HL: Crowding-out effect (MISSING)"
  ]
 },
 {
  "code": "3.7",
  "title": "Supply-side policies",
  "status": "COVERED",
  "counts": {
   "glossary": 2,
   "calc": 0,
   "diagrams": 0,
   "cases": 5,
   "mindmaps": 2,
   "questions": 2,
   "models": 0
  },
  "gaps": []
 },
 {
  "code": "4.1",
  "title": "Benefits of international trade",
  "status": "PARTIALLY COVERED",
  "counts": {
   "glossary": 2,
   "calc": 2,
   "diagrams": 1,
   "cases": 9,
   "mindmaps": 2,
   "questions": 1,
   "models": 1
  },
  "gaps": [
   "Diagram: Free trade: exports when world price is above domestic price (MISSING)",
   "Diagram: Free trade: imports when world price is below domestic price (PARTIAL)"
  ]
 },
 {
  "code": "4.2",
  "title": "Types of trade protection",
  "status": "PARTIALLY COVERED",
  "counts": {
   "glossary": 3,
   "calc": 2,
   "diagrams": 2,
   "cases": 11,
   "mindmaps": 2,
   "questions": 9,
   "models": 2
  },
  "gaps": [
   "Diagram: Subsidy/export subsidy: same effects (world-price diagram) (PARTIAL)",
   "Calculation: HL: From a diagram, effects on stakeholders of tariffs (PARTIAL)",
   "Calculation: HL: From a diagram, effects on stakeholders of (export) subsidies (PARTIAL)"
  ]
 },
 {
  "code": "4.3",
  "title": "Arguments for and against trade control/protection",
  "status": "COVERED",
  "counts": {
   "glossary": 1,
   "calc": 0,
   "diagrams": 0,
   "cases": 4,
   "mindmaps": 2,
   "questions": 1,
   "models": 0
  },
  "gaps": []
 },
 {
  "code": "4.4",
  "title": "Economic integration",
  "status": "PARTIALLY COVERED",
  "counts": {
   "glossary": 6,
   "calc": 0,
   "diagrams": 0,
   "cases": 13,
   "mindmaps": 1,
   "questions": 1,
   "models": 0
  },
  "gaps": [
   "Concept: HL: Advantages and disadvantages of monetary union (PARTIAL)",
   "Concept: Factors affecting WTO influence (services/primary products, unequal bargaining power) (PARTIAL)"
  ]
 },
 {
  "code": "4.5",
  "title": "Exchange rates",
  "status": "PARTIALLY COVERED",
  "counts": {
   "glossary": 6,
   "calc": 2,
   "diagrams": 1,
   "cases": 17,
   "mindmaps": 4,
   "questions": 14,
   "models": 2
  },
  "gaps": [
   "Diagram: AD/AS curves showing consequences of exchange rate changes (PARTIAL)",
   "Diagram: How a fixed exchange rate is maintained (MISSING)",
   "Diagram: Exchange rate determination under a managed exchange rate system (MISSING)"
  ]
 },
 {
  "code": "4.6",
  "title": "Balance of payments",
  "status": "PARTIALLY COVERED",
  "counts": {
   "glossary": 9,
   "calc": 1,
   "diagrams": 1,
   "cases": 9,
   "mindmaps": 3,
   "questions": 5,
   "models": 0
  },
  "gaps": [
   "Concept: HL: Implications of persistent current account surplus (PARTIAL)",
   "Diagram: HL: Exchange rate diagram showing current account balance and exchange rate relationship (PARTIAL)",
   "Diagram: HL: J-curve with reference to the Marshall-Lerner condition (MISSING)"
  ]
 },
 {
  "code": "4.7",
  "title": "Sustainable development",
  "status": "COVERED",
  "counts": {
   "glossary": 1,
   "calc": 0,
   "diagrams": 0,
   "cases": 4,
   "mindmaps": 4,
   "questions": 2,
   "models": 0
  },
  "gaps": []
 },
 {
  "code": "4.8",
  "title": "Measuring development",
  "status": "PARTIALLY COVERED",
  "counts": {
   "glossary": 3,
   "calc": 0,
   "diagrams": 0,
   "cases": 3,
   "mindmaps": 3,
   "questions": 2,
   "models": 1
  },
  "gaps": [
   "Concept: Gender Inequality Index (GII) (PARTIAL)",
   "Concept: Happy Planet Index (PARTIAL)"
  ]
 },
 {
  "code": "4.9",
  "title": "Barriers to economic growth and/or economic development",
  "status": "PARTIALLY COVERED",
  "counts": {
   "glossary": 2,
   "calc": 0,
   "diagrams": 0,
   "cases": 12,
   "mindmaps": 1,
   "questions": 0,
   "models": 0
  },
  "gaps": [
   "Concept: Lack of access to international markets (PARTIAL)",
   "Concept: Tropical climates and endemic diseases (MISSING)",
   "Concept: Gender inequality (PARTIAL)",
   "Concept: Unequal political power and status (MISSING)",
   "Diagram: Poverty cycle showing linked factors that perpetuate poverty (MISSING)"
  ]
 },
 {
  "code": "4.10",
  "title": "Economic growth and/or economic development strategies",
  "status": "PARTIALLY COVERED",
  "counts": {
   "glossary": 2,
   "calc": 0,
   "diagrams": 0,
   "cases": 34,
   "mindmaps": 1,
   "questions": 6,
   "models": 0
  },
  "gaps": [
   "Concept: Social enterprise (MISSING)",
   "Concept: Merit goods provision: education, health programmes, infrastructure (energy, transport, telecom, water/sanitation) (PARTIAL)",
   "Concept: NGOs (PARTIAL)",
   "Concept: Women's empowerment (PARTIAL)",
   "Concept: Progress toward selected SDGs in two or more countries (PARTIAL)"
  ]
 }
]
```