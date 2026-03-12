import { Menu, Sun, Moon } from "lucide-react";
import type { FC } from "react";

interface HeaderProps {
  isDarkMode: boolean;
  menuMethod: () => void;
  darkModeMethod: () => void;
}

const Header: FC<HeaderProps> = ({ isDarkMode, menuMethod, darkModeMethod }) => {
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

      <button
        type='button'
        className={`cursor-pointer p-3 rounded-xl border-2 border-indigo-400 transition-colors duration-150 text-white hover:bg-indigo-400`}
        onClick={darkModeMethod}
      >
        {isDarkMode ? <Moon size={14} /> : <Sun size={14} />}
      </button>
    </header>
  );
}

export default Header;