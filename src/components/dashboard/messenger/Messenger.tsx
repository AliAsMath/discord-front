import React from "react";
import { useAppSelector } from "../../../redux/hook";
import Content from "./Content";
import Wellcome from "./Wellcome";

const Messenger = () => {
  const { chosenChatDetails } = useAppSelector((state) => state.chat);

  return (
    <div className="flex-grow h-full pt-12 bg-zinc-600">
      {chosenChatDetails ? (
        <Content chosenChatDetails={chosenChatDetails} />
      ) : (
        <Wellcome />
      )}
    </div>
  );
};

export default Messenger;
