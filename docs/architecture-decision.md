# Architecture decision: a staged hybrid, not a rewrite

**Decided:** 1 October 2026 · **Status:** adopted; Stage 1 is done in this release.

This document records how the platform should grow, and why. The site is to become a much larger
Economics learning environment: data, simulations, a knowledge graph, assessment and teacher tools.

---

## 1. What was measured

| Item | Measured |
|---|---|
| `index.html` | about 5.05 MB. Inline JavaScript 4.72 MB, CSS 292 KB, base64 assets 526 KB (186 KB of them a JSON block of carousel covers). |
| Data files beside it | `course.js` 1.52 MB, `real-world.js` 276 KB, `exam-dna.js` 83 KB, plus two new lazy files: `econ-data.js` 229 KB and `ideas.js` 165 KB |
| Structure | 32 sections and over 180 tabs, one hash router (`#/section/tab/arg`), one global state object `S` kept in `localStorage`, and a render function per view that returns HTML strings |
| Self-test | about 2,040 in-page checks, run at start-up. They take about 2.4 s of a 3.7 s `DOMContentLoaded` on the test machine (measured 29 September). The five-second opening covers this time. |
| Browser harness | 13 Playwright suites in `tests/` |
| Deployment | A GitHub Pages workflow (`pages.yml`) publishes the repository as it is: no build step. One Vercel-style serverless function (`api/youtube.js`) keeps the YouTube key on the server. |
| Source | **Before this release, the module sources and their build script were not in the repository**, only their output inside `index.html`. This was the most serious maintainability risk found. |

## 2. The options

The options are scored against the criteria in the brief. In the table, ✓ means good, ~ adequate
and ✗ poor.

| Criterion | A · refactor in place | B · separate files, no framework | C · migrate to a framework | D · staged hybrid (B now, C-style pieces only where they pay) |
|---|---|---|---|---|
| Migration risk | ✓ | ✓ | ✗: 4.7 MB of working, tested behaviour to re-implement | ✓ |
| Maintainability | ~ | ✓ | ✓ | ✓ |
| Performance | ~ | ✓: lazy data files | ✓ with care | ✓ |
| Works offline and from a file | ✓ | ✓ with the service worker | ~ | ✓ |
| Static hosting and Vercel | ✓ | ✓ | ✓ | ✓ |
| Large content sets | ✗ | ✓: data in versioned files | ✓ | ✓ |
| Testing | ✓: 2,000 self-tests stay valid | ✓ | ✗: the tests are tied to the current render functions | ✓ |
| Search (SEO) | ✗: hash routes | ~ | ✓: server rendering | ✓: pre-rendered pages as a later stage |
| Future accounts, AI, sync | ~ | ~ | ✓ | ✓: behind a server function, as YouTube already is |
| Development speed now | ✓ | ✓ | ✗ | ✓ |

**Decision: D, a staged hybrid.** A framework migration would re-implement a large, tested,
working product for no learner benefit this year, and would invalidate the self-test system that
catches its errors. The real problems are narrower:

- **source outside the repository:** fixed now;
- **content inside the HTML:** being moved out, file by file;
- **every byte loading at start:** new features load on demand;
- **hash routes being invisible to search engines:** a pre-render stage, below.

Each of these has a targeted fix that keeps the platform working at every step.

## 3. Stage 1, done in this release

- **Source in the repository.**
  - `src/modules/*.js` (28 modules) and `src/styles/*.css`, spliced by `tools/build/splice.py`. The
    output was checked byte-identical to the shipped file.
  - Content sources in `src/content/`, with their builders in `tools/build/`.
  - Base-file edits as re-runnable scripts in `tools/migrations/`.
- **Content as data, loaded on demand.**
  - The data lab and the economists and causal pathways ship as separate, versioned, hashed data
    files.
  - A start-up guard stops the self-test sweep from fetching them. A browser test confirms that
    neither file is requested until a page needs it.
  - Each page shows useful text before its file arrives, and an error and a retry if it fails.
- **A resident index.** Lists, search and self-tests use a small index compiled into the page
  (8.7 KB for 27 records). So search finds an economist without downloading 165 KB of profiles.
- **One place for the navigation's order,** now eight primary items. A grouped More menu is built
  from one literal list and appends anything unlisted, so a section cannot become unreachable.

## 4. The next stages

Each stage leaves the platform working.

1. **Move the remaining inline content out of the base file**, in this order:
   - the carousel covers (186 KB, needed only on their page);
   - the diagram library's prose;
   - the question bank.

   Each becomes a versioned data file loaded on demand, with a resident index where search needs
   one.
2. **Split the base script into modules** along its existing "PART" boundaries. Keep the splice, so
   the shipped file and the offline guarantee are unchanged. Do it one part per change, each checked
   by the full harness.
3. **Make the start-up self-test cheaper:**
   - run the structural checks at start;
   - move the content sweeps (which render every tab) to idle time, or to `?selftest=1` and the
     harness.

   This is the largest single gain in time-to-interactive (about 2.4 s on the test machine). The
   opening sequence was designed around it, so the change needs its own measured release.
4. **Pre-render for search.**
   - A build step writes static HTML pages for each lesson, economist, case and data page, at
     crawlable paths with a canonical URL each, plus a sitemap.
   - Each page boots the same app.

   This needs the production domain, which the repository does not record.
5. **Server functions for what must not be client-side:** an AI tutor or cloud sync. Use the same
   pattern as `api/youtube.js`: keys in the host's environment, never in the page.

## 5. Risks and how they are held

| Risk | Control |
|---|---|
| A module edit drifts from the shipped file | `splice.py` is idempotent and the harness runs on its output. Commit both together. |
| A data file is missing or stale | Each file carries its version, hash and retrieval date. Pages say when data are missing. The service worker precaches the files after first use. |
| A section becomes unreachable | Self-tests check the More menu and the drawer against every registered section. |
| A lazily loaded feature breaks silently | `tests/transform.mjs` opens every new surface, simulates a failed download and checks deep links, refresh and Back/Forward. |
