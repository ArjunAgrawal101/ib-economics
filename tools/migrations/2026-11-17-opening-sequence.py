"""2026-11-17 · the opening, rebuilt for the two-pathway platform (idempotent; applied to index.html).

ARJUN AGRAWAL · ECONOMICS · Think like an economist. Five seconds on the same one clock:

  0.0-1.0 s  the world: a dotted world map (Natural Earth, built by tools/build/build_worldmap.mjs)
             appears west to east; financial and trading hubs light up; arcs of trade join them
  1.0-2.0 s  the language: demand and supply cross at a gold equilibrium, a business cycle runs
             round its trend, a price series moves, and indicator labels (GDP, CPI, USD/INR,
             REPO RATE, EXPORTS) are set in a fine monospace beside the hubs
  2.0-3.0 s  two economic worlds: international perspectives in the IB pathway's burgundy (trade,
             markets, exchange rates, models), then India's dots warm to gold and five sectors
             of Indian development fan out beneath it in the UPSC pathway's forest green
  3.0-4.0 s  the identity: the AA monogram rises (the brand's own vectors), the name and the gold
             rule follow
  4.0-5.0 s  the philosophy: ECONOMICS, then THINK LIKE AN ECONOMIST.; the monogram travels to the
             header's brand mark (measured at run time; a plain fade without one) and the overlay
             dissolves into the page, gone at exactly start + 5000 ms

Every moving part is an HTML element or a whole <svg> element animated with opacity and transform
only, so the compositor keeps time while start-up occupies the main thread. Every layer that fades
is a leaf (nothing composited inside it), so no stage needs an offscreen pass, and the scene dims
under a veil of the ground colour rather than fading as a whole: about fifty small layers in all.
Lines are drawn by sliding windows (an overflow-hidden wrapper and its counter-translated content)
and by scaling from an origin, never by dash offsets.

THE STATE MODEL (replaces "the full sequence on every home load"):
  first home-page load of a browser session (sessionStorage aae.intro.seen)  the full sequence
  later home loads in that session, or Skip pressed in the last 30 days
    (localStorage aae.intro.skip, a timestamp)                               a brief card, ~1.2 s
  prefers-reduced-motion                                                     a still card, ~1.5 s
  a deep link to any other page                                              the cover until ready
  navigation inside the app                                                  nothing
  ?intro=1 in the address                                                    the full sequence
Every storage access is wrapped in try/catch, so a private window simply gets the full sequence.
The readiness hold (window.__APP_READY), the exit at start + 5000 ms and the first-paint anchor
are unchanged. Skip (labelled "Skip introduction"; Escape works anywhere, Enter on the button)
starts the exit within one frame and is remembered.

Inputs: tools/build/opening-worldmap.json, tools/build/opening-type.json (committed) and the brand
vectors already in the old overlay (the monogram and the name). The styles live in
src/styles/css-opening.css. Run python3 tools/build/splice.py afterwards."""
import json, math, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parents[2]
P = ROOT / 'index.html'
s = P.read_text(encoding='utf-8')
if 'data-opening="2026-11-19"' in s:
    # superseded: tools/migrations/2026-11-19-opening-two-pathways.py replaced this opening with the
    # two-pathway one; running this again must not bring the world-map opening back
    print('applied: nothing (superseded by 2026-11-19-opening-two-pathways.py)')
    raise SystemExit(0)
MAP = json.loads((ROOT / 'tools' / 'build' / 'opening-worldmap.json').read_text(encoding='utf-8'))
TYPE = json.loads((ROOT / 'tools' / 'build' / 'opening-type.json').read_text(encoding='utf-8'))
done = []


def rep(old, new, label):
    """replace exactly once; a no-op when the result is already there"""
    global s
    if new in s:
        return
    n = s.count(old)
    assert n == 1, f'{label}: anchor found {n} times'
    s = s.replace(old, new, 1)
    done.append(label)


def num(v, nd=2):
    v = round(v, nd)
    return str(int(v)) if v == int(v) else repr(v).rstrip('0').rstrip('.')


def pct(v, of):
    return num(100 * v / of, 3) + '%'


# ═══ 1 · the overlay ═══════════════════════════════════════════════════════
m = re.search(r'<div id="splash"[^>]*>.*?</button></div>\n<script id="intro-clock">.*?</script>\n', s, re.S)
assert m, 'the overlay and its clock were not found'
OLD_BLOCK = m.group(0)
APPLIED = 'data-opening="2026-11-17"' in OLD_BLOCK

if not APPLIED:
    assert 'class="ia-mk"' in OLD_BLOCK and 'class="ia-wm"' in OLD_BLOCK, 'the brand vectors were not found in the old overlay'
    mk = re.search(r'<svg class="ia-mk"[^>]*>(.*?)</svg>', OLD_BLOCK, re.S).group(1)
    mk_paths = re.findall(r'<path[^>]*/>', mk)
    assert len(mk_paths) == 2, 'expected the monogram as two paths'
    wm = re.search(r'<svg class="ia-wm"[^>]*>(.*?)</svg>', OLD_BLOCK, re.S).group(1)
    name_d = re.search(r'<path fill="#F4EFE4" d="([^"]+)"/>', wm).group(1)

    def bbox_abs(d):
        n = [float(v) for v in re.findall(r'-?\d+(?:\.\d+)?', d)]
        xs, ys = n[0::2], n[1::2]
        return min(xs), min(ys), max(xs), max(ys)
    mb = [bbox_abs(re.search(r' d="([^"]+)"', p).group(1)) for p in mk_paths]
    mx0, my0 = min(b[0] for b in mb), min(b[1] for b in mb)
    mx1, my1 = max(b[2] for b in mb), max(b[3] for b in mb)
    MKVB = f'{math.floor(mx0) - 2} {math.floor(my0) - 2} {math.ceil(mx1 - mx0) + 4} {math.ceil(my1 - my0) + 4}'
    MK_W, MK_H = math.ceil(mx1 - mx0) + 4, math.ceil(my1 - my0) + 4

    W, H = MAP['width'], MAP['height']
    HUB = MAP['hubs']

    def mpos(u, v):
        return f'left:{pct(u, W)};top:{pct(v, H)}'

    # ── the map: eight bands, India, hubs in three groups ──
    bands = ''.join(
        f'<svg class="o-band" viewBox="{num(b["x0"])} 0 {num(b["x1"] - b["x0"])} {H}" style="left:{pct(b["x0"], W)};width:{pct(b["x1"] - b["x0"], W)}"><path d="{b["d"]}"/></svg>'
        for b in MAP['bands'])
    ib = MAP['india']['bbox']
    ix0, iy0, ix1, iy1 = ib[0] - 6, ib[1] - 6, ib[2] + 6, ib[3] + 6
    india = (f'<svg class="o-in" viewBox="{num(ix0)} {num(iy0)} {num(ix1 - ix0)} {num(iy1 - iy0)}" '
             f'style="left:{pct(ix0, W)};top:{pct(iy0, H)};width:{pct(ix1 - ix0, W)};height:{pct(iy1 - iy0, H)}"><path d="{MAP["india"]["d"]}"/></svg>')
    HUBGROUPS = [['la', 'ny', 'sp'], ['ld', 'lg', 'fr', 'jb', 'db'], ['mb', 'dl', 'sg', 'hk', 'sh', 'tk', 'sy']]
    hubs = ''.join('<div class="o-hubs">' + ''.join(f'<i class="o-hub" style="{mpos(*HUB[k])}"></i>' for k in g) + '</div>' for g in HUBGROUPS)

    # ── arcs of trade: quadratic curves bowed toward the pole, all in one layer, drawn west to east
    #    by one sliding window the width of the map ──
    def arc(a, b, bow=0.16):
        (x1, y1), (x2, y2) = HUB[a], HUB[b]
        if x2 < x1:
            (x1, y1), (x2, y2) = (x2, y2), (x1, y1)
        dx, dy = x2 - x1, y2 - y1
        L = math.hypot(dx, dy)
        nx, ny = dy / L, -dx / L            # the normal that points up the page for a west-east arc
        if ny > 0:
            nx, ny = -nx, -ny
        cx, cy = (x1 + x2) / 2 + nx * L * bow, (y1 + y2) / 2 + ny * L * bow
        return f'<path d="M{num(x1, 1)} {num(y1, 1)}Q{num(cx, 1)} {num(cy, 1)} {num(x2, 1)} {num(y2, 1)}"/>'
    ARCS = [('ny', 'ld'), ('sp', 'lg'), ('ld', 'db'), ('fr', 'sh', 0.12), ('jb', 'mb'), ('db', 'mb', 0.22), ('mb', 'sg'), ('sg', 'tk'), ('hk', 'sy', 0.14)]
    ARCB = [('la', 'ny'), ('ny', 'ld'), ('ld', 'sh')]
    first = lambda pairs: min(min(HUB[a][0], HUB[b][0]) for a, b, *_ in pairs) / W
    arcs = f'<div class="o-arcs o-w"><svg viewBox="0 0 {W} {H}">' + ''.join(arc(*a) for a in ARCS) + '</svg></div>'
    arcsb = f'<div class="o-arcsb o-w"><svg viewBox="0 0 {W} {H}">' + ''.join(arc(a, b, 0.2) for a, b in ARCB) + '</svg></div>'
    ARC_FROM = math.floor(100 * (1 - first(ARCS) + 0.015))     # the window starts just west of the first arc
    ARCB_FROM = math.floor(100 * (1 - first(ARCB) + 0.015))

    # ── indicator labels beside hubs, in a fine monospace, all in one layer ──
    TAGS = [('ny', 'GDP', 'r'), ('ld', 'CPI', 'l pr'), ('dl', 'REPO RATE', 'l'), ('mb', 'USD/INR', 'l'), ('sh', 'EXPORTS', 'r')]
    tags = '<div class="o-tags">' + ''.join(f'<span class="o-tag {d}" style="{mpos(*HUB[k])}"><b>{t}</b></span>' for k, t, d in TAGS) + '</div>'

    # ── the language: demand and supply, a business cycle, a price series ──
    def wipe(svg, cls='o-w'):
        return f'<div class="{cls}">{svg}</div>'
    # demand and supply in a 240 x 200 box: axes from the origin (20, 186), D and S crossing at E
    BW, BH, OX, OY = 240, 200, 20, 186
    D0, D1, S0, S1 = (44, 34), (212, 170), (44, 166), (212, 30)
    sl = (D1[1] - D0[1]) / (D1[0] - D0[0])
    ex = D0[0] + ((S0[1] - D0[1]) / 2) / sl
    ey = D0[1] + sl * (ex - D0[0])
    X = lambda x: num(100 * x / BW, 2) + '%'
    Y = lambda y: num(100 * y / BH, 2) + '%'
    ds = ('<div class="o-ds">'
          f'<i class="o-ay" style="left:{X(OX)};top:{Y(8)};height:{Y(OY - 8)}"></i>'
          f'<i class="o-ax" style="left:{X(OX)};top:{Y(OY)};width:{X(234 - OX)}"></i>'
          + wipe(f'<svg viewBox="0 0 {BW} {BH}" preserveAspectRatio="none"><path d="M{D0[0]} {D0[1]}L{D1[0]} {D1[1]}M{S0[0]} {S0[1]}L{S1[0]} {S1[1]}"/></svg>')
          + '<div class="o-ann">'
          f'<i class="o-g o-gh" style="left:{X(OX)};top:{Y(ey)};width:{X(ex - OX)}"></i>'
          f'<i class="o-g o-gv" style="left:{X(ex)};top:{Y(ey)};height:{Y(OY - ey)}"></i>'
          f'<b class="o-lb" style="left:{X(9)};top:{Y(9)}">P</b><b class="o-lb" style="left:{X(233)};top:{Y(198)}">Q</b>'
          f'<b class="o-lb" style="left:{X(224)};top:{Y(176)}">D</b><b class="o-lb" style="left:{X(224)};top:{Y(26)}">S</b>'
          f'<b class="o-lb o-lbe" style="left:{X(ex + 13)};top:{Y(ey - 12)}">E</b></div>'
          f'<i class="o-e" style="left:{X(ex)};top:{Y(ey)}"></i></div>')
    # the business cycle: a wave round a rising trend, in a 460 x 100 box
    trend = lambda x: 78 - (x - 6) * 0.075
    wave = lambda x: trend(x) - 17 * math.sin((x - 6) / 168 * 2 * math.pi)
    pts = [f"{x} {wave(x):.1f}" for x in range(6, 457, 5)]
    pk, tg = 6 + 42, 6 + 126
    cyc = ('<div class="o-cy">'
           + wipe(f'<svg viewBox="0 0 460 100" preserveAspectRatio="none"><path class="tr" d="M6 {num(trend(6), 1)}L456 {num(trend(456), 1)}"/>'
                  f'<path d="M{" L".join(pts)}"/></svg>')
           + '<div class="o-ann">'
           f'<b class="o-lb" style="left:{num(100 * pk / 460, 2)}%;top:{num(wave(pk) - 11, 1)}%">PEAK</b>'
           f'<b class="o-lb" style="left:{num(100 * tg / 460, 2)}%;top:{num(wave(tg) + 11, 1)}%">TROUGH</b>'
           f'<b class="o-lb o-lbt" style="left:{num(100 * 430 / 460, 2)}%;top:{num(trend(430) - 13, 1)}%">TREND</b></div></div>')
    # a price series: a fixed, illustrative walk (no figures), in a 300 x 120 box
    walk = [74, 70, 72, 66, 69, 63, 65, 58, 61, 64, 57, 52, 55, 49, 53, 47, 44, 48, 41, 45, 39, 42, 36, 33, 38, 31, 35, 29, 26, 30, 24, 27, 21, 18]
    xs = [8 + i * (284 / (len(walk) - 1)) for i in range(len(walk))]
    pd = 'M' + ' L'.join(f'{x:.1f} {y}' for x, y in zip(xs, walk))
    px = ('<div class="o-px">'
          + wipe('<svg viewBox="0 0 300 120" preserveAspectRatio="none"><path class="gr" d="M8 30H292M8 60H292M8 90H292"/>'
                 f'<path d="{pd}"/></svg>')
          + '<div class="o-ann"><b class="o-lb" style="left:7%;top:-9%">PRICE</b></div>'
          f'<i class="o-e" style="left:{num(100 * xs[-1] / 300, 2)}%;top:{num(100 * walk[-1] / 120, 2)}%"></i></div>')

    # ── two worlds: the international caption, India's five sectors ──
    cap_ib = ('<div class="o-cap o-cap-ib"><div class="o-cap-in"><b class="o-k">IB DP</b><b class="o-h">The world economy</b>'
              '<b class="o-s">Trade · Markets<br>Exchange rates · Models</b></div></div>')
    GLYPH = {
        'agriculture': 'M12 21V6M12 10L8.5 7.2M12 10l3.5-2.8M12 14l-3.5-2.8M12 14l3.5-2.8M12 18l-3.5-2.8M12 18l3.5-2.8M12 6l-1.6-2.4M12 6l1.6-2.4M6 21h12',
        'industry': 'M3 20V12l5 3v-3l5 3V7h3.5v13M2 20h20M16.5 7l.8-3h1.4l.8 3',
        'infrastructure': 'M2 12.5h20M4.5 12.5V19M19.5 12.5V19M4.5 12.5Q12 4.5 19.5 12.5M8.5 12.5V9.3M12 12.5V8.4M15.5 12.5V9.3M2 19h20',
        'public finance': 'M11 4.1A8 8 0 1 0 19.9 13H11Z M14 2.1A8 8 0 0 1 21.9 10H14Z',
        'economic policy': 'M4 16.5a8 8 0 0 1 16 0M12 16.5l4.2-4.6M3 20h18M5.6 11.3l1.2.8M12 8.5V10M18.4 11.3l-1.2.8',
    }
    SECT = ['agriculture', 'industry', 'infrastructure', 'public finance', 'economic policy']
    nodes = '<div class="o-nodes">' + ''.join(
        f'<span class="o-node" style="left:{num(10 + 20 * i)}%"><b><svg viewBox="0 0 24 24"><path d="{GLYPH[k]}"/></svg>'
        f'<em>{k.upper()}</em></b></span>' for i, k in enumerate(SECT)) + '</div>'
    spokes = ''.join(f'<path d="M50 0L{num(10 + 20 * i)} 100"/>' for i in range(5))
    fan = ('<div class="o-fan">' + wipe(f'<svg viewBox="0 0 100 100" preserveAspectRatio="none">{spokes}</svg>', 'o-wv')
           + nodes + '</div>')
    cap_up = ('<div class="o-cap o-cap-up"><div class="o-cap-in"><b class="o-k">UPSC CSE</b><b class="o-h">The Indian economy</b></div></div>')

    # ── the identity: the brand's monogram and name, ECONOMICS and the motto as outlines ──
    mk1, mk2 = mk_paths
    e = TYPE['econ']
    mt = TYPE['motto']
    mvb = mt['viewBox']
    mtot = mvb[2]
    words = ''.join(
        f'<svg viewBox="{num(w["x0"] - 2, 1)} {mvb[1]} {num(w["x1"] - w["x0"] + 4, 1)} {mvb[3]}" '
        f'style="left:{pct(w["x0"] - 2 - mvb[0], mtot)};width:{pct(w["x1"] - w["x0"] + 4, mtot)}"><path d="{w["d"]}"/></svg>'
        for w in mt['words'])
    ident = ('<div class="o-id" aria-hidden="true">'
             f'<div class="o-mk" style="aspect-ratio:{MK_W}/{MK_H}"><div class="o-mk1"><svg viewBox="{MKVB}">{mk1}</svg></div>'
             f'<div class="o-mk2"><svg viewBox="{MKVB}">{mk2}</svg></div></div>'
             f'<svg class="o-nm" viewBox="0 300 760 80" data-text="ARJUN AGRAWAL"><path d="{name_d}"/></svg>'
             '<div class="o-rl"><i><s></s><s></s></i><b></b></div>'
             f'<div class="o-ec" style="aspect-ratio:{e["viewBox"][2]}/{e["viewBox"][3]}"><svg viewBox="{" ".join(map(str, e["viewBox"]))}" data-text="ECONOMICS"><path d="{e["d"]}"/></svg></div>'
             f'<div class="o-mt" style="aspect-ratio:{mvb[2]}/{mvb[3]}" data-text="THINK LIKE AN ECONOMIST.">{words}</div>'
             '</div>')

    NEW_MARKUP = (
        '<div id="splash" role="status" aria-label="Arjun Agrawal · Economics. Think like an economist." data-opening="2026-11-17">\n'
        ' <!-- THE OPENING · five seconds on one clock; see the script below and src/styles/css-opening.css.\n'
        '      The name is carried by the brand vectors, never set again in type. -->\n'
        ' <div class="o-scene" aria-hidden="true"><div class="o-cam">'
        f'<div class="o-map">{bands}{india}{arcs}{arcsb}{hubs}{tags}</div>'
        f'<div class="o-lang">{ds}{cyc}{px}</div>{fan}{cap_ib}{cap_up}'
        '</div></div>\n'
        ' <i class="o-veil" aria-hidden="true"></i>\n'
        f' {ident}\n'
        ' <div class="o-bar" aria-hidden="true"><i></i></div>\n'
        ' <button id="splashskip" class="o-skip" type="button">Skip introduction</button></div>\n')

    # ── the clock ──
    # Every animated element is a leaf: its own layer, with nothing composited inside it, so no
    # stage needs an offscreen pass. A figure that leaves fades on its own layers; the scene dims
    # under a veil of the ground colour rather than by fading the scene as a whole.
    EO = 'cubic-bezier(.2,.7,.2,1)'       # entrances
    EW = 'cubic-bezier(.45,0,.2,1)'       # sliding windows that draw lines
    EF = 'cubic-bezier(.4,0,.2,1)'        # fades
    def kf(*frames):
        return [[t, f] for t, f in frames]
    def fade(a, b, o0=0, o1=1):
        return kf((a, {'opacity': o0}), (b, {'opacity': o1}))
    def rise(a, b, dy='6px'):
        return kf((a, {'opacity': 0, 'transform': f'translateY({dy})'}), (b, {'opacity': 1, 'transform': 'translateY(0)'}))
    def pop(a, b):
        return kf((a, {'opacity': 0, 'transform': 'scale(.2)'}), (b, {'opacity': 1, 'transform': 'scale(1)'}))
    def stay(frames, until, out):
        """hold the last keyframe, then fade out between until and out"""
        last = dict(frames[-1][1]); gone = dict(last); gone['opacity'] = 0
        if 'opacity' not in last:
            for f in frames: f[1]['opacity'] = 1
            last['opacity'] = 1
        return frames + [[until, last], [out, gone]]
    def wipes(sel, a, b, axis='X', frm=100, inner='>svg', leave=None):
        o = kf((a, {'transform': f'translate{axis}(-{frm}%)'}), (b, {'transform': f'translate{axis}(0)'}))
        n = kf((a, {'transform': f'translate{axis}({frm}%)'}), (b, {'transform': f'translate{axis}(0)'}))
        if leave:
            n = stay(n, *leave)
        return [[sel, a, b, o, EW], [sel + inner, a, (leave[1] if leave else b), n, EW]]

    LANG_OUT = (1960, 2260)       # the language of economics leaves
    WORLDS_OUT = (2900, 3200)     # the two worlds step back for the identity
    PLAN = []
    # 0 · the world
    PLAN.append(['.o-cam', 0, 2900, kf((0, {'transform': 'scale(1)'}), (2900, {'transform': 'scale(1.04)'})), 'cubic-bezier(.3,0,.45,1)'])
    PLAN.append(['.o-band', 60, 560, fade(60, 560), 'cubic-bezier(.3,0,.3,1)', 55])
    RECEDE = (2000, 2300)         # the general web of trade steps back when the two worlds arrive
    PLAN.append(['.o-hubs', 260, 2300, kf((260, {'opacity': 0}), (560, {'opacity': 1}), (RECEDE[0], {'opacity': 1}), (RECEDE[1], {'opacity': .5})), EO, 120])
    PLAN += wipes('.o-arcs', 480, 1300, frm=ARC_FROM)
    PLAN[-1][2] = RECEDE[1]
    PLAN[-1][3] = [[f[0], dict(f[1], opacity=1)] for f in PLAN[-1][3]] + [[RECEDE[0], {'transform': 'translateX(0)', 'opacity': 1}], [RECEDE[1], {'transform': 'translateX(0)', 'opacity': .42}]]
    # 1 · the language of economics
    PLAN.append(['.o-ds .o-ay', 940, LANG_OUT[1], stay(kf((940, {'transform': 'scaleY(0)'}), (1240, {'transform': 'scaleY(1)'})), *LANG_OUT), EO])
    PLAN.append(['.o-ds .o-ax', 990, LANG_OUT[1], stay(kf((990, {'transform': 'scaleX(0)'}), (1290, {'transform': 'scaleX(1)'})), *LANG_OUT), EO])
    PLAN += wipes('.o-ds .o-w', 1060, 1560, leave=LANG_OUT)
    PLAN.append(['.o-ds .o-e', 1340, LANG_OUT[1], stay(pop(1340, 1580), *LANG_OUT), EO])
    PLAN.append(['.o-ds .o-ann', 1420, LANG_OUT[1], stay(fade(1420, 1700), *LANG_OUT), EF])
    PLAN += wipes('.o-cy .o-w', 1140, 1820, leave=LANG_OUT)
    PLAN.append(['.o-cy .o-ann', 1640, LANG_OUT[1], stay(fade(1640, 1880), *LANG_OUT), EF])
    PLAN += wipes('.o-px .o-w', 1200, 1840, leave=LANG_OUT)
    PLAN.append(['.o-px .o-ann', 1260, LANG_OUT[1], stay(fade(1260, 1560), *LANG_OUT), EF])
    PLAN.append(['.o-px .o-e', 1780, LANG_OUT[1], stay(pop(1780, 1940), *LANG_OUT), EO])
    PLAN.append(['.o-tags', 1240, LANG_OUT[1], stay(rise(1240, 1540, '4px'), *LANG_OUT), EO])
    # 2 · two economic worlds: the international first, then India; both hold until 2.9 s
    PLAN += wipes('.o-arcsb', 2000, 2440, frm=ARCB_FROM, leave=WORLDS_OUT)
    PLAN.append(['.o-cap-ib .o-cap-in', 2030, WORLDS_OUT[1], stay(rise(2030, 2350), *WORLDS_OUT), EO])
    PLAN.append(['.o-in', 2150, 2580, fade(2150, 2580), EF])
    PLAN += wipes('.o-fan .o-wv', 2230, 2600, axis='Y', leave=WORLDS_OUT)
    PLAN.append(['.o-nodes', 2360, WORLDS_OUT[1], stay(rise(2360, 2640), *WORLDS_OUT), EO])
    PLAN.append(['.o-cap-up .o-cap-in', 2440, WORLDS_OUT[1], stay(rise(2440, 2740), *WORLDS_OUT), EO])
    # 3 · the identity: the map dims under a veil of the ground colour
    PLAN.append(['.o-veil', 2900, 3300, fade(2900, 3300, 0, .84), EF])
    PLAN.append(['.o-mk1>svg', 2940, 3360, kf((2940, {'opacity': 0, 'transform': 'translateY(100%)'}), (3100, {'opacity': 1, 'transform': 'translateY(38%)'}), (3360, {'opacity': 1, 'transform': 'translateY(0)'})), EO])
    PLAN.append(['.o-mk2>svg', 3000, 3420, kf((3000, {'opacity': 0, 'transform': 'translateY(100%)'}), (3160, {'opacity': 1, 'transform': 'translateY(38%)'}), (3420, {'opacity': 1, 'transform': 'translateY(0)'})), EO])
    PLAN.append(['.o-nm', 3090, 3420, rise(3090, 3420, '30%'), EO])
    PLAN.append(['.o-rl i', 3140, 3420, kf((3140, {'transform': 'scaleX(0)'}), (3420, {'transform': 'scaleX(1)'})), EO])
    PLAN.append(['.o-rl b', 3200, 3400, kf((3200, {'opacity': 0, 'transform': 'rotate(45deg) scale(.2)'}), (3400, {'opacity': 1, 'transform': 'rotate(45deg) scale(1)'})), EO])
    # 4 · the philosophy
    PLAN.append(['.o-ec>svg', 3800, 4220, kf((3800, {'opacity': 0, 'transform': 'translateY(104%)'}), (3920, {'opacity': 1, 'transform': 'translateY(60%)'}), (4220, {'opacity': 1, 'transform': 'translateY(0)'})), EO])
    PLAN.append(['.o-mt>svg', 3960, 4240, rise(3960, 4240, '40%'), EO, 60])
    # the progress line runs the whole five seconds (ambient: never re-anchored)
    PLAN.append(['.o-bar i', 0, 5000, kf((0, {'transform': 'scaleX(0)'}), (5000, {'transform': 'scaleX(1)'})), 'linear', 0, 1])
    BRIEF = [['.o-id', 0, 300, rise(0, 300, '6px'), EO]]
    js_plan = json.dumps(PLAN, separators=(',', ':'))
    js_brief = json.dumps(BRIEF, separators=(',', ':'))

    CLOCK = r'''<script id="intro-clock">
/* THE OPENING · ARJUN AGRAWAL · ECONOMICS, five seconds on one clock.
   The start is the first frame the reader sees. The script takes the first
   animation frame (requestAnimationFrame, on the monotonic timeline that
   performance.now() reads) and schedules every stage as a Web Animation with
   that startTime, so no stage can drift from another and nothing waits on a
   font, an image or the start-up self-test: every moving part is an HTML
   element or a whole <svg>, animated with opacity and transform only, which
   the compositor runs while the main thread is busy. Lines are drawn by
   sliding windows and by scaling from an origin, never by dash offsets. When
   the browser reports the first paint (Paint Timing), that moment becomes the
   authoritative start: the stages are re-anchored to it during a still
   passage (I.QUIET, when nothing moves), and the exit fade finishes at exactly
   start + 5000 ms, scheduled ahead so the compositor ends it on time. The
   overlay is removed on the first frame at or after that. If the platform
   behind it is not ready by then (window.__APP_READY), the final frame holds
   rather than uncovering an unfinished page, and the record says so.
   THE STATE MODEL: the first home-page load of a browser session plays the
   full sequence (sessionStorage aae.intro.seen); later home loads in that
   session, and visitors who pressed Skip in the last 30 days (localStorage
   aae.intro.skip, a timestamp), see a brief identity card (1.2 s); reduced
   motion shows a still card (1.5 s); a deep link to another page shows the
   cover only until the platform is ready; navigation inside the app never
   shows it; ?intro=1 forces the full sequence. Storage is read and written
   only inside try/catch, so a private window still opens. Skip ("Skip
   introduction", Escape, or Enter on the button) leaves within one frame. */
(function(){
 var sp=document.getElementById("splash");if(!sp)return;
 var I=window.__INTRO={FULL:5000,BRIEFMS:1200,STILLMS:1500,ms:5000,fadeAt:4700,holdStill:1500,SKIPMS:180,DISSOLVE:220,
  REMEMBER:2592e6,KEYS:{session:"aae.intro.seen",skip:"aae.intro.skip"},FLY:[4480,4900],
  t0:null,start:null,fp:null,anchored:false,mode:"play",state:"waiting",how:null,end:null,exitAt:null,late:false,anims:[],flight:null};
 I.PLAN=__PLAN__;
 I.BRIEF=__BRIEF__;
 I.QUIETS={play:[3420,3800],brief:[300,900]};I.QUIET=I.QUIETS.play;
 I.nav="navigate";try{var n=performance.getEntriesByType("navigation")[0];if(n)I.nav=n.type}catch(e){}
 var h=(location.hash||"").replace(/^#\/?/,"");
 I.route=(!h||/^home(\/|$)/.test(h))?"home":"deep";
 I.forced=/(^|&)intro=1(&|$)/.test((location.search||"").replace(/^\?/,""));
 var reduced=false;try{reduced=!!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion:reduce)").matches)}catch(e){}
 function get(st,k){try{return window[st].getItem(k)}catch(e){return null}}
 function put(st,k,v){try{window[st].setItem(k,v);return true}catch(e){return false}}
 var skipT=+get("localStorage",I.KEYS.skip)||0,age=Date.now()-skipT;
 I.seen=get("sessionStorage",I.KEYS.session)==="1";
 I.remembered=skipT>0&&age>=0&&age<I.REMEMBER;
 window.addEventListener("pageshow",function(e){if(e.persisted)I.restored=true});
 if(I.route!=="home"&&!I.forced)I.mode="cover";
 else if(reduced||typeof sp.animate!=="function")I.mode="still";
 else if(!I.forced&&(I.seen||I.remembered))I.mode="brief";
 if(I.mode!=="cover")put("sessionStorage",I.KEYS.session,"1");
 if(I.forced)try{history.replaceState(history.state,"",location.pathname+location.hash)}catch(e){}
 if(I.mode==="brief"){I.ms=I.BRIEFMS;I.fadeAt=I.BRIEFMS-300;I.QUIET=I.QUIETS.brief}
 else if(I.mode!=="play"){I.ms=I.mode==="still"?I.STILLMS:0;I.fadeAt=null}
 sp.classList.add(I.mode);
 function firstPaint(){try{var e=performance.getEntriesByType("paint");for(var i=0;i<e.length;i++)if(e[i].name==="first-paint")return e[i].startTime}catch(x){}return null}
 function start(t0){
  I.t0=I.start=t0;I.state="playing";I.exitAt=t0+I.ms;
  var P=I.mode==="play"?I.PLAN:I.mode==="brief"?I.BRIEF:[];
  sp.classList.add("go");
  for(var k=0;k<P.length;k++){var p=P[k],els=sp.querySelectorAll(p[0]),d=p[2]-p[1],fr=[];
   for(var j=0;j<p[3].length;j++){var f={},src=p[3][j][1];for(var q in src)f[q]=src[q];
    f.offset=(p[3][j][0]-p[1])/d;f.easing=p[4]||"cubic-bezier(.2,.7,.2,1)";fr.push(f)}
   for(var i=0;i<els.length;i++)try{var a=els[i].animate(fr,{duration:d,delay:p[1]+i*(p[5]||0),fill:"both"});a.startTime=t0;if(p[6])a.ambient=1;I.anims.push(a)}catch(e){}}
 }
 function anchor(t){
  /* move the start to the presented first frame, during a passage in which nothing moves. A first
     paint before the first frame of the opening (the page painted before this script ran) is not
     the opening's first frame: the start stays where it is. */
  var fp=firstPaint();if(fp===null)return;
  I.fp=fp;var sh=fp-I.t0,lo=t-sh,hi=t+34;   /* hi: the change shows a frame or two after it is made */
  if(sh<=4||sh>1000){I.anchored=true;return}
  if(lo>=I.QUIET[0]&&hi<I.QUIET[1]){for(var k=0;k<I.anims.length;k++)if(!I.anims[k].ambient)try{I.anims[k].startTime=fp}catch(e){}I.start=fp;I.exitAt=fp+I.ms;I.anchored=true}
  else if(t>=I.QUIET[1]){I.start=fp;I.exitAt=fp+I.ms;I.anchored=true;I.split=true}
 }
 function fly(now){
  /* the monogram travels to the header's brand mark, measured now that the page is laid out;
     without one in view it simply dissolves with the rest */
  var at=I.start+I.FLY[0];if(now>at-20)return;
  var m=sp.querySelector(".o-mk"),tg=document.querySelector(".brand .mark")||document.querySelector(".brand svg,.brand img");
  if(!m||!tg)return;
  var a=m.getBoundingClientRect(),b=tg.getBoundingClientRect();
  if(a.width<8||b.width<8||b.height<8||b.bottom<=0||b.top>=innerHeight||b.right<=0||b.left>=innerWidth)return;
  var sc=Math.min(b.width/a.width,b.height/a.height),dx=b.left+b.width/2-(a.left+a.width/2),dy=b.top+b.height/2-(a.top+a.height/2);
  try{var f=m.animate([{transform:"translate(0px,0px) scale(1)"},{transform:"translate("+dx.toFixed(1)+"px,"+dy.toFixed(1)+"px) scale("+sc.toFixed(4)+")"}],
   {duration:I.FLY[1]-I.FLY[0],fill:"forwards",easing:"cubic-bezier(.6,0,.2,1)"});f.startTime=at;I.flight={dx:dx,dy:dy,scale:sc,anim:f}}catch(e){}
 }
 function exit(now){
  /* the fade ends at start + ms exactly; scheduled ahead when the page is ready early,
     and if begun late it still ends there when 120 ms remain */
  var at=Math.max(I.start+I.fadeAt,now),left=I.exitAt-at;
  if(at>I.start+I.fadeAt+1)I.late=true;
  if(left<120){left=300;I.exitAt=at+left;I.late=true}
  try{I.fade=sp.animate([{opacity:1},{opacity:0}],{duration:left,fill:"forwards",easing:"cubic-bezier(.4,0,.2,1)"});I.fade.startTime=at;I.fadeStart=at;I.fadeEnd=at+left}catch(e){}
  if(I.mode==="play")fly(now);
 }
 I.done=function(how){
  if(I.state==="done")return;I.state="done";I.how=how;I.end=performance.now();
  document.removeEventListener("keydown",onKey,true);
  if(sp.parentNode)sp.parentNode.removeChild(sp);
  try{document.dispatchEvent(new CustomEvent("intro:done",{detail:how}))}catch(e){}
 };
 I.skip=function(){
  if(I.state==="done")return;I.skipped=true;
  var o=1;try{o=+getComputedStyle(sp).opacity}catch(e){}
  if(I.fade)try{I.fade.cancel()}catch(e){}
  sp.classList.add("out");I.skipAt=performance.now();
  try{I.fade=sp.animate([{opacity:o},{opacity:0}],{duration:I.SKIPMS,fill:"forwards",easing:"cubic-bezier(.4,0,.2,1)"})}catch(e){}
  if(I.state==="waiting")I.done("skipped");
 };
 /* a skip the reader chose is remembered for 30 days (a timestamp, nothing else) */
 I.remember=function(){put("localStorage",I.KEYS.skip,String(Date.now()))};
 function userSkip(){I.remember();if(typeof window.splashEnd==="function")window.splashEnd(true);else I.skip()}
 function onKey(e){if(e.key==="Escape"||e.key==="Esc")userSkip()}
 function tick(now){
  if(I.state==="done")return;
  if(I.t0===null)start(now);
  /* every decision after the first frame reads the real time: when the main thread has been busy,
     a frame's timestamp can be older than the moment its callback runs, and a fade scheduled from
     it would begin in the past, already finished */
  var real=performance.now(),t=real-I.start,ready=!!window.__APP_READY;
  if(I.skipAt){if(real-I.skipAt>=I.SKIPMS)return I.done("skipped")}
  else if(I.fadeAt!==null){
   /* once the exit is scheduled the start is settled: a late first-paint report changes nothing */
   if(!I.anchored&&!I.fade)anchor(real-I.t0);
   if(!I.fade&&ready&&(I.anchored||t>=I.QUIET[1]))exit(real);
   if(I.fade&&real>=I.exitAt)return I.done(I.late?"late":I.mode==="play"?"timer":"brief");
  }else{
   /* the still card and the cover: hold, then a short dissolve */
   if(!I.fade&&ready&&t>=I.ms-I.DISSOLVE){var dd=Math.max(I.DISSOLVE,I.start+I.ms-real);
    try{I.fade=sp.animate([{opacity:1},{opacity:0}],{duration:dd,fill:"forwards",easing:"linear"});I.fade.startTime=real}catch(e){}I.fadeStart=real;I.exitAt=real+dd;I.fadeEnd=I.exitAt}
   if(I.fade&&real>=I.exitAt)return I.done(I.mode);
  }
  requestAnimationFrame(tick);
 }
 document.addEventListener("keydown",onKey,true);
 var b=document.getElementById("splashskip");
 if(b)b.addEventListener("click",userSkip);
 requestAnimationFrame(tick);
})();
</script>
'''.replace('__PLAN__', js_plan).replace('__BRIEF__', js_brief)
    s = s.replace(OLD_BLOCK, NEW_MARKUP + CLOCK, 1)
    done.append('overlay and clock')

# ═══ 2 · the old overlay styles leave the base stylesheet (src/styles/css-opening.css holds them) ═══
CSS_I = '/* ── THE OPENING · exactly five seconds ─────────────────────────────────'
CSS_J = '@media (prefers-reduced-motion:reduce){.spskip{animation:none;opacity:1}}\n'
CSS_NEW = ('/* ── THE OPENING · its styles live in src/styles/css-opening.css, spliced at the end of\n'
           '   this stylesheet; the overlay, its clock and its state model are beside it in the body. */\n')
if CSS_I in s:
    i = s.index(CSS_I)
    j = s.index(CSS_J, i) + len(CSS_J)
    assert '#splash{position:fixed' in s[i:j] and s[i:j].count('#splash{') == 1, 'unexpected overlay stylesheet'
    s = s[:i] + CSS_NEW + s[j:]
    done.append('base overlay styles')
else:
    assert CSS_NEW in s, 'the base overlay styles were not found'

# ═══ 3 · the in-page self-tests of the opening ═══════════════════════════════
SUITE_OLD_I = s.index('function SPLASHSUITE(){')
SUITE_OLD_J = s.index('SPLASHSUITE.suiteName="Opening sequence";')
SUITE_NEW = r'''function SPLASHSUITE(){
 const out=[];const T=(n,ok,d)=>out.push({n,ok:!!ok,detail:d||""});
 /* the browser normalises spacing when it re-serialises a rule, so the
    declarations are read from the stylesheet as written */
 const css=(()=>{try{return [...document.querySelectorAll("style")].map(x=>x.textContent).join("")}
   catch(e){return CSSTEXT()}})();
 const html=document.documentElement.outerHTML;
 const I=window.__INTRO||{},PL=I.PLAN||[],BR=I.BRIEF||[],ALL=PL.concat(BR);
 const clock=(document.getElementById("intro-clock")||{}).textContent||"";
 /* the overlay is read from the live element: a later run of the suite (the quality report, or the
    command palette) comes after it has been removed, and then these checks have nothing to inspect */
 const sp=document.getElementById("splash"),mk=sp?sp.outerHTML:"";
 const at=k=>(PL.find(p=>p[0]===k)||[])[1];
 const n=sel=>sp?sp.querySelectorAll(sel).length:1;
 const last=p=>p[2]+(p[5]||0)*Math.max(0,n(p[0])-1);
 T("Opening · the sequence lasts exactly 5000 ms on one clock",
   SPLASH_MS===5000&&I.FULL===5000&&/requestAnimationFrame/.test(clock)&&/a\.startTime=t0/.test(clock)&&/first-paint/.test(clock),String(I.FULL));
 T("Opening · no stage is timed by a chain of timers",!/setTimeout|setInterval/.test(clock));
 T("Opening · five stages a second apart: the world, the language of economics, two economic worlds, the identity, the philosophy",
   at(".o-band")<200&&at(".o-arcs")<1000&&at(".o-ds .o-w")>=1000&&at(".o-ds .o-w")<1200&&at(".o-cap-ib .o-cap-in")>=2000&&at(".o-in")>=2000&&at(".o-in")<2500
   &&at(".o-mk1>svg")>=2900&&at(".o-mk1>svg")<3100&&at(".o-ec>svg")>=3700&&at(".o-ec>svg")<4000,
   PL.map(p=>p[0]+"@"+p[1]).join(" "));
 T("Opening · every stage ends by 5000 ms and the exit fade fills the last 300 ms",
   PL.length>=20&&PL.every(p=>last(p)<=5000&&p[1]<p[2])&&I.FULL-300===4700&&/I\.exitAt=fp\+I\.ms/.test(clock)&&/I\.exitAt=t0\+I\.ms/.test(clock)
   &&I.FLY[1]<=5000,PL.filter(p=>last(p)>5000).map(p=>p[0]).join(" "));
 T("Opening · only opacity and transform are animated, so the compositor keeps time",
   ALL.every(p=>p[3].every(([,f])=>Object.keys(f).every(k=>k==="opacity"||k==="transform")))
   &&(clock.match(/\.animate\(\[\{(\w+)/g)||[]).every(x=>/opacity|transform/.test(x)));
 T("Opening · lines are drawn by sliding windows and scaled origins, never by dash offsets",
   !/dashoffset/i.test(clock)&&!/#splash[^{}]*\{[^}]*dashoffset/i.test(css)&&PL.filter(p=>/translate[XY]\(-\d+%\)/.test(JSON.stringify(p[3]))).length>=6);
 T("Opening · every fading layer is a leaf, so no stage needs an offscreen pass",
   !sp||[PL,BR].every(P=>{const anim=new Set();P.forEach(p=>sp.querySelectorAll(p[0]).forEach(e=>anim.add(e)));
     return P.filter(p=>p[3].some(([,f])=>"opacity" in f)).every(p=>[...sp.querySelectorAll(p[0])].every(e=>![...anim].some(x=>x!==e&&e.contains(x))))}));
 T("Opening · keyframes are in time order inside each stage's window",
   ALL.every(p=>p[3].every(([t],k,a)=>t>=p[1]&&t<=p[2]&&(k===0||t>a[k-1][0]))));
 T("Opening · every stage has something to move",!sp||ALL.every(p=>sp.querySelectorAll(p[0]).length>0),
   ALL.filter(p=>sp&&!sp.querySelectorAll(p[0]).length).map(p=>p[0]).join(" "));
 T("Opening · a passage of stillness exists for the first-paint anchor",
   (()=>{const q=I.QUIETS&&I.QUIETS.play;if(!q)return false;
     return PL.filter(p=>!p[6]).every(p=>{const s0=p[1]+0,s1=last(p);return s1<=q[0]||s0>=q[1]||
       p[3].every(([,f],k,a)=>k===0||JSON.stringify(f)===JSON.stringify(a[k-1][1]))})})());
 T("Opening · the identity reads ARJUN AGRAWAL, ECONOMICS, THINK LIKE AN ECONOMIST.",
   !sp||([...sp.querySelectorAll("[data-text]")].map(e=>e.getAttribute("data-text")).join(" / ")==="ARJUN AGRAWAL / ECONOMICS / THINK LIKE AN ECONOMIST."
     &&sp.getAttribute("aria-label")==="Arjun Agrawal · Economics. Think like an economist."));
 T("Opening · the name is carried by the brand vectors, never set again in type",
   !sp||(mk.replace(/aria-label="[^"]*"/g,"").replace(/data-text="[^"]*"/g,"").replace(/<!--[\s\S]*?-->/g,"").match(/Arjun\s+Agrawal/gi)||[]).length===0);
 T("Opening · both pathways: IB DP in burgundy, UPSC CSE in forest green, India's dots warming to gold",
   (!sp||(/IB DP/.test((sp.querySelector(".o-cap-ib")||{}).textContent||"")&&/UPSC CSE/.test((sp.querySelector(".o-cap-up")||{}).textContent||"")
     &&!!sp.querySelector(".o-in")&&!/IB DP Economics|Learn\. Think\. Calculate\./.test(mk)))&&/--o-ib:/.test(css)&&/--o-up:/.test(css));
 T("Opening · the world map is inline vector data with India on its own layer, no image or video",
   !sp||(sp.querySelectorAll(".o-band").length===8&&!!sp.querySelector(".o-in path")&&!sp.querySelector("img,video,canvas,iframe")));
 T("Opening · a Skip introduction control is a real button, reachable by keyboard",
   (()=>{const b=document.getElementById("splashskip");return !sp||(!!b&&b.tagName==="BUTTON"&&b.type==="button"&&/^Skip introduction$/.test(b.textContent.trim())&&b.tabIndex>=0)})());
 T("Opening · Escape skips, as does Enter or a click on the button, and nothing else does",
   /e\.key==="Escape"/.test(clock)&&/b\.addEventListener\("click",userSkip\)/.test(clock)&&!/addEventListener\("(wheel|pointerdown|touchstart|mousedown)"/.test(clock));
 T("Opening · Skip and the clock share one exit",
   typeof splashEnd==="function"&&/SPLASH_DONE/.test(String(splashEnd))&&/I\.skip\(\)/.test(String(splashEnd))&&/I\.done=function/.test(clock));
 T("Opening · a second press of Skip does nothing",/btn\.disabled=true/.test(String(splashEnd)));
 T("Opening · the state model: the full sequence once a session, then a brief card; a remembered skip gives the card too",
   /sessionStorage/.test(clock)&&/localStorage/.test(clock)&&I.KEYS&&I.KEYS.session==="aae.intro.seen"&&I.KEYS.skip==="aae.intro.skip"
   &&I.REMEMBER===30*864e5&&I.BRIEFMS===1200&&/I\.seen\|\|I\.remembered\)\)I\.mode="brief"/.test(clock));
 T("Opening · ?intro=1 forces the full sequence; a deep link shows only the cover",
   /intro=1/.test(clock)&&/if\(I\.route!=="home"&&!I\.forced\)I\.mode="cover"/.test(clock));
 T("Opening · storage is reached only inside try/catch, so a private window still opens",
   /function get\(st,k\)\{try\{/.test(clock)&&/function put\(st,k,v\)\{try\{/.test(clock)
   &&(clock.match(/(local|session)Storage\./g)||[]).length===0);
 T("Opening · reduced motion shows a still card for 1.5 s rather than playing slowly",
   /prefers-reduced-motion:reduce/.test(clock)&&I.STILLMS===1500&&/#splash\.still/.test(css));
 T("Opening · the font stylesheet cannot hold the first frame",
   (()=>{const l=[...document.querySelectorAll('link[href*="assets/fonts/fonts.css"]')].filter(x=>x.rel==="stylesheet");
     return l.length>=1&&l.every(x=>x.media==="all"||x.media==="print"||x.getAttribute("onload"))})());
 T("Opening · a slow start holds the final frame instead of uncovering an unfinished page",
   /__APP_READY/.test(clock)&&/window\.__APP_READY=true/.test(html));
 T("Opening · the overlay names itself for assistive technology and hides its decoration",
   !sp||(sp.getAttribute("role")==="status"&&[...sp.children].filter(x=>x.id!=="splashskip").every(x=>x.getAttribute("aria-hidden")==="true")));
 T("Opening · the monogram's journey to the header is measured, and optional",
   /\.brand \.mark/.test(clock)&&/if\(!m\|\|!tg\)return/.test(clock));
 T("Opening · the stored keys are listed where the site says what it stores",
   typeof settingsView==="function"&&/aae\.intro\.seen/.test(String(settingsView))&&/aae\.intro\.skip/.test(String(settingsView)));
 T("Splash · the faded overlay stops intercepting clicks before it is removed",
   /#splash\.out\{[^}]*pointer-events:none/.test(css));
 T("Splash · nothing invisible is left behind: the overlay is removed, not merely faded",
   /sp\.parentNode\.removeChild\(sp\)/.test(clock));
 T("Splash · the page behind is never made inert",!/inert/.test(clock)&&!document.body.hasAttribute("inert"));
 T("Splash · nothing on the page locks scrolling",
   getComputedStyle(document.documentElement).overflow!=="hidden"
   &&["hidden","clip"].indexOf(getComputedStyle(document.body).overflowY)<0);
 T("Splash · the opening sequence triggers no printing",PRINTGUARD.startupCalls===0);
 T("Splash · the opening writes nothing to the progress record",
   store.raw(ROOTKEY)===QAFX.snap0&&store.sandboxed()&&!/AA_IB_ECONOMICS|ROOTKEY/.test(clock));
 T("Splash · the welcome sequence is scheduled after the overlay, not beside it",
   typeof bootOnboarding==="function");
 return out;
}
'''
if 'Opening · the state model: the full sequence once a session' not in s[SUITE_OLD_I:SUITE_OLD_J]:
    s = s[:SUITE_OLD_I] + SUITE_NEW + s[SUITE_OLD_J:]
    done.append('self-tests')

# the quality report counts the opening's own checks in its area
rep(''' {area:"Opening sequence",re:/^Splash · /,
  what:"That the sequence runs for five seconds on a fresh page load and is shortened rather than slowed under a reduced-motion preference, that the five stages carry the brand in the required order one second apart, that every stage animates opacity and transform only so the layout cannot shift, that the faded overlay stops intercepting clicks and is then removed from the document rather than left invisible over the page, that nothing locks scrolling, that the sequence prints nothing and writes nothing to storage, and that the welcome sequence is scheduled after the overlay rather than beside it."},''',
    ''' {area:"Opening sequence",re:/^Splash · |^Opening · /,
  what:"That the sequence runs for exactly five seconds on one clock, plays in full once a session and is otherwise a brief card, a still card under a reduced-motion preference or a cover on a deep link, that its five stages come a second apart and animate opacity and transform only so the compositor keeps time, that it reads ARJUN AGRAWAL, ECONOMICS, THINK LIKE AN ECONOMIST., that Skip is a real button that also answers Escape, that storage is touched only inside try/catch and only for its two documented keys, that the faded overlay stops intercepting clicks and is then removed from the document, that nothing locks scrolling, that the sequence prints nothing, and that the welcome sequence is scheduled after the overlay rather than beside it."},''',
    'quality report')

# ═══ 4 · the site says what the opening stores ════════════════════════════════
rep('''   analytics. Clearing your browser's site data for this page removes all of it, which is why the export below exists.</p>
''', '''   analytics. Clearing your browser's site data for this page removes all of it, which is why the export below exists.</p>
  <p class="sm mt3" style="max-width:72ch">The opening keeps two small notes of its own. <code>aae.intro.seen</code>, in this
   tab's session storage, means the five-second opening has played once this visit, so a later visit to the home page shows a brief
   card instead. <code>aae.intro.skip</code>, in local storage, is the time you last pressed Skip introduction; for thirty days after
   it the home page shows the brief card. Neither holds anything about you. <a class="lnk" href="?intro=1">Replay the opening</a></p>
''', 'settings: what the opening stores')

P.write_text(s, encoding='utf-8')
print('applied:', ', '.join(done) if done else 'nothing (already applied)')
