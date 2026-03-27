import { ICON_SIZE } from '@/constants/ui.constants';
import { Search, X } from 'lucide-react';
import { type InputHTMLAttributes } from 'react';

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'placeholder' | 'aria-label' | 'type'> {
  value: string;
  setSearch: (search: string) => void;
  placeholder: string;
  ariaLabel: string;
  clearLabel: string;
};

export const SearchInput = ( { value, setSearch, placeholder, ariaLabel, clearLabel, ...props }: SearchInputProps) => {
  return (
    <search className='flex flex-col'>
      <form
        className={`w-full flex cursor-text bg-subtle-white border border-inactive/25 focus-within:ring-inactive/50 ${value ? '' : 'pr-4'} rounded-lg text-gray font-medium grow transition duration-150 focus-within:ring-2 dark:focus-within:ring-slate-gray dark:bg-dark-gray dark:border-slate-gray`}
        onSubmit={(e) => {e.preventDefault()}}
      >
        <label
          className='flex items-center gap-2 grow'
        >
          <span className='pointer-events-none pl-4'>
            <Search size={ICON_SIZE.SM} aria-hidden />
          </span>
            <input
              type='text'
              value={value}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={placeholder}
              aria-label={ariaLabel}
              className='outline-none bg-transparent text-dark dark:text-white py-3 text-xs w-full'
              {...props}
            />
        </label>
        {value ? (
          <button
            type='button'
            aria-label={clearLabel}
            className='py-3 px-4'
            onClick={() => setSearch('')}
          >
            <X size={ICON_SIZE.SM} aria-hidden />
          </button>
        ) : null}
      </form>
    </search>
  )
}
