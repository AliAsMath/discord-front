import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { sendInvitationThunk } from "../thunk/sendInvitationThunk";
import {
  acceptInvitationThunk,
  rejectInvitationThunk,
} from "./../thunk/decisionThunk";

// First, create the thunk

interface FriendsInvitation {
  id: string;
  senderUser: { _id: string; username: string; mail: string };
}

interface friend {
  id: string;
  mail: string;
  username: string;
}

interface onlineUsers {
  socketId: string;
  userId: string;
}

interface FriendState {
  friends: friend[];
  pendingFriendsInvitations: FriendsInvitation[];
  onlineUsers: onlineUsers[];
}

const initialState: FriendState = {
  friends: [],
  pendingFriendsInvitations: [],
  onlineUsers: [],
};

const friendsSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    setFriendInvitation: (state, action) => {
      return { ...state, pendingFriendsInvitations: action.payload };
    },

    setFriendList: (state, action) => {
      return { ...state, friends: action.payload };
    },

    setOnlineUsers: (state, action) => {
      return { ...state, onlineUsers: action.payload };
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<FriendState>) => {},
});

export const friendsReducer = friendsSlice.reducer;
export const friendsAction = {
  ...friendsSlice.actions,
  sendInvitationThunk,
  acceptInvitationThunk,
  rejectInvitationThunk,
};
