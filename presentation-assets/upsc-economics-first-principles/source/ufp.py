"""Deterministic SVG helpers for the UPSC Economics from First Principles deck (Arjun Agrawal brand system).

Same palette and conventions as the earlier IB decks (econsvg.py): curves are computed in data space,
intersections are solved exactly, and every label is placed from those solutions.
Backgrounds are transparent so the diagrams sit directly on the light slide.
"""
import os

INK = "#0E1E3A"       # logo navy: text, axes
NAVY = "#1B3460"      # original curves
GOLD = "#B08A47"      # new / shifted curves, money flows
GOLD_TXT = "#8A6A2E"  # gold for text
GREEN = "#2E7D5B"     # gains, real flows, injections
RED = "#B0412E"       # sacrifices, leakages
BLUE = "#2F5D8C"      # neutral accent
GUIDE = "#8C93A0"     # dashed guides
MUTED = "#5B6577"     # secondary text
HALO = "#FFFDFA"      # label halo (slide background)
IVORY = "#F7F3E8"     # soft fills
EDGE = "#E2D6BC"      # soft borders
FONT = "Inter, 'DejaVu Sans', Arial, sans-serif"
SERIF = "Lora, Georgia, 'Times New Roman', serif"

OUT_SVG = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "svg")


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def rich(text):
    """'D_{1}' renders 1 as a subscript."""
    out, i = [], 0
    while i < len(text):
        if text.startswith("_{", i):
            j = text.index("}", i)
            out.append(f'<tspan dy="0.3em" font-size="68%">{esc(text[i+2:j])}</tspan><tspan dy="-0.3em"></tspan>')
            i = j + 1
        else:
            j = text.find("_{", i)
            j = len(text) if j == -1 else j
            out.append(esc(text[i:j]))
            i = j
    return "".join(out)


def tw(s, size, k=0.56):
    """Rough rendered width of Inter text."""
    return len(s.replace("_{", "").replace("}", "")) * size * k


class Canvas:
    def __init__(self, w, h):
        self.w, self.h = w, h
        self.els, self.defs, self._m = [], [], set()

    def add(self, s):
        self.els.append(s)

    def marker(self, color, size=12):
        mid = f"ah{color.strip('#')}{size}"
        if mid not in self._m:
            self._m.add(mid)
            self.defs.append(
                f'<marker id="{mid}" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="{size}" markerHeight="{size}" '
                f'markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M0,0 L12,6 L0,12 L3,6 z" fill="{color}"/></marker>')
        return mid

    def line(self, x1, y1, x2, y2, color=INK, w=4, dash=None, arrow_end=False, arrow_start=False, cap="round",
             opacity=1, head=None):
        head = head or max(16, int(w * 3.4))
        d = f' stroke-dasharray="{dash}"' if dash else ""
        me = f' marker-end="url(#{self.marker(color, head)})"' if arrow_end else ""
        ms = f' marker-start="url(#{self.marker(color, head)})"' if arrow_start else ""
        self.add(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{color}" stroke-width="{w}" '
                 f'stroke-linecap="{cap}"{d}{me}{ms} opacity="{opacity}"/>')

    def path(self, d, color=INK, w=4, fill="none", dash=None, arrow_end=False, opacity=1, head=None, join="round"):
        head = head or max(16, int(w * 3.4))
        da = f' stroke-dasharray="{dash}"' if dash else ""
        me = f' marker-end="url(#{self.marker(color, head)})"' if arrow_end else ""
        self.add(f'<path d="{d}" stroke="{color}" stroke-width="{w}" fill="{fill}" stroke-linecap="round" '
                 f'stroke-linejoin="{join}"{da}{me} opacity="{opacity}"/>')

    def text(self, x, y, s, size=30, color=INK, anchor="start", weight=500, family=FONT, italic=False,
             halo=True, spacing=None, baseline="middle"):
        st = ' font-style="italic"' if italic else ""
        ls = f' letter-spacing="{spacing}"' if spacing else ""
        h = f' paint-order="stroke" stroke="{HALO}" stroke-width="10" stroke-linejoin="round"' if halo else ""
        self.add(f'<text x="{x:.1f}" y="{y:.1f}" font-family="{family}" font-size="{size}" fill="{color}" '
                 f'text-anchor="{anchor}" font-weight="{weight}" dominant-baseline="{baseline}"{st}{ls}{h}>{rich(s)}</text>')

    def lines(self, x, y, rows, size=30, color=INK, anchor="middle", weight=500, lh=1.3, **kw):
        """Multi-line block vertically centred on y. rows: list of str or (str, dict) overrides."""
        n = len(rows)
        y0 = y - (n - 1) * size * lh / 2
        for i, r in enumerate(rows):
            if isinstance(r, tuple):
                s, o = r
                args = dict(size=size, color=color, anchor=anchor, weight=weight)
                args.update(kw); args.update(o)
                self.text(x, y0 + i * size * lh, s, **args)
            else:
                self.text(x, y0 + i * size * lh, r, size=size, color=color, anchor=anchor, weight=weight, **kw)

    def circle(self, x, y, r=9, fill=INK, stroke=HALO, sw=4, opacity=1):
        self.add(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" opacity="{opacity}"/>')

    def rect(self, x, y, w, h, fill="none", stroke=None, sw=2, rx=0, opacity=1, dash=None):
        s = f' stroke="{stroke}" stroke-width="{sw}"' if stroke else ""
        d = f' stroke-dasharray="{dash}"' if dash else ""
        self.add(f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{rx}" fill="{fill}"{s}{d} opacity="{opacity}"/>')

    def badge(self, x, y, s, color, size=28, anchor="middle", pad=18, fill=None, txt=None):
        w = tw(s, size) + 2 * pad
        h = size * 1.6
        x0 = x - w / 2 if anchor == "middle" else (x - w if anchor == "end" else x)
        self.rect(x0, y - h / 2, w, h, fill=fill or color, rx=h / 2)
        self.text(x0 + w / 2, y + 1, s, size=size, color=txt or ("#FFFFFF" if fill is None else color),
                  anchor="middle", weight=650, halo=False)
        return x0, x0 + w

    def step(self, x, y, n, color=INK, r=26, size=30):
        self.circle(x, y, r, color, HALO, 4)
        self.text(x, y + 1, str(n), size=size, color="#FFFFFF", anchor="middle", weight=750, halo=False)

    def box(self, x, y, w, h, title=None, sub=None, fill=INK, tcol="#FFFFFF", scol=None, tsize=34, ssize=24,
            rx=18, stroke=None, sw=3, spacing="2", title_weight=750, sub_lh=1.3):
        self.rect(x, y, w, h, fill=fill, stroke=stroke, sw=sw, rx=rx)
        rows = []
        if title:
            rows.append((title, dict(size=tsize, weight=title_weight, color=tcol, spacing=spacing)))
        if sub:
            for s in (sub if isinstance(sub, list) else [sub]):
                rows.append((s, dict(size=ssize, weight=500, color=scol or tcol, spacing=None)))
        if not rows:
            return
        # stack with each row's own size
        heights = [r[1]["size"] * (1.25 if i == 0 and title else sub_lh) for i, r in enumerate(rows)]
        total = sum(heights)
        cy = y + h / 2 - total / 2
        for (s, o), hh in zip(rows, heights):
            self.text(x + w / 2, cy + hh / 2, s, size=o["size"], color=o["color"], anchor="middle",
                      weight=o["weight"], halo=False, spacing=o.get("spacing"))
            cy += hh

    def svg(self):
        return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{self.w}" height="{self.h}" viewBox="0 0 {self.w} {self.h}">'
                f'<defs>{"".join(self.defs)}</defs>{"".join(self.els)}</svg>')

    def save(self, name):
        os.makedirs(OUT_SVG, exist_ok=True)
        with open(os.path.join(OUT_SVG, name + ".svg"), "w") as f:
            f.write(self.svg())
        print("saved", name)


class Ax:
    """Axes mapping data (0..xmax, 0..ymax) to the pixel box with origin (X0,Y0) and top-right (X1,Y1)."""

    def __init__(self, cv, X0, Y0, X1, Y1, xmax=10, ymax=10, ylab="Price", xlab="Quantity", size=34):
        self.cv, self.X0, self.Y0, self.X1, self.Y1, self.xmax, self.ymax = cv, X0, Y0, X1, Y1, xmax, ymax
        self.ylab, self.xlab, self.size = ylab, xlab, size
        self.xtitle_dy = 92

    def px(self, x, y):
        return (self.X0 + (self.X1 - self.X0) * x / self.xmax, self.Y0 - (self.Y0 - self.Y1) * y / self.ymax)

    def axes(self, origin=True):
        cv = self.cv
        cv.line(self.X0, self.Y0, self.X0, self.Y1 - 34, INK, 4.5, arrow_end=True, cap="butt")
        cv.line(self.X0, self.Y0, self.X1 + 34, self.Y0, INK, 4.5, arrow_end=True, cap="butt")
        if origin:
            cv.text(self.X0 - 14, self.Y0 + 26, "0", size=26, color=MUTED, anchor="end")
        cv.text(self.X0 - 6, self.Y1 - 70, self.ylab, size=self.size, color=INK, anchor="start", weight=700)
        cv.text(self.X1 + 34, self.Y0 + self.xtitle_dy, self.xlab, size=self.size, color=INK, anchor="end", weight=700)

    def xticks(self, vals, fmt="{}", size=26, color=MUTED):
        for v in vals:
            a, b = self.px(v, 0)
            self.cv.line(a, b, a, b + 10, INK, 3, cap="butt")
            self.cv.text(a, b + 36, fmt.format(v), size=size, color=color, anchor="middle", weight=500)

    def yticks(self, vals, fmt="{}", size=26, color=MUTED):
        for v in vals:
            a, b = self.px(0, v)
            self.cv.line(a - 10, b, a, b, INK, 3, cap="butt")
            self.cv.text(a - 18, b, fmt.format(v), size=size, color=color, anchor="end", weight=500)

    def poly(self, f, x0, x1, color=NAVY, w=7, n=240, dash=None, opacity=1):
        pts = [self.px(x0 + (x1 - x0) * i / n, f(x0 + (x1 - x0) * i / n)) for i in range(n + 1)]
        self.cv.path("M" + " L".join(f"{a:.1f},{b:.1f}" for a, b in pts), color=color, w=w, dash=dash, opacity=opacity)

    def fill_under(self, f, x0, x1, fill, opacity=0.5, n=200):
        pts = [self.px(x0 + (x1 - x0) * i / n, f(x0 + (x1 - x0) * i / n)) for i in range(n + 1)]
        a, b = self.px(x0, 0); c, d = self.px(x1, 0)
        dpath = f"M{a:.1f},{b:.1f} " + " ".join(f"L{p:.1f},{q:.1f}" for p, q in pts) + f" L{c:.1f},{d:.1f} Z"
        self.cv.add(f'<path d="{dpath}" fill="{fill}" opacity="{opacity}" stroke="none"/>')

    def seg(self, x0, y0, x1, y1, color=NAVY, w=7, dash=None, arrow_end=False, arrow_start=False, gap=0):
        a, b = self.px(x0, y0); c, d = self.px(x1, y1)
        if gap:
            import math
            L = math.hypot(c - a, d - b)
            ux, uy = (c - a) / L, (d - b) / L
            a, b, c, d = a + ux * gap, b + uy * gap, c - ux * gap, d - uy * gap
        self.cv.line(a, b, c, d, color, w, dash=dash, arrow_end=arrow_end, arrow_start=arrow_start)

    def hguide(self, y, x_to, label=None, color=INK, size=30, ldy=0, gcol=GUIDE):
        a, b = self.px(0, y); c, _ = self.px(x_to, y)
        self.cv.line(a, b, c, b, gcol, 3, dash="10 10", cap="butt")
        if label:
            self.cv.text(self.X0 - 16, b + ldy, label, size=size, color=color, anchor="end", weight=700)

    def vguide(self, x, y_to, label=None, color=INK, size=30, dy=38, gcol=GUIDE):
        a, b = self.px(x, 0); _, d = self.px(x, y_to)
        self.cv.line(a, b, a, d, gcol, 3, dash="10 10", cap="butt")
        if label:
            self.cv.text(a, b + dy, label, size=size, color=color, anchor="middle", weight=700)

    def dot(self, x, y, fill=INK, r=12):
        a, b = self.px(x, y)
        self.cv.circle(a, b, r, fill)

    def label(self, x, y, s, size=30, color=INK, anchor="start", weight=700, dx=0, dy=0, halo=True):
        a, b = self.px(x, y)
        self.cv.text(a + dx, b + dy, s, size=size, color=color, anchor=anchor, weight=weight, halo=halo)


def monotone(xs, ys):
    """Fritsch-Carlson monotone cubic through the points; returns f(x)."""
    n = len(xs)
    d = [(ys[i + 1] - ys[i]) / (xs[i + 1] - xs[i]) for i in range(n - 1)]
    m = [d[0]] + [(d[i - 1] + d[i]) / 2 if d[i - 1] * d[i] > 0 else 0 for i in range(1, n - 1)] + [d[-1]]
    for i in range(n - 1):
        if d[i] == 0:
            m[i] = m[i + 1] = 0
        else:
            a, b = m[i] / d[i], m[i + 1] / d[i]
            s = a * a + b * b
            if s > 9:
                t = 3 / s ** 0.5
                m[i], m[i + 1] = t * a * d[i], t * b * d[i]

    def f(x):
        if x <= xs[0]:
            return ys[0]
        if x >= xs[-1]:
            return ys[-1]
        for i in range(n - 1):
            if xs[i] <= x <= xs[i + 1]:
                h = xs[i + 1] - xs[i]
                t = (x - xs[i]) / h
                h00 = 2 * t ** 3 - 3 * t ** 2 + 1
                h10 = t ** 3 - 2 * t ** 2 + t
                h01 = -2 * t ** 3 + 3 * t ** 2
                h11 = t ** 3 - t ** 2
                return h00 * ys[i] + h10 * h * m[i] + h01 * ys[i + 1] + h11 * h * m[i + 1]
    return f
