import z from 'zod';
import { createPaginatedSchema } from './common.schemas';

export const hallSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  is_available: z.boolean()
});

export const hallCreateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'The hall name cannot be empty.')
    .max(255, 'The hall name cannot contain more than 255 characters.'),
  description: z
    .string()
    .trim()
    .min(1, 'The hall description cannot be empty.')
    .max(2500, 'The description is too long, summarize the details.'),
  is_available: z.boolean()
});

export const hallUpdateSchema = hallCreateSchema.partial();

export const hallPaginationSchema = createPaginatedSchema(hallSchema);

export const hallSearchResponseSchema = z.array(z.object({
  id: z.number(),
  name: z.string(),
  rank: z.number()
}));

export type Hall = z.infer<typeof hallSchema>;
export type HallCreate = z.infer<typeof hallCreateSchema>;
export type HallUpdate = z.infer<typeof hallUpdateSchema>;
export type HallSearchResponse = z.infer<typeof hallSearchResponseSchema>;

export type HallPagination = z.infer<typeof hallPaginationSchema>;
export type HallAvailabilityFilter = 'available' | 'unavailable' | 'all';

export interface HallPaginationParams {
  page?: number;
  status?: HallAvailabilityFilter;
}
export type HallSearchParams = { q: string }