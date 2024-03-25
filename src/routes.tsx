import { createBrowserRouter } from "react-router-dom";

import NotFoundPage from "./pages/404";
import AppLayout from "./pages/_layouts/app";
import AuthLayout from "./pages/_layouts/auth";
import DashBoardPage from "./pages/app/dashboard/dashboard-page";
import Orders from "./pages/app/orders/orders-page";
import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <DashBoardPage /> },
      { path: "/orders", element: <Orders /> },
    ],
  },

  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/sign-in", element: <SignIn /> },
      { path: "/sign-up", element: <SignUp /> },
    ],
  },
]);
