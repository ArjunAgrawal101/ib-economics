import { ArrowUpRight, Mail } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Action } from "@/components/ui/Action";
import { pathways } from "@/data/content";
import { contact, platformById } from "@/data/site";
import { accent } from "@/lib/accents";
import { cn, mailto } from "@/lib/utils";

/**
 * SECTION 06 · Learning. Guidance. Academic engagement.
 * Four audiences, each with its subjects, what the work involves, the
 * relevant platforms and an enquiry link. No prices, outcomes or counts.
 */
export function Pathways() {
  return (
    <section id="teaching" aria-labelledby="teaching-title" className="section-y scroll-mt-20 border-t border-rule bg-paper">
      <div className="shell">
        <SectionHeading
          index="06"
          eyebrow="Teaching, mentoring & academic engagement"
          id="teaching-title"
          align="split"
          title={
            <>
              Learning. Guidance. <em className="text-gold-deep">Academic engagement.</em>
            </>
          }
          intro="Four kinds of learners, one approach: conceptual clarity first, then analysis, evaluation and application."
        />

        <ol className="mt-14 grid border-t border-ink/80 md:grid-cols-2 lg:mt-20 xl:grid-cols-4">
          {pathways.map((p, i) => (
            <li
              key={p.id}
              className={cn(
                "reveal group flex flex-col border-b border-rule py-8 md:py-10 xl:border-b-0",
                ["md:pr-6", "md:border-l md:pl-6 xl:pr-6", "md:pr-6 xl:border-l xl:pl-6", "md:border-l md:pl-6"][i],
              )}
            >
              <div className="flex items-baseline justify-between">
                <span className="display text-[2rem] text-gold">{p.index}</span>
                <span aria-hidden className="h-px w-0 bg-ink transition-[width] duration-500 group-hover:w-10" />
              </div>
              <h3 className="display mt-6 text-[2rem] leading-[1.02] text-ink">{p.audience}</h3>
              <p className="mt-3 text-[0.8125rem] font-semibold tracking-[0.02em] text-gold-deep">{p.subjects}</p>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-slate">{p.description}</p>
              <ul className="mt-6 space-y-2">
                {p.includes.map((x) => (
                  <li key={x} className="flex items-start gap-3 text-[0.9375rem] text-charcoal">
                    <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-gold" />
                    {x}
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-2 xl:mt-auto xl:pt-8">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-slate">Platforms</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {p.platforms.map((id) => {
                    const pl = platformById(id);
                    return (
                      <li key={id}>
                        <a
                          href={pl.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "nudge-diag inline-flex min-h-9 items-center gap-1.5 rounded-full border border-rule-strong/60 bg-ivory px-3 text-[0.8125rem] font-semibold transition-colors hover:border-ink",
                            accent[id].textDeep,
                          )}
                        >
                          <span aria-hidden className={cn("size-1.5 rounded-full", accent[id].bg)} />
                          {pl.shortName}
                          <ArrowUpRight aria-hidden className="size-3.5" strokeWidth={1.75} />
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <a
                  href={mailto(p.enquiry.subject)}
                  className="mt-6 inline-flex min-h-10 items-center gap-2 text-[0.9375rem] font-semibold text-ink underline decoration-rule-strong underline-offset-4 transition-colors hover:decoration-ink"
                >
                  <Mail aria-hidden className="size-4" strokeWidth={1.75} />
                  {p.enquiry.label}
                </a>
              </div>
            </li>
          ))}
        </ol>

        {/* Enquiry band */}
        <div className="reveal mt-14 grid items-center gap-6 rounded-[6px] border border-rule bg-ivory p-6 sm:p-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow text-gold-deep">Mentoring and collaboration</p>
            <p className="display mt-4 text-[1.875rem] leading-tight text-ink sm:text-[2.25rem]">
              Academic mentoring, resource collaboration or an educational initiative in mind?
            </p>
            <p className="mt-3 text-[0.9375rem] text-slate">
              Write with a little about the learner, the subject and what you are looking for.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
            <Action href={mailto(contact.subjects.mentoring)} icon="none">
              <span className="inline-flex items-center gap-2">
                <Mail aria-hidden className="size-4" strokeWidth={1.75} />
                Send an enquiry
              </span>
            </Action>
          </div>
        </div>
      </div>
    </section>
  );
}
