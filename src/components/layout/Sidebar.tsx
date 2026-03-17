import { useRef, useState, type HTMLAttributes } from 'react';
import { SIDEBAR_ITEMS } from '../../config/sidebar-config';
import Button from '../common/Button';
import SidebarItem from '../ui/SidebarItem';
import { NavLink, useLocation } from 'react-router';
import { PATHS } from '../../paths';
import { LogIn, UserPlus, X } from 'lucide-react';
import { ICON_SIZE } from '../../constants/ui.constants';
import { cn } from '../../lib/utils';
import { useFocusTrap } from '../../hooks/useFocusTrap';

interface SidebarProps extends HTMLAttributes<HTMLElement> {
  isSidebarOpen: boolean;
  closeMethod: () => void;
  isDesktop: boolean;
}

const Sidebar = ({ isSidebarOpen, closeMethod, isDesktop, className, ...props }: SidebarProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const location = useLocation();
  const pathName = location.pathname;

  const asideRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const wasSidebarOpenRef = useRef<boolean>(false);

  useFocusTrap(asideRef, isSidebarOpen && !isDesktop, wasSidebarOpenRef, closeBtnRef, closeMethod);

  const handleSectionClick = (sectionLabel: string, hasOptions: boolean) => {
    if (hasOptions) {
      setExpandedSection(expandedSection === sectionLabel ? null : sectionLabel);
      return;
    }

    setExpandedSection(null);
    closeMethod();
  };

  const handleAuthButtonClick = () => {
    setExpandedSection(null);
    closeMethod();
  };

  return (
    <>
      <aside 
        {...props} 
        ref={asideRef} 
        className={cn(
          'shrink-0 w-60 px-4 py-8 flex transition-[margin] overflow-hidden text-sm',
          isSidebarOpen ? 'ml-0' : '-ml-60',
          'md:ml-0 z-50 bg-dark border-r dark:border-slate-gray',
          className
        )}
      >
        <nav className='grow flex flex-col' aria-label='Main navigation sidebar'>
          <button 
            ref={closeBtnRef} 
            aria-label='Close main navigation sidebar'
            type='button'
            className='cursor-pointer p-2.5 w-fit rounded-xl border-2 border-brand text-inactive mb-6 self-end transition-colors duration-150 hover:bg-brand hover:text-white md:hidden' 
            onClick={closeMethod}
          >
            <X size={ICON_SIZE.SM} aria-hidden='true' />
          </button>
          <ul className='grow'>
            {SIDEBAR_ITEMS.map(item => {
              if (item.type === 'expandable') {
                return (
                  <li key={item.sectionLabel}>
                    <SidebarItem
                      {...item}
                      isSectionActive={pathName.startsWith(`/${item.rootPath}`)}
                      sectionMethod={() => handleSectionClick(item.sectionLabel, true)}
                      closeSidebarMethod={closeMethod}
                      isExpanded={expandedSection === item.sectionLabel}
                    />
                  </li>
                )
              }

              return (
                <li key={item.sectionLabel}>
                  <SidebarItem
                    {...item}
                    isSectionActive={pathName.startsWith(`/${item.rootPath}`)}
                    sectionMethod={() => handleSectionClick(item.sectionLabel, false)}
                    key={item.sectionLabel}
                  />
                </li>
              )

            })}
          </ul>
          <div className='flex flex-col gap-4 items-center'>
            <Button asChild onClick={handleAuthButtonClick}>
              <NavLink to={`/${PATHS.auth.root}/${PATHS.auth.register}`}>
                <UserPlus size={ICON_SIZE.MD} aria-hidden='true' />
                <span>Register</span>
              </NavLink>
            </Button>
            
            <Button asChild onClick={handleAuthButtonClick} filled={false} >
              <NavLink to={`/${PATHS.auth.root}/${PATHS.auth.login}`}>
                <LogIn size={ICON_SIZE.MD} aria-hidden='true' />
                <span>Log In</span>
              </NavLink>
            </Button>
          </div>
        </nav>
      </aside>
      <div
        aria-hidden='true'
        className={`bg-black/50 w-dvw h-dvh fixed inset-0 z-40 ${isSidebarOpen ? 'block' : 'hidden'} md:hidden`}
        onClick={closeMethod}
      ></div>
    </>
  )
};

export default Sidebar;