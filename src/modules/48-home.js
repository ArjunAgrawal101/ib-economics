/* ═══════════════════════════════════════════════════════════════════════════
   FLAGSHIP · the shared home page and the IB DP landing
   The home page belongs to both pathways: one statement, two pathway cards of
   equal weight, then a short, curated sequence that previews each environment
   and leads into it. It is deliberately short; the full IB DP home page that
   earlier releases built (the cover, its chapters and every band) is kept,
   intact, as the IB DP landing at #/ib.
   Every preview is a real resource: a model drawn from its equations, the
   handbook covers, the Economics in 60 Seconds issues, the Learning Studio's
   pages. Every link resolves through the router or is left out.
   ═══════════════════════════════════════════════════════════════════════════ */
SECTIONS.push({v:"ib",n:"IB DP Economics",hide:1});
/* The IB home as every earlier layer composed it. Pull request #11 put its
   pathway band in front of it; that band is superseded by this home page and
   is left out of the IB landing whenever it is still composed in. */
const FX_IBHOME=VIEWS.home;
VIEWS.ib=function(){
 let h=FX_IBHOME();
 try{if(typeof upHomeBand==="function"){const b=upHomeBand();if(h.startsWith(b))h=h.slice(b.length)}}catch(e){}
 return fxIbIntro()+h;
};

/* ── shared helpers ─────────────────────────────────────────────────────── */
const FX_BLOB={};
function fxBlobURL(k,data){if(FX_BLOB[k])return FX_BLOB[k];
 try{const i=data.indexOf(","),bin=atob(data.slice(i+1)),u=new Uint8Array(bin.length);for(let j=0;j<bin.length;j++)u[j]=bin.charCodeAt(j);
  const type=(/^data:([^;]+)/.exec(data)||[])[1]||"image/jpeg";FX_BLOB[k]=URL.createObjectURL(new Blob([u],{type}))}catch(e){FX_BLOB[k]=data}
 return FX_BLOB[k]}
function fxArr(){return '<span class="arr" aria-hidden="true">→</span>'}
function fxSecHead(num,kicker,title,lede,id,cls){
 return `<header class="fx-section-head ${cls||""}"><div class="fxh-k"><span class="fx-num">${esc(num)}</span><span class="fx-kicker">${esc(kicker)}</span></div>
  <h2 class="fx-h2" id="${id}">${title}</h2>${lede?`<p class="fx-lede">${lede}</p>`:""}</header>`;
}
function fxVols(){try{return (UPSC_HB&&UPSC_HB.volumes)||[]}catch(e){return []}}
function fxCover(v,eager){const c=v.img&&v.img.cover;if(!c)return "";
 return `<img src="${esA(c.src)}" width="${c.w}" height="${c.h}" alt="Volume ${esA(v.n)}: ${esA(v.title)}, cover" ${eager?"":'loading="lazy" '}decoding="async">`}
function fxLibHref(id){return fxHref("upsc",(typeof UP_T!=="undefined"&&UP_T.handbooks)||3,id)}
function fxUpHref(k){const t=(typeof UP_T!=="undefined"&&UP_T[k]!==undefined)?UP_T[k]:0;return fxHref("upsc",t)}

/* ── 1 · the hero and the two pathways ──────────────────────────────────── */
/* the features of each pathway, in the words of the owner's final brief; each opens the place that provides it */
const FX_IB_FEATURES=[["Complete IB Economics learning resources","course","At a glance"],["SL and HL learning pathways","paths","Choose your path"],["Interactive economic diagrams","lab","Market lab"],
 ["Conceptual mindmaps","mind",null],["Real-world economics cases","world",null],["Calculations and numerical tools","calculate",null],
 ["Exam preparation and original practice","examiner",null],["Internal Assessment support","ia",null],["Extended Essay support","ees",null],["Tutorials and revision resources","tutorials",null]];
const FX_UP_FEATURES=[["Indian Economy learning resources","resources"],["Structured topic-wise study","syllabus"],["Prelims-oriented factual understanding","strategy"],
 ["Mains-oriented analytical frameworks","strategy"],["Economic concepts and numerical understanding","#/concepts"],["Current developments and policy analysis","current"],
 ["Handbooks and revision resources","handbooks"],["The Indian Economy book","#/book"],["Digital Revision Companion","#/book/digital-revision-companion"],["Intensive online coaching","course"]];
/* what each pathway holds, counted from its own data when the page is drawn: no figure is typed in */
function fxIbCounts(){let n={};try{n=rnCount()}catch(e){}
 const f=[[n.subtopics,"subtopics"],[n.diagrams,"diagrams"],[n.maps,"mindmaps"],[n.cases,"real-world cases"],[n.calcs,"calculators"]].filter(([v])=>v>0);
 return f.map(([v,l])=>`<span><b>${fmtN(v)}</b> ${esc(l)}</span>`).join("")}
function fxUpCounts(){const L=(a)=>{try{return a().length}catch(e){return 0}};
 const f=[[L(()=>UP_PRE_LINES)+L(()=>UP_MAINS)+L(()=>UP_GS2),"syllabus lines"],[fxVols().length,"handbooks"],[L(()=>UP_TOPICS),"topic previews"],[L(()=>UP_CA),"current-affairs notes"]].filter(([v])=>v>0);
 return f.map(([v,l])=>`<span><b>${fmtN(v)}</b> ${esc(l)}</span>`).join("")}
function fxHeroBg(){
 /* the economic cycle, drawn once across the ground; the grid is a CSS background, so nothing extends past the page */
 return `<svg class="hx-wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true" focusable="false">
  <path class="hx-c hx-cy" vector-effect="non-scaling-stroke" d="M0 60 C 120 4, 240 4, 360 60 S 600 116, 720 60 S 960 4, 1080 60 S 1320 116, 1440 60"/></svg>`;
}
function fxHeroMark(){
 /* demand meets supply: the platform's mark, drawn as a model */
 return `<svg class="hx-sd" viewBox="0 0 160 96" aria-hidden="true" focusable="false">
  <path class="hx-ax" d="M12 6V88H156"/>
  <path class="hx-c hx-d" d="M24 12L148 80" pathLength="1"/><path class="hx-c hx-s" d="M24 80L148 12" pathLength="1"/>
  <circle class="hx-r" cx="86" cy="46" r="9"/><circle class="hx-e" cx="86" cy="46" r="3.6"/></svg>`;
}
function fxPathCards(){
 const ibF=FX_IB_FEATURES.map(([n,v,lab])=>{const t=fxTabIndex(v,lab);return `<li>${t<0?esc(n):`<a class="fx-a" href="${esA(fxHref(v,t))}">${esc(n)}</a>`}</li>`}).join("");
 const upF=FX_UP_FEATURES.map(([n,k])=>`<li><a class="fx-a" href="${esA(k.charAt(0)==="#"?k:fxUpHref(k))}">${esc(n)}</a></li>`).join("");
 const vols=fxVols();const shelf=[2,1,4,9].map(i=>vols[i]).filter(Boolean);
 return `<div class="hx-paths">
  <article class="pc pc-ib" aria-labelledby="pc-ib-h">
   <div class="pc-top"><span class="pc-num">Pathway 01</span><span class="pc-rule" aria-hidden="true"></span></div>
   <div class="pc-body">
    <div class="pc-text"><h2 class="pc-h" id="pc-ib-h">IB DP Economics</h2>
     <p class="pc-pos">Think conceptually. Apply theory. Evaluate real-world economics.</p>
     <p class="pc-d">A complete interactive learning environment for IB Diploma Programme Economics students and teachers, at SL and HL.</p></div>
    <figure class="pc-prev pc-model" aria-hidden="true">${motifSVG("shift")}<figcaption>${esc(motifCap("shift"))}</figcaption></figure>
   </div>
   <p class="pc-n">${fxIbCounts()}</p>
   <ul class="pc-f">${ibF}</ul>
   <a class="fx-btn primary pc-cta" href="#/ib">Explore IB Economics ${fxArr()}</a>
  </article>
  <article class="pc pc-up" aria-labelledby="pc-up-h">
   <div class="pc-top"><span class="pc-num">Pathway 02</span><span class="pc-rule" aria-hidden="true"></span></div>
   <div class="pc-body">
    <div class="pc-text"><h2 class="pc-h" id="pc-up-h">UPSC CSE Economics</h2>
     <p class="pc-pos">Understand the Indian economy through concepts, institutions, policies and evidence.</p>
     <p class="pc-d">A structured preparation pathway for Civil Services aspirants: conceptual clarity, the Indian economy and its policies, handbooks, current developments and examination thinking.</p></div>
    <a class="pc-prev pc-shelf" href="${esA(fxLibHref())}" aria-label="The Economics Handbook Collection: eleven volumes">${shelf.map((v,i)=>`<span class="pc-book b${i}">${fxCover(v,true)}</span>`).join("")}</a>
   </div>
   <p class="pc-n">${fxUpCounts()}</p>
   <ul class="pc-f">${upF}</ul>
   <a class="fx-btn primary pc-cta" href="#/upsc">Explore UPSC Economics ${fxArr()}</a>
  </article>
 </div>`;
}
/* the macroeconomy behind the statement: aggregate demand shifts right along short-run aggregate
   supply while long-run supply stays put, slowly and faintly, and still for reduced motion.
   In the drawing's units (y grows downward): SRAS y = 470 - 0.45(x - 110), AD y = 210 + 0.8(x - 110),
   meeting at (318, 376.4). Moving AD right by d moves the meeting point by (0.64d, -0.288d), so for the
   120-unit shift the dot travels (76.8, -34.56) on the same clock and stays on both curves throughout. */
function fxHeroMacro(){
 return `<svg class="hx-macro" viewBox="0 0 640 560" aria-hidden="true" focusable="false">
  <path class="hm-ax" d="M60 40V520H620"/>
  <text class="hm-l" x="70" y="52">Price level</text><text class="hm-l" x="616" y="544" text-anchor="end">Real GDP</text>
  <path class="hm-lr" d="M430 70V520"/><text class="hm-t" x="438" y="86">LRAS</text>
  <path class="hm-as" d="M110 470L600 249.5"/><text class="hm-t" x="562" y="246">SRAS</text>
  <g class="hm-adg"><path class="hm-ad" d="M110 210L497.5 520"/><text class="hm-t" x="452" y="470">AD</text></g>
  <circle class="hm-e" cx="318" cy="376.4" r="5"/>
 </svg>`;
}
function fxPortrait(){
 return `<figure class="hx2-por">
  <div class="hx2-plate"><div class="hx2-frame"><img src="assets/brand/arjun-agrawal-portrait-hero.webp" width="539" height="674" alt="Arjun Agrawal, in a navy blazer and tie, smiling, in front of a stone wall." decoding="async" fetchpriority="high"></div>
   <div class="hx2-card" aria-hidden="true">${fxHeroMacro()}<span>Aggregate demand rises: output and the price level rise</span></div></div>
  <figcaption><b>Arjun Agrawal</b><span>${esc(FXI.roles)}</span></figcaption>
 </figure>`;
}
function fxHero(){
 return `<section class="hx hx2" aria-labelledby="hx-h"><div class="hx-bg" aria-hidden="true">${fxHeroBg()}</div>
  <div class="fx-wrap hx2-in">
   <div class="hx2-t">
    <div class="hx-k"><span class="hx-mark" aria-hidden="true"></span>Arjun Agrawal · Economics</div>
    <h1 class="hx-h" id="hx-h">Economics is not just a subject to study. <em>It is a way to think.</em></h1>
    <p class="hx-lede">An integrated learning ecosystem connecting economic concepts, visual understanding, real-world evidence and examination thinking.</p>
    <div class="hx-ctas"><a class="fx-btn hx-go ib" href="#/ib">Explore IB DP Economics ${fxArr()}</a><a class="fx-btn hx-go up" href="#/upsc">Explore UPSC CSE Economics ${fxArr()}</a></div>
    <p class="hx-sig">${fxHeroMark()}<span class="hx-sig-m">Think like an economist.</span><span class="hx-sig-s">Concepts. Content. Contexts.</span></p>
   </div>
   ${fxPortrait()}
  </div>
  <div class="fx-wrap"><p class="hx-idea"><span>${esc(FXI.idea)}</span></p>${fxPathCards()}</div>
 </section>`;
}

/* ── 2 · think like an economist: the method, with a model to move ─────── */
const FX_METHOD=[["Concept","Name the idea precisely: scarcity, opportunity cost, the margin."],
 ["Model","Draw it, and let the equations decide where the curves meet."],
 ["Evidence","Test it against data and real economies, India's and the world's."],
 ["Judgement","Weigh who gains, who loses, and what would change the answer."]];
function fxThink(){
 let plate="",read="";try{CV.s=0;plate=cvSVG();read=cvRead()}catch(e){plate=motifSVG("sd")}
 return `<section class="fx-section fx-think" aria-labelledby="th-h"><div class="fx-wrap th-grid">
  <div>${fxSecHead("02","The way of thinking","Think like an economist.","Every choice has a cost, every market finds a balance, every policy is a trade-off. The platform teaches that habit of mind first, so that the syllabus, whichever it is, becomes something you can reason with rather than recall.","th-h")}
   <ol class="th-steps">${FX_METHOD.map(([n,d],i)=>`<li><span class="th-n">${i+1}</span><div><b>${esc(n)}</b><span>${esc(d)}</span></div></li>`).join("")}</ol></div>
  <figure class="th-plate rv">
   <div class="th-fig" id="cv-plate-fig">${plate}</div>
   <div class="th-ctl"><label for="th-shift">Shift demand</label>
    <input id="th-shift" type="range" min="-3" max="3" step="0.5" value="0" oninput="cvSet(this.value)" aria-describedby="cv-read"></div>
   <figcaption id="cv-read" aria-live="polite">${esc(read)}</figcaption>
  </figure>
 </div></section>`;
}

/* ── 3 · the IB DP environment ──────────────────────────────────────────── */
function fxIbEnv(){
 const gs=fxIbGroups();
 return `<section class="fx-section fx-env env-ib" aria-labelledby="eib-h"><div class="fx-wrap">
  ${fxSecHead("03","Pathway 01 · IB DP Economics","Explore the IB Economics learning environment","Five ways in, one course: learn the concepts, explore the world's economies, practise until the models are yours, research for the IA and the EE, and use the resources that support all of it.","eib-h")}
  <div class="env-grid five">${gs.map((g,gi)=>`<article class="env-card rv" style="--i:${gi}"><h3>${esc(g.n)}</h3><p>${esc(g.d)}</p>
   <ul>${g.items.slice(0,4).map(i=>`<li><a class="fx-a" href="${esA(i.href)}">${esc(i.n)}</a></li>`).join("")}</ul></article>`).join("")}</div>
  <p class="env-cta"><a class="fx-btn primary" href="#/ib">Enter IB DP Economics ${fxArr()}</a> <a class="fx-link" href="${esA(fxHref("course",0))}">Start with the course</a></p>
 </div></section>`;
}

/* ── 4 · the UPSC environment ───────────────────────────────────────────── */
const FX_UP_STEPS=[["syllabus","Syllabus","The Economics in the Prelims GS I and Mains GS III syllabus, and what each part asks of you."],
 ["handbooks","Handbook Library","Eleven volumes, from the foundations, money and inflation to trade, agriculture and industry."],
 ["current","Current Affairs","Developments read through the concept and the volume behind them."],
 ["strategy","Preparation Strategy","How to prepare the Economics component, from first reading to revision."],
 ["course","Online Course","The three-month intensive programme: ₹9,999, online only, at most 25 students."]];
function fxUpEnv(){
 return `<section class="fx-section fx-env env-up" aria-labelledby="eup-h"><div class="fx-wrap">
  ${fxSecHead("04","Pathway 02 · UPSC CSE Economics","Explore the UPSC Economics learning environment","A structured preparation for the Economics in General Studies: understand the concept, connect it with the Indian economy and government policy, follow current developments, and apply it to Prelims questions and Mains answers.","eup-h")}
  <ol class="up-journey rv">${FX_UP_STEPS.map(([k,n,d],i)=>`<li><a class="fx-a" href="${esA(fxUpHref(k))}"><span class="uj-n">0${i+1}</span><b>${esc(n)}</b><span>${esc(d)}</span></a></li>`).join("")}</ol>
  <p class="env-cta"><a class="fx-btn primary" href="#/upsc">Enter UPSC CSE Economics ${fxArr()}</a> <a class="fx-link" href="${esA(fxUpHref("course"))}">The 3-month course</a></p>
 </div></section>`;
}

/* ── 5 · selected resources and handbooks ───────────────────────────────── */
function fxResources(){
 const vols=fxVols();
 let c60="";
 try{c60=(C60||[]).slice(0,3).map(x=>{const src=C60COVER[x.id]?fxBlobURL("c60"+x.id,C60COVER[x.id]):"";
  const t60=fxTabIndex("learn","Economics in 60 Seconds");
  return src?`<a class="rs-issue" href="${esA(t60<0?"#/learn":fxHref("learn",t60,x.id))}"><img src="${esA(src)}" alt="Economics in 60 Seconds, issue ${esA(x.id)}: ${esA(x.t)}" loading="lazy" decoding="async" width="300" height="375"><span><b>${esc(x.t)}</b><em>Issue ${esc(x.id)} · ${esc(x.topic||"")}</em></span></a>`:""}).join("")}catch(e){c60=""}
 let studio="";
 try{const p=ldPrev("exchange-rates",1)||ldPrev("balance-of-payments",0);if(p)studio=`<a class="res-studio" href="${esA(fxHref("studio",0))}">${stImg(p,"",false)}<span><b>The Learning Studio</b><em>Visual explainers, guides and revision maps</em></span></a>`}catch(e){}
 return `<section class="fx-section fx-res" aria-labelledby="res-h"><div class="fx-wrap">
  ${fxSecHead("05","Selected resources","Selected resources and handbooks","Original resources, written and designed for each pathway. Look inside before you choose.","res-h")}
  <div class="res-grid">
   <div class="res-shelf rv"><div class="res-k fx-tag upsc">UPSC CSE · The Economics Handbook Collection</div>
    <ul class="shelf">${vols.map(v=>`<li><a class="fx-a" href="${esA(fxLibHref(v.id))}">${fxCover(v)}<span class="shelf-n">Vol. ${esc(v.n)}</span></a></li>`).join("")}</ul>
    <p class="res-note">Eleven volumes for the Economics in Prelims and Mains General Studies. Digital soft copy, ₹99 per volume. <a class="fx-link" href="${esA(fxLibHref())}">Open the Handbook Library</a></p></div>
   <div class="res-ib rv"><div class="res-k fx-tag ib">IB DP · Visual resources</div>
    <div class="res-issues">${c60}</div>${studio}
    <p class="res-note"><a class="fx-link" href="${esA(fxHref("resources",0))}">The IB resource hub</a> · <a class="fx-link" href="${esA(fxHref("studio",0))}">The Learning Studio</a></p></div>
  </div>
 </div></section>`;
}

/* ── 6 · the interactive laboratory ─────────────────────────────────────── */
const FX_LABS=[["sd","Market lab","lab","Market lab","Shift demand and supply and watch the market clear."],
 ["adas","AD-AS lab","lab","AD-AS lab","Move aggregate demand and supply, and read output and the price level."],
 ["tax","Policy simulator","lab","Policy simulator","Taxes, subsidies and price controls, with their welfare effects."],
 ["elastic","Elasticity lab","lab","Elasticity lab","How responsiveness changes revenue and incidence."],
 ["fx","Exchange rates","studio",null,"Appreciation, depreciation and the managed band, explained visually."],
 ["cycle","Economic data","data",null,"Indicators and country profiles, from the sources themselves."]];
function fxLab(){
 const cards=FX_LABS.map(([m,n,v,lab,d])=>{const t=fxTabIndex(v,lab);if(t<0)return "";
  return `<a class="lab-card" href="${esA(fxHref(v,t))}"><div class="lab-fig" aria-hidden="true">${motifSVG(m)}</div><b>${esc(n)}</b><span>${esc(d)}</span></a>`}).join("");
 return `<section class="fx-section fx-lab" aria-labelledby="lab-h"><div class="fx-wrap">
  ${fxSecHead("06","Interactive Economics Laboratory","Move a model. Watch the economy respond.","Every diagram on the platform is generated from its equations and checked point by point, so what you move is the model itself, not a picture of it.","lab-h","on-dark")}
  <div class="lab-grid rv">${cards}</div>
 </div></section>`;
}

/* ── 7 · one concept, two perspectives ──────────────────────────────────── */
function fxAcross(){
 let inner="";
 try{if(typeof ccTeaser==="function")inner=ccTeaser({path:"shared",level:3})}catch(e){inner=""}
 if(!inner){
  let rows=[];try{rows=(UP_CONNECT||[]).filter(r=>/Inflation|Fiscal|Balance/.test(r.c)).slice(0,3)}catch(e){}
  inner=rows.length?`<div class="ac-rows">${rows.map(r=>`<article class="ac-row"><h3>${esc(r.c)}</h3>
    <div class="ac-p p-ib"><span class="fx-tag ib">IB DP perspective</span><p>${esc(r.ib)}</p></div>
    <div class="ac-p p-up"><span class="fx-tag upsc">UPSC perspective</span><p>${esc(r.up)}</p></div></article>`).join("")}</div>`:"";
 }
 return `<section class="fx-section fx-across" aria-labelledby="ac-h"><div class="fx-wrap">
  ${fxSecHead("07","One concept. Two perspectives.","Economics across two learning pathways","The same idea, inflation or a budget deficit, is the same idea in Geneva and in New Delhi. What changes is the question you will be asked about it.","ac-h")}
  ${inner}
 </div></section>`;
}

/* ── the Arjun Agrawal Academic Ecosystem ──────────────────────────────────
   Three independent platforms from the same educator, each panel in its own
   platform's colours: Economics on this platform's charcoal and gold, The
   Business Brief on its warm paper and navy, Political Studies & Global
   Affairs on midnight with burgundy. The section is unnumbered and carries no
   pathway colour, because it is the wider ecosystem, not a third pathway. The
   panels are typographic, each with a small drawn mark: no screenshots of the
   other platforms are used. */
function fxEcosystem(){
 return `<section class="fx-section fx-eco" aria-labelledby="eco-h"><div class="fx-wrap">
  <div class="eco-head rv"><div><p class="fx-kicker eco-k">The Arjun Agrawal Academic Ecosystem · Knowledge. Insight. Impact.</p>
   <h2 class="fx-h2" id="eco-h">One educator. Three disciplines. <em>One connected learning ecosystem.</em></h2></div>
   <p class="fx-lede">Economics, Politics and Business: three independent academic platforms, each with its own subject, examinations and design, from the same educator. This one is the home of Economics.</p></div>
  <ol class="eco-grid rv">${FX_ECO.map(fxEcoCard).join("")}</ol>
 </div></section>`;
}

/* ── 8 · about ──────────────────────────────────────────────────────────── */
function fxAboutBand(){
 let facts=[];try{facts=CV_AUTHOR}catch(e){}
 let por="";try{por=`<img src="${esA(CV_PORTRAIT.src)}" width="${CV_PORTRAIT.w}" height="${CV_PORTRAIT.h}" alt="${esA(CV_PORTRAIT.alt)}" loading="lazy" decoding="async">`}catch(e){}
 return `<section class="fx-section fx-aboutb" aria-labelledby="ab-h"><div class="fx-wrap abx-grid">
  <figure class="ab-por rv">${por}</figure>
  <div>${fxSecHead("08","About","Arjun Agrawal","","ab-h")}
   <p class="ab-roles">${esc(FXI.roles)}</p>
   <p class="fx-lede">Arjun teaches IB Diploma Programme Economics, mentors Civil Services aspirants in the Economics of General Studies, and designs the resources on this platform, from the diagrams and mindmaps to the handbooks. He is the author of <a class="fx-a" href="#/book"><i>The Indian Economy</i></a> (First Edition, 2026-27).</p>
   <dl class="ab-facts">${facts.map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
   <p><a class="fx-btn secondary" href="#/about">About Arjun Agrawal ${fxArr()}</a></p></div>
 </div></section>`;
}

/* ── 9 · enrolment and contact ──────────────────────────────────────────── */
function fxEnqRow(k){const e=FX_ENQ[k];if(!e)return "";const l=fxEnquiryLinks(k);
 return `<li><span class="eq-n">${esc(e.label)}</span><span class="eq-a"><a class="fx-a" href="${esA(l.wa)}" target="_blank" rel="noopener noreferrer" aria-label="${esA(e.label)}: message on WhatsApp">WhatsApp</a><a class="fx-a" href="${esA(l.mail)}" aria-label="${esA(e.label)}: send an email">Email</a></span></li>`}
function fxContactCols(){
 return `<div class="cnx-grid rv">
   <div class="cnx-col p-ib"><h3><span class="fx-tag ib">IB DP Economics</span></h3><ul>${["ibTutoring","ibIA","ibEE","ibResources","ibTeachers"].map(fxEnqRow).join("")}</ul>
    <p><a class="fx-a fx-link" href="${esA(fxHref("tutorials",0))}">Tutorials: sessions and terms</a></p></div>
   <div class="cnx-col p-up"><h3><span class="fx-tag upsc">UPSC CSE Economics</span></h3><ul>${["upHandbooks","upCourse","upMentor","upResources"].map(fxEnqRow).join("")}</ul>
    <p><a class="fx-a fx-link" href="${esA(fxUpHref("course"))}">The 3-month programme</a></p></div>
  </div>`;
}
function fxContactBand(){
 return `<section class="fx-section fx-contact" aria-labelledby="ct-h"><div class="fx-wrap">
  ${fxSecHead("09","Enrolment and contact","Learn with Arjun Agrawal","Every enquiry opens your own WhatsApp or email with the message written for you. Nothing is booked or charged on this site.","ct-h")}
  ${fxContactCols()}
  <p class="cnx-book"><span class="eq-n"><i>The Indian Economy</i>: purchasing enquiries</span><span class="eq-a"><a class="fx-a" href="${esA(fxEnquiryLinks("book").wa)}" target="_blank" rel="noopener noreferrer" aria-label="The Indian Economy, purchasing enquiry: message on WhatsApp">WhatsApp</a><a class="fx-a" href="${esA(fxEnquiryLinks("book").mail)}" aria-label="The Indian Economy, purchasing enquiry: send an email">Email</a></span></p>
  <p class="cnx-direct"><a class="fx-a" href="${esA("mailto:"+FX_CONTACT.email())}">${esc(FX_CONTACT.email())}</a> · <a class="fx-a" href="${esA(fxWa())}" target="_blank" rel="noopener noreferrer">WhatsApp ${esc(FX_CONTACT.phone())} ↗</a>${FX_CONTACT.linkedin()?` · <a class="fx-a" href="${esA(FX_CONTACT.linkedin())}" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>`:""}${FX_CONTACT.instagram()?` · <a class="fx-a" href="${esA(FX_CONTACT.instagram())}" target="_blank" rel="noopener noreferrer">Instagram ↗</a>`:""}</p>
 </div></section>`;
}

/* ── the Contact page: the two pathways' enquiries come first ───────────── */
function fxContactPaths(){
 return `<section class="fx-section fx-contact cnx-page" aria-labelledby="cnx-h"><div class="fx-wrap">
  <header class="fx-section-head"><span class="fx-kicker">Two pathways</span><h2 class="fx-h2" id="cnx-h">What would you like to ask about?</h2>
   <p class="fx-lede">Choose an enquiry and your own WhatsApp or email opens with the message written for you. Nothing is booked or charged on this site, and nothing you choose here is stored.</p></header>
  ${fxContactCols()}
 </div></section>`;
}
(function(){
 const prev=VIEWS.contact;if(typeof prev!=="function")return;
 VIEWS.contact=function(){const h=prev.apply(this,arguments);const i=h.indexOf("</section>");
  return i<0?h+fxContactPaths():h.slice(0,i+10)+fxContactPaths()+h.slice(i+10)};
})();

VIEWS.home=function(){
 /* a teacher's assignment link (#assign=…) opens on the home page, so its banner leads it, as before */
 let asn="";try{if(typeof assignBanner==="function")asn=assignBanner()}catch(e){asn=""}
 let book="";try{book=bkHomeFeature()+bkHomeCompanion()}catch(e){book=""}
 return `${asn}<div class="fxhome">${fxHero()}${book}${fxThink()}${fxIbEnv()}${fxUpEnv()}${fxResources()}${fxLab()}${fxAcross()}${fxEcosystem()}${fxAboutBand()}${fxContactBand()}</div>`;
};

/* ── the IB DP landing's opening ────────────────────────────────────────── */
function fxIbIntro(){
 const gs=fxIbGroups();
 return `<section class="ibl" aria-labelledby="ibl-h"><div class="fx-wrap ibl-in">
  <div class="ibl-head"><div class="fx-kicker">Pathway 01</div><h1 class="ibl-h" id="ibl-h">IB DP Economics</h1>
   <p class="fx-lede">A complete interactive learning environment for IB Diploma Programme Economics students and educators: the course, the models, the real world, the examinations and the research.</p></div>
  <nav class="ibl-doors" aria-label="The IB DP environment">${gs.map(g=>`<a class="ibl-door" href="${esA((g.items[0]||{}).href||"#/ib")}"><b>${esc(g.n)}</b><span>${esc(g.d)}</span></a>`).join("")}</nav>
 </div></section>`;
}

/* ── the welcome dialogue belongs to the IB DP workspace ────────────────
   It asks for a name and an IB level, so it now opens the first time a
   visitor enters the IB DP environment rather than over the shared home
   page or the UPSC pages. What it stores is unchanged. */
const FX_OB={pending:false};
(function(){
 if(typeof bootOnboarding!=="function")return;
 const prev=bootOnboarding;
 bootOnboarding=function(){
  if(fxPathway(VIEW)!=="ib"){FX_OB.pending=true;return}
  FX_OB.pending=false;return prev.apply(this,arguments);
 };
 FX_OB.run=prev;
})();
(function(){
 const prev=render;
 render=function(){const r=prev.apply(this,arguments);
  try{if(FX_OB.pending&&fxPathway(VIEW)==="ib"){FX_OB.pending=false;setTimeout(()=>{try{bootOnboarding()}catch(e){}},300)}}catch(e){}
  return r};
})();
