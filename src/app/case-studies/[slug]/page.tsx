import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { CtaSection } from "@/components/cta-section";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { TechnologyBadge } from "@/components/technology-badge";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site-config";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return createMetadata({
    title: study.title,
    description: study.summary,
    path: `/case-studies/${study.slug}`,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Case Studies", path: "/case-studies" },
            { name: study.title, path: `/case-studies/${study.slug}` },
          ]),
          articleJsonLd({
            title: study.title,
            description: study.summary,
            url: `/case-studies/${study.slug}`,
            date: "2026-01-01",
          }),
        ]}
      />
      <Hero
        compact
        eyebrow={study.industry}
        title={study.title}
        description={study.challenge}
        primaryCta={{ href: "/contact", label: siteConfig.cta.bookConsultation }}
        secondaryCta={{ href: "/case-studies", label: "All case studies" }}
      />
      <section className="py-16">
        <Container className="space-y-10">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/case-studies", label: "Case Studies" },
              { href: `/case-studies/${study.slug}`, label: study.title },
            ]}
          />
          <div>
            <h2 className="text-2xl font-semibold text-navy">Situation</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate">{study.situation}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-navy">What the work covered</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {study.cover.map((item) => (
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
            <h2 className="text-2xl font-semibold text-navy">Approach</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-ink">
              {study.approach.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-navy">Qualitative outcomes</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-ink">
              {study.outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-navy">Technologies</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {study.technologies.map((item) => (
                <TechnologyBadge key={item} label={item} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-navy">Related services</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {study.relatedServices.map((slugValue) => {
                const service = services.find((item) => item.slug === slugValue);
                return service ? (
                  <li key={slugValue}>
                    <Link
                      href={`/services/${slugValue}`}
                      className="text-sm font-medium text-electric hover:underline"
                    >
                      {service.title}
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
            <p className="mt-4 text-sm">
              Industry page:{" "}
              <Link
                href={`/industries#${study.industrySlug}`}
                className="font-medium text-electric hover:underline"
              >
                {study.industry}
              </Link>
            </p>
          </div>
        </Container>
      </section>
      <CtaSection />
    </>
  );
}
