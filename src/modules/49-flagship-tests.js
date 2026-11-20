/* ═══════════════════════════════════════════════════════════════════════════
   FLAGSHIP · the checks for the shell, the shared home and the IB DP landing
   Each check reads the code that renders the page, not a description of it:
   the home's markup, the shell's navigation data, the footer as painted and
   the enquiry builders. The checks for the UPSC environment, the handbook
   library and the concepts live with those modules.
   ═══════════════════════════════════════════════════════════════════════════ */
function FLAGSHIPSUITE(){
 const out=[];
 const T=(n,f)=>{let ok=false,det="";try{const r=f();ok=r===true||(r&&r.ok===true);if(r&&r.d)det=r.d}catch(e){det=e.message}out.push({n,ok:!!ok,detail:det})};
 const txt=h=>String(h).replace(/<[^>]+>/g," ").replace(/\s+/g," ");
 const home=()=>{const k=[VIEW,TAB,ARG];VIEW="home";TAB=0;ARG=null;try{return VIEWS.home()}finally{VIEW=k[0];TAB=k[1];ARG=k[2]}};
 const ibl=()=>{const k=[VIEW,TAB,ARG];VIEW="ib";TAB=0;ARG=null;try{return VIEWS.ib()}finally{VIEW=k[0];TAB=k[1];ARG=k[2]}};
 /* a link is sound when the router knows its route, or it is mail, a phone, WhatsApp or another https page */
 const sound=href=>{
  if(!href||href==="#")return false;
  if(/^#/.test(href))return routeParse(href)!==null;
  if(/^\.\/\?intro=1$/.test(href))return true;
  return /^(mailto:[^\s@]+@[^\s@]+|tel:\+?\d+|https:\/\/wa\.me\/\d+(\?text=\S*)?|https:\/\/[^\s"]+)$/.test(href);
 };
 const hrefs=h=>[...String(h).matchAll(/<a\b[^>]*\bhref="([^"]*)"/g)].map(m=>m[1].replace(/&amp;/g,"&"));

 /* ── the shared home ── */
 T("Flagship · the home has one h1, and it is the platform's statement",()=>{const h=home();
  return (h.match(/<h1\b/g)||[]).length===1&&/Economics is not just a subject to study\./.test(txt(h))&&/It is a way to think\./.test(txt(h))});
 T("Flagship · the home carries the supporting statement and the platform's idea",()=>{const t=txt(home());
  return t.includes("An integrated learning ecosystem connecting economic concepts, visual understanding, real-world evidence and examination thinking.")
   &&t.includes("One discipline. Two pathways. A shared understanding of Economics.")&&t.includes("Think like an economist.")&&t.includes("Concepts. Content. Contexts.")});
 T("Flagship · the hero opens both pathways at once and shows the educator's photograph, uncropped and described",()=>{const h=home();const i=h.indexOf('<section class="hx'),j=h.indexOf('<div class="hx-paths">');const hero=h.slice(i,j);
  return /<a class="fx-btn hx-go ib" href="#\/ib">Explore IB DP Economics/.test(hero)&&/<a class="fx-btn hx-go up" href="#\/upsc">Explore UPSC CSE Economics/.test(hero)
   &&/<img src="assets\/brand\/arjun-agrawal-portrait-hero\.webp" width="539" height="674" alt="Arjun Agrawal[^"]+"/.test(hero)});
 T("Flagship · two pathway cards of equal weight, the brief's ten features each, its positioning line and their own call to action",()=>{const h=home();
  const card=c=>{const i=h.indexOf(`<article class="pc ${c}"`);return i<0?"":h.slice(i,h.indexOf("</article>",i))};
  const ib=card("pc-ib"),up=card("pc-up");const n=s=>((s.split('<ul class="pc-f">')[1]||"").split("</ul>")[0].match(/<li>/g)||[]).length;
  return n(ib)===10&&n(up)===10&&/Explore IB Economics/.test(ib)&&/Explore UPSC Economics/.test(up)&&/href="#\/ib"/.test(ib)&&/href="#\/upsc"/.test(up)
   &&ib.includes("Think conceptually. Apply theory. Evaluate real-world economics.")&&up.includes("Understand the Indian economy through concepts, institutions, policies and evidence.")
   &&/SL and HL learning pathways/.test(ib)&&/Extended Essay support/.test(ib)&&/The Indian Economy book/.test(up)&&/Digital Revision Companion/.test(up)&&/Intensive online coaching/.test(up)});
 T("Flagship · the figures on the pathway cards are counted from the platform's data",()=>{const n=rnCount(),h=home();
  return h.includes(`<b>${fmtN(n.diagrams)}</b> diagrams`)&&h.includes(`<b>${fmtN(n.cases)}</b> real-world cases`)&&h.includes(`<b>${fmtN(fxVols().length)}</b> handbooks`)&&h.includes(`<b>${fmtN(UP_CA.length)}</b> current-affairs notes`)});
 T("Flagship · the home's movements follow the brief, in order",()=>{const h=home();
  const ids=["hx-h","pc-ib-h","pc-up-h","bk-h","dc-h","th-h","eib-h","eup-h","res-h","lab-h","ac-h","eco-h","ab-h","ct-h"];
  const at=ids.map(id=>h.indexOf(`id="${id}"`));const ok=at.every((x,i)=>x>=0&&(i===0||x>at[i-1]));
  return ok?true:{ok:false,d:ids.filter((id,i)=>at[i]<0).join(", ")||"out of order"}});
 T("Flagship · headings on the home descend without skipping a level",()=>{const lv=[...home().matchAll(/<h([1-6])\b/g)].map(m=>+m[1]);
  return lv[0]===1&&lv.every((l,i)=>i===0||l<=lv[i-1]+1)});
 T("Flagship · every link on the home resolves",()=>{const bad=hrefs(home()).filter(x=>!sound(x));return bad.length?{ok:false,d:bad.slice(0,4).join(", ")}:true});
 T("Flagship · every image on the home has a width, a height and a description",()=>{const imgs=[...home().matchAll(/<img\b[^>]*>/g)].map(m=>m[0]);
  return imgs.length>0&&imgs.every(i=>/\bwidth="\d+"/.test(i)&&/\bheight="\d+"/.test(i)&&/\balt="[^"]+"/.test(i))});
 T("Flagship · every external link on the home says it leaves the platform",()=>{const a=[...home().matchAll(/<a\b[^>]*target="_blank"[^>]*>([\s\S]*?)<\/a>/g)];
  return a.every(m=>/aria-label="[^"]+"/.test(m[0])||/↗/.test(m[1]))&&a.every(m=>/rel="noopener noreferrer"/.test(m[0]))});
 T("Flagship · the handbook shelf shows all eleven covers, each opening its volume",()=>{const h=home();const s=(h.split('<ul class="shelf">')[1]||"").split("</ul>")[0];
  const v=fxVols();return v.length===11&&(s.match(/<li>/g)||[]).length===11&&v.every(x=>s.includes(fxLibHref(x.id)))});
 T("Flagship · the home sells nothing on the page: no payment, booking, countdown or scarcity",()=>{const t=txt(home());
  return /Nothing is booked or charged on this site/.test(t)&&!/(pay now|buy now|checkout|add to cart|seats? (left|remaining)|only \d+ (seats|places) left|hurry|countdown|limited time)/i.test(t)});
 T("Flagship · the home makes no claim about the Economics Optional",()=>!/Optional/.test(txt(home())));
 T("Flagship · the home's About band states only what the platform already states",()=>{const t=txt(home());
  return CV_AUTHOR.every(([k,v])=>t.includes(v))&&t.includes(FXI.roles)&&!/(best|number one|no\. ?1|#1|leading|top-rated|award)/i.test(t)});

 T("Flagship · a teacher's assignment link still opens on the home page with its banner",()=>{
  /* the link is read through assignFromHash(); it is stood in for here, so the address is never touched */
  const f=assignFromHash;let h="";
  try{assignFromHash=()=>({t:"Week 3",i:[["q","x"]]});h=home()}finally{assignFromHash=f}
  return /An assignment was shared with you/.test(h)&&/Week 3/.test(h)&&h.indexOf("An assignment was shared")<h.indexOf('class="fxhome"')});

 /* ── the IB DP landing ── */
 T("Flagship · the IB DP landing keeps the full IB home page beneath its pathway header",()=>{const h=ibl();
  return /id="ibl-h"/.test(h)&&/id="cv-h"/.test(h)&&h.length>RN.homePrev().length&&(h.match(/<h1\b/g)||[]).length===1});
 T("Flagship · the IB DP landing no longer repeats the pathway band the shared home replaced",()=>{const h=ibl();
  return typeof upHomeBand!=="function"||!h.includes(upHomeBand())});

 /* ── the shell ── */
 T("Flagship · the IB DP navigation holds the five groups of the brief, and every item resolves",()=>{const g=fxIbGroups();
  return g.map(x=>x.k).join(",")==="learn,explore,practise,research,resources"&&g.every(x=>x.items.length>=4&&x.items.every(i=>sound(i.href)))});
 T("Flagship · every section a reader can open is reachable from the new navigation",()=>{
  const inNav=new Set(["home","ib","upsc","about","contact","concepts","design"]);
  FX_IBNAV.forEach(g=>g.items.forEach(i=>inNav.add(i[1])));FX_IBPROGRESS.forEach(i=>inNav.add(i[1]));
  /* and whatever the header and the Resources menu actually link */
  const g=document.getElementById("gnav");hrefs((g?g.innerHTML:"")+fxResPanelHtml()).forEach(x=>{const r=/^#/.test(x)&&routeParse(x);if(r)inNav.add(r.v)});
  const miss=SECTIONS.filter(s=>!s.hide&&!inNav.has(s.v)).map(s=>s.v);return miss.length?{ok:false,d:miss.join(", ")}:true});
 T("Flagship · each view belongs to one pathway, or to both",()=>fxPathway("home")==="shared"&&fxPathway("about")==="shared"&&fxPathway("upsc")==="upsc"
  &&fxPathway("learn")==="ib"&&fxPathway("ib")==="ib"&&fxPathway("lab")==="ib");
 T("Flagship · the header, the context bar and the panels carry no placeholder link",()=>{
  const k=[VIEW,TAB];const all=[];
  ["home","ib","upsc","learn"].forEach(v=>{VIEW=v;TAB=0;try{fxPaintShell()}catch(e){}
   ["gnav","ctxbar"].forEach(id=>{const e=document.getElementById(id);if(e)all.push(...hrefs(e.innerHTML))})});
  VIEW=k[0];TAB=k[1];try{fxPaintShell()}catch(e){}
  ["ib","upsc","learn","explore","practise","research","resources"].forEach(p=>all.push(...hrefs(fxPanelHtml(p))));
  all.push(...hrefs(fxDrawerHtml()));
  const bad=all.filter(x=>!sound(x));return all.length>60&&(bad.length?{ok:false,d:bad.slice(0,4).join(", ")}:true)});
 T("Flagship · the global navigation names Home, both pathways and About",()=>{const e=document.getElementById("gnav");const t=e?e.textContent:"";
  return /Home/.test(t)&&/IB DP Economics/i.test(t)&&/UPSC CSE Economics/i.test(t)&&/About/.test(t)});
 T("Flagship · the brand reads Arjun Agrawal · Economics and leads home",()=>{const b=document.querySelector(".brand");
  return !!b&&b.getAttribute("href")==="#/"&&/Arjun Agrawal/.test(b.textContent)&&/ECONOMICS/.test(b.textContent)&&!/IB DP ECONOMICS/.test(b.textContent)});

 /* ── enquiries ── */
 T("Flagship · enquiries use only the contact details the site already publishes",()=>{
  const em=FX_CONTACT.email(),wa=FX_CONTACT.wa();
  return em===TUT.email&&CONTACT.some(c=>c.href==="mailto:"+em)&&/^https:\/\/wa\.me\/\d{10,15}$/.test(wa)&&CONTACT.some(c=>c.href===wa)});
 T("Flagship · every standing enquiry opens WhatsApp and email with a written message",()=>Object.keys(FX_ENQ).every(k=>{const l=fxEnquiryLinks(k);
  return /^https:\/\/wa\.me\/\d+\?text=\S+$/.test(l.wa)&&/^mailto:[^?]+\?subject=\S+&body=\S+$/.test(l.mail)&&l.msg.length>40}));
 T("Flagship · the course enquiry is in the owner's words",()=>FX_ENQ.upCourse.msg==="Hello, I am interested in joining the three-month UPSC CSE Economics Intensive Online Programme priced at ₹9,999. Please share the upcoming batch schedule and enrolment details.");
 T("Flagship · the handbook enquiry is in the owner's words",()=>fxHandbookMsg({n:"III",title:"Inflation and Price Stability"})==="Hello, I am interested in purchasing Volume III, Inflation and Price Stability, of the Arjun Agrawal Economics Handbook Series. Please share the payment and delivery details.");

 /* ── the footer and the welcome dialogue ── */
 T("Flagship · the footer keeps the IB statement and adds a separate UPSC statement",()=>{const f=document.querySelector("footer.ft");const t=f?f.textContent.replace(/\s+/g," "):"";
  return t.includes("It is not an official IB platform and is not endorsed by the International Baccalaureate Organization.")&&/not affiliated with or endorsed by the Union Public Service Commission/.test(t)&&/not a preparation for the Economics Optional/.test(t)});
 T("Flagship · the footer opens both pathways with equal weight",()=>{const n=document.querySelector("footer.ft .ft-paths");
  return !!n&&n.querySelectorAll('a[href="#/ib"]').length===1&&n.querySelectorAll('a[href="#/upsc"]').length===1});
 /* ── the Arjun Agrawal Academic Ecosystem: two sister platforms in five places, never a third pathway ── */
 const ecoLinks=(h,u)=>{const t=document.createElement("template");t.innerHTML=h;return [...t.content.querySelectorAll("a")].filter(a=>a.getAttribute("href")===u)};
 T("Academic Ecosystem · the addresses are the three platforms' production addresses, with no placeholder",()=>
  FX_ECO.map(e=>e.url).join(" ")==="https://ib-economics-pi.vercel.app/ https://the-business-brief-dun.vercel.app/ https://arjun-agrawal-political-studies.vercel.app/"
  &&FX_ECO.map(e=>e.name).join("|")==="Economics|The Business Brief|Political Studies & Global Affairs"&&FX_ECO.filter(e=>e.current).length===1&&FX_ECO[0].current);
 T("Academic Ecosystem · the header menu, the drawer, the home, the footer and About each link once to each sister, in a new tab with rel noopener noreferrer",()=>{
  const f=document.querySelector("footer.ft .ft-paths");
  const all={menu:fxEcoPanelHtml(),drawer:fxDrawerHtml(),home:fxEcosystem(),footer:f?f.innerHTML:"",about:abEcosystem()};
  const bad=[];for(const [k,h] of Object.entries(all))for(const u of [FX_BB.url,FX_PS.url]){const L=ecoLinks(h,u);
   if(L.length!==1||!L.every(a=>a.target==="_blank"&&a.rel==="noopener noreferrer"&&a.textContent.includes("↗")&&/opens in a new tab/.test(a.textContent)))bad.push(k+": "+u)}
  return bad.length?{ok:false,d:bad.join(", ")}:true});
 T("Academic Ecosystem · the header carries the menu after About, and the menu marks Economics as the platform you are on",()=>{
  const g=document.getElementById("gnav"),b=g&&g.querySelector("button.gn-eco");const t=document.createElement("template");t.innerHTML=fxEcoPanelHtml();
  const cur=t.content.querySelectorAll("[aria-current]");const items=[...g.children].map(x=>x.className);
  return !!b&&b.getAttribute("aria-label")==="Academic Ecosystem"&&b.getAttribute("aria-controls")==="fxpanel"&&items.indexOf("gn-eco")>items.map((c,k)=>/gn-item/.test(c)?k:-1).reduce((m,k)=>Math.max(m,k),-1)
   &&cur.length===1&&cur[0].getAttribute("href")==="#/"&&/Economics/.test(cur[0].textContent)&&/You are here/.test(cur[0].textContent)
   &&[...t.content.querySelectorAll(".fxe b")].map(x=>x.textContent).join("|")==="Economics|The Business Brief|Political Studies & Global Affairs"});
 T("Academic Ecosystem · the sisters are not pathways: no pathway colour, no place in the switcher, the two pathways keep equal weight",()=>{
  const sw=fxSwitcher("shared","x"),f=document.querySelector("footer.ft .ft-paths");
  return !/business|political/i.test(sw)&&!/pathway 03|p-(bb|ps)[^"]*\b(ib|up)\b/i.test(fxEcosystem()+(f?f.innerHTML:""))&&FX_SHARED.has("home")
   &&!!f&&[...f.querySelectorAll(".ft-path.p-bb .ft-pn,.ft-path.p-ps .ft-pn")].map(x=>x.textContent).join("|")==="Beyond Economics|Beyond Economics"&&f.querySelectorAll(".ft-path.p-ib,.ft-path.p-up").length===2});
 T("Academic Ecosystem · the home section reads as the final brief asks: its heading, the shared identity, the three names, lines and taglines, and nothing claimed",()=>{const t=txt(fxEcosystem());
  return t.includes("One educator. Three disciplines.")&&t.includes("One connected learning ecosystem.")&&t.includes("Knowledge. Insight. Impact.")&&/You are here/.test(t)
   &&["Arjun Agrawal | IB DP Economics and UPSC CSE Economics","IB DP Business Management","IB DP Global Politics | Indian Polity | International Relations | PSIR"].every(x=>t.includes(x))
   &&["Think like an economist.","Strategy. Leadership. Decisions.","Understand power, politics and global affairs."].every(x=>t.includes(x))
   &&!/(best|number one|award|students use|trusted by|\d+\s*(students|users))/i.test(t)});
 T("Academic Ecosystem · the footer names the ecosystem, says which platform this is and lists the pathways, then the two sisters",()=>{
  const f=document.querySelector("footer.ft .ft-paths");if(!f)return false;const t=f.textContent.replace(/\s+/g," ");
  const o=["IB DP Economics","UPSC CSE Economics","The Business Brief","Political Studies & Global Affairs"].map(x=>t.indexOf(x));
  return f.getAttribute("aria-label")==="The Arjun Agrawal Academic Ecosystem"&&/You are on Economics/.test(t)&&o.every((x,k)=>x>=0&&(k===0||x>o[k-1]))});
 T("Academic Ecosystem · About shows the three platforms after the platform story",()=>{const h=aboutPage();
  return h.includes('id="ab-e"')&&h.indexOf('id="ab-s"')<h.indexOf('id="ab-e"')&&(h.match(/class="eco-card /g)||[]).length===3});
 T("Flagship · the welcome dialogue waits for the IB DP environment",()=>/fxPathway\(VIEW\)!=="ib"/.test(String(bootOnboarding))&&typeof FX_OB.run==="function");

 /* ── motion ── */
 T("Flagship · the home's motion stops for reduced motion",()=>{
  for(const ss of document.styleSheets){let rs;try{rs=ss.cssRules}catch(e){continue}
   for(const r of rs){if(!r.media||!/prefers-reduced-motion:\s*reduce/.test(r.media.mediaText))continue;
    for(const x of r.cssRules)if(x.selectorText&&/\.hx-d\b/.test(x.selectorText)&&/\.hx-s\b/.test(x.selectorText)&&x.style.animationName==="none")return true}}
  return false});
 return out;
}
FLAGSHIPSUITE.suiteName="Flagship";
EXTRA_SUITES.push(FLAGSHIPSUITE);
