import React, { useState } from "react";
import "./LoginPage.scss";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";

import { CenteredCardLayout } from "../../components/layouts/CenteredCardLayout";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginSchema } from "../../schemas/login.schemas";
import { login } from "../../api/auth.api";

export const LoginPage = () => {
  const [_authStatus, setAuthStatus] = useState({ name: "", message: "" });
  const {
    getValues,
    register,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
    criteriaMode: "all",
    shouldFocusError: true,
  });

  const handleLoginButtonClick = async () => {
    const formValues = getValues();
    try {
      await login(formValues);
      setAuthStatus({ name: "success", message: "Successfully Logged In" });
    } catch {
      setAuthStatus({
        name: "error",
        message: "Error Login, please try again",
      });
    }
  };

  return (
    <CenteredCardLayout>
      <div className="login_page__container">
        <h2 className="login_page__title">Hello Friend</h2>
        <TextField
          {...register("userName")}
          className="login_page__text_field"
          label="User"
          fullWidth
        />
        <TextField
          {...register("password")}
          className="login_page__text_field"
          label="Password"
          fullWidth
          type="password"
        />
        <Button
          disabled={!isValid}
          variant="outlined"
          onClick={handleLoginButtonClick}
          fullWidth
        >
          Login
        </Button>

        {_authStatus.name && (
          <Alert severity={_authStatus.name}>{_authStatus.message}</Alert>
        )}

        <p className="login_page__signup--text">
          or{" "}
          <Link href="/signup" variant="body2">
            SignUp
          </Link>
        </p>
      </div>
    </CenteredCardLayout>
  );
};
