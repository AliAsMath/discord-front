import { useEffect, useState } from "react";
import AuthBox from "../components/abstract/AuthBox";
import LoginForm from "../components/login/LoginForm";
import { useAppDispatch } from "../redux/hook";
import { authAction } from "../redux/slice/auth-slice";
import { validateLoginInputs } from "./../util/validation";

const LoginPage: React.FC = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsFormValid(validateLoginInputs({ mail, password }));
  }, [mail, password]);

  const loginHandler = (e: React.FormEvent) => {
    if (!isFormValid) return;
    dispatch(authAction.loginThunk({ mail, password }));
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-indigo-600">
      <AuthBox>
        <LoginForm
          mail={mail}
          setMail={setMail}
          password={password}
          setPassword={setPassword}
          isFormValid={isFormValid}
          loginHandler={loginHandler}
        />
      </AuthBox>
    </div>
  );
};

export default LoginPage;
