/* ═══════════════════════════════════════════════════════════════════════════
   CONCEPT-BASED INQUIRY TOOLS
   Six tools from the concept-based pedagogy the guide and its teacher support
   material describe, built as working pages rather than worksheets: a concept
   diary, a concept graph, a Frayer model, a cross-comparison chart, a
   continuum of examples and a real-world case comparison. What a student
   writes is stored in their own profile on this device and prints cleanly.
   The platform's own notes (a lesson's line on a concept, a case's facts)
   are shown beside the student's work and labelled as the platform's.
   ═══════════════════════════════════════════════════════════════════════════ */
const IQ={tool:"diary",kc:"Intervention",x:"Efficiency",y:"Equity",term:"Price elasticity of demand",cont:0,cases:["MIC-015","MIC-004","MIC-025"]};
const IQTOOLS=[["diary","Concept diary"],["graph","Concept graph"],["frayer","Frayer model"],["cross","Cross-comparison chart"],["cont","Continuum of examples"],["cases","Case comparison"]];
const IQCONT=[["Price inelastic","Price elastic",[["Insulin",8],["Petrol, this week",20],["Petrol, over five years",45],["One brand of trainers",85]]],
 ["Public good","Private good",[["Lighthouse signal",8],["Street lighting",15],["A toll road",55],["A sandwich",95]]],
 ["Market-based policy","Interventionist policy",[["Deregulation",10],["Tradable permits",35],["A carbon tax",45],["State-owned energy firm",90]]],
 ["Absolute poverty","Relative poverty",[["Income below a fixed international line",10],["Unable to meet basic needs",15],["Income below 60% of the median",80]]],
 ["Demand-side policy","Supply-side policy",[["Cutting the policy interest rate",8],["A temporary tax rebate",20],["Infrastructure spending",55],["Training subsidies",85]]]];
function iqS(){S.iq=S.iq&&typeof S.iq==="object"?S.iq:{};["diary","graph","frayer","cross","cont","cases"].forEach(k=>{if(!S.iq[k]||typeof S.iq[k]!=="object")S.iq[k]={}});return S.iq}
function inquiryTools(){iqS();const cur=IQTOOLS.find(t=>t[0]===IQ.tool)||IQTOOLS[0];
 return H.pageHead("Think","Inquiry tools","Six ways to think with the key concepts rather than about them. Your work is kept on this device, in your profile, and prints on its own.")
 +`<section class="sec"><div class="wrap"><div class="cl-tabs" role="tablist" aria-label="Inquiry tools">${IQTOOLS.map(([k,n])=>`<button role="tab" aria-selected="${IQ.tool===k}" class="${IQ.tool===k?"on":""}" onclick="IQ.tool='${k}';render()">${n}</button>`).join("")}</div>
  <div class="iq mt4">${({diary:iqDiary,graph:iqGraph,frayer:iqFrayer,cross:iqCross,cont:iqCont,cases:iqCases})[cur[0]]()}</div>
  <p class="xs mt3">${srcTag("tsm","Concept-based tools of the kind the teacher support material describes; built for this platform")} ${srcTag("platform")} Prompts and the platform's own notes are original.</p></div></section>`}
const iqKcSel=(id,val,on)=>`<select id="${id}" class="inp" onchange="${on}">${KCN.map(k=>`<option ${k===val?"selected":""}>${esc(k)}</option>`).join("")}</select>`;
/* 1 · concept diary */
function iqDiary(){const d=iqS().diary[IQ.kc]||[],here=lsCodes().filter(c=>SPINE[c]&&SPINE[c].kc.some(k=>k.c===IQ.kc));
 return `<div class="iq-head"><div><h2>Concept diary</h2><p class="sm mt1">After each lesson, write one sentence on what it showed you about a key concept. Over a year the entries become your own account of the concept.</p></div>
  <div class="gl-f"><label class="eb" for="iqkc">Concept</label>${iqKcSel("iqkc",IQ.kc,"IQ.kc=this.value;render()")}</div></div>
 <div class="iq-g mt3"><div class="ls-panel"><div class="eb">A new entry</div>
   <label class="eb mt2" for="iqsub">Lesson</label><select id="iqsub" class="inp mt1">${lsVisible().map(s=>`<option value="${s.code}">${esc(s.code+" "+s.title)}</option>`).join("")}</select>
   <label class="eb mt2" for="iqtxt">What this lesson showed me about ${esc(IQ.kc)}</label><textarea id="iqtxt" class="inp mt1" rows="3"></textarea>
   <button class="btn sm mt2" onclick="iqDiaryAdd()">Add to the diary</button>
   ${here.length?`<details class="mt3"><summary>The platform's notes on ${esc(IQ.kc)} (${here.length} lessons)</summary><ul class="ls-list mt2">${here.map(c=>`<li><strong>${esc(c)}</strong> ${esc(SPINE[c].kc.find(k=>k.c===IQ.kc).here)}</li>`).join("")}</ul></details>`:""}</div>
  <div class="ls-panel"><div class="row" style="justify-content:space-between"><div class="eb">Your entries (${d.length})</div>${d.length?`<button class="btn xs gh" onclick="iqPrint('diary')">Print</button>`:""}</div>
   ${d.length?`<ol class="iq-list mt2">${d.map((e,i)=>`<li><span class="xs">${esc(e.d)} · ${esc(e.sub)}</span><p class="sm">${esc(e.t)}</p><button class="lnk xs" onclick="iqS().diary['${esc(IQ.kc)}'].splice(${i},1);save();render()">Remove</button></li>`).join("")}</ol>`:`<p class="sm mt2">No entries yet.</p>`}</div></div>`}
function iqDiaryAdd(){const t=(document.getElementById("iqtxt")||{}).value||"",sub=(document.getElementById("iqsub")||{}).value||"";if(!t.trim())return toast("Write the entry first");
 const D=iqS().diary;D[IQ.kc]=D[IQ.kc]||[];D[IQ.kc].push({d:nowd(),sub,t:t.trim()});save();render()}
/* 2 · concept graph: place lessons on two concepts at once */
function iqGraph(){const G=iqS().graph,key=IQ.x+"|"+IQ.y,pts=G[key]=G[key]||{};const W=560,H2=420,P=48;
 const pos=v=>P+(v/10)*(W-2*P),posY=v=>H2-P-(v/10)*(H2-2*P);
 return `<div class="iq-head"><div><h2>Concept graph</h2><p class="sm mt1">Rate how strongly each lesson turns on two concepts, from 0 to 10. The plot shows where the course pulls them together and where it forces a choice between them.</p></div>
  <div class="row" style="gap:10px"><div class="gl-f"><label class="eb" for="iqx">Across</label>${iqKcSel("iqx",IQ.x,"IQ.x=this.value;render()")}</div><div class="gl-f"><label class="eb" for="iqy">Up</label>${iqKcSel("iqy",IQ.y,"IQ.y=this.value;render()")}</div></div></div>
 <div class="iq-g mt3"><figure class="ls-panel"><svg viewBox="0 0 ${W} ${H2}" class="iq-svg" role="img" aria-label="Lessons placed by ${esc(IQ.x)} across and ${esc(IQ.y)} up">
   <line x1="${P}" y1="${H2-P}" x2="${W-P}" y2="${H2-P}" class="ax"/><line x1="${P}" y1="${P}" x2="${P}" y2="${H2-P}" class="ax"/>
   <text x="${W-P}" y="${H2-P+30}" text-anchor="end">${esc(IQ.x)} →</text><text x="${P-8}" y="${P-14}" text-anchor="start">↑ ${esc(IQ.y)}</text>
   ${Object.entries(pts).filter(([,v])=>v&&v.x!==undefined&&v.y!==undefined).map(([c,v])=>`<g><circle cx="${pos(v.x).toFixed(1)}" cy="${posY(v.y).toFixed(1)}" r="5"/><text x="${(pos(v.x)+8).toFixed(1)}" y="${(posY(v.y)+4).toFixed(1)}">${esc(c)}</text></g>`).join("")}</svg></figure>
  <div class="ls-panel iq-rate"><table class="t"><thead><tr><th>Lesson</th><th>${esc(IQ.x)}</th><th>${esc(IQ.y)}</th></tr></thead><tbody>${lsVisible().map(s=>{const v=pts[s.code]||{};
   return `<tr><td>${esc(s.code)} <span class="xs">${esc(s.title)}</span></td>${["x","y"].map(a=>`<td><input class="inp iq-n" type="number" min="0" max="10" step="1" aria-label="${esc(s.code)} ${a==="x"?esc(IQ.x):esc(IQ.y)}" value="${v[a]===undefined?"":v[a]}"
    onchange="const g=iqS().graph['${esc(key)}']=iqS().graph['${esc(key)}']||{};g['${s.code}']=g['${s.code}']||{};const n=this.value===''?undefined:Math.max(0,Math.min(10,+this.value));g['${s.code}'].${a}=n;save();render()"></td>`).join("")}</tr>`}).join("")}</tbody></table></div></div>`}
/* 3 · Frayer model */
function iqFrayer(){const g=GLBY[String(IQ.term).toLowerCase()]||GLOSS2[0]||{term:""},F=iqS().frayer[g.term]=iqS().frayer[g.term]||{},show=F.show;
 const box=(k,h,ph)=>`<div class="fr-b"><label class="eb" for="fr-${k}">${h}</label><textarea id="fr-${k}" class="inp mt1" rows="4" placeholder="${ph}" onchange="iqS().frayer[${esc(JSON.stringify(g.term))}].${k}=this.value;save()">${esc(F[k]||"")}</textarea></div>`;
 return `<div class="iq-head"><div><h2>Frayer model</h2><p class="sm mt1">Four boxes around one term: a definition in your words, its essential characteristics, examples and, hardest, non-examples that look similar but are not.</p></div>
  <div class="gl-f"><label class="eb" for="frterm">Term</label><select id="frterm" class="inp" onchange="IQ.term=this.value;render()">${GLOSS2.map(x=>`<option ${x.term===g.term?"selected":""}>${esc(x.term)}</option>`).join("")}</select></div></div>
 <div class="fr mt3">${box("def","Definition, in your words","Say it without looking")}${box("char","Essential characteristics","What must be true for something to count?")}
  <div class="fr-c"><span>${esc(g.term)}</span></div>${box("ex","Examples","Two or three, from different markets or countries")}${box("non","Non-examples","Close cases that do not count, and why")}</div>
 <div class="row mt3" style="gap:8px"><button class="btn sm gh" onclick="iqS().frayer[${esc(JSON.stringify(g.term))}].show=!${!!show};save();render()">${show?"Hide":"Compare with"} the glossary</button><button class="btn sm gh" onclick="iqPrint('frayer')">Print</button></div>
 ${show?`<div class="ls-panel mt3"><div class="eb">The glossary ${srcTag("platform")}</div><p class="sm mt1"><strong>Definition:</strong> ${esc(g.def)}</p><p class="sm mt1"><strong>Example:</strong> ${esc(g.ex||"")}</p><p class="sm mt1"><strong>Common confusion:</strong> ${esc(g.confusion||"")}</p></div>`:""}`}
/* 4 · cross-comparison chart: one concept across the lessons that use it */
function iqCross(){const here=lsCodes().filter(c=>SPINE[c]&&SPINE[c].kc.some(k=>k.c===IQ.kc)),C=iqS().cross[IQ.kc]=iqS().cross[IQ.kc]||{};
 return `<div class="iq-head"><div><h2>Cross-comparison chart</h2><p class="sm mt1">One concept, read across every lesson that uses it: how it appears, where it creates a tension, and your own example. Patterns across the rows are what a strong evaluation draws on.</p></div>
  <div class="gl-f"><label class="eb" for="iqck">Concept</label>${iqKcSel("iqck",IQ.kc,"IQ.kc=this.value;render()")}</div></div>
 <div class="scrollx mt3"><table class="t iq-t"><thead><tr><th>Lesson</th><th>How ${esc(IQ.kc)} appears <span class="xs">(platform)</span></th><th>Where it creates a tension <span class="xs">(platform)</span></th><th>Your example</th></tr></thead>
  <tbody>${here.map(c=>{const k=SPINE[c].kc.find(x=>x.c===IQ.kc);return `<tr><td><button class="lnk" onclick="${lsGoSub(c)}">${esc(c)}</button></td><td>${esc(k.here)}</td><td>${esc(k.tension)}</td>
   <td><textarea class="inp" rows="2" aria-label="Your example for ${esc(c)}" onchange="iqS().cross['${esc(IQ.kc)}']['${c}']=this.value;save()">${esc(C[c]||"")}</textarea></td></tr>`}).join("")}</tbody></table></div>
 <button class="btn sm gh mt3" onclick="iqPrint('cross')">Print</button>`}
/* 5 · continuum of examples */
function iqCont(){const [L,R,seed]=IQCONT[IQ.cont]||IQCONT[0],K=iqS().cont[IQ.cont]=iqS().cont[IQ.cont]||{items:seed.map(([t,v])=>({t,v,mine:false}))};
 return `<div class="iq-head"><div><h2>Continuum of examples</h2><p class="sm mt1">Most economic categories are ends of a scale, not boxes. Place examples along it, add your own, and defend each position in a sentence.</p></div>
  <div class="gl-f"><label class="eb" for="iqcn">Continuum</label><select id="iqcn" class="inp" onchange="IQ.cont=+this.value;render()">${IQCONT.map((c,i)=>`<option value="${i}" ${IQ.cont===i?"selected":""}>${esc(c[0])} ↔ ${esc(c[1])}</option>`).join("")}</select></div></div>
 <div class="cont mt4"><div class="cont-ends"><span>${esc(L)}</span><span>${esc(R)}</span></div><div class="cont-line">${K.items.map(it=>`<span class="cont-dot${it.mine?" mine":""}" style="left:${it.v}%" title="${esc(it.t)}"></span>`).join("")}</div></div>
 <ul class="cont-list mt3">${K.items.map((it,i)=>`<li><span>${esc(it.t)}${it.mine?"":` <span class="xs">(starting position)</span>`}</span>
   <input type="range" min="0" max="100" value="${it.v}" aria-label="Position of ${esc(it.t)}" onchange="iqS().cont[${IQ.cont}].items[${i}].v=+this.value;save();render()">
   <button class="lnk xs" onclick="iqS().cont[${IQ.cont}].items.splice(${i},1);save();render()">Remove</button></li>`).join("")}</ul>
 <div class="row mt3" style="gap:8px"><input id="iqci" class="inp" style="max-width:320px" placeholder="Add an example…" aria-label="A new example"><button class="btn sm" onclick="iqContAdd()">Add</button>
  <button class="btn sm gh" onclick="iqPrint('cont')">Print</button></div>`}
function iqContAdd(){const e=document.getElementById("iqci");const t=e&&e.value.trim();if(!t)return;iqS().cont[IQ.cont].items.push({t,v:50,mine:true});save();render()}
/* 6 · real-world case comparison */
const IQCOLS=[["policy","Policy"],["objective","Objective"],["conditions","Conditions at the time"],["expected","Expected effect"],["observed","Observed effect"],["stakeholders","Stakeholders"],["evidence","Evidence"],["limits","Limitations"],["judgement","Evaluation"]];
function iqCases(){const X=iqS().cases,sel=IQ.cases.map(id=>(typeof RW_CASES!=="undefined"?RW_CASES:[]).find(c=>c.id===id)).filter(Boolean);
 return `<div class="iq-head"><div><h2>Real-world case comparison</h2><p class="sm mt1">Three cases side by side on the same questions; the starting set is three price floors in three countries and three markets. The case's own facts are shown for reference; the analysis is yours. Where evidence is mixed, say so.</p></div></div>
 <div class="row mt3" style="gap:8px;flex-wrap:wrap">${[0,1,2].map(i=>`<select class="inp" style="max-width:300px" aria-label="Case ${i+1}" onchange="IQ.cases[${i}]=this.value;render()">${(typeof RW_CASES!=="undefined"?RW_CASES:[]).map(c=>`<option value="${c.id}" ${IQ.cases[i]===c.id?"selected":""}>${esc(c.c+" · "+c.t)}</option>`).join("")}</select>`).join("")}</div>
 <div class="scrollx mt3"><table class="t iq-t"><thead><tr><th></th>${sel.map(c=>`<th><button class="lnk" onclick="rwOpen('${c.id}')">${esc(c.t)}</button><span class="xs"> ${esc(c.c)}, ${esc(String(c.y))}</span></th>`).join("")}</tr></thead>
  <tbody><tr><th scope="row">The issue <span class="xs">(case)</span></th>${sel.map(c=>`<td class="sm">${esc(c.is||"")}</td>`).join("")}</tr>
  ${IQCOLS.map(([k,n])=>`<tr><th scope="row">${n}</th>${sel.map(c=>`<td><textarea class="inp" rows="2" aria-label="${n}: ${esc(c.t)}" onchange="const X=iqS().cases;X['${c.id}']=X['${c.id}']||{};X['${c.id}'].${k}=this.value;save()">${esc((X[c.id]||{})[k]||"")}</textarea></td>`).join("")}</tr>`).join("")}</tbody></table></div>
 <button class="btn sm gh mt3" onclick="iqPrint('cases')">Print</button>`}
function iqPrint(k){const Q=iqS();let body="",title="";
 if(k==="diary"){title=`Concept diary · ${IQ.kc}`;body=`<ol class="pl">${(Q.diary[IQ.kc]||[]).map(e=>`<li><strong>${esc(e.sub)}</strong> (${esc(e.d)}) ${esc(e.t)}</li>`).join("")}</ol>`}
 else if(k==="frayer"){const F=Q.frayer[IQ.term]||{};title=`Frayer model · ${IQ.term}`;body=`<table class="ptbl"><tbody><tr><td><strong>Definition</strong><br>${esc(F.def||"")}</td><td><strong>Characteristics</strong><br>${esc(F.char||"")}</td></tr><tr><td><strong>Examples</strong><br>${esc(F.ex||"")}</td><td><strong>Non-examples</strong><br>${esc(F.non||"")}</td></tr></tbody></table>`}
 else if(k==="cross"){title=`Cross-comparison · ${IQ.kc}`;const C=Q.cross[IQ.kc]||{};body=`<table class="ptbl"><thead><tr><th>Lesson</th><th>How it appears</th><th>Tension</th><th>My example</th></tr></thead><tbody>${lsCodes().filter(c=>SPINE[c]&&SPINE[c].kc.some(x=>x.c===IQ.kc)).map(c=>{const x=SPINE[c].kc.find(y=>y.c===IQ.kc);return `<tr><td>${esc(c)}</td><td>${esc(x.here)}</td><td>${esc(x.tension)}</td><td>${esc(C[c]||"")}</td></tr>`}).join("")}</tbody></table>`}
 else if(k==="cont"){const [L,R]=IQCONT[IQ.cont],K=Q.cont[IQ.cont]||{items:[]};title=`Continuum · ${L} to ${R}`;body=`<table class="ptbl"><tbody>${K.items.slice().sort((a,b)=>a.v-b.v).map(it=>`<tr><td>${esc(it.t)}</td><td>${it.v}/100 towards ${esc(R)}</td></tr>`).join("")}</tbody></table>`}
 else if(k==="cases"){title="Real-world case comparison";const sel=IQ.cases.map(id=>RW_CASES.find(c=>c.id===id)).filter(Boolean);
  body=`<table class="ptbl"><thead><tr><th></th>${sel.map(c=>`<th>${esc(c.t)}</th>`).join("")}</tr></thead><tbody>${IQCOLS.map(([kk,n])=>`<tr><td><strong>${n}</strong></td>${sel.map(c=>`<td>${esc(((Q.cases||{})[c.id]||{})[kk]||"")}</td>`).join("")}</tr>`).join("")}</tbody></table>`}
 printDoc(title,`<div class="psheet">${body}</div>`,"Inquiry tool · student work",{kind:"sheet"})}
(function(){const t=SECTIONS.find(s=>s.v==="think");if(t&&t.tabs&&!t.tabs.includes("Inquiry tools"))t.tabs.push("Inquiry tools");
 const prev=VIEWS.think;if(typeof prev!=="function")return;
 VIEWS.think=function(){const s=SECTIONS.find(x=>x.v==="think");if(s&&TAB===s.tabs.indexOf("Inquiry tools"))return COURSE_OK?inquiryTools():H.pageHead("Think","Inquiry tools","These tools read the lessons from assets/data/course.js, which this copy of the page was opened without.");return prev.apply(this,arguments)}})();
