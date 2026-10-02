/* ═══════════════════════════════════════════════════════════════════════════
   THE COURSE LAYER · every subtopic as a complete lesson
   The data lives in assets/data/course.js (window.__COURSE__): a learning
   spine for each of the 31 subtopics of the 2022 guide, the misconception
   database, Glossary 2.0, the command terms, the paper guidance, checklists,
   academic integrity, the nine key concepts, the Economist's Lens and the six
   real-world issues as paths. It is generated from reviewed source files and
   carries its own version and provenance (COURSE.meta).
   A lesson follows one loop: Learn → See → Try → Explain → Apply → Evaluate →
   Retrieve, then Connect. The core page teaches the topic on its own; "Go
   deeper" rewards curiosity and is never needed for the core. Depth is a
   choice of content, not a label on the student.
   ═══════════════════════════════════════════════════════════════════════════ */
const COURSE=(()=>{const c=(typeof window!=="undefined"&&window.__COURSE__)||null;
 return c&&c.spines?c:{meta:{sources:[],counts:{},unavailable:[]},spines:{},misc:[],gloss:[],compare:[],ct:[],writing:{},papers:{},
  checklists:[],integrity:{},concepts:[],lens:{qs:[],groups:[]},intel:[]}})();
const COURSE_OK=!!(typeof window!=="undefined"&&window.__COURSE__&&window.__COURSE__.spines);
const SPINE=COURSE.spines;
const MISCDB=COURSE.misc||[];
const MISCBY=Object.fromEntries(MISCDB.map(m=>[m.id,m]));
const CSRC=Object.fromEntries(((COURSE.meta||{}).sources||[]).map(s=>[s.id,s]));
const LSUNIT={1:"Introduction to economics",2:"Microeconomics",3:"Macroeconomics",4:"The global economy"};
/* Recommended teaching hours per unit, from the guide's syllabus outline (PDF p. 26). */
const LSHOURS={1:[10,10],2:[35,70],3:[40,75],4:[45,65]};
function srcTag(id,extra){const s=CSRC[id];if(!s)return "";
 return `<span class="srctag" title="${esc(s.title+" · "+s.version)}">${esc(s.tag)}</span>${extra?`<span class="srcnote">${esc(extra)}</span>`:""}`}
function courseTab(name){const c=SECTIONS.find(s=>s.v==="course");const i=c&&c.tabs?c.tabs.indexOf(name):-1;return i<0?0:i}
const TOPICS_TAB=()=>{const c=SECTIONS.find(s=>s.v==="course");if(!c||!c.tabs)return 8;
 const i=c.tabs.indexOf("Topics");return i>=0?i:Math.max(0,c.tabs.indexOf("Topic dossier"))};
const lsGoSub=c=>`nav('course',${TOPICS_TAB()},'${c}')`;
const lsCodes=()=>SUBTOPICS.map(s=>s.code);
const lsVisible=()=>SUBTOPICS.filter(s=>S.lvl==="HL"||s.lvl!=="HL");
const lsTitle=c=>(SUBMAP[c]||{}).title||c;

/* ── the student's own record for a lesson: stored in the profile, nowhere else ── */
const LS={depth:"core",explain:null,teacher:false,unit:null};
const LSRATE=[["know","I know it","I can state the definitions and the key facts without looking."],
 ["understand","I understand it","I can say why it works, not only what it says."],
 ["apply","I can apply it","I can use it on a case or data I have not seen before."],
 ["draw","I can draw it","I can draw every required diagram, fully labelled, from memory."],
 ["calculate","I can calculate it","I can do every required calculation and state the units."],
 ["evaluate","I can evaluate it","I can say when it holds, when it fails and what a judgement depends on."],
 ["explain","I can explain it without notes","I can teach it to someone else with the page closed."]];
function lsProg(c){S.lesson=S.lesson&&typeof S.lesson==="object"?S.lesson:{};
 const p=S.lesson[c]=S.lesson[c]||{};p.rate=p.rate||{};p.after=p.after||{};p.se=p.se||{};p.mcq=p.mcq||{};p.ret=p.ret||{};p.inq=p.inq||"";return p}
function lsNeeds(c){const dg=lsDiagrams(c).length>0,cal=CALC.some(x=>x.sub===c)||!!((SUBMETA[c]||{}).calc||[]).length;
 return LSRATE.map(r=>r[0]).filter(k=>(k!=="draw"||dg)&&(k!=="calculate"||cal))}
function lsScore(c){const p=(S.lesson||{})[c];if(!p||!p.rate)return 0;const need=lsNeeds(c);return need.filter(k=>p.rate[k]).length/need.length}
const lsDone=c=>lsScore(c)>=1;
const lsStarted=c=>{const p=(S.lesson||{})[c];return !!(p&&(p.seen||Object.keys(p.rate||{}).length))};
/* diagrams for a subtopic: the plates filed under it, plus the model cards' own */
const LSDGX={"3.1":["circular","cycle"],"3.5":["adas","defgap","infgap"],"3.6":["multiplier","adas","defgap","infgap"],"3.7":["growth","adas","labour"],
 "2.12":["circular","lorenz"],"4.9":["ppc"],"4.10":["ppc","tariff"],"1.2":["ppc"],"3.4":["lorenz"]};
function lsDiagrams(c){const s=SPINE[c]||{};const a=DGKEYS.filter(k=>DGSUB[k]===c);
 (s.models||[]).forEach(m=>{if(m.dg&&DGKEYS.includes(m.dg)&&!a.includes(m.dg))a.push(m.dg)});
 (LSDGX[c]||[]).forEach(k=>{if(DGKEYS.includes(k)&&!a.includes(k))a.push(k)});return a}
function lsMisc(c){return MISCDB.filter(m=>(m.subs||[]).includes(c))}
function lsTerms(c){return (COURSE.gloss||[]).filter(g=>g.sub===c)}

/* ── what should I study next? Explicit prerequisite links only ── */
function lsNext(){
 const vis=lsVisible().map(s=>s.code), sp=c=>SPINE[c]||{};
 const pre=c=>(sp(c).before||[]).map(b=>b.sub).filter(x=>x&&x!==c&&vis.includes(x));
 const last=Object.entries(S.lesson||{}).filter(([c,p])=>p&&p.doneAt&&vis.includes(c)).sort((a,b)=>String(b[1].doneAt).localeCompare(String(a[1].doneAt)))[0];
 if(last){const n=sp(last[0]).next||{};
  if(n.sub&&vis.includes(n.sub)&&!lsDone(n.sub)){const gap=pre(n.sub).filter(x=>!lsDone(x));
   return gap.length?{c:gap[0],from:last[0],why:`${n.sub} builds on ${gap[0]}, which you have not yet marked as secure.`}
    :{c:n.sub,from:last[0],why:n.why}}}
 for(const c of vis){if(lsDone(c))continue;const gap=pre(c).filter(x=>!lsDone(x)&&vis.indexOf(x)<vis.indexOf(c));
  if(!gap.length)return {c,from:null,why:lsStarted(c)?"You have started this lesson and not yet marked it secure.":
   c===vis[0]?"Every later topic builds on scarcity, choice and opportunity cost.":"It is the first lesson in course order whose prerequisites you have marked secure."};
  return {c:gap[0],from:null,why:`${c} builds on ${gap[0]}.`}}
 return null;
}
function lsNextCard(){const n=lsNext();
 if(!n)return `<div class="ls-next"><div class="kicker">What should I study next?</div><p class="sm mt2">Every lesson at your level is marked secure. Revision mode keeps it that way.</p>
  <button class="btn sm mt3" onclick="nav('practise',${practiseTab("Ten-minute revision")})">Open revision mode</button></div>`;
 return `<div class="ls-next"><div class="kicker">What should I study next?</div>
  <p class="ls-next-t mt2"><button class="lnk" onclick="${lsGoSub(n.c)}">${esc(n.c)} ${esc(lsTitle(n.c))} →</button></p>
  <p class="sm mt2">${n.from?`You finished ${esc(n.from)}. `:""}${esc(n.why)}</p>
  <p class="xs mt2">Chosen from the prerequisite links written into each lesson and from your own “Can I actually do this?” ticks. Nothing else is inferred.</p></div>`}
function practiseTab(n){const s=SECTIONS.find(x=>x.v==="practise");const i=s&&s.tabs?s.tabs.indexOf(n):-1;return i<0?0:i}

/* ═══ the course map: four units, thirty-one lessons ═══ */
function courseTopics(){
 const a=ARG;
 if(!COURSE_OK)return H.pageHead("Course","Topics","The lessons live in a file beside this page.")
  +`<section class="sec"><div class="wrap"><div class="note n"><span class="t">The course layer is not here</span> The thirty-one lessons, the glossary, the misconception database and the snapshot maps are read from <span class="mn">assets/data/course.js</span>. This copy of the page was opened without it. Keep the folder together, or open the platform from its website, and they return. Everything else on the platform works as usual.</div></div></section>`;
 if(a&&/^unit-[1-4]$/.test(a))return lsUnit(+a.slice(5));
 if(a&&SPINE[a])return lsLesson(a);
 const vis=lsVisible();
 return H.pageHead("Course","Topics",
  "Thirty-one lessons, one for each subtopic in the IB Economics guide (first assessment 2022). Each follows the same loop: learn it, see it, try it, explain it, apply it, evaluate it, retrieve it.")
 +`<section class="sec"><div class="wrap">
  <div class="ls-top">${lsNextCard()}
   <div class="ls-howto"><div class="kicker">How a lesson works</div>
    <ol class="ls-loopmini">${["Learn","See","Try","Explain","Apply","Evaluate","Retrieve"].map((x,i)=>`<li class="lf-${x.toLowerCase()}"><span>${String(i+1).padStart(2,"0")}</span>${x}</li>`).join("")}</ol>
    <p class="xs mt2">Levels: <strong>Foundation</strong> for the first pass, <strong>Core</strong> for what the course asks, <strong>Deeper</strong> for the economics behind the simplified model. Choose per lesson; it describes the content, not the reader.</p></div></div>
  <div class="row mt4" style="justify-content:space-between;align-items:center;gap:10px">
   <div class="seg">${["SL","HL"].map(l=>`<button class="${S.lvl===l?"on":""}" onclick="S.lvl='${l}';save();render()">${l}</button>`).join("")}</div>
   <div class="row" style="gap:8px"><button class="btn sm gh" onclick="snapOpen('course')">Course map</button>
    <button class="btn sm gh" onclick="snapPrint('course')">Print the course map</button></div></div>
  <div class="ls-units mt4">${[1,2,3,4].map(u=>{const subs=vis.filter(s=>s.unit===u);
   return `<section class="ls-unit" aria-labelledby="lsu${u}"><header><span class="ls-un">Unit ${u}</span>
     <h2 id="lsu${u}"><button class="lnk" onclick="nav('course',${TOPICS_TAB()},'unit-${u}')">${esc(LSUNIT[u])}</button></h2>
     <span class="xs">${subs.filter(s=>lsDone(s.code)).length} of ${subs.length} secure</span></header>
    <ol class="ls-cards">${subs.map(s=>lsCard(s.code)).join("")}</ol></section>`}).join("")}</div>
  <p class="xs mt4">${srcTag("guide")} Subtopic numbering and titles follow the guide. ${srcTag("platform")} Lessons are original.</p>
 </div></section>`;
}
function lsCard(c){const s=SPINE[c]||{},t=SUBMAP[c]||{},sc=lsScore(c);
 return `<li><button class="ls-card${lsDone(c)?" done":lsStarted(c)?" started":""}" onclick="${lsGoSub(c)}">
  <span class="ls-cc">${esc(c)}</span><span class="ls-ct">${esc(t.title||"")}</span>
  <span class="ls-cq">${esc((s.big||{}).q||"")}</span>
  <span class="ls-cm">${t.lvl==="HL"?'<span class="tag hl">HL only</span>':""}<span class="ls-bar" aria-label="${Math.round(sc*100)}% of the self-checks ticked"><i style="width:${Math.round(sc*100)}%"></i></span></span></button></li>`}

/* ═══ a unit landing page ═══ */
function lsUnit(u){
 const subs=lsVisible().filter(s=>s.unit===u), rw=(typeof RWI!=="undefined"?RWI:[]).filter(r=>r.unit===u);
 const h=LSHOURS[u]||[0,0];
 return H.pageHead(`Course · Unit ${u}`,esc(LSUNIT[u]),
   `${subs.length} lessons at ${S.lvl}. Start anywhere, but the order below follows the prerequisites.`)
 +`<section class="sec"><div class="wrap">
  <div class="row" style="gap:8px;flex-wrap:wrap"><button class="btn sm gh" onclick="nav('course',${TOPICS_TAB()})">← All units</button>
   <button class="btn sm" onclick="snapOpen('u${u}')">Unit map</button><button class="btn sm gh" onclick="snapPrint('u${u}')">Print the unit map</button>
   <button class="btn sm gh" onclick="revStart('unit',${u})">Revise this unit</button></div>
  ${rw.length?`<div class="ls-rwi mt4">${rw.map(r=>`<div><div class="kicker">Real-world issue ${r.n} · ${srcTag("guide")}</div><p class="ls-rq mt2">${esc(r.q)}</p>
    <button class="lnk mt2" onclick="nav('course',1,'${r.id}')">Follow it through the unit →</button></div>`).join("")}</div>`:""}
  <ol class="ls-path mt5">${subs.map((s,i)=>{const sp=SPINE[s.code]||{};const pre=(sp.before||[]).map(b=>b.sub).filter(x=>x&&x!==s.code);
   return `<li class="${lsDone(s.code)?"done":""}"><span class="ls-pn">${String(i+1).padStart(2,"0")}</span>
    <div><button class="ls-pt" onclick="${lsGoSub(s.code)}">${esc(s.code)} ${esc(s.title)}</button>${s.lvl==="HL"?' <span class="tag hl">HL only</span>':""}
     <p class="sm mt1">${esc((sp.big||{}).idea||"")}</p>
     ${pre.length?`<p class="xs mt1">Builds on ${pre.map(p=>`<button class="lnk" onclick="${lsGoSub(p)}">${esc(p)}</button>`).join(", ")}</p>`:""}</div></li>`}).join("")}</ol>
  <p class="xs mt4">${srcTag("guide")} Recommended teaching time for this unit: ${h[0]} hours at SL and ${h[1]} at HL (guide PDF p. 26), within 150 hours for SL and 240 for HL in total, including 20 hours for the internal assessment (p. 27).</p>
 </div></section>`;
}

/* ═══ the lesson ═══ */
function lsLesson(c){
 const s=SPINE[c], t=SUBMAP[c]||{}, m=SUBMETA[c]||{}, p=lsProg(c);
 if(!s)return H.pageHead("Course","Topics","This lesson is not available.");
 if(!p.seen){p.seen=nowd();save()}
 const dep=LS.depth, deep=dep==="deeper", found=dep==="foundation";
 const ex=LS.explain||(deep?"deep":found?"simple":"exam");
 const dgs=lsDiagrams(c), calcs=CALC.filter(x=>x.sub===c), mis=lsMisc(c), terms=lsTerms(c);
 const cases=(typeof RW_CASES!=="undefined"?RW_CASES:[]).filter(x=>x.sub===c);
 const loop=[["learn","Learn"],["see","See"],["try","Try"],["explain","Explain"],["apply","Apply"],["evaluate","Evaluate"],["retrieve","Retrieve"],["connect","Connect"]];
 const O=s.obj||{}, OK=["know","understand","apply","analyse","evaluate","calculate","draw","interpret","recommend"].filter(k=>(O[k]||[]).length&&(!found||["know","understand","apply"].includes(k)));
 const vis=lsVisible().map(x=>x.code), i=vis.indexOf(c), prev=vis[i-1], next=vis[i+1];
 return `<article class="ls" data-depth="${dep}" aria-labelledby="ls-h">
 <header class="ls-head"><div class="wrap">
  <div class="ls-crumb"><button class="lnk" onclick="nav('course',${TOPICS_TAB()})">Topics</button> <span aria-hidden="true">/</span>
   <button class="lnk" onclick="nav('course',${TOPICS_TAB()},'unit-${t.unit}')">Unit ${t.unit} · ${esc(LSUNIT[t.unit]||"")}</button></div>
  <div class="ls-hrow"><div class="ls-hl"><span class="ls-code">${esc(c)}</span><h1 id="ls-h">${esc(t.title||"")}</h1>
   <div class="ls-meta">${t.lvl==="HL"?'<span class="tag hl">HL only</span>':'<span class="tag">SL &amp; HL</span>'}${m.ao?`<span class="tag">${esc(m.ao)}</span>`:""}
    ${(s.kc||[]).map(k=>`<button class="kcchip" onclick="nav('course',${courseTab("Key concepts")},'${esc(k.c)}')">${esc(k.c)}</button>`).join("")}</div></div>
   <div class="ls-tools"><div class="seg" role="group" aria-label="Depth">${[["foundation","Foundation"],["core","Core"],["deeper","Deeper"]].map(([k,n])=>
     `<button class="${dep===k?"on":""}" aria-pressed="${dep===k}" onclick="LS.depth='${k}';LS.explain=null;render()">${n}</button>`).join("")}</div>
    <div class="row" style="gap:6px;flex-wrap:wrap;justify-content:flex-end">
     <button class="btn sm gh" onclick="snapOpen('${c}')">Mindmap</button>
     <button class="btn sm gh" onclick="lsPrint('${c}')">Print summary</button>
     <button class="btn sm ${LS.teacher?"":"gh"}" aria-pressed="${LS.teacher}" onclick="LS.teacher=!LS.teacher;render()">Teach it</button></div></div></div>
  <nav class="ls-loop" aria-label="Learning loop">${loop.map(([k,n],j)=>`<button class="lf-${k}" onclick="lsGo('${k}')"><span>${String(j+1).padStart(2,"0")}</span>${n}</button>`).join("")}</nav>
 </div></header>

 <div class="wrap ls-body">
  <section class="ls-big" aria-label="The big idea">
   <div class="kicker">The big idea</div><p class="ls-idea">${esc(s.big.idea)}</p>
   <div class="ls-bigrow"><div><div class="eb">Why it matters</div><p class="sm mt1">${esc(s.big.why)}</p></div>
    <div><div class="eb">The question</div><p class="ls-q mt1">${esc(s.big.q)}</p></div></div></section>

  <div class="ls-grid2">
   <section class="ls-panel" aria-labelledby="ls-bf"><h2 class="ls-h2" id="ls-bf">Before you start</h2>
    <ul class="ls-list">${(s.before||[]).map(b=>`<li>${esc(b.t)}${b.sub&&b.sub!==c?` <button class="lnk" onclick="${lsGoSub(b.sub)}">${esc(b.sub)}</button>`:""}</li>`).join("")}</ul></section>
   <section class="ls-panel" aria-labelledby="ls-ob"><h2 class="ls-h2" id="ls-ob">By the end you can</h2>
    <dl class="ls-obj">${OK.map(k=>`<div><dt>${k}</dt><dd>${(O[k]||[]).map(x=>`<span>${esc(x)}</span>`).join("")}</dd></div>`).join("")}</dl></section></div>

  ${lsSec("learn","Learn","The core explanation",
   `<div class="ls-learn-g"><div class="ls-learn-main">`
   +(found?`<div class="ls-plain"><div class="eb">In plain terms</div><p class="mt1">${esc(s.explain.simple)}</p></div>`:"")
   +(s.blocks||[]).map(lsBlock).join("")+`</div>`
   +(terms.length?`<aside class="ls-rail" aria-label="Key terms in this lesson"><div class="ls-h3">Key terms (${terms.length})</div>
     <dl class="ls-kt">${terms.map(g=>`<div><dt>${esc(g.term)}${g.ib&&/HL only/.test(g.ib)?' <span class="tag hl">HL</span>':""}</dt><dd>${esc(g.def)}</dd></div>`).join("")}</dl>
     <button class="lnk mt2" onclick="nav('course',${courseTab("Dictionary")},'sub:${c}')">Open these in the glossary →</button></aside>`:"")
   +`</div><h3 class="ls-h3 ls-gap">The mechanism</h3>`+(found?(s.mech||[]).slice(0,1):(s.mech||[])).map(lsMech).join(""))}

  ${lsSec("see","See","The models and the diagrams",
   (s.models||[]).map((md,j)=>lsModel(c,md,j,deep,found)).join("")
   +(dgs.filter(k=>!(s.models||[]).some(md=>md.dg===k)).length?`<div class="ls-more"><div class="eb">Also for this topic</div><div class="row mt2" style="gap:6px;flex-wrap:wrap">${
     dgs.filter(k=>!(s.models||[]).some(md=>md.dg===k)).map(k=>`<button class="btn xs gh" onclick="nav('lab',3,'${k}')">${esc(DG[k]().t)}</button>`).join("")}</div></div>`:""))}

  ${lsSec("try","Try","Change something and watch",
   `<div class="ls-grid2">
    <div class="ls-panel"><h3 class="ls-h3">Misconception checks</h3>${(s.mcq||[]).map((q,j)=>`<div class="ls-mcq" id="lsq-${j}">${lsMcqHtml(c,j)}</div>`).join("")}</div>
    <div class="ls-panel"><h3 class="ls-h3">Calculations</h3>${calcs.length?calcs.map(x=>`<div class="ls-calc"><div><strong>${esc(x.n)}</strong>${x.lvl==="HL"?' <span class="tag hl">HL</span>':""}<div class="mn xs mt1">${esc(x.f)}</div></div>
      <button class="btn xs" onclick="nav('calculate',0,'${x.id}')">Calculate →</button></div>`).join(""):`<p class="sm">The guide sets no calculation for this subtopic.</p>`}
     <h3 class="ls-h3 ls-gap">Diagrams to explore</h3>${dgs.length?`<div class="row mt2" style="gap:6px;flex-wrap:wrap">${dgs.map(k=>`<button class="btn xs gh" onclick="nav('lab',3,'${k}')">${esc(DG[k]().t)}</button>`).join("")}</div>`
      :`<p class="sm">No diagram is required here.</p>`}</div></div>`)}

  ${lsSec("explain","Explain","Explain it, then check yourself",
   `<div class="ls-exp"><div class="seg" role="tablist" aria-label="Explain it to me">${[["simple","Simple"],["exam","Exam"],["deep","Deep"]].map(([k,n])=>
     `<button role="tab" aria-selected="${ex===k}" class="${ex===k?"on":""}" onclick="LS.explain='${k}';lsSwap('ls-expx',lsExplainHtml('${c}'))">${n}</button>`).join("")}</div>
    <div id="ls-expx" class="mt3">${lsExplainHtml(c)}</div></div>
    <h3 class="ls-h3 ls-gap">Can I explain it?</h3><p class="sm">Write your own explanation first. The checklist appears when you ask for it, so you can see what a complete answer contains. Nothing you write is marked or sent anywhere.</p>
    ${(s.selfexp||[]).map((q,j)=>`<div class="ls-se" id="lsse-${j}">${lsSeHtml(c,j,false)}</div>`).join("")}`)}

  ${lsSec("apply","Apply","The real world, and an inquiry",
   `${cases.length?`<div class="ls-cases">${cases.slice(0,4).map(x=>`<button class="ls-case" onclick="rwOpen('${x.id}')"><span class="ls-cy">${esc(x.c)} · ${esc(String(x.y))}</span>
     <strong>${esc(x.t)}</strong><span class="sm">${esc(x.is||"")}</span></button>`).join("")}</div>
     <p class="xs mt2">${cases.length} Real World case${cases.length===1?"":"s"} filed under ${esc(c)}. Each separates fact, data, analysis and interpretation, and cites its sources.</p>`
     :`<p class="sm">No Real World case is filed under this subtopic yet. The model cards above carry real-world illustrations.</p>`}
    <div class="ls-inq mt5"><div class="kicker">Inquiry lab</div><p class="ls-q mt2">${esc(s.inquiry.q)}</p>
     <label class="eb mt3" for="lsinq">What would you expect, before you look?</label>
     <textarea id="lsinq" class="inp mt2" rows="3" onchange="lsProg('${c}').inq=this.value;save()">${esc(p.inq||"")}</textarea>
     <details class="mt3"${deep?" open":""}><summary>Follow the inquiry</summary><dl class="ls-dl mt2">
      ${[["What would most people expect?","expect"],["What does the model predict?","model"],["What does the evidence show?","evidence"],["Do theory and evidence match?","match"],
        ["Which assumptions matter?","assume"],["What would change the conclusion?","change"],["What follows for policy?","policy"]].map(([h,k])=>`<div><dt>${h}</dt><dd>${esc(s.inquiry[k]||"")}</dd></div>`).join("")}</dl></details></div>
    ${found?"":`<div class="ls-grid2 mt4"><div class="ls-panel"><h3 class="ls-h3">IA connection</h3><p class="sm">${esc(s.ia)}</p>
      <p class="xs mt2">Learning support only: the commentary itself must be your own work. <button class="lnk" onclick="nav('ia',${iaTab("Academic integrity")})">Academic integrity</button></p></div>
     <div class="ls-panel"><h3 class="ls-h3">Extended essay direction</h3><p class="sm">${esc(s.ee||"No extended essay direction is suggested for this subtopic.")}</p></div></div>`}`)}

  ${lsSec("evaluate","Evaluate","Theory, evidence and interpretation",
   (found?"":`<div class="ls-tei"><div class="tei-t"><div class="eb">Theory</div><p class="sm mt1">${esc(s.tei.theory)}</p></div>
     <div class="tei-e"><div class="eb">Evidence</div><p class="sm mt1">${esc(s.tei.evidence)}</p></div>
     <div class="tei-i"><div class="eb">Interpretation</div><p class="sm mt1">${esc(s.tei.interp)}</p></div></div>`)
   +`<h3 class="ls-h3 ls-gap">Watch out</h3>${mis.length?`<div class="ls-watch">${mis.map(x=>lsWatch(x)).join("")}</div>`:`<p class="sm">The model cards list the common mistakes for this topic.</p>`}
    ${found?"":(s.deeper||[]).map(d=>`<details class="gd mt3"${deep?" open":""}><summary><span class="gd-k">Go deeper · ${esc(d.tag)}</span> ${esc(d.h)}</summary><p class="sm mt2">${esc(d.p)}</p></details>`).join("")}
    ${found?"":lsLensMini(c)}`)}

  ${found?"":lsSec("exam","Exam","Exam connection",lsExam(c,s.exam))}

  ${lsSec("retrieve","Retrieve","Retrieve it, then check it",
   `<ol class="ls-ret">${(s.retrieve||[]).map((r,j)=>`<li id="lsr-${j}">${lsRetHtml(c,j)}</li>`).join("")}</ol>
    <h3 class="ls-h3 ls-gap">After this topic: can I actually do this?</h3>
    <div class="ls-rate" id="ls-rate">${lsRateHtml(c)}</div>
    <details class="mt3"><summary>The full list for this lesson (${(s.after||[]).length})</summary><ul class="ls-after mt2">${(s.after||[]).map((a,j)=>
     `<li><label><input type="checkbox" ${p.after[j]?"checked":""} onchange="lsProg('${c}').after[${j}]=this.checked;save()"> ${esc(a)}</label></li>`).join("")}</ul></details>`)}

  ${lsSec("connect","Connect","Where this leads",
   `<div class="ls-grid2"><div class="ls-panel"><h3 class="ls-h3">Connected topics</h3><ul class="ls-list">${(s.connect||[]).map(x=>
     `<li><button class="lnk" onclick="${lsGoSub(x.sub)}">${esc(x.sub)} ${esc(lsTitle(x.sub))}</button><span class="sm"> ${esc(x.why)}</span></li>`).join("")}</ul></div>
    <div class="ls-panel"><h3 class="ls-h3">Key concepts here</h3>${(s.kc||[]).map(k=>`<div class="ls-kc"><button class="kcchip" onclick="nav('course',${courseTab("Key concepts")},'${esc(k.c)}')">${esc(k.c)}</button>
      <p class="sm mt1">${esc(k.here)}</p><p class="xs mt1"><strong>Tension:</strong> ${esc(k.tension)}</p></div>`).join("")}</div></div>
    <div class="ls-grid2 mt4"><div class="ls-panel"><h3 class="ls-h3">TOK</h3><p class="sm">${esc(s.tok)}</p>
      <button class="lnk mt2" onclick="nav('tok')">TOK × Economics →</button></div>
     <div class="ls-panel ls-nextp">${s.next&&s.next.sub?`<div class="kicker">Next recommended</div><p class="mt2"><button class="lnk" onclick="${lsGoSub(s.next.sub)}">${esc(s.next.sub)} ${esc(lsTitle(s.next.sub))} →</button></p>
      <p class="sm mt1">${esc(s.next.why)}</p>`:`<div class="kicker">Course synthesis</div><p class="sm mt2">${esc((s.next||{}).why||"")}</p>`}</div></div>`)}

  ${LS.teacher?lsTeach(c):""}
  <nav class="ls-pn" aria-label="Previous and next lesson">${prev?`<button class="btn gh" onclick="${lsGoSub(prev)}">← ${esc(prev)} ${esc(lsTitle(prev))}</button>`:"<span></span>"}
   ${next?`<button class="btn gh" onclick="${lsGoSub(next)}">${esc(next)} ${esc(lsTitle(next))} →</button>`:""}</nav>
  <footer class="ls-src"><p class="xs">${srcTag("guide")} Syllabus content, levels and command terms: IB Economics guide, first assessment 2022, checked against the supplied text on ${esc((COURSE.meta||{}).checked||"")}.
   ${srcTag("platform")} Explanations, model cards, checks and examples are original to this platform; illustrative numbers are invented and labelled.
   ${srcTag("miscdb")} “Watch out” draws on a teacher's misconception database, not on IB examiner reports. Version ${esc((COURSE.meta||{}).version||"")}.</p></footer>
 </div></article>`;
}
function iaTab(n){const s=SECTIONS.find(x=>x.v==="ia");const i=s&&s.tabs?s.tabs.indexOf(n):-1;return i<0?0:i}
const LSLOOPN={learn:"01",see:"02",try:"03",explain:"04",apply:"05",evaluate:"06",exam:"06·",retrieve:"07",connect:"08"};
function lsSec(k,label,title,body){return `<section class="ls-sec lf-${k}" id="ls-${k}" aria-labelledby="ls-${k}-h">
 <div class="ls-sh"><span class="ls-sk">${LSLOOPN[k]||""} ${esc(label)}</span><h2 class="ls-h" id="ls-${k}-h">${esc(title)}</h2></div>${body}</section>`}
function lsGo(k){const e=document.getElementById("ls-"+k);if(e){e.scrollIntoView({behavior:RN&&RN.reduced?"auto":"smooth",block:"start"});
 const h=e.querySelector("h2");if(h){h.setAttribute("tabindex","-1");try{h.focus({preventScroll:true})}catch(x){}}}}
function lsSwap(id,html){const e=document.getElementById(id);if(e)e.innerHTML=html}
const LSKIND={idea:"Core idea",definition:"Definition",example:"Example",compare:"Compare",because:"Because",note:"Note"};
function lsBlock(b){return `<div class="ls-block k-${esc(b.kind||"idea")}"><div class="ls-bk">${esc(LSKIND[b.kind]||"Core idea")}</div>
 <h3 class="ls-bh">${esc(b.h)}</h3><p class="ls-bp">${esc(b.p)}</p>
 ${(b.because||[]).length?`<ol class="ls-chain" aria-label="Chain of reasoning">${b.because.map(x=>`<li>${esc(x)}</li>`).join("")}</ol>`:""}
 ${b.tbl&&b.tbl.head?`<div class="scrollx mt3"><table class="t ls-t"><thead><tr>${b.tbl.head.map(h=>`<th>${esc(h)}</th>`).join("")}</tr></thead>
   <tbody>${b.tbl.rows.map(r=>`<tr>${r.map(x=>`<td>${esc(x)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`:""}</div>`}
function lsMech(x){return `<div class="ls-mech"><div class="ls-mt">${esc(x.t)}</div><ol class="ls-flow">
 ${[["Cause",x.cause],["Mechanism",x.mechanism],["Immediate effect",x.immediate],["Secondary effect",x.secondary],["Possible long-run effect",x.longrun]].map(([h,v])=>`<li><span class="eb">${h}</span><p class="sm mt1">${esc(v||"")}</p></li>`).join("")}</ol>
 ${x.depends?`<p class="ls-dep"><strong>It depends on:</strong> ${esc(x.depends)}</p>`:""}</div>`}
function lsModel(c,md,j,deep,found){let fig="";
 if(md.dg&&DG[md.dg]){try{const d=DG[md.dg]();fig=`<figure class="ls-fig">${frame(d.b,d.x,d.y,{alt:d.alt})}<figcaption class="xs">${esc(d.t)} · <button class="lnk" onclick="nav('lab',3,'${md.dg}')">explore and build it in the atlas</button></figcaption></figure>`}catch(e){}}
 const row=(h,v)=>v?`<div><dt>${h}</dt><dd>${Array.isArray(v)?`<ul>${v.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:esc(v)}</dd></div>`:"";
 return `<div class="ls-model"><div class="ls-mh"><span class="eb">Model card</span><h3>${esc(md.model)}</h3></div>
 <div class="ls-mgrid${fig?"":" nofig"}">${fig}<dl class="ls-dl ls-mdl">${row("Purpose",md.purpose)}${row("Core assumptions",md.assumptions)}${row("Mechanism",md.mechanism)}${row("Prediction",md.prediction)}
  ${found?"":row("Application",md.application)+row("Limitations",md.limitations)+row("Real world",md.real)}${row("Common misconception",md.misconception)}${found?"":row("Exam use",md.exam)}</dl></div>
 ${found||!md.deeper?"":`<details class="gd mt3"${deep?" open":""}><summary><span class="gd-k">Go deeper</span> Beyond the simplified model</summary><p class="sm mt2">${esc(md.deeper)}</p></details>`}</div>`}
function lsMcqHtml(c,j){const q=SPINE[c].mcq[j],p=lsProg(c),ch=p.mcq[j];const done=ch!==undefined&&ch!==null;
 return `<p class="ls-mq">${esc(q.q)}</p><div class="ls-mo" role="group" aria-label="Options">${q.opts.map((o,k)=>`<button class="${done?(k===q.a?"ok":k===ch?"no":""):""}" ${done?"disabled":""}
  onclick="lsMcq('${c}',${j},${k})">${esc(o)}</button>`).join("")}</div>
 ${done?`<p class="ls-mf ${ch===q.a?"ok":"no"}" role="status"><strong>${ch===q.a?"Right.":"Not quite."}</strong> ${esc(q.why)}</p>
  <button class="lnk xs" onclick="lsMcq('${c}',${j},null)">Try again</button>`:""}`}
function lsMcq(c,j,k){const p=lsProg(c);if(k===null)delete p.mcq[j];else p.mcq[j]=k;save();lsSwap("lsq-"+j,lsMcqHtml(c,j));
 if(k!==null){const q=SPINE[c].mcq[j];if(k!==q.a&&q.mis&&S.misc){S.misc[q.mis]=Object.assign(S.misc[q.mis]||{},{wrong:true,at:nowd()});save()}}}
function lsExplainHtml(c){const s=SPINE[c],k=LS.explain||(LS.depth==="deeper"?"deep":LS.depth==="foundation"?"simple":"exam");
 const lab={simple:"Simple: the intuition",exam:"Exam: how it is used in an IB answer",deep:"Deep: the economics behind the model"}[k];
 return `<div class="ls-ex ex-${k}"><div class="eb">${lab}</div><p class="mt2">${esc(s.explain[k])}</p></div>`}
function lsSeHtml(c,j,show){const q=SPINE[c].selfexp[j],p=lsProg(c),r=p.se[j]||{};const txt=r.t||"";
 const wc=txt.trim()?txt.trim().split(/\s+/).length:0,open=show||r.open;
 return `<label class="ls-sp" for="lsse-t${j}">${esc(q.prompt)}</label>
 <textarea id="lsse-t${j}" class="inp mt2" rows="4" placeholder="Write it in your own words…" onchange="lsProg('${c}').se[${j}]=Object.assign(lsProg('${c}').se[${j}]||{},{t:this.value});save()">${esc(txt)}</textarea>
 <div class="row mt2" style="gap:8px;align-items:center"><button class="btn xs" onclick="lsSe('${c}',${j})">${open?"Hide the checklist":"Check my explanation"}</button><span class="xs">${wc} words</span></div>
 ${open?`<div class="ls-sec-ck mt3"><div class="eb">Did you mention…</div><ul>${q.check.map((x,k)=>`<li><label><input type="checkbox" ${(r.ck||{})[k]?"checked":""}
  onchange="lsSeTick('${c}',${j},${k},this.checked)"> ${esc(x)}</label></li>`).join("")}</ul>
  <p class="xs mt2">${(Object.values(r.ck||{}).filter(Boolean).length)} of ${q.check.length} ticked. A missing point is the next thing to learn, not a mark lost.</p></div>`:""}`}
function lsSe(c,j){const p=lsProg(c),t=document.getElementById("lsse-t"+j);p.se[j]=Object.assign(p.se[j]||{},{t:t?t.value:(p.se[j]||{}).t,open:!(p.se[j]||{}).open});save();lsSwap("lsse-"+j,lsSeHtml(c,j,false))}
function lsSeTick(c,j,k,v){const p=lsProg(c);p.se[j]=p.se[j]||{};p.se[j].ck=p.se[j].ck||{};p.se[j].ck[k]=v;save();lsSwap("lsse-"+j,lsSeHtml(c,j,true))}
function lsRetHtml(c,j){const r=SPINE[c].retrieve[j],p=lsProg(c),o=p.ret[j];
 return `<p class="ls-rq2">${esc(r.q)}</p>${o?`<p class="ls-ra"><span class="eb">Answer</span> ${esc(r.a)}</p>
  <div class="row mt1" style="gap:6px"><button class="btn xs ${o==="got"?"":"gh"}" onclick="lsRet('${c}',${j},'got')">I had it</button><button class="btn xs ${o==="miss"?"":"gh"}" onclick="lsRet('${c}',${j},'miss')">I did not</button></div>`
  :`<button class="btn xs gh mt1" onclick="lsRet('${c}',${j},'open')">Show the answer</button>`}`}
function lsRet(c,j,v){const p=lsProg(c);p.ret[j]=v;save();lsSwap("lsr-"+j,lsRetHtml(c,j))}
function lsRateHtml(c){const p=lsProg(c),need=lsNeeds(c);
 return `<ul class="ls-rates">${LSRATE.filter(r=>need.includes(r[0])).map(([k,n,d])=>`<li><label><input type="checkbox" ${p.rate[k]?"checked":""} onchange="lsRate('${c}','${k}',this.checked)">
  <span><strong>${n}</strong><span class="xs">${d}</span></span></label></li>`).join("")}</ul>
  <p class="xs mt2">${need.filter(k=>p.rate[k]).length} of ${need.length} ticked${lsDone(c)?" · marked secure":""}. These are your own judgements; the platform does not predict a grade.</p>`}
function lsRate(c,k,v){const p=lsProg(c);p.rate[k]=v;if(lsDone(c)&&!p.doneAt)p.doneAt=nowd();if(!lsDone(c))delete p.doneAt;save();lsSwap("ls-rate",lsRateHtml(c))}
function lsWatch(x){const st=x.student,tv=x.teacher;
 return `<div class="ls-w"><div class="ls-wh"><span class="eb">Watch out · ${esc(x.id)}</span><h4>${esc(x.title)}</h4></div>
  <p class="ls-wq">“${esc(st.watch)}”</p><p class="sm mt2"><strong>In fact:</strong> ${esc(st.right)}</p>
  <p class="xs mt2"><strong>Why it is tempting:</strong> ${esc(st.why)}</p>
  <details class="mt2"><summary>Check yourself</summary><div class="ls-mcq mt2" id="lsw-${esc(x.id)}">${lsWatchQ(x.id,null)}</div></details>
  ${LS.teacher?`<div class="ls-diag mt3"><div class="eb">Diagnostic insight · teacher view ${srcTag("miscdb")}</div>
   <p class="xs mt1"><strong>Root cause:</strong> ${esc(tv.root)}</p><p class="xs mt1"><strong>Ask:</strong> ${esc((tv.diag||[]).join(" · "))}</p>
   <p class="xs mt1"><strong>Intervention:</strong> ${esc(tv.intervention)}</p><p class="xs mt1"><strong>Warning signs:</strong> ${esc((tv.warning||[]).join(" · "))}</p></div>`:""}</div>`}
function lsWatchQ(id,k){const x=MISCBY[id],q=x.student.check;const done=k!==null&&k!==undefined;
 return `<p class="sm">${esc(q.q)}</p><div class="ls-mo mt2">${q.opts.map((o,i)=>`<button class="${done?(i===q.a?"ok":i===k?"no":""):""}" ${done?"disabled":""} onclick="lsSwap('lsw-${esc(id)}',lsWatchQ('${esc(id)}',${i}))">${esc(o)}</button>`).join("")}</div>
 ${done?`<p class="ls-mf ${k===q.a?"ok":"no"}"><strong>${k===q.a?"Right.":"Not quite."}</strong> ${esc(q.why)}</p>`:""}`}
function lsExam(c,e){e=e||{};const cts=(e.ct||[]).map(x=>String(x));
 return `<div class="ls-grid2"><div class="ls-panel"><h3 class="ls-h3">Question types</h3><ul class="ls-list">${(e.types||[]).map(x=>`<li>${esc(x)}</li>`).join("")}</ul>
  <h3 class="ls-h3 ls-gap">Command terms</h3><div class="row mt2" style="gap:6px;flex-wrap:wrap">${cts.map(x=>`<button class="kcchip" onclick="nav('course',${courseTab("Command terms")},'${esc(x)}')">${esc(x)}</button>`).join("")}</div>
  <p class="xs mt2">Official definitions and a teacher's guidance on each are on the command terms page.</p></div>
 <div class="ls-panel"><dl class="ls-dl"><div><dt>Diagrams</dt><dd>${esc(e.dg||"")}</dd></div>${e.calc?`<div><dt>Calculations</dt><dd>${esc(e.calc)}</dd></div>`:""}
  <div><dt>Application</dt><dd>${esc(e.apply||"")}</dd></div><div><dt>Evaluation</dt><dd>${esc(e.eval||"")}</dd></div></dl></div></div>
 <div class="ls-grid2 mt4"><div class="ls-panel ls-err"><h3 class="ls-h3">Common errors</h3><ul class="ls-list">${(e.errors||[]).map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>
  <div class="ls-panel ls-good"><h3 class="ls-h3">What high-quality answers do</h3><ul class="ls-list">${(e.strong||[]).map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div></div>
 <div class="ls-panel mt4"><h3 class="ls-h3">Practice questions</h3><ol class="ls-prac">${(e.practice||[]).map(x=>`<li><span class="tag">${esc(x.p)}</span> ${esc(x.q)}</li>`).join("")}</ol>
  <p class="xs mt2">${srcTag("platform")} Original questions written for practice; not past IB questions, and no mark scheme is implied. <button class="lnk" onclick="nav('practise',0)">Question bank</button> · <button class="lnk" onclick="nav('dna',0)">Exam DNA</button></p></div>`}
function lsLensMini(c){const L=COURSE.lens||{};if(!(L.qs||[]).length)return "";
 return `<details class="ls-lens mt4"><summary><span class="gd-k">The Economist's Lens</span> Seventeen questions for this topic's issue</summary>
  <p class="ls-q mt3">${esc(SPINE[c].big.q)}</p><ol class="lens-ol mt2">${L.qs.map(q=>`<li><strong>${esc(q.q)}</strong> <span class="xs">${esc(q.why)}</span></li>`).join("")}</ol>
  <button class="lnk mt2" onclick="nav('think',${thinkTab("Economist's toolkit")})">The Economist's Lens in full →</button></details>`}
function thinkTab(n){const s=SECTIONS.find(x=>x.v==="think");const i=s&&s.tabs?s.tabs.indexOf(n):-1;return i<0?0:i}
function lsTeach(c){const s=SPINE[c],T=s.teach||{},mis=lsMisc(c)[0];
 const row=(h,v)=>v?`<div><dt>${h}</dt><dd>${esc(v)}</dd></div>`:"";
 return `<section class="ls-teach" aria-labelledby="ls-th"><div class="kicker">Teacher mode ${srcTag("platform")}</div><h2 class="ls-h mt1" id="ls-th">Teach it</h2>
  <dl class="ls-dl mt3">${row("Lesson objective",T.objective)}${row("Starter",T.starter)}
   ${row("Prerequisite",(s.before||[]).map(b=>b.t).join("; "))}${row("Core explanation",s.big.idea)}
   ${row("Common misconception",mis?`${mis.id}: ${mis.student.watch} (${mis.teacher.intervention})`:(s.models[0]||{}).misconception)}
   ${row("Diagram or classroom activity",T.activity)}${row("Discussion question",T.discussion)}${row("Inquiry",s.inquiry.q)}
   ${row("Real-world case",((typeof RW_CASES!=="undefined"?RW_CASES:[]).find(x=>x.sub===c)||{}).t)}${row("Formative check",T.check)}
   ${row("Extension",T.extension)}${row("Exam question",((s.exam||{}).practice||[])[0]?s.exam.practice[0].p+": "+s.exam.practice[0].q:"")}
   ${row("Homework or retrieval",T.homework)}${row("IA connection",s.ia)}${row("TOK connection",s.tok)}</dl>
  <p class="xs mt3">Visible only while Teach it is on. <button class="lnk" onclick="nav('teacher')">Teacher tools</button></p></section>`}

/* ═══ the lesson on paper: a two-page summary sheet ═══ */
function lsPrintBody(c){const s=SPINE[c],t=SUBMAP[c]||{},terms=lsTerms(c).slice(0,10),dgs=lsDiagrams(c),calcs=CALC.filter(x=>x.sub===c),mis=lsMisc(c).slice(0,4);
 const li=a=>a.map(x=>`<li>${esc(x)}</li>`).join("");
 return `<div class="psheet"><p class="pq">${esc(s.big.q)}</p><p>${esc(s.big.idea)}</p>
  <div class="pcols"><div><h2>By the end you can</h2><ul class="pl">${li(Object.values(s.obj||{}).flat().slice(0,8))}</ul>
   <h2>Key terms</h2><dl class="pdl">${terms.map(g=>`<dt>${esc(g.term)}</dt><dd>${esc(g.def)}</dd>`).join("")}</dl></div>
  <div><h2>The mechanism</h2>${(s.mech||[]).map(x=>`<p class="pmech"><strong>${esc(x.t)}.</strong> ${esc(x.cause)} → ${esc(x.mechanism)} → ${esc(x.immediate)} → ${esc(x.secondary)} → ${esc(x.longrun)}</p>`).join("")}
   <h2>Models</h2>${(s.models||[]).map(m=>`<p><strong>${esc(m.model)}.</strong> ${esc(m.prediction)} <em>Limits:</em> ${esc((m.limitations||[]).join("; "))}</p>`).join("")}</div></div>
  <div class="pcols"><div><h2>Diagrams to draw</h2><ul class="pl">${li(dgs.map(k=>DG[k]().t))}</ul>
   ${calcs.length?`<h2>Calculations</h2><ul class="pl">${calcs.map(x=>`<li>${esc(x.n)}: <span class="pmono">${esc(x.f)}</span>${x.lvl==="HL"?" (HL)":""}</li>`).join("")}</ul>`:""}
   <h2>Watch out</h2><ul class="pl">${mis.map(x=>`<li>“${esc(x.student.watch)}” ${esc(x.student.right)}</li>`).join("")}</ul></div>
  <div><h2>Evaluate</h2><p><strong>Theory.</strong> ${esc(s.tei.theory)}</p><p><strong>Evidence.</strong> ${esc(s.tei.evidence)}</p><p><strong>Interpretation.</strong> ${esc(s.tei.interp)}</p>
   <h2>Exam connection</h2><ul class="pl">${li((s.exam.strong||[]).slice(0,4))}</ul><p class="psm">Command terms: ${esc((s.exam.ct||[]).join(", "))}</p></div></div>
  <div class="pg"></div><h2>Retrieve without notes</h2><ol class="pl pret">${(s.retrieve||[]).map(r=>`<li>${esc(r.q)}<span class="fill"></span></li>`).join("")}</ol>
  <h2>Can I actually do this?</h2><ul class="pl">${(s.after||[]).map(a=>`<li><span class="ck"></span>${esc(a)}</li>`).join("")}</ul>
  <h2>Answers</h2><ol class="pl psm">${(s.retrieve||[]).map(r=>`<li>${esc(r.a)}</li>`).join("")}</ol>
  <p class="psm">${t.lvl==="HL"?"HL only. ":""}Syllabus content follows the IB Economics guide (first assessment 2022). Explanations are original to this platform.</p></div>`}
function lsPrint(c){const t=SUBMAP[c]||{};printDoc(`${c} ${t.title||""}`,lsPrintBody(c),`Topic summary · Unit ${t.unit} · ${LSUNIT[t.unit]||""}`,{kind:"sheet"})}
