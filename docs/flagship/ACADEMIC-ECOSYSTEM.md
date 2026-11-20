# The Arjun Agrawal Academic Ecosystem (2026-11-20)

Economics is one of three independent platforms from the same educator. They share one academic identity, ARJUN
AGRAWAL · KNOWLEDGE. INSIGHT. IMPACT., and each keeps its own repository, address and design. This change links the
other two from Economics. It is narrowly scoped to that integration and leaves the rest of the site as it was.

| Platform | Line (the owner's) | Address | Repository |
| --- | --- | --- | --- |
| Economics (this platform) | IB Economics \| Economic Analysis \| Academic Resources | https://ib-economics-pi.vercel.app/ | `ArjunAgrawal101/ib-economics` |
| The Business Brief | IB Business Management \| Strategy \| Leadership \| Decisions | https://the-business-brief-dun.vercel.app/ | `ArjunAgrawal101/the-business-brief` |
| Political Studies & Global Affairs | Indian Polity \| International Relations \| PSIR \| IB Global Politics | https://arjun-agrawal-political-studies.vercel.app/ | its own repository |

## Where the links are

The list is held in one place, `FX_ECO` in `src/modules/44-flagship-core.js`, so changing an address means editing one
line. The previous Business Brief link (`FX_BB`) now reads from the same list.

1. **Main navigation** (`src/modules/47-shell.js`). An **Academic Ecosystem** menu comes after About. It lists the
   three platforms, marks Economics as the one you are on, and opens the other two in a new tab. Below 1360 px, and
   while the exam timer runs below 1600 px, the label shortens to "Ecosystem"; its accessible name stays "Academic
   Ecosystem". This replaces the single "The Business Brief ↗" link, which the bar only had room for above 1360 px.
2. **Mobile menu** (the drawer in `47-shell.js`). An Academic Ecosystem section lists the three platforms, with the
   current one marked. It replaces the "Beyond Economics" section.
3. **Home** (`src/modules/48-home.js`). **Explore the Arjun Agrawal Academic Ecosystem** is an unnumbered section
   between "One concept. Two perspectives." and About. It has three panels, each in its own platform's colours:
   - Economics on charcoal and gold. It is ringed in gold as the current platform, and opens both pathways.
   - The Business Brief on its warm paper with navy and green.
   - Political Studies & Global Affairs on midnight with a burgundy rule.

   It replaces the single Business Brief panel. Each panel is typographic, with a small drawn mark: no screenshots of
   the other platforms.
4. **Footer, on every page** (`tools/migrations/2026-11-19-academic-ecosystem-footer.py`, applied to `index.html`). The
   footer's pathway block is now headed "The Arjun Agrawal Academic Ecosystem · You are on Economics". The two pathway
   cards are unchanged and keep their weight. The sister platforms follow as two quieter, dashed cards, The Business
   Brief and Political Studies & Global Affairs, each with the owner's line.
5. **About** (`src/modules/08-about.js`). A sixth chapter, **The academic ecosystem**, after the platform story, with
   the same three panels as the home page.

Every link to a sister platform opens in a new tab, says so to screen readers, and carries `rel="noopener noreferrer"`.
Neither sister is presented as a third pathway: neither has a pathway colour or a place in the pathway switcher.

## Tests

`src/modules/49-flagship-tests.js` replaces the four Business Brief self-tests with seven Academic Ecosystem tests:

1. The three addresses, names and the current platform are exactly as listed above.
2. The menu, the drawer, the home, the footer and About each link once to each sister platform, in a new tab, with
   `rel="noopener noreferrer"`, the ↗ mark and "opens in a new tab".
3. The menu follows About in the header and marks Economics as current.
4. The sisters are not pathways: no pathway colour, no place in the switcher, and the two pathways keep equal weight.
5. The home section has the brief's heading, the shared identity and the three lines, and makes no claims.
6. The footer names the ecosystem, says which platform this is, and orders the pathways before the sisters.
7. About shows the three platforms after the platform story.

Run `python3 tools/build/splice.py`, then `cd tests && npm test`.
