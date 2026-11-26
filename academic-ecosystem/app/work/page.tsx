import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Action } from "@/components/ui/Action";
import { KnowledgeSeriesFeature, SeriesPlate } from "@/components/sections/Publications";
import { knowledgeSeries, publications, sixtySeconds } from "@/data/publications";
import { contact, platforms } from "@/data/site";
import { accent } from "@/lib/accents";
import { pageMetadata } from "@/lib/metadata";
import { cn, mailto } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Selected Work",
  description:
    "Publications and academic resources by Arjun Agrawal: the Arjun Agrawal Knowledge Series (Economics Collection), Economics in 60 Seconds, Global Politics handbooks, editorial series and three learning platforms.",
  path: "/work",
});

export default function WorkPage() {
  const series = publications.filter((p) => !["knowledge-series", "economics-in-60-seconds", "the-business-brief"].includes(p.id));
  return (
    <>
      <PageHero
        eyebrow="Selected Work"
        title={
          <>
            Handbooks, series <em className="text-gold-deep">and platforms.</em>
          </>
        }
        lede={
          <p>
            Work that extends teaching beyond the lesson: structured handbooks, short visual explainers, editorial series
            and three independent learning platforms.
          </p>
        }
      >
        <nav aria-label="On this page">
          <ul className="flex flex-wrap gap-2">
            {[
              ["#knowledge-series", "Knowledge Series"],
              ["#sixty-seconds", "Economics in 60 Seconds"],
              ["#series", "Editorial series"],
              ["#platforms-work", "Digital platforms"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="inline-flex min-h-10 items-center rounded-full border border-rule-strong/60 px-4 text-[0.875rem] font-medium text-ink hover:border-ink">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {/* Knowledge Series */}
      <section id="knowledge-series" aria-labelledby="ks-title" className="section-y scroll-mt-24">
        <div className="shell">
          <SectionHeading
            index="01"
            eyebrow="Arjun Agrawal Knowledge Series"
            id="ks-title"
            align="split"
            title={
              <>
                The Economics <em className="text-gold-deep">Collection.</em>
              </>
            }
            intro={`${knowledgeSeries.subseries}: ${knowledgeSeries.volumes.length} volumes, each built from first principles to Indian application.`}
          />
          <KnowledgeSeriesFeature />

          <h3 className="reveal eyebrow mt-16 text-slate">The volumes</h3>
          <ol className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {knowledgeSeries.volumes.map((v) => (
              <li key={v.number} className="reveal group">
                <div className="overflow-hidden rounded-[2px] shadow-[0_20px_36px_-22px_rgba(12,26,48,0.6)] transition-transform duration-500 group-hover:-translate-y-1.5">
                  <Image src={v.cover} alt={`Cover of Volume ${v.number}: ${v.title}`} width={400} height={566} sizes="(min-width: 1280px) 190px, (min-width: 640px) 30vw, 45vw" className="h-auto w-full" />
                </div>
                <p className="mt-4 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-gold-deep">Volume {v.number}</p>
                <p className="display mt-1.5 text-[1.25rem] leading-tight text-ink">{v.title}</p>
                <p className="mt-1.5 text-[0.8125rem] text-slate">
                  {v.category} · {v.pages} pages
                </p>
              </li>
            ))}
          </ol>
          <div className="reveal mt-14 flex flex-col gap-3 sm:flex-row">
            <Action href={knowledgeSeries.href}>View the handbook library</Action>
            <Action href={mailto(`${contact.subjects.publications}: ${knowledgeSeries.series}`)} variant="secondary" icon="none">
              Enquire about the series
            </Action>
          </div>
        </div>
      </section>

      {/* Economics in 60 Seconds */}
      <section id="sixty-seconds" aria-labelledby="e60-title" className="section-y scroll-mt-24 border-y border-rule bg-economics-soft/40">
        <div className="shell">
          <SectionHeading
            index="02"
            eyebrow="Visual series"
            id="e60-title"
            align="split"
            title={
              <>
                Economics in <em className="text-economics">60 Seconds.</em>
              </>
            }
            intro={sixtySeconds.description}
          />
          <ol className="mt-14 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {sixtySeconds.issues.map((iss) => (
              <li key={iss.number} className="reveal group">
                <a href={sixtySeconds.href} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="overflow-hidden rounded-[2px] bg-paper shadow-[0_18px_30px_-20px_rgba(12,26,48,0.5)] transition-transform duration-500 group-hover:-translate-y-1.5">
                    <Image src={iss.cover} alt="" width={420} height={525} sizes="(min-width: 1024px) 230px, (min-width: 640px) 30vw, 45vw" className="h-auto w-full" />
                  </div>
                  <p className="mt-4 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-economics-deep">Issue {iss.number}</p>
                  <p className="display mt-1.5 text-[1.25rem] leading-tight text-ink group-hover:underline">{iss.title}</p>
                  <p className="mt-1.5 text-[0.8125rem] text-slate">{iss.topic}</p>
                  <span className="sr-only"> (opens the series on the Economics platform in a new tab)</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Other series */}
      <section id="series" aria-labelledby="series-title" className="section-y scroll-mt-24">
        <div className="shell">
          <SectionHeading index="03" eyebrow="Handbooks & editorial series" id="series-title" title="Further series" />
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {series.map((p) => (
              <li key={p.id} className="reveal">
                <SeriesPlate pub={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Platforms */}
      <section id="platforms-work" aria-labelledby="pw-title" className="section-y scroll-mt-24 border-t border-rule bg-paper">
        <div className="shell">
          <SectionHeading index="04" eyebrow="Digital platforms" id="pw-title" title="Three learning environments" />
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {platforms.map((p) => (
              <li key={p.id} className="reveal">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group nudge-diag flex h-full flex-col rounded-[6px] border border-rule bg-ivory p-7 transition-[border-color,box-shadow] duration-300 hover:border-ink/30 hover:shadow-[0_24px_50px_-36px_rgba(12,26,48,0.5)]"
                >
                  <span aria-hidden className={cn("h-[3px] w-12 rounded-full", accent[p.id].bg)} />
                  <span className="mt-6 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-slate">{p.discipline}</span>
                  <span className="display mt-3 text-[2rem] leading-tight text-ink">{p.name}</span>
                  <span className={cn("mt-2 font-serif italic", accent[p.id].textDeep)}>{p.descriptor}</span>
                  <span className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-slate">{p.description}</span>
                  <span className={cn("mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold", accent[p.id].textDeep)}>
                    {p.cta}
                    <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.75} />
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
