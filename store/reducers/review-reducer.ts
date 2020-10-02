import { Reducer } from "redux";
import {
  START_GETTING_REVIEWS,
  SUCCESS_GETTING_REVIEWS,
  FAILED_GETTING_REVIEWS,
} from "../types/review-types";
import { LOGOUT } from "../types/user-types";

type IReviewReducer = {
  loadingReviews: boolean;
  reviews: any[];
};

const initialState: IReviewReducer = {
  loadingReviews: false,
  reviews: [],
};

const ReviewReducer: Reducer<IReviewReducer> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case START_GETTING_REVIEWS:
      return { ...state, loadingReviews: true };
    case SUCCESS_GETTING_REVIEWS:
      return { ...state, loadingReviews: false, reviews: action.payload };
    case FAILED_GETTING_REVIEWS:
      return { ...state, loadingReviews: true };
    case LOGOUT:
      return { ...state, loadingReviews: false, reviews: [] };
    default:
      return state;
  }
};

export default ReviewReducer;
