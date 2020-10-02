import * as Yup from "yup";

export const reviewRestaurantValidationSchema = Yup.object().shape({
  currentRating: Yup.number().required("Required"),
  description: Yup.string().required("Required"),
});
