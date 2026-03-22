import { apiRequest } from '../axios';
import { API_ENDPOINTS } from '../endpoints';

export const userService = {
  async getCurrent() {
    return await apiRequest(API_ENDPOINTS.USERS.READ_CURRENT());
  }
};