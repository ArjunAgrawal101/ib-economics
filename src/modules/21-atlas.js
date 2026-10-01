/* ═══════════════════════════════════════════════════════════════════════════
   DIAGRAM ATLAS 2.0 · THE CALCULATION CENTRE
   Every plate gains eight views: Explore (the plate and its interactive lab),
   Build (the plate assembled layer by layer from its own geometry, so nothing
   drawn can drift from the model), Explain, Exam (what must be labelled, read
   from the plate itself), Common mistake, Limitations, Real world (the cases
   that use the plate) and Print (a clean sheet).
   Every calculation gains the fields it lacked: when to use it, the lesson it
   belongs to, the related diagrams and concept, an exam-style question, a
   real-world use and a retrieval question. The live check was already there.
   ═══════════════════════════════════════════════════════════════════════════ */
const ATX={step:{}};
const DGLAB={ds:[0,"Market lab"],dshift:[0,"Market lab"],sshift:[0,"Market lab"],tax:[0,"Market lab"],subsidy:[0,"Market lab"],ceiling:[0,"Market lab"],floor:[0,"Market lab"],
 adas:[1,"AD-AS lab"],defgap:[1,"AD-AS lab"],infgap:[1,"AD-AS lab"],lras:[1,"AD-AS lab"],growth:[1,"AD-AS lab"],costpush:[1,"AD-AS lab"],ped:[-1,"Elasticity lab"],pes:[-1,"Elasticity lab"]};
const DGBUILD={tax:"tax",negcons:"ext",defgap:"adas",tariff:"tariff"};
const ATSTEPS=[["Axes","Draw and name both axes: the variable and its units, not only “price” and “quantity”."],
 ["Curves","Add the curves the model starts from, then any shifted curve, with its direction."],
 ["Guides","Drop dashed guides from each point to both axes, so every value can be read."],
 ["Points","Mark each equilibrium or reference point where two curves meet."],
 ["Areas","Shade the areas the question is about: revenue, surplus, burden or welfare loss."],
 ["Labels","Label every curve, point and value. An unlabelled line is not yet an argument."]];
function atLayers(k){const d=DG[k]();let els=[];
 try{const doc=new DOMParser().parseFromString(`<svg xmlns="http://www.w3.org/2000/svg"><g>${d.b}</g></svg>`,"image/svg+xml");
  els=[...doc.documentElement.firstChild.children].map(e=>{const s=new XMLSerializer().serializeToString(e).replace(/ xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g,"");
   const tag=e.tagName.toLowerCase(),first=tag==="g"&&e.firstElementChild?e.firstElementChild:e,ft=first.tagName.toLowerCase();
   const dash=(first.getAttribute("stroke-dasharray")||"")!==""||/dash/.test(first.getAttribute("class")||"");
   const op=parseFloat(first.getAttribute("fill-opacity")||first.getAttribute("opacity")||"1");
   /* a long dashed line is a shifted curve, not a guide to an axis */
   const span=(()=>{if(ft==="line"){const a=+first.getAttribute("x1"),b=+first.getAttribute("x2"),c=+first.getAttribute("y1"),e2=+first.getAttribute("y2");return Math.min(Math.abs(a-b),Math.abs(c-e2))}
     const n=(first.getAttribute("d")||"").match(/-?\d+(\.\d+)?/g)||[];if(n.length<4)return 0;const xs=n.filter((_,i)=>i%2===0).map(Number),ys=n.filter((_,i)=>i%2===1).map(Number);
     return Math.min(Math.max(...xs)-Math.min(...xs),Math.max(...ys)-Math.min(...ys))})();
   let kind=ft==="text"||(tag==="g"&&[...e.children].every(x=>/text|rect/.test(x.tagName)))?5
    :ft==="circle"?3:(ft==="polygon"||(ft==="path"&&first.getAttribute("fill")&&first.getAttribute("fill")!=="none"&&op<1))?4:dash&&span<60?2:1;
   return {s,kind,txt:e.textContent.trim()}})}catch(e){}
 return {d,els}}
function atBuildHtml(k){const {d,els}=atLayers(k),n=ATX.step[k]||0;
 const body=els.filter(e=>e.kind<=n).map(e=>e.s).join("");
 return `<div class="at-build"><figure class="at-fig">${frame(body,d.x,d.y,{alt:`${d.t}: step ${n+1} of 6, ${ATSTEPS[n][0].toLowerCase()}`})}</figure>
  <div><ol class="at-steps">${ATSTEPS.map(([h,t],i)=>`<li class="${i===n?"on":i<n?"done":""}"><button onclick="ATX.step['${k}']=${i};lsSwap('at-build',atBuildHtml('${k}'))"><strong>${i+1}. ${h}</strong><span class="xs">${t}</span></button></li>`).join("")}</ol>
  <div class="row mt3" style="gap:6px"><button class="btn xs gh" ${n===0?"disabled":""} onclick="ATX.step['${k}']=${Math.max(0,n-1)};lsSwap('at-build',atBuildHtml('${k}'))">← Back</button>
   <button class="btn xs" ${n===5?"disabled":""} onclick="ATX.step['${k}']=${Math.min(5,n+1)};lsSwap('at-build',atBuildHtml('${k}'))">Next step →</button></div>
  <p class="xs mt2">Built from the plate's own geometry, in the order an answer should draw it. Draw each step on paper before you reveal it.</p></div></div>`}
function atLabels(k){const {d,els}=atLayers(k);
 const t=[...new Set(els.filter(e=>e.kind===5||/text/.test(e.s)).map(e=>e.txt).filter(x=>x&&x.length<=34))];
 return {axes:[d.y,d.x].filter(Boolean),labels:t}}
function atlasPlus(k){if(!DG[k])return "";const d=DG[k](),R=(typeof DG_READ!=="undefined"&&DG_READ[k])||{},L=atLabels(k),lab=DGLAB[k];
 const cases=(typeof RW_CASES!=="undefined"?RW_CASES:[]).filter(c=>(c.dg||[]).includes(k)).slice(0,6);
 const lim=(typeof GD!=="undefined"&&GD[k]&&GD[k].limit)||R.notShown||"";
 const sub=DGSUB[k],sp=SPINE[sub]||{},md=(sp.models||[]).find(m=>m.dg===k);
 return `<section class="sec atl2" aria-labelledby="atl2-h"><div class="wrap md"><div class="shead"><span class="n">··</span><h2 id="atl2-h">Explore, build, explain</h2><span class="aside">Atlas 2.0 · ${esc(d.t)}</span></div>
  <div class="atl2-g">
   <div class="atl2-c"><div class="eb">Explore</div><p class="sm mt1">The plate above is drawn from its equations, and every point is checked to sit on its curve.</p>
    ${lab?`<button class="btn xs mt2" onclick="${lab[0]<0?`nav('lab',SECTIONS.find(s=>s.v==='lab').tabs.indexOf('Elasticity lab'))`:`nav('lab',${lab[0]})`}">Move it in the ${esc(lab[1])} →</button>`:""}
    ${sub?`<button class="btn xs gh mt2" onclick="${lsGoSub(sub)}">The lesson: ${esc(sub)} ${esc(lsTitle(sub))}</button>`:""}</div>
   <div class="atl2-c"><div class="eb">Exam: what must be labelled</div><p class="sm mt1"><strong>Axes:</strong> ${esc(L.axes.join(" · "))}</p>
    <p class="sm mt1"><strong>On the plate:</strong> ${esc(L.labels.slice(0,14).join(" · "))}</p>
    ${md?`<p class="xs mt2">${esc(md.exam)}</p>`:""}</div>
   <div class="atl2-c"><div class="eb">Common mistake</div><p class="sm mt1">${esc(R.mistake||(md&&md.misconception)||"")}</p></div>
   <div class="atl2-c"><div class="eb">Limitations</div><p class="sm mt1">${esc(lim)}</p>${md&&(md.limitations||[]).length?`<ul class="ls-list mt1">${md.limitations.slice(0,3).map(x=>`<li class="xs">${esc(x)}</li>`).join("")}</ul>`:""}</div>
  </div>
  <h3 class="ls-h3 ls-gap">Build it, step by step</h3><div id="at-build">${atBuildHtml(k)}</div>
  ${(DGBUILD[k])?`<p class="xs mt2">This plate also has a decision-by-decision builder: <button class="lnk" onclick="DB.model='${DGBUILD[k]}';nav('lab',6)">build it by making the choices</button>.</p>`:""}
  <h3 class="ls-h3 ls-gap">Real world</h3>${cases.length?`<div class="ls-cases">${cases.map(x=>`<button class="ls-case" onclick="rwOpen('${x.id}')"><span class="ls-cy">${esc(x.c)} · ${esc(String(x.y))}</span><strong>${esc(x.t)}</strong></button>`).join("")}</div>`
   :`<p class="sm">${md?esc(md.real):"No Real World case uses this plate yet."}</p>`}
  <div class="row mt4" style="gap:8px"><button class="btn sm" onclick="dgPrint('${k}')">Print the diagram sheet</button></div>
 </div></section>`}
function dgPrint(k){const d=DG[k](),R=(typeof DG_READ!=="undefined"&&DG_READ[k])||{},L=atLabels(k);
 printDoc(d.t,`<div class="psheet pdg"><div class="pdg-fig">${frame(d.b,d.x,d.y,{alt:d.alt})}</div>
  ${(d.facts||[]).length?`<table class="ptbl"><tbody>${d.facts.map(([a,b])=>`<tr><td>${esc(a)}</td><td>${esc(b)}</td></tr>`).join("")}</tbody></table>`:""}
  <h2>Label</h2><p>${esc(L.axes.join(" · "))} · ${esc(L.labels.join(" · "))}</p>
  ${R.changes?`<h2>What changes</h2><p>${esc(R.changes)}</p><h2>Why</h2><p>${esc(R.why)}</p><h2>What it does not show</h2><p>${esc(R.notShown)}</p><h2>The common mistake</h2><p>${esc(R.mistake)}</p>`:""}
  <h2>Draw it yourself</h2><div class="pdg-blank"></div></div>`,`Diagram sheet${DGSUB[k]?" · "+DGSUB[k]:""}`,{kind:"sheet"})}
(function(){if(typeof dgLibrary!=="function")return;const prev=dgLibrary;dgLibrary=function(){const h=prev.apply(this,arguments);return ARG&&DG[ARG]?h+atlasPlus(ARG):h}})();

/* ── the calculation card ── */
function calcPlus(c){const sub=c.sub,sp=SPINE[sub]||{},dgs=sub?lsDiagrams(sub):[];
 const pq=((sp.exam||{}).practice||[]).find(q=>/calculat|%|\$|data|table/i.test(q.q))||((sp.exam||{}).practice||[])[0];
 const rq=(sp.retrieve||[]).find(r=>/calculat|%|formula|rate|ratio|\d/.test(r.q))||(sp.retrieve||[])[0];
 const md=(sp.models||[])[0];
 return `<div class="wrap full sec t calc2"><div class="shead"><span class="n">··</span><h2>The calculation card</h2><span class="aside">When, where and why it is used</span></div>
  <div class="atl2-g">
   <div class="atl2-c"><div class="eb">When to use it</div><p class="sm mt1">${esc(c.m)} ${esc((sp.exam||{}).calc||"")}</p></div>
   <div class="atl2-c"><div class="eb">Units</div><p class="sm mt1">${c.inp.map(([k,n,u])=>`${esc(n)}${u?` (${esc(u)})`:""}`).join(" · ")}. The live check above states the unit of the answer with the answer.</p></div>
   ${sub?`<div class="atl2-c"><div class="eb">In the course</div><p class="sm mt1"><button class="lnk" onclick="${lsGoSub(sub)}">${esc(sub)} ${esc(lsTitle(sub))}</button></p>
    ${(sp.kc||[]).length?`<p class="xs mt1">Key concept: ${(sp.kc||[]).map(k=>esc(k.c)).join(", ")}</p>`:""}
    ${dgs.length?`<p class="xs mt1">Diagram: ${dgs.slice(0,2).map(k=>`<button class="lnk" onclick="nav('lab',3,'${k}')">${esc(DG[k]().t)}</button>`).join(", ")}</p>`:""}</div>`:""}
   ${md?`<div class="atl2-c"><div class="eb">Real-world use</div><p class="sm mt1">${esc(md.real)}</p></div>`:""}
  </div>
  ${pq?`<div class="panel mt4"><div class="eb">An exam-style question ${srcTag("platform")}</div><p class="sm mt2"><span class="tag">${esc(pq.p)}</span> ${esc(pq.q)}</p><p class="xs mt1">Original practice question; not a past paper, and no mark allocation is implied.</p></div>`:""}
  ${rq?`<details class="panel mt3"><summary><strong>Retrieve it:</strong> ${esc(rq.q)}</summary><p class="sm mt2">${esc(rq.a)}</p></details>`:""}
 </div>`}
(function(){if(typeof cbDetail!=="function")return;const prev=cbDetail;cbDetail=function(c){const h=prev.apply(this,arguments);try{return h+calcPlus(c)}catch(e){return h}}})();
