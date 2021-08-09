import React from "react";
import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import { reducerAction, UserContext } from "../../App";
import { useContext } from "react";
import { Sidebar } from "./Sidebar/Sidebar";
import { useState } from "react";
import "./Dashboard.css";

type Props = {
  updateUser: (arg: reducerAction) => void;
};

export function Dashboard({ updateUser }: Props) {
  const { personalChatsSubscribed } = useContext(UserContext);
  const [selectedChatRoom, setSelectedChatRoom] = useState<string>(
    personalChatsSubscribed[0].roomId
  );

  return (
    <div className="wrapper">
      <Header changeSelectedChatRoom={setSelectedChatRoom} />
      <div className="main-wrapper">
        <Sidebar
          selectedChatRoom={selectedChatRoom}
          changeSelectedChatRoom={setSelectedChatRoom}
          updateUser={updateUser}
        />
        <Main selectedChatRoomId={selectedChatRoom} />
      </div>
    </div>
  );
}
