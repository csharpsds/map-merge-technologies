import type { ReactElement } from "react";
import type { WhyVisual } from "@/content/why-difference";

function Connections() {
  return (
    <svg viewBox="0 0 240 120" className="h-auto w-full" aria-hidden="true">
      <path d="M28 28 C80 28, 90 60, 120 60" stroke="#0799F8" strokeWidth="2" fill="none" />
      <path d="M28 60 H120" stroke="#12BFF3" strokeWidth="2" fill="none" />
      <path d="M28 92 C80 92, 90 60, 120 60" stroke="#08B9AE" strokeWidth="2" fill="none" />
      <path d="M120 60 H212" stroke="#0799F8" strokeWidth="2.5" fill="none" />
      <circle cx="28" cy="28" r="7" fill="#062B5C" stroke="#12BFF3" />
      <circle cx="28" cy="60" r="7" fill="#062B5C" stroke="#12BFF3" />
      <circle cx="28" cy="92" r="7" fill="#062B5C" stroke="#08B9AE" />
      <circle cx="120" cy="60" r="10" fill="#031B3D" stroke="#0799F8" strokeWidth="2" />
      <circle cx="212" cy="60" r="8" fill="#08B9AE" />
    </svg>
  );
}

function Layers() {
  return (
    <svg viewBox="0 0 240 120" className="h-auto w-full" aria-hidden="true">
      {["Experience", "Process", "System"].map((label, index) => (
        <g key={label}>
          <rect
            x={24 + index * 10}
            y={22 + index * 28}
            width={192 - index * 20}
            height="22"
            rx="6"
            fill={index === 1 ? "#062B5C" : "#031B3D"}
            stroke={index === 2 ? "#08B9AE" : "#0799F8"}
          />
          <text x="120" y={38 + index * 28} textAnchor="middle" fill="#D7ECF8" fontSize="10">
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function Migration() {
  return (
    <svg viewBox="0 0 240 120" className="h-auto w-full" aria-hidden="true">
      <rect x="20" y="38" width="64" height="44" rx="8" fill="#062B5C" stroke="#12BFF3" />
      <rect x="156" y="38" width="64" height="44" rx="8" fill="#08B9AE" />
      <path d="M92 60 H148" stroke="#0799F8" strokeWidth="2" />
      <path d="M138 52 L148 60 L138 68" fill="none" stroke="#0799F8" strokeWidth="2" />
      <text x="52" y="64" textAnchor="middle" fill="#D7ECF8" fontSize="10">
        Current
      </text>
      <text x="188" y="64" textAnchor="middle" fill="#031B3D" fontSize="10">
        Target
      </text>
    </svg>
  );
}

function Security() {
  return (
    <svg viewBox="0 0 240 120" className="h-auto w-full" aria-hidden="true">
      <path
        d="M120 22 L168 38 V66 C168 88 146 102 120 108 C94 102 72 88 72 66 V38 Z"
        fill="#031B3D"
        stroke="#12BFF3"
        strokeWidth="2"
      />
      <circle cx="120" cy="62" r="10" fill="none" stroke="#08B9AE" strokeWidth="2" />
      <path d="M120 72 V82" stroke="#08B9AE" strokeWidth="2" />
    </svg>
  );
}

function Testing() {
  return (
    <svg viewBox="0 0 240 120" className="h-auto w-full" aria-hidden="true">
      <rect x="36" y="28" width="168" height="64" rx="10" fill="#062B5C" stroke="#12BFF3" />
      <path d="M78 60 L104 82 L162 40" fill="none" stroke="#08B9AE" strokeWidth="4" />
    </svg>
  );
}

function Engagement() {
  return (
    <svg viewBox="0 0 240 120" className="h-auto w-full" aria-hidden="true">
      {["Team", "Project", "Support"].map((label, index) => (
        <g key={label}>
          <rect x={20 + index * 74} y="36" width="64" height="48" rx="8" fill="#031B3D" stroke="#0799F8" />
          <text x={52 + index * 74} y="64" textAnchor="middle" fill="#D7ECF8" fontSize="10">
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function Leadership() {
  return (
    <svg viewBox="0 0 240 120" className="h-auto w-full" aria-hidden="true">
      <circle cx="84" cy="52" r="16" fill="#062B5C" stroke="#12BFF3" />
      <circle cx="156" cy="52" r="16" fill="#031B3D" stroke="#08B9AE" />
      <path d="M100 52 H140" stroke="#0799F8" strokeWidth="2" />
      <rect x="58" y="80" width="124" height="16" rx="8" fill="#062B5C" />
    </svg>
  );
}

function Delivery() {
  return (
    <svg viewBox="0 0 240 120" className="h-auto w-full" aria-hidden="true">
      <circle cx="120" cy="60" r="36" fill="none" stroke="#12BFF3" strokeWidth="2" />
      <ellipse cx="120" cy="60" rx="16" ry="36" fill="none" stroke="#0799F8" />
      <path d="M84 60 H156" stroke="#08B9AE" strokeWidth="2" />
      <circle cx="120" cy="60" r="4" fill="#08B9AE" />
    </svg>
  );
}

function Docs() {
  return (
    <svg viewBox="0 0 240 120" className="h-auto w-full" aria-hidden="true">
      <rect x="70" y="20" width="100" height="80" rx="8" fill="#031B3D" stroke="#12BFF3" />
      <path d="M88 42 H152" stroke="#D7ECF8" strokeWidth="2" />
      <path d="M88 58 H152" stroke="#12BFF3" strokeWidth="2" />
      <path d="M88 74 H132" stroke="#08B9AE" strokeWidth="2" />
    </svg>
  );
}

function Reuse() {
  return (
    <svg viewBox="0 0 240 120" className="h-auto w-full" aria-hidden="true">
      <rect x="36" y="40" width="48" height="40" rx="6" fill="#062B5C" stroke="#12BFF3" />
      <rect x="96" y="40" width="48" height="40" rx="6" fill="#031B3D" stroke="#0799F8" />
      <rect x="156" y="40" width="48" height="40" rx="6" fill="#08B9AE" />
      <path d="M84 60 H96" stroke="#12BFF3" strokeWidth="2" />
      <path d="M144 60 H156" stroke="#0799F8" strokeWidth="2" />
    </svg>
  );
}

const visuals: Record<WhyVisual, () => ReactElement> = {
  connections: Connections,
  layers: Layers,
  migration: Migration,
  security: Security,
  testing: Testing,
  engagement: Engagement,
  leadership: Leadership,
  delivery: Delivery,
  docs: Docs,
  reuse: Reuse,
};

export function WhyIllustration({ visual }: { visual: WhyVisual }) {
  const Graphic = visuals[visual];
  return (
    <div className="rounded-2xl bg-navy px-4 py-3">
      <Graphic />
    </div>
  );
}
