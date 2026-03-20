import { z } from 'zod';

export const loginRequestScheme = z.object({
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

export const loginResponseScheme = z.object({
  access_token: z.string(),
  token_type: z.literal('bearer')
});

export type LoginFormData = z.infer<typeof loginRequestScheme>;
export type LoginResponse = z.infer<typeof loginResponseScheme>;