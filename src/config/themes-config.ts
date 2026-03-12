const THEMES = {
  LIGTH: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
} as const;

type ThemesType = typeof THEMES[keyof typeof THEMES];

export { THEMES, type ThemesType };