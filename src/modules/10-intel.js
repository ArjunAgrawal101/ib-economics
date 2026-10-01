/* ═══════════════════════════════════════════════════════════════════════════
   CASE INTELLIGENCE and MINDMAP CONNECTIONS
   A case opens with a one-screen brief (the event, the economic question,
   why it matters, the model, the theory, who gains and loses where the deep
   card records it, what the evaluation turns on, and the exam connection)
   compiled only from the case's own record. A mindmap node gains "go
   further" links drawn from the related-content graph the platform already
   holds for its subtopic. Nothing is written for either: both reorganise
   what exists.
   ═══════════════════════════════════════════════════════════════════════════ */
/* what kind of statement each part of the brief is, so interpretation is never read as fact */
const CI_KIND={fact:["Fact","What happened, as recorded"],q:["Question","The question the case poses"],interp:["Interpretation","Why it matters: a reading of the facts"],
 model:["Model","The economics used to explain it"],infer:["Inference","What follows for particular groups"],eval:["Evaluation","Where the judgement turns"],guide:["Teacher guidance","How to use it in an answer"]};
const ciK=k=>`<span class="ci-kind ci-${k}" title="${esA(CI_KIND[k][1])}">${CI_KIND[k][0]}</span>`;
function rwIntel(c){if(!c)return "";
 const dp=(typeof rwDeep==="function")?rwDeep(c.id):null,m=caseMotif(c);
 const dgs=(c.dg||[]).filter(k=>DG[k]);
 const who=dp&&Array.isArray(dp.stakeholders)?dp.stakeholders.slice(0,4):[];
 const against=dp&&Array.isArray(dp.cons)?dp.cons.slice(0,2):[];
 return `<section class="sec t ci" aria-label="Case intelligence"><div class="wrap full">
  <div class="ci-head"><span class="kicker">Case intelligence</span><span class="xs">Compiled from this case's own record${dp?" and its deep card":""}; the provenance panel below says how each part is sourced.</span></div>
  <div class="ci-grid">
   <div class="ci-col">
    <div class="ci-k">The event ${ciK("fact")}</div><p class="ci-ev">${esc([c.c,c.y,c.rg].filter(Boolean).join(" · "))}</p>
    ${c.q?`<div class="ci-k">The economic question ${ciK("q")}</div><p class="ci-q">${esc(c.q)}</p>`:""}
    ${c.is?`<div class="ci-k">Why it matters ${ciK("interp")}</div><p class="sm">${esc(c.is)}</p>`:""}
   </div>
   <figure class="ci-model"><div class="ci-k">The model ${ciK("model")}</div><span data-motif="${m}"></span>
    <figcaption class="sm">${esc(c.dgt||motifCap(m))}${dgs.includes("fx")&&/apprec/i.test(c.dgt||"")?`<span class="ci-note">The exchange-rate plate shows a fall in demand and a depreciation; this case runs the other way, so read the shift in reverse.</span>`:""}</figcaption>
    ${dgs.length?`<div class="row mt2">${dgs.map(k=>`<button class="btn xs gh" onclick="nav('lab',3,'${k}')">Diagram plate: ${esc(DG[k]().t||k)}</button>`).join("")}</div>`:""}</figure>
   <div class="ci-col">
    ${c.tp?`<div class="ci-k">The theory ${ciK("model")}</div><p class="sm">${esc(c.tp)}</p>`:""}
    ${who.length?`<div class="ci-k">Who gains, who loses ${ciK("infer")}</div><ul class="ci-who">${who.map(s=>`<li><b>${esc(s.who)}</b> ${esc(s.what)}</li>`).join("")}</ul>`:""}
    ${against.length?`<div class="ci-k">The case against ${ciK("eval")}</div><ul class="ci-who">${against.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`
      :c.ev?`<div class="ci-k">The evaluation turns on ${ciK("eval")}</div><p class="sm">${esc(c.ev)}</p>`:""}
    ${c.xp?`<div class="ci-k">Exam connection ${ciK("guide")}</div><p class="sm">${esc(c.xp)}</p>${(c.pp||[]).length?`<p class="xs mt1">Useful for: ${esc(c.pp.join(", "))}</p>`:""}`:""}
   </div></div></div></section>`}
(function(){if(typeof rwCasePage!=="function")return;const prev=rwCasePage;
 rwCasePage=function(){const h=prev.apply(this,arguments);let c=null;try{c=rwById(RWC.id)}catch(e){}if(!c)return h;
  const i=h.indexOf("</section>");return i<0?h:h.slice(0,i+10)+rwIntel(c)+h.slice(i+10)}})();
/* mindmap: from a node to the rest of the platform */
function mmFurther(n){if(!n||!n.sub)return "";let G=null;try{G=kgBuild()[n.sub]}catch(e){}if(!G)return "";
 const want=[["Related cases","See it in the real world"],["Related practice","Test yourself"],["Related videos","Watch"],["Economics, Everywhere","In everyday life"],["Related EE research","Research it"]];
 const node=Object.assign({sub:n.sub},G);
 const rows=want.map(([g,l])=>{const f=(KG_GROUPS.find(x=>x[0]===g)||[])[1];let it=[];try{it=(f?f(node):[]).filter(r=>r&&r[0]).slice(0,2)}catch(e){}return [l,it]}).filter(([,it])=>it.length);
 if(!rows.length)return "";
 return `<div class="mm-further mt4"><div class="eb">Go further from this node</div>
  <dl class="mmf">${rows.map(([l,it])=>`<div><dt>${esc(l)}</dt>${it.map(r=>`<dd><button class="lnk" onclick="${esA(r[1])}">${esc(r[0])}</button></dd>`).join("")}</div>`).join("")}</dl></div>`}
(function(){if(typeof mmExplore!=="function")return;const prev=mmExplore;
 const MARK='Marking a node sends it to your revision queue and your mistake book, on this device only.</p>';
 mmExplore=function(m){const h=prev.apply(this,arguments);const n=MM.focus?mmNode(m,MM.focus):null;
  if(!n||!h.includes(MARK))return h;return h.replace(MARK,MARK+mmFurther(n))}
 /* the mode table captured the original function when it was built, so it is pointed at the wrapper too */
 if(typeof MMBODY!=="undefined"&&MMBODY.explore===prev)MMBODY.explore=mmExplore})();
/* Links across the platform open a case as nav('world',0,id). When Real World
   was reorganised, tab 0 became the landing page and stopped reading its
   argument, so those links landed on the overview instead of the case. Tab 0
   with an argument now opens what the argument names: a case from the
   collection in the case reader, or one of the original worked stories in the
   tab that still shows them. The landing page is unchanged without one. */
(function(){if(!VIEWS.world)return;const prev=VIEWS.world;
 VIEWS.world=function(){
  if(TAB===0&&ARG){let c=null;try{c=rwById(ARG)}catch(e){}
   if(c){RWC.id=ARG;return rwCasePage()}
   if(typeof RW!=="undefined"&&Array.isArray(RW)&&RW.some(r=>r.id===ARG)){const k=TAB;TAB=9;try{return prev.apply(this,arguments)}finally{TAB=k}}}
  return prev.apply(this,arguments)}})();
