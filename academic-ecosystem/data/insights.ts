/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  IDEAS, INSIGHTS AND LATEST WORK  (homepage Section 08)
 *
 *  A manually curated list. Nothing here updates automatically. To feature
 *  a new LinkedIn article, carousel, video, commentary or announcement, add
 *  an entry at the top of `insights` with a verified link.
 *
 *  category must be one of the values in `insightCategories`. The filter on
 *  the homepage shows only categories that have at least one entry, so an
 *  empty category never appears as an empty tab.
 *
 *  featured: true places the entry in the large lead position (use one).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { PlatformId } from "./site";
import { sixtySeconds } from "./publications";

export const insightCategories = [
  "Economics",
  "Business and Management",
  "Global Politics",
  "International Relations",
  "Education and Learning",
  "Academic Reflections",
] as const;

export type InsightCategory = (typeof insightCategories)[number];

export type Insight = {
  id: string;
  category: InsightCategory;
  format: "Visual issue" | "Handbook" | "Reflection" | "Platform" | "Series" | "Article" | "Video" | "Announcement";
  title: string;
  summary: string;
  href: string;
  linkLabel: string;
  discipline?: PlatformId;
  image?: { src: string; alt: string };
  featured?: boolean;
};

const issue = (n: string) => sixtySeconds.issues.find((i) => i.number === n)!;

export const insights: Insight[] = [
  {
    id: "e60-001",
    category: "Economics",
    format: "Visual issue",
    title: issue("001").title,
    summary: issue("001").lede,
    href: sixtySeconds.href,
    linkLabel: "Read on the Economics platform",
    discipline: "economics",
    image: { src: issue("001").cover, alt: "Cover of Economics in 60 Seconds, issue 001: The Market for Lemons" },
    featured: true,
  },
  {
    id: "reflection-think-economically",
    category: "Education and Learning",
    format: "Reflection",
    title: "To know economics, or to think economically",
    summary:
      "Two different objectives, with different consequences for how a lesson is run. Why the mechanism comes before the definition, and the diagram before the argument.",
    href: "https://ib-economics-pi.vercel.app/#/about",
    linkLabel: "Read the approach",
    discipline: "economics",
  },
  {
    id: "e60-003",
    category: "Economics",
    format: "Visual issue",
    title: issue("003").title,
    summary: issue("003").lede,
    href: sixtySeconds.href,
    linkLabel: "Read the issue",
    discipline: "economics",
    image: { src: issue("003").cover, alt: "Cover of Economics in 60 Seconds, issue 003: The Prisoner's Dilemma" },
  },
  {
    id: "business-brief",
    category: "Business and Management",
    format: "Platform",
    title: "Strategy, leadership and decisions, in one learning environment",
    summary:
      "The Business Brief brings the Business Management course together with case studies, simulations and laboratories for strategy and finance.",
    href: "https://the-business-brief-dun.vercel.app/",
    linkLabel: "Enter The Business Brief",
    discipline: "business",
  },
  {
    id: "political-studies",
    category: "Global Politics",
    format: "Platform",
    title: "Power, institutions and the world beyond the syllabus",
    summary:
      "Political Studies & Global Affairs connects political theory, constitutional study and international relations with the developments that test them.",
    href: "https://arjun-agrawal-political-studies.vercel.app/",
    linkLabel: "Explore Political Studies",
    discipline: "politics",
  },
  {
    id: "reflection-technology",
    category: "Academic Reflections",
    format: "Reflection",
    title: "Where technology belongs in learning",
    summary:
      "Use it where it does something a teacher cannot do at scale: immediate diagnosis, spaced retrieval, a model a student can move. Not where it merely reproduces a worksheet, or writes for a student who is meant to be learning to write.",
    href: "https://ib-economics-pi.vercel.app/#/about",
    linkLabel: "Read more",
  },
  {
    id: "knowledge-series",
    category: "Economics",
    format: "Handbook",
    title: "The Indian Economy Series, in eleven volumes",
    summary:
      "From the foundations of economic thinking to India's industry, trade and labour markets: the Economics Collection of the Arjun Agrawal Knowledge Series.",
    href: "https://ib-economics-pi.vercel.app/#/upsc/handbook-library",
    linkLabel: "View the handbook library",
    discipline: "economics",
  },
];

/** Where new writing appears between site updates. Verified profile. */
export const insightsElsewhere = {
  label: "Follow on LinkedIn",
  note: "For articles, carousels and commentary between site updates.",
  href: "https://www.linkedin.com/in/arjun-agrawal-560405310/",
};
