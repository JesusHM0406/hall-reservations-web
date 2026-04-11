import type { Reservation } from '@/api/schemas/reservation.schemas';

export type ResAction =
  | { type: 'userInfo', res: Reservation, triggerId: string }
  | { type: 'finish', res: Reservation, triggerId: string }
  | { type: 'cancel', res: Reservation, triggerId: string }
  | null;