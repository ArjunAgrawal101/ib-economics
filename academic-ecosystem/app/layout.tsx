import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope, Newsreader } from "next/font/google";
import "@/styles/globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StructuredData } from "@/components/StructuredData";
import { site } from "@/data/site";
import { siteUrl } from "@/lib/site-url";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
  axes: ["opsz"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${site.name} · ${site.title}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: `${site.name} · ${site.title}`,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    "Arjun Agrawal",
    "Arjun Agrawal Economics",
    "IB Economics",
    "IB Global Politics",
    "IB Business Management",
    "UPSC Economics",
    "Political Studies",
    "Academic resources",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: `${site.name} · ${site.title}`,
    title: `${site.name} · ${site.title}`,
    description: site.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.title}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f0e6" },
    { media: "(prefers-color-scheme: dark)", color: "#0f203b" },
  ],
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth" className={`${instrument.variable} ${newsreader.variable} ${manrope.variable}`}>
      <body className="grain min-h-dvh">
        <a
          href="#main"
          className="sr-only-focusable fixed left-4 top-4 z-[100] rounded-sm bg-ink px-4 py-3 text-sm font-semibold text-ivory"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <StructuredData />
      </body>
    </html>
  );
}
