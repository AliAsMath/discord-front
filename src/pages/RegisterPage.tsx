import React, { useEffect, useState } from "react";
import AuthBox from "../components/abstract/AuthBox";
import RegisterForm from "../components/register/RegisterForm";
import { useAppDispatch } from "../redux/hook";
import { authAction } from "../redux/slice/auth-slice";
import { validateRegisterInputs } from "./../util/validation";

const RegisterPage: React.FC = () => {
  const [mail, setMail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsFormValid(validateRegisterInputs({ mail, password, username }));
  }, [mail, username, password]);

  const registerHandler = (e: React.FormEvent) => {
    if (!isFormValid) return;
    dispatch(authAction.registerThunk({ mail, username, password }));
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-indigo-600">
      <AuthBox>
        <RegisterForm
          mail={mail}
          setMail={setMail}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          isFormValid={isFormValid}
          registerHandler={registerHandler}
        />
      </AuthBox>
    </div>
  );
};

export default RegisterPage;
