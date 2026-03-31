import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@utils';

const buttonVariants = cva(
  'cursor-pointer text-white text-sm flex justify-center items-center gap-2.5 font-semibold rounded-lg py-2.5 px-4 border-2 transition disabled:opacity-50 disabled:cursor-not-allowed not-disabled:active:scale-96 focus-visible:ring-2 dark:focus-visible:ring-white',
  {
    variants: {
      intent: {
        brand: '',
        gray: '',
        hall: ''
      },
      filled: {
        false: 'bg-transparent',
        true: 'border-transparent'
      },
      shadow: {
        false: 'shadow-none',
        true: 'shadow-lg disabled:shadow-none'
      },
      darkFocus: {
        false: '',
        true: ''
      }
    },
    compoundVariants: [
      // Outlined variants
      { intent: 'brand', filled: false, className: 'border-brand hover:bg-brand' },
      { intent: 'gray', filled: false, className: 'border-inactive hover:bg-inactive' },
      { intent: 'hall', filled: false, className: 'border-hall hover:bg-hall' },

      // Filled variants
      { intent: 'brand', filled: true, className: 'bg-brand' },
      { intent: 'gray', filled: true, className: 'bg-gray' },
      { intent: 'hall', filled: true, className: 'bg-hall' },

      // Shadow variants
      { intent: 'brand', shadow: true, className: 'hover:shadow-brand/50' },
      { intent: 'gray', shadow: true, className: 'hover:shadow-gray/50' },
      { intent: 'hall', shadow: true, className: 'hover:shadow-hall/50' },

      // Light focus variants
      { intent: 'brand', darkFocus: false, className: 'focus-visible:ring-brand-light' },
      { intent: 'gray', darkFocus: false, className: 'focus-visible:ring-white' },
      { intent: 'hall', darkFocus: false, className: 'focus-visible:ring-hall-light' },

      // Dark focus variants
      { intent: 'brand', darkFocus: true, className: 'focus-visible:ring-brand-dark' },
      { intent: 'gray', darkFocus: true, className: 'focus-visible:ring-dark' },
      { intent: 'hall', darkFocus: true, className: 'focus-visible:ring-hall-dark' }
    ],
    defaultVariants: {
      intent: 'brand',
      filled: true,
      shadow: true,
      darkFocus: false
    }
  }
)

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {
  asChild?: boolean;
  children: ReactNode;
}

const Button = ({ asChild = false, children, intent, filled, shadow, darkFocus, className, type, ...props }: ButtonProps) => {
  if (asChild) {
    return (
      <Slot
        className={cn(buttonVariants({ intent, filled, shadow, darkFocus }), className)}
        {...props}
      >
        {children}
      </Slot>
    );
  }

  return (
    <button
      type={type ?? 'button'}
      className={cn(buttonVariants({ intent, filled, shadow, darkFocus }), className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;