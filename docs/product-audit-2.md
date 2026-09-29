# Product audit, before the "Think like an economist" release

**Written:** 29 September 2026.

**Basis:** the source on `main` at 3a433d8 (the "cover and composition" release). It was read in
full where the brief touches it and rendered in Chromium.

**The live site.** The deployed site (ib-economics-pi.vercel.app) could not be opened from this
environment, because the host is blocked by the network policy. Vercel deploys `main`, so the
source is what is live, but the deployed build itself was not inspected.

**Three independent red-team audits** were run on the content before any correction. Their reports
are summarised in sections J to M:

- diagrams: 36 plates and 28 opener figures, recomputed;
- calculations: 36 calculators, four marking paths and seven tool models, evaluated in the page;
- Real World: 203 cases, 12 deep cards and the worked stories.

## A. Visual design

1. **The logo is a raster image.** It is a 760 × 462 palette PNG (and a 330 × 251 monogram) drawn
   as a CSS background. It blurs wherever it is shown larger than its pixels: the opening screen,
   and any 2× display.
2. **The favicon is not the brand.** It is an abstract cross, and the PWA icons are rasters of an
   older mark.
3. **The portrait is small beside the live model.** It reads as an author card, not part of the
   platform's identity.
4. **No recurring economic texture.** Each section has a register (paper, graph paper, newsroom),
   but nothing draws on the economics of the section itself.

## B. Typography

1. **"Think like an economist." is a secondary line.** On the cover it is small italic text under
   another headline; on the opening screen it is italic body size.
2. **The scale figures are set in the display serif.** They read as headings, not data.

## C. Information hierarchy

1. **The home narrative does not match the brief's story.** The chapters are platform, world,
   theory, lab, exam, research, media, educator and creator. There are no Learn, Interact, Connect
   or Watch chapters.
2. **Two numbering systems on the home page.** Each band keeps its own running number inside the
   numbered chapters.

## D. Navigation

1. **The exam rooms stop at ten.** There is no calculation room, diagram practice, evaluation
   trainer or command-terms room.
2. **The IA has no path.** Its five tabs do not connect to the EE Studio's diagram, evidence and
   evaluation tools, or to the Economic Chain.

## E. Content depth

1. **No optional advanced layer.** Nothing tells a curious reader what a model assumes, what the
   evidence shows, or where economists disagree.
2. **Misconceptions are hard to find.** They sit in the Misconception lab and in each concept's
   "common error" field, but not beside the idea they confuse.

## F. Pedagogical quality

Case briefs mix fact, interpretation, model and exam guidance without saying which is which.

## G. Interaction

The cover's concept chips do nothing until clicked. A hover or focus could teach the definition
first.

## H. Accessibility

No known axe violations at the last release. The new work was to be checked the same way.

## I. Responsive behaviour

1. **Wide cover.** A three-column cover must keep economics first below 1280 px.
2. **Long pages.** The home and About pages were long on phones; About in particular was mostly
   prose.

## J. Diagram accuracy (round-3 red team)

- **No plate is economically wrong.** All 36 plates validate with at most 0.03 px between a point
  and its curve.
- **Ten issues:**
  - 15 cases describing an LRAS shift open the Keynesian AS plate;
  - the elasticity lab draws no curve for perfectly inelastic demand, and lets the line run off
    the axes;
  - the PED plate's D₁/D₂ labels read as a shift;
  - the PES and FX plates state shifts in the wrong units;
  - the PPC opener's point C lies outside both frontiers;
  - the shift-arrow tip falls short of D₁, and the FX opener's axis is unlabelled;
  - supply-shock and demand-fall cases point at static plates;
  - the PPC is filed under the global economy.
- **Found while fixing these:** four labels cut off or colliding in figures ("Pw + tariff", SRPC,
  MR, the quota plate).

## K. Economic accuracy

All 36 calculators' formulas are right. Five marking problems stop correct answers from counting:

- a signed PED marked wrong in the gym;
- questions that ask for something other than what they mark;
- "0,75" read as 75;
- a Unicode minus read as plus;
- no minus key on the iOS decimal keypad.

There were also eight minor problems: tolerances, impossible inputs accepted, wrong wording at zero
net flows, and a Lorenz ratio of 10⁹.

## L. IB accuracy

1. **Guide edition.** The reference layer still rests on the Economics guide, first assessment
   2022. The current edition could not be confirmed, because ibo.org is blocked from this
   environment. This is recorded, not merged.
2. **Source labels.** The exam rooms already separate official IB information from teacher-created
   material; new rooms must keep that separation.

## M. Source integrity (Real World red team)

46 findings in 43 cases:

- **2 critical.** The US–China bilateral deficit is described as "unmoved"; in fact it fell from
  $419bn in 2018 to $279bn in 2023.
- **9 major.**
  - A mechanism error: the auto-enrolment case ignores the employer contribution.
  - Contested causes stated as fact.
  - A wrong adoption year for the Stability and Growth Pact.
  - An out-of-date statement on India's rural job guarantee.
- **35 minor**, 9 of them out of date.

## N. Performance

DOMContentLoaded is dominated by the synchronous start-up self-test; first paint is about 0.4 s.

## O. Duplication

45 of 182 terms appear in two datasets (the glossary and the examinable definitions). The only pairs
with different wording ("economic growth", "negative externality") say the same thing at two
levels of detail. This is intentional repetition, not contradiction.

## P and Q. Overflow and overlap

The overlap audit covers 20 routes at 15 widths. It did not check labels running past their own
figure, or opener figures and plates outside those routes. Both checks are added in this release.

## R. Broken states

- The calculation board's comma and minus parsing.
- The Lorenz tool's ratio and Gini for zero shares.

## S. Weak states

The welcome dialogue shows the full logo at 190 px, where its tagline cannot be read.

## T. Empty states

The Lorenz tool with no income shows a Gini of 1, "very high", for a distribution that does not
exist.

## Profile facts

The brief suggests possible About milestones: MA Economics, MA Political Science, UGC NET /
MH-SET. **None of them is in the project's supplied profile.** The About page uses only what the
profile holds:

- St. Stephen's College, University of Delhi;
- Assistant Professor at Fergusson College, Pune;
- IB DP teaching at BLISS and Symbiosis International Schools, Pune;
- the three subjects;
- UPSC Economics mentoring;
- resource design.

The suggested milestones are listed in the release report for confirmation before they are added.
