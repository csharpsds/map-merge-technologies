import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Job } from "@/content/jobs";

export function JobCard({ job }: { job: Job }) {
  return (
    <Card className="h-full border-line bg-white shadow-sm ring-0 transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="w-fit bg-canvas text-slate">
            {job.location}
          </Badge>
          <Badge variant="secondary" className="w-fit bg-canvas text-slate">
            {job.employmentType}
          </Badge>
        </div>
        <CardTitle className="mt-3 text-lg text-navy">{job.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-slate">{job.summary}</p>
      </CardContent>
      <CardFooter className="border-line bg-canvas/70">
        <Link
          href={`/careers/${job.slug}`}
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric hover:text-dark-blue"
        >
          Job description and application
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </CardFooter>
    </Card>
  );
}
