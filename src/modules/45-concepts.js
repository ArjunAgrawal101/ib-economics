/* ═══════════════════════════════════════════════════════════════════════════
   SHARED CONCEPTS · one concept, two examinations (#/concepts)
   The economics of a concept is shared; the syllabus, the questions and the
   examples are not, and the two are never merged. Each concept page has two
   modes, IB DP and UPSC CSE (the section's two tabs, so each mode has its own
   address). Both modes open with the same idea and the platform's own glossary
   definitions; then each mode keeps to its own examination:
   · IB DP: the unit, the IB application, the diagram, the platform's IB tools
     and practice prompts written in the style of IB Paper 1;
   · UPSC CSE: the syllabus application, the Indian economy, data and policy,
     the handbook volumes and parts, the Prelims MCQ and a practice question in
     the style of Mains GS III.
   The practice prompts are original and labelled as such: none is presented as
   a past paper. The content comes from UP_CONNECT, UP_TOPICS and GLOSS, which
   carry their own sources; nothing here adds a figure or a date.
   ═══════════════════════════════════════════════════════════════════════════ */
const CX_EXTRA={
 "Demand and supply":{g:["Demand","Supply"],m:"sd",
  pi:["Explain, using a diagram, how an increase in the price of a substitute affects the equilibrium price and quantity in a market. [10]","Using real-world examples, evaluate the use of price ceilings to protect consumers. [15]"],
  pu:"What is the rationale of Minimum Support Prices? Examine their effect on cropping patterns in India. (15 marks, 250 words)"},
 "Elasticity":{g:["Price elasticity of demand","Elasticity"],m:"elastic",
  pi:["Explain why the incidence of an indirect tax depends on the price elasticities of demand and supply. [10]","Using real-world examples, evaluate the significance of price elasticity of demand for a government's tax revenue. [15]"],
  pu:"Explain how the price elasticity of demand determines who bears a change in GST rates. (10 marks, 150 words)"},
 "Market failure":{g:["Market failure","Externality"],m:"ext",
  pi:["Explain, using a diagram, why a negative externality of production leads to a misallocation of resources. [10]","Using real-world examples, evaluate carbon taxes as a response to climate change. [15]"],
  pu:"Examine carbon pricing as a correction for market failure, with reference to the European Union's Carbon Border Adjustment Mechanism and India's exports. (15 marks, 250 words)"},
 "Inflation":{g:["Inflation","Demand-pull inflation"],m:"adas",
  pi:["Explain two causes of inflation, using AD-AS diagrams. [10]","Using real-world examples, evaluate the view that low and stable inflation should be a government's main macroeconomic objective. [15]"],
  pu:"Food inflation in India is often described as a supply-side problem. Examine the statement and discuss what monetary policy can and cannot do about it. (15 marks, 250 words)"},
 "Monetary policy":{g:["Inflation"],m:"adas",
  pi:["Explain how a rise in the central bank's policy interest rate can reduce demand-pull inflation. [10]","Using real-world examples, evaluate the effectiveness of monetary policy in reducing inflation. [15]"],
  pu:"Explain the monetary transmission mechanism in India and the factors that weaken it. (10 marks, 150 words)"},
 "Fiscal policy":{g:["Budget deficit"],m:"adas",
  pi:["Explain, using an AD-AS diagram, how expansionary fiscal policy can close a deflationary gap. [10]","Using real-world examples, evaluate the use of fiscal policy to promote economic growth. [15]"],
  pu:"Distinguish between the fiscal deficit and the primary deficit. What does each reveal about the Government's finances? (10 marks, 150 words)"},
 "Unemployment":{g:["Unemployment rate"],m:"labour",
  pi:["Explain the difference between structural and cyclical unemployment. [10]","Using real-world examples, evaluate supply-side policies as a means of reducing unemployment. [15]"],
  pu:"Examine the reasons for the persistence of informal employment in India. (15 marks, 250 words)"},
 "Economic growth and development":{g:["Economic growth","Economic development"],m:"ppc",
  pi:["Explain, using a PPC diagram, the difference between actual and potential economic growth. [10]","Using real-world examples, evaluate the view that economic growth is necessary for economic development. [15]"],
  pu:"Growth in India has not been matched by growth in employment. Examine the causes. (15 marks, 250 words)"},
 "Exchange rates":{g:["Exchange rate"],m:"fx",
  pi:["Explain, using a diagram, how an increase in a country's interest rates may affect the value of its currency. [10]","Using real-world examples, evaluate the consequences of a depreciation of a country's currency. [15]"],
  pu:"Explain the difference between NEER and REER. Why does the RBI intervene in the foreign exchange market? (10 marks, 150 words)"},
 "Balance of payments":{g:["Balance of payments","Current account"],m:"fx",
  pi:["Explain the relationship between the current account and the financial account of the balance of payments. [10]","Using real-world examples, evaluate expenditure-switching policies as a way of correcting a persistent current account deficit. [15]"],
  pu:"How is India's current account deficit usually financed? Examine the risks of each source. (15 marks, 250 words)"},
 "International trade":{g:["Comparative advantage","Free trade area"],m:"tariff",
  pi:["Explain, using a diagram, the effect of a tariff on domestic consumers and domestic producers. [10]","Using real-world examples, evaluate the view that free trade benefits all trading nations. [15]"],
  pu:"Examine the opportunities and the challenges that Free Trade Agreements present for India. (15 marks, 250 words)"}};
const cxId=c=>String(c).toLowerCase().replace(/&/g,"and").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
function cxList(){return (typeof UP_CONNECT!=="undefined"?UP_CONNECT:[]).map(r=>Object.assign({id:cxId(r.c)},r,CX_EXTRA[r.c]||{g:[],m:"sd",pi:[],pu:""}))}
function cxGet(id){return cxList().find(x=>x.id===id)}
const CX_MODES=[["IB DP","ib","IB DP Economics"],["UPSC CSE","up","UPSC CSE Economics"]];
function cxHref(mode,id){return routeFormat("concepts",mode,id)}
function cxGloss(x){const G=typeof GLOSSMAP!=="undefined"?GLOSSMAP:{};return (x.g||[]).map(t=>G[t.toLowerCase()]).filter(Boolean)}
function cxIndex(mode){const L=cxList(),M=CX_MODES[mode];
 return `<section class="cx-mast cx-${M[1]}" aria-labelledby="cx-h"><div class="wrap full">
  <div class="sy-eb">Shared concepts · ${esc(M[2])} reading</div><h1 class="cx-h1" id="cx-h">One concept, two examinations.</h1>
  <p class="cx-l">The economics of a concept is shared. The syllabus, the questions and the examples are not, and they are kept apart here. Read each concept for the examination you are preparing for, and switch when you want to see the other.</p>
  ${cxModes(mode,null)}</div></section>
 <section class="sy-sec cx-idx"><div class="wrap full"><ul class="cx-grid">${L.map(x=>{const t=x.t&&typeof upTopic==="function"?upTopic(x.t):null;
   return `<li><a class="cx-card rv" style="--i:${L.indexOf(x)%3}" href="${esA(cxHref(mode,x.id))}"><span class="cx-ck">${esc(mode===0?x.ibk:"UPSC CSE · "+(t?t.cat:"Economics"))}</span><b>${esc(x.c)}</b><span>${esc(mode===0?x.ib:x.up)}</span><i aria-hidden="true">→</i></a></li>`}).join("")}</ul></div></section>`}
function cxModes(mode,id){return `<div class="cx-modes" role="group" aria-label="Read this for">${CX_MODES.map(([l,k,n],i)=>`<a class="cx-mode cx-mode-${k}${i===mode?" on":""}" href="${esA(cxHref(i,id))}"${i===mode?' aria-current="page"':""}>${esc(n)}</a>`).join("")}</div>`}
function cxPage(x,mode){const M=CX_MODES[mode],other=CX_MODES[1-mode],t=x.t&&typeof upTopic==="function"?upTopic(x.t):null,G=cxGloss(x),L=cxList(),i=L.findIndex(y=>y.id===x.id),nx=L[(i+1)%L.length];
 const idea=`<section class="cx-s"><h2 class="cx-h2">The idea</h2>${G.length?`<dl class="cx-dl">${G.map(g=>`<div><dt>${esc(g[0])}</dt><dd>${esc(g[2])}</dd></div>`).join("")}</dl><p class="cx-src">Definitions from the platform's glossary of IB DP Economics terms.</p>`:""}
   ${t&&mode===1?`<p class="cx-p">${esc(t.ex[0])}</p>`:""}</section>`;
 const ib=`<section class="cx-s"><h2 class="cx-h2">In the IB DP Economics course</h2><p class="cx-unit">${esc(x.ibk)}</p><p class="cx-p">${esc(x.ib)}</p></section>
  <figure class="cx-fig">${typeof motifSVG==="function"?motifSVG(x.m||"sd"):""}<figcaption>${esc((typeof MOTIFS!=="undefined"&&MOTIFS[x.m]&&MOTIFS[x.m].cap)||"")}</figcaption></figure>
  <section class="cx-s"><h2 class="cx-h2">Work with it on the platform</h2><div class="cx-links">${typeof upIbLinks==="function"?upIbLinks(x):""}<a class="up-ibl" href="${esA(routeFormat("practise",0))}">Question bank</a><a class="up-ibl" href="${esA(routeFormat("world",0))}">Real-world cases</a></div></section>
  <section class="cx-s cx-q"><h2 class="cx-h2">Practice in the style of IB DP Economics</h2><p class="cx-note">Original practice prompts in the form of Paper 1 (an explanation worth 10 marks, then an evaluation worth 15). They are not past-paper questions.</p>
   <ol>${(x.pi||[]).map(q=>`<li>${esc(q)}</li>`).join("")}</ol><a class="cx-more" href="${esA(routeFormat("examiner",0))}">Markbands and command terms in the Exam cockpit →</a></section>`;
 const vols=(x.vols||[]).map(([n,p])=>{const v=UPSC_HB.volumes.find(y=>y.n===n);return v?`<li><a href="${esA(upHref("handbooks",v.id))}"><b>Volume ${esc(v.n)}: ${esc(v.title)}</b><span>Parts ${esc(p)} · ${v.pages} pages</span></a></li>`:""}).join("");
 const up=`<section class="cx-s"><h2 class="cx-h2">In UPSC CSE Economics</h2><p class="cx-p">${esc(x.up)}</p></section>
  ${t?`<figure class="cx-fig cx-fig-up">${typeof upFig==="function"?upFig(t.fig):""}<figcaption>${esc(t.figCap)}</figcaption></figure>
  <div class="cx-two"><section class="cx-s"><h2 class="cx-h3">In the Indian economy</h2><p class="cx-p">${esc(t.india)}</p></section><section class="cx-s"><h2 class="cx-h3">Data, policy and institutions</h2><p class="cx-p">${esc(t.policy)}</p></section></div>
  <div class="cx-two"><section class="cx-s"><h2 class="cx-h3">The Prelims perspective</h2><p class="cx-p">${esc(t.pre)}</p></section><section class="cx-s"><h2 class="cx-h3">The Mains perspective</h2><p class="cx-p">${esc(t.mains)}</p></section></div>
  ${typeof upMcq==="function"?upMcq(t):""}`:""}
  <section class="cx-s cx-q"><h2 class="cx-h2">Practice in the style of Mains GS III</h2><p class="cx-note">An original practice question in the form of General Studies Paper III. It is not a previous year's question.</p><ol><li>${esc(x.pu||"")}</li></ol></section>
  ${vols?`<section class="cx-s"><h2 class="cx-h2">In the Indian Economy Collection</h2><ul class="cx-vols">${vols}</ul>${t?`<a class="cx-more" href="${esA(upHref("resources",t.id))}">Free topic preview: ${esc(t.t)} →</a>`:""}</section>`:""}`;
 return `<section class="cx-mast cx-${M[1]}" aria-labelledby="cx-h"><div class="wrap full">
  <nav class="ibl-crumb" aria-label="Breadcrumb"><a href="${esA(cxHref(mode,null))}">Shared concepts</a><span aria-hidden="true">/</span><span aria-current="page">${esc(x.c)}</span></nav>
  <div class="sy-eb mt3">${esc(M[2])} reading</div><h1 class="cx-h1" id="cx-h">${esc(x.c)}</h1>${cxModes(mode,x.id)}</div></section>
 <div class="wrap full cx-body"><article class="cx-main">${idea}${mode===0?ib:up}</article>
  <aside class="cx-side"><div class="cx-other cx-${other[1]}"><div class="sy-eb">The other reading</div><b>${esc(x.c)} in ${esc(other[2])}</b><p>${esc(mode===0?x.up:x.ib)}</p>
   <a class="cx-sw" href="${esA(cxHref(1-mode,x.id))}">Read it for ${esc(other[2])} →</a></div>
   <p class="cx-sep">The two examinations share this concept, not a syllabus: each reading keeps to its own.</p>
   <a class="cx-next" href="${esA(cxHref(mode,nx.id))}"><span>Next concept</span><b>${esc(nx.c)}</b></a></aside></div>`}
SECTIONS.push({v:"concepts",n:"Shared concepts",tabs:CX_MODES.map(m=>m[0])});
VIEWS.concepts=function(){const mode=TAB===1?1:0,x=ARG?cxGet(ARG):null;return x?cxPage(x,mode):cxIndex(mode)};
(function(){if(typeof document==="undefined")return;const prev=render;render=function(){const r=prev.apply(this,arguments);
 try{if(VIEW==="concepts"){const x=ARG?cxGet(ARG):null;document.title=(x?x.c+" · ":"")+"Shared concepts · "+(TAB===1?"UPSC CSE":"IB DP")+" · Arjun Agrawal | Economics"}}catch(e){}return r}})();
(function(){if(typeof buildIndex!=="function")return;const prev=buildIndex;
 buildIndex=function(){if(SIDX)return SIDX;const I=prev().slice();
  cxList().forEach(x=>{I.push({k:"Shared concept",t:x.c+" · IB DP reading",d:x.ibk,go:`nav('concepts',0,'${x.id}')`,s:("shared concept ib dp "+x.c+" "+x.ib).toLowerCase()});
   I.push({k:"Shared concept",t:x.c+" · UPSC CSE reading",d:"UPSC CSE Economics",go:`nav('concepts',1,'${x.id}')`,s:("shared concept upsc cse india "+x.c+" "+x.up).toLowerCase()})});
  return SIDX=I};try{SIDX=null}catch(e){}})();
function CXSUITE(){const out=[];const T=(n,f)=>{let ok=false,det="";try{const r=f();ok=r===true||(r&&r.ok);if(r&&r.d)det=r.d}catch(e){det=e.message}out.push({n,ok:!!ok,detail:det})};
 const txt=h=>String(h).replace(/<[^>]+>/g," ").replace(/\s+/g," ");
 T("Concepts · eleven shared concepts, each with an IB reading, a UPSC reading and both sets of practice",()=>{const L=cxList();return {ok:L.length===11&&L.every(x=>x.pi.length===2&&x.pu&&x.ibk&&x.ib&&x.up&&CX_EXTRA[x.c]),d:L.map(x=>x.id).join()}});
 T("Concepts · both modes of every concept have their own address and render",()=>cxList().every(x=>[0,1].every(m=>{const r=routeParse(cxHref(m,x.id));return r&&r.v==="concepts"&&r.t===m&&r.a===x.id&&/<h1/.test(cxPage(x,m))})));
 T("Concepts · the IB reading never carries UPSC material, and the UPSC reading never carries IB practice",()=>cxList().every(x=>{const main=h=>txt(h.split('<article class="cx-main">')[1].split('</article>')[0]),a=main(cxPage(x,0)),b=main(cxPage(x,1));
  return !/Mains|Prelims|Indian Economy Collection|UPSC/.test(a)&&!/Paper 1|\[10\]|\[15\]/.test(b)}));
 T("Concepts · every practice prompt is labelled as original, not a past paper",()=>cxList().every(x=>/not past-paper questions/.test(cxPage(x,0))&&/not a previous year's question/.test(cxPage(x,1))));
 T("Concepts · every link on every concept page is a route that exists",()=>{const bad=[];cxList().forEach(x=>[0,1].forEach(m=>{(cxPage(x,m).match(/href="([^"]+)"/g)||[]).forEach(h=>{const u=h.slice(6,-1);if(!/^#/.test(u)||!routeParse(u))bad.push(u)})}));return {ok:!bad.length,d:bad.slice(0,5).join(" ")}});
 T("Concepts · every glossary term named exists in the glossary",()=>Object.values(CX_EXTRA).every(e=>e.g.every(t=>typeof GLOSSMAP==="undefined"||!!GLOSSMAP[t.toLowerCase()])));
 return out}
if(typeof EXTRA_SUITES!=="undefined")EXTRA_SUITES.push(CXSUITE);
