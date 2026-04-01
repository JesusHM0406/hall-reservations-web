import { ICON_SIZE } from '@/constants/ui.constants';
import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@utils';

const badgeVariants = cva(
  'text-[9px] leading-[14px] inline-flex gap-1 items-center font-bold uppercase tracking-wider py-1 px-2 rounded-full w-fit',
  {
    variants: {
      intent: {
        success: 'bg-green-200/80 text-green-700 dark:bg-green-950 dark:text-green-300',
        danger: 'bg-red-200/60 text-red-700 dark:bg-red-950 dark:text-red-300'
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
