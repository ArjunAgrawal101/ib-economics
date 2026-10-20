import json, re, os
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "build")
S = json.load(open(os.path.join(D, "s2_cards.json")))
titles = [re.sub(r"<[^>]+>", "", (re.search(r"<h[12][^>]*>(.*?)</h[12]>", s) or [None, ""])[1]) for s in S]
HEAD = ("Layout edit. For each card listed below, replace that card's entire content and layout with EXACTLY the markup given, "
        "keeping its position in the deck. Keep all text, image URLs, colspans, padding, heights and colours exactly as written. "
        "Do not add, generate or substitute any images, icons or shapes. Do not change any other card. Keep the deck's header and footer.\n\n")
batches, cur, size = [], [], len(HEAD)
for i, s in enumerate(S, 1):
    block = f"=== CARD {i} (title: {titles[i-1]}) ===\n{s}\n\n"
    if (size + len(block) > 9400 or len(cur) >= 6) and cur:
        batches.append(cur); cur, size = [], len(HEAD)
    cur.append((i, block)); size += len(block)
batches.append(cur)
for k, b in enumerate(batches, 1):
    txt = HEAD + "".join(x for _, x in b)
    open(os.path.join(D, f"batch{k:02d}.txt"), "w").write(txt)
    print(k, [i for i, _ in b], len(txt))
