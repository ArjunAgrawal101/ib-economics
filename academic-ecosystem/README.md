# Arjun Agrawal · The Academic Ecosystem

*Ideas. Knowledge. Perspectives.*

The central website for Arjun Agrawal: educator, academic resource creator and
builder of three independent learning platforms. It introduces the person,
the work and the three platforms, and sends visitors to the right one.

| Platform | Address |
| --- | --- |
| Economics | https://ib-economics-pi.vercel.app/ |
| The Business Brief | https://the-business-brief-dun.vercel.app/ |
| Political Studies & Global Affairs | https://arjun-agrawal-political-studies.vercel.app/ |

This is a separate project. It does not read from, change or depend on any of
the three platforms.

---

## Running it

Requires Node.js 20.9 or later.

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run check        # type-check, lint and production build
npm run build && npm start
```

Quality checks run against a running server (Playwright must be installed):

```bash
BASE=http://localhost:3000 node scripts/qa.mjs --shots qa-screenshots
```

`scripts/qa.mjs` opens every page at 1440, 1024, 768, 390 and 360 px and checks
for horizontal overflow, console errors, broken images, missing alt text, one
`h1` per page, unsafe `target="_blank"` links, unexpected external links,
malformed `mailto:` links, fonts, internal links and anchors. It also tests the
mobile menu (focus, scroll lock, Escape, navigation), the Ecosystem menu, platform
discovery, the intellectual map, the insights filter, copy-to-clipboard, the
skip link and keyboard tabs.

---

## Where to change content

All content lives in four data files. Components read from them, so a change
made once appears everywhere it is used.

| File | What it holds |
| --- | --- |
| `data/site.ts` | **Central configuration.** Name, tagline, profile, biography, current role, education, qualifications, experience, email, social links, the three platforms (names, descriptions, highlights, URLs), navigation and the footer disclaimer. |
| `data/publications.ts` | The Knowledge Series (all eleven volumes), Economics in 60 Seconds (all ten issues) and the other series, each with its publication status. |
| `data/insights.ts` | The featured entries in "Ideas, insights & latest work". |
| `data/content.ts` | Teaching pathways, the six learning principles, the intellectual map (concepts and intersections) and platform discovery. |

### Changing a platform address

Edit `url` for that platform in `data/site.ts`. Header, hero, panels, footer,
discovery, About, Work, Contact and structured data all update.

### Replacing the portrait

1. Export a portrait at least **1200 × 1500 px** (4:5, JPEG or WebP). The
   current image is 652 × 674, sharp enough for today's sizes but a
   higher-resolution original will look better on large and high-density
   screens.
2. Save it as `public/images/arjun-agrawal-portrait.jpg`, or use a new name and
   update `profile.portrait.src`.
3. Update `profile.portrait.width`, `height` and `alt` in `data/site.ts`.
4. To refresh the social sharing image with the new portrait, run
   `node scripts/render-brand.mjs` (it rewrites `app/opengraph-image.png`,
   `app/twitter-image.png` and the app icons).

The hero frames the photo in an arch, focused on the upper part of the image
(`object-[50%_22%]` in `components/sections/Hero.tsx`). Adjust that value if a
new photo is composed differently.

### Updating publications

In `data/publications.ts`:

- **Add a Knowledge Series volume:** add an entry to `knowledgeSeries.volumes`
  and place its cover in `public/images/publications/`.
- **Add an Economics in 60 Seconds issue:** add an entry to `sixtySeconds.issues`
  with its cover in `public/images/series/`. Also update the issue count in
  the status label of `economics-in-60-seconds`.
- **Change a status:** edit `status.label`, and set `status.confirmed: true`
  once you have verified it. Do not use "Published" or add dates, ISBNs,
  publishers or prices unless they are confirmed.
- **Add a new series:** add an entry to `publications`, with `discipline` set
  to `economics`, `business` or `politics` (this sets its accent colour). Leave
  out `link` if there is nowhere to send readers yet; the card then shows an
  Enquire link instead.

### Featuring new work

Add an entry at the top of `insights` in `data/insights.ts`: a LinkedIn
article, carousel, video or announcement, with its real URL. Set
`featured: true` on the entry you want in the large lead position, and remove
it from the previous one. Categories with no entries never appear as filters.

The section is curated by hand. Nothing updates automatically.

### Adding a social profile

Add it to `socials` in `data/site.ts`. Add the address to `EXPECTED_EXTERNAL`
in `scripts/qa.mjs` so the checks accept it, and add a glyph in
`components/ui/BrandIcon.tsx` if it is a new network.

---

## Project structure

```
app/                     Routes (App Router): /, /about, /ecosystem, /work, /contact
  layout.tsx             Fonts, metadata, header, footer, structured data
  sitemap.ts, robots.ts, manifest.ts
  opengraph-image.png    Social preview (rendered by scripts/render-brand.mjs)
  icon.svg, apple-icon.png
components/
  SiteHeader.tsx         Sticky header, Ecosystem menu, mobile menu
  SiteFooter.tsx
  StructuredData.tsx     Person and WebSite JSON-LD
  sections/              One file per homepage or page section
  ui/                    Buttons, headings, monogram, icons
  visuals/               Original SVG illustrations for each discipline
data/                    All editable content (see above)
lib/                     Site URL, metadata helper, accent classes, utilities
public/images/           Portrait, monogram, handbook and series covers
scripts/                 QA, screenshot and brand-asset scripts
styles/globals.css       Design tokens (colours, type), utilities, motion
```

## Design system

- **Colour:** warm ivory (`#f5f0e6`), midnight navy (`#0f203b`), charcoal and
  champagne gold, used as rules and accents rather than as text. One accent per
  discipline: Economics teal-green `#1f6f61`, Business bronze `#93541f`,
  Politics indigo `#3a4795`. All text pairs meet WCAG AA contrast.
- **Type:** Instrument Serif (display), Newsreader (editorial italics and
  long-form ledes) and Manrope (interface and body), self-hosted through
  `next/font`.
- **Mark:** the established AA monogram from the Knowledge Series covers,
  redrawn as a component (`components/ui/Monogram.tsx`).
- **Motion:** a short hero intro (CSS), scroll-driven section reveals (CSS
  `animation-timeline`, so content never depends on JavaScript to appear),
  subtle motion in the discipline illustrations, and Motion for React only
  where content changes in place. Everything is disabled under
  `prefers-reduced-motion`.

## Technical notes

- Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4,
  Motion for React, Lucide icons. No database, accounts, API keys or analytics.
- Every page is statically prerendered.
- The canonical address comes from `NEXT_PUBLIC_SITE_URL`, falling back to
  Vercel's production address (see `lib/site-url.ts`).
- Contact is by `mailto:` links only. There is no form and nothing is stored.
- External links open in a new tab with `rel="noopener noreferrer"` and say so
  to screen readers.

Deployment and the custom domain are covered in [`DEPLOYMENT.md`](DEPLOYMENT.md).
