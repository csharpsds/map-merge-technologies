export function LoadingState({ label = "Loading content" }: { label?: string }) {
  return (
    <div role="status" className="rounded-2xl border border-line bg-white px-6 py-10">
      <p className="text-sm font-medium text-navy">{label}</p>
      <div className="mt-4 space-y-3" aria-hidden="true">
        <div className="h-3 w-2/3 animate-pulse rounded bg-line" />
        <div className="h-3 w-full animate-pulse rounded bg-line" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-line" />
      </div>
    </div>
  );
}
