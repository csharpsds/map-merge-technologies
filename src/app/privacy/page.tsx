import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { siteConfig } from "@/content/site-config";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} handles inquiry information submitted through this website.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <section className="py-16">
      <Container className="max-w-3xl space-y-6">
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/privacy", label: "Privacy Policy" },
          ]}
        />
        <h1 className="text-4xl font-semibold text-navy">Privacy Policy</h1>
        <p className="text-sm text-slate">Last updated: 22 September 2026</p>
        <p className="leading-7 text-ink">
          This policy describes how {siteConfig.name} treats information submitted through
          this website. It is a working policy for a site that does not yet publish a
          registered office or contact email. Replace the placeholders below before
          production use with counsel-reviewed text.
        </p>
        <h2 className="text-2xl font-semibold text-navy">Information we collect</h2>
        <p className="leading-7 text-slate">
          The contact form collects name, company, business email, optional phone and
          country, a country code when a country is selected, inquiry category, project
          description, optional dates and budget, optional attachments, and consent. The
          careers form collects name, email, country and country code, role or area of
          interest, a short message, a CV, and consent. A hidden field is used only as
          spam protection. We do not invent or require additional identity documents.
        </p>
        <h2 className="text-2xl font-semibold text-navy">How we use it</h2>
        <p className="leading-7 text-slate">
          Inquiry data is used to respond to the request and to understand the type of
          work being discussed. Career applications are used only to consider a person
          for work with Map & Merge Technologies. When no email, API, or CRM destination
          is connected, the contact form validates details without storing them, and the
          careers form does not collect applications. CVs are not published or served
          from this website. When a webhook or email provider is connected, that
          provider’s terms also apply.
        </p>
        <h2 className="text-2xl font-semibold text-navy">Cookies</h2>
        <p className="leading-7 text-slate">
          Essential cookies remember cookie preferences. Optional analytics cookies stay
          off unless you enable them. See the cookie policy for details.
        </p>
        <h2 className="text-2xl font-semibold text-navy">Retention and rights</h2>
        <p className="leading-7 text-slate">
          Retention periods, a data-protection contact, and a formal request process will
          be published when an official contact channel is configured. Until then, use
          the contact form and mark the inquiry as privacy-related.
        </p>
        <p className="leading-7 text-slate">{siteConfig.legalDisclaimer}</p>
      </Container>
    </section>
  );
}
