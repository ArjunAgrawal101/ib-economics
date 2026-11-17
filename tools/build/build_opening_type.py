"""Build step for the opening sequence: the words of the identity as vector outlines.

Generated once from the site's own self-hosted typefaces (assets/fonts, SIL Open Font
License 1.1) and committed as data (tools/build/opening-type.json), which the opening's
migration embeds in index.html.

Why outlines: the opening is on screen from the first painted frame, long before a web
font can arrive, and the font stylesheet is deliberately not allowed to hold that frame.
Set as outlines, ECONOMICS and the motto look the same before, during and after the fonts
load, as the brand name (the logo's own vectors) always has. Each piece carries its words
in a data-text attribute, and the overlay's accessible name says them in full.

The fonts are variable (Bodoni Moda: weight and optical size; Manrope: weight), stored as
WOFF2. fontTools decodes them and HarfBuzz shapes the line (kerning included) at the
chosen instance and draws each glyph. Neither is a dependency of the site: install them in
a virtual environment OUTSIDE the repository.

    python3 -m venv /tmp/aae-type
    /tmp/aae-type/bin/pip install fonttools==4.55.3 brotli==1.1.0 uharfbuzz==0.45.0
    /tmp/aae-type/bin/python tools/build/build_opening_type.py

Deterministic: the same fonts and settings give the same file."""
import io, json, os
from fontTools.ttLib import TTFont
import uharfbuzz as hb

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
OUT = os.path.join(HERE, 'opening-type.json')


def r(v):
    v = round(v, 1)
    return str(int(v)) if v == int(v) else str(v)


class Pen:
    """Collects one glyph's outline as SVG path data in em units (1 em = 1000), y down."""
    def __init__(self, ox, k):
        self.ox, self.k, self.d = ox, k, []
    def p(self, x, y):
        return r(self.ox + x * self.k) + ' ' + r(-y * self.k)
    def moveTo(self, a): self.d.append('M' + self.p(*a))
    def lineTo(self, a): self.d.append('L' + self.p(*a))
    def qCurveTo(self, *pts):
        # TrueType quadratic splines: implied on-curve points between off-curve pairs
        pts = list(pts)
        while len(pts) > 2:
            (x1, y1), (x2, y2) = pts[0], pts[1]
            mid = ((x1 + x2) / 2, (y1 + y2) / 2)
            self.d.append('Q' + self.p(x1, y1) + ' ' + self.p(*mid))
            pts.pop(0)
        self.d.append('Q' + self.p(*pts[0]) + ' ' + self.p(*pts[1]))
    def curveTo(self, *pts):
        self.d.append('C' + ' '.join(self.p(*q) for q in pts))
    def closePath(self): self.d.append('Z')
    def endPath(self): pass
    def text(self): return ''.join(self.d)


def set_line(fontfile, axes, text, tracking):
    """One line of type: path data per word and for the whole line, baseline at y = 0."""
    tt = TTFont(os.path.join(ROOT, 'assets', 'fonts', fontfile))
    tt.flavor = None
    buf = io.BytesIO(); tt.save(buf)
    face = hb.Face(buf.getvalue())
    font = hb.Font(face)
    font.set_variations(axes)
    upem = face.upem
    k = 1000 / upem
    b = hb.Buffer(); b.add_str(text); b.guess_segment_properties()
    hb.shape(font, b, {'kern': True, 'liga': True})
    x = 0.0
    words, cur, w0 = [], [], None
    for i, (info, pos) in enumerate(zip(b.glyph_infos, b.glyph_positions)):
        ch = text[info.cluster]
        ox = x + pos.x_offset * k
        if ch == ' ':
            if cur: words.append({'d': ''.join(cur), 'x0': w0, 'x1': x})
            cur, w0 = [], None
        else:
            pen = Pen(ox, k)
            font.draw_glyph_with_pen(info.codepoint, pen)
            if w0 is None: w0 = ox
            cur.append(pen.text())
        x += pos.x_advance * k + (tracking * 1000 if i < len(b.glyph_infos) - 1 else 0)
    if cur: words.append({'d': ''.join(cur), 'x0': w0, 'x1': x})
    for w in words:
        w['x0'], w['x1'] = round(w['x0'], 1), round(w['x1'], 1)
    ext = font.get_font_extents('ltr')
    return {'words': words, 'advance': round(x, 1), 'ascender': round(ext.ascender * k, 1)}


def bounds(d):
    import re
    n = [float(v) for v in re.findall(r'-?\d+(?:\.\d+)?', d)]
    xs, ys = n[0::2], n[1::2]
    return min(xs), min(ys), max(xs), max(ys)


def box(d, pad):
    x0, y0, x1, y1 = bounds(d)
    return [int(x0 - pad) - (1 if x0 - pad < 0 else 0), int(y0 - pad) - 1, int(x1 - x0 + 2 * pad) + 2, int(y1 - y0 + 2 * pad) + 2]


# ECONOMICS: Bodoni Moda at a display optical size, gently tracked
econ = set_line('bodoni-moda-latin-7.woff2', {'wght': 400, 'opsz': 40}, 'ECONOMICS', 0.11)
# the motto: Manrope SemiBold capitals, widely tracked
motto = set_line('manrope-latin-2.woff2', {'wght': 600}, 'THINK LIKE AN ECONOMIST.', 0.3)
for w, t in zip(motto['words'], 'THINK LIKE AN ECONOMIST.'.split(' ')):
    w['text'] = t
ed = ''.join(w['d'] for w in econ['words'])
md = ''.join(w['d'] for w in motto['words'])
out = {
    'generator': 'tools/build/build_opening_type.py',
    'fonts': 'Bodoni Moda (wght 400, opsz 40) and Manrope (wght 600), from assets/fonts, SIL Open Font License 1.1',
    'econ': {'text': 'ECONOMICS', 'd': ed, 'viewBox': box(ed, 6)},
    'motto': {'text': 'THINK LIKE AN ECONOMIST.', 'd': md, 'viewBox': box(md, 4), 'words': motto['words']},
}
with open(OUT, 'w', encoding='utf-8') as f:
    json.dump(out, f, indent=1)
    f.write('\n')
print('wrote', os.path.relpath(OUT), '· ECONOMICS', len(ed), 'bytes · motto', len(md), 'bytes')
