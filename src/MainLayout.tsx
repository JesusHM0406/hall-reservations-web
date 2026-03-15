import { useEffect, useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import { Outlet } from 'react-router';
import { THEMES, type ThemeType } from './constants/ui.constants';

const savedTheme = localStorage.getItem('theme') as ThemeType ||THEMES.SYSTEM;
const shouldBeDark = savedTheme === THEMES.DARK ||
  (savedTheme === THEMES.SYSTEM && window.matchMedia('(prefers-color-scheme: dark)').matches);

document.documentElement.classList.toggle(THEMES.DARK, shouldBeDark);

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(savedTheme);

  useEffect(()=> {
    if (currentTheme !== THEMES.SYSTEM) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      document.documentElement.classList.toggle(THEMES.DARK, mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [currentTheme]);

  const toggleTheme = (theme: ThemeType) => {
    setCurrentTheme(theme);

    if (theme === THEMES.SYSTEM) {
      localStorage.removeItem('theme');
    } else {
      localStorage.theme = theme;
    }

    const isDark = theme === THEMES.DARK || 
      (theme === THEMES.SYSTEM && window.matchMedia('(prefers-color-scheme: dark)').matches);

    document.documentElement.classList.toggle(THEMES.DARK, isDark);
  };

  return (
    <div className='flex min-h-dvh w-full overflow-hidden'>
      <Sidebar isSidebarOpen={isSidebarOpen} closeMethod={() => setIsSidebarOpen(false)} />
      <div className='min-w-full h-dvh md:min-w-[calc(100%-17.5rem)]! overflow-y-auto  bg-white dark:bg-dark dark:text-white'>
        <Header
          menuMethod={() => setIsSidebarOpen(true)}
          theme={currentTheme}
          themeToggleMethod={toggleTheme}
        />
        <main className='pt-20 px-6 min-h-dvh flex flex-col pb-10'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;