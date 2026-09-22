"use client";

import { useRef, useState } from "react";
import { ExpertiseVisual } from "@/components/expertise-visual";
import { expertiseGroups } from "@/content/expertise";
import { getMediaQuerySnapshot, subscribeMediaQuery } from "@/lib/media-query";
import { cn } from "@/lib/utils";
import { useSyncExternalStore } from "react";

export function ExpertiseTabs() {
  const [tabId, setTabId] = useState(expertiseGroups[0].id);
  const [panelId, setPanelId] = useState(expertiseGroups[0].id);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [skillName, setSkillName] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeMediaQuery("(prefers-reduced-motion: reduce)"),
    () => getMediaQuerySnapshot("(prefers-reduced-motion: reduce)"),
    () => true,
  );
  const group = expertiseGroups.find((item) => item.id === panelId) ?? expertiseGroups[0];
  const skill = group.items.find((item) => item.name === skillName) ?? null;

  function selectTab(nextId: string) {
    if (nextId === tabId) return;
    setTabId(nextId);
    setSkillName(null);
    if (reducedMotion) {
      setPanelId(nextId);
      setPhase("in");
      return;
    }
    setPhase("out");
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setPanelId(nextId);
      setPhase("in");
    }, 180);
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Technical expertise"
        className="flex flex-col gap-2 sm:flex-row sm:flex-wrap"
      >
        {expertiseGroups.map((item) => {
          const selected = item.id === tabId;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`expertise-tab-${item.id}`}
              aria-selected={selected}
              aria-controls="expertise-panel"
              tabIndex={selected ? 0 : -1}
              className={cn(
                "relative min-h-11 rounded-full px-4 text-left text-sm font-semibold sm:text-center",
                selected
                  ? "bg-electric text-white shadow-[0_0_0_1px_rgb(8_185_174_/_0.55)]"
                  : "bg-white/8 text-white/88 hover:bg-white/12 hover:text-white",
              )}
              onClick={() => selectTab(item.id)}
              onKeyDown={(event) => {
                if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
                event.preventDefault();
                const index = expertiseGroups.findIndex((entry) => entry.id === item.id);
                const delta = event.key === "ArrowRight" ? 1 : -1;
                const next =
                  expertiseGroups[(index + delta + expertiseGroups.length) % expertiseGroups.length];
                selectTab(next.id);
                document.getElementById(`expertise-tab-${next.id}`)?.focus();
              }}
            >
              {item.title}
              {selected ? <span className="expertise-tab-indicator" aria-hidden="true" /> : null}
            </button>
          );
        })}
      </div>

      <div
        id="expertise-panel"
        role="tabpanel"
        aria-labelledby={`expertise-tab-${tabId}`}
        className={cn("expertise-panel mt-8", phase === "out" ? "is-leaving" : "is-entering")}
      >
        <div className="grid items-center gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <ExpertiseVisual visual={group.visual} />
          <p className="text-sm leading-6 text-white/75">{group.caption}</p>
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {group.items.map((item) => {
            const selected = skillName === item.name;
            return (
              <li key={item.name}>
                <button
                  type="button"
                  aria-pressed={selected}
                  className={cn(
                    "expertise-skill group flex min-h-14 w-full items-center rounded-xl border py-3 pr-4 pl-5 text-left text-sm text-white",
                    selected
                      ? "border-cyan bg-white/10"
                      : "border-white/12 bg-white/5 hover:border-cyan/50",
                  )}
                  onClick={() => setSkillName(item.name)}
                  onFocus={() => setSkillName(item.name)}
                >
                  <span className="expertise-skill-accent" aria-hidden="true" />
                  {item.name}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-4" aria-live="polite">
          {skill ? (
            <>
              <p className="text-xs font-semibold tracking-[0.16em] text-cyan uppercase">
                {skill.name}
              </p>
              <p className="mt-2 text-sm leading-6 text-white/85">{skill.summary}</p>
            </>
          ) : (
            <p className="text-sm leading-6 text-white/70">
              Select a capability to see how it is used on a MuleSoft program.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
