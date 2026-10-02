/* ═══════════════════════════════════════════════════════════════════════════
   SELF-TESTS: the events archive and the pathways. The lazy story files are
   checked by tests/events.mjs in a browser; these check what is resident.
   ═══════════════════════════════════════════════════════════════════════════ */
function EVSUITE(){const out=[];const T=(n,f,d)=>{let ok=false,det=d||"";try{const r=f();ok=r===true||(r&&r.ok);if(r&&r.d)det=r.d}catch(e){ok=false;det=e.message}out.push({n,ok:!!ok,detail:det})};
 const keep={VIEW,TAB,ARG},txt=h=>String(h).replace(/<[^>]+>/g," ").replace(/\s+/g," ");
 const E=EVENTSIDX.events;
 T("Events · twelve events are indexed, in chronological order, each with a question and a standfirst",()=>E.length===12&&E.every((e,i)=>e.question&&e.standfirst&&(!i||evYear(e.start)>=evYear(E[i-1].start)-0.01)),"");
 T("Events · every date reads as a year (and month), and no event ends before it starts",()=>E.every(e=>/^\d{4}(-\d{2})?(-\d{2})?$/.test(e.start)&&/^\d{4}(-\d{2})?$/.test(String(e.end))&&evYear(e.end)>=evYear(e.start)));
 T("Events · every subtopic, key concept and economist an event names exists",()=>{const K=["Scarcity","Choice","Efficiency","Equity","Economic well-being","Sustainability","Change","Interdependence","Intervention"],bad=[];
   E.forEach(e=>{e.subs.forEach(c=>{if(!SUBMAP[c])bad.push(e.id+" "+c)});e.kc.forEach(k=>{if(!K.includes(k))bad.push(e.id+" "+k)});e.economists.forEach(x=>{if(!IDEASIDX.economists.some(y=>y.id===x))bad.push(e.id+" "+x)})});return{ok:!bad.length,d:bad.join(", ")}});
 T("Events · the archive draws every event on one axis and lists every one",()=>{VIEW="events";TAB=0;ARG=null;EVF.kind="";EVF.region="";const h=VIEWS.events();return E.every(e=>h.includes(`nav('events',0,'${e.id}')`))&&(h.match(/class="ev-ax-b/g)||[]).length===E.length});
 T("Events · the filters narrow the archive and say nothing is lost",()=>{VIEW="events";TAB=0;ARG=null;EVF.kind="crisis";const h=VIEWS.events();EVF.kind="";const n=E.filter(e=>e.kind==="crisis").length;return n>0&&(h.match(/class="ev-card/g)||[]).length===n});
 T("Events · an event page waits for its file instead of failing",()=>{VIEW="events";TAB=0;ARG="india-1991";const h=txt(VIEWS.events());ARG=null;return window.__EVENTS__?/The world before/i.test(h):/Loading this event|could not be loaded/.test(h)});
 T("Events · compare and the history timeline render, with every economist and event on the timeline",()=>{VIEW="events";TAB=1;ARG=null;const a=txt(VIEWS.events());TAB=2;const b=VIEWS.events();TAB=0;
   return /Compare two events/.test(a)&&IDEASIDX.economists.every(x=>b.includes(`nav('ideas',0,'${x.id}')`))&&E.every(x=>b.includes(`nav('events',0,'${x.id}')`))});
 T("Events · every fact-status badge has a label and an explanation",()=>["fact","interpretation","inference","controversy"].every(k=>EVSTATUS[k]&&EVSTATUS[k][0]&&EVSTATUS[k][1])&&/Controversy/.test(evBadge("controversy")));
 T("Events · charts can mark an event on the time axis",()=>{const h=dlChart("t-ev",[{name:"A",color:DLPAL[0],pts:[[1990,1],[1991,2],[1992,3]]}],{w:600,marks:[{at:1991,label:"Crisis"}]});delete DLCH["t-ev"];return /class="dl-mark"/.test(h)&&/>Crisis</.test(h)});
 T("Pathways · six pathways, and IB is the deepest",()=>PATHWAYS.length===6&&PATHWAYS[0].id==="ib"&&PATHWAYS[0].depth==="Deepest");
 T("Pathways · Cambridge and civil services make no syllabus claim until the official documents are checked",()=>["cambridge","civil"].every(id=>{const p=PATHWAYS.find(x=>x.id===id);return /awaiting the official/.test(p.status)&&!/\b9708\b|paper \d|component \d|prelims|mains/i.test(p.lead+p.status)}));
 T("Pathways · the Indian economy hub links only to cases that exist and to the 1991 event",()=>{const ids=INTHEMES.flatMap(t=>t[1]);const h=indiaHub();return ids.every(id=>RW_CASES.some(c=>c.id===id))&&h.includes("nav('events',0,'india-1991')")&&ids.length>=25});
 T("Pathways · choosing a path is kept and changes the home band's lead",()=>{const k=S.path;S.path="civil";const a=txt(rnPathsBand());S.path=k;return /Your path: Civil services/.test(a)});
 T("Navigation · the More menu and the drawer reach the events archive and the pathways",()=>{const src=String(moreMenu);return src.includes('"events"')&&src.includes('"paths"')&&MOBGROUPS.some(([,it])=>it.some(i=>i[0]==="events"))&&MOBGROUPS.some(([,it])=>it.some(i=>i[0]==="paths"))});
 T("Search · events and pathways are found by name",()=>{SIDX=null;const k=q=>cpMatch(q).map(x=>x.k);const r=k("1991 india").includes("Economic event")&&k("great depression").includes("Economic event")&&k("cambridge").includes("Pathway");SIDX=null;return r});
 VIEW=keep.VIEW;TAB=keep.TAB;ARG=keep.ARG;SIDX=null;return out}
EVSUITE.suiteName="Events and pathways";
EXTRA_SUITES.push(EVSUITE);
QAREPORT.push({area:"Events and pathways",re:/^(Events|Pathways) · /,
 what:"That twelve events are indexed in order with valid dates and links, that the archive, filters, compare room and history timeline render, that an event page waits for its file rather than failing, that charts mark events; and that the six pathways put IB first, make no Cambridge or civil-services syllabus claims before the official documents are checked, and link the Indian economy hub only to cases that exist."});
