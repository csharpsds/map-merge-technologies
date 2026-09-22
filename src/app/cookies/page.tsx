import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { siteConfig } from "@/content/site-config";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Cookie Policy",
  description: `Cookie use and preferences for the ${siteConfig.name} website.`,
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <section className="py-16">
      <Container className="max-w-3xl space-y-6">
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/cookies", label: "Cookie Policy" },
          ]}
        />
        <h1 className="text-4xl font-semibold text-navy">Cookie Policy</h1>
        <p className="text-sm text-slate">Last updated: 22 September 2026</p>
        <p className="leading-7 text-ink">
          This site uses a small preference cookie (stored in local storage) so we can
          remember whether you allowed optional analytics. Essential operation of the
          site does not depend on third-party advertising cookies.
        </p>
        <h2 className="text-2xl font-semibold text-navy">Essential</h2>
        <p className="leading-7 text-slate">
          Required to remember your cookie choice and to protect the contact form from
          basic automated abuse. These cannot be switched off if you use the site.
        </p>
        <h2 className="text-2xl font-semibold text-navy">Analytics</h2>
        <p className="leading-7 text-slate">
          Optional. No analytics vendor is connected in the default codebase. If you
          enable analytics in preferences, scripts will load only after a provider is
          configured in deployment.
        </p>
        <h2 className="text-2xl font-semibold text-navy">Change your mind</h2>
        <p className="leading-7 text-slate">
          Use the Cookie preferences control at the bottom of any page, or clear site
          data in your browser.
        </p>
      </Container>
    </section>
  );
}
