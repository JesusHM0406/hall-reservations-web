import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className='p-6 border border-inactive/25 max-w-md rounded-2xl shadow-xl shadow-dark-gray/5 dark:bg-dark-gray dark:border-slate-gray'>
      {children}
    </div>
  )
};

export default Container;
