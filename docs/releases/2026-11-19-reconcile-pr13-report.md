# Release report: PR #13 reconciled with `main`

Branch `claude/upbeat-hawking-69d7gz`, started from `main` at `186e8d4` (the merge of
[ArjunAgrawal101/ib-economics#12](https://github.com/ArjunAgrawal101/ib-economics/pull/12)). Not merged, and
nothing is merged without the owner's approval. The previous report (the flagship release) is kept at
`docs/releases/2026-11-17-flagship-two-pathways-report.md`; the decisions of this release, line by line, are in
`docs/flagship/INTEGRATION-PR13.md`.

**What this is.** [ArjunAgrawal101/ib-economics#13](https://github.com/ArjunAgrawal101/ib-economics/pull/13) was
built in parallel with PR #12 on an older base and conflicts with `main` in about 33 files. It was not merged and
nothing in `main` was replaced by it. `main` is the foundation; what it lacked, or did less well, was rebuilt on
`main`'s own architecture: its modules, design tokens, routes, data files, build pipeline and tests.

## At a glance

| Area | State |
|---|---|
| Opening (five seconds) | **PR #13's**, two pathways: the identity, supply and demand, IB DP Economics (burgundy) and UPSC CSE Economics (forest green), "One discipline. *Two pathways.*", the halves opening onto the page. Every full page load plays it; navigation inside the app never does; nothing is stored. `main`'s Skip introduction label, Escape, 180 ms skip fade, real-time scheduling, Replay link and 30 s failsafe are kept |
| Home, navigation, IB DP environment, UPSC environment, concepts | **`main`'s**, unchanged except for The Business Brief and one accessibility fix in the concepts |
| Handbook catalogue and viewer | **`main`'s**, now titled The Indian Economy Collection, with **eight clean pages per volume** rendered from the PDFs by `main`'s own pipeline (88 pages, no watermark or overlay) |
| The Business Brief | **New in `main`**: header (from 1360 px), mobile menu, a home panel and the footer's "Explore the academic ecosystem" |
| Service worker | `aa-ibdp-econ-v23`, so installed copies fetch the new preview images |

## Integrated from PR #13

1. **The opening**, through `tools/migrations/2026-11-19-opening-two-pathways.py` from
   `tools/build/opening-two-pathways.json` (PR #13's overlay and clock as built at `3b6eac9`), with its styles in
   `src/styles/css-opening.css`. One opening remains: the 2026-11-17 world-map migration now stops when the newer
   opening is present. The state model is the one the owner asked for: the full five seconds on every full page
   load of any address (first visit, reload, bookmark, a shared link to any page, Back or Forward from another
   site), never during navigation inside the app, the page as it was left when restored from the back-forward
   cache, nothing read from or written to storage (so a skip is not remembered), one still frame of 1.5 s under
   reduced motion. Carried over from `main`'s opening: the button reads "Skip introduction"; Escape skips from
   anywhere; a skip fades out in 180 ms on the compositor; every decision reads the real time and the exit is
   scheduled ahead, so a busy main thread cannot start it in the past; "Replay the opening" (`?intro=1`) still
   works and is removed from the address; a CSS failsafe hides the overlay after 30 s if its script never ran;
   `overflow:clip`; the stage text is hidden from assistive technology and the overlay is announced once by its
   name. The settings page now says the opening keeps nothing.
2. **Clean previews of the handbooks.** PR #13's goal (eight readable pages per volume, no watermark), reached
   with `main`'s pipeline rather than PR #13's image set: `build_upsc.py --check` confirmed all eleven titles and
   page counts against the catalogue (523 pages); `propose_pages.py` drafted candidates; the pages were then
   chosen by reading each one: eight per volume, one of each kind (contents, concept, figure, policy, table, case,
   exam, extra), spread across the parts, never the cover, the back cover, an answer key, a reference list or a
   page with contact details. Every caption describes what its page shows, from the page's own text (twelve were
   re-checked against the PDF text). `main`'s three checked pages per volume are all kept with their captions.
   Rendered at 1400 px (quality 72) with 400 px thumbnails: 198 images, 19.8 MB, inside the pipeline's 20 MB budget
   (1600 px came to 25.3 MB at quality 78 and 22.7 MB at quality 70). Nothing is added to the pages; the PDFs
   stay outside the repository.
3. **The Business Brief** (`https://the-business-brief-dun.vercel.app/`, a new tab, `rel="noopener noreferrer"`):
   a quiet link in the header and in the mobile menu, an editorial panel on the home page ("Beyond Economics.
   Explore Business Management." / "Discover The Business Brief, an interactive learning platform for IB DP
   Business Management."), and an "Explore the academic ecosystem" group in the footer (IB DP Economics, UPSC CSE
   Economics, IB DP Business Management). A sister platform, not a third pathway: no pathway colour, no place in
   the switcher, and the two pathway cards keep their equal weight. The header has room for it from 1360 px; below
   that, and while the exam timer runs below 1600 px, it is in the menu, the home and the footer (measured, so
   `main`'s header tests hold).
4. **The collection title**: the catalogue is titled *The Indian Economy Collection* with the brief's subtitle;
   the tab, routes and breadcrumbs keep "Handbook Library", and the volumes keep the series name printed on their
   covers, *The Indian Economy Series*.

## Kept from `main`

Everything else: the shared home in its sections, the global header and pathway context bars, the IB DP landing
(`#/ib`) with the IB home intact, every IB DP feature and address, the eight-tab UPSC environment (syllabus,
resources, current affairs, preparation strategy with its eight clickable steps, the ₹9,999 three-month course,
contact), the 19 shared concepts with their IB and UPSC pathways, the handbook catalogue with its filters, volume
pages and viewer, the pricing (₹99 per volume), the search, the footer and every test.

## Not brought in, and why

- PR #13's home page, mega menus, "Learning Tools" menu, IB finder, knowledge map and its screenshots: `main` has
  a reviewed version of each, and a second would be a parallel implementation.
- PR #13's 11-concept module: `main`'s 19 concepts include all eleven.
- PR #13's 7-stage UPSC roadmap and its Optional tab: `main`'s eight clickable preparation steps are the roadmap,
  and its syllabus already says the pages cover General Studies, not the Economics Optional paper.
- PR #13's handbook viewer, its `build_upsc.py` rewrite and its image set: `main`'s pipeline does the same job with
  page kinds, captions, budget checks and its own test.
- PR #13's syllabus wording without the "to be confirmed" flags: see *Remaining issues*.
- PR #13's tests and reports for the parts above. Its opening test is merged into `main`'s.

## Fixes to failures that were already on `main`

The baseline run of every suite on untouched `main` (`186e8d4`) found these; each was investigated, not skipped:

- **concepts**: axe reported WCAG 2.2 target-size violations on three UPSC concept pages (links alone on their
  line under 24 px). Fixed in `css-concepts.css`.
- **transform**: "hovering shows the year and every value" moved the mouse to an off-screen point (the chart now
  starts at y = 766 in a 900 px window); the test now scrolls the chart into view, as a reader would.
- **library**: the pipeline test could not start because this machine's system Pillow is broken (`_imaging`
  missing). A working Pillow was installed for the test machine; nothing in the repository changed for it.
- **course**: crashed on `main`'s baseline with a click timeout while a second full run shared the machine. Run
  alone, it passes on `main` (39 of 39) and on this branch (39 of 39): no fault in either, and nothing was changed.

## Tests changed, and why (none weakened)

| Test | Change | Why |
|---|---|---|
| `tests/intro.mjs` | Rewritten for the integrated opening | `main`'s structure, busy-machine handling and every check that still applies (timing at six widths, geometry, accessible name, Skip by keyboard and mouse, Escape, stray input, 320 px in every state, a warm service worker, four times slower) are kept; PR #13's state-model checks replace the session, brief-card and remembered-skip checks, because that behaviour is the one the owner asked to change, and are checked the other way round (nothing stored, a skip not remembered, a shared link plays in full) |
| In-page opening self-tests | Replaced with the new opening's (32 checks) | They test the opening that ships |
| `tests/library.mjs` | The catalogue's heading is The Indian Economy Collection; the viewer's navigation checks step to the real last page | The title is the owner's; the volume now has eight preview pages, not three |
| `tests/upsc.mjs` | Image weights held to the pipeline's budget (pages 300 KB, thumbnails and covers 60 KB, 20 MB in all) instead of 120 KB a file | 120 KB was the size of the earlier 640 px watermarked images, written before the pipeline had run |
| `tools/upsc/test_pipeline.py` | A blocked volume's images compared byte for byte with what the repository held | It read a width of 640, true only before the pipeline ran; the new check is stricter |
| `tests/transform.mjs` | Scrolls the chart into view before hovering | Above |
| New self-tests | The Business Brief (4), the collection title (1) | New features |

## Test results on the final build

| Suite | `main` `186e8d4` (before) | This branch, final build | Notes |
|---|---|---|---|
| api-youtube | 21 passed | 21 passed |  |
| selftest | 37 passed | 37 passed |  |
| e2e | 22 passed | 22 passed |  |
| ecosystem | 30 passed | 30 passed |  |
| renaissance | 25 passed | 25 passed |  |
| cover | 35 passed | 35 passed |  |
| pwa | 4 passed | 4 passed |  |
| widths | 15 passed | 15 passed |  |
| overlap | 5 passed, **2 failed** | 5 passed, **2 failed** | the same two checks fail on `main`, with identical findings (see *Remaining issues*) |
| routes | 2 passed | 2 passed |  |
| intro | 84 passed | 99 passed | rewritten for the integrated opening; on `main` it tests the world-map opening. In the full run 98 passed and 1 failed (a correction in the slow-CPU check counted the re-anchoring twice; fixed in `e1f3e02`, a test-only change); re-run on the final commit: 99 of 99 |
| course | **crashed** after 13 passed | 39 passed | on `main` the baseline run crashed on a click timeout while a second full run shared the machine; run alone on `main` it passes 39 of 39 |
| transform | 32 passed, **1 failed** | 33 passed | on `main`: the hover check moved the mouse off the screen; fixed in the test |
| events | 49 passed | 49 passed |  |
| tabs | 9 passed | 9 passed |  |
| notices | 4 passed | 4 passed |  |
| events-scroll | 26 passed | 26 passed |  |
| final | 18 passed | 18 passed |  |
| studio | 89 passed | 89 passed | its privacy check caught an HTML input file during the work; moved to JSON |
| launch | 58 passed | 58 passed |  |
| upsc | 98 passed | 98 passed | image weights held to the pipeline's budget |
| library | 111 passed, **1 failed** | 112 passed | on `main`: the pipeline test could not start because the machine's system Pillow is broken; a working Pillow was installed on the test machine, nothing in the repository. Here the viewer's checks walk all eight pages |
| concepts | 52 passed, **2 failed** | 54 passed | on `main`: two axe target-size violations; fixed in `css-concepts.css` |
| flagship | 50 passed | 50 passed | on this branch it also checks The Business Brief (in the page's self-test) |
| **All 24 suites** | 889 passed, 6 failed, 1 crash; 5 suites red | **934 passed, 2 failed**; 1 suite red (overlap, as on `main`) | |

Every suite in `tests/run-all.mjs` was run, in its order, by one runner on the final build (`851bea9`; the one later
commit, `e1f3e02`, changes only `tests/intro.mjs`, and the intro suite was re-run on it). The baseline is the same
runner on untouched `main` (`186e8d4`) in a separate worktree, before any change. Nothing was skipped, and no check
was removed or loosened; the changed checks are listed above with the reason for each.

Also run on the final build:
- `tools/upsc/test_pipeline.py` (the preview pipeline end to end on synthetic PDFs): 32 of 32 passed.
- The page's own start-up self-test (2,218 checks, counted inside the selftest suite as one): every check passed,
  including the 32 checks of the opening, the 4 of The Business Brief and the collection title.
- Under a subdirectory (`/ib-economics/`, as GitHub Pages serves it): home, a volume page, `#/ib` and a concept
  page loaded with no page error; the only request that failed was `/api/youtube`, the Vercel function, which a
  static host does not have and which the `api-youtube` suite covers; the service worker registered at the
  subdirectory.
- Visual review at 1440, 820 and 390 px of the opening (eight moments of the sequence), the home (with The Business
  Brief panel), the header, the mobile menu, the footer, `#/ib`, `#/upsc`, the collection, a volume page, the
  viewer and a concept page: no page error, no broken image, no sideways scroll.
- Contrast of every new colour, computed: the lowest is 5.02:1.

## Remaining issues

- **overlap** fails two checks, exactly as on `main` (75 and 123 findings, identical line for line): on the home
  hero at 320 to 834 px the fanned handbook covers in the UPSC pathway card overlap one another, and the decorative
  wave behind the hero runs under the pathway cards' links. Both are `main`'s design, unchanged here; this release
  adds no overlap anywhere. A proposed fix, for the owner to decide: below 835 px set the four covers side by side
  without rotation (`.pc-book{position:static;width:23%;transform:none}` in a flex row) and hide `.hx-wave`.
- **Four Mains syllabus lines stay marked "Wording to be confirmed"** (crops and irrigation, farm subsidies and
  PDS, land reforms, liberalisation and industrial policy), as `main` has them. PR #13 shows the same wording
  without the flag, but the 2026 notice PDF cannot be opened from this environment (the request is refused) and
  this session never read its text directly, so the flag stays until someone checks the PDF.
- **The Business Brief's own screenshots** could not be taken (the site is refused by this environment's network),
  so its home panel is typographic, as PR #13's was. Real screenshots can be added once the site is reachable.
- **The Vercel preview** for this branch cannot be opened from this environment; it should be checked in a browser
  before merging, as should GitHub Pages after the merge.

## Commits

On top of `main` at `186e8d4`:

- `5d5cc6f` Integrate PR #13 into main: the two-pathway opening, clean previews, The Business Brief
- `5d7adb9` Library: two captions without currency amounts; the pipeline test compares a blocked volume byte for byte
- `d0ef314` Concepts: a link alone on its line is a 24 px target (WCAG 2.2, 2.5.8)
- `7e7d7a5` Library test: the viewer's navigation checks follow the volume's real page count
- `3ba069d` UPSC test: the preview images are held to the pipeline's own budget
- `e24bb50` The Business Brief: its small type meets 4.5:1 contrast
- `934b4e2` Transform test: bring the data chart into view before hovering it
- `851bea9` The opening's input is JSON, so the host never serves it as a page
- `e1f3e02` Intro test: the slow-CPU arrivals are read on the bar's clock without a second correction
- this report
