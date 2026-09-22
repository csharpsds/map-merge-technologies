import type { ExpertiseGroup } from "@/content/expertise";
import { cn } from "@/lib/utils";

function DevelopmentVisual() {
  return (
    <svg viewBox="0 0 280 88" className="h-auto w-full" aria-hidden="true">
      <path d="M28 44 H252" stroke="#12BFF3" strokeWidth="2" opacity="0.45" />
      <circle cx="28" cy="44" r="10" fill="#062B5C" stroke="#12BFF3" />
      <circle cx="140" cy="44" r="14" fill="#031B3D" stroke="#0799F8" strokeWidth="2" />
      <circle cx="252" cy="44" r="10" fill="#08B9AE" />
      <text x="28" y="72" textAnchor="middle" fill="#9FD8F8" fontSize="10">
        Listen
      </text>
      <text x="140" y="72" textAnchor="middle" fill="#D7ECF8" fontSize="10">
        Transform
      </text>
      <text x="252" y="72" textAnchor="middle" fill="#9FD8F8" fontSize="10">
        Respond
      </text>
    </svg>
  );
}

function PlatformVisual() {
  return (
    <svg viewBox="0 0 280 88" className="h-auto w-full" aria-hidden="true">
      <rect x="16" y="18" width="248" height="28" rx="8" fill="#062B5C" stroke="#12BFF3" />
      <text x="140" y="36" textAnchor="middle" fill="#D7ECF8" fontSize="11">
        Control plane
      </text>
      {[0, 1, 2].map((index) => (
        <g key={index}>
          <rect
            x={28 + index * 80}
            y="56"
            width="64"
            height="22"
            rx="6"
            fill="#031B3D"
            stroke="#08B9AE"
          />
          <text x={60 + index * 80} y="71" textAnchor="middle" fill="#9FD8F8" fontSize="9">
            {["CloudHub", "RTF", "Private"][index]}
          </text>
        </g>
      ))}
    </svg>
  );
}

function ArchitectureVisual() {
  return (
    <svg viewBox="0 0 280 88" className="h-auto w-full" aria-hidden="true">
      {["Experience", "Process", "System"].map((label, index) => (
        <g key={label}>
          <rect
            x={20 + index * 18}
            y={16 + index * 20}
            width={240 - index * 36}
            height="18"
            rx="6"
            fill={index === 1 ? "#062B5C" : "#031B3D"}
            stroke={index === 2 ? "#08B9AE" : "#0799F8"}
          />
          <text
            x="140"
            y={29 + index * 20}
            textAnchor="middle"
            fill="#D7ECF8"
            fontSize="10"
          >
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function DevopsVisual() {
  return (
    <svg viewBox="0 0 280 88" className="h-auto w-full" aria-hidden="true">
      {["Build", "Test", "Approve", "Run"].map((label, index) => (
        <g key={label}>
          <circle cx={36 + index * 70} cy="36" r="12" fill="#062B5C" stroke="#12BFF3" />
          <text x={36 + index * 70} y="64" textAnchor="middle" fill="#9FD8F8" fontSize="10">
            {label}
          </text>
          {index < 3 ? (
            <path
              d={`M ${50 + index * 70} 36 H ${92 + index * 70}`}
              stroke="#08B9AE"
              strokeWidth="2"
            />
          ) : null}
        </g>
      ))}
    </svg>
  );
}

const visuals = {
  development: DevelopmentVisual,
  platform: PlatformVisual,
  architecture: ArchitectureVisual,
  devops: DevopsVisual,
};

export function ExpertiseVisual({
  visual,
  className,
}: {
  visual: ExpertiseGroup["visual"];
  className?: string;
}) {
  const Graphic = visuals[visual];
  return (
    <div className={cn("rounded-2xl border border-white/10 bg-white/5 px-4 py-3", className)}>
      <Graphic />
    </div>
  );
}
