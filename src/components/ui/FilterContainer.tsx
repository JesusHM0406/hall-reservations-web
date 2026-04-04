import { useId, type ReactNode } from 'react';

interface FilterContainerProps {
  children: (id: string) => ReactNode;
  label: string;
}

export const FilterContainer = ({ children, label }: FilterContainerProps) => {
  const itemId = useId();

  return (
    <div className='grow flex flex-col items-center gap-1'>
      <label htmlFor={itemId} className='font-semibold text-xs uppercase text-slate-dark dark:text-white mb-1'>{label}</label>
      {children(itemId)}
    </div>
  )
}