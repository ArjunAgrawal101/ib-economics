"""Build assets/data/history.js: long-run series for the Economic Events archive.

Every series is copied from an open-data package that republishes an official or academic source,
with its licence. Derived figures are computed here and say so:
  * US real GDP growth is computed from BEA's chained-dollar LEVELS. The package's own growth columns
    are shifted by one row (its 1929 row carries 1930's -8.5%), so they are not used.
  * US CPI inflation is the change in the annual average of monthly CPI-U.
Nothing is interpolated. Usage: RETRIEVED=YYYY-MM-DD python3 tools/build/build_history.py [--refresh]"""
import csv, json, os, sys, hashlib, urllib.request, collections
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
W = os.path.join(ROOT, 'tools', 'build', '.cache', 'history') + '/'
OUT = os.path.join(ROOT, 'assets', 'data', 'history.js')
RETRIEVED = os.environ.get('RETRIEVED', '2026-10-02')
RAW = 'https://raw.githubusercontent.com/datasets/'
FILES = {'cpi-us.csv': 'cpi-us/main/data/cpiai.csv', 'sp500.csv': 's-and-p-500/main/data/data.csv', 'gdp-us-year.csv': 'gdp-us/main/data/year.csv',
 'gdp-us-quarter.csv': 'gdp-us/main/data/quarter.csv', 'uk10y.csv': 'bond-yields-uk-10y/main/data/annual.csv', 'brent-month.csv': 'oil-prices/main/data/brent-monthly.csv',
 'fx-month.csv': 'exchange-rates/main/data/monthly.csv', 'us10y.csv': 'bond-yields-us-10y/main/data/monthly.csv', 'employment-us.csv': 'employment-us/main/data/aat1.csv',
 'gdp.csv': 'gdp/main/data/gdp.csv', 'cpi-wb.csv': 'cpi/main/data/cpi.csv', 'population.csv': 'population/main/data/population.csv'}
os.makedirs(W, exist_ok=True)
for f, p in FILES.items():
    if '--refresh' in sys.argv or not os.path.exists(W + f): urllib.request.urlretrieve(RAW + p, W + f)
rows = lambda f: list(csv.DictReader(open(W + f, encoding='utf-8')))
PKG = 'https://github.com/datasets/'
S = []
def add(id, name, unit, freq, data, source, url, pkg, note='', licence='PDDL'):
    S.append(dict(id=id, name=name, unit=unit, freq=freq, data=data, source=source, url=url, pkg=PKG + pkg, licence=licence, note=note))

# US CPI-U: annual average index, then year-on-year inflation from it
by = collections.defaultdict(list)
for r in rows('cpi-us.csv'): by[int(r['Date'][:4])].append(float(r['Index']))
avg = {y: sum(v) / len(v) for y, v in by.items() if len(v) == 12}
add('us-cpi-infl', 'US consumer-price inflation', 'annual % (annual average CPI-U, year on year)', 'annual',
    [[y, round((avg[y] / avg[y - 1] - 1) * 100, 1)] for y in sorted(avg) if y - 1 in avg],
    'U.S. Bureau of Labor Statistics, CPI-U (all items)', 'https://www.bls.gov/cpi/', 'cpi-us',
    'Computed by this platform from the monthly index: the change in the annual average. Complete calendar years only.')
# BEA GDP: growth recomputed from chained levels
g = [(int(r['date']), float(r['level-chained']), float(r['level-current'])) for r in rows('gdp-us-year.csv')]
add('us-gdp-growth', 'US real GDP growth', 'annual %, chained (2017) dollars', 'annual',
    [[g[i][0], round((g[i][1] / g[i - 1][1] - 1) * 100, 1)] for i in range(1, len(g))],
    'U.S. Bureau of Economic Analysis, National Income and Product Accounts', 'https://www.bea.gov/data/gdp/gross-domestic-product', 'gdp-us',
    'Computed by this platform from BEA real GDP levels. The package also carries growth columns, but they are shifted by one year, so they are not used.')
add('us-gdp-nominal', 'US GDP, current dollars', 'US$ billions', 'annual', [[y, c] for y, _, c in g],
    'U.S. Bureau of Economic Analysis', 'https://www.bea.gov/data/gdp/gross-domestic-product', 'gdp-us')
q = [(r['date'][:7], float(r['level-chained'])) for r in rows('gdp-us-quarter.csv')]
add('us-gdp-q', 'US real GDP growth, quarterly', '% change from previous quarter, annualised', 'quarterly',
    [[q[i][0], round(((q[i][1] / q[i - 1][1]) ** 4 - 1) * 100, 1)] for i in range(1, len(q))],
    'U.S. Bureau of Economic Analysis', 'https://www.bea.gov/data/gdp/gross-domestic-product', 'gdp-us',
    'Computed by this platform from chained levels: ((this quarter ÷ last quarter)⁴ − 1). Labelled by the first month of the quarter.')
sp = rows('sp500.csv')
add('sp500', 'S&P 500 composite price index', 'index level, monthly average', 'monthly', [[r['Date'][:7], round(float(r['SP500']), 2)] for r in sp if float(r['SP500']) > 0],
    'Robert J. Shiller, Irrational Exuberance data (Yale), with later months from FRED', 'http://www.econ.yale.edu/~shiller/data.htm', 's-and-p-500',
    'Nominal. Before 1957 the series is the Cowles/Standard & Poor composite that Shiller links to the S&P 500.')
add('sp500-real', 'S&P 500, real (inflation-adjusted)', 'index level in recent dollars, monthly', 'monthly', [[r['Date'][:7], round(float(r['Real Price']), 1)] for r in sp if float(r['Real Price']) > 0],
    'Robert J. Shiller, Irrational Exuberance data (Yale)', 'http://www.econ.yale.edu/~shiller/data.htm', 's-and-p-500', 'Deflated by Shiller with the CPI.')
add('uk10y', 'UK 10-year government bond yield', '% per year, annual average', 'annual', [[int(r['Year'][:4]), round(float(r['Rate']), 2)] for r in rows('uk10y.csv')],
    'Bank of England', 'https://www.bankofengland.co.uk/statistics', 'bond-yields-uk-10y')
add('us10y', 'US 10-year Treasury yield', '% per year, monthly average', 'monthly', [[r['Date'][:7], round(float(r['Rate']), 2)] for r in rows('us10y.csv')],
    'Federal Reserve, release H.15', 'https://www.federalreserve.gov/releases/h15/', 'bond-yields-us-10y')
add('brent-m', 'Brent crude oil, spot price', 'US$ per barrel, monthly average', 'monthly', [[r['Date'][:7], round(float(r['Price']), 2)] for r in rows('brent-month.csv')],
    'U.S. Energy Information Administration', 'https://www.eia.gov/dnav/pet/hist/RBRTEd.htm', 'oil-prices', 'Nominal dollars. The series starts in May 1987.')
add('us-unemp', 'US unemployment rate', '% of the labour force, annual average', 'annual', [[int(r['year']), float(r['unemployed_percent'])] for r in rows('employment-us.csv') if r['unemployed_percent']],
    'U.S. Bureau of Labor Statistics, Current Population Survey, table A-1', 'https://www.bls.gov/cps/cpsaat01.htm', 'employment-us', 'Begins in 1941; no comparable official series covers the early 1930s.')
fx = collections.defaultdict(list)
for r in rows('fx-month.csv'):
    if r['Exchange rate']: fx[r['Country']].append([r['Date'][:7], round(float(r['Exchange rate']), 4)])
CUR = {'Japan': 'yen', 'Germany': 'Deutsche Mark (to 2001)', 'Thailand': 'baht', 'South Korea': 'won', 'Malaysia': 'ringgit', 'India': 'rupee', 'United Kingdom': 'pound sterling', 'Euro': 'euro', 'China': 'renminbi'}
for k, n in CUR.items():
    add('fx-' + k.lower().replace(' ', '-'), f'{n.split(" (")[0].capitalize()} per US dollar' if k != 'Germany' else 'Deutsche Marks per US dollar', f'{n} per US$, monthly average', 'monthly', fx[k],
        'Board of Governors of the Federal Reserve System, via FRED', 'https://fred.stlouisfed.org/categories/158', 'exchange-rates',
        'A rise means the currency depreciated against the dollar. All series in the package are local currency per US$ (checked against known rates).')
WB = {'IND': 'India', 'THA': 'Thailand', 'KOR': 'Korea, Rep.', 'IDN': 'Indonesia', 'MYS': 'Malaysia', 'GRC': 'Greece', 'IRL': 'Ireland', 'PRT': 'Portugal', 'ESP': 'Spain',
      'ITA': 'Italy', 'DEU': 'Germany', 'JPN': 'Japan', 'USA': 'United States', 'GBR': 'United Kingdom', 'CHN': 'China', 'WLD': 'World'}
def wb(f, col='Value', sc=1, dp=1):
    o = collections.defaultdict(list)
    for r in rows(f):
        c = r.get('Country Code')
        if c in WB and r.get(col) not in (None, ''): o[c].append([int(r['Year']), round(float(r[col]) / sc, dp)])
    return {c: sorted(v) for c, v in o.items()}
pan = dict(gdp=dict(name='GDP, current US$', unit='US$ billions', source='World Bank and OECD national accounts (NY.GDP.MKTP.CD)', url='https://data.worldbank.org/indicator/NY.GDP.MKTP.CD', pkg=PKG + 'gdp', licence='CC BY 4.0', data=wb('gdp.csv', sc=1e9)),
           infl=dict(name='Inflation, consumer prices', unit='annual %', source='World Bank (FP.CPI.TOTL.ZG)', url='https://data.worldbank.org/indicator/FP.CPI.TOTL.ZG', pkg=PKG + 'cpi', licence='PDDL', data=wb('cpi-wb.csv', col='CPI'),
                     note='The package labels this column a price index; its values are annual inflation rates (checked).'))
meta = dict(version='history-2026.10.1', retrieved=RETRIEVED, entities=WB,
            method='Copied without adjustment except where a series says it was computed. Missing periods stay missing.')
body = dict(meta=meta, series=S, panel=pan)
raw = json.dumps(body, ensure_ascii=False, separators=(',', ':'))
body['meta']['hash'] = hashlib.sha256(raw.encode()).hexdigest()[:16]
raw = json.dumps(body, ensure_ascii=False, separators=(',', ':'))
open(OUT, 'w', encoding='utf-8').write('/* Long-run series for the Economic Events archive, with provenance. Generated; do not edit by hand. */\nwindow.__HISTORY__=' + raw + ';\n')
print('bytes', len(raw)); [print(' ', s['id'], len(s['data']), s['data'][0], s['data'][-1]) for s in S]
