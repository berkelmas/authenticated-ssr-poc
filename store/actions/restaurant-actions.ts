import { getRestaurantsHttpFactory } from "../../utility/http-service-factory/get-restaurants-http-factory";
import {
  CHANGE_FILTERING_OR_PAGINATION,
  SUCCESS_GETTING_RESTAURANTS,
  START_GETTING_RESTAURANTS,
} from "../types/restaurant-types";

export const startGettingRestaurantsAction = () => ({
  type: START_GETTING_RESTAURANTS,
});
export const successGettingRestaurantsAction = (restaurants, totalCount) => ({
  type: SUCCESS_GETTING_RESTAURANTS,
  payload: { restaurants, totalCount },
});

export const changeFilteringOrPaginationAction = (
  currentPage,
  pageSize,
  rating,
  userRole
) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_FILTERING_OR_PAGINATION,
      payload: { currentPage, rating },
    });
    dispatch(startGettingRestaurantsAction());
    getRestaurantsHttpFactory(userRole, currentPage, pageSize, rating).then(
      ({ data: result }) => {
        const {
          data: { items, totalCount },
        } = result;
        dispatch(successGettingRestaurantsAction(items, totalCount));
      }
    );
  };
};

export const reloadAllRestaurantsAction = () => {
  return (dispatch, getState) => {
    dispatch(startGettingRestaurantsAction());
    const { currentPage, rating } = getState().RestaurantReducer;
    const { role: userRole } = getState().UserReducer;
    getRestaurantsHttpFactory(userRole, currentPage, 4, rating).then(
      ({ data: result }) => {
        const {
          data: { items, totalCount },
        } = result;
        dispatch(successGettingRestaurantsAction(items, totalCount));
      }
    );
  };
};
