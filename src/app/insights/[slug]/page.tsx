import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { CtaSection } from "@/components/cta-section";
import { JsonLd } from "@/components/json-ld";
import { TechnologyBadge } from "@/components/technology-badge";
import { articles, getArticle } from "@/content/articles";
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
        <Container className="max-w-3xl">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/insights", label: "Insights" },
              { href: `/insights/${article.slug}`, label: article.title },
            ]}
          />
          <p className="text-sm text-slate">
            {article.date} · {article.readingTime}
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-navy">{article.title}</h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {article.categories.map((category) => (
              <TechnologyBadge key={category} label={category} />
            ))}
          </div>
          <div className="mt-8 space-y-5">
            {article.body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-base leading-8 text-ink">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </article>
      <CtaSection />
    </>
  );
}
