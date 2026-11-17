# Release report: Arjun Agrawal · Economics, one discipline and two pathways

Branch `claude/sleepy-pascal-rlzusx`, from `main` at `2d238cd` (the merge of
[ArjunAgrawal101/ib-economics#11](https://github.com/ArjunAgrawal101/ib-economics/pull/11)). Not merged, and nothing is merged without the
owner's approval. The previous report is kept at `docs/releases/2026-11-16-upsc-cse-economics-report.md`.

**Status in one line.** The redesign is built, integrated and tested on this branch. Three things stand
between it and a merge, and each needs the owner:

1. **The pull request still has to be opened.** The branch is pushed. This session's GitHub API
   connection failed ("invalid session") after GitHub was reconnected, so the pull request could not
   be opened from here; it opens from GitHub's page for the branch.
2. **The eleven handbook PDFs were not available in this session.** The Handbook Library and its
   viewer are complete, and the pipeline renders clean pages with no watermark, but until it is run on the
   PDFs the previews are the images the previous release made: the cover, the contents page and two
   sample pages per volume, all with that release's "Preview Only" watermark. Titles and page counts
   are the ones recorded from the volumes in the previous release; they were not re-checked here.
3. **Five syllabus lines are marked "Wording to be confirmed".** The 2026 notice PDF could not be
   opened from this environment.

## At a glance

| Area | State |
|---|---|
| Opening (five seconds) | Done. World, the language of economics, two economic worlds, the identity, the words; one clock; Skip; reduced motion; remembered |
| Identity, home and navigation | Done. ARJUN AGRAWAL · ECONOMICS; the shared home in ten movements; HOME · IB DP ECONOMICS · UPSC CSE ECONOMICS · ABOUT with pathway menus and context bars; search labelled by pathway |
| IB DP environment | Every working feature and address kept. The old IB home page is the IB DP landing (`#/ib`), intact, under a pathway header |
| UPSC environment | Done. Eight destinations in forest green, ivory and antique gold |
| Handbook Library | Done, with search, filters, a page per volume and the viewer. **Previews wait for the PDFs** |
| Course, enquiries, strategy, current affairs | Done. The owner's facts and wording only; no dates, payment links, countdowns or promised extras |
| One Concept. Two Perspectives. | Done. Nineteen shared concept records |
| About and Contact | Done. The owner's positioning; separate IB DP and UPSC CSE enquiries |
| SEO, performance, accessibility | Done for what can be verified here (see below) |
| Push, pull request, preview URL | The branch is pushed; the pull request is opened from GitHub (see above) |

## What was built

### Part 1 · Audit

The codebase, routes, both pathways, the eleven handbook records, assets, responsiveness, search,
storage, the service worker, both deployments, SEO, accessibility and Git were audited before any
change. The audit and the plan are in `docs/flagship/PLAN.md`. Two findings shaped the work: every IB
DP check that described "the home page" meant the IB DP home page, and the handbook PDFs were not
in the session.

### Part 2 · The opening

Five seconds, on the one clock the platform already had (`#splash`, `#intro-clock`, `window.__INTRO`):

| Time | Stage |
|---|---|
| 0 to 1 s | A dotted world map (Natural Earth 1:110m) appears west to east; financial and trading hubs light; trade arcs draw |
| 1 to 2 s | Demand and supply cross at a gold equilibrium; a business cycle with its trend and a price series; GDP, CPI, USD/INR, REPO RATE and EXPORTS beside the hubs |
| 2 to 3 s | International perspectives in the IB pathway's burgundy; India's dots turn gold and five sectors of Indian development fan out in the UPSC pathway's forest green |
| 3 to 4 s | The monogram rises; the name and the gold rule follow |
| 4 to 5 s | ECONOMICS, then THINK LIKE AN ECONOMIST.; the monogram travels to the header's mark as the overlay dissolves, at exactly 5000 ms |

Only opacity and transform move. There is no video, image or extra font: the world map and the words
are vectors built from Natural Earth and the site's own typefaces. The full sequence plays on the first
home load of a browser tab; later home loads, or any load within 30 days of pressing Skip, show a brief
card; reduced motion shows a still card; a deep link shows only the cover until the page is ready;
navigation inside the app shows nothing; `?intro=1` plays it in full. **Skip introduction** is a real
button, and Escape works anywhere. Settings lists what the opening stores and offers *Replay the
opening*. If the page is slow to start, the last frame holds until it is ready rather than showing an
unready page.

### Part 3 · The shared home (`#/`)

1. **The statement and the two pathways.** "Economics is not just a subject to study. It is a way to
   think." with the supporting statement and the platform's idea. Two cards of equal weight:
   - **IB DP Economics** in burgundy, ivory and muted gold, with a live model and eight features.
   - **UPSC CSE Economics** in forest green, ivory and antique gold, with four real handbook covers and
     eight features.
   - Both begin on the first screen at 1440 × 900.
2. **Think like an economist.** Concept, model, evidence, judgement, with a demand-and-supply model
   the reader can move.
3. **The IB DP environment.** Five groups (Learn, Explore, Practise, Research, Resources) with their
   destinations.
4. **The UPSC environment.** Five steps, from the syllabus to the course.
5. **Selected resources.** All eleven handbook covers, three Economics in 60 Seconds issues and a
   Learning Studio piece.
6. **The laboratory.** Six models, each opening its lab.
7. **One concept, two perspectives.** The shared concepts, readable in IB DP or UPSC CSE terms.
8. **About.** The portrait, the owner's positioning and the facts the site already states.
9. **Enrolment and contact.** Separate IB DP and UPSC CSE enquiries.
10. **The footer.** It now names both pathways and adds a separate UPSC independence statement. The IB
    statement is unchanged.

A teacher's assignment link (`#assign=…`) still opens here, with its banner first.

### Parts 4, 12 · Navigation and the IB DP environment

- **The header** reads HOME · IB DP ECONOMICS · UPSC CSE ECONOMICS · ABOUT, with search. The two
  pathways form a switcher; the chevron beside each opens a panel of its environment. Panels work from
  the mouse and the keyboard: focus moves into a panel opened from the keyboard, Escape returns it to
  the button, and tabbing out or clicking outside closes it.
- **A context bar** under the header gives each pathway its own navigation in its own colour. The IB DP
  bar is IB Home · Learn · Explore · Practise · Research · Resources · Tutorials, grouped as the brief
  sets; the UPSC bar has its eight destinations.
- **On tablets and phones** a pathway switcher sits under the header, and the drawer holds Home, both
  pathways (the IB DP groups folded) and the shared pages.
- **Search** labels every result IB DP, UPSC CSE or Both, read from where it leads.
- **Page titles** name their pathway, for example "Learn · IB DP Economics · Arjun Agrawal".
- **Every IB DP feature and address is kept.** The previous IB home page is the IB DP landing,
  complete. The older primary bar and More menu remain in the page, hidden, because earlier layers and
  their checks measure them; a check fails if any section a reader can open is unreachable from the new
  navigation.
- **The welcome dialogue**, which asks for an IB DP level, now opens on the first visit to an IB DP
  page rather than over the shared home or the UPSC pages.

### Part 5 · The UPSC environment (`#/upsc`)

| Destination | Address | What it holds |
|---|---|---|
| UPSC Home | `#/upsc` | The headline and both actions, why Economics matters for UPSC, the eight preparation steps, previews of the syllabus, the handbooks, the latest current affairs and the course |
| Syllabus | `#/upsc/syllabus` | Prelims GS I and Mains GS III kept apart, with two GS II lines. Each line in four labelled layers: the official wording, the explanation, the handbook coverage (from each volume's own syllabus map) and how classes and current affairs support it. A print view. It says plainly that this is not Economics Optional preparation |
| Economics Resources | `#/upsc/economics-resources` | Eleven free topic previews and the shared concepts in UPSC terms |
| Handbook Library | `#/upsc/handbook-library` | Part 6 |
| Current Affairs | `#/upsc/current-affairs` | Part 7 |
| Preparation Strategy | `#/upsc/preparation-strategy` | Four phases, a weekly rhythm, joining static concepts to current affairs, previous-year questions (linked to upsc.gov.in, none reproduced), an answer frame and a revision cycle; no promised results |
| Online Course | `#/upsc/online-course` | Part 8 |
| Contact / Enrol | `#/upsc/contact-enrol` | Handbook, course, mentorship and resource enquiries |

The first release's addresses still work and are rewritten to the new ones; `#/upsc/about-the-educator`
opens the shared About page.

### Part 6 · The Handbook Library

The catalogue has search, filters (ten topics; Prelims, Mains or Both; volume number) and every field
the brief lists: number, title, category, page count, description, topics, Prelims relevance, Mains
relevance, ₹99, Preview and **GET THIS HANDBOOK · ₹99**, with "Digital soft copy. Individual volume
pricing." Each volume has its own page (contents with page numbers, syllabus map, concepts,
institutions, related volumes, a purchase card), and the viewer has zoom, full screen, swipe and the
keyboard, and draws nothing over a page. The purchase button opens WhatsApp or email with the owner's
message: "Hello, I am interested in purchasing Volume [X], [Title], of the Arjun Agrawal Economics
Handbook Series. Please share the payment and delivery details." The terms say a preview in a browser
can be saved or photographed; no protection is claimed. See *The handbooks* for the previews.

### Part 7 · Current affairs

Twenty-seven dated entries under twelve themes, newest first, with filters. Each gives the topic, the
concept, why it matters, Prelims and Mains relevance, a handbook link, and the source and date. The
section is edited by hand and says when it was last compiled (17 November 2026); nothing is a feed.
Nine entries are marked *Checked at source*: each was opened in the official document and links to it.
The others come from the dated trackers in the handbooks and name the authority they report; the page
says figures may since have been revised. Three entries were checked again while integrating (see
*Accuracy*).

### Part 8 · The course

"ARJUN AGRAWAL UPSC CSE ECONOMICS 3-MONTH INTENSIVE ONLINE PROGRAMME", with the owner's facts only:
₹9,999, online only, at most 25 students, three months, Prelims and Mains within General Studies,
static concepts and current affairs. Twelve modules are mapped to the volumes; national income has no
volume of its own, and the page says so. The three months follow the owner's outline and are labelled
indicative. **ENQUIRE ABOUT THE NEXT BATCH** sends the owner's exact message. No batch date, timing,
payment link, recording, mock test, individual mentoring, doubt support, evaluation, countdown or
claim about remaining places appears; a self-check fails if one does.

### Part 9 · One Concept. Two Perspectives. (`#/concepts`)

Nineteen concept records in six groups (foundations, markets, the macroeconomy, policy, the global
economy, development). Each has the shared foundation and diagrams, then an IB DP perspective and a UPSC
CSE perspective, with their own links, practice and volumes; where a concept matters less to one
pathway, the record says so. 371 links were checked; none fails to resolve.

### Parts 10, 11 · Design and motion

`src/styles/css-flagship.css` holds the tokens (charcoal, ivory and gold shared; burgundy for IB DP;
forest green for UPSC CSE) and the primitives. The pathway's colour follows `body[data-pathway]`.
Motion uses opacity and transform only, follows the platform's motion layer, and stops under reduced
motion; the home's large blocks reveal as they arrive.

### Parts 13, 14 · About and Contact

About carries the owner's positioning, *IB DP Economics Educator | Economics Resource Designer | UPSC
Economics Mentor*, links to both pathways, and every professional detail the site already stated,
unchanged. Contact opens with separate IB DP enquiries (tutoring, the IA, the EE, resources, teacher
collaboration) and UPSC CSE enquiries (handbooks, the course, mentorship, resources), above the existing
message form. Only the published email, phone and WhatsApp number are used.

### Part 15 · SEO, performance and accessibility

- **SEO.** The site name, share image, installed-app names and structured data (the platform, and the
  course with the owner's facts) name both pathways. The structured data claims no URL, as before,
  because the same file is served from Vercel, GitHub Pages and a disk. The share image is rebuilt by
  `tools/build/build_social_card.mjs`. No ranking or traffic claim is made.
- **Performance.** `index.html` is 6.19 MB (2.04 MB gzipped), up from 5.74 MB (1.92 MB) before the
  redesign; the concept records and the new pages account for most of it. Handbook previews load on
  demand and are not precached. The service worker is v22.
- **Accessibility.** One h1 per page; landmarks; keyboard-reachable menus with visible focus; AA
  contrast; nothing scrolls sideways at 320 px. axe (WCAG A and AA) is run on the home, Contact, every
  UPSC page, the library, the viewer and the concept pages.

## The handbooks

**Inspection.** The eleven PDFs did not reach this session, so they were **not inspected here**. The
titles and page counts below are those the previous release recorded from the volumes themselves (five
PDFs and six Word files, privately). The pipeline refuses to render a volume whose title or page count
differs from them, and never renames one.

| Vol. | Recorded title | Pages | Title in the brief, where different |
|---|---|---|---|
| I | Introduction to Economics | 41 | |
| II | Money & Monetary Policy | 43 | Money and Monetary Policy |
| III | Inflation and Price Stability | 49 | Inflation and Related Concepts |
| IV | Taxation and Public Revenue | 49 | Taxation and Public Finance |
| V | Fiscal Policy and Budget Management | 49 | Fiscal Policy and Budget |
| VI | Banking and Financial Institutions | 50 | |
| VII | Financial Markets and Instruments | 49 | |
| VIII | Balance of Payments and International Trade | 55 | Balance of Payments and Foreign Trade |
| IX | Global Economic Institutions and Trade Architecture | 43 | International Financial Institutions |
| X | Indian Agriculture and Allied Sectors | 45 | Agriculture |
| XI | Indian Industry, Manufacturing, Trade and Labour Markets | 50 | Industry, Manufacturing, Trade, Employment and Labour |

Total: 523 pages. The counts for Volumes I, II, III, IV, VII and IX were taken from Word files in the
previous release and should be confirmed against the PDFs that are sold.

**Previews today.** Per volume: the cover and three pages (the contents page and two samples), 640 px,
with the previous release's watermark. That is three pages, not the eight the brief prefers, and they
are watermarked. **Clean previews: none yet.**

**When the PDFs are supplied** (in a private folder outside the repository), the pipeline in
`tools/upsc/` checks every PDF against the catalogue, drafts about eight pages per volume by what they
show (contents, a concept, an infographic, a policy, a table, a case, an examination application), and
renders the chosen pages at 1600 px with 400 px thumbnails and **no watermark or overlay**. Steps:
`tools/upsc/README.md`. The first run replaces today's images without any code change.

**Protection.** No handbook PDF or Word file is in the repository or its history; `.gitignore` refuses
any PDF, Word or e-book file except the ten public carousels, and `tests/library.mjs` fails if one is
tracked. Only preview pages are published. A browser preview cannot prevent screenshots or copying,
and the site says so.

## Accuracy

- **Current affairs, checked at source while integrating:**
  - RBI press release 2026-2027/1495 (13 November 2026): the current account deficit, capital account,
    NRI deposits and overall balance for April to September 2026, as stated.
  - Economic Survey 2025-26, chapter 1, paragraph 1.46: FY27 real growth projected at 6.8 to 7.2 per
    cent, as stated.
  - Minutes of the MPC meeting of 5 to 7 October 2026: a unanimous rise of 25 basis points to 5.50%
    and a change of stance to calibrated tightening. The entry now notes the two dissents on the
    stance, drops "from neutral" (which neither source states), links the minutes and is marked
    *Checked at source*.
- **The syllabus.** The official wording is quoted as the previous release recorded it from
  Examination Notice No. 05/2026-CSE; five lines are marked "Wording to be confirmed" because the notice
  could not be opened here. The platform's explanations are labelled as such and never presented as
  official.
- **Contact details.** Only those the site already published: arjun1agr@gmail.com, +91 7092844945
  (phone and WhatsApp), LinkedIn and Instagram.
- **Claims.** No award, credential, affiliation, ranking or result is added. The About page keeps the
  professional details exactly as the site stated them.

## Tests

**In-page self-tests:** 2,220 checks, all passing on the final build (2,136 before the redesign). New
suites cover the shell and the home (28), the opening (33, replacing 21), the UPSC environment, the
library (12) and the concepts (19). Checks that described the IB DP home page now read the IB DP landing;
none was removed or weakened.

**Browser suites:** the full run (`tests/run-all.mjs`, 24 suites, 50 minutes) on the integrated build:

| Suite | Checks | Result |
|---|---|---|
| api-youtube | 21 | pass |
| selftest | 37 | pass |
| e2e | 22 | pass |
| ecosystem | 30 | pass |
| renaissance | 25 | pass |
| cover | 35 | pass |
| pwa | 4 | pass |
| widths (every listed route at fifteen widths, 320 to 2560 px) | 15 | pass |
| overlap (37 routes at fifteen widths) | 7 | 2 failed, fixed, re-run: pass |
| routes (all 219 routes, cold, at 375 and 1366 px) | 2 | pass |
| intro (the opening) | 93 | pass |
| course | 39 | pass |
| transform | 33 | 1 failed, fixed, re-run: pass |
| events | 49 | pass |
| tabs | 9 | pass |
| notices | 4 | pass |
| events-scroll | 26 | pass |
| final | 18 | pass |
| studio | 89 | pass |
| launch | 58 | pass |
| upsc | 98 | pass |
| library (with the pipeline on synthetic PDFs) | 112 | pass |
| concepts | 54 | pass |
| flagship (the shell and the home) | 52 | pass |

The full run found three faults, all fixed in `495032e` and re-run on the final build:
- The UPSC card's fanned handbook covers overlapped one another. The card now shows three covers side by side.
- The hero's cycle line ran behind the card's links. It now runs in the band's padding, below the cards.
- The transform suite hovered the middle of a chart that the new context bar had pushed just below a
  900-pixel window. The test now scrolls the chart into view first.

The overlap audit was re-run on the home and the IB DP landing at all fifteen widths and found nothing;
transform, flagship and upsc passed again on the final build.

axe (WCAG A and AA) finds no violation on the home, Contact, the thirteen UPSC pages, the library
catalogue, a volume page, the open viewer, or the concept pages, at 1440 and 390 px. Only headless
Chromium was used; Safari, Firefox and physical devices were not tested.

## Deployment

**Vercel** (https://ib-economics-pi.vercel.app/) deploys `main`. There is no build step on Vercel:
`index.html` is committed already built, and `api/youtube.js` is unchanged. When this branch is pushed,
a pull request gives a Vercel preview if the project's GitHub integration is on; merging to `main`
publishes it.

**GitHub Pages** keeps working: every path is relative and the routes are hash routes, so the site runs
from a project subfolder and from a disk. See *Publish it on GitHub Pages* in `README.md`.

**Before merging:**
1. Open the pull request for `claude/sleepy-pascal-rlzusx` and check its Vercel preview.
2. Run the handbook pipeline on the eleven PDFs (`tools/upsc/README.md`), choose about eight pages per
   volume, run `python3 tools/build/splice.py`, and commit only the generated images and data.
3. Confirm the five syllabus lines against the notice, and the decisions listed below.
4. Check the Vercel preview on a phone and a desktop, then merge.

**Building.** Sources are in `src/modules` and `src/styles`; changes to the older base code are
re-runnable scripts in `tools/migrations/`. After any change: `python3 tools/build/splice.py`. Tests:
`cd tests && PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install --no-save playwright@1.63.0 axe-core && node run-all.mjs`.


## Decisions for the owner

- **The handbook PDFs**, for clean previews and to confirm the six page counts taken from Word files.
- **Five syllabus lines** marked "Wording to be confirmed".
- **India's boundary in the opening's map** is drawn to the Survey of India boundary (Gilgit-Baltistan,
  Shaksgam and Aksai Chin added with an approximate outline, since Natural Earth follows the line of
  control). Please confirm.
- **Volume titles** that differ from the brief's list are kept as recorded from the volumes (table
  above).
- **The brief card** after the first visit waits until the page is ready, so on a slow device it lasts
  about three seconds rather than one.
- **"UGC-NET and MH-SET qualified"** appeared on the first release's UPSC About tab, taken from the
  handbooks' title pages. That tab now opens the shared About page, which does not carry the line; the
  line remains on the handbook covers themselves.
- **Comparison sites** (ClearIAS, Vision IAS and others) could not be opened from this environment,
  so no comparison was made.

## Files

| Area | Files |
|---|---|
| Shell, home, landing, About, Contact, search, SEO | `src/modules/44-flagship-core.js`, `47-shell.js`, `48-home.js`, `49-flagship-tests.js`, `50-search.js`, `src/styles/css-flagship.css`, `tools/migrations/2026-11-17-flagship-*.py`, `tools/build/build_social_card.mjs`, `assets/brand/social-card.png`, `manifest.webmanifest`, `service-worker.js`, `tests/flagship.mjs` |
| Opening | `tools/migrations/2026-11-17-opening-sequence.py`, `src/styles/css-opening.css`, `tools/build/build_worldmap.mjs`, `opening-worldmap.json`, `build_opening_type.py`, `opening-type.json`, `tests/intro.mjs` |
| UPSC environment | `src/modules/42-upsc-content.js`, `43-upsc.js`, `src/styles/css-upsc.css`, `tests/upsc.mjs` |
| Handbook Library | `src/modules/45-library.js`, `41-upsc-data.js` (generated), `src/styles/css-library.css`, `content/upsc/handbooks.json`, `tools/upsc/`, `assets/upsc/handbooks/`, `tests/library.mjs`, `.gitignore` |
| Concepts | `src/modules/46-concepts.js`, `46-concepts-data.js`, `src/styles/css-concepts.css`, `tools/migrations/2026-11-17-concepts-more-menu.py`, `tests/concepts.mjs` |
| Older modules adjusted | `08-about.js` (positioning), `09-tests.js`, `12-tests.js`, `38-studio.js`, `39-atlas.js` (checks read the IB DP landing), `17-snap.js` (print titles), `27-wire-t6.js` (More menu), `32-pathways.js`, `33-tests-events.js` (the civil-services overlay leads to the UPSC pathway), `40-launch.js` (the cover's entrance), `src/styles/css.css`, `css-launch.css` (the landing's spacing), `css-studio.css` (Contact on a phone) |
| Tests and docs | `tests/lib.mjs`, `run-all.mjs` and the suites that drove the old bar or the old home; `README.md`; `docs/flagship/PLAN.md` |
