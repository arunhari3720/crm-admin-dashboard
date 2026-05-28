import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom"; // ✅ ADD THIS
import App from "./App";
import "./index.css";
//import "antd/dist/reset.css";


import { PermissionProvider } from "./context/permissioncontext";
import { PlanProvider } from "./context/plancontext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter> {/* ✅ WRAP HERE */}
      <PermissionProvider>
        <PlanProvider>
          <App />
        </PlanProvider>
      </PermissionProvider>
    </HashRouter>
  </React.StrictMode>
);