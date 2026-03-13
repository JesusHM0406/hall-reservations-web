const ICON_SIZE = {
  XS: 12,
  SM: 14,
  MD: 18,
  LG: 22,
  XL: 26
} as const;

const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
} as const;

type ThemeType = typeof THEMES[keyof typeof THEMES];

export { ICON_SIZE, THEMES, type ThemeType };