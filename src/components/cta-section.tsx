import Link from "next/link";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site-config";

export function CtaSection({
  heading = siteConfig.finalCta.heading,
  body = siteConfig.finalCta.body,
  primary = { href: "/contact", label: siteConfig.cta.bookConsultation },
  secondary = { href: "/contact", label: siteConfig.cta.contactCompany },
}: {
  heading?: string;
  body?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="bg-dark-blue py-16 text-white sm:py-20">
      <Container className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">{heading}</h2>
          <p className="mt-4 text-base leading-7 text-white/75 sm:text-lg">{body}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button asChild className="h-11 min-h-11 px-5 font-semibold">
            <Link href={primary.href}>{primary.label}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 min-h-11 border-white/20 bg-transparent px-5 font-semibold text-white hover:bg-white/10 hover:text-white"
          >
            <Link href={secondary.href}>{secondary.label}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
