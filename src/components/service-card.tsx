import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceIcon } from "@/components/icons";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Service } from "@/content/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="h-full border-line bg-white shadow-sm ring-0 transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-electric/40">
      <CardHeader>
        <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-electric/10 text-electric">
          <ServiceIcon name={service.icon} className="size-5" />
        </div>
        <CardTitle className="text-lg text-navy">{service.title}</CardTitle>
        <p className="mt-2 text-sm leading-6 text-slate">{service.cardDescription}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm text-ink">
          {service.capabilitiesPreview.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-teal" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="border-line bg-canvas/70">
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-electric hover:text-dark-blue"
        >
          View service
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </CardFooter>
    </Card>
  );
}
