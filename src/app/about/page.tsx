import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { CtaSection } from "@/components/cta-section";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { ProcessTimeline } from "@/components/process-timeline";
import { Statistics } from "@/components/statistics";
import { TestimonialCard } from "@/components/testimonial-card";
import { siteConfig } from "@/content/site-config";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "About Us",
  description:
    "Map & Merge Technologies is a Philippines-based MuleSoft and enterprise integration consultancy serving international customers.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ])}
      />
      <Hero
        compact
        eyebrow="About us"
        title={siteConfig.name}
        description={siteConfig.about.introduction}
        primaryCta={{ href: "/contact", label: siteConfig.cta.bookConsultation }}
      />
      <Statistics />
      <section className="py-16">
        <Container className="space-y-14">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/about", label: "About Us" },
            ]}
          />

          <div>
            <h2 className="text-2xl font-semibold text-navy">Company story</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate">
              Map & Merge Technologies was formed around a simple delivery idea: map the
              complexity in a system landscape, then merge the connections into integrations
              people can operate. The practice is Philippines-based and focused on MuleSoft,
              APIs, and modernization for international customers. We do not publish founding
              myths, office addresses, or headcount that has not been provided for this site.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-line bg-white p-6">
              <h2 className="text-2xl font-semibold text-navy">Mission</h2>
              <p className="mt-4 text-base leading-7 text-slate">{siteConfig.about.mission}</p>
            </div>
            <div className="rounded-2xl border border-line bg-white p-6">
              <h2 className="text-2xl font-semibold text-navy">Vision</h2>
              <p className="mt-4 text-base leading-7 text-slate">{siteConfig.about.vision}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-navy p-8 text-white">
            <h2 className="text-2xl font-semibold text-white">Brand promise</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/80">
              {siteConfig.about.promise}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-navy">Core values</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {siteConfig.about.values.map((value) => (
                <article key={value.title} className="rounded-2xl border border-line bg-white p-5">
                  <h3 className="text-lg font-semibold text-navy">{value.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate">{value.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-navy">Technical leadership</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate">
              Delivery is led by people who do architecture and implementation—not only
              account coordination. Design reviews, migration sequencing, security choices,
              and production support decisions stay close to the work. Individual names,
              titles, and team photos are omitted until they are approved for publication.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-navy">Certifications</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate">
              Our work is informed by the skills typically assessed in MuleSoft developer
              and architect programs: API-led design, Anypoint Platform operations,
              DataWeave, MUnit, security policies, and CI/CD. This site does not list
              certification counts, badge totals, or awards that have not been verified
              for public use.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-navy">Global delivery</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate">
              {siteConfig.globalDelivery.body}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-navy">Why the Philippines</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate">
              The Philippines offers English-language collaboration, flexible overlap with
              Asia-Pacific, Australia, New Zealand, Europe, and North America, and a
              practical remote-delivery culture. Customers get direct access to the people
              doing the technical work, with cost-efficient options compared with onshore-only
              staffing. We do not invent a city office or campus to make that point.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-navy">How we work</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate">
              Engagements follow a visible path: discovery, assessment, design,
              implementation, testing, deployment, knowledge transfer, and support. The
              commercial model can be staff augmentation, a dedicated team, a defined
              project, advisory, or managed services.
            </p>
            <div className="mt-8">
              <ProcessTimeline />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-navy">Customer comments</h2>
            <div className="mt-6">
              <TestimonialCard />
            </div>
          </div>
        </Container>
      </section>
      <CtaSection />
    </>
  );
}
