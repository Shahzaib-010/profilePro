import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { getRouter } from "./router/router";
import { store } from './app/store'
import { Provider } from 'react-redux'
import { AuthProvider } from "./context/AuthContext";

const router = getRouter();

createRoot(document.getElementById("root")).render(
   <Provider store={store}>
      <AuthProvider>
         <RouterProvider router={router} />
      </AuthProvider>
   </Provider>
);
