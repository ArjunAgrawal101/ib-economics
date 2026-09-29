# Real World case corpus, round-2 audit (R2)

Audit date: 29 September 2026. The repo was only read; nothing under `/home/user/ib-economics` was edited. I read the earlier notes first (`audit-cases.md` R1–R41, `apply-cases-notes.md` with decisions 1–14 and checks C1–C18, `rwdeep.txt`, `cases.txt`). Nothing already fixed is reported again. Items still open in those notes are listed once in §5, not as new findings.

## Summary counts

| Measure | Count |
|---|---|
| Cases in `RW_CASES` | 203 (MIC 54 · MAC 51 · GLO 51 · DEV 47); 12 deep cards in `RW_DEEP` |
| Copies in sync | yes: `RW_DATA_HASH` = `__RW_HASH__()` = `2736ac9981f85a39`; every snippet below occurs once in each copy |
| New findings (R2-1 … R2-40) | 40 |
| · WRONG | 5 rows across 4 cases (MIC-029 ×2, GLO-051, DEV-003, DEV-007 deep) |
| · DATED | 13 rows (R2-20 and R2-29 also count as MISLEADING) |
| · MISLEADING (overreach, terminology, labels, dates) | 17 rows |
| · UNVERIFIED STAT | 5 rows (R2-15 is also MISLEADING); 5+13+17+5 = 40 |
| (rows carry a primary class; the three dual-class rows are noted) | |
| Cases with a formal `src` field | **0 / 203** (0 / 12 deep cards) |
| Cases whose text attributes evidence to a named body | **5** (GLO-013, GLO-041, DEV-001, DEV-007, DEV-047) |
| Cases that cite unnamed studies or RCTs | 5 (MIC-035, DEV-002, DEV-022, DEV-032, DEV-033) |
| Cases that name an institution only as an actor (RBI, Fed, ECB, IMF, WTO, OPEC…) | 24 |
| Cases that name no institution or source at all | **169** |
| Cases carrying any specific number other than a year | 8 (MIC-015 $15, MIC-047 $35, MAC-003 4% ±2%, GLO-007 "15-economy", GLO-002 "232", DEV-007 800 million, plus years). Deep cards carry the rest (§4). |

**Fact-check method.** I used my own knowledge, plus 9 WebSearch queries (search-result summaries only, no primary document opened) for MGNREGA's replacement, Singapore COE transferability, California cap-and-invest, the RBI target renewal, the Airbus–Boeing truce, Chile's pension law, Argentina's cepo, Punjab free farm power and China's youth-unemployment series. Items resting only on memory are marked Medium or lower.

---

## 1. Schema

### 1.1 `RW_CASES` record (all 26 keys present on all 203 records)

| Key | Meaning |
|---|---|
| `id` | `MIC-/MAC-/GLO-/DEV-###`, a stable id that other surfaces link to |
| `t` | title |
| `c` | country or entity label: a country, `"European Union"` (20), `"Developing economies"` (29, used for generic frames) or `"Cross-country"` (1) |
| `y` | a single integer year. Its meaning varies: sometimes the launch year (C17 checks 7 of these), sometimes an illustrative episode year |
| `u` | syllabus unit (2 micro, 3 macro, 4 global) |
| `sub` | syllabus subtopic code, e.g. `"2.7"` |
| `lvl` | `core` / `hl-depth` / `hl-only` |
| `pp` | papers the case serves: `IA`, `P1`, `P2`, `P3` |
| `a1` | boolean: Paper 1 anchor case |
| `p3` | boolean: Paper 3 register |
| `kc` | key concepts; the first is the primary concept |
| `is` | "Economic issue": a one-sentence statement of what happened and why it matters |
| `tp` | topics and theory (semicolon list) |
| `dgt` | diagram text: what the model shows moving |
| `ev` | evaluation: a semicolon list, usually "benefit **vs** cost" (190 of 203 contain "vs") |
| `u1` | Paper 1 style essay prompt |
| `u2` | Paper 2 style data task |
| `ui` | IA angle (article type plus key concept) |
| `q` | discussion question(s) |
| `xp` | what examiners reward |
| `dg` | diagram plate keys (empty on 86 cases) |
| `th` | themes |
| `ty` | types (from `RW_TYPES`) |
| `rg` | region |
| `pv` | first-edition section (Micro/Macro/Global/Development Economics) |
| `dp` | boolean: a deep card exists |

The code also reads two keys that no record has: `st` (status, in `rwStatus`) and, on deep cards, `src` and `find` (in `rwProvenance`).

**Example record** (`assets/data/real-world.js:14`, MIC-004, abridged):
```
{"id":"MIC-004","t":"Minimum Support Prices for wheat and rice","c":"India","y":2020,"u":2,"sub":"2.7",
 "is":"Minimum support prices, backed by government procurement mainly of wheat and rice, act as a price floor …",
 "tp":"Price floors; agricultural support; government intervention",
 "dgt":"Price floor above equilibrium with surplus; government purchase cost",
 "ev":"Income support vs surplus, storage cost and allocative inefficiency; political economy of reform",
 "u1":"Evaluate the use of price floors to support producer incomes.","u2":"Calculate the surplus …",
 "ui":"An MSP-reform article analysed through Equity.","q":"Who gains and who loses from an MSP? …",
 "xp":"Reward the surplus rectangle …","dg":["floor"],"th":["Price controls","Agriculture"],
 "ty":["Market outcome","Policy"],"rg":"South Asia","pv":"Microeconomics","dp":false, …}
```

### 1.2 `RW_DEEP` card (12 cards, line 15)

The fields are `context`, `theory`, `verdict`, `evalLine`, `deployWhen`, `p1`, `p2`, `p3`, `ia`, `hook`, `starter`, `activity`, `exit`, `atl`, `notes`, `summary40`, `examiner`, `tok`, `discussion`, `errors[]`, `related[]`, `stakeholders[{who,what}]`, `pros[]`, `cons[]`, `misconception`, `extension`, `memory` and `examTip`.

The bundled copy is `index.html:35916` (`__RW_FALLBACK__`, a single-quoted string in which `'` is written as `\'`). Its hash is at `index.html:35914`.

### 1.3 Rendering (index.html)

| Function | Lines | Role |
|---|---|---|
| `rwCard(c)` | 25218–25240 | browse card: `t`, `c`, `y`, level, `is` ("Economic issue"), first plate, first `ev` clause ("Evaluation opportunity") |
| `rwSnapshot(c)` / `rwChips(c)` | 25174–25194 | snapshot panel and tags |
| `rwOpen` / `RWZONES` | 25356–25373 | the twelve zones: Context, Economics, Model, Diagram, Stakeholders, Evidence, Limitations, Evaluation, Key concept, Exam use, IA use, TOK |
| **`rwCasePage()`** | **25375–25406** | the case page: header, freshness banner (`rwFresh`, 24928), zones, set comparison, provenance, graph |
| `rwStudentZones` / **`rwZoneBody(c,dp,i)`** | 25414–25505 | body of each zone (field mapping below) |
| `rwChain` | 25507–25519 | eight-step "policy chain", built by splitting `is`, `tp`, `dgt` and `ev` |
| `rwWinLose` | 25521–25534 | generic "who gains, who loses" grid (the same seven groups on every case) |
| `rwTeacherView` | 26091 | teacher mode |
| `rwSourceFor` | 24943–24950 | heuristic source *type* (national statistics office, central bank, ministry, international body, secondary) from `c`, `th`, `ty` and `u` |
| `rwSourceClass` / `rwFigures` / `rwStatus` / **`rwProvenance`** | 25643–25723 | the "Source and status" panel. It renders `dp.src` and `dp.find`, but no card has either |

Zone field mapping in `rwZoneBody`:

| Zone | Field shown |
|---|---|
| 0 Context | `dp.context` or `is`, plus `tp` |
| 1 Economics | `dp.theory` or `tp`, plus the chain |
| 2 Model | `tp` and the first `dgt` clause |
| 3 Diagram | plates from `dg`, plus `dgt` |
| 4 Stakeholders | `dp.stakeholders`, or `ev` plus the generic grid |
| 5 Evidence | generic source-type table (no named source) |
| 6 Limitations | two fixed generic bullets, the last `ev` clause and `dp.errors` |
| 7 Evaluation | `dp.verdict`, pros and cons, or `ev` |
| 8 Key concept | `kc` |
| 9 Exam use | `u1`/`dp.p1`, `u2`/`dp.p2`, `dp.p3`, `xp`, `dp.examiner` |
| 10 IA use | `ui` / `dp.ia` |
| 11 TOK | `rwTok` / `dp.tok` |

### 1.4 Requested sections: present, derivable or missing

| Section | Status | Where it lives, or how to derive it faithfully |
|---|---|---|
| WHY IT MATTERS | **Present** (in part) | `is`. On deep cards, `summary40`. |
| ECONOMIC MECHANISM | **Present** | `tp` and `dgt`. On deep cards, `theory`. |
| WHO IS AFFECTED | Deep cards only (12) | `stakeholders`. For the other 191, derive **only the groups `ev` or `is` names explicitly** (for example MIC-003 "hurt farmers and trade partners", MIC-002 "regressive"). Where none is named, show the section as a prompt, as `rwWinLose` already does. Do not synthesise effects per group. |
| WHAT THE MODEL PREDICTS | **Present** | `dgt` states the model's prediction (for example "Price floor above equilibrium with surplus"). Label it "The model predicts: " + `dgt`. |
| WHAT HAPPENED IN REALITY | Deep cards only (`context`) | `is` states a historical outcome for some cases (MIC-022, MIC-023, MIC-046, GLO-026 …) and a generic claim for others ("can", "aims to"; about 29 generic frames). **Not derivable faithfully.** Show `is` under a neutral heading, such as "The case in one line", rather than as reality, unless a `context` exists. |
| LIMITATIONS | Partly present | Zone 06 already combines generic bullets, the last `ev` clause and `errors`. Derivable faithfully: the text after "vs" in each `ev` clause gives the counter-case for 190 of 203 cases. |
| DISCUSSION QUESTION | **Present** | `q` (deep: `discussion`) |
| EXAM CONNECTION | **Present** | `u1`, `u2`, `xp`, `pp`, `a1`, `p3`, `sub`, `lvl`. Deep cards add `p1`/`p2`/`p3`/`examiner`/`examTip`. |
| SOURCE | **Missing** (0/203) | **Not derivable without inventing.** Two things can be shown honestly: (a) the source *type* from `rwSourceFor`, labelled as a type; (b) the named body for the 5 cases whose text names one. Add `src` only after someone opens the document. |
| DATE | **Present** as `y` | Its meaning is ambiguous. Show it as "Year" (not "launched"), or add `yk:"launch"|"episode"`. The global "checked" date is `RW_ANALYSED` ("22 September 2026"). |
| COUNTRY/REGION | **Present** | `c` and `rg`. Note that `c:"Developing economies"` is a frame label, not a place. |

---

## 2. Findings table

Every snippet occurs exactly once in `assets/data/real-world.js` and exactly once in `index.html` (checked by script, with `'`→`\'`). Case records are all on **real-world.js:14** (bundled at **index.html:35916**); deep cards are on **real-world.js:15** (same bundle line).

| id | Case | file:line | Exact current text | Class | Proposed replacement / flag | Conf. |
|---|---|---|---|---|---|---|
| R2-1 | MIC-005 Free electricity for farmers (Punjab) | rw.js:14 | `"t":"Free electricity for farmers (Punjab)","c":"India","y":2022` | MISLEADING (date) | Free farm power in Punjab dates from **1997** (introduced for small farmers by the Bhattal government, extended to all tubewells under Badal). Either set `"y":1997`, or keep 2022 as the episode year and add to `is`: "…, a policy in place since 1997." | High (search: Tribune) |
| R2-2 | MIC-021 Energiewende | rw.js:14 | `"t":"Renewable feed-in tariffs (Energiewende)","c":"Germany","y":2014` | MISLEADING (date) | Feed-in tariffs came in with the EEG (2000). The 2014 EEG reform began replacing them with market premiums (and from 2017 with auctions). Use `"y":2000`, or retitle "Feed-in tariffs and their 2014 reform". | High |
| R2-3 | MIC-021 | rw.js:14 | `Guaranteed prices for renewable power drove a rapid energy transition.` | MISLEADING (causal) | "Guaranteed feed-in prices for renewable power, paid for by a levy on electricity bills, helped drive a rapid expansion of renewable generation." ("drove the transition" credits one instrument with the whole outcome) | Medium |
| R2-4 | MIC-021 | rw.js:14 | `Decarbonisation and innovation vs high consumer levies and grid costs` | DATED | Append "; the EEG levy on bills was cut to zero in July 2022 and later abolished, with support funded from the federal budget". | High |
| R2-5 | MIC-020 Single-use plastics directive | rw.js:14 | `Bans and levies target plastic pollution as a negative externality.` | MISLEADING (terminology) | Directive (EU) 2019/904 bans selected items and sets consumption-reduction and extended-producer-responsibility duties; it does not impose an EU levy. Suggested: "Bans on selected items, consumption-reduction measures and producer-responsibility charges target plastic pollution as a negative externality." | Medium-high |
| R2-6 | MIC-027 Organ-donation opt-out | rw.js:14 | `A presumed-consent default aimed to raise organ-donor registration.` | MISLEADING (terminology) | Under deemed consent, registration is no longer the target; consent is. Suggested: "A deemed-consent default aimed to raise consent to organ donation." | Medium-high |
| R2-7 | MIC-028 Norway EVs | rw.js:14 | `Tax exemptions and perks made Norway the global leader in EV share.` | DATED | "Tax exemptions and perks helped make Norway, by the early 2020s, the country with the highest electric share of new-car sales." (dated, with a metric; "made" softened) | High on fact |
| R2-8 | MIC-029 Singapore COE | rw.js:14 | `A tradable quota caps car ownership to manage congestion and scarcity.` | **WRONG** | COEs are **auctioned**. LTA states that COEs in Categories A, B and D cannot be transferred; C and E only once, by individual bidders. Suggested: "An auctioned quota of vehicle entitlements caps car ownership to manage congestion and scarcity." | High (search: LTA OneMotoring) |
| R2-9 | MIC-029 | rw.js:14 | `Quotas; tradable permits; negative externalities` | WRONG (same) | `Quotas; auctioned permits; negative externalities` | High |
| R2-10 | MIC-009 China tobacco | rw.js:14 | `A state monopoly is the world's largest cigarette producer` | DATED (undated superlative; on check C4's review list) | "A state monopoly that is the world's largest cigarette producer by volume" (add a year when a source is attached) | Medium (fact long-standing) |
| R2-11 | MIC-041 Google fines | rw.js:14 | `Record fines targeted abuse of search and Android dominance.` | DATED (on check C4's review list) | "Fines that set EU antitrust records at the time (Shopping 2017, Android 2018) targeted abuse of search and Android dominance." | High |
| R2-12 | MIC-050 Diamond market | rw.js:14 | `"t":"Diamond market control","c":"Developing economies"` | MISLEADING (geography) | De Beers is a South African–British firm selling mainly to rich-country markets. `c:"Cross-country"` fits better than a developing-economy frame. | Medium |
| R2-13 | MIC-054 EU ETS | rw.js:14 | `A continent-wide cap-and-trade market prices carbon for heavy industry and power.` | MISLEADING (geography) | "An EU-wide cap-and-trade market (with Iceland, Liechtenstein and Norway) prices carbon for power, heavy industry and aviation." The UK left in 2021. | High |
| R2-14 | MIC-013 California | rw.js:14 | `A market for emissions permits prices carbon to cut greenhouse gases efficiently.` | DATED | Append: "In September 2025 the programme was extended to 2045 and renamed cap-and-invest." (AB 1207 / SB 840) | High (search: ICAP) |
| R2-15 | MAC-003 RBI target | rw.js:14 | `A formal 4% (±2%) target anchored monetary policy and expectations.` | UNVERIFIED STAT + MISLEADING (causal) | Figure correct. Add basis: "A statutory CPI target of 4% (±2%), set for five-year periods (renewed for April 2026–March 2031), aimed to anchor monetary policy and expectations." ("anchored" is a claim; "aimed to" is safer.) | High (search: Business Standard, DEA notification 25 Mar 2026) |
| R2-16 | MAC-011 Inflation Reduction Act | rw.js:14 | `A large package combined green subsidies, tax measures and deficit goals.` | DATED | Append: "Many of its clean-energy tax credits (for example the EV credit, ended after 30 September 2025) were curtailed by 2025 legislation; check which provisions remain." | High |
| R2-17 | MAC-020 ECB QE | rw.js:14 | `Averted deflation vs side effects and uneven country impact` | MISLEADING (causal) | `Credited with helping avert deflation (the counterfactual is contested) vs side effects and uneven country impact` | Medium |
| R2-18 | MAC-022 UK mini-budget | rw.js:14 | `Unfunded tax cuts spooked bond markets, spiking yields and forcing a reversal.` | MISLEADING (incomplete causation) | "Unfunded tax cuts spooked bond markets; the gilt sell-off, amplified by pension funds' liability-driven investment strategies, forced Bank of England intervention and a reversal." | High |
| R2-19 | MAC-035 Korea chaebols | rw.js:14 | `"t":"Industrial policy and the chaebols","c":"South Korea","y":1990` | MISLEADING (date) | The state-directed drive was the 1960s–70s (Heavy and Chemical Industry drive, 1973–79). By 1990 Korea was liberalising. Use `"y":1973`, or state the episode. | Medium-high |
| R2-20 | MAC-040 China youth unemployment | rw.js:14 | `"t":"Record youth unemployment"` | DATED / MISLEADING (measurement) | Title: "Youth unemployment peak and a change of method". Add to `is`: "the official 16–24 rate hit a series high in June 2023; publication was then suspended and resumed in January 2024 on a method that excludes students, so the two series are not comparable." | High (search) |
| R2-21 | MAC-046 Weimar | rw.js:14 | `Reparations and money printing produced classic hyperinflation.` | MISLEADING (causal) | "Deficits financed by money creation, worsened by reparations and the 1923 Ruhr occupation, produced classic hyperinflation." | Medium |
| R2-22 | MAC-051 Stability and Growth Pact | rw.js:14 | `Common deficit and debt limits constrain national fiscal policy in the eurozone.` | DATED | Append: "The rules were suspended in 2020–23 (general escape clause) and reformed in April 2024 around country-specific expenditure paths." Also: the rules bind all EU members, not only the eurozone. | High |
| R2-23 | GLO-001 US–China trade war | rw.js:14 | `Reciprocal tariffs targeted the bilateral deficit and technology rivalry.` | MISLEADING (terminology) | Since April 2025, "reciprocal tariffs" names a different US measure. Suggested: "Tit-for-tat tariffs from 2018 targeted the bilateral deficit and technology rivalry." (The 2025 escalation is still open as decision 1.) | High |
| R2-24 | GLO-005 EU–UK TCA | rw.js:14 | `A zero-tariff but not frictionless deal governs post-Brexit trade.` | MISLEADING (precision) | "A deal with zero tariffs and quotas on goods that meet rules of origin, but not frictionless, governs post-Brexit trade." | High |
| R2-25 | GLO-007 RCEP | rw.js:14 | `"t":"RCEP: the world's largest trade bloc","c":"China"` | MISLEADING (geography + superlative) | `c:"Cross-country"` (15 parties; China is one). Title: "RCEP: the largest free-trade agreement by members' combined GDP". | Medium-high |
| R2-26 | GLO-023 Argentina | rw.js:14 | `Currency instability led to controls and parallel exchange rates.` | DATED | Append: "Most controls on individuals were lifted in April 2025, when a managed exchange-rate band replaced the cepo; some controls on firms remained." | High (search: MercoPress) |
| R2-27 | GLO-032 Australia–China | rw.js:14 | `Tariffs and bans on Australian exports followed a diplomatic dispute.` | DATED | Append: "China lifted most of them between 2023 and 2024 (barley 2023, wine 2024, lobster late 2024)." | Medium-high |
| R2-28 | GLO-033 Airbus–Boeing | rw.js:14 | `A long WTO fight concerned government subsidies to aircraft makers.` | DATED | Append: "In June 2021 the US and EU suspended the retaliatory tariffs for five years, and in 2026 they extended the suspension; check its current status." | High on 2021; Medium on 2026 (search) |
| R2-29 | GLO-034 CBAM | rw.js:14 | `A carbon tariff on imports aims to prevent ‘carbon leakage'.` | MISLEADING (terminology) + DATED | "A carbon border charge, paid by importers buying certificates priced on the EU ETS, aims to prevent ‘carbon leakage'; 2023–25 was a reporting-only phase and financial obligations start in 2026." | Medium-high |
| R2-30 | GLO-051 Bretton Woods | rw.js:14 | `A post-war fixed-rate system anchored currencies to the dollar until 1971.` | **WRONG** (precision) | "A post-war system of adjustable pegs to the gold-convertible dollar, which broke down in 1971–73 (gold convertibility suspended in 1971; general floating from 1973)." | High |
| R2-31 | DEV-003 MGNREGA | rw.js:14 | `A rural job-guarantee scheme provides a wage floor and safety net.` | **WRONG** (outdated) | The VB-G RAM G Act 2025 (assent 21 December 2025) replaced MGNREGA from 1 July 2026. Suggested: "A rural job-guarantee scheme (2006–2026) provided an effective wage floor and safety net; it was replaced in 2026 by the VB-G RAM G Act." | High on passage; Medium on the in-force date (search) |
| R2-32 | DEV-023 Chile | rw.js:14 | `Copper reliance and a privatised pension system shaped development debates.` | DATED | Append: "A 2025 reform added employer contributions and a state-backed component to the individual-account system." | High (search: MercoPress, KPMG) |
| R2-33 | DEV-025 HIPC | rw.js:14 | `"t":"HIPC debt-relief initiative","c":"Developing economies","y":2005` | MISLEADING (date) | HIPC launched in 1996 (enhanced in 1999). 2005 is the MDRI. Use `"y":1996`, or retitle "HIPC and the 2005 Multilateral Debt Relief Initiative". | High |
| R2-34 | DEV-022 Progresa | rw.js:14 | `"t":"Progresa/Oportunidades and RCT evidence","c":"Mexico","y":1997,"u":4,"sub":"4.10","lvl"` | MISLEADING (region, consistency) | Its `rg` is "North America", while Brazil and Argentina use "Latin America". Pick one convention for Mexico (MIC-043, GLO-038 and DEV-022). | Medium |
| R2-35 | DEV-007 deep card | rw.js:15 | `Between the reforms of 1978 and the official declaration of 2020-21` | **WRONG** (residual from R41) | R41 fixed `is` but not the deep card. The World Bank/DRC figure covers "the past four decades" to 2020, and its series does not start in 1978. Suggested: "Over the four decades to 2020 (World Bank and DRC, 2022), China moved roughly 800 million people …". Same fix in `summary40`: `About 800 million Chinese crossed the extreme-poverty line between 1978 and 2020-21` → "…in the four decades to 2020…". | High |
| R2-36 | DEV-007 | rw.js:14 | `Around 800 million people moved above the World Bank's international extreme-poverty line` | UNVERIFIED STAT | The number is correct; the body is named but no document is cited. Attach `src`: World Bank & DRC, *Four Decades of Poverty Reduction in China* (2022), and state the line ($1.90, 2011 PPP). Since June 2025 the World Bank line is $3.00 (2021 PPP), so name the line in use. | High |
| R2-37 | GLO-003 deep card (hook added by the earlier fix) | rw.js:15 | `when truck crossings fell by more than a third on a year earlier` | UNVERIFIED STAT | A new unsourced figure was introduced by the R27 fix. Flag: "(Getlink/Eurotunnel monthly traffic release, January 2021: check the figure before use)", or drop the magnitude. | Low (I cannot confirm the exact %) |
| R2-38 | MIC-015 Seattle | rw.js:14 | `A phased rise to $15 tested` | UNVERIFIED STAT (low risk) | The statutory figure is fine. Add its basis: "A phased rise to a $15 hourly minimum under Seattle's 2014 ordinance tested…". | High |
| R2-39 | GLO-007 | rw.js:14 | `A 15-economy Asia-Pacific agreement` | UNVERIFIED STAT (low risk) | Correct (15 signatories). No change, but include it in any `src` pass (ASEAN Secretariat). | High |
| R2-40 | MIC-021 / MIC-005 / MAC-035 / DEV-025 (systemic) | rw.js:14 | `"y":` | MISLEADING (schema) | `y` mixes launch years and episode years (R2-1, 2, 19, 33). Add `yk:"launch"|"episode"`, or render it as "Year of the episode described". | High |

---

## 3. Source and institution counts (task 3)

* A formal source field (`src`) is present on **0 of 203** cases and **0 of 12** deep cards. `rwProvenance` would render `dp.src` and `dp.find`, but neither exists.
* Evidence is attributed to a named body in the text of **5** cases: GLO-013 (US Treasury, IMF), GLO-041 (World Bank), DEV-001 (UNDP/OPHI), DEV-007 (World Bank), DEV-047 (RBI Handbook).
* **5** cases cite unnamed studies or RCTs: MIC-035, DEV-002, DEV-022, DEV-032, DEV-033.
* **24** cases name an institution only as an actor, not as a source: MIC-033, MIC-040, MIC-046, MIC-047, MAC-003, MAC-011, MAC-012, MAC-020, MAC-023, MAC-037, GLO-002, GLO-010, GLO-011, GLO-024, GLO-031, GLO-033, GLO-044, DEV-011, DEV-012, DEV-025, DEV-026, DEV-027, DEV-029, DEV-043.
* **169** cases name no institution and no source.
* **Named vs not:** counting only evidence sources, 10 name a source (named body or study type) and 193 do not. Counting any institution, 34 name one and 169 do not.

## 4. Deep-card figures

The deep cards carry most of the corpus's statistics:

| Card | Figure(s) |
|---|---|
| MAC-001 | 86% |
| MAC-005 | ₹1.97 lakh crore |
| MAC-012 | 5.25–5.50% |
| MIC-026 | "near nine in ten" |
| GLO-014 | ₹74→₹83 |
| DEV-007 | 800 million |
| GLO-003 | "more than a third" |
| MIC-001 | ₹20,000 (hypothetical) |

All except GLO-003 were already covered by the earlier C5 check and decision 8. None has a `src`. I found no new error in them.

## 5. Still open from earlier rounds (not re-reported)

Decisions 1 (GLO-001 2025 refresh), 2 (MIC-001 `context` still says "tiered slabs", and the 40% rate), 3 (the ECB cases' "European Union" label), 4 (DEV-023 Taxation tag), 5 (generic-frame status), 7 (PLI ₹1.91 vs ₹1.97), 8 (deep-card `src`), 9 (MAC-001 `related`), 12 (MIC-046 "Crisis" tag) and 13 (the `dataHash` comment) are still unresolved in the tree.

In-page datasets: `RW` (index.html:2788), `CASES` (10603), `TRANSFER` (11472) and `MKTSCEN` (22926) were re-read. They are generic frames with no dated claims. The R35, R37 and R38 fixes are present. No new issues.
