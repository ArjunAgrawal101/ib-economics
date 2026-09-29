# Release report

**Arjun Agrawal · IB DP Economics** · release 2026.09-d, *the renaissance*

Written on 29 September 2026. Every number here was produced by running something, and the report
says what was run. What could not be checked is listed in sections 15 and 16.

Earlier reports are kept in [`docs/releases/`](docs/releases/):

- [2026-09-26](docs/releases/2026-09-26-release-report.md): the ecosystem.
- [2026-09-25](docs/releases/2026-09-25-release-report.md): *Economics, Everywhere* and the first
  content audit.
- [2026-09-22](docs/releases/2026-09-22-release-report.md): live IB verification.

The visual audit that came before this work is in
[`docs/visual-audit.md`](docs/visual-audit.md). The five content audits and what was done with each
finding are in [`docs/audits/2026-09-29/`](docs/audits/2026-09-29/).

The platform was not rebuilt:

- It is still one static `index.html` with the same router, storage, service worker and self-test.
- No route, tab, storage key, section or content record was removed.
- Everything new is one spliced module (JavaScript and CSS) that wraps existing functions, plus
  corrections to existing content.

---

## 1. Visual redesign

The audit found five structural reasons the site felt plain. Each was addressed:

| Finding | What changed |
|---|---|
| **One opener for every page.** About 190 heroes shared one dark band and one decorative cross, which was economically empty (the same supply-and-demand cross sat above *comparative advantage*, *inequality* and *exam technique*). | A **motif engine** draws a real, labelled diagram for what each page is about. Concept pages draw their subtopic's model, cases draw the case's own diagram, and sections draw their subject. |
| **No section identity.** | Section registers: journal paper, newsroom, graph paper, ruled exam paper, node field, magazine, research notebook, slate workspace. |
| **One container for every idea.** The home page was 14 equal-weight bands, mostly card grids, 11,417 px long. | An editorial sequence with a change of scale: a drawn opener, a two-tier gateway, a daily front page, a lead story, a dark network band and counted figures. The desk folds on a first visit, and the first-visit home page is now about **9,960 px**. |
| **Chart labels in fonts the page never loads.** Inter, Helvetica, IBM Plex Mono and Georgia fell back to system faces. | One CSS rule maps them to the loaded faces (CSS outranks SVG presentation attributes). |
| **A flat rhythm.** | Feature headings in the display face with a brass rule, a heading rule that extends as the section arrives, small-capital eyebrows, and a colophon footer. |

## 2. The design system

**Colour.**

- The existing obsidian, burgundy, chalk and ivory remain the foundation.
- New tokens:
  - **brass** (`--brs`, from the logo's gold) for rules, ornaments and figure accents;
  - **ivory paper** (`--paper`) for scholarly openers;
  - **graphite** for the exam room;
  - **slate** for the professional register.
- Semantic diagram colours (demand blue, supply copper, loss red, policy gold) are unchanged, and
  brand burgundy never enters a figure; a self-test enforces this.

**Typography.**

- The pairing already loaded was kept: Bodoni Moda (display), Source Serif 4 (editorial), Manrope
  (interface) and JetBrains Mono (data).
- They are premium faces, already cached by returning visitors. Replacing them would have added
  weight and changed every page for no gain in hierarchy.
- The fixes are in roles:
  - display serif for openers and feature headings;
  - mono for data and figure captions;
  - small-capital sans for eyebrows (`font-variant-caps`, so the underlying text is unchanged for
    search and assistive technology);
  - SVG labels mapped to the loaded faces.

**Spacing.** The existing scale (`--s1` to `--s7`) is kept. The home page uses a tighter band rhythm.

**Cards.** Two tiers on the home page: a feature card with a full figure, and a compact index row
with a thumbnail. The existing panels are unchanged elsewhere.

**Buttons.** The existing styles, plus an `on-ink` variant for dark bands.

**Icons.** Thirteen line glyphs for the named teaching components, stroked in each component's
colour.

**Data visualisation.**

- Every figure has labelled axes, labelled curves, a caption (figure number style) and the
  equilibrium at the true intersection.
- Illustrative data is labelled as such. No figure presents a real statistic.

**Sections.** The registers listed in section 4.

**Animation.**

- Curves draw on once, the equilibrium pulses gently and figures count up.
- Gateway figures draw on hover.
- Everything stops under `prefers-reduced-motion`, and the motion layer is not switched on at all.

**Mobile.**

- Below 1,000 px the figure becomes a faint watermark behind the opener text.
- The gateway, daily page and lead story collapse to one column.
- The mindmap network becomes a wrapped list.

## 3. New graphics

There are **28 original SVG motifs**, each built from stated functions:

- **Markets:** supply and demand, demand shift, indirect tax, subsidy, maximum price, minimum price,
  PED comparison.
- **Market failure and the firm:**
  - negative production externality;
  - costs and revenue (MC through minimum AC, MR twice as steep as AR);
  - labour market with a minimum wage;
  - goods classified by rivalry and excludability;
  - a pricing game with its Nash equilibrium.
- **Macroeconomics:** AD–AS with LRAS, short- and long-run Phillips curves, the business cycle (with
  its true turning points), the circular flow, the Lorenz curve.
- **The global economy:** PPC with growth, comparative advantage (linear PPCs), tariff, exchange
  rate, trade network (schematic).
- **Development:** the poverty cycle, a diagram the coverage audit found missing.
- **Other:** scatter with a fitted OLS line (illustrative data), Paper 1 (b) markbands (from the
  guide, p. 63), the nine key concepts as a network, a research page, and model versus observation.

Each motif is used in three ways:

- in page openers;
- in the home gateway, on paper;
- in the toolkit and lead story, as figures with captions.

The footer carries a small supply-and-demand rule.

## 4. New backgrounds

Textures are drawn in CSS at 3–6 % opacity, with one texture per register:

- **Analytical grid:** every dark opener.
- **Journal paper with a warm vignette:** Course, Learn, TOK and Educators.
- **Research notebook** (ruled lines and a red margin): EE Studio and IA.
- **Newsroom column rules with a double head rule:** Real World.
- **Fine graph paper:** Lab, Calculate and Tools.
- **Ruled answer paper on graphite:** Exam, Exam DNA, Papers, Practise and Timed sessions.
- **Node field:** Mindmaps.
- **Magazine dot screen on burgundy-black:** Economics, Everywhere.
- **Diagonal field on slate-black:** Think.
- **Slate:** Teacher tools.

The CSS classes `.bg-grid`, `.bg-ledger`, `.bg-dots`, `.bg-margin`, `.bg-paper` and `.bg-ink` are
available to any band.

An opener turns to paper only when it holds nothing but its heading and lede, so no control designed
for the dark band is ever placed on ivory.

## 5. New content

- **The economist's toolkit** (Think, last tab, `#/think/economist-s-toolkit`).
  - It has 18 lenses: incentives, opportunity cost, marginal thinking, trade-offs, elasticity,
    equilibrium, efficiency, equity, externalities, information, market power, interdependence,
    expectations, time, risk, uncertainty, institutions and behaviour.
  - Each lens has a one-line idea, three questions, its own figure, and links into the platform
    found through the search index.
  - The toolkit also sets out fourteen questions for any economic claim.
  - It is labelled as a teaching frame. The IB's nine key concepts are shown as the IB's own.
- **Lens questions on every concept page and every Real World case**, chosen for the page's
  subtopic.
- **A reading guide for all 35 diagram plates**, answering four questions: *What changes? Why does
  it change? What the diagram does not show. Common mistake.* Each guide is written from the plate's
  own labels and numbers and labelled teacher-created.
- **Home bands:**
  - *Explore Economics*;
  - *Today in Economics* (the economic idea of the day, a case, a question and a word);
  - the Real World lead story;
  - the mindmap network;
  - *Economics at a glance*.

## 6. Content corrections

All of these came from the five read-only audits in `docs/audits/2026-09-29/`.

**Terminology (20 changes).**

- Demand vs quantity demanded: the bag charge, the Veblen effect, automation.
- Rent caps and quantity supplied.
- The subsidy drill now names its recipient.
- Inflation rate vs price level.
- Evidence described as "consistent with", not as proof.
- Tax incidence by *relative* elasticities.
- "The only route" and "entirely" withdrawn.
- The monopsony minimum-wage sentence.
- Financial (not capital) account.
- Customs union vs single market.
- Devaluation of a controlled rate.
- Marshall–Lerner stated "in absolute value".

**Real World (37 changes, both copies, data hash recomputed to `67ae660860fd08eb`).**

- Confident corrections:
  - Singapore's COEs are auctioned, not tradable.
  - Bretton Woods broke down in 1971–73.
  - HIPC dates from 1996.
  - Korea's industrial drive dates from 1973.
  - China's poverty figure now names its line.
  - The DEV-007 deep card's residual "1978".
- Softened causation: Energiewende, ECB quantitative easing, Weimar, the UK mini-budget.
- Precise terms: plastics directive, deemed consent, EU ETS coverage, CBAM, TCA, RCEP.
- Dated wording given a date: EEG levy, California, IRA, Argentina, Australia–China, Chile,
  Stability and Growth Pact, China youth unemployment.
- One unsourced figure removed (the GLO-003 "more than a third").

**Definitions (11 changes).**

- Growth is usually necessary for sustained development but not sufficient (two surfaces had said
  otherwise).
- Supply-side is the family aimed at capacity, not the only thing that raises it.
- The Keynesian AS has its upward-sloping range.
- A subsidy may be paid to consumers.
- Choice architecture vs nudge.
- The PED quiz keeps the sign.
- Community surplus is maximised at the free-market outcome only without externalities.
- Merit goods are filed under 2.8.
- Allocative efficiency is stated in social terms.

**Diagrams.**

- *Wrong economics:*
  - The market lab's tax could push output below zero; it is now capped.
  - The Everywhere AD–AS "before" SRAS was drawn 50 points too low.
  - The monetarist AD–AS marker sat off the drawn SRAS.
- *Misleading:*
  - The Lorenz builder shaded B instead of A.
  - The subsidy lab cropped the producer price and mislabelled the curve.
- *Cosmetic:* PPC chord, cycle markers, the Phillips duplicate label, the Lorenz label, label halos,
  tick collisions, and plate padding on phones.

**Deliberately not applied.**

- The definitions audit proposed "primary and secondary income" for the current account. The
  guide's own list says "income" and "current transfers", which the site already uses.
- One case change that could not be confirmed (MGNREGA's replacement) is worded as a check, not
  asserted.

## 7. New features

- *Random Economics*: a filterable, editorial "surprise me" across ten kinds of content. It is in
  the home gateway and the footer.
- *Today in Economics*: date-deterministic and server-free.
- The economist's toolkit.
- Named teaching components (`KC()`, 13 types).
- Search ranking by word start, record type and abbreviation.
- The diagram reading guides.
- The folding desk.
- The colophon footer, with an Explore index.

## 8. New interactions

- **Curves:** draw on in openers and on gateway hover, and the equilibrium pulse runs slowly.
- **Figures:** count up in *Economics at a glance*. The final value is in the markup from the start
  and in `aria-label`.
- **Headings:** the rule extends as the section scrolls in.
- **Lenses and chips:** state is shown with `aria-pressed`.
- **Opener steps:** the four data–theory–evidence–decision steps fade in.
- **Performance:** below-the-fold figures are drawn only as they approach.
- **During the self-test:** none of this runs while the self-test paints views.

## 9. Knowledge relationships

The existing related-content graph (`kgPanel`: concepts, cases, diagrams, videos, practice,
mindmaps, Everywhere and EE research, by subtopic) is unchanged, and it still sits on every concept
page.

This release adds three kinds of link:

- **Lens links:** 18 lenses, each linking to up to six existing records through the search index.
- **Case figures:** every case's figure follows its own recorded diagram (`dg`).
- **Daily page:** the date-chosen items link into existing content.

No content was duplicated: every link resolves to an existing record, and the self-test checks this.

## 10. Mobile

- The opener figure becomes a watermark below 1,000 px.
- The gateway goes to one column; the index rows shrink their thumbnails.
- The daily page stacks.
- The lead story drops to one column.
- The network becomes a wrapped list.
- The footer colophon stacks.
- `tests/widths.mjs` now covers 37 routes, including the toolkit, a plate, a concept page and a case,
  at 320, 375, 390, 412, 430, 768, 1024, 1280 and 1440 px. It checks overflow, page errors, target
  sizes (including the new gateway, index, lens, daily and network controls) and keyboard-reachable
  scrolling tables.

<!-- MOBILE-RESULT -->

## 11. Accessibility

- **axe-core (WCAG 2.0 A/AA, 2.1 AA).** 18 routes were scanned, whole document including header and
  footer, at 1366 and 375 px:
  - home;
  - course, learn, a concept page;
  - toolkit;
  - lab, a plate;
  - Real World, a case;
  - mindmaps, exam, Everywhere, EE Studio, IA, TOK, educator, video, about.

  One issue was found and fixed: the toolkit's lens buttons carried `role="listitem"` alongside
  `aria-pressed`. The same pattern on the home mindmap nodes, which silently removed their button
  role, was also fixed.
- **Figures.** Every figure is `aria-hidden`, because the heading carries the meaning. Captions are
  CSS-generated, so they are not repeated to screen readers or to search.
- **Contrast.** New text on paper and ink meets AA. Brass eyebrows on dark use `#C9AE72`.
- **Controls.** The desk is a native `<details>`. The lens grid is a labelled group. Every new
  control is a native button.
- **Colour and motion.** No verdict relies on colour. Motion stops under `prefers-reduced-motion`,
  which is tested in the browser.

<!-- AXE-RESULT -->

## 12. Performance

Measured in headless Chromium at 1366 × 900, service worker blocked, on a local server. Each figure
is the median of 5 runs on the same machine, `main` (d8efb20) against this release:

| | `main` | This release | Change |
|---|---|---|---|
| `index.html` | 4,531,980 B | 4,678,265 B | +146 KB (+3.2%) |
| `index.html`, gzip -9 | 1,610,234 B | 1,657,100 B | +47 KB (+2.9%) |
| `assets/data/real-world.js`, gzip | 71,488 B | 72,441 B | +1 KB |
| First contentful paint | 408 ms | 456 ms | +48 ms |
| DOMContentLoaded | 2,722 ms | 3,374 ms | +652 ms |
| Full in-page self-test | 1,628 ms | 1,902 ms | +274 ms (53 more checks) |
| DOM elements on the home page (first visit) | 1,002 | 1,265 | +263 |
| Home page length at 1440 px (first visit) | 11,417 px | about 9,960 px | −13% |

**How to read these numbers.**

- **First paint barely moved.** First contentful paint, the moment a reader first sees the page,
  moved by about 50 ms.
- **What DOMContentLoaded includes.** It also covers the platform's synchronous startup self-test,
  and it grew for four reasons:
  - the self-test now has 53 more checks (about 110 ms);
  - every view the self-test paints now carries its figure (about 150–250 ms, spread across the
    existing suites);
  - the script is 108 KB larger, 37 KB of which is the 35 reading guides;
  - the home page has more elements.
- **These are local timings, not field measurements.** A slower phone will see a larger absolute
  difference.
- **The module's size.** It is 108.5 KB of JavaScript (including the reading guides) and 28.6 KB of
  CSS, before compression.

**What was done to contain the cost.**

- Below-the-fold figures draw only as they approach.
- The layout-measuring reveal and the `<body>` register change are skipped while the self-test
  paints views.
- The motifs are small SVG strings with no images, fonts or libraries added.

The page is heavier by the size of the module and the 35 reading guides.

**One thing was tried and reverted.** Skipping the opener figure during the self-test saved about
200 ms. It also changed what one existing check measured: an Everywhere tab had passed its size
threshold only because of the old decorative graphic. The figure is therefore drawn in the
self-test exactly as a reader sees it.

## 13. Accuracy verification

- **Motif geometry.** Every motif's geometry is recomputed independently in the self-test:
  - equilibria on both curves;
  - the tax wedge equal to the tax;
  - welfare-loss vertices at the intersections;
  - MR twice as steep as AR;
  - MC through the minimum of AC;
  - the Lorenz curve below equality;
  - SRPC downward;
  - the cycle's turning points at zero slope;
  - Nash at (Low, Low);
  - markbands and key concepts equal to the guide's.

  One of these checks is paired with a deliberately wrong input that must fail.
- **Round-2 corrections.** These are held in place by named checks (*Accuracy r2 · …*).
- **Reading guides.** They were written from each plate's own numbers and screened for absolute
  claims by the self-test.
- **Real World hash.** The data was re-hashed, and both copies were verified identical under the
  canonical serialisation.

## 14. Sources consulted

**Official IB (supplied, read directly).** These documents were the authority for curriculum,
assessment and requirement statements:

- the *Economics guide*, first assessment 2022, published February 2020, cited by printed page
  (markbands p. 63; BoP components; the nine key concepts);
- the *Economics teacher support material*.

**IB, not accessible.** `ibo.org` is blocked from this environment, so current official pages were
not re-read in this release. The reference layer's previous live check (22 September 2026) stands.
It found the course first assessed in 2022 to be current.

**Case facts.**

- The Real World auditor used its own knowledge plus nine web searches (result summaries only),
  including:
  - LTA OneMotoring on COEs;
  - ICAP on California;
  - MercoPress on Argentina and Chile;
  - Business Standard on RBI;
  - The Tribune on Punjab power;
  - KPMG on Chile's pension reform.
- The *Four Decades of Poverty Reduction in China* report (World Bank and DRC, 2022) is now named in
  the DEV-007 case.

**Design.** No third-party design or wording was copied. All graphics are original SVG and CSS. No
external images or stock art were added.

## 15. Known limitations

- **Coverage gaps remain.** The coverage matrix (`docs/audits/2026-09-29/coverage.md`) lists:
  - 17 guide diagrams with no atlas plate:
    - constant PED, revenue under elastic and inelastic demand, the Engel curve;
    - perfect competition (three plates), natural monopoly, collusive oligopoly, monopolistic
      competition (two plates);
    - a fall in labour demand;
    - the money market;
    - crowding out;
    - free trade with exports;
    - fixed and managed exchange rates;
    - the J-curve;
    - the poverty cycle (drawn as a motif only);
  - 10 concepts, including Say's law, the circular economy, the Happiness Index, money creation by
    commercial banks and social enterprise.

  These are the next content phase; nothing was invented to fill them in this release.
- **Not redesigned in this release:**
  - Exam DNA, the mindmap canvas and the video studio's layout keep their existing designs. They
    gained the section register, not a new layout.
  - The mindmaps were judged already strong: typed node shapes, colour by role, and explain,
    connect and exam modes.
- **Data visualisation uses no live statistics.** This is by design, and consistent with the
  platform's rule that it holds no live data. Illustrative figures are labelled.
- **Graph audit G14 (curve labels on the calculation board's tax diagram) is deferred.**
- **An existing Everywhere tab** (*Economist's eye*) renders about 1,100 characters of markup. It
  passed its size check only because of the old decorative graphic; the game shell is legitimately
  small.
- **Duplicate declaration.** `conceptPage` is declared twice (the second wins, so the first is dead
  code), which is the same kind of shadowing fixed last release. It was left alone to avoid
  behavioural change.
- **Performance cost.** See section 12.

## 16. Unverified claims

- **Guide edition.** A copy of the Economics guide titled "first assessment 2024" is referenced
  online. It could not be retrieved, so the platform's guide-based claims and the coverage matrix
  rest on the 2022 guide. The reference layer now says so.
- **Recent events in Real World cases.** The following rest on the auditor's search summaries and
  my own knowledge, and are dated in the text so they can be checked:
  - MIC-013 (2025 extension);
  - MAC-011 (2025 curtailment);
  - GLO-023 (April 2025);
  - GLO-032 (2023–24);
  - DEV-023 (2025 reform);
  - GLO-034 (2026 phase).
- **DEV-003 (MGNREGA)** is worded as "check whether it remains in force"; its replacement is
  reported but not confirmed.
- **GLO-033.** The status of the Airbus–Boeing tariff suspension after 2021 is left for checking.
- **Figures still needing a source.** The earlier release's unverified deep-card figures and the
  Exam DNA part marks (38 source papers) remain open, as recorded before.

## 17. Tests

<!-- TESTS -->

## 18. Before and after

<!-- BEFOREAFTER -->

---

## Deployment

1. Review and merge the pull request into `main`. This release does not touch `main` directly.
2. Nothing new is needed in Vercel: no new environment variables, and the YouTube function is
   unchanged.
3. The service worker moved to **v13**, so returning visitors pick up the new files on their next
   visit.
4. **Rollback.** Revert the merge commit. The module is self-contained between
   `RENAISSANCE:BEGIN/END` and `REN-CSS:BEGIN/END`. The content corrections are ordinary text
   changes, and the Real World hash reverts with its data.
