import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Action } from "@/components/ui/Action";
import { knowledgeSeries, publications, sixtySeconds, type Publication } from "@/data/publications";
import { contact } from "@/data/site";
import { accent } from "@/lib/accents";
import { cn, mailto } from "@/lib/utils";

/**
 * SECTION 05 · Beyond the classroom
 * The Knowledge Series as a featured spread with the real covers, followed by
 * a gallery of series plates. Statuses come from data/publications.ts.
 */
export function Publications({ showHeading = true }: { showHeading?: boolean }) {
  const order = ["economics-in-60-seconds", "global-politics-handbooks", "the-business-brief", "the-global-perspective", "business-brief-editorial"];
  const rest = publications
    .filter((p) => p.id !== "knowledge-series")
    .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  return (
    <section aria-labelledby={showHeading ? "work-title" : undefined} aria-label={showHeading ? undefined : "Publications"} className="section-y relative">
      <div className="shell">
        {showHeading && (
          <SectionHeading
            index="05"
            eyebrow="Publications & Knowledge Series"
            id="work-title"
            align="split"
            title={
              <>
                Beyond the <em className="text-gold-deep">classroom.</em>
              </>
            }
            intro="Original ideas. Academic resources. Independent perspectives. Handbooks, visual series and editorial work that extend the teaching beyond the lesson."
          />
        )}

        <KnowledgeSeriesFeature />

        <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <li key={p.id} className={cn("reveal", i === 0 && "lg:col-span-2")}>
              <SeriesPlate pub={p} wide={i === 0} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function KnowledgeSeriesFeature() {
  const fan = ["I", "II", "III", "VIII", "XI"].map((n) => knowledgeSeries.volumes.find((v) => v.number === n)!);
  return (
    <article
      aria-labelledby="aaks-title"
      className="reveal on-dark relative mt-14 overflow-hidden rounded-[6px] bg-navy text-ivory lg:mt-20"
    >
      <div aria-hidden className="grain-dark" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-full bg-[radial-gradient(ellipse_at_20%_50%,rgba(214,189,132,0.16),transparent_60%)]" />
      <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-14">
        {/* Covers */}
        <div className="group/fan relative flex min-h-[340px] items-center justify-center sm:min-h-[420px] lg:col-span-6">
          {fan.map((v, i) => {
            const offset = i - 2;
            return (
              <div
                key={v.number}
                className="absolute w-[42%] max-w-[210px] origin-bottom shadow-[0_30px_50px_-20px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-[var(--ease-editorial)] [transform:translateX(var(--x))_rotate(var(--r))] group-hover/fan:[transform:translateX(var(--xh))_rotate(var(--rh))]"
                style={
                  {
                    zIndex: 10 - Math.abs(offset),
                    "--x": `${offset * 22}%`,
                    "--r": `${offset * 5}deg`,
                    "--xh": `${offset * 48}%`,
                    "--rh": `${offset * 8}deg`,
                  } as React.CSSProperties
                }
              >
                <Image
                  src={v.cover}
                  alt={i === 2 ? `Cover of Volume ${v.number}: ${v.title}` : ""}
                  width={420}
                  height={594}
                  sizes="210px"
                  className="h-auto w-full rounded-[2px]"
                />
              </div>
            );
          })}
        </div>

        {/* Copy */}
        <div className="flex flex-col lg:col-span-6">
          <p className="eyebrow text-gold-light">{knowledgeSeries.series}</p>
          <h3 id="aaks-title" className="display mt-5 text-[2.75rem] leading-[0.95] text-ivory sm:text-6xl">
            {knowledgeSeries.collection}
          </h3>
          <p className="mt-3 font-serif text-xl italic text-gold-light">
            {knowledgeSeries.subseries} · {knowledgeSeries.volumes.length} volumes
          </p>
          <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ivory/75">{knowledgeSeries.description}</p>

          <dl className="mt-8 grid gap-x-8 gap-y-5 border-t border-ivory/10 pt-6 sm:grid-cols-2">
            <div>
              <dt className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-mist">Intended audience</dt>
              <dd className="mt-2 text-[0.9375rem] text-ivory">{knowledgeSeries.audience.join(" · ")}</dd>
            </div>
            <div>
              <dt className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-mist">Format</dt>
              <dd className="mt-2 text-[0.9375rem] text-ivory">{knowledgeSeries.format}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-mist">Status</dt>
              <dd className="mt-2 flex items-center gap-2 text-[0.9375rem] text-ivory">
                <span aria-hidden className="size-2 rounded-full bg-economics-light" />
                {knowledgeSeries.status.label}
              </dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:mt-auto lg:pt-10">
            <Action href={knowledgeSeries.href} variant="light">
              Explore the collection
            </Action>
            <Action href={mailto(`${contact.subjects.publications}: ${knowledgeSeries.series}`)} variant="outline-light" icon="none">
              <span className="inline-flex items-center gap-2">
                <Mail aria-hidden className="size-4" strokeWidth={1.75} />
                Enquire
              </span>
            </Action>
          </div>
        </div>
      </div>
    </article>
  );
}

export function SeriesPlate({ pub, wide = false }: { pub: Publication; wide?: boolean }) {
  const a = accent[pub.discipline];
  const isSixty = pub.id === "economics-in-60-seconds";
  return (
    <article
      aria-labelledby={`pub-${pub.id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[6px] border border-rule bg-paper transition-[box-shadow,border-color] duration-500 hover:border-rule-strong hover:shadow-[0_30px_60px_-40px_rgba(12,26,48,0.45)]"
    >
      <div className={cn("grid h-full", wide && "md:grid-cols-2")}>
        {/* Plate */}
        <div className={cn("relative flex min-h-[200px] overflow-hidden p-6", isSixty ? "items-center" : "items-end", a.bgSoft)}>
          <span aria-hidden className={cn("display absolute -right-2 -top-6 select-none text-[7.5rem] leading-none opacity-[0.16]", a.text)}>
            {pub.mark}
          </span>
          <span aria-hidden className={cn("absolute left-6 top-6 h-px w-10", a.bg)} />
          {isSixty ? (
            <div className="relative flex w-full items-end justify-center gap-3 pt-6">
              {sixtySeconds.issues.slice(0, 3).map((iss, i) => (
                <Image
                  key={iss.number}
                  src={iss.cover}
                  alt={`Economics in 60 Seconds, issue ${iss.number}: ${iss.title}`}
                  width={210}
                  height={262}
                  sizes="140px"
                  className={cn(
                    "h-auto w-[31%] max-w-[190px] rounded-[2px] shadow-[0_18px_30px_-16px_rgba(12,26,48,0.45)] transition-transform duration-500",
                    i === 1 ? "-translate-y-3 group-hover:-translate-y-5" : "group-hover:-translate-y-1",
                  )}
                />
              ))}
            </div>
          ) : (
            <div className="relative mx-auto w-full max-w-[220px] pt-8 transition-transform duration-500 group-hover:-translate-y-1">
              <div className="relative aspect-[3/4] border border-rule bg-paper p-4 shadow-[0_18px_30px_-18px_rgba(12,26,48,0.4)]">
                <div className={cn("flex h-full flex-col border p-3 text-center", a.border)}>
                  <p className={cn("text-[0.5625rem] font-bold uppercase tracking-[0.2em]", a.textDeep)}>{pub.series}</p>
                  <span aria-hidden className={cn("mx-auto mt-3 h-px w-8", a.bg)} />
                  <p className="display mt-auto text-[1.25rem] leading-[1.05] text-ink">{pub.title}</p>
                  <p className={cn("display mt-auto pt-2 text-[1.75rem] leading-none", a.text)}>{pub.mark}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Text */}
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn("rounded-full px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.12em]", a.bgSoft, a.textDeep)}>
              {pub.status.label}
            </span>
          </div>
          <h3 id={`pub-${pub.id}`} className="display mt-4 text-[1.875rem] leading-[1.05] text-ink">
            {pub.title}
          </h3>
          {pub.subtitle && <p className="mt-1.5 font-serif text-[1.0625rem] italic text-slate">{pub.subtitle}</p>}
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-slate">{pub.description}</p>
          <p className="mt-4 text-[0.8125rem] text-slate">
            <span className="font-semibold text-charcoal">For </span>
            {pub.audience.join(" · ")}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 md:mt-auto md:pt-6">
            {pub.link ? (
              <a
                href={pub.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn("nudge-diag inline-flex min-h-10 items-center gap-1.5 text-[0.9375rem] font-semibold", a.textDeep)}
              >
                {pub.link.label}
                <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.75} />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
            {(pub.enquire || !pub.link) && (
              <a
                href={mailto(`${contact.subjects.publications}: ${pub.title}`)}
                className="inline-flex min-h-10 items-center gap-1.5 text-[0.9375rem] font-semibold text-ink underline decoration-rule-strong underline-offset-4 hover:decoration-ink"
              >
                Enquire
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
