interface validateLoginInputsParam {
  mail: string;
  password: string;
}
interface validateRegisterInputsParam {
  mail: string;
  username: string;
  password: string;
}

export const validateLoginInputs = ({
  mail,
  password,
}: validateLoginInputsParam) => {
  const isValidMail = validateMail(mail);
  const isValidPassword = validatePassword(password);

  return isValidMail && isValidPassword;
};

export const validateRegisterInputs = ({
  mail,
  username,
  password,
}: validateRegisterInputsParam) => {
  const isValidMail = validateMail(mail);
  const isValidPassword = validatePassword(password);
  const isValidUsername = validateUsername(username);

  return isValidMail && isValidPassword && isValidUsername;
};

export const validateMail = (mail: string) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(mail);
};

const validatePassword = (password: string) => {
  return password.length > 6 && password.length < 13;
};
const validateUsername = (username: string) => {
  return username.length > 2 && username.length < 13;
};
