import { Button } from "@/components/ui/button";

export function Pagination({
  page,
  pageCount,
  onPageChange,
}: {
  page: number;
  pageCount: number;
  onPageChange?: (page: number) => void;
}) {
  if (pageCount <= 1) {
    return (
      <p className="text-sm text-slate" aria-live="polite">
        Showing page 1 of 1
      </p>
    );
  }

  return (
    <nav aria-label="Pagination" className="flex items-center justify-between gap-3">
      <Button
        type="button"
        variant="outline"
        className="h-11 min-h-11 px-4"
        disabled={page <= 1}
        onClick={() => onPageChange?.(page - 1)}
      >
        Previous
      </Button>
      <p className="text-sm text-slate" aria-live="polite">
        Page {page} of {pageCount}
      </p>
      <Button
        type="button"
        variant="outline"
        className="h-11 min-h-11 px-4"
        disabled={page >= pageCount}
        onClick={() => onPageChange?.(page + 1)}
      >
        Next
      </Button>
    </nav>
  );
}
