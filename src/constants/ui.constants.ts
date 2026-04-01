import { z } from "zod";

export const ICON_SIZE = {
  XS: 12,
  SM: 14,
  MD: 18,
  LG: 22,
  XL: 26
} as const;

export const themesArray = ['light', 'dark', 'system'] as const;

export const THEMES = z.enum(themesArray);

export type ThemeType = z.infer<typeof THEMES>;