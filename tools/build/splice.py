"""Build step: splice src/modules/*.js and src/styles/*.css into index.html between their markers.

The modules load in file-name order (NN-name.js). The JavaScript goes just before the block that
settles the navigation, so every section exists before the bar and the drawer are ordered; the CSS
goes at the end of the first stylesheet, so it wins over earlier rules. Idempotent: running it twice
gives the same file.  Usage: python3 tools/build/splice.py [--out PATH]"""
import sys, os, glob
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SRC = os.path.join(ROOT, 'index.html')
OUT = sys.argv[sys.argv.index('--out') + 1] if '--out' in sys.argv else SRC
STYLES = ['css.css', 'css-course.css', 'css-t6.css']
s = open(SRC, encoding='utf-8').read()
JB, JE = '/* ▓▓ RENAISSANCE:BEGIN ▓▓ */', '/* ▓▓ RENAISSANCE:END ▓▓ */'
CB, CE = '/* ▓▓ REN-CSS:BEGIN ▓▓ */', '/* ▓▓ REN-CSS:END ▓▓ */'
js = '\n'.join(open(f, encoding='utf-8').read() for f in sorted(glob.glob(os.path.join(ROOT, 'src', 'modules', '[0-9][0-9]-*.js'))))
css = '\n'.join(open(os.path.join(ROOT, 'src', 'styles', n), encoding='utf-8').read() for n in STYLES)
if '</script' in js.lower():
    sys.exit('a module contains a literal </script, which would end the inline script early')
def put(s, b, e, body, pos):
    if b in s:
        i, j = s.index(b), s.index(e) + len(e)
        return s[:i] + b + '\n' + body + '\n' + e + s[j:]
    return s[:pos] + b + '\n' + body + '\n' + e + '\n' + s[pos:]
anchor = s.rindex('/* ═', 0, s.index('PARTS 4, 39, 77, 110 · the navigation, settled'))
s = put(s, JB, JE, js, anchor)
if CB in s:
    s = put(s, CB, CE, css, 0)
else:
    k = s.index('</style>'); s = s[:k] + CB + '\n' + css + '\n' + CE + '\n' + s[k:]
open(OUT, 'w', encoding='utf-8').write(s)
print('ok', OUT, len(js), len(css))
