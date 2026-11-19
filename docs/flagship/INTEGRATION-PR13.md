# Reconciling PR #13 with `main` (2026-11-19)

`main` at `186e8d4` (the merge of PR #12, the flagship redesign) is the foundation.
PR #13 (`claude/upsc-cse-economics`, seven commits on top of `5f7b64f`) was built in
parallel with PR #12 against an older base, and conflicts with it in about 33 files.
It is **not** merged. Instead, the parts of it that `main` does not already have, or
does less well, are rebuilt on `main`'s own architecture (its modules, tokens, routes,
data files, build pipeline and tests). Everything else in `main` is kept as it is.

## How the two versions compare

| Area | `main` (PR #12) | PR #13 | Decision |
|---|---|---|---|
| Opening | World map, trade arcs, indicators, the two worlds as captions, then AA, ECONOMICS, THINK LIKE AN ECONOMIST. The full sequence once a browser session (`sessionStorage`); a 1.2 s card on later loads or for 30 days after Skip (`localStorage`); a cover only on deep links | The identity, supply and demand, then the screen divides into IB DP Economics (burgundy, globe) and UPSC CSE Economics (forest green, kolam), "One discipline. *Two pathways.*", and the two halves open onto the page. Every full page load plays; nothing is stored | **PR #13's opening**, which states both pathways and has the agreed behaviour. `main`'s Escape-anywhere skip, its descriptive "Skip introduction" label and its 30 s failsafe are carried into it (see below) |
| Home | Ten sections, the pathway cards, the interactive lab, the concepts, About, enrolment | Ecosystem home with a knowledge map and screenshots | **`main`**. PR #13's home would be a parallel version |
| Navigation | Global header (Home · IB DP Economics · UPSC CSE Economics · About · Search) with pathway panels and per-pathway context bars | Mega menus and a "Learning Tools" menu | **`main`**, plus a link to The Business Brief (below) |
| IB landing (`#/ib`) | The IB home intact behind an IB introduction | An IB finder | **`main`** |
| UPSC environment | Eight tabs, the preparation system (eight clickable steps), current affairs, the course, contact | Same tabs on the older base, a 7-stage roadmap, an Optional tab | **`main`**. Its eight clickable steps already are the learning roadmap, and its syllabus already says that the pages cover General Studies and not the Economics Optional paper; PR #13's roadmap and Optional tab would duplicate them |
| Shared concepts | 19 concepts, IB and UPSC pathways for each (`#/concepts/...`) | 11 concepts | **`main`** |
| Handbook catalogue and viewer | Catalogue with filters, one page per volume, a viewer, a pipeline (`tools/upsc/`) built for about eight clean pages per volume, **never run**: three watermarked 640 px pages per volume | Eight clean pages per volume rendered from the PDFs, with its own viewer | **`main`'s catalogue, viewer and pipeline**, now **run on the private PDFs** to give eight clean pages per volume (below). PR #13's viewer and image set are not brought in |
| Collection name | "The Economics Handbook Library" | "The Indian Economy Collection" (the owner's brief) | The catalogue's title becomes **The Indian Economy Collection**, with the brief's subtitle; the tab, routes and breadcrumbs keep the name Handbook Library. The volumes keep the series name printed on their covers, The Indian Economy Series |
| The Business Brief | Absent | Header link, home panel, footer "Explore the academic ecosystem", drawer | **Brought in**, in `main`'s header, home and footer, in `main`'s design tokens |
| Assignment links (`#assign=`) | Already handled on the home page | Fixed on its older base | **`main`** (nothing to port) |

## What is integrated from PR #13

1. **The opening** (`tools/migrations/2026-11-19-opening-two-pathways.py`). PR #13's
   overlay, clock and styles replace `main`'s in one place each: the overlay and its
   clock in the base page, the styles in `src/styles/css-opening.css`, the in-page
   self-tests in the base page, and the line on the settings page that says what the
   opening stores. One implementation remains. Behaviour: every full page load plays
   the full five seconds, whatever the address (first visit, reload, bookmark, shared
   link, Back or Forward from another site); navigation inside the app never shows it;
   a page restored from the back-forward cache is shown as it was left; nothing is read
   from or written to storage; reduced motion shows one still frame for 1.5 s. From
   `main`: the button reads "Skip introduction", Escape skips from anywhere, and a CSS
   failsafe hides the overlay after 30 s even if its script never runs. `main`'s
   2026-11-17 opening migration now stops when the newer opening is present, so
   re-running the migrations cannot bring the old opening back.
2. **Clean previews.** `main`'s own pipeline (`tools/upsc/propose_pages.py`, then
   `build_upsc.py`) run on the eleven private PDFs, with the pages chosen in
   `tools/upsc/preview-pages.json` (eight per volume, each with a caption checked
   against the page's own text). The images are rendered clean, with no added
   watermark, at `main`'s sizes. The PDFs stay outside the repository.
3. **The Business Brief** (`https://the-business-brief-dun.vercel.app/`, a new tab with
   `rel="noopener noreferrer"`) in three places: a quiet link in the header (and the
   mobile menu), an editorial panel on the home page ("Beyond Economics. Explore
   Business Management."), and an "Explore the academic ecosystem" group in the
   footer (IB DP Economics, UPSC CSE Economics, IB DP Business Management). It is
   presented as a sister platform, not a third pathway: no pathway colour, no place in
   the pathway switcher, and the two pathway cards keep their equal weight. The header
   has room for the link from 1360 px wide; below that, and while the exam timer is
   running below 1600 px, the header stays as `main` laid it out and the link is in the
   menu, on the home page and in the footer (measured; `main`'s overlap tests hold). Its own
   screenshots could not be taken (this environment's network refuses the site), so the
   panel is typographic, as it was in PR #13.
4. **The collection title**, as above.

## What is not brought in, and why

- PR #13's home page, mega menus, "Learning Tools" menu, IB finder, knowledge map and
  its screenshots: `main` already has a reviewed version of each, and a second one would
  be a parallel implementation.
- PR #13's 11-concept module: `main`'s 19 concepts cover all of them.
- PR #13's UPSC roadmap and Optional tab: duplicates of `main`'s preparation system
  and its syllabus scope note.
- PR #13's handbook viewer, its `build_upsc.py` rewrite and its image set: `main`'s
  pipeline does the same job with page kinds, captions, checks and a test of its own.
- PR #13's tests for the features above, and its release reports: they describe PR #13's
  versions. Its opening test is merged into `main`'s (below).

## Tests

- `tests/intro.mjs` is rewritten for the integrated opening. `main`'s checks are kept
  wherever they still apply (timing at six widths, the busy-machine hold, geometry,
  the accessible name, Skip by keyboard and mouse, Escape, stray input, 320 px in every
  state, a warm service worker, the four-times-slower run). PR #13's state-model checks
  replace `main`'s session, brief-card and remembered-skip checks, because that
  behaviour is the one the owner asked to change. These are now checked the other way
  round: a skip is not remembered, a deep link plays in full, and nothing is stored.
- `tests/library.mjs` expects the catalogue's new title, and its viewer checks step to the
  volume's real last page (eight pages now, not three).
- `tests/upsc.mjs` holds the preview images to the pipeline's own budget (pages 300 KB,
  thumbnails and covers 60 KB, 20 MB in all) instead of the 120 KB of the old 640 px images.
- `tools/upsc/test_pipeline.py` compares a blocked volume's images byte for byte with what
  the repository held, instead of reading the old 640 px width.
- `tests/transform.mjs` scrolls the data chart into view before hovering it (it failed on
  `main` too: the point it hovered was off the screen).
- Every suite in `tests/run-all.mjs` was run on `main` before the integration (the
  baseline) and on the final build. The results, suite by suite, are in `RELEASE-REPORT.md`:
  934 checks passed and 2 failed on the final build (both in `overlap`, identical to `main`),
  against 889 passed, 6 failed and one crash on `main`.
