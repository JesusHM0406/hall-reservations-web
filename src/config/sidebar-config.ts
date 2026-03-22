import { type IconName } from 'lucide-react/dynamic';
import { PATHS } from '../paths';

interface ItemConfig {
  type: 'simple';
  sectionLabel: string;
  iconName: IconName;
  rootPath: string;
}

const SIDEBAR_ITEMS: ItemConfig[] = [
  {
    type: 'simple',
    sectionLabel: 'Halls',
    iconName: 'house',
    rootPath: PATHS.halls
  },
  {
    type: 'simple',
    sectionLabel: 'Reservations',
    iconName: 'calendar',
    rootPath: PATHS.reservations
  },
  {
    type: 'simple',
    sectionLabel: 'Users',
    iconName: 'users',
    rootPath: PATHS.users
  },
  {
    type: 'simple',
    sectionLabel: 'My Account',
    iconName: 'user',
    rootPath: PATHS.myAccount
  }
];

export { SIDEBAR_ITEMS };