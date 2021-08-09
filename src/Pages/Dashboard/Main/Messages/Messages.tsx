import React from "react";

import { MessageItem } from "./MessageItem/MessageItem";
import { useQuery } from "../../../../Hooks/useQuery";

import { IoMdPersonAdd } from "react-icons/io";

import { ChatRoomType } from "../../../../Types/ChatRoom.interface";

import "./Messages.css";

type Props = {
  selectedChatRoomId: string | undefined;
};

export const Messages = ({ selectedChatRoomId }: Props) => {
  const { data, error } = useQuery<ChatRoomType>({
    url: `/chatroom/${selectedChatRoomId}`,
    interval: 1000,
  });

  return (
    <div className="messages-wrapper">
      <div className="messages-header">
        {data ? <h3 className="title">{data.roomName}</h3> : null}
        {data && data.type === "group" ? (
          <button className="add-user">
            <IoMdPersonAdd />
          </button>
        ) : null}
      </div>
      <hr className="seperator"></hr>
      <div className="messages-body">
        {error ? (
          <h3>The chatroom currently does not exist on the server :( </h3>
        ) : null}
        {data
          ? data.messageHistory.map((message) => {
              return <MessageItem message={message} key={message.messageId} />;
            })
          : null}
      </div>
    </div>
  );
};
