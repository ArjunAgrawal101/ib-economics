"""Build step for the UPSC Economics Handbook Collection.

Reads the public catalogue (content/upsc/handbooks.json) and a PRIVATE folder that
holds the eleven handbook PDFs, which never enter this repository. It then:

  1. checks every volume against its PDF: the title in the PDF's metadata must name
     the same volume, and the page count in the catalogue must equal the PDF's own;
  2. renders the cover and a selected preview of eight pages per volume (the contents
     and syllabus map, the opening of Part A, and two spreads the catalogue names),
     exactly as the PDF prints them: nothing is drawn over a page, and the page's own
     running header, footer and copyright line are kept. Each page is written at a
     readable width with a small thumbnail beside it, as WebP files in
     assets/upsc/handbooks/<volume-id>/;
  3. writes src/modules/41-upsc-data.js, the catalogue as the page reads it.

No PDF, and no page outside the eight-page selection, is ever written to the
repository. Requires poppler (pdfinfo, pdftoppm) and Pillow.

Usage:
  python3 tools/upsc/build_upsc.py --src /private/folder/with/the/pdfs
  python3 tools/upsc/build_upsc.py --data-only     # rewrite the module from the JSON alone
"""
import argparse, glob, io, json, os, re, subprocess, sys, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CAT = os.path.join(ROOT, 'content', 'upsc', 'handbooks.json')
OUT = os.path.join(ROOT, 'assets', 'upsc', 'handbooks')
MOD = os.path.join(ROOT, 'src', 'modules', '41-upsc-data.js')
COVER_W, COVER_SM_W, PAGE_W, THUMB_W = 720, 360, 1100, 220   # pixels: a page at 1100 px is an A4 page at about 133 dpi
PREVIEW_PAGES = 8

def pdf_info(path):
    out = subprocess.run(['pdfinfo', path], capture_output=True, text=True, check=True).stdout
    pages = int(re.search(r'^Pages:\s+(\d+)', out, re.M).group(1))
    t = re.search(r'^Title:\s+(.*)$', out, re.M)
    return pages, (t.group(1).strip() if t else '')


def find_pdfs(src):
    """Map each volume numeral to its PDF, by the volume named in the PDF's title."""
    found = {}
    for p in sorted(glob.glob(os.path.join(src, '**', '*.pdf'), recursive=True)):
        try:
            n, title = pdf_info(p)
        except Exception:
            continue
        m = re.match(r'Volume ([IVXL]+):', title) or re.search(r'Volume_([IVXL]+)_', os.path.basename(p))
        if m:
            found.setdefault(m.group(1), (p, n, title))
    return found


def render(pdf, page, width):
    from PIL import Image
    with tempfile.TemporaryDirectory() as d:
        base = os.path.join(d, 'p')
        subprocess.run(['pdftoppm', '-f', str(page), '-l', str(page), '-r', '150', '-png', '-singlefile', pdf, base], check=True)
        im = Image.open(base + '.png').convert('RGB')
        im.load()
    h = round(im.height * width / im.width)
    return im.resize((width, h), Image.LANCZOS)


def save(im, path, q=66):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    buf = io.BytesIO()
    im.save(buf, 'WEBP', quality=q, method=6)
    data = buf.getvalue()
    if not (os.path.exists(path) and open(path, 'rb').read() == data):
        open(path, 'wb').write(data)
    return im.size


def preview_pages(v):
    """Eight pages: the contents and syllabus map (2), the opening of Part A (3 to 5),
    then each sample page the catalogue names with the page after it."""
    want = [2, 3, 4, 5]
    for s in v['samples']:
        want += [s['p'], s['p'] + 1]
    out = []
    for p in want:
        if 2 <= p <= v['pages'] and p not in out:
            out.append(p)
    q = max(out) + 1
    while len(out) < PREVIEW_PAGES and q <= v['pages']:
        out.append(q); q += 1
    return sorted(out[:PREVIEW_PAGES])


def caption(v, p):
    if p == 2:
        return 'Contents, syllabus map and series boundary'
    for s in v['samples']:
        if s['p'] == p:
            return s['cap'][0].upper() + s['cap'][1:]
    part = None
    for x in v['parts']:
        if x['p'] <= p:
            part = x
    return f"Part {part['l']}: {part['t']}" if part else f'Page {p}'


def build_previews(cat, src):
    found = find_pdfs(src)
    errors = []
    for v in cat['volumes']:
        if v['n'] not in found:
            errors.append(f"Volume {v['n']}: no PDF found in the private folder")
            continue
        pdf, pages, title = found[v['n']]
        if pages != v['pages']:
            errors.append(f"Volume {v['n']}: catalogue says {v['pages']} pages, the PDF has {pages}")
        if v['title'].split(',')[0].lower().replace('&', 'and') not in title.lower().replace('&', 'and'):
            errors.append(f"Volume {v['n']}: title '{v['title']}' does not match the PDF's '{title}'")
    if errors:
        sys.exit('\n'.join(errors))
    for v in cat['volumes']:
        pdf = found[v['n']][0]
        d = os.path.join(OUT, v['id'])
        pages = preview_pages(v)
        keep = {'cover.webp', 'cover-sm.webp'} | {f"page-{p:02d}.webp" for p in pages} | {f"thumb-{p:02d}.webp" for p in pages}
        for old in glob.glob(os.path.join(d, '*.webp')):
            if os.path.basename(old) not in keep:
                os.remove(old)
        cover = render(pdf, 1, COVER_W)
        save(cover, os.path.join(d, 'cover.webp'), 74)
        save(cover.resize((COVER_SM_W, round(cover.height * COVER_SM_W / cover.width)), Image_LANCZOS()), os.path.join(d, 'cover-sm.webp'), 72)
        for p in pages:
            im = render(pdf, p, PAGE_W)
            save(im, os.path.join(d, f"page-{p:02d}.webp"), 66)
            save(im.resize((THUMB_W, round(im.height * THUMB_W / im.width)), Image_LANCZOS()), os.path.join(d, f"thumb-{p:02d}.webp"), 60)
        print('previews', v['n'], v['id'], len(pages), 'pages:', pages)


def Image_LANCZOS():
    from PIL import Image
    return Image.LANCZOS


def size_of(path):
    from PIL import Image
    with Image.open(path) as im:
        return im.size


def write_module(cat):
    vols = []
    for v in cat['volumes']:
        d = os.path.join(OUT, v['id'])
        img = {'pages': []}
        for key, name in [('cover', 'cover.webp'), ('coverSm', 'cover-sm.webp')]:
            p = os.path.join(d, name)
            if os.path.exists(p):
                w, h = size_of(p)
                img[key] = {'src': f"assets/upsc/handbooks/{v['id']}/{name}", 'w': w, 'h': h}
        for pg in preview_pages(v):
            a, t = os.path.join(d, f"page-{pg:02d}.webp"), os.path.join(d, f"thumb-{pg:02d}.webp")
            if os.path.exists(a) and os.path.exists(t):
                (w, h), (tw, th) = size_of(a), size_of(t)
                img['pages'].append({'p': pg, 'cap': caption(v, pg), 'src': f"assets/upsc/handbooks/{v['id']}/page-{pg:02d}.webp", 'w': w, 'h': h,
                                     't': {'src': f"assets/upsc/handbooks/{v['id']}/thumb-{pg:02d}.webp", 'w': tw, 'h': th}})
        vols.append(dict(v, img=img))
    data = {k: cat[k] for k in ('price', 'series', 'seriesName', 'format', 'categories')}
    data['volumes'] = vols
    body = json.dumps(data, ensure_ascii=False, separators=(',', ':'))
    js = ('/* GENERATED by tools/upsc/build_upsc.py from content/upsc/handbooks.json. Do not edit by hand.\n'
          '   The Indian Economy Collection: the catalogue and its eight-page previews, rendered as the PDFs print them.\n'
          '   No handbook PDF is referenced here or stored in the repository. */\n'
          'const UPSC_HB=' + body + ';\n')
    if '</script' in js.lower():
        sys.exit('the catalogue contains a literal </script')
    old = open(MOD, encoding='utf-8').read() if os.path.exists(MOD) else ''
    if old != js:
        open(MOD, 'w', encoding='utf-8').write(js)
    print('module', os.path.relpath(MOD, ROOT), len(js), 'bytes')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--src', help='private folder that holds the eleven handbook PDFs')
    ap.add_argument('--data-only', action='store_true')
    a = ap.parse_args()
    cat = json.load(open(CAT, encoding='utf-8'))
    if a.src and not a.data_only:
        if os.path.commonpath([os.path.abspath(a.src), ROOT]) == ROOT:
            sys.exit('the PDFs must stay outside the repository')
        build_previews(cat, a.src)
    write_module(cat)


if __name__ == '__main__':
    main()
