import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Monogram } from "@/components/ui/Monogram";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { contact, footerNavigation, platforms, site, socials } from "@/data/site";
import { accent } from "@/lib/accents";

export function SiteFooter() {
  return (
    <footer className="on-dark grain-dark relative overflow-hidden bg-navy-deep text-ivory" aria-labelledby="footer-title">
      {/* A faint construction grid, echoing the hero's orbital geometry */}
      <svg aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[720px] w-[720px] opacity-[0.07]" viewBox="0 0 720 720" fill="none">
        {[120, 200, 280, 350].map((r) => (
          <circle key={r} cx="360" cy="360" r={r} stroke="#d6bd84" strokeWidth="1" />
        ))}
        <line x1="0" y1="360" x2="720" y2="360" stroke="#d6bd84" />
        <line x1="360" y1="0" x2="360" y2="720" stroke="#d6bd84" />
      </svg>

      <div className="shell relative pb-10 pt-20 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Monogram tone="dark" className="h-14 w-auto" />
            <h2 id="footer-title" className="display mt-8 text-[3rem] leading-[0.95] text-ivory sm:text-[3.75rem]">
              {site.name}
            </h2>
            <p className="mt-3 text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-gold-light">{site.title}</p>
            <p className="mt-6 font-serif text-xl italic text-ivory/80">{site.tagline}</p>
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-mist">
              One educator. One identity. Three specialist platforms in Economics, Business Management, and Political
              Studies &amp; Global Affairs.
            </p>
          </div>

          <div className="grid gap-12 sm:grid-cols-3 lg:col-span-7 lg:gap-8">
            <nav aria-label="Footer">
              <h3 className="eyebrow text-gold-light">Navigate</h3>
              <ul className="mt-6 space-y-1">
                {footerNavigation.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="link-underline inline-flex min-h-10 items-center text-[0.9375rem] text-ivory/85 hover:text-ivory">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="eyebrow text-gold-light">Explore the platforms</h3>
              <ul className="mt-6 space-y-4">
                {platforms.map((p) => (
                  <li key={p.id}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group nudge-diag flex items-start gap-3"
                    >
                      <span aria-hidden className="mt-1.5 size-2 shrink-0 rounded-full" style={{ backgroundColor: accent[p.id].lightHex }} />
                      <span>
                        <span className="block text-[0.9375rem] font-semibold text-ivory group-hover:text-gold-light">
                          {p.discipline === "Economics" ? "Economics" : p.name}
                          <ArrowUpRight aria-hidden className="ml-1 inline size-3.5 align-[-2px]" strokeWidth={1.75} />
                        </span>
                        <span className="mt-0.5 block text-[0.8125rem] text-mist">{p.descriptor}</span>
                      </span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="eyebrow text-gold-light">Connect</h3>
              <a
                href={`mailto:${contact.email}`}
                className="link-underline mt-6 inline-block break-all text-[0.9375rem] font-semibold text-ivory"
              >
                {contact.email}
              </a>
              <ul className="mt-6 space-y-1">
                {socials.map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-10 items-center gap-3 text-[0.9375rem] text-ivory/85 hover:text-ivory"
                    >
                      <BrandIcon id={s.id} className="size-4 text-gold-light" />
                      {s.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-ivory/10 pt-8">
          <div className="grid gap-6 text-[0.8125rem] leading-relaxed text-mist lg:grid-cols-12">
            <p className="lg:col-span-7">{site.disclaimer}</p>
            <p className="lg:col-span-5 lg:text-right">
              © {site.copyrightYear} {site.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
