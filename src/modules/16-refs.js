/* ═══════════════════════════════════════════════════════════════════════════
   GLOSSARY 2.0 · COMPARE TERMS · COMMAND TERMS 2.0
   The glossary holds every term the platform uses, each with a plain-English
   version, the economic definition, why it matters, an example, related terms,
   the common confusion, its subtopic, its IB status and, for about a third,
   a deeper note. Definitions carried over from the earlier dictionary are
   unchanged; new terms were written for this release and reviewed.
   Command terms: the official definitions are quoted from the guide and
   labelled IB OFFICIAL; everything else on that page is teacher guidance and
   is labelled so.
   ═══════════════════════════════════════════════════════════════════════════ */
const GX={q:"",u:"",sub:"",diff:"",ib:"",letter:"",open:null,cmp:[],cset:null};
const GLOSS2=(COURSE.gloss||[]);
const GLBY=Object.fromEntries(GLOSS2.map(g=>[g.term.toLowerCase(),g]));
const glDiffN={foundation:"Foundation",core:"Core",deeper:"Deeper"};
function glFilter(){const q=GX.q.trim().toLowerCase();
 return GLOSS2.filter(g=>(!GX.u||String(g.sub||"").split(".")[0]===GX.u)&&(!GX.sub||g.sub===GX.sub)&&(!GX.diff||g.diff===GX.diff)
  &&(!GX.ib||(GX.ib==="hl"?/HL only/.test(g.ib||""):GX.ib==="guide"?/Guide syllabus term/.test(g.ib||""):!/Guide syllabus term/.test(g.ib||"")))
  &&(!GX.letter||g.term[0].toUpperCase()===GX.letter)
  &&(!q||g.term.toLowerCase().includes(q)||(g.def||"").toLowerCase().includes(q)||(g.plain||"").toLowerCase().includes(q)))}
function glOpen(i){const g=GLOSS2[i];if(!g)return;GX.open=g.term;GX.q="";GX.letter="";GX.u="";GX.sub="";GX.diff="";GX.ib="";
 nav('course',courseTab("Dictionary"));setTimeout(()=>{const e=document.querySelector('.gl-card.open');if(e)e.scrollIntoView({block:'center'})},60)}
function glossary2(){
 if(ARG&&/^sub:/.test(ARG)){GX.sub=ARG.slice(4);GX.u="";ARG=null}
 else if(ARG&&GLBY[String(ARG).toLowerCase()]){GX.open=GLBY[String(ARG).toLowerCase()].term;GX.q="";ARG=null}
 const list=glFilter(), letters=[...new Set(GLOSS2.map(g=>g.term[0].toUpperCase()))].sort();
 const n=(COURSE.meta.counts||{}).glossNew||0;
 return H.pageHead("Course","Glossary",
  `${GLOSS2.length} terms, each in plain English and as an economist would define it, with why it matters, an example, the usual confusion and where it sits in the course.`)
 +`<section class="sec"><div class="wrap">
  <div class="gl-bar"><input class="inp" id="glq2" type="search" placeholder="Search a term or a definition…" value="${esc(GX.q)}" aria-label="Search the glossary"
    oninput="GX.q=this.value;glRefresh()">
   <div class="gl-f"><label class="eb" for="glu">Unit</label><select id="glu" class="inp" onchange="GX.u=this.value;GX.sub='';glRefresh()">
     <option value="">All units</option>${[1,2,3,4].map(u=>`<option value="${u}" ${GX.u==String(u)?"selected":""}>Unit ${u}</option>`).join("")}</select></div>
   <div class="gl-f"><label class="eb" for="gls">Topic</label><select id="gls" class="inp" onchange="GX.sub=this.value;glRefresh()">
     <option value="">All topics</option>${SUBTOPICS.filter(s=>!GX.u||String(s.unit)===GX.u).map(s=>`<option value="${s.code}" ${GX.sub===s.code?"selected":""}>${esc(s.code+" "+s.title)}</option>`).join("")}</select></div>
   <div class="gl-f"><label class="eb" for="gld">Depth</label><select id="gld" class="inp" onchange="GX.diff=this.value;glRefresh()">
     <option value="">All</option>${Object.entries(glDiffN).map(([k,v])=>`<option value="${k}" ${GX.diff===k?"selected":""}>${v}</option>`).join("")}</select></div>
   <div class="gl-f"><label class="eb" for="gli">Status</label><select id="gli" class="inp" onchange="GX.ib=this.value;glRefresh()">
     <option value="">All</option><option value="guide" ${GX.ib==="guide"?"selected":""}>In the guide</option><option value="hl" ${GX.ib==="hl"?"selected":""}>HL only</option>
     <option value="other" ${GX.ib==="other"?"selected":""}>Platform and skills terms</option></select></div></div>
  <nav class="gl-az mt3" aria-label="A to Z"><button class="${GX.letter?"":"on"}" onclick="GX.letter='';glRefresh()">All</button>${letters.map(L=>
   `<button class="${GX.letter===L?"on":""}" onclick="GX.letter='${L}';glRefresh()">${L}</button>`).join("")}</nav>
  <div class="row mt3" style="justify-content:space-between;gap:8px;flex-wrap:wrap"><p class="xs" id="glcount">${list.length} of ${GLOSS2.length} terms · ${n} added in this release</p>
   <div class="row" style="gap:6px"><button class="btn xs gh" onclick="glPrint()">Print this list</button><button class="btn xs gh" onclick="lsGoGl('cmp')">Compare terms ↓</button></div></div>
  <div id="gllist" class="gl-list mt3">${glListHtml(list)}</div>
  <section class="gl-cmp mt6" id="gl-cmp" aria-labelledby="glc-h"><div class="kicker">Compare terms</div><h2 class="mt1" id="glc-h">Words students confuse</h2>
   <p class="sm mt2" style="max-width:66ch">${(COURSE.compare||[]).length} worked comparisons, then a comparison of any terms you choose. The distinction is usually one clause long; learning that clause is the point.</p>
   <div class="gl-sets mt3">${(COURSE.compare||[]).map(c=>`<button class="${GX.cset===c.id?"on":""}" onclick="GX.cset=GX.cset==='${c.id}'?null:'${c.id}';lsSwap('glcset',glCsetHtml());glMarkSets()">${esc(c.terms.join(" · "))}</button>`).join("")}</div>
   <div id="glcset" class="mt3">${glCsetHtml()}</div>
   <div class="panel mt4"><div class="eb">Your own comparison</div><p class="xs mt1">Add up to three terms with “Compare” on any card above.</p>
    <div id="glmine" class="mt2">${glMineHtml()}</div></div></section>
  <p class="xs mt4">${srcTag("guide")} Status and subtopic follow the guide (first assessment 2022). ${srcTag("platform")} Plain-English versions, examples and deeper notes are original. Definitions carried over from the earlier dictionary are unchanged.</p>
 </div></section>`;
}
function lsGoGl(k){const e=document.getElementById("gl-"+k);if(e)e.scrollIntoView({behavior:RN&&RN.reduced?"auto":"smooth"})}
function glRefresh(){const l=glFilter();lsSwap("gllist",glListHtml(l));const c=document.getElementById("glcount");
 if(c)c.textContent=`${l.length} of ${GLOSS2.length} terms · ${(COURSE.meta.counts||{}).glossNew||0} added in this release`;
 document.querySelectorAll(".gl-az button").forEach(b=>b.classList.toggle("on",(b.textContent==="All"&&!GX.letter)||b.textContent===GX.letter))}
function glListHtml(list){if(!list.length)return `<p class="sm">No term matches. Clear a filter or try a shorter search.</p>`;
 return list.map(g=>glCard(g)).join("")}
function glCard(g){const open=GX.open===g.term,id="gl-"+g.term.replace(/[^a-z0-9]+/gi,"-").toLowerCase();
 return `<article class="gl-card${open?" open":""}" id="${id}"><header><button class="gl-t" aria-expanded="${open}" onclick="GX.open=GX.open===${esc(JSON.stringify(g.term))}?null:${esc(JSON.stringify(g.term))};lsSwap('gllist',glListHtml(glFilter()))">
   <span class="gl-term">${esc(g.term)}</span><span class="gl-plain">${esc(g.plain||"")}</span></button>
  <span class="gl-tags">${g.sub?`<span class="tag">${esc(g.sub)}</span>`:""}${/HL only/.test(g.ib||"")?'<span class="tag hl">HL</span>':""}<span class="tag d-${esc(g.diff||"core")}">${esc(glDiffN[g.diff]||"Core")}</span>${g.new?'<span class="tag new">New</span>':""}</span></header>
  ${open?`<div class="gl-body"><dl class="ls-dl"><div><dt>Definition</dt><dd>${esc(g.def)}</dd></div><div><dt>Why it matters</dt><dd>${esc(g.why||"")}</dd></div>
   <div><dt>Example</dt><dd>${esc(g.ex||"")}</dd></div><div><dt>Common confusion</dt><dd>${esc(g.confusion||"")}</dd></div>
   <div><dt>In the course</dt><dd>${g.sub?`<button class="lnk" onclick="${lsGoSub(g.sub)}">${esc(g.sub)} ${esc(lsTitle(g.sub))}</button> · `:""}${esc(g.ib||"")}</dd></div>
   ${(g.related||[]).length?`<div><dt>Related</dt><dd>${g.related.map(r=>`<button class="kcchip" onclick="GX.open=${esc(JSON.stringify(r))};GX.q='';GX.letter='';GX.u='';GX.sub='';glRefresh();const e=document.getElementById('gl-${r.replace(/[^a-z0-9]+/gi,"-").toLowerCase()}');if(e)e.scrollIntoView({block:'center'})">${esc(r)}</button>`).join(" ")}</dd></div>`:""}
   ${g.deeper?`<div><dt>Go deeper</dt><dd>${esc(g.deeper)}</dd></div>`:""}</dl>
   <div class="row mt2" style="gap:6px"><button class="btn xs gh" onclick="glAdd(${esc(JSON.stringify(g.term))})">${GX.cmp.includes(g.term)?"Added to compare":"Compare"}</button></div></div>`:""}</article>`}
function glAdd(t){if(!GX.cmp.includes(t)){GX.cmp=GX.cmp.concat(t).slice(-3)}lsSwap("glmine",glMineHtml());lsSwap("gllist",glListHtml(glFilter()))}
function glMineHtml(){const a=GX.cmp.map(t=>GLBY[t.toLowerCase()]).filter(Boolean);if(!a.length)return `<p class="sm">Nothing chosen yet.</p>`;
 const rows=[["Plain English","plain"],["Definition","def"],["Why it matters","why"],["Example","ex"],["Common confusion","confusion"],["Topic","sub"]];
 return `<div class="scrollx"><table class="t gl-ct"><thead><tr><th></th>${a.map(g=>`<th>${esc(g.term)} <button class="lnk xs" onclick="GX.cmp=GX.cmp.filter(x=>x!==${esc(JSON.stringify(g.term))});lsSwap('glmine',glMineHtml())">remove</button></th>`).join("")}</tr></thead>
  <tbody>${rows.map(([h,k])=>`<tr><th scope="row">${h}</th>${a.map(g=>`<td>${esc(g[k]||"")}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`}
function glCsetHtml(){const c=(COURSE.compare||[]).find(x=>x.id===GX.cset);if(!c)return "";
 return `<div class="gl-cs"><p class="gl-key">${esc(c.key)}</p><div class="scrollx mt3"><table class="t gl-ct"><thead><tr><th></th>${c.terms.map(t=>`<th>${esc(t)}</th>`).join("")}</tr></thead>
  <tbody>${c.rows.map(r=>`<tr><th scope="row">${esc(r.aspect)}</th>${r.vals.map(v=>`<td>${esc(v)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
  <p class="sm mt3"><strong>The trap:</strong> ${esc(c.trap)}</p><p class="sm mt1"><strong>Example:</strong> ${esc(c.example)}</p>${c.note?`<p class="xs mt1">${esc(c.note)}</p>`:""}</div>`}
function glMarkSets(){document.querySelectorAll(".gl-sets button").forEach((b,i)=>b.classList.toggle("on",(COURSE.compare[i]||{}).id===GX.cset))}
function glPrint(){const l=glFilter();
 printDoc("Glossary",`<div class="psheet pgl">${l.map(g=>`<div class="pgi"><p><strong>${esc(g.term)}</strong>${g.sub?` <span class="psm">${esc(g.sub)}${/HL only/.test(g.ib||"")?" · HL":""}</span>`:""}</p>
  <p>${esc(g.def)}</p><p class="psm"><em>Confusion:</em> ${esc(g.confusion||"")}</p></div>`).join("")}</div>`,
  `${l.length} terms${GX.u?" · Unit "+GX.u:""}${GX.sub?" · "+GX.sub:""}`,{kind:"sheet"})}

/* ── Command Terms 2.0 ── */
const CT2=COURSE.ct||[];
const CT2BY=Object.fromEntries(CT2.map(c=>[c.term.toLowerCase(),c]));
function commandTerms2(){
 if(ARG&&CT2BY[String(ARG).toLowerCase()]){CX.ct=CT2BY[String(ARG).toLowerCase()].term;ARG=null}
 const t=CT2BY[String(CX.ct||"").toLowerCase()]?CT2BY[String(CX.ct).toLowerCase()]:CT2.find(x=>x.term==="Discuss")||CT2[0];
 if(!t)return courseCT();
 const byAO={AO1:[],AO2:[],AO3:[],AO4:[]};CT2.forEach(x=>(byAO[x.ao]=byAO[x.ao]||[]).push(x));
 const L=(typeof CTLAB!=="undefined"&&CTLAB[t.term])||null;
 return H.pageHead("Course","Command terms",
  `The ${CT2.length} command terms in the Economics guide. The definition is the IB's; what follows it is a teacher's guidance on meeting it, labelled as such.`)
 +`<section class="sec"><div class="wrap">
  <div class="ct-aos">${Object.entries(byAO).map(([a,ks])=>`<div class="ct-ao"><div class="row" style="gap:8px;align-items:baseline"><span class="tag ${a.toLowerCase()}">${a}</span>
    <span class="xs">${esc((GUIDE.ao[a]||{}).n||"")} · ${ks.length}</span></div>
   <div class="row mt2" style="gap:5px;flex-wrap:wrap">${ks.map(k=>`<button class="btn xs ${t.term===k.term?"":"gh"}" aria-pressed="${t.term===k.term}" onclick="CX.ct='${esc(k.term)}';render()">${esc(k.term)}</button>`).join("")}</div></div>`).join("")}</div>
  <article class="ct-card mt5" aria-labelledby="ct-h">
   <header class="row" style="justify-content:space-between;align-items:flex-start;gap:10px"><h2 id="ct-h">${esc(t.term)}</h2><span class="tag ${t.ao.toLowerCase()}">${esc(t.ao)}</span></header>
   <div class="ct-off mt3"><div class="eb">${srcTag("guide")} The official definition</div><p class="ct-def mt2">${esc(t.def)}</p><p class="xs mt1">${esc(t.src||"")}</p></div>
   <div class="ct-tg mt4"><div class="eb">${srcTag("platform")} Teacher guidance</div>
    <div class="split mt3"><div><div class="kicker">What it actually asks you to do</div><p class="sm mt2">${esc(t.asks)}</p>
      <div class="kicker mt4">How to structure it</div><ol class="ct-steps mt2">${(t.structure||[]).map(x=>`<li>${esc(x)}</li>`).join("")}</ol>
      <div class="kicker mt4">Mini example</div><div class="panel q mt2"><p class="sm"><strong>${esc(t.example.q)}</strong></p>
       <ul class="ls-list mt2">${(t.example.outline||[]).map(x=>`<li>${esc(x)}</li>`).join("")}</ul><p class="xs mt2">An outline of the moves, not a model answer.</p></div>
      ${L&&L.opener?`<div class="kicker mt4">A worked opening</div><div class="note g mt2"><p class="sm">${L.opener}</p></div>`:""}</div>
     <div><div class="note n"><div class="t">A weak response</div><p class="sm">${esc(t.weak)}</p></div>
      <div class="note g mt3"><div class="t">A strong response</div><p class="sm">${esc(t.strong)}</p></div>
      <div class="kicker mt4">The common trap</div><p class="sm mt2">${esc(t.trap)}</p>
      ${L&&L.lose?`<div class="kicker mt4">What loses the mark</div><ul class="ls-list mt2">${L.lose.map(x=>`<li>${x}</li>`).join("")}</ul>`:""}
      <div class="kicker mt4">Related terms</div><div class="row mt2" style="gap:5px;flex-wrap:wrap">${(t.related||[]).map(r=>`<button class="kcchip" onclick="CX.ct='${esc(r)}';render()">${esc(r)}</button>`).join("")}</div>
      <div class="kicker mt4">Where it is used</div><p class="sm mt2">${esc(t.papers||"")}</p>
      <p class="xs mt3">A question may use a command term at the assessment objective level stated for the content, or a less demanding one (guide PDF p. 65).</p>
      <div class="row mt4" style="gap:8px"><button class="btn sm" onclick="EX.ct='${esc(t.term)}';nav('examiner',1)">Write an answer to this term</button>
       <button class="btn sm gh" onclick="ctPrint()">Print all command terms</button></div></div></div></div></article>
 </div></section>`;
}
function ctPrint(){printDoc("Command terms",`<table class="ptbl"><thead><tr><th>Term</th><th>AO</th><th>Official definition (IB Economics guide, 2022)</th><th>What it asks you to do (teacher guidance)</th></tr></thead>
 <tbody>${CT2.map(c=>`<tr><td><strong>${esc(c.term)}</strong></td><td>${esc(c.ao)}</td><td>${esc(c.def)}</td><td>${esc(c.asks)}</td></tr>`).join("")}</tbody></table>`,
 "The official definitions are quoted from the guide; the last column is a teacher's guidance.",{kind:"sheet"})}
