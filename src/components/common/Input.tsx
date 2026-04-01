import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@utils';
import { type InputHTMLAttributes, type Ref } from 'react';
import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import { ICON_SIZE } from '@/constants/ui.constants';

const inputVariants = cva(
  'flex items-center gap-2 bg-subtle-white border border-inactive/25 pr-4 rounded-lg text-gray font-medium grow transition duration-150 focus-within:ring-2 dark:bg-transparent dark:border-slate-gray',
  {
    variants: {
      intention: {
        brand: 'focus-within:ring-brand focus-within:text-brand',
        danger: 'border-danger/70! focus-within:ring-danger text-danger/70'
      }
    }
  }
);

type inputVariantProps = VariantProps<typeof inputVariants>;

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'>, inputVariantProps {
  id: string;
  iconName?: IconName;
  ref?: Ref<HTMLInputElement>;
};

const Input = ({ intention, type, className, iconName, id, ...props }: InputProps) => {
  return (
    <div className='flex flex-col gap-1.5'>
      <div 
        className={cn(inputVariants({ intention }), className)}
        onClick={() => document.getElementById(id)?.focus()}
      >
        {iconName ? (
          <span className='pointer-events-none pl-4'>
            <DynamicIcon name={iconName} size={ICON_SIZE.SM} aria-hidden />
          </span>
          ) : null
        }
        <input 
          type={type ?? 'text'} 
          id={id} 
          className='outline-none text-dark dark:text-white py-3 text-xs w-full' 
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;