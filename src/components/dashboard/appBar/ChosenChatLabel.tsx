import React from "react";
import { useAppSelector } from "../../../redux/hook";

const ChosenChatLabel = () => {
  const username = useAppSelector(
    (state) => state.chat.chosenChatDetails?.username
  );

  return (
    <h4 className=" text-zinc-300">
      {username && "Chosen Chat: "}
      {username && (
        <span className="text-lg font-semibold capitalize text-rose-500">
          {username}
        </span>
      )}
    </h4>
  );
};

export default ChosenChatLabel;
