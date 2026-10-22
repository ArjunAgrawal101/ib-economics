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

_Results are added once the full run completes._

## Not verified here

- **Vercel.** The deployment and this PR's preview cannot be reached from this environment, so the PR's Vercel preview should be checked.
- **Real devices.** Screenshots were taken in headless Chromium, not on physical devices. Safari and Firefox were not tested.
