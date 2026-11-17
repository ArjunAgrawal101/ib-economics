/* ═══════════════════════════════════════════════════════════════════════════
   THE ECONOMICS HANDBOOK LIBRARY · UPSC CSE Economics
   The Handbook Library tab (#/upsc/handbook-library and one page per volume,
   #/upsc/handbook-library/volume-iii): an academic publisher's catalogue of the
   eleven handbooks, a page for each volume, and a document viewer for the
   preview pages chosen from each volume (tools/upsc/preview-pages.json).
   Interface: hlRender(arg) returns the whole tab (arg null: the catalogue; a
   volume id: that volume), hlOpenViewer(volumeId, pageIndex) opens the viewer.
   Purchases are enquiries: GET THIS HANDBOOK opens WhatsApp with the owner's
   message (fxHandbookMsg), with email and the phone number beside it. Nothing
   is charged, delivered or confirmed on the site. The catalogue's filters are
   held in memory; nothing is stored. Every control is a real button, link,
   radio or select, so the page needs no wiring after it renders.
   ═══════════════════════════════════════════════════════════════════════════ */
const HL_CATS=["Macroeconomic Foundations","Money and Banking","Inflation","Public Finance","Fiscal Policy","Financial Markets","External Sector","International Institutions","Agriculture","Industry and Employment"];
const HL_KIND={contents:"Contents",concept:"A concept explained",figure:"Infographic",policy:"Policy in detail",table:"Table and data",case:"Case study, scheme or institution",exam:"For the examination",extra:"From the volume"};
const HL_EXAM=[["","All"],["pre","Prelims"],["mains","Mains"],["both","Both"]];
const HL={q:"",cat:"",exam:"",vol:""};
function hlVols(){try{return UPSC_HB.volumes}catch(e){return []}}
function hlVol(id){return hlVols().find(v=>v.id===id||v.n===id)}
function hlHref(id){return routeFormat("upsc",3,id)}
function hlPriceN(){try{return UPSC_HB.price||99}catch(e){return 99}}
function hlCta(){return "GET THIS HANDBOOK · ₹"+hlPriceN()}
function hlWa(v){return fxWa(fxHandbookMsg(v))}
function hlMail(v){return fxMail(`UPSC Economics handbook enquiry: Volume ${v.n}, ${v.title}`,fxHandbookMsg(v))}
function hlPl(n,w){return n+" "+w+(n===1?"":"s")}
function hlAnd(a){return a.length<2?a.join(""):a.slice(0,-1).join(", ")+" and "+a[a.length-1]}
function hlParts(v){return v.parts.filter(p=>!/Revision Compendium/i.test(p.t))}
function hlComp(v){return v.parts.find(p=>/Revision Compendium/i.test(p.t))}
function hlPages(){return hlVols().reduce((a,v)=>a+v.pages,0)}
/* Prelims and Mains relevance, read from the volume's own record: the
   examinations on its title page, its Prelims and Mains notes, and its
   syllabus map (a Prelims column of parts and a Mains column of sections). */
function hlRel(v){const has=(i)=>v.map.some(r=>String(r[i]||"").trim());
 return {pre:!!(v.pre&&v.exams.some(e=>/^Prelims/i.test(e))&&has(1)),mains:!!(v.mains&&v.exams.some(e=>/^Mains/i.test(e))&&has(2))}}
function hlPapers(v){const e=v.exams.find(x=>/^Mains/i.test(x));return e?e.replace(/^Mains\s*/i,"").replace(/\s*&\s*/g," and "):""}

/* ── related volumes: shared themes, read from each volume's concepts,
   institutions and parts. A theme counts when one of the two volumes treats
   it at length (three mentions or more) and the other at least touches it;
   rarer themes weigh more; a shared category adds weight. ─────────────── */
const HL_THEMES=[
 ["monetary policy and the RBI",/\bmpc\b|monetary policy|\brepo\b|policy rates?|liquidity adjustment|inflation target|monetary transmission|fiscal-monetary|fiscal and monetary|central banks?\b|reserve bank/g],
 ["inflation and prices",/inflation|price ind|\bcpi\b|\bwpi\b|deflator|price stability|farm price|administered prices/g],
 ["MSP, procurement and food security",/\bmsp\b|procurement|buffer|food corporation|\bfci\b|\bpds\b|food security|\bnfsa\b|\bcacp\b/g],
 ["taxation",/\btax(?!onomy)|\bgst\b|\bcess\b|surcharge|customs|\bbeps\b|transfer pricing/g],
 ["fiscal federalism",/finance commission|federalism|devolution|fiscal imbalance|divisible pool|state finances/g],
 ["budgets, deficits and public debt",/budget|deficits?\b|public debt|\bfrbm\b|g-secs?|sovereign debt|government securities|debt management/g],
 ["banks and credit",/banking|commercial banks?|\bnpas?\b|\bnbfcs?\b|deposits?\b|lending|(?<!tax )\bcredit\b(?! spreads)/g],
 ["capital flows and FEMA",/\bfdi\b|\bfpi\b|\bfema\b|capital flows|capital account|\becbs?\b|nri deposits|p-notes/g],
 ["exchange rates and reserves",/exchange[- ]rates?|\bneer\b|\breer\b|\bfx\b|reserve tranche|trilemma|impossible trinity|sterilisation|convertibility|\brupee\b/g],
 ["trade policy and the WTO",/\bwto\b|\bftas?\b|tariffs?|\bcbam\b|anti-dumping|trade remedies|foreign trade policy|trade agreements?|comparative advantage|\bgatt\b/g],
 ["international institutions",/\bimf\b|world bank|\bbis\b|\bg20\b|brics|\bsdrs?\b|\bibrd\b|\bida\b|\badb\b|\baiib\b|\bndb\b|\boecd\b|unctad|federal reserve|\bthe fed\b/g],
 ["markets and market failure",/market failure|externalit|public goods|market structures?|price controls|equilibrium|merit goods/g],
 ["industrial policy and the 1991 reforms",/1991|industrial policy|liberalisation|\bpli\b|production linked|structural transformation|mixed economy/g],
 ["employment and labour",/labour|employment|unemployment|\bplfs\b|wages/g],
 ["financial markets",/\bsebi\b|securities|capital markets?|money markets?|stock exchanges?|bond markets?|mutual funds|derivatives|\btreps\b|t-bills|\bomos?\b|open market/g],
 ["financial inclusion and rural credit",/financial inclusion|\bpmjdy\b|\bshg|priority sector|\bnabard\b|kisan credit|\bkcc\b|\bpacs\b|rural credit|cooperative/g],
 ["digital payments and public platforms",/\bupi\b|digital rupee|\bcbdc\b|\bondc\b|agristack|e-nam|digital currency|\bgem\b|digital lending|payments?\b/g],
 ["food processing and value chains",/food processing|value chains?|value addition|supply chains?|\bpmfme\b|\bplisfpi\b/g],
 ["agriculture and the rural economy",/agricultur|\bfarm|\brural\b|\bcrops?\b/g]
];
let HL_RELC=null;
function hlRelated(v){
 if(!HL_RELC){const V=hlVols(),W={},df={};
  V.forEach(x=>{const t=[...x.concepts,...x.inst,...hlParts(x).map(p=>p.t+" "+p.d)].join(" | ").toLowerCase();
   W[x.id]=HL_THEMES.map(([,rx])=>(t.match(rx)||[]).length)});
  HL_THEMES.forEach((_,k)=>{df[k]=V.filter(x=>W[x.id][k]>0).length});
  HL_RELC={};
  V.forEach(a=>{HL_RELC[a.id]=V.filter(b=>b!==a).map(b=>{const why=[];let s=a.category===b.category?1:0;
    HL_THEMES.forEach(([name],k)=>{const x=W[a.id][k],y=W[b.id][k];if(x&&y&&Math.max(x,y)>=3){const w=Math.min(x,y,3)/3*Math.log(12/df[k]);s+=w;why.push([name,w])}});
    return {v:b,s,why:why.sort((p,q)=>q[1]-p[1]).map(p=>p[0])}}).filter(r=>r.s>0).sort((p,q)=>q.s-p.s||p.v.num-q.v.num)})}
 return (HL_RELC[v.id]||[]).slice(0,3)}

/* ── search and filters ─────────────────────────────────────────────────── */
function hlNorm(s){return String(s==null?"":s).toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g,"").replace(/&/g," and ").replace(/[^a-z0-9]+/g," ").trim()}
function hlToks(q){return hlNorm(q).split(" ").filter(Boolean)}
function hlHas(text,toks){const w=" "+hlNorm(text);return toks.every(t=>w.includes(" "+t))}
function hlHay(v){return [v.title,v.sub,v.desc,v.category,"volume "+v.n,"vol "+v.num,...v.parts.map(p=>"part "+p.l+" "+p.t+" "+p.d),...v.concepts,...v.inst].join(" | ")}
function hlMatch(v,S){S=S||HL;const r=hlRel(v);
 if(S.cat&&v.category!==S.cat)return false;
 if(S.vol&&v.id!==S.vol)return false;
 if(S.exam==="pre"&&!r.pre)return false;
 if(S.exam==="mains"&&!r.mains)return false;
 if(S.exam==="both"&&!(r.pre&&r.mains))return false;
 const t=hlToks(S.q);return !t.length||hlHas(hlHay(v),t)}
/* where a search found its words, when that is inside the volume rather than its title */
function hlHit(v,q){const t=hlToks(q);if(!t.length||hlHas([v.title,v.sub,v.category,"volume "+v.n].join(" "),t))return "";
 const p=v.parts.find(x=>hlHas(x.t+" "+x.d,t));if(p)return `Part ${p.l}: ${p.t}`;
 const c=v.concepts.find(x=>hlHas(x,t));if(c)return "Key concept: "+c;
 const i=v.inst.find(x=>hlHas(x,t));if(i)return "Institutions and schemes: "+i;
 return hlHas(v.desc,t)?"The description of the volume":""}
function hlActive(){return !!(HL.q.trim()||HL.cat||HL.exam||HL.vol)}
function hlCountText(n){const T=hlVols().length;if(n===T&&!hlActive())return `All ${T} volumes`;
 const bits=[],v=HL.vol&&hlVol(HL.vol);
 if(HL.q.trim())bits.push(`matching “${HL.q.trim()}”`);if(HL.cat)bits.push("in "+HL.cat);
 if(HL.exam)bits.push({pre:"relevant to Prelims",mains:"relevant to Mains",both:"relevant to both Prelims and Mains"}[HL.exam]);
 let s=(n===0?"No volume":`${n} of ${T} volumes`)+(bits.length?" "+bits.join(", "):"")+(v?` (Volume ${v.n})`:"");
 if(HL.exam&&n===T&&!HL.q.trim()&&!HL.cat&&!HL.vol)s+=". Every volume maps its parts to both the Prelims and the Mains syllabus.";
 return s}
function hlSet(k,val){HL[k]=val==null?"":String(val);hlFilter()}
function hlReset(){HL.q="";HL.cat="";HL.exam="";HL.vol="";
 const q=document.getElementById("hl-q");if(q)q.value="";const s=document.getElementById("hl-vol");if(s)s.value="";
 document.querySelectorAll('input[name="hl-cat"],input[name="hl-exam"]').forEach(r=>{r.checked=r.value===""});
 hlFilter();if(q)q.focus()}
function hlFilter(){const list=document.getElementById("hl-list");if(!list)return;let n=0;
 hlVols().forEach(v=>{const li=document.getElementById("hl-c-"+v.id);if(!li)return;const ok=hlMatch(v);li.hidden=!ok;if(ok)n++;
  const h=li.querySelector(".hl-hit");if(h){const x=ok?hlHit(v,HL.q):"";h.hidden=!x;h.textContent=x?"Found in "+x:""}});
 const c=document.getElementById("hl-count");if(c)c.textContent=hlCountText(n);
 const e=document.getElementById("hl-empty");if(e)e.hidden=n>0;
 const r=document.getElementById("hl-reset");if(r)r.hidden=!hlActive()}

/* ── pieces ─────────────────────────────────────────────────────────────── */
function hlSrcset(o){return o&&o.sm?`${o.sm.src} ${o.sm.w}w, ${o.src} ${o.w}w`:""}
function hlCover(v,cls,sizes,eager){const c=v.img&&v.img.cover;if(!c)return `<span class="hl-cv-ph">Volume ${esc(v.n)}</span>`;
 const ss=hlSrcset(c);
 return `<img class="${cls||"hl-cv"}" src="${esA(c.src)}"${ss?` srcset="${esA(ss)}" sizes="${esA(sizes||"220px")}"`:""} alt="" width="${c.w}" height="${c.h}"${eager?"":' loading="lazy"'} decoding="async">`}
function hlKicker(v){return `<span class="hl-vn">Volume ${esc(v.n)}</span><span class="hl-sep" aria-hidden="true">·</span><span>${esc(v.category)}</span>`}
function hlPvBtn(v,cls){const n=(v.pv||[]).length;if(!n)return "";
 return `<button type="button" class="${cls||"hl-btn hl-ghost"}" onclick="hlOpenViewer('${v.id}',0)" aria-label="Preview ${hlPl(n,"page")} of Volume ${esA(v.n)}"><svg class="hl-ic" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 4.5h6.2c.8 0 .8.5.8 1.3V16c0-.7-.4-1-1-1H3zM17 4.5h-6.2c-.8 0-.8.5-.8 1.3V16c0-.7.4-1 1-1H17z"/></svg>Preview <span class="hl-btn-n">${hlPl(n,"page")}</span></button>`}
function hlBuy(v,cls){return `<a class="${cls||"hl-btn hl-buy"}" href="${esA(hlWa(v))}" target="_blank" rel="noopener noreferrer" aria-label="${esA(hlCta()+", Volume "+v.n+": "+v.title+", on WhatsApp")}">${esc(hlCta())}</a>`}
function hlMailLink(v,t){return `<a class="hl-mail" href="${esA(hlMail(v))}">${t||"enquire by email"}</a>`}
function hlTel(){return `<a class="hl-tel" href="${esA(fxTel())}">${esc(FX_CONTACT.phone())}</a>`}
function hlPriceBlock(v,big){return `<p class="hl-price${big?" lg":""}"><span class="hl-price-n">₹${hlPriceN()}</span><span class="hl-price-u">per volume</span></p>
 <p class="hl-price-t">Digital soft copy. Individual volume pricing.</p>`}

/* ── the catalogue ──────────────────────────────────────────────────────── */
function hlCatalogue(missing){const V=hlVols(),T=V.length,n=V.filter(v=>hlMatch(v)).length;
 const cats=HL_CATS.map(c=>[c,V.filter(v=>v.category===c).length]);
 return `<div class="hl hl-catv">
 <header class="hl-mast"><div class="hl-wrap">
  <p class="hl-eb"><span>UPSC CSE Economics</span><span>The Indian Economy Series</span></p>
  <div class="hl-mast-g"><div class="hl-mast-x">
   <h1 class="hl-h1">The Economics Handbook Library</h1>
   <p class="hl-lede">Eleven original handbooks by Arjun Agrawal for UPSC CSE Economics, from the foundations of economic thinking to India's agriculture, industry and labour markets. Look inside each volume before you buy it.</p></div>
   <dl class="hl-facts"><div><dt>Volumes</dt><dd>${T}</dd></div><div><dt>Pages in all</dt><dd>${hlPages()}</dd></div><div><dt>Each volume</dt><dd>₹${hlPriceN()}</dd></div><div><dt>Format</dt><dd>Digital soft copy (PDF)</dd></div></dl></div>
  <nav class="hl-shelf" aria-label="The eleven volumes"><ol>${V.map(v=>`<li><a href="${hlHref(v.id)}" title="Volume ${esA(v.n)}: ${esA(v.title)}">${hlCover(v,"hl-shelf-cv","(max-width: 640px) 16vw, 104px",true)}<span class="hl-shelf-n" aria-hidden="true">${esc(v.n)}</span><span class="hl-sr">Volume ${esc(v.n)}: ${esc(v.title)}</span></a></li>`).join("")}</ol></nav>
 </div></header>
 ${missing?`<div class="hl-wrap"><p class="hl-notice" role="status">There is no volume called “${esc(missing)}”. Here is the whole library.</p></div>`:""}
 <section class="hl-how" aria-labelledby="hl-how-h"><div class="hl-wrap hl-how-g">
  <div class="hl-how-x"><h2 class="hl-h2" id="hl-how-h">How buying a handbook works</h2>
   <p class="hl-how-p"><b>Digital soft copy. Individual volume pricing.</b> Each volume is a PDF in A4 at ₹${hlPriceN()}. Nothing is printed or posted, and nothing is charged on this website.</p></div>
  <ol class="hl-steps">
   <li><span class="hl-step-n" aria-hidden="true">1</span><b>Look inside</b><span>Open a volume's preview pages and read its contents first.</span></li>
   <li><span class="hl-step-n" aria-hidden="true">2</span><b>Send the prefilled message</b><span>${esc(hlCta())} opens WhatsApp with a message naming the volume. Email works too.</span></li>
   <li><span class="hl-step-n" aria-hidden="true">3</span><b>Arrange payment and delivery directly</b><span>Arjun Agrawal replies with the payment and delivery details of the soft copy.</span></li></ol>
  <p class="hl-contact">WhatsApp or call ${hlTel()} <span class="hl-sep" aria-hidden="true">·</span> Email <a class="hl-mail" href="${esA(fxMail("UPSC Economics handbook enquiry",FX_ENQ.upHandbooks.msg))}">${esc(FX_CONTACT.email())}</a></p>
 </div></section>
 <section class="hl-browse" aria-labelledby="hl-browse-h"><div class="hl-wrap">
  <div class="hl-browse-head"><h2 class="hl-h2" id="hl-browse-h">The collection</h2>
   <p id="hl-count" class="hl-count" role="status" aria-live="polite">${esc(hlCountText(n))}</p></div>
  <form class="hl-tools" role="search" aria-label="Search and filter the handbooks" onsubmit="return false">
   <div class="hl-tool hl-tool-q"><label for="hl-q">Search titles, descriptions, parts, concepts and institutions</label>
    <span class="hl-qw"><svg class="hl-ic" viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M13 13l4.5 4.5"/></svg><input id="hl-q" type="search" autocomplete="off" spellcheck="false" placeholder="For example: MSP or repo rate" value="${esA(HL.q)}" oninput="hlSet('q',this.value)"></span></div>
   <div class="hl-tool hl-tool-vol"><label for="hl-vol">Volume</label><select id="hl-vol" onchange="hlSet('vol',this.value)"><option value="">All volumes</option>${V.map(v=>`<option value="${v.id}"${HL.vol===v.id?" selected":""}>Volume ${esc(v.n)}: ${esc(v.title)}</option>`).join("")}</select></div>
   <fieldset class="hl-tool hl-seg"><legend>Examination</legend><div class="hl-seg-g">${HL_EXAM.map(([k,l])=>`<label class="hl-opt"><input type="radio" name="hl-exam" value="${k}"${HL.exam===k?" checked":""} onchange="hlSet('exam',this.value)"><span>${l}</span></label>`).join("")}</div></fieldset>
   <fieldset class="hl-tool hl-cats"><legend>Topic</legend><div class="hl-chips"><label class="hl-opt hl-chip"><input type="radio" name="hl-cat" value=""${HL.cat?"":" checked"} onchange="hlSet('cat',this.value)"><span>All topics</span></label>${cats.map(([c,k])=>`<label class="hl-opt hl-chip"><input type="radio" name="hl-cat" value="${esA(c)}"${HL.cat===c?" checked":""} onchange="hlSet('cat',this.value)"><span>${esc(c)} <i>${k}</i></span></label>`).join("")}</div></fieldset>
   <button type="button" id="hl-reset" class="hl-reset" onclick="hlReset()"${hlActive()?"":" hidden"}>Clear search and filters</button>
  </form>
  <ol class="hl-list" id="hl-list">${V.map(v=>hlCard(v)).join("")}</ol>
  <div class="hl-empty" id="hl-empty"${n?" hidden":""}><p>No volume matches. Try a broader word, or</p><button type="button" class="hl-btn hl-ghost" onclick="hlReset()">Clear search and filters</button></div>
 </div></section>
 ${hlTerms()}
 </div>`}
function hlCard(v){const ok=hlMatch(v),parts=hlParts(v),show=parts.slice(0,6),more=parts.length-show.length,r=hlRel(v),hit=ok?hlHit(v,HL.q):"";
 return `<li class="hl-card" id="hl-c-${v.id}" data-cat="${esA(v.category)}"${ok?"":" hidden"}><article class="hl-card-in" aria-labelledby="hl-t-${v.id}">
 <a class="hl-book" href="${hlHref(v.id)}" tabindex="-1" aria-hidden="true">${hlCover(v,"hl-cv","(max-width: 640px) 34vw, (max-width: 1099px) 170px, 200px")}</a>
 <div class="hl-card-x">
  <p class="hl-kick">${hlKicker(v)}</p>
  <h3 class="hl-card-t" id="hl-t-${v.id}"><a href="${hlHref(v.id)}">${esc(v.title)}</a></h3>
  <p class="hl-card-sub">${esc(v.sub)}</p>
  <p class="hl-hit"${hit?"":" hidden"}>${hit?"Found in "+esc(hit):""}</p>
  <p class="hl-card-d">${esc(v.desc)}</p>
  <div class="hl-topics"><h4 class="hl-mini">Main topics</h4><ul>${show.map(p=>`<li><span class="hl-pl" aria-hidden="true">${esc(p.l)}</span>${esc(p.t)}</li>`).join("")}</ul>${more>0?`<p class="hl-more-p">and ${hlPl(more,"more part")}, with a revision compendium</p>`:""}</div>
 </div>
 <div class="hl-card-side">
  <dl class="hl-meta"><div><dt>Pages</dt><dd>${v.pages}</dd></div><div><dt>Parts</dt><dd>${v.parts.length}</dd></div><div><dt>Format</dt><dd>PDF, A4</dd></div></dl>
  <dl class="hl-rel">${r.pre?`<div><dt>Prelims</dt><dd>${esc(v.pre)}</dd></div>`:""}${r.mains?`<div><dt>Mains <span>${esc(hlPapers(v))}</span></dt><dd>${esc(v.mains)}</dd></div>`:""}</dl>
  <div class="hl-buybox">${hlPriceBlock(v)}
   <div class="hl-acts">${hlPvBtn(v)}${hlBuy(v)}</div>
   <p class="hl-alt">Opens WhatsApp. Or ${hlMailLink(v)}.</p>
   <a class="hl-go" href="${hlHref(v.id)}">Explore Volume ${esc(v.n)}<span aria-hidden="true"> →</span></a></div>
 </div></article></li>`}
function hlTerms(){return `<section class="hl-terms" aria-labelledby="hl-terms-h"><div class="hl-wrap hl-terms-g">
 <h2 class="hl-h3" id="hl-terms-h">About the previews and purchases</h2>
 <ul class="hl-terms-l">
  <li><b>Real pages.</b> The previews are actual pages from each volume, chosen to show its contents, explanations, diagrams, tables and examination material. They are shown as they are printed in the volume.</li>
  <li><b>Not the whole volume.</b> The complete handbooks are never published on this website. Each is sold as a digital soft copy (PDF) at ₹${hlPriceN()} per volume; there is no bundle price.</li>
  <li><b>No protection is claimed.</b> A page shown in a browser can be saved or photographed, and this site does not pretend otherwise. The pages are shared so that you can judge the quality before you buy.</li>
  <li><b>Enquiry first.</b> There is no payment gateway here and no purchase is completed on the site. Messages go to ${esc(FX_CONTACT.email())} or ${esc(FX_CONTACT.phone())}.</li></ul>
 </div></section>`}

/* ── one volume ─────────────────────────────────────────────────────────── */
function hlVolume(v){const V=hlVols(),i=V.indexOf(v),prev=V[i-1],next=V[i+1],r=hlRel(v),pv=v.pv||[],rel=hlRelated(v),comp=hlComp(v);
 let topics=[];try{topics=UP_TOPICS.filter(t=>t.vol===v.n||t.also===v.n)}catch(e){}
 return `<div class="hl hl-volv">
 <div class="hl-wrap"><nav class="hl-crumb" aria-label="Breadcrumb"><ol><li><a href="${hlHref()}">Handbook Library</a></li><li><span aria-current="page">Volume ${esc(v.n)}</span></li></ol></nav></div>
 <header class="hl-vhead"><div class="hl-wrap hl-vhead-g">
  <div class="hl-vcover">${pv.length?`<button type="button" class="hl-book lg" onclick="hlOpenViewer('${v.id}',0)" aria-label="Look inside Volume ${esA(v.n)}: ${hlPl(pv.length,"preview page")}">${hlCover(v,"hl-cv","(max-width: 640px) 46vw, 340px",true)}<span class="hl-look" aria-hidden="true">Look inside</span></button>`:`<span class="hl-book lg">${hlCover(v,"hl-cv","(max-width: 640px) 46vw, 340px",true)}</span>`}</div>
  <div class="hl-vx">
   <p class="hl-kick">${hlKicker(v)}<span class="hl-sep" aria-hidden="true">·</span><span>${esc(v.edition)}</span></p>
   <h1 class="hl-h1 hl-vt">${esc(v.title)}</h1>
   <p class="hl-vsub">${esc(v.sub)}</p>
   <dl class="hl-vfacts"><div><dt>Pages</dt><dd>${v.pages}</dd></div><div><dt>Parts</dt><dd>${v.parts.length}</dd></div><div><dt>Format</dt><dd>Digital soft copy (PDF, A4)</dd></div><div><dt>Useful for</dt><dd>${esc(v.exams.join(" · "))}</dd></div></dl>
   ${v.asof?`<p class="hl-asof">${esc(v.asof)}</p>`:""}
   <div class="hl-vbuy">${hlPriceBlock(v,true)}<div class="hl-acts">${hlBuy(v)}${hlPvBtn(v)}</div>
    <p class="hl-alt">Opens WhatsApp with a message naming this volume. Or ${hlMailLink(v)}, or call ${hlTel()}.</p></div>
  </div></div></header>
 ${pv.length?`<section class="hl-look-s" aria-labelledby="hl-pv-h"><div class="hl-wrap">
  <div class="hl-sec-head"><h2 class="hl-h2" id="hl-pv-h">Look inside</h2><p class="hl-sec-d">${hlPl(pv.length,"page")} from the volume itself. Open one to read it in the viewer, zoom in, or go full screen.</p></div>
  <ol class="hl-pvs">${pv.map((p,k)=>`<li><a class="hl-pv" href="${esA(p.src)}" onclick="return !hlOpenViewer('${v.id}',${k})" aria-label="${esA(`Open page ${p.p}: ${HL_KIND[p.kind]||""}, ${p.cap}`)}"><span class="hl-pv-im"><img src="${esA((p.sm||p).src)}" alt="" width="${(p.sm||p).w}" height="${(p.sm||p).h}" loading="lazy" decoding="async"></span><span class="hl-pv-k">${esc(HL_KIND[p.kind]||"")}<span class="hl-pv-p">p. ${p.p}</span></span><span class="hl-pv-c">${esc(p.cap)}</span></a></li>`).join("")}</ol>
 </div></section>`:""}
 <div class="hl-wrap hl-vbody">
  <div class="hl-vmain">
   <section class="hl-vs" aria-labelledby="hl-about-h"><h2 class="hl-h2" id="hl-about-h">About this volume</h2><p class="hl-big">${esc(v.desc)}</p>
    <h3 class="hl-h4">What you will learn</h3><ul class="hl-ticks">${v.learn.map(l=>`<li>${esc(l)}</li>`).join("")}</ul></section>
   <section class="hl-vs" aria-labelledby="hl-toc-h"><h2 class="hl-h2" id="hl-toc-h">Contents</h2><p class="hl-sec-d">${hlPl(v.parts.length,"part")}, with the page on which each begins.</p>
    <ol class="hl-toc">${v.parts.map(p=>`<li><span class="hl-toc-l">Part ${esc(p.l)}</span><span class="hl-toc-x"><span class="hl-toc-r"><b>${esc(p.t)}</b><span class="hl-toc-dots" aria-hidden="true"></span><span class="hl-toc-p"><span class="hl-sr">page </span>${p.p}</span></span><span class="hl-toc-d">${esc(p.d)}</span></span></li>`).join("")}</ol></section>
   <section class="hl-vs" aria-labelledby="hl-rel-h"><h2 class="hl-h2" id="hl-rel-h">Prelims and Mains relevance</h2>
    <div class="hl-two">${r.pre?`<div class="hl-relc"><h3 class="hl-h4">Prelims <span>General Studies Paper I</span></h3><p>${esc(v.pre)}</p></div>`:""}${r.mains?`<div class="hl-relc"><h3 class="hl-h4">Mains <span>${esc(hlPapers(v))}</span></h3><p>${esc(v.mains)}</p></div>`:""}</div>
    <h3 class="hl-h4 hl-maph">The volume's own syllabus map</h3>
    <table class="hl-map"><caption class="hl-sr">Syllabus map of Volume ${esc(v.n)}: where each syllabus area is treated for Prelims and Mains</caption><thead><tr><th scope="col">Syllabus area</th><th scope="col">Prelims (parts)</th><th scope="col">Mains (sections)</th><th scope="col">Also useful for</th></tr></thead>
     <tbody>${v.map.map(m=>`<tr><th scope="row">${esc(m[0])}</th><td data-l="Prelims">${esc(m[1])}</td><td data-l="Mains">${esc(m[2])}</td><td data-l="Also useful for">${esc(m[3])}</td></tr>`).join("")}</tbody></table></section>
   <section class="hl-vs hl-two" aria-label="Concepts and institutions"><div><h2 class="hl-h3">Key concepts</h2><ul class="hl-tags">${v.concepts.map(c=>`<li>${esc(c)}</li>`).join("")}</ul></div>
    <div><h2 class="hl-h3">Institutions, schemes and policies</h2><ul class="hl-tags g">${v.inst.map(c=>`<li>${esc(c)}</li>`).join("")}</ul></div></section>
   <section class="hl-vs" aria-labelledby="hl-in-h"><h2 class="hl-h2" id="hl-in-h">Inside the volume</h2>
    <h3 class="hl-h4">Recurring boxes</h3><ul class="hl-boxes">${v.boxes.map(b=>`<li>${esc(b)}</li>`).join("")}</ul>
    <h3 class="hl-h4">The revision compendium${comp?` <span>Part ${esc(comp.l)}, from page ${comp.p}</span>`:""}</h3><p>${esc(v.comp)}</p></section>
   ${topics.length?`<section class="hl-vs" aria-labelledby="hl-fr-h"><h2 class="hl-h3" id="hl-fr-h">Free topic previews from this volume</h2><ul class="hl-free">${topics.map(t=>`<li><a href="${esA(routeFormat("upsc",2,t.id))}">${esc(t.t)}</a></li>`).join("")}</ul></section>`:""}
   ${rel.length?`<section class="hl-vs" aria-labelledby="hl-relv-h"><h2 class="hl-h2" id="hl-relv-h">Related volumes</h2><p class="hl-sec-d">Volumes that share the most ground with this one, read from their concepts, institutions and parts.</p>
    <ul class="hl-relv">${rel.map(x=>`<li><a class="hl-relv-a" href="${hlHref(x.v.id)}"><span class="hl-relv-cv">${hlCover(x.v,"hl-cv","96px")}</span><span class="hl-relv-x"><span class="hl-kick"><span class="hl-vn">Volume ${esc(x.v.n)}</span></span><b>${esc(x.v.title)}</b><span class="hl-relv-c">${esc(x.v.category)}</span>${x.why.length?`<span class="hl-relv-w">Shared ground: ${esc(x.why.slice(0,3).join("; "))}</span>`:""}</span></a></li>`).join("")}</ul></section>`:""}
  </div>
  <aside class="hl-vside" aria-label="Get this handbook"><div class="hl-side-in">
   <div class="hl-side-top"><span class="hl-side-cv">${hlCover(v,"hl-cv","72px")}</span><div><p class="hl-kick"><span class="hl-vn">Volume ${esc(v.n)}</span></p><p class="hl-side-t">${esc(v.title)}</p><p class="hl-side-m">${v.pages} pages · PDF, A4</p></div></div>
   ${hlPriceBlock(v)}<div class="hl-acts col">${hlBuy(v)}${hlPvBtn(v)}</div>
   <p class="hl-alt">Or ${hlMailLink(v)}, or call ${hlTel()}.</p></div></aside>
 </div>
 <section class="hl-end" aria-labelledby="hl-end-h"><div class="hl-wrap hl-end-g"><div><p class="hl-kick on-dark">${hlKicker(v)}</p><h2 class="hl-h2 on-dark" id="hl-end-h">${esc(v.title)}</h2><p class="hl-end-p">${v.pages} pages · Digital soft copy (PDF, A4) · ₹${hlPriceN()}. Individual volume pricing.</p></div>
  <div class="hl-acts">${hlBuy(v,"hl-btn hl-buy gold")}${hlMailLink(v,"Enquire by email")}</div></div></section>
 <div class="hl-wrap"><nav class="hl-pn" aria-label="Other volumes">${prev?`<a class="hl-pn-a" href="${hlHref(prev.id)}" rel="prev"><span>← Volume ${esc(prev.n)}</span>${esc(prev.title)}</a>`:"<span></span>"}<a class="hl-pn-all" href="${hlHref()}">All eleven volumes</a>${next?`<a class="hl-pn-a nx" href="${hlHref(next.id)}" rel="next"><span>Volume ${esc(next.n)} →</span>${esc(next.title)}</a>`:"<span></span>"}</nav></div>
 </div>`}

/* ── the tab ─────────────────────────────────────────────────────────────── */
function hlRender(arg){try{hlClose(true)}catch(e){}
 if(arg){const v=hlVol(arg);if(v)return hlVolume(v);return hlCatalogue(String(arg))}
 return hlCatalogue()}

/* ═══ THE VIEWER ════════════════════════════════════════════════════════════
   A dialog over the page: one preview page at a time in A4 proportion (the
   box is sized before the image arrives, so nothing jumps), the next and
   previous pages fetched in advance, thumbnails, zoom, full screen (the
   Fullscreen API, or an immersive layout where it is missing), swipe, and
   the keyboard. Focus stays inside while it is open and returns to the
   control that opened it. The pages are shown exactly as rendered from the
   volume: no watermark, stamp or overlay is drawn over them. */
const HLV={el:null,id:"",i:0,z:0,imm:false,ret:null,pre:{},ptr:null,fit:0};
const HL_ZOOM=[1,1.25,1.5,2,2.5,3];
const HL_IC={prev:'<path d="M12.5 4 6.5 10l6 6"/>',next:'<path d="M7.5 4l6 6-6 6"/>',out:'<path d="M5 10h10"/>',in:'<path d="M5 10h10M10 5v10"/>',
 full:'<path d="M3.5 8V3.5H8M12 3.5h4.5V8M16.5 12v4.5H12M8 16.5H3.5V12"/>',exit:'<path d="M8 3.5V8H3.5M16.5 8H12V3.5M12 16.5V12h4.5M3.5 12H8v4.5"/>',close:'<path d="M5 5l10 10M15 5 5 15"/>'};
function hlIc(k){return `<svg class="hl-ic" viewBox="0 0 20 20" aria-hidden="true">${HL_IC[k]}</svg>`}
function hlReduced(){try{return matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return false}}
function hlViewerEl(){if(HLV.el&&HLV.el.isConnected)return HLV.el;
 const d=document.createElement("dialog");d.id="hl-viewer";d.className="hl-vw";d.setAttribute("aria-labelledby","hl-vw-t");d.setAttribute("aria-describedby","hl-vw-help");
 d.innerHTML=`<div class="hl-vw-in">
 <header class="hl-vw-top"><div class="hl-vw-id"><p class="hl-vw-k" id="hl-vw-k"></p><h2 class="hl-vw-t" id="hl-vw-t"></h2></div>
  <div class="hl-vw-tools" role="toolbar" aria-label="Preview controls">
   <button type="button" class="hl-vw-b" data-a="out" aria-label="Zoom out" title="Zoom out (−)">${hlIc("out")}</button>
   <button type="button" class="hl-vw-b hl-vw-zv" id="hl-vw-zv" data-a="fit" aria-label="Fit the page to the screen" title="Fit the page (0)">Fit</button>
   <button type="button" class="hl-vw-b" data-a="in" aria-label="Zoom in" title="Zoom in (+)">${hlIc("in")}</button>
   <button type="button" class="hl-vw-b" data-a="full" aria-pressed="false" aria-label="Full screen" title="Full screen (F)">${hlIc("full")}</button>
   <button type="button" class="hl-vw-b hl-vw-x" data-a="close" aria-label="Close the preview" title="Close (Esc)">${hlIc("close")}</button></div></header>
 <div class="hl-vw-main">
  <button type="button" class="hl-vw-nav prev" data-a="prev" aria-label="Previous page">${hlIc("prev")}</button>
  <div class="hl-vw-stage" id="hl-vw-stage" tabindex="0" role="group" aria-roledescription="page"><div class="hl-vw-sheet" id="hl-vw-sheet"></div></div>
  <button type="button" class="hl-vw-nav next" data-a="next" aria-label="Next page">${hlIc("next")}</button></div>
 <footer class="hl-vw-foot">
  <div class="hl-vw-cap"><p class="hl-vw-pos" id="hl-vw-pos"></p><p class="hl-vw-c" id="hl-vw-c"></p></div>
  <ol class="hl-vw-strip" id="hl-vw-strip" aria-label="Preview pages"></ol>
  <div class="hl-vw-buy" id="hl-vw-buy"></div></footer>
 <p class="hl-sr" id="hl-vw-help">Use the left and right arrow keys to turn the pages, plus and minus to zoom, 0 to fit the page, F for full screen and Escape to close. On a touch screen, swipe to turn the pages.</p>
 <p class="hl-sr" id="hl-vw-live" aria-live="polite"></p></div>`;
 document.body.appendChild(d);HLV.el=d;
 d.addEventListener("click",e=>{const b=e.target.closest("[data-a]");if(b&&d.contains(b)&&!b.disabled){hlvAct(b.dataset.a)}else{const t=e.target.closest("[data-i]");if(t)hlvGo(+t.dataset.i)}});
 d.addEventListener("cancel",e=>{e.preventDefault();if(HLV.imm)hlvImm(false);else hlClose()});
 d.addEventListener("close",()=>hlClose(true));
 const st=d.querySelector("#hl-vw-stage");
 st.addEventListener("pointerdown",hlvDown);st.addEventListener("pointermove",hlvMove);st.addEventListener("pointerup",hlvUp);st.addEventListener("pointercancel",()=>{HLV.ptr=null;st.classList.remove("is-drag")});
 st.addEventListener("dblclick",e=>{if(e.pointerType==="touch")return;hlvZoomTo(HLV.z?0:Math.min(3,hlvMaxZ()),e)});
 return d}
function hlOpenViewer(id,i){const v=hlVol(id);if(!v||!(v.pv&&v.pv.length)||typeof document==="undefined")return false;
 const d=hlViewerEl(),pv=v.pv;
 if(!d.open)HLV.ret=document.activeElement;
 HLV.id=v.id;HLV.i=Math.max(0,Math.min(pv.length-1,(i|0)));HLV.z=0;
 d.querySelector("#hl-vw-k").textContent=`Volume ${v.n} · ${v.category} · Look inside`;
 d.querySelector("#hl-vw-t").textContent=v.title;
 d.querySelector("#hl-vw-strip").innerHTML=pv.map((p,k)=>`<li><button type="button" data-i="${k}" aria-label="${esA(`Page ${p.p}: ${HL_KIND[p.kind]||""}, ${p.cap}`)}"><img src="${esA((p.sm||p).src)}" alt="" width="${(p.sm||p).w}" height="${(p.sm||p).h}" loading="lazy" decoding="async"><span>p. ${p.p}</span></button></li>`).join("");
 d.querySelector("#hl-vw-buy").innerHTML=`<span class="hl-vw-price">₹${hlPriceN()} · Digital soft copy</span>${hlBuy(v,"hl-btn hl-buy sm")}`;
 d.classList.toggle("is-one",pv.length<2);
 d.querySelector("#hl-vw-sheet").innerHTML="";
 if(!d.open){try{d.showModal()}catch(e){d.setAttribute("open","");d.classList.add("is-fallback")}}
 document.documentElement.classList.add("hl-vw-on");
 hlvShow(HLV.i,0);
 const st=d.querySelector("#hl-vw-stage");try{st.focus({preventScroll:true})}catch(e){}
 return true}
function hlClose(quiet){const d=HLV.el;if(!d)return;
 if(quiet&&!d.open&&!d.hasAttribute("open"))return;
 try{if(hlvIsFull())(document.exitFullscreen||document.webkitExitFullscreen).call(document)}catch(e){}
 if(HLV.imm)hlvImm(false);
 if(d.open){try{d.close()}catch(e){}}d.removeAttribute("open");d.classList.remove("is-fallback");
 document.documentElement.classList.remove("hl-vw-on");
 const r=HLV.ret;HLV.ret=null;
 if(!quiet&&r&&r.isConnected&&typeof r.focus==="function"){try{r.focus({preventScroll:true})}catch(e){}}}
function hlvVol(){return hlVol(HLV.id)}
function hlvAct(a){if(a==="prev")hlvGo(HLV.i-1);else if(a==="next")hlvGo(HLV.i+1);else if(a==="in")hlvZoomTo(HLV.z+1);else if(a==="out")hlvZoomTo(HLV.z-1);
 else if(a==="fit")hlvZoomTo(0);else if(a==="full")hlvFull();else if(a==="close")hlClose()}
function hlvGo(i){const v=hlvVol();if(!v)return;const n=v.pv.length;if(i<0||i>=n||i===HLV.i)return;const dir=i>HLV.i?1:-1;HLV.z=0;hlvShow(i,dir)}
/* the size of the page at the current zoom: "fit" is the whole page inside the stage */
function hlvBox(p){const st=HLV.el.querySelector("#hl-vw-stage"),cs=getComputedStyle(st);
 const W=st.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight),Hh=st.clientHeight-parseFloat(cs.paddingTop)-parseFloat(cs.paddingBottom);
 const r=p.h/p.w,fit=Math.max(120,Math.min(W,Hh/r));HLV.fit=fit;const w=Math.round(fit*HL_ZOOM[HLV.z]);return {w,h:Math.round(w*r),fit}}
function hlvMaxZ(){const v=hlvVol();if(!v)return 0;const p=v.pv[HLV.i];const fit=HLV.fit||500;let k=0;
 HL_ZOOM.forEach((z,j)=>{if(fit*z<=Math.max(p.w*(p.w>=1200?1.25:1),fit*1.5))k=j});return k}
function hlvLayout(keep){const v=hlvVol();if(!v||!HLV.el)return;const p=v.pv[HLV.i],st=HLV.el.querySelector("#hl-vw-stage"),sh=HLV.el.querySelector("#hl-vw-sheet");
 const cx=keep&&st.scrollWidth>st.clientWidth?(st.scrollLeft+st.clientWidth/2)/st.scrollWidth:.5,cy=keep&&st.scrollHeight>st.clientHeight?(st.scrollTop+st.clientHeight/2)/st.scrollHeight:.5;
 hlvBox(p);HLV.z=Math.min(HLV.z,hlvMaxZ());const bb=hlvBox(p);
 sh.style.width=bb.w+"px";sh.style.height=bb.h+"px";
 sh.querySelectorAll("img").forEach(im=>{if(im.srcset)im.sizes=bb.w+"px"});
 st.classList.toggle("is-zoomed",HLV.z>0);
 if(HLV.z>0){st.scrollLeft=cx*st.scrollWidth-st.clientWidth/2;st.scrollTop=cy*st.scrollHeight-st.clientHeight/2}else{st.scrollLeft=0;st.scrollTop=0}
 const zl=HLV.el.querySelector("#hl-vw-zv");if(zl){zl.textContent=HLV.z?Math.round(HL_ZOOM[HLV.z]*100)+"%":"Fit";zl.disabled=HLV.z<=0;zl.setAttribute("aria-label",HLV.z?`Fit the page to the screen (now ${Math.round(HL_ZOOM[HLV.z]*100)}%)`:"The page fits the screen")}
 const mz=hlvMaxZ();HLV.el.querySelector('[data-a="in"]').disabled=HLV.z>=mz;HLV.el.querySelector('[data-a="out"]').disabled=HLV.z<=0;hlvKeepFocus();
 return bb}
function hlvZoomTo(z,e){const mz=hlvMaxZ();z=Math.max(0,Math.min(mz,z|0));if(z===HLV.z)return;HLV.z=z;hlvLayout(true);
 const live=HLV.el.querySelector("#hl-vw-live");if(live)live.textContent=z?`Zoom ${Math.round(HL_ZOOM[z]*100)}%`:"Fitted to the screen"}
function hlvImgFor(p,w){const im=new Image();im.className="hl-vw-img";im.alt="";im.decoding="async";im.width=p.w;im.height=p.h;
 const ss=hlSrcset(p);if(ss){im.sizes=w+"px";im.srcset=ss}im.src=p.src;return im}
function hlvShow(i,dir){const v=hlvVol(),d=HLV.el;if(!v||!d)return;const pv=v.pv,p=pv[i];HLV.i=i;
 const sh=d.querySelector("#hl-vw-sheet"),b=hlvLayout(false)||hlvBox(p);
 sh.style.backgroundImage=p.sm?`url("${p.sm.src}")`:"none";
 sh.querySelectorAll("img:not(.on)").forEach(x=>x.remove());
 const old=sh.querySelector("img.on"),im=hlvImgFor(p,b.w);
 im.alt=`Page ${p.p} of ${v.pages} in Volume ${v.n}, ${v.title}. ${HL_KIND[p.kind]||""}: ${p.cap}`;
 const still=hlReduced()||!dir||!old;
 if(still){if(old)old.remove();im.classList.add("on");sh.appendChild(im)}
 else{im.classList.add(dir>0?"from-r":"from-l");sh.appendChild(im);
  const swap=()=>{if(!im.isConnected)return;requestAnimationFrame(()=>{im.classList.remove("from-r","from-l");im.classList.add("on");if(old&&old.isConnected){old.classList.remove("on");old.classList.add(dir>0?"to-l":"to-r");setTimeout(()=>old.remove(),360)}})};
  (im.decode?im.decode().catch(()=>{}):Promise.resolve()).then(swap)}
 const kind=HL_KIND[p.kind]||"";
 d.querySelector("#hl-vw-pos").innerHTML=`<b>Page ${p.p}</b> of ${v.pages}<span class="hl-sep" aria-hidden="true">·</span>preview ${i+1} of ${pv.length}`;
 d.querySelector("#hl-vw-c").innerHTML=`<span class="hl-vw-kind">${esc(kind)}</span>${esc(p.cap)}`;
 d.querySelector("#hl-vw-stage").setAttribute("aria-label",`Page ${p.p} of ${v.pages}, preview ${i+1} of ${pv.length}. ${kind}: ${p.cap}`);
 const live=d.querySelector("#hl-vw-live");if(live&&dir)live.textContent=`Page ${p.p}. ${kind}: ${p.cap}`;
 d.querySelectorAll("#hl-vw-strip button").forEach(x=>{const on=+x.dataset.i===i;if(on)x.setAttribute("aria-current","page");else x.removeAttribute("aria-current")});
 const cur=d.querySelector('#hl-vw-strip button[aria-current]');if(cur&&cur.scrollIntoView){try{cur.scrollIntoView({block:"nearest",inline:"nearest"})}catch(e){}}
 d.querySelector('[data-a="prev"]').disabled=i<=0;d.querySelector('[data-a="next"]').disabled=i>=pv.length-1;hlvKeepFocus();
 const nextPre=()=>{[i+1,i-1].forEach(k=>{const q=pv[k];if(!q||HLV.pre[q.src])return;HLV.pre[q.src]=hlvImgFor(q,b.w)})};
 if(im.complete)nextPre();else{im.addEventListener("load",nextPre,{once:true});im.addEventListener("error",nextPre,{once:true})}}
/* a control that becomes disabled (Next on the last page, Zoom in at the
   largest size) would drop focus to the document: it moves to the page instead */
function hlvKeepFocus(){const d=HLV.el,a=document.activeElement;if(!d||!(d.open||d.hasAttribute("open")))return;
 if(!a||a===document.body||(a.disabled&&d.contains(a))){const st=d.querySelector("#hl-vw-stage");try{st.focus({preventScroll:true})}catch(e){}}}
function hlvKey(e){const d=HLV.el;if(!d||!(d.open||d.hasAttribute("open")))return;const k=e.key;
 if(k==="Tab"){const f=[...d.querySelectorAll('button:not([disabled]),a[href],[tabindex="0"]')].filter(x=>x.offsetParent!==null||x===document.activeElement);
  if(!f.length)return;const a=f.indexOf(document.activeElement);
  if(e.shiftKey&&(a<=0)){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&(a===f.length-1||a<0)){e.preventDefault();f[0].focus()}return}
 if(e.altKey||e.ctrlKey||e.metaKey)return;
 const go={ArrowRight:()=>hlvGo(HLV.i+1),PageDown:()=>hlvGo(HLV.i+1),ArrowLeft:()=>hlvGo(HLV.i-1),PageUp:()=>hlvGo(HLV.i-1),
  Home:()=>hlvGo(0),End:()=>{const v=hlvVol();if(v)hlvGo(v.pv.length-1)},"+":()=>hlvZoomTo(HLV.z+1),"=":()=>hlvZoomTo(HLV.z+1),"-":()=>hlvZoomTo(HLV.z-1),"_":()=>hlvZoomTo(HLV.z-1),
  "0":()=>hlvZoomTo(0),f:()=>hlvFull(),F:()=>hlvFull(),Escape:()=>{if(HLV.imm)hlvImm(false);else hlClose()}}[k];
 if(go){if((k==="Home"||k==="End")&&e.target.closest&&e.target.closest("a"))return;e.preventDefault();e.stopPropagation();go()}}
/* full screen: the Fullscreen API on the viewer's content (a dialog element
   itself may not be made full screen), or, where a browser has no such API
   (an iPhone, for one) or refuses, an immersive layout that gives the page
   the screen */
function hlvIsFull(){const f=document.fullscreenElement||document.webkitFullscreenElement;return !!(f&&HLV.el&&HLV.el.contains(f))}
function hlvFull(){const d=HLV.el;if(!d)return;
 if(hlvIsFull()){try{(document.exitFullscreen||document.webkitExitFullscreen).call(document)}catch(e){}return}
 if(HLV.imm){hlvImm(false);return}
 const t=d.querySelector(".hl-vw-in"),req=t&&(t.requestFullscreen||t.webkitRequestFullscreen),ok=document.fullscreenEnabled||document.webkitFullscreenEnabled;
 if(req&&ok){let done=false;const fall=()=>{if(!done&&!hlvIsFull()){done=true;hlvImm(true)}};
  try{const r=req.call(t);if(r&&r.then)r.then(()=>{done=true},fall);else setTimeout(fall,450)}catch(e){fall()}}else hlvImm(true)}
function hlvImm(on){HLV.imm=!!on;if(HLV.el)HLV.el.classList.toggle("is-imm",HLV.imm);hlvFullSync()}
function hlvFullSync(){const d=HLV.el;if(!d)return;const on=hlvIsFull()||HLV.imm,b=d.querySelector('[data-a="full"]');
 d.classList.toggle("is-full",on);if(b){b.setAttribute("aria-pressed",on?"true":"false");b.setAttribute("aria-label",on?"Leave full screen":"Full screen");b.title=on?"Leave full screen (F)":"Full screen (F)";b.innerHTML=hlIc(on?"exit":"full")}
 if(d.open||d.hasAttribute("open"))requestAnimationFrame(()=>hlvLayout(true))}
/* swipe on a touch screen; drag to move a zoomed page with a mouse */
function hlvDown(e){if(e.button>0)return;const st=e.currentTarget;
 HLV.ptr={x:e.clientX,y:e.clientY,t:Date.now(),sl:st.scrollLeft,stp:st.scrollTop,type:e.pointerType,drag:HLV.z>0&&e.pointerType==="mouse"};
 if(HLV.ptr.drag){st.classList.add("is-drag");try{st.setPointerCapture(e.pointerId)}catch(x){}}}
function hlvMove(e){const P=HLV.ptr;if(!P||!P.drag)return;const st=e.currentTarget;st.scrollLeft=P.sl-(e.clientX-P.x);st.scrollTop=P.stp-(e.clientY-P.y)}
function hlvUp(e){const P=HLV.ptr;HLV.ptr=null;const st=e.currentTarget;st.classList.remove("is-drag");if(!P||P.drag||HLV.z>0)return;
 const dx=e.clientX-P.x,dy=e.clientY-P.y;if(P.type!=="mouse"&&Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)*1.4&&Date.now()-P.t<900)hlvGo(HLV.i+(dx<0?1:-1))}
(function(){if(typeof document==="undefined")return;
 const fs=()=>{if(HLV.el)hlvFullSync()};
 document.addEventListener("fullscreenchange",fs);document.addEventListener("webkitfullscreenchange",fs);
 window.addEventListener("resize",()=>{if(HLV.el&&(HLV.el.open||HLV.el.hasAttribute("open")))hlvLayout(true)},{passive:true});
 window.addEventListener("popstate",()=>hlClose(true));window.addEventListener("hashchange",()=>hlClose(true));
 document.addEventListener("keydown",hlvKey,true)})();

/* ── until the UPSC section hands its Handbook Library tab to hlRender
   (PLAN.md), the library takes tab 3 itself. Once that section's own code
   calls hlRender, this does nothing. ─────────────────────────────────── */
(function(){if(typeof VIEWS==="undefined"||typeof VIEWS.upsc!=="function")return;
 const own=String(VIEWS.upsc)+(typeof upHandbooks==="function"?String(upHandbooks):"");if(/hlRender/.test(own))return;
 const prev=VIEWS.upsc;
 VIEWS.upsc=function(){if(TAB!==3)return prev.apply(this,arguments);const h=`<div class="up" data-tab="3">${hlRender(ARG)}</div>`;window._after=null;return h}})();

/* ── self-tests ─────────────────────────────────────────────────────────── */
function LIBSUITE(){const out=[];const T=(n,f)=>{let ok=false,det="";try{const r=f();ok=r===true||(r&&r.ok);if(r&&r.d)det=r.d}catch(e){det=e.message}out.push({n,ok:!!ok,detail:det})};
 const V=hlVols(),cat=hlRender(null),saved={...HL};
 T("Library · eleven volumes, each filed under one of the ten topics, every topic used",()=>V.length===11&&V.every(v=>HL_CATS.includes(v.category))&&HL_CATS.every(c=>V.some(v=>v.category===c)));
 T("Library · the catalogue has one heading and a card for every volume",()=>(cat.match(/<h1/g)||[]).length===1&&V.every(v=>cat.includes(`id="hl-c-${v.id}"`)));
 T("Library · every card shows ₹99, the page count and GET THIS HANDBOOK · ₹99",()=>V.every(v=>{const c=hlCard(v);return c.includes("₹99")&&c.includes(`<dd>${v.pages}</dd>`)&&c.includes("GET THIS HANDBOOK · ₹99")&&c.includes("Digital soft copy. Individual volume pricing.")}));
 T("Library · every enquiry carries the owner's message for its volume",()=>V.every(v=>{const m=fxHandbookMsg(v);return hlWa(v)===FX_CONTACT.wa()+"?text="+encodeURIComponent(m)&&hlMail(v).startsWith("mailto:"+FX_CONTACT.email()+"?")&&decodeURIComponent(hlMail(v)).includes(m)&&m.includes("Volume "+v.n+", "+v.title+",")}));
 T("Library · each volume page has one heading, its contents and its syllabus map",()=>V.every(v=>{const h=hlRender(v.id);return (h.match(/<h1/g)||[]).length===1&&(h.match(/class="hl-toc-l"/g)||[]).length===v.parts.length&&(h.match(/<tr>/g)||[]).length===v.map.length+1}));
 T("Library · every preview page is an image of this volume in A4 proportion, never a PDF",()=>V.every(v=>(v.pv||[]).length>=1&&v.pv.every(p=>p.src.startsWith(`assets/upsc/handbooks/${v.id}/`)&&/\.webp$/.test(p.src)&&Math.abs(p.h/p.w-Math.SQRT2)<0.02&&HL_KIND[p.kind]&&p.cap&&p.p>1&&p.p<=v.pages))&&!/\.pdf\b/i.test(cat+V.map(v=>hlRender(v.id)).join("")));
 T("Library · relevance is read from each volume's own record",()=>V.every(v=>{const r=hlRel(v);return r.pre===!!(v.pre&&v.map.some(m=>m[1]))&&r.mains===!!(v.mains&&v.map.some(m=>m[2]))}));
 T("Library · search finds a volume by a part, a concept and an institution",()=>{const f=q=>V.filter(v=>hlMatch(v,{q,cat:"",exam:"",vol:""})).map(v=>v.n).join(",");
  return f("buffer stocks").includes("X")&&f("Phillips curve")==="III"&&f("GST Council")==="IV"&&f("nothing like this zz")===""});
 T("Library · filters narrow by topic and volume",()=>V.filter(v=>hlMatch(v,{q:"",cat:"Money and Banking",exam:"",vol:""})).map(v=>v.n).join()==="II,VI"&&V.filter(v=>hlMatch(v,{q:"",cat:"",exam:"",vol:"volume-vii"})).length===1);
 T("Library · every volume has related volumes, never itself",()=>V.every(v=>{const r=hlRelated(v);return r.length>=2&&r.every(x=>x.v!==v)}));
 T("Library · the price is the catalogue's ₹99 and no other price appears",()=>{const h=cat+V.map(v=>hlRender(v.id)).join("");return hlPriceN()===99&&!/₹\s?(?!99\b)\d/.test(h.replace(/₹99\b/g,""))});
 T("Library · every link to a volume is a real address in the UPSC section",()=>V.every(v=>{const r=routeParse(hlHref(v.id));return r&&r.v==="upsc"&&r.t===3&&r.a===v.id}));
 Object.assign(HL,saved);
 return out}
EXTRA_SUITES.push(LIBSUITE);
