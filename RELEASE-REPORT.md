# Release report: UPSC CSE Economics, a second pathway

Branch `claude/upsc-cse-economics`, from `main` at f15bb26 (the merge of [ArjunAgrawal101/ib-economics#10](https://github.com/ArjunAgrawal101/ib-economics/pull/10)), submitted as a new pull request. Not merged and not deployed. The previous report is in `docs/releases/2026-10-22-think-like-an-economist-report.md`.

## What was added

- **Two pathways on the home page.**
  - The page's one heading is "Economics. Understood. Connected. Applied.", followed by the supporting statement from the brief.
  - Two cards follow, both on the first screen at 1440 × 900:
    - **IB DP Economics**: "Think like an economist.", ivory and burgundy. It leads down to the existing IB cover.
    - **UPSC CSE Economics**: "Understand the economy. Master the examination.", navy and gold, with handbook covers and links to the syllabus, resources, handbooks, current affairs and the course.
- **A pathway strip above the header.** It reads "IB DP Economics | UPSC CSE Economics | About | Contact" at every width; on phones it is a two-way switch.
  - Inside the UPSC section, About and Contact open the section's own pages.
  - UPSC CSE Economics is also second in the phone drawer, first in the More menu, and in site search.
- **The UPSC section (`#/upsc`)** has eight tabs, each with its own address and title.
  1. **UPSC Overview.**
     - The headline and statement from the brief.
     - A map of how the eleven volumes build on one another, drawn from each volume's own series-boundary panel.
     - Five pillars.
     - "How we approach Economics": the repo rate followed through Concept → Explanation → Visualisation → Indian economy → Current affairs → Prelims → Mains, with arrow-key navigation.
     - What students learn, static against current, and Prelims against Mains.
     - Three next steps: free resources, ₹99 handbooks and the ₹9,999 programme.
  2. **Syllabus.**
     - The official wording is quoted from UPSC Examination Notice No. 05/2026-CSE (4 February 2026).
     - Four labelled kinds of text are kept apart: Official, Explained, Covered and Current.
     - **Prelims:** the Paper I lines, organised into fourteen explained themes.
     - **Mains:** the ten GS III Economics lines, quoted, each with:
       - what it expects;
       - its dimensions and concepts;
       - an example;
       - an answer approach;
       - its volumes.
     - The two GS II lines that call on Economics.
     - Coverage dots show which volumes treat each line. They are taken from the volumes' own contents and syllabus maps, and are not a percentage.
  3. **Economics Resources.**
     - Eleven free topic previews, one or more for each of the ten categories, with search and category filters.
     - Each preview has:
       - an introduction and the concept;
       - an original diagram, computed where possible;
       - distinctions;
       - the Indian context;
       - the policy and institutions;
       - the Prelims and Mains perspectives;
       - a question that marks your answer;
       - a link into its volume.
     - "Inflation: Beyond the Headline Number" includes the requested diagram linking inflation, purchasing power, interest rates and monetary policy.
     - The page also holds **One Concept. Two Examination Perspectives.**: eleven shared concepts, each linking to existing IB pages (labs, diagram library, mindmaps, the elasticity explainer, Real World) and to the UPSC volumes and previews. Nothing IB is duplicated.
  4. **Economics Handbooks.**
     - "The Economics Handbook Collection": eleven cards, each with:
       - the cover;
       - the volume number;
       - the title and page count;
       - a description and topics;
       - Prelims and Mains relevance;
       - ₹99 / Volume;
       - **Explore Handbook** and **Purchase PDF | ₹99**.
     - Each volume has its own page with:
       - the facts and the edition;
       - a description and what students will learn;
       - the full contents with page numbers;
       - the volume's own syllabus map;
       - key concepts and institutions;
       - the recurring boxes and the revision compendium;
       - three watermarked sample pages (contents and two pages) that enlarge;
       - its free previews;
       - the purchase actions.
  5. **Current Affairs.**
     - Nineteen dated entries across twelve themes, filterable.
     - Each entry gives what changed, the concept, the examination angle, the source authority and the handbook part.
     - It is marked as edited by hand, compiled on 16 November 2026 from the handbooks' dated trackers.
  6. **UPSC Economics Course.**
     - "Master Economics for UPSC. Build Understanding That Lasts."
     - The facts: ₹9,999 for the complete 3-month programme, 3 months, 100% online, maximum 25 students, Prelims + Mains, static Economics + current affairs.
     - Ten features.
     - A three-month roadmap tagged with the volumes; it is labelled indicative and is not a weekly timetable.
     - "Why a batch of 25?"
     - A pricing card with **Enquire About Enrolment** and **Speak to Arjun**.
  7. **About the Educator.** "Arjun Agrawal, Economics Educator | IB DP Economics | UPSC CSE Economics", using only facts already on the site and on the handbooks' title pages, and the existing portrait.
  8. **Contact / Enrolment.** Separate handbook, enrolment and general enquiries. A volume can be chosen, the message is shown before it is sent, and there are WhatsApp, email and phone links.

## The handbooks

All eleven volumes were inspected in full, privately. A per-volume audit (titles, page counts, contents, concepts, institutions, Prelims and Mains relevance, descriptions, syllabus maps) is supplied separately and is not in the repository.

| Vol. | Title | Pages |
|---|---|---|
| I | Introduction to Economics | 41 |
| II | Money & Monetary Policy | 43 |
| III | Inflation and Price Stability | 49 |
| IV | Taxation and Public Revenue | 49 |
| V | Fiscal Policy and Budget Management | 49 |
| VI | Banking and Financial Institutions | 50 |
| VII | Financial Markets and Instruments | 49 |
| VIII | Balance of Payments and International Trade | 55 |
| IX | Global Economic Institutions and Trade Architecture | 43 |
| X | Indian Agriculture and Allied Sectors | 45 |
| XI | Indian Industry, Manufacturing, Trade and Labour Markets | 50 |

- **Page counts.**
  - **Volumes V, VI, VIII, X and XI** were supplied as PDFs; their counts are the PDFs' own.
  - **Volumes I, II, III, IV, VII and IX** were supplied as Word files.
    - They were rendered here with LibreOffice 24.2, the producer named in the supplied PDFs, using each file's embedded fonts.
    - In all six, every part begins on exactly the page the volume's contents page gives, so the counts reproduce the author's pagination.
    - They should still be confirmed against the PDFs that are sold.
  - `tools/upsc/build_upsc.py` refuses to build if a page count or title in the catalogue differs from the PDF.
- **Protection.**
  - No PDF or Word file is in the repository, and `.gitignore` refuses both.
  - The page names no handbook file.
  - The site shows four low-resolution WebP images per volume: the cover, the contents page and two sample pages.
    - Pages are 640 px wide, about 77 dpi; covers are 520 px.
    - All 44 images total 2.6 MB, each under 120 KB.
  - Each image carries a diagonal watermark and a strip reading "Arjun Agrawal | Economics Collection | Preview Only".
  - No full chapter is reproduced; the topic previews are written fresh from the volumes.
- **Purchase.**
  - Purchase PDF | ₹99 opens WhatsApp on the published number (+91 7092844945) with: "Hello Arjun, I would like to purchase the digital copy (PDF) of Volume N: Title, from your UPSC CSE Economics Handbook series, priced at ₹99. Please let me know how to pay and receive the PDF."
  - The email alternative goes to arjun1agr@gmail.com.
  - No payment gateway, bundle price, UPI ID or confirmation was added, and the pages say nothing is charged on the site.

## What was changed

- **The IB cover's heading is now an `h2`**, because the page's single `h1` is the shared headline. Its text, type, layout and actions are unchanged; CSS selectors now target `.cv-h` rather than `h1.cv-h`.
- **Title and description.** The page title and descriptions (including social-card tags) name both pathways: "Arjun Agrawal · Economics: IB DP and UPSC CSE".
- **Navigation.**
  - The phone drawer lists UPSC CSE Economics second, after Resources.
  - The More menu opens with a Pathways group.
  - The footer's Connect column lists UPSC Overview, Syllabus, Economics Handbooks and the 3-month programme.
  - The IB primary bar is unchanged.
- **Two network-request tests.** `tests/transform.mjs` and `tests/events.mjs` now count only the page's own requests. The service worker precaches the four data files for offline use on install, and Playwright 1.63 reports those requests at the context level. The previous release fails the same two checks here for the same reason, and with service workers blocked the page makes none of these requests at start-up.
- **Service worker.** v21.

## What was preserved

- Every IB section, route, tool and its data are unchanged.
- Nothing is written to `localStorage` by the new section: its filters and choices are held in memory.
- The opening sequence is unchanged, and so are the Resource hub, the Learning Studio, Tutorials and the existing About and Contact pages.

## Accuracy

- **The official syllabus.**
  - upsc.gov.in is refused by this session's network policy, so the notice PDF could not be opened directly.
  - Search-engine excerpts restricted to upsc.gov.in confirm the 2026 notice (No. 05/2026-CSE, 4 February 2026) and these lines:
    - the Prelims line "Economic and Social Development-Sustainable Development, Poverty, Inclusion, Demographics, Social Sector Initiatives, etc.";
    - the GS III heading;
    - the lines on the Indian economy, inclusive growth, Government Budgeting, crops, subsidies and the PDS, food processing, infrastructure (2025 notice) and investment models;
    - the GS II line on government policies and interventions.
  - These lines did not appear in the excerpts and should be checked against the PDF:
    - "Land reforms in India.";
    - "Effects of liberalization on the economy, changes in industrial policy and their effects on industrial growth.";
    - the tails of the crops and subsidies lines;
    - "Important International institutions, agencies and fora- their structure, mandate."
- **Figures.** Every figure in the topic previews and Current Affairs comes from the handbooks, each with the authority the handbook cites. Developments the handbooks source only to news outlets were left out.

## Tests

Every suite was run in sequence in headless Chromium (Playwright 1.63) against the final committed build, **7951e14**, with a clean working tree.

| Suite | Result | Checks |
|---|---|---|
| api-youtube | passed | 21 |
| selftest | passed | 37 (the 2,136 built-in self-tests all pass) |
| e2e | passed | 22 |
| ecosystem | passed | 30 |
| renaissance | passed | 25 |
| cover | passed | 35 |
| pwa | passed | 4 |
| widths | passed | 15 |
| overlap | passed | 7 (every audited route at 15 widths, 320 to 2560 px) |
| routes | passed | 2 |
| intro | passed on rerun (see below) | 58 |
| course | passed | 39 |
| transform | passed | 33 |
| events | passed | 49 |
| tabs | passed | 9 |
| notices | passed | 4 |
| events-scroll | passed | 26 |
| final | passed | 18 |
| studio | passed | 89 |
| launch | passed | 55 |
| upsc (new) | passed | 82 |

**21 of 21 suites pass: 660 checks.** None were skipped, and none could not be run.

- **intro.**
  - **The failure.** In the sequential run, 4 of its 58 checks failed at 768 px only. The opening waits for the platform to be ready, and that once arrived at 5,393 ms, so its exit was late.
  - **Investigation.** With the machine otherwise idle:
    - the opening ended on its own clock at 5,003 to 5,029 ms in 8 of 8 probes at 768 and 1440 px, against 5,010 to 5,021 ms on the previous release;
    - the UPSC self-test suite adds 7 to 13 ms to start-up.
  - **Reruns.** The suite was then run twice more on the same build, and both runs passed all 58 checks.
  - **Conclusion.** The start-up margin is environment-sensitive, as the previous report also noted. It should be watched on a slow device.
- **Fixed during this run.**
  - **transform and events.** Each had one check failing: "no data file is fetched until a page needs it". The requests were the service worker precaching the files for offline use. Playwright 1.63 reports those at the context level, and the previous release fails the same checks here. The tests now count only the page's own requests. With service workers blocked, the page makes none of these requests at start-up.
  - **overlap.** The first full audit of the final build found four problems; three were already present in the previous release:
    - the India 1991 chart's event labels touching at 390 and 430 px;
    - "Q elastic" and "Q inelastic" touching on course topic 2.5 at 1440 px;
    - "Price ($)" cut off at the elasticity lab's top edge at 1440 px;
    - the home page's fanned handbook covers (images laid over one another) at 768 and 834 px.

    All four are fixed (label rows 16 and 14 units apart, the lab label at y = 14, and the cover fans drawn as backgrounds of a decorative element), and the full audit now passes.
- **The UPSC suite (82 checks).**
  - The home page has one heading and both pathways are on the first screen; the pathway strip works.
  - All eight tabs route, each with one heading and its own title.
  - The handbook cards show 11 covers, page counts of 41, 43, 49, 49, 49, 50, 49, 55, 43, 45 and 50, ₹99 / Volume, and prefilled enquiries that name the volume.
  - Each volume page has its contents, syllabus map, sample pages, zoom and email enquiry.
  - The course states ₹9,999 for the complete 3-month programme, never per month, and the enrolment message is exact; the phone link calls the published number. No lecture counts, guarantees or refunds appear.
  - Contact keeps three separate enquiry types. The syllabus has its Prelims themes and 10 Mains lines, quoted. The resource search and filters work, and the questions mark answers.
  - The connector's IB links reach live pages. The current-affairs filters work, and every entry has a date and a source.
  - Search finds the UPSC pages.
  - Nothing scrolls sideways at 1024, 768, 390, 360 or 320 px. Reduced motion is respected.
  - axe finds no WCAG A or AA violation on the pathways, the strip or any UPSC page at 1440 and 390 px.
- **Build.**
  - `tools/build/splice.py` built the page from the sources.
  - A separate check confirmed:
    - the three UPSC modules, the latest stylesheet and the footer change are in `index.html`;
    - all 2,136 built-in self-tests pass;
    - the footer's UPSC links open their pages;
    - there are no page errors.
- **Protection.**
  - The repository holds no PDF or Word file apart from the ten public carousel PDFs.
  - The page names no handbook file, and handbook paths are not served.
  - The 44 previews are WebP, each under 120 KB.
- **Visual review.** Screenshots of the home page and every UPSC page were captured and inspected at 1440, 1024, 900, 768, 640 and 390 px.

## Remaining limitations

- **Vercel.** The deployment and any preview cannot be reached from here; nothing about production is claimed.
- **The opening sequence.** It still says "IB DP Economics". At phone width there is no room for both pathways in its line without changing its timed, tested layout, so it was left as it is.
- **Browsers.** Only headless Chromium was used for the tests and screenshots, not Safari, Firefox or physical devices.
- **For the owner to confirm.**
  - **Page counts.** Those for Volumes I, II, III, IV, VII and IX come from the supplied Word files, rendered as their PDFs would be. Please check them against the PDFs that are sold.
  - **The official syllabus.** The syllabus lines listed under Accuracy should be checked against the 2026 notice PDF, which could not be opened from here.
  - **Your qualifications.** About the Educator now shows "Postgraduate training in Economics and Political Science; UGC-NET and MH-SET qualified", taken from the handbooks' title pages; please confirm you want it on the site.
- **The opening's start-up margin.** It ends on time when the machine is not busy; under heavy load it can end a few hundred milliseconds late (see Tests).

## Files

| File | Purpose |
|---|---|
| `content/upsc/handbooks.json` (new) | The catalogue, from the volumes themselves |
| `tools/upsc/build_upsc.py` (new) | Checks titles and page counts against the private PDFs, writes the watermarked previews and the data module |
| `assets/upsc/handbooks/*/` (new) | 44 preview images |
| `src/modules/41-upsc-data.js` (new, generated) | The catalogue as the page reads it |
| `src/modules/42-upsc-content.js` (new) | Syllabus, topics, current affairs, the connector and the programme |
| `src/modules/43-upsc.js` (new) | The section, figures, pathway strip, home pathways, search records and self-tests |
| `src/styles/css-upsc.css` (new) | The UPSC palette and pages |
| `tools/migrations/2026-11-16-upsc-navigation.py` (new) | The drawer entry, the title and descriptions |
| `src/modules/07-cover.js`, `src/styles/css-launch.css`, `src/styles/css-atlas.css` | The cover's heading as `h2` |
| `src/modules/27-wire-t6.js` | The More menu's Pathways group |
| `src/modules/38-studio.js`, `src/modules/39-atlas.js` | Self-tests for the cover's `h2` |
| `tools/build/splice.py` | Splices the new stylesheet |
| `tests/upsc.mjs` (new), `tests/launch.mjs`, `tests/run-all.mjs` | The new suite; the Resources band now follows the pathways and the cover |
| `service-worker.js` | v21 |
| `tests/transform.mjs`, `tests/events.mjs` | Count only the page's own requests, not the service worker's precache |
| `src/modules/24-datalab.js`, `src/modules/11-rooms.js`, `tools/migrations/2026-11-16-figure-label-rows.py` | Figure labels that touched or were cut off |
| `README.md`, `docs/design-system.md` | The UPSC section and its palette |
| `.gitignore` | Refuses Word files and the handbook PDFs |
