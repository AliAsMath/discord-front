import React from "react";
import ChosenChatLabel from "./ChosenChatLabel";
import DropdownMenu from "./DropdownMenu";

const AppBar = () => {
  return (
    <div className="flex px-3 items-center flex-grow w-[calc(100%-328px)] absolute right-0 top-0 h-12 border-b-2 border-black bg-zinc-600">
      <ChosenChatLabel />
      <DropdownMenu />
    </div>
  );
};

export default AppBar;
