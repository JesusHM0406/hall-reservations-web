import { Slot } from '@radix-ui/react-slot';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  asChild?: boolean;
  children: ReactNode;
}

const Button = ({ primary = false, asChild = false, children, ...props }: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp className={`cursor-pointer text-white flex justify-center items-center gap-2.5 font-semibold rounded-xl py-3 px-4 border-2 transition-shadow ${primary ? 'bg-brand border-transparent' : 'bg-transparent border-brand'} shadow-lg shadow-transparent hover:shadow-brand/45`} {...props} >
      {children}
    </Comp>
  )
};

export default Button;