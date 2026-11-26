import type { SocialLink } from "@/data/site";

/** Simplified brand glyphs for the verified social profiles. */
export function BrandIcon({ id, className = "size-[18px]" }: { id: SocialLink["id"]; className?: string }) {
  const common = { className, viewBox: "0 0 24 24", "aria-hidden": true, focusable: "false" as const };
  switch (id) {
    case "linkedin":
      return (
        <svg {...common} fill="currentColor">
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.83v1.5h.06c.53-.95 1.84-1.95 3.79-1.95 4.05 0 4.8 2.5 4.8 5.76v5.69h-4v-5.04c0-1.2-.02-2.75-1.75-2.75-1.75 0-2.02 1.31-2.02 2.66v5.13h-4v-11Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common} fill="currentColor">
          <path d="M22.54 7.2a2.77 2.77 0 0 0-1.95-1.96C18.88 4.8 12 4.8 12 4.8s-6.88 0-8.59.44A2.77 2.77 0 0 0 1.46 7.2 29 29 0 0 0 1 12a29 29 0 0 0 .46 4.8 2.77 2.77 0 0 0 1.95 1.96c1.71.44 8.59.44 8.59.44s6.88 0 8.59-.44a2.77 2.77 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-4.8ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth={1.8}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}
