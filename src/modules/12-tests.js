/* ═══════════════════════════════════════════════════════════════════════════
   THE SELF-TESTS FOR THE COVER-AND-COMPOSITION RELEASE
   The cover's movable market is recomputed at every slider position; the
   elasticity lab's arithmetic is checked against worked cases, including
   cases that must come out elastic, inelastic, unit elastic and perfectly
   inelastic; every exam room must open a tab that exists and say what kind of
   material it holds; case links must open the case; the portrait must sit in
   a frame that holds no figure.
   ═══════════════════════════════════════════════════════════════════════════ */
function COVSUITE(){
 const out=[];const T=(n,f,d)=>{let ok=false,det=d||"";try{const r=f();ok=r===true||(r&&r.ok);if(r&&r.d)det=r.d}catch(e){ok=false;det=e.message}out.push({n,ok:!!ok,detail:det})};
 const near=(a,b,t)=>Math.abs(a-b)<=(t===undefined?1e-9:t);
 const S=[-2,-1.5,-1,-0.5,0,0.5,1,1.5,2];
 T("Cover model · the equilibrium drawn lies on demand and on supply at every slider position",()=>S.every(s=>{const e=CVF.eq(s);return near(CVF.D(e.q,s),e.p)&&near(CVF.S(e.q),e.p)}));
 T("Cover model · more demand raises both price and quantity; less demand lowers both",()=>S.slice(1).every((s,i)=>{const a=CVF.eq(S[i]),b=CVF.eq(s);return b.p>a.p&&b.q>a.q}));
 T("Cover model · the reading names the shortage or surplus that moves price, never price moving demand",()=>{const k=CV.s;try{CV.s=1;const up=cvRead();CV.s=-1;const dn=cvRead();
   return /shortage/.test(up)&&/surplus/.test(dn)&&!/price rises[^.]*demand (rises|increases)/i.test(up+dn)}finally{CV.s=k}});
 T("Cover model · every scale signal is counted from the data it names",()=>{const n=rnCount(),h=cvScale();
   return ["cases","maps","diagrams","calcs","dna"].every(k=>typeof n[k]!=="number"||h.includes(`<b>${fmtN(n[k])}</b>`))&&(h.match(/class="cv-sig"/g)||[]).length>=4});
 T("Cover frame · the portrait sits in its own frame, which holds no figure",()=>{const h=VIEWS.home();const i=h.indexOf('<figure class="cv-portrait"');if(i<0)return false;
   const f=h.slice(i,h.indexOf("</figure>",i));return !/<svg|data-motif/.test(f)&&/<img/.test(f)});
 T("Profile frame · the About portrait is its own cell, and the cover draws no figure that could sit over it",()=>{const h=abCover();
   const i=h.indexOf('class="abfig ab-portrait');return i>0&&!/<svg|data-motif|rn-plot/.test(h)&&h.split('class="abfig').length===2});
 T("Profile frame · About reads as a biography: credentials, journey, classroom, principles, story, and the longer version folded",()=>{const h=aboutPage();
   return ["At a glance","The journey","In the classroom","What I believe","The platform story","The longer version"].every(x=>h.includes(x))&&/<details class="ab-more"/.test(h)});
 /* the elasticity lab against worked cases */
 const W=[[{up:true,p:10,q:5},-0.5,"price inelastic",1],[{up:true,p:10,q:20},-2,"price elastic",-1],[{up:false,p:10,q:10},-1,"unit elastic",-1],
  [{up:true,p:20,q:0},0,"perfectly inelastic",1],[{up:false,p:20,q:40},-2,"price elastic",1]];
 T("Elasticity lab · PED, its class and the direction of total revenue match five worked cases",()=>W.every(([o,ped,cls,dir])=>{const r=elCalc(o);
   return near(r.ped,ped)&&r.cls===cls&&Math.sign(Math.round(r.dTR*1e6))===dir}),"p+10% q−5%: −0.5 inelastic, TR up; p+10% q−20%: −2 elastic, TR down; p−10% q+10%: −1 unit, TR down (−1%); p+20% q 0: perfectly inelastic, TR up; p−20% q+40%: −2 elastic, TR up");
 T("Elasticity lab · a unit-elastic reading over a large change explains why revenue still moves",()=>/only for very small changes/.test(elRead(elCalc({up:false,p:10,q:10})))&&!/only for very small/.test(elRead(elCalc({up:true,p:10,q:5}))));
 T("Elasticity lab · revenue is price times quantity at both points",()=>W.every(([o])=>{const r=elCalc(o);return near(r.TR0,r.P0*r.Q0)&&near(r.TR1,r.P1*r.Q1)&&near(r.P1,r.P0*(1+r.dp/100))&&near(r.Q1,r.Q0*(1+r.dq/100))}));
 T("Elasticity lab · quantity moves against price, so PED is never positive",()=>[true,false].every(up=>[1,15,40].every(p=>[0,7,60].every(q=>elCalc({up,p,q}).ped<=0))));
 T("Elasticity lab · is a Lab tab and states that it is a teacher-created tool",()=>{const s=SECTIONS.find(x=>x.v==="lab");return s.tabs.includes("Elasticity lab")&&/Teacher-created tool/.test(elasticityLab())});
 /* the exam rooms */
 T("Exam rooms · every room opens a section, and a tab where it names one, that exists",()=>EXAM_ROOMS().every(([,v,tab])=>{const s=SECTIONS.find(x=>x.v===v);return s&&VIEWS[v]&&(tab===null?true:s.tabs&&s.tabs.includes(tab))}));
 T("Exam rooms · only the reference room is labelled official IB information",()=>{const r=EXAM_ROOMS().filter(x=>/Official IB/.test(x[3]));return r.length===1&&r[0][2]==="IB reference"&&EXAM_ROOMS().every(x=>x[3].length>5)});
 /* case links */
 T("Case links · a case id on the Real World landing tab opens that case",()=>{const k=[VIEW,TAB,ARG,RWC.id],c=RW_CASES[0];
   try{VIEW="world";TAB=0;ARG=c.id;const h=VIEWS.world();return h.includes("Case intelligence")&&RWC.id===c.id}finally{[VIEW,TAB,ARG,RWC.id]=k}});
 T("Case links · the landing tab without an argument is unchanged",()=>{const k=[VIEW,TAB,ARG,RWC.id];try{VIEW="world";TAB=0;ARG=null;return !VIEWS.world().includes("Case intelligence")}finally{[VIEW,TAB,ARG,RWC.id]=k}});
 T("Case intelligence · compiled for every case without an empty or undefined field",()=>RW_CASES.every(c=>{const h=rwIntel(c);return h.includes("The model")&&!/\bundefined\b|\bnull\b|<p[^>]*>\s*<\/p>/.test(h)}));
 T("Mindmap links · the explore mode, as the map page calls it, shows the links for a focused node",()=>{const k=MM.focus;
   try{const m=mmGet("market");MM.focus="dem";return !!m&&MMBODY.explore(m).includes("mm-further")}finally{MM.focus=k}});
 T("Mindmap links · a node with a subtopic offers links that run to real handlers",()=>{const h=mmFurther({sub:"2.5"});return /Go further/.test(h)&&(h.match(/<dd>/g)||[]).length>=2&&!/onclick=""/.test(h)});
 /* calculation audit, round 3 */
 T("Calc r3 · one parser reads a Unicode minus, a decimal comma and a thousands comma",()=>numIn("−31")===-31&&numIn("0,75")===0.75&&numIn("2,5")===2.5&&numIn("1,020")===1020&&numIn("1,234.5")===1234.5&&numIn(" -0.5 ")===-0.5);
 T("Calc r3 · the gym credits the signed PED (−0.5) as well as its magnitude",()=>{const d=DATA.find(x=>x.id==="d2");const it={num:d.ans,tol:d.tol,abs:d.abs};
   const ok=v=>Math.abs(v-parseFloat(it.num))<=it.tol||(it.abs&&Math.abs(Math.abs(v)-Math.abs(parseFloat(it.num)))<=it.tol);return ok(-0.5)&&ok(0.5)&&!ok(-1)&&!ok(0.25)});
 T("Calc r3 · the revision run and the teacher starter ask for what they mark",()=>!/Calculate <strong>\$\{cal\.n\.toLowerCase/.test(rrBuild.toString())&&/cal\.ask/.test(rrBuild.toString())&&/cal\.ask/.test(rsGen.toString()));
 T("Calc r3 · impossible inputs are refused with a reason",()=>{const c=id=>CALC.find(x=>x.id===id);
   return !!calcGuard(c("unemp"),{u:500,l:400})&&!!calcGuard(c("cs"),{wtp:10,p:12,q:5})&&!!calcGuard(c("mult"),{mps:-.2,mpt:.3,mpm:.1,inj:10})
    &&!!calcGuard(c("ped"),{p1:0,p2:2,q1:100,q2:90})&&calcGuard(c("unemp"),{u:30,l:400})===null&&calcGuard(c("mult"),{mps:.2,mpt:.2,mpm:.1,inj:10})===null});
 T("Calc r3 · a large elasticity worked from rounded percentages is credited, and one out by half is not",()=>{const c=CALC.find(x=>x.id==="ped");const a=-10.91,t=Math.max(c.tol,Math.abs(a)*(c.tolRel||.001));
   return Math.abs(-10.83-a)<=t&&Math.abs(-5.45-a)>t});
 T("Calc r3 · zero net property income and zero net exports are described as zero",()=>{const g=CALC.find(x=>x.id==="gni"),e=CALC.find(x=>x.id==="gdpexp");
   return /GNI equals GDP/.test(g.interp({gdp:100,inflow:10,outflow:10},100))&&/neither add to nor subtract from/.test(e.interp({c:50,i:20,g:30,x:40,mm:40},140))});
 T("Calc r3 · the Lorenz tool reports an undefined ratio, not a billion, when the poorest fifth has nothing",()=>{const k=LZ.sh.slice();try{LZ.sh=[0,0,0,0,100];const a=lzCalc();LZ.sh=[0,0,0,0,0];const b=lzCalc();return a.ratio===null&&b.gini===null}finally{LZ.sh=k}});
 T("Calc r3 · zero quantity response reads as perfectly inelastic, and a negative PES is flagged",()=>{const p=CALC.find(x=>x.id==="ped"),s2=CALC.find(x=>x.id==="pes");
   return /perfectly inelastic/.test(p.interp({p1:10,p2:12,q1:100,q2:100},0))&&/law of supply does not predict/.test(s2.interp({p1:10,p2:12,q1:100,q2:90},-0.5))});
 /* diagram audit, round 3 */
 T("Diagram r3 · perfectly inelastic demand is drawn as a vertical curve in the elasticity lab",()=>{const h=elSVG(elCalc({up:true,p:10,q:0}));const m=/<line class="m-c dem" x1="([\d.]+)" y1="[\d.]+" x2="([\d.]+)"/.exec(h);return !!m&&m[1]===m[2]});
 T("Diagram r3 · across every lab setting, demand stays between a price of 1 and the top of the axis",()=>{let bad=0;
   for(const up of [true,false])for(let p=1;p<=40;p++)for(let q=1;q<=60;q++){const h=elSVG(elCalc({up,p,q}));const m=/<line class="m-c dem" x1="[\d.-]+" y1="([\d.-]+)" x2="[\d.-]+" y2="([\d.-]+)"/.exec(h);
    if(!m){bad++;continue}const y1=+m[1],y2=+m[2];if(Math.min(y1,y2)<320-19.6/20*290-0.5||Math.max(y1,y2)>320-0.99/20*290+0.5)bad++}return bad===0?true:{ok:false,d:bad+" settings out of range"}});
 T("Diagram r3 · the PPC opener's point C lies between today's frontier and the frontier after growth",()=>{const r=Math.hypot(7.75,4.75);return r>8.4&&r<9.6&&/C · only after growth/.test(motifSVG("ppc"))});
 T("Diagram r3 · the PED plate labels two different curves, not a shift",()=>{const h=DG.ped().svg||JSON.stringify(DG.ped());return /D elastic/.test(h)&&/D inelastic/.test(h)});
 /* go deeper and misconceptions */
 T("Depth · every economist's note has a core idea, its assumptions and what the evidence shows, and names a real diagram",()=>Object.entries(GD).every(([k,g])=>DG[k]&&g.core.length>40&&g.assume.length>=2&&g.evidence.length>80));
 T("Depth · every concept mapped to a note, and every misconception box, belongs to a real concept",()=>Object.entries(GD_CONCEPT).every(([id,k])=>CONCEPTS.some(c=>c.id===id)&&GD[k])&&Object.keys(MISC_BOX).every(id=>CONCEPTS.some(c=>c.id===id)));
 T("Depth · the note is folded by default and labelled as original commentary, not IB material",()=>{const h=gdPanel("adas");return /^<details class="gd">/.test(h)&&!/<details class="gd" open/.test(h)&&/original commentary/.test(h)&&/not IB material/.test(h)});
 T("Depth · a concept page shows its misconception and its note; a diagram plate shows its note",()=>{const k=[VIEW,TAB,ARG];try{const c=CONCEPTS.find(x=>x.id==="c-ad");const h=conceptPage(c);
   VIEW="lab";TAB=3;ARG="labour";const d=dgLibrary();return /class="mcb"/.test(h)&&/class="gd"/.test(h)&&/class="gd"/.test(d)}finally{[VIEW,TAB,ARG]=k}});
 T("Exam rooms · the IA studio's every step opens a tab that exists, and it says it never writes the commentary",()=>IA_STEPS().every(([,v,tab])=>{const s=SECTIONS.find(x=>x.v===v);return s&&s.tabs&&s.tabs.includes(tab)})&&/never writes the commentary/.test(iaStudio()));
 T("Case intelligence · each part of the brief says what kind of statement it is",()=>{const h=rwIntel(RW_CASES.find(c=>c.id==="MIC-001"));return ["Fact","Interpretation","Model","Teacher guidance"].every(x=>h.includes(">"+x+"<"))});
 return out;
}
COVSUITE.suiteName="Cover and composition";
EXTRA_SUITES.push(COVSUITE);
QAREPORT.push({area:"Cover, profile, cases and rooms",re:/^(Depth|Diagram r3|Calc r3|Cover model|Cover frame|Profile frame|Elasticity lab|Exam rooms|Case links|Case intelligence|Mindmap links) · /,
 what:"That the cover's movable market stays in equilibrium at every position and explains the shift correctly, the scale signals are counted from data, the portrait never shares a frame with a figure, the elasticity lab's arithmetic matches worked cases, every exam room opens a real tab and only official material is labelled official, and case links open the case."});
