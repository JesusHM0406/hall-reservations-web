import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import { NavLink } from 'react-router';
import { ICON_SIZE } from '../../constants/ui.constants';

interface SidebarItemProps {
  sectionLabel: string;
  iconName: IconName;
  sectionMethod: () => void;
  rootPath: string;
}

const SidebarItem = ({ sectionLabel, iconName, sectionMethod, rootPath }: SidebarItemProps) => {
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