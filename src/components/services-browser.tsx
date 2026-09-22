"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { ServiceCard } from "@/components/service-card";
import { services } from "@/content/services";

const groups = [
  { id: "all", label: "All services", slugs: services.map((service) => service.slug) },
  {
    id: "architecture",
    label: "Architecture and APIs",
    slugs: ["mulesoft-architecture", "api-development", "security-governance"],
  },
  {
    id: "modernization",
    label: "Migration and quality",
    slugs: ["migration-modernization", "testing-quality", "devops-cicd"],
  },
  {
    id: "operations",
    label: "Integration and operations",
    slugs: [
      "enterprise-integration",
      "managed-services",
      "training-enablement",
    ],
  },
] as const;

export function ServicesBrowser() {
  const [group, setGroup] = useState<(typeof groups)[number]["id"]>("all");
  const visible = useMemo(() => {
    const selected = groups.find((item) => item.id === group) ?? groups[0];
    return services.filter((service) => selected.slugs.includes(service.slug));
  }, [group]);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter services">
        {groups.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`min-h-11 rounded-full border px-4 text-sm font-medium ${
              group === item.id
                ? "border-electric bg-electric text-white"
                : "border-line bg-white text-ink hover:border-electric"
            }`}
            aria-pressed={group === item.id}
            onClick={() => setGroup(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {visible.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No services in that group"
            description="Choose another category to see the service catalog."
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
