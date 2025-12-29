const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

const API_BASE_URL = isLocal 
  ? "http://localhost:5000/api" 
  : (process.env.REACT_APP_API_URL || "https://caweb.onrender.com/api");

export default API_BASE_URL;
