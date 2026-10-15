# Release report: Project Atlas

Branch `claude/upbeat-hawking-69d7gz` ([ArjunAgrawal101/ib-economics#10](https://github.com/ArjunAgrawal101/ib-economics/pull/10)). It is not merged and not deployed. The previous report is in `docs/releases/2026-10-12-learning-studio-report.md`.

## Economics accuracy

**PED_07 (relatively elastic against relatively inelastic demand)** was checked against its generator, `build_ped_svg_v2.py`.
- **The economics was right:**
  - The steep curve, P = 140 − 2Q, gives 50 → 55 (+10%) for a 25% price cut, so |PED| = 0.4.
  - The flat curve, P = 60 − 0.4Q, gives 50 → 75 (+50%), so |PED| = 2.
  - Each label's colour matched its curve.
- **The labels' positions were wrong.** "D relatively price elastic" sat beside the top of the steep curve, which ran through the word "elastic". The diagram could therefore be read the wrong way round.
- **The source was corrected:**
  - Each label now sits against the end of its own curve, with an assertion in the generator that keeps it clear of the other curve.
  - The pipeline was reproduced first. The generator rebuilds all 13 SVGs byte for byte, and the PNG render matches the masters to within 1–2% of pixels (font antialiasing only).
  - The corrected SVG and 2× PNG were then regenerated.
  - The excerpt on the site is built from the corrected master. The patch for the deck's source is supplied separately for the owner to apply.

**Every other featured diagram and calculation was rechecked:**
- the TR panels (−0.40, −2.0)
- the revenue rectangles (+$1,260, −$280)
- appreciation from a demand increase
- the managed band (the central bank sells at the upper limit and buys at the lower)
- the current-account waterfall (−60 + 60 − 15 + 20 = +5)
- the identity
- Marshall–Lerner (1.4 → +4.6; 0.7 → −2.6)
- the J-curve
- the tax model in the lab (Pc 12, P₀ 10, Pp 8, t 4, Q 100 → 80, welfare loss 40)

The primary-vs-manufactured excerpt is now labelled HL, as it is in the deck.

**Excerpt rendering.** The deck masters are transparent PNGs. The earlier preview builder flattened them onto black, which made the text halos into harsh outlines. Excerpts are now laid on the decks' own panel colour (#FFFDF8), with a small margin and a discreet footer mark. The revision-map excerpts are cropped to complete branches, never through a word or a box.

## What changed

- **Design system.**
  - Tokens in `src/styles/css-atlas.css` cover surfaces, text, accents, diagram inks, type scale, 8-point spacing, radii, shadows, motion, proportions and focus. They are documented in `docs/design-system.md`.
  - The four typefaces (OFL) are now served from `assets/fonts/` with their licences. No font request leaves the site, and the service worker (v19) precaches the faces the first screen uses.
- **Opening frame.**
  - The statement, the brief's supporting line and two actions: Explore Economics, and Discover the Learning Studio.
  - A compact author signature.
  - A plate of three numbered figures: the live market model in the explainers' inks, the corrected elasticity diagram, and a branch of its revision map.
  - The statistics strip, the verb row and the credentials list have left the cover. The counts now sit beside the pathways, and the credentials are in the About chapter.
- **Explore Economics.** Six pathways drawn as one route, each opening a real page with its own count, above the existing gateway.
- **Inside the Economics Learning Studio.** An exhibition of five pieces in five forms:
  - a featured exchange-rates spread
  - a visual explainer
  - an editorial guide shown as pages
  - an application shown by its title card and contents
  - a series shelf of all ten Economics in 60 Seconds covers
- **One topic, six perspectives.** Price elasticity of demand: understand, visualise, apply, calculate, interact, evaluate. These are keyboard tabs on a vertical rail (chips on phones), each stage independent. The content comes from fragments shared with Learning design, so nothing is written twice.
- **Inside the learning lab.** A miniature of the platform's Predict a diagram lab, using its own indirect-tax questions and explanations. There are five predictions with immediate feedback and focus management, then the model's own diagram, a review, and a link to the full lab.
- **From concept to judgement.** The nine-step progression the resources are designed around, shown with a second real topic, a rupee depreciation, linked to the explainers and the data. Learning design (`#/design`) now follows the same nine steps for PED, including a stakeholder step with the deck's incidence and revenue figures.
- **Enquiry.** The brief's wording. A visitor can choose the resource that caught their interest, and the email names it.
- **Learning Studio.**
  - The showcase takes the brief's name; its address, `#/studio`, is unchanged.
  - Items carry an exhibit form, a verification date and a public line saying what was checked. This is shown on each item page and static page, and the build refuses a published item without it.

## Preserved

All 34 sections and their tabs; search; the labs, mindmaps, diagrams, calculations, Real World, Exam DNA, events, economists, data, tutorials (prices unchanged) and the Resource hub; every home chapter and band after Discover; the five-second opening; offline use; and `localStorage` keys.

## Tests

<!-- filled from the run -->

## Not verified here

- **Vercel.** The deployment (production and this PR's preview) could not be reached from this environment, so the PR's Vercel preview should be checked.
- **Real devices.** Screenshots were taken in headless Chromium, not on physical devices. Safari and Firefox were not tested.
