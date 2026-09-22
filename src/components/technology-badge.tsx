import { Badge } from "@/components/ui/badge";

export function TechnologyBadge({ label }: { label: string }) {
  return (
    <Badge
      variant="secondary"
      className="rounded-full border border-line bg-white px-3 py-1.5 text-sm font-medium text-ink"
    >
      {label}
    </Badge>
  );
}
