/* ═══════════════════════════════════════════════════════════════════════════
   RESOURCE STUDIO · LEARNING DESIGN · CONTACT AND COLLABORATION
   The Studio presents Arjun's wider work from the public manifest (STUDIO,
   generated from content/studio/showcase.json). It never names a private file:
   every image is a screen-resolution excerpt in assets/studio/, and the complete
   resources are reached only by enquiry. Three treatments are used, chosen by
   the asset rather than forced into one card: A shows real excerpts that open in
   a viewer, B shows a working miniature or a walkthrough, C shows a collection
   as a learning journey. Learning design walks one real topic (PED) through
   the seven moves the resources are built on. Contact uses the addresses the
   site already publishes: a prefilled email or a WhatsApp message, never a
   form that pretends to send.
   ═══════════════════════════════════════════════════════════════════════════ */
const ST={aud:"all",ret:null,dlg:null};
const ST_AUD=[["all","Everyone"],["Students","For students"],["Teachers","For teachers"]];
SECTIONS.push({v:"studio",n:"Learning Studio",tabs:["All work"].concat(STUDIO.types.map(t=>t.n))});
SECTIONS.push({v:"design",n:"Learning design",hide:1});
SECTIONS.push({v:"contact",n:"Contact and collaboration",hide:1});
const stItem=id=>STUDIO.items.find(i=>i.id===id);
const stType=k=>STUDIO.types.find(t=>t.k===k);
const stTab=it=>1+STUDIO.types.findIndex(t=>t.k===it.type);
const stHref=it=>routeFormat("studio",stTab(it),it.id);
const stCat=k=>STUDIO.enquiries.find(e=>e.k===k)||STUDIO.enquiries[STUDIO.enquiries.length-1];
const stForAud=it=>ST.aud==="all"||it.audience.some(a=>a===ST.aud||(ST.aud==="Teachers"&&/teacher|supervisor|coordinator|head/i.test(a)));
const stShare=it=>STUDIO.site+"studio/"+it.id+"/";
/* the carousel covers are already embedded in the page for Learn; the Studio reuses them */
function stC60(id){try{return C60COVER[id]||""}catch(e){return ""}}
function stImg(p,cls,eager){return `<img class="${cls||""}" src="assets/studio/${esA(p.src)}" alt="${esA(p.alt)}" width="${p.w}" height="${p.h}"${eager?"":' loading="lazy"'} decoding="async">`}
/* an email the visitor sends from their own app: subject and a short body prefilled, nothing sent from here */
function stMail(k,title){const c=stCat(k);
 return "mailto:"+TUT.email+"?subject="+encodeURIComponent(c.subject+(title?": "+title:""))
  +"&body="+encodeURIComponent("Hello Arjun,\n\n"+(title?"I would like to know more about: "+title+".\n\n":"")+"I am a (student / teacher / school leader / other): \nSchool or organisation (optional): \nMy question: \n\nThank you.")}
function stWa(k,title){const c=stCat(k),w=(CONTACT.find(x=>x.k==="whatsapp")||{href:"https://wa.me/917092844945"}).href;return w+"?text="+encodeURIComponent("Hello Arjun, "+c.subject.toLowerCase()+(title?" about "+title:"")+".")}
function stAccess(it){return it.disclosure===1
 ?"Shown here: "+it.previewFormat.toLowerCase()+". The complete resource is not published online; ask if you would like to know more."
 :"Open on this platform: "+it.previewFormat.toLowerCase()+"."}
function stDate(d){try{return new Date(d+"T12:00:00Z").toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}catch(e){return d}}
function stCopy(url){const done=()=>toast("Link copied: "+url);
 try{navigator.clipboard.writeText(url).then(done,()=>toast(url))}catch(e){toast(url)}}
/* ── the viewer: a native dialog, so focus is held and Escape closes it ── */
function stView(id,i){const it=stItem(id);if(!it||!it.previews.length)return;const n=it.previews.length;i=((i%n)+n)%n;const p=it.previews[i];
 let d=document.getElementById("st-dlg");
 if(!d){d=document.createElement("dialog");d.id="st-dlg";d.className="st-dlg";d.setAttribute("aria-labelledby","st-dlg-t");document.body.appendChild(d);
  d.addEventListener("click",e=>{if(e.target===d)d.close()});
  d.addEventListener("keydown",e=>{if(!ST.dlg)return;if(e.key==="ArrowRight"){e.preventDefault();stView(ST.dlg.id,ST.dlg.i+1)}if(e.key==="ArrowLeft"){e.preventDefault();stView(ST.dlg.id,ST.dlg.i-1)}});
  d.addEventListener("close",()=>{const r=ST.ret;ST.ret=null;ST.dlg=null;if(r&&r.isConnected)r.focus()})}
 if(!d.open)ST.ret=document.activeElement;ST.dlg={id,i};
 d.innerHTML=`<div class="st-dlg-in"><div class="st-dlg-bar"><h2 class="st-dlg-t" id="st-dlg-t">${esc(it.title)} <span>· excerpt ${i+1} of ${n}</span></h2>
   <button class="btn sm gh st-x" onclick="document.getElementById('st-dlg').close()">Close</button></div>
  <figure class="st-dlg-f">${stImg(p,"",true)}<figcaption>${esc(p.cap||"")}</figcaption></figure>
  <div class="st-dlg-ft"><p class="xs">An excerpt at screen resolution. The complete resource is not published online.</p>
   ${n>1?`<div class="row"><button class="btn sm gh" onclick="stView('${it.id}',${i-1})" aria-label="Previous excerpt">← Previous</button><button class="btn sm gh" onclick="stView('${it.id}',${i+1})" aria-label="Next excerpt">Next →</button></div>`:""}</div></div>`;
 if(!d.open)d.showModal();(d.querySelector(".st-x")||d).focus()}
/* ── the miniature lab: PED along P = 90 − Q, the same curve the PED explainer uses ── */
const PD={p:30,guess:null};
const pdCalc=p=>{const q=90-p;return {p,q,ped:p/q,tr:p*q}};
const pdClass=e=>Math.abs(e-1)<1e-9?"unit elastic":e>1?"price elastic":"price inelastic";
function pdSVG(){const r=pdCalc(PD.p),X=q=>40+q*4,Y=p=>330-p*3.4;
 return `<svg class="pd-svg" viewBox="0 0 420 370" role="img" aria-label="${esA(pdAlt())}" focusable="false">
  <rect class="pd-tr" x="${X(0)}" y="${Y(r.p)}" width="${X(r.q)-X(0)}" height="${Y(0)-Y(r.p)}"/>
  <g class="pd-ax"><line x1="40" y1="20" x2="40" y2="330"/><line x1="40" y1="330" x2="410" y2="330"/></g>
  <line class="pd-mid" x1="${X(45)}" y1="${Y(45)}" x2="${X(45)}" y2="330"/>
  <line class="pd-d" x1="${X(0)}" y1="${Y(90)}" x2="${X(90)}" y2="${Y(0)}"/>
  <g class="pd-drop"><line x1="${X(r.q)}" y1="${Y(r.p)}" x2="${X(r.q)}" y2="330"/><line x1="40" y1="${Y(r.p)}" x2="${X(r.q)}" y2="${Y(r.p)}"/></g>
  <circle class="pd-pt" cx="${X(r.q)}" cy="${Y(r.p)}" r="6"/>
  <text class="pd-t" x="34" y="${Y(r.p)+4}" text-anchor="end">$${r.p}</text><text class="pd-t" x="${X(r.q)}" y="350" text-anchor="middle">${r.q}</text>
  ${X(r.q)-40>=130?`<text class="pd-t pd-tl" x="${(X(r.q)+40)/2}" y="${(Y(r.p)+330)/2+5}" text-anchor="middle">TR $${r.tr.toLocaleString("en-GB")}</text>`
   :`<text class="pd-t pd-tl" x="${X(r.q)+12}" y="${Math.max(Y(r.p)+40,(Y(r.p)+330)/2+5)}">TR $${r.tr.toLocaleString("en-GB")}</text>`}
  <text class="pd-t pd-dl" x="${X(60)}" y="${Y(42)}">D: P = 90 − Q</text>
  <text class="pd-t pd-al" x="44" y="16">Price ($)</text><text class="pd-t pd-al" x="410" y="366" text-anchor="end">Quantity</text></svg>`}
function pdAlt(){const r=pdCalc(PD.p);return `Linear demand P = 90 − Q. At a price of $${r.p} quantity demanded is ${r.q}; |PED| is ${r.ped.toFixed(2)}, so demand is ${pdClass(r.ped)} here, and total revenue, the shaded rectangle, is $${r.tr.toLocaleString("en-GB")}.`}
function pdRead(){const r=pdCalc(PD.p),c=pdClass(r.ped);
 const next=c==="unit elastic"?"Total revenue is at its maximum here: a small price change either way lowers it.":c==="price elastic"?"A small price rise would lower total revenue: the quantity lost outweighs the higher price.":"A small price rise would raise total revenue: the higher price outweighs the quantity lost.";
 return `At $${r.p}, |PED| = ${r.p} ÷ ${r.q} = ${r.ped.toFixed(2)}: demand is ${c}. ${next}`}
function pdGuess(g){PD.guess=g;pdPaint()}
function pdSet(v){PD.p=+v;pdPaint()}
function pdPaint(){const f=document.getElementById("pd-fig"),o=document.getElementById("pd-read"),fb=document.getElementById("pd-fb"),r=pdCalc(PD.p);
 if(f)f.innerHTML=pdSVG();if(o)o.textContent=pdRead();
 document.querySelectorAll("[data-pd]").forEach(el=>{const k=el.dataset.pd;el.textContent=k==="ped"?r.ped.toFixed(2):k==="tr"?"$"+r.tr.toLocaleString("en-GB"):k==="q"?String(r.q):"$"+r.p});
 if(fb){if(PD.guess===null){fb.textContent="";return}
  const up=pdCalc(Math.min(85,PD.p+5)),rises=up.tr>r.tr,same=up.tr===r.tr,ok=(PD.guess==="rise")===rises&&!same;
  fb.innerHTML=same?"Either way, very nearly: at this point revenue barely changes.":`${ok?"<b>Right.</b>":"<b>Not this time.</b>"} From $${r.p} to $${up.p}, revenue ${rises?"rises":"falls"} from $${r.tr.toLocaleString("en-GB")} to $${up.tr.toLocaleString("en-GB")}, because demand is ${pdClass(r.ped)} here. Move the price and predict again.`}}
function pdDemo(o){o=o||{};const r=pdCalc(PD.p);
 return `<div class="pd ${o.cls||""}"><div class="pd-fig" id="pd-fig">${pdSVG()}</div>
  <div class="pd-ctl"><div class="pd-k">${esc(o.k||"Predict, then check")}</div>
   <p class="pd-q">If the price rises by $5 from here, will total revenue rise or fall?</p>
   <div class="row pd-gs" role="group" aria-label="Your prediction"><button class="btn sm" onclick="pdGuess('rise')">It will rise</button><button class="btn sm gh" onclick="pdGuess('fall')">It will fall</button></div>
   <p class="pd-fb" id="pd-fb" aria-live="polite"></p>
   <label class="pd-rg" for="pd-p"><span>Price</span><input id="pd-p" type="range" min="5" max="85" step="5" value="${PD.p}" oninput="pdSet(this.value)" aria-describedby="pd-read"></label>
   <dl class="pd-dl"><div><dt>Price</dt><dd data-pd="p">$${r.p}</dd></div><div><dt>Quantity</dt><dd data-pd="q">${r.q}</dd></div><div><dt>|PED|</dt><dd data-pd="ped">${r.ped.toFixed(2)}</dd></div><div><dt>Total revenue</dt><dd data-pd="tr">$${r.tr.toLocaleString("en-GB")}</dd></div></dl>
   <p class="pd-read" id="pd-read" aria-live="polite">${esc(pdRead())}</p>
   <p class="xs pd-note">HL: elasticity changes along a straight-line demand curve even though its slope does not. On this curve the slope is −1, so |PED| at a point is simply P ÷ Q.</p></div></div>`}
/* ── showcase cards: one shape per treatment rather than one card for all ── */
function stCover(it,big){
 if(it.collection&&it.collection.from==="c60")return `<span class="st-fan" aria-hidden="true">${["001","006","010"].map((x,i)=>stC60(x)?`<img src="${stC60(x)}" alt="" width="360" height="450" loading="lazy" decoding="async" style="--i:${i}">`:"").join("")}</span>`;
 if(it.collection&&it.collection.from==="mindmaps")return `<span class="st-net" aria-hidden="true"><svg viewBox="0 0 200 120">${[[30,60],[80,28],[80,92],[135,60],[180,30],[180,92]].map((p,i,a)=>i?`<line x1="${a[[0,0,0,1,3,3][i]][0]}" y1="${a[[0,0,0,1,3,3][i]][1]}" x2="${p[0]}" y2="${p[1]}"/>`:"").join("")}${[[30,60],[80,28],[80,92],[135,60],[180,30],[180,92]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="${i?7:11}"/>`).join("")}</svg></span>`;
 if(it.interaction&&it.interaction.demo)return `<span class="st-demo-th" aria-hidden="true"><svg viewBox="0 0 200 130"><rect x="20" y="58" width="72" height="62"/><line class="a" x1="20" y1="8" x2="20" y2="120"/><line class="a" x1="20" y1="120" x2="196" y2="120"/><line class="d" x1="20" y1="14" x2="186" y2="120"/><circle cx="92" cy="58" r="6"/></svg></span>`;
 return it.previews.length?stImg(it.previews[0],"st-im",big):""}
function stCard(it,lead){const t=stType(it.type);
 return `<li class="st-li ${lead?"lead":""}"><a class="st-card st-${it.type}" href="${stHref(it)}">
  <span class="st-fig">${stCover(it,lead)}</span>
  <span class="st-tx"><span class="st-k">${esc(it.kicker)}</span><span class="st-t">${esc(it.title)}</span>
   <span class="st-s">${esc(it.summary)}</span>
   ${lead?`<span class="st-lo"><b>Helps learners</b>${it.objectives.slice(0,3).map(o=>`<span>${esc(o)}</span>`).join("")}</span>`:""}
   <span class="st-m">${esc(it.format)}<span aria-hidden="true"> · </span>${esc(it.disclosure===1?"Excerpts only":"Open on the platform")}</span></span></a></li>`}
function studioIndex(){
 const types=TAB>0?[STUDIO.types[TAB-1]]:STUDIO.types;
 const groups=types.map(t=>[t,STUDIO.items.filter(i=>i.type===t.k&&stForAud(i))]).filter(([,a])=>a.length);
 const body=groups.length?groups.map(([t,a],g)=>`<section class="st-group" aria-labelledby="st-g-${t.k}">
   <div class="st-gh"><h2 id="st-g-${t.k}">${esc(t.n)}</h2><p class="sm">${esc(t.d)}</p></div>
   <ul class="st-grid st-grid-${t.k}${a.length===3?" has-lead":""}">${a.map((it,i)=>stCard(it,i===0&&a.length===3)).join("")}</ul></section>`).join("")
  :`<div class="st-empty"><p>Nothing in this group is aimed at that audience yet.</p><button class="btn sm" onclick="ST.aud='all';render()">Show everything</button></div>`;
 return `<section class="hero st-hero bg-ink"><div class="wrap full in st-hin">
  <div><div class="eb">Learning Studio</div><h1 class="st-h1 mt2">A glimpse of a wider body of work.</h1>
   <p class="lede mt3">Original resources for IB DP Economics: visual explainers, guides for students and teachers, interactive applications and series. Each is shown through a few real excerpts and an account of how it teaches; the complete resources are not published here.</p></div>
  <div class="st-aud" role="group" aria-label="Show resources for">${ST_AUD.map(([k,n])=>`<button class="st-chip" aria-pressed="${ST.aud===k}" onclick="ST.aud='${k}';render()">${esc(n)}</button>`).join("")}</div></div></section>
 <div class="wrap full st-body">${body}
  <aside class="st-aside"><p class="sm"><b>Looking for free materials to download?</b> The <button class="lnk" onclick="nav('resources')">Resource hub</button> links to the free library. The Studio is different: it shows work that is not published in full, so you can see how it teaches and ask about it.</p></aside></div>
 ${stEnquireBand()}`}
function stItemPage(it){const t=stType(it.type),tab=stTab(it),cat=stCat(it.enquiry);
 const facts=[["Format",it.format],["Level",it.level],["For",it.audience.join(", ")],["Topics",it.topics.join(", ")],["What you can see",stAccess(it)],["Checked",stDate(it.verified)+". "+it.checks]];
 let show="";
 if(it.treatment==="A"){const [lead,...rest]=it.previews;
  show=`<div class="st-a"><button class="st-lead" onclick="stView('${it.id}',0)" aria-label="Open excerpt 1 of ${it.previews.length} in the viewer: ${esA(lead.cap||"")}">${stImg(lead,"",true)}</button>
   <p class="st-cap">${esc(lead.cap||"")} <span class="st-zoom" aria-hidden="true">Select an excerpt to view it larger.</span></p>
   ${rest.length?`<ul class="st-strip" aria-label="More excerpts">${rest.map((p,i)=>`<li><button class="st-th" onclick="stView('${it.id}',${i+1})" aria-label="Open excerpt ${i+2}: ${esA(p.cap||"")}">${stImg(p)}<span>${esc(p.cap||"")}</span></button></li>`).join("")}</ul>`:""}</div>`}
 else if(it.treatment==="B"){
  if(it.interaction&&it.interaction.demo==="ped-revenue")show=`<div class="st-b">${pdDemo({k:"A working miniature: the elasticity lab"})}<p class="sm mt2">This is one small part of one lab. <a class="st-rel" href="${esA(it.interaction.live)}">Open the full lab →</a></p></div>`;
  else show=`<div class="st-b st-walk">${it.previews.length?`<button class="st-lead" onclick="stView('${it.id}',0)" aria-label="Open the title card in the viewer">${stImg(it.previews[0],"",true)}</button>`:""}
   <div class="st-wk"><div class="eb">How it is shown</div><p class="mt1">${esc((it.interaction&&it.interaction.note)||"")}</p></div></div>`}
 else if(it.treatment==="C")show=stCollection(it);
 const inside=(it.inside||[]).length?`<section class="st-sec"><h2>What the complete resource contains</h2><ul class="st-ins">${it.inside.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></section>`:"";
 return `<section class="hero st-hero st-ih bg-ink"><div class="wrap full in">
  <nav class="st-crumb" aria-label="Breadcrumb"><a class="st-rel" href="#/studio">Learning Studio</a> <span aria-hidden="true">/</span> <a class="st-rel" href="${routeFormat("studio",tab)}">${esc(t.n)}</a></nav>
  <div class="eb mt3">${esc(it.kicker)}</div><h1 class="st-h1 mt2">${esc(it.title)}</h1><p class="lede mt3">${esc(it.summary)}</p></div></section>
 <div class="wrap full st-body st-item">
  <div class="st-main">${show}
   <section class="st-sec"><h2>What it helps learners do</h2><ul class="st-obj">${it.objectives.map(o=>`<li>${esc(o)}</li>`).join("")}</ul></section>
   <section class="st-sec"><h2>The thinking behind it</h2><p class="ed">${esc(it.approach)}</p></section>${inside}</div>
  <aside class="st-side" aria-label="About this resource"><dl class="st-facts">${facts.map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
   <div class="st-ask"><div class="eb">Interested in exploring more?</div>
    <a class="btn a w st-cta" href="${esA(stMail(it.enquiry,it.title))}">Ask about this resource</a>
    <a class="btn gh w st-cta" href="${esA(stWa(it.enquiry,it.title))}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
    <p class="xs mt2">Opens your own email or WhatsApp with the message started. Nothing is sent from this page.</p>
    <button class="lnk mt2" onclick="stCopy('${esA(stShare(it))}')">Copy a link to this page</button></div>
   ${it.related.length?`<div class="st-relw"><div class="eb">On the platform</div><ul class="st-rels">${it.related.map(r=>`<li><a class="st-rel" href="${esA(r.route)}">${esc(r.label)} →</a></li>`).join("")}</ul></div>`:""}
   <p class="xs st-ib">Independent resource. Not produced or endorsed by the International Baccalaureate Organization.</p></aside></div>
 ${stMore(it)}`}
function stCollection(it){
 if(it.collection.from==="c60"){let C=[];try{C=C60}catch(e){}
  return `<div class="st-c"><p class="sm">Ten issues, each one idea told in ten pages. Every issue opens in full on the platform, with its syllabus link and retrieval questions.</p>
   <ol class="st-covers">${C.map(c=>`<li><button class="st-cov" onclick="c60Open('${c.id}')">${stC60(c.id)?`<img src="${stC60(c.id)}" alt="" width="360" height="450" loading="lazy" decoding="async">`:""}<span class="st-cn">Issue ${c.id}</span><span class="st-ct">${esc(c.t)}</span><span class="st-cs">${esc(c.topic)}</span></button></li>`).join("")}</ol></div>`}
 if(it.collection.from==="mindmaps"){let M={},n={};try{M=MIND_MAPS;n=rnCount()}catch(e){}
  const J=(it.collection.journey||[]).filter(k=>M[k]);
  return `<div class="st-c"><p class="sm">${n.maps?`${fmtN(n.maps)} maps and ${fmtN(n.nodes)} nodes on the platform. `:""}One journey through them: from the whole topic, to one concept, to the two places it connects with the rest of the course.</p>
   <ol class="st-jny">${J.map((k,i)=>`<li><button class="st-jn" onclick="nav('mind',0,'${esA(k)}')"><span class="st-jk">${i===0?"Topic":i===1?"Concept":"Connection"}</span><span class="st-jt">${esc(M[k].title)}</span><span class="st-js">${fmtN((M[k].nodes||[]).length)} nodes</span></button></li>`).join("")}</ol></div>`}
 return ""}
function stMore(it){const o=STUDIO.items.filter(x=>x.id!==it.id&&(x.type===it.type||x.topics.some(t=>it.topics.includes(t)))).slice(0,3);
 return o.length?`<section class="sec st-more"><div class="wrap full"><h2 class="st-mh">More from the Studio</h2><ul class="st-grid">${o.map(x=>stCard(x)).join("")}</ul></div></section>`:""}
VIEWS.studio=function(){const it=ARG?stItem(ARG):null;
 if(ARG&&!it)return `<section class="sec"><div class="wrap"><h1>That resource is not in the Studio</h1><p class="mt2">It may have been renamed or retired.</p><p class="mt3"><a class="btn" href="#/studio">See everything in the Studio</a></p></div></section>`;
 return it?stItemPage(it):studioIndex()};
/* ── the enquiry band, shared by the home page, the Studio and Learning design ── */
function stEnquireBand(){const sel=STUDIO.items.map(i=>`<option value="${i.id}">${esc(i.title)}</option>`).join("");
 return `<section class="sec st-enq bg-ink" aria-labelledby="st-enq-h"><div class="wrap full st-enq-in">
  <div><h2 class="st-enq-h" id="st-enq-h">Interested in exploring more?</h2>
   <p class="lede mt3">The website offers a selection of original Economics learning resources and interactive experiences. If you are an educator, student or school interested in learning more or discussing a possible collaboration, I would be happy to hear from you.</p></div>
  <div class="st-enq-a"><label class="st-enq-l" for="st-enq-r">What caught your interest? <span>(optional)</span></label>
   <select id="st-enq-r" onchange="stEnqSet(this.value)"><option value="">Something else, or nothing in particular</option>${sel}</select>
   <div class="row st-enq-b"><a class="btn lg a" id="st-enq-m" href="${esA(stMail("other",""))}">Write to Arjun</a><a class="btn lg on-ink" href="#/contact">Other ways to get in touch</a></div>
   <p class="xs st-enq-n">Opens your own email app with the message started. Nothing is sent from this page.</p></div></div></section>`}
/* the band's email names the resource the visitor chose, under that resource's own enquiry category */
function stEnqSet(id){const it=id?stItem(id):null,a=document.getElementById("st-enq-m");if(a)a.href=it?stMail(it.enquiry,it.title):stMail("other","")}
/* ═══ LEARNING DESIGN: seven moves, one real topic ═══════════════════════ */
const LD_STEPS=[
 ["Concept","Name the idea precisely, and say why it matters."],
 ["Model","Make the idea move, and predict what it will do."],
 ["Diagram","Draw it so the difference is seen before it is calculated."],
 ["Evidence","Attach the model to a market that exists."],
 ["Quantitative reasoning","Work it through, with numbers that can be checked."],
 ["Stakeholder perspectives","Ask who gains, who pays, and how much."],
 ["Analysis","Explain the mechanism that produces the result."],
 ["Evaluation","Ask where the model stops being true."],
 ["Judgement","Decide, for a stated aim, and say for whom."]];
const LD_CALC={p0:40,p1:60,q0:70,q1:63};
/* the practice question is written once and read by the home page and Learning design */
const LD_Q="A government wants to raise revenue with an indirect tax. Using a diagram, explain why it might choose a good with price-inelastic demand, and evaluate whether it should.";
function ldCalc(){const c=LD_CALC,dq=(c.q1-c.q0)/c.q0*100,dp=(c.p1-c.p0)/c.p0*100;return {dq,dp,ped:dq/dp,tr0:c.p0*c.q0,tr1:c.p1*c.q1,gain:(c.p1-c.p0)*c.q1,loss:c.p0*(c.q0-c.q1)}}
/* the incidence and revenue figures from the explainer's tax slides: one $27 tax, two markets */
const LD_TAX={tax:27,inel:{pc:64,pp:37,p0:40,q0:60,q1:54},el:{pc:43,pp:16,p0:40,q0:60,q1:54},rev:{inel:[60,54],el:[60,33]}};
function ldPrev(id,i){const it=stItem(id);return it&&it.previews[i]?it.previews[i]:null}
function ldFig(id,i){const p=ldPrev(id,i);return p?`<button class="ld-fig" onclick="stView('${id}',${i})" aria-label="Open in the viewer: ${esA(p.cap||"")}">${stImg(p)}</button>`:""}
function ldCase(){let c=null;try{c=RW_CASES.find(x=>x.id==="MIC-002")}catch(e){}return c}
function ldConcept(){let C=null;try{C=CONCEPTS.find(x=>x.id==="c-ped")}catch(e){}return C}
/* ── shared fragments: each explanation is written once, for Learning design and the home journey ── */
const LD={
 concept:()=>{const C=ldConcept();return `<p class="ld-def">${esc(C?C.def:"Price elasticity of demand measures how strongly quantity demanded responds to a change in price: %ΔQd ÷ %ΔP.")}</p>
  ${C?`<p class="sm mt2">${esc(C.why)}</p>`:""}<p class="mt2"><a class="st-rel" href="#/learn/concept-spine/c-ped">The concept page →</a></p>`},
 map:()=>`${ldFig("price-elasticity-of-demand",4)}<p class="sm mt2">A branch of the one-page revision map that closes the explainer: the degrees of elasticity, the TINS determinants and the HL extensions, each with the slides to revisit.</p><p class="mt2"><a class="st-rel" href="#/mind/mindmaps/ped">Open the interactive PED mindmap →</a></p>`,
 diagram:()=>`${ldFig("price-elasticity-of-demand",0)}<p class="sm mt2">Two demand curves through the same point, on the same axes and the same scale. The same 25% price cut raises quantity demanded by 50% on the flatter curve (|PED| = 50 ÷ 25 = 2, relatively elastic) and by 10% on the steeper one (|PED| = 10 ÷ 25 = 0.4, relatively inelastic).</p><p class="mt2"><a class="st-rel" href="#/lab/diagram-atlas/ped">The PED plate in the diagram atlas →</a></p>`,
 evidence:()=>{const cs=ldCase();return `${ldFig("price-elasticity-of-demand",3)}<p class="xs mt2">HL: primary commodities and manufactured products.</p>${cs?`<div class="ld-case"><div class="eb">A case on the platform · ${esc([cs.c,cs.y].filter(Boolean).join(" · "))}</div><h3 class="mt1">${esc(cs.t)}</h3>${cs.is?`<p class="sm mt1">${esc(cs.is)}</p>`:""}<p class="sm mt1">Fuel taxes raise steady revenue because demand for fuel is price inelastic in the short run.</p><p class="mt2"><a class="st-rel" href="${esA(routeFormat("world",0,cs.id))}">Read the case →</a></p></div>`:""}`},
 calc:fig=>{const r=ldCalc();return `${fig?ldFig("price-elasticity-of-demand",1):""}<div class="ld-calc"><p><b>A worked example.</b> The price rises from $${LD_CALC.p0} to $${LD_CALC.p1}; quantity demanded falls from ${LD_CALC.q0} to ${LD_CALC.q1}.</p>
   <ol class="ld-work"><li>%ΔQd = (${LD_CALC.q1} − ${LD_CALC.q0}) ÷ ${LD_CALC.q0} × 100 = ${r.dq.toFixed(0)}%</li><li>%ΔP = (${LD_CALC.p1} − ${LD_CALC.p0}) ÷ ${LD_CALC.p0} × 100 = +${r.dp.toFixed(0)}%</li>
    <li>PED = ${r.dq.toFixed(0)}% ÷ ${r.dp.toFixed(0)}% = ${r.ped.toFixed(1)}: |PED| &lt; 1, so demand is price inelastic</li>
    <li>Total revenue rises from $${r.tr0.toLocaleString("en-GB")} to $${r.tr1.toLocaleString("en-GB")}: a gain of $${r.gain.toLocaleString("en-GB")} on the units still sold outweighs the loss of $${r.loss.toLocaleString("en-GB")} on the units no longer sold</li></ol>
   <p class="mt2"><a class="st-rel" href="#/calculate/0/ped">Practise with the PED calculator →</a></p></div>`},
 stake:()=>{const T=LD_TAX,ri=T.tax*T.rev.inel[1],re=T.tax*T.rev.el[1];return `<dl class="ld-stake">
   <div><dt>Consumers</dt><dd>When demand is less elastic than supply, consumers bear most of a $${T.tax} tax: the price they pay rises from $${T.inel.p0} to $${T.inel.pc}, so $${T.inel.pc-T.inel.p0} of the $${T.tax}.</dd></div>
   <div><dt>Producers</dt><dd>When demand is more elastic than supply, producers bear most: the price they keep falls from $${T.el.p0} to $${T.el.pp}, so $${T.el.p0-T.el.pp} of the $${T.tax}.</dd></div>
   <div><dt>Government</dt><dd>With the same $${T.tax} tax, revenue is $${ri.toLocaleString("en-GB")} when quantity falls ${Math.round((T.rev.inel[0]-T.rev.inel[1])/T.rev.inel[0]*100)}% and $${re.toLocaleString("en-GB")} when it falls ${Math.round((T.rev.el[0]-T.rev.el[1])/T.rev.el[0]*100)}%.</dd></div></dl>
   <p class="xs mt2">Figures from the explainer's tax-revenue and incidence slides. Incidence depends on PED relative to PES.</p>`},
 analysis:()=>`${ldFig("price-elasticity-of-demand",2)}<p class="sm mt2">Total revenue is the rectangle P × Q. When |PED| &lt; 1 the higher price on the units still sold outweighs the units lost, so revenue rises with price; when |PED| &gt; 1 the units lost dominate and revenue falls; at |PED| = 1 the two effects offset.</p>`,
 evaluate:()=>`<ul class="ld-ev"><li><b>A tendency, not a rule.</b> Manufactured goods tend to face more elastic demand than primary commodities, but a medicine is manufactured and usually inelastic.</li>
   <li><b>Time changes the answer.</b> Demand is usually more elastic in the long run, as buyers find substitutes.</li>
   <li><b>Where you measure matters (HL).</b> On a straight-line demand curve PED changes at every point, so one figure describes one price.</li>
   <li><b>Other things are rarely equal.</b> An estimate taken while incomes or rival prices are changing mixes several effects together.</li></ul>
   <p class="mt2"><a class="st-rel" href="${esA(routeFormat("think",1))}">Stress-test an evaluation →</a></p>`,
 question:()=>`<div class="ld-q"><div class="eb">Practice question, written for this page</div>
   <p class="ld-qt mt1">${esc(LD_Q)}</p>
   <details class="ld-plan"><summary>Plan an answer</summary><ol>
    <li><b>Diagram.</b> Supply shifts up by the tax per unit against a steep demand curve; quantity falls only a little.</li>
    <li><b>Revenue.</b> Tax revenue is the tax per unit times the new quantity, so a small fall in quantity keeps revenue high. With the same $27 tax, revenue is $1,458 when quantity falls 10% and $891 when it falls 45%.</li>
    <li><b>Incidence.</b> When demand is less elastic than supply, most of the tax is passed on to consumers as a higher price.</li>
    <li><b>Judgement.</b> It depends on the aim. Inelastic demand suits raising revenue but works against reducing consumption, and the burden may fall heavily on households that cannot switch. A strong answer says which aim matters more, and over what period.</li></ol></details>
   <p class="xs mt2">An original question by Arjun Agrawal. It is not an IB examination question.</p></div>`};
function designPage(){
 const body=[LD.concept(),pdDemo({k:"The model, live"}),LD.diagram(),LD.evidence(),LD.calc(false),LD.stake(),LD.analysis(),LD.evaluate(),LD.question()];
 const step=(i,html)=>`<li class="ld-step" id="ld-${i+1}"><div class="ld-h"><span class="ld-n">${String(i+1).padStart(2,"0")}</span><h2>${esc(LD_STEPS[i][0])}</h2><p>${esc(LD_STEPS[i][1])}</p></div><div class="ld-b">${html}</div></li>`;
 return `<section class="hero ld-hero bg-ink"><div class="wrap full in">
  <div class="eb">Learning design</div><h1 class="st-h1 mt2">From a concept to a judgement.</h1>
  <p class="lede mt3">The resources are built around one progression. A concept becomes a model, the model a diagram; the diagram is tested against evidence, worked through with numbers and seen from each stakeholder's side; then it is analysed, its limits are evaluated and a judgement is made. This page follows a single real topic, price elasticity of demand, through all nine steps, using the platform's own materials.</p>
  <ol class="ld-rail" aria-label="The nine steps">${LD_STEPS.map(([t],i)=>`<li><a class="ld-r" href="#ld-${i+1}" onclick="event.preventDefault();document.getElementById('ld-${i+1}').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'})"><span>${String(i+1).padStart(2,"0")}</span>${esc(t)}</a></li>`).join("")}</ol></div></section>
 <div class="wrap full ld-body"><ol class="ld-steps">${body.map((h,i)=>step(i,h)).join("")}</ol>
 <section class="ld-why"><h2>Why this order</h2><p class="ed">Each step needs the one before it. A diagram drawn before the concept is clear becomes decoration; a calculation without a model is arithmetic; an evaluation without analysis is a list. The progression is the same whether the resource is a slide, a mindmap, a lab or a question, which is why they can be used together.</p>
  <p class="mt3"><a class="btn" href="#/studio/visual-explainers/price-elasticity-of-demand">See the PED explainer in the Learning Studio</a> <a class="btn gh" href="#/studio">All the work</a></p></section></div>
 ${stEnquireBand()}`}
VIEWS.design=designPage;
/* ═══ CONTACT AND COLLABORATION ═══════════════════════════════════════════ */
const CT={k:"resource",item:""};
function ctLinks(){const it=CT.item?stItem(CT.item):null,t=it?it.title:"";
 const m=document.getElementById("ct-mail"),w=document.getElementById("ct-wa"),s=document.getElementById("ct-sum");
 if(m)m.href=stMail(CT.k,t);if(w)w.href=stWa(CT.k,t);if(s)s.textContent=stCat(CT.k).subject+(t?": "+t:"")}
function ctPick(k){CT.k=k;if(k!=="resource")CT.item="";const f=document.getElementById("ct-res");if(f)f.hidden=k!=="resource";ctLinks()}
function contactPage(){
 return `<section class="hero ct-hero bg-ink"><div class="wrap full in"><div class="eb">Contact and collaboration</div>
  <h1 class="st-h1 mt2">Get in touch.</h1>
  <p class="lede mt3">For teachers, students, schools and anyone working in Economics education. Choose what your message is about, and your email app will open with it started. I reply personally; what can be shared depends on the enquiry.</p></div></section>
 <div class="wrap full ct-body"><div class="ct-grid">
  <div><fieldset class="ct-cats"><legend>What is your message about?</legend>
   ${STUDIO.enquiries.map(e=>`<label class="ct-cat"><input type="radio" name="ct-k" value="${e.k}" ${CT.k===e.k?"checked":""} onchange="ctPick('${e.k}')"><span class="ct-n">${esc(e.n)}</span><span class="ct-d">${esc(e.d)}</span></label>`).join("")}</fieldset>
   <div class="ct-res" id="ct-res"${CT.k==="resource"?"":" hidden"}><label for="ct-item" class="ct-l">Which resource? <span>(optional)</span></label>
    <select id="ct-item" onchange="CT.item=this.value;ctLinks()"><option value="">Not a particular one</option>${STUDIO.items.map(i=>`<option value="${i.id}" ${CT.item===i.id?"selected":""}>${esc(i.title)}</option>`).join("")}</select></div></div>
  <div class="ct-send"><div class="eb">Your message</div><p class="ct-sum mt1" id="ct-sum">${esc(stCat(CT.k).subject)}</p>
   <a class="btn lg a w" id="ct-mail" href="${esA(stMail(CT.k,""))}">Write the email</a>
   <a class="btn lg gh w" id="ct-wa" href="${esA(stWa(CT.k,""))}" target="_blank" rel="noopener noreferrer">Message on WhatsApp</a>
   <p class="xs mt2">These open your own email app or WhatsApp with a short message started. Nothing is sent from this page and nothing you choose here is stored.</p>
   <p class="sm mt3">Email: <a class="st-rel" href="mailto:${esA(TUT.email)}">${esc(TUT.email)}</a></p>
   <p class="xs mt2">Looking for one-to-one tutorials? The <button class="lnk" onclick="nav('tutorials')">Tutorials page</button> has the sessions and their terms.</p></div></div>
  <div class="ct-more"><div class="eb">Other ways to reach me</div><ul class="ct-ch">${["whatsapp","linkedin","instagram"].map(k=>CONTACT.find(c=>c.k===k)).filter(Boolean).map(c=>`<li><a class="st-rel" href="${esA(c.href)}" target="_blank" rel="noopener noreferrer">${esc(c.n)}</a></li>`).join("")}</ul></div></div>`}
VIEWS.contact=()=>{const h=contactPage();window._after=()=>ctLinks();return h};
/* the Resource hub and the Studio point at each other: the hub is the free
   library, the Studio is the wider work shown in part */
(function(){const prev=VIEWS.resources;if(typeof prev!=="function")return;VIEWS.resources=function(){const h=prev.apply(this,arguments);if(TAB!==0)return h;
 const i=h.indexOf("</section>");if(i<0)return h;
 return h.slice(0,i+10)+`<div class="wrap st-hubnote"><p class="sm"><b>Looking for original resources that are not in the library?</b> The <a class="st-rel" href="#/studio">Learning Studio</a> shows a selection of Arjun's wider work, in part, with a way to ask about each piece.</p></div>`+h.slice(i+10)}})();
/* a dialog left open must not survive a change of page */
/* and an item has its own title in the tab, in history and when shared */
(function(){const prev=render;render=function(){const d=document.getElementById("st-dlg");if(d&&d.open)d.close();const r=prev.apply(this,arguments);
 if(VIEW==="studio"&&ARG){const it=stItem(ARG);if(it)document.title=it.title+" · Learning Studio · Arjun Agrawal"}return r}})();
/* ── search: every Studio item, and the two new pages ── */
(function(){if(typeof buildIndex!=="function")return;const prev=buildIndex;
 buildIndex=function(){if(SIDX)return SIDX;const I=prev().slice();
  STUDIO.items.forEach(it=>I.push({k:"Learning Studio",t:it.title,d:it.summary,go:`nav('studio',${stTab(it)},'${it.id}')`,s:[it.id,it.kicker,it.topics.join(" "),it.audience.join(" "),it.format,"resource studio original work arjun"].join(" ")}));
  I.push({k:"Learning Studio",t:"Learning design: from a concept to a judgement",d:"Seven moves, followed through price elasticity of demand",go:"nav('design')",s:"learning design pedagogy approach sequence concept model evaluation judgement ped"});
  I.push({k:"Learning Studio",t:"Contact and collaboration",d:"Resource enquiries, school use, collaboration, workshops and custom resources",go:"nav('contact')",s:"contact email enquiry collaboration school workshop professional learning custom resource"});
  return SIDX=I};
 if(typeof RN_KIND_W!=="undefined")RN_KIND_W["Learning Studio"]=2.2;try{SIDX=null}catch(e){}})();
/* ── self-tests ─────────────────────────────────────────────────────────── */
function STUDIOSUITE(){const out=[];const T=(n,f)=>{let ok=false,det="";try{const r=f();ok=r===true||(r&&r.ok);if(r&&r.d)det=r.d}catch(e){det=e.message}out.push({n,ok:!!ok,detail:det})};
 const txt=h=>h.replace(/<[^>]+>/g," ").replace(/\s+/g," ");
 const keep=[VIEW,TAB,ARG];const at=(v,t,a,f)=>{try{VIEW=v;TAB=t;ARG=a;return f()}finally{VIEW=keep[0];TAB=keep[1];ARG=keep[2]}};
 T("Studio · only levels 1 and 2 are published, and every item is published",()=>STUDIO.items.length>0&&STUDIO.items.every(i=>(i.disclosure===1||i.disclosure===2)&&i.status==="published"));
 T("Studio · every preview is a screen-resolution WebP in assets/studio, with alternative text",()=>STUDIO.items.every(i=>i.previews.every(p=>/^[a-z0-9-]+\/[a-z0-9-]+\.webp$/.test(p.src)&&Math.max(p.w,p.h)<=1200&&p.alt.length>=40)));
 T("Studio · the manifest names no document, archive or private location",()=>{const s=JSON.stringify(STUDIO);return !/\.(pdf|pptx?|docx?|zip|key|psd)\b|uploads|[a-z]-assets\/|drive\.google|file:\/\//i.test(s)});
 T("Studio · every link to the platform resolves to a real page",()=>{const bad=[];STUDIO.items.forEach(i=>i.related.concat(i.interaction&&i.interaction.live?[{route:i.interaction.live}]:[]).forEach(r=>{if(!routeParse(r.route))bad.push(r.route)}));return {ok:!bad.length,d:bad.join(", ")}});
 T("Studio · every concept, map, case and calculation a link names exists",()=>{const bad=[];STUDIO.items.forEach(i=>i.related.forEach(r=>{const p=routeParse(r.route);if(!p||!p.a)return;
   const ok=p.v==="learn"?CONCEPTS.some(c=>c.id===p.a):p.v==="mind"?!!MIND_MAPS[p.a]:p.v==="calculate"?CALC.some(c=>c.id===p.a):p.v==="world"?RW_CASES.some(c=>c.id===p.a):p.v==="studio"?!!stItem(p.a):p.v==="lab"?DGKEYS.includes(p.a):p.v==="everywhere"?true:true;if(!ok)bad.push(r.route)}));return {ok:!bad.length,d:bad.join(", ")}});
 T("Studio · every enquiry opens an email to the published address, with the resource named",()=>STUDIO.items.every(i=>{const m=stMail(i.enquiry,i.title);return m.startsWith("mailto:"+TUT.email+"?subject=")&&decodeURIComponent(m).includes(i.title)}));
 T("Studio · only categories with real resources are offered, each with at least two",()=>STUDIO.types.every(t=>STUDIO.items.filter(i=>i.type===t.k).length>=2));
 T("Studio · every item page renders its treatment",()=>STUDIO.items.every(i=>{const h=at("studio",stTab(i),i.id,()=>VIEWS.studio());
   return h.includes(esc(i.title))&&(i.treatment!=="A"||h.includes("st-lead"))&&(i.treatment!=="C"||h.includes("st-c"))&&h.includes("Ask about this resource")}));
 T("Studio · the IB is not presented as endorsing anything",()=>{const h=txt(at("studio",0,null,()=>VIEWS.studio())+STUDIO.items.map(i=>at("studio",stTab(i),i.id,()=>VIEWS.studio())).join(""));
   return /not produced or endorsed by the International Baccalaureate/i.test(h)&&!/endorsed by the IB\b|official IB resource|IB-approved|approved by the IB/i.test(h.replace(/not produced or endorsed by the International Baccalaureate/gi,""))});
 T("Studio · an unknown item says so instead of failing",()=>/not in the Studio/.test(at("studio",0,"no-such-item",()=>VIEWS.studio())));
 T("Studio · the audience filter can empty a group and offers a way back",()=>{const a=ST.aud;try{ST.aud="Teachers";const h=at("studio",4,null,()=>VIEWS.studio());ST.aud="Students";const h2=at("studio",1,null,()=>VIEWS.studio());return h2.includes("st-card")&&(h.includes("st-card")||h.includes("Show everything"))}finally{ST.aud=a}});
 T("Lab miniature · PED along P = 90 − Q matches the explainer's four points",()=>[[70,3.5],[45,1],[20,0.2857],[10,0.125]].every(([p,e])=>Math.abs(pdCalc(p).ped-e)<0.001)&&pdCalc(45).tr===2025&&pdClass(1)==="unit elastic");
 T("Lab miniature · the revenue verdict follows the elasticity",()=>[10,20,30,40].every(p=>pdCalc(p+5).tr>pdCalc(p).tr)&&[50,60,70,80].every(p=>pdCalc(p+5).tr<pdCalc(p).tr));
 T("Learning design · the worked calculation is correct",()=>{const r=ldCalc();return Math.abs(r.dq+10)<1e-9&&Math.abs(r.dp-50)<1e-9&&Math.abs(r.ped+0.2)<1e-9&&r.tr0===2800&&r.tr1===3780&&r.gain===1260&&r.loss===280&&r.tr1-r.tr0===r.gain-r.loss});
 T("Learning design · the nine steps appear in order",()=>{const h=txt(designPage());let i=-1;return LD_STEPS.every(([s])=>{const j=h.indexOf(s,i+1);if(j<0)return false;i=j;return true})});
 T("Learning design · the practice question is labelled as original, not an IB question",()=>/not an IB examination question/.test(txt(designPage())));
 T("Contact · six categories, real addresses, and no form that pretends to send",()=>{const h=contactPage();return STUDIO.enquiries.length===6&&STUDIO.enquiries.every(e=>h.includes(esc(e.n)))&&!/<form/i.test(h)&&h.includes("mailto:"+TUT.email)&&/Nothing is sent from this page/.test(h)});
 T("Home · the hero leads with Think like an economist., then the headline, the copy and both actions",()=>{const h=txt(VIEWS.home());const c=VIEWS.home();return /<h1[^>]*id="cv-h"[^>]*>[\s\S]*?Think like[\s\S]*?an economist\.[\s\S]*?<\/h1>/.test(c)&&h.includes("Economics is not just a subject to study. It is a way to understand the world.")&&h.includes("An interactive IB DP Economics learning ecosystem connecting economic concepts, visual understanding, real-world evidence and exam thinking.")&&/Explore Economics/.test(h)&&/<a class="btn lg on-ink" href="#\/resources">Explore Resources<\/a>/.test(c)});
 T("Home · the exhibition, the six perspectives, the lab, the progression and the enquiry band are present",()=>{const h=txt(VIEWS.home());return ["Inside the Economics Learning Studio","One topic, six perspectives","Inside the learning lab","From concept to judgement","Interested in exploring more?"].every(x=>h.includes(x))});
 return out}
STUDIOSUITE.suiteName="Learning Studio";
EXTRA_SUITES.push(STUDIOSUITE);
QAREPORT.push({area:"Learning Studio",re:/^(Studio|Lab miniature|Learning design|Contact|Home ·)/,what:"The showcase publishes only level 1 and 2 metadata and screen-resolution excerpts; links, enquiries, the PED miniature, the worked calculation and the new home bands are checked."});
