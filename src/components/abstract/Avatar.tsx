import React from "react";

interface AvatarProps {
  username: string;
  large?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ username, large }) => {
  return (
    <div
      className={`flex items-center uppercase justify-center font-bold text-white bg-indigo-500 rounded-full font-Oswald ${
        large ? "w-20 h-20 text-4xl" : "w-12 h-12 text-xl"
      }`}
    >
      {username.substring(0, 2)}
    </div>
  );
};

export default Avatar;
