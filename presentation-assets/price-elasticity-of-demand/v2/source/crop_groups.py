"""Autocrop; images in a group share one union box so paired diagrams keep identical scale and axis positions."""
import sys
from PIL import Image
groups = [["PED_08a_Perfectly_Elastic", "PED_08b_Perfectly_Inelastic", "PED_08c_Unitary"],
          ["PED_17a_Revenue_Inelastic_Rise", "PED_17b_Revenue_Elastic_Rise"],
          ["PED_20a_Tax_Revenue_Inelastic", "PED_20b_Tax_Revenue_Elastic", "PED_21a_Incidence_Consumers", "PED_21b_Incidence_Producers"],
          ["PED_07_Elastic_vs_Inelastic", "PED_09_HL_Linear_Curve", "PED_10_HL_Four_Points"]]
import os, glob
D = "/home/claude/work/ped/v2/png/"
grouped = {n for g in groups for n in g}
def box(im):
    return im.getbbox()
for g in groups:
    ims = {n: Image.open(D + n + ".png").convert("RGBA") for n in g}
    sizes = {im.size for im in ims.values()}
    assert len(sizes) == 1, (g, sizes)
    bbs = [box(im) for im in ims.values()]
    W, H = next(iter(sizes)); pad = 30
    u = (max(min(b[0] for b in bbs) - pad, 0), max(min(b[1] for b in bbs) - pad, 0), min(max(b[2] for b in bbs) + pad, W), min(max(b[3] for b in bbs) + pad, H))
    for n, im in ims.items():
        im.crop(u).save(D + n + ".png"); print(n, im.crop(u).size)
for p in sorted(glob.glob(D + "*.png")):
    n = os.path.basename(p)[:-4]
    if n in grouped:
        continue
    im = Image.open(p).convert("RGBA"); b = im.getbbox(); pad = 30
    im = im.crop((max(b[0] - pad, 0), max(b[1] - pad, 0), min(b[2] + pad, im.width), min(b[3] + pad, im.height))); im.save(p); print(n, im.size)
