import type { ReactElement } from "react";
import type { ChallengeVisual } from "@/content/challenge-breakdown";

function Backlog() {
  return (
    <svg viewBox="0 0 260 120" className="h-auto w-full" aria-hidden="true">
      {[0, 1, 2].map((index) => (
        <rect
          key={index}
          x={36 + index * 12}
          y={28 + index * 18}
          width="160"
          height="28"
          rx="6"
          fill={index === 2 ? "#062B5C" : "#031B3D"}
          stroke={index === 2 ? "#0799F8" : "#12BFF3"}
          opacity={1 - index * 0.12}
        />
      ))}
    </svg>
  );
}

function Disconnected() {
  return (
    <svg viewBox="0 0 260 120" className="h-auto w-full" aria-hidden="true">
      <circle cx="32" cy="28" r="8" fill="#B42318" />
      <circle cx="32" cy="60" r="8" fill="#B42318" />
      <circle cx="32" cy="92" r="8" fill="#B42318" />
      <path d="M44 28 C90 28, 100 60, 130 60" stroke="#0799F8" strokeWidth="2" fill="none" />
      <path d="M44 60 H130" stroke="#12BFF3" strokeWidth="2" fill="none" />
      <path d="M44 92 C90 92, 100 60, 130 60" stroke="#08B9AE" strokeWidth="2" fill="none" />
      <circle cx="130" cy="60" r="12" fill="#031B3D" stroke="#0799F8" strokeWidth="2" />
      <path d="M142 60 H214" stroke="#08B9AE" strokeWidth="2.5" fill="none" />
      <circle cx="226" cy="60" r="10" fill="#08B9AE" />
    </svg>
  );
}

function Mule3() {
  return (
    <svg viewBox="0 0 260 120" className="h-auto w-full" aria-hidden="true">
      <rect x="18" y="36" width="78" height="48" rx="8" fill="#062B5C" stroke="#B42318" />
      <text x="57" y="64" textAnchor="middle" fill="#F7D4D0" fontSize="11">
        Mule 3
      </text>
      <path d="M106 60 H154" stroke="#0799F8" strokeWidth="2" />
      <path d="M144 52 L154 60 L144 68" fill="none" stroke="#0799F8" strokeWidth="2" />
      <rect x="164" y="36" width="78" height="48" rx="8" fill="#08B9AE" />
      <text x="203" y="64" textAnchor="middle" fill="#031B3D" fontSize="11">
        Mule 4
      </text>
    </svg>
  );
}

function Cloudhub() {
  return (
    <svg viewBox="0 0 260 120" className="h-auto w-full" aria-hidden="true">
      <rect x="20" y="28" width="88" height="28" rx="6" fill="#062B5C" stroke="#12BFF3" />
      <text x="64" y="46" textAnchor="middle" fill="#D7ECF8" fontSize="10">
        CloudHub 1.0
      </text>
      <path d="M118 42 H150" stroke="#0799F8" strokeWidth="2" />
      <rect x="152" y="28" width="88" height="28" rx="6" fill="#08B9AE" />
      <text x="196" y="46" textAnchor="middle" fill="#031B3D" fontSize="10">
        CloudHub 2.0
      </text>
      <rect x="56" y="72" width="148" height="24" rx="6" fill="#031B3D" stroke="#12BFF3" />
      <text x="130" y="88" textAnchor="middle" fill="#9FD8F8" fontSize="10">
        Compatibility + deploy
      </text>
    </svg>
  );
}

function PointToPoint() {
  return (
    <svg viewBox="0 0 260 120" className="h-auto w-full" aria-hidden="true">
      <path d="M36 24 L92 96" stroke="#B42318" strokeWidth="1.5" opacity="0.7" />
      <path d="M36 96 L92 24" stroke="#B42318" strokeWidth="1.5" opacity="0.7" />
      <circle cx="36" cy="24" r="6" fill="#B42318" />
      <circle cx="92" cy="24" r="6" fill="#B42318" />
      <circle cx="36" cy="96" r="6" fill="#B42318" />
      <circle cx="92" cy="96" r="6" fill="#B42318" />
      <path d="M128 36 C160 36, 168 60, 196 60" stroke="#0799F8" strokeWidth="2" fill="none" />
      <path d="M128 84 C160 84, 168 60, 196 60" stroke="#08B9AE" strokeWidth="2" fill="none" />
      <circle cx="128" cy="36" r="6" fill="#062B5C" stroke="#12BFF3" />
      <circle cx="128" cy="84" r="6" fill="#062B5C" stroke="#12BFF3" />
      <circle cx="208" cy="60" r="9" fill="#08B9AE" />
    </svg>
  );
}

function Capacity() {
  return (
    <svg viewBox="0 0 260 120" className="h-auto w-full" aria-hidden="true">
      <circle cx="70" cy="48" r="14" fill="#062B5C" stroke="#12BFF3" />
      <circle cx="108" cy="48" r="14" fill="#031B3D" stroke="#0799F8" />
      <circle cx="146" cy="48" r="14" fill="#062B5C" stroke="#08B9AE" />
      <rect x="58" y="78" width="108" height="16" rx="8" fill="#062B5C" />
      <text x="190" y="54" fill="#9FD8F8" fontSize="10">
        + capacity
      </text>
    </svg>
  );
}

function Pipeline() {
  return (
    <svg viewBox="0 0 260 120" className="h-auto w-full" aria-hidden="true">
      {["Build", "Test", "Approve", "Run"].map((label, index) => (
        <g key={label}>
          <circle cx={36 + index * 64} cy="48" r="12" fill="#062B5C" stroke="#12BFF3" />
          <text x={36 + index * 64} y="80" textAnchor="middle" fill="#9FD8F8" fontSize="10">
            {label}
          </text>
          {index < 3 ? (
            <path
              d={`M ${50 + index * 64} 48 H ${86 + index * 64}`}
              stroke="#08B9AE"
              strokeWidth="2"
            />
          ) : null}
        </g>
      ))}
    </svg>
  );
}

function Performance() {
  return (
    <svg viewBox="0 0 260 120" className="h-auto w-full" aria-hidden="true">
      <path
        d="M24 88 L64 72 L96 80 L132 40 L168 52 L204 28 L236 36"
        fill="none"
        stroke="#0799F8"
        strokeWidth="2.5"
      />
      <circle cx="132" cy="40" r="5" fill="#08B9AE" />
      <path d="M24 96 H236" stroke="#12BFF3" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

const visuals: Record<ChallengeVisual, () => ReactElement> = {
  backlog: Backlog,
  disconnected: Disconnected,
  mule3: Mule3,
  cloudhub: Cloudhub,
  pointToPoint: PointToPoint,
  capacity: Capacity,
  pipeline: Pipeline,
  performance: Performance,
};

export function ChallengeVisual({ visual }: { visual: ChallengeVisual }) {
  const Graphic = visuals[visual];
  return (
    <div className="rounded-2xl bg-navy px-4 py-3">
      <Graphic />
    </div>
  );
}
