import axiosInstance from "./axiosInstance";

export const addReplyService = (reviewId, description) => {
  return axiosInstance.post(`/reply/add`, {
    reviewId,
    description,
  });
};

export const getAllReplies = (jwt) => {
  return axiosInstance.get(`/reply/get`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const deleteReplyService = (reviewId) => {
  return axiosInstance.delete(`/reply/delete/?reviewId=${reviewId}`);
};

export const editReplyService = (reviewId, description) => {
  return axiosInstance.post(`/reply/edit`, {
    reviewId,
    reply: description,
  });
};
