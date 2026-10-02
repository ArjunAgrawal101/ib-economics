"""2026-10-02 · the phone drawer reaches the Economic Events archive and the pathways (idempotent; applied to index.html)."""
import os
P = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), 'index.html')
s = open(P, encoding='utf-8').read()
a = '["data","Economic data"],["ideas","Economists and ideas"]]],'
b = '["events","Economic events"],["data","Economic data"],["ideas","Economists and ideas"],["paths","Pathways"]]],'
b0 = '["events","Economic events"],["data","Economic data"],["ideas","Economists and ideas"]]],'
if b not in s:
    if b0 in s: s = s.replace(b0, b)
    else:
        assert s.count(a) == 1; s = s.replace(a, b)
open(P, 'w', encoding='utf-8').write(s); print('ok')
