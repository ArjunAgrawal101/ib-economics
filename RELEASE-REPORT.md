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
- **Nothing overlaps**: the overlap audit's findings on `main` (the fanned handbook covers, the hero's wave under the
  pathway links) are resolved, at every audited width.

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
- The drawer (phones and tablets) adds *A new academic work*: The Indian Economy, and the Resources list.
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

The final full run (`node tests/run-all.mjs`, 25 suites, on commit `efd8b6c`) is in progress; this section is
completed with every suite's actual result when it ends. Passed so far, all checks in each: api-youtube, selftest
(2,254 built-in checks in 31 areas, 0 failing), e2e, ecosystem, renaissance, cover, pwa.

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

Branch `claude/upbeat-hawking-69d7gz`; pull request [#15](https://github.com/ArjunAgrawal101/ib-economics/pull/15);
Vercel preview https://ib-economics-git-claude-upbeat-hawking-69d7gz-arjun-98c6.vercel.app. **Not merged into
`main`.** Commits on this branch since `main` (`aa8c506`): `c2c01b2`, `c1d5bad`, `728f542`, `efd8b6c`, and this report.
