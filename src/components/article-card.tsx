import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Article } from "@/content/articles";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Card className="h-full border-line bg-white shadow-sm ring-0 transition-transform hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader>
        <p className="text-xs tracking-wide text-slate uppercase">
          {article.categories[0]} · {article.readingTime}
        </p>
        <CardTitle className="mt-2 text-lg">
          <Link href={`/insights/${article.slug}`} className="text-navy hover:text-electric">
            {article.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-slate">{article.excerpt}</p>
        <p className="mt-4 text-xs text-slate">{article.date}</p>
      </CardContent>
    </Card>
  );
}
