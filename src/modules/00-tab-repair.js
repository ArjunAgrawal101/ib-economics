/* ═══════════════════════════════════════════════════════════════════════════
   TAB REPAIR · every tab opens the page its label names
   The V8 dispatcher (tabDispatch) maps tab numbers to renderers, but two of the
   views it captured had already been replaced by versions that ignore the tab
   (Teacher → Class intelligence, IA → Supervisor gates), and the Practise map
   was written for a tab list that later lost three tabs. The result: Practise
   tabs opened their neighbour, Teacher tabs 1–6 all opened Class intelligence,
   two IA tabs opened Supervisor gates and Revision priority opened the study
   plan. This layer routes those tabs by LABEL, so a later change to the tab
   list can no longer shift them. It runs first among the modules, so the
   layers added after it (the IA studio header, the ten-minute revision view,
   academic integrity) still wrap it.
   ═══════════════════════════════════════════════════════════════════════════ */
function tabLabel(v){const s=SECTIONS.find(x=>x.v===v);return s&&s.tabs?s.tabs[TAB]:null}
function labelRoute(v,map){const prev=VIEWS[v];if(!prev)return;
 VIEWS[v]=function(){const f=map[tabLabel(v)];return f?f():prev.apply(this,arguments)}}
const TABFIX={
 practise:{"Economist's Gym":()=>gym(),"Retrieval":()=>retrievalQ(),"Ten-minute revision":()=>revisionRun(),
  "Thinking drills":()=>drills(),"Transfer tasks":()=>transferTasks(),"Teach it back":()=>teachBack(),
  "The data lab":()=>dataLab(),"Data trap lab":()=>dataTraps(),"Writing lab":()=>writingLab()},
 teacher:{"Class dashboard":()=>V7VIEWS.teacher(),"IA checklist":()=>iaTeacher(),"Lesson planner":()=>lessonPlanner(),
  "Retrieval starter":()=>retrievalStarter(),"Exam builder":()=>examBuilder(),"Marking sheets":()=>markingSheets()},
 ia:{"Student checklist":()=>iaStudent(),"Portfolio tracker":()=>iaPortfolio()},
 workspace:{"Revision priority":()=>H.pageHead("My workspace","Revision priority",
   "What to work on next, and why. The order comes from your own record and from how much assessed machinery each subtopic carries.")
   +`<section class="sec"><div class="wrap">${revisionPriority()}</div></section>`}};
/* three finished Practise tools that no tab, menu or search result reached */
(function(){const s=SECTIONS.find(x=>x.v==="practise");if(s&&s.tabs)["The data lab","Data trap lab","Writing lab"].forEach(t=>{if(!s.tabs.includes(t))s.tabs.push(t)})})();
Object.entries(TABFIX).forEach(([v,m])=>labelRoute(v,m));

/* a calculation's own address (#/calculate/0/ped) and its search result open
   that calculation, not the board's index */
let CBARG=null;
(function(){const prev=VIEWS.calculate;if(!prev)return;
 VIEWS.calculate=function(){
  if(ARG&&ARG!==CBARG&&typeof CMAPC!=="undefined"&&CMAPC[ARG]){CBARG=ARG;const c=CMAPC[ARG];CB={id:ARG,v:Object.fromEntries(c.inp.map(([k])=>[k,""])),res:null,pq:null,ans:"",chk:null,show:false}}
  else if(!CB.id&&ARG&&ARG===CBARG){ARG=null;CBARG=null}
  if(CB.id&&ARG!==CB.id&&VIEW==="calculate")ARG=CB.id;
  return prev.apply(this,arguments)}})();

/* a simulator run started from search or a link opens on the simulator tab */
(function(){if(typeof simStart!=="function")return;const prev=simStart;
 simStart=function(k){const s=SECTIONS.find(x=>x.v==="papers"),i=s&&s.tabs?s.tabs.indexOf("Exam simulator"):-1;
  if(i>=0&&!(VIEW==="papers"&&TAB===i)&&!(typeof QARUNNING!=="undefined"&&QARUNNING)){VIEW="papers";TAB=i;ARG=null}
  return prev.apply(this,arguments)}})();

function TABSUITE(){const out=[];const T=(n,f)=>{let ok=false,det="";try{const r=f();ok=r===true||(r&&r.ok);if(r&&r.d)det=r.d}catch(e){det=e.message}out.push({n,ok:!!ok,detail:det})};
 const keep={VIEW,TAB,ARG},txt=h=>String(h).replace(/<[^>]+>/g," ").replace(/\s+/g," ");
 const open=(v,label)=>{const s=SECTIONS.find(x=>x.v===v);VIEW=v;TAB=s.tabs.indexOf(label);ARG=null;return txt(VIEWS[v]())};
 const want={practise:{"Economist's Gym":/Economist's Gym/,"Retrieval":/Retrieval queue/,"Ten-minute revision":/Ten-minute revision/,"Thinking drills":/Thinking drills/,"Transfer tasks":/Transfer tasks/,"Teach it back":/Teach it back/,"The data lab":/The data lab/,"Data trap lab":/data trap lab/i,"Writing lab":/writing lab/i},
  teacher:{"Class dashboard":/Class intelligence/,"Lesson planner":/Lesson planner|lesson plan/i,"Retrieval starter":/Retrieval starter|retrieval starter/i,"Exam builder":/Exam builder|exam builder/i,"Marking sheets":/Marking sheet|marking sheet/i},
  ia:{"Student checklist":/checklist/i,"Portfolio tracker":/Portfolio tracker|portfolio tracker/i},
  workspace:{"Revision priority":/Revision priority/}};
 Object.entries(want).forEach(([v,m])=>T(`Tabs · every ${v} tab opens the page its label names`,()=>{const bad=Object.entries(m).filter(([l,re])=>!re.test(open(v,l))).map(([l])=>l);return{ok:!bad.length,d:bad.join(", ")}}));
 T("Tabs · no two Teacher tabs from Class dashboard to Marking sheets open the same page",()=>{const hs=["Class dashboard","IA checklist","Lesson planner","Retrieval starter","Exam builder","Marking sheets"].map(l=>{const h=open("teacher",l).slice(0,400);return h});return new Set(hs).size===hs.length});
 T("Tabs · a calculation's own address opens that calculation",()=>{const k=Object.keys(CMAPC)[0],cb=CB;CB={id:null,v:{},res:null,pq:null,ans:"",chk:null,show:false};VIEW="calculate";TAB=0;ARG=k;const h=VIEWS.calculate();const ok=CB.id===k&&h.includes("Calculation Board");CB=cb;CBARG=null;return ok});
 VIEW=keep.VIEW;TAB=keep.TAB;ARG=keep.ARG;return out}
TABSUITE.suiteName="Tabs and addresses";
EXTRA_SUITES.push(TABSUITE);
QAREPORT.push({area:"Tabs and addresses",re:/^Tabs · /,
 what:"That every Practise, Teacher, IA and workspace tab opens the page its label names (they had drifted one slot, or all opened one page), that the three Practise tools no route reached now have tabs, and that a calculation's own address opens that calculation."});
/* worked-case search results open the Worked cases tab, found by its label */
(function(){if(typeof buildIndex!=="function")return;const prev=buildIndex;
 buildIndex=function(){const I=prev();const w=SECTIONS.find(x=>x.v==="world"),i=w&&w.tabs?w.tabs.indexOf("Worked cases"):-1;
  if(i>=0)I.forEach(r=>{if(r.k==="Case study"&&typeof r.go==="string")r.go=r.go.replace("nav('world',1)",`nav('world',${i})`)});return I}})();
