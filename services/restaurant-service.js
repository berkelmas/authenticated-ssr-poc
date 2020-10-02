import axiosInstance from "./axiosInstance";

export const createRestaurantService = (
  restaurantName,
  restaurantDescription,
  restaurantImage
) => {
  return axiosInstance.post(`/restaurant/create`, {
    restaurantName,
    restaurantDescription,
    restaurantImage,
  });
};

export const getRestaurantsService = (
  currentPage,
  pageSize,
  rating,
  cookie
) => {
  const skip = currentPage * pageSize - pageSize;
  const limit = pageSize;
  return axiosInstance.get(
    `/restaurant/get/?skip=${skip}&limit=${limit}&rating=${rating}`,
    {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    }
  );
};

export const getMyRestaurantsService = (
  currentPage,
  pageSize,
  rating,
  cookie
) => {
  const skip = currentPage * pageSize - pageSize;
  const limit = pageSize;
  return axiosInstance.get(
    `/restaurant/get-mine/?skip=${skip}&limit=${limit}&rating=${rating}`,
    {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    }
  );
};

export const reviewOnRestaurantService = (
  restaurantId,
  currentRating,
  description
) => {
  return axiosInstance.post(`/restaurant/review`, {
    restaurantId,
    currentRating,
    description,
  });
};

export const deleteRestaurantService = (restaurantId) => {
  return axiosInstance.delete(
    `/restaurant/delete/?restaurantId=${restaurantId}`
  );
};

export const getRestaurantByIdService = (restaurantId) => {
  return axiosInstance.get(
    `/restaurant/get-single/?restaurantId=${restaurantId}`
  );
};

export const updateRestaurantService = (
  restaurantId,
  name,
  description,
  base64Image
) => {
  return axiosInstance.post("/restaurant/update", {
    restaurantId,
    name,
    description,
    base64Image,
  });
};
