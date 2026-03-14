import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...input: ClassValue[]) => {
  return twMerge(clsx(input));
};

export { cn };