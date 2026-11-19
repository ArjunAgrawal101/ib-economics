"""End-to-end test of the handbook preview pipeline on SYNTHETIC PDFs.

Nothing here touches the real handbooks or this repository's images. In a temporary folder
outside the repository it writes eleven synthetic PDFs (placeholder text and shapes, each page
marked as a synthetic test document) with the catalogue's titles and page counts, copies the
catalogue, the selection file and the current images into a scratch root, and then runs
tools/upsc/build_upsc.py and tools/upsc/propose_pages.py against them, checking:

  - identification by title metadata, cover text and file name; reporting of a page-count
    difference and of a title difference, which block that volume until resolved;
  - --accept-counts updates only the "pages" value; --force-title renders but never renames;
  - the rendered sizes (1600 px pages, 400 px thumbnails, 800 px cover), WebP format, stale images
    deleted, and pages left clean: a band that is blank in the PDF is still pure white;
  - the regenerated data module (preview records, thumbnails, the shape the UPSC pages read);
  - bad selections and folders inside the repository are refused;
  - propose_pages finds the contents page, a figure, a table and an examination page and writes
    its contact sheet and draft entries.

Usage: python3 tools/upsc/test_pipeline.py   (exit code 0 when every check passes)
"""
import contextlib, io, json, os, re, shutil, subprocess, sys, tempfile, zlib

HERE = os.path.dirname(os.path.abspath(__file__))
sys.dont_write_bytecode = True          # no __pycache__ inside the repository
sys.path.insert(0, HERE)
import build_upsc as B  # noqa: E402
import propose_pages as P  # noqa: E402

W, H = 595.28, 841.89
fails = []


def check(ok, name, detail=''):
    print(('ok   ' if ok else 'FAIL ') + name + ('' if ok or not detail else '\n     ' + str(detail)))
    if not ok:
        fails.append(name)


# ── a minimal PDF writer: base-14 fonts, text, rectangles and lines ────────
def pdf_str(s):
    return '(' + s.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)') + ')'


class Page:
    def __init__(self):
        self.ops = []

    def text(self, x, y, s, size=10, bold=False, rgb=(0.1, 0.1, 0.12)):
        self.ops.append(f'{rgb[0]} {rgb[1]} {rgb[2]} rg BT /{"F2" if bold else "F1"} {size} Tf {x:.1f} {y:.1f} Td {pdf_str(s)} Tj ET')

    def rect(self, x, y, w, h, rgb):
        self.ops.append(f'{rgb[0]} {rgb[1]} {rgb[2]} rg {x:.1f} {y:.1f} {w:.1f} {h:.1f} re f')

    def line(self, x1, y1, x2, y2, rgb=(0.2, 0.2, 0.2), w=1):
        self.ops.append(f'{rgb[0]} {rgb[1]} {rgb[2]} RG {w} w {x1:.1f} {y1:.1f} m {x2:.1f} {y2:.1f} l S')


def write_pdf(path, pages, title):
    objs = []
    def add(b):
        objs.append(b)
        return len(objs)
    cat_id = add(None)
    pages_id = add(None)
    f1 = add(b'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>')
    f2 = add(b'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>')
    kids = []
    for pg in pages:
        data = zlib.compress('\n'.join(pg.ops).encode('latin-1'))
        c = add(b'<< /Length %d /Filter /FlateDecode >>\nstream\n' % len(data) + data + b'\nendstream')
        kids.append(add(f'<< /Type /Page /Parent {pages_id} 0 R /MediaBox [0 0 {W} {H}] /Contents {c} 0 R '
                        f'/Resources << /Font << /F1 {f1} 0 R /F2 {f2} 0 R >> >> >>'.encode()))
    objs[cat_id - 1] = f'<< /Type /Catalog /Pages {pages_id} 0 R >>'.encode()
    objs[pages_id - 1] = f'<< /Type /Pages /Kids [{" ".join(f"{k} 0 R" for k in kids)}] /Count {len(kids)} >>'.encode()
    info = add(f'<< /Title {pdf_str(title)} /Producer (synthetic test) >>'.encode('latin-1'))
    out = io.BytesIO()
    out.write(b'%PDF-1.4\n')
    offs = []
    for i, o in enumerate(objs, 1):
        offs.append(out.tell())
        out.write(f'{i} 0 obj\n'.encode() + o + b'\nendobj\n')
    x = out.tell()
    out.write(f'xref\n0 {len(objs) + 1}\n0000000000 65535 f \n'.encode())
    for o in offs:
        out.write(f'{o:010d} 00000 n \n'.encode())
    out.write(f'trailer\n<< /Size {len(objs) + 1} /Root {cat_id} 0 R /Info {info} 0 R >>\nstartxref\n{x}\n%%EOF\n'.encode())
    open(path, 'wb').write(out.getvalue())


FILL = ('Synthetic placeholder sentence for testing the preview pipeline; it carries no handbook content '
        'and exists only so that each page has text to measure.')


def synthetic_volume(v, pages, title_on_cover):
    """A placeholder volume: cover, contents, part openings where the catalogue says, and pages
    built to look like each kind of preview page. Every page says it is a synthetic test document."""
    starts = {x['p']: x for x in v['parts']}
    kinds = ['concept', 'figure', 'table', 'policy', 'case', 'exam']
    out = []
    for p in range(1, pages + 1):
        pg = Page()
        pg.text(40, H - 30, f'VOLUME {v["n"]} | SYNTHETIC TEST DOCUMENT | NOT HANDBOOK CONTENT', 7)
        pg.text(W - 60, 30, str(p), 8)
        # the band from y=60 to y=150 is left blank on purpose: it must stay white once rendered
        if p == 1:
            pg.rect(0, 160, W, H - 160, (0.08, 0.12, 0.25))
            pg.text(60, 640, f'VOLUME {v["n"]} | THE INDIAN ECONOMY SERIES | SYNTHETIC EDITION', 10, True, (0.9, 0.8, 0.5))
            y = 590
            for line in re.findall(r'.{1,30}(?:\s|$)', title_on_cover.upper()):
                pg.text(60, y, line.strip(), 26, True, (1, 1, 1))
                y -= 34
        elif p == 2:
            pg.text(50, H - 80, 'Contents', 22, True)
            y = H - 120
            for x in v['parts']:
                dots = '.' * max(4, 70 - len(x['t']))
                pg.text(50, y, f'PART {x["l"]}  {x["t"]} {dots} {x["p"]}', 9)
                y -= 26
            pg.text(50, y - 10, 'Syllabus Map', 14, True)
        elif p == pages:
            pg.text(50, H - 80, 'References and sources', 16, True)
            for i in range(12):
                pg.text(50, H - 110 - i * 16, f'[{i + 1}] Synthetic reference entry for testing only.', 8)
        else:
            kind = 'exam' if v['parts'][-1]['p'] <= p else kinds[p % len(kinds)]
            top = H - 70
            if p in starts:
                x = starts[p]
                pg.text(50, top, f'VOLUME {v["n"]} | PART {x["l"]}', 9, True)
                pg.text(50, top - 26, x['t'], 16, True)
                top -= 50
            if kind == 'figure':
                pg.text(50, top, f'{v["n"]}.{p} A synthetic diagram', 13, True)
                for i, c in enumerate([(0.15, 0.3, 0.55), (0.7, 0.3, 0.2), (0.2, 0.55, 0.35), (0.85, 0.65, 0.2)]):
                    pg.rect(70 + i * 120, 360, 100, 220 + i * 30, c)
                pg.line(60, 350, 540, 350)
                pg.line(60, 350, 60, 700)
                pg.text(70, 330, f'Figure {chr(65 + p % 10)}.{p} Synthetic shapes standing in for a diagram', 9)
            elif kind == 'table':
                pg.text(50, top, f'Table {chr(65 + p % 10)}.{p} A synthetic table', 13, True)
                for r in range(18):
                    y = top - 30 - r * 22
                    pg.text(50, y, f'Row {r + 1} label', 9, r == 0)
                    pg.text(230, y, f'{(r * 7) % 13 + 1}.{r % 10} per cent', 9, r == 0)
                    pg.text(400, y, f'Column three {r}', 9, r == 0)
                    pg.line(50, y - 6, 545, y - 6, (0.8, 0.8, 0.8), 0.5)
            else:
                words = {'concept': 'Core Idea. Definition: the term means and refers to a synthetic concept. Why it matters.',
                         'policy': 'Policy framework, reform, amendment, budget, regulation and government rules and targets.',
                         'case': 'Scheme, Mission, Committee, Commission, Council, Authority, Board, Ministry and Act.',
                         'exam': 'Prelims Booster, Mains Answer Framework, PYQ linkage, MCQ, UPSC Trap, practice question.'}[kind]
                pg.text(50, top, f'{v["n"]}.{p} A synthetic {kind} page', 13, True)
                for i in range(30):
                    pg.text(50, top - 24 - i * 15, (words if i % 3 == 0 else FILL)[:100], 9)
        out.append(pg)
    return out


def make_pdfs(cat, src):
    """Eleven PDFs; Volume II is one page longer than the catalogue and Volume IX has another title."""
    for v in cat['volumes']:
        pages = v['pages'] + (1 if v['n'] == 'II' else 0)
        title = 'A Different Title Entirely' if v['n'] == 'IX' else v['title']
        meta = f'Volume {v["n"]}: {title}' if v['n'] != 'VII' else ''          # VII: no metadata, identified by its cover
        name = f'Synthetic_Volume_{v["n"]}.pdf' if v['n'] != 'X' else 'tenth-volume.pdf'
        if v['n'] == 'XI':
            name = 'Vol_11_synthetic.pdf'                                        # a number in the file name
        write_pdf(os.path.join(src, name), synthetic_volume(v, pages, title), meta)


def quiet(fn, *a):
    buf = io.StringIO()
    code = None
    with contextlib.redirect_stdout(buf):
        try:
            code = fn(*a)
        except SystemExit as e:
            code = e.code
    return code, buf.getvalue()


def main():
    from PIL import Image
    tmp = tempfile.mkdtemp(prefix='hb-pipeline-test-')
    try:
        src, root = os.path.join(tmp, 'private'), os.path.join(tmp, 'root')
        os.makedirs(src)
        for rel in ['content/upsc/handbooks.json', 'tools/upsc/preview-pages.json', 'src/modules/41-upsc-data.js']:
            os.makedirs(os.path.dirname(os.path.join(root, rel)), exist_ok=True)
            shutil.copy(os.path.join(B.REPO, rel), os.path.join(root, rel))
        shutil.copytree(os.path.join(B.REPO, 'assets/upsc/handbooks'), os.path.join(root, 'assets/upsc/handbooks'))
        # the images a blocked volume must keep, byte for byte: whatever the repository holds when the test starts
        before = {k: open(os.path.join(root, 'assets/upsc/handbooks', k), 'rb').read() for k in ('volume-ii/page-02.webp', 'volume-ix/page-02.webp')}
        paths = B.Paths(root)
        cat = json.load(open(paths.cat, encoding='utf-8'))
        sel = B.load_selection(paths)
        make_pdfs(cat, src)
        check(len(os.listdir(src)) == 11, 'eleven synthetic PDFs written outside the repository')

        found, problems = B.find_volumes(src)
        check(sorted(found, key=B.ROMAN.index) == B.ROMAN[:11] and not problems, 'every synthetic volume is identified', problems)
        check('cover text' in found['VII']['how'] and 'title metadata' not in found['VII']['how'], 'a PDF without metadata is identified by its cover')
        check(found['XI']['how'].endswith('file name') or 'file name' in found['XI']['how'], 'a volume number in the file name counts')

        code, out = quiet(B.main, ['--src', src, '--check', '--root', root])
        check(code == 1 and 'page count differs: the catalogue records 43, the PDF has 44' in out, '--check reports the page-count difference', out[-600:])
        check("title differs: the catalogue records 'Global Economic Institutions and Trade Architecture'" in out, '--check reports the title difference')

        stale = os.path.join(root, 'assets/upsc/handbooks/volume-iii/page-99.webp')
        open(stale, 'wb').write(b'stale')
        code, out = quiet(B.main, ['--src', src, '--root', root])
        check(code == 1 and 'Not rendered until resolved' in out and 'Volume II, IX' in out, 'differences block those two volumes, the rest render', out[-500:])
        check(not os.path.exists(stale), 'a stale image is deleted')
        d3 = os.path.join(root, 'assets/upsc/handbooks/volume-iii')
        want = {'cover.webp', 'cover-sm.webp'} | {B.page_name(s['p']) for s in sel['volume-iii']} | {B.page_name(s['p'], True) for s in sel['volume-iii']}
        check(set(os.listdir(d3)) == want, 'volume III holds exactly its cover and chosen pages, each with a thumbnail', sorted(os.listdir(d3)))
        sizes = {f: Image.open(os.path.join(d3, f)).size for f in os.listdir(d3)}
        check(all(Image.open(os.path.join(d3, f)).format == 'WEBP' for f in sizes), 'every image is WebP')
        check(sizes['cover.webp'][0] == 800 and sizes['cover-sm.webp'][0] == 400, 'cover 800 px, thumbnail 400 px', sizes)
        pg = B.page_name(sel['volume-iii'][1]['p'])
        check(sizes[pg][0] == 1600 and abs(sizes[pg][1] / 1600 - 2 ** 0.5) < 0.01 and sizes[pg.replace('.webp', '-sm.webp')][0] == 400,
              'pages 1600 px wide in A4 proportion, thumbnails 400 px', sizes[pg])
        im = Image.open(os.path.join(d3, pg)).convert('L')
        band = im.crop((0, im.height - round(150 / H * im.height) + 4, im.width, im.height - round(60 / H * im.height) - 4))
        check(band.getextrema()[0] >= 245, 'a band that is blank in the PDF is still white: no watermark, stamp or overlay', band.getextrema())
        ref = B.render(found['III']['path'], sel['volume-iii'][1]['p'], 1600).convert('L')
        diff = sum(abs(a - b) for a, b in zip(ref.resize((400, 566)).tobytes(), im.resize((400, 566)).tobytes())) / (400 * 566)
        check(diff < 3, f'the rendered page matches the PDF page itself (mean difference {diff:.2f} of 255)')
        old2 = os.path.join(root, 'assets/upsc/handbooks/volume-ii/page-02.webp')
        check(open(old2, 'rb').read() == before['volume-ii/page-02.webp'], 'a blocked volume keeps its previous images')

        mod = open(paths.mod, encoding='utf-8').read()
        data = json.loads(mod[mod.index('const UPSC_HB=') + 14:mod.rindex(';')])
        v3 = next(v for v in data['volumes'] if v['id'] == 'volume-iii')
        check(len(v3['pv']) == len(sel['volume-iii']) and all(x['w'] == 1600 and x['sm']['w'] == 400 for x in v3['pv']), 'the module lists the new pages with their thumbnails')
        check(v3['img']['cover']['w'] == 800 and v3['img']['contents']['src'].endswith('page-02.webp') and all(v3['img'][f"p{s['p']}"] for s in v3['samples']),
              'the module keeps the shape the UPSC pages read (img.cover, img.contents, samples)')
        check('.pdf' not in mod.lower(), 'the module names no PDF')

        code, out = quiet(B.main, ['--src', src, '--root', root, '--accept-counts'])
        cat2 = json.load(open(paths.cat, encoding='utf-8'))
        v2 = next(v for v in cat2['volumes'] if v['n'] == 'II')
        check(v2['pages'] == 44 and 'Volume II: 43 -> 44' in out, '--accept-counts takes the count from the PDF')
        raw = open(paths.cat, encoding='utf-8').read()
        orig = open(os.path.join(B.REPO, 'content/upsc/handbooks.json'), encoding='utf-8').read()
        check(raw.replace('"pages": 44', '"pages": 43', 1) == orig, 'and changes nothing else in handbooks.json')
        check(Image.open(os.path.join(root, 'assets/upsc/handbooks/volume-ii/page-02.webp')).size[0] == 1600, 'Volume II then renders')
        check(open(os.path.join(root, 'assets/upsc/handbooks/volume-ix/page-02.webp'), 'rb').read() == before['volume-ix/page-02.webp'], 'Volume IX stays blocked by its title')
        code, out = quiet(B.main, ['--src', src, '--root', root, '--force-title'])
        cat3 = json.load(open(paths.cat, encoding='utf-8'))
        check(code == 0 and Image.open(os.path.join(root, 'assets/upsc/handbooks/volume-ix/page-02.webp')).size[0] == 1600
              and next(v for v in cat3['volumes'] if v['n'] == 'IX')['title'] == 'Global Economic Institutions and Trade Architecture',
              '--force-title renders Volume IX and keeps its recorded title', out[-300:])
        check(re.search(r'preview images in all: \d+ files, [\d.]+ MB', out) is not None, 'the total weight is reported')

        good = open(paths.sel, encoding='utf-8').read()
        bad = dict(json.loads(good))
        bad['volume-i'] = [{'p': 1, 'kind': 'contents', 'cap': 'x'}, {'p': 5, 'kind': 'poster', 'cap': ''}]
        json.dump(bad, open(paths.sel, 'w', encoding='utf-8'))
        code, out = quiet(B.main, ['--data-only', '--root', root])
        check(isinstance(code, str) and 'page 1 is outside' in code and "kind 'poster'" in code and 'no caption' in code, 'a bad selection is refused with reasons', code)
        open(paths.sel, 'w', encoding='utf-8').write(good)
        code, out = quiet(B.main, ['--src', os.path.join(B.REPO, 'tools'), '--root', root])
        check(isinstance(code, str) and 'outside the repository' in code, 'a folder inside the repository is refused')

        outp = os.path.join(tmp, 'proposals')
        code, out = quiet(P.main, ['--pdf', found['III']['path'], '--volume', 'volume-iii', '--out', outp, '--root', root])
        prop = json.load(open(os.path.join(outp, 'volume-iii', 'proposal.json')))['volume-iii']
        kinds = {x['kind']: x['p'] for x in prop}
        check(code == 0 and 5 <= len(prop) <= 10, f'propose_pages drafts {len(prop)} pages', out)
        check(kinds.get('contents') == 2, 'it finds the contents page')
        comp = cat['volumes'][2]['parts'][-1]['p']        # pages from the compendium on are examination pages
        made = {p: ('figure' if p % 6 == 1 else 'table' if p % 6 == 2 else None) for p in range(3, comp)}
        check(made.get(kinds.get('figure')) == 'figure' and made.get(kinds.get('table')) == 'table', 'it proposes a figure page and a table page for those kinds', kinds)
        check(kinds.get('exam', 0) > 0 and 'exam' in {x['kind'] for x in prop}, 'it proposes an examination page')
        check(os.path.exists(os.path.join(outp, 'volume-iii', 'contact-sheet-1.jpg')) and os.path.exists(os.path.join(outp, 'volume-iii', 'candidates.md')),
              'it writes the contact sheet and the ranked candidates')
        check(not any(f.endswith('.pdf') for f in os.listdir(outp)), 'the proposals folder holds no PDF')
    finally:
        shutil.rmtree(tmp, ignore_errors=True)
    print('\n' + (f'{len(fails)} failure(s)' if fails else 'pipeline: all checks passed'))
    return 1 if fails else 0


if __name__ == '__main__':
    B.require('pdfinfo', 'pdftoppm', 'pdftotext')
    sys.exit(main())
