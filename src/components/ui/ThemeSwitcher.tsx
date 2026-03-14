import { useRef, type KeyboardEvent } from "react";
import { ICON_SIZE, type ThemeType } from "../../constants/ui.constants";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

interface Theme {
  themeName: ThemeType;
  label: string;
  iconName: IconName;
}

const themesInfo: Theme[] = [
  { themeName: 'light', label: 'toggle light mode', iconName: 'sun' },
  { themeName: 'dark', label: 'toggle dark mode', iconName: 'moon' },
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
    let nextIndex;

    if (e.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % themesInfo.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + themesInfo.length) % themesInfo.length;
    } else {
      return;
    }

    e.preventDefault()
    
    const nextTheme = themesInfo[nextIndex].themeName;

    setCurrentTheme(nextTheme);

    const buttons: NodeListOf<HTMLButtonElement> | undefined = containerRef.current?.querySelectorAll('button');
    
    if (buttons) buttons[nextIndex].focus();
  }

  return (
    <div
      className='rounded-xl border-2 border-brand text-inactive flex'
      role='radiogroup'
      aria-label='visual theme selector'
      onKeyDown={handleKeyDown}
      ref={containerRef}
    >
      {themesInfo.map(({ themeName, label, iconName }) => (
        <button
          id={themeName}
          role='radio' 
          aria-checked={ theme === themeName } 
          aria-label={label} 
          tabIndex={ theme === themeName ? 0 : -1 }
          key={themeName} 
          type='button'
          className={`cursor-pointer py-3 px-4 transition-colors ${ theme === themeName ? 'bg-brand text-white' : 'bg-transparent hover:bg-brand/20' }`} 
          onClick={() => setCurrentTheme(themeName)}
        >
          <span aria-hidden>
            <DynamicIcon name={iconName} size={ICON_SIZE.SM} />
          </span>
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;