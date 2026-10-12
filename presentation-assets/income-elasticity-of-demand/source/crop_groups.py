import os, glob
from PIL import Image
D = "/home/claude/work/yed/png/"
groups = [["YED_D1_Engel_Inelastic", "YED_D2_Engel_Elastic", "YED_D3_Engel_Inferior"]]
skip = {"YED_00_Logo_Watermark"}
grouped = {n for g in groups for n in g}
for g in groups:
    ims = {n: Image.open(D + n + ".png").convert("RGBA") for n in g}
    W, H = next(iter(ims.values())).size
    bbs = [im.getbbox() for im in ims.values()]; pad = 30
    u = (max(min(b[0] for b in bbs) - pad, 0), max(min(b[1] for b in bbs) - pad, 0), min(max(b[2] for b in bbs) + pad, W), min(max(b[3] for b in bbs) + pad, H))
    for n, im in ims.items():
        im.crop(u).save(D + n + ".png"); print(n, im.crop(u).size)
for p in sorted(glob.glob(D + "*.png")):
    n = os.path.basename(p)[:-4]
    if n in grouped or n in skip: continue
    im = Image.open(p).convert("RGBA"); b = im.getbbox(); pad = 30
    im = im.crop((max(b[0]-pad,0), max(b[1]-pad,0), min(b[2]+pad,im.width), min(b[3]+pad,im.height))); im.save(p); print(n, im.size)
