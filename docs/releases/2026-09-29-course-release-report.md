# Release report

**Arjun Agrawal · IB DP Economics** · release 2026.09-g, *the course*

Every number here was produced by running something, and each section says what was run. A test is
reported as passing only if it was run on the final build and passed. Anything not run is listed
under *Manual tests still required*.

**Related documents**

- **The architecture this release was built to:** [`docs/content-architecture.md`](docs/content-architecture.md).
  It covers the source hierarchy, the data model, where each system lives, the review log and the
  full 31 × 20 coverage matrix.
- **Earlier reports:** in [`docs/releases/`](docs/releases/). The previous one is
  `2026-09-29-think-release-report.md`.

**Nothing was taken away.** Every earlier route, tab, content record, home band and test still
works. One tab was renamed: Course › *Topic dossier* is now *Topics*. Its old addresses still open,
and the dossier's content lives on inside each lesson.

---

## 1. Build date

29 September 2026. Built from `scratchpad/ren/*.js` and `css*.css` by `ren/build.py` (the module
splice). Course data comes from `course/build_course.py`.

## 2. Content version

| Item | Value |
|---|---|
| Course data | `course-2026.09.1`, content hash `826cf71c14edddac`, built 2026-09-29 |
| Service worker cache | `aa-ibdp-econ-v14` (was v13); precaches `assets/data/course.js` |
| Syllabus | IB Economics guide, first assessment 2022, checked against the supplied PDF text on 29 September 2026 |

## 3. Files changed

Against `main` (3797c23): 13 files. Sizes are in bytes.

| File | Change |
|---|---|
| `index.html` | The platform (5,054,696 bytes; was 4,819,171). The opening's markup, CSS and clock; the course layer's modules and styles; the corrections to existing content; 68 new self-tests |
| `assets/data/course.js` | **New.** The course data: 31 lessons, misconceptions, glossary, command terms, paper guidance, checklists, integrity, concepts, lens, Intelligence paths (1,518,820 bytes; 433,699 gzipped). Loaded after `real-world.js`. |
| `service-worker.js` | Cache version v13 → v14; precaches `course.js` |
| `tests/intro.mjs` | **New.** The opening's timing and geometry at six widths, plus Skip, reduced motion, deep links and reload |
| `tests/course.mjs` | **New.** A lesson end to end, the glossary, command terms, snapshots and print, search, revision, and overflow at four widths |
| `tests/overlap.mjs` | A nested-summary visibility bug fixed (section 17). Nine new routes audited: a lesson, a unit page, the glossary, command terms, the misconception database, the inquiry tools, a snapshot map, and Papers 2 and 3. |
| `tests/cover.mjs` | Expects the new chapter order |
| `tests/run-all.mjs` | Runs `intro` and `course` |
| `tests/README.md` | Rows for the two new suites |
| `README.md` | The opening sequence; *The course: thirty-one lessons*; the data file |
| `docs/content-architecture.md` | **New.** Principles, source hierarchy, the guide against the brief, data model, review log, and the 31 × 20 coverage matrix |
| `docs/releases/2026-09-29-think-release-report.md` | The previous report, moved unchanged |
| `RELEASE-REPORT.md` | This report |

## 4. New features

**The opening sequence: exactly 5000 ms, on one clock**

- **One clock.** Every stage is a Web Animations API animation with an explicit `startTime`. They
  all share one start timestamp: the first presented frame. That timestamp is re-anchored to the
  browser's first-paint time when one is reported. There are no `setTimeout` chains.
- **Only opacity and transform are animated,** so the compositor keeps time even while the main
  thread is busy.
- **The timeline:**

  | Time | Stage |
  |---|---|
  | 0–0.8 s | Obsidian field |
  | 0.7–1.6 s | Monogram |
  | 1.4–2.3 s | Name, with *Knowledge. Insight. Impact.* |
  | 2.2–3.2 s | *IB DP Economics*, with its figure |
  | 3.1–4.2 s | *Think like an economist.* (the peak) |
  | 4.0–5.0 s | *Learn. Think. Calculate.* |
  | 4.7–5.0 s | Exit fade |

  The overlay is removed on the next frame.
- **A slow start holds the final frame.** If the page is not ready at 5000 ms, the sequence holds
  its last frame rather than uncovering an unfinished page.
- **Skip** is a real button, reachable by keyboard. It uses the same exit as the clock.
- **Reduced motion** shows the same hierarchy at once and leaves after 1.5 s, or when the page is
  ready if that is later.
- **A reload, Back/Forward or a deep link** does not replay the sequence.
- **The font stylesheet** no longer blocks the first frame.

**The course: 31 lessons, one Learning Spine** (Course › Topics › any subtopic, e.g. `#/course/topics/2.5`)

Each lesson runs in this order:

1. **Big idea.**
2. **Before you start.** Its prerequisites, linked.
3. **Learning objectives,** grouped by what you must do: know, understand, apply, analyse,
   evaluate, calculate, draw, interpret, recommend.
4. **Learn.** Core blocks with a key-terms rail.
5. **Mechanism chains.**
6. **See.** Model cards, each with its diagram, assumptions, what it predicts and where it breaks.
7. **Try.** Misconception checks with feedback.
8. **Explain.** *Explain it to me* (Simple / Exam / Deep) and *Can I explain it?* self-explanation
   prompts, each with a checklist.
9. **Apply.** Real World cases, an inquiry prompt, and IA and EE angles.
10. **Evaluate.** Theory, evidence and interpretation kept apart; *Watch out*; *Go deeper*; the
    Economist's Lens.
11. **Exam.** Original practice questions, with command terms at the level the guide sets.
12. **Retrieve.** Retrieval questions, then *Can I actually do this?* self-ratings.
13. **Connect.** What it builds on, and what next.
14. **Teach it.** A teacher layer with diagnostic insight.

Around the lesson:

- **Depth.** Foundation / Core / Deeper. Foundation keeps the core and leaves exam detail for
  later; Deeper opens every *Go deeper* panel.
- **Print.** Each lesson prints as a topic summary sheet.
- **Unit pages** (`#/course/topics/unit-2`). Each gives the guide's recommended hours
  (guide PDF p. 26), its lessons, its real-world issues and its snapshot map.
- **What next.** Suggested from the lessons' written prerequisites and your own ratings. It is not
  personalised beyond that, and does not claim to be.

**Mindmap 2.0: snapshot maps**

- **36 snapshot maps:** 31 subtopics, 4 units and the course. Each has the question in the
  centre and six branches: concept, theory, model, application, evaluation, exam.
- **35 last-night versions** (a smaller, denser print of the same map).
- **Every map prints on one A4 landscape page** (section 19).
- The 42 hand-drawn network maps are unchanged.

**Glossary 2.0** (Course › Dictionary)

- **250 terms:** 164 existing, 86 new; near-duplicates merged into aliases.
- **Filters:** unit, topic, depth, *my status* and A–Z.
- **Each card:** a plain-English line, the definition, an example, a common confusion and links.
- **24 compare sets** open as tables, e.g. *nominal vs real GDP*, *tariff vs quota*, *depreciation vs
  devaluation*.
- **Printable.**

**Command terms 2.0** (Course › Command terms)

- **33 terms.** Each keeps the guide's definition (tagged IB OFFICIAL, with its page) apart from
  teacher guidance.
- **Teacher guidance covers:** what it asks, a structure, weak and strong answers, a worked
  outline, the common trap and related terms.
- **Printable.**

**Misconception database** (Learn › Misconception lab)

- **51 entries** from the teacher's database. Each has:
  - a **student view:** the wrong idea, why it is tempting, the correct idea, an analogy and an
    exam note;
  - a **teacher view:** root, diagnostic questions and an activity.
- Searchable, and filterable by area and topic.
- Tagged TEACHER-CREATED, never as IB examiner findings.

**Thinking tools**

- **Key concepts and the concept network.** The nine concepts, drawn as a network, plus *one
  concept, many worlds*.
- **Economics Intelligence.** Six paths, one per real-world issue in the guide. Each runs from
  concept to exam.
- **The Economist's Lens.** 17 questions, printable.
- **Inquiry tools** (Think › Inquiry tools). Six tools, saved on this device and printable:
  concept diary, concept graph, Frayer model, cross-comparison chart, continuum of examples and
  case comparison.

**Exam, revision and research**

- **Checklists** (Course › Checklists). 15 lists at HL, 13 at SL (the HL-extension and Paper 3
  lists are HL only):
  - 3 generated from the platform's own data (course content, diagrams, calculations);
  - 12 written, including *Can I actually do this?*.
- **Paper 1, 2 and 3 guidance** (Exam practice):
  - the facts, each with its guide page;
  - the moves, and 10- and 15-mark structures;
  - a Paper 2 exercise with a guide to reveal;
  - a Paper 3 frame and scenario with worked routes;
  - an economic-writing guide.
- **Revision mode** (Practise › Ten-minute revision):
  - 15, 30 or 60 minutes, a unit, or the full course;
  - it picks your least secure lessons and runs each through the same steps.
- **Academic integrity** (IA › Academic integrity).
  - What support is allowed, what is not, and what must be acknowledged.
  - Every IA page now carries a learning-support line.
  - Nothing on the platform writes a commentary for a student.

**Search.** New record types, with a *Lessons* filter: Lesson, Model card, Dictionary, Compare,
Misconception, Command term, Key concept, Checklist, Question and Tool. The index has 2,842 records.

**Print architecture.**

- Two print kinds: *map* (A4 landscape) and *sheet* (A4 portrait). Each has a restrained footer.
- Pressing Ctrl/Cmd+P on any page with nothing prepared now prints a clean copy of that page, not
  the whole app shell.
- One `window.print` call site, as before.

## 5. Improved features

| Area | Before | Now |
|---|---|---|
| Home page | Chapters in the earlier order | Think → The course → Learn → See the world → Master the models → Exam → Research → Explore, then Watch, Teach, About. A new course band shows your progress and what next. |
| Topic dossier | One summary page per subtopic | A full lesson; old addresses (`#/course/topic-dossier/2.7`) open it |
| Misconception lab | The earlier lab | Adds the 51-entry database, with student and teacher views |
| Economist's toolkit | Toolkit only | Adds the Lens |
| Ten-minute revision | A retrieval queue | Adds structured revision by time, unit or course |
| Paper workshops | Workshops | Adds the paper guidance and writing guide |
| Diagram atlas | Plates | Atlas 2.0: build each plate in six steps (axes, curves, guides, points, areas, labels), a label list, a link to the matching lab, and print a plate |
| Calculation board | Calculations | Each calculation adds a card: when to use it, units, where it sits in the course, real-world use, and an exam-style question from its lesson |
| Glossary, command terms | The earlier lists | See section 4 |
| About | Economics educator, IB DP practitioner, Academic mentor, Resource creator | *Economics educator, IB DP educator, Teacher and mentor, Academic resource creator, Research-oriented educator.* No current employer is named. |
| Theory of knowledge | TOK pages | Adds TOK prompts by topic |

**Corrections to existing content.** These errors were found by the writers and reviewers. Each was
corrected in place (`fix_platform.py`, 15 sections) and is summarised in
`docs/content-architecture.md` §6:

- **22 plain-English definitions** that restated the misconception their own note corrects.
- **2 practice stems** that asked Paper 2 (d) to *compare*, which is AO3. Paper 2 assesses AO3 only
  in part (g) (guide PDF p. 67).
- **16 notes that said how often something is examined:** 6 topic notes and 10 calculator notes.
  One further calculator note was an absolute.
- **The GNI note.** It put remittances in GNI; they are current transfers.
- **The TSM axes rule.** It was presented as the guide's, and for all diagrams; it is the TSM's, and
  for market diagrams.
- **Supply-side policy.** The mindmap called any AD shift from a supply-side policy a mistake. The
  guide includes demand-side effects of supply-side policies (PDF p. 50).
- **Indirect taxes.** A note said every indirect tax is a parallel shift; only a specific tax is.
- **Price controls.** They were described as "moving" equilibrium.
- **PED.** An objective ranked its determinants, which the guide does not do.
- **HL-only calculations.** Five were not marked HL-only (guide PDF pp. 33, 36).
- **4.9 barriers.** The list omitted endemic diseases (guide PDF p. 58).
- **The externality welfare-loss formula.** It is now the size of the gap, with the external cost
  read at the market quantity.
- **Five older glossary entries:**
  - two confusions wrongly prefixed "HL";
  - crowding out stated without its conditions;
  - collusion limited to formal agreements;
  - an unclear note on what makes a tax direct.

## 6. Content counts

Counted from the running page (`counts.mjs`) and from `course.js`.

| Item | Count |
|---|---|
| Lessons (Learning Spines) | 31, 127,992 words |
| Core learning blocks | 199 |
| Model cards | 67 |
| Mechanism chains | 57 |
| *Go deeper* panels | 64 |
| Misconception checks (MCQ with feedback) | 93 |
| Retrieval questions | 186 |
| *Can I explain it?* prompts | 62 |
| Practice questions (original) | 93 |
| Misconception database entries | 51 |
| Glossary terms | 250 (86 new) |
| Compare sets | 24 |
| Command terms | 33 |
| Checklists | 15 at HL (12 written, 3 generated); 13 at SL |
| Key concepts | 9 |
| Lens questions | 17 |
| Economics Intelligence paths | 6 |
| Inquiry tools | 6 |
| Snapshot mindmaps | 36, plus 35 last-night versions |
| Sections / tabs | 30 / 179 |
| Search records | 2,842 |

## 7. Topic coverage

- **All 31 subtopics** of the 2022 guide have a complete lesson, with every section in section 4.
  The HL-only subtopics (2.4, 2.10, 2.11, 2.12) are hidden at SL. HL-only content inside SL
  subtopics is labelled *HL only*.
- **The full coverage matrix** is in `docs/content-architecture.md` §7. Every gap is shown there as
  **0**, not hidden. The gaps:
  - **Real World cases:** none filed under 1.1, 1.2, 2.2, 2.5, 2.12, 3.1 and 3.4. No case was
    invented to fill a cell.
  - **Curated videos:** none for 12 subtopics.
  - **Misconception database:** no entries for 1.1, 1.2, 2.12, 3.4, 4.7 and 4.10. Each lesson still
    has its own three misconception checks.
  - **Diagrams:** none for 2.4 and 4.8, which the guide does not require.
- **The guide wins over the brief's syllabus list.** Where the brief's topic list differs from the
  2022 guide, the guide's numbering and titles are used. The differences are tabled in
  `docs/content-architecture.md` §3.
- **Terms of trade** is not in the 2022 guide. It appears only as context in two cases and is
  never presented as syllabus content.

## 8. Mindmap counts

| Kind | Count |
|---|---|
| Hand-drawn network maps (existing) | 42 |
| Subtopic snapshot maps | 31 |
| Unit snapshot maps | 4 |
| Course snapshot map | 1 |
| Last-night versions | 35 (subtopics and units) |
| Search records of kind Mindmap | 78 |

## 9. Diagram counts

- **Diagram plates:** 35, unchanged in number. All now open in Atlas 2.0 with six build steps, a
  label list, a lab link and print.
- **Model-card figures in lessons:** 67 cards, drawn from the same plates. Extra links were written
  where a subtopic's model needs a plate filed elsewhere, e.g. 3.1 uses the circular flow and the
  business cycle.

## 10. Calculation counts

- **Calculation Centre:** 36 calculations, unchanged in number. Each now has a calculation card.
- **HL-only calculations** are marked as the guide marks them (PDF pp. 33, 36).

## 11. Glossary counts

- **250 terms:** 164 existing and 86 new.
- **24 compare sets.**
- **Aliases** merge near-duplicates. The build rejects a new term that duplicates an existing one.
- **Search:** 250 records of kind *Dictionary*. Searching *externality* finds the term.

## 12. Command term counts

- **33 terms,** each with the guide's definition (IB OFFICIAL, page cited) and teacher guidance.
- **AO3 terms** appear in lessons only where the guide sets AO3 content. Eight subtopics are AO2
  only: 1.1, 1.2, 2.1, 2.2, 2.3, 2.6, 2.12 and 4.7.
- **Paper 2 practice** uses AO3 terms only in part (g) (guide PDF p. 67).

## 13. Misconception coverage

- **51 database entries,** all from the teacher's database, each tagged TEACHER-CREATED.
- They are linked to 25 of the 31 subtopics. The six without entries are listed in section 7.
- **93 lesson misconception checks** (three per lesson) cover all 31 subtopics.
- **Search:** 156 misconception records.

## 14. Real World coverage

- **203 cases**, unchanged in number. They are linked from lessons, unit pages and the six
  Intelligence paths.
- **24 subtopics** have at least one filed case. The seven without are listed in section 7.
- **Case titles:** the seven titles with a curly opening and a straight closing quote were left
  unchanged, because titles feed saved-progress hashes (section 22).

## 15. Exam question counts

| Kind | Count |
|---|---|
| Lesson practice questions (original) | 93 |
| Misconception checks | 93 |
| Retrieval questions | 186 |
| Self-explanation prompts | 62 |
| Paper 2 guided exercise | 1 full exercise, with a guide |
| Paper 3 scenario | 1, with worked routes |
| Search records of kind Question | 139 |

The existing question bank and Exam DNA are unchanged.

**What the questions do not claim:**

- No question claims to be an IB past paper.
- No question is said to "always come up".
- Mark allocations are shown only where the guide states them: Paper 1 (a) 10 and (b) 15; Paper 2
  (a)(i) and (a)(ii) 2 each, (b) 5, (c)–(f) 4 each, (g) 15; Paper 3 (a) up to 20 and (b) 10 per
  question; and the IA criteria. Each is shown with its page.
- The Paper 2 exercise splits (b) into 2 + 3 marks. That split is the exercise's own; the guide
  says only that (b) may be split, up to 5 marks.
- The Paper 2 exercise's country and data are invented, and labelled so.

## 16. Source coverage

| Tier | Source | Available | Used for |
|---|---|---|---|
| 1 | IB Economics guide, first assessment 2022 | Yes (supplied PDF text) | Syllabus content, levels, AO levels, command-term definitions, assessment facts |
| 2 | Teacher support material | Yes (supplied text) | Structure and inquiry design; not quoted |
| 2 | Assessment procedures 2026, academic integrity policy, AI guidance | **No** | Marked *Verification required* wherever relevant |
| 3 | Cambridge textbook | **No** | Nothing derives from it |
| 4 | Teacher's roadmap, misconception database, examiner guide | Yes (supplied PDFs) | Sequencing and hours (as recommendations), the 51 misconceptions, exam habits; always tagged TEACHER-CREATED |
| 5 | Original platform content | — | Lessons, model cards, checks, examples; tagged ARJUN AGRAWAL ANALYSIS |

Every lesson ends with a source footer naming its sources. Source tags (IB OFFICIAL,
TEACHER-CREATED, ARJUN AGRAWAL ANALYSIS) appear wherever those sources are used: on command-term
definitions, paper facts, misconception entries, unit hours and the Intelligence paths.

## 17. QA tests

**Every result below was run on the final build.** The in-page self-test and the Playwright
harness come from the final full run (`node tests/run-all.mjs`, log `runall-4.log`). The previous
full run (`runall-3.log`) also passed every suite, before the last content patch (the HL labels
below). axe-core and the print PDFs were re-run on the final build after `runall-4`.

**In-page self-test: 2,019 checks, 0 failures** (1,960 at the last release). Changes:

- **+53 course-layer checks** (`COURSESUITE`):
  - 18 on lessons;
  - 5 on the misconception database;
  - 4 on the glossary;
  - 3 each on search, paper guidance and integrity;
  - 2 each on command terms, snapshots, print, inquiry tools, Intelligence, revision and Atlas 2.0;
  - 1 each on the lens, the concept network, checklists and the calculation card.
- **+15 opening checks,** replacing 9 of the 15 old *Splash* checks. The other 6 still apply and
  still pass.
- **Content checks run on the course data:** absolute language, question-frequency claims, AO3
  terms only where the guide sets AO3 content, HL-only subtopics labelled, and every link and
  diagram resolving.

**Playwright harness: 12 suites, 283 checks, all passed** (last release: 10 suites, 196 checks).

| Suite | Checks | Result |
|---|---|---|
| `api-youtube.mjs` | 21 | 21 passed |
| `selftest.mjs` | 37 | 37 passed (2,019 in-page checks) |
| `e2e.mjs` | 22 | 22 passed |
| `ecosystem.mjs` | 30 | 30 passed |
| `renaissance.mjs` | 25 | 25 passed |
| `cover.mjs` | 33 | 33 passed (chapter order updated) |
| `pwa.mjs` | 4 | 4 passed |
| `widths.mjs` | 15 | 15 passed (42 routes × 15 widths) |
| `overlap.mjs` | 7 | 7 passed (29 routes × 15 widths) |
| `routes.mjs` | 2 | 2 passed (186 routes, cold, at 375 and 1366 px) |
| `intro.mjs` | 48 | 48 passed (**new**) |
| `course.mjs` | 39 | 39 passed (**new**) |

**The first full run failed one check, and it was a test defect.** On the first full run
(`runall-2.log`), `overlap.mjs` failed on `#/papers`. It reported the *Economic writing* guide's
inner summaries lying over the footer.

- **The cause.** The audit's visibility rule let any `<summary>` count as visible, including one
  nested inside another *closed* `<details>`. Chrome still reports layout boxes for that hidden
  content when a script asks.
- **Proof it was not a page fault.** With every section opened, a separate check found nothing
  overlapping on Papers 1 and 2. The pairs it flagged on Paper 3 and in a lesson were inline text
  wrapping after a label. A line-by-line check showed no overlap: in the lesson, the link ends at
  x = 282 and its text starts at x = 282. The fixed audit measures line boxes and passes on both
  routes.
- **The fix.** A closed `<details>` now shows only its own summary. The audit also gained nine new
  routes. It passes.

**Accessibility (axe-core, WCAG 2 A/AA and 2.1 AA).**

- **The run:** 40 routes, including 16 added for this release, at 1366 and 375 px, with reduced
  motion. That is 80 page runs. Each route was confirmed to open the tab it names.
- **The first scan** found 3 faults on 8 runs, all new in this release:
  - the Connect kicker's brass on paper (below 4.5:1 for 11 px text);
  - the concept network, an SVG marked `role="img"` holding buttons;
  - the snapshot map's scroll area, unreachable by keyboard at 375 px.
- **After the fixes:** a darker brass ink, `role="group"`, and a focusable labelled region.
  **0 violations on all 80 runs.**

**The economics red team** (before build):

- **Six reviewers** covered the four units, IB compliance with originality, and the glossary.
- **148 findings:** 2 critical, 22 major, 124 minor.
- **142 applied** as exact, addressed substring patches.
- **5 resolved in the build:** a duplicate glossary term was dropped, and four near-duplicates were
  merged as aliases.
- **1 left open:** five terms in the comparison tables have no glossary card of their own (section
  22).
- **8 editor patches** on top.
- **The build then checked** for errors, absolute wording and question-frequency claims: 0 of each.

**HL typography check** (after the red team, during this report). The guide says "HL only topics,
diagrams and calculations are in bold" (PDF p. 30).

- **The method.** Every bold line on the syllabus pages (PDF pp. 30–62) was read from the PDF's
  font data (pymupdf). The HL-only items falling inside SL subtopics were then searched for in the
  lessons (`hlscan.py`).
- **Confirmed.** "Average and marginal tax rates" in 3.4 is bold, so HL-only, as the lesson says. A
  reviewer had set it so; the text extraction alone could not show it.
- **Found.** HL-only content taught without an HL label in five SL lessons:
  - primary commodities in 2.5 and 2.6;
  - the multiplier, crowding out and automatic stabilisers in 3.6;
  - the monetary-union trade-off in 4.4;
  - Marshall–Lerner and the J-curve in 4.6.
- **Fixed.** 17 exact patches (`ed-2.json`) label them. A new self-test, *HL-only content inside an
  SL lesson is labelled HL where it is taught*, keeps them labelled. It was shown to fail when one
  label is removed: it reported "3.6 kc/1".

**Other checks:**

- **Secret scan** of the whole diff against `main` plus new files (2.1 MB) for API keys, tokens,
  private keys and `YOUTUBE_API_KEY` values: 0 matches. No credential files are tracked. No personal
  email appears.
- **Originality scan:** section 25.
- **Integrity scan:** section 26.

## 18. Responsive tests

| Test | Widths | Scope | Result |
|---|---|---|---|
| `widths.mjs` | 320, 360, 375, 390, 414, 430, 768, 834, 1024, 1280, 1366, 1440, 1600, 1920, 2560 | 42 routes: no horizontal overflow, no page errors, touch targets at least 28 px, scrolling tables keyboard-reachable | **15 of 15 widths passed** |
| `overlap.mjs` | The same 15 | 29 routes, 435 route-widths, 115,207 elements measured | **0 overlaps, 0 label collisions, 0 clipped labels, no sideways scroll** |
| `course.mjs` | 360, 390, 768, 1440 | 11 new pages: topics, a lesson, a unit, glossary, command terms, checklists, a key concept, the misconception database, a snapshot map, integrity, Paper 1 | **No page scrolls sideways at any width** |
| `routes.mjs` | 375, 1366 | Every one of 186 routes, cold | **All open without error** |
| `intro.mjs` | 360, 390, 768, 1024, 1440, 1920 | Every stage inside the screen, clear of Skip, fully visible at its moment | **Passed at all six** |

**The brief's widths are all covered:** 360, 390, 430, 768, 1024, 1440 and 1920 px are in the
15-width set. These are emulated viewports in Chromium. Real devices are listed under *Manual tests
still required*.

## 19. Print tests

**What was run.** `pdffinal.mjs` rendered every print document through Chromium's print pipeline
(`page.pdf` with the page's own `@page` rules) on the final build: 87 PDFs.
`pdfpages.py` (pymupdf) then read each PDF's page count and page size.

**Snapshot maps**

| Maps | One page | A4 landscape (842 × 595 pt) |
|---|---|---|
| 36 maps (31 subtopics, 4 units, course) and 35 last-night versions: **71** | **71 of 71** | **71 of 71** |

**Sheets** (all A4 portrait, 595 × 842 pt)

| Document | Pages |
|---|---|
| Lesson summary sheets: 1.1, 2.5, 2.8, 3.6, 4.10 | 3, 3, 4, 4, 3 |
| Glossary (all 250 terms) | 15 |
| Command terms (33) | 3 |
| The Economist's Lens | 1 |
| A checklist | 1 |
| Inquiry tools: diary, graph, Frayer, cross-comparison, continuum, cases | 1, 1, 1, 2, 1, 1 |
| A diagram plate (tax) | 2 |

**Checks**

- **Visual check.** The rendered pages were checked by eye:
  - the lesson 2.5 sheet;
  - the 2.8 map;
  - the Unit 2 last-night map, printed through the app's own `snapPrint`.

  Each has the restrained footer (*Arjun Agrawal | IB DP Economics*) and nothing cut off.
- **No print dialogue opens by itself.** During all 87 renders, `window.print` was called
  **0 times**. The print guard logged 87 *beforeprint without a user action* notices: one per
  `page.pdf()` call, which fires that event. They come from the test harness, not the page.
- **`tests/course.mjs`** separately checks:
  - the page rule and footer for the 2.8, Unit 3 and course maps;
  - that preparing them opens no dialogue;
  - that the 2.8 map renders to a PDF.
- **Existing print self-tests** (one `window.print` call site, print only after a user action)
  pass on the final build.

## 20. Intro timing test

**What was run.** `tests/intro.mjs` on the final build (`runall-4.log`). It reads the timing record the page keeps
(`window.__INTRO`) and the live animation objects.

| Width | Exit scheduled | Fade reaches 0 | Overlay removed | Start = first presented frame | Stages on screen, clear of Skip |
|---|---|---|---|---|---|
| 360 px | start + 5000 ms | start + 5000 ms | 5009.4 ms | Yes | Yes |
| 390 px | start + 5000 ms | start + 5000 ms | 5008.4 ms | Yes | Yes |
| 768 px | start + 5000 ms | start + 5000 ms | 5002.7 ms | Yes | Yes |
| 1024 px | start + 5000 ms | start + 5000 ms | 5012.9 ms | Yes | Yes |
| 1440 px | start + 5000 ms | start + 5000 ms | 5015.5 ms | Yes | Yes |
| 1920 px | start + 5000 ms | start + 5000 ms | 5019.3 ms | Yes | Yes |

- **The overlay is invisible from exactly 5000 ms** and removed on the next frame. The measured
  2.7–19.3 ms is one frame plus the test's own observation delay.
- **Skip:** out in 185 ms (a 170 ms fade, then the next frame). Afterwards the overlay is gone from
  the document.
- **Reduced motion:** the whole hierarchy appears at once. The sequence leaves 1.5 s after start,
  or when the platform is ready if that is later. In this test the page was ready at 3293 ms.
- **A deep link** shows the identity still and leaves when ready (3244 ms).
- **A reload** does not replay the sequence.
- **Timing checks in the in-page self-test** also pass:
  - the stage order and start times 0.7 / 1.4 / 2.2 / 3.1 / 4.0 s;
  - every stage ending by 5000 ms;
  - no timer chains;
  - opacity and transform only;
  - a slow start holding the final frame.
- **Not tested:** the timing in Safari and Firefox, and on a real slow phone (section 23).

## 21. Performance tests

**What was run.** `perf2.mjs` takes the median of five cold loads at 1366 px, with service workers
blocked, on the same machine, one build after the other. `main` (3797c23) was served from a clean
export; this release from the working tree. Nothing else was running.

These timings were measured before the last content patch: 17 HL labels in lesson text, and 1 added
self-test. Nothing else changed, and those changes do not affect loading. The file sizes below are
from the final build.

**Timing**

| | `main` | This release |
|---|---|---|
| First contentful paint | 384 ms | **168 ms** |
| DOMContentLoaded | 3,403 ms | 3,722 ms (+319 ms, +9.4%) |
| Start-up self-test | 2,065 ms (1,960 checks) | 2,403 ms (2,018 checks) |
| JS heap | 177 MB | 177 MB |
| Home view DOM nodes (`domcmp.mjs`) | 1,187 | 1,246 (+59, the course band) |

**Why.**

- **First paint is faster** because the font stylesheet no longer blocks rendering.
- **DOMContentLoaded is later** by about the extra self-test time (+338 ms): the 52 course-layer
  checks walk all 31 lessons. The opening covers this time.

**Page size**

| | `main` | This release |
|---|---|---|
| `index.html` | 4,819,171 (1,656,238 gzipped) | 5,054,696 (1,724,250 gzipped, +4.1%) |
| `assets/data/course.js` | — | 1,518,820 (433,699 gzipped) |

- **About 500 KB more to download,** compressed. It is cached by the service worker after the first
  visit.
- **No framework was added.** The course layer is plain JavaScript in the same single-file
  architecture, with its data in one file.

**Slow devices.** During development, the boot was also measured with the CPU throttled 4× in
Chromium's DevTools protocol: the start-up long task was about 15 s. That run was on an earlier build
of this release and was **not** repeated on the final build. The opening holds its final frame for
that time (section 20); it does not exit over an unfinished page.

## 22. Known limitations

- **Sources not available.** The Cambridge textbook, the 2026 assessment procedures, the IB's
  academic integrity policy and its AI guidance were not available. Statements that depend on them
  say *Verification required*.
- **Coverage gaps.** Real World cases, videos and misconception-database entries are missing for
  the subtopics in section 7. They were not invented.
- **Five comparison-table terms have no glossary card of their own:** quantity demanded, productive
  efficiency, consumer and producer share of the tax, and nominal GDP. Each is defined inside its
  comparison table. This is the one review finding left open.
- **Seven case titles** have mismatched quotation marks: MIC-049, MAC-026, MAC-007, MAC-022,
  GLO-049, GLO-045 and DEV-044. They were left as they are, because saved progress is keyed to a
  hash of the title.
- **"What next" is rule-based.** It uses written prerequisites and your own ratings. It is not
  adaptive, and the platform does not claim it is.
- **Progress is per device.** Ratings, inquiry-tool work and glossary status are stored in the
  browser, like the rest of the platform.
- **Slow devices.** The start-up self-test runs about 2.2 s of a 2.9 s desktop boot. On a slow
  device (4× CPU throttle), start-up takes longer than 5 s. The opening then holds its final frame
  until the page is ready, rather than exiting on time over an unfinished page.
- **Fonts in the test browser.** Google Fonts are blocked in the headless test environment, so
  screenshots use fallback fonts. Layout checks were run that way.

## 23. Manual tests still required

These were **not** run. They need a person or a real device:

1. **Real phones and tablets:** iOS Safari and Android Chrome, the lessons and the opening, with
   real touch.
2. **Real print dialogues.** Chrome, Safari and Firefox printing a lesson sheet, a snapshot map and a
   last-night map to paper. Check margins and that the map stays on one page. The automated test
   rendered PDFs through Chromium only.
3. **The opening's timing in Safari and Firefox.** Paint Timing re-anchoring is Chromium-verified
   only. Other browsers fall back to the first animation frame.
4. **The opening on a genuinely slow phone.** Check that the held final frame reads well.
5. **A screen-reader pass** (VoiceOver, NVDA) through one lesson, the glossary and the inquiry
   tools. axe-core checks structure, not the listening experience.
6. **Content review by the author.** Read each lesson's teacher layer and each TEACHER-CREATED label,
   and confirm the recommendations are yours.

## 24. Source verification status

| Claim type | Status |
|---|---|
| Syllabus content, subtopic titles | Checked against the supplied guide text |
| HL-only content | Checked against the guide's own typography. The guide says "HL only topics, diagrams and calculations are in bold" (PDF p. 30). Every bold line on PDF pp. 30–62 was read from the PDF's font data and compared with the lessons (section 17). |
| Command-term definitions | Quoted from the guide's glossary, page cited |
| Assessment structure: papers, marks, durations, IA criteria | Checked against the guide (PDF pp. 64–68, 77–78), page cited |
| Recommended teaching hours | Guide PDF p. 26 |
| Academic integrity, AI use, EE rules | **Verification required.** The policy documents were not supplied. The platform says so on the page. |
| The teacher's examiner guide | Claims not found in the guide are not repeated. They are listed in `docs/content-architecture.md` §8: calculators "required", Paper 2 (a) = "definitions", "black pen". |
| Real-world evidence in lessons | Hedged, with no invented statistics. Illustrative numbers are labelled as invented. |
| Earlier-release IB claims | Unchanged. Their verification is recorded in `docs/releases/2026-09-22-release-report.md`. |

## 25. Copyright / originality check

**What was run.** `origscan.py` (in the release scratchpad) takes every string in `course.js` and
cuts it into overlapping runs of 10 words: 116,701 runs in all. It compares them with the full text
of the five sources supplied: the guide, the TSM, and the three teacher documents.

| Source | Strings sharing any 10-word run | What they are |
|---|---|---|
| IB guide | 44 | See the breakdown below. |
| Teacher support material | 9 | The same concept list, real-world issues and Brundtland definition, all also in the guide, plus one law-of-supply sentence (1 run) |
| Teacher's examiner guide | 7 | The concept list, the standard definition of inflation, the PES formula in words, and "one question from a choice of three" |
| Teacher's roadmap | 2 | The nine-concept list |
| Teacher's misconception database | 164 (158 database entries, 6 lesson lines) | The 51 entries are the author's own supplied material, adapted into student and teacher views and tagged TEACHER-CREATED. This is intended use of a Tier 4 source. |

**The 44 guide overlaps:**

- **21 command-term definitions.** Quoted on purpose, marked as quotations, tagged IB OFFICIAL,
  with the page cited.
- **The *recommend* definition** in the Paper 3 guidance, quoted and cited in the same way.
- **The six real-world issue questions,** now labelled *as the guide words it* (changed during this
  report).
- **The nine key concept names** and the Brundtland definition of sustainable development. The
  Brundtland definition comes from a 1987 UN report and is widely quoted.
- **Syllabus phrases:**
  - the PPC and poverty-cycle diagram requirements (1.1, 4.9);
  - the list of arguments for protection, in a retrieval answer that asks for the syllabus's list
    (4.3);
  - elasticity formulae in words;
  - one practice stem that uses the guide's phrase for 2.12.

No lesson block, model card, explanation or misconception check reproduces a guide or TSM
paragraph. The longest shared passage outside quoted definitions is the syllabus list in 4.3.

**The textbook** was not supplied. Nothing in the platform was written from it, and no textbook
exercise, page, diagram or prose appears.

**The earlier compliance review** (reviewer 5 of 6) rewrote the passages that followed the guide too
closely, among them a 13-word run in the Paper 2 facts. It also corrected a page citation for Paper 3 (p. 68 to p. 64).

**Branding.** No IB logo or IB branding is used. Every IB statement is presented as a citation, not
as IB material.

## 26. Academic integrity check

**Checks run on the final build:**

- **Three in-page self-tests** (section 17), all passing:
  - *every IA page carries the learning-support line*;
  - *nothing offers to write, finish or disguise assessed work*;
  - *policy detail that could not be checked is marked for verification*.
- **The earlier EE Studio test,** *the AI page gives no advice on evading detection*, still passes.
- **A text scan** of `index.html` and `course.js` for evasion and outsourcing language: *undetect*,
  *humanise*, *bypass detection*, *AI detector*, *write your IA/commentary/essay for*,
  *submission-ready*, *ready to submit* and *paraphrasing tool*. Every match was either one of
  these tests' own patterns or ordinary economics ("growth may bypass the poor").
- **The same scan for absolute claims:** *always comes up*, *guaranteed* and *will definitely*.
  The only matches were the frequency check's own pattern, cases about guaranteed prices, and a
  writing guide that warns against "will definitely".

**What the platform does and does not do:**

- The IA and EE pages, inquiry tools and self-explanation prompts **help a student think and check
  their own work**. None of them turns a student's article into a commentary. None drafts assessed
  text.
- The Academic integrity page separates allowed support, work that must be the student's own and
  what must be acknowledged.
- **The IB's current academic integrity policy and AI guidance were not available.** The page marks
  the relevant statements *Verification required* and tells students to check with their teacher
  or DP coordinator before they submit any assessed work.
- No grade is predicted or calculated. The one appearance of "predicted grades" is in the school
  deadlines list: a date to check, not a prediction.
