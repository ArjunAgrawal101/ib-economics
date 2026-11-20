"""2026-11-20 · the footer of the final flagship release (idempotent; applied to index.html).

The owner's final brief asks the footer for the identity, a short positioning statement, links to
both pathways, The Indian Economy, Political Studies and The Business Brief, the email and phone the
site already publishes, the copyright, the website link and a closing line ("Think deeply.
Understand clearly. Connect ideas."). Most of that was already there (2026-11-17 and 2026-11-19
footers); this adds what was missing, and nothing is removed:
  - The Indian Economy, after the two pathways in the ecosystem row (a card like theirs, but it is
    not a pathway: no pathway colour, no number);
  - the sister platforms' lines in the final brief's words (subject line and tagline);
  - the published phone number (tel:) and WhatsApp beside the email under Connect;
  - a closing row: the closing line, the positioning statement, and "Replay the opening" (?intro=1),
    the replay control the brief asks for in the interface (the settings page has it too).
Run python3 tools/build/splice.py afterwards (nothing in this footer is spliced, but the habit holds)."""
import pathlib

P = pathlib.Path(__file__).resolve().parents[2] / 'index.html'
s = P.read_text(encoding='utf-8')
done = []


def rep(old, new, label):
    global s
    if new in s:
        return
    n = s.count(old)
    assert n == 1, f'{label}: anchor found {n} times'
    s = s.replace(old, new, 1)
    done.append(label)


rep('''<span>IB Business Management | Strategy | Leadership | Decisions <span aria-hidden="true">↗</span>''',
    '''<span>IB DP Business Management · Strategy. Leadership. Decisions. <span aria-hidden="true">↗</span>''', 'Business Brief line')
rep('''<span>Indian Polity | International Relations | PSIR | IB Global Politics <span aria-hidden="true">↗</span>''',
    '''<span>IB DP Global Politics | Indian Polity | International Relations | PSIR · Understand power, politics and global affairs. <span aria-hidden="true">↗</span>''', 'Political Studies line')
rep('''the three-month course.</span></a>
  <a class="ft-path p-bb"''',
    '''the three-month course.</span></a>
  <a class="ft-path p-bk" href="#/book"><span class="ft-pn">A new academic work</span><b>The Indian Economy</b><span>A Comprehensive Academic and Examination Reference · First Edition, 2026-27, with its free Digital Revision Companion.</span></a>
  <a class="ft-path p-bb"''', 'book card')
rep('''    <a class="lnk" href="mailto:arjun1agr@gmail.com">arjun1agr@gmail.com</a>
    <div class="kicker mt4">The method</div>''',
    '''    <a class="lnk" href="mailto:arjun1agr@gmail.com">arjun1agr@gmail.com</a>
    <a class="lnk" href="tel:+917092844945">+91 7092844945</a>
    <a class="lnk" href="https://wa.me/917092844945" target="_blank" rel="noopener noreferrer">WhatsApp ↗<span class="sr-only"> (opens in a new tab)</span></a>
    <div class="kicker mt4">The method</div>''', 'phone and WhatsApp')
rep('''</div><div class="wrap full ft-res"><span>For more resources:''',
    '''</div><div class="wrap full ft-final">
  <div><p class="ft-close">Think deeply. Understand clearly. Connect ideas.</p>
   <p class="ft-pos">Arjun Agrawal · Economics: the flagship Economics platform of an academic ecosystem across Economics, Politics and Business, for IB DP Economics, UPSC CSE Economics and the study of the Indian economy.</p></div>
  <div><h2>The platforms</h2><ul><li><a class="lnk" href="#/ib">IB DP Economics</a></li><li><a class="lnk" href="#/upsc">UPSC CSE Economics</a></li><li><a class="lnk" href="#/book">The Indian Economy (book)</a></li></ul></div>
  <div><h2>The opening</h2><ul><li><a class="lnk ft-replay-l" href="./?intro=1">Replay the opening</a></li><li><span class="xs">Seven seconds, on every full page load; Escape or Skip introduction ends it.</span></li></ul></div>
</div><div class="wrap full ft-res"><span>For more resources:''', 'closing row')

P.write_text(s, encoding='utf-8')
print(f'applied {len(done)} steps' if done else 'already applied')
for d in done:
    print(' -', d)
