import { Container } from "@/components/container";
import { LoadingState } from "@/components/loading-state";

export default function Loading() {
  return (
    <section className="py-16">
      <Container>
        <LoadingState label="Loading page" />
      </Container>
    </section>
  );
}
