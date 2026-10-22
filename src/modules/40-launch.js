/* ═══════════════════════════════════════════════════════════════════════════
   LAUNCH · the final pre-launch pass
   1 · The header. Resources is on the primary bar (its order is settled at the
       end of the build; see tools/migrations/2026-10-22-launch-navigation.py).
       The tools beside the bar are folded so the bar has room: the timer shows
       one control while it is idle, the profile shows its initial, and a
       Resources door stands in the header on tablets and phones, where the bar
       itself is replaced by the drawer.
   2 · Explore Economics Resources. The home page's first band after the cover:
       direct doors into the platform's own resources, each a real page with a
       count taken from the data, and the Resource hub's library. It replaces
       the six pathways, which led to the same places.
   3 · Motion. A restrained reveal for a few large blocks, under the existing
       motion layer (body.rn-anim), so reduced motion, the self-test sweep and
       a failed script all leave every block in place and visible.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── 1 · the header ─────────────────────────────────────────────────────── */
const LN_ICON={
 watch:'<svg class="tm-ic" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true" focusable="false"><circle cx="12" cy="13.5" r="7.5"/><path d="M12 9.6v4l2.6 1.6M9.5 2.8h5M12 3v3M18.4 6.4l1.5-1.5"/></svg>',
 book:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5z"/><path d="M12 6.5v13"/></svg>'};
/* idle: unset and not running. Once it runs, or is paused part-way, the readout returns. */
function lnTimerIdle(){try{return !TM.run&&!TM.done&&TM.left===(TM.mode==="down"?TM.total:0)}catch(e){return false}}
function lnTimerState(){const el=document.getElementById("tmr"),o=document.getElementById("tmrOpen");if(!el)return;
 const idle=lnTimerIdle();
 if(o)o.setAttribute("aria-label",idle?"Exam timer: choose a paper or a time":"Timer presets");
 if(el.classList.contains("idle")===idle)return;
 el.classList.toggle("idle",idle);
 try{if(typeof fitNav==="function")fitNav()}catch(e){}}
function lnHeader(){if(typeof document==="undefined")return;
 const o=document.getElementById("tmrOpen");
 if(o&&!o.querySelector(".tm-ic")){const cv=o.querySelector("svg");if(cv)cv.classList.add("tm-cv");o.insertAdjacentHTML("afterbegin",LN_ICON.watch)}
 const w=document.getElementById("whobtn");
 if(w&&!w.getAttribute("title"))w.setAttribute("title","Your dashboard");
 const inn=document.querySelector(".top .in"),tr=document.querySelector(".top .in>.topR");
 if(inn&&tr&&!document.getElementById("resdoor")){
  const b=document.createElement("a");b.id="resdoor";b.className="resdoor";b.href="#/resources";
  b.innerHTML=LN_ICON.book+"<span>Resources</span>";
  b.addEventListener("click",e=>{e.preventDefault();nav("resources")});
  inn.insertBefore(b,tr)}
 lnTimerState()}
function lnHeaderState(){const d=document.getElementById("resdoor");if(!d)return;
 const on=typeof VIEW!=="undefined"&&VIEW==="resources";
 d.classList.toggle("on",on);if(on)d.setAttribute("aria-current","page");else d.removeAttribute("aria-current")}
(function(){if(typeof document==="undefined")return;
 if(typeof tmrPaint==="function"){const prev=tmrPaint;tmrPaint=function(){const r=prev.apply(this,arguments);try{lnTimerState()}catch(e){}return r}}
 if(typeof paintNav==="function"){const prev=paintNav;paintNav=function(){const r=prev.apply(this,arguments);try{lnHeaderState()}catch(e){}return r}}
 const go=()=>{try{lnHeader();lnHeaderState()}catch(e){}};
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",go);else go();
 /* the bar is measured after each paint; measure again once the typefaces arrive,
    because they are wider than the fallback the first measurement used */
 try{if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{try{fitNav()}catch(e){}})}catch(e){}
 try{if(document.fonts)document.fonts.addEventListener("loadingdone",()=>{try{fitNav()}catch(e){}})}catch(e){}})();

/* ── 2 · Explore Economics Resources ────────────────────────────────────── */
/* Small figures in the explainers' inks. The diagram is computed: demand rises
   from D1 to D2 along a fixed supply curve, so price and quantity both rise. */
function rsSD(){const S=x=>80-.58*(x-30),D1=x=>20+.64*(x-30),D2=x=>20+.64*(x-52);
 const meet=(a,b)=>{let lo=30,hi=150;for(let i=0;i<40;i++){const m=(lo+hi)/2;if(a(m)>b(m))lo=m;else hi=m}return [lo,a(lo)]};
 const e1=meet(S,D1),e2=meet(S,D2),f=v=>v.toFixed(1);
 return {e1,e2,svg:`<path class="f-ax" d="M16 8V88H152"/>
  <path class="f-gd" d="M16 ${f(e1[1])}H${f(e1[0])}V88M16 ${f(e2[1])}H${f(e2[0])}V88"/>
  <path class="f-ink" d="M30 ${f(S(30))}L140 ${f(S(140))}"/><path class="f-n" d="M30 ${f(D1(30))}L122 ${f(D1(122))}"/><path class="f-g" d="M52 ${f(D2(52))}L144 ${f(D2(144))}"/>
  <path class="f-ar" d="M${f(30+10/.64+3)} 30H${f(52+10/.64-4)}"/><path class="f-arh" d="M${f(52+10/.64-8)} 27 ${f(52+10/.64-3)} 30 ${f(52+10/.64-8)} 33"/>
  <circle class="f-dot" cx="${f(e1[0])}" cy="${f(e1[1])}" r="2.6"/><circle class="f-dot g" cx="${f(e2[0])}" cy="${f(e2[1])}" r="2.6"/>
  <text class="f-t" x="143" y="${f(S(140)+3)}">S</text><text class="f-t n" x="124" y="${f(D1(122)+2)}">D₁</text><text class="f-t g" x="146" y="${f(D2(144)+2)}">D₂</text>`}}
const RS_FIG={
 lessons:()=>[["1","Introduction"],["2","Microeconomics"],["3","Macroeconomics"],["4","Global economy"]].map(([n,t],i)=>
  `<g transform="translate(20 ${10+i*20})"><rect class="f-box${i===1?" on":""}" width="120" height="15" rx="2"/><text class="f-mono" x="7" y="11">${n}</text><text class="f-t" x="20" y="11">${t}</text></g>`).join(""),
 mind:()=>{const C=[80,48],P=[[28,20],[132,20],[22,66],[138,66],[80,87],[80,9]];
  return P.map(p=>`<path class="f-ln" d="M${C[0]} ${C[1]}L${p[0]} ${p[1]}"/>`).join("")+P.map((p,i)=>`<circle class="f-nd${i%2?" g":""}" cx="${p[0]}" cy="${p[1]}" r="5.5"/>`).join("")+
   `<circle class="f-core" cx="${C[0]}" cy="${C[1]}" r="14"/><text class="f-t c" x="80" y="51.5" text-anchor="middle">PED</text>`},
 diagram:()=>rsSD().svg,
 world:()=>`<circle class="f-ax" cx="80" cy="48" r="36"/><ellipse class="f-ln" cx="80" cy="48" rx="15" ry="36"/><ellipse class="f-ln" cx="80" cy="48" rx="28" ry="36"/>
  <path class="f-ln" d="M46 36H114M44 48H116M46 60H114"/><circle class="f-dot g" cx="66" cy="38" r="3"/><circle class="f-dot" cx="98" cy="54" r="3"/><circle class="f-dot g" cx="84" cy="66" r="3"/>`,
 calc:()=>`<text class="f-mono b" x="80" y="27" text-anchor="middle">PED = %ΔQd ÷ %ΔP</text><path class="f-ln" d="M16 37H144"/>
  <text class="f-mono" x="80" y="56" text-anchor="middle">+10% ÷ −25%</text><text class="f-mono b n" x="80" y="80" text-anchor="middle">= −0.4 · inelastic</text>`,
 exam:()=>`<rect class="f-box" x="38" y="6" width="84" height="84" rx="2"/><text class="f-mono" x="46" y="20">Paper 1</text><path class="f-ln" d="M46 26H114"/>
  <text class="f-mono" x="46" y="42">(a)</text><path class="f-ln" d="M64 38H94"/><text class="f-mono g" x="115" y="42" text-anchor="end">[10]</text><path class="f-ln" d="M46 50H114M46 56H106"/>
  <text class="f-mono" x="46" y="72">(b)</text><path class="f-ln" d="M64 68H94"/><text class="f-mono g" x="115" y="72" text-anchor="end">[15]</text><path class="f-ln" d="M46 80H114"/>`,
 ee:()=>`<path class="f-ln" d="M20 20H140M36 44H124M54 68H106"/><path class="f-ax" d="M20 20 68 88M140 20 92 88"/><circle class="f-dot g" cx="80" cy="88" r="3.4"/>
  <text class="f-t" x="80" y="15" text-anchor="middle">topic</text><text class="f-t" x="80" y="39" text-anchor="middle">focus</text><text class="f-t" x="80" y="63" text-anchor="middle">question</text>`};
function rsFig(k){
 if(k==="c60"){let C=[];try{C=C60.slice(0,3)}catch(e){}const im=C.map(c=>stC60(c.id)).filter(Boolean);
  if(im.length)return `<span class="rs-covers">${im.map(s=>`<img src="${s}" alt="" width="360" height="450" loading="lazy" decoding="async">`).join("")}</span>`}
 const f=RS_FIG[k];return f?`<svg viewBox="0 0 160 96" aria-hidden="true" focusable="false">${f()}</svg>`:""}
function rsDoors(){const n=(()=>{try{return rnCount()}catch(e){return {}}})();
 const tabs=v=>(SECTIONS.find(s=>s.v===v)||{}).tabs||[];let c60=[];try{c60=C60}catch(e){}
 const ti=tabs("course").indexOf("Topics");
 return [
  {k:"lessons",t:"Topic lessons",d:"Every subtopic in the course as a complete lesson, with a check you mark yourself.",h:ti>0?routeFormat("course",ti):"#/course",m:n.subtopics?`4 units · ${fmtN(n.subtopics)} subtopics`:"4 units"},
  {k:"mind",t:"Mindmaps and visual explanations",d:"How an economist moves through a topic, node by node.",h:"#/mind",m:n.maps?`${fmtN(n.maps)} maps · ${fmtN(n.nodes)} nodes`:""},
  {k:"diagram",t:"Economics diagrams",d:"Plates you can study, and labs where the curves move.",h:"#/lab/diagram-atlas",m:n.diagrams?`${fmtN(n.diagrams)} diagram plates`:""},
  {k:"world",t:"Real-world examples",d:"Dated cases from around the world, each read through a model.",h:"#/world",m:n.cases?`${fmtN(n.cases)} cases · ${fmtN(n.economies)} economies`:""},
  {k:"calc",t:"Calculations",d:"Worked methods for each calculation, with your own numbers checked.",h:"#/calculate",m:n.calcs?`${fmtN(n.calcs)} calculations`:""},
  {k:"exam",t:"Exam practice and revision",d:"Question bank, data response, retrieval and ten-minute revision.",h:"#/practise",m:tabs("practise").length?`${tabs("practise").length} ways to practise`:""},
  {k:"c60",t:"Economics in 60 Seconds",d:"Big ideas told in ten pages each, linked to the syllabus.",h:routeFormat("learn",tabs("learn").indexOf("Economics in 60 Seconds")),m:c60.length?`${c60.length} issues`:""},
  {k:"ee",t:"Extended Essay support",d:"Research like an economist, from a topic to a research question and beyond.",h:"#/ees",m:"Economics EE Studio"}]
  .filter(x=>x.h&&routeParse(x.h))}
function rnResources(){const D=rsDoors();let R=[];try{R=RCARDS}catch(e){}
 return `<section class="sec rs-band" id="explore" aria-labelledby="rs-h"><div class="wrap full">
  <header class="rs-head"><div class="rs-hc"><div class="rs-k">Resources</div>
    <h2 class="rs-t" id="rs-h">Explore Economics Resources</h2>
    <p class="rs-l">Go straight to the platform's visual explanations, mindmaps, diagrams, real-world examples, calculations and exam practice: each a step from understanding a concept to applying it.</p></div>
   <a class="btn a rs-hub" href="#/resources">Open the Resource hub <span aria-hidden="true">→</span></a></header>
  <ul class="rs-grid">${D.map((x,i)=>`<li class="rs-i rv" style="--i:${i}"><a class="rs-a" href="${x.h}" data-k="${x.k}">
   <span class="rs-fig">${rsFig(x.k)}</span>
   <span class="rs-tx"><span class="rs-n">${esc(x.t)}</span><span class="rs-d">${esc(x.d)}</span>${x.m?`<span class="rs-m">${esc(x.m)}</span>`:""}</span>
   <span class="rs-go" aria-hidden="true">→</span></a></li>`).join("")}</ul>
  ${R.length?`<div class="rs-lib rv"><div class="rs-lk"><span class="rs-li">${LN_ICON.book}</span>The Resource hub</div>
   <p class="rs-lt">The free library: <b>${R.length} categories</b> of material for students and teachers, kept in Google Drive and opened from the hub.</p>
   <p class="rs-lc">${R.map(r=>esc(r.n)).join('<span aria-hidden="true"> · </span>')}</p>
   <a class="rs-lgo" href="#/resources">Browse the library <span aria-hidden="true">→</span></a></div>`:""}
  <div class="rs-foot"><div class="row rs-disc"><button class="btn gh sm" onclick="randomOpen('')">Surprise me: Random Economics</button>
    <button class="btn gh sm" onclick="cpOpen()">Find a topic</button><button class="btn gh sm" onclick="openToolkit()">The economist's toolkit</button></div>
   <p class="rs-studio">Looking for Arjun's original decks and guides? <a href="#/studio">The Learning Studio</a> shows selected previews.</p></div>
 </div></section>`}
RN_BANDS["@resources"]=rnResources;

/* ── 3 · a restrained reveal ────────────────────────────────────────────── */
/* Large blocks only, never paragraphs or labels. The waiting state is added by
   script to blocks below the fold, and only while the motion layer is on. */
const LN_REVEAL=".rv,#selected-work .ex,#selected-work .ex-series,.aj,.al-card,.ap-grid,.st-enq .st-enq-in,.td-grid,.t6-band";
function lnReveal(){if(typeof document==="undefined"||!document.body)return;
 if(!document.body.classList.contains("rn-anim")||typeof IntersectionObserver==="undefined"||(typeof QARUNNING!=="undefined"&&QARUNNING))return;
 const v=document.getElementById("view");if(!v)return;
 if(RN.lio)RN.lio.disconnect();
 RN.lio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("rv-in");e.target.classList.remove("rv-wait");RN.lio.unobserve(e.target)}}),{rootMargin:"0px 0px -6% 0px"});
 const H=innerHeight;v.querySelectorAll(LN_REVEAL).forEach(el=>{if(el.getBoundingClientRect().top>H*.92){el.classList.add("rv-wait");RN.lio.observe(el)}})}
/* the cover's entrance: on returning to the home page from elsewhere, the words,
   the signature and the figures rise into place once, briefly (under 0.6 s).
   The first visit already has its opening sequence, so nothing plays then; it
   never runs with reduced motion or during the self-test, and it only animates
   from a visible state, so nothing waits on it. */
let LN_LASTVIEW=null;
function lnEnter(){const prev=LN_LASTVIEW;LN_LASTVIEW=typeof VIEW!=="undefined"?VIEW:null;
 if(VIEW!=="home"||!prev||prev==="home")return;
 if(!document.body.classList.contains("rn-anim")||(typeof QARUNNING!=="undefined"&&QARUNNING))return;
 const h=document.querySelector("#view section.at-hero");if(!h||!h.animate)return;
 [...h.querySelectorAll(".at-copy > *"),h.querySelector(".at-sig"),h.querySelector(".at-figs")].filter(Boolean).forEach((el,i)=>{
  try{el.animate([{opacity:0,transform:"translateY(10px)"},{opacity:1,transform:"none"}],{duration:340,delay:i*36,easing:"cubic-bezier(.2,.7,.2,1)",fill:"backwards"})}catch(e){}})}
(function(){if(typeof rnDecorate!=="function")return;const prev=rnDecorate;rnDecorate=function(){prev.apply(this,arguments);try{lnReveal()}catch(e){}try{lnEnter()}catch(e){}}})();

/* ── self-tests ─────────────────────────────────────────────────────────── */
function LAUNCHSUITE(){const out=[];const T=(n,f)=>{let ok=false,d="";try{ok=!!f()}catch(e){d=e.message}out.push({name:n,ok,detail:d})};
 const txt=h=>String(h).replace(/<[^>]+>/g," ").replace(/\s+/g," ");
 T("Launch · Resources is on the primary bar and opens the Resource hub",()=>{const s=SECTIONS.find(x=>x.v==="resources");return s&&s.pri&&typeof VIEWS.resources==="function"&&routeParse("#/resources").v==="resources"});
 T("Launch · the home page carries Explore Economics Resources directly after the cover",()=>{const i=RN_ORDER.indexOf("@resources"),h=rnResources();
  /* read from the declared order rather than by drawing the whole home page, which would add to every start-up; tests/launch.mjs checks the drawn page */
  return i===1&&RN_ORDER[0]==="#01|Think"&&RN_ORDER.indexOf("Start your journey")>i&&RN_BANDS["@resources"]===rnResources&&(h.match(/id="explore"/g)||[]).length===1&&/Explore Economics Resources/.test(h)});
 T("Launch · every resource door opens a real page",()=>{const D=rsDoors();return D.length===8&&D.every(x=>{const p=routeParse(x.h);return p&&SECTIONS.some(s=>s.v===p.v)})});
 T("Launch · the counts on the doors are the platform's own",()=>{const n=rnCount(),h=txt(rnResources());return h.includes(fmtN(n.cases)+" cases")&&h.includes(fmtN(n.calcs)+" calculations")&&h.includes(fmtN(n.diagrams)+" diagram plates")&&h.includes(fmtN(n.maps)+" maps")&&h.includes(fmtN(n.subtopics)+" subtopics")});
 T("Launch · the library strip names the Resource hub's own categories and links to it",()=>{const h=rnResources();return RCARDS.every(r=>h.includes(esc(r.n)))&&(h.match(/href="#\/resources"/g)||[]).length>=2&&new RegExp(RCARDS.length+" categories").test(txt(h))});
 T("Launch · the Resources band is distinct from the Learning Studio: no Studio excerpt appears in it",()=>!/assets\/studio\//.test(rnResources())&&/href="#\/studio"/.test(rnResources()));
 T("Launch · the diagram door is drawn to its model: a rise in demand raises price and quantity",()=>{const r=rsSD();return r.e2[0]>r.e1[0]&&r.e2[1]<r.e1[1]});
 T("Launch · the calculation door's arithmetic holds: +10% ÷ −25% = −0.4, inelastic",()=>Math.abs(10/-25-(-0.4))<1e-12&&Math.abs(10/-25)<1&&/\+10% ÷ −25%[\s\S]*−0\.4 · inelastic/.test(RS_FIG.calc()));
 T("Launch · the exam door matches Paper 1: part (a) is out of 10 and part (b) out of 15",()=>/\[10\][\s\S]*\[15\]/.test(RS_FIG.exam()));
 T("Launch · the unit door numbers the four units of the course in order",()=>{const h=RS_FIG.lessons();return ["Introduction","Microeconomics","Macroeconomics","Global economy"].every((u,i)=>h.indexOf(u)>h.indexOf(">"+(i+1)+"<"))});
 T("Launch · the timer folds while idle and keeps its controls",()=>!!document.getElementById("tmrToggle")&&!!document.getElementById("tmrOpen")&&typeof tmrPop==="function"&&typeof lnTimerIdle==="function");
 T("Launch · the cover's entrance plays only on a return to home, never with reduced motion or during the self-test",()=>{const f=String(lnEnter);return /rn-anim/.test(f)&&/QARUNNING/.test(f)&&/prev==="home"/.test(f)&&/duration:340/.test(f)});
 T("Launch · on the cover's model, every marked point lies on its drawn curve at every slider position",()=>[-2,-1.5,-1,-.5,0,.5,1,1.5,2].every(sv=>{const k=CV.s;try{CV.s=sv;const [dq,dp]=CV_SPOTS[0][1](sv),lo=Math.max(.6,sv+.2),hi=Math.min(10,10+sv),[sq,sp]=CV_SPOTS[1][1](sv),e=CVF.eq(sv);
  return dq>=lo&&dq<=hi&&Math.abs(dp-CVF.D(dq,sv))<1e-9&&Math.abs(sp-CVF.S(sq))<1e-9&&Math.abs(CVF.D(e.q,sv)-CVF.S(e.q))<1e-9}finally{CV.s=k}}));
 T("Launch · the cover's portrait is the original photograph's 4:5 crop, served from assets/brand",()=>/assets\/brand\/arjun-agrawal-portrait-4x5\.webp/.test(rnCover())&&CV_PORTRAIT.w/CV_PORTRAIT.h===0.8);
 T("Launch · reveals wait only while the motion layer is on, and never during the self-test",()=>/rn-anim/.test(String(lnReveal))&&/QARUNNING/.test(String(lnReveal)));
 return out}
LAUNCHSUITE.suiteName="Launch";
EXTRA_SUITES.push(LAUNCHSUITE);
QAREPORT.push({area:"Launch",re:/^Launch ·/,what:"Resources on the primary bar and in the drawer, the Explore Economics Resources band directly after the cover with doors into real pages and counts from the data, the Resource hub's own categories, a header whose tools fold to make room, and reveals that respect reduced motion."});
