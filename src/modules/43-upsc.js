/* ═══════════════════════════════════════════════════════════════════════════
   UPSC CSE ECONOMICS · the environment
   One section, eight tabs, in the UPSC register of the platform: forest green,
   warm ivory and antique gold (css-flagship.css), set as an Indian economic
   policy and research publication rather than a coaching brochure. Every tab
   and item has an address (#/upsc, #/upsc/syllabus/m-budget,
   #/upsc/current-affairs/bop-sep-2026, #/upsc/handbook-library/volume-iii …),
   and the addresses of the first UPSC section still open the same pages.
   The shell draws the UPSC navigation bar from UP_TABS; the pages carry no tab
   bar of their own. Enrolment and purchases are enquiries only: a prefilled
   WhatsApp message, email or call (FX_ENQ, FX_CONTACT). Nothing is charged,
   booked or confirmed here.
   ═══════════════════════════════════════════════════════════════════════════ */
const UP_TABS=["UPSC Home","Syllabus","Economics Resources","Handbook Library","Current Affairs","Preparation Strategy","Online Course","Contact / Enrol"];
SECTIONS.push({v:"upsc",n:"UPSC CSE Economics",tabs:UP_TABS});
const UP_T={overview:0,syllabus:1,resources:2,handbooks:3,current:4,strategy:5,course:6,contact:7};
const UP_RN=["I","II","III","IV","V","VI","VII","VIII","IX","X","XI"];
const UP_PRICE="₹99 / Volume";          /* the handbook catalogue's own price line (fallback catalogue only) */
const UP_PHONE="+91 7092844945";        /* the published number; FX_CONTACT.phone() reads it */
const UPS={cat:"",q:"",th:"",vol:""};
function upHref(tab,arg){return routeFormat("upsc",UP_T[tab]||0,arg)}
function upGo(tab,arg){nav("upsc",UP_T[tab]||0,arg)}
function upVol(n){return UPSC_HB.volumes.find(v=>v.n===n||v.id===n)}
function upTopic(id){return UP_TOPICS.find(t=>t.id===id)}
function upCA(id){return UP_CA.find(c=>c.id===id)}
const upPad=i=>String(i).padStart(2,"0");
const upQA=()=>{try{return !!(QARUNNING||LINKAUDITING)}catch(e){return false}};

/* ── addresses: the first section's addresses keep working ───────────────── */
const UP_ALIAS=[
 [/^#\/upsc\/economics-handbooks(?=\/|$)/,"#/upsc/handbook-library"],
 [/^#\/upsc\/upsc-economics-course(?=\/|$)/,"#/upsc/online-course"],
 [/^#\/upsc\/contact-enrolment(?=\/|$)/,"#/upsc/contact-enrol"],
 [/^#\/upsc\/about-the-educator(?:\/.*)?$/,"#/about"]];
function upAlias(h){h=String(h||"");for(const [re,to] of UP_ALIAS)if(re.test(h))return h.replace(re,to);return h}
(function(){const prev=routeParse;routeParse=function(h){return prev(upAlias(h))}})();
/* once an alias has been opened, the address bar shows the page's own address */
function upCanon(){try{if(routeQuiet())return}catch(e){return}
 const h=location.hash||"";if(!UP_ALIAS.some(([re])=>re.test(h)))return;
 const to=routeFormat(VIEW,TAB,ARG);try{history.replaceState(null,"",location.pathname+location.search+to);ROUTER.last=to}catch(e){}}

/* ── small shared pieces ─────────────────────────────────────────────────── */
function upExt(href,label,cls,aria){return `<a class="${cls}" href="${esA(href)}" target="_blank" rel="noopener noreferrer"${aria?` aria-label="${esA(aria)}"`:""}>${label}</a>`}
function upMast(o){return `<section class="up-mast${o.cls?" "+o.cls:""}" aria-labelledby="up-h1"><div class="wrap full up-mast-in${o.facts?" up-mast-g":""}"><div class="up-mast-x">
 <p class="up-run"><span class="up-run-n" aria-hidden="true">${o.n}</span><span>UPSC CSE Economics</span>${o.s?`<span>${esc(o.s)}</span>`:""}</p>
 <h1 class="up-h1" id="up-h1">${o.h}</h1>${o.lede?`<p class="up-lede">${o.lede}</p>`:""}${o.extra||""}</div>${o.facts?`<dl class="up-mast-f">${o.facts.map(([v,k])=>`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>`:""}</div></section>`}
function upSH(n,k,t,d,id,cls){return `<header class="up-sh${cls?" "+cls:""}"><span class="up-sh-n" aria-hidden="true">${n}</span><div class="up-sh-x"><p class="up-k">${esc(k)}</p><h2 class="up-h2"${id?` id="${id}"`:""}>${t}</h2>${d?`<p class="up-dek">${d}</p>`:""}</div></header>`}
function upParts(p){p=String(p);return (/,| to /.test(p)?"Parts ":"Part ")+p}
function upPartTitle(v,l){const p=v&&v.parts.find(x=>x.l===l);return p?p.t:""}
/* volume links from [volume, "part letters"] pairs */
function upVolLinks(vols){return vols.map(([n,p])=>{const v=upVol(n);return v?`<a class="up-vl" href="${upHref("handbooks",v.id)}"><b>Vol. ${n}</b><span class="sr-only">, ${esc(v.title)},</span> <span>${esc(upParts(p))}</span></a>`:""}).join("")}
/* one handbook reference: [volume, n] is row n of the volume's own syllabus map; [volume, "letters"] names parts */
function upHbRow(ref){const [n,r]=ref,v=upVol(n);if(!v)return null;
 if(typeof r==="number"){const m=v.map[r];return m?{v,parts:m[1],area:m[0],mains:m[2],map:1}:null}
 const ls=String(r).split(/,\s*/);return {v,parts:r,area:ls.map(l=>upPartTitle(v,l)).filter(Boolean).join("; "),mains:"",map:0}}
function upHbList(refs){const rows=(refs||[]).map(upHbRow).filter(Boolean);
 return `<ul class="up-hbl">${rows.map(x=>`<li><a class="up-hbl-v" href="${upHref("handbooks",x.v.id)}"><span class="up-hbl-n">Vol. ${x.v.n}</span><span class="sr-only">, ${esc(x.v.title)},</span> <span class="up-hbl-p">${esc(upParts(x.parts))}</span></a>
  <span class="up-hbl-a">${esc(x.area)}</span>${x.mains?`<span class="up-hbl-m">Mains sections in the volume's map: ${esc(x.mains)}</span>`:""}</li>`).join("")}</ul>`}
function upDots(vols){const on=new Set(vols.map(x=>x[0]));const names=[...on].map(n=>"Volume "+n).join(", ");
 return `<span class="up-dots" role="img" aria-label="Treated in ${esA(names)}">${UP_RN.map(n=>`<i class="${on.has(n)?"on":""}"></i>`).join("")}</span>`}
function upDate(c){try{const d=new Date(c.d+"T12:00:00Z");return d.toLocaleDateString("en-GB",c.month?{month:"long",year:"numeric"}:{day:"numeric",month:"long",year:"numeric"})}catch(e){return c.d}}
function upCover(v,cls,eager){const i=v.img&&v.img.cover;if(!i)return `<span class="up-cv-ph">Vol. ${v.n}</span>`;
 return `<img class="${cls||"up-cv"}" src="${esA(i.src)}" alt="Cover of Volume ${esA(v.n)}: ${esA(v.title)}" width="${i.w}" height="${i.h}"${eager?"":' loading="lazy"'} decoding="async">`}
/* enquiry actions for one standing enquiry (FX_ENQ): WhatsApp, email and a call */
function upEnqActs(key,o){o=o||{};const e=FX_ENQ[key],L=fxEnquiryLinks(key,o.extra);
 return `<div class="up-acts${o.cls?" "+o.cls:""}" data-enq="${esA(key)}">${upExt(L.wa,`${o.waLabel||"WhatsApp"}<span class="sr-only">: ${esc(e.label)} (opens in a new tab)</span>`,`up-btn ${o.pri||"pri"}`)}
  <a class="up-btn ${o.sec||"line"}" href="${esA(L.mail)}">Email<span class="sr-only">: ${esc(e.label)}</span></a>
  <a class="up-btn ${o.sec||"line"}" href="${esA(L.tel)}">Call ${esc(FX_CONTACT.phone())}</a></div>`}
function upCaFor(themes,n){return [...UP_CA].filter(c=>(themes||[]).includes(c.th)).sort((a,b)=>b.d.localeCompare(a.d)).slice(0,n||2)}
function upCaMini(c){return `<li><a class="up-cm-a" href="${upHref("current",c.id)}"><time datetime="${c.d}">${esc(upDate(c))}</time><span>${esc(c.h)}</span></a></li>`}
function upResLinks(ids){const L=(ids||[]).map(upTopic).filter(Boolean);return L.length?`<p class="up-res">Free previews: ${L.map(x=>`<a href="${upHref("resources",x.id)}">${esc(x.t)}</a>`).join('<span aria-hidden="true"> · </span>')}</p>`:""}

/* ── original line icons (32 × 32, drawn for this environment) ──────────── */
const UP_IC={
 concept:'<circle cx="13" cy="13" r="8.5"/><path d="M19.2 19.2 27 27"/><path d="M8.6 10.2l8.8 5.6M8.6 15.8l8.8-5.6" class="g"/>',
 found:'<rect x="11" y="6.5" width="10" height="5" rx="1"/><rect x="7.5" y="14" width="17" height="5" rx="1"/><rect x="4" y="21.5" width="24" height="5" rx="1"/>',
 india:'<circle cx="16" cy="16" r="12"/><path d="M11 10h10M11 14h10M14 10c3.2 0 4.6 1.7 4.6 4s-1.6 4-4.6 4h-3l7.6 7" class="g"/>',
 policy:'<path d="M5 12.5 16 5.5l11 7z"/><path d="M8 14.5v8M13 14.5v8M19 14.5v8M24 14.5v8"/><path d="M6 24.5h20M4.5 27.5h23"/>',
 current:'<path d="M6 7.5h16v17.5a2 2 0 0 0 2 2H8a2 2 0 0 1-2-2z"/><path d="M22 11.5h4V25a2 2 0 0 1-4 0"/><rect x="9.5" y="11" width="9" height="5" rx=".5" class="g"/><path d="M9.5 19.5h9M9.5 23h6"/>',
 prelims:'<rect x="5" y="6" width="5" height="5" rx="1"/><rect x="5" y="13.5" width="5" height="5" rx="1"/><rect x="5" y="21" width="5" height="5" rx="1"/><path d="M13.5 8.5h13M13.5 16h13M13.5 23.5h9"/><path d="M5.8 16l1.6 1.6 3.4-3.8" class="g"/>',
 mains:'<path d="M21.5 5.5l5 5L13 24l-6.5 1.5L8 19z"/><path d="M19 8l5 5" class="g"/><path d="M5 28.5h22"/>',
 revise:'<path d="M26 16a10 10 0 1 1-3-7.1"/><path d="M23.8 4.6v4.8H19"/><path d="M11.5 16.3l3 3 6-6.6" class="g"/>',
 visual:'<path d="M6 5.5v21h21"/><path d="M9.5 22c5-1 8-10 15.5-12.5" class="g"/><path d="M9.5 11.5c5 2 9 7 15.5 10.5"/>',
 notes:'<rect x="7.5" y="4.5" width="17" height="23" rx="1.5"/><path d="M11.5 10h9M11.5 14h9M11.5 18h9M11.5 22h5" class="g"/>',
 answer:'<rect x="5" y="5" width="22" height="22" rx="2"/><path d="M9 10.5h8"/><path d="M9 15h14M9 19h14" class="g"/><path d="M9 23.5h10"/>',
 book:'<path d="M5 8c3.5-1.6 7.5-1.6 11 0v18c-3.5-1.6-7.5-1.6-11 0z"/><path d="M16 8c3.5-1.6 7.5-1.6 11 0v18c-3.5-1.6-7.5-1.6-11 0z" class="g"/>',
 screen:'<rect x="4.5" y="6" width="23" height="15" rx="1.5"/><path d="M12 26.5h8M16 21v5.5"/><path d="M9 16.5l4-4 3 2.5 6-5.5" class="g"/>',
 talk:'<path d="M5 7.5h14v9.5H11l-4 3.5V17H5z"/><path d="M19 12h8v9h-2v3l-3.5-3H14v-4" class="g"/>',
 data:'<path d="M6 26.5h21"/><path d="M9 26V17M14.5 26V11M20 26V14.5M25.5 26V8" class="g"/>'};
function upIc(k,cls){return `<svg class="up-ic${cls?" "+cls:""}" viewBox="0 0 32 32" aria-hidden="true" focusable="false">${UP_IC[k]||""}</svg>`}

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
 deficit(){const W=430,M=1695768,X=120,sc=v=>v/M*W,bar=(y,parts,lab)=>{let x=X;return `<text class="uf-tb" x="${X-10}" y="${y+19}" text-anchor="end">${lab}</text>`+parts.map(([v,c,t],i,all)=>{const w=sc(v),last=i===all.length-1;
   /* a label sits inside its segment only if it fits; otherwise beside the last segment, or above the bar */
   const lab=t.length*6.6+12<w?`<text class="uf-ti" x="${(x+w/2).toFixed(1)}" y="${y+19}" text-anchor="middle">${t}</text>`
    :last&&x+w+6+t.length*6.2<575?`<text class="uf-ts" x="${(x+w+6).toFixed(1)}" y="${y+19}">${t}</text>`
    :`<text class="uf-ts" x="${(i===0?x:x+w).toFixed(1)}" y="${y-7}" text-anchor="${i===0?"start":"end"}">${t}</text>`;
   const r=`<rect class="uf-fill ${c}" x="${x.toFixed(1)}" y="${y}" width="${w.toFixed(1)}" height="28"/>`+lab;x+=w;return r}).join("")};
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

/* ── 0 · UPSC Home ───────────────────────────────────────────────────────── */
function upHome(){const H=UPSC_HB.volumes,pages=H.reduce((a,v)=>a+v.pages,0),C=UP_COURSE;
 const latest=[...UP_CA].sort((a,b)=>b.d.localeCompare(a.d)).slice(0,3);
 return `<section class="up-hero" aria-labelledby="up-h1"><div class="wrap full up-hero-in">
  <div class="up-hero-copy">
   <p class="up-run"><span>Arjun Agrawal</span><span>UPSC CSE Economics</span></p>
   <h1 class="up-h1 up-caps" id="up-h1">Understand the Indian economy. <span class="up-h1-2">Master the economic dimension of UPSC.</span></h1>
   <p class="up-lede">A structured Economics learning ecosystem for Civil Services aspirants, built around conceptual foundations, Indian economic developments, examination-oriented application and current affairs.</p>
   <div class="up-cta"><a class="up-btn gold" href="${upHref("resources")}">Explore UPSC resources <span class="arr" aria-hidden="true">→</span></a><a class="up-btn ghost" href="${upHref("course")}">Explore the 3-month course</a></div>
   <dl class="up-hero-facts"><div><dt>Prelims</dt><dd>GS Paper I</dd></div><div><dt>Mains</dt><dd>GS Paper III</dd></div><div><dt>Handbooks</dt><dd>${H.length} volumes, ${pages} pages</dd></div><div><dt>Free previews</dt><dd>${UP_TOPICS.length} topics</dd></div></dl>
  </div>
  <figure class="up-exhibit"><div class="up-ex-k" aria-hidden="true"><span>Exhibit</span><span>From Volumes II and III</span></div>
   <div class="up-ex-plate">${upFig("inflation")}</div>
   <figcaption>How inflation, purchasing power, interest rates and monetary policy connect. CPI inflation of 5.54% in September 2026; the repo rate raised to 5.50% on 7 October 2026. <a href="${upHref("resources","inflation")}">Read the topic</a></figcaption></figure>
 </div></section>

 <section class="up-sec" aria-labelledby="up-why-h"><div class="wrap full">
  ${upSH("01","Why Economics matters","Why Economics matters for UPSC","Economics runs through both stages of the Civil Services Examination. It is named in the Prelims syllabus, it fills ten lines of Mains General Studies Paper III, and it is the language in which the Government explains its policies.","up-why-h")}
  <div class="up-why">
   <div class="up-papers">
    <article class="up-paper"><p class="up-paper-k">Preliminary Examination</p><h3 class="up-h3">General Studies Paper I</h3>
     <p>One line of the official syllabus names economic and social development, and the line on current events brings the economy in again.</p>
     <blockquote class="up-oq"><span class="up-lab o">Official</span> <q>${esc(UP_PRE_OFFICIAL[1])}</q></blockquote>
     <a class="up-more" href="${upHref("syllabus","prelims")}">The Prelims lines, explained <span aria-hidden="true">→</span></a></article>
    <article class="up-paper"><p class="up-paper-k">Main Examination</p><h3 class="up-h3">General Studies Paper III</h3>
     <p>Ten lines on the Indian economy: planning and the mobilisation of resources, growth, development and employment, inclusive growth, Government budgeting, agriculture, food processing, land reforms, liberalisation and industrial policy, infrastructure and investment models.</p>
     <a class="up-more" href="${upHref("syllabus","mains")}">The ten Mains lines, explained <span aria-hidden="true">→</span></a></article>
   </div>
   <div class="up-areas-w"><h3 class="up-h3s">Where Economics runs through the examination</h3>
    <ol class="up-areas">${UP_WHY.map(([k,t,d],i)=>`<li><span class="up-areas-n" aria-hidden="true">${upPad(i+1)}</span><b>${esc(t)}</b><span>${esc(d)}</span></li>`).join("")}</ol></div>
  </div>
  <div class="up-lenses"><h3 class="up-h3s">How economic understanding helps an aspirant</h3>
   <ul>${UP_LENSES.map(([t,d],i)=>`<li>${upIc(["policy","data","notes","current"][i])}<b>${esc(t)}</b><span>${esc(d)}</span></li>`).join("")}</ul></div>
 </div></section>

 <section class="up-sec up-band" aria-labelledby="up-flow-h"><div class="wrap full">
  ${upSH("02","The preparation system","How the preparation system works","Eight steps take a topic from its concept to an answer you can write and revise. Each step names the part of this platform that serves it.","up-flow-h")}
  <ol class="up-flow8 rv">${UP_STEPS.map(([ic,t,d,[tab,lab]],i)=>`<li style="--i:${i}"><span class="up-f8-node">${upIc(ic)}</span><span class="up-f8-n" aria-hidden="true">${upPad(i+1)}</span>
   <b class="up-f8-t">${esc(t)}</b><span class="up-f8-d">${esc(d)}</span><a class="up-f8-a" href="${upHref(tab)}">${esc(lab)}<span class="sr-only">, for step ${i+1}</span></a></li>`).join("")}</ol>
 </div></section>

 <section class="up-sec" aria-labelledby="up-exp-h"><div class="wrap full">
  ${upSH("03","Explore","The environment, at a glance","The syllabus, the handbooks, the current-affairs register and the programme, each one step away.","up-exp-h")}
  <div class="up-prev-g">
   <article class="up-prev"><p class="up-k">Syllabus</p><h3 class="up-h3">The official syllabus, line by line</h3>
    <p>Each Economics line of Prelims Paper I and Mains Paper III, quoted exactly and kept apart from four layers of help: the explanation, the handbook coverage, and the classes and current affairs that support it.</p>
    <ol class="up-prev-lines">${UP_PRE_LINES.map((m,i)=>`<li><a class="up-pl-a" href="${upHref("syllabus",m.id)}"><span class="up-prev-n">GS I · ${upPad(i+1)}</span><span>${esc(m.short)}</span></a></li>`).join("")}${UP_MAINS.slice(0,5).map((m,i)=>`<li><a class="up-pl-a" href="${upHref("syllabus",m.id)}"><span class="up-prev-n">GS III · ${upPad(i+1)}</span><span>${esc(m.short)}</span></a></li>`).join("")}</ol>
    <p class="up-sm">And five more Mains lines, with two lines of Paper II.</p>
    <a class="up-more" href="${upHref("syllabus")}">Read the syllabus <span aria-hidden="true">→</span></a></article>
   <article class="up-prev"><p class="up-k">Current Affairs</p><h3 class="up-h3">The latest entries</h3>
    <ol class="up-prev-ca">${latest.map(c=>`<li><a class="up-pc-a" href="${upHref("current",c.id)}"><span class="up-prev-m"><time datetime="${c.d}">${esc(upDate(c))}</time><span>${esc(c.th)}</span></span><b>${esc(c.h)}</b></a><span class="up-prev-c">${esc(c.c)}</span></li>`).join("")}</ol>
    <p class="up-sm">Edited by hand. Last compiled on ${esc(UP_CA_COMPILED)}.</p>
    <a class="up-more" href="${upHref("current")}">All current affairs <span aria-hidden="true">→</span></a></article>
  </div>
  <article class="up-prev up-shelf-w" aria-labelledby="up-shelf-h"><div class="up-shelf-head"><div><p class="up-k">Handbook Library</p><h3 class="up-h3" id="up-shelf-h">Eleven volumes, one subject</h3>
    <p>From Introduction to Economics to Indian Industry, Manufacturing, Trade and Labour Markets: ${pages} pages written for Prelims and Mains, each volume with its own syllabus map and revision compendium.</p></div>
    <a class="up-more" href="${upHref("handbooks")}">Browse the Handbook Library <span aria-hidden="true">→</span></a></div>
   <ul class="up-shelf">${H.map(v=>`<li><a class="up-sh-a" href="${upHref("handbooks",v.id)}">${upCover(v,"up-shelf-cv")}<span class="up-shelf-n">${esc(v.n)}</span></a></li>`).join("")}</ul></article>
 </div></section>

 <section class="up-sec up-cband" aria-labelledby="up-cb-h"><div class="wrap full up-cband-in">
  <div class="up-cband-x"><p class="up-k">Online Course</p><h2 class="up-h2" id="up-cb-h">The 3-month intensive online programme</h2>
   <p class="up-cband-l">${esc(C.description)}</p>
   <div class="up-cta"><a class="up-btn gold" href="${upHref("course")}">Explore the 3-month course <span class="arr" aria-hidden="true">→</span></a></div></div>
  <ul class="up-hl">${C.highlights.map(([v,k])=>`<li><span class="up-hl-k">${esc(k)}</span><b>${esc(v)}</b></li>`).join("")}</ul>
 </div></section>
 <p class="wrap full up-aboutline">Taught by Arjun Agrawal. <a href="#/about">About the educator <span aria-hidden="true">→</span></a></p>`}

/* ── 1 · Syllabus ────────────────────────────────────────────────────────── */
function upLayer(k,title,lab,body){return `<div class="up-layer up-layer-${k}"><h4 class="up-layer-h"><span class="up-layer-l" aria-hidden="true">${k.toUpperCase()}</span><span>${title}</span>${lab}</h4>${body}</div>`}
const UP_LAB_IN={e:'<span class="up-lab e">The platform\'s explanation</span>',c:"",d:""};   /* inside a line, only B carries a badge: C and D are named by their titles */
const UP_LAB={o:'<span class="up-lab o">Official · UPSC</span>',e:'<span class="up-lab e">The platform\'s explanation</span>',c:'<span class="up-lab c">Handbooks</span>',d:'<span class="up-lab d">Classes and current affairs</span>'};
function upLineHead(n,L,vols){return `<summary><span class="up-line-n" aria-hidden="true">${n}</span><h3 class="up-line-h"><span class="up-line-a">A</span><span class="up-lab o">Official</span> <q>${esc(L.o)}</q>${L.tbc?` <span class="up-tbc">Wording to be confirmed</span>`:""}</h3>${vols&&vols.length?upDots(vols):""}</summary>`}
function upClassLayer(L,extra){const ca=upCaFor(L.cath,2);
 return upLayer("d","Classes and current affairs",UP_LAB_IN.d,`${extra||""}${ca.length?`<p class="up-mini-k">Current affairs to follow</p><ul class="up-camini">${ca.map(upCaMini).join("")}</ul>`:""}${upResLinks(L.res)}`)}
function upTbcNote(L){return L.tbc?`<p class="up-tbc-n">${esc(UP_SYL_TBC)}</p>`:""}
function upPreLine(L,i){const vols=(L.hb||UP_PRE_SUB.flatMap(s=>s.hb)).map(([n])=>[n,""]);
 const B=L.id==="p-esd"?`<p>${esc(L.ex)}</p><ul class="up-subs">${UP_PRE_SUB.map(s=>`<li><b>${esc(s.t)}</b><span>${esc(s.d)}</span></li>`).join("")}</ul>`:`<p>${esc(L.ex)}</p>`;
 const C=L.id==="p-esd"?UP_PRE_SUB.map(s=>`<div class="up-subcov"><p class="up-mini-k">${esc(s.t)}</p>${upHbList(s.hb)}${s.gap?`<p class="up-gap">${esc(s.gap)}</p>`:""}</div>`).join("")
  :`${upHbList(L.hb)}${L.hbNote?`<p class="up-gap">${esc(L.hbNote)}</p>`:""}`;
 return `<details class="up-line" id="syl-${L.id}">${upLineHead(upPad(i+1),L,vols)}<div class="up-line-b">${upTbcNote(L)}
  ${upLayer("b","Expanded explanation",UP_LAB_IN.e,B)}${upLayer("c","How the handbooks address it",UP_LAB_IN.c,C)}
  ${upClassLayer(L,`<p>${esc(L.cls)}</p>${L.id==="p-esd"?`<p class="up-sm">The fourteen study themes below organise this line for revision.</p>`:""}`)}</div></details>`}
function upMainsLine(L,i){return `<details class="up-line" id="syl-${L.id}">${upLineHead(upPad(i+1),L,L.vols)}<div class="up-line-b">${upTbcNote(L)}
  ${upLayer("b","Expanded explanation",UP_LAB.e,`<p>${esc(L.ex)}</p><div class="up-g2"><div><p class="up-mini-k">Important dimensions</p><ul class="up-list">${L.dim.map(s=>`<li>${esc(s)}</li>`).join("")}</ul></div><div><p class="up-mini-k">Economic concepts</p><ul class="up-chips">${L.con.map(s=>`<li>${esc(s)}</li>`).join("")}</ul></div></div>`)}
  ${upLayer("c","How the handbooks address it",UP_LAB_IN.c,`${upHbList(L.hb)}${L.note?`<p class="up-gap">${esc(L.note)}</p>`:""}`)}
  ${upClassLayer(L,`<p>Classes take this line through its concepts and diagrams, Indian examples and current developments, with practice for Prelims and Mains.</p><div class="up-g2"><div><p class="up-mini-k">An example for discussion</p><p>${esc(L.eg)}</p></div><div><p class="up-mini-k">Approaching it in a Mains answer</p><p>${esc(L.ans)}</p></div></div>`)}
 </div></details>`}
function upGs2Line(L,i){const vols=L.hb.map(([n])=>[n,""]);
 return `<details class="up-line" id="syl-${L.id}">${upLineHead(upPad(i+1),L,vols)}<div class="up-line-b">${upTbcNote(L)}
  ${upLayer("b","Expanded explanation",UP_LAB_IN.e,`<p>${esc(L.ex)}</p>`)}${upLayer("c","How the handbooks address it",UP_LAB_IN.c,upHbList(L.hb))}
  ${upClassLayer(L,`<p>${esc(L.cls)}</p>`)}</div></details>`}
function upTheme14(t){return `<details class="up-line up-th14" id="syl-${t.id}"><summary><span class="up-th14-t">${esc(t.t)}</span>${upDots(t.vols)}</summary><div class="up-line-b">
  ${upLayer("b","What the theme means",UP_LAB.e,`<div class="up-g2"><div><p>${esc(t.m)}</p></div><div><p>${esc(t.u)}</p></div></div><p class="up-mini-k">Important subtopics</p><ul class="up-chips">${t.sub.map(s=>`<li>${esc(s)}</li>`).join("")}</ul><p class="up-mini-k">For Prelims</p><p>${esc(t.pre)}</p>`)}
  ${upLayer("c","Where the handbooks treat it",UP_LAB_IN.c,`<div class="up-vls">${upVolLinks(t.vols)}</div>`)}
  ${upLayer("d","Classes and current affairs",UP_LAB_IN.d,`${t.ca&&upCA(t.ca)?`<ul class="up-camini">${upCaMini(upCA(t.ca))}</ul>`:""}${upResLinks(t.res)}`)}</div></details>`}
function upSylIndex(){const li=(id,n,t,lab)=>`<li><a class="up-idx-a" href="${upHref("syllabus",id)}" onclick="return upSylJump(event,'${id}')"><span class="sr-only">${esc(lab)} </span><span class="n">${n}</span><span class="t"> ${esc(t)}</span></a></li>`;
 return `<nav class="up-idx" aria-label="Syllabus lines"><p class="up-idx-k">On this page</p>
  <p class="up-idx-p"><a href="${upHref("syllabus","prelims")}" onclick="return upSylJump(event,'prelims')">Prelims · GS Paper I</a></p><ol>${UP_PRE_LINES.map((L,i)=>li(L.id,upPad(i+1),L.short,"Prelims line "+(i+1))).join("")}${li("themes","14","Study themes","Prelims")}</ol>
  <p class="up-idx-p"><a href="${upHref("syllabus","mains")}" onclick="return upSylJump(event,'mains')">Mains · GS Paper III</a></p><ol>${UP_MAINS.map((L,i)=>li(L.id,upPad(i+1),L.short,"Mains line "+(i+1))).join("")}</ol>
  <p class="up-idx-p"><a href="${upHref("syllabus","gs2")}" onclick="return upSylJump(event,'gs2')">Also in GS Paper II</a></p><ol>${UP_GS2.map((L,i)=>li(L.id,upPad(i+1),L.short,"GS Paper II line "+(i+1))).join("")}</ol></nav>`}
function upSyllabus(){const S=UP_SYL_SRC;
 return upMast({n:"02",s:"Syllabus",h:"The Economics syllabus, line by line",facts:[[UP_PRE_LINES.length+" lines","Prelims · GS Paper I"],[UP_MAINS.length+" lines","Mains · GS Paper III"],[UP_GS2.length+" lines","Also in GS Paper II"],["4 layers","For every line"]],lede:"The official UPSC syllabus is the authority. Each Economics line of Prelims General Studies Paper I and Mains General Studies Paper III is quoted exactly, then explained, mapped to the handbooks and connected with classes and current affairs."})+
 `<div class="wrap full up-body up-syl">
  <div class="up-syl-top">
   <aside class="up-src" aria-label="Official source"><p class="up-k">Official source</p>
    <p><a href="${esA(S.url)}" target="_blank" rel="noopener noreferrer">${esc(S.doc)}<span class="sr-only"> (PDF on upsc.gov.in, opens in a new tab)</span></a>, dated ${esc(S.date)}. ${esc(S.where)}.</p>
    <p class="up-src-n">Only text marked Official is UPSC wording. Lines flagged <span class="up-tbc">Wording to be confirmed</span> match the long-standing official text but could not be checked against the notice PDF from here.</p></aside>
   <p class="up-scope"><b>Scope.</b> The course and the handbooks address Economics within the General Studies syllabus: Prelims Paper I and Mains Paper III, with two lines of Paper II. They are not presented as preparation for the Economics Optional paper.</p>
  </div>
  <ul class="up-legend" aria-label="The four layers of every line"><li><span class="up-layer-l" aria-hidden="true">A</span>${UP_LAB.o}<span>The syllabus line, quoted exactly</span></li><li><span class="up-layer-l" aria-hidden="true">B</span>${UP_LAB.e}<span>What the line means, topic by topic</span></li><li><span class="up-layer-l" aria-hidden="true">C</span>${UP_LAB.c}<span>Volume and part, from each volume's own syllabus map</span></li><li><span class="up-layer-l" aria-hidden="true">D</span>${UP_LAB.d}<span>How teaching and dated developments support it</span></li></ul>
  <div class="up-syl-tools"><button type="button" class="up-btn line sm" onclick="upAccAll(true)">Expand all</button><button type="button" class="up-btn line sm" onclick="upAccAll(false)">Collapse all</button><button type="button" class="up-btn pri sm" onclick="upPrintSyllabus()">Print the syllabus</button>
   <span class="up-dots-key"><span class="up-dots k" aria-hidden="true">${UP_RN.map(n=>`<i class="${n==="III"?"on":""}"></i>`).join("")}</span> Each row of dots shows Volumes I to XI; a filled dot marks a volume that treats the line.</span></div>
  <div class="up-syl-g">${upSylIndex()}<div class="up-syl-main">
   <section class="up-paper-s" id="syl-prelims" aria-labelledby="syl-prelims-h"><header class="up-paper-hd"><p class="up-k">Preliminary Examination</p><h2 class="up-h2" id="syl-prelims-h" tabindex="-1">Prelims: General Studies Paper I</h2>
    <p class="up-dek">Two lines of Paper I call on Economics. The second is the Economics line itself; its five named themes are explained below, followed by fourteen study themes.</p></header>
    ${UP_PRE_LINES.map(upPreLine).join("")}
    <div class="up-themes" id="syl-themes"><h3 class="up-h3s" tabindex="-1">Fourteen study themes for Prelims <span class="up-lab e">The platform's explanation</span></h3>
     <p class="up-sm">How the Economics behind the two Prelims lines is organised for study. These themes are the platform's, not UPSC's.</p>${UP_PRE.map(upTheme14).join("")}</div></section>
   <section class="up-paper-s" id="syl-mains" aria-labelledby="syl-mains-h"><header class="up-paper-hd"><p class="up-k">Main Examination</p><h2 class="up-h2" id="syl-mains-h" tabindex="-1">Mains: General Studies Paper III</h2>
    <p class="up-dek">The paper's official title: <q>${esc(UP_MAINS_HEAD)}</q>. Its ten Economy lines follow, each quoted exactly.</p></header>
    ${UP_MAINS.map(upMainsLine).join("")}</section>
   <section class="up-paper-s up-gs2" id="syl-gs2" aria-labelledby="syl-gs2-h"><header class="up-paper-hd"><p class="up-k">Main Examination</p><h2 class="up-h2" id="syl-gs2-h" tabindex="-1">Also in General Studies Paper II</h2>
    <p class="up-dek">Two lines of Paper II that call on Economics.</p></header>${UP_GS2.map(upGs2Line).join("")}</section>
  </div></div></div>`}
function upAccAll(open){document.querySelectorAll(".up-syl details.up-line").forEach(d=>d.open=open)}
/* in-page navigation: open the line, scroll it into view and move focus to it */
function upSylShow(id,focus){const el=document.getElementById("syl-"+id);if(!el)return false;
 if(el.tagName==="DETAILS")el.open=true;
 const reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
 try{el.scrollIntoView({behavior:reduce?"auto":"smooth",block:"start"})}catch(e){el.scrollIntoView()}
 if(focus){const f=el.tagName==="DETAILS"?el.querySelector("summary"):el.querySelector("h2,h3");if(f)try{f.focus({preventScroll:true})}catch(e){}}
 return true}
function upSylJump(e,id){if(e&&(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||e.button>0))return true;
 if(e)e.preventDefault();upSylShow(id,true);return false}
/* the printable syllabus: prepared on a user action and printed through the platform's one print path */
function upSylPrintHtml(){const S=UP_SYL_SRC;
 const hb=refs=>(refs||[]).map(upHbRow).filter(Boolean).map(x=>`Vol. ${x.v.n}, ${upParts(x.parts)}: ${esc(x.area)}`).join("; ");
 const line=(n,L,b,c,d)=>`<div class="up-pl"><p class="up-pl-o"><span class="up-pl-n">${n}</span> <span class="up-pl-lab">Official</span> “${esc(L.o)}”${L.tbc?" <em>(wording to be confirmed against the notice)</em>":""}</p>
  <p><span class="up-pl-lab">Explained</span> ${b}</p><p><span class="up-pl-lab">Handbooks</span> ${c||"None of the eleven volumes."}</p>${d?`<p><span class="up-pl-lab">Classes and current affairs</span> ${d}</p>`:""}</div>`;
 const ca=L=>upCaFor(L.cath,2).map(c=>`${esc(upDate(c))}: ${esc(c.h)}`).join("; ");
 return `<div class="pdoc up-pdoc"><div class="ph"><div><div class="brand">Arjun Agrawal · UPSC CSE Economics</div><div class="sub">The Economics syllabus, line by line</div></div><div class="sub">Compiled for printing from the platform</div></div>
  <h1>UPSC CSE Economics: the syllabus, line by line</h1>
  <p class="up-p-src">Official wording quoted from ${esc(S.doc)}, dated ${esc(S.date)} (${esc(S.where)}): ${esc(S.url)}. Only text marked Official is UPSC wording.</p>
  <p class="up-p-src"><b>Scope.</b> The course and the handbooks address Economics within the General Studies syllabus. They are not presented as preparation for the Economics Optional paper.</p>
  <h2>Prelims: General Studies Paper I</h2>
  ${UP_PRE_LINES.map((L,i)=>line(upPad(i+1),L,esc(L.ex)+(L.id==="p-esd"?" "+UP_PRE_SUB.map(s=>`${esc(s.t)}: ${esc(s.d)}`).join(" "):""),L.id==="p-esd"?UP_PRE_SUB.map(s=>`${esc(s.t)}: ${hb(s.hb)}${s.gap?" ("+esc(s.gap)+")":""}`).join(" "):hb(L.hb),esc(L.cls)+(ca(L)?" Current affairs: "+ca(L)+".":""))).join("")}
  <h3>Fourteen study themes (the platform's organisation, not UPSC's)</h3>
  <table class="ptbl"><thead><tr><th>Theme</th><th>What it means</th><th>Handbooks</th></tr></thead><tbody>${UP_PRE.map(t=>`<tr><td>${esc(t.t)}</td><td>${esc(t.m)}</td><td>${t.vols.map(([n,p])=>`Vol. ${n}, ${esc(upParts(p))}`).join("; ")}</td></tr>`).join("")}</tbody></table>
  <h2>Mains: General Studies Paper III</h2><p class="up-p-src">Official title of the paper: “${esc(UP_MAINS_HEAD)}”.</p>
  ${UP_MAINS.map((L,i)=>line(upPad(i+1),L,`${esc(L.ex)} Dimensions: ${L.dim.map(esc).join("; ")}. Concepts: ${L.con.map(esc).join("; ")}.`,hb(L.hb)+(L.note?" ("+esc(L.note)+")":""),`Example: ${esc(L.eg)} Mains approach: ${esc(L.ans)}${ca(L)?" Current affairs: "+ca(L)+".":""}`)).join("")}
  <h2>Also in General Studies Paper II</h2>
  ${UP_GS2.map((L,i)=>line(upPad(i+1),L,esc(L.ex),hb(L.hb),esc(L.cls))).join("")}
  <div class="foot">Arjun Agrawal · UPSC CSE Economics. An independent educational resource, not affiliated with or endorsed by the Union Public Service Commission. Explanations, handbook coverage and notes on classes are the platform's own; check the official notice for the authoritative syllabus.</div></div>`}
function upPrintSyllabus(){const r=document.getElementById("printroot");if(!r)return false;
 r.innerHTML=upSylPrintHtml();r.className="p-sheet up-print";
 let st=document.getElementById("pgsz");if(!st){st=document.createElement("style");st.id="pgsz";document.head.appendChild(st)}
 st.textContent="@media print{@page{size:A4;margin:14mm}}";
 return printPreparedDocument()}

/* ── 2 · Economics Resources ─────────────────────────────────────────────── */
function upResources(){if(ARG&&upTopic(ARG))return upTopicPage(upTopic(ARG));
 const counts=Object.fromEntries(UP_CATS.map(c=>[c,UP_TOPICS.filter(t=>t.cat===c).length]));
 return upMast({n:"03",s:"Economics Resources",h:"The UPSC Economics resource library",facts:[[UP_TOPICS.length+" previews","Free to read"],[UP_TOPICS.length+" diagrams","Original, each sourced"],[UP_TOPICS.length+" questions","Marked as you answer"],[UPSC_HB.volumes.length+" volumes","Behind the previews"]],lede:"Free topic previews drawn from the eleven handbooks. Each explains a concept, draws it, sets it in the Indian economy and shows how Prelims and Mains ask about it, with a question to try."})+
 `<div class="wrap full up-body up-res-page">
  <div class="up-filter"><label class="up-search"><span class="up-search-l">Search the previews</span><input id="up-q" type="search" placeholder="For example: MSP, deficit, CPI" value="${esA(UPS.q)}" oninput="UPS.q=this.value;upFilter()" autocomplete="off"></label>
   <div class="up-chipset" role="group" aria-label="Filter by category"><button type="button" class="up-chip${UPS.cat?"":" on"}" aria-pressed="${!UPS.cat}" onclick="upCat('')">All <span>${UP_TOPICS.length}</span></button>${UP_CATS.filter(c=>counts[c]).map(c=>`<button type="button" class="up-chip${UPS.cat===c?" on":""}" aria-pressed="${UPS.cat===c}" data-c="${esA(c)}" onclick="upCat(this.dataset.c)">${esc(c)} <span>${counts[c]}</span></button>`).join("")}</div></div>
  <p class="up-count" id="up-count" aria-live="polite"></p>
  <ul class="up-tgrid" id="up-tgrid">${UP_TOPICS.map((t,i)=>{const v=upVol(t.vol);return `<li class="up-tc rv" style="--i:${i%6}" data-c="${esA(t.cat)}" data-s="${esA([t.t,t.cat,t.intro,t.ex.join(" "),t.dist.map(d=>d.join(" ")).join(" "),"volume "+t.vol].join(" ").toLowerCase())}">
   <a class="up-tc-a" href="${upHref("resources",t.id)}"><span class="up-tc-plate"><span class="up-tc-pn" aria-hidden="true">Plate ${upPad(i+1)}</span>${upFig(t.fig)}</span>
    <span class="up-tc-k">${esc(t.cat)}</span><b>${esc(t.t)}</b><span class="up-tc-d">${esc(t.intro)}</span>
    <span class="up-tc-v"><span>Volume ${esc(t.vol)}${t.also?` and ${esc(t.also)}`:""}</span><span>Prelims · Mains · a question</span></span></a></li>`}).join("")}</ul>
  <p class="up-empty" id="up-empty" hidden>No topic matches. Try another word, or <button type="button" class="lnk" onclick="UPS.q='';UPS.cat='';render()">show every topic</button>.</p>
  ${upConcepts()}
  <section class="up-sec up-more-res" aria-labelledby="up-more-h"><h2 class="up-h3s" id="up-more-h">More for your preparation</h2><div class="up-goals">
   <a class="up-goal" href="${upHref("syllabus")}"><span class="up-k">Free</span><b>The syllabus, line by line</b><span>Every Economics line of the official syllabus, explained and mapped to the handbooks.</span><span class="up-go">Open <span aria-hidden="true">→</span></span></a>
   <a class="up-goal" href="${upHref("current")}"><span class="up-k">Free</span><b>Current Affairs and Economics</b><span>Dated developments, each with its source, its concept and its examination angle.</span><span class="up-go">Open <span aria-hidden="true">→</span></span></a>
   <a class="up-goal" href="${upHref("strategy")}"><span class="up-k">Free</span><b>Preparation Strategy</b><span>Phases, a weekly rhythm, previous-year questions, answer structure and revision.</span><span class="up-go">Open <span aria-hidden="true">→</span></span></a>
   <a class="up-goal" href="${upHref("handbooks")}"><span class="up-k">Handbooks</span><b>The Handbook Library</b><span>The complete treatment of each topic, in eleven volumes.</span><span class="up-go">Browse <span aria-hidden="true">→</span></span></a></div></section></div>`}
function upCat(c){UPS.cat=c;document.querySelectorAll(".up-res-page .up-chip").forEach(b=>{const on=(b.dataset.c||"")===c;b.classList.toggle("on",on);b.setAttribute("aria-pressed",on)});upFilter()}
function upFilter(){const q=(UPS.q||"").trim().toLowerCase(),c=UPS.cat;let n=0;
 document.querySelectorAll("#up-tgrid .up-tc").forEach(li=>{const ok=(!c||li.dataset.c===c)&&(!q||q.split(/\s+/).every(w=>li.dataset.s.includes(w)));li.hidden=!ok;if(ok)n++});
 const e=document.getElementById("up-empty"),k=document.getElementById("up-count");if(e)e.hidden=n>0;
 if(k)k.textContent=(c||q)?`${n} of ${UP_TOPICS.length} topics`+(c?` in ${c}`:"")+(q?` matching "${UPS.q.trim()}"`:""):`${UP_TOPICS.length} topic previews`}
function upTopicPage(t){const v=upVol(t.vol),i=UP_TOPICS.indexOf(t),prev=UP_TOPICS[(i+UP_TOPICS.length-1)%UP_TOPICS.length],next=UP_TOPICS[(i+1)%UP_TOPICS.length];
 const L=fxEnquiryLinks({label:"Handbook purchase",subject:`Handbook enquiry: Volume ${v.n}, ${v.title}`,msg:fxHandbookMsg(v)});
 return `<section class="up-mast up-tmast" aria-labelledby="up-h1"><div class="wrap full up-mast-in"><nav class="up-crumb" aria-label="Breadcrumb"><a href="${upHref("resources")}">Economics Resources</a><span aria-hidden="true">/</span><span>${esc(t.cat)}</span></nav>
  <h1 class="up-h1" id="up-h1">${esc(t.t)}</h1><p class="up-lede">${esc(t.intro)}</p><p class="up-tv">From <a href="${upHref("handbooks",v.id)}">Volume ${esc(v.n)}: ${esc(v.title)}</a>, ${esc(upParts(t.parts))}</p></div></section>
 <div class="wrap full up-body up-tp">
  <div class="up-tp-main"><section><h2 class="up-h3">The concept</h2>${t.ex.map(p=>`<p>${esc(p)}</p>`).join("")}</section>
   <figure class="up-tp-fig">${upFig(t.fig)}<figcaption>${esc(t.figCap)}</figcaption></figure>
   <section><h2 class="up-h3">Important distinctions</h2><div class="up-tw" role="region" aria-label="Important distinctions" tabindex="0"><table class="up-tbl"><tbody>${t.dist.map(([a,b])=>`<tr><th scope="row">${esc(a)}</th><td>${esc(b)}</td></tr>`).join("")}</tbody></table></div></section>
   <div class="up-g2"><section class="up-card"><h2 class="up-h4">In the Indian economy</h2><p>${esc(t.india)}</p></section><section class="up-card"><h2 class="up-h4">Policy and institutions</h2><p>${esc(t.policy)}</p></section></div>
   <div class="up-g2"><section class="up-card up-pre"><h2 class="up-h4">The Prelims perspective</h2><p>${esc(t.pre)}</p></section><section class="up-card up-mains"><h2 class="up-h4">The Mains perspective</h2><p>${esc(t.mains)}</p></section></div>
   ${upMcq(t)}</div>
  <aside class="up-tp-side" aria-label="From the handbook"><div class="up-glimpse"><p class="up-k">From the handbook</p>${upCover(v,"up-cv sm")}<b>Volume ${esc(v.n)}: ${esc(v.title)}</b><span>${v.pages} pages · ${esc(upParts(t.parts))} treat this topic in full</span>
   <a class="up-btn pri w" href="${upHref("handbooks",v.id)}">Explore in the Handbook Library</a>${upExt(L.wa,`Enquire about this volume<span class="sr-only"> on WhatsApp (opens in a new tab)</span>`,"up-btn line w")}</div></aside>
  <nav class="up-pn" aria-label="More topics"><a class="up-pn-a" href="${upHref("resources",prev.id)}"><span>Previous</span>${esc(prev.t)}</a><a class="up-pn-a" href="${upHref("resources",next.id)}"><span>Next</span>${esc(next.t)}</a></nav></div>`}
function upMcq(t){const q=t.mcq,L="abcd";
 return `<section class="up-mcq" aria-labelledby="mcq-${t.id}"><p class="up-k">Try a question</p><h2 class="up-h4" id="mcq-${t.id}">${esc(q.q)}</h2>
  <fieldset><legend class="sr-only">Choose one answer</legend>${q.o.map((o,i)=>`<label class="up-opt"><input type="radio" name="mcq-${t.id}" value="${i}"><span class="up-ol">(${L[i]})</span> ${esc(o)}</label>`).join("")}</fieldset>
  <button type="button" class="up-btn pri sm" onclick="upCheck('${t.id}')">Check my answer</button><div class="up-fb" id="fb-${t.id}" aria-live="polite"></div></section>`}
function upCheck(id){const t=upTopic(id),f=document.getElementById("fb-"+id);if(!t||!f)return;const s=document.querySelector(`input[name="mcq-${id}"]:checked`);
 if(!s){f.className="up-fb";f.textContent="Choose an answer first.";return}
 const ok=+s.value===t.mcq.a;f.className="up-fb "+(ok?"ok":"no");
 f.innerHTML=`<b>${ok?"Correct.":"Not quite: the answer is ("+"abcd"[t.mcq.a]+")."}</b> ${esc(t.mcq.why)}`}
/* One Concept. Two Examination Perspectives: the concept layer's teaser when it
   exists, otherwise this section's own connector. IB links are kept only where
   the route exists; a tab may name alternatives ("Diagram atlas|Diagram library"). */
function upConcepts(){if(typeof ccTeaser==="function"){const h=ccTeaser({path:"upsc"});if(h)return h}return upConnector()}
function upIbTab(s,tab){if(!tab)return 0;if(!s.tabs)return -1;for(const n of String(tab).split("|")){const i=s.tabs.indexOf(n);if(i>=0)return i}return -1}
function upIbLinks(r){return r.ibg.map(([lab,v,tab,arg])=>{const s=SECTIONS.find(x=>x.v===v);if(!s||typeof VIEWS[v]!=="function")return "";
 const t=upIbTab(s,tab);if(t<0)return "";
 if(arg&&v==="studio"){try{if(!stItem(arg))return ""}catch(e){return ""}}
 const h=routeFormat(v,t,arg);return routeParse(h)?`<a class="up-ibl" href="${esA(h)}">${esc(lab)}</a>`:""}).filter(Boolean).join("")}
function upConnector(){
 return `<section class="up-sec up-conn" id="connector" aria-labelledby="conn-h"><div class="up-conn-head"><p class="up-k">IB DP + UPSC CSE</p><h2 class="up-h2" id="conn-h">One Concept. Two Examination Perspectives.</h2>
  <p class="up-dek">Many ideas are shared by the two examinations. The concept is the same; the learning objective, the examples and the way it is examined differ.</p></div>
  <div class="up-conn-t" role="table" aria-label="Shared concepts across IB DP and UPSC CSE"><div class="up-conn-r h" role="row"><span role="columnheader">Shared concept</span><span role="columnheader">IB DP Economics application</span><span role="columnheader">UPSC CSE application</span></div>
  ${UP_CONNECT.map(r=>`<div class="up-conn-r" role="row"><span role="rowheader"><b>${esc(r.c)}</b></span>
   <span role="cell" class="ib"><span class="up-ck">${esc(r.ibk)}</span>${esc(r.ib)}<span class="up-cl">${upIbLinks(r)}</span></span>
   <span role="cell" class="ups"><span class="up-ck">Economics Collection</span>${esc(r.up)}<span class="up-cl">${upVolLinks(r.vols)}${r.t&&upTopic(r.t)?`<a class="up-ibl u" href="${upHref("resources",r.t)}">Preview: ${esc(upTopic(r.t).t)}</a>`:""}</span></span></div>`).join("")}</div>
  <p class="up-note">IB links open the existing IB DP resources on this platform; nothing is duplicated. UPSC links open the handbook volumes and the free previews.</p></section>`}

/* ── 3 · Handbook Library ────────────────────────────────────────────────── */
/* The library workstream draws this tab (hlRender). Until it is present, the
   first section's catalogue and volume pages stand, unchanged. */
function upLibrary(){return typeof hlRender==="function"?hlRender(ARG):upHandbooks()}
/* ── the first section's handbook catalogue and volume pages: the Handbook Library tab
   until hlRender is present, unchanged in content (its purchase message names the volume
   and its ₹99 price, as first published) ─────────────────────────────────────── */
function upWaBase(){try{const w=CONTACT.find(x=>x.k==="whatsapp");if(w&&w.href)return w.href}catch(e){}return "https://wa.me/917092844945"}
function upWa(msg){return upWaBase()+"?text="+encodeURIComponent(msg)}
function upMail(subject,body){return "mailto:"+TUT.email+"?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body)}
function upTel(){return "tel:"+UP_PHONE.replace(/\s+/g,"")}
function upHbMsg(v){return `Hello Arjun, I would like to purchase the digital copy (PDF) of Volume ${v.n}: ${v.title}, from your UPSC CSE Economics Handbook series, priced at ₹99. Please let me know how to pay and receive the PDF.`}
function upHbSubject(v){return `Handbook purchase: Volume ${v.n}, ${v.title} (₹99)`}
function upBuy(v,cls){return upExt(upWa(upHbMsg(v)),`Purchase PDF <span class="up-sep" aria-hidden="true">|</span> ₹99<span class="sr-only">: Volume ${v.n}, on WhatsApp (opens in a new tab)</span>`,cls||"up-btn up-buy")}
function upHandbooks(){if(ARG){const v=upVol(ARG);if(v)return upVolume(v)}
 const H=UPSC_HB.volumes,pages=H.reduce((a,v)=>a+v.pages,0);
 return `<section class="up-mast up-hbm"><div class="wrap full up-mast-in up-hbm-in"><div>
  <div class="up-eb"><span>UPSC CSE Economics</span><span class="up-eb-s">Economics Handbooks</span></div>
  <h1 class="up-h1">The Economics Handbook Collection</h1>
  <p class="up-lede">A structured collection of original Economics resources designed to help aspirants understand the foundations of the economy, analyse policy developments and prepare effectively for UPSC CSE.</p>
  <dl class="up-facts"><div><dt>Volumes</dt><dd>${H.length}</dd></div><div><dt>Pages in all</dt><dd>${pages}</dd></div><div><dt>Price</dt><dd>${UP_PRICE}</dd></div><div><dt>Format</dt><dd>Digital PDF</dd></div></dl></div>
  <div class="up-fan" aria-hidden="true">${H.slice(0,5).map((v,i)=>`<span style="--i:${i};background-image:url('${esA(v.img.cover.src)}')"></span>`).join("")}</div></div></section>
 <div class="wrap full up-body"><ol class="up-steps" aria-label="How to buy a handbook"><li><b>Choose a volume</b><span>Read its contents and sample pages first.</span></li><li><b>Send the prefilled message</b><span>On WhatsApp or by email: it names the volume and the price of ₹99.</span></li><li><b>Arrange payment and delivery directly</b><span>Nothing is charged, and no purchase is completed, on this website.</span></li></ol>
  <ul class="up-hbgrid">${H.map((v,i)=>upCard(v,i)).join("")}</ul>
  <p class="up-note">Each volume is sold individually at ₹99. The handbooks are proprietary: this site shows covers, contents and a few watermarked sample pages, never the complete PDF.</p></div>`}
function upCard(v,i){
 return `<li class="up-hb rv" style="--i:${i%4}" id="card-${v.id}"><div class="up-hb-cv">${upCover(v)}</div><div class="up-hb-x">
  <div class="up-hb-k">Volume ${esc(v.n)} <span aria-hidden="true">·</span> ${v.pages} pages</div>
  <h2 class="up-hb-t"><a href="${upHref("handbooks",v.id)}">${esc(v.title)}</a></h2><p class="up-hb-d">${esc(v.sub)}</p>
  <ul class="up-chips sm" aria-label="Major topics">${v.concepts.slice(0,4).map(c=>`<li>${esc(c)}</li>`).join("")}</ul>
  <dl class="up-rel"><div><dt>Prelims</dt><dd>${esc(upShort(v.pre))}</dd></div><div><dt>Mains</dt><dd>${esc(upShort(v.mains))}</dd></div></dl>
  <div class="up-hb-f"><span class="up-price">${UP_PRICE}</span><span class="up-hb-b"><a class="up-btn up-gh sm" href="${upHref("handbooks",v.id)}">Explore Handbook</a>${upBuy(v,"up-btn up-buy sm")}</span></div></div></li>`}
function upShort(s){const i=s.indexOf(":");let t=i>0&&i<70?s.slice(i+1).trim():s;t=t.charAt(0).toUpperCase()+t.slice(1);return t.length>140?t.slice(0,t.lastIndexOf(",",138))+"…":t}
function upVolume(v){const H=UPSC_HB.volumes,i=H.indexOf(v),prev=H[i-1],next=H[i+1];const img=v.img||{};
 const pages=[["contents","The contents page, with the syllabus map"]].concat(v.samples.map(s=>["p"+s.p,`Page ${s.p}: ${s.cap}`])).filter(([k])=>img[k]);
 const topics=UP_TOPICS.filter(t=>t.vol===v.n||t.also===v.n);
 return `<section class="up-mast up-vm"><div class="wrap full up-mast-in"><nav class="up-crumb" aria-label="Breadcrumb"><a href="${upHref("handbooks")}">Economics Handbooks</a><span aria-hidden="true">/</span><span>Volume ${esc(v.n)}</span></nav>
  <div class="up-vm-g"><div class="up-vm-cv">${upCover(v,"up-cv lg",true)}</div><div class="up-vm-x">
   <div class="up-hb-k">Volume ${esc(v.n)} · The Indian Economy Series · ${esc(v.edition)}</div>
   <h1 class="up-h1">${esc(v.title)}</h1><p class="up-vsub">${esc(v.sub)}</p>
   <dl class="up-facts"><div><dt>Pages</dt><dd>${v.pages}</dd></div><div><dt>Format</dt><dd>Digital PDF (A4)</dd></div><div><dt>Parts</dt><dd>${v.parts.length}</dd></div><div><dt>Useful for</dt><dd>${esc(v.exams.join(" · "))}</dd></div></dl>
   ${v.asof?`<p class="up-asof">${esc(v.asof)}</p>`:""}
   <div class="up-buybox"><div><span class="up-price lg">${UP_PRICE}</span><span class="up-sm">To purchase this handbook for ₹99, contact Arjun Agrawal.</span></div>
    <div class="up-buy-b">${upBuy(v,"up-btn up-buy")}<a class="up-btn up-gh" href="${esA(upMail(upHbSubject(v),upHbMsg(v)))}">Enquire by email</a></div>
    <p class="up-xs">The message names this volume and its price. Payment and delivery are arranged directly; nothing is charged on this website.</p></div></div></div></div></section>
 <div class="wrap full up-body up-vd">
  <section class="up-vd-s"><h2 class="up-h3">About this volume</h2><p class="up-big">${esc(v.desc)}</p>
   <h3 class="up-h4">What you will learn</h3><ul class="up-ticks">${v.learn.map(l=>`<li>${esc(l)}</li>`).join("")}</ul></section>
  <section class="up-vd-s"><h2 class="up-h3">Contents</h2><ol class="up-toc">${v.parts.map(p=>`<li><span class="up-toc-l">Part ${esc(p.l)}</span><span class="up-toc-x"><b>${esc(p.t)}</b><span>${esc(p.d)}</span></span><span class="up-toc-p">p. ${p.p}</span></li>`).join("")}</ol></section>
  <section class="up-vd-s"><h2 class="up-h3">Prelims and Mains relevance</h2><div class="up-grid2"><div class="up-card up-pre"><h3 class="up-h4">Prelims</h3><p>${esc(v.pre)}</p></div><div class="up-card up-mains"><h3 class="up-h4">Mains</h3><p>${esc(v.mains)}</p></div></div>
   <h3 class="up-h4">The volume's own syllabus map</h3><div class="up-tw" role="region" aria-label="The volume's own syllabus map" tabindex="0"><table class="up-tbl map"><thead><tr><th scope="col">Syllabus area</th><th scope="col">Prelims (parts)</th><th scope="col">Mains (sections)</th><th scope="col">Also useful for</th></tr></thead><tbody>${v.map.map(r=>`<tr><th scope="row">${esc(r[0])}</th><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td>${esc(r[3])}</td></tr>`).join("")}</tbody></table></div></section>
  <section class="up-vd-s up-grid2"><div><h2 class="up-h4">Key concepts</h2><ul class="up-chips">${v.concepts.map(c=>`<li>${esc(c)}</li>`).join("")}</ul></div><div><h2 class="up-h4">Institutions, policies and schemes</h2><ul class="up-chips g">${v.inst.map(c=>`<li>${esc(c)}</li>`).join("")}</ul></div></section>
  <section class="up-vd-s"><h2 class="up-h3">Inside the volume</h2><p>Recurring boxes: ${v.boxes.map(b=>`<span class="up-box-n">${esc(b)}</span>`).join(" ")}</p><p><b>Revision compendium.</b> ${esc(v.comp)}</p></section>
  ${pages.length?`<section class="up-vd-s"><h2 class="up-h3">Sample pages</h2><p class="up-sm">A few pages, at preview resolution and watermarked. The complete volume is the paid PDF.</p>
   <ul class="up-samples">${pages.map(([k,cap])=>`<li><button class="up-sp" onclick="upZoom('${v.id}','${k}')" aria-label="Enlarge: ${esA(cap)}"><img src="${esA(img[k].src)}" alt="${esA("Preview of Volume "+v.n+": "+cap)}" width="${img[k].w}" height="${img[k].h}" loading="lazy" decoding="async"></button><span>${esc(cap)}</span></li>`).join("")}</ul></section>`:""}
  ${topics.length?`<section class="up-vd-s"><h2 class="up-h3">Free previews from this volume</h2><div class="up-vls">${topics.map(t=>`<a class="up-vl" href="${upHref("resources",t.id)}"><b>${esc(t.t)}</b></a>`).join("")}</div></section>`:""}
  <section class="up-vd-s up-buyend"><div><b>Volume ${esc(v.n)}: ${esc(v.title)}</b><span>${v.pages} pages · Digital PDF · ${UP_PRICE}</span></div><div class="up-buy-b">${upBuy(v,"up-btn up-buy")}</div></section>
  <nav class="up-pn" aria-label="Other volumes">${prev?`<a class="up-pn-a" href="${upHref("handbooks",prev.id)}"><span>Volume ${prev.n}</span>${esc(prev.title)}</a>`:"<span></span>"}${next?`<a class="up-pn-a" href="${upHref("handbooks",next.id)}"><span>Volume ${next.n}</span>${esc(next.title)}</a>`:"<span></span>"}</nav></div>`}
function upZoom(id,k){const v=upVol(id);if(!v||!v.img||!v.img[k])return;const i=v.img[k];let d=document.getElementById("up-zoom");
 if(!d){d=document.createElement("dialog");d.id="up-zoom";d.className="up-zoom";document.body.appendChild(d);d.addEventListener("click",e=>{if(e.target===d)d.close()})}
 d.innerHTML=`<form method="dialog"><button class="up-zx" aria-label="Close preview">×</button></form><img src="${esA(i.src)}" alt="Preview page of Volume ${esA(v.n)}" width="${i.w}" height="${i.h}"><p>Preview only. Arjun Agrawal | Economics Collection</p>`;
 try{d.showModal()}catch(e){d.setAttribute("open","")}}

/* ── 4 · Current Affairs ─────────────────────────────────────────────────── */
function upCaThemes(){return UP_CA_THEMES.filter(t=>UP_CA.some(c=>c.th===t))}
function upCaSorted(){return [...UP_CA].sort((a,b)=>b.d.localeCompare(a.d)||a.id.localeCompare(b.id))}
function upCaItem(c){const v=upVol(c.vol),t=c.t&&upTopic(c.t);
 return `<article class="up-ca-e" id="ca-${c.id}" data-t="${esA(c.th)}" aria-labelledby="cah-${c.id}">
  <div class="up-ca-meta"><time datetime="${c.d}">${esc(upDate(c))}</time><span class="up-tag">${esc(c.th)}</span>${c.v?`<span class="up-tag v">Checked at source</span>`:""}</div>
  <div class="up-ca-body"><h3 class="up-ca-h" id="cah-${c.id}" tabindex="-1">${esc(c.h)}</h3><p class="up-ca-w">${esc(c.w)}</p>
   <dl class="up-ca-dl"><div><dt>Economic concept</dt><dd>${esc(c.c)}</dd></div><div><dt>Why it matters</dt><dd>${esc(c.why)}</dd></div>
    <div><dt>Prelims relevance</dt><dd>${esc(c.pre)}</dd></div><div><dt>Mains relevance</dt><dd>${esc(c.mains)}</dd></div></dl>
   <div class="up-ca-f"><p class="up-ca-links">${v?`<a href="${upHref("handbooks",v.id)}">Volume ${esc(v.n)}, Part ${esc(c.part)}: ${esc(upPartTitle(v,c.part)||v.title)}</a>`:""}${t?`<a href="${upHref("resources",t.id)}">Topic preview: ${esc(t.t)}</a>`:""}</p>
    <dl class="up-ca-src"><div><dt>Source</dt><dd>${esc(c.src)}${c.url?` <a href="${esA(c.url)}" target="_blank" rel="noopener noreferrer">Open the original<span class="sr-only">: ${esc(c.h)} (opens in a new tab)</span></a>`:""}</dd></div><div><dt>Published</dt><dd><time datetime="${c.d}">${esc(upDate(c))}</time></dd></div></dl></div></div></article>`}
function upCurrent(){const th=UPS.th&&UP_CA.some(c=>c.th===UPS.th)?UPS.th:"";UPS.th=th;const used=upCaThemes(),groups=[];
 upCaSorted().forEach(c=>{const k=c.d.slice(0,7);let g=groups.find(x=>x.k===k);if(!g)groups.push(g={k,items:[]});g.items.push(c)});
 const mName=k=>new Date(k+"-15T12:00:00Z").toLocaleDateString("en-GB",{month:"long",year:"numeric"});
 const checked=UP_CA.filter(c=>c.v).length;
 return upMast({n:"05",s:"Current Affairs",h:"Current Affairs and Economics",facts:[[UP_CA.length+" entries","Newest first"],[used.length+" of "+UP_CA_THEMES.length,"Themes with entries"],[UP_CA_COMPILED,"Last compiled"]],lede:"Economic developments read through the concepts they test. Every entry gives the economic concept, why it matters, its Prelims and Mains relevance, the handbook part or topic that explains it, and its source and date."})+
 `<div class="wrap full up-body up-ca-page">
  <div class="up-ca-note"><p><b>A manually updated editorial register, not a live feed.</b> Last compiled on <time datetime="${UP_CA_COMPILED_D}">${esc(UP_CA_COMPILED)}</time>; newest first.</p>
   <p>The ${checked} entries marked <span class="up-tag v">Checked at source</span> were opened and checked in the original official document on that date. The others come from the dated trackers in the handbooks, each naming the authority whose document it reports. Figures are as published on the date shown and may since have been revised.</p></div>
  <div class="up-chipset" role="group" aria-label="Filter by theme"><button type="button" class="up-chip${th?"":" on"}" aria-pressed="${!th}" onclick="upTheme('')">All themes <span>${UP_CA.length}</span></button>${used.map(t=>`<button type="button" class="up-chip${th===t?" on":""}" aria-pressed="${th===t}" data-t="${esA(t)}" onclick="upTheme(this.dataset.t)">${esc(t)} <span>${UP_CA.filter(c=>c.th===t).length}</span></button>`).join("")}</div>
  <p class="up-count" id="up-ca-count" aria-live="polite"></p>
  <div class="up-reg" id="up-ca">${groups.map(g=>`<section class="up-reg-m" data-m="${g.k}" aria-labelledby="m-${g.k}"><h2 class="up-reg-h" id="m-${g.k}">${esc(mName(g.k))}</h2>${g.items.map(upCaItem).join("")}</section>`).join("")}</div></div>`}
function upTheme(t){UPS.th=t;document.querySelectorAll(".up-ca-page .up-chip").forEach(b=>{const on=(b.dataset.t||"")===t;b.classList.toggle("on",on);b.setAttribute("aria-pressed",on)});upThemeApply()}
function upThemeApply(){const t=UPS.th;let n=0;
 document.querySelectorAll("#up-ca .up-ca-e").forEach(e=>{const ok=!t||e.dataset.t===t;e.hidden=!ok;if(ok)n++});
 document.querySelectorAll("#up-ca .up-reg-m").forEach(s=>{s.hidden=![...s.querySelectorAll(".up-ca-e")].some(e=>!e.hidden)});
 const k=document.getElementById("up-ca-count");if(k)k.textContent=t?`${n} ${n===1?"entry":"entries"} in ${t}`:`${n} entries, newest first`}

/* ── 5 · Preparation Strategy ────────────────────────────────────────────── */
function upStrategy(){const S=UP_STRAT,ex=upCA("mpc-oct-2026"),ev=ex&&upVol(ex.vol),comp=UPSC_HB.volumes[0].comp;
 const go=([tab,lab,arg])=>`<a class="up-ph-a" href="${upHref(tab,arg||undefined)}">${esc(lab)}</a>`;
 return upMast({n:"06",s:"Preparation Strategy",h:"A strategy for the Economics of the Civil Services Examination",facts:[["4 phases","From foundations to revision"],["7 days","A weekly rhythm"],["5 steps","From a development to its concept"],["4 returns","A revision cycle"]],lede:"A structured way to prepare the Economics of Prelims General Studies Paper I and Mains General Studies Paper III with this platform: in phases, week by week, joining static concepts to current affairs and practising for both stages. It is a method, not a promise of results."})+
 `<div class="wrap full up-body up-strat">
  <section class="up-sec0" aria-labelledby="st-0"><div class="up-principle"><h2 class="up-h3s" id="st-0">Start from the syllabus</h2>
   <p>The official syllabus marks the boundary. Map each topic to its line before you study it, and you will know why you are reading it and how it can be examined. This page covers the Economics of the General Studies papers only, not the Economics Optional paper, and Economics is one part of a much wider examination.</p>
   <a class="up-more" href="${upHref("syllabus")}">The syllabus, line by line <span aria-hidden="true">→</span></a></div></section>
  <section class="up-sec" aria-labelledby="st-1">${upSH("01","Four phases","Prepare in four phases","The phases overlap, and their length depends on how far away the examination is and where you start. Current affairs run through all four.","st-1")}
   <ol class="up-phases">${S.phases.map((p,i)=>`<li class="up-ph rv" style="--i:${i}"><p class="up-ph-n">${esc(p.n)}</p><h3 class="up-h3">${esc(p.t)}</h3><p class="up-ph-aim">${esc(p.aim)}</p>
    <p class="up-mini-k">What to do</p><ul class="up-list">${p.do.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>
    <p class="up-mini-k">On this platform</p><ul class="up-ph-use">${p.use.map(u=>`<li>${go(u)}</li>`).join("")}</ul>
    <p class="up-ph-out"><span>By the end</span>${esc(p.out)}</p></li>`).join("")}</ol></section>
  <section class="up-sec" aria-labelledby="st-2">${upSH("02","A weekly rhythm","A week of preparation","A suggested week for one topic. Adapt the days to your timetable; keep the sequence from concept to revision.","st-2")}
   <div class="up-tw" role="region" aria-label="A suggested week" tabindex="0"><table class="up-week"><caption class="sr-only">A suggested week: the day, its focus and what to do</caption><thead><tr><th scope="col">Day</th><th scope="col">Focus</th><th scope="col">What to do</th></tr></thead>
    <tbody>${S.week.map(([d,f,w])=>`<tr><th scope="row">${esc(d)}</th><td><b>${esc(f)}</b></td><td>${esc(w)}</td></tr>`).join("")}</tbody></table></div></section>
  <section class="up-sec" aria-labelledby="st-3">${upSH("03","Static and current","Join static concepts to current affairs","Read every development through a concept, in five steps. The Current Affairs page sets out each entry the same way.","st-3")}
   <div class="up-link5"><ol class="up-steps5">${S.link.map(([t,d],i)=>`<li><span class="up-steps5-n" aria-hidden="true">${i+1}</span><b>${esc(t)}</b><span>${esc(d)}</span></li>`).join("")}</ol>
   ${ex?`<article class="up-worked" aria-labelledby="st-ex"><p class="up-k">A worked example</p><h3 class="up-h3" id="st-ex">${esc(ex.h)}</h3>
    <dl class="up-ca-dl"><div><dt>1 · Concept</dt><dd>${esc(ex.c)}</dd></div><div><dt>2 · Syllabus line</dt><dd>Prelims: Economic and Social Development (Paper I), studied here under the themes Money and banking, and Fiscal and monetary policy. Mains: <a href="${upHref("syllabus","m-economy")}">Indian economy and issues relating to planning, mobilization of resources, growth, development and employment</a> (Paper III).</dd></div>
     <div><dt>3 · Static part</dt><dd>${ev?`<a href="${upHref("handbooks",ev.id)}">Volume ${esc(ev.n)}, Part ${esc(ex.part)}: ${esc(upPartTitle(ev,ex.part))}</a>, with Parts E and F on the framework and its instruments.`:""}</dd></div>
     <div><dt>4 · Data, with source and date</dt><dd>${esc(ex.w)} <span class="up-sm">(${esc(ex.src)}.)</span></dd></div>
     <div><dt>5 · Both angles</dt><dd>Prelims: ${esc(UP_FLOW[5][1])} Mains: ${esc(UP_FLOW[6][1])}</dd></div></dl></article>`:""}</div></section>
  <section class="up-sec" aria-labelledby="st-4">${upSH("04","Previous-year questions","Use previous-year questions well","Previous-year questions show how the syllabus is examined. Use them to understand the demand, not to memorise answers.","st-4")}
   <div class="up-pyq"><ol class="up-pyq-l">${S.pyq.map(([t,d],i)=>`<li><b>${esc(t)}</b><span>${esc(d)}${i===0?` The UPSC publishes them on its website: <a href="https://www.upsc.gov.in/examinations/previous-question-papers" target="_blank" rel="noopener noreferrer">Previous Question Papers, upsc.gov.in<span class="sr-only"> (opens in a new tab)</span></a>.`:""}</span></li>`).join("")}</ol>
    <p class="up-note">This page does not reproduce UPSC questions. Each handbook's revision compendium links its topics with previous-year questions.</p></div></section>
  <section class="up-sec" aria-labelledby="st-5">${upSH("05","Mains answers","Structure a GS III Economy answer","A frame for analytical answers. Shape it to the question's directive word and its word limit.","st-5")}
   <div class="up-ans"><ol class="up-ans-f">${S.answer.map(([t,d],i)=>`<li class="up-ans-${i}"><b>${esc(t)}</b><span>${esc(d)}</span></li>`).join("")}</ol>
    <div class="up-ans-c"><h3 class="up-h3s">Before you finish, check</h3><ul class="up-ticks">${S.check.map(c=>`<li>${esc(c)}</li>`).join("")}</ul></div></div></section>
  <section class="up-sec" aria-labelledby="st-6">${upSH("06","Revision","A revision cycle","Return to each topic four times, each time with less help.","st-6")}
   <div class="up-cyc">${upCycleSvg(S.cycle)}<ol class="up-cyc-l">${S.cycle.map(([t,d],i)=>`<li><span class="up-cyc-n" aria-hidden="true">${i+1}</span><b>${esc(t)}</b><span>${esc(d)}</span></li>`).join("")}</ol></div>
   <p class="up-note">Each handbook closes with a revision compendium. Volume I's, for example, holds: ${esc(comp.charAt(0).toLowerCase()+comp.slice(1))}</p></section>
  <section class="up-sec up-strat-end" aria-labelledby="st-7"><h2 class="up-h3s" id="st-7">If you would like this structure taught</h2>
   <p>The <a href="${upHref("course")}">3-month intensive online programme</a> follows the same sequence, from concepts to current affairs and practice for both stages. No preparation method can promise a result; this page offers a method you can use on your own.</p></section></div>`}
/* the revision cycle as a drawing: four stages on a ring (decorative; the list beside it carries the text) */
function upCycleSvg(c){const R=78,cx=110,cy=110,pt=a=>[cx+R*Math.cos(a),cy+R*Math.sin(a)];
 const nodes=c.map((_,i)=>{const a=-Math.PI/2+i*Math.PI/2,[x,y]=pt(a);return `<circle class="up-cyc-c" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="17"/><text class="up-cyc-t" x="${x.toFixed(1)}" y="${(y+5).toFixed(1)}" text-anchor="middle">${i+1}</text>`}).join("");
 const arcs=c.map((_,i)=>{const a0=-Math.PI/2+i*Math.PI/2+0.3,a1=a0+Math.PI/2-0.6,[x0,y0]=pt(a0),[x1,y1]=pt(a1);
  const ah=a1+0.02,[hx,hy]=pt(ah),tx=-Math.sin(ah),ty=Math.cos(ah),nx=Math.cos(ah),ny=Math.sin(ah),L=7;
  return `<path class="up-cyc-a" d="M${x0.toFixed(1)} ${y0.toFixed(1)}A${R} ${R} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}"/><path class="up-cyc-h" d="M${(hx-tx*L+nx*4).toFixed(1)} ${(hy-ty*L+ny*4).toFixed(1)}L${hx.toFixed(1)} ${hy.toFixed(1)}L${(hx-tx*L-nx*4).toFixed(1)} ${(hy-ty*L-ny*4).toFixed(1)}"/>`}).join("");
 return `<svg class="up-cyc-svg" viewBox="0 0 220 220" aria-hidden="true" focusable="false">${arcs}${nodes}<text class="up-cyc-m" x="110" y="106" text-anchor="middle">Revise</text><text class="up-cyc-m s" x="110" y="124" text-anchor="middle">with less help</text></svg>`}

/* ── 6 · Online Course ───────────────────────────────────────────────────── */
function upCourse(){const C=UP_COURSE,L=fxEnquiryLinks("upCourse"),ph=FX_CONTACT.phone();
 const mainsName=id=>{const m=UP_MAINS.find(x=>x.id===id);return m?m.short:""},preName=id=>{const t=UP_PRE.find(x=>x.id===id);return t?t.t:""};
 const cta=(cls)=>`<div class="up-cta ${cls||""}">${upExt(L.wa,`Enquire about the next batch <span class="arr" aria-hidden="true">→</span><span class="sr-only"> on WhatsApp (opens in a new tab)</span>`,"up-btn gold lg")}<a class="up-btn ghost" href="${esA(L.mail)}">Email the enquiry</a><a class="up-btn ghost" href="${esA(L.tel)}">Call ${esc(ph)}</a></div>`;
 return `<section class="up-hero up-chero" aria-labelledby="up-h1"><div class="wrap full up-hero-in">
  <div class="up-hero-copy"><p class="up-run"><span>Arjun Agrawal</span><span>UPSC CSE Economics</span><span>3-Month Intensive Online Programme</span></p>
   <h1 class="up-h1 up-caps" id="up-h1">Master Economics for UPSC. <span class="up-h1-2">Build the understanding to answer with confidence.</span></h1>
   <p class="up-lede">${esc(C.description)}</p>${cta()}
   <p class="up-hero-n">Delivered online only. Ask for the next batch's schedule and the enrolment details; nothing is booked or paid on this website.</p></div>
  <aside class="up-fee" aria-label="The programme at a glance"><p class="up-k">The complete programme</p><p class="up-fee-p">${esc(C.fee)}</p><p class="up-fee-s">for the complete three-month programme</p>
   <ul class="up-fee-l"><li><b>Three months</b>, online only</li><li><b>Maximum 25 students</b> per batch</li><li><b>Prelims and Mains</b> Economics within the relevant General Studies syllabus</li><li><b>Static Economics</b> and current affairs</li></ul></aside>
 </div></section>
 <section class="up-sec up-hl-sec" aria-labelledby="up-hl-h"><div class="wrap full"><h2 class="sr-only" id="up-hl-h">The programme in six facts</h2>
  <ul class="up-hl up-hl-6">${C.highlights.map(([v,k,s])=>`<li class="rv"><span class="up-hl-k">${esc(k)}</span><b>${esc(v)}</b><span class="up-hl-s">${esc(s)}</span></li>`).join("")}</ul></div></section>
 <section class="up-sec" aria-labelledby="up-cov-h"><div class="wrap full">
  ${upSH("01","What the course covers","Twelve modules, built on the eleven handbooks","Each module follows the parts of the volumes that treat it and is mapped to the official General Studies syllabus. Where no volume treats a topic in full, the module says so.","up-cov-h")}
  <ol class="up-mods">${C.modules.map((m,i)=>`<li class="up-mod"><div class="up-mod-h"><span class="up-mod-n" aria-hidden="true">${upPad(i+1)}</span><h3 class="up-h3">${esc(m.t)}</h3><span class="up-mod-m">Month ${m.m}</span></div>
   <p>${esc(m.d)}</p><p class="up-mod-v"><span class="up-mini-k">Handbooks</span>${upVolLinks(m.vols)}</p>
   <div class="up-mod-s"><p class="up-mini-k">Syllabus</p><ul>${[...m.pre.map(id=>`<li><span class="up-mod-p">Prelims</span> ${esc(preName(id))}</li>`),...m.mains.map(id=>`<li><span class="up-mod-p">GS III</span> <a class="up-mod-a" href="${upHref("syllabus",id)}">${esc(mainsName(id))}</a></li>`),...(m.gs2||[]).map(id=>`<li><span class="up-mod-p">GS II</span> <a class="up-mod-a" href="${upHref("syllabus",id)}">${esc((UP_GS2.find(g=>g.id===id)||{}).short||"")}</a></li>`)].join("")}</ul></div>
   ${m.gap?`<p class="up-gap"><b>Not covered by a volume of its own.</b> ${esc(m.gap)}</p>`:""}</li>`).join("")}</ol></div></section>
 <section class="up-sec up-band" aria-labelledby="up-jr-h"><div class="wrap full">
  ${upSH("02","The three months","A three-month journey","Indicative: an outline of the order of study, not a timetable. Batch dates and timings are not published here; ask for them when you enquire.","up-jr-h")}
  <ol class="up-journey rv">${C.months.map((m,i)=>`<li class="up-jm" style="--i:${i}"><div class="up-jm-h"><span class="up-jm-n">${esc(m.n)}</span><h3 class="up-h3">${esc(m.t)}</h3></div><p>${esc(m.d)}</p>
   <ul class="up-jm-v" aria-label="Volumes for ${esA(m.n)}">${m.vols.map(n=>{const v=upVol(n);return v?`<li><a class="up-jv-a" href="${upHref("handbooks",v.id)}">${upCover(v,"up-jm-cv")}<span>${esc(v.n)}</span></a></li>`:""}).join("")}</ul></li>`).join("")}</ol></div></section>
 <section class="up-sec" aria-labelledby="up-me-h"><div class="wrap full">
  ${upSH("03","Teaching methodology","How the programme teaches","Nine elements, used together in each module.","up-me-h")}
  <ul class="up-meth">${C.methods.map(([ic,t,d],i)=>`<li class="rv" style="--i:${i%3}">${upIc(ic)}<b>${esc(t)}</b><span>${esc(d)}</span></li>`).join("")}</ul></div></section>
 <section class="up-sec up-b25-sec" aria-labelledby="up-b25-h"><div class="wrap full up-b25">
  <div>${upSH("04","The batch","A batch of at most 25 students","","up-b25-h")}<p class="up-big">${esc(C.batch)}</p>
   <p>A smaller group leaves room for questions in class, for discussion in which every student can take part, and for teaching that responds to how the batch is learning.</p></div>
  <figure class="up-25"><div class="up-25-g" aria-hidden="true">${Array.from({length:25},(_,i)=>`<i style="--i:${i}"></i>`).join("")}</div><figcaption>Maximum 25 students per batch</figcaption></figure></div></section>
 <section class="up-sec" aria-labelledby="up-who-h"><div class="wrap full">
  ${upSH("05","Who should join","Who the programme is for","","up-who-h")}
  <ul class="up-who">${C.audience.map(([t,d])=>`<li><b>${esc(t)}</b><span>${esc(d)}</span></li>`).join("")}</ul></div></section>
 <section class="up-sec up-cend" aria-labelledby="up-end-h"><div class="wrap full up-cend-in"><div><p class="up-k">Enrolment is by enquiry</p><h2 class="up-h2" id="up-end-h">Enquire about the next batch</h2>
  <p class="up-cend-l">WhatsApp opens with this message, ready to send: <q>${esc(C.enquiry)}</q></p>
  <p class="up-sm">Or email ${esc(FX_CONTACT.email())}, or call ${esc(ph)}. The programme is delivered online only. No batch is booked and no payment is taken on this website.</p></div>${cta("col")}</div></section>`}

/* ── 7 · Contact / Enrol ─────────────────────────────────────────────────── */
const UP_ENQ=[["upHandbooks","book","Handbook purchases","Buying volumes of the Economics Handbook Series: payment and delivery details."],
 ["upCourse","screen","The three-month course","The UPSC CSE Economics Intensive Online Programme: ₹9,999 for the complete three months, online only, at most 25 students per batch."],
 ["upMentor","talk","Economics mentorship","An enquiry about Economics mentorship for the Civil Services Examination."],
 ["upResources","notes","Resource enquiries","A question about the UPSC Economics resources on this platform."]];
function upContact(){const vols=UPSC_HB.volumes;
 return upMast({n:"08",s:"Contact / Enrol",h:"Contact and enrolment",facts:[["4 enquiries","Handbooks, course, mentorship, resources"],["3 ways","WhatsApp, email or a call"]],lede:"Four UPSC enquiries, each with its message already written. Choose WhatsApp, email or a call: your own app opens with the message, and nothing is sent from this page or stored by it."})+
 `<div class="wrap full up-body up-ct">
  <ul class="up-enq">${UP_ENQ.map(([k,ic,t,d])=>`<li class="up-enq-c" id="enq-${k}"><div class="up-enq-h">${upIc(ic)}<h2 class="up-h3">${esc(t)}</h2></div><p>${esc(d)}</p>
   ${k==="upHandbooks"?`<label class="up-ct-v" for="up-ct-vol">About a particular volume <span>(optional)</span></label><select id="up-ct-vol" onchange="upCtVol(this.value)"><option value="">The series in general</option>${vols.map(v=>`<option value="${v.id}"${UPS.vol===v.id?" selected":""}>Volume ${v.n}: ${esc(v.title)}</option>`).join("")}</select>`:""}
   <p class="up-mini-k">The message</p><blockquote class="up-enq-m" id="msg-${k}">${esc(k==="upHandbooks"&&upVol(UPS.vol)?fxHandbookMsg(upVol(UPS.vol)):FX_ENQ[k].msg)}</blockquote>
   ${k==="upHandbooks"&&upVol(UPS.vol)?upCtActs(upVol(UPS.vol)):upEnqActs(k)}</li>`).join("")}</ul>
  <aside class="up-ct-d" aria-label="Contact details"><p class="up-k">Contact details</p><dl><div><dt>Email</dt><dd><a href="mailto:${esA(FX_CONTACT.email())}">${esc(FX_CONTACT.email())}</a></dd></div><div><dt>WhatsApp and phone</dt><dd><a href="${esA(fxTel())}">${esc(FX_CONTACT.phone())}</a></dd></div></dl>
   <p class="up-sm">A message is an enquiry: no purchase or enrolment is completed on this website. For IB DP enquiries, use the <a href="#/contact">general contact page</a>. About the educator: <a href="#/about">Arjun Agrawal</a>.</p></aside></div>`}
/* the handbook card, asking about one volume */
function upCtActs(v){const L=fxEnquiryLinks({label:"Handbook purchase",subject:`Handbook enquiry: Volume ${v.n}, ${v.title}`,msg:fxHandbookMsg(v)});
 return `<div class="up-acts" data-enq="upHandbooks">${upExt(L.wa,`WhatsApp<span class="sr-only">: Handbook purchase, Volume ${esc(v.n)} (opens in a new tab)</span>`,"up-btn pri")}<a class="up-btn line" href="${esA(L.mail)}">Email<span class="sr-only">: Handbook purchase, Volume ${esc(v.n)}</span></a><a class="up-btn line" href="${esA(L.tel)}">Call ${esc(FX_CONTACT.phone())}</a></div>`}
function upCtVol(id){UPS.vol=id;const c=document.getElementById("enq-upHandbooks");if(!c)return;const v=upVol(id);
 const m=document.getElementById("msg-upHandbooks");if(m)m.textContent=v?fxHandbookMsg(v):FX_ENQ.upHandbooks.msg;
 const a=c.querySelector(".up-acts");if(a)a.outerHTML=v?upCtActs(v):upEnqActs("upHandbooks")}

/* ── the section ─────────────────────────────────────────────────────────── */
VIEWS.upsc=function(){const f=[upHome,upSyllabus,upResources,upLibrary,upCurrent,upStrategy,upCourse,upContact][TAB]||upHome;
 const h=`<div class="up" data-tab="${TAB}">${f()}</div>`,t=TAB,a=ARG;
 if(!upQA())window._after=()=>{try{if(t===UP_T.resources&&!a)upFilter();if(t===UP_T.current)upThemeApply();
  if(a&&(t===UP_T.syllabus||t===UP_T.current))setTimeout(()=>upDeep(t,a),60)}catch(e){}};
 return h};
/* a deep link to a syllabus line or a current-affairs entry opens it and brings it into view */
function upDeep(t,a){if(typeof VIEW==="undefined"||VIEW!=="upsc"||TAB!==t||ARG!==a)return;
 if(t===UP_T.syllabus){upSylShow(a,true);return}
 const e=document.getElementById("ca-"+a);if(!e)return;if(e.hidden){UPS.th="";upTheme("")}
 try{e.scrollIntoView({block:"start"})}catch(x){}e.classList.add("hl");const h=e.querySelector(".up-ca-h");if(h)try{h.focus({preventScroll:true})}catch(x){}}

/* the page title, the section's class on the body, and the address of an alias */
(function(){if(typeof document==="undefined")return;
 const prev=render;render=function(){const r=prev.apply(this,arguments);try{upAfterRender()}catch(e){}return r}})();
function upAfterRender(){const on=VIEW==="upsc";document.body.classList.toggle("up-on",on);
 if(on){let t=UP_TABS[TAB]||UP_TABS[0];
  if(TAB===UP_T.handbooks&&ARG&&upVol(ARG))t="Volume "+upVol(ARG).n+": "+upVol(ARG).title;
  if(TAB===UP_T.resources&&ARG&&upTopic(ARG))t=upTopic(ARG).t;
  document.title=t+" · UPSC CSE Economics · Arjun Agrawal"}
 if(!upQA())setTimeout(upCanon,0)}
/* the footer names the UPSC pages too, in its Connect column, above "The method" */
function upFooter(){if(document.getElementById("ft-upsc"))return;const k=[...document.querySelectorAll("footer.ft .ftcols .kicker")].find(x=>/The method/.test(x.textContent));if(!k)return;
 const d=document.createElement("div");d.id="ft-upsc";d.innerHTML=`<div class="kicker mt4">UPSC CSE Economics</div>${[["UPSC Home","overview"],["Syllabus","syllabus"],["Handbook Library","handbooks"],["Current Affairs","current"],["Online Course","course"]].map(([t,k])=>`<button class="lnk" onclick="nav('upsc',${UP_T[k]})">${t}</button>`).join("")}`;
 k.parentNode.insertBefore(d,k)}
(function(){if(typeof document==="undefined")return;const go=()=>{try{upFooter()}catch(e){}};
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",go);else go()})();

/* ── search: the UPSC pages, syllabus lines, volumes, topics and current affairs ── */
(function(){if(typeof buildIndex!=="function")return;const prev=buildIndex;
 buildIndex=function(){if(SIDX)return SIDX;const I=prev().slice(),K="UPSC CSE Economics";
  UP_TABS.forEach((t,i)=>I.push({k:K,t:t,d:"UPSC CSE Economics",go:`nav('upsc',${i})`,s:"upsc cse civil services ias economics "+t.toLowerCase()}));
  UP_MAINS.forEach((m,i)=>I.push({k:K,t:"GS III: "+m.short,d:"Syllabus · Mains General Studies Paper III, line "+(i+1),go:`nav('upsc',1,'${m.id}')`,s:["upsc syllabus mains gs iii",m.short,m.o,m.con.join(" ")].join(" ").toLowerCase()}));
  UP_PRE_LINES.forEach(m=>I.push({k:K,t:"GS I: "+m.short,d:"Syllabus · Prelims General Studies Paper I",go:`nav('upsc',1,'${m.id}')`,s:["upsc syllabus prelims gs i",m.short,m.o].join(" ").toLowerCase()}));
  UPSC_HB.volumes.forEach(v=>I.push({k:K,t:`Volume ${v.n}: ${v.title}`,d:`Handbook Library · ${v.pages} pages`,go:`nav('upsc',3,'${v.id}')`,s:["upsc handbook library volume",v.n,v.title,v.sub,v.concepts.join(" "),v.inst.join(" "),v.parts.map(p=>p.t).join(" ")].join(" ").toLowerCase()}));
  UP_TOPICS.forEach(t=>I.push({k:K,t:t.t,d:"UPSC topic preview · "+t.cat,go:`nav('upsc',2,'${t.id}')`,s:["upsc preview",t.cat,t.t,t.intro,t.dist.map(d=>d[0]).join(" ")].join(" ").toLowerCase()}));
  UP_CA.forEach(c=>I.push({k:K,t:c.h,d:"UPSC current affairs · "+upDate(c),go:`nav('upsc',4,'${c.id}')`,s:["upsc current affairs",c.th,c.h,c.c].join(" ").toLowerCase()}));
  I.push({k:K,t:"One Concept. Two Examination Perspectives.",d:"IB DP and UPSC CSE, concept by concept",go:"nav('upsc',2)",s:"ib upsc connector shared concept two examinations perspectives"});
  return SIDX=I};
 if(typeof RN_KIND_W!=="undefined")RN_KIND_W["UPSC CSE Economics"]=2.3;try{SIDX=null}catch(e){}})();

/* ── self-tests ──────────────────────────────────────────────────────────── */
function UPSCSUITE(){const out=[];const T=(n,f)=>{let ok=false,det="";try{const r=f();ok=r===true||(r&&r.ok);if(r&&r.d)det=r.d}catch(e){det=e.message}out.push({n,ok:!!ok,detail:det})};
 const H=UPSC_HB.volumes,k0={VIEW,TAB,ARG};
 const page=(t,a)=>{const k={VIEW,TAB,ARG};try{VIEW="upsc";TAB=t;ARG=a===undefined?null:a;return VIEWS.upsc()}finally{VIEW=k.VIEW;TAB=k.TAB;ARG=k.ARG}};
 const txt=h=>String(h).replace(/<[^>]+>/g," ").replace(/\s+/g," ");
 T("UPSC · the eight tabs, in order, with their keys",()=>UP_TABS.join("|")==="UPSC Home|Syllabus|Economics Resources|Handbook Library|Current Affairs|Preparation Strategy|Online Course|Contact / Enrol"
  &&JSON.stringify(UP_T)===JSON.stringify({overview:0,syllabus:1,resources:2,handbooks:3,current:4,strategy:5,course:6,contact:7}));
 T("UPSC · each tab has its own address and parses back",()=>{const want=["#/upsc","#/upsc/syllabus","#/upsc/economics-resources","#/upsc/handbook-library","#/upsc/current-affairs","#/upsc/preparation-strategy","#/upsc/online-course","#/upsc/contact-enrol"];
  return UP_TABS.every((t,i)=>{const h=routeFormat("upsc",i);const r=routeParse(h);return h===want[i]&&r&&r.v==="upsc"&&r.t===i})});
 T("UPSC · the first section's addresses still open the same pages",()=>{const P=h=>routeParse(h)||{};const a=P("#/upsc/economics-handbooks"),b=P("#/upsc/economics-handbooks/volume-iii"),c=P("#/upsc/upsc-economics-course"),d=P("#/upsc/contact-enrolment"),e=P("#/upsc/about-the-educator");
  return a.v==="upsc"&&a.t===3&&!a.a&&b.t===3&&b.a==="volume-iii"&&c.t===6&&d.t===7&&e.v==="about"});
 T("UPSC · every volume, topic, syllabus line and current-affairs entry has its own address",()=>H.every(v=>{const r=routeParse(upHref("handbooks",v.id));return r&&r.t===3&&r.a===v.id})
  &&UP_TOPICS.every(t=>{const r=routeParse(upHref("resources",t.id));return r&&r.t===2&&r.a===t.id})
  &&[...UP_PRE_LINES,...UP_MAINS,...UP_GS2].every(m=>{const r=routeParse(upHref("syllabus",m.id));return r&&r.t===1&&r.a===m.id})
  &&UP_CA.every(c=>{const r=routeParse(upHref("current",c.id));return r&&r.t===4&&r.a===c.id}));
 T("UPSC · every page has exactly one h1, and nothing renders a tab bar of its own",()=>{const bad=[];for(let i=0;i<8;i++){const h=page(i);if((h.match(/<h1[\s>]/g)||[]).length!==1||/id="subnav"|role="tablist"/.test(h))bad.push(i)}
  [[2,"inflation"],[3,"volume-v"],[1,"m-budget"]].forEach(([t,a])=>{if((page(t,a).match(/<h1[\s>]/g)||[]).length!==1)bad.push(t+"/"+a)});return {ok:!bad.length,d:bad.join(",")}});
 T("UPSC · the home page carries the headline, both calls to action and the eight steps in order",()=>{const h=page(0),s=txt(h);
  return /Understand the Indian economy\. <span class="up-h1-2">Master the economic dimension of UPSC\.<\/span>/.test(h)&&/Explore UPSC resources/.test(s)&&/Explore the 3-month course/.test(s)
   &&UP_STEPS.map(x=>x[1].toUpperCase()).join(" → ")==="UNDERSTAND THE CONCEPT → BUILD ECONOMIC FOUNDATIONS → CONNECT WITH INDIAN ECONOMY → STUDY GOVERNMENT POLICY → INTEGRATE CURRENT AFFAIRS → APPLY THROUGH PRELIMS QUESTIONS → DEVELOP MAINS ANSWERS → REVISE AND EVALUATE"
   &&(h.match(/class="up-f8-node"/g)||[]).length===8&&/<ol class="up-flow8/.test(h)});
 T("UPSC · the home page shelves the eleven real covers, the latest three entries and the course highlights",()=>{const h=page(0);
  const covers=[...h.matchAll(/class="up-shelf-cv" src="([^"]+)"/g)].map(m=>m[1]);const latest=upCaSorted().slice(0,3);
  return covers.length===11&&covers.every((c,i)=>c===H[i].img.cover.src)&&latest.every(c=>h.includes(`href="${upHref("current",c.id)}"`))&&UP_COURSE.highlights.every(([v])=>h.includes(esc(v)))});
 T("UPSC · the syllabus quotes the official lines, marks them, and keeps four layers apart for every line",()=>{const h=page(1);
  const lines=[...UP_PRE_LINES,...UP_MAINS,...UP_GS2];const quoted=lines.every(L=>h.includes(`<q>${esc(L.o)}</q>`));
  const blocks=h.split('<details class="up-line"').slice(1).filter(b=>!/up-th14/.test(b.slice(0,40)));
  const four=blocks.length===lines.length&&blocks.every(b=>/up-lab o/.test(b)&&/up-layer-b/.test(b)&&/up-layer-c/.test(b)&&/up-layer-d/.test(b));
  return {ok:quoted&&four&&UP_MAINS.length===10&&UP_PRE_LINES.length===2,d:"quoted "+quoted+", blocks "+blocks.length}});
 T("UPSC · the official wording is the first section's wording, unchanged",()=>UP_PRE_OFFICIAL[1]==="Economic and Social Development-Sustainable Development, Poverty, Inclusion, Demographics, Social Sector Initiatives, etc."
  &&UP_MAINS[2].o==="Government Budgeting."&&UP_MAINS[9].o==="Investment models."&&UP_MAINS[0].o==="Indian Economy and issues relating to planning, mobilization of resources, growth, development and employment.");
 T("UPSC · the syllabus names its notice, flags the lines still to confirm and states the scope",()=>{const s=txt(page(1));
  return s.includes(UP_SYL_SRC.doc)&&s.includes(UP_SYL_SRC.date)&&page(1).includes(esA(UP_SYL_SRC.url))&&UP_MAINS.filter(m=>m.tbc).map(m=>m.id).join()==="m-crops,m-subsidies,m-land,m-liberalisation"
   &&/not presented as preparation for the Economics Optional paper/.test(s)});
 T("UPSC · every handbook reference resolves to a row of a volume's own syllabus map or to its parts",()=>{const refs=[...UP_PRE_LINES,...UP_MAINS,...UP_GS2,...UP_PRE_SUB].flatMap(x=>x.hb||[]);
  return refs.length>40&&refs.every(r=>{const x=upHbRow(r);return x&&x.area&&(typeof r[1]!=="number"||x.map===1)})});
 T("UPSC · printing the syllabus prepares a document with every official line, and prints nothing",()=>{const before=PRINTGUARD.totalCalls,h=upSylPrintHtml();
  return [...UP_PRE_LINES,...UP_MAINS,...UP_GS2].every(L=>h.includes("“"+esc(L.o)+"”"))&&/Optional/.test(h)&&PRINTGUARD.totalCalls===before&&!/window\.print/.test(String(upPrintSyllabus))});
 T("UPSC · the course states its facts exactly: ₹9,999, three months, online only, at most 25",()=>{const s=txt(page(6));
  return UP_COURSE.price===9999&&UP_COURSE.fee==="₹9,999"&&UP_COURSE.maxStudents===25&&UP_COURSE.durationISO==="P3M"&&/₹9,999/.test(s)&&/for the complete three-month programme/.test(s)
   &&/Online only/.test(s)&&/Maximum 25 students/.test(s)&&/3 months/.test(s)&&/Prelims \+ Mains/.test(s)&&/Static \+ Current Affairs/.test(s)
   &&!/₹4,999|per month|\/ ?month|seats? (left|remaining)|hurry|last chance|only \d+ (seats|places)/i.test(s)});
 T("UPSC · the course promises nothing the brief excludes and invents no dates or payment links",()=>{const s=txt(page(6));
  return !/recording|mock test|unlimited doubt|one-to-one|1:1|personal evaluation|guarantee|refund|instalment|discount|\b\d+\s+(lectures|classes|sessions|hours)\b/i.test(s)&&!/razorpay|paypal|upi:|checkout|pay now/i.test(page(6))
   &&UP_COURSE.methods.length===9&&UP_COURSE.modules.length===12&&!!UP_COURSE.modules.find(m=>m.k==="national-income").gap});
 T("UPSC · the course modules point only to parts that exist in the volumes",()=>UP_COURSE.modules.every(m=>m.vols.every(([n,p])=>{const v=upVol(n);return v&&String(p).split(/ to |,\s*/).every(l=>v.parts.some(x=>x.l===l))}))
  &&UP_COURSE.months.map(m=>m.vols.join(",")).join(" | ")==="I,II,III,VI | IV,V,VII,VIII,IX | X,XI");
 T("UPSC · the course enquiry is the shared message, on WhatsApp, email and phone",()=>{const h=page(6),msg=FX_ENQ.upCourse.msg;
  return UP_COURSE.enquiry===msg&&msg==="Hello, I am interested in joining the three-month UPSC CSE Economics Intensive Online Programme priced at ₹9,999. Please share the upcoming batch schedule and enrolment details."
   &&h.includes(esA(fxWa(msg)))&&h.includes(esA(fxMail(FX_ENQ.upCourse.subject,msg)))&&h.includes('href="tel:+917092844945"')&&/Enquire about the next batch/.test(h)});
 T("UPSC · every enquiry uses only the published contact details",()=>{const h=[0,1,2,4,5,6,7].map(i=>page(i)).join("")+page(2,"msp");
  const wa=h.match(/https:\/\/wa\.me\/[^"?]+/g)||[],ml=h.match(/mailto:[^"?]+/g)||[],tl=h.match(/tel:[^"]+/g)||[];
  return wa.length>=5&&wa.every(x=>x==="https://wa.me/917092844945")&&ml.every(x=>x==="mailto:arjun1agr@gmail.com")&&tl.every(x=>x==="tel:+917092844945")});
 T("UPSC · Contact / Enrol carries the four UPSC enquiries, each with WhatsApp, email and phone",()=>{const h=page(7);
  return ["upHandbooks","upCourse","upMentor","upResources"].every(k=>{const L=fxEnquiryLinks(k),i=h.indexOf(`id="enq-${k}"`),j=h.indexOf("</li>",h.indexOf('class="up-acts"',i));const c=h.slice(i,j);
   return i>0&&c.includes(esA(L.wa))&&c.includes(esA(L.mail))&&c.includes('href="tel:+917092844945"')})});
 T("UPSC · current-affairs entries carry a theme, a date, a source and every part of the structure",()=>UP_CA.every(c=>/^\d{4}-\d{2}-\d{2}$/.test(c.d)&&UP_CA_THEMES.includes(c.th)&&c.src&&c.h&&c.w&&c.c&&c.why&&c.pre&&c.mains&&upVol(c.vol)&&upPartTitle(upVol(c.vol),c.part)&&(!c.t||upTopic(c.t))&&(!c.url||/^https:\/\/(rbi\.org\.in|www\.indiabudget\.gov\.in)\//.test(c.url))));
 T("UPSC · the register lists only themes with entries, newest first, and says when it was compiled",()=>{const h=page(4),s=txt(h);const ids=[...h.matchAll(/id="ca-([^"]+)"/g)].map(m=>m[1]);
  const used=upCaThemes();return ids.join()===upCaSorted().map(c=>c.id).join()&&used.every(t=>h.includes(`data-t="${esA(t)}" onclick`))&&!h.includes('data-t="Poverty and inclusive growth" onclick')
   &&s.includes("Last compiled on "+UP_CA_COMPILED)&&/not a live feed/.test(s)});
 T("UPSC · the preparation strategy has phases, a week, the five-step link, PYQ use, an answer frame and a revision cycle",()=>{const s=txt(page(5));
  return UP_STRAT.phases.length===4&&UP_STRAT.week.length===7&&UP_STRAT.link.length===5&&UP_STRAT.answer.length===4&&UP_STRAT.cycle.length===4
   &&/not a promise of results/.test(s)&&/does not reproduce UPSC questions/.test(s)&&/Previous Question Papers/.test(s)});
 T("UPSC · the Handbook Library tab is the library's own when it is present, and the catalogue otherwise",()=>{const h=page(3);
  return typeof hlRender==="function"?h.includes(hlRender(null).slice(0,200)):(h.match(/class="up-hb rv"/g)||[]).length===11});
 T("UPSC · Economics Resources keeps its eleven previews and their figures, and the connector or the concept teaser",()=>{const h=page(2);
  return UP_TOPICS.length===11&&(h.match(/class="up-tc rv"/g)||[]).length===11&&UP_TOPICS.every(t=>upFig(t.fig).startsWith("<svg"))&&(typeof ccTeaser==="function"||/One Concept\. Two Examination Perspectives\./.test(h))});
 T("UPSC · every topic preview has a question with a valid answer and a source volume",()=>UP_TOPICS.every(t=>t.mcq.o.length===4&&t.mcq.a>=0&&t.mcq.a<4&&upVol(t.vol)&&UP_CATS.includes(t.cat)));
 T("UPSC · the connector's IB links resolve, the Diagram atlas among them",()=>{const all=UP_CONNECT.map(upIbLinks).join("");const hs=[...all.matchAll(/href="([^"]+)"/g)].map(m=>m[1].replace(/&amp;/g,"&"));
  const lab=SECTIONS.find(s=>s.v==="lab");const atlas=lab&&lab.tabs?upIbTab(lab,"Diagram atlas|Diagram library"):-1;
  return hs.length>=8&&hs.every(x=>routeParse(x))&&(atlas<0||/>Diagram atlas</.test(all))});
 T("UPSC · no handbook PDF is referenced anywhere in the section",()=>{const h=[0,1,2,3,4,5,6,7].map(i=>page(i)).join("")+H.map(v=>page(3,v.id)).join("");
  return !/\.pdf\b/i.test(h.replace(/Notif-CSP-2026-Engl-060226Rev\.pdf/g,"").replace(/https:\/\/www\.indiabudget\.gov\.in\/economicsurvey\/doc\/eschapter\/echap\d+\.pdf/g,""))&&!JSON.stringify(UPSC_HB).includes(".pdf")});
 T("UPSC · the About the Educator tab is gone; About is one link to the shared page",()=>!UP_TABS.includes("About the Educator")&&typeof upEducator==="undefined"&&/href="#\/about"/.test(page(0)));
 T("UPSC · the pathway strip and the home-page band are no longer drawn here",()=>typeof upPathbar==="undefined"&&typeof upHomeBand==="undefined");
 T("UPSC · the search index names the eight tabs and every syllabus line",()=>{let I=[];try{const k=SIDX;SIDX=null;I=buildIndex();SIDX=k}catch(e){return false}
  const U=I.filter(r=>r.k==="UPSC CSE Economics");return UP_TABS.every(t=>U.some(r=>r.t===t))&&UP_MAINS.every(m=>U.some(r=>r.go===`nav('upsc',1,'${m.id}')`))});
 VIEW=k0.VIEW;TAB=k0.TAB;ARG=k0.ARG;
 return out}
UPSCSUITE.suiteName="UPSC CSE Economics";
EXTRA_SUITES.push(UPSCSUITE);
