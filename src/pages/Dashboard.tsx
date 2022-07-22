import React, { useEffect } from "react";
import AppBar from "../components/dashboard/appBar/AppBar";
import FriendsSidebar from "../components/dashboard/friendsSideBar/FriendsSidebar";
import Messenger from "../components/dashboard/messenger/Messenger";
import Room from "../components/dashboard/room/Room";
import SideBar from "../components/dashboard/sideBar/SideBar";
import { useAppSelector } from "../redux/hook";
import { connectionToSocketServer, socket } from "./../util/socket-client";

const Dashboard: React.FC = () => {
  const userState = useAppSelector((state) => state.user);
  const roomState = useAppSelector((state) => state.room);

  useEffect(() => {
    if (userState) connectionToSocketServer(userState);

    return () => {
      socket.close();
    };
  }, [userState]);

  return (
    <div className="flex items-stretch w-screen h-screen text-zinc-300">
      <SideBar />
      <FriendsSidebar />
      <AppBar />
      <Messenger />
      {roomState.isUserInRoom && <Room />}
    </div>
  );
};

export default Dashboard;
