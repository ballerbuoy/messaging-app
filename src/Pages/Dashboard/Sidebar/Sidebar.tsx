import React, { useState } from "react";
import { List } from "../../../Utils/List/List";
import { UserContext } from "../../../App";
import { useContext } from "react";
import "./Sidebar.css";

type Props = {
  selectedChatRoom: string;
  changeSelectedChatRoom: React.Dispatch<React.SetStateAction<string>>;
};

export function Sidebar({ selectedChatRoom, changeSelectedChatRoom }: Props) {
  const { personalChatsSubscribed, groupChatsSubscribed } =
    useContext(UserContext);
  return (
    <div className="sidebar">
      <List
        title="Direct Messages"
        selectedChatRoom={selectedChatRoom}
        changeSelectedChatRoom={changeSelectedChatRoom}
        list={personalChatsSubscribed}
      />
      <List
        title="Channels"
        selectedChatRoom={selectedChatRoom}
        changeSelectedChatRoom={changeSelectedChatRoom}
        list={groupChatsSubscribed}
      />
    </div>
  );
}
