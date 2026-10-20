import json, re, os, sys
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "build")
S = json.load(open(os.path.join(D, "s2_cards.json")))
ids = [int(x) for x in sys.argv[2].split(",")]
HEAD = ("Layout edit. For each card listed below, replace that card's entire content and layout with EXACTLY the markup given, "
        "keeping its position in the deck. Keep all text, image URLs, colspans, padding, heights and colours exactly as written. "
        "Do not add, generate or substitute any images, icons or shapes. Do not change any other card. Keep the deck's header and footer.\n\n")
txt = HEAD
for i in ids:
    t = re.sub(r"<[^>]+>", "", (re.search(r"<h[12][^>]*>(.*?)</h[12]>", S[i-1]) or [None, ""])[1])
    txt += f"=== CARD {i} (title: {t}) ===\n{S[i-1]}\n\n"
txt += sys.argv[3] if len(sys.argv) > 3 else ""
open(os.path.join(D, sys.argv[1]), "w").write(txt.strip())
print(len(txt))
