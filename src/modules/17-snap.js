/* ═══════════════════════════════════════════════════════════════════════════
   MINDMAPS 2.0 · SNAPSHOT MODE · THE PRINT SYSTEM
   Three levels: the course on one page, each unit on one page, each subtopic
   on one page. Every snapshot is generated from the lesson data, so it cannot
   drift from the lesson it summarises. The centre is the economic problem; the
   six branches are Concept, Theory, Model, Application, Evaluation and Exam.
   The same snapshot is laid out for paper (A4 landscape, high contrast, no
   controls, a restrained footer) and, for a subtopic or a unit, in a compact
   "last night" version.
   The print system extends the existing engine (preparePrintDocument, the one
   window.print() call site): a sheet can ask for landscape and for the map
   layout, and printing the screen without choosing a sheet produces a clean
   document of the current page rather than the interface.
   ═══════════════════════════════════════════════════════════════════════════ */
const snapCut=(s,n)=>{s=String(s||"").replace(/\s+/g," ").trim();const m=s.match(/^.+?[.!?](\s|$)/);let f=m&&m[0].length<=n?m[0].trim():s;
 if(f.length>n){f=f.slice(0,n).replace(/\s+\S*$/,"");f=f.replace(/[,;:—–-]$/,"")+"…"}return f};
const SNAPBR=[["concept","Concept"],["theory","Theory"],["model","Model"],["application","Application"],["evaluation","Evaluation"],["exam","Exam"]];
function snapSub(c){const s=SPINE[c],t=SUBMAP[c]||{};if(!s)return null;
 const dg=lsDiagrams(c).map(k=>DG[k]().t),cal=CALC.filter(x=>x.sub===c),terms=lsTerms(c).filter(g=>g.diff!=="deeper").slice(0,4),mis=lsMisc(c).slice(0,2);
 const cases=(typeof RW_CASES!=="undefined"?RW_CASES:[]).filter(x=>x.sub===c).slice(0,3);
 const lim=[].concat(...(s.models||[]).map(m=>(m.limitations||[]).slice(0,2))).slice(0,3);
 return {id:c,kind:"sub",title:`${c} ${t.title||""}`,unit:t.unit,lvl:t.lvl,core:s.big.q,idea:s.big.idea,
  branches:{
   concept:[...(s.kc||[]).slice(0,3).map(k=>({h:k.c,t:snapCut(k.here,85)})),...terms.slice(0,4).map(g=>({h:g.term,t:snapCut(g.plain||g.def,75)}))],
   theory:[...(s.blocks||[]).slice(0,4).map(b=>({h:b.h,t:""})),...(s.mech||[]).slice(0,2).map(x=>({h:"Mechanism",t:snapCut(x.t,90)}))],
   model:[...(s.models||[]).slice(0,3).map(m=>({h:m.model,t:snapCut(m.prediction,80)})),...dg.filter(x=>!(s.models||[]).slice(0,3).some(m=>m.dg&&DG[m.dg]&&DG[m.dg]().t===x)).slice(0,2).map(x=>({h:"Diagram",t:x})),
     ...cal.slice(0,2).map(x=>({h:x.n+(x.lvl==="HL"?" (HL)":""),t:x.f,mono:1}))],
   application:[...cases.map(x=>({h:`${x.c}, ${x.y}`,t:x.t})),...(s.models||[]).slice(0,Math.max(0,3-cases.length)).map(m=>({h:"Real world",t:snapCut(m.real,110)})),
     {h:"Policy",t:snapCut(s.inquiry.policy,110)}],
   evaluation:[...lim.map(x=>({h:"Limitation",t:snapCut(x,90)})),...mis.map(x=>({h:"Watch out",t:snapCut(x.student.watch,90)})),{h:"Interpretation",t:snapCut(s.tei.interp,105)}],
   exam:[...(s.exam.types||[]).slice(0,2).map(x=>({h:"Question type",t:snapCut(x,95)})),{h:"Command terms",t:(s.exam.ct||[]).join(", ")},
     ...(s.exam.strong||[]).slice(0,1).map(x=>({h:"Strong answers",t:snapCut(x,95)})),{h:"Connects to",t:(s.connect||[]).map(x=>x.sub).join(" · ")}]
  },
  night:{defs:lsTerms(c).filter(g=>g.diff!=="deeper").slice(0,6).map(g=>[g.term,snapCut(g.def,120)]),dg,calc:cal.map(x=>[x.n,x.f]),
   traps:[...mis.map(x=>snapCut(x.student.watch,110)),...(s.exam.errors||[]).slice(0,2).map(x=>snapCut(x,110))].slice(0,4),
   hooks:(s.mech||[]).map(x=>snapCut(x.depends,120)).filter(Boolean).slice(0,3),move:snapCut((s.exam.strong||[])[0],140)}};
}
function snapUnit(u){const subs=lsVisible().filter(s=>s.unit===u),rw=(typeof RWI!=="undefined"?RWI:[]).filter(r=>r.unit===u);
 return {id:"u"+u,kind:"unit",title:`Unit ${u} · ${LSUNIT[u]}`,core:rw.map(r=>r.q).join(" · ")||LSUNIT[u],
  subs:subs.map(s=>{const sp=SPINE[s.code]||{};return {c:s.code,t:s.title,lvl:s.lvl,q:snapCut((sp.big||{}).q,110),
   dg:lsDiagrams(s.code).slice(0,2).map(k=>DG[k]().t).join(" · "),kc:(sp.kc||[]).map(k=>k.c).slice(0,2).join(", "),
   trap:snapCut(((lsMisc(s.code)[0]||{}).student||{}).watch||((sp.exam||{}).errors||[])[0],90)}})}}
function snapCourse(){return {id:"course",kind:"course",title:"IB DP Economics",core:"How do societies choose under scarcity, and who gains and who loses?",
 units:[1,2,3,4].map(u=>({u,n:LSUNIT[u],subs:lsVisible().filter(s=>s.unit===u).map(s=>[s.code,s.title,s.lvl])})),
 kc:(COURSE.concepts||[]).map(k=>[k.c,snapCut(k.q,90)]),rw:(typeof RWI!=="undefined"?RWI:[]).map(r=>[r.unit,r.q])}}
function snapData(id){return id==="course"?snapCourse():/^u[1-4]$/.test(id)?snapUnit(+id.slice(1)):snapSub(id)}
const snapItems=a=>`<ul>${a.map(x=>`<li><strong>${esc(x.h)}</strong>${x.t?` <span class="${x.mono?"mn":""}">${esc(x.t)}</span>`:""}</li>`).join("")}</ul>`;
function snapHtml(id,o){o=o||{};const d=snapData(id);if(!d)return "";
 const foot=`<footer class="snap-ft"><span>Arjun Agrawal | IB DP Economics</span><span>${esc(d.title)}${o.night?" · last night revision":""}</span></footer>`;
 if(d.kind==="sub"&&o.night)return `<div class="snap snap-night"><header class="snap-hd"><span class="snap-k">Last night revision</span><h2>${esc(d.title)}</h2>${d.lvl==="HL"?'<span class="tag hl">HL only</span>':""}</header>
  <p class="snap-q">${esc(d.core)}</p><div class="snap-n3">
  <section><h3>Must-know definitions</h3><dl>${d.night.defs.map(([a,b])=>`<dt>${esc(a)}</dt><dd>${esc(b)}</dd>`).join("")}</dl></section>
  <section><h3>Draw</h3><ul>${d.night.dg.map(x=>`<li>${esc(x)}</li>`).join("")||"<li>No diagram required.</li>"}</ul>
   ${d.night.calc.length?`<h3>Calculate</h3><ul>${d.night.calc.map(([a,b])=>`<li>${esc(a)}: <span class="mn">${esc(b)}</span></li>`).join("")}</ul>`:""}</section>
  <section><h3>Traps</h3><ul>${d.night.traps.map(x=>`<li>${esc(x)}</li>`).join("")}</ul><h3>Evaluation hooks</h3><ul>${d.night.hooks.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>
   <h3>One move for the exam</h3><p>${esc(d.night.move)}</p></section></div>${foot}</div>`;
 if(d.kind==="sub")return `<div class="snap snap-sub"><div class="snap-g">
  <section class="snap-c"><span class="snap-k">${esc(d.id)}${d.lvl==="HL"?" · HL only":""}</span><h2>${esc(SUBMAP[d.id].title)}</h2><p class="snap-q">${esc(d.core)}</p><p class="snap-i">${esc(snapCut(d.idea,220))}</p></section>
  ${SNAPBR.map(([k,n])=>`<section class="snap-b b-${k}"><h3>${n}</h3>${snapItems(d.branches[k])}</section>`).join("")}</div>${foot}</div>`;
 if(d.kind==="unit"&&o.night)return `<div class="snap snap-night"><header class="snap-hd"><span class="snap-k">Last night revision</span><h2>${esc(d.title)}</h2></header>
  <table class="snap-nt"><thead><tr><th>Topic</th><th>The question</th><th>Draw</th><th>Trap</th></tr></thead><tbody>${d.subs.map(s=>`<tr><td><strong>${esc(s.c)}</strong> ${esc(s.t)}${s.lvl==="HL"?" (HL)":""}</td><td>${esc(s.q)}</td><td>${esc(s.dg||"—")}</td><td>${esc(s.trap)}</td></tr>`).join("")}</tbody></table>${foot}</div>`;
 if(d.kind==="unit"){const h=Math.ceil(d.subs.length/2),L=d.subs.slice(0,h),R=d.subs.slice(h);
  const box=s=>`<section class="snap-u"><h3>${esc(s.c)} ${esc(s.t)}${s.lvl==="HL"?' <span class="snap-hl">HL</span>':""}</h3><p>${esc(s.q)}</p>${s.dg?`<p class="snap-dg">${esc(s.dg)}</p>`:""}${s.kc?`<p class="snap-kc">${esc(s.kc)}</p>`:""}</section>`;
  return `<div class="snap snap-unit"><div class="snap-g"><section class="snap-c"><span class="snap-k">Unit map</span><h2>${esc(d.title)}</h2><p class="snap-q">${esc(d.core)}</p></section>
   <div class="snap-col snap-l">${L.map(box).join("")}</div><div class="snap-col snap-r">${R.map(box).join("")}</div></div>${foot}</div>`}
 return `<div class="snap snap-course"><div class="snap-g">
  <section class="snap-c"><span class="snap-k">The course on one page</span><h2>Think like an economist.</h2><p class="snap-q">${esc(d.core)}</p>
   <div class="snap-kcs">${d.kc.map(([k])=>`<span>${esc(k)}</span>`).join("")}</div></section>
  ${d.units.slice(0,2).map(u=>`<section class="snap-b"><h3>Unit ${u.u} · ${esc(u.n)}</h3><ul>${u.subs.map(([c,t,l])=>`<li><strong>${esc(c)}</strong> ${esc(t)}${l==="HL"?' <span class="snap-hl">HL</span>':""}</li>`).join("")}</ul></section>`).join("")}
  ${d.units.slice(2).map(u=>`<section class="snap-b"><h3>Unit ${u.u} · ${esc(u.n)}</h3><ul>${u.subs.map(([c,t,l])=>`<li><strong>${esc(c)}</strong> ${esc(t)}${l==="HL"?' <span class="snap-hl">HL</span>':""}</li>`).join("")}</ul></section>`).join("")}</div>
  <section class="snap-rw"><h3>Six real-world issues</h3><ol>${d.rw.map(([u,q])=>`<li><span>Unit ${u}</span> ${esc(q)}</li>`).join("")}</ol></section>${foot}</div>`;
}
function snapOpen(id){nav("mind",0,"snap-"+id)}
function snapPrint(id,night){const d=snapData(id);if(!d)return;
 printDoc(d.title+(night?" · last night revision":""),snapHtml(id,{night:!!night}),d.kind==="sub"?"Subtopic map":d.kind==="unit"?"Unit map":"Course map",{landscape:true,kind:"map"})}
function snapView(id){const d=snapData(id);if(!d)return H.pageHead("Mindmaps","Snapshot","This map is not available.");
 const up=d.kind==="sub"?`u${d.unit}`:d.kind==="unit"?"course":null;
 return H.pageHead("Mindmaps · Snapshot",esc(d.title),d.kind==="sub"?"One page: the question in the centre, six branches around it. Print it, or open the lesson it summarises."
   :d.kind==="unit"?"Every lesson in the unit on one page.":"The whole course on one page: four units, thirty-one lessons, nine key concepts, six real-world issues.")
 +`<section class="sec"><div class="wrap">
  <div class="row" style="gap:8px;flex-wrap:wrap">${up?`<button class="btn sm gh" onclick="snapOpen('${up}')">↑ ${up==="course"?"Course map":"Unit map"}</button>`:""}
   ${d.kind==="sub"?`<button class="btn sm" onclick="${lsGoSub(d.id)}">Open the lesson</button>`:d.kind==="unit"?`<button class="btn sm" onclick="nav('course',${TOPICS_TAB()},'unit-${d.id.slice(1)}')">Open the unit</button>`:""}
   <button class="btn sm gh" onclick="snapPrint('${d.id}')">Print or save as PDF</button>
   ${d.kind!=="course"?`<button class="btn sm gh" onclick="snapPrint('${d.id}',1)">Print the last-night version</button>`:""}
   <button class="btn sm gh" onclick="SNAPN=!SNAPN;render()">${SNAPN?"Full snapshot":"Last-night view"}</button></div>
  <div class="snap-screen mt4" tabindex="0" role="region" aria-label="The snapshot map (scrolls sideways on a narrow screen)">${snapHtml(d.id,{night:SNAPN&&d.kind!=="course"})}</div>
  ${d.kind==="unit"?`<div class="snap-sublinks mt4">${lsVisible().filter(s=>"u"+s.unit===d.id).map(s=>`<button class="btn xs gh" onclick="snapOpen('${s.code}')">${esc(s.code)}</button>`).join("")}</div>`:""}
  <p class="xs mt3">Generated from the lesson data, so it changes when the lesson does. On paper it prints A4 landscape with nothing but the map.</p>
 </div></section>`}
let SNAPN=false;
function snapIndexBand(){return `<section class="sec snap-idx"><div class="wrap"><div class="kicker">Snapshot mode</div>
 <h2 class="mt1">The course, each unit and every subtopic on one page</h2>
 <div class="row mt3" style="gap:6px;flex-wrap:wrap"><button class="btn sm" onclick="snapOpen('course')">Course map</button>${[1,2,3,4].map(u=>`<button class="btn sm gh" onclick="snapOpen('u${u}')">Unit ${u}</button>`).join("")}</div>
 <div class="snap-codes mt3">${lsVisible().map(s=>`<button onclick="snapOpen('${s.code}')" title="${esc(s.title)}">${esc(s.code)}</button>`).join("")}</div>
 <p class="xs mt2">Each prints on one A4 landscape page, with a compact last-night version. The maps below are the earlier, hand-drawn networks.</p></div></section>`}

/* ── the print system ── */
let PRINTOPT={};
(function(){
 if(typeof printDoc!=="function")return;
 const _prep=preparePrintDocument,_pp=printPreparedDocument;
 preparePrintDocument=function(title,body,sub){const o=PRINTOPT||{},r=document.getElementById("printroot");
  if(o.kind==="map"&&r){
   r.innerHTML=`<div class="pdoc pmap"><div class="pmap-h"><span class="brand">${esc(title)}</span><span class="sub">${esc(sub||"")}</span></div>${body}</div>`;
  }else _prep(title,body,sub);
  if(r)r.className=o.kind==="map"?"p-map":o.kind==="sheet"?"p-sheet":"";
  let st=document.getElementById("pgsz");if(!st){st=document.createElement("style");st.id="pgsz";document.head.appendChild(st)}
  st.textContent=o.landscape?"@media print{@page{size:A4 landscape;margin:9mm}}":"@media print{@page{size:A4;margin:14mm}}";
  return r?r.innerHTML:"";
 };
 printPreparedDocument=function(){const ok=_pp();
  setTimeout(()=>{const st=document.getElementById("pgsz");if(st)st.textContent="";const r=document.getElementById("printroot");if(r)r.className="";PRINTOPT={}},700);return ok};
 printDoc=function(title,body,sub,options){const o=options||{};PRINTOPT=o;
  const html=preparePrintDocument(title,body,sub);
  if(o.autoPrint===false){PRINTOPT={};return html}
  printPreparedDocument();return html};
 /* Printing without choosing a sheet: a clean copy of the page, not the interface */
 let fallback=false;
 window.printFallbackPrepare=function(){const r=document.getElementById("printroot");if(!r||r.innerHTML.trim())return false;
  const v=document.getElementById("view");if(!v)return false;const c=v.cloneNode(true);
  c.querySelectorAll("button,input,select,textarea,nav,.ls-loop,.ls-tools,.subnav,.no-print,.motif,.hero svg,.sp-cover-fig,dialog,[aria-hidden='true']").forEach(e=>{
   if(e.tagName==="BUTTON"&&e.closest(".ls-mo,.gl-t,.ls-card,.ls-case,.ls-pt")){const s=document.createElement("span");s.textContent=e.textContent;e.replaceWith(s)}else e.remove()});
  c.querySelectorAll("details").forEach(d=>d.setAttribute("open",""));
  PRINTOPT={kind:"page"};_prep(document.title.replace(/ · Arjun Agrawal · IB DP Economics$/,""),`<div class="pview">${c.innerHTML}</div>`,"Printed from the platform");
  r.className="p-page";fallback=true;
  let st=document.getElementById("pgsz");if(!st){st=document.createElement("style");st.id="pgsz";document.head.appendChild(st)}st.textContent="@media print{@page{size:A4;margin:14mm}}";return true};
 window.printFallbackClear=function(){if(!fallback)return;fallback=false;const r=document.getElementById("printroot");if(r){r.innerHTML="";r.className=""}PRINTOPT={};const st=document.getElementById("pgsz");if(st)st.textContent=""};
 window.addEventListener("beforeprint",()=>printFallbackPrepare());
 window.addEventListener("afterprint",()=>printFallbackClear());
})();
