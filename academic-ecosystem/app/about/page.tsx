import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Action } from "@/components/ui/Action";
import { Philosophy } from "@/components/sections/Philosophy";
import { education, experience, platforms, profile, qualifications } from "@/data/site";
import { accent } from "@/lib/accents";
import { pageMetadata } from "@/lib/metadata";
import { cn, mailto } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Arjun Agrawal is DP Economics & Global Politics Facilitator at Symbiosis International School, Pune, and an educator in Economics, Business Management and Political Studies. Education, experience and academic philosophy.",
  path: "/about",
});

/** The academic journey, by stage. No dates are shown because none are claimed. */
const journey = [
  {
    stage: "Foundations",
    title: "Economics and Political Science",
    items: [education[2]].map((e) => `${e.award}, ${e.institution}`),
  },
  {
    stage: "Postgraduate study",
    title: "Two disciplines, studied in depth",
    items: [education[0], education[1]].map((e) => `${e.award}, ${e.institution}`),
  },
  {
    stage: "Qualification",
    title: "National and State eligibility",
    items: qualifications.map((q) => `${q.award}: ${q.institution}`),
  },
  {
    stage: "Teaching and mentoring",
    title: "Classrooms across curricula",
    items: [
      "IGCSE Global Perspectives",
      "IB DP Economics, Business Management and Global Politics",
      "UPSC Civil Services: Economics teaching and mentoring",
      "Visiting Faculty, Fergusson College, Pune",
    ],
  },
  {
    stage: "Present",
    title: profile.currentRole.title,
    items: [`${profile.currentRole.organisation}, ${profile.currentRole.location}`],
    current: true,
  },
  {
    stage: "Beyond the classroom",
    title: "Three independent platforms",
    items: platforms.map((p) => p.name),
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            Arjun <em className="text-gold-deep">Agrawal</em>
          </>
        }
        lede={<p>Educator, academic resource creator and builder of independent learning platforms, working where economics, business and politics meet.</p>}
        aside={
          <figure className="relative mx-auto max-w-[400px] lg:ml-auto lg:mr-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full border border-ink/10 bg-parchment shadow-[0_40px_80px_-40px_rgba(12,26,48,0.55)]">
              <Image
                src={profile.portrait.src}
                alt={profile.portrait.alt}
                fill
                priority
                sizes="(min-width: 1024px) 400px, 80vw"
                className="object-cover object-[50%_25%]"
              />
            </div>
            <div aria-hidden className="pointer-events-none absolute -inset-3 rounded-t-full border border-gold/50" />
          </figure>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Action href="/contact">Connect with me</Action>
          <Action href="/work" variant="secondary">
            Selected work
          </Action>
        </div>
      </PageHero>

      {/* Biography */}
      <section aria-labelledby="bio-title" className="section-y">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading index="01" eyebrow="Biography" id="bio-title" title="A professional profile" />
              <div className="reveal mt-10 rounded-[4px] bg-ink p-6 text-ivory">
                <p className="eyebrow text-gold-light">Currently</p>
                <p className="display mt-3 text-[1.625rem] leading-tight">{profile.currentRole.title}</p>
                <p className="mt-2 text-[0.875rem] text-mist">
                  {profile.currentRole.organisation}, {profile.currentRole.location}
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="reveal space-y-6 text-[1.125rem] leading-[1.8] text-charcoal">
              {profile.bioLong.map((p, i) => (
                <p key={i} className={cn(i === 0 && "font-serif text-[1.375rem] leading-[1.6] text-ink first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[4.25rem] first-letter:leading-[0.8] first-letter:text-gold-deep")}>
                  {p}
                </p>
              ))}
            </div>
            <figure className="reveal mt-14 border-l-2 border-gold pl-6 sm:pl-8">
              <blockquote className="display text-[1.875rem] leading-tight text-ink sm:text-[2.25rem]">&ldquo;{profile.quotes[1].text}&rdquo;</blockquote>
              <figcaption className="mt-4 text-[0.8125rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">{profile.quotes[1].source}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section aria-labelledby="cred-title" className="section-y border-y border-rule bg-paper">
        <div className="shell">
          <SectionHeading index="02" eyebrow="Education & qualifications" id="cred-title" title="Academic background" />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {education.map((e) => (
              <article key={e.award} className="reveal flex flex-col rounded-[4px] border border-rule bg-ivory p-6 lg:col-span-1">
                <p className="eyebrow text-gold-deep">Degree</p>
                <h3 className="display mt-5 text-[1.75rem] leading-tight text-ink">{e.award}</h3>
                <p className="mt-auto pt-6 text-[0.9375rem] leading-snug text-slate">{e.institution}</p>
              </article>
            ))}
            {qualifications.map((q) => (
              <article key={q.award} className="reveal flex flex-col rounded-[4px] border border-ink bg-ink p-6 text-ivory lg:col-span-1">
                <p className="eyebrow text-gold-light">Qualified</p>
                <h3 className="display mt-5 text-[1.75rem] leading-tight text-ivory">{q.award}</h3>
                <p className="mt-auto pt-6 text-[0.9375rem] leading-snug text-mist">{q.institution}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section aria-labelledby="journey-title" className="section-y">
        <div className="shell">
          <SectionHeading
            index="03"
            eyebrow="The academic journey"
            id="journey-title"
            align="split"
            title="From two disciplines to three platforms"
            intro="Shown by stage rather than by date: the path from study to teaching to independent platforms."
          />
          <ol className="relative mt-14 lg:mt-20">
            <span aria-hidden className="absolute bottom-2 left-[11px] top-2 w-px bg-rule-strong/70 md:left-1/2" />
            {journey.map((j, i) => (
              <li key={j.stage} className={cn("reveal relative grid gap-4 pb-12 pl-10 last:pb-0 md:grid-cols-2 md:gap-16 md:pl-0")}>
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-[5px] top-1.5 size-[13px] rounded-full border-2 md:left-1/2 md:-translate-x-1/2",
                    j.current ? "border-gold bg-gold" : "border-gold bg-ivory",
                  )}
                />
                <div className={cn("md:text-right", i % 2 === 1 && "md:order-2 md:text-left")}>
                  <p className="eyebrow text-gold-deep">{j.stage}</p>
                  <h3 className="display mt-3 text-[1.875rem] leading-tight text-ink sm:text-[2.125rem]">{j.title}</h3>
                </div>
                <ul className={cn("space-y-2 md:pt-6", i % 2 === 1 && "md:order-1 md:text-right")}>
                  {j.items.map((it) => (
                    <li key={it} className="text-[1rem] leading-relaxed text-slate">
                      {it}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Experience and interests */}
      <section aria-labelledby="exp-title" className="section-y border-t border-rule bg-paper">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading index="04" eyebrow="Experience" id="exp-title" title="Teaching and academic engagement" />
            <ul className="mt-10 border-t border-ink/80">
              {experience.map((e) => (
                <li key={e.role} className="reveal grid gap-1 border-b border-rule py-5 sm:grid-cols-[1fr_1.2fr] sm:gap-6">
                  <p className="flex items-center gap-2 font-semibold text-ink">
                    {e.role}
                    {e.current && <span className="rounded-full bg-economics-soft px-2 py-0.5 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-economics-deep">Current</span>}
                  </p>
                  <p className="text-[0.9375rem] text-slate">{e.context}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <SectionHeading index="05" eyebrow="Areas of interest" title="Questions worth pursuing" />
            <ul className="reveal mt-10 flex flex-wrap gap-2">
              {profile.interests.map((i) => (
                <li key={i} className="rounded-full border border-rule-strong/70 bg-ivory px-4 py-2 text-[0.9375rem] text-charcoal">
                  {i}
                </li>
              ))}
            </ul>
            <div className="reveal mt-12">
              <p className="eyebrow text-slate">The platforms</p>
              <ul className="mt-4 grid gap-2">
                {platforms.map((p) => (
                  <li key={p.id}>
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="group nudge-diag flex min-h-12 items-center gap-3 border-b border-rule py-2">
                      <span aria-hidden className={cn("size-2 rounded-full", accent[p.id].bg)} />
                      <span className="flex-1 font-semibold text-ink">{p.name}</span>
                      <ArrowUpRight aria-hidden className="size-4 text-slate group-hover:text-ink" strokeWidth={1.75} />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Philosophy index="06" />

      <section aria-labelledby="about-cta" className="section-y">
        <div className="shell text-center">
          <h2 id="about-cta" className="reveal display mx-auto max-w-3xl text-[2.5rem] leading-tight text-ink sm:text-[3.5rem]">
            For mentoring, collaboration or academic exchange.
          </h2>
          <div className="reveal mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Action href={mailto("Enquiry via The Academic Ecosystem")} icon="none">
              Write to Arjun
            </Action>
            <Action href="/ecosystem" variant="secondary">
              Explore the ecosystem
            </Action>
          </div>
        </div>
      </section>
    </>
  );
}
