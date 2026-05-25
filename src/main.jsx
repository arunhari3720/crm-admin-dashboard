import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { PermissionProvider } from "./context/permissioncontext"; // ✅ ADD THIS
import {
  PlanProvider,
} from "./context/plancontext";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PermissionProvider> {/* ✅ WRAP HERE */}
      <PlanProvider>
        <App />
      </PlanProvider>
    </PermissionProvider>
  </React.StrictMode>
);