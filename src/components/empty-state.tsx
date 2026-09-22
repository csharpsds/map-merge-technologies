export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-white px-6 py-12 text-center">
      <h2 className="text-lg font-semibold text-navy">{title}</h2>
      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate">{description}</p>
    </div>
  );
}
