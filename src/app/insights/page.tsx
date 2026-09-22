import { Suspense } from "react";
import Link from "next/link";
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
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate">
          Longer working notes for teams running MuleSoft programs: migration sequencing,
          CloudHub 2.0 readiness, Java 17, API-led reuse, MUnit, security reviews, and
          pipelines. Each article includes a table of contents and takeaways.
        </p>

        {featured ? (
          <div className="mt-10 overflow-hidden rounded-3xl border border-line bg-navy p-6 text-white md:p-8">
            <p className="text-xs font-semibold tracking-[0.2em] text-cyan uppercase">
              Featured
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold">{featured.title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75">{featured.excerpt}</p>
            <p className="mt-4 text-xs text-white/60">
              {featured.date} · {featured.readingTime} · {featured.sections.length} sections
            </p>
            <Link
              href={`/insights/${featured.slug}`}
              className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-cyan"
            >
              Read the full note
            </Link>
          </div>
        ) : null}

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featuredArticles()
            .slice(1, 4)
            .map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
        </div>

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
