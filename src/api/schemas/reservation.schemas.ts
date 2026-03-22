import z from 'zod';
import { createPaginatedSchema } from './common.schemas';

const reservationStatus = ['confirmed', 'cancelled', 'finished'] as const;

const _reservationStatusEnum = z.enum(reservationStatus);

export type ReservationStatus = z.infer<typeof _reservationStatusEnum>;

export const reservationSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  user_name: z.string(),
  hall_id: z.number(),
  hall_name: z.string(),
  status: z.enum(reservationStatus),
  reservation_date: z.iso.date()
});

export const reservationCreateSchema = z.object({
  hall_id: z.number().min(1, 'The hall id must be a number greater or equal to 1.'),
  reservation_date: z.iso.date('The date format is invalid.')
});

export const reservationPaginationSchema = createPaginatedSchema(reservationSchema);

export type Reservation = z.infer<typeof reservationSchema>;
export type ReservationCreate = z.infer<typeof reservationCreateSchema>;

export type ReservationPagination = z.infer<typeof reservationPaginationSchema>;

export interface ReservationPaginationParams {
  page?: number;
  user_name?: string;
  hall_name?: string;
  status?: ReservationStatus;
}