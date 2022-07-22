import React, { useState } from "react";
import ControllBar from "./ControlBar";
import VideoContainer from "./VideoContainer";

const Room = () => {
  const [isLarge, setIsLarge] = useState(false);
  return (
    <div
      className={`bg-zinc-900 rounded absolute  transition-all ${
        isLarge
          ? "w-full h-full right-0 bottom-0"
          : "w-1/3 h-2/5 right-2 bottom-2"
      }`}
    >
      <VideoContainer />
      <ControllBar isLarge={isLarge} setIsLarge={setIsLarge} />
    </div>
  );
};

export default Room;
