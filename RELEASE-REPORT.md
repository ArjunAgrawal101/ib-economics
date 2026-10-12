# Release report: the Learning Studio

Branch `claude/upbeat-hawking-69d7gz`. The previous report is in `docs/releases/2026-10-03-final-polish-report.md`.

## What changed

**Home page.**
- **Hero.** The cover now opens with the brief's statement: *Economics is not just a subject to study. It is a way to think.* The supporting line follows. There are two actions:
  - **Explore Economics** brings the gateway into view and moves focus to it.
  - **Discover My Work** opens the Resource Studio.
- **What is kept.** The cover's movable market, the portrait and its frame, the five verbs and the scale signals are unchanged. "Think like an economist." stays as the cover's eyebrow and footer line.
- **Gateway.** It now leads with five ways in, each a link to a real page:
  - explore a concept
  - understand a diagram
  - connect theory to the real world
  - practise calculations
  - develop exam thinking
- **New chapter.** A second chapter, *Discover*, adds four bands:
  - **Selected work:** four original pieces, each with an excerpt, its type, what it helps learners do and the idea behind it.
  - **One topic, five ways in:** price elasticity of demand as a mindmap excerpt, a diagram, a dated platform case, a worked calculation and an original question. These are keyboard tabs.
  - **Inside the learning lab:** a working miniature. The reader predicts, then moves the price on P = 90 − Q and reads |PED| and total revenue.
  - **The thinking behind the resources:** six principles, each linked to where it can be seen.
- **Closing.** The About chapter closes with *Interested in exploring more?* in the brief's wording. Every band the home page had before is still there; the self-test "no band the home page had before is dropped" holds.

**Resource Studio** (`#/studio`).
- **Items.** Nine items, in four types, each backed by real resources:
  - visual explainers: price elasticity of demand, exchange rates, the balance of payments;
  - guides: the examiner's scoring guide, the curriculum roadmap;
  - interactive: the Extended Essay Navigator, the learning lab;
  - collections: Economics in 60 Seconds, the mindmaps.
- **Treatments.** They are chosen by the asset:
  - A: excerpts that open in an accessible viewer;
  - B: a working miniature, or a walkthrough;
  - C: a collection shown as a learning journey that opens the platform's own reader.
- **Navigation.** Filters work by type (each tab has its own address) and by audience. Every item has a stable address (`#/studio/<type>/<item>`), its own title, a prefilled enquiry, a link that can be copied, and links into the platform.
- **Resource hub.** The Studio and the Resource hub point at each other: the hub is the free library, and the Studio is the wider work shown in part.

**Learning design** (`#/design`). One real topic follows the seven moves from concept to judgement. It uses:
- the concept page;
- an explainer excerpt;
- the miniature;
- a dated case;
- the worked calculation PED = −10% ÷ 50% = −0.2, with total revenue rising from $2,800 to $3,780;
- an evaluation of the model's limits;
- an original practice question with an answer plan, labelled as not an IB question.

**Contact and collaboration** (`#/contact`). Six kinds of enquiry, each prefilling an email or a WhatsApp message to the address and number the site already publishes. There is no form: nothing is sent from the page and nothing is stored.

**Navigation.** The Studio is the ninth item on the primary bar and keeps its place late as the bar narrows. Studio, Learning design and Contact are in the More menu, the drawer, the footer and search.

**Discoverability.**
- The home page has a canonical address on the public Vercel address, `og:url`, a 1200 × 630 preview image, and a large card for shared links.
- `studio/` holds plain HTML pages for the Studio and each item, generated from the same manifest. Each has a canonical address, Open Graph tags, LearningResource structured data and real excerpts.
- `sitemap.xml` lists them, and `robots.txt` names it.

**Content system.**
- `content/studio/showcase.json` holds the public metadata.
- `tools/studio/build_studio.py` validates it and writes three things: the app module, the static pages and the sitemap. It refuses disclosure level 3, private-sounding keys, document links and routes that do not exist.
- `tools/studio/build_previews.py` makes WebP excerpts of at most 1,200 px with a footer mark. It reads masters and recipes that must sit outside the repository.
- The workflow is in `docs/studio/ADDING-RESOURCES.md`.

**Service worker (v18).** It used to store any HTML page it fetched as the offline app. With the new `studio/` pages, visiting one would have replaced the offline platform. It now stores only the app shell as the shell, and keeps other pages under their own addresses.

## What is public and what is not

- **Public:** titles, descriptions, objectives, contents lists, and 20 screen-resolution excerpts (628 KB in total) with a footer mark.
  - The ten Economics in 60 Seconds carousels remain public as before. Their covers are reused from the page rather than copied.
  - The EE Navigator is represented by its own title card and a list of what it contains.
- **Not in the site:** no master file, document, application source, preview recipe or inventory. `tests/studio.mjs` scans everything the host would serve and fails if any appears.

## Tests

<!-- filled from the run below -->

## Not verified here

- The Vercel deployment could not be reached from this environment. The canonical and Open Graph addresses assume the site stays at `https://ib-economics-pi.vercel.app/`.
- Web fonts were not loaded in the headless browser, so screenshots used fallback fonts.
- Link previews on specific platforms (WhatsApp, LinkedIn, X) were not tested. They depend on the deployed URL being reachable.
