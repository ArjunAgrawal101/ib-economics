import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Action } from "@/components/ui/Action";
import { platforms } from "@/data/site";
import { accent } from "@/lib/accents";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="shell section-y grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow text-gold-deep">Error 404</p>
          <h1 className="display mt-6 text-[3.5rem] leading-[0.95] text-ink sm:text-[5.5rem]">
            This page is <em className="text-gold-deep">not in the archive.</em>
          </h1>
          <p className="lede mt-8 max-w-xl text-slate">
            The address may have changed, or the page may never have existed. The homepage and the three platforms are a
            click away.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Action href="/">Return home</Action>
            <Action href="/contact" variant="secondary">
              Contact
            </Action>
          </div>
        </div>
        <div className="lg:col-span-5 lg:pt-16">
          <p className="eyebrow text-slate">Or enter a platform</p>
          <ul className="mt-4 border-t border-rule">
            {platforms.map((p) => (
              <li key={p.id} className="border-b border-rule">
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="group flex min-h-16 items-center gap-4 py-3">
                  <span aria-hidden className={cn("h-8 w-[3px] rounded-full", accent[p.id].bg)} />
                  <span className="display flex-1 text-[1.5rem] text-ink">{p.name}</span>
                  <ArrowUpRight aria-hidden className="size-5 text-slate group-hover:text-ink" strokeWidth={1.5} />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
          <Link href="/work" className="mt-6 inline-block text-[0.9375rem] font-semibold text-ink underline underline-offset-4">
            Browse selected work
          </Link>
        </div>
      </div>
    </section>
  );
}
