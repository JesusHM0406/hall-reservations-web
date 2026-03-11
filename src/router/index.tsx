import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout";

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout
  }
])

export { router };