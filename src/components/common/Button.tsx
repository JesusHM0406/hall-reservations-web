import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@utils';

const buttonVariants = cva(
  'cursor-pointer text-white text-sm flex justify-center items-center gap-2.5 font-semibold rounded-xl py-2.5 px-4 border-2 transition disabled:opacity-50 disabled:cursor-not-allowed active:scale-96',
  {
    variants: {
      intent: {
        brand: '',
        gray: ''
      },
      filled: {
        false: 'bg-transparent',
        true: 'border-transparent'
      },
      shadow: {
        false: 'shadow-none',
        true: 'shadow-lg'
      }
    },
    compoundVariants: [
      // Outlined variants
      { intent: 'brand', filled: false, className: 'border-brand' },
      { intent: 'gray', filled: false, className: 'border-inactive' },

      // Filled variants
      { intent: 'brand', filled: true, className: 'bg-brand' },
      { intent: 'gray', filled: true, className: 'bg-gray' },

      // Shadow variants
      { intent: 'brand', shadow: true, className: 'hover:shadow-brand/50' },
      { intent: 'gray', shadow: true, className: 'hover:shadow-gray/50' }
    ],
    defaultVariants: {
      intent: 'brand',
      filled: true,
      shadow: true
    }
  }
)

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {
  asChild?: boolean;
  children: ReactNode;
}

const Button = ({ asChild = false, children, intent, filled, shadow, className, type, ...props }: ButtonProps) => {
  if (asChild) {
    return (
      <Slot
        className={cn(buttonVariants({ intent, filled, shadow }), className)}
        {...props}
      >
        {children}
      </Slot>
    );
  }

  return (
    <button
      type={type ?? 'button'}
      className={cn(buttonVariants({ intent, filled, shadow }), className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;