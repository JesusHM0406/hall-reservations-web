import type { CustomSelectItem } from '@/components/common/CustomSelect';
import { hallAvailabilityFilterEnum, type HallAvailabilityFilter } from '@/api/schemas/hall.schemas';

const HALL_AVAILABILITY_MAP: Record<HallAvailabilityFilter, CustomSelectItem<HallAvailabilityFilter>> = {
  [hallAvailabilityFilterEnum.enum.all]: {
    value: 'all',
    label: 'All'
  },
  [hallAvailabilityFilterEnum.enum.available]: {
    value: 'available',
    label: 'Available'
  },
  [hallAvailabilityFilterEnum.enum.unavailable]: {
    value: 'unavailable',
    label: 'Unavailable'
  }
};

export const HALL_AVAILABILITY_FILTER_ITEMS = Object.values(HALL_AVAILABILITY_MAP);