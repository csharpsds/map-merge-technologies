import { cn } from "@/lib/utils";
import type { MegaLink } from "@/content/nav";

const scenes: Record<MegaLink["preview"], { title: string; nodes: string[] }> = {
  map: { title: "Mapped systems", nodes: ["CRM", "ERP", "SaaS"] },
  api: { title: "API layers", nodes: ["System", "Process", "Experience"] },
  migrate: { title: "Runtime path", nodes: ["Mule 3", "Assess", "Mule 4"] },
  secure: { title: "Control plane", nodes: ["Identity", "Policy", "Audit"] },
  operate: { title: "Release path", nodes: ["Build", "Test", "Run"] },
};

export function PreviewFlow({
  scene,
  className,
}: {
  scene: MegaLink["preview"];
  className?: string;
}) {
  const current = scenes[scene];

  return (
    <div className={cn("relative overflow-hidden rounded-2xl bg-navy p-5 text-white", className)}>
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-70" />
      <p className="relative text-xs font-semibold tracking-[0.18em] text-cyan uppercase">
        {current.title}
      </p>
      <div className="relative mt-6 flex items-center justify-between gap-2">
        {current.nodes.map((node, index) => (
          <div key={node} className="flex flex-1 flex-col items-center">
            <span
              className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[10px] font-semibold"
              style={{ transform: `translateY(${index % 2 === 0 ? "0" : "10px"})` }}
            >
              {index + 1}
            </span>
            <span className="mt-2 text-center text-[11px] text-white/80">{node}</span>
          </div>
        ))}
      </div>
      <div className="relative mt-6 h-1 overflow-hidden rounded-full bg-white/10">
        <div className="preview-flow-bar h-full w-1/2 rounded-full bg-linear-to-r from-electric to-teal" />
      </div>
    </div>
  );
}
