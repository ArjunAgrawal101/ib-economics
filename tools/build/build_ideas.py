"""Build assets/data/ideas.js (full content, lazy-loaded) and src/modules/25-ideas-index.js (resident index).
Sources: src/content/ideas/economists.json, causal.json and the red-team patches rt-t6.json.
Applies red-team patches from rt-t6.json: exact, addressed substring replacements; a patch whose old text
is not found exactly once is reported and skipped, never guessed."""
import json, os, re, hashlib
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
T = os.path.join(ROOT, 'src', 'content', 'ideas')
files = {'economists.json': json.load(open(f'{T}/economists.json', encoding='utf-8')), 'causal.json': json.load(open(f'{T}/causal.json', encoding='utf-8'))}
log = {'applied': 0, 'removed': 0, 'skipped': []}
rt = f'{T}/rt-t6.json'
if os.path.exists(rt):
    for p in json.load(open(rt, encoding='utf-8')):
        root = files.get(p['file'])
        try:
            cur = root
            for k in p['path'][:-1]: cur = cur[k]
            key = p['path'][-1]
        except Exception: log['skipped'].append(('path', p.get('path'))); continue
        if 'remove' in p:
            if isinstance(cur[key], list) and p['remove'] in cur[key]: cur[key].remove(p['remove']); log['removed'] += 1
            else: log['skipped'].append(('remove', p['path'], p['remove']))
            continue
        s = cur[key]
        if not isinstance(s, str) or s.count(p['old']) != 1: log['skipped'].append(('old', p['path'], p['old'][:60])); continue
        cur[key] = s.replace(p['old'], p['new']); log['applied'] += 1
E, C = files['economists.json'], files['causal.json']
# optional: a snapshot of the platform's ids (subtopics, diagrams, cases, glossary) for build-time checks;
# the same checks run in the page's self-test (Ideas · every subtopic, key concept and diagram … exists)
rp = f'{T}/refs.json'
refs = json.load(open(rp, encoding='utf-8')) if os.path.exists(rp) else {'subtopics': [], 'diagrams': [], 'cases': [], 'gloss': [], 'concepts': []}
if not os.path.exists(rp): print('note: refs.json absent, id checks left to the self-test')
subs = {s['code'] for s in refs['subtopics']}; dgs = {d['key'] for d in refs['diagrams']}; cases = {c['id'] for c in refs['cases']}
kcs = set(refs['concepts']); terms = set(refs['gloss'])
err = []
for e in (E if refs['subtopics'] else []):
    for f in ['subs']: err += [f"{e['id']} sub {x}" for x in e[f] if x not in subs]
    err += [f"{e['id']} dg {x}" for x in e['dg'] if x not in dgs] + [f"{e['id']} kc {x}" for x in e['kc'] if x not in kcs] + [f"{e['id']} term {x}" for x in e['terms'] if x not in terms]
for c in (C if refs['subtopics'] else []):
    err += [f"{c['id']} sub {x}" for x in c['subs'] if x not in subs] + [f"{c['id']} case {x}" for x in c['cases'] if x not in cases]
    err += [f"{c['id']} dg {x}" for x in [c['dg'], c.get('dg2')] if x and x not in dgs]
ABS = re.compile(r"\b(always|guarantee[sd]?|inevitabl[ey]|invariably|proves?|automatically|certainly|definitely|crucial|vital|delve|journey|landscape)\b", re.I)
def strings(o):
    if isinstance(o, str): yield o
    elif isinstance(o, dict):
        for v in o.values(): yield from strings(v)
    elif isinstance(o, list):
        for v in o: yield from strings(v)
absn = [m.group(0) for s in strings([E, C]) for m in [ABS.search(s)] if m]
# ── the editorial layer (schools, central questions, idea chains, relations, comparisons) and its review patches
V2 = None; v2log = {'applied': 0, 'removed': 0, 'skipped': []}
vp = f'{T}/economists-v2.json'
if os.path.exists(vp):
    V2 = json.load(open(vp, encoding='utf-8'))
    rv = f'{T}/rt-v2.json'
    if os.path.exists(rv):
        for q in json.load(open(rv, encoding='utf-8')):
            try:
                cur = V2
                for k in q['path'][:-1]: cur = cur[k]
                key = q['path'][-1]
                if 'removeIndex' in q:
                    del cur[key][q['removeIndex']]; v2log['removed'] += 1; continue
                t = cur[key]
                if not isinstance(t, str) or t.count(q['old']) != 1: v2log['skipped'].append((q['path'], q['old'][:50])); continue
                cur[key] = t.replace(q['old'], q['new']); v2log['applied'] += 1
            except Exception as x: v2log['skipped'].append((q.get('path'), str(x)))
    ids = {e['id'] for e in E}; schools = {x['id'] for x in V2['schools']}
    for i, x in V2['economists'].items():
        if i not in ids: err.append(f'v2 unknown economist {i}')
        if x['school'] not in schools: err.append(f'v2 {i} school {x["school"]}')
        works = {(w['t'], w['y']) for w in next(e for e in E if e['id'] == i)['works']}
        if (x['majorWork']['t'], x['majorWork']['y']) not in works: err.append(f'v2 {i} majorWork not in works')
        if not 4 <= len(x['chain']) <= 6: err.append(f'v2 {i} chain length')
        for r in x.get('builtOn', []) + x.get('challenged', []):
            if r['id'] not in ids: err.append(f'v2 {i} relation {r["id"]}')
    missing = ids - set(V2['economists']); err += [f'v2 missing {m}' for m in missing]
    for c in V2['compare']:
        if c['a'] not in ids or (c['b'] and c['b'] not in ids): err.append(f'v2 compare {c["id"]}')
        if any(len(v) != 2 for v in c['rows'].values()): err.append(f'v2 compare rows {c["id"]}')
    absn_v2 = [m.group(0) for s2 in strings(V2) for m in [ABS.search(s2)] if m]
    if absn_v2: err.append('v2 absolutes: ' + ', '.join(absn_v2[:6]))
body = {'version': 'ideas-2026.10.2', 'economists': E, 'causal': C, 'v2': V2}
raw = json.dumps(body, ensure_ascii=False, separators=(',', ':'))
body['hash'] = hashlib.sha256(raw.encode()).hexdigest()[:16]
raw = json.dumps(body, ensure_ascii=False, separators=(',', ':'))
open(os.path.join(ROOT, 'assets', 'data', 'ideas.js'), 'w', encoding='utf-8').write('/* Economists and ideas; Why did this happen? Generated; do not edit by hand. */\nwindow.__IDEAS__=' + raw + ';\n')
yr = lambda life: [int(x) for x in re.findall(r'\d{4}', life)]
idx = {'version': body['version'], 'hash': body['hash'],
       'economists': [dict(id=e['id'], name=e['name'], life=e['life'], years=yr(e['life']), era=e['era'], headline=e['headline'], subs=e['subs'], kc=e['kc'],
           **({'school': V2['economists'][e['id']]['school'], 'work': V2['economists'][e['id']]['majorWork'], 'core': V2['economists'][e['id']]['core'],
               'chain': V2['economists'][e['id']]['chain'], 'rel': [[r['id'], 'b'] for r in V2['economists'][e['id']].get('builtOn', [])] + [[r['id'], 'c'] for r in V2['economists'][e['id']].get('challenged', [])]} if V2 else {})) for e in E],
       'schools': V2['schools'] if V2 else [], 'compare': [dict(id=c['id'], a=c['a'], b=c['b'], bLabel=c.get('bLabel'), title=c['title']) for c in V2['compare']] if V2 else [],
       'causal': [dict(id=c['id'], q=c['q'], unit=c['unit'], subs=c['subs'], kc=c['kc'], dg=c['dg'], hl=c.get('hl')) for c in C]}
open(os.path.join(ROOT, 'src', 'modules', '25-ideas-index.js'), 'w', encoding='utf-8').write('/* Generated by t6/build_ideas.py: the resident index for the lazy-loaded ideas file. */\nconst IDEASIDX=' + json.dumps(idx, ensure_ascii=False, separators=(',', ':')) + ';\n')
print(json.dumps({'bytes': len(raw), 'economists': len(E), 'causal': len(C), 'patches': log, 'v2patches': v2log, 'errors': err, 'absolutes': absn}, ensure_ascii=False, indent=1))
