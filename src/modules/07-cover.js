/* ═══════════════════════════════════════════════════════════════════════════
   COVER · the home page opens as an editorial cover and a working model
   Three zones that never overlap: the statement, a supply-and-demand plate
   the reader can move, and the author's portrait in its own frame. The plate
   and the portrait are separate grid cells, so no line, label or axis can run
   under the photograph at any width. Every number on the cover is counted
   from the platform's data; every concept on the plate opens its page.
   ═══════════════════════════════════════════════════════════════════════════ */
const CV={s:0};
/* The photographs are embedded once, as data URIs. Pasting a 100-200 KB data
   URI into the home page's markup on every paint doubled its size, so each
   photograph is decoded once into an in-memory blob and referenced by URL. */
const RN_PH={};
function photoURL(k){if(RN_PH[k])return RN_PH[k];
 try{const d=PHOTO[k],i=d.indexOf(","),bin=atob(d.slice(i+1)),u=new Uint8Array(bin.length);for(let j=0;j<bin.length;j++)u[j]=bin.charCodeAt(j);
  RN_PH[k]=URL.createObjectURL(new Blob([u],{type:"image/jpeg"}))}catch(e){RN_PH[k]=PHOTO[k]}return RN_PH[k]}
/* the plate's functions: D₁ is D shifted right by s units; S is fixed */
const CVF={D:(q,s)=>9-0.8*(q-s),S:q=>1+0.8*q,eq:s=>({q:5+s/2,p:5+0.4*s})};
/* the plate is drawn a little taller than wide-screen proportions, so the model fills its figure; Y0 is the quantity axis */
const CV_W=600,CV_H=630,CV_Y0=556,cx=q=>+(70+q/10*490).toFixed(1),cy=p=>+(CV_Y0-p/10*500).toFixed(1);
function cvLine(f,a,b){return `${cx(a)},${cy(f(a))} ${cx(b)},${cy(f(b))}`}
function cvSVG(){const s=CV.s,e0=CVF.eq(0),e=CVF.eq(s);
 const dq=[Math.max(0.6,s+0.2),Math.min(10,10+s)];
 let g=`<g class="m-ax"><line x1="70" y1="${CV_Y0}" x2="70" y2="36"/><line x1="70" y1="${CV_Y0}" x2="572" y2="${CV_Y0}"/></g>
  <text class="m-t m-axl" x="62" y="26">Price</text><text class="m-t m-axl" x="572" y="${CV_Y0+48}" text-anchor="end">Quantity</text>`;
 if(s!==0)g+=`<polyline class="m-c dem dsh cv-d0" points="${cvLine(q=>CVF.D(q,0),0.6,10)}"/><text class="m-t m-dem" x="${cx(10)-2}" y="${cy(CVF.D(10,0))+20}" text-anchor="end">D</text>`;
 g+=`<polyline class="m-c dem cv-d" points="${cvLine(q=>CVF.D(q,s),dq[0],dq[1])}" pathLength="1"/>
  <text class="m-t m-dem" x="${cx(dq[1])-2}" y="${cy(CVF.D(dq[1],s))+20}" text-anchor="end">${s===0?"D":"D₁"}</text>
  <polyline class="m-c sup cv-s" points="${cvLine(CVF.S,0.6,10)}" pathLength="1"/><text class="m-t m-sup" x="${cx(10)-2}" y="${cy(CVF.S(10))-9}" text-anchor="end">S</text>
  <g class="m-drop"><line x1="${cx(e.q)}" y1="${cy(e.p)}" x2="${cx(e.q)}" y2="${CV_Y0}"/><line x1="${cx(e.q)}" y1="${cy(e.p)}" x2="70" y2="${cy(e.p)}"/></g>
  <text class="m-t m-tick" x="${cx(e.q)}" y="${CV_Y0+24}" text-anchor="middle">${s===0?"Qe":"Q₁"}</text><text class="m-t m-tick" x="62" y="${cy(e.p)+4}" text-anchor="end">${s===0?"Pe":"P₁"}</text>`;
 if(s!==0)g+=`<circle class="m-pt cv-e0" cx="${cx(e0.q)}" cy="${cy(e0.p)}" r="4.5"/>`;
 g+=`<circle class="m-pt" cx="${cx(e.q)}" cy="${cy(e.p)}" r="6"/><circle class="m-ring" cx="${cx(e.q)}" cy="${cy(e.p)}" r="15"/>`;
 return `<svg class="motif cv-svg" viewBox="0 0 ${CV_W} ${CV_H}" role="img" aria-label="${esc(cvAlt())}" focusable="false">${g}</svg>`}
function cvAlt(){const s=CV.s,e=CVF.eq(s);
 return s===0?"Supply and demand in equilibrium at price 5 and quantity 5 (illustrative units)."
  :`Demand has shifted ${s>0?"right":"left"} by ${Math.abs(s)} units. The new equilibrium is at price ${e.p.toFixed(1)} and quantity ${e.q.toFixed(1)}, ${s>0?"both higher":"both lower"} than before (illustrative units).`}
function cvRead(){const s=CV.s,e=CVF.eq(s);
 if(s===0)return "Move demand and watch the market find a new equilibrium.";
 return s>0?`Demand rises: at the old price there is a shortage, so price rises (to ${e.p.toFixed(1)}) until quantity supplied meets quantity demanded (${e.q.toFixed(1)}).`
  :`Demand falls: at the old price there is a surplus, so price falls (to ${e.p.toFixed(1)}) until the market clears again (${e.q.toFixed(1)}).`}
function cvSet(v){CV.s=+v;const p=document.getElementById("cv-plate-fig"),r=document.getElementById("cv-read");
 if(p)p.innerHTML=cvSVG();if(r)r.textContent=cvRead();
 CV_SPOTS.forEach(([,f],i)=>{const b=document.getElementById("cv-spot-"+i);if(b){const [x,y]=cvPos(f);b.style.left=x+"%";b.style.top=y+"%"}})}
/* concepts on the plate, each a way into the platform */
/* hotspot positions are computed from the model, as percentages of the plate, so they follow a shift;
   the demand point never sits beyond the drawn end of the curve */
const CV_SPOTS=[["Demand",s=>{const q=Math.max(1.2,2.2+s);return [q,CVF.D(q,s)]},"nav('learn',0,'c-ped')","The curve that moves"],["Supply",()=>[8,CVF.S(8)],"nav('mind',0,'supply')","How sellers respond"],
 ["Equilibrium",s=>{const e=CVF.eq(s);return [e.q,e.p]},"nav('mind',0,'market')","Where plans agree"]];
const cvPos=f=>{const [q,p]=f(CV.s);return [(cx(q)/CV_W*100).toFixed(2),(cy(p)/CV_H*100).toFixed(2)]};
/* who the author is, stated only from the supplied profile (ABOUT, ABOUT2): no degree, date or title is added */
const CV_AUTHOR=[["Studied","Economics, St. Stephen's College, University of Delhi"],["Taught","Undergraduate Economics, Fergusson College, Pune"],
 ["Teaches","IB DP Economics, Business Management and Global Politics"],["Mentors","UPSC Civil Services aspirants in Economics"]];
/* The cover leads with the platform's signature, "Think like an economist.", then
   the idea behind it, one line on what the platform is, and two actions: explore
   the economics on this page, or open the Resource hub. The author signature is
   its own cell, so it can sit level with the foot of the figures on a wide screen
   and after the live model on a phone. Its portrait is the original photograph,
   cropped to 4:5 (assets/brand/arjun-agrawal-portrait-4x5.webp, made from
   assets/brand/arjun-agrawal-portrait.jpg, which is kept unchanged). */
const CV_PORTRAIT={src:"assets/brand/arjun-agrawal-portrait-4x5.webp",w:432,h:540,
 alt:"Arjun Agrawal, in a navy blazer and tie, smiling, in front of a stone wall."};
function rnCover(old){
 const f2=(typeof ldPrev==="function")?ldPrev("price-elasticity-of-demand",0):null,f3=(typeof ldPrev==="function")?ldPrev("price-elasticity-of-demand",1):null;
 const fig=(n,p,cap,href,cls)=>p?`<figure class="at-fig ${cls}"><a class="at-fl" href="${href}">${stImg(p,"",true)}</a><figcaption><span class="at-fn">Fig. ${n}</span> ${cap}</figcaption></figure>`:"";
 return `<section class="hero rn-home cv at-hero" aria-labelledby="cv-h"><div class="wrap full in at-hgrid">
  <div class="cv-copy at-copy">
   <div class="eb">IB DP Economics</div>
   <h1 class="cv-h at-brand" id="cv-h"><span class="ab-1">Think like</span> <span class="ab-2">an economist.</span></h1>
   <p class="at-head">Economics is not just a subject to study. It is a way to understand the world.</p>
   <p class="cv-lede">An interactive IB DP Economics learning ecosystem connecting economic concepts, visual understanding, real-world evidence and exam thinking.</p>
   <div class="row cv-cta"><button class="btn lg a" onclick="cvExplore()">Explore Economics <span aria-hidden="true">→</span></button><a class="btn lg on-ink" href="#/resources">Explore Resources</a></div></div>
  <figure class="cv-portrait at-sig"><div class="at-sigf"><img src="${CV_PORTRAIT.src}" alt="${esc(CV_PORTRAIT.alt)}" width="${CV_PORTRAIT.w}" height="${CV_PORTRAIT.h}" decoding="async" fetchpriority="high"></div>
   <figcaption><span class="at-sigk">Created by</span><b>Arjun Agrawal</b><span class="at-sigt">IB DP Economics Educator and Resource Designer</span>
    <span class="at-sigl"><button class="lnk" onclick="nav('about')">About the author</button><a class="lnk" href="#/studio">The Learning Studio</a></span></figcaption></figure>
  <div class="at-figs" role="group" aria-label="One idea, three figures: a live market model and two diagrams from the elasticity explainer">
   <figure class="at-fig at-f1"><div class="cv-plate"><div class="cv-plate-in"><div id="cv-plate-fig">${cvSVG()}</div>
     ${CV_SPOTS.map(([t,f,go,d],i)=>{const [x,y]=cvPos(f);return `<button class="cv-spot" id="cv-spot-${i}" style="left:${x}%;top:${y}%" onclick="${go}" aria-label="${esc(t)}: ${esc(d)}. Open it"><span class="cv-dot" aria-hidden="true"></span><span class="cv-tip"><b>${esc(t)}</b>${esc(d)} →</span></button>`}).join("")}</div>
    <label class="cv-ctl" for="cv-shift"><span>Move demand</span><input id="cv-shift" type="range" min="-2" max="2" step="0.5" value="${CV.s}" oninput="cvSet(this.value)" aria-describedby="cv-read"></label>
    <p class="cv-read" id="cv-read" aria-live="polite">${esc(cvRead())}</p></div>
    <figcaption><span class="at-fn">Fig. 1</span> The model, live: move demand, or tap a marked point. <span class="at-fu">Illustrative units.</span></figcaption></figure>
   ${fig(2,f2,"From the visual explainers: one price cut, two responses.","#/studio/visual-explainers/price-elasticity-of-demand","at-f2")}
   ${fig(3,f3,"From the visual explainers: with inelastic demand, a price rise raises revenue.","#/studio/visual-explainers/price-elasticity-of-demand","at-f3")}
  </div></div></section>`}
/* "Explore Economics" is the gateway band just below the cover: scroll to it and move focus with it */
function cvExplore(){const g=document.getElementById("explore");if(!g){nav("course");return}
 const h=g.querySelector("h2");g.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});
 if(h){h.setAttribute("tabindex","-1");h.focus({preventScroll:true})}}
/* ── the story continues: chapters and the bands they need ─────────────── */
function goTab(v,name){const s=SECTIONS.find(x=>x.v===v);const i=s&&s.tabs?s.tabs.indexOf(name):-1;return `nav('${v}',${i<0?0:i})`}
function rnBand(o){return `<section class="sec rn-band rn-split ${o.cls||""}"><div class="wrap full"><div class="sp-grid">
  <div class="sp-copy"><div class="shead fx"><span class="n">00</span><h2>${o.h}</h2>${o.aside?`<span class="aside">${esc(o.aside)}</span>`:""}</div>
   <p class="ed mt2">${o.lede}</p>${o.label?`<p class="xs mt2"><span class="tag">${esc(o.label)}</span></p>`:""}
   <ul class="sp-rooms mt3">${o.items.map(([t,d,go,tag])=>`<li><button class="sp-room" onclick="${go}"><span class="sp-t">${esc(t)}${tag?` <span class="sp-tag">${esc(tag)}</span>`:""}</span><span class="sp-d">${esc(d)}</span></button></li>`).join("")}</ul></div>
  <figure class="rn-fig sp-fig">${o.fig}</figure></div></div></section>`}
function rnLearnBand(){return rnBand({h:"Concepts, models and the course",aside:"The core, with depth when you want it",cls:"sp-learn",
 lede:"Every concept is stored as a mechanism, not a definition: what happens, what happens next, and who is affected. Open the core idea first; go deeper only when you choose to.",
 fig:`<span data-motif="flow"></span><figcaption>${esc(motifCap("flow"))}</figcaption>`,
 items:[["Concept spine","Twenty concepts, each told as a chain of cause and effect",goTab("learn","Concept spine"),""],
  ["The course at a glance","Units, real-world issues and the key concepts",goTab("course","At a glance"),""],
  ["Misconception lab","The mistakes that cost marks, and the correct idea",goTab("learn","Misconception lab"),""],
  ["Dictionary","Terms with their mechanism, not only their wording",goTab("course","Dictionary"),""],
  ["Command terms","What each instruction word asks you to do",goTab("course","Command terms"),""],
  ["Economics in 60 Seconds","One idea, one minute",goTab("learn","Economics in 60 Seconds"),""]]})}
function rnLabsBand(){return rnBand({h:"The laboratory",aside:"Every interaction teaches one thing",cls:"sp-lab",
 lede:"Move a curve and read what happens. Each lab is built from stated equations, so the diagram and the numbers cannot disagree, and each one names the idea it is there to teach.",
 fig:`<span data-motif="tax"></span><figcaption>${esc(motifCap("tax"))}</figcaption>`,
 items:[["Supply and demand","Shifts, movements, shortage and surplus",goTab("lab","Market lab"),""],
  ["Elasticity","PED, its sign and what happens to revenue",goTab("lab","Elasticity lab"),""],
  ["Indirect tax","The wedge, incidence, revenue and welfare loss","nav('everywhere',4,'tax')",""],
  ["Externalities","Private and social costs, and the output gap between them","nav('everywhere',4,'ext')",""],
  ["AD–AS","Output gaps, and what a shift does to prices and output",goTab("lab","AD-AS lab"),""],
  ["Trade","Opportunity cost, comparative advantage and the gains","nav('everywhere',4,'trade')",""],
  ["Exchange rates","Demand and supply of a currency; appreciation and depreciation","nav('everywhere',4,'fx')",""]]})}
function rnExamBand(){return rnBand({h:"The exam room",aside:"Assessment, read closely",cls:"sp-exam",
 lede:"Three papers, their markbands and the habits that earn marks. Practise under time, read your answer against the published framework, and study how past papers are built.",
 fig:`<span data-motif="markbands"></span><figcaption>${esc(motifCap("markbands"))}</figcaption>`,
 items:[["Paper 1 room","Extended response: plan, write and review against the clock",goTab("papers","Paper 1 workshop"),"Teacher-created practice"],
  ["Paper 2 room","Data response with its own stimulus and calculations",goTab("papers","Paper 2 data lab"),"Teacher-created practice"],
  ["Paper 3 room (HL)","Policy recommendation from a case",goTab("papers","Paper 3 recommendation lab"),"Teacher-created practice"],
  ["Exam DNA","How 212 past questions are built",goTab("dna","Past paper explorer"),"Analysed metadata"],
  ["Timed simulator","From a ten-minute drill to a full mock",goTab("papers","Exam simulator"),""],
  ["Why did I lose marks?","Read an answer against the markbands",goTab("examiner","Why did I lose marks?"),""],
  ["Mistake book","The pattern behind your errors",goTab("workspace","Mistake book"),"Your own work"],
  ["IB reference","Structure, weightings and markbands, with sources",goTab("examiner","IB reference"),"Official IB information"]]})}
function rnResearchBand(){return rnBand({h:"The research studios",aside:"IA and extended essay",cls:"sp-research",
 lede:"Research the way an economist does: find a question worth asking, choose the model, weigh the evidence, and reflect. The studios ask questions; they never write the work.",
 fig:`<span data-motif="research"></span><figcaption>${esc(motifCap("research"))}</figcaption>`,
 items:[["IA studio","Commentaries: rubric, portfolio and supervisor gates","nav('ia')",""],
  ["Article checker","Is this article a good basis for a commentary?",goTab("ia","Article checker"),""],
  ["Research question lab","Diagnoses a question on twelve dimensions",goTab("ees","Research question lab"),""],
  ["Evidence matrix","One row per source, with what it cannot show",goTab("ees","Evidence matrix"),""],
  ["Data lab","What data shows, suggests and does not establish",goTab("ees","Data lab"),""],
  ["Academic integrity and AI","Where AI help ends and your work begins",goTab("ees","Academic integrity & AI"),""],
  ["EE Studio","Nineteen areas, from interest to reflection","nav('ees')",""]]})}
function rnEducatorBand(){return rnBand({h:"For educators",aside:"Teaching, supervising, coordinating",cls:"sp-edu",
 lede:"A professional studio for IB Economics teachers: plan with the guide's structure, teach diagrams and real-world economics, assess with the markbands, and supervise research.",
 fig:`<span data-motif="ppc"></span><figcaption>${esc(motifCap("ppc"))}</figcaption>`,
 items:[["Educator Studio","Role pathways and a ten-module handbook","nav('educator')",""],
  ["Teacher desk","Lesson planner, exam builder, marking sheets","nav('teacher')",""],
  ["Assignment builder","A printable sheet and a link, with no server",goTab("teacher","Assignment builder"),""],
  ["Lesson planner","Success criteria, differentiation and extension",goTab("teacher","Lesson planner"),""],
  ["TOK × Economics","Knowledge questions for the classroom","nav('tok')",""]]})}
function rnCreatorBand(){const m=PHOTOMETA.teaching||PHOTOMETA.students,k=PHOTOMETA.teaching?"teaching":"students";
 return `<section class="sec rn-band rn-creator"><div class="wrap full"><div class="cr-grid">
  <figure class="cr-fig"><div class="cr-frame"><img src="${photoURL(k)}" alt="${esc(m.alt)}" width="${m.w}" height="${m.h}" style="object-position:${m.pos}" loading="lazy" decoding="async"></div>
   <figcaption>${esc(m.cap)}</figcaption></figure>
  <div class="cr-copy"><div class="shead fx"><span class="n">00</span><h2>The academic behind the platform</h2></div>
   <p class="cr-quote mt3">“${esc(ABOUT.lede)}”</p>
   <dl class="cv-auth cr-auth mt3">${CV_AUTHOR.map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
   <p class="ed mt3">Every model, case, question and tool here was written and drawn for this platform, and every statement about the IB course names the document it comes from.</p>
   <div class="row mt4"><button class="btn" onclick="nav('about')">About Arjun Agrawal</button><button class="btn gh" onclick="nav('arjun')">Watch the videos</button><button class="btn gh" onclick="nav('tutorials')">Learn with Arjun</button></div></div>
 </div></div></section>`}
function rnFinalBand(){return `<section class="sec rn-final bg-ink"><div class="wrap full fn-in">
  <h2 class="fn-h">Start exploring.</h2>
  <p class="fn-l">Pick a door. Every one of them leads to the rest.</p>
  <div class="row fn-row"><button class="btn lg a" onclick="nav('learn')">Start learning</button><button class="btn lg on-ink" onclick="randomOpen('')">Surprise me</button>
   <button class="btn lg gh on-ink" onclick="cpOpen()">Search the platform</button></div></div></section>`}
/* chapter marks, and the "economic horizon": the transition between chapters
   takes a different economic form at a few chosen points instead of the same
   rule everywhere. 01 is the hinge from the dark cover into the paper. */
const RN_HZ={"03":"grid","05":"eqm","07":"curve","09":"grid","11":"eqm"};
function rnHorizon(kind){
 if(kind==="eqm")return `<div class="hz hz-eqm" aria-hidden="true"><svg viewBox="0 0 1200 60" preserveAspectRatio="none"><path d="M0 52 C 300 50, 500 36, 600 30 S 900 10, 1200 8"/><path d="M0 8 C 300 10, 500 24, 600 30 S 900 50, 1200 52"/><circle cx="600" cy="30" r="3.2"/></svg></div>`;
 if(kind==="curve")return `<div class="hz hz-curve" aria-hidden="true"><svg viewBox="0 0 1200 60" preserveAspectRatio="none"><path d="M0 44 C 150 44, 200 16, 300 16 S 450 44, 600 44 S 750 16, 900 16 S 1050 44, 1200 44"/><line x1="0" y1="30" x2="1200" y2="30"/></svg></div>`;
 return `<div class="hz hz-grid" aria-hidden="true"></div>`}
function rnChapter(n,t){
 if(n==="01")return `<div class="rn-hinge"><div class="wrap full"><div class="rn-chap"><span class="ch-n">${n}</span><span class="ch-t">${esc(t)}</span></div>
  </div></div>`;
 return `${RN_HZ[n]?`<div class="wrap full">${rnHorizon(RN_HZ[n])}</div>`:""}<div class="wrap full rn-chap"><span class="ch-n">${n}</span><span class="ch-t">${esc(t)}</span></div>`}
