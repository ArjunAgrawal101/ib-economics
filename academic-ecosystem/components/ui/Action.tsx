import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";

const base =
  "nudge inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[3px] px-5 text-[0.9375rem] font-semibold tracking-[0.005em] transition-[background-color,color,border-color,box-shadow] duration-300 ease-[var(--ease-editorial)]";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-ivory hover:bg-navy-soft shadow-[0_1px_0_0_rgba(12,26,48,0.08)]",
  secondary: "border border-ink/25 text-ink hover:border-ink hover:bg-ink/[0.03]",
  ghost: "px-0 text-ink hover:text-gold-deep min-h-10",
  light: "bg-ivory text-ink hover:bg-paper",
  "outline-light": "border border-ivory/30 text-ivory hover:border-ivory hover:bg-ivory/[0.06]",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  /** Opens in a new tab with rel="noopener noreferrer" and an accessible note. */
  external?: boolean;
  /** Accessible label when the visible text is not descriptive enough. */
  label?: string;
  icon?: "arrow" | "external" | "none";
  style?: React.CSSProperties;
};

/** A link styled as a button. Internal links use next/link; mailto and external links use <a>. */
export function Action({ href, children, variant = "primary", className, external, label, icon, style }: Props) {
  const isExternal = external ?? /^https?:\/\//.test(href);
  const iconKind = icon ?? (isExternal ? "external" : "arrow");
  const Icon = iconKind === "external" ? ArrowUpRight : ArrowRight;
  const classes = cn(base, variants[variant], iconKind === "external" && "nudge-diag", className);
  const content = (
    <>
      <span>{children}</span>
      {iconKind !== "none" && <Icon className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />}
      {isExternal && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} aria-label={label} style={style}>
        {content}
      </a>
    );
  }
  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={classes} aria-label={label} style={style}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} aria-label={label} style={style}>
      {content}
    </Link>
  );
}
