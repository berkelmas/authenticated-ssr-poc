import * as Yup from "yup";

export const addRestaurantValidationSchema = Yup.object().shape({
  restaurantName: Yup.string().required("Required"),
  restaurantDescription: Yup.string().required("Required"),
  restaurantImage: Yup.string(),
});
