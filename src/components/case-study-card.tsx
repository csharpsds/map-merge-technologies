import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { CaseStudy } from "@/content/case-studies";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Card className="h-full border-line bg-white shadow-sm ring-0 transition-shadow hover:shadow-md">
      <CardHeader>
        <Badge variant="secondary" className="w-fit bg-canvas text-slate">
          {study.industry}
        </Badge>
        <CardTitle className="mt-3 text-lg text-navy">{study.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm leading-6 text-slate">
          <span className="font-medium text-ink">Challenge: </span>
          {study.challenge}
        </p>
        <p className="text-sm leading-6 text-slate">{study.summary}</p>
        <div className="flex flex-wrap gap-2">
          {study.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-line px-2.5 py-1 text-xs text-slate"
            >
              {tech}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-line bg-canvas/70">
        <Link
          href={`/case-studies/${study.slug}`}
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric hover:text-dark-blue"
        >
          Read case study
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </CardFooter>
    </Card>
  );
}
