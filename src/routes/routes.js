import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage";
import { ProfilePage } from "./../pages/ProfilePage";

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

export const privateRoutes = [
  {
    path: "/profile",
    element: <ProfilePage />,
  },
];
