/* ═══════════════════════════════════════════════════════════════════════════
   ECOSYSTEM · ARJUN AGRAWAL | ECONOMICS
   One Economics ecosystem, two distinct learning pathways.
   · The header carries one main navigation on every page: Home, IB DP
     Economics, UPSC CSE Economics, Learning Tools, About Arjun and The Business
     Brief (external). The three menus open as mega menus on a wide screen
     (pointer, click or keyboard); on a phone the same destinations sit in the
     grouped drawer. The IB section bar is still painted (its order, More menu
     and self-tests are unchanged) and is reached through the IB menu, the IB
     landing page, the drawer and search.
   · The home page (#/) is the ecosystem: the two pathways, the map of the
     discipline, the learning experience, selected original work, The Business
     Brief, the educator and where to begin.
   · The IB DP Economics landing page (#/ib) carries the IB front page that used
     to be the home page, unchanged, under its own masthead, journey and finder.
   Every destination is a route that exists: the self-tests parse each one.
   ═══════════════════════════════════════════════════════════════════════════ */
const ESY_BB={name:"The Business Brief",subject:"IB DP Business Management",url:"https://the-business-brief-dun.vercel.app/"};
const ESY_NEUTRAL=new Set(["home","about","contact","design","settings","concepts"]);
/* the pathway a view belongs to: the UPSC section, the shared pages, or the IB platform */
function esyCtx(v){v=v===undefined?(typeof VIEW!=="undefined"?VIEW:"home"):v;return v==="upsc"?"up":ESY_NEUTRAL.has(v)?"all":"ib"}
function esyTab(v,l){if(!l)return 0;if(typeof l==="number")return l;const s=SECTIONS.find(x=>x.v===v);const i=s&&s.tabs?s.tabs.indexOf(l):-1;return i<0?0:i}
function esyHref(v,l,a){if(v==="home")return "#/";return routeFormat(v,esyTab(v,l),a)||"#/"}
function esyUp(k,a){return esyHref("upsc",UP_T[k]||0,a)}
const esyX=(t)=>`<span class="sy-xi" aria-hidden="true">↗</span><span class="sy-vh"> (opens in a new tab)</span>`;
function esyBBLink(cls,label){return `<a class="${cls}" href="${ESY_BB.url}" target="_blank" rel="noopener noreferrer">${esc(label||ESY_BB.name)}${esyX()}</a>`}

/* ── the menus: [title, view, tab label, argument, one line] ─────────────── */
const ESY_IB_GROUPS=[
 ["Learn",[["Course at a glance","course",0,null,"The whole course, unit by unit"],["Concept spine","learn",0,null,"Concepts in the order they build"],
   ["Key concepts","course","Key concepts",null,"The nine concepts of the course"],["Economics in 60 Seconds","learn","Economics in 60 Seconds",null,"One idea, one minute"],
   ["Mindmaps","mind",0,null,"How a topic connects, node by node"]]],
 ["Visualise",[["Diagram atlas","lab","Diagram atlas",null,"Every diagram, drawn and explained"],["Market lab","lab","Market lab",null,"Move demand and supply"],
   ["AD-AS lab","lab","AD-AS lab",null,"Shocks, gaps and policy"],["Policy simulator","lab","Policy simulator",null,"Choose a policy, read the trade-offs"],
   ["Learning Studio","studio",0,null,"Visual explainers and guides"]]],
 ["Apply",[["Real World","world",0,null,"Cases read through a model"],["Case bank","world","Browse cases",null,"Search the cases by concept"],
   ["Economics, Everywhere","everywhere",0,null,"Questions from ordinary life"],["Economic events","events",0,null,"Crises and turning points"],
   ["Economic data","data",0,null,"Indicators with every source named"]]],
 ["Practise",[["Question bank","practise",0,null,"Questions by unit and command term"],["Data response","practise","Data response",null,"Paper 2 practice"],
   ["Exam cockpit","examiner",0,null,"Papers, markbands and timing"],["Exam practice","papers",0,null,"Paper 1, 2 and 3 workshops"],
   ["Calculate","calculate",0,null,"Every HL and SL calculation"]]],
 ["Advance",[["IA studio","ia",0,null,"The internal assessment, step by step"],["Economics EE Studio","ees",0,null,"The extended essay in Economics"],
   ["TOK × Economics","tok",0,null,"Knowledge questions from the course"],["Tutorials","tutorials",0,null,"Learn with Arjun Agrawal"],
   ["Educator Studio","educator",0,null,"For teachers and coordinators"]]]];
const ESY_UP_GROUPS=[
 ["Start here",[["UPSC Overview","upsc","UPSC Overview",null,"The approach and the seven-stage roadmap"],["Syllabus explorer","upsc","Syllabus",null,"Prelims GS I, Mains GS III and the Optional"],
   ["Shared concepts","concepts",0,null,"One concept, read for IB DP or for UPSC CSE"]]],
 ["Learn",[["Economics Resources","upsc","Economics Resources",null,"Topic previews with diagrams and MCQs"],["Inflation","upsc","Economics Resources","inflation","Measurement, drivers and the RBI"],
   ["Fiscal deficit","upsc","Economics Resources","deficit","The Budget's arithmetic"],["Balance of payments","upsc","Economics Resources","bop","India's external accounts"]]],
 ["Handbook library",[["The Indian Economy Collection","upsc","Economics Handbooks",null,"Eleven volumes, 523 pages"],["Volume I · Introduction to Economics","upsc","Economics Handbooks","volume-i","Foundations of economic thinking"],
   ["Volume V · Fiscal Policy","upsc","Economics Handbooks","volume-v","The Budget and public debt"],["Volume VIII · Balance of Payments","upsc","Economics Handbooks","volume-viii","India's external sector"]]],
 ["Prepare",[["Current Affairs","upsc","Current Affairs",null,"Developments mapped to the syllabus"],["Prelims and Mains, line by line","upsc","Syllabus",null,"What each paper asks of Economics"],
   ["Contact for a soft copy","upsc","Contact / Enrolment",null,"₹99 per volume, by direct contact"]]],
 ["Coaching",[["UPSC Economics Course","upsc","UPSC Economics Course",null,"The intensive three-month programme"],["About the Educator","upsc","About the Educator",null,"Arjun Agrawal"],
   ["Contact / Enrolment","upsc","Contact / Enrolment",null,"Email, WhatsApp or telephone"]]]];
const ESY_TOOLS_GROUPS=[
 ["Instant tools",[["Search the platform","@search",0,null,"Press / anywhere"],["Calculator","@calc",0,null,"A scientific calculator"],["Exam timer","@timer",0,null,"IB paper presets"]]],
 ["Models",[["Market lab","lab","Market lab",null,"Demand, supply and equilibrium"],["Elasticity lab","lab","Elasticity lab",null,"PED, PES and revenue"],
   ["Diagram builder","lab","Diagram builder",null,"Draw and label your own"],["Policy toolkit","lab","Policy toolkit",null,"Instruments side by side"]]],
 ["Study",[["Flashcards","workspace","Flashcards",null,"Spaced retrieval"],["Study plan","workspace",0,null,"Weeks to the examination"],
   ["Dictionary","course","Dictionary",null,"Every term, defined"],["Command terms","course","Command terms",null,"What each one asks for"]]],
 ["Across both pathways",[["Shared concepts","concepts",0,null,"IB DP and UPSC CSE readings"],["Economic data","data",0,null,"Indicators, sources and method"],
   ["My dashboard","master",0,null,"What you have covered"]]]];
const ESY_MENUS=[
 {k:"ib",label:"IB DP Economics",ctx:"ib",lead:"Think like an economist.",copy:"The International Baccalaureate Diploma Programme Economics pathway: concepts, interactive models, real-world cases and examination practice, at SL and HL.",go:["#/ib","Explore IB DP Economics"],groups:ESY_IB_GROUPS},
 {k:"up",label:"UPSC CSE Economics",ctx:"up",lead:"Understand the Indian economy.",copy:"Economics for the Civil Services Examination: the official syllabus, Indian economic policy, current developments and the Indian Economy Collection.",go:["#/upsc","Explore UPSC Economics"],groups:ESY_UP_GROUPS},
 {k:"tools",label:"Learning Tools",ctx:"tools",lead:"Tools for both pathways.",copy:"The calculator, timer and search are always one click away; the models and study tools open as pages.",go:null,groups:ESY_TOOLS_GROUPS}];
function esyItemHref(it){return it[1].charAt(0)==="@"?null:esyHref(it[1],it[2],it[3])}
function esyItem(it){const h=esyItemHref(it),inner=`<b>${esc(it[0])}</b><span>${esc(it[4]||"")}</span>`;
 return h?`<li><a class="sy-i" href="${esA(h)}">${inner}</a></li>`:`<li><button class="sy-i" type="button" data-tool="${it[1].slice(1)}" onclick="esyTool('${it[1].slice(1)}')">${inner}</button></li>`}
function esyPanel(m){return `<div class="sy-p sy-p-${m.k}" id="sy-p-${m.k}" role="region" aria-label="${esA(m.label)}" hidden><div class="wrap full sy-pin">
  <div class="sy-lead"><div class="sy-k">${esc(m.label)}</div><p class="sy-lt">${esc(m.lead)}</p><p class="sy-ld">${esc(m.copy)}</p>
   ${m.go?`<a class="sy-go" href="${m.go[0]}">${esc(m.go[1])} <span aria-hidden="true">→</span></a>`:""}</div>
  <div class="sy-cols" style="--n:${m.groups.length}">${m.groups.map(([g,items])=>`<div class="sy-col"><div class="sy-gh">${esc(g)}</div><ul>${items.map(esyItem).join("")}</ul></div>`).join("")}</div>
 </div></div>`}
function esyNavHTML(){const caret=`<svg class="sy-c" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M2.5 4.5L6 8l3.5-3.5"/></svg>`;
 return `<ul class="sy-ul">
  <li><a class="sy-a" data-k="home" href="#/">Home</a></li>
  ${ESY_MENUS.map(m=>`<li class="sy-li" data-k="${m.k}"><button class="sy-a sy-t" type="button" id="sy-t-${m.k}" aria-expanded="false" aria-controls="sy-p-${m.k}">${esc(m.label)}${caret}</button>${esyPanel(m)}</li>`).join("")}
  <li><a class="sy-a" data-k="about" href="#/about">About Arjun</a></li>
  <li>${esyBBLink("sy-a sy-x","The Business Brief")}</li></ul>`}

/* ── opening and closing the menus: pointer, click and keyboard ──────────── */
const ESYM={open:null,tIn:0,tOut:0};
function esyOpen(k,focusFirst){const li=document.querySelector(`#synav .sy-li[data-k="${k}"]`);if(!li)return;
 if(ESYM.open&&ESYM.open!==k)esyClose(false);
 const b=li.querySelector(".sy-t"),p=li.querySelector(".sy-p");p.hidden=false;b.setAttribute("aria-expanded","true");li.classList.add("on");ESYM.open=k;
 document.body.classList.add("sy-menu");
 if(focusFirst){const f=p.querySelector("a,button");if(f)f.focus()}}
function esyClose(refocus){const k=ESYM.open;if(!k)return;const li=document.querySelector(`#synav .sy-li[data-k="${k}"]`);ESYM.open=null;
 document.body.classList.remove("sy-menu");if(!li)return;
 const b=li.querySelector(".sy-t"),p=li.querySelector(".sy-p");p.hidden=true;b.setAttribute("aria-expanded","false");li.classList.remove("on");
 if(refocus)b.focus()}
function esyWire(nav){
 const hover=()=>{try{return matchMedia("(hover:hover) and (pointer:fine)").matches}catch(e){return false}};
 nav.querySelectorAll(".sy-li").forEach(li=>{const k=li.dataset.k,b=li.querySelector(".sy-t");
  b.addEventListener("click",e=>{e.stopPropagation();clearTimeout(ESYM.tIn);if(ESYM.open===k)esyClose(false);else esyOpen(k,false)});
  b.addEventListener("keydown",e=>{if(e.key==="ArrowDown"){e.preventDefault();esyOpen(k,true)}});
  li.addEventListener("mouseenter",()=>{if(!hover())return;clearTimeout(ESYM.tOut);clearTimeout(ESYM.tIn);ESYM.tIn=setTimeout(()=>esyOpen(k,false),ESYM.open?0:90)});
  li.addEventListener("mouseleave",()=>{if(!hover())return;clearTimeout(ESYM.tIn);ESYM.tOut=setTimeout(()=>{if(ESYM.open===k)esyClose(false)},220)});
  li.querySelector(".sy-p").addEventListener("click",e=>{if(e.target.closest("a,button"))esyClose(false)})});
 nav.addEventListener("keydown",e=>{if(e.key==="Escape"&&ESYM.open){e.stopPropagation();esyClose(true)}});
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&ESYM.open)esyClose(true)});
 document.addEventListener("click",e=>{if(ESYM.open&&!e.target.closest("#synav"))esyClose(false)});
 nav.addEventListener("focusout",e=>{if(ESYM.open&&e.relatedTarget&&!nav.contains(e.relatedTarget))esyClose(false)})}
/* the three instant tools open where the header puts them, or under the header when it has folded them away */
function esyTool(k){esyClose(false);try{if(typeof closeMenu==="function"&&document.getElementById("mob"))closeMenu()}catch(e){}
 const f={search:()=>searchPop(),calc:()=>calcPop(),timer:()=>tmrPop()}[k];if(!f)return;f();
 const p=document.getElementById("pop"),anchor={calc:"calcbtn",timer:"tmr"}[k],a=anchor&&document.getElementById(anchor);
 if(p&&anchor&&(!a||!a.offsetParent)){const h=document.querySelector("header.top"),r=h?h.getBoundingClientRect():{bottom:70};
  p.style.top=(Math.max(0,r.bottom)+10)+"px";p.style.left=Math.max(12,(innerWidth-p.getBoundingClientRect().width)/2)+"px"}}

/* ── installing the header ──────────────────────────────────────────────── */
function esyInstall(){if(typeof document==="undefined"||document.getElementById("synav"))return;
 const top=document.querySelector("header.top .in"),mn=document.getElementById("mainnav");if(!top||!mn)return;
 const n=document.createElement("nav");n.id="synav";n.className="synav";n.setAttribute("aria-label","Main");n.innerHTML=esyNavHTML();
 top.insertBefore(n,mn);esyWire(n);document.body.classList.add("sy-on");esyState();esyFit();
 let raf=0;addEventListener("resize",()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(esyFit)});
 try{document.fonts&&document.fonts.ready.then(esyFit)}catch(e){}}
/* the bar is measured: the optional tools fold away first, then the whole bar becomes the drawer */
function esyFit(){const n=document.getElementById("synav"),B=document.body;if(!n)return;
 B.classList.remove("sy-tight","sy-tight2","sy-compact");if(getComputedStyle(n).display==="none")return;
 /* the list is aligned to the end, so it overflows towards the brand: compare its width with the room it has */
 const over=()=>{const u=n.firstElementChild;return !!u&&u.getBoundingClientRect().width>n.clientWidth+1};
 for(const c of ["sy-tight","sy-tight2","sy-compact"]){if(!over())break;B.classList.add(c)}}
/* the current page is marked in the bar and in the pathway strip */
function esyState(){const n=document.getElementById("synav");if(!n||typeof VIEW==="undefined")return;
 const c=esyCtx(),cur=VIEW==="home"?"home":VIEW==="about"?"about":c==="ib"?"ib":c==="up"?"up":null;
 n.querySelectorAll(".sy-a").forEach(a=>{const k=a.dataset.k||(a.closest(".sy-li")||{}).dataset&&a.closest(".sy-li").dataset.k;
  const on=!!k&&k===cur;a.classList.toggle("cur",on);if(on&&a.tagName==="A")a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")});
 document.body.dataset.path=c;
 const pb=document.getElementById("pathbar");
 if(pb){pb.classList.toggle("is-up",c==="up");pb.classList.toggle("is-all",c==="all");
  pb.querySelectorAll(".pb-a").forEach(a=>{const on=(a.dataset.p==="upsc"&&c==="up")||(a.dataset.p==="ib"&&c==="ib");a.classList.toggle("on",on);
   if(on)a.setAttribute("aria-current","true");else a.removeAttribute("aria-current")});
  const ib=pb.querySelector('.pb-a[data-p="ib"]');if(ib&&ib.getAttribute("href")!=="#/ib"){ib.setAttribute("href","#/ib");ib.removeAttribute("onclick")}}}
/* the pathway strip follows the ecosystem: the IB link opens the IB landing page */
upPathState=function(){try{esyState()}catch(e){}const n=document.getElementById("pathbar");if(!n)return;const up=esyCtx()==="up";
 const ab=n.querySelector('[data-u="about"]'),ct=n.querySelector('[data-u="contact"]');
 if(ab)ab.href=up?upHref("educator"):"#/about";if(ct)ct.href=up?upHref("contact"):"#/contact"};
(function(){if(typeof document==="undefined")return;const go=()=>{try{esyInstall()}catch(e){}};
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",go);else go()})();
(function(){if(typeof document==="undefined")return;const prev=render;render=function(){const r=prev.apply(this,arguments);try{esyClose(false);esyState();esyTitle()}catch(e){}return r}})();
function esyTitle(){if(VIEW==="home")document.title="Arjun Agrawal | Economics · IB DP Economics and UPSC CSE Economics";
 else if(VIEW==="ib")document.title="IB DP Economics · Arjun Agrawal | Economics"}

/* ═══ THE IB DP ECONOMICS LANDING PAGE (#/ib) ═════════════════════════════ */
const ESY_JOURNEY=[
 ["Understand","Learn the concept before the model.","Definitions, the nine key concepts and the order in which ideas build, at SL and HL.",
  [["Course at a glance","course",0],["Concept spine","learn",0],["Key concepts","course","Key concepts"],["SL vs HL","course","SL vs HL"],["Dictionary","course","Dictionary"],["Economics in 60 Seconds","learn","Economics in 60 Seconds"]]],
 ["Visualise","See the model move.","Every diagram of the course, drawn, labelled and live: shift a curve and read what changes.",
  [["Diagram atlas","lab","Diagram atlas"],["Market lab","lab","Market lab"],["AD-AS lab","lab","AD-AS lab"],["Elasticity lab","lab","Elasticity lab"],["Mindmaps","mind",0],["Learning Studio","studio",0]]],
 ["Apply","Test the model against the world.","Real policies, shocks and markets, each read through the model that explains it.",
  [["Real World","world",0],["Case bank","world","Browse cases"],["Economics, Everywhere","everywhere",0],["Economic events","events",0],["Economic data","data",0],["The Indian economy","paths","The Indian economy"]]],
 ["Practise","Retrieve, calculate and write.","Questions by unit and command term, data response, calculations and timed papers.",
  [["Question bank","practise",0],["Data response","practise","Data response"],["Retrieval","practise","Retrieval"],["Calculate","calculate",0],["Exam practice","papers",0],["Timed session","session",0]]],
 ["Evaluate","Judge, and state the condition.","Evaluation, the markbands and the examiner's reading of an answer; then the IA and the extended essay.",
  [["Evaluation stress test","think","Evaluation stress test"],["Exam cockpit","examiner",0],["Answer diagnostic","examiner","Answer diagnostic"],["Exam DNA","dna",0],["IA studio","ia",0],["Economics EE Studio","ees",0]]]];
/* the finder: every IB destination of the journey and the menus, filtered by stage and kind */
const ESY_KIND={course:"Learn",learn:"Learn",mind:"Learn",think:"Learn",lab:"Model",studio:"Learn",world:"Cases",everywhere:"Cases",events:"Cases",data:"Data",paths:"Cases",
 practise:"Practice",calculate:"Practice",papers:"Exam",session:"Exam",examiner:"Exam",dna:"Exam",ia:"Research",ees:"Research",tok:"Research",tutorials:"Support",educator:"Support"};
function esyFinderItems(){const seen=new Set(),out=[];
 ESY_JOURNEY.forEach(([st,,,items])=>items.forEach(([t,v,l])=>{const h=esyHref(v,l);if(seen.has(h))return;seen.add(h);out.push({t,h,st,k:ESY_KIND[v]||"Learn",v})}));
 const STG={Learn:"Understand",Visualise:"Visualise",Apply:"Apply",Practise:"Practise",Advance:"Evaluate"};
 ESY_IB_GROUPS.forEach(([g,items])=>items.forEach(it=>{const h=esyItemHref(it);if(!h||seen.has(h))return;seen.add(h);out.push({t:it[0],h,st:STG[g],k:ESY_KIND[it[1]]||"Learn",v:it[1],d:it[4]})}));
 return out}
const ESYF={st:"All",k:"All",q:""};
function esyFinderList(){const q=ESYF.q.trim().toLowerCase();
 const L=esyFinderItems().filter(x=>(ESYF.st==="All"||x.st===ESYF.st)&&(ESYF.k==="All"||x.k===ESYF.k)&&(!q||(x.t+" "+(x.d||"")+" "+x.k+" "+x.st).toLowerCase().includes(q)));
 return L.length?L.map(x=>`<li><a class="ibl-fi" href="${esA(x.h)}"><span class="ibl-fk">${esc(x.st)} · ${esc(x.k)}</span><b>${esc(x.t)}</b>${x.d?`<span class="ibl-fd">${esc(x.d)}</span>`:""}</a></li>`).join("")
  :`<li class="ibl-f0">Nothing matches. Clear a filter, or <button class="lnk" type="button" onclick="esyTool('search')">search the whole platform</button>.</li>`}
function esyFinderSet(key,val){ESYF[key]=val;const l=document.getElementById("ibl-fl");if(l)l.innerHTML=esyFinderList();
 document.querySelectorAll(`#ibl-find [data-f="${key}"]`).forEach(b=>{const on=b.dataset.val===val;b.classList.toggle("on",on);b.setAttribute("aria-pressed",String(on))});
 const c=document.getElementById("ibl-fc");if(c){const n=(l?l.querySelectorAll("a.ibl-fi").length:0);c.textContent=n+(n===1?" destination":" destinations")}}
const ESYJ={i:0};
function esyJourneyPanel(i){const [st,line,copy,items]=ESY_JOURNEY[i];
 return `<div class="ibl-jh"><span class="ibl-jn">0${i+1}</span><div><h3>${esc(st)}</h3><p class="ibl-jl">${esc(line)}</p><p class="ibl-jc">${esc(copy)}</p></div></div>
  <ul class="ibl-jg">${items.map(([t,v,l])=>`<li><a href="${esA(esyHref(v,l))}">${esc(t)} <span aria-hidden="true">→</span></a></li>`).join("")}</ul>`}
function esyJourney(i){ESYJ.i=i;const p=document.getElementById("ibl-jp");if(p)p.innerHTML=esyJourneyPanel(i);
 document.querySelectorAll(".ibl-j button").forEach((b,k)=>{b.classList.toggle("on",k===i);b.setAttribute("aria-pressed",String(k===i))})}
function esyLevel(l){S.lvl=l;try{save()}catch(e){}document.querySelectorAll("#lvlseg button,.ibl-lv button").forEach(b=>{const on=b.dataset.l===l;b.classList.toggle("on",on);if(b.closest(".ibl-lv"))b.setAttribute("aria-pressed",String(on))})}
function esyIBHead(){const n=typeof rnCount==="function"?rnCount():{},lv=(typeof S!=="undefined"&&S.lvl)||"HL";
 const stats=[[n.subtopics,"subtopics"],[n.diagrams,"diagrams"],[n.cases,"real-world cases"],[n.maps,"mindmaps"]].filter(x=>typeof x[0]==="number"&&x[0]>0);
 const stages=[...new Set(esyFinderItems().map(x=>x.st))],kinds=[...new Set(esyFinderItems().map(x=>x.k))];
 return `<section class="ibl" aria-labelledby="ibl-h"><div class="wrap full ibl-in">
  <div class="ibl-top"><nav class="ibl-crumb" aria-label="Breadcrumb"><a href="#/">Home</a><span aria-hidden="true">/</span><span aria-current="page">IB DP Economics</span></nav>
   <a class="ibl-sw" href="#/upsc">Switch to UPSC CSE Economics <span aria-hidden="true">→</span></a></div>
  <div class="ibl-grid"><div class="ibl-copy"><div class="ibl-k">Pathway · International Baccalaureate Diploma Programme</div>
    <h1 class="ibl-h" id="ibl-h">IB DP Economics</h1>
    <p class="ibl-l">Concepts, interactive models, real-world evidence and examination practice for the IB Diploma Programme Economics course, at Standard and Higher Level.</p>
    <div class="ibl-lv" role="group" aria-label="Your level"><span>Your level</span>${["SL","HL"].map(l=>`<button type="button" data-l="${l}" class="${lv===l?"on":""}" aria-pressed="${lv===l}" onclick="esyLevel('${l}')">${l}</button>`).join("")}
     <a class="lnk" href="${esA(esyHref("course","SL vs HL"))}">What differs between SL and HL</a></div></div>
   ${stats.length?`<dl class="ibl-st">${stats.map(([v,l])=>`<div><dt>${esc(l)}</dt><dd>${fmtN(v)}</dd></div>`).join("")}</dl>`:""}</div>
  <div class="ibl-jw"><h2 class="ibl-jt">The learning journey</h2>
   <ol class="ibl-j">${ESY_JOURNEY.map(([st,line],i)=>`<li><button type="button" class="${i===ESYJ.i?"on":""}" aria-pressed="${i===ESYJ.i}" aria-controls="ibl-jp" onclick="esyJourney(${i})"><span class="ibl-jn">0${i+1}</span><b>${esc(st)}</b><span class="ibl-js">${esc(line)}</span></button></li>`).join("")}</ol>
   <div class="ibl-jp" id="ibl-jp" aria-live="polite">${esyJourneyPanel(ESYJ.i)}</div></div>
  <div class="ibl-find" id="ibl-find"><div class="ibl-fh"><h2 class="ibl-jt">Find an IB resource</h2><p id="ibl-fc" class="ibl-fc" aria-live="polite">${esyFinderItems().length} destinations</p></div>
   <div class="ibl-fr"><div class="ibl-fg" role="group" aria-label="Stage"><span>Stage</span>${["All",...stages].map(s=>`<button type="button" data-f="st" data-val="${esA(s)}" class="${ESYF.st===s?"on":""}" aria-pressed="${ESYF.st===s}" onclick="esyFinderSet('st',this.dataset.val)">${esc(s)}</button>`).join("")}</div>
    <div class="ibl-fg" role="group" aria-label="Kind"><span>Kind</span>${["All",...kinds].map(s=>`<button type="button" data-f="k" data-val="${esA(s)}" class="${ESYF.k===s?"on":""}" aria-pressed="${ESYF.k===s}" onclick="esyFinderSet('k',this.dataset.val)">${esc(s)}</button>`).join("")}</div>
    <label class="ibl-fq"><span class="sy-vh">Filter by name</span><input type="search" placeholder="Filter by name" value="${esA(ESYF.q)}" oninput="ESYF.q=this.value;esyFinderSet('q',this.value)"></label></div>
   <ul class="ibl-fl" id="ibl-fl">${esyFinderList()}</ul></div>
 </div></section>`}
SECTIONS.push({v:"ib",n:"IB DP Economics",hide:1});
VIEWS.ib=function(){return esyIBHead()+rnHome(RN.homePrev.apply(this,arguments))};

/* ═══ THE ECOSYSTEM HOME PAGE (#/) ════════════════════════════════════════ */
/* 2 · the discipline, mapped: eight fields; each says where each pathway meets it, and only where it does */
const ESY_FIELDS=[
 {k:"micro",n:"Microeconomics",d:"How households, firms and markets decide: demand, supply, elasticity, market failure and the government's role in markets.",
  ib:[["Unit 2 · Microeconomics","course","Curriculum explorer"],["Market lab","lab","Market lab"],["Elasticity lab","lab","Elasticity lab"]],
  up:[["Volume I · Introduction to Economics","handbooks","volume-i"]]},
 {k:"macro",n:"Macroeconomics",d:"Output, employment, inflation and growth for a whole economy, and the monetary and fiscal policy that steers them.",
  ib:[["Unit 3 · Macroeconomics","course","Curriculum explorer"],["AD-AS lab","lab","AD-AS lab"]],
  up:[["Volume II · Money and Monetary Policy","handbooks","volume-ii"],["Volume III · Inflation and Price Stability","handbooks","volume-iii"]]},
 {k:"intl",n:"International economics",d:"Trade, protection, exchange rates and the balance of payments: how economies meet one another.",
  ib:[["Unit 4 · The global economy","course","Curriculum explorer"],["Real World cases","world",0]],
  up:[["Volume VIII · Balance of Payments and International Trade","handbooks","volume-viii"],["Volume IX · Global Economic Institutions","handbooks","volume-ix"]]},
 {k:"dev",n:"Development economics",d:"Growth against development: poverty, inequality, human development and the strategies that change them.",
  ib:[["Unit 4 · Economic development","course","Curriculum explorer"],["Economic data","data",0]],
  up:[["Prelims GS I · Economic and Social Development","syllabus",null],["Volume X · Indian Agriculture and Allied Sectors","handbooks","volume-x"]]},
 {k:"pf",n:"Public finance",d:"Taxation, public spending, deficits and debt: how a government raises and spends money, and with what effect.",
  ib:[["Taxes, subsidies and fiscal policy · Policy simulator","lab","Policy simulator"]],
  up:[["Volume IV · Taxation and Public Revenue","handbooks","volume-iv"],["Volume V · Fiscal Policy and Budget Management","handbooks","volume-v"]]},
 {k:"india",n:"Indian economy",d:"India's structure, institutions and policy since 1991: the economy a UPSC aspirant studies in depth.",
  ib:[["The Indian economy · Pathways","paths","The Indian economy"]],
  up:[["UPSC Overview","overview",null],["The Indian Economy Collection","handbooks",null],["Volume XI · Industry, Manufacturing, Trade and Labour","handbooks","volume-xi"]]},
 {k:"policy",n:"Economic policy",d:"Choosing among instruments under trade-offs: who gains, who loses, over what horizon, and what would change the answer.",
  ib:[["Policy toolkit","lab","Policy toolkit"],["Recommend a policy","lab","Recommend a policy"]],
  up:[["Mains GS III, line by line","syllabus",null],["Volume VI · Banking and Financial Institutions","handbooks","volume-vi"]]},
 {k:"global",n:"Global issues",d:"Climate, trade fragmentation, crises and inequality: questions no single country answers alone.",
  ib:[["Economics, Everywhere","everywhere",0],["Economic events","events",0]],
  up:[["Current Affairs","current",null],["Volume IX · Global Economic Institutions","handbooks","volume-ix"]]}];
const ESY_EDGES=[["micro","macro"],["macro","intl"],["intl","global"],["dev","india"],["pf","macro"],["pf","policy"],["policy","macro"],["india","pf"],["dev","global"],["intl","india"],["micro","policy"],["dev","intl"]];
const ESYK={k:"macro"};
function esyFieldHref(x,side){return side==="ib"?esyHref(x[1],x[2]):x[1]==="syllabus"||x[1]==="overview"||x[1]==="current"?esyUp(x[1]):esyUp(x[1],x[2]||undefined)}
function esyFieldPanel(k){const f=ESY_FIELDS.find(x=>x.k===k)||ESY_FIELDS[0];
 const col=(side,lab)=>`<div class="sy-fc sy-fc-${side}"><div class="sy-fk">${lab}</div>${f[side].length?`<ul>${f[side].map(x=>`<li><a href="${esA(esyFieldHref(x,side))}">${esc(x[0])} <span aria-hidden="true">→</span></a></li>`).join("")}</ul>`:`<p class="sy-fn">Not a separate part of this pathway.</p>`}</div>`;
 return `<h3 class="sy-ft">${esc(f.n)}</h3><p class="sy-fd">${esc(f.d)}</p><div class="sy-fcs">${col("ib","In IB DP Economics")}${col("up","In UPSC CSE Economics")}</div>`}
function esyField(k){ESYK.k=k;const p=document.getElementById("sy-fp");if(p)p.innerHTML=esyFieldPanel(k);
 document.querySelectorAll(".sy-node").forEach(b=>{const on=b.dataset.k===k;b.classList.toggle("on",on);b.setAttribute("aria-pressed",String(on))});
 document.querySelectorAll(".sy-edge").forEach(l=>l.classList.toggle("on",l.dataset.a===k||l.dataset.b===k))}
function esyMap(){const N=ESY_FIELDS.length,P={};ESY_FIELDS.forEach((f,i)=>{const a=-Math.PI/2+i*2*Math.PI/N;P[f.k]=[50+38*Math.cos(a),50+38*Math.sin(a)]});
 return `<section class="sy-sec sy-map" aria-labelledby="sy-mh"><div class="wrap full">
  <div class="sy-sh"><div class="sy-eb">The knowledge ecosystem</div><h2 class="sy-h2" id="sy-mh">One discipline, mapped.</h2>
   <p class="sy-sl">Eight fields of Economics and how each pathway meets them. Select a field to see where it is taught for the IB Diploma Programme and where it appears in UPSC preparation.</p></div>
  <div class="sy-mgrid"><div class="sy-ring" role="group" aria-label="Fields of Economics">
    <svg class="sy-edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">${ESY_EDGES.map(([a,b])=>`<line class="sy-edge${a===ESYK.k||b===ESYK.k?" on":""}" data-a="${a}" data-b="${b}" x1="${P[a][0].toFixed(1)}" y1="${P[a][1].toFixed(1)}" x2="${P[b][0].toFixed(1)}" y2="${P[b][1].toFixed(1)}"/>`).join("")}
     ${ESY_FIELDS.map(f=>`<line class="sy-spoke" x1="50" y1="50" x2="${P[f.k][0].toFixed(1)}" y2="${P[f.k][1].toFixed(1)}"/>`).join("")}</svg>
    <span class="sy-core" aria-hidden="true">Economics</span>
    ${ESY_FIELDS.map(f=>`<button type="button" class="sy-node${f.k===ESYK.k?" on":""}" data-k="${f.k}" style="left:${P[f.k][0].toFixed(1)}%;top:${P[f.k][1].toFixed(1)}%" aria-pressed="${f.k===ESYK.k}" aria-controls="sy-fp" onclick="esyField('${f.k}')"><span>${esc(f.n)}</span><i class="sy-dots" aria-hidden="true">${f.ib.length?'<i class="d-ib"></i>':""}${f.up.length?'<i class="d-up"></i>':""}</i></button>`).join("")}</div>
   <div class="sy-fp" id="sy-fp" aria-live="polite">${esyFieldPanel(ESYK.k)}</div></div>
  <p class="sy-key"><span><i class="d-ib"></i>taught in IB DP Economics</span><span><i class="d-up"></i>examined in UPSC CSE</span></p></div></section>`}
/* 3 · the learning experience, in screenshots of the platform itself */
const ESY_SHOTS=[["lab","Market lab","Move demand or supply and the model answers: price, quantity and surplus, redrawn as you drag.","lab","Market lab","ib"],
 ["atlas","Diagram atlas","Every diagram of the IB course, labelled the way an examiner reads it.","lab","Diagram atlas","ib"],
 ["mind","Mindmaps","How an economist moves through a topic, node by node.","mind",0,"ib"],
 ["syllabus","UPSC syllabus explorer","The official Prelims and Mains wording, kept apart from the explanation of what each line asks.","upsc","Syllabus","up"],
 ["handbook","Inside a handbook","Eight pages of every volume, readable before you ask for a copy.","upsc","Economics Handbooks","up"],
 ["world","Real World","Policies, shocks and markets, each read through the model that explains it.","world",0,"ib"]];
function esyShots(){return `<section class="sy-sec sy-exp" aria-labelledby="sy-eh"><div class="wrap full">
  <div class="sy-sh"><div class="sy-eb">Explore the learning experience</div><h2 class="sy-h2" id="sy-eh">Built to be used, not only read.</h2>
   <p class="sy-sl">Screens from the platform as it is today. Each opens the page it shows.</p></div>
  <div class="sy-shots">${ESY_SHOTS.map(([f,t,d,v,l,p],i)=>`<a class="sy-shot sy-shot-${p}${i===0?" big":""}" href="${esA(esyHref(v,l))}">
    <span class="sy-sf"><img src="assets/home/${f}.webp" width="1200" height="750" alt="${esA(t)}: a screen from the platform" loading="lazy" decoding="async"></span>
    <span class="sy-sc"><span class="sy-sk">${p==="up"?"UPSC CSE Economics":"IB DP Economics"}</span><b>${esc(t)}</b><span>${esc(d)}</span></span></a>`).join("")}</div></div></section>`}
/* 4 · selected original work, each shown in part */
function esyWork(){const n=typeof rnCount==="function"?rnCount():{},H=UPSC_HB.volumes,pages=H.reduce((a,v)=>a+v.pages,0),v3=H[2];
 const smp=v3&&v3.img&&Object.keys(v3.img).find(k=>/^p\d+/.test(k));
 const W=[["The Indian Economy Collection",`${H.length} volumes · ${fmtN(pages)} pages`,"A handbook series for UPSC CSE Economics, written from the official syllabus outwards.",esyUp("handbooks"),smp?v3.img[smp].src:"","up"],
  ["The diagram atlas",typeof n.diagrams==="number"?`${fmtN(n.diagrams)} diagrams`:"Every diagram of the course","Drawn for this platform: each diagram labelled, explained and live.",esyHref("lab","Diagram atlas"),"assets/home/atlas.webp","ib"],
  ["Mindmaps",typeof n.maps==="number"?`${fmtN(n.maps)} maps · ${fmtN(n.nodes)} nodes`:"Maps of the course","Each topic as an economist moves through it.",esyHref("mind"),"assets/home/mind.webp","ib"],
  ["Real-world cases",typeof n.cases==="number"?`${fmtN(n.cases)} cases · ${fmtN(n.economies)} economies`:"Cases","Every case names its primary source and the model it tests.",esyHref("world"),"assets/home/world.webp","ib"]];
 return `<section class="sy-sec sy-work" aria-labelledby="sy-wh"><div class="wrap full">
  <div class="sy-sh"><div class="sy-eb">Selected original work</div><h2 class="sy-h2" id="sy-wh">Written, drawn and built by Arjun Agrawal.</h2></div>
  <div class="sy-wgrid">${W.map(([t,m,d,h,img,p])=>`<a class="sy-wk sy-wk-${p}" href="${esA(h)}">
    <span class="sy-wf">${img?`<img src="${esA(img)}" alt="" loading="lazy" decoding="async" width="640" height="905">`:""}</span>
    <span class="sy-wc"><span class="sy-wm">${esc(m)}</span><b>${esc(t)}</b><span>${esc(d)}</span></span></a>`).join("")}</div></div></section>`}
/* 5 · The Business Brief: a sister platform, not a third pathway */
function esyBB(){return `<section class="sy-bb" aria-labelledby="sy-bbh"><div class="wrap full sy-bbin">
  <div class="sy-bbm" aria-hidden="true"><svg viewBox="0 0 120 120" focusable="false"><rect x="18" y="64" width="16" height="36"/><rect x="42" y="48" width="16" height="52"/><rect x="66" y="34" width="16" height="66"/><rect x="90" y="20" width="16" height="80"/><path d="M14 100H110"/><path class="t" d="M20 58L50 42L74 30L102 14"/></svg></div>
  <div class="sy-bbc"><div class="sy-eb">From the same educator</div><h2 class="sy-bbh" id="sy-bbh">Beyond Economics. Explore Business Management.</h2>
   <p>Discover The Business Brief, an interactive learning platform for IB DP Business Management.</p></div>
  <div class="sy-bba">${esyBBLink("sy-bbl","Explore The Business Brief")}<span class="sy-bbu">the-business-brief-dun.vercel.app</span></div></div></section>`}
/* 6 · the educator: the supplied portrait and the supplied profile, nothing added */
function esyEducator(){return `<section class="sy-sec sy-ed" aria-labelledby="sy-edh"><div class="wrap full sy-edin">
  <figure class="sy-pt"><img src="assets/brand/arjun-agrawal-portrait-4x5.webp" width="432" height="540" alt="Arjun Agrawal" loading="lazy" decoding="async"></figure>
  <div class="sy-edc"><div class="sy-eb">About the educator</div><h2 class="sy-h2" id="sy-edh">Arjun Agrawal</h2>
   <ul class="sy-pos">${["Economics educator","IB DP educator","Academic resource creator"].map(x=>`<li>${esc(x)}</li>`).join("")}</ul>
   <p class="sy-edl">Arjun Agrawal studied Economics at St. Stephen's College, University of Delhi, and has taught undergraduate Economics as an Assistant Professor at Fergusson College, Pune. He teaches IB Diploma Programme Economics, mentors UPSC Civil Services aspirants in Economics, and writes the handbooks, presentations and Economics in 60 Seconds explainers that this platform grew from.</p>
   <a class="sy-btn" href="#/about">Meet Arjun Agrawal <span aria-hidden="true">→</span></a></div></div></section>`}
/* 7 · where to begin */
function esyBegin(){const L=[["IB DP Economics","Start with the journey: understand, visualise, apply, practise, evaluate.","#/ib","ib"],
  ["UPSC CSE Economics","Start with the syllabus, then the roadmap and the handbooks.","#/upsc","up"],
  ["Shared concepts","One concept, read for either examination.",esyHref("concepts"),"all"],
  ["Ask a question","Email, WhatsApp or telephone, answered by Arjun Agrawal.","#/contact","all"]];
 return `<section class="sy-sec sy-begin" aria-labelledby="sy-bgh"><div class="wrap full">
  <h2 class="sy-h2" id="sy-bgh">Where would you like to begin?</h2>
  <ul class="sy-bgl">${L.map(([t,d,h,p])=>`<li><a class="sy-bg sy-bg-${p}" href="${esA(h)}"><b>${esc(t)}</b><span>${esc(d)}</span><i aria-hidden="true">→</i></a></li>`).join("")}</ul></div></section>`}
/* 1 · the hero and the two pathways */
function esyHero(){const H=UPSC_HB.volumes,fig=typeof rsSD==="function"?`<svg viewBox="0 0 160 96" aria-hidden="true" focusable="false">${rsSD().svg}</svg>`:"";
 return `<section class="sy-hero" aria-labelledby="sy-h"><div class="wrap full sy-hin">
  <div class="sy-hh"><div class="sy-eb">Arjun Agrawal <span aria-hidden="true">|</span> Economics</div>
   <h1 class="sy-h1" id="sy-h">Economics is not just a subject to study. <em>It is a way to understand the world.</em></h1>
   <p class="sy-hl">An integrated Economics learning ecosystem connecting international academic study, Indian economic policy, real-world evidence and applied understanding.</p></div>
  <figure class="sy-hfig" aria-hidden="true"><svg viewBox="0 0 320 300" focusable="false"><path class="g" d="M40 260H300M40 260V20"/>
   <path class="a a1" d="M40 60 C 120 70, 170 150, 200 170"/><path class="a a2" d="M40 250 C 120 240, 170 190, 200 170"/><path class="a" style="stroke:var(--gold-d)" d="M200 170 C 240 150, 270 110, 300 60"/>
   <circle class="r" cx="200" cy="170" r="16"/><circle class="n" cx="200" cy="170" r="6"/>
   <text x="44" y="50">INTERNATIONAL</text><text x="44" y="286">INDIA</text><text x="214" y="200">ONE DISCIPLINE</text></svg></figure>
  <div class="sy-paths">
   <article class="sy-pp sy-pp-ib" aria-labelledby="sy-ib"><div class="sy-ppk">Pathway · International</div><h2 class="sy-pph" id="sy-ib">IB DP Economics</h2>
    <p class="sy-ppt">Think like an economist.</p><p class="sy-ppd">The International Baccalaureate Diploma Programme Economics course: concepts, interactive models, real-world cases and examination practice, at SL and HL.</p>
    <div class="sy-ppf rs-fig">${fig}</div>
    <ul class="sy-ppl">${[["Course","course",0],["Lab","lab",0],["Real World","world",0],["Mindmaps","mind",0],["Exam","examiner",0]].map(([t,v,l])=>`<li><a href="${esA(esyHref(v,l))}">${esc(t)}</a></li>`).join("")}</ul>
    <a class="sy-cta" href="#/ib">Explore IB DP Economics <span aria-hidden="true">→</span></a></article>
   <article class="sy-pp sy-pp-up" aria-labelledby="sy-up"><div class="sy-ppk">Pathway · India</div><h2 class="sy-pph" id="sy-up">UPSC CSE Economics</h2>
    <p class="sy-ppt">Understand the Indian economy. Prepare with clarity.</p><p class="sy-ppd">Economics for the Civil Services Examination: the official syllabus, Indian economic policy, current developments and the eleven-volume Indian Economy Collection.</p>
    <div class="sy-ppc" aria-hidden="true">${H.slice(1,4).map((v,i)=>`<span style="--i:${i};background-image:url('${esA(v.img.cover.src)}')"></span>`).join("")}</div>
    <ul class="sy-ppl">${[["Syllabus","syllabus"],["Handbooks","handbooks"],["Resources","resources"],["Current Affairs","current"],["Course","course"]].map(([t,k])=>`<li><a href="${esA(esyUp(k))}">${esc(t)}</a></li>`).join("")}</ul>
    <a class="sy-cta" href="#/upsc">Explore UPSC Economics <span aria-hidden="true">→</span></a></article></div></div></section>`}
VIEWS.home=function(){return `<div class="sy-home">${esyHero()}${esyMap()}${esyShots()}${esyWork()}${esyBB()}${esyEducator()}${esyBegin()}</div>`};
/* the IB cover's entrance plays when a reader arrives at the IB landing page */
(function(){if(typeof lnEnter!=="function")return;lnEnter=function(){const prev=LN_LASTVIEW;LN_LASTVIEW=typeof VIEW!=="undefined"?VIEW:null;
 if(VIEW!=="ib"||!prev||prev==="ib")return;
 if(!document.body.classList.contains("rn-anim")||(typeof QARUNNING!=="undefined"&&QARUNNING))return;
 const h=document.querySelector("#view section.at-hero");if(!h||!h.animate)return;
 [...h.querySelectorAll(".at-copy > *"),h.querySelector(".at-sig"),h.querySelector(".at-figs")].filter(Boolean).forEach((el,i)=>{
  try{el.animate([{opacity:0,transform:"translateY(10px)"},{opacity:1,transform:"none"}],{duration:340,delay:i*36,easing:"cubic-bezier(.2,.7,.2,1)",fill:"backwards"})}catch(e){}})}})();
/* search: the two landing pages */
(function(){if(typeof buildIndex!=="function")return;const prev=buildIndex;
 buildIndex=function(){if(SIDX)return SIDX;const I=prev().slice();
  I.push({k:"Pathway",t:"IB DP Economics",d:"The IB Diploma Programme Economics pathway: journey, finder and front page",go:"nav('ib')",s:"ib dp diploma programme economics pathway international baccalaureate sl hl"});
  I.push({k:"Pathway",t:"Home · the Economics ecosystem",d:"IB DP Economics and UPSC CSE Economics",go:"nav('home')",s:"home ecosystem pathways ib upsc arjun agrawal economics"});
  return SIDX=I};try{SIDX=null}catch(e){}})();


/* ═══ THE FOOTER · the academic ecosystem, the pathways and the verified contacts ═══ */
function esyFooterHTML(){const C=(typeof CONTACT!=="undefined"?CONTACT:[]).filter(c=>c&&c.href&&/^(https:|mailto:)/.test(c.href));
 return `<div class="sy-fe"><div class="wrap full sy-fein">
  <div class="sy-feh"><div class="sy-fek">Explore the academic ecosystem</div><p>Three subjects of the IB Diploma Programme and the Civil Services Examination, from one educator.</p></div>
  <ul class="sy-fel">
   <li><a class="sy-fet sy-fet-ib" href="#/ib"><span>IB Diploma Programme</span><b>IB DP Economics</b><i aria-hidden="true">→</i></a></li>
   <li><a class="sy-fet sy-fet-up" href="#/upsc"><span>UPSC Civil Services Examination</span><b>UPSC CSE Economics</b><i aria-hidden="true">→</i></a></li>
   <li><a class="sy-fet sy-fet-bb" href="${ESY_BB.url}" target="_blank" rel="noopener noreferrer"><span>The Business Brief</span><b>IB DP Business Management</b><i aria-hidden="true">↗</i><span class="sy-vh"> (opens in a new tab)</span></a></li></ul>
  <div class="sy-fec"><div class="sy-fek">Contact</div><ul>${C.map(c=>`<li><a href="${esA(c.href)}"${/^https:/.test(c.href)?' target="_blank" rel="noopener noreferrer"':""}>${esc(c.n)}: ${esc(c.v)}${/^https:/.test(c.href)?esyX():""}</a></li>`).join("")}<li><a href="tel:+917092844945">Telephone: +91 7092844945</a></li></ul></div>
 </div></div>`}
function esyFooter(){if(typeof document==="undefined"||document.getElementById("sy-fe"))return;const f=document.querySelector("footer.ft");if(!f)return;
 const d=document.createElement("nav");d.id="sy-fe";d.setAttribute("aria-label","Explore the academic ecosystem");d.innerHTML=esyFooterHTML();f.insertBefore(d,f.firstChild)}
(function(){if(typeof document==="undefined")return;const go=()=>{try{esyFooter()}catch(e){}};
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",go);else go()})();

/* ═══ SELF-TESTS ══════════════════════════════════════════════════════════ */
function ESYSUITE(){const out=[];const T=(n,f)=>{let ok=false,det="";try{const r=f();ok=r===true||(r&&r.ok);if(r&&r.d)det=r.d}catch(e){det=e.message}out.push({n,ok:!!ok,detail:det})};
 const txt=h=>String(h).replace(/<[^>]+>/g," ").replace(/\s+/g," ");
 const parse=h=>{const r=routeParse(h);return r&&(r.v==="home"||(SECTIONS.some(s=>s.v===r.v)&&typeof VIEWS[r.v]==="function"))};
 T("Ecosystem · the main navigation reads Home, IB DP Economics, UPSC CSE Economics, Learning Tools, About Arjun, The Business Brief",()=>{const t=txt(esyNavHTML().replace(/<div class="sy-p[\s\S]*?<\/div><\/div><\/div>/g,""));
  const want=["Home","IB DP Economics","UPSC CSE Economics","Learning Tools","About Arjun","The Business Brief"];let at=-1;return {ok:want.every(w=>{const i=t.indexOf(w,at+1);if(i<0)return false;at=i;return true}),d:t.slice(0,200)}});
 T("Ecosystem · every destination in the three menus is a route that exists, or one of the three instant tools",()=>{const bad=[];ESY_MENUS.forEach(m=>m.groups.forEach(([,it])=>it.forEach(x=>{const h=esyItemHref(x);if(h?!parse(h):!["@search","@calc","@timer"].includes(x[1]))bad.push(x[0])})));return {ok:!bad.length,d:bad.join(", ")}});
 T("Ecosystem · every tab a menu names is a real tab of its section",()=>{const bad=[];const chk=(v,l,n)=>{if(typeof l==="string"){const s=SECTIONS.find(x=>x.v===v);if(!s||!s.tabs||s.tabs.indexOf(l)<0)bad.push(n)}};
  ESY_MENUS.forEach(m=>m.groups.forEach(([,it])=>it.forEach(x=>chk(x[1],x[2],x[0]))));ESY_JOURNEY.forEach(j=>j[3].forEach(x=>chk(x[1],x[2],x[0])));ESY_FIELDS.forEach(f=>f.ib.forEach(x=>chk(x[1],x[2],x[0])));return {ok:!bad.length,d:bad.join(", ")}});
 T("Ecosystem · the IB menu groups read Learn, Visualise, Apply, Practise, Advance; the UPSC menu Start here, Learn, Handbook library, Prepare, Coaching",()=>
  ESY_IB_GROUPS.map(g=>g[0]).join()==="Learn,Visualise,Apply,Practise,Advance"&&ESY_UP_GROUPS.map(g=>g[0]).join()==="Start here,Learn,Handbook library,Prepare,Coaching");
 T("Ecosystem · every handbook a menu or the map names is a real volume",()=>{const ids=new Set(UPSC_HB.volumes.map(v=>v.id)),bad=[];
  ESY_UP_GROUPS.forEach(([,it])=>it.forEach(x=>{if(x[3]&&/^volume-/.test(x[3])&&!ids.has(x[3]))bad.push(x[3])}));ESY_FIELDS.forEach(f=>f.up.forEach(x=>{if(x[2]&&!ids.has(x[2]))bad.push(x[2])}));return {ok:!bad.length,d:bad.join()}});
 T("Ecosystem · The Business Brief opens in a new tab, rel noopener, from the bar, the home page and the footer",()=>{const all=esyNavHTML()+esyBB()+(typeof esyFooterHTML==="function"?esyFooterHTML():"");
  const L=all.match(/<a [^>]*href="https:\/\/the-business-brief-dun\.vercel\.app\/"[^>]*>/g)||[];return {ok:L.length>=3&&L.every(a=>/target="_blank"/.test(a)&&/rel="noopener noreferrer"/.test(a)),d:String(L.length)}});
 T("Ecosystem · The Business Brief is a sister platform, not a third pathway",()=>!/sy-pp-bb|sy-pp sy-pp-[^iu]/.test(esyHero())&&/Beyond Economics\. Explore Business Management\./.test(esyBB())&&/an interactive learning platform for IB DP Business Management/.test(esyBB()));
 T("Home · the headline, the supporting line and the two pathway calls are exactly as briefed",()=>{const h=txt(VIEWS.home());
  return /Economics is not just a subject to study\. It is a way to understand the world\./.test(h)&&/An integrated Economics learning ecosystem connecting international academic study, Indian economic policy, real-world evidence and applied understanding\./.test(h)
   &&/Explore IB DP Economics/.test(h)&&/Explore UPSC Economics/.test(h)});
 T("Home · one h1, and the seven sections in order: pathways, map, experience, work, The Business Brief, educator, beginning",()=>{const h=VIEWS.home();const order=["sy-hero","sy-map","sy-exp","sy-work","sy-bb","sy-ed","sy-begin"].map(c=>h.indexOf('class="'+(c==="sy-hero"||c==="sy-bb"?c:"sy-sec "+c)));
  return (h.match(/<h1[\s>]/g)||[]).length===1&&order.every((x,i)=>x>0&&(i===0||x>order[i-1]))});
 T("Home · the pathway calls lead to #/ib and #/upsc",()=>{const h=esyHero();return /href="#\/ib">Explore IB DP Economics/.test(h)&&/href="#\/upsc">Explore UPSC Economics/.test(h)&&parse("#/ib")&&parse("#/upsc")});
 T("Home · every link on the ecosystem page is a route that exists or a supplied asset",()=>{const h=VIEWS.home(),bad=[];(h.match(/href="([^"]+)"/g)||[]).forEach(m=>{const u=m.slice(6,-1).replace(/&amp;/g,"&");if(/^https:\/\/the-business-brief-dun\.vercel\.app\/$/.test(u))return;if(/^#/.test(u)){if(!parse(u))bad.push(u)}else bad.push(u)});return {ok:!bad.length,d:bad.join(" ")}});
 T("Home · the map gives every field a description and only real connections, IB or UPSC",()=>ESY_FIELDS.length===8&&ESY_FIELDS.every(f=>f.d&&(f.ib.length||f.up.length))&&ESY_FIELDS.every(f=>f.ib.every(x=>parse(esyFieldHref(x,"ib")))&&f.up.every(x=>parse(esyFieldHref(x,"up")))));
 T("Home · the educator is described only from the supplied profile",()=>{const h=txt(esyEducator());return /St\. Stephen's College/.test(h)&&/Fergusson College/.test(h)&&!/BLISS|Symbiosis|award|PhD|years of experience|currently teaches at/i.test(h)});
 T("Home · every screenshot and work preview is a local file with its size declared",()=>{const h=esyShots()+esyWork();const im=h.match(/<img [^>]*>/g)||[];return im.length>=8&&im.every(i=>/src="(assets\/)/.test(i)&&/width="\d+"/.test(i)&&/height="\d+"/.test(i)&&/loading="lazy"/.test(i))});
 T("IB landing · #/ib carries the masthead, the five-stage journey, the finder and the whole IB front page",()=>{const h=VIEWS.ib();const t=txt(h);
  return /<h1[^>]*id="ibl-h"/.test(h)&&ESY_JOURNEY.map(j=>j[0]).join()==="Understand,Visualise,Apply,Practise,Evaluate"&&/id="ibl-find"/.test(h)&&/class="hero rn-home/.test(h)&&/Think like an economist\./.test(t)&&(h.match(/<h1[\s>]/g)||[]).length===1});
 T("IB landing · SL and HL stay distinct: the level switch writes the platform's own level and links to the differences",()=>{const h=esyIBHead();return /data-l="SL"/.test(h)&&/data-l="HL"/.test(h)&&/esyLevel\(/.test(h)&&String(esyLevel).includes("S.lvl=l")&&h.includes(esyHref("course","SL vs HL"))});
 T("IB landing · the finder's every destination exists, and its filters narrow the list",()=>{const L=esyFinderItems();const o={...ESYF};ESYF.st="Visualise";ESYF.k="All";ESYF.q="";const a=(esyFinderList().match(/ibl-fi/g)||[]).length;ESYF.st="All";ESYF.q="zzzz";const z=/ibl-f0/.test(esyFinderList());Object.assign(ESYF,o);
  return {ok:L.length>=20&&L.every(x=>parse(x.h))&&a>0&&a<L.length&&z,d:`${L.length} ${a}`}});
 T("IB landing · no claim of IB endorsement",()=>!/endorsed by the International Baccalaureate|official IB (platform|resource)|IB-approved|IB approved/i.test(txt(esyIBHead()+VIEWS.home())));
 T("Ecosystem · the IB section bar is still painted, so its order and More menu are unchanged",()=>{const m=document.getElementById("mainnav");return !m||m.querySelectorAll("button").length>=8});
 T("Ecosystem · the intro is never replayed by navigation inside the app",()=>!/__INTRO|splash/.test(String(nav))&&!/__INTRO|splash/.test(String(esyState)));
 return out}
if(typeof EXTRA_SUITES!=="undefined")EXTRA_SUITES.push(ESYSUITE);
