/* ═══════════════════════════════════════════════════════════════════════════
   ECONOMIC EVENTS · an archive of economic history told as Economics
   Each event is a story in chapters: the world before, the trigger, the
   timeline, the mechanism (after a prediction), the data, the policy response,
   who gained and lost, the international transmission, competing readings,
   what the models explain and miss, a counterfactual, comparisons, curriculum
   connections and practice. Full text loads from assets/data/events.js and the
   charts from assets/data/history.js, both on demand; lists, the timeline and
   search use the resident index (EVENTSIDX).
   ═══════════════════════════════════════════════════════════════════════════ */
const EVX={loading:{},err:{}};
function evLoad(key,src,glob){
 if(window[glob])return window[glob];
 if(!EVX.loading[key]&&!EVX.err[key]&&!(typeof QARUNNING!=="undefined"&&QARUNNING)){EVX.loading[key]=true;const s=document.createElement("script");s.src=src;
  s.onload=()=>{EVX.loading[key]=false;if(!window[glob])EVX.err[key]=true;render()};s.onerror=()=>{EVX.loading[key]=false;EVX.err[key]=true;render()};document.head.appendChild(s)}
 return null}
const evData=()=>evLoad("ev","assets/data/events.js","__EVENTS__");
const evHist=()=>evLoad("hist","assets/data/history.js","__HISTORY__");
const EVSTATUS={fact:["Fact","Documented and checked in review"],interpretation:["Interpretation","One reading of the evidence"],inference:["Inference","A conclusion this platform draws from the facts"],controversy:["Controversy","Actively disputed among economists or historians"]};
function evBadge(st){const s=EVSTATUS[st]||EVSTATUS.fact;return `<span class="ev-st ev-st-${esc(st||"fact")}" title="${esc(s[1])}">${esc(s[0])}</span>`}
const EVKIND={crisis:"Crisis",shock:"Shock",bubble:"Bubble",policy:"Policy turn",pandemic:"Pandemic"};
function evS(id){S.ev=S.ev&&typeof S.ev==="object"?S.ev:{};return S.ev[id]=S.ev[id]||{pred:null,whatif:null,tl:0,ret:{},note:""}}
function evYear(d){return +String(d).slice(0,4)+((+String(d).slice(5,7)||1)-1)/12}
function evWait(what,key){return `<div class="dl-state mt4" role="status" aria-live="polite">${EVX.err[key]?`<h2>${esc(what)} could not be loaded</h2><p class="sm mt2">It is kept in a separate file that did not arrive. Check the connection and try again.</p><button class="btn sm mt3" onclick="EVX.err['${key}']=false;render()">Try again</button>`:`<h2>Loading ${esc(what)}</h2><p class="sm mt2">The story loads once and is then kept for offline use.</p>`}</div>`}
const EVF={kind:"",region:""};

/* the archive: one axis from 1929 to now, every event on it */
function evAxis(list,sel){const y0=1925,y1=2026,W=1000,sx=y=>20+(y-y0)/(y1-y0)*(W-40),lw=t=>String(t).length*5.9+8;
 /* pack into rows by what each item occupies on screen: the bar or its label, whichever reaches further */
 const rows=[];list.slice().sort((a,b)=>evYear(a.start)-evYear(b.start)).forEach(e=>{const a=sx(evYear(e.start)),b=Math.max(a+6,sx(Math.max(evYear(e.start)+0.6,evYear(e.end)))),end=Math.max(b,a+lw(e.short||e.title))+4;let r=0;while(rows[r]!=null&&rows[r]>a)r++;rows[r]=end;e._r=r});
 const H=Math.max(110,16+rows.length*26+40),ticks=[1930,1940,1950,1960,1970,1980,1990,2000,2010,2020];
 return `<div class="ev-axis scrollx" tabindex="0" role="region" aria-label="Every event on one time axis"><svg viewBox="0 0 ${W} ${H}" role="group" aria-label="Economic events from ${y0} to ${y1}">
  ${ticks.map(t=>`<line x1="${sx(t)}" x2="${sx(t)}" y1="10" y2="${H-22}" class="dl-grid"/><text x="${sx(t)}" y="${H-6}" class="dl-tick" text-anchor="middle">${t}</text>`).join("")}
  ${list.map(e=>{const a=evYear(e.start),b=Math.max(a+0.6,evYear(e.end)),y=18+e._r*26;return `<a href="#/events/archive/${e.id}" onclick="event.preventDefault();nav('events',0,'${e.id}')" aria-label="${esc(e.title)}, ${esc(e.years)}">
   <rect x="${sx(a)}" y="${y}" width="${Math.max(6,sx(b)-sx(a))}" height="12" rx="2" class="ev-ax-b ${sel===e.id?"on":""} k-${esc(e.kind)}"/><text x="${sx(a)}" y="${y-3}" class="ev-ax-t">${esc(e.short||e.title)}</text></a>`}).join("")}</svg></div>`}
function evArchive(){const L=EVENTSIDX.events.filter(e=>(!EVF.kind||e.kind===EVF.kind)&&(!EVF.region||e.region===EVF.region));
 const kinds=[...new Set(EVENTSIDX.events.map(e=>e.kind))],regions=[...new Set(EVENTSIDX.events.map(e=>e.region))];
 return H.pageHead("History","Economic events",`Twelve episodes that changed how economies work and how economists think, each told as a story you can follow: what the world looked like before, what broke, why, who responded, and what the models explain and miss.`)
 +`<section class="sec"><div class="wrap">${evAxis(L)}
  <div class="dl-filters mt4"><label>Kind<select onchange="EVF.kind=this.value;render()"><option value="">All</option>${kinds.map(k=>`<option value="${esc(k)}" ${EVF.kind===k?"selected":""}>${esc(EVKIND[k]||k)}</option>`).join("")}</select></label>
   <label>Where<select onchange="EVF.region=this.value;render()"><option value="">Everywhere</option>${regions.map(r=>`<option ${EVF.region===r?"selected":""}>${esc(r)}</option>`).join("")}</select></label></div>
  <div class="ev-grid mt4">${L.map(e=>`<button class="ev-card k-${esc(e.kind)}" onclick="nav('events',0,'${e.id}')"><span class="ev-yr">${esc(e.years)}</span><span class="ev-k">${esc(EVKIND[e.kind]||e.kind)} · ${esc(e.region)}</span>
   <span class="ev-t">${esc(e.title)}</span><span class="ev-sf">${esc(e.standfirst)}</span><span class="ev-q">${esc(e.question)}</span></button>`).join("")}</div>
  <p class="xs mt4">${srcTag("platform")} Original histories written for this platform and reviewed for accuracy. Every statement about the world is labelled as fact, interpretation, inference or controversy; every chart names its source.</p></div></section>`}

/* the event page */
const EVCH=[["before","Before"],["trigger","Trigger"],["timeline","Timeline"],["mechanism","Mechanism"],["data","Data"],["policy","Response"],["effects","Effects"],["world","The world"],["debate","Readings"],["models","Models"],["whatif","What if"],["compare","Compare"],["connect","Connections"],["practise","Practise"]];
function evChart(c,H2,i,id){
 if(!H2)return "";let series=[],unit="",src=null,title=c.title;
 if(c.series){const s=H2.series.find(x=>x.id===c.series);if(!s)return "";const inR=k=>String(k)>=String(c.from)&&String(k).slice(0,String(c.to).length)<=String(c.to);
  series=[{name:s.name,color:DLPAL[0],pts:s.data.filter(p=>inR(p[0]))}];unit=s.unit;src=s}
 else if(c.panel){const p=H2.panel[c.panel];if(!p)return "";unit=p.unit;src=p;
  series=(c.entities||[]).filter(e=>p.data[e]).map((e,j)=>({name:H2.meta.entities[e]||e,short:(H2.meta.entities[e]||e).split(/[ ,]/)[0],color:DLPAL[j%DLPAL.length],pts:p.data[e].filter(q=>q[0]>=+c.from&&q[0]<=+c.to)}))}
 series=series.filter(s=>s.pts.length);if(!series.length)return "";
 const monthly=typeof series[0].pts[0][0]==="string";
 return `<figure class="ev-chart"><figcaption><span class="eb">Figure ${i+1}</span> <strong>${esc(title)}</strong> <span class="xs">${esc(unit)}</span></figcaption>
  ${dlChart(id,series,{unit,title,monthly,labels:series.length>1,zero:c.panel==="infl"||/growth|inflation/i.test(unit+title),marks:(c.marks||[]).map(m=>({at:monthly?String(m.at).length===4?m.at+"-01":m.at:+String(m.at).slice(0,4),label:m.label}))})}
  ${series.length>1?dlLegend(series):""}<p class="sm mt2"><strong>What to look for:</strong> ${esc(c.look)}</p>${dlTable(series,unit)}
  <p class="xs dl-src mt1"><strong>Source:</strong> ${esc(src.source)}. <a href="${esc(src.url)}" target="_blank" rel="noopener">Original</a> · <a href="${esc(src.pkg)}" target="_blank" rel="noopener">package</a> (${esc(src.licence)}). Retrieved ${esc(H2.meta.retrieved)}.${src.note?" "+esc(src.note):""}</p></figure>`}
function evPage(id){const ix=EVENTSIDX.events.find(e=>e.id===id);if(!ix)return evArchive();const D=evData();
 if(!D)return H.pageHead("History",ix.title,ix.standfirst)+`<section class="sec"><div class="wrap">${evWait("this event","ev")}</div></section>`;
 const e=D.events.find(x=>x.id===id),st=evS(id),H2=evHist(),sec=(k,h,b,cls)=>`<section class="ev-ch ${cls||""}" id="ev-${k}" aria-labelledby="ev-${k}-h"><div class="ev-chn">${String(EVCH.findIndex(c=>c[0]===k)+1).padStart(2,"0")}</div><div class="ev-chb"><h2 class="ev-h2" id="ev-${k}-h">${h}</h2>${b}</div></section>`;
 const tl=e.timeline,ti=Math.min(st.tl||0,tl.length-1),cur=tl[ti];
 const others=EVENTSIDX.events.filter(x=>x.id!==id);
 return `<section class="ev-hero k-${esc(e.kind)}"><div class="wrap"><div class="ev-hk">${esc(EVKIND[e.kind]||e.kind)} · ${esc(e.region)} · ${esc(e.years)}</div>
  <h1 class="ev-h1">${esc(e.title)}</h1><p class="ev-sf2">${esc(e.standfirst)}</p><p class="ev-bq"><span class="eb">The question</span> ${esc(e.question)}</p>
  ${evAxis(EVENTSIDX.events,id)}</div></section>
 <nav class="ev-rail" aria-label="Chapters of this event"><div class="wrap"><ol>${EVCH.map(([k,n])=>`<li><a class="ev-ch" href="#ev-${k}" onclick="event.preventDefault();document.getElementById('ev-${k}').scrollIntoView({block:'start'})" data-ch="${k}">${n}</a></li>`).join("")}</ol></div></nav>
 <div class="wrap ev-body">
 ${sec("before","The world before",`<p class="ev-p">${esc(e.before.p)}</p><ul class="ev-facts">${e.before.facts.map(f=>`<li>${evBadge(f.status)} ${esc(f.t)}</li>`).join("")}</ul>`)}
 ${sec("trigger","The trigger",`<p class="ev-p">${esc(e.trigger.p)} ${evBadge(e.trigger.status)}</p>`)}
 ${sec("timeline","Timeline",`<ol class="ev-tl" role="tablist" aria-label="Timeline of ${esc(e.title)}">${tl.map((t,i)=>`<li role="presentation"><button role="tab" aria-selected="${i===ti}" class="${i===ti?"on":i<ti?"past":""}" onclick="evS('${id}').tl=${i};save();lsSwap('ev-tlwrap',evTl('${id}'))"><span class="ev-tld">${esc(t.d)}</span><span class="ev-tlt">${esc(t.t)}</span></button></li>`).join("")}</ol>
  <div id="ev-tlwrap">${evTlBody(e,ti)}</div>
  <h3 class="ev-h3">Who acted</h3><dl class="ev-actors">${e.actors.map(a=>`<div><dt>${esc(a.who)}</dt><dd>${esc(a.role)}</dd></div>`).join("")}</dl>`)}
 ${sec("mechanism","The mechanism",st.pred===null?`<div class="why-pred"><div class="eb">Predict first</div><p class="mt1"><strong>${esc(e.predict.q)}</strong></p><div class="ev-opts mt2">${e.predict.options.map((o,i)=>`<button class="btn gh sm" onclick="evS('${id}').pred=${i};save();render();setTimeout(()=>document.getElementById('ev-mechanism').scrollIntoView({block:'start'}),0)">${esc(o)}</button>`).join("")}</div><p class="xs mt2">Commit to an answer; the mechanism opens after it. <button class="lnk" onclick="evS('${id}').pred=-1;save();render()">Show it without predicting</button></p></div>`
  :`${st.pred>=0?`<div class="ev-verdict ${st.pred===e.predict.answer?"ok":"no"}"><strong>${st.pred===e.predict.answer?"Your prediction holds.":"Not quite."}</strong> ${esc(e.predict.explain)}</div>`:""}
   <ol class="ev-chain">${e.mechanism.map(m=>`<li>${esc(m)}</li>`).join("")}</ol><h3 class="ev-h3">What changed</h3><p class="ev-p">${esc(e.changed)}</p>
   <div class="ev-dgs">${e.diagrams.map(d=>{try{const g=DG[d.dg]();return `<figure class="ls-fig">${frame(g.b,g.x,g.y,{alt:g.alt})}<figcaption class="xs">${esc(g.t)} · <button class="lnk" onclick="nav('lab',3,'${d.dg}')">build it in the atlas</button></figcaption><p class="sm mt1">${esc(d.how)}</p></figure>`}catch(x){return ""}}).join("")}</div>`)}
 ${sec("data","The data",H2?e.charts.map((c,i)=>evChart(c,H2,i,`ev-c-${id}-${i}`)).join("")||`<p class="sm">No series in the collection covers this period.</p>`:evWait("the data","hist"))}
 ${sec("policy","The response",`<ol class="ev-pol">${e.policy.map(p=>`<li><span class="ev-pw">${esc(p.when)}</span><div><strong>${esc(p.who)}</strong> ${evBadge(p.status)}<p class="sm mt1">${esc(p.what)}</p></div></li>`).join("")}</ol>
  <h3 class="ev-h3">Stakeholders</h3><dl class="ev-actors">${e.stakeholders.map(a=>`<div><dt>${esc(a.who)}</dt><dd>${esc(a.effect)}</dd></div>`).join("")}</dl>`)}
 ${sec("effects","Short run, long run",`<div class="ev-split"><div><div class="eb">In the short run</div><p class="mt1">${esc(e.short)}</p></div><div><div class="eb">In the long run</div><p class="mt1">${esc(e.long)}</p></div></div>
  <div class="ev-split mt4"><div><div class="eb">Who gained</div><ul class="ev-facts">${e.winners.map(w=>`<li>${evBadge(w.status)} ${esc(w.t)}</li>`).join("")}</ul></div><div><div class="eb">Who lost</div><ul class="ev-facts">${e.losers.map(w=>`<li>${evBadge(w.status)} ${esc(w.t)}</li>`).join("")}</ul></div></div>
  <h3 class="ev-h3">Unintended consequences</h3><ul class="ev-facts">${e.unintended.map(w=>`<li>${evBadge(w.status)} ${esc(w.t)}</li>`).join("")}</ul>`)}
 ${sec("world","How it travelled",`<p class="ev-p">${esc(e.transmission)}</p>`)}
 ${sec("debate","Competing readings",`<div class="ev-debate">${e.interpretations.map(x=>`<article><div class="eb">${esc(x.view)}</div>${evBadge(x.status)}<p class="sm mt2">${esc(x.p)}</p></article>`).join("")}</div>
  <h3 class="ev-h3">What could have been done differently</h3><ul class="ev-facts">${e.differently.map(w=>`<li>${evBadge(w.status)} ${esc(w.t)}</li>`).join("")}</ul>`)}
 ${sec("models","What the models explain, and what they miss",`<div class="ev-split"><div><div class="eb">Explains</div><ul class="ls-list mt1">${e.explain.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div><div><div class="eb">Misses</div><ul class="ls-list mt1">${e.miss.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div></div>`)}
 ${sec("whatif","What if?",`<p><strong>${esc(e.whatif.q)}</strong></p><div class="ev-opts mt2">${e.whatif.options.map((o,i)=>`<button class="btn sm ${st.whatif===i?(i===e.whatif.best?"":"gh"):"gh"}" aria-pressed="${st.whatif===i}" onclick="evS('${id}').whatif=${i};save();render();setTimeout(()=>document.getElementById('ev-whatif').scrollIntoView({block:'start'}),0)">${esc(o)}</button>`).join("")}</div>
  ${st.whatif!==null?`<div class="ev-verdict ${st.whatif===e.whatif.best?"ok":"mid"} mt3"><strong>${st.whatif===e.whatif.best?"The most defensible answer.":"Defensible, but weaker."}</strong> ${esc(e.whatif.explain)}</div>`:`<p class="xs mt2">Choose before the discussion opens. A counterfactual cannot be proved; the point is to reason from the mechanism.</p>`}`)}
 ${sec("compare","Compare",`<div class="ev-cmp">${e.compare.map(c=>{const o=EVENTSIDX.events.find(x=>x.id===c.id);return o?`<article><h3><button class="lnk" onclick="nav('events',0,'${o.id}')">${esc(o.title)}</button> <span class="xs">${esc(o.years)}</span></h3>
   <details class="mt2"><summary>What is similar?</summary><p class="sm mt1">${esc(c.similar)}</p></details><details><summary>What is different?</summary><p class="sm mt1">${esc(c.different)}</p></details><details><summary>Which mechanism dominates?</summary><p class="sm mt1">${esc(c.dominant)}</p></details></article>`:""}).join("")}</div>
  <p class="xs mt2">Try to answer each question before you open it. <button class="lnk" onclick="EVC.a='${id}';EVC.b='${(e.compare[0]||{}).id||""}';nav('events',1)">Put two events side by side →</button></p>`)}
 ${sec("connect","Connections",`<div class="ev-conn">
   <div><div class="eb">IB DP Economics</div><div class="id-chips mt1">${e.ib.subs.map(idSubBtn).join("")}${e.ib.kc.map(k=>`<span class="kcchip">${esc(k)}</span>`).join("")}</div><p class="sm mt1">${esc(e.ib.note)}</p></div>
   <div><div class="eb">Cambridge AS &amp; A Level</div><div class="id-chips mt1">${e.cambridge.topics.map(t=>`<span class="kcchip">${esc(t)}</span>`).join("")}</div><p class="sm mt1">${esc(e.cambridge.note)}</p><p class="xs mt1">Economic topics only: the platform's Cambridge syllabus map awaits checking against the official syllabus.</p></div>
   <div><div class="eb">University</div><div class="id-chips mt1">${e.university.fields.map(t=>`<span class="kcchip">${esc(t)}</span>`).join("")}</div><p class="sm mt1">${esc(e.university.note)}</p></div>
   <div><div class="eb">Civil services and the Indian economy</div><div class="id-chips mt1">${e.civil.themes.map(t=>`<span class="kcchip">${esc(t)}</span>`).join("")}</div><p class="sm mt1">${esc(e.civil.note)}</p></div></div>
  <div class="ev-conn mt4"><div><div class="eb">Economists</div><div class="id-chips mt1">${e.economists.map(x=>{const o=IDEASIDX.economists.find(y=>y.id===x);return o?`<button class="kcchip" onclick="nav('ideas',0,'${o.id}')">${esc(o.name)}</button>`:""}).join("")}</div></div>
   <div><div class="eb">Why did this happen?</div><div class="id-chips mt1">${e.causal.map(x=>{const o=IDEASIDX.causal.find(y=>y.id===x);return o?`<button class="kcchip" onclick="nav('think',WHYTAB(),'${o.id}')">${esc(o.q)}</button>`:""}).join("")}</div></div>
   <div><div class="eb">Concepts</div><div class="id-chips mt1">${e.concepts.map(idTermBtn).join("")}</div></div>
   <div><div class="eb">Policies and cases</div><div class="id-chips mt1">${e.policies.map(p=>`<span class="kcchip">${esc(p)}</span>`).join("")}${e.cases.map(cid=>{const x=(typeof RW_CASES!=="undefined"?RW_CASES:[]).find(y=>y.id===cid);return x?`<button class="kcchip" onclick="rwOpen('${x.id}')">${esc(x.t)}</button>`:""}).join("")}</div></div></div>`)}
 ${sec("practise","Practise and reflect",`<ol class="ev-qs">${e.questions.map(q=>`<li><span class="ev-qk">${esc(q.kind)}</span> ${esc(q.q)}</li>`).join("")}</ol>
  <h3 class="ev-h3">Retrieve</h3><ol class="ev-ret">${e.retrieval.map((r,i)=>`<li><p>${esc(r.q)}</p>${st.ret[i]?`<p class="ev-ans sm">${esc(r.a)}</p>`:`<button class="btn xs gh" onclick="evS('${id}').ret[${i}]=true;save();render();setTimeout(()=>document.getElementById('ev-practise').scrollIntoView({block:'start'}),0)">Show the answer</button>`}</li>`).join("")}</ol>
  <h3 class="ev-h3">Reflect</h3><label class="sm" for="ev-note">${esc(e.reflection)}</label><textarea id="ev-note" class="inp mt2" rows="3" onchange="evS('${id}').note=this.value;save()">${esc(st.note||"")}</textarea><p class="xs mt1">Kept on this device only.</p>
  <h3 class="ev-h3">Further reading</h3><ul class="ls-list">${e.reading.map(r=>`<li><em>${esc(r.t)}</em>. ${esc(r.note)}</li>`).join("")}</ul>
  ${e.numbers.length?`<details class="mt3"><summary>How the numbers were checked</summary><p class="xs mt1">Figures quoted from the charts come from the sourced series shown with them. These other figures are widely documented and were checked in review:</p><ul class="ls-list xs">${e.numbers.map(n=>`<li><strong>${esc(n.value)}</strong>: ${esc(n.claim)} (${esc(n.basis)})</li>`).join("")}</ul></details>`:""}`)}
 <nav class="ls-nav mt5" aria-label="Other events">${(()=>{const i=EVENTSIDX.events.findIndex(x=>x.id===id),p=EVENTSIDX.events[i-1],n=EVENTSIDX.events[i+1];return `${p?`<button class="btn gh sm" onclick="nav('events',0,'${p.id}')">← ${esc(p.title)}</button>`:"<span></span>"}<button class="btn gh sm" onclick="nav('events',0)">All events</button>${n?`<button class="btn gh sm" onclick="nav('events',0,'${n.id}')">${esc(n.title)} →</button>`:"<span></span>"}`})()}</nav>
 <p class="xs mt3">${srcTag("platform")} Original history, reviewed for accuracy. Version ${esc(D.version||"")}.</p></div>`}
function evTlBody(e,i){const t=e.timeline[i];return `<div class="ev-tlbody"><div class="ev-tlnav"><button class="btn xs gh" ${i===0?"disabled":""} onclick="evS('${e.id}').tl=${i-1};save();lsSwap('ev-tlwrap',evTl('${e.id}'))" aria-label="Earlier">←</button>
  <span class="ev-here"><span class="eb">You are here</span> ${esc(t.d)}</span><button class="btn xs gh" ${i===e.timeline.length-1?"disabled":""} onclick="evS('${e.id}').tl=${i+1};save();lsSwap('ev-tlwrap',evTl('${e.id}'))" aria-label="Later">→</button></div>
  <h3 class="mt2">${esc(t.t)} ${evBadge(t.status)}</h3><p class="mt1">${esc(t.detail)}</p><div class="ev-prog" aria-hidden="true"><i style="width:${((i+1)/e.timeline.length*100).toFixed(1)}%"></i></div></div>`}
function evTl(id){const D=window.__EVENTS__,e=D&&D.events.find(x=>x.id===id);if(!e)return "";
 document.querySelectorAll('#ev-timeline .ev-tl button').forEach((b,i)=>{const on=i===evS(id).tl;b.classList.toggle("on",on);b.classList.toggle("past",i<evS(id).tl);b.setAttribute("aria-selected",String(on))});
 return evTlBody(e,evS(id).tl)}

/* compare two events side by side */
const EVC={a:"india-1991",b:"asia-1997"};
function evCompare(){const D=evData();const pick=(k)=>`<label>${k==="a"?"First event":"Second event"}<select onchange="EVC.${k}=this.value;render()">${EVENTSIDX.events.map(e=>`<option value="${e.id}" ${EVC[k]===e.id?"selected":""}>${esc(e.title)} (${esc(e.years)})</option>`).join("")}</select></label>`;
 const head=H.pageHead("History","Compare two events",`Put two episodes side by side, dimension by dimension. Decide what is similar, what is different and which mechanism dominates before reading the comparison.`)+`<section class="sec"><div class="wrap"><div class="dl-filters">${pick("a")}${pick("b")}</div>`;
 if(!D)return head+evWait("the events","ev")+`</div></section>`;
 const A=D.events.find(e=>e.id===EVC.a)||D.events[0],B=D.events.find(e=>e.id===EVC.b)||D.events[1];
 const row=(h,f)=>`<tr><th scope="row">${h}</th><td>${f(A)}</td><td>${f(B)}</td></tr>`;
 const pair=A.compare.find(c=>c.id===B.id)||B.compare.find(c=>c.id===A.id);
 return head+`<div class="scrollx mt4" tabindex="0" role="region" aria-label="The two events compared"><table class="ptbl ev-ctab"><thead><tr><th scope="col">Dimension</th><th scope="col">${esc(A.title)}</th><th scope="col">${esc(B.title)}</th></tr></thead><tbody>
  ${row("When and where",e=>esc(e.years+" · "+e.region))}${row("The question",e=>esc(e.question))}${row("Trigger",e=>esc(e.trigger.p))}
  ${row("Mechanism",e=>`<ol class="ev-chain sm">${e.mechanism.map(m=>`<li>${esc(m)}</li>`).join("")}</ol>`)}${row("Response",e=>`<ul class="ls-list sm">${e.policy.map(p=>`<li>${esc(p.when)}: ${esc(p.who)}</li>`).join("")}</ul>`)}
  ${row("Short run",e=>esc(e.short))}${row("Long run",e=>esc(e.long))}${row("How it travelled",e=>esc(e.transmission))}</tbody></table></div>
  ${pair?`<div class="ev-cmp mt4"><article><details><summary>What is similar?</summary><p class="sm mt1">${esc(pair.similar)}</p></details><details><summary>What is different?</summary><p class="sm mt1">${esc(pair.different)}</p></details><details><summary>Which mechanism dominates?</summary><p class="sm mt1">${esc(pair.dominant)}</p></details></article></div>`:`<p class="sm mt4">No written comparison for this pair: use the table, then ask which mechanism dominates in each.</p>`}
 </div></section>`}

/* economics through time: events and economists on one axis */
function evHistory(){const y0=1720,y1=2026,W=1000,sx=y=>196+(y-y0)/(y1-y0)*(W-212);const E=IDEASIDX.economists,V=EVENTSIDX.events;const HH=(E.length+3)*20+60;
 return H.pageHead("History","Economics through time",`Ideas and events on one axis: who was thinking what, and what the world was doing at the time. Select any name or event to open it.`)
 +`<section class="sec"><div class="wrap"><div class="scrollx" tabindex="0" role="region" aria-label="Economists and events on one timeline"><svg class="id-tl ev-hist" viewBox="0 0 ${W} ${HH}" role="group" aria-label="Lifespans of sixteen economists and twelve economic events, 1720 to 2026">
  ${[1750,1800,1850,1900,1950,2000].map(t=>`<line x1="${sx(t)}" x2="${sx(t)}" y1="6" y2="${HH-24}" class="dl-grid"/><text x="${sx(t)}" y="${HH-8}" class="dl-tick" text-anchor="middle">${t}</text>`).join("")}
  <text x="188" y="18" text-anchor="end" class="eb-svg">EVENTS</text>
  ${V.map(e=>{const a=evYear(e.start),b=Math.max(a+0.8,evYear(e.end));return `<a href="#/events/archive/${e.id}" onclick="event.preventDefault();nav('events',0,'${e.id}')"><rect x="${sx(a)}" y="10" width="${Math.max(4,sx(b)-sx(a))}" height="18" class="ev-ax-b k-${esc(e.kind)}"><title>${esc(e.title)}, ${esc(e.years)}</title></rect></a>`}).join("")}
  ${E.map((e,i)=>{const a=e.years[0],b=e.years[1]||2026,y=50+i*20;return `<a href="#/ideas/economists/${e.id}" onclick="event.preventDefault();nav('ideas',0,'${e.id}')"><text x="188" y="${y+10}" text-anchor="end" class="id-tl-n">${esc(e.name)}</text><rect x="${sx(a)}" y="${y+1}" width="${Math.max(4,sx(b)-sx(a))}" height="11" rx="2" class="${e.years[1]?"id-tl-b":"id-tl-l"}"/></a>`}).join("")}</svg></div>
  <p class="xs mt2">The top band is the events archive; the bars below are lifespans (open-ended for living economists).</p>
  <div class="ev-grid mt4">${V.map(e=>`<button class="ev-card k-${esc(e.kind)}" onclick="nav('events',0,'${e.id}')"><span class="ev-yr">${esc(e.years)}</span><span class="ev-t">${esc(e.title)}</span><span class="ev-q">${esc(e.question)}</span></button>`).join("")}</div></div></section>`}

SECTIONS.push({v:"events",n:"Economic events",hide:1,tabs:["Archive","Compare events","Economics through time"]});
VIEWS.events=()=>TAB===1?evCompare():TAB===2?evHistory():ARG?evPage(ARG):evArchive();
