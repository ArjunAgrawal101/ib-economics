/* ═══════════════════════════════════════════════════════════════════════════
   THE MISCONCEPTION DATABASE · THE ECONOMIST'S LENS · THE CONCEPT NETWORK ·
   ECONOMICS INTELLIGENCE
   The database is a teacher's (51 entries). Students see "Watch out": the
   belief, why it tempts, what is true, an analogy, a check and a retrieval
   question. Teachers see "Diagnostic insight": the root cause, questions that
   reveal it, an intervention, a mini activity, warning signs and the
   teacher's own observation of how it shows in exam work. Nothing here is
   presented as an IB examiner finding.
   ═══════════════════════════════════════════════════════════════════════════ */
const MX={area:"",sub:"",q:"",teacher:false,open:null};
function miscDbFilter(){const q=MX.q.trim().toLowerCase();
 return MISCDB.filter(m=>(!MX.area||m.area===MX.area)&&(!MX.sub||(m.subs||[]).includes(MX.sub))
  &&(!q||(m.title+" "+m.student.watch+" "+m.student.right).toLowerCase().includes(q)))}
function miscDb(){
 if(ARG&&MISCBY[ARG]){MX.open=ARG;ARG=null}
 const list=miscDbFilter(), areas=[...new Set(MISCDB.map(m=>m.area))];
 return `<section class="sec mdb" id="mdb" aria-labelledby="mdb-h"><div class="wrap">
  <div class="kicker">The misconception database ${srcTag("miscdb")}</div><h2 class="mt1" id="mdb-h">${MISCDB.length} ways economics goes wrong, and how to put it right</h2>
  <p class="sm mt2" style="max-width:70ch">Each entry names a belief students commonly hold, why it tempts, what is actually true and a check to find out whether you hold it. Teacher view adds the diagnosis. The database is a teacher's; its observations are not IB examiner reports.</p>
  <div class="gl-bar mt3"><input class="inp" type="search" placeholder="Search the misconceptions…" value="${esc(MX.q)}" aria-label="Search the misconceptions" oninput="MX.q=this.value;lsSwap('mdblist',miscDbList())">
   <div class="gl-f"><label class="eb" for="mdba">Area</label><select id="mdba" class="inp" onchange="MX.area=this.value;lsSwap('mdblist',miscDbList())"><option value="">All</option>
    ${areas.map(a=>`<option ${MX.area===a?"selected":""}>${esc(a)}</option>`).join("")}</select></div>
   <div class="gl-f"><label class="eb" for="mdbs">Topic</label><select id="mdbs" class="inp" onchange="MX.sub=this.value;lsSwap('mdblist',miscDbList())"><option value="">All</option>
    ${SUBTOPICS.filter(s=>MISCDB.some(m=>(m.subs||[]).includes(s.code))).map(s=>`<option value="${s.code}" ${MX.sub===s.code?"selected":""}>${esc(s.code+" "+s.title)}</option>`).join("")}</select></div>
   <div class="gl-f"><span class="eb">View</span><div class="seg mt2">${[["Student",false],["Teacher",true]].map(([n,v])=>`<button class="${MX.teacher===v?"on":""}" aria-pressed="${MX.teacher===v}" onclick="MX.teacher=${v};lsSwap('mdblist',miscDbList());this.parentNode.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b===this))">${n}</button>`).join("")}</div></div></div>
  <div id="mdblist" class="mdb-list mt4">${miscDbList(list)}</div></div></section>`;
}
function miscDbList(list){list=list||miscDbFilter();if(!list.length)return `<p class="sm">No entry matches.</p>`;
 return list.map(m=>{const open=MX.open===m.id,st=m.student,tv=m.teacher;
  return `<article class="mdb-card${open?" open":""}"><button class="mdb-t" aria-expanded="${open}" onclick="MX.open=MX.open==='${m.id}'?null:'${m.id}';lsSwap('mdblist',miscDbList())">
   <span class="mdb-id">${esc(m.id)}</span><span class="mdb-ti">${esc(m.title)}</span><span class="mdb-w">“${esc(st.watch)}”</span>
   <span class="mdb-subs">${(m.subs||[]).map(s=>`<span class="tag">${esc(s)}</span>`).join("")}</span></button>
  ${open?`<div class="mdb-b">${MX.teacher?`<div class="ls-diag"><div class="eb">Diagnostic insight · teacher view</div><dl class="ls-dl mt2">
     <div><dt>Root cause</dt><dd>${esc(tv.root)}</dd></div><div><dt>Diagnostic questions</dt><dd><ul>${(tv.diag||[]).map(x=>`<li>${esc(x)}</li>`).join("")}</ul></dd></div>
     <div><dt>Classroom intervention</dt><dd>${esc(tv.intervention)}</dd></div><div><dt>Mini activity</dt><dd>${esc(tv.activity)}</dd></div>
     <div><dt>A teacher's observation</dt><dd>${esc(tv.examiner)}</dd></div><div><dt>Warning signs</dt><dd><ul>${(tv.warning||[]).map(x=>`<li>${esc(x)}</li>`).join("")}</ul></dd></div></dl></div>`:""}
   <dl class="ls-dl"><div><dt>In fact</dt><dd>${esc(st.right)}</dd></div><div><dt>Why it tempts</dt><dd>${esc(st.why)}</dd></div>
    <div><dt>An analogy</dt><dd>${esc(st.analogy)}</dd></div><div><dt>In an exam</dt><dd>${esc(st.exam)}</dd></div>${st.ia?`<div><dt>In an IA</dt><dd>${esc(st.ia)}</dd></div>`:""}
    ${m.beyond?`<div><dt>Scope</dt><dd>${esc(m.beyond)}</dd></div>`:""}</dl>
   <div class="ls-mcq mt3" id="lsw-${esc(m.id)}">${lsWatchQ(m.id,null)}</div>
   <details class="mt2"><summary>Retrieve it later</summary><p class="sm mt2"><strong>${esc(st.retrieve.q)}</strong></p><p class="sm mt1">${esc(st.retrieve.a)}</p></details>
   <p class="xs mt2">${(m.subs||[]).map(s=>`<button class="lnk" onclick="${lsGoSub(s)}">Open ${esc(s)} ${esc(lsTitle(s))}</button>`).join(" · ")}</p></div>`:""}</article>`}).join("")}

/* ── The Economist's Lens ── */
function lensView(){const L=COURSE.lens||{};if(!(L.qs||[]).length)return "";
 const by=Object.fromEntries(L.qs.map(q=>[q.n,q]));
 return `<section class="sec lens" aria-labelledby="lens-h"><div class="wrap"><div class="kicker">A way to open any economic issue ${srcTag("platform")}</div>
  <h2 class="mt1" id="lens-h">The Economist's Lens</h2><p class="lede mt2" style="max-width:62ch">${esc(L.intro||"")}</p>
  <div class="lens-g mt4">${(L.groups||[]).map(g=>`<section class="lens-grp"><h3>${esc(g.name)}</h3><ol>${(g.ids||[]).map(n=>by[n]).filter(Boolean).map(q=>
   `<li value="${q.n}"><strong>${esc(q.q)}</strong><span class="sm">${esc(q.why)}</span><details><summary>How to answer it well</summary><p class="xs mt1">${esc(q.hint)}</p>
    <p class="xs mt1"><em>Applied to ${esc(L.example||"the running example")}:</em> ${esc(q.ex)}</p></details></li>`).join("")}</ol></section>`).join("")}</div>
  <div class="row mt3" style="gap:8px"><button class="btn sm gh" onclick="lensPrint()">Print the lens card</button></div></div></section>`}
function lensPrint(){const L=COURSE.lens||{};printDoc("The Economist's Lens",`<div class="psheet"><p>${esc(L.intro||"")}</p><ol class="pl lensp">${(L.qs||[]).map(q=>`<li><strong>${esc(q.q)}</strong> ${esc(q.why)}</li>`).join("")}</ol></div>`,
 "Seventeen questions for any economic issue",{kind:"sheet"})}

/* ── The nine key concepts as a network: one concept, many worlds ── */
const KCN=["Scarcity","Choice","Efficiency","Equity","Economic well-being","Sustainability","Change","Interdependence","Intervention"];
function conceptNet(sel){const C=COURSE.concepts||[];if(!C.length)return "";
 const W=640,Hh=420,cx=W/2,cy=Hh/2,R=160,pos=Object.fromEntries(KCN.map((k,i)=>{const a=-Math.PI/2+i*2*Math.PI/KCN.length;return [k,[cx+R*1.35*Math.cos(a),cy+R*Math.sin(a)]]}));
 const seen=new Set(),edges=[];C.forEach(k=>(k.links||[]).forEach(l=>{if(!pos[l]||!pos[k.c])return;const e=[k.c,l].sort(),key=e.join("|");
  if(!seen.has(key)){seen.add(key);edges.push(e)}}));
 return `<svg class="kcnet" viewBox="0 0 ${W} ${Hh}" role="group" aria-label="The nine key concepts and the links between them">${edges.map(([a,b])=>{const on=sel===a||sel===b;
  return `<line x1="${pos[a][0].toFixed(1)}" y1="${pos[a][1].toFixed(1)}" x2="${pos[b][0].toFixed(1)}" y2="${pos[b][1].toFixed(1)}" class="${on?"on":""}"/>`}).join("")}
  ${KCN.map(k=>`<g class="kcn${k===sel?" sel":""}" tabindex="0" role="button" aria-label="${esc(k)}" onclick="CX.kc='${esc(k)}';render()" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();CX.kc='${esc(k)}';render()}">
   <circle cx="${pos[k][0].toFixed(1)}" cy="${pos[k][1].toFixed(1)}" r="${k===sel?40:34}"/><text x="${pos[k][0].toFixed(1)}" y="${(pos[k][1]+4).toFixed(1)}" text-anchor="middle">${esc(k.replace("Economic well-being","Well-being"))}</text></g>`).join("")}</svg>`}
function conceptWorlds(){const k=(COURSE.concepts||[]).find(x=>x.c===CX.kc);if(!k)return "";
 const here=lsCodes().filter(c=>(SPINE[c]&&SPINE[c].kc||[]).some(x=>x.c===k.c));
 return `<section class="sec kcw" aria-labelledby="kcw-h"><div class="wrap"><div class="kicker">The concept network ${srcTag("guide","The nine concepts are the guide's; the connections are this platform's")}</div>
  <h2 class="mt1" id="kcw-h">${esc(k.c)}: one concept, many worlds</h2>
  <div class="kcw-g mt4"><div>${conceptNet(k.c)}<p class="xs mt2">Select a concept to follow it. Lines join concepts that most often work together.</p></div>
   <div><p class="lede">${esc(k.core)}</p><p class="ls-q mt3">${esc(k.q)}</p><p class="sm mt3"><strong>Where it creates tension:</strong> ${esc(k.tension)}</p>
    <p class="sm mt2"><strong>In an IA:</strong> ${esc(k.ia)}</p><p class="sm mt2"><strong>TOK:</strong> ${esc(k.tok)}</p>
    <p class="xs mt2">Often works with ${(k.links||[]).map(l=>`<button class="lnk" onclick="CX.kc='${esc(l)}';render()">${esc(l)}</button>`).join(", ")}.</p></div></div>
  <h3 class="ls-h3 mt5">The same concept behaves differently in different places</h3>
  <div class="kcw-worlds mt3">${(k.worlds||[]).map(w=>`<button class="kcw-w" onclick="${lsGoSub(w.sub)}"><span class="ls-cy">${esc(w.sub)} · ${esc(lsTitle(w.sub))}</span><strong>${esc(w.context)}</strong><span class="sm">${esc(w.how)}</span></button>`).join("")}</div>
  ${here.length?`<h3 class="ls-h3 mt5">Lessons that use ${esc(k.c)} (${here.length})</h3><div class="kcw-here mt2">${here.map(c=>{const x=SPINE[c].kc.find(y=>y.c===k.c);
   return `<div><button class="lnk" onclick="${lsGoSub(c)}">${esc(c)} ${esc(lsTitle(c))}</button><p class="xs mt1">${esc(x.here)}</p></div>`}).join("")}</div>`:""}
 </div></section>`}

/* ── Economics Intelligence: each real-world issue as a path ── */
function intelPath(){const r=(COURSE.intel||[]).find(x=>x.id===CX.rwi);if(!r)return "";
 return `<section class="sec intel" aria-labelledby="intel-h"><div class="wrap"><div class="kicker">Economics Intelligence</div>
  <h2 class="mt1" id="intel-h">Follow the issue from concept to exam</h2><p class="ls-q mt2">${esc(r.q)}</p><p class="xs mt1">${srcTag("guide")} The real-world issue as the guide words it. ${srcTag("platform")} The path below is original.</p>
  <ol class="intel-path mt4">${(r.path||[]).map((p,i)=>`<li class="ip-${esc(p.stage.toLowerCase().replace(/\s+/g,"-"))}"><span class="ip-n">${String(i+1).padStart(2,"0")}</span><div><div class="eb">${esc(p.stage)}</div>
   <p class="sm mt1">${esc(p.t)}</p><div class="row mt1" style="gap:5px;flex-wrap:wrap">${(p.subs||[]).map(s=>`<button class="kcchip" onclick="${lsGoSub(s)}">${esc(s)}</button>`).join("")}
   ${p.dg&&DG[p.dg]?`<button class="kcchip" onclick="nav('lab',3,'${p.dg}')">${esc(DG[p.dg]().t)}</button>`:""}
   ${(p.cases||[]).map(id=>{const x=(typeof RW_CASES!=="undefined"?RW_CASES:[]).find(y=>y.id===id);return x?`<button class="kcchip" onclick="rwOpen('${x.id}')">${esc(x.t)}</button>`:""}).join("")}</div></div></li>`).join("")}</ol>
  ${r.worlds?`<h3 class="ls-h3 mt5">One concept, many worlds: ${esc(r.worlds.c)}</h3><div class="kcw-worlds mt3">${(r.worlds.items||[]).map(w=>`<button class="kcw-w" onclick="${lsGoSub(w.sub)}"><span class="ls-cy">${esc(w.sub)}</span><strong>${esc(w.context)}</strong><span class="sm">${esc(w.how)}</span></button>`).join("")}</div>`:""}
 </div></section>`}
