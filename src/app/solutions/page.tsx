import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { CtaSection } from "@/components/cta-section";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { services } from "@/content/services";
import { solutions } from "@/content/solutions";
import { siteConfig } from "@/content/site-config";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Integration Solutions",
  description:
    "Outcome-oriented MuleSoft solutions: API foundations, CloudHub 2.0 migration, reliability, security, testing, and managed support.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/solutions" },
          ]),
          serviceJsonLd({
            name: "MuleSoft integration solutions",
            description:
              "Outcome-oriented MuleSoft solutions for APIs, migration, reliability, security, testing, and managed support.",
            url: "/solutions",
          }),
        ]}
      />
      <Hero
        compact
        eyebrow="Solutions"
        title="Outcomes for integration programs that need to move"
        description="Each offering starts from a business constraint, then maps to the services and expected results that usually follow."
        primaryCta={{ href: "/contact", label: siteConfig.cta.bookConsultation }}
      />
      <section className="py-16">
        <Container>
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/solutions", label: "Solutions" },
            ]}
          />
          <div className="space-y-8">
            {solutions.map((solution) => (
              <article
                key={solution.slug}
                id={solution.slug}
                className="rounded-2xl border border-line bg-white p-6 shadow-sm md:p-8"
              >
                <h2 className="text-2xl font-semibold text-navy">{solution.title}</h2>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-semibold tracking-wide text-slate uppercase">
                      Business challenge
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-ink">{solution.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold tracking-wide text-slate uppercase">
                      Recommended approach
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-ink">{solution.approach}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-sm font-semibold tracking-wide text-slate uppercase">
                    Relevant services
                  </h3>
                  <ul className="mt-2 flex flex-wrap gap-3">
                    {solution.services.map((slug) => {
                      const service = services.find((item) => item.slug === slug);
                      if (!service) return null;
                      return (
                        <li key={slug}>
                          <Link
                            href={`/services/${slug}`}
                            className="text-sm font-medium text-electric hover:underline"
                          >
                            {service.shortTitle}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="mt-6">
                  <h3 className="text-sm font-semibold tracking-wide text-slate uppercase">
                    Expected outcomes
                  </h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-ink">
                    {solution.outcomes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-electric"
                >
                  {siteConfig.cta.bookConsultation}
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <CtaSection />
    </>
  );
}
