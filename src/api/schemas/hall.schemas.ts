import { z } from 'zod';
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
    .min(5, 'The hall name must contain at least 5 characters.')
    .max(100, 'The hall name cannot contain more than 100 characters.'),
  description: z
    .string()
    .trim()
    .min(20, 'The hall description must contain at least 20 characters.')
    .max(1000, 'The description is too long, summarize the details.'),
  is_available: z.boolean()
});

export const hallUpdateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, 'The hall name must contain at least 5 characters.')
    .max(100, 'The hall name cannot contain more than 100 characters.')
    .optional()
    .or(z.literal('')),
  description: z
    .string()
    .trim()
    .min(20, 'The hall description must contain at least 20 characters.')
    .max(1000, 'The description is too long, summarize the details.')
    .optional()
    .or(z.literal('')),
  is_available: z.boolean().optional()
});

export const hallPaginationSchema = createPaginatedSchema(hallSchema);

export const hallPreviewSchema = z.object({
  id: z.number(),
  name: z.string().transform((val) => val.trim().length > 0 ? val : 'Anonymous'),
  is_available: z.boolean(),
  preview: z.string()
});

export const hallSearchResponseSchema = z.array(hallPreviewSchema);

export type Hall = z.infer<typeof hallSchema>;
export type HallCreate = z.infer<typeof hallCreateSchema>;
export type HallUpdate = z.infer<typeof hallUpdateSchema>;
export type HallSearchResponse = z.infer<typeof hallSearchResponseSchema>;
export type HallPreview = z.infer<typeof hallPreviewSchema>;

export type HallPagination = z.infer<typeof hallPaginationSchema>;

export const hallAvailabilityFilterEnum = z.enum(['available', 'unavailable', 'all'])

export type HallAvailabilityFilter = z.infer<typeof hallAvailabilityFilterEnum>;

export interface HallPaginationParams {
  page?: number;
  status?: HallAvailabilityFilter;
}

export type HallSearchParams = { q: string }
