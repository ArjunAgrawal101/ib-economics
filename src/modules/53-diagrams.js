/* ═══════════════════════════════════════════════════════════════════════════
   THE DIAGRAM LIBRARY, COMPLETED · fifteen plates the guide requires
   The coverage audit (docs/audits/2026-09-29/coverage.md) listed the guide's
   diagrams that the atlas did not draw. Fourteen of them are added here as
   solved models in Diagram Engine 2.0, so every intersection is computed
   from the equations and every labelled point is checked, in rendered
   pixels, to sit on its curves; the fifteenth, the poverty cycle, is a flow
   diagram and is declared as a schematic.
     HL 3.5  the money market            HL 3.6  crowding out (loanable funds)
     HL 4.6  the J-curve                 HL 2.11 the perfectly competitive firm
             and industry, the firm's abnormal profit and its loss, natural
             monopoly, collusive oligopoly, monopolistic competition in the
             short run and the long run
        4.1  free trade with exports        4.5  a fixed exchange rate
        3.3  structural unemployment        4.9  the poverty cycle
        2.5  the Engel curve
   Firms' costs come from one cubic cost function, so MC cuts AVC and ATC at
   their minimum by construction rather than by eye, and every MR is derived
   from its AR with twice the slope. Each plate is registered everywhere the
   atlas, the topic pages and search read from; plates with a parameter worth
   moving gain a control on their atlas page, recomputed from the model.
   ═══════════════════════════════════════════════════════════════════════════ */
const DGX={sel:{}};
/* A firm's short-run costs from TC = F + aq − bq² + cq³:
   AVC = a − bq + cq², ATC = AVC + F/q, MC = a − 2bq + 3cq². */
function dgxCost(a,b,c,F){
 const atc=q=>a-b*q+c*q*q+F/q;
 /* minimum ATC solves ATC′(q) = −b + 2cq − F/q² = 0, by Newton's method */
 let qm=b/(2*c)+1;for(let i=0;i<80;i++){const f=-b+2*c*qm-F/(qm*qm),d=2*c+2*F/(qm*qm*qm);qm-=f/d}
 return {a,b,c,F,atc,avc:q=>a-b*q+c*q*q,mc:q=>a-2*b*q+3*c*q*q,datc:q=>-b+2*c*q-F/(q*q),
  qAvcMin:b/(2*c),qAtcMin:qm,
  /* the rising branch of MC at a given price: 3cq² − 2bq + (a − P) = 0 */
  qOfP:P=>(2*b+Math.sqrt(4*b*b-12*c*(a-P)))/(6*c)};
}
/* a curve sampled finely, with the exact abscissae of its labelled points
   added, so a marker computed from the function sits on the drawn polyline */
function dgxPoly(f,q0,q1,n,must,off){off=off||0;const qs=[];for(let i=0;i<=n;i++)qs.push(q0+(q1-q0)*i/n);
 (must||[]).forEach(q=>{if(q>q0&&q<q1)qs.push(q)});qs.sort((x,y)=>x-y);return POLY(qs.map(q=>[q+off,f(q)]))}
/* the engine's own mapping from economic space to the plate (renderModel) */
function dgxXY(m){return {X:q=>G.L+(q/m.xmax)*(G.W-G.L-G.R-18),Y:p=>(G.H-G.B)-(p/m.ymax)*(G.H-G.T-G.B-14)}}
/* shift and gap arrows, drawn in the engine's coordinates after it has drawn the model */
function dgxArrows(k,r){if(!r)return r;const m=M2[k].build(r.par);
 if((m.arrows||[]).length){const {X,Y}=dgxXY(m);r.b+=m.arrows.map(a=>shiftArrow(X(a[0]),Y(a[1]),X(a[2]),Y(a[3]))).join("")}
 return r}
const DGX_FIRM={a:4,b:0.09,c:0.0015,F:150};

/* ── HL 3.5 · the money market ─────────────────────────────────────────── */
defModel("moneymkt",{sub:"3.5",t:"The money market: an increase in the money supply",
 model:"Money supply fixed by the central bank (vertical), downward-sloping money demand",
 x:"Quantity of money ($bn)",y:"Nominal interest rate, i (%)",
 par:{a:12,b:0.04,ms:150,dms:50},
 build(p){
  const Md=LIN(p.a,-p.b),Ms0=VERT(p.ms),Ms1=VERT(p.ms+p.dms),E0=XSECT(Ms0,Md),E1=XSECT(Ms1,Md),up=p.dms>0;
  return{xmax:300,ymax:14,
   eqs:["Md: i = "+p.a+" − "+p.b+"M  (the demand to hold money falls as the interest rate rises)",
     "Ms₀: M = "+p.ms+", set by the central bank and independent of i, so the curve is vertical",
     "Ms₁: M = "+(p.ms+p.dms)+" after the central bank "+(up?"buys":"sells")+" bonds",
     "E₀: i = "+p.a+" − "+p.b+" × "+p.ms+" = "+NUM(E0.p)+"%",
     "E₁: i = "+p.a+" − "+p.b+" × "+(p.ms+p.dms)+" = "+NUM(E1.p)+"%"],
   curves:[{k:"Md",label:"Md",c:Md,col:CD,q1:275},
     {k:"Ms0",label:"Ms₀",c:Ms0,col:CS,q1:12.6},
     {k:"Ms1",label:"Ms₁",c:Ms1,col:CPOL,q1:12.6}],
   points:[{k:"E0",label:"E₀",q:E0.q,p:E0.p,on:["Md","Ms0"]},
     {k:"E1",label:"E₁",q:E1.q,p:E1.p,on:["Md","Ms1"],col:CW}],
   guides:[{q:E0.q,p:E0.p,xLab:"M₀ = "+NUM(E0.q),yLab:"i₀ = "+NUM(E0.p)+"%"},
     {q:E1.q,p:E1.p,xLab:"M₁ = "+NUM(E1.q),yLab:"i₁ = "+NUM(E1.p)+"%",col:"#E4DED2",lc:CW}],
   arrows:[up?[p.ms+5,10.6,p.ms+p.dms-5,10.6]:[p.ms-5,10.6,p.ms+p.dms+5,10.6]],
   marks:[{q:Math.max(p.ms,p.ms+p.dms)+6,p:10.35,text:up?"central bank raises the money supply":"central bank reduces the money supply",col:CPOL,sz:9.5}],
   facts:[["Interest rate before",NUM(E0.p)+"%"],["Money supply",NUM(p.ms)+" to "+NUM(p.ms+p.dms)+" ($bn)"],
     ["Interest rate after",NUM(E1.p)+"%"],["Change in the interest rate",(E1.p>E0.p?"+":"")+NUM(E1.p-E0.p)+" percentage points"],
     ["Which curve moved","money supply; money demand is unchanged"],
     ["Next link in transmission",up?"cheaper borrowing: consumption and investment, so AD, tend to rise":"dearer borrowing: consumption and investment, so AD, tend to fall"]],
   say:"The money supply moves from "+NUM(p.ms)+" to "+NUM(p.ms+p.dms)+" and the interest rate "+(up?"falls":"rises")+" from "+NUM(E0.p)+"% to "+NUM(E1.p)+"%.",
   alt:"The money market with the nominal interest rate on the vertical axis and the quantity of money on the horizontal axis. Money demand slopes downward. Money supply is vertical at "+NUM(p.ms)+" because the central bank sets it, giving an equilibrium interest rate of "+NUM(E0.p)+" per cent. The central bank "+(up?"increases":"reduces")+" the money supply to "+NUM(p.ms+p.dms)+", the vertical supply curve moves "+(up?"right":"left")+", and the equilibrium moves along money demand to an interest rate of "+NUM(E1.p)+" per cent.",
   note:"The central bank fixes the money supply, so Ms is vertical: it does not depend on the interest rate, which is the price that clears the market. "+(up?"When the money supply rises from "+NUM(p.ms)+" to "+NUM(p.ms+p.dms)+" there is an excess supply of money at "+NUM(E0.p)+"%; holders use the surplus to buy bonds, bond prices rise and yields fall until people are willing to hold the larger stock of money at "+NUM(E1.p)+"%. The lower rate is the first link in monetary transmission: borrowing becomes cheaper, so consumption and investment can rise."
     :"When the money supply falls from "+NUM(p.ms)+" to "+NUM(p.ms+p.dms)+" there is an excess demand for money at "+NUM(E0.p)+"%; people sell bonds to raise money, bond prices fall and yields rise until money demand matches the smaller supply at "+NUM(E1.p)+"%. The higher rate makes borrowing dearer, which tends to reduce consumption and investment.")};
 }});

/* ── HL 3.6 · crowding out, in the loanable funds market ───────────────── */
defModel("crowdout",{sub:"3.6",t:"Crowding out: government borrowing in the loanable funds market",
 model:"Loanable funds: saving supplies funds; private investment and government borrowing demand them",
 x:"Quantity of loanable funds ($bn per year)",y:"Real interest rate, r (%)",
 par:{a:12,b:0.05,c:2,d:0.05,B:60},
 build(p){
  const D=LIN(p.a,-p.b),D1=LIN(p.a+p.b*p.B,-p.b),S=LIN(p.c,p.d),E0=XSECT(D,S),E1=XSECT(D1,S),Ip=D.q(E1.p),crowd=E0.q-Ip;
  return{xmax:260,ymax:16,
   eqs:["D (private investment): r = "+p.a+" − "+p.b+"Q","S (saving): r = "+p.c+" + "+p.d+"Q",
     "D₁ = D + government borrowing of "+p.B+": r = "+NUM(p.a+p.b*p.B)+" − "+p.b+"Q",
     "E₀: r = "+NUM(E0.p)+"%, Q = "+NUM(E0.q)+"   E₁: r = "+NUM(E1.p)+"%, Q = "+NUM(E1.q),
     "Private investment at r₁, read from D: Q = ("+p.a+" − "+NUM(E1.p)+") ÷ "+p.b+" = "+NUM(Ip),
     "Crowded out = "+NUM(E0.q)+" − "+NUM(Ip)+" = "+NUM(crowd)+" of the "+p.B+" borrowed"],
   curves:[{k:"D",label:"D: private investment",c:D,col:CD,q1:190},
     {k:"D1",label:"D₁ = D + borrowing",c:D1,col:CD,dash:"6,4",q1:212},
     {k:"S",label:"S: saving",c:S,col:CS,q1:228}],
   points:[{k:"E0",label:"E₀",q:E0.q,p:E0.p,on:["D","S"],dx:9,dy:5},
     {k:"E1",label:"E₁",q:E1.q,p:E1.p,on:["D1","S"],col:CW,dx:-8,dy:-8,a:"end"},
     {k:"A",label:"A",q:Ip,p:E1.p,on:["D"],col:CPOL,dx:-7,dy:-8,a:"end"}],
   guides:[{q:E0.q,p:E0.p,xLab:"Q₀ = "+NUM(E0.q),yLab:"r₀ = "+NUM(E0.p)+"%"},
     {q:E1.q,p:E1.p,xLab:"Q₁ = "+NUM(E1.q),yLab:"r₁ = "+NUM(E1.p)+"%",col:"#E4DED2",lc:CW},
     {q:Ip,p:E1.p,xLab:"I₁ = "+NUM(Ip),col:"#E4DED2",lc:CPOL}],
   arrows:[[E0.q-2,4.3,Ip+2,4.3],[Ip+2,1.1,E1.q-2,1.1]],
   marks:[{q:(E0.q+Ip)/2,p:3.45,text:"crowded out = "+NUM(crowd),col:CW,sz:9.5,a:"middle"},
     {q:(Ip+E1.q)/2,p:1.75,text:"government borrowing = "+NUM(p.B),col:CPOL,sz:9.5,a:"middle"}],
   facts:[["Real interest rate",NUM(E0.p)+"% to "+NUM(E1.p)+"%"],["Government borrowing","$"+NUM(p.B)+"bn"],
     ["Total lending",NUM(E0.q)+" to "+NUM(E1.q)],["Private investment",NUM(E0.q)+" to "+NUM(Ip)],
     ["Crowded out",NUM(crowd)+", or "+NUM(crowd/p.B*100)+"% of the borrowing"],
     ["Extra saving drawn out by the higher rate",NUM(E1.q-E0.q)]],
   say:"Borrowing of "+NUM(p.B)+" raises the real interest rate from "+NUM(E0.p)+"% to "+NUM(E1.p)+"% and crowds out "+NUM(crowd)+" of private investment.",
   alt:"The loanable funds market with the real interest rate on the vertical axis and the quantity of loanable funds on the horizontal axis. Saving slopes upward and private investment demand slopes downward, meeting at "+NUM(E0.p)+" per cent and "+NUM(E0.q)+". Government borrowing of "+NUM(p.B)+" shifts demand for loanable funds right; the real interest rate rises to "+NUM(E1.p)+" per cent and total lending to "+NUM(E1.q)+". At the higher rate private investment, read from the original demand curve, falls to "+NUM(Ip)+": "+NUM(crowd)+" of private investment is crowded out.",
   note:"This plate uses the loanable funds model, which the IB accepts for crowding out. Saving supplies funds and private investment demands them. Government borrowing of "+NUM(p.B)+" to finance a budget deficit adds to demand, shifting it from D to D₁. The real interest rate rises from "+NUM(E0.p)+"% to "+NUM(E1.p)+"%, and at that rate firms borrow only "+NUM(Ip)+" instead of "+NUM(E0.q)+": "+NUM(crowd)+" of private investment is crowded out. Crowding out is partial here, because the higher rate also draws out extra saving; its size depends on how responsive saving and investment are to the interest rate, and Keynesian economists argue it is small when there is spare capacity."};
 }});

/* ── HL 4.6 · the J-curve ─────────────────────────────────────────────── */
/* Exports keep their domestic-currency price; import prices in domestic
   currency rise with the depreciation as pass-through completes (time
   constant tp), and volumes respond more slowly (time constant tv) towards
   their long-run price elasticities. */
function dgxJ(p){
 const CA=t=>{if(t<=p.t0)return p.X0-p.M0;const s=t-p.t0,pi=1-Math.exp(-s/p.tp),v=1-Math.exp(-s/p.tv);
  return p.X0*(1+p.ex*v*p.d)-p.M0*(1+pi*p.d)*(1-p.em*v*p.d)};
 const ca0=p.X0-p.M0;
 /* the trough: a fine scan, then golden-section refinement */
 let tm=p.t0,mn=Infinity;for(let i=0;i<=1400;i++){const t=p.t0+(p.T-p.t0)*i/1400,v=CA(t);if(v<mn){mn=v;tm=t}}
 let lo=Math.max(p.t0,tm-0.02),hi=Math.min(p.T,tm+0.02);const g=(Math.sqrt(5)-1)/2;
 for(let i=0;i<60;i++){const x1=hi-g*(hi-lo),x2=lo+g*(hi-lo);if(CA(x1)<CA(x2))hi=x2;else lo=x1}
 tm=(lo+hi)/2;mn=CA(tm);
 const cross=lev=>{if(CA(p.T)<lev)return null;let a=tm,b=p.T;for(let i=0;i<80;i++){const m=(a+b)/2;if(CA(m)<lev)a=m;else b=m}return (a+b)/2};
 const lr=p.X0*(1+p.ex*p.d)-p.M0*(1+p.d)*(1-p.em*p.d);
 return {CA,ca0,tm,mn,tc:cross(ca0),tz:cross(0),lr,end:CA(p.T)};
}
defModel("jcurve",{sub:"4.6",t:"The J-curve after a depreciation",
 model:"Current account balance over time: import prices adjust before trade volumes do",
 x:"Time (quarters)",y:"Current account balance",
 par:{X0:95,M0:100,d:0.1,ex:1.0,em:0.8,t0:2,tp:1,tv:4,T:16,O:12},
 build(p){
  const J=dgxJ(p),O=p.O,must=[p.t0,J.tm,J.tc,J.tz].filter(x=>x!==null);
  const ml=p.X0*p.ex+p.M0*(1+p.d)*p.em>p.M0;
  const points=[{k:"A",label:"depreciation",q:p.t0,p:O+J.ca0,on:["CA","START"],col:CPOL,dx:0,dy:-11,a:"middle"},
    {k:"B",label:"trough",q:J.tm,p:O+J.mn,on:["CA"],col:CW,dx:9,dy:5}];
  const guides=[{q:p.t0,p:O+J.ca0,xLab:"t₀",yLab:NUM(J.ca0)},{q:J.tm,p:O+J.mn,xLab:"t₁",yLab:NUM(J.mn),col:"#E4DED2",lc:CW}];
  if(J.tc!==null){points.push({k:"C",label:"C",q:J.tc,p:O+J.ca0,on:["CA","START"],col:CG,dx:8,dy:15});guides.push({q:J.tc,p:O+J.ca0,xLab:"t₂",col:"#E4DED2",lc:CG})}
  if(J.tz!==null){points.push({k:"D",label:"D",q:J.tz,p:O,on:["CA","ZERO"],col:G.C.ok,dx:8,dy:15});guides.push({q:J.tz,p:O,xLab:"t₃",col:"#E4DED2",lc:G.C.ok})}
  const sumE=NUM(p.ex+p.em);
  return{xmax:16.8,ymax:18,
   eqs:["Before t₀: exports "+p.X0+", imports "+p.M0+", current account "+NUM(J.ca0)+" (constructed, illustrative values)",
     "Depreciation of "+NUM(p.d*100)+"% at t₀ = "+p.t0+": import prices in domestic currency rise by up to "+NUM(p.d*100)+"%, passed through with a time constant of "+p.tp+" quarter",
     "Volumes respond with a time constant of "+p.tv+" quarters towards |PEDx| = "+NUM(p.ex)+" and |PEDm| = "+NUM(p.em),
     "CA(t) = exports × (1 + |PEDx| × v(t) × "+p.d+") − imports × (1 + π(t) × "+p.d+") × (1 − |PEDm| × v(t) × "+p.d+")",
     "Trough at t₁ = "+NUM(J.tm)+": "+NUM(J.mn)+(J.tc!==null?"; starting balance regained at t₂ = "+NUM(J.tc):"; starting balance not regained")+(J.tz!==null?"; surplus from t₃ = "+NUM(J.tz):""),
     "Long-run balance "+NUM(J.lr)+": "+(ml?"above":"below")+" the starting balance"],
   curves:[{k:"ZERO",label:"",c:LIN(O,0),col:G.C.gr,w:1.4,q0:0,q1:16.4},
     {k:"START",label:"starting balance",c:LIN(O+J.ca0,0),col:CG,dash:"5,4",w:1.6,q0:0,q1:16.4,labA:"end",labAt:16.4,labDx:0,labDy:J.end>J.ca0?14:-8},
     {k:"CA",label:"current account",c:POLY(dgxPolyJ(J,p,must)),col:CD,labDx:-88,labDy:J.end>J.ca0?-12:16}],
   points,guides,
   marks:[{q:-0.25,p:O-0.25,text:"0",col:G.C.gr,sz:10,a:"end"},
     {q:0.3,p:O+0.9,text:"surplus",col:G.C.ok,sz:9.5,it:1},{q:0.3,p:O-1.5,text:"deficit",col:CW,sz:9.5,it:1},
     {q:J.tm+0.7,p:O+J.mn-1.4,text:"import prices rise before volumes respond",col:CW,sz:9},
     {q:Math.min(13.6,(J.tc!==null?J.tc:J.tm)+2.6),p:O+Math.min(J.ca0,J.end)-2.6,text:ml?"volumes respond: Marshall-Lerner condition met":"volumes respond, but too little",col:ml?G.C.ok:CW,sz:9}],
   facts:[["Starting balance",NUM(J.ca0)],["Trough",NUM(J.mn)+" at t₁ = "+NUM(J.tm)],
     ["Starting balance regained",J.tc!==null?"at t₂ = "+NUM(J.tc):"not within "+p.T+" quarters"],
     ["Surplus reached",J.tz!==null?"at t₃ = "+NUM(J.tz):"not within "+p.T+" quarters"],
     ["Balance after "+p.T+" quarters",NUM(J.end)],["Long-run balance",NUM(J.lr)],
     ["Sum of the absolute elasticities",sumE+(p.ex+p.em>1?" > 1":" < 1")]],
   say:"With |PEDx| + |PEDm| = "+sumE+", the balance falls to "+NUM(J.mn)+" and "+(J.end>J.ca0?"ends above its starting level, at "+NUM(J.end)+".":"stays below its starting level, ending at "+NUM(J.end)+"."),
   alt:"Time in quarters is on the horizontal axis and the current account balance on the vertical axis, with a zero line separating surplus from deficit. The balance starts in deficit at "+NUM(J.ca0)+". After a depreciation at t nought it first worsens, to a trough of "+NUM(J.mn)+" at t one, because import prices rise before trade volumes adjust. "+(J.tc!==null?"It then improves, regains its starting level at t two"+(J.tz!==null?" and moves into surplus at t three":"")+", tracing the shape of a J.":"It then improves only slightly and stays below its starting level, because the elasticities are too low."),
   note:ml?"The current account starts in deficit. A depreciation at t₀ makes imports dearer in domestic currency at once, while export and import volumes are held in the short run by contracts and habit, so the balance worsens to its trough at t₁. As volumes respond, exports rise and imports fall. Because the sum of the absolute values of the price elasticities of demand for exports and imports is "+sumE+", greater than one (the Marshall-Lerner condition), the balance recovers past its starting level"+(J.tz!==null?" at t₂ and moves into surplus at t₃.":".")
     :"Here the sum of the absolute values of the price elasticities of demand for exports and imports is only "+sumE+", so the Marshall-Lerner condition fails: after the initial worsening, volumes respond too little to offset dearer imports and the balance stays below its starting level. A depreciation improves the current account only if demand for exports and imports is elastic enough."};
 }});
function dgxPolyJ(J,p,must){const qs=[];for(let i=0;i<=336;i++)qs.push(p.T*i/336);must.forEach(t=>qs.push(t));qs.sort((x,y)=>x-y);
 return qs.filter((t,i)=>i===0||t>qs[i-1]).map(t=>[t,J.CA(t)+p.O])}

/* ── HL 2.11 · perfect competition: the industry and the firm ──────────── */
defModel("pcfirm",{sub:"2.11",t:"Perfect competition: the industry and the firm",
 model:"Industry demand and supply set the price; the firm is a price taker with a cubic cost function",
 x:"Quantity: industry Q (thousands), firm q (units)",y:"Price and cost ($ per unit)",
 par:Object.assign({Da:12.25,Db:0.1,Sc:0.25,Sd:0.1,off:125},DGX_FIRM),
 build(p){
  const C=dgxCost(p.a,p.b,p.c,p.F),D=LIN(p.Da,-p.Db),S=LIN(p.Sc,p.Sd),E=XSECT(D,S),q=C.qOfP(E.p),o=p.off,atcq=C.atc(q);
  return{xmax:230,ymax:16,
   eqs:["Industry: D: P = "+p.Da+" − "+p.Db+"Q,  S: P = "+p.Sc+" + "+p.Sd+"Q  →  Pe = "+NUM(E.p)+", Qe = "+NUM(E.q),
     "Firm: D = AR = MR = P = "+NUM(E.p)+" (horizontal: the firm takes the price)",
     "Firm: TC = "+p.F+" + "+p.a+"q − "+p.b+"q² + "+p.c+"q³, so MC = "+p.a+" − "+NUM(2*p.b)+"q + "+NUM(3*p.c)+"q²",
     "MC = MR → q = "+NUM(q)+";  ATC there = "+NUM(atcq)+";  minimum ATC = "+NUM(C.atc(C.qAtcMin))+" at q = "+NUM(C.qAtcMin)],
   curves:[{k:"AX",label:"",c:VERT(o),col:G.C.ink,w:1.5,q1:15.4},
     {k:"D",label:"D",c:D,col:CD,q1:95},{k:"S",label:"S",c:S,col:CS,q1:95},
     {k:"AR",label:"D = AR = MR = P",c:LIN(E.p,0),col:CD,q0:o,q1:o+100,labA:"end",labAt:o+100,labDx:0,labDy:15},
     {k:"MC",label:"MC",c:dgxPoly(C.mc,5,73,140,[q],o),col:CS,labDy:2},
     {k:"ATC",label:"ATC",c:dgxPoly(C.atc,12,96,170,[q],o),col:"#8A6D1F",labDy:4}],
   points:[{k:"E",label:"E",q:E.q,p:E.p,on:["D","S"],dx:-2,dy:-10},
     {k:"F",label:"P = MC = min ATC",q:o+q,p:E.p,on:["MC","AR","ATC"],col:CW,dx:-12,dy:19,a:"end"}],
   guides:[{q:E.q,p:E.p,xLab:"Qe = "+NUM(E.q),yLab:"Pe = "+NUM(E.p)},{q:o+q,p:E.p,xLab:"qe = "+NUM(q),col:"#E4DED2",lc:CW}],
   marks:[{q:4,p:14.6,text:"Industry",col:"#4B545A",sz:10.5,fw:700},{q:o+34,p:14.6,text:"Firm",col:"#4B545A",sz:10.5,fw:700}],
   facts:[["Industry price",NUM(E.p)],["Industry output",NUM(E.q)+" thousand"],["Firm's output",NUM(q)+" units, where MC = MR"],
     ["Firm's ATC at that output",NUM(atcq)],["Minimum ATC",NUM(C.atc(C.qAtcMin))],
     ["Profit","normal: P = ATC, so revenue just covers all costs including normal profit"],
     ["Efficiency","allocative (P = MC) and productive (output at minimum ATC)"]],
   alt:"Two panels share one price axis. On the left the industry's demand and supply curves meet at a price of "+NUM(E.p)+" and an industry output of "+NUM(E.q)+" thousand. The price is carried across to the right-hand panel, where the individual firm faces a horizontal demand curve at that price, which is also its average revenue and marginal revenue. The firm's marginal cost curve cuts its average total cost curve at the minimum, at "+NUM(q)+" units, where it also meets the price line, so the firm earns normal profit.",
   note:"The industry's demand and supply set the price, Pe = "+NUM(E.p)+". Each firm is too small to influence it and can sell any quantity at Pe, so its demand curve is horizontal, and because each extra unit adds exactly Pe to revenue, D = AR = MR = P. The firm maximises profit where MC = MR, at q = "+NUM(q)+". In long-run equilibrium entry and exit have brought the price to the minimum of ATC, so P = ATC and the firm earns normal profit; with P = MC it is allocatively efficient, and producing at minimum ATC it is productively efficient."};
 }});
function dgxFirmModel(id,o){
 defModel(id,{sub:"2.11",t:o.t,model:o.model,x:"Output of the firm (units per period)",y:"Price, cost and revenue ($ per unit)",
  par:Object.assign({P:o.P},DGX_FIRM),
  build(p){
   const C=dgxCost(p.a,p.b,p.c,p.F),q=C.qOfP(p.P),atcq=C.atc(q),avcq=C.avc(q),pr=(p.P-atcq)*q,gain=pr>0;
   const curves=[gain?{k:"AR",label:"D = AR = MR = P₁",c:LIN(p.P,0),col:CD,q0:0,q1:104,labAt:26,labDx:0,labDy:-8}
      :{k:"AR",label:"D = AR = MR = P₁",c:LIN(p.P,0),col:CD,q0:0,q1:104,labA:"end",labAt:104,labDx:0,labDy:15},
     {k:"MC",label:"MC",c:dgxPoly(C.mc,5,73,140,[q]),col:CS,labDy:2},
     {k:"ATC",label:"ATC",c:dgxPoly(C.atc,12,100,180,[q]),col:"#8A6D1F",labDy:4}];
   if(o.avc)curves.push({k:"AVC",label:"AVC",c:dgxPoly(C.avc,3,100,140,[q]),col:"#5B4B8A",dash:"6,4",labDy:6});
   return{xmax:110,ymax:16,
    eqs:["TC = "+p.F+" + "+p.a+"q − "+p.b+"q² + "+p.c+"q³  (fixed cost "+p.F+")",
      "MC = "+p.a+" − "+NUM(2*p.b)+"q + "+NUM(3*p.c)+"q²;  ATC = "+p.a+" − "+p.b+"q + "+p.c+"q² + "+p.F+"/q",
      "D = AR = MR = P₁ = "+NUM(p.P)+": the firm takes the industry price",
      "MC = MR on the rising part of MC → q₁ = "+NUM(q),
      (gain?"Abnormal profit":"Loss")+" = ("+NUM(Math.max(p.P,atcq))+" − "+NUM(Math.min(p.P,atcq))+") × "+NUM(q)+" = "+NUM(Math.abs(pr))],
    curves,
    areas:[gain?{pts:[[0,atcq],[0,p.P],[q,p.P],[q,atcq]],fill:"#1D6B47",op:.2,label:"Abnormal profit = "+NUM(pr),at:[q/2,(p.P+atcq)/2-0.2],lc:"#145034",sz:9.5}
      :{pts:[[0,p.P],[0,atcq],[q,atcq],[q,p.P]],fill:CW,op:.24,label:"Loss = "+NUM(-pr),at:[q/2,(p.P+atcq)/2-0.2],lc:CW,sz:9.5}],
    points:[gain?{k:"E",label:"MC = MR",q,p:p.P,on:["MC","AR"],col:CW,dx:9,dy:-9}:{k:"E",label:"MC = MR",q,p:p.P,on:["MC","AR"],col:CW,dx:-9,dy:-9,a:"end"},
      {k:"T",label:"",q,p:atcq,on:["ATC"],col:"#8A6D1F"}],
    guides:[{q,p:p.P,xLab:"q₁ = "+NUM(q),yLab:"P₁ = "+NUM(p.P)},{q,p:atcq,yLab:"ATC = "+NUM(atcq),col:"#E4DED2",lc:"#8A6D1F"}],
    facts:[["Market price",NUM(p.P)],["Output where MC = MR",NUM(q)+" units"],["Average total cost at q₁",NUM(atcq)],
      ["Average variable cost at q₁",NUM(avcq)],[gain?"Abnormal profit":"Loss",NUM(Math.abs(pr))],
      ["Minimum ATC (the long-run price)",NUM(C.atc(C.qAtcMin))+" at "+NUM(C.qAtcMin)+" units"],
      ["Minimum AVC",NUM(C.avc(C.qAvcMin))+" at "+NUM(C.qAvcMin)+" units"]].concat(gain?[]:[["Short-run decision",p.P>=C.avc(C.qAvcMin)?"keep producing: price covers average variable cost, so the loss ("+NUM(-pr)+") is smaller than the fixed cost ("+p.F+") lost by shutting down":"shut down: price does not cover average variable cost"]]),
    say:o.say(p,q,atcq,pr),
    alt:o.alt(p,q,atcq,avcq,pr),
    note:o.note(p,q,atcq,avcq,pr,C)};
  }});
}
dgxFirmModel("pcprofit",{t:"Perfect competition: abnormal profit in the short run",model:"A price-taking firm with price above average total cost",P:9.4,
 say:(p,q,a,pr)=>"At a price of "+NUM(p.P)+" the firm produces "+NUM(q)+" units and earns abnormal profit of "+NUM(pr)+".",
 alt:(p,q,a,v,pr)=>"A perfectly competitive firm faces a horizontal demand curve at the market price of "+NUM(p.P)+", which is also its average and marginal revenue. Its marginal cost curve falls and then rises, cutting the U-shaped average total cost curve at its minimum. The firm produces "+NUM(q)+" units, where marginal cost equals marginal revenue; average total cost there is "+NUM(a)+", so the shaded rectangle between the price and average total cost is abnormal profit of "+NUM(pr)+".",
 note:(p,q,a,v,pr)=>"At P₁ = "+NUM(p.P)+" the firm produces q₁ = "+NUM(q)+", where MC = MR = P. Average total cost at that output is "+NUM(a)+", so each unit earns "+NUM(p.P-a)+" above average cost and abnormal profit is ("+NUM(p.P)+" − "+NUM(a)+") × "+NUM(q)+" = "+NUM(pr)+". This is a short-run position: with free entry the abnormal profit attracts new firms, industry supply shifts right and the price falls towards minimum ATC, where profit returns to normal."});
dgxFirmModel("pcloss",{t:"Perfect competition: a loss in the short run",model:"A price-taking firm with price below average total cost but above average variable cost",P:4,avc:true,
 say:(p,q,a,pr)=>"At a price of "+NUM(p.P)+" the firm produces "+NUM(q)+" units and makes a loss of "+NUM(-pr)+".",
 alt:(p,q,a,v,pr)=>"A perfectly competitive firm faces a horizontal demand curve at the market price of "+NUM(p.P)+". Its marginal cost curve cuts both the average variable cost curve and the average total cost curve at their minimum points. The firm produces "+NUM(q)+" units, where marginal cost equals marginal revenue. Average total cost there is "+NUM(a)+", above the price, so the shaded rectangle is a loss of "+NUM(-pr)+"; the price still exceeds average variable cost of "+NUM(v)+".",
 note:(p,q,a,v,pr,C)=>"At P₁ = "+NUM(p.P)+" the firm produces q₁ = "+NUM(q)+", where MC = MR. Average total cost there is "+NUM(a)+", so it makes a loss of ("+NUM(a)+" − "+NUM(p.P)+") × "+NUM(q)+" = "+NUM(-pr)+". The price still exceeds average variable cost ("+NUM(v)+" at this output), so producing covers all variable costs and part of the fixed cost: the loss is smaller than the fixed cost of "+C.F+" that shutting down would lose, and the firm stays open in the short run. If the price stays below minimum ATC, firms leave in the long run, supply falls and the price rises towards minimum ATC."});

/* ── HL 2.11 · natural monopoly ────────────────────────────────────────── */
defModel("natmon",{sub:"2.11",t:"Natural monopoly",model:"Large fixed cost and constant marginal cost: LRAC falls over the whole range of market demand",
 x:"Output (units per period)",y:"Price, cost and revenue ($ per unit)",
 par:{a:20,b:0.1,c:4,K:480},
 build(p){
  const D=LIN(p.a,-p.b),MR=LIN(p.a,-2*p.b),MC=LIN(p.c,0),lrac=q=>p.c+p.K/q;
  const Em=XSECT(MR,MC),Pm=D.p(Em.q),Ec=XSECT(D,MC);
  /* average-cost pricing: a − bQ = c + K/Q, the larger root of bQ² − (a − c)Q + K = 0 */
  const qa=((p.a-p.c)+Math.sqrt((p.a-p.c)*(p.a-p.c)-4*p.b*p.K))/(2*p.b),pa=D.p(qa);
  const prof=(Pm-lrac(Em.q))*Em.q,loss=(lrac(Ec.q)-p.c)*Ec.q;
  return{xmax:220,ymax:24,
   eqs:["D = AR: P = "+p.a+" − "+p.b+"Q;  MR: P = "+p.a+" − "+NUM(2*p.b)+"Q (twice the slope)",
     "LRMC = "+p.c+";  LRAC = "+p.c+" + "+p.K+"/Q, falling at every output",
     "Unregulated, MC = MR → Q = "+NUM(Em.q)+", P = "+NUM(Pm)+", LRAC = "+NUM(lrac(Em.q))+", abnormal profit = "+NUM(prof),
     "Average-cost pricing, P = LRAC → Q = "+NUM(qa)+", P = "+NUM(pa)+", normal profit",
     "Marginal-cost pricing, P = MC → Q = "+NUM(Ec.q)+", P = "+NUM(p.c)+", LRAC = "+NUM(lrac(Ec.q))+", loss = "+NUM(loss)],
   curves:[{k:"D",label:"D = AR",c:D,col:CD,q1:196},
     {k:"MR",label:"MR",c:MR,col:"#7B3FA0",q1:94,labDy:2},
     {k:"MC",label:"LRMC",c:MC,col:CS,q1:210,labA:"end",labAt:210,labDx:0,labDy:14},
     {k:"LRAC",label:"LRAC",c:dgxPoly(lrac,25,210,160,[Em.q,qa,Ec.q]),col:"#8A6D1F",labDy:-6}],
   areas:[{pts:[[0,lrac(Em.q)],[0,Pm],[Em.q,Pm],[Em.q,lrac(Em.q)]],fill:"#1D6B47",op:.2,label:"Abnormal profit = "+NUM(prof),at:[Em.q/2,(Pm+lrac(Em.q))/2-0.35],lc:"#145034",sz:9.5}],
   points:[{k:"Em",label:"unregulated",q:Em.q,p:Pm,on:["D"],dx:8,dy:-8},
     {k:"Emr",label:"MC = MR",q:Em.q,p:p.c,on:["MR","MC"],col:"#7B3FA0",dx:-8,dy:16,a:"end"},
     {k:"Ea",label:"P = AC",q:qa,p:pa,on:["D","LRAC"],col:"#8A6D1F",dx:8,dy:-8},
     {k:"Ec",label:"P = MC",q:Ec.q,p:p.c,on:["D","MC"],col:CW,dx:7,dy:-9}],
   guides:[{q:Em.q,p:Pm,xLab:"Qm = "+NUM(Em.q),yLab:"Pm = "+NUM(Pm)},
     {q:Em.q,p:lrac(Em.q),yLab:"AC = "+NUM(lrac(Em.q)),col:"#E4DED2",lc:"#8A6D1F"},
     {q:qa,p:pa,xLab:"Qac = "+NUM(qa),yLab:"Pac = "+NUM(pa),col:"#E4DED2",lc:"#8A6D1F"},
     {q:Ec.q,p:p.c,xLab:"Qmc = "+NUM(Ec.q),yLab:"MC = "+NUM(p.c),col:"#E4DED2",lc:CW}],
   facts:[["Unregulated output and price",NUM(Em.q)+" units at "+NUM(Pm)],["Abnormal profit, unregulated",NUM(prof)],
     ["Average-cost pricing",NUM(qa)+" units at "+NUM(pa)+": normal profit"],
     ["Marginal-cost pricing",NUM(Ec.q)+" units at "+NUM(p.c)+": allocatively efficient"],
     ["Loss under marginal-cost pricing",NUM(loss)+", equal to the fixed cost, so a subsidy would be needed"],
     ["LRAC where demand reaches zero",NUM(lrac(p.a/p.b))+", still falling"]],
   alt:"A natural monopoly. Long-run average cost falls continuously across the whole range of output for which there is demand, with long-run marginal cost constant below it at "+NUM(p.c)+". Unregulated, the firm produces "+NUM(Em.q)+" units where marginal cost equals marginal revenue and charges "+NUM(Pm)+", earning the shaded abnormal profit. Average-cost pricing gives "+NUM(qa)+" units at "+NUM(pa)+" with normal profit. Marginal-cost pricing gives the allocatively efficient "+NUM(Ec.q)+" units at "+NUM(p.c)+", but average cost there is "+NUM(lrac(Ec.q))+", so the firm makes a loss.",
   note:"Because the fixed cost is very large and the cost of each extra unit is constant, long-run average cost falls over the whole range of output for which there is demand: one firm can supply the market more cheaply than two or more could. Left alone it produces where MC = MR, "+NUM(Em.q)+" units at "+NUM(Pm)+", and earns abnormal profit. Forcing the price down to marginal cost ("+NUM(Ec.q)+" units at "+NUM(p.c)+") would be allocatively efficient, but the price would then be below average cost and the loss of "+NUM(loss)+", equal to the fixed cost, would need a subsidy. Average-cost pricing at "+NUM(qa)+" units for "+NUM(pa)+" gives normal profit, a common regulatory compromise."};
 }});

/* ── HL 2.11 · collusive oligopoly ─────────────────────────────────────── */
defModel("cartel",{sub:"2.11",t:"Collusive oligopoly: a cartel acting as a monopolist",
 model:"Industry demand, derived MR and the members' summed marginal cost",
 x:"Industry output (units per period)",y:"Price, cost and revenue ($ per unit)",
 par:{a:20,b:0.1,m0:5,m:0.025,F:30},
 build(p){
  const D=LIN(p.a,-p.b),MR=LIN(p.a,-2*p.b),MC=LIN(p.m0,2*p.m),atc=q=>p.F/q+p.m0+p.m*q;
  const Ek=XSECT(MR,MC),Pk=D.p(Ek.q),Ec=XSECT(D,MC),ak=atc(Ek.q),prof=(Pk-ak)*Ek.q,wl=0.5*(Ec.q-Ek.q)*(Pk-Ek.p);
  return{xmax:220,ymax:22,
   eqs:["Industry D = AR: P = "+p.a+" − "+p.b+"Q;  MR: P = "+p.a+" − "+NUM(2*p.b)+"Q",
     "MC (the members' marginal costs summed): "+p.m0+" + "+NUM(2*p.m)+"Q;  ATC = "+p.F+"/Q + "+p.m0+" + "+p.m+"Q",
     "Joint profit maximisation, MC = MR → Q = "+NUM(Ek.q)+", price read from AR → P = "+NUM(Pk),
     "Joint abnormal profit = ("+NUM(Pk)+" − "+NUM(ak)+") × "+NUM(Ek.q)+" = "+NUM(prof),
     "Competitive outcome, P = MC → Q = "+NUM(Ec.q)+", P = "+NUM(Ec.p)],
   curves:[{k:"D",label:"D = AR (industry)",c:D,col:CD,q1:190,labA:"end",labAt:190,labDx:0,labDy:-9},
     {k:"MR",label:"MR",c:MR,col:"#7B3FA0",q1:95,labDy:2},
     {k:"MC",label:"MC (sum of members' MC)",c:MC,col:CS,q1:200,labA:"end",labAt:200,labDx:0,labDy:-9},
     {k:"ATC",label:"ATC",c:dgxPoly(atc,3.5,210,240,[Ek.q,Ec.q]),col:"#8A6D1F",labDy:5}],
   areas:[{pts:[[0,ak],[0,Pk],[Ek.q,Pk],[Ek.q,ak]],fill:"#1D6B47",op:.2,label:"Joint abnormal",at:[Ek.q*0.38,(Pk+ak)/2+0.5],lc:"#145034",sz:9.5},
     {pts:[[Ek.q,Pk],[Ec.q,Ec.p],[Ek.q,Ek.p]],fill:CW,op:.26,label:"welfare loss",at:[Ek.q+5,Ek.p+2.4],anchor:"start",lc:CW,sz:9}],
   points:[{k:"Ek",label:"cartel price",q:Ek.q,p:Pk,on:["D"],dx:8,dy:-8},
     {k:"Emr",label:"MC = MR",q:Ek.q,p:Ek.p,on:["MR","MC"],col:"#7B3FA0",dx:-9,dy:-6,a:"end"},
     {k:"Ec",label:"P = MC",q:Ec.q,p:Ec.p,on:["D","MC"],col:CG,dx:-6,dy:19,a:"middle"}],
   guides:[{q:Ek.q,p:Pk,xLab:"Q₁ = "+NUM(Ek.q),yLab:"P₁ = "+NUM(Pk)},{q:Ek.q,p:ak,yLab:"ATC = "+NUM(ak),col:"#E4DED2",lc:"#8A6D1F"},
     {q:Ec.q,p:Ec.p,xLab:"Qc = "+NUM(Ec.q),yLab:"Pc = "+NUM(Ec.p),col:"#E4DED2",lc:CG}],
   marks:[{q:Ek.q*0.38,p:(Pk+ak)/2-0.5,text:"profit = "+NUM(prof),col:"#145034",sz:9.5,a:"middle",fw:700},
     {q:108,p:20.3,text:"Q₁ is shared out as quotas among the members",col:"#4B545A",sz:9.5,it:1}],
   facts:[["Cartel output",NUM(Ek.q)+" units, shared as quotas"],["Cartel price",NUM(Pk)],["Average total cost",NUM(ak)],
     ["Joint abnormal profit",NUM(prof)],["Competitive outcome",NUM(Ec.q)+" units at "+NUM(Ec.p)],["Welfare loss against P = MC",NUM(wl)],
     ["Incentive to cheat","each member gains by selling beyond its quota at "+NUM(Pk)+", since its MC there is only "+NUM(Ek.p)]],
   alt:"A cartel faces the industry demand curve, which is its average revenue; marginal revenue falls twice as steeply. The members' marginal cost curves summed give the industry marginal cost. Joint profit is maximised where marginal cost equals marginal revenue at "+NUM(Ek.q)+" units, and the cartel price of "+NUM(Pk)+" is read from the demand curve. The shaded rectangle between price and average total cost of "+NUM(ak)+" is the joint abnormal profit, shared out through quotas. The competitive outcome, where price equals marginal cost, would be "+NUM(Ec.q)+" units at "+NUM(Ec.p)+".",
   note:"Firms in a collusive oligopoly agree to act as a single monopolist. Their summed marginal cost is the industry MC; joint profit is maximised where it equals industry MR, at "+NUM(Ek.q)+" units, and the price of "+NUM(Pk)+" is read from industry demand. Joint abnormal profit is ("+NUM(Pk)+" − "+NUM(ak)+") × "+NUM(Ek.q)+" = "+NUM(prof)+", divided among the members through output quotas. Compared with the competitive outcome where P = MC, output is lower and the price higher. Each member can gain by secretly producing beyond its quota at the high price, so cartels tend to be unstable, and formal price-fixing agreements are illegal under the competition law of most economies."};
 }});

/* ── HL 2.11 · monopolistic competition ───────────────────────────────── */
defModel("mcsr",{sub:"2.11",t:"Monopolistic competition: abnormal profit in the short run",
 model:"A differentiated product: downward-sloping, relatively elastic demand; the cubic cost function",
 x:"Output of the firm (units per period)",y:"Price, cost and revenue ($ per unit)",
 par:Object.assign({A:16,s:0.15},DGX_FIRM),
 build(p){
  const C=dgxCost(p.a,p.b,p.c,p.F),AR=LIN(p.A,-p.s),MR=LIN(p.A,-2*p.s);
  /* MR = MC: 3cq² + (2s − 2b)q + (a − A) = 0 */
  const B=2*p.s-2*p.b,q=(-B+Math.sqrt(B*B-12*p.c*(p.a-p.A)))/(6*p.c),P=AR.p(q),aq=C.atc(q),pr=(P-aq)*q;
  return{xmax:110,ymax:18,
   eqs:["D = AR: P = "+p.A+" − "+p.s+"q;  MR: P = "+p.A+" − "+NUM(2*p.s)+"q (twice the slope)",
     "MC = "+p.a+" − "+NUM(2*p.b)+"q + "+NUM(3*p.c)+"q²;  ATC = "+p.a+" − "+p.b+"q + "+p.c+"q² + "+p.F+"/q",
     "MR = MC → q₁ = "+NUM(q)+";  price read up to AR → P₁ = "+NUM(P),
     "ATC at q₁ = "+NUM(aq)+";  abnormal profit = ("+NUM(P)+" − "+NUM(aq)+") × "+NUM(q)+" = "+NUM(pr)],
   curves:[{k:"AR",label:"D = AR",c:AR,col:CD,q1:100,labDy:-4},
     {k:"MR",label:"MR",c:MR,col:"#7B3FA0",q1:50,labDy:2},
     {k:"MC",label:"MC",c:dgxPoly(C.mc,5,77,140,[q]),col:CS,labDy:2},
     {k:"ATC",label:"ATC",c:dgxPoly(C.atc,11,100,180,[q]),col:"#8A6D1F",labDy:4}],
   areas:[{pts:[[0,aq],[0,P],[q,P],[q,aq]],fill:"#1D6B47",op:.2,label:"Abnormal profit = "+NUM(pr),at:[q/2,(P+aq)/2-0.2],lc:"#145034",sz:9.5}],
   points:[{k:"E",label:"",q,p:P,on:["AR"],col:CD},
     {k:"Emr",label:"MC = MR",q,p:MR.p(q),on:["MR","MC"],col:"#7B3FA0",dx:-9,dy:-8,a:"end"},
     {k:"T",label:"",q,p:aq,on:["ATC"],col:"#8A6D1F"}],
   guides:[{q,p:P,xLab:"q₁ = "+NUM(q),yLab:"P₁ = "+NUM(P)},{q,p:aq,yLab:"ATC = "+NUM(aq),col:"#E4DED2",lc:"#8A6D1F"}],
   facts:[["Output where MC = MR",NUM(q)+" units"],["Price, read from AR",NUM(P)],["Average total cost",NUM(aq)],
     ["Abnormal profit",NUM(pr)],["Price against marginal cost","P exceeds MC ("+NUM(C.mc(q))+"): the firm has some price-setting power"],
     ["What happens next","entry: the firm's demand shifts left and becomes more elastic until profit is normal"]],
   alt:"A firm in monopolistic competition faces a downward-sloping demand curve, its average revenue, with marginal revenue falling twice as steeply. Marginal cost cuts the U-shaped average total cost curve at its minimum. The firm produces "+NUM(q)+" units where marginal cost equals marginal revenue and charges "+NUM(P)+", read from the demand curve. Average total cost there is "+NUM(aq)+", so the shaded rectangle is abnormal profit of "+NUM(pr)+".",
   note:"A firm in monopolistic competition sells a differentiated product, so it faces a downward-sloping demand curve, flatter (more price elastic) than a monopolist's because close substitutes exist. It maximises profit where MC = MR, at q₁ = "+NUM(q)+", and charges P₁ = "+NUM(P)+" from the AR curve. ATC is "+NUM(aq)+" at that output, so abnormal profit is "+NUM(pr)+". Barriers to entry are low, so the profit attracts new firms whose products take some of this firm's customers: its demand curve shifts left and becomes more elastic until only normal profit remains."};
 }});
defModel("mclr",{sub:"2.11",t:"Monopolistic competition: normal profit in the long run",
 model:"Entry until AR is tangent to ATC; the same cubic cost function",
 x:"Output of the firm (units per period)",y:"Price, cost and revenue ($ per unit)",
 par:Object.assign({qs:30},DGX_FIRM),
 build(p){
  const C=dgxCost(p.a,p.b,p.c,p.F),q=p.qs,s=-C.datc(q),A=C.atc(q)+s*q,AR=LIN(A,-s),MR=LIN(A,-2*s);
  const P=AR.p(q),qm=C.qAtcMin,am=C.atc(qm);
  return{xmax:110,ymax:16,
   eqs:["Entry continues until AR is tangent to ATC: at q* = "+NUM(q)+", ATC = "+NUM(P)+" and its slope is −"+NUM(s),
     "So D = AR: P = "+NUM(A)+" − "+NUM(s)+"q;  MR: P = "+NUM(A)+" − "+NUM(2*s)+"q",
     "At q*: MR = "+NUM(MR.p(q))+" = MC = "+NUM(C.mc(q))+", so q* is also the profit-maximising output",
     "Minimum ATC = "+NUM(am)+" at q = "+NUM(qm)+";  excess capacity = "+NUM(qm)+" − "+NUM(q)+" = "+NUM(qm-q)],
   curves:[{k:"AR",label:"D = AR",c:AR,col:CD,q1:70,labDy:-4},
     {k:"MR",label:"MR",c:MR,col:"#7B3FA0",q1:35.5,labDy:-10},
     {k:"MC",label:"MC",c:dgxPoly(C.mc,5,73,140,[q,qm]),col:CS,labDy:2},
     {k:"ATC",label:"ATC",c:dgxPoly(C.atc,12,100,180,[q,qm]),col:"#8A6D1F",labDy:4}],
   points:[{k:"T",label:"P = ATC",q,p:P,on:["AR","ATC"],col:CW,dx:9,dy:-9},
     {k:"Emr",label:"MC = MR",q,p:MR.p(q),on:["MR","MC"],col:"#7B3FA0",dx:-11,dy:-6,a:"end"},
     {k:"M",label:"minimum ATC",q:qm,p:am,on:["ATC","MC"],col:"#8A6D1F",dx:9,dy:16}],
   guides:[{q,p:P,xLab:"q* = "+NUM(q),yLab:"P = "+NUM(P)},{q:qm,p:am,xLab:"q = "+NUM(qm),col:"#E4DED2",lc:"#8A6D1F"}],
   arrows:[[q+0.8,0.9,qm-0.8,0.9]],
   marks:[{q:qm+1.2,p:0.62,text:"excess capacity",col:CW,sz:9.5}],
   facts:[["Output, where MC = MR",NUM(q)+" units"],["Price",NUM(P)+", equal to ATC: normal profit"],
     ["Minimum ATC",NUM(am)+" at "+NUM(qm)+" units"],["Excess capacity",NUM(qm-q)+" units"],
     ["Productive efficiency","no: output is below the level of minimum ATC"],
     ["Allocative efficiency","no: price "+NUM(P)+" exceeds MC "+NUM(C.mc(q))]],
   alt:"Long-run equilibrium in monopolistic competition. Entry has shifted the firm's downward-sloping demand curve left until it just touches the average total cost curve at "+NUM(q)+" units, where price equals average total cost at "+NUM(P)+" and the firm earns normal profit. Marginal revenue equals marginal cost at the same output. The tangency lies on the falling part of average total cost, to the left of its minimum at "+NUM(qm)+" units; the gap is excess capacity.",
   note:"Entry has shifted the firm's demand curve left until AR just touches ATC at q* = "+NUM(q)+", so P = ATC = "+NUM(P)+" and profit is normal. The tangency is also where MC = MR: at q* both equal "+NUM(C.mc(q))+". Because AR slopes down, the tangency lies on the falling part of ATC, to the left of its minimum at "+NUM(qm)+" units: the firm has excess capacity of "+NUM(qm-q)+" units and is not productively efficient. Price exceeds marginal cost, so it is not allocatively efficient either, although consumers gain variety from the differentiated products."};
 }});

/* ── 4.1 · free trade with exports ────────────────────────────────────── */
defModel("tradeexp",{sub:"4.1",t:"Free trade: the world price above the domestic price (exports)",
 model:"Small open economy, world price taker, with a comparative advantage in the good",
 x:"Quantity of the good (units per period)",y:"Price ($ per unit)",
 par:Object.assign({},BASE,{pw:14}),
 build(p){
  const D=LIN(p.a,-p.b),S=LIN(p.c,p.d),W=LIN(p.pw,0),E0=XSECT(D,S),Qd=D.q(p.pw),Qs=S.q(p.pw);
  const cs0=0.5*(p.a-E0.p)*E0.q,cs1=0.5*(p.a-p.pw)*Qd,ps0=0.5*(E0.p-p.c)*E0.q,ps1=0.5*(p.pw-p.c)*Qs,gain=0.5*(Qs-Qd)*(p.pw-E0.p);
  return{xmax:220,ymax:22,
   eqs:["D: P = "+p.a+" − "+p.b+"Q;  S: P = "+p.c+" + "+p.d+"Q  →  without trade Pe = "+NUM(E0.p)+", Qe = "+NUM(E0.q),
     "World price Pw = "+p.pw+": Qd = "+NUM(Qd)+", Qs = "+NUM(Qs),
     "Exports = Qs − Qd = "+NUM(Qs-Qd),
     "Consumer surplus "+NUM(cs0)+" → "+NUM(cs1)+";  producer surplus "+NUM(ps0)+" → "+NUM(ps1),
     "Net gain = ½ × "+NUM(Qs-Qd)+" × ("+p.pw+" − "+NUM(E0.p)+") = "+NUM(gain)],
   curves:[{k:"D",label:"D (domestic)",c:D,col:CD,q1:190},{k:"S",label:"S (domestic)",c:S,col:CS,q1:196},
     {k:"W",label:"Pw (world price)",c:W,col:G.C.cap,q0:0,q1:212,labA:"end",labAt:212,labDx:0,labDy:-7}],
   areas:[{pts:[[Qd,p.pw],[Qs,p.pw],[E0.q,E0.p]],fill:"#1D6B47",op:.24,label:"",at:null}],
   points:[{k:"E0",label:"E₀ (no trade)",q:E0.q,p:E0.p,on:["D","S"],dx:9,dy:5},
     {k:"A",label:"",q:Qd,p:p.pw,on:["D","W"],col:CD},{k:"B",label:"",q:Qs,p:p.pw,on:["S","W"],col:CS}],
   guides:[{q:E0.q,p:E0.p,xLab:"Qe = "+NUM(E0.q),yLab:"Pe = "+NUM(E0.p)},
     {q:Qd,p:p.pw,xLab:"Qd = "+NUM(Qd),yLab:"Pw = "+NUM(p.pw),col:"#E4DED2",lc:CD},
     {q:Qs,p:p.pw,xLab:"Qs = "+NUM(Qs),col:"#E4DED2",lc:CS}],
   arrows:[[Qd+2,p.pw+1.5,Qs-2,p.pw+1.5]],
   marks:[{q:(Qd+Qs)/2,p:p.pw+2.2,text:"exports = "+NUM(Qs-Qd),col:G.C.cap,sz:9.5,a:"middle"},
     {q:(Qd+Qs+E0.q)/3,p:(2*p.pw+E0.p)/3-0.25,text:"gain = "+NUM(gain),col:"#145034",sz:9,a:"middle",fw:700}],
   facts:[["Price without trade",NUM(E0.p)],["World price",NUM(p.pw)],["Domestic quantity demanded",NUM(E0.q)+" to "+NUM(Qd)],
     ["Domestic quantity supplied",NUM(E0.q)+" to "+NUM(Qs)],["Exports",NUM(Qs-Qd)],
     ["Change in consumer surplus",NUM(cs1-cs0)],["Change in producer surplus","+"+NUM(ps1-ps0)],["Net gain from trade",NUM(gain)]],
   say:"At a world price of "+NUM(p.pw)+" the economy exports "+NUM(Qs-Qd)+" units and gains "+NUM(gain)+".",
   alt:"Domestic demand and supply meet at "+NUM(E0.p)+" and "+NUM(E0.q)+" units without trade. The world price of "+NUM(p.pw)+" lies above the domestic price. At the world price domestic quantity demanded falls to "+NUM(Qd)+" and domestic quantity supplied rises to "+NUM(Qs)+"; the difference of "+NUM(Qs-Qd)+" is exported. The shaded triangle between the curves, below the world price, is the net gain in community surplus of "+NUM(gain)+".",
   note:"Before trade the domestic market clears at Pe = "+NUM(E0.p)+" and "+NUM(E0.q)+" units. Opening to trade at a world price of "+NUM(p.pw)+", above the domestic price, raises the price domestic buyers pay: quantity demanded falls to "+NUM(Qd)+" while domestic producers expand to "+NUM(Qs)+", and the difference of "+NUM(Qs-Qd)+" is exported. Consumer surplus falls by "+NUM(cs0-cs1)+" and producer surplus rises by "+NUM(ps1-ps0)+", so the economy gains "+NUM(gain)+", the shaded triangle, even though domestic consumers lose."};
 }});

/* ── 4.5 · a fixed exchange rate held by intervention ──────────────────── */
defModel("fixedfx",{sub:"4.5",t:"A fixed exchange rate maintained by the central bank",
 model:"Demand for and supply of the domestic currency, with the central bank buying at the fixed rate",
 x:"Quantity of domestic currency traded (bn units per period)",
 y:"Exchange rate: units of foreign currency per 1 unit of domestic currency",
 par:{a:1.5,b:0.005,c:0.5,d:0.005,shift:0.2},
 build(p){
  const D0=LIN(p.a,-p.b),D1=LIN(p.a-p.shift,-p.b),S=LIN(p.c,p.d),E0=XSECT(D0,S),ef=E0.p,F=LIN(ef,0),E1=XSECT(D1,S);
  const Qd=D1.q(ef),Qs=S.q(ef),buy=Qs-Qd;
  return{xmax:190,ymax:1.7,
   eqs:["D₀: e = "+p.a+" − "+p.b+"Q;  S: e = "+p.c+" + "+p.d+"Q  →  fixed rate e = "+NUM(ef),
     "Demand falls: D₁: e = "+NUM(p.a-p.shift)+" − "+p.b+"Q",
     "At the fixed rate: quantity demanded "+NUM(Qd)+", quantity supplied "+NUM(Qs),
     "Excess supply bought by the central bank with foreign currency reserves = "+NUM(buy),
     "Without intervention: e₁ = "+NUM(E1.p)+", Q = "+NUM(E1.q)],
   curves:[{k:"D0",label:"D₀ = D₁ + central bank purchases",c:D0,col:CD,q1:176,labAt:8,labDx:0,labDy:-10},
     {k:"D1",label:"D₁",c:D1,col:CD,dash:"6,4",q1:156,labDy:4},
     {k:"S",label:"S",c:S,col:CS,q1:170},
     {k:"F",label:"fixed rate",c:F,col:CPOL,q0:0,q1:182,labA:"end",labAt:182,labDx:0,labDy:-6}],
   points:[{k:"E0",label:"E₀",q:E0.q,p:ef,on:["D0","S","F"],dx:6,dy:-9},
     {k:"A",label:"A",q:Qd,p:ef,on:["D1","F"],col:CW,dx:-7,dy:-9,a:"end"},
     {k:"E1",label:"E₁",q:E1.q,p:E1.p,on:["D1","S"],col:CG,dx:18,dy:4}],
   guides:[{q:E0.q,p:ef,xLab:"Qs = "+NUM(Qs),yLab:"efix = "+NUM(ef)},
     {q:Qd,p:ef,xLab:"Qd = "+NUM(Qd),col:"#E4DED2",lc:CW},
     {q:E1.q,p:E1.p,yLab:"e₁ = "+NUM(E1.p),col:"#E4DED2",lc:CG}],
   arrows:[[Qd+2,ef+0.07,Qs-2,ef+0.07]],
   marks:[{q:(Qd+Qs)/2+2,p:ef+0.12,text:"bought with reserves = "+NUM(buy),col:CPOL,sz:9.5,a:"middle"}],
   facts:[["Fixed exchange rate",NUM(ef)],["Fall in demand for the currency","D₀ to D₁"],
     ["Excess supply at the fixed rate",NUM(buy)+" bn"],["Central bank action","buys "+NUM(buy)+" bn of its currency, paying with foreign currency reserves"],
     ["Rate without intervention",NUM(E1.p)],["Alternative","raise interest rates to attract capital inflows and lift demand"]],
   say:"A fall in demand of "+NUM(p.shift)+" leaves an excess supply of "+NUM(buy)+" bn at the fixed rate, which the central bank buys; otherwise the rate would fall to "+NUM(E1.p)+".",
   alt:"The foreign exchange market for the domestic currency, with the exchange rate as units of foreign currency per one unit of domestic currency. The central bank fixes the rate at "+NUM(ef)+", where demand and supply first meet. Demand for the currency then falls from D nought to D one. At the fixed rate quantity supplied, "+NUM(Qs)+", now exceeds quantity demanded, "+NUM(Qd)+". The central bank buys the excess supply of "+NUM(buy)+" with its foreign currency reserves, so demand including its purchases stays at D nought and the rate holds; without intervention it would fall to "+NUM(E1.p)+".",
   note:"The central bank has fixed the exchange rate at "+NUM(ef)+" unit of foreign currency per unit of domestic currency, where the market first cleared. Demand for the currency then falls from D₀ to D₁. Left to the market, the rate would fall to "+NUM(E1.p)+". At the fixed rate there is an excess supply of "+NUM(buy)+" bn of the domestic currency, so the central bank buys it with its foreign currency reserves; its purchases keep total demand at D₀ and hold the rate. The policy can last only as long as the reserves do, so a persistent fall in demand calls for higher interest rates, capital controls or, eventually, a devaluation."};
 }});

/* ── 3.3 · structural unemployment ────────────────────────────────────── */
defModel("structural",{sub:"3.3",t:"Structural unemployment: a fall in the demand for labour in one market",
 model:"The labour market of a declining industry or region, with a wage slow to fall",
 x:"Quantity of labour (thousands of workers)",y:"Wage ($ per hour)",
 par:{a:20,b:0.1,c:4,d:0.1,fall:4},
 build(p){
  const L0=LIN(p.a,-p.b),L1=LIN(p.a-p.fall,-p.b),Ls=LIN(p.c,p.d),E0=XSECT(L0,Ls),W=LIN(E0.p,0),E1=XSECT(L1,Ls),Ld=L1.q(E0.p),U=E0.q-Ld;
  return{xmax:170,ymax:24,
   eqs:["DL₀: W = "+p.a+" − "+p.b+"L;  SL: W = "+p.c+" + "+p.d+"L  →  W₀ = "+NUM(E0.p)+", L₀ = "+NUM(E0.q),
     "Demand for labour in this industry falls: DL₁: W = "+(p.a-p.fall)+" − "+p.b+"L",
     "Wage held at W₀ = "+NUM(E0.p)+": labour demanded "+NUM(Ld)+", labour supplied "+NUM(E0.q),
     "Unemployment at W₀ = "+NUM(E0.q)+" − "+NUM(Ld)+" = "+NUM(U)+" thousand",
     "If the wage fell fully: W₁ = "+NUM(E1.p)+", L₂ = "+NUM(E1.q)],
   curves:[{k:"L0",label:"DL₀",c:L0,col:CD,q1:155},{k:"L1",label:"DL₁",c:L1,col:CD,dash:"6,4",q1:140},
     {k:"Ls",label:"SL",c:Ls,col:CS,q1:155},
     {k:"W",label:"wage slow to fall",c:W,col:CPOL,dash:"7,4",q0:0,q1:160,labA:"end",labAt:160,labDx:0,labDy:-6}],
   points:[{k:"E0",label:"E₀",q:E0.q,p:E0.p,on:["L0","Ls","W"],dx:7,dy:-9},
     {k:"A",label:"A",q:Ld,p:E0.p,on:["L1","W"],col:CW,dx:-7,dy:-9,a:"end"},
     {k:"E1",label:"E₁",q:E1.q,p:E1.p,on:["L1","Ls"],col:CG,dx:18,dy:4}],
   guides:[{q:E0.q,p:E0.p,xLab:"L₀ = "+NUM(E0.q),yLab:"W₀ = "+NUM(E0.p)},{q:Ld,p:E0.p,xLab:"L₁ = "+NUM(Ld),col:"#E4DED2",lc:CW},
     {q:E1.q,p:E1.p,xLab:"L₂ = "+NUM(E1.q),yLab:"W₁ = "+NUM(E1.p),col:"#E4DED2",lc:CG}],
   arrows:[[Ld+2,E0.p+1.5,E0.q-2,E0.p+1.5],[E0.q+56,5.7,E0.q+24,5.7]],
   marks:[{q:(Ld+E0.q)/2,p:E0.p+2.3,text:"unemployed = "+NUM(U),col:CW,sz:9.5,a:"middle"}],
   facts:[["Original wage and employment",NUM(E0.p)+" and "+NUM(E0.q)+" thousand"],["Employment at the unchanged wage",NUM(Ld)+" thousand"],
     ["Structural unemployment in this market",NUM(U)+" thousand"],["Wage if it fell fully",NUM(E1.p)],
     ["Workers who leave this market even then",NUM(E0.q-E1.q)+" thousand"],
     ["Why it persists","occupational and geographical immobility: skills and location do not match the vacancies elsewhere"]],
   say:"A fall of "+NUM(p.fall)+" in labour demand leaves "+NUM(U)+" thousand workers unemployed at the unchanged wage of "+NUM(E0.p)+".",
   alt:"The labour market of one industry or region, with the wage on the vertical axis and the quantity of labour on the horizontal axis. Demand for labour falls from DL nought to DL one. The wage stays at "+NUM(E0.p)+", so employers now hire "+NUM(Ld)+" thousand workers while "+NUM(E0.q)+" thousand still offer to work: "+NUM(U)+" thousand are unemployed. If the wage fell fully, the market would clear at "+NUM(E1.p)+" with "+NUM(E1.q)+" thousand employed.",
   note:"Demand for labour in one industry or region falls from DL₀ to DL₁, for example as an old industry declines or technology replaces a skill. If the wage stays at W₀ = "+NUM(E0.p)+" because wages are slow to fall, employers want only "+NUM(Ld)+" thousand workers while "+NUM(E0.q)+" thousand still offer to work: "+NUM(U)+" thousand become unemployed. Even if the wage fell to "+NUM(E1.p)+", "+NUM(E0.q-E1.q)+" thousand workers would leave this market, and whether they find work elsewhere depends on whether their skills and location match the vacancies. That mismatch is what makes the unemployment structural rather than cyclical, and why retraining, help with moving and better job information are the usual policy responses."};
 }});

/* ── 2.5 · the Engel curve ────────────────────────────────────────────── */
function dgxYed(f,y){const h=1e-4*Math.max(1,y);return (f(y+h)-f(y-h))/(2*h)*y/f(y)}
defModel("engel",{sub:"2.5",t:"Engel curves: income elasticity of demand",
 model:"Quantity demanded as income rises, for a necessity, a luxury and an inferior good",
 x:"Quantity demanded (units per month)",y:"Income ($ thousand per year)",
 par:{k1:9,e1:0.5,k2:0.04,e2:1.6,al:2,be:0.02,y1:64,y2:75},
 build(p){
  const nec=y=>p.k1*Math.pow(y,p.e1),lux=y=>p.k2*Math.pow(y,p.e2),inf=y=>p.al*y-p.be*y*y,yt=p.al/(2*p.be);
  const curve=(f,y0,y1,must)=>{const ys=[];for(let i=0;i<=200;i++)ys.push(y0+(y1-y0)*i/200);must.forEach(y=>ys.push(y));ys.sort((a,b)=>a-b);return POLY(ys.map(y=>[f(y),y]))};
  const yn=dgxYed(nec,p.y1),yl=dgxYed(lux,p.y1),yi=dgxYed(inf,p.y2);
  return{xmax:110,ymax:110,
   eqs:["Necessity: Q = "+p.k1+" × Y^"+p.e1+", so YED = "+p.e1+" at every income",
     "Luxury: Q = "+p.k2+" × Y^"+p.e2+", so YED = "+p.e2+" at every income",
     "Inferior at higher incomes: Q = "+p.al+"Y − "+p.be+"Y², turning back at Y = "+NUM(yt),
     "YED = (dQ/dY) × (Y/Q), computed at the marked points: "+NUM(yn)+", "+NUM(yl)+" and "+NUM(yi)],
   curves:[{k:"NEC",label:"necessity: 0 < YED < 1",c:curve(nec,0,100,[p.y1]),col:CD},
     {k:"LUX",label:"luxury: YED > 1",c:curve(lux,0,100,[p.y1]),col:CS},
     {k:"INF",label:"inferior: YED < 0",c:curve(inf,0,95,[yt,p.y2]),col:"#5B4B8A"}],
   points:[{k:"N",label:"YED = "+NUM(yn),q:nec(p.y1),p:p.y1,on:["NEC"],col:CD,dx:9,dy:4},
     {k:"L",label:"YED = "+NUM(yl),q:lux(p.y1),p:p.y1,on:["LUX"],col:CS,dx:9,dy:5},
     {k:"T",label:"turning point",q:inf(yt),p:yt,on:["INF"],col:"#5B4B8A",dx:9,dy:4},
     {k:"I",label:"YED = "+NUM(yi),q:inf(p.y2),p:p.y2,on:["INF"],col:"#5B4B8A",dx:9,dy:4}],
   guides:[{q:lux(p.y1),p:p.y1,yLab:"Y = "+NUM(p.y1),col:"#E4DED2"},{q:inf(yt),p:yt,yLab:"Y = "+NUM(yt),col:"#E4DED2"}],
   facts:[["Necessity at Y = "+NUM(p.y1),"Q = "+NUM(nec(p.y1))+", YED = "+NUM(yn)],["Luxury at Y = "+NUM(p.y1),"Q = "+NUM(lux(p.y1))+", YED = "+NUM(yl)],
     ["Inferior good's turning point","Y = "+NUM(yt)+", Q = "+NUM(inf(yt))+", YED = 0"],["Inferior good at Y = "+NUM(p.y2),"Q = "+NUM(inf(p.y2))+", YED = "+NUM(yi)],
     ["Reading the curvature","steepening for a necessity, flattening for a luxury, bending back once a good becomes inferior"]],
   alt:"Engel curves with income on the vertical axis and quantity demanded on the horizontal axis. The necessity curve rises steeply as income grows, because quantity demanded rises less than proportionally: income elasticity is "+NUM(yn)+". The luxury curve flattens, because quantity rises more than proportionally: income elasticity is "+NUM(yl)+". The inferior good's curve rises at low incomes, turns back at an income of "+NUM(yt)+" and then slopes back towards the income axis, with an income elasticity of "+NUM(yi)+" at an income of "+NUM(p.y2)+".",
   note:"An Engel curve shows how the quantity demanded of a good changes as income rises, with prices and tastes held constant. For a necessity quantity rises less than proportionally (0 < YED < 1), so the curve steepens as income rises. For a luxury quantity rises more than proportionally (YED > 1), so the curve flattens. An inferior good is normal at low incomes, but beyond the turning point quantity falls as income rises (YED < 0) and the curve bends back. Each YED shown is computed from the curve at the marked point, not read from its slope, because elasticity compares percentage changes."};
 }});

/* ── 4.9 · the poverty cycle (a flow schematic) ───────────────────────── */
DG.povcycle=()=>({t:"The poverty cycle",x:"",y:"",
 alt:"A loop of four boxes joined by arrows. Low incomes lead to low saving; low saving leads to low investment in physical and human capital; low investment leads to low productivity; low productivity leads back to low incomes. Beneath the loop, the ways the cycle can be broken are listed: aid, foreign direct investment, remittances, microcredit and public spending on health and education.",
 note:"Low incomes leave little to save, so investment in physical capital and in human capital (education and health) stays low, productivity stays low and incomes remain low. The cycle can be broken where something raises one link from outside: aid, foreign direct investment, remittances, microcredit, or public spending on health and education. Whether a break lasts depends on institutions and governance, which the diagram does not show.",
 b:(()=>{const cx=G.W/2,box=(x,y,w,l1,l2,c)=>`<rect x="${x-w/2}" y="${y-24}" width="${w}" height="48" rx="9" fill="#fff" stroke="${c}" stroke-width="1.8"/>`
   +(l2?P.t(x,y-4,l1,{a:"middle",sz:11,c:G.C.ink})+P.t(x,y+12,l2,{a:"middle",sz:11,c:G.C.ink}):P.t(x,y+4,l1,{a:"middle",sz:11.5,c:G.C.ink}));
  const T=[cx,78],R=[cx+178,190],B=[cx,302],L=[cx-178,190];let s="";
  s+=box(T[0],T[1],170,"Low incomes","",G.C.w)+box(R[0],R[1],170,"Low saving","",G.C.w)
   +box(B[0],B[1],210,"Low investment in physical","and human capital",G.C.w)+box(L[0],L[1],170,"Low productivity","",G.C.w);
  s+=P.ln(cx+88,88,R[0]-30,R[1]-28,G.C.w,{w:2,arrow:1})+P.ln(R[0]-30,R[1]+28,cx+108,B[1]-28,G.C.w,{w:2,arrow:1})
   +P.ln(cx-108,B[1]-28,L[0]+30,L[1]+28,G.C.w,{w:2,arrow:1})+P.ln(L[0]+30,L[1]-28,cx-88,88,G.C.w,{w:2,arrow:1});
  s+=P.t(cx,186,"a self-reinforcing",{a:"middle",sz:10.5,c:"#77828A",it:1})+P.t(cx,201,"cycle",{a:"middle",sz:10.5,c:"#77828A",it:1});
  s+=P.t(cx,354,"Ways to break the cycle",{a:"middle",sz:10.5,c:G.C.ok,fw:700})
   +P.t(cx,372,"aid · foreign direct investment · remittances · microcredit",{a:"middle",sz:10.5,c:G.C.ok,fw:500})
   +P.t(cx,389,"public spending on health and education",{a:"middle",sz:10.5,c:G.C.ok,fw:500});
  return s})()});

/* ── registration: the engine, the atlas, the groupings, the topic pages ── */
const DGX_KEYS=["moneymkt","crowdout","jcurve","pcfirm","pcprofit","pcloss","natmon","cartel","mcsr","mclr","tradeexp","fixedfx","structural","engel"];
DGX_KEYS.forEach(k=>{DG[k]=()=>dgxArrows(k,renderModel(k));if(!MODELKEYS.includes(k))MODELKEYS.push(k)});
if(typeof NOAXES!=="undefined")NOAXES.add("povcycle");   /* a flow diagram, declared as one */
SCHEMATIC.povcycle="The poverty cycle: a flow schematic of self-reinforcing low income, with no axes and no equilibrium to compute.";
DGKEYS.length=0;Object.keys(DG).forEach(k=>DGKEYS.push(k));
const DGX_SUBS={moneymkt:"3.5",crowdout:"3.6",jcurve:"4.6",pcfirm:"2.11",pcprofit:"2.11",pcloss:"2.11",natmon:"2.11",cartel:"2.11",
 mcsr:"2.11",mclr:"2.11",tradeexp:"4.1",fixedfx:"4.5",structural:"3.3",engel:"2.5",povcycle:"4.9"};
Object.assign(DGSUB,DGX_SUBS);
if(typeof MOTIF_DG!=="undefined")Object.assign(MOTIF_DG,{moneymkt:"adas",crowdout:"adas",jcurve:"fx",pcfirm:"costs",pcprofit:"costs",pcloss:"costs",
 natmon:"costs",cartel:"costs",mcsr:"costs",mclr:"costs",tradeexp:"cadv",fixedfx:"fx",structural:"labour",engel:"elastic",povcycle:"poverty"});
const DGX_ATLAS=[
 ["Unit 2 · Markets","ped",[["engel","Engel curves and income elasticity","2.5"]]],
 ["Unit 2 · HL extension","monopoly",[["pcfirm","Perfect competition: industry and firm (HL)","2.11"],["pcprofit","Perfect competition: abnormal profit (HL)","2.11"],
   ["pcloss","Perfect competition: loss in the short run (HL)","2.11"],["natmon","Natural monopoly (HL)","2.11"],["cartel","Collusive oligopoly: a cartel (HL)","2.11"],
   ["mcsr","Monopolistic competition: short run (HL)","2.11"],["mclr","Monopolistic competition: long run (HL)","2.11"]]],
 ["Unit 3 · Objectives and policy","labour",[["structural","Structural unemployment","3.3"]]],
 ["Unit 3 · Objectives and policy","lorenz",[["moneymkt","Money market and the interest rate (HL)","3.5"]]],
 ["Unit 3 · Objectives and policy","multiplier",[["crowdout","Crowding out: loanable funds (HL)","3.6"]]],
 ["Unit 4 · The global economy","compadv",[["tradeexp","Free trade with exports","4.1"]]],
 ["Unit 4 · The global economy","fx",[["fixedfx","Fixed exchange rate and intervention","4.5"]]],
 ["Unit 4 · The global economy","bop",[["jcurve","The J-curve and Marshall-Lerner (HL)","4.6"],["povcycle","The poverty cycle","4.9"]]]];
(function(){
 /* each new plate is placed after the plate it belongs beside, once */
 DGX_ATLAS.forEach(([g,after,items])=>{const grp=ATLAS.find(x=>x.g===g);if(!grp)return;
  let at=grp.items.findIndex(i=>i[0]===after);
  items.forEach(it=>{if(grp.items.some(i=>i[0]===it[0]))return;if(at<0)grp.items.push(it);else{grp.items.splice(at+1,0,it);at++}})});
 const put=(re,after,keys)=>{const grp=DGGROUPS.find(x=>re.test(x[0]));if(!grp)return;let at=grp[1].indexOf(after);
  keys.forEach(k=>{if(grp[1].includes(k))return;if(at<0)grp[1].push(k);else{grp[1].splice(at+1,0,k);at++}})};
 put(/^Microeconomics/,"ped",["engel"]);
 put(/Market failure/,"monopoly",["pcfirm","pcprofit","pcloss","natmon","cartel","mcsr","mclr"]);
 put(/Macroeconomics/,"multiplier",["structural","moneymkt","crowdout"]);
 put(/global economy/,"bop",["tradeexp","fixedfx","jcurve","povcycle"]);
 /* the gaps these plates close are removed from the atlas's list of what it does not draw */
 for(let i=ATLASGAPS.length-1;i>=0;i--)if(/Engel curve|Perfectly competitive firm|Money market|Crowding out|J-curve|Poverty cycle/.test(ATLASGAPS[i][1]))ATLASGAPS.splice(i,1);
})();

/* ── the reading guide: what changes, why, what is not shown, the common mistake ── */
Object.assign(DG_READ,{
 moneymkt:{changes:"The central bank raises the money supply from Ms₀ = 150 to Ms₁ = 200. Money demand Md does not move; the equilibrium slides down Md from E₀ to E₁, and the interest rate falls from 6% to 4%.",
  why:"At the old rate of 6% more money is supplied than people wish to hold. They use the surplus to buy bonds, which raises bond prices and lowers their yield, so the interest rate falls until the quantity of money demanded equals the new supply.",
  notShown:"It does not show how the lower rate reaches spending: the effect on consumption, investment, the exchange rate and AD depends on confidence, on whether banks pass the cut on, and on whether rates are already close to zero.",
  mistake:"Drawing money supply as upward-sloping, or shifting Md when the central bank acts. Ms is vertical because the central bank sets it, and a change in the money supply moves the equilibrium along an unchanged Md."},
 crowdout:{changes:"Government borrowing of 60 shifts demand for loanable funds from D to D₁. The real interest rate rises from 7% to 8.5%, total lending rises from 100 to 130, and private investment falls from 100 to 70.",
  why:"The government competes with firms for the same pool of saving. A higher real interest rate raises the cost of borrowing, so some private projects no longer cover their cost and are dropped, while some extra saving is drawn out.",
  notShown:"It ignores the multiplier effect of the extra government spending on income and saving, capital inflows from abroad that can hold interest rates down, and any boost that public investment gives to private investment.",
  mistake:"Shifting the supply of loanable funds instead of demand, or reading private investment off D₁. The fall in private investment is read off the original private demand curve D at the new, higher interest rate."},
 jcurve:{changes:"After the depreciation at t₀ the current account balance falls from −5 to a trough of −7.34 at t₁, regains −5 at t₂ and moves into surplus at t₃: the path traces a J.",
  why:"Import prices in domestic currency rise as soon as the currency falls, but contracts and habits hold volumes almost unchanged at first, so spending on imports rises. Over time buyers switch: export volumes rise and import volumes fall.",
  notShown:"It assumes the depreciation is not eroded by higher domestic inflation, that trading partners do not respond and that incomes are unchanged; it says nothing about the financial account or about inflation.",
  mistake:"Putting the exchange rate on the vertical axis, or starting the curve at zero. The vertical axis is the current account balance with a zero line, the horizontal axis is time, and the dip comes before the improvement."},
 pcfirm:{changes:"Nothing shifts: the industry sets Pe = 6.25 where D meets S, and the firm takes that price, producing q = 50 where MC = MR; price equals minimum ATC there, so the firm earns normal profit.",
  why:"With many firms selling an identical product and free entry and exit, a firm charging above Pe sells nothing, and abnormal profit or loss brings entry or exit until the price settles at minimum ATC.",
  notShown:"It assumes perfect information, identical products and no barriers to entry, conditions rarely met in full; it says nothing about how long entry and exit take or about innovation.",
  mistake:"Drawing the firm's demand curve downward-sloping, or using one quantity scale for firm and industry. The firm's demand is horizontal at the industry price, and its output is a tiny fraction of industry output."},
 pcprofit:{changes:"At the market price P₁ = 9.4 the firm produces q₁ = 60 where MC = MR; ATC there is 6.5, so the rectangle between P₁ and ATC up to q₁ is abnormal profit of 174.",
  why:"A price taker maximises profit by producing until the cost of the last unit equals the price. Because price exceeds average cost at that output, revenue covers all costs, including the normal profit that keeps the firm in the industry, with some to spare.",
  notShown:"It is a short-run snapshot: it does not show the entry of new firms that the profit attracts, which shifts industry supply right and lowers the price towards minimum ATC.",
  mistake:"Producing where ATC is lowest, or drawing the profit rectangle up to the MC curve. Output is set where MC = MR, and the rectangle runs from ATC to P at that output."},
 pcloss:{changes:"At the market price P₁ = 4 the firm produces q₁ = 40 where MC = MR; ATC there is 6.55, so the rectangle between ATC and P₁ up to q₁ is a loss of 102.",
  why:"Price is below average total cost but above average variable cost, so each unit produced covers its variable cost and contributes to fixed cost. Producing loses 102; shutting down would lose the whole fixed cost of 150.",
  notShown:"It does not show the exit of firms in the long run, which shifts industry supply left and raises the price towards minimum ATC, nor the time it takes for fixed costs to become avoidable.",
  mistake:"Shading the loss down to AVC, or assuming a loss-making firm closes at once. The loss rectangle runs from P up to ATC at q₁, and the firm keeps producing in the short run while price covers average variable cost."},
 natmon:{changes:"Nothing shifts: the plate compares three outcomes on one demand curve: unregulated profit maximisation at 80 units and 12, average-cost pricing at 120 units and 8, and marginal-cost pricing at 160 units and 4.",
  why:"With LRAC still falling where it meets demand, splitting the market between firms would raise average cost, so a regulator chooses a pricing rule instead, trading allocative efficiency against the firm's need to cover its costs.",
  notShown:"It assumes the regulator knows the firm's costs; in practice a regulated firm may let costs rise (X-inefficiency), and new technology can change which parts of an industry are natural monopolies.",
  mistake:"Drawing LRAC as U-shaped with its minimum inside the market, or MC cutting LRAC. For a natural monopoly LRAC is still falling where it meets demand, so marginal cost lies below average cost throughout."},
 cartel:{changes:"Nothing shifts: the members restrict combined output to Q₁ = 60 where industry MC = MR and charge P₁ = 14, earning joint abnormal profit of 420, against a competitive outcome of 100 units at 10.",
  why:"Acting together the firms face the whole industry demand curve, so selling more means cutting the price on every unit. Restricting output to where MC = MR maximises the profit they share through quotas.",
  notShown:"It does not show how quotas are agreed and policed, each member's incentive to cheat, fines from competition authorities, or entry by firms outside the cartel.",
  mistake:"Drawing one firm's demand curve instead of industry demand, or setting the price where MC meets MR. The cartel finds output where MC = MR and reads the price up to industry AR."},
 mcsr:{changes:"Nothing shifts yet: the firm produces q₁ = 40 where MC = MR, charges P₁ = 10 read from AR, and earns abnormal profit of 138 because price exceeds ATC of 6.55 at that output.",
  why:"Product differentiation gives the firm some control over its price, so MR lies below AR, but close substitutes keep demand fairly elastic. The abnormal profit lasts only until new entrants take some of the firm's customers.",
  notShown:"It does not show the advertising, branding and other non-price competition that create differentiation, nor how quickly entry happens.",
  mistake:"Drawing a horizontal demand curve as in perfect competition, or reading price off MR. Demand slopes down because the product is differentiated, and price is read up from q₁ to AR."},
 mclr:{changes:"Entry has shifted the firm's demand curve left until AR is tangent to ATC at q* = 30: price equals ATC at 7.65, MC = MR at that output, and profit is normal. Minimum ATC lies at 50 units.",
  why:"While abnormal profit remains, new firms enter and take customers; while losses persist, firms leave. Entry stops when AR just touches ATC, and because AR slopes down that point lies left of minimum ATC.",
  notShown:"It ignores the value consumers place on variety and the cost of advertising, and it assumes free entry; in practice brand loyalty can let established firms keep some abnormal profit.",
  mistake:"Drawing AR crossing ATC rather than touching it, or placing the tangency at minimum ATC. The tangency lies on the falling part of ATC, which is what creates excess capacity."},
 tradeexp:{changes:"Opening to trade at Pw = 14 raises the domestic price from 10: quantity demanded falls from 100 to 60, quantity supplied by domestic firms rises to 140, and the 80 units in between are exported.",
  why:"With a comparative advantage in the good, domestic producers can sell abroad at the higher world price, so they will not sell at home for less; domestic buyers therefore pay the world price too.",
  notShown:"It assumes a small economy that cannot affect the world price, no transport costs and fully mobile factors; it ignores who bears the cost of adjustment and how the gain is shared between groups.",
  mistake:"Drawing the world price below the domestic equilibrium for an exported good, or measuring exports from zero. Exports are the horizontal gap between domestic quantity supplied and quantity demanded at the world price."},
 fixedfx:{changes:"Demand for the currency falls from D₀ to D₁. Without intervention the rate would fall from 1 to 0.9; instead the central bank buys the excess supply of 40bn at the fixed rate, so demand including its purchases stays at D₀.",
  why:"Under a fixed exchange rate the central bank commits to buy or sell its currency at the announced rate. Buying its own currency with foreign currency reserves adds to demand and stops the rate from falling.",
  notShown:"It does not show the cost: reserves run down, and the alternative of raising interest rates to attract capital inflows can slow the domestic economy. It also leaves out speculation against the peg.",
  mistake:"Shifting supply instead of demand, or letting the rate fall to the new intersection. Under a fixed rate the price does not move; the gap at the fixed rate is closed by the central bank's purchases."},
 structural:{changes:"Demand for labour in this industry falls from DL₀ to DL₁. At the unchanged wage of 12, employment drops from 80 to 40 thousand, leaving 40 thousand workers unemployed; a fully flexible wage would settle at 10.",
  why:"The fall in demand comes from a lasting change, such as new technology or competition from abroad, not from the business cycle, so the jobs do not return in a recovery. Workers whose skills or location do not match vacancies stay unemployed.",
  notShown:"It shows one market only: it does not show rising labour demand in growing industries, or the time and cost of retraining and moving that decide how long the unemployment lasts.",
  mistake:"Showing a fall in aggregate demand on an AD-AS diagram, which illustrates cyclical unemployment. Structural unemployment is shown in the labour market of a particular industry, occupation or region."},
 engel:{changes:"Nothing shifts: the plate traces three goods as income rises. At an income of 64 the necessity has YED = 0.5 and the luxury YED = 1.6; the inferior good turns back at an income of 50 and has YED = −2 at 75.",
  why:"YED compares the percentage change in quantity with the percentage change in income. Spending on basic food tends to rise slowly as people get richer, spending on luxuries quickly, and cheaper goods are replaced once better ones are affordable.",
  notShown:"It holds prices and tastes constant and treats each good in isolation; whether a good is a necessity, a luxury or inferior differs between countries and between income levels.",
  mistake:"Confusing an Engel curve with a demand curve: price is on neither axis. Income is plotted against quantity demanded, and the slope at a point is not the YED, which compares percentage changes."},
 povcycle:{changes:"Nothing shifts: the plate traces one loop. Low incomes lead to low saving, low saving to low investment in physical and human capital, low investment to low productivity, and low productivity back to low incomes.",
  why:"Each link limits the next. Households close to subsistence spend nearly all their income, so there is little saving to finance investment, and without investment output per worker cannot rise.",
  notShown:"It leaves out the institutions, conflict, geography, inequality and terms of trade that also keep incomes low, and it cannot say which link a policy should target first or how large an intervention needs to be.",
  mistake:"Presenting the cycle as unbreakable, or listing the links without arrows that show cause. Each box causes the next, and the evaluation lies in which intervention breaks the cycle and whether the break lasts."}});

/* ── what the atlas adds per plate: exam guidance, limitations, real-world use ── */
const DGX_EXTRA={
 moneymkt:{exam:"HL: label the axes nominal interest rate (i) and quantity of money, draw Ms vertical and Md downward-sloping, then show the shift of Ms and both interest rates, i₀ and i₁.",
  lim:["Most central banks set a policy rate and supply the money demanded at it, so in practice Ms behaves as if horizontal at the target rate","Money demand can shift with confidence and financial innovation","Near a zero interest rate, more money may barely lower rates further (a liquidity trap)"],
  real:"Central banks lower interest rates by buying government bonds in open market operations; quantitative easing after 2008 and in 2020 expanded the money supply on a large scale with the aim of lowering longer-term interest rates."},
 crowdout:{exam:"HL: state the model you use. Label the axes real interest rate and quantity of loanable funds, show demand shifting right by government borrowing, mark r₀, r₁ and private investment at r₁, and name the gap as crowding out.",
  lim:["With spare capacity and high private saving, government borrowing may raise rates very little","In an open economy capital inflows can finance the deficit, moving the pressure onto the exchange rate","Productive public investment, such as infrastructure, may raise private investment rather than displace it"],
  real:"The debate over crowding out returns whenever large budget deficits meet rising bond yields; it was central to the arguments about fiscal stimulus after 2008, when long-term interest rates in several economies stayed low despite heavy government borrowing."},
 jcurve:{exam:"HL: put time on the horizontal axis and the current account balance on the vertical axis with a zero line, mark the depreciation, the initial worsening and the later improvement, and link the improvement to the Marshall-Lerner condition stated with absolute values.",
  lim:["The depth and length of the dip depend on contract lengths and how quickly prices pass through","If domestic inflation rises, the gain in competitiveness erodes and the improvement may not last","Evidence for a clear J shape is mixed: many episodes show slow or partial improvement"],
  real:"Sterling's exit from the Exchange Rate Mechanism in 1992 and its depreciation after the 2016 referendum are often used to discuss whether trade balances responded as the J-curve predicts."},
 pcfirm:{exam:"HL: draw the industry and the firm side by side on the same price axis, carry Pe across, label D = AR = MR = P, and show MC cutting ATC at its minimum where the firm produces.",
  lim:["No real market meets every assumption of perfect competition","Entry and exit take time, so long-run equilibrium is a tendency rather than a state","The model leaves out innovation, which needs some abnormal profit to fund it"],
  real:"Markets for some agricultural commodities come close to price-taking behaviour: an individual wheat farmer accepts the price set on world markets and decides only how much to grow."},
 pcprofit:{exam:"HL: draw the horizontal D = AR = MR = P, MC cutting ATC at its minimum, output where MC = MR, and shade the rectangle from ATC up to P at that output as abnormal profit.",
  lim:["The profit lasts only while entry is delayed","Costs are assumed known and identical across firms","The firm is assumed to maximise profit"],
  real:"A rise in a crop's world price can give farmers abnormal profit for a season; more land is then planted, which tends to bring the price back down."},
 pcloss:{exam:"HL: show P below ATC but above AVC at the output where MC = MR, shade the loss from P up to ATC, and explain why the firm stays open in the short run.",
  lim:["The shut-down rule needs fixed costs to be truly unavoidable in the short run","Firms may stay open for strategic reasons or to keep customers","Exit in the long run can be slow where assets are specialised"],
  real:"Dairy farmers have at times kept producing while milk prices were below their average total cost, covering variable costs while waiting for prices to recover or leaving the industry."},
 natmon:{exam:"HL: draw LRAC falling across the whole of market demand with LRMC below it, then mark the profit-maximising, average-cost-pricing and marginal-cost-pricing outcomes, and explain why marginal-cost pricing needs a subsidy.",
  lim:["Regulators rarely know a firm's true costs","Regulated firms may let costs rise (X-inefficiency)","Technology can make parts of a natural monopoly contestable"],
  real:"Water supply, electricity transmission grids and rail track are standard examples, which is why they are often publicly owned or run by regulated private firms subject to price caps."},
 cartel:{exam:"HL: label industry D = AR, MR and the summed MC, show output where MC = MR and the price read from AR, shade joint abnormal profit, and compare with the competitive output where P = MC.",
  lim:["Members' costs differ, so agreeing quotas is hard","Each member has an incentive to cheat on its quota","Collusion is illegal in most economies and new entrants can undercut it"],
  real:"OPEC+ production agreements are the best-known open attempt to restrict output; competition authorities have also fined firms for secret price-fixing, such as the European Commission's 2016 decision against a trucks cartel."},
 mcsr:{exam:"HL: draw a downward-sloping, relatively elastic AR with MR at twice the slope, output where MC = MR, price read from AR, and shade abnormal profit from ATC to P.",
  lim:["Differentiation is hard to measure","Entry is assumed free, though brand loyalty can act as a barrier","Non-price competition is not shown"],
  real:"Restaurants, hairdressers and clothing brands sell differentiated products; a new café that becomes popular may earn abnormal profit until others open nearby."},
 mclr:{exam:"HL: show AR tangent to ATC at the output where MC = MR, mark P = ATC (normal profit), and mark the gap between that output and minimum ATC as excess capacity.",
  lim:["Excess capacity may be the price of the variety consumers value","Long-run equilibrium assumes entry continues until profit is normal","Firms' costs are assumed identical"],
  real:"A high street with many similar cafés or hairdressers, each busy only at peak times, illustrates excess capacity: each could serve more customers at lower average cost."},
 tradeexp:{exam:"Label domestic D and S, the world price Pw above Pe, Qd and Qs at Pw, and the gap as exports; identify the changes in consumer and producer surplus and the net gain.",
  lim:["Assumes the economy cannot influence the world price","Ignores the costs of moving resources into the export industry","Says nothing about how the gains are distributed"],
  real:"When world prices of a country's food exports rise, domestic producers gain and domestic buyers pay more, which is why some governments have restricted exports of staple foods to hold down prices at home."},
 fixedfx:{exam:"Label the axes as an exchange rate and quantity of the currency, mark the fixed rate, show the fall in demand, mark the excess supply at the fixed rate and explain the central bank's purchases with reserves, or a rise in interest rates.",
  lim:["Reserves are finite, so a persistent excess supply cannot be held off indefinitely","Higher interest rates to defend the rate can slow the economy","Speculators may test a peg they believe cannot last"],
  real:"Hong Kong's currency board has kept the Hong Kong dollar within a narrow band against the US dollar since 1983, and the Danish krone is held close to the euro, both through reserves and interest rate policy."},
 structural:{exam:"Label the axes wage rate and quantity of labour, show DL shifting left in one industry or region, mark the unemployment at the original wage, and explain why it persists: occupational and geographical immobility of labour.",
  lim:["It shows one market, not the economy as a whole","Wages may fall, reducing unemployment but not ending the mismatch","The length of unemployment depends on retraining and mobility, which are not drawn"],
  real:"The decline of coal mining in the United Kingdom in the 1980s and of manufacturing employment in parts of the United States are standard examples of falling labour demand concentrated in particular industries and regions."},
 engel:{exam:"Label income and quantity demanded on the axes, draw and label one curve each for YED > 1, 0 < YED < 1 and YED < 0, and explain how the curvature reflects the value of YED.",
  lim:["Prices and tastes are held constant","A good's classification differs between income levels and countries","The curves are illustrative rather than estimated"],
  real:"Engel's law, that the share of income spent on food falls as income rises, is one of the best-established findings in economics and is used to track living standards in developing economies."},
 povcycle:{exam:"Draw at least four linked boxes with arrows showing causation (low income, low saving, low investment, low productivity), then show where an intervention such as aid, FDI or microcredit breaks the cycle.",
  lim:["Leaves out institutions, conflict and geography","Cannot say which link to target first","Implies a single cycle where economies differ widely"],
  real:"Microcredit programmes such as the Grameen Bank in Bangladesh and conditional cash transfers such as Mexico's Progresa were designed to break particular links in the poverty cycle."}};
(function(){if(typeof atlasPlus!=="function")return;const prev=atlasPlus;atlasPlus=function(k){let h=prev.apply(this,arguments);const x=DGX_EXTRA[k];if(!x||!h)return h;
 h=h.replace(/(<\/div>)(\s*<div class="atl2-c"><div class="eb">Common mistake<\/div>)/,`<p class="xs mt2 dgx-exam">${esc(x.exam)}</p>$1$2`);
 h=h.replace(/(<div class="eb">Limitations<\/div><p class="sm mt1">[\s\S]*?<\/p>)/,`$1<ul class="ls-list mt1 dgx-lim">${x.lim.map(l=>`<li class="xs">${esc(l)}</li>`).join("")}</ul>`);
 return h.replace('<p class="sm">No Real World case uses this plate yet.</p>',`<p class="sm dgx-real">${esc(x.real)}</p>`)}})();

/* ── Move the model: a control on the atlas page, recomputed by the engine ── */
const DGX_CTL={
 moneymkt:{lab:"Change in the money supply ($bn)",ask:"Choose how far the central bank changes the money supply; the interest rate is solved again from money demand.",
  names:["−60","−40","−20","+20","+50","+80"],vals:[-60,-40,-20,20,50,80].map(v=>({dms:v}))},
 crowdout:{lab:"Government borrowing ($bn)",ask:"Choose the size of the government's borrowing; the real interest rate and the private investment crowded out are solved again.",
  names:["40","60","80","100"],vals:[40,60,80,100].map(v=>({B:v}))},
 jcurve:{lab:"|PEDx| + |PEDm|, the sum of the absolute price elasticities",ask:"Choose how responsive export and import volumes become; the path of the current account is recomputed, and below one the Marshall-Lerner condition fails.",
  names:["0.8","1.2","1.5","1.8"],vals:[{ex:0.5,em:0.3},{ex:0.7,em:0.5},{ex:0.8,em:0.7},{ex:1.0,em:0.8}]},
 pcprofit:{lab:"Market price, P₁",ask:"Choose a market price above minimum ATC; output is solved from MC = MR and the abnormal profit recomputed.",
  names:["7.5","8.5","9.4","10.5","12"],vals:[7.5,8.5,9.4,10.5,12].map(v=>({P:v}))},
 pcloss:{lab:"Market price, P₁",ask:"Choose a market price between minimum AVC and minimum ATC; output is solved from MC = MR and the loss recomputed.",
  names:["3","3.5","4","4.5","5"],vals:[3,3.5,4,4.5,5].map(v=>({P:v}))},
 tradeexp:{lab:"World price, Pw",ask:"Choose a world price above the domestic price; quantities, exports and the gain from trade are solved again.",
  names:["12","14","16","18"],vals:[12,14,16,18].map(v=>({pw:v}))},
 fixedfx:{lab:"Fall in demand for the currency",ask:"Choose how far demand for the currency falls; the purchases needed to hold the fixed rate are solved again.",
  names:["0.1","0.15","0.2","0.25","0.3"],vals:[0.1,0.15,0.2,0.25,0.3].map(v=>({shift:v}))},
 structural:{lab:"Fall in the demand for labour (wage at each quantity)",ask:"Choose how far demand for labour in this industry falls; unemployment at the unchanged wage is solved again.",
  names:["2","3","4","5","6"],vals:[2,3,4,5,6].map(v=>({fall:v}))}};
function dgxDefIdx(k){const c=DGX_CTL[k],par=M2[k].par;const i=c.vals.findIndex(v=>Object.keys(v).every(x=>v[x]===par[x]));return i<0?0:i}
function dgxSelIdx(k){return DGX.sel[k]!==undefined?DGX.sel[k]:dgxDefIdx(k)}
function dgxRender(k,i){return dgxArrows(k,renderModel(k,{par:DGX_CTL[k].vals[i]}))}
function dgxFacts(r){return `<tbody>${(r.facts||[]).map(([a,b])=>`<tr><th scope="row" style="width:52%">${esc(a)}</th><td>${esc(String(b))}</td></tr>`).join("")}</tbody>`}
function dgxSay(k,i){const m=M2[k].build(Object.assign({},M2[k].par,DGX_CTL[k].vals[i]));return m.say||""}
function dgxMoveHtml(k){const c=DGX_CTL[k];if(!c||!M2[k])return "";const i=dgxSelIdx(k),r=dgxRender(k,i);
 return `<section class="sec dgx-move" aria-labelledby="dgx-h"><div class="wrap md"><div class="shead"><span class="n">··</span><h2 id="dgx-h">Move the model</h2><span class="aside">Recomputed from the equations</span></div>
  <p class="sm">${esc(c.ask)}</p>
  <p class="eb mt3" id="dgx-l">${esc(c.lab)}</p>
  <div class="row mt2" style="gap:6px;flex-wrap:wrap" role="group" aria-labelledby="dgx-l">${c.names.map((n,j)=>`<button type="button" class="tag${j===i?" f":""}" style="cursor:pointer" aria-pressed="${j===i}" onclick="dgxSet('${k}',${j})">${esc(n)}</button>`).join("")}</div>
  <div class="split mt3"><figure class="plate" id="dgx-fig">${frame(r.b,r.x,r.y,{alt:r.alt})}</figure>
   <div><p class="sm" id="dgx-say" aria-live="polite">${esc(dgxSay(k,i))}</p><table class="t mt2" id="dgx-facts">${dgxFacts(r)}</table></div></div></div></section>`}
function dgxSet(k,j){const c=DGX_CTL[k];if(!c||j<0||j>=c.vals.length)return;DGX.sel[k]=j;const r=dgxRender(k,j);
 const f=document.getElementById("dgx-fig"),s=document.getElementById("dgx-say"),t=document.getElementById("dgx-facts");
 if(f)f.innerHTML=frame(r.b,r.x,r.y,{alt:r.alt});if(s)s.textContent=dgxSay(k,j);if(t)t.innerHTML=dgxFacts(r);
 document.querySelectorAll('.dgx-move [aria-pressed]').forEach((b,x)=>{b.setAttribute("aria-pressed",String(x===j));b.classList.toggle("f",x===j)})}
(function(){if(typeof dgLibrary!=="function")return;const prev=dgLibrary;dgLibrary=function(){const h=prev.apply(this,arguments);
 if(!ARG||!DGX_CTL[ARG]||!DG[ARG])return h;const add=dgxMoveHtml(ARG),at=h.indexOf('<div class="wrap md sec tight dg-read">');
 return at<0?h+add:h.slice(0,at)+add+h.slice(at)}})();

/* ── self-tests: registration, the economics of every plate, the atlas page ── */
function DGXSUITE(){
 const out=[];const T=(n,f)=>{let ok=false,det="";try{const r=f();if(Array.isArray(r)){ok=r.length===0;det=r.slice(0,6).join(" | ")}else ok=r===true}catch(e){det="threw: "+e.message}out.push({n:"Diagram engine · "+n,ok:!!ok,detail:det})};
 const ALL=DGX_KEYS.concat(["povcycle"]),near=(a,b,t)=>Math.abs(a-b)<=(t||1e-9);
 const B=(k,patch)=>M2[k].build(Object.assign({},M2[k].par,patch||{})),cv=(m,k)=>m.curves.find(c=>c.k===k).c,pt=(m,k)=>m.points.find(p=>p.k===k);
 const variants=k=>[{}].concat(DGX_CTL[k]?DGX_CTL[k].vals:[]);
 T("the fifteen new plates are registered with a subtopic, a grouping, an atlas entry and a reading guide",()=>ALL.filter(k=>!(DG[k]&&DGKEYS.includes(k)&&DGSUB[k]===DGX_SUBS[k]&&SUBMAP[DGSUB[k]]
   &&DGGROUPS.some(([,ks])=>ks.includes(k))&&ATLAS.some(g=>g.items.some(i=>i[0]===k&&i[2]===DGSUB[k]))&&DG_READ[k]&&DGX_EXTRA[k])));
 T("the fourteen quantitative plates are solved models routed through the engine; the poverty cycle is a declared schematic",()=>DGX_KEYS.filter(k=>!(M2[k]&&MODELKEYS.includes(k)&&/renderModel/.test(DG[k].toString())))
   .concat(SCHEMATIC.povcycle&&!M2.povcycle&&!DG.povcycle().x&&!DG.povcycle().y?[]:["povcycle"]));
 T("the atlas no longer lists the diagrams these plates draw as gaps",()=>ATLASGAPS.filter(g=>/Engel curve|Perfectly competitive|Money market|Crowding out|J-curve|Poverty cycle/.test(g[1])).map(g=>g[0]));
 T("every new model is valid at every setting of its control: each point on its curves and inside the plot",()=>{const bad=[];DGX_KEYS.forEach(k=>variants(k).forEach(v=>{const r=renderModel(k,{par:v});
   if(!r.valid||/NaN|Infinity|undefined/.test(r.b))bad.push(k+" "+JSON.stringify(v)+" "+r.failed.map(c=>c.pt+"/"+c.curve).join(","))}));return bad});
 T("at every setting, labels stay apart and off the markers, and every curve and arrow stays in the plot",()=>{const bad=[];DGX_KEYS.forEach(k=>variants(k).forEach(v=>{const r=dgxArrows(k,renderModel(k,{par:v})),S=AUD_geo(frame(r.b,r.x,r.y,{})),b=AUD_boxes(S.texts);
   for(let i=0;i<b.length;i++)for(let j=i+1;j<b.length;j++){const a=b[i],c=b[j];if(Math.min(a.x+a.w,c.x+c.w)-Math.max(a.x,c.x)>1&&Math.min(a.y+a.h,c.y+c.h)-Math.max(a.y,c.y)>1)bad.push(k+" "+JSON.stringify(v)+": "+a.s+" / "+c.s)}
   b.forEach(t=>{if(S.circles.some(c=>Math.min(t.x+t.w,c.x+c.r)-Math.max(t.x,c.x-c.r)>2&&Math.min(t.y+t.h,c.y+c.r)-Math.max(t.y,c.y-c.r)>2))bad.push(k+" "+JSON.stringify(v)+": label on marker "+t.s)});
   if(S.curves.some(c=>c.pts.some(([x,y])=>x<G.L-1.5||x>G.W-G.R+1.5||y<G.T-12||y>G.H-G.B+1.5)))bad.push(k+" "+JSON.stringify(v)+": leaves the plot")}));return bad});
 T("money market: Ms is vertical, Md slopes down, both equilibria lie on Md, and more money lowers the interest rate",()=>{const bad=[];DGX_CTL.moneymkt.vals.concat([{}]).forEach(v=>{const m=B("moneymkt",v),p=Object.assign({},M2.moneymkt.par,v);
   const Md=cv(m,"Md"),E0=pt(m,"E0"),E1=pt(m,"E1");
   if(!(cv(m,"Ms0").kind==="vert"&&cv(m,"Ms1").kind==="vert"&&Md.b<0&&near(E0.q,p.ms)&&near(E1.q,p.ms+p.dms)&&near(Md.p(E0.q),E0.p)&&near(Md.p(E1.q),E1.p)&&Math.sign(E1.p-E0.p)===-Math.sign(p.dms)))bad.push(JSON.stringify(v))});return bad});
 T("crowding out: borrowing raises r, private investment is read from the original D, and the crowding out is B·b/(b + d)",()=>{const bad=[];DGX_CTL.crowdout.vals.forEach(v=>{const m=B("crowdout",v),p=Object.assign({},M2.crowdout.par,v);
   const D=cv(m,"D"),E0=pt(m,"E0"),E1=pt(m,"E1"),A=pt(m,"A");
   if(!(E1.p>E0.p&&near(D.p(A.q),E1.p)&&A.q<E0.q&&near(E1.q-A.q,p.B)&&near(E0.q-A.q,p.B*p.b/(p.b+p.d))&&E0.q-A.q<p.B))bad.push(JSON.stringify(v))});return bad});
 T("J-curve: the balance dips below its starting deficit, its trough is below zero, and it later ends above where it started",()=>{const p=M2.jcurve.par,J=dgxJ(p);let lowest=Infinity;for(let t=0;t<=p.T;t+=0.002)lowest=Math.min(lowest,J.CA(t));
   return J.mn<0&&J.mn<J.ca0&&J.tm>p.t0&&near(lowest,J.mn,1e-6)&&J.end>J.ca0&&J.tc!==null&&near(J.CA(J.tc),J.ca0,1e-9)&&J.tz!==null&&near(J.CA(J.tz),0,1e-9)&&J.tc<J.tz});
 T("J-curve: at every setting the balance ends above its start exactly when export and import volumes respond enough (Marshall-Lerner from a deficit)",()=>DGX_CTL.jcurve.vals.filter(v=>{const p=Object.assign({},M2.jcurve.par,v),J=dgxJ(p);
   return (J.lr>J.ca0)!==(p.X0*p.ex+p.M0*(1+p.d)*p.em>p.M0)||(J.end>J.ca0)!==(J.tc!==null)||J.mn>=J.ca0}).map(v=>JSON.stringify(v)));
 const C=dgxCost(DGX_FIRM.a,DGX_FIRM.b,DGX_FIRM.c,DGX_FIRM.F);
 T("firm costs: MC cuts AVC and ATC at their minimum points",()=>near(C.mc(C.qAvcMin),C.avc(C.qAvcMin))&&near(C.mc(C.qAtcMin),C.atc(C.qAtcMin))&&near(C.datc(C.qAtcMin),0)
   &&[1,0.1].every(h=>C.atc(C.qAtcMin+h)>C.atc(C.qAtcMin)&&C.atc(C.qAtcMin-h)>C.atc(C.qAtcMin)&&C.avc(C.qAvcMin+h)>C.avc(C.qAvcMin)&&C.avc(C.qAvcMin-h)>C.avc(C.qAvcMin)));
 T("perfect competition: the industry price is carried across, the firm's demand is horizontal (D = AR = MR), and it produces at minimum ATC",()=>{const m=B("pcfirm"),p=M2.pcfirm.par,AR=cv(m,"AR"),E=pt(m,"E"),F=pt(m,"F");
   return AR.b===0&&near(AR.a,E.p)&&near(F.p,E.p)&&near(F.q-p.off,C.qAtcMin,1e-6)&&near(C.mc(F.q-p.off),E.p,1e-9)&&near(C.atc(F.q-p.off),E.p,1e-9)});
 T("perfect competition: at every price the firm sets MC = P on the rising part of MC; above minimum ATC it earns abnormal profit, below it a loss while covering AVC",()=>{const bad=[];
   DGX_CTL.pcprofit.vals.forEach(v=>{const q=C.qOfP(v.P);if(!(near(C.mc(q),v.P)&&C.mc(q+0.01)>C.mc(q)&&v.P>C.atc(q)))bad.push("profit "+v.P)});
   DGX_CTL.pcloss.vals.forEach(v=>{const q=C.qOfP(v.P);if(!(near(C.mc(q),v.P)&&C.mc(q+0.01)>C.mc(q)&&v.P<C.atc(q)&&v.P>=C.avc(q)&&(C.atc(q)-v.P)*q<C.F))bad.push("loss "+v.P)});return bad});
 T("every new MR has its AR's intercept and twice its slope (natural monopoly, cartel, monopolistic competition)",()=>[["natmon","D"],["cartel","D"],["mcsr","AR"],["mclr","AR"]].filter(([k,a])=>{const m=B(k),D=cv(m,a),MR=cv(m,"MR");
   return !(near(MR.a,D.a)&&near(MR.b,2*D.b,1e-12)&&D.b<0)}).map(x=>x[0]));
 T("natural monopoly: LRAC falls over the whole range of market demand, MC lies below it, P = AC gives normal profit and P = MC a loss equal to the fixed cost",()=>{const p=M2.natmon.par,m=B("natmon"),lrac=q=>p.c+p.K/q;
   let falling=true;for(let q=1;q<=p.a/p.b;q+=0.5)if(!(lrac(q+0.5)<lrac(q)&&p.c<lrac(q)))falling=false;
   const Ea=pt(m,"Ea"),Ec=pt(m,"Ec"),Em=pt(m,"Em");
   return falling&&near(cv(m,"D").p(Ea.q),lrac(Ea.q))&&near((lrac(Ec.q)-Ec.p)*Ec.q,p.K)&&near(Ec.p,p.c)&&Em.q<Ea.q&&Ea.q<Ec.q});
 T("cartel: joint output where MC = MR, price from AR above MC, MC through minimum ATC, and output below the competitive level",()=>{const p=M2.cartel.par,m=B("cartel"),MC=cv(m,"MC"),MR=cv(m,"MR"),D=cv(m,"D"),Ek=pt(m,"Ek"),Emr=pt(m,"Emr"),Ec=pt(m,"Ec");
   const atc=q=>p.F/q+p.m0+p.m*q,qmin=Math.sqrt(p.F/p.m);
   return near(MC.p(Emr.q),MR.p(Emr.q))&&near(Ek.q,Emr.q)&&near(D.p(Ek.q),Ek.p)&&Ek.p>MC.p(Ek.q)&&near(MC.p(qmin),atc(qmin))&&Ek.q<Ec.q&&near(D.p(Ec.q),MC.p(Ec.q))});
 T("monopolistic competition, short run: output where MR = MC and price from AR above ATC (abnormal profit)",()=>{const m=B("mcsr"),E=pt(m,"E"),MR=cv(m,"MR");
   return near(MR.p(E.q),C.mc(E.q))&&near(cv(m,"AR").p(E.q),E.p)&&E.p>C.atc(E.q)&&C.mc(E.q+0.01)>C.mc(E.q)});
 T("monopolistic competition, long run: AR is tangent to ATC where MC = MR, never crosses it, and the tangency lies left of minimum ATC (excess capacity)",()=>{const m=B("mclr"),AR=cv(m,"AR"),MR=cv(m,"MR"),T0=pt(m,"T"),q=T0.q;
   let touches=true;for(let x=6;x<=100;x+=0.25)if(C.atc(x)<AR.p(x)-1e-9)touches=false;
   return touches&&near(AR.p(q),C.atc(q))&&near(AR.b,C.datc(q))&&near(MR.p(q),C.mc(q),1e-9)&&q<C.qAtcMin&&AR.p(q)>C.mc(q)});
 T("free trade with exports: the world price is above the domestic price, exports are Qs − Qd, and the change in surplus is the shaded triangle",()=>DGX_CTL.tradeexp.vals.filter(v=>{const p=Object.assign({},M2.tradeexp.par,v),m=B("tradeexp",v),D=cv(m,"D"),S=cv(m,"S"),E0=pt(m,"E0"),Qd=D.q(p.pw),Qs=S.q(p.pw);
   const dcs=0.5*(p.a-p.pw)*Qd-0.5*(p.a-E0.p)*E0.q,dps=0.5*(p.pw-p.c)*Qs-0.5*(E0.p-p.c)*E0.q;
   return !(p.pw>E0.p&&Qs>Qd&&near(pt(m,"A").q,Qd)&&near(pt(m,"B").q,Qs)&&near(dcs+dps,0.5*(Qs-Qd)*(p.pw-E0.p),1e-6)&&dcs<0)}).map(v=>JSON.stringify(v)));
 T("fixed exchange rate: the central bank's purchases equal the excess supply at the fixed rate and restore demand to D₀",()=>DGX_CTL.fixedfx.vals.filter(v=>{const m=B("fixedfx",v),D0=cv(m,"D0"),D1=cv(m,"D1"),S=cv(m,"S"),F=cv(m,"F"),e=F.a,E1=pt(m,"E1");
   const buy=S.q(e)-D1.q(e);return !(F.b===0&&buy>0&&near(D0.q(e)-D1.q(e),buy)&&near(D0.p(S.q(e)),e)&&E1.p<e&&near(D1.b,D0.b))}).map(v=>JSON.stringify(v)));
 T("structural unemployment: with the wage unchanged, the gap between labour supplied and the new labour demanded is unemployment",()=>DGX_CTL.structural.vals.filter(v=>{const m=B("structural",v),L0=cv(m,"L0"),L1=cv(m,"L1"),Ls=cv(m,"Ls"),E0=pt(m,"E0"),A=pt(m,"A"),E1=pt(m,"E1");
   return !(near(L1.b,L0.b)&&near(L1.p(A.q),E0.p)&&near(Ls.p(E0.q),E0.p)&&E0.q-A.q>0&&E1.p<E0.p&&near(L1.p(E1.q),Ls.p(E1.q)))}).map(v=>JSON.stringify(v)));
 T("Engel curves: the necessity's YED is between 0 and 1, the luxury's above 1, and the inferior good's is positive at low income and negative at high income",()=>{const p=M2.engel.par,inf=y=>p.al*y-p.be*y*y;
   const n=dgxYed(y=>p.k1*Math.pow(y,p.e1),p.y1),l=dgxYed(y=>p.k2*Math.pow(y,p.e2),p.y1);
   return n>0&&n<1&&near(n,p.e1,1e-6)&&l>1&&near(l,p.e2,1e-6)&&dgxYed(inf,20)>0&&dgxYed(inf,p.y2)<0&&near(dgxYed(inf,p.al/(2*p.be)),0,1e-6)});
 T("the poverty cycle is a closed loop of four linked boxes, with no axes",()=>{const d=DG.povcycle(),S=AUD_geo(frame(d.b,d.x,d.y,{}));
   return !d.x&&!d.y&&(d.b.match(/<rect /g)||[]).length===4&&S.curves.filter(c=>c.arrow).length===4&&/Low incomes/.test(d.b)&&/Low productivity/.test(d.b)});
 T("each new plate's atlas page carries its exam guidance, limitations, real-world use and reading guide, and a control where it has one",()=>{const k0=ARG,bad=[];
   try{ALL.forEach(k=>{ARG=k;const h=dgLibrary();if(!(h.includes(esc(DGX_EXTRA[k].exam))&&h.includes("dgx-lim")&&h.includes(esc(DGX_EXTRA[k].real))&&/Reading guide/.test(h)&&(!DGX_CTL[k]||h.includes('id="dgx-h"'))))bad.push(k)})}finally{ARG=k0}return bad});
 T("search and the topic pages find every new plate",()=>{const I=buildIndex();return ALL.filter(k=>!(I.some(x=>x.k==="Diagram"&&x.go.includes("'"+k+"'"))&&lsDiagrams(DGSUB[k]).includes(k)))});
 T("the control's every setting draws a plate with alternative text and a sentence that names its result",()=>{const bad=[];Object.keys(DGX_CTL).forEach(k=>DGX_CTL[k].vals.forEach((v,i)=>{const r=dgxRender(k,i);
   if(!(r.alt.length>80&&dgxSay(k,i).length>30&&DGX_CTL[k].names.length===DGX_CTL[k].vals.length))bad.push(k+" "+i)}));return bad});
 return out;
}
DGXSUITE.suiteName="Diagram library, completed";
EXTRA_SUITES.push(DGXSUITE);
