"""Build step for the UPSC Economics Handbook Collection.

Reads the public catalogue (content/upsc/handbooks.json) and a PRIVATE folder that
holds the eleven handbook PDFs, which never enter this repository. It then:

  1. checks every volume against its PDF: the title in the PDF's metadata must name
     the same volume, and the page count in the catalogue must equal the PDF's own;
  2. renders a few preview pages per volume (the cover, the contents page and the
     sample pages the catalogue names) at low resolution, each with the watermark
     "Arjun Agrawal | Economics Collection | Preview Only", as WebP files in
     assets/upsc/handbooks/<volume-id>/;
  3. writes src/modules/41-upsc-data.js, the catalogue as the page reads it.

No PDF, and no page outside the catalogue's short list, is ever written to the
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
MARK = 'Arjun Agrawal | Economics Collection | Preview Only'
COVER_W, PAGE_W = 520, 640          # pixels: low resolution by design (an A4 page at about 77 dpi)
FONTS = ['/usr/share/fonts/opentype/inter/Inter-SemiBold.otf', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
         '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf', '/Library/Fonts/Arial Bold.ttf', 'C:/Windows/Fonts/arialbd.ttf']


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


def font(size):
    from PIL import ImageFont
    for f in FONTS:
        if os.path.exists(f):
            return ImageFont.truetype(f, size)
    return ImageFont.load_default(size)


def render(pdf, page, width):
    from PIL import Image
    with tempfile.TemporaryDirectory() as d:
        base = os.path.join(d, 'p')
        subprocess.run(['pdftoppm', '-f', str(page), '-l', str(page), '-r', '150', '-png', '-singlefile', pdf, base], check=True)
        im = Image.open(base + '.png').convert('RGB')
        im.load()
    h = round(im.height * width / im.width)
    return im.resize((width, h), Image.LANCZOS)


def watermark(im, dark):
    """A subtle diagonal watermark across the page and a legible strip at its foot."""
    from PIL import Image, ImageDraw
    W, H = im.size
    layer = Image.new('RGBA', (W * 2, H * 2), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    f = font(max(11, W // 34))
    ink = (255, 255, 255, 30) if dark else (24, 34, 66, 34)
    step_y = max(70, H // 7)
    tw = d.textlength(MARK + '     ', font=f)
    for row, y in enumerate(range(0, H * 2, step_y)):
        x = -(row % 2) * tw / 2
        while x < W * 2:
            d.text((x, y), MARK, font=f, fill=ink)
            x += tw
    layer = layer.rotate(28, resample=Image.BICUBIC)
    layer = layer.crop((W // 2, H // 2, W // 2 + W, H // 2 + H))
    out = Image.alpha_composite(im.convert('RGBA'), layer)
    d2 = ImageDraw.Draw(out)
    fs = font(max(10, W // 46))
    bh = round(fs.size * 2.1)
    d2.rectangle((0, H - bh, W, H), fill=(14, 22, 44, 200) if not dark else (8, 12, 26, 170))
    tl = d2.textlength(MARK, font=fs)
    d2.text(((W - tl) / 2, H - bh + (bh - fs.size) / 2 - 1), MARK, font=fs, fill=(236, 226, 200, 255))
    return out.convert('RGB')


def save(im, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    buf = io.BytesIO()
    im.save(buf, 'WEBP', quality=70, method=6)
    data = buf.getvalue()
    if not (os.path.exists(path) and open(path, 'rb').read() == data):
        open(path, 'wb').write(data)
    return im.size


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
        keep = {'cover.webp', 'contents.webp'} | {f"page-{s['p']:02d}.webp" for s in v['samples']}
        for old in glob.glob(os.path.join(d, '*.webp')):
            if os.path.basename(old) not in keep:
                os.remove(old)
        save(watermark(render(pdf, 1, COVER_W), True), os.path.join(d, 'cover.webp'))
        save(watermark(render(pdf, 2, PAGE_W), False), os.path.join(d, 'contents.webp'))
        for s in v['samples']:
            if s['p'] <= 2 or s['p'] > v['pages']:
                sys.exit(f"Volume {v['n']}: sample page {s['p']} is out of range")
            save(watermark(render(pdf, s['p'], PAGE_W), False), os.path.join(d, f"page-{s['p']:02d}.webp"))
        print('previews', v['n'], v['id'], 2 + len(v['samples']), 'images')


def size_of(path):
    from PIL import Image
    with Image.open(path) as im:
        return im.size


def write_module(cat):
    vols = []
    for v in cat['volumes']:
        d = os.path.join(OUT, v['id'])
        img = {}
        for key, name in [('cover', 'cover.webp'), ('contents', 'contents.webp')] + [(f"p{s['p']}", f"page-{s['p']:02d}.webp") for s in v['samples']]:
            p = os.path.join(d, name)
            if os.path.exists(p):
                w, h = size_of(p)
                img[key] = {'src': f"assets/upsc/handbooks/{v['id']}/{name}", 'w': w, 'h': h}
        vols.append(dict(v, img=img))
    data = {k: cat[k] for k in ('price', 'series', 'seriesName', 'format')}
    data['volumes'] = vols
    body = json.dumps(data, ensure_ascii=False, separators=(',', ':'))
    js = ('/* GENERATED by tools/upsc/build_upsc.py from content/upsc/handbooks.json. Do not edit by hand.\n'
          '   The Economics Handbook Collection: the catalogue and its watermarked preview images.\n'
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
