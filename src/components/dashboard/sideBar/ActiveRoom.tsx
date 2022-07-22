import { Button, Tooltip } from "@mui/material";
import { joinRoom } from "../../../util/room-client";

interface ActiveRoomProps {
  roomId: string;
  creatorUsername: string;
  amountOfParticipants: number;
  isUserInRoom: boolean;
}

const ActiveRoom: React.FC<ActiveRoomProps> = ({
  amountOfParticipants,
  creatorUsername,
  isUserInRoom,
  roomId,
}) => {
  const joinHandler = () => {
    joinRoom(roomId);
  };

  const isDisableToJoin = amountOfParticipants >= 4 || isUserInRoom;

  return (
    <Tooltip
      title={`creator ${creatorUsername} and ${amountOfParticipants} joined`}
      placement="right"
    >
      <span>
        <Button
          disabled={isDisableToJoin}
          onClick={joinHandler}
          className="w-12 h-12 !min-w-0 !rounded-2xl"
          variant="contained"
        >
          <span className="flex items-center justify-center font-bold text-white uppercase font-Oswald ">
            {creatorUsername.substring(0, 2)}
          </span>
        </Button>
      </span>
    </Tooltip>
  );
};

export default ActiveRoom;
