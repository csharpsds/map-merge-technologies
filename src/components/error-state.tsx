export function ErrorState({
  title = "Something went wrong",
  description = "Please try again. If the problem continues, use the contact form and describe what you were doing.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div role="alert" className="rounded-2xl border border-destructive/20 bg-white px-6 py-10">
      <h2 className="text-lg font-semibold text-navy">{title}</h2>
      <p className="mt-2 max-w-xl text-sm leading-6 text-slate">{description}</p>
    </div>
  );
}
