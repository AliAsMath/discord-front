import React from "react";
import AddFriends from "./AddFriends";
import Contacts from "./ContactsList";
import Invitation from "./Invitation";

const FriendsSidebar = () => {
  return (
    <div className="flex flex-col items-stretch w-64 p-2 bg-zinc-700">
      <AddFriends />
      <Contacts />
      <Invitation />
    </div>
  );
};

export default FriendsSidebar;
