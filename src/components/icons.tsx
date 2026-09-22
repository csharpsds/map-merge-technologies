import {
  BookOpen,
  GitBranch,
  GraduationCap,
  Headset,
  Layers3,
  Network,
  RefreshCw,
  ShieldCheck,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/content/services";

const serviceIcons: Record<Service["icon"], LucideIcon> = {
  network: Network,
  api: Waypoints,
  refresh: RefreshCw,
  layers: Layers3,
  git: GitBranch,
  shield: ShieldCheck,
  headset: Headset,
  test: BookOpen,
  graduation: GraduationCap,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: Service["icon"];
  className?: string;
}) {
  const Icon = serviceIcons[name];
  return <Icon className={className} aria-hidden="true" />;
}
