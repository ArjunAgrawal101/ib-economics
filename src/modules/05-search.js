/* ═══════════════════════════════════════════════════════════════════════════
   RENAISSANCE · 5 · search that ranks like a reader expects
   Matching was by substring, so "ped" found "developed" before price
   elasticity of demand. A term now scores most where it begins a word in the
   title, less inside a word, and the canonical records (concepts,
   definitions, diagrams, calculations) lead over fragments such as a single
   mindmap node. Every existing record, filter and label is unchanged.
   ═══════════════════════════════════════════════════════════════════════════ */
const RN_KIND_W={"Concept":3,"Definition":2.5,"Dictionary":2,"Diagram":2,"Calculation":2,"Real world":1.6,"Case study":1.4,"Policy":1.4,
 "Everywhere · question":1.4,"Everywhere · one idea":1.4,"Mindmap":1.4,"Model epistemology":0.5,"Economics in 60 Seconds":1.2,"Video":1,
 "Question":1,"Misconception":1.2,"Chain":1,"Section":1.5,"Mindmap node":0.2,"Knowledge question":0.2};
/* abbreviations students type, matched to the spelled-out titles they abbreviate */
const RN_ACR={ped:"price elasticity of demand",pes:"price elasticity of supply",yed:"income elasticity of demand",xed:"cross-price elasticity",
 gdp:"gross domestic product",gni:"gross national income",ppc:"production possibility",ppf:"production possibility",lras:"long-run aggregate supply",
 sras:"short-run aggregate supply",ad:"aggregate demand",as:"aggregate supply",mpc:"marginal propensity to consume",cpi:"consumer price index",
 hdi:"human development index",bop:"balance of payments",fdi:"foreign direct investment",msb:"marginal social benefit",msc:"marginal social cost",
 mr:"marginal revenue",mc:"marginal cost",ac:"average cost",nru:"natural rate of unemployment",tok:"theory of knowledge",ee:"extended essay",ia:"internal assessment"};
const rnEsc=t=>t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
/* patterns are compiled once per query, not once per record */
const RN_PAT={q:null,w:null,acr:null};
function rnPat(terms,q){if(RN_PAT.q!==q){RN_PAT.q=q;RN_PAT.w=terms.map(t=>new RegExp("(^|[^a-z0-9])"+rnEsc(t)));RN_PAT.acr=new RegExp("\\("+rnEsc(q)+"\\)")}return RN_PAT}
function rnRank(x,terms,q){
 const P=rnPat(terms,q),T=(x.t||"").toLowerCase(),B=String(x.s||x.d||"").toLowerCase();let sc=0,hit=0;
 for(let i=0;i<terms.length;i++){const t=terms[i],w=P.w[i];
  const ts=T.includes(t),bs=B.includes(t);if(!ts&&!bs)continue;
  const tw=ts&&w.test(T),tb=bs&&w.test(B);
  if(tw)sc+=8;else if(ts)sc+=2;
  if(tb)sc+=2;else if(bs)sc+=.4;
  if(tw||tb||(t.length>3&&(ts||bs)))hit++}
 const A=RN_ACR[q],aT=A&&T.includes(A),aB=A&&!aT&&B.includes(A);
 if(hit<terms.length&&!(aT||aB))return -1;
 if(T===q)sc+=12;else if(T.startsWith(q))sc+=5;
 if(T.includes("("+q+")"))sc+=6;   /* an acronym in brackets: "(PED)" */
 if(aT)sc+=16;else if(aB)sc+=3;
 return sc*(1+.18*(RN_KIND_W[x.k]!==undefined?RN_KIND_W[x.k]:1))}
cpScore=function(list,terms,tw,sw){const q=terms.join(" ");
 return list.map(x=>({...x,sc:rnRank(x,terms,q)})).filter(x=>x.sc>0).sort((a,b)=>b.sc-a.sc)};
(function(){
 const prev=cpMatch;
 cpMatch=function(q){
  const g=(typeof CPGROUPS!=="undefined")&&CPGROUPS.find(x=>x[0]===CP.f);
  if(g&&g[0]!=="all")return prev.apply(this,arguments);
  const qq=String(q||"").trim().toLowerCase();if(!qq)return prev.apply(this,arguments);
  const terms=qq.split(/\s+/);
  const acts=cpActions().map(a=>({...a,sc:rnRank({t:a.t,s:a.s,k:"Section"},terms,qq)})).filter(a=>a.sc>0).sort((a,b)=>b.sc-a.sc).slice(0,6);
  const content=buildIndex().map(x=>({k:x.k,t:x.t,d:x.d,run:x.go,sc:rnRank(x,terms,qq)})).filter(x=>x.sc>0).sort((a,b)=>b.sc-a.sc).slice(0,14);
  /* a strong content match leads; the sections follow unless they match better */
  return acts.concat(content).sort((a,b)=>b.sc-a.sc)}
})();
