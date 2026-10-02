/* ═══════════════════════════════════════════════════════════════════════════
   PAPERS 1–3 · ECONOMIC WRITING · CHECKLISTS · ACADEMIC INTEGRITY ·
   REVISION MODE
   Paper facts carry a guide page reference. Everything about how to think
   through a paper is a teacher's guidance and is labelled so. The practice
   exercises use invented data about invented countries, and say so.
   ═══════════════════════════════════════════════════════════════════════════ */
const PP=COURSE.papers||{};
const facts=a=>`<ul class="pp-facts">${(a||[]).map(f=>`<li>${esc(f.t)} <span class="xs">(${esc(f.src)})</span></li>`).join("")}</ul>`;
function paperGuide(n){const P=PP["p"+n];if(!P)return "";
 const head=`<div class="kicker">Paper ${n}: how to think it through</div>`;
 if(n===1)return `<section class="sec pp" aria-label="Paper 1 guidance"><div class="wrap">${head}
  <div class="pp-g mt3"><div class="pp-off"><div class="eb">${srcTag("guide")} The paper</div>${facts(P.facts)}</div>
   <div><div class="eb">${srcTag("platform")} Teacher guidance</div><ol class="pp-moves mt2">${P.moves.map(m=>`<li><strong>${esc(m.step)}</strong><p class="sm mt1">${esc(m.how)}</p><p class="xs mt1"><em>Trap:</em> ${esc(m.trap)}</p></li>`).join("")}</ol></div></div>
  <div class="ls-grid2 mt4"><div class="ls-panel"><h3 class="ls-h3">10-mark thinking: part (a)</h3><p class="sm">${esc(P.ten.what)}</p><ul class="ls-list mt2">${P.ten.moves.map(x=>`<li>${esc(x)}</li>`).join("")}</ul><p class="xs mt2"><em>Trap:</em> ${esc(P.ten.trap)}</p></div>
   <div class="ls-panel"><h3 class="ls-h3">15-mark thinking: part (b)</h3><p class="sm">${esc(P.fifteen.what)}</p><ul class="ls-list mt2">${P.fifteen.moves.map(x=>`<li>${esc(x)}</li>`).join("")}</ul><p class="xs mt2"><em>Trap:</em> ${esc(P.fifteen.trap)}</p></div></div>
  <p class="sm mt3" style="max-width:72ch">${esc(P.note)}</p>
  <details class="mt4"><summary>Economic writing: from an assertion to an argument</summary>${writingGuide()}</details></div></section>`;
 if(n===2){const X=P.exercise||{};return `<section class="sec pp" aria-label="Paper 2 guidance"><div class="wrap">${head}
  <div class="pp-g mt3"><div class="pp-off"><div class="eb">${srcTag("guide")} The paper</div>${facts(P.facts)}</div>
   <div><div class="eb">${srcTag("platform")} A data-response workflow</div><ol class="pp-stages mt2">${P.stages.map(s=>`<li><span>${esc(String(s.n))}</span><div><strong>${esc(s.name)}</strong><p class="sm mt1">${esc(s.how)}</p><p class="xs mt1"><em>Trap:</em> ${esc(s.trap)}</p></div></li>`).join("")}</ol></div></div>
  ${X.questions?`<details class="pp-ex mt4"><summary>Try the workflow: ${esc(X.title||"a practice data response")}</summary>
   <p class="tag mt3">${esc(X.label)}</p>${(X.text||[]).map((t,i)=>`<p class="sm mt2"><span class="xs">¶${i+1}</span> ${esc(t)}</p>`).join("")}
   ${X.table?`<div class="scrollx mt3"><table class="t"><thead><tr>${X.table.head.map(h=>`<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${X.table.rows.map(r=>`<tr>${r.map(v=>`<td>${esc(v)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`:""}
   <ol class="pp-qs mt3">${X.questions.map((q,i)=>`<li><p><strong>${esc(q.part)}</strong> ${esc(q.q)} <span class="xs">[${q.marks}]</span></p>
    <textarea class="inp mt2" rows="${q.marks>=10?8:3}" aria-label="Your answer to ${esc(q.part)}" onchange="S.pp2=S.pp2||{};S.pp2[${i}]=this.value;save()">${esc((S.pp2||{})[i]||"")}</textarea>
    <details class="mt2"><summary>What a good answer needs</summary><ul class="ls-list mt2">${String(q.guide||"").split(/\n/).map(x=>x.replace(/^•\s*/,"")).filter(Boolean).map(x=>`<li>${esc(x)}</li>`).join("")}</ul></details></li>`).join("")}</ol>
   <p class="xs mt2">Invented data about an invented country, written for practice. The part structure and marks follow the paper's published outline; the guidance is a teacher's, not a mark scheme.</p></details>`:""}</div></section>`}
 if(n===3){const X=P.scenario||{};return `<section class="sec pp" aria-label="Paper 3 guidance"><div class="wrap">${head}
  <div class="pp-g mt3"><div class="pp-off"><div class="eb">${srcTag("guide")} The paper (HL only)</div>${facts(P.facts)}
    <div class="eb mt3">Quantitative skills it draws on</div><ul class="ls-list mt2">${(P.skills||[]).map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>
   <div><div class="eb">${srcTag("platform")} Recommend is a decision under constraints</div><p class="sm mt2">${esc(P.recommend)}</p>
    <ol class="pp-frame mt3">${P.frame.map(f=>`<li><strong>${esc(f.step)}</strong><span class="sm"> ${esc(f.how)}</span></li>`).join("")}</ol></div></div>
  ${X.tasks?`<details class="pp-ex mt4"><summary>Policy and quantitative lab: ${esc(X.title||"")}</summary><p class="tag mt3">${esc(X.label)}</p>
   ${(X.text||[]).map(t=>`<p class="sm mt2">${esc(t)}</p>`).join("")}
   ${X.table?`<div class="scrollx mt3"><table class="t"><thead><tr>${X.table.head.map(h=>`<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${X.table.rows.map(r=>`<tr>${r.map(v=>`<td>${esc(v)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`:""}
   <ol class="pp-qs mt3">${X.tasks.map((q,i)=>`<li><p>${esc(q)}</p><textarea class="inp mt2" rows="4" aria-label="Your work on task ${i+1}" onchange="S.pp3=S.pp3||{};S.pp3[${i}]=this.value;save()">${esc((S.pp3||{})[i]||"")}</textarea>
    ${(X.answers||[])[i]?`<details class="mt2"><summary>One worked route</summary><p class="sm mt2">${esc(X.answers[i])}</p></details>`:""}</li>`).join("")}</ol>
   <p class="xs mt2">Invented data, for practice. A worked route is one defensible line of reasoning, not the only answer and not a mark scheme.</p></details>`:""}</div></section>`}
 return "";
}
function writingGuide(){const W=COURSE.writing||{};if(!(W.stages||[]).length)return "";
 return `<div class="wg mt3"><p class="sm" style="max-width:70ch">${esc(W.note||"")}</p>
  <ol class="wg-ladder mt3">${(W.ladder||[]).map((r,i)=>`<li><span class="wg-l">${String(i+1).padStart(2,"0")} ${esc(r.level)}</span><p>${esc(r.text)}</p></li>`).join("")}</ol>
  <div class="wg-stages mt4">${W.stages.map(s=>`<div class="ls-panel"><h4>${esc(s.name)}</h4><p class="sm mt1">${esc(s.what)}</p>
   <p class="xs mt2"><em>Weaker:</em> ${esc(s.weak)}</p><p class="xs mt1"><em>Stronger:</em> ${esc(s.better)}</p><p class="xs mt1">${esc(s.tip)}</p></div>`).join("")}</div>
  ${(W.ladders2||[]).map(L=>`<details class="mt3"><summary>${esc(L.topic)} · ${esc(L.unit)}</summary><ol class="wg-ladder mt2">${(L.rungs||[]).map((r,i)=>`<li><span class="wg-l">${String(i+1).padStart(2,"0")} ${esc(r.level)}</span><p>${esc(r.text)}</p></li>`).join("")}</ol></details>`).join("")}
  <div class="ls-grid2 mt4"><div class="ls-panel"><h4>Reasoning moves</h4><ul class="ls-list mt2">${(W.connectives||[]).map(c=>`<li><strong>${esc(c.move)}:</strong> ${esc(c.use)}</li>`).join("")}</ul></div>
   <div class="ls-panel"><h4>Habits that weaken an answer</h4><ul class="ls-list mt2">${(W.avoid||[]).map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div></div>
  <p class="xs mt2">${srcTag("platform")} These are reasoning moves, not a template to memorise.</p></div>`}

/* ── checklists ── */
function clGen(){const vis=lsVisible();
 return [
  {id:"course",name:"Course content",for:"Every subtopic at your level, from the guide's content.",items:vis.map(s=>`${s.code} ${s.title}`),link:s=>null},
  {id:"diagrams",name:"Diagrams",for:"Every plate on this platform, by unit. Draw each from a blank page.",items:DGKEYS.filter(k=>DGSUB[k]&&vis.some(s=>s.code===DGSUB[k])).map(k=>`${DGSUB[k]} · ${DG[k]().t}`)},
  {id:"calcs",name:"Calculations",for:"Every calculation, with its formula. Mark HL ones only if you take HL.",items:CALC.filter(c=>S.lvl==="HL"||c.lvl!=="HL").map(c=>`${c.n} (${c.f})${c.lvl==="HL"?" · HL":""}`)}]}
function clAll(){return clGen().concat((COURSE.checklists||[]).filter(c=>S.lvl==="HL"||!/hl-extension|paper-3/.test(c.id)))}
function checklistsView(){const all=clAll();S.cl=S.cl&&typeof S.cl==="object"?S.cl:{};
 const cur=all.find(c=>c.id===(ARG||CLX))||all[all.length-1];
 return H.pageHead("Course","Checklists",
  "Checklists for content, diagrams, calculations, concepts, examples, policies, terms, each paper, the IA, the EE and the HL extension, and the one that matters most: can I actually do this?")
 +`<section class="sec"><div class="wrap"><div class="cl-tabs" role="tablist" aria-label="Checklists">${all.map(c=>{const t=S.cl[c.id]||{},d=c.items.filter((x,i)=>t[i]).length;
   return `<button role="tab" aria-selected="${c===cur}" class="${c===cur?"on":""}" onclick="CLX='${c.id}';ARG=null;render()">${esc(c.name)} <span class="xs">${d}/${c.items.length}</span></button>`}).join("")}</div>
  <div class="cl-card mt4"><div class="row" style="justify-content:space-between;gap:10px;align-items:flex-start"><div><h2>${esc(cur.name)}</h2><p class="sm mt1">${esc(cur.for||"")}</p></div>
   <div class="row" style="gap:6px"><button class="btn xs gh" onclick="clPrint('${cur.id}')">Print</button><button class="btn xs gh" onclick="if(confirm('Clear every tick on this checklist?')){S.cl['${cur.id}']={};save();render()}">Clear</button></div></div>
  <ul class="cl-list mt3">${cur.items.map((x,i)=>`<li><label><input type="checkbox" ${(S.cl[cur.id]||{})[i]?"checked":""} onchange="S.cl['${cur.id}']=S.cl['${cur.id}']||{};S.cl['${cur.id}'][${i}]=this.checked;save()"> <span>${esc(x)}</span></label></li>`).join("")}</ul>
  ${cur.id==="can-i-do-this"?`<div class="cl-by mt4"><div class="eb">Your lessons, by these seven checks</div><div class="cl-grid mt2">${lsVisible().map(s=>`<button class="${lsDone(s.code)?"done":lsStarted(s.code)?"started":""}" onclick="${lsGoSub(s.code)}" title="${esc(s.title)}"><span>${esc(s.code)}</span><i style="width:${Math.round(lsScore(s.code)*100)}%"></i></button>`).join("")}</div>
   <p class="xs mt2">Each lesson ends with these seven checks, applied to that topic. Only the ones that apply are shown there (no diagram, no “I can draw it”).</p></div>`:""}
  <p class="xs mt3">${/^(course|diagrams|calcs)$/.test(cur.id)?srcTag("guide"):srcTag("platform")} Ticks are stored in your profile on this device only.</p></div></div></section>`}
let CLX="can-i-do-this";
function clPrint(id){const c=clAll().find(x=>x.id===id);if(!c)return;printDoc(c.name+" checklist",`<ul class="pl">${c.items.map(x=>`<li><span class="ck"></span>${esc(x)}</li>`).join("")}</ul>`,c.for||"",{kind:"sheet"})}

/* ── academic integrity ── */
function integrityView(){const I=COURSE.integrity||{};if(!I.topics)return "";
 return H.pageHead("IA","Academic integrity","What counts as your own work, how to credit other people's, and how to use tools without handing over the thinking.")
 +`<section class="sec"><div class="wrap"><p class="lede" style="max-width:64ch">${esc(I.intro)}</p>
  <div class="ai-line mt4"><div><div class="eb">Learning support</div><ul class="ls-list mt2">${I.support.learning.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>
   <div><div class="eb">Your own assessed work</div><ul class="ls-list mt2">${I.support.work.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div></div>
  <p class="ai-rule mt3">${esc(I.support.line)}</p>
  <div class="ai-g mt5">${I.topics.map(t=>`<section class="ls-panel"><h3 class="ls-h3">${esc(t.name)}</h3><p class="sm">${esc(t.what)}</p>
   <div class="ai-dd mt2"><div><div class="eb">Do</div><ul class="ls-list">${t.do.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div><div><div class="eb">Do not</div><ul class="ls-list">${t.dont.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div></div></section>`).join("")}</div>
  <h2 class="mt6">Before I submit</h2><div class="ai-sub mt3">${I.submit.map((s,j)=>`<section class="ls-panel"><h3 class="ls-h3">${esc(s.for)}</h3><ul class="cl-list">${s.items.map((x,i)=>`<li><label><input type="checkbox"
   ${((S.aicl||{})[j]||{})[i]?"checked":""} onchange="S.aicl=S.aicl||{};S.aicl[${j}]=S.aicl[${j}]||{};S.aicl[${j}][${i}]=this.checked;save()"> <span>${esc(x)}</span></label></li>`).join("")}</ul></section>`).join("")}</div>
  <h2 class="mt6">The IA and the extended essay are different tasks</h2><div class="scrollx mt3"><table class="t"><thead><tr>${I.eeVsIa.head.map(h=>`<th>${esc(h)}</th>`).join("")}</tr></thead>
   <tbody>${I.eeVsIa.rows.map(r=>`<tr>${r.map((v,i)=>i?`<td>${esc(v)}</td>`:`<th scope="row">${esc(v)}</th>`).join("")}</tr>`).join("")}</tbody></table></div>
  <p class="note n mt4"><span class="t">Check the current rules</span> ${esc(I.verify)}</p>
  <p class="xs mt3">${srcTag("platform")} Practical guidance written for this platform. The IB's Academic Integrity Policy was not available when it was written, so nothing here quotes it; where a rule depends on it, the text says to verify it.</p></div></section>`}

/* ── revision mode ── */
const REV={kind:null,arg:null,mins:30,seed:null};
function revStart(kind,arg){REV.kind=kind;REV.arg=arg;REV.seed=nowd();nav("practise",practiseTab("Ten-minute revision"))}
function revPick(){const vis=lsVisible();let pool=vis;
 if(REV.kind==="unit")pool=vis.filter(s=>s.unit===REV.arg);
 const score=c=>lsScore(c),seen=c=>((S.lesson||{})[c]||{}).seen||"";
 const ranked=pool.slice().sort((a,b)=>score(a.code)-score(b.code)||String(seen(a.code)).localeCompare(String(seen(b.code)))||vis.indexOf(a)-vis.indexOf(b));
 if(REV.kind==="unit")return ranked;
 if(REV.kind==="course"){return [1,2,3,4].map(u=>ranked.find(s=>s.unit===u)).filter(Boolean)}
 const n={15:1,30:2,60:4}[REV.mins]||2;return ranked.slice(0,n)}
function revWhy(c){const sc=lsScore(c);return sc===0&&!lsStarted(c)?"not yet started":sc<1?`${Math.round(sc*100)}% of its checks ticked`:"secure, due a refresh"}
function revTopic(c,short){const s=SPINE[c];if(!s)return "";const terms=lsTerms(c).filter(g=>g.diff!=="deeper").slice(0,short?2:3),dg=lsDiagrams(c)[0],cal=CALC.find(x=>x.sub===c),mis=lsMisc(c)[0],cs=(typeof RW_CASES!=="undefined"?RW_CASES:[]).find(x=>x.sub===c);
 const step=(m,h,b)=>`<li><span class="rv-m">${m} min</span><div><strong>${h}</strong>${b}</div></li>`;
 return `<section class="rv-t"><header><button class="lnk" onclick="${lsGoSub(c)}">${esc(c)} ${esc(lsTitle(c))}</button><span class="xs">chosen because it is ${revWhy(c)}</span></header><ol class="rv-steps">
  ${step(2,"The snapshot",`<p class="sm">${esc(s.big.q)}</p><button class="lnk xs" onclick="snapOpen('${c}')">Open the one-page map</button>`)}
  ${step(2,"Definitions from memory",`<ul class="ls-list">${terms.map(g=>`<li><details><summary>${esc(g.term)}</summary><p class="xs mt1">${esc(g.def)}</p></details></li>`).join("")}</ul>`)}
  ${dg?step(3,"Draw it, then compare",`<p class="sm">${esc(DG[dg]().t)}: draw it fully labelled on paper first.</p><details><summary>Compare with the plate</summary><div class="rv-fig">${(()=>{const d=DG[dg]();return frame(d.b,d.x,d.y,{alt:d.alt})})()}</div></details>`):""}
  ${cal&&!short?step(2,"Calculate",`<p class="sm">${esc(cal.n)}: write the formula, then check it.</p><details><summary>Formula</summary><p class="mn xs mt1">${esc(cal.f)}</p></details>`):""}
  ${mis?step(2,"Misconception check",`<div class="ls-mcq" id="lsw-${esc(mis.id)}">${lsWatchQ(mis.id,null)}</div>`):""}
  ${step(3,"Retrieve without notes",`<ol class="ls-list">${(s.retrieve||[]).slice(0,short?2:3).map(r=>`<li><details><summary>${esc(r.q)}</summary><p class="xs mt1">${esc(r.a)}</p></details></li>`).join("")}</ol>`)}
  ${cs&&!short?step(1,"A real-world example",`<p class="sm"><button class="lnk" onclick="rwOpen('${cs.id}')">${esc(cs.t)}</button> (${esc(cs.c)}, ${esc(String(cs.y))})</p>`):""}
  ${step(2,"Evaluate",`<p class="sm">${esc((s.mech||[])[0]?s.mech[0].depends:s.tei.interp)}</p><p class="xs mt1">Say what the outcome depends on, then which way you judge it and why.</p>`)}</ol></section>`}
function revView(){const picked=REV.kind?revPick():null;
 return `<section class="sec rv" aria-labelledby="rv-h"><div class="wrap"><div class="kicker">Revision mode</div><h2 class="mt1" id="rv-h">A structured review, not a random quiz</h2>
  <p class="sm mt2" style="max-width:68ch">Choose the time you have. The review picks the lessons you have ticked least (then the ones you have not opened for longest), and runs each through the same steps: the map, definitions, a diagram, a calculation, a misconception, retrieval, an example and an evaluation.</p>
  <div class="row mt3" style="gap:6px;flex-wrap:wrap">${[15,30,60].map(m=>`<button class="btn sm ${REV.kind==="time"&&REV.mins===m?"":"gh"}" onclick="REV.kind='time';REV.mins=${m};render()">${m} minutes</button>`).join("")}
   ${[1,2,3,4].map(u=>`<button class="btn sm ${REV.kind==="unit"&&REV.arg===u?"":"gh"}" onclick="REV.kind='unit';REV.arg=${u};render()">Unit ${u}</button>`).join("")}
   <button class="btn sm ${REV.kind==="course"?"":"gh"}" onclick="REV.kind='course';render()">Full course</button></div>
  ${picked?`<div class="rv-list mt4">${REV.kind==="course"?`<p class="sm">One lesson from each unit, plus the course map. <button class="lnk" onclick="snapOpen('course')">Open the course map</button></p>`:""}
   ${REV.kind==="unit"?`<p class="sm">Every lesson in Unit ${REV.arg}, least secure first. Take them in several sittings. <button class="lnk" onclick="snapPrint('u${REV.arg}',1)">Print the unit's last-night sheet</button></p>`:""}
   ${picked.map(s=>revTopic(s.code,REV.kind==="unit"||REV.kind==="course")).join("")}</div>`:""}
  <p class="xs mt3">Selection uses only your own ticks and the dates you opened each lesson. Nothing else is inferred.</p></div></section>`}
