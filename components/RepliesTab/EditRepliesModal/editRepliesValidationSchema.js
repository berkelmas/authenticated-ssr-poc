import * as Yup from "yup";

export const editRepliesValidationSchema = Yup.object().shape({
  description: Yup.string().required("Required"),
});
