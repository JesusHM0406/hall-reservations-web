import { apiRequest } from "../axios"
import { API_ENDPOINTS } from "../endpoints";
import { parseAPIResponse } from "../parseAPIResponse";
import { loginResponseSchema, type LoginFormData } from "../schemas/auth.schema";
import type { UserCreate } from "../schemas/user.schema";

export const authService = {
  async register(payload: UserCreate) {
    await apiRequest(API_ENDPOINTS.USERS.ADD, {
      data: {
        name: payload.name,
        password: payload.password,
        password_confirm: payload.passwordConfirm
      }
    });
  },

  async logIn(payload: LoginFormData) {
    const dataToSend = new URLSearchParams({ username: payload.username, password: payload.password });

    const rawData = await apiRequest(API_ENDPOINTS.AUTH.LOGIN, {
      data: dataToSend,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const parsedData = parseAPIResponse(loginResponseSchema, rawData);

    return parsedData;
  }
};