import type { Metadata } from "next";
import { site } from "@/data/site";

/** Page-level metadata with a canonical path and matching social previews. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = title ? `${title} · ${site.name}` : `${site.name} · ${site.title}`;
  return {
    title: title ? { absolute: fullTitle } : { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: `${site.name} · ${site.title}`,
      locale: site.locale,
      type: path === "/about" ? "profile" : "website",
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
