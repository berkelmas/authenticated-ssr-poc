import axiosInstance from "./axiosInstance";

export const getPendingReviews = () => {
  return axiosInstance.get(`/review/get-pending-replies`);
};

export const getAllReviews = () => {
  return axiosInstance.get(`/review/get-all`);
};

export const deleteReviewService = (reviewId) => {
  return axiosInstance.delete(`/review/delete?reviewId=${reviewId}`);
};

export const editReviewService = (reviewId, data) => {
  return axiosInstance.post(`/review/edit`, {
    reviewId,
    ...data,
  });
};
