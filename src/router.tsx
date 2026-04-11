import { createBrowserRouter, Navigate } from 'react-router';
import MainLayout from '@/MainLayout';
import { PATHS } from '@/paths';
import {
  MyAccountPage,
  RegisterPage,
  LoginPage,
  ReservationsPage,
  UsersPage,
  HallDetailPage,
  HallsSearchPage,
  HallsExplorePage
} from '@/pages';
import { ProtectedRoute } from './pages/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      { index: true, element: <Navigate to={`${PATHS.halls.root}/${PATHS.halls.search}`} replace /> },
      {
        path: PATHS.halls.root,
        children: [
          { index: true, element: <Navigate to={PATHS.halls.search} replace /> },
          { path: PATHS.halls.search, Component: HallsSearchPage },
          { path: PATHS.halls.explore, Component: HallsExplorePage },
          { path: `${PATHS.halls.detail}/:hallId`, Component: HallDetailPage }
        ]
      },
      {
        path: PATHS.reservations,
        Component: () => <ProtectedRoute allowTo='auth' />,
        children: [
          { index: true, Component: ReservationsPage }
        ]
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
        Component: () => <ProtectedRoute allowTo={['admin', 'superadmin']} />,
        children: [
          { index: true, Component: UsersPage }
        ]
      },
      {
        path: PATHS.myAccount,
        Component: () => <ProtectedRoute allowTo='auth' />,
        children: [
          { index: true, Component: MyAccountPage }
        ]
      }
    ]
  },
  { path: '*', element: <Navigate to='/' replace /> }
])

export { router };
