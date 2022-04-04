import { ReactLocation, Route } from "@tanstack/react-location";
import { Dashboard, Home, Login } from "@/components";

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
];

export const location = new ReactLocation();
