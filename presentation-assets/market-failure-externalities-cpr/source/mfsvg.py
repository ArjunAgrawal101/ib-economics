"""Small deterministic SVG kit for the Market Failure deck (Arjun Agrawal | Economics).

Colour roles follow the Market Failure Revision Atlas (E01 to E10):
navy = private curves, market outcome, text; red = production (cost-side) social curve;
blue = consumption (benefit-side) social curve; dark gold = social optimum; welfare loss = red tint.
"""
import os

NAVY = "#01132C"      # private curves, ink
INK = "#14213D"       # body text
RED = "#A3402B"       # production / cost side
BLUE = "#1F5F99"      # consumption / benefit side
GOLD = "#B5934D"      # rules, accents
GOLDD = "#86662B"     # optimum, gold text
WL = "#C0533E"        # welfare loss fill (used with opacity)
PURPLE = "#5B4B8A"    # HL
GREEN = "#2F6B4F"     # common pool resources / policy outcome
GREY = "#5A6372"      # secondary text
GUIDE = "#8C93A0"     # dashed guides
HALO = "#FFFDFA"      # card background (Gamma ivory)
FONT = "Inter, 'Helvetica Neue', Arial, sans-serif"
SERIF = "Fraunces, Georgia, serif"
MONO = "'IBM Plex Mono', monospace"


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def rich(text):
    """'Q_{opt}' -> subscript."""
    out, i = [], 0
    while i < len(text):
        if text.startswith("_{", i):
            j = text.index("}", i)
            out.append(f'<tspan baseline-shift="sub" font-size="70%">{esc(text[i+2:j])}</tspan>')
            i = j + 1
        else:
            j = text.find("_{", i)
            j = len(text) if j == -1 else j
            out.append(esc(text[i:j]))
            i = j
    return "".join(out)


class Canvas:
    def __init__(self, w, h):
        self.w, self.h = w, h
        self.els, self.defs, self.mk = [], [], set()

    def add(self, s):
        self.els.append(s)

    def marker(self, color, size):
        mid = f"m{color.strip('#')}{int(size)}"
        if mid not in self.mk:
            self.mk.add(mid)
            s = size
            self.defs.append(
                f'<marker id="{mid}" viewBox="0 0 {s} {s}" refX="{s*0.85:.1f}" refY="{s/2:.1f}" markerWidth="{s}" markerHeight="{s}" '
                f'markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M0,0 L{s},{s/2} L0,{s} L{s*0.22:.1f},{s/2} z" fill="{color}"/></marker>')
        return mid

    def line(self, x1, y1, x2, y2, color=NAVY, w=4, dash=None, end=False, start=False, cap="round", op=1, head=None):
        d = f' stroke-dasharray="{dash}"' if dash else ""
        hs = head or max(18, w * 4.2)
        me = f' marker-end="url(#{self.marker(color, hs)})"' if end else ""
        ms = f' marker-start="url(#{self.marker(color, hs)})"' if start else ""
        self.add(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{color}" stroke-width="{w}" '
                 f'stroke-linecap="{cap}"{d}{me}{ms} opacity="{op}"/>')

    def path(self, d, color=NAVY, w=4, fill="none", dash=None, op=1, end=False, head=None):
        da = f' stroke-dasharray="{dash}"' if dash else ""
        me = f' marker-end="url(#{self.marker(color, head or max(18, w*4.2))})"' if end else ""
        self.add(f'<path d="{d}" stroke="{color}" stroke-width="{w}" fill="{fill}" stroke-linecap="round" '
                 f'stroke-linejoin="round"{da}{me} opacity="{op}"/>')

    def poly(self, pts, fill, op=1, stroke="none", sw=0):
        p = " ".join(f"{x:.1f},{y:.1f}" for x, y in pts)
        self.add(f'<polygon points="{p}" fill="{fill}" fill-opacity="{op}" stroke="{stroke}" stroke-width="{sw}"/>')

    def rect(self, x, y, w, h, fill="none", stroke=None, sw=2, rx=0, op=1, dash=None):
        s = f' stroke="{stroke}" stroke-width="{sw}"' if stroke else ""
        d = f' stroke-dasharray="{dash}"' if dash else ""
        self.add(f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{rx}" fill="{fill}" fill-opacity="{op}"{s}{d}/>')

    def circle(self, x, y, r, fill=NAVY, stroke=HALO, sw=4):
        self.add(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>')

    def ring(self, x, y, r, color=GOLDD, sw=5):
        self.add(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r}" fill="{HALO}" stroke="{color}" stroke-width="{sw}"/>')
        self.add(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r*0.38:.1f}" fill="{color}"/>')

    def text(self, x, y, s, size=30, color=INK, anchor="start", weight=500, family=FONT, halo=True, italic=False, spacing=None):
        h = f' paint-order="stroke" stroke="{HALO}" stroke-width="{max(6, size*0.28):.0f}" stroke-linejoin="round"' if halo else ""
        it = ' font-style="italic"' if italic else ""
        ls = f' letter-spacing="{spacing}"' if spacing else ""
        self.add(f'<text x="{x:.1f}" y="{y:.1f}" font-family="{family}" font-size="{size}" fill="{color}" text-anchor="{anchor}" '
                 f'font-weight="{weight}" dominant-baseline="middle"{it}{ls}{h}>{rich(s)}</text>')

    def pill(self, x, y, s, color, size=26, anchor="start", pad=14, fill=None, tcolor="#FFFFFF", weight=700):
        tw = len(s.replace("_{", "").replace("}", "")) * size * 0.57
        h = size * 1.6
        x0 = x - tw / 2 - pad if anchor == "middle" else (x - tw - 2 * pad if anchor == "end" else x)
        self.rect(x0, y - h / 2, tw + 2 * pad, h, fill=fill or color, rx=h / 2)
        self.text(x0 + pad + tw / 2, y + 1, s, size=size, color=tcolor, anchor="middle", weight=weight, halo=False)

    def svg(self):
        return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{self.w}" height="{self.h}" viewBox="0 0 {self.w} {self.h}">'
                f'<defs>{"".join(self.defs)}</defs>{"".join(self.els)}</svg>')

    def save(self, folder, name):
        os.makedirs(folder, exist_ok=True)
        with open(os.path.join(folder, name + ".svg"), "w") as f:
            f.write(self.svg())
        print("saved", name)


class Ax:
    """Maps data (x, y) to pixels. X0,Y0 = origin pixel; X1,Y1 = top-right of plot."""

    def __init__(self, cv, X0, Y0, X1, Y1, xmax=100, ymax=140, xmin=0, ymin=0):
        self.cv, self.X0, self.Y0, self.X1, self.Y1 = cv, X0, Y0, X1, Y1
        self.xmin, self.xmax, self.ymin, self.ymax = xmin, xmax, ymin, ymax

    def px(self, x, y):
        return (self.X0 + (self.X1 - self.X0) * (x - self.xmin) / (self.xmax - self.xmin),
                self.Y0 - (self.Y0 - self.Y1) * (y - self.ymin) / (self.ymax - self.ymin))

    def axes(self, ylab="Costs and benefits ($)", xlab="Quantity", size=32, w=4.5, origin=True, ylab_dx=0, xlab_dy=None):
        cv = self.cv
        cv.line(self.X0, self.Y0, self.X0, self.Y1 - 34, NAVY, w, end=True, cap="butt", head=22)
        cv.line(self.X0, self.Y0, self.X1 + 34, self.Y0, NAVY, w, end=True, cap="butt", head=22)
        if origin:
            cv.text(self.X0 - 14, self.Y0 + size * 0.9, "0", size=size * 0.85, color=GREY, anchor="end")
        cv.text(self.X0 - 6 + ylab_dx, self.Y1 - 34 - size * 1.1, ylab, size=size, color=NAVY, anchor="start", weight=700)
        cv.text(self.X1 + 34, self.Y0 + (xlab_dy if xlab_dy is not None else size * 2.3), xlab, size=size, color=NAVY, anchor="end", weight=700)

    def seg(self, x0, y0, x1, y1, color=NAVY, w=6, dash=None, end=False, start=False, head=None):
        a, b = self.px(x0, y0)
        c, d = self.px(x1, y1)
        self.cv.line(a, b, c, d, color, w, dash=dash, end=end, start=start, head=head)

    def fn(self, f, x0, x1, color=NAVY, w=7):
        self.seg(x0, f(x0), x1, f(x1), color, w)

    def vguide(self, x, y, label=None, size=34, color=NAVY, dy=None, w=3):
        a, b = self.px(x, y)
        self.cv.line(a, b, a, self.Y0, GUIDE, w, dash="10 9", cap="butt")
        if label:
            self.cv.text(a, self.Y0 + (dy if dy is not None else size * 1.05), label, size=size, color=color, anchor="middle", weight=700)

    def hguide(self, x, y, label=None, size=34, color=NAVY, dx=16, w=3):
        a, b = self.px(x, y)
        self.cv.line(self.X0, b, a, b, GUIDE, w, dash="10 9", cap="butt")
        if label:
            self.cv.text(self.X0 - dx, b, label, size=size, color=color, anchor="end", weight=700)

    def label(self, x, y, s, size=34, color=NAVY, anchor="start", dx=0, dy=0, weight=700, halo=True):
        a, b = self.px(x, y)
        self.cv.text(a + dx, b + dy, s, size=size, color=color, anchor=anchor, weight=weight, halo=halo)

    def dot(self, x, y, r=13, color=NAVY):
        a, b = self.px(x, y)
        self.cv.circle(a, b, r, color)

    def ring(self, x, y, r=15, color=GOLDD):
        a, b = self.px(x, y)
        self.cv.ring(a, b, r, color)

    def area(self, pts, color=WL, op=0.28):
        self.cv.poly([self.px(x, y) for x, y in pts], color, op)

    def darrow(self, x, y0, y1, color, w=5):
        """Vertical double arrow between y0 and y1 at x (external cost/benefit per unit)."""
        a, b = self.px(x, y0)
        _, d = self.px(x, y1)
        s = 1 if d > b else -1
        self.cv.line(a, b + s * 3, a, d - s * 3, color, w, end=True, start=True, head=20)
