import * as Yup from "yup";

export const editUserValidationSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
});
