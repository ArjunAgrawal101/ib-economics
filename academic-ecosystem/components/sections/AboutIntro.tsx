import Image from "next/image";
import { Action } from "@/components/ui/Action";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education, profile, qualifications } from "@/data/site";

/**
 * SECTION 04 · The educator behind the ecosystem
 * A substantial introduction, not the whole CV: the portrait, the current
 * role, a short biography and the credentials as a compact ledger.
 */
export function AboutIntro() {
  return (
    <section aria-labelledby="about-title" className="section-y">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Portrait */}
          <figure className="reveal relative lg:col-span-5">
            <div className="relative mx-auto max-w-[460px] lg:mx-0">
              <div aria-hidden className="absolute -left-3 -top-3 bottom-10 right-10 border border-gold/60 sm:-left-5 sm:-top-5" />
              <div className="relative aspect-[4/5] overflow-hidden bg-parchment">
                <Image
                  src={profile.portrait.src}
                  alt={profile.portrait.alt}
                  fill
                  sizes="(min-width: 1024px) 420px, (min-width: 640px) 460px, 92vw"
                  className="object-cover object-[50%_30%]"
                />
              </div>
              <figcaption className="relative -mt-12 ml-auto mr-0 w-[86%] bg-ink p-5 text-ivory shadow-[0_30px_60px_-30px_rgba(12,26,48,0.6)] sm:-mr-8 sm:w-[78%] sm:p-6">
                <span className="eyebrow text-gold-light">Currently</span>
                <span className="display mt-3 block text-[1.5rem] leading-tight">{profile.currentRole.title}</span>
                <span className="mt-1.5 block text-[0.875rem] text-mist">
                  {profile.currentRole.organisation}, {profile.currentRole.location}
                </span>
              </figcaption>
            </div>
          </figure>

          {/* Copy */}
          <div className="lg:col-span-7 lg:pt-4">
            <SectionHeading
              index="04"
              eyebrow="About Arjun Agrawal"
              id="about-title"
              title={
                <>
                  The educator behind <em className="text-gold-deep">the ecosystem.</em>
                </>
              }
            />
            <div className="reveal mt-8 space-y-5 text-[1.0625rem] leading-[1.75] text-charcoal">
              {profile.bioShort.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <dl className="reveal mt-10 grid gap-px overflow-hidden rounded-[4px] border border-rule bg-rule sm:grid-cols-2">
              <div className="bg-paper p-5 sm:row-span-2 sm:p-6">
                <dt className="eyebrow text-gold-deep">Education</dt>
                <dd className="mt-4 space-y-3">
                  {education.map((e) => (
                    <p key={e.award} className="text-[0.9375rem] leading-snug">
                      <span className="font-semibold text-ink">{e.award}</span>
                      <span className="block text-[0.875rem] text-slate">{e.institution}</span>
                    </p>
                  ))}
                </dd>
              </div>
                <div className="bg-paper p-5 sm:p-6">
                  <dt className="eyebrow text-gold-deep">Qualifications</dt>
                  <dd className="mt-4 space-y-3">
                    {qualifications.map((q) => (
                      <p key={q.award} className="text-[0.9375rem] leading-snug">
                        <span className="font-semibold text-ink">{q.award}</span>
                        <span className="block text-[0.875rem] text-slate">{q.institution}</span>
                      </p>
                    ))}
                  </dd>
                </div>
                <div className="bg-paper p-5 sm:p-6">
                  <dt className="eyebrow text-gold-deep">Teaching</dt>
                  <dd className="mt-4 text-[0.9375rem] leading-relaxed text-charcoal">
                    IB Diploma Programme · UPSC Civil Services · University (Visiting Faculty, Fergusson College) · IGCSE
                  </dd>
                </div>
            </dl>

            <div className="reveal mt-6">
              <p className="eyebrow text-slate">Areas of interest</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {profile.interests.map((i) => (
                  <li key={i} className="rounded-full border border-rule-strong/60 px-3.5 py-1.5 text-[0.8125rem] text-charcoal">
                    {i}
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal mt-10 flex flex-col gap-3 sm:flex-row">
              <Action href="/about">Read my profile</Action>
              <Action href="/contact" variant="secondary">
                Connect with me
              </Action>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
