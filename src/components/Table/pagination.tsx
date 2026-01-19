type PaginationProps = {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

export default function Pagination({
  page,
  totalPages,
  onPrev,
  onNext
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button onClick={onPrev} disabled={page === 0}>
        Prev
      </button>

      <span>
        Page {page + 1} of {totalPages}
      </span>

      <button onClick={onNext} disabled={page >= totalPages - 1}>
        Next
      </button>
    </div>
  );
}
