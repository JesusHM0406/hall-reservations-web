import { z } from 'zod';

export const createPaginatedSchema = <T>(itemSchema: z.ZodType<T>) => {
  return z.object({
    items: z.array(itemSchema),
    total: z.number(),
    requested_page: z.number(),
    per_page: z.number(),
    pages: z.number(),
    current_page: z.number(),
    has_prev: z.boolean(),
    has_next: z.boolean()
  })
};