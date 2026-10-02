/* ═══════════════════════════════════════════════════════════════════════════
   WIRING FOR THE EVENTS ARCHIVE: the "you are here" chapter rail, search
   records for every event, and the start-up guard for the lazy files.
   ═══════════════════════════════════════════════════════════════════════════ */
let EVOBS=null;
(function(){const prev=render;render=function(){const r=prev.apply(this,arguments);
 if(EVOBS){EVOBS.disconnect();EVOBS=null}
 if(VIEW==="events"&&ARG&&TAB===0&&"IntersectionObserver" in window){const links=[...document.querySelectorAll(".ev-rail a[data-ch]")];if(links.length){
  EVOBS=new IntersectionObserver(es=>{es.forEach(x=>{if(x.isIntersecting){const k=x.target.id.replace("ev-","");links.forEach(a=>{const on=a.dataset.ch===k;a.classList.toggle("on",on);if(on){a.setAttribute("aria-current","step");try{a.scrollIntoView({block:"nearest",inline:"nearest"})}catch(e){}}else a.removeAttribute("aria-current")})}})},{rootMargin:"-30% 0px -60% 0px"});
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
