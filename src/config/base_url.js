const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://8mwjhtt0-5000.inc1.devtunnels.ms/api";

export default BASE_URL;