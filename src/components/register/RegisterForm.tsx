import React from "react";
import InputLabel from "../abstract/InputLabel";
import Redirect from "../abstract/Redirect";
import { Button, CircularProgress, Tooltip } from "@mui/material";
import { status } from "../../redux/slice/status-slice";
import { useAppSelector } from "../../redux/hook";

interface loginFormProps {
  mail: string;
  setMail: (mail: string) => void;
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (pass: string) => void;
  isFormValid: boolean;
  registerHandler: React.FormEventHandler;
}

const LoginForm: React.FC<loginFormProps> = ({
  mail,
  setMail,
  username,
  setUsername,
  password,
  setPassword,
  isFormValid,
  registerHandler,
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
        label="Username"
        type="text"
        value={username}
        setValue={setUsername}
        placholder="Enter your username"
      />
      <InputLabel
        label="Password"
        type="password"
        value={password}
        setValue={setPassword}
        placholder="Enter your Password"
      />
      <Tooltip
        title={isFormValid ? "Press to Signup" : "Enter correct credentials"}
        followCursor
        placement="top"
      >
        <Button
          className="w-full normal-case"
          variant={isFormValid ? "contained" : "outlined"}
          onClick={registerHandler}
        >
          {statusState.status === status.INFO ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Register"
          )}
        </Button>
      </Tooltip>
      <Redirect path="/login" text="" linkText="Already have an account?" />
    </form>
  );
};

export default LoginForm;
