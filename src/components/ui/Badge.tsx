import { ICON_SIZE } from '@/constants/ui.constants';
import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@utils';

const badgeVariants = cva(
  'text-[9px] leading-[14px] inline-flex gap-1 items-center font-bold uppercase tracking-wider py-1 px-2 rounded-full w-fit',
  {
    variants: {
      intent: {
        success: 'bg-success-light text-green-800 dark:bg-success-dark dark:text-success-light',
        danger: 'bg-danger-light text-red-800 dark:bg-danger-dark dark:text-danger-light',
        info: 'bg-info-light text-sky-800 dark:bg-info-dark dark:text-info-light',
        warning: 'bg-warning-light text-amber-800 dark:bg-warning-dark dark:text-warning-light',
        brand: 'bg-brand-light text-indigo-800 dark:bg-brand-dark dark:text-brand-light'
      }
    }
  }
);

type BadgeVariantsProps = Required<VariantProps<typeof badgeVariants>>;

interface BadgeProps extends BadgeVariantsProps {
  label: string;
  iconName?: IconName;
  ariaLabel: string;
}

export const Badge = ({ label, iconName, intent, ariaLabel}: BadgeProps) => {
  return (
    <span
      className={cn(badgeVariants({ intent }))}
      aria-label={ariaLabel}
    >
      {iconName ? <DynamicIcon name={iconName} size={ICON_SIZE.SM} aria-hidden /> : null}
      {label}
    </span>
  )
};
