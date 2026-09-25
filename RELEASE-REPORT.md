# Release report

**Arjun Agrawal · IB DP Economics** · release 2026.09-b, *Economics, Everywhere*

This report was written on 25 September 2026. Every number in it was produced by running something,
and it says what was run. Where something could not be checked, it says so. The previous release's
report, which records the live verification of nine IB claims against the IB's own pages, is kept at
[`docs/releases/2026-09-22-release-report.md`](docs/releases/2026-09-22-release-report.md) and
remains the source for those claims.

---

## 1. What changed, in one paragraph

A new public-facing section, **Economics, Everywhere**, now sits beside the IB course: nineteen
big-question explainers, twelve *Economics in real life* cards, sixteen *One economic idea* cards,
fifteen interactive labs, an *Economist's eye* game and a *Where the numbers live* page. Before it
was built, the existing platform was put through an independent content audit in six parts
(diagrams, calculations, language, Real World cases, mindmaps and policy, assessment). That audit
found **223 problems**, almost all of them in economics that the existing 1,659 self-tests could not
see, because those tests mostly checked the code against itself. **About 195 were corrected** in
this release; the rest need the author's decision or source material and are listed in section 11.
The self-test system was then rebuilt around what the audits found: it now runs **1,863 checks**,
including 138 written from the audit findings, of which 113 fail on the release before the audit.
Those new checks found four more defects, which were fixed. A browser test harness was added under
`tests/`.

## 2. What was added

### Economics, Everywhere (`#/everywhere`)

*"The economics behind the world around us."* For anyone curious, not only IB students.

| Part | Count | What each one contains |
|---|---|---|
| Big questions | 19 | The question, a short answer, the economic idea, *Why does this happen?* (the mechanism revealed step by step), a labelled real example, *Change one thing* (a lab or a sorting task), *What would you expect?* (a prediction before the reasoning), *Go deeper* at four levels (beginner, student, IB, advanced), the confusion to avoid, links into the platform, a pathway onward, sources |
| Economics in real life | 12 | Observation → economic concept → mechanism → real-world example → trade-off → a question to think about |
| One economic idea | 16 | One idea in about a minute: the idea in one line, the explanation, a visual, an example, where you will meet it, the confusion to avoid |
| Labs | 15 | Price, inflation, tax incidence, minimum wage (competitive and monopsony), exchange rate, interest rates, externalities, comparative advantage, a repeated pricing game, a public-goods game, who gets the growth, the power of growth, membership versus pay-per-visit, an AD-AS explorer, network effects |
| Economist's eye | 15 situations | An everyday situation; which economic idea is hiding in it? |
| Where the numbers live | 7 areas | For each current figure: what to look for, how to read it, who publishes it. No figures are held. |

Categories: Money, Prices, Markets, Work, Business, Trade, Government, Technology, Environment,
Development, Everyday economics, Behaviour, Global economy.

It is reached from the header bar ("Everywhere"), the mobile drawer, the More menu, the home page
(a band directly under the opening hero, for visitors who are not studying IB Economics), the
search, and the saved-items page. Every question, card, idea and lab has its own address and a
*Share* button.

**Claim discipline.** Every example carries one of the platform's claim layers: *Fact* (with a
named source), *Illustrative example*, *Stylised model*, *Interpretation*, or *Teacher explanation*.
Every lab is badged *Stylised model* and states its assumptions. The figures in the flight question
(₹8,000 and ₹18,000) and the ₹80-per-dollar exchange rate in the rupee lab are labelled illustrative.
Nothing in the section is live data.

**Local personalisation, nothing transmitted.** Saved pieces join the platform's single saved list;
recently opened pieces appear under *Continue exploring* and in the home page's continue-learning
record; the chosen explanation level is remembered. All of this lives in the existing profile in
`localStorage`, added lazily, so no schema migration was needed and existing profiles are untouched.

### Search

The command palette (`/` or Ctrl/Cmd + K) now has filters: Economics, Everywhere · Concepts · Cases
and data · Diagrams and models · Calculations · Mindmaps · Videos · Exam and questions · TOK ·
Sections, each with a live count for the current query. With no filter the palette behaves exactly
as before. Descriptions are now trimmed at a word rather than mid-word.

### The test harness (`tests/`)

Browser tests the page cannot run on itself: `selftest.mjs`, `e2e.mjs`, `pwa.mjs`, `widths.mjs`,
`routes.mjs`. They live in `tests/` with their own `package.json`, so the site stays free of
dependencies and build steps (see `tests/README.md`).

## 3. What was improved

- **Home page.** Two bands that repeated others word for word were withdrawn from it ("Start here",
  a third time picker, and "Your next move", a second copy of "Today's training"). Two dashboard
  panels ("Your economic thinking", "Your growth") now appear only once there is evidence to show;
  for a new visitor they were about 2,000 px of "not enough evidence yet". Section numbers are
  renumbered so the sequence has no gaps. The page went from about 13,500 px to about 10,700 px and
  from 993 to 821 DOM nodes on a first visit. Nothing was removed from the platform: everything those
  bands linked to is still one click away.
- **Continue panel.** In the home page's sidebar its cards were about 130 px wide and their labels
  broke one letter per line. The grid now fits the space.
- **Toast.** The idle notification box waited just below the viewport at full opacity, so it could
  peek into view as an empty dark rectangle. It is now hidden until it has something to say.
- **The quality-control system.** 204 new built-in checks, most of them written so that they fail
  on a specific economics or content error the audits found (section 9), plus the browser harness.
  Two existing checks that could not fail were replaced with recomputation from the data.
- **Keyboard access to wide tables.** A table that scrolls sideways on a phone (the diagram atlas's
  subtopic table, for one) could not be reached from the keyboard. Any such table now becomes a
  named tab stop.
- **The labs at their extremes.** The market lab's price floor, and the AD-AS lab at large shifts,
  now stay inside their diagrams and never show a negative quantity (section 6).
- **Two dead buttons.** "Search everything" and "Open the global search" called a function that did
  not exist; both now open the search.

## 4. What was audited, and how

Six independent audits, run in parallel. **Each was carried out by a separate AI agent** (not a
human examiner), instructed to review as an experienced IB examiner and economics lecturer would,
and not to trust the existing self-tests. Their findings are therefore reviewed work, not expert
certification; section 11 lists what still needs a human with the source documents.

| Audit | Scope | Findings |
|---|---|---|
| Diagrams | All 34 atlas plates; the 27 model-driven diagrams re-solved independently; lab, tool and calculation-board SVGs; repair shop | 35 |
| Calculations | All 36 formulas at normal, zero, negative, decimal and extreme inputs; generated practice and marking tolerance (20,000 questions per issue); every quantitative tool and lab swept across its sliders | 34 |
| Language | Dictionary, concepts, misconceptions, drills, flashcards, conditions library, model library, and a regex lint of the whole file (42,536 sentence fragments) | 36 |
| Real World | All 203 cases and 12 deep cards read in full; 38 web searches on about 35 specific claims | 41 |
| Mindmaps and policy | All 762 mindmap nodes, 88 spot-the-error items, 75 missing-link gaps, the ten *Economics in 60 Seconds* issues, the policy toolkit, model library, dossiers, 57 video checkpoints, the TOK section | 42 |
| Assessment | Question bank, data response, drills, chains, paper labs, simulator, cockpit, exemplars, feedback bank, the IB reference layer; all 990 Exam DNA parts machine-checked | 35 |
| **Total** | | **223** |

Each finding came with the exact current text, the problem, the correct economics, a drop-in
replacement and a confidence level. Each auditor then turned its findings into a patch and tested
it against a copy of the current file. Every pair was read before it was applied, and the
built-in self-tests were run after each patch.

## 5. What errors were found (representative, by kind)

- **Economics that was wrong.** Market failure was defined as the price mechanism "allocating
  efficiently". Monopolistic competition was said to lose its price-setting power in the long run.
  The exchange-rate channel was said to *reverse* a rate rise. Welfare-loss triangles were placed
  "between the two cost curves". An FDI enclave was said to raise GDP "while GNI does not". A
  repair-shop item said dividing by MPC gives a number smaller than the injection (1 ÷ 0.8 = 1.25).
  Supply shocks were said to "break" the Phillips relationship.
- **Models whose output contradicted their own text.** The AD-AS lab's "Supply-side gain" preset
  returned the starting point exactly while its note said output rises; the Keynesian mode could
  put the price level below its own floor; What-if item 6 ("substantial spare capacity") showed
  output unchanged and prices up 25%; the exchange-rate lab contradicted the Marshall-Lerner flag it
  displayed in 142 of 6,640 slider positions; the Lorenz builder returned a Gini of −0.416 for shares
  entered out of order; the multiplier lab accepted leakages summing to 1.8.
- **Marking that rejected right answers.** PED given as a magnitude was always marked wrong;
  correctly rounded answers were rejected in 40–47% of some generated question types; a typographic
  minus sign was silently dropped, so −2 was read as 2; floor-surplus questions showed a negative
  quantity demanded in 4.8% of cases, and the correct answer was marked wrong.
- **Wrong keys and model answers.** A Paper 3 calculation asked for one ratio and keyed another
  (2.27 against a correct 1.44); a Paper 2 model answer said supply moving into a segment raises its
  price; a spot-the-error challenge marked a correct statement about actual growth as wrong.
- **IB-specific.** Paper 1 timing taken from the previous guide ("twenty-five marks is about
  forty-five minutes"; it is 75 minutes); HL-only content (the multiplier, Marshall-Lerner, the
  J-curve, 2.10 to 2.12) served to, and in places required of, SL students; Paper 2 (g) answers
  scored against the Paper 1 (b) strands; "Economics guide" text carrying the *Official IB TOK
  information* badge; previous-guide sessions mixed into Exam DNA unlabelled.
- **Diagrams.** Curves drawn outside the plot box on 11 plates; common-pool-resource markers 70 px
  off their intersections; the business cycle's "peak" floating in empty space and its path sitting
  almost entirely below trend; the energy-price-shock story illustrated with the demand-pull plate;
  three concept pages whose diagram keys did not exist, so they showed no diagram.
- **Real World.** Wrong years (Doi Moi 1986, not 1990; South Korea joined the OECD's Development
  Assistance Committee in 2010, not 2000); the Berlin rent cap said to be voided "amid shortage
  concerns" (it was voided because rent law is federal); the US Medicare insulin cap treated as a
  price ceiling; causal overstatement ("It worked"); import-quota diagrams attached to an export
  ban and a production quota; PDF-extraction debris shown to students ("PA P E R 3 ( H L )");
  every one of 203 cases labelled *Verified historical* although no source had been opened.
- **Platform defects found along the way.** Two buttons ("Search everything", "Open the global
  search") called a function that did not exist, so they did nothing. A first visit showed a
  "Confident" subtopic, a Paper 1 draft and a "QA task" the visitor never produced: the self-tests
  rendered views from fixture data and the screen was never repainted from the restored profile.

## 6. What errors were corrected

| Audit | Pairs applied | Findings resolved in this release |
|---|---|---|
| Calculations | 62 | 34 of 34 (11 further design questions left to the author) |
| Assessment | 69 | 34 of 35 (A7, the Exam DNA marks data, needs the source papers) |
| Language | 80 (4 already fixed by another audit) | 32 of 36 (the case-data items went to the Real World patch; 2 are the author's call) |
| Mindmaps and policy | 56 | 34 of 42 (8 need the author) |
| Diagrams | 52, plus 4 follow-ups | 26 of 35 (9 need the author) |
| Real World | 91 data fixes in both copies, 8 page fixes | 27 of 41 (14 need the author) |

Duplicate findings across audits (for example the multiplier item, which three audits flagged) were
applied once; a pair whose text had already been corrected by another audit was skipped, not forced.

**Follow-ups settled after the patches.** Six items the audits had deferred as small were settled:
remittances are no longer called capital flows (they are secondary income); the euro-area
negative-rates case says it is euro-area policy; the Berlin rent cap is typed as a policy, not a
crisis; the balance-of-payments error item classifies by residency rather than citizenship; the
Keynesian AS plate says which of the alternative views it shows; a Marshall-Lerner drill item is
labelled HL. The business-cycle wave (now trend plus a cycle), the YED generator's zero case, the
CPI builder's all-zero weights and the data hash's comment were also corrected.

**Defects found by the new checks** (section 9), none of them in any audit, all fixed:

| Where | Defect | Fix |
|---|---|---|
| Market lab, price floor | With a steep demand curve the default floor sat above the price at which anyone buys: quantity demanded was −8 to −60, producer surplus as low as −1,230, and the floor line was drawn above the plot | The floor now stops at the last half-dollar below that price (and at $18); quantity demanded cannot be negative |
| Market lab, price floor | Under a high floor with elastic supply, the excess-supply bracket ran 120 px past the plot | The quantity axis stretches to hold it |
| AD-AS lab | At large shifts SRAS and AD ran past the plot's right edge | Each curve is drawn only where its output lies on the axis |
| PED plate | The *E elastic* label covered its own marker | Label moved clear |

After the case corrections, the content hash that proves the two copies of the Real World corpus
are identical was recomputed and written into both (`f217cb4cdc739883` → `a0d5194dda8d9800`). The
new self-test recomputes that SHA-256 in the page on every run.

### Which diagrams were corrected

Common pool resource (markers on intersections, loss area bounded by MSC and MSB); business cycle
(actual output now the trend plus a cycle; peak and trough on its turning points); multiplier
schematic; calculation-board tax and producer-surplus diagrams (curves pass through the student's
own points); market-lab subsidy curve; a new cost-push plate, now used by the energy-shock story;
Phillips curve shift; supply-side and growth pages pointed at the right plates; three missing
concept-page keys; flow diagrams without axes; label collisions; tax incidence areas shaded on the
tax plate; a supply-plus-quota curve on the quota plate; renderer clipping of every curve to the
plot box; the PED plate's label; the market lab under a high price floor; the AD-AS lab at large
shifts.

### Which examples were corrected

See section 5 under *Real World*. In addition the status label on every case now reads
*Historical, source not opened here* rather than claiming verification that did not happen.

### Which formulas and calculations were corrected

The formulas themselves were correct except floor surplus above the demand choke price. The
corrections were to the models built on them (AD-AS, exchange rate, multiplier, Lorenz), to the
interpretation text (revenue direction under PED, zero and index-100 cases, regressive schedules
called progressive), to marking (magnitudes, precision stated, typographic minus), to units (the
comparative-advantage plate's metres were a thousand times too large) and to labels (externality
cost and benefit).

## 7. Which sources were used

For the new section, one register of 47 sources (`EE_SRC` in `index.html`), including the Reserve
Bank of India, MoSPI, the US Bureau of Labor Statistics, the UK Office for National Statistics,
Eurostat, the Federal Reserve, the Bank of England, the ECB, the IMF, the World Bank, the OECD,
the WTO, ILOSTAT, UNDP, the NBER, the UK Low Pay Commission, the Competition Commission of India,
the Government of Sweden, the European Commission, the German Federal Constitutional Court, the
Nobel Prize site, CORE Econ, and a small number of papers and reputable reports.

**How they were checked, and the limit of that check.** Shell access to the internet is blocked in
the build environment, and the web-fetch tool was blocked by the network proxy for every domain
tried. URLs and facts were therefore checked through a web search index: each URL was confirmed to
be indexed at that exact address with the expected title, and each factual claim was confirmed from
search results, with the supporting URL recorded. That proves the pages exist and say what is
claimed in their indexed text; it does not prove that each page loads today. Six URLs in the first
draft were wrong or not indexed and were replaced; four claims were reworded to what the sources
support (the 1973 embargo was imposed by Arab producers in OAPEC and prices *nearly* quadrupled;
Coase's lighthouse evidence covers England and Wales and was financed by compulsory dues; Tucker's
story *gave the prisoner's dilemma its name*; South Korea was among the poorest countries in the
1950s, not "low-income", a category the World Bank introduced later).

## 8. What remains uncertain

- **MIC-001 (India's GST).** The case now refers to the September 2025 rationalisation to two main
  rates, 5 and 18 per cent. This was confirmed only through search results pointing to a PIB
  document that could not be opened. **Open it before relying on the case.**
- **DEV-047 (Kerala).** The statement that Kerala's income per head has risen above the Indian
  average rests on secondary reports of RBI state data. Confirm against the RBI *Handbook of
  Statistics on Indian States*.
- **India's surge-pricing cap** (in the *Why do ride fares jump when it rains?* card) is sourced to
  press reports of the 2020 and 2025 Motor Vehicle Aggregator Guidelines, not to the ministry's own
  text. The card dates the figures and says they change.
- **IB rules the guide could not be opened to confirm**: the "command term at the topic's AO level
  or lower" rule, whether markband and IA descriptors shown as quoted match the guide word for word,
  the Paper 3 "(a) up to 20 marks" wording, IA word-count exclusions, and the removal of XED and
  linear functions from the course. These were left unchanged and are flagged, not asserted.

## 9. Tests executed, and the number of assertions

Everything below was run on this release's final code unless it says otherwise. "Passed" means
the check ran and passed; nothing is reported as passing that did not run.

### Baseline, recorded before any change

On the release as merged (`fc4684e`): the built-in self-test ran **1,659 checks, 0 failed**, and
151 routes opened without a page error. That is the regression baseline.

### What the old tests could not see

The six content audits found 223 problems that all 1,659 checks passed over. Most of those checks
compared the code with itself: a lab's output with the same lab's formula, a rendered page with
the presence of a heading. Two of them could not fail at all, because they checked a literal sum
typed into the test (`0.30*106+…` against 104.7) rather than anything read from the data. Both were
replaced with recomputation from the platform's own data tables.

### What was added to the quality-control system

| Suite | Checks | What makes it a test of economics or content, not of the code against itself |
|---|---|---|
| **Audit checks** (`AUDITSUITE`, new) | 138 | Written from the six audits' findings. **113 of the 138 fail on the pre-audit release** (`fc4684e`), each on the error the audit found; the other 25 guard against regressions. Calculators against 14 textbook reference values worked by hand; 500 generated floor-surplus questions never counting a negative quantity; every AD-AS preset's note agreeing in direction with its own computed output and price level; the exchange-rate lab's current-account sign agreeing with its Marshall-Lerner flag at every slider position; the Gini within 0 to 0.8 across a 3⁵ grid of slider settings; markers on their curves and curves inside the plot on every plate, measured on the drawn SVG; HL content kept behind HL labels; the two copies of the Real World data identical, and their SHA-256 recomputed in the page; wording rules such as absolute values in the Marshall-Lerner condition. Items the author has still to decide are allow-listed by name, so anything new fails. |
| **Economics, Everywhere** (`EESUITE`, new) | 28 content + 25 accuracy | Content: every piece has all its parts, every link resolves, every source is in the register, every figure has a claim layer, every lab renders at its extremes. Accuracy: the labs are checked against independent solutions: market clearing, incidence = PES / (PES + \|PED\|), the monopsony inverted U, the Marshall-Lerner switch, a loan instalment that repays the loan exactly over its term, a Pigouvian tax equal to the external cost removing the welfare loss, gains from trade existing exactly when the terms of trade lie between the opportunity costs, a dominant strategy in the pricing game whose Nash outcome both players could beat, the rule of 70 against the exact doubling time. |
| **Platform integrity** (`INTEGRITYSUITE`, new) | 4 in the page, 7 in the report (3 audit checks share the prefix) | Every `onclick` on every route names a function that exists (on the pre-audit release it fails on the two search buttons that called a missing `openSearch()`), every navigation target exists, no route renders empty or throws. |

The audit checks were verified independently of the agent that wrote them: the committed suite was
injected into the pre-audit release and into this release. Pre-audit: 113 of 138 fail. This
release: 0 of 138 fail, in 134 ms, with no change to saved data, the current view or any lab's
state before and after.

**Four defects that no audit had listed** were found by the new checks and fixed in this release
(section 6). **Six further checks** (the Exam DNA mark data) fail on this release and were left out
of the suite, because only the source papers can fix the data; they are listed in section 11.

### Number of assertions

**1,863 built-in checks, 0 failed, no page errors** (was 1,659). By report area (a check can count
in more than one area; *Other* is checks whose names match no area):

| Area | Checks | Area | Checks |
|---|---|---|---|
| Calculations | 491 | Learning content | 81 |
| Diagram engine | 322 | Economics accuracy | 68 |
| Economic models | 62 | Mindmaps | 58 |
| Assessment tools | 44 | IB accuracy | 41 |
| Content integrity | 38 | TOK | 38 |
| Responsive | 36 | Video learning | 32 |
| Economics, Everywhere | 28 | Branding | 23 |
| Topic dossier | 23 | Reference layer | 21 |
| Safety and shell | 20 | Navigation and shell | 20 |
| Resource hub | 19 | Technical | 18 |
| Diagrams and models | 17 | Accessibility | 16 |
| Profiles and progress | 13 | Teacher tools | 12 |
| Startup safety | 10 | Policy and cases | 10 |
| Platform integrity | 7 | Printing | 2 |
| Other | 316 | | |

A single copied `index.html`, with no `assets/` folder beside it, also runs all 1,863 checks with
none failing and all 203 cases present (tested by serving the file alone).

### Browser tests (`tests/`, new)

Run with `cd tests && npm install && npm test`. On this release's final code:

| Suite | What it does | Result |
|---|---|---|
| `selftest.mjs` | Loads the page, reads the built-in self-test by area, and checks that the data files load from `assets/data`, that a first visit shows no self-test fixture data, and that there are no page errors | 1,863 checks ran, 0 failed; the three page checks passed |
| `e2e.mjs` | 22 journeys: addresses and Back, reload, search and its filters (typed from the keyboard), an explainer's embedded lab, a slider keeping focus while the result redraws, *Show me why*, predictions, the level control, saving across a reload, *Continue exploring*, the Economist's eye, the pricing game to its debrief, an assignment link | 22 passed |
| `pwa.mjs` | Service worker, precache, icons, a deep link offline | 4 passed |
| `widths.mjs` | 21 routes at 8 widths (section 10) | 8 passed |
| `routes.mjs` | 158 routes, cold, at 375 and 1366 px (section 10) | 2 passed |

The five suites were run in full on the final code: 70 results, 0 failures.

### What the tests still do not prove

- The language rules are patterns. They catch the errors the audits found and their close
  variants, not every way of saying something wrong.
- Label overlap is measured with a fixed per-character width, so that the result is the same on
  every device; it agrees with the browser's own measurement on the cases checked, but it is an
  approximation.
- No test can confirm that a source says what the platform says it does, or that an IB rule is
  current; those limits are in sections 7, 8 and 11.
- Passing every check is evidence against the errors the checks were written for. It is not a
  claim that the platform is free of errors.

## 10. Mobile, accessibility, performance and PWA/offline results

All measured in headless Chromium 141 (Playwright 1.56.1) in the build container, on this release's
final code unless stated.

### Mobile tests

- **Width sweep** (`tests/widths.mjs`): 21 routes (the home page, the course, Learn, Real World,
  the mindmaps, the diagram atlas, practice, the examiner, calculations, tools, and every kind of
  *Economics, Everywhere* page) at **320, 375, 390, 412, 768, 1024, 1280 and 1440 px**. At every
  width: no horizontal page overflow, no page errors, no control in the new section smaller than
  28 px, and no sideways-scrolling table that a keyboard cannot reach. All 8 widths passed.
- **Route sweep** (`tests/routes.mjs`): all **158 routes** opened cold from their address at
  375 px and at 1366 px. Each landed on the right section and tab, with the self-test passing, no
  page errors, no horizontal overflow and a non-empty page. Passed.
- The built-in *Responsive* self-tests (36) passed.
- **Not tested:** real phones, real touch input, iOS Safari and Firefox. Chromium's mobile
  viewport is an approximation of a phone, not a phone.

### Accessibility tests

- **axe-core 4.13** (WCAG 2.0 A and AA, WCAG 2.1 AA rules) on 12 routes at 1366 px and at 375 px:
  the home page, the market lab, the diagram atlas, Real World, and eight *Economics, Everywhere*
  pages (landing, list, a big question, a real-life card, an idea, a lab, the Economist's eye and
  *Where the numbers live*). **One violation was found and fixed:** at 375 px the diagram atlas's
  subtopic table scrolled sideways but could not be reached from the keyboard (it had also been
  there before this release). Tables that overflow now become a named tab stop, and the width sweep
  now checks this at every width; the check fails on the previous release and passes on this one.
  After the fix: **0 violations on all 24 page-and-width combinations.**
- The built-in *Accessibility* self-tests (16) passed.
- The new section's controls are real buttons and labelled range inputs (axe's button-name and
  label rules pass on them), and they use the platform's burgundy focus outline. The search is
  exercised from the keyboard in `tests/e2e.mjs`; the labs and the *Show me why* steps are
  exercised with clicks, so their keyboard use rests on their being native controls.
- **Not tested:** a walk-through with a real screen reader (NVDA, JAWS, VoiceOver). axe covers
  the rules it can detect automatically, which is a minority of WCAG.

### Performance results

Median of five cold loads at 1366 px, no throttling, service worker blocked. *Before* is the
release as merged (`fc4684e`).

| Measure | Before | After | Change |
|---|---|---|---|
| First contentful paint | 344 ms | 332 ms | none measurable |
| DOMContentLoaded (the page responds after this) | 2.43 s | 2.92 s | +0.50 s |
| Self-test run | 1.40 s | 1.84 s | +0.44 s |
| Checks in the self-test | 1,659 | 1,863 | +204 |
| `index.html`, raw | 3,862,869 bytes | 4,217,123 bytes | +9.2% |
| `index.html`, gzip -9 | 1,390,678 bytes | 1,513,074 bytes | +8.8% |
| Home page, first visit | about 13,500 px tall, 993 elements | about 10,700 px, 821 elements | shorter |

Almost all of the load-time increase is the larger self-test, which runs synchronously during
start-up (the audit checks take about 130 ms of it). First paint is unaffected: it happens before
the script that runs the self-test. The container is faster than a mid-range phone,
so the absolute times will be longer on one; the relative change is the meaningful figure. See
section 13 for the recommendation to run the self-test on demand.

### PWA and offline results

`tests/pwa.mjs`, on a local secure origin: the service worker registers; the platform's own **12
files are precached**; every manifest icon resolves; **a deep link opens offline** once the
platform has been visited. All passed. The cache version was bumped to `aa-ibdp-econ-v11`, so
installed copies fetch this release. **Not tested:** installing to a home screen on a real device.

## 11. Known limitations, and decisions left to the author

Nothing below is hidden behind a passing test. Each item was found, and is listed here because
fixing it needs the author's decision, the author's source material, or more than a reviewable
change in this release.

**Needs the author's source material**

- **Exam DNA mark data (assessment finding A7).** 63 of the 212 analysed questions have part marks
  that do not add up to the question total. There are also impossible totals (41, 35, 32, 28),
  Paper 2 (g) parts stored as 1 or 3 marks, definitions stored at 4 to 7 marks, and three empty
  subtopic codes. Only the source papers can settle the right values. No record was changed; the
  heatmap now says that some mark allocations are known to be incomplete and await re-extraction.
- **Paper 2 lab sets** total 33 or 34 marks and label the 15-mark part "(f)". The lab's note now
  says so honestly; rebuilding the sets to 40 marks with a (g) part means writing new questions.

**Needs the author's decision (economics or syllabus scope)**

- **AD-AS lab, monetarist mode.** When demand pushes output past potential, the lab plots the
  long-run point and never shows the short-run inflationary gap the atlas teaches; the text now
  says "the point shown is the long-run outcome". The *Supply-side gain* preset only moves the
  curves if the student also raises potential output, and its note now says that. Allowing a
  short-run point beyond potential would change two narratives and one existing self-test.
- **Market lab supply passes through the origin**, so price elasticity of supply is 1 at every
  point and the lab cannot show inelastic supply. The wording no longer claims it does. A supply
  intercept would be a model change.
- **Linear demand and supply functions.** The platform's own reference layer says they are not in
  the current guide, yet a dossier question, two generated calculation types and the market lab
  use them. Keep them as tagged enrichment, or remove them: a syllabus-scope decision.
- **Two concepts moved to HL.** Comparative advantage and the Phillips curve are now tagged HL, to
  match the platform's own subtopic metadata and dictionary. As a consequence SL students no longer
  see them in the Learn spine. Confirm that this is intended.
- **Chain ch3** is tagged SL but contains an HL-only Marshall-Lerner link. Tag the chain HL, or the
  link.
- **The model essay's demerit-good definition** uses one limb (negative consumption externality),
  as the guide does; the dictionary and one exemplar add the imperfect-information limb. Left as is.
- **Tariff and quota reversibility** are rated "High" in the policy toolkit, which places them in
  the "fast and reversible" cluster, while the platform's own text says their exit condition is
  rarely enforced.

**Diagrams not redrawn in this release**

- The **circular flow** needs a redesign rather than an edit (arrowheads and labels on the income
  and expenditure arcs; withdrawals leaving household income, injections entering spending).
- The **interest-rate stories** (`r1`, `c2`) still show the AD-AS plate without a shift. No existing
  plate shows a rate-driven fall in AD without implying something else; a new plate is needed.
- **Minor layout:** the S + quota line crosses the quota-rent label; the country labels on the
  comparative-advantage plate cross the lines; one curve crosses the deadweight-loss label on the
  tax and negative-consumption plates; the asymmetric-information marker sits about 10 px right of
  its intersection. The Lorenz builder's sliders are labelled in the order entered, although the
  computation now sorts them.
- **Legacy hand-drawn diagram code.** The 27 hand-drawn functions that the model-driven diagrams
  replaced are unreachable but still in the file (and contain geometry errors). Deleting them would
  save size; it was not done here to keep this release's diff reviewable.

**Real World cases left for the author**

- GLO-001 (US-China tariffs) stops before the 2025 escalation and the May 2025 Geneva agreement.
- The three ECB cases carry the country value "European Union" for euro-area policy; MAC-044 is
  now titled *Negative interest rates in the euro area*, but the filter value is unchanged.
- Sixteen cases are generalised teaching frames rather than single episodes; they carry the honest
  *Historical, source not opened here* label, but may deserve their own status.
- No deep card has its own source field, so their provenance line is generic. Figures for five of
  them were confirmed through search; none was added, because the primary documents were not opened.
- DEV-023 carries a *Taxation* theme tag without tax content; MAC-005's PLI outlay may have been
  revised since 2021.

**Verification limits**

- The IB guide could not be opened (the network proxy blocked ibo.org and copies of the guide), so
  the IB rules listed in section 8 were neither changed nor asserted; nor was the TOK "minimum of
  32 hours".
- Source URLs were confirmed through a search index, not loaded (section 7).
- **Current developments.** The brief asked for current developments separated from evergreen
  content, with dates and sources. What was built is *Where the numbers live*: for each current
  figure, what to look for, how to read it and which institution publishes it, with **no figures
  held**. No dated current-developments items were added, because no primary source could be
  opened in this environment, and a figure that cannot be dated and checked should not be shown as
  current. The data model (claim layer, source key, date) is ready for them.

**Platform costs**

- **The self-test runs on every page load**, synchronously, before the page responds to input. That
  was already the design; this release made the suite larger (section 10). On a first visit the
  five-second opening sequence covers it. On a reload or a deep link, which skip that sequence, it
  is the largest part of the wait before the page responds. See section 13.
- The page is about 9% larger than before, compressed (section 10): the new section, and the 63 KB
  audit suite, which every visitor downloads because the self-test runs in the page.

## 12. GitHub and Vercel deployment considerations

- The site remains static: no build step, no new runtime dependency. The only `package.json` is in
  `tests/`, so Vercel's root build is unaffected; `tests/` is served as static files like everything
  else and is harmless if left in the deployment.
- No environment variables, secrets or deployment settings were added or changed.
- `pages.yml` is still at the repository root, where it does nothing. Moving it into
  `.github/workflows/` would start a GitHub Pages deployment alongside Vercel, so it was left alone.
- The service worker cache was bumped to `aa-ibdp-econ-v11` so installed copies fetch the corrected
  page and data.
- There is no `vercel.json`; Vercel serves the repository root as static files, as before.
- The test harness's `node_modules` is not committed (it is ignored). The harness needs no secrets,
  so a CI job could run it once it installs Playwright's Chromium; no such job was added.
- All work is on the branch `claude/upbeat-hawking-69d7gz`; `main` was not touched.

## 13. Recommended next steps

**Recommended for a future release** (none of these was done in this one):

1. **Run the self-test on demand, not on every load.** Keep it for the first visit after a new
   version (compare a stored build hash), for `?qa`/`#qa`, for the teacher's Quality report and for
   the `tests/` harness; skip it otherwise. This would remove most of the start-up cost on a reload
   or a deep link without weakening any check.
2. **Re-extract the Exam DNA marks** from the source papers (limitation A7), then add a self-test
   that every question's part marks sum to its total.
3. **Decide the AD-AS short run** (show the inflationary gap in monetarist mode, and make the
   *Supply-side gain* preset raise potential output), then update the one self-test that encodes
   the current behaviour.
4. **Delete the unreachable hand-drawn diagram functions** in a change of their own, guarded by
   a test that every one of the 27 model keys still renders from its declared model.
5. **Redesign the circular flow** and add a rate-driven AD plate for the interest-rate stories.
6. **Open the IB guide** and settle the rules listed in section 8 (the AO-level rule, quoted
   markband wording, Paper 3 (a), IA exclusions, XED and linear functions); then decide the
   linear-functions content.
7. **Open the primary sources** for MIC-001 (PIB, GST rates) and DEV-047 (RBI state data), and
   add `src` fields to the deep cards once their documents have been read.
8. **Add dated current-developments items** to *Economics, Everywhere* only when each can carry a
   date, a named primary source and a claim layer, and a review date after which it is withdrawn.
9. **Grow the section**: more big questions in the thinner categories (Environment, Development,
   Global economy), and more *One economic idea* cards linked from the concept pages.
10. **Social previews.** Add an `og:image` and canonical URL once the production domain is fixed
    (a relative image URL is not read by most preview crawlers).
11. **Run `tests/` in CI** (a GitHub Actions job with Playwright) once the author wants a check on
    every push; it needs no secrets.

## 14. Implemented now, and recommended for the future

**Implemented in this release:** the *Economics, Everywhere* section (19 big questions, 12 real-life
cards, 16 ideas, 15 labs, the Economist's eye, *Where the numbers live*); search filters; local
personalisation for the section; the home-page tidy; about 195 audit corrections across diagrams,
calculations, language, cases, mindmaps, policy and assessment; four further defects found by the
new checks; one accessibility fix; 204 new built-in checks, 138 of them written from the audit
findings; a browser test harness with five suites.

**Recommended, not done:** everything in sections 11 and 13, above all the Exam DNA mark data, the
AD-AS short run, an on-demand self-test, reading the IB guide and the primary sources that could not
be opened here, and dated current-developments items once they can be sourced properly.
