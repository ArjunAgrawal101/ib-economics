import { cn } from "@/lib/utils";

type Props = {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  id?: string;
  tone?: "light" | "dark";
  align?: "left" | "split";
  className?: string;
  as?: "h1" | "h2";
};

/**
 * The editorial section opener: a numbered marker, a display heading and an
 * optional introduction. "split" places the introduction in a second column
 * on large screens.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  id,
  tone = "light",
  align = "left",
  className,
  as: H = "h2",
}: Props) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "reveal grid gap-6",
        align === "split" && "lg:grid-cols-12 lg:items-start lg:gap-10",
        className,
      )}
    >
      <div className={cn(align === "split" && "lg:col-span-7")}>
        <p className={cn("eyebrow flex items-center gap-3", dark ? "text-gold-light" : "text-gold-deep")}>
          {index && <span className="tabular-nums">{index}</span>}
          {index && <span aria-hidden className={cn("h-px w-8", dark ? "bg-gold-light/60" : "bg-gold/70")} />}
          <span>{eyebrow}</span>
        </p>
        <H
          id={id}
          className={cn(
            "display mt-5 text-[2.5rem] sm:text-5xl lg:text-[4rem]",
            dark ? "text-ivory" : "text-ink",
          )}
        >
          {title}
        </H>
      </div>
      {intro && (
        <div
          className={cn(
            "lede max-w-2xl",
            dark ? "text-ivory/75" : "text-slate",
            align === "split" && "lg:col-span-5 lg:pt-9",
          )}
        >
          {intro}
        </div>
      )}
    </div>
  );
}
