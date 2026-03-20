import axios, { isAxiosError, type AxiosRequestConfig } from 'axios';
import { router } from '../router';
import { PATHS } from '../paths';
import type { RouteDef } from './endpoints';
import { ZodParseError } from './parseAPIResponse';

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
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        router.navigate(`/${PATHS.auth.root}/${PATHS.auth.login}`);
      }
    }

    return Promise.reject(error);
  }
)

export const apiRequest = async (
  route: RouteDef,
  config?: AxiosRequestConfig
) => {
  const { data } = await apiClient({
    url: route.path,
    method: route.method,
    ...config
  });

  return data;
};

export const getErrorMessage = (error: unknown) => {
  if (error instanceof ZodParseError) return error.message;

  if (isAxiosError(error)) {
    const data = error.response?.data;

    // These are Pydantic-specific errors
    if (data?.detail && Array.isArray(data?.detail)) {
      return 'Validation error: Please ensure that the values ​​are correct.';
    }

    // These are the general API errors
    if (typeof data?.detail === 'string') {
      return data.detail;
    }
    
    return error.message || 'Network error.';
  }

  return 'Unexpected error';
};