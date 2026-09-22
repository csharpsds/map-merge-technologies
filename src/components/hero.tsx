import Link from "next/link";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  children,
  compact = false,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  children?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-navy text-white",
        compact ? "py-16 sm:py-20" : "py-20 sm:py-28",
      )}
    >
      <div className="grid-overlay pointer-events-none absolute inset-0" />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-electric/0 via-electric/50 to-teal/0" />
      <Container className="relative">
        <div className={cn("grid items-center gap-12", children && "lg:grid-cols-[1.1fr_0.9fr]")}>
          <div>
            {eyebrow ? (
              <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-cyan uppercase">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="max-w-3xl text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">{description}</p>
            {primaryCta || secondaryCta ? (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {primaryCta ? (
                  <Button
                    asChild
                    className="h-11 min-h-11 px-5 text-sm font-semibold"
                  >
                    <Link href={primaryCta.href}>{primaryCta.label}</Link>
                  </Button>
                ) : null}
                {secondaryCta ? (
                  <Button
                    asChild
                    variant="outline"
                    className="h-11 min-h-11 border-white/20 bg-white/5 px-5 text-sm font-semibold text-white hover:bg-white/10 hover:text-white"
                  >
                    <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                  </Button>
                ) : null}
              </div>
            ) : null}
          </div>
          {children}
        </div>
      </Container>
    </section>
  );
}
