import "../src/assets/css/styles.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AppRoutes from "./routes/routes.jsx";
import { ContextProvider } from "./contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={AppRoutes}></RouterProvider>
    </ContextProvider>
  </React.StrictMode>
);
