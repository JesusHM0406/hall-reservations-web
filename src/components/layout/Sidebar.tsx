import { useState } from 'react';
import { SIDEBAR_ITEMS } from '../../config/sidebar-config';
import Button from '../common/Button';
import SidebarItem from '../ui/SidebarItem';

const Sidebar = () => {
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
  };

  const handleOptClick = (optLabel: string, sectionLabel: string) => {
    setActiveOpt(optLabel + sectionLabel);
    setActiveSection(sectionLabel);
  };

  const handleButtonClick = () => {
    setActiveOpt(null);
    setActiveSection(null);
    setExpandedSection(null);
  };

  return (
    <>
      <aside className='bg-neutral-900 w-70 h-dvh flex flex-col px-4'>
        <div className='grow mt-7'>
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
        <div className='flex flex-col gap-4 items-center mb-10'>
          <Button label='Register' iconName='plus' primary={true} clickMethod={handleButtonClick} />
          <Button label='Log In' iconName='log-in' primary={false} clickMethod={handleButtonClick} />
        </div>
      </aside>
    </>
  )
};

export default Sidebar;