"""Build assets/data/events.js (full stories, lazy-loaded) and src/modules/29-events-index.js (resident index).
Sources: src/content/events/events-*.json, with review patches from src/content/events/rt-events.json applied as
exact, addressed substring replacements (a patch whose old text is not found exactly once is reported, never guessed).
Validates every subtopic code, diagram key, glossary term, case id, economist id, pathway id, compare id, chart series
and chart period against the platform and assets/data/history.js."""
import json, os, re, glob, hashlib
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
C = os.path.join(ROOT, 'src', 'content', 'events')
EV = []
for f in sorted(glob.glob(os.path.join(C, 'events-*.json'))): EV += json.load(open(f, encoding='utf-8'))
ORDER = ['great-depression', 'bretton-woods-1971', 'oil-1973', 'stagflation-1970s', 'oil-1979', 'plaza-1985', 'india-1991', 'asia-1997', 'dotcom-2000', 'gfc-2008', 'eurozone-2010', 'covid-2020']
# chronological by start date (the archive axis and the self-test both read it this way)
EV.sort(key=lambda e: (e['start'], ORDER.index(e['id']) if e['id'] in ORDER else 99))
byid = {e['id']: e for e in EV}
log = {'applied': 0, 'removed': 0, 'skipped': []}
rt = os.path.join(C, 'rt-events.json')
if os.path.exists(rt):
    for p in json.load(open(rt, encoding='utf-8')):
        try:
            cur = byid[p['event']]
            for k in p['path'][:-1]: cur = cur[k]
            key = p['path'][-1]
        except Exception: log['skipped'].append(('path', p.get('event'), p.get('path'))); continue
        if 'remove' in p:
            if isinstance(cur[key], list) and p['remove'] in cur[key]: cur[key].remove(p['remove']); log['removed'] += 1
            else: log['skipped'].append(('remove', p['event'], p['path'], str(p['remove'])[:40]))
            continue
        s = cur[key]
        if not isinstance(s, str) or s.count(p['old']) != 1: log['skipped'].append(('old', p['event'], p['path'], p['old'][:60])); continue
        cur[key] = s.replace(p['old'], p['new']); log['applied'] += 1
refs = json.load(open(os.path.join(ROOT, 'src', 'content', 'ideas', 'refs.json'), encoding='utf-8'))
subs = {s['code'] for s in refs['subtopics']}; dgs = {d['key'] for d in refs['diagrams']}; cases = {c['id'] for c in refs['cases']}; terms = set(refs['gloss']); kcs = set(refs['concepts'])
ideas = open(os.path.join(ROOT, 'assets', 'data', 'ideas.js'), encoding='utf-8').read(); I = json.loads(ideas[ideas.index('=') + 1:ideas.rindex(';')])
econ = {e['id'] for e in I['economists']}; causal = {c['id'] for c in I['causal']}
hs = open(os.path.join(ROOT, 'assets', 'data', 'history.js'), encoding='utf-8').read(); HS = json.loads(hs[hs.index('=') + 1:hs.rindex(';')])
ser = {s['id']: s for s in HS['series']}
ST = {'fact', 'interpretation', 'inference', 'controversy'}
err = []
def chk(e, cond, msg):
    if not cond: err.append(f"{e['id']}: {msg}")
for e in EV:
    for c in e['ib']['subs']: chk(e, c in subs, 'sub ' + c)
    for k in e['ib']['kc']: chk(e, k in kcs, 'kc ' + k)
    for d in e['diagrams']: chk(e, d['dg'] in dgs, 'dg ' + d['dg'])
    for t in e['concepts']: chk(e, t in terms, 'term ' + t)
    for c in e['cases']: chk(e, c in cases, 'case ' + c)
    for x in e['economists']: chk(e, x in econ, 'economist ' + x)
    for x in e['causal']: chk(e, x in causal, 'causal ' + x)
    for x in e['compare']: chk(e, x['id'] in ORDER and x['id'] != e['id'], 'compare ' + x['id'])
    chk(e, 0 <= e['predict']['answer'] < len(e['predict']['options']), 'predict answer'); chk(e, 0 <= e['whatif']['best'] < len(e['whatif']['options']), 'whatif best')
    for c in e['charts']:
        if 'series' in c:
            s = ser.get(c['series']); chk(e, s is not None, 'series ' + c['series'])
            if s: chk(e, any(str(c['from']) <= str(p[0]) and str(p[0])[:len(str(c['to']))] <= str(c['to']) for p in s['data']), f"no data in range {c['series']} {c['from']}–{c['to']}")
        else:
            p = HS['panel'].get(c.get('panel')); chk(e, p is not None, 'panel ' + str(c.get('panel')))
            if p: [chk(e, x in p['data'], 'panel entity ' + x) for x in c.get('entities', [])]
    def walk(o):
        if isinstance(o, dict):
            if 'status' in o: chk(e, o['status'] in ST, 'status ' + str(o['status']))
            for v in o.values(): walk(v)
        elif isinstance(o, list): [walk(v) for v in o]
    walk(e)
ABS = re.compile(r"\b(always|guarantee[sd]?|inevitabl[ey]|invariably|proves?|automatically|certainly|definitely|crucial|vital|delve|journey|landscape|tapestry)\b", re.I)
def strings(o):
    if isinstance(o, str): yield o
    elif isinstance(o, dict):
        for v in o.values(): yield from strings(v)
    elif isinstance(o, list):
        for v in o: yield from strings(v)
absn = sorted({m.group(0).lower() for e in EV for s in strings({k: v for k, v in e.items() if k not in ('numbers', 'reading')}) for m in [ABS.search(s)] if m})
body = {'version': 'events-2026.10.1', 'events': EV}
raw = json.dumps(body, ensure_ascii=False, separators=(',', ':')); body['hash'] = hashlib.sha256(raw.encode()).hexdigest()[:16]
raw = json.dumps(body, ensure_ascii=False, separators=(',', ':'))
open(os.path.join(ROOT, 'assets', 'data', 'events.js'), 'w', encoding='utf-8').write('/* The Economic Events archive. Generated by tools/build/build_events.py; do not edit by hand. */\nwindow.__EVENTS__=' + raw + ';\n')
SHORT = {'great-depression': 'Great Depression', 'bretton-woods-1971': 'End of Bretton Woods', 'oil-1973': 'Oil shock', 'stagflation-1970s': 'Stagflation', 'oil-1979': 'Second oil shock',
         'plaza-1985': 'Plaza Accord', 'india-1991': 'India 1991', 'asia-1997': 'Asian crisis', 'dotcom-2000': 'Dot-com', 'gfc-2008': 'Global financial crisis', 'eurozone-2010': 'Euro crisis', 'covid-2020': 'COVID-19'}
idx = {'version': body['version'], 'hash': body['hash'], 'events': [dict(id=e['id'], title=e['title'], short=SHORT.get(e['id'], e['title']), years=e['years'], start=e['start'], end=e['end'],
        region=e['region'], kind=e['kind'], standfirst=e['standfirst'], question=e['question'], subs=e['ib']['subs'], kc=e['ib']['kc'], economists=e['economists'], tags=e.get('policies', [])[:4]) for e in EV]}
open(os.path.join(ROOT, 'src', 'modules', '29-events-index.js'), 'w', encoding='utf-8').write('/* Generated by tools/build/build_events.py: the resident index for the lazy-loaded events file. */\nconst EVENTSIDX=' + json.dumps(idx, ensure_ascii=False, separators=(',', ':')) + ';\n')
print(json.dumps({'bytes': len(raw), 'events': len(EV), 'ids': [e['id'] for e in EV], 'patches': log, 'errors': err, 'absolutes': absn}, ensure_ascii=False, indent=1))
