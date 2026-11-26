import { ArrowUpRight, Mail } from "lucide-react";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { contact, socials } from "@/data/site";
import { cn, mailto } from "@/lib/utils";

const enquiryTypes = [
  { label: "Academic collaboration", subject: contact.subjects.collaboration },
  { label: "Teaching and mentoring", subject: contact.subjects.mentoring },
  { label: "Educational initiatives", subject: contact.subjects.initiatives },
  { label: "Teaching resources", subject: contact.subjects.resources },
  { label: "Publications", subject: contact.subjects.publications },
];

/**
 * SECTION 09 · Let's connect.
 * A direct email (no form, no data collected), prefilled enquiry subjects and
 * the verified social profiles.
 */
export function Connect({ headingLevel = "h2", index = "09" }: { headingLevel?: "h1" | "h2"; index?: string | null }) {
  const H = headingLevel;
  return (
    <section aria-labelledby="connect-title" className="section-y relative overflow-hidden border-t border-rule">
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-[-30%] h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,rgba(179,147,80,0.12),transparent_65%)]" />
      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="reveal eyebrow flex items-center gap-3 text-gold-deep">
              {index && <span className="tabular-nums">{index}</span>}
              {index && <span aria-hidden className="h-px w-8 bg-gold/70" />}
              Connect & collaborate
            </p>
            <H id="connect-title" className="reveal display mt-6 text-[4rem] leading-[0.9] text-ink sm:text-[6rem] lg:text-[7.5rem]">
              Let&rsquo;s <em className="text-gold-deep">connect.</em>
            </H>
            <p className="reveal lede mt-8 max-w-xl text-slate">
              For academic collaboration, teaching and mentoring enquiries, educational initiatives or intellectual
              exchange, I would be pleased to hear from you.
            </p>

            <div className="reveal mt-10">
              <a
                href={mailto(contact.subjects.general)}
                className="group inline-flex max-w-full items-center gap-4 border-b border-ink/30 pb-3 transition-colors hover:border-ink"
              >
                <Mail aria-hidden className="size-6 shrink-0 text-gold-deep sm:size-7" strokeWidth={1.5} />
                <span className="break-all text-[1.375rem] font-medium tracking-[-0.01em] text-ink sm:text-[2rem]">{contact.email}</span>
              </a>
              <div className="mt-5">
                <CopyEmail email={contact.email} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pt-16">
            <p className="reveal eyebrow text-slate">Write about</p>
            <ul className="reveal mt-4 border-t border-rule">
              {enquiryTypes.map((e) => (
                <li key={e.label} className="border-b border-rule">
                  <a
                    href={mailto(e.subject)}
                    className="nudge group flex min-h-14 items-center justify-between gap-4 py-3 text-[1.0625rem] text-ink"
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-1">{e.label}</span>
                    <Mail aria-hidden className="size-4 text-slate group-hover:text-ink" strokeWidth={1.75} />
                  </a>
                </li>
              ))}
            </ul>

            <p className="reveal eyebrow mt-12 text-slate">Elsewhere</p>
            <ul className="reveal mt-4 grid gap-3">
              {socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group nudge-diag flex items-center gap-4 rounded-[4px] border border-rule bg-paper px-4 py-3.5 transition-colors hover:border-ink/40"
                  >
                    <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-full bg-ink text-ivory")}>
                      <BrandIcon id={s.id} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-ink">
                        {s.label} <span className="font-normal text-slate">· {s.handle}</span>
                      </span>
                      <span className="block truncate text-[0.8125rem] text-slate">{s.purpose}</span>
                    </span>
                    <ArrowUpRight aria-hidden className="size-4 shrink-0 text-slate group-hover:text-ink" strokeWidth={1.75} />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
