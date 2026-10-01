/* ═══════════════════════════════════════════════════════════════════════════
   ABOUT · an intellectual biography, not a CV
   Read in under a minute: a cover with the name, the portrait and four
   positions; the credentials as data; the journey as a map; the classroom in
   two photographs; six principles; and the story of the platform. The long
   prose the page used to carry is kept, folded, under "The longer version",
   so nothing is lost and nothing has to be read.
   Every fact comes from the supplied profile (ABOUT, ABOUT2). No degree, date,
   title or result is added, and no institution is described as a current
   workplace. The portrait sits in its own grid cell; nothing is drawn over it.
   ═══════════════════════════════════════════════════════════════════════════ */
const AB_POS=["Economics educator","IB DP educator","Teacher and mentor","Academic resource creator","Research-oriented educator"];
/* the credentials, as data blocks */
const AB_FACTS=()=>[
 ["Education","Economics","St. Stephen's College, University of Delhi"],
 ["Higher education","Assistant Professor","Fergusson College, Pune · undergraduate Economics"],
 ["IB Diploma Programme","Teaching and academic work","BLISS International School, Pune · Symbiosis International School, Pune"],
 ["Subjects","Economics · Business Management · Global Politics","SL and HL"],
 ["Mentorship","UPSC Civil Services","Economics, for aspirants preparing for a different examination in the same subject"],
 ["Resource design","Handbooks · presentations · Economics in 60 Seconds","and this platform"]];
/* the journey, as stages on a line; the last is the platform itself */
const AB_STAGE=["Academia","Higher education","IB Diploma Programme","IB Diploma Programme","Mentorship"];
const AB_PRINCIPLES=[["Models should explain, not decorate.","A diagram is an argument; if it is never referred to, it has earned nothing."],
 ["Real-world evidence should challenge theory.","A model is tested where it meets something that happened."],
 ["Diagrams should carry analytical weight.","Draw it, then use it: every label is a claim."],
 ["Students should question assumptions.","Naming what a model assumes is the difference between using it and believing it."],
 ["Understand before memorising.","Ask what happens next and you find out whether the concept or only the sentence is there."],
 ["Judge, and state the condition.","A judgement says what the answer is and what would reverse it."]];
const AB_STORY=[["Classroom","A problem noticed in a real lesson."],["Idea","A way to make the reasoning visible."],
 ["Resource","A handbook, a slide, a question."],["Interaction","A model a student can move and question."],["Platform","All of it connected, in one place."]];

function abCover(){const A=ABOUT;
 return `<section class="ab-cover" aria-labelledby="ab-h"><div class="wrap full ab-grid">
  <div class="ab-copy">
   <div class="eb a">About</div>
   <h1 class="ab-h mt2" id="ab-h">${esc(A.name)}</h1>
   <ul class="ab-pos mt3">${AB_POS.map(p=>`<li>${esc(p)}</li>`).join("")}</ul>
   <p class="ab-lede mt4">${esc(A.lede)}</p>
   <p class="ab-meta mt3"><span>${esc(A.role)}</span>${A.subjects.map(s=>`<span>${esc(s)}</span>`).join("")}</p>
   <div class="row mt4"><button class="btn a" onclick="nav('tutorials')">Learn with Arjun →</button><a class="btn gh" href="mailto:${A.email}">Email</a>
    <button class="btn gh" onclick="nav('home')">Explore the platform</button></div></div>
  ${abFigure("hero","ab-portrait")}
 </div></section>`}

function abFacts(){return `<section class="sec ab-facts" aria-labelledby="ab-f"><div class="wrap full">
  <div class="rn-chap"><span class="ch-n">01</span><span class="ch-t" id="ab-f">At a glance</span></div>
  <dl class="abf-grid mt3">${AB_FACTS().map(([k,a,b])=>`<div class="abf"><dt>${esc(k)}</dt><dd><b>${esc(a)}</b><span>${esc(b)}</span></dd></div>`).join("")}</dl>
 </div></section>`}

function abJourney(){const T=ABOUT2.timeline,i=Math.min(ABTL,T.length);const cur=T[i];
 const stops=T.map((t,k)=>[AB_STAGE[k]||"",t.k,t.w]).concat([["Digital education","This platform","Economics made visible, connected and testable"]]);
 return `<section class="sec t ab-journey" aria-labelledby="ab-j"><div class="wrap full">
  <div class="rn-chap"><span class="ch-n">02</span><span class="ch-t" id="ab-j">The journey</span></div>
  <ol class="abj-track mt4">${stops.map(([st,k,w],n)=>`<li><button class="abj-stop${n===i?" on":""}" aria-pressed="${n===i}" onclick="ABTL=${n};render()">
    <span class="abj-st">${esc(st)}</span><span class="abj-dot" aria-hidden="true"></span><strong>${esc(k)}</strong><span class="abj-w">${esc(w)}</span></button></li>`).join("")}</ol>
  ${cur?`<div class="abj-detail mt3"><div><span class="kicker">What was taught</span><p class="sm mt1">${esc(cur.taught)}</p></div>
    <div><span class="kicker">What it taught me</span><p class="sm mt1">${esc(cur.learned)}</p></div>
    <div><span class="kicker">What it changed here</span><p class="sm mt1">${esc(cur.shaped)}</p></div></div>`
   :`<div class="abj-detail mt3"><div><span class="kicker">Why it exists</span><p class="sm mt1">${esc(ABOUT2.why)}</p></div>
    <div><span class="kicker">What it is for</span><p class="sm mt1">Concepts, diagrams, calculations, real-world cases and exam thinking in one place, rather than in separate places.</p></div>
    <div><span class="kicker">What it will not do</span><p class="sm mt1">Write a student's work for them. It reads work closely and says where it stops short.</p></div></div>`}
  <p class="xs mt2">Academic background and professional experience as supplied; the order is presentational, not a claim about exact chronology, and none of these is described as a current post.</p>
 </div></section>`}

function abClassroom(){return `<section class="sec ab-room" aria-labelledby="ab-c"><div class="wrap full">
  <div class="rn-chap"><span class="ch-n">03</span><span class="ch-t" id="ab-c">In the classroom</span></div>
  <div class="abr-grid mt4">
   <div class="abr-cell">${abFigure("students","abr-fig")}<p class="abr-line">Students argue a side they did not choose, until somebody finds the condition under which it fails.</p>
    <button class="lnk mt2" onclick="nav('tools')">Open the debate room →</button></div>
   <div class="abr-cell">${abFigure("teaching","abr-fig")}<p class="abr-line">A budget line, an interest rate or a tariff: where a model finally meets something that happened.</p>
    <button class="lnk mt2" onclick="nav('world')">Open Real World →</button></div></div>
 </div></section>`}

function abPrinciples(){return `<section class="sec t ab-believe" aria-labelledby="ab-b"><div class="wrap full">
  <div class="rn-chap"><span class="ch-n">04</span><span class="ch-t" id="ab-b">What I believe</span></div>
  <ol class="abb-grid mt4">${AB_PRINCIPLES.map(([h,d],i)=>`<li><span class="abb-n">${String(i+1).padStart(2,"0")}</span><p class="abb-h">${esc(h)}</p><p class="abb-d">${esc(d)}</p></li>`).join("")}</ol>
 </div></section>`}

function abStory(){return `<section class="sec ab-story" aria-labelledby="ab-s"><div class="wrap full">
  <div class="rn-chap"><span class="ch-n">05</span><span class="ch-t" id="ab-s">The platform story</span></div>
  <ol class="abs-flow mt4">${AB_STORY.map(([h,d],i)=>`<li><span class="abs-n">${String(i+1).padStart(2,"0")}</span><strong>${esc(h)}</strong><span>${esc(d)}</span></li>`).join("")}</ol>
  <blockquote class="abs-q mt4">“${esc(ABOUT2.why)}”</blockquote>
  <div class="cols2 abs-doors mt4">${ABOUT2.teaches.map(([n,d,go])=>`<button class="sp-room" onclick="${go}"><span class="sp-t">${esc(n)}</span><span class="sp-d">${esc(d)}</span></button>`).join("")}</div>
 </div></section>`}

function abLonger(){const A=ABOUT,B=ABOUT2;
 return `<section class="sec t ab-longer"><div class="wrap full">
  <details class="ab-more"><summary><span class="ch-t">The longer version</span><span class="xs">The full statement, the four positions, the portfolio and the method</span></summary>
   <div class="ab-more-in">
    <div class="split"><div><h2 class="h3">The educator</h2>${A.who.map(p=>`<p class="ed mt3">${esc(p)}</p>`).join("")}
      <p class="ed mt3">Alongside Diploma Programme teaching, I mentor UPSC Civil Services aspirants in Economics, and I build the resources the teaching needs. No claim is made here about ranks, selections or results.</p></div>
     <div class="panel q"><div class="eb">Four positions</div>${B.roles.map(([n,s,d])=>`<div class="mt3"><strong>${esc(n)}</strong><div class="xs">${esc(s)}</div><p class="sm mt1">${esc(d)}</p></div>`).join("")}</div></div>
    <h2 class="h3 mt5">Teaching philosophy</h2>${A.approach.map(p=>`<p class="ed mt3" style="max-width:70ch">${esc(p)}</p>`).join("")}
    <h2 class="h3 mt5">Why I built this</h2>${A.why.map(p=>`<p class="ed mt3" style="max-width:70ch">${esc(p)}</p>`).join("")}
    <h2 class="h3 mt5">Technology and AI</h2>${A.tech.map(p=>`<p class="ed mt3" style="max-width:70ch">${esc(p)}</p>`).join("")}
    <h2 class="h3 mt5">Teaching portfolio</h2><div class="cols3 mt3">${B.portfolio.map(([n,d])=>`<div class="panel"><div class="eb">${esc(n)}</div><p class="sm mt2">${esc(d)}</p></div>`).join("")}</div>
    <h2 class="h3 mt5">The method</h2><ol class="ab-method mt3">${A.method.map(([n,d])=>`<li><strong>${esc(n)}</strong> ${esc(d)}</li>`).join("")}</ol>
    <p class="xs mt4">${esc(A.disclosure)}</p></div></details>
 </div></section>`}

function abClose(){const A=ABOUT;return `<section class="sec rn-final bg-ink ab-close"><div class="wrap full fn-in">
  <p class="fn-h">${esc(A.sig)}</p>
  <div class="row fn-row"><button class="btn lg a" onclick="nav('tutorials')">Learn with Arjun</button><a class="btn lg on-ink" href="mailto:${A.email}">${esc(A.email)}</a>
   <button class="btn lg gh on-ink" onclick="nav('learn')">Start learning</button></div></div></section>`}

(function(){if(typeof aboutPage!=="function")return;
 aboutPage=function(){return abCover()+abFacts()+abJourney()+abClassroom()+abPrinciples()+abStory()+abLonger()+abClose()+abLightboxMarkup()}})();
