import { PaginationProps } from './types';
import { cn } from '@/core/utils';

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const handleFirst = () => {
    if (canGoPrevious) {
      onPageChange(1);
    }
  };

  const handlePrevious = () => {
    if (canGoPrevious) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      onPageChange(currentPage + 1);
    }
  };

  const handleLast = () => {
    if (canGoNext) {
      onPageChange(totalPages);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={handleFirst}
        disabled={!canGoPrevious}
        className={cn(
          'px-3 py-2 rounded-md border transition-colors',
          canGoPrevious
            ? 'border-gray-300 hover:bg-gray-50 text-gray-700'
            : 'border-gray-200 text-gray-400 cursor-not-allowed'
        )}
        aria-label="Primeira página"
      >
        ««
      </button>

      <button
        onClick={handlePrevious}
        disabled={!canGoPrevious}
        className={cn(
          'px-3 py-2 rounded-md border transition-colors',
          canGoPrevious
            ? 'border-gray-300 hover:bg-gray-50 text-gray-700'
            : 'border-gray-200 text-gray-400 cursor-not-allowed'
        )}
        aria-label="Página anterior"
      >
        «
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={cn(
            'px-4 py-2 rounded-md border transition-colors min-w-[40px]',
            page === currentPage
              ? 'bg-primary-600 text-white border-primary-600'
              : page === '...'
              ? 'border-transparent cursor-default'
              : 'border-gray-300 hover:bg-gray-50 text-gray-700'
          )}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={!canGoNext}
        className={cn(
          'px-3 py-2 rounded-md border transition-colors',
          canGoNext
            ? 'border-gray-300 hover:bg-gray-50 text-gray-700'
            : 'border-gray-200 text-gray-400 cursor-not-allowed'
        )}
        aria-label="Próxima página"
      >
        »
      </button>

      <button
        onClick={handleLast}
        disabled={!canGoNext}
        className={cn(
          'px-3 py-2 rounded-md border transition-colors',
          canGoNext
            ? 'border-gray-300 hover:bg-gray-50 text-gray-700'
            : 'border-gray-200 text-gray-400 cursor-not-allowed'
        )}
        aria-label="Última página"
      >
        »»
      </button>
    </div>
  );
};
