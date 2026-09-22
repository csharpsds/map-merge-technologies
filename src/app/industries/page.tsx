import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { CtaSection } from "@/components/cta-section";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { industries } from "@/content/industries";
import { getCaseStudy } from "@/content/case-studies";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site-config";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Industries",
  description:
    "MuleSoft and integration approaches for banking, government, education, telecom, healthcare, retail, aviation, construction, and professional services.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ])}
      />
      <Hero
        compact
        eyebrow="Industries"
        title="Integration work shaped by the operating landscape"
        description="Typical challenges, common systems, and the services we usually apply. These are patterns, not a claim that every industry is a published client list."
        primaryCta={{ href: "/contact", label: siteConfig.cta.bookConsultation }}
      />
      <section className="py-16">
        <Container>
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/industries", label: "Industries" },
            ]}
          />
          <div className="space-y-8">
            {industries.map((industry) => {
              const study = industry.relatedCaseStudy
                ? getCaseStudy(industry.relatedCaseStudy)
                : undefined;
              return (
                <article
                  key={industry.slug}
                  id={industry.slug}
                  className="rounded-2xl border border-line bg-white p-6 shadow-sm md:p-8"
                >
                  <h2 className="text-2xl font-semibold text-navy">{industry.title}</h2>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-slate">
                    {industry.summary}
                  </p>
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-semibold tracking-wide text-slate uppercase">
                        Typical challenges
                      </h3>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-ink">
                        {industry.challenges.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold tracking-wide text-slate uppercase">
                        Common systems
                      </h3>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-ink">
                        {industry.systems.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-semibold tracking-wide text-slate uppercase">
                        Recommended approach
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-ink">{industry.approach}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold tracking-wide text-slate uppercase">
                        Potential outcomes
                      </h3>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-ink">
                        {industry.outcomes.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {industry.services.map((slug) => {
                      const service = services.find((item) => item.slug === slug);
                      return service ? (
                        <Link
                          key={slug}
                          href={`/services/${slug}`}
                          className="text-sm font-medium text-electric hover:underline"
                        >
                          {service.shortTitle}
                        </Link>
                      ) : null;
                    })}
                  </div>
                  {study ? (
                    <p className="mt-4 text-sm">
                      Related case study:{" "}
                      <Link
                        href={`/case-studies/${study.slug}`}
                        className="font-medium text-electric hover:underline"
                      >
                        {study.title}
                      </Link>
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div>
        </Container>
      </section>
      <CtaSection />
    </>
  );
}
