import { type IconName } from 'lucide-react/dynamic';
import { PATHS } from '../paths';

interface SimpleItemConfig {
  type: 'simple';
  sectionLabel: string;
  iconName: IconName;
  rootPath: string;
}

interface ExpandableItemConfig {
  type: 'expandable';
  options: OptionsConfig[];
  sectionLabel: string;
  iconName: IconName;
  rootPath: string;
}

type ItemConfig = SimpleItemConfig | ExpandableItemConfig;

interface OptionsConfig {
  label: string;
  path: string;
}

const HALL_OPTIONS: OptionsConfig[] = [
  { label: 'Search Halls', path: PATHS.halls.search },
  { label: 'All Halls', path: PATHS.halls.all },
  { label: 'New Hall', path: PATHS.halls.new },
  { label: 'Update Hall', path: PATHS.halls.update }
];

const RESERVATION_OPTIONS: OptionsConfig[] = [
  { label: 'New Reservation', path: PATHS.reservations.new },
  { label: 'My Reservations', path: PATHS.reservations.me },
  { label: 'All Reservations', path: PATHS.reservations.all },
  { label: 'By ID', path: PATHS.reservations.byId }
];

const USERS_OPTIONS: OptionsConfig[] = [
  { label: 'All Users', path: PATHS.users.all },
  { label: 'Update User', path: PATHS.users.update },
  { label: 'Delete User', path: PATHS.users.delete },
  { label: 'Restore User', path: PATHS.users.restore },
  { label: 'By ID', path: PATHS.users.byId }
];

const SIDEBAR_ITEMS: ItemConfig[] = [
  {
    type: 'expandable',
    sectionLabel: 'Halls',
    iconName: 'house',
    rootPath: PATHS.halls.root,
    options: HALL_OPTIONS
  },
  {
    type: 'expandable',
    sectionLabel: 'Reservations',
    iconName: 'calendar',
    rootPath: PATHS.reservations.root,
    options: RESERVATION_OPTIONS
  },
  {
    type: 'expandable',
    sectionLabel: 'Users',
    iconName: 'users',
    rootPath: PATHS.users.root,
    options: USERS_OPTIONS
  },
  {
    type: 'simple',
    sectionLabel: 'My Account',
    iconName: 'user',
    rootPath: PATHS.myAccount
  }
];

export { SIDEBAR_ITEMS, type OptionsConfig };