import axiosInstance from "./axiosInstance";

export const signUpService = (username, password, role) => {
  return axiosInstance.post(`/user/register`, {
    username,
    password,
    role,
  });
};

export const loginService = (username, password) => {
  return axiosInstance.post(`/user/login`, { username, password });
};

export const checkTokenValidity = () => {
  return axiosInstance.get("/user/check-token");
};
