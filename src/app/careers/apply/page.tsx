import { Breadcrumbs } from "@/components/breadcrumbs";
import { CareerApplicationForm } from "@/components/career-application-form";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { careersContent } from "@/content/careers";
import { defaultCareerInterest } from "@/content/jobs";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";
import { careersDeliveryConfigured } from "@/lib/submissions";

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  title: "Apply",
  description:
    "Send a Map & Merge Technologies application or general expression of interest when a delivery destination is connected.",
  path: "/careers/apply",
});

export default async function CareersApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string }>;
}) {
  const { interest } = await searchParams;
  const acceptingApplications = careersDeliveryConfigured();
  const roleInterest = defaultCareerInterest(interest);

  return (
    <section className="py-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
          { name: "Apply", path: "/careers/apply" },
        ])}
      />
      <Container className="max-w-3xl">
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/careers", label: "Careers" },
            { href: "/careers/apply", label: "Apply" },
          ]}
        />
        <h1 className="text-4xl font-semibold text-navy">{careersContent.apply.generalTitle}</h1>
        <p className="mt-4 text-base leading-7 text-slate">{careersContent.apply.description}</p>
        <div className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-sm md:p-8">
          <CareerApplicationForm
            defaultInterest={roleInterest}
            acceptingApplications={acceptingApplications}
          />
        </div>
      </Container>
    </section>
  );
}
