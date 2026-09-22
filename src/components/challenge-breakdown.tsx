"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { ChallengeVisual } from "@/components/challenge-visual";
import {
  challengeBreakdowns,
  documentationPractice,
} from "@/content/challenge-breakdown";
import { getMediaQuerySnapshot, subscribeMediaQuery } from "@/lib/media-query";
import { cn } from "@/lib/utils";

export function ChallengeBreakdown() {
  const baseId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);
  const [inView, setInView] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeMediaQuery("(prefers-reduced-motion: reduce)"),
    () => getMediaQuerySnapshot("(prefers-reduced-motion: reduce)"),
    () => true,
  );
  const narrow = useSyncExternalStore(
    subscribeMediaQuery("(max-width: 767px)"),
    () => getMediaQuerySnapshot("(max-width: 767px)"),
    () => false,
  );
  const item = challengeBreakdowns[selected];
  const y1 = ((selected + 0.5) / challengeBreakdowns.length) * 100;

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? false),
      { threshold: 0.22 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowDown") next = (index + 1) % challengeBreakdowns.length;
    else if (event.key === "ArrowUp")
      next = (index - 1 + challengeBreakdowns.length) % challengeBreakdowns.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = challengeBreakdowns.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    rootRef.current?.querySelector<HTMLButtonElement>(`[data-challenge-index="${next}"]`)?.focus();
  }

  return (
    <div
      ref={rootRef}
      className={cn("challenge-breakdown", inView && "is-in", reducedMotion && "is-static")}
    >
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,19rem)_3rem_minmax(0,1fr)]">
        <ol className="space-y-2">
          {challengeBreakdowns.map((challenge, index) => {
            const active = selected === index;
            const number = String(index + 1).padStart(2, "0");
            const panelId = `${baseId}-panel-${index}`;
            return (
              <li
                key={challenge.title}
                className="challenge-item"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <button
                  type="button"
                  data-challenge-index={index}
                  id={`${baseId}-tab-${index}`}
                  aria-pressed={active}
                  aria-expanded={narrow ? active : undefined}
                  aria-controls={narrow ? panelId : `${baseId}-detail`}
                  className={cn("challenge-row w-full text-left", active && "is-active")}
                  onClick={() => setSelected(index)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                >
                  <span className="flex min-h-12 items-center gap-3 px-3 py-2.5">
                    <span
                      className={cn(
                        "w-7 text-xs font-semibold tracking-[0.14em]",
                        active ? "text-cyan" : "text-electric",
                      )}
                    >
                      {number}
                    </span>
                    <span className="text-sm font-semibold text-navy">{challenge.title}</span>
                  </span>
                </button>
                {narrow ? (
                  <div
                    id={panelId}
                    role="region"
                    hidden={!active}
                    className="challenge-mobile-panel"
                  >
                    {active ? <BreakdownBody item={challenge} /> : null}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>

        <svg
          className="challenge-connector hidden h-full min-h-80 w-full lg:block"
          viewBox="0 0 48 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            key={selected}
            d={`M 2 ${y1} C 20 ${y1}, 28 42, 46 42`}
            fill="none"
            stroke="url(#challenge-link)"
            strokeWidth="1.6"
            className="challenge-link"
          />
          <defs>
            <linearGradient id="challenge-link" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0799F8" />
              <stop offset="100%" stopColor="#08B9AE" />
            </linearGradient>
          </defs>
        </svg>

        <aside
          id={`${baseId}-detail`}
          className="challenge-detail hidden rounded-2xl border border-line bg-white p-5 lg:block"
          aria-live="polite"
        >
          <BreakdownBody item={item} />
        </aside>
      </div>
    </div>
  );
}

function BreakdownBody({ item }: { item: (typeof challengeBreakdowns)[number] }) {
  return (
    <div key={item.title} className="challenge-steps space-y-4">
      <ChallengeVisual visual={item.visual} />
      <section className="challenge-step">
        <p className="text-xs font-semibold tracking-[0.16em] text-destructive uppercase">
          The challenge
        </p>
        <p className="mt-2 text-sm leading-6 text-ink">{item.problem}</p>
      </section>
      <section className="challenge-step">
        <p className="text-xs font-semibold tracking-[0.16em] text-electric uppercase">
          Our approach
        </p>
        <p className="mt-2 text-sm leading-6 text-ink">{item.approach}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {item.practices.map((practice) => (
            <li
              key={practice}
              className="rounded-full border border-teal/30 bg-teal/8 px-3 py-1 text-xs font-medium text-navy"
            >
              {practice}
            </li>
          ))}
        </ul>
      </section>
      <section className="challenge-step">
        <p className="text-xs font-semibold tracking-[0.16em] text-teal uppercase">
          The intended outcome
        </p>
        <p className="mt-2 text-sm leading-6 text-ink">{item.outcome}</p>
      </section>
      <p className="challenge-step text-xs leading-5 text-slate">{documentationPractice}</p>
    </div>
  );
}
