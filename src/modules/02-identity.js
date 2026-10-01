/* ═══════════════════════════════════════════════════════════════════════════
   RENAISSANCE · 2 · section identities and the motion layer
   Each section keeps one system but its own register: journal paper for the
   scholarly sections, a newsroom for Real World, graph paper for the labs,
   answer paper for the exam room, a node field for mindmaps, a magazine for
   Economics, Everywhere. The register is set on <body data-sec> after every
   paint. An opener turns to paper only when it holds nothing but a heading and
   its lede, so no control designed for the dark band is ever put on ivory.
   ═══════════════════════════════════════════════════════════════════════════ */
const RN_PAPER=new Set(["course","learn","ia","ees","tok","educator","syllabus"]);
const RN={io:null,reduced:false};
try{RN.reduced=!!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion:reduce)").matches)}catch(e){}
function rnPaperOk(h){return !h.querySelector("button,a[href],img,input,select,textarea,video,iframe,.stat")}
function rnDecorate(){
 if(typeof document==="undefined"||!document.body)return;
 /* a change on <body> restyles the whole document; the self-test sweep paints ~150
    views it never shows, so the register is applied on the paints a reader sees */
 if(typeof QARUNNING!=="undefined"&&QARUNNING)return;
 if(document.body.dataset.sec!==VIEW)document.body.dataset.sec=VIEW;
 const v=document.getElementById("view");if(!v)return;
 v.querySelectorAll("section.hero").forEach(h=>{if(RN_PAPER.has(VIEW)&&rnPaperOk(h))h.classList.add("paper")});
 /* figures below the fold are drawn as they approach, not all at once */
 const fill=el=>{if(!el.firstChild)el.innerHTML=motifSVG(el.dataset.motif,{cls:"on-paper"})};
 const figs=v.querySelectorAll("[data-motif]");
 if(figs.length&&!(typeof QARUNNING!=="undefined"&&QARUNNING)){
  if(typeof IntersectionObserver==="undefined")figs.forEach(fill);
  else{if(RN.fo)RN.fo.disconnect();RN.fo=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){fill(e.target);RN.fo.unobserve(e.target)}}),{rootMargin:"400px 0px"});figs.forEach(el=>RN.fo.observe(el))}}
 /* the reveal measures layout, so it never runs while the self-test paints views */
 if(!document.body.classList.contains("rn-anim")||typeof IntersectionObserver==="undefined"||(typeof QARUNNING!=="undefined"&&QARUNNING))return;
 if(RN.io)RN.io.disconnect();
 RN.io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.remove("rn-wait");RN.io.unobserve(e.target)}}),{rootMargin:"0px 0px -8% 0px"});
 v.querySelectorAll(".shead").forEach(s=>{const r=s.getBoundingClientRect();if(r.top>innerHeight){s.classList.add("rn-wait");RN.io.observe(s)}});
 v.querySelectorAll("[data-count]").forEach(el=>RN.io.observe(el));
}
(function(){
 const prev=render;
 render=function(){const r=prev.apply(this,arguments);try{rnDecorate()}catch(e){}return r};
 /* motion is switched on once, never while the self-test paints views */
 if(!RN.reduced&&typeof document!=="undefined"&&document.body)document.body.classList.add("rn-anim");
})();
