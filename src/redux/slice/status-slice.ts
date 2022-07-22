import { createSlice } from "@reduxjs/toolkit";

export enum status {
  INFO = "info",
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
}

interface statusState {
  status: "info" | "success" | "error" | "warning";
  message: string;
  isOpen: boolean;
}

const initialState: statusState = {} as statusState;

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      return { ...state, ...action.payload };
    },

    resetStatus: (state) => {
      return {} as statusState;
    },

    toggleAlert: (state, action) => {
      return { ...state, isOpen: action.payload };
    },
  },
});

export const statusReducer = statusSlice.reducer;
export const statusAction = statusSlice.actions;
