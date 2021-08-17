import React from "react";

import { List } from "../../../components/list/List";
import { useUser } from "../../../contexts/userContext";
import { useQuery } from "../../../hooks/useQuery";

import { ChatInfo } from "../../../types/User.interface";

import "./Sidebar.css";

type Props = {
  selectedChatRoom: string;
  changeSelectedChatRoom: React.Dispatch<React.SetStateAction<string>>;
};

type ChatRoomsData = {
  personalChatsSubscribed: ChatInfo[];
  groupChatsSubscribed: ChatInfo[];
};

export function Sidebar({ selectedChatRoom, changeSelectedChatRoom }: Props) {
  const { user } = useUser();
  const { data } = useQuery<ChatRoomsData>({
    url: `/user/getRooms/${user.username}`,
    interval: 1000,
  });
  const personalChatsSubscribed = data?.personalChatsSubscribed
    ? data?.personalChatsSubscribed
    : [];
  const groupChatsSubscribed = data?.groupChatsSubscribed
    ? data?.groupChatsSubscribed
    : [];

  return (
    <div className="sidebar">
      <List
        title="Direct Messages"
        selectedChatRoom={selectedChatRoom}
        changeSelectedChatRoom={changeSelectedChatRoom}
        list={personalChatsSubscribed}
      />
      <hr />
      <List
        title="Channels"
        selectedChatRoom={selectedChatRoom}
        changeSelectedChatRoom={changeSelectedChatRoom}
        list={groupChatsSubscribed}
      />
      <hr />
    </div>
  );
}
