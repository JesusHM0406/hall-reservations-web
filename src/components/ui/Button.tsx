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
        hall: '',
        danger: '',
        success: '',
        warning: '',
        info: '',
        res: '',
        user: ''
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
      { intent: 'danger', filled: false, className: 'border-danger hover:bg-danger' },
      { intent: 'success', filled: false, className: 'border-success hover:bg-success' },
      { intent: 'warning', filled: false, className: 'border-warning hover:bg-warning' },
      { intent: 'info', filled: false, className: 'border-info hover:bg-info' },
      { intent: 'res', filled: false, className: 'border-res hover:bg-res' },
      { intent: 'user', filled: false, className: 'border-user hover:bg-user' },

      // Filled variants
      { intent: 'brand', filled: true, className: 'bg-brand' },
      { intent: 'gray', filled: true, className: 'bg-gray' },
      { intent: 'hall', filled: true, className: 'bg-hall' },
      { intent: 'danger', filled: true, className: 'bg-danger' },
      { intent: 'success', filled: true, className: 'bg-success' },
      { intent: 'warning', filled: true, className: 'bg-warning' },
      { intent: 'info', filled: true, className: 'bg-info' },
      { intent: 'res', filled: true, className: 'bg-res' },
      { intent: 'user', filled: true, className: 'bg-user' },

      // Shadow variants
      { intent: 'brand', shadow: true, className: 'hover:shadow-brand/50' },
      { intent: 'gray', shadow: true, className: 'hover:shadow-gray/50' },
      { intent: 'hall', shadow: true, className: 'hover:shadow-hall/50' },
      { intent: 'danger', shadow: true, className: 'hover:shadow-danger/50' },
      { intent: 'success', shadow: true, className: 'hover:shadow-success/50' },
      { intent: 'warning', shadow: true, className: 'hover:shadow-warning/50' },
      { intent: 'info', shadow: true, className: 'hover:shadow-info/50' },
      { intent: 'res', shadow: true, className: 'hover:shadow-res/50' },
      { intent: 'user', shadow: true, className: 'hover:shadow-user/50' },

      // Light focus variants
      { intent: 'brand', darkFocus: false, className: 'focus-visible:ring-brand-light' },
      { intent: 'gray', darkFocus: false, className: 'focus-visible:ring-white' },
      { intent: 'hall', darkFocus: false, className: 'focus-visible:ring-hall-light' },
      { intent: 'danger', darkFocus: false, className: 'focus-visible:ring-danger-light' },
      { intent: 'success', darkFocus: false, className: 'focus-visible:ring-success-light' },
      { intent: 'warning', darkFocus: false, className: 'focus-visible:ring-warning-light' },
      { intent: 'info', darkFocus: false, className: 'focus-visible:ring-info-light' },
      { intent: 'res', darkFocus: false, className: 'focus-visible:ring-res-light' },
      { intent: 'user', darkFocus: false, className: 'focus-visible:ring-user-light' },

      // Dark focus variants
      { intent: 'brand', darkFocus: true, className: 'focus-visible:ring-brand-dark' },
      { intent: 'gray', darkFocus: true, className: 'focus-visible:ring-dark' },
      { intent: 'hall', darkFocus: true, className: 'focus-visible:ring-hall-dark' },
      { intent: 'danger', darkFocus: true, className: 'focus-visible:ring-danger-dark' },
      { intent: 'success', darkFocus: true, className: 'focus-visible:ring-success-dark' },
      { intent: 'warning', darkFocus: true, className: 'focus-visible:ring-warning-dark' },
      { intent: 'info', darkFocus: true, className: 'focus-visible:ring-info-dark' },
      { intent: 'res', darkFocus: true, className: 'focus-visible:ring-res-dark' },
      { intent: 'user', darkFocus: true, className: 'focus-visible:ring-user-dark' },
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