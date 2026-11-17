# Flagship redesign: dual-pathway Economics platform

The plan for the redesign the owner commissioned on 17 November 2026: one platform, ARJUN AGRAWAL · ECONOMICS, *Think like an economist.*, serving IB DP Economics and UPSC CSE Economics with equal weight. It builds on `main` at `2d238cd` (pull request #11 merged the first UPSC section). Nothing that works is removed.

## Information architecture

| Layer | Contents |
| --- | --- |
| Global header (every page) | Brand · **Home · IB DP Economics · UPSC CSE Economics · About** · Search. IB and UPSC are a two-part pathway switcher; each opens a menu of its environment |
| IB context bar (IB pages) | IB Home · Learn · Explore · Practise · Research · Resources (dropdowns) · Tutorials · SL/HL |
| UPSC context bar (UPSC pages) | UPSC Home · Syllabus · Economics Resources · Handbook Library · Current Affairs · Preparation Strategy · Online Course · Contact / Enrol |
| Section tabs | The existing tab bar (`#subnav`) for IB sections with tabs; hidden in the UPSC section, whose tabs are the context bar |

### Routes (hash routing is kept: it works from `file://`, a subfolder, GitHub Pages and Vercel)

| Address | Page | Owner |
| --- | --- | --- |
| `#/` | Shared home: ten sections (below) | shell |
| `#/ib` | IB DP landing: the existing IB home, intact (the cover, the chapters and every band) | shell |
| every existing IB route | unchanged (`#/learn/...`, `#/lab/...`, `#/world`, ...) | |
| `#/upsc` | UPSC Home | upsc |
| `#/upsc/syllabus` | Syllabus (Prelims GS I, Mains GS III) | upsc |
| `#/upsc/economics-resources` | Economics Resources | upsc |
| `#/upsc/handbook-library[/volume-iii]` | Handbook Library, and one volume | library |
| `#/upsc/current-affairs` | Current Affairs | upsc |
| `#/upsc/preparation-strategy` | Preparation Strategy | upsc |
| `#/upsc/online-course` | The three-month programme | upsc |
| `#/upsc/contact-enrol` | Contact / Enrol (UPSC) | upsc |
| `#/concepts[/inflation]` | One Concept. Two Perspectives. | concepts |
| `#/about`, `#/contact` | Shared About; Contact with separate IB and UPSC enquiries | shell |

Old addresses stay valid as aliases: `#/upsc/economics-handbooks[/…]` → handbook-library, `#/upsc/upsc-economics-course` → online-course, `#/upsc/contact-enrolment` → contact-enrol, `#/upsc/about-the-educator` → `#/about`.

### UPSC tabs (in this order)

`UP_TABS = ["UPSC Home","Syllabus","Economics Resources","Handbook Library","Current Affairs","Preparation Strategy","Online Course","Contact / Enrol"]` and `UP_T = {overview:0, syllabus:1, resources:2, handbooks:3, current:4, strategy:5, course:6, contact:7}`.

### Shared home, in order

1. Hero and pathway selection ("Economics is not just a subject to study. It is a way to think."), two pathway cards of equal weight with real previews
2. Think Like an Economist
3. Explore the IB Economics Learning Environment
4. Explore the UPSC Economics Learning Environment
5. Selected Resources and Handbooks
6. Interactive Economics Laboratory
7. Economics Across Two Learning Pathways (One Concept. Two Perspectives.)
8. About Arjun Agrawal
9. Enrolment and contact
10. Footer

## Identity and design system

`src/styles/css-flagship.css` holds the tokens and primitives (prefix `fx-`). `body[data-pathway]` is `shared`, `ib` or `upsc`, so a component uses `--path-accent`, `--path-wash`, `--path-ivory` and `--path-gold`, never a hard-coded pathway colour.

- Shared: deep charcoal `--fx-charcoal`, warm ivory `--fx-ivory`, restrained gold `--fx-gold` (text on ivory: `--fx-gold-text`).
- IB DP: burgundy `--ib-bur`, ivory `--ib-ivory`, muted gold `--ib-gold`.
- UPSC: forest green `--up-forest`, warm ivory `--up-ivory`, antique gold `--up-gold` (text: `--up-gold-text`).
- Type: Bodoni Moda (display), Source Serif 4 (reading), Manrope (interface), JetBrains Mono (figures). All self-hosted.
- Editorial restraint: fine borders, small radii (2 to 4 px), generous space, no gradients for decoration, no glow, motion that explains.

## Shared core (`src/modules/44-flagship-core.js`)

- `FXI` (identity), `fxPathway(view)` → `"ib" | "upsc" | "shared"`.
- Contact, from the details the site already publishes (never new ones): `FX_CONTACT.email() / phone() / wa()`, `fxWa(msg)`, `fxMail(subject, body)`, `fxTel()`.
- `FX_ENQ` (the standing enquiries: IB tutoring, IA, EE, resources, teacher collaboration; UPSC handbooks, course, mentorship, resources) and `fxEnquiryLinks(key)`.
- `fxHandbookMsg(volume)`: the purchase message in the owner's wording.

## Workstreams and ownership

Each works in its own worktree and branch, and touches only its own files. `index.html` is generated: never edit it by hand. Code goes in `src/modules` and `src/styles`; a change to the older base code is a re-runnable script in `tools/migrations/` (string replacement that checks it applied once and is a no-op when run again). After every change run `python3 tools/build/splice.py`.

| Workstream | Owns | Interface it provides |
| --- | --- | --- |
| Opening | `tools/migrations/2026-11-17-opening-*.py`, `src/styles/css-opening.css`, `tests/intro.mjs`, any opening asset builder | The five-second sequence on the existing clock (`#splash`, `#intro-clock`, `window.__INTRO`, `__APP_READY`, `splashEnd`) |
| UPSC environment | `src/modules/42-upsc-content.js`, `43-upsc.js`, `src/styles/css-upsc.css`, `tests/upsc.mjs` | `UP_TABS`/`UP_T` above; calls `hlRender(ARG)` for the Handbook Library tab and `ccTeaser({path:"upsc"})` where concepts are linked, when those functions exist |
| Handbook library | `src/modules/45-library.js`, `src/styles/css-library.css`, `content/upsc/handbooks.json`, `src/modules/41-upsc-data.js` (generated), `tools/upsc/`, `assets/upsc/`, `tests/library.mjs` | `hlRender(arg)` (the whole tab: catalogue, or one volume when `arg` is a volume id), `hlOpenViewer(volumeId, page)` |
| Concepts | `src/modules/46-concepts.js` (+ data module if needed), `src/styles/css-concepts.css`, `tests/concepts.mjs` | section `concepts`; `ccTeaser(opts)`, `ccLink(conceptId)` |
| Shell (lead) | `44-flagship-core.js`, `47-*.js` onwards, `css-flagship.css`, head metadata, navigation and home migrations, the welcome dialog, `tests/flagship.mjs` and the navigation and home suites | header, context bars, drawer, search, home, IB landing, About, Contact, SEO |

## Rules for everyone

- Preserve every working feature and route. A renamed address keeps working as an alias.
- No invented facts, figures, syllabus wording, contact details, dates, testimonials, credentials or results. Real data carries its source and date; anything illustrative says so.
- Contact and enquiries only through `FX_CONTACT` / `FX_ENQ`. No payment gateway, no fake success screen, no booking, no countdown or scarcity claim.
- The handbooks are never stored in the repository and never published whole: only selected preview pages.
- British English as the site uses it (-ise: organised, programme, practise as a verb). Prefer no en or em dashes in new copy.
- No new runtime dependencies; no framework. Motion: opacity and transform, respect `prefers-reduced-motion`.
- Accessibility: one `h1` per view, landmarks, keyboard reachable controls, visible focus, contrast AA, no horizontal scroll at 320 px.
- Tests: `cd tests && node <suite>.mjs` (dependencies: `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install --no-save playwright@1.63.0 axe-core`). Update the assertions your change legitimately alters; never delete a check to make it pass.
