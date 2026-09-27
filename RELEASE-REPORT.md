# Release report

**Arjun Agrawal · IB DP Economics** · release 2026.09-c, *the Economics ecosystem*

Written on 26 September 2026. Every number here comes from running something, and the report says
what was run. Anything that could not be checked is listed in sections 14 and 15. The previous
reports are kept in [`docs/releases/`](docs/releases/):

- [2026-09-25](docs/releases/2026-09-25-release-report.md): *Economics, Everywhere* and the content audit.
- [2026-09-22](docs/releases/2026-09-22-release-report.md): the live verification of nine IB claims.

---

## 1. What changed

The platform was extended rather than rebuilt. It is still one static `index.html`, with the same
router, storage, service worker, self-test system, and obsidian/burgundy/chalk design. Three new
sections sit alongside what was there:

- **Economics EE Studio** (`#/ees`): 19 areas that take a student from "what is an Economics EE?"
  to a pre-submission check. The studio diagnoses, questions and organises; it never writes the
  essay, the research question or the reflection.
- **Arjun Agrawal · Video studio** (`#/arjun`): fills itself from the YouTube channel through a
  server-side function. No video is written into the page.
- **Educator Studio** (`#/educator`): role-based pathways into the existing teaching material,
  a ten-module handbook and a coordinator page.

The rest of the platform now leads into these sections:

- The home page has a *Start your journey* band and a latest-video band.
- Every concept page has a *Related* panel built from a content graph.
- Search gains *EE research* and *Teaching* filters.
- *My Economics* surfaces EE work in progress.

The IB claims were checked against the two IB documents supplied with this brief (the Economics
guide and TSM, first assessment 2022). **26 corrections** followed. Two latent bugs (shadowed
declarations) were found and fixed.

## 2. New sections and routes

| Route | What it is |
|---|---|
| `#/ees` … `#/ees/resources-and-sources` | Economics EE Studio. There are 19 tabs in 8 groups: Understand, Design, Research, Argue, Write and reflect, Check, Lead, Reference. |
| `#/ees/find-your-topic/<area>` | One of 20 topic areas, as a deep link. |
| `#/ees/theory-and-models/<model>` | One of 24 models, as a deep link. |
| `#/arjun` | The video studio. The nav label is "Videos". |
| `#/educator`, `#/educator/handbook`, `#/educator/for-coordinators` | The Educator Studio. |

The navigation order and the mobile groups were extended; no existing route was removed or renamed.
The existing curated video library (`#/video`) keeps its place, now labelled *Curated videos* so
it is not confused with Arjun's own channel.

## 3. The tools

All state is stored on the device (`localStorage`, inside the existing profile under `S.ees`).
There is no login, and a sandboxed or private window works without saving.

| Tool | What it does | What it deliberately does not do |
|---|---|---|
| Research question lab | Diagnoses a draft question on 12 dimensions: scope, specificity, economic relevance, analytical potential, evidence availability, theoretical grounding, causal clarity, time and place, feasibility, potential for evaluation, risk of description, risk of a generic policy essay. Each dimension gets a rating in words, the reason and a question back. Every diagnosis is kept as a version. The loop is *diagnose → question → refine → test again*. | It does not suggest or rewrite a research question. |
| Topic explorer | Covers 20 areas. Each gives phenomena, possible directions, the data a student would need and common traps. | It does not provide ready-made questions. |
| Theory and models | Covers 24 models. Each gives assumptions, mechanism, variables, what the model explains and cannot explain, when it becomes less useful, a diagram, an application and evaluation questions. Every model links to the existing diagram atlas where one exists. | |
| Data lab | Nine calculations: % change, index numbers, growth and CAGR, real values, moving average, correlation with a scatter plot, simple regression, before and after, and comparing two series. Each result is split into **What the data shows / What it suggests / What it does not establish**, with method warnings (for example, correlation is not causation, and a before/after comparison has no counterfactual). Constructed practice data is labelled as such. | It does not infer causation. |
| Evidence matrix | One row per source, with 13 fields: source, date, author, type, claim, evidence, method, variable, finding, limitation, relevance, direction (supports, challenges, mixed or context only) and reliability. Rows can be edited, searched, filtered by type and direction, and exported to CSV or JSON. It warns when nothing challenges the argument. | |
| Argument map | Nine node types, from research question through claim, theory, evidence, analysis, counter-evidence, alternative explanation and evaluation to conclusion. Nodes can be added, edited and reordered, and each type carries a prompt. | |
| Diagram and model studio | Planning notes for each diagram, plus the check *Does this diagram actually help answer my research question?* | |
| Evaluation lab | Hypothetical sentences to classify, and critical-dimension prompts. | |
| EE red team | Ten challenges to put to one's own essay. | |
| Reflection studio | Eight prompts. Each has four steps: *prompt → the student's own response → self-diagnosis → improvement prompts*. A heuristic flags responses that describe the process rather than reflect on it. | It never generates reflection text. |
| Academic integrity and AI | A nine-row grid of AI uses and their risk, a transparency checklist, and a log of the student's own AI use. The IB Academic integrity policy is named as the authority. | It gives no advice on disguising AI use, and is written so that AI does not write the essay. |
| Quality check | Eleven areas, each read as **Ready / Needs attention / High risk** in words. | It shows no score, no grade and no mark out of 30. |
| Supervisor mode | Session plans, questions to ask and a supervision checklist. | |

## 4. YouTube architecture

```
browser (#/arjun, home band)
   │  fetch /api/youtube   (no cookies, no reader data; never during the self-test)
   ▼
api/youtube.js  (Vercel serverless function, Node, CommonJS)
   │  1. memory cache, 30 min  →  2. YouTube Data API v3  →  3. RSS fallback
   │  Cache-Control: s-maxage=3600, stale-while-revalidate
   ▼
lib/youtube-categories.js   manual overrides → playlist titles → words in title/description
```

**How the function works**

- **Channel lookup.** The channel is resolved from the handle `@arjunagrawal5724`
  (`channels?forHandle=`), or from `YOUTUBE_CHANNEL_ID` when that is set. Nothing about the channel
  is hard-coded beyond the default handle.
- **What it fetches.** The uploads playlist, the durations and the playlists.
- **Shorts.** A video is treated as a Short when it runs ≤ 60 s, or ≤ 180 s and is tagged `#shorts`.
- **Failure handling.**
  - Every call to YouTube has a timeout (`AbortController`) and one retry.
  - When YouTube fails, the last good answer is served and marked `stale: true`.
  - With no key, the channel's RSS feed is used.
  - With nothing configured, the function answers `status: "not-configured"`.
  - The key is stripped from every error message.

**The page**

- **States.** The page has loading (skeleton), ready, empty, unavailable and not-configured states.
- **Stale copy.** It keeps the last good list on the device (`AA_YT_LAST`) and shows it, labelled,
  when the feed later fails.
- **Safety.** It validates every video ID and URL before rendering, and escapes all text.
- **Service worker (v12).** `/api/` requests go network-first, with an offline JSON answer, so the
  PWA never serves a frozen feed.
- **Prominence.** Arjun's own videos come first, with featured, latest, category, Shorts and
  playlist sections. The existing third-party library stays separate, under *Curated videos*, with
  its existing note that inclusion is not endorsement.

## 5. API and environment setup

Set these in Vercel → Project → Settings → Environment Variables, then redeploy:

| Variable | Required | Purpose |
|---|---|---|
| `YOUTUBE_API_KEY` | Recommended | YouTube Data API v3 key. Restrict it to that API. Server-side only. |
| `YOUTUBE_CHANNEL_HANDLE` | No | Default `@arjunagrawal5724`. |
| `YOUTUBE_CHANNEL_ID` | No | `UC…` ID. Pins the channel; without a key it enables the RSS fallback. |
| `YOUTUBE_TIMEOUT_MS` | No | Timeout per call to YouTube, default 8000. |

**Quota.** One refresh costs about four units, plus one per playlist, against a free daily
allowance of 10,000. The edge cache keeps refreshes to about one an hour.

**Keeping the key out of the repository**

- No key is committed.
- `.gitignore` now excludes `.env`, `.env.*` and `.vercel`, because `vercel env pull` writes
  `.env.local`.
- A search of the repository for key-shaped strings (`AIza…`, `ghp_…`, `sk-…`, private keys) found
  nothing.
- The only Google hosts the client references are the font hosts.

## 6. EE features and source discipline

Every factual statement about the EE carries one of five labels:

| Label | Meaning |
|---|---|
| **Official IB** | Read first-hand in a supplied IB document, with the page given. This is the Economics guide, p. 8, for the Economics-specific statements. |
| **Reported from the 2027 EE guide** | Taken from the Extended Essay Navigator supplied with this brief. The 2027 *Extended essay guide* itself was **not** supplied, so each of these tells the student to confirm it in the guide. |
| **Professional interpretation** | A reading of the official material. |
| **Pedagogical suggestion** | Teaching advice, not a requirement. |
| **Teacher-created tool** | One of the platform's own tools. |

**Conflict shown, not resolved.**

- The Economics guide (2022, p. 8) says the issue "must have taken place up to five years prior to
  the beginning of the research process".
- The Navigator reports no recency rule for economics in the 2027 EE guide.

Both are shown side by side. The studio says the current EE guide governs, and asks the student to
check with their supervisor.

The Navigator's structure was adapted, not copied. Its reported facts were rewritten in original
wording, with their layer shown.

## 7. Educator features

- An audience selector: new teacher, experienced teacher, EE supervisor, DP coordinator, student.
  Each role gets a pathway of steps that open **existing** content.
- A handbook of ten modules: planning, real-world teaching, diagrams, assessment design, the IA,
  EE supervision, classroom reasoning, research literacy, TOK links, and reflective practice.
- *For coordinators*: every item is page-cited to the guide or TSM, or marked as a school decision.

## 8. Home page

The order is now:

1. The hero (unchanged).
2. **Start your journey**, with a choice of *student / teacher / EE supervisor / curious*. It offers
   nine pathways, for example "I want to start my EE", "I want to master diagrams" and "I'm a new
   IB Economics teacher". Each pathway is a short sequence of links into existing content, so no
   content is duplicated.
3. **Latest from Arjun**, which appears only once a video list has loaded (or a stored one exists).
4. The existing bands.

The existing `homeTidy` pass still runs last.

## 9. Data and content changes

**New content modules** (in `index.html`):

- `EES_TOPICS` (20), `EES_MODELS` (24), `EES_PITFALLS` (12);
- `EDU_ROLES` (5), `EDU_MODULES` (10), `EDU_COORD`;
- `PWAYS` (9).

**IB corrections, from checking against the supplied guide and TSM.** There were 26 (C1–C26):

- Paper 3 part (b) now shows AO1 · AO2 · AO3 · AO4, not AO3 alone. The test that encoded the old
  claim was corrected.
- The markband and IA descriptors are now verbatim where they are labelled "quoted", or relabelled
  "condensed" where they are not.
- Three invented markband strands were removed.
- The publication lines for the guide and TSM were corrected.
- HL-only tags were added from the guide's bold type:
  - PED along a linear demand curve;
  - 3.4 average and marginal tax rates;
  - the 3.3 HL diagram;
  - the misconception `m4` and the SL definition drill;
  - two data-lab sets.
- The macroeconomic objectives went from "five" to the guide's four.
- The moderation desk no longer prints the mark twice.
- The word-count and criterion D wording was aligned with the guide.

**Latent bugs fixed**

- **Import rejected older files.** A second, older `expJSON`/`impJSON` pair silently replaced the
  workspace backup and restore, and its import rejected every file that was not version 2. It was
  removed.
- **A self-test suite never ran.** Two self-test suites were both called `FINALSUITE`, so
  "Release gates" ran twice and "final release" never ran.
  - The fix: the first suite was renamed.
  - What the revived suite found: the dictionary check rejected *Terms of trade*, which is
    deliberately unmapped and labelled enrichment.
  - The check now accepts flagged enrichment, as the calculation check already did.

**Exam DNA part marks.** No values were changed. The diagnostic in
`docs/exam-dna-mark-diagnostic.md` still needs the 38 source papers it lists.

## 10. Tests performed

| Suite | What it covers |
|---|---|
| In-page self-test (`runQA`) | 1,870 checks across 32 categories. The new *Economics EE Studio* (35), *Video studio* (7) and *Educator Studio and ecosystem* (10) suites include no-grade, no-fetch-during-test, source-label and no-workplace-framing rules. |
| `tests/api-youtube.mjs` | The function with `fetch` stubbed: not configured, misconfigured, API success, Shorts detection, categories, RSS fallback, timeout and retry, stale cache after a failure, a malformed response, and the key never appearing in any output. |
| `tests/ecosystem.mjs` | Real browser journeys. The research question lab diagnoses and keeps versions across a reload. The matrix adds, persists and flags missing challenges. The argument map adds and reorders nodes. The data lab shows/suggests/does not establish. The quality check reads High risk and Ready. The video studio is run against a stubbed endpoint in every state: working, not configured, YouTube failing, an HTML error page, offline, empty and malformed. The stale device copy, the home band, educator pathways and home pathways are also covered. |
| `tests/e2e.mjs` | The existing end-to-end journeys. |
| `tests/pwa.mjs` | Service worker, offline and manifest. |
| `tests/widths.mjs` | 33 routes (12 of them new) at 320, 375, 390, 412, 430, 768, 1024, 1280 and 1440 px. Checks for no overflow, no page errors, touch targets and keyboard-reachable scrolling tables. |
| `tests/routes.mjs` | Every navigation route for page errors. |
| axe-core (WCAG 2.0 A/AA and 2.1 AA) | Each of the 19 EE Studio tabs by its own route, two deep links, the video studio, the three Educator pages, the home page and *My Economics*, at 1366 and 375 px. The research question lab and data lab were run with results showing. |
| Performance | The home page against `main` (00b46da), median of 5 runs. See section 12. |

## 11. Results

| Suite | Checks | Passed | Failed |
|---|---|---|---|
| In-page self-test | 1,870 | 1,870 | 0 |
| `api-youtube` | 21 | 21 | 0 |
| `selftest` (harness wrapper around the in-page self-test) | 37 | 37 | 0 |
| `e2e` | 22 | 22 | 0 |
| `ecosystem` | 30 | 30 | 0 |
| `pwa` | 4 | 4 | 0 |
| `widths` (one check per width, each covering 33 routes) | 9 | 9 | 0 |
| `routes` | 2 | 2 | 0 |
| axe-core | 27 routes × 2 widths | 0 violations after the badge fix | see section 13 |

The harness was run as one full pass (`node tests/run-all.mjs`, exit code 0, "every suite passed")
on the committed code of this release.

- **Before this release,** `main` (00b46da) passed 70 of 70 harness checks and 1,868 in-page checks.
- **Why the self-test count is 1,870, not higher.** Two suites shared the name `FINALSUITE`, so
  "Release gates" (83 checks) was counted twice and "final release" (33 checks) never ran. With the
  shadowing fixed, the count is 1,870 and every check runs once.
- **What failed on the way, and was fixed before this pass:**
  - five new self-test rules on first integration;
  - the revived dictionary check;
  - the amber badge contrast;
  - two widths routes with wrong slugs in the test itself.

  Each is described in sections 9 and 13.

## 12. Performance

Measured in headless Chromium at 1366 × 900, service worker blocked, local server, median of 5
runs each, on the same machine:

| | `main` (00b46da) | This release | Change |
|---|---|---|---|
| `index.html` | 4,227,498 B | 4,531,980 B | +7.2% |
| `index.html`, gzip -9 | 1,516,912 B | 1,610,234 B | +6.2% |
| First contentful paint | 316 ms | 328 ms | +12 ms |
| DOMContentLoaded | 2,503 ms | 2,674 ms | +171 ms |
| Full self-test run | 1,515 ms | 1,558 ms | +43 ms |
| JS heap after load | 123 MB | 123 MB | none |
| DOM elements on the home page | 969 | 987 | +18 |

**How to read these numbers**

- **Parsing is the main cost.** DOMContentLoaded is dominated by parsing the single inline script.
  The added 171 ms is roughly in proportion to the 7% more code.
- **These are local timings.** They are not field measurements, and a slower phone will see a
  larger absolute difference.
- **What is new beyond the page.** The function (`api/youtube.js`, 11.8 kB) and
  `lib/youtube-categories.js` (4.1 kB) run on the server and add nothing to the page.

The new sections render only when opened: no EE Studio, video or educator markup is built for the
home page beyond the two small bands. Video thumbnails use `loading="lazy"` with fixed dimensions. The feed is requested at most once every
ten minutes, when the home page or the video studio is shown, never during the self-test, and
never in a sandboxed window.

## 13. Accessibility

- **axe.** The first axe run found one issue: the amber *Needs work / Needs attention* badges had a
  contrast of 4.44:1 at 12 px. Only those two badges were darkened, to 5.48:1; the global token was
  not changed. After that, axe found **no violations** on any page tested. One scan flagged
  contrast on the page behind the first-visit welcome dialogue while it was still closing. The same
  page scanned with the dialogue closed was clean, so this is recorded here as a test-timing
  artefact, not a defect.
- **Controls.** All new controls are native buttons, inputs, selects and fieldsets with legends and
  labels. The research question diagnosis is a description list, so a screen reader reads each
  dimension with its rating. The new buttons, options and tiles have a 44 px minimum height, and the widths test checks that none renders below 28 px at any width.
- **Motion and colour.** `prefers-reduced-motion` switches off the thumbnail zoom and the loading
  pulse. Ratings are always given in words, never by colour alone.

## 14. Known limitations

- **The channel ID was not verified.** YouTube is blocked from the build environment. The function
  resolves the channel from the handle when it runs.
  - After deploying, open `/api/youtube` and check `channel.title`.
  - Then set `YOUTUBE_CHANNEL_ID` to pin it.
- **The live YouTube API was never called.** The function was tested only against stubs.
- **Hosting.** The function needs Vercel (or any host that runs `api/*.js`).
  - On a static-only host, `/api/youtube` returns 404 and the studio shows its "could not be
    loaded" state with a link to the channel. That state is tested.
  - The root `pages.yml` (a GitHub Pages workflow) is not in `.github/workflows/`, so it is not
    active.
- **Category overrides are empty.** `OVERRIDES` in `lib/youtube-categories.js` has no entries, so
  categories rely on playlists and keywords until overrides are added.
- **Work is stored on one device.** EE work lives in that browser's storage. It is included in the
  existing workspace export and import, but it does not sync.
- **Heuristics.** The research question diagnosis and the reflection heuristic are rule-based. They
  prompt thinking and do not assess quality. The studio says so.
- **Page size.** `index.html` grew by about 7% (section 12).

## 15. Items needing source verification

1. **The 2027 *Extended essay guide* was not supplied.** Every "Reported from the 2027 EE guide"
   item came through the Navigator and must be checked against the guide on the Programme Resource
   Centre. This covers:
   - the word limit;
   - the criteria and marks;
   - the reflection sessions and RPF;
   - the 500-word reflective statement;
   - the one-draft rule;
   - the supervision hours;
   - the D-grade requirement;
   - the absence of a recency rule.
2. **The recency conflict:** the five-year rule (guide 2022, p. 8) against no rule (as reported for
   the 2027 EE guide).
3. **The IB *Academic integrity policy* and its AI guidance were not supplied.** The studio names
   the policy as the authority and quotes nothing from it. The supplied guide and TSM do not
   mention AI.
4. **The *DP Assessment procedures* were not supplied.** No deadlines or registration rules are
   stated.
5. **Current PRC copies.** The guide's "updated May, August and October 2020" line could not be
   confirmed from the supplied copy, so it was replaced (C2). A current copy may carry it.
6. **Exam DNA part marks.** 63 mismatched records and 2 mislabelled ones are waiting on the 38 past
   papers listed in the diagnostic.
7. **Brad Cartwright's site** was not fetched. Only the principles given in the brief were used, as
   inspiration.

## 16. Deployment

1. Merge the pull request into `main` after review. This release does not touch `main` directly.
2. In Vercel, add the environment variables in section 5 and redeploy. No build step and no
   framework preset are needed: Vercel detects `api/youtube.js` as a function.
3. Open `/api/youtube`. Expect `"ok": true` and the right `channel.title`, then set
   `YOUTUBE_CHANNEL_ID`.
4. Open `#/arjun` and the home page, and check that the videos appear.
5. The service worker version moved to `v12`, so returning visitors pick up the new files on their
   next visit.

**Rollback.** Revert the merge commit. The new storage keys (`S.ees`, `AA_YT_LAST`) are ignored by
the older build and do not interfere with it.
