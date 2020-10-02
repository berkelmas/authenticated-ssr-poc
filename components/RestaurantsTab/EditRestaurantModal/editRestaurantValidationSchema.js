import * as Yup from "yup";

export const editRestaurantValidationSchema = Yup.object().shape({
  restaurantName: Yup.string().required("Required"),
  restaurantDescription: Yup.string().required("Required"),
  restaurantImage: Yup.string().nullable(),
});
