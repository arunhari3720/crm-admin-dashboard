import { Navigate } from "react-router-dom";


export default function ProtectedRoute({
  children,
  roleRequired
}) {

  // =====================================
  // GET AUTH DATA
  // =====================================
  const token =
    localStorage.getItem("token");

  const role =
    localStorage.getItem("role");


  // =====================================
  // NOT LOGGED IN
  // =====================================
  if (!token) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }


  // =====================================
  // ROLE CHECK
  // =====================================
  if (roleRequired) {

    const allowedroles =
      Array.isArray(roleRequired)
        ? roleRequired
        : [roleRequired];


    if (
      !allowedroles.includes(role)
    ) {

      return (
        <Navigate
          to="/login"
          replace
        />
      );
    }
  }


  // =====================================
  // ALLOWED
  // =====================================
  return children;
}