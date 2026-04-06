import { createBrowserRouter, Navigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import UserDashboard from "../pages/userDashboard/UserDashboard";
import ProtectedRoute from "./ProtectedRoute";

export function getRouter() {
  return createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />
    },
    {
      path: "/features",
      element: <LandingPage />
    },
    {
      path: "/pricing",
      element: <LandingPage />
    },
    {
      path: "/contact",
      element: <LandingPage />
    },
    {
      path: "/get-started",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Navigate to="/get-started" replace />
    },
    {
      path: "/user-dashboard",
      element: (
        <ProtectedRoute>
          <UserDashboard />
        </ProtectedRoute>
      )
    },
    {
      path: "/signup",
      element: <Signup />
    },
  ]);
}
