"""Render svg/*.svg to png/*.png at 2x with headless Chromium (exact fonts, transparent background)."""
import os, sys, glob, re
from playwright.sync_api import sync_playwright

BASE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(BASE, "..", "svg")
OUT = os.path.join(BASE, "..", "png")
os.makedirs(OUT, exist_ok=True)
only = sys.argv[1:]
with sync_playwright() as pw:
    br = pw.chromium.launch()
    for path in sorted(glob.glob(os.path.join(SRC, "*.svg"))):
        name = os.path.splitext(os.path.basename(path))[0]
        if only and not any(o in name for o in only):
            continue
        src = open(path).read()
        w, h = map(int, re.search(r'width="(\d+)" height="(\d+)"', src).groups())
        pg = br.new_page(viewport={"width": w, "height": h}, device_scale_factor=2)
        pg.set_content(f"<html><body style='margin:0;background:transparent'>{src}</body></html>", wait_until="networkidle")
        pg.evaluate("document.fonts.ready")
        pg.screenshot(path=os.path.join(OUT, name + ".png"), omit_background=True, clip={"x": 0, "y": 0, "width": w, "height": h})
        pg.close()
        print("rendered", name, w, h)
    br.close()
