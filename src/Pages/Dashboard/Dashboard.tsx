import React from "react";
import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import { UserContext } from "../../App";
import { useContext } from "react";
import { Sidebar } from "./Sidebar/Sidebar";
import { useState } from "react";
import "./Dashboard.css";

export interface Props {}

export function Dashboard(props: Props) {
  const { personalChatsSubscribed } = useContext(UserContext);
  const [selectedChatRoom, setSelectedChatRoom] = useState<string>(
    personalChatsSubscribed[0].roomId
  );

  return (
    <div>
      <Header />
      <div className="main-wrapper">
        <Sidebar
          selectedChatRoom={selectedChatRoom}
          changeSelectedChatRoom={setSelectedChatRoom}
        />
        <Main selectedChatRoomId={selectedChatRoom} />
      </div>
    </div>
  );
}
