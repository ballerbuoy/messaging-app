import React, { useState } from "react";
import { useEffect } from "react";
import { useFetch } from "../../../../Hooks/useFetch";
import { ChatRoomType } from "../../../../Types/ChatRoom.interface";
import "./Messages.css";

interface Props {
  selectedChatRoomId: string;
}

export const Messages = ({ selectedChatRoomId }: Props) => {
  const [getQueryOptions, setGetQueryOptions] = useState({ skip: false });
  const chatRoom = useFetch<ChatRoomType>({
    url: `/chatroom/${selectedChatRoomId}`,
    method: "GET",
    skip: getQueryOptions.skip,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setGetQueryOptions((prev) => ({ skip: !prev.skip }));
    }, 500);
    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <div className="messages-wrapper">
      {chatRoom.data &&
        chatRoom.data.messageHistory.map((message) => {
          return (
            <div className="messageItem" key={message.messageId}>
              <img
                src="https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
                alt={`${message.sentBy}-avatar`}
                className="avatar"
              />
              <div className="message">
                <div className="messageMeta">
                  <span className="username">{message.sentBy}</span>
                  <span className="timestamp">{message.timestamp}</span>
                </div>
                <div className="messageBody">{message.text}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
