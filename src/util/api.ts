import axios, { AxiosError } from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_URL + "/api/",
});

client.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      const token = parsedUser?.token;
      if (token && config.headers)
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export interface RegisterRequestData {
  mail: string;
  username: string;
  password: string;
}

export interface LoginRequestData {
  mail: string;
  password: string;
}

export interface ResponseData {
  userDetails: {
    id: string;
    mail: string;
    username: string;
    token: string;
  };
}

export const register = async (data: RegisterRequestData) => {
  try {
    const response = await client.post<ResponseData>("auth/register", data);
    return response;
  } catch (err) {
    const error = err as AxiosError;

    throw error.response?.data;
  }
};

export const login = async (data: LoginRequestData) => {
  try {
    const response = await client.post<ResponseData>("auth/login", data);

    return response;
  } catch (err) {
    const error = err as AxiosError;

    throw error.response?.data;
  }
};
// util functions
export const isInvalidJWT = (error: AxiosError) => {
  console.log(error);
  return error.response?.status === 401 || error.response?.status === 403;
};

// protected route with jwt
export const sendFriendInvitation = async (data: { mail: string }) => {
  return await client.post("friend-invitation/invite", data);
};

export const acceptInvitation = async (data: { invitationId: string }) => {
  return await client.post("friend-invitation/accept", data);
};

export const rejectInvitation = async (data: { invitationId: string }) => {
  return await client.post("friend-invitation/reject", data);
};
