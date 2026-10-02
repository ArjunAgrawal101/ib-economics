/* ═══════════════════════════════════════════════════════════════════════════
   ECONOMISTS AND IDEAS · the editorial layer
   The written profiles are unchanged; this layer presents them as intellectual
   history rather than paragraphs: an interactive timeline by school of
   thought, an idea chain and a central question for every economist, an
   influence map of who built on and who challenged whom, and neutral
   comparisons. The schools, chains, relations and comparisons were written
   for this release and reviewed for accuracy (src/content/ideas/rt-v2.json).
   ═══════════════════════════════════════════════════════════════════════════ */
const ECCOL={classical:"#2F6FB3",marxian:"#B23A55",neoclassical:"#1F8C70",welfare:"#C77A2A",keynesian:"#7A2436",austrian:"#7357B8",chicago:"#4E5A66",institutional:"#2A7F8F",information:"#8A6D1E",experimental:"#4F7A2E"};
const ECS={sel:"keynes",cmp:"keynes-hayek"};
const ECSHORT={classical:"Classical",marxian:"Marxian",neoclassical:"Neoclassical",welfare:"Welfare",keynesian:"Keynesian",austrian:"Austrian",chicago:"Chicago and monetarist",institutional:"Institutional",information:"Information",experimental:"Experimental"};
function ecSchool(id){return (IDEASIDX.schools||[]).find(s=>s.id===id)||{id,name:id,span:""}}
function ecChip(sid){const s=ecSchool(sid);return `<span class="ec-chip" style="--c:${ECCOL[sid]||"#5E6670"}">${esc(s.name)}</span>`}
function ecChain(chain,cls){return `<ol class="ec-chain ${cls||""}">${chain.map(c=>`<li>${esc(c)}</li>`).join("")}</ol>`}
function ecName(id){const e=IDEASIDX.economists.find(x=>x.id===id);return e?e.name:id}
function ecShort(n){const p=n.split(" ");return p[p.length-1]}

/* ── the timeline: lanes by school, a node at each economist's major work ── */
function ecLanes(){const L=IDEASIDX.economists,order=[];
 [...L].sort((a,b)=>a.work.y-b.work.y).forEach(e=>{if(!order.includes(e.school))order.push(e.school)});return order}
function ecTimeline(){const L=IDEASIDX.economists;if(!L[0]||!L[0].work)return "";
 const lanes=ecLanes(),y0=1760,y1=2040,W=1000,LW=150,top=42,lh=44,H=top+lanes.length*lh+30,sx=y=>LW+(y-y0)/(y1-y0)*(W-LW-16);
 /* within a lane, a name drops to a second row when it would run into the one before it */
 const pos={};lanes.forEach((s,li)=>{const m=L.filter(e=>e.school===s).sort((a,b)=>a.work.y-b.work.y);const ends=[-1e9,-1e9];
  m.forEach(e=>{const x=sx(e.work.y),w=ecShort(e.name).length*7.4+16;let r=x>ends[0]+6?0:x>ends[1]+6?1:0;ends[r]=x+w;pos[e.id]={x,y:top+li*lh+(r?31:15)}})});
 const ticks=[1775,1800,1825,1850,1875,1900,1925,1950,1975,2000,2025];
 const rel=L.flatMap(e=>(e.rel||[]).map(([o,t])=>pos[o]?{a:e.id,b:o,t}:null).filter(Boolean));
 const svg=`<svg class="ec-tl" viewBox="0 0 ${W} ${H}" role="group" aria-label="Sixteen economists placed by school of thought and by the year of their major work, ${y0} to 2026, with the twelve economic events marked above">
  ${lanes.map((s,i)=>`<rect x="0" y="${top+i*lh}" width="${W}" height="${lh}" class="ec-lane ${i%2?"odd":""}"/><text x="10" y="${top+i*lh+lh/2+4}" class="ec-lab" style="fill:${ECCOL[s]}">${esc(ECSHORT[s]||ecSchool(s).name)}<title>${esc(ecSchool(s).name)}</title></text>`).join("")}
  ${ticks.map(t=>`<line x1="${sx(t)}" x2="${sx(t)}" y1="${top-6}" y2="${H-22}" class="dl-grid"/><text x="${sx(t)}" y="${H-6}" class="dl-tick" text-anchor="middle">${t}</text>`).join("")}
  <text x="10" y="20" class="ec-lab ev">Economic events</text>
  ${(typeof EVENTSIDX!=="undefined"?EVENTSIDX.events:[]).map(v=>{const x=sx(evYear(v.start));return `<a href="#/events/archive/${v.id}" onclick="event.preventDefault();nav('events',0,'${v.id}')" aria-label="${esc(v.title)}, ${esc(v.years)}"><path d="M${x} 10 l5 7 l-5 7 l-5 -7z" class="ec-evm"><title>${esc(v.title)} (${esc(v.years)})</title></path></a>`}).join("")}
  <g class="ec-rels" aria-hidden="true">${rel.map(r=>{const a=pos[r.a],b=pos[r.b],mx=(a.x+b.x)/2,my=Math.min(a.y,b.y)-26;return `<path d="M${b.x} ${b.y} Q${mx} ${my} ${a.x} ${a.y}" class="ec-rel ${r.t==="c"?"ch":"bo"}" data-a="${r.a}" data-b="${r.b}"/>`}).join("")}</g>
  ${L.map(e=>{const p=pos[e.id],s=e.school;return `<a href="#/ideas/economists/${e.id}" class="ec-node" data-id="${e.id}" onclick="event.preventDefault();nav('ideas',0,'${e.id}')" onmouseenter="ecPick('${e.id}')" onfocus="ecPick('${e.id}')" aria-label="${esc(e.name)}, ${esc(ecSchool(s).name)}, ${esc(e.work.t)} (${e.work.y}). Open profile">
    <circle cx="${p.x}" cy="${p.y}" r="7" style="fill:${ECCOL[s]}"/><text x="${p.x+11}" y="${p.y+4}" class="ec-nm">${esc(ecShort(e.name))}</text></a>`}).join("")}
 </svg>`;
 const vert=`<ol class="ec-vt">${[...L].sort((a,b)=>a.work.y-b.work.y).map(e=>`<li style="--c:${ECCOL[e.school]}"><span class="ec-vy">${e.work.y}</span><div><button class="lnk ec-vn" onclick="nav('ideas',0,'${e.id}')">${esc(e.name)}</button> ${ecChip(e.school)}
   <p class="sm mt1">${esc(e.core)}</p>${ecChain(e.chain,"sm")}</div></li>`).join("")}</ol>`;
 return `<div class="ec-tlwrap"><div class="ec-tlscroll">${svg}</div>
  <div class="ec-key xs"><span><i class="bo"></i>built on</span><span><i class="ch"></i>challenged</span><span><i class="ev"></i>economic event</span><span>Each dot sits at the year of the economist's major work. Hover, focus or tap a name to preview; select it to open the profile.</span></div>
  <div id="ec-prev" class="ec-prev" aria-live="polite">${ecPreview(ECS.sel)}</div></div>${vert}`}
function ecPreview(id){const e=IDEASIDX.economists.find(x=>x.id===id);if(!e)return "";
 const rel=(e.rel||[]).map(([o,t])=>`<button class="kcchip" onclick="nav('ideas',0,'${o}')">${t==="c"?"Challenged":"Built on"} ${esc(ecName(o))}</button>`).join("");
 return `<div class="ec-pv"><div><div class="xs ec-pl">${esc(e.life)} · ${ecChip(e.school)}</div><h3 class="mt1">${esc(e.name)}</h3><p class="sm mt1"><em>${esc(e.work.t)}</em> (${e.work.y})</p></div>
  <div><p class="sm">${esc(e.core)}</p>${ecChain(e.chain,"sm mt2")}${rel?`<div class="id-chips mt2">${rel}</div>`:""}</div>
  <div><button class="btn sm" onclick="nav('ideas',0,'${e.id}')">Open the profile →</button></div></div>`}
function ecPick(id){ECS.sel=id;const p=document.getElementById("ec-prev");if(p)p.innerHTML=ecPreview(id);
 document.querySelectorAll(".ec-rel").forEach(r=>r.classList.toggle("on",r.dataset.a===id||r.dataset.b===id));
 document.querySelectorAll(".ec-node").forEach(n=>n.classList.toggle("on",n.dataset.id===id))}

/* ── the list ── */
function econList(){const L=IDEASIDX.economists.filter(e=>!IDF.kc||e.kc.includes(IDF.kc));const lanes=ecLanes().filter(s=>L.some(e=>e.school===s));
 return H.pageHead("Ideas","Economists and ideas",`Sixteen economists whose ideas the course still uses, placed in time and in their tradition: the question each asked, the argument they built, who they built on and who they challenged.`)
 +`<section class="sec"><div class="wrap">${ecTimeline()}
  <div class="dl-filters mt5"><label>Key concept<select onchange="IDF.kc=this.value;render()"><option value="">All nine</option>${["Scarcity","Choice","Efficiency","Equity","Economic well-being","Sustainability","Change","Interdependence","Intervention"].map(k=>`<option ${IDF.kc===k?"selected":""}>${k}</option>`).join("")}</select></label>
   <p class="xs" style="align-self:end">Showing ${L.length} of 16 · <button class="lnk" onclick="nav('ideas',2)">Compare two economists</button></p></div>
  ${lanes.map(s=>{const sc=ecSchool(s);return `<div class="ec-school mt5" style="--c:${ECCOL[s]}"><h2 class="id-era">${esc(sc.name)} <span class="xs">${esc(sc.span)}</span></h2><p class="sm mt1">${esc(sc.summary||"")}</p></div>
   <div class="id-grid mt3">${L.filter(e=>e.school===s).map(e=>`<button class="id-card" onclick="nav('ideas',0,'${e.id}')" style="--c:${ECCOL[s]}"><span class="id-life">${esc(e.life)}</span><span class="id-name">${esc(e.name)}</span><span class="id-head">${esc(e.core)}</span>${ecChain(e.chain.slice(0,3),"mini")}<span class="id-kc">${e.kc.map(esc).join(" · ")}</span></button>`).join("")}</div>`}).join("")}
  <p class="xs mt4">${srcTag("platform")} Original profiles written for this platform. Schools of thought are conventional labels, not fixed boxes; dates, works and prizes are limited to those the writers could confirm. Ideas are explained, not endorsed.</p></div></section>`}

/* ── a profile ── */
function econPage(id){const D=ideasData(),ix=IDEASIDX.economists.find(e=>e.id===id);if(!ix)return econList();
 if(!D)return H.pageHead("Ideas",ix.name,ix.headline)+`<section class="sec"><div class="wrap">${idWait("this profile")}</div></section>`;
 const e=D.economists.find(x=>x.id===id),v=(D.v2&&D.v2.economists[id])||{},i=IDEASIDX.economists.indexOf(ix),prev=IDEASIDX.economists[i-1],next=IDEASIDX.economists[i+1];
 const blk=(h,b,cls)=>`<section class="id-sec ${cls||""}"><h2 class="ls-h2">${h}</h2>${b}</section>`;
 const after=IDEASIDX.economists.filter(o=>(o.rel||[]).some(([x,t])=>x===id&&t==="b"));
 const challengedBy=IDEASIDX.economists.filter(o=>(o.rel||[]).some(([x,t])=>x===id&&t==="c"));
 const evs=(typeof EVENTSIDX!=="undefined"?EVENTSIDX.events:[]).filter(x=>(x.economists||[]).includes(id));
 const challenged=[...(v.challenged||[]).map(r=>`<li><button class="lnk" onclick="nav('ideas',0,'${r.id}')">${esc(ecName(r.id))}</button>: ${esc(r.why)}</li>`),...(v.outside||[]).filter(o=>o.rel==="challenged").map(o=>`<li><strong>${esc(o.name)}</strong>: ${esc(o.why)}</li>`)];
 const builtOn=[...(v.builtOn||[]).map(r=>`<li><button class="lnk" onclick="nav('ideas',0,'${r.id}')">${esc(ecName(r.id))}</button>: ${esc(r.why)}</li>`),...(v.outside||[]).filter(o=>o.rel!=="challenged").map(o=>`<li><strong>${esc(o.name)}</strong>: ${esc(o.why)}</li>`)];
 return H.pageHead("Economists and ideas",e.name,e.headline)
 +`<section class="sec"><div class="wrap id-page">
  <div class="id-meta"><span>${esc(e.life)}</span>${v.school?ecChip(v.school):`<span>${esc(e.era)}</span>`}${e.honours?`<span>${esc(e.honours)}</span>`:""}</div>
  ${v.question?`<div class="ec-lead"><div class="eb">The central question</div><p class="ec-q">${esc(v.question)}</p></div>
  <div class="ec-triad"><div><div class="eb">Core idea</div><p class="mt1">${esc(v.core)}</p></div><div><div class="eb">Key contribution</div><p class="mt1">${esc(e.contribution)}</p></div>
   <div><div class="eb">Major work</div><p class="mt1"><em>${esc(v.majorWork.t)}</em> (${v.majorWork.y})</p>${v.relevance?`<div class="eb mt3">Why it matters now</div><p class="mt1 sm">${esc(v.relevance)}</p>`:""}</div></div>
  <figure class="ec-fig"><figcaption><span class="eb">How the idea runs</span> ${typeof evBadge==="function"?evBadge("interpretation"):""}</figcaption>${ecChain(v.chain,"big")}<p class="xs mt2">${esc(v.chainNote||"")}</p></figure>`:""}
  <div class="id-cols"><div>
   ${blk("The problem they faced",`<p>${esc(e.context)}</p>`)}
   ${blk("What they argued",`<ol class="id-ideas ec-ideas">${e.ideas.map(x=>`<li><h3>${esc(x.h)}</h3><p class="mt1">${esc(x.p)}</p></li>`).join("")}</ol>`)}
   ${builtOn.length||challenged.length?blk("Who they built on, and what they challenged",`<div class="ec-two">${builtOn.length?`<div><div class="eb">Built on</div><ul class="ls-list mt1">${builtOn.join("")}</ul></div>`:""}${challenged.length?`<div><div class="eb">Challenged</div><ul class="ls-list mt1">${challenged.join("")}</ul></div>`:""}</div>`):""}
   ${blk("What came after",`<p>${esc(e.influence)}</p>${after.length||challengedBy.length?`<div class="id-chips mt2">${after.map(o=>`<button class="kcchip" onclick="nav('ideas',0,'${o.id}')">Built on by ${esc(o.name)}</button>`).join("")}${challengedBy.map(o=>`<button class="kcchip" onclick="nav('ideas',0,'${o.id}')">Challenged by ${esc(o.name)}</button>`).join("")}</div>`:""}`)}
   ${blk("Assumptions and critiques",`<div class="ec-two"><div><div class="eb">What the models assume</div><ul class="ls-list mt1">${e.assumptions.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>
     <div><h3 class="eb">Criticisms and limits</h3><ul class="ls-list mt1">${e.criticisms.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div></div>`)}
   ${blk("Modern relevance",`<p>${esc(e.modern)}</p>`)}
  </div><aside class="id-side">
   <div class="id-box"><div class="eb">In the course</div><div class="id-chips mt1">${e.subs.map(idSubBtn).join("")}</div></div>
   <div class="id-box"><div class="eb">A common misreading</div><p class="sm mt1">${esc(e.misread)}</p></div>
   <div class="id-box"><div class="eb">An inquiry question</div><p class="sm mt1">${esc(e.question)}</p></div>
   ${evs.length?`<div class="id-box"><div class="eb">Economic events</div><div class="id-chips mt1">${evs.map(x=>`<button class="kcchip" onclick="nav('events',0,'${x.id}')">${esc(x.title)}</button>`).join("")}</div></div>`:""}
   <div class="id-box"><div class="eb">Key works</div><ul class="ls-list mt1">${e.works.map(w=>`<li><em>${esc(w.t)}</em> (${esc(String(w.y))})</li>`).join("")}</ul></div>
   <div class="id-box"><div class="eb">Key concepts and terms</div><div class="id-chips mt1">${e.kc.map(k=>`<span class="kcchip">${esc(k)}</span>`).join("")}${e.terms.map(idTermBtn).join("")}</div></div>
   ${e.dg.length?`<div class="id-box"><div class="eb">Diagrams</div><div class="id-chips mt1">${e.dg.map(idDgBtn).join("")}</div></div>`:""}
   ${v.cambridge?`<div class="id-box"><div class="eb">Beyond IB</div><p class="xs mt1"><strong>Cambridge and other A-level courses:</strong> ${v.cambridge.map(esc).join(", ")}</p><p class="xs mt1"><strong>University:</strong> ${esc(v.university||"")}</p>${v.india?`<p class="xs mt1"><strong>The Indian economy:</strong> ${esc(v.india)}</p>`:""}</div>`:""}
   <div class="id-box"><div class="eb">Connected thinkers</div><ul class="ls-list mt1">${e.connects.map(c=>{const o=IDEASIDX.economists.find(x=>x.id===c.id);return o?`<li><button class="lnk" onclick="nav('ideas',0,'${o.id}')">${esc(o.name)}</button>: ${esc(c.why)}</li>`:""}).join("")}</ul></div>
  </aside></div>
  <nav class="ls-nav mt5" aria-label="Other economists">${prev?`<button class="btn gh sm" onclick="nav('ideas',0,'${prev.id}')">← ${esc(prev.name)}</button>`:"<span></span>"}<button class="btn gh sm" onclick="nav('ideas',0)">All economists</button>${next?`<button class="btn gh sm" onclick="nav('ideas',0,'${next.id}')">${esc(next.name)} →</button>`:"<span></span>"}</nav>
  <p class="xs mt3">${srcTag("platform")} Original writing, reviewed for accuracy. The idea chain is an interpretation of the argument, not a claim that one step mechanically caused the next. Version ${esc((D.version||""))}.</p></div></section>`}

/* ── how ideas connect: the influence map, then lifespans ── */
function econTimeline(){const L=IDEASIDX.economists,lanes=ecLanes();
 const W=1000,colW=W/lanes.length,MH=420,pos={};
 lanes.forEach((s,ci)=>{const m=L.filter(e=>e.school===s).sort((a,b)=>a.work.y-b.work.y);m.forEach((e,k)=>{pos[e.id]={x:colW*ci+colW/2,y:70+(k+0.5)*(MH-100)/m.length}})});
 const edges=L.flatMap(e=>(e.rel||[]).map(([o,t])=>pos[o]?{a:e.id,b:o,t}:null).filter(Boolean));
 const now=2026,y0=1720,lab=170,W2=760,rowH=26,HH=L.length*rowH+40,sx=y=>lab+(y-y0)/(now-y0)*(W2-lab-12);
 return H.pageHead("Ideas","How ideas connect",`Who built on whom, and who challenged whom, across ten traditions. Arrows point from an economist to the thinker they built on or argued with.`)
 +`<section class="sec"><div class="wrap">
  <div class="ec-tlscroll"><svg class="ec-map" viewBox="0 0 ${W} ${MH}" role="group" aria-label="Influence map: sixteen economists in ten schools of thought, with lines for who built on and who challenged whom">
   <defs><marker id="ecah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="#7A2436"/></marker>
    <marker id="ecac" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="#4E5A66"/></marker></defs>
   ${lanes.map((s,ci)=>`<rect x="${colW*ci+4}" y="8" width="${colW-8}" height="${MH-16}" class="ec-col" style="--c:${ECCOL[s]}"/><text x="${colW*ci+colW/2}" y="30" text-anchor="middle" class="ec-cl" style="fill:${ECCOL[s]}">${esc((ECSHORT[s]||ecSchool(s).name).split(" and ")[0])}</text><text x="${colW*ci+colW/2}" y="46" text-anchor="middle" class="ec-cs">${esc(ecSchool(s).span)}</text>`).join("")}
   ${edges.map(r=>{const a=pos[r.a],b=pos[r.b],dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy)||1,ax=a.x+dx/d*14,ay=a.y+dy/d*14,bx=b.x-dx/d*16,by=b.y-dy/d*16,c=`${(ax+bx)/2+dy*0.1} ${(ay+by)/2-dx*0.1}`;
     return `<path d="M${ax} ${ay} Q${c} ${bx} ${by}" class="ec-edge ${r.t==="c"?"ch":"bo"}" marker-end="url(#${r.t==="c"?"ecac":"ecah"})"><title>${esc(ecName(r.a))} ${r.t==="c"?"challenged":"built on"} ${esc(ecName(r.b))}</title></path>`}).join("")}
   ${L.map(e=>{const p=pos[e.id];return `<a href="#/ideas/economists/${e.id}" onclick="event.preventDefault();nav('ideas',0,'${e.id}')" aria-label="${esc(e.name)}"><circle cx="${p.x}" cy="${p.y}" r="11" style="fill:${ECCOL[e.school]}" class="ec-mn"/><text x="${p.x}" y="${p.y+26}" text-anchor="middle" class="ec-nm">${esc(ecShort(e.name))}</text></a>`}).join("")}
  </svg></div>
  <div class="ec-key xs mt2"><span><i class="bo"></i>built on</span><span><i class="ch"></i>challenged</span><span>Columns run roughly from the oldest tradition to the newest.</span></div>
  <div class="ec-two mt4"><div><h2 class="ls-h2">Built on</h2><ul class="ls-list">${edges.filter(r=>r.t==="b").map(r=>`<li><button class="lnk" onclick="nav('ideas',0,'${r.a}')">${esc(ecName(r.a))}</button> built on <button class="lnk" onclick="nav('ideas',0,'${r.b}')">${esc(ecName(r.b))}</button></li>`).join("")}</ul></div>
   <div><h2 class="ls-h2">Challenged</h2><ul class="ls-list">${edges.filter(r=>r.t==="c").map(r=>`<li><button class="lnk" onclick="nav('ideas',0,'${r.a}')">${esc(ecName(r.a))}</button> challenged <button class="lnk" onclick="nav('ideas',0,'${r.b}')">${esc(ecName(r.b))}</button></li>`).join("")}</ul></div></div>
  <h2 class="ls-h2 mt5">Lifespans</h2>
  <div class="scrollx" tabindex="0" role="region" aria-label="Timeline of economists"><svg class="id-tl" viewBox="0 0 ${W2} ${HH}" role="group" aria-label="Lifespans of sixteen economists, from Adam Smith (born 1723) to Esther Duflo (born 1972)">
   ${[1750,1800,1850,1900,1950,2000].map(t=>`<line x1="${sx(t)}" x2="${sx(t)}" y1="8" y2="${HH-24}" class="dl-grid"/><text x="${sx(t)}" y="${HH-8}" class="dl-tick" text-anchor="middle">${t}</text>`).join("")}
   ${L.map((e,i)=>{const a=e.years[0],b=e.years[1]||now,y=14+i*rowH;return `<a href="#/ideas/economists/${e.id}" onclick="event.preventDefault();nav('ideas',0,'${e.id}')"><text x="${lab-8}" y="${y+12}" text-anchor="end" class="id-tl-n">${esc(e.name)}</text>
    <rect x="${sx(a)}" y="${y+3}" width="${Math.max(4,sx(b)-sx(a))}" height="12" rx="2" class="${e.years[1]?"id-tl-b":"id-tl-l"}" style="fill:${ECCOL[e.school]}"/></a>`}).join("")}</svg></div>
  <p class="xs mt2">Bars run from birth to death; a bar that reaches the present is a living economist.</p></div></section>`}

/* ── compare two economists, neutrally ── */
const ECROWS=[["question","The question they asked"],["assumptions","What they assumed"],["mechanism","The mechanism"],["policy","Policy implications"],["criticisms","Criticisms"],["context","Historical context"],["relevance","Modern relevance"]];
function econCompare(){const D=ideasData(),P=IDEASIDX.compare||[];
 const head=H.pageHead("Ideas","Compare economists",`Two answers to related questions, set side by side. Neither is presented as the winner: each was answering a particular problem under particular conditions.`)
  +`<section class="sec"><div class="wrap"><div class="ec-pairs" role="group" aria-label="Choose a comparison">${P.map(c=>`<button class="btn sm ${ECS.cmp===c.id?"":"gh"}" aria-pressed="${ECS.cmp===c.id}" onclick="ECS.cmp='${c.id}';render()">${esc(c.title)}</button>`).join("")}</div>`;
 if(!D)return head+idWait("the comparisons")+`</div></section>`;
 const c=(D.v2&&D.v2.compare||[]).find(x=>x.id===ECS.cmp)||D.v2.compare[0],an=ecName(c.a),bn=c.b?ecName(c.b):c.bLabel;
 return head+`<p class="ec-frame mt4">${esc(c.frame||"")}</p>
  <div class="scrollx mt3" tabindex="0" role="region" aria-label="${esc(c.title)} compared"><table class="ptbl ec-ctab"><thead><tr><th scope="col"></th><th scope="col">${c.a?`<button class="lnk" onclick="nav('ideas',0,'${c.a}')">${esc(an)}</button>`:esc(an)}</th><th scope="col">${c.b?`<button class="lnk" onclick="nav('ideas',0,'${c.b}')">${esc(bn)}</button>`:esc(bn)}</th></tr></thead><tbody>
  ${ECROWS.filter(([k])=>c.rows[k]).map(([k,h])=>`<tr><th scope="row">${h}</th><td>${esc(c.rows[k][0])}</td><td>${esc(c.rows[k][1])}</td></tr>`).join("")}</tbody></table></div>
  <p class="xs mt3">${srcTag("platform")} Written for this platform and reviewed for balance. ${c.b?"":`${esc(bn)} is not profiled here; only well-established points are described.`}</p></div></section>`}

(function(){const s=SECTIONS.find(x=>x.v==="ideas");if(s&&s.tabs&&!s.tabs.includes("Compare economists"))s.tabs.push("Compare economists");
 VIEWS.ideas=()=>TAB===2?econCompare():TAB===1?econTimeline():ARG?econPage(ARG):econList()})();
(function(){const prev=render;render=function(){const r=prev.apply(this,arguments);if(VIEW==="ideas"&&TAB===0&&!ARG&&document.getElementById("ec-prev"))ecPick(ECS.sel);return r}})();

function ECSUITE(){const out=[];const T=(n,f)=>{let ok=false,det="";try{const r=f();ok=r===true||(r&&r.ok);if(r&&r.d)det=r.d}catch(e){det=e.message}out.push({n,ok:!!ok,detail:det})};
 const keep={VIEW,TAB,ARG},L=IDEASIDX.economists;
 T("Economists · every economist has a school, a major work, a core idea and an idea chain",()=>L.every(e=>e.school&&ECCOL[e.school]&&e.work&&e.work.y>1700&&e.core&&e.chain.length>=4&&e.chain.length<=6));
 T("Economists · every relation points to a profiled economist",()=>L.every(e=>(e.rel||[]).every(([o,t])=>L.some(x=>x.id===o)&&(t==="b"||t==="c"))));
 T("Economists · the timeline places all sixteen, with the events above",()=>{VIEW="ideas";TAB=0;ARG=null;const h=VIEWS.ideas();return (h.match(/class="ec-node"/g)||[]).length===16&&(h.match(/class="ec-evm"/g)||[]).length===(typeof EVENTSIDX!=="undefined"?EVENTSIDX.events.length:0)});
 T("Economists · the timeline has a list form for small screens with every economist",()=>{VIEW="ideas";TAB=0;ARG=null;const h=VIEWS.ideas();return (h.match(/class="lnk ec-vn"/g)||[]).length===16});
 T("Economists · the influence map draws every relation and lists it in text",()=>{VIEW="ideas";TAB=1;ARG=null;const h=VIEWS.ideas(),n=L.reduce((a,e)=>a+(e.rel||[]).length,0);return (h.match(/class="ec-edge/g)||[]).length===n&&(h.match(/ built on | challenged /g)||[]).length>=n});
 T("Economists · five comparisons, none framed as a contest",()=>(IDEASIDX.compare||[]).length===5&&!(IDEASIDX.compare||[]).some(c=>/\bvs\.?\b|versus|winner|beats/i.test(c.title)));
 VIEW=keep.VIEW;TAB=keep.TAB;ARG=keep.ARG;return out}
ECSUITE.suiteName="Economists and ideas";
EXTRA_SUITES.push(ECSUITE);
QAREPORT.push({area:"Economists and ideas (editorial layer)",re:/^Economists · /,
 what:"That every economist has a school, major work, core idea and idea chain; that relations point to profiled economists; that the timeline places all sixteen with the events above and a list form for small screens; that the influence map draws and lists every relation; and that the five comparisons are not framed as contests."});
