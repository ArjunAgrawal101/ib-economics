"""2026-11-19 · the footer explores the academic ecosystem (idempotent; applied to index.html).

The owner's brief asks for a footer section, "Explore the academic ecosystem", that lists IB DP
Economics, UPSC CSE Economics and IB DP Business Management, the last linked to The Business Brief
(https://the-business-brief-dun.vercel.app/), the same educator's platform, in a new tab. PR #13 added
it to its own footer; here it joins the footer that 2026-11-17-flagship-footer.py built: the two
pathway cards keep their place and their weight, a heading names the group, and a third, quieter card
(no pathway colour, a dashed edge) links to The Business Brief. It is the wider ecosystem, not a third
pathway. The styles are in src/styles/css-flagship.css. Run python3 tools/build/splice.py afterwards."""
import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]
P = ROOT / 'index.html'
s = P.read_text(encoding='utf-8')

OLD = '''</div><nav class="wrap full ft-paths" aria-label="The two pathways">
  <a class="ft-path p-ib" href="#/ib"><span class="ft-pn">Pathway 01</span><b>IB DP Economics</b><span>The course, the models, the real world, the examinations, the IA and the EE.</span></a>
  <a class="ft-path p-up" href="#/upsc"><span class="ft-pn">Pathway 02</span><b>UPSC CSE Economics</b><span>The syllabus, the handbooks, current affairs, a preparation strategy and the three-month course.</span></a>
 </nav>'''
NEW = '''</div><nav class="wrap full ft-paths" aria-label="Explore the academic ecosystem">
  <p class="kicker ft-eco-k">Explore the academic ecosystem</p>
  <a class="ft-path p-ib" href="#/ib"><span class="ft-pn">Pathway 01</span><b>IB DP Economics</b><span>The course, the models, the real world, the examinations, the IA and the EE.</span></a>
  <a class="ft-path p-up" href="#/upsc"><span class="ft-pn">Pathway 02</span><b>UPSC CSE Economics</b><span>The syllabus, the handbooks, current affairs, a preparation strategy and the three-month course.</span></a>
  <a class="ft-path p-bb" href="https://the-business-brief-dun.vercel.app/" target="_blank" rel="noopener noreferrer"><span class="ft-pn">Beyond Economics</span><b>IB DP Business Management</b><span>The Business Brief, an interactive learning platform <span aria-hidden="true">↗</span><span class="sr-only">(opens in a new tab)</span></span></a>
 </nav>'''

if NEW in s:
    print('applied: nothing (already applied)')
else:
    n = s.count(OLD)
    assert n == 1, f'the footer pathways were found {n} times'
    s = s.replace(OLD, NEW, 1)
    P.write_text(s, encoding='utf-8')
    print('applied: the academic ecosystem in the footer')
