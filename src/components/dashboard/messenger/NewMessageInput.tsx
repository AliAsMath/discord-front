import React, { useState } from "react";
import { sendDirectMessage } from "./../../../util/socket-client";

interface NewMessageInputProps {
  chosenChatDetails: { id: string; username: string };
}

const NewMessageInput: React.FC<NewMessageInputProps> = ({
  chosenChatDetails,
}) => {
  const [message, setMessage] = useState("");

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setMessage(e.currentTarget.value);

  const sendMessageHandler = () => {
    if (message.length > 0)
      sendDirectMessage({ receiverId: chosenChatDetails.id, content: message });
    setMessage("");
  };

  const enterHandler: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") sendMessageHandler();
  };

  return (
    <div className="flex items-center justify-center p-3">
      <input
        className="w-full p-2 rounded bg-zinc-900 focus:outline-none"
        onChange={changeHandler}
        onKeyDown={enterHandler}
        type="text"
        value={message}
        placeholder={`Send message to ${chosenChatDetails.username}`}
      />
    </div>
  );
};

export default NewMessageInput;
