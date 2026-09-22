"use client";

import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";
import { ChallengeVisual } from "@/components/challenge-visual";
import {
  challengeBreakdowns,
  documentationPractice,
} from "@/content/challenge-breakdown";
import { getMediaQuerySnapshot, subscribeMediaQuery } from "@/lib/media-query";
import { cn } from "@/lib/utils";

type ConnectorGeometry = {
  width: number;
  height: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

function measureConnector(
  gutter: HTMLElement,
  row: HTMLElement,
  panel: HTMLElement,
): ConnectorGeometry | null {
  const gutterBox = gutter.getBoundingClientRect();
  const rowBox = row.getBoundingClientRect();
  const panelBox = panel.getBoundingClientRect();
  if (gutterBox.width < 4 || gutterBox.height < 8 || rowBox.height < 1 || panelBox.height < 1) {
    return null;
  }

  return {
    width: gutterBox.width,
    height: gutterBox.height,
    startX: 2,
    startY: rowBox.top - gutterBox.top + rowBox.height / 2,
    endX: Math.max(gutterBox.width - 2, 3),
    endY: panelBox.top - gutterBox.top + panelBox.height / 2,
  };
}

function connectorPath(geometry: ConnectorGeometry) {
  const midX = geometry.startX + (geometry.endX - geometry.startX) / 2;
  return `M ${geometry.startX} ${geometry.startY} C ${midX} ${geometry.startY}, ${midX} ${geometry.endY}, ${geometry.endX} ${geometry.endY}`;
}

function applyConnectorPath(
  svg: SVGSVGElement,
  path: SVGPathElement,
  geometry: ConnectorGeometry,
  options: { animate: boolean; reducedMotion: boolean },
) {
  svg.removeAttribute("width");
  svg.removeAttribute("height");
  svg.setAttribute("viewBox", `0 0 ${geometry.width} ${geometry.height}`);
  svg.setAttribute("preserveAspectRatio", "none");
  path.setAttribute("d", connectorPath(geometry));
  path.setAttribute("opacity", "1");

  const length = path.getTotalLength();
  path.style.strokeDasharray = `${length}`;
  path.style.setProperty("--challenge-link-length", `${length}`);

  if (options.reducedMotion) {
    path.style.transition = "none";
    path.style.strokeDashoffset = "0";
    return;
  }

  if (!options.animate) return;

  path.style.transition = "none";
  path.style.strokeDashoffset = `${length}`;
  path.getBoundingClientRect();
  path.style.transition = "stroke-dashoffset 0.55s ease";
  path.style.strokeDashoffset = "0";
}

export function ChallengeBreakdown() {
  const baseId = useId();
  const gradientId = `challenge-link-${baseId.replace(/:/g, "")}`;
  const rootRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const rowRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [selected, setSelected] = useState(0);
  const [inView, setInView] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeMediaQuery("(prefers-reduced-motion: reduce)"),
    () => getMediaQuerySnapshot("(prefers-reduced-motion: reduce)"),
    () => true,
  );
  const desktop = useSyncExternalStore(
    subscribeMediaQuery("(min-width: 1024px)"),
    () => getMediaQuerySnapshot("(min-width: 1024px)"),
    () => false,
  );
  const item = challengeBreakdowns[selected];

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

  useLayoutEffect(() => {
    if (!desktop) return;

    let frame = 0;
    let cancelled = false;

    const update = (animate: boolean) => {
      const gutter = gutterRef.current;
      const row = rowRefs.current[selected];
      const panel = panelRef.current;
      const svg = svgRef.current;
      const path = pathRef.current;
      if (!gutter || !row || !panel || !svg || !path || cancelled) return;
      const next = measureConnector(gutter, row, panel);
      if (!next) {
        path.setAttribute("opacity", "0");
        path.setAttribute("d", "");
        return;
      }
      applyConnectorPath(svg, path, next, { animate, reducedMotion });
    };

    const schedule = (animate: boolean) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => update(animate));
    };

    update(true);

    const observer = new ResizeObserver(() => schedule(false));
    if (layoutRef.current) observer.observe(layoutRef.current);
    if (listRef.current) observer.observe(listRef.current);
    if (gutterRef.current) observer.observe(gutterRef.current);
    if (panelRef.current) observer.observe(panelRef.current);
    const selectedRow = rowRefs.current[selected];
    if (selectedRow) observer.observe(selectedRow);

    const onWindowChange = () => schedule(false);
    window.addEventListener("resize", onWindowChange);
    window.addEventListener("orientationchange", onWindowChange);

    const fonts = document.fonts;
    fonts?.addEventListener("loadingdone", onWindowChange);
    void fonts?.ready.then(() => {
      if (!cancelled) schedule(false);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", onWindowChange);
      window.removeEventListener("orientationchange", onWindowChange);
      fonts?.removeEventListener("loadingdone", onWindowChange);
    };
  }, [desktop, selected, item.title, reducedMotion]);

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
      <div
        ref={layoutRef}
        className="lg:grid lg:grid-cols-[minmax(0,20rem)_2.75rem_minmax(0,1fr)] lg:items-stretch"
      >
        <ol ref={listRef} className="space-y-2">
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
                  ref={(node) => {
                    rowRefs.current[index] = node;
                  }}
                  data-challenge-index={index}
                  id={`${baseId}-tab-${index}`}
                  aria-pressed={active}
                  aria-expanded={desktop ? undefined : active}
                  aria-controls={desktop ? `${baseId}-detail` : panelId}
                  className={cn("challenge-row w-full text-left", active && "is-active")}
                  onClick={() => setSelected(index)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                >
                  <span className="flex min-h-12 items-center gap-3 px-3 py-2.5">
                    <span
                      className={cn(
                        "w-7 shrink-0 text-xs font-semibold tracking-[0.14em]",
                        active ? "text-cyan" : "text-electric",
                      )}
                    >
                      {number}
                    </span>
                    <span className="text-sm font-semibold text-balance text-navy">
                      {challenge.title}
                    </span>
                  </span>
                </button>
                {!desktop ? (
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

        {desktop ? (
          <div
            ref={gutterRef}
            className="challenge-gutter relative hidden min-h-full overflow-hidden lg:block"
            aria-hidden="true"
          >
            <svg
              ref={svgRef}
              className="challenge-connector pointer-events-none absolute inset-0 h-full w-full"
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0799F8" />
                  <stop offset="100%" stopColor="#08B9AE" />
                </linearGradient>
              </defs>
              <path
                ref={pathRef}
                d=""
                fill="none"
                stroke={`url(#${gradientId})`}
                strokeWidth="1.6"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                opacity="0"
                className="challenge-link"
              />
            </svg>
          </div>
        ) : null}

        <aside
          ref={panelRef}
          id={`${baseId}-detail`}
          className="challenge-detail mt-6 hidden rounded-2xl border border-line bg-white p-5 lg:mt-0 lg:block"
          aria-live="polite"
        >
          {desktop ? <BreakdownBody item={item} /> : null}
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
