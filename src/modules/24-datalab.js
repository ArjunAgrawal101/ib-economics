/* ═══════════════════════════════════════════════════════════════════════════
   THE ECONOMIC DATA LAB
   Official series (World Bank, EIA, the Federal Reserve, FRED, BLS, CDIAC),
   copied from open-data packages with their provenance. The file loads only
   when a data page opens. Nothing is estimated: a missing year stays missing,
   and every computed or converted series says so.
   ═══════════════════════════════════════════════════════════════════════════ */
const DLX={loading:false,err:false};
/* validated categorical order (dataviz validator, light surface #FBF8F1): a colour stays with its economy */
const DLPAL=["#2F6FB3","#C77A2A","#1F8C70","#7357B8","#B23A55"];
const DLCH={};
function dlData(){
 if(window.__ECONDATA__)return window.__ECONDATA__;
 /* the start-up self-test renders every tab; it must not pull the file into every visit */
 if(!DLX.loading&&!DLX.err&&!(typeof QARUNNING!=="undefined"&&QARUNNING)){DLX.loading=true;const s=document.createElement("script");s.src="assets/data/econ-data.js";
  s.onload=()=>{DLX.loading=false;if(!window.__ECONDATA__)DLX.err=true;render()};
  s.onerror=()=>{DLX.loading=false;DLX.err=true;render()};document.head.appendChild(s)}
 return null}
function dlS(){const d=S.dl&&typeof S.dl==="object"?S.dl:(S.dl={});
 if(!d.ind)d.ind="infl";if(!Array.isArray(d.ents))d.ents=["USA","IND","CHN"];if(!d.slots||typeof d.slots!=="object")d.slots={};
 d.ents.forEach(c=>{if(d.slots[c]===undefined)d.slots[c]=dlFreeSlot(d)});if(!d.y0)d.y0=2000;if(!d.atlas)d.atlas="IND";if(!d.fx)d.fx="India";return d}
function dlFreeSlot(d){const used=new Set(d.ents.map(c=>d.slots[c]).filter(x=>x!==undefined));for(let i=0;i<DLPAL.length;i++)if(!used.has(i))return i;return 0}
function dlEnt(code){const D=dlData();return ((D&&D.meta.entities)||[]).find(e=>e.code===code)||{code,name:code}}
function dlFmt(v,unit){if(v===null||v===undefined||isNaN(v))return "–";const a=Math.abs(v);
 const s=a>=1000?Math.round(v).toLocaleString("en-GB"):a>=100?v.toFixed(0):a>=10?v.toFixed(1):v.toFixed(2);return s}
function dlX(x){return typeof x==="number"?x:(+x.slice(0,4))+((+x.slice(5,7)||1)-1)/12}
function dlNice(lo,hi,n){if(lo===hi){lo-=1;hi+=1}const r=hi-lo,st=Math.pow(10,Math.floor(Math.log10(r/n))),m=[1,2,2.5,5,10].find(k=>r/(st*k)<=n)||10,s=st*m;
 const a=Math.floor(lo/s)*s,b=Math.ceil(hi/s)*s,t=[];for(let v=a;v<=b+s/2;v+=s)t.push(+v.toFixed(10));return t}

/* one axis, thin 2px lines, recessive grid, direct labels at the line ends, a crosshair on hover and focus */
function dlChart(id,series,o){o=o||{};
 /* drawn at the width it is shown, so its text stays at its true size on a phone and a wide screen */
 const W=Math.round(Math.max(320,Math.min(1080,o.w||(((document.getElementById("view")||{}).clientWidth||innerWidth)-80)))),H=o.h||300,L=52,R=o.labels===false?18:118,T=o.marks&&o.marks.length?38:14,B=30;
 const all=series.flatMap(s=>s.pts);if(!all.length)return `<p class="sm">No values in this range.</p>`;
 const xs=all.map(p=>dlX(p[0])),ys=all.map(p=>p[1]);let x0=Math.min(...xs),x1=Math.max(...xs);if(x0===x1){x0-=1;x1+=1}
 let lo=Math.min(...ys),hi=Math.max(...ys);if(o.zero!==false){lo=Math.min(lo,0);hi=Math.max(hi,0)}
 const yt=dlNice(lo,hi,5);lo=yt[0];hi=yt[yt.length-1];
 const sx=x=>L+(dlX(x)-x0)/(x1-x0)*(W-L-R),sy=y=>T+(hi-y)/(hi-lo)*(H-T-B);
 const span=x1-x0,step=span>30?10:span>12?5:span>5?2:1,xt=[];for(let y=Math.ceil(x0/step)*step;y<=x1;y+=step)xt.push(y);
 const gap=o.monthly?0.2:1.01;
 const paths=series.map(s=>{const segs=[];let cur=[];s.pts.forEach((p,i)=>{if(i&&dlX(p[0])-dlX(s.pts[i-1][0])>gap){segs.push(cur);cur=[]}cur.push(p)});segs.push(cur);
  return segs.map(g=>g.length>1?`<path d="${g.map((p,i)=>(i?"L":"M")+sx(p[0]).toFixed(1)+" "+sy(p[1]).toFixed(1)).join("")}" fill="none" stroke="${s.color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`
   :g.map(p=>`<circle cx="${sx(p[0]).toFixed(1)}" cy="${sy(p[1]).toFixed(1)}" r="4" fill="${s.color}" stroke="#FBF8F1" stroke-width="2"/>`).join("")).join("")}).join("");
 let labs=series.map(s=>{const p=s.pts[s.pts.length-1];return {s,y:sy(p[1]),x:sx(p[0])}}).sort((a,b)=>a.y-b.y);
 for(let i=1;i<labs.length;i++)if(labs[i].y-labs[i-1].y<13)labs[i].y=labs[i-1].y+13;
 const lab=o.labels===false?"":labs.map(l=>`<text x="${(l.x+8).toFixed(1)}" y="${(l.y+4).toFixed(1)}" class="dl-dlab">${esc(l.s.short||l.s.name)}</text>`).join("");
 DLCH[id]={series,x0,x1,L,R,W,H,T,B,sx,sy,unit:o.unit||"",monthly:!!o.monthly,i:-1};
 const desc=`${o.title||"Chart"}: ${series.map(s=>{const a=s.pts[0],b=s.pts[s.pts.length-1];return `${s.name} from ${dlFmt(a[1])} in ${a[0]} to ${dlFmt(b[1])} in ${b[0]}`}).join("; ")}. ${o.unit||""}`;
 return `<div class="dl-chart" id="${id}"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(desc)}">
  ${yt.map(v=>`<line x1="${L}" x2="${W-R}" y1="${sy(v).toFixed(1)}" y2="${sy(v).toFixed(1)}" class="${v===0?"dl-zero":"dl-grid"}"/><text x="${L-8}" y="${(sy(v)+4).toFixed(1)}" class="dl-tick" text-anchor="end">${dlFmt(v)}</text>`).join("")}
  ${xt.map(v=>`<text x="${sx(v).toFixed(1)}" y="${H-10}" class="dl-tick" text-anchor="middle">${v}</text>`).join("")}
  ${(o.marks||[]).filter(m=>dlX(m.at)>=x0&&dlX(m.at)<=x1).map((m,i)=>{const mx=sx(m.at).toFixed(1);return `<line x1="${mx}" x2="${mx}" y1="${T-4}" y2="${H-B}" class="dl-mark"/><text x="${mx}" y="${T-8-(i%2)*12}" class="dl-mlab" text-anchor="${sx(m.at)>W-R-80?"end":"start"}" dx="${sx(m.at)>W-R-80?-4:4}">${esc(m.label)}</text>`}).join("")}
  ${paths}${lab}<line class="dl-cross" id="${id}-x" x1="0" x2="0" y1="${T}" y2="${H-B}" style="display:none"/>
  <g id="${id}-dots"></g>
</svg>
  <div class="dl-hit" id="${id}-hit" role="slider" tabindex="0" aria-label="${esc((o.title||"Chart")+": move through the years with the arrow keys")}" aria-valuemin="0" aria-valuemax="${Math.max(0,new Set(series.flatMap(s=>s.pts.map(p=>p[0]))).size-1)}" aria-valuenow="0" aria-valuetext="Not started"
   style="left:${(L/W*100).toFixed(3)}%;right:${(R/W*100).toFixed(3)}%;top:${(T/H*100).toFixed(3)}%;bottom:${(B/H*100).toFixed(3)}%"
   onmousemove="dlHover(event,'${id}')" onmouseleave="dlOut('${id}')" onfocus="dlKey(event,'${id}')" onblur="dlOut('${id}')" onkeydown="dlKey(event,'${id}')"></div>
  <div class="dl-tip" id="${id}-tip" role="status" aria-live="polite"></div></div>`}
function dlXs(c){return [...new Set(c.series.flatMap(s=>s.pts.map(p=>p[0])))].sort((a,b)=>dlX(a)-dlX(b))}
function dlShow(id,xv){const c=DLCH[id];if(!c)return;const svg=document.querySelector("#"+id+" svg"),tip=document.getElementById(id+"-tip"),ln=document.getElementById(id+"-x"),dots=document.getElementById(id+"-dots");if(!svg||!tip)return;
 const px=c.sx(xv);ln.setAttribute("x1",px);ln.setAttribute("x2",px);ln.style.display="";
 const rows=c.series.map(s=>{const p=s.pts.find(q=>q[0]===xv);return {s,p}});
 dots.innerHTML=rows.filter(r=>r.p).map(r=>`<circle cx="${px}" cy="${c.sy(r.p[1]).toFixed(1)}" r="4.5" fill="${r.s.color}" stroke="#FBF8F1" stroke-width="2"/>`).join("");
 tip.innerHTML=`<div class="dl-tip-h">${esc(String(xv))}</div>`+rows.map(r=>`<div class="dl-tip-r"><i style="background:${r.s.color}"></i><span>${esc(r.s.name)}</span><b>${r.p?dlFmt(r.p[1]):"no value"}</b></div>`).join("")+(c.unit?`<div class="dl-tip-u">${esc(c.unit)}</div>`:"");
 const hit=document.getElementById(id+"-hit"),xs=dlXs(c);if(hit){hit.setAttribute("aria-valuenow",String(Math.max(0,xs.indexOf(xv))));
  hit.setAttribute("aria-valuetext",String(xv)+": "+rows.map(r=>r.s.name+" "+(r.p?dlFmt(r.p[1]):"no value")).join(", "))}
 const box=svg.getBoundingClientRect(),k=box.width/c.W,left=px*k;tip.style.display="block";
 tip.style.left=Math.max(4,Math.min(box.width-tip.offsetWidth-4,left+12))+"px";tip.style.top="8px"}
function dlHover(e,id){const c=DLCH[id];if(!c)return;const box=e.currentTarget.getBoundingClientRect();
 const xv=c.x0+(e.clientX-box.left)/box.width*(c.x1-c.x0);const xs=dlXs(c);let b=xs[0];xs.forEach(x=>{if(Math.abs(dlX(x)-xv)<Math.abs(dlX(b)-xv))b=x});c.i=xs.indexOf(b);dlShow(id,b)}
function dlKey(e,id){const c=DLCH[id];if(!c)return;const xs=dlXs(c);if(c.i<0)c.i=xs.length-1;
 if(e.type==="keydown"){if(e.key==="ArrowLeft")c.i=Math.max(0,c.i-1);else if(e.key==="ArrowRight")c.i=Math.min(xs.length-1,c.i+1);else if(e.key==="Home")c.i=0;else if(e.key==="End")c.i=xs.length-1;else return;e.preventDefault()}
 dlShow(id,xs[c.i])}
function dlOut(id){const t=document.getElementById(id+"-tip"),l=document.getElementById(id+"-x"),d=document.getElementById(id+"-dots");if(t)t.style.display="none";if(l)l.style.display="none";if(d)d.innerHTML=""}
function dlTable(series,unit){const xs=[...new Set(series.flatMap(s=>s.pts.map(p=>p[0])))].sort((a,b)=>dlX(a)-dlX(b));
 return `<details class="dl-tbl mt3"><summary>Show the numbers</summary><div class="scrollx" tabindex="0" role="region" aria-label="The numbers behind the chart"><table class="ptbl"><thead><tr><th scope="col">Period</th>${series.map(s=>`<th scope="col">${esc(s.name)}</th>`).join("")}</tr></thead>
  <tbody>${xs.slice().reverse().map(x=>`<tr><th scope="row">${esc(String(x))}</th>${series.map(s=>{const p=s.pts.find(q=>q[0]===x);return `<td>${p?dlFmt(p[1]):"–"}</td>`}).join("")}</tr>`).join("")}</tbody></table></div>
  <p class="xs mt1">${esc(unit||"")}. A dash means the source has no value for that period.</p></details>`}
function dlLegend(series){return `<ul class="dl-legend" aria-label="Legend">${series.map(s=>`<li><i style="background:${s.color}"></i>${esc(s.name)}</li>`).join("")}</ul>`}
function dlSrc(x,retrieved){return `<p class="xs dl-src mt2"><strong>Source:</strong> ${esc(x.source)}${x.code&&x.code!=="computed"?` (${esc(x.code)})`:""}. <a href="${esc(x.url)}" target="_blank" rel="noopener">Original series</a> · <a href="${esc(x.pkg)}" target="_blank" rel="noopener">open-data package</a> (${esc(x.licence)}). Retrieved ${esc(retrieved)}.${x.note?` ${esc(x.note)}`:""}</p>`}
const DLQ={gdp:["Is a rise in GDP measured in current US dollars the same as economic growth? What else can move it: prices, or the exchange rate?","Why can GDP at market exchange rates understate output in lower-income economies, and how does a purchasing-power-parity measure change that?"],
 gdppc:["What does GDP per capita leave out as a measure of economic well-being?","Pick two economies with similar GDP per capita. What would you need to know to compare their living standards?"],
 infl:["Which years look like demand-pull episodes and which like cost-push? What other data would you need to tell them apart?","Compare a high-inflation and a low-inflation economy. Which explanations could you test: monetary policy, the exchange rate, supply shocks?"],
 pop:["How might faster population growth affect GDP per capita and the demand for public services?"],
 gini:["Why are there gaps in this series, and how do they limit comparisons over time?","Does a falling Gini index tell you whether poverty fell? What else would you look at?"],
 co2pc:["Why do emissions per person differ so much between high- and low-income economies?","These are production-based figures. How might consumption-based figures change the comparison?"],
 brent:["Which macroeconomic objective is most exposed to a sharp rise in the oil price, and through which curve on an AD/AS diagram?"],
 ust10:["Why might long-term interest rates rise when expected inflation rises?"],
 usunemp:["Which rises in unemployment look cyclical? What other data would show whether some unemployment is structural?"],
 fx:["When the line rises, the currency has depreciated against the US dollar. What would that do to import prices, inflation and the current account?"]};
function dlLoading(){return H.pageHead("Data","Economic data",`Official series with their sources, for learning Economics through evidence.`)
 +`<section class="sec"><div class="wrap"><div class="dl-state" role="status" aria-live="polite">${DLX.err
  ?`<h2>The data file could not be loaded</h2><p class="sm mt2">Check the connection and try again. Nothing on these pages is estimated, so nothing is shown without the file.</p><button class="btn sm mt3" onclick="DLX.err=false;render()">Try again</button>`
  :`<h2>Loading the data</h2><p class="sm mt2">About 230 KB, fetched once and then kept for offline use.</p>`}</div>
  <div class="dl-read mt4"><div><div class="eb">What the lab holds</div><ul class="ls-list mt2">${DLMAN.map(m=>`<li><strong>${esc(m[0])}</strong>: ${esc(m[1])}</li>`).join("")}</ul></div>
   <div><div class="eb">How to use it</div><p class="sm mt2">Pick an indicator and up to five economies, read what the numbers show, then work through the questions beside the chart. Each question points to the lesson where the economics is taught.</p></div></div></div></section>`}
/* what each page contains, so a page is useful before (or without) the data file */
const DLMAN=[["GDP and GDP per capita","World Bank, current US dollars, 25 economies, the world and four income groups"],["Inflation","World Bank consumer-price inflation, annual %"],["Population","World Bank estimates"],["Gini index","World Bank survey-based inequality index"],["CO₂ per person","CDIAC fossil-fuel and cement emissions, to 2020"],["Markets","Brent oil (EIA), US 10-year yield (Federal Reserve), US unemployment (BLS) and exchange rates against the US dollar (Federal Reserve, via FRED)"]];
function dlInd(id){const D=dlData();return D.indicators.find(i=>i.id===id)||D.indicators[0]}
function dlFacts(ind,series){return series.map(s=>{const p=s.pts;if(!p.length)return "";const a=p[0],b=p[p.length-1];
  const mx=p.reduce((m,q)=>q[1]>m[1]?q:m,p[0]),mn=p.reduce((m,q)=>q[1]<m[1]?q:m,p[0]);
  const ch=ind.kind==="level"&&a[1]>0?`${b[1]>=a[1]?"+":""}${dlFmt((b[1]/a[1]-1)*100)}% since ${a[0]}`:`${b[1]>=a[1]?"+":""}${dlFmt(b[1]-a[1])} ${ind.kind==="rate"?"percentage points":"points"} since ${a[0]}`;
  return `<li><i style="background:${s.color}"></i><strong>${esc(s.name)}</strong>: ${dlFmt(b[1])} in ${b[0]} (${ch}). Highest ${dlFmt(mx[1])} in ${mx[0]}; lowest ${dlFmt(mn[1])} in ${mn[0]}.</li>`}).join("")}

function dataExplorer(){const D=dlData();if(!D)return dlLoading();const d=dlS(),ind=dlInd(d.ind);
 const years=[...new Set(Object.values(ind.data).flatMap(r=>r.map(p=>p[0])))].sort((a,b)=>a-b);const y0=Math.max(d.y0,years[0]),y1=d.y1&&d.y1<=years[years.length-1]?d.y1:years[years.length-1];
 const ents=d.ents.filter(c=>ind.data[c]);const missing=d.ents.filter(c=>!ind.data[c]);
 const series=ents.map(c=>({name:dlEnt(c).name,short:dlEnt(c).name.split(/[ ,]/)[0],color:DLPAL[d.slots[c]||0],pts:ind.data[c].filter(p=>p[0]>=y0&&p[0]<=y1)})).filter(s=>s.pts.length);
 const opts=D.meta.entities.filter(e=>!d.ents.includes(e.code)&&ind.data[e.code]);
 return H.pageHead("Data","Data explorer",`Compare official series across economies and years. Every line names its source; nothing is estimated or filled in.`)
 +`<section class="sec"><div class="wrap"><div class="dl-filters" role="group" aria-label="Chart controls">
  <label>Indicator<select id="dl-ind" onchange="dlS().ind=this.value;save();render()">${D.indicators.map(i=>`<option value="${i.id}" ${i.id===ind.id?"selected":""}>${esc(i.name)}</option>`).join("")}</select></label>
  <label>Add an economy<select id="dl-add" ${d.ents.length>=5?"disabled":""} onchange="if(this.value){const d=dlS();d.ents.push(this.value);d.slots[this.value]=dlFreeSlot(d);save();render()}"><option value="">${d.ents.length>=5?"Five is the maximum":"Choose…"}</option>${opts.map(e=>`<option value="${e.code}">${esc(e.name)}</option>`).join("")}</select></label>
  <label>From<select onchange="dlS().y0=+this.value;save();render()">${years.filter(y=>y<y1).map(y=>`<option ${y===y0?"selected":""}>${y}</option>`).join("")}</select></label>
  <label>To<select onchange="dlS().y1=+this.value;save();render()">${years.filter(y=>y>y0).map(y=>`<option ${y===y1?"selected":""}>${y}</option>`).join("")}</select></label></div>
  <div class="dl-chips mt2" aria-label="Economies shown">${d.ents.map(c=>`<span class="dl-chip"><i style="background:${DLPAL[d.slots[c]||0]}"></i>${esc(dlEnt(c).name)}<button aria-label="Remove ${esc(dlEnt(c).name)}" onclick="const d=dlS();d.ents=d.ents.filter(x=>x!=='${c}');delete d.slots['${c}'];save();render()">×</button></span>`).join("")}</div>
  <div class="dl-card mt3"><div class="dl-head"><h2 class="dl-t">${esc(ind.name)}</h2><span class="xs">${esc(ind.unit)}, ${y0}–${y1}</span></div>
   ${series.length?dlChart("dl-main",series,{unit:ind.unit,title:ind.name,zero:ind.kind!=="index"})+dlLegend(series)+dlTable(series,ind.unit):`<p class="sm mt3">Choose at least one economy that has values for this indicator.</p>`}
   ${missing.length?`<p class="xs mt2">No values in this source for ${missing.map(c=>esc(dlEnt(c).name)).join(", ")}.</p>`:""}
   ${dlSrc(ind,D.meta.retrieved)}</div>
  <div class="dl-read mt4"><div><div class="eb">What the numbers show</div><ul class="dl-facts mt2">${dlFacts(ind,series)}</ul><p class="xs mt2">Computed from the values on the chart, nothing more.</p></div>
   <div><div class="eb">Questions an economist would ask</div><ul class="ls-list mt2">${(DLQ[ind.id]||[]).map(q=>`<li>${esc(q)}</li>`).join("")}</ul>
    <div class="row mt3" style="gap:6px;flex-wrap:wrap">${(ind.subs||[]).map(c=>typeof lsGoSub==="function"&&typeof SUBMAP!=="undefined"&&SUBMAP[c]?`<button class="kcchip" onclick="${lsGoSub(c)}">${esc(c)} ${esc(SUBMAP[c].title)}</button>`:"").join("")}${(ind.kc||[]).map(k=>`<span class="kcchip">${esc(k)}</span>`).join("")}</div></div></div>
 </div></section>`}

function dlCaseMatch(name){const al={"United States":["United States","USA","US"],"United Kingdom":["United Kingdom","UK"],"Korea, Rep.":["South Korea","Korea"],"Russian Federation":["Russia"],"Viet Nam":["Vietnam","Viet Nam"],"Türkiye":["Turkey","Türkiye"],"Egypt":["Egypt"]}[name]||[name];
 return (typeof RW_CASES!=="undefined"?RW_CASES:[]).filter(c=>al.some(a=>String(c.c||"").split(/[,;/]| and /).map(x=>x.trim()).includes(a)))}
function dataAtlas(){const D=dlData();if(!D)return dlLoading();const d=dlS(),code=d.atlas,e=dlEnt(code),ref=code==="WLD"?null:"WLD";
 const cards=D.indicators.filter(i=>i.data[code]).map(i=>{const p=i.data[code],b=p[p.length-1],w=ref&&i.data[ref]?i.data[ref]:null,wb=w?w.find(q=>q[0]===b[0]):null;
  const ser=[{name:e.name,color:DLPAL[0],pts:p.filter(q=>q[0]>=2000)}].concat(w?[{name:"World",color:"#8A8F96",pts:w.filter(q=>q[0]>=2000)}]:[]);
  return `<article class="dl-card dl-mini"><div class="eb">${esc(i.name)}</div><div class="dl-big mt1">${dlFmt(b[1])}<span class="xs"> ${esc(i.unit)} · ${b[0]}</span></div>
   ${wb?`<p class="xs">World: ${dlFmt(wb[1])} in ${wb[0]}</p>`:""}${dlChart("dl-a-"+i.id,ser,{unit:i.unit,title:i.name+", "+e.name,h:170,w:340,labels:false,zero:i.kind!=="index"})}
   ${w?`<ul class="dl-legend sm1"><li><i style="background:${DLPAL[0]}"></i>${esc(e.name)}</li><li><i style="background:#8A8F96"></i>World</li></ul>`:""}
   <p class="xs mt1">${esc(i.source)}. <button class="lnk" onclick="const d=dlS();d.ind='${i.id}';if(!d.ents.includes('${code}')){d.ents=['${code}'].concat(d.ents).slice(0,5);d.slots['${code}']=dlFreeSlot(d)}save();nav('data',0)">Compare in the explorer →</button></p></article>`}).join("");
 const cases=dlCaseMatch(e.name);
 return H.pageHead("Data","Country profiles",`One economy, every indicator in this collection, with the world for reference. Read the figures, then ask what explains them.`)
 +`<section class="sec"><div class="wrap"><div class="dl-filters"><label>Economy<select onchange="dlS().atlas=this.value;save();render()">${D.meta.entities.map(x=>`<option value="${x.code}" ${x.code===code?"selected":""}>${esc(x.name)}</option>`).join("")}</select></label></div>
  <h2 class="mt4">${esc(e.name)}</h2><div class="dl-cards mt3">${cards}</div>
  <div class="dl-read mt4"><div><div class="eb">Interpreting a profile</div><ul class="ls-list mt2"><li>Every figure is the latest year the source has for this economy; the years differ between indicators.</li>
   <li>GDP and GDP per capita are in current US dollars, so they move with exchange rates as well as output.</li><li>A single indicator rarely explains itself. Compare inflation with the exchange-rate page, and GDP per capita with the Gini index, before drawing a conclusion.</li></ul></div>
   <div><div class="eb">${esc(e.name)} on this platform</div>${cases.length?`<ul class="ls-list mt2">${cases.slice(0,8).map(c=>`<li><button class="lnk" onclick="rwOpen('${c.id}')">${esc(c.t)}</button> <span class="xs">${esc(String(c.y||""))}</span></li>`).join("")}</ul>`:`<p class="sm mt2">No Real World case is filed under this economy yet.</p>`}</div></div>
 </div></section>`}

function dataMarkets(){const D=dlData();if(!D)return dlLoading();const d=dlS(),fx=D.fx.find(f=>f.name===d.fx)||D.fx[0];
 const one=(s,o)=>`<article class="dl-card"><div class="dl-head"><h2 class="dl-t">${esc(s.name)}</h2><span class="xs">${esc(s.unit)}</span></div>
  ${dlChart("dl-m-"+s.id,[{name:s.name,color:DLPAL[0],pts:s.data}],Object.assign({unit:s.unit,title:s.name,labels:false},o||{}))}${dlTable([{name:s.name,pts:s.data}],s.unit)}${dlSrc(s,D.meta.retrieved)}
  <ul class="ls-list mt2">${(DLQ[s.id]||[]).map(q=>`<li>${esc(q)}</li>`).join("")}</ul></article>`;
 const f=D.meta.fxSource;
 return H.pageHead("Data","Markets and prices",`Prices that move economies: oil, long-term interest rates, exchange rates and unemployment, each from the institution that publishes it.`)
 +`<section class="sec"><div class="wrap dl-stack">${D.single.map(s=>one(s,{monthly:s.freq==="monthly"})).join("")}
  <article class="dl-card"><div class="dl-head"><h2 class="dl-t">Exchange rate against the US dollar</h2><label class="xs">Currency <select onchange="dlS().fx=this.value;save();render()">${D.fx.map(x=>`<option ${x.name===fx.name?"selected":""}>${esc(x.name)}</option>`).join("")}</select></label></div>
   ${dlChart("dl-m-fx",[{name:fx.name,color:DLPAL[0],pts:fx.data}],{unit:fx.unit,title:"Exchange rate, "+fx.name,monthly:true,labels:false,zero:false})}${dlTable([{name:fx.name,pts:fx.data}],fx.unit)}
   ${dlSrc({source:f.source,code:"",url:f.url,pkg:f.pkg,licence:f.licence,note:f.note},D.meta.retrieved)}<ul class="ls-list mt2">${DLQ.fx.map(q=>`<li>${esc(q)}</li>`).join("")}</ul></article>
 </div></section>`}

function dataSources(){const D=dlData();if(!D)return dlLoading();const rows=D.indicators.map(i=>({n:i.name,u:i.unit,s:i.source,c:i.code,url:i.url,pkg:i.pkg,l:i.licence,cov:`${i.span[0]}–${i.span[1]}, ${Object.keys(i.data).length} economies`,note:i.note}))
  .concat(D.single.map(s=>({n:s.name,u:s.unit,s:s.source,c:s.code,url:s.url,pkg:s.pkg,l:s.licence,cov:`${s.data[0][0]}–${s.data[s.data.length-1][0]}`,note:s.note})))
  .concat([{n:"Exchange rates against the US dollar",u:"local currency per US$, monthly",s:D.meta.fxSource.source,c:"",url:D.meta.fxSource.url,pkg:D.meta.fxSource.pkg,l:D.meta.fxSource.licence,cov:`${D.fx.length} currencies, 2000 to ${D.fx[0].data[D.fx[0].data.length-1][0]}`,note:D.meta.fxSource.note}]);
 return H.pageHead("Data","Sources and method",`Where every number on the data pages comes from, what was done to it, and what it cannot tell you.`)
 +`<section class="sec"><div class="wrap"><div class="dl-read"><div><div class="eb">Method</div><p class="sm mt2">${esc(D.meta.method)}</p>
   <p class="sm mt2">The series come from open-data packages that republish the original institutions' data, each with its licence. They were retrieved on ${esc(D.meta.retrieved)}. Data version <code>${esc(D.meta.version)}</code>, content hash <code>${esc(D.meta.hash)}</code>.</p></div>
   <div><div class="eb">What these pages do not do</div><ul class="ls-list mt2"><li>They do not update live: each figure is as published when retrieved, and sources revise their data.</li><li>They do not forecast, and they do not explain a movement for you: the questions beside each chart are for you to investigate.</li><li>Recent years can be provisional, and some economies have gaps.</li></ul></div></div>
  <div class="scrollx mt4" tabindex="0" role="region" aria-label="Every series and its source"><table class="ptbl"><thead><tr><th scope="col">Series</th><th scope="col">Unit</th><th scope="col">Source</th><th scope="col">Coverage</th><th scope="col">Notes</th></tr></thead>
  <tbody>${rows.map(r=>`<tr><th scope="row">${esc(r.n)}</th><td>${esc(r.u)}</td><td>${esc(r.s)}${r.c&&r.c!=="computed"?` <code>${esc(r.c)}</code>`:""}<br><a href="${esc(r.url)}" target="_blank" rel="noopener">original</a> · <a href="${esc(r.pkg)}" target="_blank" rel="noopener">package</a> · ${esc(r.l)}</td><td>${esc(r.cov)}</td><td class="xs">${esc(r.note||"")}</td></tr>`).join("")}</tbody></table></div>
 </div></section>`}

SECTIONS.push({v:"data",n:"Economic data",hide:1,tabs:["Data explorer","Country profiles","Markets and prices","Sources and method"]});
VIEWS.data=()=>[dataExplorer,dataAtlas,dataMarkets,dataSources][TAB]?.()||dataExplorer();
