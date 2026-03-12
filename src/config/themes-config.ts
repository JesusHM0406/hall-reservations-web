const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
} as const;

type ThemeType = typeof THEMES[keyof typeof THEMES];

export { THEMES, type ThemeType };