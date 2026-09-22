import { Suspense } from "react";
import { ArticleCard } from "@/components/article-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { InsightsBrowser } from "@/components/insights-browser";
import { JsonLd } from "@/components/json-ld";
import { LoadingState } from "@/components/loading-state";
import { NewsletterForm } from "@/components/newsletter-form";
import { articles, featuredArticles } from "@/content/articles";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Insights",
  description:
    "Notes on Mule 3 to 4 migration, CloudHub 2.0 readiness, Java 17, API-led design, MUnit, API security, and MuleSoft CI/CD.",
  path: "/insights",
});

export default function InsightsPage() {
  const featured = featuredArticles()[0] ?? articles[0];

  return (
    <section className="py-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
        ])}
      />
      <Container>
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/insights", label: "Insights" },
          ]}
        />
        <h1 className="text-4xl font-semibold text-navy">Insights</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate">
          Practical writing for teams running MuleSoft programs. Articles are local mock
          content structured so a CMS can replace them later.
        </p>

        {featured ? (
          <div className="mt-10">
            <p className="text-xs font-semibold tracking-[0.2em] text-electric uppercase">
              Featured
            </p>
            <div className="mt-4 max-w-xl">
              <ArticleCard article={featured} />
            </div>
          </div>
        ) : null}

        <div className="mt-14">
          <Suspense fallback={<LoadingState label="Loading articles" />}>
            <InsightsBrowser />
          </Suspense>
        </div>

        <aside className="mt-16 rounded-2xl border border-line bg-white p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-navy">Get new articles</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate">
            Leave a business email if you want to be notified when new insights are
            published. This form does not send mail until an email provider is connected.
          </p>
          <NewsletterForm />
        </aside>
      </Container>
    </section>
  );
}
