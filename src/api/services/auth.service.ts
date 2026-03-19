import { apiClient } from "../axios"
import type { LoginFormData, RegisterFormData } from "../schemes/auth.scheme";

const authService = {
  async register(creation: RegisterFormData) {
    await apiClient.post('users/', {
      name: creation.name,
      password: creation.password,
      password_confirm: creation.passwordConfirm
    });
  },

  async login(loginData: LoginFormData) {
    const { data } = await apiClient.post('auth/login', loginData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return data;
  }
};

export { authService };