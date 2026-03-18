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

export { apiClient };