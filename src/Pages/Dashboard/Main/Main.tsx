import React, { useState } from "react";

import { Messages } from "./Messages/Messages";
import { useMutation } from "../../../Hooks/useMutation";

import { ajaxClient } from "../../../ajaxClient/ajaxClient";
import { useUser } from "../../../Contexts/userContext";

import { STATUS } from "../../../constants";

import { MessageType } from "../../../types/ChatRoom.interface";

import "./Main.css";

type Props = {
  selectedChatRoomId: string;
};

export const Main = ({ selectedChatRoomId }: Props) => {
  const { user } = useUser();
  const [message, setMessage] = useState("");
  const { status, mutate } = useMutation<MessageType>((payload) =>
    ajaxClient.post({ url: `/chatroom/${selectedChatRoomId}`, payload })
  );

  const handleSendingMessage = () => {
    const curTime = new Date();
    const timestamp = String(curTime.valueOf());

    const mutationOptions = { onSuccess: () => setMessage("") };
    mutate(
      { text: message, timestamp, sentBy: user.username },
      mutationOptions
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSendingMessage();
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendingMessage();
    }
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
          onKeyPress={handleEnterPress}
        />
        <button
          type="submit"
          onClick={handleClick}
          disabled={status === STATUS.LOADING || message === ""}
          className="newMessage-send"
        >
          {status === STATUS.LOADING ? "Sending Message..." : "Send Message"}
        </button>
      </div>
      {status === STATUS.ERROR ? (
        <span className="error">Failed to send message</span>
      ) : null}
    </div>
  );
};
