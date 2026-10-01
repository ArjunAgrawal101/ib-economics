"""Build assets/data/econ-data.js from open-data packages that republish official series.
Every series carries: indicator, unit, source, source code/URL, package URL, coverage, retrieval date,
and any transformation the platform applied. Nothing is estimated or filled in: a missing year stays missing."""
import csv, json, collections, hashlib, datetime
import os, sys, urllib.request
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
W = os.path.join(ROOT, 'tools', 'build', '.cache', 'econ') + '/'
OUT = os.path.join(ROOT, 'assets', 'data', 'econ-data.js')
RETRIEVED = os.environ.get('RETRIEVED', '2026-10-01')   # set to the date you download, e.g. RETRIEVED=2027-01-15
RAW = 'https://raw.githubusercontent.com/datasets/'
FILES = {'gdp.csv': 'gdp/main/data/gdp.csv', 'population.csv': 'population/main/data/population.csv', 'cpi.csv': 'cpi/main/data/cpi.csv',
 'gini-index.csv': 'gini-index/main/data/gini-index.csv', 'oil-prices.csv': 'oil-prices/main/data/brent-year.csv',
 'bond-yields-us-10y.csv': 'bond-yields-us-10y/main/data/monthly.csv', 'employment-us.csv': 'employment-us/main/data/aat1.csv',
 'co2-fossil-by-nation.csv': 'co2-fossil-by-nation/main/data/fossil-fuel-co2-emissions-by-nation.csv', 'fxm.csv': 'exchange-rates/main/data/monthly.csv'}
os.makedirs(W, exist_ok=True)
for f, path in FILES.items():
    if '--refresh' in sys.argv or not os.path.exists(W + f):
        urllib.request.urlretrieve(RAW + path, W + f)
PKG = 'https://github.com/datasets/'
ENT = [('WLD','World','agg'),('HIC','High income','agg'),('UMC','Upper middle income','agg'),('LMC','Lower middle income','agg'),('LIC','Low income','agg'),
 ('USA','United States','c'),('CHN','China','c'),('IND','India','c'),('JPN','Japan','c'),('DEU','Germany','c'),('GBR','United Kingdom','c'),
 ('FRA','France','c'),('ITA','Italy','c'),('CAN','Canada','c'),('AUS','Australia','c'),('KOR','Korea, Rep.','c'),('BRA','Brazil','c'),
 ('MEX','Mexico','c'),('ARG','Argentina','c'),('ZAF','South Africa','c'),('NGA','Nigeria','c'),('EGY','Egypt','c'),('KEN','Kenya','c'),
 ('ETH','Ethiopia','c'),('IDN','Indonesia','c'),('BGD','Bangladesh','c'),('VNM','Viet Nam','c'),('TUR','Türkiye','c'),('SAU','Saudi Arabia','c'),('RUS','Russian Federation','c')]
CODES = [e[0] for e in ENT]
Y0 = 1990
CDIAC = {'USA':'UNITED STATES OF AMERICA','CHN':'CHINA (MAINLAND)','IND':'INDIA','JPN':'JAPAN','DEU':'GERMANY','GBR':'UNITED KINGDOM',
 'FRA':'FRANCE (INCLUDING MONACO)','ITA':'ITALY (INCLUDING SAN MARINO)','CAN':'CANADA','AUS':'AUSTRALIA','KOR':'REPUBLIC OF KOREA','BRA':'BRAZIL',
 'MEX':'MEXICO','ARG':'ARGENTINA','ZAF':'SOUTH AFRICA','NGA':'NIGERIA','EGY':'EGYPT','KEN':'KENYA','ETH':'ETHIOPIA','IDN':'INDONESIA',
 'BGD':'BANGLADESH','VNM':'VIET NAM','TUR':'TURKEY','SAU':'SAUDI ARABIA','RUS':'RUSSIAN FEDERATION'}

def wb(fname, col='Value', scale=1, dp=2):
    out = collections.defaultdict(dict)
    for r in csv.DictReader(open(W + fname, encoding='utf-8')):
        c = r.get('Country Code'); y = int(r['Year'][:4]); v = r.get(col)
        if c in CODES and y >= Y0 and v not in (None, ''):
            out[c][y] = round(float(v) / scale, dp)
    return out

gdp = wb('gdp.csv', scale=1e9, dp=1)                       # US$ billions
pop = wb('population.csv', scale=1e6, dp=2)                # millions
inf = wb('cpi.csv', col='CPI', dp=2)                        # annual %, see note
gini = wb('gini-index.csv', dp=1)
gdppc = {c: {y: round(gdp[c][y] * 1e9 / (pop[c][y] * 1e6)) for y in gdp[c] if y in pop.get(c, {})} for c in gdp}
co2 = collections.defaultdict(dict)
inv = {v: k for k, v in CDIAC.items()}
for r in csv.DictReader(open(W + 'co2-fossil-by-nation.csv', encoding='utf-8')):
    c = inv.get(r['Country']); y = int(r['Year'])
    if c and y >= Y0 and r['Per Capita']:
        co2[c][y] = round(float(r['Per Capita']) * 44 / 12, 2)   # tonnes of carbon → tonnes of CO2

def series(d): return {c: [[y, v] for y, v in sorted(d[c].items())] for c in CODES if d.get(c)}
def span(d):
    ys = [y for c in d for y in d[c]]; return [min(ys), max(ys)]

IND = [
 dict(id='gdp', name='GDP', unit='US$ billions, current prices', kind='level', data=series(gdp), span=span(gdp),
  source='World Bank and OECD national accounts data', code='NY.GDP.MKTP.CD', url='https://data.worldbank.org/indicator/NY.GDP.MKTP.CD',
  pkg=PKG + 'gdp', licence='CC BY 4.0', note='Nominal values in current US dollars: they move with prices and exchange rates as well as output, so they are not a measure of real growth.',
  subs=['3.1', '4.8'], kc=['Change', 'Economic well-being']),
 dict(id='gdppc', name='GDP per capita', unit='US$, current prices', kind='level', data=series(gdppc), span=span(gdppc),
  source='Computed by this platform: World Bank GDP (NY.GDP.MKTP.CD) ÷ World Bank population (SP.POP.TOTL)', code='computed', url='https://data.worldbank.org/indicator/NY.GDP.PCAP.CD',
  pkg=PKG + 'gdp', licence='CC BY 4.0 / PDDL', note='Not adjusted for prices or purchasing power. The World Bank publishes its own series (NY.GDP.PCAP.CD); small differences from it can come from revisions between the two downloads.',
  subs=['3.1', '4.8'], kc=['Economic well-being', 'Equity']),
 dict(id='infl', name='Inflation, consumer prices', unit='annual % change', kind='rate', data=series(inf), span=span(inf),
  source='World Bank, International Monetary Fund International Financial Statistics', code='FP.CPI.TOTL.ZG', url='https://data.worldbank.org/indicator/FP.CPI.TOTL.ZG',
  pkg=PKG + 'cpi', licence='PDDL', note='The source package labels this column as a price index (2005 = 100), but its download script fetches FP.CPI.TOTL.ZG and the values are annual inflation rates (they match published US rates, e.g. 8.0% in 2022). It is shown here under its correct name.',
  subs=['3.3'], kc=['Economic well-being', 'Change']),
 dict(id='pop', name='Population', unit='millions', kind='level', data=series(pop), span=span(pop),
  source='World Bank, World Development Indicators', code='SP.POP.TOTL', url='https://data.worldbank.org/indicator/SP.POP.TOTL',
  pkg=PKG + 'population', licence='PDDL', note='Mid-year estimates; the latest years are projections or provisional estimates and are revised.',
  subs=['4.8', '4.9'], kc=['Change']),
 dict(id='gini', name='Gini index', unit='0 (equal) to 100 (unequal)', kind='index', data=series(gini), span=span(gini),
  source='World Bank, Poverty and Inequality Platform', code='SI.POV.GINI', url='https://data.worldbank.org/indicator/SI.POV.GINI',
  pkg=PKG + 'gini-index', licence='PDDL', note='Surveys are irregular, so many years are missing. Some countries survey income and others consumption, which limits comparison.',
  subs=['3.4', '2.12'], kc=['Equity']),
 dict(id='co2pc', name='CO₂ from fossil fuels and cement, per person', unit='tonnes of CO₂ per person', kind='level', data=series(co2), span=span(co2),
  source='CDIAC-FF (Hefner and Marland, 2023), Appalachian State University', code='CDIAC-FF 1751–2020', url='https://rieee.appstate.edu/projects-programs/cdiac/',
  pkg=PKG + 'co2-fossil-by-nation', licence='PDDL', note='The source reports tonnes of carbon; the platform multiplies by 44/12 to give tonnes of CO₂. Production-based (territorial) emissions only; excludes land use. Ends in 2020. No regional aggregates.',
  subs=['4.7', '2.8'], kc=['Sustainability']),
]

# single series
def annual(f, dcol, vcol, filt=None, dp=2):
    out = []
    for r in csv.DictReader(open(W + f, encoding='utf-8')):
        if filt and not filt(r): continue
        out.append([r[dcol][:4], round(float(r[vcol]), dp)])
    return out
brent = [[int(y), v] for y, v in annual('oil-prices.csv', 'Date', 'Price')]
ust = [[d, round(float(v), 2)] for d, v in [(r['Date'][:7], r['Rate']) for r in csv.DictReader(open(W + 'bond-yields-us-10y.csv'))] if d >= '1990']
unemp = [[int(r['year']), float(r['unemployed_percent'])] for r in csv.DictReader(open(W + 'employment-us.csv')) if r['unemployed_percent']]
fx = collections.defaultdict(list)
for r in csv.DictReader(open(W + 'fxm.csv', encoding='utf-8')):
    if r['Date'] >= '2000' and r['Exchange rate']:
        fx[r['Country']].append([r['Date'][:7], round(float(r['Exchange rate']), 4)])
FXQ = {}
fxs = [dict(id='fx-' + k.lower().replace(' ', '-'), name=k, unit=FXQ.get(k, 'units of local currency per US$'), data=v) for k, v in sorted(fx.items()) if v[-1][0] >= '2025-01']

SINGLE = [
 dict(id='brent', name='Brent crude oil, spot price', unit='US$ per barrel, annual average', freq='annual', data=brent,
  source='U.S. Energy Information Administration (EIA)', code='RBRTE', url='https://www.eia.gov/dnav/pet/hist/RBRTEd.htm', pkg=PKG + 'oil-prices', licence='PDDL',
  note='Annual averages, labelled by year. Nominal dollars: not adjusted for inflation.', subs=['3.3', '2.6'], kc=['Change', 'Interdependence']),
 dict(id='ust10', name='US 10-year Treasury yield', unit='% per year, monthly average', freq='monthly', data=ust,
  source='Board of Governors of the Federal Reserve System, release H.15', code='H.15', url='https://www.federalreserve.gov/releases/h15/', pkg=PKG + 'bond-yields-us-10y', licence='PDDL',
  note='A market interest rate on government borrowing, not the central bank policy rate.', subs=['3.5', '3.6'], kc=['Intervention']),
 dict(id='usunemp', name='US unemployment rate', unit='% of the labour force, annual average', freq='annual', data=unemp,
  source='U.S. Bureau of Labor Statistics, Current Population Survey, table A-1', code='CPS A-1', url='https://www.bls.gov/cps/cpsaat01.htm', pkg=PKG + 'employment-us', licence='PDDL',
  note='Survey-based (ILO-style) unemployment for people aged 16 and over. Definitions changed in some years; see the BLS footnotes.', subs=['3.3'], kc=['Economic well-being']),
]
meta = dict(version='data-2026.10.1', retrieved=RETRIEVED, entities=[dict(code=c, name=n, kind=k) for c, n, k in ENT],
  fxSource=dict(source='Board of Governors of the Federal Reserve System, via FRED (Federal Reserve Bank of St. Louis)', url='https://fred.stlouisfed.org/categories/158', pkg=PKG + 'exchange-rates', licence='PDDL',
   note='Monthly averages of noon buying rates in New York, in units of local currency per US$: a rise means the currency depreciated against the dollar. The package README describes the euro, pound and Australian and New Zealand dollars as quoted the other way round, but their values are local currency per US$ (for example 0.61 pounds per dollar in January 2000, when a pound bought about 1.6 dollars), so every series is shown that way.'),
  method='Values are copied from the packages without adjustment, except where a series says it was computed or converted. Missing years are left blank: nothing is interpolated or estimated.')
D = dict(meta=meta, indicators=IND, single=SINGLE, fx=fxs)
raw = json.dumps(D, ensure_ascii=False, separators=(',', ':'))
D['meta']['hash'] = hashlib.sha256(raw.encode()).hexdigest()[:16]
raw = json.dumps(D, ensure_ascii=False, separators=(',', ':'))
open(OUT, 'w', encoding='utf-8').write('/* Economic data: official series from open-data packages, with provenance. Generated; do not edit by hand. */\nwindow.__ECONDATA__=' + raw + ';\n')
print('bytes', len(raw), 'indicators', [(i['id'], len(i['data']), i['span']) for i in IND])
print('single', [(s['id'], len(s['data']), s['data'][0], s['data'][-1]) for s in SINGLE]); print('fx', len(fxs), [f['name'] for f in fxs])
