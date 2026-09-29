# Visual audit, before the renaissance release

**Written:** 29 September 2026.

**Basis:** the build on `main` (d8efb20), rendered in Chromium at 1440 × 900 and 390 × 844, with its
web fonts loading. There are 16 screenshots at each width, covering: home, course, learn, a concept
page, think, lab, Real World, mindmaps, practise, exam, IA, EE Studio, Economics Everywhere, video,
educator and about.

The CSS and the SVG generators were also read, so every finding below points at a cause rather than
an impression.

## Summary

The visual system is not careless. It has:

- a real palette of tokens;
- four typefaces with defined roles;
- semantic diagram colours;
- a 44 px target discipline;
- a considered focus ring.

It feels plain for five structural reasons:

1. **One opening for every page.** About 190 heroes, from the home page to a single concept, share
   one dark band and one decorative graphic: two crossing lines with a pulse. A student cannot tell
   Mindmaps from the Exam room from the EE Studio by looking. The graphic is also economically
   empty: it shows the same supply-and-demand cross above *comparative advantage*, *inequality* and
   *exam technique*.
2. **One container for every idea.** Almost everything is a white rectangle with a 1 px hairline:
   panels, tiles, cards and callouts. The home page is 14 bands and about 11,400 px of that
   rectangle, in a two- to four-column grid. There is no change of scale, no feature item and no
   full-bleed moment after the hero.
3. **No economic imagery outside the labs.** The accurate diagram engines (market lab, AD-AS,
   Lorenz, FX, diagram atlas) live only inside their tools. Nothing in the navigation, section
   openers, empty states or footer says "economics" visually.
4. **Typography that is inconsistent where it matters most.**
   - The page type (Bodoni Moda, Source Serif 4, Manrope, JetBrains Mono) is premium.
   - But diagram and chart labels ask for fonts that are never loaded (Inter, IBM Plex Mono,
     Helvetica, Georgia), so every chart falls back to a different system face.
   - Eyebrows are 11 px mono in grey, which reads as metadata, not as a signpost.
5. **A flat rhythm.** Section headings are identical (number, serif title, burgundy underline),
   bands have near-identical padding, and no section has its own texture or mood.

## Findings

| # | Current problem | Why it feels basic | Proposed solution | Implementation area |
|---|---|---|---|---|
| 1 | Every hero reuses `heroPlot()`: the same crossed lines on obsidian | Removes place-making; the graphic is decoration, not information | A section- and concept-aware **motif engine**: each opener draws an accurate, labelled diagram for what the page is about, with a figure caption | `heroPlot()` (one function, about 190 call sites) |
| 2 | All sections share one dark opener | No identity per section | **Section identities** through `body[data-sec]`: paper openers for scholarly sections (Course, Learn, IA, EE, TOK, Educator), a newsroom rule for Real World, a lab grid for Lab, ruled exam paper for Exam, a network field for Mindmaps, magazine type for Everywhere | Render wrapper and CSS |
| 3 | Home: 14 equal-weight bands, mostly card grids | CARD CARD CARD rhythm | Editorial sequence: animated hero model → journey → an **Explore Economics** atlas (asymmetric, one motif per destination) → idea of the day and Random Economics → a Real World lead story → Mindmaps network → lab → Everywhere → EE → video → exam → your desk → educators → at a glance → about. Existing bands are kept and regrouped, not deleted | `VIEWS.home` wrapper |
| 4 | Chart text uses unloaded fonts | Charts look foreign to the page | Map every SVG label to the loaded UI and mono faces with one CSS rule (CSS outranks SVG presentation attributes) | Global CSS |
| 5 | Eyebrows: 11 px mono grey | Weak signposting | Eyebrows become small-caps sans with a brass rule; mono is reserved for data | Type roles |
| 6 | No background system | Pages are flat chalk | Six CSS/SVG textures at 3–6 % opacity: analytical grid, curve watermark, trade network, ledger lines, research margin, concept dots. Each is used by one section | Background tokens |
| 7 | Accent colour is burgundy only | Monotone, or too red when overused | Add **brass** (from the logo's gold), **graphite**, **slate** and **ivory**. Burgundy stays the signature, brass is for rules and ornaments, slate is for professional areas | Tokens |
| 8 | Callouts differ page by page (note, n, p, ee-fb…) | No recognisable teaching components | 13 named components (Key idea, Model, Misconception, Exam connection, Real-world connection, Think like an economist, Source note, Policy note, Data point, Puzzle, Snapshot, Case study, Deeper dive), each with its own glyph and treatment | `KC()` component |
| 9 | Footer: logo, columns of links | Utility footer, not a publication colophon | A colophon: wordmark and proposition, a supply-and-demand rule line, an **Explore** index of the major areas, independence language, and a "Think like an economist" question | Footer markup |
| 10 | No discovery surface | Depth is invisible; there are 2,442 index records | **Random Economics** (a typed, editorial "surprise me") and **Economic idea of the day** (date-deterministic, no server) | New module |
| 11 | The "Think like an economist" tagline is not a system | Slogan only | An 18-lens **Economist's toolkit**, with recurring prompts placed on concept pages, cases and the home page | New module |
| 12 | Motion: fade on view only | Static and lifeless | Motif curves that draw on first view, a pulsing equilibrium, count-up statistics, and heading rules that extend. All motion stops with `prefers-reduced-motion`, and none runs during the self-test | Motion layer |
| 13 | The mobile hero is a text-only dark block with the motif cropped to a corner | Loses the economics on phones | The motif scales into a figure strip under the heading on narrow screens | Responsive CSS |
| 14 | Section headings are all identical | No hierarchy between a feature and a list | Two scales: *feature* (oversized serif with a brass ornament) for home and section bands, *standard* for inner lists | `.shead` variants |

## What is not a problem, and stays

- **Palette and brand.** Obsidian, burgundy and chalk remain the foundation.
- **Diagram colours.** The semantic diagram colours (demand blue, supply copper, and so on) are
  correct and are kept: brand colour never enters a diagram.
- **Controls.** 44 px targets, the focus ring, the skip link and the reduced-motion rule are kept.
- **Content.** Content density is right for a study tool. The fix is rhythm and hierarchy, not
  less content.

## Constraints on the redesign

- **Content and features.** No content, route, tab, storage key or feature is removed.
- **Graphics.** Every graphic is original SVG or CSS. No stock imagery and no external images are
  added. Any motif that shows a diagram draws it correctly, with labelled axes, labelled curves and
  its equilibrium at the true intersection.
- **Size.** The added CSS and JavaScript are measured and reported.
