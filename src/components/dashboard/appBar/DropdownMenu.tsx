import { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "./../../../redux/hook";
import { authAction } from "./../../../redux/slice/auth-slice";
import { roomAction } from "../../../redux/slice/room-slice";

const DropdownMenu = () => {
  const audioOnly = useAppSelector((state) => state.room.audioOnly);
  //anchor element is the element which menu open under that. in here IconButton is anchor element
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const dispatch = useAppDispatch();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="ml-auto">
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => dispatch(roomAction.toggleAudioOnly())}>
          {audioOnly ? "disable audio only" : "enable audio only"}
        </MenuItem>
        <MenuItem onClick={() => dispatch(authAction.logout())}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default DropdownMenu;
