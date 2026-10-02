/* ═══════════════════════════════════════════════════════════════════════════
   PATHWAYS · one body of Economics, several ways in
   The economics underneath is shared; each pathway is an overlay that says
   honestly what it offers today. IB DP Economics is the deepest (written to the
   official guide). The Cambridge and civil-services overlays use the concept-
   first content and do not yet carry syllabus maps: those wait for the official
   syllabus documents to be checked. The Indian economy hub gathers the
   platform's India data, cases and history.
   ═══════════════════════════════════════════════════════════════════════════ */
const PATHWAYS=[
 {id:"ib",name:"IB DP Economics",who:"Students on the IB Diploma Programme, SL and HL.",depth:"Deepest",status:"Written to the IB Economics guide (first assessment 2022)",
  lead:"Thirty-one lessons, the nine key concepts, the six real-world issues, paper labs, the IA and EE studios, and TOK.",
  steps:[["Start with the course map","nav('course',TOPICS_TAB())"],["Open a lesson","nav('course',TOPICS_TAB(),'2.1')"],["Practise a paper","nav('papers')"],["Plan your IA","nav('ia')"],["Revise","nav('practise')"]]},
 {id:"cambridge",name:"Cambridge International AS & A Level",who:"Students taking Cambridge International AS and A Level Economics.",depth:"Concept-first",status:"Syllabus map not yet published: awaiting the official syllabus document",
  lead:"Most of the economics overlaps with IB: demand and supply, elasticity, market failure, macroeconomic policy, trade and exchange rates. Use the concept pages, labs, diagrams, data and events; the exam layer here is IB's, so check command words and paper formats against your own syllabus.",
  steps:[["Concepts and diagrams","nav('learn')"],["The diagram atlas","nav('lab',3)"],["Why did this happen?","nav('think',WHYTAB())"],["Economic events","nav('events',0)"],["Economic data","nav('data',0)"]]},
 {id:"school",name:"School and senior secondary",who:"Students meeting Economics for the first time at school.",depth:"Introductory",status:"Concept-first; no syllabus claims",
  lead:"Begin with everyday questions, then the core ideas: scarcity and choice, demand and supply, prices, and what governments do.",
  steps:[["Everyday questions","nav('everywhere',1)"],["One idea at a time","nav('everywhere',3)"],["The market lab","nav('lab',0)"],["Key concepts","nav('course')"]]},
 {id:"university",name:"University and college",who:"Undergraduates, and anyone who wants the models, the evidence and the debates.",depth:"Advanced",status:"Built from Go deeper panels, events, economists and data",
  lead:"Each lesson's Go deeper panels add formal reasoning and research; the events archive adds economic history and competing interpretations; the economists section adds the history of thought; the data lab adds evidence.",
  steps:[["Economists and ideas","nav('ideas',0)"],["Economic events","nav('events',0)"],["Economics through time","nav('events',2)"],["Economic data","nav('data',0)"],["Concept network","nav('think')"]]},
 {id:"civil",name:"Civil services and the Indian economy",who:"Candidates preparing Economics for civil-services examinations, and anyone studying the Indian economy.",depth:"Applied",status:"Syllabus map not yet published: awaiting the official documents; facts are dated and sourced",
  lead:"The Indian economy through its data, its policy cases and its history, from the 1991 balance-of-payments crisis to taxation, inflation targeting, the external sector, agriculture, employment and development.",
  steps:[["The Indian economy hub","nav('paths',1)"],["India 1991","nav('events',0,'india-1991')"],["India's data","dlS().atlas='IND';save();nav('data',1)"],["Why did this happen?","nav('think',WHYTAB())"]]},
 {id:"everyone",name:"Economics for everyone",who:"Anyone curious about how economies work.",depth:"From intuition up",status:"No exam language",
  lead:"Why flights cost more tomorrow, why queues exist, why a currency can fall fast, why markets sometimes fail: start from a question and follow it as far as you like.",
  steps:[["Big questions","nav('everywhere',1)"],["Economics in real life","nav('everywhere',2)"],["Economic events","nav('events',0)"],["Economists and ideas","nav('ideas',0)"]]}];
function pathS(){return S.path||""}
function pathsView(){const cur=pathS();
 return H.pageHead("Pathways","Choose your path",`One body of Economics underneath, several ways in. Each pathway says what it offers today and how deep it goes. IB DP Economics is the deepest; the others are being built on the same foundations.`)
 +`<section class="sec"><div class="wrap"><div class="pa-grid">${PATHWAYS.map(p=>`<article class="pa-card ${cur===p.id?"on":""}"><div class="pa-top"><span class="eb">${esc(p.depth)}</span>${cur===p.id?`<span class="xs">Your path</span>`:""}</div>
   <h2 class="pa-n">${esc(p.name)}</h2><p class="sm mt1"><em>${esc(p.who)}</em></p><p class="sm mt2">${esc(p.lead)}</p>
   <p class="xs mt2 pa-st"><strong>Status:</strong> ${esc(p.status)}</p>
   <ol class="pa-steps mt3">${p.steps.map(([t,go])=>`<li><button class="lnk" onclick="${go}">${esc(t)}</button></li>`).join("")}</ol>
   <button class="btn sm mt3 ${cur===p.id?"gh":""}" aria-pressed="${cur===p.id}" onclick="S.path=${cur===p.id?"''":`'${p.id}'`};save();render()">${cur===p.id?"Clear my path":"Make this my path"}</button></article>`).join("")}</div>
  <p class="xs mt4">Choosing a path changes what the home page suggests first; it hides nothing. It is kept on this device only.</p></div></section>`}

/* the Indian economy hub */
const INTHEMES=[["Public finance and taxation",["MIC-001","MIC-002","MIC-006","MAC-006","MAC-049","MAC-002"]],["Money, inflation and banking",["MAC-003","MAC-001","DEV-004"]],
 ["The external sector",["GLO-014","GLO-015","GLO-041","GLO-045"]],["Agriculture and food",["MIC-003","MIC-004","MIC-005","DEV-005"]],["Employment and labour",["MAC-004","DEV-003","DEV-045"]],
 ["Development and welfare",["DEV-001","DEV-002","DEV-033","DEV-047","MIC-037","MIC-036"]],["Industry, technology and markets",["MAC-005","MIC-042","MIC-039","DEV-006","MIC-038"]]];
function indiaHub(){const D=dlData(),cases=typeof RW_CASES!=="undefined"?RW_CASES:[];
 const charts=D?["gdppc","infl","gini"].map(k=>{const i=D.indicators.find(x=>x.id===k);if(!i||!i.data.IND)return "";
  const ser=[{name:"India",short:"India",color:DLPAL[0],pts:i.data.IND.filter(p=>p[0]>=1990)}].concat(i.data.WLD?[{name:"World",short:"World",color:"#8A8F96",pts:i.data.WLD.filter(p=>p[0]>=1990)}]:[]);
  return `<article class="dl-card"><div class="dl-head"><h3 class="dl-t">${esc(i.name)}</h3><span class="xs">${esc(i.unit)}</span></div>${dlChart("in-"+k,ser,{unit:i.unit,title:i.name+", India",zero:i.kind!=="index"})}${dlLegend(ser)}${dlSrc(i,D.meta.retrieved)}</article>`}).join(""):`<div class="dl-state" role="status">Loading India's data…</div>`;
 return H.pageHead("Pathways","The Indian economy",`India's economy through its data, its policy cases and its history. Every figure names its source and date; nothing here is a forecast or a statement of current policy.`)
 +`<section class="sec"><div class="wrap">
  <div class="pa-lead"><div><div class="eb">Start with the turning point</div><h2 class="mt1">The 1991 balance-of-payments crisis</h2><p class="sm mt2">How a reserve crisis became the start of India's economic reforms: the trigger, the response by the Government of India and the RBI, and what changed afterwards.</p>
   <button class="btn sm mt3" onclick="nav('events',0,'india-1991')">Follow the story</button> <button class="btn gh sm mt3" onclick="EVC.a='india-1991';EVC.b='asia-1997';nav('events',1)">Compare with the Asian crisis</button></div>
   <div><div class="eb">Economists</div><div class="id-chips mt2">${["sen","banerjee","duflo"].map(x=>{const o=IDEASIDX.economists.find(y=>y.id===x);return o?`<button class="kcchip" onclick="nav('ideas',0,'${o.id}')">${esc(o.name)}</button>`:""}).join("")}</div>
    <div class="eb mt3">Data</div><p class="sm mt1"><button class="lnk" onclick="dlS().atlas='IND';save();nav('data',1)">India's country profile</button> · <button class="lnk" onclick="dlS().fx='India';save();nav('data',2)">the rupee against the dollar</button></p></div></div>
  <h2 class="mt5">India in the data</h2><div class="dl-stack mt3">${charts}</div>
  <h2 class="mt5">India in policy: the platform's cases</h2><p class="sm mt1">Each case is a short economic analysis of a real Indian policy or market, with its date. Open one to see the theory, the diagram and the evaluation.</p>
  <div class="in-themes mt3">${INTHEMES.map(([h,ids])=>`<section><h3 class="pa-h3">${esc(h)}</h3><ul class="ls-list">${ids.map(id=>{const c=cases.find(x=>x.id===id);return c?`<li><button class="lnk" onclick="rwOpen('${c.id}')">${esc(c.t)}</button> <span class="xs">${esc(String(c.y||""))}</span></li>`:""}).join("")}</ul></section>`).join("")}</div>
  <p class="xs mt4">Current schemes, budgets and rates change: check the latest Economic Survey, Union Budget and RBI publications for current figures. This hub states no current policy facts beyond the dated cases.</p></div></section>`}
SECTIONS.push({v:"paths",n:"Pathways",hide:1,tabs:["Choose your path","The Indian economy"]});
VIEWS.paths=()=>TAB===1?indiaHub():pathsView();
(function(){if(typeof buildIndex!=="function")return;const prev=buildIndex;
 buildIndex=function(){if(SIDX)return SIDX;const I=prev().slice();
  PATHWAYS.forEach(p=>I.push({k:"Pathway",t:p.name,d:p.lead,go:p.id==="civil"?"nav('paths',1)":"nav('paths',0)",s:[p.id,p.who,p.depth,"pathway start here curriculum"].join(" ")}));
  I.push({k:"Pathway",t:"The Indian economy",d:"India's data, policy cases and the 1991 crisis",go:"nav('paths',1)",s:"india indian economy rbi rupee gst upsc civil services budget"});
  return SIDX=I};
 if(typeof RN_KIND_W!=="undefined")RN_KIND_W["Pathway"]=2.4;try{SIDX=null}catch(e){}})();
/* the home page: where do you want to start? */
function rnPathsBand(){const cur=pathS(),p=PATHWAYS.find(x=>x.id===cur);
 return `<section class="sec rn-band"><div class="wrap full"><div class="pa-band"><div><div class="eb">Where do you want to start?</div><h2 class="mt1">${p?`Your path: ${esc(p.name)}`:"Six ways into Economics"}</h2>
  <p class="sm mt2">${p?esc(p.lead):"IB DP Economics is the deepest pathway here. Cambridge, school, university, civil services and the curious each have their own way in to the same Economics."}</p></div>
  <div class="pa-chips">${PATHWAYS.map(x=>`<button class="pa-chip ${cur===x.id?"on":""}" onclick="nav('paths',0)">${esc(x.name)}<span>${esc(x.depth)}</span></button>`).join("")}<button class="pa-chip" onclick="nav('paths',1)">The Indian economy<span>Hub</span></button></div></div></div></section>`}
