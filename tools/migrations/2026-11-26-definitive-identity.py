"""2026-11-26 · the definitive identity (idempotent; applied to index.html).

The owner's definitive brief places the Economics platform inside a wider identity,
ARJUN AGRAWAL | ACADEMIC ECOSYSTEM, whose positioning is "Think. Understand. Connect." The
Economics platform keeps its own line, "Think like an economist."; Political Studies keeps
"Power. Politics. Perspectives."; The Business Brief keeps "Strategy. Leadership. Decisions."

This migration changes only words and the footer's lists; the opening's engine, clock and
storyboard (2026-11-20) are untouched:
  - the opening's final line is THINK. UNDERSTAND. CONNECT., and the overlay's accessible name
    follows it (the self-tests that quote the line follow it too);
  - the footer names the ecosystem in the brief's words, gives Political Studies its tagline and
    the brief's subject order, calls the book "A new academic publication", and its closing row
    gains a compact cross-platform strip (Economics, Political Studies, Business Management), the
    two publications (the book and the free Digital Revision Companion) and the social links the
    site already publishes (LinkedIn, Instagram, YouTube), exactly as they appear elsewhere.
Run python3 tools/build/splice.py afterwards."""
import pathlib

P = pathlib.Path(__file__).resolve().parents[2] / 'index.html'
s = P.read_text(encoding='utf-8')
done = []


def rep(old, new, label, count=1):
    """Replace an exact anchor; skip when the new text is already there (idempotent)."""
    global s
    if new in s and old not in s:
        return
    n = s.count(old)
    assert n == count, f'{label}: anchor found {n} times, expected {count}'
    s = s.replace(old, new)
    done.append(label)


OLD_LABEL = 'aria-label="Arjun Agrawal. Economics, Politics, Business. Think like an economist."'
NEW_LABEL = 'aria-label="Arjun Agrawal. Economics, Politics, Business. Think. Understand. Connect."'
rep(OLD_LABEL, NEW_LABEL, 'opening: accessible name')
rep('<div class="sc ia-tg">Think like an economist.</div>',
    '<div class="sc ia-tg">Think. Understand. Connect.</div>', 'opening: final line')

# the opening's self-tests quote the line
rep('T("Opening · the overlay reads demand, supply, AD-AS, the network, then the monogram, the name, Economics · Politics · Business and Think like an economist.",',
    'T("Opening · the overlay reads demand, supply, AD-AS, the network, then the monogram, the name, Economics · Politics · Business and Think. Understand. Connect.",',
    'test: storyboard name')
rep('">Economics<",">Politics<",">Business<","Think like an economist."].map(x=>b.indexOf(x));',
    '">Economics<",">Politics<",">Business<","Think. Understand. Connect."].map(x=>b.indexOf(x));',
    'test: storyboard order')
rep('sp.getAttribute("aria-label")==="Arjun Agrawal. Economics, Politics, Business. Think like an economist."',
    'sp.getAttribute("aria-label")==="Arjun Agrawal. Economics, Politics, Business. Think. Understand. Connect."',
    'test: status')
rep('Economics · Politics · Business, then Think like an economist.), that its figures are economically exact',
    'Economics · Politics · Business, then Think. Understand. Connect.), that its figures are economically exact',
    'quality description')

# the footer: the ecosystem in the brief's words
rep('<nav class="wrap full ft-paths" aria-label="The Arjun Agrawal Academic Ecosystem">\n  <p class="kicker ft-eco-k">The Arjun Agrawal Academic Ecosystem <span class="ft-here">· You are on Economics</span></p>',
    '<nav class="wrap full ft-paths" aria-label="The Arjun Agrawal Academic Ecosystem">\n  <p class="kicker ft-eco-k">Arjun Agrawal | Academic Ecosystem · Think. Understand. Connect. <span class="ft-here">· You are on Economics</span></p>',
    'footer: ecosystem kicker')
rep('<span class="ft-pn">A new academic work</span><b>The Indian Economy</b>',
    '<span class="ft-pn">A new academic publication</span><b>The Indian Economy</b>', 'footer: book label')
rep('<span>IB DP Global Politics | Indian Polity | International Relations | PSIR · Understand power, politics and global affairs. <span aria-hidden="true">↗</span>',
    '<span>IB DP Global Politics | International Relations | Indian Polity | PSIR · Power. Politics. Perspectives. <span aria-hidden="true">↗</span>',
    'footer: Political Studies line')
rep('<p class="ft-pos">Arjun Agrawal · Economics: the flagship Economics platform of an academic ecosystem across Economics, Politics and Business, for IB DP Economics, UPSC CSE Economics and the study of the Indian economy.</p></div>',
    '<p class="ft-pos">Arjun Agrawal · Economics: the flagship Economics platform of an academic ecosystem across Economics, Political Studies and Business Management, for IB DP Economics, UPSC CSE Economics and the study of the Indian economy.</p></div>',
    'footer: positioning')
rep('<div><h2>The platforms</h2><ul><li><a class="lnk" href="#/ib">IB DP Economics</a></li><li><a class="lnk" href="#/upsc">UPSC CSE Economics</a></li><li><a class="lnk" href="#/book">The Indian Economy (book)</a></li></ul></div>',
    '<div><h2>Economics</h2><ul><li><a class="lnk" href="#/ib">IB DP Economics</a></li><li><a class="lnk" href="#/upsc">UPSC CSE Economics</a></li></ul>'
    '<h2 class="mt3">Publications</h2><ul><li><a class="lnk" href="#/book">The Indian Economy (book)</a></li><li><a class="lnk" href="#/book/digital-revision-companion">Digital Revision Companion (free)</a></li></ul></div>'
    '<div><h2>Follow</h2><ul class="ft-social"><li><a class="lnk" href="https://www.linkedin.com/in/arjun-agrawal-560405310/" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a></li>'
    '<li><a class="lnk" href="https://instagram.com/imarjun101" target="_blank" rel="noopener noreferrer">Instagram <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a></li>'
    '<li><a class="lnk" href="https://www.youtube.com/@arjunagrawal5724" target="_blank" rel="noopener noreferrer">YouTube <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a></li></ul></div>',
    'footer: platforms, publications, follow')
rep('</div><div class="wrap full ft-res"><span>For more resources:',
    '</div><nav class="wrap full ft-xp" aria-label="Arjun Agrawal | Academic Ecosystem: move between the three platforms">'
    '<span class="ft-xp-k">Arjun Agrawal | Academic Ecosystem</span>'
    '<a class="ft-xp-a on" href="#/" aria-current="true"><b>Economics</b><span>Think like an economist.</span></a>'
    '<a class="ft-xp-a" href="https://arjun-agrawal-political-studies.vercel.app/" target="_blank" rel="noopener noreferrer"><b>Political Studies <span aria-hidden="true">↗</span></b><span>Power. Politics. Perspectives.</span><span class="sr-only"> (opens in a new tab)</span></a>'
    '<a class="ft-xp-a" href="https://the-business-brief-dun.vercel.app/" target="_blank" rel="noopener noreferrer"><b>Business Management <span aria-hidden="true">↗</span></b><span>Strategy. Leadership. Decisions.</span><span class="sr-only"> (opens in a new tab)</span></a>'
    '</nav><div class="wrap full ft-res"><span>For more resources:',
    'footer: cross-platform strip')

P.write_text(s, encoding='utf-8')
print('applied:', ', '.join(done) if done else 'nothing (already applied)')
