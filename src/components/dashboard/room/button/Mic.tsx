import { MicOff, Mic as MicIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { useAppSelector } from "../../../../redux/hook";

const Mic = () => {
  const [isEnable, setIsEnable] = useState(true);
  const localStream = useAppSelector((state) => state.room.localStream);

  const micToggleHandler = () => {
    if (localStream) localStream.getAudioTracks()[0].enabled = !isEnable;
    setIsEnable((prev) => !prev);
  };

  return (
    <IconButton onClick={micToggleHandler}>
      {isEnable ? <MicIcon /> : <MicOff />}
    </IconButton>
  );
};

export default Mic;
