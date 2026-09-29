# Product audit, before the cover-and-composition release

**Written:** 30 September 2026.

**Basis:** the current source on `main` (50767be, which includes the renaissance release). It was
rendered in Chromium, and 12 routes were captured at 1440, 1280, 1024, 768, 430, 390 and 360 px (84
screenshots, reduced motion). The earlier release reports were read as history, not as a description
of this source; every finding below was checked in the code.

**Architecture, as it actually is**

- **The page.** One static `index.html` (4.68 MB) holds about 36,000 lines of CSS and JavaScript,
  plus `assets/data/real-world.js` and `exam-dna.js`.
- **Routing and state.** Sections register through `SECTIONS`/`VIEWS`, a hash router
  (`routeFormat`/`routeParse`) and a single `render()`. That function is wrapped by about a dozen
  layers: activity log, router sync, ecosystem, renaissance.
- **Storage and offline.** The profile store is versioned in `localStorage` (`AA_IB_ECONOMICS`),
  with import and export. A service worker (v13) serves the app shell cache-first and `/api/`
  network-first.
- **Serverless.** One Vercel function (`api/youtube.js`).
- **Self-tests.** There are 1,923 in-page checks in about 30 suites, run synchronously at start-up,
  plus an 8-suite Playwright harness (150 checks) in `tests/`.
- **Content model.** The platform holds:
  - 31 syllabus subtopics;
  - 20 spine concepts;
  - 157 dictionary terms;
  - 35 diagram plates;
  - 36 calculations;
  - 203 cases (12 deep);
  - 42 mindmaps (762 nodes);
  - 212 Exam DNA questions;
  - 19 Everywhere questions and 16 idea cards;
  - 19 EE areas.

  The search index has 2,442 records across 59 kinds.

## A. Visual weaknesses

1. **The home cover has no author and no scale.**
   - The first viewport says "Think like an economist" beside a supply-and-demand figure, but never
     shows who made the platform or how large it is.
   - The figure is well drawn but inert: nothing on it can be touched.
2. **The About opener draws a section figure behind the portrait.** The diagram's axis and curves run
   under the photograph and are cut off by it: exactly the collision to eliminate.
3. **The cover and the next band are not connected.** The dark opener ends and the page restarts on
   ivory with a numbered heading.
4. **Card grids still carry most bands below the gateway:** "Six ways in", "What should I do next?",
   the 60-second issues, the desk.

## B. UX weaknesses

1. **The primary actions are narrow.** They are "Open the question bank" and "Explore the curriculum".
   There is no single "start here", and no first-screen route to Real World, mindmaps, labs, exam,
   IA, EE or videos.
2. **Research and the creator have no home-page presence.** IA and EE appear only in the gateway
   index, and videos, the educator studio and About appear as small index rows.
3. **Scale signals exist only at the foot of the page** (*Economics at a glance*), where they are not
   clickable.

## C. Information hierarchy weaknesses

1. **No chapter structure.** The home page's bands are numbered 01 to 10, but do not say what part
   of the story each one is: world, theory, lab, exam, research, media, educator, creator.
2. **No ending.** The page ends on the tutoring band. There is no closing invitation to start
   exploring.

## D. Content weaknesses

1. **Case reader.** Its twelve zones hold rich data, but the page has no summary layer that answers,
   at a glance, *what happened, what the economic question is, who gains and loses, and what the
   model misses*.
2. **Mindmap nodes are islands.** A node's detail panel explains the node, but does not offer the
   related case, diagram, calculation or question the platform already holds for its subtopic.

## E. Pedagogical weaknesses

1. **The home model teaches nothing.** It cannot be moved, so the first thing a visitor sees does
   not show the idea of a shift and a new equilibrium.
2. **No named assessment rooms.** The exam area mixes cockpit, reference and analysis without the
   Paper 1, 2 and 3 rooms a student would look for.

## F. Accessibility weaknesses

- The About opener's tags have inline styles with contrast set for the dark band only. That is fine
  today, but fragile.
- The about portrait lightbox button and its figure need re-checking after any recomposition.
- No known axe violations at the last release, across 18 routes at two widths.

## G. Responsive weaknesses

- **Tablet and phone openers.** Between 560 and 999 px the section figure becomes a faint watermark
  behind the heading. It passes the edge checks, but visually sits under the text. The next check
  counts rendered-element overlaps, not scroll width.
- **Test widths.** The width test covers 9 widths; the brief asks for 15, including 834, 1366, 1600,
  1920 and 2560.

## H. Accuracy risks

- **Round-2 audit items still open:** 17 guide diagrams and 10 concepts not yet on the site; case
  figures needing sources; Exam DNA part marks.
- **New work.** Any new figure must be recomputed in the self-test, as the renaissance motifs are.

## I. Economic diagram risks

An interactive home model must keep its equilibrium on both curves at every slider position, and
must say "demand shifts" rather than "price rises causes demand to rise".

## J. IB terminology risks

- **Guide edition.** The reference layer rests on the Economics guide, first assessment 2022. A
  "first assessment 2024" copy is referenced online but could not be retrieved, and ibo.org is
  blocked from this environment.
- **Scale signals.** Any figure shown as a scale signal must be counted from data, never typed.

## K. Technical risks

- `render()` is wrapped by about a dozen layers, so a new wrapper must return what it was given and
  never throw.
- `conceptPage` is declared twice; the second declaration wins.
- The build splices the new module between markers, which keeps rollback clean.

## L. Performance risks

- The start-up self-test runs synchronously, so every added check and every heavier view costs
  DOMContentLoaded time. The last release cost about 650 ms.
- The portrait is a base64 JPEG inside `index.html`, so reusing it on the home page costs nothing
  in download, but it must be decoded once more.
- New interactive figures must redraw only their own SVG, never the page.

## M. Copyright and source risks

- All figures are original SVG. The three photographs are the author's own, already embedded.
- No IB logo is used.
- Exam DNA holds metadata only.
- New text must be original, and must label teacher-created material as such.
