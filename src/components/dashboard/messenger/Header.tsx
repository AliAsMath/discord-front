import React from "react";
import Avatar from "./../../abstract/Avatar";

const Header: React.FC<{ username: string }> = ({ username }) => {
  return (
    <div>
      <Avatar username={username} large />
      <h4 className="text-xl font-bold capitalize">{username}</h4>
    </div>
  );
};

export default Header;
