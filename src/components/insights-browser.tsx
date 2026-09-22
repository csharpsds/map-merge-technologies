"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { EmptyState } from "@/components/empty-state";
import { Pagination } from "@/components/pagination";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { articleParagraphs, articles, insightCategories } from "@/content/articles";

const PAGE_SIZE = 6;

export function InsightsBrowser() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "All";
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(
    insightCategories.includes(initialCategory as never) || initialCategory === "All"
      ? initialCategory
      : "All",
  );
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesCategory =
        category === "All" || article.categories.includes(category as never);
      const matchesQuery =
        !needle ||
        article.title.toLowerCase().includes(needle) ||
        article.excerpt.toLowerCase().includes(needle) ||
        articleParagraphs(article).some((paragraph) =>
          paragraph.toLowerCase().includes(needle),
        ) ||
        article.sections.some((section) => section.heading.toLowerCase().includes(needle));
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-[1fr_16rem]">
        <div>
          <Label htmlFor="insight-search">Search articles</Label>
          <Input
            id="insight-search"
            className="mt-2 h-11"
            placeholder="Search by topic or keyword"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
          />
        </div>
        <div>
          <Label htmlFor="insight-category">Category</Label>
          <select
            id="insight-category"
            className="mt-2 h-11 w-full rounded-lg border border-input bg-white px-2.5 text-sm"
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setPage(1);
            }}
          >
            <option value="All">All categories</option>
            {insightCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {visible.length === 0 ? (
        <EmptyState
          title="No articles match those filters"
          description="Try another category or clear the search. New insights can be added from the local content files until a CMS is connected."
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {visible.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}

      <Pagination
        page={currentPage}
        pageCount={filtered.length === 0 ? 1 : pageCount}
        onPageChange={setPage}
      />
    </div>
  );
}
