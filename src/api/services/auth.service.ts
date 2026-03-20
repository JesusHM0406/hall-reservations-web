import { apiClient, apiRequest } from "../axios"
import { API_ENDPOINTS } from "../endpoints";
import { parseAPIResponse } from "../parseAPIResponse";
import { loginResponseScheme, type LoginFormData, type RegisterFormData } from "../schemes/auth.scheme";

export const authService = {
  async register(creation: RegisterFormData) {
    await apiClient.post('users/', {
      name: creation.name,
      password: creation.password,
      password_confirm: creation.passwordConfirm
    });
  },

  async logIn(loginData: LoginFormData) {
    const rawData = await apiRequest(API_ENDPOINTS.AUTH.LOGIN, {
      data: loginData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const parsedData = parseAPIResponse(loginResponseScheme, rawData);

    return parsedData;
  }
};