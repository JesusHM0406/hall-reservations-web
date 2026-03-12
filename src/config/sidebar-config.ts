import { type IconName } from 'lucide-react/dynamic';

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
  { label: 'Search Halls', path: 'search' },
  { label: 'All Halls', path: 'all' },
  { label: 'New Hall', path: 'new' },
  { label: 'Update Hall', path: 'update' }
];

const RESERVATION_OPTIONS: OptionsConfig[] = [
  { label: 'New Reservation', path: 'new' },
  { label: 'My Reservations', path: 'reservations' },
  { label: 'All Reservations', path: 'all' },
  { label: 'By ID', path: 'by-id' }
];

const USERS_OPTIONS: OptionsConfig[] = [
  { label: 'All Users', path: 'all' },
  { label: 'Update User', path: 'update' },
  { label: 'Delete User', path: 'delete' },
  { label: 'By ID', path: 'by-id' }
];

const SIDEBAR_ITEMS: ItemConfig[] = [
  {
    type: 'expandable',
    sectionLabel: 'Halls',
    iconName: 'house',
    rootPath: 'halls',
    options: HALL_OPTIONS
  },
  {
    type: 'expandable',
    sectionLabel: 'Reservations',
    iconName: 'calendar',
    rootPath: 'reservations',
    options: RESERVATION_OPTIONS
  },
  {
    type: 'expandable',
    sectionLabel: 'Users',
    iconName: 'users',
    rootPath: 'users',
    options: USERS_OPTIONS
  },
  {
    type: 'simple',
    sectionLabel: 'My Account',
    iconName: 'user',
    rootPath: 'my-account'
  }
];

export { SIDEBAR_ITEMS, type OptionsConfig };