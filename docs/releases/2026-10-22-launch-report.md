# Release report: pre-launch pass

Branch `claude/upbeat-hawking-69d7gz` ([ArjunAgrawal101/ib-economics#10](https://github.com/ArjunAgrawal101/ib-economics/pull/10)). It is not merged and not deployed. The previous report is in `docs/releases/2026-10-15-project-atlas-report.md`.

## What changed

- **Resources is a destination on every width.**
  - **Desktop.** The primary bar is now Course · Learn · Lab · Real World · Practise · Exam · Mindmaps · Resources, then More and Tutorials. Resources opens the existing Resource hub (`#/resources`); no new page was made.
    - Economics, Everywhere and the Learning Studio moved to the More menu, which lists every section. Both are still in the drawer, the footer, search and the home page.
  - **Tablet and phone.** Below 1180px, where the bar gives way to the drawer, a Resources button sits in the header between the brand and the menu. Resources also leads the drawer.
  - **How the order is set.** The order lives in the base page, so it is changed by `tools/migrations/2026-10-22-launch-navigation.py`. That migration also updates the self-tests that had frozen the earlier order.
- **A header with room for its bar.**
  - **Folded tools.** The timer folds to one stopwatch control while it is idle; choosing a paper starts it and brings back the readout and pause. The profile shows its initial and keeps its name for assistive technology.
  - **Measured fit.** The bar is measured after every paint and again once the typefaces load. The fixed width tiers that withdrew items which fitted are switched off.
  - **Result.** At 1440px and wider all eight destinations show; before this pass, 1440px showed five.
  - **States.** Hover draws a hairline underline, the current page carries the burgundy rule, and focus shows a ring.
- **Explore Economics Resources**, directly after the cover. It replaces the six pathways and the gateway beneath them, which led to the same pages.
  - **The doors.** Eight doors, each opening a real page with a small figure and a count from the platform's data:
    - topic lessons;
    - mindmaps;
    - diagrams;
    - real-world examples;
    - calculations;
    - exam practice;
    - Economics in 60 Seconds;
    - Extended Essay support.
  - **The library.** The Resource hub's library follows, naming its own eleven categories, then Random Economics, Find a topic and the economist's toolkit.
  - **The Studio stays separate.** One line points to the Learning Studio. The band shows no Studio excerpt.
  - **Explore Economics.** The cover's Explore Economics action now lands here.
- **The cover.**
  - A little less height, so the resources begin at the fold on a 1440 × 900 screen.
  - A clean edge with a fine brass rule replaces the grey gradient between the dark cover and the paper.
- **The Learning Studio exhibition.**
  - Each exhibit leads with its form as a badge: visual explainer, editorial, interactive application or series.
  - The featured exhibit is lighter, with a smaller title and fixed-height side excerpts.
  - The examiner's guide shows one legible page in front of a stacked second page, in place of two unreadable thumbnails.
- **Motion and states.**
  - A restrained reveal (a 14px rise and fade over 560ms) applies to a few large blocks below the fold.
  - It runs only while the motion layer is on, never during the self-test, and not at all under reduced motion.
  - Cards, buttons and preview images share one set of hover and focus states.

## Economics accuracy

- **PED_07.** The elasticity diagram with the reversed-looking labels was investigated and corrected at its source in the previous pass (`docs/releases/2026-10-15-project-atlas-report.md`). The excerpt on the site, Fig. 2 on the cover, is built from the corrected master. The correction to the deck's own generator is supplied separately for the owner to apply.
- **New figures, checked by self-tests:**
  - **Diagram door.** A rise in demand along fixed supply, with both equilibria computed; price and quantity both rise.
  - **Calculation door.** +10% ÷ −25% = −0.4, relatively inelastic. This is the same comparison as PED_07.
  - **Exam door.** Paper 1 part (a) out of 10 and part (b) out of 15.
  - **Unit door.** The course's four units, in order.
- **Counts.** Every count on the doors is computed from the platform's data at render, and a self-test compares them.

## Preserved

- **Sections and features.** All 34 sections and their tabs; search; the calculator; the timer and its presets; SL/HL; the profile; the labs, diagrams and calculations; tutorials (prices unchanged); offline use; and `localStorage` keys.
- **Home page.** Every home chapter after the first band. The gateway function (`rnAtlas`) is kept, though the home page no longer draws it.

## Tests

All runs used `node tests/run-all.mjs` or its suites individually, on this branch, in headless Chromium.

- **Result: 20 suites and 577 browser checks, all passing in their final runs.**
  - Eight suites ran on commit `b8461c2`: api-youtube, selftest, e2e, ecosystem, renaissance, cover, pwa and widths (188 checks).
  - The other twelve also ran on `b8461c2`. Nine passed there: overlap, routes, course, transform, events, tabs, notices, events-scroll and final (187 checks).
  - Intro failed once there, as described below. Intro, launch and studio were re-run on the final commit and passed (202 checks).
  - The only change between `b8461c2` and the final commit is the cheaper self-test described below.
- **Built-in self-tests:** 2,115 run at start-up, all passing. Twelve new Launch checks confirm:
  - Resources is on the bar and opens the hub;
  - the band follows the cover;
  - every door opens a real page, and its counts are the platform's own;
  - the hub's own categories are listed, and no Studio excerpt appears;
  - the figures' economics holds;
  - the timer keeps its controls;
  - reveals respect motion settings.
- **New `tests/launch.mjs` (55 checks):**
  - Resources on the bar at 1920, 1440 and 1280, clear of the brand and the tools, with all eight items fitting at 1440 and wider;
  - opening the hub, with the current-page state;
  - the folded timer: presets, start, readout, no collision while running, and reset;
  - the header Resources button at 1024, 768, 390, 375 and 360, with the wordmark whole and nothing scrolling sideways;
  - Resources leading the phone drawer;
  - the band's position, title, eight real links and focus ring;
  - reveals with motion on and none with it off;
  - two columns of doors on phones.
- **Accessibility.** axe (WCAG 2.0/2.1 A and AA) finds no violations in the home page's sections at 1440 and 390, including the new band. The first full run found a real contrast problem here: blocks below the fold were painted at full opacity and then faded out before waiting, so axe caught them part-faded. The waiting state now applies at once and only the reveal is animated.
- **Overlap audit.** 141,617 rendered elements over 540 route-widths, with no overlaps.
- **One timing failure, investigated.**
  - On `b8461c2`, the intro suite measured Skip at 265 ms against a 260 ms limit. Other runs measured 226, 178 and 210 ms.
  - Profiling showed the new self-tests added about 20 ms to start-up, because one of them drew the whole home page. It now reads the declared order instead (about 2 ms), and `tests/launch.mjs` checks the drawn page.
  - On the final code, Skip measured 219 ms and the suite passed.
- **Production build.**
  - `tools/studio/build_studio.py` regenerates the Studio pages, module and sitemap with no changes.
  - `tools/build/splice.py` is idempotent.
  - No asset was added or changed.
  - The service worker is network-first for the page, so returning visitors receive this version without a cache bump.

**Visual review** was done on screenshots captured and inspected in this session at 1440, 1024, 768, 390, 375, 360 and 320 px. Problems found and fixed during it:
- the tablet header placing Resources before the brand;
- the wordmark clipped at 360 px;
- figure labels overflowing their boxes;
- the third 60 Seconds cover cut off;
- figure text too small on phones (now two-column cards);
- the Resource hub's categories starting below one and a half screens;
- an unreadable figure on the hub's phone layout.

## Files changed

| File | Purpose |
|---|---|
| `tools/migrations/2026-10-22-launch-navigation.py` (new) | Puts Resources on the primary bar, makes it the last item withdrawn and first in the drawer, moves Economics, Everywhere and the Learning Studio to More, and updates the self-tests that froze the earlier order. Idempotent. |
| `src/modules/40-launch.js` (new) | The header (folded timer, profile label, Resources button below 1180px, current-page state, a refit once fonts load), the Explore Economics Resources band with its figures, the reveal, and the Launch self-tests. |
| `src/styles/css-launch.css` (new) | Header layout and states, the band, the cover edge, exhibit form badges, the guide's stacked page, the Resource hub's shorter opening, card states, the reveal, and reduced motion. |
| `src/modules/04-home.js` | The home order (`@resources` after the cover); the old gateway no longer carries `#explore` or the pathways. |
| `src/modules/07-cover.js` | Chapter 01 is a label only, because the band now opens the page. |
| `src/modules/39-atlas.js` | Pathway code removed (superseded); exhibit kickers lead with a form badge. |
| `src/modules/12-tests.js`, `src/modules/28-tests-t6.js` | Self-tests updated for the eight-item bar and the resource doors. |
| `src/styles/css-atlas.css` | Unused pathway styles removed. |
| `tools/build/splice.py` | Adds `css-launch.css` to the build. |
| `index.html` | Rebuilt by the migration and the splice. |
| `tests/launch.mjs` (new), `tests/run-all.mjs` | The launch browser suite, added to the full run. |
| `tests/cover.mjs`, `tests/renaissance.mjs`, `tests/studio.mjs`, `tests/transform.mjs` | Updated for the resource doors and the eight-item bar. |
| `README.md`, `docs/design-system.md` | Navigation, home page, header, doors and motion documented. |
| `RELEASE-REPORT.md`, `docs/releases/2026-10-15-project-atlas-report.md` | This report; the previous one archived. |

## Not verified here, and known limits

- **Vercel.** The deployment and this PR's preview cannot be reached from this environment, so the PR's Vercel preview should be checked.
- **Real devices.** Screenshots were taken in headless Chromium, not on physical devices. Safari and Firefox were not tested.
- **The More button on a More page.**
  - On a page reached through More, such as the Learning Studio, the button names the page ("Learning Studio · more"), as it did before.
  - That longer label means the bar withdraws one or two items at 1440px on those pages.
  - Withdrawn items stay one click away in the More menu.
- **The cover's live model.** Fig. 1 keeps a little empty space under its caption at some desktop widths, because its card matches the height of the two figures beside it.
- **The deck's own source.** The PED_07 correction for the deck's generator has not yet been applied there; it is outside this branch.
