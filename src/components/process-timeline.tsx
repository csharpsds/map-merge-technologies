import { processSteps } from "@/content/process";

export function ProcessTimeline() {
  return (
    <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {processSteps.map((step) => (
        <li
          key={step.step}
          className="relative rounded-2xl border border-line bg-white p-5 shadow-sm"
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-electric uppercase">
            Step {String(step.step).padStart(2, "0")}
          </p>
          <h3 className="mt-3 text-lg font-semibold text-navy">{step.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
