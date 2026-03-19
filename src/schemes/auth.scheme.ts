import { z } from 'zod';

const registerScheme = z
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

type RegisterFormData = z.infer<typeof registerScheme>;

const loginScheme = z
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

type LoginFormData = z.infer<typeof loginScheme>;

export { registerScheme, loginScheme };
export type { RegisterFormData, LoginFormData };