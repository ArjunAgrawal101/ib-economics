/* ═══════════════════════════════════════════════════════════════════════════
   TUTORIALS · the commercial page, rebuilt for the final release
   A narrative rather than a price list: who it is for, how sessions are
   taught, what an hour looks like, the five pathways with the exact terms as
   supplied, how to choose, how to start, and honest answers to the usual
   questions. Enquiries go through the existing channels only (email,
   WhatsApp, Instagram, LinkedIn): there is no booking system and none is
   implied. No testimonial, rating, outcome or guarantee appears.
   ═══════════════════════════════════════════════════════════════════════════ */
const TUTP=[
 {k:"regular",n:"Regular sessions",price:20,unit:"per session",sessions:"1 session",len:"1 hour",tag:"Start here",
  what:"Personalised Economics sessions focused on the topic, concept or area where the student needs support.",
  who:"Any student who wants help with a specific topic, a diagram, a paper or a piece of work.",
  does:["Any topic of your choice","Concepts rebuilt until you can explain them unaided","Diagrams drawn, labelled and used in an argument","Questions worked through together"],
  expect:"We start from your own work or question, and you leave with one clear next step."},
 {k:"ia",n:"IA support",price:100,unit:"for the package",sessions:"6 sessions",len:"1 hour each",tag:"Internal assessment",
  what:"Structured guidance through writing your three commentaries.",
  who:"Students working on the internal assessment portfolio.",
  does:["Understanding the task and the criteria","Selecting and using appropriate concepts","Analysis and evaluation","Structure, feedback and refinement of your drafts"],
  expect:"Guidance on your work at each stage. The commentaries remain entirely your own: I do not write commentaries."},
 {k:"ee",n:"Economics EE supervisor support",price:150,unit:"for the support",sessions:"Agreed at enquiry",len:"",tag:"Extended essay",
  what:"Structured academic supervision and guidance for an Economics extended essay.",
  who:"Students writing, or about to start, an Economics extended essay.",
  does:["Topic and research question development","The economic theory that will carry the essay","Research direction and structure","Feedback on analysis, evaluation and drafts"],
  expect:"Academic supervision and guidance, not ghostwriting. The schedule of meetings is agreed when you enquire."},
 {k:"marathon",n:"Marathon Revision",price:300,unit:"for the package",sessions:"20 sessions",len:"1 hour each",tag:"Before external assessment",
  what:"A structured, intensive revision pathway: entire syllabus covered before External Assessment.",
  who:"Students who want the whole course revisited in order before their exams.",
  does:["Entire syllabus, unit by unit","Concept reinforcement","Diagrams and application","Evaluation and exam preparation"],
  expect:"A planned sequence across twenty hours, adjusted to where your gaps are."},
 {k:"exam",n:"Exam Practice",price:200,unit:"for the package",sessions:"12 sessions",len:"1 hour each",tag:"Questions only",
  what:"Solving and discussing exam-style questions: Paper 1, Paper 2 and Paper 3.",
  who:"Students who know the content and want to turn it into marks.",
  does:["Paper 1 extended response","Paper 2 data response","Paper 3 policy paper (HL)","Every answer discussed against the markbands"],
  expect:"Questions only: we write, read and improve answers rather than re-teach topics."}];
const TUTWHY=[
 ["The concept will not click","A mechanism you can recognise but not explain. We rebuild it step by step until you can state it without notes."],
 ["Content known, marks lost","Answers that describe instead of analyse, or evaluate with a list. We work on the reasoning examiners reward."],
 ["The IA or the EE","Choosing an article or a question, using theory properly, and knowing what good evaluation looks like."],
 ["Exams are close","A plan for the time left: what to revise, how to practise, and how to write under time."]];
const TUTHOW=[
 ["Understanding first","A mechanism you can explain beats a definition you can recite."],
 ["Diagrams that argue","Every diagram is drawn, labelled and used in the answer, not decorated."],
 ["Real-world application","Concepts are attached to markets and policies that exist, with sourced figures."],
 ["Exam awareness","Answers are written against the published markbands and read the way an examiner reads them."],
 ["Specific feedback","Which sentence does what, where the reasoning stops, and what to change next time."]];
const TUTHOUR=[["5","Diagnose","Start from a piece of your work or a question"],["15","Concept","Rebuild the mechanism until it is yours"],
 ["15","Diagram and application","Draw it, label it, attach it to a real case"],["15","Practice","Write or solve under light time pressure"],
 ["10","Feedback and next step","What improved, and one thing to do next"]];
const TUTFAQ=[
 ["Who are the sessions for?","Mainly IB Diploma Programme Economics students, SL and HL. Regular sessions can also help other Economics students with a specific topic: tell me your course when you enquire."],
 ["Do you teach SL and HL?","Yes. HL-only material, including Paper 3, is covered for HL students."],
 ["Can I book a single session?","Yes. A regular session is US$20 for one hour, on any topic of your choice."],
 ["How long is a session?","One hour, one-to-one, online."],
 ["What is covered in a regular session?","Whatever you need: one concept, a diagram, a past-paper question, or a piece of your own writing."],
 ["How does IA support work?","Six one-hour sessions (US$100) of structured guidance through your three commentaries: the task, concepts, analysis, evaluation, structure, feedback and refinement. You write the commentaries; I do not write commentaries."],
 ["What does EE supervision include?","Academic supervision and guidance for an Economics extended essay (US$150): research question, theory, research direction, structure and feedback on drafts. It is guidance rather than ghostwriting, and the meeting schedule is agreed when you enquire."],
 ["What is Marathon Revision?","Twenty one-hour sessions (US$300) covering the entire syllabus before External Assessment: concepts, diagrams, application, evaluation and exam preparation."],
 ["What happens in Exam Practice?","Twelve one-hour sessions (US$200) of questions only, across Paper 1, Paper 2 and Paper 3: we solve them and discuss the answers."],
 ["Can sessions focus on one specific topic?","Yes. That is what a regular session is for."],
 ["How do I arrange a session?","Send an email or a WhatsApp message with your level (SL or HL), your school and what you would like help with. I reply personally with available times; there is no automated booking."]];
function tutMail(subject){return "mailto:"+TUT.email+"?subject="+encodeURIComponent("IB Economics enquiry: "+subject)
 +"&body="+encodeURIComponent("Hello Arjun,\n\nI would like to enquire about: "+subject+".\n\nSL or HL: \nSchool: \nWhat I would like help with: \nPreferred days/times: \n\nThank you.")}
const TUTICON={regular:'<path d="M4 20 L20 4 M4 5 C10 9 14 13 20 20"/>',ia:'<path d="M5 3h10l4 4v14H5z M15 3v4h4 M8 12h8 M8 16h6"/>',
 ee:'<path d="M4 19V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z M8 7h7"/>',marathon:'<path d="M3 17l5-5 4 4 8-8 M14 8h6v6"/>',exam:'<path d="M9 4h6v3H9z M6 6H5v15h14V6h-1 M8 12l2 2 5-5"/>'};
function tutIcon(k){return `<svg class="tu-ic" viewBox="0 0 24 24" aria-hidden="true">${TUTICON[k]}</svg>`}
function tutCard(p){return `<article class="tu-card ${p.k==="regular"?"lead":""}" id="tu-${p.k}" aria-labelledby="tu-${p.k}-h">
  <div class="tu-a"><div class="tu-top">${tutIcon(p.k)}<span class="tu-tag">${esc(p.tag)}</span></div>
   <h3 class="tu-n" id="tu-${p.k}-h">${esc(p.n)}</h3>
   <div class="tu-price"><span class="cur">US$</span><span class="amt">${p.price}</span><span class="per">${esc(p.unit)}</span></div>
   <dl class="tu-terms"><div><dt>Sessions</dt><dd>${esc(p.sessions)}</dd></div>${p.len?`<div><dt>Length</dt><dd>${esc(p.len)}</dd></div>`:""}</dl></div>
  <div class="tu-b"><p class="sm tu-what">${esc(p.what)}</p>
   <div class="tu-k">For</div><p class="sm">${esc(p.who)}</p></div>
  <div class="tu-c"><div class="tu-k">What we do</div><ul class="tu-do">${p.does.map(d=>`<li>${esc(d)}</li>`).join("")}</ul>
   <div class="tu-k">What to expect</div><p class="sm">${esc(p.expect)}</p>
   <a class="btn ${p.k==="regular"?"a":"gh"} w tu-cta" href="${tutMail(p.n)}">${p.k==="regular"?"Book your first session":"Ask about "+esc(p.n)}</a></div></article>`}
function tutorialsPage(){
 const curve=`<svg class="tu-curve" viewBox="0 0 600 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 70 C150 70 200 20 300 20 S450 60 600 10"/></svg>`;
 return `<section class="hero tu-hero">${heroPlot()}<div class="wrap full in">
   <div class="kicker">Economics tutorials · Arjun Agrawal</div>
   <h1 class="mt3" style="max-width:13ch">IB Economics, taught one to one.</h1>
   <p class="lede mt3" style="max-width:56ch">Understand the concepts. Master the diagrams. Think like an economist. Prepare with purpose. Personalised sessions for SL and HL students, from a single topic to the whole course.</p>
   <div class="tu-hero-price mt4"><span class="cur">US$</span><span class="amt">20</span><span class="per">one-hour session<br>any topic of your choice</span></div>
   <div class="row mt4" style="gap:14px"><a class="btn a lg" href="${tutMail("Regular session")}">Enquire about sessions →</a>
    <button class="btn on-ink lg" onclick="document.getElementById('tu-paths').scrollIntoView({behavior:'smooth'})">See the five pathways</button></div>
   <div class="statrow mt5" style="max-width:640px">
    <div class="stat"><span class="k">Session</span><span class="v" style="font-size:26px">1 hour</span><span class="d">one-to-one, online</span></div>
    <div class="stat"><span class="k">Levels</span><span class="v" style="font-size:26px">SL · HL</span><span class="d">Papers 1, 2 and 3</span></div>
    <div class="stat"><span class="k">Pathways</span><span class="v" style="font-size:26px">Five</span><span class="d">from US$20</span></div></div>
  </div></section>

 <div class="wrap full sec">${H.head("01","Why students get in touch","")}
  <div class="tu-why">${TUTWHY.map(([t,d],i)=>`<div class="tu-whyc"><span class="mn">${String(i+1).padStart(2,"0")}</span><h3>${esc(t)}</h3><p class="sm mt2">${esc(d)}</p></div>`).join("")}</div></div>

 <div class="wrap full sec t">${H.head("02","How I teach","The same way this platform is built")}
  <div class="tu-how">${TUTHOW.map(([t,d])=>`<div><h3>${esc(t)}</h3><p class="sm mt1">${esc(d)}</p></div>`).join("")}</div>
  <p class="sm mt4" style="max-width:64ch">Everything on this site, from the concept pages to the labs and the examiner, is how I teach a lesson, written down. Sessions take it to the specific things your own work shows.</p></div>

 <div class="wrap full sec t">${H.head("03","What an hour looks like","A typical shape; it changes with what you need")}
  <div class="tu-hour" role="list">${TUTHOUR.map(([m,h,d])=>`<div class="tu-seg" role="listitem" style="flex:${m}"><div class="tu-bar"></div><span class="mn">${m} min</span><strong>${esc(h)}</strong><span class="xs">${esc(d)}</span></div>`).join("")}</div></div>

 <div class="wrap full sec t" id="tu-paths">${H.head("04","Pathways and fees","Exact terms; all sessions are one-to-one and online")}
  ${curve}
  <div class="tu-grid">${TUTP.map(tutCard).join("")}</div>
  <div class="note g mt5"><div class="t">A clear line</div>
   <p class="sm">IA and extended essay work is guidance rather than ghostwriting: coaching on your article or question, theory, diagrams, structure, analysis, evaluation and feedback on your drafts. I do not write commentaries or essays for students, and no session produces text for you to submit.</p></div></div>

 <div class="wrap full sec t">${H.head("05","Which pathway fits?","")}
  <div class="scrollx" tabindex="0" role="region" aria-label="Which pathway fits"><table class="t tu-fit"><thead><tr><th scope="col">If you…</th><th scope="col">Start with</th></tr></thead><tbody>
   ${[["need help with one topic, diagram or question","Regular sessions","regular"],["are writing the three IA commentaries","IA support","ia"],["are writing an Economics extended essay","EE supervisor support","ee"],
      ["want the entire syllabus revisited before your exams","Marathon Revision","marathon"],["know the content and want to practise papers","Exam Practice","exam"],["are not sure","A regular session first","regular"]]
     .map(([a,b,k])=>`<tr><td>${esc(a)}</td><td><a class="lnk" href="#tu-${k}" onclick="event.preventDefault();document.getElementById('tu-${k}').scrollIntoView({behavior:'smooth',block:'center'})">${esc(b)}</a></td></tr>`).join("")}
  </tbody></table></div></div>

 <div class="wrap full sec t">${H.head("06","How to get started","")}
  <ol class="tu-journey">${[["Identify the need","A topic, a paper, the IA, the EE or the whole course."],["Choose the pathway","Use the table above, or start with one session."],
   ["Enquire","Email or WhatsApp with your level, school and what you need."],["Learn","One-to-one, online, from your own work."],["Practise","Questions and writing between sessions."],["Refine","Feedback, then the next step."]]
   .map(([t,d],i)=>`<li><span class="mn">${i+1}</span><strong>${esc(t)}</strong><span class="xs">${esc(d)}</span></li>`).join("")}</ol></div>

 <div class="wrap edit sec t">${H.head("07","Questions","")}
  <div class="tu-faq">${TUTFAQ.map(([q,a])=>`<details><summary>${esc(q)}</summary><p class="sm">${esc(a)}</p></details>`).join("")}</div>
  <p class="xs mt4" style="max-width:70ch">There are no testimonials, ratings, student counts or grade claims on this page, because none could be verified by you. What you can check is the platform itself: open any page and you are looking at how I teach.</p></div>

 <div class="wrap edit sec t"><div class="panel ink tu-close" style="padding:clamp(28px,4vw,56px)">
  <div class="kicker">Ask about the right pathway</div>
  <h2 class="mt3" style="color:#fff;max-width:20ch">Start with one session, or tell me what you need.</h2>
  <p class="sm mt3" style="max-width:56ch">Write with your level, your school and what you would like help with. I reply personally with available times.</p>
  <div class="row mt4" style="gap:12px"><a class="btn a" href="${tutMail("Regular session")}">Email Arjun →</a><a class="btn on-ink" href="https://wa.me/917092844945" target="_blank" rel="noopener noreferrer">WhatsApp</a>
   <button class="btn on-ink" onclick="nav('about')">About Arjun</button></div>
  <p class="xs mt3" style="color:rgba(255,255,255,.6)">${esc(TUT.email)} · no booking system, no deposit: enquiries are answered personally.</p></div></div>
 <section class="sec t"><div class="wrap">${contactCard()}</div></section>`}
VIEWS.tutorials=tutorialsPage;

function TUTSUITE(){const out=[];const T=(n,f)=>{let ok=false,det="";try{const r=f();ok=r===true||(r&&r.ok);if(r&&r.d)det=r.d}catch(e){det=e.message}out.push({n,ok:!!ok,detail:det})};
 const h=VIEWS.tutorials(),t=h.replace(/<[^>]+>/g," ").replace(/\s+/g," ");
 T("Tutorials · the five prices are exactly as supplied",()=>{const want={regular:20,ia:100,ee:150,marathon:300,exam:200};return TUTP.length===5&&TUTP.every(p=>want[p.k]===p.price)});
 T("Tutorials · session counts and lengths are exactly as supplied",()=>{const m=Object.fromEntries(TUTP.map(p=>[p.k,p]));
   return m.regular.len==="1 hour"&&m.ia.sessions==="6 sessions"&&m.ia.len==="1 hour each"&&m.marathon.sessions==="20 sessions"&&m.marathon.len==="1 hour each"&&m.exam.sessions==="12 sessions"&&m.exam.len==="1 hour each"&&!m.ee.len});
 T("Tutorials · no other price appears on the page",()=>{const prices=[...t.matchAll(/US\$ ?(\d+)/g)].map(m=>+m[1]);return prices.length>0&&prices.every(v=>[20,100,150,200,300].includes(v))});
 T("Tutorials · no session is described as longer than an hour",()=>!/90[- ]min|two-hour|2-hour/i.test(t));
 T("Tutorials · every pathway has its own enquiry link to the real address",()=>TUTP.every(p=>h.includes(tutMail(p.n).replace(/&/g,"&amp;"))||h.includes(tutMail(p.n))));
 T("Tutorials · no promise of grades, availability or results",()=>!/guarantee|guaranteed|100%|best teacher|limited (seats|places|slots)|hurry|book now before/i.test(t));
 T("Tutorials · every question opens and closes as a native disclosure",()=>(h.match(/<details>/g)||[]).length===TUTFAQ.length);
 return out}
TUTSUITE.suiteName="Tutorials";
EXTRA_SUITES.push(TUTSUITE);
