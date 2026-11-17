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
