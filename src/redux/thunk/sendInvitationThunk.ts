import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { isInvalidJWT, sendFriendInvitation } from "../../util/api";
import { status, statusAction } from "../slice/status-slice";
import { AxiosError } from "axios";
import { authAction } from "../slice/auth-slice";

export const sendInvitationThunk = createAsyncThunk<
  AxiosResponse["data"],
  { mail: string; closeHandler: Function }
>("friend/sendInvitation", async ({ mail, closeHandler }, thunkAPI) => {
  thunkAPI.dispatch(statusAction.setStatus({ status: status.INFO }));

  try {
    const response = await sendFriendInvitation({ mail });

    thunkAPI.dispatch(
      statusAction.setStatus({
        status: status.SUCCESS,
        message: response.data,
        isOpen: true,
      })
    );

    closeHandler();

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      thunkAPI.dispatch(
        statusAction.setStatus({
          status: status.ERROR,
          message: error.response?.data,
          isOpen: true,
        })
      );

      if (isInvalidJWT(error as AxiosError))
        thunkAPI.dispatch(authAction.logout());
    }

    throw error;
  }
});
