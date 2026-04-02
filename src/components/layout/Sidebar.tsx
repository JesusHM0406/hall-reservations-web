import { useRef, useState, type HTMLAttributes } from 'react';
import { SIDEBAR_ITEMS } from '@/config/sidebar-config';
import Button from '../ui/Button';
import SidebarItem from './SidebarItem';
import { NavLink } from 'react-router';
import { PATHS } from '@/paths';
import { LogIn, UserPlus, X } from 'lucide-react';
import { ICON_SIZE } from '@/constants/ui.constants';
import { cn } from '@utils';
import { useFocusTrap } from '@/hooks/useFocusTrap';

interface SidebarProps extends HTMLAttributes<HTMLElement> {
  isSidebarOpen: boolean;
  closeMethod: () => void;
  isDesktop: boolean;
}

const Sidebar = ({ isSidebarOpen, closeMethod, isDesktop, className, ...props }: SidebarProps) => {
  const asideRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const wasSidebarOpenRef = useRef<boolean>(false);

  const [expandedOpt, setExpandedOpt] = useState<string | null>(null);

  useFocusTrap(asideRef, isSidebarOpen && !isDesktop, wasSidebarOpenRef, closeBtnRef, closeMethod);

  const handleExpandableClick = (label: string) => {
    setExpandedOpt(expandedOpt === label ? null : label);
  }

  return (
    <>
      <aside
        {...props}
        ref={asideRef}
        className={cn(
          'shrink-0 w-60 px-4 py-8 flex transition-[margin] overflow-hidden text-sm',
          isSidebarOpen ? 'ml-0' : '-ml-60',
          'md:ml-0 z-50 bg-dark border-r border-transparent dark:border-slate-gray',
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
          <ul className='grow flex flex-col gap-1.5'>
            {SIDEBAR_ITEMS.map(item => {
              if (item.type === 'expandable') {
                return (
                  <li key={item.sectionLabel}>
                    <SidebarItem
                      {...item}
                      sectionMethod={() => handleExpandableClick(item.sectionLabel)}
                      isExpanded={expandedOpt === item.sectionLabel}
                      closeMethod={closeMethod}
                    />
                  </li>
                )
              }

              return (
                <li key={item.sectionLabel}>
                  <SidebarItem
                    {...item}
                    sectionMethod={closeMethod}
                  />
                </li>
              )

            })}
          </ul>
          <div className='flex flex-col gap-4 items-center'>
            <Button asChild onClick={closeMethod}>
              <NavLink to={`/${PATHS.auth.root}/${PATHS.auth.register}`}>
                <UserPlus size={ICON_SIZE.MD} aria-hidden='true' />
                <span>Register</span>
              </NavLink>
            </Button>

            <Button asChild onClick={closeMethod} filled={false} intent='gray' >
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