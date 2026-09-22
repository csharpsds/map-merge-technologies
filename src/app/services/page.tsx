import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { CtaSection } from "@/components/cta-section";
import { FaqAccordion } from "@/components/faq-accordion";
import { Hero } from "@/components/hero";
import { ServicesBrowser } from "@/components/services-browser";
import { JsonLd } from "@/components/json-ld";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site-config";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "MuleSoft Integration Services",
  description:
    "MuleSoft architecture, API development, migration, DevOps, security, managed services, testing, and enablement from Map & Merge Technologies.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          serviceJsonLd({
            name: "MuleSoft integration services",
            description:
              "MuleSoft architecture, API development, migration, DevOps, security, managed services, testing, and enablement.",
            url: "/services",
          }),
        ]}
      />
      <Hero
        compact
        eyebrow="Services"
        title="MuleSoft integration services from strategy to support"
        description="Nine service areas covering architecture, API delivery, modernization, security, quality, and production operations."
        primaryCta={{ href: "/contact", label: siteConfig.cta.bookConsultation }}
      />
      <section className="py-16">
        <Container>
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/services", label: "Services" },
            ]}
          />
          <ServicesBrowser />
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-navy">Service details</h2>
            <p className="mt-3 max-w-2xl text-slate">
              Expand a service for capabilities, or open the full page for approach,
              outcomes, and related work.
            </p>
            <div className="mt-6">
              <FaqAccordion
                items={services.map((service) => ({
                  question: service.title,
                  answer: `${service.heroDescription} Capabilities include ${service.capabilities.slice(0, 6).join(", ")}.`,
                }))}
              />
            </div>
            <ul className="mt-8 flex flex-wrap gap-3 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="text-electric hover:underline">
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
      <CtaSection />
    </>
  );
}
