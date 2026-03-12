import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import { Outlet } from 'react-router';

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  return (
    <div className='flex min-h-dvh w-full overflow-hidden'>
      <Sidebar isSidebarOpen={isSidebarOpen} closeMethod={() => setIsSidebarOpen(false)} />
      <div className='min-w-full h-dvh px-6 py-8 flex flex-col gap-8 md:min-w-[calc(100%-17.5rem)]! overflow-y-auto bg-slate-100'>
        <Header isDarkMode={isDarkMode} menuMethod={() => setIsSidebarOpen(true)} darkModeMethod={() => setIsDarkMode(prev => !prev)} />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
};

export default MainLayout;