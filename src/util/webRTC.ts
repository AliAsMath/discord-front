import { store } from "../redux/store";
import { roomAction } from "./../redux/slice/room-slice";
import Peer from "simple-peer";
import { sendSignalData } from "./socket-client";

export const getLocalStreamPreview = (onlyAudio: boolean, cb: Function) => {
  const constraints = {
    audio: true,
    video: !onlyAudio,
  };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      store.dispatch(roomAction.setLocalStream(stream));
      cb();
    })
    .catch((err) => console.log(err));
};

let peers: {
  [key: string]: Peer.Instance;
} = {};

const getConfiguration = () => {
  const turnIceServers = null;

  if (turnIceServers) {
    // use TURN servers credentials
  } else {
    console.warn("Using only STUN server");
    return {
      iceServers: [
        {
          //free STUN server url
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    };
  }
};

export const prepareNewPeerConnection = (
  connectedSocketId: string,
  isInitiator: boolean
) => {
  const localStream = store.getState().room.localStream;
  isInitiator
    ? console.log("preparing new peer connection as initiator")
    : console.log("preparing new peer connection as not initiator");

  peers[connectedSocketId] = new Peer({
    initiator: isInitiator,
    config: getConfiguration(),
    stream: localStream,
  });

  //connect to server to receive SDP and ICE
  peers[connectedSocketId].on("signal", (data) => {
    const signalData = {
      signal: data,
      connectedSocketId,
    };

    //send signaling data to other user
    //signalPeerData(signalData)
    sendSignalData(signalData);
  });

  peers[connectedSocketId].on("stream", (stream) => {
    console.log("get stream data from " + connectedSocketId);
    addToRemoteStreams({ stream, connectedSocketId });
  });
};

export const handleSignalData = (data: {
  connectedSocketId: string;
  signal: Peer.SignalData;
}) => {
  if (peers[data.connectedSocketId])
    peers[data.connectedSocketId].signal(data.signal);
};

const addToRemoteStreams = (data: {
  stream: MediaStream;
  connectedSocketId: string;
}) => {
  let remoteStreams = store.getState().room.remoteStreams;

  //first remove old stream from remoteStreams
  remoteStreams = remoteStreams.filter(
    (remoteStream) => remoteStream.connectedSocketId !== data.connectedSocketId
  );

  remoteStreams = [...remoteStreams, data];
  store.dispatch(roomAction.setRemoteStreams(remoteStreams));
};

export const clearPeerConnections = () => {
  const remoteStreams = store.getState().room.remoteStreams;
  remoteStreams.forEach((remoteStream) => {
    remoteStream.stream.getTracks().forEach((track) => track.stop());
  });
  store.dispatch(roomAction.setRemoteStreams([]));

  Object.keys(peers).forEach((connectionSocketId) => {
    peers[connectionSocketId].destroy();
    delete peers[connectionSocketId];
  });
};

export const deleteLeavedPeer = (leaveSocketId: string) => {
  peers[leaveSocketId].destroy();
  delete peers[leaveSocketId];

  const remoteStreams = store.getState().room.remoteStreams;
  const updatedRemoteStreams = remoteStreams.filter(
    (remoteStream) => remoteStream.connectedSocketId !== leaveSocketId
  );
  store.dispatch(roomAction.setRemoteStreams(updatedRemoteStreams));
};

export const switchOutgoingTracks = (stream: MediaStream) => {
  let localStream = store.getState().room.localStream;

  for (let socket_id in peers)
    localStream && peers[socket_id].removeStream(localStream);

  store.dispatch(roomAction.setLocalStream(stream));
  localStream = store.getState().room.localStream;

  for (let socket_id in peers)
    localStream && peers[socket_id].addStream(localStream);
};
