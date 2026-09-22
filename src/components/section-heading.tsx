import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-3xl text-center")}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-xs font-semibold tracking-[0.2em] uppercase",
            tone === "dark" ? "text-cyan" : "text-electric",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-3xl font-semibold sm:text-4xl",
          tone === "dark" ? "text-white" : "text-navy",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 max-w-3xl text-base leading-7 sm:text-lg",
            align === "center" && "mx-auto",
            tone === "dark" ? "text-white/75" : "text-slate",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
