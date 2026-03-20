import z from 'zod';

const userRoles = ['user', 'admin', 'superadmin'] as const;

const _userRolesEnum = z.enum(userRoles);

export type UserRole = z.infer<typeof _userRolesEnum>;

export const userScheme = z.object({
  id: z.number(),
  name: z.string().min(3),
  role: z.enum(userRoles),
  is_active: z.boolean(),
  is_deleted: z.boolean()
});

export type User = z.infer<typeof userScheme>;