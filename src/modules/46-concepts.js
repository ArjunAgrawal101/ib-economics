/* ═══════════════════════════════════════════════════════════════════════════
   ONE CONCEPT. TWO PERSPECTIVES. · the shared knowledge layer
   The ideas IB DP Economics and UPSC CSE Economics share, each explained once
   (46-concepts-data.js) and applied twice. A concept page opens on its shared
   foundation, which never moves; a two-part switch below it swaps only the
   applied panel, in the IB register (burgundy) or the UPSC register (forest).
     #/concepts                      the index, grouped
     #/concepts/<id>                 one concept, in the reader's last perspective
     #/concepts/<id>/ib | /upsc      one concept, opened in a perspective
   Interfaces for other parts of the platform:
     ccTeaser(opts)   a compact block of three or four concepts with a live
                      switch; opts.path "ib" | "upsc" | "shared" sets the
                      perspective it opens on, opts.ids picks the concepts,
                      opts.n (3 or 4), opts.title and opts.level (the
                      heading level, 2 by default) fit it to its host page
     ccLink(id,path)  the address of a concept, optionally in a perspective
   Every IB link is resolved at run time and kept only if routeParse reads it
   and the item it names exists; every handbook link names a real volume and
   real parts. Switching perspective rewrites the address in place
   (history.replaceState), so Back still leaves the page and a refresh keeps
   the perspective. Nothing is stored.
   ═══════════════════════════════════════════════════════════════════════════ */
SECTIONS.push({v:"concepts",n:"One Concept. Two Perspectives.",hide:1});
const CCS={lens:"shared",pick:null,last:null,seq:0};
const CC_KIND="Shared concept · IB and UPSC";
const CC_ORDER=CC_GROUPS.flatMap(g=>CC_DATA.filter(c=>c.g===g.k));
const CC_BY=Object.fromEntries(CC_DATA.map(c=>[c.id,c]));
const CC_TZ={shared:["inflation","externalities","exchange-rates","economic-development"],
 ib:["elasticity","inflation","fiscal-policy","balance-of-payments"],
 upsc:["inflation","taxation","balance-of-payments","unemployment"]};
const CC_ROMAN=["I","II","III","IV","V","VI","VII","VIII","IX","X"];
const CC_WORDS=["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty"];

function ccGet(id){return id!=null&&Object.prototype.hasOwnProperty.call(CC_BY,id)?CC_BY[id]:null}
function ccE(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
function ccA(s){return ccE(s).replace(/"/g,"&quot;").replace(/'/g,"&#39;")}
function ccCount(n){return CC_WORDS[n]||String(n)}
function ccCap(s){s=String(s||"");return s.charAt(0).toUpperCase()+s.slice(1)}
/* ARG is "<id>" or "<id>/<ib|upsc>" */
function ccArg(a){const s=a==null?"":String(a),i=s.indexOf("/"),id=i<0?s:s.slice(0,i),p=i<0?"":s.slice(i+1).toLowerCase();
 return {id:id||null,path:p==="ib"||p==="upsc"?p:null}}
/* the address of a concept, or of the index when the id is not a concept */
function ccLink(id,path){const c=ccGet(id);if(!c)return "#/concepts";const p=path==="ib"||path==="upsc"?path:null;
 return "#/concepts/"+encodeURIComponent(c.id)+(p?"/"+p:"")}

/* ── addresses: #/concepts/<id>[/<perspective>] read and written cleanly ── */
(function(){
 const pf=routeFormat,pp=routeParse;
 routeFormat=function(v,t,a){
  if(v!=="concepts")return pf.apply(this,arguments);
  const r=ccArg(a);return r.id?"#/concepts/"+encodeURIComponent(r.id)+(r.path?"/"+r.path:""):"#/concepts"};
 routeParse=function(hash){
  const m=/^#\/concepts(?:\/(.*))?$/.exec(String(hash||""));
  if(!m)return pp.apply(this,arguments);
  if(typeof VIEWS.concepts!=="function")return null;
  const seg=(m[1]||"").split("/").filter(Boolean).map(x=>{try{return decodeURIComponent(x)}catch(e){return x}});
  if(!seg.length)return {v:"concepts",t:0,a:null};
  const p=(seg[1]||"").toLowerCase();
  return {v:"concepts",t:0,a:seg[0]+(p==="ib"||p==="upsc"?"/"+p:"")}};
})();
/* the switch rewrites the current entry, never adds one */
function ccReplace(){
 try{if(typeof routeQuiet==="function"&&routeQuiet())return}catch(e){return}
 try{if(/^#assign=/.test(location.hash||""))return;
  const h=routeFormat(VIEW,TAB,ARG);
  if(location.hash!==h)history.replaceState(history.state,"",location.pathname+location.search+h);
  if(typeof ROUTER!=="undefined")ROUTER.last=h}catch(e){}
}

/* ── resolving links: a route that parses, to something that exists ───── */
function ccTabIdx(v,label){const s=SECTIONS.find(x=>x.v===v);if(!s)return -1;if(!label)return 0;return s.tabs?s.tabs.indexOf(label):-1}
function ccLive(h){try{const r=routeParse(h);return !!(r&&typeof VIEWS[r.v]==="function")}catch(e){return false}}
function ccIb(spec){
 const i=String(spec).indexOf(":"),k=spec.slice(0,i),v=spec.slice(i+1);let h=null,t="",kind="",meta="";
 try{switch(k){
  case "l":{if(typeof SPINE==="undefined"||!SPINE[v])return null;const tb=ccTabIdx("course","Topics");if(tb<0)return null;
   h=routeFormat("course",tb,v);t=v+" "+(typeof lsTitle==="function"?lsTitle(v):"");kind="Lesson";
   const s=typeof SUBMAP!=="undefined"&&SUBMAP[v];if(s&&s.lvl==="HL")meta="HL";break}
  case "c":{if(typeof CMAP==="undefined"||!CMAP[v])return null;const tb=ccTabIdx("learn","Concept spine");if(tb<0)return null;
   h=routeFormat("learn",tb,v);t=CMAP[v].t;kind="Concept page";if(CMAP[v].lvl==="HL")meta="HL";break}
  case "d":{if(typeof DGKEYS==="undefined"||!DGKEYS.includes(v))return null;const tb=ccTabIdx("lab","Diagram atlas");if(tb<0)return null;
   h=routeFormat("lab",tb,v);t=DG[v]().t;kind="Diagram plate";break}
  case "m":{if(typeof mmGet!=="function"||!mmGet(v))return null;const tb=ccTabIdx("mind","Mindmaps");if(tb<0)return null;
   h=routeFormat("mind",tb,v);t=mmGet(v).title;kind=mmGet(v).cls==="synthesis"?"Synthesis map":"Mindmap";if(mmGet(v).lvl==="HL")meta="HL";break}
  case "lab":{const tb=ccTabIdx("lab",v);if(tb<0)return null;h=routeFormat("lab",tb);t=v;kind="Lab";break}
  case "x":{if(typeof CMAPC==="undefined"||!CMAPC[v])return null;h=routeFormat("calculate",0,v);t=CMAPC[v].n;kind="Calculation";break}
  case "w":{const c=typeof rwById==="function"?rwById(v):null;if(!c)return null;h=routeFormat("world",0,v);t=c.t;kind="Case";meta=[c.c,c.y].filter(Boolean).join(", ");break}
  case "s":{const it=typeof stItem==="function"?stItem(v):null;if(!it||typeof stTab!=="function")return null;h=routeFormat("studio",stTab(it),v);t=it.title;kind="Visual explainer";break}
  case "r":{const j=v.indexOf("/"),sec=j<0?v:v.slice(0,j),lab=j<0?null:v.slice(j+1);const tb=ccTabIdx(sec,lab);if(tb<0)return null;
   h=routeFormat(sec,tb);const s=SECTIONS.find(x=>x.v===sec);t=lab||(s?s.n:sec);kind="Page";break}
  default:return null}}catch(e){return null}
 return h&&ccLive(h)?{h,t:String(t).trim(),kind,meta,spec}:null;
}
function ccIbAll(specs){return (specs||[]).map(ccIb).filter(Boolean)}
/* UPSC: volumes and their parts, syllabus lines, current affairs, previews */
function ccUpT(k,d){try{if(typeof UP_T!=="undefined"&&UP_T&&UP_T[k]!=null)return UP_T[k]}catch(e){}return d}
function ccVol(n){try{return UPSC_HB.volumes.find(v=>v.n===n||v.id===n)||null}catch(e){return null}}
function ccParts(v,spec){
 if(!v||!Array.isArray(v.parts))return null;const L=v.parts.map(p=>p.l),out=[];
 for(const ch of String(spec).split(/\s*,\s*/)){const m=/^([A-Z])\s+to\s+([A-Z])$/.exec(ch);
  if(m){const a=L.indexOf(m[1]),b=L.indexOf(m[2]);if(a<0||b<a)return null;out.push(...L.slice(a,b+1))}
  else if(/^[A-Z]$/.test(ch)&&L.includes(ch))out.push(ch);else return null}
 return out.length?out:null}
function ccVolHref(v){return routeFormat("upsc",ccUpT("handbooks",3),v.id)}
function ccVolRef(n,spec){const v=ccVol(n);if(!v)return null;const parts=ccParts(v,spec);if(!parts)return null;
 const h=ccVolHref(v),r=(()=>{try{return routeParse(h)}catch(e){return null}})();
 return r&&r.v==="upsc"&&r.a===v.id?{v,parts,spec,h}:null}
function ccCa(id){try{return UP_CA.find(c=>c.id===id)||null}catch(e){return null}}
function ccDate(c){try{const d=new Date(c.d+"T12:00:00Z");return d.toLocaleDateString("en-GB",c.month?{month:"long",year:"numeric"}:{day:"numeric",month:"long",year:"numeric"})}catch(e){return c.d}}
function ccTopic(id){try{return id?UP_TOPICS.find(t=>t.id===id)||null:null}catch(e){return null}}
function ccTheme(id){try{return UP_PRE.find(t=>t.id===id)||null}catch(e){return null}}
function ccMains(id){try{return UP_MAINS.find(m=>m.id===id)||null}catch(e){return null}}
function ccGs2(i){try{return UP_GS2[i]||null}catch(e){return null}}
function ccPreLine(){try{return UP_PRE_OFFICIAL.find(x=>/Economic and Social Development/.test(x))||null}catch(e){return null}}
function ccSylSrc(){try{return UP_SYL_SRC}catch(e){return null}}
function ccUpHref(tab,d,arg){return routeFormat("upsc",ccUpT(tab,d),arg)}
/* a UPSC examination note: from a volume, a theme, a preview or a line */
function ccUpNote(ref,which){
 const i=String(ref||"").indexOf(":"),k=ref.slice(0,i),v=ref.slice(i+1);
 if(k==="vol"){const x=ccVol(v);return x?{t:x[which==="pre"?"pre":"mains"],src:`Volume ${x.n}, ${x.title}`}:null}
 if(k==="topic"){const x=ccTopic(v);return x?{t:x[which==="pre"?"pre":"mains"],src:`Topic preview: ${x.t}`}:null}
 if(k==="theme"){const x=ccTheme(v);return x&&x.pre?{t:x.pre,src:`Prelims theme: ${x.t}`}:null}
 if(k==="line"){const x=ccMains(v);return x&&x.ans?{t:x.ans,src:"Mains GS III, explained"}:null}
 return null}
/* IB examination facts, read from the course layer (the guide as encoded) */
function ccSpine(sub){try{return typeof SPINE!=="undefined"&&SPINE[sub]?SPINE[sub]:null}catch(e){return null}}
function ccIbExam(c){
 const types=[],cts=[];
 (c.ib.exam||[]).forEach(([sub,i])=>{const s=ccSpine(sub);const x=s&&s.exam;if(!x)return;
  if(x.types&&x.types[i])types.push({sub,t:x.types[i]});(x.ct||[]).forEach(t=>{const k=ccCap(t);if(!cts.includes(k))cts.push(k)})});
 return {types,cts:cts.slice(0,9)}}
function ccIbPrac(c){return (c.ib.prac||[]).map(([sub,i])=>{const s=ccSpine(sub);const q=s&&s.exam&&s.exam.practice&&s.exam.practice[i];return q?{sub,p:q.p,q:q.q}:null}).filter(Boolean)}
function ccSub(code){try{const s=SUBMAP[code];return s?{code,t:s.title,lvl:s.lvl,u:s.unit,un:s.unitName}:null}catch(e){return null}}
function ccAo(t){try{const g=GUIDE.ct[t];return g?g[0]:""}catch(e){return ""}}

/* ── the index ──────────────────────────────────────────────────────────── */
function ccHub(missing){
 const lens=CCS.lens,n=CC_ORDER.length;
 const lb=(k,l)=>`<button type="button" class="cc-lb" data-lens="${k}" aria-pressed="${lens===k}" onclick="ccLens('${k}')">${l}</button>`;
 return `<section class="cc-mast" aria-labelledby="cc-h1"><div class="cc-wrap">
  <p class="cc-k">Shared by IB DP and UPSC CSE</p>
  <h1 class="cc-h1" id="cc-h1">One Concept. Two Perspectives.</h1>
  <p class="cc-lede">The ideas that IB DP Economics and UPSC CSE Economics share, each explained once. A concept opens on its shared foundation; a switch then shows how each programme applies it, in its own terms and for its own examination.</p>
  <ol class="cc-legend">
   <li><span class="cc-lg-k">Shared foundation</span><span>Definition, explanation, measurement and key terms, written once.</span></li>
   <li class="ib"><span class="cc-lg-k">IB DP perspective</span><span>Subtopics, diagrams, command terms and Papers 1 to 3.</span></li>
   <li class="upsc"><span class="cc-lg-k">UPSC CSE perspective</span><span>Syllabus lines, handbook volumes, current affairs, Prelims and Mains.</span></li></ol></div></section>
 ${missing?`<div class="cc-wrap"><p class="cc-miss" role="status">There is no concept called “${ccE(missing)}” here. The index below lists every shared concept.</p></div>`:""}
 <section class="cc-index" aria-labelledby="cc-ix-h"><div class="cc-wrap">
  <div class="cc-ix-bar"><div><p class="cc-k">The index</p><h2 class="cc-h2" id="cc-ix-h">${ccCap(ccCount(n))} shared concepts</h2></div>
   <div class="cc-lens" role="group" aria-label="Read the index as"><span class="cc-lens-k" aria-hidden="true">Read as</span>${lb("shared","The concept")}${lb("ib","IB DP")}${lb("upsc","UPSC CSE")}</div></div>
  <div class="cc-groups" id="cc-groups" data-lens="${lens}">
  ${CC_GROUPS.map((g,gi)=>{const L=CC_ORDER.filter(c=>c.g===g.k);if(!L.length)return "";
   return `<section class="cc-group" aria-labelledby="cc-g-${g.k}"><header class="cc-gh"><span class="cc-gn" aria-hidden="true">${CC_ROMAN[gi]}</span>
    <h3 class="cc-h3" id="cc-g-${g.k}">${ccE(g.n)}</h3><p>${ccE(g.d)}</p></header>
    <ol class="cc-rows">${L.map(c=>ccRow(c,lens)).join("")}</ol></section>`}).join("")}</div></div></section>
 ${ccApart()}${ccProvHub()}`}
function ccRow(c,lens){const i=CC_ORDER.indexOf(c)+1;
 return `<li class="cc-row" id="cc-r-${c.id}"><span class="cc-rn" aria-hidden="true">${String(i).padStart(2,"0")}</span>
  <div class="cc-rm"><a class="cc-rt" data-cc="${c.id}" href="${ccLink(c.id,lens==="shared"?null:lens)}">${ccE(c.t)}</a>
   <p class="cc-rl"><span class="cc-x" data-l="shared">${ccE(c.line)}</span><span class="cc-x" data-l="ib">${ccE(c.ibl)}</span><span class="cc-x" data-l="upsc">${ccE(c.upl)}</span></p></div>
  <div class="cc-rtags"><a class="cc-tag ib" href="${ccLink(c.id,"ib")}"><span class="cc-sr">${ccE(c.t)}, </span>IB DP · ${ccE(c.ib.tag)}</a>
   <a class="cc-tag upsc" href="${ccLink(c.id,"upsc")}"><span class="cc-sr">${ccE(c.t)}, </span>UPSC · ${ccE(c.up.tag)}</a></div></li>`}
function ccApart(){
 const ib=CC_APART.ib.map(([t,d,spec])=>{const l=ccIb(spec);return `<li><b>${l?`<a class="cc-ap" href="${ccA(l.h)}">${ccE(t)}</a>`:ccE(t)}</b><span>${ccE(d)}</span></li>`}).join("");
 const up=CC_APART.up.map(([t,d,n])=>{const v=ccVol(n);return `<li><b>${v?`<a class="cc-ap" href="${ccA(ccVolHref(v))}">${ccE(t)}</a>`:ccE(t)}</b><span>${ccE(d)}${v?` Volume ${ccE(v.n)}.`:""}</span></li>`}).join("");
 return `<section class="cc-apart" aria-labelledby="cc-apart-h"><div class="cc-wrap">
  <p class="cc-k">Not everything is shared</p><h2 class="cc-h2" id="cc-apart-h">Where the two pathways part</h2>
  <p class="cc-sub">Some parts of each programme have no real counterpart in the other. They stay in their own pathway rather than being forced into a pair.</p>
  <div class="cc-apart-grid"><div class="cc-apart-c ib"><h3 class="cc-h4">Only in IB DP Economics</h3><ul>${ib}</ul></div>
   <div class="cc-apart-c upsc"><h3 class="cc-h4">Only in UPSC CSE Economics</h3><ul>${up}</ul></div></div></div></section>`}
function ccProvText(){
 const v=(()=>{try{return COURSE.meta.version}catch(e){return ""}})(),s=ccSylSrc(),ca=(()=>{try{return UP_CA_COMPILED}catch(e){return ""}})();
 return [`The shared foundations are written for this platform.`,
  `IB DP statements follow the IB Economics guide (first assessment 2022) as this platform's course layer encodes it${v?` (version ${ccE(v)})`:""}; subtopic titles, command terms and paper types are read from it, and its practice questions are written for this platform, not taken from IB papers.`,
  `UPSC CSE statements follow the official syllabus${s?`, quoted from ${ccE(s.doc)} (${ccE(s.date)})`:""}, and the recorded contents and syllabus maps of the Economics Collection.`,
  `Figures appear only inside dated current-affairs entries, each with its own source${ca?`, compiled by hand on ${ccE(ca)}`:""}.`]}
function ccProvHub(){return `<section class="cc-provs" aria-labelledby="cc-prov-h"><div class="cc-wrap"><h2 class="cc-h4" id="cc-prov-h">How these pages are written</h2>
 <p class="cc-prov">${ccProvText().join(" ")}</p></div></section>`}

/* ── one concept ────────────────────────────────────────────────────────── */
function ccPath(path){return path||CCS.pick||CCS.last||"ib"}
function ccPage(c,path){
 const p=ccPath(path),i=CC_ORDER.indexOf(c),N=CC_ORDER.length,prev=CC_ORDER[(i+N-1)%N],next=CC_ORDER[(i+1)%N],g=CC_GROUPS.find(x=>x.k===c.g);
 const tab=(k,l)=>`<button type="button" role="tab" class="cc-tab ${k}" id="cc-t-${k}" data-p="${k}" aria-controls="cc-p-${k}" aria-selected="${p===k}" tabindex="${p===k?0:-1}" onclick="ccPick('${k}')" onkeydown="ccTabKey(event)"><span class="cc-tab-dot" aria-hidden="true"></span>${l}</button>`;
 return `<div class="cc-page" data-id="${c.id}" data-path="${p}">
 <section class="cc-mast cc-mast-c" aria-labelledby="cc-h1"><div class="cc-wrap">
  <nav class="cc-crumb" aria-label="Breadcrumb"><a class="cc-cr" href="#/concepts">One Concept. Two Perspectives.</a><span aria-hidden="true">/</span><span>${ccE(g?g.n:"")}</span></nav>
  <p class="cc-k">Shared concept ${i+1} of ${N}</p>
  <h1 class="cc-h1" id="cc-h1">${ccE(c.t)}</h1>
  <p class="cc-lede cc-def">${ccE(c.def)}</p>
  <div class="cc-anchors"><a class="cc-chip ib" href="${ccLink(c.id,"ib")}" onclick="return ccJump(event,'ib')">IB DP · ${ccE(c.ib.tag)}</a>
   <a class="cc-chip upsc" href="${ccLink(c.id,"upsc")}" onclick="return ccJump(event,'upsc')">UPSC CSE · ${ccE(c.up.tag)}</a></div></div></section>
 ${ccFound(c)}
 <section class="cc-applied" id="cc-applied" aria-labelledby="cc-ap-h">
  <div class="cc-switch"><div class="cc-wrap cc-switch-in">
   <h2 class="cc-sr" id="cc-ap-h">The concept in each programme</h2>
   <div class="cc-tabs" id="cc-tabs" role="tablist" aria-label="Perspective">${tab("ib","IB DP Perspective")}${tab("upsc","UPSC Perspective")}</div>
   <p class="cc-switch-note">The foundation above stays as it is. The switch changes only how it is applied.</p></div></div>
  <div class="cc-panels">${ccPanelIb(c,p==="ib")}${ccPanelUp(c,p==="upsc")}</div></section>
 <section class="cc-more" aria-labelledby="cc-rel-h"><div class="cc-wrap">
  <h2 class="cc-h4" id="cc-rel-h">Related concepts</h2>
  <ul class="cc-rel">${c.rel.map(ccGet).filter(Boolean).map(r=>`<li><a class="cc-pill" data-cc="${r.id}" href="${ccLink(r.id,p)}">${ccE(r.t)}</a></li>`).join("")}</ul>
  <nav class="cc-pn" aria-label="Previous and next concept">
   <a class="prev" data-cc="${prev.id}" href="${ccLink(prev.id,p)}"><span class="cc-pnk">Previous concept</span><span class="cc-pnt"><span aria-hidden="true">← </span>${ccE(prev.t)}</span></a>
   <a class="next" data-cc="${next.id}" href="${ccLink(next.id,p)}"><span class="cc-pnk">Next concept</span><span class="cc-pnt">${ccE(next.t)}<span aria-hidden="true"> →</span></span></a></nav>
  <p class="cc-prov">${ccProvText().join(" ")}</p>
  <p class="cc-back"><a class="cc-bk" href="#/concepts">All ${ccCount(N)} concepts</a></p></div></section></div>`}
function ccFound(c){
 const dg=(c.dg||[]).filter(k=>{try{return DGKEYS.includes(k)}catch(e){return false}});
 let fig="";
 if(dg.length){let svg="";try{svg=dgm(dg[0],{note:false,src:"Diagram atlas"})}catch(e){svg=""}
  const plates=ccIbAll(dg.map(k=>"d:"+k));
  if(svg||plates.length)fig=`<div class="cc-fig">${svg}<p class="cc-fig-k">${plates.length>1?"Plates for this concept in the diagram atlas":"Open the plate in the diagram atlas"}</p>
   <ul class="cc-pills">${plates.map(l=>`<li><a class="cc-pill" href="${ccA(l.h)}">${ccE(l.t)}</a></li>`).join("")}</ul></div>`}
 return `<section class="cc-found" aria-labelledby="cc-found-h"><div class="cc-wrap cc-found-grid">
  <div class="cc-found-main"><p class="cc-k">Shared by both pathways</p><h2 class="cc-h2" id="cc-found-h">The foundation</h2>
   <div class="cc-text">${c.text.map(t=>`<p>${ccE(t)}</p>`).join("")}</div>${fig}</div>
  <aside class="cc-found-side" aria-label="Measurement and key terms">
   ${c.measure?`<div class="cc-box"><h3 class="cc-h4">How it is measured</h3><p>${ccE(c.measure)}</p></div>`:""}
   <div class="cc-box"><h3 class="cc-h4">Key terms</h3><dl class="cc-terms">${c.terms.map(([t,d])=>`<div><dt>${ccE(t)}</dt><dd>${ccE(d)}</dd></div>`).join("")}</dl></div></aside></div></section>`}
function ccList(items,cls){return items.length?`<ul class="cc-ll ${cls||""}">${items.map(l=>`<li><a class="cc-li" href="${ccA(l.h)}"><span class="cc-lk">${ccE(l.kind)}${l.meta?` · ${ccE(l.meta)}`:""}</span><span class="cc-lt">${ccE(l.t)}</span><span class="cc-arr" aria-hidden="true">→</span></a></li>`).join("")}</ul>`:""}
function ccPanelIb(c,on){
 const subs=c.ib.subs.map(ccSub).filter(Boolean),ex=ccIbExam(c),pr=ccIbPrac(c),one=ex.types.length>0&&ex.types.every(x=>x.sub===ex.types[0].sub);
 const learn=ccIbAll(c.ib.links),cases=ccIbAll(c.ib.cases),calc=ccIbAll(c.ib.calc);
 const units=[...new Set(subs.map(s=>s.u))].map(u=>{const s=subs.find(x=>x.u===u);return `Unit ${u} · ${s.un}`}).join(" and ");
 return `<div class="cc-panel ib${on?" cc-enter":""}" role="tabpanel" id="cc-p-ib" data-p="ib" aria-labelledby="cc-t-ib" tabindex="0"${on?"":" hidden"}><div class="cc-wrap">
  <header class="cc-ph"><p class="cc-k">IB DP Economics${units?` · ${ccE(units)}`:""}</p><h2 class="cc-h2">${ccE(c.t)} in IB DP Economics</h2>
   <p class="cc-sits">${ccE(c.ib.sits)}</p>
   ${subs.length?`<ul class="cc-subs" aria-label="Subtopics of the IB Economics guide">${subs.map(s=>`<li><span class="cc-code">${ccE(s.code)}</span>${ccE(s.t)}<span class="cc-lvl">${s.lvl==="HL"?"HL only":"SL and HL"}</span></li>`).join("")}</ul>`:""}</header>
  <div class="cc-pgrid"><div class="cc-pmain">
   <h3 class="cc-h3">What the course asks</h3><ul class="cc-pts">${c.ib.pts.map(t=>`<li>${ccE(t)}</li>`).join("")}</ul>
   ${ex.types.length||ex.cts.length?`<h3 class="cc-h3">In the IB examination</h3><div class="cc-exam">
    ${ex.cts.length?`<p class="cc-exam-k">Command terms used with this topic</p><ul class="cc-cts">${ex.cts.map(t=>{const ao=ccAo(t);return `<li class="cc-ct">${ccE(t)}${ao?`<span> · ${ccE(ao)}</span>`:""}</li>`}).join("")}</ul>`:""}
    ${ex.types.length?`<p class="cc-exam-k">How it can be examined</p><ul class="cc-papers${one?" one":""}">${ex.types.map(x=>`<li>${one?"":`<span class="cc-code">${ccE(x.sub)}</span>`}<span>${ccE(x.t)}</span></li>`).join("")}</ul>`:""}
    <p class="cc-note">Read from the course layer's ${one?`lesson for ${ccE(ex.types[0].sub)}`:"lessons for these subtopics"}. Papers 1 and 2 are taken at SL and HL, Paper 3 at HL only.</p></div>`:""}
   ${pr.length||calc.length?`<h3 class="cc-h3">Practise</h3>
    ${pr.length?`<ul class="cc-prac">${pr.map(x=>`<li><span class="cc-pp">${ccE(x.p)} · ${ccE(x.sub)}</span><p>${ccE(x.q)}</p></li>`).join("")}</ul><p class="cc-note">Practice questions written for this platform, not taken from IB papers. Their lessons hold the full set.</p>`:""}
    ${calc.length?`<ul class="cc-pills" aria-label="Calculations">${calc.map(l=>`<li><a class="cc-pill" href="${ccA(l.h)}">${ccE(l.t)}</a></li>`).join("")}</ul>`:""}`:""}
  </div><aside class="cc-paside" aria-label="IB DP resources on this platform">
   ${learn.length?`<h3 class="cc-h3">Learn it on this platform</h3>${ccList(learn)}`:""}
   ${cases.length?`<h3 class="cc-h3">Real-world cases</h3>${ccList(cases)}`:""}
  </aside></div></div></div>`}
function ccPanelUp(c,on){
 const u=c.up,pre=ccPreLine(),themes=(u.themes||[]).map(ccTheme).filter(Boolean),mains=(u.mains||[]).map(ccMains).filter(Boolean),gs2=(u.gs2||[]).map(ccGs2).filter(Boolean);
 const vols=(u.vols||[]).map(([n,s])=>ccVolRef(n,s)).filter(Boolean),ca=(u.ca||[]).map(ccCa).filter(Boolean),tp=ccTopic(u.topic),src=ccSylSrc();
 const npre=ccUpNote(u.exam&&u.exam.pre,"pre"),nmains=ccUpNote(u.exam&&u.exam.mains,"mains");
 let head="";try{head=UP_MAINS_HEAD}catch(e){}
 const q=(lab,cls,t,extra)=>`<blockquote class="cc-q"><p><span class="cc-lab ${cls}">${lab}</span>${t}</p>${extra||""}</blockquote>`;
 const syl=[];
 if(themes.length&&pre)syl.push(q("Official","o",`<span class="cc-qk">Prelims · General Studies Paper I</span> <q>${ccE(pre)}</q>`,
  `<p class="cc-qe"><span class="cc-lab e">Explained</span>Studied under the Prelims theme${themes.length>1?"s":""} ${themes.map(t=>`<a class="cc-ql" href="${ccA(ccUpHref("syllabus",1))}">${ccE(t.t)}</a>`).join(themes.length>2?", ":" and ").replace(/, (?=[^,]*$)/," and ")}.</p>`));
 mains.forEach(m=>syl.push(q("Official","o",`<span class="cc-qk">Mains · General Studies Paper III</span> <q>${ccE(m.o)}</q>`,`<p class="cc-qe"><a class="cc-ql" href="${ccA(ccUpHref("syllabus",1,"mains"))}">This line, explained, with its dimensions</a></p>`)));
 gs2.forEach(m=>syl.push(q("Official","o",`<span class="cc-qk">Mains · General Studies Paper II</span> <q>${ccE(m.o)}</q>`,"")));
 const volHtml=vols.map(x=>{const v=x.v,all=x.parts.length===v.parts.length,img=v.img&&v.img.cover;
  const ps=all?`Parts ${x.parts[0]} to ${x.parts[x.parts.length-1]}: the whole volume`:x.parts.length<=3?x.parts.map(l=>{const pt=v.parts.find(p=>p.l===l);return `Part ${l} · ${pt.t}`}).join("; "):`Parts ${x.spec}`;
  return `<li class="cc-vol"><a class="cc-va" href="${ccA(x.h)}">${img?`<img src="${ccA(img.src)}" alt="" width="${img.w}" height="${img.h}" loading="lazy" decoding="async">`:`<span class="cc-vol-ph" aria-hidden="true">${ccE(v.n)}</span>`}
   <span><span class="cc-vol-n">Volume ${ccE(v.n)}</span><span class="cc-vol-t">${ccE(v.title)}</span><span class="cc-vol-p">${ccE(ps)}</span></span></a></li>`}).join("");
 return `<div class="cc-panel upsc${on?" cc-enter":""}" role="tabpanel" id="cc-p-upsc" data-p="upsc" aria-labelledby="cc-t-upsc" tabindex="0"${on?"":" hidden"}><div class="cc-wrap">
  <header class="cc-ph"><p class="cc-k">UPSC CSE Economics · Prelims and Mains</p><h2 class="cc-h2">${ccE(c.t)} in UPSC CSE Economics</h2>
   <p class="cc-sits">${ccE(u.sits)}</p></header>
  <div class="cc-pgrid"><div class="cc-pmain">
   <h3 class="cc-h3">What the examination asks</h3><ul class="cc-pts">${u.pts.map(t=>`<li>${ccE(t)}</li>`).join("")}</ul>
   <h3 class="cc-h3">The syllabus, in UPSC's words</h3>
   <div class="cc-syl">${syl.join("")}${u.synote?`<p class="cc-synote">${ccE(u.synote)}</p>`:""}
    ${src?`<p class="cc-note">Official wording from ${ccE(src.doc)}, ${ccE(src.date)}. ${head?`Paper III is headed “${ccE(head)}”.`:""}</p>`:""}</div>
   ${npre||nmains?`<h3 class="cc-h3">In the UPSC examination</h3><div class="cc-exam up">
    ${npre?`<p class="cc-exam-k">Prelims</p><p class="cc-exam-t">${ccE(npre.t)}</p><p class="cc-note">From ${ccE(npre.src)}.</p>`:""}
    ${nmains?`<p class="cc-exam-k">Mains, General Studies</p><p class="cc-exam-t">${ccE(nmains.t)}</p><p class="cc-note">From ${ccE(nmains.src)}.</p>`:""}</div>`:""}
   ${tp?`<h3 class="cc-h3">Practise</h3><ul class="cc-prac up"><li><span class="cc-pp">Prelims-style question · ${ccE(tp.t)}</span><p>${ccE(tp.mcq.q)}</p>
    <p class="cc-go"><a class="cc-ql" href="${ccA(ccUpHref("resources",2,tp.id))}">Answer it in the topic preview <span aria-hidden="true">→</span></a></p></li></ul>
    <p class="cc-note">Written for this platform, not taken from a UPSC paper.</p>`:""}
  </div><aside class="cc-paside" aria-label="UPSC CSE resources on this platform">
   ${volHtml?`<h3 class="cc-h3">In the Economics Collection</h3><ul class="cc-vols">${volHtml}</ul>`:""}
   ${ca.length?`<h3 class="cc-h3">Current affairs</h3><ul class="cc-ca">${ca.map(x=>`<li><time datetime="${ccA(x.d)}">${ccE(ccDate(x))}</time><b>${ccE(x.h)}</b><p>${ccE(x.w)}</p><p class="cc-src">Source: ${ccE(x.src)}</p></li>`).join("")}</ul>
    <p class="cc-go"><a class="cc-ql" href="${ccA(ccUpHref("current",4))}">All current affairs <span aria-hidden="true">→</span></a></p>`:`<p class="cc-note">No dated current-affairs entry is linked to this concept yet.</p>`}
  </aside></div></div></div>`}

/* ── the switch ─────────────────────────────────────────────────────────── */
function ccPick(p){
 if(p!=="ib"&&p!=="upsc")return;
 const root=document.querySelector("#view .cc-page");if(!root)return;
 CCS.pick=p;root.dataset.path=p;
 root.querySelectorAll('#cc-tabs [role="tab"]').forEach(t=>{const on=t.dataset.p===p;t.setAttribute("aria-selected",String(on));t.tabIndex=on?0:-1});
 root.querySelectorAll(".cc-panel").forEach(el=>{const on=el.dataset.p===p;
  if(on){if(el.hidden){el.hidden=false;el.classList.remove("cc-enter");void el.offsetWidth;el.classList.add("cc-enter")}}else el.hidden=true});
 root.querySelectorAll(".cc-more a[data-cc]").forEach(a=>a.setAttribute("href",ccLink(a.dataset.cc,p)));
 /* the reader stays where they are; only when they had scrolled into the
    panel does the new panel's start come up to sit under the switch */
 const sw=root.querySelector(".cc-switch"),pn=root.querySelector(".cc-panels");
 if(sw&&pn){const sb=sw.getBoundingClientRect().bottom,pt=pn.getBoundingClientRect().top;if(pt<sb-1)window.scrollBy(0,pt-sb)}
 const a=ccArg(ARG);if(VIEW==="concepts"&&a.id){ARG=a.id+"/"+p;ccReplace()}
}
function ccTabKey(e){
 const tab=e.target&&e.target.closest&&e.target.closest('[role="tab"]');if(!tab)return;
 const list=tab.closest('[role="tablist"]');if(!list)return;
 const tabs=[...list.querySelectorAll('[role="tab"]')],i=tabs.indexOf(tab);let j=null;
 if(e.key==="ArrowRight")j=(i+1)%tabs.length;else if(e.key==="ArrowLeft")j=(i+tabs.length-1)%tabs.length;
 else if(e.key==="Home")j=0;else if(e.key==="End")j=tabs.length-1;
 if(j===null)return;e.preventDefault();tabs[j].focus();tabs[j].click()}
/* the masthead's two chips open a perspective in place and bring the switch into view */
function ccJump(e,p){
 if(e&&(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button>0))return true;
 if(!document.querySelector("#view .cc-page"))return true;
 ccPick(p);const s=document.getElementById("cc-applied");
 if(s){const rm=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  try{s.scrollIntoView({behavior:rm?"auto":"smooth",block:"start"})}catch(x){s.scrollIntoView()}
  const t=document.getElementById("cc-t-"+p);if(t)try{t.focus({preventScroll:true})}catch(x){}}
 return false}
/* the index's lens: which line each row shows, and where its title leads */
function ccLens(l){
 if(l!=="shared"&&l!=="ib"&&l!=="upsc")return;CCS.lens=l;
 const g=document.getElementById("cc-groups");if(!g)return;g.dataset.lens=l;
 document.querySelectorAll(".cc-lens .cc-lb").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.lens===l)));
 g.querySelectorAll("a.cc-rt").forEach(a=>a.setAttribute("href",ccLink(a.dataset.cc,l==="shared"?null:l)))}

/* ── the teaser, for the home page, the UPSC resources and IB pages ────── */
function ccTeaser(opts){
 opts=opts||{};
 const path=opts.path==="ib"||opts.path==="upsc"?opts.path:"shared";
 const n=opts.n===3?3:4;
 const ids=(Array.isArray(opts.ids)&&opts.ids.length?opts.ids:CC_TZ[path]).filter(ccGet).slice(0,n);
 if(ids.length<3)CC_TZ[path].forEach(id=>{if(ids.length<n&&!ids.includes(id))ids.push(id)});
 const uid="cc-tz-"+(++CCS.seq),lv=Math.min(4,Math.max(2,opts.level|0||2));
 const tabs=[["shared","The concept"],["ib","IB DP"],["upsc","UPSC CSE"]];
 const tab=([k,l])=>`<button type="button" role="tab" id="${uid}-t-${k}" data-l="${k}" aria-controls="${uid}-p" aria-selected="${k===path}" tabindex="${k===path?0:-1}" onclick="ccTz(this,'${k}')" onkeydown="ccTabKey(event)">${l}</button>`;
 const card=id=>{const c=ccGet(id),i=CC_ORDER.indexOf(c)+1;
  return `<li><a class="cc-tz-c" data-cc="${c.id}" href="${ccLink(c.id,path==="shared"?null:path)}">
   <span class="cc-tz-n" aria-hidden="true">${String(i).padStart(2,"0")}</span><span class="cc-tz-t">${ccE(c.t)}<span class="cc-sr">.</span></span>
   <span class="cc-tz-x" data-l="shared">${ccE(c.line)}</span><span class="cc-tz-x" data-l="ib">${ccE(c.ibl)}</span><span class="cc-tz-x" data-l="upsc">${ccE(c.upl)}</span>
   <span class="cc-tz-go">Open the concept<span class="cc-sr">.</span> <span aria-hidden="true">→</span></span></a></li>`};
 return `<section class="cc-tz" id="${uid}" data-lens="${path}" aria-labelledby="${uid}-h">
  <div class="cc-tz-head"><div><p class="cc-tz-k">IB DP and UPSC CSE</p><h${lv} class="cc-tz-h" id="${uid}-h">${ccE(opts.title||"One Concept. Two Perspectives.")}</h${lv}>
   <p class="cc-tz-l">Each idea is explained once, then applied in IB DP and in UPSC CSE terms.</p></div>
   <div class="cc-seg" role="tablist" aria-label="Show each concept as">${tabs.map(tab).join("")}</div></div>
  <div class="cc-tz-p" role="tabpanel" id="${uid}-p" aria-labelledby="${uid}-t-${path}"><ol class="cc-tz-grid">${ids.map(card).join("")}</ol></div>
  <p class="cc-tz-foot"><a class="cc-tz-all" href="#/concepts">All ${ccCount(CC_ORDER.length)} shared concepts <span aria-hidden="true">→</span></a></p></section>`}
function ccTz(btn,l){
 const root=btn&&btn.closest&&btn.closest(".cc-tz");if(!root||(l!=="shared"&&l!=="ib"&&l!=="upsc"))return;
 root.dataset.lens=l;
 root.querySelectorAll('[role="tab"]').forEach(t=>{const on=t.dataset.l===l;t.setAttribute("aria-selected",String(on));t.tabIndex=on?0:-1;
  if(on){const pn=root.querySelector('[role="tabpanel"]');if(pn)pn.setAttribute("aria-labelledby",t.id)}});
 root.querySelectorAll("a.cc-tz-c").forEach(a=>a.setAttribute("href",ccLink(a.dataset.cc,l==="shared"?null:l)))}

/* ── the section ────────────────────────────────────────────────────────── */
VIEWS.concepts=function(){const r=ccArg(ARG),c=r.id?ccGet(r.id):null;
 return `<div class="cc">${c?ccPage(c,r.path):ccHub(r.id||null)}</div>`};
/* after each paint: the title, and which pathway the reader came from */
(function(){if(typeof document==="undefined")return;
 const prev=render;render=function(){const r=prev.apply(this,arguments);try{ccAfter()}catch(e){}return r}})();
function ccAfter(){
 if(VIEW!=="concepts"){try{const p=fxPathway(VIEW);if(p==="ib"||p==="upsc")CCS.last=p}catch(e){}return}
 const a=ccArg(ARG),c=a.id?ccGet(a.id):null;
 if(c&&a.path)CCS.pick=a.path;
 document.title=(c?c.t+" · ":"")+"One Concept. Two Perspectives. · Arjun Agrawal · Economics"}

/* ── search: every concept, under a kind that says it is shared ─────────── */
(function(){if(typeof buildIndex!=="function")return;const prev=buildIndex;
 buildIndex=function(){if(SIDX)return SIDX;const I=prev().slice();
  I.push({k:CC_KIND,t:"One Concept. Two Perspectives.",d:`${ccCap(ccCount(CC_ORDER.length))} concepts shared by IB DP and UPSC CSE Economics`,go:"nav('concepts')",
   s:"one concept two perspectives shared concepts ib dp upsc cse economics index connector"});
  CC_ORDER.forEach(c=>I.push({k:CC_KIND,t:c.t,d:c.line+" IB DP and UPSC CSE.",go:`nav('concepts',0,'${c.id}')`,
   s:[c.t,c.aka,c.line,c.ibl,c.upl,c.def,"shared concept ib dp upsc cse",c.ib.subs.join(" "),c.up.vols.map(v=>"volume "+v[0]).join(" ")].join(" ").toLowerCase()}));
  return SIDX=I};
 if(typeof RN_KIND_W!=="undefined")RN_KIND_W[CC_KIND]=2.5;
 try{if(typeof CPGROUPS!=="undefined"){const g=CPGROUPS.find(x=>x[0]==="concepts");
  if(g&&g[2] instanceof RegExp&&!g[2].test(CC_KIND)&&/\)\$$/.test(g[2].source))g[2]=new RegExp(g[2].source.replace(/\)\$$/,"|"+CC_KIND.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+")$"),g[2].flags)}}catch(e){}
 try{SIDX=null}catch(e){}})();

/* ── self-tests: every record, every link, every address ───────────────── */
/* every specification in every record, resolved; the dropped ones named */
/* a lesson needs assets/data/course.js and a case the case collection; a copy
   of the page opened without them drops those links, and says why */
function ccAbsent(spec){try{if(/^l:/.test(spec))return !(typeof COURSE_OK!=="undefined"&&COURSE_OK);if(/^w:/.test(spec))return !(typeof RWLOADED==="function"&&RWLOADED())}catch(e){}return false}
function ccAudit(){
 const kept=[],dropped=[];
 CC_DATA.forEach(c=>{[...c.ib.links,...c.ib.cases,...c.ib.calc,...(c.dg||[]).map(k=>"d:"+k)].forEach(s=>{const l=ccIb(s);if(l)kept.push({id:c.id,spec:s,h:l.h});else dropped.push({id:c.id,spec:s,absent:ccAbsent(s)})});
  (c.up.vols||[]).forEach(([n,sp])=>{const r=ccVolRef(n,sp);(r?kept:dropped).push({id:c.id,spec:"vol:"+n+" "+sp,h:r&&r.h})});
  (c.up.ca||[]).forEach(x=>{(ccCa(x)?kept:dropped).push({id:c.id,spec:"ca:"+x})});
  (c.up.mains||[]).forEach(x=>{(ccMains(x)?kept:dropped).push({id:c.id,spec:"mains:"+x})});
  (c.up.themes||[]).forEach(x=>{(ccTheme(x)?kept:dropped).push({id:c.id,spec:"theme:"+x})});
  (c.up.gs2||[]).forEach(x=>{(ccGs2(x)?kept:dropped).push({id:c.id,spec:"gs2:"+x})});
  if(c.up.topic)(ccTopic(c.up.topic)?kept:dropped).push({id:c.id,spec:"topic:"+c.up.topic})});
 CC_APART.ib.forEach(([,,s])=>{const l=ccIb(s);if(l)kept.push({id:"apart",spec:s,h:l.h});else dropped.push({id:"apart",spec:s,absent:ccAbsent(s)})});
 CC_APART.up.forEach(([,,n])=>{(ccVol(n)?kept:dropped).push({id:"apart",spec:"vol:"+n})});
 return {kept,dropped}}
function CONCEPTSUITE(){const out=[];const T=(n,f)=>{let ok=false,det="";try{const r=f();ok=r===true||(r&&r.ok);if(r&&r.d)det=r.d}catch(e){det=e.message}out.push({n:"Shared concepts · "+n,ok:!!ok,detail:det})};
 const keep={VIEW,TAB,ARG},view=a=>{VIEW="concepts";TAB=0;ARG=a;try{return VIEWS.concepts()}finally{VIEW=keep.VIEW;TAB=keep.TAB;ARG=keep.ARG}};
 const own=c=>[c.line,c.ibl,c.upl,c.def,...c.text,c.measure||"",...c.terms.flat(),c.ib.sits,...c.ib.pts,c.up.sits,...c.up.pts,c.up.synote||""];
 const wc=s=>s.trim().split(/\s+/).length;
 T("nineteen concepts in six groups, each id unique and each group used",()=>CC_DATA.length>=18&&new Set(CC_DATA.map(c=>c.id)).size===CC_DATA.length&&CC_ORDER.length===CC_DATA.length&&CC_GROUPS.every(g=>CC_DATA.some(c=>c.g===g.k)));
 T("every foundation has a definition, 150 to 250 words of explanation, a measure and at least four key terms",()=>{const bad=CC_DATA.filter(c=>{const w=c.text.reduce((a,p)=>a+wc(p),0);return !c.def||w<150||w>250||!c.measure||c.terms.length<4});return {ok:!bad.length,d:bad.map(c=>c.id).join(",")}});
 T("every concept has an IB and a UPSC perspective of at least three specific points, each saying how central it is",()=>CC_DATA.every(c=>c.ib.pts.length>=3&&c.up.pts.length>=3&&c.ib.sits&&c.up.sits&&c.ib.subs.length));
 T("the records use no en or em dash, and carry no figures of their own (no %, ₹, $, crore or billion)",()=>{const bad=CC_DATA.filter(c=>own(c).some(s=>/[–—]|%|₹|\$|\bcrore\b|\blakh\b|\bbillion\b|\bper cent\b/i.test(s)));return {ok:!bad.length,d:bad.map(c=>c.id).join(",")}});
 T("no record states a contingent economic claim as an absolute",()=>{const ABS=/\b(always|automatically|guarantees?|proves?|inevitabl\w*|invariably|complete failure|in every case|without exception)\b/i;
  const bad=CC_DATA.flatMap(c=>own(c).filter(s=>ABS.test(s)).map(s=>c.id+": "+s.slice(0,60)));return {ok:!bad.length,d:bad.join(" | ")}});
 T("the one-line summaries are short enough to repeat on several pages (under 90 characters)",()=>CC_DATA.every(c=>[c.line,c.ibl,c.upl].every(s=>s.length<90)));
 T("related concepts exist, and every subtopic named is a real subtopic of the guide",()=>CC_DATA.every(c=>c.rel.length&&c.rel.every(ccGet)&&c.ib.subs.every(s=>!!ccSub(s))));
 T("every diagram named is a plate in the diagram engine, and the first renders",()=>CC_DATA.every(c=>c.dg.every(k=>DGKEYS.includes(k))&&/<svg[\s\S]*<\/svg>/.test(dgm(c.dg[0],{note:false}))));
 T("every concept and perspective has an address that reads back to the same place",()=>CC_DATA.every(c=>[null,"ib","upsc"].every(p=>{const h=ccLink(c.id,p),r=routeParse(h);return r&&r.v==="concepts"&&r.a===(p?c.id+"/"+p:c.id)&&routeFormat(r.v,r.t,r.a)===h}))&&routeParse("#/concepts").a===null&&ccLink("nope")==="#/concepts");
 T("every IB link resolves to a live route and a real item; none is dropped unless its data file did not load",()=>{const a=ccAudit(),ib=a.kept.filter(x=>x.h&&!/^vol:/.test(x.spec)),bad=a.dropped.filter(x=>!x.absent);
  return {ok:ib.length>0&&ib.every(x=>ccLive(x.h))&&!bad.length,d:"dropped: "+bad.map(x=>x.id+" "+x.spec).join(", ")}});
 T("every handbook reference names an existing volume and existing parts, and its link opens that volume",()=>CC_DATA.every(c=>c.up.vols.every(([n,s])=>{const r=ccVolRef(n,s);return r&&routeParse(r.h).a===r.v.id})));
 T("every syllabus, current-affairs and preview reference exists, and each current entry carries a date and a source",()=>CC_DATA.every(c=>c.up.mains.every(ccMains)&&c.up.themes.every(ccTheme)&&c.up.gs2.every(ccGs2)&&(!c.up.topic||ccTopic(c.up.topic))&&c.up.ca.every(id=>{const x=ccCa(id);return x&&/^\d{4}-\d{2}-\d{2}$/.test(x.d)&&x.src})));
 T("the index lists every concept once, under one page heading",()=>{const h=view(null);return (h.match(/<h1/g)||[]).length===1&&(h.match(/class="cc-row"/g)||[]).length===CC_DATA.length&&CC_DATA.every(c=>h.includes(`id="cc-r-${c.id}"`))});
 T("each concept page has one heading, the shared foundation and a tablist of two perspectives",()=>CC_DATA.every(c=>{const h=view(c.id);return (h.match(/<h1/g)||[]).length===1&&h.includes('class="cc-found"')&&(h.match(/role="tab"/g)||[]).length===2&&(h.match(/role="tabpanel"/g)||[]).length===2&&(h.match(/ hidden>/g)||[]).length===1}));
 T("a perspective in the address opens that perspective",()=>{const h=view("inflation/upsc");return /id="cc-t-upsc"[^>]*aria-selected="true"/.test(h)&&/id="cc-p-ib"[^>]* hidden>/.test(h)&&/id="cc-p-upsc"(?![^>]* hidden>)/.test(h)});
 T("an unknown concept opens the index with a notice, not an empty page",()=>{const h=view("not-a-concept");return /class="cc-miss"/.test(h)&&(h.match(/<h1/g)||[]).length===1});
 T("the teaser shows three or four concepts with a live switch and a link to the index, for each perspective",()=>["shared","ib","upsc"].every(p=>{const h=ccTeaser({path:p});const n=(h.match(/class="cc-tz-c"/g)||[]).length;
  return n>=3&&n<=4&&(h.match(/role="tab"/g)||[]).length===3&&new RegExp(`data-l="${p}" aria-controls="[^"]+" aria-selected="true"`).test(h)&&h.includes('href="#/concepts"')})&&(ccTeaser({ids:["taxation","elasticity","inflation"],n:3}).match(/class="cc-tz-c"/g)||[]).length===3);
 T("the teaser's own sentences stay under 90 characters, so it can sit on several pages",()=>{const t=ccTeaser({path:"shared"}).replace(/<[^>]+>/g," ").replace(/\s+/g," ");return t.split(/(?<=[.!?])\s+/).every(s=>s.trim().length<90)});
 T("search lists every concept under its shared kind",()=>{const I=buildIndex().filter(x=>x.k===CC_KIND);return I.length>=CC_DATA.length&&CC_DATA.every(c=>I.some(x=>x.t===c.t&&x.go.includes(c.id)))});
 return out}
CONCEPTSUITE.suiteName="One Concept. Two Perspectives.";
EXTRA_SUITES.push(CONCEPTSUITE);
QAREPORT.push({area:"One Concept. Two Perspectives.",re:/^Shared concepts · /,
 what:"That every shared concept has a foundation of the right length, an IB and a UPSC perspective with specific points, links that resolve to real items (lessons, plates, maps, cases, calculations, handbook volumes and parts, syllabus lines, current affairs), addresses that read back for each perspective, one heading per page, a working teaser and search entries."});
