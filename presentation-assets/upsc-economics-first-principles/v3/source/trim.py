"""Trim transparent margins from listed PNGs (keeps a 14px pad)."""
import sys, os
from PIL import Image
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "png")
for n in sys.argv[1:]:
    f = os.path.join(D, n + ".png")
    im = Image.open(f).convert("RGBA")
    bb = im.split()[3].point(lambda a: 255 if a > 8 else 0).getbbox()
    pad = 28
    box = (max(bb[0] - pad, 0), max(bb[1] - pad, 0), min(bb[2] + pad, im.width), min(bb[3] + pad, im.height))
    im.crop(box).save(f)
    print(n, im.size, "->", (box[2] - box[0], box[3] - box[1]), "aspect %.2f" % ((box[2] - box[0]) / (box[3] - box[1])))
