import React from "react";
import InputLabel from "../abstract/InputLabel";
import Redirect from "../abstract/Redirect";
import { Button, CircularProgress, Tooltip } from "@mui/material";
import { useAppSelector } from "../../redux/hook";
import { status } from "../../redux/slice/status-slice";

interface loginFormProps {
  mail: string;
  setMail: (mail: string) => void;
  password: string;
  setPassword: (pass: string) => void;
  isFormValid: boolean;
  loginHandler: React.FormEventHandler;
}

const LoginForm: React.FC<loginFormProps> = ({
  mail,
  setMail,
  password,
  setPassword,
  isFormValid,
  loginHandler,
}) => {
  const statusState = useAppSelector((state) => state.status);

  return (
    <form>
      <InputLabel
        label="E-mail"
        type="email"
        value={mail}
        setValue={setMail}
        placholder="Enter your E-mail"
      />
      <InputLabel
        label="Password"
        type="password"
        value={password}
        setValue={setPassword}
        placholder="Enter your Password"
      />
      <Tooltip
        title={isFormValid ? "Press to login" : "Enter correct credentials"}
        followCursor
        placement="top"
      >
        <Button
          className="w-full normal-case"
          variant={isFormValid ? "contained" : "outlined"}
          onClick={loginHandler}
        >
          {statusState.status === status.INFO ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Login"
          )}
        </Button>
      </Tooltip>
      <Redirect
        path="/register"
        text="Need an account?"
        linkText="Create an account"
      />
    </form>
  );
};

export default LoginForm;
