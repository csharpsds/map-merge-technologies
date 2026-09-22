"use client";

import { Container } from "@/components/container";
import { ErrorState } from "@/components/error-state";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="py-16">
      <Container className="space-y-4">
        <ErrorState />
        <Button type="button" className="h-11" onClick={reset}>
          Try again
        </Button>
      </Container>
    </section>
  );
}
