/* ═══════════════════════════════════════════════════════════════════════════
   FLAGSHIP · the core every part of the two-pathway platform shares
   One discipline, two pathways. This module holds what must be said once:
   the identity, which pathway a page belongs to, and the enquiry links built
   from the contact details the platform already publishes (CONTACT, TUT and
   UP_PHONE). Nothing here renders a page; the shell, the home page, the UPSC
   environment, the handbook library and the concept layer all read from it.
   ═══════════════════════════════════════════════════════════════════════════ */
const FXI={
 name:"Arjun Agrawal",
 discipline:"Economics",
 motto:"Think like an economist.",
 idea:"One discipline. Two pathways. A shared understanding of Economics.",
 roles:"IB DP Economics Educator | Economics Resource Designer | UPSC Economics Mentor",
 paths:{
  ib:{key:"ib",name:"IB DP Economics",short:"IB DP",home:"#/ib",view:"ib"},
  upsc:{key:"upsc",name:"UPSC CSE Economics",short:"UPSC CSE",home:"#/upsc",view:"upsc"}
 }
};
/* ── the Arjun Agrawal Academic Ecosystem ──────────────────────────────────
   Three independent platforms from the same educator, under one academic
   identity (ARJUN AGRAWAL · KNOWLEDGE. INSIGHT. IMPACT.): this one, The
   Business Brief (IB DP Business Management) and Political Studies & Global
   Affairs. Each keeps its own repository, address and design; the names and
   lines are the owner's (the subject lines and taglines of the final brief, 2026-11-20). The two sisters are linked from the header's
   Academic Ecosystem menu, the drawer, the home page, the footer and About,
   always in a new tab and never as a third pathway: they have no pathway
   colour and no place in the pathway switcher. */
const FX_BB={name:"The Business Brief",subject:"IB DP Business Management",url:"https://the-business-brief-dun.vercel.app/"};
const FX_PS={name:"Political Studies & Global Affairs",subject:"Indian Polity, International Relations, PSIR and IB DP Global Politics",url:"https://arjun-agrawal-political-studies.vercel.app/"};
const FX_ECO=[
 {k:"eco",name:"Economics",line:"Arjun Agrawal | IB DP Economics and UPSC CSE Economics",tag:"Think like an economist.",url:"https://ib-economics-pi.vercel.app/",current:true,
  d:"IB DP Economics and UPSC CSE Economics: concepts, models you can move, real-world evidence and examination practice."},
 {k:"bb",name:FX_BB.name,line:"IB DP Business Management",tag:"Strategy. Leadership. Decisions.",url:FX_BB.url,
  d:"A Business Management learning platform with topic notes, mindmaps, case studies, interactive tools and an Assessment Centre for the IB Diploma Programme."},
 {k:"ps",name:FX_PS.name,line:"IB DP Global Politics | Indian Polity | International Relations | PSIR",tag:"Understand power, politics and global affairs.",url:FX_PS.url,
  d:"UPSC CSE Indian Polity and International Relations, Political Science and International Relations (PSIR) and IB DP Global Politics, read as one connected body of knowledge."}];
/* a small drawn mark for each: two curves meeting, a decision's rising bars, a meridian globe */
const FX_ECO_MARK={
 eco:`<svg viewBox="0 0 64 48" aria-hidden="true" focusable="false"><path d="M6 6C22 18 38 30 58 42"/><path d="M6 42C22 30 38 18 58 6" opacity=".6"/><circle class="f" cx="32" cy="24" r="3"/></svg>`,
 bb:`<svg viewBox="0 0 64 48" aria-hidden="true" focusable="false"><path d="M4 44H60"/><rect x="10" y="32" width="8" height="12"/><rect x="22" y="24" width="8" height="20"/><rect x="34" y="16" width="8" height="28"/><rect x="46" y="8" width="8" height="36"/></svg>`,
 ps:`<svg viewBox="0 0 64 48" aria-hidden="true" focusable="false"><circle cx="32" cy="24" r="19"/><ellipse cx="32" cy="24" rx="8" ry="19" opacity=".7"/><path d="M13 24H51M16 14H48M16 34H48" opacity=".55"/></svg>`};
/* a link to a sister platform: a new tab, said in words to a screen reader */
function fxSisterLink(e,cls,label){
 return `<a class="${cls}" href="${esA(e.url)}" target="_blank" rel="noopener noreferrer">${esc(label||e.name)}<span class="fx-ext" aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a>`;
}
function fxBBLink(cls,label){return fxSisterLink(FX_ECO[1],cls,label)}
/* one platform as a panel, on the home page and on About; the current one says so and opens its two pathways */
function fxEcoCard(e){
 const host=e.url.replace(/^https?:\/\//,"").replace(/\/$/,"");
 const foot=e.current
  ?`<span class="eco-here">You are here</span><span class="eco-paths"><a class="fx-a" href="#/ib">IB DP Economics <span aria-hidden="true">→</span></a><a class="fx-a" href="#/upsc">UPSC CSE Economics <span aria-hidden="true">→</span></a></span>`
  :`${fxSisterLink(e,"eco-go","Visit "+e.name)}<span class="eco-url">${esc(host)}</span>`;
 return `<li class="eco-card eco-${e.k}${e.current?" here":""}"${e.current?' aria-current="true"':""}>
  <div class="eco-top"><p class="eco-sub">${e.current?"This platform":"Sister platform"}</p><span class="eco-mark">${FX_ECO_MARK[e.k]}</span></div>
  <h3 class="eco-name">${esc(e.name)}</h3><p class="eco-line">${esc(e.line)}</p>${e.tag?`<p class="eco-tag">${esc(e.tag)}</p>`:""}<p class="eco-d">${esc(e.d)}</p>
  <div class="eco-foot">${foot}</div></li>`;
}
/* Sections that belong to neither pathway: the shared home, About, Contact,
   settings, the concept layer and the site's own quality pages. Everything
   else that is not the UPSC section is part of the IB DP environment. */
const FX_SHARED=new Set(["home","about","contact","settings","design","concepts","arjun"]);
function fxPathway(v){
 v=v||(typeof VIEW!=="undefined"?VIEW:"home");
 if(v==="upsc")return "upsc";
 if(FX_SHARED.has(v))return "shared";
 return "ib";
}

/* ── enquiries: the published contact details, never new ones ──────────── */
const FX_CONTACT={
 email(){try{if(typeof TUT!=="undefined"&&TUT.email)return TUT.email}catch(e){}return "arjun1agr@gmail.com"},
 phone(){try{if(typeof UP_PHONE!=="undefined"&&UP_PHONE)return UP_PHONE}catch(e){}return "+91 7092844945"},
 wa(){try{const w=CONTACT.find(x=>x.k==="whatsapp");if(w&&w.href)return w.href}catch(e){}return "https://wa.me/917092844945"},
 linkedin(){try{const w=CONTACT.find(x=>x.k==="linkedin");if(w&&w.href)return w.href}catch(e){}return ""},
 instagram(){try{const w=CONTACT.find(x=>x.k==="instagram");if(w&&w.href)return w.href}catch(e){}return ""}
};
function fxWa(msg){return FX_CONTACT.wa()+(msg?"?text="+encodeURIComponent(msg):"")}
function fxMail(subject,body){
 const q=[];if(subject)q.push("subject="+encodeURIComponent(subject));if(body)q.push("body="+encodeURIComponent(body));
 return "mailto:"+FX_CONTACT.email()+(q.length?"?"+q.join("&"):"");
}
function fxTel(){return "tel:"+FX_CONTACT.phone().replace(/\s+/g,"")}
/* The standing enquiries the brief names. Each is a prefilled message that the
   visitor sends from their own WhatsApp or email; nothing is sent from here. */
const FX_ENQ={
 ibTutoring:{path:"ib",label:"IB Economics tutoring",subject:"IB DP Economics tutoring enquiry",
  msg:"Hello Arjun, I am interested in IB DP Economics tutoring. Please share the details of the available sessions."},
 ibIA:{path:"ib",label:"Internal Assessment support",subject:"IB DP Economics IA support enquiry",
  msg:"Hello Arjun, I would like guidance on my IB DP Economics Internal Assessment. Please share how the IA support works."},
 ibEE:{path:"ib",label:"Extended Essay guidance",subject:"IB DP Economics Extended Essay enquiry",
  msg:"Hello Arjun, I would like guidance on an Economics Extended Essay. Please share how the EE supervision support works."},
 ibResources:{path:"ib",label:"IB resource enquiry",subject:"IB DP Economics resource enquiry",
  msg:"Hello Arjun, I have a question about your IB DP Economics resources: "},
 ibTeachers:{path:"ib",label:"Teacher collaboration",subject:"Teacher collaboration enquiry",
  msg:"Hello Arjun, I am an Economics teacher and would like to discuss a collaboration: "},
 upHandbooks:{path:"upsc",label:"Handbook purchase",subject:"UPSC Economics handbook enquiry",
  msg:"Hello, I am interested in purchasing volumes of the Arjun Agrawal Economics Handbook Series. Please share the payment and delivery details."},
 upCourse:{path:"upsc",label:"Three-month intensive course",subject:"UPSC CSE Economics 3-month programme enquiry",
  msg:"Hello, I am interested in joining the three-month UPSC CSE Economics Intensive Online Programme priced at ₹9,999. Please share the upcoming batch schedule and enrolment details."},
 upMentor:{path:"upsc",label:"Economics mentorship",subject:"UPSC Economics mentorship enquiry",
  msg:"Hello Arjun, I am preparing for the UPSC Civil Services Examination and would like to ask about Economics mentorship: "},
 upResources:{path:"upsc",label:"UPSC resource enquiry",subject:"UPSC Economics resource enquiry",
  msg:"Hello Arjun, I have a question about your UPSC CSE Economics resources: "}
};
/* The purchase message for one handbook, in the wording the brief sets. */
function fxHandbookMsg(v){
 return `Hello, I am interested in purchasing Volume ${v.n}, ${v.title}, of the Arjun Agrawal Economics Handbook Series. Please share the payment and delivery details.`;
}
function fxEnquiryLinks(key,extra){
 const e=typeof key==="string"?FX_ENQ[key]:key;if(!e)return {wa:FX_CONTACT.wa(),mail:fxMail(),tel:fxTel()};
 const msg=e.msg+(extra||"");
 return {wa:fxWa(msg),mail:fxMail(e.subject,msg),tel:fxTel(),msg};
}
