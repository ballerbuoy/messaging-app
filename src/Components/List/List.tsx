import React from "react";

import "./List.css";

type listItem = {
  roomId: string;
  roomName: string;
};

export interface Props {
  list: listItem[];
  title: string;
  changeSelectedChatRoom: React.Dispatch<React.SetStateAction<string>>;
  selectedChatRoom: string | undefined;
}

export function List(props: Props) {
  const { title, list, selectedChatRoom } = props;
  return (
    <div className="list">
      <h4>{title}</h4>
      <hr />
      {list.map((listItem) => {
        const className =
          listItem.roomId === selectedChatRoom
            ? "chatroom selected"
            : "chatroom";
        return (
          <div
            className={className}
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
