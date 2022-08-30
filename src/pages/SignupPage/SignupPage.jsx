import React, { useState } from "react";
import "./SignupPage.scss";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";

import { CenteredCardLayout } from "../../components/layouts/CenteredCardLayout";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { signupSchema } from "../../schemas/login.schemas";
import { signup } from "../../api/auth.api";

import { useNavigate } from "react-router-dom"

export const SignupPage = () => {
  const navigate = useNavigate()
  const [_authStatus, setAuthStatus] = useState({ name: "", message: "" });
  const {
    getValues,
    register,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(signupSchema),
    criteriaMode: "all",
    shouldFocusError: true,
  });

  const handleLoginButtonClick = async () => {
    const formValues = getValues();
    try {
      await signup(formValues);
      setAuthStatus({ name: "success", message: "Successfully Signed Up" });
      navigate("/")
    } catch {
      setAuthStatus({
        name: "error",
        message: "Error, please try again",
      });
    }
  };

  return (
    <CenteredCardLayout>
      <div className="signup_page__container">
        <h2 className="signup_page__title">Welcome to our platform</h2>
        <TextField
          {...register("userName")}
          error={errors?.userName}
          helperText={errors?.userName?.message}
          className="signup_page__text_field"
          label="User"
          fullWidth
        />
        <TextField
          {...register("password")}
          error={errors?.password}
          helperText={errors?.password?.message}
          className="signup_page__text_field"
          label="Password"
          fullWidth
          type="password"
        />
        <TextField
          {...register("confirmPassword")}
          error={errors?.confirmPassword}
          helperText={errors?.confirmPassword?.message}
          className="signup_page__text_field"
          label="Confirm Password"
          fullWidth
          type="password"
        />
        <Button
          disabled={!isValid}
          variant="outlined"
          onClick={handleLoginButtonClick}
          fullWidth
        >
          Sign Up
        </Button>

        {_authStatus.name && (
          <Alert severity={_authStatus.name}>{_authStatus.message}</Alert>
        )}

        <p className="signup_page__signup--text">
          or{" "}
          <Link href="/" variant="body2">
            Login
          </Link>
        </p>
      </div>
    </CenteredCardLayout>
  );
};
