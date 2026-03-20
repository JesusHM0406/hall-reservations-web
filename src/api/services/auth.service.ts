import { apiClient, apiRequest } from "../axios"
import { API_ENDPOINTS } from "../endpoints";
import { loginResponseScheme, type LoginFormData, type RegisterFormData } from "../schemes/auth.scheme";

export const authService = {
  async register(creation: RegisterFormData) {
    await apiClient.post('users/', {
      name: creation.name,
      password: creation.password,
      password_confirm: creation.passwordConfirm
    });
  },

  async login(loginData: LoginFormData) {
    const rawData = await apiRequest(API_ENDPOINTS.AUTH.LOGIN, {
      data: loginData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const parsedData = loginResponseScheme.safeParse(rawData);

    if (!parsedData.success) throw new Error('Error loading data: API format has changed');

    return parsedData.data;
  }
};