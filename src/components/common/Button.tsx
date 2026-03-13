import { Slot } from '@radix-ui/react-slot';
import type { ReactNode } from 'react';

interface ButtonProps {
  primary: boolean;
  asChild: boolean;
  children: ReactNode;
}

const Button = ({ primary, asChild, children }: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp className={`cursor-pointer text-white flex justify-center items-center gap-2.5 font-semibold rounded-xl py-3 px-4 border-2 transition-shadow ${primary ? 'bg-brand border-transparent' : 'bg-transparent border-brand'} shadow-lg shadow-transparent hover:shadow-brand/45`} >
      {children}
    </Comp>
  )
};

export default Button;