# Release report

**Arjun Agrawal · IB DP Economics** · release 2026.09-f, *think like an economist*

Written on 29 September 2026. Every number here was produced by running something, and each
section says what was run.

**What is not in this release.** The brief is larger than one release. What was not done, and what
could not be checked, is in sections 26 and 27, stated plainly.

**Related documents**

- **The audit that came first:** [`docs/product-audit-2.md`](docs/product-audit-2.md), covering
  A–T.
- **The red-team reports** (diagrams, calculations, Real World): summarised in sections 13–17.
- **Earlier reports:** in [`docs/releases/`](docs/releases/).

**Nothing was rebuilt or removed.** The router, storage, service worker, offline mode, search,
print, import and export, and every existing test are unchanged in function. Every route, tab,
content record and home band is still there. The only content changes are corrections from the
three audits, each listed below.

---

## 1. Visual transformation

- **One system, used in more places.** The palette (obsidian, ivory, burgundy, brass), the display
  serif, the interface sans and the data mono are unchanged. They are now applied deliberately:
  - the brand line in the display serif;
  - the platform's numbers in the data face;
  - labels in spaced capitals.
- **A background system.** Six faint families of economic drawing are generated as vector
  textures: micro, macro, global, development, research and markets.
  - They sit behind section openers, weighted away from the page's own figure, and behind the home
    bands of the matching chapter.
  - At 3.5–7% opacity they never compete with text; the overlap audit confirms nothing is drawn
    under text.
- **Economic horizons.** The dark-to-paper hinge after the cover is kept. Between some later
  chapters the transition is itself economic: two curves meeting at an equilibrium, a cycle around
  its trend, or a data grid thinning into paper. They are used at five points, not everywhere.

## 2. Homepage transformation

**The cover**

- **The brand line leads.** *Think like an economist.* is the headline (up to 88 px), with
  *economist* in brass.
- **Beneath it:** a one-line statement ("A laboratory, a textbook and a research studio for IB
  Diploma Programme Economics…").
- **Five verbs,** each a door: Explore, Learn, Apply, Question, Master.
- **Three actions:** Start learning, Explore Real World, Explore the Lab.
- **The live model is unchanged.** It still moves and explains itself. Its six concept chips now
  show the concept's definition on hover and focus, taken from the concept page.
- **The author panel.** The portrait is a tall editorial panel in its own column, labelled *Author
  and guide*, with four data lines:
  - *Studied* Economics, St. Stephen's College;
  - *Taught* undergraduate Economics, Fergusson College;
  - *Teaches* IB DP Economics, Business Management and Global Politics;
  - *Mentors* UPSC Civil Services aspirants.
- **The numbers.** They run along the foot in the data face, still counted from the data and
  clickable.
- **Economics first below 1280 px.** The statement and the model share the first row, and the
  author becomes a wide card.
- **On the first screen at 1440 × 900:** statement, model, author and numbers all fit.

**The chapters**

- The page reads in eleven chapters, one verb each: Think, Learn, See, Interact, Connect,
  Practise, Research, Explore, Watch, Teach, About.
- "Economics is a way of seeing." opens chapter 01.
- **New bands:**
  - a Learn band: concepts, the course, misconceptions, the dictionary, command terms;
  - a Laboratory band: seven labs, from supply and demand to exchange rates, each saying what it
    teaches.
- Each band's own running number is hidden on the home page, so the chapters are the only
  numbering.

**The opening screen**

- The brand line becomes its typographic signature, at about 54 px.
- Behind the logo, seven economic ideas in two clusters (price, quantity, incentives; markets,
  trade, money, policy) are linked by lines that fade in once. No link crosses the centre.
- It is decorative (hidden from assistive technology), static under reduced motion, and left out
  on phones.

## 3. Logo transformation

**Why it blurred.** The supplied logo was a 760 × 462 palette PNG drawn as a CSS background, so it
blurred at any size above its pixels.

**The vector master**

- **Monogram:** traced from the supplied artwork at 8× and fitted to straight lines and cubic
  curves. The two A's and their arcs keep their geometry; the source's jagged edges are removed.
- **Wordmark and tagline:** set in Cinzel (SIL Open Font License) converted to outlines, placed on
  the original letter centres (the two initial A's taller, as in the original).
- **Rule:** the gold rule and diamond, redrawn.

**The files, in `assets/brand/`:**

- `logo.svg` and `logo-reversed.svg`. The reversed version keeps the gold on ivory; the supplied
  one was flat white.
- `monogram.svg` and `monogram-reversed.svg`.
- `wordmark.svg` and `wordmark-reversed.svg`.
- `app-icon.svg` and `app-icon-maskable.svg`.

**Where they are used**

- The page embeds the vectors in place of the PNGs, so the header, footer, opening screen and
  welcome dialogue are all vector, and the page is 11 KB smaller.
- The favicon is the monogram rather than an abstract cross.
- The seven PWA and Apple icons are rendered from the vector masters.
- The welcome dialogue shows the monogram, since the full logo's tagline was unreadable at 190 px.

**Checked** at 2× device pixel ratio: the header, the opening screen, the welcome dialogue, the
footer, and the favicon at 16, 32, 48 and 180 px.

## 4. About page transformation

About is now an intellectual biography, not a CV, readable in under a minute:

1. **Cover.** A dark band with the name at up to 124 px, four positions (Economics educator, IB DP
   practitioner, academic mentor, resource creator), one statement, and the portrait at full height
   in its own cell.
2. **At a glance.** Six credential blocks as data:
   - education;
   - higher education (Assistant Professor, Fergusson College);
   - IB Diploma Programme (BLISS and Symbiosis International Schools, Pune);
   - subjects;
   - mentorship (UPSC);
   - resource design.
3. **The journey.** A map of six stages, ending in this platform. Each opens what was taught, what
   it taught, and what it changed here.
4. **In the classroom.** The two contextual photographs as a diptych, each with one line.
5. **What I believe.** Six principles, among them "Models should explain, not decorate" and "Real-world
   evidence should challenge theory".
6. **The platform story.** Classroom → idea → resource → interaction → platform.
7. **The longer version.** The earlier prose is kept, folded shut.

**Facts and checks**

- Every fact is from the supplied profile.
- No institution is described as a current workplace; the existing self-test that scans every
  route still passes.
- Each photograph appears exactly once, at its own ratio.
- The portrait never has text or a figure over it: this is measured at four widths in
  `cover.mjs` and at 15 widths by the overlap audit.

## 5. Real World improvements

- **Each part of the case brief says what kind of statement it is:** Fact, Question,
  Interpretation, Model, Inference, Evaluation or Teacher guidance. Interpretation is never read as
  fact.
- **All 46 audit findings are corrected** in both copies of the data (section 17).
- **24 cases now open the diagram that shows their movement** (section 15).

## 6. Mindmap improvements

No structural change in this release. The *go further* links on each node (from the last release)
are unchanged, and the node pages gain the misconception and *Go deeper* layers through their
concept pages.

## 7. Lab improvements

- **The Laboratory home band** names seven labs and what each teaches: supply and demand,
  elasticity, indirect tax, externalities, AD–AS, trade and exchange rates. All seven already
  existed; none was rebuilt.
- **The elasticity lab** now draws perfectly inelastic demand as a vertical curve, and keeps the
  demand line inside the axes at all 4,800 settings.

## 8. Exam improvements

The rooms bar grows from ten rooms to fourteen:

- a calculation room;
- diagram practice;
- an evaluation trainer;
- command terms, labelled "IB terms, explained here".

Only the IB reference is labelled *Official IB information*, and a self-test holds that.

## 9. IA / EE improvements

- **The IA studio.** A research-notebook rail across the IA pages, in nine steps: article check,
  issue and key concept, diagram studio, analysis builder, evidence matrix, evaluation lab,
  structure check, portfolio and final quality check.
  - Each step opens a tool the platform already has.
  - It says that it never writes the commentary.
- **The EE Studio** already holds every tool the brief lists (research question lab, theory and
  models, evidence matrix, data lab, analysis, evaluation, reflection, academic integrity, red
  team, supervisor mode, quality check). It is unchanged.

## 10. New interactive features

- The cover's concept chips reveal their definition on hover and focus.
- The five-verb row.
- The About journey map.
- The folded *Go deeper* notes.
- The IA studio rail.
- The four new exam rooms.

## 11. New content

- **13 economist's notes**, for supply and demand, indirect tax, negative externality, price
  ceiling, labour market and minimum wage, monopoly, AD–AS, Phillips curve, PPC, foreign exchange,
  tariff, Lorenz/Gini and the multiplier.
- **12 misconception boxes** on 11 concept pages.
- **The About page's** six principles and five-step platform story.

All written for this platform.

## 12. Advanced economics content

Each note is folded shut beneath the core. It sets out:

- what the model must assume;
- what the evidence shows;
- measurement, where it matters;
- where economists disagree.

**Named studies**, cited so they can be found:

- Card and Krueger (1994), on the New Jersey minimum wage;
- Cengiz, Dube, Lindner and Zipperer (2019), on US state minimum wages;
- Diamond, McQuade and Qian (2019), on San Francisco rent control;
- Bernanke and Blanchard (2023), on 2021–23 US inflation;
- Amiti, Redding and Weinstein (2019), and Fajgelbaum et al. (2020), on the 2018 tariffs;
- Friedman (1968) and Phelps (1967), on the natural rate;
- Weitzman (1974), prices versus quantities;
- Dornbusch (1976), exchange-rate overshooting.

**Two rules the notes follow**

- No number is quoted that the note cannot attribute.
- Each note is labelled *Arjun Agrawal original commentary … not IB material or examiner guidance*.

One claim was softened in review: monopsony is "one explanation" of the minimum-wage evidence, not
the explanation.

## 13. Economic accuracy audit

The calculation red team ran every function in the page: 36 calculators, four marking paths and
seven tool models, with 3,000–5,000 generated items each.

**No formula is wrong.** Five major problems stopped correct answers from counting. All are fixed:

- **C1.** The gym marked the signed PED (−0.5) wrong.
- **C2.** The revision run and teacher starter asked for something other than what they marked.
  They now ask for what is marked (`cal.ask`).
- **C3.** The revision run rejected a PED magnitude.
- **C4.** "0,75" was read as 75, and a Unicode minus as a plus. One shared parser now handles
  decimal commas, thousands commas and both minus signs.
- **C5.** The iOS decimal keypad has no minus key. The answer fields now use the full keyboard.

**Minor, fixed**

- The revision run's tolerance was ten times looser than the board's.
- Large elasticities worked from rounded percentages were rejected. There is now a 1% relative
  tolerance, which still rejects an answer out by half.
- The wording was wrong at zero net property income and zero net exports.
- Impossible inputs were accepted: unemployment above the labour force, negative surpluses,
  leakages of 1 or more, bands above total income, a percentage change from a zero base.
- A zero quantity response is now called perfectly inelastic, and a negative PES is flagged.
- The Lorenz tool showed a 10⁹ ratio and a Gini of 1 for no income.
- Enrichment-only terms of trade was served in exam practice.

**Not done:** C13, a price × quantity basket CPI calculator. It was a coverage suggestion, not an
error.

## 14. IB accuracy audit

- **Source labels** on the exam rooms were re-checked. Only the IB reference is labelled official,
  and command terms are labelled as IB terms with platform explanations.
- **Guide edition.** The reference layer still rests on the Economics guide, first assessment
  2022. Whether a later edition is current could not be confirmed, because ibo.org is blocked from
  this environment. This is recorded in the reference layer and here, and was not resolved.
- **Nothing written in this release claims an IB requirement.**

## 15. Diagram audit

All 36 plates and 28 opener figures were recomputed. **No plate draws wrong economics.** Every
plate validates, with at most 0.03 px between a point and its curve. Ten issues were found, all
fixed:

1. **LRAS cases.** 15 cases describing an LRAS shift opened the Keynesian AS plate. They now open
   the growth plate.
2. **Case mappings:**
   - supply-shock cases open cost-push;
   - falls in AD open the deflationary gap;
   - MIC-008 leads with the positive-externality plate;
   - two appreciation cases say the exchange-rate plate runs the other way.
3. **Elasticity lab:** a vertical curve for perfectly inelastic demand, and clipping to the axis.
4. **PED plate:** labelled "D elastic" and "D inelastic", not D₁ and D₂.
5. **PES and FX plates:** state shifts in quantity units.
6. **PPC opener:** point C now lies between the two frontiers, so growth makes it attainable.
7. **Shift opener:** the arrow meets D₁.
8. **FX opener:** names the price of the currency.
9. **Library:** the PPC is filed under Foundations.

**Found by the extended overlap audit, also fixed**

- "Pw + tariff" was cut off at the frame's edge.
- The SRPC and MR labels sat on their axis titles.
- The quota plate's "S domestic + quota" was cut off.
- The PPC's point C label, as first moved, met point A's.

## 16. Calculation audit

See section 13. The built-in calculation self-test (491 checks) still passes. Eight new checks
cover each fix, among them:

- the parser (Unicode minus, decimal and thousands commas);
- the gym's signed PED;
- ask-what-is-marked;
- the input guards;
- the relative tolerance;
- the net-zero wording;
- the Lorenz edge cases;
- the elasticity edge cases.

## 17. Real World case audit

All 203 cases, the 12 deep cards and the worked stories were checked. **160 cases and 7 deep cards
were clean.** 46 findings in 43 cases were corrected: 2 critical, 9 major and 35 minor.

**Critical**

- **GLO-001's deep card** said the US–China bilateral deficit "barely moved". It fell from $419bn
  (2018) to $279bn (2023); it was the overall deficit that did not shrink. This was verified from
  Census figures.

**Major**

- **MIC-026:** the auto-enrolment case said no price changed. A mandatory employer contribution
  came with it, so the case no longer says the result "falsifies" the rational model.
- **Contested causes no longer stated as fact:** MIC-008, MAC-035, DEV-011 and DEV-015. DEV-015's
  exam note no longer rewards institutions as "the decisive factor".
- **MAC-051:** the Stability and Growth Pact dates from 1997, not 2012.
- **DEV-003:** MGNREGA was replaced by the VB-G RAM G Act from 1 July 2026. This was verified by
  the auditor from press reports.
- **GLO-048:** it now dates the US "manipulator" label (August 2019 to January 2020) and states the
  IMF's view, consistent with GLO-013.
- **MIC-029:** COEs are auctioned, not traded.

**Minor**

- Contested wording softened.
- Dates corrected: MAC-012, GLO-003, GLO-004, DEV-005.
- Nine dated cases brought up to date: MAC-029, MAC-044, MAC-008, MAC-018, GLO-002, GLO-008,
  MIC-025, MIC-054, DEV-018.

**Both copies of the data** were edited by one script that refuses any edit whose audited text it
cannot find. The dataset hash is recomputed to `5ceefae4951e2036` in both copies, and the existing
hash self-tests pass.

**Distinguishing fact from interpretation** is also shown on every brief (section 5).

## 18. Overlap audit

`tests/overlap.mjs` measured 64,563 elements over 20 routes × 15 widths (300 route-width
combinations). It reports:

- content over content;
- colliding figure labels;
- labels cut off by their band;
- figures under text;
- sideways scroll.

**New in this release**

- It reports a label running past its own figure. An SVG clips its own overflow, which the earlier
  checks could not see.
- It draws all 28 opener figures and all 36 diagram plates on their own at 620, 420 and 300 px, so
  figures on routes outside the 20 are covered too.

**How it worked in this release**

- The first run of the isolated check silently skipped the plates, because plates return data
  rather than markup. This was found and fixed; the check now renders plates the way the page does.
- It found the six label faults in section 15. The final run found nothing, and there were no page
  errors.

## 19. Responsive audit

**`widths.mjs`** runs 42 routes at 15 widths, from 320 to 2560 px: overflow, page errors, touch
targets and scrolling tables. It passed on the final code (section 23).

**The new layouts, checked visually:**

| Layout | Widths |
|---|---|
| Cover | 1440, 1280, 1024, 390 |
| About | 1440, 390 |
| Opening screen | 1440, 390 |
| Go deeper panels | 1280, 390 |
| IA rail | 1440 |
| Case brief | 1440 |

**Visual regression.** 12 pages at 7 widths, before (from `main`) and after: 84 + 84 screenshots.

- **The expected changes:** About (77–83% of pixels changed), home (13–22%) and IA (8–13%, the
  rail).
- **Other openers change by 0–16%.** That comes from the background textures and from type
  rendering in the before-shots; this was checked by eye for Real World and Mindmaps.

## 20. Accessibility audit

- **axe-core** (WCAG 2 A/AA and 2.1 AA) on 25 routes at 1366 and 375 px, with reduced motion,
  including About, a concept page with its Go deeper panel, a diagram plate, the IA and the
  elasticity lab: **no violations** on any of the 50 page runs.
- **Decorative elements** are hidden from assistive technology: the opening network, the horizons
  and the background textures.
- **The Go deeper notes** are native `<details>`, reachable by keyboard.
- **The concept-chip definitions** appear on focus as well as hover.
- **The About journey stages** are buttons with `aria-pressed`.
- **Answer fields** now accept a minus sign on iOS.
- **Contrast.** The About portrait caption was raised to meet contrast on the dark band before the
  axe run.

## 21. Performance audit

These are the median of five cold loads at 1366 px, with service workers blocked, against `main`
(3a433d8).

**Timing**

| | main | this release |
|---|---|---|
| First contentful paint | 448 ms | 420 ms |
| DOMContentLoaded | 3,283 ms | 3,393 ms (+110 ms, +3.4%) |
| Start-up self-test | 1,988 ms | 2,013 ms |
| JS heap | 157 MB | 148 MB |
| Home DOM nodes | 1,495 | 1,640 |

**Page size**

| | main | this release |
|---|---|---|
| `index.html` | 4,734,139 bytes | 4,819,171 bytes (+1.8%) |
| gzip | 1,676,720 bytes | 1,661,109 bytes (**−0.9%**) |

**Why the page downloads smaller.** The vector logos replace base64 PNGs, which compressed poorly.
The background textures add about 27 KB of CSS, uncompressed.

## 22. Source and copyright audit

- **Logo.** The vector logo reproduces the supplied artwork. The wordmark font is Cinzel under the
  SIL Open Font License, which permits embedding outlines.
- **New writing.** All new text is original. The economist's notes name published studies without
  quoting them.
- **No IB logo or protected branding** is used, and nothing is presented as IB material.
- **Secret scan** of the whole diff against `main`: no matches, and no credential files tracked.

## 23. Test counts

**In-page self-test:** 1,941 → **1,960 checks**, all passing on the final code. The 19 new
checks:

- 8 for the calculation fixes;
- 4 for the diagram fixes;
- 4 for the depth layer;
- 1 for the IA studio;
- 1 for the case kinds;
- 1 for About's structure.

**The Playwright harness** (`node tests/run-all.mjs`): **196 checks in 10 suites; every suite passed** on the final code. The count was 195 at the last
release; `overlap.mjs` gains the isolated-figure check.

| Suite | Checks | Result |
|---|---|---|
| `api-youtube.mjs` | 21 | 21 passed |
| `selftest.mjs` | 37 | 37 passed |
| `e2e.mjs` | 22 | 22 passed |
| `ecosystem.mjs` | 30 | 30 passed |
| `renaissance.mjs` | 25 | 25 passed |
| `cover.mjs` | 33 | 33 passed (four-width About check re-pointed at the new cover) |
| `pwa.mjs` | 4 | 4 passed |
| `widths.mjs` | 15 | 15 passed (42 routes × 15 widths) |
| `overlap.mjs` | 7 | 7 passed |
| `routes.mjs` | 2 | 2 passed (every tab, cold, at two widths) |

**Every new check can fail, and did.** Checks in this release that failed first and led to a fix:

- the front-page checks, when the headline gained markup;
- the About frame check, against the old layout;
- the overlap audit's clipping and isolated-figure checks, six label faults;
- the About journey check, when the panel it measured was removed.

## 24. Defects found

*Pre-existing* means the defect is on `main`; *this release* means it was introduced and caught
during this work.

| # | Defect | Origin |
|---|---|---|
| 1 | The logo blurred: a raster PNG scaled by CSS | Pre-existing |
| 2 | The favicon and app icons did not carry the brand | Pre-existing |
| 3–7 | Calculation marking C1–C5 | Pre-existing |
| 8–15 | Calculation C6–C12 and the Lorenz edge cases | Pre-existing |
| 16–25 | Diagram D1–D10 | Pre-existing |
| 26–71 | Real World R3-1 to R3-46 (2 critical, 9 major, 35 minor) | Pre-existing |
| 72 | "Pw + tariff" cut off at the figure's edge | Pre-existing |
| 73 | SRPC and MR labels on their axis titles | Pre-existing |
| 74 | "S domestic + quota" cut off | Pre-existing |
| 75 | The welcome dialogue's logo tagline was unreadable | Pre-existing |
| 76 | The cover's model below the fold at 1024 px, and the actions wrapping at 1440 px | This release |
| 77 | The opening network's lines drew as dashes, its dots as ellipses, and links crossed the logo | This release |
| 78 | The PPC's point C label, as first moved, collided and ran past the frame | This release |
| 79 | Go deeper: a heading inherited the wrong style, and "AD–AS" was lower-cased | This release |
| 80 | The About portrait caption had low contrast | This release |
| 81 | The isolated-figure check silently skipped all 36 plates | This release (in the test) |

## 25. Defects fixed

**All 81 are fixed.** Where each fix is described:

| Defects | Where |
|---|---|
| 1–2 | Section 3 |
| 3–15 | Section 13 |
| 16–25, 72–74 | Section 15 |
| 26–71 | Section 17 |
| 75 | Section 3 |

**Fixed during this release, before commit:** items 76–81.

## 26. Remaining limitations

**Parts of the brief not done in this release**

- A new knowledge-graph view (§11). Connections remain the related-content panels and mindmap *go
  further* links.
- A diagram-atlas toggle between diagram, mechanism, explanation, exam use and evaluation (§13).
  The plates already carry a reading guide and now a *Go deeper* note; the toggle itself is not
  built.
- New Economics, Everywhere stories (§15), a video studio redesign (§17), new educator pathways
  (§37) and new *My Economics* features (§36). The existing sections are unchanged.
- Concept-definition tooltips beyond the cover's six chips (§24).
- A new Real World layout with timelines, maps and before/after panels (§9). The case brief was
  extended, not redesigned.
- A full new content audit of every definition and explanation (§25). This release audited
  diagrams, calculations and Real World in depth; other content relies on the earlier audits.

**About**

The brief's possible milestones (MA Economics, MA Political Science, UGC NET / MH-SET) are not in
the supplied profile, so they are not on the page. Confirm them and they can be added to the
credential blocks and the journey in minutes.

**Guide edition:** unresolved (section 14).

**Limits of the testing**

- **Browsers.** Only Chromium was tested; no Safari, Firefox or real devices.
- **The live site** could not be opened from this environment; only the source was tested.
- **Overlap audit coverage.** It covers 20 routes plus every figure and plate in isolation, not
  every one of the roughly 150 tabs.

**Logo**

- **The monogram trace follows the supplied artwork.** A few sub-pixel irregularities from the
  source remain at very large sizes (visible above about 1,000 px wide).
- **Cinzel closely matches, but may not be identical to,** the face used in the original wordmark.

## 27. Manual tests required

1. **The logo.** Compare the vector logo with your original artwork at the largest size you use.
   Confirm the monogram and wordmark are faithful, and say whether the two-tone reversed version
   (ivory and gold) is acceptable in place of the flat white one.
2. **Phones.** On an iPhone (Safari) and an Android phone:
   - the opening screen;
   - the cover (drag the slider);
   - the About page;
   - typing a negative answer in the calculation board.
3. **Screen reader.** VoiceOver or NVDA on the cover, the About journey and a Go deeper note.
4. **Keyboard only.** Tab through the cover's verbs and chips (a definition should appear on
   focus), the exam rooms, the IA rail and the About journey.
5. **Your profile.** Confirm the author line and About facts, and send any credentials you want
   added (MA Economics, MA Political Science, UGC NET / MH-SET) with their exact wording.
6. **Wording.** Read the six principles, the platform story and the thirteen economist's notes,
   and change anything you would not say.
7. **Real World.** Spot-check the corrected cases, especially DEV-003 (the MGNREGA replacement
   date) and GLO-034 (the CBAM timing, medium confidence).
8. **Print.** Print About, a case and a concept page with its note open.
9. **Offline.** Install the app, go offline, and open the home page, About and a diagram plate.
   Check the new app icon on the home screen.
10. **Other browsers.** Firefox and Safari on a laptop: the opening screen, the cover and the
    background textures.
11. **Deployment.** On the Vercel preview, check the favicon, the app icons and the YouTube feed.
12. **Guide edition.** Confirm which Economics guide edition your students are assessed on.
