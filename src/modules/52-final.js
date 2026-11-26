/* ═══════════════════════════════════════════════════════════════════════════
   THE FINAL FLAGSHIP · back to the top
   Long pages (the home page, the book, the course, the handbook library) gain
   one quiet control: after a reader has scrolled more than one and a half
   screens, a "Back to top" button appears in the corner, and returns focus to
   the page's heading when used. It is hidden while the opening plays and
   whenever a dialogue or the drawer is open, scrolls instantly for reduced
   motion, and stores nothing.
   ═══════════════════════════════════════════════════════════════════════════ */
const FX_TOP={el:null,on:false,raf:0};
function fxTopEl(){
 if(FX_TOP.el&&FX_TOP.el.isConnected)return FX_TOP.el;
 const b=document.createElement("button");
 b.type="button";b.id="fx-top";b.className="fx-top";b.setAttribute("aria-label","Back to top");b.hidden=true;
 b.innerHTML=`<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M10 16V4M4.5 9.5 10 4l5.5 5.5"/></svg><span>Top</span>`;
 b.addEventListener("click",()=>{
  let reduce=false;try{reduce=matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){}
  try{window.scrollTo({top:0,behavior:reduce?"auto":"smooth"})}catch(e){window.scrollTo(0,0)}
  const h=document.querySelector("#view h1");
  if(h){if(!h.hasAttribute("tabindex"))h.setAttribute("tabindex","-1");try{h.focus({preventScroll:true})}catch(e){}}
 });
 /* inside main, after the view (which is repainted on every render): the page keeps its few top-level children */
 (document.getElementById("main")||document.body).appendChild(b);FX_TOP.el=b;return b;
}
function fxTopPaint(){
 FX_TOP.raf=0;
 const b=fxTopEl();
 const busy=!!document.getElementById("splash")||!!document.querySelector("dialog[open]")||!!document.getElementById("mob");
 const show=!busy&&window.scrollY>window.innerHeight*1.5;
 if(show!==FX_TOP.on){FX_TOP.on=show;b.hidden=!show}
}
(function(){
 if(typeof window==="undefined"||typeof document==="undefined")return;
 const go=()=>{try{fxTopEl();fxTopPaint()}catch(e){}
  window.addEventListener("scroll",()=>{if(!FX_TOP.raf)FX_TOP.raf=requestAnimationFrame(fxTopPaint)},{passive:true});
  window.addEventListener("resize",()=>{if(!FX_TOP.raf)FX_TOP.raf=requestAnimationFrame(fxTopPaint)},{passive:true});
  document.addEventListener("intro:done",()=>{try{fxTopPaint()}catch(e){}})};
 /* the platform's script runs at the end of the body, so the button exists before the start-up self-test */
 if(document.body)go();else document.addEventListener("DOMContentLoaded",go);
})();
function FXTOPSUITE(){
 const out=[];const T=(n,f)=>{let ok=false,det="";try{const r=f();ok=r===true||(r&&r.ok===true);if(r&&r.d)det=r.d}catch(e){det=e.message}out.push({n,ok:!!ok,detail:det})};
 T("Back to top · one labelled button, a real button, hidden at the top of a page",()=>{const b=document.getElementById("fx-top");
  return !!b&&b.tagName==="BUTTON"&&b.type==="button"&&b.getAttribute("aria-label")==="Back to top"&&(window.scrollY>innerHeight*1.5||b.hidden)});
 T("Back to top · it stays hidden while the opening plays or a dialogue is open",()=>/getElementById\("splash"\)/.test(String(fxTopPaint))&&/dialog\[open\]/.test(String(fxTopPaint)));
 return out;
}
FXTOPSUITE.suiteName="Back to top";
EXTRA_SUITES.push(FXTOPSUITE);
