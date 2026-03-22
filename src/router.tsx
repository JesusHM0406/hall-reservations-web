import { createBrowserRouter, Navigate } from 'react-router';
import MainLayout from './MainLayout';
import { PATHS } from './paths';
import {
  MyAccountPage,
  RegisterPage,
  LoginPage
} from './pages';
import { HallsPage } from './pages/HallsPage';
import { ReservationsPage } from './pages/ReservationsPage';
import { UsersPage } from './pages/UsersPage';

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      { index: true, element: <Navigate to={PATHS.halls} replace /> },
      {
        path: PATHS.halls,
        Component: HallsPage
      },
      {
        path: PATHS.reservations,
        Component: ReservationsPage
      },
      {
        path: PATHS.auth.root,
        children: [
          { index: true, element: <Navigate to={PATHS.auth.login} replace /> },
          { path: PATHS.auth.login, Component: LoginPage },
          { path: PATHS.auth.register, Component: RegisterPage }
        ]
      },
      {
        path: PATHS.users,
        Component: UsersPage
      },
      {
        path: PATHS.myAccount,
        Component: MyAccountPage
      }
    ]
  },
  { path: '*', element: <Navigate to='/' replace /> }
])

export { router };