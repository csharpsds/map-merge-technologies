import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { configuredContactEntries, siteConfig } from "@/content/site-config";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Discuss MuleSoft architecture, API development, migration, staff augmentation, or managed support with Map & Merge Technologies.",
  path: "/contact",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const contactEntries = configuredContactEntries();

  return (
    <section className="py-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/contact", label: "Contact" },
            ]}
          />
          <h1 className="text-4xl font-semibold text-navy">
            {siteConfig.cta.discussGoals}
          </h1>
          <p className="mt-4 text-base leading-7 text-slate">
            Share the systems, constraints, and timing. The default handler stores nothing
            durable until you connect an email service, API, or CRM.
          </p>
          {contactEntries.length > 0 ? (
            <ul className="mt-8 space-y-2 text-sm text-ink">
              {contactEntries.map((entry) => (
                <li key={entry.label}>
                  <span className="font-medium">{entry.label}: </span>
                  {entry.href ? (
                    <a href={entry.href} className="text-electric hover:underline">
                      {entry.value}
                    </a>
                  ) : (
                    entry.value
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-8 rounded-xl border border-dashed border-line bg-white px-4 py-3 text-sm text-slate">
              Public email, phone, and street address are not published yet. Use the form
              on this page. Values can be added in{" "}
              <code className="text-navy">src/content/site-config.ts</code> or environment
              variables.
            </p>
          )}
        </div>
        <div className="rounded-2xl border border-line bg-white p-6 shadow-sm md:p-8">
          <ContactForm defaultCategory={category} />
        </div>
      </Container>
    </section>
  );
}
