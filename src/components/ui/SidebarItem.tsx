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
        <button className={`text-start p-0.5 cursor-pointer flex items-center gap-2 transition-colors duration-150 ${isSectionActive ? 'text-white' : 'text-inactive'}`} onClick={sectionMethod}>
          <DynamicIcon name={iconName} size={ICON_SIZE.MD} />
          <span className='grow font-bold'>{sectionLabel}</span>
          <ChevronRight size={ICON_SIZE.MD} className={`transition-transform duration-150 ${isExpanded ? 'rotate-90' : ''}`} />
        </button>
        <div className={`mt-0.5 grid transition-[grid-template-rows] duration-150 grid-rows-[0fr] ${isExpanded ? 'grid-rows-[1fr]' : ''}`}>
          <div className='overflow-hidden flex flex-col gap-1'>
            {options.map(option => {
              return (
                <NavLink
                  key={`/${rootPath}/${option.path}`}
                  to={`/${rootPath}/${option.path}`}
                  className={({ isActive }) => {
                    return `cursor-pointer ml-8 px-0.5 text-start text-inactive ${isActive ? 'text-white' : ''}`
                  }}
                  onClick={closeSidebarMethod}
                >
                  {option.label}
                </NavLink>
              )
              })}
          </div>
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
      <DynamicIcon name={iconName} size={ICON_SIZE.MD} />
      <span className='grow font-bold'>{sectionLabel}</span>
    </NavLink>
  );
}

export default SidebarItem; 