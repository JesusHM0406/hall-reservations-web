import axios, { isAxiosError, type AxiosRequestConfig } from 'axios';
import { router } from '@/router';
import { PATHS } from '@/paths';
import { parseAPIResponse, ZodParseError } from './parseAPIResponse';
import type { Endpoint } from './types';

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

export const apiRequest = async <TResponse = undefined, TParams = undefined, TData = undefined>(
  endpoint: Endpoint<TResponse, TParams, TData>,
  config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data' | 'params'>
) => {
  const { data } = await apiClient({
    url: endpoint.path,
    method: endpoint.method,
    params: endpoint.params,
    data: endpoint.data,
    ...config
  });

  if (endpoint.schema) {
    return parseAPIResponse(endpoint.schema, data);
  }

  return data as TResponse;
};

export const getErrorMessage = (error: unknown) => {
  if (axios.isCancel(error)) return;

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
