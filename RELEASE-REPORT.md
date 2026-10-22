# Release report: final polish, "Think like an economist."

Branch `claude/upbeat-hawking-69d7gz` ([ArjunAgrawal101/ib-economics#10](https://github.com/ArjunAgrawal101/ib-economics/pull/10)). It is not merged and not deployed. The previous report, for the pre-launch pass, is in `docs/releases/2026-10-22-launch-report.md`.

## What changed

- **The signature leads the cover.**
  - "Think like an economist." is the home page's only `h1`, set as "Think like / an economist." with the second line in brass italic. It is 44–80px on desktop and 38–52px on a phone, and never leaves a line holding a single word.
  - It is followed by:
    - the idea, "Economics is not just a subject to study. It is a way to understand the world.";
    - one line on the platform, "An interactive IB DP Economics learning ecosystem connecting economic concepts, visual understanding, real-world evidence and exam thinking.";
    - two actions, Explore Economics, which goes down the page, and Explore Resources, which opens the Resource hub at `#/resources`.
  - The small eyebrow now reads only "IB DP Economics".
- **The author signature.**
  - **The photograph.** The repository holds two photographs from the same sitting:
    - the full-length blazer photograph embedded in the page, which carries a small sparkle mark in its lower corner;
    - `assets/brand/arjun-agrawal-portrait.jpg`, a head-and-shoulders original that was unused.

    The signature uses the second, cropped to 4:5 and resized, and nothing else is changed. The derivative is `assets/brand/arjun-agrawal-portrait-4x5.webp` (432 × 540, 24 KB); the original is unchanged.
  - **The size.** The portrait is 118–134px wide on desktop, against 72px before. That is 1.6 to 1.9 times as wide, and up to three and a half times the area. On a phone it is 104px wide.
  - **The block.** It shows "Created by", the name, "IB DP Economics Educator and Resource Designer", and links to About and to the Learning Studio.
  - **Placement.** It sits level with the foot of the figures, as a cell of the cover's grid rather than under a rule. On a phone it follows the live model.
- **The figure group.**
  - **The live model.** It leads at 1.6 times the width of the two excerpts, which share its height, keep their own proportions and use the same padding, radius, shadow and caption type.
  - **A taller plot.** The model is drawn taller (viewBox 600 × 630, was 600 × 440), so it fills its figure instead of leaving a large gap, and its axis and point labels are larger.
  - **Fig. 3.** It is now the revenue diagram from the elasticity explainer, which is almost square and continues the story of Fig. 2. It replaces the wide mindmap branch, which could only be shown small in a tall cell.
  - **Narrower screens.** Between 900 and 1100px the cover keeps two columns, with the live model alone beside the words. Below 900px the figures follow the words.
- **The background.** The grid fades out behind the words and stays behind the figures, and the burgundy light is softer.
- **From the cover to the paper.** A brass hairline marks the edge, and a short warm band fades into the cream, holding the chapter marker. It replaces a hard edge.
- **Explore Economics Resources.** The section now says what it holds: "Go straight to the platform's visual explanations, mindmaps, diagrams, real-world examples, calculations and exam practice". Its eight doors and the Resource hub's library are unchanged.
- **Motion.**
  - On a return to the home page, the cover's words, signature and figures rise 10px and fade in over 340ms, 36ms apart (under 0.6s).
  - It does not play on a first visit, where the opening sequence is the entrance, nor with reduced motion, nor during the self-test.
  - Hover states on the excerpts and signature links are refined.
- **Offline.** The service worker (v20) precaches the new portrait.

## Economics accuracy

- **Fig. 2, the elasticity diagram (PED_07).** The image served (`assets/studio/price-elasticity-of-demand/01-elastic-inelastic.webp`) was inspected:
  - "D relatively price inelastic" labels the steep navy curve, and "D relatively price elastic" the flat gold curve.
  - The price falls from $40 to $30 (−25%).
  - The steep curve goes from 50 to 55 (+10%, PED = −0.4) and the flat curve from 50 to 75 (+50%, PED = −2).
  - The tick spacing is even (about 6.5px per unit on both curves), and the figure states "Same axes, same scale", so the comparison is not distorted by scale.
  - This image was built from the generator corrected in the Atlas pass. The deck's own source on the `presentation-assets` branch still has the earlier label placement; the correction is supplied separately for the owner to apply.
- **Fig. 3, the revenue diagram.**
  - The price rises from $40 to $60 (+50%) and quantity falls from 70 to 63 (−10%), so PED = −0.2 and demand is inelastic.
  - Total revenue goes from $2,800 to $3,780. The gain is $1,260 ((60 − 40) × 63) and the loss $280 (40 × 7); the net change, +$980, matches.
  - The caption says "with inelastic demand, a price rise raises revenue".
- **Fig. 1, the live model.**
  - Demand is P = 9 − 0.8(Q − s) and supply is P = 1 + 0.8Q. Equilibrium is Q = 5 + s/2 and P = 5 + 0.4s, so a rise in demand raises both price and quantity.
  - The reading explains the shortage or surplus that moves price.
  - When demand moves, the original curve stays dashed and labelled D, and the new one is D₁ with P₁ and Q₁.
  - **Fixed in this pass:** with demand moved fully left, the "Demand" marker sat beyond the drawn end of the curve. It now stays on the curve.
  - A new self-test checks every marked point at every slider position.

## Tests

All twenty browser suites were run in sequence on this branch, in headless Chromium.

- **19 of 20 suites pass: 520 checks, no failures.** They are:
  - api-youtube, selftest, e2e, ecosystem, renaissance, cover, pwa and widths;
  - overlap, routes, course, transform, events, tabs, notices, events-scroll and final;
  - studio and launch.
- **Built-in self-tests:** 2,118 run at start-up, all passing. New checks confirm:
  - the cover leads with "Think like an economist.", then the new headline, the new description and both actions, with Explore Resources linking to `#/resources`;
  - every marked point on the live model lies on its drawn curve at every slider position;
  - the portrait is the original's 4:5 crop;
  - the entrance never plays with reduced motion or during the self-test.
- **Cover (`tests/cover.mjs`, 35 checks).**
  - At 1440, 1024, 390 and 320px the portrait never meets the model or any text, and nothing scrolls sideways.
  - Explore Resources opens the Resource hub.
  - The signature's link opens the Learning Studio.
- **Accessibility.** axe (WCAG A/AA) finds no violations on the cover or the home page's sections at 1440 and 390px. It runs after the cover's entrance has finished.
- **Overlap audit: 141,671 elements over 540 route-widths, no overlaps.**
  - The first run reported one collision at 320px: the hover label of the model's "Demand" point over the diagram.
  - The audit's cursor was resting on that point after it dismissed the welcome dialog. With the taller plot, the point now lies where the cursor was.
  - A hover label is meant to overlay its figure, so the audit now moves the cursor off the page before measuring. The re-run is clean.
- **Intro (the five-second opening): fails in this environment, on this commit and on the previous one.**
  - The opening waits for the app to be ready before it leaves. In this session the container has become slower, and start-up now takes 5.4–6.1s to the ready signal on both this commit and the previous one (`6600e4a`). Earlier today the previous commit was ready on a deep link in 3.7s and passed this suite.
  - Run now against that previous commit, the suite fails in the same way: the opening leaves late, at about 5.7s.
  - On this commit, the checks that do not depend on start-up time pass, including Skip, which leaves within 235ms.
  - It should be re-run on a normal machine before release.
- **Production build.**
  - `tools/studio/build_studio.py` and `tools/build/splice.py` regenerate identical output.
  - The only new asset is the 24 KB portrait. The service worker (v20) precaches it.

**Visual review** was done on screenshots captured and inspected in this session at 1920, 1440, 1280, 1024, 768, 390 and 320px. Problems found and fixed:
- a large empty area inside the live model's figure;
- the mindmap excerpt sitting small in a tall cell;
- the model squeezed to one grid column on phones;
- unequal button heights on phones;
- a 1,414px-tall hero at 1024px, now two columns at 712px;
- a visible step at the end of the warm band below the cover;
- the model's demand marker leaving its curve.

## Remaining issues

- **The deck's own source.** The PED_07 correction has not been applied to the deck's generator on the `presentation-assets` branch, which is outside this branch. The site shows the corrected image.
- **Diagram labels.** The live model's axis labels render at about 11–12px on phones, which is legible but small. The excerpts' labels are smaller at hero size; each opens its Learning Studio item, where it is shown large.
- **The opening on slow devices.** It ends after the app is ready, so on a slow device it can run past five seconds. This is the opening's existing behaviour, seen here because the test machine slowed.

## Not verified here

- **Vercel.** The deployment and this PR's preview cannot be reached from this environment, so the PR's Vercel preview should be checked.
- **Browsers and devices.** Tests and screenshots used headless Chromium only. Safari, Firefox and physical devices were not tested.

## Files changed

| File | Purpose |
|---|---|
| `src/modules/07-cover.js` | The cover's new hierarchy, the author signature as its own cell, Fig. 3, a taller live model, and the demand marker kept on its curve. |
| `src/modules/40-launch.js` | The band's description, the cover's entrance, and new self-tests. |
| `src/styles/css-launch.css` | The cover's layout, type, signature, figures, background and breakpoints, and the warm band below it. |
| `src/modules/09-tests.js`, `src/modules/38-studio.js` | Self-tests updated for the new headline and actions. |
| `assets/brand/arjun-agrawal-portrait-4x5.webp` (new) | The 4:5 crop of the original portrait (the original is unchanged). |
| `service-worker.js` | v20; precaches the portrait. |
| `index.html` | Rebuilt by the splice. |
| `tests/cover.mjs`, `tests/studio.mjs`, `tests/overlap.mjs` | The new actions and headline; the scan waits for the entrance; the cursor leaves the page before the overlap audit measures. |
| `README.md`, `docs/design-system.md` | The cover and its entrance documented. |
| `RELEASE-REPORT.md`, `docs/releases/2026-10-22-launch-report.md` | This report; the previous one archived. |
