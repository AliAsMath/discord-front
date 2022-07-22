import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useAppSelector } from "../../../redux/hook";
import { createRoom } from "../../../util/room-client";

const CreateRoomButton = () => {
  const isUserInRoom = useAppSelector((state) => state.room.isUserInRoom);

  const createRoomHandler = () => createRoom();

  return (
    <Button
      onClick={createRoomHandler}
      className="w-12 h-12 !min-w-0 !rounded-2xl"
      variant="contained"
      disabled={isUserInRoom}
      // classes={{ disabled: classes.disabledButton }}
      sx={{
        ":disabled": {
          color: "white",
        },
      }}
    >
      <Add />
    </Button>
  );
};

export default CreateRoomButton;
