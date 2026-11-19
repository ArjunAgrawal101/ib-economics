/* ═══════════════════════════════════════════════════════════════════════════
   FLAGSHIP · the shell: one header, two environments
   The global header carries HOME · IB DP ECONOMICS · UPSC CSE ECONOMICS ·
   ABOUT; the two pathways sit together as a switcher, and each opens a panel of
   its environment. Inside a pathway a context bar gives that environment its
   own navigation: IB Home, Learn, Explore, Practise, Research and Resources
   for IB DP; the eight UPSC destinations for UPSC CSE. The older primary bar,
   the More menu and their measuring code stay in the page, hidden, because
   other layers and the quality checks still read them; every section they
   listed is reachable here, in the drawer and in search.
   ═══════════════════════════════════════════════════════════════════════════ */
/* The IB DP environment, grouped as the owner's brief sets it. An item names a
   section and a tab (by label, so a reordered tab list cannot misroute it);
   an item whose section or tab does not exist is left out rather than linked. */
const FX_IBNAV=[
 {k:"learn",n:"Learn",d:"The course, its concepts and every topic, seen whole",items:[
  ["Course and syllabus","course","At a glance","The IB Economics course, unit by unit"],
  ["Concepts and theories","learn","Concept spine","Every concept, from definition to evaluation"],
  ["Topic-wise learning","course","Topics","Thirty-one lessons across the four units"],
  ["Mindmaps","mind",null,"See the whole idea, not just the chapter"],
  ["Visual explainers","studio","Visual explainers","Original explainers and diagrams"],
  ["Diagram atlas","lab","Diagram atlas","Every diagram, drawn from its model"],
  ["Thinking like an economist","think",null,"The economic chain and evaluation"],
  ["Video library","video",null,"Curated lessons by topic"],
  ["Video studio","arjun",null,"Arjun Agrawal's own video lessons"]]},
 {k:"explore",n:"Explore",d:"Economics in the world, with its evidence",items:[
  ["Real World Economics","world",null,"Cases, data and the concepts behind them"],
  ["Case studies","world","Browse cases","Real economies, read through the course"],
  ["Economic data","data",null,"Indicators, country profiles and markets"],
  ["Economics in 60 Seconds","learn","Economics in 60 Seconds","Ten-page visual issues"],
  ["Economic events","events",null,"The events that shaped economic thinking"],
  ["Economics, Everywhere","everywhere",null,"Big questions and everyday life"],
  ["Economists and ideas","ideas",null,"The thinkers and how their ideas connect"],
  ["The Indian economy","paths","The Indian economy","India's data, policy cases and history"]]},
 {k:"practise",n:"Practise",d:"Models to move, questions to answer, papers to sit",items:[
  ["Interactive diagrams","lab","Market lab","Move the model and predict before you look"],
  ["Calculation tools","calculate",null,"Every calculation, with marking tolerance"],
  ["Practice questions","practise","Question bank","By unit, command term and paper"],
  ["Examination preparation","examiner",null,"The exam cockpit and answer diagnostics"],
  ["Paper 1 and Paper 2 practice","papers",null,"Workshops, data labs and the simulator"],
  ["Exam DNA","dna",null,"How past papers are built"],
  ["Timed session","session",null,"A focused, timed practice block"],
  ["All tools","tools",null,"Every lab, builder and simulation in one place"]]},
 {k:"research",n:"Research",d:"The Internal Assessment, the Extended Essay and TOK",items:[
  ["Internal Assessment support","ia",null,"The IA studio, from article to commentary"],
  ["Extended Essay support","ees",null,"The Economics EE Studio"],
  ["Research skills","think","Inquiry tools","Questions, evidence and method"],
  ["TOK connections","tok",null,"Knowledge questions in Economics"]]},
 {k:"resources",n:"Resources",d:"Handbooks, revision, the Learning Studio and tutorials",items:[
  ["Resource hub","resources",null,"Handbooks, question banks, revision and IA resources"],
  ["Revision resources","practise","Ten-minute revision","Short, targeted revision"],
  ["Checklists","course","Checklists","What to know, subtopic by subtopic"],
  ["Learning Studio","studio",null,"Selected resource previews"],
  ["Tutorials","tutorials",null,"One-to-one online tutoring"],
  ["For educators","educator",null,"The Educator Studio and its handbook"],
  ["Teacher tools","teacher",null,"The teacher desk, planners, exam builders and marking"]]}
];
const FX_IBPROGRESS=[["Dashboard","master",null],["My syllabus","syllabus",null],["My economics","saved",null],["My workspace","workspace",null],["Settings","settings",null]];
/* one line for each UPSC destination, by its label, so a reordered tab list cannot mislabel it */
const FX_UPDESC={"UPSC Home":"The UPSC environment","Syllabus":"Prelims GS I and Mains GS III, and what each asks","Economics Resources":"Free topic previews and diagrams",
 "Handbook Library":"Eleven volumes at ₹99 each","Current Affairs":"Developments read through the concepts","Preparation Strategy":"How to prepare the Economics component",
 "Online Course":"The three-month intensive programme","Contact / Enrol":"Handbooks, the course and mentorship"};

function fxTabIndex(v,label){
 const s=SECTIONS.find(x=>x.v===v);if(!s||typeof VIEWS[v]!=="function")return -1;
 if(label===null||label===undefined)return 0;
 if(!s.tabs)return -1;
 return s.tabs.indexOf(label);
}
function fxHref(v,t,a){
 try{const h=routeFormat(v,t||0,a);return h||"#/"}catch(e){return "#/"}
}
/* the resolved IB groups: only items that exist */
function fxIbGroups(){
 return FX_IBNAV.map(g=>({...g,items:g.items.map(([n,v,lab,d])=>{const t=fxTabIndex(v,lab);return t<0?null:{n,v,t,d,href:fxHref(v,t)}}).filter(Boolean)}));
}
function fxIbGroupOf(v){
 for(const g of FX_IBNAV)if(g.items.some(i=>i[1]===v))return g.k;
 return null;
}
function fxUpTabs(){
 const s=SECTIONS.find(x=>x.v==="upsc");return s&&s.tabs?s.tabs:[];
}

/* ── the header, rebuilt once ───────────────────────────────────────────── */
function fxBuildShell(){
 const top=document.querySelector("header.top .in");if(!top||document.getElementById("gnav"))return;
 const brand=top.querySelector(".brand");
 if(brand){
  brand.setAttribute("aria-label","Arjun Agrawal · Economics, home");
  brand.setAttribute("href","#/");
  const sub=brand.querySelector(".wm span");if(sub)sub.textContent="ECONOMICS";
 }
 const g=document.createElement("nav");g.className="gnav";g.id="gnav";g.setAttribute("aria-label","Main");
 const main=document.getElementById("mainnav");
 top.insertBefore(g,main?main.nextSibling:null);
 const hdr=document.querySelector("header.top");
 const ctx=document.createElement("nav");ctx.className="ctxbar";ctx.id="ctxbar";ctx.setAttribute("aria-label","Pathway");
 hdr.parentNode.insertBefore(ctx,hdr.nextSibling);
 document.documentElement.classList.add("fx-js");
 /* a single panel for the dropdowns */
 const p=document.createElement("div");p.className="fxpanel";p.id="fxpanel";p.hidden=true;p.setAttribute("role","region");
 document.body.appendChild(p);
 /* focus that leaves the panel, other than back to its own button, closes it */
 p.addEventListener("focusout",e=>{if(!FXDD.open)return;const t=e.relatedTarget;if(t&&!p.contains(t)&&t!==FXDD.btn)fxClosePanel()});
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&FXDD.open){const b=FXDD.btn;fxClosePanel();if(b)b.focus()}});
 document.addEventListener("click",e=>{if(!FXDD.open)return;const p=document.getElementById("fxpanel");
  if(p.contains(e.target)||(FXDD.btn&&FXDD.btn.contains(e.target)))return;fxClosePanel()});
 window.addEventListener("resize",()=>{if(FXDD.open)fxPlacePanel()});
 window.addEventListener("scroll",()=>{if(FXDD.open&&window.innerWidth>=900)fxPlacePanel()},{passive:true});
}

const FXDD={open:null,btn:null};
function fxPanelHtml(k){
 if(k==="ib"){
  const gs=fxIbGroups();
  return `<div class="fxp-head"><div><div class="fx-kicker">Pathway 01</div><div class="fxp-title">IB DP Economics</div></div>
   <a class="fx-btn primary" href="#/ib" data-fxclose>Enter IB DP Economics <span class="arr" aria-hidden="true">→</span></a></div>
   <div class="fxp-grid ib">${gs.map(g=>`<section class="fxp-col" aria-labelledby="fxp-${g.k}"><h3 class="fxp-h" id="fxp-${g.k}">${esc(g.n)}</h3><ul>${g.items.map(i=>
     `<li><a class="fx-a" href="${esA(i.href)}" data-fxclose>${esc(i.n)}</a></li>`).join("")}</ul></section>`).join("")}</div>`;
 }
 if(k==="upsc"){
  const tabs=fxUpTabs();
  return `<div class="fxp-head"><div><div class="fx-kicker">Pathway 02</div><div class="fxp-title">UPSC CSE Economics</div></div>
   <a class="fx-btn primary" href="#/upsc" data-fxclose>Enter UPSC CSE Economics <span class="arr" aria-hidden="true">→</span></a></div>
   <ul class="fxp-list">${tabs.map((t,i)=>`<li><a class="fx-a" href="${esA(fxHref("upsc",i))}" data-fxclose><b>${esc(t)}</b><span>${esc(FX_UPDESC[t]||"")}</span></a></li>`).join("")}</ul>
   ${fxTabIndex("paths","The Indian economy")<0?"":`<p class="fxp-also">Also on the platform: <a class="fx-a" href="${esA(fxHref("paths",fxTabIndex("paths","The Indian economy")))}" data-fxclose>The Indian economy</a>, India's data, policy cases and history.</p>`}`;
 }
 const g=fxIbGroups().find(x=>x.k===k);
 if(g)return `<p class="fxp-d">${esc(g.d)}</p><ul class="fxp-list one">${g.items.map(i=>
   `<li><a class="fx-a" href="${esA(i.href)}" data-fxclose${VIEW===i.v&&TAB===i.t?' aria-current="page"':""}><b>${esc(i.n)}</b><span>${esc(i.d)}</span></a></li>`).join("")}</ul>`;
 return "";
}
function fxPlacePanel(){
 const p=document.getElementById("fxpanel"),b=FXDD.btn;if(!p||!b)return;
 const r=b.getBoundingClientRect(),vw=document.documentElement.clientWidth;
 const wide=FXDD.open==="ib"||FXDD.open==="upsc";
 const w=Math.min(wide?(FXDD.open==="ib"?1080:720):420,vw-24);
 p.style.width=w+"px";
 const left=Math.max(12,Math.min(vw-w-12,wide?r.left+r.width/2-w/2:r.left));
 p.style.left=left+"px";p.style.top=(r.bottom+8)+"px";
}
function fxTogglePanel(k,btn,e){
 if(e)e.stopPropagation();
 if(FXDD.open===k){fxClosePanel();return}
 fxClosePanel();
 const p=document.getElementById("fxpanel");if(!p)return;
 /* the panel follows its navigation in the document, so the keyboard reaches it next */
 const host=btn.closest("nav");if(host&&host.nextElementSibling!==p)host.after(p);
 p.innerHTML=fxPanelHtml(k);p.dataset.k=k;p.hidden=false;
 FXDD.open=k;FXDD.btn=btn;btn.setAttribute("aria-expanded","true");
 p.setAttribute("aria-label",btn.getAttribute("data-label")||"Menu");
 fxPlacePanel();
 p.querySelectorAll("[data-fxclose]").forEach(a=>a.addEventListener("click",()=>fxClosePanel()));
 requestAnimationFrame(()=>p.classList.add("on"));
 /* opened from the keyboard (a click with no pointer), the first destination takes focus */
 if(e&&e.detail===0){const first=p.querySelector("a");if(first)first.focus()}
}
function fxClosePanel(){
 const p=document.getElementById("fxpanel");
 if(p){p.classList.remove("on");p.hidden=true;p.innerHTML=""}
 if(FXDD.btn)FXDD.btn.setAttribute("aria-expanded","false");
 FXDD.open=null;FXDD.btn=null;
}

/* ── painted on every render ────────────────────────────────────────────── */
function fxSwitcher(path,cls){
 const one=(k,lab)=>`<a class="fxsw-${k}${path===k?" on":""}" href="${FXI.paths[k].home}"${path===k?' aria-current="true"':""}>${lab}</a>`;
 return `<div class="fxsw ${cls||""}" role="group" aria-label="Choose a pathway">${one("ib","IB DP Economics")}${one("upsc","UPSC CSE Economics")}</div>`;
}
function fxPaintShell(){
 const path=fxPathway(VIEW);
 document.body.setAttribute("data-pathway",path);
 const g=document.getElementById("gnav");
 if(g){
  const cur=(k)=>path===k?' aria-current="true"':"";
  const pathBtn=(k,lab)=>`<span class="gn-path gn-${k}${path===k?" on":""}"><a class="fx-a" href="${FXI.paths[k].home}"${cur(k)}>${lab}</a><button type="button" class="gn-dd" aria-expanded="false" aria-controls="fxpanel" data-label="${esA(lab)} menu" aria-label="${esA(lab)}: show the sections" onclick="fxTogglePanel('${k}',this,event)"><svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></button></span>`;
  g.innerHTML=`<a class="gn-item${VIEW==="home"?" on":""}" href="#/"${VIEW==="home"?' aria-current="page"':""}>Home</a>
   <span class="gn-pair" role="group" aria-label="Pathways">${pathBtn("ib","IB DP Economics")}${pathBtn("upsc","UPSC CSE Economics")}</span>
   <a class="gn-item${VIEW==="about"?" on":""}" href="#/about"${VIEW==="about"?' aria-current="page"':""}>About</a>
   ${fxBBLink("gn-bb")}`;
 }
 const c=document.getElementById("ctxbar");
 if(c){
  let inner="";
  if(path==="ib"){
   const gk=fxIbGroupOf(VIEW);
   inner=`<a class="cx-home${VIEW==="ib"?" on":""}" href="#/ib"${VIEW==="ib"?' aria-current="page"':""}>IB Home</a>`
    +FX_IBNAV.map(g=>`<button type="button" class="cx-dd${gk===g.k?" on":""}" aria-expanded="false" aria-controls="fxpanel" data-label="${esA(g.n)}" onclick="fxTogglePanel('${g.k}',this,event)">${esc(g.n)}<svg width="9" height="9" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></button>`).join("")
    +`<a class="cx-cta${VIEW==="tutorials"?" on":""}" href="${fxHref("tutorials",0)}"${VIEW==="tutorials"?' aria-current="page"':""}>Tutorials</a>`;
  }else if(path==="upsc"){
   inner=fxUpTabs().map((t,i)=>`<a class="cx-tab${TAB===i?" on":""}" href="${esA(fxHref("upsc",i))}"${TAB===i?' aria-current="page"':""}>${esc(i===0?"UPSC Home":t)}</a>`).join("");
  }
  c.innerHTML=`<div class="wrap full cx-in">${fxSwitcher(path,"cx-sw")}<div class="cx-items cx-${path}">${inner}</div></div>`;
  c.classList.toggle("has-items",!!inner);
  /* on a narrow screen the bar scrolls sideways: bring the current destination into view, centred where it can be */
  const it=c.querySelector(".cx-items"),on=it&&it.querySelector(".on");
  if(on&&it.scrollWidth>it.clientWidth+1){const d=on.getBoundingClientRect().left-it.getBoundingClientRect().left+it.scrollLeft;it.scrollLeft=Math.max(0,d-(it.clientWidth-on.offsetWidth)/2)}
 }
 fxClosePanel();
}

/* ── the drawer on phones and tablets ───────────────────────────────────── */
function fxDrawerHtml(){
 const path=fxPathway(VIEW);
 const link=(h,n,on)=>`<a class="fx-a" href="${esA(h)}"${on?' aria-current="page"':""}>${esc(n)}</a>`;
 const ib=fxIbGroups().map(g=>`<details class="dw-g"${fxIbGroupOf(VIEW)===g.k?" open":""}><summary>${esc(g.n)}</summary><div class="dw-l">${g.items.map(i=>link(i.href,i.n,VIEW===i.v&&TAB===i.t)).join("")}</div></details>`).join("");
 const prog=FX_IBPROGRESS.map(([n,v,lab])=>{const t=fxTabIndex(v,lab);return t<0?"":link(fxHref(v,t),n,VIEW===v)}).join("");
 const up=fxUpTabs().map((t,i)=>link(fxHref("upsc",i),i===0?"UPSC Home":t,VIEW==="upsc"&&TAB===i)).join("");
 return `<div class="dw-top"><a class="dw-brand" href="#/">Arjun Agrawal <span>Economics</span></a>
  <button type="button" class="dw-x" onclick="closeMenu()" aria-label="Close the menu">Close</button></div>
  <button type="button" class="dw-search" onclick="closeMenu();cpOpen()">Search the platform</button>
  ${fxSwitcher(path,"dw-sw")}
  <div class="dw-sec"><a class="dw-main" href="#/"${VIEW==="home"?' aria-current="page"':""}>Home</a></div>
  <div class="dw-sec p-ib"><div class="dw-k">Pathway 01</div><a class="dw-main" href="#/ib"${VIEW==="ib"?' aria-current="page"':""}>IB DP Economics</a>${ib}
   <details class="dw-g"><summary>Your progress</summary><div class="dw-l">${prog}</div></details></div>
  <div class="dw-sec p-up"><div class="dw-k">Pathway 02</div><a class="dw-main" href="#/upsc"${VIEW==="upsc"&&TAB===0?' aria-current="page"':""}>UPSC CSE Economics</a><div class="dw-l flat">${up}</div></div>
  <div class="dw-sec"><a class="dw-main" href="#/about"${VIEW==="about"?' aria-current="page"':""}>About</a><a class="dw-main" href="#/contact"${VIEW==="contact"?' aria-current="page"':""}>Contact</a></div>
  <div class="dw-sec dw-bb"><div class="dw-k">Beyond Economics</div>${fxBBLink("dw-main dw-ext")}<p class="dw-note">${esc(FX_BB.subject)}</p></div>`;
}
function fxMobileDrawer(){
 if(document.getElementById("mob"))return closeMenu();
 const d=document.createElement("nav");d.id="mob";d.className="drawer mobnav fxdrawer on";d.setAttribute("aria-label","Menu");
 d.innerHTML=fxDrawerHtml();
 document.body.appendChild(d);
 document.getElementById("scrim").classList.add("on");
 d.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>closeMenu()));
 const b=document.getElementById("burger");if(b)b.setAttribute("aria-expanded","true");
 const first=d.querySelector(".dw-x");if(first)first.focus();
 d.addEventListener("keydown",e=>{if(e.key==="Escape"){closeMenu();const bb=document.getElementById("burger");if(bb)bb.focus()}});
}
/* The older layers bind the burger to mobileDrawer() by name at the end of the
   build; reassigning the function here routes them to the new drawer. */
mobileDrawer=fxMobileDrawer;
(function(){const prev=closeMenu;closeMenu=function(){const r=prev.apply(this,arguments);const b=document.getElementById("burger");if(b)b.setAttribute("aria-expanded","false");return r}})();

/* ── the page's title names its pathway ─────────────────────────────────
   The older layers title a section "Learn · Arjun Agrawal · IB DP Economics".
   A page in the IB DP environment now reads "Learn · IB DP Economics · Arjun
   Agrawal"; a shared page reads "About · Arjun Agrawal · Economics". Titles
   the layers set for one item (a Studio piece, a UPSC page) are left alone. */
const FX_OLDSUFFIX=" · Arjun Agrawal · IB DP Economics";
function fxTitle(){
 if(VIEW==="ib"){document.title="IB DP Economics · Arjun Agrawal · Economics";return}
 const t=document.title;if(!t.endsWith(FX_OLDSUFFIX))return;
 const name=t.slice(0,-FX_OLDSUFFIX.length);
 document.title=fxPathway(VIEW)==="ib"?name+" · IB DP Economics · Arjun Agrawal":name+" · Arjun Agrawal · Economics";
}

/* ── every render paints the shell ──────────────────────────────────────── */
fxBuildShell();
(function(){
 const prev=render;
 render=function(){const r=prev.apply(this,arguments);try{fxPaintShell()}catch(e){console.error(e)}try{fxTitle()}catch(e){}return r};
})();
