import React from "react";
import { useAppSelector } from "../../../redux/hook";
import Video from "./Video";

const VideoContainer = () => {
  const { localStream, remoteStreams } = useAppSelector((state) => state.room);
  return (
    <div className="flex flex-wrap w-full h-5/6">
      {localStream && <Video stream={localStream} isLocalStream />}
      {remoteStreams.map((remoteStream) => (
        <Video
          key={remoteStream.stream.id}
          stream={remoteStream.stream}
          isLocalStream={false}
        />
      ))}
    </div>
  );
};

export default VideoContainer;
