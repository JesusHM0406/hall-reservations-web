import axios, { isAxiosError } from 'axios';
import { router } from '../router';
import { PATHS } from '../paths';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (isAxiosError(error)) {
      if (error.status === 401) {
        localStorage.removeItem('token');
        router.navigate(`${PATHS.auth.root}/${PATHS.auth.login}`);
      }
    }

    return Promise.reject(error);
  }
)

const getErrorMessage = (error: unknown) => {
  if (!(isAxiosError(error))) return 'Unexpected error';

  const data = error.response?.data;

  // This are Pydantic-specific errors
  if (data?.detail && Array.isArray(data?.detail)) {
    return 'Validation error: Please ensure that the values ​​are correct.';
  }

  // This are the general API errors
  if (typeof data?.detail === 'string') {
    return data.detail;
  }
  
  return error.message || 'Network error.';
}

export { apiClient, getErrorMessage };