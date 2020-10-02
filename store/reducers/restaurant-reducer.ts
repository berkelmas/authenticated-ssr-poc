import { HYDRATE } from "next-redux-wrapper";
import { Reducer } from "redux";
import {
  START_GETTING_RESTAURANTS,
  SUCCESS_GETTING_RESTAURANTS,
  FAILED_GETTING_RESTAURANTS,
  CHANGE_FILTERING_OR_PAGINATION,
} from "../types/restaurant-types";
import { LOGOUT } from "../types/user-types";

type IRestaurantReducer = {
  loadingRestaurants: boolean;
  restaurants: any[];
  totalCount: number | null;
  rating: number | null;
  currentPage: 1;
};

const initialState: IRestaurantReducer = {
  loadingRestaurants: false,
  restaurants: [],
  totalCount: null,
  rating: null,
  currentPage: 1,
};

const restaurantReducer: Reducer<IRestaurantReducer> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload.RestaurantReducer,
      };
    case START_GETTING_RESTAURANTS:
      return { ...state, loadingRestaurants: true };
    case SUCCESS_GETTING_RESTAURANTS:
      return {
        ...state,
        loadingRestaurants: false,
        restaurants: action.payload.restaurants,
        totalCount: action.payload.totalCount,
      };
    case FAILED_GETTING_RESTAURANTS:
      return {
        ...state,
        loadingRestaurants: false,
      };
    case CHANGE_FILTERING_OR_PAGINATION:
      return {
        ...state,
        rating: action.payload.rating,
        currentPage: action.payload.currentPage,
      };
    case LOGOUT:
      return {
        ...state,
        loadingRestaurants: false,
        restaurants: [],
        totalCount: null,
        rating: null,
        currentPage: 1,
      };
    default:
      return state;
  }
};

export default restaurantReducer;
