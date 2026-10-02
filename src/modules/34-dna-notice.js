/* ═══════════════════════════════════════════════════════════════════════════
   EXAM DNA · historical, not predictive, on every page
   The heatmap always said that Exam DNA describes past papers and predicts
   nothing; the other six DNA pages carried only the source and copyright
   panel. Each now opens with the same statement, worded for what that page
   does, so no DNA page can be read as a forecast.
   ═══════════════════════════════════════════════════════════════════════════ */
const DNAHIST={
 "Past paper explorer":"It lists what was asked in the past papers supplied for this analysis.",
 "Archetypes":"Each archetype is a pattern found in the past papers supplied for this analysis.",
 "What earns marks":"It reads what earned marks in the past papers supplied for this analysis.",
 "Build a question":"A question built here is new practice made from an archetype, not a forecast of a future paper.",
 "Question museum":"It shows questions from the past papers supplied for this analysis.",
 "Source register":"It records which past papers were supplied for this analysis and how they were read."};
function dnaSessions(){try{return new Set(dnaAll().map(p=>p.s)).size}catch(e){return 0}}
function dnaHistNote(label){const n=dnaSessions(),what=DNAHIST[label];if(!what)return "";
 return `<div class="wrap dna-hist" style="margin-top:28px"><div class="panel warn" role="note"><div class="eb">Historical, not predictive</div>
  <p class="sm mt2">${esc(what)} Exam DNA is not a prediction tool: it describes ${n?`${n} analysed sessions`:"the analysed sessions"} and does not indicate what will be asked in any future session.</p></div></div>`}
(function(){const prev=VIEWS.dna;if(!prev)return;
 VIEWS.dna=function(){const h=prev.apply(this,arguments),s=SECTIONS.find(x=>x.v==="dna"),label=s&&s.tabs?s.tabs[TAB]:null,note=dnaHistNote(label);
  if(!note||String(h).includes("not a prediction tool"))return h;
  const i=String(h).indexOf("</section>");return i<0?note+h:h.slice(0,i+10)+note+h.slice(i+10)}})();

function DNAHSUITE(){const out=[];const T=(n,f)=>{let ok=false,det="";try{const r=f();ok=r===true||(r&&r.ok);if(r&&r.d)det=r.d}catch(e){det=e.message}out.push({n,ok:!!ok,detail:det})};
 const keep={VIEW,TAB,ARG},s=SECTIONS.find(x=>x.v==="dna");
 T("Exam DNA · every DNA page says it is historical and not a prediction tool",()=>{const bad=s.tabs.filter((l,i)=>{VIEW="dna";TAB=i;ARG=null;return !VIEWS.dna().includes("not a prediction tool")});return{ok:!bad.length,d:bad.join(", ")}});
 T("Exam DNA · the notice appears once per page, never twice",()=>s.tabs.every((l,i)=>{VIEW="dna";TAB=i;ARG=null;return (VIEWS.dna().match(/not a prediction tool/g)||[]).length===1}));
 T("Profiles · every economist profile shows its inquiry question",()=>{if(!window.__IDEAS__)return true;const bad=__IDEAS__.economists.filter(e=>{VIEW="ideas";TAB=0;ARG=e.id;const h=VIEWS.ideas();return !(h.includes("An inquiry question")&&h.includes(esc(e.question)))}).map(e=>e.id);return{ok:!bad.length,d:bad.join(", ")}});
 VIEW=keep.VIEW;TAB=keep.TAB;ARG=keep.ARG;return out}
DNAHSUITE.suiteName="Exam DNA notice and profiles";
EXTRA_SUITES.push(DNAHSUITE);
QAREPORT.push({area:"Exam DNA notice and profiles",re:/^(Exam DNA · every DNA page|Exam DNA · the notice appears|Profiles · )/,
 what:"That every Exam DNA page, not only the heatmap, states once that it describes the supplied past papers and is not a prediction tool, and that every economist profile shows its inquiry question."});
