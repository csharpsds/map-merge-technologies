"use client";

import { useState } from "react";
import { ecosystemRows, ecosystemTargets, type EcosystemTarget } from "@/content/ecosystem";
import { cn } from "@/lib/utils";

function ConnectionBackdrop() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 800 220"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M40 40 C220 40, 280 110, 400 110 S620 180, 760 180"
        fill="none"
        stroke="#0799F8"
        strokeWidth="1.2"
        opacity="0.28"
        className="ecosystem-signal"
      />
      <path
        d="M40 180 C200 180, 300 70, 400 70 S640 40, 760 40"
        fill="none"
        stroke="#08B9AE"
        strokeWidth="1.2"
        opacity="0.28"
        className="ecosystem-signal ecosystem-signal-delay"
      />
      <circle r="3.5" fill="#12BFF3" className="ecosystem-dot">
        <animateMotion dur="7s" repeatCount="indefinite" path="M40 40 C220 40, 280 110, 400 110 S620 180, 760 180" />
      </circle>
      <circle r="3.5" fill="#08B9AE" className="ecosystem-dot">
        <animateMotion dur="8s" repeatCount="indefinite" begin="1.4s" path="M40 180 C200 180, 300 70, 400 70 S640 40, 760 40" />
      </circle>
    </svg>
  );
}

function TargetPill({
  target,
  selected,
  onSelect,
  clone = false,
}: {
  target: EcosystemTarget;
  selected: boolean;
  onSelect: (name: string) => void;
  clone?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-hidden={clone || undefined}
      tabIndex={clone ? -1 : 0}
      className={cn(
        "ecosystem-pill min-h-11 shrink-0 rounded-full border px-4 text-sm font-medium",
        selected
          ? "border-electric bg-electric text-white shadow-sm"
          : "border-line bg-white text-ink hover:border-electric/40 hover:text-navy",
      )}
      onClick={() => onSelect(target.name)}
    >
      {target.name}
    </button>
  );
}

export function EcosystemShowcase() {
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const selected = ecosystemTargets.find((item) => item.name === selectedName) ?? null;

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-white px-4 py-8 sm:px-6">
        <ConnectionBackdrop />
        <div className="relative space-y-4">
          {ecosystemRows.map((row, index) => (
            <div
              key={row.map((item) => item.name).join("-")}
              className="ecosystem-row"
              data-direction={index % 2 === 0 ? "forward" : "reverse"}
            >
              <div className="ecosystem-track">
                {row.map((target) => (
                  <TargetPill
                    key={target.name}
                    target={target}
                    selected={selectedName === target.name}
                    onSelect={setSelectedName}
                  />
                ))}
                <div className="ecosystem-clone contents" aria-hidden="true">
                  {row.map((target) => (
                    <TargetPill
                      key={`${target.name}-clone`}
                      target={target}
                      selected={selectedName === target.name}
                      onSelect={setSelectedName}
                      clone
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-line bg-canvas px-5 py-4" aria-live="polite">
        {selected ? (
          <>
            <p className="text-xs font-semibold tracking-[0.16em] text-electric uppercase">
              Possible use · {selected.name}
            </p>
            <p className="mt-2 text-sm leading-6 text-ink">{selected.useCase}</p>
            <p className="mt-2 text-xs leading-5 text-slate">
              Illustrative only. This is not a partnership claim or a named client result.
            </p>
          </>
        ) : (
          <p className="text-sm leading-6 text-slate">
            Select a system label to see a possible integration use case. These remain text
            labels for common targets—not logos or partner badges.
          </p>
        )}
      </div>
    </div>
  );
}
