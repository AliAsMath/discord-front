import GroupsIcon from "@mui/icons-material/Groups";
import { Button } from "@mui/material";
import { useAppSelector } from "../../../redux/hook";
import ActiveRoom from "./ActiveRoom";
import CreateRoomButton from "./CreateRoomButton";

const SideBar = () => {
  const roomState = useAppSelector((state) => state.room);

  return (
    <div className=" p-2 flex flex-col gap-2 items-center w-[72px] bg-zinc-800">
      <Button className="w-12 h-12 !min-w-0 !rounded-2xl" variant="contained">
        <GroupsIcon />
      </Button>
      <CreateRoomButton />
      {roomState.activeRooms.map((room) => (
        <ActiveRoom
          key={room.roomId}
          amountOfParticipants={room.participants.length}
          creatorUsername={
            room.roomCreator.username ? room.roomCreator.username : "User"
          }
          isUserInRoom={roomState.isUserInRoom}
          roomId={room.roomId}
        />
      ))}
    </div>
  );
};

export default SideBar;
