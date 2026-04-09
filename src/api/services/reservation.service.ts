import { apiRequest } from '../axios';
import { API_ENDPOINTS } from '../endpoints';
import type { ReservationCreate, ReservationPaginationParams } from '../schemas/reservation.schemas';

export const reservationService = {
  async create(payload: ReservationCreate) {
    await apiRequest(API_ENDPOINTS.RESERVATIONS.ADD(payload));
  },

  async all(filters: ReservationPaginationParams, controller?: AbortController) {
    return await apiRequest(
      API_ENDPOINTS.RESERVATIONS.ALL(filters),
      { signal: controller?.signal }
    );
  },

  async allCurrentUser(filters: ReservationPaginationParams, controller?: AbortController) {
    return await apiRequest(
      API_ENDPOINTS.RESERVATIONS.ALL_CURRENT_USER(filters),
      { signal: controller?.signal }
    );
  },

  async byId(id: number | string) {
    return await apiRequest(API_ENDPOINTS.RESERVATIONS.BY_ID(id));
  },

  async cancel(id: number | string) {
    await apiRequest(API_ENDPOINTS.RESERVATIONS.CANCEL(id));
  },

  async finish(id: number | string) {
    await apiRequest(API_ENDPOINTS.RESERVATIONS.FINISH(id));
  }
};