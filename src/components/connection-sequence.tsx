"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { getMediaQuerySnapshot, subscribeMediaQuery } from "@/lib/media-query";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: "disconnected",
    title: "Disconnected systems",
    body: "CRM, ERP, and SaaS each keep their own records. Teams copy fields by hand or build one-off connections that nobody can reuse.",
    nodes: ["CRM", "ERP", "SaaS"],
    linked: false,
  },
  {
    id: "mapped",
    title: "Mapped and orchestrated",
    body: "The integration layer records who owns each field, how keys align, and which transformations apply before anything is published.",
    nodes: ["CRM", "MAP", "ERP"],
    linked: true,
  },
  {
    id: "connected",
    title: "Connected outcomes",
    body: "Consumers call documented APIs for a customer view, an order status, or an operational alert—without opening every source system.",
    nodes: ["MAP", "APIs", "Apps"],
    linked: true,
  },
] as const;

export function ConnectionSequence() {
  const ref = useRef<HTMLElement>(null);
  const [tick, setTick] = useState(0);
  const [inView, setInView] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeMediaQuery("(prefers-reduced-motion: reduce)"),
    () => getMediaQuerySnapshot("(prefers-reduced-motion: reduce)"),
    () => true,
  );
  const active = reducedMotion ? steps.length - 1 : tick % steps.length;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? false),
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const timer = window.setInterval(() => {
      setTick((current) => current + 1);
    }, 2800);
    return () => window.clearInterval(timer);
  }, [inView, reducedMotion]);

  return (
    <section ref={ref} className="bg-canvas py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="How integration works"
          title="From disconnected systems to connected outcomes"
          description="A short sequence of the same idea shown in the canvas: map sources, transform in the middle, then deliver through APIs."
        />
        <ol className="mt-10 grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => {
            const current = reducedMotion || index <= active;
            const emphasized = reducedMotion || index === active;
            return (
              <li
                key={step.id}
                className={cn(
                  "rounded-2xl border bg-white p-5 transition-shadow",
                  emphasized ? "border-electric/40 shadow-md" : "border-line",
                  !current && "opacity-55",
                )}
              >
                <p className="text-xs font-semibold tracking-[0.16em] text-electric uppercase">
                  Step 0{index + 1}
                </p>
                <div className="mt-4 flex items-center justify-between gap-2">
                  {step.nodes.map((node, nodeIndex) => (
                    <div key={node} className="flex flex-1 items-center">
                      <span
                        className={cn(
                          "flex min-h-11 w-full items-center justify-center rounded-xl border text-xs font-semibold",
                          step.linked && current
                            ? "border-teal/40 bg-teal/8 text-navy"
                            : "border-line bg-canvas text-slate",
                        )}
                      >
                        {node}
                      </span>
                      {nodeIndex < step.nodes.length - 1 ? (
                        <span
                          aria-hidden="true"
                          className={cn(
                            "mx-1 h-px w-4 shrink-0",
                            step.linked && current ? "bg-electric" : "bg-line",
                          )}
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate">{step.body}</p>
              </li>
            );
          })}
        </ol>
        <div className="mt-6 flex justify-center gap-2" aria-hidden="true">
          {steps.map((step, index) => (
            <span
              key={step.id}
              className={cn(
                "size-2 rounded-full",
                index === active || reducedMotion ? "bg-electric" : "bg-line",
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
