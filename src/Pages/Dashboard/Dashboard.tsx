import React, { useState } from "react";

import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import { Sidebar } from "./Sidebar/Sidebar";

import { useUser } from "../../Contexts/user-context";

import "./Dashboard.css";

export function Dashboard() {
  const { state } = useUser();

  const [selectedChatRoom, setSelectedChatRoom] = useState<string>(
    state.personalChatsSubscribed[0].roomId
  );

  return (
    <div className="wrapper">
      <Header changeSelectedChatRoom={setSelectedChatRoom} />
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
