import {
  getAllReviews,
  getPendingReviews,
} from "../../services/review-service";

// DECIDES WHETHER TO GET ALL REVIEWS OR USER'S PENDING REVIEWS.
export const getReviewsHttpFactory = (userRole) => {
  if (userRole === "owner") {
    return getPendingReviews();
  } else if (userRole === "admin") {
    return getAllReviews();
  }
};
