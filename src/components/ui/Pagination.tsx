import type { PaginationCommons } from '@/api/schemas/common.schemas';
import { ICON_SIZE } from '@/constants/ui.constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';


interface PaginationParams extends Pick<PaginationCommons, 'current_page' | 'pages' | 'has_next' | 'has_prev'> {
  onPageClick: (num: number) => void;
}

export const Pagination = ({ current_page, pages, has_prev, has_next, onPageClick }: PaginationParams) => {
  const showFirst = current_page > 1;
  const showLast = current_page < pages;

  const showLeft = has_prev && current_page - 1 !== 1;
  const showRight = has_next && current_page + 1 !== pages;

  return (
    <nav
      className='mx-auto'
      aria-label='Results pagination'
    >
      <ul className='flex w-full justify-center'>
        {showFirst && (
          <li>
            <button
              type='button'
              className='border-2 text-sm border-inactive/25 py-3 px-4 gap-2 bg-subtle-white/30 dark:bg-dark-gray rounded-sm hover:bg-inactive/10 dark:hover:bg-inactive/15 transition-colors duration-150 mr-5'
              onClick={() => onPageClick(1)}
              aria-label='Go to the first page'
            >
              <span>1</span>
            </button>
          </li>
        )}

        {showLeft && (
          <li>
            <button
              type='button'
              className='border-2 text-sm border-inactive/25 p-3 bg-subtle-white/30 dark:bg-dark-gray rounded-ss-sm rounded-es-sm hover:bg-inactive/10 dark:hover:bg-inactive/15 transition-colors duration-150 h-full'
              onClick={() => onPageClick(current_page - 1)}
              aria-label='Go to the previous page'
            >
              <span><ChevronLeft size={ICON_SIZE.SM} aria-hidden /></span>
            </button>
          </li>
        )}

        <li
          className={`border-2 text-sm border-brand py-3 px-4 gap-2 bg-subtle-white/30 dark:bg-dark-gray hover:bg-inactive/10 dark:hover:bg-inactive/15 transition-colors duration-150 ${showLeft ? 'rounded-ss-none rounded-es-none' : 'rounded-ss-sm rounded-es-sm'} ${showRight ? 'rounded-ee-none rounded-se-none' : 'rounded-ee-sm rounded-se-sm'}`}
          aria-current='page'
        >
          <span className='sr-only'>Current page, page</span>
          {current_page}
        </li>

        {showRight && (
          <li>
            <button
              type='button'
              className='border-2 text-sm border-inactive/25 p-3 gap-2 bg-subtle-white/30 dark:bg-dark-gray rounded-se-sm rounded-ee-sm hover:bg-inactive/10 dark:hover:bg-inactive/15 transition-colors duration-150 h-full'
              onClick={() => onPageClick(current_page + 1)}
              aria-label='Go to the next page'
            >
              <span><ChevronRight size={ICON_SIZE.SM} aria-hidden /></span>
            </button>
          </li>
        )}

        {showLast && (
          <li>
            <button
              type='button'
              className='border-2 text-sm border-inactive/25 py-3 px-4 gap-2 bg-subtle-white/30 dark:bg-dark-gray rounded-sm hover:bg-inactive/10 dark:hover:bg-inactive/15 transition-colors duration-150 ml-5'
              onClick={() => onPageClick(pages)}
              aria-label={`Go to the last page, page ${pages}`}
            >
              <span>{pages}</span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};