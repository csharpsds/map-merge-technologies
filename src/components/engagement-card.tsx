import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EngagementModel } from "@/content/engagement-models";

export function EngagementCard({ model }: { model: EngagementModel }) {
  return (
    <Card className="h-full border-line bg-white shadow-sm ring-0">
      <CardHeader>
        <CardTitle className="text-lg text-navy">{model.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm leading-6 text-ink">{model.description}</p>
        <p className="text-sm leading-6 text-slate">{model.suitedFor}</p>
      </CardContent>
    </Card>
  );
}
