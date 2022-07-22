import { Button } from "@mui/material";
import React from "react";
import { FiberManualRecord } from "@mui/icons-material";
import { useAppSelector } from "../../../redux/hook";
import { useAppDispatch } from "./../../../redux/hook";
import { chatAction, chatType } from "./../../../redux/slice/chat-slice";
import Avatar from "../../abstract/Avatar";

interface contactItemProps {
  id: string | number;
  username: string;
}

const ContactItem: React.FC<contactItemProps> = ({ id, username }) => {
  const { onlineUsers } = useAppSelector((state) => state.friends);
  const dispatch = useAppDispatch();

  let isOnline = false;
  onlineUsers.forEach((user) => {
    if (user.userId === id) isOnline = true;
  });

  const onChooseChat = () => {
    const payload = {
      chosenChatDetails: { id, username },
      chatType: chatType.DIRECT,
    };

    dispatch(chatAction.setChosenChatDetails(payload));
  };

  return (
    <Button
      onClick={onChooseChat}
      className="!flex !w-full !rounded-l-full relative !p-0 !justify-start !gap-3"
    >
      <Avatar username={username} />
      {username}
      {isOnline && (
        <FiberManualRecord className="absolute right-1 text-emerald-500" />
      )}
    </Button>
  );
};

export default ContactItem;
