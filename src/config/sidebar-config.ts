import { type IconName } from 'lucide-react/dynamic';
import { PATHS } from '@/paths';
import type { UserRole } from '@/api/schemas/user.schemas';

export type ExpandableOptItem = { label: string; path: string };

interface BaseOpt {
  sectionLabel: string;
  iconName: IconName;
  rootPath: string;
  allowTo: 'auth' | 'any' | UserRole[];
}

interface SimpleOpt extends BaseOpt {
  type: 'simple';
}

interface ExpandableOpt extends BaseOpt {
  type: 'expandable';
  items: ExpandableOptItem[];
}

const hallOptItems: ExpandableOptItem[] = [
  { label: 'Search', path: PATHS.halls.search },
  { label: 'Explore', path: PATHS.halls.explore }
];

type ItemConfig = SimpleOpt | ExpandableOpt;

export const SIDEBAR_ITEMS: ItemConfig[] = [
  {
    type: 'expandable',
    sectionLabel: 'Halls',
    iconName: 'house',
    rootPath: PATHS.halls.root,
    items: hallOptItems,
    allowTo: 'any'
  },
  {
    type: 'simple',
    sectionLabel: 'Reservations',
    iconName: 'calendar',
    rootPath: PATHS.reservations,
    allowTo: 'auth'
  },
  {
    type: 'simple',
    sectionLabel: 'Users',
    iconName: 'users',
    rootPath: PATHS.users,
    allowTo: ['admin', 'superadmin']
  },
  {
    type: 'simple',
    sectionLabel: 'My Account',
    iconName: 'user',
    rootPath: PATHS.myAccount,
    allowTo: 'auth'
  }
];