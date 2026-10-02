/* ═══════════════════════════════════════════════════════════════════════════
   WIRING FOR THE EVENTS ARCHIVE: the "you are here" chapter rail, search
   records for every event, and the start-up guard for the lazy files.
   ═══════════════════════════════════════════════════════════════════════════ */
let EVOBS=null;
/* Keep the current chapter's link in view by scrolling the rail's own list
   sideways. Never call scrollIntoView here: the rail is sticky, and asking the
   browser to reveal a stuck element scrolls the WINDOW back to the rail's
   original place, which pulled readers up the page every time a chapter came
   into view (the "page will not scroll" fault). */
function evRailReveal(a){const ol=a&&a.closest("ol");if(!ol)return;
 const l=a.offsetLeft,r=l+a.offsetWidth;
 if(l<ol.scrollLeft||r>ol.scrollLeft+ol.clientWidth)ol.scrollLeft=Math.max(0,l-(ol.clientWidth-a.offsetWidth)/2)}
(function(){const prev=render;render=function(){const r=prev.apply(this,arguments);
 if(EVOBS){EVOBS.disconnect();EVOBS=null}
 if(VIEW==="events"&&ARG&&TAB===0&&"IntersectionObserver" in window){const links=[...document.querySelectorAll(".ev-rail a[data-ch]")];if(links.length){
  EVOBS=new IntersectionObserver(es=>{es.forEach(x=>{if(x.isIntersecting){const k=x.target.id.replace("ev-","");links.forEach(a=>{const on=a.dataset.ch===k;a.classList.toggle("on",on);if(on){a.setAttribute("aria-current","step");evRailReveal(a)}else a.removeAttribute("aria-current")})}})},{rootMargin:"-30% 0px -60% 0px"});
  document.querySelectorAll(".ev-ch").forEach(s=>EVOBS.observe(s))}}
 return r}})();
(function(){if(typeof buildIndex!=="function")return;const prev=buildIndex;
 buildIndex=function(){if(SIDX)return SIDX;const I=prev().slice();
  EVENTSIDX.events.forEach(e=>I.push({k:"Economic event",t:`${e.title} (${e.years})`,d:e.standfirst,go:`nav('events',0,'${e.id}')`,s:[e.id,e.region,e.kind,e.question,(e.tags||[]).join(" "),"history crisis economic event"].join(" ")}));
  I.push({k:"Economic event",t:"Compare two economic events",d:"Two episodes side by side: trigger, mechanism, response, short and long run",go:"nav('events',1)",s:"compare events crisis similar different mechanism"});
  I.push({k:"Economic event",t:"Economics through time",d:"Economists and events on one timeline",go:"nav('events',2)",s:"timeline history of economic thought events economists"});
  return SIDX=I};
 if(typeof RN_KIND_W!=="undefined")RN_KIND_W["Economic event"]=2.3;
 if(typeof CPGROUPS!=="undefined"){const g=CPGROUPS.find(x=>x[0]==="ideas");if(g){g[1]="Ideas, history and data";g[2]=/^(Economist|Why did this happen\?|Data|Economic event)$/}}
 try{SIDX=null}catch(e){}})();
