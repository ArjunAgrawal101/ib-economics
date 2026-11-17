/* ═══════════════════════════════════════════════════════════════════════════
   FLAGSHIP · one search, labelled by pathway
   The palette already searches every section, every printable and the whole
   content index. Each result now says which pathway it belongs to, IB DP or
   UPSC CSE, or Both for the shared pages, read from where the result leads,
   so the label cannot drift from the destination. The kind label and the
   filters are unchanged.
   ═══════════════════════════════════════════════════════════════════════════ */
function fxRunPath(run){
 const r=String(run||"");
 const m=/\bnav\(\s*'([a-z]+)'/.exec(r);
 if(m)return fxPathway(m[1]);
 if(/\b(hlOpenViewer|hlRender|upEnquire|upOpen)\b/.test(r))return "upsc";
 if(/\bccOpen\b|#\/concepts/.test(r))return "shared";
 if(/^(calcSheet|printLessonBlank|printMark|exportSummary|printIAStudent|printPlan|rwOpen|randomOpen)\b/.test(r.trim()))return "ib";
 return "ib";
}
const FX_PATHTAG={ib:["cp-ib","IB DP"],upsc:["cp-up","UPSC CSE"],shared:["cp-sh","Both"]};
(function(){
 if(typeof cpPaint!=="function")return;
 const prev=cpPaint;
 cpPaint=function(){
  const r=prev.apply(this,arguments);
  try{
   const box=document.getElementById("cpres");if(!box)return r;
   box.querySelectorAll(".cprow").forEach((b,i)=>{
    const it=CP.items[i];if(!it||b.querySelector(".cp-p"))return;
    const [cls,label]=FX_PATHTAG[fxRunPath(it.run)]||FX_PATHTAG.ib;
    const s=document.createElement("span");s.className="cp-p "+cls;s.textContent=label;
    b.appendChild(s);
   });
  }catch(e){}
  return r;
 };
})();
