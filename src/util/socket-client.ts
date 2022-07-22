import io, { Socket } from "socket.io-client";
import { store } from "../redux/store";
import { ResponseData } from "./api";
import { friendsAction } from "./../redux/slice/friend-slice";
import { updateChatIfCoversationIsActive } from "./chat";
import { roomAction } from "../redux/slice/room-slice";
import { updateActiveRooms } from "./room-client";
import {
  deleteLeavedPeer,
  handleSignalData,
  prepareNewPeerConnection,
} from "./webRTC";

export let socket: Socket;

export const connectionToSocketServer = (
  userDetails: ResponseData["userDetails"]
) => {
  socket = io(process.env.REACT_APP_URL!, {
    auth: { token: userDetails.token },
  });

  socket.on("connect", () => {
    console.log("user connected");
    console.log(socket.id);
  });

  socket.on("connect_error", (err) => {
    // console.log(err);
    // store.dispatch(authAction.logout());
    // store.dispatch(
    //   statusAction.setStatus({
    //     status: "error",
    //     message: err.message,
    //     isOpen: true,
    //   })
    // );
  });

  socket.on("friend-invitation", (data) => {
    const { senderInvitation } = data;

    store.dispatch(friendsAction.setFriendInvitation(senderInvitation));
  });

  socket.on("friend-list", (data) => {
    const { friends } = data;

    store.dispatch(friendsAction.setFriendList(friends));
  });

  socket.on("online-users", (data) => {
    const { onlineUsers } = data;

    store.dispatch(friendsAction.setOnlineUsers(onlineUsers));
  });

  socket.on("direct-chat-history", (data) => {
    updateChatIfCoversationIsActive(data);
  });

  socket.on("create-room", (data) => {
    store.dispatch(roomAction.setRoomDetails(data.roomDetails));
  });

  socket.on("active-rooms", ({ activeRooms }) => {
    updateActiveRooms(activeRooms);
  });

  socket.on("connection-prepare", ({ connectedSocketId }) => {
    prepareNewPeerConnection(connectedSocketId, false);
    socket.emit("connection-init", { connectedSocketId });
  });

  socket.on("connection-init", ({ connectedSocketId }) => {
    prepareNewPeerConnection(connectedSocketId, true);
  });

  socket.on("connection-signal", (data) => {
    handleSignalData(data);
  });

  socket.on("other-socketUser-leave", ({ leaveSocketId }) => {
    deleteLeavedPeer(leaveSocketId);
  });
};

export const sendDirectMessage = (data: {
  content: string;
  receiverId: string;
}) => {
  socket.emit("direct-message", data);
};

export const joinRoomEmit = (data: { roomId: string }) => {
  socket.emit("join-room", data);
};
export const leaveRoomEmit = (data: { roomId: string }) => {
  socket.emit("leave-room", data);
};

export const sendSignalData = (data: any) => {
  socket.emit("connection-signal", data);
};
