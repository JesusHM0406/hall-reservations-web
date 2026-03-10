import { type IconName } from 'lucide-react/dynamic';

type SimpleItemConfig = {
  type: 'simple';
  sectionLabel: string;
  iconName: IconName;
}

type ExpandableItemConfig = {
  type: 'expandable';
  sectionLabel: string;
  iconName: IconName;
  optLabels: string[];
}

type ItemConfig = SimpleItemConfig | ExpandableItemConfig

export const SIDEBAR_ITEMS: ItemConfig[] = [
  { type: 'expandable', sectionLabel: 'Halls', iconName: 'house', optLabels: ['Search Halls', 'All Halls', 'New Hall', 'Update Hall'] },
  { type: 'expandable', sectionLabel: 'Reservations', iconName: 'calendar', optLabels: ['New Reservation', 'My Reservations', 'All Reservations', 'By ID'] },
  { type: 'expandable', sectionLabel: 'Users', iconName: 'users', optLabels: ['By ID', 'All Users', 'Update User', 'Delete User'] },
  { type: 'simple', sectionLabel: 'My Account', iconName: 'user' }
];