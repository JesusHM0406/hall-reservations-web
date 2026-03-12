import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "./MainLayout";
import { PATHS } from "./paths";
import {
  SearchHallsPage,
  AllHallsPage,
  NewHallPage,
  UpdateHallPage,
  NewReservationPage,
  AllReservationsPage,
  MyReservationsPage,
  ReservationByIDPage,
  AllUsersPage,
  UpdateUserPage,
  DeleteUserPage,
  UserByIDPage,
  MyAccountPage,
  RegisterPage,
  LoginPage
} from './pages'

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      { index: true, element: <Navigate to={`${PATHS.halls.root}/${PATHS.halls.search}`} /> },
      {
        path: PATHS.halls.root,
        children: [
          { index: true, element: <Navigate to={PATHS.halls.search} /> },
          { path: PATHS.halls.search, Component: SearchHallsPage },
          { path: PATHS.halls.all, Component: AllHallsPage },
          { path: PATHS.halls.new, Component: NewHallPage },
          { path: PATHS.halls.update, Component: UpdateHallPage }
        ]
      },
      {
        path: PATHS.reservations.root,
        children: [
          { index: true, element: <Navigate to={PATHS.reservations.me} /> },
          { path: PATHS.reservations.new, Component: NewReservationPage },
          { path: PATHS.reservations.me, Component: MyReservationsPage },
          { path: PATHS.reservations.all, Component: AllReservationsPage },
          { path: PATHS.reservations.byId, Component: ReservationByIDPage }
        ]
      },
      {
        path: PATHS.auth.root,
        children: [
          { index: true, element: <Navigate to={PATHS.auth.login} /> },
          { path: PATHS.auth.login, Component: LoginPage },
          { path: PATHS.auth.register, Component: RegisterPage }
        ]
      },
      {
        path: PATHS.users.root,
        children: [
          { index: true, element: <Navigate to={PATHS.users.all} /> },
          { path: PATHS.users.all, Component: AllUsersPage },
          { path: PATHS.users.update, Component: UpdateUserPage },
          { path: PATHS.users.delete, Component: DeleteUserPage },
          { path: PATHS.users.byId, Component: UserByIDPage }
        ]
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