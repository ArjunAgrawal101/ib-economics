# Release report: UPSC CSE Economics, a second pathway

Branch `claude/upbeat-hawking-69d7gz`, restarted from `main` after [ArjunAgrawal101/ib-economics#10](https://github.com/ArjunAgrawal101/ib-economics/pull/10) merged. Not merged and not deployed. The previous report is in `docs/releases/2026-10-22-think-like-an-economist-report.md`.

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

TESTS_PLACEHOLDER

## Remaining limitations

- **The push.** GitHub refused this session's push with a 403 (read access works), so the commit is local to the session. See the session summary.
- **Vercel.** The deployment and any preview cannot be reached from here; nothing about production is claimed.
- **The opening sequence.** It still says "IB DP Economics". At phone width there is no room for both pathways in its line without changing its timed, tested layout, so it was left as it is.
- **Browsers.** Only headless Chromium was used for the tests and screenshots, not Safari, Firefox or physical devices.

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
| `README.md`, `docs/design-system.md` | The UPSC section and its palette |
| `.gitignore` | Refuses Word files and the handbook PDFs |
