import type { CustomSelectItem } from '@/components/common/CustomSelect';
import { userRoleFilterEnum, userStatusFilterEnum, type User, type UserRole, type UserRoleFilter, type UserStatusFilter } from '@/api/schemas/user.schemas';

const USER_ROLE_MAP: Record<UserRoleFilter, CustomSelectItem<UserRoleFilter>> = {
  [userRoleFilterEnum.enum.all]: {
    value: 'all',
    label: 'All'
  },
  [userRoleFilterEnum.enum.user]: {
    value: 'user',
    label: 'User'
  },
  [userRoleFilterEnum.enum.admin]: {
    value: 'admin',
    label: 'Admin'
  },
  [userRoleFilterEnum.enum.superadmin]: {
    value: 'superadmin',
    label: 'Superadmin'
  }
};

export const USER_ROLE_FILTER_ITEMS = Object.values(USER_ROLE_MAP);

const USER_STATUS_MAP: Record<UserStatusFilter, CustomSelectItem<UserStatusFilter>> = {
  [userStatusFilterEnum.enum.all]: {
    value: 'all',
    label: 'All'
  },
  [userStatusFilterEnum.enum.active]: {
    value: 'active',
    label: 'Active'
  },
  [userStatusFilterEnum.enum.inactive]: {
    value: 'inactive',
    label: 'Inactive'
  },
  [userStatusFilterEnum.enum.deleted]: {
    value: 'deleted',
    label: 'Deleted'
  },
  [userStatusFilterEnum.enum.not_deleted]: {
    value: 'not_deleted',
    label: 'Not deleted'
  }
};

export const USER_STATUS_FILTER_ITEMS = Object.values(USER_STATUS_MAP);

export const USER_ROLE_UPDATE_MAP: Record<UserRole, CustomSelectItem<UserRole>> = {
  'user': {
    value: 'user',
    label: 'User'
  },
  'admin': {
    value: 'admin',
    label: 'Admin'
  },
  'superadmin': {
    value: 'superadmin',
    label: 'Superadmin'
  }
};

export const USER_ROLE_OPTIONS_ITEMS = Object.values(USER_ROLE_UPDATE_MAP);

export type UserActions =
  | { type: 'update', user: User, triggerId: string }
  | { type: 'restore', user: User, triggerId: string }
  | { type: 'delete', user: User, triggerId: string }
  | null;