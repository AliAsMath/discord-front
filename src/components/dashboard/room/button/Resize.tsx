import { CloseFullscreen, OpenInFull } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

interface ResizeProps {
  isLarge: boolean;
  setIsLarge: React.Dispatch<React.SetStateAction<boolean>>;
}

const Resize: React.FC<ResizeProps> = ({ isLarge, setIsLarge }) => {
  const resizeHandler = () => setIsLarge((prev: boolean) => !prev);

  return (
    <IconButton onClick={resizeHandler} className="!absolute right-2">
      {isLarge ? <CloseFullscreen /> : <OpenInFull />}
    </IconButton>
  );
};

export default Resize;
