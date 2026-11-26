# The final flagship release (2026-11-20)

The owner's final brief ("Master prompt: final flagship upgrade") asked for an elevation of the existing platform,
not a rebuild: a seven-second cinematic opening, a stronger home page with the educator's photograph and both
pathways at once, a prominent feature and preview for the new book *The Indian Economy* and its Digital Revision
Companion, a clearer navigation, the three-platform ecosystem, About and the footer, then transitions and QA. This
note records how it was done, so a later session can continue without re-reading the code.

## Starting point

- `main` was `aa8c506` (the Academic Ecosystem commit, made on 2026-11-20 from session branch
  `claude/lucid-meitner-28o0es`, which points at the same commit). PR #13 is open and superseded by PR #14 (merged);
  nothing of it is used here.
- The branch `claude/upbeat-hawking-69d7gz` was fast-forwarded to `aa8c506`; no history was rewritten.
- Supplied: `The_Indian_Economy_First_Edition_2026-27_FINAL-Part_1.pdf`, PDF pages 1 to 100 of the book's 706.
  **Not supplied**: the rest of the book and the Digital Revision Companion PDF.

## Implementation plan (as carried out)

| Priority | Work | Where |
|---|---|---|
| 1 | Seven-second opening on the existing clock | `tools/migrations/2026-11-20-opening-seven-seconds.py`, `src/styles/css-opening.css`, `tests/intro.mjs` |
| 1 | Hero: statement, portrait, both pathways; pathway cards in the brief's words | `src/modules/48-home.js`, `src/styles/css-final.css`, `assets/brand/arjun-agrawal-portrait-hero.webp` |
| 1 | The book on the home page | `src/modules/51-book.js` (`bkHomeFeature`), `src/styles/css-book.css` |
| 2 | Book page, contents map, look-inside preview and reading view, companion page | `51-book.js`, `45-library.js` (reader hooks), `tools/book/` |
| 2 | Navigation: The Indian Economy and Resources in the header, drawer, More menu, search | `51-book.js`, `27-wire-t6.js` |
| 3 | Ecosystem heading and taglines, About chapter on the book, footer additions | `44-flagship-core.js`, `48-home.js`, `08-about.js`, `tools/migrations/2026-11-20-final-flagship-footer.py` |
| 4 | Header fit 1181 to 1920 px, reveals, reduced motion, tests | `css-book.css`, `css-final.css`, `tests/book.mjs`, self-tests |

## Decisions

- **The opening keeps its engine.** The clock (first presented frame, Web Animations on one `startTime`, Paint
  Timing re-anchoring in a still passage, exit at exactly `start + ms`, Skip and Escape, reduced motion, no storage)
  was tested and correct, so only the storyboard, the markup and `ms` changed (5000 to 7000). The curves "draw"
  with a window that slides open over them (two opposite transforms), so the compositor still keeps time. The AD
  shift and the moving equilibrium are worked out from the slopes, and a self-test checks the dot stays on SRAS.
- **The name stays in the brand vectors.** "ARJUN AGRAWAL" is the logo's own wordmark, revealed after the monogram;
  the rule that the overlay never sets the name in type is kept.
- **The book belongs to neither pathway** (`FX_SHARED`): it serves UPSC CSE, State PCS, RBI Grade B (General) and
  university readers. It has its own register from its cover: midnight navy and champagne gold.
- **No invented facts.** Pages: 641 numbered (the owner; the Contents at a Glance places the Master Subject Index at
  page 641) and 706 PDF pages (the owner), stated separately. Eight Parts, 153 chapters, thirteen units, the Part
  start pages and the reference tools are read from the Contents at a Glance. Price, publisher and ISBN are "to be
  confirmed" / "to be assigned", as the copyright page says; the site invites an enquiry and sells nothing.
- **The book's About the Author page is not shown.** It names current appointments; the standing rule is never to
  state or imply the owner's current employer. The website's About keeps its existing, verified facts and adds a
  chapter on the book that quotes the preface.
- **The companion** is free, linked at the address printed in the book (`q.me-qr.com/48usv7rt`). Its feature list,
  thirteen units and 254 pages are the owner's. Without its PDF there is no companion preview; the switch appears by
  itself once pages are added (`tools/book/README.md`).
- **The ecosystem** keeps the platform names and the header menu added on 2026-11-20 and takes the final brief's
  heading, subject lines and taglines. No logos of the sister platforms were available here (their sites cannot be
  reached from this environment), so the panels stay typographic.
- **The header** keeps the two pathways' full names wherever they fit; below 1360 px they read "IB DP" and "UPSC
  CSE" with "Economics" kept for screen readers, and "Academic Ecosystem" reads "Ecosystem" below 1600 px.

## Tests added or changed

- `tests/book.mjs` (new): repository guarantees (only WebP images of the chosen pages, no PDF tracked, budget), the
  header link and Resources menu, the book page, look inside (next, previous, thumbnails, printed page numbers), the
  reading view (zoom, arrows, Escape, focus), the companion page, the enquiry links, search, 320/390/768 px, axe
  (book, companion, reading view, home), reduced motion.
- `tests/intro.mjs`: retargeted to seven seconds and the new stages; every structural, timing, keyboard, state-model,
  320 px and four-times-slower check is kept.
- In-page self-tests: a new "The Indian Economy" suite (25 checks); the opening suite rewritten for the new
  storyboard (including the economic-exactness check); the flagship suite updated to the brief's copy (ten features
  per pathway, counts from the data, the new section order, the hero, the ecosystem lines and taglines).
