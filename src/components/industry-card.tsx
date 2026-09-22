import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Industry } from "@/content/industries";

export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <Card className="h-full border-line bg-white shadow-sm ring-0 transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-lg text-navy">{industry.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <p className="text-sm leading-6 text-slate">{industry.summary}</p>
        <Link
          href={`/industries#${industry.slug}`}
          className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric hover:text-dark-blue"
        >
          Industry approach
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </CardContent>
    </Card>
  );
}
