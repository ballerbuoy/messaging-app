import React, { useState } from "react";

import { Main } from "./Main/Main";
import { DashboardLayout } from "../../Components/Layouts/Dashboard/DashboardLayout";

import { useUser } from "../../Contexts/userContext";

export function Dashboard() {
  const { state } = useUser();

  const [selectedChatRoom, setSelectedChatRoom] = useState<string>(
    state.personalChatsSubscribed[0].roomId
  );

  return (
    <DashboardLayout
      selectedChatRoom={selectedChatRoom}
      setSelectedChatRoom={setSelectedChatRoom}
    >
      <Main selectedChatRoomId={selectedChatRoom} />
    </DashboardLayout>
  );
}
