import React, { useEffect, useRef } from "react";

interface VideoProps {
  stream: MediaStream;
  isLocalStream: boolean;
}

const Video: React.FC<VideoProps> = ({ stream, isLocalStream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.srcObject = stream;
    video.onloadedmetadata = () => video.play();
  }, [stream]);

  return (
    <video
      className="w-1/2 bg-white rounded h-1/2"
      ref={videoRef}
      autoPlay
      muted={isLocalStream}
    ></video>
  );
};

export default Video;
