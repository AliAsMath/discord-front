import React from "react";
import Camera from "./button/Camera";
import CloseRoom from "./button/CloseRoom";
import Mic from "./button/Mic";
import Resize from "./button/Resize";
import ScreenShare from "./button/ScreenShare";

interface ControlBarProps {
  isLarge: boolean;
  setIsLarge: React.Dispatch<React.SetStateAction<boolean>>;
}

const ControllBar: React.FC<ControlBarProps> = ({ isLarge, setIsLarge }) => {
  return (
    <div className="absolute bottom-0 flex items-center justify-center w-full text-3xl transition-all rounded bg-emerald-600 h-1/6">
      <CloseRoom />
      <ScreenShare />
      <Camera />
      <Mic />
      <Resize isLarge={isLarge} setIsLarge={setIsLarge} />
    </div>
  );
};

export default ControllBar;
