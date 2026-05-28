const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://crm-admin-dashboard-1os7.onrender.com/api";

export default BASE_URL;