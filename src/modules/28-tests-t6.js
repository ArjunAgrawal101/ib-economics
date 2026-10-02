/* ═══════════════════════════════════════════════════════════════════════════
   SELF-TESTS: the data lab, economists and ideas, Why did this happen?, the
   simplified navigation, search records and structured data. The lazy data
   files are checked by tests/transform.mjs in a browser; these check the parts
   resident in the page.
   ═══════════════════════════════════════════════════════════════════════════ */
function T6SUITE(){const out=[];const T=(n,f,d)=>{let ok=false,det=d||"";try{const r=f();ok=r===true||(r&&r.ok);if(r&&r.d)det=r.d}catch(e){ok=false;det=e.message}out.push({n,ok:!!ok,detail:det})};
 const keep={VIEW,TAB,ARG},txt=h=>String(h).replace(/<[^>]+>/g," ").replace(/\s+/g," ");
 const ABS=/\b(always|guarantees?|inevitabl\w*|invariably|in every case|without exception|proves?|automatically|certainly|definitely)\b/i;
 T("Data · the lab reads one file, loaded only when a data page opens",()=>/assets\/data\/econ-data\.js/.test(String(dlData))&&!document.querySelector('script[src="assets/data/econ-data.js"]')||!!window.__ECONDATA__);
 T("Data · every data page is useful before the file arrives, and says what it holds",()=>{if(window.__ECONDATA__)return true;const h=txt(dlLoading());return h.length>400&&/World Bank/.test(h)&&/Federal Reserve/.test(h)});
 T("Data · chart colours are the validated categorical order, assigned by economy rather than rank",()=>DLPAL.join()==="#2F6FB3,#C77A2A,#1F8C70,#7357B8,#B23A55"&&(()=>{const d={ents:["A","B"],slots:{A:0,B:2}};return dlFreeSlot(d)===1})());
 T("Data · numbers are formatted without false precision, and a missing value is a dash",()=>dlFmt(3549.9)==="3,550"&&dlFmt(8.0028)==="8.00"&&dlFmt(null)==="–"&&dlFmt(-0.36)==="-0.36");
 T("Data · a line breaks at a missing year rather than drawing through it",()=>{const h=dlChart("t6-test",[{name:"A",color:DLPAL[0],pts:[[2000,1],[2001,2],[2004,3],[2005,4]]}],{w:600,labels:false});delete DLCH["t6-test"];return (h.match(/<path d="M/g)||[]).length===2});
 T("Data · every chart has a text alternative and a table of its numbers",()=>{const s=[{name:"A",color:DLPAL[0],pts:[[2000,1],[2001,2]]}];const h=dlChart("t6-t2",s,{w:600,title:"T"});delete DLCH["t6-t2"];return /role="img" aria-label="T: A from/.test(h)&&/<table/.test(dlTable(s,"u"))});
 T("Ideas · sixteen economists and eleven causal pathways are indexed",()=>IDEASIDX.economists.length===16&&IDEASIDX.causal.length===11);
 T("Ideas · every subtopic, key concept and diagram the index names exists",()=>{const K=["Scarcity","Choice","Efficiency","Equity","Economic well-being","Sustainability","Change","Interdependence","Intervention"];
   const bad=[];IDEASIDX.economists.forEach(e=>{e.subs.forEach(c=>{if(!SUBMAP[c])bad.push(e.id+" "+c)});e.kc.forEach(k=>{if(!K.includes(k))bad.push(e.id+" "+k)})});
   IDEASIDX.causal.forEach(c=>{c.subs.forEach(s=>{if(!SUBMAP[s])bad.push(c.id+" "+s)});if(!DG[c.dg])bad.push(c.id+" dg "+c.dg);c.kc.forEach(k=>{if(!K.includes(k))bad.push(c.id+" "+k)})});return {ok:!bad.length,d:bad.join(", ")}});
 T("Ideas · lifespans read as years, and living economists have no end year",()=>IDEASIDX.economists.every(e=>e.years[0]>1700&&e.years[0]<1980&&(!e.years[1]||e.years[1]>e.years[0]))&&IDEASIDX.economists.filter(e=>e.years.length===1).length>=4);
 T("Ideas · the index makes no absolute claims in the platform's voice",()=>!IDEASIDX.economists.some(e=>ABS.test(e.headline))&&!IDEASIDX.causal.some(c=>ABS.test(c.q)));
 T("Ideas · the list and timeline render every economist, and a profile waits for its file rather than failing",()=>{VIEW="ideas";TAB=0;ARG=null;const a=txt(VIEWS.ideas());TAB=1;const b=VIEWS.ideas();TAB=0;ARG="keynes";const c=txt(VIEWS.ideas());
   return IDEASIDX.economists.every(e=>a.includes(e.name)&&b.includes(esc(e.name)))&&/Keynes/.test(c)&&(window.__IDEAS__?/The problem they faced/.test(c):/Loading this profile|could not be loaded/.test(c))});
 T("Why · the tab sits at the end of Think, so no older tab changes its address",()=>{const t=SECTIONS.find(s=>s.v==="think").tabs;return t[t.length-1]==="Why did this happen?"&&t.indexOf("Economist's toolkit")===6&&t.indexOf("Inquiry tools")===7});
 T("Why · the list offers all eleven questions and marks HL content",()=>{VIEW="think";TAB=WHYTAB();ARG=null;const h=txt(VIEWS.think());return IDEASIDX.causal.every(c=>h.includes(c.q))&&/includes HL/.test(h)});
 T("Navigation · the bar keeps eight items and the More menu reaches every section",()=>{const pri=SECTIONS.filter(s=>s.pri).map(s=>s.v);const src=String(moreMenu);
   return pri.length===8&&SECTIONS.every(s=>s.v==="home"||src.includes('"'+s.v+'"')||/rest=SECTIONS\.filter/.test(src))&&["data","ideas"].every(v=>src.includes('"'+v+'"'))});
 T("Navigation · the drawer reaches the data lab and the economists",()=>MOBGROUPS.some(([,it])=>it.some(i=>i[0]==="data"))&&MOBGROUPS.some(([,it])=>it.some(i=>i[0]==="ideas")));
 T("Search · economists, causal questions and data pages are found by name",()=>{SIDX=null;const k=q=>cpMatch(q).map(x=>x.k);const r=k("keynes").includes("Economist")&&k("why did inflation").includes("Why did this happen?")&&k("exchange rate data").includes("Data");SIDX=null;return r});
 T("Discoverability · the page carries structured data that claims no URL, endorsement or affiliation",()=>{const s=document.querySelector('script[type="application/ld+json"]');if(!s)return false;const j=JSON.parse(s.textContent);
   return j["@type"]==="WebSite"&&!j.url&&!/endors|official|approved|affiliat/i.test(s.textContent)});
 T("Home · the reason, evidence and ideas band links to the three new surfaces",()=>{const h=rnIdeasBand();return /nav\('think',WHYTAB\(\)/.test(h)&&/nav\('data',0\)/.test(h)&&/nav\('ideas',0/.test(h)});
 VIEW=keep.VIEW;TAB=keep.TAB;ARG=keep.ARG;SIDX=null;return out}
T6SUITE.suiteName="Data, ideas and reasoning";
EXTRA_SUITES.push(T6SUITE);
QAREPORT.push({area:"Data, ideas and reasoning",re:/^(Data|Ideas|Why|Search|Discoverability|Home) · /,
 what:"That the data lab loads its file only when needed and is useful before it arrives, draws with the validated palette, breaks lines at missing years and gives every chart a text alternative and a table; that the economists and causal pathways link only to subtopics, concepts and diagrams that exist; that the new Think tab moved no older address; that the bar keeps eight items while the More menu and drawer reach everything; and that search and structured data find the new surfaces without claiming a URL or an endorsement."});
