import React from "react";
import { useCallback } from "react";
import "./List.css";

type listItem = {
  roomId: string;
  roomName: string;
};

export interface Props {
  list: listItem[];
  title: string;
  changeSelectedChatRoom: React.Dispatch<React.SetStateAction<string>>;
}

export function List(props: Props) {
  const { title, list } = props;
  return (
    <div className="list">
      <h4>{title}</h4>
      {list.map((listItem) => {
        return (
          <div
            className="list-item chatroom"
            key={listItem.roomId}
            onClick={() => props.changeSelectedChatRoom(listItem.roomId)}
          >
            {listItem.roomName}
          </div>
        );
      })}
    </div>
  );
}
