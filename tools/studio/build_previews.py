"""Build the Resource Studio's preview images from private master files.

The masters never enter this repository, and neither do the recipes, because
the recipes name the masters' files. Keep both in a private folder outside the
repo: the masters, and a previews.json beside them. The script writes small,
watermarked, partial previews into assets/studio/. The masters are opened
read-only and never modified, copied or renamed.

  python3 tools/studio/build_previews.py --masters /path/to/private/masters [--recipes FILE] [--only SLUG]

--recipes defaults to <masters>/previews.json. Its shape is
  {"<item-id>": [{"out": "<item-id>/01-name.webp", "src": "<path inside masters>",
                  "page": 2, "crop": [0, 0, 1, 0.5], "width": 960, "mark": true}]}

Each recipe names a master by its path relative to --masters, an optional PDF
page (1-based), an optional crop (fractions of the page: left, top, right,
bottom) and the output width. A missing master is reported and skipped, so a
preview that already exists is never deleted by a partial run.

Limits enforced here (and checked again by tests/studio.mjs):
  * the longest side of a preview is at most MAX_SIDE pixels;
  * previews are lossy WebP, so they are never a usable print master;
  * every preview except a public carousel cover carries the watermark.
"""
import argparse, io, json, os, sys
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, 'assets', 'studio')
MAX_SIDE = 1200
FONT = next((f for f in ['/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
                         '/Library/Fonts/Arial.ttf', 'C:/Windows/Fonts/arial.ttf'] if os.path.exists(f)), None)


def render_pdf(path, page, dpi):
    import pymupdf  # PyMuPDF
    doc = pymupdf.open(path)
    pix = doc[page - 1].get_pixmap(dpi=dpi)
    return Image.open(io.BytesIO(pix.tobytes('png'))).convert('RGB')


def watermark(im, text):
    """A footer strip under the image rather than a stamp over it: the excerpt
    stays readable and the mark cannot be cropped without losing the edge."""
    size = max(11, im.width // 72)
    font = ImageFont.truetype(FONT, size) if FONT else ImageFont.load_default()
    pad = size
    strip = size + 2 * pad
    out = Image.new('RGB', (im.width, im.height + strip), (20, 16, 18))
    out.paste(im, (0, 0))
    d = ImageDraw.Draw(out)
    l, t, r, b = d.textbbox((0, 0), text, font=font)
    d.text((pad - l, im.height + (strip - (b - t)) // 2 - t), text, font=font, fill=(236, 230, 222))
    d.line([(0, im.height), (im.width, im.height)], fill=(122, 30, 46), width=max(2, size // 6))
    return out


def build(rec, masters):
    src = os.path.join(masters, rec['src'])
    if not os.path.exists(src):
        print('  missing master, skipped:', rec['src'])
        return None
    if src.lower().endswith('.pdf'):
        im = render_pdf(src, rec.get('page', 1), rec.get('dpi', 110))
    else:
        im = Image.open(src).convert('RGB')
    if 'crop' in rec:
        a, b, c, d = rec['crop']
        im = im.crop((int(a * im.width), int(b * im.height), int(c * im.width), int(d * im.height)))
    w = min(rec.get('width', 960), MAX_SIDE)
    if im.width > w:
        im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    if max(im.size) > MAX_SIDE:
        k = MAX_SIDE / max(im.size)
        im = im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS)
    if rec.get('mark', True):
        im = watermark(im, 'Preview excerpt · Arjun Agrawal · not for redistribution')
    out = os.path.join(OUT, rec['out'])
    os.makedirs(os.path.dirname(out), exist_ok=True)
    im.save(out, 'WEBP', quality=rec.get('q', 72), method=6)
    return out, im.size, os.path.getsize(out)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--masters', required=True, help='folder holding the private masters (outside the repository)')
    ap.add_argument('--recipes', help='the preview recipes (default: <masters>/previews.json)')
    ap.add_argument('--only', help='build the previews of one showcase item')
    a = ap.parse_args()
    masters = os.path.abspath(a.masters)
    if masters.startswith(ROOT + os.sep):
        sys.exit('refusing to run: the masters folder is inside the repository, where it would be published')
    recipes = os.path.abspath(a.recipes or os.path.join(masters, 'previews.json'))
    if recipes.startswith(ROOT + os.sep):
        sys.exit('refusing to run: the recipes name private files, so they must live outside the repository')
    spec = json.load(open(recipes, encoding='utf-8'))
    n = 0
    for slug, recs in spec.items():
        if slug.startswith('_') or (a.only and slug != a.only):
            continue
        print(slug)
        for rec in recs:
            r = build(rec, masters)
            if r:
                n += 1
                print('  %-48s %4dx%-4d %6.1f KB' % (rec['out'], r[1][0], r[1][1], r[2] / 1024))
    print('built', n, 'previews')


if __name__ == '__main__':
    main()
