import { Menu, Sun, Moon, Monitor } from "lucide-react";
import { THEMES, type ThemeType } from "../../config/themes-config";
import { ICON_SIZE } from "../../constants/ui.constants";

interface HeaderProps {
  menuMethod: () => void;
  theme: ThemeType;
  themeToggleMethod: (theme: ThemeType) => void;
}

const Header = ({ menuMethod, theme, themeToggleMethod }: HeaderProps) => {
  return (
    <header className='bg-slate-dark w-fit p-3 mt-8 rounded-2xl flex items-center gap-5 fixed border border-transparent dark:border-slate-gray'>      
      <button
        type='button'
        aria-label='Open sidebar'
        onClick={menuMethod}
        className='cursor-pointer p-3 rounded-xl border-2 border-brand transition-colors duration-150 text-inactive hover:bg-brand hover:text-white md:hidden'
      >
        <Menu size={ICON_SIZE.SM} />
      </button>

      <div
        role='tablist'
        aria-label='Select theme'
        className='rounded-xl border-2 border-brand text-inactive'
      >
        <button
          role='tab'
          aria-label='Toggle light mode'
          aria-selected={theme === THEMES.LIGHT}
          id='theme-light'
          type='button'
          className={`cursor-pointer py-3 px-4 transition-colors duration-150 ${theme === THEMES.LIGHT ? 'text-white bg-brand' : 'hover:bg-brand/25'}`}
          onClick={() => themeToggleMethod(THEMES.LIGHT)}
        >
          <Sun size={ICON_SIZE.SM} />
        </button>
        
        <button
          role='tab'
          aria-label='Toggle dark mode'
          aria-selected={theme === THEMES.DARK}
          id='theme-dark'
          type='button'
          className={`cursor-pointer py-3 px-4 transition-colors duration-150 ${theme === THEMES.DARK ? 'text-white bg-brand' : 'hover:bg-brand/25'}`}
          onClick={() => themeToggleMethod(THEMES.DARK)}
        >
          <Moon size={ICON_SIZE.SM} />
        </button>

        <button
          role='tab'
          aria-label='Toggle system mode'
          aria-selected={theme === THEMES.SYSTEM}
          id='theme-system'
          type='button'
          className={`cursor-pointer py-3 px-4 transition-colors duration-150 ${theme === THEMES.SYSTEM ? 'text-white bg-brand' : 'hover:bg-brand/25'}`}
          onClick={() => themeToggleMethod(THEMES.SYSTEM)}
        >
          <Monitor size={ICON_SIZE.SM} />
        </button>
      </div>
      
    </header>
  );
}

export default Header;