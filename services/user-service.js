import axiosInstance from "./axiosInstance";

export const getAllUsersService = (currentPage, pageSize) => {
  const skip = currentPage * pageSize - pageSize;
  const limit = pageSize;
  return axiosInstance.get(`/user/get-all/?skip=${skip}&limit=${limit}`);
};

export const deleteUserService = (userId) => {
  return axiosInstance.delete(`/user/delete/?userId=${userId}`);
};

export const editUserService = (userId, username) => {
  return axiosInstance.put(`/user/update`, { userId, username });
};
