import * as yup from "yup";

export const loginSchema = yup.object().shape({
  userName: yup.string().required("User name required"),
  password: yup.string().required("User name required"),
});

export const signupSchema = yup.object().shape({
  userName: yup.string().required("User name required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Minimum eight characters, at least one letter and one number"
    )
    .required("Password required"),
  confirmPassword: yup
    .string()
    .test({
      name: "pass_confirm",
      message: "Confirm password do not match",
      test: function (value) {
        return this.parent.password === value;
      },
    })
    .required("Password confirmation required"),
});
