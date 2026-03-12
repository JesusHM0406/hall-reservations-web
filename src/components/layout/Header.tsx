import { Menu, Sun, Moon, Monitor } from "lucide-react";
import type { FC } from "react";
import type { ThemesType } from "../../config/themes-config";

interface HeaderProps {
  menuMethod: () => void;
  theme: ThemesType;
  themeToggleMethod: (theme: ThemesType) => void;
}

const Header: FC<HeaderProps> = ({ menuMethod, theme, themeToggleMethod }) => {
  return (
    <header className='bg-slate-900 w-fit p-3 rounded-2xl flex items-center gap-5 fixed border border-slate-600'>      
      <button
        type='button'
        aria-label='Open sidebar'
        onClick={menuMethod}
        className='cursor-pointer p-3 rounded-xl border-2 border-indigo-400 transition-colors duration-150 text-white hover:bg-indigo-400 md:hidden'
      >
        <Menu size={14} />
      </button>

      <div className='rounded-xl border-2 border-indigo-400 text-slate-400'>
        <button
          type='button'
          className={`cursor-pointer py-3 px-4 transition-colors duration-150 ${theme === 'light' ? 'text-white bg-indigo-400' : 'hover:bg-indigo-400/25'}`}
          onClick={() => themeToggleMethod('light')}
        >
          <Sun size={14} />
        </button>
        
        <button
          type='button'
          className={`cursor-pointer py-3 px-4 transition-colors duration-150 ${theme === 'dark' ? 'text-white bg-indigo-400' : 'hover:bg-indigo-400/25'}`}
          onClick={() => themeToggleMethod('dark')}
        >
          <Moon size={14} />
        </button>

        <button
          type='button'
          className={`cursor-pointer py-3 px-4 transition-colors duration-150 ${theme === 'system' ? 'text-white bg-indigo-400' : 'hover:bg-indigo-400/25'}`}
          onClick={() => themeToggleMethod('system')}
        >
          <Monitor size={14} />
        </button>
      </div>
      
    </header>
  );
}

export default Header;