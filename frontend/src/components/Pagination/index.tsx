interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination ({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div>
      {pageNumbers.map((pageNumber) => (
        <button key={pageNumber} onClick={() => onPageChange(pageNumber)} disabled={pageNumber === currentPage}>
          {pageNumber}
        </button>
      ))}
    </div>
  );
}