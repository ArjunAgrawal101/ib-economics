import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Action } from "@/components/ui/Action";
import { EcosystemExplorer } from "@/components/sections/EcosystemExplorer";
import { Platforms } from "@/components/sections/Platforms";
import { Discovery } from "@/components/sections/Discovery";
import { platforms, site, type PlatformId } from "@/data/site";
import { accent } from "@/lib/accents";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "The Academic Ecosystem",
  description:
    "Three independent learning platforms by Arjun Agrawal: Economics, The Business Brief (Business Management) and Political Studies & Global Affairs. What each covers and who it is for.",
  path: "/ecosystem",
});

/** Coverage, as each platform describes itself. Only stated areas are marked. */
const coverage: Array<{ area: string; on: PlatformId[] }> = [
  { area: "IB DP Economics", on: ["economics"] },
  { area: "IB DP Business Management", on: ["business"] },
  { area: "IB DP Global Politics", on: ["politics"] },
  { area: "UPSC CSE Economics", on: ["economics"] },
  { area: "Indian Polity and Governance", on: ["politics"] },
  { area: "International Relations", on: ["politics"] },
  { area: "PSIR Optional (UPSC CSE)", on: ["politics"] },
  { area: "Interactive laboratories", on: ["economics", "business", "politics"] },
  { area: "Mindmaps, frameworks and diagrams", on: ["economics", "business"] },
  { area: "Case studies and simulations", on: ["business"] },
  { area: "Examination preparation", on: ["economics", "business"] },
  { area: "Internal Assessment support", on: ["economics", "business"] },
  { area: "Extended Essay support", on: ["economics"] },
  { area: "Original handbooks", on: ["economics", "politics"] },
  { area: "Teacher resources", on: ["economics"] },
];

export default function EcosystemPage() {
  return (
    <>
      <PageHero
        eyebrow="The Academic Ecosystem"
        title={
          <>
            One educator. One identity. <em className="text-gold-deep">Three platforms.</em>
          </>
        }
        lede={
          <p>
            Each platform is an independent, specialist learning environment with its own design, depth and
            audience. Together they form a single body of academic work across economics, business and politics.
          </p>
        }
      />

      <section aria-labelledby="explorer-title" className="section-y">
        <div className="shell">
          <SectionHeading
            index="01"
            eyebrow="Ecosystem map"
            id="explorer-title"
            title={
              <>
                Explore the <em className="text-gold-deep">ecosystem.</em>
              </>
            }
            intro="Select a platform to see what it covers and who it serves."
          />
          <div className="mt-14 lg:mt-16">
            <EcosystemExplorer />
          </div>
        </div>
      </section>

      <div className="border-t border-rule bg-[#efe9dd]">
        <div className="shell pt-20 md:pt-28">
          <SectionHeading
            index="02"
            eyebrow="The platforms"
            align="split"
            title={
              <>
                Three independent <em className="text-gold-deep">destinations.</em>
              </>
            }
            intro="Each opens in a new tab and works on its own. Begin with whichever matches your subject."
          />
        </div>
        <Platforms showHeading={false} />
      </div>

      <section aria-labelledby="coverage-title" className="section-y">
        <div className="shell">
          <SectionHeading
            index="03"
            eyebrow="Coverage"
            id="coverage-title"
            align="split"
            title="Which platform, for which purpose"
            intro="A quick guide to where each subject and resource sits, as each platform describes itself."
          />
          <div className="reveal mt-12 overflow-x-auto rounded-[6px] border border-rule bg-paper">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">Areas covered by each platform</caption>
              <thead>
                <tr className="border-b border-ink/80">
                  <th scope="col" className="w-[40%] px-5 py-4 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-slate">
                    Subject or resource
                  </th>
                  {platforms.map((p) => (
                    <th key={p.id} scope="col" className="px-5 py-4">
                      <span className="flex items-center gap-2">
                        <span aria-hidden className={cn("size-2 rounded-full", accent[p.id].bg)} />
                        <span className="display text-[1.25rem] font-normal text-ink">{p.shortName}</span>
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {coverage.map((row) => (
                  <tr key={row.area} className="border-b border-rule last:border-b-0 hover:bg-ivory">
                    <th scope="row" className="px-5 py-3.5 text-[0.9375rem] font-medium text-charcoal">
                      {row.area}
                    </th>
                    {platforms.map((p) => (
                      <td key={p.id} className="px-5 py-3.5">
                        {row.on.includes(p.id) ? (
                          <>
                            <Check aria-hidden className={cn("size-5", accent[p.id].text)} strokeWidth={2} />
                            <span className="sr-only">Yes</span>
                          </>
                        ) : (
                          <>
                            <span aria-hidden className="block h-px w-4 bg-rule-strong" />
                            <span className="sr-only">No</span>
                          </>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[0.8125rem] text-slate">{site.disclaimer}</p>
        </div>
      </section>

      <div className="shell pb-20 md:pb-28">
        <Discovery compact />
        <div className="mt-14 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-[1rem] text-slate">See how the disciplines connect, or find the handbooks and series behind the platforms.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Action href="/#map-title" variant="secondary">The intellectual map</Action>
            <Action href="/work">Selected work</Action>
          </div>
        </div>
      </div>
    </>
  );
}
