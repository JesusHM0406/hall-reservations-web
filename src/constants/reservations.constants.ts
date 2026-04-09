import type {ReservationStatusFilter } from '@/api/schemas/reservation.schemas';
import type { CustomSelectItem } from '@/components/common/CustomSelect';

const RES_STATUS_MAP: Record<ReservationStatusFilter, CustomSelectItem<ReservationStatusFilter>> = {
  'all': {
    value: 'all',
    label: 'All'
  },
  'cancelled': {
    value: 'cancelled',
    label: 'Cancelled'
  },
  'confirmed': {
    value: 'confirmed',
    label: 'Confirmed'
  },
  'finished': {
    value: 'finished',
    label: 'Finished'
  }
};

export const RES_STATUS_FILTER_ITEMS = Object.values(RES_STATUS_MAP);