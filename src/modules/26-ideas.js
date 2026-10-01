/* ═══════════════════════════════════════════════════════════════════════════
   ECONOMISTS AND IDEAS · WHY DID THIS HAPPEN?
   The full text lives in assets/data/ideas.js and loads when a page needs it;
   lists, search and the self-tests use the resident index (IDEASIDX).
   ═══════════════════════════════════════════════════════════════════════════ */
const IDX={loading:false,err:false};
function ideasData(){
 if(window.__IDEAS__)return window.__IDEAS__;
 if(!IDX.loading&&!IDX.err&&!(typeof QARUNNING!=="undefined"&&QARUNNING)){IDX.loading=true;const s=document.createElement("script");s.src="assets/data/ideas.js";
  s.onload=()=>{IDX.loading=false;if(!window.__IDEAS__)IDX.err=true;render()};s.onerror=()=>{IDX.loading=false;IDX.err=true;render()};document.head.appendChild(s)}
 return null}
function idWait(what){return `<div class="dl-state mt4" role="status" aria-live="polite">${IDX.err?`<h2>This page could not be loaded</h2><p class="sm mt2">The text for ${esc(what)} is in a separate file that did not arrive. Check the connection and try again.</p><button class="btn sm mt3" onclick="IDX.err=false;render()">Try again</button>`:`<h2>Loading ${esc(what)}</h2><p class="sm mt2">The full text loads once and is then kept for offline use.</p>`}</div>`}
function idSubBtn(c){return typeof SUBMAP!=="undefined"&&SUBMAP[c]?`<button class="kcchip" onclick="${lsGoSub(c)}">${esc(c)} ${esc(SUBMAP[c].title)}</button>`:""}
function idTermBtn(t){const i=(typeof GLOSS2!=="undefined"?GLOSS2:[]).findIndex(g=>g.term===t);return i>=0?`<button class="kcchip" onclick="glOpen(${i})">${esc(t)}</button>`:`<span class="kcchip">${esc(t)}</span>`}
function idDgBtn(k){return typeof DG!=="undefined"&&DG[k]?`<button class="kcchip" onclick="nav('lab',3,'${k}')">${esc(DG[k]().t)}</button>`:""}
const IDF={kc:""};

/* ── Economists and ideas ── */
function econList(){const L=IDEASIDX.economists.filter(e=>!IDF.kc||e.kc.includes(IDF.kc));const eras=[...new Set(L.map(e=>e.era))];
 return H.pageHead("Ideas","Economists and ideas",`Sixteen economists whose ideas the course still uses: the problem each was answering, what they argued, what they assumed, and where their critics pushed back.`)
 +`<section class="sec"><div class="wrap"><div class="dl-filters"><label>Key concept<select onchange="IDF.kc=this.value;render()"><option value="">All nine</option>${["Scarcity","Choice","Efficiency","Equity","Economic well-being","Sustainability","Change","Interdependence","Intervention"].map(k=>`<option ${IDF.kc===k?"selected":""}>${k}</option>`).join("")}</select></label></div>
  ${eras.map(era=>`<h2 class="id-era mt5">${esc(era)}</h2><div class="id-grid mt3">${L.filter(e=>e.era===era).map(e=>`<button class="id-card" onclick="nav('ideas',0,'${e.id}')"><span class="id-life">${esc(e.life)}</span><span class="id-name">${esc(e.name)}</span><span class="id-head">${esc(e.headline)}</span><span class="id-kc">${e.kc.map(esc).join(" · ")}</span></button>`).join("")}</div>`).join("")}
  <p class="xs mt4">${srcTag("platform")} Original profiles written for this platform. Dates, works and prizes are limited to those the writers could confirm; ideas are explained, not endorsed.</p></div></section>`}
function econPage(id){const D=ideasData(),ix=IDEASIDX.economists.find(e=>e.id===id);if(!ix)return econList();
 if(!D)return H.pageHead("Ideas",ix.name,ix.headline)+`<section class="sec"><div class="wrap">${idWait("this profile")}</div></section>`;
 const e=D.economists.find(x=>x.id===id),i=IDEASIDX.economists.indexOf(ix),prev=IDEASIDX.economists[i-1],next=IDEASIDX.economists[i+1];
 const blk=(h,b)=>`<section class="id-sec"><h2 class="ls-h2">${h}</h2>${b}</section>`;
 return H.pageHead("Ideas",e.name,e.headline)
 +`<section class="sec"><div class="wrap id-page"><div class="id-meta"><span>${esc(e.life)}</span><span>${esc(e.era)}</span>${e.honours?`<span>${esc(e.honours)}</span>`:""}</div>
  <div class="id-cols"><div>
   ${blk("The problem they faced",`<p>${esc(e.context)}</p>`)}
   ${blk("Central ideas",`<ol class="id-ideas">${e.ideas.map(x=>`<li><h3>${esc(x.h)}</h3><p class="mt1">${esc(x.p)}</p></li>`).join("")}</ol>`)}
   ${blk("The lasting contribution",`<p>${esc(e.contribution)}</p>`)}
   ${blk("What the models assume",`<ul class="ls-list">${e.assumptions.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`)}
   ${blk("Influence",`<p>${esc(e.influence)}</p>`)}
   ${blk("Criticisms and limits",`<ul class="ls-list">${e.criticisms.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`)}
   ${blk("Why it still matters",`<p>${esc(e.modern)}</p>`)}
  </div><aside class="id-side">
   <div class="id-box"><div class="eb">A common misreading</div><p class="sm mt1">${esc(e.misread)}</p></div>
   <div class="id-box"><div class="eb">Investigate</div><p class="sm mt1">${esc(e.question)}</p></div>
   <div class="id-box"><div class="eb">Key works</div><ul class="ls-list mt1">${e.works.map(w=>`<li><em>${esc(w.t)}</em> (${esc(String(w.y))})</li>`).join("")}</ul></div>
   <div class="id-box"><div class="eb">In the course</div><div class="id-chips mt1">${e.subs.map(idSubBtn).join("")}</div></div>
   <div class="id-box"><div class="eb">Key concepts and terms</div><div class="id-chips mt1">${e.kc.map(k=>`<span class="kcchip">${esc(k)}</span>`).join("")}${e.terms.map(idTermBtn).join("")}</div></div>
   ${e.dg.length?`<div class="id-box"><div class="eb">Diagrams</div><div class="id-chips mt1">${e.dg.map(idDgBtn).join("")}</div></div>`:""}
   <div class="id-box"><div class="eb">Connected thinkers</div><ul class="ls-list mt1">${e.connects.map(c=>{const o=IDEASIDX.economists.find(x=>x.id===c.id);return o?`<li><button class="lnk" onclick="nav('ideas',0,'${o.id}')">${esc(o.name)}</button>: ${esc(c.why)}</li>`:""}).join("")}</ul></div>
  </aside></div>
  <nav class="ls-nav mt5" aria-label="Other economists">${prev?`<button class="btn gh sm" onclick="nav('ideas',0,'${prev.id}')">← ${esc(prev.name)}</button>`:"<span></span>"}<button class="btn gh sm" onclick="nav('ideas',0)">All economists</button>${next?`<button class="btn gh sm" onclick="nav('ideas',0,'${next.id}')">${esc(next.name)} →</button>`:"<span></span>"}</nav>
  <p class="xs mt3">${srcTag("platform")} Original writing. Version ${esc((D.version||""))}.</p></div></section>`}
function econTimeline(){const L=IDEASIDX.economists,now=2026,y0=1720,y1=now,W=760,rowH=26,lab=170,HH=L.length*rowH+40,sx=y=>lab+(y-y0)/(y1-y0)*(W-lab-12);
 const ticks=[1750,1800,1850,1900,1950,2000];
 return H.pageHead("Ideas","How ideas connect",`Lifespans on one axis, and the conversations between them: who was answering whom.`)
 +`<section class="sec"><div class="wrap"><div class="scrollx" tabindex="0" role="region" aria-label="Timeline of economists"><svg class="id-tl" viewBox="0 0 ${W} ${HH}" role="group" aria-label="Timeline of sixteen economists, from Adam Smith (born 1723) to Esther Duflo (born 1972)">
  ${ticks.map(t=>`<line x1="${sx(t)}" x2="${sx(t)}" y1="8" y2="${HH-24}" class="dl-grid"/><text x="${sx(t)}" y="${HH-8}" class="dl-tick" text-anchor="middle">${t}</text>`).join("")}
  ${L.map((e,i)=>{const a=e.years[0],b=e.years[1]||now,y=14+i*rowH;return `<a href="#/ideas/economists/${e.id}" onclick="event.preventDefault();nav('ideas',0,'${e.id}')"><text x="${lab-8}" y="${y+12}" text-anchor="end" class="id-tl-n">${esc(e.name)}</text>
   <rect x="${sx(a)}" y="${y+3}" width="${Math.max(4,sx(b)-sx(a))}" height="12" rx="2" class="${e.years[1]?"id-tl-b":"id-tl-l"}"/></a>`}).join("")}</svg></div>
  <p class="xs mt2">Bars run from birth to death; an open-ended bar is a living economist. Select a name to open the profile.</p>
  <div class="id-pairs mt4">${L.filter(e=>e.subs).map(e=>`<div><div class="eb">${esc(e.name)}</div><p class="sm mt1">${esc(e.headline)}</p></div>`).join("")}</div></div></section>`}

/* ── Why did this happen? ── */
function whyS(id){S.why=S.why&&typeof S.why==="object"?S.why:{};return S.why[id]=S.why[id]||{pred:{},shown:false,step:0}}
const WHYSTEPS=[["event","What happened"],["initial","The starting conditions"],["mechanism","The mechanism"],["agents","Who acts"],["diagram","The diagram"],["variables","What changes"],["short","In the short run"],["long","In the longer run"],["evidence","The evidence"],["evaluation","Evaluation"],["alternatives","Other explanations"]];
function whyList(){return H.pageHead("Think","Why did this happen?",`Eleven questions about real economic events, each worked as reasoning rather than recall: event, conditions, mechanism, diagram, effects, evidence, evaluation, and the explanations you would need to rule out.`)
 +`<section class="sec"><div class="wrap"><div class="id-grid">${IDEASIDX.causal.map(c=>{const st=(S.why||{})[c.id];return `<button class="id-card why-card" onclick="nav('think',WHYTAB(),'${c.id}')"><span class="id-life">Unit ${c.unit}${c.hl?" · includes HL":""}</span><span class="id-name">${esc(c.q)}</span><span class="id-kc">${c.subs.map(esc).join(" · ")} · ${c.kc.map(esc).join(" · ")}</span>${st&&st.step>=WHYSTEPS.length?`<span class="xs">Worked through</span>`:""}</button>`}).join("")}</div>
  <p class="xs mt4">${srcTag("platform")} Original reasoning pathways. Evidence is described, not quantified; where a Real World case illustrates a step, it is linked.</p></div></section>`}
function whyStep(c,k){const D=c;switch(k){
 case "mechanism":return `<ol class="why-chain">${D.mechanism.map(x=>`<li>${esc(x)}</li>`).join("")}</ol>`;
 case "agents":return `<dl class="why-agents">${D.agents.map(a=>`<div><dt>${esc(a.who)}</dt><dd>${esc(a.what)}</dd></div>`).join("")}</dl>`;
 case "diagram":{let f="";[D.dg,D.dg2].filter(Boolean).forEach(k2=>{if(DG[k2]){try{const d=DG[k2]();f+=`<figure class="ls-fig">${frame(d.b,d.x,d.y,{alt:d.alt})}<figcaption class="xs">${esc(d.t)} · <button class="lnk" onclick="nav('lab',3,'${k2}')">build it in the atlas</button></figcaption></figure>`}catch(e){}}});
  return `<div class="why-dg">${f}<p>${esc(D.diagram)}</p></div>`}
 case "variables":{const P=whyS(D.id).pred;return `<table class="ptbl why-vars"><thead><tr><th scope="col">Variable</th><th scope="col">Your prediction</th><th scope="col">Direction</th><th scope="col">Why</th></tr></thead><tbody>${D.variables.map((v,i)=>`<tr><th scope="row">${esc(v.v)}</th><td>${P[i]?`${WHYDIR[P[i]]}${P[i]===v.dir?" <span class='why-ok'>✓</span>":" <span class='why-no'>✗</span>"}`:"–"}</td><td>${WHYDIR[v.dir]}</td><td>${esc(v.why)}</td></tr>`).join("")}</tbody></table>`}
 case "evidence":return `<p>${esc(D.evidence)}</p>${D.cases.length?`<div class="id-chips mt2">${D.cases.map(id=>{const x=(typeof RW_CASES!=="undefined"?RW_CASES:[]).find(y=>y.id===id);return x?`<button class="kcchip" onclick="rwOpen('${x.id}')">${esc(x.t)} · ${esc(x.c)}</button>`:""}).join("")}</div>`:""}`;
 case "evaluation":return `<ul class="ls-list">${D.evaluation.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`;
 case "alternatives":return D.alternatives.map(a=>`<div class="why-alt"><h3>${esc(a.h)}</h3><p class="mt1">${esc(a.p)}</p><p class="sm mt1"><strong>How to tell:</strong> ${esc(a.test)}</p></div>`).join("");
 default:return `<p>${esc(D[k])}</p>`}}
const WHYDIR={up:"↑ rises",down:"↓ falls",ambiguous:"↕ depends"};
function whyPage(id){const ix=IDEASIDX.causal.find(c=>c.id===id);if(!ix)return whyList();const D=ideasData();
 if(!D)return H.pageHead("Think",ix.q,"A causal pathway, step by step.")+`<section class="sec"><div class="wrap">${idWait("this pathway")}</div></section>`;
 const c=D.causal.find(x=>x.id===id),st=whyS(id),n=Math.min(st.step,WHYSTEPS.length),P=st.pred,predDone=c.variables.every((v,i)=>P[i]);
 return H.pageHead("Think",c.q,`Work it through in order. Before the mechanism, commit to a prediction: it is the fastest way to find out what you actually understand.`)
 +`<section class="sec"><div class="wrap why-page">
  <div class="why-meta">${c.subs.map(idSubBtn).join("")}${c.kc.map(k=>`<span class="kcchip">${esc(k)}</span>`).join("")}${c.hl?`<span class="kcchip">${esc(c.hl)}</span>`:""}</div>
  ${n<5?`<div class="why-pred mt4"><div class="eb">Predict first</div><p class="sm mt1">Which way does each variable move? Choose before you read on.</p>
   <div class="why-pg mt2">${c.variables.map((v,i)=>`<fieldset><legend>${esc(v.v)}</legend>${["up","down","ambiguous"].map(d=>`<label><input type="radio" name="wp-${i}" value="${d}" ${P[i]===d?"checked":""} onchange="whyS('${id}').pred[${i}]='${d}';save()"> ${WHYDIR[d]}</label>`).join("")}</fieldset>`).join("")}</div>
   <p class="xs mt2">${predDone?"Prediction recorded. It is compared with the answer at step 6.":"Your prediction is saved on this device and checked at step 6."}</p></div>`:""}
  <ol class="why-steps mt4">${WHYSTEPS.slice(0,Math.max(1,n)).map(([k,h],i)=>`<li class="why-st" id="why-${k}"><div class="why-n">${String(i+1).padStart(2,"0")}</div><div class="why-b"><h2 class="ls-h2">${h}</h2>${whyStep(c,k)}</div></li>`).join("")}</ol>
  <div class="row mt4" style="gap:8px;flex-wrap:wrap">${n<WHYSTEPS.length?`<button class="btn sm" onclick="whyS('${id}').step=${Math.max(1,n)+1};save();render();setTimeout(()=>{const e=document.getElementById('why-${(WHYSTEPS[Math.max(1,n)]||[])[0]}');if(e)e.scrollIntoView({block:'start'})},0)">Next: ${esc((WHYSTEPS[Math.max(1,n)]||["",""])[1])} →</button><button class="btn gh sm" onclick="whyS('${id}').step=${WHYSTEPS.length};save();render()">Show every step</button>`:`<button class="btn gh sm" onclick="const s=whyS('${id}');s.step=0;s.pred={};save();render()">Start again</button>`}
   <button class="btn gh sm" onclick="nav('think',WHYTAB())">All questions</button></div>
  ${n>=WHYSTEPS.length&&c.next.length?`<div class="why-next mt4"><div class="eb">Next question</div>${c.next.map(x=>{const o=IDEASIDX.causal.find(y=>y.id===x);return o?`<button class="lnk" onclick="nav('think',WHYTAB(),'${o.id}')">${esc(o.q)}</button>`:""}).join(" · ")}</div>`:""}
  <p class="xs mt4">${srcTag("platform")} Original reasoning pathway. Version ${esc(D.version||"")}.</p></div></section>`}
function WHYTAB(){const t=SECTIONS.find(s=>s.v==="think");return t?t.tabs.indexOf("Why did this happen?"):0}

SECTIONS.push({v:"ideas",n:"Economists and ideas",hide:1,tabs:["Economists","How ideas connect"]});
VIEWS.ideas=()=>TAB===1?econTimeline():ARG?econPage(ARG):econList();
(function(){const t=SECTIONS.find(s=>s.v==="think");if(t&&t.tabs&&!t.tabs.includes("Why did this happen?"))t.tabs.push("Why did this happen?");
 const prev=VIEWS.think;VIEWS.think=function(){if(TAB===WHYTAB())return ARG?whyPage(ARG):whyList();return prev.apply(this,arguments)}})();
