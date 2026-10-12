"""Render SVG/HTML sources to PNG with headless Chromium (exact fonts, transparent corners)."""
import os, sys, glob, re
from playwright.sync_api import sync_playwright

BASE = os.path.dirname(os.path.abspath(__file__))
SRC_SVG = os.path.join(BASE, "svg")
SRC_HTML = os.path.join(BASE, "html")
OUT = os.path.join(BASE, "png")
os.makedirs(OUT, exist_ok=True)
SCALE = float(os.environ.get("SCALE", "2"))
only = sys.argv[1:]

with sync_playwright() as pw:
    br = pw.chromium.launch()
    for path in sorted(glob.glob(os.path.join(SRC_SVG, "*.svg")) + glob.glob(os.path.join(SRC_HTML, "*.html"))):
        name = os.path.splitext(os.path.basename(path))[0]
        if only and not any(o in name for o in only):
            continue
        src = open(path).read()
        if path.endswith(".svg"):
            w, h = map(int, re.search(r'width="(\d+)" height="(\d+)"', src).groups())
            html = f"<html><body style='margin:0;background:transparent'>{src}</body></html>"
        else:
            m = re.search(r'data-size="(\d+)x(\d+)"', src)
            w, h = map(int, m.groups())
            html = src
        pg = br.new_page(viewport={"width": w, "height": h}, device_scale_factor=SCALE)
        pg.set_content(html, wait_until="networkidle")
        pg.evaluate("document.fonts.ready")
        pg.screenshot(path=os.path.join(OUT, name + ".png"), omit_background=True,
                      clip={"x": 0, "y": 0, "width": w, "height": h})
        pg.close()
        print("rendered", name, w, h)
    br.close()
