import { IconButton, Tooltip } from "@mui/material";
import { Check, Clear } from "@mui/icons-material";

interface invitationItemProps {
  _id: string | number;
  username: string;
  mail: string;
  acceptFriendInvitation: React.MouseEventHandler;
  rejectFriendInvitation: React.MouseEventHandler;
}

const InvitationItem: React.FC<invitationItemProps> = ({
  _id,
  username,
  mail,
  acceptFriendInvitation,
  rejectFriendInvitation,
}) => {
  return (
    <Tooltip title={mail} placement="right">
      <div className="flex items-center justify-start w-full gap-3 p-0 rounded-l-full text-zinc-300">
        <div className="flex items-center justify-center w-12 h-12 text-xl font-bold text-white bg-indigo-500 rounded-full font-Oswald">
          {username.substring(0, 2)}
        </div>
        {username}
        <div className="ml-auto">
          <IconButton
            className="!text-zinc-300"
            onClick={acceptFriendInvitation}
          >
            <Check />
          </IconButton>
          <IconButton
            className="!text-zinc-300"
            onClick={rejectFriendInvitation}
          >
            <Clear />
          </IconButton>
        </div>
      </div>
    </Tooltip>
  );
};

export default InvitationItem;
