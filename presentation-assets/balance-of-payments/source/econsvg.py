"""Deterministic SVG builder for IB Economics diagrams (Arjun Agrawal brand system).

All geometry is computed analytically: curves are straight lines in data space,
intersections are solved exactly, and every label is placed from those solutions.
"""
from dataclasses import dataclass

# ---- Brand + semantic palette -------------------------------------------------
INK = "#0E1E3A"        # logo navy, text and axes
NAVY = "#1B3460"       # original curves
GOLD = "#B08A47"       # shifted / new curves
GOLD_TXT = "#8A6A2E"   # gold for text (higher contrast)
APP = "#2E7D5B"        # appreciation / revaluation
DEP = "#B0412E"        # depreciation / devaluation
CB = "#2F5D8C"         # central-bank intervention
GUIDE = "#8C93A0"      # dashed guides
PANEL = "#FFFDF8"      # diagram card
EDGE = "#E2D6BC"       # card border
MUTED = "#5B6577"      # secondary text
FONT = "Inter, 'Helvetica Neue', Arial, sans-serif"
SERIF = "Lora, Georgia, 'Times New Roman', serif"


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def rich(text):
    """Tiny markup: '_x' subscript for next token chars inside {}: e.g. 'D_{1}' 'ER_{e}'."""
    out, i = [], 0
    while i < len(text):
        if text.startswith("_{", i):
            j = text.index("}", i)
            out.append(f'<tspan dy="0.32em" font-size="68%">{esc(text[i+2:j])}</tspan><tspan dy="-0.32em"></tspan>')
            i = j + 1
        else:
            j = text.find("_{", i)
            j = len(text) if j == -1 else j
            out.append(esc(text[i:j]))
            i = j
    return "".join(out)


@dataclass
class Line:
    """Straight line in data space through (x1,y1)-(x2,y2)."""
    x1: float
    y1: float
    x2: float
    y2: float

    @property
    def m(self):
        return (self.y2 - self.y1) / (self.x2 - self.x1) if self.x2 != self.x1 else None

    def shift_x(self, dx):
        return Line(self.x1 + dx, self.y1, self.x2 + dx, self.y2)

    def shift_y(self, dy):
        return Line(self.x1, self.y1 + dy, self.x2, self.y2 + dy)

    def y_at(self, x):
        return self.y1 + self.m * (x - self.x1)

    def x_at(self, y):
        if self.m is None:
            return self.x1
        return self.x1 + (y - self.y1) / self.m


def intersect(a: Line, b: Line):
    if a.m is None:
        return a.x1, b.y_at(a.x1)
    if b.m is None:
        return b.x1, a.y_at(b.x1)
    x = (b.y1 - a.y1 + a.m * a.x1 - b.m * b.x1) / (a.m - b.m)
    return x, a.y_at(x)


class Canvas:
    def __init__(self, w=1500, h=1050, header=None, sub=None):
        self.w, self.h = w, h
        self.els = []
        self.defs = []
        self.header, self.sub = header, sub
        self._markers = set()

    # ------------------------------------------------------------- primitives
    def add(self, s):
        self.els.append(s)

    def marker(self, color):
        mid = "ah" + color.strip("#")
        if mid not in self._markers:
            self._markers.add(mid)
            self.defs.append(
                f'<marker id="{mid}" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="12" markerHeight="12" '
                f'markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M0,0 L12,6 L0,12 L3,6 z" fill="{color}"/></marker>')
        return mid

    def line(self, x1, y1, x2, y2, color=INK, w=4, dash=None, arrow_end=False, arrow_start=False, cap="round", opacity=1):
        d = f' stroke-dasharray="{dash}"' if dash else ""
        me = f' marker-end="url(#{self.marker(color)})"' if arrow_end else ""
        ms = f' marker-start="url(#{self.marker(color)})"' if arrow_start else ""
        self.add(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{color}" stroke-width="{w}" '
                 f'stroke-linecap="{cap}"{d}{me}{ms} opacity="{opacity}"/>')

    def text(self, x, y, s, size=30, color=INK, anchor="start", weight=500, family=FONT, italic=False,
             halo=True, spacing=None, baseline="middle"):
        st = ' font-style="italic"' if italic else ""
        ls = f' letter-spacing="{spacing}"' if spacing else ""
        h = (f' paint-order="stroke" stroke="{PANEL}" stroke-width="9" stroke-linejoin="round"') if halo else ""
        self.add(f'<text x="{x:.1f}" y="{y:.1f}" font-family="{family}" font-size="{size}" fill="{color}" '
                 f'text-anchor="{anchor}" font-weight="{weight}" dominant-baseline="{baseline}"{st}{ls}{h}>{rich(s)}</text>')

    def circle(self, x, y, r=9, fill=INK, stroke=PANEL, sw=4):
        self.add(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>')

    def rect(self, x, y, w, h, fill="none", stroke=None, sw=2, rx=0, opacity=1, dash=None):
        s = f' stroke="{stroke}" stroke-width="{sw}"' if stroke else ""
        d = f' stroke-dasharray="{dash}"' if dash else ""
        self.add(f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{rx}" fill="{fill}"{s}{d} opacity="{opacity}"/>')

    def path(self, d, color=INK, w=4, fill="none", dash=None, arrow_end=False, opacity=1):
        da = f' stroke-dasharray="{dash}"' if dash else ""
        me = f' marker-end="url(#{self.marker(color)})"' if arrow_end else ""
        self.add(f'<path d="{d}" stroke="{color}" stroke-width="{w}" fill="{fill}" stroke-linecap="round" '
                 f'stroke-linejoin="round"{da}{me} opacity="{opacity}"/>')

    def badge(self, x, y, s, color, size=26, anchor="start", pad=14, fill=None):
        """Rounded pill label. Width estimated from character count (Inter ~0.56em avg)."""
        tw = len(s.replace("_{", "").replace("}", "")) * size * 0.56
        h = size * 1.55
        x0 = x - (tw / 2 + pad) if anchor == "middle" else (x - tw - 2 * pad if anchor == "end" else x)
        self.rect(x0, y - h / 2, tw + 2 * pad, h, fill=fill or color, rx=h / 2)
        self.text(x0 + pad + tw / 2, y + 1, s, size=size, color="#FFFFFF" if fill is None else color,
                  anchor="middle", weight=600, halo=False)

    def step(self, x, y, n, color=INK, r=21):
        self.add(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r}" fill="{color}" stroke="{PANEL}" stroke-width="4"/>')
        self.text(x, y + 1, str(n), size=25, color="#FFFFFF", anchor="middle", weight=700, halo=False)

    # ------------------------------------------------------------- output
    def svg(self):
        hdr = ""
        if self.header:
            hdr += (f'<text x="56" y="62" font-family="{FONT}" font-size="25" font-weight="700" fill="{GOLD_TXT}" '
                    f'letter-spacing="3" dominant-baseline="middle">{esc(self.header.upper())}</text>')
        if self.sub:
            hdr += (f'<text x="56" y="98" font-family="{FONT}" font-size="22" font-weight="500" fill="{MUTED}" '
                    f'dominant-baseline="middle">{rich(self.sub)}</text>')
        return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{self.w}" height="{self.h}" viewBox="0 0 {self.w} {self.h}">'
                f'<defs>{"".join(self.defs)}</defs>'
                f'<rect x="2" y="2" width="{self.w-4}" height="{self.h-4}" rx="28" fill="{PANEL}" stroke="{EDGE}" stroke-width="3"/>'
                f'{hdr}{"".join(self.els)}</svg>')


class Plot:
    """Axes with data space [0,10]x[0,10] mapped into a pixel box."""

    def __init__(self, cv: Canvas, x0, y0, x1, y1, ylab=("Price of ₹", "(US$ per ₹)"), xlab=("Quantity of ₹",)):
        self.cv, self.X0, self.Y0, self.X1, self.Y1 = cv, x0, y0, x1, y1  # (X0,Y0)=origin bottom-left, (X1,Y1)=top-right
        self.ylab, self.xlab = ylab, xlab

    def px(self, x, y):
        return (self.X0 + (self.X1 - self.X0) * x / 10.0, self.Y0 - (self.Y0 - self.Y1) * y / 10.0)

    def axes(self, ylab_size=26):
        cv = self.cv
        cv.line(self.X0, self.Y0, self.X0, self.Y1 - 22, INK, 4, arrow_end=True, cap="butt")
        cv.line(self.X0, self.Y0, self.X1 + 22, self.Y0, INK, 4, arrow_end=True, cap="butt")
        cv.text(self.X0 - 16, self.Y0 + 26, "0", size=24, color=MUTED, anchor="end")
        for i, s in enumerate(self.ylab):
            cv.text(self.X0 - 4, self.Y1 - 72 + i * 32, s, size=ylab_size if i == 0 else ylab_size - 4,
                    color=INK if i == 0 else MUTED, anchor="start", weight=700 if i == 0 else 500)
        for i, s in enumerate(self.xlab):
            cv.text(self.X1 + 30, self.Y0 + 48 + i * 30, s, size=ylab_size if i == 0 else ylab_size - 4,
                    color=INK if i == 0 else MUTED, anchor="end", weight=700 if i == 0 else 500)

    def curve(self, L: Line, color=NAVY, w=6, label=None, label_at="end", dx=14, dy=0, size=32, dash=None, label_color=None):
        (a, b), (c, d) = self.px(L.x1, L.y1), self.px(L.x2, L.y2)
        self.cv.line(a, b, c, d, color, w, dash=dash)
        if label:
            x, y = (c, d) if label_at == "end" else (a, b)
            self.cv.text(x + dx, y + dy, label, size=size, color=label_color or color, weight=700,
                         anchor="start" if dx >= 0 else "end")

    def guides(self, x, y, ylabel=None, xlabel=None, color=GUIDE, ycol=INK, xcol=INK, size=28, ylab_dx=-16):
        px, py = self.px(x, y)
        self.cv.line(self.X0, py, px, py, color, 2.5, dash="9 9", cap="butt")
        self.cv.line(px, py, px, self.Y0, color, 2.5, dash="9 9", cap="butt")
        if ylabel:
            self.cv.text(self.X0 + ylab_dx, py, ylabel, size=size, color=ycol, anchor="end", weight=700)
        if xlabel:
            self.cv.text(px, self.Y0 + 34, xlabel, size=size, color=xcol, anchor="middle", weight=700)

    def hguide(self, y, label, color=GUIDE, xend=None, size=28, lcol=INK, w=2.5, dash="9 9"):
        _, py = self.px(0, y)
        xe = self.px(xend, 0)[0] if xend is not None else self.X1
        self.cv.line(self.X0, py, xe, py, color, w, dash=dash, cap="butt")
        if label:
            self.cv.text(self.X0 - 16, py, label, size=size, color=lcol, anchor="end", weight=700)

    def point(self, x, y, fill=INK, r=10, label=None, ldx=18, ldy=-22, lsize=28, lcol=None):
        px, py = self.px(x, y)
        self.cv.circle(px, py, r, fill)
        if label:
            self.cv.text(px + ldx, py + ldy, label, size=lsize, color=lcol or fill, weight=700,
                         anchor="start" if ldx >= 0 else "end")

    def shift_arrow(self, L1: Line, L2: Line, t=0.5, color=GOLD, offset=0, w=5, y=None):
        """Arrow from a point on L1 to the corresponding point on L2 (parallel shift), at fraction t or height y."""
        if y is None:
            x = L1.x1 + (L1.x2 - L1.x1) * t
            y = L1.y_at(x) + offset
        else:
            x = L1.x_at(y)
        x2 = L2.x_at(y)
        a, b = self.px(x, y)
        c, d = self.px(x2, y)
        gap = 18 if c > a else -18
        self.cv.line(a + gap, b, c - gap, d, color, w, arrow_end=True)

    def yaxis_arrow(self, y_from, y_to, color, x_off=-118, w=6):
        _, a = self.px(0, y_from)
        _, b = self.px(0, y_to)
        x = self.X0 + x_off
        s = 12 if b < a else -12
        self.cv.line(x, a - s, x, b + s, color, w, arrow_end=True)

    def xaxis_arrow(self, x_from, x_to, color, y_off=78, w=5):
        a, _ = self.px(x_from, 0)
        b, _ = self.px(x_to, 0)
        y = self.Y0 + y_off
        s = 12 if b > a else -12
        self.cv.line(a + s, y, b - s, y, color, w, arrow_end=True)
