/* ═══════════════════════════════════════════════════════════════════════════
   RENAISSANCE · 1 · the economic motif engine
   Every page opener used to carry the same decorative cross. The opener now
   draws a real diagram for what the page is about: comparative advantage on
   the comparative advantage page, a Lorenz curve for inequality, markbands in
   the exam room. Each motif is built from stated functions, so its labels,
   intersections and shaded areas are where the economics puts them; the self
   tests recompute them. Motifs are decorative for assistive technology (the
   page's own heading carries the meaning) and carry a visible figure caption.
   Semantic colour is kept: demand is blue, supply copper, loss red, policy
   brass; brand burgundy never enters a diagram.
   ═══════════════════════════════════════════════════════════════════════════ */
const MF={x0:70,y0:340,w:470,h:290};             /* plot box in a 600 × 400 frame */
const mX=q=>+(MF.x0+q/10*MF.w).toFixed(1), mY=p=>+(MF.y0-p/10*MF.h).toFixed(1);
function mLine(f,a,b,cls,lbl,lq,n){                 /* p=f(q) from q=a to q=b */
 n=n||2;const pts=[];for(let i=0;i<=n;i++){const q=a+(b-a)*i/n;pts.push(mX(q)+","+mY(f(q)))}
 let s=`<polyline class="m-c ${cls}" points="${pts.join(" ")}" pathLength="1"/>`;
 if(lbl){const q=lq===undefined?b:lq,x=mX(q),y=mY(f(q));
  /* near the right edge a label is set inward, below a falling line and above a rising one, so it never leaves the frame */
  if(x>470){const fall=f(q)<f(q-0.4);s+=`<text class="m-t m-${cls.split(" ")[0]}" x="${x-2}" y="${fall?y+20:y-9}" text-anchor="end">${lbl}</text>`}
  else s+=`<text class="m-t m-${cls.split(" ")[0]}" x="${x+6}" y="${y-6}">${lbl}</text>`}
 return s}
function mVert(q,a,b,cls,lbl){return `<line class="m-c ${cls}" x1="${mX(q)}" y1="${mY(a)}" x2="${mX(q)}" y2="${mY(b)}" pathLength="1"/>`
 +(lbl?`<text class="m-t m-${cls.split(" ")[0]}" x="${mX(q)+6}" y="${mY(b)+4}">${lbl}</text>`:"")}
/* a label that would run past the frame sits above the line, anchored at its end */
function mHorz(p,a,b,cls,lbl){const fits=!lbl||mX(b)+6+String(lbl).length*8.2<=590;
 return `<line class="m-c ${cls}" x1="${mX(a)}" y1="${mY(p)}" x2="${mX(b)}" y2="${mY(p)}" pathLength="1"/>`
 +(lbl?(fits?`<text class="m-t m-${cls.split(" ")[0]}" x="${mX(b)+6}" y="${mY(p)+4}">${lbl}</text>`
  :`<text class="m-t m-${cls.split(" ")[0]}" x="${mX(b)}" y="${mY(p)-7}" text-anchor="end">${lbl}</text>`):"")}
function mAxes(xl,yl){return `<g class="m-ax"><line x1="${MF.x0}" y1="${MF.y0}" x2="${MF.x0}" y2="${MF.y0-MF.h-12}"/><line x1="${MF.x0}" y1="${MF.y0}" x2="${MF.x0+MF.w+12}" y2="${MF.y0}"/></g>
 <text class="m-t m-axl" x="${MF.x0-8}" y="${MF.y0-MF.h-20}">${yl}</text><text class="m-t m-axl" x="${MF.x0+MF.w+12}" y="${MF.y0+22}" text-anchor="end">${xl}</text>`}
function mDrop(q,p,ql,pl){return `<g class="m-drop"><line x1="${mX(q)}" y1="${mY(p)}" x2="${mX(q)}" y2="${MF.y0}"/><line x1="${mX(q)}" y1="${mY(p)}" x2="${MF.x0}" y2="${mY(p)}"/></g>`
 +(ql?`<text class="m-t m-tick" x="${mX(q)}" y="${MF.y0+18}" text-anchor="middle">${ql}</text>`:"")
 +(pl?`<text class="m-t m-tick" x="${MF.x0-8}" y="${mY(p)+4}" text-anchor="end">${pl}</text>`:"")}
function mDot(q,p,pulse){return `<circle class="m-pt${pulse?" m-pulse":""}" cx="${mX(q)}" cy="${mY(p)}" r="5"/>`
 +(pulse?`<circle class="m-ring" cx="${mX(q)}" cy="${mY(p)}" r="14"/>`:"")}
function mPoly(pts,cls){return `<polygon class="${cls}" points="${pts.map(([q,p])=>mX(q)+","+mY(p)).join(" ")}"/>`}
function mArrow(q1,p1,q2,p2){const x1=mX(q1),y1=mY(p1),x2=mX(q2),y2=mY(p2),a=Math.atan2(y2-y1,x2-x1),h=9;
 return `<g class="m-arr"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/><polyline points="${(x2-h*Math.cos(a-.45)).toFixed(1)},${(y2-h*Math.sin(a-.45)).toFixed(1)} ${x2},${y2} ${(x2-h*Math.cos(a+.45)).toFixed(1)},${(y2-h*Math.sin(a+.45)).toFixed(1)}"/></g>`}
function mBrace(qa,qb,p,lbl){return `<g class="m-arr"><line x1="${mX(qa)}" y1="${mY(p)+14}" x2="${mX(qb)}" y2="${mY(p)+14}"/><line x1="${mX(qa)}" y1="${mY(p)+9}" x2="${mX(qa)}" y2="${mY(p)+19}"/><line x1="${mX(qb)}" y1="${mY(p)+9}" x2="${mX(qb)}" y2="${mY(p)+19}"/></g>`
 +`<text class="m-t m-note" x="${(mX(qa)+mX(qb))/2}" y="${mY(p)+34}" text-anchor="middle">${lbl}</text>`}

/* The functions each motif is drawn from, kept apart so the self-test can
   recompute every intersection independently of the drawing code. */
const MOTIFFN={
 D:q=>9-0.8*q, S:q=>1+0.8*q, D1:q=>10.6-0.8*q, ST:q=>3+0.8*q,
 MPC:q=>1+0.6*q, MSC:q=>3+0.6*q,
 AC:q=>12/q+1+0.35*q, MC:q=>1+0.7*q, AR:q=>9.5-0.5*q, MR:q=>9.5-q,
 SRPC:u=>-1+14/(u+0.5), LOR:x=>10*Math.pow(x/10,2.2)
};
const MOTIFS={
 sd:{cap:"Fig. Market equilibrium: demand meets supply at E",draw(){const F=MOTIFFN;
  return mAxes("Quantity","Price")+mLine(F.D,0.6,10,"dem","D")+mLine(F.S,0.6,10,"sup","S")+mDrop(5,5,"Qe","Pe")+mDot(5,5,1)}},
 shift:{cap:"Fig. An increase in demand: D shifts to D₁, price and quantity rise",draw(){const F=MOTIFFN;
  return mAxes("Quantity","Price")+mLine(F.D,0.6,10,"dem","D",10)+mLine(F.D1,2.6,10,"dem dsh","D₁")+mLine(F.S,0.6,10,"sup","S")
   +mDrop(5,5,"Q","P")+mDrop(6,5.8,"Q₁","P₁")+mArrow(3.6,6.12,5.5,6.12)+mDot(5,5)+mDot(6,5.8,1)}},
 tax:{cap:"Fig. An indirect tax: the wedge between the price paid and the price received",draw(){const F=MOTIFFN;
  return mAxes("Quantity","Price")+mPoly([[3.75,6],[3.75,4],[5,5]],"m-loss")+mLine(F.D,0.6,10,"dem","D")+mLine(F.S,0.6,10,"sup","S")
   +mLine(F.ST,0.6,7.5,"pol","S + tax")+mDrop(3.75,6,"Q₁","Pc")+mDrop(3.75,4,"","Pp")+mDot(5,5)+mDot(3.75,6,1)
   +`<text class="m-t m-note" x="${mX(3.75)+8}" y="${(mY(6)+mY(4))/2+4}">tax</text>`}},
 ceiling:{cap:"Fig. A maximum price below equilibrium creates a shortage",draw(){const F=MOTIFFN;
  return mAxes("Quantity","Price")+mLine(F.D,0.6,10,"dem","D")+mLine(F.S,0.6,10,"sup","S")+mHorz(3.4,0,9.2,"pol","Pmax")
   +mDot(3,3.4)+mDot(7,3.4)+mBrace(3,7,3.4,"shortage")+mDot(5,5,1)}},
 ext:{cap:"Fig. A negative production externality: output exceeds the social optimum",draw(){const F=MOTIFFN,qm=8/1.4,qs=6/1.4;
  return mAxes("Quantity","Costs, benefits")+mPoly([[qs,F.D(qs)],[qm,F.MSC(qm)],[qm,F.D(qm)]],"m-loss")
   +mLine(F.D,0.6,10,"dem","D = MPB = MSB",9.2)+mLine(F.MPC,0,10,"sup","S = MPC")+mLine(F.MSC,0,10,"sup dsh","MSC",9.4)
   +mDrop(qm,F.D(qm),"Qm","")+mDrop(qs,F.D(qs),"Q*","")+mDot(qs,F.D(qs),1)+mDot(qm,F.D(qm))}},
 elastic:{cap:"Fig. Two demand curves through one point: responsiveness differs",draw(){
  return mAxes("Quantity","Price")+mLine(q=>5-2.2*(q-5),3.2,7.1,"dem","relatively inelastic",3.2)+mLine(q=>5-0.35*(q-5),0.5,10,"dem dsh","relatively elastic",10)+mDot(5,5,1)}},
 ppc:{cap:"Fig. The production possibility curve: scarcity, choice and opportunity cost",draw(){
  const arc=(r,cls)=>`<polyline class="m-c ${cls}" pathLength="1" points="${Array.from({length:25},(_,i)=>{const t=i/24*Math.PI/2;return mX(r*Math.cos(t))+","+mY(r*Math.sin(t))}).join(" ")}"/>`;
  const a=0.8;
  return mAxes("Good X","Good Y")+arc(8.4,"ink")+arc(9.6,"ink dsh")
   +mDot(8.4*Math.cos(a),8.4*Math.sin(a),1)+`<text class="m-t m-note" x="${mX(8.4*Math.cos(a))+10}" y="${mY(8.4*Math.sin(a))-8}">A · efficient</text>`
   +mDot(3.4,3.2)+`<text class="m-t m-note" x="${mX(3.4)+10}" y="${mY(3.2)+4}">B · unused resources</text>`
   +mDot(7.75,4.75)+`<text class="m-t m-note" x="${mX(7.75)+10}" y="${mY(4.75)+14}">C · only after growth</text>`
   +mArrow(6.8,4.93,7.75,5.62)}},
 cadv:{cap:"Fig. Comparative advantage: A gives up less Y for each unit of X",draw(){
  return mAxes("Good X","Good Y")+mLine(q=>4-0.5*q,0,8,"ink","A: 1X costs ½Y",8)+mLine(q=>6-2*q,0,3,"ink dsh","B: 1X costs 2Y",3)
   +`<text class="m-t m-note" x="${mX(3.6)}" y="${mY(7.4)}">A specialises in X, B in Y</text>`}},
 adas:{cap:"Fig. AD–AS: long-run equilibrium at full-employment output Yf",draw(){const F=MOTIFFN;
  return mAxes("Real GDP","Average price level")+mLine(F.D,0.6,10,"dem","AD")+mLine(F.S,0.6,10,"sup","SRAS")+mVert(5,0,9.6,"ink","LRAS")
   +mDrop(5,5,"Yf","Pe")+mDot(5,5,1)}},
 phillips:{cap:"Fig. Short-run and long-run Phillips curves",draw(){const F=MOTIFFN;
  return mAxes("Unemployment rate","Inflation rate")+mLine(F.SRPC,1.2,9.6,"ink","SRPC",8.2,24)+mVert(5,0,9.6,"ink dsh","LRPC")
   +`<text class="m-t m-tick" x="${mX(5)}" y="${MF.y0+18}" text-anchor="middle">NRU</text>`+mDot(5,F.SRPC(5),1)}},
 lorenz:{cap:"Fig. The Lorenz curve: Gini coefficient = A ÷ (A + B)",draw(){const F=MOTIFFN;
  const L=Array.from({length:21},(_,i)=>[i/2,F.LOR(i/2)]);
  return mAxes("Cumulative % of population","Cumulative % of income")
   +mPoly([[0,0]].concat(L.slice().reverse().map(([x,y])=>[x,y]).reverse()).concat([[10,10]]),"m-soft")
   +`<polyline class="m-c ink" pathLength="1" points="${L.map(([x,y])=>mX(x)+","+mY(y)).join(" ")}"/>`
   +mLine(q=>q,0,10,"ink dsh","line of equality",6.4)
   +`<text class="m-t m-note" x="${mX(6.2)}" y="${mY(4.4)}">A</text><text class="m-t m-note" x="${mX(8.2)}" y="${mY(1.6)}">B</text>`
   +mVert(10,0,10,"m-thin","")+mHorz(10,0,10,"m-thin","")}},
 cycle:{cap:"Fig. The business cycle: actual output around the trend",draw(){
  const tr=t=>2+0.55*t, ac=t=>tr(t)+1.15*Math.sin(t*1.25);
  /* turning points where the slope of actual output is zero: 0.55 + 1.4375·cos(1.25t) = 0 */
  const pk=(Math.PI-Math.acos(0.55/1.4375))/1.25, tg=(Math.PI+Math.acos(0.55/1.4375))/1.25;
  return mAxes("Time","Real GDP")+mLine(tr,0,10,"ink dsh","trend (potential) output",4.6)+mLine(ac,0,10,"ink","actual output",10,60)
   +mDot(pk,ac(pk))+`<text class="m-t m-note" x="${mX(pk)}" y="${mY(ac(pk))-14}" text-anchor="middle">peak</text>`
   +mDot(tg,ac(tg))+`<text class="m-t m-note" x="${mX(tg)}" y="${mY(ac(tg))+24}" text-anchor="middle">trough</text>`}},
 costs:{cap:"Fig. Profit maximisation where MC = MR; MC cuts AC at its minimum",draw(){const F=MOTIFFN;
  return mAxes("Quantity","Costs, revenue")+mPoly([[0,7],[5,7],[5,F.AC(5)],[0,F.AC(5)]],"m-soft")
   +mLine(F.AC,1.45,9.8,"sup","AC",9.8,40)+mLine(F.MC,0,9.8,"sup dsh","MC",9.8)+mLine(F.AR,0,10,"dem","AR = D",10)+mLine(F.MR,0,9.3,"dem dsh","MR",7.4)
   +mDrop(5,7,"Qm","Pm")+mDot(5,F.MC(5))+mDot(5,7,1)}},
 labour:{cap:"Fig. A minimum wage above equilibrium: a surplus of labour",draw(){const F=MOTIFFN;
  return mAxes("Quantity of labour","Wage rate")+mLine(F.D,0.6,10,"dem","D labour")+mLine(F.S,0.6,10,"sup","S labour")+mHorz(6.6,0,9.2,"pol","Wmin")
   +mDot(3,6.6)+mDot(7,6.6)+mBrace(3,7,6.6,"surplus of labour")+mDot(5,5,1)}},
 tariff:{cap:"Fig. A tariff raises the domestic price and cuts imports",draw(){const F=MOTIFFN;
  return mAxes("Quantity","Price")+mPoly([[3.5,3.8],[6.5,3.8],[6.5,2.6],[3.5,2.6]],"m-soft")+mPoly([[2,2.6],[3.5,3.8],[3.5,2.6]],"m-loss")+mPoly([[6.5,3.8],[8,2.6],[6.5,2.6]],"m-loss")
   +mLine(F.D,0.6,10,"dem","D domestic",10)+mLine(F.S,0.6,10,"sup","S domestic",10)+mHorz(2.6,0,9.4,"pol","Pw")+mHorz(3.8,0,9.4,"pol dsh","Pw + tariff")
   +mDot(3.5,3.8)+mDot(6.5,3.8,1)}},
 fx:{cap:"Fig. An exchange rate is a price: set by the demand for and supply of a currency",draw(){const F=MOTIFFN;
  return mAxes("Quantity of the currency","Price of the currency (foreign currency per unit)")+mLine(F.D,0.6,10,"dem","D currency",9.4)+mLine(F.S,0.6,10,"sup","S currency",9.4)
   +mDrop(5,5,"Qe","e")+mDot(5,5,1)}},
 subsidy:{cap:"Fig. A subsidy: consumers pay less, producers receive more, at a cost to government",draw(){const F=MOTIFFN,SS=q=>-1+0.8*q;
  return mAxes("Quantity","Price")+mPoly([[0,6],[6.25,6],[6.25,4],[0,4]],"m-soft")+mLine(F.D,0.6,10,"dem","D")+mLine(F.S,0.6,10,"sup","S",9.2)
   +mLine(SS,1.5,10,"pol","S − subsidy",10)+mDrop(6.25,6,"","Pp")+mDrop(6.25,4,"Q₁","Pc")+mDot(5,5)+mDot(6.25,4,1)}},
 floor:{cap:"Fig. A minimum price above equilibrium creates a surplus",draw(){const F=MOTIFFN;
  return mAxes("Quantity","Price")+mLine(F.D,0.6,10,"dem","D")+mLine(F.S,0.6,10,"sup","S")+mHorz(6.6,0,9.2,"pol","Pmin")
   +mDot(3,6.6)+mDot(7,6.6)+mBrace(3,7,6.6,"surplus")+mDot(5,5,1)}},
 scatter:{cap:"Fig. A fitted line shows association, not causation (illustrative data)",draw(){
  let s=13;const r=()=>(s=(s*9301+49297)%233280)/233280;
  const pts=Array.from({length:26},(_,i)=>{const x=0.6+i*0.35;return [x,1.2+0.72*x+(r()-.5)*2.4]});
  const n=pts.length,mx=pts.reduce((a,p)=>a+p[0],0)/n,my=pts.reduce((a,p)=>a+p[1],0)/n;
  const b=pts.reduce((a,p)=>a+(p[0]-mx)*(p[1]-my),0)/pts.reduce((a,p)=>a+(p[0]-mx)**2,0),a=my-b*mx;
  MOTIFS.scatter.fit={a,b};
  return mAxes("Variable X","Variable Y")+pts.map(([x,y])=>`<circle class="m-dot" cx="${mX(x)}" cy="${mY(y)}" r="4"/>`).join("")+mLine(q=>a+b*q,0.3,9.8,"ink","fitted line",9.8)}},
 game:{cap:"Fig. A pricing game: both firms choosing Low is the Nash equilibrium (illustrative payoffs)",draw(){
  const cell=(x,y,t,nash)=>`<rect class="${nash?"m-nash":"m-cell"}" x="${x}" y="${y}" width="170" height="92"/><text class="m-t m-pay" x="${x+85}" y="${y+54}" text-anchor="middle">${t}</text>`;
  return `<text class="m-t m-axl" x="330" y="46" text-anchor="middle">Firm B</text><text class="m-t m-axl" x="84" y="190" text-anchor="middle" transform="rotate(-90 84 190)">Firm A</text>`
   +`<text class="m-t m-tick" x="245" y="74" text-anchor="middle">High price</text><text class="m-t m-tick" x="415" y="74" text-anchor="middle">Low price</text>`
   +`<text class="m-t m-tick" x="152" y="136" text-anchor="end">High</text><text class="m-t m-tick" x="152" y="228" text-anchor="end">Low</text>`
   +cell(160,86,"6 , 6")+cell(330,86,"1 , 8")+cell(160,178,"8 , 1")+cell(330,178,"3 , 3",1)
   +`<text class="m-t m-note" x="415" y="298" text-anchor="middle">Nash equilibrium</text>`}},
 network:{cap:"Fig. The nine key concepts of the course, as a network",draw(){
  const K=["Scarcity","Choice","Efficiency","Equity","Economic well-being","Sustainability","Change","Interdependence","Intervention"];
  const P=K.map((k,i)=>{const t=-Math.PI/2+i/K.length*2*Math.PI;return [300+205*Math.cos(t),195+140*Math.sin(t)]});
  const E=[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,0],[0,2],[1,4],[3,8],[5,7],[2,6],[4,8]];
  return E.map(([a,b])=>`<line class="m-edge" x1="${P[a][0].toFixed(1)}" y1="${P[a][1].toFixed(1)}" x2="${P[b][0].toFixed(1)}" y2="${P[b][1].toFixed(1)}"/>`).join("")
   +P.map(([x,y],i)=>`<circle class="m-node" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${i===0?8:6}"/><text class="m-t m-note" x="${x.toFixed(1)}" y="${(y+(y<195?-14:24)).toFixed(1)}" text-anchor="middle">${K[i]}</text>`).join("")}},
 markbands:{cap:"Fig. Paper 1 (b) markbands, 0 to 15 (Economics guide, first assessment 2022, p. 63)",draw(){
  const B=[["0",0],["1–3",3],["4–6",6],["7–9",9],["10–12",12],["13–15",15]];
  /* the axis title takes its own row under the band labels, which fill the axis */
  return mAxes("","Marks")+`<text class="m-t m-axl" x="${MF.x0+MF.w+12}" y="${MF.y0+46}" text-anchor="end">Markband</text>`+B.map(([l,m],i)=>{const x=MF.x0+14+i*75,h=m/15*MF.h*.92,y=MF.y0-h;
   return `<rect class="${i===5?"m-nash":"m-cell"}" x="${x}" y="${y.toFixed(1)}" width="60" height="${h.toFixed(1)}"/><text class="m-t m-tick" x="${x+30}" y="${MF.y0+18}" text-anchor="middle">${l}</text>`}).join("")}},
 research:{cap:"Fig. A research page: question, evidence, annotation",draw(){
  const lines=Array.from({length:11},(_,i)=>`<line class="m-edge" x1="150" y1="${70+i*24}" x2="${i%4===3?390:470}" y2="${70+i*24}"/>`).join("");
  return `<rect class="m-sheet" x="120" y="30" width="380" height="340"/><line class="m-rule" x1="140" y1="30" x2="140" y2="370"/>`+lines
   +`<polyline class="m-c ink" pathLength="1" points="170,330 220,300 270,312 320,270 370,262 420,226 460,214"/>`
   +`<circle class="m-ring" cx="320" cy="270" r="18"/><text class="m-t m-note" x="520" y="96">question</text><text class="m-t m-note" x="520" y="196">evidence</text><text class="m-t m-note" x="520" y="276">limitation?</text>`
   +mLineRaw(505,92,470,70)+mLineRaw(505,192,470,166)+mLineRaw(505,272,340,270)}},
 model:{cap:"Fig. A model simplifies what we observe",draw(){
  let s=7;const r=()=>(s=(s*9301+49297)%233280)/233280;const f=q=>8.6-7.2/(1+Math.exp(-(q-5)*0.9));
  return mAxes("What we change","What we observe")+Array.from({length:24},(_,i)=>{const q=0.5+i*0.4;return `<circle class="m-dot" cx="${mX(q)}" cy="${mY(f(q)+(r()-.5)*2)}" r="4"/>`}).join("")
   +mLine(f,0.3,9.8,"ink","model",9.8,40)}},
 trade:{cap:"Fig. Schematic: trade links between economies",draw(){
  const N=[[110,150],[170,210],[230,120],[300,170],[330,250],[390,130],[450,190],[500,120],[470,280],[250,290]];
  const E=[[0,2],[2,3],[3,5],[5,7],[3,6],[6,8],[1,4],[4,8],[2,5],[9,4],[1,9],[0,3],[6,7]];
  const arc=(a,b)=>{const[x1,y1]=N[a],[x2,y2]=N[b],mx=(x1+x2)/2,my=Math.min(y1,y2)-40;return `<path class="m-c ink" pathLength="1" d="M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}"/>`};
  return `<ellipse class="m-grat" cx="300" cy="200" rx="250" ry="150"/><ellipse class="m-grat" cx="300" cy="200" rx="150" ry="150"/><ellipse class="m-grat" cx="300" cy="200" rx="60" ry="150"/>`
   +`<line class="m-grat" x1="50" y1="200" x2="550" y2="200"/><line class="m-grat" x1="80" y1="130" x2="520" y2="130"/><line class="m-grat" x1="80" y1="270" x2="520" y2="270"/>`
   +E.map(([a,b])=>arc(a,b)).join("")+N.map(([x,y],i)=>`<circle class="${i%3?"m-node":"m-pt"}" cx="${x}" cy="${y}" r="${i%3?4:6}"/>`).join("")}},
 goods:{cap:"Fig. Goods classified by rivalry and excludability: public goods are neither",draw(){
  const cell=(x,y,t,sub,hi)=>`<rect class="${hi?"m-nash":"m-cell"}" x="${x}" y="${y}" width="180" height="110"/><text class="m-t m-pay" x="${x+90}" y="${y+50}" text-anchor="middle">${t}</text><text class="m-t m-note" x="${x+90}" y="${y+76}" text-anchor="middle">${sub}</text>`;
  return `<text class="m-t m-axl" x="300" y="40" text-anchor="middle">Rival</text><text class="m-t m-axl" x="480" y="40" text-anchor="middle">Non-rival</text>`
   +`<text class="m-t m-axl" x="198" y="120" text-anchor="end">Excludable</text><text class="m-t m-axl" x="198" y="230" text-anchor="end">Non-excludable</text>`
   +cell(210,56,"Private goods","markets provide")+cell(390,56,"Club goods","charge to enter")
   +cell(210,168,"Common pool","risk of overuse")+cell(390,168,"Public goods","free-rider problem",1)}},
 poverty:{cap:"Fig. The poverty cycle: low income reinforces itself unless the cycle is broken",draw(){
  const L=["Low income","Low saving","Low investment","Low productivity"];
  const P=[[300,70],[480,200],[300,330],[120,200]];
  /* each link is a quadratic curve; its arrowhead follows the curve's end tangent (end minus control point) */
  const arc=(a,b)=>{const[x1,y1]=P[a],[x2,y2]=P[b];const mx=(x1+x2)/2+(y2-y1)*.28,my=(y1+y2)/2-(x2-x1)*.28;
   const sx=x1+(x2-x1)*.22,sy=y1+(y2-y1)*.22,ex=x1+(x2-x1)*.78,ey=y1+(y2-y1)*.78;
   return `<path class="m-c ink" pathLength="1" d="M${sx.toFixed(1)} ${sy.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}"/>`+mArrowRaw(+(ex-(ex-mx)*.12).toFixed(1),+(ey-(ey-my)*.12).toFixed(1),+ex.toFixed(1),+ey.toFixed(1))};
  return [0,1,2,3].map(i=>arc(i,(i+1)%4)).join("")
   +P.map(([x,y],i)=>`<rect class="m-cell" x="${x-78}" y="${y-20}" width="156" height="40"/><text class="m-t m-pay" x="${x}" y="${y+6}" text-anchor="middle" style="font-size:15px">${L[i]}</text>`).join("")}},
 flow:{cap:"Fig. The circular flow of income: real flows and money flows",draw(){
  return `<rect class="m-cell" x="60" y="160" width="140" height="70"/><text class="m-t m-pay" x="130" y="202" text-anchor="middle">Households</text>`
   +`<rect class="m-cell" x="400" y="160" width="140" height="70"/><text class="m-t m-pay" x="470" y="202" text-anchor="middle">Firms</text>`
   +`<path class="m-c ink" pathLength="1" d="M130 158 C130 60 470 60 470 158"/><path class="m-c ink dsh" pathLength="1" d="M150 158 C160 95 440 95 450 158"/>`
   +`<path class="m-c ink" pathLength="1" d="M470 232 C470 330 130 330 130 232"/><path class="m-c ink dsh" pathLength="1" d="M450 232 C440 295 160 295 150 232"/>`
   +`<text class="m-t m-note" x="300" y="70" text-anchor="middle">expenditure (money)</text><text class="m-t m-note" x="300" y="130" text-anchor="middle">goods and services (real)</text>`
   +`<text class="m-t m-note" x="300" y="266" text-anchor="middle">factors of production (real)</text><text class="m-t m-note" x="300" y="338" text-anchor="middle">incomes: wages, rent, interest, profit (money)</text>`
   +mArrowRaw(462,120,470,156)+mArrowRaw(157,122,150,156)+mArrowRaw(138,270,130,234)+mArrowRaw(443,268,450,234)}}
};
function mLineRaw(x1,y1,x2,y2){return `<line class="m-edge" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`}
function mArrowRaw(x1,y1,x2,y2){const a=Math.atan2(y2-y1,x2-x1),h=10;
 return `<polyline class="m-arrh" points="${(x2-h*Math.cos(a-.5)).toFixed(1)},${(y2-h*Math.sin(a-.5)).toFixed(1)} ${x2},${y2} ${(x2-h*Math.cos(a+.5)).toFixed(1)},${(y2-h*Math.sin(a+.5)).toFixed(1)}"/>`}

/* One motif per syllabus subtopic, chosen for what the subtopic is about. */
const MOTIF_SUB={"1.1":"ppc","1.2":"model","2.1":"shift","2.2":"sd","2.3":"sd","2.4":"model","2.5":"elastic","2.6":"elastic",
 "2.7":"tax","2.8":"ext","2.9":"goods","2.10":"model","2.11":"costs","2.12":"lorenz","3.1":"cycle","3.2":"adas","3.3":"phillips",
 "3.4":"lorenz","3.5":"adas","3.6":"adas","3.7":"adas","4.1":"cadv","4.2":"tariff","4.3":"tariff","4.4":"trade","4.5":"fx",
 "4.6":"fx","4.7":"ppc","4.8":"lorenz","4.9":"poverty","4.10":"ppc"};
/* One motif per section, for pages that are not about a single subtopic. */
/* A case names the diagram it is analysed with; the header draws that diagram
   where a motif exists for it, so a case about a subsidy never shows a tax. */
const MOTIF_DG={ds:"sd",dshift:"shift",sshift:"sd",ped:"elastic",pes:"sd",tax:"tax",subsidy:"subsidy",ceiling:"ceiling",floor:"floor",
 negprod:"ext",negcons:"sd",poscons:"sd",posprod:"sd",monopoly:"costs",labour:"labour",lorenz:"lorenz",adas:"adas",defgap:"adas",infgap:"adas",
 lras:"adas",costpush:"adas",multiplier:"adas",phillips:"phillips",cycle:"cycle",circular:"flow",tariff:"tariff",quota:"sd",fx:"fx",bop:"fx",
 ppc:"ppc",pubgood:"goods",cpr:"goods",asym:"model",growth:"ppc",compadv:"cadv"};
const MOTIF_SEC={home:"sd",course:"flow",learn:"ppc",think:"game",lab:"scatter",world:"trade",practise:"costs",examiner:"markbands",
 mind:"network",everywhere:"shift",ees:"research",arjun:"cycle",master:"cycle",ia:"tax",educator:"ppc",about:"sd",tutorials:"sd",
 session:"markbands",video:"cycle",dna:"markbands",papers:"markbands",calculate:"elastic",resources:"flow",syllabus:"network",
 saved:"network",tools:"elastic",tok:"model",workspace:"network",teacher:"ppc",settings:"flow"};
/* A tab can name its own motif where the tab is about one model. */
const MOTIF_TAB=[[/AD-?AS/i,"adas"],[/market lab|market/i,"sd"],[/policy|tax|recommend/i,"tax"],[/lorenz|inequal/i,"lorenz"],
 [/trade|tariff/i,"tariff"],[/exchange|currency/i,"fx"],[/phillips/i,"phillips"],[/game/i,"game"],[/cost|firm|structure/i,"costs"],
 [/externalit/i,"ext"],[/data|numbers|statistic/i,"scatter"],[/mindmap|network|map|graph/i,"network"],[/exam|paper|mark/i,"markbands"],
 [/research|source|reflection|integrity/i,"research"],[/case|world|issue/i,"trade"],[/elastic/i,"elastic"],[/circular|flow/i,"flow"]];
function caseMotif(k){return (k.dg||[]).map(d=>MOTIF_DG[d]).find(Boolean)||MOTIF_SUB[k.sub]||"sd"}
function motifFor(v,t,a){
 v=v||VIEW;t=t===undefined?TAB:t;a=a===undefined?ARG:a;
 try{
  if(a){
   const c=(typeof CONCEPTS!=="undefined")&&CONCEPTS.find(x=>x.id===a);if(c&&MOTIF_SUB[c.sub])return MOTIF_SUB[c.sub];
   const k=(typeof RW_CASES!=="undefined"&&Array.isArray(RW_CASES))?RW_CASES.find(x=>x.id===a):null;if(k)return caseMotif(k);
   if(/^\d\.\d+$/.test(a)&&MOTIF_SUB[a])return MOTIF_SUB[a];
  }
  const sec=SECTIONS.find(s=>s.v===v);const tab=sec&&sec.tabs?sec.tabs[t]:"";
  if(tab&&t>0){const m=MOTIF_TAB.find(([re])=>re.test(tab));if(m)return m[1]}
 }catch(e){}
 return MOTIF_SEC[v]||"sd"}
function motifSVG(key,opt){
 const M=MOTIFS[key]||MOTIFS.sd;opt=opt||{};
 let body="";try{body=M.draw()}catch(e){body=MOTIFS.sd.draw();key="sd"}
 /* a dashed curve keeps its dashes: pathLength is only for the curves that draw on */
 body=body.replace(/(<(?:polyline|line|path)[^>]*class="[^"]*\bdsh\b[^"]*"[^>]*?) pathLength="1"/g,"$1");
 return `<svg class="motif mf-${key}${opt.cls?" "+opt.cls:""}" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">${body}</svg>`}
function motifCap(key){return (MOTIFS[key]||MOTIFS.sd).cap}
/* The opener every page shares, now drawn for the page it opens. */
heroPlot=function(){
 const k=motifFor();
 return `<div class="plot rn-plot" aria-hidden="true">${motifSVG(k)}<div class="rn-cap" data-cap="${esA(motifCap(k))}"></div></div>`};
