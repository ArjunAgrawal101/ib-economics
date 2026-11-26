/* ═══════════════════════════════════════════════════════════════════════════
   THE INDIAN ECONOMY · the book and its Digital Revision Companion
   A new academic publication by Arjun Agrawal (First Edition, 2026-27). This module
   gives it a home at #/book (the book) and #/book/digital-revision-companion
   (the companion), a feature on the shared home page, a place in the header,
   the Resources menu, the drawer and search, and a preview that uses the
   handbook library's reader (thumbnails, zoom, full screen, keyboard, swipe).

   Every fact below comes from the book itself (its cover, copyright page and
   Contents at a Glance, read from the supplied PDF) or from the owner's brief
   (the 641 numbered pages, the 706 PDF pages, the companion's 254 pages and
   its features). Price, publisher and ISBN are not set: the book says they
   are "to be confirmed" and "to be assigned", so the site invites an enquiry
   and sells nothing. The preview shows only the pages chosen in
   tools/book/preview-pages.json, as images (BOOK_PV, generated); no PDF of
   the book or of the companion is in the repository or linked from the site.
   ═══════════════════════════════════════════════════════════════════════════ */
SECTIONS.push({v:"book",n:"The Indian Economy",tabs:["The Indian Economy","Digital Revision Companion"]});
FX_SHARED.add("book");   /* the book belongs to neither pathway: it serves several examinations and university study */

const BK={
 title:"The Indian Economy",
 sub:"A Comprehensive Academic and Examination Reference",
 edition:"First Edition | 2026-27",
 credit:"Authored and compiled by Arjun Agrawal",
 line:"Concepts | Institutions | Policies | Sectors | Contemporary Challenges",
 intro:"An integrated academic and examination reference designed to help readers understand India's economy through its concepts, institutions, policies, sectors and contemporary challenges.",
 audiences:["UPSC CSE","State PCS","RBI Grade B (General)","Undergraduate","Postgraduate"],
 pages:641,pdfPages:706,parts:8,chapters:153,units:13,
 /* the copyright page's own words */
 scope:"The book covers the economics components of these examinations and courses, not their complete syllabi.",
 currency:"Information incorporated through November 2026.",
 isbn:"To be assigned at publication",
 publisher:"To be confirmed by the publisher",
 /* the free resource library, as printed on the copyright page and at the end of every unit */
 lib:{url:"https://q.me-qr.com/48usv7rt",host:"q.me-qr.com/48usv7rt"}
};
/* The Contents at a Glance (page vii): eight Parts, 153 chapters numbered
   continuously, thirteen units, then the reference tools. Pages are printed
   page numbers; a Part ends where the next begins. The chapters named under
   each Part are a selection from the Detailed Contents. */
const BK_PARTS=[
 {n:1,w:"One",t:"Foundations and Measurement of the Economy",p:1,ch:[1,22],
  units:[["1.1","Introduction to Economics",2],["1.2","National Income Accounting and Macroeconomic Aggregates",43]],
  key:["Scarcity, choice and opportunity cost","Demand, supply and elasticity","Efficiency, equity and market failure","The circular flow of income","India's National Accounts, base 2022-23","GDP, growth and development"]},
 {n:2,w:"Two",t:"The Indian Economy: Structure, Evolution and Development Strategy",p:77,ch:[23,33],
  units:[["","Structure, Evolution, Planning, Reforms and Development Strategy",78]],
  key:["The colonial economic legacy","Economic ideas and development models","Economic planning in India, 1950-2017","The economic reforms of 1991","From the Planning Commission to NITI Aayog","India's development challenges"]},
 {n:3,w:"Three",t:"Money, Monetary Policy and Price Stability",p:121,ch:[34,55],
  units:[["3.1","Money and Monetary Policy",122],["3.2","Inflation and Price Stability",164]],
  key:["The Reserve Bank of India","The monetary policy framework","Instruments and transmission of monetary policy","Foundations, types and causes of inflation","Global inflation and emerging challenges"]},
 {n:4,w:"Four",t:"India's Financial System",p:211,ch:[56,80],
  units:[["4.1","Banking and Financial Institutions",212],["4.2","Financial Markets and Instruments",269]],
  key:["The structure and types of banks in India","Financial institutions and regulation","Financial instruments and securities","Corporate debt and bond markets"]},
 {n:5,w:"Five",t:"Public Finance and Fiscal Governance",p:309,ch:[81,103],
  units:[["5.1","Taxation and Public Revenue",310],["5.2","Fiscal Policy and Budget Management",361]],
  key:["India's tax structure","Direct, indirect, international and digital taxation","Fiscal policy and the fiscal stance","Deficits, public debt and debt management","The FRBM framework and fiscal consolidation"]},
 {n:6,w:"Six",t:"The External Sector and Global Economic Architecture",p:417,ch:[104,127],
  units:[["6.1","Balance of Payments and International Trade",418],["6.2","Global Economic Institutions and Trade Architecture",464]],
  key:["The balance of payments","Capital and financial flows","The WTO, the IMF and the World Bank Group","Regional and bilateral trade agreements","India and the global economic order"]},
 {n:7,w:"Seven",t:"Indian Agriculture and Allied Sectors",p:503,ch:[128,140],
  units:[["","Indian Agriculture and Allied Sectors",504]],
  key:["Crops, seasons and agro-ecology","Farm credit, insurance and risk","Prices, MSP, procurement and subsidies","Agricultural marketing and value chains","Food security, the PDS and buffer stocks"]},
 {n:8,w:"Eight",t:"Industry, Manufacturing, Services, Trade and Labour Markets",p:553,ch:[141,153],
  units:[["","Indian Industry, Manufacturing, Services, Trade and Labour Markets",554]],
  key:["The evolution of industrial policy in India","The services economy","Employment concepts and measurement","The four labour codes and social security","Government schemes and policy architecture"]}
];
const BK_TOOLS=[["Master Glossary",611],["Master Formula Index",626],["Master Revision Navigator",632],["Topic Connections",634],["Master Subject Index",641]];
const BK_MAPS=[["Master Systems Map","xxi"],["Master UPSC Syllabus Map","xxii"],["Reader and Course Alignment Map","xxv"]];
const BK_REFSTART=611;
function bkPartEnd(i){return i<BK_PARTS.length-1?BK_PARTS[i+1].p-1:BK_REFSTART-1}
function bkChapters(P){return P.ch[1]-P.ch[0]+1}

const BK_COMP={
 title:"The Indian Economy",name:"Digital Revision Companion",
 sub:"An Integrated Revision Resource for Competitive Examinations and University Study.",
 edition:"First Edition | 2026-27",units:13,pdfPages:254,
 /* the brief's list, grouped by what the reader is doing */
 groups:[
  ["Revise",["Integrated mindmaps","One-page rapid revision","Master comparison tables","Formula sheets","Glossaries"]],
  ["Prelims",["High-yield Prelims facts","Common Prelims traps","PYQ linkage","Original practice MCQs"]],
  ["Mains",["Mains answer frameworks","Model answers","Diagrams for Mains answers"]],
  ["Beyond the examination",["Current developments trackers","University Study Extensions"]]]
};
function bkCompFeatures(){return BK_COMP.groups.reduce((a,g)=>a.concat(g[1]),[])}

/* ── the preview: images only, each with its printed page number ─────────── */
function bkPv(key){try{return (BOOK_PV[key]&&BOOK_PV[key].pv)||[]}catch(e){return []}}
function bkCoverImg(){try{return BOOK_PV.book.cover||null}catch(e){return null}}
/* the reader's list: the cover first, then the chosen pages */
function bkReaderPages(key){
 const pv=bkPv(key);if(key!=="book")return pv;
 const c=bkCoverImg();return c?[{p:"Cover",kind:"cover",cap:"The front cover of the First Edition, 2026-27.",src:c.src,w:c.w,h:c.h,sm:c.sm}].concat(pv):pv;
}
function bkHasCompanionPages(){return bkPv("companion").length>0}
Object.assign(HL_KIND,{cover:"The cover",map:"Revision map",numerical:"A worked example",data:"Data on the Indian economy",contents:"Contents at a glance",chapter:"A chapter opening"});
function bkPageWord(p){return p.p==="Cover"?"The cover":"Page "+p.p}
/* the printed folio as printed: roman numerals stay lower case even where the label is set in capitals */
function bkPageWordH(p){return p.p==="Cover"?"The cover":`Page <span class="bk-pn">${esc(p.p)}</span>`}
/* the library's reader takes a "volume"; the book and the companion are given to it in that shape */
function bkVolume(id){
 const key=id==="bk-companion"?"companion":id==="bk-book"?"book":null;if(!key)return null;
 const pv=bkReaderPages(key);
 const isBook=key==="book",total=isBook?BK.pages:BK_COMP.pdfPages;
 return {id,n:"",num:0,title:isBook?BK.title:BK_COMP.title+": "+BK_COMP.name,category:isBook?"A new academic publication":"Free digital revision resource",pages:total,pv,
  kicker:isBook?`${BK.edition} · Look inside`:`${BK_COMP.edition} · Look inside`,
  pos:(p,i,n)=>isBook?`<b>${bkPageWordH(p)}</b>${p.p==="Cover"?"":` of ${BK.pages} numbered pages`}<span class="hl-sep" aria-hidden="true">·</span>preview ${i+1} of ${n}`
   :`<b>${bkPageWordH(p)}</b><span class="hl-sep" aria-hidden="true">·</span>preview ${i+1} of ${n}`,
  alt:p=>`${bkPageWord(p)} of ${isBook?BK.title+", "+BK.edition:BK_COMP.title+": "+BK_COMP.name}. ${HL_KIND[p.kind]||""}: ${p.cap}`,
  strip:p=>p.p==="Cover"?"Cover":"p. "+p.p,
  buy:()=>isBook?`<span class="hl-vw-price">Price and publisher to be confirmed</span><a class="hl-btn hl-buy sm" href="${esA(bkMail())}">Enquire about purchasing</a>`
   :`<span class="hl-vw-price">Free · no login</span>${fxSisterLink({url:BK.lib.url,name:"Open the resource library"},"hl-btn hl-buy sm")}`};
}
(function(){
 if(typeof hlVol!=="function")return;
 const prev=hlVol;
 hlVol=function(id){return bkVolume(id)||prev(id)};
})();
function bkOpen(key,i,zoom){
 const ok=hlOpenViewer("bk-"+(key==="companion"?"companion":"book"),i|0);
 if(ok&&zoom){try{hlvZoomTo(1)}catch(e){}}
 return ok;
}

/* ── enquiries: the published contact details, never new ones ──────────── */
FX_ENQ.book={path:"shared",label:"The Indian Economy (book)",subject:"The Indian Economy: book purchase enquiry",
 msg:"Hello Arjun, I am interested in purchasing The Indian Economy: A Comprehensive Academic and Examination Reference (First Edition, 2026-27). Please share the availability and purchasing details."};
function bkMail(){return fxEnquiryLinks("book").mail}
function bkWa(){return fxEnquiryLinks("book").wa}
function bkEnquiry(id){
 return `<section class="bk-enq" aria-labelledby="${id}"><div class="fx-wrap bk-enq-in">
  <div><p class="fx-kicker">Purchasing</p><h2 class="bk-h2" id="${id}">Interested in purchasing the book?</h2>
   <p class="bk-enq-d">Write to me to enquire about availability and purchasing details.</p>
   <p class="bk-enq-n">The price, the publisher and the ISBN have not yet been confirmed, so nothing is sold or charged on this site. Your enquiry opens your own email or WhatsApp with the message written for you.</p></div>
  <div class="bk-enq-a">
   <a class="fx-btn primary" href="${esA(bkMail())}">Enquire by email ${fxArr()}</a>
   <a class="fx-btn secondary" href="${esA(bkWa())}" target="_blank" rel="noopener noreferrer">Contact on WhatsApp <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a>
   <p class="bk-enq-c"><a class="fx-a" href="${esA("mailto:"+FX_CONTACT.email())}">${esc(FX_CONTACT.email())}</a><span aria-hidden="true"> · </span><a class="fx-a" href="${esA(fxTel())}">${esc(FX_CONTACT.phone())}</a></p></div>
 </div></section>`;
}

/* ── the book as an object: a cover drawn in three dimensions, never stretched ── */
function bkMockup(cls,eager){
 const c=bkCoverImg();if(!c)return "";
 return `<div class="bk3d ${cls||""}"><div class="bk3d-b">
  <img class="bk3d-f" src="${esA(c.src)}" srcset="${esA(c.sm.src)} ${c.sm.w}w, ${esA(c.src)} ${c.w}w" sizes="(max-width:700px) 62vw, 380px" width="${c.w}" height="${c.h}" alt="The Indian Economy, First Edition 2026-27: the front cover" ${eager?"":'loading="lazy" '}decoding="async">
  <span class="bk3d-s" aria-hidden="true"><b>The Indian Economy</b><i>Arjun Agrawal</i></span><span class="bk3d-sh" aria-hidden="true"></span></div></div>`;
}
function bkAudience(){return `<ul class="bk-aud" aria-label="Written for">${BK.audiences.map(a=>`<li>${esc(a)}</li>`).join("")}</ul>`}
function bkFacts(){
 const f=[[BK.pages,"numbered pages"],[BK.parts,"Parts"],[BK.chapters,"chapters"],[BK.units,"units"]];
 return `<dl class="bk-facts">${f.map(([n,l])=>`<div><dt>${esc(l)}</dt><dd>${n}</dd></div>`).join("")}</dl>`;
}

/* ── the contents map: the breadth of the book at a glance ──────────────── */
function bkSpine(){
 /* one bar for the numbered pages, each Part as wide as its share of them */
 const total=BK_REFSTART-1+(BK.pages-BK_REFSTART+1);
 return `<div class="bk-spine" aria-hidden="true">${BK_PARTS.map((P,i)=>`<span class="bk-sp p${P.n}" style="flex:${bkPartEnd(i)-P.p+1}"><i>${P.n}</i></span>`).join("")}<span class="bk-sp ref" style="flex:${total-BK_REFSTART+1}"><i>R</i></span></div>`;
}
function bkMap(full){
 return `<div class="bk-map">
  ${bkSpine()}
  <ol class="bk-parts${full?" full":""}">${BK_PARTS.map((P,i)=>`<li class="bk-part p${P.n}">
   <div class="bk-pt-top"><span class="bk-pt-n">Part ${esc(P.w)}</span><span class="bk-pt-pp">pp. ${P.p}-${bkPartEnd(i)}</span></div>
   <h3 class="bk-pt-t">${esc(P.t)}</h3>
   <p class="bk-pt-m">${bkChapters(P)} chapters · Ch. ${P.ch[0]}-${P.ch[1]}${P.units.length>1?` · Units ${P.units.map(u=>u[0]).join(" and ")}`:""}</p>
   ${full?`<ul class="bk-pt-k">${P.key.map(k=>`<li>${esc(k)}</li>`).join("")}</ul>`:""}
  </li>`).join("")}</ol>
  ${full?`<div class="bk-tools"><div><h3 class="bk-h3">Navigation maps</h3><ul>${BK_MAPS.map(([t,p])=>`<li><span>${esc(t)}</span><b>p. ${esc(p)}</b></li>`).join("")}</ul></div>
   <div><h3 class="bk-h3">Reference tools</h3><ul>${BK_TOOLS.map(([t,p])=>`<li><span>${esc(t)}</span><b>p. ${p}</b></li>`).join("")}</ul></div></div>`:""}
 </div>`;
}

/* ── the chapter explorer: choose a Part, read its units and chapters ─────
   Chapter titles and first pages are the book's own (51-book-chapters.js, from
   the Detailed Contents); each chapter belongs to the unit whose first page it
   follows. The revision compendium that closes every unit is marked as such. */
function bkPartChapters(P){
 const cs=(typeof BK_CHAPTERS!=="undefined"?BK_CHAPTERS:[]).filter(c=>c[0]>=P.ch[0]&&c[0]<=P.ch[1]);
 return P.units.map((u,k)=>{const next=P.units[k+1];return {u,cs:cs.filter(c=>c[2]>=u[2]&&(!next||c[2]<next[2]))}});
}
function bkExplorer(){
 if(typeof BK_CHAPTERS==="undefined"||!BK_CHAPTERS.length)return "";
 const P=BK_PARTS.find(x=>x.n===BKX.p)||BK_PARTS[0],i=BK_PARTS.indexOf(P);
 return `<div class="bk-ex" id="bk-ex">
  <h3 class="bk-h3" id="bk-ex-h">Explore the chapters</h3>
  <div class="bk-ex-tabs" role="group" aria-labelledby="bk-ex-h">${BK_PARTS.map(x=>`<button type="button" class="bk-ex-t p${x.n}${x.n===P.n?" on":""}" aria-pressed="${x.n===P.n}" aria-controls="bk-ex-panel" onclick="bkExPart(${x.n})"><span>Part ${esc(x.w)}</span><b>${esc(x.t)}</b></button>`).join("")}</div>
  <div class="bk-ex-panel p${P.n}" id="bk-ex-panel" aria-live="polite">
   <p class="bk-ex-meta"><b>Part ${esc(P.w)}: ${esc(P.t)}</b><span>pp. ${P.p}-${bkPartEnd(i)} · Chapters ${P.ch[0]}-${P.ch[1]}</span></p>
   ${bkPartChapters(P).map(({u,cs})=>`<div class="bk-ex-u"><p class="bk-ex-uh">${P.units.length>1||u[0].includes(".")?`<span>Unit ${esc(u[0])}</span>`:""}${esc(u[1])}</p>
    <ol class="bk-ex-l">${cs.map(c=>`<li class="${/Revision Compendium/.test(c[1])?"rc":""}"><span class="bk-ex-n">${c[0]}</span><span class="bk-ex-c">${esc(c[1])}${/Revision Compendium/.test(c[1])?' <em>the unit\'s revision compendium</em>':""}</span><span class="bk-ex-p">p. ${c[2]}</span></li>`).join("")}</ol></div>`).join("")}
   <p class="bk-ex-note">In the book's words: sections marked DC belong to the revision compendiums and are published in full in the Digital Revision Companion.</p>
  </div>
 </div>`;
}
function bkExPart(n){BKX.p=n;const el=document.getElementById("bk-ex");if(!el)return;el.outerHTML=bkExplorer();
 const b=document.querySelector(`#bk-ex .bk-ex-t.p${n}`);if(b)try{b.focus({preventScroll:true})}catch(e){}}

/* ── the inline look inside: a page at reading width, thumbnails, the reader ── */
const BKV={key:"book",i:1};
const BKX={p:1};
function bkLook(){
 const key=BKV.key,pv=bkReaderPages(key);if(!pv.length)return "";
 const i=Math.max(0,Math.min(pv.length-1,BKV.i)),p=pv[i];
 const sw=bkHasCompanionPages()?`<div class="bk-lk-sw" role="group" aria-label="Choose a preview">${[["book","The book"],["companion","The companion"]].map(([k,n])=>`<button type="button" class="${k===key?"on":""}" aria-pressed="${k===key}" onclick="bkLkKey('${k}')">${n}</button>`).join("")}</div>`:"";
 return `<div class="bk-look" id="bk-look">
  ${sw}
  <div class="bk-lk-main">
   <button type="button" class="bk-lk-nav prev" onclick="bkLkGo(BKV.i-1)" aria-label="Previous page"${i<=0?" disabled":""}>${hlIc("prev")}</button>
   <figure class="bk-lk-fig">
    <button type="button" class="bk-lk-open" onclick="bkOpen(BKV.key,BKV.i)" aria-label="${esA(`Open ${bkPageWord(p).toLowerCase()} in the reading view`)}">
     <img id="bk-lk-img" src="${esA(p.src)}" srcset="${esA(p.sm.src)} ${p.sm.w}w, ${esA(p.src)} ${p.w}w" sizes="(max-width:760px) 88vw, 620px" width="${p.w}" height="${p.h}" alt="${esA(bkVolume("bk-"+key).alt(p))}" decoding="async"></button>
    <figcaption id="bk-lk-cap"><b>${bkPageWordH(p)}</b><span class="bk-lk-k">${esc(HL_KIND[p.kind]||"")}</span><span class="bk-lk-c">${esc(p.cap)}</span></figcaption>
   </figure>
   <button type="button" class="bk-lk-nav next" onclick="bkLkGo(BKV.i+1)" aria-label="Next page"${i>=pv.length-1?" disabled":""}>${hlIc("next")}</button>
  </div>
  <div class="bk-lk-tools"><button type="button" class="fx-btn secondary sm" onclick="bkOpen(BKV.key,BKV.i,true)">${hlIc("in")} Zoom in to read</button>
   <button type="button" class="fx-btn secondary sm" onclick="bkOpen(BKV.key,BKV.i)">${hlIc("full")} Open the reading view</button>
   <span class="bk-lk-pos" id="bk-lk-pos">${i+1} of ${pv.length}</span></div>
  <ol class="bk-lk-strip" aria-label="Preview pages">${pv.map((q,k)=>`<li><button type="button" onclick="bkLkGo(${k})"${k===i?' aria-current="page"':""} aria-label="${esA(`${bkPageWord(q)}: ${HL_KIND[q.kind]||""}`)}"><img src="${esA(q.sm.src)}" width="${q.sm.w}" height="${q.sm.h}" alt="" loading="lazy" decoding="async"><span>${esc(q.p==="Cover"?"Cover":"p. "+q.p)}</span></button></li>`).join("")}</ol>
  <p class="bk-lk-note">A selection of ${pv.length} pages, shown as they are printed. The complete book is not available on this website.</p>
 </div>`;
}
function bkLkKey(k){BKV.key=k;BKV.i=k==="book"?1:0;const el=document.getElementById("bk-look");if(el)el.outerHTML=bkLook()}
function bkLkGo(i){
 const pv=bkReaderPages(BKV.key);if(i<0||i>=pv.length)return;BKV.i=i;const p=pv[i];
 const img=document.getElementById("bk-lk-img");if(!img){return}
 const v=bkVolume("bk-"+BKV.key);
 img.srcset=`${p.sm.src} ${p.sm.w}w, ${p.src} ${p.w}w`;img.src=p.src;img.width=p.w;img.height=p.h;img.alt=v.alt(p);
 img.parentNode.setAttribute("aria-label",`Open ${bkPageWord(p).toLowerCase()} in the reading view`);
 document.getElementById("bk-lk-cap").innerHTML=`<b>${bkPageWordH(p)}</b><span class="bk-lk-k">${esc(HL_KIND[p.kind]||"")}</span><span class="bk-lk-c">${esc(p.cap)}</span>`;
 document.getElementById("bk-lk-pos").textContent=`${i+1} of ${pv.length}`;
 const root=document.getElementById("bk-look");
 root.querySelector(".bk-lk-nav.prev").disabled=i<=0;root.querySelector(".bk-lk-nav.next").disabled=i>=pv.length-1;
 root.querySelectorAll(".bk-lk-strip button").forEach((b,k)=>{if(k===i)b.setAttribute("aria-current","page");else b.removeAttribute("aria-current")});
 const cur=root.querySelector(".bk-lk-strip [aria-current]");if(cur&&cur.scrollIntoView){try{cur.scrollIntoView({block:"nearest",inline:"nearest"})}catch(e){}}
}

/* ── the companion ─────────────────────────────────────────────────────── */
function bkCompLink(cls,label){return fxSisterLink({url:BK.lib.url,name:label||"Open the free resource library"},cls||"fx-btn primary")}
function bkCompanion(id,head){
 return `<section class="bk-comp" aria-labelledby="${id}"><div class="fx-wrap">
  <div class="bk-comp-head">
   <div><p class="fx-kicker bk-gold">${head||"Free with the book"}</p>
    <h2 class="bk-h2" id="${id}"><span class="bk-t-s">${esc(BK_COMP.title)}</span> ${esc(BK_COMP.name)}</h2>
    <p class="bk-comp-sub">${esc(BK_COMP.sub)}</p><p class="bk-ed">${esc(BK_COMP.edition)}</p>
    <p class="bk-comp-rel"><span>The book builds comprehensive understanding.</span> <span>The companion supports structured revision and examination practice.</span></p></div>
   <dl class="bk-facts on-dark"><div><dt>units</dt><dd>${BK_COMP.units}</dd></div><div><dt>PDF pages</dt><dd>${BK_COMP.pdfPages}</dd></div><div><dt>to read</dt><dd>Free</dd></div></dl>
  </div>
  <div class="bk-comp-grid">${BK_COMP.groups.map(([g,items],gi)=>`<div class="bk-cg rv" style="--i:${gi}"><h3 class="bk-cg-h">${esc(g)}</h3><ul>${items.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`).join("")}</div>
  <div class="bk-comp-foot">
   <p>A free digital revision resource that accompanies the book: the complete revision compendium of every unit, with University Study Extensions, its section numbers the same as in the book. Read and download it online, without a login, from the author's free resource library, the address printed in the book.</p>
   <p class="bk-comp-a">${bkCompLink("fx-btn primary","Open the free resource library")}<span class="bk-comp-url">${esc(BK.lib.host)}</span></p>
  </div>
 </div></section>`;
}

/* ── the book page and the companion page ──────────────────────────────── */
function bkHero(){
 return `<section class="bk-hero" aria-labelledby="bk-page-h"><div class="fx-wrap bk-hero-in">
  <div class="bk-hero-t">
   <p class="fx-kicker bk-gold">A new academic publication</p>
   <h1 class="bk-title" id="bk-page-h">${esc(BK.title)}</h1>
   <p class="bk-sub">${esc(BK.sub)}</p>
   <p class="bk-ed">${esc(BK.edition)}</p>
   <p class="bk-by"><span class="bk-by-k">Author</span> Arjun Agrawal</p>
   <p class="bk-intro">${esc(BK.intro)}</p>
   ${bkAudience()}
   <p class="bk-cta"><a class="fx-btn primary" href="#bk-look-h" onclick="return bkJump('bk-look-h')">Look inside ${fxArr()}</a><a class="fx-btn secondary on-dark" href="#bk-buy-h" onclick="return bkJump('bk-buy-h')">Enquire about purchasing</a></p>
  </div>
  <div class="bk-hero-v">${bkMockup("lg",true)}</div>
 </div></section>`;
}
function bkJump(id){const e=document.getElementById(id);if(e){try{e.scrollIntoView({behavior:hlReduced()?"auto":"smooth",block:"start"})}catch(x){e.scrollIntoView()}}return false}
function bkAbout(){
 return `<section class="bk-sec bk-about" aria-labelledby="bk-about-h"><div class="fx-wrap bk-about-g">
  <div><p class="fx-kicker">The book</p><h2 class="bk-h2" id="bk-about-h">Concepts, institutions, policies and sectors, in one connected reference</h2>
   <p class="bk-p">${esc(BK.line)}. The book follows India's economy from the foundations of economic reasoning and national income measurement through money, the financial system, public finance and the external sector to agriculture, industry, services and labour, and every unit ends in a Prelims and Mains Revision Compendium.</p>
   <p class="bk-p">Designed for competitive examination preparation and university-level study.</p></div>
  <div class="bk-about-f">${bkFacts()}
   <ul class="bk-detail">
    <li><span>Author</span><b>${esc(BK.credit)}</b></li>
    <li><span>Edition</span><b>${esc(BK.edition)}</b></li>
    <li><span>Pages</span><b>${BK.pages} numbered pages. The PDF edition has ${BK.pdfPages} pages, including the front matter and unnumbered pages.</b></li>
    <li><span>Currency</span><b>${esc(BK.currency)}</b></li>
    <li><span>ISBN</span><b>${esc(BK.isbn)}</b></li>
    <li><span>Publisher and price</span><b>${esc(BK.publisher)}</b></li></ul></div>
 </div></section>`;
}
function bkLookSec(){
 return `<section class="bk-sec bk-look-sec" aria-labelledby="bk-look-h"><div class="fx-wrap">
  <header class="bk-sec-head"><p class="fx-kicker">Look inside</p><h2 class="bk-h2" id="bk-look-h">Browse selected pages</h2>
   <p class="bk-p">The contents at a glance, the Master Systems Map, the UPSC syllabus map, a chapter as it opens, an explanation with its diagrams, a policy analysis, market failure drawn, a revision mind map, a worked national-income exercise and current Indian data, chosen to show the range of the book.</p></header>
  ${bkLook()}
 </div></section>`;
}
function bkMapSec(){
 return `<section class="bk-sec bk-map-sec" aria-labelledby="bk-map-h"><div class="fx-wrap">
  <header class="bk-sec-head"><p class="fx-kicker">What the book covers</p><h2 class="bk-h2" id="bk-map-h">Eight Parts, 153 chapters, one economy</h2>
   <p class="bk-p">The bar is the book: each Part is as wide as its share of the numbered pages.</p></header>
  ${bkMap(true)}
  ${bkExplorer()}
  <p class="bk-scope"><b>Scope.</b> Written for UPSC CSE, State PCS and RBI Grade B (General) candidates and for undergraduate and postgraduate study of the Indian economy. ${esc(BK.scope)} The Reader and Course Alignment Map (page xxv) shows what each group of readers should add from other sources.</p>
 </div></section>`;
}
function bkLinks(){
 return `<section class="bk-sec bk-next" aria-labelledby="bk-next-h"><div class="fx-wrap">
  <h2 class="bk-h3" id="bk-next-h">Continue on the platform</h2>
  <ul class="bk-next-l">
   <li><a class="fx-a" href="#/upsc"><b>UPSC CSE Economics</b><span>The syllabus, topic resources, current affairs and the online course</span></a></li>
   <li><a class="fx-a" href="${esA(fxHref("upsc",(typeof UP_T!=="undefined"&&UP_T.handbooks)||3))}"><b>The Handbook Library</b><span>Eleven topic volumes for the Economics of General Studies</span></a></li>
   <li><a class="fx-a" href="#/concepts"><b>One concept, two perspectives</b><span>Shared concepts seen from both pathways</span></a></li>
   <li><a class="fx-a" href="#/about"><b>About the author</b><span>Arjun Agrawal</span></a></li></ul>
 </div></section>`;
}
function bkCompPage(){
 return `<section class="bk-hero comp" aria-labelledby="bk-page-h"><div class="fx-wrap bk-hero-in">
  <div class="bk-hero-t">
   <p class="fx-kicker bk-gold">Free with the book</p>
   <h1 class="bk-title" id="bk-page-h"><span class="bk-t-s">${esc(BK_COMP.title)}</span> ${esc(BK_COMP.name)}</h1>
   <p class="bk-sub">${esc(BK_COMP.sub)}</p><p class="bk-ed">${esc(BK_COMP.edition)}</p>
   <p class="bk-intro">The revision and practice layer of <i>The Indian Economy</i>: thirteen units, one for each unit of the book, with the same section numbers, so a reader can move between the two without searching.</p>
   <p class="bk-cta">${bkCompLink("fx-btn primary","Open the free resource library")}<a class="fx-btn secondary on-dark" href="#/book">About the book ${fxArr()}</a></p>
  </div>
  <div class="bk-hero-v">${bkMockup("lg",true)}</div>
 </div></section>
 ${bkCompanion("bk-comp-h","What it contains")}
 ${bkEnquiry("bk-buy-h")}`;
}
/* ── the author, on the book page: the same facts as the home page and About ── */
function bkAuthor(){
 let por="";try{por=`<img src="${esA(CV_PORTRAIT.src)}" width="${CV_PORTRAIT.w}" height="${CV_PORTRAIT.h}" alt="${esA(CV_PORTRAIT.alt)}" loading="lazy" decoding="async">`}catch(e){}
 const bio=typeof FX_AUTHOR_BIO==="string"?FX_AUTHOR_BIO:"";
 return `<section class="bk-sec bk-author" aria-labelledby="bk-author-h"><div class="fx-wrap bk-author-g">
  <figure class="bk-author-p">${por}</figure>
  <div><p class="fx-kicker">The author</p><h2 class="bk-h2" id="bk-author-h">Arjun Agrawal</h2>
   <p class="bk-author-r">${esc(typeof FXI!=="undefined"?FXI.roles:"")}</p>
   <p class="bk-p">${esc(bio)}</p>
   <blockquote class="bk-author-q">“I have always believed that meaningful learning rests on three closely related elements: Concepts, Content and Contexts.”<cite>From the preface</cite></blockquote>
   <p class="bk-cta"><a class="fx-btn secondary" href="#/about">About Arjun Agrawal ${fxArr()}</a></p></div>
 </div></section>`;
}
VIEWS.book=function(){
 if(TAB===1)return `<div class="bkpage">${bkCompPage()}</div>`;
 return `<div class="bkpage">${bkHero()}${bkAbout()}${bkAuthor()}${bkLookSec()}${bkMapSec()}${bkCompanion("bk-comp-h")}${bkEnquiry("bk-buy-h")}${bkLinks()}</div>`;
};

/* ── on the shared home page ───────────────────────────────────────────── */
function bkHomeFeature(){
 const pv=bkReaderPages("book"),pick=["xxi","16","39","58"].map(n=>pv.findIndex(p=>p.p===n)).filter(i=>i>=0);
 return `<section class="fx-section bk-home" aria-labelledby="bk-h"><div class="fx-wrap">
  <div class="bk-home-g">
   <div class="bk-home-v rv">${bkMockup("md")}</div>
   <div class="bk-home-t">
    <p class="fx-kicker">A new academic publication</p>
    <h2 class="bk-title md" id="bk-h">${esc(BK.title)}</h2>
    <p class="bk-sub">${esc(BK.sub)}</p>
    <p class="bk-ed">${esc(BK.edition)} <span aria-hidden="true">·</span> ${esc(BK.credit)}</p>
    <p class="bk-intro">${esc(BK.intro)}</p>
    ${bkAudience()}
    <ul class="bk-points">
     <li><b>${BK.pages}</b> numbered book pages</li>
     <li><b>First Edition</b>, 2026-27</li>
     <li>A comprehensive treatment of Indian economic concepts, institutions, policies and sectors</li>
     <li>Designed for competitive examination preparation and university-level study</li></ul>
    <p class="bk-cta"><a class="fx-btn primary" href="#/book">Explore the book ${fxArr()}</a><button type="button" class="fx-btn secondary" onclick="bkOpen('book',1)">Look inside</button><a class="fx-link" href="${esA(bkMail())}">Enquire about purchasing</a></p>
   </div>
  </div>
  <div class="bk-home-look rv"><p class="bk-mini-k">Inside the book</p><ul class="bk-thumbs">${pick.map(i=>{const p=pv[i];return `<li><button type="button" onclick="bkOpen('book',${i})" aria-label="${esA(`Look inside: page ${p.p}, ${HL_KIND[p.kind]||""}`)}"><img src="${esA(p.sm.src)}" width="${p.sm.w}" height="${p.sm.h}" alt="Page ${esA(p.p)} of The Indian Economy: ${esA(p.cap)}" loading="lazy" decoding="async"><span>p. ${esc(p.p)} · ${esc(HL_KIND[p.kind]||"")}</span></button></li>`}).join("")}</ul></div>
  <div class="bk-home-map rv"><p class="bk-mini-k">Eight Parts · ${BK.chapters} chapters</p>${bkMap(false)}
   <p class="bk-scope sm">${esc(BK.scope)}</p></div>
 </div></section>`;
}
function bkHomeCompanion(){
 return bkCompanion("dc-h","Free with the book").replace('class="bk-comp"','class="bk-comp on-home"');
}

/* ── the header, the drawer and the Resources menu ─────────────────────── */
const FX_RESNAV=[
 {k:"up",n:"For UPSC CSE and university study",items:[
  ["The Indian Economy (book)","#/book","The new academic reference"],
  ["Digital Revision Companion","#/book/digital-revision-companion","Free revision for every unit"],
  ["Economics Handbooks",()=>fxHref("upsc",(typeof UP_T!=="undefined"&&UP_T.handbooks)||3),"Eleven volumes at ₹99 each"],
  ["UPSC topic resources",()=>fxHref("upsc",(typeof UP_T!=="undefined"&&UP_T.resources)||2),"Free topic previews and diagrams"]]},
 {k:"ib",n:"For IB DP Economics",items:[
  ["Resource hub",["resources",null],"Handbooks, question banks and revision"],
  ["Question banks",["practise","Question bank"],"By unit, command term and paper"],
  ["Revision resources",["practise","Ten-minute revision"],"Short, targeted revision"],
  ["Economics in 60 Seconds",["learn","Economics in 60 Seconds"],"Ten-page visual issues"],
  ["Learning Studio",["studio",null],"Visual explainers, guides and collections"]]}
];
function fxResGroups(){
 return FX_RESNAV.map(g=>({...g,items:g.items.map(([n,h,d])=>{
  let href=h;
  if(typeof h==="function")href=h();
  else if(Array.isArray(h)){const t=fxTabIndex(h[0],h[1]);if(t<0)return null;href=fxHref(h[0],t)}
  return {n,href,d}}).filter(Boolean)}));
}
function fxResPanelHtml(){
 return `<div class="fxp-head"><div><div class="fx-kicker">Resources</div><div class="fxp-title">Books, handbooks and revision</div></div>
  <a class="fx-btn primary" href="#/book" data-fxclose>The Indian Economy <span class="arr" aria-hidden="true">→</span></a></div>
  <div class="fxp-grid res">${fxResGroups().map(g=>`<section class="fxp-col" aria-labelledby="fxp-r-${g.k}"><h3 class="fxp-h" id="fxp-r-${g.k}">${esc(g.n)}</h3><ul class="fxp-list one">${g.items.map(i=>
   `<li><a class="fx-a" href="${esA(i.href)}" data-fxclose><b>${esc(i.n)}</b><span>${esc(i.d)}</span></a></li>`).join("")}</ul></section>`).join("")}</div>`;
}
(function(){
 const prev=fxPanelHtml;
 fxPanelHtml=function(k){return k==="res"?fxResPanelHtml():prev(k)};
 const place=fxPlacePanel;
 fxPlacePanel=function(){
  place();
  if(FXDD.open!=="res")return;
  const p=document.getElementById("fxpanel"),b=FXDD.btn;if(!p||!b)return;
  const r=b.getBoundingClientRect(),vw=document.documentElement.clientWidth,w=Math.min(760,vw-24);
  p.style.width=w+"px";p.style.left=Math.max(12,Math.min(vw-w-12,r.left+r.width/2-w/2))+"px";
 };
 /* the header gains The Indian Economy and Resources, between the pathways and About */
 const paint=fxPaintShell;
 fxPaintShell=function(){
  const r=paint.apply(this,arguments);
  try{
   const g=document.getElementById("gnav");if(!g||g.querySelector(".gn-book"))return r;
   const about=[...g.querySelectorAll("a.gn-item")].find(a=>a.getAttribute("href")==="#/about");if(!about)return r;
   const on=VIEW==="book";
   const t=document.createElement("template");
   t.innerHTML=`<a class="gn-item gn-book${on?" on":""}" href="#/book"${on?' aria-current="page"':""}><span class="gn-book-l">The Indian Economy</span><span class="gn-book-tag" aria-hidden="true">Book</span><span class="sr-only"> (book)</span></a><button type="button" class="gn-res" aria-expanded="false" aria-controls="fxpanel" data-label="Resources" aria-label="Resources" onclick="fxTogglePanel('res',this,event)">Resources<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></button>`;
   g.insertBefore(t.content,about);
   /* the definitive order: … The Indian Economy · Resources · Academic Ecosystem · About */
   const eco=g.querySelector("button.gn-eco");if(eco)g.insertBefore(eco,about);
   /* the pathways' names shorten on a narrow desktop; the word Economics stays for screen readers */
   g.querySelectorAll(".gn-path>a.fx-a").forEach(a=>{const m=/^(.*) Economics$/.exec(a.textContent.trim());if(m&&!a.querySelector(".gn-x"))a.innerHTML=`<span>${esc(m[1])}<span class="gn-x"> Economics</span></span>`});
  }catch(e){}
  return r;
 };
 const dw=fxDrawerHtml;
 fxDrawerHtml=function(){
  const h=dw.apply(this,arguments);
  const link=(href,n)=>`<a class="fx-a" href="${esA(href)}"${VIEW==="book"&&fxHref("book",TAB)===href?' aria-current="page"':""}>${esc(n)}</a>`;
  /* the book, then only what the Resources menu adds to the drawer: its other
     entries (the handbooks, the topic resources, the IB DP resources) are
     already listed under the two pathways, and are not repeated */
  const have=new Set([...h.matchAll(/href="([^"]*)"/g)].map(m=>m[1]));
  const extra=fxResGroups().flatMap(g=>g.items).filter(i=>i.href!=="#/book"&&!have.has(i.href));
  const sec=`<div class="dw-sec dw-book"><div class="dw-k">A new academic publication</div><a class="dw-main" href="#/book"${VIEW==="book"&&TAB===0?' aria-current="page"':""}>The Indian Economy <span class="dw-here">Book</span></a>${extra.length?`<div class="dw-l flat">${extra.map(i=>link(i.href,i.n)).join("")}</div>`:""}</div>`;
  const at=h.indexOf('<div class="dw-sec"><a class="dw-main" href="#/about"');
  return at<0?h+sec:h.slice(0,at)+sec+h.slice(at);
 };
 fxDrawerHtml.base=dw;
})();

/* ── search: the book, its Parts and the companion ─────────────────────── */
(function(){if(typeof buildIndex!=="function")return;const prev=buildIndex;
 buildIndex=function(){if(SIDX&&SIDX.__bk)return SIDX;const I=prev().slice(),K="The Indian Economy";
  I.push({k:K,t:"The Indian Economy (book)",d:`${BK.sub} · ${BK.edition}`,go:"nav('book',0)",s:"the indian economy book arjun agrawal academic examination reference upsc state pcs rbi grade b undergraduate postgraduate first edition 2026-27 look inside preview purchase enquiry"});
  I.push({k:K,t:"Digital Revision Companion",d:"Free revision for the thirteen units of The Indian Economy",go:"nav('book',1)",s:"digital revision companion free mindmaps rapid revision formula sheets prelims facts traps pyq mcq mains answer frameworks model answers university study extensions"});
  BK_PARTS.forEach((P,i)=>I.push({k:K,t:`Part ${P.w}: ${P.t}`,d:`The Indian Economy · pp. ${P.p}-${bkPartEnd(i)} · Chapters ${P.ch[0]}-${P.ch[1]}`,go:"nav('book',0)",s:["indian economy book part",P.w,P.t,P.units.map(u=>u[1]).join(" "),P.key.join(" ")].join(" ").toLowerCase()}));
  SIDX=I;try{Object.defineProperty(SIDX,"__bk",{value:true})}catch(e){}return SIDX};
 if(typeof RN_KIND_W!=="undefined")RN_KIND_W["The Indian Economy"]=2.2;try{SIDX=null}catch(e){}})();

/* ── self-tests ──────────────────────────────────────────────────────────── */
function BOOKSUITE(){
 const out=[];
 const T=(n,f)=>{let ok=false,det="";try{const r=f();ok=r===true||(r&&r.ok===true);if(r&&r.d)det=r.d}catch(e){det=e.message}out.push({n,ok:!!ok,detail:det})};
 const txt=h=>String(h).replace(/<[^>]+>/g," ").replace(/\s+/g," ");
 const page=t=>{const k=[VIEW,TAB,ARG];VIEW="book";TAB=t;ARG=null;try{return VIEWS.book()}finally{VIEW=k[0];TAB=k[1];ARG=k[2]}};
 const home=()=>{const k=[VIEW,TAB,ARG];VIEW="home";TAB=0;ARG=null;try{return VIEWS.home()}finally{VIEW=k[0];TAB=k[1];ARG=k[2]}};
 const all=()=>page(0)+page(1)+bkHomeFeature()+bkHomeCompanion();
 T("Book · the title, subtitle, edition and credit are the cover's",()=>{const t=txt(page(0));
  return t.includes("The Indian Economy")&&t.includes("A Comprehensive Academic and Examination Reference")&&t.includes("First Edition | 2026-27")&&t.includes("Authored and compiled by Arjun Agrawal")});
 T("Book · the readers are the five the cover names, in its order",()=>BK.audiences.join("|")==="UPSC CSE|State PCS|RBI Grade B (General)|Undergraduate|Postgraduate"&&page(0).includes(bkAudience()));
 T("Book · numbered pages and PDF pages are not confused: 641 printed, 706 in the PDF",()=>{const t=txt(page(0));
  return BK.pages===641&&BK.pdfPages===706&&t.includes("641 numbered pages")&&/PDF edition has 706 pages, including the front matter/.test(t)&&!/706 (numbered|book) pages/.test(t)});
 T("Book · eight Parts and 153 chapters, numbered continuously, with the units of the Contents at a Glance",()=>{
  let ok=BK_PARTS.length===8&&BK_PARTS[0].ch[0]===1&&BK_PARTS[7].ch[1]===153;
  BK_PARTS.forEach((P,i)=>{if(i&&P.ch[0]!==BK_PARTS[i-1].ch[1]+1)ok=false;if(i&&P.p<=BK_PARTS[i-1].p)ok=false});
  const units=BK_PARTS.reduce((a,P)=>a+P.units.length,0);
  return ok&&BK_PARTS.reduce((a,P)=>a+bkChapters(P),0)===153&&units===13&&BK.units===13&&BK_TOOLS[BK_TOOLS.length-1][1]===641});
 T("Book · the map names the eight areas of the brief",()=>{const d=document.createElement("div");d.innerHTML=bkMap(true);const t=d.textContent.replace(/\s+/g," ");
  return ["Foundations and Measurement of the Economy","The Indian Economy: Structure, Evolution and Development Strategy","Money, Monetary Policy and Price Stability","India's Financial System",
   "Public Finance and Fiscal Governance","The External Sector and Global Economic Architecture","Indian Agriculture and Allied Sectors","Industry, Manufacturing, Services, Trade and Labour Markets"].every(x=>t.includes(x))});
 T("Book · the scope is stated: the economics components, not complete syllabi",()=>txt(page(0)).includes("covers the economics components of these examinations and courses, not their complete syllabi"));
 T("Book · price, publisher and ISBN are left as the book leaves them, and nothing is sold",()=>{const t=txt(all());
  return t.includes("To be assigned at publication")&&t.includes("To be confirmed by the publisher")&&!/₹|\bRs\.?\s?\d|\bINR\b|price:\s*\d|buy now|add to cart|checkout|pay now/i.test(t)});
 T("Book · the purchase enquiry uses only the published email and number",()=>{const h=bkEnquiry("x"),l=fxEnquiryLinks("book");
  return h.includes(esA(l.mail))&&h.includes(esA(l.wa))&&l.mail.startsWith("mailto:"+FX_CONTACT.email()+"?")&&l.wa.startsWith(FX_CONTACT.wa()+"?text=")
   &&txt(h).includes("Interested in purchasing the book?")&&txt(h).includes("Write to me to enquire about availability and purchasing details.")});
 T("Book · every preview is a WebP image with its printed page number, size and caption; the cover leads",()=>{
  const pv=bkReaderPages("book");
  return pv.length>=9&&pv.length<=11&&pv[0].p==="Cover"&&pv.every(p=>/^assets\/book\/the-indian-economy\/[\w-]+\.webp$/.test(p.src)&&/\.webp$/.test(p.sm.src)&&Math.max(p.w,p.h)>=1000&&p.w>=1000&&p.cap.length>40&&HL_KIND[p.kind])
   &&pv.slice(1).every(p=>/^([ivxlc]+|\d+)$/.test(p.p))});
 T("Book · the preview is a selection, not the opening pages",()=>{const n=bkPv("book").map(p=>p.p);return n.length>=8&&n.some(x=>+x>=50)&&new Set(n).size===n.length});
 T("Book · no PDF is linked or embedded anywhere the book appears",()=>!/\.pdf\b/i.test(all())&&!/<(iframe|embed|object)\b/i.test(all()));
 T("Book · the companion is free, has its fourteen features and links to the address printed in the book",()=>{const t=txt(bkCompanion("x"));
  return bkCompFeatures().length===14&&bkCompFeatures().every(f=>t.includes(f))&&t.includes("13")&&t.includes("254")&&/Free/.test(t)&&/without a login/.test(t)
   &&BK.lib.url==="https://q.me-qr.com/48usv7rt"&&bkCompanion("x").includes(`href="${BK.lib.url}"`)&&!/(purchasers only|exclusive to buyers|unlock|paywall)/i.test(t)});
 T("Book · the companion's switch appears only when it has pages",()=>bkHasCompanionPages()?/bk-lk-sw/.test(bkLook()):!/bk-lk-sw/.test(bkLook()));
 T("Book · the reader opens the book with the cover and the pages, in order",()=>{const v=hlVol("bk-book");
  return !!v&&v.pv.length===bkReaderPages("book").length&&v.pages===641&&typeof v.alt==="function"&&/^Page 12 of The Indian Economy/.test(v.alt(v.pv.find(p=>p.p==="12")))&&!hlVol("bk-nothing")});
 T("Book · the handbook catalogue is unchanged: the book is not a twelfth volume",()=>hlVols().length===11&&!hlVols().some(v=>/^bk-/.test(v.id)));
 T("Book · the home presents the book after the two pathways, with the cover and four pages to look inside",()=>{const h=home();
  const a=h.indexOf('id="pc-up-h"'),b=h.indexOf('id="bk-h"'),c=h.indexOf('id="dc-h"');
  return a>0&&b>a&&c>b&&/A new academic publication/.test(txt(h))&&(bkHomeFeature().match(/class="bk-thumbs"[\s\S]*?<\/ul>/)[0].match(/<li>/g)||[]).length===4});
 T("Book · the header links the book and opens Resources; the drawer lists both",()=>{
  const g=document.getElementById("gnav");const d=fxDrawerHtml();
  return !!g&&!!g.querySelector('a.gn-book[href="#/book"]')&&!!g.querySelector('button.gn-res[aria-controls="fxpanel"]')&&d.includes('href="#/book"')&&d.includes('href="#/book/digital-revision-companion"')});
 T("Book · the drawer adds the book and the companion and repeats nothing it already lists",()=>{
  const h=fxDrawerHtml(),base=fxDrawerHtml.base?fxDrawerHtml.base():"",hrefs=x=>[...x.matchAll(/href="([^"]*)"/g)].map(m=>m[1]);
  const had=new Set(hrefs(base)),added=hrefs(h).filter(x=>!had.has(x)),more=hrefs(h).length-hrefs(base).length;
  const sums=[...h.matchAll(/<summary>([^<]*)<\/summary>/g)].map(m=>m[1].trim());
  return {ok:!!base&&added.includes("#/book")&&added.includes("#/book/digital-revision-companion")&&more===new Set(added).size&&added.length===new Set(added).size&&new Set(sums).size===sums.length,d:added.join(" ")+" | "+sums.join(", ")}});
 T("Book · the Resources menu lists the book, the companion and the handbooks, and every link resolves",()=>{const h=fxResPanelHtml();
  const hs=[...h.matchAll(/href="([^"]*)"/g)].map(m=>m[1]);
  return h.includes('href="#/book"')&&h.includes('href="#/book/digital-revision-companion"')&&/Economics Handbooks/.test(h)&&hs.length>=8&&hs.every(x=>routeParse(x)!==null)});
 T("Book · search finds the book, the companion and each Part",()=>{const I=buildIndex();
  return I.some(r=>r.t==="The Indian Economy (book)"&&r.go==="nav('book',0)")&&I.some(r=>r.t==="Digital Revision Companion"&&r.go==="nav('book',1)")&&BK_PARTS.every(P=>I.some(r=>r.t===`Part ${P.w}: ${P.t}`))});
 T("Book · the routes are #/book and #/book/digital-revision-companion, and both belong to neither pathway",()=>
  routeFormat("book",0)==="#/book"&&routeFormat("book",1)==="#/book/digital-revision-companion"&&routeParse("#/book/digital-revision-companion").t===1&&fxPathway("book")==="shared");
 T("Book · each page has one h1 and headings that descend without skipping",()=>[0,1].every(t=>{const h=page(t);const lv=[...h.matchAll(/<h([1-6])\b/g)].map(m=>+m[1]);
  return (h.match(/<h1\b/g)||[]).length===1&&lv[0]===1&&lv.every((l,i)=>i===0||l<=lv[i-1]+1)}));
 T("Book · every image has a width, a height and a description, or is a decorative thumbnail inside a labelled button",()=>{
  const imgs=[...all().matchAll(/<img\b[^>]*>/g)].map(m=>m[0]);
  return imgs.length>0&&imgs.every(i=>/\bwidth="\d+"/.test(i)&&/\bheight="\d+"/.test(i)&&(/\balt="[^"]+"/.test(i)||/\balt=""/.test(i)))});
 T("Book · external links open in a new tab, say so, and carry rel noopener noreferrer",()=>{const a=[...all().matchAll(/<a\b[^>]*target="_blank"[^>]*>([\s\S]*?)<\/a>/g)];
  return a.length>0&&a.every(m=>/rel="noopener noreferrer"/.test(m[0])&&/(↗|opens in a new tab)/.test(m[1]))});
 T("Book · the About the Author page of the book is not shown",()=>!bkPv("book").some(p=>p.p==="vi"));
 return out;
}
BOOKSUITE.suiteName="The Indian Economy";
EXTRA_SUITES.push(BOOKSUITE);
