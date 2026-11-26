/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CENTRAL SITE CONFIGURATION
 *  Arjun Agrawal · The Academic Ecosystem
 *
 *  This file holds the identity of the website: the profile, education,
 *  experience, contact details, social links and the three platforms.
 *  Every page and component reads from here, so a change made once appears
 *  everywhere (header, footer, homepage, About, Ecosystem, Contact, SEO and
 *  structured data).
 *
 *  Related data files:
 *    data/publications.ts  – publications, handbooks, editorial series
 *    data/insights.ts      – featured ideas and selected work (Section 08)
 *    data/content.ts       – pathways, philosophy, the intellectual map,
 *                            platform discovery
 *
 *  Rule for editing: add only verified information. Nothing here should
 *  describe a position, credential, date or result that has not been
 *  confirmed.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Arjun Agrawal",
  title: "The Academic Ecosystem",
  tagline: "Ideas. Knowledge. Perspectives.",
  descriptor: ["Economics", "Business Management", "Political Studies", "Global Affairs"],
  /** Used for page descriptions, social previews and search results. */
  description:
    "Arjun Agrawal is an educator and academic resource creator working across Economics, Business Management and Political Studies. The Academic Ecosystem brings together three independent learning platforms, original handbooks and editorial series.",
  /**
   * The canonical address. Set NEXT_PUBLIC_SITE_URL in Vercel once the custom
   * domain is live (for example https://arjunagrawal.com). Until then the
   * Vercel production address is used automatically. See lib/site-url.ts.
   */
  preferredDomain: "https://arjunagrawal.com",
  locale: "en_IN",
  copyrightYear: 2026,
  disclaimer:
    "The three academic platforms are independently developed educational resources. They are not official International Baccalaureate publications and are not endorsed by the International Baccalaureate Organization.",
} as const;

/* ── Profile ──────────────────────────────────────────────────────────────── */

export const profile = {
  name: "Arjun Agrawal",
  /** The descriptor used beneath the name. */
  descriptor: "Educator · Academic Resource Creator · Platform Developer",
  currentRole: {
    title: "DP Economics & Global Politics Facilitator",
    organisation: "Symbiosis International School",
    location: "Pune",
  },
  portrait: {
    src: "/images/arjun-agrawal-portrait.jpg",
    width: 652,
    height: 674,
    alt: "Arjun Agrawal, smiling, in a navy suit and grey tie, photographed against a stone wall",
  },
  /** Short biography: homepage. */
  bioShort: [
    "Arjun Agrawal is an educator and academic resource creator working across Economics, Business Management and Global Politics. His work brings together conceptual understanding, visual explanation, critical inquiry and real-world application.",
    "Through teaching, academic writing, original learning resources and independent digital platforms, he works to make complex ideas accessible while asking students to think critically, weigh evidence and arrive at perspectives of their own.",
  ],
  /** Longer biography: About page. */
  bioLong: [
    "Arjun Agrawal is an educator whose work sits where economics, business and politics meet. He is currently DP Economics & Global Politics Facilitator at Symbiosis International School, Pune, and his academic engagements include Visiting Faculty at Fergusson College, Pune.",
    "His teaching spans the IB Diploma Programme, where he has taught Economics, Business Management and Global Politics; the IGCSE, where he has taught Global Perspectives; and the UPSC Civil Services Examination, where he teaches and mentors aspirants in Economics.",
    "He studied Economics and Political Science at St. Stephen's College, University of Delhi, and holds postgraduate degrees in Economics from Fergusson College, Pune, and in Political Science from IGNOU. He has qualified UGC-NET and MH-SET in Economics.",
    "Alongside the classroom, he writes handbooks, designs visual learning resources and builds independent digital platforms: one each for Economics, Business Management, and Political Studies & Global Affairs. They grew out of teaching, and they share one conviction: that understanding comes before memorisation, and that the most useful questions often sit between disciplines.",
  ],
  interests: [
    "Political economy",
    "Development economics",
    "Public finance and monetary policy",
    "Business strategy and decision-making",
    "International relations",
    "Indian polity and governance",
    "Political theory",
    "Visual and conceptual pedagogy",
  ],
  /** Teaching approach, in the third person. */
  approach:
    "Mechanism before definition. Diagram before argument. Evidence before judgement. The aim is not a student who can recite an answer, but one who can build it, test it against what actually happened, and say what would change it.",
  /** Lines Arjun Agrawal has used on his own platforms. Quoted verbatim. */
  quotes: [
    { text: "The classroom is the laboratory. The platform is the extension.", source: "Arjun Agrawal" },
    {
      text: "Every model rests on something. Naming it is the difference between using a model and believing one.",
      source: "Arjun Agrawal",
    },
  ],
} as const;

/* ── Education and qualifications ─────────────────────────────────────────── */

export type Credential = { award: string; institution: string; note?: string };

export const education: Credential[] = [
  { award: "MA Economics", institution: "Fergusson College, Pune" },
  { award: "MA Political Science", institution: "Indira Gandhi National Open University (IGNOU)" },
  {
    award: "BA Economics and Political Science",
    institution: "St. Stephen's College, University of Delhi",
  },
];

export const qualifications: Credential[] = [
  { award: "UGC-NET", institution: "Qualified in Economics" },
  { award: "MH-SET", institution: "Qualified in Economics" },
];

/* ── Experience ───────────────────────────────────────────────────────────── */

export type Experience = { role: string; context: string; current?: boolean };

export const experience: Experience[] = [
  {
    role: "DP Economics & Global Politics Facilitator",
    context: "Symbiosis International School, Pune",
    current: true,
  },
  { role: "Visiting Faculty", context: "Fergusson College, Pune" },
  { role: "UPSC Economics", context: "Teaching and mentoring Civil Services aspirants" },
  {
    role: "IB Diploma Programme",
    context: "Teaching Economics, Business Management and Global Politics",
  },
  { role: "IGCSE Global Perspectives", context: "Teaching at the IGCSE level" },
  {
    role: "Academic resource development",
    context: "Handbooks, visual learning resources and three independent learning platforms",
  },
];

/* ── Contact and social ───────────────────────────────────────────────────── */

export const contact = {
  email: "arjun1agr@gmail.com",
  /** Prefilled subjects for enquiry links. */
  subjects: {
    general: "Enquiry via The Academic Ecosystem",
    mentoring: "Academic mentoring enquiry",
    collaboration: "Academic collaboration",
    resources: "Teaching resources enquiry",
    initiatives: "Educational initiative",
    publications: "Publications enquiry",
  },
} as const;

export type SocialLink = {
  id: "linkedin" | "youtube" | "instagram";
  label: string;
  handle: string;
  href: string;
  purpose: string;
};

/** Verified from the Economics platform. Do not add unverified accounts. */
export const socials: SocialLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "Arjun Agrawal",
    href: "https://www.linkedin.com/in/arjun-agrawal-560405310/",
    purpose: "Articles, carousels and professional updates",
  },
  {
    id: "youtube",
    label: "YouTube",
    handle: "@arjunagrawal5724",
    href: "https://www.youtube.com/@arjunagrawal5724",
    purpose: "Video explainers and lessons",
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@imarjun101",
    href: "https://instagram.com/imarjun101",
    purpose: "Short visual insights",
  },
];

/* ── The three platforms ──────────────────────────────────────────────────── */

export type PlatformId = "economics" | "business" | "politics";

export type Platform = {
  id: PlatformId;
  index: string;
  /** Discipline label. */
  discipline: string;
  /** Platform brand name. */
  name: string;
  /** Shorter name for tight spaces. */
  shortName: string;
  descriptor: string;
  description: string;
  highlights: string[];
  /** Fuller description of what is inside: Ecosystem page. */
  areas: string[];
  audiences: string[];
  url: string;
  cta: string;
  /** CSS custom-property prefix: --economics, --business, --politics */
  accent: PlatformId;
};

export const platforms: Platform[] = [
  {
    id: "economics",
    index: "01",
    discipline: "Economics",
    name: "Arjun Agrawal Economics",
    shortName: "Economics",
    descriptor: "Think beyond the numbers.",
    description:
      "Economic ideas, models, institutions and real-world developments, in a comprehensive learning environment built for IB Diploma Programme students, UPSC CSE aspirants and independent learners.",
    highlights: [
      "IB DP Economics",
      "UPSC CSE Economics",
      "Interactive economic laboratories",
      "Visual learning and diagrams",
      "Examination preparation",
      "Original academic resources",
    ],
    areas: [
      "IB Diploma Programme Economics",
      "UPSC CSE Economics",
      "Concepts, diagrams and applications",
      "Interactive economic laboratories",
      "Mindmaps and visual learning resources",
      "Question banks, examination preparation and revision",
      "Internal Assessment and Extended Essay support",
      "Teacher resources and academic tools",
    ],
    audiences: ["IB DP students", "UPSC CSE aspirants", "Teachers", "Independent learners"],
    url: "https://ib-economics-pi.vercel.app/",
    cta: "Explore Economics",
    accent: "economics",
  },
  {
    id: "business",
    index: "02",
    discipline: "Business Management",
    name: "The Business Brief",
    shortName: "The Business Brief",
    descriptor: "Strategy. Leadership. Decisions.",
    description:
      "An interactive world of business management, where strategic frameworks, financial analysis, organisational decisions and real cases become tools for deeper understanding.",
    highlights: [
      "IB DP Business Management",
      "Case studies and simulations",
      "Strategy and finance laboratories",
      "Business frameworks",
      "Examination preparation",
      "Interactive decision-making",
    ],
    areas: [
      "IB DP Business Management",
      "A complete topic library and syllabus coverage",
      "Business case studies",
      "Strategy and financial laboratories",
      "Business simulations and decision-making tools",
      "Mindmaps, frameworks and diagrams",
      "Assessment Centre and examination preparation",
      "Internal Assessment support",
    ],
    audiences: ["IB DP students", "Teachers", "Independent learners"],
    url: "https://the-business-brief-dun.vercel.app/",
    cta: "Enter The Business Brief",
    accent: "business",
  },
  {
    id: "politics",
    index: "03",
    discipline: "Political Studies & Global Affairs",
    name: "Political Studies & Global Affairs",
    shortName: "Political Studies",
    descriptor: "Understand power. Interpret the world.",
    description:
      "Political ideas, constitutional institutions, international relationships and the forces shaping contemporary global affairs.",
    highlights: [
      "IB DP Global Politics",
      "Indian Polity and Governance",
      "International Relations",
      "PSIR Optional",
      "Political thinkers and theory",
      "Knowledge Atlas and academic resources",
    ],
    areas: [
      "IB DP Global Politics",
      "Indian Polity and Governance",
      "International Relations",
      "PSIR Optional for UPSC CSE",
      "Political theory and political thinkers",
      "Constitutional studies",
      "Global affairs and contemporary developments",
      "Knowledge Atlas, interactive laboratories and original handbooks",
    ],
    audiences: ["IB DP students", "UPSC CSE aspirants", "University students", "Independent learners"],
    url: "https://arjun-agrawal-political-studies.vercel.app/",
    cta: "Explore Political Studies",
    accent: "politics",
  },
];

export const platformById = (id: PlatformId): Platform => {
  const p = platforms.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown platform: ${id}`);
  return p;
};

/* ── Navigation ───────────────────────────────────────────────────────────── */

export const navigation = [
  { label: "About", href: "/about" },
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Work", href: "/work" },
  { label: "Teaching", href: "/#teaching" },
] as const;

export const footerNavigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Academic Ecosystem", href: "/ecosystem" },
  { label: "Publications", href: "/work" },
  { label: "Teaching & Mentoring", href: "/#teaching" },
  { label: "Contact", href: "/contact" },
] as const;
