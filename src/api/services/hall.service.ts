import { apiRequest } from '../axios';
import { API_ENDPOINTS } from '../endpoints';
import type { HallCreate, HallPaginationParams, HallSearchParams, HallUpdate } from '../schemas/hall.schemas';

export const hallService = {
  async create(payload: HallCreate) {
    await apiRequest(API_ENDPOINTS.HALLS.ADD(payload));
  },

  async all(filters: HallPaginationParams, controller?: AbortController) {
    return await apiRequest(
      API_ENDPOINTS.HALLS.ALL(filters),
      { signal: controller?.signal }
    );
  },

  async byId(id: number | string, controller?: AbortController) {
    return await apiRequest(
      API_ENDPOINTS.HALLS.BY_ID(id),
      { signal: controller?.signal }
    );
  },

  async search(params: HallSearchParams, controller?: AbortController) {
    return await apiRequest(
      API_ENDPOINTS.HALLS.SEARCH(params),
      { signal: controller?.signal }
    );
  },

  async update(id: number | string, payload: HallUpdate) {
    await apiRequest(API_ENDPOINTS.HALLS.UPDATE(id, payload));
  }
};
