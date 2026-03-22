import { z } from 'zod';
import { createPaginatedSchema } from './common.schemas';

const userRoles = ['user', 'admin', 'superadmin'] as const;

const _userRolesEnum = z.enum(userRoles);

export type UserRole = z.infer<typeof _userRolesEnum>;

export const userSchema = z.object({
  id: z.number(),
  name: z.string().min(3),
  role: z.enum(userRoles),
  is_active: z.boolean(),
  is_deleted: z.boolean()
});

export const userCreateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'The name must contain at least 3 characters')
    .max(30, 'The name cannot contain more than 30 characters'),
  password: z
    .string()
    .trim()
    .min(8, 'The password must contain at least 8 characters')
    .max(72, 'The password cannot contain more than 72 characters')
    .regex(/[A-Z]/, 'Must contain at least one capital letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
  password_confirm: z.string()
}).refine((data) => data.password === data.password_confirm, {
  error: 'The passwords do not match',
  path: ['password_confirm']
});

export const userUpdateSchema = z.object({
  name: z
  .string()
  .trim()
  .min(3, 'The name must contain at least 3 characters.')
  .max(30, 'The name cannot contain more than 30 characters.')
});

export const userAdminUpdateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'The name must contain at least 3 characters.')
    .max(30, 'The name cannot contain more than 30 characters.')
    .optional()
    .or(z.literal('')),
  role: z.enum(userRoles, `The user's new role must be one of these options: ${userRoles.slice(0, -1).join(', ')} or ${userRoles.slice(-1)}.`
  ).optional(),
  is_active: z.boolean().optional()
});

export const userPaginationSchema = createPaginatedSchema(userSchema);

export type User = z.infer<typeof userSchema>;
export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;
export type UserAdminUpdate = z.infer<typeof userAdminUpdateSchema>;

export type UserPagination = z.infer<typeof userPaginationSchema>;
export type UserRoleFilter = 'user' | 'admin' | 'superadmin' | 'all';
export type UserStatusFilter = 'active' | 'inactive' | 'deleted' | 'not_deleted' | 'all';

export interface UserPaginationParams {
  page?: number;
  role?: UserRoleFilter;
  status?: UserStatusFilter;
}