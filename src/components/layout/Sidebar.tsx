import { useState, type FC } from 'react';
import { SIDEBAR_ITEMS } from '../../config/sidebar-config';
import Button from '../common/Button';
import SidebarItem from '../ui/SidebarItem';
import { useLocation } from 'react-router';
import { PATHS } from '../../paths';

interface SidebarProps {
  isSidebarOpen: boolean;
  closeMethod: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isSidebarOpen, closeMethod }) => {
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

  const handleButtonClick = () => {
    setExpandedSection(null);
    closeMethod();
  };

  return (
    <>
      <aside className={`shrink-0 w-70 px-4 flex flex-col py-8 transition-[margin] overflow-hidden ${isSidebarOpen ? 'ml-0' : '-ml-70'} md:ml-0 z-50 bg-neutral-900`}>
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
          <Button 
            iType='link'
            label='Register'
            iconName='plus'
            primary={true}
            clickMethod={handleButtonClick}
            link={`/${PATHS.auth.root}/${PATHS.auth.register}`}
          />
          
          <Button
            iType='link'
            label='Log In'
            iconName='log-in'
            primary={false}
            clickMethod={handleButtonClick}
            link={`/${PATHS.auth.root}/${PATHS.auth.login}`}
          />
        </div>
      </aside>
      <div className={`bg-black/50 w-dvw h-dvh fixed inset-0 z-40 ${isSidebarOpen ? 'block' : 'hidden'} md:hidden`} onClick={closeMethod}></div>
    </>
  )
};

export default Sidebar;