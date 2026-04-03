import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@utils';
import { shadcnButtonVariants } from './buttonStyles';

function ShadcnButton({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof shadcnButtonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(shadcnButtonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { ShadcnButton }
