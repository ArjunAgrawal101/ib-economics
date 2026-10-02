/* ═══════════════════════════════════════════════════════════════════════════
   RENAISSANCE · 3 · Think like an economist, as a system
   The tagline becomes a toolkit: eighteen lenses, each a short idea, the
   questions an economist asks through it, and links into content that already
   exists on the platform (found through the search index, never duplicated).
   A teaching frame by Arjun Agrawal, labelled as such wherever it appears.
   Also here: the named teaching components (Key idea, Misconception, Exam
   connection …), the economic idea of the day and Random Economics.
   ═══════════════════════════════════════════════════════════════════════════ */
const TLAE_Q=["What is the incentive?","What is the opportunity cost?","Who gains?","Who loses?","What changes?",
 "What remains constant?","What assumption are we making?","What does the model predict?","What happened in reality?",
 "What evidence supports the claim?","What evidence challenges it?","What are the unintended consequences?",
 "What would happen if one variable changed?","What does the model fail to capture?"];
const LENSES=[
 {k:"incentives",n:"Incentives",m:"shift",line:"People respond to what they gain or lose from a choice, so a change in costs or rewards changes behaviour.",
  ask:["Whose incentive changes, and by how much?","Is the response likely to be large or small, and over what time?","Could the response defeat the purpose of the policy?"],
  q:["incentive","subsidy","tax"],subs:["2.1","2.7","3.7"]},
 {k:"oppcost",n:"Opportunity cost",m:"ppc",line:"The real cost of a choice is the next best alternative given up, whether or not money changes hands.",
  ask:["What is the next best alternative?","Who bears that cost: the chooser, or someone else?","Does the cost appear now or later?"],
  q:["opportunity cost","scarcity","production possibility"],subs:["1.1"]},
 {k:"margin",n:"Marginal thinking",m:"costs",line:"Decisions are made at the margin: one more unit is worth producing or buying if its extra benefit exceeds its extra cost.",
  ask:["What does one more unit add to benefit and to cost?","Where does the extra benefit equal the extra cost?","Is an average being mistaken for a margin?"],
  q:["marginal","profit maximisation","MC = MR"],subs:["2.11","2.1"]},
 {k:"tradeoffs",n:"Trade-offs",m:"phillips",line:"Most goals compete for the same resources or the same instrument, so gaining on one usually means giving ground on another.",
  ask:["Which objectives pull against each other here?","Is the trade-off permanent or only short-run?","Who decides the weight given to each side?"],
  q:["trade-off","conflict between objectives","Phillips"],subs:["3.3","1.1"]},
 {k:"elasticity",n:"Elasticity",m:"elastic",line:"How strongly quantity responds to price or income decides who bears a tax, whether revenue rises, and how far prices move.",
  ask:["How easily can buyers or sellers switch?","How much time has passed since the change?","What share of income is involved?"],
  q:["elasticity","PED","PES"],subs:["2.5","2.6"]},
 {k:"equilibrium",n:"Equilibrium",m:"sd",line:"Where plans to buy and plans to sell are consistent, there is no pressure for price to change until something shifts.",
  ask:["What would move the market away from this point?","How quickly does it adjust, and what happens meanwhile?","Is the equilibrium desirable, or just stable?"],
  q:["equilibrium","shortage","surplus"],subs:["2.3"]},
 {k:"efficiency",n:"Efficiency",m:"ppc",line:"Resources are used efficiently when no one can be made better off without making someone else worse off, and output matches what society values.",
  ask:["Is output where marginal social benefit equals marginal social cost?","Are resources idle or misallocated?","Efficient for whom, and measured how?"],
  q:["allocative efficiency","productive efficiency","welfare loss"],subs:["2.3","2.8","2.11"]},
 {k:"equity",n:"Equity",m:"lorenz",line:"Fairness in how income, wealth and opportunity are shared: a question of values that economics can inform but not settle.",
  ask:["How is the gain or loss distributed?","Is the outcome fair, or only efficient?","Which measure of inequality is being used?"],
  q:["equity","inequality","Gini","poverty"],subs:["2.12","3.4"]},
 {k:"externalities",n:"Externalities",m:"ext",line:"When a choice imposes costs or benefits on third parties who are not paid or charged, the market produces the wrong quantity.",
  ask:["Who is the third party, and what do they bear?","Is the external effect on production or on consumption?","Which intervention corrects it, and at what cost?"],
  q:["externality","MSC","carbon tax"],subs:["2.8"]},
 {k:"information",n:"Information",m:"model",line:"Markets work less well when one side knows more than the other, or when buyers cannot judge quality before they buy.",
  ask:["Who knows more, buyer or seller?","Can the better-informed side exploit it?","What would reveal the information?"],
  q:["asymmetric information","adverse selection","moral hazard"],subs:["2.10"]},
 {k:"power",n:"Market power",m:"costs",line:"A firm that can set its price restricts output and raises price above marginal cost, transferring surplus and losing some altogether.",
  ask:["How easily can rivals enter?","What does the firm do with its profit?","Would regulation or competition work better here?"],
  q:["monopoly","market power","oligopoly"],subs:["2.11"]},
 {k:"interdependence",n:"Interdependence",m:"trade",line:"Economies, markets and people are linked, so a shock in one place travels through trade, prices, finance and expectations.",
  ask:["Through which channel does the effect travel?","Who is exposed, and who is insulated?","Does the link amplify or dampen the shock?"],
  q:["interdependence","trade","exchange rate"],subs:["4.1","4.4","4.5"]},
 {k:"expectations",n:"Expectations",m:"phillips",line:"What people expect about prices, policy and income shapes what they do today, and can make forecasts partly self-fulfilling.",
  ask:["What do firms and households expect to happen?","How credible is the policy-maker?","What happens if expectations change first?"],
  q:["expectations","inflation targeting","credibility"],subs:["3.3","3.5"]},
 {k:"time",n:"Time",m:"cycle",line:"Short-run and long-run effects often differ in size and even in direction, so the time horizon changes the verdict.",
  ask:["What happens in the first year, and in the tenth?","Which effects take longest to appear?","Is the policy judged too early?"],
  q:["short run","long run","time lag"],subs:["2.5","3.2","3.6"]},
 {k:"risk",n:"Risk",m:"scatter",line:"When outcomes can be described by probabilities, people and firms can price, pool and share the chance of loss.",
  ask:["Who bears the risk, and are they paid for it?","Can the risk be insured or diversified?","Does protection against risk change behaviour?"],
  q:["risk","insurance","moral hazard"],subs:["2.10"]},
 {k:"uncertainty",n:"Uncertainty",m:"model",line:"Some futures cannot be assigned probabilities at all, so decisions rest on judgement, rules of thumb and the option to wait.",
  ask:["What could not have been forecast?","How robust is the conclusion if the key assumption fails?","Is waiting itself a choice with a cost?"],
  q:["uncertainty","confidence","investment"],subs:["3.2","2.4"]},
 {k:"institutions",n:"Institutions",m:"flow",line:"Laws, property rights, central banks, courts and norms set the rules within which every market and policy operates.",
  ask:["Which rules make this market possible?","Who enforces them, and how well?","Would the same policy work under different institutions?"],
  q:["institutions","property rights","central bank"],subs:["4.9","3.5"]},
 {k:"behaviour",n:"Behaviour",m:"game",line:"Real people are boundedly rational, influenced by defaults, framing and others, which can make simple models predict poorly.",
  ask:["Which bias or rule of thumb might be at work?","Would a change in default or framing alter the outcome?","Does the rational-choice prediction still hold?"],
  q:["behavioural","nudge","bounded rationality"],subs:["2.4"]}
];
/* links for a lens: the best matches in the platform's own search index */
function lensLinks(L,n){
 let I=[];try{I=buildIndex()}catch(e){return []}
 const want=["Concept","Real world","Case study","Mindmap","Diagram","Calculation","Question","Everywhere · question","Everywhere · one idea","Dictionary"];
 const seen=new Set(),out=[];
 for(const term of L.q){const t=term.toLowerCase();
  const hits=I.filter(x=>want.includes(x.k)&&(x.t||"").toLowerCase().includes(t)).concat(I.filter(x=>want.includes(x.k)&&!(x.t||"").toLowerCase().includes(t)&&(x.s||"").includes(t)));
  for(const h of hits){const key=h.k+"|"+h.t;if(seen.has(key))continue;seen.add(key);out.push(h);if(out.length>=(n||6))return out}}
 return out}
/* the named teaching components: one treatment each, one glyph each */
const KC_T={key:["Key idea","brs"],model:["Model","dem"],misc:["Common misconception","loss"],exam:["Exam connection","bur"],
 real:["Real-world connection","dat"],tlae:["Think like an economist","obs"],source:["Source note","slate"],policy:["Policy note","pol"],
 data:["Data point","dat"],puzzle:["Economic puzzle","evl"],snapshot:["Economic snapshot","cop"],case:["Case study","cop"],deeper:["Deeper dive","evl"]};
const KC_G={key:'<circle cx="12" cy="12" r="4"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>',
 model:'<path d="M4 20V4M4 20h16M6 6l12 12M6 18L18 6"/>',misc:'<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/>',
 exam:'<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M8 8h8M8 12h8M8 16h5"/>',
 real:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
 tlae:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 1 4 10.5c-1 1-1.5 2-1.5 3.5h-5c0-1.5-.5-2.5-1.5-3.5A6 6 0 0 1 12 3z"/>',
 source:'<path d="M6 3h9l3 3v15H6z"/><path d="M9 11h6M9 15h6"/>',policy:'<path d="M4 21h16M6 18V9M10 18V9M14 18V9M18 18V9M3 9l9-6 9 6z"/>',
 data:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',puzzle:'<path d="M9 9a3 3 0 1 1 4.2 2.7c-.8.4-1.2 1-1.2 1.8V15M12 18v.5"/><circle cx="12" cy="12" r="10"/>',
 snapshot:'<rect x="3" y="6" width="18" height="14" rx="1"/><circle cx="12" cy="13" r="3.5"/><path d="M8 6l1.5-2h5L16 6"/>',
 case:'<rect x="3" y="7" width="18" height="13" rx="1"/><path d="M9 7V4h6v3M3 12h18"/>',deeper:'<path d="M12 3v18M6 15l6 6 6-6"/>'};
function KC(type,title,body,opt){const t=KC_T[type]||KC_T.key;opt=opt||{};
 return `<aside class="kc kc-${type} kc-c-${t[1]}${opt.cls?" "+opt.cls:""}" aria-label="${esc(t[0])}">
  <div class="kc-h"><svg class="kc-g" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${KC_G[type]||KC_G.key}</svg><span class="kc-l">${esc(t[0])}</span>${opt.tag?`<span class="kc-tag">${esc(opt.tag)}</span>`:""}</div>
  ${title?`<div class="kc-t">${title}</div>`:""}<div class="kc-b">${body||""}</div></aside>`}
/* a lens chooses its questions for a subtopic */
function lensesFor(sub){return LENSES.filter(L=>L.subs.includes(sub))}
function tlaeBox(sub,ctx){
 const Ls=lensesFor(sub);const L=Ls[0]||LENSES[0];
 const qs=[...L.ask.slice(0,2),TLAE_Q[(sub||"").length%TLAE_Q.length],"What does the model fail to capture?"].filter((x,i,a)=>a.indexOf(x)===i).slice(0,4);
 return KC("tlae",`Through the lens of <button class="kc-link" onclick="openToolkit('${L.k}')">${esc(L.n)}</button>${Ls[1]?` and <button class="kc-link" onclick="openToolkit('${Ls[1].k}')">${esc(Ls[1].n)}</button>`:""}`,
  `<ol class="kc-q">${qs.map(q=>`<li>${esc(q)}</li>`).join("")}</ol>`,{tag:"Teaching frame",cls:ctx||""})}
const TLAE_TAB="Economist's toolkit";
function openToolkit(k){if(k)TLAE.k=k;const s=SECTIONS.find(x=>x.v==="think");nav("think",s&&s.tabs?Math.max(0,s.tabs.indexOf(TLAE_TAB)):0)}
/* ── the toolkit page (a tab in Think) ──────────────────────────────────── */
const TLAE={k:"incentives"};
function toolkitView(){
 const L=LENSES.find(x=>x.k===TLAE.k)||LENSES[0];const links=lensLinks(L,6);
 return H.pageHead("Think","The economist's toolkit","Eighteen lenses an economist uses on any question, from a price rise to a trade war. Pick one, ask its questions, then open the platform's own material through it.")
 +`<section class="sec"><div class="wrap full">
  <p class="xs"><span class="tag">Teaching frame</span> A way of organising economic thinking by Arjun Agrawal, not an IB list. The nine key concepts of the course are the IB's own; these lenses sit alongside them.</p>
  <div class="tk-grid mt4" role="group" aria-label="Choose a lens">${LENSES.map((x,i)=>`<button class="tk-lens${x.k===L.k?" on":""}" aria-pressed="${x.k===L.k}" onclick="TLAE.k='${x.k}';render()"><span class="tk-n">${String(i+1).padStart(2,"0")}</span><span class="tk-t">${esc(x.n)}</span></button>`).join("")}</div>
  <div class="tk-card mt5">
   <figure class="rn-fig">${motifSVG(L.m,{cls:"on-paper"})}<figcaption>${esc(motifCap(L.m))}</figcaption></figure>
   <div><div class="eb a">Lens ${LENSES.indexOf(L)+1} of ${LENSES.length}</div><h2 class="mt2">${esc(L.n)}</h2>
    <p class="ed mt3">${esc(L.line)}</p>
    ${KC("tlae","Ask",`<ol class="kc-q">${L.ask.map(q=>`<li>${esc(q)}</li>`).join("")}</ol>`)}
    <h3 class="mt4">Through this lens, on the platform</h3>
    ${links.length?`<ul class="tk-links mt2">${links.map(h=>`<li><button class="lnk" onclick="${esA(h.go)}"><span class="tk-k">${esc(h.k)}</span> ${esc(h.t)}</button></li>`).join("")}</ul>`:`<p class="sm mt2">Search the platform for ${esc(L.q[0])}.</p>`}
   </div></div>
  <h3 class="mt5">Fourteen questions, for any economic claim</h3>
  <ol class="tk-qs mt3">${TLAE_Q.map(q=>`<li>${esc(q)}</li>`).join("")}</ol>
 </div></section>`}
/* ── the economic idea of the day: chosen from the corpus by the date ──── */
function rnDay(d){d=d||new Date();return Math.floor(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/864e5)}
function rnPick(arr,day,salt){if(!arr||!arr.length)return null;return arr[((day*2654435761+salt*40503)>>>0)%arr.length]}
function dailyItems(d){
 const day=rnDay(d),out={};
 try{const pool=[].concat((typeof CONCEPTS!=="undefined"?CONCEPTS:[]).map(c=>({k:"Concept",t:c.t,d:c.def,go:`nav('learn',0,'${c.id}')`})),
   (typeof EEID!=="undefined"?EEID:[]).map(x=>({k:"One economic idea",t:x.n,d:x.line,go:`nav('everywhere',3,'${x.id}')`})));
  out.idea=rnPick(pool,day,1)}catch(e){}
 try{const C=(typeof RW_CASES!=="undefined"&&Array.isArray(RW_CASES))?RW_CASES:[];const c=rnPick(C,day,2);
  if(c)out.case={k:"Real World",t:c.t,d:c.is,meta:[c.c,c.y].filter(Boolean).join(" · "),go:`nav('world',0,'${c.id}')`,sub:c.sub}}catch(e){}
 try{const Q=(typeof QB!=="undefined"?QB:[]).flatMap(g=>(g.a||[]).map(a=>({k:"Question",t:a.s,d:g.n+" · "+a.ct,sub:g.sub})));const q=rnPick(Q,day,3);
  if(q)out.q=Object.assign(q,{go:"nav('practise',0)"})}catch(e){}
 try{const G=(typeof GLOSS!=="undefined"?GLOSS:[]);const g=rnPick(G,day,4);if(g)out.term={k:"Dictionary",t:g[0],d:g[2],go:"nav('course',6)"}}catch(e){}
 return out}
/* ── Random Economics: an editorial discovery engine over the search index ─ */
const RAND_TYPES=[["Concept",["Concept"]],["Case",["Real world","Case study"]],["Diagram",["Diagram"]],["Mindmap",["Mindmap"]],
 ["Calculation",["Calculation"]],["Video",["Video"]],["Question",["Question","Paper 1 practice","Paper 2 practice","Paper 3 practice"]],
 ["Puzzle",["Everywhere · question","Economic puzzle"]],["Idea",["Everywhere · one idea","Economics in 60 Seconds"]],["Dictionary",["Dictionary"]]];
const RAND={type:"",hist:[]};
function randomItem(type){
 let I=[];try{I=buildIndex()}catch(e){return null}
 const types=type?RAND_TYPES.filter(t=>t[0]===type):RAND_TYPES;
 for(let tries=0;tries<12;tries++){
  const T=types[Math.floor(Math.random()*types.length)];const pool=I.filter(x=>T[1].includes(x.k)&&x.go);
  if(!pool.length)continue;const it=pool[Math.floor(Math.random()*pool.length)];
  if(RAND.hist.includes(it.t)&&tries<10)continue;RAND.hist=RAND.hist.concat(it.t).slice(-12);return Object.assign({type:T[0]},it)}
 return null}
function randomOpen(type){
 if(type!==undefined)RAND.type=type;const it=randomItem(RAND.type);
 const chips=[["","Anything"]].concat(RAND_TYPES.map(t=>[t[0],t[0]]));
 drawer(`<div class="rnd"><div class="eb a">Random Economics</div>
  <h2 class="mt2" style="font-size:clamp(24px,3vw,34px)">Something you may not have met yet</h2>
  <div class="rnd-chips mt3" role="group" aria-label="What kind of thing">${chips.map(([k,l])=>`<button class="chip${RAND.type===k?" on":""}" aria-pressed="${RAND.type===k}" onclick="randomOpen('${k}')">${l}</button>`).join("")}</div>
  ${it?`<article class="rnd-card mt4"><div class="rnd-k">${esc(it.type)}${it.k!==it.type?` · ${esc(it.k)}`:""}</div>
   <h3 class="rnd-t">${esc(it.t)}</h3>${it.d?`<p class="sm mt2">${esc(String(it.d).slice(0,280))}${String(it.d).length>280?"…":""}</p>`:""}
   <div class="row mt4"><button class="btn" onclick="closeDrawer();${esA(it.go)}">Open it →</button><button class="btn gh" onclick="randomOpen()">Another</button></div></article>`
   :`<p class="sm mt4">Nothing of that kind is indexed yet.</p>`}
  <p class="xs mt4">Drawn at random from ${(()=>{try{return buildIndex().length.toLocaleString("en-GB")}catch(e){return "the"}})()} indexed items on this platform. Nothing is recorded.</p></div>`)}

/* the toolkit joins Think as its last tab, so every existing tab keeps its place */
(function(){const s=SECTIONS.find(x=>x.v==="think");if(s&&s.tabs&&!s.tabs.includes(TLAE_TAB))s.tabs.push(TLAE_TAB);
 const prev=VIEWS.think;VIEWS.think=function(){const t=SECTIONS.find(x=>x.v==="think");return t&&t.tabs[TAB]===TLAE_TAB?toolkitView():prev.apply(this,arguments)}})();
/* the lens questions appear where a student is already thinking: on every
   concept page (before the related-content panel) and every Real World case */
(function(){
 if(typeof conceptPage==="function"){const prev=conceptPage;conceptPage=function(c){const h=prev.apply(this,arguments);
  if(!c||!c.sub)return h;const box=`<div class="wrap full rn-tlae">${tlaeBox(c.sub)}</div>`;
  const k=h.lastIndexOf('<div class="wrap full"><section class="kg');return k>0?h.slice(0,k)+box+h.slice(k):h+box}}
 if(typeof rwCasePage==="function"){const prev=rwCasePage;rwCasePage=function(){const h=prev.apply(this,arguments);
  let c=null;try{c=RW_CASES.find(x=>x.id===ARG)}catch(e){}if(!c||!c.sub)return h;
  return h+`<section class="sec t rn-tlae"><div class="wrap full">${tlaeBox(c.sub)}</div></section>`}}
})();
