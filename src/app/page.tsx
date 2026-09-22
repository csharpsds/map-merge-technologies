import Link from "next/link";
import { Check } from "lucide-react";
import { ChallengeBreakdown } from "@/components/challenge-breakdown";
import { ArticleCard } from "@/components/article-card";
import { CaseStudyCard } from "@/components/case-study-card";
import { Container } from "@/components/container";
import { CtaSection } from "@/components/cta-section";
import { EngagementCard } from "@/components/engagement-card";
import { ExpertiseTabs } from "@/components/expertise-tabs";
import { Hero } from "@/components/hero";
import { IndustryCard } from "@/components/industry-card";
import { ConnectionSequence } from "@/components/connection-sequence";
import { WhyDifference } from "@/components/why-difference";
import { IntegrationCanvas } from "@/components/integration-canvas";
import { ProcessTimeline } from "@/components/process-timeline";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { Statistics } from "@/components/statistics";
import { EcosystemShowcase } from "@/components/ecosystem-showcase";
import { featuredArticles } from "@/content/articles";
import { caseStudies } from "@/content/case-studies";
import { engagementModels } from "@/content/engagement-models";
import { featuredIndustries } from "@/content/industries";
import { featuredServices } from "@/content/services";
import { siteConfig } from "@/content/site-config";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.hero.supporting,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero
        layout="canvas"
        eyebrow="MuleSoft and enterprise integration"
        title={siteConfig.hero.headline}
        description={siteConfig.hero.supporting}
        primaryCta={{ href: "/contact", label: siteConfig.cta.talkToExpert }}
        secondaryCta={{ href: "/services", label: siteConfig.cta.exploreServices }}
      >
        <IntegrationCanvas />
      </Hero>

      <section className="bg-navy pb-10">
        <Container>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {siteConfig.trustStatements.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              >
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Statistics />

      <ConnectionSequence />

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Challenges and solutions"
            title={siteConfig.challengesHeading}
            description="Common integration constraints, and the delivery approach Map & Merge uses to address them."
          />
          <div className="mt-10">
            <ChallengeBreakdown />
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Services"
            title="Integration work from architecture to production support"
            description="Featured services for teams that need MuleSoft architecture, delivery, migration, and ongoing operations."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredServices().map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
          <p className="mt-8">
            <Link href="/services" className="text-sm font-semibold text-electric hover:text-dark-blue">
              See all services
            </Link>
          </p>
        </Container>
      </section>

      <section className="bg-canvas py-16 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Migration"
            title="Modernize Mule 3, CloudHub, and Java estates with a planned path"
            description="Assessment, compatibility, testing, and rollback belong in the plan—not after the first failed cutover."
          />
          <div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {siteConfig.migrationSpotlight.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/contact?category=MuleSoft%20Migration"
              className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-electric"
            >
              {siteConfig.cta.requestMigration}
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Engagement models"
            title="Work with the capacity model your program actually needs"
            description="Augment a team, stand up a dedicated squad, deliver a defined project, or keep production supported."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {engagementModels.map((model) => (
              <EngagementCard key={model.slug} model={model} />
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-navy py-16 text-white sm:py-24">
        <div className="grid-overlay pointer-events-none absolute inset-0 opacity-70" />
        <Container className="relative">
          <SectionHeading
            eyebrow="Technical expertise"
            title="MuleSoft delivery across platform, architecture, and DevOps"
            tone="dark"
          />
          <div className="mt-10">
            <ExpertiseTabs />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Integration ecosystem"
            title="Connect the systems already running the business"
            description="Technology names identify possible integration targets. They do not indicate partnerships or endorsements."
          />
          <div className="mt-10">
            <EcosystemShowcase />
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Industries"
            title="Integration patterns across regulated and operational landscapes"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredIndustries().map((industry) => (
              <IndustryCard key={industry.slug} industry={industry} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Case studies"
            title="Anonymized delivery examples"
            description="Qualitative outcomes only. Customer names and confidential details are not published."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {caseStudies.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-dark-blue py-16 text-white sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Global delivery"
            title={siteConfig.globalDelivery.heading}
            description={siteConfig.globalDelivery.body}
            tone="dark"
          />
          <ul className="space-y-3">
            {siteConfig.globalDelivery.highlights.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="How we work"
            title="A delivery path from discovery to support"
          />
          <div className="mt-10">
            <ProcessTimeline />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Why Map & Merge" title={siteConfig.why.heading} />
          <div className="mt-10">
            <WhyDifference />
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Insights"
            title="Practical notes on migration, APIs, and MuleSoft delivery"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {featuredArticles().map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
          <p className="mt-8">
            <Link href="/insights" className="text-sm font-semibold text-electric">
              Browse all insights
            </Link>
          </p>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
