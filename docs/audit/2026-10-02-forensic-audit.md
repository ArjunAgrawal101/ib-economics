# Forensic audit, 2 October 2026

This audit compares what the repository's documents say with what the code and the running app actually do. It starts from the repository and its git history, not from earlier reports, including reports written by Claude.

## 1. Method

- **Git history.** Nine snapshots of `main` (from the first upload, `fd2403d`, to `8e2efbc`, the merge of pull request 7) were checked out and served one at a time. Each was booted in Chromium, with its page errors and the result of its own self-test recorded.
- **Documents against the app.** 222 distinct claims were taken from `README.md`, `RELEASE-REPORT.md`, `docs/` and the release reports. Each was checked in the running app by rendering every section and every tab (34 sections, 194 tabs), clicking the real tab bar, evaluating search-result targets and cold-loading deep links. Where the app and a document disagreed, the source in `index.html` was read to find out why.
- **Independent check.** Every broken-feature finding below was reproduced separately before any fix was written, on this branch, on `main` (`8e2efbc`) and on the first upload (`fd2403d`).

## 2. What git history shows

| Snapshot | Boots | Page errors | Built-in self-test | Search records |
|---|---|---|---|---|
| `fd2403d` (first upload) | yes | 0 | 1,654 checks, all pass | 2,304 |
| `8e2efbc` (`main` today) | yes | 0 | 2,019 checks, all pass | 2,842 |
| this branch, before this release | yes | 0 | 2,037 checks, all pass | 2,873 |
| this branch, this release | yes | 0 | 2,058 checks, all pass | about 2,900 |

- **No lost work.** Across the nine snapshots, the only feature ever removed was the Topic dossier. It was replaced by the 31 lessons, and its old address now redirects to the lesson.
- **Not yet on `main`.** The Economic data lab, Economists and ideas, and *Why did this happen?* live on this branch only. So do the Economic events archive and the Pathways added in this release.
- **The self-test cannot see wrong pages.** The built-in self-test passed at every snapshot, yet the tab faults in §4 were present at every one, from the first upload on. The self-test checks that each view renders. It does not check that a tab shows the page its label names. `tests/tabs.mjs` and the new "Tabs ·" self-tests now check exactly that.

## 3. Deployment

| Claim | Finding | Status |
|---|---|---|
| "The workflow at `.github/workflows/pages.yml` publishes the site" | There is no `.github` folder. `pages.yml` sits at the repository root, where GitHub never reads it. The live GitHub Pages site comes from GitHub's built-in *pages build and deployment* from `main`. | README corrected. The file was not moved, because moving it would change how production deploys. |
| The YouTube feed via `/api/youtube` | This is a serverless function, so it cannot run on GitHub Pages. On Pages the video studio shows its fallback (the channel link). | Behaves as designed on Pages; the live feed needs a host that runs functions. |
| A Vercel production deployment | `vercel.app` cannot be reached from this environment, and the repository holds no `vercel.json`. | Could not be verified here. |

## 4. Broken features found, and fixed in this release

Nothing in this table was introduced by recent work: every fault was present on `main` and in the first upload.

| Area | What a reader saw | Cause | Fix |
|---|---|---|---|
| **Practise** | Six tabs opened the page next to them. *Economist's Gym* showed the data lab, *Retrieval* the Gym, and so on to *Teach it back*, which showed Transfer tasks. | The tab map (`tabDispatch("practise", …)`) was written for a tab list that later lost three tabs. | Tabs are now routed by label. |
| **Practise, unreachable tools** | The data lab, the nine-trap data lab and the writing lab could not be reached from any tab, menu or search result. | They were mapped to tab numbers that no longer existed. | Each has a tab again: *The data lab*, *Data trap lab*, *Writing lab*. |
| **Teacher** | *Class dashboard*, *IA checklist*, *Lesson planner*, *Retrieval starter*, *Exam builder* and *Marking sheets* all showed Class intelligence. | A later view that ignores the tab overwrote the per-tab one, and the tab map then called it. | Tabs are now routed by label. |
| **IA** | *Student checklist* and *Portfolio tracker* showed the Supervisor gates page. | Same cause as Teacher. | Tabs are now routed by label. |
| **My workspace** | *Revision priority* showed the study plan. | The tab had no entry in the tab map. | It now opens the revision priority list. |
| **Calculation addresses** | `#/calculate/0/ped`, and every calculation search result, opened the board's index. | The calculation view never read the address. | The address now opens that calculation, and leaving it returns to `#/calculate`. |
| **Search: simulator and worked cases** | These results opened the wrong tab. | The targets were fixed tab numbers. | Both now open their tab, found by label. |

All of these fixes live in `src/modules/00-tab-repair.js`. Because the module routes by label, adding a tab can no longer shift the others.

They are checked twice:
- in the browser by `tests/tabs.mjs`, which clicks the real tab bar (it fails on the old build and passes on this one);
- by six new self-tests named "Tabs ·".

## 5. Remaining open items

- **Resolved after this audit:** the Exam DNA notice now appears on every DNA page. The economist inquiry question was always rendered, under the label *Investigate*, and is now labelled *An inquiry question*. Both are checked by `tests/notices.mjs`.
- **Unverifiable from here:** the live YouTube feed, the Vercel deployment, and where the printable calculation sheet is offered.

## 6. Feature matrix

Columns:
- **EXISTS**: the code for the feature is present.
- **WORKS**: it behaves as documented.
- **VISIBLE**: a reader can reach it from navigation or search.
- **TESTED**: how it was verified in this audit.
- **SOURCE**: the document that makes the claim.
- **STATUS**: the audit's category, then the state after this release.

In the table of documented claims, EXISTS, WORKS and VISIBLE record what the audit found before this release's fixes. STATUS shows the state after them.

The audit's categories:

| Code | Meaning |
|---|---|
| A | Working |
| B | Not reachable from navigation |
| C | Broken |
| D | Incomplete |
| H | Duplicated |
| I | The document is wrong |
| J | Could not be verified here |

### Added in this release

| FEATURE | EXISTS | WORKS | VISIBLE | TESTED | SOURCE | STATUS |
|---|---|---|---|---|---|---|
| Opening: the home page plays five seconds on every kind of load; deep links skip it | Yes | Yes | Yes | `tests/intro.mjs` | README › The opening sequence | New → Working |
| Economic events: 12 events, 14 chapters each | Yes | Yes | Yes (More menu, drawer, home band, search) | `tests/events.mjs`, 10 self-tests | README › Economic events | New → Working |
| Event charts from validated historical series, with the event marked | Yes | Yes | Yes | `tests/events.mjs` (every chart of every event), overlap audit | README › Economic events | New → Working |
| Compare events; Economics through time | Yes | Yes | Yes | `tests/events.mjs` | README › Economic events | New → Working |
| Pathways (six), making no Cambridge or civil-services syllabus claims | Yes | Yes | Yes | `tests/events.mjs`, self-tests | README › Pathways | New → Working |
| Indian economy hub | Yes | Yes | Yes | `tests/events.mjs` | README › Pathways | New → Working |
| Tabs routed by label | Yes | Yes | Yes | `tests/tabs.mjs`, 6 self-tests | this audit, §4 | New → Working |

### Every documented claim (222)

| FEATURE | EXISTS | WORKS | VISIBLE | TESTED | SOURCE | STATUS |
|---|---|---|---|---|---|---|
| 'Teach it back' mode | Yes | Yes | No | function render + tab sweep | README.md > What it contains (Practise) | B → Fixed in this release (tests/tabs.mjs) |
| Nine-trap data lab | Yes | Yes | No | function render + tab sweep + search | README.md > What it contains (Practise) | B → Fixed in this release (tests/tabs.mjs) |
| Writing lab (causal, conditional, comparative, evaluative, judgement) | Yes | Yes | No | function render + tab sweep + search | README.md > What it contains (Practise) | B → Fixed in this release (tests/tabs.mjs) |
| Calculation deep link / search result opens that calculation (and its calculation card) | Yes | No | Yes | cold URL load, palette click, search-record go | README.md > Navigation (search); docs/content-architecture.md §5 (Calculation card) | C → Fixed in this release (tests/tabs.mjs) |
| Data lab with six constructed datasets | Yes | No | Yes | globals evaluated in page; tab heading sweep (all 191 tabs) | README.md > What it contains (Practise) | C → Fixed in this release (tests/tabs.mjs) |
| Economist's Gym (seven drills) | Yes | No | Yes | tab heading sweep (all 191 tabs) | README.md > What it contains (Practise) | C → Fixed in this release (tests/tabs.mjs) |
| Exam builder with answer key | Yes | No | Yes | tab heading sweep (all 191 tabs) | README.md > What it contains (Teacher tools) | C → Fixed in this release (tests/tabs.mjs) |
| Fillable IA feedback checklist (Teacher > IA checklist) | Yes | No | Yes | tab heading sweep (all 191 tabs); real tab click | README.md > What it contains (Teacher tools) | C → Fixed in this release (tests/tabs.mjs) |
| Five families of thinking drills | Yes | No | Yes | globals evaluated in page; tab heading sweep (all 191 tabs) | README.md > What it contains (Practise) | C → Fixed in this release (tests/tabs.mjs) |
| Five-minute retrieval starter generator | Yes | No | Yes | tab heading sweep (all 191 tabs) | README.md > What it contains (Teacher tools) | C → Fixed in this release (tests/tabs.mjs) |
| IA portfolio tracker | Yes | No | Yes | tab heading sweep (all 191 tabs) | README.md > What it contains (IA) | C → Fixed in this release (tests/tabs.mjs) |
| IA student checklist | Yes | No | Yes | tab heading sweep (all 191 tabs); real tab click | README.md > What it contains (IA) | C → Fixed in this release (tests/tabs.mjs) |
| Lesson planner with success criteria, differentiation, extension | Yes | No | Yes | tab heading sweep (all 191 tabs); real tab click | README.md > What it contains (Teacher tools) | C → Fixed in this release (tests/tabs.mjs) |
| Practise tabs show the surface they name (Economist's Gym, Retrieval, Ten-minute revision, Thinking drills, Transfer tasks, Teach it back) | Yes | No | Yes | tab heading sweep (all 191 tabs); real tab click | README.md > What it contains (Practise); Accuracy corrections #16 (tabs show the surface their label names) | C → Fixed in this release (tests/tabs.mjs) |
| Printable marking sheets | Yes | No | Yes | tab heading sweep (all 191 tabs) | README.md > What it contains (Teacher tools) | C → Fixed in this release (tests/tabs.mjs) |
| Search 'Definition' records open the definition drill | Yes | No | Yes | eval search go | README.md > Navigation (search) | C → Fixed in this release (tests/tabs.mjs) |
| Search 'Exam simulator' records start the run in the simulator | Yes | No | Yes | eval search go | README.md > Navigation (search) | C → Fixed in this release (tests/tabs.mjs) |
| Search 'Worked case' records open the case | Yes | No | Yes | eval every search kind's go | README.md > Navigation (search) | C → Fixed in this release (tests/tabs.mjs) |
| Six transfer tasks | Yes | No | Yes | globals evaluated in page; tab heading sweep (all 191 tabs) | README.md > What it contains (Practise) | C → Fixed in this release (tests/tabs.mjs) |
| Spaced retrieval queue | Yes | No | Yes | tab heading sweep (all 191 tabs) | README.md > What it contains (Practise) | C → Fixed in this release (tests/tabs.mjs) |
| Ten-minute revision run | Yes | No | Yes | tab heading sweep (all 191 tabs) | README.md > What it contains (Practise) | C → Fixed in this release (tests/tabs.mjs) |
| Workspace 'Revision priority' tab | Yes | No | Yes | tab heading sweep (all 191 tabs); click | undocumented tab (SECTIONS) | C → Fixed in this release (tests/tabs.mjs) |
| Annotated exemplar library | Yes | Partly | Yes | globals evaluated in page | README.md > What it contains (Teacher tools) | D → README corrected |
| Exam DNA: no prediction notice on every surface | Yes | Partly | Yes | nav() render + innerText regex | README.md > Exam DNA | D → Fixed after the audit (tests/notices.mjs) |
| Media room: every video, diagram, map, case and printable in one filterable place | Yes | Partly | Yes | nav() render + innerText regex | README.md > What it contains (Media room) | D → README corrected |
| Profile fields: problem, ideas, contribution, assumptions, influence, criticisms, why it matters, misreading, inquiry question, works/prizes, links | Yes | Partly | Yes | nav() render + innerText regex | README.md > Economists and ideas | D → Fixed after the audit (tests/notices.mjs) |
| Macroeconomic objectives: 'five' vs guide's four (+HL debt) | Yes | Yes | Duplicated | doc compare | README.md > Accuracy corrections; docs/releases/2026-09-26-release-report.md §9 | H → README corrected |
| Supervisor gates | Yes | Yes | Duplicated | tab heading sweep (all 191 tabs) | README.md > What it contains (IA) | H → Fixed in this release (tests/tabs.mjs) |
| 151 routes | Yes | Yes | Yes | globals evaluated in page | README.md > Technology | I → README corrected |
| 157-term economist's dictionary | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | README.md > What it contains (Course) | I → README corrected |
| 34-plate diagram atlas (performance note) | Yes | Yes | Yes | globals evaluated in page | README.md > Technology | I → README corrected |
| About: interactive five-stage journey | Yes | Yes | Yes | nav() render + innerText regex; globals evaluated in page | README.md > What it contains (About); The About page | I → README corrected |
| About: three roles / four positions | Yes | Yes | Yes | nav() render + innerText regex | README.md > What it contains (About); The About page | I → README corrected |
| Analytical layers: 'Five cross-cutting surfaces' (lists six) | Yes | Yes | Yes | doc read | README.md > What it contains (Analytical layers) | I → README corrected |
| Diagram Engine: 27 model-driven diagrams validated, largest miss 0.000 px; seven schematic plates | Yes | Yes | Yes | nav() render + innerText regex | README.md > Technology | I → README corrected |
| Each video paired with three checkpoint questions | Yes | Yes | Yes | globals evaluated in page | README.md > What it contains (Video learning) | I → README corrected |
| Eleven chapters named Think, Learn, See, Interact, Connect, Practise, Research, Explore, Watch, Teach, About | Yes | Yes | Yes | nav() render + innerText regex | README.md > Design and discovery | I → README corrected |
| Every topic dossier carries an 'Economics at a glance' card and real-world snapshot | Yes | Yes | Yes | nav() render + innerText regex; source | README.md > The learning chain | I → README corrected |
| Exam rooms: ten rooms | Yes | Yes | Yes | globals evaluated in page | docs/releases/2026-09-29-cover-release-report.md §1/§5 | I → Historical report, superseded by this audit |
| Export, import and reset are in Master -> Your data | Yes | Yes | Yes | nav() render + innerText regex | README.md > Privacy | I → README corrected |
| Mobile drawer grouped under Learn, Practise, Progress, Resources, IA, Teacher, About | Yes | Yes | Yes | globals evaluated in page | README.md > The mobile layer | I → README corrected |
| Palette filter group 'Ideas, reasoning and data' | Yes | Yes | Yes | keyboard / | RELEASE-REPORT.md §12 | I → Historical report, superseded by this audit |
| RELEASE-REPORT: 30 sections and 179 tabs | Yes | Yes | Yes | globals evaluated in page | RELEASE-REPORT.md §1 | I → Historical report, superseded by this audit |
| Random Economics across ten kinds | Yes | Yes | Yes | globals evaluated in page | README.md > Design and discovery; docs/releases/2026-09-29-release-report.md §7 | I → README corrected |
| Search index 2,294 rows across 49 kinds | Yes | Yes | Yes | globals evaluated in page | README.md > Real-world economics | I → README corrected |
| Search index 2,842 records (course release) | Yes | Yes | Yes | globals evaluated in page | docs/releases/2026-09-29-course-release-report.md §4 | I → Historical report, superseded by this audit |
| Section/route totals: 26 sections, 151 routes, 1,654 assertions, 157 dictionary terms | Yes | Yes | Yes | globals evaluated in page | docs/releases/2026-09-22-release-report.md §5 | I → README corrected |
| Single copied index.html runs 1,923 checks | Yes | Yes | Yes | not run | README.md > Technology | I → README corrected |
| Topic dossier: one page per subtopic in sixteen sections | Yes | Yes | Yes | cold URL | README.md > What it contains (Topic dossier) | I → README corrected |
| 'Latest from Arjun' home band appears only once a video list has loaded | Unknown | Unknown | Unknown | nav() render + innerText regex | docs/releases/2026-09-26-release-report.md §8 | J → Unverifiable here |
| Arjun Agrawal Video studio reads channel via /api/youtube | Unknown | Unknown | Unknown | nav() render + innerText regex | README.md > Video studio and the YouTube feed | J → Unverifiable here |
| Printable calculation sheet for the student's level | Unknown | Unknown | Unknown | nav() render + innerText regex | README.md > What it contains (Calculate) | J → Unverifiable here |
| 'Check my diagram' error detector | Yes | Yes | Yes | tab heading sweep (all 191 tabs) | README.md > What it contains (Lab) | A → Working |
| 'Real-world case' node type in seven maps | Yes | Yes | Yes | globals evaluated in page | README.md > Accuracy corrections | A → Working |
| 11-model library | Yes | Yes | Yes | globals evaluated in page | README.md > What it contains (Lab) | A → Working |
| 20-policy toolkit with comparison matrix and two-policy comparator | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | README.md > What it contains (Lab) | A → Working |
| 203 real-world cases remapped to the 2022 guide | Yes | Yes | Yes | globals evaluated in page | README.md > What it contains (Real World); Real-world economics | A → Working |
| 24 of 31 subtopics hold a case; seven gaps named | Yes | Yes | Yes | globals evaluated in page | README.md > Real-world economics | A → Working |
| 28 opener figures built from stated functions | Yes | Yes | Yes | globals evaluated in page | README.md > Design and discovery | A → Working |
| 31 lessons at Course > Topics | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | README.md > The course | A → Working |
| 34 curated videos across 19 subtopics from nine channels | Yes | Yes | Yes | globals evaluated in page | README.md > Video learning | A → Working |
| 35-plate diagram atlas with reading guide per plate | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | README.md > What it contains (Lab); docs/releases/2026-09-29-release-report.md §5 | A → Working |
| 37 of 42 mindmaps show real-world cases; five say they cannot | Yes | Yes | Yes | loop all 42 maps | README.md > Mindmaps; The learning chain | A → Working |
| 42 mindmaps: 10 core, 22 topic, 10 synthesis | Yes | Yes | Yes | globals evaluated in page | README.md > Mindmaps | A → Working |
| 762 nodes in total | Yes | Yes | Yes | globals evaluated in page | README.md > Mindmaps | A → Working |
| About: six-part portfolio, six principles, platform story, longer version folded, UPSC | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | README.md > The About page | A → Working |
| About: three photographs at own ratios with lightbox | Yes | Yes | Yes | globals evaluated in page | README.md > The About page | A → Working |
| Academic integrity tab with 'Before I submit' | Yes | Yes | Yes | tab heading sweep (all 191 tabs) | README.md > The course | A → Working |
| Answer diagnostic and 'Why did I lose marks?' | Yes | Yes | Yes | tab heading sweep (all 191 tabs); source | README.md > What it contains (Exam) | A → Working |
| Assignment builder: items, student/teacher print, self-contained link | Yes | Yes | Yes | nav() render + innerText regex | README.md > The assignment builder | A → Working |
| Atlas 2.0: build each plate in six steps, label list, lab link, print | Yes | Yes | Yes | nav() render + innerText regex | docs/releases/2026-09-29-course-release-report.md §5 | A → Working |
| Brent, US 10-year yield, US unemployment, 23 exchange rates | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | README.md > Economic data | A → Working |
| Browse/filter by topic, concept, assessment, place, theme, level, case type; search says why it matched | Yes | Yes | Yes | nav() render + innerText regex | README.md > Real-world economics | A → Working |
| Calculation centre: 36 calculations with practice | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | README.md > What it contains (Calculate) | A → Working |
| Case intelligence brief labelled by statement type | Yes | Yes | Yes | nav() render + innerText regex | README.md > Design and discovery; docs/releases/2026-09-29-think-release-report.md §5 | A → Working |
| Case room: eight cases in eleven sections | Yes | Yes | Yes | nav() render + innerText regex | README.md > What it contains (Case room) | A → Working |
| Charts: up to five economies, table, computed facts, questions | Yes | Yes | Yes | nav() render + innerText regex | README.md > Economic data | A → Working |
| Checklists incl. 'Can I actually do this?' (15 HL / 13 SL) | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | README.md > The course; docs/releases/2026-09-29-course-release-report.md §4 | A → Working |
| Command palette on / and Ctrl/Cmd+K reaching sections, printables and content | Yes | Yes | Yes | keyboard | README.md > Technology | A → Working |
| Command term lab covering all 33 terms | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | README.md > What it contains (Course) | A → Working |
| Compare events; Economics through time with 12 events and 16 economists | Yes | Yes | Yes | nav() render + innerText regex | README.md > Economic events | A → Working |
| Concept network: one concept, many worlds | Yes | Yes | Yes | nav() render + innerText regex | README.md > The course | A → Working |
| Concept-connection exercise | Yes | Yes | Yes | nav() render + innerText regex | README.md > What it contains (Think) | A → Working |
| Conditions library of twelve conditions + assumptions lab + 'when does the model break' lab | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | README.md > What it contains (Think) | A → Working |
| Connection graph on every case (mindmaps, diagrams, videos, archetypes...) | Yes | Yes | Yes | nav() render + innerText regex | README.md > Real-world economics | A → Working |
| Contact details on About, Tutorials and contact drawer | Yes | Yes | Yes | nav() render + innerText regex | README.md > Contact | A → Working |
| Continue exploring and remembered level (device only) | Yes | Yes | Yes | nav() render + innerText regex | README.md > Economics, Everywhere | A → Working |
| Counterfactual 'What if?' lab | Yes | Yes | Yes | globals evaluated in page | README.md > What it contains (Lab) | A → Working |
| Country profile includes that economy's Real World cases | Yes | Yes | Yes | nav() render + innerText regex | RELEASE-REPORT.md §4 | A → Working |
| Course: at a glance, real-world issues, key concepts, curriculum explorer, SL/HL explorer, knowledge map | Yes | Yes | Yes | tab heading sweep (all 191 tabs) | README.md > What it contains (Course) | A → Working |
| Coverage matrix (teacher) | Yes | Yes | Yes | tab heading sweep (all 191 tabs) | SECTIONS (Teacher tab) | A → Working |
| Curriculum explorer reads each subtopic three ways (know / be able to do / assessed) | Yes | Yes | Yes | nav() render + innerText regex | README.md > Educational philosophy | A → Working |
| Dashboard: twelve-dimension model, topic health, revision priority, countdown, confidence check | Yes | Yes | Yes | tab heading sweep (all 191 tabs); nav() render + innerText regex | README.md > What it contains (Dashboard) | A → Working |
| Data file loads only when a data page opens | Yes | Yes | Yes | globals evaluated in page | README.md > Economic data; RELEASE-REPORT.md §15 | A → Working |
| Data sources library and 'Economics now' (no live data) | Yes | Yes | Yes | nav() render + innerText regex | README.md > What it contains (Real World) | A → Working |
| Depth control Foundation / Core / Deeper | Yes | Yes | Yes | nav() render + innerText regex | README.md > The course | A → Working |
| Diagram builder ('build it yourself') | Yes | Yes | Yes | tab heading sweep (all 191 tabs) | README.md > What it contains (Lab) | A → Working |
| EE source discipline: guide five-year rule vs Navigator shown side by side | Yes | Yes | Yes | nav() render + innerText regex | README.md > Economics EE Studio | A → Working |
| EE tools: evidence matrix 13 fields, argument map 9 node types, data lab 9 calculations, red team 10, reflection 8 prompts, AI grid 9 rows, quality check 11 areas | Yes | Yes | Yes | globals evaluated in page | docs/releases/2026-09-26-release-report.md §3 | A → Working |
| EE: 20 topic areas, 24 models, RQ lab 12 dimensions | Yes | Yes | Yes | globals evaluated in page | README.md > What it contains (EE Studio); docs/releases/2026-09-26-release-report.md §3 | A → Working |
| Each event has fourteen chapters with fact/interpretation/inference/controversy labels and 'How the numbers were checked' | Yes | Yes | Yes | nav() render + innerText regex | README.md > Economic events | A → Working |
| Economic data at #/data: explorer, country profiles, markets and prices, sources and method | Yes | Yes | Yes | tab heading sweep (all 191 tabs) | README.md > Economic data; RELEASE-REPORT.md §4 | A → Working |
| Economic events and Pathways reachable from More and drawer | Yes | Yes | Yes | click More; MOBGROUPS | README.md > Economic events / Pathways | A → Working |
| Economic events archive: twelve events | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | README.md > Economic events | A → Working |
| Economics EE Studio: nineteen areas | Yes | Yes | Yes | tab heading sweep (all 191 tabs) | README.md > What it contains (EE Studio) | A → Working |
| Economics Intelligence: six real-world issues as concept-to-exam paths | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | README.md > The course; docs/content-architecture.md §5 | A → Working |
| Economics in 60 Seconds: ten issues 001-010 inside Learn | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | README.md > Economics in 60 Seconds | A → Working |
| Economics, Everywhere at #/everywhere, linked from bar, drawer, More, home | Yes | Yes | Yes | bar/More/MOBGROUPS/home text | README.md > Economics, Everywhere | A → Working |
| Economist's eye game (15 situations) | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | docs/releases/2026-09-25-release-report.md §2 | A → Working |
| Economist's notes (13) and misconception boxes (12 on 11 pages) | Yes | Yes | Yes | loop all 20 concept pages; globals evaluated in page | README.md > Design and discovery; docs/releases/2026-09-29-think-release-report.md §11 | A → Working |
| Economist's toolkit: eighteen lenses | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | README.md > What it contains (Think); docs/releases/2026-09-29-release-report.md §5 | A → Working |
| Educator Studio: 5 role pathways, 10 handbook modules, coordinator notes | Yes | Yes | Yes | globals evaluated in page; tab heading sweep (all 191 tabs) | README.md > What it contains (Educator Studio); docs/releases/2026-09-26-release-report.md §7 | A → Working |
| Eight worked cases split into fact/interpretation/inference | Yes | Yes | Yes | globals evaluated in page | README.md > What it contains (Real World) | A → Working |
| Eighteen node types | Yes | Yes | Yes | globals evaluated in page | README.md > Mindmaps | A → Working |
| Elasticity lab (Lab, last tab): PED with sign, \|PED\| class, revenue rectangles | Yes | Yes | Yes | nav() render + innerText regex | README.md > Design and discovery; docs/releases/2026-09-29-cover-release-report.md §5 | A → Working |
| Evaluation stress test across fourteen dimensions | Yes | Yes | Yes | globals evaluated in page | README.md > What it contains (Think) | A → Working |
| Event charts from assets/data/history.js (lazy) | Yes | Yes | Yes | globals evaluated in page | README.md > Economic events | A → Working |
| Exam DNA confidence levels 803/122/62/3 | Yes | Yes | Yes | data count | README.md > Exam DNA | A → Working |
| Exam DNA: 212 questions, 990 parts, 12 sessions | Yes | Yes | Yes | nav() render + innerText regex | README.md > Exam DNA | A → Working |
| Exam DNA: seven surfaces incl. eleven archetypes, mark lens, heatmap, morpher, museum, source register (five papers) | Yes | Yes | Yes | globals evaluated in page; tab heading sweep (all 191 tabs) | README.md > Exam DNA | A → Working |
| Exam cockpit for Papers 1-3 with timer, plan-write-review, autosave | Yes | Yes | Yes | nav() render + innerText regex | README.md > What it contains (Exam) | A → Working |
| Exam practice: 8 P1 tasks, 4 P2 sets with 28 parts, 4 P3 cases with 12 calculations, 5-run simulator | Yes | Yes | Yes | globals evaluated in page | README.md > Exam practice | A → Working |
| Exam rooms bar: fourteen rooms with source labels | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | README.md > Design and discovery; docs/releases/2026-09-29-think-release-report.md §8 | A → Working |
| Explain it like an economist against a timer with self-check criteria | Yes | Yes | Yes | nav() render + innerText regex | README.md > What it contains (Analytical layers) | A → Working |
| Fifteen interactive labs, each a stylised model | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | README.md > Economics, Everywhere | A → Working |
| Five case tools incl. Find me an example, Build an evaluation, Compare two cases (9 sets), Use this case, Case challenges | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | README.md > Real-world economics | A → Working |
| Glossary 2.0: 250 terms, filters, compare (24 sets) | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | README.md > The course | A → Working |
| Go further links from a focused node | Yes | Yes | Yes | source read | README.md > Design and discovery; docs/releases/2026-09-29-cover-release-report.md §5 | A → Working |
| Hash routes for every section/tab/item; Back/Forward; short forms #mind #session #video | Yes | Yes | Yes | tab heading sweep (all 191 tabs) | README.md > Technology | A → Working |
| Header below 880px: logo, timer, profile, menu | Yes | Yes | Yes | rendered | README.md > The mobile layer | A → Working |
| Home band Reason · Evidence · Ideas | Yes | Yes | Yes | nav() render + innerText regex | RELEASE-REPORT.md §6 | A → Working |
| Home cover: brand line, five verbs, three actions, movable market, six chips | Yes | Yes | Yes | nav() render + innerText regex | README.md > Design and discovery | A → Working |
| IA command centre with rubric conditions; 800-word limit not a criterion F requirement | Yes | Yes | Yes | nav() render + innerText regex | README.md > What it contains (IA); Accuracy corrections | A → Working |
| IA studio rail: nine steps | Yes | Yes | Yes | globals evaluated in page | README.md > Design and discovery; docs/releases/2026-09-29-think-release-report.md §9 | A → Working |
| Independent-platform statement in footer and About | Yes | Yes | Yes | nav() render + innerText regex | README.md > Accuracy corrections | A → Working |
| Indian economy hub: data vs world, 31 dated cases in seven themes, 1991 event | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | README.md > Pathways and the Indian economy | A → Working |
| Inquiry tools: six tools | Yes | Yes | Yes | nav() render + innerText regex | docs/releases/2026-09-29-course-release-report.md §4 | A → Working |
| Installable PWA: manifest + service worker | Yes | Yes | Yes | globals evaluated in page | README.md > Installable | A → Working |
| Issue 024 not in this build | Yes | Yes | Yes | globals evaluated in page | README.md > Economics in 60 Seconds | A → Working |
| JSON-LD WebSite structured data | Yes | Yes | Yes | globals evaluated in page | RELEASE-REPORT.md §16 | A → Working |
| Lab: market lab, AD-AS lab, policy simulator | Yes | Yes | Yes | tab heading sweep (all 191 tabs) | README.md > What it contains (Lab) | A → Working |
| Laboratory home band naming seven labs | Yes | Yes | Yes | nav() render + innerText regex | docs/releases/2026-09-29-think-release-report.md §7 | A → Working |
| Learn: concept spine in nine stages | Yes | Yes | Yes | nav() render + innerText regex | README.md > What it contains (Learn) | A → Working |
| Learn: curriculum map and misconception lab | Yes | Yes | Yes | tab heading sweep (all 191 tabs) | README.md > What it contains (Learn) | A → Working |
| Lens questions on every concept page and case | Yes | Yes | Yes | loop 40 cases | README.md > Design and discovery; docs/releases/2026-09-29-release-report.md §5 | A → Working |
| Lesson structure: big idea, before you start, objectives, mechanism, model cards with Go deeper, try it, explain modes, can I explain it, apply, evaluate with Lens, exam connection, retrieve, Can I actually do this, connect, teach it | Yes | Yes | Yes | heading list | README.md > The course; docs/releases/2026-09-29-course-release-report.md §4 | A → Working |
| Level 7 deconstructor, IB reference, assessment centre, paper architecture | Yes | Yes | Yes | tab heading sweep (all 191 tabs) | README.md > What it contains (Exam) | A → Working |
| Live IB verification table published under Exam > IB reference layer | Yes | Yes | Yes | nav() render + innerText regex | docs/releases/2026-09-22-release-report.md §2 | A → Working |
| Live verification: nine claims, one not verified | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | README.md > Honesty rules; docs/releases/2026-09-22-release-report.md §2 | A → Working |
| Masterclass 10/20/30/60 minutes | Yes | Yes | Yes | nav() render + innerText regex | README.md > Masterclass | A → Working |
| Metadata errors recorded on Sources and method | Yes | Yes | Yes | nav() render + innerText regex | README.md > Economic data | A → Working |
| Mindmap coverage dashboard counts cases, videos, question parts per subtopic | Yes | Yes | Yes | nav() render + innerText regex | README.md > Coverage | A → Working |
| Misconception database: 51 entries with student and teacher views | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | README.md > The course | A → Working |
| Model or reality on the eleven named models | Yes | Yes | Yes | tab heading sweep (all 191 tabs) | README.md > Analytical layers | A → Working |
| More menu grouped Learn and explore / Exam and research / Your work / Teach / About; unnamed sections appended | Yes | Yes | Yes | click More | README.md > Navigation; RELEASE-REPORT.md §3 | A → Working |
| My Economics surfaces EE work in progress | Yes | Yes | Yes | nav() render + innerText regex | docs/releases/2026-09-26-release-report.md §1 | A → Working |
| My casebook with coverage read-out | Yes | Yes | Yes | tab heading sweep (all 191 tabs) | README.md > Real-world economics | A → Working |
| My syllabus: three layers, states, revision dates, notes | Yes | Yes | Yes | nav() render + innerText regex | README.md > What it contains (My syllabus) | A → Working |
| Nineteen big questions with full structure (mechanism steps, labelled example, lab, prediction, four levels, confusion, links, sources, Share) | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | README.md > Economics, Everywhere | A → Working |
| Old dossier address still works | Yes | Yes | Yes | cold URL | README.md > The course: thirty-one lessons | A → Working |
| One save control and one difficulty flag; saved list | Yes | Yes | Yes | nav() render + innerText regex | README.md > Learning paths and saved items | A → Working |
| Opening sequence: exactly five seconds; window.__INTRO | Yes | Yes | Yes | fresh context, read __INTRO | README.md > The opening sequence | A → Working |
| Opening state model: home plays full 5 s on every load; deep links show the still; in-app navigation none | Yes | Yes | Yes | fresh context __INTRO + source | README.md > The opening sequence (updated in 806b3ed/b73c161) | A → Working |
| Paper guidance and economic writing in Exam practice | Yes | Yes | Yes | nav() render + innerText regex | README.md > The course | A → Working |
| Pathways: six ways in (IB, Cambridge AS/A, school, university, civil services, Indian economy, Economics for everyone) with no-syllabus-claim notes | Yes | Yes | Yes | nav() render + innerText regex | README.md > Pathways and the Indian economy | A → Working |
| Platform in numbers counted from data | Yes | Yes | Yes | nav() render + innerText regex | README.md > Design and discovery | A → Working |
| Player created only on click, youtube-nocookie, no autoplay | Yes | Yes | Yes | click card, Load the player, count iframes | README.md > Video learning | A → Working |
| Policy Decision Room | Yes | Yes | Yes | tab heading sweep (all 191 tabs) | README.md > What it contains (Lab) | A → Working |
| Pooled challenges: missing link, spot the error, connect two ideas, build from memory | Yes | Yes | Yes | tab heading sweep (all 191 tabs) | README.md > What it contains (Mindmaps) | A → Working |
| Practise: question bank, data response | Yes | Yes | Yes | tab heading sweep (all 191 tabs) | README.md > What it contains (Practise) | A → Working |
| Predict-before-reveal mode for diagrams | Yes | Yes | Yes | tab heading sweep (all 191 tabs) | README.md > What it contains (Lab) | A → Working |
| Primary bar: Course, Learn, Lab, Real World, Practise, Exam, Mindmaps, Everywhere + More + Tutorials | Yes | Yes | Yes | rendered at 1366/1920/2560 | README.md > Navigation | A → Working |
| Profiles: first launch asks name, level, target grade; several profiles; schema v6 | Yes | Yes | Yes | source grep + settings render | README.md > Profiles and personalisation | A → Working |
| Quality report and Content report under About | Yes | Yes | Yes | tab heading sweep (all 191 tabs) | README.md > Technology | A → Working |
| Recommend-a-policy lab (HL Paper 3 b) | Yes | Yes | Yes | tab heading sweep (all 191 tabs) | README.md > What it contains (Lab) | A → Working |
| Related panel on every concept page | Yes | Yes | Yes | nav() render + innerText regex | docs/releases/2026-09-26-release-report.md §1 | A → Working |
| Resource centre, feedback bank, moderation workspace, TOK toolkit, coverage matrix | Yes | Yes | Yes | tab heading sweep (all 191 tabs) | README.md > What it contains (Teacher tools) | A → Working |
| Resource hub: eleven categories, audience filter, local search, Drive master link | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | README.md > The resource hub | A → Working |
| Revision mode: 15, 30 or 60 minutes, a unit, or the whole course | Yes | Yes | Yes | source + tab sweep | README.md > The course; docs/content-architecture.md §5 | A → Working |
| Search ranks word starts and knows abbreviations (PED, GDP, LRAS, PPC) | Yes | Yes | Yes | typed 'PED' | README.md > Design and discovery | A → Working |
| Search records: 16 Economist, 11 Why, 4 Data | Yes | Yes | Yes | globals evaluated in page | RELEASE-REPORT.md §12 | A → Working |
| Self-test: 2,052 checks, every check passes (README at b73c161; was 2,019 at 363f17f) | Yes | Yes | Yes | globals evaluated in page | README.md > Technology | A → Working |
| Settings page: name, level, exam session, study block; storage summary | Yes | Yes | Yes | nav() render + innerText regex | SECTIONS / README Profiles | A → Working |
| Seven learning paths | Yes | Yes | Yes | globals evaluated in page | README.md > Learning paths and saved items | A → Working |
| Shared assignment opens from a link (#assign=) | Yes | Yes | Yes | tab heading sweep (all 191 tabs); source grep | README.md > The assignment builder | A → Working |
| Six indicators for 25 economies, world and four income groups | Yes | Yes | Yes | globals evaluated in page | README.md > Economic data | A → Working |
| Six recurring economic events (scenarios) | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | README.md > What it contains (Real World) | A → Working |
| Sixteen economists with profiles | Yes | Yes | Yes | globals evaluated in page | README.md > Economists and ideas | A → Working |
| Skills matrix (analytical layer) | Yes | Yes | Yes | tab heading sweep (all 191 tabs) | README.md > Analytical layers | A → Working |
| Snapshot maps: 31 subtopics, 4 units, course; last-night versions; A4 print | Yes | Yes | Yes | nav() render + innerText regex | README.md > The course; docs/releases/2026-09-29-course-release-report.md §4 | A → Working |
| Source register of 47 checked URLs | Yes | Yes | Yes | globals evaluated in page | docs/releases/2026-09-25-release-report.md §7 | A → Working |
| Stakeholder / time-horizon / context lab | Yes | Yes | Yes | tab heading sweep (all 191 tabs) | README.md > What it contains (Lab) | A → Working |
| Start your journey band with nine pathways | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | docs/releases/2026-09-26-release-report.md §8 | A → Working |
| Syllabus atlas, concept index, assessment matrix, sources-and-method | Yes | Yes | Yes | tab heading sweep (all 191 tabs) | README.md > What it contains (Real World) | A → Working |
| TOK registers and 'Optional TOK-informed thinking' label | Yes | Yes | Yes | nav() render + innerText regex | README.md > TOK x Economics | A → Working |
| TOK x Economics: sixteen pages | Yes | Yes | Yes | tab heading sweep (all 191 tabs) | README.md > What it contains (TOK) | A → Working |
| TOK: 109-question bank in 12 categories; 14 evidence tests; 11 models; 8 uncertainty claims; 10 activities; KQ generator | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | README.md > What it contains (TOK) | A → Working |
| Teacher desk and class dashboard with local import | Yes | Yes | Yes | tab heading sweep (all 191 tabs) | README.md > What it contains (Teacher tools) | A → Working |
| Ten-question article quality screen | Yes | Yes | Yes | globals evaluated in page; tab heading sweep (all 191 tabs) | README.md > What it contains (IA) | A → Working |
| The Economist's Lens: seventeen questions | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | README.md > The course; docs/content-architecture.md §5 | A → Working |
| Think: Economic Chain with conditionality test and four judgements | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | README.md > What it contains (Think) | A → Working |
| Thirteen modes per map (table also lists 'List') | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | README.md > Mindmaps | A → Working |
| Three integrity dashboards: model, content, links | Yes | Yes | Yes | tab heading sweep (all 191 tabs) | README.md > What it contains (Lab) | A → Working |
| Timed sessions: 5/15/30/60/90 minutes | Yes | Yes | Yes | globals evaluated in page | README.md > Timed sessions | A → Working |
| Timeline of lifespans | Yes | Yes | Yes | nav() render + innerText regex | README.md > Economists and ideas | A → Working |
| Today in Economics, concept of the week, question of the day, case of the day | Yes | Yes | Yes | nav() render + innerText regex | README.md > The learning chain; docs/releases/2026-09-29-release-report.md §5 | A → Working |
| Tool contents: 12 repair cases, 8 detective tables, 6 memo briefs, 10 debate motions, 8 market scenarios, 10 CPI categories, 15 BoP transactions, 7 FX causes | Yes | Yes | Yes | globals evaluated in page | README.md > The eleven tools | A → Working |
| Tools: eleven working tools | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | README.md > The eleven tools | A → Working |
| Topic dependency graph | Yes | Yes | Yes | tab heading sweep (all 191 tabs) | README.md > Analytical layers | A → Working |
| Topic pack builder: teacher, student and blank versions | Yes | Yes | Yes | nav() render + innerText regex | README.md > Masterclass and the teacher topic pack | A → Working |
| Tutorials: US$20 per 90-minute session | Yes | Yes | Yes | nav() render + innerText regex | README.md > Tutorials | A → Working |
| Twelve 'Economics in real life' cards and sixteen 'One economic idea' cards | Yes | Yes | Yes | globals evaluated in page | README.md > What it contains (Everywhere) | A → Working |
| Twelve cases worked to full teaching standard (deep cards) | Yes | Yes | Yes | globals evaluated in page | README.md > Real-world economics | A → Working |
| Twelve-zone case reader with teacher view and printable lesson card | Yes | Yes | Yes | globals evaluated in page; source read | README.md > Real-world economics | A → Working |
| Unit pages with recommended hours and snapshot map | Yes | Yes | Yes | nav() render + innerText regex | README.md > The course | A → Working |
| Video coverage dashboard: 19 of 31 subtopics | Yes | Yes | Yes | nav() render + innerText regex | README.md > Coverage | A → Working |
| Video queue, video of the day | Yes | Yes | Yes | tab heading sweep (all 191 tabs) | docs (tabs) | A → Working |
| Video studio graceful unavailable state | Yes | Yes | Yes | nav() render + innerText regex | docs/releases/2026-09-26-release-report.md §4 | A → Working |
| Where the numbers live: routes figures to institutions, holds no figures | Yes | Yes | Yes | nav() render + innerText regex | README.md > Economics, Everywhere | A → Working |
| Why did this happen?: eleven causal questions with prediction then eleven stages | Yes | Yes | Yes | globals evaluated in page; nav() render + innerText regex | README.md > Why did this happen? | A → Working |
| Workspace: study plan, mistake book, flashcards, calculations, notes | Yes | Yes | Yes | tab heading sweep (all 191 tabs) | README.md > What it contains (My workspace) | A → Working |
| Your economic thinking: 'Not enough evidence yet' instead of a score | Yes | Yes | Yes | nav() render + innerText regex | README.md > Your economic thinking | A → Working |
