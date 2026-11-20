# The Indian Economy: the preview pipeline

The website shows **THE INDIAN ECONOMY** (First Edition, 2026-27) through a limited preview: the cover and ten
chosen pages, as images. The book itself, and the Digital Revision Companion, never enter this repository
(`.gitignore` refuses every PDF, Word and e-book file except the ten public carousel PDFs) and are never linked
from the site.

| File | What it is |
|---|---|
| `tools/book/preview-pages.json` | The chosen pages: for each, the page of the supplied PDF (`pdf`), the **printed** page number (`p`), a kind and a caption. The companion's list is empty until its PDF is supplied |
| `tools/book/build_book.py` | Renders the cover and the chosen pages from the private PDF into `assets/book/<id>/`, and writes `src/modules/51-book-data.js` |
| `assets/book/the-indian-economy/` | `cover.webp` (1000 px) and `cover-sm.webp` (360 px); `page-<p>.webp` (1600 px wide, so the text is readable when zoomed) and `page-<p>-sm.webp` (360 px). No watermark, no overlay |
| `src/modules/51-book-data.js` | Generated: `BOOK_PV`, the list the page reads (sizes, captions, printed page numbers) |
| `src/modules/51-book.js` | The book page, the companion page, the home feature, the header link, the Resources menu, search and the self-tests |

## Rebuild

```bash
python3 tools/book/build_book.py --src /path/outside/the/repo/The_Indian_Economy_First_Edition_2026-27_FINAL-Part_1.pdf
python3 tools/build/splice.py
python3 tools/book/build_book.py --check      # no PDF needed: the selection, the images and the module agree
```

The build stops if a chosen page's printed folio (the last word on the page, read with `pdftotext`) is not the page
number written in the selection, so the website always shows the page number that is printed on the page, never the
PDF's position (the PDF has 706 pages; the book has 641 numbered pages, with roman-numbered front matter). It refuses
a PDF inside the repository, writes an image only when its bytes change, removes images that are no longer chosen,
and warns above a 6 MB budget (the ten pages and the cover weigh 2.34 MB).

## The supplied file

Only **Part 1** of the book was supplied (PDF pages 1 to 100 of 706: the front matter, the navigation maps and
Part One up to Chapter 18), so every chosen page comes from that range. To choose pages from later Parts, supply the
complete PDF, add them to `preview-pages.json` (the printed page number is in the page's footer) and rebuild.

## The Digital Revision Companion

Its PDF was not supplied, so the website has no companion preview. When it is supplied, add its chosen pages to the
`companion.pages` list (5 to 8 pages, with their printed page numbers) and run:

```bash
python3 tools/book/build_book.py --src BOOK.pdf --companion COMPANION.pdf && python3 tools/build/splice.py
```

The book page's preview then shows a switch between the book and the companion automatically (it appears only when
the companion has pages). The companion is linked, free, at the address printed in the book: `q.me-qr.com/48usv7rt`.
