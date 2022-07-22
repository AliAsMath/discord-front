import React from "react";
import { useAppSelector } from "../../../redux/hook";
import ContactItem from "./ContactItem";

const ContactsList = () => {
  const { friends } = useAppSelector((state) => state.friends);

  return (
    <div className="flex flex-col flex-grow gap-2 px-4">
      <h4 className="self-center text-xl text-zinc-300">CONTACT</h4>
      {friends.map((friend) => (
        <ContactItem key={friend.id} {...friend} />
      ))}
    </div>
  );
};

export default ContactsList;
