"""2026-11-26 · structured data for the author and the book (idempotent; applied to index.html).

The definitive brief asks the platform to establish Arjun Agrawal as an educator and the author of
The Indian Economy, and suggests structured metadata. This adds two JSON-LD blocks beside the
existing WebSite and Course blocks: a Person (name, the roles the site already states, and the
three public profiles it already links: LinkedIn, Instagram, YouTube; no employer, no
affiliation) and a Book (title, subtitle, edition, author, the 641 numbered pages; no ISBN,
publisher or price, as none has been confirmed). The landing pages are written by
tools/seo/build_landing.py."""
import json, pathlib

P = pathlib.Path(__file__).resolve().parents[2] / 'index.html'
s = P.read_text(encoding='utf-8')
SITE = 'https://ib-economics-pi.vercel.app/'
person = {"@context": "https://schema.org", "@type": "Person", "@id": SITE + "#arjun-agrawal", "name": "Arjun Agrawal",
          "url": SITE + "#/about", "image": SITE + "assets/brand/arjun-agrawal-portrait-4x5.webp",
          "jobTitle": "Economics educator, academic resource creator and author",
          "knowsAbout": ["Economics", "IB Diploma Programme Economics", "UPSC Civil Services Examination Economics", "The Indian economy",
                         "Political Studies", "Business Management"],
          "sameAs": ["https://www.linkedin.com/in/arjun-agrawal-560405310/", "https://instagram.com/imarjun101",
                     "https://www.youtube.com/@arjunagrawal5724"]}
book = {"@context": "https://schema.org", "@type": "Book", "name": "The Indian Economy",
        "alternativeHeadline": "A Comprehensive Academic and Examination Reference", "bookEdition": "First Edition, 2026-27",
        "numberOfPages": 641, "inLanguage": "en", "author": {"@id": SITE + "#arjun-agrawal"},
        "url": SITE + "the-indian-economy/", "image": SITE + "assets/book/the-indian-economy/cover.webp"}
block = ('<script type="application/ld+json" data-ld="person">' + json.dumps(person, ensure_ascii=False) + '</script>\n'
         '<script type="application/ld+json" data-ld="book">' + json.dumps(book, ensure_ascii=False) + '</script>\n')
if 'data-ld="person"' in s:
    print('nothing (already applied)')
else:
    anchor = '<meta name="theme-color" content="#16181C">'
    assert s.count(anchor) == 1, 'anchor'
    s = s.replace(anchor, block + anchor)
    P.write_text(s, encoding='utf-8')
    print('applied: person and book structured data')
