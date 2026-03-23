import { Menu } from 'lucide-react';
import { type ThemeType } from '@/constants/ui.constants';
import { ICON_SIZE } from '@/constants/ui.constants';
import ThemeSwitcher from '../ui/ThemeSwitcher';

interface HeaderProps {
  isSidebarOpen: boolean;
  sidebarId: string;
  menuMethod: () => void;
  theme: ThemeType;
  themeToggleMethod: (theme: ThemeType) => void;
}

const Header = ({ isSidebarOpen, sidebarId, menuMethod, theme, themeToggleMethod }: HeaderProps) => {
  return (
    <header className='bg-slate-dark flex items-center gap-2.5 border border-transparent dark:border-slate-gray fixed w-fit p-2.5 ml-6 mt-6 rounded-2xl'>
      <button 
        type='button' 
        aria-label='Open main navigation sidebar' 
        aria-expanded={isSidebarOpen} 
        aria-controls={sidebarId} 
        onClick={menuMethod} 
        className='cursor-pointer p-2.5 rounded-xl border-2 border-brand transition-colors duration-150 text-inactive hover:bg-brand hover:text-white md:hidden'
      >
        <Menu size={ICON_SIZE.SM} aria-hidden='true' />
      </button>
      <ThemeSwitcher theme={theme} setCurrentTheme={themeToggleMethod} />
    </header>
  );
}

export default Header;