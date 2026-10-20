import sys, glob, os
from PIL import Image
os.makedirs('/tmp/claude-0/s2', exist_ok=True)
for f in sorted(glob.glob(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'png', '*.png'))):
    n = os.path.basename(f)
    if sys.argv[1:] and not any(a in n for a in sys.argv[1:]):
        continue
    im = Image.open(f).convert('RGBA'); bg = Image.new('RGB', im.size, (251, 249, 243)); bg.paste(im, mask=im.split()[3])
    bg.thumbnail((1600, 1100)); bg.save('/tmp/claude-0/s2/' + n)
