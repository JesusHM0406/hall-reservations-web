import { ChevronRight } from 'lucide-react';
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import type { FC } from 'react';
import type { OptionsConfig } from '../../config/sidebar-config';
import { NavLink } from 'react-router';

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
}

type SidebarItemProps = SimpleItemProps | ExpandableItemProps;

const SidebarItem: FC<SidebarItemProps> = (props: SidebarItemProps) => {
  const { sectionLabel, iconName, sectionMethod, isSectionActive, rootPath }: BaseItemProps = props
  
  if (props.type === 'expandable') {
    const { isExpanded, options }: ExpandableItemProps = props

    return (
      <div className='flex flex-col mb-3'>
        <button className={`text-start p-0.5 cursor-pointer flex items-center gap-2 transition-colors duration-100 ${isSectionActive ? 'text-white' : 'text-slate-400'}`} onClick={sectionMethod}>
          <DynamicIcon name={iconName} size={18} />
          <span className='grow font-bold'>{sectionLabel}</span>
          <ChevronRight size={18} className={`transition-transform duration-150 ${isExpanded ? 'rotate-90' : ''}`} />
        </button>
        <div className={`mt-0.5 grid transition-[grid-template-rows] duration-150 grid-rows-[0fr] ${isExpanded ? 'grid-rows-[1fr]' : ''}`}>
          <div className='overflow-hidden flex flex-col gap-1'>
            {options.map((option, index) => {
              return (
                <button
                  key={index}
                  className='cursor-pointer ml-8 px-0.5 text-start text-slate-400'
                >
                  <NavLink className={({ isActive }) => isActive ? 'text-white' : ''} to={`/${rootPath}/${option.path}`} >
                    {option.label}
                  </NavLink>
                </button>
              )
              })}
          </div>
        </div>
      </div>
    );
  }

  // If is not 'expandable' then it is necessarily 'simple'
  return (
    <button className='cursor-pointer p-0.5 text-slate-400' onClick={sectionMethod}>
      <NavLink className={({ isActive }) => `flex text-start items-center gap-2 ${isActive ? 'text-white' : ''}`} to={`/${rootPath}`}>
        <DynamicIcon name={iconName} size={18} />
        <span className='grow font-bold'>{sectionLabel}</span>
      </NavLink>
    </button>
  );
}

export default SidebarItem; 