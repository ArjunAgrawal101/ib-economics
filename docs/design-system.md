# Design system

This is the visual system behind the platform and the Learning Studio. Tokens are CSS custom properties defined in `src/styles/css-atlas.css`, on top of the original tokens in `src/styles/css.css`. The launch layer, `src/styles/css-launch.css`, uses the same tokens. Components should use the tokens, not raw values.

## Character

Editorial rather than template, and academic rather than corporate. Figures are presented the way a serious publication presents them: numbered, captioned and given room. Motion explains or reveals; it never decorates. Every graph is drawn to scale and checked.

## Colour

The palette is small and deliberate.

| Role | Token | Value |
|---|---|---|
| Page | `--sf-page` | `#F8F6F1` chalk |
| Band | `--sf-band` | `#F2EDE2` paper |
| Card | `--sf-card` | `#FFFFFF` |
| Figure plate | `--sf-plate` | `#FFFDF8`, the explainers' own panel colour |
| Ink surface | `--sf-ink` | `#16181C` obsidian |
| Text | `--tx-strong` / `--tx-body` / `--tx-quiet` | `#1A1C20` / `#43484F` / `#5F656B` |
| Text on ink | `--tx-on-ink` / `--tx-on-ink-quiet` | white at 92% / 70% |
| Primary accent | `--ac-bur` | `#7A2436` burgundy: actions, rules, figure numbers |
| Secondary accent | `--ac-brass` | `#C9AE72` brass, used on ink only |
| Lines | `--ln-hair` / `--ln-rule` | `#E3DED3` / `#CFC9BC` |

The diagram inks are taken from the explainers and used **inside figures only**:

| Token | Value | Use |
|---|---|---|
| `--dg-ink` | `#0E1E3A` | axes |
| `--dg-navy` | `#1B3460` | the original curve |
| `--dg-gold` | `#B08A47` | the new or shifted curve |
| `--dg-ok` | `#2E6E52` | feedback: matched the model |
| `--dg-no` | `#A8432F` | feedback: the model differs |

Never introduce a new hue for decoration.

## Type

The typefaces are served by the site from `assets/fonts/` under the SIL Open Font License; the licences are in that folder. There are no third-party font requests.

| Role | Family | Token |
|---|---|---|
| Display headings, figure titles | Bodoni Moda | `--ff-display` |
| Reading text | Source Serif 4 | `--ff-text` |
| Interface, labels, metadata, controls | Manrope | `--ff-ui` |
| Numbers, figure marks, stations | JetBrains Mono | `--ff-mono` |

The scale runs `--fs-xs` (12) · `--fs-sm` (14) · `--fs-md` (16) · `--fs-lg` (17–19) · `--fs-xl` (21–26) · `--fs-2xl` (26–36) · `--fs-3xl` (32–52). The cover headline is the one exception, at 36–62 px.

Below about 24 px, Bodoni renders with wide tracking. Use Source Serif for small serif labels, such as names in signatures.

## Space, shape, depth and motion

- **Space:** an 8-point scale, `--sp-1` (4) to `--sp-9` (96). Sections use `clamp()` padding.
- **Radii:** `--rd-sm` 6, `--rd-md` 10, `--rd-lg` 14, `--rd-pill`.
- **Shadows:**
  - `--sh-1` for cards that sit on the page;
  - `--sh-2` for figure plates that sit on ink.
- **Motion:**
  - `--mo-fast` 140 ms for state changes;
  - `--mo-base` 240 ms for hover and focus;
  - `--mo-slow` 420 ms for reveals;
  - easing `--mo-ease`.

  Every transition is removed under `prefers-reduced-motion`.
- **Proportions:**
  - `--ar-plate` 16/10 for figure frames;
  - `--ar-page` 3/4 for document pages;
  - `--ar-cover` 4/5 for series covers.
- **Focus:** `--fc-ring`, 2 px burgundy, on paper; `--fc-ring-ink`, 2 px brass, on ink. Focus is always visible.

## Breakpoints

Media queries cannot read custom properties, so the breakpoints are fixed:

- 520: narrow phone
- 640: phone; the hero shows only the live model
- 900: tablet; the journey rail becomes horizontal chips
- 1100: small desktop; the hero stacks
- 1440: wide

## Figures and excerpts

- **Numbering and captions:** figures are numbered (`Fig. 1`) with a short caption in Manrope and the mark in JetBrains Mono.
- **Resource excerpts:**
  - They are WebP files in `assets/studio/`, built by `tools/studio/build_previews.py`.
  - A transparent master is laid on `--sf-plate`, with a small margin in the same colour.
  - Each carries a quiet footer strip reading "Selected preview · Arjun Agrawal".
  - Never crop an excerpt through a word or a box; choose a complete branch or region instead.
- **On-page wording:** where the site needs to say that a resource is incomplete, use one discreet line: "Selected preview. The complete resource is not included." Do not label every image.

## Exhibit forms

The Learning Studio's exhibits take one of four forms, chosen by the asset:

| Form | For | Treatment |
|---|---|---|
| Visual | Diagrams, infographics, mindmaps | One strong excerpt on a plate |
| Editorial | Guides and documents | Pages laid side by side on a paper desk |
| Interactive | Applications and labs | A working miniature, or the application's own title card and contents |
| Series | Collections | A shelf of consistent covers |

The home page's featured exhibit is a three-excerpt spread with a short editorial account beside it. It should never be the tallest thing on the page, so its side excerpts have a fixed height.

- **Form badge.** Each exhibit's kicker leads with its form as a small outlined badge (`.ex-ty`), so a visual, an editorial guide, an application and a series are told apart at a glance.
- **Guides on the home page.** A guide shows one page in front of a stacked second page, at a size where its headings can be read.

## Header

- **One bar, eight destinations.**
  - Course, Learn, Lab, Real World, Practise, Exam, Mindmaps and Resources; More and Tutorials close it.
  - Items are withdrawn only when measured to collide, and Resources is the last to go.
  - Fixed width tiers are not used, because they withdrew items that fitted.
- **Folded tools.**
  - The timer is one stopwatch control while it is idle, and its readout returns once it runs.
  - The profile shows its initial.
  - Each tool is 36px square, with a hairline border that darkens on hover.
- **Link states.**
  - Hover draws a hairline underline from the left.
  - The current page carries the 2px burgundy rule.
  - Focus is the burgundy ring.
- **Below 1180px.** A Resources button (`.resdoor`, outlined burgundy) sits between the brand and the menu. Below 360px it gives way to the wordmark.

## Resource doors

The home page's resources band uses one card form (`.rs-a`):
- a figure plate in the explainers' inks (5:3), drawn to its model and asserted in the self-tests;
- the name in Bodoni;
- one line in Manrope;
- the count in JetBrains Mono.

Hover lifts the card by 2px, deepens its border and moves the arrow. Below 720px the doors become two columns of short cards, and below 520px the description is dropped.

## Motion

- **Reveals** fade blocks up by 14px over 560ms as they arrive. They apply only to blocks the script marks as below the fold, only while the motion layer (`body.rn-anim`) is on, and never during the self-test.
- **Which blocks.** Large blocks only: cards, exhibits and panels, never paragraphs or labels.
- **Reduced motion** removes every reveal and transition.
