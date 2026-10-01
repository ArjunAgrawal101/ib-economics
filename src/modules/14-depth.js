/* ═══════════════════════════════════════════════════════════════════════════
   GO DEEPER · the economist's note, and misconceptions put right
   The core of every page stays as it is. Beneath it, folded shut, an optional
   note goes past the syllabus: what the model has to assume, what the
   evidence says, how the thing is measured, and where economists disagree.
   The notes are original commentary written for this platform. Where a study
   is named it is a well-known published one, cited so a reader can find it;
   no figure is quoted that the note cannot attribute, and nothing here is IB
   material or examiner guidance.
   A misconception box pairs a common wrong idea with the correct one, on the
   concept pages where the confusion actually costs marks.
   ═══════════════════════════════════════════════════════════════════════════ */
const GD={
 ds:{t:"Supply and demand",core:"A competitive market settles where the quantity buyers want equals the quantity sellers offer, and price is the signal that gets it there.",
  assume:["Many buyers and sellers, none able to move the price","A single, standard good and good information about it","Other things held equal while one thing changes","Time for the market to adjust"],
  evidence:"Where those conditions roughly hold (wholesale commodities, many financial markets) prices do respond quickly to shifts. Where they do not, adjustment is slow: housing and labour markets can carry shortages or surpluses for years, because supply takes time to build and wages and rents are renegotiated only occasionally.",
  compete:"Search and matching models explain why unemployment and vacancies coexist; behavioural economics explains why some prices are sticky (fairness norms, menu costs). Both refine rather than replace the model."},
 tax:{t:"An indirect tax",core:"The side of the market that is less able to walk away carries more of the tax, whoever legally pays it.",
  assume:["A competitive market with linear curves","The tax is passed through in full and collected costlessly","No external cost, so the lost trades were worth making"],
  evidence:"Studies of excise and sales taxes generally find pass-through to consumer prices that is high but varies with market structure; in concentrated markets it can exceed 100%. Where the taxed good carries an external cost (tobacco, alcohol, fuel), the \"welfare loss\" triangle may overstate the loss, or be a gain, because some of the trades it removes were doing harm.",
  measure:"Incidence is observed, not assumed: compare the price paid and the price received before and after the tax, holding other changes constant.",
  compete:"Optimal tax theory (Ramsey) favours taxing inelastic goods to raise revenue with little distortion, which sits uneasily with equity, since necessities are often inelastic."},
 negprod:{t:"A negative production externality",core:"When a cost falls on people outside the transaction, the market produces more than is socially efficient.",
  assume:["The external cost can be measured in money","It is known at each level of output","Those harmed have no way to bargain with the producer"],
  evidence:"Valuing the harm is the hard part. Estimates of the social cost of carbon, for example, vary several-fold depending on the discount rate chosen and how damages are modelled, so the \"correct\" Pigouvian tax is a range rather than a number.",
  compete:"Coase argued that with clear property rights and low bargaining costs the parties could reach the efficient outcome without a tax; the argument explains why it rarely happens, since pollution usually affects many people who cannot bargain. Cap-and-trade and taxes reach the same outcome under certainty but differ when costs or damages are uncertain (Weitzman, 1974)."},
 ceiling:{t:"A maximum price",core:"Set below equilibrium, a ceiling creates a shortage; something other than price then decides who gets the good.",
  assume:["A competitive market","Quality stays fixed","The ceiling is enforced"],
  evidence:"Rent control is the most studied case. Tenants in controlled units gain, but landlords respond over time by converting, selling or under-maintaining units; a study of San Francisco's 1994 expansion (Diamond, McQuade and Qian, 2019) found that affected landlords reduced rental supply, which pushed up rents elsewhere in the city.",
  compete:"Supporters argue that stability for sitting tenants has a value the diagram leaves out, and that second-generation controls (with exemptions for new building) reduce the supply response."},
 labour:{t:"The labour market and a minimum wage",core:"In a competitive labour market a minimum wage set above equilibrium creates unemployment.",
  assume:["Many employers competing for workers, so no firm sets the wage","Workers are paid their marginal revenue product","Employment adjusts in heads, not hours or effort"],
  evidence:"The prediction is contested empirically. Card and Krueger (1994) compared fast-food employment in New Jersey and Pennsylvania around a New Jersey increase and found no fall in employment. Later work is mixed; a large study of US state increases (Cengiz, Dube, Lindner and Zipperer, 2019) found the number of low-wage jobs little changed for moderate increases. Effects appear larger when the minimum is high relative to the typical wage.",
  compete:"Monopsony offers one explanation: where an employer has wage-setting power, it pays below the competitive wage and hires fewer workers, so a well-set minimum can raise both pay and employment. Efficiency-wage and search models add further reasons."},
 monopoly:{t:"Monopoly",core:"A single seller restricts output and prices above marginal cost, which leaves trades that would benefit both sides unmade.",
  assume:["One seller and high barriers to entry","The same cost curves as a competitive industry would have","Profit maximisation"],
  evidence:"Where there are large economies of scale a single firm may produce at lower cost than many small ones (a natural monopoly), so the comparison with competition is not like for like. Platforms with network effects (search, social media) tend toward one dominant firm for the same reason.",
  compete:"Schumpeter argued that the prospect of monopoly profit drives innovation; contestable-market theory (Baumol) argues the threat of entry can discipline a monopolist even without competitors. Both explain why competition authorities judge conduct, not size alone."},
 adas:{t:"AD–AS",core:"The price level and real output are set where aggregate demand meets aggregate supply; shifts in either move both.",
  assume:["Output and prices can be aggregated into single numbers","Potential output is known","Shocks can be separated into demand and supply"],
  evidence:"Real episodes mix both. For the 2021–23 inflation in the United States, Bernanke and Blanchard (2023) found that supply shocks and energy prices explained most of the initial surge, while a tight labour market mattered more for its persistence. Potential output is not observed directly and is revised, so the size of an output gap is always an estimate.",
  compete:"Keynesian and new classical views disagree about the shape of short-run aggregate supply and how quickly the economy returns to potential; the platform's AS plates show both views."},
 phillips:{t:"The Phillips curve",core:"In the short run lower unemployment can come with higher inflation; in the long run the trade-off disappears at the natural rate.",
  assume:["Expectations of inflation adjust to experience","A natural rate of unemployment exists and is stable"],
  evidence:"Friedman (1968) and Phelps (1967) argued that any trade-off would vanish once expectations adjusted, which the stagflation of the 1970s appeared to confirm. In the 2010s the curve looked very flat, as unemployment fell far without much inflation; one explanation is that anchored expectations kept inflation steady.",
  measure:"The natural rate (or NAIRU) cannot be observed; it is estimated, and estimates move over time.",
  compete:"Some economists argue the curve is non-linear, steep when labour markets are very tight and flat otherwise, which would reconcile the flat 2010s with the 2021–23 surge."},
 ppc:{t:"The production possibilities curve",core:"With given resources and technology an economy faces a trade-off: more of one good means less of another.",
  assume:["Two goods (or two groups of goods)","Fixed resources and technology","Resources not equally suited to both goods, which bows the curve outward"],
  evidence:"The model says nothing about who gets the output or how it is valued, and a point on the frontier is efficient only in the productive sense: it can be reached by an economy that leaves many people poor.",
  compete:"Environmental economists add that some \"growth\" moves the frontier by running down natural capital, which a measure like GDP does not subtract."},
 fx:{t:"The foreign exchange market",core:"A floating exchange rate is the price of a currency, set by demand for it and supply of it.",
  assume:["A floating rate with no intervention","Demand comes mainly from trade in goods and services"],
  evidence:"In practice most currency trading is financial, not trade-related, so interest-rate differentials, risk and expectations drive exchange rates in the short run. Purchasing power parity (that exchange rates move to equalise price levels) holds, if at all, only over long periods.",
  measure:"The nominal rate is the quoted price; the real exchange rate adjusts it for relative price levels and is what matters for competitiveness.",
  compete:"Asset-market models explain short-run volatility and overshooting (Dornbusch, 1976), which a goods-trade model cannot."},
 tariff:{t:"A tariff",core:"A tariff raises the domestic price, helps domestic producers, raises revenue and costs consumers more than the others gain.",
  assume:["A small country that cannot move the world price","Competitive markets","No retaliation"],
  evidence:"For the 2018–19 US tariffs on China, Amiti, Redding and Weinstein (2019) and Fajgelbaum and co-authors (2020) found the cost passed almost entirely into US import prices. Many tariffs fall on intermediate inputs, which raises costs for the industries that use them.",
  compete:"A large country can gain by improving its terms of trade (the optimal-tariff argument), though retaliation can remove the gain; infant-industry and strategic arguments are about the long run, which the static diagram leaves out."},
 lorenz:{t:"The Lorenz curve and Gini coefficient",core:"The further the Lorenz curve bows from the line of equality, the more unequal the distribution; the Gini summarises that gap in one number.",
  assume:["A clear choice of what is measured: income, consumption or wealth","A clear unit: individual or household, before or after taxes and transfers"],
  evidence:"Two quite different distributions can have the same Gini, so the single number hides where the inequality is. Household surveys tend to under-record top incomes, which is why tax-record studies usually find higher inequality at the top than surveys do.",
  measure:"Consumption is more equal than income, and income after taxes and transfers is more equal than market income, so always check which one a Gini is based on."},
 multiplier:{t:"The multiplier",core:"An injection of spending raises national income by more than itself, because one person's spending is another's income.",
  assume:["Spare capacity, so output rather than prices responds","Stable propensities to save, tax and import","No offsetting response from interest rates"],
  evidence:"Estimated fiscal multipliers vary widely. Research after 2008 found them larger in recessions and when interest rates are at their lower bound, and smaller in open economies with high imports or when the central bank offsets the stimulus.",
  compete:"Crowding out and Ricardian equivalence (households saving in anticipation of future taxes) explain why the multiplier can be small; the size is an empirical question that depends on circumstances."}
};
/* concept pages share the note of their model */
const GD_CONCEPT={"c-ped":"tax","c-inc":"tax","c-ext":"negprod","c-pmax":"ceiling","c-ad":"adas","c-as":"adas","c-mult":"multiplier",
 "c-phil":"phillips","c-fx":"fx","c-prot":"tariff","c-gini":"lorenz","c-mono":"monopoly","c-cadv":"ppc"};
/* misconceptions that cost marks, each with the correct idea */
const MISC_BOX={
 "c-ped":[["PED is the slope of the demand curve.","Elasticity is a ratio of percentage changes. Along a straight-line demand curve the slope is constant but PED changes, from elastic at high prices to inelastic at low prices."]],
 "c-inc":[["The seller pays the tax, because the seller hands it to the government.","Legal incidence and economic incidence differ. The burden is shared through prices, and the side of the market that is less responsive carries more of it."]],
 "c-ext":[["An externality means the market has failed, so the good should be banned.","The market overproduces; the efficient output is lower, not zero. The aim is to bring output to where marginal social cost equals marginal social benefit."]],
 "c-pmax":[["A maximum price makes the good cheaper for everyone.","Only those who obtain it pay less. Below equilibrium, quantity supplied falls, so some buyers go without, and non-price rationing (queues, waiting lists, black markets) decides who."]],
 "c-ad":[["An increase in demand means an increase in quantity demanded.","An increase in demand shifts the demand curve. A change in quantity demanded is a movement along the curve, caused by a change in the good's own price."],
  ["When the price level rises, AD shifts left.","A change in the price level is a movement along the AD curve. AD shifts only when something other than the price level changes: consumption, investment, government spending or net exports."]],
 "c-as":[["A rise in costs shifts LRAS left.","A rise in firms' costs shifts short-run aggregate supply. LRAS moves with the economy's productive capacity: the quantity and quality of resources and technology."]],
 "c-inf":[["Deflation and disinflation are the same thing.","Disinflation is a fall in the rate of inflation, so prices still rise, more slowly. Deflation is a fall in the general price level."]],
 "c-fx":[["A weaker currency is always bad for a country.","A depreciation makes exports cheaper abroad and imports dearer at home. It can help exporters and the trade balance while raising import prices and inflation; the verdict depends on elasticities and what the economy imports."]],
 "c-cadv":[["A country with no absolute advantage cannot gain from trade.","Gains come from comparative advantage: lower opportunity cost. A country can be less productive at everything and still gain by specialising where its disadvantage is smallest."]],
 "c-mono":[["A monopoly charges the highest price it can.","A profit-maximising monopoly sets output where marginal revenue equals marginal cost and charges the price the demand curve gives at that output. A higher price would sell too little to maximise profit."]],
 "c-mult":[["The multiplier makes government spending pay for itself.","The multiplier raises income by more than the injection, but part of that income leaks into saving, taxes and imports, and the fiscal cost remains unless tax revenue rises enough to cover it."]]
};
function gdPanel(k){const g=GD[k];if(!g)return "";
 return `<details class="gd"><summary><span class="gd-k">Go deeper</span><span class="gd-t">Economist's note · beyond the model: ${esc(g.t)}</span><span class="gd-o">Optional</span></summary>
  <div class="gd-in">
   <p class="gd-core"><span>Core idea</span>${esc(g.core)}</p>
   <div class="gd-grid">
    <div><h4>What the model has to assume</h4><ul>${g.assume.map(a=>`<li>${esc(a)}</li>`).join("")}</ul></div>
    <div><h4>What the evidence shows</h4><p>${esc(g.evidence)}</p></div>
    ${g.measure?`<div><h4>Measurement</h4><p>${esc(g.measure)}</p></div>`:""}
    ${g.compete?`<div><h4>Where economists disagree</h4><p>${esc(g.compete)}</p></div>`:""}</div>
   <p class="gd-src"><span class="tag">Arjun Agrawal original commentary</span> Beyond the syllabus core, for curiosity and for evaluation. Studies are named so they can be found; this is not IB material or examiner guidance.</p></div></details>`}
function miscBox(id){const m=MISC_BOX[id];if(!m)return "";
 return m.map(([w,r])=>`<aside class="mcb" aria-label="Common misconception"><div class="mcb-w"><span>Misconception</span><p>${esc(w)}</p></div><div class="mcb-r"><span>Correct idea</span><p>${esc(r)}</p></div></aside>`).join("")}
/* on a diagram plate: after the reading guide */
(function(){if(typeof dgLibrary!=="function")return;const prev=dgLibrary;dgLibrary=function(){const h=prev.apply(this,arguments);
 return ARG&&GD[ARG]?h+`<div class="wrap md sec tight">${gdPanel(ARG)}</div>`:h}})();
/* on a concept page: the misconception first, then the optional note */
(function(){if(typeof conceptPage!=="function")return;const prev=conceptPage;conceptPage=function(c){const h=prev.apply(this,arguments);
 const k=c&&GD_CONCEPT[c.id];const add=(c?miscBox(c.id):"")+(k?gdPanel(k):"");
 return add?h+`<div class="wrap md sec tight gd-wrap">${add}</div>`:h}})();
