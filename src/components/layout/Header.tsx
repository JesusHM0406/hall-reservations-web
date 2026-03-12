import { Menu, Sun, Moon, Monitor } from "lucide-react";
import type { FC } from "react";
import { THEMES, type ThemeType } from "../../config/themes-config";

interface HeaderProps {
  menuMethod: () => void;
  theme: ThemeType;
  themeToggleMethod: (theme: ThemeType) => void;
}

const Header: FC<HeaderProps> = ({ menuMethod, theme, themeToggleMethod }) => {
  return (
    <header className='bg-slate-900 w-fit p-3 rounded-2xl flex items-center gap-5 fixed border border-transparent dark:border-slate-600'>      
      <button
        type='button'
        aria-label='Open sidebar'
        onClick={menuMethod}
        className='cursor-pointer p-3 rounded-xl border-2 border-indigo-400 transition-colors duration-150 text-slate-400 hover:bg-indigo-400 hover:text-white md:hidden'
      >
        <Menu size={14} />
      </button>

      <div
        role='tablist'
        aria-label='Select theme'
        className='rounded-xl border-2 border-indigo-400 text-slate-400'
      >
        <button
          role='tab'
          aria-label='Toggle light mode'
          aria-selected={theme === THEMES.LIGHT}
          id='theme-light'
          type='button'
          className={`cursor-pointer py-3 px-4 transition-colors duration-150 ${theme === THEMES.LIGHT ? 'text-white bg-indigo-400' : 'hover:bg-indigo-400/25'}`}
          onClick={() => themeToggleMethod(THEMES.LIGHT)}
        >
          <Sun size={14} />
        </button>
        
        <button
          role='tab'
          aria-label='Toggle dark mode'
          aria-selected={theme === THEMES.DARK}
          id='theme-dark'
          type='button'
          className={`cursor-pointer py-3 px-4 transition-colors duration-150 ${theme === THEMES.DARK ? 'text-white bg-indigo-400' : 'hover:bg-indigo-400/25'}`}
          onClick={() => themeToggleMethod(THEMES.DARK)}
        >
          <Moon size={14} />
        </button>

        <button
          role='tab'
          aria-label='Toggle system mode'
          aria-selected={theme === THEMES.SYSTEM}
          id='theme-system'
          type='button'
          className={`cursor-pointer py-3 px-4 transition-colors duration-150 ${theme === THEMES.SYSTEM ? 'text-white bg-indigo-400' : 'hover:bg-indigo-400/25'}`}
          onClick={() => themeToggleMethod(THEMES.SYSTEM)}
        >
          <Monitor size={14} />
        </button>
      </div>
      
    </header>
  );
}

export default Header;