/* ═══════════════════════════════════════════════════════════════════════════
   UPSC CSE ECONOMICS · the section
   One section, eight tabs, its own palette (midnight navy, warm ivory, muted
   gold, forest green and a restrained burgundy) inside the same brand. Each
   address is a real route: #/upsc, #/upsc/syllabus, #/upsc/economics-handbooks,
   #/upsc/economics-handbooks/volume-iii, #/upsc/economics-resources/inflation…
   Purchases and enrolment are enquiries: a prefilled WhatsApp message, email
   or call, using the contact details the site already publishes. Nothing is
   charged, booked or confirmed here.
   ═══════════════════════════════════════════════════════════════════════════ */
const UP_TABS=["UPSC Overview","Syllabus","Economics Resources","Economics Handbooks","Current Affairs","UPSC Economics Course","About the Educator","Contact / Enrolment"];
SECTIONS.push({v:"upsc",n:"UPSC CSE Economics",tabs:UP_TABS});
const UP_T={overview:0,syllabus:1,resources:2,handbooks:3,current:4,course:5,educator:6,contact:7};
const UP_RN=["I","II","III","IV","V","VI","VII","VIII","IX","X","XI"];
const UP_PRICE="₹99 per soft copy";
const UP_PHONE="+91 7092844945";
const UPS={mode:"pre",cat:"",q:"",th:"",ct:"handbook",vol:"volume-i",flow:0,road:0};
function upHref(tab,arg){return routeFormat("upsc",UP_T[tab]||0,arg)}
function upGo(tab,arg){nav("upsc",UP_T[tab]||0,arg)}
function upVol(n){return UPSC_HB.volumes.find(v=>v.n===n||v.id===n)}
function upTopic(id){return UP_TOPICS.find(t=>t.id===id)}
function upCA(id){return UP_CA.find(c=>c.id===id)}

/* ── enquiries: existing contact details only ───────────────────────────── */
function upWaBase(){try{const w=CONTACT.find(x=>x.k==="whatsapp");if(w&&w.href)return w.href}catch(e){}return "https://wa.me/917092844945"}
function upWa(msg){return upWaBase()+"?text="+encodeURIComponent(msg)}
function upMail(subject,body){return "mailto:"+TUT.email+"?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body)}
function upTel(){return "tel:"+UP_PHONE.replace(/\s+/g,"")}
function upHbMsg(v){return `Hello Arjun, I would like to purchase the digital copy (PDF) of Volume ${v.n}: ${v.title}, from your UPSC CSE Economics Handbook series, priced at ₹99. Please let me know how to pay and receive the PDF.`}
function upHbSubject(v){return `Handbook purchase: Volume ${v.n}, ${v.title} (₹99)`}
const UP_GEN_MSG="Hello Arjun, I have a question about UPSC CSE Economics: ";
function upExt(href,label,cls,aria){return `<a class="${cls}" href="${esA(href)}" target="_blank" rel="noopener noreferrer"${aria?` aria-label="${esA(aria)}"`:""}>${label}</a>`}
function upBuy(v,cls){return upReq(v,cls)}   /* an enquiry: the purchase itself is completed by direct contact */

/* ── small shared pieces ────────────────────────────────────────────────── */
function upMast(eb,h,lede,extra,cls){return `<section class="up-mast ${cls||""}"><div class="wrap full up-mast-in">
 <div class="up-eb"><span>UPSC CSE Economics</span>${eb?`<span class="up-eb-s">${esc(eb)}</span>`:""}</div>
 <h1 class="up-h1">${h}</h1>${lede?`<p class="up-lede">${lede}</p>`:""}${extra||""}</div></section>`}
function upHead(k,t,d,id){return `<header class="up-head"><div class="up-k">${esc(k)}</div><h2 class="up-h2"${id?` id="${id}"`:""}>${t}</h2>${d?`<p class="up-hd">${d}</p>`:""}</header>`}
function upVolLinks(vols){return vols.map(([n,p])=>{const v=upVol(n);return v?`<a class="up-vl" href="${upHref("handbooks",v.id)}"><b>Vol. ${n}</b> <span>Part${/,|to/.test(p)?"s":""} ${esc(p)}</span></a>`:""}).join("")}
function upDots(vols){const on=new Set(vols.map(x=>x[0]));const names=[...on].map(n=>"Volume "+n).join(", ");
 return `<span class="up-dots" role="img" aria-label="Treated in ${esA(names)}">${UP_RN.map(n=>`<i class="${on.has(n)?"on":""}" title="Volume ${n}"></i>`).join("")}</span>`}
function upDate(c){try{const d=new Date(c.d+"T12:00:00Z");return d.toLocaleDateString("en-GB",c.month?{month:"long",year:"numeric"}:{day:"numeric",month:"long",year:"numeric"})}catch(e){return c.d}}
function upCover(v,cls,eager){const i=v.img&&(eager||/\blg\b/.test(cls||"")?v.img.cover:(v.img.coverSm||v.img.cover));if(!i)return `<span class="up-cv-ph">Vol. ${v.n}</span>`;
 return `<img class="${cls||"up-cv"}" src="${esA(i.src)}" alt="Cover of Volume ${esA(v.n)}: ${esA(v.title)}" width="${i.w}" height="${i.h}"${eager?"":' loading="lazy"'} decoding="async">`}

/* ── figures: original and computed, each says what it shows ───────────── */
const UF={
 svg(vb,title,body,cls){return `<svg class="uf ${cls||""}" viewBox="${vb}" role="img" aria-label="${esA(title)}"><title>${esc(title)}</title>${body}</svg>`},
 box(x,y,w,h,t,s,c){return `<rect class="uf-box ${c||""}" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/><text class="uf-tb" x="${x+w/2}" y="${y+(s?h/2-4:h/2+5)}" text-anchor="middle">${t}</text>${s?`<text class="uf-ts" x="${x+w/2}" y="${y+h/2+13}" text-anchor="middle">${s}</text>`:""}`},
 arr(x1,y1,x2,y2,c){const a=Math.atan2(y2-y1,x2-x1),L=8;const p=(d)=>`${(x2-L*Math.cos(a+d)).toFixed(1)} ${(y2-L*Math.sin(a+d)).toFixed(1)}`;
  return `<path class="uf-ar ${c||""}" d="M${x1} ${y1}L${x2} ${y2}"/><path class="uf-ah ${c||""}" d="M${p(.45)}L${x2} ${y2}L${p(-.45)}"/>`},
 inflation(){const B=(x,y,t,s,c)=>UF.box(x,y,210,64,t,s,c);
  return UF.svg("0 0 520 330","Inflation, purchasing power, interest rates and monetary policy form a loop",
   B(10,14,"Inflation rises","CPI 5.54%, September 2026","b")+B(300,14,"Purchasing power falls","₹100 buys what ₹94.75 did")+
   B(300,250,"Real interest rates fall","if the repo rate stays put")+B(10,250,"The MPC raises the repo rate","to 5.50% on 7 October 2026","n")+
   UF.arr(222,46,296,46)+UF.arr(405,80,405,246)+UF.arr(298,282,224,282)+UF.arr(115,246,115,82,"g")+
   `<text class="uf-tc" x="260" y="150" text-anchor="middle">Borrowing costs rise,</text><text class="uf-tc" x="260" y="170" text-anchor="middle">demand cools,</text><text class="uf-tc" x="260" y="190" text-anchor="middle">inflation eases with a lag</text>`)},
 deficit(){const W=430,M=1695768,X=120,sc=v=>v/M*W,bar=(y,parts,lab)=>{let x=X;return `<text class="uf-tb" x="${X-10}" y="${y+19}" text-anchor="end">${lab}</text>`+parts.map(([v,c,t])=>{const w=sc(v),r=`<rect class="uf-fill ${c}" x="${x.toFixed(1)}" y="${y}" width="${w.toFixed(1)}" height="28"/>`+(w>70?`<text class="uf-ti" x="${(x+w/2).toFixed(1)}" y="${y+19}" text-anchor="middle">${t}</text>`:`<text class="uf-ts" x="${(x+w+6).toFixed(1)}" y="${y+19}">${t}</text>`);x+=w;return r}).join("")};
  return UF.svg("0 0 580 250","Union Budget 2026-27 deficits, in rupees crore",
   bar(20,[[1403972,"n","Interest ₹14,03,972 cr"],[291796,"a","Primary ₹2,91,796 cr"]],"Fiscal deficit")+
   `<text class="uf-ts" x="${X}" y="66">= ₹16,95,768 crore (4.3% of GDP): interest on past debt plus the primary deficit</text>`+
   bar(100,[[492702,"g","Capital grants ₹4,92,702 cr"],[99642,"b","Effective ₹99,642 cr"]],"Revenue deficit")+
   `<text class="uf-ts" x="${X}" y="146">= ₹5,92,344 crore (1.5% of GDP): grants for capital assets plus the effective revenue deficit</text>`+
   `<text class="uf-ts q" x="${X}" y="196">Source: Union Budget 2026-27, Budget Estimates, as set out in Volume V.</text>`)},
 gst(){const S=[["Manufacturer",100,18,0],["Wholesaler",150,27,18],["Retailer",200,36,27]];let x=8,o="";
  S.forEach(([n,v,t,c],i)=>{o+=`<rect class="uf-box" x="${x}" y="20" width="150" height="150" rx="3"/><text class="uf-tb" x="${x+75}" y="44" text-anchor="middle">${n}</text>
   <text class="uf-ts" x="${x+12}" y="72">Sells for</text><text class="uf-tm" x="${x+138}" y="72" text-anchor="end">₹${v}</text>
   <text class="uf-ts" x="${x+12}" y="96">GST at 18%</text><text class="uf-tm" x="${x+138}" y="96" text-anchor="end">₹${t}</text>
   <text class="uf-ts" x="${x+12}" y="120">Less input credit</text><text class="uf-tm" x="${x+138}" y="120" text-anchor="end">−₹${c}</text>
   <path class="uf-ln" d="M${x+12} 132H${x+138}"/><text class="uf-tb a" x="${x+12}" y="155">Pays</text><text class="uf-tb a" x="${x+138}" y="155" text-anchor="end">₹${t-c}</text>`;
   if(i<2)o+=UF.arr(x+152,95,x+182,95);x+=190});
  return UF.svg("0 0 560 230","The input tax credit chain at an 18% rate",o+`<text class="uf-tc" x="280" y="206" text-anchor="middle">Tax paid along the chain: ₹18 + ₹9 + ₹9 = ₹36, which is 18% of the final price of ₹200</text>`)},
 npa(){const seg=[["Standard","0 days","s"],["SMA-0","1–30","s"],["SMA-1","31–60","s"],["SMA-2","61–90","w"]],seg2=[["Substandard","up to 12 months","w"],["Doubtful","D1 ≤1 yr · D2 1–3 · D3 >3","b"],["Loss","uncollectible","x"]];
  let o=`<text class="uf-k" x="10" y="20">Days overdue: still a standard asset</text>`;seg.forEach(([t,s,c],i)=>{o+=UF.box(10+i*135,30,128,58,t,s,c)});
  o+=UF.arr(280,94,280,132,"b")+`<text class="uf-ts" x="292" y="118">overdue for more than 90 days: a non-performing asset</text><text class="uf-k" x="10" y="150">Time as an NPA</text>`;
  seg2.forEach(([t,s,c],i)=>{o+=UF.box(10+i*180,160,172,58,t,s,c);if(i<2)o+=UF.arr(184+i*180,189,188+i*180,189)});
  return UF.svg("0 0 560 236","Asset classification from standard to loss",o)},
 bonds(){const P=y=>{let p=0;for(let t=1;t<=10;t++)p+=7/Math.pow(1+y,t);return p+100/Math.pow(1+y,10)};
  const X=y=>60+(y-.04)/.06*440,Y=p=>210-(p-75)/55*180,pts=[];for(let y=.04;y<=.1001;y+=.0025)pts.push(`${X(y).toFixed(1)},${Y(P(y)).toFixed(1)}`);
  const tk=[.04,.05,.06,.07,.08,.09,.10].map(y=>`<path class="uf-ln" d="M${X(y).toFixed(1)} 210v5"/><text class="uf-ts" x="${X(y).toFixed(1)}" y="230" text-anchor="middle">${Math.round(y*100)}%</text>`).join("")+
   [80,90,100,110,120].map(p=>`<path class="uf-ln" d="M55 ${Y(p).toFixed(1)}h5"/><text class="uf-ts" x="50" y="${(Y(p)+4).toFixed(1)}" text-anchor="end">${p}</text>`).join("");
  const p4=P(.04),p10=P(.10);
  return UF.svg("0 0 540 256","Price of a 10-year, 7% coupon bond at yields from 4% to 10%",
   `<path class="uf-ax" d="M60 24V210H500"/>${tk}<polyline class="uf-cv" points="${pts.join(" ")}"/>
   <path class="uf-gd" d="M${X(.07)} 210V${Y(100)}H60"/><circle class="uf-dot a" cx="${X(.07)}" cy="${Y(100)}" r="4"/>
   <text class="uf-ts" x="${X(.07)+8}" y="${Y(100)-8}">Yield = coupon (7%): price = ₹100</text>
   <circle class="uf-dot" cx="${X(.04)}" cy="${Y(p4).toFixed(1)}" r="3.5"/><text class="uf-ts" x="${X(.04)+8}" y="${(Y(p4)+4).toFixed(1)}">₹${p4.toFixed(2)} at 4%</text>
   <circle class="uf-dot" cx="${X(.10)}" cy="${Y(p10).toFixed(1)}" r="3.5"/><text class="uf-ts" x="${X(.10)-8}" y="${(Y(p10)-10).toFixed(1)}" text-anchor="end">₹${p10.toFixed(2)} at 10%</text>
   <text class="uf-k" x="18" y="18">Price (₹)</text><text class="uf-k" x="500" y="250" text-anchor="end">Market yield</text>`)},
 bop(){const col=(x,t,items,c)=>UF.box(x,52,166,44,t,"",c)+items.map(([a,b],i)=>`<rect class="uf-box l" x="${x}" y="${108+i*34}" width="166" height="28" rx="3"/><text class="uf-ts" x="${x+10}" y="${126+i*34}">${a}</text>${b?`<text class="uf-tm" x="${x+156}" y="${126+i*34}" text-anchor="end">${b}</text>`:""}`).join("");
  return UF.svg("0 0 560 290","The structure of the balance of payments under BPM6",
   UF.box(180,4,200,34,"Balance of payments","","n")+`<path class="uf-ln" d="M280 38V46M93 46H467M93 46V52M280 46V52M467 46V52"/>`+
   col(10,"Current account",[["Goods","−337.3"],["Services","+216.6"],["Primary income",""],["Secondary income",""]],"a")+
   col(197,"Capital account",[["Capital transfers",""],["Non-produced assets",""]])+
   col(384,"Financial account",[["Direct investment",""],["Portfolio investment",""],["Other investment",""],["Reserve assets",""]],"g")+
   `<text class="uf-ts" x="197" y="200">India, 2025-26 (US$ bn, prelim.):</text><text class="uf-ts" x="197" y="218">current account deficit</text><text class="uf-tb a" x="197" y="240">US$ 25.2 bn, 0.6% of GDP</text>
   <text class="uf-ts q" x="10" y="282">Plus net errors and omissions. Figures from Volume VIII, Table B.2.</text>`)},
 msp(){return UF.svg("0 0 560 300","How the minimum support price is set and where it reaches",
   UF.box(10,10,160,56,"CACP recommends","from cost data")+UF.arr(172,38,198,38)+UF.box(200,10,170,56,"Government announces","MSP for 22 crops","n")+UF.arr(372,38,398,38)+UF.box(400,10,150,56,"At least 1.5 × A2+FL","since 2018-19","a")+
   UF.arr(285,68,285,98)+`<rect class="uf-box w" x="150" y="100" width="270" height="52" rx="26"/><text class="uf-tb" x="285" y="122" text-anchor="middle">At harvest, is the market price</text><text class="uf-tb" x="285" y="140" text-anchor="middle">below MSP?</text>`+
   UF.arr(200,154,120,190,"g")+UF.arr(370,154,450,190,"b")+`<text class="uf-ts" x="150" y="178">yes</text><text class="uf-ts" x="402" y="178">no</text>`+
   UF.box(10,192,250,92,"MSP bites only where agencies buy","","g")+`<text class="uf-ts" x="24" y="250">Wheat and rice: FCI and State agencies</text><text class="uf-ts" x="24" y="268">Pulses and oilseeds: PM-AASHA</text>`+
   UF.box(300,192,250,92,"Farmer sells in the market","")+`<text class="uf-ts" x="314" y="250">MSP acts only as a reference price</text>`)},
 labour(){const W=460,X=80,s=v=>v/1000*W;
  const row=(y,parts,lab)=>{let x=X;return `<text class="uf-tb" x="${X-10}" y="${y+21}" text-anchor="end">${lab}</text>`+parts.map(([v,c,t])=>{const w=s(v),r=`<rect class="uf-fill ${c}" x="${x}" y="${y}" width="${w}" height="30"/>`+(w>60?`<text class="uf-ti" x="${x+w/2}" y="${y+20}" text-anchor="middle">${t}</text>`:`<text class="uf-ts" x="${x+w+5}" y="${y+20}">${t}</text>`);x+=w;return r}).join("")};
  return UF.svg("0 0 560 250","LFPR, WPR and the unemployment rate from one worked example",
   row(14,[[1000,"l","Population (working age) 1,000"]],"")+row(64,[[600,"n","Labour force 600"],[400,"l","Not in labour force 400"]],"")+row(114,[[570,"g","Employed 570"],[30,"b","30"]],"")+
   `<text class="uf-ts" x="${X+s(570)+40}" y="134">unemployed</text>
   <text class="uf-tb" x="${X}" y="180">LFPR = 600 ÷ 1,000 = 60%</text><text class="uf-tb" x="${X}" y="202">WPR = 570 ÷ 1,000 = 57%</text><text class="uf-tb a" x="${X}" y="224">UR = 30 ÷ 600 = 5%</text>
   <text class="uf-ts" x="${X+250}" y="202">Check: WPR = LFPR × (1 − UR)</text><text class="uf-ts" x="${X+250}" y="220">= 60% × 0.95 = 57%</text>`)},
 imfwb(){const R=[["Core aim","BoP and monetary stability","Development, poverty reduction"],["Lends for","Balance-of-payments needs","Projects, policies, programmes"],["Horizon","Months to a few years","10 to 35 years and more"],["Resources","Quotas and borrowed resources","Bonds (IBRD), donors (IDA)"],["Surveillance","Article IV, every member","No equivalent mandate"]];
  return UF.svg("0 0 560 250","The IMF and the World Bank compared",UF.box(150,6,195,34,"IMF","","n")+UF.box(355,6,195,34,"World Bank (IBRD + IDA)","","g")+
   R.map(([k,a,b],i)=>`<text class="uf-k" x="10" y="${68+i*40}">${k}</text><rect class="uf-box l" x="150" y="${48+i*40}" width="195" height="32" rx="3"/><text class="uf-ts" x="160" y="${69+i*40}">${a}</text><rect class="uf-box l" x="355" y="${48+i*40}" width="195" height="32" rx="3"/><text class="uf-ts" x="365" y="${69+i*40}">${b}</text>`).join(""))},
 ppc(){const C=(r,a)=>[60+r*380*Math.cos(a),220-r*190*Math.sin(a)],path=r=>{const p=[];for(let i=0;i<=40;i++){const a=i/40*Math.PI/2;const [x,y]=C(r,a);p.push(`${x.toFixed(1)},${y.toFixed(1)}`)}return p.join(" ")};
  const A=C(1,Math.PI/4),B=C(.62,Math.PI/4),Cc=C(1.13,Math.PI/3);
  return UF.svg("0 0 520 256","A production possibility curve with efficient, inefficient and unattainable points",
   `<path class="uf-ax" d="M60 14V220H500"/><polyline class="uf-cv" points="${path(1)}"/><polyline class="uf-cv d" points="${path(1.13)}"/>
   <circle class="uf-dot a" cx="${A[0].toFixed(1)}" cy="${A[1].toFixed(1)}" r="5"/><text class="uf-tb" x="${(A[0]+10).toFixed(1)}" y="${(A[1]-6).toFixed(1)}">A: efficient</text>
   <circle class="uf-dot b" cx="${B[0].toFixed(1)}" cy="${B[1].toFixed(1)}" r="5"/><text class="uf-tb" x="${(B[0]+10).toFixed(1)}" y="${(B[1]+4).toFixed(1)}">B: inefficient</text>
   <circle class="uf-dot n" cx="${Cc[0].toFixed(1)}" cy="${Cc[1].toFixed(1)}" r="5"/><text class="uf-tb" x="${(Cc[0]+10).toFixed(1)}" y="${(Cc[1]-4).toFixed(1)}">C: unattainable today</text>
   <text class="uf-ts" x="${(C(1.13,.18)[0]-6).toFixed(1)}" y="${(C(1.13,.18)[1]-10).toFixed(1)}" text-anchor="end">after growth</text>
   <text class="uf-k" x="18" y="12">Capital goods</text><text class="uf-k" x="500" y="244" text-anchor="end">Consumer goods</text>`)},
 cbam(){const S=[["Produce","Steel made in India; emissions per tonne"],["Import","An authorised EU declarant imports it"],["Pay","Buys CBAM certificates priced on the EU ETS"],["Deduct","Carbon price already paid at origin"],["Surrender","Certificates in the annual declaration"]];
  return UF.svg("0 0 560 200","The five steps of the EU Carbon Border Adjustment Mechanism",S.map(([t,s],i)=>{const x=6+i*112;return `<rect class="uf-box ${i===2?"a":""}" x="${x}" y="20" width="100" height="150" rx="3"/><text class="uf-k" x="${x+10}" y="44">${i+1}</text><text class="uf-tb" x="${x+10}" y="68">${t}</text>`+
   UF.wrap(s,18).map((l,j)=>`<text class="uf-ts" x="${x+10}" y="${92+j*16}">${l}</text>`).join("")+(i<4?UF.arr(x+101,95,x+111,95):"")}).join(""))},
 laf(){const Y=r=>200-(r-5)*240;const w=[];for(let i=0;i<=40;i++){const x=40+i*11;w.push(`${x},${(Y(5.5+.11*Math.sin(i*.9)+.05*Math.sin(i*2.3))).toFixed(1)}`)}
  return UF.svg("0 0 520 220","The LAF corridor after 7 October 2026",`<rect class="uf-band" x="40" y="${Y(5.75)}" width="440" height="${Y(5.25)-Y(5.75)}"/>
   <path class="uf-cv b" d="M40 ${Y(5.75)}H480"/><path class="uf-cv n" d="M40 ${Y(5.5)}H480" stroke-dasharray="6 5"/><path class="uf-cv g" d="M40 ${Y(5.25)}H480"/>
   <polyline class="uf-wv" points="${w.join(" ")}"/>
   <text class="uf-tb" x="484" y="${Y(5.75)+4}">MSF 5.75%</text><text class="uf-tb" x="484" y="${Y(5.5)+4}">Repo 5.50%</text><text class="uf-tb" x="484" y="${Y(5.25)+4}">SDF 5.25%</text>
   <text class="uf-ts" x="40" y="${Y(5.75)-10}">Ceiling: banks borrow overnight against collateral</text><text class="uf-ts" x="40" y="${Y(5.25)+22}">Floor: banks park surplus funds, no collateral</text>
   <text class="uf-ts q" x="40" y="${Y(5.25)+44}">The overnight call rate (WACR, the operating target) moves inside the corridor</text>`,"wide")},
 wrap(s,n){const out=[];let cur="";s.split(" ").forEach(w=>{if((cur+" "+w).trim().length>n){out.push(cur.trim());cur=w}else cur+=" "+w});if(cur.trim())out.push(cur.trim());return out}};
function upFig(k){const f=UF[k];return typeof f==="function"?f():""}

/* the collection map: how the eleven volumes refer to one another (from each volume's own series-boundary panel) */
const UP_EDGES=[["I","III"],["I","IV"],["II","III"],["II","VI"],["II","VII"],["III","IV"],["IV","V"],["VI","VII"],["VII","VIII"],["VIII","IX"],
 ["III","X"],["IV","X"],["V","X"],["VI","X"],["VII","X"],["VIII","X"],["IX","X"],["IV","XI"],["V","XI"],["VI","XI"],["VII","XI"],["VIII","XI"]];
const UP_POS={I:[70,190],II:[205,120],III:[205,265],IV:[350,62],V:[350,148],VI:[350,234],VII:[350,320],VIII:[500,140],IX:[500,270],X:[640,120],XI:[640,265]};
const UP_COLS=[["Foundations",70],["Money and prices",205],["Finance and the Budget",350],["External",500],["Sectors",640]];
/* short labels for the map only; each node's accessible name is the volume's full title */
const UP_SHORT={I:["Introduction","to Economics"],II:["Money and","Monetary Policy"],III:["Inflation and","Price Stability"],IV:["Taxation and","Public Revenue"],V:["Fiscal Policy","and the Budget"],VI:["Banking and","Institutions"],VII:["Financial","Markets"],VIII:["Balance of","Payments, Trade"],IX:["Global","Institutions"],X:["Agriculture","and Allied"],XI:["Industry","and Labour"]};
function upMap(){const vol=n=>upVol(n);
 const e=UP_EDGES.map(([a,b])=>{const [x1,y1]=UP_POS[a],[x2,y2]=UP_POS[b],mx=(x1+x2)/2;return `<path class="um-e" data-a="${a}" data-b="${b}" d="M${x1} ${y1}C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}"/>`}).join("");
 const n=UP_RN.map(r=>{const [x,y]=UP_POS[r],v=vol(r);const lines=UP_SHORT[r]||[];
  return `<a class="um-n" href="${v?upHref("handbooks",v.id):"#/upsc"}" data-n="${r}" onmouseenter="upMapHi('${r}')" onmouseleave="upMapHi('')" onfocus="upMapHi('${r}')" onblur="upMapHi('')" aria-label="Volume ${r}: ${esA(v?v.title:"")}">
   <circle cx="${x}" cy="${y}" r="20"/><text class="um-r" x="${x}" y="${y+5}" text-anchor="middle">${r}</text>${lines.map((l,i)=>`<text class="um-t" x="${x}" y="${y+35+i*12}" text-anchor="middle">${esc(l)}</text>`).join("")}</a>`}).join("");
 const c=UP_COLS.map(([t,x])=>`<text class="um-c" x="${x}" y="16" text-anchor="middle">${t}</text>`).join("");
 return `<svg class="um" viewBox="0 0 710 372" role="group" aria-label="The eleven volumes of the Economics Collection and how they connect">${c}${e}${n}</svg>`}
function upMapHi(r){document.querySelectorAll(".um").forEach(s=>{s.classList.toggle("hi",!!r);
 s.querySelectorAll(".um-e").forEach(p=>p.classList.toggle("on",!!r&&(p.dataset.a===r||p.dataset.b===r)));
 s.querySelectorAll(".um-n").forEach(a=>{const on=!!r&&(a.dataset.n===r||UP_EDGES.some(([x,y])=>(x===r&&y===a.dataset.n)||(y===r&&x===a.dataset.n)));a.classList.toggle("on",on)})})}
const UP_GLYPH={
 clarity:'<circle cx="20" cy="20" r="12"/><circle cx="20" cy="20" r="3.5" class="f"/><path d="M29 29l8 8"/>',
 visual:'<path d="M6 6v28h30"/><path d="M10 30C18 28 22 14 34 10"/><path d="M10 12c8 4 14 12 24 18" class="g"/>',
 india:'<rect x="6" y="6" width="28" height="28" rx="3"/><path d="M14 13h12M14 18h12M14 13c8 0 8 10 0 10l10 9"/>',
 current:'<path d="M6 30h28"/><path d="M10 30V18M18 30V12M26 30V20"/><circle cx="34" cy="10" r="3.5" class="f"/>',
 exam:'<rect x="9" y="5" width="22" height="30" rx="2"/><path d="M14 13h12M14 19h12M14 25h7"/><path d="M27 27l3 3 6-7" class="g"/>'};
function upGlyph(k){return `<svg class="up-gl" viewBox="0 0 40 40" aria-hidden="true" focusable="false">${UP_GLYPH[k]||""}</svg>`}

/* ── 0 · Overview ───────────────────────────────────────────────────────── */
function upOverview(){const H=UPSC_HB.volumes,pages=H.reduce((a,v)=>a+v.pages,0);
 return `<section class="up-hero"><div class="wrap full up-hero-in">
  <div class="up-hero-copy"><div class="up-eb"><span>UPSC CSE Economics</span><span class="up-eb-s">Prelims and Mains</span></div>
   <h1 class="up-h1">Understand the Indian Economy. <em>Prepare with clarity.</em></h1>
   <p class="up-lede">Structured learning for UPSC Civil Services aspirants, connecting economic foundations, Indian economic policy, contemporary developments and examination preparation.</p>
   <div class="up-cta"><a class="up-btn up-pri" href="${upHref("handbooks")}">Explore the Handbook Library</a><a class="up-btn up-gh" href="${upHref("syllabus")}">Explore the UPSC Syllabus</a><a class="up-btn up-gh" href="${upHref("course")}">Discover the Intensive Course</a></div>
   <dl class="up-stats"><div><dt>Handbook volumes</dt><dd>${H.length}</dd></div><div><dt>Pages in the collection</dt><dd>${pages}</dd></div><div><dt>Free topic previews</dt><dd>${UP_TOPICS.length}</dd></div></dl></div>
  <figure class="up-hero-fig">${upMap()}<figcaption>How the eleven volumes build on one another, from each volume's own series map. Select a volume to open it.</figcaption></figure></div></section>
 ${upRoad()}
 <section class="up-sec"><div class="wrap full">${upHead("Our approach","Five pillars","")}
  <ol class="up-pillars">${UP_PILLARS.map(([k,t,d],i)=>`<li class="up-pl rv" style="--i:${i}">${upGlyph(k)}<span class="up-pl-n">${String(i+1).padStart(2,"0")}</span><b>${esc(t)}</b><span>${esc(d)}</span></li>`).join("")}</ol></div></section>
 <section class="up-sec up-alt"><div class="wrap full">${upHead("How we approach Economics","One idea, seven steps","Follow the repo rate from a definition to a Mains judgement. Choose a step.","up-flow-h")}
  ${upFlowHtml()}</div></section>
 <section class="up-sec"><div class="wrap full up-two">
  <div>${upHead("What you will learn","The whole subject, in four strands","")}
   <ul class="up-strands">${[["Foundations","How economists think: choice, markets, elasticity, market failure.",["I"]],["Money, prices and finance","Money and the RBI, inflation, banks and financial markets.",["II","III","VI","VII"]],["Public finance","Taxation, the Budget, deficits, debt and fiscal federalism.",["IV","V"]],["India and the world","The balance of payments, trade, global institutions; agriculture, industry and labour.",["VIII","IX","X","XI"]]].map(([t,d,v])=>`<li><b>${t}</b><span>${d}</span><span class="up-sv">${v.map(n=>`<a href="${upHref("handbooks",upVol(n).id)}">Vol. ${n}</a>`).join("")}</span></li>`).join("")}</ul></div>
  <div>${upHead("How the handbooks help","Built for revision as much as for reading","")}
   <ul class="up-ticks"><li>Each volume opens with a syllabus map that ties its parts to Prelims and to Mains papers.</li><li>Boxes mark core ideas, Prelims boosters, UPSC traps, Indian applications and Mains answer frameworks.</li><li>Every volume closes with a revision compendium: mind map, rapid revision, high-yield facts, traps, glossary, PYQ linkage, MCQs and Mains frameworks.</li></ul>
   <a class="up-more" href="${upHref("handbooks")}">See all eleven volumes →</a></div></div></section>
 <section class="up-sec up-alt"><div class="wrap full">${upHead("Static meets current","Each development read through the concept it tests","")}
  <div class="up-pairs">${[["Flexible inflation targeting","target-2026"],["Fiscal deficit and debt anchor","budget-2026"],["Carbon pricing and trade","cbam-2026"]].map(([s,id])=>{const c=upCA(id);return `<div class="up-pair"><div class="up-pr-s"><span class="up-tag">Static concept</span><b>${esc(s)}</b></div><span class="up-pa" aria-hidden="true">→</span><div class="up-pr-c"><span class="up-tag g">${esc(upDate(c))}</span><b>${esc(c.h)}</b></div></div>`}).join("")}</div>
  <a class="up-more" href="${upHref("current")}">Current Affairs and Economics →</a></div></section>
 <section class="up-sec"><div class="wrap full">${upHead("Prelims and Mains","Two examinations, one understanding","")}
  <div class="up-vs"><div class="up-vs-c"><h3>Prelims</h3><ul><li>Precise definitions and distinctions</li><li>Institutions, instruments and their features</li><li>Statements that hide a single wrong word</li><li>Elimination, which rewards real understanding</li></ul></div>
   <div class="up-vs-m" aria-hidden="true"><span>Concept</span></div>
   <div class="up-vs-c"><h3>Mains</h3><ul><li>Causes, mechanisms and consequences</li><li>Indian data and examples, dated</li><li>Structure: define, analyse, evidence, judge</li><li>A conditional conclusion, not a list</li></ul></div></div>
  <p class="up-why"><b>Why understanding comes first.</b> An isolated fact answers one question. A mechanism answers every question built on it: the student who knows why bond prices fall when yields rise can answer a Prelims statement on G-secs and a Mains question on crowding out with the same idea.</p></div></section>
 ${upNext()}`}
/* ── the seven-stage roadmap: from the syllabus to revision ───────────────
   Each stage names what to do and opens the pages of this section that serve it. */
const UP_ROAD=[
 ["Understand the syllabus","Know exactly what is examined.","Read the official Prelims GS I and Mains GS III lines that concern Economics, what each asks of you, and where the Optional differs.",
  [["Syllabus explorer: Prelims GS I","syllabus",null],["Mains GS III, line by line","syllabus","mains"],["The Optional, and what is not covered","syllabus","optional"]]],
 ["Build the foundations","Learn the concepts every question rests on.","Scarcity, markets, elasticity, money and the national accounts: the vocabulary that Prelims options and Mains arguments turn on.",
  [["Volume I · Introduction to Economics","handbooks","volume-i"],["Shared concepts, read for UPSC","@concepts",null],["Topic preview: the PPC","resources","ppc"]]],
 ["Study the Indian economy","Apply each concept to India's institutions and data.","Money and the RBI, inflation, the Budget, banks and markets, the external sector, agriculture, industry and labour.",
  [["The Indian Economy Collection","handbooks",null],["Topic preview: inflation","resources","inflation"],["Topic preview: the fiscal deficit","resources","deficit"]]],
 ["Follow current affairs","Read each development through the concept it tests.","Dated developments, each tagged to its syllabus theme and the volume that explains the concept behind it.",
  [["Current Affairs","current",null],["Economics Resources by theme","resources",null]]],
 ["Practise for Prelims","Sharpen definitions and distinctions.","Statement-based questions reward precise understanding: practise elimination on the questions attached to each topic preview.",
  [["Topic previews with MCQs","resources",null],["Prelims GS I themes","syllabus",null]]],
 ["Write for Mains","Structure: define, analyse, evidence, judge.","Each GS III line carries an answer framework; each shared concept carries a practice question in the style of GS III.",
  [["Mains GS III answer frameworks","syllabus","mains"],["Practice questions in shared concepts","@concepts",null],["The intensive course","course",null]]],
 ["Revise","Return to the compendium, not the whole book.","Every volume closes with a mind map, rapid revision, high-yield facts, traps and a glossary for the last weeks.",
  [["Revision compendiums in every volume","handbooks",null],["Contact for a soft copy","contact",null]]]];
function upRoadHref([t,k,a]){return k==="@concepts"?routeFormat("concepts",1,null):upHref(k,a||undefined)}
function upRoadPanel(i){const [t,line,copy,links]=UP_ROAD[i];
 return `<div class="up-rd-h"><span class="up-rd-n">${String(i+1).padStart(2,"0")}</span><div><h3>${esc(t)}</h3><p class="up-rd-l">${esc(line)}</p><p>${esc(copy)}</p></div></div>
  <ul class="up-rd-g">${links.map(x=>`<li><a href="${esA(upRoadHref(x))}">${esc(x[0])} <span aria-hidden="true">→</span></a></li>`).join("")}</ul>`}
function upRoadGo(i){UPS.road=i;const p=document.getElementById("up-rd-p");if(p)p.innerHTML=upRoadPanel(i);
 document.querySelectorAll(".up-rd-s button").forEach((b,k)=>{b.classList.toggle("on",k===i);b.setAttribute("aria-pressed",String(k===i))})}
function upRoad(){const i=UPS.road||0;
 return `<section class="up-sec up-roadmap" aria-labelledby="up-rd-h"><div class="wrap full">${upHead("The roadmap","Seven stages, from the syllabus to revision","Where to begin, and what comes next. Select a stage.","up-rd-h")}
  <ol class="up-rd-s">${UP_ROAD.map(([t,line],k)=>`<li><button type="button" class="${k===i?"on":""}" aria-pressed="${k===i}" aria-controls="up-rd-p" onclick="upRoadGo(${k})"><span class="up-rd-n">${k+1}</span><b>${esc(t)}</b></button></li>`).join("")}</ol>
  <div class="up-rd-p" id="up-rd-p" aria-live="polite">${upRoadPanel(i)}</div></div></section>`}
function upFlowHtml(){const i=UPS.flow;
 return `<div class="up-flow"><ol class="up-fl-track" role="tablist" aria-label="The seven steps">${UP_FLOW.map(([t],k)=>`<li role="presentation"><button role="tab" id="upf-t${k}" aria-selected="${k===i}" aria-controls="upf-p" tabindex="${k===i?0:-1}" class="${k===i?"on":""}" onclick="upFlow(${k})" onkeydown="upFlowKey(event,${k})"><span>${k+1}</span>${esc(t)}</button></li>`).join("")}</ol>
  <div class="up-fl-p" id="upf-p" role="tabpanel" aria-labelledby="upf-t${i}" aria-live="polite">${upFlowPanel(i)}</div></div>`}
function upFlowPanel(i){const [t,d]=UP_FLOW[i];
 return `<div class="up-fl-x"><div class="up-k">Step ${i+1} of 7 · ${esc(t)}</div><p>${esc(d)}</p>${i===2?`<div class="up-fl-fig">${upFig("laf")}</div>`:""}
  <p class="up-src">From Volume II, Money & Monetary Policy, Parts F and H.</p></div>`}
function upFlow(i){UPS.flow=i;const p=document.getElementById("upf-p");if(!p)return;
 document.querySelectorAll(".up-fl-track button").forEach((b,k)=>{b.classList.toggle("on",k===i);b.setAttribute("aria-selected",k===i);b.tabIndex=k===i?0:-1});
 p.setAttribute("aria-labelledby","upf-t"+i);p.innerHTML=upFlowPanel(i)}
function upFlowKey(e,k){const n=UP_FLOW.length;let j=null;if(e.key==="ArrowRight")j=(k+1)%n;else if(e.key==="ArrowLeft")j=(k+n-1)%n;else if(e.key==="Home")j=0;else if(e.key==="End")j=n-1;
 if(j!==null){e.preventDefault();upFlow(j);const b=document.getElementById("upf-t"+j);if(b)b.focus()}}
function upNext(){return `<section class="up-sec up-next"><div class="wrap full">${upHead("Next steps","Three ways to go further","")}
 <div class="up-goals"><a class="up-goal" href="${upHref("resources")}"><span class="up-k">Free</span><b>Explore the UPSC Economics resources</b><span>Topic previews with diagrams, Prelims and Mains perspectives and a question to try.</span><span class="up-go">Start learning →</span></a>
  <a class="up-goal" href="${upHref("handbooks")}"><span class="up-k">${UP_PRICE}</span><b>Buy an individual handbook</b><span>Eleven volumes as digital PDFs. See the contents and sample pages first.</span><span class="up-go">Browse the collection →</span></a>
  <a class="up-goal" href="${upHref("course")}"><span class="up-k">${esc(UP_COURSE.fee)}</span><b>Enquire about the 3-month programme</b><span>${esc(UP_COURSE.feeLine)}. Online, Prelims and Mains, at most 25 students.</span><span class="up-go">See the programme →</span></a></div></div></section>`}

/* ── 1 · Syllabus ───────────────────────────────────────────────────────── */
function upSyllabus(){const m=ARG==="mains"?"mains":ARG==="optional"?"opt":UPS.mode;UPS.mode=m;
 return upMast("Syllabus","UPSC CSE Economics Syllabus","What the examination asks for in Economics, line by line: the official wording, what it means, where the Economics Collection treats it, and how it connects with current developments.")+
 `<div class="wrap full up-body">
  <aside class="up-srcbox"><div class="up-k">Official source</div><p><a href="${esA(UP_SYL_SRC.url)}" target="_blank" rel="noopener noreferrer">${esc(UP_SYL_SRC.doc)}</a>, dated ${esc(UP_SYL_SRC.date)}. ${esc(UP_SYL_SRC.where)}.</p>
   <p class="up-note">Only text marked <span class="up-lab o">Official</span> is UPSC wording. Everything else is explanation and organisation for study.</p></aside>
  <ul class="up-legend" aria-label="What the labels mean"><li><span class="up-lab o">Official</span>UPSC syllabus wording, quoted exactly</li><li><span class="up-lab e">Explained</span>Arjun's explanation of the topic</li><li><span class="up-lab c">Covered</span>where the Economics Collection treats it</li><li><span class="up-lab a">Current</span>a dated development that tests it</li></ul>
  <div class="up-seg" role="tablist" aria-label="Examination stage"><button role="tab" id="ups-pre" aria-selected="${m==="pre"}" aria-controls="ups-panel" class="${m==="pre"?"on":""}" onclick="upMode('pre')">Prelims <span>General Studies Paper I</span></button><button role="tab" id="ups-mains" aria-selected="${m==="mains"}" aria-controls="ups-panel" class="${m==="mains"?"on":""}" onclick="upMode('mains')">Mains <span>General Studies Paper III</span></button><button role="tab" id="ups-opt" aria-selected="${m==="opt"}" aria-controls="ups-panel" class="${m==="opt"?"on":""}" onclick="upMode('opt')">The Optional <span>Papers VI and VII</span></button></div>
  <div class="up-acc-tools"><button class="up-btn up-gh sm" onclick="upAccAll(true)">Expand all</button><button class="up-btn up-gh sm" onclick="upAccAll(false)">Collapse all</button>
   <span class="up-dots-key">${upDots([["III",""]]).replace(/class="up-dots"/,'class="up-dots k"')} <span>Each row of dots shows Volumes I to XI; a filled dot means that volume treats the topic. These are mapped from the volumes' own contents and syllabus maps, not a measure of completion.</span></span></div>
  <div id="ups-panel" role="tabpanel" aria-labelledby="ups-${m}">${upModeHtml(m)}</div></div>`}
function upModeHtml(m){return m==="pre"?upPreHtml():m==="opt"?upOptHtml():upMainsHtml()}
/* the Optional: named and placed, never claimed */
function upOptHtml(){return `<div class="up-opt"><div class="up-row"><span class="up-lab o">Official</span><span>The Civil Services (Main) Examination includes two papers in an optional subject chosen by the candidate (Papers VI and VII), and Economics is among the optional subjects. The syllabus for each optional subject is set out in the official notice.</span></div>
  <div class="up-row"><span class="up-lab e">Explained</span><span>The Economics Optional is a separate and much wider syllabus than the Economics in General Studies: it is examined in two papers of its own, in greater theoretical depth.</span></div>
  <div class="up-opt-c"><h3 class="up-h4">What this section covers, and what it does not</h3><p>The Indian Economy Collection, the topic previews and the UPSC Economics Course on this platform are written for Economics as it appears in General Studies: Prelims GS Paper I and Mains GS Paper III, with the related lines of GS Paper II. They are not a course for the Economics Optional. The foundations overlap, but a candidate taking the Optional should study its own syllabus from the official notice.</p>
   <p><a href="${esA(UP_SYL_SRC.url)}" target="_blank" rel="noopener noreferrer">Read the official notice (UPSC)</a></p></div></div>`}
function upMode(m){UPS.mode=m;const p=document.getElementById("ups-panel");if(!p)return;
 ["pre","mains","opt"].forEach(k=>{const b=document.getElementById("ups-"+k);if(b){b.classList.toggle("on",k===m);b.setAttribute("aria-selected",k===m)}});
 p.setAttribute("aria-labelledby","ups-"+m);p.innerHTML=upModeHtml(m)}
function upAccAll(open){document.querySelectorAll("#ups-panel details.up-acc").forEach(d=>d.open=open)}
function upCaLink(id){const c=id&&upCA(id);return c?`<div class="up-row"><span class="up-lab a">Current</span><a class="up-ca-l" href="${upHref("current")}" onclick="UPS.th='${esA(c.th)}'">${esc(upDate(c))}: ${esc(c.h)}</a></div>`:""}
function upPreHtml(){
 return `<section class="up-off"><div class="up-off-k"><span class="up-lab o">Official</span> Preliminary Examination, Paper I (General Studies): the lines that call on Economics</div>
  ${UP_PRE_OFFICIAL.map(l=>`<blockquote class="up-q">${esc(l)}</blockquote>`).join("")}
  <p class="up-note">The other lines of Paper I cover history, geography, polity and governance, environment and general science. Economics questions in Prelims draw on the two lines above, which is why the themes below go beyond their few words.</p></section>
 <h3 class="up-h3">Fourteen themes for Prelims <span class="up-lab e">Explained</span></h3>
 ${UP_PRE.map(t=>`<details class="up-acc" id="pre-${t.id}"><summary><span class="up-acc-t">${esc(t.t)}</span>${upDots(t.vols)}</summary><div class="up-acc-b">
  <div class="up-grid2"><div><h4>What it means</h4><p>${esc(t.m)}</p></div><div><h4>What you need to understand</h4><p>${esc(t.u)}</p></div></div>
  <h4>Important subtopics</h4><ul class="up-chips">${t.sub.map(s=>`<li>${esc(s)}</li>`).join("")}</ul>
  <div class="up-grid2"><div><h4>For Prelims</h4><p>${esc(t.pre)}</p></div><div><h4>How the resources and classes cover it <span class="up-lab c">Covered</span></h4><div class="up-vls">${upVolLinks(t.vols)}</div>
   ${t.res.length?`<p class="up-sm">Free previews: ${t.res.map(id=>{const x=upTopic(id);return x?`<a href="${upHref("resources",x.id)}">${esc(x.t)}</a>`:""}).filter(Boolean).join(" · ")}</p>`:""}</div></div>
  ${upCaLink(t.ca)}</div></details>`).join("")}`}
function upMainsHtml(){
 return `<section class="up-off"><div class="up-off-k"><span class="up-lab o">Official</span> Main Examination, ${esc(UP_MAINS_HEAD)}: the Economics lines</div>
  <p class="up-note">Each line below is quoted exactly. Open a line for its explanation, the concepts it calls on, an example, an approach for a Mains answer and where the collection treats it.</p></section>
 ${UP_MAINS.map(t=>`<details class="up-acc" id="${t.id}"><summary><span class="up-acc-t"><span class="up-lab o">Official</span> <q>${esc(t.o)}</q></span>${upDots(t.vols)}</summary><div class="up-acc-b">
  <div class="up-row"><span class="up-lab e">Explained</span><p>${esc(t.ex)}</p></div>
  <div class="up-grid2"><div><h4>Important dimensions</h4><ul class="up-list">${t.dim.map(s=>`<li>${esc(s)}</li>`).join("")}</ul></div><div><h4>Economic concepts</h4><ul class="up-chips">${t.con.map(s=>`<li>${esc(s)}</li>`).join("")}</ul></div></div>
  <div class="up-grid2"><div><h4>Example and policy application</h4><p>${esc(t.eg)}</p></div><div><h4>Approaching it in a Mains answer</h4><p>${esc(t.ans)}</p></div></div>
  <h4>Support from the handbooks and classes <span class="up-lab c">Covered</span></h4><div class="up-vls">${upVolLinks(t.vols)}</div>${t.note?`<p class="up-sm">${esc(t.note)}</p>`:""}</div></details>`).join("")}
 <section class="up-off up-gs2"><div class="up-off-k"><span class="up-lab o">Official</span> General Studies Paper II: lines that also call on Economics</div>
  ${UP_GS2.map(g=>`<div class="up-gs2-r"><blockquote class="up-q">${esc(g.o)}</blockquote><div class="up-vls">${upVolLinks(g.vols)}</div></div>`).join("")}</section>`}

/* ── 2 · Economics Resources ────────────────────────────────────────────── */
function upResources(){if(ARG&&upTopic(ARG))return upTopicPage(upTopic(ARG));
 const counts=Object.fromEntries(UP_CATS.map(c=>[c,UP_TOPICS.filter(t=>t.cat===c).length]));
 return upMast("Economics Resources","UPSC Economics Resource Library","Free topic previews drawn from the Economics Collection: each explains a concept, draws it, sets it in the Indian economy and shows how Prelims and Mains ask about it.")+
 `<div class="wrap full up-body"><div class="up-filter"><label class="up-search"><span class="sr-only">Search the resources</span><input id="up-q" type="search" placeholder="Search topics, e.g. MSP, deficit, CPI" value="${esA(UPS.q)}" oninput="UPS.q=this.value;upFilter()" autocomplete="off"></label>
  <div class="up-cats" role="group" aria-label="Filter by category"><button class="up-cat${UPS.cat?"":" on"}" aria-pressed="${!UPS.cat}" onclick="upCat('')">All <span>${UP_TOPICS.length}</span></button>${UP_CATS.map(c=>`<button class="up-cat${UPS.cat===c?" on":""}" aria-pressed="${UPS.cat===c}" data-c="${esA(c)}" onclick="upCat(this.dataset.c)"${counts[c]?"":" disabled"}>${esc(c)} <span>${counts[c]}</span></button>`).join("")}</div></div>
  <p class="up-count" id="up-count" aria-live="polite"></p>
  <ul class="up-tgrid" id="up-tgrid">${UP_TOPICS.map((t,i)=>`<li class="up-tc rv" style="--i:${i%6}" data-c="${esA(t.cat)}" data-s="${esA([t.t,t.cat,t.intro,t.ex.join(" "),t.dist.map(d=>d.join(" ")).join(" "),"volume "+t.vol].join(" ").toLowerCase())}">
   <a class="up-tc-a" href="${upHref("resources",t.id)}"><span class="up-tc-fig">${upFig(t.fig)}</span><span class="up-tc-k">${esc(t.cat)}</span><b>${esc(t.t)}</b><span class="up-tc-d">${esc(t.intro)}</span><span class="up-tc-v">From Volume ${esc(t.vol)}${t.also?` and ${esc(t.also)}`:""}</span></a></li>`).join("")}</ul>
  <p class="up-empty" id="up-empty" hidden>No topic matches. Try another word, or <button class="lnk" onclick="UPS.q='';UPS.cat='';render()">show every topic</button>.</p>
  ${upConnector()}
  <section class="up-sec up-more-res"><div class="up-goals"><a class="up-goal" href="${upHref("syllabus")}"><span class="up-k">Free</span><b>The syllabus explorer</b><span>Every Economics line of the official syllabus, explained and mapped.</span><span class="up-go">Open →</span></a>
   <a class="up-goal" href="${upHref("current")}"><span class="up-k">Free</span><b>Current Affairs and Economics</b><span>Dated developments, each with its source and its concept.</span><span class="up-go">Open →</span></a>
   <a class="up-goal" href="${upHref("handbooks")}"><span class="up-k">${UP_PRICE}</span><b>The Handbook Collection</b><span>The complete treatment of each topic, as a digital PDF.</span><span class="up-go">Browse →</span></a></div></section></div>`}
function upCat(c){UPS.cat=c;document.querySelectorAll(".up-cat").forEach(b=>{const on=(b.dataset.c||"")===c;b.classList.toggle("on",on);b.setAttribute("aria-pressed",on)});upFilter()}
function upFilter(){const q=(UPS.q||"").trim().toLowerCase(),c=UPS.cat;let n=0;
 document.querySelectorAll("#up-tgrid .up-tc").forEach(li=>{const ok=(!c||li.dataset.c===c)&&(!q||q.split(/\s+/).every(w=>li.dataset.s.includes(w)));li.hidden=!ok;if(ok)n++});
 const e=document.getElementById("up-empty"),k=document.getElementById("up-count");if(e)e.hidden=n>0;
 if(k)k.textContent=(c||q)?`${n} of ${UP_TOPICS.length} topics`+(c?` in ${c}`:"")+(q?` matching "${UPS.q.trim()}"`:""):`${UP_TOPICS.length} topics`}
function upTopicPage(t){const v=upVol(t.vol),i=UP_TOPICS.indexOf(t),prev=UP_TOPICS[(i+UP_TOPICS.length-1)%UP_TOPICS.length],next=UP_TOPICS[(i+1)%UP_TOPICS.length];
 return `<section class="up-mast up-tmast"><div class="wrap full up-mast-in"><nav class="up-crumb" aria-label="Breadcrumb"><a href="${upHref("resources")}">Economics Resources</a><span aria-hidden="true">/</span><span>${esc(t.cat)}</span></nav>
  <h1 class="up-h1">${esc(t.t)}</h1><p class="up-lede">${esc(t.intro)}</p><p class="up-tv">From <a href="${upHref("handbooks",v.id)}">Volume ${esc(v.n)}: ${esc(v.title)}</a>, Parts ${esc(t.parts)}</p></div></section>
 <div class="wrap full up-body up-tp">
  <div class="up-tp-main"><section><h2 class="up-h3">The concept</h2>${t.ex.map(p=>`<p>${esc(p)}</p>`).join("")}</section>
   <figure class="up-tp-fig">${upFig(t.fig)}<figcaption>${esc(t.figCap)}</figcaption></figure>
   <section><h2 class="up-h3">Important distinctions</h2><table class="up-tbl"><tbody>${t.dist.map(([a,b])=>`<tr><th scope="row">${esc(a)}</th><td>${esc(b)}</td></tr>`).join("")}</tbody></table></section>
   <div class="up-grid2"><section class="up-card"><h2 class="up-h4">In the Indian economy</h2><p>${esc(t.india)}</p></section><section class="up-card"><h2 class="up-h4">Policy and institutions</h2><p>${esc(t.policy)}</p></section></div>
   <div class="up-grid2"><section class="up-card up-pre"><h2 class="up-h4">The Prelims perspective</h2><p>${esc(t.pre)}</p></section><section class="up-card up-mains"><h2 class="up-h4">The Mains perspective</h2><p>${esc(t.mains)}</p></section></div>
   ${upMcq(t)}</div>
  <aside class="up-tp-side"><div class="up-glimpse"><div class="up-k">From the handbook</div>${upCover(v,"up-cv sm")}<b>Volume ${esc(v.n)}: ${esc(v.title)}</b><span>${v.pages} pages · Parts ${esc(t.parts)} treat this topic in full</span>
   <a class="up-btn up-pri w" href="${upHref("handbooks",v.id)}">Explore Handbook</a>${upBuy(v,"up-btn up-buy w")}</div></aside>
  <nav class="up-pn" aria-label="More topics"><a class="up-pn-a" href="${upHref("resources",prev.id)}"><span>Previous</span>${esc(prev.t)}</a><a class="up-pn-a" href="${upHref("resources",next.id)}"><span>Next</span>${esc(next.t)}</a></nav></div>`}
function upMcq(t){const q=t.mcq,L="abcd";
 return `<section class="up-mcq" aria-labelledby="mcq-${t.id}"><div class="up-k">Try a question</div><h2 class="up-h4" id="mcq-${t.id}">${esc(q.q)}</h2>
  <fieldset><legend class="sr-only">Choose one answer</legend>${q.o.map((o,i)=>`<label class="up-opt"><input type="radio" name="mcq-${t.id}" value="${i}"><span class="up-ol">(${L[i]})</span> ${esc(o)}</label>`).join("")}</fieldset>
  <button class="up-btn up-pri sm" onclick="upCheck('${t.id}')">Check my answer</button><div class="up-fb" id="fb-${t.id}" aria-live="polite"></div></section>`}
function upCheck(id){const t=upTopic(id),f=document.getElementById("fb-"+id);if(!t||!f)return;const s=document.querySelector(`input[name="mcq-${id}"]:checked`);
 if(!s){f.className="up-fb";f.textContent="Choose an answer first.";return}
 const ok=+s.value===t.mcq.a;f.className="up-fb "+(ok?"ok":"no");
 f.innerHTML=`<b>${ok?"Correct.":"Not quite: the answer is ("+"abcd"[t.mcq.a]+")."}</b> ${esc(t.mcq.why)}`}
/* One Concept. Two Examination Perspectives. IB links are kept only where the route exists. */
function upIbLinks(r){return r.ibg.map(([lab,v,tab,arg])=>{const s=SECTIONS.find(x=>x.v===v);if(!s||typeof VIEWS[v]!=="function")return "";
 const t=tab&&s.tabs?Math.max(0,s.tabs.indexOf(tab)):0;if(tab&&s.tabs&&s.tabs.indexOf(tab)<0)return "";
 if(arg&&v==="studio"){try{if(!stItem(arg))return ""}catch(e){return ""}}
 const h=routeFormat(v,t,arg);return routeParse(h)?`<a class="up-ibl" href="${esA(h)}">${esc(lab)}</a>`:""}).filter(Boolean).join("")}
function upConnector(){
 return `<section class="up-sec up-conn" id="connector" aria-labelledby="conn-h"><div class="up-conn-head"><div class="up-k">IB DP + UPSC CSE</div><h2 class="up-h2" id="conn-h">One Concept. Two Examination Perspectives.</h2>
  <p class="up-hd">Many ideas are shared by the two examinations. The concept is the same; the learning objective, the examples and the way it is examined differ.</p>
  <div class="up-conn-dia" aria-hidden="true"><span class="cf">Shared Economics foundation</span><span class="cl"></span><span class="cr"><b>IB DP perspective</b><b>UPSC CSE perspective</b></span></div></div>
  <div class="up-conn-t" role="table" aria-label="Shared concepts across IB DP and UPSC CSE"><div class="up-conn-r h" role="row"><span role="columnheader">Shared concept</span><span role="columnheader">IB DP Economics application</span><span role="columnheader">UPSC CSE application</span></div>
  ${UP_CONNECT.map(r=>`<div class="up-conn-r" role="row"><span role="rowheader"><b>${esc(r.c)}</b></span>
   <span role="cell" class="ib"><span class="up-ck">${esc(r.ibk)}</span>${esc(r.ib)}<span class="up-cl">${upIbLinks(r)}</span></span>
   <span role="cell" class="ups"><span class="up-ck">Economics Collection</span>${esc(r.up)}<span class="up-cl">${upVolLinks(r.vols)}${r.t&&upTopic(r.t)?`<a class="up-ibl u" href="${upHref("resources",r.t)}">Preview: ${esc(upTopic(r.t).t)}</a>`:""}</span></span></div>`).join("")}</div>
  <p class="up-note">IB links open the existing IB DP resources on this platform; nothing is duplicated. UPSC links open the handbook volumes and the free previews.</p></section>`}

/* ── 3 · Economics Handbooks: THE INDIAN ECONOMY COLLECTION ──────────────────
   The library: category and volume filters over eleven cards, each with its cover,
   an inside page, the exact title, the verified page count, the topics, the syllabus
   links, the price and the enquiry. A volume's page: the cover, the facts and the
   enquiry on the left; the overview, what is learnt, the parts, the concepts, the
   syllabus relevance and the eight-page preview on the right.
   THE PREVIEW: eight selected pages per volume, rendered exactly as the PDF prints
   them (nothing drawn over a page; its own header, footer and copyright line kept).
   Previous and next, page numbers, zoom, full screen and thumbnails; the thumbnail
   shows first and the full page replaces it, and the next page is fetched ahead. It
   says plainly that it is a selected preview; it does not claim to prevent copying.
   Purchase is completed by direct contact: nothing is charged on this website. */
const UPF={cat:"all",vol:"all"};
function upCat(k){return (UPSC_HB.categories||[]).find(c=>c.k===k)||{k,n:k}}
function upCatCount(k){return UPSC_HB.volumes.filter(v=>k==="all"||v.cat===k).length}
function upReq(v,cls,label){return upExt(upWa(upHbMsg(v)),label||`Request on WhatsApp <span class="up-sep" aria-hidden="true">|</span> ₹99`,cls||"up-btn up-buy",`Request the soft copy of Volume ${v.n} (₹99) on WhatsApp`)}
function upHandbooks(){if(ARG){const v=upVol(ARG);if(v)return upVolume(v);const m=/^category-([a-z]+)$/.exec(ARG);if(m&&upCat(m[1]).n!==m[1]){UPF.cat=m[1];UPF.vol="all"}}
 const H=UPSC_HB.volumes,pages=H.reduce((a,v)=>a+v.pages,0),C=UPSC_HB.categories||[];
 return `<section class="up-mast up-hbm"><div class="wrap full up-mast-in up-hbm-in"><div>
  <div class="up-eb"><span>UPSC CSE Economics</span><span class="up-eb-s">Handbook library</span></div>
  <h1 class="up-h1 hl-h1">The Indian Economy Collection</h1>
  <p class="up-lede">Eleven carefully structured volumes covering essential dimensions of Indian and international Economics for UPSC CSE preparation.</p>
  <dl class="up-facts"><div><dt>Volumes</dt><dd>${H.length}</dd></div><div><dt>Pages in all</dt><dd>${pages}</dd></div><div><dt>Price</dt><dd>₹99 per soft copy</dd></div><div><dt>Preview</dt><dd>8 pages of each</dd></div></dl></div>
  <div class="up-fan" aria-hidden="true">${H.slice(0,5).map((v,i)=>`<span style="--i:${i};background-image:url('${esA((v.img.coverSm||v.img.cover).src)}')"></span>`).join("")}</div></div></section>
 <div class="wrap full up-body">
  <ol class="up-steps" aria-label="How to obtain a handbook"><li><b>Choose a volume</b><span>Read its contents and eight selected pages first.</span></li><li><b>Send the prefilled message</b><span>On WhatsApp or by email: it names the volume and the price of ₹99.</span></li><li><b>Complete the purchase directly</b><span>Payment and delivery of the soft copy are arranged with Arjun Agrawal; nothing is charged on this website.</span></li></ol>
  <div class="hl-filters" role="search" aria-label="Filter the collection">
   <div class="hl-fg" role="group" aria-label="Category"><span class="hl-fl">Category</span>${[{k:"all",n:"All volumes"}].concat(C).map(c=>`<button type="button" class="hl-chip${UPF.cat===c.k?" on":""}" data-cat="${c.k}" aria-pressed="${UPF.cat===c.k}" onclick="upFilt('cat','${c.k}')">${esc(c.n)} <span class="hl-n">${upCatCount(c.k)}</span></button>`).join("")}</div>
   <label class="hl-vs"><span class="hl-fl">Volume</span><select onchange="upFilt('vol',this.value)" aria-label="Show one volume"><option value="all">All eleven</option>${H.map(v=>`<option value="${v.id}"${UPF.vol===v.id?" selected":""}>Volume ${esc(v.n)}: ${esc(v.title)}</option>`).join("")}</select></label>
   <p class="hl-count" id="hl-count" aria-live="polite"></p></div>
  <ul class="hl-grid" id="hl-grid">${H.map((v,i)=>upCard(v,i)).join("")}</ul>
  <p class="up-note">Each volume is sold individually as a soft copy (PDF) at ₹99, and the purchase is completed by direct contact with Arjun Agrawal. The library shows each volume's cover and eight selected pages; the complete handbook is never published on this website.</p></div>`}
function upCard(v,i){const pg=(v.img.pages||[]),inside=pg.find(p=>p.p>5)||pg[1]||pg[0],c=upCat(v.cat),hide=!upShown(v);
 return `<li class="hl-card rv" style="--i:${i%3}" id="card-${v.id}" data-cat="${v.cat}"${hide?" hidden":""}>
  <div class="hl-art">${upCover(v,"up-cv hl-cv")}${inside?`<img class="hl-in" src="${esA(inside.t.src)}" alt="" width="${inside.t.w}" height="${inside.t.h}" loading="lazy" decoding="async">`:""}
   <button type="button" class="hl-pv" onclick="hvOpen('${v.id}',0)" aria-label="Preview eight pages of Volume ${esA(v.n)}: ${esA(v.title)}">Preview 8 pages</button></div>
  <div class="hl-x"><div class="hl-k"><span class="hl-vn">Volume ${esc(v.n)}</span><span class="hl-cat">${esc(c.n)}</span></div>
   <h2 class="hl-t"><a href="${upHref("handbooks",v.id)}">${esc(v.title)}</a></h2>
   <p class="hl-d">${esc(v.sub)}</p>
   <p class="hl-pp">${v.pages} pages <span aria-hidden="true">·</span> ${v.parts.length} parts <span aria-hidden="true">·</span> Digital PDF (A4)</p>
   <ul class="up-chips sm" aria-label="Topics">${v.concepts.slice(0,4).map(t=>`<li>${esc(t)}</li>`).join("")}</ul>
   <dl class="hl-rel"><div><dt>Prelims</dt><dd>${esc(upShort(v.pre))}</dd></div><div><dt>Mains</dt><dd>${esc(upShort(v.mains))}</dd></div></dl>
   <div class="hl-f"><span class="hl-price"><b>₹99</b> per soft copy</span><span class="hl-b"><a class="up-btn up-gh sm" href="${upHref("handbooks",v.id)}">View volume</a>${upReq(v,"up-btn up-buy sm","Enquire <span class=\"up-sep\" aria-hidden=\"true\">|</span> ₹99")}</span></div></div></li>`}
function upShown(v){return (UPF.cat==="all"||v.cat===UPF.cat)&&(UPF.vol==="all"||v.id===UPF.vol)}
function upFilt(k,val){UPF[k]=val;if(k==="cat")UPF.vol="all";
 const H=UPSC_HB.volumes;let n=0;H.forEach(v=>{const el=document.getElementById("card-"+v.id);const on=upShown(v);if(on)n++;if(el)el.hidden=!on});
 document.querySelectorAll(".hl-chip").forEach(b=>{const on=b.dataset.cat===UPF.cat;b.classList.toggle("on",on);b.setAttribute("aria-pressed",String(on))});
 const s=document.querySelector(".hl-vs select");if(s&&k==="cat")s.value="all";
 const c=document.getElementById("hl-count");if(c)c.textContent=n===H.length?"":`Showing ${n} of ${H.length} volumes`}
function upShort(s){const i=s.indexOf(":");let t=i>0&&i<70?s.slice(i+1).trim():s;t=t.charAt(0).toUpperCase()+t.slice(1);return t.length>140?t.slice(0,t.lastIndexOf(",",138))+"…":t}
function upVolume(v){const H=UPSC_HB.volumes,i=H.indexOf(v),prev=H[i-1],next=H[i+1],c=upCat(v.cat);
 const topics=UP_TOPICS.filter(t=>t.vol===v.n||t.also===v.n);
 return `<section class="up-mast up-vm hl-vm"><div class="wrap full up-mast-in"><nav class="up-crumb" aria-label="Breadcrumb"><a href="${upHref("handbooks")}">The Indian Economy Collection</a><span aria-hidden="true">/</span><a href="${upHref("handbooks","category-"+v.cat)}">${esc(c.n)}</a><span aria-hidden="true">/</span><span aria-current="page">Volume ${esc(v.n)}</span></nav>
  <div class="hl-vk">Volume ${esc(v.n)} · The Indian Economy Collection · ${esc(v.edition)}</div><h1 class="up-h1 hl-vt">${esc(v.title)}</h1><p class="up-vsub">${esc(v.sub)}</p></div></section>
 <div class="wrap full up-body hl-vd">
  <aside class="hl-side" aria-label="Volume ${esA(v.n)} at a glance"><div class="hl-sc">${upCover(v,"up-cv lg",true)}</div>
   <dl class="hl-sf"><div><dt>Volume</dt><dd>${esc(v.n)} of ${H.length}</dd></div><div><dt>Pages</dt><dd>${v.pages}</dd></div><div><dt>Parts</dt><dd>${v.parts.length}</dd></div><div><dt>Category</dt><dd>${esc(c.n)}</dd></div><div><dt>Format</dt><dd>Digital PDF (A4)</dd></div><div><dt>Useful for</dt><dd>${esc(v.exams.join(" · "))}</dd></div></dl>
   <div class="hl-buy"><div class="hl-bp"><b>₹99</b> <span>per soft copy</span></div>
    ${upReq(v,"up-btn up-buy w")}<a class="up-btn up-gh w" href="${esA(upMail(upHbSubject(v),upHbMsg(v)))}">Enquire by email</a><a class="up-btn up-gh w" href="${esA(upTel())}">Call ${esc(UP_PHONE)}</a>
    <p class="up-xs">The message names this volume and its price. The purchase is completed directly with Arjun Agrawal: payment and delivery of the PDF are arranged by message, and nothing is charged on this website.</p></div>
   <button type="button" class="up-btn up-pri w hl-open" onclick="hvOpen('${v.id}',0)">Open the preview in full screen</button></aside>
  <div class="hl-main">
   <section class="up-vd-s"><h2 class="up-h3">Overview</h2><p class="up-big">${esc(v.desc)}</p></section>
   <section class="up-vd-s"><h2 class="up-h3">Inside the volume: eight selected pages</h2>${hvMarkup(v,"inline")}</section>
   <section class="up-vd-s"><h2 class="up-h3">What students learn</h2><ul class="up-ticks">${v.learn.map(l=>`<li>${esc(l)}</li>`).join("")}</ul></section>
   <section class="up-vd-s"><h2 class="up-h3">Topics: the ${v.parts.length} parts</h2><ol class="up-toc">${v.parts.map(p=>`<li><span class="up-toc-l">Part ${esc(p.l)}</span><span class="up-toc-x"><b>${esc(p.t)}</b><span>${esc(p.d)}</span></span><span class="up-toc-p">p. ${p.p}</span></li>`).join("")}</ol></section>
   <section class="up-vd-s up-grid2"><div><h2 class="up-h4">Key concepts</h2><ul class="up-chips">${v.concepts.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div><div><h2 class="up-h4">Institutions, policies and schemes</h2><ul class="up-chips g">${v.inst.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div></section>
   <section class="up-vd-s"><h2 class="up-h3">Syllabus relevance</h2><div class="up-grid2"><div class="up-card up-pre"><h3 class="up-h4">Prelims</h3><p>${esc(v.pre)}</p></div><div class="up-card up-mains"><h3 class="up-h4">Mains</h3><p>${esc(v.mains)}</p></div></div>
    <h3 class="up-h4">The volume's own syllabus map</h3><div class="up-tw"><table class="up-tbl map"><thead><tr><th scope="col">Syllabus area</th><th scope="col">Prelims (parts)</th><th scope="col">Mains (sections)</th><th scope="col">Also useful for</th></tr></thead><tbody>${v.map.map(r=>`<tr><th scope="row">${esc(r[0])}</th><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td>${esc(r[3])}</td></tr>`).join("")}</tbody></table></div></section>
   <section class="up-vd-s"><h2 class="up-h3">How the volume is built</h2><p>Recurring boxes: ${v.boxes.map(b=>`<span class="up-box-n">${esc(b)}</span>`).join(" ")}</p><p><b>Revision compendium.</b> ${esc(v.comp)}</p></section>
   ${topics.length?`<section class="up-vd-s"><h2 class="up-h3">Free topic previews from this volume</h2><div class="up-vls">${topics.map(t=>`<a class="up-vl" href="${upHref("resources",t.id)}"><b>${esc(t.t)}</b></a>`).join("")}</div></section>`:""}
   <nav class="up-pn" aria-label="Other volumes">${prev?`<a class="up-pn-a" href="${upHref("handbooks",prev.id)}"><span>Volume ${prev.n}</span>${esc(prev.title)}</a>`:"<span></span>"}${next?`<a class="up-pn-a" href="${upHref("handbooks",next.id)}"><span>Volume ${next.n}</span>${esc(next.title)}</a>`:"<span></span>"}</nav></div></div>`}

/* ── the preview viewer ─────────────────────────────────────────────────── */
const HV={};   /* per viewer: the page shown and the zoom */
const HV_Z=[1,1.5,2];
function hvMarkup(v,mode){const P=v.img.pages||[];if(!P.length)return "";const id=`hv-${mode}-${v.id}`,st=HV[id]||(HV[id]={i:0,z:0});const p=P[st.i]||P[0];
 return `<div class="hv hv-${mode}" id="${id}" data-vol="${v.id}" role="region" aria-roledescription="page viewer" aria-label="Selected preview of Volume ${esA(v.n)}: ${esA(v.title)}" tabindex="-1" onkeydown="hvKey(event,'${id}')">
  <p class="hv-note"><b>Selected preview.</b> ${P.length} of the ${v.pages} pages, shown as the PDF prints them. The complete volume is a ₹99 soft copy, obtained by direct contact.</p>
  <div class="hv-bar"><div class="hv-nav"><button type="button" class="hv-b" data-a="prev" onclick="hvGo('${id}',-1)" aria-label="Previous page"${st.i===0?" disabled":""}><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3L5 8l5 5"/></svg></button>
    <span class="hv-pos" aria-live="polite"><b class="hv-n">${st.i+1}</b> / ${P.length} <span class="hv-pg">· page <span class="hv-pp">${p.p}</span> of ${v.pages}</span></span>
    <button type="button" class="hv-b" data-a="next" onclick="hvGo('${id}',1)" aria-label="Next page"${st.i===P.length-1?" disabled":""}><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg></button></div>
   <div class="hv-tools"><button type="button" class="hv-b" onclick="hvZoom('${id}',-1)" aria-label="Zoom out"${st.z===0?" disabled":""}><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10"/></svg></button>
    <span class="hv-zl" aria-live="polite">${Math.round(HV_Z[st.z]*100)}%</span>
    <button type="button" class="hv-b" onclick="hvZoom('${id}',1)" aria-label="Zoom in"${st.z===HV_Z.length-1?" disabled":""}><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M8 3v10"/></svg></button>
    <button type="button" class="hv-b hv-fsb" onclick="hvFull('${id}')" aria-label="Full screen"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4"/></svg></button></div></div>
  <div class="hv-stage" data-z="${st.z}"><figure class="hv-fig"><img class="hv-img" src="${esA(p.src)}" width="${p.w}" height="${p.h}" alt="${esA(hvAlt(v,p,st.i))}" decoding="async" style="background-image:url('${esA(p.t.src)}')" onload="this.classList.add('ok')"><figcaption class="hv-cap">${esc(p.cap)}</figcaption></figure></div>
  <ol class="hv-th" aria-label="Preview pages">${P.map((q,k)=>`<li><button type="button" class="hv-t${k===st.i?" on":""}" onclick="hvTo('${id}',${k})" aria-label="Preview ${k+1} of ${P.length}: page ${q.p}, ${esA(q.cap)}"${k===st.i?' aria-current="true"':""}><img src="${esA(q.t.src)}" width="${q.t.w}" height="${q.t.h}" alt="" loading="lazy" decoding="async"><span>p. ${q.p}</span></button></li>`).join("")}</ol>
 </div>`}
function hvAlt(v,p,i){return `Volume ${v.n}, page ${p.p} (preview ${i+1} of ${(v.img.pages||[]).length}): ${p.cap}`}
function hvEl(id){return document.getElementById(id)}
function hvVol(id){const el=hvEl(id);return el?upVol(el.dataset.vol):null}
function hvPaint(id){const el=hvEl(id),v=hvVol(id);if(!el||!v)return;const P=v.img.pages,st=HV[id],p=P[st.i];
 const img=el.querySelector(".hv-img");if(img.getAttribute("src")!==p.src){img.classList.remove("ok");img.style.backgroundImage=`url('${p.t.src}')`;img.src=p.src;img.width=p.w;img.height=p.h}
 img.alt=hvAlt(v,p,st.i);el.querySelector(".hv-cap").textContent=p.cap;el.querySelector(".hv-n").textContent=st.i+1;el.querySelector(".hv-pp").textContent=p.p;
 el.querySelector('[data-a="prev"]').disabled=st.i===0;el.querySelector('[data-a="next"]').disabled=st.i===P.length-1;
 el.querySelectorAll(".hv-t").forEach((b,k)=>{b.classList.toggle("on",k===st.i);if(k===st.i)b.setAttribute("aria-current","true");else b.removeAttribute("aria-current")});
 const on=el.querySelector(".hv-t.on");if(on&&on.scrollIntoView){const l=el.querySelector(".hv-th");if(l)l.scrollLeft=Math.max(0,on.offsetLeft-l.clientWidth/2+on.clientWidth/2)}
 const stg=el.querySelector(".hv-stage");stg.dataset.z=st.z;el.querySelector(".hv-zl").textContent=Math.round(HV_Z[st.z]*100)+"%";
 const zb=el.querySelectorAll('.hv-tools .hv-b');zb[0].disabled=st.z===0;zb[1].disabled=st.z===HV_Z.length-1;
 /* the next page is fetched ahead, so turning the page is instant */
 [P[st.i+1],P[st.i-1]].forEach(q=>{if(q){const im=new Image();im.decoding="async";im.src=q.src}})}
function hvGo(id,d){const v=hvVol(id),st=HV[id];if(!v||!st)return;const n=Math.max(0,Math.min(v.img.pages.length-1,st.i+d));if(n===st.i)return;st.i=n;hvPaint(id);const s=hvEl(id).querySelector(".hv-stage");if(s)s.scrollTop=0}
function hvTo(id,k){const st=HV[id];if(!st)return;st.i=k;hvPaint(id);const s=hvEl(id).querySelector(".hv-stage");if(s)s.scrollTop=0}
function hvZoom(id,d){const st=HV[id];if(!st)return;st.z=Math.max(0,Math.min(HV_Z.length-1,st.z+d));hvPaint(id)}
function hvKey(e,id){if(e.target.closest("select,input,textarea"))return;
 if(e.key==="ArrowRight"||e.key==="PageDown"){e.preventDefault();hvGo(id,1)}else if(e.key==="ArrowLeft"||e.key==="PageUp"){e.preventDefault();hvGo(id,-1)}
 else if(e.key==="+"||e.key==="="){hvZoom(id,1)}else if(e.key==="-"){hvZoom(id,-1)}else if(e.key==="f"||e.key==="F"){hvFull(id)}}
/* full screen: the element itself where the browser allows it, a fixed layer where it does not */
function hvFull(id){const el=hvEl(id);if(!el)return;const fs=document.fullscreenElement||document.webkitFullscreenElement;
 if(fs===el||el.classList.contains("hv-fs")){if(fs&&document.exitFullscreen)document.exitFullscreen().catch(()=>{});el.classList.remove("hv-fs");document.body.classList.remove("hv-lock");return}
 const req=el.requestFullscreen||el.webkitRequestFullscreen;
 const fallback=()=>{el.classList.add("hv-fs");document.body.classList.add("hv-lock");el.focus()};
 if(req){try{const r=req.call(el);if(r&&r.catch)r.catch(fallback)}catch(e){fallback()}}else fallback();
 el.focus()}
document.addEventListener&&document.addEventListener("keydown",e=>{if(e.key==="Escape"){const f=document.querySelector(".hv.hv-fs");if(f){f.classList.remove("hv-fs");document.body.classList.remove("hv-lock")}}});
/* from a card: the viewer opens in a dialog, then in full screen */
function hvOpen(vid,k){const v=upVol(vid);if(!v)return;let d=document.getElementById("hv-dlg");
 if(!d){d=document.createElement("dialog");d.id="hv-dlg";d.className="hv-dlg";d.setAttribute("aria-label","Handbook preview");document.body.appendChild(d);
  d.addEventListener("click",e=>{if(e.target===d)d.close()});d.addEventListener("close",()=>{d.innerHTML="";document.body.classList.remove("hv-lock")})}
 const id=`hv-dialog-${v.id}`;HV[id]={i:k||0,z:0};
 d.innerHTML=`<div class="hv-dh"><div><span class="hv-dk">Volume ${esc(v.n)} · ${v.pages} pages</span><b>${esc(v.title)}</b></div>
  <div class="hv-da">${upReq(v,"up-btn up-buy sm","Enquire <span class=\"up-sep\" aria-hidden=\"true\">|</span> ₹99")}<a class="up-btn up-gh sm" href="${upHref("handbooks",v.id)}" onclick="document.getElementById('hv-dlg').close()">View volume</a>
   <form method="dialog"><button class="hv-x" aria-label="Close the preview">×</button></form></div></div>${hvMarkup(v,"dialog")}`;
 try{d.showModal()}catch(e){d.setAttribute("open","")}document.body.classList.add("hv-lock");const el=hvEl(id);if(el)el.focus();hvPaint(id)}
/* swipe between pages on a touch screen when the page is not zoomed */
document.addEventListener&&document.addEventListener("pointerdown",e=>{const stg=e.target.closest&&e.target.closest(".hv-stage");if(!stg||e.pointerType==="mouse")return;
 const el=stg.closest(".hv"),id=el&&el.id;if(!id||!HV[id]||HV[id].z>0)return;const x0=e.clientX,y0=e.clientY;
 const up=f=>{document.removeEventListener("pointerup",up);const dx=f.clientX-x0,dy=f.clientY-y0;if(Math.abs(dx)>60&&Math.abs(dx)>2*Math.abs(dy))hvGo(id,dx<0?1:-1)};
 document.addEventListener("pointerup",up)});

/* ── 4 · Current Affairs ────────────────────────────────────────────────── */
function upCurrent(){const th=UPS.th,L=[...UP_CA].sort((a,b)=>b.d.localeCompare(a.d)),used=UP_CA_THEMES.filter(t=>UP_CA.some(c=>c.th===t));
 return upMast("Current Affairs","Current Affairs and Economics","How Economics connects with India's economic developments. Every entry is dated, names its original source, and links to the concept and the handbook part that explains it.")+
 `<div class="wrap full up-body"><p class="up-srcbox up-cmp"><b>Edited by hand, not a live feed.</b> Compiled on ${esc(UP_CA_COMPILED)} from the dated trackers in the Economics Collection. Each entry names the authority whose document it reports.</p>
  <div class="up-cats" role="group" aria-label="Filter by theme"><button class="up-th${th?"":" on"}" aria-pressed="${!th}" onclick="upTheme('')">All <span>${UP_CA.length}</span></button>${used.map(t=>`<button class="up-th${th===t?" on":""}" aria-pressed="${th===t}" data-t="${esA(t)}" onclick="upTheme(this.dataset.t)">${esc(t)} <span>${UP_CA.filter(c=>c.th===t).length}</span></button>`).join("")}</div>
  <ol class="up-ca" id="up-ca">${L.map(c=>{const v=upVol(c.vol);return `<li class="up-ca-i" data-t="${esA(c.th)}"${th&&th!==c.th?" hidden":""} id="ca-${c.id}"><div class="up-ca-d"><time datetime="${c.d}">${esc(upDate(c))}</time><span class="up-tag">${esc(c.th)}</span></div>
   <div class="up-ca-x"><h2 class="up-ca-h">${esc(c.h)}</h2><p>${esc(c.w)}</p><dl><div><dt>The concept</dt><dd>${esc(c.c)}</dd></div><div><dt>For the examination</dt><dd>${esc(c.x)}</dd></div><div><dt>Source</dt><dd>${esc(c.src)}</dd></div></dl>
   ${v?`<a class="up-more" href="${upHref("handbooks",v.id)}">Read it in Volume ${esc(v.n)}, Part ${esc(c.part)} →</a>`:""}</div></li>`}).join("")}</ol></div>`}
function upTheme(t){UPS.th=t;document.querySelectorAll(".up-th").forEach(b=>{const on=(b.dataset.t||"")===t;b.classList.toggle("on",on);b.setAttribute("aria-pressed",on)});
 document.querySelectorAll("#up-ca .up-ca-i").forEach(li=>li.hidden=!!t&&li.dataset.t!==t)}

/* ── 5 · The programme ──────────────────────────────────────────────────── */
function upCourse(){const C=UP_COURSE,enq=upWa(C.enquiry);
 return `<section class="up-hero up-ch"><div class="wrap full up-hero-in"><div class="up-hero-copy">
  <div class="up-eb"><span>UPSC CSE Economics</span><span class="up-eb-s">3-Month Intensive Programme</span></div>
  <h1 class="up-h1">Master Economics for UPSC. Build Understanding That Lasts.</h1>
  <p class="up-lede">A focused three-month programme designed to help UPSC aspirants develop conceptual clarity, understand the Indian economy, connect static concepts with current affairs and approach Economics questions with confidence.</p>
  <div class="up-cta">${upExt(enq,"Enquire About Enrolment","up-btn up-pri")}<a class="up-btn up-gh" href="${upTel()}">Speak to Arjun</a></div></div>
  <dl class="up-cfacts">${C.facts.map(([k,v,s])=>`<div><dt>${esc(k)}</dt><dd>${esc(v)}${s?`<span>${esc(s)}</span>`:""}</dd></div>`).join("")}</dl></div></section>
 <section class="up-sec"><div class="wrap full">${upHead("What the programme offers","Ten features","")}
  <ol class="up-feat">${C.features.map(([t,d],i)=>`<li class="rv" style="--i:${i%5}"><span class="up-fn">${String(i+1).padStart(2,"0")}</span><b>${esc(t)}</b><span>${esc(d)}</span></li>`).join("")}</ol></div></section>
 <section class="up-sec up-alt"><div class="wrap full">${upHead("The roadmap","Three months, in three movements","An indicative outline by month, following the eleven volumes and the official syllabus. It is not a week-by-week timetable.")}
  <ol class="up-road">${C.months.map((m,i)=>`<li class="up-rm rv" style="--i:${i}"><div class="up-rm-h"><span>${esc(m.n)}</span><b>${esc(m.t)}</b></div><ul>${m.items.map(([t,v])=>`<li><span>${esc(t)}</span>${v?`<span class="up-rv">${v.split(", ").map(n=>{const x=upVol(n);return x?`<a href="${upHref("handbooks",x.id)}" title="${esA(x.title)}">Vol. ${n}</a>`:""}).join("")}</span>`:""}</li>`).join("")}</ul></li>`).join("")}</ol>
  <p class="up-note">Volume tags show where each topic is treated in the Economics Collection; topics without a tag are taught from the syllabus and current sources.</p></div></section>
 <section class="up-sec"><div class="wrap full up-b25">
  <div>${upHead("Why a batch of 25?","Limited to 25 students per batch","The smaller batch is meant to make the class a conversation.")}
   <ul class="up-ticks">${C.batch.map(([t,d])=>`<li><b>${esc(t)}.</b> ${esc(d)}</li>`).join("")}</ul></div>
  <figure class="up-seats" aria-label="Twenty-five seats"><div class="up-seat-g">${Array.from({length:25},(_,i)=>`<i style="--i:${i}"></i>`).join("")}</div><figcaption>25 seats. No more.</figcaption></figure></div></section>
 <section class="up-sec up-alt" id="enrol"><div class="wrap full up-pricing">
  <div class="up-pc"><div class="up-k">${esc(C.name)} · ${esc(C.kind)}</div><div class="up-pc-p">${esc(C.fee)}</div><p class="up-pc-s">Complete 3-month intensive programme.</p>
   <ul class="up-ticks">${["Online delivery","Prelims + Mains","Static + Current Affairs","Maximum 25 students"].map(x=>`<li>${x}</li>`).join("")}</ul>
   <div class="up-pc-b">${upExt(enq,"Enquire About Enrolment","up-btn up-pri w")}<a class="up-btn up-gh w" href="${upTel()}">Speak to Arjun</a></div>
   <p class="up-xs">The enquiry opens WhatsApp with this message: "${esc(C.enquiry)}" You can also <a href="${esA(upMail("UPSC CSE Economics: 3-Month Intensive Programme enquiry",C.enquiry))}">send it by email</a> or call ${esc(UP_PHONE)}. Nothing is booked or paid on this website.</p></div>
  <div class="up-pc-w">${upHead("Before you enquire","What the programme draws on","")}<ul class="up-ticks"><li>The structure of the eleven-volume <a href="${upHref("handbooks")}">Economics Handbook Collection</a>.</li><li>The official syllabus, line by line, in the <a href="${upHref("syllabus")}">syllabus explorer</a>.</li><li>Dated developments, as in <a href="${upHref("current")}">Current Affairs and Economics</a>.</li><li>Teaching by <a href="${upHref("educator")}">Arjun Agrawal</a>.</li></ul></div></div></section>`}

/* ── 6 · About the Educator ─────────────────────────────────────────────── */
function upEducator(){const pages=UPSC_HB.volumes.reduce((a,v)=>a+v.pages,0);let A=[];try{A=CV_AUTHOR}catch(e){}
 return `<section class="up-mast up-ed"><div class="wrap full up-mast-in up-ed-g"><figure class="up-ed-ph"><img src="assets/brand/arjun-agrawal-portrait-4x5.webp" alt="Arjun Agrawal, in a navy blazer and tie, smiling, in front of a stone wall." width="432" height="540" loading="lazy" decoding="async"></figure>
  <div><div class="up-eb"><span>UPSC CSE Economics</span><span class="up-eb-s">About the Educator</span></div><h1 class="up-h1">Arjun Agrawal</h1>
   <p class="up-role">Economics Educator | IB DP Economics | UPSC CSE Economics</p>
   <p class="up-lede">Arjun teaches Economics to two very different audiences: IB Diploma Programme students and UPSC Civil Services aspirants. The aim is the same for both: to make economic ideas clear, connected and usable.</p></div></div></section>
 <div class="wrap full up-body up-ed-b">
  <section><h2 class="up-h3">Academic grounding and teaching</h2><dl class="up-cvl">${A.map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}<div><dt>Training</dt><dd>Postgraduate training in Economics and Political Science; UGC-NET and MH-SET qualified</dd></div></dl></section>
  <section><h2 class="up-h3">Original resources</h2><ul class="up-ticks"><li>The <a href="${upHref("handbooks")}">Economics Handbook Collection</a> for UPSC CSE: eleven volumes, ${pages} pages, from the foundations of Economics to India's agriculture, industry and labour markets.</li><li>This learning platform for IB DP Economics: course lessons, labs, mindmaps, real-world cases and exam practice.</li><li>Original decks and visual explainers, shown in part in the <a href="#/studio">Learning Studio</a>.</li></ul></section>
  <section><h2 class="up-h3">How he teaches</h2><p class="up-big">Mechanisms before facts. Before a definition is polished, a student should be able to say what happens, what happens next, and what that means for someone specific. Then the idea is drawn, applied to the Indian economy, connected with a current development, and tested the way Prelims and Mains test it.</p>
   <div class="up-ed-cta"><a class="up-btn up-pri" href="${upHref("course")}">The 3-month programme</a><a class="up-btn up-gh" href="${upHref("contact")}">Contact Arjun</a><a class="up-btn up-gh" href="#/about">The IB DP About page</a></div></section></div>`}

/* ── 7 · Contact / Enrolment ────────────────────────────────────────────── */
function upContactMsgs(){const v=upVol(UPS.vol)||UPSC_HB.volumes[0];
 return {handbook:{t:"Buy a handbook",d:"Names the volume and its price of ₹99.",msg:upHbMsg(v),sub:upHbSubject(v)},
  course:{t:"Enrol in the 3-month programme",d:"Asks for the course details and the upcoming batch.",msg:UP_COURSE.enquiry,sub:"UPSC CSE Economics: 3-Month Intensive Programme enquiry"},
  general:{t:"A general question",d:"About UPSC Economics or the resources.",msg:UP_GEN_MSG,sub:"UPSC CSE Economics: a question"}}}
function upContact(){const M=upContactMsgs(),k=UPS.ct,m=M[k];
 return upMast("Contact / Enrolment","Contact and enrolment","Choose what your message is about. WhatsApp or your email app opens with the message already written; nothing is sent from this page, and nothing you choose here is stored.")+
 `<div class="wrap full up-body up-ct"><div><fieldset class="up-ct-k"><legend>What is your message about?</legend>${Object.entries(M).map(([key,x])=>`<label class="up-ct-o"><input type="radio" name="up-ct" value="${key}"${key===k?" checked":""} onchange="UPS.ct=this.value;upCtPaint()"><span><b>${esc(x.t)}</b><span>${esc(x.d)}</span></span></label>`).join("")}</fieldset>
  <div class="up-ct-v" id="up-ct-v"${k==="handbook"?"":" hidden"}><label for="up-ct-vol">Which volume?</label><select id="up-ct-vol" onchange="UPS.vol=this.value;upCtPaint()">${UPSC_HB.volumes.map(v=>`<option value="${v.id}"${v.id===UPS.vol?" selected":""}>Volume ${v.n}: ${esc(v.title)} (${UP_PRICE})</option>`).join("")}</select></div></div>
  <div class="up-ct-send"><div class="up-k">Your message</div><blockquote class="up-ct-m" id="up-ct-m">${esc(m.msg)}</blockquote>
   <a class="up-btn up-pri w" id="up-ct-wa" href="${esA(upWa(m.msg))}" target="_blank" rel="noopener noreferrer">Send on WhatsApp</a>
   <a class="up-btn up-gh w" id="up-ct-mail" href="${esA(upMail(m.sub,m.msg))}">Write the email</a>
   <a class="up-btn up-gh w" href="${upTel()}">Call ${esc(UP_PHONE)}</a>
   <p class="up-xs">Email: <a href="mailto:${esA(TUT.email)}">${esc(TUT.email)}</a> · WhatsApp and phone: ${esc(UP_PHONE)}</p>
   <p class="up-xs">A message is an enquiry: no purchase or enrolment is completed on this website. For IB DP tutorials and other collaboration, use the <a href="#/contact">general contact page</a>.</p></div></div>`}
function upCtPaint(){const M=upContactMsgs(),m=M[UPS.ct];const s=(id,f)=>{const e=document.getElementById(id);if(e)f(e)};
 s("up-ct-m",e=>e.textContent=m.msg);s("up-ct-wa",e=>e.href=upWa(m.msg));s("up-ct-mail",e=>e.href=upMail(m.sub,m.msg));s("up-ct-v",e=>e.hidden=UPS.ct!=="handbook")}

/* ── the section ────────────────────────────────────────────────────────── */
VIEWS.upsc=function(){const f=[upOverview,upSyllabus,upResources,upHandbooks,upCurrent,upCourse,upEducator,upContact][TAB]||upOverview;
 const h=`<div class="up" data-tab="${TAB}">${f()}</div>`;
 window._after=()=>{try{if(TAB===2&&!ARG)upFilter()}catch(e){}};return h};

/* the section's title, its palette on the sub-navigation, and the pathway strip */
(function(){if(typeof document==="undefined")return;
 const prev=render;render=function(){const r=prev.apply(this,arguments);try{upAfterRender()}catch(e){}return r}})();
function upAfterRender(){const on=VIEW==="upsc";document.body.classList.toggle("up-on",on);
 if(on){let t=UP_TABS[TAB]||UP_TABS[0];if(TAB===3&&ARG&&upVol(ARG))t="Volume "+upVol(ARG).n+": "+upVol(ARG).title;if(TAB===2&&ARG&&upTopic(ARG))t=upTopic(ARG).t;
  document.title=t+" · UPSC CSE Economics · Arjun Agrawal"}
 else if(VIEW==="home")document.title="Arjun Agrawal · Economics: IB DP and UPSC CSE";
 upPathState()}
function upPathbar(){if(document.getElementById("pathbar"))return;const top=document.querySelector("header.top");if(!top)return;
 const n=document.createElement("nav");n.id="pathbar";n.className="pathbar";n.setAttribute("aria-label","Pathways");
 n.innerHTML=`<div class="wrap full pb-in"><div class="pb-paths"><a class="pb-a" data-p="ib" href="#" onclick="nav('home');return false"><span class="pb-dot" aria-hidden="true"></span>IB DP Economics</a><a class="pb-a" data-p="upsc" href="#/upsc"><span class="pb-dot" aria-hidden="true"></span>UPSC CSE Economics</a></div>
  <div class="pb-util"><a class="pb-u" data-u="about" href="#/about">About</a><a class="pb-u" data-u="contact" href="#/contact">Contact</a></div></div>`;
 top.parentNode.insertBefore(n,top);upPathState()}
function upPathState(){const n=document.getElementById("pathbar");if(!n)return;const up=typeof VIEW!=="undefined"&&VIEW==="upsc";
 n.classList.toggle("is-up",up);
 n.querySelectorAll(".pb-a").forEach(a=>{const on=(a.dataset.p==="upsc")===up;a.classList.toggle("on",on);if(on)a.setAttribute("aria-current","true");else a.removeAttribute("aria-current")});
 const ab=n.querySelector('[data-u="about"]'),ct=n.querySelector('[data-u="contact"]');
 if(ab)ab.href=up?upHref("educator"):"#/about";if(ct)ct.href=up?upHref("contact"):"#/contact"}
/* the footer names the UPSC pages too, in its Connect column, above "The method" */
function upFooter(){if(document.getElementById("ft-upsc"))return;const k=[...document.querySelectorAll("footer.ft .ftcols .kicker")].find(x=>/The method/.test(x.textContent));if(!k)return;
 const d=document.createElement("div");d.id="ft-upsc";d.innerHTML=`<div class="kicker mt4">UPSC CSE Economics</div>${[["UPSC Overview",0],["Syllabus",1],["Economics Resources",2],["The Indian Economy Collection",3],["Current Affairs",4],["The 3-month programme",5],["Contact / Enrolment",7]].map(([t,i])=>`<button class="lnk" onclick="nav('upsc',${i})">${t}</button>`).join("")}`;
 k.parentNode.insertBefore(d,k)}
(function(){if(typeof document==="undefined")return;const go=()=>{try{upPathbar();upFooter()}catch(e){}};
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",go);else go()})();

/* ── the home page: two pathways before the IB cover ────────────────────── */
function upHomeBand(){const H=UPSC_HB.volumes;
 return `<section class="hp" aria-labelledby="hp-h"><div class="wrap full hp-in">
  <div class="hp-head"><div class="hp-eb">Arjun Agrawal · Economics</div><h1 class="hp-h" id="hp-h">Economics. Understood. Connected. Applied.</h1>
   <p class="hp-l">A comprehensive Economics learning ecosystem connecting IB DP students and UPSC CSE aspirants through conceptual understanding, visual learning, real-world applications and examination-focused preparation.</p></div>
  <div class="hp-paths">
   <article class="hp-p ib"><div class="hp-pk">IB DP Economics</div><h2 class="hp-pt">Think like an economist.</h2><p>Explore the IB Diploma Programme Economics learning ecosystem.</p>
    <ul class="hp-ls">${["Course","Learn","Lab","Real World","Practise","Exam","Mindmaps","Resources"].map(x=>`<li>${x}</li>`).join("")}</ul>
    <div class="hp-fig rs-fig" aria-hidden="true"><svg viewBox="0 0 160 96">${rsSD().svg}</svg></div>
    <div class="hp-b"><button class="hp-btn" onclick="upToIB()">Enter IB DP Economics <span aria-hidden="true">↓</span></button><a class="hp-sl" href="#/course">The course</a></div></article>
   <article class="hp-p up"><div class="hp-pk">UPSC CSE Economics</div><h2 class="hp-pt">Understand the economy. Master the examination.</h2><p>Explore Economics resources, handbooks, syllabus coverage and the intensive UPSC Economics programme.</p>
    <ul class="hp-ls">${[["Syllabus","syllabus"],["Resources","resources"],["Handbooks","handbooks"],["Current Affairs","current"],["Course","course"]].map(([t,k])=>`<li><a href="${upHref(k)}">${t}</a></li>`).join("")}</ul>
    <div class="hp-covers" aria-hidden="true">${H.slice(1,4).map((v,i)=>`<span style="--i:${i};background-image:url('${esA((v.img.coverSm||v.img.cover).src)}')"></span>`).join("")}</div>
    <div class="hp-b"><a class="hp-btn" href="#/upsc">Enter UPSC CSE Economics <span aria-hidden="true">→</span></a><a class="hp-sl" href="${upHref("handbooks")}">Handbooks · ${UP_PRICE}</a></div></article></div></div></section>`}
function upToIB(){const h=document.querySelector("#view section.at-hero")||document.querySelector("#view section.hero");if(h){const y=h.getBoundingClientRect().top+scrollY-((document.querySelector("header.top")||{}).offsetHeight||0);
 window.scrollTo({top:Math.max(0,y),behavior:document.body.classList.contains("rn-anim")?"smooth":"auto"});const f=h.querySelector("h2,h1");if(f){f.setAttribute("tabindex","-1");try{f.focus({preventScroll:true})}catch(e){}}}}
/* the home page is the ecosystem (44-ecosystem.js); upHomeBand stays as the compact pathway pair */

/* ── search: the UPSC pages, volumes, topics and syllabus lines ─────────── */
(function(){if(typeof buildIndex!=="function")return;const prev=buildIndex;
 buildIndex=function(){if(SIDX)return SIDX;const I=prev().slice(),K="UPSC CSE Economics";
  UP_TABS.forEach((t,i)=>I.push({k:K,t:t,d:"UPSC CSE Economics",go:`nav('upsc',${i})`,s:"upsc cse civil services ias economics "+t.toLowerCase()}));
  UPSC_HB.volumes.forEach(v=>I.push({k:K,t:`Volume ${v.n}: ${v.title}`,d:`Economics Handbook · ${v.pages} pages · ${UP_PRICE}`,go:`nav('upsc',3,'${v.id}')`,s:["upsc handbook volume",v.n,v.title,v.sub,v.concepts.join(" "),v.inst.join(" "),v.parts.map(p=>p.t).join(" ")].join(" ").toLowerCase()}));
  UP_TOPICS.forEach(t=>I.push({k:K,t:t.t,d:"UPSC topic preview · "+t.cat,go:`nav('upsc',2,'${t.id}')`,s:["upsc preview",t.cat,t.t,t.intro,t.dist.map(d=>d[0]).join(" ")].join(" ").toLowerCase()}));
  I.push({k:K,t:"One Concept. Two Examination Perspectives.",d:"IB DP and UPSC CSE, concept by concept",go:"nav('upsc',2)",s:"ib upsc connector shared concept two examinations perspectives"});
  return SIDX=I};
 if(typeof RN_KIND_W!=="undefined")RN_KIND_W["UPSC CSE Economics"]=2.3;try{SIDX=null}catch(e){}})();

/* ── self-tests ─────────────────────────────────────────────────────────── */
function UPSCSUITE(){const out=[];const T=(n,f)=>{let ok=false,det="";try{const r=f();ok=r===true||(r&&r.ok);if(r&&r.d)det=r.d}catch(e){det=e.message}out.push({n,ok:!!ok,detail:det})};
 const H=UPSC_HB.volumes;
 T("UPSC · eleven volumes, numbered I to XI, each with a title and a page count",()=>H.length===11&&H.every((v,i)=>v.n===UP_RN[i]&&v.num===i+1&&v.title&&v.pages>0));
 T("UPSC · page counts as extracted from the PDFs (523 in all)",()=>H.map(v=>v.pages).join(",")==="41,43,49,49,49,50,49,55,43,45,50"&&H.reduce((a,v)=>a+v.pages,0)===523);
 T("UPSC · the price is ₹99 per volume everywhere, and no other handbook price appears",()=>{const h=upHandbooks()+H.map(v=>upVolume(v)).join("");
  const t=h.replace(/<[^>]+>/g,"").replace(/\s+/g," ");return UPSC_HB.price===99&&UP_PRICE==="₹99 per soft copy"&&!/₹9\.99|₹999(?!,)|₹\s?99\.\d|bundle price/i.test(h)&&(t.match(/₹99 per soft copy/g)||[]).length>=22});
 T("UPSC · the programme fee is ₹9,999 for the complete three months, never per month or ₹4,999",()=>{const h=upCourse()+upOverview()+upContact();
  return /₹9,999/.test(h)&&!/₹4,999|per month|\/ ?month/i.test(h)&&UP_COURSE.enquiry==="Hello Arjun, I am interested in enrolling in your 3-month UPSC CSE Economics Intensive Programme priced at ₹9,999. Please share the course details and upcoming batch information."});
 T("UPSC · the course states three months, 100% online and a maximum of 25 students",()=>{const h=upCourse();return /3 months/.test(h)&&/100% online/.test(h)&&/Maximum 25 students/.test(h)&&!/\b(2[6-9]|[3-9]\d) students/.test(h)});
 T("UPSC · every handbook enquiry names the volume, its title and ₹99, and asks for the digital copy",()=>H.every(v=>{const m=upHbMsg(v);return m.includes("Volume "+v.n)&&m.includes(v.title)&&m.includes("₹99")&&/digital copy \(PDF\)/.test(m)}));
 T("UPSC · enquiries use only the published contact details",()=>{const h=upContact()+upCourse()+H.map(v=>upVolume(v)).join("");
  const wa=(h.match(/https:\/\/wa\.me\/(\d+)/g)||[]),ml=(h.match(/mailto:([^?"]+)/g)||[]),tl=(h.match(/tel:([+\d]+)/g)||[]);
  return wa.length>0&&wa.every(x=>x==="https://wa.me/917092844945")&&ml.every(x=>x==="mailto:"+TUT.email)&&tl.every(x=>x==="tel:+917092844945")});
 T("UPSC · no handbook PDF is referenced anywhere in the section",()=>{const h=[upOverview(),upHandbooks(),...H.map(v=>upVolume(v)),upResources(),upCourse()].join("");return !/\.pdf\b/i.test(h.replace(/Notif-CSP-2026-Engl-060226Rev\.pdf/g,""))&&!JSON.stringify(UPSC_HB).includes(".pdf")});
 T("UPSC · each volume has its cover and an eight-page preview with thumbnails, all local, none watermarked by the site",()=>H.every(v=>v.img&&v.img.cover&&v.img.coverSm&&(v.img.pages||[]).length===8
   &&v.img.pages.every(p=>/^assets\/upsc\/handbooks\/volume-[ivx]+\/page-\d\d\.webp$/.test(p.src)&&/thumb-\d\d\.webp$/.test(p.t.src)&&p.w>=1000&&p.p>=2&&p.p<=v.pages&&p.cap)
   &&new Set(v.img.pages.map(p=>p.p)).size===8&&/^assets\/upsc\/handbooks\//.test(v.img.cover.src))&&!/Preview Only/.test(JSON.stringify(UPSC_HB))&&typeof watermark==="undefined");
 T("UPSC · the collection is titled and subtitled as briefed, with ₹99 per soft copy and the purchase completed by direct contact",()=>{const h=upHandbooks();
  return /The Indian Economy Collection/.test(h)&&/Eleven carefully structured volumes covering essential dimensions of Indian and international Economics for UPSC CSE preparation\./.test(h)
   &&(h.match(/₹99<\/b> per soft copy/g)||[]).length===H.length&&/completed by direct contact/.test(h)&&!/Purchase PDF/.test(h)});
 T("UPSC · every volume has a category, every category a volume, and the filters narrow the grid",()=>{const C=UPSC_HB.categories||[];const k=new Set(C.map(c=>c.k));
  const o={...UPF};UPF.cat="money";UPF.vol="all";const a=H.filter(upShown).length;UPF.cat="all";UPF.vol="volume-ix";const b=H.filter(upShown).length;Object.assign(UPF,o);
  return H.every(v=>k.has(v.cat))&&C.every(c=>H.some(v=>v.cat===c.k))&&a===2&&b===1});
 T("UPSC · the viewer has previous, next, page numbers, zoom, full screen, thumbnails and the selected-preview notice",()=>{const v=H[4],h=hvMarkup(v,"test");
  return /aria-label="Previous page"/.test(h)&&/aria-label="Next page"/.test(h)&&/class="hv-pos"/.test(h)&&/aria-label="Zoom in"/.test(h)&&/aria-label="Zoom out"/.test(h)&&/aria-label="Full screen"/.test(h)
   &&(h.match(/class="hv-t( on)?"/g)||[]).length===8&&/Selected preview\./.test(h)&&/8 of the 49 pages/.test(h)&&!/cannot be (copied|downloaded|screenshot)|DRM|copy-protected/i.test(h)});
 T("UPSC · the eight tabs route and parse back",()=>UP_TABS.every((t,i)=>{const h=routeFormat("upsc",i);const r=routeParse(h);return r&&r.v==="upsc"&&r.t===i}));
 T("UPSC · every volume and topic has its own address",()=>H.every(v=>{const r=routeParse(upHref("handbooks",v.id));return r&&r.t===3&&r.a===v.id})&&UP_TOPICS.every(t=>{const r=routeParse(upHref("resources",t.id));return r&&r.t===2&&r.a===t.id}));
 T("UPSC · official syllabus lines are kept apart from explanation",()=>{const h=upMainsHtml()+upPreHtml();return UP_MAINS.length===10&&(h.match(/up-lab o/g)||[]).length>=UP_MAINS.length+3&&UP_MAINS.every(m=>m.o&&m.ex&&m.o!==m.ex)});
 T("UPSC · every syllabus theme and line points to real volumes",()=>[...UP_PRE,...UP_MAINS,...UP_GS2].every(t=>t.vols.length&&t.vols.every(([n])=>upVol(n))));
 T("UPSC · every topic preview has a figure, a question with a valid answer and a source volume",()=>UP_TOPICS.every(t=>upFig(t.fig).startsWith("<svg")&&t.mcq.o.length===4&&t.mcq.a>=0&&t.mcq.a<4&&upVol(t.vol)&&UP_CATS.includes(t.cat)));
 T("UPSC · current-affairs entries carry a date, a theme, a source and a volume",()=>UP_CA.every(c=>/^\d{4}-\d{2}-\d{2}$/.test(c.d)&&UP_CA_THEMES.includes(c.th)&&c.src&&upVol(c.vol)));
 T("UPSC · the connector's IB links resolve to existing routes",()=>UP_CONNECT.every(r=>{const h=upIbLinks(r);const hs=[...h.matchAll(/href="([^"]+)"/g)].map(m=>m[1].replace(/&amp;/g,"&"));return hs.every(x=>routeParse(x))})&&UP_CONNECT.filter(r=>upIbLinks(r)).length>=8);
 T("UPSC · the compact pathway pair keeps both pathways and one page heading",()=>{const h=upHomeBand();return /Economics\. Understood\. Connected\. Applied\./.test(h)&&/Think like an economist\./.test(h)&&/Understand the economy\. Master the examination\./.test(h)&&(h.match(/<h1/g)||[]).length===1});
 T("UPSC · the landing hero, its line and its three calls are as briefed",()=>{const h=upOverview(),t=h.replace(/<[^>]+>/g,"");
  return /Understand the Indian Economy\. Prepare with clarity\./.test(t)&&/Structured learning for UPSC Civil Services aspirants, connecting economic foundations, Indian economic policy, contemporary developments and examination preparation\./.test(t)
   &&/Explore the Handbook Library/.test(t)&&/Explore the UPSC Syllabus/.test(t)&&/Discover the Intensive Course/.test(t)&&(h.match(/<h1/g)||[]).length===1});
 T("UPSC · the roadmap has seven stages in order, and every stage opens real pages",()=>UP_ROAD.map(r=>r[0]).join("|")==="Understand the syllabus|Build the foundations|Study the Indian economy|Follow current affairs|Practise for Prelims|Write for Mains|Revise"
  &&UP_ROAD.every(r=>r[3].length&&r[3].every(x=>{const q=routeParse(upRoadHref(x));return q&&(q.v==="upsc"||q.v==="concepts")})));
 T("UPSC · the syllabus explorer keeps Prelims GS I, Mains GS III and the Optional apart, and claims no Optional coverage",()=>{const o=upOptHtml();
  return /Papers VI and VII/.test(o)&&/not a course for the Economics Optional/.test(o)&&/id="ups-opt"/.test(upSyllabus.toString()+upSyllabus())&&routeParse(upHref("syllabus","optional")).a==="optional"});
 T("UPSC · the section is reachable from the drawer",()=>MOBGROUPS.flatMap(([,i])=>i.map(x=>x[0])).includes("upsc"));
 return out}
EXTRA_SUITES.push(UPSCSUITE);
