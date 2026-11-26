# Release report: the definitive release (2026-11-26)

Branch `claude/upbeat-hawking-69d7gz`, from `main` at `aa8c506`; pull request
[#15](https://github.com/ArjunAgrawal101/ib-economics/pull/15). **Not merged; `main` and production are unchanged.**
This release builds on the final flagship release (2026-11-20, `docs/releases/2026-11-20-final-flagship-report.md`),
which is in the same pull request and not yet merged either.

## 1. The audit, before anything changed

- **Repository.** `main` is at `aa8c506` (PR #14 merged). PR #15 (this branch, the final flagship release) was open
  and unmerged. Other branches (`claude/upsc-cse-economics`, `claude/lucid-meitner-28o0es`,
  `claude/sleepy-pascal-rlzusx`, `presentation-assets`) are older and already reconciled in `main`; nothing was taken
  from them. This branch was the latest approved work, so the release continues on it.
- **Supplied files.** Only *The Indian Economy*, Part 1 (PDF pages 1 to 100 of 706) is present. **The Digital
  Revision Companion PDF and the September 2026 release package were not in this environment**, nor the rest of the
  book. The handbook PDFs supplied earlier are still here and unused.
- **Live sites.** This environment's network refuses `vercel.app` (the live site, this branch's preview and both
  sister platforms) and the official source sites (RBI, IMF, World Bank, PIB), so none could be opened.
- **Sister platforms.** The Business Brief's repository is public and was read for its brand (navy `#0B1A33`, gold
  `#C9A866`, ivory `#F6F1E7`; its AA mark; its social card). No repository for Political Studies could be found under
  any likely name; it may be private.
- **Routes, storage and PWA.** Every existing route, the saved progress and preferences on the device, the service
  worker and offline behaviour are untouched; the suites below exercise them.

## 2. Summary of the upgrade

- **The academic ecosystem.** ARJUN AGRAWAL | ACADEMIC ECOSYSTEM, *Think. Understand. Connect.* The opening now ends
  THINK. UNDERSTAND. CONNECT., with burgundy as its quiet second accent. Economics keeps *Think like an economist.*;
  Political Studies, *Power. Politics. Perspectives.*; The Business Brief, *Strategy. Leadership. Decisions.*
- **The home page, in the brief's sequence**: the hero and both pathways (equal, in the first screen), the IB DP
  pathway, the UPSC CSE pathway, *The Indian Economy*, the Digital Revision Companion, the learning experience, the
  ecosystem, the author, contact and the footer.
- **The author**, on the home page, the book page and About: the photograph, a short biography (the brief's text,
  tightened), and the qualifications from the book's own author page. No employer is named.
- **The book**: "A new academic publication"; Author: Arjun Agrawal; a chapter explorer with all 153 chapters; the
  preview gains Contents at a Glance and a chapter opening.
- **Fifteen new diagrams** the IB guide requires: the money market, crowding out, the J-curve, the market structures
  of 2.11, free trade with exports, a fixed exchange rate, structural unemployment, the Engel curve, the poverty cycle.
- **UPSC CSE Economics** opens on four ways in: Prelims, Mains, Core Economics, Books and resources.
- **Real World**: every case opens with *the case at a glance*, honest about what is verified.
- **Navigation and discovery**: the header in the brief's order; SL, HL and University labels in search; structured
  data; landing pages for search engines.

## 3. New features

| Feature | Where |
|---|---|
| THINK. UNDERSTAND. CONNECT. as the opening's last line, burgundy accent | the opening (`tools/migrations/2026-11-26-definitive-identity.py`, `css-definitive.css`) |
| Three-platform ecosystem cards with the platforms' own preview and mark | home, About (`44-flagship-core.js`) |
| Cross-platform strip, Publications and Follow (LinkedIn, Instagram, YouTube) in the footer | footer (migration) |
| Author introduction | home (`48-home.js`), book page (`51-book.js`), About (`08-about.js`) |
| Teaching philosophy, *Concepts. Content. Contexts.*; Publications chapter | About |
| Chapter explorer (153 chapters, the book's titles and pages) | `#/book` (`51-book-chapters.js`) |
| Fifteen diagrams, eight with a control that re-solves the model | Diagram atlas, topic pages, search (`53-diagrams.js`) |
| Four ways in | `#/upsc` (`54-definitive.js`) |
| The case at a glance | every Real World case (`54-definitive.js`) |
| SL, HL and UPSC CSE · University labels | search |
| Person and Book structured data; page titles for the book, companion and About | `<head>`, `54-definitive.js` |
| Landing pages `/ib-economics/`, `/upsc-economics/`, `/the-indian-economy/` | `tools/seo/build_landing.py`, sitemap |

## 4. The home page and navigation

1. **The seven-second opening.**
2. **Hero**: "Economics is not just a subject to study. *It is a way to think.*", the supporting line, *Explore IB DP
   Economics* and *Explore UPSC CSE Economics*, the portrait, and the two pathway cards with the brief's lines:
   *Concepts. Diagrams. Real-world applications. Examination thinking.* and *Economic foundations. Indian institutions.
   Public policy. Prelims and Mains.*
3. **The IB DP Economics environment** (section 02). 4. **The UPSC CSE Economics environment** (03).
5. **A new academic publication: The Indian Economy.** 6. **The Digital Revision Companion.**
7. **The learning experience**: Think like an economist (a live model), selected resources, the interactive
   laboratory, one concept two perspectives (04 to 07).
8. **One educator. Three disciplines. One connected learning ecosystem.** 9. **About the author** (08).
10. **Enrolment and contact** (09), then the footer.

**Header**: Home · IB DP Economics ▾ · UPSC CSE Economics ▾ · The Indian Economy · Resources ▾ · Academic Ecosystem ▾ ·
About. The fit rules of the previous release still hold (from 1181 px; shorter labels on narrower screens).

## 5. The seven-second opening

Unchanged in engine, clock and storyboard (it was rebuilt and tested in the previous release): charcoal and gold, a
fine-line grid; demand and supply draw themselves; aggregate demand shifts along short-run supply; a network of
concepts, evidence, policy and outcomes; the AA monogram and ARJUN AGRAWAL; ECONOMICS · POLITICS · BUSINESS; and now
**THINK. UNDERSTAND. CONNECT.**, under a hairline of burgundy and gold, with burgundy dots between the three
disciplines. Every full load plays it; navigation inside the app never does; Skip and Escape end it; *Replay the
opening* is in Settings and the footer; reduced motion shows one still frame; nothing is stored; no audio.

## 6. The author and the book

- **Author identity** (three places): "Arjun Agrawal is an Economics educator, academic resource creator and author.
  His work connects economic theory with public policy, examination preparation and university-level study, and his
  academic interests extend across Economics, Political Studies and Business Management. Through his teaching, his
  publications and these learning platforms, he aims to make complex ideas accessible, analytical and relevant to the
  world around us." Roles: IB DP Economics Educator | UPSC Economics Mentor | Academic Resource Creator | Author of
  The Indian Economy. Qualifications from the book's author page: BA (Programme) Economics and Political Science, St.
  Stephen's College; MA Economics, Fergusson College, Pune; MA Political Science, IGNOU; UGC-NET (twice); MH-SET.
- **The book page** (`#/book`): A NEW ACADEMIC PUBLICATION; the 3D cover; Author: Arjun Agrawal; the five readers; the
  facts (641 numbered pages, 706 PDF pages, 8 Parts, 153 chapters, 13 units); the author block with the preface's
  line; Look inside; the proportional contents map; the chapter explorer; the companion; the purchasing enquiry.
- **Exact preview pages** (cover plus ten, each with its printed number): the front cover; **vii** Contents at a
  Glance; **xxi** Master Systems Map; **xxii** Master UPSC Syllabus Map; **2** Chapter 1, Understanding Economics (a
  chapter as it opens); **12** opportunity cost and the PPC (a conceptual explanation with diagrams); **16** the
  Indian economic system (policy and institutional analysis); **36** externalities and public goods (diagrams); **39**
  the integrated mind map; **54** the Arthapur national-income exercise (a worked example); **58** India's GDP by
  expenditure, 2025-26 (an analytical table of data).
- **Not shown: About the Author (page vi)**, because it names current appointments; your earlier instruction was not
  to name or imply the current employer. Say the word and it can be added.
- **Purchasing**: "Interested in purchasing the book? Write to me to enquire about availability and purchasing
  details." Email and WhatsApp to the published address and number. No price, publisher, ISBN or dispatch claim.
- **Never public**: no PDF of the book is in the repository or linked; only 22 WebP images (2.4 MB).

## 7. The Digital Revision Companion

Its own section on the home page and its own page (`#/book/digital-revision-companion`): title, subtitle, First
Edition 2026-27, 13 units, 254 PDF pages, free; the brief's fourteen features in four groups (revise, Prelims, Mains,
beyond the examination); and the relationship, in the brief's words: *The book builds comprehensive understanding.
The companion supports structured revision and examination practice.* It links to the free resource library at the
address printed in the book, without a login. **Its preview could not be built: the companion's PDF was not
supplied.** The book page's switch between the book and the companion appears by itself once its pages are added
(`tools/book/README.md`).

## 8. The three platforms

| Card | Line | Tagline | Address | Brand used |
|---|---|---|---|---|
| Economics | IB DP Economics \| UPSC CSE Economics | Think like an economist. | https://ib-economics-pi.vercel.app/ | its own monogram and social card |
| Political Studies | IB DP Global Politics \| International Relations \| Indian Polity \| PSIR | Power. Politics. Perspectives. | https://arjun-agrawal-political-studies.vercel.app/ | typographic: no logo or preview was available |
| Business Management | IB DP Business Management | Strategy. Leadership. Decisions. | https://the-business-brief-dun.vercel.app/ | its own AA mark and social card, from its public repository |

The brief gives the Political Studies address two ways (`arjun-agrawal-political-studies` at the top,
`arjunagrawal-political-studies` in section 12). The site keeps the hyphenated one, which the brief's header, the
previous brief and the existing site all use; please confirm it on the preview.

## 9. QA

Every suite in `tests/` was run with Playwright (Chromium) and axe-core in this environment, on the final build
(`ae558ac`, all code; later commits change only the studio test and this report). The numbers are the checks each suite
printed as passed.

| Suite | Checks passed | Failed |
|---|---|---|
| api-youtube | 21 | 0 |
| selftest | 37 (2,419 built-in checks, 0 failing) | 0 |
| e2e | 22 | 0 |
| ecosystem | 30 | 0 |
| renaissance | 25 | 0 |
| cover | 35 | 0 |
| pwa | 4 | 0 |
| widths | 15 | 0 |
| overlap | 7 (570 route-widths: 0 content over content, 0 figures under text) | 0 |
| routes | 2 | 0 |
| intro | 100 (the opening exits on its seven-second clock) | 0 |
| course | 39 | 0 |
| transform | 33 | 0 |
| events | 49 | 0 |
| tabs | 9 | 0 |
| notices | 4 | 0 |
| events-scroll | 26 | 0 |
| final | 18 | 0 |
| studio | 87 of 89, then **89** on its own after the fix below | 2, then 0 |
| launch | 58 | 0 |
| upsc | 98 | 0 |
| library | 112 | 0 |
| concepts | 54 | 0 |
| flagship | 50 (axe included) | 0 |
| book | 55 (axe included) | 0 |
| landing | 42 (new; axe included) | 0 |

**What failed on the way, and what was done**
- **flagship (axe)**, in an earlier partial run: the "Sister platform" label on The Business Brief's card was 0.78
  opacity and below AA contrast. Fixed (`0611195`); flagship then passed in full.
- **studio**, in the full run, two checks of what the host serves:
  - the diagram agent's temporary worktree sat inside the project folder, so the walk found its copies of every page.
    It is local, never committed, and was removed.
  - the three new landing pages are pages the check did not know. Its allow-list now names exactly those three
    (`50484a5`); any other page still fails it. Run again on its own: 89 of 89.
- No other check was changed except to follow the brief's new wording and order (the opening's last line, the ecosystem
  lines, taglines and order, the pathway lines, the home order, the preview pages, the header order); each says exactly
  what the new design does and none was loosened. Built-in self-tests grew from 2,255 to 2,419.

**Also checked by eye** (screenshots at 1440, 1280 and 390 px): the ecosystem cards, the footer, the UPSC entry
points, a Real World case's glance card, and four of the new diagram plates (money market, monopolistic competition in
the long run, J-curve, natural monopoly). One small blemish: on the natural-monopoly plate the MR line crosses the end
of the "Abnormal profit" label.

**Privacy and copyright**: no PDF of the book or companion is tracked (the ten PDFs are the public "Economics in 60
Seconds" carousels already on `main`); the preview is 22 WebP images, 2.4 MB; no key or token is in the diff; no price,
publisher or ISBN is stated anywhere; the structured data names no employer.

## 10. Remaining limitations

- **The companion's PDF, the rest of the book and the September release package were not supplied**, so the
  companion has no preview and every book preview page comes from Part 1.
- **Nothing on `vercel.app` could be opened from here**: the live site, this preview, both sister platforms and the
  companion's library. Please open each once on the preview.
- **Political Studies** has no logo or preview on its card; send its brand assets (or make its repository readable)
  and they can be added in the same way as The Business Brief's.
- **Real World citations**: the official source sites are unreachable from here, so no new case-level citation could
  be verified and none was added. Each case says so in its glance card and keeps its existing status (historical,
  current, illustrative or needs review). Stakeholders and arguments for and against exist for the 12 deep cards
  only; nothing was written for the other 191.
- **The diagrams** are not yet in *Predict a diagram* (its text promises six) and have no *Go deeper* notes (those cite
  studies, which could not be verified here).
- **Price, publisher and ISBN** are not on the site, as they are not confirmed.
- **Five UPSC syllabus lines** stay marked "to be confirmed", as on `main`.

## 11. Files

Created: `src/modules/53-diagrams.js`, `src/modules/54-definitive.js`, `src/modules/51-book-chapters.js`,
`src/styles/css-definitive.css`, `tools/migrations/2026-11-26-definitive-identity.py`,
`tools/migrations/2026-11-26-definitive-metadata.py`, `tools/seo/build_landing.py`, `ib-economics/index.html`,
`upsc-economics/index.html`, `the-indian-economy/index.html`, `tests/landing.mjs`, `assets/ecosystem/` (two WebP previews,
The Business Brief's mark), `assets/book/the-indian-economy/page-vii*.webp` and `page-2*.webp`, this report.

Edited: `index.html` (built and migrated), `src/modules/07-cover.js`, `08-about.js`, `44-flagship-core.js`,
`47-shell.js`, `48-home.js`, `49-flagship-tests.js`, `51-book.js`, `51-book-data.js` (generated),
`tools/book/preview-pages.json`, `tools/build/splice.py` (one stylesheet), `sitemap.xml`, `README.md`,
`tests/book.mjs`, `tests/intro.mjs`, `tests/studio.mjs`, `tests/run-all.mjs`.

Removed: `assets/book/the-indian-economy/page-xxv*.webp` and `page-40*.webp` (no longer chosen). Moved: the previous
report to `docs/releases/2026-11-20-final-flagship-report.md`.

Since `main` (`aa8c506`), with the final flagship release in the same pull request: 70 files changed, +6,670 / −493.

## 12. Commits, branch, preview, merge

- Branch: `claude/upbeat-hawking-69d7gz`, from `main` at `aa8c506`.
- This release's commits: `f2e0502` (identity, home sequence, author, chapter explorer), `1fda8a9` (UPSC entry points,
  case glance, search labels, structured data, landing pages), `b8c7e14` (README), `0611195` (contrast fix),
  `e4e9320` (archive), `ae558ac` (the fifteen diagrams), `50484a5` (studio check), and the commit of this report.
- Pull request: [#15](https://github.com/ArjunAgrawal101/ib-economics/pull/15).
- Vercel preview: https://ib-economics-git-claude-upbeat-hawking-69d7gz-arjun-98c6.vercel.app (built by Vercel for
  this branch; it could not be opened from here).
- **Not merged. `main`, and therefore the production site, is unchanged.**
