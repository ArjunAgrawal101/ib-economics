"""2026-11-19 · the footer lists the Arjun Agrawal Academic Ecosystem (idempotent; applied to index.html).

The owner's V3 brief joins three independent platforms in one academic ecosystem: Economics (this
platform), The Business Brief (IB DP Business Management, https://the-business-brief-dun.vercel.app/) and
Political Studies & Global Affairs (https://arjun-agrawal-political-studies.vercel.app/). The footer that
2026-11-19-business-brief-footer.py extended now names the ecosystem, says which platform this is, keeps
the two pathway cards with their place and weight, and links both sister platforms in a new tab, with the
owner's names and lines. The sisters stay quieter cards (no pathway colour, a dashed edge): the wider
ecosystem, not further pathways. The styles are in src/styles/css-flagship.css. Run
python3 tools/build/splice.py afterwards."""
import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]
P = ROOT / 'index.html'
s = P.read_text(encoding='utf-8')

OLD = '''<nav class="wrap full ft-paths" aria-label="Explore the academic ecosystem">
  <p class="kicker ft-eco-k">Explore the academic ecosystem</p>'''
OLD_BB = '''  <a class="ft-path p-bb" href="https://the-business-brief-dun.vercel.app/" target="_blank" rel="noopener noreferrer"><span class="ft-pn">Beyond Economics</span><b>IB DP Business Management</b><span>The Business Brief, an interactive learning platform <span aria-hidden="true">↗</span><span class="sr-only">(opens in a new tab)</span></span></a>
 </nav>'''
NEW = '''<nav class="wrap full ft-paths" aria-label="The Arjun Agrawal Academic Ecosystem">
  <p class="kicker ft-eco-k">The Arjun Agrawal Academic Ecosystem <span class="ft-here">· You are on Economics</span></p>'''
NEW_BB = '''  <a class="ft-path p-bb" href="https://the-business-brief-dun.vercel.app/" target="_blank" rel="noopener noreferrer"><span class="ft-pn">Beyond Economics</span><b>The Business Brief</b><span>IB Business Management | Strategy | Leadership | Decisions <span aria-hidden="true">↗</span><span class="sr-only">(opens in a new tab)</span></span></a>
  <a class="ft-path p-ps" href="https://arjun-agrawal-political-studies.vercel.app/" target="_blank" rel="noopener noreferrer"><span class="ft-pn">Beyond Economics</span><b>Political Studies &amp; Global Affairs</b><span>Indian Polity | International Relations | PSIR | IB Global Politics <span aria-hidden="true">↗</span><span class="sr-only">(opens in a new tab)</span></span></a>
 </nav>'''

if NEW in s and NEW_BB in s:
    print('applied: nothing (already applied)')
else:
    for old in (OLD, OLD_BB):
        n = s.count(old)
        assert n == 1, f'the footer ecosystem block was found {n} times'
    s = s.replace(OLD, NEW, 1).replace(OLD_BB, NEW_BB, 1)
    P.write_text(s, encoding='utf-8')
    print('applied: the Arjun Agrawal Academic Ecosystem in the footer')
