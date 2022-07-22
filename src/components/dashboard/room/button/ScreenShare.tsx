import {
  StopScreenShare,
  ScreenShare as ScreenShareIcon,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useAppSelector } from "../../../../redux/hook";
import { switchOutgoingTracks } from "../../../../util/webRTC";
import { useAppDispatch } from "./../../../../redux/hook";
import { roomAction } from "./../../../../redux/slice/room-slice";

const ScreenShare = () => {
  const { isScreenSharingActive, localStream } = useAppSelector(
    (state) => state.room
  );
  const dispatch = useAppDispatch();

  const screenShareToggleHandler = async () => {
    let stream;

    try {
      if (isScreenSharingActive) {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        localStream && localStream.getTracks().forEach((track) => track.stop());
        dispatch(roomAction.setIsScreenSharingActive(false));
      } else {
        stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: false,
        });

        localStream && localStream.getTracks().forEach((track) => track.stop());
        dispatch(roomAction.setIsScreenSharingActive(true));
      }

      switchOutgoingTracks(stream);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <IconButton onClick={screenShareToggleHandler}>
      {isScreenSharingActive ? <ScreenShareIcon /> : <StopScreenShare />}
    </IconButton>
  );
};

export default ScreenShare;
