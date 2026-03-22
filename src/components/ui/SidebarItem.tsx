import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
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

type SidebarItemProps = SimpleItemProps;

const SidebarItem = (props: SidebarItemProps) => {
  const { sectionLabel, iconName, sectionMethod, isSectionActive, rootPath }: BaseItemProps = props;

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