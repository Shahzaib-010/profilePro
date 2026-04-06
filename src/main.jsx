import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { getRouter } from "./router/router";
import { store } from './app/store'
import { Provider } from 'react-redux'

const router = getRouter();

createRoot(document.getElementById("root")).render(
   <Provider store={store}>
      <RouterProvider router={router} />
   </Provider>
);
