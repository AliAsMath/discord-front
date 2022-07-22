import { Room, roomAction } from "../redux/slice/room-slice";
import { store } from "../redux/store";
import { joinRoomEmit, leaveRoomEmit, socket } from "./socket-client";
import { clearPeerConnections, getLocalStreamPreview } from "./webRTC";

export const createRoom = () => {
  const successCallback = () => {
    store.dispatch(
      roomAction.openRoom({ isUserInRoom: true, isUserRoomCreator: true })
    );
    socket.emit("create-room");
  };

  const audioOnly = store.getState().room.audioOnly;
  getLocalStreamPreview(audioOnly, successCallback);
};

export const updateActiveRooms = (activeRooms: Room[]) => {
  const friendsActiveRooms: Room[] = [];
  const friends = store.getState().friends.friends;
  const user = store.getState().user;

  activeRooms.forEach((room) => {
    friends.forEach((friend) => {
      friend.id === room.roomCreator.userId &&
        friendsActiveRooms.push({
          ...room,
          roomCreator: { ...room.roomCreator, username: friend.username },
        });
    });

    user.id === room.roomCreator.userId &&
      friendsActiveRooms.push({
        ...room,
        roomCreator: { ...room.roomCreator, username: user.username },
      });
  });

  store.dispatch(roomAction.setActiveRooms(friendsActiveRooms));
};

export const joinRoom = (roomId: string) => {
  const successCallback = () => {
    store.dispatch(
      roomAction.openRoom({ isUserInRoom: true, isUserRoomCreator: false })
    );
    store.dispatch(roomAction.setRoomDetails({ roomId }));
    joinRoomEmit({ roomId });
  };

  const audioOnly = store.getState().room.audioOnly;
  getLocalStreamPreview(audioOnly, successCallback);
};

export const leaveRoom = () => {
  const roomId = store.getState().room.roomDetails?.roomId;
  if (!roomId) return;

  store.dispatch(
    roomAction.openRoom({ isUserInRoom: false, isUserRoomCreator: false })
  );
  store.dispatch(roomAction.setRoomDetails(null));

  const localStream = store.getState().room.localStream;
  localStream?.getTracks().forEach((track) => track.stop());
  store.dispatch(roomAction.setLocalStream(null));

  clearPeerConnections();

  leaveRoomEmit({ roomId });
};
