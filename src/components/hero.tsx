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
  layout = "default",
}: {
  eyebrow?: string;
  title: string;
  description: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  children?: React.ReactNode;
  compact?: boolean;
  layout?: "default" | "canvas";
}) {
  const canvas = layout === "canvas";

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-navy text-white",
        compact ? "py-16 sm:py-20" : canvas ? "py-16 sm:py-20 lg:py-24" : "py-20 sm:py-28",
      )}
    >
      <div className="grid-overlay pointer-events-none absolute inset-0" />
      <div className="hero-contour pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-24 -left-16 size-[28rem] rounded-full bg-electric/12 blur-3xl" />
      <div className="pointer-events-none absolute right-[-4rem] bottom-[-5rem] size-[24rem] rounded-full bg-teal/12 blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-electric/0 via-electric/50 to-teal/0" />
      <Container className={cn("relative", canvas && "max-w-7xl")}>
        <div
          className={cn(
            "grid items-center gap-12",
            children && !canvas && "lg:grid-cols-[1.1fr_0.9fr]",
            canvas && "items-start gap-10 lg:grid-cols-[minmax(0,22.5rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] xl:gap-14",
          )}
        >
          <div className="hero-copy">
            {eyebrow ? (
              <p className="mb-5 text-xs font-semibold tracking-[0.22em] text-cyan uppercase">
                {eyebrow}
              </p>
            ) : null}
            <h1
              className={cn(
                "max-w-3xl font-semibold text-white",
                canvas
                  ? "text-[2.15rem] leading-[1.12] sm:text-5xl lg:text-[3.15rem]"
                  : "text-4xl sm:text-5xl lg:text-6xl",
              )}
            >
              {title}
            </h1>
            <p className={cn("text-lg leading-8 text-white/75", canvas ? "mt-6 max-w-md" : "mt-6 max-w-2xl")}>
              {description}
            </p>
            {primaryCta || secondaryCta ? (
              <div className={cn("flex flex-col gap-3 sm:flex-row", canvas ? "mt-9" : "mt-8")}>
                {primaryCta ? (
                  <Button asChild className="h-11 min-h-11 px-5 text-sm font-semibold">
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
