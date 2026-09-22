import Link from "next/link";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="py-24">
      <Container className="max-w-xl text-center">
        <p className="text-sm font-semibold tracking-[0.2em] text-electric uppercase">
          404
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-navy">This page is not mapped</h1>
        <p className="mt-4 text-base leading-7 text-slate">
          The address may have changed, or the page does not exist. Try the homepage,
          services, or contact form.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild className="h-11 px-5">
            <Link href="/">Home</Link>
          </Button>
          <Button asChild variant="outline" className="h-11 px-5">
            <Link href="/services">Services</Link>
          </Button>
          <Button asChild variant="outline" className="h-11 px-5">
            <Link href="/contact">Contact</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
