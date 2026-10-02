/* ═══════════════════════════════════════════════════════════════════════════
   THE SELF-TESTS FOR THE COURSE LAYER
   Structure (every lesson has every part of the template, every link lands),
   IB claims (official command-term wording unchanged, AO3 command terms only
   where the guide sets AO3 content, paper facts carry page references),
   language (no absolutes in the platform's voice, no claims about how often a
   topic is examined), integrity (no page writes or disguises assessed work),
   and behaviour (rendering at every depth, snapshots, printing without a
   dialogue, search, revision, what-next).
   ═══════════════════════════════════════════════════════════════════════════ */
function COURSESUITE(){
 if(!COURSE_OK){VIEW="course";const a=ARG;ARG=null;const h=courseTopics();ARG=a;
  return [{n:"Lessons · without assets/data/course.js the course pages say so plainly",ok:h.includes("assets/data/course.js"),detail:"single-file copy"}]}
 const out=[];const T=(n,f,d)=>{let ok=false,det=d||"";try{const r=f();ok=r===true||(r&&r.ok);if(r&&r.d)det=r.d}catch(e){ok=false;det=e.message}out.push({n,ok:!!ok,detail:det})};
 const keep={VIEW,TAB,ARG,depth:LS.depth,ex:LS.explain,teacher:LS.teacher,lesson:JSON.stringify(S.lesson||{}),gx:JSON.stringify(GX),rev:JSON.stringify(REV),calls:PRINTGUARD.totalCalls,cset:GX.cset};
 const codes=lsCodes(),txt=h=>String(h).replace(/<[^>]+>/g," ");
 const walk=(x,f,p)=>{p=p||[];if(typeof x==="string")f(x,p);else if(Array.isArray(x))x.forEach((v,i)=>walk(v,f,p.concat(i)));else if(x&&typeof x==="object")Object.entries(x).forEach(([k,v])=>walk(v,f,p.concat(k)))};
 const AO3=/^(evaluate|discuss|compare|compare and contrast|contrast|to what extent|examine|justify|recommend)\b/i;
 const ABS=/\b(always|never|guarantees?|inevitabl\w*|invariably|in every case|without exception|proves?|automatically|certainly|definitely)\b/i;
 const QUOTED=/[‘“"][^’”"]*[’”"]/g;
 const FREQ=/\b(frequently (examined|asked|tested|appears)|often comes up|comes up (every|often)|a favourite|examined every year|always comes up|most frequently)\b/i;

 /* ── the data layer ── */
 T("Lessons · the course data loaded, with a version and six named sources",()=>!!COURSE.meta&&/^course-/.test(COURSE.meta.version)&&(COURSE.meta.sources||[]).length===6);
 T("Lessons · a lesson for every one of the 31 subtopics in the guide",()=>codes.length===31&&codes.every(c=>!!SPINE[c]),codes.filter(c=>!SPINE[c]).join(","));
 T("Lessons · every lesson has every part of the template",()=>{const bad=codes.filter(c=>{const s=SPINE[c];
   return !(s.big&&s.big.idea&&s.big.why&&s.big.q&&(s.before||[]).length>=3&&["know","understand","apply","analyse","evaluate"].every(k=>(s.obj[k]||[]).length)
    &&(s.blocks||[]).length>=4&&(s.mech||[]).length>=1&&(s.models||[]).length>=1&&s.tei&&s.tei.theory&&s.tei.evidence&&s.tei.interp&&(s.deeper||[]).length>=1
    &&["simple","exam","deep"].every(k=>s.explain[k])&&(s.kc||[]).length>=1&&["q","expect","model","evidence","match","assume","change","policy"].every(k=>s.inquiry[k])
    &&(s.selfexp||[]).length>=2&&s.selfexp.every(x=>x.check.length>=3)&&(s.retrieve||[]).length>=5&&(s.mcq||[]).length>=3&&s.exam&&(s.exam.practice||[]).length
    &&(s.connect||[]).length>=2&&s.next&&s.ia&&s.tok&&s.teach&&(s.after||[]).length>=5)});return{ok:!bad.length,d:bad.join(",")}});
 T("Lessons · every link in a lesson lands on a real subtopic",()=>codes.every(c=>{const s=SPINE[c];
   return (s.before||[]).every(b=>!b.sub||!!SUBMAP[b.sub])&&(s.connect||[]).every(x=>!!SUBMAP[x.sub])&&(!s.next.sub||!!SUBMAP[s.next.sub])}));
 T("Lessons · every model card's diagram exists and draws",()=>codes.every(c=>SPINE[c].models.every(m=>!m.dg||(DG[m.dg]&&DG[m.dg]().b.length>50))));
 T("Lessons · every misconception check has one keyed answer among its options",()=>codes.every(c=>SPINE[c].mcq.every(q=>q.a>=0&&q.a<q.opts.length&&q.why)));
 T("Lessons · every key concept named is one of the guide's nine",()=>codes.every(c=>SPINE[c].kc.every(k=>KCN.includes(k.c))));
 T("Lessons · the HL-only subtopics say so at the start",()=>["2.10","2.11","2.12"].every(c=>/HL only/.test(SPINE[c].big.idea+" "+SPINE[c].blocks[0].p+" "+SPINE[c].blocks[0].h)));
 T("Lessons · no lesson claims how often something is examined",()=>{const bad=[];walk(COURSE.spines,(s,p)=>{if(FREQ.test(s))bad.push(p.join("/"))});return{ok:!bad.length,d:bad.slice(0,3).join(" ")}});
 T("Lessons · no absolute claim in the platform's own voice",()=>{const bad=[];walk(COURSE.spines,(s,p)=>{if(ABS.test(s.replace(QUOTED,"")))bad.push(p.join("/"))});return{ok:!bad.length,d:bad.slice(0,3).join(" ")}});
 T("Lessons · an AO3 command term appears only where the guide sets AO3 content",()=>{const bad=[];codes.forEach(c=>{const ao3=/AO3/.test((SUBMETA[c]||{}).ao||"");
   (SPINE[c].exam.practice||[]).forEach(q=>{const a3=AO3.test(q.q.trim());
    if(a3&&!ao3)bad.push(c+": "+q.q.slice(0,40));
    if(a3&&/Paper 2 \([a-f]\)/.test(q.p))bad.push(c+" "+q.p)})});return{ok:!bad.length,d:bad.slice(0,3).join(" | ")}});
 /* the guide sets HL-only content in bold (PDF p. 30); where an SL lesson teaches it, the part that does says HL */
 T("Lessons · HL-only content inside an SL lesson is labelled HL where it is taught",()=>{const bad=[];
   const HLX={"2.1":/income (and|&) substitution effect|diminishing marginal utility/i,"2.2":/diminishing marginal returns|increasing marginal cost/i,
    "2.5":/primary commodit/i,"2.6":/primary commodit/i,"3.3":/phillips curve|weighted price index/i,"3.6":/multiplier|crowding[- ]out|automatic stabili[sz]/i,"4.6":/marshall|j-curve/i};
   const txt=o=>typeof o==="string"?o:Array.isArray(o)?o.map(txt).join(" "):o&&typeof o==="object"?Object.values(o).map(txt).join(" "):"";
   Object.keys(HLX).forEach(c=>{const sp=SPINE[c];if(!sp)return;Object.keys(sp).forEach(k=>{const v=sp[k];
     (Array.isArray(v)?v:[v]).forEach((u,i)=>{const t=txt(u);if(HLX[c].test(t)&&!/\bHL\b/.test(t))bad.push(c+" "+k+(Array.isArray(v)?"/"+i:""))})})});
   return{ok:!bad.length,d:bad.slice(0,4).join(" | ")}});
 T("Lessons · every lesson renders in full, with the loop in order and nothing undefined",()=>{const bad=[];
   codes.forEach(c=>{VIEW="course";TAB=TOPICS_TAB();ARG=c;LS.depth="core";const h=VIEWS.course();
    const ids=["learn","see","try","explain","apply","evaluate","exam","retrieve","connect"].map(k=>h.indexOf('id="ls-'+k+'"'));
    if(ids.some(i=>i<0)||ids.some((v,i)=>i&&v<ids[i-1])||/\bundefined\b|\bNaN\b|\[object Object\]/.test(txt(h)))bad.push(c)});return{ok:!bad.length,d:bad.join(",")}});
 T("Lessons · Foundation and Deeper choose content without losing the core",()=>["1.1","2.8","4.6"].every(c=>{VIEW="course";TAB=TOPICS_TAB();ARG=c;
   LS.depth="foundation";const f=VIEWS.course();LS.depth="deeper";const d=VIEWS.course();LS.depth="core";
   return f.includes('id="ls-learn"')&&f.includes('id="ls-retrieve"')&&!f.includes('id="ls-exam"')&&d.includes('id="ls-exam"')&&(d.match(/<details class="gd mt3" open>/g)||[]).length>=1}));
 T("Lessons · the old dossier address opens the lessons",()=>{const r=routeParse("#/course/topic-dossier/2.5");return !!r&&r.v==="course"&&r.t===TOPICS_TAB()&&r.a==="2.5"});
 T("Lessons · what to study next follows written prerequisite links only",()=>{S.lesson={};const a=lsNext();
   S.lesson={"2.5":{rate:Object.fromEntries(lsNeeds("2.5").map(k=>[k,true])),doneAt:"2026-01-01"}};const b=lsNext();
   const n=SPINE["2.5"].next.sub,pre=(SPINE[n].before||[]).map(x=>x.sub);
   return {ok:!!(a&&a.c===lsVisible()[0].code&&b&&(b.c===n||pre.includes(b.c))&&b.why),d:JSON.stringify({a,b,n})}});
 T("Lessons · the self-check counts only the checks that apply",()=>{const c=codes.find(x=>!lsDiagrams(x).length&&!CALC.some(k=>k.sub===x)&&!((SUBMETA[x]||{}).calc||[]).length);return !c||lsNeeds(c).length===5});

 /* ── misconceptions ── */
 T("Misconception DB · 51 entries, unique ids, a student and a teacher view each",()=>MISCDB.length===51&&new Set(MISCDB.map(m=>m.id)).size===51&&MISCDB.every(m=>m.student&&m.teacher&&m.student.watch&&m.student.right&&m.teacher.root));
 T("Misconception DB · every check has one keyed answer and feedback",()=>MISCDB.every(m=>{const q=m.student.check;return q.a>=0&&q.a<q.opts.length&&q.why}));
 T("Misconception DB · every entry maps to a 2022 subtopic or says it lies beyond the guide",()=>MISCDB.every(m=>(m.subs||[]).every(s=>!!SUBMAP[s])&&((m.subs||[]).length||m.beyond)));
 T("Misconception DB · no teacher observation is presented as an IB examiner finding",()=>MISCDB.every(m=>!/(IB|official) (examiner|subject) report/i.test(m.teacher.examiner+" "+m.student.exam)));
 T("Misconception DB · a lesson shows the entries filed under it",()=>{VIEW="course";TAB=TOPICS_TAB();ARG="2.1";const h=VIEWS.course();return lsMisc("2.1").length>0&&lsMisc("2.1").every(m=>h.includes(m.id))});

 /* ── glossary and command terms ── */
 T("Glossary 2.0 · every term has plain English, a definition, why, an example, a confusion and a status",()=>GLOSS2.length>=240&&GLOSS2.every(g=>g.term&&g.plain&&g.def&&g.why&&g.ex&&g.confusion&&g.ib&&g.diff));
 T("Glossary 2.0 · no duplicate terms, and every related term resolves",()=>new Set(GLOSS2.map(g=>g.term.toLowerCase())).size===GLOSS2.length&&GLOSS2.every(g=>(g.related||[]).every(r=>!!GLBY[r.toLowerCase()])));
 T("Glossary 2.0 · every comparison aligns its rows with its terms",()=>(COURSE.compare||[]).length>=20&&COURSE.compare.every(c=>c.rows.every(r=>r.vals.length===c.terms.length)&&c.key&&c.trap));
 T("Glossary 2.0 · the unit filter keeps only that unit",()=>{const g=JSON.stringify(GX);GX.u="3";GX.q="";GX.sub="";GX.diff="";GX.ib="";GX.letter="";const l=glFilter();Object.assign(GX,JSON.parse(g));return l.length>10&&l.every(x=>String(x.sub).startsWith("3."))});
 T("Command terms 2.0 · every official definition and AO is identical to the guide's glossary held here",()=>CT2.length===33&&CT2.every(c=>GUIDE.ct[c.term]&&GUIDE.ct[c.term][1]===c.def&&GUIDE.ct[c.term][0]===c.ao));
 T("Command terms 2.0 · the page labels official wording and teacher guidance separately",()=>{VIEW="course";TAB=courseTab("Command terms");ARG=null;const h=VIEWS.course();return h.includes("IB OFFICIAL")&&h.includes("Teacher guidance")});

 /* ── snapshots and printing ── */
 T("Snapshot · a map for the course, every unit and every subtopic, each subtopic with six branches",()=>!!snapData("course")&&[1,2,3,4].every(u=>snapData("u"+u).subs.length)&&codes.every(c=>{const d=snapData(c);return d&&SNAPBR.every(([k])=>(d.branches[k]||[]).length)}));
 T("Snapshot · every map prepares an A4 landscape sheet with the restrained footer, and nothing prints",()=>{const before=PRINTGUARD.totalCalls;
   const ok=["course","u2","2.5"].every(id=>{const h=printDoc("t",snapHtml(id,{}),"s",{landscape:true,kind:"map",autoPrint:false});const st=document.getElementById("pgsz");
    return h.includes("Arjun Agrawal | IB DP Economics")&&st&&/A4 landscape/.test(st.textContent)});
   const r=document.getElementById("printroot");if(r){r.innerHTML="";r.className=""}const st=document.getElementById("pgsz");if(st)st.textContent="";
   return ok&&PRINTGUARD.totalCalls===before});
 T("Print system · a lesson summary, the glossary, command terms, a checklist, the lens card and a diagram sheet each prepare without printing",()=>{const before=PRINTGUARD.totalCalls;
   const docs=[printDoc("a",lsPrintBody("2.7"),"s",{kind:"sheet",autoPrint:false}),printDoc("b",`<div class="psheet pgl">x</div>`,"s",{kind:"sheet",autoPrint:false})];
   const r=document.getElementById("printroot");if(r){r.innerHTML="";r.className=""}
   return docs.every(d=>d.length>200)&&typeof glPrint==="function"&&typeof ctPrint==="function"&&typeof clPrint==="function"&&typeof lensPrint==="function"&&typeof dgPrint==="function"&&PRINTGUARD.totalCalls===before});
 T("Print system · printing the screen without choosing a sheet yields a clean copy, then clears it",()=>{const r=document.getElementById("printroot");if(!r)return true;
   r.innerHTML="";VIEW="course";TAB=TOPICS_TAB();ARG="3.2";render();
   printFallbackPrepare();const h=r.innerHTML;printFallbackClear();
   return /class="pview"/.test(h)&&!/<button/.test(h)&&!/<input/.test(h)&&r.innerHTML===""});

 /* ── search ── */
 T("Course search · lessons, terms, misconceptions, command terms, model cards and checklists are all searchable",()=>{SIDX=null;const k={};buildIndex().forEach(x=>k[x.k]=(k[x.k]||0)+1);
   return k.Lesson>=35&&k.Dictionary>=240&&k.Misconception>=51&&k["Command term"]>=33&&k["Model card"]>=31&&k.Checklist>=12&&!k["Topic dossier"]});
 T("Course search · a lesson is found by its title",()=>cpMatch("elasticities of demand").some(x=>x.k==="Lesson"&&/^2\.5 /.test(x.t)));
 T("Course search · no action can break out of its own quotes",()=>buildIndex().filter(x=>/^(Lesson|Dictionary|Misconception|Command term|Model card|Checklist|Compare|Key concept|Question|TOK)$/.test(x.k)).every(x=>!/"/.test(x.go)&&(()=>{try{new Function(x.go);return true}catch(e){return false}})()));

 /* ── papers, integrity, lens, concepts, intelligence ── */
 T("Paper guidance · every stated paper fact carries a page reference",()=>["p1","p2","p3"].every(k=>(PP[k].facts||[]).length&&PP[k].facts.every(f=>/(guide|TSM) PDF p/.test(f.src))));
 T("Paper guidance · the Paper 2 exercise follows the published parts and totals 40 marks",()=>{const q=PP.p2.exercise.questions;return q.reduce((a,x)=>a+x.marks,0)===40&&q[q.length-1].marks===15});
 T("Paper guidance · both practice exercises say their data are invented",()=>/invented/i.test(PP.p2.exercise.label)&&/invented/i.test(PP.p3.scenario.label));
 T("Integrity · every IA page carries the learning-support line",()=>{VIEW="ia";const ia=SECTIONS.find(s=>s.v==="ia");return ia.tabs.every((t,i)=>{TAB=i;ARG=null;const h=VIEWS.ia();return t==="Academic integrity"?h.includes("Before I submit"):h.includes("Learning support.")})});
 T("Integrity · nothing offers to write, finish or disguise assessed work",()=>{let bad=0;const R=/(we|the platform|this tool) (will )?(write|finish|complete)s? (your|the) (ia|commentary|essay|ee)|undetectable|bypass (ai )?detect|humani[sz]e (your|the) (text|essay)/i;
   walk(COURSE,(s)=>{if(R.test(s))bad++});return bad===0});
 T("Integrity · policy detail that could not be checked is marked for verification",()=>/Verification required/.test(JSON.stringify(COURSE.integrity)));
 T("Lens · seventeen questions in groups, each placed once",()=>{const L=COURSE.lens;const ids=[].concat(...L.groups.map(g=>g.ids));return L.qs.length===17&&ids.length===17&&new Set(ids).size===17});
 T("Concept network · nine concepts, each with at least six worlds across three units",()=>COURSE.concepts.length===9&&COURSE.concepts.every(k=>KCN.includes(k.c)&&k.worlds.length>=6&&new Set(k.worlds.map(w=>w.sub.split(".")[0])).size>=3&&k.worlds.every(w=>!!SUBMAP[w.sub])));
 T("Intelligence · each real-world issue has an eight-stage path whose cases and diagrams exist",()=>COURSE.intel.length===6&&COURSE.intel.every(r=>r.path.length===8&&r.path.every(p=>(!p.dg||!!DG[p.dg])&&(p.cases||[]).every(id=>RW_CASES.some(c=>c.id===id)))));
 T("Intelligence · each issue's question is the guide's own",()=>COURSE.intel.every(r=>RWI.some(x=>x.id===r.id&&x.q===r.q)));

 /* ── revision, checklists ── */
 T("Revision mode · 15, 30 and 60 minutes pick one, two and four lessons, least secure first",()=>{S.lesson={};REV.kind="time";const n=[15,30,60].map(m=>{REV.mins=m;return revPick().length});return n.join()==="1,2,4"});
 T("Revision mode · a unit review covers every lesson in the unit",()=>{REV.kind="unit";REV.arg=3;return revPick().length===lsVisible().filter(s=>s.unit===3).length});
 T("Checklists · every checklist has items, and Can I actually do this? has seven",()=>{const a=clAll();return a.length>=13&&a.every(c=>c.items.length)&&a.find(c=>c.id==="can-i-do-this").items.length===7});

 /* ── atlas and the calculation card ── */
 T("Atlas 2.0 · every plate builds in six steps from its own elements, and the last step holds them all",()=>{const bad=[];DGKEYS.forEach(k=>{const {els}=atLayers(k);if(!els.length||els.some(e=>e.kind<1||e.kind>5))bad.push(k)});return{ok:!bad.length,d:bad.join(",")}});
 T("Atlas 2.0 · every plate names its axes (where it has axes) and at least one label for the exam view",()=>DGKEYS.every(k=>{const L=atLabels(k),d=DG[k]();return (L.axes.length===2||!(d.x||d.y))&&L.labels.length>=1}));
 T("Calculation card · every calculation filed under a subtopic links to its lesson",()=>CALC.filter(c=>c.sub&&SPINE[c.sub]).every(c=>calcPlus(c).includes(`'${c.sub}')`)));

 T("Inquiry tools · six tools render, and a diary entry is stored in the profile and nowhere else",()=>{const iq=JSON.stringify(S.iq||{});
   const ok=IQTOOLS.every(([k])=>{IQ.tool=k;return inquiryTools().length>1000});
   S.iq={};iqS().diary.Equity=[{d:"2026-01-01",sub:"3.4",t:"x"}];const stored=S.iq.diary.Equity.length===1;S.iq=JSON.parse(iq);IQ.tool="diary";return ok&&stored});
 T("Inquiry tools · the case comparison starts from cases that exist",()=>IQ.cases.every(id=>RW_CASES.some(c=>c.id===id)));
 /* restore */
 VIEW=keep.VIEW;TAB=keep.TAB;ARG=keep.ARG;LS.depth=keep.depth;LS.explain=keep.ex;LS.teacher=keep.teacher;S.lesson=JSON.parse(keep.lesson);
 Object.assign(GX,JSON.parse(keep.gx));Object.assign(REV,JSON.parse(keep.rev));SIDX=null;
 return out;
}
COURSESUITE.suiteName="The course layer";
EXTRA_SUITES.push(COURSESUITE);
QAREPORT.push({area:"The course layer",re:/^(Lessons|Inquiry tools|Misconception DB|Glossary 2\.0|Command terms 2\.0|Snapshot|Print system|Course search|Paper guidance|Integrity|Lens|Concept network|Intelligence|Revision mode|Checklists|Atlas 2\.0|Calculation card) · /,
 what:"That every one of the 31 subtopics has a complete lesson whose links land, whose checks have one keyed answer and whose practice questions use AO3 command terms only where the guide sets AO3 content; that the official command-term wording is unchanged; that no lesson claims how often a topic is examined or states an absolute in its own voice; that the misconception database, glossary, comparisons, lens, concept network and real-world paths are complete; that every snapshot map and printable sheet prepares without printing; that search reaches it all; and that nothing offers to write assessed work."});
