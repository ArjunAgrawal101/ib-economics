# Release report

**Arjun Agrawal · IB DP Economics** · release 2026.09-e, *cover and composition*

Written on 29 September 2026.

- **Every number here was produced by running something**, and each section says what was run.
- **What was not done, or could not be checked**, is listed in sections 19 and 20. Some of the
  brief is not in this release, and section 19 says which parts.
- **Earlier reports** are in [`docs/releases/`](docs/releases/). The one this replaces is
  [2026-09-29](docs/releases/2026-09-29-release-report.md), *the renaissance*.
- **The audit written before any code changed** is
  [`docs/product-audit.md`](docs/product-audit.md). It covers items A to M of the brief.

**The platform was not rebuilt:**

- It is still one static `index.html`, with the same router, storage, service worker, import and
  export, print, search and self-test.
- No route, tab, storage key, section, content record or earlier home-page band was removed.
- Everything new is added by wrapping existing functions (the new JavaScript and CSS are spliced
  in between markers). A few existing CSS rules were corrected where the audit found defects.

---

## 1. What changed

Nine commits on `claude/upbeat-hawking-69d7gz` since `main` (50767be), including this report.

| Area | Change |
|---|---|
| Home | A new cover: a movable market, a separate portrait, clickable scale signals and six concept chips. After it, a hinge and nine named chapters, ending on "Start exploring." |
| About | The opener rebuilt as three cells that cannot touch: text, portrait, economics panel. |
| Real World | A *case intelligence* brief heads every case. Links to a case now open the case. |
| Mindmaps | A focused node offers *go further* links drawn from the related-content graph. |
| Exam | A bar of ten named rooms across Exam, Papers and Exam DNA, each labelled by source type. |
| Lab | A new last tab, the *Elasticity lab*: PED with its sign, and total revenue drawn as rectangles. |
| Layout | Opener figures never sit under text, and are never cut off by their band. The header no longer breaks between 881 and 1180 px. `.split.even` collapses on phones. |
| Tests | 18 new in-page checks. New Playwright suites `cover.mjs` and `overlap.mjs`. `widths.mjs` goes from 9 widths to 15 and from 37 routes to 42. |

## 2. New design system

The existing system (obsidian, burgundy, chalk and brass; the display serif; one register per
section) was **extended, not replaced**. Replacing it would have discarded the section identities
the last release built.

**Additions**

- **Cover grammar.** A text column and a lab column, with the portrait in its own grid cell. There
  are responsive steps at 1279 and 640 px.
- **Chapter marks.** Mono numerals in brass, a serif title, and a hinge band between the cover and
  the chapters.
- **Split bands.** A text column beside a figure, a room list or a photograph. These replace card
  grids for the exam, research, educator and creator chapters.
- **Two new components.**
  - The rooms bar: a horizontal rail with 44 px targets and a source label under each name.
  - The case-intelligence grid: three columns, with small-caps labels in burgundy.
- **One slider style.** A custom track and thumb, used by the cover and the elasticity lab.

**Rules the release enforces with tests**

- A figure's labels may not collide.
- A figure may not be cut off by its band.
- Nothing may be drawn under text.
- Text must meet 4.5:1 contrast.

## 3. Homepage changes

**The cover**

- **Text.** An eyebrow ("IB DP Economics · Arjun Agrawal"), then "Economics is a way of *seeing*."
  and "Think like an economist.", then a lede.
- **Actions.** *Start learning →* is primary and *Explore Real World* secondary. Quieter links go
  to the question bank and the curriculum.
- **Scale signals.** Five counts (Real World cases, mindmaps, diagram plates, calculations, Exam DNA
  questions) plus *IA · EE research studios*.
  - The counts are read from the data as the page is drawn. None is typed.
  - Each count is a button that opens what it counts.
- **The lab plate: a market you can move.**
  - A slider shifts demand from −2 to +2. The plate redraws and three hotspots follow it: demand,
    supply and equilibrium.
  - One live sentence explains the result: "Demand rises: at the old price there is a shortage, so
    price rises … until quantity supplied meets quantity demanded."
  - Six chips open concept pages: elasticity, inflation, trade, externalities, inequality and
    exchange rates.
- **The portrait** is its own grid cell. It is never a background, and nothing is drawn over it.

**Below the cover**

- **The hinge.** "See the world *differently*" leads into nine chapters: the platform, the world,
  the theory, the lab, the exam, the research, the media, the educator and the creator.
- **New bands:**
  - an exam band, with eight rooms and their source tags;
  - a research band, for the IA and EE;
  - an educator band;
  - a creator band, with the teaching photograph;
  - a closing band, "Start exploring."
- **Every earlier band is still on the page**, placed in the chapter it belongs to. That includes
  the gateway, *Today in Economics*, the Real World lead, the mindmap network, *Economics,
  Everywhere*, the 60-second pieces, the folded desk and *Economics at a glance*.

**Performance.** The photographs are served to the home page as blob URLs decoded once from the
embedded images. Inlining them as data URIs had added 314 KB to the home page's HTML.

## 4. About page changes

- **The opener was the collision the brief describes.** It drew the section's supply-and-demand
  figure behind the portrait, so axis lines and curves ran under the photograph and ended at its
  edge.
- **It is now three cells that cannot touch:**
  - the text: name, positions, subjects, lede, *Learn with Arjun* and *Email*;
  - the portrait, at 3:4 in its own frame;
  - a separate panel, "What the teaching is built around", with its own figure and a link to the
    lab.
- **The rest of the page is unchanged.** The two contextual photographs keep their places. Each of
  the three photographs still appears exactly once (an existing self-test holds this).
- **No current employer is named.** The earlier self-test that scans for current-employer framing
  still passes.
- **How it is verified:**
  - `cover.mjs` measures rendered boxes at 1440, 1024, 390 and 320 px. The portrait never meets the
    panel, and no `svg` on the page intersects the portrait.
  - `overlap.mjs` checks the whole page at 15 widths.
- **A second, older defect was found and fixed.** At 390 and 320 px the contact card and the
  independence note beside it stayed in two columns, and the email address ran into the note.
  `.split.even` never collapsed on phones; it now does at 700 px and below.

## 5. Interactive features

| Feature | Where | What it does |
|---|---|---|
| Movable market | Home cover | Shifts demand. The equilibrium moves, the explanation updates (`aria-live`), and the hotspots follow. |
| Scale signals | Home cover | Counted from data; each opens its section. |
| Concept chips | Home cover | Six concept pages. |
| Case intelligence | Every Real World case | A one-screen brief. Buttons open the case's diagram plates. |
| Go further | Mindmap explore mode | Up to five groups of real links for the node's subtopic: a case, practice, a video, an everyday question, EE research. |
| Exam rooms | Exam, Papers, Exam DNA | Ten rooms. `aria-current` marks the room you are in. |
| Elasticity lab | Lab, last tab | Price rises or falls (1–40%) with a quantity response (0–60%). Shows PED with its sign, the \|PED\| class, and revenue before and after as rectangles. |

**What already existed.** Supply and demand, tax, externality and AD-AS labs were already on the
platform: the market lab, policy simulator, AD-AS lab and the *Economics, Everywhere* labs. They
were kept as they are. The gap in the brief's list was elasticity, so that is what was built.

## 6. Content enrichment

No new cases, concepts or statistics were written in this release. The enrichment reorganises what
the platform already holds:

- **Case intelligence** is compiled from each case's own fields:
  - the event, the question, why it matters;
  - the diagram and its caption, the theory;
  - the exam connection, and "useful for" papers.
  - Where one of the 12 deep cards exists, it also draws on the card's stakeholders and
    counter-arguments.
  - When a field is empty, the part is left out. A self-test renders all 203 cases and checks that
    none shows an empty paragraph, `undefined` or `null`.
- **Mindmap connections** come from the related-content graph (`kgBuild`) for the node's subtopic.
  A connection exists only where the metadata links the two items.
- **The elasticity lab's teaching text**, which is original:
  - three "read it like an economist" questions;
  - a note that the lab uses the simple percentage-change formula;
  - an explanation, shown when the case is unit elastic over a large change, of why revenue still
    moves slightly.

## 7. Economic accuracy audit

Each new model was checked against its own algebra in the self-test.

- **Cover market.** D: P = 9 − 0.8(Q − s); S: P = 1 + 0.8Q; equilibrium Q = 5 + s/2,
  P = 5 + 0.4s.
  - At nine slider positions the drawn equilibrium lies on both curves (tolerance 10⁻⁹).
  - More demand raises both price and quantity.
  - The explanation names a shortage when demand rises and a surplus when it falls.
  - A check rejects the classic error of "price rises causes demand to rise".
- **Elasticity lab.** Five worked cases are checked for PED, its class and the direction of revenue:
  - +10% price, −5% quantity: −0.5, inelastic, revenue up;
  - +10%, −20%: −2, elastic, revenue down;
  - −10%, +10%: −1, unit elastic, revenue down 1%;
  - +20%, 0: perfectly inelastic, revenue up;
  - −20%, +40%: −2, elastic, revenue up.

  Two further checks:
  - Revenue is P × Q at both points.
  - PED is never positive across 18 combinations.
- **Found in review.** The unit-elastic case reads "revenue falls 1%". That is arithmetically right
  for a discrete 10% change, but it contradicts the rule students learn, so an explanation was
  added. A self-test requires the explanation for that case and forbids it for the others.
- **Language.** The existing language rule caught "Quantity always moves against price" in the
  lab's note: a contingent claim stated as an absolute. It was rewritten as a statement about what
  the tool does.

## 8. IB accuracy audit

- **Source labels in the exam rooms:**
  - *Official IB information* for the IB reference only;
  - *Teacher-created practice* for the Paper 1, 2 and 3 workshops and the timed simulator;
  - *Teacher-created tool* for the cockpit and *Why did I lose marks?*;
  - *Analysed metadata* for Exam DNA;
  - *Your own work* for the mistake book.

  A self-test requires exactly one room labelled official, and requires that it is the IB
  reference. This follows the rule "never imply teacher-created material is official IB material".
- **Paper 3 is marked HL**, which is correct.
- **The markband figure** is captioned "Economics guide, first assessment 2022, p. 63". It cites
  the guide the reference layer rests on.
- **The guide edition is still open.** A "first assessment 2024" copy is referenced online but could
  not be retrieved, because ibo.org is blocked from this environment. This is recorded in
  `IBREF.limits` and was not resolved in this release.
- **The elasticity lab uses the simple percentage-change formula**, and says so. It notes that a
  midpoint calculation gives a different answer for large changes.
- **No IB logo is used, and no grade is predicted.**

## 9. Diagram audit

The overlap audit measured every figure on 20 routes at 15 widths.

**Defects found in existing figures, all fixed**

1. **Markband figure.** The axis title "Markband" collided with the last band label "13–15", on
   every page that shows it. The title now has its own row.
2. **Opener figures on phones and tablets.** Below 1000 px each section's figure sat, faded, under
   the heading and lede. Below 1000 px it now follows the text as a small plate.
3. **Opener figures at 1000–1279 px.** The figure reached up to 60 px into the lede (measured). It
   now narrows to 30vw, which leaves a gap of at least 20 px.
4. **Slim openers at 1280–1440 px.** The figure was taller than its band, so its top labels
   ("Scarcity", "Marks") and caption were cut off. It is now sized by the band's height as well as
   the page width.
5. **Opener captions.** The caption sat on the figure's top edge and ran across the y-axis title.
   It now sits just below the figure.

**The new figures**

- **Elasticity lab.** Its points and labels at first did not draw, because they relied on
  animation classes. They now have their own styles, and a screenshot confirmed them.
- **Cover plate.** Its hotspots are placed from the same functions that draw the curves.

## 10. Calculation audit

No existing calculation was changed. The existing calculation suite still passes: 491 checks,
including forty generated inputs per calculation.

The new arithmetic:

- the elasticity lab (section 7);
- the cover's equilibrium (section 7);
- the scale-signal counts, which a self-test compares with the data they name.

## 11. Responsive audit

- **Widths.** `widths.mjs` now runs 42 routes at 15 widths: 320, 360, 375, 390, 414, 430, 768, 834,
  1024, 1280, 1366, 1440, 1600, 1920 and 2560 px, four widths at a time.
  - It checks horizontal overflow, page errors, touch targets and reachable scrolling tables.
  - All 15 width checks pass (12 min 20 s).
- **Header.** Between 881 and 1180 px the menu button wrapped above the brand, because both sat in
  the same grid column. The header now uses flex at 1180 px and below. This was checked at 881,
  1024, 1180 and 1181 px.
- **Cover.** At 1279 px and below the lab stacks under the text. At 640 px and below the portrait
  narrows and the hotspots shrink. At 320 and 390 px, `cover.mjs` confirms no sideways scroll and
  no text over the portrait.

## 12. Overflow and overlap audit

`tests/overlap.mjs` is the audit the brief asks for in section 29.

**What it measures**

- It collects every visible atomic element on the page:
  - text, measured by its line boxes rather than its block;
  - images, figures and controls.
- Each box is clipped to the scroll and clip containers it sits in.
- Every pair where neither element contains the other is compared, with a 3 px tolerance.

**What it reports**

- content over content;
- colliding labels inside a figure, including CSS-drawn captions;
- a figure label cut off by its band;
- a figure drawn under text;
- sideways scroll.

**Scope.** 20 routes at 15 widths (300 route-width combinations, 63,573 elements measured). The
routes: home, About, Real World (landing and a case), a mindmap, the market lab, the elasticity
lab, a diagram plate, exam, papers, Exam DNA, a concept page, *Economics, Everywhere*, the EE
Studio, videos, the Educator Studio, the toolkit, calculate, the course and tutorials.

**Deliberate exemptions**

- A mindmap's connector layer (`svg.*edges*`), which is drawn under its nodes by design.
- The sticky header, which is layered over content by design.
- Text inside an `svg` is compared with text in the same figure, not with the page.

**Issues found and fixed, in the order the audit found them**

| # | Issue | Routes and widths | Fix |
|---|---|---|---|
| 1 | Opener figure under the heading and lede | Every opener, below 1000 px | The figure follows the text |
| 2 | Opener figure overlapping the lede | 1000–1279 px | Narrowed to 30vw |
| 3 | "Markband" colliding with "13–15" | Home, papers, Exam DNA; all widths | The axis title gets its own row |
| 4 | Email running into the independence note | About, 390 and 320 px | `.split.even` collapses at 700 px and below |
| 5 | Figure labels and caption cut off by the band | Slim openers, 1280–1440 px | Sized by the band's height |
| 6 | Caption across the y-axis title | Papers and lab openers, 1024–2560 px | Caption below the figure |

**False positives removed by improving the audit, not by exempting the elements**

- A kicker's full-width block box touched a card's arrow.
- An "AO4" tag's block touched the text beside it.

In both cases measuring line boxes instead of block boxes removed the finding.

**Final run:** 0 findings in every category, and no page errors.

## 13. Accessibility audit

- **axe-core** (WCAG 2 A, AA and 2.1 AA) on 22 routes at 1366 and 375 px, with reduced motion.
  - **First run:** two contrast failures.
    - The case reader's zone numbers were 3.7:1, faded by opacity. This predates the release.
    - The new chapter numbers were 4.47:1.
  - **Both fixed.** The final run reports **no violations** on any of the 44 page runs.
- **The cover slider** is a labelled `input[type=range]`, and its explanation is `aria-live`.
- **The Elasticity lab.** Its explanation is `aria-live`. Its direction buttons use
  `aria-pressed`, and its figure has a `role="img"` label that states both prices, quantities and
  revenues.
- **The rooms bar** is a `nav` with an `aria-label`, and marks the room you are in with
  `aria-current="page"`.
- **Reduced motion.** It still switches the motion layer off (`renaissance.mjs`).

## 14. Performance audit

These are the median of five cold loads at 1366 px, with service workers blocked.

**Timing**

| | main (50767be) | this release |
|---|---|---|
| First contentful paint | 444 ms | 436 ms |
| DOMContentLoaded | 3,275 ms | 3,429 ms (+154 ms, +4.7%) |
| Start-up self-test | 1,888 ms | 2,017 ms (+129 ms) |
| Home DOM nodes | 1,265 | 1,495 |
| JS heap | 167 MB | 157 MB |

**Page size**

| | main (50767be) | this release |
|---|---|---|
| `index.html` | 4,678,265 bytes | 4,734,139 bytes (+55,874, +1.2%) |
| gzip | 1,661,571 bytes | 1,676,731 bytes (+15,160, +0.9%) |

**Why DOMContentLoaded grew.** Nearly all the increase is the start-up self-test: 18 new checks,
some of which render views. First paint is unchanged.

**The live figures redraw only themselves.** The cover plate and the elasticity figure replace
their own SVG, not the page.

## 15. Source and copyright audit

- **Figures.** Every new one is original SVG built from stated functions.
- **Photographs.** The three are the author's own, already embedded. None was added.
- **Text.** All new text is original. Nothing was copied from IB documents.
- **Exam DNA** still holds metadata only.
- **No IB logo or protected branding** is used.
- **Secret scan** of the whole diff against `main` (API keys, tokens, private keys, passwords):
  - no matches;
  - no `.env` or credential files tracked.

## 16. Test counts

| Suite | Before | After | Result on the final commit |
|---|---|---|---|
| In-page self-test | 1,923 | 1,941 | 1,941 passed, 0 failed |
| `api-youtube.mjs` | 21 | 21 | 21 passed |
| `selftest.mjs` | 37 | 37 | 37 passed |
| `e2e.mjs` | 22 | 22 | 22 passed |
| `ecosystem.mjs` | 30 | 30 | 30 passed |
| `renaissance.mjs` | 25 | 25 (the two outdated hero checks were replaced) | 25 passed |
| `cover.mjs` (new) | — | 33 | 33 passed |
| `pwa.mjs` | 4 | 4 | 4 passed |
| `widths.mjs` | 9 (9 widths × 37 routes) | 15 (15 widths × 42 routes) | 15 passed |
| `overlap.mjs` (new) | — | 6 (over 300 route-widths) | 6 passed |
| `routes.mjs` | 2 (every tab, cold, at two widths) | 2 | 2 passed |

**The Playwright harness** (`node tests/run-all.mjs`) went from 150 checks in 8 suites to **195 checks in 10 suites**. Every suite passed on the final commit, `bc3e8e9`.

**The new in-page checks:**

- the cover model (4);
- the portrait frames (2);
- the elasticity lab (5);
- the exam rooms (2);
- case links (2);
- case intelligence (1);
- mindmap links (2).

**Every new check can fail, and did:**

- The overlap audit found the six issues in section 12 before they were fixed.
- `cover.mjs` found the mindmap defect in section 17.
- The language rule caught the absolute claim in section 7.

## 17. Defects found

*Pre-existing* means the defect is on `main`; *this release* means it was introduced and caught
during this work.

| # | Defect | Origin |
|---|---|---|
| 1 | The About opener drew a figure behind the portrait | Pre-existing |
| 2 | Header: the menu button wrapped above the brand at 881–1180 px | Pre-existing |
| 3 | Links of the form `nav('world',0,id)` landed on the Real World overview instead of the case | Pre-existing |
| 4 | Opener figures under the heading and lede below 1000 px | Pre-existing |
| 5 | Opener figures overlapping the lede at 1000–1279 px | Pre-existing |
| 6 | Markband figure: axis title colliding with a band label | Pre-existing |
| 7 | `.split.even` never collapsed on phones (About: the email ran into the note) | Pre-existing |
| 8 | Slim openers cut off their figure's labels and caption at 1280–1440 px | Pre-existing |
| 9 | Opener captions ran across the y-axis title | Pre-existing |
| 10 | Case reader zone numbers at 3.7:1 contrast | Pre-existing |
| 11 | Mindmap *go further* links never rendered on the map page (the mode table held the unwrapped function) | This release |
| 12 | Chapter numbers at 4.47:1 contrast | This release |
| 13 | Home HTML 314 KB heavier from the photograph data URIs | This release |
| 14 | The cover heading was sized by an older, more specific rule, and the slider inherited a heavy global style | This release |
| 15 | A case-intelligence button read "Open the an indirect tax plate" | This release |
| 16 | The case-intelligence model panel stretched to the height of the row | This release |
| 17 | Elasticity lab: the points and labels did not draw | This release |
| 18 | Elasticity lab: an absolute claim in the note ("always") | This release |
| 19 | Elasticity lab: a unit-elastic case showed revenue falling, with no explanation | This release |

## 18. Defects fixed

All 19. Each fix is described where it is discussed:

| Defects | Where |
|---|---|
| 1, 7 | Section 4 |
| 2 | Section 11 |
| 3 | The world-view wrapper opens a case or a worked story from the argument |
| 4–9 | Sections 9 and 12 |
| 10, 12 | Section 13 |
| 11 | The mode table now points at the wrapper; a self-test renders through the table |
| 13 | Blob URLs |
| 14 | A more specific rule, and a custom slider style |
| 15 | "Diagram plate: \<title>" |
| 16 | `align-self: start` |
| 17 | Explicit point and label styles |
| 18 | Reworded |
| 19 | An explanation, plus a self-test |

## 19. Remaining limitations

**Parts of the brief not done in this release.** The brief is larger than one release. These
parts are **not** in it:

- The IA and EE "studio" redesigns (brief sections 14–15). The existing EE Studio and the five IA
  tabs are unchanged. A home-page research band now leads to them.
- The video studio (section 17), *Economics, Everywhere* (section 16), teacher experience (section
  38) and *My Economics* (section 37) are unchanged.
- The knowledge graph (sections 11–12) appears as *go further* links on mindmap nodes and as the
  existing related-content panels. There is no new graph view.
- No new cases, concepts or statistics were written (sections 19–24). Case intelligence reorganises
  existing records.
- No new economic or IB red-team was run over existing content. The last release ran five audits,
  whose open items are listed in `docs/audits/2026-09-29/`. This release audited only its own new
  models and text.

**Limits of the testing**

- **Browser and devices.** Only Chromium was tested. Safari, Firefox and real phones were not.
- **Overlap audit coverage.** It covers 20 routes, not every one of the roughly 150 tabs. The
  width test and the route test cover more routes, but check less.
- **Guide edition.** Unresolved (section 8).
- **Start-up time.** The start-up self-test is still synchronous. DOMContentLoaded grew by 154 ms.
- **Visual-regression percentages overstate change** on some pages. The before-screenshots were
  captured while the display font was still loading on some routes. The mindmap and Real World
  pages at 1440 px changed mainly in type rendering, which was checked by eye.

## 20. Manual tests you still need to perform

1. **Real phones.** Open the home page on an iPhone (Safari) and an Android phone (Chrome). Drag
   the cover slider with a finger, and tap each hotspot and chip.
2. **Screen reader.** Use VoiceOver or NVDA on the cover slider and the elasticity lab. The
   explanation should be read after each change.
3. **Keyboard only.** Tab through the cover, the rooms bar and the elasticity lab. Check that
   focus is visible and that the arrow keys move the sliders.
4. **Your portrait.** Look at it on the cover and on About, at your usual screen sizes. Confirm the
   crop and position are ones you are happy with.
5. **Wording.** Confirm the cover wording ("Economics is a way of seeing", "Think like an
   economist") and the About panel title.
6. **Source labels.** Confirm the exam room labels match how you want each tool described.
7. **Print.** Print About and one case. Check that case intelligence prints sensibly.
8. **Offline.** Install the app, go offline, and open the home page, a case and the elasticity lab.
9. **Other browsers.** Firefox and Safari on a laptop: the cover, About, a case and a slim opener
   (Exam DNA) at 1280 px.
10. **Deployment.** On the Vercel preview, check that `YOUTUBE_API_KEY` is still set and that the
    video studio loads the feed.
11. **Guide edition.** Confirm which Economics guide edition is current for your students. If it is
    the 2024 edition, tell me, so that the reference layer and the markband caption can be checked
    against it.
