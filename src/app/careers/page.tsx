import Link from "next/link";
import { GitBranch, MessagesSquare, Workflow } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CareerApplicationForm } from "@/components/career-application-form";
import { Container } from "@/components/container";
import { CtaSection } from "@/components/cta-section";
import { EmptyState } from "@/components/empty-state";
import { Hero } from "@/components/hero";
import { JobCard } from "@/components/job-card";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { careersContent } from "@/content/careers";
import { jobs } from "@/content/jobs";
import { siteConfig } from "@/content/site-config";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";
import { careersDeliveryConfigured } from "@/lib/submissions";

const sectionIcons = {
  "the-work": Workflow,
  collaboration: MessagesSquare,
  growth: GitBranch,
} as const;

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  title: "Careers",
  description: careersContent.metaDescription,
  path: "/careers",
});

export default function CareersPage() {
  const acceptingApplications = careersDeliveryConfigured();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ])}
      />
      <Hero
        compact
        eyebrow={careersContent.eyebrow}
        title={careersContent.title}
        description={careersContent.introduction}
        primaryCta={{ href: "/careers#open-positions", label: "Open positions" }}
        secondaryCta={{ href: "/careers#apply", label: "Express interest" }}
      />
      <section className="py-16">
        <Container className="space-y-14">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/careers", label: "Careers" },
            ]}
          />

          <div className="grid gap-4 lg:grid-cols-3">
            {careersContent.sections.map((section) => {
              const Icon = sectionIcons[section.id];
              return (
                <article
                  key={section.id}
                  className="rounded-2xl border border-line bg-white p-6 shadow-sm"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-canvas text-electric">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h2 className="mt-5 text-xl font-semibold text-navy">{section.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate">{section.body}</p>
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-ink">
                    {section.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-teal" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          <section id="open-positions" className="scroll-mt-28">
            <SectionHeading
              eyebrow="Roles"
              title={careersContent.positions.title}
              description={careersContent.positions.description}
            />
            {jobs.length === 0 ? (
              <div className="mt-8">
                <EmptyState
                  title={careersContent.positions.emptyTitle}
                  description={careersContent.positions.emptyDescription}
                />
              </div>
            ) : (
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {jobs.map((job) => (
                  <JobCard key={job.slug} job={job} />
                ))}
              </div>
            )}
          </section>

          <section id="apply" className="scroll-mt-28">
            <SectionHeading
              eyebrow="Apply"
              title={careersContent.apply.title}
              description={careersContent.apply.description}
            />
            <div className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-sm md:p-8">
              <CareerApplicationForm
                acceptingApplications={acceptingApplications}
                heading={careersContent.apply.generalTitle}
              />
            </div>
            <p className="mt-4 text-sm text-slate">
              Project work belongs on the{" "}
              <Link href="/contact" className="font-medium text-electric hover:underline">
                contact form
              </Link>
              , not this application.
            </p>
          </section>
        </Container>
      </section>
      <CtaSection
        heading="Have an integration project instead?"
        body="Careers is for people who want to do the work. If you need architecture, migration, capacity, or support, start with a consultation."
        primary={{ href: "/contact", label: siteConfig.cta.bookConsultation }}
        secondary={{ href: "/services", label: siteConfig.cta.exploreServices }}
      />
    </>
  );
}
