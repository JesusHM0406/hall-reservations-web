import { useCallback, useEffect, useRef, useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { Outlet, useNavigate } from 'react-router';
import { THEMES, themesArray, type ThemeType } from '@/constants/ui.constants';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { toast, Toaster } from 'sonner';
import { eventBus } from './lib/events';
import { PATHS } from './paths';
import { useAuth } from './hooks/useAuth';

const savedTheme = localStorage.getItem('theme');
let actualTheme: ThemeType = THEMES.enum.system;

if (savedTheme && themesArray.findIndex(t => t === savedTheme) !== -1 ) {
  actualTheme = savedTheme as ThemeType;
}

const shouldBeDark = actualTheme === THEMES.enum.dark ||
  (actualTheme === THEMES.enum.system && window.matchMedia('(prefers-color-scheme: dark)').matches);

document.documentElement.classList.toggle(THEMES.enum.dark, shouldBeDark);

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(actualTheme);

  const isDesktop = useMediaQuery('(min-width: 48em)'); // 768px Tailwind md breakpoint;

  const mainRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  const { logOut } = useAuth();

  useEffect(()=> {
    if (isSidebarOpen && !isDesktop) mainRef.current?.setAttribute('inert', '');
    else mainRef.current?.removeAttribute('inert');
  }, [isDesktop, isSidebarOpen]);

  useEffect(()=> {
    if (currentTheme !== THEMES.enum.system) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      document.documentElement.classList.toggle(THEMES.enum.dark, mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [currentTheme]);

  useEffect(() => {
    const handleUnauthorized = () => {
      toast.error('Your session has expired or you are not authenticated. Please log in.');
      logOut();
    };
    const handleLoginSuccess = () => {
      toast.success('You have successfully logged in.');
      navigate('/');
    };
    const handleLogout = () => {
      navigate(`/${PATHS.auth.root}/${PATHS.auth.login}`, { replace: true });
    };

    eventBus.on('auth:unauthorized', handleUnauthorized);
    eventBus.on('auth:login-success', handleLoginSuccess);
    eventBus.on('auth:logout', handleLogout);

    return () => {
      eventBus.remove('auth:unauthorized', handleUnauthorized);
      eventBus.remove('auth:login-success', handleLoginSuccess);
      eventBus.remove('auth:logout', handleLogout);
    };
  }, [navigate, logOut]);

  const toggleTheme = (theme: ThemeType) => {
    setCurrentTheme(theme);

    if (theme === THEMES.enum.system) {
      localStorage.removeItem('theme');
    } else {
      localStorage.theme = theme;
    }

    const isDark = theme === THEMES.enum.dark ||
      (theme === THEMES.enum.system && window.matchMedia('(prefers-color-scheme: dark)').matches);

    document.documentElement.classList.toggle(THEMES.enum.dark, isDark);
  };

  const sidebarId = 'main-navigation-sidebar';
  const isSidebarDesktopOrOpen = isDesktop || isSidebarOpen;

  const handleCloseSidebar = useCallback(() => {setIsSidebarOpen(false)}, []);
  const handleOpenSidebar = useCallback(() => {setIsSidebarOpen(true)}, []);

  return (
    <div className='flex h-dvh w-full overflow-hidden'>
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
        className='min-w-full md:min-w-[calc(100%-15rem)]! bg-white dark:bg-dark dark:text-white'
      >
        <Header
          isSidebarOpen={isSidebarDesktopOrOpen}
          sidebarId={sidebarId}
          menuMethod={handleOpenSidebar}
          theme={currentTheme}
          themeToggleMethod={toggleTheme}
        />
        <main className='flex-1 h-dvh overflow-y-auto px-6 pt-24 pb-10'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;