import React from "react";

import { useQuery } from "../../../../../hooks/useQuery";
import { getTime } from "../../../../../utils";

import { MessageType } from "../../../../../types/ChatRoom.interface";
import { UserInfo } from "../../../../../types/User.interface";

import "./MessageItem.css";

type Props = {
  message: MessageType;
  style?: React.CSSProperties;
};

export function MessageItem({ message, style }: Props) {
  const { data } = useQuery<UserInfo>({
    url: `/user/${message.sentBy}`,
  });

  return (
    <div className="messageItem">
      {data ? (
        <img
          src={data.avatar}
          alt={`${message.sentBy}-avatar`}
          height="45px"
          width="45px"
          className="avatar-message-item"
        />
      ) : (
        <div className="loading-avatar"></div>
      )}

      <div className="message">
        <div className="messageMeta">
          <span className="username">{message.sentBy}</span>
          <span className="timestamp">{getTime(message.timestamp)}</span>
        </div>
        <div className="messageBody">{message.text}</div>
      </div>
    </div>
  );
}
