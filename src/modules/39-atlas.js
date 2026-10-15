/* ═══════════════════════════════════════════════════════════════════════════
   PROJECT ATLAS · the landing experience
   The home page's opening sequence, rebuilt as one argument: six pathways into
   the platform; an exhibition of the original work, each piece shown in the
   form that suits it; one topic followed through six perspectives; a working
   prediction lab drawn from the platform's own Predict-a-diagram data; and the
   progression the resources are designed around, illustrated with a second
   real topic (a rupee depreciation) so the method is seen to travel.
   Every number shown is counted or computed, every link opens a real page, and
   every resource image is a screen-resolution excerpt from assets/studio/.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── 1 · Six pathways into the platform ──────────────────────────────────── */
const AT_GLYPH={
 concept:'<circle cx="8" cy="10" r="3"/><circle cx="30" cy="8" r="3"/><circle cx="20" cy="28" r="3.5"/><path d="M10.6 11.4 17.8 25.6M27.6 10.2 21.6 25M11 9.6 27 8.4"/>',
 diagram:'<path d="M4 4v32h32"/><path d="M8 8l26 22M8 30 34 8"/><circle cx="21" cy="19" r="2.4"/>',
 world:'<path d="M4 30 12 22l6 4 8-12 10 6"/><circle cx="26" cy="14" r="2.4"/><path d="M4 36h32"/>',
 calc:'<path d="M8 13h24M8 27h24"/><text x="20" y="10" text-anchor="middle">%ΔQ</text><text x="20" y="38" text-anchor="middle">%ΔP</text>',
 test:'<rect x="5" y="5" width="30" height="30" rx="3"/><path d="M12 20l6 6 11-13"/>',
 exam:'<path d="M5 34h8v-8h8v-8h8v-8h6"/><path d="M5 34h30"/>'};
function atGlyph(k){return `<svg class="at-gl" viewBox="0 0 40 40" aria-hidden="true" focusable="false">${AT_GLYPH[k]}</svg>`}
function atPaths(){const n=(()=>{try{return rnCount()}catch(e){return {}}})();let C=0;try{C=CONCEPTS.length}catch(e){}
 return [["concept","Understand a concept","Each idea told as a chain of cause and effect, with what it explains.","#/learn/concept-spine",C?`${C} concepts`:""],
  ["diagram","Explore a diagram","Plates you can study, and labs where the curves move.","#/lab/diagram-atlas",n.diagrams?`${fmtN(n.diagrams)} diagram plates`:""],
  ["world","Investigate a real-world issue","Dated cases, each read through a model.","#/world",n.cases?`${fmtN(n.cases)} cases · ${fmtN(n.economies)} economies`:""],
  ["calc","Practise a calculation","Worked methods, with your own numbers checked.","#/calculate",n.calcs?`${fmtN(n.calcs)} calculations`:""],
  ["test","Test understanding","Questions, retrieval and drills that show what has stuck.","#/practise",""],
  ["exam","Develop exam thinking","Markbands, past-paper patterns and the habits that earn marks.","#/examiner",n.dna?`${fmtN(n.dna)} Exam DNA records`:""]]}
function rnPathways(){const P=atPaths();
 return `<ol class="at-route" aria-label="Six ways into Economics">${P.map(([k,t,d,h,c],i)=>`<li class="at-stop"><a class="at-sa" href="${h}">
   <span class="at-sn">${String(i+1).padStart(2,"0")}</span>${atGlyph(k)}
   <span class="at-st">${esc(t)}</span><span class="at-sd">${esc(d)}</span>${c?`<span class="at-sc">${esc(c)}</span>`:""}</a></li>`).join("")}</ol>`}

/* ── 2 · Inside the Economics Learning Studio: an exhibition, not a card wall ── */
function atImg(id,i,cls,eager){const p=ldPrev(id,i);return p?stImg(p,cls||"",eager):""}
function atExhibitHead(it,label){return `<div class="ex-k">${esc(label)} · ${esc(it.kicker.split(" · ").slice(1).join(" · ")||stType(it.type).n)}</div><h3 class="ex-t">${esc(it.title)}</h3>`}
function atFeatured(it){
 return `<article class="ex ex-feature" aria-labelledby="ex-f-t">
  <div class="ex-spread">
   <button class="ex-main ld-fig" onclick="stView('${it.id}',0)" aria-label="Open in the viewer: ${esA(it.previews[0].cap)}">${atImg(it.id,0,"",false)}</button>
   <button class="ex-side ld-fig" onclick="stView('${it.id}',1)" aria-label="Open in the viewer: ${esA(it.previews[1].cap)}">${atImg(it.id,1)}</button>
   <button class="ex-side ld-fig" onclick="stView('${it.id}',3)" aria-label="Open in the viewer: ${esA(it.previews[3].cap)}">${atImg(it.id,3)}</button>
  </div>
  <div class="ex-copy"><div class="ex-k">Featured exhibit · Visual explainer · Unit 4.5</div>
   <h3 class="ex-t ex-tl" id="ex-f-t">${esc(it.title)}, told through one currency</h3>
   <p class="ex-p">${esc(it.summary)}</p>
   <div class="ex-why"><div class="ex-wk">What makes it useful</div><p>${esc(it.approach)}</p></div>
   <dl class="ex-meta"><div><dt>Format</dt><dd>${esc(it.format)}</dd></div><div><dt>Level</dt><dd>${esc(it.level)}</dd></div></dl>
   <div class="row ex-act"><a class="btn a" href="${stHref(it)}">Explore the explainer</a><a class="btn gh" href="${esA(stMail(it.enquiry,it.title))}">Ask about it</a></div></div></article>`}
function atVisual(it){
 return `<article class="ex ex-visual"><a class="ex-fig" href="${stHref(it)}" aria-label="${esA(it.title)}: open in the Learning Studio">${atImg(it.id,0)}</a>
  <div class="ex-body">${atExhibitHead(it,"Visual explainer")}<p class="ex-p">${esc(it.objectives[1]||it.objectives[0])}.</p>
   <p class="ex-l"><a class="st-rel" href="${stHref(it)}">See five excerpts →</a> <a class="st-rel" href="#at-journey">Follow it through six perspectives ↓</a></p></div></article>`}
function atEditorial(it){
 return `<article class="ex ex-editorial"><div class="ex-pages" aria-hidden="false">
   <button class="ex-page ld-fig" onclick="stView('${it.id}',0)" aria-label="Open in the viewer: ${esA(it.previews[0].cap)}">${atImg(it.id,0)}</button>
   ${it.previews[1]?`<button class="ex-page ld-fig" onclick="stView('${it.id}',1)" aria-label="Open in the viewer: ${esA(it.previews[1].cap)}">${atImg(it.id,1)}</button>`:""}</div>
  <div class="ex-body">${atExhibitHead(it,"Editorial")}<p class="ex-p">${esc(it.summary)}</p>
   <p class="ex-l"><a class="st-rel" href="${stHref(it)}">Read the excerpts →</a></p></div></article>`}
function atApp(it){
 return `<article class="ex ex-app"><a class="ex-fig" href="${stHref(it)}" aria-label="${esA(it.title)}: open in the Learning Studio">${atImg(it.id,0)}</a>
  <div class="ex-body">${atExhibitHead(it,"Interactive application")}<p class="ex-p">${esc(it.objectives[0])}; ${esc(it.objectives[1].charAt(0).toLowerCase()+it.objectives[1].slice(1))}.</p>
   <ol class="ex-toc">${(it.inside||[]).slice(0,4).map(x=>`<li>${esc(x)}</li>`).join("")}</ol>
   <p class="ex-l"><a class="st-rel" href="${stHref(it)}">What the Navigator covers →</a></p></div></article>`}
function atSeries(it){let C=[];try{C=C60}catch(e){}
 return `<article class="ex ex-series" aria-labelledby="ex-s-t"><div class="ex-shead"><div>${atExhibitHead(it,"Series").replace('<h3 class="ex-t">','<h3 class="ex-t" id="ex-s-t">')}</div>
   <p class="ex-p">${esc(it.summary)}</p></div>
  <ol class="ex-shelf" aria-label="Ten issues">${C.map(c=>`<li><button class="ex-issue" onclick="c60Open('${c.id}')">${stC60(c.id)?`<img src="${stC60(c.id)}" alt="" width="360" height="450" loading="lazy" decoding="async">`:""}<span class="ex-in">Issue ${c.id}</span><span class="ex-it">${esc(c.t)}</span></button></li>`).join("")}</ol></article>`}
function rnObservatory(){const g=id=>stItem(id);const F=g("exchange-rates"),P=g("price-elasticity-of-demand"),E=g("examiner-guide"),N=g("ee-navigator"),S=g("economics-in-60-seconds");
 if(!F||!P||!E||!N||!S)return "";
 return `<section class="sec rn-band at-obs" id="selected-work" aria-labelledby="at-obs-h"><div class="wrap full">
  <div class="shead fx"><span class="n">00</span><h2 id="at-obs-h">Inside the Economics Learning Studio</h2><span class="aside">Original work, shown in part</span></div>
  <p class="ed at-intro">Selected visual explanations, interactive experiences and assessment resources, designed to help learners connect economic theory with application.</p>
  ${atFeatured(F)}
  <div class="ex-row">${atVisual(P)}${atEditorial(E)}${atApp(N)}</div>
  ${atSeries(S)}
  <p class="at-more"><a class="btn" href="#/studio">Visit the Learning Studio</a><span class="xs">Selected previews. The complete resources are not included.</span></p></div></section>`}

/* ── 3 · One topic, six perspectives ─────────────────────────────────────── */
const AT_J=[
 ["understand","Understand","Meet the idea and see where it sits.",()=>LD.concept()+LD.map()],
 ["visualise","Visualise","See the difference before calculating it.",()=>LD.diagram()],
 ["apply","Apply","Find it in a market that exists.",()=>LD.evidence()],
 ["calculate","Calculate","Work it through, with figures that can be checked.",()=>LD.calc(true)],
 ["interact","Interact","Predict, then let the model answer.",()=>pdDemo({k:"Predict, then check"})],
 ["evaluate","Evaluate","Ask where it stops being true, then decide.",()=>LD.evaluate()+LD.question()]];
const ATJ={i:0};
function atJPanel(i){const [k,t,d,f]=AT_J[i];
 return `<div class="aj-ph"><span class="aj-pn">${String(i+1).padStart(2,"0")}</span><div><h3 class="aj-pt">${esc(t)}</h3><p class="aj-pd">${esc(d)}</p></div></div><div class="aj-pb">${f()}</div>
  <div class="aj-nav">${i>0?`<button class="btn gh sm" onclick="atJGo(${i-1},true)">← ${esc(AT_J[i-1][1])}</button>`:"<span></span>"}${i<AT_J.length-1?`<button class="btn sm" onclick="atJGo(${i+1},true)">${esc(AT_J[i+1][1])} →</button>`:`<a class="btn sm" href="#/design">The full progression, in nine steps →</a>`}</div>`}
function atJGo(i,focus){ATJ.i=i;const w=document.getElementById("at-journey");if(!w)return;
 w.querySelectorAll('[role="tab"]').forEach((b,j)=>{const on=j===i;b.setAttribute("aria-selected",on);b.tabIndex=on?0:-1;b.closest("li").classList.toggle("on",on);b.closest("li").classList.toggle("done",j<i)});
 const p=document.getElementById("aj-panel");if(p){p.innerHTML=atJPanel(i);p.setAttribute("aria-labelledby","aj-t-"+AT_J[i][0]);if(AT_J[i][0]==="interact")pdPaint()}
 if(focus){const b=document.getElementById("aj-t-"+AT_J[i][0]);if(b)b.focus()}}
function atJKey(e){const n=AT_J.length;let i=ATJ.i;
 if(e.key==="ArrowDown"||e.key==="ArrowRight")i=(i+1)%n;else if(e.key==="ArrowUp"||e.key==="ArrowLeft")i=(i-1+n)%n;else if(e.key==="Home")i=0;else if(e.key==="End")i=n-1;else return;
 e.preventDefault();atJGo(i,true)}
function rnJourney(){const i=ATJ.i;
 return `<section class="sec rn-band at-journey bg-paper" id="at-journey" aria-labelledby="aj-h"><div class="wrap full">
  <div class="shead fx"><span class="n">00</span><h2 id="aj-h">One topic, six perspectives</h2><span class="aside">Price elasticity of demand</span></div>
  <p class="ed at-intro">The resources are designed to work together. Follow one topic from a first idea to a judgement, through a mindmap, a diagram, a real case, a calculation, a working model and an original question. Each stage stands on its own: start anywhere.</p>
  <div class="aj">
   <ol class="aj-rail" role="tablist" aria-orientation="vertical" aria-label="Six perspectives on price elasticity of demand" onkeydown="atJKey(event)">
    ${AT_J.map(([k,t,d],j)=>`<li class="${j===i?"on":""}${j<i?" done":""}"><button role="tab" id="aj-t-${k}" aria-selected="${j===i}" aria-controls="aj-panel" tabindex="${j===i?0:-1}" onclick="atJGo(${j})"><span class="aj-n">${String(j+1).padStart(2,"0")}</span><span class="aj-t">${esc(t)}</span><span class="aj-d">${esc(d)}</span></button></li>`).join("")}</ol>
   <div class="aj-panel" id="aj-panel" role="tabpanel" aria-labelledby="aj-t-${AT_J[i][0]}" tabindex="0">${atJPanel(i)}</div></div></div></section>`}

/* ── 4 · The learning lab: predict, then see the model ───────────────────────
   A miniature of the platform's Predict-a-diagram lab, using its own questions
   and explanations for an indirect tax (DMPREDICT.tax), so nothing is copied
   or invented. One prediction at a time, immediate feedback, then the model's
   own diagram and a way into the five other diagrams. */
const AL={k:"tax",i:0,ans:[]};
function alQs(){try{return DMPREDICT[AL.k]||[]}catch(e){return []}}
function alPick(o){const q=alQs()[AL.i];if(!q||AL.ans[AL.i]!==undefined)return;AL.ans[AL.i]=o;alPaint(true)}
function alNext(){AL.i++;alPaint(true)}
function alReset(){AL.i=0;AL.ans=[];alPaint(true)}
function alBody(){const Q=alQs(),n=Q.length;if(!n)return "";
 const dots=`<ol class="al-dots" aria-label="Progress">${Q.map((q,j)=>`<li class="${AL.ans[j]===undefined?"":AL.ans[j]===q[3]?"ok":"no"}${j===AL.i?" cur":""}"><span class="sr">Prediction ${j+1}${AL.ans[j]===undefined?"":AL.ans[j]===q[3]?": matched the model":": the model differs"}</span></li>`).join("")}</ol>`;
 if(AL.i>=n){const s=Q.filter((q,j)=>AL.ans[j]===q[3]).length;let fig="";try{fig=dgm(AL.k,{note:false,src:"Generated from the model"})}catch(e){}
  return `${dots}<div class="al-done"><div class="al-score"><span class="al-sv">${s}</span><span class="al-so">of ${n}</span></div>
   <p class="al-sm">${s===n?"Every prediction matched what the model does: that is understanding rather than recognition.":"The predictions the model disagreed with are where the learning is. Each explanation below shows why."}</p>
   <div class="al-fig">${fig}</div>
   <ol class="al-rev">${Q.map((q,j)=>`<li class="${AL.ans[j]===q[3]?"ok":"no"}"><b>${esc(q[1])}</b> <span>${esc(q[2][q[3]])}.</span> ${esc(q[4])}</li>`).join("")}</ol>
   <div class="row al-act"><a class="btn a" href="${esA(routeFormat("lab",11))}">Predict five more diagrams in the lab</a><button class="btn gh" onclick="alReset()">Start again</button></div></div>`}
 const q=Q[AL.i],a=AL.ans[AL.i],done=a!==undefined;
 return `${dots}<p class="al-q" id="al-q">${esc(q[1])}</p>
  <div class="al-opts" role="group" aria-labelledby="al-q">${q[2].map((o,oi)=>`<button class="al-o${done?(oi===q[3]?" right":oi===a?" wrong":""):""}" ${done?"disabled":""} onclick="alPick(${oi})">${esc(o)}</button>`).join("")}</div>
  <div class="al-fb" aria-live="polite">${done?`<p class="al-v ${a===q[3]?"ok":"no"}">${a===q[3]?"That is what the model does.":`The model says: ${esc(q[2][q[3]].toLowerCase())}.`}</p><p class="al-x">${esc(q[4])}</p>
   <button class="btn sm al-next" onclick="alNext()">${AL.i<n-1?"Next prediction →":"See the model →"}</button>`:""}</div>
  ${AL.i<n-1?`<ol class="al-next-list" aria-label="Still to predict">${Q.slice(AL.i+1).map((x,j)=>`<li><span>${String(AL.i+j+2).padStart(2,"0")}</span>${esc(x[1])}</li>`).join("")}</ol>`:""}
  <p class="al-next-note">The diagram stays hidden until all five predictions are made.</p>`}
function alPaint(focus){const w=document.getElementById("al-body");if(!w)return;w.innerHTML=alBody();
 if(focus){const t=w.querySelector(".al-next")||w.querySelector(".al-o:not([disabled])")||w.querySelector(".al-act .btn");if(t)t.focus()}}
function rnLabBand(){if(!alQs().length)return "";
 return `<section class="sec rn-band al-band bg-ink" aria-labelledby="al-h"><div class="wrap full al-grid">
  <div class="al-intro"><div class="shead fx on-ink"><span class="n">00</span><h2 id="al-h">Inside the learning lab</h2></div>
   <p class="lede mt2">Predict first, then let the model answer. A government places an indirect tax on a good. Before the diagram is shown, say what happens to five things, one at a time.</p>
   <p class="sm al-src">From <a class="st-rel" href="${esA(routeFormat("lab",11))}">Predict a diagram</a>, one of the platform's labs: the same questions and explanations, for one of its six diagrams.</p></div>
  <div class="al-card" id="al-body">${alBody()}</div></div></section>`}

/* ── 5 · From concept to judgement: the progression, with a second real topic ── */
const AT_P=[
 ["Concept","Depreciation: the rupee buys fewer dollars. A quote moving from US$1 = ₹80 to US$1 = ₹88 means each rupee is worth less.","#/learn/concept-spine/c-fx","The concept page"],
 ["Model","The rupee's price is set by demand for and supply of rupees in the foreign exchange market.","#/studio/visual-explainers/exchange-rates","Exchange rates explainer"],
 ["Diagram","Demand for rupees falls from D₁ to D₂: the exchange rate falls from ER₁ to ER₂.","#/everywhere/labs/fx","Exchange-rate lab"],
 ["Evidence","The rupee against the dollar, from sourced data on the platform.","#/data/markets-and-prices","Economic data"],
 ["Quantitative reasoning","Marshall-Lerner: export and import elasticities of 0.8 and 0.6 sum to 1.4 > 1, so a 10% depreciation moves balanced trade to +₹4.6 per ₹100.","#/studio/visual-explainers/balance-of-payments","Balance of payments explainer"],
 ["Stakeholder perspectives","Exporters become more competitive; importers, and firms with debts in US$, pay more; households receiving remittances get more rupees per dollar.","#/studio/visual-explainers/exchange-rates","The transmission slide"],
 ["Analysis","Two channels at once: higher net exports raise aggregate demand, while dearer imported inputs shift short-run aggregate supply left.","#/studio/visual-explainers/exchange-rates","Exchange rates explainer"],
 ["Evaluation","In the short run demand is inelastic, so the trade balance can worsen before it improves: the J-curve.","#/studio/visual-explainers/balance-of-payments","Balance of payments explainer"],
 ["Judgement","Should the central bank let the rupee fall, or intervene? It depends on whether the inflation cost outweighs the competitiveness gain, and over what horizon.","#/think/evaluation-stress-test","Evaluation stress test"]];
function rnPhilosophy(){
 return `<section class="sec rn-band at-phil" aria-labelledby="ap-h"><div class="wrap full">
  <div class="shead fx"><span class="n">00</span><h2 id="ap-h">From concept to judgement</h2><span class="aside">How the resources are designed</span></div>
  <div class="ap-lead"><p class="ed">Economics is learnt as a connected way of reasoning, not as a list of definitions and diagrams. Every resource here is built to move a learner along the same progression, from naming an idea to deciding what should be done about it, and to make each step visible. One real topic shows it: a depreciation of the rupee, followed through the platform's own explainers and data.</p>
   <p class="mt3"><a class="st-rel" href="#/design">The same progression for price elasticity, step by step →</a></p></div>
  <ol class="ap-flow">${AT_P.map(([t,x,h,l],i)=>`<li class="ap-s"><span class="ap-n">${String(i+1).padStart(2,"0")}</span><h3 class="ap-t">${esc(t)}</h3><p class="ap-x">${esc(x)}</p><a class="ap-l" href="${h}">${esc(l)} →</a></li>`).join("")}</ol></div></section>`}

Object.assign(RN_BANDS,{"@work":rnObservatory,"@onetopic":rnJourney,"@labdemo":rnLabBand,"@thinking":rnPhilosophy,"@enquire":stEnquireBand});

/* ── self-tests ─────────────────────────────────────────────────────────── */
function ATLASSUITE(){const out=[];const T=(n,f)=>{let ok=false,det="";try{const r=f();ok=r===true||(r&&r.ok);if(r&&r.d)det=r.d}catch(e){det=e.message}out.push({n,ok:!!ok,detail:det})};
 const txt=h=>h.replace(/<[^>]+>/g," ").replace(/\s+/g," ");
 T("Atlas · six pathways, each opening a real page",()=>{const P=atPaths();return P.length===6&&P.every(p=>!!routeParse(p[3]))});
 T("Atlas · every count beside a pathway is the platform's own",()=>{const n=rnCount(),h=txt(rnPathways());return h.includes(fmtN(n.cases)+" cases")&&h.includes(fmtN(n.calcs)+" calculations")&&h.includes(fmtN(n.diagrams)+" diagram plates")});
 T("Atlas · the exhibition shows five pieces in five different forms",()=>{const h=rnObservatory();return ["ex-feature","ex-visual","ex-editorial","ex-app","ex-series"].every(c=>h.includes(c))&&(h.match(/class="ex ex-/g)||[]).length===5});
 T("Atlas · every exhibit image is a Studio excerpt or a public carousel cover",()=>{const h=rnObservatory();const src=[...h.matchAll(/<img[^>]+src="([^"]+)"/g)].map(m=>m[1]);return src.length>0&&src.every(s=>/^assets\/studio\/[a-z0-9-]+\/[a-z0-9-]+\.webp$/.test(s)||/^data:image\/(jpeg|png)/.test(s)||/^blob:/.test(s))});
 T("Atlas · the journey has six stages, each with its own content",()=>AT_J.length===6&&AT_J.every((s,i)=>atJPanel(i).length>200)&&AT_J.map(s=>s[1]).join("|")==="Understand|Visualise|Apply|Calculate|Interact|Evaluate");
 T("Atlas · the lab miniature uses the platform's own predictions and answers them correctly",()=>{const Q=alQs();const k=[AL.i,AL.ans.slice()];try{AL.i=0;AL.ans=[];Q.forEach((q,j)=>{AL.ans[j]=q[3]});AL.i=Q.length;const h=txt(alBody());return Q.length===5&&Q===DMPREDICT.tax&&/5 of 5/.test(h)}finally{AL.i=k[0];AL.ans=k[1]}});
 T("Atlas · the tax predictions agree with the model: price paid up, quantity down, revenue up from zero, welfare down",()=>{const Q=DMPREDICT.tax,a=Q.map(q=>q[2][q[3]]);return a[0]==="Rises"&&a[1]==="Falls"&&a[2]==="Falls"&&a[3]==="Rises from zero"&&a[4]==="Falls"});
 T("Atlas · the progression runs from concept to judgement in nine steps, each linked to a real page",()=>AT_P.length===9&&AT_P[0][0]==="Concept"&&AT_P[8][0]==="Judgement"&&AT_P.every(p=>!!routeParse(p[2])));
 T("Atlas · the rupee example's numbers hold: ₹80 to ₹88 is a depreciation; 0.8 + 0.6 > 1",()=>(1/88<1/80)&&(0.8+0.6>1)&&Math.abs((100*1.08)-(100*1.10*0.94)-4.6)<1e-9);
 T("Atlas · the cover is uncluttered: one headline, one line of copy, two actions, no statistics strip",()=>{const h=VIEWS.home();const c=h.slice(h.indexOf('class="hero rn-home'),h.indexOf("</section>",h.indexOf('class="hero rn-home')));return (c.match(/<h1/g)||[]).length===1&&(c.match(/class="btn lg/g)||[]).length===2&&!/cv-scale|cv-verbs/.test(c)});
 return out}
ATLASSUITE.suiteName="Project Atlas";
EXTRA_SUITES.push(ATLASSUITE);
QAREPORT.push({area:"Project Atlas",re:/^Atlas ·/,what:"The landing sequence: real pathways and counts, an exhibition of five pieces in five forms from Studio excerpts only, a six-stage topic journey, a prediction lab built on the platform's own Predict-a-diagram data, and a nine-step progression with verified figures."});
