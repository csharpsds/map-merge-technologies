import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CareerApplicationForm } from "@/components/career-application-form";
import { Container } from "@/components/container";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { getJob, jobs } from "@/content/jobs";
import { breadcrumbJsonLd, jobPostingJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";
import { careersDeliveryConfigured } from "@/lib/submissions";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return {};
  return createMetadata({
    title: job.title,
    description: job.summary,
    path: `/careers/${job.slug}`,
  });
}

export default async function CareerJobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  const acceptingApplications = careersDeliveryConfigured();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Careers", path: "/careers" },
            { name: job.title, path: `/careers/${job.slug}` },
          ]),
          jobPostingJsonLd(job),
        ]}
      />
      <Hero
        compact
        eyebrow="Open position"
        title={job.title}
        description={job.summary}
        primaryCta={{ href: `#apply`, label: "Apply for this role" }}
        secondaryCta={{ href: "/careers", label: "All careers" }}
      />
      <section className="py-16">
        <Container className="max-w-3xl space-y-10">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/careers", label: "Careers" },
              { href: `/careers/${job.slug}`, label: job.title },
            ]}
          />
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-line bg-white px-3 py-1 text-slate">
              {job.location}
            </span>
            <span className="rounded-full border border-line bg-white px-3 py-1 text-slate">
              {job.employmentType}
            </span>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-navy">The role</h2>
            {job.description.map((paragraph) => (
              <p key={paragraph} className="text-base leading-7 text-slate">
                {paragraph}
              </p>
            ))}
          </div>
          <section id="apply" className="scroll-mt-28">
            <h2 className="text-2xl font-semibold text-navy">Application</h2>
            <p className="mt-3 text-base leading-7 text-slate">
              Apply for {job.title}, or send a{" "}
              <Link href="/careers/apply" className="font-medium text-electric hover:underline">
                general expression of interest
              </Link>
              .
            </p>
            <div className="mt-6 rounded-2xl border border-line bg-white p-6 shadow-sm md:p-8">
              <CareerApplicationForm
                defaultInterest={job.title}
                acceptingApplications={acceptingApplications}
                heading={`Apply for ${job.title}`}
              />
            </div>
          </section>
        </Container>
      </section>
    </>
  );
}
