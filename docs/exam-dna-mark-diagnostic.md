# Exam DNA: part marks that do not add up — diagnostic

Prepared 25 September 2026 from `assets/data/exam-dna.js` (the file's own analysis date is 22 September 2026).
**No record was changed.** Every figure below is read from the data file by a script that adds up each
question's recorded part marks and compares the sum with its recorded total. The file holds no question
text, and neither does this report.

## Summary

- 212 question records; **63 have part marks that do not add up to the recorded total.**
- **2 more** add up but hold their (b) marks under a part labelled `s`; Paper 1 has only (a) and (b).
  They are listed separately at the end.
- The other 147 records add up. For Paper 1, 105 of the 127 records show the expected (a) 10 + (b) 15.

| Group | Records |
|---|---|
| Paper 1: part (b) missing, only (a) 10 recorded | 12 |
| Paper 1: an extra part `s` recorded alongside (a) and (b) | 10 |
| Paper 1: total recorded as 35 | 1 |
| Paper 2, current guide (40-mark questions) | 14 |
| Paper 2, previous guide (20-mark questions, 2020–2021) | 20 |
| Paper 3 | 6 |
| **Total** | **63** |

## Is this a source problem or a parsing problem?

**A parsing (extraction) problem, on the evidence in the data — not a problem in the papers.**

1. **The errors have the shapes extraction errors take.** A part is dropped: twelve Paper 1 questions
   record only (a) 10 against a total of 25. A part is invented: ten records add a part `s` of 6, 9 or 12
   marks next to a complete (a) 10 + (b) 15, and two more hold the (b) marks under `s`. Labels are
   duplicated or split: `d` and `e` appear twice in one Paper 3 record, and one part is labelled `i` on
   its own. One sub-part is recorded both whole and split (`b = 3` next to `b.ii = 2`).
2. **The totals are the stable field; the part lists are not.** Almost every recorded total is the standard
   figure for its paper (25, 40 or 30; 20 and 25 for the previous guide). A printed paper states each part's
   marks, and they add up to the question total; here it is the part lists that are inconsistent.
3. **Part values collide with the paper's structure.** Five current-guide Paper 2 records store part (g) as
   1 or 3 marks and one has no (g) at all, where the other 36 store 15.
4. **Four totals are themselves off-pattern:** 35 on one Paper 1 question, 41 on one Paper 2 question, and 32
   and 28 on two Paper 3 questions. These look like misread totals, but only the papers can confirm it.

There is no extraction code in this repository (the data file was supplied already built), so the parser
itself cannot be inspected or re-run here.

## What the mismatch affects

The part marks drive the *pattern* matching in Exam DNA (for example "Explain, 9 marks or more" or
"Evaluate or Discuss, 14 marks or more") and the mark shown on each part. A dropped (b) hides a 15-mark
Evaluate from those counts; a (g) stored as 3 marks falls into the short-answer patterns. Counts by topic,
command term and skill flag do not depend on marks. The heatmap already says that some mark allocations
are incomplete and awaiting re-extraction.

## The correct remediation

1. **Do not correct marks from the structure alone.** Setting every Paper 1 (b) and every Paper 2 (g) to 15
   is tempting, but the smaller parts (the 1s to 7s in Paper 2 and Paper 3) cannot be inferred, and a guessed
   value would look as authoritative as a real one.
2. **Re-extract the listed questions from the source papers.** The question papers are enough: each part's
   marks are printed beside it. The markschemes are a useful cross-check. Record, for each part, the label,
   marks, command term, subtopic and flags, as now.
3. **Then switch on the six checks that are currently held back,** so this cannot recur: part marks sum to
   the total; current-guide totals are 25, 40 and 30; Paper 2 (g) is 15 marks with the data flag;
   Define/State parts are at most 2 marks; Paper 1 has only (a) and (b); no empty subtopic codes.
4. **Update both copies** (`assets/data/exam-dna.js` and `__DNA_FALLBACK__` in `index.html`) and the data
   hash together, as is done for the Real World data.
5. **Until then**, one safe interim step would change no value: mark these 65 records as
   *marks under review* and leave them out of the mark-based patterns only. It has not been done, because
   you asked for no automatic change.

## Source papers needed

The 65 affected questions are in these 38 papers. "No time zone" is the data file's TZ0.

| Paper | Questions to read |
|---|---|
| May 2021 · Paper 1 · HL · TZ2 | Q3 |
| May 2021 · Paper 2 · HL · no time zone | Q1, Q2, Q3, Q4 |
| May 2021 · Paper 2 · SL · no time zone | Q1, Q2, Q3, Q4 |
| May 2021 · Paper 3 · HL · no time zone | Q1 |
| May 2022 · Paper 2 · HL · no time zone | Q1, Q2 |
| May 2022 · Paper 2 · SL · no time zone | Q1 |
| May 2022 · Paper 3 · HL · no time zone | Q2 |
| May 2023 · Paper 1 · HL · TZ1 | Q3 |
| May 2023 · Paper 1 · HL · TZ2 | Q1, Q2 |
| May 2023 · Paper 1 · SL · TZ1 | Q1 |
| May 2023 · Paper 1 · SL · TZ2 | Q1, Q2, Q3 |
| May 2024 · Paper 1 · HL · TZ1 | Q2 |
| May 2024 · Paper 1 · SL · TZ1 | Q2 |
| May 2024 · Paper 2 · HL · TZ2 | Q1 |
| May 2024 · Paper 2 · SL · TZ2 | Q1 |
| May 2025 · Paper 1 · HL · TZ1 | Q1, Q2 |
| May 2025 · Paper 1 · SL · TZ1 | Q1 |
| May 2025 · Paper 1 · SL · TZ3 | Q1 |
| November 2020 · Paper 2 · HL · no time zone | Q1, Q2, Q4 |
| November 2020 · Paper 2 · SL · no time zone | Q1, Q3, Q4 |
| November 2020 · Paper 3 · HL · no time zone | Q1, Q3 |
| November 2021 · Paper 1 · SL · no time zone | Q1 |
| November 2021 · Paper 2 · HL · no time zone | Q1, Q2, Q3, Q4 |
| November 2021 · Paper 2 · SL · no time zone | Q2, Q4 |
| November 2022 · Paper 1 · SL · no time zone | Q2 |
| November 2022 · Paper 2 · HL · no time zone | Q1, Q2 |
| November 2022 · Paper 2 · SL · no time zone | Q1, Q2 |
| November 2022 · Paper 3 · HL · no time zone | Q1, Q2 |
| November 2023 · Paper 1 · SL · TZ1 | Q2 |
| November 2023 · Paper 2 · HL · no time zone | Q1 |
| November 2023 · Paper 2 · SL · no time zone | Q1, Q2 |
| November 2024 · Paper 1 · SL · TZ1 | Q1 |
| November 2024 · Paper 1 · SL · TZ2 | Q1, Q2, Q3 |
| November 2024 · Paper 2 · HL · no time zone | Q2 |
| November 2024 · Paper 2 · SL · no time zone | Q2 |
| November 2025 · Paper 1 · HL · TZ1 | Q2, Q3 |
| November 2025 · Paper 1 · HL · TZ3 | Q2 |
| Specimen paper · Paper 1 · HL · no time zone | Q1 |

## Every mismatched record

"Sum − total" is the sum of the recorded part marks minus the recorded total. The last column says what is
wrong in the record; it does not say what the right value is.

| Record | Session | Question | Recorded total | Recorded parts | Sum of parts | Sum − total | What is wrong in the record |
|---|---|---|---|---|---|---|---|
| 21N.1.SL.TZ0.1 | November 2021 (previous guide) | P1 SL TZ0 Q1 | 25 | (a) 10, (b) 15, (s) 6 | 31 | +6 | extra part labelled "s" (6 marks) alongside (a) and (b); Paper 1 questions have only (a) and (b) |
| 22N.1.SL.TZ0.2 | November 2022 | P1 SL TZ0 Q2 | 25 | (a) 10, (b) 15, (s) 6 | 31 | +6 | extra part labelled "s" (6 marks) alongside (a) and (b); Paper 1 questions have only (a) and (b) |
| 23M.1.HL.TZ1.3 | May 2023 | P1 HL TZ1 Q3 | 25 | (a) 10 | 10 | -15 | part (b) missing: only (a) was recorded |
| 23M.1.HL.TZ2.1 | May 2023 | P1 HL TZ2 Q1 | 25 | (a) 10 | 10 | -15 | part (b) missing: only (a) was recorded |
| 23M.1.HL.TZ2.2 | May 2023 | P1 HL TZ2 Q2 | 25 | (a) 10 | 10 | -15 | part (b) missing: only (a) was recorded |
| 23M.1.SL.TZ1.1 | May 2023 | P1 SL TZ1 Q1 | 25 | (a) 10 | 10 | -15 | part (b) missing: only (a) was recorded |
| 23M.1.SL.TZ2.1 | May 2023 | P1 SL TZ2 Q1 | 25 | (a) 10 | 10 | -15 | part (b) missing: only (a) was recorded |
| 23M.1.SL.TZ2.2 | May 2023 | P1 SL TZ2 Q2 | 25 | (a) 10 | 10 | -15 | part (b) missing: only (a) was recorded |
| 23M.1.SL.TZ2.3 | May 2023 | P1 SL TZ2 Q3 | 25 | (a) 10 | 10 | -15 | part (b) missing: only (a) was recorded |
| 23N.1.SL.TZ1.2 | November 2023 | P1 SL TZ1 Q2 | 35 | (a) 10, (b) 15 | 25 | -10 | recorded total 35; every other Paper 1 question in the file totals 25 |
| 24M.1.HL.TZ1.2 | May 2024 | P1 HL TZ1 Q2 | 25 | (a) 10 | 10 | -15 | part (b) missing: only (a) was recorded |
| 24M.1.SL.TZ1.2 | May 2024 | P1 SL TZ1 Q2 | 25 | (a) 10, (b) 15, (s) 6 | 31 | +6 | extra part labelled "s" (6 marks) alongside (a) and (b); Paper 1 questions have only (a) and (b) |
| 24N.1.SL.TZ1.1 | November 2024 | P1 SL TZ1 Q1 | 25 | (a) 10, (b) 15, (s) 6 | 31 | +6 | extra part labelled "s" (6 marks) alongside (a) and (b); Paper 1 questions have only (a) and (b) |
| 24N.1.SL.TZ2.1 | November 2024 | P1 SL TZ2 Q1 | 25 | (a) 10, (b) 15, (s) 6 | 31 | +6 | extra part labelled "s" (6 marks) alongside (a) and (b); Paper 1 questions have only (a) and (b) |
| 24N.1.SL.TZ2.2 | November 2024 | P1 SL TZ2 Q2 | 25 | (a) 10, (b) 15, (s) 6 | 31 | +6 | extra part labelled "s" (6 marks) alongside (a) and (b); Paper 1 questions have only (a) and (b) |
| 24N.1.SL.TZ2.3 | November 2024 | P1 SL TZ2 Q3 | 25 | (a) 10, (b) 15, (s) 9 | 34 | +9 | extra part labelled "s" (9 marks) alongside (a) and (b); Paper 1 questions have only (a) and (b) |
| 25M.1.HL.TZ1.2 | May 2025 | P1 HL TZ1 Q2 | 25 | (a) 10 | 10 | -15 | part (b) missing: only (a) was recorded |
| 25M.1.SL.TZ1.1 | May 2025 | P1 SL TZ1 Q1 | 25 | (a) 10 | 10 | -15 | part (b) missing: only (a) was recorded |
| 25M.1.SL.TZ3.1 | May 2025 | P1 SL TZ3 Q1 | 25 | (a) 10 | 10 | -15 | part (b) missing: only (a) was recorded |
| 25N.1.HL.TZ1.2 | November 2025 | P1 HL TZ1 Q2 | 25 | (a) 10, (b) 15, (s) 12 | 37 | +12 | extra part labelled "s" (12 marks) alongside (a) and (b); Paper 1 questions have only (a) and (b) |
| 25N.1.HL.TZ1.3 | November 2025 | P1 HL TZ1 Q3 | 25 | (a) 10, (b) 15, (s) 12 | 37 | +12 | extra part labelled "s" (12 marks) alongside (a) and (b); Paper 1 questions have only (a) and (b) |
| 25N.1.HL.TZ3.2 | November 2025 | P1 HL TZ3 Q2 | 25 | (a) 10, (b) 15, (s) 12 | 37 | +12 | extra part labelled "s" (12 marks) alongside (a) and (b); Paper 1 questions have only (a) and (b) |
| SPM.1.HL.TZ0.1 | Specimen paper | P1 HL TZ0 Q1 | 25 | (a) 10 | 10 | -15 | part (b) missing: only (a) was recorded |
| 20N.2.HL.TZ0.1 | November 2020 (previous guide) | P2 HL TZ0 Q1 | 20 | (a.i) 2, (a.ii) 4, (b) 2, (c) 5, (d) 8 | 21 | +1 | previous-guide question: sub-part marks sum to 21 against a total of 20; which sub-parts are wrong cannot be told from the data |
| 20N.2.HL.TZ0.2 | November 2020 (previous guide) | P2 HL TZ0 Q2 | 20 | (a.i) 1, (a.ii) 2, (b) 4, (c) 2, (d) 8 | 17 | -3 | previous-guide question: sub-part marks sum to 17 against a total of 20; which sub-parts are wrong cannot be told from the data |
| 20N.2.HL.TZ0.4 | November 2020 (previous guide) | P2 HL TZ0 Q4 | 20 | (a.i) 3, (a.ii) 6, (b) 4, (c) 1, (d) 8 | 22 | +2 | previous-guide question: sub-part marks sum to 22 against a total of 20; which sub-parts are wrong cannot be told from the data |
| 20N.2.SL.TZ0.1 | November 2020 (previous guide) | P2 SL TZ0 Q1 | 20 | (a.i) 2, (a.ii) 3, (b) 4, (c) 6, (d) 8 | 23 | +3 | previous-guide question: sub-part marks sum to 23 against a total of 20; which sub-parts are wrong cannot be told from the data |
| 20N.2.SL.TZ0.3 | November 2020 (previous guide) | P2 SL TZ0 Q3 | 20 | (a.i) 2, (a.ii) 5, (b) 3, (c) 5, (d) 8 | 23 | +3 | previous-guide question: sub-part marks sum to 23 against a total of 20; which sub-parts are wrong cannot be told from the data |
| 20N.2.SL.TZ0.4 | November 2020 (previous guide) | P2 SL TZ0 Q4 | 20 | (a.i) 1, (a.ii) 2, (b) 4, (c) 4, (d) 8 | 19 | -1 | previous-guide question: sub-part marks sum to 19 against a total of 20; which sub-parts are wrong cannot be told from the data |
| 21M.2.HL.TZ0.1 | May 2021 (previous guide) | P2 HL TZ0 Q1 | 20 | (a.i) 1, (a.ii) 1, (b) 5, (c) 4, (d) 8 | 19 | -1 | previous-guide question: sub-part marks sum to 19 against a total of 20; which sub-parts are wrong cannot be told from the data |
| 21M.2.HL.TZ0.2 | May 2021 (previous guide) | P2 HL TZ0 Q2 | 20 | (a.i) 1, (a.ii) 2, (b) 3, (c) 5, (d) 8 | 19 | -1 | previous-guide question: sub-part marks sum to 19 against a total of 20; which sub-parts are wrong cannot be told from the data |
| 21M.2.HL.TZ0.3 | May 2021 (previous guide) | P2 HL TZ0 Q3 | 20 | (a.i) 1, (a.ii) 1, (b) 5, (c) 4, (d) 8 | 19 | -1 | previous-guide question: sub-part marks sum to 19 against a total of 20; which sub-parts are wrong cannot be told from the data |
| 21M.2.HL.TZ0.4 | May 2021 (previous guide) | P2 HL TZ0 Q4 | 20 | (a.i) 2, (a.ii) 5, (b) 2, (c) 4, (d) 8 | 21 | +1 | previous-guide question: sub-part marks sum to 21 against a total of 20; which sub-parts are wrong cannot be told from the data |
| 21M.2.SL.TZ0.1 | May 2021 (previous guide) | P2 SL TZ0 Q1 | 20 | (a.i) 1, (a.ii) 3, (b) 2, (c) 7, (d) 8 | 21 | +1 | previous-guide question: sub-part marks sum to 21 against a total of 20; which sub-parts are wrong cannot be told from the data |
| 21M.2.SL.TZ0.2 | May 2021 (previous guide) | P2 SL TZ0 Q2 | 20 | (a.i) 1, (a.ii) 4, (b) 4, (c) 5, (d) 8 | 22 | +2 | previous-guide question: sub-part marks sum to 22 against a total of 20; which sub-parts are wrong cannot be told from the data |
| 21M.2.SL.TZ0.3 | May 2021 (previous guide) | P2 SL TZ0 Q3 | 20 | (a.i) 1, (a.ii) 2, (b) 5, (c) 5, (d) 8 | 21 | +1 | previous-guide question: sub-part marks sum to 21 against a total of 20; which sub-parts are wrong cannot be told from the data |
| 21M.2.SL.TZ0.4 | May 2021 (previous guide) | P2 SL TZ0 Q4 | 20 | (a.i) 1, (a.ii) 4, (b) 1, (c) 2, (d) 8 | 16 | -4 | previous-guide question: sub-part marks sum to 16 against a total of 20; which sub-parts are wrong cannot be told from the data |
| 21N.2.HL.TZ0.1 | November 2021 (previous guide) | P2 HL TZ0 Q1 | 20 | (a.i) 4, (a.ii) 7, (b) 6, (c) 3, (d) 8 | 28 | +8 | previous-guide question: sub-part marks sum to 28 against a total of 20; which sub-parts are wrong cannot be told from the data |
| 21N.2.HL.TZ0.2 | November 2021 (previous guide) | P2 HL TZ0 Q2 | 20 | (a.i) 5, (a.ii) 6, (b) 5, (c) 2, (d) 8 | 26 | +6 | previous-guide question: sub-part marks sum to 26 against a total of 20; which sub-parts are wrong cannot be told from the data |
| 21N.2.HL.TZ0.3 | November 2021 (previous guide) | P2 HL TZ0 Q3 | 20 | (a.i) 3, (a.ii) 5, (b) 6, (c) 7, (d) 8 | 29 | +9 | previous-guide question: sub-part marks sum to 29 against a total of 20; which sub-parts are wrong cannot be told from the data |
| 21N.2.HL.TZ0.4 | November 2021 (previous guide) | P2 HL TZ0 Q4 | 20 | (a.i) 5, (a.ii) 7, (b) 1, (c) 7, (d) 8 | 28 | +8 | previous-guide question: sub-part marks sum to 28 against a total of 20; which sub-parts are wrong cannot be told from the data |
| 21N.2.SL.TZ0.2 | November 2021 (previous guide) | P2 SL TZ0 Q2 | 20 | (a.i) 3, (a.ii) 4, (b) 1, (c) 6, (d) 8 | 22 | +2 | previous-guide question: sub-part marks sum to 22 against a total of 20; which sub-parts are wrong cannot be told from the data |
| 21N.2.SL.TZ0.4 | November 2021 (previous guide) | P2 SL TZ0 Q4 | 20 | (a.i) 2, (a.ii) 7, (b) 1, (c) 6, (d) 8 | 24 | +4 | previous-guide question: sub-part marks sum to 24 against a total of 20; which sub-parts are wrong cannot be told from the data |
| 22M.2.HL.TZ0.1 | May 2022 | P2 HL TZ0 Q1 | 40 | (a.i) 2, (a.ii) 2, (b.i) 1, (b.ii) 2, (c) 2, (d) 1, (e) 1, (f) 2, (g) 15 | 28 | -12 | sub-part marks do not reach the total |
| 22M.2.HL.TZ0.2 | May 2022 | P2 HL TZ0 Q2 | 40 | (a.i) 1, (a.ii) 5, (b.i) 2, (b.ii) 2, (c) 2, (d) 4, (e) 5, (f) 2, (g) 15 | 38 | -2 | sub-part marks do not reach the total |
| 22M.2.SL.TZ0.1 | May 2022 | P2 SL TZ0 Q1 | 40 | (a.i) 3, (a.ii) 6, (b.i) 2, (b.ii) 1, (b.iii) 4, (c) 2, (d) 3, (e) 4, (f) 4, (g) 15 | 44 | +4 | sub-part marks do not reach the total |
| 22N.2.HL.TZ0.1 | November 2022 | P2 HL TZ0 Q1 | 40 | (a.i) 2, (a.ii) 2, (b.i) 2, (b.ii) 2, (c) 5, (e) 4, (f) 4, (g) 15 | 36 | -4 | part (d) missing |
| 22N.2.HL.TZ0.2 | November 2022 | P2 HL TZ0 Q2 | 40 | (a.i) 2, (a.ii) 2, (b.i) 3, (b.ii) 1, (c) 2, (d) 3, (e) 3, (f) 2, (g) 1 | 19 | -21 | part (g) recorded as 1 marks |
| 22N.2.SL.TZ0.1 | November 2022 | P2 SL TZ0 Q1 | 40 | (a.i) 1, (a.ii) 1, (b.i) 2, (b.ii) 2, (b.iii) 1, (c) 5, (d) 2, (e) 4, (f) 4 | 22 | -18 | part (g) missing |
| 22N.2.SL.TZ0.2 | November 2022 | P2 SL TZ0 Q2 | 40 | (a.i) 3, (a.ii) 2, (b.i) 3, (b.ii) 2, (c) 4, (d) 1, (e) 2, (f) 3, (g) 15, (s) 4 | 39 | -1 | extra part labelled "s" |
| 23N.2.HL.TZ0.1 | November 2023 | P2 HL TZ0 Q1 | 41 | (a.i) 2, (a.ii) 2, (b.i) 3, (b.ii) 3, (c) 4, (d) 4, (e) 4, (f) 4, (g) 3 | 29 | -12 | part (g) recorded as 3 marks; recorded total 41; the other current-guide Paper 2 questions total 40 |
| 23N.2.SL.TZ0.1 | November 2023 | P2 SL TZ0 Q1 | 40 | (a.i) 2, (a.ii) 2, (b.i) 3, (b.ii) 2, (c) 4, (d) 3, (e) 4, (f) 3, (g) 3 | 26 | -14 | part (g) recorded as 3 marks |
| 23N.2.SL.TZ0.2 | November 2023 | P2 SL TZ0 Q2 | 40 | (a.i) 2, (b.i) 2, (b.ii) 2, (b.iii) 1, (c) 4, (d) 4, (e) 4, (f) 4, (g) 15 | 38 | -2 | sub-part marks do not reach the total |
| 24M.2.HL.TZ2.1 | May 2024 | P2 HL TZ2 Q1 | 40 | (a.i) 2, (a.ii) 2, (b) 3, (b.ii) 2, (c) 1, (d) 4, (e) 4, (f) 4, (g) 15 | 37 | -3 | (b) recorded both whole and as sub-parts |
| 24M.2.SL.TZ2.1 | May 2024 | P2 SL TZ2 Q1 | 40 | (a.i) 2, (a.ii) 2, (b) 3, (b.ii) 2, (c) 1, (d) 4, (e) 4, (f) 4, (g) 15 | 37 | -3 | (b) recorded both whole and as sub-parts |
| 24N.2.HL.TZ0.2 | November 2024 | P2 HL TZ0 Q2 | 40 | (a.i) 2, (a.ii) 2, (b.i) 2, (b.ii) 1, (b.iii) 2, (c) 4, (d) 4, (e) 4, (f) 4, (g) 3 | 28 | -12 | part (g) recorded as 3 marks |
| 24N.2.SL.TZ0.2 | November 2024 | P2 SL TZ0 Q2 | 40 | (a.i) 2, (a.ii) 2, (b.i) 2, (b.ii) 1, (b.iii) 2, (c) 4, (d) 4, (e) 4, (f) 4, (g) 3 | 28 | -12 | part (g) recorded as 3 marks |
| 20N.3.HL.TZ0.1 | November 2020 (previous guide) | P3 HL TZ0 Q1 | 25 | (a) 2, (b.i) 1, (b.ii) 2, (c.i) 1, (b) 1, (c.ii) 2, (c.iii) 2, (d) 2, (e) 4, (f.i) 2, (f.ii) 2, (g.i) 2, (g.ii) 3 | 26 | +1 | previous-guide question, total 25 |
| 20N.3.HL.TZ0.3 | November 2020 (previous guide) | P3 HL TZ0 Q3 | 25 | (a.i) 1, (a.ii) 2, (b.i) 2, (b.ii) 1, (c) 4, (d.i) 1, (d.ii) 2, (e.i) 1, (e.ii) 2, (i) 1, (e.iii) 2, (e.iv) 2, (f) 4, (d) 1, (e) 1 | 27 | +2 | a part labelled "i" on its own, probably a split sub-part label; previous-guide question, total 25 |
| 21M.3.HL.TZ0.1 | May 2021 (previous guide) | P3 HL TZ0 Q1 | 25 | (a) 1, (b) 1, (c) 1, (d) 2, (e) 4, (f) 4, (g) 1, (h) 2, (i) 2, (j) 2, (k) 2, (l) 2 | 24 | -1 | a part labelled "i" on its own, probably a split sub-part label; previous-guide question, total 25 |
| 22M.3.HL.TZ0.2 | May 2022 | P3 HL TZ0 Q2 | 32 | (a.i) 4, (a.ii) 2, (a.iii) 2, (a.iv) 2, (a.v) 2, (a.vi) 2, (a.vii) 2, (a.viii) 4, (b) 10 | 30 | -2 | recorded total 32; the other current-guide Paper 3 questions total 30 |
| 22N.3.HL.TZ0.1 | November 2022 | P3 HL TZ0 Q1 | 30 | (a.i) 2, (a.ii) 1, (a.iii) 2, (a.iv) 4, (a.v) 2, (a.vi) 2, (a.vii) 2, (a.viii) 4, (b) 10 | 29 | -1 | sub-part marks one short of the total |
| 22N.3.HL.TZ0.2 | November 2022 | P3 HL TZ0 Q2 | 30 | (a.i) 2, (a.ii) 4, (a.iii) 2, (a.iv) 3, (a.v) 2, (a.vi) 1, (a.vii) 4, (a.viii) 1, (b) 10 | 29 | -1 | sub-part marks one short of the total |

## Records that add up but carry a mislabelled part

| Record | Session | Question | Recorded total | Recorded parts | Sum of parts | Sum − total | What is wrong in the record |
|---|---|---|---|---|---|---|---|
| 25M.1.HL.TZ1.1 | May 2025 | P1 HL TZ1 Q1 | 25 | (a) 10, (s) 15 | 25 | 0 | part (b) recorded under the label "s" |
| 21M.1.HL.TZ2.3 | May 2021 (previous guide) | P1 HL TZ2 Q3 | 25 | (a) 10, (s) 15 | 25 | 0 | part (b) recorded under the label "s" |
