import { ReactLocation, Route } from "@tanstack/react-location";
import { Dashboard, Home, Login, Profile } from "@/components";

export const route: Route[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
];

export const location = new ReactLocation();
