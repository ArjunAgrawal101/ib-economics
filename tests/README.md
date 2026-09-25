# Browser tests

The platform tests itself: open the site and it runs its built-in self-test
suite in your browser (reported in the console and at **About → Quality
report**). The scripts here check what a page cannot check from inside
itself: that every route opens cold as a deep link, that nothing overflows at
real screen widths, that the journeys a user takes work end to end, and that
the service worker makes the platform usable offline.

They live in this folder, with their own `package.json`, so the site itself
stays free of dependencies and build steps.

```bash
cd tests
npm install            # installs Playwright
npx playwright install chromium   # skip if a Chromium is already available
npm test               # runs every suite
```

| Script | What it checks |
|---|---|
| `selftest.mjs` | The built-in suite passes in a real browser; data loads from `assets/data`; a first visit shows no test fixtures. |
| `e2e.mjs` | Routing (Back, reload, deep links), search and its filters, Economics, Everywhere interactions, saving, remembered settings, assignment links. |
| `pwa.mjs` | Service worker registration, precache, manifest icons, a deep link opened offline. |
| `widths.mjs` | Major routes and every kind of Economics, Everywhere page at 320, 375, 390, 412, 768, 1024, 1280 and 1440 px: no horizontal overflow, no page errors, usable touch targets, and no sideways-scrolling table a keyboard cannot reach. |
| `routes.mjs` | Every section and tab opened cold at 375 px and 1366 px. |

To use an existing Chromium instead of downloading one, set
`PW_CHROMIUM=/path/to/chromium`.
