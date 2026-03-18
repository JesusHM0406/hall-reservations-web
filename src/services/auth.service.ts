import { apiClient } from "../lib/axios"
import type { RegisterFormData } from "../schemes/auth.scheme";

const authService = {
  async register(creation: RegisterFormData) {
    await apiClient.post('users/', {
      name: creation.name,
      password: creation.password,
      password_confirm: creation.passwordConfirm
    });
  }
};

export { authService };