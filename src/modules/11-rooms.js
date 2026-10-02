/* ═══════════════════════════════════════════════════════════════════════════
   THE EXAM ROOMS and THE ELASTICITY LAB
   The exam area is one environment of named rooms, and each room says what
   kind of material it holds: official IB information, teacher-created
   practice, analysed metadata or the student's own work. The labels are the
   point: nothing teacher-made is presented as IB material.
   The elasticity lab joins the Lab as its last tab. The law of demand is
   built in (quantity moves against price), PED is reported with its sign and
   classified by its absolute value, and total revenue is drawn as the two
   rectangles a student is asked to compare.
   ═══════════════════════════════════════════════════════════════════════════ */
const EXAM_ROOMS=()=>[["Paper 1 room","papers","Paper 1 workshop","Teacher-created practice"],["Paper 2 room","papers","Paper 2 data lab","Teacher-created practice"],
 ["Paper 3 room (HL)","papers","Paper 3 recommendation lab","Teacher-created practice"],["Exam cockpit","examiner","Exam cockpit","Teacher-created tool"],
 ["Exam DNA","dna","Past paper explorer","Analysed metadata"],["What earns marks","dna","What earns marks","Analysed metadata"],
 ["Timed simulator","papers","Exam simulator","Teacher-created practice"],["Why did I lose marks?","examiner","Why did I lose marks?","Teacher-created tool"],
 ["Calculation room","calculate",null,"Teacher-created practice"],["Diagram practice","lab","Predict a diagram","Teacher-created practice"],
 ["Evaluation trainer","think","Evaluation stress test","Teacher-created tool"],["Command terms","course","Command terms","IB terms, explained here"],
 ["Mistake book","workspace","Mistake book","Your own work"],["IB reference","examiner","IB reference","Official IB information"]];
function examRooms(){const rooms=EXAM_ROOMS();
 return `<nav class="rooms" aria-label="The exam rooms"><div class="wrap full rooms-in"><span class="rooms-h">The exam rooms</span>
  <ul class="rooms-l">${rooms.map(([t,v,tab,src])=>{const s=SECTIONS.find(x=>x.v===v);const i=tab&&s&&s.tabs?s.tabs.indexOf(tab):0;const on=VIEW===v&&(tab?TAB===i:true);
   return `<li><button class="room${on?" on":""}" ${on?'aria-current="page"':""} onclick="nav('${v}',${Math.max(0,i)})"><span>${esc(t)}</span><small>${esc(src)}</small></button></li>`}).join("")}</ul></div></nav>`}
["examiner","papers","dna"].forEach(v=>{const prev=VIEWS[v];if(!prev)return;VIEWS[v]=function(){return examRooms()+prev.apply(this,arguments)}});
/* ── the elasticity lab ── */
const EL={up:true,p:10,q:5};           /* price change (%), direction, and the size of the quantity response (%) */
function elCalc(o){o=o||EL;const dp=(o.up?1:-1)*o.p,dq=(o.up?-1:1)*o.q;   /* quantity moves against price */
 const ped=dp===0?0:dq/dp,a=Math.abs(ped);
 const cls=o.q===0?"perfectly inelastic":a<1?"price inelastic":a===1?"unit elastic":"price elastic";
 const P0=10,Q0=100,P1=P0*(1+dp/100),Q1=Q0*(1+dq/100),TR0=P0*Q0,TR1=P1*Q1;
 return {dp,dq,ped,abs:a,cls,P0,Q0,P1,Q1,TR0,TR1,dTR:(TR1-TR0)/TR0*100}}
function elSVG(r){const W=560,H=360,X=q=>50+q/200*460,Y=p=>320-p/20*290;
 const pts=[[r.Q0,r.P0],[r.Q1,r.P1]].sort((a,b)=>a[0]-b[0]);
 const slope=(pts[1][1]-pts[0][1])/((pts[1][0]-pts[0][0])||1e-9);
 const ext=q=>pts[0][1]+slope*(q-pts[0][0]);
 /* extend D 40 units either side, but never above the drawn price range or below a price of 1 */
 const qa0=Math.max(2,pts[0][0]-40),qb0=Math.min(198,pts[1][0]+40);
 const qa=slope<0?Math.max(qa0,pts[0][0]+(19.5-pts[0][1])/slope):qa0,qb=slope<0?Math.min(qb0,pts[0][0]+(1-pts[0][1])/slope):qb0;
 const rect=(q,p,cls)=>`<rect class="${cls}" x="${X(0)}" y="${Y(p)}" width="${X(q)-X(0)}" height="${Y(0)-Y(p)}"/>`;
 return `<svg class="motif on-paper el-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Demand through two points: price ${r.P0} to ${r.P1.toFixed(2)}, quantity ${r.Q0} to ${r.Q1.toFixed(1)}. Total revenue ${r.TR0} before and ${r.TR1.toFixed(0)} after.">
  ${rect(r.Q0,r.P0,"el-r0")}${rect(r.Q1,r.P1,"el-r1")}
  <g class="m-ax"><line x1="${X(0)}" y1="${Y(0)}" x2="${X(0)}" y2="18"/><line x1="${X(0)}" y1="${Y(0)}" x2="540" y2="${Y(0)}"/></g>
  <text class="el-lb" x="42" y="12">Price ($)</text><text class="el-lb" x="540" y="350" text-anchor="end">Quantity</text>
  ${r.Q1===r.Q0?`<line class="m-c dem" x1="${X(r.Q0)}" y1="${Y(0)}" x2="${X(r.Q0)}" y2="${Y(19)}"/><text class="el-lb el-d" x="${X(r.Q0)+6}" y="${Y(19)+4}">D</text>`:isFinite(slope)&&Math.abs(slope)<1e6?`<line class="m-c dem" x1="${X(qa)}" y1="${Y(ext(qa))}" x2="${X(qb)}" y2="${Y(ext(qb))}"/><text class="el-lb el-d" x="${X(qb)+4}" y="${Y(ext(qb))+4}">D</text>`:""}
  <circle class="el-pt" cx="${X(r.Q0)}" cy="${Y(r.P0)}" r="5"/><circle class="el-pt" cx="${X(r.Q1)}" cy="${Y(r.P1)}" r="5"/>
  <text class="el-lb el-pl" x="${X(r.Q0)+8}" y="${Y(r.P0)-8}">A</text><text class="el-lb el-pl" x="${X(r.Q1)+8}" y="${Y(r.P1)-8}">B</text></svg>`}
function elRead(r){const rev=r.dTR>0.05?"rises":r.dTR<-0.05?"falls":"is unchanged";
 return `PED = ${r.dq>0?"+":""}${r.dq}% ÷ ${r.dp>0?"+":""}${r.dp}% = ${r.ped.toFixed(2)}. |PED| = ${r.abs.toFixed(2)}: demand is ${r.cls} over this range. Total revenue ${rev} (${r.TR0.toFixed(0)} → ${r.TR1.toFixed(0)}, ${r.dTR>0?"+":""}${r.dTR.toFixed(1)}%).${r.cls==="unit elastic"&&Math.abs(r.dTR)>0.05?" Unit elasticity leaves revenue unchanged only for very small changes: over a change this large, the two percentage changes multiply, so revenue moves slightly.":""}`}
function elUpdate(){const r=elCalc();const f=document.getElementById("el-fig"),o=document.getElementById("el-out");if(f)f.innerHTML=elSVG(r);if(o)o.textContent=elRead(r)}
function elasticityLab(){const r=elCalc();
 return H.pageHead("Experiment","Elasticity lab","Change the price, choose how strongly quantity responds, and see price elasticity of demand and total revenue move together.")
 +`<section class="sec"><div class="wrap full"><div class="el-grid">
   <div><figure class="rn-fig el-fig"><div id="el-fig">${elSVG(r)}</div><figcaption>Blue rectangle: total revenue at A (P₀ × Q₀). Dashed brass rectangle: total revenue at B (P₁ × Q₁). Illustrative numbers from a starting price of $10 and quantity of 100.</figcaption></figure></div>
   <div class="el-ctl">
    <div class="eb a">Price change</div>
    <div class="row mt2" role="group" aria-label="Direction of the price change"><button class="btn sm ${EL.up?"":"gh"}" aria-pressed="${EL.up}" onclick="EL.up=true;render()">Price rises</button><button class="btn sm ${EL.up?"gh":""}" aria-pressed="${!EL.up}" onclick="EL.up=false;render()">Price falls</button></div>
    <label class="lb mt3" for="el-p">Size of the price change: <span id="el-pv">${EL.p}</span>%</label>
    <input id="el-p" type="range" min="1" max="40" step="1" value="${EL.p}" oninput="EL.p=+this.value;document.getElementById('el-pv').textContent=this.value;elUpdate()">
    <label class="lb mt3" for="el-q">Size of the quantity response: <span id="el-qv">${EL.q}</span>%</label>
    <input id="el-q" type="range" min="0" max="60" step="1" value="${EL.q}" oninput="EL.q=+this.value;document.getElementById('el-qv').textContent=this.value;elUpdate()">
    <p class="el-out mt3" id="el-out" aria-live="polite">${esc(elRead(r))}</p>
    ${KC("tlae","Read it like an economist",`<ol class="kc-q"><li>If demand is price inelastic, what happens to revenue when price rises, and why?</li><li>Why is PED usually larger in the long run than in the short run?</li><li>Why can PED differ along a single straight-line demand curve?</li></ol>`)}
    <p class="xs mt3"><span class="tag">Teacher-created tool</span> This tool moves quantity against price, as the law of demand describes. The figure uses the simple percentage-change formula the course uses, so a large change gives a different answer from a midpoint calculation.</p>
    <div class="row mt3"><button class="btn sm gh" onclick="nav('learn',0,'c-ped')">The PED concept page</button><button class="btn sm gh" onclick="nav('lab',3,'ped')">The PED plate</button><button class="btn sm gh" onclick="nav('calculate')">PED calculations</button></div>
   </div></div></div></section>`}
(function(){const s=SECTIONS.find(x=>x.v==="lab");const T="Elasticity lab";if(s&&s.tabs&&!s.tabs.includes(T))s.tabs.push(T);
 const prev=VIEWS.lab;VIEWS.lab=function(){const t=SECTIONS.find(x=>x.v==="lab");return t&&t.tabs[TAB]===T?elasticityLab():prev.apply(this,arguments)}})();
/* ── the IA studio: the commentary as a research notebook, one step at a time ──
   Every step opens a tool the platform already has. The studio asks questions
   and checks the work; it never writes a commentary. */
const IA_STEPS=()=>[["Article check","ia","Article checker"],["Issue and key concept","course","Key concepts"],["Diagram studio","ees","Diagram & model studio"],
 ["Analysis builder","think","The Economic Chain"],["Evidence matrix","ees","Evidence matrix"],["Evaluation lab","ees","Evaluation lab"],
 ["Structure check","ia","Student checklist"],["Portfolio","ia","Portfolio tracker"],["Final quality check","ia","Supervisor gates"]];
function iaStudio(){const st=IA_STEPS();
 return `<nav class="rooms ia-rail" aria-label="The IA studio"><div class="wrap full rooms-in"><span class="rooms-h">The IA studio</span>
  <ol class="rooms-l">${st.map(([t,v,tab],n)=>{const s=SECTIONS.find(x=>x.v===v);const i=s&&s.tabs?s.tabs.indexOf(tab):-1;const on=VIEW===v&&TAB===i;
   return `<li><button class="room${on?" on":""}" ${on?'aria-current="step"':""} onclick="nav('${v}',${Math.max(0,i)})"><small>${String(n+1).padStart(2,"0")}</small><span>${esc(t)}</span></button></li>`}).join("")}</ol>
  <span class="ia-note">Asks questions; never writes the commentary.</span></div></nav>`}
(function(){const prev=VIEWS.ia;if(!prev)return;VIEWS.ia=function(){return iaStudio()+prev.apply(this,arguments)}})();
