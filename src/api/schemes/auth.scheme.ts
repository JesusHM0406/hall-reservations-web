import { z } from 'zod';

export const registerScheme = z
  .object({
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
  })
  .refine((data) => data.password === data.passwordConfirm, {
    error: 'The passwords do not match',
    path: ['passwordConfirm']
  });

export type RegisterFormData = z.infer<typeof registerScheme>;

export const loginRequestScheme = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, 'The name must contain at least 3 characters')
      .max(30, 'The name cannot contain more than 30 characters'),
    password: z
      .string()
      .min(8, 'The password must contain at least 8 characters')
      .max(72, 'The password cannot contain more than 72 characters')
      .regex(/[A-Z]/, 'Must contain at least one capital letter')
      .regex(/[0-9]/, 'Must contain at least one number')
  });

export type LoginFormData = z.infer<typeof loginRequestScheme>;

export const loginResponseScheme = z
  .object({
    access_token: z.string(),
    token_type: z.literal('bearer')
  });