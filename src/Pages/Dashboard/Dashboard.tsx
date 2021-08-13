import React, { useState } from "react";

import { Main } from "./Main/Main";
import { DashboardLayout } from "../../Components/Layouts/Dashboard/DashboardLayout";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";

import { useUser } from "../../Contexts/userContext";

export function Dashboard() {
  const { state } = useUser();

  const [selectedChatRoom, setSelectedChatRoom] = useState<string>(
    state.personalChatsSubscribed[0].roomId
  );

  return (
    <DashboardLayout
      header={<Header changeSelectedChatRoom={setSelectedChatRoom} />}
      leftSidebar={
        <Sidebar
          selectedChatRoom={selectedChatRoom}
          changeSelectedChatRoom={setSelectedChatRoom}
        />
      }
      main={<Main selectedChatRoomId={selectedChatRoom} />}
    />
  );
}
