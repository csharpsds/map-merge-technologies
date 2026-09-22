import { Card, CardContent } from "@/components/ui/card";

export function TestimonialCard({
  quote,
  attribution,
}: {
  quote?: string;
  attribution?: string;
}) {
  if (!quote) {
    return (
      <Card className="border-dashed border-line bg-canvas ring-0">
        <CardContent className="py-8">
          <p className="text-sm leading-6 text-slate">
            Customer quotes will appear here only after a client has approved them for
            publication. Map & Merge Technologies does not display invented testimonials.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-line bg-white ring-0">
      <CardContent className="py-6">
        <blockquote className="text-base leading-7 text-ink">“{quote}”</blockquote>
        {attribution ? <p className="mt-4 text-sm text-slate">{attribution}</p> : null}
      </CardContent>
    </Card>
  );
}
