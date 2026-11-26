/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SECTION CONTENT
 *  Pathways (teaching and mentoring), the learning philosophy, the
 *  intellectual map and platform discovery. Copy that belongs to a single
 *  section and is likely to be revised lives here.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { PlatformId } from "./site";

/* ── Teaching, mentoring and academic engagement ──────────────────────────── */

export type Pathway = {
  id: string;
  index: string;
  audience: string;
  subjects: string;
  description: string;
  includes: string[];
  platforms: PlatformId[];
  enquiry: { label: string; subject: string };
};

export const pathways: Pathway[] = [
  {
    id: "ib",
    index: "I",
    audience: "IB Diploma Programme",
    subjects: "Economics · Business Management · Global Politics",
    description:
      "Academic guidance across three Diploma Programme subjects, built on conceptual learning and the analytical habits the assessment rewards.",
    includes: ["Conceptual learning", "Examination preparation", "Internal Assessment support", "Extended Essay support"],
    platforms: ["economics", "business", "politics"],
    enquiry: { label: "Enquire about IB guidance", subject: "IB Diploma Programme guidance enquiry" },
  },
  {
    id: "upsc",
    index: "II",
    audience: "UPSC Civil Services",
    subjects: "Economics · Indian Polity · International Relations · Political Science",
    description:
      "Structured academic learning for General Studies and the PSIR Optional, connecting concepts to Indian institutions and to the way the examination asks about them.",
    includes: ["Economics for GS", "Indian Polity and Governance", "International Relations", "PSIR-related learning"],
    platforms: ["economics", "politics"],
    enquiry: { label: "Enquire about UPSC mentoring", subject: "UPSC mentoring enquiry" },
  },
  {
    id: "university",
    index: "III",
    audience: "University Students",
    subjects: "Economics · Political Science",
    description:
      "Analytical depth for undergraduate and postgraduate learners: the concepts behind the syllabus and the debates that sit beyond it.",
    includes: ["Core concepts", "Analytical understanding", "Academic enrichment", "Reading and argument"],
    platforms: ["economics", "politics"],
    enquiry: { label: "Enquire about academic support", subject: "University academic support enquiry" },
  },
  {
    id: "educators",
    index: "IV",
    audience: "Teachers and Educators",
    subjects: "Resources · Visual learning · Academic tools",
    description:
      "Original teaching resources, visual learning materials and classroom-ready tools, designed by a practising teacher for use in real lessons.",
    includes: ["Original teaching resources", "Visual learning materials", "Interactive academic tools", "Collaboration"],
    platforms: ["economics", "business", "politics"],
    enquiry: { label: "Discuss resources or collaboration", subject: "Educator resources and collaboration" },
  },
];

/* ── Academic philosophy ──────────────────────────────────────────────────── */

export type Principle = { index: string; verb: string; line: string; detail: string };

export const principles: Principle[] = [
  {
    index: "01",
    verb: "Understand",
    line: "Build a strong conceptual foundation.",
    detail: "Hold an idea as a mechanism, not a sentence: what happens, then what happens next.",
  },
  {
    index: "02",
    verb: "Visualise",
    line: "Translate abstract ideas into diagrams, structures and models.",
    detail: "A diagram is an argument. Draw it, label it and then use it.",
  },
  {
    index: "03",
    verb: "Connect",
    line: "Relate concepts to other disciplines and real-world developments.",
    detail: "Markets, firms and states are parts of one world. So are the subjects that study them.",
  },
  {
    index: "04",
    verb: "Analyse",
    line: "Examine evidence, assumptions and competing explanations.",
    detail: "Name the assumption doing the quiet work, and test the claim against what happened.",
  },
  {
    index: "05",
    verb: "Evaluate",
    line: "Develop balanced arguments and reasoned judgements.",
    detail: "A judgement says what the answer is, and what would reverse it.",
  },
  {
    index: "06",
    verb: "Apply",
    line: "Use knowledge to interpret real situations and solve problems.",
    detail: "Understanding is proven when it works on a case you have not seen before.",
  },
];

/* ── The intellectual map ─────────────────────────────────────────────────── */

export type MapCluster = { id: PlatformId; label: string; concepts: string[] };

export const mapClusters: MapCluster[] = [
  { id: "economics", label: "Economics", concepts: ["Markets", "Development", "Public Finance", "Trade", "Monetary Policy"] },
  { id: "business", label: "Business", concepts: ["Strategy", "Leadership", "Finance", "Innovation", "Management"] },
  {
    id: "politics",
    label: "Politics",
    concepts: ["Power", "Institutions", "Governance", "Sovereignty", "International Relations"],
  },
];

export type Intersection = {
  id: string;
  title: string;
  between: PlatformId[];
  question: string;
  description: string;
  /** Concepts (from mapClusters) that this intersection draws together. */
  concepts: string[];
};

export const intersections: Intersection[] = [
  {
    id: "political-economy",
    title: "Political Economy",
    between: ["economics", "politics"],
    question: "Who decides how resources are allocated, and in whose interest?",
    description:
      "Budgets are political documents, central banks are institutions with mandates, and trade policy is negotiated between states. Political economy studies markets and power together.",
    concepts: ["Public Finance", "Monetary Policy", "Trade", "Institutions", "Governance", "Power"],
  },
  {
    id: "markets-strategy",
    title: "Markets and Strategy",
    between: ["economics", "business"],
    question: "How do firms compete, and what do markets reward?",
    description:
      "Market structure shapes strategy; pricing, entry and innovation are economic decisions made inside organisations. The theory of the firm meets the practice of management.",
    concepts: ["Markets", "Strategy", "Finance", "Innovation"],
  },
  {
    id: "corporate-power",
    title: "Corporate Power and Governance",
    between: ["business", "politics"],
    question: "How are powerful organisations held to account?",
    description:
      "Regulation, lobbying, corporate responsibility and the governance of firms: where business decisions acquire public consequences and political systems set the rules of the game.",
    concepts: ["Leadership", "Management", "Governance", "Power", "Institutions"],
  },
  {
    id: "global-development",
    title: "Global Development and Economic Transformation",
    between: ["economics", "business", "politics"],
    question: "Why do some societies transform, and others stall?",
    description:
      "Development needs investment, enterprise and capable institutions at once. Trade, sovereignty, innovation and governance meet in the largest question all three disciplines share.",
    concepts: ["Development", "Trade", "Innovation", "Strategy", "Sovereignty", "International Relations"],
  },
];

/* ── Platform discovery: "Where would you like to begin?" ─────────────────── */

export type DiscoveryRoute = { platform: PlatformId; what: string; hrefSuffix?: string };
export type DiscoveryInterest = { id: string; label: string; note: string; routes: DiscoveryRoute[] };

export const discovery: DiscoveryInterest[] = [
  {
    id: "economics",
    label: "Economics",
    note: "One platform covers Economics in depth.",
    routes: [{ platform: "economics", what: "Concepts, diagrams, laboratories and examination preparation." }],
  },
  {
    id: "business",
    label: "Business Management",
    note: "Business Management has its own platform.",
    routes: [{ platform: "business", what: "Topic library, case studies, strategy and finance laboratories." }],
  },
  {
    id: "global-politics",
    label: "Global Politics",
    note: "Global Politics sits within Political Studies & Global Affairs.",
    routes: [{ platform: "politics", what: "IB DP Global Politics, political thinkers and global affairs." }],
  },
  {
    id: "ir",
    label: "International Relations",
    note: "International Relations is covered on Political Studies & Global Affairs.",
    routes: [{ platform: "politics", what: "Theories, institutions and contemporary international developments." }],
  },
  {
    id: "polity",
    label: "Indian Polity",
    note: "Indian Polity and constitutional studies are on Political Studies & Global Affairs.",
    routes: [{ platform: "politics", what: "Indian Polity and Governance, constitutional studies and the Knowledge Atlas." }],
  },
  {
    id: "upsc",
    label: "UPSC Preparation",
    note: "UPSC preparation spans two platforms. Choose by subject.",
    routes: [
      { platform: "economics", what: "UPSC CSE Economics: handbooks, syllabus coverage and current developments." },
      { platform: "politics", what: "Indian Polity, International Relations and the PSIR Optional." },
    ],
  },
  {
    id: "ib",
    label: "IB Diploma Programme",
    note: "Three IB DP subjects, one platform each. Choose your subject.",
    routes: [
      { platform: "economics", what: "IB DP Economics, with IA and EE support." },
      { platform: "business", what: "IB DP Business Management, with the Assessment Centre." },
      { platform: "politics", what: "IB DP Global Politics, with original handbooks." },
    ],
  },
];
