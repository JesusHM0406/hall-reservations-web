import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className='p-7 rounded-4xl bg-slate-50 border border-transparent shadow-lg shadow-dark/10 dark:bg-slate-950 dark:border-slate-gray'>
      {children}
    </div>
  )
};

export default Container;