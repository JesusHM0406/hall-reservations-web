import { apiRequest } from '../axios'
import { API_ENDPOINTS } from '../endpoints';
import type { HallCreate, HallPaginationParams, HallSearchParams, HallUpdate } from '../schemas/hall.schemas';

export const hallService = {
  async create(payload: HallCreate) {
    await apiRequest(API_ENDPOINTS.HALLS.ADD(payload));
  },

  async all(filters: HallPaginationParams) {
    return await apiRequest(API_ENDPOINTS.HALLS.ALL(filters));
  },

  async byId(id: number | string) {
    return await apiRequest(API_ENDPOINTS.HALLS.BY_ID(id));
  },

  async search(params: HallSearchParams) {
    await apiRequest(API_ENDPOINTS.HALLS.SEARCH(params));
  },

  async update(id: number | string, payload: HallUpdate) {
    await apiRequest(API_ENDPOINTS.HALLS.UPDATE(id, payload));
  }
}