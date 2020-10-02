import * as Yup from "yup";

export const replyReviewValidationSchema = Yup.object().shape({
  description: Yup.string().required("Required"),
});
