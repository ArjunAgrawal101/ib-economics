# Release report: the final flagship release (2026-11-20)

Branch `claude/upbeat-hawking-69d7gz`, from `main` at `aa8c506`; pull request
[#15](https://github.com/ArjunAgrawal101/ib-economics/pull/15). **Not merged**: the owner reviews and merges. The
design record is `docs/flagship/FINAL-FLAGSHIP.md`; the book's preview pipeline is `tools/book/README.md`. The
previous report (PR #14) is now `docs/releases/2026-11-19-reconcile-pr13-report.md`.

## 1. Summary of the changes

- **A seven-second opening**, from economic thought to real-world understanding, on the same tested clock as before.
- **A new home hero**: the statement, the educator's photograph at full size, and both pathways at once.
- **The pathway cards** in the brief's words, with figures counted from the platform's own data.
- **The Indian Economy** (First Edition, 2026-27): a feature on the home page, its own page with a look-inside preview,
  a contents map and a purchasing enquiry, and the free **Digital Revision Companion** on a page of its own.
- **Navigation**: *The Indian Economy* and a *Resources* menu join the header, the drawer, the More menu and search;
  the header fits every width from 1181 px, on every page, with the exam timer idle or running.
- **The ecosystem, About and the footer** in the final brief's words; **Back to top** on long pages.
- **Nothing overlaps**: the overlap audit, which failed on this branch's first full run (184 places where content
  overlapped content and 148 where a figure ran under text, chiefly the fanned handbook covers and the hero's wave
  under the pathway links), now finds none at any of the 570 route-widths it measures. (An audit of `main` on
  19 November, before its last commit, had also failed: 75 and 123.)

## 2. The new home page

| Order | Section | What it holds |
|---|---|---|
| 1 | **Hero** (dark) | "Economics is not just a subject to study. *It is a way to think.*"; "An integrated learning ecosystem connecting economic concepts, visual understanding, real-world evidence and examination thinking."; **Explore IB DP Economics** and **Explore UPSC CSE Economics**; *Think like an economist.* · CONCEPTS. CONTENT. CONTEXTS.; the photograph (539 × 674, the original photo uncropped at the face) in an editorial frame with the caption, and a live AD-AS card beside it |
| 2 | **Two pathways** (in the hero) | IB DP Economics: "Think conceptually. Apply theory. Evaluate real-world economics.", ten features, counts (subtopics, diagrams, mindmaps, real-world cases, calculators); UPSC CSE Economics: "Understand the Indian economy through concepts, institutions, policies and evidence.", ten features including the book and the companion, counts (syllabus lines, handbooks, topic previews, current-affairs notes), and four handbook covers. Both cards begin within the first screen at 1440 × 900 |
| 3 | **A new academic work** (parchment) | The book as a 3D object (its real cover, never stretched), title, subtitle, edition, credit, introduction, the five readers, four facts, *Explore the book*, *Look inside*, *Enquire about purchasing*; four pages to open in the reader; the eight-Part contents map |
| 4 | **The Digital Revision Companion** (charcoal) | 13 units, 254 PDF pages, free; fourteen kinds of material in four groups; the free resource library |
| 5 onward | as before | Think like an economist (a live market model), the IB DP and UPSC environments, selected resources, the laboratory, one concept two perspectives, **the ecosystem** (new heading and taglines), About (the book now mentioned), enrolment and contact (with the book's enquiry) |

## 3. The opening (seven seconds)

| ms | Stage |
|---|---|
| 0-700 | a midnight field lit from the seam; a fine-line economic grid |
| 250-1650 | price and quantity axes; demand draws itself (450-1350), then supply (650-1550); the equilibrium with P* and Q* |
| 1750-3400 | the market gives way to AD-AS: aggregate demand shifts right along short-run supply, the equilibrium moves with it (output and the price level rise), long-run supply stays |
| 3000-4400 | a network joins CONCEPTS, EVIDENCE, POLICY and OUTCOMES, then recedes |
| 3950-4750 | the AA monogram, then the name ARJUN AGRAWAL (the logo's own vectors) |
| 4800-5250 | ECONOMICS · POLITICS · BUSINESS |
| 5300-5750 | THINK LIKE AN ECONOMIST. (5800-6050 is still) |
| 6200-7000 | the two halves open onto the page like the covers of a book |

It plays on every full load, reload and refresh (no `localStorage` or `sessionStorage` is read or written), never on
navigation inside the app; **Skip introduction** and Escape end it in 180 ms; **Replay the opening** is in Settings
and now in the footer; reduced motion shows one still frame for 1.5 s; no audio, no images, no animation library. The
curves "draw" by a window sliding open over them (two opposite transforms), so the compositor keeps time; the AD
shift and the moving dot are worked out from the slopes (a self-test checks the dot stays on SRAS). The platform's
content is in the page behind the overlay throughout, for assistive technology and search engines.

## 4. The book and the companion

- `#/book`: the hero (cover as a 3D book), "Concepts, institutions, policies and sectors, in one connected reference"
  with the facts (641 numbered pages; the PDF edition has 706 pages, including the front matter and unnumbered pages;
  First Edition 2026-27; information incorporated through November 2026; ISBN to be assigned; publisher and price to
  be confirmed), **Look inside**, the **contents map** (eight Parts, their page ranges, chapters, units and principal
  chapters, a bar drawn to scale, the navigation maps and reference tools), the companion, the purchasing enquiry and
  links onward.
- **Look inside**: the cover and ten pages (xxi, xxii, xxv, 12, 16, 36, 39, 40, 54, 58), chosen for range: the Master
  Systems Map, the Master UPSC Syllabus Map, the Reader and Course Alignment Map, opportunity cost and the PPC, the
  Indian economic system, externalities and public goods, the integrated mind map, one-page rapid revision, the
  Arthapur three-methods exercise, and India's GDP by expenditure in 2025-26. Each shows its **printed** page number
  (checked against the page by the build). Previous/next, thumbnails, *Zoom in to read*, *Open the reading view*
  (the handbook reader: zoom to 300%, full screen, arrow keys, swipe, Escape). 1600 px images, no watermark, no
  overlay. The book's About the Author page is deliberately not shown (it names current appointments).
- `#/book/digital-revision-companion`: the companion's page, free and without a login, at the address printed in the
  book (`q.me-qr.com/48usv7rt`).
- **Purchasing**: "Interested in purchasing the book? Write to me to enquire about availability and purchasing
  details." *Enquire by email* and *Contact on WhatsApp* (the published address and number, with the message
  written); no payment, no price, no checkout.
- **Never public**: no PDF of the book or the companion is in the repository, linked, embedded or requested; only the
  22 WebP images of the chosen pages (2.34 MB) are published.

## 5. Navigation and discovery

- Header: Home · IB DP Economics ▾ · UPSC CSE Economics ▾ · **The Indian Economy** · **Resources ▾** · About ·
  Academic Ecosystem ▾. The Resources menu lists, for UPSC CSE and university study, the book, the companion, the
  Economics handbooks and the UPSC topic resources, and for IB DP Economics, the resource hub, question banks,
  revision, Economics in 60 Seconds and the Learning Studio.
- Fit: from 1600 px everything is spelled out; below, "Academic Ecosystem" reads "Ecosystem"; below 1360 px the
  pathways read "IB DP" and "UPSC CSE" (screen readers still hear "Economics"). On IB DP pages, whose header also
  carries the calculator, the exam timer, SL/HL and the profile, the global Resources steps aside (the IB DP context
  bar has its own), the pathways shorten below 1800 px, and the book's link steps aside between 1181 and 1279 px
  and below 1360 px while the timer runs.
- The drawer (phones and tablets) adds *A new academic work*: The Indian Economy and the Digital Revision Companion.
  The rest of the Resources menu (the handbooks, the topic resources, the IB DP resources) is already in the drawer
  under the two pathways, so it is not listed twice.
- Search finds the book, the companion and each of the eight Parts (labelled "The Indian Economy").
- Back to top on long pages; the footer's *Replay the opening*.

## 6. Cross-platform links

| Platform | Line (the brief's) | Tagline | Address |
|---|---|---|---|
| Economics (this platform) | Arjun Agrawal \| IB DP Economics and UPSC CSE Economics | Think like an economist. | https://ib-economics-pi.vercel.app/ |
| The Business Brief | IB DP Business Management | Strategy. Leadership. Decisions. | https://the-business-brief-dun.vercel.app/ |
| Political Studies & Global Affairs | IB DP Global Politics \| Indian Polity \| International Relations \| PSIR | Understand power, politics and global affairs. | https://arjun-agrawal-political-studies.vercel.app/ |

They appear in the header menu, the drawer, the home page ("One educator. Three disciplines. One connected learning
ecosystem."), the footer and About, always in a new tab with `rel="noopener noreferrer"`, never as a third pathway.

## 7. QA

Every suite in `tests/` was run with Playwright (Chromium) and axe-core in this environment; the numbers are the
checks each suite printed as passed. The full run (`run-all.mjs`, 25 suites) was cut short by a container restart
after its eighth suite, so it was finished as a second run of the other seventeen; three suites were then rerun on
their own after the fix below.

| Suite | Checks passed | Failed | Run on |
|---|---|---|---|
| api-youtube | 21 | 0 | `efd8b6c` |
| selftest (built-in self-tests) | 37 (2,254 built-in checks in 31 areas) | 0 | `efd8b6c` |
| e2e | 22 | 0 | `efd8b6c` |
| ecosystem | 30 | 0 | `efd8b6c` |
| renaissance | 25 | 0 | `efd8b6c` |
| cover | 35 | 0 | `efd8b6c` |
| pwa | 4 | 0 | `efd8b6c` |
| widths (15 widths, 320 to 2560 px, the book's two pages added) | 15 | 0 | `efd8b6c` |
| overlap (570 route-widths, 177,504 elements measured) | 7 | 0 | `efd8b6c` |
| routes | 2 | 0 | `efd8b6c` |
| intro (the seven-second opening) | 100 | 0 | `efd8b6c` |
| course | 39 | 0 | `efd8b6c` |
| transform | 33 | 0 | `efd8b6c` |
| events | 49 | 0 | `efd8b6c` |
| tabs | 9 | 0 | `efd8b6c` |
| notices | 4 | 0 | `efd8b6c` |
| events-scroll | 26 | 0 | `efd8b6c` |
| final | 18 | 0 | `efd8b6c` |
| studio | 89 | 0 | `efd8b6c` |
| upsc | 98 | 0 | `efd8b6c` (the drawer fix was built while it ran; upsc does not open the drawer) |
| concepts | 54 | 0 | `9ad4720` |
| flagship (axe included) | 50 | 0 | `9ad4720` |
| book (axe at 1440 and 390 px included) | 51 | 0 | `9ad4720` |
| **launch** | 58 | 0 | `9ad4720`, rerun on its own |
| **library** | 112 | 0 | `9ad4720`, rerun on its own |
| **selftest**, again | 37 (2,255 built-in checks) | 0 | `9ad4720`, rerun on its own |

What failed on the way, and why:

- **launch** failed on `efd8b6c` (33 checks passed, then it stopped): the drawer's new book section repeated the
  whole Resources menu, so the drawer had two groups named Resources and two Resource hub links, and the test's
  click on them was ambiguous. That was a real flaw for readers too, not only for the test. Fixed in `9ad4720`: the
  book's section adds only what the drawer lacks (the book and the Digital Revision Companion), and a new built-in
  check confirms the drawer repeats no link and no group name. The test was not changed; it passes (58 checks).
- **library** failed one check in the long run: "only the current page is placed, and the next one is fetched in
  advance", which allows 500 ms for the next page to be fetched after the current one loads. It ran while a second
  browser suite was running alongside it and while the page was being rebuilt, both my doing. Run on its own on
  `9ad4720` it passed in full (112 checks), as it did on the branch's first full run. The check was not changed.
- The only code change after `efd8b6c` is the drawer fix (`src/modules/51-book.js` and the built `index.html`); of
  the suites run on `efd8b6c`, only launch and flagship open the drawer, and both were run again after the fix.

Also checked, outside the suites: no PDF of the book or the companion is tracked (the ten PDFs in the repository are
the "Economics in 60 Seconds" carousels already on `main`); the preview is 22 WebP images, 2.4 MB; no key or token
is in the diff; the only price added is the handbooks' existing ₹99; no test was removed or loosened (`intro.mjs`
went from 48 to 50 checks with the new timings, `flagship.mjs` stays at 43 with ten features in place of eight, the
built-in self-tests from 1,115 declarations to 1,144).

## 8. Remaining limitations

- **Only Part 1 of the book was supplied** (PDF pages 1 to 100 of 706), so every preview page comes from the front
  matter and Part One. The 641 numbered pages and 706 PDF pages are the owner's figures: the supplied contents place
  the Master Subject Index at page 641, which agrees, but the end of the book could not be seen.
- **The Digital Revision Companion's PDF was not supplied**, so it has no preview pages: its page and the home
  section describe it from the brief, and the book page's switch between the book and the companion appears by
  itself once its pages are added (`tools/book/README.md`). Its 13 units and 254 pages are the owner's figures.
- **External addresses could not be opened from this environment** (the network refuses `vercel.app` and
  `q.me-qr.com`): the production site, this branch's preview, the two sister platforms and the companion's library.
  They are linked exactly as the brief and the book give them; please click each once on the preview.
- **No logos of the sister platforms** were available here, so their panels stay typographic, as before.
- **Price, publisher and ISBN** are not on the site, as the book has not confirmed them; add them when they are.
- **Five UPSC syllabus lines** stay marked "Wording to be confirmed", as on `main`.

## 9. Files

Created: `src/modules/51-book.js`, `src/modules/51-book-data.js` (generated), `src/modules/52-final.js`,
`src/styles/css-book.css`, `src/styles/css-final.css`, `tools/book/build_book.py`, `tools/book/preview-pages.json`,
`tools/book/README.md`, `tools/migrations/2026-11-20-opening-seven-seconds.py`,
`tools/migrations/2026-11-20-final-flagship-footer.py`, `tests/book.mjs`, `docs/flagship/FINAL-FLAGSHIP.md`,
`assets/brand/arjun-agrawal-portrait-hero.webp`, `assets/book/the-indian-economy/` (22 WebP images), this report.

Edited: `index.html` (built), `src/modules/08-about.js`, `13-opening.js`, `27-wire-t6.js`, `44-flagship-core.js`,
`45-library.js` (reader hooks), `48-home.js`, `49-flagship-tests.js`, `src/styles/css-opening.css`,
`tools/build/splice.py` (two new stylesheets), `tests/intro.mjs`, `tests/flagship.mjs`, `tests/widths.mjs`,
`tests/run-all.mjs`, `README.md`.

Moved: `RELEASE-REPORT.md` (PR #14) to `docs/releases/2026-11-19-reconcile-pr13-report.md`. Removed: nothing.

## 10. Commits, branch, preview, merge

- Branch: `claude/upbeat-hawking-69d7gz`, from `main` at `aa8c506`.
- Commits: `c2c01b2` (the book, the opening, the hero), `c1d5bad` (fixes from the first full run, Back to top,
  documentation), `728f542` (nothing drawn over anything), `efd8b6c` (the UPSC card's covers), `34e3964` (this
  report, first draft), `9ad4720` (the drawer fix), and the commit that completes this report.
- Pull request: [#15](https://github.com/ArjunAgrawal101/ib-economics/pull/15).
- Vercel preview: https://ib-economics-git-claude-upbeat-hawking-69d7gz-arjun-98c6.vercel.app (built by Vercel
  for this branch; it could not be opened from this environment).
- **Not merged into `main`.** The owner reviews the preview and merges.
