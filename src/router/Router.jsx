import { createBrowserRouter, Navigate } from "react-router-dom";

import LandingPage from "../pages/landing/LandingPage";
import Signup from "../pages/landing/Signup";
import Login from "../pages/landing/Login";

import ProtectedRoute from "./ProtectedRoute";
import UserDashboardLayout from "@/layout/UserDashboardLayout";

import UserDashboard from "../pages/userDashboard/UserDashboard";
import ResumeBuilder from "@/pages/userDashboard/ResumeBuilder";

export function getRouter() {
  return createBrowserRouter([
    { path: "/", element: <LandingPage /> },
    { path: "/features", element: <LandingPage /> },
    { path: "/pricing", element: <LandingPage /> },
    { path: "/contact", element: <LandingPage /> },

    { path: "/get-started", element: <Login /> },
    { path: "/login", element: <Navigate to="/get-started" replace /> },
    { path: "/signup", element: <Signup /> },

    // ✅ DASHBOARD
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <UserDashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <UserDashboard />,
        },
        {
          path: "resumebuilder",
          element: <ResumeBuilder />,
        },
        {
          path: "profile",
          element: <div>Profile Page</div>,
        },
        {
          path: "billing",
          element: <div>Billing Page</div>,
        },
        {
          path: "settings",
          element: <div>Settings Page</div>,
        },
      ],
    },
  ]);
}