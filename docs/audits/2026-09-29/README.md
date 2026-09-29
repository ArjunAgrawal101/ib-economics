# Round-2 audits (29 September 2026)

Five independent audits were run before this release. They were read-only: each produced a report,
and every change it led to was applied by hand, then verified by the self-test.

| Report | Scope | Findings | Disposition |
|---|---|---|---|
| [`language.md`](language.md) | Terminology red team: demand vs quantity demanded, shift vs movement, price level vs inflation, correlation vs causation, incidence, absolutes, BoP accounts | 17 new (5 high, 12 medium), plus 3 open from round 1 | All 20 applied |
| [`cases.md`](cases.md) | Real World fact red team: 203 cases and 12 deep cards | 40: 5 wrong, 13 dated, 17 misleading, 5 unverified figures | 37 applied. **MGNREGA** (DEV-003) is worded as a check rather than a new fact, because its replacement could not be confirmed. **Airbus–Boeing** (GLO-033) records only the 2021 suspension. Region conventions (R2-34) and the year-type schema (R2-40) are left as they are |
| [`dedupe.md`](dedupe.md) | 77 concepts compared everywhere they are defined | 2 contradictory, 3 inconsistent, 16 minor | Both contradictions, all three inconsistencies and six minor items applied. **Current-account wording was not changed**: the guide lists "income" and "current transfers", which is what the site uses |
| [`graphs.md`](graphs.md) | Every diagram system, rendered and measured | 17: 3 wrong economics, 5 misleading, 9 cosmetic | All wrong and misleading items applied, plus G9–G13 and G15, and a minimal G16. G14's curve labels are deferred |
| [`coverage.md`](coverage.md) | Coverage of the Economics guide (first assessment 2022), item by item | 31 subtopics: 10 covered, 21 partly covered, 0 missing. 410 guide items: 336 covered, 46 partial, 27 missing, 1 to verify | Recorded for the next content phase. Section 11 of the release report lists the missing diagrams and concepts |

## Notes

- **Line numbers.** Line numbers in these reports refer to the file as it stood during each audit.
  Every fix was located by its exact text, not by line.
- **Guide edition.** The coverage matrix uses the 2022 guide only. A copy titled "first assessment
  2024" is referenced online but could not be retrieved, so any differences it contains are not
  reflected here.
