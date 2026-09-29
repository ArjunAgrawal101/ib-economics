# Content architecture

**Release:** the content, pedagogy and knowledge-architecture release.
**Content version:** `course-2026.09.1` (hash `826cf71c14edddac`), built 2026-09-29, sources checked 2026-09-29.

This document says what the platform's learning content is made of, where each part lives, where each
claim comes from, how it was reviewed, and where the gaps are. The coverage matrix at the end is
generated from the live data, not written by hand, and it shows every zero.

## 1. Principles

- **Accuracy comes first.** The priorities are accuracy, then completeness, clarity, connections,
  application, evaluation, assessment and visuals, in that order.
- **One lesson per subtopic, and no duplicate pages.** The earlier topic dossier became the lesson,
  and its address still works.
- **Every IB claim has provenance.** Teacher-created material is labelled as teacher-created, and
  original writing is labelled as original.
- **No manufactured data.** Invented numbers exist only in practice exercises, where they are
  labelled as illustrative. Real episodes carry no statistics that could not be checked.
- **Depth comes from structure, not length.** A core page teaches the topic; "Go deeper" rewards
  curiosity. Foundation, Core and Deeper describe the content, not the reader.

## 2. Source hierarchy

| Tier | Source | Status here | How it is used |
|---|---|---|---|
| 1 | IB Economics guide, first assessment 2022 | Supplied PDF; text extracted and checked | Syllabus structure, content, HL status, command terms, assessment outline. Page references use the PDF page. |
| 2 | IB Economics teacher support material 2022 | Supplied PDF | Pedagogical structure only; not quoted. |
| 2 | Diploma Programme Assessment Procedures 2026 | **Not available** | Nothing is stated from it. |
| 3 | Economics, Ellie Tragakes, 3rd edition (Cambridge, 2020) | **Not available** | Not used, and not reproduced. |
| 4 | Curriculum Architecture & Strategic Teaching Roadmap (Arjun Agrawal) | Supplied PDF | Sequencing and difficulty, labelled TEACHER-CREATED. |
| 4 | IB Economics Misconception Database (Arjun Agrawal) | Supplied PDF, 51 entries | The student and teacher views, labelled TEACHER-CREATED. |
| 4 | How to Think Like an IB Economics Examiner (Arjun Agrawal) | Supplied PDF | Read for interpretation. Where it differs from the guide, the guide wins (see section 8). |
| — | IB Academic Integrity Policy; Programme Standards and Practices | **Not available** | Policy detail is marked "Verification required". |
| 5 | Original writing for this platform | 127,992 words in the 31 lessons | Labelled ARJUN AGRAWAL ANALYSIS. |

Source labels shown on pages: IB OFFICIAL, TEACHER-CREATED and ARJUN AGRAWAL ANALYSIS. The Real World
corpus keeps its own per-case source classes (government data, international organisation, academic
source, news source).

## 3. Syllabus structure: the guide wins

The brief listed 31 subtopics. The guide's own syllabus outline (PDF pp. 26–27) differs in ways that
matter, so the platform follows the guide and records every difference here.

| Brief | The guide (2022) | What the platform does |
|---|---|---|
| 2.5 Elasticities (demand and supply together) | 2.5 Elasticity of demand; 2.6 Elasticity of supply | Follows the guide. |
| 2.6 Role of government; 2.7 Market failure | 2.7 Role of government; 2.8 externalities and common pool resources; 2.9 public goods | Follows the guide. |
| 2.4 Behavioural economics | 2.4 Critique of the maximizing behaviour of consumers and producers (HL only per PDF p. 33) | Follows the guide's title and level. |
| 4.2 Trade protection; 4.3 Economic integration | 4.2 Types of trade protection; 4.3 Arguments for and against trade control; 4.4 Economic integration | Follows the guide. |
| 4.4 Exchange rates; 4.5 BoP; 4.6 Terms of trade | 4.5 Exchange rates; 4.6 Balance of payments; **no terms of trade** | Follows the guide. The terms of trade appear only as context, marked as outside the 2022 guide. |

Teaching hours per unit are the guide's own: 10/10, 35/70, 40/75 and 45/65 (SL/HL, PDF p. 26), out of
150/240 in total including 20 for the IA (p. 27).

## 4. The data model

Everything is structured data with stable identifiers. No new framework was introduced: the course
layer is one JSON document in `assets/data/course.js`, loaded before the application and cached by
the service worker for offline use.

| Entity | Identifier | Where | Count |
|---|---|---|---|
| Subtopic / lesson (learning spine) | `2.5` | `COURSE.spines` | 31 |
| Unit | `unit-2` | derived from the syllabus | 4 |
| Key concept | `Intervention` | `COURSE.concepts` (+ `GUIDE.kc`) | 9 |
| Glossary term | the term | `COURSE.gloss` | 250 |
| Comparison | `infl-defl-disinfl` | `COURSE.compare` | 24 |
| Command term | `Evaluate` | `COURSE.ct` (official wording from `GUIDE.ct`) | 33 |
| Misconception | `MIC-04` | `COURSE.misc` | 51 |
| Model card | lesson + index | `COURSE.spines[c].models` | 67 |
| Diagram | `tax`, `ped` … | `DG` in index.html | 36 |
| Calculation | `ped`, `yed` … | `CALC` in index.html | 36 |
| Case | `MIC-001` … | `RW_CASES` (assets/data/real-world.js) | 203 |
| Real-world issue | `rw1` … `rw6` | `RWI` + `COURSE.intel` | 6 |
| Checklist | `can-i-do-this` | `COURSE.checklists` + generated | 15 |
| Lens question | 1–17 | `COURSE.lens` | 17 |

**Relationships, used for navigation rather than decoration:**
- lesson → prerequisite lessons (`before[].sub`) and next lesson (`next`);
- lesson → connected lessons (`connect`);
- lesson → key concepts (`kc`), diagrams (plates filed under it and its model cards), calculations,
  cases, misconceptions and glossary terms;
- concept → the contexts it behaves differently in (`worlds`);
- real-world issue → an eight-stage path from concept to exam;
- misconception → the lessons it is filed under.

"What should I study next?" and revision mode read only these explicit links and the student's own
ticks. Nothing else is inferred, and the page says so.

## 5. Where each system lives

| System | Address | Built on |
|---|---|---|
| Lessons and units | Course › Topics (`#/course/topics/2.5`, `…/unit-2`) | The former topic dossier; its old address is an alias |
| Glossary 2.0 and compare terms | Course › Dictionary | The earlier dictionary |
| Command Terms 2.0 | Course › Command terms | The earlier command-term lab |
| Concept network | Course › Key concepts | The earlier key-concepts page |
| Economics Intelligence | Course › Real-world issues | The earlier real-world issues page |
| Checklists | Course › Checklists | New tab |
| Misconception database | Learn › Misconception lab | The earlier misconception lab |
| The Economist's Lens | Think › Economist's toolkit | The earlier toolkit |
| Revision mode | Practise › Ten-minute revision | The earlier retrieval queue |
| Paper 1–3 guidance and economic writing | Exam practice › Paper 1/2/3 | The earlier workshops |
| Academic integrity | IA › Academic integrity | New tab; every IA page carries a learning-support line |
| Snapshot mindmaps and print | Mindmaps (`#/mind/mindmaps/snap-2.5`, `snap-u2`, `snap-course`) | The earlier mindmaps |
| Diagram Atlas 2.0 | Lab › Diagram atlas › any plate | The earlier atlas |
| Calculation card | Calculate › any calculation | The earlier Calculation Board |

## 6. How the content was made and reviewed

1. **Inventory.** Every subtopic's guide content, existing diagrams, calculations, terms, cases and
   maps were extracted into one inventory.
2. **Writing.** Fifteen writers produced the 31 lessons, the misconception views, the glossary,
   the command-term guidance, the paper guidance, the checklists, the integrity guidance, the concept
   network, the lens and the six issue paths. They worked under one set of rules on originality,
   provenance, hedged evidence and British English.
3. **Adversarial review.** Six reviewers went over economics by unit (four of them), IB compliance with
   integrity and originality, and the glossary. Findings by file:
   - rt-1.json: 13 major, 19 minor
   - rt-2.json: 2 major, 19 minor
   - rt-3.json: 2 major, 28 minor
   - rt-4.json: 2 critical, 2 major, 21 minor
   - rt-5.json: 1 major, 14 minor
   - rt-6.json: 2 major, 23 minor
4. **Patching.** Every finding was applied as an exact, addressed substring replacement: 150 patches,
   none guessed. Near-duplicate glossary entries were merged into aliases.
5. **HL typography check.** The guide sets HL-only topics, diagrams and calculations in bold (PDF p. 30).
   Every bold line on the syllabus pages (PDF pp. 30–62) was read from the PDF's font data and compared
   with the lessons.
   - This confirmed, for example, that "Average and marginal tax rates" in 3.4 is HL only.
   - It found HL-only content taught without a label inside five SL lessons: primary commodities in
     2.5 and 2.6; the multiplier, crowding out and automatic stabilisers in 3.6; the monetary-union
     trade-off in 4.4; and Marshall–Lerner and the J-curve in 4.6.
   - 17 further patches label them. A self-test now keeps them labelled.
6. **Existing content.** Errors the writers found in earlier material were corrected in place. These
   include plain-English definitions that restated a misconception, impossible practice stems,
   question-frequency claims, the remittances/GNI note, unlabelled HL-only calculations and the
   externality welfare-loss formula.
7. **Build checks.** No structural errors, no absolute wording in the platform's voice and no
   question-frequency claims (counts: 0 errors, 0 absolutes,
   0 frequency claims).

## 7. Coverage matrix

Counts per subtopic. **0** marks a gap. "Mindmaps" counts the generated snapshot plus any hand-drawn
network map. "Practice questions" are the lesson's own original questions; Exam DNA and the question
bank are counted separately in their own sections.

| Subtopic | Core blocks | Key concepts | Glossary terms | Model cards | Diagrams | Calculations | Mechanism chains | Real World cases | Evidence | Misconception DB | Misconception checks | Mindmaps | Command terms | Practice questions | Videos | IA | EE | TOK | Teacher mode | Go deeper |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1.1 What is economics? | 7 | 3 | 17 | 2 | 2 | **0** | 2 | **0** | 1 | **0** | 3 | 2 | 6 | 3 | 1 | 1 | 1 | 1 | 1 | 4 |
| 1.2 How do economists approach the world? | 6 | 3 | 6 | 2 | 1 | 1 | 2 | **0** | 1 | **0** | 3 | 2 | 6 | 3 | **0** | 1 | 1 | 1 | 1 | 4 |
| 2.1 Demand | 6 | 3 | 10 | 1 | 1 | **0** | 1 | 1 | 1 | 1 | 3 | 2 | 6 | 3 | **0** | 1 | 1 | 1 | 1 | 3 |
| 2.2 Supply | 7 | 3 | 5 | 1 | 1 | **0** | 1 | **0** | 1 | 2 | 3 | 2 | 6 | 3 | **0** | 1 | 1 | 1 | 1 | 3 |
| 2.3 Competitive market equilibrium | 6 | 2 | 9 | 2 | 1 | 2 | 2 | 1 | 1 | 2 | 3 | 2 | 6 | 3 | 2 | 1 | 1 | 1 | 1 | 4 |
| 2.4 Critique of the maximizing behaviour of consumers and producers (HL) | 6 | 3 | 10 | 2 | **0** | **0** | 2 | 2 | 1 | 1 | 3 | 2 | 6 | 3 | **0** | 1 | 1 | 1 | 1 | 4 |
| 2.5 Elasticities of demand | 7 | 3 | 9 | 2 | 1 | 3 | 2 | **0** | 1 | 3 | 3 | 2 | 6 | 4 | 4 | 1 | 1 | 1 | 1 | 4 |
| 2.6 Elasticity of supply | 6 | 2 | 2 | 2 | 1 | 1 | 2 | 3 | 1 | 1 | 3 | 2 | 6 | 3 | **0** | 1 | 1 | 1 | 1 | 4 |
| 2.7 Role of government in microeconomics | 7 | 3 | 6 | 5 | 4 | 5 | 3 | 16 | 1 | 6 | 3 | 2 | 9 | 4 | 2 | 1 | 1 | 1 | 1 | 7 |
| 2.8 Market failure: externalities and common pool or common access resources | 7 | 3 | 16 | 5 | 5 | 1 | 3 | 21 | 1 | 3 | 3 | 2 | 9 | 4 | 2 | 1 | 1 | 1 | 1 | 7 |
| 2.9 Market failure: public goods | 7 | 3 | 4 | 2 | 1 | **0** | 2 | 1 | 1 | 1 | 3 | 2 | 8 | 3 | **0** | 1 | 1 | 1 | 1 | 4 |
| 2.10 Market failure: asymmetric information (HL) | 5 | 2 | 5 | 2 | 1 | **0** | 2 | 1 | 1 | 1 | 3 | 2 | 6 | 4 | **0** | 1 | 1 | 1 | 1 | 4 |
| 2.11 Market failure: market power (HL) | 6 | 3 | 18 | 2 | 1 | 2 | 2 | 8 | 1 | 2 | 3 | 2 | 7 | 4 | 4 | 1 | 1 | 1 | 1 | 4 |
| 2.12 The market's inability to achieve equity (HL) | 5 | 2 | 1 | 2 | 3 | **0** | 1 | **0** | 1 | **0** | 3 | 2 | 5 | 3 | **0** | 1 | 1 | 1 | 1 | 4 |
| 3.1 Measuring economic activity and illustrating its variations | 6 | 3 | 9 | 2 | 2 | 5 | 1 | **0** | 1 | 2 | 3 | 2 | 6 | 3 | 1 | 1 | 1 | 1 | 1 | 4 |
| 3.2 Variations in economic activity: aggregate demand and aggregate supply | 7 | 3 | 9 | 2 | 4 | **0** | 2 | 6 | 1 | 5 | 3 | 2 | 6 | 4 | 3 | 1 | 1 | 1 | 1 | 4 |
| 3.3 Macroeconomic objectives | 7 | 3 | 16 | 2 | 4 | 4 | 1 | 14 | 1 | 9 | 3 | 2 | 6 | 4 | 2 | 1 | 1 | 1 | 1 | 4 |
| 3.4 Economics of inequality and poverty | 7 | 3 | 15 | 1 | 1 | 2 | 2 | **0** | 1 | **0** | 3 | 2 | 7 | 3 | 1 | 1 | 1 | 1 | 1 | 3 |
| 3.5 Demand management (demand-side policies): monetary policy | 6 | 3 | 11 | 2 | 3 | 1 | 2 | 11 | 1 | 2 | 3 | 2 | 8 | 4 | 1 | 1 | 1 | 1 | 1 | 4 |
| 3.6 Demand management: fiscal policy | 7 | 3 | 8 | 3 | 5 | 1 | 2 | 14 | 1 | 5 | 3 | 2 | 9 | 4 | 1 | 1 | 1 | 1 | 1 | 6 |
| 3.7 Supply-side policies | 7 | 3 | 6 | 2 | 3 | **0** | 2 | 5 | 1 | 2 | 3 | 2 | 8 | 3 | 2 | 1 | 1 | 1 | 1 | 5 |
| 4.1 Benefits of international trade | 6 | 3 | 3 | 2 | 1 | 2 | 1 | 7 | 1 | 2 | 3 | 2 | 8 | 3 | 1 | 1 | 1 | 1 | 1 | 4 |
| 4.2 Types of trade protection | 6 | 3 | 5 | 3 | 2 | 2 | 2 | 9 | 1 | 3 | 3 | 2 | 8 | 4 | 3 | 1 | 1 | 1 | 1 | 5 |
| 4.3 Arguments for and against trade control/protection | 6 | 3 | 2 | 2 | 1 | **0** | 2 | 2 | 1 | 1 | 3 | 2 | 8 | 3 | **0** | 1 | 1 | 1 | 1 | 4 |
| 4.4 Economic integration | 7 | 3 | 8 | 1 | 1 | **0** | 2 | 13 | 1 | 1 | 3 | 2 | 6 | 3 | **0** | 1 | 1 | 1 | 1 | 3 |
| 4.5 Exchange rates | 7 | 3 | 9 | 2 | 2 | 2 | 2 | 13 | 1 | 4 | 3 | 2 | 7 | 4 | 1 | 1 | 1 | 1 | 1 | 4 |
| 4.6 Balance of payments | 7 | 3 | 11 | 3 | 2 | 1 | 2 | 6 | 1 | 4 | 3 | 2 | 7 | 3 | 1 | 1 | 1 | 1 | 1 | 5 |
| 4.7 Sustainable development | 6 | 2 | 2 | 2 | 1 | **0** | 2 | 2 | 1 | **0** | 3 | 2 | 5 | 3 | 1 | 1 | 1 | 1 | 1 | 4 |
| 4.8 Measuring development | 6 | 2 | 5 | 2 | **0** | **0** | 1 | 3 | 1 | 2 | 3 | 2 | 5 | 3 | 1 | 1 | 1 | 1 | 1 | 4 |
| 4.9 Barriers to economic growth and/or economic development | 6 | 2 | 6 | 2 | 2 | **0** | 2 | 11 | 1 | 1 | 3 | 2 | 5 | 3 | **0** | 1 | 1 | 1 | 1 | 4 |
| 4.10 Economic growth and/or economic development strategies | 7 | 2 | 7 | 2 | 3 | **0** | 2 | 33 | 1 | **0** | 3 | 2 | 7 | 4 | **0** | 1 | 1 | 1 | 1 | 4 |

## 8. Gaps, and what was done about them

- **Real World cases: none filed under 1.1, 1.2, 2.2, 2.5, 2.12, 3.1, 3.4.** No case was invented to fill a
  cell. Each of these lessons carries real-world illustrations in its model cards, written with hedged
  evidence and no statistics. New cases need sourced facts, which is recorded as future work.
- **Curated videos: none for 1.2, 2.1, 2.2, 2.4, 2.6, 2.9, 2.10, 2.12, 4.3, 4.4, 4.9, 4.10.** Videos are external and curated by hand.
- **Misconception database: no entries for 1.1, 1.2, 2.12, 3.4, 4.7, 4.10.** The database is the teacher's
  51 entries and was not extended with invented ones. Each of these lessons still has three
  misconception checks of its own, and its model cards name the common mistakes.
- **Diagrams: none for 2.4, 4.8.** The guide requires none for these subtopics.
- **The textbook** was not available, so nothing in the platform derives from it.
- **Items marked "Verification required"** concern IB policy detail the platform could not check:
  academic-integrity policy, current extended essay rules and the acknowledgement of AI use.
- **The teacher's examiner guide** says calculators are "required" in Papers 2 and 3, that Paper 2 (a)
  is "definitions", and that diagrams should be drawn in "black pen". The guide says none of these,
  and its definition of "draw" specifies pencil. The platform does not repeat these claims.
