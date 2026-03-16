import { ChevronRight } from 'lucide-react';
import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import type { OptionsConfig } from '../../config/sidebar-config';
import { NavLink } from 'react-router';
import { ICON_SIZE } from '../../constants/ui.constants';

interface BaseItemProps {
  sectionLabel: string;
  iconName: IconName;
  sectionMethod: () => void;
  isSectionActive: boolean;
  rootPath: string;
}

interface SimpleItemProps extends BaseItemProps {
  type: 'simple';
}

interface ExpandableItemProps extends BaseItemProps {
  type: 'expandable';
  isExpanded: boolean;
  options: OptionsConfig[];
  closeSidebarMethod: () => void;
}

type SidebarItemProps = SimpleItemProps | ExpandableItemProps;

const SidebarItem = (props: SidebarItemProps) => {
  const { sectionLabel, iconName, sectionMethod, isSectionActive, rootPath }: BaseItemProps = props
  
  if (props.type === 'expandable') {
    const { isExpanded, options, closeSidebarMethod }: ExpandableItemProps = props

    return (
      <div className='flex flex-col mb-3'>
        <button 
          type='button' 
          className={`text-start p-0.5 cursor-pointer flex items-center gap-2 transition-colors duration-150 ${isSectionActive ? 'text-white' : 'text-inactive'}`} 
          onClick={sectionMethod} 
          aria-controls={`${sectionLabel}-submenu`} 
          aria-expanded={isExpanded} 
        >
          <DynamicIcon name={iconName} size={ICON_SIZE.MD} aria-hidden='true' />
          <span className='grow font-bold'>{sectionLabel}</span>
          <ChevronRight size={ICON_SIZE.MD} aria-hidden='true' className={`transition-transform duration-150 ${isExpanded ? 'rotate-90' : ''}`} />
        </button>
        <div className={`mt-0.5 grid transition-[grid-template-rows] duration-150 grid-rows-[0fr] ${isExpanded ? 'grid-rows-[1fr]' : ''}`}>
          <ul 
            className='overflow-hidden flex flex-col gap-1' 
            id={`${sectionLabel}-submenu`}
            aria-hidden={!isExpanded}
            {...(isExpanded ? {} : { inert: true })}
          >
            {options.map(option => {
              return (
                <li key={`/${rootPath}/${option.path}`}>
                  <NavLink 
                    to={`/${rootPath}/${option.path}`}
                    className={({ isActive }) => {
                      return `cursor-pointer ml-8 px-0.5 text-start text-inactive ${isActive ? 'text-white' : ''}`
                    }}
                    onClick={closeSidebarMethod}
                  >
                    {option.label}
                  </NavLink>
                </li>
              )
              })}
          </ul>
        </div>
      </div>
    );
  }

  // If is not 'expandable' then it is necessarily 'simple'
  return (
    <NavLink 
      to={`/${rootPath}`} 
      className={({ isActive }) => `cursor-pointer p-0.5 text-inactive flex text-start items-center gap-2 ${isActive ? 'text-white' : ''}`} 
      onClick={sectionMethod}
    >
      <DynamicIcon name={iconName} size={ICON_SIZE.MD} aria-hidden='true' />
      <span className='grow font-bold'>{sectionLabel}</span>
    </NavLink>
  );
};

export default SidebarItem; 