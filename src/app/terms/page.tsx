import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { siteConfig } from "@/content/site-config";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Terms and Conditions",
  description: `Website terms for ${siteConfig.name}.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <section className="py-16">
      <Container className="max-w-3xl space-y-6">
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/terms", label: "Terms" },
          ]}
        />
        <h1 className="text-4xl font-semibold text-navy">Terms and Conditions</h1>
        <p className="text-sm text-slate">Last updated: 22 September 2026</p>
        <p className="leading-7 text-ink">
          By using this website you agree to these terms. They cover the public site
          only. A statement of work or services agreement governs paid delivery.
        </p>
        <h2 className="text-2xl font-semibold text-navy">No partnership claim</h2>
        <p className="leading-7 text-slate">{siteConfig.legalDisclaimer}</p>
        <h2 className="text-2xl font-semibold text-navy">Content</h2>
        <p className="leading-7 text-slate">
          Case studies are anonymized and qualitative. Insights are educational and do
          not constitute professional advice for a specific landscape. We do not
          guarantee business results from using this site or from a future engagement.
        </p>
        <h2 className="text-2xl font-semibold text-navy">Acceptable use</h2>
        <p className="leading-7 text-slate">
          Do not misuse the contact form, attempt to disrupt the service, or submit
          unlawful content. We may ignore or discard abusive or automated submissions.
        </p>
        <h2 className="text-2xl font-semibold text-navy">Liability</h2>
        <p className="leading-7 text-slate">
          The site is provided as-is. To the extent permitted by law, {siteConfig.name}{" "}
          is not liable for losses arising from reliance on public website content alone.
        </p>
      </Container>
    </section>
  );
}
