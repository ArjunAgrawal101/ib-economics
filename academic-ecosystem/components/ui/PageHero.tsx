import Link from "next/link";
import { cn } from "@/lib/utils";

/** The opening of an inner page: breadcrumb, eyebrow, display title and lede. */
export function PageHero({
  eyebrow,
  title,
  lede,
  children,
  aside,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden border-b border-rule", className)}>
      <div aria-hidden className="pointer-events-none absolute -right-[15%] -top-[20%] h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,rgba(179,147,80,0.12),transparent_65%)]" />
      <div className="shell relative pb-16 pt-8 sm:pb-20 lg:pb-24 lg:pt-12">
        <nav aria-label="Breadcrumb" className="intro-fade">
          <ol className="flex items-center gap-2 text-[0.8125rem] text-slate">
            <li>
              <Link href="/" className="link-underline hover:text-ink">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-ink">
              {eyebrow}
            </li>
          </ol>
        </nav>
        <div className={cn("mt-12 grid gap-12 lg:mt-16", !!aside && "lg:grid-cols-12 lg:items-end")}>
          <div className={cn(!!aside && "lg:col-span-7")}>
            <p className="intro-rise eyebrow flex items-center gap-3 text-gold-deep" style={{ "--d": "60ms" } as React.CSSProperties}>
              <span aria-hidden className="h-px w-10 bg-gold" />
              {eyebrow}
            </p>
            <h1
              className="intro-rise display mt-6 text-[3.25rem] leading-[0.92] text-ink sm:text-7xl lg:text-[5.75rem]"
              style={{ "--d": "140ms" } as React.CSSProperties}
            >
              {title}
            </h1>
            {lede && (
              <div className="intro-rise lede mt-8 max-w-2xl text-slate" style={{ "--d": "240ms" } as React.CSSProperties}>
                {lede}
              </div>
            )}
            {children && (
              <div className="intro-rise mt-10" style={{ "--d": "320ms" } as React.CSSProperties}>
                {children}
              </div>
            )}
          </div>
          {aside && <div className="intro-fade lg:col-span-5" style={{ "--d": "200ms" } as React.CSSProperties}>{aside}</div>}
        </div>
      </div>
    </section>
  );
}
