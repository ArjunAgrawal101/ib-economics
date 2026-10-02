# Browser tests

The platform tests itself: open the site and it runs its built-in self-test
suite in your browser (reported in the console and at **About → Quality
report**). The scripts here check what a page cannot check from inside
itself: that every route opens cold as a deep link, that nothing overflows at
real screen widths, that the journeys a user takes work end to end, and that
the service worker makes the platform usable offline.

They live in this folder, with their own `package.json`, so the site itself
stays free of dependencies and build steps.

```bash
cd tests
npm install            # installs Playwright
npx playwright install chromium   # skip if a Chromium is already available
npm test               # runs every suite
```

| Script | What it checks |
|---|---|
| `selftest.mjs` | The built-in suite passes in a real browser; data loads from `assets/data`; a first visit shows no test fixtures. |
| `e2e.mjs` | Routing (Back, reload, deep links), search and its filters, Economics, Everywhere interactions, saving, remembered settings, assignment links. |
| `pwa.mjs` | Service worker registration, precache, manifest icons, a deep link opened offline. |
| `widths.mjs` | Major routes and every kind of Economics, Everywhere page at 320, 360, 375, 390, 414, 430, 768, 834, 1024, 1280, 1366, 1440, 1600, 1920 and 2560 px (four widths at a time): no horizontal overflow, no page errors, usable touch targets, and no sideways-scrolling table a keyboard cannot reach. |
| `routes.mjs` | Every section and tab opened cold at 375 px and 1366 px. |
| `ecosystem.mjs` | The Economics EE Studio (research question lab, evidence matrix, argument map, data lab, quality check), the video studio against a stubbed `/api/youtube` in every state (working, not configured, failing, error page, offline, empty, malformed, stale), the Educator Studio and the home pathways. |
| `renaissance.mjs` | The home page's drawn opener, two-tier gateway, *Today in Economics* and folded desk; Random Economics (filtered, opened); the economist's toolkit and its links; paper openers and concept-specific figures; the diagram reading guide; abbreviation search; the footer index; and reduced motion switching every animation off. |
| `cover.mjs` | The cover's movable market (shortage and surplus explained), clickable scale signals, the chapter order, the portrait's clearance on the home and About pages at four widths (measured from rendered boxes), case links opening the case, mindmap *go further* links, the exam rooms and the elasticity lab. |
| `overlap.mjs` | The overlap audit. Thirty-one key routes are checked at fifteen widths, including a lesson, a unit page, the glossary, command terms, the misconception database, the inquiry tools, a snapshot map and Papers 2 and 3. Content inside a closed `<details>`, including a nested summary, counts as hidden. On each, every visible piece of text, image, figure and control is measured from its rendered line boxes, clipped to its scroll containers. It fails on:<br>• any two unrelated elements that intersect;<br>• labels colliding inside a figure;<br>• a figure drawn under text;<br>• sideways scroll.<br>It writes `overlap-report.json`. Use `WIDTHS=` and `ROUTES=` to narrow a run. |
| `intro.mjs` | The opening sequence at 360, 390, 768, 1024, 1440 and 1920 px. The exit fade must reach full transparency at exactly start + 5000 ms and the overlay must be removed within three frames. The start must be the first presented frame, and every stage must sit inside the screen, clear of Skip. Also covers Skip, reduced motion, a deep link and a reload. |
| `course.mjs` | The course layer end to end: a lesson's nine sections, its checks, retrieval, Can I explain it?, Explain it to me, the self-ratings and what-next, Foundation and Teach it, and the old dossier address. Also the glossary filters and comparisons, command terms, snapshot maps laid out for A4 landscape and rendered to PDF with no print dialogue, search, revision mode, and every new page at 360, 390, 768 and 1440 px without sideways scroll. |
| `transform.mjs` | The data lab, economists and ideas, *Why did this happen?* and the eight-item bar: neither data file loads until a page needs it; adding and removing economies keeps each its colour; hover and arrow keys read the chart; every chart names its source and retrieval date; profiles, markets and sources render; a profile loads its full text and links into its lesson; Back, Forward, a cold deep link and a refresh; a pathway steps from prediction to the explanations to rule out; a failed data file shows an error and a retry, never numbers; no sideways scroll at 360, 768 and 1440 px. |
| `events.mjs` | The events archive and the pathways: neither events file loads until a page needs it; twelve events on one axis with no overlapping labels, in date order, with a working filter; the mechanism waits for a prediction; the timeline steps; every chart of all twelve events draws, names its source and marks the event; what-if, compare and the history timeline; refresh, Back and Forward; choosing a path changes the home page; the Indian economy hub charts and lists its cases; search finds an event; a failed events file shows an error and a retry; no sideways scroll at 320, 390, 768, 1024 and 1440 px. |
| `tabs.mjs` | Every Practise, Teacher, IA and workspace tab opens the page its label names, clicked on the real tab bar; a calculation's own address opens it and leaving returns to `#/calculate`; simulator and worked-case search results open their tabs. |
| `notices.mjs` | Every Exam DNA page states once that it is historical and not a prediction tool, and no page predicts what will be asked; all sixteen economist profiles show their inquiry question. |
| `events-scroll.mjs` | An event page scrolls from top to bottom by wheel, Page Down, End and Home, and by touch at 390 px; nothing pulls the page back; it still scrolls after a prediction, a refresh, Back/Forward, a cold deep link and a return from another route; all twelve events reach their end. |
| `final.mjs` | The final release pages: the five tutorial pathways at exactly the supplied prices, counts and lengths, with enquiry links and no promises; the economists timeline previewing on hover and keyboard focus, drawing relations and opening profiles; the editorial profile with the written profile intact; the influence map with every relation in text; a seven-row comparison; the data reading layer; and the timeline as a list on a phone. |
| `api-youtube.mjs` | The `/api/youtube` function run in Node against a stubbed YouTube: setup messages, the Data API and RSS paths, caching, stale fallback, timeouts, malformed answers, and that the key is never returned. |

To use an existing Chromium instead of downloading one, set
`PW_CHROMIUM=/path/to/chromium`.
