/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PUBLICATIONS, HANDBOOKS AND EDITORIAL SERIES
 *
 *  Edit this file to add, remove or update publications.
 *
 *  status.label is shown on the site. Keep it factual:
 *    – Do not call anything "published" unless that has been confirmed.
 *    – Do not add publication dates, ISBNs, publishers or prices that have
 *      not been confirmed.
 *  status.confirmed records whether the status has been verified by Arjun
 *  Agrawal. Entries marked false use a neutral label ("Editorial series")
 *  that makes no claim about publication.
 *
 *  The Knowledge Series volumes and the Economics in 60 Seconds issues are
 *  taken from the catalogue on the Economics platform.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { PlatformId } from "./site";

export type Volume = {
  number: string;
  title: string;
  category: string;
  subtitle: string;
  pages: number;
  cover: string;
};

export type Issue = {
  number: string;
  title: string;
  topic: string;
  lede: string;
  cover: string;
};

export type Publication = {
  id: string;
  /** Short series identifier shown on the plate, e.g. "AAKS". */
  mark: string;
  series: string;
  title: string;
  subtitle?: string;
  description: string;
  audience: string[];
  status: { label: string; confirmed: boolean };
  /** The platform this work belongs to: sets its accent colour. */
  discipline: PlatformId;
  link?: { label: string; href: string; external: boolean };
  enquire?: boolean;
};

/** Arjun Agrawal Knowledge Series · Economics Collection · The Indian Economy Series */
export const knowledgeSeries = {
  series: "Arjun Agrawal Knowledge Series",
  collection: "Economics Collection",
  subseries: "The Indian Economy Series",
  edition: "Platinum Edition",
  format: "Digital edition (PDF, A4)",
  description:
    "A structured collection of Economics handbooks for UPSC CSE, State PCS, RBI Grade B and university-level learners. Each volume builds a topic from first principles to Indian application, with diagrams, revision frameworks and examination linkage.",
  audience: ["UPSC CSE", "State PCS", "RBI Grade B", "University learners"],
  /** As presented on the Economics platform, where volumes are available on enquiry. */
  status: { label: "Available on the Economics platform", confirmed: true },
  href: "https://ib-economics-pi.vercel.app/#/upsc/handbook-library",
  volumes: [
  { number: "I", title: "Introduction to Economics", category: "Macroeconomic Foundations", subtitle: "The Foundations of Economic Thinking, Choice, Markets and Resource Allocation.", pages: 41, cover: "/images/publications/volume-i.webp" },
  { number: "II", title: "Money & Monetary Policy", category: "Money and Banking", subtitle: "Money, Monetary Aggregates, the RBI and the Architecture of Monetary Policy in India.", pages: 43, cover: "/images/publications/volume-ii.webp" },
  { number: "III", title: "Inflation and Price Stability", category: "Inflation", subtitle: "Measurement, Drivers, Distributional Effects and India's Inflation Management Framework.", pages: 49, cover: "/images/publications/volume-iii.webp" },
  { number: "IV", title: "Taxation and Public Revenue", category: "Public Finance", subtitle: "Constitutional Foundations, Tax Design, GST and Fiscal Federalism.", pages: 49, cover: "/images/publications/volume-iv.webp" },
  { number: "V", title: "Fiscal Policy and Budget Management", category: "Fiscal Policy", subtitle: "Public Expenditure, Budgetary Architecture, Fiscal Deficits, Public Debt and Fiscal Responsibility.", pages: 49, cover: "/images/publications/volume-v.webp" },
  { number: "VI", title: "Banking and Financial Institutions", category: "Money and Banking", subtitle: "Structure, Regulation, Credit, Financial Stability and Inclusion.", pages: 50, cover: "/images/publications/volume-vi.webp" },
  { number: "VII", title: "Financial Markets and Instruments", category: "Financial Markets", subtitle: "Money Markets, Capital Markets, Securities, Investment and Market Regulation.", pages: 49, cover: "/images/publications/volume-vii.webp" },
  { number: "VIII", title: "Balance of Payments and International Trade", category: "External Sector", subtitle: "India's External Sector: Trade, Capital Flows, Exchange Rates and External Stability.", pages: 55, cover: "/images/publications/volume-viii.webp" },
  { number: "IX", title: "Global Economic Institutions and Trade Architecture", category: "International Institutions", subtitle: "Multilateral Finance, Global Trade Rules, Development Banks and India's Economic Interests.", pages: 43, cover: "/images/publications/volume-ix.webp" },
  { number: "X", title: "Indian Agriculture and Allied Sectors", category: "Agriculture", subtitle: "Transforming Indian Agriculture: Production, Productivity, Farmer Incomes, Food Security and Sustainable Growth.", pages: 45, cover: "/images/publications/volume-x.webp" },
  { number: "XI", title: "Indian Industry, Manufacturing, Trade and Labour Markets", category: "Industry and Employment", subtitle: "Industrial Transformation, Enterprise Competitiveness, Employment and the Future of Work.", pages: 50, cover: "/images/publications/volume-xi.webp" },
  ] satisfies Volume[],
};

/** Economics in 60 Seconds: short visual issues on the Economics platform. */
export const sixtySeconds = {
  series: "Economics in 60 Seconds",
  description:
    "One idea, one minute. A concise series that explains an important economic concept through a short, visual sequence, from the market for lemons to the sunk cost fallacy.",
  href: "https://ib-economics-pi.vercel.app/#/learn",
  issues: [
  { number: "001", title: "The Market for Lemons", topic: "Information asymmetry", lede: "Why the finest used car on the lot is so often the one that never sells.", cover: "/images/series/economics-in-60-seconds-001.webp" },
  { number: "002", title: "Comparative Advantage", topic: "Opportunity cost and trade", lede: "Sometimes you should let someone else do the very thing you are better at.", cover: "/images/series/economics-in-60-seconds-002.webp" },
  { number: "003", title: "The Prisoner's Dilemma", topic: "Strategic interaction", lede: "Two rational people, each acting in their own interest, end up worse off than if they had trusted each other.", cover: "/images/series/economics-in-60-seconds-003.webp" },
  { number: "004", title: "The Tragedy of the Commons", topic: "Common pool resources", lede: "What belongs to everyone is often protected by no one.", cover: "/images/series/economics-in-60-seconds-004.webp" },
  { number: "005", title: "Opportunity Cost", topic: "Scarcity and choice", lede: "The true price of any choice is the best thing you gave up to make it.", cover: "/images/series/economics-in-60-seconds-005.webp" },
  { number: "006", title: "The Power to Set Your Price", topic: "Elasticity and market power", lede: "Why one company raises prices and gets richer while another raises prices and loses its customers.", cover: "/images/series/economics-in-60-seconds-006.webp" },
  { number: "007", title: "The Bill Someone Else Pays", topic: "Externalities", lede: "Some of the most important costs never appear on the bill. Someone still pays them.", cover: "/images/series/economics-in-60-seconds-007.webp" },
  { number: "008", title: "The Margin", topic: "Marginal analysis", lede: "Great decisions are rarely about everything. They are about one more.", cover: "/images/series/economics-in-60-seconds-008.webp" },
  { number: "009", title: "Incentives", topic: "Prices, signals and behaviour", lede: "People rarely change because you ask them to. They change when the incentives change.", cover: "/images/series/economics-in-60-seconds-009.webp" },
  { number: "010", title: "The Sunk Cost Fallacy", topic: "Decision-making", lede: "The hardest thing to walk away from is what has already cost us the most.", cover: "/images/series/economics-in-60-seconds-010.webp" },
  ] satisfies Issue[],
};

/** The full set of bodies of work shown in "Beyond the Classroom" and on /work. */
export const publications: Publication[] = [
  {
    id: "knowledge-series",
    mark: "AAKS",
    series: "Arjun Agrawal Knowledge Series",
    title: "Economics Collection",
    subtitle: "The Indian Economy Series · Eleven volumes",
    description: knowledgeSeries.description,
    audience: knowledgeSeries.audience,
    status: knowledgeSeries.status,
    discipline: "economics",
    link: { label: "Explore the collection", href: knowledgeSeries.href, external: true },
    enquire: true,
  },
  {
    id: "global-politics-handbooks",
    mark: "GP",
    series: "Handbooks",
    title: "IB Global Politics Handbooks",
    description:
      "Original learning resources on key concepts, theoretical perspectives, political themes and international affairs, written for the IB Diploma Programme Global Politics course.",
    audience: ["IB DP Global Politics", "Teachers"],
    status: { label: "Original resources", confirmed: false },
    discipline: "politics",
    link: {
      label: "Explore Political Studies",
      href: "https://arjun-agrawal-political-studies.vercel.app/",
      external: true,
    },
    enquire: true,
  },
  {
    id: "the-business-brief",
    mark: "TBB",
    series: "Digital platform",
    title: "The Business Brief",
    subtitle: "Strategy. Leadership. Decisions.",
    description:
      "A dedicated learning platform and editorial resource environment for Business Management: topic library, case studies, laboratories, simulations and assessment preparation.",
    audience: ["IB DP Business Management", "Teachers", "Independent learners"],
    status: { label: "Live platform", confirmed: true },
    discipline: "business",
    link: { label: "Enter The Business Brief", href: "https://the-business-brief-dun.vercel.app/", external: true },
  },
  {
    id: "economics-in-60-seconds",
    mark: "E60",
    series: "Visual series",
    title: "Economics in 60 Seconds",
    subtitle: "One idea, one minute",
    description:
      "A concise educational series explaining important economic concepts through short, accessible visual presentations.",
    audience: ["Students", "Independent learners", "Teachers"],
    status: { label: "Ongoing series · 10 issues", confirmed: true },
    discipline: "economics",
    link: { label: "Read the issues", href: sixtySeconds.href, external: true },
  },
  {
    id: "the-global-perspective",
    mark: "TGP",
    series: "Editorial series",
    title: "The Global Perspective",
    description:
      "A series on international relations, geopolitical developments and the political questions that cross borders.",
    audience: ["Global Politics students", "UPSC CSE aspirants", "Readers of international affairs"],
    status: { label: "Editorial series", confirmed: false },
    discipline: "politics",
  },
  {
    id: "business-brief-editorial",
    mark: "TBB·E",
    series: "Editorial series",
    title: "The Business Brief Editorial Series",
    subtitle: "Strategy, Leadership and Decisions",
    description:
      "Short editorial pieces on how organisations decide: strategy under uncertainty, the work of leadership and the trade-offs behind business choices.",
    audience: ["Business Management students", "Teachers", "Readers of business"],
    status: { label: "Editorial series", confirmed: false },
    discipline: "business",
  },
];
