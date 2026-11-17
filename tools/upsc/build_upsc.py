"""Build step for the Economics Handbook Library (UPSC CSE Economics).

The eleven handbooks are sold as digital soft copies and are never stored in this
repository or published whole. This tool reads them from a PRIVATE folder outside
the repository and writes only what the public site needs:

  1. it identifies each PDF as a volume (from the PDF's title metadata, the text of
     its cover, or its file name) and checks it against content/upsc/handbooks.json:
     the page count (pdfinfo), the title on the cover and the page on which each part
     begins. Differences are REPORTED, never silently corrected: the catalogue's
     titles are kept exactly as recorded, and page counts change only when you pass
     --accept-counts;
  2. it renders the cover and the pages chosen in tools/upsc/preview-pages.json as
     clean WebP images (no watermark, stamp or overlay): each page about 1600 px wide
     with a 400 px thumbnail, the cover 800 px with a 400 px thumbnail, into
     assets/upsc/handbooks/<volume-id>/, and deletes every image no longer chosen;
  3. it writes src/modules/41-upsc-data.js, the catalogue as the page reads it, and
     reports the total weight of the preview images.

Requires poppler (pdfinfo, pdftoppm, pdftotext) and Pillow. Run the splice afterwards:
python3 tools/build/splice.py

Usage:
  python3 tools/upsc/build_upsc.py --src /private/handbooks --check          # verify only
  python3 tools/upsc/build_upsc.py --src /private/handbooks                  # verify, render, write
  python3 tools/upsc/build_upsc.py --src /private/handbooks --accept-counts  # also take page counts from the PDFs
  python3 tools/upsc/build_upsc.py --data-only                               # rewrite the module from the JSON
Options: --only volume-iii,volume-iv  --width 1600  --thumb 400  --cover 800  --quality 78
         --budget-mb 20  --report FILE.md (outside the repository)  --root DIR (another checkout; used by the tests)
"""
import argparse, glob, io, json, os, re, shutil, subprocess, sys, tempfile, unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV']
KINDS = ['contents', 'concept', 'figure', 'policy', 'table', 'case', 'exam', 'extra']
MIN_PAGES, MAX_PAGES = 5, 10          # the owner's brief: about eight pages, at least five, at most ten


class Paths:
    def __init__(self, root):
        self.root = os.path.abspath(root)
        self.cat = os.path.join(self.root, 'content', 'upsc', 'handbooks.json')
        self.sel = os.path.join(self.root, 'tools', 'upsc', 'preview-pages.json')
        self.out = os.path.join(self.root, 'assets', 'upsc', 'handbooks')
        self.mod = os.path.join(self.root, 'src', 'modules', '41-upsc-data.js')


# ── small helpers ──────────────────────────────────────────────────────────
def require(*tools):
    missing = [t for t in tools if not shutil.which(t)]
    if missing:
        sys.exit('missing tools: ' + ', '.join(missing) + ' (install poppler-utils)')
    try:
        import PIL  # noqa: F401
    except ImportError:
        sys.exit('missing Python package: Pillow (pip install Pillow)')


def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True, check=True).stdout


def norm(s):
    """Lower case, '&' read as 'and', accents and punctuation dropped, spaces collapsed."""
    s = unicodedata.normalize('NFKD', str(s)).encode('ascii', 'ignore').decode()
    s = s.lower().replace('&', ' and ')
    return ' '.join(re.sub(r'[^a-z0-9]+', ' ', s).split())


def roman_of(token):
    t = str(token).strip().upper()
    if t.isdigit():
        n = int(t)
        return ROMAN[n - 1] if 1 <= n <= len(ROMAN) else None
    return t if t in ROMAN else None


def pdf_info(path):
    out = run(['pdfinfo', path])
    pages = int(re.search(r'^Pages:\s+(\d+)', out, re.M).group(1))
    t = re.search(r'^Title:\s+(.*)$', out, re.M)
    size = re.search(r'^Page size:\s+([\d.]+) x ([\d.]+) pts', out, re.M)
    return {'pages': pages, 'title': t.group(1).strip() if t else '',
            'w_pt': float(size.group(1)) if size else 595.28, 'h_pt': float(size.group(2)) if size else 841.89}


def page_text(path, p, layout=True):
    cmd = ['pdftotext', '-f', str(p), '-l', str(p)] + (['-layout'] if layout else []) + [path, '-']
    try:
        return run(cmd)
    except subprocess.CalledProcessError:
        return ''


def inside(path, root):
    path, root = os.path.realpath(path), os.path.realpath(root)
    return os.path.commonpath([path, root]) == root


# ── 1 · find and identify the volumes ──────────────────────────────────────
def identify(path):
    """Return (numeral, how, info, cover_text). The three sources must not disagree."""
    info = pdf_info(path)
    cover = page_text(path, 1)
    votes = {}
    m = re.search(r'\bvol(?:ume)?\.?\s*([ivxl]+|\d{1,2})\b', info['title'], re.I)
    if m and roman_of(m.group(1)):
        votes['title metadata'] = roman_of(m.group(1))
    m = re.search(r'\bvolume\s+([ivxl]+|\d{1,2})\b', cover, re.I)
    if m and roman_of(m.group(1)):
        votes['cover text'] = roman_of(m.group(1))
    m = re.search(r'(?:^|[^a-z])vol(?:ume)?[\s_.-]*([ivxl]+|\d{1,2})(?![a-z0-9])', os.path.basename(path), re.I)
    if m and roman_of(m.group(1)):
        votes['file name'] = roman_of(m.group(1))
    found = set(votes.values())
    if len(found) == 1:
        return found.pop(), ' and '.join(votes), info, cover
    if len(found) > 1:
        return None, 'conflicting: ' + ', '.join(f'{k} says {v}' for k, v in votes.items()), info, cover
    return None, 'no volume number in the title metadata, the cover or the file name', info, cover


def find_volumes(src):
    found, problems = {}, []
    pdfs = sorted(set(glob.glob(os.path.join(src, '**', '*.pdf'), recursive=True) +
                      glob.glob(os.path.join(src, '**', '*.PDF'), recursive=True)))
    for p in pdfs:
        try:
            n, how, info, cover = identify(p)
        except Exception as e:  # unreadable or not a PDF
            problems.append(f'{os.path.basename(p)}: could not be read ({e})')
            continue
        if not n:
            problems.append(f'{os.path.basename(p)}: not identified ({how})')
            continue
        if n in found:
            problems.append(f'{os.path.basename(p)}: Volume {n} is already {os.path.basename(found[n]["path"])}; both skipped')
            found[n]['dup'] = True
            continue
        found[n] = {'path': p, 'how': how, 'info': info, 'cover': cover}
    for n in [k for k, v in found.items() if v.get('dup')]:
        del found[n]
    return found, problems


# ── 2 · verify against the catalogue ───────────────────────────────────────
def verify(cat, found):
    """Per volume: the title on the PDF, its page count, and where each part begins."""
    rows = []
    for v in cat['volumes']:
        r = {'n': v['n'], 'id': v['id'], 'title': v['title'], 'pages': v['pages'], 'found': v['n'] in found,
             'notes': [], 'title_ok': None, 'pages_pdf': None, 'parts_bad': []}
        if not r['found']:
            r['notes'].append('no PDF for this volume in the private folder')
            rows.append(r)
            continue
        f = found[v['n']]
        pdf, info = f['path'], f['info']
        r['file'], r['how'] = os.path.basename(pdf), f['how']
        r['pages_pdf'] = info['pages']
        want = norm(v['title'])
        r['title_ok'] = want in norm(info['title']) or want in norm(f['cover'])
        if not r['title_ok']:
            seen = info['title'] or ' '.join(f['cover'].split())[:120]
            r['notes'].append(f"title differs: the catalogue records '{v['title']}', the PDF shows '{seen}'")
        if info['pages'] != v['pages']:
            r['notes'].append(f"page count differs: the catalogue records {v['pages']}, the PDF has {info['pages']}")
        ratio = info['h_pt'] / info['w_pt'] if info['w_pt'] else 0
        if abs(ratio - 2 ** 0.5) > 0.02:
            r['notes'].append(f"page size is {info['w_pt']:.0f} x {info['h_pt']:.0f} pt, not A4 portrait")
        for part in v['parts']:
            if part['p'] > info['pages']:
                r['parts_bad'].append(f"Part {part['l']} (p. {part['p']}): beyond the last page")
                continue
            t = norm(page_text(pdf, part['p']))
            if norm(part['t']) not in t and f"part {part['l'].lower()}" not in t:
                r['parts_bad'].append(f"Part {part['l']} (p. {part['p']}): neither 'Part {part['l']}' nor its title is on that page")
        if r['parts_bad']:
            r['notes'].append(f"{len(r['parts_bad'])} part(s) not found on the page the catalogue gives")
        rows.append(r)
    return rows


def print_report(rows, problems, out=None):
    lines = ['# Handbook check', '', '| Vol. | Title in the catalogue | PDF | Identified by | Title | Pages (catalogue / PDF) |',
             '|---|---|---|---|---|---|']
    for r in rows:
        if not r['found']:
            lines.append(f"| {r['n']} | {r['title']} | missing | | | {r['pages']} / - |")
            continue
        ok = 'matches' if r['title_ok'] else '**differs**'
        pg = f"{r['pages']} / {r['pages_pdf']}" + ('' if r['pages'] == r['pages_pdf'] else ' **differs**')
        lines.append(f"| {r['n']} | {r['title']} | {r['file']} | {r['how']} | {ok} | {pg} |")
    notes = [(r['n'], n) for r in rows for n in r['notes']] + [(r['n'], b) for r in rows for b in r['parts_bad']]
    if notes or problems:
        lines += ['', '## To check', ''] + [f'- Volume {n}: {t}' for n, t in notes] + [f'- {p}' for p in problems]
    else:
        lines += ['', 'Every volume matches the catalogue.']
    text = '\n'.join(lines) + '\n'
    print(text)
    if out:
        with open(out, 'w', encoding='utf-8') as fh:
            fh.write(text)
        print('report written to', out)


def accept_counts(paths, rows):
    """Rewrite only the "pages" value of each volume whose PDF count differs, keeping the file's layout."""
    src = open(paths.cat, encoding='utf-8').read()
    changed = []
    for r in rows:
        if r['found'] and r['pages_pdf'] is not None and r['pages_pdf'] != r['pages']:
            i = src.index(f'"id": "{r["id"]}"')
            m = re.compile(r'"pages":\s*\d+').search(src, i)
            src = src[:m.start()] + f'"pages": {r["pages_pdf"]}' + src[m.end():]
            changed.append(f"Volume {r['n']}: {r['pages']} -> {r['pages_pdf']}")
    if changed:
        json.loads(src)  # still valid
        open(paths.cat, 'w', encoding='utf-8').write(src)
        print('page counts updated from the PDFs:\n  ' + '\n  '.join(changed))
        print('Note: the UPSC self-test in src/modules/43-upsc.js and PAGES in tests/upsc.mjs list the counts too.')
    return changed


# ── 3 · the selection of preview pages ─────────────────────────────────────
def load_selection(paths):
    sel = json.load(open(paths.sel, encoding='utf-8'))
    return {k: v for k, v in sel.items() if not k.startswith('_')}


def check_selection(cat, sel):
    errors, warnings = [], []
    ids = {v['id']: v for v in cat['volumes']}
    for k in sel:
        if k not in ids:
            errors.append(f'{k}: not a volume in the catalogue')
    for v in cat['volumes']:
        pages = sel.get(v['id'], [])
        if not pages:
            errors.append(f"{v['id']}: no preview pages chosen")
            continue
        seen = set()
        for s in pages:
            p, kind = s.get('p'), s.get('kind')
            if not isinstance(p, int) or not 2 <= p <= v['pages']:
                errors.append(f"{v['id']}: page {p} is outside 2 to {v['pages']} (page 1 is the cover, shown separately)")
            if p in seen:
                errors.append(f"{v['id']}: page {p} is chosen twice")
            seen.add(p)
            if kind not in KINDS:
                errors.append(f"{v['id']}: page {p} has kind '{kind}'; use one of {', '.join(KINDS)}")
            if not (s.get('cap') or '').strip():
                errors.append(f"{v['id']}: page {p} has no caption")
        if not any(s.get('kind') == 'contents' for s in pages):
            warnings.append(f"{v['id']}: no contents page among the previews")
        if not MIN_PAGES <= len(pages) <= MAX_PAGES:
            warnings.append(f"{v['id']}: {len(pages)} preview page(s); the brief asks for {MIN_PAGES} to {MAX_PAGES} (about 8)")
    return errors, warnings


def page_name(p, small=False):
    return f'page-{p:02d}' + ('-sm' if small else '') + '.webp'


# ── 4 · render ──────────────────────────────────────────────────────────────
def render(pdf, page, width):
    from PIL import Image
    with tempfile.TemporaryDirectory() as d:
        base = os.path.join(d, 'p')
        subprocess.run(['pdftoppm', '-f', str(page), '-l', str(page), '-scale-to-x', str(width), '-scale-to-y', '-1',
                        '-png', '-singlefile', pdf, base], check=True, capture_output=True)
        im = Image.open(base + '.png')
        im.load()
    return im.convert('RGB')


def shrink(im, width):
    from PIL import Image
    return im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)


def save_webp(im, path, quality):
    """Write only when the bytes change, so an unchanged page leaves git untouched."""
    buf = io.BytesIO()
    im.save(buf, 'WEBP', quality=quality, method=6)
    data = buf.getvalue()
    if not (os.path.exists(path) and open(path, 'rb').read() == data):
        open(path, 'wb').write(data)
    return len(data)


def build_previews(paths, cat, sel, found, opts, only):
    done = []
    for v in cat['volumes']:
        if only and v['id'] not in only:
            continue
        if v['n'] not in found:
            print(f"skip Volume {v['n']}: no PDF")
            continue
        pdf = found[v['n']]['path']
        d = os.path.join(paths.out, v['id'])
        os.makedirs(d, exist_ok=True)
        keep = {'cover.webp', 'cover-sm.webp'}
        cover = render(pdf, 1, opts.cover)
        save_webp(cover, os.path.join(d, 'cover.webp'), opts.quality)
        save_webp(shrink(cover, opts.thumb), os.path.join(d, 'cover-sm.webp'), opts.quality)
        for s in sel[v['id']]:
            im = render(pdf, s['p'], opts.width)
            save_webp(im, os.path.join(d, page_name(s['p'])), opts.quality)
            save_webp(shrink(im, opts.thumb), os.path.join(d, page_name(s['p'], True)), opts.quality)
            keep |= {page_name(s['p']), page_name(s['p'], True)}
        for old in os.listdir(d):
            if old not in keep:
                os.remove(os.path.join(d, old))
                print(f'  removed stale {v["id"]}/{old}')
        done.append(v['id'])
        print(f"rendered Volume {v['n']}: cover and {len(sel[v['id']])} pages")
    return done


def prune_unknown(paths, cat):
    """Folders for volumes the catalogue no longer has are removed with their images."""
    ids = {v['id'] for v in cat['volumes']}
    if os.path.isdir(paths.out):
        for name in os.listdir(paths.out):
            if name not in ids and os.path.isdir(os.path.join(paths.out, name)):
                shutil.rmtree(os.path.join(paths.out, name))
                print('removed unknown folder', name)


def weight(paths, budget_mb):
    total, per = 0, {}
    for f in glob.glob(os.path.join(paths.out, '*', '*')):
        b = os.path.getsize(f)
        total += b
        per.setdefault(os.path.basename(os.path.dirname(f)), [0, 0])
        per[os.path.basename(os.path.dirname(f))][0] += 1
        per[os.path.basename(os.path.dirname(f))][1] += b
    for k in sorted(per, key=lambda x: ROMAN.index(x.split('-')[1].upper()) if x.split('-')[1].upper() in ROMAN else 99):
        print(f'  {k:12s} {per[k][0]:3d} files  {per[k][1] / 1e6:6.2f} MB')
    print(f'preview images in all: {sum(n for n, _ in per.values())} files, {total / 1e6:.2f} MB (budget {budget_mb} MB)')
    if total > budget_mb * 1e6:
        print(f'WARNING: over the {budget_mb} MB budget. Re-run with --quality 70 or --width 1400, or choose fewer pages.')
    return total


# ── 5 · the data module ─────────────────────────────────────────────────────
def img_rec(paths, vid, name):
    from PIL import Image
    p = os.path.join(paths.out, vid, name)
    if not os.path.exists(p):
        return None
    with Image.open(p) as im:
        w, h = im.size
    return {'src': f'assets/upsc/handbooks/{vid}/{name}', 'w': w, 'h': h}


def with_small(paths, vid, name, small):
    r = img_rec(paths, vid, name)
    if r:
        sm = img_rec(paths, vid, small)
        if sm:
            r['sm'] = sm
    return r


def write_module(paths, cat, sel):
    vols, problems = [], []
    for v in cat['volumes']:
        img, pv = {}, []
        cover = with_small(paths, v['id'], 'cover.webp', 'cover-sm.webp')
        if cover:
            img['cover'] = cover
        else:
            problems.append(f"{v['id']}: no cover image")
        for s in sel.get(v['id'], []):
            r = with_small(paths, v['id'], page_name(s['p']), page_name(s['p'], True))
            if not r:
                problems.append(f"{v['id']}: page {s['p']} is chosen but has no image (run with --src)")
                continue
            pv.append(dict({'p': s['p'], 'kind': s['kind'], 'cap': s['cap']}, **r))
            img[f"p{s['p']}"] = {k: r[k] for k in ('src', 'w', 'h')}
        if pv:
            c = next((x for x in pv if x['kind'] == 'contents'), pv[0])
            img['contents'] = {k: c[k] for k in ('src', 'w', 'h')}
        # 'samples' and 'img' keep the shape the UPSC section's own pages and self-tests read
        samples = [{'p': x['p'], 'cap': x['cap']} for x in pv if x is not (next((y for y in pv if y['kind'] == 'contents'), None))]
        rec = {k: val for k, val in v.items()}
        rec.update(img=img, pv=pv, samples=samples)
        vols.append(rec)
    data = {k: cat[k] for k in ('price', 'series', 'seriesName', 'format') if k in cat}
    data['volumes'] = vols
    body = json.dumps(data, ensure_ascii=False, separators=(',', ':'))
    js = ('/* GENERATED by tools/upsc/build_upsc.py from content/upsc/handbooks.json and\n'
          '   tools/upsc/preview-pages.json. Do not edit by hand.\n'
          '   The Economics Handbook Library: the catalogue, and for each volume its cover and the\n'
          '   preview pages (pv) chosen from the volume itself. No handbook PDF is referenced here\n'
          '   or stored in the repository. */\n'
          'const UPSC_HB=' + body + ';\n')
    if '</script' in js.lower() or re.search(r'\.pdf\b', body, re.I):
        sys.exit('the catalogue may not contain </script or a PDF file name')
    old = open(paths.mod, encoding='utf-8').read() if os.path.exists(paths.mod) else ''
    if old != js:
        open(paths.mod, 'w', encoding='utf-8').write(js)
    print('module', os.path.relpath(paths.mod, paths.root), len(js), 'bytes;', sum(len(v['pv']) for v in vols), 'preview pages')
    for p in problems:
        print('  note:', p)
    return problems


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__.split('\n\n')[0])
    ap.add_argument('--src', help='private folder outside the repository that holds the handbook PDFs')
    ap.add_argument('--check', action='store_true', help='verify the PDFs against the catalogue and stop')
    ap.add_argument('--accept-counts', action='store_true', help='take page counts from the PDFs into handbooks.json')
    ap.add_argument('--force-title', action='store_true', help='render a volume even if its title differs (the title is never changed)')
    ap.add_argument('--data-only', action='store_true', help='only rewrite the data module')
    ap.add_argument('--only', default='', help='comma-separated volume ids to render, e.g. volume-iii,volume-iv')
    ap.add_argument('--width', type=int, default=1600)
    ap.add_argument('--thumb', type=int, default=400)
    ap.add_argument('--cover', type=int, default=800)
    ap.add_argument('--quality', type=int, default=78)
    ap.add_argument('--budget-mb', type=float, default=20)
    ap.add_argument('--report', help='also write the check as Markdown to this file (outside the repository)')
    ap.add_argument('--root', default=REPO, help=argparse.SUPPRESS)
    a = ap.parse_args(argv)
    paths = Paths(a.root)
    cat = json.load(open(paths.cat, encoding='utf-8'))
    sel = load_selection(paths)
    errors, warnings = check_selection(cat, sel)
    for w in warnings:
        print('selection:', w)
    if errors:
        sys.exit('preview-pages.json:\n  ' + '\n  '.join(errors))

    if a.data_only or not a.src:
        if a.check or a.accept_counts:
            sys.exit('--check and --accept-counts need --src')
        write_module(paths, cat, sel)
        weight(paths, a.budget_mb)
        return 0

    src = os.path.abspath(a.src)
    for r in {REPO, paths.root}:
        if inside(src, r):
            sys.exit('the PDFs must stay outside the repository: ' + src)
    if a.report and any(inside(a.report, r) for r in {REPO, paths.root}):
        sys.exit('write the report outside the repository')
    require('pdfinfo', 'pdftoppm', 'pdftotext')
    found, problems = find_volumes(src)
    rows = verify(cat, found)
    print_report(rows, problems, a.report)
    if a.check:
        return 0 if all(r['found'] and not r['notes'] for r in rows) and not problems else 1
    if a.accept_counts and accept_counts(paths, rows):
        cat = json.load(open(paths.cat, encoding='utf-8'))
        errors, _ = check_selection(cat, sel)
        if errors:
            sys.exit('preview-pages.json no longer fits the new page counts:\n  ' + '\n  '.join(errors))
        rows = verify(cat, found)
    blocked = {r['n'] for r in rows if r['found'] and (r['pages_pdf'] != r['pages'] or (not r['title_ok'] and not a.force_title))}
    if blocked:
        print('Not rendered until resolved (titles are never renamed; counts change only with --accept-counts): Volume '
              + ', '.join(sorted(blocked, key=ROMAN.index)))
    usable = {n: f for n, f in found.items() if n not in blocked}
    only = {x.strip() for x in a.only.split(',') if x.strip()}
    prune_unknown(paths, cat)
    build_previews(paths, cat, sel, usable, a, only)
    write_module(paths, cat, sel)
    weight(paths, a.budget_mb)
    missing = [r['n'] for r in rows if not r['found']]
    if missing or blocked:
        print('Incomplete: ' + ('missing Volume ' + ', '.join(missing) + '. ' if missing else '') +
              ('blocked Volume ' + ', '.join(sorted(blocked, key=ROMAN.index)) + '.' if blocked else ''))
        return 1
    print('Done. Now run: python3 tools/build/splice.py')
    return 0


if __name__ == '__main__':
    sys.exit(main())
