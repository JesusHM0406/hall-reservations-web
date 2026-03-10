import { type IconName } from "lucide-react/dynamic";

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
  { type: 'expandable', sectionLabel: 'Search Halls', iconName: 'book-search', optLabels: ['By ID', 'Advanced Search'] },
  { type: 'expandable', sectionLabel: 'Reservations', iconName: 'calendar', optLabels: ['New Reservation', 'My Reservations', 'All Reservations', 'By ID'] },
  { type: 'expandable', sectionLabel: 'Users', iconName: 'users', optLabels: ['By ID', 'All Users', 'Update User', 'Delete User'] },
  { type: 'expandable', sectionLabel: 'Manage Halls', iconName: 'wrench', optLabels: ['New Hall', 'Update Hall'] },
  { type: 'simple', sectionLabel: 'My Account', iconName: 'user' }
];