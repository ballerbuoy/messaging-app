import React, { useState } from "react";

import { Main } from "./main/Main";
import { DashboardLayout } from "../../components/layouts/dashboard/DashboardLayout";
import { Header } from "./header/Header";
import { Sidebar } from "./sidebar/Sidebar";

import { useUser } from "../../contexts/userContext";

export function Dashboard() {
  const { user } = useUser();

  const [selectedChatRoom, setSelectedChatRoom] = useState<string>(
    user.personalChatsSubscribed[0].roomId
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
