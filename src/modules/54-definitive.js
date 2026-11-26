/* ═══════════════════════════════════════════════════════════════════════════
   THE DEFINITIVE RELEASE (2026-11-26) · UPSC CSE Economics: four ways in
   The brief asks the UPSC section for clear entry points to Prelims, Mains,
   Core Economics and Books and resources, built from what the platform
   already holds and never from empty sections. Every link below opens an
   existing page; every count is read from the data; nothing that lives only
   in the Digital Revision Companion is offered as if it were on this site:
   those items say so and link to the companion's own page.
   UPSC syllabus requirements stay UPSC's: nothing here borrows the IB guide.
   ═══════════════════════════════════════════════════════════════════════════ */
function upwBook(){return "#/book"}
function upwComp(){return "#/book/digital-revision-companion"}
/* the core areas: the handbook volume(s) whose parts cover each one (checked against the volumes' own
   part titles: Volume I is microeconomics only), and the Part of The Indian Economy (from its contents) */
const UPW_CORE=[
 ["Microeconomic foundations",["I"],"One","Unit 1.1"],
 ["Macroeconomic foundations",[],"One","Unit 1.2"],
 ["National income",[],"One","Unit 1.2"],
 ["Money and banking",["II","VI"],"Three · Four","Units 3.1, 4.1"],
 ["Inflation",["III"],"Three","Unit 3.2"],
 ["Public finance",["IV","V"],"Five",""],
 ["Financial markets",["VII"],"Four","Unit 4.2"],
 ["External sector",["VIII","IX"],"Six",""],
 ["Agriculture",["X"],"Seven",""],
 ["Industry",["XI"],"Eight",""],
 ["Services",[],"Eight",""],
 ["Labour and employment",["XI"],"Eight",""],
 ["Economic development",[],"Two",""]];
function upwVolLinks(ns){return ns.map(n=>{const v=upVol(n);return v?`<a class="upw-vol" href="${upHref("handbooks",v.id)}" title="${esA(v.title)}">Vol. ${esc(v.n)}</a>`:""}).join("")}
function upWays(){
 const T=UP_TOPICS.length,CA=UP_CA.length,H=UPSC_HB.volumes.length,mcq=UP_TOPICS.filter(t=>t.mcq).length,fig=UP_TOPICS.filter(t=>t.fig).length;
 const caPre=UP_CA.filter(c=>c.pre).length,caSrc=UP_CA.filter(c=>c.url).length;
 const li=(href,t,d,tag)=>`<li><a class="upw-a" href="${esA(href)}"><b>${esc(t)}</b><span>${esc(d)}</span>${tag?`<em class="upw-tag">${esc(tag)}</em>`:""}</a></li>`;
 return `<section class="up-sec upw" aria-labelledby="upw-h"><div class="wrap full">
  ${upSH("·","Four ways in","Prelims, Mains, the core of the subject, and the books","Choose the stage you are preparing for, the area of the economy you are studying, or the book you are reading. Every door opens something that is already here.","upw-h")}
  <div class="upw-grid">
   <article class="upw-col" aria-labelledby="upw-pre"><p class="upw-k">Stage 1</p><h3 class="up-h3" id="upw-pre">Prelims</h3>
    <ul>${li(upHref("resources"),"Conceptual learning",`${T} topic previews, each from concept to the Indian evidence`)}
     ${li(upHref("resources"),"High-yield facts","The Prelims note in every topic: the facts and the terms to keep exact")}
     ${li(upHref("resources"),"MCQs",`${mcq} original questions, one per topic, with the reasoning`)}
     ${li(upHref("resources"),"Common traps","The distinctions each topic keeps apart (CPI and WPI, MSP and procurement)")}
     ${li(upHref("handbooks"),"Revision maps",`The revision compendium that closes each of the ${H} handbooks`)}
     ${li(upHref("current"),"Current economic developments",`${CA} entries, ${caPre} with a Prelims angle`)}
     ${li(upwComp(),"PYQ linkage","In the Digital Revision Companion, free with the book","Companion")}</ul></article>
   <article class="upw-col" aria-labelledby="upw-mains"><p class="upw-k">Stage 2</p><h3 class="up-h3" id="upw-mains">Mains</h3>
    <ul>${li(upHref("syllabus","mains"),"The ten Mains lines","Each line of GS Paper III quoted exactly, then explained")}
     ${li(upHref("resources"),"Economic policy and institutions","The India and policy notes in every topic preview")}
     ${li(upHref("current"),"Data and evidence",`${caSrc} current-affairs entries linked to their official source`)}
     ${li(upHref("strategy"),"Answer-writing structure","A four-step structure for a Mains answer, in the preparation strategy")}
     ${li(upHref("resources"),"Diagrams and flowcharts",`${fig} topic diagrams drawn for Mains answers`)}
     ${li(upwComp(),"Mains frameworks and model answers","In the Digital Revision Companion, free with the book","Companion")}</ul></article>
   <article class="upw-col upw-core" aria-labelledby="upw-core"><p class="upw-k">The subject</p><h3 class="up-h3" id="upw-core">Core Economics</h3>
    <ul class="upw-core-l">${UPW_CORE.map(([t,vols,part,unit])=>`<li><span class="upw-ct">${esc(t)}</span><span class="upw-cl">${upwVolLinks(vols)}<a class="upw-part" href="${upwBook()}" title="The Indian Economy, Part ${esA(part)}">Book, Part ${esc(part)}</a></span></li>`).join("")}</ul>
    <p class="upw-n">Vol. links open the handbook; Book links open <i>The Indian Economy</i>, whose chapter explorer lists each Part's chapters.</p></article>
   <article class="upw-col" aria-labelledby="upw-books"><p class="upw-k">Read</p><h3 class="up-h3" id="upw-books">Books and resources</h3>
    <ul>${li(upwBook(),"The Indian Economy","A Comprehensive Academic and Examination Reference · First Edition, 2026-27","Book")}
     ${li(upwComp(),"Digital Revision Companion","Thirteen units of revision and practice","Free")}
     ${li(upHref("handbooks"),"Economics handbooks",`${H} topic volumes for the Economics of General Studies`)}
     ${li(upHref("course"),"Online course","The 3-month intensive online programme")}
     ${li(upHref("resources"),"Revision resources","Topic previews, diagrams and MCQs, free to read")}</ul></article>
  </div>
 </div></section>`;
}
(function(){
 if(typeof upHome!=="function")return;
 const prev=upHome;
 upHome=function(){const h=prev.apply(this,arguments),k=h.indexOf("</section>");
  return k<0?h+upWays():h.slice(0,k+10)+upWays()+h.slice(k+10)};
})();

/* ── self-tests ──────────────────────────────────────────────────────────── */
function UPWSUITE(){
 const out=[];const T=(n,f)=>{let ok=false,det="";try{const r=f();ok=r===true||(r&&r.ok===true);if(r&&r.d)det=r.d}catch(e){det=e.message}out.push({n,ok:!!ok,detail:det})};
 const tpl=h=>{const t=document.createElement("template");t.innerHTML=h;return t.content};
 T("UPSC · four ways in: Prelims, Mains, Core Economics and Books and resources, right after the hero",()=>{
  const k=[VIEW,TAB,ARG];VIEW="upsc";TAB=0;ARG=null;let h="";try{h=upHome()}finally{VIEW=k[0];TAB=k[1];ARG=k[2]}
  const c=tpl(h),hs=[...c.querySelectorAll(".upw-col h3")].map(x=>x.textContent);
  return hs.join("|")==="Prelims|Mains|Core Economics|Books and resources"&&h.indexOf('class="up-sec upw"')<h.indexOf('id="up-why-h"')&&h.indexOf('id="up-h1"')<h.indexOf('class="up-sec upw"')});
 T("UPSC · every door opens an existing page, and the companion's own items say where they live",()=>{
  const c=tpl(upWays()),a=[...c.querySelectorAll("a")];const bad=a.filter(x=>routeParse(x.getAttribute("href"))===null).map(x=>x.getAttribute("href"));
  const comp=a.filter(x=>x.getAttribute("href")==="#/book/digital-revision-companion"&&/PYQ|model answers/i.test(x.textContent));
  return {ok:a.length>=30&&!bad.length&&comp.length===2&&comp.every(x=>/Companion/.test(x.textContent)),d:bad.join(" ")}});
 T("UPSC · the core areas name the thirteen areas of the brief and link real handbook volumes",()=>{
  const c=tpl(upWays()),rows=[...c.querySelectorAll(".upw-core-l li")];
  return rows.length===13&&[...c.querySelectorAll(".upw-vol")].every(x=>/^#\/upsc\//.test(x.getAttribute("href")))&&rows.every(r=>r.querySelector(".upw-part"))});
 T("UPSC · the counts are read from the data, not written",()=>{const h=upWays();
  return h.includes(`${UP_TOPICS.length} topic previews`)&&h.includes(`${UP_CA.length} entries`)&&h.includes(`${UPSC_HB.volumes.length} topic volumes`)});
 return out;
}
UPWSUITE.suiteName="UPSC entry points";
EXTRA_SUITES.push(UPWSUITE);

/* ═══ Real World · the case at a glance ═════════════════════════════════════
   The brief asks every case card for: country, year or period, the economic
   issue, the relevant theory, evidence, policy response, stakeholders, short-
   and long-run effects, evaluation, IB syllabus connections and sources, with
   historical evidence, current developments and illustrative examples kept
   apart, and nothing called verified that has not been verified.
   The case page already carries most of this across its twelve zones and its
   Source and status panel. This adds one compact card at the top that gathers
   it in that order, drawn only from fields the case actually has: the deep
   cards (RW_DEEP) add stakeholders, arguments for and against, and a verdict;
   for the other cases those rows are simply absent, never written for them.
   The status is the platform's own (rwStatus): Verified current, Historical
   (source not opened here), Illustrative, or Needs review. */
function rwGlance(c){
 if(!c||typeof rwStatus!=="function")return "";
 const dp=(typeof rwDeep==="function")?rwDeep(c.id):null,st=rwStatus(c),sc=(typeof rwSourceClass==="function")?rwSourceClass(c):null;
 let sub="";try{sub=rwSub(c).title||""}catch(e){}
 const row=(k,v)=>v?`<div class="rwg-r"><dt>${esc(k)}</dt><dd>${v}</dd></div>`:"";
 const list=a=>a&&a.length?`<ul>${a.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:"";
 const kind=st.k==="illustrative"?"Illustrative example":st.k==="current"?"Current development":"Historical evidence";
 return `<section class="panel rwg mt4" aria-labelledby="rwg-h-${esA(c.id)}">
  <div class="rwg-head"><h2 class="rwg-h" id="rwg-h-${esA(c.id)}">The case at a glance</h2><span class="rwg-kind k-${esA(st.k)}">${esc(kind)}</span></div>
  <dl class="rwg-l">
   ${row("Country or region",esc(c.c))}
   ${row("Year or period",c.y?esc(String(c.y)):"")}
   ${row("Economic issue",esc(c.is))}
   ${row("Relevant theory",esc(c.tp))}
   ${row("Diagram",esc(c.dgt))}
   ${row("Evidence",`${esc(st.n)}. ${esc(st.d)}`)}
   ${dp&&dp.stakeholders&&dp.stakeholders.length?row("Stakeholders",`<ul>${dp.stakeholders.map(s=>`<li><b>${esc(s.who)}</b>: ${esc(s.what)}</li>`).join("")}</ul>`):""}
   ${dp&&dp.pros&&dp.pros.length?row("The case for",list(dp.pros)):""}
   ${dp&&dp.cons&&dp.cons.length?row("The case against",list(dp.cons)):""}
   ${row("Evaluation",esc(c.ev)+(dp&&dp.verdict?`<span class="rwg-v">${esc(dp.verdict)}</span>`:""))}
   ${row("IB syllabus",`${esc(c.sub)}${sub?" "+esc(sub):""}${c.kc&&c.kc.length?` · key concepts: ${esc(c.kc.join(", "))}`:""}${c.pp&&c.pp.length?` · ${esc(c.pp.join(", "))}`:""}`)}
   ${row("Sources",sc?`${esc(sc.n)}: where the primary record lives. No case-level citation is attached yet; check the publishing institution before quoting a figure.`:"")}
  </dl>
 </section>`;
}
(function(){
 if(typeof rwCasePage!=="function")return;
 const prev=rwCasePage;
 rwCasePage=function(){const h=prev.apply(this,arguments);let c=null;try{c=rwById(RWC.id)||rwAll()[0]}catch(e){}
  if(!c)return h;const m=/Content version [^<]*<\/div><\/div><\/div>/.exec(h);
  return m?h.slice(0,m.index+m[0].length)+rwGlance(c)+h.slice(m.index+m[0].length):h};
})();
function RWGSUITE(){
 const out=[];const T=(n,f)=>{let ok=false,det="";try{const r=f();ok=r===true||(r&&r.ok===true);if(r&&r.d)det=r.d}catch(e){det=e.message}out.push({n,ok:!!ok,detail:det})};
 T("Real World · every case shows its glance card in the brief's order, and none is called verified unless its status says so",()=>{
  if(typeof rwAll!=="function"||!rwAll().length)return true;const bad=[];
  for(const c of rwAll()){const h=rwGlance(c);const ks=[...h.matchAll(/<dt>([^<]*)<\/dt>/g)].map(m=>m[1]);
   const want=["Country or region","Economic issue","Relevant theory","Evidence","Evaluation","IB syllabus","Sources"];
   if(!want.every(k=>ks.includes(k)))bad.push(c.id);
   if(rwStatus(c).k!=="current"&&/Verified current/.test(h))bad.push(c.id+" verified");}
  return bad.length?{ok:false,d:bad.slice(0,6).join(", ")}:true});
 T("Real World · stakeholders and arguments appear only for the deep cards that hold them",()=>{
  if(typeof rwAll!=="function"||!rwAll().length)return true;
  return rwAll().every(c=>{const dp=rwDeep(c.id),h=rwGlance(c);return /<dt>Stakeholders<\/dt>/.test(h)===!!(dp&&dp.stakeholders&&dp.stakeholders.length)})});
 return out;
}
RWGSUITE.suiteName="Real World glance";
EXTRA_SUITES.push(RWGSUITE);

/* ═══ search · clearer labels ═══════════════════════════════════════════════
   Every result already says IB DP, UPSC CSE or Both (50-search.js). The brief
   asks for clear labels for SL, HL and university resources too: a result
   whose own title or description names the level gains an SL or HL label, and
   the book and its companion, written for UPSC CSE and for undergraduate and
   postgraduate study, read "UPSC CSE · University" rather than "Both". */
function fxLevelOf(it){const s=String((it&&it.t)||"")+" "+String((it&&it.d)||"");
 const hl=/\bHL\b/.test(s),sl=/\bSL\b/.test(s);return hl&&!sl?"HL":sl&&!hl?"SL":hl&&sl?"SL and HL":""}
function fxIsBookRun(run){return /\bnav\(\s*'book'/.test(String(run||""))||/#\/book/.test(String(run||""))}
(function(){
 if(typeof cpPaint!=="function")return;
 const prev=cpPaint;
 cpPaint=function(){
  const r=prev.apply(this,arguments);
  try{
   const box=document.getElementById("cpres");if(!box)return r;
   box.querySelectorAll(".cprow").forEach((b,i)=>{
    const it=CP.items[i];if(!it)return;
    const p=b.querySelector(".cp-p");
    if(p&&fxIsBookRun(it.run)&&!p.classList.contains("cp-uni")){p.className="cp-p cp-up cp-uni";p.textContent="UPSC CSE · University"}
    const lv=fxLevelOf(it);
    if(lv&&!b.querySelector(".cp-lv")){const s=document.createElement("span");s.className="cp-p cp-lv";s.textContent=lv;b.appendChild(s)}
   });
  }catch(e){}
  return r;
 };
})();
function FXSRCHSUITE(){
 const out=[];const T=(n,f)=>{let ok=false;try{ok=f()===true}catch(e){}out.push({n,ok,detail:""})};
 T("Search · a result that names its level is labelled SL or HL, and only then",()=>fxLevelOf({t:"Crowding out (HL)"})==="HL"&&fxLevelOf({t:"Price elasticity",d:"SL and HL"})==="SL and HL"&&fxLevelOf({t:"Demand"})===""&&fxLevelOf({t:"HLV reader"})==="");
 T("Search · the book and its companion read UPSC CSE · University",()=>fxIsBookRun("nav('book',0)")&&fxIsBookRun("nav('book',1)")&&!fxIsBookRun("nav('upsc',3)"));
 return out;
}
FXSRCHSUITE.suiteName="Search labels";
EXTRA_SUITES.push(FXSRCHSUITE);

/* ═══ titles: the book and its companion name themselves ═══ */
(function(){
 if(typeof fxTitle!=="function")return;
 const prev=fxTitle;
 fxTitle=function(){const r=prev.apply(this,arguments);
  if(VIEW==="book")document.title=TAB===1?"Digital Revision Companion · The Indian Economy · Arjun Agrawal":"The Indian Economy: A Comprehensive Academic and Examination Reference · Arjun Agrawal";
  else if(VIEW==="about")document.title="About Arjun Agrawal · Educator and author · Economics";
  return r};
})();
