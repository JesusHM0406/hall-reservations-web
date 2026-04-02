import * as React from 'react';

import { cn } from '@utils';

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg border border-inactive/25 text-xs bg-subtle-white dark:bg-transparent px-2.5 py-2 transition outline-none font-medium focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50  aria-invalid:border-danger/70! aria-invalid:focus-within:ring-danger aria-invalid:ring-destructive/20 md:text-sm dark:disabled:bg-input/80 dark:aria-invalid:border-danger dark:aria-invalid:ring-danger",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
