import { Menu } from "lucide-react";
import { type ThemeType } from "../../constants/ui.constants";
import { ICON_SIZE } from "../../constants/ui.constants";
import ThemeSwitcher from "../ui/ThemeSwitcher";

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

      <ThemeSwitcher theme={theme} setCurrentTheme={themeToggleMethod} />
      
    </header>
  );
}

export default Header;