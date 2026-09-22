import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CaseStudyCard } from "@/components/case-study-card";
import { Container } from "@/components/container";
import { CtaSection } from "@/components/cta-section";
import { FaqAccordion } from "@/components/faq-accordion";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { TechnologyBadge } from "@/components/technology-badge";
import { caseStudies } from "@/content/case-studies";
import { getService, services } from "@/content/services";
import { siteConfig } from "@/content/site-config";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return createMetadata({
    title: service.title,
    description: service.heroDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const relatedStudies = caseStudies.filter((study) =>
    service.relatedCaseStudies.includes(study.slug),
  );
  const relatedServices = services.filter((item) =>
    service.relatedServices.includes(item.slug),
  );

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
          serviceJsonLd({
            name: service.title,
            description: service.heroDescription,
            url: `/services/${service.slug}`,
          }),
          faqJsonLd(service.faqs),
        ]}
      />
      <Hero
        compact
        eyebrow="Service"
        title={service.title}
        description={service.heroDescription}
        primaryCta={{ href: "/contact", label: siteConfig.cta.bookConsultation }}
        secondaryCta={{ href: "/services", label: "All services" }}
      />
      <section className="py-16">
        <Container className="space-y-14">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/services", label: "Services" },
              { href: `/services/${service.slug}`, label: service.shortTitle },
            ]}
          />

          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold text-navy">Business problem</h2>
              <p className="mt-4 text-base leading-7 text-slate">{service.problem}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-navy">Delivery approach</h2>
              <p className="mt-4 text-base leading-7 text-slate">{service.approach}</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-navy">Capabilities</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.capabilities.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-navy">Customer outcomes</h2>
            <ul className="mt-6 space-y-3">
              {service.outcomes.map((item) => (
                <li key={item} className="text-sm leading-6 text-slate">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-navy">Related technologies</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {service.technologies.map((item) => (
                <TechnologyBadge key={item} label={item} />
              ))}
            </div>
          </div>

          {relatedStudies.length > 0 ? (
            <div>
              <h2 className="text-2xl font-semibold text-navy">Related case studies</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {relatedStudies.map((study) => (
                  <CaseStudyCard key={study.slug} study={study} />
                ))}
              </div>
            </div>
          ) : null}

          {relatedServices.length > 0 ? (
            <div>
              <h2 className="text-2xl font-semibold text-navy">Related services</h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {relatedServices.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/services/${item.slug}`}
                      className="text-sm font-medium text-electric hover:underline"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div>
            <h2 className="text-2xl font-semibold text-navy">Questions</h2>
            <div className="mt-6">
              <FaqAccordion items={service.faqs} />
            </div>
          </div>
        </Container>
      </section>
      <CtaSection
        heading="Need this capability on your landscape?"
        body="Tell us about the systems, constraints, and timeline. We will recommend an engagement model that matches the work."
      />
    </>
  );
}
