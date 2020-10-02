import {
  START_GETTING_REVIEWS,
  SUCCESS_GETTING_REVIEWS,
  FAILED_GETTING_REVIEWS,
} from "../types/review-types";
import { getReviewsHttpFactory } from "../../utility/http-service-factory/get-reviews-http-factory";

export const startGettingReviewsAction = (userRole) => {
  return (dispatch) => {
    dispatch({ type: START_GETTING_REVIEWS });
    getReviewsHttpFactory(userRole)
      .then(({ data: result }) => {
        const { data } = result;
        dispatch({ type: SUCCESS_GETTING_REVIEWS, payload: data });
      })
      .catch((e) => dispatch({ type: FAILED_GETTING_REVIEWS }));
  };
};

export const reloadAllReviewsAction = () => {
  return (dispatch, getState) => {
    const { role: userRole } = getState().UserReducer;
    dispatch({ type: START_GETTING_REVIEWS });
    getReviewsHttpFactory(userRole)
      .then(({ data: result }) => {
        const { data } = result;
        dispatch({ type: SUCCESS_GETTING_REVIEWS, payload: data });
      })
      .catch((e) => dispatch({ type: FAILED_GETTING_REVIEWS }));
  };
};
