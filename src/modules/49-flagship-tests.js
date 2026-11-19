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
  return t.includes("An interactive Economics learning ecosystem connecting economic concepts, visual understanding, real-world evidence and examination preparation across international and Indian perspectives.")
   &&t.includes("One discipline. Two pathways. A shared understanding of Economics.")});
 T("Flagship · two pathway cards of equal weight, eight features each and their own call to action",()=>{const h=home();
  const card=c=>{const i=h.indexOf(`<article class="pc ${c}"`);return i<0?"":h.slice(i,h.indexOf("</article>",i))};
  const ib=card("pc-ib"),up=card("pc-up");const n=s=>((s.split('<ul class="pc-f">')[1]||"").split("</ul>")[0].match(/<li>/g)||[]).length;
  return n(ib)===8&&n(up)===8&&/Explore IB Economics/.test(ib)&&/Explore UPSC Economics/.test(up)&&/href="#\/ib"/.test(ib)&&/href="#\/upsc"/.test(up)});
 T("Flagship · the home's movements follow the brief, in order",()=>{const h=home();
  const ids=["hx-h","pc-ib-h","pc-up-h","th-h","eib-h","eup-h","res-h","lab-h","ac-h","ab-h","ct-h"];
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
 /* ── The Business Brief: the wider academic ecosystem, in four places, never a third pathway ── */
 T("Business Brief · the header, the drawer, the home and the footer each link to it, in a new tab with rel noopener noreferrer",()=>{
  const g=document.getElementById("gnav"),f=document.querySelector("footer.ft .ft-paths");
  const all={header:g?g.innerHTML:"",drawer:fxDrawerHtml(),home:fxBusinessBrief(),footer:f?f.innerHTML:""};
  const bad=Object.entries(all).filter(([,h])=>{const L=[...h.matchAll(/<a\b[^>]*href="https:\/\/the-business-brief-dun\.vercel\.app\/"[^>]*>[\s\S]*?<\/a>/g)].map(m=>m[0]);
   return L.length!==1||!L.every(a=>/target="_blank"/.test(a)&&/rel="noopener noreferrer"/.test(a)&&/↗/.test(a)&&/opens in a new tab/.test(a))}).map(([k])=>k);
  return bad.length?{ok:false,d:bad.join(", ")}:true});
 T("Business Brief · it is a sister platform, not a third pathway: no pathway colour, no place in the switcher, the two pathways keep equal weight",()=>{
  const sw=fxSwitcher("shared","x"),f=document.querySelector("footer.ft .ft-paths");
  return !/business/i.test(sw)&&!/pathway 03|p-bb[^"]*\b(ib|up)\b/i.test(fxBusinessBrief()+(f?f.innerHTML:""))&&FX_SHARED.has("home")
   &&!!f&&f.querySelector(".ft-path.p-bb .ft-pn").textContent==="Beyond Economics"&&f.querySelectorAll(".ft-path.p-ib,.ft-path.p-up").length===2});
 T("Business Brief · the home panel reads as the brief asks, and claims nothing more",()=>{const t=txt(fxBusinessBrief());
  return t.includes("Beyond Economics. Explore Business Management.")&&t.includes("Discover The Business Brief, an interactive learning platform for IB DP Business Management.")
   &&/Explore The Business Brief/.test(t)&&!/(best|number one|award|students use|trusted by|\d+\s*(students|users))/i.test(t)});
 T("Business Brief · the footer explores the academic ecosystem: IB DP Economics, UPSC CSE Economics and IB DP Business Management",()=>{
  const f=document.querySelector("footer.ft .ft-paths");if(!f)return false;const t=f.textContent.replace(/\s+/g," ");
  return f.getAttribute("aria-label")==="Explore the academic ecosystem"&&/Explore the academic ecosystem/.test(t)&&t.indexOf("IB DP Economics")<t.indexOf("UPSC CSE Economics")&&t.indexOf("UPSC CSE Economics")<t.indexOf("IB DP Business Management")});
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
