import React from "react";

import { List } from "../../../Components/List/List";
import { useUser } from "../../../Contexts/user-context";

import "./Sidebar.css";

type Props = {
  selectedChatRoom: string;
  changeSelectedChatRoom: React.Dispatch<React.SetStateAction<string>>;
};

export function Sidebar({ selectedChatRoom, changeSelectedChatRoom }: Props) {
  const { state } = useUser();
  const { personalChatsSubscribed, groupChatsSubscribed } = state;

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
