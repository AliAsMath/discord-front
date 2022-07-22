import { createSlice } from "@reduxjs/toolkit";

export interface Room {
  roomCreator: { userId: string; socketId: string; username?: string };
  participants: { userId: string; socketId: string }[];
  roomId: string;
}

interface RoomState {
  isUserInRoom: any;
  isUserRoomCreator: any;
  roomDetails: Room | null;
  activeRooms: Room[];
  localStream: MediaStream | undefined;
  remoteStreams: { stream: MediaStream; connectedSocketId: string }[];
  audioOnly: any;
  screenSharingStream: MediaStream | null;
  isScreenSharingActive: boolean;
}

const initialState: RoomState = {
  isUserInRoom: false,
  isUserRoomCreator: false,
  roomDetails: null,
  activeRooms: [],
  localStream: undefined,
  remoteStreams: [],
  audioOnly: false,
  screenSharingStream: null,
  isScreenSharingActive: false,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    openRoom: (state, action) => {
      return {
        ...state,
        isUserInRoom: action.payload.isUserInRoom,
        isUserRoomCreator: action.payload.isUserRoomCreator,
      };
    },

    setRoomDetails: (state, action) => {
      return { ...state, roomDetails: action.payload };
    },

    setActiveRooms: (state, action) => {
      return { ...state, activeRooms: action.payload };
    },

    setLocalStream: (state, action) => {
      return { ...state, localStream: action.payload };
    },

    setRemoteStreams: (state, action) => {
      return { ...state, remoteStreams: action.payload };
    },

    toggleAudioOnly: (state) => {
      return { ...state, audioOnly: !state.audioOnly };
    },

    setScreenSharingStream: (state, action) => {
      return { ...state, screenSharingStream: action.payload };
    },

    setIsScreenSharingActive: (state, action) => {
      return { ...state, isScreenSharingActive: action.payload };
    },
  },
  // extraReducers: (builder: ActionReducerMapBuilder<roomState>) => {},
});

export const roomReducer = roomSlice.reducer;
export const roomAction = {
  ...roomSlice.actions,
};
