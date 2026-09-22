"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";
import { ArrowUpRight } from "lucide-react";
import { WhyIllustration } from "@/components/why-illustration";
import { whyReasons } from "@/content/why-difference";
import { getMediaQuerySnapshot, subscribeMediaQuery } from "@/lib/media-query";
import { cn } from "@/lib/utils";

const leftReasons = whyReasons.slice(0, 5);
const rightReasons = whyReasons.slice(5);

export function WhyDifference() {
  const baseId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);
  const [inView, setInView] = useState(false);
  const [userControl, setUserControl] = useState(false);
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
  const reason = whyReasons[selected];

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? false),
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || userControl || reducedMotion || narrow) return;
    const timer = window.setInterval(() => {
      setSelected((current) => (current + 1) % whyReasons.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [inView, userControl, reducedMotion, narrow]);

  function choose(index: number) {
    setUserControl(true);
    setSelected(index);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const columnStart = index < 5 ? 0 : 5;
    const columnEnd = index < 5 ? 4 : 9;
    let next = index;
    if (event.key === "ArrowDown") next = index === columnEnd ? columnStart : index + 1;
    else if (event.key === "ArrowUp") next = index === columnStart ? columnEnd : index - 1;
    else if (event.key === "ArrowRight") next = index < 5 ? index + 5 : index;
    else if (event.key === "ArrowLeft") next = index >= 5 ? index - 5 : index;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = whyReasons.length - 1;
    else return;
    event.preventDefault();
    choose(next);
    rootRef.current?.querySelector<HTMLButtonElement>(`[data-why-index="${next}"]`)?.focus();
  }

  function renderRow(item: (typeof whyReasons)[number], index: number) {
    const active = selected === index;
    const number = String(index + 1).padStart(2, "0");
    return (
      <li key={item.title} className="why-item" style={{ animationDelay: `${index * 70}ms` }}>
        <button
          type="button"
          data-why-index={index}
          aria-pressed={active}
          aria-controls={`${baseId}-detail`}
          aria-label={`Reason ${number}: ${item.title}`}
          className={cn("why-row group w-full text-left", active && "is-active")}
          onClick={() => choose(index)}
          onMouseEnter={() => choose(index)}
          onFocus={() => choose(index)}
          onKeyDown={(event) => onKeyDown(event, index)}
        >
          <span className="why-row-line" aria-hidden="true" />
          <span className="flex min-h-14 items-center gap-3 px-3 py-3 sm:px-4">
            <span className="w-8 text-xs font-semibold tracking-[0.14em] text-electric">
              {number}
            </span>
            <span className="flex-1 text-sm font-semibold text-navy sm:text-[0.95rem]">
              {item.title}
            </span>
            <ArrowUpRight
              className={cn(
                "size-4 shrink-0 transition-colors",
                active ? "text-teal" : "text-slate",
              )}
              aria-hidden="true"
            />
          </span>
          {narrow ? (
            <span
              className={cn(
                "grid overflow-hidden transition-[grid-template-rows] duration-200",
                active ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <span className="min-h-0">
                <span className="block space-y-3 px-3 pb-4 sm:px-4">
                  <WhyIllustration visual={item.visual} />
                  <span className="block text-sm leading-6 text-slate">{item.explanation}</span>
                </span>
              </span>
            </span>
          ) : null}
        </button>
      </li>
    );
  }

  return (
    <div
      ref={rootRef}
      className={cn("why-difference", inView && "is-in")}
    >
      <p className="mb-6 text-sm font-medium text-slate">The Map & Merge Difference</p>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <div className="grid gap-8 md:grid-cols-2 md:gap-6">
          <ol className="space-y-2">{leftReasons.map((item, index) => renderRow(item, index))}</ol>
          <ol className="space-y-2" start={6}>
            {rightReasons.map((item, index) => renderRow(item, index + 5))}
          </ol>
        </div>
        <aside
          id={`${baseId}-detail`}
          className="why-detail hidden rounded-2xl border border-line bg-white p-5 lg:block"
          aria-live="polite"
        >
          <WhyIllustration visual={reason.visual} />
          <p className="mt-4 text-xs font-semibold tracking-[0.16em] text-electric uppercase">
            {String(selected + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-navy">{reason.title}</h3>
          <p key={reason.title} className="why-detail-copy mt-3 min-h-28 text-sm leading-6 text-slate">
            {reason.explanation}
          </p>
        </aside>
      </div>
    </div>
  );
}
