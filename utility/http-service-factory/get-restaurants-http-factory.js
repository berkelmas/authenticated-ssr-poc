import {
  getMyRestaurantsService,
  getRestaurantsService,
} from "../../services/restaurant-service";

// DECIDES WHETHER TO GET ALL RESTAURANTS OR USER'S RESTAURANTS
export const getRestaurantsHttpFactory = (
  userRole,
  currentPage,
  pageSize,
  rating,
  cookie = null
) => {
  if (userRole === "owner") {
    return getMyRestaurantsService(currentPage, pageSize, rating, cookie);
  } else {
    return getRestaurantsService(currentPage, pageSize, rating, cookie);
  }
};
