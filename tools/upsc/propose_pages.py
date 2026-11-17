"""Propose preview pages for the Economics Handbook Library, so that a person can choose quickly.

For each handbook PDF (read from a PRIVATE folder; nothing is written to the repository) it:
  - extracts each page's text (pdftotext -layout) and measures it: words, dotted contents
    leaders, "Figure" and "Table" captions, column structure, raster images (pdfimages) and how
    much of the page is ink or colour (from a small rendering);
  - scores every page for each kind of preview page the brief asks for: contents, a concept
    explained, an infographic or diagram, policy in detail, a table or data, a case study,
    scheme or institution, an examination-oriented page, and another high-value page;
  - writes, per volume: contact-sheet-N.jpg (every page, numbered, the proposed ones framed),
    candidates.md (the best pages for each kind, with the opening words of each), candidates.json
    (every score), and proposal.json (a draft entry for tools/upsc/preview-pages.json).

The proposal is a starting point: read every page you publish and rewrite each caption, which is
only drafted from the page's first heading. Then copy the entries into tools/upsc/preview-pages.json
and run tools/upsc/build_upsc.py --src <folder>.

Usage:
  python3 tools/upsc/propose_pages.py --src /private/handbooks [--out /tmp/proposals]
  python3 tools/upsc/propose_pages.py --pdf /private/handbooks/vol-3.pdf --volume volume-iii
Options: --target 8 (pages to propose, 5 to 10)  --per-kind 5 (candidates listed per kind)
"""
import argparse, glob, json, os, re, subprocess, sys, tempfile

sys.dont_write_bytecode = True          # no __pycache__ inside the repository
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import build_upsc as B  # noqa: E402

KIND_ORDER = ['contents', 'concept', 'figure', 'policy', 'table', 'case', 'exam', 'extra']
LABEL = {'contents': 'Contents', 'concept': 'A concept explained', 'figure': 'Infographic or diagram',
         'policy': 'Policy in detail', 'table': 'Table and data', 'case': 'Case study, scheme or institution',
         'exam': 'For the examination', 'extra': 'Another high-value page'}
WORDS = {
    'exam': r'\bprelims\b|\bmains\b|\bpyqs?\b|\bmcqs?\b|answer framework|model answer|upsc trap|previous[- ]year|practice question|'
            r'\bquestion\b|value addition|booster|\btrap\b|answer[- ]writing',
    'case': r'\bschemes?\b|\byojana\b|\bmission\b|case study|\bact\b|\bcommittee\b|\bcommission\b|\bcouncil\b|\bauthority\b|'
            r'\bboard\b|\bministry\b|\binstitutions?\b|\bpm-[a-z]+|\bfund\b|\bcorporation\b',
    'policy': r'\bpolicy\b|\breforms?\b|\bframework\b|\bamendment\b|\bbudget\b|\bregulation\b|\bdirections\b|\bguidelines\b|'
              r'\brules\b|\bgovernment\b|\btargets?\b|\bnotified\b|\beffective from\b',
    'concept': r'core idea|\bdefinition\b|\bmeaning\b|\bmeans\b|refers to|is defined|\bconcept\b|economic insight|\bwhy\b|\btherefore\b',
}


def text_pages(pdf):
    out = subprocess.run(['pdftotext', '-layout', pdf, '-'], capture_output=True, text=True, check=True).stdout
    pages = out.split('\f')
    return pages[:-1] if pages and not pages[-1].strip() else pages


def raster_counts(pdf):
    counts = {}
    try:
        out = subprocess.run(['pdfimages', '-list', pdf], capture_output=True, text=True, check=True).stdout
    except (subprocess.CalledProcessError, FileNotFoundError):
        return counts
    for line in out.splitlines()[2:]:
        f = line.split()
        if len(f) > 4 and f[0].isdigit() and f[2] == 'image' and int(f[3]) * int(f[4]) > 40000:  # ignore logos and rules
            counts[int(f[0])] = counts.get(int(f[0]), 0) + 1
    return counts


def thumbs(pdf, d, width=200):
    subprocess.run(['pdftoppm', '-scale-to-x', str(width), '-scale-to-y', '-1', '-png', pdf, os.path.join(d, 't')],
                   check=True, capture_output=True)
    files = sorted(glob.glob(os.path.join(d, 't-*.png')), key=lambda f: int(re.search(r'-(\d+)\.png$', f).group(1)))
    return files


def ink(path):
    """Share of the page that is not near-white, and share that is clearly coloured."""
    from PIL import Image
    with Image.open(path) as im:
        b = im.convert('RGB').resize((100, 141)).tobytes()
        px = [tuple(b[i:i + 3]) for i in range(0, len(b), 3)]
    dark = sum(1 for r, g, b in px if min(r, g, b) < 225) / len(px)
    colour = sum(1 for r, g, b in px if max(r, g, b) - min(r, g, b) > 40) / len(px)
    return dark, colour


def heading(t):
    for line in t.splitlines():
        s = ' '.join(line.split())
        if len(s) < 6 or re.search(r'volume [ivx]+\s*\|', s, re.I) or re.search(r'for more resources|all rights reserved', s, re.I):
            continue
        if re.match(r'^[A-M]\.\d+\s+\S', s) or (s[:1].isupper() and len(s.split()) <= 12 and not s.endswith('.')):
            return s
    return ''


def features(pdf):
    T = text_pages(pdf)
    R = raster_counts(pdf)
    with tempfile.TemporaryDirectory() as d:
        files = thumbs(pdf, d)
        inks = [ink(f) for f in files]
        sheets_src = [open(f, 'rb').read() for f in files]
    maxw = max([len(re.findall(r'[A-Za-z]{2,}', t)) for t in T] + [1])
    F = []
    for i, t in enumerate(T):
        p = i + 1
        lines = [l for l in t.splitlines() if l.strip()]
        words = len(re.findall(r'[A-Za-z]{2,}', t))
        low = t.lower()
        cols = sum(1 for l in lines if len(re.findall(r'\S\s{3,}\S', l.strip())) >= 2)
        f = {
            'p': p, 'words': words, 'density': words / maxw,
            'leaders': sum(1 for l in lines if re.search(r'\.{4,}\s*\d{1,3}\s*$', l)),
            'contents': bool(re.search(r'^\s*contents\s*$', t, re.I | re.M)),
            'figures': len(re.findall(r'\bfigure\s+[a-z]?\.?\d', low)),
            'tables': len(re.findall(r'\btable\s+[a-z]?\.?\d', low)),
            'colratio': cols / max(len(lines), 1),
            'rasters': R.get(p, 0),
            'ink': inks[i][0] if i < len(inks) else 0, 'colour': inks[i][1] if i < len(inks) else 0,
            'refs': bool(re.search(r'^\s*(references|references and sources|bibliography|sources)\s*$', t, re.I | re.M)),
            'heading': heading(t), 'opening': ' '.join(t.split())[:220],
        }
        for k, rx in WORDS.items():
            f['kw_' + k] = len(re.findall(rx, low))
        F.append(f)
    return F, sheets_src


def scores(f, n_pages):
    if f['p'] == 1 or f['refs'] or (f['words'] < 25 and f['ink'] < 0.08):
        return {k: 0.0 for k in KIND_ORDER}
    sparse = max(0.0, 1 - f['density'] * 1.6)          # little text for the page's ink
    s = {
        'contents': min(1, f['leaders'] / 6) + (0.5 if f['contents'] else 0) + (0.2 if f['p'] == 2 else 0),
        'concept': f['density'] * (1 - min(1, f['colratio'] * 2)) * 0.8 + min(1, f['kw_concept'] / 8) * 0.4
                   - 0.3 * min(1, f['figures']),
        'figure': min(1, f['figures']) * 0.5 + min(1, f['rasters']) * 0.3 + (f['ink'] * sparse) * 1.2 + f['colour'] * 0.6,
        'policy': min(1, f['kw_policy'] / 10) * 0.8 + f['density'] * 0.3,
        'table': min(1, f['tables']) * 0.5 + min(1, f['colratio'] * 2.5) * 0.6,
        'case': min(1, f['kw_case'] / 8) * 0.9 + f['density'] * 0.2,
        'exam': min(1, f['kw_exam'] / 10) * 0.9 + (0.2 if f['p'] > n_pages * 0.75 else 0),
    }
    s = {k: max(0.0, round(v, 3)) for k, v in s.items()}
    s['extra'] = round(sum(v for k, v in s.items() if k != 'contents') / 6, 3)
    return s


def part_of(p, parts):
    cur = ''
    for x in sorted(parts, key=lambda x: x['p']):
        if p >= x['p']:
            cur = x['l']
    return cur


def propose(F, S, target, parts):
    picked, used_parts = [], set()
    order = KIND_ORDER if target >= len(KIND_ORDER) else KIND_ORDER[:target]
    for kind in order:
        ranked = sorted((x for x in F if x['p'] not in {q['p'] for q in picked}), key=lambda x: -S[x['p']][kind])
        best = None
        for x in ranked:
            if S[x['p']][kind] <= 0.15:
                break
            if kind != 'contents' and parts and part_of(x['p'], parts) in used_parts:
                continue
            best = x
            break
        best = best or next((x for x in ranked if S[x['p']][kind] > 0.15), None)
        if best:
            picked.append({'p': best['p'], 'kind': kind, 'score': S[best['p']][kind], 'heading': best['heading']})
            if parts:
                used_parts.add(part_of(best['p'], parts))
    while len(picked) < target:
        rest = sorted((x for x in F if x['p'] not in {q['p'] for q in picked}), key=lambda x: -S[x['p']]['extra'])
        if not rest or S[rest[0]['p']]['extra'] <= 0.1:
            break
        picked.append({'p': rest[0]['p'], 'kind': 'extra', 'score': S[rest[0]['p']]['extra'], 'heading': rest[0]['heading']})
    return sorted(picked, key=lambda x: x['p'])


def caption(x, parts):
    h = re.sub(r'^(?:(?:figure|table|box)\s+)?[A-Z]{1,4}\.\d+\s+', '', x['heading'], flags=re.I).strip()
    if x['kind'] == 'contents':
        return "The contents page: each part with the page it begins on, and the volume's syllabus map"
    letter = part_of(x['p'], parts) if parts else ''
    return (f'Part {letter}: ' if letter else '') + (h or 'page ' + str(x['p']))


def contact_sheet(srcs, picked, S, out_base, per_sheet=30, cols=6):
    from PIL import Image, ImageDraw, ImageFont
    import io
    try:
        font = ImageFont.truetype('DejaVuSans-Bold.ttf', 15)
        small = ImageFont.truetype('DejaVuSans.ttf', 12)
    except OSError:
        font = small = ImageFont.load_default()
    chosen = {x['p']: x['kind'] for x in picked}
    files = []
    for k in range(0, len(srcs), per_sheet):
        chunk = srcs[k:k + per_sheet]
        ims = [Image.open(io.BytesIO(b)).convert('RGB') for b in chunk]
        w = max(i.width for i in ims)
        h = max(i.height for i in ims)
        rows = (len(ims) + cols - 1) // cols
        sheet = Image.new('RGB', (cols * (w + 16) + 16, rows * (h + 44) + 16), (246, 244, 238))
        d = ImageDraw.Draw(sheet)
        for j, im in enumerate(ims):
            p = k + j + 1
            x, y = 16 + (j % cols) * (w + 16), 16 + (j // cols) * (h + 44)
            sheet.paste(im, (x, y + 22))
            top = max((kk for kk in KIND_ORDER if kk != 'extra'), key=lambda kk: S[p][kk])
            d.text((x, y), f'p. {p}', fill=(20, 20, 20), font=font)
            d.text((x + 58, y + 2), f'{top} {S[p][top]:.2f}', fill=(90, 90, 90), font=small)
            if p in chosen:
                d.rectangle((x - 5, y + 17, x + im.width + 4, y + 22 + im.height + 4), outline=(176, 40, 40), width=4)
                d.text((x, y + 24 + im.height), 'proposed: ' + chosen[p], fill=(176, 40, 40), font=small)
        path = f'{out_base}-{k // per_sheet + 1}.jpg'
        sheet.save(path, 'JPEG', quality=82)
        files.append(path)
    return files


def run_one(pdf, vid, vol, out, target, per_kind):
    F, srcs = features(pdf)
    S = {f['p']: scores(f, len(F)) for f in F}
    parts = vol['parts'] if vol else []
    picked = propose(F, S, target, parts)
    d = os.path.join(out, vid)
    os.makedirs(d, exist_ok=True)
    sheets = contact_sheet(srcs, picked, S, os.path.join(d, 'contact-sheet'))
    proposal = [{'p': x['p'], 'kind': x['kind'], 'cap': caption(x, parts)} for x in picked]
    json.dump({vid: proposal}, open(os.path.join(d, 'proposal.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    json.dump([dict(f, scores=S[f['p']]) for f in F], open(os.path.join(d, 'candidates.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    md = [f'# {vid}: preview candidates', '', f'{len(F)} pages. Proposed ({len(proposal)}):', '']
    md += [f"- p. {x['p']} · {LABEL[x['kind']]} · \"{x['cap']}\"" for x in proposal]
    md += ['', 'Captions are drafts taken from each page\'s first heading. Read every page before publishing it.', '']
    for kind in KIND_ORDER:
        md += [f'## {LABEL[kind]}', '']
        for f in sorted(F, key=lambda f: -S[f['p']][kind])[:per_kind]:
            if S[f['p']][kind] <= 0:
                break
            md.append(f"- p. {f['p']} ({S[f['p']][kind]:.2f}): {f['heading'] or f['opening'][:90]}")
        md.append('')
    open(os.path.join(d, 'candidates.md'), 'w', encoding='utf-8').write('\n'.join(md))
    print(f'{vid}: {len(F)} pages, proposed {", ".join(str(x["p"]) for x in proposal)}; {len(sheets)} contact sheet(s) in {d}')
    return proposal


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__.split('\n\n')[0])
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument('--src', help='private folder with the handbook PDFs (each is identified as a volume)')
    g.add_argument('--pdf', help='one PDF')
    ap.add_argument('--volume', help='with --pdf: the volume id, e.g. volume-iii (otherwise identified from the PDF)')
    ap.add_argument('--out', help='output folder, outside the repository (default: a new temporary folder)')
    ap.add_argument('--target', type=int, default=8)
    ap.add_argument('--per-kind', type=int, default=5)
    ap.add_argument('--root', default=B.REPO, help=argparse.SUPPRESS)
    a = ap.parse_args(argv)
    if not B.MIN_PAGES <= a.target <= B.MAX_PAGES:
        sys.exit(f'--target must be between {B.MIN_PAGES} and {B.MAX_PAGES}')
    B.require('pdfinfo', 'pdftoppm', 'pdftotext')
    paths = B.Paths(a.root)
    cat = json.load(open(paths.cat, encoding='utf-8'))
    by_n = {v['n']: v for v in cat['volumes']}
    by_id = {v['id']: v for v in cat['volumes']}
    out = os.path.abspath(a.out) if a.out else tempfile.mkdtemp(prefix='hb-proposals-')
    for r in {B.REPO, paths.root}:
        for p in [out] + ([a.src] if a.src else [a.pdf]):
            if B.inside(p, r):
                sys.exit('the PDFs and the proposals must stay outside the repository: ' + p)
    os.makedirs(out, exist_ok=True)
    jobs = []
    if a.pdf:
        vol = by_id.get(a.volume) if a.volume else None
        if not vol:
            n, how, _, _ = B.identify(a.pdf)
            vol = by_n.get(n)
        if not vol:
            sys.exit('could not tell which volume this is; pass --volume volume-iii')
        jobs.append((a.pdf, vol))
    else:
        found, problems = B.find_volumes(a.src)
        for p in problems:
            print('note:', p)
        jobs = [(found[n]['path'], by_n[n]) for n in B.ROMAN if n in found and n in by_n]
    allp = {}
    for pdf, vol in jobs:
        allp.update({vol['id']: run_one(pdf, vol['id'], vol, out, a.target, a.per_kind)})
    json.dump(allp, open(os.path.join(out, 'proposal-all.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('All proposals:', os.path.join(out, 'proposal-all.json'))
    return 0


if __name__ == '__main__':
    sys.exit(main())
