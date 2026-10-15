# Learning Studio: adding, updating and retiring a resource

The Learning Studio shows a selection of original work in part. It shows real excerpts, an account of how each piece teaches, and a way to ask about it. The complete resources are never published. This page describes the workflow. It needs no database, account or CMS: one manifest file, the preview images, and two build commands.

## The five kinds of material, kept apart

| What | Where it lives | Public? |
|---|---|---|
| The learning platform (cases, mindmaps, labs…) | `index.html`, `src/modules/`, `assets/data/` | Yes, by design |
| Showcase metadata (titles, descriptions, objectives, preview paths) | `content/studio/showcase.json` | Yes: everything in it is published |
| Preview images (screen-resolution excerpts) | `assets/studio/<item>/` | Yes |
| Master resources (full decks, PDFs, apps) | **Outside this repository** | No |
| The internal inventory and notes | **Outside this repository** | No |

This repository is public, and everything committed to it can be downloaded. That includes every branch and every file in `docs/`. Masters and the internal inventory therefore never go into it, not even in a hidden folder. `.gitignore` excludes `private/` and `masters/` as a safety net, but the rule is to keep them elsewhere.

A password screen, a blurred image or a hidden button in the browser is not access control. If a file is in the deployed site, anyone can fetch it.

## Disclosure levels

- **Level 1, public showcase.** Title, description, objectives and a few excerpts. Most items are level 1.
- **Level 2, limited demonstration.** A working miniature, or a part of the work that is already open on the platform.
- **Level 3, private.** Complete resources, full-resolution masters, complete applications, question banks and teacher-only material. These never appear in the manifest. The build refuses level 3.

## Adding a resource

1. **Make the previews.** Keep a `previews.json` beside your private masters, outside the repository: its recipes name the masters' files, so it is private too. Each recipe gives:
   - the output path, such as `<item-id>/01-name.webp`;
   - the master's path relative to the masters folder;
   - for a PDF, the page;
   - optionally a crop, as fractions `[left, top, right, bottom]`;
   - the width;
   - optionally `bg`, the colour a transparent master is laid on (default `FFFDF8`, the decks' panel colour);
   - optionally `pad`, a margin in the same colour, as a fraction of the width (the decks use `0.03`).

   The full shape is at the top of `tools/studio/build_previews.py`. Then run:

   ```
   python3 tools/studio/build_previews.py --masters /path/outside/the/repo --only <item-id>
   ```

   It writes WebP excerpts of at most 1,200 px to `assets/studio/<item-id>/`. Each one carries a discreet footer strip reading "Selected preview · Arjun Agrawal". It opens masters read-only, never copies them, and refuses to run if the masters or the recipes are inside the repository.

   Choose excerpts that teach something on their own, and check every figure and label on them. Crop to complete regions or branches, never through a word or a box. If an excerpt shows an error, correct the master at its source and rebuild it, rather than hiding it with a crop or a caption. Do not excerpt anything that reproduces IB examination papers, markschemes, grade boundaries or other third-party material.

2. **Describe it.** Add an entry to `items` in `content/studio/showcase.json`. The fields are:

   | Field | Meaning |
   |---|---|
   | `id` | lower-case words joined by hyphens; it becomes the page address |
   | `status` | `published`, `draft` (kept but not shown) or `retired` (removed from the site) |
   | `disclosure` | `1` or `2` |
   | `type` | `visual`, `guide`, `interactive` or `collection` |
   | `treatment` | `A` (visual: excerpts open in a viewer), `B` (interactive: a working miniature or a walkthrough), `C` (collection: a learning journey) |
   | `exhibit` | `visual`, `editorial`, `interactive` or `series`: the form the item takes in exhibitions (see `docs/design-system.md`) |
   | `verified` | the date the content was checked, as `YYYY-MM-DD`. A published item must have one |
   | `checks` | one public sentence saying what was checked, such as "All slides read; every figure on the excerpts recomputed" |
   | `title`, `kicker` | the name, and a short line such as "Visual explainer · Unit 2.5" |
   | `topics`, `level`, `audience`, `format`, `previewFormat` | facts shown beside the resource |
   | `summary` | one or two sentences on what it is |
   | `objectives` | what it helps learners do |
   | `approach` | the thinking behind it, in two or three sentences |
   | `inside` | what the complete resource contains (titles only) |
   | `previews` | `src` (path inside `assets/studio/`), `alt` (describe the economics shown, at least 40 characters) and `cap` |
   | `related` | links to the platform, as app routes beginning `#/` |
   | `enquiry` | one of the keys in `enquiries`, such as `resource`, `school` or `collaboration` |
   | `interaction` (optional) | `{ "kind": "demo", "demo": "ped-revenue", "live": "#/lab" }` or `{ "kind": "walkthrough", "note": "…" }` |
   | `collection` (optional) | `{ "from": "c60" }` or `{ "from": "mindmaps", "journey": [map ids] }` |

   Never add a file path to a master, a download link to a private file, or an internal note. The build rejects keys such as `source`, `path`, `private` and `notes`. It also rejects values that look like document files or private locations.

3. **Build.**

   ```
   python3 tools/studio/build_studio.py     # validates, then writes the app module, studio/ pages and sitemap.xml
   python3 tools/build/splice.py            # puts the module into index.html
   ```

4. **Check.**

   ```
   node tests/studio.mjs                    # the Studio, its links, the enquiry links and the privacy scan
   node tests/run-all.mjs                   # everything
   ```

5. **Ship.** Bump `VERSION` in `service-worker.js` so returning visitors receive the new page. Then commit and open a pull request.

## Updating or retiring

- **Update.** Edit the entry, rebuild the previews if the excerpts change, then run the build.
- **Retire.** Set `"status": "retired"` and rebuild. The item leaves the Studio, search and the sitemap, and its static page is removed. Delete its folder in `assets/studio/` if the excerpts should no longer be downloadable.
- **Draft.** Set `"status": "draft"` to keep an entry in the manifest without showing it. A draft entry is still public in the repository, so it must still contain level 1 information only.

## Categories

The Studio shows only the types that have real items. The self-test "Studio · only categories with real resources are offered" fails if a type has fewer than two. Add a new type only when there are resources for it.

## Enquiries

Enquiries open the visitor's own email app or WhatsApp with a short message started. They go to the address and number the site already publishes. Nothing is sent from the site and nothing is stored. To take enquiries through a form instead, a form service or a server function would need to be configured on the host. Until then, do not add a form.
