import { education, platforms, profile, site, socials, contact } from "@/data/site";
import { siteUrl } from "@/lib/site-url";

/** Person and WebSite structured data, built from the central configuration. */
export function StructuredData() {
  const url = siteUrl();
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${url}/#person`,
    name: profile.name,
    url,
    image: `${url}${profile.portrait.src}`,
    email: `mailto:${contact.email}`,
    jobTitle: profile.currentRole.title,
    description: site.description,
    worksFor: {
      "@type": "EducationalOrganization",
      name: profile.currentRole.organisation,
      address: { "@type": "PostalAddress", addressLocality: profile.currentRole.location, addressCountry: "IN" },
    },
    alumniOf: education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.institution })),
    hasCredential: education.map((e) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: e.award,
      recognizedBy: { "@type": "CollegeOrUniversity", name: e.institution },
    })),
    knowsAbout: [
      "Economics",
      "Business Management",
      "Global Politics",
      "Political Science",
      "International Relations",
      "Indian Polity",
      "Political Economy",
    ],
    sameAs: [...socials.map((s) => s.href), ...platforms.map((p) => p.url)],
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}/#website`,
    url,
    name: `${site.name} · ${site.title}`,
    description: site.description,
    inLanguage: "en-IN",
    author: { "@id": `${url}/#person` },
    publisher: { "@id": `${url}/#person` },
  };
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output escaped against </script> injection.
      dangerouslySetInnerHTML={{ __html: JSON.stringify([person, website]).replace(/</g, "\\u003c") }}
    />
  );
}
