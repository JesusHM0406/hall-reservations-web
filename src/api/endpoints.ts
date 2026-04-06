import type { Endpoint } from './types';
import { userPaginationSchema, userReadSchema, userSchema, type User, type UserAdminUpdate, type UserCreate, type UserPagination, type UserPaginationParams, type UserRead, type UserUpdate } from './schemas/user.schemas';
import { hallPaginationSchema, hallSchema, hallSearchResponseSchema, type Hall, type HallCreate, type HallPagination, type HallPaginationParams, type HallSearchParams, type HallSearchResponse, type HallUpdate } from './schemas/hall.schemas';
import { reservationPaginationSchema, reservationSchema, type Reservation, type ReservationCreate, type ReservationPagination, type ReservationPaginationParams } from './schemas/reservation.schemas';
import { loginResponseSchema, type LoginResponse } from './schemas/auth.schemas';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: (payload: URLSearchParams): Endpoint<LoginResponse, undefined, URLSearchParams> => ({
      path: '/auth/login',
      method: 'POST',
      data: payload,
      schema: loginResponseSchema
    })
  },
  USERS: {
    // The data received for this endpoint is irrelevant
    ADD: (payload: UserCreate): Endpoint<undefined, undefined, UserCreate> => ({
      path: '/users/',
      method: 'POST',
      data: payload
    }),
    ALL: (params: UserPaginationParams): Endpoint<UserPagination, UserPaginationParams> => ({
      path: '/users/',
      method: 'GET',
      params,
      schema: userPaginationSchema
    }),
    READ_CURRENT: (): Endpoint<User> => ({
      path: '/users/me',
      method: 'GET',
      schema: userSchema
    }),
    DELETE_CURRENT: (): Endpoint => ({
      path: '/users/me',
      method: 'DELETE'
    }),
    UPDATE_CURRENT: (payload: UserUpdate): Endpoint<UserRead, undefined, UserUpdate> => ({
      path: '/users/me',
      method: 'PATCH',
      data: payload,
      schema: userReadSchema
    }),
    BY_ID:  (id: number | string): Endpoint<User> =>  ({
      path: `/users/${id}`,
      method: 'GET',
      schema: userSchema
    }),
    UPDATE: (id: number | string, payload: UserAdminUpdate): Endpoint<User, undefined, UserAdminUpdate> => ({
      path: `/users/${id}`,
      method: 'PATCH',
      data: payload,
      schema: userSchema
    }),
    DELETE: (id: number | string): Endpoint => ({
      path: `/users/${id}`,
      method: 'DELETE'
    }),
    RESTORE: (id: number | string, payload: UserUpdate): Endpoint<User, undefined, UserUpdate> => ({
      path: `/users/${id}/restore`,
      method: 'PATCH',
      data: payload,
      schema: userSchema
    })
  },
  HALLS: {
    ADD: (payload: HallCreate): Endpoint<Hall, undefined, HallCreate> => ({
      path: '/halls/',
      method: 'POST',
      data: payload,
      schema: hallSchema
    }),
    ALL: (params: HallPaginationParams): Endpoint<HallPagination, HallPaginationParams> => ({
      path: '/halls/',
      method: 'GET',
      params,
      schema: hallPaginationSchema
    }),
    SEARCH: (params: HallSearchParams): Endpoint<HallSearchResponse, HallSearchParams> => ({
      path: `/halls/search`,
      method: 'GET',
      params,
      schema: hallSearchResponseSchema
    }),
    BY_ID: (id: number | string): Endpoint<Hall> => ({
      path: `/halls/${id}`,
      method: 'GET',
      schema: hallSchema
    }),
    UPDATE: (id: number | string, payload: HallUpdate): Endpoint<Hall, undefined, HallUpdate> => ({
      path: `/halls/${id}`,
      method: 'PATCH',
      schema: hallSchema,
      data: payload
    })
  },
  RESERVATIONS: {
    ADD: (payload: ReservationCreate): Endpoint<Reservation, undefined, ReservationCreate> => ({
      path: '/reservations/',
      method: 'POST',
      data: payload,
      schema: reservationSchema
    }),
    ALL: (params: ReservationPaginationParams): Endpoint<ReservationPagination, ReservationPaginationParams> => ({
      path: '/reservations/',
      method: 'GET',
      params,
      schema: reservationPaginationSchema
    }),
    ALL_CURRENT_USER: (params: ReservationPaginationParams): Endpoint<ReservationPagination, ReservationPaginationParams> => ({
      path: '/reservations/me',
      method: 'GET',
      params,
      schema: reservationPaginationSchema
    }),
    BY_ID: (id: number | string): Endpoint<Reservation> => ({
      path: `/reservations/${id}`,
      method: 'GET',
      schema: reservationSchema
    }),
    FINISH: (id: number | string): Endpoint<Reservation> => ({
      path: `/reservations/${id}/finish`,
      method: 'PATCH',
      schema: reservationSchema
    }),
    CANCEL: (id: number | string): Endpoint<Reservation> => ({
      path: `/reservations/${id}/cancel`,
      method: 'PATCH',
      schema: reservationSchema
    })
  }
} as const;