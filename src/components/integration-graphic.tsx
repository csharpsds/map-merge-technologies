export function IntegrationGraphic() {
  return (
    <div
      className="relative mx-auto w-full max-w-lg"
      role="img"
      aria-label="Diagram of systems mapped into a single integration flow"
    >
      <svg viewBox="0 0 520 420" className="h-auto w-full" fill="none">
        <defs>
          <linearGradient id="flow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0799F8" />
            <stop offset="100%" stopColor="#08B9AE" />
          </linearGradient>
        </defs>
        <path
          d="M80 80 C160 80, 180 210, 260 210"
          stroke="url(#flow)"
          strokeWidth="3"
          opacity="0.85"
        />
        <path
          d="M80 210 C170 210, 190 210, 260 210"
          stroke="#12BFF3"
          strokeWidth="3"
          opacity="0.8"
        />
        <path
          d="M80 340 C160 340, 180 210, 260 210"
          stroke="#08B9AE"
          strokeWidth="3"
          opacity="0.85"
        />
        <path
          d="M260 210 C340 210, 360 210, 440 210"
          stroke="url(#flow)"
          strokeWidth="4"
        />
        {[
          { x: 80, y: 80, label: "CRM" },
          { x: 80, y: 210, label: "ERP" },
          { x: 80, y: 340, label: "SaaS" },
        ].map((node) => (
          <g key={node.label}>
            <circle cx={node.x} cy={node.y} r="22" fill="#062B5C" stroke="#12BFF3" />
            <circle cx={node.x} cy={node.y} r="7" fill="#FFFFFF" />
            <text
              x={node.x + 34}
              y={node.y + 5}
              fill="#D7ECF8"
              fontSize="14"
              fontFamily="ui-sans-serif, system-ui"
            >
              {node.label}
            </text>
          </g>
        ))}
        <circle cx="260" cy="210" r="28" fill="#031B3D" stroke="#0799F8" strokeWidth="3" />
        <circle cx="260" cy="210" r="8" fill="#0799F8" />
        <text
          x="248"
          y="258"
          fill="#9FD8F8"
          fontSize="12"
          fontFamily="ui-sans-serif, system-ui"
        >
          MAP
        </text>
        <circle cx="440" cy="210" r="26" fill="#08B9AE" />
        <circle cx="440" cy="210" r="8" fill="#FFFFFF" />
        <text
          x="404"
          y="258"
          fill="#D7ECF8"
          fontSize="12"
          fontFamily="ui-sans-serif, system-ui"
        >
          MERGED APIs
        </text>
      </svg>
    </div>
  );
}
