import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login";
import MainLayout from "./layout/mainlayout";
import ProtectedRoute from "./routes/protectedroute";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <BrowserRouter>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#000",
            color: "#fff",
            borderRadius: "10px",
            padding: "12px 16px",
            fontSize: "14px",
          },
        }}
      />

      <Routes>

  <Route
    path="/"
    element={
      <Navigate
        to="/login"
        replace
      />
    }
  />

  <Route
    path="/login"
    element={<Login />}
  />

  <Route
    path="/*"
    element={<MainLayout />}
  />

</Routes>
    </BrowserRouter>
  );
}