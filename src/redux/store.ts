import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/auth-slice";
import { chatReducer } from "./slice/chat-slice";
import { friendsReducer } from "./slice/friend-slice";
import { statusReducer } from "./slice/status-slice";
import { roomReducer } from "./slice/room-slice";
// ...

export const store = configureStore({
  reducer: {
    user: authReducer,
    status: statusReducer,
    friends: friendsReducer,
    chat: chatReducer,
    room: roomReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
