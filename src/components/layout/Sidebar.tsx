import { useState, type FC } from 'react';
import { SIDEBAR_ITEMS } from '../../config/sidebar-config';
import Button from '../common/Button';
import SidebarItem from '../ui/SidebarItem';

interface SidebarProps {
  isSidebarOpen: boolean;
  closeMethod: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isSidebarOpen, closeMethod }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string |null>(null);
  const [activeOpt, setActiveOpt] = useState<string | null>(null);

  const handleSectionClick = (sectionLabel: string, hasOptions: boolean) => {
    if (hasOptions) {
      setExpandedSection(expandedSection === sectionLabel ? null : sectionLabel);
      return;
    }

    setExpandedSection(null);
    setActiveOpt(null);
    setActiveSection(sectionLabel);
    closeMethod();
  };

  const handleOptClick = (optLabel: string, sectionLabel: string) => {
    setActiveOpt(optLabel + sectionLabel);
    setActiveSection(sectionLabel);
    closeMethod();
  };

  const handleButtonClick = () => {
    setActiveOpt(null);
    setActiveSection(null);
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
                  isActive={activeSection === item.sectionLabel}
                  sectionMethod={() => handleSectionClick(item.sectionLabel, true)}
                  isExpanded={expandedSection === item.sectionLabel}
                  optMethod={(optLabel: string) => handleOptClick(optLabel, item.sectionLabel)}
                  activeOpt={activeOpt}
                  key={item.sectionLabel}
                />
              )
            }

            return (
              <SidebarItem
                {...item}
                isActive={activeSection === item.sectionLabel}
                sectionMethod={() => handleSectionClick(item.sectionLabel, false)}
                key={item.sectionLabel}
              />
            )

          })}
        </div>
        <div className='flex flex-col gap-4 items-center'>
          <Button label='Register' iconName='plus' primary={true} clickMethod={handleButtonClick} />
          <Button label='Log In' iconName='log-in' primary={false} clickMethod={handleButtonClick} />
        </div>
      </aside>
      <div className={`bg-black/50 w-dvw h-dvh fixed inset-0 z-40 ${isSidebarOpen ? 'block' : 'hidden'} md:hidden`} onClick={closeMethod}></div>
    </>
  )
};

export default Sidebar;