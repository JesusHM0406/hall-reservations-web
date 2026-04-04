import { apiRequest } from '../axios';
import { API_ENDPOINTS } from '../endpoints';
import { type UserAdminUpdate, type UserPaginationParams, type UserUpdate } from '../schemas/user.schemas';

export const userService = {
  async getCurrent() {
    return await apiRequest(API_ENDPOINTS.USERS.READ_CURRENT());
  },

  async getAll(filters: UserPaginationParams, controller?: AbortController) {
    return await apiRequest(
      API_ENDPOINTS.USERS.ALL(filters),
      {
        signal: controller?.signal
      }
    );
  },

  async deleteCurrent() {
    await apiRequest(API_ENDPOINTS.USERS.DELETE_CURRENT());
  },

  async updateCurrent(payload: UserUpdate) {
    await apiRequest(API_ENDPOINTS.USERS.UPDATE_CURRENT(payload));
  },

  async byId(id: number | string) {
    return await apiRequest(API_ENDPOINTS.USERS.BY_ID(id));
  },

  async update(id: string | number, payload: UserAdminUpdate) {
    await apiRequest(API_ENDPOINTS.USERS.UPDATE(id, payload));
  },

  async delete(id: string | number) {
    await apiRequest(API_ENDPOINTS.USERS.DELETE(id));
  },

  async restore(id: string | number, newName: UserUpdate) {
    await apiRequest(API_ENDPOINTS.USERS.RESTORE(id, newName));
  }
};