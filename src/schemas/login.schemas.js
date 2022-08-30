import * as yup from "yup";

export const loginSchema = yup.object().shape({
  userName: yup.string().required("User name required"),
  password: yup.string().required("User name required"),
});
