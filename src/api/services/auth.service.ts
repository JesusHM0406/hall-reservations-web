import { apiRequest } from '../axios';
import { API_ENDPOINTS } from '../endpoints';
import { type LoginFormData } from '../schemas/auth.schemas';
import type { UserCreate } from '../schemas/user.schemas';

export const authService = {
  async register(payload: UserCreate) {
    await apiRequest(API_ENDPOINTS.USERS.ADD(payload));
  },

  async logIn(payload: LoginFormData) {
    const dataToSend = new URLSearchParams({ username: payload.username, password: payload.password });

    const data = await apiRequest(API_ENDPOINTS.AUTH.LOGIN(dataToSend), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    return data;
  }
};