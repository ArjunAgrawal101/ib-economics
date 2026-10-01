"""2026-10-01 · edits to base code outside the module splice (idempotent; already applied to index.html).
The base of index.html is not yet split into modules; changes there are made by scripts like this one so
they are recorded and can be re-run. See docs/architecture-decision.md."""
import os
P=os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),'index.html'); s=open(P,encoding='utf-8').read()
def rep(a,b,n=1):
    global s
    if b in s and a not in s: return
    assert s.count(a)==n,(s.count(a),a[:80]); s=s.replace(a,b)
OLD='["course","learn","think","lab","world","practise","examiner","mind","everywhere","ees","arjun","master","ia","educator","about"'
NEW='["course","learn","lab","world","practise","examiner","mind","everywhere"'
# 1 · the single primary-order definition: eight items, the rest in the grouped More menu (brief §6, §59)
rep(' const ORDER='+OLD+',"tutorials"];\n SECTIONS.forEach(s=>{if(ORDER.includes(s.v))s.pri=1});',
    ' /* The transformation brief (§6, §59): the bar keeps the eight places most visits start from;\n    the rest are grouped in the More menu, the drawer, search and contextual links. */\n const ORDER='+NEW+',"tutorials"];\n SECTIONS.forEach(s=>{s.pri=ORDER.includes(s.v)?1:0});')
# 2 · the self-tests that pin the order follow the single definition
rep('const want='+OLD+'];',' const want='+NEW+'];'.lstrip(),2)
# 3 · the drawer's Explore group reaches the new data and ideas sections
rep('["tok","TOK × Economics"]]],\n ["Practise",','["tok","TOK × Economics"],["data","Economic data"],["ideas","Economists and ideas"]]],\n ["Practise",')
# 4 · Resources stays first in the More menu (the earlier decision), in the menu's new first group
rep('&&/\\[\\"Secondary destinations\\",\\[\\"resources\\"/.test(String(moreMenu))})());','&&/\\[\\"Learn and explore\\",\\[\\[\\"resources\\"/.test(String(moreMenu))})());')
# 5 · the studios leave the bar (brief §59) but stay registered, in the drawer and in the More menu
rep('T("Ecosystem · the three new sections are registered, on the bar and in the drawer",()=>["ees","arjun","educator"].every(v=>{const s=SECTIONS.find(x=>x.v===v);return s&&s.pri&&typeof VIEWS[v]==="function"&&MOBGROUPS.some(([,it])=>it.some(i=>i[0]===v))}));',
    'T("Ecosystem · the three studios are registered, in the drawer and in the More menu",()=>["ees","arjun","educator"].every(v=>{const s=SECTIONS.find(x=>x.v===v);return s&&typeof VIEWS[v]==="function"&&MOBGROUPS.some(([,it])=>it.some(i=>i[0]===v))&&String(moreMenu).includes(\'"\'+v+\'"\')}));')
# 6 · when the header is tight, the IB course outranks the general-reader section; Real World and Mindmaps stay the last two given up
rep('const NAVKEEP={world:100,mind:96,everywhere:94,course:92,ees:90,practise:88,arjun:86,learn:84,examiner:80,\n lab:72,',
    'const NAVKEEP={world:100,mind:96,course:95,examiner:94,learn:93,practise:92,lab:91,everywhere:90,ees:89,arjun:86,\n ')
# 7 · structured data: what the site is, for whom, with no claim it cannot support (no URL until the domain is confirmed)
import json as _j
LD=_j.dumps({"@context":"https://schema.org","@type":"WebSite","name":"Arjun Agrawal · IB DP Economics","alternateName":"Think like an economist","inLanguage":"en-GB",
 "description":"An independent learning environment for IB Diploma Programme Economics and for anyone learning Economics: lessons, interactive labs, sourced economic data, causal reasoning, economists and ideas, and exam practice.",
 "isAccessibleForFree":True,"audience":[{"@type":"EducationalAudience","educationalRole":"student"},{"@type":"EducationalAudience","educationalRole":"teacher"}],
 "author":{"@type":"Person","name":"Arjun Agrawal"},"about":{"@type":"Thing","name":"Economics"}},ensure_ascii=False)
if 'application/ld+json' not in s:
    i=s.index('<meta name="twitter:description"'); j=s.index('>',i)+1
    s=s[:j]+'\n<script type="application/ld+json">'+LD+'</script>'+s[j:]
open(P,'w',encoding='utf-8').write(s); print('ok')
