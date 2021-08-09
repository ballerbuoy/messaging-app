import React from "react";

import { useQuery } from "../../../../../Hooks/useQuery";

import { MessageType } from "../../../../../Types/ChatRoom.interface";
import { UserInfo } from "../../../../../Types/User.interface";

import "./MessageItem.css";

type Props = {
  message: MessageType;
};

export function MessageItem({ message }: Props) {
  const { data } = useQuery<UserInfo>({
    url: `/user/${message.sentBy}`,
  });

  return data ? (
    <div className="messageItem">
      {
        <img
          src={data.avatar}
          alt={`${message.sentBy}-avatar`}
          height="45px"
          width="45px"
          className="avatar"
        />
      }
      <div className="message">
        <div className="messageMeta">
          <span className="username">{message.sentBy}</span>
          <span className="timestamp">{message.timestamp}</span>
        </div>
        <div className="messageBody">{message.text}</div>
      </div>
    </div>
  ) : null;
}
