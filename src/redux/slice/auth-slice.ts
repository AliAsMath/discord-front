import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {
  login,
  LoginRequestData,
  register,
  RegisterRequestData,
} from "../../util/api";
import { statusAction, status } from "./status-slice";

// First, create the thunk
const registerThunk = createAsyncThunk<UserState, RegisterRequestData>(
  "auth/register",
  async (credentials, thunkAPI) => {
    thunkAPI.dispatch(statusAction.setStatus({ status: status.INFO }));

    try {
      const response = await register(credentials);

      thunkAPI.dispatch(statusAction.setStatus({ status: status.SUCCESS }));

      return response.data.userDetails;
    } catch (error) {
      thunkAPI.dispatch(
        statusAction.setStatus({
          status: status.ERROR,
          message: error,
          isOpen: true,
        })
      );

      throw error;
    }
  }
);

const loginThunk = createAsyncThunk<UserState, LoginRequestData>(
  "auth/login",
  async (credentials, thunkAPI) => {
    thunkAPI.dispatch(statusAction.setStatus({ status: status.INFO }));

    try {
      const response = await login(credentials);

      thunkAPI.dispatch(statusAction.setStatus({ status: status.SUCCESS }));

      return response.data.userDetails;
    } catch (error) {
      thunkAPI.dispatch(
        statusAction.setStatus({
          status: status.ERROR,
          message: error,
          isOpen: true,
        })
      );

      throw error;
    }
  }
);

interface UserState {
  id: string;
  mail: string;
  username: string;
  token: string;
}

const initialState = {} as UserState;

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserLocalStorage: (state) => {
      const jsonUser = localStorage.getItem("user");
      if (jsonUser) return JSON.parse(jsonUser);
      else return {};
    },

    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },

    logout: (state) => {
      localStorage.setItem("user", "");
      return {} as UserState;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
    //register
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    });

    //login
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    });
  },
});

export const authReducer = usersSlice.reducer;
export const authAction = { ...usersSlice.actions, loginThunk, registerThunk };
