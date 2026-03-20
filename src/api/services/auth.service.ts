import { apiRequest } from "../axios"
import { API_ENDPOINTS } from "../endpoints";
import { parseAPIResponse } from "../parseAPIResponse";
import { loginResponseScheme, type LoginFormData } from "../schemes/auth.scheme";
import type { UserCreate } from "../schemes/user.scheme";

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

    const parsedData = parseAPIResponse(loginResponseScheme, rawData);

    return parsedData;
  }
};