import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { CtaSection } from "@/components/cta-section";
import { JsonLd } from "@/components/json-ld";
import { TechnologyBadge } from "@/components/technology-badge";
import { articles, getArticle, relatedArticles } from "@/content/articles";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return createMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/insights/${article.slug}`,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const related = relatedArticles(article);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
            { name: article.title, path: `/insights/${article.slug}` },
          ]),
          articleJsonLd({
            title: article.title,
            description: article.excerpt,
            url: `/insights/${article.slug}`,
            date: article.date,
          }),
        ]}
      />
      <article className="py-16">
        <Container>
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/insights", label: "Insights" },
              { href: `/insights/${article.slug}`, label: article.title },
            ]}
          />
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="max-w-3xl">
              <p className="text-sm text-slate">
                {article.date} · {article.readingTime} read
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-navy">{article.title}</h1>
              <p className="mt-4 text-lg leading-8 text-slate">{article.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {article.categories.map((category) => (
                  <TechnologyBadge key={category} label={category} />
                ))}
              </div>
              <div className="mt-10 space-y-10">
                {article.sections.map((section) => (
                  <section key={section.id} id={section.id}>
                    <h2 className="text-2xl font-semibold text-navy">{section.heading}</h2>
                    <div className="mt-4 space-y-5">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 32)} className="text-base leading-8 text-ink">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <nav
                aria-label="On this page"
                className="rounded-2xl border border-line bg-white p-5"
              >
                <p className="text-xs font-semibold tracking-[0.16em] text-slate uppercase">
                  On this page
                </p>
                <ol className="mt-3 space-y-2">
                  {article.sections.map((section, index) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="text-sm leading-6 text-navy hover:text-electric"
                      >
                        {index + 1}. {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
              <div className="rounded-2xl border border-line bg-canvas p-5">
                <p className="text-xs font-semibold tracking-[0.16em] text-electric uppercase">
                  Takeaways
                </p>
                <ul className="mt-3 space-y-3">
                  {article.takeaways.map((item) => (
                    <li key={item} className="text-sm leading-6 text-ink">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
          {related.length > 0 ? (
            <section className="mt-16">
              <h2 className="text-2xl font-semibold text-navy">Related insights</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-3">
                {related.map((item) => (
                  <ArticleCard key={item.slug} article={item} />
                ))}
              </div>
              <p className="mt-6">
                <Link href="/insights" className="text-sm font-semibold text-electric">
                  Browse all insights
                </Link>
              </p>
            </section>
          ) : null}
        </Container>
      </article>
      <CtaSection />
    </>
  );
}
