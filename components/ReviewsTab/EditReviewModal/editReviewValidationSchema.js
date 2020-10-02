import * as Yup from "yup";

export const editReviewValidationSchema = Yup.object().shape({
  rating: Yup.number().required("Required"),
  description: Yup.string().required("Required"),
});
