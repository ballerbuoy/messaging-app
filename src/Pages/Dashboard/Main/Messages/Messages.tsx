import React, { useState, useEffect, useRef } from "react";
import { useFetch } from "../../../../Hooks/useFetch";
import { useMutation } from "../../../../Hooks/useMutation";
import { ChatRoomType } from "../../../../Types/ChatRoom.interface";
import { MessageItem } from "./MessageItem/MessageItem";
import "./Messages.css";

type Props = {
  selectedChatRoomId: string;
};

export const Messages = ({ selectedChatRoomId }: Props) => {
  const chatRoom = useMutation<ChatRoomType>({
    url: `/chatroom/${selectedChatRoomId}`,
    method: "GET",
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      chatRoom.executeFetch();
    }, 500);
    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <div className="messages-wrapper">
      {chatRoom.data &&
        chatRoom.data.messageHistory.map((message) => {
          return <MessageItem message={message} key={message.messageId} />;
        })}
    </div>
  );
};
