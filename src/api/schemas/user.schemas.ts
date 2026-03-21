import { z } from 'zod';

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
  passwordConfirm: z.string()
}).refine((data) => data.password === data.passwordConfirm, {
  error: 'The passwords do not match',
  path: ['passwordConfirm']
});

export type User = z.infer<typeof userSchema>;
export type UserCreate = z.infer<typeof userCreateSchema>;