import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { leaveRoom } from "../../../../util/room-client";

const CloseRoom = () => {
  const closeHandler = () => {
    leaveRoom();
  };

  return (
    <IconButton onClick={closeHandler} className="!absolute left-2">
      <Close />
    </IconButton>
  );
};

export default CloseRoom;
