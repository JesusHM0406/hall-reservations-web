import { cva } from 'class-variance-authority';

export const shadcnButtonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export const customButtonVariants = cva(
  'cursor-pointer text-white text-xs flex justify-center items-center gap-2.5 font-semibold rounded-lg py-2.5 px-4 border-2 transition disabled:opacity-50 disabled:cursor-not-allowed not-disabled:active:scale-96 focus-visible:ring-2 dark:focus-visible:ring-white',
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
);