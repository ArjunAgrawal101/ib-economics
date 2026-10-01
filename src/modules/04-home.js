/* ═══════════════════════════════════════════════════════════════════════════
   RENAISSANCE · 4 · the home page as an editorial sequence
   Nothing on the home page is withdrawn. The bands the platform already had
   are regrouped into an order with rhythm (a gateway, a daily front page, a
   lead story, a network, then the reader's own desk), and a few new bands are
   added where the page had no visual gateway at all. Every number shown is
   counted from the platform's own data when the page is drawn.
   ═══════════════════════════════════════════════════════════════════════════ */
function rnCount(){const n={};
 try{n.cases=RW_CASES.length;n.economies=new Set(RW_CASES.map(c=>c.c).filter(Boolean)).size}catch(e){}
 try{n.maps=MMKEYS().length;n.nodes=MMKEYS().reduce((a,k)=>a+((MIND_MAPS[k].nodes||[]).length),0)}catch(e){}
 try{n.diagrams=DGKEYS.length}catch(e){}try{n.calcs=CALC.length}catch(e){}
 try{n.dna=EXAM_DNA.length}catch(e){}try{n.terms=GLOSS.length}catch(e){}
 try{n.subtopics=SUBTOPICS.length}catch(e){}try{n.questions=QB.reduce((a,g)=>a+(g.a||[]).length,0)}catch(e){}
 try{n.big=EEQ.length}catch(e){}try{n.index=buildIndex().length}catch(e){}
 return n}
const fmtN=v=>typeof v==="number"?v.toLocaleString("en-GB"):"";
/* ── the opener ─────────────────────────────────────────────────────────── */
const RN_STEPS=[["Data","What do we observe?"],["Theory","Which model explains it?"],["Evidence","Does the evidence agree?"],["Decision","What should be done, and for whom?"]];
function rnHomeHero(old){
 const kept=old?[...old.querySelectorAll(".in > *")].filter(e=>!e.matches(".eb,.kicker,h1,.lede")).map(e=>e.outerHTML).join(""):"";
 const eb=old&&old.querySelector(".eb,.kicker")?old.querySelector(".eb,.kicker").textContent:"Arjun Agrawal · IB DP Economics";
 const method=old&&old.querySelector(".lede")?old.querySelector(".lede").innerHTML:"";
 return `<section class="hero rn-home"><div class="wrap full in rn-hgrid">
  <div class="rn-hcopy"><div class="eb">${esc(eb)}</div>
   <h1 class="mt2">Think like an economist.</h1>
   <p class="lede mt3">Understand the forces behind prices, markets, policy and the world around you.</p>
   ${method?`<p class="rn-method mt2">${method}</p>`:""}
   <div class="rn-kept">${kept}</div></div>
  <figure class="rn-hfig" aria-hidden="true">${motifSVG("sd")}
   <ol class="rn-steps">${RN_STEPS.map(([a,b],i)=>`<li style="--i:${i}"><span class="rn-sn">0${i+1}</span><b>${a}</b><span>${b}</span></li>`).join("")}</ol>
  </figure></div></section>`}
/* ── Explore Economics: the gateway, in two tiers ─────────────────────────
   Four destinations carry a full motif; the other six sit in a compact index
   with a thumbnail of their own diagram, so hierarchy replaces a card wall. */
function rnAtlas(){const n=rnCount();
 const A=[["world","Real World","Policies, shocks and markets across the world, each read through a model.","trade",`${fmtN(n.cases)} cases · ${fmtN(n.economies)} economies`],
  ["lab","The lab","Move a parameter, predict the result, and watch the model answer.","sd",`${fmtN(n.diagrams)} diagrams · ${fmtN(n.calcs)} calculations`],
  ["mind","Mindmaps","How an economist moves through a topic, node by node.","network",`${fmtN(n.maps)} maps · ${fmtN(n.nodes)} nodes`],
  ["everywhere","Economics, Everywhere","Questions from ordinary life, answered with economics.","shift",`${fmtN(n.big)} big questions`]];
 const B=[["course","The course","Four units, nine key concepts, one syllabus map.","flow",`${fmtN(n.subtopics)} subtopics`],
  ["examiner","Exam room","Papers, markbands and the habits that earn marks.","markbands",`${fmtN(n.dna)} Exam DNA questions`],
  ["ees","EE Studio","Research like an economist, from question to reflection.","research","19 areas"],
  ["arjun","Video studio","Economics, politics and international relations, on film.","cycle","From the channel"],
  ["educator","Educators","A studio for teachers, supervisors and coordinators.","ppc","5 roles · 10 modules"],
  ["tok","TOK × Economics","What economic knowledge is, and how it is made.","model","Knowledge questions"]];
 const has=v=>SECTIONS.some(s=>s.v===v);
 return `<section class="sec rn-band rn-atlas-band"><div class="wrap full">
  <div class="shead fx"><span class="n">01</span><h2>Explore Economics</h2><span class="aside">What can I do here?</span></div>
  <div class="rn-atlas">${A.filter(d=>has(d[0])).map((d,i)=>`<button class="atl${i===0?" atl-lead":""}" onclick="nav('${d[0]}')">
   <span class="atl-fig" data-motif="${d[3]}"></span>
   <span class="atl-tx"><span class="atl-n">${String(i+1).padStart(2,"0")}</span><span class="atl-t">${esc(d[1])}</span>
   <span class="atl-l">${esc(d[2])}</span><span class="atl-m">${esc(d[4])}</span></span></button>`).join("")}</div>
  <div class="atl-index">${B.filter(d=>has(d[0])).map((d,i)=>`<button class="atx" onclick="nav('${d[0]}')">
   <span class="atx-fig" data-motif="${d[3]}"></span>
   <span class="atx-tx"><span class="atx-t">${esc(d[1])}</span><span class="atx-l">${esc(d[2])}</span><span class="atl-m">${esc(d[4])}</span></span></button>`).join("")}</div>
  <div class="row mt4 rn-disc"><button class="btn" onclick="randomOpen('')">Surprise me: Random Economics</button>
   <button class="btn gh" onclick="cpOpen()">Find a topic</button>
   <button class="btn gh" onclick="openToolkit()">The economist's toolkit</button></div>
 </div></section>`}
/* ── Today in Economics: a daily front page, chosen by the date ─────────── */
function rnToday(){const t=dailyItems();const d=new Date();
 const date=d.toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
 const card=(x,lbl,big)=>x?`<article class="td-card${big?" td-big":""}"><div class="td-k">${esc(lbl)}</div><h3 class="td-t">${esc(x.t)}</h3>
   ${x.meta?`<div class="td-meta">${esc(x.meta)}</div>`:""}${x.d?`<p class="sm mt2">${esc(String(x.d).slice(0,big?260:170))}${String(x.d).length>(big?260:170)?"…":""}</p>`:""}
   <button class="lnk mt3" onclick="${esA(x.go)}">Read it →</button></article>`:"";
 return `<section class="sec rn-band rn-today bg-paper"><div class="wrap full">
  <div class="shead fx"><span class="n">02</span><h2>Today in Economics</h2><span class="aside">${esc(date)}</span></div>
  <div class="td-grid">${card(t.idea,"Economic idea of the day",1)}${card(t.case,"Case of the day")}${card(t.q,"Question to think about")}${card(t.term,"Word of the day")}</div>
  <p class="xs mt3">Chosen from the platform by today's date, so everyone sees the same page today and a new one tomorrow. Nothing is recorded.</p>
 </div></section>`}
/* ── Real World: a lead story, set like a magazine ──────────────────────── */
function rnLead(){
 let C=[];try{C=RW_CASES}catch(e){}if(!C.length)return "";
 const wk=Math.floor(rnDay()/7);const deepIds=(typeof RW_DEEP!=="undefined")?Object.keys(RW_DEEP):[];
 const leadId=deepIds.length?deepIds[wk%deepIds.length]:C[wk%C.length].id;const L=C.find(c=>c.id===leadId)||C[0];
 const others=[1,2,3].map(i=>C[(wk*37+i*61)%C.length]).filter(c=>c.id!==L.id);
 const m=caseMotif(L);
 return `<section class="sec rn-band rn-lead"><div class="wrap full">
  <div class="shead fx"><span class="n">03</span><h2>Real World</h2><span class="aside">The lead story this week</span></div>
  <div class="ld-grid"><article class="ld-main">
   <div class="ld-k">${esc([L.c,L.y,L.pv].filter(Boolean).join(" · "))}</div>
   <h3 class="ld-t">${esc(L.t)}</h3><p class="ld-s">${esc(L.is||"")}</p>
   <div class="ld-cols">${L.tp?`<div><div class="kicker">The economics</div><p class="sm mt1">${esc(L.tp)}</p></div>`:""}
    ${L.q?`<div><div class="kicker">The question</div><p class="sm mt1">${esc(L.q)}</p></div>`:""}</div>
   <div class="row mt4"><button class="btn" onclick="nav('world',0,'${esA(L.id)}')">Read the case →</button><button class="btn gh" onclick="nav('world',1)">All ${fmtN(C.length)} cases</button></div></article>
   <figure class="rn-fig ld-fig"><span class="ld-m" data-motif="${m}"></span><figcaption>${esc(motifCap(m))}</figcaption></figure>
   <div class="ld-side">${others.map(o=>`<button class="ld-o" onclick="nav('world',0,'${esA(o.id)}')"><span class="ld-ok">${esc([o.c,o.y].filter(Boolean).join(" · "))}</span><span class="ld-ot">${esc(o.t)}</span></button>`).join("")}</div></div>
 </div></section>`}
/* ── Mindmaps: the core maps, drawn as the network they are ─────────────── */
function rnMind(){
 let K=[];try{K=MMKEYS().filter(k=>MIND_MAPS[k].cls==="core")}catch(e){}if(!K.length)return "";
 K=K.slice(0,10);const P=K.map((k,i)=>{const a=-Math.PI/2+i/K.length*2*Math.PI;return [50+37*Math.cos(a),50+41*Math.sin(a)]});
 const edges=K.map((_,i)=>[i,(i+1)%K.length]).concat(K.map((_,i)=>[i,(i+3)%K.length]));
 return `<section class="sec rn-band rn-mind bg-ink"><div class="wrap full"><div class="mn-grid">
  <div><div class="eb">Mindmaps</div><h2 class="mt2">See the whole idea, not just the chapter.</h2>
   <p class="lede mt3">Each map follows an economist through one topic: from the concept to the mechanism, the model and the judgement, with every step testable.</p>
   <div class="row mt4"><button class="btn on-ink" onclick="nav('mind')">Open the mindmaps</button><button class="btn gh on-ink" onclick="nav('mind',2)">Connect two ideas</button></div></div>
  <div class="mn-net" role="list" aria-label="Core mindmaps">
   <svg class="mn-edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${edges.map(([a,b])=>`<line x1="${P[a][0].toFixed(1)}" y1="${P[a][1].toFixed(1)}" x2="${P[b][0].toFixed(1)}" y2="${P[b][1].toFixed(1)}"/>`).join("")}</svg>
   ${K.map((k,i)=>`<span role="listitem"><button class="mn-node" style="left:${P[i][0].toFixed(1)}%;top:${P[i][1].toFixed(1)}%" onclick="nav('mind',0,'${esA(k)}')">${esc(MIND_MAPS[k].title)}</button></span>`).join("")}
   <span class="mn-core" aria-hidden="true">Economics</span></div></div>
 </div></section>`}
/* ── Economics at a glance: counted, not asserted ──────────────────────── */
function rnGlance(){const n=rnCount();
 const S=[["cases","Real World cases"],["economies","economies in the cases"],["maps","mindmaps"],["nodes","mindmap nodes"],["diagrams","diagram plates"],
  ["calcs","calculations"],["dna","Exam DNA questions"],["terms","dictionary terms"],["index","searchable items"]].filter(([k])=>typeof n[k]==="number");
 return `<section class="sec rn-band rn-glance"><div class="wrap full">
  <div class="shead fx"><span class="n">00</span><h2>Economics at a glance</h2><span class="aside">Counted from the platform as this page was drawn</span></div>
  <dl class="gl-grid">${S.map(([k,l])=>`<div class="gl"><dt>${esc(l)}</dt><dd class="gl-v" data-count="${n[k]}">${fmtN(n[k])}</dd></div>`).join("")}</dl>
 </div></section>`}
function rnDivider(t,s){return `<div class="wrap full rn-divider"><span class="rn-dv-t">${esc(t)}</span><span class="rn-dv-s">${esc(s)}</span></div>`}
/* the order the home page reads in; bands are matched by their heading */
/* the home page reads as a story in eleven chapters, one verb each: think,
   learn, see, interact, connect, practise, research, explore, watch, teach,
   and the person behind it. "#n|Title" marks a chapter opener. */
const RN_ORDER=["#01|Think","Start your journey","@atlas",
 "#02|The course","@course",
 "#03|Learn","@learn","Timeless ideas","Inflation targeting",
 "#04|See the world","@lead","Economics, right now",
 "#05|Master the models","@labs","What happens next?","@mind",
 "#06|Exam","@exam","Today's challenge",
 "#07|Research","@research",
 "#08|Explore","@today","@ideas","Economics, Everywhere",
 "#09|Watch","Latest from Arjun",
 "#10|Teach","@educator",
 "#11|About","@creator","Work through the platform",
 "@desk","One next step","Continue where you left off","What should I do next?","Six ways in","The Arjun method","@glance","@final"];
function rnHome(html){
 if(typeof document==="undefined")return html;
 const t=document.createElement("template");t.innerHTML=html;
 const kids=[...t.content.children];
 const title=el=>{const h=el.querySelector(".shead h2")||el.querySelector("h1,h2");return h?h.textContent.trim():""};
 const hero=kids.find(el=>el.matches("section.hero"));
 const rest=kids.filter(el=>el!==hero);
 const NEW={"@course":()=>typeof rnCourseBand==="function"?rnCourseBand():"","@ideas":()=>typeof rnIdeasBand==="function"?rnIdeasBand():"","@atlas":rnAtlas,"@today":rnToday,"@lead":rnLead,"@mind":rnMind,"@glance":rnGlance,
  "@exam":rnExamBand,"@learn":rnLearnBand,"@labs":rnLabsBand,"@research":rnResearchBand,"@educator":rnEducatorBand,"@creator":rnCreatorBand,"@final":rnFinalBand,
  "@desk":()=>"\u0001DESK\u0001"};
 const used=new Set();let out=rnCover(hero);
 for(const k of RN_ORDER){
  if(k[0]==="#"){const [n,t]=k.slice(1).split("|");out+=rnChapter(n,t);continue}
  if(NEW[k]){try{out+=NEW[k]()}catch(e){}continue}
  rest.forEach(el=>{if(!used.has(el)&&title(el).startsWith(k)){used.add(el);out+=el.outerHTML}})}
 /* anything this list does not name keeps its place at the end: nothing is dropped */
 rest.forEach(el=>{if(!used.has(el))out+=el.outerHTML});
 /* the reader's own desk: open once there is something on it, folded for a first visit */
 const di=out.indexOf("\u0001DESK\u0001");
 if(di>=0){const gi=out.indexOf('<section class="sec rn-band rn-glance"');const end=gi>di?gi:out.length;
  let act=false;try{act=(S.activity&&S.activity.length>0)||evidenced().length>0}catch(e){}
  const open=RN.desk===undefined?act:RN.desk;
  out=out.slice(0,di)+`<details class="rn-desk"${open?" open":""}><summary class="wrap full rn-divider" onclick="RN.desk=!this.parentNode.open"><span class="rn-dv-t">Your desk</span><span class="rn-dv-s">Progress, practice and the next step, kept on this device</span><span class="rn-dv-x" aria-hidden="true"></span></summary>`
   +out.slice(di+6,end)+`</details>`+out.slice(end)}
 const t2=document.createElement("template");t2.innerHTML=out;let n=0;
 t2.content.querySelectorAll(".shead .n").forEach(x=>{if(/^\d+$/.test(x.textContent.trim())){n++;x.textContent=String(n).padStart(2,"0")}});
 return t2.innerHTML}
(function(){const prev=VIEWS.home;RN.homePrev=prev;VIEWS.home=function(){return rnHome(prev.apply(this,arguments))}})();
/* count-up for the glance figures: the final value is in the markup from the
   start (and read by assistive technology); the animation only replays it */
function rnCountUp(el){
 if(!document.body.classList.contains("rn-anim")||(typeof QARUNNING!=="undefined"&&QARUNNING))return;
 const v=+el.dataset.count;if(!(v>0)||el._done)return;el._done=true;
 el.setAttribute("aria-label",fmtN(v));const t0=performance.now(),D=1100;
 const step=t=>{const k=Math.min(1,(t-t0)/D),e=1-Math.pow(1-k,3);el.textContent=fmtN(Math.round(v*e));if(k<1)requestAnimationFrame(step);else el.textContent=fmtN(v)};
 requestAnimationFrame(step)}
(function(){const prev=rnDecorate;rnDecorate=function(){prev.apply(this,arguments);
 try{if(RN.io)document.querySelectorAll("#view [data-count]").forEach(el=>{const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){rnCountUp(e.target);o.disconnect()}}));o.observe(el)})}catch(e){}}})();
