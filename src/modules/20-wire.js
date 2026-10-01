/* ═══════════════════════════════════════════════════════════════════════════
   THE COURSE LAYER, WIRED IN
   No new top-level section. Each new system upgrades a page that already
   existed, so every earlier address still works:
     Course › Topic dossier  → Course › Topics (the lessons; the old address is an alias)
     Course › Dictionary     → Glossary 2.0 and Compare terms
     Course › Command terms  → Command Terms 2.0
     Course › Key concepts   → gains the concept network (one concept, many worlds)
     Course › Real-world issues → gains Economics Intelligence
     Learn › Misconception lab  → gains the misconception database
     Think › Economist's toolkit → gains the Economist's Lens
     Practise › Ten-minute revision → gains revision mode
     Exam practice › Paper 1, 2, 3 → gain the paper guidance
     Mindmaps → gains snapshot mode (course, unit, subtopic) and print
   Two tabs are added where nothing existed: Course › Checklists and
   IA › Academic integrity.
   ═══════════════════════════════════════════════════════════════════════════ */
const afterHead=(h,band)=>{const i=String(h).indexOf("</section>");return i<0?band+h:h.slice(0,i+10)+band+h.slice(i+10)};
(function(){
 const sec=v=>SECTIONS.find(s=>s.v===v);
 const c=sec("course");
 if(c&&c.tabs){const i=c.tabs.indexOf("Topic dossier");if(i>=0)c.tabs[i]="Topics";if(!c.tabs.includes("Checklists"))c.tabs.push("Checklists")}
 const ia=sec("ia");if(ia&&ia.tabs&&!ia.tabs.includes("Academic integrity"))ia.tabs.push("Academic integrity");
 /* the old address of the lessons keeps working */
 const rp=routeParse;
 routeParse=function(h){return rp(String(h||"").replace(/^#\/course\/topic-dossier(?=\/|$)/,"#/course/topics"))};
 const tab=(s,n)=>{const x=sec(s);return x&&x.tabs?x.tabs.indexOf(n):-1};
 const wrap=(v,fn)=>{const prev=VIEWS[v];if(typeof prev!=="function")return;VIEWS[v]=function(){const r=fn(prev,this,arguments);return r===undefined?prev.apply(this,arguments):r}};
 wrap("course",()=>{
  if(TAB===tab("course","Topics"))return courseTopics();
  if(!COURSE_OK)return undefined;          /* without the data file the earlier pages stand */
  if(TAB===tab("course","Dictionary"))return glossary2();
  if(TAB===tab("course","Command terms"))return commandTerms2();
  if(TAB===tab("course","Checklists"))return checklistsView();
  if(TAB===tab("course","Key concepts")){if(ARG&&KCN.includes(ARG)){CX.kc=ARG;ARG=null}return courseKC()+conceptWorlds()}
  if(TAB===tab("course","Real-world issues")){if(ARG&&/^rw[1-6]$/.test(ARG)){CX.rwi=ARG;ARG=null}return afterHead(courseRWI(),"")+intelPath()}
 });
 wrap("learn",(prev,self,args)=>COURSE_OK&&TAB===tab("learn","Misconception lab")?afterHead(prev.apply(self,args),miscDb()):undefined);
 wrap("think",(prev,self,args)=>TAB===tab("think","Economist's toolkit")?afterHead(prev.apply(self,args),lensView()):undefined);
 wrap("practise",(prev,self,args)=>TAB===tab("practise","Ten-minute revision")?afterHead(prev.apply(self,args),revView()):undefined);
 wrap("papers",(prev,self,args)=>{const n=[tab("papers","Paper 1 workshop"),tab("papers","Paper 2 data lab"),tab("papers","Paper 3 recommendation lab")].indexOf(TAB);
  return n>=0?afterHead(prev.apply(self,args),paperGuide(n+1)):undefined});
 wrap("ia",(prev,self,args)=>{if(TAB===tab("ia","Academic integrity"))return integrityView()||H.pageHead("IA","Academic integrity","This guidance is read from assets/data/course.js, which this copy of the page was opened without.");
  return afterHead(prev.apply(self,args),`<div class="wrap"><p class="ls-support mt3"><strong>Learning support.</strong> Everything in this section helps you learn to write a commentary; the commentary itself must be your own work. <button class="lnk" onclick="nav('ia',${tab("ia","Academic integrity")})">Academic integrity</button></p></div>`)});
 wrap("mind",(prev,self,args)=>{if(TAB!==0)return undefined;
  if(ARG&&/^snap-/.test(ARG))return snapView(ARG.slice(5));
  return COURSE_OK?afterHead(prev.apply(self,args),snapIndexBand()):undefined});
 wrap("tok",(prev,self,args)=>TAB===tab("tok","Knowledge questions")?afterHead(prev.apply(self,args),tokByTopic()):undefined);
})();
function tokByTopic(){return `<section class="sec"><div class="wrap"><div class="kicker">One question for every lesson</div>
 <h2 class="mt1">Knowledge questions, topic by topic</h2><ol class="tok-by mt3">${lsVisible().map(s=>SPINE[s.code]?`<li><button class="lnk" onclick="${lsGoSub(s.code)}">${esc(s.code)}</button> ${esc(SPINE[s.code].tok)}</li>`:"").join("")}</ol>
 <p class="xs mt2">${srcTag("platform")} Written for this platform; each is tied to the economics of its lesson rather than to philosophy in general.</p></div></section>`}

/* ── search reaches the lessons and everything the course layer holds ── */
(function(){
 if(typeof buildIndex!=="function")return;
 const prev=buildIndex;
 buildIndex=function(){
  if(SIDX)return SIDX;
  const I=prev().filter(x=>!["Topic dossier","Dictionary","Command term"].includes(x.k));   /* replaced by richer records below */
  const T=TOPICS_TAB(),kc=c=>((SPINE[c]||{}).kc||[]).map(k=>k.c).join(", ");
  lsCodes().forEach(c=>{const s=SPINE[c];if(!s)return;const t=SUBMAP[c]||{};
   I.push({k:"Lesson",t:`${c} ${t.title}`,d:`Unit ${t.unit} · ${kc(c)} · ${s.big.q}`,go:`nav('course',${T},'${c}')`,s:[c,t.title,"lesson topic",s.big.idea,s.big.q,kc(c)].join(" ")});
   (s.models||[]).forEach(m=>I.push({k:"Model card",t:m.model,d:`${c} · ${m.purpose}`,go:`nav('course',${T},'${c}')`,s:[m.model,m.purpose,m.prediction,"model",c].join(" ")}));
   ((s.exam||{}).practice||[]).forEach(q=>I.push({k:"Question",t:q.q,d:`${c} · ${q.p} · original practice question`,go:`nav('course',${T},'${c}')`,s:[q.q,q.p,c].join(" ")}));
   I.push({k:"TOK",t:s.tok,d:`${c} ${t.title}`,go:`nav('course',${T},'${c}')`,s:[s.tok,c,t.title,"tok"].join(" ")});
   I.push({k:"Mindmap",t:`Snapshot · ${c} ${t.title}`,d:"The lesson on one page, printable",go:`snapOpen('${c}')`,s:[c,t.title,"snapshot mindmap map print"].join(" ")})});
  [1,2,3,4].forEach(u=>{I.push({k:"Lesson",t:`Unit ${u} · ${LSUNIT[u]}`,d:"The unit's lessons in prerequisite order",go:`nav('course',${T},'unit-${u}')`,s:["unit",u,LSUNIT[u]].join(" ")});
   I.push({k:"Mindmap",t:`Snapshot · Unit ${u} map`,d:`${LSUNIT[u]} on one page`,go:`snapOpen('u${u}')`,s:["unit map snapshot",u,LSUNIT[u]].join(" ")})});
  I.push({k:"Mindmap",t:"Snapshot · the course map",d:"Four units, thirty-one lessons, on one page",go:`snapOpen('course')`,s:"course map snapshot one page syllabus"});
  const D=courseTab("Dictionary");
  (COURSE.gloss||[]).forEach((g,gi)=>I.push({k:"Dictionary",t:g.term,d:`${g.sub||""}${/HL only/.test(g.ib||"")?" · HL":""} · ${g.plain||g.def}`,go:`glOpen(${gi})`,
   s:[g.term,[].concat(g.alias||[]).join(" "),g.def,g.plain,g.sub,"glossary definition term"].join(" ")}));
  (COURSE.compare||[]).forEach(c=>I.push({k:"Compare",t:c.terms.join(" vs "),d:c.key,go:`GX.cset='${c.id}';nav('course',${D})`,s:[c.terms.join(" "),c.key,"compare versus difference"].join(" ")}));
  const L=tab0("learn","Misconception lab");
  MISCDB.forEach(m=>I.push({k:"Misconception",t:m.title,d:`${(m.subs||[]).join(", ")} · “${m.student.watch}”`,go:`nav('learn',${L},'${m.id}')`,s:[m.id,m.title,m.student.watch,m.student.right,(m.subs||[]).join(" "),"misconception mistake"].join(" ")}));
  const C=courseTab("Command terms");
  (COURSE.ct||[]).forEach(x=>I.push({k:"Command term",t:x.term,d:`${x.ao} · ${x.asks}`,go:`nav('course',${C},'${x.term}')`,s:[x.term,x.def,x.asks,x.ao,"command term"].join(" ")}));
  const K=courseTab("Key concepts");
  (COURSE.concepts||[]).forEach(k=>I.push({k:"Key concept",t:k.c,d:k.q,go:`nav('course',${K},'${k.c}')`,s:[k.c,k.core,k.q,"key concept one concept many worlds"].join(" ")}));
  const CL=courseTab("Checklists");
  clAll().forEach(c=>I.push({k:"Checklist",t:c.name+" checklist",d:c.for||"",go:`CLX='${c.id}';nav('course',${CL})`,s:[c.name,"checklist",c.for].join(" ")}));
  [["Concept diary","diary"],["Concept graph","graph"],["Frayer model","frayer"],["Cross-comparison chart","cross"],["Continuum of examples","cont"],["Real-world case comparison","cases"]].forEach(([t,k])=>
   I.push({k:"Tool",t,d:"Inquiry tools · think with the key concepts",go:`IQ.tool='${k}';nav('think',${thinkTab("Inquiry tools")})`,s:[t,"inquiry tool concept"].join(" ")}));
  I.push({k:"Tool",t:"The Economist's Lens",d:"Seventeen questions for any economic issue",go:`nav('think',${thinkTab("Economist's toolkit")})`,s:"economist's lens seventeen questions framework think"});
  I.push({k:"Tool",t:"Revision mode",d:"15, 30 or 60 minutes, a unit, or the whole course",go:`nav('practise',${practiseTab("Ten-minute revision")})`,s:"revision mode review revise 15 30 60 minutes unit course"});
  I.push({k:"Tool",t:"Academic integrity",d:"Authenticity, citation, AI use and the checklists before you submit",go:`nav('ia',${iaTab("Academic integrity")})`,s:"academic integrity plagiarism citation referencing ai use before i submit"});
  I.push({k:"Tool",t:"Economic writing",d:"From an assertion to an argument",go:`nav('papers',0)`,s:"economic writing chain of analysis definition explanation evaluation judgement"});
  SIDX=I.map(x=>({...x,s:String(x.s).toLowerCase()}));
  return SIDX;
 };
 function tab0(v,n){const s=SECTIONS.find(x=>x.v===v);const i=s&&s.tabs?s.tabs.indexOf(n):-1;return i<0?0:i}
 if(typeof RN_KIND_W!=="undefined")Object.assign(RN_KIND_W,{"Lesson":3,"Dictionary":2.5,"Command term":2.2,"Key concept":2,"Model card":1.6,"Compare":1.5,"Checklist":1,"Tool":1.4,"TOK":0.4});
 if(typeof RAND_TYPES!=="undefined"&&!RAND_TYPES.some(t=>t[0]==="Lesson"))RAND_TYPES.unshift(["Lesson",["Lesson"]]);
 if(typeof CPGROUPS!=="undefined"){
  CPGROUPS.splice(1,0,["lessons","Lessons",/^(Lesson|Model card)$/]);
  const g=k=>CPGROUPS.find(x=>x[0]===k);
  if(g("concepts"))g("concepts")[2]=/^(Concept|Key concept|Dictionary|Definition|Compare|Misconception|Mechanism|Syllabus|Curriculum|Command term|Chain|Evaluation|Economics in 60 Seconds|Real-world issue)$/;
  if(g("exam"))g("exam")[2]=/^(Question|Question architecture|Exam archetype|What earns marks|Paper [123] practice|Exam simulator|Transfer task|Drill|Checklist)$/;
  if(g("tok"))g("tok")[2]=/^(TOK|Knowledge question|Model epistemology|TOK activity)$/;
 }
 try{SIDX=null}catch(e){}
})();

/* ── the home page: the course, in one band ── */
function rnCourseBand(){const vis=lsVisible(),n=lsNext();
 return `<section class="sec rn-band hc-band"><div class="wrap full"><div class="hc-g">
  <div class="hc-copy"><h2>Four units. Thirty-one lessons. One way of thinking.</h2>
   <p class="sm mt3">Every subtopic in the IB Economics guide is a complete lesson: the big idea, the mechanism, the models and diagrams, the evidence and its limits, the common mistakes, the exam and a check you mark yourself.</p>
   <div class="row mt4" style="gap:8px;flex-wrap:wrap">${n?`<button class="btn a" onclick="${lsGoSub(n.c)}">${lsStarted(n.c)?"Continue":"Start"}: ${esc(n.c)} ${esc(lsTitle(n.c))}</button>`:""}
    <button class="btn gh" onclick="nav('course',${TOPICS_TAB()})">All lessons</button><button class="btn gh" onclick="snapOpen('course')">The course on one page</button></div>
   ${n?`<p class="xs mt2">${esc(n.why)}</p>`:""}</div>
  <div class="hc-units">${[1,2,3,4].map(u=>`<div class="hc-u"><button class="hc-un" onclick="nav('course',${TOPICS_TAB()},'unit-${u}')"><span>Unit ${u}</span>${esc(LSUNIT[u])}</button>
   <div class="hc-cs">${vis.filter(s=>s.unit===u).map(s=>`<button class="${lsDone(s.code)?"done":lsStarted(s.code)?"started":""}" onclick="${lsGoSub(s.code)}" title="${esc(s.title)}">${esc(s.code)}</button>`).join("")}</div></div>`).join("")}</div>
 </div></div></section>`}
