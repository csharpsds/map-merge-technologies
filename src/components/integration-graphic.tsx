"use client";

import { useState } from "react";

export function IntegrationGraphic() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  return (
    <div
      className="relative mx-auto w-full max-w-lg"
      onMouseMove={(event) => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        setOffset({ x, y });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
    >
      <div className="absolute -inset-4 rounded-[2rem] bg-linear-to-br from-electric/20 via-transparent to-teal/20 blur-2xl" />
      <div
        className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-dark-blue/60 p-4 shadow-2xl backdrop-blur-sm"
        style={{
          transform: `translate(${offset.x * 8}px, ${offset.y * 8}px)`,
        }}
      >
        <div
          className="absolute top-8 right-10 size-24 rounded-full bg-electric/20 blur-2xl"
          style={{ transform: `translate(${offset.x * -16}px, ${offset.y * -12}px)` }}
        />
        <div
          className="absolute bottom-10 left-8 size-20 rounded-full bg-teal/25 blur-2xl"
          style={{ transform: `translate(${offset.x * 14}px, ${offset.y * 10}px)` }}
        />
        <svg
          viewBox="0 0 520 420"
          className="relative h-auto w-full"
          fill="none"
          role="img"
          aria-label="Diagram of systems mapped into a single integration flow"
        >
          <defs>
            <linearGradient id="flow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0799F8" />
              <stop offset="100%" stopColor="#08B9AE" />
            </linearGradient>
          </defs>
          <path d="M80 80 C160 80, 180 210, 260 210" stroke="url(#flow)" strokeWidth="3" opacity="0.85" />
          <path d="M80 210 C170 210, 190 210, 260 210" stroke="#12BFF3" strokeWidth="3" opacity="0.8" />
          <path d="M80 340 C160 340, 180 210, 260 210" stroke="#08B9AE" strokeWidth="3" opacity="0.85" />
          <path d="M260 210 C340 210, 360 210, 440 210" stroke="url(#flow)" strokeWidth="4" />
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
          <text x="248" y="258" fill="#9FD8F8" fontSize="12" fontFamily="ui-sans-serif, system-ui">
            MAP
          </text>
          <circle cx="440" cy="210" r="26" fill="#08B9AE" />
          <circle cx="440" cy="210" r="8" fill="#FFFFFF" />
          <text x="404" y="258" fill="#D7ECF8" fontSize="12" fontFamily="ui-sans-serif, system-ui">
            MERGED APIs
          </text>
        </svg>
      </div>
    </div>
  );
}
