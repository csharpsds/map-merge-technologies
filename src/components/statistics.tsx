import { Container } from "@/components/container";
import { siteConfig } from "@/content/site-config";

export function Statistics() {
  return (
    <section className="border-y border-line bg-white py-12">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.stats.map((stat) => (
            <div key={stat.id}>
              <p className="text-3xl font-semibold text-navy sm:text-4xl">{stat.value}</p>
              <p className="mt-2 text-sm leading-6 text-slate">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
