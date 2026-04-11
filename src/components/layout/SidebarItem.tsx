import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import { NavLink, useLocation } from 'react-router';
import { ICON_SIZE } from '@/constants/ui.constants';
import type { ExpandableOptItem } from '@/config/sidebar-config';
import { ChevronDown } from 'lucide-react';

interface BaseProps {
  sectionLabel: string;
  iconName: IconName;
  sectionMethod: () => void;
  rootPath: string;
}

interface SimpleItemProps extends BaseProps {
  type: 'simple';
}

interface ExpandableItemProps extends BaseProps {
  type: 'expandable';
  items: ExpandableOptItem[];
  isExpanded: boolean;
  closeMethod: () => void;
}

type SidebarItemProps = SimpleItemProps | ExpandableItemProps;

const SidebarItem = (props: SidebarItemProps) => {
  const { sectionLabel, iconName, sectionMethod, rootPath }: BaseProps = props;

  const location = useLocation();

  if (props.type === 'expandable') {
    const { items, isExpanded, closeMethod }: ExpandableItemProps = props;

    const path = location.pathname;

    const isOptActive = path.startsWith(`/${rootPath}`);

    return (
      <div>
        <button
          type='button'
          className={`cursor-pointer py-2 px-3 w-full rounded-md transition-colors hover:bg-inactive/15 flex text-start items-center gap-2 ${isOptActive ? 'text-white' : 'text-inactive'}`}
          onClick={sectionMethod}
          aria-controls={`${sectionLabel}-submenu`}
          aria-expanded={isExpanded}
          aria-label={`Open ${sectionLabel} sub menu`}
        >
          <DynamicIcon name={iconName} size={ICON_SIZE.MD} aria-hidden />
          <span className='grow font-bold'>{sectionLabel}</span>
          <ChevronDown size={ICON_SIZE.MD} className={`transition-transform ${isExpanded && 'rotate-180'}`} aria-hidden />
        </button>
        <div
          className={`grid transition-[grid-template-rows] ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
          id={`${sectionLabel}-submenu`}
        >
          <ul className='overflow-hidden'>
            {items.map((item) => {
              return (
                <li
                  key={`/${rootPath}/${item.path}`}
                  {...(isExpanded ? {} : { inert: true })}
                >
                  <NavLink
                    to={`/${rootPath}/${item.path}`}
                    className={({ isActive }) => {
                    return `cursor-pointer py-2 px-3 pl-9.5 rounded-md transition-colors hover:bg-inactive/15 text-inactive flex text-start items-center gap-2 ${isActive ? 'text-white' : ''}`}
                  }
                    onClick={closeMethod}
                  >
                    <span className='grow font-medium'>{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <NavLink
      to={`/${rootPath}`}
      className={({ isActive }) => `cursor-pointer py-2 px-3 rounded-md transition-colors hover:bg-inactive/15 text-inactive flex text-start items-center gap-2 ${isActive ? 'text-white' : ''}`}
      onClick={sectionMethod}
    >
      <DynamicIcon name={iconName} size={ICON_SIZE.MD} aria-hidden />
      <span className='grow font-bold'>{sectionLabel}</span>
    </NavLink>
  );
};

export default SidebarItem;