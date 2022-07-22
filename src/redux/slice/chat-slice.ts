import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";

export enum chatType {
  DIRECT = "DIRECT",
  GROUP = "GROUP",
}

interface Message {
  _id: string;
  content: string;
  sameAuthor: boolean;
  author: {
    username: string;
    _id: string;
  };
  date: string;
  sameDay: boolean;
}

interface ChatState {
  chosenChatDetails: { id: string; username: string } | null;
  chatType: "DIRECT" | "GROUP" | null;
  messages: Message[];
}

const initialState: ChatState = {
  chosenChatDetails: null,
  chatType: null,
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChosenChatDetails: (state, action) => {
      return {
        ...state,
        chosenChatDetails: action.payload.chosenChatDetails,
        chatType: action.payload.chatType,
        messages: [],
      };
    },

    setMessages: (state, action) => {
      return { ...state, messages: action.payload };
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<ChatState>) => {},
});

export const chatReducer = chatSlice.reducer;
export const chatAction = {
  ...chatSlice.actions,
};
