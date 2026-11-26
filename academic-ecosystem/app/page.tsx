import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Platforms } from "@/components/sections/Platforms";
import { Discovery } from "@/components/sections/Discovery";
import { IntellectualMap } from "@/components/sections/IntellectualMap";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { Publications } from "@/components/sections/Publications";
import { Pathways } from "@/components/sections/Pathways";
import { Philosophy } from "@/components/sections/Philosophy";
import { Insights } from "@/components/sections/Insights";
import { Connect } from "@/components/sections/Connect";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Platforms />
      <div className="shell -mt-6 pb-20 md:-mt-10 md:pb-28">
        <Discovery />
      </div>
      <IntellectualMap />
      <AboutIntro />
      <Publications />
      <Pathways />
      <Philosophy />
      <Insights />
      <Connect />
    </>
  );
}
