import { useState } from 'react';
import { SIDEBAR_ITEMS } from '../../config/sidebar-config';
import Button from '../common/Button';
import SidebarItem from '../ui/SidebarItem';
import { Link, useLocation } from 'react-router';
import { PATHS } from '../../paths';
import { LogIn, UserPlus } from 'lucide-react';

interface SidebarProps {
  isSidebarOpen: boolean;
  closeMethod: () => void;
}

const Sidebar = ({ isSidebarOpen, closeMethod }: SidebarProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const location = useLocation();
  const pathName = location.pathname;

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
      <aside className={`shrink-0 w-70 px-4 flex flex-col py-8 transition-[margin] overflow-hidden ${isSidebarOpen ? 'ml-0' : '-ml-70'} md:ml-0 z-50 bg-dark border-r dark:border-slate-gray`}>
        <div className='grow'>
          {SIDEBAR_ITEMS.map(item => {
            if (item.type === 'expandable') {
              return (
                <SidebarItem
                  {...item}
                  isSectionActive={pathName.startsWith(`/${item.rootPath}`)}
                  sectionMethod={() => handleSectionClick(item.sectionLabel, true)}
                  closeSidebarMethod={closeMethod}
                  isExpanded={expandedSection === item.sectionLabel}
                  key={item.sectionLabel}
                />
              )
            }

            return (
              <SidebarItem
                {...item}
                isSectionActive={pathName.startsWith(`/${item.rootPath}`)}
                sectionMethod={() => handleSectionClick(item.sectionLabel, false)}
                key={item.sectionLabel}
              />
            )

          })}
        </div>
        <div className='flex flex-col gap-4 items-center'>
          <Button primary asChild>
            <Link
              to={`/${PATHS.auth.root}/${PATHS.auth.register}`}
              onClick={handleAuthButtonClick}
            >
              <UserPlus size={18} />
              <span>Register</span>
            </Link>
          </Button>
          
          <Button primary={false} asChild>
            <Link
              to={`/${PATHS.auth.root}/${PATHS.auth.login}`}
              onClick={handleAuthButtonClick}
            >
              <LogIn size={18} />
              <span>Log In</span>
            </Link>
          </Button>
        </div>
      </aside>
      <div className={`bg-black/50 w-dvw h-dvh fixed inset-0 z-40 ${isSidebarOpen ? 'block' : 'hidden'} md:hidden`} onClick={closeMethod}></div>
    </>
  )
};

export default Sidebar;