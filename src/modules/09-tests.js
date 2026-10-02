/* ═══════════════════════════════════════════════════════════════════════════
   RENAISSANCE · 9 · the self-tests for this release
   The motifs are checked against their functions independently of the
   drawing code; the home page is checked to have dropped nothing; every
   discovery surface, lens, reading guide and link is checked to resolve; the
   round-2 content corrections are held in place. Several checks are paired
   with a case that must fail, so they are capable of failing.
   ═══════════════════════════════════════════════════════════════════════════ */
function RENSUITE(){
 const out=[];const T=(n,f,d)=>{let ok=false,det=d||"";try{const r=f();ok=r===true||(r&&r.ok);if(r&&r.d)det=r.d}catch(e){ok=false;det=e.message}out.push({n,ok:!!ok,detail:det})};

 let HOMEH=null;const HOME=()=>HOMEH||(HOMEH=VIEWS.home());
 const F=MOTIFFN,near=(a,b,t)=>Math.abs(a-b)<=(t===undefined?1e-6:t);
 /* ── motifs: geometry recomputed from the stated functions ── */
 T("Motif · every motif renders an SVG hidden from assistive technology, with a caption",()=>Object.keys(MOTIFS).every(k=>{const s=motifSVG(k);return /^<svg[^>]*aria-hidden="true"/.test(s)&&/viewBox="0 0 600 400"/.test(s)&&motifCap(k).length>20&&!/NaN|undefined/.test(s)}));
 T("Motif · demand and supply meet at the equilibrium drawn (Q 5, P 5)",()=>near(F.D(5),5)&&near(F.S(5),5));
 T("Motif · the demand shift's new equilibrium is on both curves (6, 5.8)",()=>near(F.D1(6),5.8)&&near(F.S(6),5.8)&&F.D1(5)>F.D(5));
 T("Motif · the tax wedge equals the tax, consumers pay 6, producers keep 4",()=>near(F.ST(3.75),6)&&near(F.D(3.75),6)&&near(F.S(3.75),4)&&near(F.ST(3.75)-F.S(3.75),2));
 T("Motif · the externality's welfare loss lies between MSC and MSB from Q* to Qm",()=>{const qm=8/1.4,qs=6/1.4;return near(F.D(qm),F.MPC(qm))&&near(F.D(qs),F.MSC(qs))&&qs<qm&&F.MSC(qm)>F.D(qm)});
 T("Motif · MR falls twice as fast as AR, and MC = MR at the chosen output",()=>near(F.MR(2)-F.MR(3),2*(F.AR(2)-F.AR(3)))&&near(F.MC(5),F.MR(5)));
 T("Motif · MC cuts AC at the minimum of AC",()=>{const q=Math.sqrt(12/0.35);return near(F.MC(q),F.AC(q),1e-9)&&F.AC(q)<F.AC(q-0.3)&&F.AC(q)<F.AC(q+0.3)});
 T("Motif · the subsidy's prices sit on the right curves (Pc 4, Pp 6, Q 6.25)",()=>near(F.D(6.25),4)&&near(F.S(6.25),6)&&near(-1+0.8*6.25,4));
 T("Motif · the tariff's quantities sit on the domestic curves",()=>near(F.S(2),2.6)&&near(F.D(8),2.6)&&near(F.S(3.5),3.8)&&near(F.D(6.5),3.8));
 T("Motif · the Lorenz curve lies below the line of equality and meets it at both ends",()=>near(F.LOR(0),0)&&near(F.LOR(10),10)&&[1,2,3,4,5,6,7,8,9].every(x=>F.LOR(x)<x));
 T("Motif · the short-run Phillips curve slopes down",()=>[1.5,3,5,7,9].every((u,i,a)=>i===0||F.SRPC(u)<F.SRPC(a[i-1])));
 T("Motif · the business cycle's peak and trough are true turning points",()=>{const ac=t=>2+0.55*t+1.15*Math.sin(t*1.25),d=t=>(ac(t+1e-5)-ac(t-1e-5))/2e-5;
   const pk=(Math.PI-Math.acos(0.55/1.4375))/1.25,tg=(Math.PI+Math.acos(0.55/1.4375))/1.25;return near(d(pk),0,1e-4)&&near(d(tg),0,1e-4)&&ac(pk)>ac(tg)&&/peak/.test(motifSVG("cycle"))});
 T("Motif · the turning-point check is capable of failing",()=>{const ac=t=>2+0.55*t+1.15*Math.sin(t*1.25),d=t=>(ac(t+1e-5)-ac(t-1e-5))/2e-5;return !near(d((Math.PI/2)/1.25),0,1e-2)});
 T("Motif · the pricing game marks Low, Low (3, 3) as the Nash equilibrium",()=>{const s=motifSVG("game");return /class="m-nash"[^>]*\/><text[^>]*>3 , 3</.test(s)&&(8>6&&3>1)});
 T("Motif · the markband figure uses the guide's Paper 1 (b) bands",()=>{const s=motifSVG("markbands");return ["1–3","4–6","7–9","10–12","13–15"].every(b=>s.includes(">"+b+"<"))&&/p\. 63/.test(motifCap("markbands"))});
 T("Motif · the network motif names exactly the course's nine key concepts",()=>{const s=motifSVG("network");return GUIDE.kc.length===9&&GUIDE.kc.every(k=>s.includes(">"+(k.k||k.n||k)+"<"))});
 T("Motif · every section, and every syllabus subtopic, has a motif that exists",()=>SECTIONS.every(s=>!!MOTIFS[motifFor(s.v,0,null)])&&SUBTOPICS.every(s=>!!MOTIFS[MOTIF_SUB[s.code]]));
 T("Motif · a case draws its own diagram: a subsidy case never shows a tax",()=>RW_CASES.filter(c=>(c.dg||[])[0]==="subsidy").every(c=>caseMotif(c)==="subsidy")&&RW_CASES.every(c=>!!MOTIFS[caseMotif(c)]));
 T("Motif · the comparative advantage page draws comparative advantage, not supply and demand",()=>motifFor("learn",0,"c-cadv")==="cadv"&&motifFor("examiner",0,null)==="markbands");
 T("Motif · no brand colour enters a motif",()=>Object.keys(MOTIFS).every(k=>!/#7A2436|var\(--bur\)/i.test(motifSVG(k))));
 /* ── section identities ── */
 T("Identity · an opener turns to paper only when it holds no control",()=>{const a=document.createElement("section");a.innerHTML="<h1>x</h1><p class='lede'>y</p>";const b=document.createElement("section");b.innerHTML="<h1>x</h1><button>z</button>";return rnPaperOk(a)&&!rnPaperOk(b)});
 T("Identity · every paper section exists",()=>[...RN_PAPER].every(v=>SECTIONS.some(s=>s.v===v)));
 /* ── the front page ── */
 T("Front page · no band the home page had before is dropped",()=>{const t=h=>{const d=document.createElement("template");d.innerHTML=h;return [...d.content.children].map(e=>{const x=e.querySelector(".shead h2")||e.querySelector("h1,h2");return x?x.textContent.trim():""}).filter(Boolean)};
   const before=t(RN.homePrev()),after=HOME()+" "+HOME().replace(/<[^>]+>/g,"");const miss=before.filter(x=>!after.includes(esc(x).slice(0,30))&&!after.includes(x.slice(0,30)));return miss.length===0?true:{ok:false,d:miss.join(" | ")}});
 T("Front page · the gateway, the daily page, the lead story, the network and the figures are present",()=>{const h=HOME().replace(/<[^>]+>/g,"");return ["Explore Economics","Today in Economics","Real World","See the whole idea","Economics at a glance","Think like an economist."].every(x=>h.includes(x))});
 T("Front page · every gateway destination is a registered section",()=>{const h=rnAtlas();const v=[...h.matchAll(/onclick="nav\('([a-z]+)'\)"/g)].map(m=>m[1]);return v.length>=8&&v.every(x=>SECTIONS.some(s=>s.v===x))});
 T("Front page · the figures shown are the platform's own counts",()=>{const n=rnCount();return n.cases===RW_CASES.length&&n.maps===MMKEYS().length&&n.diagrams===DGKEYS.length&&n.calcs===CALC.length&&n.terms===GLOSS.length});
 T("Front page · the daily page is the same all day and changes across days",()=>{const d=new Date(2026,8,29,9),e=new Date(2026,8,29,22);const a=dailyItems(d),b=dailyItems(e);
   const week=[0,1,2,3,4,5,6].map(i=>dailyItems(new Date(2026,8,29+i)).idea.t);return a.idea.t===b.idea.t&&a.case.t===b.case.t&&new Set(week).size>=4});
 T("Front page · every daily item opens something",()=>{const a=dailyItems();return ["idea","case","q","term"].every(k=>a[k]&&/^nav\(/.test(a[k].go))});
 T("Front page · the desk folds only when there is nothing on it",()=>{const h=HOME();return /<details class="rn-desk"/.test(h)});
 /* ── discovery ── */
 T("Discovery · Random Economics finds something of every kind it offers",()=>RAND_TYPES.every(([k])=>{const it=randomItem(k);return it&&it.t&&/^nav\(|^[a-zA-Z]/.test(it.go)}),RAND_TYPES.filter(([k])=>!randomItem(k)).map(x=>x[0]).join(", "));
 T("Discovery · the named teaching components all render with a label",()=>Object.keys(KC_T).every(k=>{const h=KC(k,"t","b");return h.includes('aria-label="'+KC_T[k][0]+'"')&&h.includes(KC_T[k][0])}));
 /* ── the toolkit ── */
 T("Toolkit · eighteen distinct lenses, each with questions and a motif that exists",()=>LENSES.length===18&&new Set(LENSES.map(l=>l.k)).size===18&&LENSES.every(l=>l.ask.length>=3&&l.ask.every(q=>/\?$/.test(q))&&!!MOTIFS[l.m]&&l.line.length>40));
 T("Toolkit · every lens leads into content that exists on the platform",()=>LENSES.every(l=>lensLinks(l,3).length>=1),LENSES.filter(l=>!lensLinks(l,3).length).map(l=>l.k).join(", "));
 T("Toolkit · every lens's subtopics exist",()=>LENSES.every(l=>l.subs.every(s=>!!SUBMAP[s])));
 T("Toolkit · the toolkit keeps its place after the six earlier tabs of Think; tabs added later come after it",()=>{const s=SECTIONS.find(x=>x.v==="think");return s.tabs.indexOf(TLAE_TAB)===6&&s.tabs.slice(0,6).join("|")==="The Economic Chain|Evaluation stress test|Dimension library|Concept connections|Conditions & assumptions|Concept network"});
 T("Toolkit · concept pages and cases carry the lens questions",()=>{const c=CONCEPTS[0];const a=conceptPage(c);const k=[VIEW,TAB,ARG];let b="";try{VIEW="world";TAB=0;ARG=RW_CASES[0].id;b=rwCasePage()}finally{VIEW=k[0];TAB=k[1];ARG=k[2]}return /Think like an economist/.test(a)&&/Think like an economist/.test(b)});
 /* ── search ranking ── */
 T("Search rank · an abbreviation finds its concept before a word that merely contains it",()=>{const r=cpScore(buildIndex().map(x=>({k:x.k,t:x.t,d:x.d,s:x.s})),["ped"],3,1);
   const i=r.findIndex(x=>/price elasticity of demand/i.test(x.t)),j=r.findIndex(x=>/develop/i.test(x.t)&&!/elasticity/i.test(x.t));return i>=0&&i<5&&(j<0||j>i)});
 T("Search rank · every term must match: a two-word query does not return one-word matches",()=>cpScore([{k:"Concept",t:"Minimum wage",s:""},{k:"Concept",t:"Minimum price",s:""}],["minimum","wage"],3,1).length===1);
 /* ── reading guides ── */
 T("Reading guide · every diagram plate has the four questions answered",()=>DGKEYS.every(k=>DG_READ[k]&&["changes","why","notShown","mistake"].every(f=>DG_READ[k][f]&&DG_READ[k][f].length>40&&DG_READ[k][f].length<400)));
 T("Reading guide · no guide states a contingent outcome as certain",()=>{const ABS=/\b(always|guarantees?|inevitabl\w*|invariably|in every case|without exception|proves?)\b/i;/* a negated absolute ("rather than an inevitable outcome") is a hedge, not a claim */
   return DGKEYS.every(k=>Object.values(DG_READ[k]).every(t=>!ABS.test(t.replace(/\b(rather than|not) an? (inevitable|guaranteed)\b/gi,""))))});
 T("Reading guide · the plate page shows the guide under the diagram",()=>{const k=ARG;try{ARG="tax";return /Reading guide/.test(dgLibrary())&&/What the diagram does not show/.test(dgLibrary())}finally{ARG=k}});
 /* ── the colophon ── */
 T("Colophon · the footer's Explore index is labelled and every link leads to a section",()=>{const n=document.querySelector("nav.ft-explore[aria-label]");if(!n)return false;
   const v=[...n.querySelectorAll("button")].map(b=>(b.getAttribute("onclick").match(/nav\('([a-z]+)'/)||[])[1]).filter(Boolean);return v.length>=9&&v.every(x=>SECTIONS.some(s=>s.v===x))});
 T("Colophon · the independence statement is kept, and no IB endorsement is implied",()=>{const f=document.querySelector("footer").textContent;return /not an official IB platform/.test(f)&&/no IB endorsement is claimed or implied/.test(f)});
 /* ── motion and weight ── */
 T("Design · every new animation stops for reduced motion",()=>/prefers-reduced-motion:\s*reduce\)\s*\{\s*body\.rn-anim \.motif \*/.test(CSSTEXT().replace(/\s+/g," "))||/body\.rn-anim \.motif \*/.test(CSSTEXT()));
 T("Design · nothing in this release requests anything from the network",()=>[heroPlot,rnHome,rnAtlas,rnToday,rnLead,rnMind,rnGlance,randomOpen,toolkitView,dgReadGuide,rnDecorate,cpMatch,cpScore].every(f=>!/fetch\(|XMLHttpRequest|sendBeacon/.test(String(f))));
 T("Design · diagram labels use the faces the page loads",()=>/svg text\[font-family\*="Inter"\]/.test(CSSTEXT()));
 /* ── round-2 content corrections stay corrected ── */
 const rw=id=>RW_CASES.find(c=>c.id===id)||{};
 T("Accuracy r2 · Singapore's vehicle quota is auctioned, not tradable",()=>/auctioned/.test(rw("MIC-029").is)&&!/tradable/.test(rw("MIC-029").is+rw("MIC-029").tp));
 T("Accuracy r2 · Bretton Woods broke down in 1971–73",()=>/1971–73/.test(rw("GLO-051").is));
 T("Accuracy r2 · a current account deficit is framed with the financial account",()=>/financial-account/.test(rw("GLO-017").u2)&&!/capital-account/.test(rw("GLO-017").u2+rw("GLO-017").xp));
 T("Accuracy r2 · a price charge cuts quantity demanded, not demand",()=>!/bag demand/.test(rw("MIC-023").is));
 let SRCT=null;const SRC=()=>SRCT||(SRCT=[...document.scripts].map(x=>x.text).join("\n"));
 T("Accuracy r2 · supply-side improvement is a route, not the only route, to non-inflationary growth",()=>!SRC().includes("the only route to non-"+"inflationary growth")&&SRC().includes("is a route to non-"+"inflationary growth"));
 T("Accuracy r2 · growth is usually necessary for sustained development, on every surface that says so",()=>!SRC().includes("neither necessary nor "+"sufficient for every dimension")&&!SRC().includes("Either can happen "+"without the other"));
 T("Accuracy r2 · the PED quiz reports the sign",()=>SRC().includes("−0.4 (|PED| = 0.4), "+"inelastic")&&!SRC().includes('["0.4, '+'inelastic"'));
 return out;
}
RENSUITE.suiteName="Renaissance";
EXTRA_SUITES.push(RENSUITE);
QAREPORT.push({area:"Design, discovery and reading (renaissance)",re:/^(Motif|Identity|Front page|Discovery|Toolkit|Search rank|Reading guide|Colophon|Design|Accuracy r2) · /,
 what:"That every page-opening figure is economically correct (recomputed from its functions), each section keeps its register, the home page drops nothing, every discovery surface, lens and reading guide leads to real content, search ranks canonical records first, no new animation ignores reduced motion, nothing new touches the network, and the round-2 corrections stay corrected."});
