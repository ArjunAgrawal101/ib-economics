# Engineering and product report

**Arjun Agrawal · IB DP Economics** · release 2026.10-a, *the transformation, stage 1*

This report was written on 1 October 2026. A test is reported as passing only if it was run on
the final build and passed. Anything not run is listed under *Known limitations* and *Manual tests
still required*.

The brief asks for a phased transformation in thirteen phases. This release does three things and
records the rest:

- **Foundation.** It lays the architectural foundation (Phase 1).
- **Signature features.** It adds three features the platform lacked:
  - a sourced economic data lab and country profiles;
  - economists and ideas;
  - *Why did this happen?*
- **Navigation.** It simplifies the primary navigation.

Every other phase is mapped to what exists and what is next in section 19 and in
[`docs/architecture-decision.md`](docs/architecture-decision.md).

The previous release report is in [`docs/releases/`](docs/releases/).

---

## 1. What I found

**The product.** The platform was already broad, with over 2,000 self-tests:

- 30 sections and 179 tabs;
- lessons for all 31 subtopics;
- labs and a diagram atlas;
- 203 Real World cases;
- exam practice;
- IA and EE studios;
- teacher tools and a glossary.

Against the brief, the gaps that mattered were:

1. **No economic data with sources.** The *data lab* pages held constructed datasets for practice.
   *Where the numbers live* pointed to institutions but showed no series.
2. **No intellectual history.** No section on economists and ideas.
3. **No causal reasoning feature.** Nothing took a real-world *why* question from event to
   alternative explanations. The economic chain and the causation lab came closest.
4. **An over-built primary bar.** Fifteen primary items, against §59 of the brief.
5. **Thin discoverability.** Per-route titles and social cards existed, but there was no structured
   data. Hash routes (`#/…`) are invisible to search engines.

**The architecture.**

| Item | Finding |
|---|---|
| Inline JavaScript | 4.72 MB of the 5.05 MB `index.html` |
| Self-test at start-up | About 2.4 s |
| Deployment | A static GitHub Pages workflow, plus one Vercel-style serverless function for YouTube |

**The most serious finding:** the module sources and the build script that produce `index.html`
were **not in the repository**. They existed only in a working directory, so the shipped file
could not be rebuilt from the repository.

**Content checks made along the way.**

- **The platform marks 2.4 as HL only.** A writer challenged this, because the guide's outline
  does not mark 2.4 HL only. I checked the guide PDF's font data: every content line of 2.4 is set
  in bold, and the guide states that bold marks HL-only content. **The platform is right.**
- **The 3.4 tax-rate marking is correct.** This was confirmed the same way in the previous release.

## 2. What I changed

| Change | Files |
|---|---|
| **Source in the repository.** 28 modules and 3 stylesheets moved into `src/`. A repo-relative build step (`tools/build/splice.py`) was checked to rebuild `index.html` byte-identically. | `src/modules/`, `src/styles/`, `tools/build/splice.py` |
| **Base-file edits as a recorded, re-runnable migration.** Navigation order, drawer, priority, self-tests pinned to the old bar, structured data. | `tools/migrations/2026-10-01-navigation-and-structured-data.py` |
| **Economic data lab:** explorer, country profiles, markets and prices, sources and method | `src/modules/24-datalab.js`, `assets/data/econ-data.js`, `tools/build/build_data.py` |
| **Economists and ideas** (16 profiles and a timeline) and ***Why did this happen?*** (11 pathways) | `src/modules/25-ideas-index.js`, `26-ideas.js`, `assets/data/ideas.js`, `src/content/ideas/`, `tools/build/build_ideas.py` |
| **Navigation:** eight primary items, a grouped More menu, the drawer, search records, a home band | `src/modules/27-wire-t6.js`, `04-home.js` |
| **Self-tests:** 18 new; 4 existing ones updated where they pinned the old fifteen-item bar | `src/modules/28-tests-t6.js`, base self-tests |
| **Browser tests:** a new suite; overlap and width audits extended; a date-dependent test fixed | `tests/transform.mjs`, `tests/overlap.mjs`, `tests/widths.mjs`, `tests/renaissance.mjs` |
| **Service worker:** cache v14 → v15; precaches the two new data files | `service-worker.js` |
| **Documentation** | `docs/architecture-decision.md`, `README.md`, `tests/README.md`, this report |

## 3. Architecture decisions

**Decision: a staged hybrid (option D), not a framework migration.** Options A to D are scored in
`docs/architecture-decision.md`. In short:

- **Why not a framework now.** Re-implementing 4.7 MB of tested behaviour would bring no learner
  benefit this year. It would also invalidate the 2,000-check self-test system.
- **What the real problems are, and their targeted fixes:**
  - source outside the repository: **fixed**;
  - content inside the HTML: being moved out, file by file;
  - everything loading at start-up: new features load on demand;
  - hash routes invisible to search: a pre-render stage, which needs the production domain.

**Pattern adopted for new content:** a versioned, hashed data file loaded on demand, plus a small
resident index for lists, search and self-tests.

- **The ideas index** is 8.7 KB in the page; the full text is 165 KB, fetched only when a profile or
  pathway opens.
- **The data lab** works the same way: 229 KB, fetched only when a data page opens.
- **The start-up self-test** renders every tab. A guard stops it fetching either file.
  `tests/transform.mjs` confirms neither file is requested until a page needs it.

**Navigation, decided in one place.** The bar's order is set once, at the end of the build.

- **The More menu** is built from one literal list and appends any section not named. A section
  cannot become unreachable, and a self-test checks it.
- **Earlier choices kept:**
  - Real World and Mindmaps stay the last two items the bar gives up;
  - Resources stays first in the More menu.
- **Earlier choice replaced:** EE Studio, Videos, Dashboard, IA, Educators, Think and About were on
  the bar. They move to the More menu and the drawer, because the brief asks for a simple bar
  (§6, §59). The four self-tests that pinned the old bar now test the new rule, and each change is
  in the migration script.

## 4. New functionality

**Economic data** (`#/data`)

- **Data explorer.**
  - Pick an indicator and up to five economies, and set the years.
  - Each economy keeps its colour when others are added or removed.
  - Read the chart with the mouse or the arrow keys: the crosshair announces the year and every
    value.
  - Open the numbers as a table.
  - Beside the chart: facts computed from the values shown (latest value, change over the period,
    high and low), and questions an economist would ask, linked to their lessons.
- **Country profiles.** One economy, every indicator, with the world for reference, plus that
  economy's Real World cases.
- **Markets and prices.** Brent crude, the US 10-year Treasury yield, US unemployment, and 23 exchange
  rates against the US dollar.
- **Sources and method.** Every series, its source, code, licence, coverage and notes, and what the
  pages do not do.

**Economists and ideas** (`#/ideas`)

- **Sixteen profiles:** Smith, Ricardo, Malthus, Marx, Marshall, Pigou, Keynes, Joan Robinson, Hayek,
  Friedman, Sen, Ostrom, Stiglitz, Banerjee, Duflo and Acemoglu.
- **Each profile covers:**
  - the problem they faced;
  - three or four central ideas;
  - the lasting contribution;
  - what their models assume;
  - influence;
  - criticisms and limits;
  - why it still matters;
  - a common misreading;
  - an inquiry question;
  - confirmed works and prizes;
  - links into lessons, the glossary, the diagram atlas, and the thinkers they answered.
- **A timeline** of lifespans.

**Why did this happen?** (Think › *Why did this happen?*)

- **Eleven questions:** inflation, unemployment, slowing growth, depreciation, a rate rise, a
  recession stimulus, tax incidence, a subsidy, a tariff, slow supply-side reform, and pollution.
- **How each works:**
  1. The student commits to a prediction for each variable.
  2. They step through eleven stages: event, starting conditions, mechanism, who acts, the diagram,
     what changes (predictions marked), short run, longer run, evidence (linked to Real World
     cases), evaluation, and alternative explanations with how to tell them apart.
- **HL-only parts are labelled.**

## 5. New content architecture

| Content | Source (edit here) | Built by | Shipped as |
|---|---|---|---|
| Economists, causal pathways | `src/content/ideas/economists.json`, `causal.json`, review patches `rt-t6.json` | `tools/build/build_ideas.py` | `assets/data/ideas.js` (version `ideas-2026.10.1`, hashed), `src/modules/25-ideas-index.js` |
| Economic data | Open-data packages, downloaded to `tools/build/.cache/` (not committed) | `tools/build/build_data.py` (`RETRIEVED=… --refresh` to update) | `assets/data/econ-data.js` (version `data-2026.10.1`, hashed) |
| Modules and styles | `src/modules/`, `src/styles/` | `tools/build/splice.py` | `index.html` |

Every new record has a stable id: an economist's surname, a pathway's id, an indicator code, an
entity's ISO code.

**Review.**

- **Patches.** The review patches are exact, addressed substring replacements: 12 applied, 0 skipped.
- **Build checks.** Every subtopic, diagram, case and glossary id is validated against the
  platform's own id list. The text is checked for absolute claims.

## 6. Visual improvements

- **New surfaces in the existing visual system:** the editorial page opener, mono labels, serif
  headings, hairline borders, the ivory surface and the brass accent. No new visual language.
- **Charts:**
  - **Palette.** A five-colour palette in the site's hue families (blue, ochre, teal, violet,
    burgundy), stepped until it passed the dataviz validator. It clears the lightness band, chroma
    floor, colour-blind separation (worst adjacent ΔE 8.6, protanopia), normal-vision separation and
    3:1 contrast on the ivory surface.
  - **Marks.** One axis, 2 px lines, a recessive grid and direct end labels.
  - **Size.** Charts are drawn at the width they are shown, so their text is its true size on a
    phone and on a wide screen.
- **Home:** a three-column band (*Reason · Evidence · Ideas*) in the *Explore* chapter.

## 7. UX improvements

- **The bar.** Eight primary items. At 1366 px, Course, Lab, Real World and Mindmaps show, with the
  rest in More. On a phone the bar is replaced by the drawer, which now includes the data lab and the
  economists.
- **The More menu** is grouped by intent: *Learn and explore*, *Exam and research*, *Your work*,
  *Teach*, *About*. *Why did this happen?* is reachable from it directly.
- **States.** Every new page has a loading state that is itself useful (what the page holds and how
  to use it), and an error state with a retry. Neither shows numbers.
- **Addresses.** Deep links, refresh and Back/Forward work for profiles and pathways.

## 8. Interactive features

- **The data explorer:** choose, add, remove, change years, read by mouse or keyboard, open the table.
- **Prediction before explanation** in every causal pathway, marked against the answer at step 6.
- **The timeline:** select a name to open the profile.

The existing labs, simulators, diagram builder and atlas are unchanged.

## 9. IB functionality

- **HL labelling.** HL-only content is labelled in the new material, as in the rest of the platform.
  The review added HL labels where the guide marks content HL only: nudges, the multiplier, crowding
  out, the Phillips curve, diminishing returns and utility, automatic stabilisers, the J-curve.
- **Links into the lessons.** Pathways and profiles link to the IB subtopics that use them. The
  data explorer's questions link to their lessons.
- **No new IB claims.** This release makes no new claim about IB requirements.

## 10. Assessment functionality

No change this release. The question bank, Exam DNA, paper labs, Exam cockpit and revision mode are
as they were and pass their tests.

**Exam intelligence** (classifying mistakes by skill, §46) is recommended for the next phase. The
existing *Why did I lose marks?* and *Answer diagnostic* are the base it would build on.

## 11. Data functionality

**Series**

| Kind | Series | Source |
|---|---|---|
| Country | GDP (current US$) | World Bank / OECD |
| Country | GDP per capita | Computed: GDP ÷ population |
| Country | Inflation, consumer prices (annual %) | World Bank (from IMF IFS) |
| Country | Population | World Bank |
| Country | Gini index | World Bank PIP |
| Country | CO₂ per person (converted from carbon) | CDIAC-FF, to 2020 |
| Single | Brent crude (annual average) | EIA |
| Single | US 10-year yield (monthly) | Federal Reserve H.15 |
| Single | US unemployment (annual) | BLS CPS |
| Exchange rates | 23 currencies against the US dollar, monthly, to August 2026 | Federal Reserve via FRED |

The country series cover 25 economies, the world and the four World Bank income groups.

**How the data were obtained.** The World Bank API was blocked from the build environment. The data
come from the open-data packages at `github.com/datasets`, which republish these institutions'
series under PDDL or CC BY 4.0 licences.

**Errors caught.** Two errors in those packages' own metadata were found by checking values against
known figures:

- **Inflation.** The *cpi* package labels its column a 2005 = 100 price index, but downloads
  `FP.CPI.TOTL.ZG`. The values are inflation rates: US 8.0% in 2022, 13.5% in 1980, −0.4% in 2009.
  The series is published under its true name.
- **Exchange rates.** The *exchange-rates* README says the euro, pound and Australian and New Zealand
  dollars are quoted in US$ per unit. The values are local currency per US$: 0.61 pounds per dollar
  in January 2000, when a pound bought about $1.6. All are shown as local currency per US$.

Both are recorded on *Sources and method*.

**Rules followed.**

- No value is estimated or interpolated.
- Every chart names its source, code and retrieval date (1 October 2026).
- Computed and converted series say so.
- The pages do not interpret movements: the questions are for the student.

## 12. Search and discovery

- **New search records:**
  - 16 *Economist* records;
  - 11 *Why did this happen?* records;
  - 4 *Data* records, with aliases (e.g. "cpi", "currency", "depreciation").
- **A filter group** in the command palette: *Ideas, reasoning and data*.
- **Contextual links:**
  - each economist links to lessons, glossary terms, diagrams and other thinkers;
  - each pathway to lessons, diagrams, Real World cases and the next pathway;
  - each country profile to its cases;
  - each indicator to its lessons.

## 13. Personalisation

- **Saved on this device:** the data explorer's indicator, economies and years; each pathway's
  predictions and progress.
- **Nothing is sent anywhere.**
- **No new tracking, streaks or recommendation claims.**

## 14. Accessibility

**axe-core** (WCAG 2 A/AA and 2.1 AA), run on the final build:

- **Coverage:** 49 routes, including the 9 new pages, at 1366 and 375 px with reduced motion. That
  is 98 page runs. Each route was confirmed to open the tab it names.
- **Result: 0 violations.**

**The first scan of the new pages found three faults; all were fixed:**

1. **The chart's interactive layer.** It was a focusable `rect` with an ARIA label inside an SVG
   marked as an image. It is now a separate `role="slider"` layer: arrow keys, Home and End move a
   year at a time, and the value is announced as text: the year, then each economy with its value
   (or "no value").
2. **The economists' timeline.** It held links inside an image role. It is now `role="group"`.
3. **The brass step numbers.** They were below 4.5:1 on ivory. They now use the darker brass ink.

**Also in place:**

- Every chart has a text alternative summarising each line, and a table of its numbers.
- Identity is never colour alone: legend, direct labels and a validated palette.
- Prediction choices are radio groups with fieldset legends.
- Loading and error states are live regions.

## 15. Performance

`perf2.mjs`: the median of five cold loads at 1366 px, service workers blocked, `main` (8e2efbc)
against this build, one after the other on the same machine.

| | `main` | This release |
|---|---|---|
| First contentful paint | 188 ms | 180 ms |
| DOMContentLoaded | 3,411 ms | 3,580 ms (+169 ms, +5.0%) |
| Start-up self-test | 2,255 ms (2,019 checks) | 2,231 ms (2,037 checks) |
| JS heap | 177 MB | 188 MB |
| Home view DOM nodes (`domcmp.mjs`) | 1,217 | 1,240 (+23: the new band) |

**Sizes**

| File | `main` | This release |
|---|---|---|
| `index.html` | 5,054,696 bytes (1,724,239 gzipped) | 5,125,070 (1,746,049 gzipped, +1.3%) |
| `assets/data/econ-data.js` | — | 229,499 (67,144 gzipped), **loaded only when a data page opens** |
| `assets/data/ideas.js` | — | 165,376 (51,680 gzipped), **loaded only when a profile or pathway opens** |

**Lazy loading is verified.** `tests/transform.mjs` records network requests: neither file is
requested at start-up or on the home page.

**What this means.**
- The start-up path grew by the 8.7 KB index and the new modules: 22 KB gzipped in all.
- The 117 KB gzipped of new content arrives only for those who open it.
- No framework or dependency was added.

## 16. SEO

- **Added:** JSON-LD `WebSite` data (name, language, description, audience, author, free access).
  A self-test checks it claims no URL, endorsement or affiliation.
- **Already present:** per-route `<title>` and social-card metadata.
- **Not done, deliberately:**
  - **canonical URLs and a sitemap**, because both need the production domain, which the repository
    does not record;
  - **crawlable per-page URLs**, because the router uses `#/` addresses.

  The plan is a pre-render build step: static HTML per lesson, economist, case and data page
  (`docs/architecture-decision.md`, stage 4).

## 17. Testing

**Every result below was run on the final build.** The one exception: after the full run, one string
in the data lab's loading text was corrected ("25 economies, the world and four income groups"). The
affected suites were re-run on that build, and both passed: `selftest` (2,037 checks) and `transform`.

**In-page self-test: 2,037 checks, 0 failures** (2,019 on `main`).

- **18 new checks:**
  - 6 for the data lab;
  - 5 for the ideas index and pages;
  - 2 for the new Think tab;
  - 2 for navigation;
  - 1 each for search, structured data and the home band.
- **Updated:** 4 existing checks that pinned the old fifteen-item bar now test the new rule, so the
  earlier decisions they protected are still covered (section 3).

**Playwright harness: 13 suites, 316 checks, all passed.**

- `run-all.mjs` ran the first ten suites, and they passed. The run then reached the background time
  limit inside `routes`.
- `routes`, `intro`, `course` and `transform` were then each run to completion, separately, on the
  same build. `routes` is counted once, from that complete run.

| Suite | Checks | Result |
|---|---|---|
| `api-youtube.mjs` | 21 | 21 passed |
| `selftest.mjs` | 37 | 37 passed (2,037 in-page checks) |
| `e2e.mjs` | 22 | 22 passed |
| `ecosystem.mjs` | 30 | 30 passed |
| `renaissance.mjs` | 25 | 25 passed (the desk checks were reordered; see below) |
| `cover.mjs` | 33 | 33 passed |
| `pwa.mjs` | 4 | 4 passed |
| `widths.mjs` | 15 | 15 passed (45 routes × 15 widths, 320–2560 px) |
| `overlap.mjs` | 7 | 7 passed (31 routes × 15 widths; 118,637 elements measured; 0 overlaps) |
| `routes.mjs` | 2 | 2 passed (193 routes, cold, at 375 and 1366 px) |
| `intro.mjs` | 48 | 48 passed (exit fade at exactly start + 5000 ms at all six widths) |
| `course.mjs` | 39 | 39 passed |
| `transform.mjs` | 33 | 33 passed (**new**) |

**`transform.mjs` checks:**

- Lazy loading, by network request.
- The eight-item bar and the grouped More menu.
- Adding and removing economies, with colours kept.
- Computed series labelled.
- Hover, and arrow-key reading.
- The numbers table, and sources with retrieval dates.
- Country profiles, markets and prices, and sources and method.
- All 16 profiles listed, with full text loading and a link into the lesson.
- Back and Forward.
- The timeline.
- A pathway from prediction to all eleven steps, with predictions marked.
- A cold deep link and a refresh.
- A simulated failed download showing an error and a retry, with no numbers.
- No sideways scroll at 360, 768 and 1440 px.
- No page errors.

**A test defect found and fixed: the desk.** The `renaissance` desk checks failed on this date, and
fail identically on `main` today.

- **Why.** The test opens the idea of the day before checking that a first visit has a folded desk.
  On dates when that idea records an activity, the desk is no longer in its first-visit state.
- **The fix.** The desk checks now run first, while the visit is still a first visit. Nothing in the
  app changed.

**Other checks run:**

- **Console.** No console errors or warnings on the ten new routes.
- **Secrets.** A scan of the 1.36 MB diff against `main` for keys, tokens, private keys and
  `YOUTUBE_API_KEY` values found 0 matches. No credential files or raw data downloads are tracked.
- **Build.** `tools/build/splice.py` rebuilt `index.html` byte-identically, and the two data builders
  reproduced their files byte-identically.
- **Review.** The new content was red-teamed: 12 patches applied. Both writers' outputs were
  validated for ids and absolute claims.

## 18. Known limitations

- **Data are a snapshot,** retrieved 1 October 2026, not live. Recent years can be provisional.
  Gini data are sparse; CO₂ ends in 2020; Argentina has no inflation series in the source.
- **GDP and GDP per capita are in current US dollars,** not PPP or constant prices. The pages say
  so. Real GDP growth is not in the collection, because no current source was reachable from the
  build environment.
- **The SEO limits** are those in section 16.
- **The start-up self-test still runs about 2.4 s at every load** (stage 3 of the plan).
- **The bar is narrow.** At 1366 px the header's right-hand tools leave room for about four primary
  items, so Exam, Learn, Practise and Everywhere sit in More at that width.
- **The base of `index.html` is not yet split into modules.** It is edited through recorded
  migration scripts until stage 2.

## 19. Remaining opportunities

The brief's phases, and where each stands:

| Phase | Status |
|---|---|
| 1 Repository and architecture foundation | **Implemented** (stage 1) |
| 2 Content and data architecture | **Partially implemented:** the pattern exists; the older content is still inside the HTML |
| 3 Design system refinement | **Partially implemented:** charts and new surfaces use the system; there is no design-token documentation yet |
| 4 Navigation and discoverability | **Implemented** (bar, More menu, drawer, search, contextual links); pre-rendering is future |
| 5 Core knowledge system | **Implemented earlier** (31 lessons) and extended (economists, pathways) |
| 6 Interactive lab | **Existing:** labs, simulators, atlas, builder. Graph-studio additions are future |
| 7 IB ecosystem | **Implemented earlier** |
| 8 Exam practice and revision | **Existing;** exam intelligence (§46) is future |
| 9 IA Lab | **Existing** (IA studio, article checker, portfolio tracker) |
| 10 Data and real-world | **Implemented:** data lab and country profiles, alongside the existing 203 cases |
| 11 Personal workspace | **Existing** (My economics, workspace) |
| 12 Teacher experience | **Existing** (teacher tools, educator studio) |
| 13 Performance, accessibility, polish | **Partially implemented:** lazy loading for new content; the start-up cost remains |

## 20. Recommended next phase

1. **Stage 3, the start-up cost.** Run structural self-tests at start, and content sweeps at idle
   time or in the harness. Measure the intro with it.
2. **Exam intelligence.** Tag each question's mistakes by skill (definition, diagram, application,
   analysis, evaluation), and drive *what next* from them.
3. **The data lab's next series.** Real GDP growth, unemployment for more economies, the current
   account, government debt, as sources become reachable. Then link each Real World case to the
   series it discusses.
4. **Pre-rendering** once the production domain is confirmed.
5. **The graph studio:** a guided and exploratory mode over the existing diagram builder.

---

**Implemented:** sections 2, 4, 5, 11 and 12; the architecture of section 3; the navigation in
section 7.

**Partially implemented:** phases 2, 3 and 13 (section 19).

**Recommended for the future:** section 20 and stages 2–5 of `docs/architecture-decision.md`.

## Manual tests still required

These were **not** run:

1. **Real devices.** iOS Safari and Android Chrome, for the data explorer's touch reading and the
   prediction steps.
2. **A screen-reader pass** over the chart slider, the pathway steps and a profile.
3. **Safari and Firefox,** for the data pages and the More menu.
4. **Your review of the profiles and pathways.** Read them as their author before they are used in
   class.
5. **A decision on the production domain,** so canonical URLs, a sitemap and pre-rendering can be
   built.
