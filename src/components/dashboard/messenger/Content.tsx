import React, { useEffect } from "react";
import { socket } from "../../../util/socket-client";
import Messages from "./Messages";
import NewMessageInput from "./NewMessageInput";

interface ContentProps {
  chosenChatDetails: { id: string; username: string };
}

const Content: React.FC<ContentProps> = ({ chosenChatDetails }) => {
  useEffect(() => {
    socket.emit("direct-chat-history", { anotherUserId: chosenChatDetails.id });
  }, [chosenChatDetails]);

  return (
    <div className="flex flex-col w-full h-full overflow-y-scroll">
      <Messages />
      <NewMessageInput chosenChatDetails={chosenChatDetails} />
    </div>
  );
};

export default Content;
