# Release report: one Economics ecosystem, two learning pathways

Branch `claude/upsc-cse-economics`. Its pull request, [ArjunAgrawal101/ib-economics#11](https://github.com/ArjunAgrawal101/ib-economics/pull/11), was merged into `main` (2d238cd) at its earlier head 5f7b64f, before the commits below were pushed; see **Pull request** under Remaining limitations. This release builds on the UPSC CSE Economics section described in `docs/releases/2026-11-16-upsc-second-pathway-report.md`, which is part of the same pull request. Brand: **ARJUN AGRAWAL | ECONOMICS**.

## Architecture

- **Home (`#/`)** is now the ecosystem of both pathways (`src/modules/44-ecosystem.js`, `src/styles/css-eco.css`).
- **IB DP Economics (`#/ib`)** is a new landing page. It carries the IB front page that used to be the home page, every band unchanged, under its own masthead, journey and finder. Self-tests and browser tests that read the IB front page now read it at `#/ib`.
- **Shared concepts (`#/concepts`)** is a new section with two readings per concept (`src/modules/45-concepts.js`).
- **The main navigation** is built at start-up into `header.top`. The IB section bar (`#mainnav`) is still painted, so its order, its More menu and its self-tests are unchanged, but it is not shown. Every IB section is reached through the IB menu, "Every IB section and tool" (the full list), the IB landing page, the drawer and search.
- **The base page** is changed only by idempotent migrations:
  - `tools/migrations/2026-11-17-ecosystem-intro.py`: the opening, its timeline and its self-tests;
  - `…-ecosystem-navigation.py`: the brand, the drawer and the brand self-tests;
  - `…-ecosystem-selftests.py`: the front-page self-tests now read `#/ib`;
  - `…-ecosystem-footer.py`: the footer's motto, paragraph and first column.
  - Each was run twice, and the second run applied nothing. The intro migration reproduces the built page byte for byte from the previous base.

## Redesigned sections

1. **The five-second opening.** The same clock and engine (Web Animations scheduled from the first presented frame, re-anchored to Paint Timing in a still passage; opacity and transform only).

   | Time | Stage |
   |---|---|
   | 0–1.0 s | a dark field of coordinates, data points and lines; the Arjun Agrawal identity emerges from the brand vectors |
   | 1.0–2.0 s | the identity settles to the top; axes, supply and demand appear, demand shifts and the equilibrium moves along supply; a trade network behind |
   | 2.0–3.25 s | the field divides: IB DP Economics (global perspectives, international evidence) in burgundy with a globe, and UPSC CSE Economics (the Indian economy, policy, institutions) in forest green with a kolam dot grid |
   | 3.15–4.25 s | "One discipline. Two pathways.", then both names (3.70–3.95 s is still) |
   | 4.3–5.0 s | the two halves open onto the page underneath |

   - **When it plays.** On every full-page load of any address, and never on navigation inside the app. No storage is read or written.
   - **Skip** is a real button. Reduced motion shows one still frame for 1.5 s.
   - **On phones**, the pathways stack and the halves open top and bottom.
2. **The main navigation.** Home | IB DP Economics | UPSC CSE Economics | Learning Tools | About Arjun | The Business Brief ↗.
   - **The menus.** The three menus are mega menus that open by pointer, click or keyboard: ArrowDown moves into the panel, and Escape returns to its button.
     - **IB:** LEARN, VISUALISE, APPLY, PRACTISE, ADVANCE.
     - **UPSC:** START HERE, LEARN, HANDBOOK LIBRARY, PREPARE, COACHING.
     - **Learning Tools:** the calculator, timer and search, plus the model and study tools.
   - **Fitting the bar.** The bar is measured: the timer and calculator fold into Learning Tools first, then SL/HL, and only then does the bar become the drawer. The full bar fits from 1181 px to 1920 px.
   - **The pathway strip** above the header is the pathway switcher.
   - **The phone drawer** opens with the two pathways and shared concepts, keeps every group it had, and ends with The Business Brief.
3. **The home page**, seven sections:
   1. The hero ("Economics is not just a subject to study. It is a way to understand the world.", the briefed supporting line) and two large pathway panels:
      - IB DP Economics, burgundy, with EXPLORE IB DP ECONOMICS;
      - UPSC CSE Economics, forest green, with EXPLORE UPSC ECONOMICS.
   2. The knowledge ecosystem: an interactive map of eight fields (Microeconomics, Macroeconomics, International, Development, Public finance, Indian economy, Economic policy, Global issues). Each field says where it is taught for the IB and where it appears for UPSC, and only where it really does.
   3. The learning experience: six screenshots of the platform itself (`assets/home/*.webp`), each opening the page it shows.
   4. Selected original work, each shown in part: the Indian Economy Collection, the diagram atlas, mindmaps and real-world cases, with counts computed from the platform's data.
   5. The Business Brief: "Beyond Economics. Explore Business Management." It is an editorial aside, not a third pathway, and opens in a new tab.
   6. The educator: the supplied portrait, with text from the supplied profile only, and MEET ARJUN AGRAWAL.
   7. "Where would you like to begin?"
4. **The IB landing page (`#/ib`).**
   - The heading IB DP Economics.
   - The SL/HL switch (the platform's own level) and a link to the SL vs HL differences.
   - Counts of subtopics, diagrams, cases and mindmaps.
   - The journey UNDERSTAND → VISUALISE → APPLY → PRACTISE → EVALUATE, each stage opening real pages.
   - A finder that filters 35 IB destinations by stage, kind and name.
   - Then the whole IB front page. No IB endorsement is claimed.
5. **The UPSC landing page.**
   - "Understand the Indian Economy. Prepare with clarity.", the briefed supporting text, and the three calls: Explore the Handbook Library, Explore the UPSC Syllabus, Discover the Intensive Course.
   - An interactive seven-stage roadmap: the syllabus, foundations, the Indian economy, current affairs, Prelims practice, Mains answer writing, revision.
   - The syllabus explorer gains a third tab, "The Optional (Papers VI and VII)". It names and places the Economics Optional and says plainly that this section does not cover it.
6. **THE INDIAN ECONOMY COLLECTION** ("Eleven carefully structured volumes covering essential dimensions of Indian and international Economics for UPSC CSE preparation.").
   - Filters by six categories and by volume.
   - **Cards:** the cover with an inside page, volume number, exact title, category, verified page count, parts, topics, Prelims and Mains links, "₹99 per soft copy", Preview 8 pages, View volume and Enquire.
   - **A volume's page:** on the left, the cover, the facts, ₹99 and the enquiry by WhatsApp, email or telephone; on the right, the overview, the eight-page preview, what students learn, the parts, the concepts and institutions, the syllabus relevance and map, and how the volume is built.
   - **Purchase** is stated everywhere as completed by direct contact; nothing is charged on the site.
7. **Shared concepts.**
   - **What they are:** eleven concepts, each with an IB DP reading and a UPSC CSE reading at its own address.
   - **Both readings** share the idea and the platform's glossary definitions.
   - **The IB reading** keeps to the unit, the diagram, the platform's tools and two Paper 1-style prompts.
   - **The UPSC reading** keeps to:
     - the Indian application;
     - data and policy;
     - the Prelims and Mains perspectives;
     - an MCQ;
     - a GS III-style question;
     - the volumes and parts.
   - **Practice prompts** are original and labelled; none is presented as a past paper.
8. **The footer.**
   - It opens with **Explore the academic ecosystem** (IB DP Economics, UPSC CSE Economics, and IB DP Business Management at The Business Brief), with the verified contacts.
   - The motto reads "One discipline. Two pathways.", and the brand paragraph and first column name both pathways.
   - The UPSC block lists the collection, current affairs and enrolment.
9. **Palette and motion.**
   - The UPSC tokens are re-themed from navy to forest green and antique gold.
   - Sections and cards rise in with the platform's existing reveal, with a short stagger.
   - The hero figure drifts with the scroll where supported.
   - None of this moves under reduced motion.

## The handbook previews

`tools/upsc/build_upsc.py --src <private folder>` rebuilt every image from the eleven PDFs. Each title and page count was checked against its PDF, and none of the PDFs entered the repository.

- **Nothing drawn over the pages.** The previous release's watermark step was removed. Pages are rendered exactly as the PDF prints them, so each keeps its own running header ("Arjun Agrawal Knowledge Series | Economics Collection"), its faint centre logo and its footer copyright line ("© Arjun Agrawal. All rights reserved…").
- **Size.** Each page is 1100 × 1555 px (an A4 page at about 133 dpi) as WebP, with a 220 px thumbnail.
- **Count.** That makes 88 pages and 88 thumbnails, plus 22 covers (13 MB in all).
- **Choice of pages.** For each volume: the contents and syllabus map (page 2), the opening of Part A (3–5), and two spreads named in the catalogue.

| Vol. | Title | Category | Pages | Preview pages | Size | Preview total |
|---|---|---|---|---|---|---|
| I | Introduction to Economics | Foundations of Economics | 41 | 2, 3, 4, 5, 12, 13, 34, 35 | 1100×1555 | 921 KB |
| II | Money & Monetary Policy | Money, Prices and Monetary Policy | 43 | 2, 3, 4, 5, 23, 24, 36, 37 | 1100×1555 | 1057 KB |
| III | Inflation and Price Stability | Money, Prices and Monetary Policy | 49 | 2, 3, 4, 5, 18, 19, 40, 41 | 1100×1555 | 844 KB |
| IV | Taxation and Public Revenue | Public Finance | 49 | 2, 3, 4, 5, 23, 24, 40, 41 | 1100×1555 | 987 KB |
| V | Fiscal Policy and Budget Management | Public Finance | 49 | 2, 3, 4, 5, 25, 26, 41, 42 | 1100×1555 | 1010 KB |
| VI | Banking and Financial Institutions | Banking and Financial Markets | 50 | 2, 3, 4, 5, 15, 16, 42, 43 | 1100×1555 | 1044 KB |
| VII | Financial Markets and Instruments | Banking and Financial Markets | 49 | 2, 3, 4, 5, 12, 13, 35, 36 | 1100×1555 | 1007 KB |
| VIII | Balance of Payments and International Trade | External Sector and Global Institutions | 55 | 2, 3, 4, 5, 6, 41, 42, 43 | 1100×1555 | 1035 KB |
| IX | Global Economic Institutions and Trade Architecture | External Sector and Global Institutions | 43 | 2, 3, 4, 5, 14, 15, 33, 34 | 1100×1555 | 1023 KB |
| X | Indian Agriculture and Allied Sectors | Agriculture, Industry and Labour | 45 | 2, 3, 4, 5, 21, 22, 36, 37 | 1100×1555 | 991 KB |
| XI | Indian Industry, Manufacturing, Trade and Labour Markets | Agriculture, Industry and Labour | 50 | 2, 3, 4, 5, 25, 26, 42, 43 | 1100×1555 | 1059 KB |

All eleven volumes have eight readable pages, so there is no exception to report. Volume VIII's sample page 5 is already in the front matter, so its eighth page is page 43.

**The viewer** offers:
- previous and next;
- the preview number and the volume's page number;
- zoom at 100, 150 and 200 %;
- full screen (the element's own full screen, or a fixed layer where the browser has none);
- eight thumbnails;
- arrow keys, +/− and F, and swipe on touch screens;
- thumbnail-first progressive loading, with the next and previous pages fetched ahead.

It states "Selected preview. 8 of the N pages, shown as the PDF prints them." It makes no claim that the images cannot be copied or screenshotted. There is no DRM.

## The Business Brief

The Business Brief is linked in three places, each with `target="_blank"` and `rel="noopener noreferrer"`:
- the main navigation ("The Business Brief ↗");
- the home page's editorial panel ("Beyond Economics. Explore Business Management." / "Discover The Business Brief, an interactive learning platform for IB DP Business Management." / EXPLORE THE BUSINESS BRIEF);
- the footer's "Explore the academic ecosystem" (IB DP Business Management).

It is also in the phone drawer. Its site and repository could not be reached from here (see Limitations), so the panel is typographic, with no screenshots of it.

## Tests

Every suite was run in sequence in headless Chromium (Playwright 1.63) against the final committed build, **a36759e**, with a clean working tree: **22 suites, 721 checks, 0 failures.**

| Suite | Result | Checks | Time |
|---|---|---|---|
| api-youtube | passed | 21 | 2 s |
| selftest | passed | 37 (the built-in start-up self-tests all pass) | 5 s |
| e2e | passed | 22 | 30 s |
| ecosystem | passed | 30 | 104 s |
| renaissance | passed | 25 | 18 s |
| cover | passed | 35 | 29 s |
| pwa | passed | 4 | 7 s |
| widths | passed | 15 | 1158 s |
| overlap | passed | 7 (540 route-widths, 320 to 2560 px; no overlap, collision or clipped label) | 537 s |
| routes | passed | 2 (220 routes opened cold at 375 and 1366 px) | 597 s |
| intro | passed | 59 | 120 s |
| course | passed | 39 | 10 s |
| transform | passed | 33 | 34 s |
| events | passed | 49 | 36 s |
| tabs | passed | 9 | 16 s |
| notices | passed | 4 | 9 s |
| events-scroll | passed | 26 | 90 s |
| final | passed | 18 | 8 s |
| studio | passed | 89 | 45 s |
| launch | passed | 54 | 76 s |
| upsc | passed | 90 | 81 s |
| pathways (new) | passed | 53 | 72 s |

**What the earlier full run found, and what was fixed.** An earlier full run, on 0ce5623, passed 20 of 22 suites.
- **routes** failed one check. On `#/lab/link-audit`, opened cold at 1366 px, the layout audit still counted only the IB bar's buttons as the navigation. It now counts the main navigation as well (d209673, through the navigation migration).
- **overlap** was stopped at the runner's 40-minute limit without output. Run on its own on the same build, it finished in 538 s, the same as the previous release, and each of the fifteen widths runs in about 40 s. The stall did not recur, and its cause was not found in the suite or the page.
- That run found one real defect, fixed in a36759e: the home hero figure's "ONE DISCIPLINE" label was clipped at the right edge of its figure.

**How the tests changed.** No test was skipped, disabled or loosened to pass.
- **Front-page checks** that read the IB front page now read it at `#/ib`, where it lives.
- **Header checks** use the main navigation, since the IB bar is folded away.
- **The upsc suite** now checks:
  - the 198 preview files and the absence of a watermark step;
  - the filters;
  - the viewer's keys, thumbnails, zoom and full screen;
  - the briefed collection title and subtitle.
- **The intro suite** now expects the opening on every full-page load of any address, as the brief requires.

## Commits

| Commit | What |
|---|---|
| 7596320 | Part 1: the intro, the ecosystem home page, the IB landing page, the main navigation, shared concepts |
| 97ecb9f | Part 2: the Indian Economy Collection with clean eight-page previews, the forest-green palette, the UPSC roadmap and the Optional |
| 0ce5623 | Part 3: tests for the new architecture, the assignment banner, accessibility fixes, docs |
| 9fee35d | This report (draft); the UPSC report archived |
| d209673 | The layout audit counts the main navigation |
| a36759e | The hero figure's label inside its figure |

## Remaining limitations

- **Pull request.**
  - **What happened to #11.** PR #11 was merged into `main` (2d238cd, 17 November 2026, 07:44 +05:30) at its head 5f7b64f, the previous release. The commits above were pushed to the same branch afterwards, so they are not in PR #11 and not in `main`.
  - **What `main` now holds.** `main` also contains PR #12 (186e8d4, from `claude/sleepy-pascal-rlzusx`), a separate implementation of much of this same brief: a shared home page with the IB landing page at `#/ib`, a clean preview pipeline and viewer for the handbooks, shared concepts and a two-pathway opening. Its opening plays once a session (it records that in `sessionStorage`), where this branch plays it on every full-page load, as the brief requires.
  - **Conflicts.** A trial merge of `main` into this branch conflicts in 33 files, among them `index.html`, `src/modules/43-upsc.js`, the handbook catalogue, the build script, the preview images and most test files.
  - **No new pull request was opened.** The choice between the two implementations, or how to combine them, is the owner's.
- **The Business Brief.** Its site (the-business-brief-dun.vercel.app) and its repository could not be reached from this environment. The home page's panel is therefore typographic, with no screenshots of it, and nothing about its design was copied.
- **Vercel.** No deployment or preview could be reached from here, so nothing about production is claimed.
- **Browsers.** Only headless Chromium was used, not Safari, Firefox or physical devices.
- **The opening's margin.** The platform is ready about 3.4 to 3.7 s after the first frame on this machine, and the reveal is due at 4.3 s. On a much slower device the reveal starts late and is quicker, but still ends at 5.0 s. If fewer than 120 ms remain, it ends late and the record says so.
- **For the owner to confirm**, unchanged from the previous report:
  - the qualifications shown on About the Educator, taken from the handbooks' title pages;
  - the page counts of the volumes supplied as Word files;
  - the syllabus lines, against the 2026 notice PDF.
