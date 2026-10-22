# Release report: final production polish

Branch `claude/upbeat-hawking-69d7gz`, 3 October 2026. The previous report is in
`docs/releases/2026-10-02-audit-events-pathways-report.md`. Nothing here has been merged to `main`.

## 1. What was audited

**Repository state**
- `main` and the working branch.
- Recent commits. PR ArjunAgrawal101/ib-economics#8 had been merged, and the branch was fast-forwarded to it.

**Architecture**
- The route system.
- The page shell and its scrolling model.
- The design tokens.
- The service worker cache.

**Implementations**
- Economists.
- Economic events.
- Tutorials.
- Economics data.
- The opening sequence.

**Tests and documents**
- Every suite in `tests/`.
- The README and the release reports.

Each finding below was reproduced in a browser before it was fixed.

## 2. What was broken

**Economic events would not scroll.** On the India 1991 page the mouse wheel stopped at about 900 px on a desktop. On a phone the page bounced between 777 and 1,377 px. The cause was the chapter rail's observer, which called `scrollIntoView` on the current rail link. The rail is sticky, so asking the browser to reveal it scrolled the window back to the rail's original position each time a chapter came into view.

**No sticky element on the site ever stuck.** This affected the top bar, the section tabs, the lesson rails and the events rail. Since the first upload, `body` carried `overflow-x:hidden`. With `html` clipping sideways overflow, that made `body` a scroll container that never scrolls.

**Content cut off on phones.**
- On event pages at phone width, the chapter column was 1,170 px wide. The mobile grid used `1fr`, which cannot shrink below the timeline's width. The page-wide sideways clip hid the overflow, so the widths audit, which measured only page scroll width, never saw it.
- Economist school labels could also overflow at narrow widths.

**Tutorial terms were out of date.** The site said "US$20 per 90-minute session" with group discounts, in six places.

## 3. What was fixed

**Events scrolling.** The rail now scrolls its own list sideways and never touches the window.

**Sticky elements.** `body` now uses `overflow-x:clip`, which still prevents sideways scrolling without creating a scroll container.

**Phone layout.**
- The mobile event grid uses `minmax(0,1fr)`.
- Economist school labels wrap.

**Audit coverage.** The widths audit now fails on any content cut off at the right edge, and a sweep of every route at 375 px finds none.

**Tutorial terms.** Updated everywhere they appear (§8).

## 4. Homepage changes

The behaviour is unchanged:
- the same clock;
- the same stages (monogram 0.7 s, name 1.4 s, IB DP Economics 2.2 s, tagline 3.1 s, verbs 4.0 s);
- the same state model;
- the same five seconds.

The background now tells a short economic story. Its layers are animated only by opacity and transform:

| Time | Layer |
|---|---|
| 0.1–0.9 s | the axes rule themselves in from their origins |
| 0.9–1.9 s | a data series appears beneath the monogram |
| 1.3–3.4 s | supply and demand and a frontier (micro), in focus 2.2–3.5 s |
| 3.0–4.7 s | a growth path with its cycle (macro) |
| 3.4–4.7 s | a faint network of trade (global) |

With reduced motion, the reader sees a single still frame of the axes, the market and the data.

**Measured on a quiet machine** (`tests/intro.mjs`):
- The overlay leaves 5,004–5,045 ms after the start at 360–1920 px.
- Reload: full sequence.
- Hard reload with the cache disabled: full sequence.
- Direct `#/home`: full sequence.
- Back from another site: 5,015 ms.
- Forward from another site: 5,013 ms.
- Deep links skip the sequence.

**The opening's 4.7 s margin.** In this test container, app-ready occasionally comes later than 4.7 s on `main` as well as here. Over 16 runs at 768 px it ranged 3,822–4,751 ms on `main` and 3,841–4,599 ms on this branch. When that happens the opening holds its last frame rather than uncovering an unready page, as designed.

**Startup is unaffected.** App-ready takes 3.75–3.91 s on this branch and 3.65–3.83 s on `main`.

## 5. Economist changes

All the written profile content is preserved. A new editorial layer (`src/modules/36-economists.js`, `src/content/ideas/economists-v2.json`) adds:

- **An interactive timeline.** Economists are placed by school of thought at the year of their major work, with the twelve economic events marked above. Hover, keyboard focus or a tap shows a preview and draws "built on" and "challenged" lines. On phones it becomes a dated list.
- **Editorial profiles.** Each opens with the central question, core idea, key contribution, major work and an idea chain labelled as interpretation. The existing text follows, regrouped. The side panel adds related events, plus Cambridge, university and Indian-economy connections (the India connection appears only where a genuine one exists).
- **An influence map** across ten traditions, with every relation also listed in text.
- **Neutral comparisons:**
  - Keynes and Hayek
  - Friedman and Keynes
  - Smith and Marx
  - Pigou and Coase
  - the capability approach against income measures

**Accuracy review.** A separate reviewer checked the new layer and made 22 corrections, applied at build time from `rt-v2.json`. Examples:
- Coase's argument is about transaction costs, not low ones assumed away.
- The Hayek–Keynes exchange of 1931–32 concerned the *Treatise on Money*, not the *General Theory*.
- Ricardo's chain no longer implies that comparative advantage came before his opposition to the Corn Laws.

## 6. Economic events fix

**The root cause and fix** are in §2–3.

**Each event now opens with its story in seven stages:**
1. Before
2. Trigger
3. Transmission
4. Crisis
5. Policy response
6. Consequences
7. Long-term change

Each stage is drawn from the event's own text and links into its chapter. The mechanism stays behind its prediction gate.

**Navigation.** The chapter rail stays below the section tabs, marks the current chapter and carries a passive reading-progress bar.

**Testing** (`tests/events-scroll.mjs`). The full page is traversed at 1366 and 390 px:
- by wheel, Page Down, End and Home, and by touch;
- after a prediction, a refresh, Back/Forward, a cold deep link and a return from another route;
- through all twelve events.

## 7. Tutorial page changes

The page (`src/modules/35-tutorials.js`) is rebuilt as a narrative:
- the hero, with the US$20 one-hour session and a clear call to action;
- why students get in touch;
- how I teach;
- what an hour looks like;
- the five pathways, each covering what it is, who it is for, what you do, sessions, length, fee and what to expect;
- which pathway fits;
- how to get started;
- eleven questions in native disclosures;
- a closing call to action.

**Enquiries** use only the existing channels: email (one prefilled message per pathway) and WhatsApp. No booking system is implied.

**What the page does not do:**
- It contains no testimonials, ratings, outcomes, guarantees or urgency.
- It does not offer ghostwriting. IA and EE support are stated as guidance.

## 8. Exact pricing implemented

| Pathway | Fee | Sessions | Length |
|---|---|---|---|
| Regular sessions (any topic) | US$20 | 1 | 1 hour |
| IA support (three commentaries) | US$100 | 6 | 1 hour each |
| Economics EE supervisor support | US$150 | agreed at enquiry | not stated |
| Marathon Revision (entire syllabus) | US$300 | 20 | 1 hour each |
| Exam Practice (Papers 1, 2 and 3, questions only) | US$200 | 12 | 1 hour each |

- **Wording removed:** the 90-minute wording and the group-discount line, wherever they appeared (home band, contact card and drawer, QA text and self-tests).
- **Where prices are pinned:** a self-test and `tests/final.mjs` pin every price, count and length, and check that no other price appears.

## 9. Data page changes

The interaction model is unchanged. Directly below the chart, a strip shows what, where, when, unit and source. It sits below rather than above so the chart stays above the fold.

Beneath it:
- why the indicator matters;
- the largest one-year change in the selection;
- what might explain a movement, offered as possibilities to test;
- what to be careful about, including that lines moving together do not show causation.

Direct line labels no longer cut to an ambiguous first word: "United States" reads "US", not "United".

## 10. Visual improvements

- **Sticky navigation** now works across the site.
- **Event story spine** and reading progress.
- **Economists:** school colours, idea-chain graphics and the influence map.
- **Tutorials:** pricing hierarchy, with Regular sessions as a full-width row above four package cards.
- **Data:** the meta strip and the reading grid.
- **The opening's** layered background.

## 11. Performance changes

**Page size.**
- `index.html`: 5.28 MB, up 76 KB (1.3% gzipped, 1.77 → 1.80 MB).
- `assets/data/ideas.js`: up 35 KB. It is lazy-loaded, so this does not affect startup.

**Behaviour.**
- App-ready time is unchanged against `main` (§4).
- The events rail's progress bar uses a passive, frame-throttled scroll listener.
- The service worker cache is version v17, so returning visitors receive the new content.

## 12. Accessibility changes

- **axe** reports no WCAG 2.0 A, AA or 2.1 AA violations on Tutorials, the economists list, a profile, the influence map, the comparisons, an event, the data explorer and Exam DNA, at 1366 and 375 px.
- **Timeline nodes** are focusable links that preview on focus.
- **The FAQ** uses native disclosures.
- **The pathways table** scrolls from the keyboard.
- **Reduced motion** is respected in the opening and the timeline.

## 13. Responsive testing

- **The widths audit** covers 55 routes at 15 widths (320–2560 px). It checks overflow, clipped content, page errors, touch targets and reachable scrolling tables.
- **A clipped-content sweep** of every route at 375 px found nothing cut off.
- **Screenshots** were reviewed at 1366 and 390 px for every changed page.

## 14. Regression testing

The complete suite (`node tests/run-all.mjs`) has 19 suites, including the new `events-scroll` and `final`. The built-in self-test runs 2,076 checks.

**Final complete run: 18 of 19 suites pass, with 430 browser checks passing.** The suites that pass:
- api-youtube, selftest, e2e, ecosystem, renaissance, cover, pwa;
- widths, overlap, routes;
- course, transform, events, tabs, notices, events-scroll, final.

**The intro suite fails its strictest timing checks intermittently in this container:**
- One complete run had the sequence finish "late" at 360 px, and an overlay removal of 56.7 ms at 1440 px.
- On its single re-run, every width and every load type passed except one removal at 1920 px, at 57.6 ms against a 50 ms allowance.
- In every run the exit fade reached full transparency at exactly start + 5000 ms, so this is the removal of an already invisible node waiting for a free frame.

**This was present before this release.** The same 1920 px check failed (52.6 ms) on the previous release's code earlier in this session. App-ready times at 768 px overlap between `main` and this branch (§4).

## 15. Files changed

- **Modules:**
  - `src/modules/24-datalab.js`
  - `25-ideas-index.js` (generated)
  - `30-events.js`
  - `31-wire-events.js`
  - `35-tutorials.js` (new)
  - `36-economists.js` (new)
- **Styles:** `src/styles/css-t6.css`
- **Content:** `src/content/ideas/economists-v2.json` (new) and `rt-v2.json` (new)
- **Build:** `tools/build/build_ideas.py`
- **Migrations** (applied to the base page):
  - `tools/migrations/2026-10-03-opening-visual.py`
  - `2026-10-03-sticky-shell.py`
  - `2026-10-03-tutorial-terms.py`
- **Built files:** `index.html`, `assets/data/ideas.js` and `service-worker.js`
- **Tests:**
  - `tests/events-scroll.mjs` (new)
  - `final.mjs` (new)
  - `widths.mjs`
  - `run-all.mjs`
  - `README.md`
- **Documents:** `README.md` and this report

## 16–19. Commit, branch, PR, preview

Commit and PR number are given in the PR description and the final message.

**Vercel:**
- `ib-economics-pi.vercel.app` cannot be reached from the build environment (the network policy refuses the host).
- The Vercel Preview has therefore not been verified from here.
- Production has not been changed.

## 20. Remaining known issues

- **The intro suite's strictest checks are environment-sensitive.** In this GPU-less test container they fail intermittently (§14) on `main` as well as here. The sequence itself is invisible from exactly 5,000 ms in every run.

- **The Vercel Preview** must be checked by hand. It could not be reached from the build environment.
- **Firefox** was not available in the test environment. Testing used Chromium, with touch and mobile emulation.
- **Group discounts** are no longer stated, because they are not part of the supplied pricing. Restore the line if you still offer them.

NO KNOWN RELEASE-BLOCKING ISSUES in the code tested here, pending the preview check.
