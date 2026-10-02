/* ═══════════════════════════════════════════════════════════════════════════
   WIRING: a simpler primary bar, a grouped More menu that reaches everything,
   the phone drawer, search records and the home band for the data lab,
   economists and ideas, and Why did this happen?
   ═══════════════════════════════════════════════════════════════════════════ */
/* The primary bar's order lives in one place (the navigation-settled part at the end
   of the build). The More menu groups everything else by what a visitor came to do;
   it lists every section, including those on the bar (a narrow screen withdraws some of them), and anything not named
   below is appended under "More", so no section can become unreachable. */
moreMenu=function(e){e.stopPropagation();if(document.getElementById("menu")){closeMenuPop();return}
 const G=[["Learn and explore",[["resources","Resources"],["paths","Pathways"],["course","Course"],["learn","Learn"],["think","Think"],["events","Economic events"],["@why","Why did this happen?"],["ideas","Economists and ideas"],["data","Economic data"],["lab","Lab"],["world","Real World"],["mind","Mindmaps"],["everywhere","Economics, Everywhere"],["tok","TOK × Economics"],["arjun","Video studio"],["video","Video library"]]],
  ["Exam and research",[["practise","Practise"],["examiner","Exam"],["papers","Paper labs"],["dna","Exam DNA"],["calculate","Calculate"],["session","Timed session"],["ees","EE Studio"],["ia","IA studio"]]],
  ["Your work",[["master","Dashboard"],["syllabus","My syllabus"],["saved","My economics"],["workspace","My workspace"]]],
  ["Teach",[["educator","Educator studio"],["teacher","Teacher tools"]]],
  ["About",[["about","About"],["tutorials","Tutorials"],["settings","Settings"],["tools","Tools"]]]];
 const placed=new Set(["home",...G.flatMap(g=>g[1].map(x=>x[0]))]);
 const rest=SECTIONS.filter(s=>!placed.has(s.v)).map(s=>[s.v,s.n]);
 const groups=(rest.length?G.concat([["More",rest]]):G).map(([h,it])=>[h,it.filter(([v])=>v==="@why"||SECTIONS.some(s=>s.v===v))]).filter(([,it])=>it.length);
 const d=document.createElement("div");d.className="menu";d.id="menu";d.setAttribute("role","menu");
 d.innerHTML=groups.map(([lab,it],gi)=>(gi?'<div class="sep"></div>':"")+`<div class="lab">${lab}</div>`+it.map(([v,n])=>v==="@why"
   ?`<button role="menuitem" class="${VIEW==="think"&&TAB===WHYTAB()?"on":""}" onclick="closeMenuPop();nav('think',WHYTAB())">${n}</button>`
   :`<button class="${VIEW===v?"on":""}" role="menuitem" onclick="closeMenuPop();nav('${v}')">${esc((SECTIONS.find(s=>s.v===v)||{}).n||n)}</button>`).join("")).join("");
 document.body.appendChild(d);const r=document.getElementById("moreBtn").getBoundingClientRect();
 d.style.maxHeight="min(72vh,620px)";d.style.overflow="auto";d.style.top=(r.bottom+8)+"px";d.style.left=Math.max(10,Math.min(window.innerWidth-250,r.left-40))+"px";
 setTimeout(()=>document.addEventListener("click",closeMenuPop,{once:true}),0)};
if(typeof MOREV!=="undefined"&&Array.isArray(MOREV))["think","ideas","data","ees","arjun","master","ia","educator","about"].forEach(v=>{if(!MOREV.includes(v))MOREV.push(v)});

/* search: every economist, every causal question and every data page */
(function(){if(typeof buildIndex!=="function")return;const prev=buildIndex;
 buildIndex=function(){if(SIDX)return SIDX;const I=prev().slice();
  IDEASIDX.economists.forEach(e=>I.push({k:"Economist",t:e.name,d:`${e.life} · ${e.headline}`,go:`nav('ideas',0,'${e.id}')`,s:[e.era,e.kc.join(" "),e.subs.join(" "),"economist ideas history of economic thought"].join(" ")}));
  IDEASIDX.causal.forEach(c=>I.push({k:"Why did this happen?",t:c.q,d:`A causal pathway · Unit ${c.unit} · ${c.subs.join(", ")}`,go:`nav('think',WHYTAB(),'${c.id}')`,s:[c.id,c.kc.join(" "),c.subs.join(" "),"why cause mechanism reasoning"].join(" ")}));
  [["Data explorer",0,"compare GDP, inflation, population, Gini and CO2 across economies and years","gdp inflation cpi population gini inequality co2 emissions growth chart data statistics"],
   ["Country profiles",1,"one economy, every indicator, with the world for reference","country atlas economy profile india china united states data"],
   ["Markets and prices",2,"oil prices, US bond yields, US unemployment and exchange rates","oil brent interest rate yield bond unemployment exchange rate currency depreciation data"],
   ["Sources and method",3,"where every number comes from and what was done to it","source world bank fred eia bls provenance method data"]].forEach(([t,i,d,s])=>I.push({k:"Data",t:"Economic data · "+t,d,go:`nav('data',${i})`,s}));
  return SIDX=I};
 if(typeof RN_KIND_W!=="undefined")Object.assign(RN_KIND_W,{"Economist":2,"Why did this happen?":2.2,"Data":1.8});
 if(typeof CPGROUPS!=="undefined"&&!CPGROUPS.some(g=>g[0]==="ideas"))CPGROUPS.splice(2,0,["ideas","Ideas, reasoning and data",/^(Economist|Why did this happen\?|Data)$/]);
 try{SIDX=null}catch(e){}})();

/* the home page: three ways to think with evidence */
function rnIdeasBand(){const e=IDEASIDX.economists,c=IDEASIDX.causal,pick=(a,n)=>a[(new Date().getDate()+n)%a.length];const q=pick(c,0),p=pick(e,3);
 return `<section class="sec rn-band"><div class="wrap full"><div class="t6-band">
  <div class="t6-b"><div class="eb">History</div><h3 class="mt1">Economic events</h3><p class="sm mt2">${esc(pick(EVENTSIDX.events,1).title)} (${esc(pick(EVENTSIDX.events,1).years)}): ${esc(pick(EVENTSIDX.events,1).question)}</p><p class="xs mt1">Twelve episodes told as Economics, from 1929 to 2020.</p><button class="btn sm mt3" onclick="nav('events',0,'${pick(EVENTSIDX.events,1).id}')">Follow the story</button> <button class="btn gh sm mt3" onclick="nav('events',0)">All ${EVENTSIDX.events.length}</button></div>
  <div class="t6-b"><div class="eb">Reason</div><h3 class="mt1">Why did this happen?</h3><p class="sm mt2">${esc(q.q)}</p><p class="xs mt1">Predict, then work it through: mechanism, diagram, evidence, evaluation and the explanations to rule out.</p><button class="btn sm mt3" onclick="nav('think',WHYTAB(),'${q.id}')">Work it through</button> <button class="btn gh sm mt3" onclick="nav('think',WHYTAB())">All ${c.length}</button></div>
  <div class="t6-b"><div class="eb">Evidence</div><h3 class="mt1">Economic data</h3><p class="sm mt2">GDP, inflation, inequality, emissions, oil, interest and exchange rates, from the institutions that publish them, with every source named.</p><button class="btn sm mt3" onclick="nav('data',0)">Open the data explorer</button> <button class="btn gh sm mt3" onclick="nav('data',1)">Country profiles</button></div>
  <div class="t6-b"><div class="eb">Ideas</div><h3 class="mt1">${esc(p.name)}</h3><p class="sm mt2">${esc(p.headline)}</p><p class="xs mt1">${esc(p.life)} · ${esc(p.era)}</p><button class="btn sm mt3" onclick="nav('ideas',0,'${p.id}')">Read the profile</button> <button class="btn gh sm mt3" onclick="nav('ideas',0)">All ${e.length} economists</button></div>
 </div></div></section>`}
