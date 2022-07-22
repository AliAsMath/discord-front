import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import {
  acceptInvitation,
  isInvalidJWT,
  rejectInvitation,
} from "../../util/api";
import { status, statusAction } from "../slice/status-slice";
import { AxiosError } from "axios";
import { authAction } from "./../slice/auth-slice";

export const acceptInvitationThunk = createAsyncThunk<
  AxiosResponse["data"],
  { invitationId: string }
>("friend/acceptInvitation", async ({ invitationId }, thunkAPI) => {
  thunkAPI.dispatch(statusAction.setStatus({ status: status.INFO }));

  try {
    const response = await acceptInvitation({ invitationId });
    thunkAPI.dispatch(
      statusAction.setStatus({
        status: status.SUCCESS,
        message: response.data,
        isOpen: true,
      })
    );

    return response.data;
  } catch (error) {
    if (!(error instanceof AxiosError)) throw error;

    thunkAPI.dispatch(
      statusAction.setStatus({
        status: status.ERROR,
        message: error.response?.data,
        isOpen: true,
      })
    );

    if (isInvalidJWT(error as AxiosError))
      thunkAPI.dispatch(authAction.logout());

    throw error;
  }
});

export const rejectInvitationThunk = createAsyncThunk<
  AxiosResponse["data"],
  { invitationId: string }
>("friend/rejectInvitation", async ({ invitationId }, thunkAPI) => {
  thunkAPI.dispatch(statusAction.setStatus({ status: status.INFO }));

  try {
    const response = await rejectInvitation({ invitationId });
    thunkAPI.dispatch(
      statusAction.setStatus({
        status: status.SUCCESS,
        message: response.data,
        isOpen: true,
      })
    );

    return response.data;
  } catch (error) {
    if (!(error instanceof AxiosError)) throw error;

    thunkAPI.dispatch(
      statusAction.setStatus({
        status: status.ERROR,
        message: error.response?.data,
        isOpen: true,
      })
    );

    if (isInvalidJWT(error as AxiosError))
      thunkAPI.dispatch(authAction.logout());

    throw error;
  }
});
