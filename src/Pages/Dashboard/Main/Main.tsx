import React, { useState } from "react";

import { Messages } from "./Messages/Messages";
import { useMutation } from "../../../Hooks/useMutation";

import { ajaxClient } from "../../../ajaxClient/ajaxClient";
import { useUser } from "../../../Contexts/user-context";

import { MessageType } from "../../../Types/ChatRoom.interface";

import "./Main.css";

type Props = {
  selectedChatRoomId: string | undefined;
};

export const Main = ({ selectedChatRoomId }: Props) => {
  const { state } = useUser();
  const [message, setMessage] = useState("");
  const { status, mutate } = useMutation<MessageType>((payload) =>
    ajaxClient.post({ url: `/chatroom/${selectedChatRoomId}`, payload })
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const curTime = new Date();
    const timestamp = `${curTime.getHours()}:${curTime.getMinutes()}`;

    mutate({ text: message, timestamp, sentBy: state.username });
    setMessage("");
  };

  return (
    <div className="main">
      <Messages
        selectedChatRoomId={selectedChatRoomId}
        key={selectedChatRoomId}
      />
      <div className="newMessage">
        <textarea
          value={message}
          onChange={handleChange}
          placeholder="Type a message"
          className="newMessage-input"
        />
        <button
          type="submit"
          onClick={handleClick}
          disabled={status === "loading"}
          className="newMessage-send"
        >
          {status === "loading" ? "Sending Message..." : "Send Message"}
        </button>
      </div>
    </div>
  );
};
