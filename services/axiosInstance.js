import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_API_ENDPOINT,
  baseURL: "http://localhost:4000/",
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user) {
//       const token = user.accessToken;
//       config.headers.Authorization = `Bearer ${token}`;
//     } else {
//       delete axiosInstance.defaults.headers.common.Authorization;
//     }
//     return config;
//   },
//   (err) => Promise.reject(err)
// );

export default axiosInstance;
