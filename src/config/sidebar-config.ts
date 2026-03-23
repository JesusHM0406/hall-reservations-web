import { type IconName } from 'lucide-react/dynamic';
import { PATHS } from '@/paths';

interface ItemConfig {
  sectionLabel: string;
  iconName: IconName;
  rootPath: string;
}

const SIDEBAR_ITEMS: ItemConfig[] = [
  {
    sectionLabel: 'Halls',
    iconName: 'house',
    rootPath: PATHS.halls
  },
  {
    sectionLabel: 'Reservations',
    iconName: 'calendar',
    rootPath: PATHS.reservations
  },
  {
    sectionLabel: 'Users',
    iconName: 'users',
    rootPath: PATHS.users
  },
  {
    sectionLabel: 'My Account',
    iconName: 'user',
    rootPath: PATHS.myAccount
  }
];

export { SIDEBAR_ITEMS };