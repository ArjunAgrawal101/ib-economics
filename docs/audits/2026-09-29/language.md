# Round 2 language audit: imprecise economics terminology

I read the repo but changed nothing in it. Files audited, as they are now (HEAD `d8efb20`): `index.html` (36,463 lines), `assets/data/real-world.js` and `assets/data/exam-dna.js`. I checked the earlier audit (`audit-language.md`, L1–L36) and its patch notes against the current text. Nothing below repeats an issue that has already been fixed. Three items from that audit are still unfixed; they are listed once at the end and not given new IDs.

## Summary

| Category | New findings | HIGH | MEDIUM |
|---|---|---|---|
| A. Demand vs quantity demanded; shift vs movement along | 5 (L1–L5) | 1 | 4 |
| B. Price level vs inflation rate | 1 (L6) | 0 | 1 |
| C. Correlation presented as causation; overclaimed evidence | 2 (L7–L8) | 0 | 2 |
| D. Elasticity wording and tax incidence | 3 (L9–L11) | 0 | 3 |
| E. Absolute or unhedged claims | 3 (L12–L14) | 2 | 1 |
| F. Balance of payments terms (capital vs financial account; "the deficit") | 3 (L15–L17) | 2 | 1 |
| **Total** | **17** | **5** | **12** |

Still unfixed from the earlier audit, and still present in both RW copies: L31 (customs union / single market), L32 (Argentina "Depreciation"), and the missing "in absolute value" in the GLO-014 Marshall–Lerner sentence. See the last section.

I found no new genuine errors in these categories: appreciation/depreciation direction (all price-effect statements checked), devaluation vs depreciation (only L32 remains), nominal vs real, growth vs development, deflation vs disinflation, monopoly vs oligopoly, money supply vs interest-rate mechanism, profit vs revenue, opportunity cost vs cost, "equilibrium" at a non-clearing price, PED sign conventions and elastic/inelastic direction, and "perfectly inelastic" usage.

**Where the new findings sit.** Most are in content added or reworked since the first audit: "Economics, Everywhere" (lines ~32000–33400), the EE Studio model library (line 34498) and the RW case records. `exam-dna.js` holds no student-facing prose; it is codes only.

**RW edits need three changes.** Any change to an RW string must be made in `assets/data/real-world.js` (lines 14–15) **and** in the bundled fallback copy in `index.html` line 35916, and the two `RW_DATA_HASH` / `__RW_HASH__` values then need recomputing. None of the RW find-strings below contains an apostrophe, so each is byte-identical in both copies. Each find-string was checked to occur exactly once per file.

---

## A. Demand vs quantity demanded; shift vs movement along

| id | file:line | exact current text | problem | exact proposed replacement | confidence |
|---|---|---|---|---|---|
| L1 | real-world.js:14 (MIC-023 `is`); index.html:35916 | `A small per-bag charge sharply cut single-use bag demand.` | The charge is a price. It causes a movement along demand, so what fell is quantity demanded (bag use), not demand. The platform marks this exact confusion as an error (`DEFS` "Say quantity demanded, not demand", misconception m2, mind-map error 17161). | `A small per-bag charge sharply cut single-use bag use.` | HIGH |
| L2 | index.html:32405 (EE "Will machines take all the jobs?", `think` option) | `if lower prices raise demand enough, it may employ more` | A lower own price raises quantity demanded (sales), not demand. The option's own `why` says "sales can rise enough". | `if lower prices raise sales enough, it may employ more` | MEDIUM |
| L3 | real-world.js:14 (MIC-045 `is`); index.html:35916 | `Status-driven luxury demand can rise with price (Veblen effect).` | A Veblen effect is quantity demanded rising with price along an upward-sloping demand curve. The case's own `u2` asks students to tell this apart from "a rightward shift in demand", so writing "demand … rise[s]" blurs the very distinction the case sets. | `For status-driven luxuries, quantity demanded can rise with price (Veblen effect).` | MEDIUM |
| L4 | index.html:32328 (EE "Why are homes in big cities so expensive?", `why[2]`) | `Rent caps protect existing tenants but can reduce the supply of homes for rent over time.` | A binding cap is a price below equilibrium, so landlords move along supply and quantity supplied falls. Three lines earlier (32071) the same section calls the Berlin fall in listings "the fall in quantity supplied that the model predicts". | `Rent caps protect existing tenants but can reduce the quantity of homes offered for rent over time.` | MEDIUM |
| L5 | index.html:11431 (claim-correction drill) | `“The government should increase demand for the good by subsidising it.”` | The keyed answer says the claim is wrong because "A production subsidy shifts supply, not demand". The claim never says who receives the subsidy, and after the L9 fix the platform teaches that a subsidy paid to consumers does shift demand. As worded, the claim can be correct, so the key is contestable. Naming the recipient in the claim makes the key right. | `“The government should increase demand for the good by subsidising its producers.”` | MEDIUM |

## B. Price level vs inflation rate

| id | file:line | exact current text | problem | exact proposed replacement | confidence |
|---|---|---|---|---|---|
| L6 | index.html:32154 (EE question title) | `Why do central banks raise interest rates when prices are rising?` | Prices rise every year under a 2–4% target; the same section says "some rise in prices year after year is normal". Central banks tighten when inflation is above target, not because the price level is rising. The title teaches the level/rate confusion that 32027–32028 then corrects. | `Why do central banks raise interest rates when inflation is too high?` | MEDIUM |

## C. Correlation presented as causation; overclaimed evidence

| id | file:line | exact current text | problem | exact proposed replacement | confidence |
|---|---|---|---|---|---|
| L7 | index.html:32071 (EE "Why do queues exist?", `ex` fact layer) | `the fall in quantity supplied that the model predicts.` | A fall in advertised listings during the cap is presented as confirming the model. Advertised listings are a proxy, and the platform's own record of this case (MIC-046) says "its effect on the supply of flats to rent is a separate, evidential question". The evidence is consistent with the model, not proof of it. | `consistent with the fall in quantity supplied that the model predicts.` | MEDIUM |
| L8 | real-world.js:15 (DEEP DEV-016 `summary40`); index.html:35916 | `Botswana and Norway prove escape is institutional.` | Two counterexamples cannot "prove" a causal claim. The case's own `cons` warn against determinism ("institutions, not geology, decide outcomes" is flagged as the framing risk). | `Botswana and Norway suggest escape is institutional.` | MEDIUM |

## D. Elasticity wording and tax incidence

| id | file:line | exact current text | problem | exact proposed replacement | confidence |
|---|---|---|---|---|---|
| L9 | index.html:34498 (EE Studio model library, PED `explains`) | `Why the burden of a tax falls more on buyers when demand is inelastic` | This infers incidence from PED alone, the L15 pattern. The platform's standard is relative elasticity; the same library's policy entry says "shared according to the relative elasticities of demand and supply". This line is new since the first audit, and the R3 lint missed it because it contains "burden … when demand is inelastic" without a verb match. | `Why the burden of a tax falls more on buyers when demand is less elastic than supply` | MEDIUM |
| L10 | real-world.js:15 (DEEP MIC-001 `stakeholders[0].what`); index.html:35916 | `Pay most of the burden on inelastic-demand goods;` | Same PED-only inference. It sits in the GST case, whose own `theory` says "economic incidence is split by relative elasticities". | `Pay most of the burden where demand is less elastic than supply;` | MEDIUM |
| L11 | index.html:2209 (chain feedback, keyed-correct option) | `If those imports are highly inelastic` | Goods are not elastic or inelastic; the demand for them is. The option the feedback praises reads "The price elasticity of demand for its imported energy and food". | `If demand for those imports is highly inelastic` | MEDIUM |

## E. Absolute or unhedged claims

| id | file:line | exact current text | problem | exact proposed replacement | confidence |
|---|---|---|---|---|---|
| L12 | index.html:4793 (live AD/AS explorer note, SRAS-increase branch below capacity) | `which is why supply-side improvement is the only route to non-inflationary growth.` | "The only route" is the platform's own listed misconception ("Claiming supply-side policy is the only way to raise output without inflation", 17483). It is also what L8 and L36 removed elsewhere. This branch is triggered by a rightward shift of short-run aggregate supply, which can come from falling costs rather than supply-side policy. The note is shown to students in the explorer. | `which is why supply-side improvement is a route to non-inflationary growth.` | HIGH |
| L13 | index.html:32093 (EE "Does a higher minimum wage cost jobs?", `why[4]`) | `Set the minimum high enough, above the competitive wage, and employment falls in both models.` | Under monopsony, a floor just above the competitive wage still leaves employment above the no-floor level. It falls below that level only once the floor passes the MRP at the monopsony employment level. The page's own lab says employment is "returning to the no-floor level at [MRP(Lm)]", and the `adv` text describes the inverted U. As written, the sentence treats any floor above the competitive wage as reducing employment. | `Set the minimum high enough, well above the competitive wage, and employment falls in both models.` | HIGH |
| L14 | index.html:32585 (EE idea "Opportunity cost", `meet`) | `and in the gains from trade, which rest entirely on comparing opportunity costs.` | The IB 4.1 gains from trade also include economies of scale, competition and greater choice. The platform itself says economies of scale explain "why a small country gains from selling to a larger market through trade" (32640), and it cites later trade theory on increasing returns. "Entirely" is too strong. | `and in the gains from trade, which rest in large part on comparing opportunity costs.` | MEDIUM |

## F. Balance of payments terminology

| id | file:line | exact current text | problem | exact proposed replacement | confidence |
|---|---|---|---|---|---|
| L15 | real-world.js:14 (GLO-017 `u2`); index.html:35916 | `Interpret current- and capital-account data.` | A current account deficit is financed through the **financial** account (FDI, portfolio flows, reserves). The capital account holds only capital transfers and non-produced, non-financial assets. The platform draws this line itself: BoP diagram 3207/3211, SUBMETA 4.6 (8637), and the dictionary error "Merged with the capital account" (8786). | `Interpret current- and financial-account data.` | HIGH |
| L16 | real-world.js:14 (GLO-017 `xp`); index.html:35916 | `Reward the saving-investment and capital-account framing, not just trade flows.` | Same capital vs financial account error, in the examiner-facing guidance for the same case. | `Reward the saving-investment and financial-account framing, not just trade flows.` | HIGH |
| L17 | real-world.js:14 (GLO-014 `is`); index.html:35916 | `A weaker rupee raised the cost of large oil imports and the deficit.` | "The deficit" does not say which one. In a macro case it reads as the budget deficit, but the mechanism and the deep case are about the current account. | `A weaker rupee raised the cost of large oil imports and the current account deficit.` | MEDIUM |

---

## Still unfixed from the earlier audit (same wording as before; not new IDs)

These were routed to the case auditor in `patch-language-notes.md` and are still in both `real-world.js` and `index.html:35916`:

- **L31 (GLO-003 `errors[1]`).**
  - Current: `one removes tariffs and common external barriers, the other removes regulatory friction.`
  - Replace with: `one removes internal tariffs and sets a common external tariff, the other also removes regulatory friction and frees factor movement.`
- **L32 (GLO-023 `dgt`).**
  - Current: `Depreciation; controls creating parallel rates; inflation feedback`
  - Replace with: `Devaluation of a controlled official rate; parallel-rate depreciation; inflation feedback`
- **GLO-014 DEEP `theory` (L10 consistency).**
  - Current: `improve later only if the elasticities sum past one`
  - Replace with: `improve later only if the elasticities sum past one in absolute value`

## Checked and judged acceptable (not reported)

- `domestic supply expands and demand contracts` (18909): British extension/contraction usage; this was already accepted in the first audit.
- `Demand falls because the grain is now more expensive.` and `the tax raises prices so demand falls` (34503): deliberate wrong or weak examples.
- Line 35031: the rice export ban "raised domestic supply". Correct, because the ban shifts supply to the domestic market.
- The RW rent-cap `dgt` "reduced supply/quality": a terse diagram tag. I left it out as too marginal. If L4 is applied, the author may want to align it for consistency.
- MIC-021 "Guaranteed prices for renewable power drove a rapid energy transition": the causal link is widely accepted, so I did not report it.
- MAC-046 `q` "Why does only a credible monetary reset end hyperinflation?": a question with a contestable premise, but framed as a question.
- All appreciation/depreciation price-direction statements: roughly 80 hits, none reversed.
- All "deflation" usage: about 60 hits, all correct after the earlier fixes.
- All "perfectly (in)elastic" usage.
- PED sign handling: only magnitudes or |PED| appear in the remaining inequalities.
- Every monetary-policy direction statement.
- Tariff incidence ("consumers bear most").
- Positive/negative externality directions.
- The multiplier direction.
- Terms-of-trade direction.
- The Marshall–Lerner statements in Economics, Everywhere (32134, 32139): these now carry "in absolute value".

## Method

- **Corpus.** I built a sentence corpus of all three files: about 35,600 fragments with line numbers, base64 stripped, plus all 3,167 parsed RW string fields.
- **Pattern searches.** I ran about 45 regex sweeps covering: demand/supply after a price, tax or charge; shift vs movement; price level vs inflation; deflation; growth/development; nominal/real; FX direction; devaluation; BoP accounts; money supply; profit/revenue; opportunity cost; equilibrium with controls; elasticity numbers and slopes; "perfectly inelastic"; monopoly naming; incidence; externality, multiplier and terms-of-trade direction; and absolute words (always, never, only, guarantee, prove, entirely, automatically, will + verb). I read every hit in context.
- **Full reads.** I read in full all Economics, Everywhere prose (lines ~32000–33400), the EE Studio model library and topic dossiers (34497–34498), and all 203 RW `is` and `dgt` fields.
- **Diff since the first audit.** I diffed `0eecbbc..HEAD` to find content added after that audit; the main addition is lines 34353–35684.
