import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@utils';
import{ customButtonVariants } from './buttonStyles';

type ButtonVariantProps = VariantProps<typeof customButtonVariants>;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {
  asChild?: boolean;
  children: ReactNode;
}

const CustomButton = ({ asChild = false, children, intent, filled, shadow, darkFocus, className, type, ...props }: ButtonProps) => {
  if (asChild) {
    return (
      <Slot
        className={cn(customButtonVariants({ intent, filled, shadow, darkFocus }), className)}
        {...props}
      >
        {children}
      </Slot>
    );
  }

  return (
    <button
      type={type ?? 'button'}
      className={cn(customButtonVariants({ intent, filled, shadow, darkFocus }), className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;