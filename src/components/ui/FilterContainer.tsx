import { type ReactNode } from 'react';

interface FilterContainerProps {
  children: ReactNode;
  label: string;
}

export const FilterContainer = ({ children, label }: FilterContainerProps) => {
  return (
    <div className='grow flex flex-col items-center gap-1'>
      <h3 className='font-semibold text-xs uppercase text-slate-dark dark:text-white'>{label}</h3>
      {children}
    </div>
  )
}