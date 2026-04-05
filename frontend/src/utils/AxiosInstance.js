import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export default axiosInstance;