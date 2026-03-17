import { useRef, type KeyboardEvent } from "react";
import { ICON_SIZE, type ThemeType } from "../../constants/ui.constants";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

interface Theme {
  themeName: ThemeType;
  label: string;
  iconName: IconName;
}

const themesInfo: Theme[] = [
  { themeName: 'light', label: 'light mode', iconName: 'sun' },
  { themeName: 'dark', label: 'dark mode', iconName: 'moon' },
  { themeName: 'system', label: 'use system preferences', iconName: 'monitor' }
];

interface ThemeSwitcherProps {
  theme: ThemeType;
  setCurrentTheme: (theme: ThemeType) => void;
}

const ThemeSwitcher = ({ theme, setCurrentTheme }: ThemeSwitcherProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = themesInfo.findIndex(opt => opt.themeName === theme);
    let nextIndex: number;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % themesInfo.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + themesInfo.length) % themesInfo.length;
    } else {
      return;
    }

    e.preventDefault()
    
    const nextTheme = themesInfo[nextIndex].themeName;

    const buttons = containerRef.current?.querySelectorAll<HTMLButtonElement>('button');
    
    if (buttons) buttons[nextIndex].focus();

    setCurrentTheme(nextTheme);
  }

  return (
    <div
      className='rounded-xl border-2 border-brand text-inactive flex overflow-hidden'
      role='radiogroup'
      aria-label='visual theme selector'
      onKeyDown={handleKeyDown}
      ref={containerRef}
    >
      {themesInfo.map(({ themeName, label, iconName }) => {
        const isSelected = theme === themeName;

        return (<button
          id={themeName}
          role='radio' 
          aria-checked={isSelected } 
          aria-label={label} 
          tabIndex={isSelected ? 0 : -1 }
          key={themeName} 
          type='button'
          className={`cursor-pointer py-3 px-4 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white ${isSelected ? 'bg-brand text-white' : 'bg-transparent hover:bg-brand/20'}`} 
          onClick={() => setCurrentTheme(themeName)}
        >
          <span aria-hidden>
            <DynamicIcon name={iconName} size={ICON_SIZE.SM} />
          </span>
        </button>);
      })}
    </div>
  );
};

export default ThemeSwitcher;