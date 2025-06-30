'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onNextPage,
  onPreviousPage
}: PaginationProps) {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Mobile: Simple prev/next */}
      <div className="flex sm:hidden items-center gap-2">
        <button
          onClick={onPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg text-gray-700 font-semibold hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Anterior
        </button>
        <span className="px-4 py-2 bg-blue-600 text-white rounded-2xl font-semibold">
          {currentPage} de {totalPages}
        </span>
        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg text-gray-700 font-semibold hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente →
        </button>
      </div>

      {/* Desktop: Full pagination */}
      <div className="hidden sm:flex items-center gap-2">
        <button
          onClick={onPreviousPage}
          disabled={currentPage === 1}
          className="px-3 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg text-gray-700 hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {visiblePages.map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-gray-500">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`px-3 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  currentPage === page
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white shadow-lg'
                }`}
              >
                {page}
              </button>
            )}
          </div>
        ))}

        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg text-gray-700 hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Page info for desktop */}
      <div className="hidden sm:block text-sm text-gray-600">
        Página {currentPage} de {totalPages}
      </div>
    </div>
  );
} 