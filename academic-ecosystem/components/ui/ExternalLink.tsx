import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** An inline external link: new tab, safe rel, and a screen-reader note. */
export function ExternalLink({
  href,
  children,
  className,
  icon = true,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  icon?: boolean;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn("nudge-diag inline-flex items-center gap-1.5", className)}>
      <span>{children}</span>
      {icon && <ArrowUpRight className="size-[0.95em] shrink-0" strokeWidth={1.75} aria-hidden />}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
