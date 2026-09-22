"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";
import {
  canvasFlows,
  canvasLayouts,
  canvasNodes,
  canvasPaths,
  canvasStages,
  pathDefinition,
  pathsForSource,
  type CanvasStage,
  type SourceId,
} from "@/content/integration-canvas";
import { getMediaQuerySnapshot, subscribeMediaQuery } from "@/lib/media-query";
import { cn } from "@/lib/utils";

const SOURCE_IDS: SourceId[] = ["crm", "erp", "saas"];

function useMediaQuery(query: string, serverSnapshot = false) {
  return useSyncExternalStore(
    subscribeMediaQuery(query),
    () => getMediaQuerySnapshot(query),
    () => serverSnapshot,
  );
}

export function IntegrationCanvas() {
  const uid = useId().replace(/:/g, "");
  const rootRef = useRef<HTMLDivElement>(null);
  const [flowId, setFlowId] = useState(canvasFlows[0].id);
  const [selectedSource, setSelectedSource] = useState<SourceId>(canvasFlows[0].defaultSource);
  const [stage, setStage] = useState<CanvasStage>("map");
  const [visible, setVisible] = useState(false);
  const narrow = useMediaQuery("(max-width: 767px)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)", true);
  const flow = canvasFlows.find((item) => item.id === flowId) ?? canvasFlows[0];
  const layout = narrow ? canvasLayouts.mobile : canvasLayouts.desktop;
  const highlighted = useMemo(() => pathsForSource(selectedSource), [selectedSource]);
  const flowActive = new Set(flow.activePaths);
  const explanation = flow.sourceExplanations[selectedSource];
  const motionOn = visible && !reducedMotion;

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry?.isIntersecting ?? false),
      { threshold: 0.18 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!motionOn) return;
    const order: CanvasStage[] = ["map", "transform", "deliver"];
    const timer = window.setInterval(() => {
      setStage((current) => order[(order.indexOf(current) + 1) % order.length]);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [motionOn]);

  function selectFlow(nextId: string) {
    const next = canvasFlows.find((item) => item.id === nextId) ?? canvasFlows[0];
    setFlowId(next.id);
    setSelectedSource(next.defaultSource);
    setStage("map");
  }

  function onSourceKeyDown(event: KeyboardEvent<HTMLButtonElement>, source: SourceId) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
      return;
    }
    event.preventDefault();
    const index = SOURCE_IDS.indexOf(source);
    const delta = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    const next = SOURCE_IDS[(index + delta + SOURCE_IDS.length) % SOURCE_IDS.length];
    setSelectedSource(next);
    rootRef.current?.querySelector<HTMLButtonElement>(`[data-source="${next}"]`)?.focus();
  }

  return (
    <div
      ref={rootRef}
      data-motion={motionOn ? "on" : "off"}
      className="integration-canvas relative w-full min-w-0"
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-cyan uppercase">
            Integration Canvas
          </p>
          <p className="mt-1 text-sm text-white/70">
            Illustrative examples — not live customer data or real-time transactions.
          </p>
        </div>
        <div
          role="tablist"
          aria-label="Illustrative integration examples"
          className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row"
        >
          {canvasFlows.map((item) => {
            const selected = item.id === flow.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`${uid}-tab-${item.id}`}
                aria-selected={selected}
                aria-controls={`${uid}-panel`}
                tabIndex={selected ? 0 : -1}
                className={cn(
                  "min-h-11 rounded-full px-4 text-left text-sm font-semibold sm:text-center",
                  selected
                    ? "bg-electric text-white"
                    : "bg-white/8 text-white/80 hover:bg-white/12",
                )}
                onClick={() => selectFlow(item.id)}
                onKeyDown={(event) => {
                  if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
                  event.preventDefault();
                  const index = canvasFlows.findIndex((entry) => entry.id === item.id);
                  const delta = event.key === "ArrowRight" ? 1 : -1;
                  const next = canvasFlows[(index + delta + canvasFlows.length) % canvasFlows.length];
                  selectFlow(next.id);
                  rootRef.current
                    ?.querySelector<HTMLButtonElement>(`#${uid}-tab-${next.id}`)
                    ?.focus();
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={`${uid}-panel`}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${flow.id}`}
        className="relative"
      >
        <div className="relative">
          <svg
            viewBox={`0 0 ${layout.viewBox.width} ${layout.viewBox.height}`}
            className="h-auto w-full"
            role="img"
            aria-labelledby={`${uid}-title ${uid}-desc`}
          >
            <title id={`${uid}-title`}>
              Map and Merge Integration Canvas showing {flow.label}
            </title>
            <desc id={`${uid}-desc`}>
              {flow.summary} Selected source: {selectedSource.toUpperCase()}. {explanation}
            </desc>
            <defs>
              <linearGradient id={`${uid}-flow`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0799F8" />
                <stop offset="100%" stopColor="#08B9AE" />
              </linearGradient>
              <linearGradient id={`${uid}-dim`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#12BFF3" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#08B9AE" stopOpacity="0.22" />
              </linearGradient>
              <filter id={`${uid}-glow`} x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id={`${uid}-halo`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0799F8" stopOpacity="0.22" />
                <stop offset="70%" stopColor="#08B9AE" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#031B3D" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle
              cx={layout.nodes.map.x}
              cy={layout.nodes.map.y}
              r={narrow ? 92 : 128}
              fill={`url(#${uid}-halo)`}
            />
            {[0, 1, 2].map((ring) => (
              <circle
                key={ring}
                cx={layout.nodes.map.x}
                cy={layout.nodes.map.y}
                r={narrow ? 64 + ring * 28 : 86 + ring * 36}
                fill="none"
                stroke="rgba(18,191,243,0.12)"
                strokeDasharray="3 10"
              />
            ))}

            {canvasPaths.map((path) => {
              const d = pathDefinition(layout.nodes[path.from], layout.nodes[path.to], layout.axis);
              const selected = highlighted.includes(path.id);
              const inFlow = flowActive.has(path.id);
              return (
                <g key={path.id}>
                  <path
                    d={d}
                    fill="none"
                    stroke={`url(#${uid}-dim)`}
                    strokeWidth={narrow ? 3 : 4}
                    strokeLinecap="round"
                  />
                  <path
                    id={`${uid}-${path.id}`}
                    d={d}
                    fill="none"
                    stroke={`url(#${uid}-flow)`}
                    strokeWidth={selected ? (narrow ? 4.5 : 5.5) : 3.5}
                    strokeLinecap="round"
                    opacity={selected ? 1 : inFlow ? 0.45 : 0.18}
                    filter={selected ? `url(#${uid}-glow)` : undefined}
                    className={cn(selected && motionOn && "canvas-path-active")}
                  />
                </g>
              );
            })}

            {motionOn
              ? highlighted.map((pathId, index) => {
                  const path = canvasPaths.find((item) => item.id === pathId);
                  if (!path) return null;
                  const d = pathDefinition(layout.nodes[path.from], layout.nodes[path.to], layout.axis);
                  return (
                    <circle
                      key={`${pathId}-packet`}
                      r={5}
                      fill="#FFFFFF"
                      stroke="#12BFF3"
                      strokeWidth="2"
                      className="canvas-packet"
                      style={{
                        offsetPath: `path("${d}")`,
                        animationDelay: `${index * 0.55}s`,
                      }}
                    >
                      <title>Illustrative data packet</title>
                    </circle>
                  );
                })
              : null}

            {canvasNodes
              .filter((node) => node.kind !== "source")
              .map((node) => {
                const point = layout.nodes[node.id];
                const active =
                  (node.id === "map" && (stage === "transform" || selectedSource)) ||
                  (node.id === "merge" && (stage === "deliver" || selectedSource));
                const label = node.id === "map" ? flow.layerLabel : flow.outcomeLabel;
                const pulse = motionOn && ((node.id === "map" && stage === "transform") || (node.id === "merge" && stage === "deliver"));
                return (
                  <g key={node.id} className={cn(pulse && "canvas-node-pulse")}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={node.id === "map" ? 36 : 32}
                      fill={node.id === "map" ? "#031B3D" : "#08B9AE"}
                      stroke={active ? "#12BFF3" : "rgba(255,255,255,0.35)"}
                      strokeWidth={active ? 3 : 1.5}
                    />
                    <circle cx={point.x} cy={point.y} r="7" fill="#FFFFFF" />
                    <text
                      x={point.x}
                      y={point.y + (narrow ? 52 : 54)}
                      textAnchor="middle"
                      fill="#D7ECF8"
                      fontSize="13"
                      fontFamily="var(--font-heading), ui-sans-serif, system-ui"
                      fontWeight="600"
                    >
                      {node.id === "map" ? "MAP" : "MERGE"}
                    </text>
                    <text
                      x={point.x}
                      y={point.y + (narrow ? 70 : 72)}
                      textAnchor="middle"
                      fill="rgba(215,236,248,0.78)"
                      fontSize="11"
                      fontFamily="ui-sans-serif, system-ui"
                    >
                      {label}
                    </text>
                  </g>
                );
              })}
          </svg>

          {SOURCE_IDS.map((source) => {
            const point = layout.nodes[source];
            const selected = selectedSource === source;
            const inFlow = flowActive.has(`${source}-map`);
            const left = (point.x / layout.viewBox.width) * 100;
            const top = (point.y / layout.viewBox.height) * 100;
            const pulse = motionOn && stage === "map" && inFlow;
            return (
              <button
                key={source}
                type="button"
                data-source={source}
                aria-pressed={selected}
                aria-label={`${source.toUpperCase()} source. ${flow.sourceExplanations[source]}`}
                className={cn(
                  "absolute flex min-h-11 min-w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl border px-3 py-2 text-center shadow-lg",
                  selected
                    ? "border-cyan bg-dark-blue text-white ring-2 ring-cyan/70"
                    : inFlow
                      ? "border-white/25 bg-dark-blue/90 text-white"
                      : "border-white/10 bg-navy/80 text-white/70",
                  pulse && "canvas-node-pulse",
                )}
                style={{ left: `${left}%`, top: `${top}%` }}
                onClick={() => setSelectedSource(source)}
                onFocus={() => setSelectedSource(source)}
                onMouseEnter={() => setSelectedSource(source)}
                onKeyDown={(event) => onSourceKeyDown(event, source)}
              >
                <span className="text-[10px] font-semibold tracking-[0.16em] text-cyan uppercase">
                  Source
                </span>
                <span className="text-sm font-semibold">{source.toUpperCase()}</span>
              </button>
            );
          })}
        </div>

        <ol className="mt-4 grid gap-2 sm:grid-cols-3">
          {canvasStages.map((item) => (
            <li
              key={item.id}
              className={cn(
                "rounded-xl border px-3 py-3",
                stage === item.id
                  ? "border-cyan/50 bg-white/8"
                  : "border-white/10 bg-white/4",
              )}
            >
              <p className="text-[11px] font-semibold tracking-[0.16em] text-cyan uppercase">
                {item.step} {item.title}
              </p>
              <p className="mt-1 text-xs leading-5 text-white/75">{item.body}</p>
            </li>
          ))}
        </ol>

        <div
          className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
          aria-live="polite"
        >
          <p className="text-xs font-semibold tracking-[0.16em] text-cyan uppercase">
            {selectedSource.toUpperCase()} in {flow.label}
          </p>
          <p className="mt-2 text-sm leading-6 text-white/85">{explanation}</p>
          <p className="mt-2 text-xs leading-5 text-white/55">{flow.summary}</p>
        </div>
      </div>
    </div>
  );
}
