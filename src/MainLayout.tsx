import { useCallback, useEffect, useRef, useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import { Outlet } from 'react-router';
import { THEMES, type ThemeType } from './constants/ui.constants';
import { useMediaQuery } from './hooks/useMediaQuery';
import { Toaster } from 'sonner';

const savedTheme = localStorage.getItem('theme') as ThemeType ||THEMES.SYSTEM;
const shouldBeDark = savedTheme === THEMES.DARK ||
  (savedTheme === THEMES.SYSTEM && window.matchMedia('(prefers-color-scheme: dark)').matches);

document.documentElement.classList.toggle(THEMES.DARK, shouldBeDark);

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(savedTheme);
  
  const isDesktop = useMediaQuery('(min-width: 48em)'); // 768px Tailwind md breakpoint;

  const mainRef = useRef<HTMLDivElement | null>(null);

  useEffect(()=> {
    if (isSidebarOpen && !isDesktop) mainRef.current?.setAttribute('inert', '');
    else mainRef.current?.removeAttribute('inert');
  }, [isDesktop, isSidebarOpen]);

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

  const sidebarId = 'main-navigation-sidebar';
  const isSidebarDesktopOrOpen = isDesktop || isSidebarOpen;

  const handleCloseSidebar = useCallback(() => {setIsSidebarOpen(false)}, []);
  const handleOpenSidebar = useCallback(() => {setIsSidebarOpen(true)}, []);

  return (
    <div className='flex min-h-dvh w-full overflow-hidden'>
      <Sidebar 
        id={sidebarId} 
        isSidebarOpen={isSidebarDesktopOrOpen} 
        closeMethod={handleCloseSidebar} 
        isDesktop={isDesktop} 
        {...(isSidebarDesktopOrOpen ? {} : { inert: true })}
      />
      <Toaster theme={currentTheme} position='top-center' />
      <div 
        ref={mainRef} 
        className='min-w-full h-dvh md:min-w-[calc(100%-15rem)]! overflow-y-auto bg-white dark:bg-dark dark:text-white'
      >
        <Header 
          isSidebarOpen={isSidebarDesktopOrOpen} 
          sidebarId={sidebarId}
          menuMethod={handleOpenSidebar} 
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