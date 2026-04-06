import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Signup from "../pages/Signup";
import Login from "../pages/Login";

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
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },
  ]);
}
