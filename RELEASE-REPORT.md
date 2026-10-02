# Release report: forensic audit, Economic events, Pathways

Branch `claude/upbeat-hawking-69d7gz`, 2 October 2026. Nothing in this release has been merged to `main`, and production is unchanged. The previous report is in `docs/releases/2026-10-01-transformation-stage1-report.md`.

## A. Summary

This release did four things:
1. It audited the platform against its own documents, starting from the repository and git history rather than earlier reports.
2. It fixed the broken navigation the audit found. Those faults had been present since the first upload.
3. It made the home-page opening sequence play on every kind of load.
4. It added two new surfaces: an archive of twelve economic events, and six learning pathways with an Indian economy hub.

Every suite passes. The built-in self-test runs 2,058 checks with none failing.

## B. Forensic audit

The full audit, with the feature matrix (FEATURE | EXISTS | WORKS | VISIBLE | TESTED | SOURCE | STATUS), is in `docs/audit/2026-10-02-forensic-audit.md`.

It checked 222 documented claims:
- 170 held.
- 23 were broken or unreachable features, all now fixed (§M).
- 20 were wrong statements in the README, now corrected.
- 4 were statements in earlier release reports, now superseded.
- 2 remain open (§T).
- 3 could not be verified from this environment.

## C. Git history and recovered work

Nine snapshots of `main` were booted one at a time, from the first upload (`fd2403d`) to the merge of pull request 7 (`8e2efbc`). Every one booted with no page errors and passed its own self-test.
- **Removed features:** only one. The Topic dossier was replaced by the 31 lessons, and its address redirects to the lesson.
- **Lost work:** none to recover. The work since pull request 7 (data lab, economists, *Why did this happen?*, events, pathways) is all on this branch, pushed, and not yet on `main`.

## D. Deployment

- **GitHub Pages** publishes from `main` with GitHub's built-in *pages build and deployment*.
- **`pages.yml`** sits at the repository root, where GitHub ignores it. The README said it was in `.github/workflows/` and has been corrected. The file was left where it is, so production deploys exactly as before.
- **`/api/youtube`** is a serverless function and cannot run on Pages.
- **Vercel** could not be reached from this environment, and the repository has no `vercel.json`. A Vercel preview could not be verified.

## E. The opening sequence

The home page plays the full five-second sequence on every kind of load: first visit, reload, hard reload with the cache disabled, typed address, bookmark, and Back or Forward from another site. A deep link to any other page skips it, and moving inside the platform never shows it. Skip and reduced motion work as before.

`tests/intro.mjs` measures each case:

| Load | Result |
|---|---|
| Reload | 5,011 ms |
| Hard reload, cache disabled | 5,012 ms |
| Direct `#/home` | 5,013 ms |
| Back from another site | 5,012 ms |
| Revisit controlled by the service worker | 5,002 ms |
| Deep link | Skipped (identity still, about 3.1–3.3 s) |

There is no timer that waits for the opening: the page is built behind it, so it is ready when the overlay leaves.

## F. Economic events

**Twelve events** (More › Economic events, `#/events`): the Great Depression, the end of Bretton Woods, 1970s stagflation, the oil shocks of 1973 and 1979, the Plaza Accord, India 1991, the Asian financial crisis, the dot-com bubble, the global financial crisis, the euro crisis and COVID-19.

**Each event has fourteen chapters:** the world before, trigger, timeline, mechanism, data, response, effects, the world, readings, models, what-if, compare, connections and practice.

**How the reader engages:**
- They predict before the mechanism opens.
- They step through the timeline.
- They choose a what-if before the discussion opens.
- *Compare events* asks what is similar, what is different and which mechanism dominates.
- *Economics through time* puts the events and the sixteen economists on one axis.

**How it is built:**
- The events load from `assets/data/events.js` only when an event opens.
- A small resident index serves the archive, search and the self-tests.
- A failed load shows an error and a retry.

## G. Historical data

`assets/data/history.js` holds the historical series behind the event charts:
- US inflation (from 1914), US growth (from 1930), and US nominal and quarterly GDP.
- Shiller's monthly share prices, nominal and real.
- US and UK ten-year yields, Brent crude (from 1987) and US unemployment (from 1941).
- Exchange rates for nine currencies.
- A growth and inflation panel for sixteen economies.

Each series carries its source, package, licence and retrieval date, and it was validated when it was built (`tools/build/build_history.py`). Two packages had faults:
- **The US GDP package's growth column was a year out**, so growth is computed from chained levels.
- **A column labelled CPI is actually the inflation rate.**

Series whose licence is unclear or proprietary (Case-Shiller, VIX) were excluded.

## H. Historical accuracy

**Writing.** Four writers drafted the events to a shared brief. Every statement about the world carries one of four labels: fact, interpretation, inference or controversy. Every number not taken from the charted data is listed under *How the numbers were checked*, with its basis.

**Review.** A separate reviewer checked the dates, the people, the causal claims and every listed number. It confirmed, for example:
- the 46.91 tonnes of gold pledged in July 1991;
- the two-step devaluation of about 18–19%;
- the Bank of Japan's 2.5% discount rate in 1987;
- the 1973–74 posted oil prices;
- the date of Draghi's "whatever it takes".

It found no high-severity errors and made seven corrections. For example, the January 1991 emergency credit came from the IMF, not the World Bank. The UK's October 2008 recapitalisation was of Lloyds TSB and HBOS, not "Lloyds Banking Group", which was formed in 2009.

The corrections are kept as patches in `src/content/events/rt-events.json` and applied at build time.

## I. Pathways and the curriculum layer

**Six pathways:** IB DP (the deepest), Cambridge International AS & A Level, school, university, civil services and the Indian economy, and everyone.

**No unverified syllabus claims.** The Cambridge and UPSC syllabus documents could not be reached from this environment, so those pathways carry no syllabus map, no topic numbers and no exam-format claims. Each card says this, and a self-test fails if that changes. In the events, the Cambridge and civil-services connections name economic topics, not syllabus references.

## J. The Indian economy hub

The hub (`#/paths/the-indian-economy`) brings together:
- India's growth, inflation and inequality, charted against the world;
- 31 dated policy cases in seven themes;
- the 1991 event, with a one-click comparison to the Asian crisis;
- Sen, Banerjee and Duflo;
- the rupee and the country profile in the data lab.

It states no current policy facts.

## K. Economists and ideas through time

*Economics through time* places the twelve events above the lifespans of the sixteen economists, and every name and event opens its page. Each event links the economists whose ideas explain it.

## L. Navigation and search

- **The new surfaces are reachable everywhere:** the More menu, the mobile drawer, the home page (the *Where do you want to start?* band, and History in the ideas band) and search.
- **New search records:** each event and pathway is a record, with kinds "Economic event" and "Pathway".
- **Search filter:** the palette's *Ideas, history and data* filter includes events.

## M. Bugs fixed

The audit found these faults, and every one dates from the first upload:

| Area | What the reader saw |
|---|---|
| Practise | Six tabs opened the page next to them; three tools (data lab, data trap lab, writing lab) had no route at all |
| Teacher | Six tabs all showed Class intelligence |
| IA | Two tabs showed the Supervisor gates page |
| My workspace | *Revision priority* showed the study plan |
| Calculation addresses and their search results | Opened the board's index |
| Simulator and worked-case search results | Opened the wrong tab |

**The fix** (`src/modules/00-tab-repair.js`) routes these tabs by label, so adding a tab can no longer shift the others.

**Found during this release's own QA:**
- Labels on the events axis collided in the crowded 1971–1991 stretch.
- The chapter rail's spacing was overridden by a global link rule.
- Event-marker labels and line labels overlapped on narrow charts.
- The events timeline's tablist markup failed an accessibility check.

- Two examiner-guidance lines in the exam builder ("'Always' should be attacked directly") tripped the language self-test once the builder became reachable. They advise attacking an absolute rather than asserting one, and were reworded (`tools/migrations/2026-10-02-exam-guidance-wording.py`). The builder picks questions at random, so the failure showed only on some loads.

All of these are fixed.

## N. Accessibility

- **axe:** no violations (WCAG 2.0 A, AA and 2.1 AA) on the events archive, an event page, compare, the history timeline, the pathways and the India hub, at 1366 and 375 px.
- **Status labels:** each fact or interpretation label carries text, not colour alone.
- **Chapter rail:** marks the current chapter with `aria-current`.
- **Charts:** keep the data lab's keyboard reading and table alternative.

## O. Mobile and widths

`tests/events.mjs` checks every new route at 320, 390, 768, 1024 and 1440 px, and finds no sideways scrolling. The width and overlap suites now include the new routes at fifteen widths.

## P. Performance

`index.html` is 5.20 MB (1.77 MB gzipped). On `main` it is 5.05 MB (1.73 MB gzipped); the difference includes the data lab and ideas work, which is also not yet on `main`.

The events (330 KB) and the historical series (231 KB) load only when an event page needs them. The boot self-test never fetches them. Both are precached by the service worker (version v16) for offline use.

No new load-time measurements were taken in this release.

## Q. Testing

| Suite | Result |
|---|---|
| api-youtube, e2e, ecosystem, renaissance, cover, pwa, widths, routes, intro, course, transform | pass |
| selftest (2,058 checks) | pass |
| events (new) | pass, 49 checks |
| tabs (new) | pass; fails on the build before the fix |
| overlap, routes | failed on the first run after the tab repair (marker labels at 375–430 px; the exam-builder wording); both fixed and re-run, see §M |

## R. Documentation

- **README:** new sections for Economic events and Pathways and the Indian economy, and the opening-sequence table.
- **Corrected in the README:** the deployment instructions, plus twenty statements the audit found out of date. Examples: 250 glossary terms (not 157), 28 diagrams with a largest miss of 0.03 px, 35 atlas plates, data controls under Settings, five About positions, and the menu path for every repaired tool.
- **`tests/README.md`** lists the new suites.

## S. Sources and honesty

- **Nothing fabricated.** No figure, policy, citation or test result was invented.
- **Data:** chart values come only from the validated series.
- **Other numbers:** every other number is listed with its basis.
- **Uncertainty:** items the writers could not confirm were left out, for example India's reserve figure in dollars and the exact Greek bond-yield peak.
- **Syllabi:** no Cambridge or UPSC syllabus content was copied or claimed.

## T. Known limitations

- **Exam DNA's "not a prediction" notice** appears on the heatmap only.
- **The "inquiry question" field** on economist profiles did not render on the two profiles checked.
- **Event charts before 1987 have no oil price.** The oil-shock events chart output, inflation, real share prices and yields instead.
- **Cambridge and civil-services pathways** wait for their official syllabus documents.

## U. Not done

- **Deployment:** no Vercel preview was verified, and nothing was merged to `main`.
- **Coverage gaps:** no new simulations were built beyond the event what-ifs, and there are no per-pathway syllabus maps.
- **Further events** after review (for example Latin American debt, 1982) were not written.

## V. Recommended next phase

1. Open a pull request to `main` and check the preview.
2. Check the Cambridge 9708 and UPSC documents, then add syllabus maps.
3. Add events: the 1982 debt crisis, Japan's lost decade and the 2022 inflation.
4. Put the "not a prediction" notice on every Exam DNA surface.

## W. Manual tests still required

1. On a real phone, open an event, predict, step the timeline and read a chart by touch.
2. On the deployed site, confirm the opening plays on reload and is skipped on a shared deep link.
3. Check the Teacher tabs (Lesson planner, Exam builder, Marking sheets) in print preview now that they are reachable.
