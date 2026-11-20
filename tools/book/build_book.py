#!/usr/bin/env python3
"""Build the website's preview of THE INDIAN ECONOMY (and, when its PDF is supplied, of the
Digital Revision Companion) from the private PDF, which never enters the repository.

What it does:
  1. reads tools/book/preview-pages.json, the pages chosen for the website, with captions;
  2. checks every chosen page against the PDF itself: the printed folio at the foot of the
     page must be the page number written in the selection (so the website always shows the
     real page number, never the PDF's position);
  3. renders the cover and each chosen page as WebP into assets/book/<id>/ (no watermark,
     no overlay; pages 1600 px wide so that the text stays readable when zoomed, and
     360 px thumbnails);
  4. writes src/modules/51-book-data.js, the preview list as the page reads it.

Only the chosen pages are written. The PDF is read from wherever --src points (keep it
outside the repository: .gitignore refuses every PDF anyway).

Usage:
  python3 tools/book/build_book.py --src /path/to/The_Indian_Economy_First_Edition_2026-27_FINAL-Part_1.pdf
  python3 tools/book/build_book.py --src BOOK.pdf --companion COMPANION.pdf   (once companion pages are chosen)
  python3 tools/book/build_book.py --check      (no PDF: the selection, the images and the module agree)
Then run python3 tools/build/splice.py.

Requires poppler (pdfinfo, pdftoppm, pdftotext) and Pillow.
"""
import argparse, io, json, os, re, subprocess, sys, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SEL = os.path.join(ROOT, 'tools', 'book', 'preview-pages.json')
MOD = os.path.join(ROOT, 'src', 'modules', '51-book-data.js')
ASSETS = os.path.join(ROOT, 'assets', 'book')
BUDGET_MB = 6.0


def run(cmd):
    return subprocess.run(cmd, check=True, capture_output=True, text=True).stdout


def pdf_pages(pdf):
    m = re.search(r'^Pages:\s+(\d+)', run(['pdfinfo', pdf]), re.M)
    return int(m.group(1)) if m else 0


def folio(pdf, page):
    """the printed page number: the last token of the last line of text on the page"""
    lines = [l.strip() for l in run(['pdftotext', '-f', str(page), '-l', str(page), '-layout', pdf, '-']).splitlines() if l.strip()]
    return lines[-1].split()[-1] if lines else ''


def render(pdf, page, width):
    from PIL import Image
    with tempfile.TemporaryDirectory() as d:
        base = os.path.join(d, 'p')
        subprocess.run(['pdftoppm', '-f', str(page), '-l', str(page), '-scale-to-x', str(width), '-scale-to-y', '-1',
                        '-png', '-singlefile', pdf, base], check=True, capture_output=True)
        im = Image.open(base + '.png')
        im.load()
    return im.convert('RGB')


def shrink(im, width):
    from PIL import Image
    return im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)


def save_webp(im, path, quality):
    """write only when the bytes change, so an unchanged page leaves git untouched"""
    buf = io.BytesIO()
    im.save(buf, 'WEBP', quality=quality, method=6)
    data = buf.getvalue()
    if not (os.path.exists(path) and open(path, 'rb').read() == data):
        open(path, 'wb').write(data)
    return im.size


def rel(*parts):
    return '/'.join(['assets', 'book'] + list(parts))


def name(p, small=False):
    return f'page-{p}' + ('-sm' if small else '') + '.webp'


def build(key, item, pdf, opts):
    d = os.path.join(ASSETS, item['id'])
    os.makedirs(d, exist_ok=True)
    n = pdf_pages(pdf)
    problems = []
    for s in item['pages']:
        if not 1 <= s['pdf'] <= n:
            problems.append(f"{key}: PDF page {s['pdf']} is outside the file (1 to {n})")
            continue
        f = folio(pdf, s['pdf'])
        if f.lower() != str(s['p']).lower():
            problems.append(f"{key}: PDF page {s['pdf']} is printed page {f!r}, not {s['p']!r}")
    if problems:
        print('\n'.join(problems))
        sys.exit(1)
    out = {'id': item['id'], 'title': item['title'], 'pv': []}
    keep = set()
    if item.get('cover_pdf'):
        im = render(pdf, item['cover_pdf'], opts.cover)
        w, h = save_webp(im, os.path.join(d, 'cover.webp'), opts.quality)
        sw, sh = save_webp(shrink(im, opts.thumb), os.path.join(d, 'cover-sm.webp'), opts.quality)
        out['cover'] = {'src': rel(item['id'], 'cover.webp'), 'w': w, 'h': h, 'sm': {'src': rel(item['id'], 'cover-sm.webp'), 'w': sw, 'h': sh}}
        keep |= {'cover.webp', 'cover-sm.webp'}
    for s in item['pages']:
        im = render(pdf, s['pdf'], opts.width)
        w, h = save_webp(im, os.path.join(d, name(s['p'])), opts.quality)
        sw, sh = save_webp(shrink(im, opts.thumb), os.path.join(d, name(s['p'], True)), opts.quality)
        out['pv'].append({'p': str(s['p']), 'kind': s['kind'], 'cap': s['cap'], 'src': rel(item['id'], name(s['p'])), 'w': w, 'h': h,
                          'sm': {'src': rel(item['id'], name(s['p'], True)), 'w': sw, 'h': sh}})
        keep |= {name(s['p']), name(s['p'], True)}
    for f in os.listdir(d):
        if f not in keep:
            os.remove(os.path.join(d, f))
            print(f'removed {item["id"]}/{f} (no longer chosen)')
    print(f"{key}: {len(out['pv'])} pages{' and the cover' if 'cover' in out else ''} written to assets/book/{item['id']}/")
    return out


def weight():
    total = 0
    for base, _, files in os.walk(ASSETS):
        total += sum(os.path.getsize(os.path.join(base, f)) for f in files)
    mb = total / 1048576
    print(f'assets/book: {mb:.2f} MB (budget {BUDGET_MB} MB)')
    return mb


def write_module(data):
    body = json.dumps(data, ensure_ascii=False, separators=(',', ':'))
    text = ('/* GENERATED by tools/book/build_book.py from tools/book/preview-pages.json and the private PDF.\n'
            '   Do not edit by hand. The cover and the chosen pages of THE INDIAN ECONOMY, as images, with the\n'
            '   printed page number of each (checked against the page itself). No PDF is referenced here or\n'
            '   stored in the repository. */\n'
            'const BOOK_PV=' + body + ';\n')
    if not (os.path.exists(MOD) and open(MOD, encoding='utf-8').read() == text):
        open(MOD, 'w', encoding='utf-8').write(text)
    print('wrote src/modules/51-book-data.js')


def check(sel):
    """no PDF: every chosen page has its two images, and the module lists exactly the selection"""
    bad = []
    mod = open(MOD, encoding='utf-8').read() if os.path.exists(MOD) else ''
    m = re.search(r'const BOOK_PV=(\{.*\});\s*$', mod, re.S)
    data = json.loads(m.group(1)) if m else {}
    for key in ('book', 'companion'):
        item = sel[key]
        got = data.get(key, {})
        want = [(str(s['p']), s['kind'], s['cap']) for s in item['pages']]
        have = [(x['p'], x['kind'], x['cap']) for x in got.get('pv', [])]
        if want != have:
            bad.append(f'{key}: the module does not match the selection (run the build with --src)')
        for s in item['pages']:
            for small in (False, True):
                f = os.path.join(ASSETS, item['id'], name(s['p'], small))
                if not os.path.exists(f):
                    bad.append(f'missing {os.path.relpath(f, ROOT)}')
        if item.get('cover_pdf') and not os.path.exists(os.path.join(ASSETS, item['id'], 'cover.webp')):
            bad.append(f'{key}: missing cover.webp')
    for base, _, files in os.walk(ASSETS):
        for f in files:
            if not f.endswith('.webp'):
                bad.append(f'not an image: {os.path.relpath(os.path.join(base, f), ROOT)}')
    if weight() > BUDGET_MB:
        bad.append('over budget')
    print('\n'.join(bad) if bad else 'check: the selection, the images and the module agree')
    return not bad


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--src', help='the private PDF of the book')
    ap.add_argument('--companion', help='the private PDF of the Digital Revision Companion')
    ap.add_argument('--check', action='store_true')
    ap.add_argument('--width', type=int, default=1600)
    ap.add_argument('--thumb', type=int, default=360)
    ap.add_argument('--cover', type=int, default=1000)
    ap.add_argument('--quality', type=int, default=80)
    opts = ap.parse_args(argv)
    sel = json.load(open(SEL, encoding='utf-8'))
    if opts.check:
        sys.exit(0 if check(sel) else 1)
    if not opts.src:
        ap.error('--src is required (or use --check)')
    for pdf in filter(None, [opts.src, opts.companion]):
        if os.path.commonpath([os.path.abspath(pdf), ROOT]) == ROOT:
            ap.error(f'{pdf} is inside the repository: keep the PDF outside it')
    data = {'book': build('book', sel['book'], opts.src, opts)}
    comp = sel['companion']
    if comp['pages'] and not opts.companion:
        ap.error('the companion has chosen pages: pass --companion')
    data['companion'] = build('companion', comp, opts.companion, opts) if comp['pages'] else {'id': comp['id'], 'title': comp['title'], 'pv': []}
    write_module(data)
    if weight() > BUDGET_MB:
        print(f'WARNING: over the {BUDGET_MB} MB budget; choose fewer pages or lower --quality')


if __name__ == '__main__':
    main()
