import type { Method } from "axios";

export interface RouteDef {
  path: string;
  method: Method;
}

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: { path: '/auth/login', method: 'POST' } as RouteDef
  },
  USERS: {
    ADD: { path: '/users/', method: 'POST' } as RouteDef,
    ALL: { path: '/users/', method: 'GET' } as RouteDef,
    READ_CURRENT: { path: '/users/me', method: 'GET' } as RouteDef,
    DELETE_CURRENT: { path: '/users/me', method: 'DELETE' } as RouteDef,
    UPDATE_CURRENT: { path: '/users/me', method: 'PATCH' } as RouteDef,
    BY_ID: (id: number | string): RouteDef =>  ({ path: `/users/${id}`, method: 'GET' }),
    UPDATE: (id: number | string): RouteDef => ({ path: `/users/${id}`, method: 'POST' }),
    DELETE: (id: number | string): RouteDef => ({ path: `/users/${id}`, method: 'DELETE' }),
    RESTORE: (id: number | string): RouteDef => ({ path: `/users/${id}`, method: 'PATCH' })
  },
  HALLS: {
    ADD: { path: '/halls/', method: 'POST' } as RouteDef,
    ALL: { path: '/halls/', method: 'GET' } as RouteDef,
    SEARCH: { path: `/halls/search`, method: 'GET' } as RouteDef,
    BY_ID: (id: number | string): RouteDef => ({ path: `/halls/${id}`, method: 'GET' }),
    UPDATE: (id: number | string): RouteDef => ({ path: `/halls/${id}`, method: 'PATCH' })
  },
  RESERVATIONS: {
    ADD: { path: '/reservations/', method: 'POST' } as RouteDef,
    ALL: { path: '/reservations/', method: 'GET' } as RouteDef,
    ALL_CURRENT_USER: { path: '/reservations/me', method: 'GET' } as RouteDef,
    BY_ID: (id: number | string): RouteDef => ({ path: `/reservations/${id}`, method: 'GET' }),
    FINISH: (id: number | string): RouteDef => ({ path: `/reservations/${id}/finish`, method: 'PATCH' }),
    CANCEL: (id: number | string): RouteDef => ({ path: `/reservations/${id}/cancel`, method: 'PATCH' })
  }
} as const;