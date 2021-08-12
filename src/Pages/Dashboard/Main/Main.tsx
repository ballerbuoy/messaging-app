import React, { useState } from "react";

import { Messages } from "./Messages/Messages";
import { useMutation } from "../../../Hooks/useMutation";

import { ajaxClient } from "../../../ajaxClient/ajaxClient";
import { useUser } from "../../../Contexts/userContext";

import { MessageType } from "../../../Types/ChatRoom.interface";

import "./Main.css";

type Props = {
  selectedChatRoomId: string;
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
    const timestamp = String(curTime.valueOf());

    const mutationOptions = { onSuccess: () => setMessage("") };
    mutate(
      { text: message, timestamp, sentBy: state.username },
      mutationOptions
    );
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
          disabled={status === "loading" || message === ""}
          className="newMessage-send"
        >
          {status === "loading" ? "Sending Message..." : "Send Message"}
        </button>
      </div>
      {status === "error" ? (
        <span className="error">Failed to send message</span>
      ) : null}
    </div>
  );
};
