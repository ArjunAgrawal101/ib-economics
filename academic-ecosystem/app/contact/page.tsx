import type { Metadata } from "next";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { Connect } from "@/components/sections/Connect";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contact, platforms } from "@/data/site";
import { accent } from "@/lib/accents";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Contact Arjun Agrawal for academic collaboration, teaching and mentoring enquiries, educational initiatives and publications. Email ${contact.email}.`,
  path: "/contact",
});

const guide = [
  ["Who it is for", "The learner's level and programme: IB DP, UPSC CSE, university, or a school or teaching team."],
  ["The subject", "Economics, Business Management, Global Politics, Indian Polity, International Relations or PSIR."],
  ["What you are looking for", "Mentoring, academic guidance, teaching resources, collaboration or an initiative to discuss."],
  ["Timing", "Any examination session or deadline that matters, so the reply can be specific."],
];

export default function ContactPage() {
  return (
    <>
      <Connect headingLevel="h1" index={null} />

      <section aria-labelledby="guide-title" className="section-y border-t border-rule bg-paper">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Writing an enquiry" id="guide-title" title="What helps a useful reply" />
            <p className="reveal mt-8 flex items-start gap-3 rounded-[4px] border border-rule bg-ivory p-5 text-[0.9375rem] leading-relaxed text-slate">
              <ShieldCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-economics" strokeWidth={1.75} />
              <span>
                This site has no contact form and stores nothing you send. Every link opens your own email application,
                addressed to {contact.email}.
              </span>
            </p>
          </div>
          <ol className="lg:col-span-7">
            {guide.map(([t, d], i) => (
              <li key={t} className="reveal grid grid-cols-[3rem_1fr] gap-4 border-b border-rule py-6 first:border-t first:border-t-ink/80">
                <span className="display text-[1.75rem] leading-none text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-[1.0625rem] font-semibold text-ink">{t}</h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-slate">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="contact-platforms" className="section-y">
        <div className="shell">
          <SectionHeading eyebrow="Looking for learning material?" id="contact-platforms" title="Go straight to a platform" />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {platforms.map((p) => (
              <li key={p.id} className="reveal">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group nudge-diag flex items-center gap-4 rounded-[4px] border border-rule bg-paper p-5 transition-colors hover:border-ink/40"
                >
                  <span aria-hidden className={cn("h-10 w-[3px] rounded-full", accent[p.id].bg)} />
                  <span className="flex-1">
                    <span className="display block text-[1.5rem] leading-tight text-ink">{p.name}</span>
                    <span className="text-[0.875rem] text-slate">{p.descriptor}</span>
                  </span>
                  <ArrowUpRight aria-hidden className="size-5 text-slate group-hover:text-ink" strokeWidth={1.5} />
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
