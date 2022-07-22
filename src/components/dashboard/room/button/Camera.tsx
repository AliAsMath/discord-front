import { Videocam, VideocamOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { useAppSelector } from "../../../../redux/hook";

const Camera = () => {
  const [isEnable, setIsEnable] = useState(true);
  const localStream = useAppSelector((state) => state.room.localStream);

  const cameraToggleHandler = () => {
    if (localStream) localStream.getVideoTracks()[0].enabled = !isEnable;
    setIsEnable((prev) => !prev);
  };

  return (
    <IconButton onClick={cameraToggleHandler}>
      {isEnable ? <Videocam /> : <VideocamOff />}
    </IconButton>
  );
};

export default Camera;
