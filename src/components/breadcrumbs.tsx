import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { href: string; label: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-slate">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1">
              {index > 0 ? (
                <ChevronRight className="size-3.5 text-slate/70" aria-hidden="true" />
              ) : null}
              {last ? (
                <span aria-current="page" className="font-medium text-navy">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-electric">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
