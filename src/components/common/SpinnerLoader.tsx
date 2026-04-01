import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@utils';

const loaderVariants = cva(
  'relative rounded-full animate-spin before:block before:absolute before:rounded-full block',
  {
    variants: {
      intent: {
        white: 'border-white before:bg-white',
        gray: 'border-light-gray before:bg-light-gray dark:border-slate-gray dark:before:bg-slate-gray'
      },
      size: {
        xs: 'border-2 h-4 w-4 before:h-1.5 before:w-1.5 before:-top-1',
        sm: 'border-2  h-5 w-5 before:h-2 before:w-2 before:-top-1',
        md: 'border-3 h-7 w-7 before:h-3 before:w-3 before:-top-1.5',
        lg: 'border-4 h-9 w-9 before:h-3.5 before:w-3.5 before:-top-2',
        xl: 'border-5 h-11 w-11 before:h-4 before:w-4 before:-top-2.5',
        xxl: 'border-6 h-14 w-14 before:h-5 before:w-5 before:-top-3'
      }
    },
    defaultVariants: {
      intent: 'white',
      size: 'sm'
    }
  }
);

type LoaderVariantProps = VariantProps<typeof loaderVariants>;

const SpinnerLoader = ({ intent, size }: LoaderVariantProps) => {
  return <span className={cn(loaderVariants({ intent, size }))}></span>;
};

export default SpinnerLoader;
