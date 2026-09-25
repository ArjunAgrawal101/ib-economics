# Release report

**Arjun Agrawal · IB DP Economics** · final production release

## Build identity

```text
CONTENT_VERSION:    2026.09
BUILD_TIMESTAMP:    2026-09-22T21:45:00+05:30
GIT_COMMIT:         not applicable, this package was not built from a git working tree
INDEX_HTML_SHA256:  7815dd227c1f18d5775790e4720b15a8d3e5f87e0d2bca198145f1814d059829
ZIP_SHA256:         published beside the archive, see "A note on the ZIP hash" below
```

Both hashes were produced programmatically by `sha256sum`. Neither was typed by hand. Every digest
in this report is SHA-256 and is named as such.

### A note on the ZIP hash

A file cannot state the hash of the archive that contains it. Writing `ZIP_SHA256` into this
report changes the report, which changes the archive, which changes the archive's hash, and the
value written would be wrong the moment it was written. Rather than print a number that cannot be
correct, the archive's hash is published outside it, in `SHA256SUMS.txt`, which is delivered
alongside the ZIP and is also quoted in the delivery message.

What the archive can prove about itself, and does, is that the `index.html` inside it is the one
that was tested. That is the hash above, and the verification chain is in section 9.

To check the archive yourself:

```sh
sha256sum arjun-agrawal-ib-economics.zip        # compare with SHA256SUMS.txt
unzip -p arjun-agrawal-ib-economics.zip arjun-agrawal-ib-economics/index.html | sha256sum
# the second value must equal INDEX_HTML_SHA256 above
```

---

## 1. What changed in this release

This release does one thing: it replaces the platform's claim that the IB website could not be
reached with a record of what was actually read there. The educational content was not rewritten.
Every syllabus, assessment and command-term claim was re-checked, and where the check agreed with
the platform, nothing was touched. Three discrepancies were found, all outside the teaching
material, and all three are fixed and listed in section 3.

The previous release marked live verification **NOT EXECUTED** because outbound access from the
build environment is refused. That is still true of the build environment: `curl` to `ibo.org`
returns `CONNECT tunnel failed, response 403`. What changed is that the retrieval tooling available
to this session reaches those pages even though the shell does not, so the check was run. Every
page named in section 2 was retrieved and read on 22 September 2026.

---

## 2. Live verification against the IB

Nine claims were checked against the IB's own pages. Eight are verified; one could not be
established and is recorded as not verified rather than asserted. The same table is published
inside the platform, under **Exam → IB reference layer → Live verification**, with a link to each
source, so a reader can repeat the check rather than take this report's word for it.

| Claim | Official source | Published | Status |
|---|---|---|---|
| The nine key concepts are scarcity, choice, efficiency, equity, economic well-being, sustainability, change, interdependence and intervention | Economics in the DP, official IB subject page | no dated revision line on the page | **VERIFIED** |
| The course is studied through six real-world issues | Economics in the DP | no dated revision line | **VERIFIED** |
| The internal assessment is a portfolio of three commentaries on published extracts from the news media, using the key concepts as a lens | Economics in the DP | no dated revision line | **VERIFIED** |
| SL candidates sit two examinations, HL candidates sit three | Economics in the DP | no dated revision line | **VERIFIED** |
| The guide first assessed in 2022 is still the current course | Read curriculum updates | last updated 24 March 2026 | **VERIFIED** |
| Session arrangements are set by the Diploma Programme Assessment procedures for that session | Diploma Programme Assessment procedures 2026 | 2026 session edition | **VERIFIED** |
| Digital examinations are available to all IB World Schools for selected subjects from November 2026, and Economics is not among the subjects named | Digital examinations for the DP and CP | no dated revision line | **VERIFIED** |
| The models of calculator permitted are set by the IB for each session and published to schools | Exam calculator policy | last updated 19 February 2026 | **VERIFIED** |
| The IB publishes short subject briefs for Economics SL and HL | linked from the subject page | not established | **NOT VERIFIED** |

The nine key concepts were compared word for word and in order. The curriculum updates page lists
revised courses by first teaching year for 2024, 2025, 2026 and 2027; Economics appears in none of
them, which is what now supports the statement that the 2022 guide is current. The digital
examinations page names language and literature and language acquisition, states that specimen
materials were released in May 2025 and that a pilot runs in May 2026, and says the timeline is
subject to change.

Two IB pages returned a site maintenance notice on the first attempt and their real content on a
later one. Nothing was recorded from a maintenance page.

### What the live check did not establish

- **The Economics subject briefs.** Both are linked from the subject page and neither file could be
  retrieved. The previous release stated that the HL brief covers assessment sessions through 2029.
  That claim rested on a document this build never read, so it has been removed rather than
  restated. Nothing in the platform now depends on the briefs.
- **Permitted calculator models.** The IB publishes these per session through the Programme
  Resource Centre, which requires a school login. No model is named anywhere in the platform, and an
  assertion fails the build if one ever is.
- **The teacher support material's public page.** The TSM is distributed through the Programme
  Resource Centre and has no public URL to cite, so its entry in the reference layer carries no
  link and says why.

### What was re-read in the guide

Because the instruction was not to change educational content unless a discrepancy was found, the
syllabus side of the reference layer was re-checked against the guide held in this project rather
than assumed. No discrepancy was found.

| Re-read | Result |
|---|---|
| Command term glossary | 33 terms in the platform, 33 in the guide appendix, every definition matching word for word |
| Command terms by assessment objective | 5 at AO1, 6 at AO2, 9 at AO3, 13 at AO4, matching the guide's table exactly |
| Recommended teaching hours | 150 SL and 240 HL, with 20 hours for the portfolio at both levels |
| Internal assessment weighting | 30% SL and 20% HL |
| Internal assessment marks | criteria A to E total 14 per commentary, 14 × 3 + 3 for criterion F = 45 |
| Paper mark totals | Paper 1: 10 + 15 = 25. Paper 2: 2 + 2 + 5 + 4 + 4 + 4 + 4 + 15 = 40. Paper 3: 2 × 30 = 60 |
| External examination time | SL 1 h 15 + 1 h 45 = 3 h. HL 3 h + 1 h 45 = 4 h 45 |
| TOK reference claims | exhibition 33%, essay 67%, 1,600-word limit, all confirmed against the official TOK page and the published TOK subject brief |

---

## 3. Discrepancies found and fixed

Three, none of them in the teaching material.

**3a. A claim that could not be supported.** The reference layer stated that the published HL
subject brief covers assessment sessions through 2029. The brief was not retrievable, so the claim
was removed and replaced by what was actually checked: that the IB curriculum updates page,
last updated 24 March 2026, announces no revised Economics course for first teaching through 2027.

**3b. A claim that is no longer true.** The reference layer told the reader that the live IB pages
were unreachable from the environment the build was produced in and that nothing had been checked
against them. That sentence was accurate when written and is false now. It is replaced by a record
of what was read, when, and what it did not settle.

**3c. Two data source links had moved.** The Sources and method page linked `data.oecd.org`, which
now redirects to `oecd.org/en/data.html`, and `comtrade.un.org`, which is superseded by
`comtradeplus.un.org`. Both were followed and both now point at the page that actually serves the
data.

One further defect was found while reviewing a screenshot of the new page, unrelated to the IB
work. The toast notification is hidden by translating it down 170 per cent of its own height. An
**empty** toast is only 28 px tall, so 170 per cent did not clear its 28 px offset from the bottom
of the window, and an 8 px dark sliver sat at the bottom centre of every route. It is now offset by
its own height plus the inset plus a margin, which clears it at any content height, and the fix is
held by an assertion. The transform was kept rather than switching to `visibility:hidden`, so the
`role="status"` live region still announces text inserted while it is hidden.

---

## 4. External links, opened

Every external host in the build was resolved. This test was **NOT EXECUTED** in the previous
release.

| Target | Result |
|---|---|
| The Drive library, the exact URL you supplied, unaltered | **PASS** · resolves, and the folder is titled "IB DP Economics Resources" |
| 34 curated YouTube videos | **PASS** · all 34 IDs resolve to real public videos, and every stored title and channel matches the video's own metadata |
| YouTube thumbnail hosts | **PASS** · both `i.ytimg.com` and `img.youtube.com` return image data |
| 4 official IB TOK links, 3 pages and 1 PDF | **PASS** · all four resolve; the TOK pages carry "last updated 19 February 2026" |
| `questionbank.ibo.org` | **PASS** · resolves to the IB Questionbank sign-in page |
| 4 Google Fonts families | **PASS** · all four stylesheets resolve and name the requested family |
| World Bank Open Data, FRED, Human Development Reports, Our World in Data, IMF Data, WTO trade and tariff data | **PASS** · all six resolve |
| OECD Data, UN Comtrade | **FIXED** · both had moved; see 3c |
| `resources.ibo.org` | **NOT ESTABLISHED** · the Programme Resource Centre returned a 400 to an unauthenticated request. It is a sign-in-only service and is labelled as one in the platform |
| LinkedIn, Instagram, WhatsApp | **NOT TESTABLE** · all three publish a `robots.txt` that disallows automated retrieval, so the request was refused before it reached the site. The identifiers are unchanged from the ones you supplied and none was invented |

---

## 5. Content totals

| | |
|---|---|
| Real World cases · deep cards | 203 · 12 |
| Case status | 203 verified historical, 0 verified current, 0 illustrative, 0 needing review |
| Countries · year range | 39 · 1923 to 2024 |
| Subtopics with an indexed case | 24 of 31; the other 7 are listed with source guidance |
| Mindmaps · nodes · edges | 42 · 762 · 720 |
| HL-tagged nodes | 131 |
| Diagram plates | 34, of which 27 model-driven and 7 schematic; 9 further plates declared as gaps |
| Calculations | 36 · 18 HL, 17 both levels, 1 enrichment |
| Exam DNA questions · analysed parts | 212 · 990 |
| Curated videos | 34, every one resolved against YouTube in this release |
| Economics in 60 Seconds | 10 · 7 core, 3 enrichment |
| Dictionary terms | 157 |
| Original question-bank items | 110 |
| Command terms | 33, matching the guide's glossary exactly |
| Sections · routes | 26 · 151 |
| Search index | 2,304 rows across 50 kinds |
| In-browser assertions | 1,654 |
| Live IB verification records | 9 · 8 verified, 1 recorded as not verified |
| Syllabus coverage matrix | 208 of 279 cells filled, 71 gaps shown |

Coverage by column, out of 31 subtopics: notes 31, mindmap 31, Exam DNA 29, TOK 29, Real World 24,
diagram 20, video 19, calculation 16, carousel 9. No surface claims complete coverage.

---

## 6. Tests executed

Every harness below was run against this build. Where a harness was corrected during this pass, the
correction is stated, because a green result from a test that was checking the wrong thing is worth
nothing.

| Test | Result |
|---|---|
| Content integrity · in-browser self-test, final folder | **PASS** · 1,654 assertions, 0 failed |
| Content integrity · single copied `index.html` | **PASS** · 1,654 assertions, 0 failed |
| Self-test side effects | **PASS** · 0 downloads, 0 navigations, 0 form submissions; storage restored |
| Economic accuracy · red team | **PASS** · clean, 0 findings, 0 page errors |
| IB reference layer · live verification records | **PASS** · 9 records, every verified one citing an `https://ibo.org` page, no date in the future, the unverified one labelled as such |
| IB reference layer · no calculator model named | **PASS** |
| IB accuracy · syllabus code audit | **PASS** · every code in every registry resolves in the single authority |
| IB accuracy · level labels | **PASS** · every stored value maps onto SL, HL, Both or Enrichment |
| IB accuracy · enrichment containment | **PASS** · no enrichment item carries a syllabus code or is shown to a standard level profile |
| Release gate, every route | **PASS** · 151 routes, 0 throws, 0 empty, 0 thin, 0 placeholder, measured on rendered text |
| Diagram accuracy · model-driven | **PASS** · 27 of 27 validated against an independent algebraic solution, largest miss 0.0000 px |
| Diagram accuracy · public goods semantics | **PASS** · 9 semantic checks on the redrawn plate |
| Calculation accuracy | **PASS** · 36 calculations, boundary and degenerate inputs |
| Mindmap visual · every map, four widths | **PASS** · 168 renders, 3,048 node positions measured, 0 collisions |
| Overlap · bounding-box collision, 8 rules | **PASS** · 172 deep sweeps, 0 collisions |
| Responsive · every route, 14 widths | **PASS** · clean at every width, 0 unexpected horizontal overflow |
| Accessibility · 8 rules, every route | **PASS** · 151 routes, 0 defect classes |
| Accessibility · keyboard | **PASS** · 30 tab stops walked with real Tab presses, all with an immediate focus ring, skip link first and its target present |
| Accessibility · contrast against WCAG AA | **PASS** · every text node on 151 routes, 0 below threshold |
| Search | **PASS** · 2,304 rows across 50 kinds; every expected kind present; the app's own matching used for the probes |
| Student and teacher journeys | **PASS** · 14 of 14 and 11 of 11 steps, 0 page errors |
| Navigation | **PASS** · primary order frozen, Mindmaps and Real World primary, Resources and Settings in More, every section reachable |
| Real World integrity | **PASS** · 203 cases, 0 defects, 0 current claims, 0 needing review |
| Provenance | **PASS** · 203 cases across 7 source classes, 0 panel defects, 0 fabricated citations |
| Video library | **PASS** · 34 cards, every card keeping its title, channel and a named control; the player stays an inert thumbnail until clicked and then loads `youtube-nocookie` with no autoplay |
| Local storage | **PASS** · name, syllabus, saved items, queue, mistake book, paper answers, revision schedule and all 42 mindmap records survive a reload |
| Migration | **PASS** · every seeded legacy value preserved, stamped with this build's own storage version |
| Interaction and leak sweep | **PASS** · 200 navigations, 964 nodes before and after, 0 stray iframes, menus, drawers or scrims, timer not left running |
| Startup safety | **PASS** · 0 print calls at startup, navigation or prepare |
| Opening sequence | **PASS** · five stages, skip leaves no lock or overlay, 0 prints |
| Dataset parity | **PASS** · bundled and external copies declare matching hashes in both distribution modes |
| PWA over HTTP then offline | **PASS** · worker registers, manifest valid, 6 icons resolve, offline reload renders the app and all 42 maps |
| Served folder | **PASS** · external data adopted, 0 failed local requests, carousel PDFs offered |
| GitHub Pages compatibility | **PASS** · see section 7 |
| Photographs | **PASS** · all three load at their natural aspect ratios; the third is below the fold and loads on scroll |
| Settings | **PASS** · profile, export, import, reset behind confirmation, nothing transmitted, 0 unlabelled controls |
| Coverage matrix | **PASS** · 208 ticks, 71 gaps, 0 overflow, no claim of complete coverage |
| Performance | **PASS** · see section 8 |
| Copyright | **PASS** · see section 9 |

### Harnesses corrected during this pass

Five harnesses were reporting on something other than the product. Each was corrected and re-run,
and the corrected version is the one whose result is quoted above.

| Harness | What it was testing | What it tests now |
|---|---|---|
| Red team, search | that a kind called "Mind map" exists, and that the literal string "mind map" appears in a row's text | that the kind the platform actually uses, "Mindmap", exists, and that the app's own whitespace-splitting match reaches the maps. A user typing "mind map" gets 43 hits; the old probe demanded a contiguous match the product never used |
| Accessibility, skip link | that an element carries a class containing "skip" | that the first focusable element is an in-page anchor offering to skip and that its target exists. The skip link uses the class `sr`, so the old check reported false while the same harness measured it as the first tab stop with a focus ring |
| Migration | that storage is stamped version 5 | that storage is stamped with this build's own version, which is now 6. The number had been copied from an older release, so the harness would have gone on failing on every version bump and could have masked a real migration defect |
| Saved items, learning paths | that the text contains "Step 01" | the same check, case-insensitively. The label renders as "STEP 01" |
| User journeys | ran against `bmOpen` and `BM`, an API renamed several releases ago, and matched node labels as contiguous text | runs against `mmOpen` and `MM`, and reads the view with whitespace collapsed and accessible names included, because SVG labels wrap across lines. Both journeys now complete |
| Video library | counted thumbnails that failed to load as broken | states that the thumbnail hosts are refused by this environment's egress proxy, and tests what matters instead: that a card with no thumbnail keeps its title, its channel and a control with an accessible name, and shows no empty box |

### Tests not executed

| Test | Why | Exact manual test |
|---|---|---|
| The Economics subject briefs | Both files are linked from the IB subject page and neither could be retrieved | Download the SL and HL subject briefs from the IB Economics page and confirm nothing in them contradicts the reference layer |
| Programme Resource Centre content | Sign-in only; an unauthenticated request returns 400 | Sign in to `resources.ibo.org`, open the Economics section, and confirm the teacher support material and the calculator list for your session |
| LinkedIn, Instagram and WhatsApp links | All three disallow automated retrieval in `robots.txt`, so the request was refused before reaching the site | Click each of the four contact links on the About page and confirm each opens the right profile or chat |
| Real-device iOS and Android | No physical device in this environment | Open the published URL on an iPhone and an Android phone. Install to the home screen. Confirm the header holds four objects without collision, the drawer opens with Real World, Mindmaps and Resources in the Explore group and Settings under About, a case opens, a mindmap opens in list view, and a carousel cover renders |
| Real installed-PWA launch | Headless Chromium cannot install to an OS launcher | Install from Chrome on a desktop, close the browser, launch the installed app, turn the network off and open a case, a mindmap and a calculation |
| Safari, desktop and mobile | Only Chromium is available here | Repeat the responsive and interaction checks in Safari. Pay attention to the focus ring, the dark-panel text and the diagram labels |
| Screen reader | No assistive technology in this environment | Navigate the About page, the photograph lightbox, a carousel viewer, a case reader, the coverage matrix, the Settings page and the diagram atlas with VoiceOver or NVDA. Confirm each diagram announces its name and the skip link is the first tab stop |
| Opening a carousel PDF in a viewer | Headless Chromium has no PDF viewer wired to a new tab | Click **Open the full carousel** on two issues and confirm the ten-page file opens |
| Printing to paper | Headless printing is simulated, not physical | Print a case, a mindmap, a lesson pack, a casebook, an exam task and a teacher checklist. Confirm page breaks fall between sections |
| Deployment to GitHub Pages itself | No GitHub account here | Follow the README's publish steps. The workflow was validated as YAML and its action versions checked, but it has not been run |

---

## 7. GitHub Pages compatibility

The site is published under a path, not at a domain root. This was tested by serving the exact final
folder from a subdirectory and loading it at `http://127.0.0.1:8901/ib-economics/`.

| Check | Result |
|---|---|
| Root-relative paths that would break at a subpath | **PASS** · 0 emitted link targets; the external links are all deliberate and absolute |
| Requests escaping the subpath | **PASS** · 0 |
| Failed local requests | **PASS** · 0 |
| Service worker scope | **PASS** · registered at `/ib-economics/`, active |
| Manifest and icons | **PASS** · manifest href relative, all 6 icons resolve |
| Carousel PDFs | **PASS** · all 10 hrefs relative, all 10 resolve to 200 at the subpath |
| Data files and parity | **PASS** · 203 cases and 212 Exam DNA records load from `assets/data`, hashes agree |
| Offline at the subpath | **PASS** · reload with the network off renders the app, all 42 mindmaps and all 203 cases |
| Workflow | **PASS** · `pages.yml` parses as valid YAML, triggers on push to main and manual dispatch, no build step and no dependencies |

The repository can be renamed without editing anything.

---

## 8. Performance

Measured as an interleaved A and B comparison in one session on one machine: the two builds
alternate load by load, so drift in the machine's load hits both equally rather than only the build
measured second. Nine cold loads of each, medians reported.

| | Previous release | This build | Change |
|---|---|---|---|
| DOMContentLoaded | 1,787 ms | 1,793 ms | +0.3% |
| First contentful paint | 352 ms | 320 ms | -9.1% |
| DOM nodes after home | 1,059 | 1,059 | none |
| JS heap after home | 18 MB | 20 MB | measurement noise |
| Heap growth over 200 navigations | 0 MB | 0 MB | none |
| Stray iframes · timers · console errors | 0 | 0 | none |

DOMContentLoaded is the figure to read. First contentful paint moved by roughly ten per cent in both
directions across repeated runs on this machine, so no claim is made from it beyond the absence of a
regression. The build carries a new route section, nine live verification records and ten more
assertions at no measurable cost.

---

## 9. Copyright

| Check | Result |
|---|---|
| Official IB examination PDFs in the package | **PASS** · none |
| Official markschemes | **PASS** · none |
| Copied official question wording | **PASS** · Exam DNA holds metadata, marks, command terms and archetypes only |
| Questions reworded and presented as original | **PASS** · all 110 bank items original; every generated pack labelled teacher-created practice |
| Official IB logo or crest | **PASS** · none |
| False endorsement | **PASS** · the independence statement appears in the footer, on About and on Settings; nothing is described as official, certified or endorsed |
| Copied textbook passages | **PASS** · explanations original throughout |
| Carousel attribution | **PASS** · all ten carry "Economics in 60 Seconds · Arjun Agrawal" and the non-endorsement note |
| Videos | **PASS** · each labelled an external educational video with its channel; none called best; each verified to be the video the platform says it is |
| Illustrative data | **PASS** · labelled wherever it appears, never presented as evidence |
| Quotation from the IB's pages | **PASS** · the reference layer quotes short factual statements and links to the page each came from; no page is reproduced |

---

## 10. Hash chain

The order was: build the folder, test that folder, hash its `index.html`, zip that folder, extract
the zip to an empty directory, hash the extracted `index.html`, and require all three to agree.

```text
tested index SHA-256    = 7815dd227c1f18d5775790e4720b15a8d3e5f87e0d2bca198145f1814d059829
packaged index SHA-256  = 7815dd227c1f18d5775790e4720b15a8d3e5f87e0d2bca198145f1814d059829
extracted index SHA-256 = 7815dd227c1f18d5775790e4720b15a8d3e5f87e0d2bca198145f1814d059829
```

The verification output is reproduced in the delivery message. No file was edited between the test
and the packaging: the folder hashed above is the folder the archive was made from.

---

## 11. Known limitations

1. **The subject briefs were not read.** They are linked from the IB Economics page and could not be
   retrieved on the verification date. Nothing in the platform depends on them.
2. **Sign-in-only IB material was not read.** The teacher support material and the per-session
   calculator list live in the Programme Resource Centre. The TSM held in this project was read
   directly; no calculator model is named anywhere.
3. **Three contact links could not be opened automatically.** LinkedIn, Instagram and WhatsApp
   disallow automated retrieval. The identifiers are exactly the ones you supplied.
4. **Seven subtopics hold no Real World case:** 1.1, 1.2, 2.2, 2.5, 2.12, 3.1 and 3.4. They are
   listed with source guidance rather than filled with weak cases.
5. **Nine diagram plates the guide names are not drawn,** including the money market, crowding out,
   the J-curve and the 2.11 market structure cluster. They are declared as gaps in the atlas rather
   than concealed.
6. **No case carries a specific verified citation.** Each names the class of primary source that
   holds the record and says plainly that the document has not been fetched.
7. **Chromium only.** Safari and real mobile devices are untested here.
8. **The platform is a single large file.** 3.8 MB parses in about 1.8 seconds on this machine. That
   is the price of working from a memory stick, an email attachment and a `file://` path with no
   server.
9. **A verification date is a date, not a guarantee.** The reference layer records what was read on
   22 September 2026. Re-check it before each examination session; the platform states plainly that
   nothing on that page refreshes its own date.
