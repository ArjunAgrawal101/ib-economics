# The handbook preview pipeline

The eleven UPSC CSE Economics handbooks are sold as digital soft copies at ₹99 per volume. They are
**never stored in this repository and never published whole**. The Handbook Library shows each volume's
cover and a few chosen pages, rendered from the PDFs as plain images.

| File | What it is |
|---|---|
| `content/upsc/handbooks.json` | The catalogue: titles, page counts, parts, syllabus maps and the topic (`category`) of each volume, taken from the volumes themselves |
| `tools/upsc/preview-pages.json` | The pages shown in the preview viewer, per volume: `{"p": 18, "kind": "figure", "cap": "..."}` |
| `tools/upsc/build_upsc.py` | Checks the PDFs against the catalogue, renders the cover and the chosen pages, writes `src/modules/41-upsc-data.js` |
| `tools/upsc/propose_pages.py` | Scores every page of a PDF and drafts a selection, with a contact sheet, so that a person can choose quickly |
| `tools/upsc/test_pipeline.py` | The pipeline end to end on synthetic PDFs it writes outside the repository |
| `assets/upsc/handbooks/<volume-id>/` | The output: `cover.webp` (800 px), `cover-sm.webp` (400 px), `page-NN.webp` (1600 px) and `page-NN-sm.webp` (400 px) |

Requirements: poppler-utils (`pdfinfo`, `pdftoppm`, `pdftotext`, `pdfimages`) and Pillow.

## When the PDFs arrive

Keep them in a private folder **outside** the repository (the tools refuse a folder inside it). File names
do not matter: each PDF is identified from its title metadata, the text of its cover or its file name.

```bash
# 1. Check every PDF against the catalogue: title, page count, the page each part begins on.
python3 tools/upsc/build_upsc.py --src ~/private/handbooks --check --report ~/private/handbook-check.md

# 2. If a page count differs (Volumes I, II, III, IV, VII and IX were counted from Word files),
#    and the PDF is the one that is sold, take its count. Titles are never changed by the tools.
python3 tools/upsc/build_upsc.py --src ~/private/handbooks --check --accept-counts

# 3. Draft about eight pages per volume and look at the contact sheets.
python3 tools/upsc/propose_pages.py --src ~/private/handbooks --out ~/private/proposals
#    ~/private/proposals/<volume-id>/contact-sheet-1.jpg   every page, the proposed ones framed
#    ~/private/proposals/<volume-id>/candidates.md         the best pages for each kind, with their opening words
#    ~/private/proposals/<volume-id>/proposal.json         a draft entry for preview-pages.json

# 4. Choose the pages and write the captions in tools/upsc/preview-pages.json (5 to 10 per volume).
#    Read every page you publish; the drafted captions come only from each page's first heading.

# 5. Render the covers and pages, delete images no longer chosen, rewrite the data module.
python3 tools/upsc/build_upsc.py --src ~/private/handbooks
python3 tools/build/splice.py

# 6. Test.
cd tests && node library.mjs && node selftest.mjs
```

A volume whose title or page count differs from the catalogue is reported and **not rendered** until it is
resolved: pass `--accept-counts` for counts, or correct the catalogue by hand. `--force-title` renders a volume
whose title differs while keeping the title recorded in the catalogue. `--only volume-iii,volume-iv` renders
some volumes only.

If `--accept-counts` changes a count, the UPSC section's own self-test (`src/modules/43-upsc.js`, "page counts as
extracted from the PDFs") and `PAGES` in `tests/upsc.mjs` list the counts too and must be updated with it.

## Choosing pages

The brief asks for about eight pages per volume (at least five, at most ten), chosen by what they show:

| `kind` | Shown as | Ideally |
|---|---|---|
| `contents` | Contents | the contents page or chapter structure |
| `concept` | A concept explained | a strong conceptual explanation |
| `figure` | Infographic | a useful infographic or diagram |
| `policy` | Policy in detail | a detailed topic or policy explanation |
| `table` | Table and data | a table or data presentation |
| `case` | Case study, scheme or institution | a case study, government scheme or institution |
| `exam` | For the examination | an examination-oriented application |
| `extra` | From the volume | another page that shows the quality of the volume |

Page 1 is the cover and is rendered separately. Spread the pages across the volume's parts.

## What the images are

Pages are rendered with `pdftoppm` at 1600 px wide (about 193 dpi for A4) and saved as WebP at quality 78,
with a 400 px thumbnail for the thumbnails and slower connections. **No watermark, stamp, diagonal text or
overlay is added**: the pages are shown as they are in the volume. Branding belongs to the cover and the
catalogue. The tool reports the total weight of the images; the budget is about 20 MB for 88 pages. Over it,
re-run with `--quality 70` or `--width 1400`.

A preview in a browser can always be saved or photographed. The site says so and claims no protection; what
it guarantees is that the complete volumes are never in the repository or on the site. `.gitignore` refuses
any PDF, Word or e-book file anywhere except the ten public carousel PDFs, and `tests/library.mjs` fails if
one is tracked. The service worker does not precache the preview images.

## Until the PDFs arrive

`preview-pages.json` lists the three pages per volume that already exist as images (the contents page and two
samples, made by the previous version of this tool at 640 px, with its watermark). The library and the viewer
read whatever the selection and the folder hold, so the first run with the PDFs replaces them with clean,
high-resolution pages without any change to the code.

## Testing the pipeline

```bash
python3 tools/upsc/test_pipeline.py      # about a minute; also run by tests/library.mjs
```

It writes eleven synthetic PDFs (placeholder text and shapes, each page marked as a synthetic test document)
with the catalogue's titles and page counts into a temporary folder, copies the catalogue into a scratch root,
and checks identification, the reports, `--accept-counts`, `--force-title`, the image sizes, the deletion of
stale images, that a blank band of a page stays white (no overlay), the data module, refusals, and the
proposals. It never touches this repository's images.
