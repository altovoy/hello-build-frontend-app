import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage/SignupPage";

export const publicRoutes = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
];

